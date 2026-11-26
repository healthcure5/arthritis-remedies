#!/usr/bin/env python3
"""Builds arthritis-questions.html (index of every page), about-hinge-care.html, and refreshes the article list in articles.html.
Run after build_journal.py."""
import os, re, glob, html, json, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_journal as bj
ROOT, B, SITE, e = bj.ROOT, bj.B, bj.SITE, html.escape
files = sorted(glob.glob(f'{B}/content/*.txt'))
pages = dict(bj.EXISTING)
for p in files:
    d = bj.parse(p); s = os.path.splitext(os.path.basename(p))[0]
    pages[s] = dict(h1=d['h1'], cat=d['cat'], img=d['hero'].split('|')[0].strip(), blurb=d.get('blurb', d['dek'][:110]))
def shell(slug, title, desc, h1, dek, body, extra_ld=''):
    url = f'{SITE}/{slug}.html'
    hdr = re.sub(r'<nav class="mnav".*?</nav>', bj.NAV, bj.header, flags=re.S)
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-J2EM6YK5LY"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-J2EM6YK5LY');</script><script defer src="/hc-track.js"></script>
<title>{e(title)}</title><meta name="description" content="{e(desc)}"><link rel="canonical" href="{url}">
<link rel="icon" href="/favicon.ico?v=5" sizes="any"><link rel="icon" href="/brand/hinge-care-icon-green.svg?v=5" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png?v=5">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet">
<meta property="og:type" content="website"><meta property="og:site_name" content="Hinge Care"><meta property="og:title" content="{e(h1)}"><meta property="og:description" content="{e(desc)}">
<link rel="stylesheet" href="journal.css?v=12">{extra_ld}</head><body><a class="skip" href="#main">Skip to content</a><div id="prog"></div>{hdr}<main id="main"><header class="ihead"><div class="kick"><a href="articles.html">Journal</a></div><h1>{e(h1)}</h1><p class="dek" style="margin:0;max-width:720px">{dek}</p></header>{body}</main>{bj.footer}<script src="/menu.js?v=2" defer></script></body></html>
'''
# --- questions index
order = ['Types', 'Symptoms', 'Mornings', 'Movement', 'Remedies', 'Caregivers', 'Glossary']
groups = {}
for s, m in pages.items(): groups.setdefault(m['cat'], []).append((s, m))
sec = ''
for c in order + [c for c in groups if c not in order]:
    if c not in groups: continue
    items = ''.join(f'<li><a href="{s}.html"><b>{e(m["h1"])}</b></a><br>{e(m["blurb"])}</li>' for s, m in sorted(groups[c]))
    sec += f'<section class="body" style="max-width:760px;margin:0 auto 28px;padding:0 16px"><h2>{e(c)}</h2><ul>{items}</ul></section>'
ld = '<script type="application/ld+json">' + json.dumps({"@context":"https://schema.org","@type":"CollectionPage","name":"Arthritis questions answered | Hinge Care","url":SITE+"/arthritis-questions.html","isPartOf":{"@type":"WebSite","name":"Hinge Care","url":SITE+"/"}}) + '</script>'
open(f'{ROOT}/arthritis-questions.html','w',encoding='utf-8').write(shell('arthritis-questions','Arthritis Questions Answered in Plain Words | Hinge Care','Every Hinge Care page in one place: types of arthritis, symptoms, mornings, movement, remedies, caregiving and a plain glossary. Each answer links its sources.','Arthritis questions, answered in plain words','Pick the question closest to yours. Every page links its sources,.',sec,ld))
# --- about
about = '''<section class="body" style="max-width:760px;margin:0 auto 40px;padding:0 16px">
<h2>What Hinge Care is</h2>
<p>Hinge Care is a small team that writes plain-spoken help for people living with arthritis and for the grown children who worry about them. We read what the NIH, the CDC, the Mayo Clinic and the Arthritis Foundation say, and put it in words you can use at the kitchen table. Every journal page links its sources.</p>
<h2>Start here, free</h2>
<ul>
<li><a href="guide.html"><b>7 Bad Habits for Arthritis That Keep You Stuck</b></a>: a free guide to seven everyday habits and the fix for each.</li>
<li><a href="challenge.html"><b>Easier Mornings</b></a>: a free five-day email challenge, one small thing to try each morning.</li>
<li><a href="articles.html"><b>The Hinge Care Journal</b></a> and the <a href="arthritis-questions.html">full list of questions answered</a>.</li>
</ul>
<h2>If you want more</h2>
<ul>
<li><a href="book.html"><b>The Joint Reset</b></a>: a large-print book on which home remedies are worth your money, $17.</li>
<li><a href="club.html"><b>The Club</b></a>: a weekly seated routine, a recipe and a Sunday letter, $9 a month for founding members.</li>
<li><a href="circle.html"><b>The Circle</b></a>: a small live group of twenty. The founding round opens January 2027.</li>
</ul>
<h2>Talk to us</h2>
<p>Questions or corrections are welcome at <a href="contact.html">our contact page</a>. If a fact on a page looks wrong, tell us and we will check the source.</p>
</section>'''
ld2 = '<script type="application/ld+json">' + json.dumps({"@context":"https://schema.org","@type":"Organization","name":"Hinge Care","url":SITE+"/","email":"arthritis@myhingecare.com","logo":SITE+"/brand/icon-512.png"}) + '</script>'
open(f'{ROOT}/about-hinge-care.html','w',encoding='utf-8').write(shell('about-hinge-care','About Hinge Care: Plain Help for Arthritis','About Hinge Care, a plain-spoken arthritis help site: free guides, a free 5-day challenge, a large-print book, a membership and a small live group.','About Hinge Care','Plain-spoken, sourced help for people with arthritis and the families who care about them.',about,ld2))
# --- articles.html list
t = open(f'{ROOT}/articles.html',encoding='utf-8').read()
cards = ''.join(f'<a class="card" href="{s}.html"><img src="journal-img/{m["img"]}" alt="" loading="lazy"><span>{e(m["cat"])}</span><h3>{e(m["h1"])}</h3><p>{e(m["blurb"])}</p></a>' for s, m in sorted(pages.items(), key=lambda x:(order.index(x[1]['cat']) if x[1]['cat'] in order else 99, x[0])) if s != 'morning-joint-stiffness')
t = re.sub(r'(<section class="rel"><h2>)More articles(</h2><div class="cards">).*?(</div></section>)', lambda m: m.group(1)+'More articles'+m.group(2)+cards+m.group(3), t, count=1, flags=re.S)
open(f'{ROOT}/articles.html','w',encoding='utf-8').write(t)
print('index/about/articles done', len(pages))
