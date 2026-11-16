// ---------------------------------------------------------------
// CHECKOUT LINKS: paste your payment provider's links between the quotes.
// While a link is empty, the "Yes, I want..." button shows "Checkout opens soon".
// ---------------------------------------------------------------
var BOOK_URL = '';     // The Joint Reset
var COURSE_URL = '';   // The Gentle Joint Care Program
var LETTER_URL = '';   // The Gentle Joint Care Letter, $7 a month

(function () {
  var here = (location.pathname.split('/').pop() || 'index.html');
  var PROGRAMS = [
    ['guide.html', 'Free guide', 'A kind first step, on us'],
    ['book.html', 'The Joint Reset', 'Stop guessing. Feel calm and clear.'],
    ['course-info.html', 'The Gentle Joint Care Program', 'Eight weeks to feeling more like you']
  ];
  var LOGO = '<svg role="img" aria-label="Gentle Joint Care" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="overflow: visible"><defs><radialGradient id="gjc-bg" cx="35%" cy="22%" r="85%"><stop offset="0" stop-color="#2C62B8"/><stop offset=".55" stop-color="#163E82"/><stop offset="1" stop-color="#0A1F44"/></radialGradient><linearGradient id="gjc-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE2A8"/><stop offset=".5" stop-color="#FFC56B"/><stop offset="1" stop-color="#D99A3A"/></linearGradient><linearGradient id="gjc-fig" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".34"/><stop offset="1" stop-color="#9DC0F5" stop-opacity=".10"/></linearGradient><filter id="gjc-sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.3" flood-color="#04112B" flood-opacity=".6"/></filter><linearGradient id="gjc-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7D3B9"/><stop offset="1" stop-color="#E2A987"/></linearGradient><linearGradient id="gjc-hair" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3F5F9"/><stop offset="1" stop-color="#B4BFD0"/></linearGradient><linearGradient id="gjc-sw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F1F6FD"/><stop offset="1" stop-color="#9DB8E2"/></linearGradient><clipPath id="gjc-clip"><circle cx="32" cy="32" r="28.6"/></clipPath></defs><circle cx="32" cy="32" r="30.2" fill="url(#gjc-bg)" stroke="url(#gjc-gold)" stroke-width="1.8"/><circle cx="32" cy="32" r="27.4" stroke="#FFFFFF" stroke-opacity=".28" stroke-width=".7"/><g clip-path="url(#gjc-clip)" stroke="none"><g filter="url(#gjc-sh)"><path d="M8 64c0-12.500 5-20.500 14.500-24 2.700-1 6-1.600 9.500-1.600s6.800.6 9.500 1.600C51 43.500 56 51.500 56 64z" fill="url(#gjc-sw)"/><path d="M8 64c0-12.500 5-20.500 14.500-24l3 1.200C19 45 17 53 17 64zM56 64c0-12.500-5-20.500-14.500-24l-3 1.200C45 45 47 53 47 64z" fill="#7FA0D4" fill-opacity=".35"/><path d="M28 32h8v7.200c-1.300 1.800-2.700 2.600-4 2.600s-2.700-.8-4-2.600z" fill="#D99F7C"/><path d="M28 32h8v3.200c-2.700 1.500-5.300 1.500-8 0z" fill="#B97A5C" fill-opacity=".55"/><path d="M26.200 38.800c1.800 3.200 3.800 4.800 5.800 4.800s4-1.600 5.800-4.800c1.800.6 3 1.400 4 2.400-2 4.800-5.600 7.600-9.800 7.600s-7.800-2.800-9.800-7.600c1-1 2.200-1.800 4-2.400z" fill="#CFE0F7"/><path d="M32 43.600v8" stroke="#8FB0E0" stroke-width=".7" fill="none"/><circle cx="40.500" cy="9.600" r="4.600" fill="url(#gjc-hair)"/><path d="M37.600 8.600c1.800-1.500 4.200-1.700 5.800-.2M38 11c1.700.9 3.800.8 5.200-.4" fill="none" stroke="#9AA8BC" stroke-width=".7" stroke-linecap="round"/><ellipse cx="32" cy="19.800" rx="10.400" ry="12" fill="url(#gjc-hair)"/><ellipse cx="25.100" cy="22.600" rx="1.500" ry="2.300" fill="#E2A987"/><ellipse cx="38.900" cy="22.600" rx="1.500" ry="2.300" fill="#E2A987"/><ellipse cx="32" cy="22.400" rx="6.900" ry="8.500" fill="url(#gjc-skin)"/><path d="M26 26.500c1.600 4.200 4 6 6 6s4.400-1.800 6-6c-1.800 2.200-3.800 3-6 3s-4.200-.8-6-3z" fill="#D49878" fill-opacity=".35"/><path d="M24.800 21c.3-7.200 4.800-10.800 9.200-10.400 3.600.3 6.200 2.900 6.600 6.800-3.400-.4-7.200-2.200-9-4.800-1.700 3.300-4.400 5.800-6.800 8.400z" fill="url(#gjc-hair)"/><path d="M27 15.500c2-2 4.600-2.800 7.200-2.400M25.500 19c.4-2 1.200-3.600 2.400-4.800M36 13.400c2 .7 3.600 2.200 4.200 4.200" fill="none" stroke="#A3B0C4" stroke-width=".6" stroke-linecap="round"/><path d="M27.400 19.600q1.700-.9 3.300 0M33.300 19.600q1.700-.9 3.300 0" fill="none" stroke="#8D98AB" stroke-width=".8" stroke-linecap="round"/><path d="M27.800 22.200q1.400 1.200 2.800 0M33.400 22.200q1.400 1.200 2.800 0" fill="none" stroke="#4E3629" stroke-width="1" stroke-linecap="round"/><path d="M27.600 22.500l-.7.700M30.700 22.500l.6.700M33.200 22.500l-.6.700M36.300 22.500l.7.700" fill="none" stroke="#4E3629" stroke-width=".5" stroke-linecap="round"/><path d="M32 23.200c-.6 1.400-.9 2.200-.4 2.600.3.300 1 .3 1.300 0" fill="none" stroke="#C98A6C" stroke-width=".7" stroke-linecap="round"/><path d="M29.200 27.800c1.700 1.500 3.900 1.500 5.600 0" fill="none" stroke="#B05B52" stroke-width="1" stroke-linecap="round"/><circle cx="27.300" cy="25.600" r="1.800" fill="#F29C86" fill-opacity=".5"/><circle cx="36.700" cy="25.600" r="1.800" fill="#F29C86" fill-opacity=".5"/><path d="M14 48c3-4.500 7-6 12-6l1 7.500c-3.500.2-6.500 1.600-9 4.500z" fill="#E4EEFB"/><path d="M50 48c-3-4.500-7-6-12-6l-1 7.500c3.500.2 6.500 1.600 9 4.500z" fill="#E4EEFB"/><path d="M28.500 41.500c-1 1.400-.9 2.500 0 3.500M32.200 40.600c-1 1.600-.9 2.800.2 4M35.800 41.500c-1 1.400-.9 2.500 0 3.500" fill="none" stroke="#FFFFFF" stroke-opacity=".7" stroke-width=".8" stroke-linecap="round"/><path d="M25 46.500h13.500l-1.100 8c-.2 1.400-1.300 2.400-2.700 2.400h-5.900c-1.400 0-2.500-1-2.700-2.400z" fill="#FFFFFF"/><path d="M26 49h3l-.5 6h-1.500z" fill="#C9D8EE" fill-opacity=".6"/><path d="M38.500 48.200c3.200-.4 4.500 1.100 4.100 2.800-.4 1.700-2 2.600-4 2.400" fill="none" stroke="#FFFFFF" stroke-width="1.400" stroke-linecap="round"/><path d="M25 46.500h13.500" stroke="#FFC56B" stroke-width="1.200" fill="none"/><ellipse cx="24.800" cy="50.500" rx="3.300" ry="3" fill="url(#gjc-skin)"/><ellipse cx="39.200" cy="50.500" rx="3.300" ry="3" fill="url(#gjc-skin)"/><path d="M23.200 49.500h3.200M23.500 51.200h3M37.600 49.500h3.200M37.800 51.200h3" fill="none" stroke="#C98A6C" stroke-width=".5" stroke-linecap="round"/></g><path d="M3 30C5 14 18 3 34 3c11 0 20 4 27 13C50 9 22 12 3 30z" fill="#FFFFFF" fill-opacity=".16"/></g></svg>';
  var css = document.createElement('style');
  css.textContent =
    '.hdr,.top,.hdr-nav,.jr-fab,.jr-drawer,.jr-shade{display:none!important}' +
    '.hdr-in,.top-in{display:flex!important;flex-wrap:wrap!important;align-items:center!important;justify-content:space-between!important;gap:6px 24px!important;padding:10px 20px!important}' +
    '.jr-bar{background:#0A1F44!important;position:relative;z-index:100;box-shadow:0 12px 28px -18px rgba(10,31,68,.8)}.jr-bar-in{max-width:1180px;margin:0 auto;padding:10px 20px;min-height:84px;box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px 24px}' +
    '.jr-bar a.jr-home{display:flex;align-items:center;gap:12px;text-decoration:none;font:700 24px/1 Lora,Georgia,serif;letter-spacing:.005em;color:#FFFFFF;white-space:nowrap}' +
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
    '<a href="contact.html">Contact</a>' +
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

  // Checkout block (book and program pages)
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
