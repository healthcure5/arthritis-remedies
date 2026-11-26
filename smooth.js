/* Hinge Care: smooth, calm reveals on every page. JS-gated so no-JS still sees everything. */
(function(){
  var de=document.documentElement;
  de.classList.add('js');
  function start(){
    var els=[].slice.call(document.querySelectorAll('.reveal'));
    if(els.length===0){
      var main=document.getElementById('main')||document.querySelector('main')||document.body;
      [].forEach.call(main.children,function(e){
        if(e.tagName==='SECTION'||e.classList.contains('s')) e.classList.add('reveal');
      });
      els=[].slice.call(document.querySelectorAll('.reveal'));
    }
    if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');});return;}
    var io=new IntersectionObserver(function(ents){
      ents.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
    },{rootMargin:'0px 0px -8% 0px',threshold:0.05});
    els.forEach(function(e){io.observe(e);});
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',start);}else{start();}

  /* Slide-in menu: close on link tap, backdrop tap, or Escape */
  [].forEach.call(document.querySelectorAll('details.mnav'),function(d){
    d.addEventListener('click',function(e){
      if(e.target===d){ d.removeAttribute('open'); return; } // dim backdrop
      if(e.target.closest('a')){ d.removeAttribute('open'); }
    });
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){ [].forEach.call(document.querySelectorAll('details.mnav[open]'),function(d){d.removeAttribute('open');}); }
  });
})();
