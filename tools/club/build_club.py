"""Build the Club members' library page and the monthly Sunday emails.

Usage: python3 tools/club/build_club.py
Reads tools/club/library.json and tools/club/month*.json.
Writes club-members-11d834b9/index.html and tools/club/out/email-*.html.
"""
import json, html, glob, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HERE = os.path.join(ROOT, 'tools', 'club')
LIB_DIR = 'club-members-11d834b9'
LIB_URL = 'https://myhingecare.com/' + LIB_DIR + '/'
FORM = 'https://hinge-forms.cgmandre.workers.dev'
e = lambda s: html.escape(str(s), quote=True)

lib = json.load(open(os.path.join(HERE, 'library.json')))
months = [json.load(open(f)) for f in sorted(glob.glob(os.path.join(HERE, 'month*.json')))]
cur = months[-1]

KIND = {'routine': 'Routine', 'recipe': 'Recipe', 'challenge': 'Weekend challenge', 'letter': 'Sunday letter'}

def video(v):
    if not v: return ''
    vid, title, src, ln = v
    return ('<a class="vid" href="https://www.youtube.com/watch?v=%s" target="_blank" rel="noopener">'
            '<img src="https://img.youtube.com/vi/%s/hqdefault.jpg" alt="" loading="lazy" width="320" height="180">'
            '<span><b>&#9654; %s</b><small>%s · %s · opens on YouTube</small></span></a>') % (e(vid), e(vid), e(title), e(src), e(ln))

def iit(x):
    if not x: return ''
    q, a, v = x
    return '<div class="iit"><p class="k">Is it true?</p><p><b>%s</b></p><p>%s</p><p><b>Verdict:</b> %s</p></div>' % (e(q), e(a), e(v))

def item_body(it):
    k = it['kind']
    h = ''
    if k == 'letter':
        h += '<p>%s</p>' % e(it['summary'])
        h += iit(it.get('is_it_true'))
        if it.get('tip'): h += '<p class="tip">%s</p>' % e(it['tip'])
        h += '<p class="src">Source: %s</p>' % e(it['source'])
        return h
    h += '<p>%s</p>' % e(it['intro'])
    if k == 'recipe':
        h += '<p class="meta">%s</p><h4>You\'ll need</h4><ul>%s</ul><h4>How to make it</h4>' % (e(it['serves']), ''.join('<li>%s</li>' % e(i) for i in it['ingredients']))
    h += '<ol>%s</ol>' % ''.join('<li>%s</li>' % e(s) for s in it['steps'])
    if it.get('extra'): h += '<p class="tip">%s</p>' % e(it['extra'])
    if it.get('safety'): h += '<p class="safe">%s</p>' % e(it['safety'])
    h += video(it.get('video'))
    return h

def items_html():
    out = ''
    for it in lib:
        out += ('<details class="it" data-kind="%s"><summary><span class="tag t-%s">%s</span><span class="ttl">%s</span></summary>'
                '<div class="body">%s</div></details>') % (it['kind'], it['kind'], KIND[it['kind']], e(it['title']), item_body(it))
    return out

