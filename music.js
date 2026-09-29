const TRACKS=[
{id:"lofi",name:"Lo-Fi Bozor",desc:"Iliq jazzy akkordlar • vinil chaqnash • tinch kayfiyat",bpm:76,chords:[[53,57,60,64],[52,55,59,62],[50,53,57,60],[48,52,55,59]],bass:[41,40,38,36],mel:{0:76,6:72,8:71,12:74,16:69,20:74,24:76,28:79},lead:"bell",dr:{k:[0,4],sn:[2,6],hat:1,lv:1},crackle:1},
{id:"neon",name:"Neon Drive",desc:"Synthwave retro elektro • tungi shahar energiyasi",bpm:108,chords:[[57,60,64,67],[53,57,60,65],[48,52,55,59],[55,59,62,64]],bass:[45,41,36,43],mel:{0:81,4:79,8:76,12:79,16:81,20:84,24:79,26:76,28:72},lead:"saw",dr:{k:[0,2,4,6],sn:[2,6],hat:1,lv:1.05}},
{id:"epic",name:"Epik Kino",desc:"Kinematik padlar • prestij va qudrat • chuqur baraban",bpm:66,chords:[[50,53,57,62],[46,50,53,58],[41,45,48,53],[43,47,50,55]],bass:[38,46,41,36],mel:{0:74,8:77,16:72,24:79},lead:"soft",amb:1,boom:1},
{id:"jazz",name:"Jazz Kafe",desc:"Silliq swing • yuruvchi bas • ertalabki kafe muhiti",bpm:96,chords:[[50,53,57,60],[43,47,50,53],[48,52,55,59],[45,49,52,55]],bass:[38,43,36,45],walk:1,swing:1,mel:{2:76,6:74,10:72,14:69,18:71,22:67,26:74,30:72},lead:"soft",dr:{k:[0,4],sn:[2,6],hat:1,lv:.8},crackle:1},
{id:"space",name:"Chuqur Kosmos",desc:"Ambient meditatsiya • keng padlar • cheksiz fazo nafasi",bpm:56,chords:[[48,52,55,59,62],[45,52,57,60,64],[41,48,53,57,60],[43,50,55,59,62]],bass:[36,45,41,43],mel:{0:88,16:84,24:86},lead:"bell",amb:1},
{id:"anthem",name:"TexnoBozor Gimni",desc:"Yorqin va ilhomlantiruvchi • brend energiyasi",bpm:102,chords:[[48,52,55,59],[43,47,50,55],[45,48,52,57],[41,45,48,53]],bass:[36,43,45,41],mel:{0:72,2:76,4:79,8:76,10:72,12:74,16:69,18:72,20:76,24:74,26:72,28:67},lead:"pluck",dr:{k:[0,2,4],sn:[2,6],hat:1,lv:1}},
{id:"tropic",name:"Yoz Tropicali",desc:"Tropik house • dam olish, yozgi kayfiyat • marimba ohangi",bpm:100,chords:[[48,52,55,59],[55,59,62,66],[45,52,57,60],[41,48,53,57]],bass:[36,43,45,41],mel:{0:76,4:79,8:76,12:74,16:76,20:79,24:81,28:79},lead:"pluck",arp:1,off:1,shk:1,dr:{k:[0,4],sn:[2,6],hat:1,lv:.9}},
{id:"ballad",name:"Romantik Kechalar",desc:"Piano balada • stringlar • sevimli jonli ohang",bpm:72,chords:[[45,52,57,60],[41,48,53,57],[48,55,60,64],[43,47,50,55]],bass:[33,29,36,31],sub:1,mel:{0:76,4:72,8:69,14:72,16:71,22:67,24:74,30:76},lead:"bell",dr:null},
{id:"fest",name:"Festival Energiasi",desc:"EDM • katta sahna energiyasi • yoshlar sevimlisi",bpm:128,chords:[[57,60,64,67],[53,57,60,65],[48,52,55,59],[55,59,62,66]],bass:[45,41,36,43],mel:{0:76,2:79,4:81,8:79,10:76,12:74,16:72,18:76,20:79,24:81,26:79,28:76},lead:"saw",dr:{k:[0,2,4,6],sn:[2,6],hat:1,lv:1.15}},
{id:"sharq",name:"Sharq Nafasi",desc:"Milliy rangdor ohang • dutor uslubidagi chertish • Sharq ruhi",bpm:90,chords:[[50,53,57,62],[43,46,50,55],[45,49,52,55],[50,53,57,60]],bass:[38,43,45,38],mel:{0:74,2:75,4:78,6:81,8:79,12:78,16:74,18:75,20:78,24:81,28:82,30:81},lead:"pluck",dr:{k:[0,4],sn:[3,6],hat:1,lv:.95}},
{id:"corp",name:"Premium Korporativ",desc:"Reklama roliklari uslubi • ishonch va muvaffaqiyat",bpm:110,chords:[[50,54,57,61],[45,49,52,57],[47,51,54,57],[43,47,50,54]],bass:[38,45,47,43],arp:1,shk:1,mel:{0:78,8:81,16:83,20:78,24:74,28:71},lead:"bell",dr:{k:[0,4],sn:[2,6],hat:1,lv:.85}},
{id:"jazzhop",name:"Neon Jazz Hop",desc:"Chillhop • chuqur bas • zamonaviy trend musiqa",bpm:84,chords:[[52,55,59,62],[45,49,52,58],[50,54,57,61],[43,47,50,55]],bass:[28,33,38,31],sub:1,swing:1,mel:{0:79,4:76,8:74,14:71,16:78,22:74,24:73,28:71},lead:"soft",dr:{k:[0,4],sn:[2,6],hat:1,lv:.85},crackle:1}
];
let AC=null,MU={on:false,t:null,st:0,nx:0,tr:null,master:null,din:null,dl:null,fb:null,wet:null,noise:null};
const mf=n=>440*Math.pow(2,(n-69)/12);
function MSP(tr){return 60/tr.bpm/2;}
function mEnv(g,t,a,d,p){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(p,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+d);}
function mTone(t,f,d,type,p,cut,det,wet,atk){
  const o=AC.createOscillator(),g=AC.createGain();
  o.type=type;o.frequency.value=f;
  if(det)o.detune.value=det;
  let n=o;
  if(cut){const fl=AC.createBiquadFilter();fl.type="lowpass";fl.frequency.value=cut;o.connect(fl);n=fl;}
  n.connect(g);g.connect(MU.master);
  if(wet&&MU.din)g.connect(MU.din);
  mEnv(g,t,atk||.012,d,p);
  o.start(t);o.stop(t+d+.06);
}
function mNoiseHit(t,d,p,type,fq){
  const s=AC.createBufferSource(),g=AC.createGain(),f=AC.createBiquadFilter();
  s.buffer=MU.noise;s.loop=true;s.playbackRate.value=.8+Math.random()*.4;
  f.type=type;f.frequency.value=fq;
  s.connect(f);f.connect(g);g.connect(MU.master);
  mEnv(g,t,.002,d,p);
  s.start(t);s.stop(t+d+.05);
}
function mKick(t,f1,f2,d,p){
  const o=AC.createOscillator(),g=AC.createGain();
  o.type="sine";
  o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(f2,t+d*.85);
  g.connect(MU.master);mEnv(g,t,.004,d,p);
  o.connect(g);o.start(t);o.stop(t+d+.04);
}
function mLead(t,n,tr){
  const f=mf(n);
  if(tr.lead==="bell"){
    mTone(t,f,.9,"sine",.115,0,0,true);
    mTone(t,f*2,.5,"sine",.038,0,0,true);
    mTone(t,f*3.01,.25,"sine",.012,0,0,true);
  }else if(tr.lead==="saw"){
    mTone(t,f,.42,"sawtooth",.075,2600,-5,true);
    mTone(t,f,.42,"square",.028,1700,7,true);
  }else if(tr.lead==="soft"){
    mTone(t,f,.75,"triangle",.12,1500,0,true);
    mTone(t,f*2,.32,"sine",.03,0,0,true);
  }else{
    mTone(t,f,.55,"triangle",.11,2300,0,true);
    mTone(t,f,.28,"sine",.05,0,0,true);
  }
}
function mStep(s){
  const tr=MU.tr,NB=tr.chords.length,bar=(s>>3)%NB,i=s&7,ch=tr.chords[bar];
  let t=MU.nx;
  if(tr.swing&&(s&1))t+=MSP(tr)*.17;
  const long=tr.amb?MSP(tr)*16:MSP(tr)*7.4;
  if(tr.sub){
    if(i===0)mTone(t,mf(tr.bass[bar]-12),long,"sine",.27,0,0,false);
  }else if(i===0&&!tr.walk)mTone(t,mf(tr.bass[bar]),long,"triangle",.24,320,0,false);
  ch.forEach((n,k)=>{
    mTone(t,mf(n),long,"triangle",.04,850,k%2?-6:6,false,tr.amb?.6:.03);
    mTone(t,mf(n),long,"sawtooth",tr.amb?.02:.013,650,k%2?8:-8,false,tr.amb?.9:.05);
  });
  if(tr.walk&&i%2===0){
    const seq=[ch[0]-12,ch[1]-12,ch[2]-12,ch[0]-5];
    mTone(t,mf(seq[i>>1]),MSP(tr)*1.9,"triangle",.19,420,0,false);
  }
  if(tr.off&&(i&1))mTone(t,mf(tr.bass[bar]),MSP(tr)*.85,"triangle",.16,380,0,false);
  if(tr.arp){
    const ai=[0,1,2,3,2,1][s%6]%ch.length;
    mTone(t,mf(ch[ai]+12),MSP(tr)*1.05,"triangle",.05,2400,Math.random()*6-3,true);
  }
  if(tr.shk)mNoiseHit(t,.02,(i&1)?.007:.013,"highpass",9500);
  if(i===0&&tr.boom)mKick(t,85,28,.5,.5);
  const d=tr.dr;
  if(d){
    if(d.k.includes(i))mKick(t,tr.id==="neon"?120:110,42,.13,(tr.id==="neon"?.3:.4)*d.lv);
    if(d.sn&&d.sn.includes(i))mNoiseHit(t,.09,(tr.id==="neon"?.03:.045)*d.lv,"bandpass",1900);
    if(d.hat&&(i&1))mNoiseHit(t,.035,(i%4===3?.026:.015)*d.lv,"highpass",8200);
  }
  if(tr.crackle&&Math.random()<.05)mNoiseHit(t,.012,.02,"highpass",5200);
  const mn=(tr.mel||{})[s%32];
  if(mn!==undefined&&Math.random()<.94)mLead(t+(Math.random()*.014-.007),mn,tr);
}
function mTick(){
  while(MU.nx<AC.currentTime+.16){
    mStep(MU.st);
    MU.st++;
    MU.nx+=MSP(MU.tr);
  }
  MU.t=setTimeout(mTick,40);
}
function ensureAudio(){
  if(AC)return AC.resume();
  AC=new(window.AudioContext||window.webkitAudioContext)();
  const comp=AC.createDynamicsCompressor();
  comp.threshold.value=-20;comp.ratio.value=4;
  comp.connect(AC.destination);
  MU.master=AC.createGain();MU.master.gain.value=.85;
  MU.master.connect(comp);
  MU.din=AC.createGain();
  MU.dl=AC.createDelay(2);
  MU.fb=AC.createGain();MU.wet=AC.createGain();
  const df=AC.createBiquadFilter();
  df.type="lowpass";df.frequency.value=2300;
  MU.din.connect(MU.dl);
  MU.dl.connect(df);
  df.connect(MU.fb);MU.fb.connect(MU.dl);
  df.connect(MU.wet);MU.wet.connect(MU.master);
  const b=AC.createBuffer(1,Math.floor(AC.sampleRate*.3),AC.sampleRate),c=b.getChannelData(0);
  for(let j=0;j<c.length;j++)c[j]=Math.random()*2-1;
  MU.noise=b;
}
function tuneDelay(tr){
  if(!MU.dl)return;
  const s=MSP(tr);
  MU.dl.delayTime.value=s*(tr.amb?3:1.5);
  MU.fb.gain.value=tr.amb?.46:(tr.id==="neon"?.4:.34);
  MU.wet.gain.value=tr.amb?.4:(tr.id==="neon"?.36:.3);
}
function getTrk(){return TRACKS.find(x=>x.id===getSel())||TRACKS[0];}
function getSel(){return localStorage.getItem("tb_track")||"lofi";}
function startTrk(tr){
  ensureAudio();tuneDelay(tr);
  clearTimeout(MU.t);
  MU.tr=tr;MU.st=0;MU.nx=AC.currentTime+.08;
  MU.on=true;mTick();
}
function stopSched(){clearTimeout(MU.t);MU.on=false;}
function toggleMusic(){
  ensureAudio();
  if(MU.on){
    stopSched();
    document.body.classList.remove("music-on");
    if(typeof toast==="function")toast("Musiqani o'chirildi");
  }else{
    const tr=getTrk();
    startTrk(tr);
    document.body.classList.add("music-on");
    if(typeof toast==="function")toast("♪ "+tr.name);
  }
}
const MUSX={
  tracks:TRACKS,
  cur:getSel,
  set(id){localStorage.setItem("tb_track",id);if(typeof settingSet==="function")settingSet("track",id);},
  playingId:null,
  preview(id){
    if(this.playingId===id){this.stopPreview();return;}
    const tr=TRACKS.find(x=>x.id===id);
    if(!tr)return;
    startTrk(tr);
    this.playingId=id;
  },
  stopPreview(){stopSched();this.playingId=null;}
};
const _mbtn=document.getElementById("musicBtn");
if(_mbtn)_mbtn.onclick=toggleMusic;
