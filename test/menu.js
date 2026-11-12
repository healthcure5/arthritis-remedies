// ---------------------------------------------------------------
// CHECKOUT LINKS: paste your payment provider's links between the quotes.
// While a link is empty, the "Yes, I want..." button shows "Checkout opens soon".
// ---------------------------------------------------------------
var BOOK_URL = '';     // The Joint Reset
var COURSE_URL = '';   // The Joint Release Course
var LETTER_URL = '';   // The Gentle Joint Care Letter, $7 a month

(function () {
  var here = (location.pathname.split('/').pop() || 'index.html');
  var ITEMS = [
    ['index.html', 'Home', 'Start here'],
    ['guide.html', 'The free guide', 'Your first small step, free'],
    ['book.html', 'The Joint Reset', 'Stop guessing. Feel calm and clear.'],
    ['course-info.html', 'The Joint Release Course', 'Eight weeks to feeling more like you'],
    ['library.html', 'Our library', 'Everything we offer, in one place']
  ];
  var MARK = '<svg role="img" aria-label="Gentle Joint Care" width="56" height="56" viewBox="0 0 64 64" fill="none" stroke-linecap="round" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,.5)); overflow: visible"><defs><linearGradient id="gjc-ring" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFF3CF"/><stop offset=".35" stop-color="#FFC56B"/><stop offset=".7" stop-color="#C9861F"/><stop offset="1" stop-color="#FFD98F"/></linearGradient><radialGradient id="gjc-in" cx="24" cy="20" r="40" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2A5FC0"/><stop offset=".6" stop-color="#0E2A5C"/><stop offset="1" stop-color="#061533"/></radialGradient><radialGradient id="gjc-ball" cx="50" cy="48" r="9" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFF6D8"/><stop offset=".45" stop-color="#FFC56B"/><stop offset="1" stop-color="#C9861F"/></radialGradient></defs><circle cx="31" cy="32" r="29" fill="url(#gjc-ring)"/><circle cx="31" cy="32" r="24.5" fill="url(#gjc-in)"/><path d="M13 22a20.5 20.5 0 0 1 24-9.5" stroke="#FFFFFF" stroke-width="1.6" opacity=".55"/><text x="30" y="46.5" text-anchor="middle" font-family="\'Great Vibes\', \'Brush Script MT\', cursive" font-size="45" fill="#FFFFFF">G</text><circle cx="52" cy="50" r="7.5" fill="url(#gjc-ball)" stroke="#8C5A10" stroke-width=".7"/><circle cx="50" cy="47.6" r="1.9" fill="#FFFFFF" opacity=".9"/><path d="M55 12.5l4.5-4M60 21h5M49 6.5l1.5-5" stroke="#FFC56B" stroke-width="3"/></svg>';
  var css = document.createElement('style');
  css.textContent =
    '.jr-fab{position:fixed;right:18px;top:16px;z-index:150;display:grid;place-items:center;width:52px;height:48px;padding:0;background:none;border:0;cursor:pointer}.top{position:sticky;top:0;z-index:100}' +
    '.jr-burger{display:block;box-sizing:border-box;width:36px;height:28px;border-top:4px solid #FFC56B;border-bottom:4px solid #FFC56B;position:relative;border-radius:2px}.jr-burger::after{content:"";position:absolute;left:0;right:0;top:8px;border-top:4px solid #FFC56B;border-radius:2px}' +
    '.jr-shade{position:fixed;inset:0;background:rgba(10,31,68,.5);z-index:200;opacity:0;pointer-events:none;transition:opacity .25s}' +
    '.jr-drawer{position:fixed;top:0;right:0;bottom:0;width:min(90vw,400px);z-index:201;transform:translateX(102%);visibility:hidden;transition:transform .35s cubic-bezier(.2,.7,.2,1);padding:26px 30px 34px;display:flex;flex-direction:column;overflow-y:auto;font-family:Inter,system-ui,sans-serif;color:#D7E2EE;background:radial-gradient(rgba(255,255,255,.06) 1.5px,transparent 1.7px) 0 0/26px 26px,radial-gradient(30rem 22rem at 100% 0%,rgba(255,197,107,.2),transparent 60%),#081A3A}' +
    '.jr-open .jr-shade{opacity:1;pointer-events:auto}.jr-open .jr-drawer{transform:none;visibility:visible;box-shadow:-30px 0 60px -20px rgba(0,0,0,.6)}' +
    '.jr-lock{display:flex;align-items:center;gap:14px;margin:6px 0 30px}.jr-lock b{display:block;font:800 21px/1.1 Inter,system-ui,sans-serif;color:#FFFFFF}' +
    '.jr-drawer a{position:relative;display:flex;flex-direction:column;gap:6px;text-decoration:none;color:#FFFFFF;padding:22px 34px 22px 0;border-top:1px solid rgba(255,255,255,.14);font:700 25px/1.2 Lora,Georgia,serif;transition:padding .2s ease,color .2s ease}' +
    '.jr-drawer a:last-of-type{border-bottom:1px solid rgba(255,255,255,.14)}' +
    '.jr-drawer a::after{content:"";position:absolute;right:6px;top:50%;width:11px;height:11px;border-right:2.5px solid #FFC56B;border-top:2.5px solid #FFC56B;transform:translateY(-50%) rotate(45deg)}' +
    '.jr-drawer a small{font:500 16.5px/1.4 Inter,system-ui,sans-serif;color:#AEC6DF}' +
    '.jr-drawer a:hover{padding-left:10px;color:#FFD48A}' +
    '.jr-drawer a.on{color:#FFC56B;padding-left:18px}.jr-drawer a.on::before{content:"";position:absolute;left:0;top:22px;bottom:22px;width:4px;border-radius:4px;background:#FFC56B}' +
    '.jr-foot{margin:auto 0 0;padding-top:28px;font:500 16px/1.5 Inter,system-ui,sans-serif;color:#AEC6DF}' +
    '.jr-close{align-self:flex-end;flex:none;width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);cursor:pointer;position:relative;font-size:0}.jr-close::before,.jr-close::after{content:"";position:absolute;left:12px;right:12px;top:21px;border-top:3px solid #FFC56B;border-radius:2px}.jr-close::before{transform:rotate(45deg)}.jr-close::after{transform:rotate(-45deg)}' +
    '.jr-fab.on-light{background:rgba(255,255,255,.92);border-radius:12px;box-shadow:0 6px 16px -8px rgba(10,31,68,.6)}.jr-fab.on-light .jr-burger,.jr-fab.on-light .jr-burger::after{border-color:#0A1F44}' +
    '@media (prefers-reduced-motion:reduce){.jr-shade,.jr-drawer{transition:none}}';
  document.head.appendChild(css);

  var fab = document.createElement('button');
  fab.type = 'button'; fab.className = 'jr-fab'; fab.setAttribute('aria-label', 'Open the menu');
  fab.innerHTML = '<span class="jr-burger" aria-hidden="true"></span>';
  var shade = document.createElement('div'); shade.className = 'jr-shade';
  var drawer = document.createElement('aside'); drawer.className = 'jr-drawer'; drawer.setAttribute('aria-label', 'Menu');
  drawer.innerHTML = '<button type="button" class="jr-close" aria-label="Close the menu">Close</button><div class="jr-lock">' + MARK + '<span><b>Gentle Joint Care</b></span></div>' +
    ITEMS.map(function (i) { return '<a href="' + i[0] + '"' + (i[0] === here ? ' class="on" aria-current="page"' : '') + '>' + i[1] + '<small>' + i[2] + '</small></a>'; }).join('') + '<p class="jr-foot">Take your time. There is no rush.</p>';
  if (!document.querySelector('.hdr, .top')) { fab.classList.add('on-light'); }
  document.body.appendChild(fab);
  // Keep the three lines level with the middle of the top bar
  var barEl = document.querySelector('.hdr, .top');
  function place() {
    if (!barEl) { return; }
    var r = barEl.getBoundingClientRect();
    fab.style.top = Math.max(6, Math.round(Math.max(r.top, 0) + (r.bottom - Math.max(r.top, 0) - 48) / 2)) + 'px';
  }
  place(); window.addEventListener('resize', place); window.addEventListener('scroll', place, { passive: true }); window.addEventListener('load', place); setTimeout(place, 600); document.body.appendChild(shade); document.body.appendChild(drawer);
  function toggle(open) { document.documentElement.classList.toggle('jr-open', open); }
  fab.addEventListener('click', function () { toggle(true); });
  shade.addEventListener('click', function () { toggle(false); });
  drawer.querySelector('.jr-close').addEventListener('click', function () { toggle(false); });
  drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggle(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { toggle(false); } });

  // Checkout block (book and course pages)
  var co = document.getElementById('checkout');
  if (!co) { return; }
  function sheet(open) { document.documentElement.classList.toggle('sheet-open', open); if (open) { co.scrollTop = 0; var f = document.getElementById('co-first'); if (f) { setTimeout(function () { f.focus(); }, 450); } } }
  document.querySelectorAll('[data-open-sheet]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); sheet(true); }); });
  document.querySelectorAll('[data-close-sheet]').forEach(function (b) { b.addEventListener('click', function () { sheet(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { sheet(false); } });
  var item = co.getAttribute('data-item');
  var url = item === 'course' ? COURSE_URL : item === 'letter' ? LETTER_URL : BOOK_URL;
  var country = document.getElementById('co-country'), slot = document.getElementById('co-state-slot');
  var CODES = 'US CA GB AU NZ IE AF AL DZ AD AO AG AR AM AT AZ BS BH BD BB BY BE BZ BJ BT BO BA BW BR BN BG BF BI KH CM CV CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FJ FI FR GA GM GE DE GH GR GD GT GN GW GY HT HN HK HU IS IN ID IR IQ IL IT JM JP JO KZ KE KI KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MR MU MX FM MD MC MN ME MA MZ MM NA NR NP NL NI NE NG KP MK NO OM PK PW PS PA PG PY PE PH PL PT PR QA RO RU RW KN LC VC WS SM ST SA SN RS SC SL SG SK SI SB SO ZA KR SS ES LK SD SR SE CH SY TW TJ TZ TH TL TG TO TT TN TR TM TV UG UA AE UY UZ VU VA VE VN YE ZM ZW'.split(' ');
  var names; try { names = new Intl.DisplayNames(['en'], { type: 'region' }); } catch (e) { names = null; }
  var list = CODES.map(function (c) { return [c, names ? names.of(c) : c]; });
  var top = list.slice(0, 6), rest = list.slice(6).sort(function (a, b) { return a[1].localeCompare(b[1]); });
  country.innerHTML = top.concat(rest).map(function (c) { return '<option value="' + c[0] + '">' + c[1] + '</option>'; }).join('');
  var STATES = 'Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,District of Columbia,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming,American Samoa,Guam,Northern Mariana Islands,Puerto Rico,U.S. Virgin Islands'.split(',');
  function drawState() {
    slot.innerHTML = country.value === 'US'
      ? '<label for="co-state">State</label><select id="co-state" name="state" autocomplete="address-level1"><option value="">Choose your state</option>' + STATES.map(function (s) { return '<option>' + s + '</option>'; }).join('') + '</select>'
      : '<label for="co-state">State, province or region</label><input id="co-state" name="state" type="text" autocomplete="address-level1">';
  }
  country.addEventListener('change', drawState); drawState();
  var yes = document.getElementById('co-yes'), note = document.getElementById('co-note');
  if (url) { yes.href = url; note.textContent = 'You will finish on our secure checkout page.'; }
  else { yes.removeAttribute('href'); yes.setAttribute('aria-disabled', 'true'); yes.classList.add('soon'); }
  document.getElementById('co-form').addEventListener('submit', function (e) { e.preventDefault(); });
})();