def month_html(m):
    r = m['routine']
    plan = ''.join('<li><b>Week %d: %s.</b> %s</li>' % (p['week'], e(p['focus']), e(p['daily'])) for p in m['plan'])
    weeks = ''
    for w in m['weeks']:
        rc = w['recipe']
        weeks += ('<details class="it" data-kind="month"><summary><span class="tag t-month">Week %d</span><span class="ttl">%s</span></summary><div class="body">'
                  '%s<p class="src">Source: %s</p>%s'
                  '<h4>This week\'s routine</h4><p>%s</p>'
                  '<h4>Recipe: %s</h4><p class="meta">%s</p><p>%s</p><ul>%s</ul><ol>%s</ol>'
                  '<h4>Weekend challenge</h4><p>%s</p></div></details>') % (
            w['week'], e(w['title']), ''.join('<p>%s</p>' % e(p) for p in w['letter']), e(w['letter_source']), iit(w.get('is_it_true')),
            e(w['routine_note']), e(rc['title']), e(rc['serves']), e(rc['why']),
            ''.join('<li>%s</li>' % e(i) for i in rc['ingredients']), ''.join('<li>%s</li>' % e(s) for s in rc['steps']), e(w['challenge']))
    days = ''.join('<div class="day"><span>%d</span></div>' % d for d in range(1, 32))
    return ('<section class="month" id="month"><p class="eye">This month · %s</p><h2>%s</h2><p class="lede2">%s</p>'
            '<div class="mgrid"><div class="box"><h3>Your four weeks</h3><ol class="plan">%s</ol></div>'
            '<div class="box"><h3>%s</h3><ol>%s</ol><p class="safe">%s</p></div>'
            '<div class="tracker" id="tracker"><div class="trhead"><h3>%s tracker: %s</h3><button class="b b2 noprint" type="button" onclick="window.print()">Print the tracker</button></div>'
            '<p class="fine">Tick a box each day you do your routine. A day with a little still counts.</p><div class="days">%s</div>'
            '<p class="fine">Total ticks this month: ______ &nbsp; One thing my hands do more easily now: ______________________</p></div></div>'
            '<h3 class="noprint" style="margin:30px 0 10px">This month\'s Sunday emails</h3><div class="list grid noprint">%s</div></section>') % (
        e(m['month']), e(m['theme']), e(m['intro']), plan, e(r['title']), ''.join('<li>%s</li>' % e(s) for s in r['steps']), e(r['safety']),
        e(m['month']), e(m['theme']), days, weeks)

