// ---------------------------------------------------------------
// CHECKOUT LINKS: paste your payment provider's links between the quotes.
// While a link is empty, the "Yes, I want..." button shows "Checkout opens soon".
// ---------------------------------------------------------------
var BOOK_URL = 'https://whop.com/checkout/plan_aaSComudkA9aV';     // The Joint Reset, $17 (Whop checkout link)
var COURSE_URL = 'https://whop.com/checkout/plan_5mDXeVp9Kf7Zg';   // The Hinge Care Program, $97
var LETTER_URL = '';   // The Club, $7 a month
var BOOK_OFFER_URL = 'https://whop.com/checkout/plan_aaSComudkA9aV';   // The Joint Reset at $17, shown only on the thank-you page
var COURSE_OFFER_URL = 'https://whop.com/checkout/plan_1gwKGEcMJhESM'; // The Program at $77, shown only after someone buys the book
var BUNDLE_URL = '';       // Black Friday gift bundle: book + Program for $97

// Special offers: buttons marked data-pay="name" get their link here.
// A block marked data-pay-block="name" stays hidden until its link is set.
// Add ?preview=1 to a page address to see a hidden offer before the link exists.
(function () {
  var LINKS = { book17: BOOK_OFFER_URL, course77: COURSE_OFFER_URL, bundle: BUNDLE_URL };
  var preview = /[?&]preview=1/.test(location.search);
  function run() {
    document.querySelectorAll('[data-pay-block]').forEach(function (b) {
      if (LINKS[b.getAttribute('data-pay-block')] || preview) { b.hidden = false; }
    });
    document.querySelectorAll('[data-pay]').forEach(function (a) {
      var u = LINKS[a.getAttribute('data-pay')];
      if (u) { a.href = u; } else { a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); a.title = 'Checkout opens soon'; }
    });
    // Black Friday strip: a reminder until Nov 26, the offer from Nov 27 to Dec 1, 2026 (Eastern time)
    var now = Date.now(), from = Date.parse('2026-11-27T00:00:00-05:00'), to = Date.parse('2026-12-02T00:00:00-05:00');
    if (now < to && !/gift\.html$/.test(location.pathname) && !/preview-/.test(location.pathname) && !document.getElementById('bf-strip')) {
      var bar = document.createElement('a');
      bar.id = 'bf-strip'; bar.href = 'gift.html';
      bar.textContent = now < from
        ? 'Black Friday gift bundle, Nov 27: the book and the Program for $97. Get a reminder'
        : 'Black Friday: the book and the Program for $97, until Dec 1. See the bundle';
      bar.style.cssText = 'display:block;background:#FFC56B;color:#1F3A27;text-align:center;font:700 16px/1.4 Inter,system-ui,sans-serif;padding:9px max(16px,env(safe-area-inset-left));text-decoration:none';
      document.body.insertBefore(bar, document.body.firstChild);
    }
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', run); } else { run(); }
})();

