import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

def nav(cls="nav"):
    return f'<nav class="{cls}" aria-label="Main">' + ''.join(f'<a href="{h}">{t}</a>' for h, t in NAV) + '</nav>'

def trust_ul(cls="trust"):
    return f'<ul class="{cls}">' + ''.join(f'<li>{t}</li>' for t in TRUST) + '</ul>'

def sources_ul(cls="srcs"):
    return f'<ul class="{cls}">' + ''.join(f'<li><a href="{u}" rel="noopener" target="_blank">{n}</a></li>' for u, n in SOURCES) + '</ul>'

def foot(cls="ft"):
    return f'''<footer class="{cls}"><div class="w"><p>{logo("flogo")}</p><p class="flinks"><a href="guide.html">Free book</a> <a href="book.html">The Joint Reset</a> <a href="course-info.html">The Program</a> <a href="club.html">The Club</a> <a href="about-hinge-care.html">About</a> <a href="contact.html">Contact</a> <a href="refunds.html">Refunds</a> <a href="privacy.html">Privacy</a></p><p class="fnote">{FOOT_NOTE}</p></div></footer>'''

def club_btns():
    return f'<a class="buy" href="{CLUB["buyhref"]}">{CLUB["buy"]}</a><a class="ghost" href="{CLUB["seehref"]}">{CLUB["see"]}</a>'

# ---------------------------------------------------------------- A: Bold poster
def design_a():
    fonts = "family=Archivo:wdth,wght@62..125,400..900"
    css = """
:root{--paper:#F1F3F6;--ink:#10131A;--soft:#3E4452;--co:#2340D3;--co2:#1A2FA0;--sun:#FFE07A}
body{background:var(--paper);color:var(--ink);font:400 18px/1.6 Archivo,system-ui,sans-serif;font-stretch:100%}
.w{max-width:1240px;margin:0 auto;padding:0 24px}
a{color:var(--co)}
h1,h2,h3{margin:0;font-family:Archivo,sans-serif}
.hd{display:flex;align-items:center;gap:28px;padding:18px 0}.logo{font-weight:800;font-size:22px;color:var(--ink);text-decoration:none;font-stretch:112%}
.nav{display:flex;gap:26px;margin-left:auto}.nav a{color:var(--ink);text-decoration:none;font-weight:600}.nav a:hover{color:var(--co)}
.btn{display:inline-flex;align-items:center;min-height:54px;padding:0 24px;border-radius:6px;background:var(--co);color:#fff;font-weight:700;text-decoration:none}
.btn:hover{background:var(--co2)}.ghost{display:inline-flex;align-items:center;min-height:54px;padding:0 22px;border:2px solid currentColor;border-radius:6px;color:inherit;font-weight:700;text-decoration:none}
.hero{padding:30px 0 70px}
.hero h1{font-weight:900;font-stretch:125%;font-variation-settings:"wdth" 125;font-size:clamp(46px,7.6vw,118px);line-height:.92;letter-spacing:-.035em}
.hero h1 span{display:block;animation:rise .7s cubic-bezier(.2,.7,.2,1) both}.hero h1 span:nth-child(2){animation-delay:.08s}.hero h1 span:nth-child(3){animation-delay:.16s}
@keyframes rise{from{transform:translateY(40px);opacity:0}}
.hgrid{display:grid;grid-template-columns:1fr 440px;gap:48px;margin-top:38px;align-items:start}
.lede{font-size:21px;line-height:1.55;color:var(--soft);max-width:40ch;margin:0}
.trust{list-style:none;padding:0;margin:26px 0 0;display:flex;flex-wrap:wrap;gap:10px 22px;font-weight:600}.trust li::before{content:"";display:inline-block;width:10px;height:10px;background:var(--co);margin-right:9px}
.sign{background:var(--sun);padding:26px;border-radius:4px;box-shadow:10px 10px 0 var(--ink)}.sign .lbl{font-size:20px;font-stretch:112%}
.sign input{border-color:var(--ink)}
.pics{display:grid;grid-template-columns:1.5fr 1fr;grid-template-rows:auto auto;gap:18px}
.pics figure{margin:0}.pics figure:first-child{grid-row:span 2}.pics img{width:100%;object-fit:cover;border-radius:4px}
.pics figure:first-child img{aspect-ratio:1/1}.pics figure:not(:first-child) img{aspect-ratio:16/10}
.pics figcaption{margin-top:10px}.pics b{display:block;font-size:22px;font-weight:800;font-stretch:75%;font-variation-settings:"wdth" 75;letter-spacing:-.01em}.pics span{color:var(--soft);font-size:17px}
.stats{background:var(--co);color:#fff;margin:80px 0 0}.stats .w{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;padding:46px 24px}
.stat .n{display:block;font-weight:900;font-stretch:125%;font-variation-settings:"wdth" 125;font-size:clamp(34px,4.6vw,62px);line-height:1;letter-spacing:-.03em}.stat .l{display:block;margin-top:10px;color:#D9DFFF;font-size:17px}
.stat s.was{font-size:.5em;vertical-align:middle}
section.s{padding:84px 0}
.s h2{font-weight:900;font-stretch:75%;font-variation-settings:"wdth" 75;font-size:clamp(36px,5vw,64px);line-height:.98;letter-spacing:-.02em;max-width:16ch;margin-bottom:22px}
.two{display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:start}
.two p{font-size:19px}.quote{border-left:10px solid var(--sun);padding:6px 0 6px 26px}.quote .eye{font-weight:700;color:var(--co);margin:0 0 6px}.quote h3{font-size:26px;font-weight:800;font-stretch:90%;font-variation-settings:"wdth" 90;margin-bottom:8px}
.srcs{list-style:none;padding:0;margin:24px 0 0;display:flex;flex-wrap:wrap;gap:10px}.srcs a{display:inline-block;padding:10px 16px;border:2px solid var(--ink);border-radius:999px;color:var(--ink);text-decoration:none;font-weight:600}.srcs a:hover{background:var(--ink);color:#fff}
.sub{color:var(--soft);max-width:60ch;font-size:19px}
.rows{margin-top:30px;border-top:3px solid var(--ink)}
.row{display:grid;grid-template-columns:110px 1fr 200px 200px;gap:28px;align-items:center;padding:24px 0;border-bottom:1px solid #C9CED8}
.row img{width:110px;aspect-ratio:3/4;object-fit:cover;border-radius:3px}
.row .eye{margin:0;font-weight:700;color:var(--co);font-size:15px}.row h3{font-size:28px;font-weight:800;font-stretch:90%;font-variation-settings:"wdth" 90;margin:2px 0 6px}.row p{margin:0;color:var(--soft)}
.row .price{font-weight:900;font-stretch:125%;font-variation-settings:"wdth" 125;font-size:38px;letter-spacing:-.03em}.row .price small{display:block;font:500 15px Archivo,sans-serif;color:var(--soft);letter-spacing:0}
.club{margin-top:26px;background:var(--ink);color:#fff;border-radius:4px;padding:34px;display:grid;grid-template-columns:1fr auto;gap:30px;align-items:center}
.club .eye{color:var(--sun);font-weight:700;margin:0}.club h3{font-size:34px;font-weight:900;font-stretch:90%;font-variation-settings:"wdth" 90;margin:4px 0 8px}.club p{color:#CFD3DC;margin:0;max-width:60ch}
.club .opts{display:flex;flex-direction:column;gap:12px;min-width:250px}.club .fine{font-size:14px;color:#AEB4C2;margin:0}
.steps{list-style:none;padding:0;margin:36px 0 0;display:grid;grid-template-columns:repeat(3,1fr);gap:34px}
.steps .num{display:block;font-weight:900;font-stretch:125%;font-variation-settings:"wdth" 125;font-size:120px;line-height:.85;color:transparent;-webkit-text-stroke:3px var(--co)}
.steps h3{font-size:24px;font-weight:800;font-stretch:90%;font-variation-settings:"wdth" 90;margin:14px 0 6px}.steps p{margin:0;color:var(--soft)}
.fin{background:var(--sun);padding:96px 0}.fin h2{font-weight:900;font-stretch:125%;font-variation-settings:"wdth" 125;font-size:clamp(48px,9vw,132px);line-height:.88;letter-spacing:-.04em;margin:0 0 18px}.fin p{font-size:21px;margin:0 0 26px}
.ft{background:var(--ink);color:#C9CED8;padding:40px 0;font-size:16px}.ft a{color:#fff;margin-right:16px}.flogo{color:#fff!important;text-decoration:none;font-weight:800;font-size:20px}
@media(max-width:900px){.nav{display:none}.hgrid,.two,.club{grid-template-columns:1fr}.pics{grid-template-columns:1fr}.pics figure:first-child{grid-row:auto}.pics figure:first-child img{aspect-ratio:16/11}
.stats .w{grid-template-columns:1fr 1fr}.row{grid-template-columns:80px 1fr;gap:16px}.row img{width:80px}.row .price,.row .act{grid-column:2}.steps{grid-template-columns:1fr}.steps .num{font-size:90px}.sign{box-shadow:6px 6px 0 var(--ink)}}
.val{background:#fff}.vgrid{display:grid;grid-template-columns:1fr 1fr;gap:0;border:3px solid var(--ink)}
.vgrid>div{padding:34px}.vget{background:var(--sun)}.vgrid h3{font-size:26px;font-weight:900;font-stretch:90%;font-variation-settings:"wdth" 90;margin-bottom:16px}
.vgrid ul{list-style:none;padding:0;margin:0}.vgrid li{padding:14px 0;border-top:2px solid var(--ink);font-size:19px}.vcost li{display:grid;grid-template-columns:90px 1fr;gap:14px}.vcost b{font-weight:900;color:var(--co)}
@media(max-width:900px){.vgrid{grid-template-columns:1fr}}
"""
    pics = ''.join(f'<figure><img src="{s}" alt="{a}" loading="lazy"><figcaption><b>{t}</b><span>{c}</span></figcaption></figure>' for s, a, t, c in PHOTOS)
    stats = ''.join(f'<div class="stat"><span class="n">{n}</span><span class="l">{l}</span></div>' for n, l in STATS)
    rows = ''.join(f'''<div class="row"><img src="{p["img"]}" alt="{p["alt"]}" loading="lazy"><div><p class="eye">{p["eye"]}</p><h3>{p["name"]}</h3><p>{p["text"]}</p></div><p class="price">{p["price"]}<small>{p["small"]}</small></p><p class="act"><a class="{'btn' if p.get('main') else 'ghost'}" href="{p["href"]}">{p["btn"]}</a></p></div>''' for p in PRODUCTS)
    steps = ''.join(f'<li><span class="num" aria-hidden="true">{i}</span><h3>{h}</h3><p>{p}</p></li>' for i, (h, p) in enumerate(STEPS, 1))
    body = f'''<div class="w hd">{logo()}{nav()}<a class="btn" href="guide.html">Start free</a></div>
<main id="main"><section class="hero"><div class="w"><h1><span>Get your</span><span>mornings back</span><span>from arthritis.</span></h1>
<div class="hgrid"><div><p class="lede">{LEDE}</p>{trust_ul()}</div>{form()}</div></div></section>
<div class="w"><div class="pics">{pics}</div></div>
<section class="stats"><div class="w">{stats}</div></section>
<section class="s"><div class="w two"><div><h2>{HOUR_H}</h2><p>{HOUR_P1}</p><p>{HOUR_P2}</p></div><div class="quote"><p class="eye">About Hinge Care</p><h3>{ABOUT_H}</h3><p>{ABOUT_P}</p><p>{ABOUT_P2}</p></div></div></section>
{value_block()}<section class="s" id="shop" style="background:#fff"><div class="w"><h2>{SHOP_H}</h2><p class="sub">{SHOP_SUB}</p><div class="rows">{rows}</div>
<div class="club"><div><p class="eye">{CLUB["eye"]}</p><h3>{CLUB["h"]}</h3><p>{CLUB["p"]}</p></div><div class="opts">{club_btns()}<p class="fine">{CLUB["pay"]} {CLUB["gift"]}</p></div></div></div></section>
<section class="s"><div class="w"><h2>{STEPS_H}</h2><p class="sub">{STEPS_SUB}</p><ol class="steps">{steps}</ol></div></section>
<section class="s" style="padding-top:0"><div class="w"><h2>{SRC_H}</h2><p class="sub">{SRC_SUB}</p>{sources_ul()}<p style="margin-top:22px;font-weight:600">{SIGNOFF}</p></div></section>
<section class="fin"><div class="w"><h2>{FIN_H}</h2><p>{FIN_P}</p><a class="btn" href="guide.html">Start free</a> <a class="ghost" href="#shop">See prices</a></div></section></main>{foot()}'''
    return "A. Bold poster", fonts, css, body