CSS = """
.hd-in{min-height:64px}.members{font:700 14px Inter,sans-serif;color:var(--g2);background:#EEF4EA;border-radius:999px;padding:6px 12px}
main{padding:34px 0 60px}.lede2{font-size:20px;color:var(--soft);max-width:60ch;margin:10px 0 24px}
.welcome{background:#fff;border:1px solid var(--line);border-radius:20px;padding:22px 24px;margin:0 0 30px}
.welcome h1{font-size:clamp(32px,4.4vw,46px)}
.jump{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0 0}.jump a{font:600 17px Inter,sans-serif;background:var(--sand);border-radius:12px;padding:10px 14px;text-decoration:none;color:var(--g)}
.month{background:#fff;border:1px solid var(--line);border-radius:22px;padding:26px;margin:0 0 34px}
.mgrid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.box{background:var(--cream);border-radius:16px;padding:18px 20px}
.box h3,.tracker h3{font-size:24px;margin:0 0 8px}.box ol,.box ul{margin:0;padding-left:22px}.box li{margin:0 0 8px}
.tracker{margin:22px 0 0;border:2px dashed #B9CDB3;border-radius:16px;padding:18px}
.trhead{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px}
.days{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin:12px 0}
.day{border:2px solid var(--g2);border-radius:10px;aspect-ratio:1;display:flex;align-items:flex-start;justify-content:flex-start;padding:4px 6px;font:600 14px Inter,sans-serif;color:var(--g2);background:#fff}
.filters{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 16px}
.filters button{font:600 17px Inter,sans-serif;min-height:48px;padding:10px 16px;border-radius:12px;border:2px solid var(--g);background:#fff;color:var(--g);cursor:pointer}
.filters button[aria-pressed=true]{background:var(--g);color:#fff}
.list{display:flex;flex-direction:column;gap:12px}
.it{background:#fff;border:1px solid var(--line);border-radius:16px}
.it summary{list-style:none;cursor:pointer;padding:16px 52px 16px 18px;display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center;min-height:56px;position:relative}
.it summary::-webkit-details-marker{display:none}.it summary::after{content:"+";position:absolute;right:18px;top:50%;transform:translateY(-50%);font:600 26px Inter,sans-serif;color:var(--g2)}
.it[open] summary::after{content:"\\2212"}.ttl{flex-basis:100%;font:600 20px/1.3 Fraunces,Georgia,serif;color:var(--g)}
.tag{font:700 13px Inter,sans-serif;letter-spacing:.04em;text-transform:uppercase;border-radius:999px;padding:5px 10px}
.t-routine{background:#EEF4EA;color:#2F5D3A}.t-recipe{background:#FBF1DD;color:#7A4E00}.t-challenge{background:#FFF0D6;color:#8A5A00}.t-letter{background:#E9F1F3;color:#235560}.t-month{background:var(--g);color:#fff}
.body{padding:0 18px 18px}.body h4{font:700 17px Inter,sans-serif;margin:16px 0 6px;color:var(--g)}
.body ol,.body ul{padding-left:22px}.body li{margin:0 0 8px}
.meta,.src,.safe,.tip{font-size:16px;color:var(--soft)}.safe{border-left:4px solid #B9CDB3;padding-left:10px}.tip{background:var(--cream);border-radius:10px;padding:10px 12px}
.iit{background:#EEF5F5;border-left:4px solid #235560;padding:12px 16px;border-radius:0 12px 12px 0;margin:12px 0}.iit .k{font:700 13px Inter,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#235560;margin:0}
.iit p{margin:6px 0}
.vid{display:flex;gap:12px;align-items:center;text-decoration:none;color:var(--ink);background:var(--cream);border-radius:12px;padding:10px;margin:12px 0 0}
.vid img{width:150px;border-radius:8px}.vid small{display:block;color:var(--soft);font-size:15px}
.ask{background:var(--sand);border-radius:22px;padding:26px;margin:34px 0 0}
.ask label{display:block;font-weight:600;margin:14px 0 6px}.ask input,.ask textarea{width:100%;font:400 19px Inter,sans-serif;padding:12px 14px;border:2px solid #C9C0AE;border-radius:12px;background:#fff}
.ask textarea{min-height:140px}.ask .b{margin-top:16px}.thanks{display:none;background:#EEF4EA;border-radius:12px;padding:14px 16px;font-weight:600;margin:0 0 16px}
.libwide{display:block;max-width:1240px}
.list.grid.collapsed>.it:nth-child(n+9){display:none!important}
.showall{display:block;margin:16px auto 0;min-height:52px;padding:12px 26px;border-radius:999px;border:2px solid var(--g);background:#fff;color:var(--g);font:700 18px Inter,sans-serif;cursor:pointer}
.showall:hover{background:var(--g);color:#fff}
.welcome{display:grid;grid-template-columns:1fr auto;gap:10px 30px;align-items:end}
.welcome .jump{flex-direction:column;margin:0}.welcome .jump a{text-align:center}
.mgrid{grid-template-columns:1fr 1fr 1fr;align-items:stretch}
.mgrid .tracker{margin:0;background:#fff}
.mgrid .tracker .days{gap:5px}.mgrid .tracker .day{font-size:12px;padding:2px 4px;border-radius:7px}
.mgrid .tracker .trhead{flex-direction:column;align-items:flex-start}
.list.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;align-items:start}
.list.grid details[open]{grid-column:1/-1}
#month .list.grid{grid-template-columns:repeat(4,1fr)}
.bottom{display:grid;grid-template-columns:1.35fr 1fr;gap:22px;margin:34px 0 0;align-items:start}
.bottom .ask{margin:0}.bottom .more{grid-template-columns:1fr;margin:0}
@media (max-width:1000px){.mgrid{grid-template-columns:1fr 1fr}.mgrid .tracker{grid-column:1/-1}#month .list.grid{grid-template-columns:1fr 1fr}}
@media (max-width:760px){.welcome{grid-template-columns:1fr}.welcome .jump{flex-direction:row;margin-top:12px}.mgrid,.bottom{grid-template-columns:1fr}#month .list.grid{grid-template-columns:1fr}}
.more{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:34px 0 0}.more .box{background:#fff;border:1px solid var(--line)}
@media (max-width:760px){.mgrid,.more{grid-template-columns:1fr}.month,.ask{padding:18px}.days{gap:5px}.vid img{width:110px}}
@media print{.hd,.noprint,.filters,#library,.ask,.more,.welcome,footer{display:none!important}body{background:#fff}.month{border:0;padding:0}.mgrid{display:block}.mgrid>.box{display:none}.month>.eye,.month>h2,.month>.lede2{display:none}.tracker{border:0}}
"""

