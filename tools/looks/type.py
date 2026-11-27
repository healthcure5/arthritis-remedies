# Five font and lettering options on the live home page. Layout, colours and photos stay as they are.
import os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from common import value_block
root = os.path.join(os.path.dirname(__file__), "..", "..")
src = open(os.path.join(root, "index.html")).read()

OPTS = [
 ("1. Warm classic", "family=Lora:ital,wght@0,600;1,600&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700",
  "Lora", "Nunito Sans", """
body{font-size:19px;line-height:1.7}
h1{font-size:clamp(36px,5.4vw,56px)!important;letter-spacing:-.015em}
h2{font-style:italic;letter-spacing:-.01em}
.eye{letter-spacing:.04em!important;text-transform:none!important;font-size:15px!important}
"""),
 ("2. Clear and easy", "family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&family=Atkinson+Hyperlegible:wght@400;700",
  "Source Serif 4", "Atkinson Hyperlegible", """
body{font-size:19px;line-height:1.72}
h1,h2,h3{font-weight:700!important}
h1{font-size:clamp(38px,5.8vw,60px)!important;line-height:1.04!important;letter-spacing:-.02em}
h2{letter-spacing:-.015em}
.lede{font-size:21px!important}
.eye{text-transform:none!important;letter-spacing:.02em!important;font-size:15.5px!important}
"""),
 ("3. Bold contrast", "family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700",
  "DM Serif Display", "DM Sans", """
body{font-size:18.5px;line-height:1.66}
h1,h2,h3{font-weight:400!important}
h1{font-size:clamp(42px,6.8vw,72px)!important;line-height:1!important;letter-spacing:-.02em}
h2{font-size:clamp(32px,4.4vw,50px)!important;line-height:1.04!important}
.stat .n{font-size:clamp(40px,6vw,66px)!important}
.eye{text-transform:none!important;letter-spacing:.01em!important;font-size:15px!important}
"""),
 ("4. Modern friendly", "family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,600..800&family=Figtree:wght@400;500;600;700",
  "Bricolage Grotesque", "Figtree", """
body{font-size:18.5px;line-height:1.65}
h1,h2,h3,.brand,.price,.num,.stat .n{font-variation-settings:"opsz" 96,"wdth" 92;font-weight:700!important}
h1{font-size:clamp(38px,6vw,64px)!important;line-height:1.02!important;letter-spacing:-.03em}
h2{letter-spacing:-.025em}
.eye{text-transform:none!important;letter-spacing:0!important;font-size:15px!important}
"""),
 ("5. Soft and gentle", "family=Newsreader:ital,opsz,wght@0,6..72,500;1,6..72,500&family=Mulish:wght@400;600;700",
  "Newsreader", "Mulish", """
body{font-size:18.5px;line-height:1.78}
h1,h2,h3{font-weight:500!important}
h1{font-style:italic;font-size:clamp(40px,6vw,64px)!important;line-height:1.02!important}
h2{font-style:italic;font-size:clamp(30px,4vw,44px)!important}
.eye{text-transform:none!important;letter-spacing:.02em!important;font-size:15px!important}
"""),
]

VAL_CSS = """
.val .vgrid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:22px}
.val .vgrid>div{background:#fff;border:1px solid var(--line);border-radius:20px;padding:26px}
.val .vget{border-top:4px solid var(--gold)!important}.val .vcost{border-top:4px solid var(--g2)!important}
.val h3{font-size:24px;margin-bottom:10px}
.val ul{list-style:none;padding:0;margin:0}.val li{padding:12px 0;border-top:1px solid var(--line)}
.val .vcost li{display:grid;grid-template-columns:78px 1fr;gap:12px}.val .vcost b{color:var(--g2)}
@media(max-width:760px){.val .vgrid{grid-template-columns:1fr}}
"""

files = [f"preview-type{i}.html" for i in range(1, 6)]
for i, (name, fonts, hf, bf, extra) in enumerate(OPTS):
    css = (f"body,.eye,.b,.lede,.payline,.price small,.card .price small,.buy .price small,input,button,.mnav summary{{font-family:'{bf}',system-ui,sans-serif!important}}"
           f"h1,h2,h3,.brand,.price,.num,.stat .n,.vids figcaption b,.mnav .mlinks a,.finale h2{{font-family:'{hf}',Georgia,serif!important}}" + extra + VAL_CSS +
           ".lookbar{position:fixed;left:12px;bottom:12px;z-index:90;display:flex;gap:6px;max-width:calc(100% - 24px);overflow-x:auto;background:#fff;border:1px solid #ccc;border-radius:14px;padding:6px;box-shadow:0 10px 30px -12px rgba(0,0,0,.35);font:600 14px/1 system-ui,sans-serif!important}"
           ".lookbar a{color:#1F3A27;text-decoration:none;padding:9px 11px;border-radius:9px;white-space:nowrap;font-family:system-ui,sans-serif!important}.lookbar a[aria-current]{background:#1F3A27;color:#fff}")
    bar = '<nav class="lookbar" aria-label="Compare fonts">' + ''.join(
        f'<a href="/{files[k]}"{" aria-current=\"page\"" if k == i else ""}>{OPTS[k][0]}</a>' for k in range(5)) + '<a href="/">Live site</a></nav>'
    t = src.replace('<head>', '<head><meta name="robots" content="noindex,nofollow">', 1)
    t = t.replace('</head>', f'<link href="https://fonts.googleapis.com/css2?{fonts}&display=swap" rel="stylesheet"><style>{css}</style></head>', 1)
    t = re.sub(r'(<body[^>]*>)', lambda m: m.group(1) + bar, t, count=1)
    # value section goes right after the "first hour" section, before the stats
    anchor = '<section class="s"><div class="w">\n<div class="stats'
    assert anchor in t, "anchor"
    t = t.replace(anchor, value_block() + anchor, 1)
    open(os.path.join(root, files[i]), "w").write(t)
print("built", files)