(function () {
  var here = (location.pathname.split('/').pop() || 'index.html');
  var PROGRAMS = [
    ['guide.html', 'Free guide', 'A kind first step, on us'],
    ['book.html', 'The Joint Reset', 'Stop guessing. Feel calm and clear.'],
    ['course-info.html', 'The Hinge Care Program', 'One small step at a time, toward feeling like you'],
    ['club.html', 'The Club', 'A letter every Sunday, $7 a month'],
    ['mornings.html', 'Easier Mornings', 'A gift for a parent, $19 a month'],
    ['circle.html', 'The Circle', 'Twelve Tuesdays with a small group']
  ];
  var LOGO = '<span class="gjc-mark" role="img" aria-label="Hinge Care"></span>';
  var css = document.createElement('style');
  css.textContent =
    '.hdr,.top,.hdr-nav,.jr-fab,.jr-drawer,.jr-shade{display:none!important}' +
    '.hdr-in,.top-in{display:flex!important;flex-wrap:wrap!important;align-items:center!important;justify-content:space-between!important;gap:6px 24px!important;padding:10px 20px!important}' +
    '.jr-bar{background:#1F3A27!important;position:relative;z-index:100;box-shadow:0 12px 28px -18px rgba(31,58,39,.8)}.jr-bar-in{max-width:1180px;margin:0 auto;padding:10px 20px;min-height:84px;box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px 24px}' +
    '.jr-bar a.jr-home{display:flex;align-items:center;gap:12px;text-decoration:none;font:700 24px/1 Lora,Georgia,serif;letter-spacing:.005em;color:#FFFFFF;white-space:nowrap}' +
    '.jr-nav{position:relative;display:flex;align-items:center;gap:4px clamp(14px,3vw,34px);font:700 19px/1 Inter,system-ui,sans-serif;margin-left:auto}' +
    '.jr-nav a,.jr-nav button{font:inherit;color:#FFFFFF;text-decoration:none;background:none;border:0;padding:14px 4px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;border-bottom:3px solid transparent}' +
    '.jr-nav a:hover,.jr-nav button:hover,.jr-nav .on{color:#FFC56B;border-bottom-color:#FFC56B}' +
    '.jr-nav button::after{content:"";width:8px;height:8px;border-right:2.5px solid currentColor;border-bottom:2.5px solid currentColor;transform:rotate(45deg) translateY(-3px);transition:transform .2s}' +
    '.jr-nav button[aria-expanded="true"]::after{transform:rotate(-135deg) translateY(-2px)}' +
    '.jr-drop{position:absolute;right:0;top:calc(100% + 10px);width:min(340px,calc(100vw - 32px));padding:12px 22px 16px;border-radius:22px;background:radial-gradient(rgba(255,255,255,.09) 1.5px,transparent 1.7px) 0 0/26px 26px,radial-gradient(20rem 14rem at 100% 0%,rgba(255,197,107,.22),transparent 60%),rgba(30,58,38,.88);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1.5px solid rgba(255,197,107,.55);box-shadow:0 30px 60px -20px rgba(0,0,0,.7);opacity:0;visibility:hidden;transform:translateY(-12px);transition:opacity .25s ease,transform .25s ease,visibility 0s .25s;z-index:160}' +
    '.jr-drop.jr-show{opacity:1;visibility:visible;transform:none;transition:opacity .25s ease,transform .25s ease}' +
    '.jr-drop-top{display:flex;align-items:center;gap:12px;padding:8px 0 14px;font:800 18px/1 Inter,system-ui,sans-serif;color:#FFFFFF}' +
    '.jr-drop a{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:5px;padding:16px 30px 16px 0;border:0;border-top:1px solid rgba(255,255,255,.2);border-radius:0;font:700 21px/1.2 Lora,Georgia,serif;color:#FFFFFF;transition:padding .2s ease}' +
    '.jr-drop a::after{content:"";position:absolute;right:4px;top:50%;width:10px;height:10px;border-right:2.5px solid #FFC56B;border-top:2.5px solid #FFC56B;transform:translateY(-50%) rotate(45deg)}' +
    '.jr-drop a small{font:500 15.5px/1.35 Inter,system-ui,sans-serif;color:#E2EAD9}' +
    '.jr-drop a:hover,.jr-drop a.on{background:none;color:#FFD48A;border-bottom:0;border-top:1px solid rgba(255,255,255,.2);padding-left:10px}' +
    '.jr-burger{display:none;align-items:center;gap:10px;font:700 18px/1 Inter,system-ui,sans-serif;color:#fff;background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.35);border-radius:12px;padding:11px 16px;cursor:pointer}' +'.jr-burger i{display:block;width:20px;height:2.5px;background:currentColor;border-radius:2px;box-shadow:0 -6px 0 currentColor,0 6px 0 currentColor}' +'@media (max-width:640px){.jr-bar-in{min-height:68px;padding:8px 16px;flex-wrap:wrap}.jr-bar a.jr-home{font-size:22px}.jr-burger{display:inline-flex}.jr-nav{display:none;width:100%;flex-direction:column;align-items:stretch;gap:0;font-size:19px;padding:4px 0 10px;margin:0}.jr-bar.jr-open .jr-nav{display:flex}.jr-nav a,.jr-nav button{padding:15px 4px;border-bottom:1px solid rgba(255,255,255,.14);justify-content:space-between;text-align:left}.jr-drop{position:static;width:auto;opacity:1;visibility:visible;transform:none!important;transition:none;display:none;margin:6px 0 10px}.jr-drop.jr-show{display:block}}' +
    'a.soon{opacity:.6;cursor:default;pointer-events:none}' +
    '@media (prefers-reduced-motion:reduce){.jr-drop{transition:none}}';
  document.head.appendChild(css);

  var isProgram = PROGRAMS.some(function (p) { return p[0] === here; });
  var navEl = document.createElement('nav');
  navEl.className = 'jr-nav';
  navEl.setAttribute('aria-label', 'Main');
  navEl.innerHTML = '<a href="index.html"' + (here === 'index.html' ? ' aria-current="page"' : '') + '>Home</a>' +
    '<button type="button" id="jr-prog" aria-expanded="false" aria-controls="jr-drop">Guides</button>' +
    '<a href="library.html"' + (here === 'library.html' ? ' aria-current="page"' : '') + '>Library</a>' +
    '<a href="app/">Stretch app</a>' +
    '<a href="contact.html">Contact</a>' +
    '<div class="jr-drop" id="jr-drop"><div class="jr-drop-top">' + LOGO.replace('width="64" height="64"', 'width="46" height="46"') + '<span>Hinge Care</span></div>' + PROGRAMS.map(function (p) { return '<a href="' + p[0] + '"' + (p[0] === here ? ' aria-current="page"' : '') + '>' + p[1] + '<small>' + p[2] + '</small></a>'; }).join('') + '</div>';
  var bar = document.createElement('header');
  bar.className = 'jr-bar';
  bar.innerHTML = '<div class="jr-bar-in"><a class="jr-home" href="index.html">' + LOGO + '<span>Hinge Care</span></a></div>';
  document.body.insertBefore(bar, document.body.firstChild);
  document.documentElement.classList.add('jr-ready');
  var host = bar.firstChild;
  host.appendChild(navEl);
  var burger = document.createElement('button');
  burger.type = 'button'; burger.className = 'jr-burger'; burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open the menu');
  burger.innerHTML = '<i></i>Menu';
  host.insertBefore(burger, navEl);
  burger.addEventListener('click', function (e) { e.stopPropagation(); var open = !bar.classList.contains('jr-open'); bar.classList.toggle('jr-open', open); burger.setAttribute('aria-expanded', open ? 'true' : 'false'); });
  var btn = document.getElementById('jr-prog'), drop = document.getElementById('jr-drop');
  function set(open) { drop.classList.toggle('jr-show', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  btn.addEventListener('click', function (e) { e.stopPropagation(); set(!drop.classList.contains('jr-show')); });
  document.addEventListener('click', function (e) { if (!drop.contains(e.target)) { set(false); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { set(false); } });

  // Checkout block (book and program pages)
  var co = document.getElementById('checkout');
  if (!co) { return; }
  function sheet(open) { document.documentElement.classList.toggle('sheet-open', open); if (open) { co.scrollTop = 0; var f = document.getElementById('co-first'); if (f) { setTimeout(function () { f.focus(); }, 450); } } }
  document.querySelectorAll('[data-open-sheet]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); sheet(true); }); });
  document.querySelectorAll('[data-close-sheet]').forEach(function (b) { b.addEventListener('click', function () { sheet(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { sheet(false); } });
  var item = co.getAttribute('data-item');
  var url = item === 'course' ? COURSE_URL : item === 'letter' ? LETTER_URL : BOOK_URL;
  if (url) {
    document.querySelectorAll('[data-open-sheet]').forEach(function (b) { b.href = url; b.replaceWith(b.cloneNode(true)); });
    // Checkout is open: swap the "opening soon" wording in the box above the button
    document.querySelectorAll('.getbox').forEach(function (g) {
      var eye = g.querySelector('.eyebrow'), p = g.querySelector('p');
      if (eye && /soon/i.test(eye.textContent)) { eye.textContent = 'Ready now'; }
      if (p && /shortly/i.test(p.textContent)) { p.textContent = item === 'course' ? 'Tap below to pay securely on Whop. Your first lesson opens right after.' : 'Tap below to pay securely on Whop. Your book is ready to download right after.'; }
    });
  }
  if (/[?&]waitlist=1/.test(location.search)) {
    var done = document.getElementById('wl-done'), wf = document.getElementById('co-form');
    if (done) { done.hidden = false; } if (wf) { wf.style.display = 'none'; }
    sheet(true);
  }
})();
