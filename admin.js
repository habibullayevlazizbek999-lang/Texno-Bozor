const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
let PRODUCTS=[], ORDERS=[], LEADS=[], REVIEWS=[], editingImg="", editingVid="";

function toast(msg,err){
  const t=document.createElement("div");
  t.className="toast"+(err?" err":"");
  t.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg><span>'+msg+'</span>';
  $("#toasts").appendChild(t);
  setTimeout(()=>{t.style.transition=".35s";t.style.opacity=0;t.style.transform="translateX(40px)";setTimeout(()=>t.remove(),350)},2600);
}
function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}

async function checkGate(){
  const {data}=await sb.auth.getSession();
  const ok=!!(data&&data.session);
  $("#gate").classList.toggle("hide",ok);
  $("#app").classList.toggle("hide",!ok);
  return ok;
}

async function loadAll(){
  await productsSeedIfEmpty();
  PRODUCTS=await getProducts();
  ORDERS=await orderAll();
  LEADS=await leadAll();
  REVIEWS=(await reviewAll()).filter(r=>!r.seed);
  await syncSettings();
  renderStats();
  renderProds();
  renderOrders();
  renderLeads();
  renderReviews();
  renderMus();
}
function renderStats(){
  $("#stProds").textContent=PRODUCTS.length;
  $("#stOrders").textContent=ORDERS.length;
  $("#stNew").textContent=ORDERS.filter(o=>o.status==="Yangi").length;
  const rev=ORDERS.filter(o=>o.status==="Yopilgan").reduce((s,o)=>s+(o.total||0),0);
  $("#stRev").textContent=formatSum(rev);
  $("#stLeads").textContent=LEADS.length;
  const lb=$("#lastOrdersBody");
  lb.innerHTML=ORDERS.slice(0,5).map(o=>"<tr><td><b>"+esc(o.id)+"</b></td><td>"+esc(o.name+" "+o.surname)+"<br><small class='t-sub'>"+esc(o.phone)+"</small></td><td>"+esc(o.region)+"</td><td><b>"+formatSum(o.total)+"</b></td><td><span class='status st-"+statusCls(o.status)+"'>"+esc(o.status)+"</span></td></tr>").join("")||"<tr><td colspan='5' style='text-align:center;color:var(--muted);padding:30px'>Hozircha buyurtma yo'q</td></tr>";
}
function statusCls(s){
  return s==="Jarayonda"?"jarayonda":s==="Yuborildi"?"yuborildi":s==="Yopilgan"?"yopilgan":s==="Bekor"?"bekor":"yangi";
}
const STATUSES=["Yangi","Jarayonda","Yuborildi","Yopilgan","Bekor"];

