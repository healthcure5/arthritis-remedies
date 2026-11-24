"""Build a Personal Joint Plan PDF from a plan JSON file.

Usage: python3 make_plan.py plan.json out.pdf
Plans with real customer answers must never be committed to the repo.
"""
import json, sys, html, subprocess, os, tempfile, datetime

def e(t): return html.escape(str(t))
def ul(items): return '<ul>' + ''.join('<li>%s</li>' % e(i) for i in items) + '</ul>'

CSS = """
@page{size:Letter;margin:0.7in 0.75in}@page:first{margin:0}
*{box-sizing:border-box}
body{font:400 15.5pt/1.55 Inter,Arial,sans-serif;color:#1f2a24;margin:0}
h1,h2,h3{font-family:Fraunces,Georgia,serif;font-weight:600;color:#23463b;line-height:1.2;margin:0 0 .4em}
h1{font-size:34pt}h2{font-size:24pt;margin-top:0}h3{font-size:17pt;margin:18px 0 6px}
p{margin:0 0 10px}ul{margin:4px 0 12px;padding-left:24px}li{margin:0 0 6px}
.page{page-break-after:always}.page:last-child{page-break-after:auto}
.cover{height:11in;width:8.5in;display:flex;flex-direction:column;justify-content:center;background:#23463b;color:#fff;margin:0;padding:1.1in 0.9in 0.8in}
.cover h1{color:#fff;font-size:40pt}.cover .eye{color:#F2C46B;font:700 12pt Inter,sans-serif;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px}
.cover .meta{margin-top:26px;font-size:15pt;color:#E7EFEA}.cover .meta b{color:#fff}
.cover .sample{margin-top:auto;font-size:12pt;color:#cfe0d6;border-top:1px solid rgba(255,255,255,.3);padding-top:12px}
.box{border:2px solid #d9e4dd;border-radius:14px;padding:14px 18px;margin:12px 0;background:#f6faf7}
.gold{border-color:#E7B957;background:#fff8e8}
.anchors{display:grid;grid-template-columns:1fr;gap:10px;margin:14px 0}
.anchor{border-left:6px solid #E7B957;padding:8px 14px;background:#fffaf0;border-radius:6px}
.anchor b{display:block;font:600 16pt Fraunces,Georgia,serif;color:#23463b}
.time{font:700 11pt Inter,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#a0661c;margin:16px 0 2px}
.wk{margin:10px 0 14px}.wk b{color:#23463b}
table{width:100%;border-collapse:collapse;font-size:12pt;line-height:1.25}th,td{border:1.5px solid #cfdcd4;padding:3px 6px;text-align:center}th{background:#23463b;color:#fff;font-weight:600}
td.d{font-weight:600;color:#23463b;width:90px;white-space:nowrap}td{padding:1px 6px;height:0.2in}
.card{border:3px dashed #23463b;border-radius:16px;padding:20px 22px;margin:0 0 18px}
.card h2{font-size:22pt}.card li{font-size:17pt}
.small{font-size:12pt;color:#55635b}
.sig{font:italic 600 17pt Fraunces,Georgia,serif;color:#23463b;margin-top:12px}
"""

