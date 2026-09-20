function openDB(){
  return new Promise((res,rej)=>{
    const rq=indexedDB.open("texnobozor",3);
    rq.onupgradeneeded=e=>{
      const db=e.target.result;
      if(!db.objectStoreNames.contains("kv")) db.createObjectStore("kv",{keyPath:"k"});
      if(!db.objectStoreNames.contains("orders")) db.createObjectStore("orders",{keyPath:"id"});
      if(!db.objectStoreNames.contains("leads")) db.createObjectStore("leads",{keyPath:"id"});
      if(!db.objectStoreNames.contains("reviews")) db.createObjectStore("reviews",{keyPath:"id"});
    };
    rq.onsuccess=()=>res(rq.result);
    rq.onerror=()=>rej(rq.error);
  });
}
function tx(store,mode){return openDB().then(db=>new Promise((res,rej)=>{
  const t=db.transaction(store,mode).objectStore(store);
  res({t,done:new Promise((ok,bad)=>{t.transaction.oncomplete=ok;t.onerror=bad;})});
}));}
function reqWrap(r){return new Promise((res,rej)=>{r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}

async function kvGet(k){
  const {t}=await tx("kv","readonly");
  const row=await reqWrap(t.get(k));
  return row?row.v:null;
}
async function kvSet(k,v){
  const {t,done}=await tx("kv","readwrite");
  t.put({k,v});
  await done;
}
const CATALOG_VER=2;
async function getProducts(){
  let p=await kvGet("products");
  const ver=await kvGet("pver");
  if(!p||!p.length){
    p=DEFAULT_PRODUCTS.map(x=>Object.assign({img:"",video:"",desc:""},x));
    await kvSet("products",p);
    await kvSet("pver",CATALOG_VER);
    return p;
  }
  if(ver!==CATALOG_VER){
    DEFAULT_PRODUCTS.forEach(d=>{
      if(!p.some(x=>x.id===d.id))p.push(Object.assign({img:"",video:"",desc:""},d));
    });
    p.sort((a,b)=>a.id-b.id);
    await kvSet("products",p);
    await kvSet("pver",CATALOG_VER);
  }
  return p;
}
async function saveProducts(p){return kvSet("products",p);}
async function orderPut(o){
  const {t,done}=await tx("orders","readwrite");
  t.put(o);
  await done;
}
async function orderAll(){
  const {t}=await tx("orders","readonly");
  const rows=await reqWrap(t.getAll());
  return rows.sort((a,b)=>b.id.localeCompare(a.id));
}
async function orderDel(id){
  const {t,done}=await tx("orders","readwrite");
  t.delete(id);
  await done;
}
async function leadPut(o){
  const {t,done}=await tx("leads","readwrite");
  t.put(o);
  await done;
}
async function leadAll(){
  const {t}=await tx("leads","readonly");
  const rows=await reqWrap(t.getAll());
  return rows.sort((a,b)=>b.id.localeCompare(a.id));
}
async function leadDel(id){
  const {t,done}=await tx("leads","readwrite");
  t.delete(id);
  await done;
}
async function reviewAll(){
  const {t}=await tx("reviews","readonly");
  const rows=await reqWrap(t.getAll());
  return rows.sort((a,b)=>b.id.localeCompare(a.id));
}
async function reviewPut(o){
  const {t,done}=await tx("reviews","readwrite");
  t.put(o);
  await done;
}
async function reviewDel(id){
  const {t,done}=await tx("reviews","readwrite");
  t.delete(id);
  await done;
}

