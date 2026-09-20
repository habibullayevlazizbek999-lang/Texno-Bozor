const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
let PRODUCTS=[], state={cat:"all",q:"",sort:"default"}, CART=JSON.parse(localStorage.getItem("tb_cart")||"{}"), REVMAP={};
let HERO={slides:[],i:0,timer:null};

function toast(msg,err){
  const t=document.createElement("div");
  t.className="toast"+(err?" err":"");
  t.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg><span>'+msg+'</span>';
  $("#toasts").appendChild(t);
  setTimeout(()=>{t.style.transition=".35s";t.style.opacity="0";t.style.transform="translateX(40px)";setTimeout(()=>t.remove(),350)},2600);
}
function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}

function initTheme(){
  const saved=localStorage.getItem("tb_theme")||"light";
  applyTheme(saved);
  $("#themeBtn").onclick=()=>{
    const cur=document.body.classList.contains("stars")?2:(document.body.classList.contains("dark")?1:0);
    applyTheme(["dark","stars","light"][cur]);
  };
}
function applyTheme(mode){
  document.body.classList.remove("dark","stars");
  const btn=$("#themeBtn"), ic=btn.querySelector("[data-icon]");
  if(mode==="dark"){document.body.classList.add("dark");}
  else if(mode==="stars"){document.body.classList.add("dark","stars");startStars();}
  localStorage.setItem("tb_theme",mode);
  if(ic){ic.dataset.icon=(mode==="light")?"sun":(mode==="dark"?"moon":"sparkle");paintIcons(btn);}
}

let starsRun=false;
function startStars(){
  if(starsRun)return; starsRun=true;
  const c=$("#starsC"),x=c.getContext("2d");
  let W,H,pts=[],met=null;
  function size(){W=c.width=innerWidth*devicePixelRatio;H=c.height=innerHeight*devicePixelRatio;}
  size();addEventListener("resize",size);
  for(let i=0;i<150;i++)pts.push({x:Math.random(),y:Math.random(),r:.6+Math.random()*1.7,p:Math.random()*6.28,s:.4+Math.random()*1.4});
  (function draw(t){
    requestAnimationFrame(draw);
    x.clearRect(0,0,W,H);
    pts.forEach(p=>{
      const a=.35+.55*Math.abs(Math.sin(t/900*p.s+p.p));
      x.beginPath();x.arc(p.x*W,p.y*H,p.r*devicePixelRatio,0,6.28);
      x.fillStyle="rgba(255,255,255,"+a+")";x.fill();
    });
    if(Math.random()<.004&&!met)met={x:Math.random()*W*.8,y:Math.random()*H*.3,v:9+Math.random()*6,l:0};
    if(met){
      met.x+=met.v;met.y+=met.v*.55;met.l++;
      x.strokeStyle="rgba(255,255,255,.85)";x.lineWidth=1.6*devicePixelRatio;
      x.beginPath();x.moveTo(met.x,met.y);x.lineTo(met.x-46*devicePixelRatio,met.y-26*devicePixelRatio);x.stroke();
      if(met.l>60||met.x>W||met.y>H)met=null;
    }
  })(0);
}

function goCat(cat){
  state.cat=cat;
  $$("#navLinks a,#mobileMenu a").forEach(a=>a.classList.toggle("on",a.dataset.cat===cat));
  $("#chipRow").querySelectorAll(".chip").forEach(ch=>ch.classList.toggle("on",ch.dataset.cat===cat));
  renderGrid();
  document.getElementById("catalog").scrollIntoView({behavior:"smooth"});
}

function filtered(){
  let arr=PRODUCTS.filter(p=>state.cat==="all"||p.cat===state.cat);
  if(state.q){const q=state.q.toLowerCase();arr=arr.filter(p=>(p.name+" "+p.sub+" "+p.spec+" "+CATS[p.cat]).toLowerCase().includes(q));}
  if(state.sort==="asc")arr=[...arr].sort((a,b)=>a.price-b.price);
  if(state.sort==="desc")arr=[...arr].sort((a,b)=>b.price-a.price);
  if(state.sort==="name")arr=[...arr].sort((a,b)=>a.name.localeCompare(b.name));
  return arr;
}

