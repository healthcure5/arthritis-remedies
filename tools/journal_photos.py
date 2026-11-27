"""Apply the Column Inches edition to journal pages the builder doesn't make
(4 hand-made articles + index pages), and to the shared header/footer parts."""
import re, json, glob, os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = json.load(open(f'{R}/_build/photos.json'))
def px(i, w): return f'https://images.pexels.com/photos/{i}/pexels-photo-{i}.jpeg?auto=compress&cs=tinysrgb&w={w}'
LOGO = re.compile(r'<svg class="sun"[^>]*>(?:(?!<svg).)*?</svg><span>Hinge <i>Care</i></span>', re.S)
FONTS = re.compile(r'<link href="https://fonts.googleapis.com/css2\?[^"]*" rel="stylesheet">')
NEWF = '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap" rel="stylesheet">'
INLINE = {'morning-joint-stiffness': (4581377, 'A woman holding a hot drink in both hands behind a rainy window'),
 'gentle-exercises-for-arthritis-seniors': (20118561, 'An older man out for a walk with walking poles'),
 'castor-oil-pack-for-joints': (6633422, 'A woman wrapped in a knitted blanket on the sofa in the evening'),
 'help-parent-with-arthritis': (7262450, 'Hands lifting a wooden lid off a glass jar on the counter')}
def common(s):
    s = LOGO.sub('Hinge Care <small>Journal</small>', s)
    s = FONTS.sub(NEWF, s)
    s = re.sub(r'journal\.css\?v=\d+', 'journal.css?v=20', s)
    s = s.replace('Free to read · Every claim sourced', 'Free to read. Every claim sourced.')
    s = s.replace('Illustrations made for Hinge Care with AI. ', 'Article photos from Pexels. ')
    s = re.sub(r'<div class="av"><svg class="sun"[^>]*>(?:(?!</div>).)*?</svg></div>', '<div class="av" aria-hidden="true"></div>', s, flags=re.S)
    # cards and featured links: photo of the linked article
    s = re.sub(r'(<a class="(?:card|feat)" href="([a-z-]+)\.html"><img src=")journal-img/[a-z-]+\.jpg(")',
               lambda m: m.group(1) + px(P[m.group(2)][0], 800 if 'feat' in m.group(0) else 600) + m.group(3) if m.group(2) in P else m.group(0), s)
    s = re.sub(r'<div class="banner">.*?</div>', '', s, flags=re.S)
    return s
for part in ('header', 'footer'):
    f = f'{R}/_build/parts/{part}.html'; open(f, 'w').write(common(open(f).read()))
for f in glob.glob(f'{R}/*.html'):
    s = open(f).read()
    if 'journal.css' not in s: continue
    slug = os.path.basename(f)[:-5]; o = s; s = common(s)
    if slug in INLINE:
        i, alt, cap = P[slug]
        s = re.sub(r'<meta property="og:image" content="[^"]*">', f'<meta property="og:image" content="{px(i,1200)}">', s)
        s = re.sub(r'("image":\s*")https://myhingecare\.com/journal-img/[a-z-]+\.jpg', lambda m: m.group(1) + px(i, 1200), s)
        s = re.sub(r'<figure class="hero"><img [^>]*><figcaption>.*?</figcaption></figure>',
                   f'<figure class="hero"><img src="{px(i,1200)}" srcset="{px(i,800)} 800w, {px(i,1200)} 1200w, {px(i,1800)} 1800w" sizes="(max-width:1240px) 100vw, 1160px" alt="{alt}" width="1200" height="600" fetchpriority="high"><figcaption>{cap} <small>Photo: Pexels</small></figcaption></figure>', s, flags=re.S)
        j, a2 = INLINE[slug]
        s = re.sub(r'(<figure class="inline-img">)<img [^>]*>(<figcaption>)(.*?)(</figcaption>)',
                   lambda m: f'{m.group(1)}<img src="{px(j,1000)}" alt="{a2}" loading="lazy" width="1000" height="667">{m.group(2)}{m.group(3)} <small>Photo: Pexels</small>{m.group(4)}', s, count=1, flags=re.S)
        s = re.sub(r'Updated ([A-Z][a-z]+ \d+, \d{4}) · <a class="chk"', r'Updated \1. <a class="chk"', s)
    if s != o: open(f, 'w').write(s); print('updated', slug)
