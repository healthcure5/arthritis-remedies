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
    ['book.html', 'The Joint Reset', 'Stop guessing. Feel calm and clear.'],
    ['course-info.html', 'The Joint Release Course', 'Eight weeks to feeling more like you'],
    ['library.html', 'Our library', 'Everything we offer, in one place']
  ];
  var LOGO = '<svg role="img" aria-label="Gentle Joint Care" width="58" height="58" viewBox="0 0 64 64" fill="none" stroke-linecap="round" style="filter: drop-shadow(0 0 7px rgba(255,197,107,.55)) drop-shadow(0 3px 6px rgba(0,0,0,.5)); overflow: visible"><defs><linearGradient id="gjc-ring" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFF8E1"/><stop offset=".3" stop-color="#FFC56B"/><stop offset=".55" stop-color="#B8791A"/><stop offset=".8" stop-color="#FFE3A6"/><stop offset="1" stop-color="#E0A23A"/></linearGradient><radialGradient id="gjc-in" cx="24" cy="20" r="40" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3B74DA"/><stop offset=".55" stop-color="#0E2A5C"/><stop offset="1" stop-color="#061533"/></radialGradient><linearGradient id="gjc-let" x1="16" y1="14" x2="46" y2="52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFE0A0"/></linearGradient><radialGradient id="gjc-ball" cx="50" cy="48" r="9" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFF6D8"/><stop offset=".45" stop-color="#FFC56B"/><stop offset="1" stop-color="#C9861F"/></radialGradient></defs><circle cx="31" cy="32" r="30" fill="url(#gjc-ring)"/><circle cx="31" cy="32" r="26.5" fill="none" stroke="#7A4D0C" stroke-width=".8" opacity=".6"/><circle cx="31" cy="32" r="24.5" fill="url(#gjc-in)"/><path d="M12.5 23a20.5 20.5 0 0 1 25-10.5" stroke="#FFFFFF" stroke-width="2" opacity=".6"/><text x="31" y="45" text-anchor="middle" font-family="\'Lora\', Georgia, \'Times New Roman\', serif" font-weight="700" font-size="38" fill="url(#gjc-let)">G</text><circle cx="52" cy="50" r="7.5" fill="url(#gjc-ball)" stroke="#8C5A10" stroke-width=".7"/><circle cx="50" cy="47.6" r="1.9" fill="#FFFFFF" opacity=".9"/><path d="M55 12.5l4.5-4M60 21h5M49 6.5l1.5-5" stroke="#FFC56B" stroke-width="3"/><path d="M8 6l1.6 4.4L14 12l-4.4 1.6L8 18l-1.6-4.4L2 12l4.4-1.6z" fill="#FFF3CF"/></svg>';
  var css = document.createElement('style');
  css.textContent =
    '.hdr-nav,.jr-fab,.jr-drawer,.jr-shade{display:none!important}' +
    '.hdr-in,.top-in{display:flex!important;flex-wrap:wrap!important;align-items:center!important;justify-content:space-between!important;gap:6px 24px!important;padding:10px 20px!important}' +
    '.top{position:sticky;top:0;z-index:100}' +
    '.jr-bar{background:#0A1F44;position:sticky;top:0;z-index:100;box-shadow:0 12px 28px -18px rgba(10,31,68,.8)}.jr-bar-in{max-width:1180px;margin:0 auto;padding:10px 20px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px 24px}' +
    '.jr-bar a.jr-home{display:flex;align-items:center;gap:12px;text-decoration:none;font:800 21px/1 Inter,system-ui,sans-serif;color:#FFFFFF;white-space:nowrap}' +
    '.jr-nav{position:relative;display:flex;align-items:center;gap:4px clamp(14px,3vw,34px);font:700 19px/1 Inter,system-ui,sans-serif;margin-left:auto}' +
    '.jr-nav a,.jr-nav button{font:inherit;color:#FFFFFF;text-decoration:none;background:none;border:0;padding:14px 4px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;border-bottom:3px solid transparent}' +
    '.jr-nav a:hover,.jr-nav button:hover,.jr-nav .on{color:#FFC56B;border-bottom-color:#FFC56B}' +
    '.jr-nav button::after{content:"";width:8px;height:8px;border-right:2.5px solid currentColor;border-bottom:2.5px solid currentColor;transform:rotate(45deg) translateY(-3px);transition:transform .2s}' +
    '.jr-nav button[aria-expanded="true"]::after{transform:rotate(-135deg) translateY(-2px)}' +
    '.jr-drop{position:absolute;right:0;top:calc(100% + 10px);width:min(340px,calc(100vw - 32px));padding:10px;border-radius:22px;background:rgba(8,26,58,.78);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1.5px solid rgba(255,197,107,.55);box-shadow:0 30px 60px -20px rgba(0,0,0,.7);opacity:0;visibility:hidden;transform:translateY(-12px);transition:opacity .25s ease,transform .25s ease,visibility 0s .25s;z-index:160}' +
    '.jr-drop.open{opacity:1;visibility:visible;transform:none;transition:opacity .25s ease,transform .25s ease}' +
    '.jr-drop-top{display:flex;align-items:center;gap:12px;padding:10px 14px 14px;margin-bottom:6px;border-bottom:1px solid rgba(255,255,255,.18);font:800 18px/1 Inter,system-ui,sans-serif;color:#FFFFFF}' +
    '.jr-drop a{display:flex;flex-direction:column;align-items:flex-start;gap:5px;padding:14px 16px;border:0;border-radius:14px;font:700 21px/1.2 Lora,Georgia,serif;color:#FFFFFF}' +
    '.jr-drop a small{font:500 15.5px/1.35 Inter,system-ui,sans-serif;color:#C7D8EA}' +
    '.jr-drop a:hover,.jr-drop a.on{background:rgba(255,197,107,.16);color:#FFD48A;border:0}' +
    '@media (max-width:640px){.jr-nav{width:100%;justify-content:center;font-size:18px;gap:4px 26px}.jr-nav a,.jr-nav button{padding:8px 4px}.jr-drop{right:50%;transform:translate(50%,-12px)}.jr-drop.open{transform:translate(50%,0)}.hdr-space{min-height:138px!important}}' +
    'a.soon{opacity:.6;cursor:default;pointer-events:none}' +
    '@media (prefers-reduced-motion:reduce){.jr-drop{transition:none}}';
  document.head.appendChild(css);

  var isProgram = PROGRAMS.some(function (p) { return p[0] === here; });
  var navEl = document.createElement('nav');
  navEl.className = 'jr-nav';
  navEl.setAttribute('aria-label', 'Main');
  navEl.innerHTML = '<a href="index.html"' + (here === 'index.html' ? ' class="on" aria-current="page"' : '') + '>Home</a>' +
    '<button type="button" id="jr-prog" aria-expanded="false" aria-controls="jr-drop"' + (isProgram ? ' class="on"' : '') + '>Programs</button>' +
    '<a href="privacy.html#contact">Contact</a>' +
    '<div class="jr-drop" id="jr-drop"><div class="jr-drop-top">' + LOGO.replace('width="58" height="58"', 'width="44" height="44"') + '<span>Gentle Joint Care</span></div>' + PROGRAMS.map(function (p) { return '<a href="' + p[0] + '"' + (p[0] === here ? ' class="on" aria-current="page"' : '') + '>' + p[1] + '<small>' + p[2] + '</small></a>'; }).join('') + '</div>';
  var host = document.querySelector('.hdr-in, .top-in');
  if (!host) {
    var bar = document.createElement('header');
    bar.className = 'jr-bar';
    bar.innerHTML = '<div class="jr-bar-in"><a class="jr-home" href="index.html">' + LOGO + '<span>Gentle Joint Care</span></a></div>';
    document.body.insertBefore(bar, document.body.firstChild);
    host = bar.firstChild;
  }
  host.appendChild(navEl);
  var btn = document.getElementById('jr-prog'), drop = document.getElementById('jr-drop');
  function set(open) { drop.classList.toggle('open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  btn.addEventListener('click', function (e) { e.stopPropagation(); set(!drop.classList.contains('open')); });
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
