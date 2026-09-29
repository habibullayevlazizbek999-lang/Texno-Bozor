/* TexnoBozor — ma'lumotlar qatlami (Supabase).
   Oldin IndexedDB edi (faqat bitta brauzerda). Endi hamma narsa umumiy bazada. */
if(typeof supabase==="undefined")throw new Error("Supabase kutubxonasi yuklanmadi (index.html/admin.html ichidagi <script> tekshiring)");
if(typeof SUPABASE_URL==="undefined"||SUPABASE_URL.indexOf("XXXX")>-1)console.warn("config.js ichiga Supabase URL va kalitni yozing!");
const sb=supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

function need(res){if(res.error)throw res.error;return res.data;}

/* ---------- Mahsulotlar ---------- */
const PROD_DEF={img:"",video:"",desc:""};
async function getProducts(){
  const res=await sb.from("products").select("id,data").order("id");
  if(res.error||!res.data||!res.data.length){
    // baza hali bo'sh (yoki tarmoq xatosi) — standart ro'yxatni ko'rsatamiz
    return DEFAULT_PRODUCTS.map(x=>Object.assign({},PROD_DEF,x));
  }
  return res.data.map(r=>Object.assign({},PROD_DEF,r.data,{id:r.id}));
}
async function productPut(p){need(await sb.from("products").upsert({id:p.id,data:p}));}
async function productDel(id){need(await sb.from("products").delete().eq("id",id));}
// Admin birinchi kirganda, baza bo'sh bo'lsa data.js dagi standart mahsulotlarni yuklaydi
async function productsSeedIfEmpty(){
  const res=await sb.from("products").select("id",{count:"exact",head:true});
  if(res.error)throw res.error;
  if(res.count===0){
    need(await sb.from("products").upsert(DEFAULT_PRODUCTS.map(p=>({id:p.id,data:Object.assign({},PROD_DEF,p)}))));
  }
}

/* ---------- Rasm / video (Supabase Storage) ---------- */
async function uploadMedia(v,kind){
  if(!v||v.indexOf("data:")!==0)return v||"";           // allaqachon havola yoki bo'sh
  const blob=await (await fetch(v)).blob();
  const ext=((blob.type.split("/")[1]||"bin").split("+")[0]);
  const path=kind+"/"+Date.now()+"-"+Math.random().toString(36).slice(2,8)+"."+ext;
  need(await sb.storage.from("media").upload(path,blob,{contentType:blob.type,cacheControl:"31536000"}));
  return sb.storage.from("media").getPublicUrl(path).data.publicUrl;
}

/* ---------- Buyurtmalar ---------- */
// Mijoz: narxlarni server o'zi hisoblaydi (mijoz narxni o'zgartira olmaydi)
async function placeOrder(o){
  const data=need(await sb.rpc("place_order",{
    p_name:o.name,p_surname:o.surname,p_phone:o.phone,p_region:o.region,
    p_address:o.address||"",p_pay:o.pay,
    p_items:o.items.map(i=>({id:i.id,qty:i.qty}))
  }));
  return data; // {id, total}
}
// Admin
async function orderAll(){return need(await sb.from("orders").select("*").order("date",{ascending:false}));}
async function orderSetStatus(id,status){need(await sb.from("orders").update({status}).eq("id",id));}
async function orderDel(id){need(await sb.from("orders").delete().eq("id",id));}

/* ---------- Konsultatsiya arizalari ---------- */
const leadFrom=r=>({id:r.id,code:r.code,name:r.name,phone:r.phone,msg:r.msg||"",reply:r.reply||"",replyDate:r.reply_date,date:r.date,seen:!!r.seen});
const leadTo=l=>({id:l.id,code:l.code,name:l.name,phone:l.phone,msg:l.msg||"",reply:l.reply||null,reply_date:l.replyDate||null,date:l.date,seen:!!l.seen});
// Mijoz: yangi ariza yuboradi (o'qiy olmaydi)
async function leadAdd(l){need(await sb.from("leads").insert(leadTo(l)));}
// Mijoz: telefon + kod bilan faqat o'z javobini ko'radi
async function leadCheck(phone,code){return need(await sb.rpc("check_lead",{p_phone:phone,p_code:code}));}
// Admin
async function leadAll(){return need(await sb.from("leads").select("*").order("date",{ascending:false})).map(leadFrom);}
async function leadPut(l){need(await sb.from("leads").upsert(leadTo(l)));}
async function leadDel(id){need(await sb.from("leads").delete().eq("id",id));}

/* ---------- Sharhlar ---------- */
const revFrom=r=>({id:r.id,pid:r.pid,name:r.name,r:r.r,t:r.t,date:r.date,user:r.is_user,seed:r.seed,reply:r.reply||"",replyDate:r.reply_date});
const revTo=r=>({id:r.id,pid:r.pid,name:r.name,r:r.r,t:r.t,date:r.date||Date.now(),is_user:!!r.user,seed:!!r.seed,reply:r.reply||null,reply_date:r.replyDate||null});
async function reviewAll(){return need(await sb.from("reviews").select("*").order("date",{ascending:false})).map(revFrom);}
async function reviewAdd(r){need(await sb.from("reviews").insert(revTo(r)));}   // mijoz
async function reviewPut(r){need(await sb.from("reviews").upsert(revTo(r)));}   // admin (javob)
async function reviewDel(id){need(await sb.from("reviews").delete().eq("id",id));}

/* ---------- Sozlamalar (masalan, sayt musiqasi) ---------- */
async function syncSettings(){
  try{
    const res=await sb.from("settings").select("key,value");
    (res.data||[]).forEach(r=>{if(r.key==="track")localStorage.setItem("tb_track",r.value);});
  }catch(e){}
}
async function settingSet(key,value){need(await sb.from("settings").upsert({key,value}));}