def build(P):
    name = P['name']
    days_html = ''
    for w in P['weeks']:
        days_html += '<div class="wk"><b>%s</b> %s</div>' % (e(w['title']), e(w['text']))
    tick_head = ''.join('<th>%s</th>' % e(a['short']) for a in P['anchors'])
    rows = ''.join('<tr><td class="d">Day %d</td>%s</tr>' % (d, '<td></td>' * len(P['anchors'])) for d in range(1, 31))
    comforts = ''.join('<h3>%s</h3><p>%s</p>' % (e(c['name']), e(c['how'])) for c in P['comforts'])
    swaps = ''.join('<li><b>Instead of %s:</b> %s</li>' % (e(s['from']), e(s['to'])) for s in P['food_swaps'])
    lessons = ''.join('<li><b>%s.</b> %s</li>' % (e(l['title']), e(l['why'])) for l in P['lessons'])
    routine = ''
    for part in P['routine']:
        routine += '<p class="time">%s</p>%s' % (e(part['when']), ul(part['steps']))
    anchors = ''.join('<div class="anchor"><b>%s</b>%s</div>' % (e(a['title']), e(a['why'])) for a in P['anchors'])
    checks = ''.join('<li><b>%s:</b> %s</li>' % (e(c['when']), e(c['what'])) for c in P['checkins'])
    sample = '<p class="sample">%s</p>' % e(P['sample_note']) if P.get('sample_note') else ''
    D = P.get('doctor') or {}
    doctor_page = ''
    if D:
        qs = ''.join('<li>%s</li>' % e(q) for q in D.get('questions', [])) + '<li>&nbsp;</li><li>&nbsp;</li>'
        doctor_page = ('<section class="page"><h2>For your next doctor visit</h2><p class="small">Print this page and take it with you. Add anything new before you go.</p>'
            '<div class="box"><p><b>Name:</b> %s</p><p><b>Joints that bother me:</b> %s</p><p><b>Morning stiffness:</b> %s</p><p><b>Usual pain:</b> %s</p><p><b>What I\'ve tried:</b> %s</p><p><b>What I\'m doing now:</b> %s</p></div>'
            '<h3>My questions</h3><ul>%s</ul><h3>What the doctor said</h3><div class="box" style="height:1.0in;background:#fff"></div></section>') % (e(P['name']), e(D.get('joints','')), e(D.get('stiffness','')), e(D.get('pain','')), e(D.get('tried','')), e(D.get('doing_now','')), qs)
    family_page = ''
    if P.get('family'):
        family_page = '<section class="page"><h2>For your family</h2><p>A page to share with the people who care about you. It tells them how to help, without taking over.</p>%s</section>' % ul(P['family'])
    changes_box = ''
    if P.get('changes'):
        changes_box = '<div class="box gold"><h3 style="margin-top:0">What changed in this plan</h3>%s</div>' % ul(P['changes'])
    return f"""<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>
<section class="page cover"><p class="eye">Hinge Care · Your Personal Joint Plan</p><h1>{e(name)}'s 30-day plan</h1>
<p class="meta">Written for: <b>{e(P['made_for'])}</b><br>Your goal: <b>{e(P['goal'])}</b><br>Plan date: <b>{e(P['date'])}</b>{('<br>Version: <b>'+e(P['version'])+'</b>') if P.get('version') else ''}</p>{sample}</section>

<section class="page">{changes_box}<h2>A note before you start</h2>{''.join('<p>%s</p>' % e(x) for x in P['note'])}
<p class="sig">Hinge Care</p>
<div class="box gold"><h3 style="margin-top:0">How to use this plan</h3>{ul(P['how_to_use'])}</div><div class="box"><h3 style="margin-top:0">Your plan online</h3><p style="margin:0">Open myhingecare.com/my-plan each morning for today\'s three things and a video for each.</p></div></section>

<section class="page"><h2>Your three daily anchors</h2><p>If you only do three things a day, do these. Everything else in this plan is extra.</p>
<div class="anchors">{anchors}</div>
<h2 style="margin-top:22px">Lessons to open first</h2><p>In the Hinge Care Program, start with these.</p><ul>{lessons}</ul></section>
<section class="page"><h2>Your day, start to finish</h2>{routine}</section>

<section class="page"><h2>Your 30 days, week by week</h2>{days_html}
<h2 style="margin-top:22px">Your check-ins</h2><p>We'll email you on these days. Just reply and tell us how it's going. We change your plan to match.</p><ul>{checks}</ul></section>

<section class="page"><h2>Home comforts for your joints</h2><p>{e(P['comforts_intro'])}</p>{comforts}</section>

<section class="page"><h2>Five food swaps</h2><p>{e(P['food_intro'])}</p><ul>{swaps}</ul>
<div class="box"><h3 style="margin-top:0">Drinks</h3><p>{e(P['drinks'])}</p></div></section>

<section class="page"><h2>Your plan for bad days</h2>{ul(P['flare'])}
<div class="box gold"><h3 style="margin-top:0">Call your doctor the same day if</h3>{ul(P['call_doctor'])}</div>
</section>

{doctor_page}{family_page}<section class="page"><h2>Your 30-day tick sheet</h2><p class="small">Tick a box each time you do an anchor. A day with one tick still counts.</p>
<table><tr><th>Day</th>{tick_head}</tr>{rows}</table></section>

<section class="page"><div class="card"><h2>{e(name)}'s mornings</h2>{ul(P['fridge_morning'])}</div>
<div class="card"><h2>{e(name)}'s bad-day card</h2>{ul(P['fridge_flare'])}</div></section>
</body></html>"""

def main():
    P = json.load(open(sys.argv[1]))
    out = sys.argv[2]
    tmp = tempfile.mktemp(suffix='.html')
    open(tmp, 'w').write(build(P))
    js = "const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://%s');await p.waitForTimeout(800);await p.pdf({path:'%s',format:'Letter',printBackground:true,preferCSSPageSize:true});await b.close();})();" % (tmp, os.path.abspath(out))
    subprocess.run(['node', '-e', js], check=True)
    print('wrote', out)

if __name__ == '__main__':
    main()
