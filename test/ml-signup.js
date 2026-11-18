/* Adds waitlist signups to the free MailerLite email list, then lets the form carry on to
   FormSubmit, which emails the owner and shows the "you're on the list" message. */
(function () {
  document.querySelectorAll('form[data-ml]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      if (f.dataset.mlSent) return;
      var email = f.querySelector('input[type=email]');
      if (!email || !email.value.trim()) return;
      e.preventDefault();
      f.dataset.mlSent = '1';
      var first = f.querySelector('input[autocomplete="given-name"]');
      var body = new URLSearchParams();
      body.append('fields[email]', email.value.trim());
      if (first && first.value.trim()) body.append('fields[name]', first.value.trim());
      body.append('ml-submit', '1');
      body.append('anticsrf', 'true');
      var done = false;
      function go() { if (done) return; done = true; HTMLFormElement.prototype.submit.call(f); }
      try {
        fetch('https://assets.mailerlite.com/jsonp/2784798/forms/' + f.dataset.ml + '/subscribe',
          { method: 'POST', mode: 'no-cors', body: body, keepalive: true }).then(go, go);
      } catch (x) { go(); }
      setTimeout(go, 3000);
    });
  });
})();
