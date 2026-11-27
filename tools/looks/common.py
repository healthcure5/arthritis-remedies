# Shared content for the five design previews. Every line here is copied from the live home page
# (already run through the writing skills), except the few labels marked NEW, which were checked too.
H1 = "Get your mornings back from arthritis."
LEDE = ("Loosen up before the day asks anything of your joints, with short routines you can do sitting down. "
        "Plus straight answers about what eases stiff, sore joints and what doesn't. "
        "For anyone living with arthritis, and the people who love them.")
TRUST = ["Every move has a seated version", "30-day money-back promise", "Cancel any time"]
HOUR_H = "We know what the first hour with arthritis can look like."
HOUR_P1 = "Hands that won't quite close around the coffee cup. The railing held a little tighter on the way down. A drawer of gels and pills that didn't help much."
HOUR_P2 = "So that's where we start: slow, easy moves from the edge of the bed or a chair, built to open you up a little more each day."
ABOUT_H = "A small, independent wellness company in the US"
ABOUT_P = "We dig through the studies so you don't have to, then write it all in plain words and name every source. We're not doctors, and we don't sell pills, creams or braces."
ABOUT_P2 = 'Questions go to a real person, who writes back. <a href="contact.html">Write to us</a>.'
PHOTOS = [
 ("/images/px-couple-6962202.jpg", "A smiling couple outdoors in the morning", "Build your mornings",
  "The Hinge Care Program is built to help you open up and loosen up, so the stiff start to the day gets shorter and your morning is yours again."),
 ("/images/px-coffee-1850612.jpg", "A woman holding a warm yellow mug in both hands", "A cup you can hold again",
  "The Program is meant to bring your hands back into your day, so holding a mug, turning a key and opening a jar start to feel like yours again."),
 ("/images/px-couple-3687274.jpg", "A couple walking a dog together along a green path", "The engine that keeps you going",
  "We build you up with short routines at your pace, in versions for different people and different kinds of arthritis, so you never have to overdo it."),
]
STATS = [("Free", "The 7 Bad Habits book, to start"), ('<s class="was" aria-label="regular price $30">$30</s> $17', "The Joint Reset, one payment"),
         ("30 days", "Money-back promise on all of it"), ("Personal", "A real person writes back")]
SRC_H = "Plain words, with the sources named."
SRC_SUB = "We read the studies so you don't have to, and we say where each answer comes from. These are some of the places we look."
SOURCES = [("https://www.nccih.nih.gov/health/arthritis-and-complementary-health-approaches", "US National Institutes of Health (NCCIH)"),
           ("https://rheumatology.org", "American College of Rheumatology"), ("https://www.arthritis.org", "Arthritis Foundation"),
           ("https://www.nhs.uk/conditions/arthritis/", "NHS (UK)")]
SIGNOFF = "A real person reads every email you send."
SHOP_H = "Start free. Go further only if it helps."
SHOP_SUB = "Hinge Care lists every price on this page, and nothing is added at checkout."
PRODUCTS = [
 dict(img="/images/cover-habits-rust.jpg", alt="Cover of the free book, 7 Bad Habits for Arthritis That Keep You Stuck", eye="Free, start here",
      name="7 Bad Habits for Arthritis", text="Stop doing the small things that keep you stiff. Each habit comes with a fix you can start today, and most cost nothing.",
      price="Free", small="", btn="Get it free", href="guide.html", main=True),
 dict(img="/images/cover-joint-reset.jpg", alt="Cover of The Joint Reset book", eye="The Book", name="The Joint Reset",
      text="Stop paying for remedies that don't work. You'll know which ones earn your money, and which to leave on the shelf.",
      price='<s class="was" aria-label="regular price $30">$30</s> $17', small="one payment", btn="See the book", href="book.html"),
 dict(img="/images/walk.jpg", alt="A woman walking along a park path in autumn", eye="The Program", name="The Hinge Care Program",
      text="Move through your day without bracing for it. A few guided minutes in the Hinge App each day, at a pace that's all yours.",
      price='<s class="was" aria-label="regular price $155">$155</s> $97', small="paid once", btn="See the Program", href="course-info.html"),
]
CLUB = dict(eye="The Club", h="Something to look forward to, every week.",
            p="Join for yourself, or give it to Mom or Dad. The first 50 members pay $9 a month (about 30 cents a day) or $90 a year, for as long as they stay. After that it's $19 a month.",
            buy="Join for $9 a month", buyhref="shop/club-checkout.html", see="See the Club", seehref="club.html",
            pay="Cancel anytime. Pay with card, Apple Pay or Google Pay.", gift="Gifts: 3, 6 or 12 months, paid once. No renewals.")
STEPS_H = "How Hinge Care helps with arthritis"
STEPS_SUB = "Start small, with nothing to install. Everything comes by email, in large, easy-to-read text."
STEPS = [("Start with 7 Bad Habits for Arthritis (free)", "Leave your first name and email. The book arrives in a minute or two."),
         ("Try one small change", "Pick one habit from the book. Most take less time than the kettle takes to boil."),
         ("Go further if you like", "The book, the Program or the Club. Each comes with a 30-day money-back promise or easy cancelling.")]
