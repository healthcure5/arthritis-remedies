/* Hinge Care: the menu drops down smoothly from the top, and closes the same way. */
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setup(d){
    if(d.dataset.smooth) return; d.dataset.smooth='1';
    var s=d.querySelector('summary'), p=d.querySelector(':scope>div'), busy=false;
    if(!p.id) p.id='site-menu'; s.setAttribute('aria-controls',p.id); s.setAttribute('aria-expanded','false'); s.setAttribute('aria-label','Menu'); p.setAttribute('aria-label','Site menu');
    function sync(){ s.setAttribute('aria-expanded', d.classList.contains('is-open')?'true':'false'); }
    new MutationObserver(sync).observe(d,{attributes:true,attributeFilter:['class']});
    function open(){ d.setAttribute('open',''); void p.offsetHeight; d.classList.add('is-open'); }
    function close(){
      if(!d.hasAttribute('open')) return;
      d.classList.remove('is-open');
      if(reduce){ d.removeAttribute('open'); return; }
      busy=true;
      var done=function(){ if(!d.classList.contains('is-open')) d.removeAttribute('open'); busy=false; p.removeEventListener('transitionend',onEnd); };
      var onEnd=function(e){ if(e.target===p) done(); };
      p.addEventListener('transitionend',onEnd); setTimeout(done,800);
    }
    var hoverOpenedAt=0;
    s.addEventListener('click',function(e){ e.preventDefault(); e.stopImmediatePropagation(); if(busy) return;
      if(d.classList.contains('is-open')){ if(Date.now()-hoverOpenedAt<700) return; close(); } else open(); });
    d.addEventListener('click',function(e){
      if(e.target===d){ e.stopImmediatePropagation(); close(); }
      else if(e.target.closest('a')){ e.stopImmediatePropagation(); d.classList.remove('is-open'); }
    },true);
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&d.classList.contains('is-open')){ close(); s.focus(); } });
    /* On a computer: once the mouse has been inside the menu, moving it out closes the menu */
    if(window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches){
      var inside=false,t=null;
      p.addEventListener('mouseenter',function(){inside=true;clearTimeout(t);});
      p.addEventListener('mouseleave',function(e){
        if(!inside||!d.classList.contains('is-open')) return;
        if(e.relatedTarget&&s.contains(e.relatedTarget)) return;
        t=setTimeout(function(){inside=false;close();},250);
      });
      s.addEventListener('mouseenter',function(){clearTimeout(t); if(!d.classList.contains('is-open')&&!busy){ open(); hoverOpenedAt=Date.now(); }});
      s.addEventListener('mouseleave',function(e){
        if(e.relatedTarget&&p.contains(e.relatedTarget)) return;
        clearTimeout(t); t=setTimeout(function(){ if(!inside) close(); },350);
      });
    }
  }
  function init(){ [].forEach.call(document.querySelectorAll('details.mnav'),setup); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

/* Big menu: links on the left, a picture and one line on the right that change as you point at each link */
(function(){
  var M={
    'guide':['/images/cover-habits-rust.jpg','7 Bad Habits for Arthritis, free in your inbox.'],
    'book':['/images/cover-joint-reset.jpg','The Joint Reset: what to try, and how to start.'],
    'course-info':['https://images.pexels.com/photos/7530853/pexels-photo-7530853.jpeg?auto=compress&cs=tinysrgb&w=900','The Program: one small step a day, at your own pace.'],
    'club':['/images/px-woman-823560.jpg','The Club: one focus a month, from $9 a month.'],
    'shop':['/images/chair.jpg','Every price in one place. Nothing added at checkout.'],
    '#shop':['/images/chair.jpg','Every price in one place. Nothing added at checkout.'],
    'about-hinge-care':['/images/px-cosmetics-7512325.jpg','A small wellness company that names every source.'],
    'contact':['https://images.pexels.com/photos/5257613/pexels-photo-5257613.jpeg?auto=compress&cs=tinysrgb&w=900','Write to us. A real person writes back.'],
    'circle':['/images/hands.jpg','The Circle: a small group, opening in January 2027.']
  };
  function key(h){h=h||'';if(h.indexOf('#shop')>-1)return '#shop';var m=h.replace(/^.*\//,'').replace(/\.html.*$/,'').replace(/#.*$/,'');return m;}
  function build(d){
    var p=d.querySelector(':scope>div'); if(!p||p.querySelector('.mlinks')) return;
    var links=[].slice.call(p.querySelectorAll(':scope>a')); if(!links.length) return;
    var L=document.createElement('div'); L.className='mlinks'; links.forEach(function(a){L.appendChild(a);});
    var R=document.createElement('div'); R.className='mprev'; R.setAttribute('aria-hidden','true');
    var im=document.createElement('img'); im.alt=''; im.loading='eager'; im.decoding='async'; var cap=document.createElement('p');
    R.appendChild(im); R.appendChild(cap); p.appendChild(L); p.appendChild(R);
    function show(a){var k=M[key(a.getAttribute('href'))]||M['guide'];
      if(im.getAttribute('src')!==k[0]){R.classList.add('swap');setTimeout(function(){im.src=k[0];cap.textContent=k[1];R.classList.remove('swap');},140);}else{cap.textContent=k[1];}
      links.forEach(function(x){x.classList.toggle('on',x===a);});}
    links.forEach(function(a){a.addEventListener('mouseenter',function(){show(a)});a.addEventListener('focus',function(){show(a)});});
    show(links.filter(function(x){return x.hasAttribute('aria-current');})[0]||links[0]);
  }
  function init(){[].forEach.call(document.querySelectorAll('details.mnav'),build);}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
