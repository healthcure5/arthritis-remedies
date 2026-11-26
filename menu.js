/* Hinge Care: the menu drops down smoothly from the top, and closes the same way. */
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setup(d){
    if(d.dataset.smooth) return; d.dataset.smooth='1';
    var s=d.querySelector('summary'), p=d.querySelector(':scope>div'), busy=false;
    function open(){ d.setAttribute('open',''); void p.offsetHeight; d.classList.add('is-open'); }
    function close(){
      if(!d.hasAttribute('open')) return;
      d.classList.remove('is-open');
      if(reduce){ d.removeAttribute('open'); return; }
      busy=true;
      var done=function(){ if(!d.classList.contains('is-open')) d.removeAttribute('open'); busy=false; p.removeEventListener('transitionend',onEnd); };
      var onEnd=function(e){ if(e.target===p) done(); };
      p.addEventListener('transitionend',onEnd); setTimeout(done,600);
    }
    s.addEventListener('click',function(e){ e.preventDefault(); e.stopImmediatePropagation(); if(busy) return; d.classList.contains('is-open')?close():open(); });
    d.addEventListener('click',function(e){
      if(e.target===d){ e.stopImmediatePropagation(); close(); }
      else if(e.target.closest('a')){ e.stopImmediatePropagation(); d.classList.remove('is-open'); }
    },true);
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') close(); });
  }
  function init(){ [].forEach.call(document.querySelectorAll('details.mnav'),setup); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
