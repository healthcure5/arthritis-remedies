#!/usr/bin/env python3
"""Build Hinge Care journal pages from _build/content/*.txt.
Run from anywhere: python3 _build/build_journal.py
Format notes are in _build/README.md"""
import os, re, json, html, glob, datetime
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(ROOT, '_build')
SITE = 'https://myhingecare.com'
header = open(f'{B}/parts/header.html', encoding='utf-8').read()
footer = open(f'{B}/parts/footer.html', encoding='utf-8').read()
avatar = open(f'{B}/parts/avatar.html', encoding='utf-8').read()
# existing hand-made pages, for "keep reading" cards
EXISTING = {
 'morning-joint-stiffness': dict(h1='Arthritis and morning stiffness: why you wake up stiff, and the 30 minutes that ease it', cat='Mornings', img='dawn-bedroom.jpg', blurb='What happens to your joints overnight, and a plan for the first half hour.'),
 'gentle-exercises-for-arthritis-seniors': dict(h1='Six chair exercises for arthritis. No gym, no floor, no fuss.', cat='Movement', img='chair-exercise.jpg', blurb='How to start moving when everything aches, with the CDC\'s advice.'),
 'castor-oil-pack-for-joints': dict(h1='Castor oil packs for arthritis: an old remedy, and what the research really says', cat='Remedies', img='castor-evening.jpg', blurb='How to make one, who should skip it, and what the studies show.'),
 'help-parent-with-arthritis': dict(h1='When Mom has arthritis: a field guide for grown children', cat='Caregivers', img='walk-together.jpg', blurb='Simple ways to make their days easier, and to look after yourself.'),
}
e = html.escape
def inline(t):
    t = e(t, quote=False)
    t = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'\[\^(\d+)\]', r'<sup><a href="#r\1">\1</a></sup>', t)
    t = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', lambda m: f'<a href="{m.group(2)}"' + (' rel="noopener"' if m.group(2).startswith('http') else '') + f'>{m.group(1)}</a>', t)
    return t
def slugify(t): return re.sub(r'[^a-z0-9]+', '-', t.lower()).strip('-')[:40]
def parse(path):
    d = {'take': [], 'lead': '', 'body': [], 'faq': [], 'refs': []}
    sect = 'meta'; cur = None
    for raw in open(path, encoding='utf-8').read().splitlines():
        if raw.startswith('@'): sect = raw[1:].strip(); continue
        if sect == 'meta':
            if ':' in raw and not raw.startswith('#'):
                k, v = raw.split(':', 1); d[k.strip()] = v.strip()
        elif sect == 'take':
            if raw.startswith('- '): d['take'].append(raw[2:].strip())
        elif sect == 'lead':
            if raw.strip(): d['lead'] += (' ' if d['lead'] else '') + raw.strip()
        elif sect == 'body': d['body'].append(raw)
        elif sect == 'faq':
            if raw.startswith('Q:'): cur = [raw[2:].strip(), '']; d['faq'].append(cur)
            elif raw.startswith('A:') and cur: cur[1] = raw[2:].strip()
        elif sect == 'refs':
            if '|' in raw:
                a, u = raw.rsplit('|', 1); d['refs'].append((a.strip(), u.strip()))
    return d
def render_body(lines):
    out = []; toc = []; blocks = []; cur = []
    for ln in lines + ['']:
        if ln.strip() == '':
            if cur: blocks.append(cur); cur = []
        else: cur.append(ln)
    for bl in blocks:
        first = bl[0]
        if first.startswith('## '):
            t = first[3:].strip(); idm = re.search(r'\{#([a-z0-9-]+)\}$', t)
            if idm: t = t[:idm.start()].strip(); i = idm.group(1)
            else: i = slugify(t)
            toc.append((i, t)); out.append(f'<h2 id="{i}">{inline(t)}</h2>')
            bl = bl[1:]
            if not bl: continue
            first = bl[0]
        if first.startswith('### '):
            out.append(f'<h3>{inline(first[4:])}</h3>'); bl = bl[1:]
            if not bl: continue
            first = bl[0]
        if first.startswith('- '):
            out.append('<ul>' + ''.join(f'<li>{inline(x[2:])}</li>' for x in bl if x.startswith('- ')) + '</ul>')
        elif re.match(r'\d+\. ', first):
            out.append('<ol>' + ''.join(f'<li>{inline(re.sub(r"^\d+\. ", "", x))}</li>' for x in bl) + '</ol>')
        elif first.startswith('!warn'):
            out.append('<div class="box warn"><p style="margin:0">' + inline(' '.join([first[5:].strip()] + bl[1:])) + '</p></div>')
        elif first.startswith('!box'):
            t, _, rest = first[4:].strip().partition(':')
            out.append(f'<div class="box"><h3>{inline(t.strip())}</h3><p style="margin:0">' + inline(' '.join([rest.strip()] + bl[1:])) + '</p></div>')
        elif first.startswith('> '):
            out.append('<blockquote class="pull">' + inline(' '.join(x[2:] for x in bl)) + '</blockquote>')
        else:
            out.append('<p>' + inline(' '.join(bl)) + '</p>')
    return '\n'.join(out), toc
