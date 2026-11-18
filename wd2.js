/* Test site: mark one main button per page and keep it one tap away on phones. */
(function () {
  var sel = '.cta-big,.cta-soft,.more-btn,.hero-cta,.jb-btn,a.btn,button.btn';
  var hero = document.querySelector('main>section:first-of-type') || document.querySelector('#top');
  var main = hero && hero.querySelector(sel);
  if (!main) main = document.querySelector('main ' + sel);
  if (!main) return;
  var key = (main.getAttribute('href') || main.closest('form') && 'form' || '').split('#')[0];
  document.querySelectorAll(sel).forEach(function (b) {
    var k = (b.getAttribute('href') || b.closest('form') && 'form' || '').split('#')[0];
    if (b !== main && k !== key) b.classList.add('wd-sec');
  });
  if (!main.getAttribute('href')) return;
  var bar = document.createElement('div');
  bar.className = 'wd-bar';
  var a = document.createElement('a');
  a.href = main.getAttribute('href');
  a.textContent = (main.innerText || '').split('\n')[0].trim();
  bar.appendChild(a);
  document.body.appendChild(bar);
  document.body.style.paddingBottom = '84px';
  var same = [].slice.call(document.querySelectorAll(sel)).filter(function (b) { return !b.classList.contains('wd-sec'); });
  var seen = new Set();
  if (!('IntersectionObserver' in window)) { bar.classList.add('show'); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.isIntersecting ? seen.add(e.target) : seen.delete(e.target); });
    bar.classList.toggle('show', seen.size === 0 && scrollY > 200);
  });
  same.forEach(function (b) { io.observe(b); });
  addEventListener('scroll', function () { bar.classList.toggle('show', seen.size === 0 && scrollY > 200); }, { passive: true });
})();
