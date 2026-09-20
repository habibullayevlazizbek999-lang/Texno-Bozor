const CATS={kompyuter:"Kompyuterlar",noutbuk:"Noutbuklar",monitor:"Monitorlar",komponent:"Komponentlar",aksessuar:"Aksessuarlar",ofis:"Ofis texnikasi"};
const VILS=["Toshkent shahri","Toshkent viloyati","Andijon","Buxoro","Farg'ona","Jizzax","Xorazm","Namangan","Navoiy","Qashqadaryo","Qoraqalpog'iston R.","Samarqand","Sirdaryo","Surxondaryo"];

function formatSum(n){return n.toLocaleString("ru-RU")+" so'm";}

const DEFAULT_PRODUCTS=[
{id:1,name:"PC Gamer Pro RGB",cat:"kompyuter",sub:"Yig'ilgan PC",spec:"i7-13700K вЂў RTX 4070 вЂў 32GB вЂў 1TB SSD",price:21500000,oldPrice:23900000,hue:222,kind:"pc",badge:"TOP"},
{id:2,name:"Ofis kompyuteri Start",cat:"kompyuter",sub:"Yig'ilgan PC",spec:"i5-12400 вЂў 16GB вЂў 512GB SSD",price:6500000,hue:210,kind:"pc"},
{id:3,name:"Ish stansiyasi Creator",cat:"kompyuter",sub:"Yig'ilgan PC",spec:"Ryzen 9 7950X вЂў RTX 4080 вЂў 64GB вЂў 2TB",price:35000000,hue:260,kind:"case"},
{id:4,name:"O'yin kompyuteri Titan",cat:"kompyuter",sub:"Yig'ilgan PC",spec:"i9-13900F вЂў RTX 4060 Ti вЂў 32GB вЂў 1TB",price:16500000,oldPrice:17900000,hue:200,kind:"pc",badge:"HIT"},
{id:5,name:"Gaming PC Lite",cat:"kompyuter",sub:"Yig'ilgan PC",spec:"Ryzen 5 5600 вЂў GTX 1660 Super вЂў 16GB",price:7900000,hue:190,kind:"case"},
{id:6,name:"Mini PC N100",cat:"kompyuter",sub:"Mini PC",spec:"Intel N100 вЂў 8GB вЂў 256GB SSD",price:3200000,hue:170,kind:"pc",badge:"YANGI"},
{id:7,name:"ASUS Vivobook 15",cat:"noutbuk",sub:"Noutbuk",spec:"i5-1235U вЂў 16GB вЂў 512GB вЂў 15.6\" IPS",price:7500000,hue:262,kind:"laptop"},
{id:8,name:"MacBook Air M2",cat:"noutbuk",sub:"Noutbuk",spec:"M2 вЂў 8GB вЂў 256GB вЂў 13.6\" Retina",price:13500000,oldPrice:14900000,hue:220,kind:"laptop",badge:"HIT"},
{id:9,name:"Lenovo IdeaPad Slim 3",cat:"noutbuk",sub:"Noutbuk",spec:"Ryzen 5 7520U вЂў 16GB вЂў 512GB вЂў 15.6\"",price:6800000,hue:280,kind:"laptop"},
{id:10,name:"Acer Nitro 5",cat:"noutbuk",sub:"O'yin noutbuki",spec:"i7-12650H вЂў RTX 4050 вЂў 144Hz",price:12500000,oldPrice:13700000,hue:355,kind:"laptop",badge:"HIT"},
{id:11,name:"ASUS TUF Gaming A15",cat:"noutbuk",sub:"O'yin noutbuki",spec:"Ryzen 7 вЂў RTX 4060 вЂў 144Hz",price:14900000,hue:145,kind:"laptop"},
{id:12,name:"MacBook Pro 14 M3",cat:"noutbuk",sub:"Noutbuk",spec:"Apple M3 вЂў 16GB вЂў 512GB вЂў XDR",price:24900000,hue:205,kind:"laptop",badge:"YANGI"},
{id:13,name:'Xiaomi A24i 24"',cat:"monitor",sub:"Monitor",spec:"IPS вЂў Full HD вЂў 100Hz",price:1550000,hue:185,kind:"monitor"},
{id:14,name:'Samsung Odyssey G3 24"',cat:"monitor",sub:"Monitor",spec:"VA вЂў FHD вЂў 144Hz вЂў 1ms",price:2400000,hue:200,kind:"monitor"},
{id:15,name:'LG UltraGear 27"',cat:"monitor",sub:"Gaming monitor",spec:"IPS вЂў QHD вЂў 165Hz вЂў G-Sync",price:4300000,oldPrice:4900000,hue:168,kind:"monitor",badge:"TOP"},
{id:16,name:"Dell UltraSharp U2723QE",cat:"monitor",sub:'Monitor 27" 4K',spec:"IPS Black вЂў USB-C hub",price:9800000,hue:210,kind:"monitor"},
{id:17,name:'Samsung Odyssey OLED G8 34"',cat:"monitor",sub:"OLED monitor",spec:"UWQHD вЂў 175Hz вЂў 0.1ms",price:12900000,hue:300,kind:"monitor",badge:"YANGI"},
{id:18,name:"Intel Core i5-13400F",cat:"komponent",sub:"Protsessor",spec:"10 yadro вЂў LGA1700 вЂў Turbo 4.6GHz",price:2350000,oldPrice:2600000,hue:30,kind:"cpu",badge:"TOP"},
{id:19,name:"AMD Ryzen 7 7800X3D",cat:"komponent",sub:"Protsessor",spec:"AM5 вЂў 8 yadro вЂў 96MB cache",price:5400000,hue:350,kind:"cpu"},
{id:20,name:"Intel Core i9-14900K",cat:"komponent",sub:"Protsessor",spec:"24 yadro вЂў Turbo 6GHz",price:8900000,hue:15,kind:"cpu"},
{id:21,name:"GeForce RTX 4060 8GB",cat:"komponent",sub:"Videokarta",spec:"GDDR6 вЂў DLSS 3",price:5100000,oldPrice:5500000,hue:118,kind:"gpu",badge:"HIT"},
{id:22,name:"GeForce RTX 4070 SUPER",cat:"komponent",sub:"Videokarta",spec:"12GB вЂў DLSS 3 вЂў Triple fan",price:10300000,hue:96,kind:"gpu"},
{id:23,name:"GeForce RTX 4090 24GB",cat:"komponent",sub:"Videokarta",spec:"GDDR6X вЂў Flagman",price:28900000,hue:82,kind:"gpu"},
{id:24,name:"MSI PRO B760-P DDR4",cat:"komponent",sub:"Materinskaya plata",spec:"LGA1700 вЂў PCIe 4.0",price:1750000,hue:265,kind:"mobo"},
{id:25,name:"Gigabyte X670E Aorus Elite",cat:"komponent",sub:"Materinskaya plata",spec:"AM5 вЂў DDR5 вЂў PCIe 5.0",price:4200000,hue:240,kind:"mobo"},
{id:26,name:"Kingston Fury Beast 16GB",cat:"komponent",sub:"Operativ xotira",spec:"DDR4 3200MHz вЂў 2x8GB CL16",price:720000,hue:45,kind:"ram"},
{id:27,name:"G.Skill Trident Z5 RGB 32GB",cat:"komponent",sub:"Operativ xotira",spec:"DDR5 6000MHz вЂў 2x16GB CL30",price:1850000,hue:320,kind:"ram",badge:"YANGI"},
{id:28,name:"Samsung 980 PRO 1TB NVMe",cat:"komponent",sub:"SSD",spec:"Gen4 вЂў 7000MB/s o'qish",price:1050000,hue:195,kind:"ssd"},
{id:29,name:"WD Black SN850X 2TB NVMe",cat:"komponent",sub:"SSD",spec:"Gen4 вЂў 7300MB/s",price:2450000,hue:172,kind:"ssd"},
{id:30,name:"Seagate BarraCuda 2TB HDD",cat:"komponent",sub:"Qattiq disk",spec:"7200rpm вЂў 256MB cache",price:890000,hue:205,kind:"hdd"},
{id:31,name:"Corsair RM750e Gold 750W",cat:"komponent",sub:"Quvvat bloki",spec:"80+ Gold вЂў Modular",price:1250000,hue:48,kind:"psu"},
{id:32,name:"Lian Li Lancool 216",cat:"komponent",sub:"Korpus",spec:"Mesh вЂў ATX вЂў 2x160mm fan",price:950000,hue:228,kind:"case"},
{id:33,name:"DeepCool LE520 ARGB 240mm",cat:"komponent",sub:"Suv sovutgich",spec:"AIO вЂў ARGB pompa",price:1650000,oldPrice:1990000,hue:188,kind:"aio",badge:"HIT"},
{id:34,name:"ID-Cooling SE-214-XT",cat:"komponent",sub:"Havo sovutgich",spec:"Tower вЂў 4 heatpipe вЂў PWM",price:420000,hue:210,kind:"cooler-air"},
{id:35,name:"Arctic P12 PWM PST x3",cat:"komponent",sub:"Fanlar",spec:"120mm вЂў ARGB вЂў 3-pack",price:280000,hue:268,kind:"fan"},
{id:36,name:"Arctic MX-4 Termopasta",cat:"komponent",sub:"Termopasta",spec:"4g вЂў 8.5 W/mK",price:85000,hue:205,kind:"paste"},
{id:37,name:"Logitech G502 X Wireless",cat:"aksessuar",sub:"Sichqoncha",spec:"LIGHTSPEED вЂў 25K DPI",price:890000,hue:152,kind:"mouse",badge:"TOP"},
{id:38,name:"Razer DeathAdder V3 Wired",cat:"aksessuar",sub:"Sichqoncha",spec:"30K DPI вЂў 54g",price:750000,hue:338,kind:"mouse"},
{id:39,name:"Keychron K8 Pro TKL",cat:"aksessuar",sub:"Klaviatura",spec:"Mechanical вЂў RGB вЂў Hot-swap",price:620000,oldPrice:780000,hue:128,kind:"keyboard",badge:"HIT"},
{id:40,name:"HyperX Cloud III",cat:"aksessuar",sub:"Quloqchin",spec:"7.1 Surround вЂў Mikrofon",price:1250000,hue:12,kind:"headset"},
{id:41,name:"Logitech C920 HD Pro",cat:"aksessuar",sub:"Veb-kamera",spec:"1080p вЂў Stereo mikrofon",price:320000,hue:198,kind:"webcam"},
{id:42,name:"SanDisk Ultra 128GB Flash",cat:"aksessuar",sub:"USB Flash",spec:"USB 3.2 вЂў 130MB/s",price:100000,hue:52,kind:"flash"},
{id:43,name:"Tashqi HDD 2TB Portativ",cat:"aksessuar",sub:"Tashqi disk",spec:"USB 3.0 вЂў 2.5\" qattiq disk",price:1250000,hue:208,kind:"hdd"},
{id:44,name:"Fifine K669B Mikrofon",cat:"aksessuar",sub:"Mikrofon",spec:"USB kondensator вЂў Stativ",price:620000,hue:288,kind:"mic"},
{id:45,name:"Microlab H21 Bluetooth 2.1",cat:"aksessuar",sub:"Kolonkalar",spec:"Subwoofer вЂў 60W",price:780000,hue:25,kind:"speaker"},
{id:46,name:"Kovrik XXL 900x400mm",cat:"aksessuar",sub:"Kovrik",spec:"Gaming вЂў 4mm qalinlik",price:120000,hue:218,kind:"pad"},
{id:47,name:"TP-Link Archer AX23 Router",cat:"aksessuar",sub:"Router",spec:"Wi-Fi 6 вЂў AX1800",price:590000,hue:162,kind:"router",badge:"YANGI"},
{id:48,name:"Wireless Gamepad Pro",cat:"aksessuar",sub:"Gamepad",spec:"PC/PS вЂў Getarli вЂў USB/BT",price:480000,hue:315,kind:"gamepad"},
{id:49,name:"Epson L3250 MFP 3in1",cat:"ofis",sub:"Purkagichli MFP",spec:"Print+Skaner+Kopiya вЂў Wi-Fi вЂў CISS",price:2450000,oldPrice:2790000,hue:205,kind:"printer",badge:"HIT"},
{id:50,name:"HP LaserJet M141w MFP",cat:"ofis",sub:"Lazerli MFP",spec:"Lazerli вЂў Oq/qora вЂў Wi-Fi вЂў A4",price:2890000,hue:15,kind:"printer"},
{id:51,name:"Canon PIXMA G3430 MFU",cat:"ofis",sub:"Purkagichli MFP",spec:"Rangli вЂў CISS вЂў Wi-Fi вЂў A4",price:2650000,hue:355,kind:"printer"},
{id:52,name:"Xerox Phaser 3020BI",cat:"ofis",sub:"Lazerli printer",spec:"Oq/qora вЂў 20 sah/min вЂў Wi-Fi",price:1890000,hue:190,kind:"printer"},
{id:53,name:"Epson EcoTank L4260",cat:"ofis",sub:"Purkagichli MFP",spec:"EcoTank вЂў Wi-Fi вЂў Avto dupleks",price:3150000,hue:168,kind:"printer",badge:"YANGI"},
{id:54,name:"Canon i-SENSYS LBP246dw",cat:"ofis",sub:"Lazerli printer",spec:"Dupleks вЂў 38 sah/min вЂў Wi-Fi",price:4290000,hue:220,kind:"printer"},
{id:55,name:"ASUS ROG Strix G16",cat:"noutbuk",sub:"O'yin noutbuki",spec:"Ryzen 9 9955HX вЂў RTX 5060 вЂў 165Hz",price:31500000,hue:338,kind:"laptop",badge:"YANGI"},
{id:56,name:"ASUS TUF Gaming A17",cat:"noutbuk",sub:"O'yin noutbuki",spec:"Ryzen 5 7535HS вЂў RTX 4050 вЂў 17.3\" 144Hz",price:15900000,hue:145,kind:"laptop"},
{id:57,name:"ASUS TUF F17 FX707VU",cat:"noutbuk",sub:"O'yin noutbuki",spec:"i7-13620H вЂў RTX 4050 вЂў 17.3\" 144Hz",price:17500000,hue:200,kind:"laptop"},
{id:58,name:"ASUS Vivobook A1502V",cat:"noutbuk",sub:"Noutbuk",spec:"i5-13420H вЂў 16GB вЂў 512GB вЂў Quiet Blue",price:7900000,hue:215,kind:"laptop"},
{id:59,name:"ASUS ExpertBook B1502CB",cat:"noutbuk",sub:"Biznes noutbuk",spec:"i5-1235U вЂў 8GB вЂў 512GB вЂў Iris Xe",price:8500000,hue:230,kind:"laptop"},
{id:60,name:"Redmi Monitor 27 FHD",cat:"monitor",sub:'Monitor 27"',spec:"IPS вЂў Full HD вЂў 100Hz вЂў Eye Care",price:1650000,hue:150,kind:"monitor"},
{id:61,name:'ZIFFLER Z400 27"',cat:"monitor",sub:'Monitor 27"',spec:"IPS вЂў FHD вЂў 75Hz вЂў Frameless",price:1390000,hue:195,kind:"monitor"},
{id:62,name:'Immer G9000 32"',cat:"monitor",sub:"Gaming monitor",spec:"FHD вЂў 165Hz вЂў 1ms вЂў Keng ekran",price:2350000,hue:280,kind:"monitor",badge:"TOP"},
{id:63,name:'Rulls M2942H 29" UltraWide',cat:"monitor",sub:"UltraWide monitor",spec:"2560x1080 вЂў 75Hz вЂў IPS",price:2890000,hue:260,kind:"monitor"},
{id:64,name:"Logitech MX Master 3S",cat:"aksessuar",sub:"Sichqoncha",spec:"Simsiz вЂў 8K DPI вЂў USB-C tez quvvat",price:1250000,hue:222,kind:"mouse",badge:"TOP"},
{id:65,name:"Logitech G203 Lightsync",cat:"aksessuar",sub:"Gaming sichqoncha",spec:"8000 DPI вЂў RGB yorug'lik вЂў Simli",price:290000,hue:330,kind:"mouse"},
{id:66,name:"2E HyperDrive Lite WL RGB",cat:"aksessuar",sub:"Gaming sichqoncha",spec:"Simsiz вЂў RGB вЂў 4800 DPI",price:340000,hue:265,kind:"mouse"},
{id:67,name:"Defender Accura MM-295",cat:"aksessuar",sub:"Simsiz sichqoncha",spec:"1600 DPI вЂў Nano-resiver вЂў Ofis",price:120000,hue:205,kind:"mouse"},
{id:68,name:"Logitech G412 SE TKL",cat:"aksessuar",sub:"Mexanik klaviatura",spec:"Tactile вЂў Alyuminiy panel вЂў LED",price:990000,hue:358,kind:"keyboard"},
{id:69,name:"Logitech G715 Aurora",cat:"aksessuar",sub:"Simsiz klaviatura",spec:"Lightspeed/BT вЂў GX Brown вЂў RGB",price:1890000,hue:300,kind:"keyboard",badge:"YANGI"},
{id:70,name:"HAVIT KB866L Gaming",cat:"aksessuar",sub:"Klaviatura",spec:"Membran вЂў RGB вЂў Suv o'tkazmaydi",price:210000,hue:130,kind:"keyboard"},
{id:71,name:"Logitech MK295 to'plam",cat:"aksessuar",sub:"Klaviatura + sichqoncha",spec:"Simsiz вЂў SilentTouch вЂў 2.4GHz",price:450000,hue:212,kind:"keyboard"}
];

