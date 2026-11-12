// ---------------------------------------------------------------
// CHECKOUT LINKS: paste your payment provider's links between the quotes.
// While a link is empty, the "Yes, I want..." button shows "Checkout opens soon".
// ---------------------------------------------------------------
var BOOK_URL = '';     // The Joint Reset
var COURSE_URL = '';   // The Joint Release Course

(function () {
  var here = (location.pathname.split('/').pop() || 'index.html');
  var ITEMS = [
    ['index.html', 'Home', 'Start here'],
    ['signup.html', 'The free guide', 'Your first small step, free'],
    ['book.html', 'The Joint Reset', 'Stop guessing. Feel calm and clear.'],
    ['course-info.html', 'The Joint Release Course', 'Eight weeks to feeling more like you'],
    ['library.html', 'My library', 'Everything you own, in one place']
  ];
  var MARK = '<span style="display:grid;place-items:center;width:58px;height:58px;border-radius:16px;background:#0A1F44"><svg role="img" aria-label="Joint Release" width="44" height="44" viewBox="0 0 64 64" fill="none" stroke-linecap="round"><path d="M15 12 31 32 15 52" stroke="#FFFFFF" stroke-width="9" stroke-linejoin="round"/><circle cx="15" cy="12" r="6.5" fill="#FFFFFF"/><circle cx="15" cy="52" r="6.5" fill="#FFFFFF"/><circle cx="32" cy="32" r="8.5" fill="#FFC56B"/><path d="M45 23a13 13 0 0 1 0 18" stroke="#FFC56B" stroke-width="4"/><path d="M53 17a21 21 0 0 1 0 30" stroke="#FFC56B" stroke-width="4" opacity=".55"/></svg></span>';
  var css = document.createElement('style');
  css.textContent =
    '.jr-fab{position:fixed;right:16px;top:14px;z-index:150;display:block;width:52px;height:46px;padding:10px 8px;background:none;border:0;cursor:pointer}.top{position:sticky;top:0;z-index:100}' +
    '.jr-burger{display:block;width:36px;height:26px;border-top:4px solid #FFC56B;border-bottom:4px solid #FFC56B;position:relative;border-radius:2px}.jr-burger::after{content:"";position:absolute;left:0;right:0;top:7px;border-top:4px solid #FFC56B;border-radius:2px}' +
    '.jr-shade{position:fixed;inset:0;background:rgba(10,31,68,.5);z-index:200;opacity:0;pointer-events:none;transition:opacity .25s}' +
    '.jr-drawer{position:fixed;top:0;right:0;bottom:0;width:min(88vw,360px);background:#FFFFFF;z-index:201;transform:translateX(102%);visibility:hidden;transition:transform .3s cubic-bezier(.2,.7,.2,1);padding:22px 18px 28px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;font-family:Inter,system-ui,sans-serif}' +
    '.jr-open .jr-shade{opacity:1;pointer-events:auto}.jr-open .jr-drawer{transform:none;visibility:visible;box-shadow:-20px 0 50px -20px rgba(10,31,68,.5)}' +
    '.jr-lock{display:flex;align-items:center;gap:12px;margin:0 0 10px}.jr-lock b{display:block;font:700 23px/1.1 Lora,Georgia,serif;color:#0A1F44}.jr-lock small{display:block;font:700 11px/1 Inter,system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#1A4FB0;margin-top:5px}' +
    '.jr-drawer a{display:flex;flex-direction:column;gap:3px;text-decoration:none;color:#0A1F44;background:#F4F8FC;border-radius:16px;padding:15px 16px;font-weight:700;font-size:20px}' +
    '.jr-drawer a small{font-weight:500;font-size:16px;line-height:1.35;color:#4F6580}' +
    '.jr-drawer a.on{background:#EAF2FA;box-shadow:inset 5px 0 0 #FFC56B}' +
    '.jr-close{align-self:flex-end;font:700 16px Inter,system-ui,sans-serif;background:none;border:0;color:#1A4FB0;padding:10px;cursor:pointer}' +
    '.jr-fab.on-light{background:rgba(255,255,255,.92);border-radius:12px;box-shadow:0 6px 16px -8px rgba(10,31,68,.6)}.jr-fab.on-light .jr-burger,.jr-fab.on-light .jr-burger::after{border-color:#0A1F44}' +
    '@media (prefers-reduced-motion:reduce){.jr-shade,.jr-drawer{transition:none}}';
  document.head.appendChild(css);

  var fab = document.createElement('button');
  fab.type = 'button'; fab.className = 'jr-fab'; fab.setAttribute('aria-label', 'Open the menu');
  fab.innerHTML = '<span class="jr-burger" aria-hidden="true"></span>';
  var shade = document.createElement('div'); shade.className = 'jr-shade';
  var drawer = document.createElement('aside'); drawer.className = 'jr-drawer'; drawer.setAttribute('aria-label', 'Menu');
  drawer.innerHTML = '<button type="button" class="jr-close">Close ✕</button><div class="jr-lock">' + MARK + '<span><b>Gentle Joint Care</b></span></div>' +
    ITEMS.map(function (i) { return '<a href="' + i[0] + '"' + (i[0] === here ? ' class="on" aria-current="page"' : '') + '>' + i[1] + '<small>' + i[2] + '</small></a>'; }).join('');
  if (!document.querySelector('.hdr, .top')) { fab.classList.add('on-light'); }
  document.body.appendChild(fab); document.body.appendChild(shade); document.body.appendChild(drawer);
  function toggle(open) { document.documentElement.classList.toggle('jr-open', open); }
  fab.addEventListener('click', function () { toggle(true); });
  shade.addEventListener('click', function () { toggle(false); });
  drawer.querySelector('.jr-close').addEventListener('click', function () { toggle(false); });
  drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggle(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { toggle(false); } });

  // Checkout block (book and course pages)
  var co = document.getElementById('checkout');
  if (!co) { return; }
  var url = co.getAttribute('data-item') === 'course' ? COURSE_URL : BOOK_URL;
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