# ---------------------------------------------------------------- B: Evening editorial
def design_b():
    fonts = "family=Cormorant+Garamond:ital,wght@0,600;1,500;1,600&family=Manrope:wght@400;500;700&family=Great+Vibes"
    css = """
:root{--aub:#2B1B2E;--aub2:#3D2841;--blush:#F7ECE7;--blush2:#EFDDD5;--gold:#D6B47A;--ink:#2A2228;--soft:#5A4C54}
body{background:var(--blush);color:var(--ink);font:400 18px/1.7 Manrope,system-ui,sans-serif}
.w{max-width:1180px;margin:0 auto;padding:0 28px}a{color:#6A3F63}
h1,h2,h3{font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;margin:0;letter-spacing:-.005em}
.hero{display:grid;grid-template-columns:1fr 1fr;min-height:88vh;background:var(--aub);color:#F3E7EC}
.hero .txt{padding:28px 56px 56px;display:flex;flex-direction:column}
.hd{display:flex;align-items:center;gap:26px}.logo{color:#fff;text-decoration:none;font:600 26px "Cormorant Garamond",serif}
.nav{display:flex;gap:22px;margin-left:auto}.nav a{color:#E9DCE3;text-decoration:none;font-weight:500;font-size:16px}.nav a:hover{color:var(--gold)}
.hero .inner{margin:auto 0}
.rule{display:block;width:72px;height:2px;background:var(--gold);margin:0 0 26px}
.hero h1{font-style:italic;font-weight:500;font-size:clamp(50px,6.4vw,96px);line-height:.98;color:#fff}
.lede{font-size:19px;color:#E4D5DD;max-width:38ch;margin:24px 0 30px}
.btn{display:inline-flex;align-items:center;min-height:54px;padding:0 26px;border-radius:2px;background:var(--gold);color:var(--aub);font-weight:700;text-decoration:none}
.ghost{display:inline-flex;align-items:center;min-height:54px;padding:0 22px;border:1px solid currentColor;border-radius:2px;color:inherit;text-decoration:none;font-weight:600}
.btns{display:flex;flex-wrap:wrap;gap:12px}
.trust{list-style:none;padding:0;margin:28px 0 0;font-size:15px;color:#CDBAC5;display:flex;flex-wrap:wrap;gap:6px 20px}.trust li::before{content:"\\2014\\00a0";color:var(--gold)}
.hero .pic{position:relative}.hero .pic img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.letter{max-width:700px;margin:0 auto;padding:110px 28px 90px;text-align:center}
.letter h2{font-style:italic;font-weight:500;font-size:clamp(38px,4.6vw,60px);line-height:1.05;margin-bottom:28px}
.letter p{font-size:20px;color:var(--soft)}
.about{max-width:860px;margin:0 auto 100px;padding:44px 50px;background:#fff;border-top:3px solid var(--gold);text-align:left}
.about .eye{font-weight:700;color:#7A4E70;margin:0 0 8px;font-size:15px}.about h3{font-size:34px;margin-bottom:10px}.about p{color:var(--soft)}
.pics{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;padding-bottom:110px}.pics figure{margin:0}.pics figure:nth-child(2){margin-top:70px}
.pics img{aspect-ratio:3/4;object-fit:cover;width:100%}.pics b{display:block;font:italic 600 28px/1.1 "Cormorant Garamond",serif;margin:16px 0 6px}.pics span{color:var(--soft);font-size:16.5px}
.stats{background:var(--aub);color:#F3E7EC}.stats .w{display:grid;grid-template-columns:repeat(4,1fr);padding:56px 28px}
.stat{padding:0 24px;border-left:1px solid rgba(214,180,122,.5)}.stat:first-child{border-left:0;padding-left:0}
.stat .n{display:block;font:italic 600 clamp(36px,4vw,56px)/1 "Cormorant Garamond",serif;color:#fff}.stat .l{display:block;margin-top:10px;font-size:16px;color:#D9C7D1}
section.s{padding:100px 0}
.s h2{font-style:italic;font-weight:500;font-size:clamp(38px,4.6vw,62px);line-height:1.04;margin-bottom:14px}
.sub{color:var(--soft);max-width:58ch}
.menu{margin-top:40px}
.item{display:grid;grid-template-columns:80px 1fr;gap:26px;padding:28px 0;border-top:1px solid var(--blush2)}
.item img{width:80px;aspect-ratio:3/4;object-fit:cover}
.line{display:flex;align-items:baseline;gap:14px}.line h3{font-size:34px;font-style:italic;font-weight:600;white-space:nowrap}
.dots{flex:1;border-bottom:2px dotted #B99AA9;transform:translateY(-8px)}
.line .price{font:600 30px "Cormorant Garamond",serif;white-space:nowrap}.line .price small{font:500 14px Manrope,sans-serif;color:var(--soft);margin-left:6px}
.item .eye{margin:0 0 2px;font-size:14px;font-weight:700;color:#7A4E70}.item p.t{margin:6px 0 10px;color:var(--soft);max-width:60ch}.item a.more{font-weight:700}
.club{margin-top:30px;background:var(--aub);color:#F3E7EC;padding:42px;display:grid;grid-template-columns:1fr auto;gap:34px;align-items:center}
.club .eye{color:var(--gold);font-weight:700;margin:0}.club h3{font-style:italic;font-size:40px;color:#fff;margin:4px 0 10px}.club p{color:#D9C7D1;margin:0}
.club .opts{display:flex;flex-direction:column;gap:12px;min-width:250px}.club .fine{font-size:14px;color:#BFA9B6;margin:0}
.signband{background:var(--blush2);padding:80px 0}.signband .w{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center}
.signband h2{font-style:italic;font-weight:500;font-size:clamp(34px,4vw,52px);line-height:1.05}
.sign{background:#fff;padding:28px;border-top:3px solid var(--gold)}.sign .lbl{font:italic 600 24px "Cormorant Garamond",serif}
.steps{list-style:none;padding:0;margin:40px 0 0;display:grid;grid-template-columns:repeat(3,1fr);gap:40px}
.steps .num{font:italic 600 64px/1 "Cormorant Garamond",serif;color:#8E5F83}.steps h3{font-size:28px;margin:8px 0 6px}.steps p{color:var(--soft);margin:0}
.srcs{list-style:none;padding:0;margin:20px 0 0;columns:2;column-gap:40px}.srcs li{padding:10px 0;border-bottom:1px solid var(--blush2)}.srcs a{color:var(--ink)}
.sig{font:400 54px "Great Vibes",cursive;color:#6A3F63;display:block;margin-top:6px}
.fin{background:var(--aub);color:#F3E7EC;text-align:center;padding:120px 0}.fin h2{font-style:italic;font-weight:500;font-size:clamp(52px,8vw,112px);line-height:.95;color:#fff;margin:0 0 16px}.fin p{color:#D9C7D1;font-size:20px;margin:0 0 30px}.fin .btns{justify-content:center}
.ft{background:#1E1220;color:#BFA9B6;padding:40px 0;font-size:16px}.ft a{color:#fff;margin-right:16px}.flogo{color:#fff!important;text-decoration:none;font:600 24px "Cormorant Garamond",serif}
@media(max-width:900px){.hero{grid-template-columns:1fr;min-height:0}.hero .txt{padding:22px 24px 44px}.hero .pic{order:-1;height:56vw}.nav{display:none}
.pics{grid-template-columns:1fr}.pics figure:nth-child(2){margin-top:0}.stats .w{grid-template-columns:1fr 1fr;gap:28px 0}.stat:nth-child(3){border-left:0;padding-left:0}
.club,.signband .w{grid-template-columns:1fr}.steps{grid-template-columns:1fr}.srcs{columns:1}.line{flex-wrap:wrap}.dots{display:none}.line h3{white-space:normal;font-size:30px}.about{margin:0 20px 70px;padding:30px 24px}}
.val{background:#fff}.vgrid{display:grid;grid-template-columns:1fr 1fr;gap:56px;margin-top:30px}
.vgrid h3{font-style:italic;font-size:32px;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--gold)}
.vgrid ul{list-style:none;padding:0;margin:0}.vgrid li{padding:14px 0;border-bottom:1px solid var(--blush2);color:var(--soft)}
.vget li{font:italic 500 23px/1.35 "Cormorant Garamond",serif;color:var(--ink)}.vcost li{display:grid;grid-template-columns:80px 1fr;gap:14px}.vcost b{font-weight:700;color:#7A4E70}
@media(max-width:900px){.vgrid{grid-template-columns:1fr;gap:30px}}
"""
    pics = ''.join(f'<figure><img src="{s}" alt="{a}" loading="lazy"><figcaption><b>{t}</b><span>{c}</span></figcaption></figure>' for s, a, t, c in PHOTOS)
    stats = ''.join(f'<div class="stat"><span class="n">{n}</span><span class="l">{l}</span></div>' for n, l in STATS)
    items = ''.join(f'''<div class="item"><img src="{p["img"]}" alt="{p["alt"]}" loading="lazy"><div><p class="eye">{p["eye"]}</p><div class="line"><h3>{p["name"]}</h3><span class="dots"></span><span class="price">{p["price"]}{f'<small>{p["small"]}</small>' if p["small"] else ''}</span></div><p class="t">{p["text"]}</p><a class="more" href="{p["href"]}">{p["btn"]}</a></div></div>''' for p in PRODUCTS)
    steps = ''.join(f'<li><span class="num" aria-hidden="true">{i}.</span><h3>{h}</h3><p>{p}</p></li>' for i, (h, p) in enumerate(STEPS, 1))
    body = f'''<main id="main"><section class="hero"><div class="txt"><div class="hd">{logo("logo dk")}{nav()}</div><div class="inner"><span class="rule"></span><h1>{H1}</h1><p class="lede">{LEDE}</p>
<div class="btns"><a class="btn" href="#free">Get the free book</a><a class="ghost" href="#shop">See prices</a></div>{trust_ul()}</div></div>
<div class="pic"><img src="/images/px-couple-6962202.jpg" alt="A smiling couple outdoors in the morning" fetchpriority="high"></div></section>
<div class="letter"><h2>{HOUR_H}</h2><p>{HOUR_P1}</p><p>{HOUR_P2}</p></div>
<div class="about"><p class="eye">About Hinge Care</p><h3>{ABOUT_H}</h3><p>{ABOUT_P}</p><p>{ABOUT_P2}</p></div>
<div class="w"><div class="pics">{pics}</div></div>
<section class="stats"><div class="w">{stats}</div></section>
{value_block()}<section class="s" id="shop"><div class="w"><h2>{SHOP_H}</h2><p class="sub">{SHOP_SUB}</p><div class="menu">{items}</div>
<div class="club"><div><p class="eye">{CLUB["eye"]}</p><h3>{CLUB["h"]}</h3><p>{CLUB["p"]}</p></div><div class="opts">{club_btns()}<p class="fine">{CLUB["pay"]} {CLUB["gift"]}</p></div></div></div></section>
<section class="signband" id="free"><div class="w"><h2>{STEPS[0][0]}</h2>{form()}</div></section>
<section class="s"><div class="w"><h2>{STEPS_H}</h2><p class="sub">{STEPS_SUB}</p><ol class="steps">{steps}</ol></div></section>
<section class="s" style="padding-top:0"><div class="w"><h2>{SRC_H}</h2><p class="sub">{SRC_SUB}</p>{sources_ul()}<p style="margin-top:26px">{SIGNOFF}<span class="sig">Andre</span></p></div></section>
<section class="fin"><div class="w"><h2>{FIN_H}</h2><p>{FIN_P}</p><div class="btns"><a class="btn" href="#free">Start free</a><a class="ghost" href="#shop">See prices</a></div></div></section></main>{foot()}'''
    return "B. Evening editorial", fonts, css, body