JS = """
(function(){var bs=document.querySelectorAll('.filters button'),its=document.querySelectorAll('#library .it');
bs.forEach(function(b){b.addEventListener('click',function(){bs.forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');var k=b.dataset.k;var L=document.getElementById('liblist'),S=document.getElementById('showall');if(k!=='all'){L.classList.remove('collapsed');S.hidden=true}its.forEach(function(i){i.style.display=(k==='all'||i.dataset.kind===k)?'':'none'})})});
var S=document.getElementById('showall');if(S)S.addEventListener('click',function(){document.getElementById('liblist').classList.remove('collapsed');S.hidden=true});
if(/[?&]asked=1/.test(location.search)){var t=document.getElementById('asked');if(t){t.style.display='block';document.getElementById('ask').scrollIntoView()}}})();
"""

def page():
    return """<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Members' library | The Hinge Care Club</title><meta name="robots" content="noindex, nofollow">
<link rel="icon" href="../favicon.ico"><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../hc.css?v=24"><style>%s</style></head><body>
<header class="hd"><div class="w hd-in"><a class="brand" href="../index.html"><span>Hinge Care</span></a><span class="members">Club members</span></div></header>
<main><div class="w libwide">
<div class="welcome noprint"><p class="eye">The Hinge Care Club</p><h1>Your members' library</h1>
<p class="lede2" style="margin-bottom:0">Everything from the Club in one place: this month's plan and tracker, every routine and recipe, the weekend challenges, and the short version of every Sunday letter. And as a member, you can write to the Hinge Care team about your own joints any time, and get an answer back by email. Save this page to your home screen so it's one tap away.</p>
<div class="jump"><a href="#month">This month</a><a href="#library">The library</a><a href="#ask">Ask Andre</a></div></div>
%s
<section id="library" class="noprint"><p class="eye">The library</p><h2>Every routine, recipe and letter</h2><p class="sub">Tap any title to open it. New items are added each month.</p>
<div class="filters" role="group" aria-label="Show"><button type="button" data-k="all" aria-pressed="true">Everything</button><button type="button" data-k="routine" aria-pressed="false">Routines</button><button type="button" data-k="recipe" aria-pressed="false">Recipes</button><button type="button" data-k="challenge" aria-pressed="false">Weekend challenges</button><button type="button" data-k="letter" aria-pressed="false">Sunday letters</button></div>
<div class="list grid collapsed" id="liblist">%s</div><button type="button" class="showall" id="showall">Show all %d</button></section>
<div class="bottom"><section class="ask noprint" id="ask"><p class="eye">Ask Andre · members only</p><h2>Send us your question</h2>
<p class="sub" style="margin-bottom:6px">Ask anything about your joints, a remedy you've seen, or something from a letter. You get your own answer back by email, written for you. Good questions may also go in the month's Q&amp;A, and your name is never shared.</p>
<div class="thanks" id="asked">Thank you. Your question is in, and you'll see the answer in this month's Q&amp;A.</div>
<form action="%s" method="POST"><input type="hidden" name="_subject" value="Ask Andre: a question from a Club member"><input type="hidden" name="_next" value="%s?asked=1#ask"><input type="hidden" name="_template" value="table"><input type="hidden" name="_captcha" value="false"><input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">
<label for="an">First name</label><input id="an" name="First name" autocomplete="given-name" required>
<label for="ae">Email (so I can let you know when it's answered)</label><input id="ae" type="email" name="email" autocomplete="email" required>
<label for="aq">Your question</label><textarea id="aq" name="Question" required></textarea>
<button class="b b1" type="submit">Send my question</button></form>
<p class="fine">This is general information, not personal medical advice. For anything urgent, please call your doctor.</p></section>
<div class="more noprint"><div class="box"><h3>Morning Coffee</h3><p>The members' chat, where you can say hello, share a win or ask other members what helps them. We check it every weekday.</p><a class="b b2" href="https://whop.com/hingecare/" target="_blank" rel="noopener">Open Morning Coffee</a></div>
<div class="box"><h3>Need a break?</h3><p>Life gets busy, and some months are hard. Reply PAUSE to any Club email and we'll hold your spot. To change or cancel your membership, open your Whop account.</p><a class="b b2" href="https://whop.com/@me/settings/memberships/" target="_blank" rel="noopener">Manage membership</a></div></div></div>
<p class="fine" style="margin-top:30px">This is general information, not personal medical advice. Be kind to yourself today, and check with your doctor before you try anything new.</p>
</div></main><script>%s</script></body></html>""" % (CSS, month_html(cur), items_html(), len(lib), FORM, LIB_URL, JS)

