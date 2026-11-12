// ---------------------------------------------------------------
// SHOP LINKS: paste your checkout links between the quotes.
// While a link is empty, its buttons show "Coming soon".
// ---------------------------------------------------------------
var BOOK_URL = '';     // The Joint Reset, $27
var COURSE_URL = '';   // The Joint Release Course, $100

(function () {
  var here = (location.pathname.split('/').pop() || 'index.html');
  var ITEMS = [
    ['index.html', 'Home', 'Start here'],
    ['signup.html', 'Free guide', '7 everyday habits · Free'],
    ['index.html#full', 'The book', 'The Joint Reset · $27'],
    ['course-info.html', 'The course', '8 gentle weeks · $100'],
    ['library.html', 'My library', 'Everything you own, in one place']
  ];
  var css = document.createElement('style');
  css.textContent =
    '.jr-menu{background:#FFFFFF;border-bottom:1px solid #D7E2EE;font:600 17px/1.2 Inter,system-ui,sans-serif}' +
    '.jr-menu-in{max-width:1180px;margin:0 auto;padding:10px 16px;display:flex;gap:8px;align-items:center;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}' +
    '.jr-menu-in::-webkit-scrollbar{display:none}' +
    '.jr-menu a,.jr-menu button{flex:none;font:inherit;color:#0A1F44;text-decoration:none;background:#F4F8FC;border:1.5px solid #D7E2EE;border-radius:999px;padding:11px 16px;min-height:44px;display:inline-flex;align-items:center;gap:8px;cursor:pointer;white-space:nowrap}' +
    '.jr-menu a.on{background:#0A1F44;border-color:#0A1F44;color:#FFFFFF}' +
    '.jr-menu button{background:#1A4FB0;border-color:#1A4FB0;color:#FFFFFF}' +
    '.jr-burger{width:18px;height:12px;border-top:2px solid currentColor;border-bottom:2px solid currentColor;position:relative}.jr-burger::after{content:"";position:absolute;left:0;right:0;top:3px;border-top:2px solid currentColor}' +
    '.jr-shade{position:fixed;inset:0;background:rgba(10,31,68,.45);z-index:200;opacity:0;pointer-events:none;transition:opacity .25s}' +
    '.jr-drawer{position:fixed;top:0;left:0;bottom:0;width:min(86vw,340px);background:#FFFFFF;z-index:201;transform:translateX(-102%);transition:transform .3s cubic-bezier(.2,.7,.2,1);padding:22px 18px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;box-shadow:20px 0 50px -20px rgba(10,31,68,.5);font-family:Inter,system-ui,sans-serif}' +
    '.jr-open .jr-shade{opacity:1;pointer-events:auto}.jr-open .jr-drawer{transform:none}' +
    '.jr-drawer h2{margin:0 0 6px;font:700 24px/1.2 Lora,Georgia,serif;color:#0A1F44}' +
    '.jr-drawer a{display:flex;flex-direction:column;gap:2px;text-decoration:none;color:#0A1F44;background:#F4F8FC;border-radius:16px;padding:14px 16px;font-weight:700;font-size:19px}' +
    '.jr-drawer a small{font-weight:500;font-size:15.5px;color:#4F6580}' +
    '.jr-drawer a.on{background:#EAF2FA;box-shadow:inset 4px 0 0 #1A4FB0}' +
    '.jr-close{align-self:flex-end;font:600 16px Inter,system-ui,sans-serif;background:none;border:0;color:#1A4FB0;padding:10px;cursor:pointer}' +
    'a.soon{opacity:.6;cursor:default;pointer-events:none}' +
    '@media (prefers-reduced-motion:reduce){.jr-shade,.jr-drawer{transition:none}}';
  document.head.appendChild(css);

  function isOn(href) { var f = href.split('#')[0]; return f === here && href.indexOf('#') < 0; }
  var bar = document.createElement('nav');
  bar.className = 'jr-menu';
  bar.setAttribute('aria-label', 'Site menu');
  bar.innerHTML = '<div class="jr-menu-in"><button type="button" id="jr-open"><span class="jr-burger" aria-hidden="true"></span>Menu</button>' +
    ITEMS.map(function (i) { return '<a href="' + i[0] + '"' + (isOn(i[0]) ? ' class="on" aria-current="page"' : '') + '>' + i[1] + '</a>'; }).join('') + '</div>';
  var old = document.querySelector('.test-bar'), space = document.querySelector('.hdr-space'), slot = document.getElementById('jr-menu-slot');
  if (old) { old.parentNode.replaceChild(bar, old); }
  else if (slot) { slot.parentNode.replaceChild(bar, slot); }
  else if (space) { space.parentNode.insertBefore(bar, space.nextSibling); }
  else { document.body.insertBefore(bar, document.body.firstChild); }

  var shade = document.createElement('div'); shade.className = 'jr-shade';
  var drawer = document.createElement('aside'); drawer.className = 'jr-drawer'; drawer.setAttribute('aria-label', 'Menu');
  drawer.innerHTML = '<button type="button" class="jr-close">Close ✕</button><h2>Joint Release</h2>' +
    ITEMS.map(function (i) { return '<a href="' + i[0] + '"' + (isOn(i[0]) ? ' class="on"' : '') + '>' + i[1] + '<small>' + i[2] + '</small></a>'; }).join('');
  document.body.appendChild(shade); document.body.appendChild(drawer);
  function toggle(open) { document.documentElement.classList.toggle('jr-open', open); }
  document.getElementById('jr-open').addEventListener('click', function () { toggle(true); });
  shade.addEventListener('click', function () { toggle(false); });
  drawer.querySelector('.jr-close').addEventListener('click', function () { toggle(false); });
  drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggle(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { toggle(false); } });

  // Buy buttons
  document.querySelectorAll('[data-shop]').forEach(function (a) {
    var url = a.getAttribute('data-shop') === 'course' ? COURSE_URL : BOOK_URL;
    if (url) { a.href = url; }
    else { a.removeAttribute('href'); a.classList.add('soon'); a.setAttribute('aria-disabled', 'true'); a.textContent = 'Coming soon · ' + a.getAttribute('data-price'); }
  });
})();