# ---------------------------------------------------------------- C: Sunny and friendly
def design_c():
    fonts = "family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,600..800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700"
    css = """
:root{--navy:#13294B;--sky:#D7ECF9;--sun:#FFC93C;--sunl:#FFF1C7;--mint:#D3F2E2;--soft:#3F5170}
body{background:#fff;color:var(--navy);font:400 18px/1.65 "DM Sans",system-ui,sans-serif}
.w{max-width:1160px;margin:0 auto;padding:0 22px}a{color:var(--navy)}
h1,h2,h3{font-family:"Bricolage Grotesque",sans-serif;font-variation-settings:"opsz" 96;margin:0;letter-spacing:-.02em}
.hd{display:flex;align-items:center;gap:24px;padding:16px 0}.logo{font:800 23px "Bricolage Grotesque",sans-serif;color:var(--navy);text-decoration:none}
.nav{display:flex;gap:8px;margin-left:auto}.nav a{padding:10px 16px;border-radius:999px;text-decoration:none;font-weight:700}.nav a:hover{background:var(--sky)}
.btn{display:inline-flex;align-items:center;min-height:54px;padding:0 26px;border-radius:999px;background:var(--navy);color:#fff;font-weight:700;text-decoration:none;box-shadow:0 5px 0 #0A1830}
.ghost{display:inline-flex;align-items:center;min-height:54px;padding:0 24px;border-radius:999px;border:2.5px solid currentColor;color:inherit;font-weight:700;text-decoration:none}
.hero{text-align:center;padding:40px 0 30px}
.hero h1{font-weight:800;font-size:clamp(46px,7vw,96px);line-height:1.16}
.hero h1 span{display:inline;padding:0 .18em;border-radius:.28em;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.hero h1 .t1{background:var(--sky)}.hero h1 .t2{background:var(--sun)}
.lede{font-size:21px;color:var(--soft);max-width:44ch;margin:26px auto 30px}
.sign{max-width:620px;margin:0 auto;text-align:left;background:#fff;border:2.5px solid var(--navy);border-radius:24px;padding:24px;box-shadow:8px 8px 0 var(--navy)}
.sign .lbl{font:800 21px "Bricolage Grotesque",sans-serif}
.trust{list-style:none;padding:0;margin:24px 0 0;display:flex;justify-content:center;flex-wrap:wrap;gap:10px}.trust li{background:var(--mint);padding:8px 14px;border-radius:999px;font-weight:700;font-size:15px}
.polas{display:flex;justify-content:center;gap:26px;margin:60px 0 20px;flex-wrap:wrap}
.pola{background:#fff;padding:12px 12px 16px;border-radius:10px;box-shadow:0 16px 40px -18px rgba(19,41,75,.45);width:320px;margin:0}
.pola:nth-child(1){transform:rotate(-3deg)}.pola:nth-child(2){transform:rotate(2deg) translateY(18px)}.pola:nth-child(3){transform:rotate(-1.5deg)}
.pola img{aspect-ratio:1/1;object-fit:cover;border-radius:6px}.pola b{display:block;font:800 21px "Bricolage Grotesque",sans-serif;margin:12px 4px 4px}.pola span{display:block;margin:0 4px;font-size:16px;color:var(--soft)}
.stickers{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;padding:70px 0}
.stk{aspect-ratio:1/1;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:18px}
.stk:nth-child(1){background:var(--sun)}.stk:nth-child(2){background:var(--sky)}.stk:nth-child(3){background:var(--mint)}.stk:nth-child(4){background:var(--sunl)}
.stk .n{font:800 clamp(28px,3.6vw,46px)/1 "Bricolage Grotesque",sans-serif}.stk .l{font-size:15.5px;font-weight:500;margin-top:8px;max-width:16ch}
.navyband{background:var(--navy);color:#fff;padding:90px 0 130px}.navyband h2{font-weight:800;font-size:clamp(36px,5vw,62px);line-height:1.04;max-width:16ch}
.navyband p{color:#D6E0F0;font-size:20px;max-width:56ch}
.about{max-width:900px;margin:-80px auto 0;background:#fff;border-radius:28px;padding:36px 40px;box-shadow:0 20px 50px -24px rgba(19,41,75,.5);position:relative}
.about .eye{display:inline-block;background:var(--sky);padding:5px 12px;border-radius:999px;font-weight:700;font-size:15px;margin:0 0 10px}.about h3{font-size:30px;font-weight:800;margin-bottom:8px}.about p{color:var(--soft)}
section.s{padding:96px 0}.s h2{font-weight:800;font-size:clamp(34px,4.6vw,56px);line-height:1.06;max-width:18ch;margin-bottom:12px}.sub{color:var(--soft);max-width:58ch}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px}
.card{border-radius:30px;padding:28px;display:flex;flex-direction:column;gap:6px}
.card:nth-child(1){background:var(--sky)}.card:nth-child(2){background:var(--sunl)}.card:nth-child(3){background:var(--mint)}
.card img{width:58%;aspect-ratio:3/4;object-fit:cover;border-radius:10px;margin:0 auto 14px;box-shadow:0 14px 30px -14px rgba(0,0,0,.45);transform:rotate(-3deg)}
.card .eye{margin:0;font-weight:700;font-size:15px}.card h3{font-size:27px;font-weight:800}.card p{margin:0;color:var(--soft)}
.card .price{margin-top:auto;padding-top:10px;font:800 34px "Bricolage Grotesque",sans-serif}.card .price small{font:500 15px "DM Sans",sans-serif;color:var(--soft)}
.card a{margin-top:12px;align-self:flex-start}
.club{margin-top:24px;background:var(--navy);color:#fff;border-radius:40px;padding:36px 44px;display:grid;grid-template-columns:1fr auto;gap:30px;align-items:center}
.club .eye{color:var(--sun);font-weight:700;margin:0}.club h3{font-size:34px;font-weight:800;margin:4px 0 8px}.club p{color:#D6E0F0;margin:0}
.club .opts{display:flex;flex-direction:column;gap:12px;min-width:250px}.club .fine{font-size:14px;color:#B9C6DC;margin:0}
.path{list-style:none;padding:0;margin:44px 0 0;display:grid;grid-template-columns:repeat(3,1fr);gap:30px;position:relative}
.path::before{content:"";position:absolute;left:8%;right:8%;top:34px;border-top:3px dashed var(--navy)}
.path li{position:relative;text-align:center}.path .num{width:68px;height:68px;margin:0 auto 16px;border-radius:50%;background:var(--sun);border:3px solid var(--navy);display:flex;align-items:center;justify-content:center;font:800 30px "Bricolage Grotesque",sans-serif;position:relative}
.path h3{font-size:23px;font-weight:800;margin-bottom:6px}.path p{color:var(--soft);margin:0}
.srcs{list-style:none;padding:0;margin:24px 0 0;display:flex;flex-wrap:wrap;gap:10px}.srcs a{display:inline-block;padding:10px 18px;border-radius:999px;background:var(--sky);text-decoration:none;font-weight:700}
.fin{background:var(--sun);text-align:center;padding:100px 0}.fin h2{font-weight:800;font-size:clamp(50px,8vw,110px);line-height:1}.fin p{font-size:21px;margin:14px 0 28px}
.ft{background:var(--navy);color:#C2CDE0;padding:40px 0;font-size:16px}.ft a{color:#fff;margin-right:16px}.flogo{color:#fff!important;text-decoration:none;font:800 21px "Bricolage Grotesque",sans-serif}
@media(max-width:900px){.nav{display:none}.stickers{grid-template-columns:1fr 1fr}.cards,.club,.path{grid-template-columns:1fr}.path::before{display:none}.pola{width:100%;max-width:340px}.about{margin:-60px 16px 0;padding:28px 22px}}
.vgrid{display:grid;grid-template-columns:1.1fr .9fr;gap:22px;margin-top:30px}
.vgrid>div{border-radius:30px;padding:32px}.vget{background:var(--mint)}.vcost{background:var(--sunl)}
.vgrid h3{font-size:26px;font-weight:800;margin-bottom:12px}.vgrid ul{list-style:none;padding:0;margin:0}
.vget li{padding:10px 0 10px 40px;position:relative;font-weight:500}.vget li::before{content:"";position:absolute;left:0;top:13px;width:26px;height:26px;border-radius:50%;background:var(--navy) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 12.5l4 4 8-9' fill='none' stroke='%23fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/16px no-repeat}
.vcost li{display:flex;gap:12px;align-items:baseline;padding:10px 0}.vcost b{background:#fff;border-radius:999px;padding:4px 12px;font-size:15px;min-width:76px;text-align:center}
@media(max-width:900px){.vgrid{grid-template-columns:1fr}}
"""
    polas = ''.join(f'<figure class="pola"><img src="{s}" alt="{a}" loading="lazy"><figcaption><b>{t}</b><span>{c}</span></figcaption></figure>' for s, a, t, c in PHOTOS)
    stk = ''.join(f'<div class="stk"><span class="n">{n}</span><span class="l">{l}</span></div>' for n, l in STATS)
    cards = ''.join(f'''<div class="card"><img src="{p["img"]}" alt="{p["alt"]}" loading="lazy"><p class="eye">{p["eye"]}</p><h3>{p["name"]}</h3><p>{p["text"]}</p><p class="price">{p["price"]} <small>{p["small"]}</small></p><a class="{'btn' if p.get('main') else 'ghost'}" href="{p["href"]}">{p["btn"]}</a></div>''' for p in PRODUCTS)
    path = ''.join(f'<li><span class="num" aria-hidden="true">{i}</span><h3>{h}</h3><p>{p}</p></li>' for i, (h, p) in enumerate(STEPS, 1))
    body = f'''<div class="w hd">{logo()}{nav()}<a class="btn" href="guide.html">Start free</a></div>
<main id="main"><section class="hero"><div class="w"><h1><span class="t1">Get your mornings back</span><br><span class="t2">from arthritis.</span></h1><p class="lede">{LEDE}</p>{form()}{trust_ul()}
<div class="polas">{polas}</div></div></section>
<div class="w"><div class="stickers">{stk}</div></div>
<section class="navyband"><div class="w"><h2>{HOUR_H}</h2><p>{HOUR_P1}</p><p>{HOUR_P2}</p></div></section>
<div class="about"><p class="eye">About Hinge Care</p><h3>{ABOUT_H}</h3><p>{ABOUT_P}</p><p>{ABOUT_P2}</p></div>
{value_block()}<section class="s" id="shop"><div class="w"><h2>{SHOP_H}</h2><p class="sub">{SHOP_SUB}</p><div class="cards">{cards}</div>
<div class="club"><div><p class="eye">{CLUB["eye"]}</p><h3>{CLUB["h"]}</h3><p>{CLUB["p"]}</p></div><div class="opts">{club_btns()}<p class="fine">{CLUB["pay"]} {CLUB["gift"]}</p></div></div></div></section>
<section class="s" style="background:#F6FAFD"><div class="w"><h2>{STEPS_H}</h2><p class="sub">{STEPS_SUB}</p><ol class="path">{path}</ol></div></section>
<section class="s"><div class="w"><h2>{SRC_H}</h2><p class="sub">{SRC_SUB}</p>{sources_ul()}<p style="margin-top:22px;font-weight:700">{SIGNOFF}</p></div></section>
<section class="fin"><div class="w"><h2>{FIN_H}</h2><p>{FIN_P}</p><a class="btn" href="guide.html">Start free</a> <a class="ghost" href="#shop">See prices</a></div></section></main>{foot()}'''
    return "C. Sunny and friendly", fonts, css, body