function mediaHTML(p){
  return "<img src='"+prodImg(p)+"' alt='' loading='lazy' onerror='imgFB(this,"+p.id+")'>";
}
function badgesHTML(p){
  let b="";
  if(p.oldPrice)b+="<span class='badge skidka'>-"+Math.round((1-p.price/p.oldPrice)*100)+"%</span>";
  if(p.badge==="TOP")b+="<span class='badge top'>TOP</span>";
  if(p.badge==="HIT")b+="<span class='badge hit'>Hit</span>";
  if(p.badge==="YANGI")b+="<span class='badge yangi'>Yangi</span>";
  return b;
}
function priceHTML(p){
  return "<div class='price'>"+formatSum(p.price)+(p.oldPrice?"<s>"+formatSum(p.oldPrice)+"</s>":"")+"</div>";
}

function renderChips(){
  const row=$("#chipRow");
  row.innerHTML="<button class='chip on' data-cat='all'>Barchasi</button>"+Object.keys(CATS).map(c=>"<button class='chip' data-cat='"+c+"'>"+CATS[c]+"</button>").join("");
  row.onclick=e=>{const ch=e.target.closest(".chip");if(ch)goCat(ch.dataset.cat);};
}
function rateRow(p){
  const revs=productReviews(p,REVMAP),av=avgRate(revs),cnt=revs.length;
  return "<div class='p-rate'>"+ratedStars(av,13)+"<small>"+(av?av.toFixed(1):"—")+" · "+cnt+" ta sharh</small></div>";
}
function renderGrid(){
  const arr=filtered(), g=$("#prodGrid");
  $("#resInfo").textContent=arr.length+" ta mahsulot";
  if(!arr.length){g.innerHTML="<div class='empty-note'>Hech narsa topilmadi 🔍 Boshqa so'z bilan qidirib ko'ring.</div>";return;}
  g.innerHTML=arr.map(p=>
    "<article class='p-card rv in'>"+
    "<div class='p-media' data-view='"+p.id+"'>"+mediaHTML(p)+
    "<div class='p-badges'>"+badgesHTML(p)+"</div>"+
    "<button class='p-eye' title=\"Tezkor ko'rish\"><span data-icon='eye'></span></button></div>"+
    "<div class='p-body'><span class='p-cat'>"+CATS[p.cat]+" • "+esc(p.sub)+"</span>"+
    "<h3 class='p-name'>"+esc(p.name)+"</h3>"+
    rateRow(p)+
    "<span class='p-spec'>"+esc(p.spec)+"</span>"+
    "<div class='p-foot'>"+priceHTML(p)+
    "<button class='add-btn' data-add='"+p.id+"'><span data-icon='bag'></span> Savatga</button></div></div></article>"
  ).join("");
  paintIcons(g);
}
function renderDeals(){
  const deals=PRODUCTS.filter(p=>p.oldPrice);
  $("#dealsRow").innerHTML=deals.map(p=>
    "<article class='p-card d-card rv in'>"+
    "<div class='p-media' data-view='"+p.id+"'>"+mediaHTML(p)+
    "<div class='p-badges'>"+badgesHTML(p)+"</div></div>"+
    "<div class='p-body'><h3 class='p-name'>"+esc(p.name)+"</h3>"+rateRow(p)+"<span class='p-spec'>"+esc(p.spec)+"</span>"+
    "<div class='p-foot'>"+priceHTML(p)+
    "<button class='add-btn' data-add='"+p.id+"'><span data-icon='bag'></span> Savatga</button></div></div></article>"
  ).join("");
  paintIcons($("#dealsRow"));
}

