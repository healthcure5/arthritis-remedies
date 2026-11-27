# Three younger colour options on the live home page. Only colours change: same fonts, layout and photos.
import os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from common import value_block
root = os.path.join(os.path.dirname(__file__), "..", "..")
src = open(os.path.join(root, "index.html")).read()

# name, page bg, panel bg, line, body text, soft text, button colour, button shadow, button hover, accent for numbers/ticks
OPTS = [
 ("1. Fresh oat", "#FBFAF6", "#EFF3EB", "#E1E6DC", "#1F2A22", "#46544A", "#2F6B47", "#1F4A31", "#367A52", "#2F6B47"),
 ("2. Soft blush", "#FDF9F6", "#F8EDE8", "#EEDFD8", "#2A2426", "#5A4C50", "#8A3D5E", "#632A43", "#9A4769", "#8A3D5E"),
 ("3. Morning sky", "#FAFAF7", "#EAF2F3", "#DAE6E8", "#1E2A2C", "#455659", "#1E6670", "#14474E", "#25747F", "#1E6670"),
]

def css(o):
    name, bg, panel, line, ink, soft, btn, shadow, hover, acc = o
    tick = acc.replace('#', '%23')
    return f""":root{{--cream:{bg};--sand:{panel};--line:{line};--ink:{ink};--soft:{soft};--rust:{acc}}}
body{{background:{bg}}}.hd{{background:{bg}}}
.b3{{background:{btn}!important;box-shadow:0 4px 0 {shadow}!important;color:#fff!important}}.b3:hover{{background:{hover}!important}}
.num{{color:{acc}!important}}
ul.ticks li::before{{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 6L9 17l-5-5' fill='none' stroke='{tick}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")!important}}
a:focus-visible,button:focus-visible,summary:focus-visible,input:focus-visible{{outline-color:{btn}!important}}
.val .vgrid{{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:22px}}
.val .vgrid>div{{background:#fff;border:1px solid {line};border-radius:20px;padding:26px}}
.val .vget{{border-top:4px solid var(--gold)!important}}.val .vcost{{border-top:4px solid {btn}!important}}
.val h3{{font-size:24px;margin-bottom:10px}}.val ul{{list-style:none;padding:0;margin:0}}.val li{{padding:12px 0;border-top:1px solid {line}}}
.val .vcost li{{display:grid;grid-template-columns:78px 1fr;gap:12px}}.val .vcost b{{color:{btn}}}
@media(max-width:760px){{.val .vgrid{{grid-template-columns:1fr}}}}
.lookbar{{position:fixed;left:12px;bottom:12px;z-index:90;display:flex;gap:6px;max-width:calc(100% - 24px);overflow-x:auto;background:#fff;border:1px solid #ccc;border-radius:14px;padding:6px;box-shadow:0 10px 30px -12px rgba(0,0,0,.35);font:600 14px/1 system-ui,sans-serif}}
.lookbar a{{color:#1F3A27;text-decoration:none;padding:9px 11px;border-radius:9px;white-space:nowrap}}.lookbar a[aria-current]{{background:#1F3A27;color:#fff}}"""

files = [f"preview-color{i}.html" for i in range(1, len(OPTS) + 1)]
for i, o in enumerate(OPTS):
    bar = '<nav class="lookbar" aria-label="Compare colours">' + ''.join(
        f'<a href="/{files[k]}"{" aria-current=\"page\"" if k == i else ""}>{OPTS[k][0]}</a>' for k in range(len(OPTS))) + '<a href="/">Live site (now)</a></nav>'
    t = src.replace('<head>', '<head><meta name="robots" content="noindex,nofollow">', 1)
    t = t.replace('</head>', f'<style>{css(o)}</style></head>', 1)
    t = re.sub(r'(<body[^>]*>)', lambda m: m.group(1) + bar, t, count=1)
    anchor = '<section class="s"><div class="w">\n<div class="stats'
    assert anchor in t
    if "class=\"s val\"" not in t: t = t.replace(anchor, value_block() + anchor, 1)
    open(os.path.join(root, files[i]), "w").write(t)
print("built", files)
