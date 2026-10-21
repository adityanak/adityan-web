(function(){
  // progress bar + active nav
  var bar=document.getElementById('bar'),links=[].slice.call(document.querySelectorAll('.links a')),secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
  function onScroll(){
    var h=document.documentElement,p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);bar.style.width=(p*100)+'%';
    var cur=0;secs.forEach(function(s,i){if(s.getBoundingClientRect().top<window.innerHeight*.4)cur=i});
    links.forEach(function(a,i){a.classList.toggle('on',i===cur)});
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  // reveal
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});

  // counters
  document.querySelectorAll('[data-n]').forEach(function(el){
    var t=+el.dataset.n,i=0;(function step(){i++;el.textContent=i;if(i<t)setTimeout(step,120)})();
  });

  // typed role
  var words=['· Power Systems','· Renewable Energy','· Problem Solver','· Team Player'],wi=0,ci=0,del=false,el=document.getElementById('typed');
  (function tick(){
    var w=words[wi];ci+=del?-1:1;el.textContent=w.slice(0,ci);
    var d=del?40:90;
    if(!del&&ci===w.length){del=true;d=1400}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;d=300}
    setTimeout(tick,d);
  })();

  // skill filter
  document.querySelectorAll('.tab').forEach(function(b){
    b.addEventListener('click',function(){
      document.querySelectorAll('.tab').forEach(function(x){x.classList.remove('on')});b.classList.add('on');
      document.querySelectorAll('.sk').forEach(function(s){s.classList.toggle('hide',b.dataset.f!=='all'&&s.dataset.t!==b.dataset.f)});
    });
  });
})();