function renderProds(){
  $("#prodsBody").innerHTML=PRODUCTS.map(p=>{
    const im=prodImg(p);
    const media=(p.img?"📷":"")+(p.video?"+🎬":"");
    return "<tr>"+
    "<td><img class='t-thumb' src='"+im+"' onerror='imgFB(this,"+p.id+")'></td>"+
    "<td><div class='t-name'>"+esc(p.name)+"</div><div class='t-sub'>#"+p.id+" • "+esc(p.sub||"")+"</div></td>"+
    "<td>"+CATS[p.cat]+"</td>"+
    "<td><b>"+formatSum(p.price)+"</b></td>"+
    "<td>"+(p.oldPrice?"<span class='badge skidka'>-"+Math.round((1-p.price/p.oldPrice)*100)+"%</span>":"—")+"</td>"+
    "<td>"+(media||"—")+"</td>"+
    "<td><div class='row-acts'><button class='mini' data-edit='"+p.id+"' title='Tahrirlash'><span data-icon='edit'></span></button>"+
    "<button class='mini del' data-pdel='"+p.id+"' title=\"O'chirish\"><span data-icon='trash'></span></button></div></td></tr>";
  }).join("");
  paintIcons($("#prodsBody"));
}
function renderMus(){
  const cur=MUSX.cur();
  $("#trkList").innerHTML=MUSX.tracks.map(t=>{
    const sel=t.id===cur,now=MUSX.playingId===t.id;
    return "<div class='trk"+(sel?" sel":"")+(now?" now":"")+"'>"+
    "<div class='trk-ic'><span data-icon='note'></span></div>"+
    "<div class='trk-info'><b>"+esc(t.name)+(sel?" <span class='badge top' style='margin-left:8px'>SAYT MUSIQASI</span>":"")+"</b><small>"+esc(t.desc)+" • "+t.bpm+" BPM</small></div>"+
    "<div class='row-acts'>"+
    "<button class='mini"+(now?" act":"")+"' data-tplay='"+t.id+"' title='"+(now?"To'xtatish":"Tinglash")+"'>"+(now?"<span class='sq'></span>":"<span class='tri'></span>")+"</button>"+
    "<button class='mini"+(sel?" act":"")+"' data-tsel='"+t.id+"' style='min-width:96px'>"+(sel?"✓ Tanlangan":"Tanlash")+"</button></div></div>";
  }).join("");
}
function renderOrders(){
  $("#ordersBody").innerHTML=ORDERS.map(o=>"<tr>"+
  "<td><b>"+esc(o.id)+"</b></td>"+
  "<td>"+new Date(o.date).toLocaleString("ru-RU",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})+"</td>"+
  "<td>"+esc(o.name+" "+o.surname)+"<br><small class='t-sub'>"+esc(o.phone)+"<br>"+esc(o.region)+(o.address?", "+esc(o.address):"")+"</small></td>"+
  "<td>"+o.items.map(i=>esc(i.name)+" ×"+i.qty).join("<br>")+"</td>"+
  "<td><b>"+formatSum(o.total)+"</b></td>"+
  "<td>"+esc(o.pay)+"</td>"+
  "<td><select data-status='"+o.id+"' style='padding:7px 9px;font-size:12.5px;width:auto'>"+STATUSES.map(s=>"<option"+(s===o.status?" selected":"")+">"+s+"</option>").join("")+"</select><br><span class='status st-"+statusCls(o.status)+"'>"+esc(o.status)+"</span></td>"+
  "<td><button class='mini del' data-odel='"+o.id+"'><span data-icon='trash'></span></button></td></tr>"
  ).join("")||"<tr><td colspan='8' style='text-align:center;color:var(--muted);padding:30px'>Hozircha buyurtma yo'q</td></tr>";
  paintIcons($("#ordersBody"));
}

function renderLeads(){
  $("#leadsBody").innerHTML=LEADS.map(l=>{
    const d=new Date(l.date);
    const isNew=Date.now()-l.date<864e5&&!l.seen;
    const answered=l.reply;
    return "<tr"+(answered?" style='background:rgba(5,150,105,.05)'":"")+">"+
    "<td><b>"+esc(l.id)+"</b></td>"+
    "<td>"+d.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit"})+" "+d.toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"})+(isNew?" <span class='badge yangi'>YANGI</span>":"")+"</td>"+
    "<td>"+esc(l.name)+" (kod: <b>"+esc(l.code||"----")+"</b>)<br><a class='t-sub' href='tel:"+esc((l.phone||"").replace(/ /g,""))+"' style='color:#2563eb;font-weight:700'>"+esc(l.phone)+"</a></td>"+
    "<td>"+(l.msg?esc(l.msg):"<span style='color:var(--muted)'>— Qo'ng'iroq kutilmoqda —</span>")+
    (answered?"<div class='reply-box'><b>Javob berilgan ✓</b>"+esc(l.reply).replace(/\n/g,"<br>")+"</div>":"")+"</td>"+
    "<td><div style='display:flex;gap:6px'><button class='mini"+(answered?" ok":"")+"' data-lreply='"+l.id+"' title='"+(answered?"Javobni tahrirlash":"Javob yozish")+"'><span data-icon='"+(answered?"check":"send")+"'></span></button>"+
    "<button class='mini del' data-ldel='"+l.id+"'><span data-icon='trash'></span></button></div></td></tr>";
  }).join("")||"<tr><td colspan='5' style='text-align:center;color:var(--muted);padding:30px'>Hozircha murojaat yo'q</td></tr>";
}
let replyingLead=null;
function openReply(id){
  replyingRev=null;
  replyingLead=LEADS.find(x=>x.id===id);
  if(!replyingLead)return;
  replyingLead.seen=true;
  leadPut({...replyingLead});
  $("#rWho").innerHTML="<b style='color:var(--text)'>"+esc(replyingLead.name)+"</b> • "+esc(replyingLead.phone)+" • kod: <b>"+esc(replyingLead.code||"—")+"</b><br>Savol: "+(replyingLead.msg?esc(replyingLead.msg):"<i>yo'q</i>");
  $("#rTxt").value=replyingLead.reply||"";
  $("#rOverlay").classList.add("show");
  renderLeads();
}