function buildHero(){
  const picks=[...PRODUCTS.filter(p=>p.oldPrice),...PRODUCTS.filter(p=>!p.oldPrice)];
  const h=$("#hero");
  h.innerHTML=picks.map((p,i)=>{
    const kick=p.oldPrice?"Kunlik chegirma":(p.badge?p.badge:"Tanlangan mahsulot");
    const media=p.video
      ?"<video src='"+p.video+"' muted loop playsinline preload='metadata'></video>"
      :"<img src='"+prodImg(p)+"' alt=''"+(i>2?" loading='lazy'":"")+" onerror='imgFB(this,"+p.id+")'>";
    const bg="linear-gradient(115deg,hsl("+p.hue+",55%,17%) 0%,hsl("+((p.hue+45)%360)+",65%,8%) 72%)";
    return "<div class='slide"+(i===0?" on":"")+"' data-i='"+i+"' style=\"background:"+bg+"\">"+
    "<div class='slide-media'>"+media+"</div>"+
    "<div class='slide-cap'><span class='cap-kicker'><span data-icon='percent'></span>"+kick+"</span>"+
    "<h1>"+esc(p.name)+" <span>endi TexnoBozorda!</span></h1>"+
    "<p class='cap-spec'>"+esc(p.spec)+"</p>"+
    "<div class='cap-price'>"+formatSum(p.price)+(p.oldPrice?"<s>"+formatSum(p.oldPrice)+"</s>":"")+"</div>"+
    "<div class='cap-btns'><button class='btn btn-pri' data-add='"+p.id+"'><span data-icon='bag'></span> Hoziroq olish</button>"+
    "<button class='btn btn-gho' data-view='"+p.id+"'><span data-icon='eye'></span> Batafsil</button></div></div></div>";
  }).join("")+
  "<button class='hero-arrows prev' id='heroPrev'><span data-icon='chevL'></span></button>"+
  "<button class='hero-arrows next' id='heroNext'><span data-icon='chevR'></span></button>"+
  "<div class='hero-dots' id='heroDots'>"+picks.map((_,i)=>"<div class='hdot"+(i===0?" act":"")+"'><i></i></div>").join("")+"</div>";
  paintIcons(h);
  HERO.slides=picks;
  bindHero();
  heroGo(0,true);
}
const HERO_DUR=5000;
function heroGo(i){
  HERO.i=(i+HERO.slides.length)%HERO.slides.length;
  $$("#hero .slide").forEach((s,k)=>s.classList.toggle("on",k===HERO.i));
  $$("#hero .hdot").forEach((d,k)=>{
    d.classList.remove("act","done");
    const bar=d.querySelector("i");
    bar.style.animation="none";
    bar.onanimationend=null;
    if(k<HERO.i){bar.style.width="100%";d.classList.add("done");}
    else{
      void bar.offsetWidth;
      bar.style.width="";
      if(k===HERO.i){
        bar.style.animation="";
        d.classList.add("act");
        bar.onanimationend=()=>{clearInterval(HERO.timer);heroGo(HERO.i+1)};
      }
    }
  });
  const sl=$("#hero .slide.on");
  const v=sl&&sl.querySelector("video");
  $$("#hero video").forEach(x=>{x.pause();});
  if(v)v.play().catch(()=>{});
  clearInterval(HERO.timer);
  HERO.timer=setInterval(()=>heroGo(HERO.i+1),HERO_DUR);
}
function bindHero(){
  $("#heroPrev").onclick=e=>{e.stopPropagation();heroGo(HERO.i-1)};
  $("#heroNext").onclick=e=>{e.stopPropagation();heroGo(HERO.i+1)};
  $("#heroDots").onclick=e=>{const d=e.target.closest(".hdot");if(d)heroGo([...$("#heroDots").children].indexOf(d))};
  $("#hero").addEventListener("mouseenter",()=>{
    clearInterval(HERO.timer);
    const b=$("#hero .hdot.act i");
    if(b)b.style.animationPlayState="paused";
  });
  $("#hero").addEventListener("mouseleave",()=>{
    const b=$("#hero .hdot.act i");
    if(b)b.style.animationPlayState="running";
    heroGo(HERO.i);
  });
}