FIN_H = "Get your mornings back."
FIN_P = "Start free today. Go further only if it helps."
NAV = [("book.html", "The Book"), ("course-info.html", "The Program"), ("club.html", "The Club"), ("#shop", "Prices")]
FOOT_NOTE = "For general wellness, not medical advice. Check with your doctor before starting new exercises. Some photos from Pexels and Pixabay. &copy; 2026 Hinge Care"

def form(cls="sign"):
    return f'''<form class="{cls}" method="POST" action="https://hinge-forms.cgmandre.workers.dev" autocomplete="on">
<p class="lbl">Start free with our book, 7 Bad Habits for Arthritis</p>
<input type="hidden" name="_next" value="https://myhingecare.com/thank-you-book.html"><input type="hidden" name="_subject" value="New signup for the free 7 Bad Habits for Arthritis guide"><input type="hidden" name="_template" value="table"><input type="hidden" name="_captcha" value="false"><input type="hidden" name="Wants tips by email" value="Yes"><input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" style="display:none">
<div class="row"><label class="vh" for="fn-{cls}">First name</label><input id="fn-{cls}" name="First name" type="text" autocomplete="given-name" placeholder="First name" required><label class="vh" for="em-{cls}">Email address</label><input id="em-{cls}" name="email" type="email" autocomplete="email" inputmode="email" placeholder="Email address" required><button type="submit">Send me the free book</button></div>
<p class="fine">We'll send the book and joint-care tips. Unsubscribe any time. <a href="privacy.html">Privacy</a></p>
</form>'''

def logo(cls="logo"):
    src = "/brand/hinge-care-icon-cream.svg" if ("dk" in cls or "flogo" in cls) else "/brand/hinge-care-icon-green.svg"
    return f'<a class="{cls}" href="/"><img class="mark" src="{src}" alt="" width="28" height="28">Hinge Care</a>'

BASE_CSS = """
*{box-sizing:border-box}.hgrid>*,.signband .w>*,.signband>*,.layout>*,.two>*,.club>*,.hero>*,.split>*{min-width:0}.sign input{min-width:0}html{-webkit-text-size-adjust:100%}body{margin:0}img{max-width:100%;display:block}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #F5B04A;outline-offset:3px}
.vh{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.skip{position:absolute;left:-9999px}.skip:focus{left:12px;top:12px;background:#fff;color:#000;padding:10px 14px;z-index:99}
.mark{display:inline-block;width:1.3em;height:1.3em;vertical-align:-.26em;margin-right:.4em}
s.was{opacity:.7;font-weight:400;text-decoration-thickness:2px;margin-right:.15em}
/* every buy button: gold with a slow shine (site rule) */
a.buy{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;min-height:56px;padding:0 26px;border-radius:999px;background:linear-gradient(180deg,#FFD47E,#F5B04A);color:#1F3A27!important;font-weight:700;text-decoration:none;box-shadow:0 4px 0 #D99A2B,0 8px 22px rgba(245,176,74,.35)}
a.buy::after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent);transform:skewX(-20deg);animation:buyshine 3.2s ease-in-out infinite}
@keyframes buyshine{0%,55%{left:-60%}100%{left:130%}}
.sign .row{display:flex;flex-wrap:wrap;gap:10px}.sign input{flex:1 1 170px;min-height:56px;font:inherit;font-size:18px;padding:0 16px;border-radius:12px;border:1.5px solid #9AA39E;background:#fff;color:#1c1c1c}
.sign button{flex:1 1 100%;min-height:58px;border:0;cursor:pointer;font:inherit;font-weight:700;font-size:19px;border-radius:999px;background:linear-gradient(180deg,#FFD47E,#F5B04A);color:#1F3A27;box-shadow:0 4px 0 #D99A2B;position:relative;overflow:hidden}
.sign button::after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent);transform:skewX(-20deg);animation:buyshine 3.2s ease-in-out infinite}
.sign .lbl{margin:0 0 12px;font-weight:700}.sign .fine{margin:10px 0 0;font-size:15px}
.lookbar{position:fixed;left:12px;bottom:12px;z-index:90;display:flex;gap:6px;max-width:calc(100% - 24px);overflow-x:auto;background:#fff;border:1px solid #ccc;border-radius:14px;padding:6px;box-shadow:0 10px 30px -12px rgba(0,0,0,.35);font:600 14px/1 system-ui,sans-serif}
.lookbar a{color:#222;text-decoration:none;padding:9px 11px;border-radius:9px;white-space:nowrap}.lookbar a[aria-current]{background:#222;color:#fff}
@media (prefers-reduced-motion:reduce){*,*::after{animation:none!important;transition:none!important}}
"""

def page(title, fonts, css, body, cur, names, files):
    bar = '<nav class="lookbar" aria-label="Compare designs">' + ''.join(
        f'<a href="/{files[i]}"{" aria-current=\"page\"" if i == cur else ""}>{names[i]}</a>' for i in range(len(files))) + '<a href="/">Live site</a></nav>'
    return f'''<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>{title} | Hinge Care preview</title><link rel="icon" href="/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?{fonts}&display=swap" rel="stylesheet">
<style>{BASE_CSS}{css}</style></head><body><a class="skip" href="#main">Skip to content</a>{body}{bar}</body></html>'''