NAV = open(f'{B}/parts/nav.html', encoding='utf-8').read().strip() if os.path.exists(f'{B}/parts/nav.html') else None
def build(path, registry):
    d = parse(path); slug = os.path.splitext(os.path.basename(path))[0]
    title = d['title'] + ' | Hinge Care'
    assert len(title) <= 62, (slug, len(title))
    img, _, alt = d['hero'].partition('|'); img = img.strip(); alt = alt.strip()
    body, toc = render_body(d['body'])
    toc.append(('faq', 'Questions people ask')); toc.append(('refs', 'Sources'))
    tocs = ''.join(f'<a href="#{i}">{inline(t)}</a>' for i, t in toc)
    upd = d.get('updated', datetime.date.today().isoformat())
    nice = datetime.date.fromisoformat(upd).strftime('%B %-d, %Y')
    faq_html = ''.join(f'<details><summary>{inline(q)}</summary><p>{inline(a)}</p></details>' for q, a in d['faq'])
    refs = ''.join(f'<li id="r{i}"><a href="{u}" rel="noopener">{e(a, quote=False)}</a></li>' for i, (a, u) in enumerate(d['refs'], 1))
    cards = ''
    for r in [x.strip() for x in d.get('related', '').split(',') if x.strip()][:3]:
        if r not in registry: continue
        m = registry[r]
        cards += f'<a class="card" href="{r}.html"><img src="journal-img/{m["img"]}" alt="" loading="lazy"><span>{e(m["cat"])}</span><h3>{e(m["h1"])}</h3><p>{e(m["blurb"])}</p></a>'
    url = f'{SITE}/{slug}.html'
    plain = lambda t: re.sub(r'<[^>]+>', '', re.sub(r'\[\^\d+\]', '', re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', t))).replace('**', '')
    art = {"@context": "https://schema.org", "@type": "Article", "headline": d['h1'], "description": d['desc'], "image": f"{SITE}/journal-img/{img}", "datePublished": upd, "dateModified": upd,
           "author": {"@type": "Organization", "name": "Hinge Care", "url": SITE + "/"}, "publisher": {"@type": "Organization", "name": "Hinge Care", "logo": {"@type": "ImageObject", "url": SITE + "/brand/icon-512.png"}}, "mainEntityOfPage": url}
    faqld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": plain(q), "acceptedAnswer": {"@type": "Answer", "text": plain(a)}} for q, a in d['faq']]}
    bc = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Hinge Care Journal", "item": SITE + "/articles.html"},
        {"@type": "ListItem", "position": 2, "name": d['cat'], "item": url}]}
    ld = ''.join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>\n' for x in (art, faqld, bc))
    hdr = header
    if NAV: hdr = re.sub(r'<nav class="mnav".*?</nav>', NAV, hdr, flags=re.S)
    take = ''.join(f'<li>{inline(t)}</li>' for t in d['take'])
    sidecta = '<div class="sidecta"><span class="lab">Free from Hinge Care</span><b>The seven daily habits that make arthritis worse</b><p>A short free download. Spot them, swap them.</p><a href="guide.html">Download it free</a></div>'
    page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-J2EM6YK5LY"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-J2EM6YK5LY');</script><script defer src="/hc-track.js"></script>
<title>{e(title)}</title>
<meta name="description" content="{e(d['desc'])}">
<link rel="canonical" href="{url}">
<link rel="icon" href="/favicon.ico?v=5" sizes="any"><link rel="icon" href="/brand/hinge-care-icon-green.svg?v=5" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png?v=5">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet">
<meta property="og:type" content="article"><meta property="og:site_name" content="Hinge Care"><meta property="og:title" content="{e(d['title'])}"><meta property="og:description" content="{e(d['desc'])}"><meta property="og:image" content="{SITE}/journal-img/{img}"><meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="journal.css?v=11">
{ld}</head><body><a class="skip" href="#main">Skip to content</a><div id="prog"></div>{hdr}<main id="main"><header class="head"><div><div class="kick"><a href="articles.html">Journal</a> / {e(d['cat'])}</div><h1 class="t">{e(d['h1'], quote=False)}</h1><p class="dek">{inline(d['dek'])}</p><div class="by">{avatar}<div><b>The Hinge Care team</b><br>Updated {nice} · <span class="chk">☀ Every fact linked to a source below</span></div></div><details class="mtoc"><summary>In this article</summary>{tocs}</details></div><figure class="hero"><img src="journal-img/{img}" alt="{e(alt)}" fetchpriority="high"><figcaption>{e(alt)}</figcaption></figure></header><div class="wrap"><article class="body"><section class="take"><h2>The short answer</h2><ul>{take}</ul></section><p class="lead">{inline(d['lead'])}</p>
{body}
<aside class="signup"><img src="images/cover-habits-rust.jpg?v=9" alt="Cover of the free guide 7 Bad Habits for Arthritis That Keep You Stuck" loading="lazy"><div><div class="lab">Free guide</div><h3>The seven daily habits that make arthritis worse</h3><p>Most people with arthritis have at least one without knowing it. Our free download shows how to spot each and what to do instead.</p><a href="guide.html">Get the free download</a></div></aside>
<h2 id="faq">Questions people ask</h2><div class="faq">{faq_html}</div><section class="refs" id="refs"><h2>Sources</h2><ol>{refs}</ol></section><p class="disc">Hinge Care shares general information, not personal medical advice. Get your doctor’s okay first if you plan to try a new remedy or exercise.</p></article><aside class="side"><nav class="toc" aria-label="In this article"><p>In this article</p>{tocs}</nav>{sidecta}</aside></div><section class="rel"><h2>Keep reading</h2><div class="cards">{cards}</div></section></main>{footer}</body></html>
'''
    open(f'{ROOT}/{slug}.html', 'w', encoding='utf-8').write(page)
    return slug
if __name__ == '__main__':
    files = sorted(glob.glob(f'{B}/content/*.txt'))
    registry = dict(EXISTING)
    for p in files:
        d = parse(p); s = os.path.splitext(os.path.basename(p))[0]
        registry[s] = dict(h1=d['h1'], cat=d['cat'], img=d['hero'].split('|')[0].strip(), blurb=d.get('blurb', d['dek'][:110]))
    for p in files: print('built', build(p, registry))
