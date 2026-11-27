/* Hinge Care: light haptic taps on phones.
   Android phones use the Vibration API. iPhones (iOS 18 and later) get a tap through a hidden switch,
   which only fires during a real touch. Computers and older phones simply ignore all of this. */
(function () {
  var touch = window.matchMedia && matchMedia('(pointer: coarse)').matches;
  if (!touch) return;
  var canVibrate = typeof navigator.vibrate === 'function';
  var label = null;
  if (!canVibrate) {
    try {
      label = document.createElement('label');
      label.setAttribute('aria-hidden', 'true');
      label.style.cssText = 'position:fixed;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;left:-9999px';
      var sw = document.createElement('input');
      sw.type = 'checkbox'; sw.setAttribute('switch', ''); sw.tabIndex = -1;
      label.appendChild(sw);
      (document.body || document.documentElement).appendChild(label);
    } catch (e) { label = null; }
  }
  function tap(ms) {
    try {
      if (canVibrate) navigator.vibrate(ms || 10);
      else if (label) label.click();
    } catch (e) {}
  }
  window.hcTap = tap;

  /* Buttons, menu, links that act like buttons */
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('a.b, button, .b, .nav a, .mnav summary, .mnav a, .hd-cta, .vidbtn, label.check, input[type=checkbox], input[type=radio]');
    if (!t || t === label || (label && label.contains(t))) return;
    if (t.matches('.mnav summary')) tap(14);
    else if (t.matches('a.b[href*="checkout"], button[type=submit]')) tap(18);
    else tap(10);
  }, true);

  /* Questions opening and closing */
  document.addEventListener('toggle', function (e) {
    if (e.target && e.target.matches && e.target.matches('details.q')) tap(8);
  }, true);

  /* Sliding rows: a small tick each time a card settles into place */
  var rows = document.querySelectorAll('.slide');
  [].forEach.call(rows, function (r) {
    var last = -1, timer = null;
    function settle() {
      var w = r.firstElementChild ? r.firstElementChild.getBoundingClientRect().width : 0;
      if (!w) return;
      var i = Math.round(r.scrollLeft / w);
      if (i !== last) { if (last !== -1) tap(6); last = i; }
    }
    r.addEventListener('scroll', function () { clearTimeout(timer); timer = setTimeout(settle, 90); }, { passive: true });
    settle();
  });
})();