function art(kind,hue){
  const S='fill="rgba(255,255,255,.10)" stroke="rgba(255,255,255,.92)" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"';
  const F='fill="rgba(255,255,255,.85)"';
  const T='fill="none" stroke="rgba(255,255,255,.45)" stroke-width="3.5" stroke-linecap="round"';
  const A='fill="hsl('+hue+',90%,62%)" opacity=".85"';
  let d="";
  if(kind==="pc"){
    d='<rect x="205" y="45" width="110" height="310" rx="16" '+S+'/><line x1="293" y1="60" x2="293" y2="340" '+T+'/><line x1="222" y1="95" x2="270" y2="95" '+T+'/><line x1="222" y1="118" x2="270" y2="118" '+T+'/><line x1="222" y1="141" x2="270" y2="141" '+T+'/><circle cx="230" cy="318" r="7" '+F+'/><rect x="216" y="60" width="8" height="280" rx="4" '+A+'/>';
  }else if(kind==="case"){
    let f="";
    [110,195,280].forEach(y=>{f+='<circle cx="260" cy="'+y+'" r="32" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/><circle cx="260" cy="'+y+'" r="11" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/>';});
    d='<rect x="180" y="38" width="160" height="324" rx="20" '+S+'/><polygon points="196,52 242,52 204,348 182,348" fill="rgba(255,255,255,.07)"/>'+f+'<rect x="192" y="46" width="136" height="8" rx="4" '+A+'/>';
  }else if(kind==="laptop"){
    d='<rect x="150" y="60" width="220" height="160" rx="12" '+S+'/><rect x="162" y="72" width="196" height="136" rx="6" fill="rgba(255,255,255,.07)"/><path d="M120 232 L400 232 L425 288 L95 288 Z" '+S+'/><line x1="150" y1="252" x2="350" y2="252" '+T+'/><line x1="145" y1="266" x2="355" y2="266" '+T+'/><rect x="225" y="272" width="70" height="9" rx="4" fill="rgba(255,255,255,.5)"/><ellipse cx="260" cy="305" rx="140" ry="10" fill="hsl('+hue+',90%,62%)" opacity=".25"/>';
  }else if(kind==="monitor"){
    d='<rect x="100" y="55" width="320" height="200" rx="14" '+S+'/><rect x="112" y="67" width="296" height="176" rx="8" fill="rgba(255,255,255,.07)"/><path d="M235 258 L285 258 L298 308 L222 308 Z" '+S+'/><line x1="185" y1="315" x2="335" y2="315" stroke="rgba(255,255,255,.8)" stroke-width="8" stroke-linecap="round"/><line x1="135" y1="105" x2="205" y2="75" '+T+'/><circle cx="260" cy="250" r="4" '+F+'/>';
  }else if(kind==="cpu"){
    let pins="";
    for(let i=195;i<=325;i+=13){pins+='<line x1="'+i+'" y1="96" x2="'+i+'" y2="110" '+T+'/><line x1="'+i+'" y1="270" x2="'+i+'" y2="284" '+T+'/>';}
    for(let j=125;j<=255;j+=13){pins+='<line x1="166" y1="'+j+'" x2="180" y2="'+j+'" '+T+'/><line x1="340" y1="'+j+'" x2="354" y2="'+j+'" '+T+'/>';}
    d=pins+'<rect x="180" y="110" width="160" height="160" rx="12" '+S+'/><rect x="225" y="145" width="70" height="90" rx="6" fill="hsl('+hue+',90%,62%)" opacity=".55"/><path d="M180 110 L200 110 L180 130 Z" '+F+'/>';
  }else if(kind==="gpu"){
    let fing="";
    for(let x=120;x<=360;x+=24){fing+='<rect x="'+x+'" y="272" width="16" height="14" rx="3" '+A+'/>';}
    d='<rect x="88" y="120" width="344" height="150" rx="14" '+S+'/><circle cx="175" cy="195" r="52" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/><circle cx="175" cy="195" r="16" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/><circle cx="305" cy="195" r="52" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/><circle cx="305" cy="195" r="16" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/><rect x="430" y="132" width="14" height="126" rx="4" '+S+'/><rect x="104" y="104" width="44" height="16" rx="3" '+S+'/>'+fing;
  }else if(kind==="mobo"){
    d='<rect x="120" y="70" width="280" height="260" rx="12" '+S+'/><rect x="165" y="115" width="80" height="80" '+S+'/><rect x="182" y="132" width="46" height="46" '+T+'/><rect x="290" y="100" width="13" height="150" '+S+'/><rect x="310" y="100" width="13" height="150" '+S+'/><rect x="150" y="235" width="150" height="10" rx="4" '+S+'/><rect x="150" y="256" width="110" height="10" rx="4" '+S+'/><rect x="250" y="250" width="40" height="40" rx="6" fill="hsl('+hue+',90%,62%)" opacity=".4"/><rect x="104" y="84" width="16" height="70" rx="4" '+S+'/>';
  }else if(kind==="ram"){
    let chips="",gold="";
    for(let i=0;i<8;i++){chips+='<rect x="'+(116+i*38)+'" y="172" width="30" height="34" rx="4" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.4)" stroke-width="2"/>';}
    for(let x=112;x<=410;x+=22){gold+='<rect x="'+x+'" y="228" width="13" height="14" rx="2" '+A+'/>';}
    d='<rect x="100" y="160" width="320" height="80" rx="10" '+S+'/>'+chips+gold;
  }else if(kind==="ssd"){
    let ch="";
    for(let i=0;i<7;i++){ch+='<rect x="'+(122+i*42)+'" y="184" width="36" height="32" rx="4" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.4)" stroke-width="2"/>';}
    d='<rect x="95" y="170" width="330" height="60" rx="10" '+S+'/>'+ch+'<circle cx="408" cy="200" r="5" '+F+'/><rect x="60" y="185" width="35" height="8" rx="4" '+T+'/>';
  }else if(kind==="hdd"){
    d='<rect x="140" y="110" width="240" height="190" rx="20" '+S+'/><circle cx="245" cy="205" r="58" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/><circle cx="245" cy="205" r="34" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/><line x1="303" y1="163" x2="338" y2="232" '+T+'/><circle cx="158" cy="128" r="5" '+F+'/><circle cx="158" cy="282" r="5" '+F+'/><rect x="372" y="192" width="30" height="22" rx="6" '+S+'/>';
  }else if(kind==="psu"){
    d='<rect x="140" y="110" width="240" height="170" rx="16" '+S+'/><circle cx="212" cy="195" r="52" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/><line x1="176" y1="159" x2="248" y2="231" '+T+'/><line x1="248" y1="159" x2="176" y2="231" '+T+'/><rect x="292" y="132" width="68" height="42" rx="6" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.35)" stroke-width="2"/><path d="M380 160 C420 160 420 200 400 215 C430 225 430 260 395 262" '+T+'/>';
  }else if(kind==="cooler-air"){
    let fins="";
    for(let i=0;i<5;i++){fins+='<rect x="192" y="'+(88+i*27)+'" width="136" height="17" rx="6" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.5)" stroke-width="3"/>';}
    d=fins+'<path d="M215 90 C215 60 260 62 260 90 M305 90 C305 60 350 62 350 90" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="5"/><rect x="235" y="228" width="50" height="44" rx="6" '+S+'/><rect x="205" y="62" width="110" height="14" rx="7" '+A+'/>';
  }else if(kind==="aio"){
    d='<circle cx="185" cy="210" r="55" '+S+'/><circle cx="185" cy="210" r="32" '+T+'/><circle cx="185" cy="210" r="8" '+A+'/><rect x="290" y="120" width="152" height="92" rx="10" '+S+'/><line x1="306" y1="128" x2="306" y2="204" '+T+'/><line x1="326" y1="128" x2="326" y2="204" '+T+'/><line x1="346" y1="128" x2="346" y2="204" '+T+'/><line x1="366" y1="128" x2="366" y2="204" '+T+'/><line x1="386" y1="128" x2="386" y2="204" '+T+'/><path d="M228 185 C260 160 265 150 290 155" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="9" stroke-linecap="round"/><path d="M230 235 C265 250 270 240 290 205" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="9" stroke-linecap="round"/>';
  }else if(kind==="fan"){
    let bl="";
    for(let i=0;i<4;i++){bl+='<ellipse cx="260" cy="115" rx="24" ry="50" transform="rotate('+(i*90)+' 260 160)" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.65)" stroke-width="4"/>';}
    d='<rect x="165" y="65" width="190" height="190" rx="24" '+S+'/>'+bl+'<circle cx="260" cy="160" r="24" '+S+'/><circle cx="182" cy="82" r="4" '+F+'/><circle cx="338" cy="82" r="4" '+F+'/><circle cx="182" cy="238" r="4" '+F+'/><circle cx="338" cy="238" r="4" '+F+'/>';
  }else if(kind==="paste"){
    d='<g transform="rotate(-25 260 210)"><line x1="260" y1="70" x2="260" y2="108" '+T+'/><rect x="218" y="58" width="84" height="13" rx="6" '+S+'/><rect x="230" y="108" width="60" height="170" rx="12" '+S+'/><polygon points="245,278 275,278 260,315" '+S+'/><circle cx="260" cy="330" r="9" fill="hsl('+hue+',90%,62%)"/></g>';
  }else if(kind==="mouse"){
    d='<ellipse cx="260" cy="210" rx="68" ry="92" '+S+'/><line x1="260" y1="118" x2="260" y2="180" '+T+'/><rect x="252" y="148" width="16" height="34" rx="8" fill="rgba(255,255,255,.55)" stroke="rgba(255,255,255,.7)" stroke-width="3"/>';
  }else if(kind==="keyboard"){
    let keys="";
    for(let r=0;r<3;r++){for(let c=0;c<11;c++){keys+='<rect x="'+(102+c*31)+'" y="'+(163+r*28)+'" width="25" height="21" rx="4" fill="rgba(255,255,255,.13)" stroke="rgba(255,255,255,.4)" stroke-width="2"/>';}}
    d='<rect x="80" y="145" width="360" height="135" rx="16" '+S+'/>'+keys+'<rect x="180" y="249" width="160" height="16" rx="4" fill="hsl('+hue+',90%,62%)" opacity=".75"/>';
  }else if(kind==="headset"){
    d='<path d="M140 235 A120 120 0 0 1 380 235" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="12" stroke-linecap="round"/><rect x="112" y="225" width="58" height="98" rx="24" '+S+'/><rect x="350" y="225" width="58" height="98" rx="24" '+S+'/><path d="M142 323 Q175 365 230 352" '+T+'/><circle cx="236" cy="350" r="7" '+F+'/>';
  }else if(kind==="webcam"){
    d='<circle cx="260" cy="170" r="75" '+S+'/><circle cx="260" cy="170" r="46" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/><circle cx="260" cy="170" r="20" fill="hsl('+hue+',90%,62%)" opacity=".7"/><circle cx="318" cy="122" r="5" '+F+'/><rect x="228" y="255" width="64" height="18" rx="9" '+S+'/><line x1="260" y1="273" x2="260" y2="330" '+T+'/><line x1="260" y1="330" x2="215" y2="352" '+T+'/><line x1="260" y1="330" x2="305" y2="352" '+T+'/>';
  }else if(kind==="flash"){
    d='<rect x="233" y="58" width="54" height="44" rx="6" '+S+'/><rect x="243" y="68" width="10" height="10" fill="rgba(255,255,255,.6)"/><rect x="265" y="68" width="10" height="10" fill="rgba(255,255,255,.6)"/><rect x="222" y="102" width="76" height="162" rx="20" '+S+'/><circle cx="260" cy="292" r="13" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="4"/><circle cx="240" cy="130" r="4" fill="hsl('+hue+',90%,62%)"/>';
  }else if(kind==="mic"){
    d='<rect x="227" y="58" width="66" height="152" rx="33" '+S+'/><line x1="237" y1="90" x2="283" y2="90" '+T+'/><line x1="237" y1="115" x2="283" y2="115" '+T+'/><line x1="237" y1="140" x2="283" y2="140" '+T+'/><path d="M206 135 A54 62 0 0 1 314 135" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="5"/><line x1="260" y1="210" x2="260" y2="300" '+T+'/><line x1="260" y1="300" x2="205" y2="345" '+T+'/><line x1="260" y1="300" x2="315" y2="345" '+T+'/><circle cx="260" cy="300" r="8" '+F+'/>';
  }else if(kind==="speaker"){
    d='<rect x="138" y="105" width="92" height="195" rx="14" '+S+'/><rect x="290" y="120" width="92" height="180" rx="14" '+S+'/><circle cx="184" cy="245" r="30" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/><circle cx="184" cy="150" r="11" '+F+'/><circle cx="336" cy="255" r="25" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/><circle cx="336" cy="168" r="10" '+F+'/><line x1="230" y1="300" x2="290" y2="300" '+T+'/>';
  }else if(kind==="pad"){
    d='<path d="M110 155 L410 155 L450 275 L70 275 Z" '+S+'/><path d="M135 178 L388 178 L418 252 L103 252 Z" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-dasharray="10 8"/><circle cx="260" cy="215" r="18" '+A+'/><text x="260" y="222" text-anchor="middle" font-size="18" font-weight="bold" fill="#fff">TB</text>';
  }else if(kind==="router"){
    d='<rect x="130" y="235" width="260" height="70" rx="16" '+S+'/><line x1="165" y1="235" x2="148" y2="150" '+T+'/><circle cx="147" cy="143" r="7" '+F+'/><line x1="355" y1="235" x2="372" y2="150" '+T+'/><circle cx="373" cy="143" r="7" '+F+'/><path d="M215 195 A60 60 0 0 1 305 195" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="6"/><path d="M232 172 A38 38 0 0 1 288 172" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="6"/><circle cx="260" cy="152" r="7" '+A+'/><circle cx="160" cy="268" r="5" '+F+'/><circle cx="180" cy="268" r="5" '+F+'/><circle cx="200" cy="268" r="5" '+F+'/>';
  }else if(kind==="gamepad"){
    d='<rect x="130" y="140" width="260" height="115" rx="55" '+S+'/><circle cx="152" cy="245" r="42" '+S+'/><circle cx="368" cy="245" r="42" '+S+'/><line x1="185" y1="180" x2="185" y2="220" '+T+'/><line x1="165" y1="200" x2="205" y2="200" '+T+'/><circle cx="322" cy="188" r="8" '+F+'/><circle cx="348" cy="212" r="8" '+F+'/><circle cx="296" cy="212" r="8" fill="hsl('+hue+',90%,62%)"/><circle cx="322" cy="236" r="8" '+F+'/><circle cx="243" cy="235" r="15" '+T+'/><circle cx="277" cy="235" r="15" '+T+'/>';
  }else if(kind==="printer"){
    d='<rect x="150" y="105" width="220" height="85" rx="10" '+S+'/><rect x="170" y="118" width="180" height="58" rx="6" fill="rgba(255,255,255,.09)" stroke="rgba(255,255,255,.35)" stroke-width="2"/><rect x="95" y="190" width="330" height="100" rx="14" '+S+'/><line x1="112" y1="215" x2="408" y2="215" '+T+'/><circle cx="392" cy="262" r="7" fill="hsl('+hue+',90%,62%)"/><path d="M175 290 L345 290 L345 340 L175 340 Z" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.5)" stroke-width="4"/><rect x="196" y="305" width="128" height="11" rx="5" fill="hsl('+hue+',90%,62%)" opacity=".8"/>';
  }
  const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl('+hue+',60%,18%)"/><stop offset="1" stop-color="hsl('+((hue+45)%360)+',70%,8%)"/></linearGradient><radialGradient id="r" cx=".5" cy=".42" r=".65"><stop offset="0" stop-color="hsl('+hue+',90%,60%)" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs><rect width="520" height="400" fill="url(#g)"/><rect width="520" height="400" fill="url(#r)"/>'+d+'</svg>';
  return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
}

const ICONS={
search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
bag:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="5.64"/>',
moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
sparkle:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/>',
eye:'<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
truck:'<rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
card:'<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
percent:'<line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
pin:'<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
minus:'<line x1="5" y1="12" x2="19" y2="12"/>',
x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
chevL:'<polyline points="15 18 9 12 15 6"/>',
chevR:'<polyline points="9 18 15 12 9 6"/>',
check:'<polyline points="20 6 9 17 4 12"/>',
refresh:'<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
box:'<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
clip:'<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
chart:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
send:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
insta:'<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
menu:'<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
play:'<polygon points="5 3 19 12 5 21 5 3"/>',
note:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
'star-o':'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="rgba(128,128,128,.18)"/>'
};

function ratedStars(r,size){
  let s="<span class='rv-stars' style='font-size:"+size+"px'>";
  for(let i=1;i<=5;i++)s+="<span class='rv-star"+(i<=Math.round(r)?" on":" off")+"'><span data-icon='star'></span></span>";
  return s+"</span>";
}
function seededRate(id,n,base){let x=id*2654435761%4294967296;return ((x^(x>>>16))%n+base+n)%n;}
function baseRating(p){
  if(p&&p.rate)return +p.rate;
  const h=((p&&p.id||7)*1103515245+12345)%10;
  return h<3?4:h>7?5:4;
}
function seedReviews(p){
  const out=[],pool=[
    {name:"Jasurbek K.",r:5,t:"Juda zo'r mahsulot! Sifatli ekan, do'kondan kutganim ham shu edi. Buyurtmam vaqtida yetib keldi."},
    {name:"Malika A.",r:5,t:"Xaridimdan to'liq qoniqdim. Sotuvchi juda halol, maslahati uchun rahmat. Narx ham o'rinli."},
    {name:"Aziz T.",r:4,t:"Yaxshi mahsulot, lekin yetkazib berish bir oz kechikdi. Keyingi safar albatta yana olaman."},
    {name:"Nilufar R.",r:5,t:"Ajoyib tajriba! Mahsulot original, kafolat karta bilan keldi. Hamma tavsiya qilaman."},
    {name:"Sarvar M.",r:4,t:"Narxiga arziydigan mahsulot. Bir kamchiligi — qutida qo'llanma yo'q edi, Boshqa hammasi yaxshi."},
    {name:"Dilnoza Q.",r:5,t:"Operator juda mehribon, hamma savolimga sabr bilan javob berdi. Tez jo'natildi."},
    {name:"Umid S.",r:5,t:"Oldin boshqa do'konlardan olganman, bu sayt eng ishonchlisi chiqdi. Qiymati baland!"},
    {name:"Lobar E.",r:3,t:"O'rtacha darajada. Mahsulot o'zi yaxshi, faqat rang fotodagidan biroz farq qildi."},
    {name:"Bobur X.",r:5,t:"QQN bepul kafolat va tez xizmat. Mirzo Ulug'bekkaga rahmat, do'konga yana qaytaman."},
    {name:"Ziyoda N.",r:4,t:"Ishonchli xarid. Bir necha kundan beri ishlatyapman, muammo yo'q. Tavsiya qilaman!"}
  ];
  if(!p)return [];
  const n=3+seededRate(p.id,4,1);
  for(let i=0;i<n;i++){
    const k=seededRate(p.id+i*7,pool.length,0);
    const r=baseRating(p)+(seededRate(p.id+i,3,0)===0?0:1);
    out.push({id:"seed"+p.id+"_"+i,pid:p.id,name:pool[k].name,r:Math.min(5,r),t:pool[k].t,seed:true});
  }
  return out;
}
function productReviews(p,map){
  return seedReviews(p).concat((map[p.id]||[]).sort((a,b)=>b.id.localeCompare(a.id)));
}
function avgRate(list){if(!list||!list.length)return 0;return list.reduce((s,r)=>s+(+r.r||5),0)/list.length;}

function paintIcons(root){
  (root||document).querySelectorAll("[data-icon]").forEach(el=>{
    el.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+(ICONS[el.dataset.icon]||"")+'</svg>';
  });
}


function prodImg(p){
  return p.img||(typeof IMGS!=="undefined"&&IMGS[p.id])||art(p.kind,p.hue);
}
function imgFB(el,id){
  const list=(typeof PRODUCTS!=="undefined"&&PRODUCTS&&PRODUCTS.length)?PRODUCTS:(typeof DEFAULT_PRODUCTS!=="undefined"?DEFAULT_PRODUCTS:[]);
  const p=list.find(x=>x.id==id);
  if(p){el.onerror=null;el.src=art(p.kind,p.hue);}
}