function cartQty(){return Object.values(CART).reduce((a,b)=>a+b,0);}
function cartTotal(){return Object.entries(CART).reduce((s,[id,q])=>{const p=PRODUCTS.find(x=>x.id==id);return s+(p?p.price*q:0)},0);}
function saveCart(){localStorage.setItem("tb_cart",JSON.stringify(CART));
  const n=cartQty(),cc=$("#cartCount");
  cc.textContent=n;cc.classList.toggle("hide",!n);}
function addToCart(id){
  CART[id]=(CART[id]||0)+1;saveCart();renderCart();
  const p=PRODUCTS.find(x=>x.id==id);
  toast("«"+p.name+"» savatga qo'shildi!");
}
function setQty(id,d){
  CART[id]=(CART[id]||0)+d;
  if(CART[id]<1)delete CART[id];
  saveCart();renderCart();
}
function removeItem(id){delete CART[id];saveCart();renderCart();}
function renderCart(){
  const box=$("#drItems"),ids=Object.keys(CART);
  if(!ids.length){box.innerHTML="<p class='cart-empty'>Savat bo'sh 😔<br><small>Katalogdan mahsulot tanlang</small></p>";}
  else box.innerHTML=ids.map(id=>{
    const p=PRODUCTS.find(x=>x.id==id);if(!p)return "";
    const im=prodImg(p);
    return "<div class='ci'><img class='ci-img' src='"+im+"' onerror='imgFB(this,"+p.id+")'>"+
    "<div class='ci-mid'><div class='ci-name'>"+esc(p.name)+"</div>"+
    "<div class='ci-price'>"+formatSum(p.price*CART[id])+"</div>"+
    "<div class='ci-qty'><button data-q='-1|"+id+"'><span data-icon='minus'></span></button><b>"+CART[id]+"</b><button data-q='1|"+id+"'><span data-icon='plus'></span></button></div></div>"+
    "<button class='ci-del' data-del='"+id+"'><span data-icon='trash'></span></button></div>";
  }).join("");
  paintIcons(box);
  $("#drTotal").textContent=formatSum(cartTotal());
  $("#coTotal").textContent=formatSum(cartTotal());
}
function openDrawer(){$("#cartDrawer").classList.add("show");$("#drawerOverlay").classList.add("show");}
function closeDrawer(){$("#cartDrawer").classList.remove("show");$("#drawerOverlay").classList.remove("show");}