os.makedirs(os.path.join(ROOT, LIB_DIR), exist_ok=True)
open(os.path.join(ROOT, LIB_DIR, 'index.html'), 'w').write(page())

# ---------- Sunday emails ----------
P = 'font:17px/28px Arial,Helvetica,sans-serif;color:#111;margin:0 0 20px'
def p(t, extra=''): return '<p style="%s%s">%s</p>' % (P, extra, t)
def box(bg, label, inner, border=''):
    return ('<table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="margin:6px 0 24px"><tr><td style="background:%s;border-radius:10px;padding:18px 20px;%s">'
            '<p style="font:bold 13px/18px Arial,Helvetica,sans-serif;color:#2F5D3A;letter-spacing:1px;margin:0 0 8px">%s</p>%s</td></tr></table>') % (bg, border, label, inner)
LI = 'margin:0 0 8px'
def ol(items): return '<ol style="font:17px/27px Arial,Helvetica,sans-serif;color:#111;margin:0;padding-left:22px">%s</ol>' % ''.join('<li style="%s">%s</li>' % (LI, e(i)) for i in items)
def ul(items): return '<ul style="font:17px/27px Arial,Helvetica,sans-serif;color:#111;margin:0 0 12px;padding-left:22px">%s</ul>' % ''.join('<li style="%s">%s</li>' % (LI, e(i)) for i in items)
BTN = 'display:inline-block;background:#FFC56B;color:#1F3A27;font:bold 18px Arial,Helvetica,sans-serif;text-decoration:none;padding:14px 26px;border-radius:999px;border-bottom:4px solid #F5B04A'

def shell(pre, label, title, body):
    return ('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0;padding:0;background:#FFFFFF">'
            '<div style="display:none;max-height:0;overflow:hidden;opacity:0">%s</div><table role="presentation" width="100%%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 22px 34px">'
            '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%%;max-width:600px"><tr><td>'
            '<p style="margin:0 0 22px"><img src="https://myhingecare.com/images/email/banner-armchair.jpg" width="600" alt="A cozy armchair with a blanket, a cup of tea and a book" style="display:block;width:100%%;max-width:600px;height:auto;border-radius:12px"></p>'
            '<p style="font:bold 15px/20px Arial,Helvetica,sans-serif;color:#1F3A27;margin:0">THE HINGE CARE CLUB</p><p style="font:14px/20px Arial,Helvetica,sans-serif;color:#555;margin:0 0 20px">%s</p>'
            '<p style="font:bold 25px/32px Arial,Helvetica,sans-serif;color:#000;margin:0 0 24px">%s</p>%s'
            '<img src="https://myhingecare.com/images/email/signature-andre.png" width="170" alt="Andre" style="display:block;width:170px;height:auto;border:0;margin:0 0 26px">'
            '<div style="border-top:1px solid #DDD;margin:8px 0 16px"></div><p style="font:12px/19px Arial,Helvetica,sans-serif;color:#555;margin:0;text-align:center">'
            'This is general information, not personal medical advice. Check with your doctor before you try anything new.<br><br>'
            'You\'re receiving this because you\'re a member of the Hinge Care Club. Need a break? Reply PAUSE and we\'ll hold your spot.<br><a href="{$unsubscribe}" style="color:#555">Unsubscribe</a></p>'
            '</td></tr></table></td></tr></table></body></html>') % (e(pre), label, e(title), body)

