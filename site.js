// ---------------------------------------------------------------
// SELLING THE JOINT RESET: paste your checkout link between the
// quotes below. Example: var CHECKOUT_URL = 'https://payhip.com/b/XXXXX';
// While it is empty, the "Get The Joint Reset" buttons and the offer
// on the thank-you page stay hidden. The free guide works either way.
// ---------------------------------------------------------------
var CHECKOUT_URL = '';

(function () {
  var veil = document.getElementById('veil');
  var calm = false;
  try { calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var WAIT = calm ? 0 : 500;
  var busy = false;
  function leave(then) {
    if (busy) { return; }
    busy = true;
    if (veil && !calm) { veil.classList.add('leaving'); }
    setTimeout(then, WAIT);
  }
  // Top bar: shrinks while scrolling down, grows back while scrolling up
  var h = document.querySelector('.hdr'), sp = document.querySelector('.hdr-space');
  if (h && sp) {
  var bg = h.querySelector('.hdr-bg'), brand = h.querySelector('.hdr-brand'), btn = h.querySelector('.hdr-btn');
  var links = Array.prototype.slice.call(h.querySelectorAll('.hdr-link'));
  var parts = [brand, btn].concat(links);
  var EASE = 'cubic-bezier(.22,1,.36,1)', DUR = 0.9, timer = null;
  var still = false;
  try { still = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (err) {}
  h.style.position = 'fixed'; h.style.top = '0'; h.style.left = '0'; h.style.right = '0';
  var clear = function () {
  parts.forEach(function (e) { e.style.transition = 'none'; e.style.transform = ''; });
  bg.style.transition = 'none'; bg.style.transform = '';
  };
  var measure = function () {
  var was = h.classList.contains('compact');
  clear(); h.classList.remove('compact');
  sp.style.height = h.offsetHeight + 'px';
  if (was) { h.classList.add('compact'); }
  parts.forEach(function (e) { e.style.transition = ''; }); bg.style.transition = '';
  };
  // Move every part on the graphics layer only (no layout work while it animates)
  var setCompact = function (on) {
  if (h.classList.contains('compact') === on) { return; }
  if (still) { h.classList.toggle('compact', on); return; }
  var first = parts.map(function (e) { return e.getBoundingClientRect(); });
  var bgFirst = bg.getBoundingClientRect().height;
  clear(); h.classList.toggle('compact', on);
  var last = parts.map(function (e) { return e.getBoundingClientRect(); });
  var bgLast = bg.getBoundingClientRect().height;
  parts.forEach(function (e, i) {
  var s = (i < 2 && last[i].height) ? first[i].height / last[i].height : 1;
  e.style.transformOrigin = '0 0';
  e.style.transform = 'translate(' + (first[i].left - last[i].left) + 'px,' + (first[i].top - last[i].top) + 'px) scale(' + s + ')';
  });
  bg.style.transform = 'scaleY(' + (bgLast ? bgFirst / bgLast : 1) + ')';
  void h.offsetWidth;
  var t = 'transform ' + DUR + 's ' + EASE;
  parts.forEach(function (e) { e.style.transition = t + ', opacity .4s ease, border-radius ' + DUR + 's ' + EASE; e.style.transform = 'translate(0px,0px) scale(1)'; });
  bg.style.transition = t; bg.style.transform = 'scaleY(1)';
  clearTimeout(timer);
  timer = setTimeout(function () { parts.forEach(function (e) { e.style.transition = ''; e.style.transform = ''; }); bg.style.transition = ''; bg.style.transform = ''; }, DUR * 1000 + 80);
  };
  measure();
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  var last = window.scrollY, anchor = last, dir = 0, tick = false;
  window.addEventListener('scroll', function () {
  if (tick) { return; }
  tick = true;
  requestAnimationFrame(function () {
  var y = window.scrollY, d = y > last ? 1 : (y < last ? -1 : 0);
  if (d && d !== dir) { dir = d; anchor = last; }
  if (y < 60) { setCompact(false); }
  else if (dir === 1 && y - anchor > 24) { setCompact(true); }
  else if (dir === -1 && anchor - y > 24) { setCompact(false); }
  last = y; tick = false;
  });
  }, { passive: true });
  }
  // Slow, calm transition between the pages of this site
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!/^[\w-]+\.html$/.test(href) || a.target === '_blank') { return; }
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) { return; }
      e.preventDefault();
      leave(function () { window.location.href = href; });
    });
  });
  // Coming back with the browser Back button: clear the veil
  window.addEventListener('pageshow', function (e) {
    if (e.persisted && veil) { veil.classList.remove('leaving'); busy = false; }
  });
  // Thank-you page: show the address the guide was sent to
  var sentTo = document.getElementById('sent-to');
  if (sentTo) {
    try { var saved = sessionStorage.getItem('ar-email'); if (saved) { sentTo.textContent = saved; } } catch (x) {}
  }
  // The Joint Reset: show the buy buttons only once a checkout link is set
  if (CHECKOUT_URL) {
    document.querySelectorAll('[data-buy]').forEach(function (a) { a.href = CHECKOUT_URL; a.hidden = false; });
    document.querySelectorAll('[data-buy-block]').forEach(function (b) { b.hidden = false; });
    document.querySelectorAll('[data-nobuy]').forEach(function (n) { n.hidden = true; });
  }
  // Signup form
  var form = document.getElementById('signup');
  if (form) {
    var err = document.getElementById('err');
    var humanEl = document.getElementById('human');
    if (humanEl) {
      humanEl.addEventListener('change', function () {
        var box = document.getElementById('human-box'), txt = document.getElementById('human-text'), eh = document.getElementById('err-human');
        txt.textContent = humanEl.checked ? "Okay, you're not a robot. Thank you!" : "I'm not a robot";
        box.style.background = humanEl.checked ? '#E6F6EC' : '#F4F8FC';
        box.style.borderColor = humanEl.checked ? '#1E8A4C' : '#AEC6DF';
        if (humanEl.checked && eh) { eh.hidden = true; }
      });
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = (document.getElementById('first').value || '').trim();
      var email = (document.getElementById('email').value || '').trim();
      var lastEl = document.getElementById('last');
      var last = lastEl ? (lastEl.value || '').trim() : 'x';
      var ok = first.length > 0 && last.length > 0 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
      if (!ok) { if (err) { err.hidden = false; } return; }
      if (err) { err.hidden = true; }
      var tips = document.getElementById('tips'), errTips = document.getElementById('err-tips');
      if (tips && !tips.checked) { if (errTips) { errTips.hidden = false; } tips.focus(); return; }
      if (errTips) { errTips.hidden = true; }
      var human = document.getElementById('human'), errHuman = document.getElementById('err-human');
      if (human && !human.checked) { if (errHuman) { errHuman.hidden = false; } human.focus(); return; }
      if (errHuman) { errHuman.hidden = true; }
      // Hand the details to the form service: it emails the visitor their guide,
      // emails the site owner the signup, then returns to the thank-you page.
      leave(function () {
        try { sessionStorage.setItem('ar-email', email); } catch (x) {}
        HTMLFormElement.prototype.submit.call(form);
      });
    });
  }
})();
