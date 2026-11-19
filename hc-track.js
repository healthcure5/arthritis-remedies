/* Hinge Care click and button tracking. Sends events to Google Analytics (the tag already on every page).
   It records which button or link was clicked and on which page. It never reads form fields, so no names
   or email addresses are sent. */
(function () {
  function send(name, params) {
    try {
      if (typeof gtag !== 'function') return;
      params = params || {};
      params.page_path = location.pathname;
      params.transport_type = 'beacon';
      gtag('event', name, params);
    } catch (e) {}
  }
  function clean(t) {
    return (t || '').replace(/\s+/g, ' ').trim().slice(0, 60);
  }

  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('a, button') : null;
    if (!el) return;
    var text = clean(el.getAttribute('aria-label') || el.textContent);
    var href = el.getAttribute('href') || '';
    var p = { link_text: text };

    if (href.indexOf('mailto:') === 0) { send('email_click', p); return; }
    if (href.indexOf('tel:') === 0) { send('phone_click', p); return; }

    var url;
    try { url = new URL(href, location.href); } catch (x) { url = null; }
    if (url) {
      p.link_host = url.hostname;
      p.link_path = url.pathname;
      if (/\.(pdf|docx?|xlsx?|zip|mp3|mp4)$/i.test(url.pathname)) { send('file_download', p); return; }
      if (/whop\.com|payhip\.com|checkout/i.test(url.hostname + url.pathname)) { send('buy_click', p); return; }
      if (url.hostname && url.hostname !== location.hostname) { send('outbound_click', p); return; }
    }
    if (el.matches('.btn, .button, button, [class*="btn"], [class*="cta"]')) { send('button_click', p); }
  }, true);

  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || f.tagName !== 'FORM') return;
    send('form_submit', { form_id: f.id || (f.dataset && f.dataset.ml) || 'form' });
  }, true);

  var marks = { 50: false, 90: false };
  window.addEventListener('scroll', function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h <= 0) return;
    var pct = (window.scrollY / h) * 100;
    [50, 90].forEach(function (m) {
      if (!marks[m] && pct >= m) { marks[m] = true; send('scroll_depth', { percent: m }); }
    });
  }, { passive: true });
})();