def sunday_email(m, w):
    r = m['routine']; rc = w['recipe']
    b = p("Good morning {$name|default('there')},")
    b += ''.join(p(e(x)) for x in w['letter'])
    b += p('<i>Source: %s</i>' % e(w['letter_source']), ';font-size:15px;color:#555')
    if w.get('is_it_true'):
        q, a, v = w['is_it_true']
        b += box('#EEF5F5', 'IS IT TRUE?', '<p style="font:bold 18px/26px Arial,Helvetica,sans-serif;color:#000;margin:0 0 8px">%s</p><p style="font:16px/26px Arial,Helvetica,sans-serif;color:#111;margin:0 0 8px">%s</p><p style="font:16px/26px Arial,Helvetica,sans-serif;color:#111;margin:0"><b>Verdict:</b> %s</p>' % (e(q), e(a), e(v)), 'border-left:4px solid #235560')
    b += box('#EEF4EA', 'THIS WEEK\'S ROUTINE', '<p style="font:16px/26px Arial,Helvetica,sans-serif;color:#111;margin:0 0 12px"><b>%s</b></p>%s<p style="font:15px/23px Arial,Helvetica,sans-serif;color:#46564B;margin:10px 0 0">%s</p>' % (e(w['routine_note']), ol(r['steps']), e(r['safety'])))
    b += box('#FBF6EC', 'THIS WEEK\'S RECIPE', '<p style="font:bold 20px/28px Georgia,serif;color:#1A2A20;margin:0 0 2px">%s</p><p style="font:15px/22px Arial,Helvetica,sans-serif;color:#555;margin:0 0 10px">%s</p><p style="font:16px/26px Arial,Helvetica,sans-serif;color:#111;margin:0 0 10px">%s</p><p style="font:bold 16px Arial,sans-serif;margin:0 0 6px">You\'ll need</p>%s<p style="font:bold 16px Arial,sans-serif;margin:0 0 6px">How to make it</p>%s' % (e(rc['title']), e(rc['serves']), e(rc['why']), ul(rc['ingredients']), ol(rc['steps'])))
    b += box('#FFF3D6', 'THIS WEEKEND\'S CHALLENGE', '<p style="font:17px/27px Arial,Helvetica,sans-serif;color:#111;margin:0">%s</p>' % e(w['challenge']), 'border-left:5px solid #F5B44E')
    b += p('Everything from the Club, including this month\'s printable tracker and every past routine and recipe, is in your members\' library.')
    b += '<p style="margin:0 0 24px"><a href="%s" style="%s">Open your library &rarr;</a></p>' % (LIB_URL, BTN)
    b += box('#F6F2EA', 'YOUR TURN', '<p style="font:16px/26px Arial,Helvetica,sans-serif;color:#111;margin:0">%s Hit reply and tell me, or send it through Ask Andre in your library.</p>' % e(w['your_turn']))
    return shell(w['preheader'], 'Sunday email &middot; %s: %s &middot; Week %d' % (e(m['month']), e(m['theme']), w['week']), w['title'], b)

def welcome_email(m):
    b = p("Hi {$name|default('there')},")
    b += p('Welcome to the Hinge Care Club. I\'m glad you\'re here.')
    b += p('Here\'s how it works. Every Sunday morning, one email arrives with everything for the week: a short letter that explains one arthritis study or headline in plain words, a routine, a simple recipe and a small weekend challenge.')
    b += p('Each month has its own focus. This month it\'s <b>%s</b>, and your first Sunday email arrives this weekend.' % e(m['theme']))
    b += p('You also get your members\' library. It has this month\'s plan and a tracker you can print, every routine, recipe and challenge from the Club so far, and the short version of every Sunday letter. You can start there today.')
    b += '<p style="margin:0 0 24px"><a href="%s" style="%s">Open your library &rarr;</a></p>' % (LIB_URL, BTN)
    b += p('Got a question about your own joints? Use Ask Andre at the bottom of the library page, and you\'ll get your own answer back by email. And Morning Coffee, the members\' chat, is open on Whop whenever you\'d like company.')
    b += p('One tip: save the library page to your phone\'s home screen, so it\'s one tap away on a stiff morning.')
    return shell('Your library is open, and your first Sunday email arrives this weekend.', 'Welcome', 'Welcome to the Club', b)

OUT = os.path.join(HERE, 'out'); os.makedirs(OUT, exist_ok=True)
emails = [('welcome', 'Welcome to the Hinge Care Club', welcome_email(cur))]
for m in months:
    for w in m['weeks']:
        emails.append(('%s-w%d' % (m['slug'], w['week']), w['subject'], sunday_email(m, w)))
for slug, subj, h in emails:
    open(os.path.join(OUT, 'email-%s.html' % slug), 'w').write(h)
json.dump([{'slug': s, 'subject': j} for s, j, _ in emails], open(os.path.join(OUT, 'index.json'), 'w'), indent=1)
print('library:', LIB_DIR, '| items:', len(lib), '| emails:', len(emails))
