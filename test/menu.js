// ---------------------------------------------------------------
// CHECKOUT LINKS: paste your payment provider's links between the quotes.
// While a link is empty, the "Yes, I want..." button shows "Checkout opens soon".
// ---------------------------------------------------------------
var BOOK_URL = '';     // The Joint Reset
var COURSE_URL = '';   // The Joint Release Course
var LETTER_URL = '';   // The Gentle Joint Care Letter, $7 a month

(function () {
  var here = (location.pathname.split('/').pop() || 'index.html');
  var PROGRAMS = [
    ['guide.html', 'Free guide', 'A kind first step, on us'],
    ['book.html', 'The Joint Reset', 'Stop guessing. Feel calm and clear.'],
    ['course-info.html', 'The Joint Release Course', 'Eight weeks to feeling more like you']
  ];
  var LOGO = '<svg role="img" aria-label="Gentle Joint Care" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="overflow: visible"><defs><clipPath id="gjc-clip"><circle cx="32" cy="32" r="28.6"/></clipPath></defs><circle cx="32" cy="32" r="30" fill="#163E82" stroke-width="2.2"/><g clip-path="url(#gjc-clip)"><circle cx="41.5" cy="10.5" r="3.6"/><path d="M24.6 22.5c-1.6-7.5 2-13.6 8-13.8 5.8-.2 9.2 5 7.6 13.4"/><path d="M26 19c1.5-3.4 4.6-5.2 8.4-5 2.2.1 3.9 1.4 4.8 3.4"/><path d="M28.5 11.5c1.6 1 3.6 1.4 5.6 1.2M36.4 10.6c.8 1 1.9 1.8 3 2.2" stroke-width="1.2"/><path d="M25.6 19.5c-.4 5.6 2.2 9.8 6.6 9.8 4.2 0 6.8-4 6.6-9.4"/><path d="M28.4 21.4c.7.6 1.6.6 2.3 0M33.6 21.4c.7.6 1.6.6 2.3 0M30 25c1.3 1 3 1 4.3 0" stroke-width="1.2"/><path d="M29.4 28.8v3.200c-6 .8-13 3.2-15.4 8.6-1.6 3.6-2 9-2 17M35 28.800v3.200c6 .8 13 3.2 15.4 8.6 1.6 3.6 2 9 2 17"/><path d="M29.4 32c.8 1.4 1.7 2 2.8 2s2-.6 2.8-2" stroke-width="1.2"/><path d="M16.5 56c1.5-4.5 5-8 9.5-10.200M47.5 56c-1.5-4.5-5-8-9.5-10.2"/><path d="M25.6 45.400c.6-2.4 2.6-3.8 5-3.600l5.6.5c1.7.2 2.8 1.3 2.7 2.7-.1 1.3-1.2 2.2-2.8 2.200h-3.6"/><path d="M38.4 46.400c.4 2.4-1.2 4.5-3.7 4.900l-5.3.8c-2 .3-3.6-.8-3.9-2.5-.3-1.5.6-2.9 2.2-3.4"/><path d="M31.5 43.900h4.400M32 45.800h3.600M29.8 49.200l4.2-.6" stroke-width="1.1"/></g></svg>';
  var css = document.createElement('style');
  css.textContent =
    '.hdr,.top,.hdr-nav,.jr-fab,.jr-drawer,.jr-shade{display:none!important}' +
    '.hdr-in,.top-in{display:flex!important;flex-wrap:wrap!important;align-items:center!important;justify-content:space-between!important;gap:6px 24px!important;padding:10px 20px!important}' +
    '.jr-bar{background:#0A1F44!important;position:relative;z-index:100;box-shadow:0 12px 28px -18px rgba(10,31,68,.8)}.jr-bar-in{max-width:1180px;margin:0 auto;padding:10px 20px;min-height:84px;box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px 24px}' +
    '.jr-bar a.jr-home{display:flex;align-items:center;gap:12px;text-decoration:none;font:800 21px/1 Inter,system-ui,sans-serif;color:#FFFFFF;white-space:nowrap}' +
    '.jr-nav{position:relative;display:flex;align-items:center;gap:4px clamp(14px,3vw,34px);font:700 19px/1 Inter,system-ui,sans-serif;margin-left:auto}' +
    '.jr-nav a,.jr-nav button{font:inherit;color:#FFFFFF;text-decoration:none;background:none;border:0;padding:14px 4px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;border-bottom:3px solid transparent}' +
    '.jr-nav a:hover,.jr-nav button:hover,.jr-nav .on{color:#FFC56B;border-bottom-color:#FFC56B}' +
    '.jr-nav button::after{content:"";width:8px;height:8px;border-right:2.5px solid currentColor;border-bottom:2.5px solid currentColor;transform:rotate(45deg) translateY(-3px);transition:transform .2s}' +
    '.jr-nav button[aria-expanded="true"]::after{transform:rotate(-135deg) translateY(-2px)}' +
    '.jr-drop{position:absolute;right:0;top:calc(100% + 10px);width:min(340px,calc(100vw - 32px));padding:12px 22px 16px;border-radius:22px;background:radial-gradient(rgba(255,255,255,.09) 1.5px,transparent 1.7px) 0 0/26px 26px,radial-gradient(20rem 14rem at 100% 0%,rgba(255,197,107,.22),transparent 60%),rgba(14,44,98,.88);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1.5px solid rgba(255,197,107,.55);box-shadow:0 30px 60px -20px rgba(0,0,0,.7);opacity:0;visibility:hidden;transform:translateY(-12px);transition:opacity .25s ease,transform .25s ease,visibility 0s .25s;z-index:160}' +
    '.jr-drop.jr-show{opacity:1;visibility:visible;transform:none;transition:opacity .25s ease,transform .25s ease}' +
    '.jr-drop-top{display:flex;align-items:center;gap:12px;padding:8px 0 14px;font:800 18px/1 Inter,system-ui,sans-serif;color:#FFFFFF}' +
    '.jr-drop a{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:5px;padding:16px 30px 16px 0;border:0;border-top:1px solid rgba(255,255,255,.2);border-radius:0;font:700 21px/1.2 Lora,Georgia,serif;color:#FFFFFF;transition:padding .2s ease}' +
    '.jr-drop a::after{content:"";position:absolute;right:4px;top:50%;width:10px;height:10px;border-right:2.5px solid #FFC56B;border-top:2.5px solid #FFC56B;transform:translateY(-50%) rotate(45deg)}' +
    '.jr-drop a small{font:500 15.5px/1.35 Inter,system-ui,sans-serif;color:#DCE8F5}' +
    '.jr-drop a:hover,.jr-drop a.on{background:none;color:#FFD48A;border-bottom:0;border-top:1px solid rgba(255,255,255,.2);padding-left:10px}' +
    '@media (max-width:640px){.jr-nav{width:100%;justify-content:center;font-size:17px;gap:4px 18px}.jr-nav a,.jr-nav button{padding:8px 4px}.jr-drop{right:50%;transform:translate(50%,-12px)}.jr-drop.jr-show{transform:translate(50%,0)}}' +
    'a.soon{opacity:.6;cursor:default;pointer-events:none}' +
    '@media (prefers-reduced-motion:reduce){.jr-drop{transition:none}}';
  document.head.appendChild(css);

  var isProgram = PROGRAMS.some(function (p) { return p[0] === here; });
  var navEl = document.createElement('nav');
  navEl.className = 'jr-nav';
  navEl.setAttribute('aria-label', 'Main');
  navEl.innerHTML = '<a href="index.html"' + (here === 'index.html' ? ' aria-current="page"' : '') + '>Home</a>' +
    '<button type="button" id="jr-prog" aria-expanded="false" aria-controls="jr-drop">Programs</button>' +
    '<a href="library.html"' + (here === 'library.html' ? ' aria-current="page"' : '') + '>Library</a>' +
    '<a href="privacy.html#contact">Contact</a>' +
    '<div class="jr-drop" id="jr-drop"><div class="jr-drop-top">' + LOGO.replace('width="64" height="64"', 'width="46" height="46"') + '<span>Gentle Joint Care</span></div>' + PROGRAMS.map(function (p) { return '<a href="' + p[0] + '"' + (p[0] === here ? ' aria-current="page"' : '') + '>' + p[1] + '<small>' + p[2] + '</small></a>'; }).join('') + '</div>';
  var bar = document.createElement('header');
  bar.className = 'jr-bar';
  bar.innerHTML = '<div class="jr-bar-in"><a class="jr-home" href="index.html">' + LOGO + '<span>Gentle Joint Care</span></a></div>';
  document.body.insertBefore(bar, document.body.firstChild);
  var host = bar.firstChild;
  host.appendChild(navEl);
  var btn = document.getElementById('jr-prog'), drop = document.getElementById('jr-drop');
  function set(open) { drop.classList.toggle('jr-show', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  btn.addEventListener('click', function (e) { e.stopPropagation(); set(!drop.classList.contains('jr-show')); });
  document.addEventListener('click', function (e) { if (!drop.contains(e.target)) { set(false); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { set(false); } });

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