# ---------------------------------------------------------------- D: Clear comparison
def design_d():
    fonts = "family=Zilla+Slab:wght@600;700&family=Source+Sans+3:wght@400;600;700"
    css = """
:root{--teal:#0F3D45;--teal2:#16525C;--peach:#FFD9C2;--fog:#EEF0EE;--ink:#142326;--soft:#43575B}
body{background:#fff;color:var(--ink);font:400 18.5px/1.65 "Source Sans 3",system-ui,sans-serif}
.w{max-width:1200px;margin:0 auto;padding:0 24px}a{color:var(--teal2)}
h1,h2,h3{font-family:"Zilla Slab",Georgia,serif;font-weight:700;margin:0}
.top{background:var(--teal);color:#fff}
.hd{display:flex;align-items:center;gap:26px;padding:18px 0}.logo{font:700 24px "Zilla Slab",serif;color:#fff;text-decoration:none}
.nav{display:flex;gap:24px;margin-left:auto}.nav a{color:#D7E6E8;text-decoration:none;font-weight:600}.nav a:hover{color:var(--peach)}
.btn{display:inline-flex;align-items:center;min-height:54px;padding:0 24px;border-radius:8px;background:var(--teal);color:#fff;font-weight:700;text-decoration:none}
.top .btn{background:var(--peach);color:var(--teal)}
.ghost{display:inline-flex;align-items:center;min-height:54px;padding:0 22px;border:2px solid currentColor;border-radius:8px;color:inherit;font-weight:700;text-decoration:none}
.hero{display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center;padding-top:40px;padding-bottom:80px}
.hero h1{font-size:clamp(44px,6vw,80px);line-height:1;letter-spacing:-.01em}
.lede{font-size:21px;color:#D7E6E8;max-width:42ch;margin:22px 0 28px;padding-left:20px;border-left:4px solid var(--peach)}
.btns{display:flex;flex-wrap:wrap;gap:12px}
.trust{list-style:none;padding:0;margin:26px 0 0;display:grid;gap:8px;color:#D7E6E8}.trust li{display:flex;gap:10px;align-items:center}.trust li::before{content:"";width:22px;height:22px;border-radius:50%;background:var(--peach) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 12.5l4 4 8-9' fill='none' stroke='%230F3D45' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/15px no-repeat;flex:none}
.circle{position:relative;aspect-ratio:1/1;border-radius:50%;background:var(--peach);padding:22px}.circle img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.layout{display:grid;grid-template-columns:230px 1fr;gap:60px}
.index{position:sticky;top:24px;align-self:start;padding-top:80px}.index p{font-weight:700;color:var(--soft);margin:0 0 10px;font-size:15px}
.index a{display:block;padding:10px 0 10px 14px;border-left:3px solid var(--fog);color:var(--ink);text-decoration:none;font-weight:600}.index a:hover{border-left-color:var(--teal);color:var(--teal)}
section.s{padding:80px 0;border-bottom:1px solid var(--fog)}
.s h2{font-size:clamp(32px,4vw,48px);line-height:1.08;margin-bottom:16px;display:inline-block;padding-bottom:8px;box-shadow:inset 0 -12px 0 var(--peach)}
.sub{color:var(--soft);max-width:62ch}
.about{background:var(--fog);border-radius:12px;padding:28px 30px;margin-top:28px}.about .eye{margin:0 0 6px;font-weight:700;color:var(--teal2)}.about h3{font-size:26px;margin-bottom:6px}.about p{color:var(--soft);margin:8px 0 0}
.alt{display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center;margin-top:36px}.alt:nth-child(even) img{order:2}
.alt img{border-radius:12px;aspect-ratio:4/3;object-fit:cover}.alt h3{font-size:30px;margin-bottom:8px}.alt p{color:var(--soft);margin:0}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:30px;border:2px solid var(--teal);border-radius:12px;overflow:hidden}
.stat{padding:22px;border-left:2px solid var(--teal)}.stat:first-child{border-left:0}.stat .n{display:block;font:700 36px/1.05 "Zilla Slab",serif;color:var(--teal)}.stat .l{display:block;margin-top:6px;color:var(--soft);font-size:16px}
table.cmp{width:100%;border-collapse:separate;border-spacing:0;margin-top:30px;font-size:17px}
.cmp th,.cmp td{padding:16px 14px;vertical-align:top;text-align:left;border-bottom:1px solid var(--fog)}
.cmp thead th{background:var(--teal);color:#fff;font:700 21px "Zilla Slab",serif}.cmp thead th:first-child{background:#fff}
.cmp thead th:nth-child(2){border-top-left-radius:12px}.cmp thead th:last-child{border-top-right-radius:12px}
.cmp tbody th{font-weight:700;color:var(--soft);width:150px}
.cmp .price{font:700 28px "Zilla Slab",serif;color:var(--teal)}.cmp .price small{display:block;font:600 14px "Source Sans 3",sans-serif;color:var(--soft)}
.cmp img{width:72px;aspect-ratio:3/4;object-fit:cover;border-radius:4px}
.cmp td.hl{background:#FFF4EC}
.cmp .buy,.cmp .btn,.cmp .ghost{min-height:50px;padding:0 16px;font-size:16px}
.steps{list-style:none;padding:0;margin:30px 0 0;display:grid;gap:18px}
.steps li{display:grid;grid-template-columns:64px 1fr;gap:20px;align-items:start;padding:20px;border:2px solid var(--fog);border-radius:12px}
.steps .num{width:64px;height:64px;border-radius:10px;background:var(--teal);color:#fff;display:flex;align-items:center;justify-content:center;font:700 32px "Zilla Slab",serif}
.steps h3{font-size:24px;margin:2px 0 4px}.steps p{margin:0;color:var(--soft)}
.signband{background:var(--peach);border-radius:16px;padding:34px;margin-top:34px;display:grid;grid-template-columns:1fr 1.2fr;gap:30px;align-items:center}.signband h3{font-size:30px}
.sign{background:transparent}.sign input{border-color:var(--teal)}
.srcs{list-style:none;padding:0;margin:20px 0 0;display:grid;grid-template-columns:1fr 1fr;gap:10px}.srcs a{display:block;padding:14px 16px;background:var(--fog);border-radius:8px;color:var(--ink);font-weight:600;text-decoration:none}.srcs a:hover{background:var(--peach)}
.fin{background:var(--teal);color:#fff;padding:90px 0;text-align:center}.fin h2{font-size:clamp(46px,7vw,92px);line-height:1;margin-bottom:12px}.fin p{color:#D7E6E8;font-size:21px;margin:0 0 26px}.fin .btns{justify-content:center}.fin .btn{background:var(--peach);color:var(--teal)}
.ft{background:#0A2B31;color:#B9CDD0;padding:40px 0;font-size:16px}.ft a{color:#fff;margin-right:16px}.flogo{color:#fff!important;text-decoration:none;font:700 22px "Zilla Slab",serif}
@media(max-width:980px){.nav{display:none}.hero,.layout,.alt,.signband{grid-template-columns:1fr}.index{display:none}.circle{max-width:360px;margin:0 auto;order:-1}.alt:nth-child(even) img{order:0}.stats{grid-template-columns:1fr 1fr}.stat:nth-child(3){border-left:0}.stat:nth-child(n+3){border-top:2px solid var(--teal)}
.cmp,.cmp tbody,.cmp tr,.cmp td,.cmp th{display:block;width:100%!important}.cmp thead{display:none}.cmp tr{border:2px solid var(--fog);border-radius:12px;margin-bottom:14px;padding:6px}.cmp td::before{content:attr(data-p);display:block;font:700 18px "Zilla Slab",serif;color:var(--teal)}.cmp tbody th{display:none}.srcs{grid-template-columns:1fr}}
.vgrid{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:26px;border:2px solid var(--teal);border-radius:12px;overflow:hidden}
.vgrid>div{padding:26px}.vget{background:#FFF4EC}.vgrid h3{font-size:24px;margin-bottom:10px}
.vgrid ul{list-style:none;padding:0;margin:0}.vgrid li{padding:12px 0;border-top:1px solid #E3D6CC}.vcost li{border-top-color:var(--fog);display:grid;grid-template-columns:76px 1fr;gap:12px}.vcost b{color:var(--teal);font-family:"Zilla Slab",serif;font-size:19px}
@media(max-width:980px){.vgrid{grid-template-columns:1fr}}
"""
    prods = PRODUCTS + [dict(img="/images/px-coffee-1850612.jpg", alt="A woman holding a warm yellow mug in both hands", eye="The Club", name="The Club",
                              text=CLUB["p"], price="$9", small="a month, founding members", btn=CLUB["buy"], href=CLUB["buyhref"], buy=True)]
    promise = ["Free", "30-day money-back promise", "30-day money-back promise", "Cancel any time"]
    head = '<tr><th scope="col"><span class="vh">Option</span></th>' + ''.join(f'<th scope="col">{p["name"]}</th>' for p in prods) + '</tr>'
    def cells(fn): return ''.join(f'<td data-p="{p["name"]}"{" class=hl" if i==0 else ""}>{fn(p, i)}</td>' for i, p in enumerate(prods))
    # mobile shows one card per product, so build rows per product for small screens via data-p labels on the first cell only
    rows = (f'<tr><th scope="row"><span class="vh">Cover</span></th>' + cells(lambda p, i: f'<img src="{p["img"]}" alt="{p["alt"]}" loading="lazy">') + '</tr>'
            f'<tr><th scope="row">Price</th>' + cells(lambda p, i: f'<span class="price">{p["price"]}<small>{p["small"]}</small></span>') + '</tr>'
            f'<tr><th scope="row">What it does for you</th>' + cells(lambda p, i: p["text"]) + '</tr>'
            f'<tr><th scope="row">Your promise</th>' + cells(lambda p, i: promise[i]) + '</tr>'
            f'<tr><th scope="row"><span class="vh">Next step</span></th>' + cells(lambda p, i: f'<a class="{"buy" if p.get("buy") else ("btn" if p.get("main") else "ghost")}" href="{p["href"]}">{p["btn"]}</a>') + '</tr>')
    alts = ''.join(f'<div class="alt"><img src="{s}" alt="{a}" loading="lazy"><div><h3>{t}</h3><p>{c}</p></div></div>' for s, a, t, c in PHOTOS)
    stats = ''.join(f'<div class="stat"><span class="n">{n}</span><span class="l">{l}</span></div>' for n, l in STATS)
    steps = ''.join(f'<li><span class="num" aria-hidden="true">{i}</span><div><h3>{h}</h3><p>{p}</p></div></li>' for i, (h, p) in enumerate(STEPS, 1))
    body = f'''<div class="top"><div class="w hd">{logo("logo dk")}{nav()}<a class="btn" href="guide.html">Start free</a></div>
<main id="main"><div class="w hero"><div><h1>{H1}</h1><p class="lede">{LEDE}</p><div class="btns"><a class="btn" href="#free">Get the free book</a><a class="ghost" href="#shop">See prices</a></div>{trust_ul()}</div>
<div class="circle"><img src="/images/px-woman-823560.jpg" alt="A smiling woman with long gray hair" fetchpriority="high"></div></div></div>
<div class="w layout"><nav class="index" aria-label="On this page"><p>On this page</p><a href="#hour">The first hour</a><a href="#help">What changes</a><a href="#shop">Prices side by side</a><a href="#how">How it works</a><a href="#src">Our sources</a></nav><div>
<section class="s" id="hour"><h2>{HOUR_H}</h2><p>{HOUR_P1}</p><p>{HOUR_P2}</p><div class="about"><p class="eye">About Hinge Care</p><h3>{ABOUT_H}</h3><p>{ABOUT_P}</p><p>{ABOUT_P2}</p></div></section>
<section class="s" id="help">{alts}<div class="stats">{stats}</div></section>
{value_block()}<section class="s" id="shop"><h2>{SHOP_H}</h2><p class="sub">{SHOP_SUB}</p><table class="cmp"><thead>{head}</thead><tbody>{rows}</tbody></table><p class="sub" style="margin-top:14px;font-size:16px">{CLUB["pay"]} {CLUB["gift"]}</p></section>
<section class="s" id="how"><h2>{STEPS_H}</h2><p class="sub">{STEPS_SUB}</p><ol class="steps">{steps}</ol><div class="signband" id="free"><h3>{STEPS[0][0]}</h3>{form()}</div></section>
<section class="s" id="src"><h2>{SRC_H}</h2><p class="sub">{SRC_SUB}</p>{sources_ul()}<p style="margin-top:20px;font-weight:600">{SIGNOFF}</p></section>
</div></div>
<section class="fin"><div class="w"><h2>{FIN_H}</h2><p>{FIN_P}</p><div class="btns"><a class="btn" href="#free">Start free</a><a class="ghost" href="#shop">See prices</a></div></div></section></main>{foot()}'''
    return "D. Side by side", fonts, css, body