function starsAdmin(r){
  let s="";
  for(let i=1;i<=5;i++)s+="<span class='rv-star"+(i<=Math.round(r)?" on":" off")+"'><span data-icon='star'></span></span>";
  return "<span class='rv-stars' style='font-size:13px'>"+s+"</span>";
}
function renderReviews(){
  const show=REVIEWS.slice().sort((a,b)=>String(b.id).localeCompare(String(a.id)));
  $("#reviewsBody").innerHTML=show.map(r=>{
    const p=PRODUCTS.find(x=>x.id==r.pid);
    const answered=r.reply?true:false;
    return "<tr"+(answered?" style='background:rgba(5,150,105,.05)'":"")+">"+
    "<td>"+new Date(r.date||Date.now()).toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit"})+"</td>"+
    "<td>"+esc(p?p.name:("Mahsulot #"+r.pid))+"</td>"+
    "<td><b>"+esc(r.name)+"</b></td>"+
    "<td>"+esc(r.t)+(answered?"<div class='reply-box' style='margin-top:8px'><b>Sizning javobingiz</b>"+esc(r.reply)+"</div>":"")+"</td>"+
    "<td>"+starsAdmin(r.r)+"</td>"+
    "<td><div class='row-acts'><button class='mini' data-rreply='"+r.id+"' title='Javob yozish'><span data-icon='send'></span></button>"+
    "<button class='mini del' data-rdel='"+r.id+"'><span data-icon='trash'></span></button></div></td></tr>";
  }).join("")||"<tr><td colspan='6' style='text-align:center;color:var(--muted);padding:30px'>Hozircha sharh yo'q</td></tr>";
  paintIcons($("#reviewsBody"));
}

let replyingRev=null;
function openReviewReply(id){
  replyingLead=null;
  replyingRev=REVIEWS.find(x=>x.id===id);
  if(!replyingRev)return;
  const p=PRODUCTS.find(x=>x.id==replyingRev.pid);
  $("#rWho").innerHTML="<b style='color:var(--text)'>"+esc(replyingRev.name)+"</b> • "+esc(p?p.name:("Mahsulot #"+replyingRev.pid))+"<br>Sharh: "+esc(replyingRev.t);
  $("#rTxt").value=replyingRev.reply||"";
  $("#rOverlay").classList.add("show");
}

function openProdForm(p){
  editingImg=p&&p.img||"";editingVid=p&&p.video||"";
  const f=$("#pForm");
  f.reset();
  f.querySelector("[name=id]").value=p?p.id:"";
  f.querySelector("[name=name]").value=p?p.name:"";
  f.querySelector("[name=sub]").value=p?(p.sub||""):"";
  f.querySelector("[name=spec]").value=p?(p.spec||""):"";
  f.querySelector("[name=price]").value=p?p.price:"";
  f.querySelector("[name=oldPrice]").value=p&&p.oldPrice?p.oldPrice:"";
  f.querySelector("[name=badge]").value=p&&p.badge?p.badge:"";
  f.querySelector("[name=desc]").value=p?(p.desc||""):"";
  const hue=p?p.hue:210;
  f.querySelector("[name=hue]").value=hue;
  document.getElementById("pfHueVal").textContent=hue;
  f.querySelector("[name=cat]").value=p?p.cat:"kompyuter";
  $("#pTitle").textContent=p?("Mahsulotni tahrirlash #"+p.id):"Mahsulot qo'shish";
  drawPreviews();
  $("#pOverlay").classList.add("show");
}
function drawPreviews(){
  const ip=$("#imgPrev"),vp=$("#vidPrev");
  ip.innerHTML=editingImg?"<div class='mp'><img src='"+editingImg+"'><button type='button' class='mp-x' id='imgX'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5'><line x1='18' y1='6' x2='6' y2='18'/><line x1='6' y1='6' x2='18' y2='18'/></svg></button><small>Joriy rasm</small></div>":"<span class='hint'>Rasm tanlanmagan — SVG avtomatik chiziladi</span>";
  vp.innerHTML=editingVid?"<div class='mp' style='width:200px'><video src='"+editingVid+"' muted></video><button type='button' class='mp-x' id='vidX'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5'><line x1='18' y1='6' x2='6' y2='18'/><line x1='6' y1='6' x2='18' y2='18'/></svg></button><small>Joriy video</small></div>":"<span class='hint'>Video yo'q (ixtiyoriy)</span>";
  const ix=$("#imgX");if(ix)ix.onclick=()=>{editingImg="";drawPreviews();};
  const vx=$("#vidX");if(vx)vx.onclick=()=>{editingVid="";drawPreviews();};
}
function resizeImage(file){
  return new Promise(res=>{
    const rd=new FileReader();
    rd.onload=e=>{
      const img=new Image();
      img.onload=()=>{
        const MAX=900;
        let w=img.width,h=img.height;
        if(w>MAX){h=Math.round(h*MAX/w);w=MAX;}
        const c=document.createElement("canvas");
        c.width=w;c.height=h;
        c.getContext("2d").drawImage(img,0,0,w,h);
        res(c.toDataURL("image/jpeg",.85));
      };
      img.src=e.target.result;
    };
    rd.readAsDataURL(file);
  });
}