function quickView(id){
  const p=PRODUCTS.find(x=>x.id==id);if(!p)return;
  const media=p.video
    ?"<video src='"+p.video+"' controls autoplay muted loop playsinline></video>"
    :"<img src='"+prodImg(p)+"' onerror='imgFB(this,"+p.id+")'>";
  const revs=productReviews(p,REVMAP),av=avgRate(revs);
  $("#qvModal").innerHTML=
  "<button class='xbtn m-x' id='qvX'><span data-icon='x'></span></button>"+
  "<div class='qv-grid'><div class='qv-media'>"+media+"</div>"+
  "<div class='qv-info'><span class='qv-cat'>"+CATS[p.cat]+" • "+esc(p.sub)+"</span>"+
  "<h3>"+esc(p.name)+"</h3><p style='color:var(--muted);font-size:14px'>"+esc(p.spec)+"</p>"+
  (p.desc?"<p class='qv-desc'>"+esc(p.desc)+"</p>":"")+
  "<div class='qv-rate'>"+ratedStars(av,17)+"<b>"+(av?av.toFixed(1):"—")+"</b><small>"+revs.length+" ta sharh</small></div>"+
  "<div class='qv-price'>"+formatSum(p.price)+(p.oldPrice?"<s>"+formatSum(p.oldPrice)+"</s>":"")+"</div>"+
  "<div class='qv-actions'><div class='qty-box'><button id='qvM'><span data-icon='minus'></span></button><input id='qvQ' value='1' readonly><button id='qvP'><span data-icon='plus'></span></button></div>"+
  "<button class='btn btn-pri' id='qvAdd' style='flex:1'><span data-icon='bag'></span> Savatga qo'shish</button></div>"+
  "<div class='pay-pills' style='margin-top:18px'><span class='pp-tag'>🚚 1-3 kun dostavka</span><span class='pp-tag'>🛡 12 oy kafolat</span><span class='pp-tag'>💳 Muddatli to'lov</span></div></div></div>"+
  "<div class='qv-rev'><div class='rv-head'><h4>Sharhlar ("+revs.length+")</h4>"+
  "<div class='stars-input'><span>Baholang: </span><div class='star-in' id='rateSel'>"+ratedStars(0,22)+"</div></div></div>"+
  "<div class='rv-form'><input id='rvName' placeholder='Ismingiz' maxlength='30'>"+
  "<textarea id='rvText' placeholder='Sharhingizni yozing...' rows='2'></textarea>"+
  "<button class='btn btn-pri' id='rvSend' style='align-self:flex-end'><span data-icon='send'></span> Yuborish</button></div>"+
  "<div class='rv-list' id='rvList'>"+reviewListHTML(revs)+"</div></div>";
  paintIcons($("#qvModal"));
  $("#qvOverlay").classList.add("show");
  let q=1,rate=0;
  const upd=()=>$("#qvQ").value=q;
  $("#qvM").onclick=()=>{if(q>1){q--;upd();}};
  $("#qvP").onclick=()=>{if(q<99){q++;upd();}};
  $("#qvAdd").onclick=()=>{for(let i=0;i<q;i++)addToCart(p.id);};
  const rs=$("#rateSel"),starBox=rs.querySelector(".rv-stars");
  if(starBox&&starBox.querySelectorAll){}
  rs.onclick=e=>{
    const st=e.target.closest(".rv-star");if(!st)return;
    rate=[...rs.querySelectorAll(".rv-star")].indexOf(st)+1;
    for(let i=0;i<starBox.children.length;i++)starBox.children[i].classList.toggle("on",i<rate);
  };
  $("#rvSend").onclick=async ()=>{
    const nm=$("#rvName").value.trim(),txt=$("#rvText").value.trim();
    if(!rate){toast("Avval yulduz tanlang!",true);return;}
    if(!nm){toast("Ismingizni yozing!",true);return;}
    if(!txt){toast("Sharh yozing!",true);return;}
    const rv={id:"u"+Date.now(),pid:p.id,name:nm,r:rate,t:txt,date:Date.now(),user:true};
    await reviewPut(rv);
    REVMAP[p.id]=(REVMAP[p.id]||[]).concat([rv]);
    toast("Sharh qo'shildi ✓");
    const nr=productReviews(p,REVMAP);
    $("#rvList").innerHTML=reviewListHTML(nr);
    $("#rvName").value="";$("#rvText").value="";rate=0;
    for(let i=0;i<starBox.children.length;i++)starBox.children[i].classList.toggle("on",false);
  };
}
function reviewListHTML(revs){
  if(!revs.length)return "<p class='rv-empty'>Hozircha sharh yo'q — birinchi bo'ling!</p>";
  return revs.map(r=>"<div class='rv'><div class='rv-top'><b>"+esc(r.name)+(r.user?" <span class='badge yangi'>MIJOZ</span>":"")+"</b><span class='rv-stars-min'>"+ratedStars(r.r,12)+"</span></div>"+
  "<p>"+esc(r.t)+"</p>"+
  (r.reply?"<div class='reply-box'><b>Sotuvchi javobi:</b>"+esc(r.reply).replace(/\n/g,"<br>")+"</div>":"")+
  "</div>").join("");
}
function closeAll(){
  $$(".overlay").forEach(o=>o.classList.remove("show"));
  closeDrawer();
}