# ---------------------------------------------------------------- E: Big type
def design_e():
    fonts = "family=Libre+Franklin:wght@400;500;700;800;900"
    css = """
:root{--ink:#111111;--soft:#454545;--lime:#D9F36A;--gray:#F2F2F0}
body{background:#fff;color:var(--ink);font:400 18px/1.6 "Libre Franklin",system-ui,sans-serif}
.w{max-width:1280px;margin:0 auto;padding:0 28px}a{color:var(--ink)}
h1,h2,h3{margin:0;font-family:"Libre Franklin",sans-serif}
.hd{display:flex;align-items:center;gap:28px;padding:20px 0;border-bottom:6px solid var(--ink)}.logo{font-weight:900;font-size:22px;color:var(--ink);text-decoration:none;letter-spacing:-.02em}
.nav{display:flex;gap:28px;margin-left:auto}.nav a{text-decoration:none;font-weight:700}.nav a:hover{text-decoration:underline;text-decoration-thickness:3px;text-underline-offset:6px}
.btn{display:inline-flex;align-items:center;min-height:56px;padding:0 26px;background:var(--ink);color:#fff;font-weight:800;text-decoration:none}
.btn:hover{background:#333}.ghost{display:inline-flex;align-items:center;min-height:56px;padding:0 24px;border:3px solid currentColor;color:inherit;font-weight:800;text-decoration:none}
.hero{padding:44px 0 0}
.hero h1{font-weight:900;font-size:clamp(52px,9.6vw,150px);line-height:.92;letter-spacing:-.05em}
.hero h1 span{display:block;padding-bottom:.06em;animation:wipe .9s cubic-bezier(.2,.7,.2,1) both}.hero h1 span:nth-child(2){animation-delay:.1s}.hero h1 span:nth-child(3){animation-delay:.2s}
@keyframes wipe{from{clip-path:inset(-20% 100% -20% 0)}to{clip-path:inset(-20% 0 -20% 0)}}
.hgrid{display:grid;grid-template-columns:repeat(12,1fr);gap:28px;margin-top:44px;padding-bottom:56px}
.hgrid .l{grid-column:1/7}.hgrid .r{grid-column:8/13}
.lede{font-size:22px;line-height:1.5;margin:0;font-weight:500}
.trust{list-style:none;padding:0;margin:26px 0 0;border-top:2px solid var(--ink)}.trust li{padding:12px 0;border-bottom:2px solid var(--ink);font-weight:700}
.sign{background:var(--lime);padding:28px}.sign .lbl{font-size:21px;font-weight:900;letter-spacing:-.01em}.sign input{border:2px solid var(--ink);border-radius:0}.sign button{border-radius:0}
.bleed{position:relative}.bleed img{width:100%;height:min(76vh,720px);object-fit:cover}
.bleed figcaption{position:absolute;left:28px;bottom:28px;max-width:440px;background:var(--ink);color:#fff;padding:22px 24px}.bleed b{display:block;font-size:24px;font-weight:900;letter-spacing:-.02em;margin-bottom:6px}.bleed span{color:#D6D6D6;font-size:17px}
.stats{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:6px solid var(--ink)}
.stat{padding:36px 24px 36px 0;border-right:2px solid var(--ink)}.stat:last-child{border-right:0}.stat+.stat{padding-left:24px}
.stat .n{display:block;font-weight:900;font-size:clamp(40px,5.4vw,80px);line-height:.9;letter-spacing:-.05em}.stat .l{display:block;margin-top:12px;font-weight:600;color:var(--soft)}
.stat s.was{font-size:.45em;vertical-align:middle;letter-spacing:0}
section.s{padding:90px 0;border-bottom:6px solid var(--ink)}
.split{display:grid;grid-template-columns:repeat(12,1fr);gap:28px}.split>h2{grid-column:1/7}.split>div{grid-column:8/13}
.s h2{font-weight:900;font-size:clamp(40px,5.6vw,84px);line-height:.92;letter-spacing:-.045em}
.split p{font-size:19px;margin:0 0 16px}.sub{color:var(--soft)}
.about{margin-top:30px;background:var(--gray);padding:26px}.about .eye{font-weight:800;margin:0 0 6px}.about h3{font-size:24px;font-weight:900;letter-spacing:-.02em;margin-bottom:6px}.about p{color:var(--soft);margin:8px 0 0}
.duo{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:28px}.duo img{aspect-ratio:4/3;object-fit:cover;width:100%}.duo b{display:block;font-size:22px;font-weight:900;letter-spacing:-.02em;margin:14px 0 4px}.duo span{color:var(--soft)}
.cols{display:grid;grid-template-columns:repeat(3,1fr);margin-top:44px;border-top:2px solid var(--ink)}
.col{padding:28px 28px 10px 0;border-right:2px solid var(--ink);display:flex;flex-direction:column}.col+.col{padding-left:28px}.col:last-child{border-right:0}
.col img{width:120px;aspect-ratio:3/4;object-fit:cover;margin-bottom:18px}
.col .eye{margin:0;font-weight:800;font-size:15px}.col h3{font-size:28px;font-weight:900;letter-spacing:-.03em;margin:4px 0 8px}.col p{margin:0;color:var(--soft)}
.col .price{margin-top:auto;padding-top:18px;font-weight:900;font-size:52px;letter-spacing:-.05em;line-height:1}.col .price small{display:block;font-size:15px;font-weight:600;letter-spacing:0;color:var(--soft);margin-top:4px}
.col a{margin-top:16px;align-self:flex-start}
.club{margin-top:40px;background:var(--ink);color:#fff;padding:40px;display:grid;grid-template-columns:1fr auto;gap:30px;align-items:center}
.club .eye{color:var(--lime);font-weight:800;margin:0}.club h3{font-size:40px;font-weight:900;letter-spacing:-.04em;line-height:1;margin:6px 0 10px}.club p{color:#CFCFCF;margin:0}
.club .opts{display:flex;flex-direction:column;gap:12px;min-width:250px}.club .ghost{color:#fff}.club .fine{font-size:14px;color:#A8A8A8;margin:0}
.steps{list-style:none;padding:0;margin:44px 0 0;display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.steps li{border-top:6px solid var(--ink);padding-top:16px}.steps .num{display:block;font-weight:900;font-size:110px;line-height:.85;letter-spacing:-.06em}
.steps h3{font-size:24px;font-weight:900;letter-spacing:-.02em;margin:14px 0 6px}.steps p{margin:0;color:var(--soft)}
.srcs{list-style:none;padding:0;margin:0;border-top:2px solid var(--ink)}.srcs li{border-bottom:2px solid var(--ink)}.srcs a{display:block;padding:14px 0;font-weight:700;text-decoration:none}.srcs a:hover{background:var(--lime)}
.fin{background:var(--lime);padding:100px 0}.fin h2{font-weight:900;font-size:clamp(60px,12vw,190px);line-height:.84;letter-spacing:-.06em;margin:0 0 22px}.fin p{font-size:22px;font-weight:600;margin:0 0 28px}
.ft{background:var(--ink);color:#BDBDBD;padding:40px 0;font-size:16px}.ft a{color:#fff;margin-right:16px}.flogo{color:#fff!important;text-decoration:none;font-weight:900;font-size:20px}
@media(max-width:900px){.nav{display:none}.hgrid .l,.hgrid .r,.split>h2,.split>div{grid-column:1/-1}.stats{grid-template-columns:1fr 1fr}.stat:nth-child(2){border-right:0}.stat:nth-child(3){padding-left:0}.stat:nth-child(n+3){border-top:2px solid var(--ink)}
.duo,.cols,.club,.steps{grid-template-columns:1fr}.col{border-right:0;border-bottom:2px solid var(--ink);padding:24px 0}.col+.col{padding-left:0}.bleed img{height:60vh}.bleed figcaption{position:static;max-width:none}}
.vgrid{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:40px}
.vgrid h3{font-size:26px;font-weight:900;letter-spacing:-.02em;padding-bottom:12px;border-bottom:6px solid var(--ink)}
.vgrid ul{list-style:none;padding:0;margin:0}.vgrid li{padding:16px 0;border-bottom:2px solid var(--ink);font-size:19px}
.vget li{font-weight:800;font-size:22px;letter-spacing:-.01em}.vcost li{display:grid;grid-template-columns:90px 1fr;gap:14px}.vcost b{background:var(--lime);padding:2px 8px;align-self:start;text-align:center}
@media(max-width:900px){.vgrid{grid-template-columns:1fr}}
"""
    stats = ''.join(f'<div class="stat"><span class="n">{n}</span><span class="l">{l}</span></div>' for n, l in STATS)
    cols = ''.join(f'''<div class="col"><img src="{p["img"]}" alt="{p["alt"]}" loading="lazy"><p class="eye">{p["eye"]}</p><h3>{p["name"]}</h3><p>{p["text"]}</p><p class="price">{p["price"]}<small>{p["small"] or "&nbsp;"}</small></p><a class="{'btn' if p.get('main') else 'ghost'}" href="{p["href"]}">{p["btn"]}</a></div>''' for p in PRODUCTS)
    s0, a0, t0, c0 = PHOTOS[0]
    duo = ''.join(f'<figure style="margin:0"><img src="{s}" alt="{a}" loading="lazy"><figcaption><b>{t}</b><span>{c}</span></figcaption></figure>' for s, a, t, c in PHOTOS[1:])
    steps = ''.join(f'<li><span class="num" aria-hidden="true">{i}</span><h3>{h}</h3><p>{p}</p></li>' for i, (h, p) in enumerate(STEPS, 1))
    body = f'''<div class="w hd">{logo()}{nav()}<a class="btn" href="guide.html">Start free</a></div>
<main id="main"><section class="hero"><div class="w"><h1><span>Get your mornings</span><span>back from</span><span>arthritis.</span></h1>
<div class="hgrid"><div class="l"><p class="lede">{LEDE}</p>{trust_ul()}</div><div class="r">{form()}</div></div></div></section>
<figure class="bleed" style="margin:0"><img src="{s0}" alt="{a0}" loading="lazy"><figcaption><b>{t0}</b><span>{c0}</span></figcaption></figure>
<div class="w"><div class="stats">{stats}</div></div>
<section class="s"><div class="w split"><h2>{HOUR_H}</h2><div><p>{HOUR_P1}</p><p>{HOUR_P2}</p><div class="about"><p class="eye">About Hinge Care</p><h3>{ABOUT_H}</h3><p>{ABOUT_P}</p><p>{ABOUT_P2}</p></div></div></div><div class="w"><div class="duo">{duo}</div></div></section>
{value_block()}<section class="s" id="shop"><div class="w"><div class="split"><h2>{SHOP_H}</h2><div><p class="sub" style="font-size:20px">{SHOP_SUB}</p></div></div><div class="cols">{cols}</div>
<div class="club"><div><p class="eye">{CLUB["eye"]}</p><h3>{CLUB["h"]}</h3><p>{CLUB["p"]}</p></div><div class="opts">{club_btns()}<p class="fine">{CLUB["pay"]} {CLUB["gift"]}</p></div></div></div></section>
<section class="s"><div class="w"><div class="split"><h2>{STEPS_H}</h2><div><p class="sub" style="font-size:20px">{STEPS_SUB}</p></div></div><ol class="steps">{steps}</ol></div></section>
<section class="s"><div class="w split"><h2>{SRC_H}</h2><div><p class="sub">{SRC_SUB}</p>{sources_ul()}<p style="margin-top:20px;font-weight:700">{SIGNOFF}</p></div></div></section>
<section class="fin"><div class="w"><h2>{FIN_H}</h2><p>{FIN_P}</p><a class="btn" href="guide.html">Start free</a> <a class="ghost" href="#shop">See prices</a></div></section></main>{foot()}'''
    return "E. Big type", fonts, css, body

if __name__ == "__main__":
    root = os.path.join(os.path.dirname(__file__), "..", "..")
    ds = [design_a(), design_b(), design_c(), design_d(), design_e()]
    files = [f"preview-look{i}.html" for i in range(1, 6)]
    names = [d[0] for d in ds]
    for i, (title, fonts, css, body) in enumerate(ds):
        open(os.path.join(root, files[i]), "w").write(page(title, fonts, css, body, i, names, files))
    print("built", files)