(async function init(){
  paintIcons(document.body);

  $("#gateForm").addEventListener("submit",async e=>{
    e.preventDefault();
    const r=await sb.auth.signInWithPassword({email:$("#gateEmail").value.trim(),password:$("#gatePass").value});
    $("#gatePass").value="";
    if(r.error){toast("Email yoki parol xato!",true);return;}
    if(await checkGate())await loadAll();
  });
  $("#logoutBtn").onclick=async()=>{await sb.auth.signOut();location.reload();};

  if(await checkGate())await loadAll();

  $$(".ad-tab[data-tab]").forEach(b=>b.onclick=()=>{
    $$(".ad-tab[data-tab]").forEach(x=>x.classList.toggle("on",x===b));
    ["dash","prods","orders","leads","reviews","mus"].forEach(t=>$("#tab-"+t)&&$("#tab-"+t).classList.toggle("hide",t!==b.dataset.tab));
    if(b.dataset.tab!=="mus"&&MUSX.playingId){MUSX.stopPreview();renderMus();}
  });
  $("#refreshBtn").onclick=async()=>{await loadAll();toast("Ma'lumotlar yangilandi");};

  $("#addProdBtn").onclick=()=>openProdForm(null);
  $("#pX").onclick=()=>$("#pOverlay").classList.remove("show");
  $("#pOverlay").addEventListener("click",e=>{if(e.target.id==="pOverlay")$("#pOverlay").classList.remove("show")});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#pOverlay").classList.remove("show")});

  $("#pfCat").innerHTML=Object.keys(CATS).map(c=>"<option value='"+c+"'>"+CATS[c]+"</option>").join("");
  $("#imgZone").onclick=()=>$("#imgFile").click();
  $("#vidZone").onclick=()=>$("#vidFile").click();
  $("#imgFile").addEventListener("change",async e=>{
    if(e.target.files[0]){editingImg=await resizeImage(e.target.files[0]);drawPreviews();}
    e.target.value="";
  });
  $("#vidFile").addEventListener("change",e=>{
    const f=e.target.files[0];
    if(f){
      if(f.size>10*1024*1024){toast("Video juda katta (10MB dan oshdi)!",true);return;}
      const rd=new FileReader();
      rd.onload=x=>{editingVid=x.target.result;drawPreviews();};
      rd.readAsDataURL(f);
    }
    e.target.value="";
  });

  $("#pForm").addEventListener("submit",async e=>{
    e.preventDefault();
    const fd=new FormData(e.target),idRaw=fd.get("id");
    let p;
    if(idRaw){p=PRODUCTS.find(x=>x.id==idRaw);}
    else{p={id:Math.max(...PRODUCTS.map(x=>x.id))+1};PRODUCTS.push(p);}
    p.name=fd.get("name").trim();
    p.cat=fd.get("cat");
    p.sub=fd.get("sub").trim()||CATS[p.cat];
    p.spec=fd.get("spec").trim()||"";
    p.price=+fd.get("price")||0;
    p.oldPrice=+fd.get("oldPrice")||null;
    p.badge=fd.get("badge")||"";
    p.hue=+fd.get("hue")||210;
    p.desc=fd.get("desc").trim()||"";
    p.kind=p.kind||(p.cat==="kompyuter"?"pc":p.cat==="noutbuk"?"laptop":p.cat==="monitor"?"monitor":p.cat==="komponent"?"cpu":p.cat==="ofis"?"printer":"mouse");
    try{
      p.img=await uploadMedia(editingImg,"img");
      p.video=await uploadMedia(editingVid,"vid");
      await productPut(p);
    }catch(err){
      console.error(err);
      if(!idRaw)PRODUCTS=PRODUCTS.filter(x=>x!==p);
      toast("Saqlashda xatolik: "+(err.message||err),true);
      return;
    }
    $("#pOverlay").classList.remove("show");
    toast(idRaw?"Mahsulot yangilandi":"Mahsulot qo'shildi");
    renderStats();renderProds();
  });

  document.addEventListener("click",async e=>{
    const tp=e.target.closest("[data-tplay]");
    if(tp){MUSX.preview(tp.dataset.tplay);renderMus();return;}
    const tsel=e.target.closest("[data-tsel]");
    if(tsel){
      MUSX.set(tsel.dataset.tsel);
      const tr=MUSX.tracks.find(x=>x.id===tsel.dataset.tsel);
      toast("Sayt musiqa: "+tr.name);
      renderMus();
      return;
    }
    const ed=e.target.closest("[data-edit]");
    if(ed){openProdForm(PRODUCTS.find(x=>x.id==ed.dataset.edit));return;}
    const pd=e.target.closest("[data-pdel]");
    if(pd){
      if(confirm("Rostdan ham o'chirilsinmi?")){
        await productDel(+pd.dataset.pdel);
        PRODUCTS=PRODUCTS.filter(x=>x.id!=pd.dataset.pdel);
        toast("Mahsulot o'chirildi");renderStats();renderProds();
      }
      return;
    }
    const od=e.target.closest("[data-odel]");
    if(od){
      if(confirm("Buyurtma o'chirilsinmi?")){
        await orderDel(od.dataset.odel);
        ORDERS=ORDERS.filter(x=>x.id!==od.dataset.odel);
        toast("Buyurtma o'chirildi");renderStats();renderOrders();
      }
      return;
    }
    const ld=e.target.closest("[data-ldel]");
    if(ld){
      if(confirm("Murojaat o'chirilsinmi?")){
        await leadDel(ld.dataset.ldel);
        LEADS=LEADS.filter(x=>x.id!==ld.dataset.ldel);
        toast("Murojaat o'chirildi");renderLeads();
      }
      return;
    }
    const lr=e.target.closest("[data-lreply]");
    if(lr){openReply(lr.dataset.lreply);return;}
    const rr=e.target.closest("[data-rreply]");
    if(rr){openReviewReply(rr.dataset.rreply);return;}
    const rd=e.target.closest("[data-rdel]");
    if(rd){
      if(confirm("Sharh o'chirilsinmi?")){
        await reviewDel(rd.dataset.rdel);
        REVIEWS=REVIEWS.filter(x=>x.id!==rd.dataset.rdel);
        toast("Sharh o'chirildi");renderReviews();
      }
      return;
    }
  });
  $("#rX").onclick=$("#rCancel").onclick=()=>{$("#rOverlay").classList.remove("show");replyingLead=null;replyingRev=null;};
  $("#rSave").onclick=async()=>{
    const txt=$("#rTxt").value.trim();
    if(!txt){toast("Javob matnini yozing!",true);return;}
    if(replyingRev){
      replyingRev.reply=txt;
      replyingRev.replyDate=Date.now();
      await reviewPut({...replyingRev});
      toast("Sharhga javob saqlandi ✓");
      replyingRev=null;
      renderReviews();
    }else if(replyingLead){
      replyingLead.reply=txt;
      replyingLead.replyDate=Date.now();
      replyingLead.seen=true;
      await leadPut({...replyingLead});
      toast("Javob saqlandi — mijoz saytdan ko'radi ✓");
      replyingLead=null;
      renderLeads();
      renderStats();
    }
    $("#rOverlay").classList.remove("show");
  };

  document.addEventListener("change",async e=>{
    const st=e.target.closest("[data-status]");
    if(st){
      const o=ORDERS.find(x=>x.id===st.dataset.status);
      if(o){o.status=st.value;await orderSetStatus(o.id,o.status);toast("Holat: "+o.status);renderStats();renderOrders();}
    }
  });
})();

window.addEventListener("unhandledrejection",e=>{console.error(e.reason);toast("Xatolik: "+((e.reason&&e.reason.message)||e.reason),true);});