function openCheckout(){
  if(!cartQty()){toast("Avval savatga mahsulot qo'shing!",true);return;}
  closeDrawer();
  $("#coOverlay").classList.add("show");
}
function initCheckoutForm(){
  $("#coRegion").innerHTML="<option value=''>— Viloyatni tanlang —</option>"+VILS.map(v=>"<option>"+v+"</option>").join("");
  $("#payRow").onchange=e=>{
    if(e.target.name==="pay"){
      $("#payRow").querySelectorAll(".pay-pill").forEach(l=>l.classList.toggle("sel",l.querySelector("input").checked));
    }
  };
  $("#coPhone").addEventListener("input",e=>{
    let d=e.target.value.replace(/\D/g,"");
    if(d.startsWith("998"))d=d.slice(3);
    d=d.slice(0,9);
    let out="+998";
    if(d.length>0)out+=" "+d.slice(0,2);
    if(d.length>2)out+=" "+d.slice(2,5);
    if(d.length>5)out+=" "+d.slice(5,7);
    if(d.length>7)out+=" "+d.slice(7,9);
    e.target.value=out;
  });
  $("#cfPhone").addEventListener("input",e=>{
    let d=e.target.value.replace(/\D/g,"");
    if(d.startsWith("998"))d=d.slice(3);
    d=d.slice(0,9);
    let out="+998";
    if(d.length>0)out+=" "+d.slice(0,2);
    if(d.length>2)out+=" "+d.slice(2,5);
    if(d.length>5)out+=" "+d.slice(5,7);
    if(d.length>7)out+=" "+d.slice(7,9);
    e.target.value=out;
  });
  $("#coForm").addEventListener("submit",async e=>{
    e.preventDefault();
    const f=new FormData(e.target);
    const order={
      id:"TB"+Date.now().toString().slice(-6),
      date:new Date().toISOString(),
      name:f.get("name"),surname:f.get("surname"),
      phone:f.get("phone"),region:f.get("region"),
      address:f.get("address")||"",pay:f.get("pay"),
      items:Object.entries(CART).map(([id,q])=>{
        const p=PRODUCTS.find(x=>x.id==id);
        return {id:+id,name:p.name,price:p.price,qty:q};
      }),
      total:cartTotal(),
      status:"Yangi"
    };
    try{
      await orderPut(order);
      CART={};saveCart();renderCart();
      $("#coOverlay").classList.remove("show");
      $("#okId").textContent=order.id;
      $("#okTotal").textContent=formatSum(order.total)+" ("+order.pay+")";
      $("#okOverlay").classList.add("show");
    }catch(err){
      toast("Xatolik yuz berdi, qayta urinib ko'ring!",true);
    }
  });
}

function tickCountdown(){
  const now=new Date(),mid=new Date(now);mid.setHours(24,0,0,0);
  let s=Math.floor((mid-now)/1000);
  const h=String(Math.floor(s/3600)).padStart(2,"0"),
        m=String(Math.floor(s%3600/60)).padStart(2,"0"),
        ss=String(s%60).padStart(2,"0");
  $("#cdTimer").textContent=h+":"+m+":"+ss;
}
function initTicker(){
  const txt=["🚀 Chegirmalar har kuni yangilanadi","🛡 Rasmiy 12 oy kafolat","🚚 O'zbekiston bo'ylab tezkor dostavka","💳 Muddatli to'lov 0% ustama","🔧 Bepul diagnostika va servis","🎁 Har buyurtmaga sovg'a"];
  const line=txt.join("&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;");
  $("#tickerIn").innerHTML=line+"&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;"+line;
}

function initReveal(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.08});
  $$(".rv").forEach(el=>io.observe(el));
}

