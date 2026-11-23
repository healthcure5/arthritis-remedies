/* Hinge Care help box: instant answers from /assistant/answers.json, hand-off to a person by email. No AI cost. */
(function () {
  if (window.__hcChat) return; window.__hcChat = 1;
  var TO = 'https://formsubmit.co/ajax/hingecare@gentlerootz.com';
  var css = '\
#hcc-btn{position:fixed;right:18px;bottom:18px;z-index:9998;display:flex;align-items:center;gap:10px;background:#1F3A27;color:#fff;border:0;border-radius:999px;padding:14px 20px;font:600 17px Inter,system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25);cursor:pointer}\
#hcc-btn svg{width:22px;height:22px}\
#hcc-btn:focus-visible,#hcc button:focus-visible,#hcc input:focus-visible,#hcc textarea:focus-visible{outline:3px solid #FFC56B;outline-offset:2px}\
#hcc{position:fixed;right:18px;bottom:18px;z-index:9999;width:min(400px,calc(100vw - 24px));height:min(640px,calc(100vh - 36px));display:none;flex-direction:column;background:#FAF6EF;border-radius:20px;box-shadow:0 18px 50px rgba(0,0,0,.3);overflow:hidden;font:17px/1.5 Inter,system-ui,sans-serif;color:#26332A}\
#hcc.open{display:flex}\
#hcc header{background:#1F3A27;color:#fff;padding:14px 16px;display:flex;align-items:center;justify-content:space-between}\
#hcc header b{font:600 19px Fraunces,Georgia,serif}#hcc header small{display:block;font-size:13px;opacity:.85}\
#hcc .x{background:rgba(255,255,255,.15);color:#fff;border:0;border-radius:10px;width:44px;height:44px;font-size:24px;cursor:pointer}\
#hcc .log{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}\
#hcc .m{max-width:88%;padding:11px 14px;border-radius:16px;white-space:normal}\
#hcc .bot{background:#fff;border:1px solid #E2DACB;align-self:flex-start;border-bottom-left-radius:4px}\
#hcc .me{background:#2F5D3A;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}\
#hcc .m a{color:#A4482C;font-weight:600}\
#hcc .chips{display:flex;flex-wrap:wrap;gap:8px}\
#hcc .chip{background:#fff;border:1.5px solid #2F5D3A;color:#1F3A27;border-radius:999px;padding:9px 14px;font:600 15px Inter,sans-serif;cursor:pointer;text-align:left}\
#hcc .row{display:flex;gap:8px;padding:12px;border-top:1px solid #E2DACB;background:#fff}\
#hcc .row input{flex:1;min-width:0;border:1.5px solid #C9C0AE;border-radius:12px;padding:12px;font:17px Inter,sans-serif}\
#hcc .send{background:#A4482C;color:#fff;border:0;border-radius:12px;padding:0 16px;font:600 16px Inter,sans-serif;cursor:pointer;min-height:48px}\
#hcc form.ask{display:flex;flex-direction:column;gap:8px;background:#fff;border:1px solid #E2DACB;border-radius:16px;padding:12px}\
#hcc form.ask label{font-size:15px;font-weight:600}\
#hcc form.ask input,#hcc form.ask textarea{border:1.5px solid #C9C0AE;border-radius:10px;padding:10px;font:16px Inter,sans-serif;width:100%;box-sizing:border-box}\
#hcc form.ask button{background:#FFC56B;color:#1F3A27;border:0;border-radius:12px;min-height:48px;font:700 16px Inter,sans-serif;cursor:pointer}\
#hcc .fine{font-size:13px;color:#4A5A4E;text-align:center;padding:0 12px 10px;background:#fff}\
@media print{#hcc,#hcc-btn{display:none!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var btn = document.createElement('button');
  btn.id = 'hcc-btn'; btn.type = 'button'; btn.setAttribute('aria-label', 'Open the Hinge Care help box');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>Questions?';
  var box = document.createElement('div');
  box.id = 'hcc'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Hinge Care help');
  box.innerHTML = '<header><div><b>Hinge Care help</b><small>Instant answers, or a person within one day</small></div><button class="x" type="button" aria-label="Close">&times;</button></header>' +
    '<div class="log" aria-live="polite"></div>' +
    '<form class="row"><input type="text" placeholder="Type your question" aria-label="Your question" maxlength="400"><button class="send" type="submit">Ask</button></form>' +
    '<div class="fine">General wellness, not medical advice.</div>';
  document.body.appendChild(btn); document.body.appendChild(box);
  var log = box.querySelector('.log'), input = box.querySelector('.row input'), data = null, started = false, last = '';

  function add(html, who) { var d = document.createElement('div'); d.className = 'm ' + (who || 'bot'); d.innerHTML = html; log.appendChild(d); log.scrollTop = log.scrollHeight; return d; }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function chips(ids, extra) {
    var w = document.createElement('div'); w.className = 'chips';
    ids.forEach(function (id) { var a = byId(id); if (!a) return; var c = document.createElement('button'); c.type = 'button'; c.className = 'chip'; c.textContent = a.q; c.onclick = function () { ask(a.q, a); }; w.appendChild(c); });
    if (extra) { var p = document.createElement('button'); p.type = 'button'; p.className = 'chip'; p.textContent = 'Write to a person'; p.onclick = function () { person(''); }; w.appendChild(p); }
    log.appendChild(w); log.scrollTop = log.scrollHeight;
  }
  function byId(id) { for (var i = 0; i < data.answers.length; i++) if (data.answers[i].id === id) return data.answers[i]; }
  function words(s) {
    return (s.toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').match(/[a-z0-9']+/g) || []).map(function (w) { return w.replace(/'s$/, '').replace(/(ing|ed|es|s)$/, ''); }).filter(function (w) { return w.length > 1 && STOP.indexOf(w) < 0; });
  }
  var STOP = 'the a an i my me is it to of and or for in on do does can how what where why when you your we our be am are was with this that at have has get got not'.split(' ').map(function (w) { return w.replace(/(ing|ed|es|s)$/, ''); });
  function score(q) {
    var ql = ' ' + q.toLowerCase() + ' ', qs = words(q), best = [], i, a, k, t, s;
    for (i = 0; i < data.answers.length; i++) {
      a = data.answers[i]; k = words(a.keys + ' ' + a.q); s = 0;
      for (t = 0; t < qs.length; t++) if (k.indexOf(qs[t]) >= 0) s += qs[t].length > 3 ? 2 : 1;
      (a.phrases || []).forEach(function (ph) { if (ql.indexOf(ph) >= 0) s += 3; });
      if (s) best.push([s, a]);
    }
    return best.sort(function (x, y) { return y[0] - x[0]; });
  }
  function ask(q, direct) {
    add(esc(q), 'me'); last = q;
    if (!direct && /^\s*(hi|hello|hey|good (morning|afternoon|evening))\b/i.test(q) && q.length < 25) { setTimeout(function () { add('Hello! What can I help you with today?'); chips(data.chips, true); }, 300); return; }
    if (!direct && /^\s*(thanks|thank you|ok|okay|great|perfect)\b/i.test(q) && q.length < 30) { setTimeout(function () { add('You\'re welcome. I\'m here if anything else comes up.'); }, 300); return; }
    var hits = direct ? [[9, direct]] : score(q);
    setTimeout(function () {
      if (!hits.length || hits[0][0] < 2) { add(data.fallback); person(q); return; }
      if (!direct && q.split(/\s+/).length > 14) {
        add('That sounds like something a person should answer properly. These might help in the meantime:');
        chips(hits.slice(0, 3).map(function (h) { return h[1].id; }), false);
        add('Or send it to us and a real person will reply within one day.'); person(q); return;
      }
      var a = hits[0][1]; add(a.a);
      var more = hits.slice(1, 3).filter(function (h) { return h[0] >= 2; }).map(function (h) { return h[1].id; });
      add('Did that answer it? If not, ask another way or write to a person.');
      chips(more, true);
      track('chat_answer', a.id);
    }, 350);
  }
  function person(q) {
    var f = document.createElement('form'); f.className = 'ask';
    f.innerHTML = '<label>Your name<input name="name" required autocomplete="name"></label>' +
      '<label>Your email<input name="email" type="email" required autocomplete="email"></label>' +
      '<label>Your message<textarea name="message" rows="3" required></textarea></label><button type="submit">Send to a person</button>';
    f.querySelector('textarea').value = q || last || '';
    f.action = 'https://formsubmit.co/hingecare@gentlerootz.com'; f.method = 'POST'; f.target = 'hcc-ifr';
    var hid = { _subject: '[Website chat] ' + (q || last || 'Question').slice(0, 60), source: 'Website chat', page: location.href, _template: 'box', _captcha: 'false', _next: location.origin + '/assistant/sent.html',
      _autoresponse: 'Thank you for writing to Hinge Care. Your message reached us, and a real person will reply within one day. Hinge Care support' };
    Object.keys(hid).forEach(function (k) { var i = document.createElement('input'); i.type = 'hidden'; i.name = k; i.value = hid[k]; f.appendChild(i); });
    var ifr = document.getElementById('hcc-ifr');
    if (!ifr) { ifr = document.createElement('iframe'); ifr.id = 'hcc-ifr'; ifr.name = 'hcc-ifr'; ifr.title = 'Message sender'; ifr.style.display = 'none'; document.body.appendChild(ifr); }
    f.onsubmit = function () {
      var b = f.querySelector('button[type=submit]'), em = f.querySelector('[name=email]').value;
      f.querySelector('[name=_subject]').value = '[Website chat] ' + f.querySelector('textarea').value.slice(0, 60);
      b.disabled = true; b.textContent = 'Sending...';
      var done = false, ok = function () { if (done) return; done = true; f.remove(); add('Thank you. Your message is on its way, and a person will reply to ' + esc(em) + ' within one day.'); track('chat_handoff', 'sent'); };
      ifr.onload = ok; setTimeout(function () { if (!done) { b.disabled = false; b.textContent = 'Send to a person'; add('That is taking a while. If it doesn\'t go through, please email hingecare@gentlerootz.com.'); } }, 20000);
      return true;
    };
    log.appendChild(f); log.scrollTop = log.scrollHeight; f.querySelector('input').focus();
  }
  function track(n, v) { try { if (window.gtag) gtag('event', n, { label: v }); } catch (e) {} }
  function open() {
    box.classList.add('open'); btn.style.display = 'none';
    var go = function () { if (!started) { started = true; add(data.greeting); chips(data.chips, true); } input.focus(); };
    if (data) go(); else fetch('/assistant/answers.json?v=1').then(function (r) { return r.json(); }).then(function (j) { data = j; go(); }).catch(function () { add('The help box couldn\'t load. Please email hingecare@gentlerootz.com and a person will reply within one day.'); });
    track('chat_open', location.pathname);
  }
  function close() { box.classList.remove('open'); btn.style.display = ''; btn.focus(); }
  btn.onclick = open; box.querySelector('.x').onclick = close;
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('open')) close(); });
  box.querySelector('.row').onsubmit = function (e) { e.preventDefault(); var q = input.value.trim(); if (!q || !data) return; input.value = ''; ask(q); };
})();