function bindEvents(){
  $("#cartBtn").onclick=openDrawer;
  $("#drawerX").onclick=closeDrawer;
  $("#drawerOverlay").onclick=closeDrawer;
  $("#checkoutBtn").onclick=openCheckout;
  $("#coX").onclick=closeAll;
  $("#coOverlay").addEventListener("click",e=>{if(e.target.id==="coOverlay")closeAll()});
  $("#qvOverlay").addEventListener("click",e=>{if(e.target.id==="qvOverlay")closeAll()});
  $("#okBtn").onclick=()=>$("#okOverlay").classList.remove("show");
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAll()});
  document.addEventListener("click",e=>{
    const add=e.target.closest("[data-add]");
    if(add){addToCart(+add.dataset.add);return;}
    const view=e.target.closest("[data-view]");
    if(view){quickView(view.dataset.view);return;}
    const dq=e.target.closest("[data-q]");
    if(dq){const[d,id]=dq.dataset.q.split("|");setQty(id,+d);return;}
    const del=e.target.closest("[data-del]");
    if(del){removeItem(del.dataset.del);return;}
  });
  $("#searchInp").addEventListener("input",e=>{state.q=e.target.value.trim();renderGrid();});
  $("#sortSel").addEventListener("change",e=>{state.sort=e.target.value;renderGrid();});
  $("#burgerBtn").onclick=()=>$("#mobileMenu").classList.toggle("open");
  $$("#mobileMenu a").forEach(a=>a.addEventListener("click",()=>$("#mobileMenu").classList.remove("open")));
  $("#contactForm").addEventListener("submit",async e=>{
    e.preventDefault();
    const id=Date.now().toString(36)+Math.random().toString(36).slice(2,6);
    const code=String(Math.floor(1000+Math.random()*9000));
    await leadPut({
      id,
      code,
      name:$("#cfName").value.trim(),
      phone:$("#cfPhone").value.trim(),
      msg:$("#cfMsg").value.trim(),
      reply:"",
      replyDate:null,
      date:Date.now()
    });
    $("#leadCode").textContent=code;
    e.target.reset();
    $("#leadOkOverlay").classList.add("show");
  });
  $("#leadOkBtn").onclick=closeAll;
  $("#checkReplyBtn").onclick=()=>{
    $("#lcPhone").value="";$("#lcCode").value="";$("#lcResult").innerHTML="";
    $("#lcOverlay").classList.add("show");
  };
  $("#lcClose").onclick=closeAll;
  $("#lcPhone").addEventListener("input",e=>{
    let d=e.target.value.replace(/\D/g,"");
    if(d.startsWith("998"))d=d.slice(3);
    d=d.slice(0,9);
    let out="+998";
    if(d.length>0)out+=" "+d.slice(0,2);
    if(d.length>2)out+=" "+d.slice(2,5);
    if(d.length>5)out+=" "+d.slice(5,7);
    if(d.length>7)out+=" "+d.slice(7,9);
    e.target.value=out;
  });
  $("#lcBtn").onclick=async()=>{
    const ph=$("#lcPhone").value.trim(),cd=$("#lcCode").value.trim(),res=$("#lcResult");
    if(ph.replace(/\D/g,"").length!==12||cd.length!==4){res.innerHTML="<div class='lc-res warn'>Telefon raqamni to'liq va 4 xonali kodni kiriting.</div>";return;}
    const leads=await leadAll();
    const l=leads.find(x=>x.phone===ph&&x.code===cd);
    if(!l){res.innerHTML="<div class='lc-res bad'>Bunday ariza topilmadi. Telefon va kodni tekshirib ko'ring.</div>";return;}
    if(l.reply){
      const dt=new Date(l.replyDate).toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit"})+" "+new Date(l.replyDate).toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"});
      res.innerHTML="<div class='lc-res ok'><b>Mutaxassis javobi • "+dt+"</b><p>"+esc(l.reply).replace(/\n/g,"<br>")+"</p></div>";
    }else{
      res.innerHTML="<div class='lc-res wait'>Arizangiz qabul qilingan! Mutaxassis tez orada javob yozadi — shu kod bilan yana keling.</div>";
    }
  };
}

async function loadReviews(){
  try{const all=await reviewAll();REVMAP={};all.forEach(r=>{(REVMAP[r.pid]=REVMAP[r.pid]||[]).push(r);});}catch(e){REVMAP={};}
}

(async function init(){
  paintIcons(document.body);
  PRODUCTS=await getProducts();
  await loadReviews();
  initTheme();
  initTicker();
  renderChips();
  renderGrid();
  renderDeals();
  buildHero();
  saveCart();
  renderCart();
  initCheckoutForm();
  bindEvents();
  tickCountdown();setInterval(tickCountdown,1000);
  requestAnimationFrame(initReveal);
})();
