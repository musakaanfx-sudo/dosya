const admin = require("firebase-admin");
let initialized = false;
function initFirebase() {
  if (initialized) return;
  admin.initializeApp({ credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  })});
  initialized = true;
}

const TARIFLER = [

// ══════════════════════════════════════
// SPORCU / YÜKSEK PROTEİN — devam
// ══════════════════════════════════════
{ ad:"Yoğurtlu Protein Pancake", ulke:"tr", sure:15, porsiyon:2, zorluk:"kolay", kalPorsiyon:460, sporcu:true,
  malzemeler:[{ad:"Yulaf",miktar:100,birim:"g"},{ad:"Yumurta",miktar:2,birim:"adet"},{ad:"Yunan Yoğurdu",miktar:100,birim:"g"},{ad:"Muz",miktar:1,birim:"adet"},{ad:"Kabartma Tozu",miktar:0.5,birim:"çay kaşığı"}],
  adimlar:["Tüm malzemeleri blenderdan geçir.","Yapışmaz tavada her tarafı 2-3 dakika pişir.","Taze meyvelerle servis et."],
  etiketler:["sporcu","kahvaltı","yüksek protein","vejetaryen","hızlı"], onay:true },

{ ad:"Haşlanmış Yumurta & Avokado Tabağı", ulke:"tr", sure:10, porsiyon:1, zorluk:"kolay", kalPorsiyon:380, sporcu:true,
  malzemeler:[{ad:"Yumurta",miktar:3,birim:"adet"},{ad:"Avokado",miktar:1,birim:"adet"},{ad:"Cherry Domates",miktar:80,birim:"g"},{ad:"Zeytinyağı",miktar:1,birim:"çay kaşığı"},{ad:"Tuz, pul biber",miktar:1,birim:"tutam"}],
  adimlar:["Yumurtaları 7 dakika haşla.","Avokadoyu dilimle.","Tabağa yerleştir, zeytinyağı ve pul biber gezdir."],
  etiketler:["sporcu","kahvaltı","yüksek protein","hızlı","glutensiz","düşük karb"], onay:true },

{ ad:"Ton Balıklı Kinoa Salatası", ulke:"tr", sure:20, porsiyon:2, zorluk:"kolay", kalPorsiyon:465, sporcu:true,
  malzemeler:[{ad:"Kinoa",miktar:150,birim:"g"},{ad:"Konserve Ton Balığı",miktar:180,birim:"g"},{ad:"Salatalık",miktar:1,birim:"adet"},{ad:"Domates",miktar:1,birim:"adet"},{ad:"Zeytinyağı",miktar:1,birim:"yemek kaşığı"},{ad:"Limon, tuz",miktar:1,birim:"tutam"}],
  adimlar:["Kinoayı haşla.","Ton balığı ve sebzeleri ekle.","Zeytinyağı ve limonla tatlandır."],
  etiketler:["sporcu","öğle yemeği","yüksek protein","glutensiz","hızlı"], onay:true },

{ ad:"Wiener Schnitzel Light", ulke:"at", sure:25, porsiyon:2, zorluk:"orta", kalPorsiyon:420, sporcu:true,
  adler:{tr:"Hafif Wiener Schnitzel",de:"Leichtes Wiener Schnitzel"},
  malzemeler:[{ad:"Kalbfleisch (Kalbsschnitzel)",miktar:400,birim:"g"},{ad:"Ei",miktar:1,birim:"Stück"},{ad:"Vollkorn-Semmelbrösel",miktar:60,birim:"g"},{ad:"Zitrone",miktar:1,birim:"Stück"},{ad:"Wenig Öl",miktar:1,birim:"EL"},{ad:"Salz, Pfeffer",miktar:1,birim:"Prise"}],
  adimlar:["Fleisch dünn klopfen.","Durch Ei und Brösel ziehen.","In wenig Öl goldbraun braten.","Mit Zitrone servieren."],
  etiketler:["sporcu","yüksek protein","ana yemek"], onay:true },

{ ad:"Belgische Kippensoep", ulke:"be", sure:40, porsiyon:4, zorluk:"kolay", kalPorsiyon:280, sporcu:true,
  adler:{tr:"Belçika Tavuk Çorbası",en:"Belgian Chicken Soup"},
  malzemeler:[{ad:"Kipfilet",miktar:400,birim:"g"},{ad:"Wortelen",miktar:2,birim:"stuk"},{ad:"Prei",miktar:1,birim:"stuk"},{ad:"Selderij",miktar:2,birim:"stengels"},{ad:"Bouillon",miktar:1200,birim:"ml"},{ad:"Peterselie, zout",miktar:1,birim:"n.s."}],
  adimlar:["Groenten en kip in de bouillon doen.","30 minuten zachtjes koken.","Kip eruit halen, snipperen en terugdoen.","Peterselie toevoegen."],
  etiketler:["sporcu","çorba","yüksek protein","glutensiz","kolay"], onay:true },

{ ad:"Nederlandse Omelet met Zalm", ulke:"nl", sure:15, porsiyon:1, zorluk:"kolay", kalPorsiyon:390, sporcu:true,
  adler:{tr:"Hollanda Somonlu Omlet",en:"Dutch Smoked Salmon Omelette"},
  malzemeler:[{ad:"Eieren",miktar:3,birim:"stuk"},{ad:"Gerookte Zalm",miktar:60,birim:"g"},{ad:"Verse Dille",miktar:1,birim:"takje"},{ad:"Boter",miktar:5,birim:"g"},{ad:"Zout, peper",miktar:1,birim:"n.s."}],
  adimlar:["Eieren kloppen met zout.","In boter bakken tot halfgaar.","Zalm en dille erover.","Opvouwen en serveren."],
  etiketler:["sporcu","kahvaltı","yüksek protein","hızlı","glutensiz"], onay:true },

{ ad:"Csirkemell Párolt Zöldséggel", ulke:"hu", sure:30, porsiyon:2, zorluk:"kolay", kalPorsiyon:365, sporcu:true,
  adler:{tr:"Buharda Sebzeli Tavuk Göğsü",en:"Steamed Chicken Breast with Vegetables"},
  malzemeler:[{ad:"Csirkemell",miktar:400,birim:"g"},{ad:"Brokkoli",miktar:200,birim:"g"},{ad:"Sárgarépa",miktar:2,birim:"db"},{ad:"Olívaolaj",miktar:1,birim:"ek"},{ad:"Fokhagyma, só, fűszerek",miktar:1,birim:"ízlés"}],
  adimlar:["Párold meg a zöldségeket 8 percig.","A csirkemellet süsd meg olívaolajban.","Tálald együtt."],
  etiketler:["sporcu","yüksek protein","glutensiz","kolay"], onay:true },

{ ad:"Frango Grelhado com Arroz Integral", ulke:"pt", sure:30, porsiyon:2, zorluk:"kolay", kalPorsiyon:480, sporcu:true,
  adler:{tr:"Izgara Tavuk ve Esmer Pirinç",en:"Grilled Chicken with Brown Rice"},
  malzemeler:[{ad:"Peito de frango",miktar:350,birim:"g"},{ad:"Arroz integral",miktar:150,birim:"g"},{ad:"Limão",miktar:1,birim:"peça"},{ad:"Azeite",miktar:1,birim:"c.s."},{ad:"Alho, sal, orégãos",miktar:1,birim:"q.b."}],
  adimlar:["Cozinhe o arroz integral 35 minutos.","Marine o frango com limão e alho.","Grelhe 6-7 minutos de cada lado."],
  etiketler:["sporcu","yüksek protein","glutensiz","kolay"], onay:true },

{ ad:"Kuřecí Vývar s Zeleninou", ulke:"cs", sure:45, porsiyon:4, zorluk:"kolay", kalPorsiyon:215, sporcu:true,
  adler:{tr:"Çek Tavuk Suyu",en:"Czech Chicken Broth with Vegetables"},
  malzemeler:[{ad:"Kuřecí stehna",miktar:600,birim:"g"},{ad:"Mrkev",miktar:2,birim:"ks"},{ad:"Celer",miktar:1,birim:"kus"},{ad:"Pór",miktar:1,birim:"ks"},{ad:"Voda",miktar:1500,birim:"ml"},{ad:"Sůl, pepř, bobkový list",miktar:1,birim:"dle chuti"}],
  adimlar:["Vložte vše do hrnce, přiveďte k varu.","Vařte na mírném ohni 40 minut.","Maso vyjměte, nasekejte a vraťte."],
  etiketler:["sporcu","çorba","yüksek protein","glutensiz"], onay:true },

{ ad:"Pui la Cuptor cu Legume", ulke:"ro", sure:50, porsiyon:4, zorluk:"kolay", kalPorsiyon:390, sporcu:true,
  adler:{tr:"Rumen Fırın Tavuk",en:"Romanian Baked Chicken with Vegetables"},
  malzemeler:[{ad:"Pulpe de pui",miktar:800,birim:"g"},{ad:"Cartofi",miktar:400,birim:"g"},{ad:"Ardei",miktar:2,birim:"buc"},{ad:"Ulei",miktar:2,birim:"linguri"},{ad:"Usturoi, cimbru, sare",miktar:1,birim:"după gust"}],
  adimlar:["Tăiați legumele, puneți în tavă cu puiul.","Condimentați și adăugați ulei.","Coaceți la 200°C 40 de minute."],
  etiketler:["sporcu","yüksek protein","fırın","glutensiz"], onay:true },

{ ad:"Piletina na Žaru s Povrćem", ulke:"hr", sure:25, porsiyon:2, zorluk:"kolay", kalPorsiyon:355, sporcu:true,
  adler:{tr:"Hırvatistan Izgara Tavuk",en:"Croatian Grilled Chicken with Veggies"},
  malzemeler:[{ad:"Pileća prsa",miktar:400,birim:"g"},{ad:"Tikvice",miktar:2,birim:"komada"},{ad:"Paprika",miktar:1,birim:"komad"},{ad:"Maslinovo ulje",miktar:2,birim:"jušne žlice"},{ad:"Češnjak, sol, bilje",miktar:1,birim:"po ukusu"}],
  adimlar:["Marinirajte piletinu 15 minuta.","Grilajte piletinu 6-7 minuta sa svake strane.","Grilajte povrće i servirajte."],
  etiketler:["sporcu","yüksek protein","glutensiz","kolay"], onay:true },

{ ad:"Vistas Filejas ar Dārzeņiem", ulke:"lv", sure:25, porsiyon:2, zorluk:"kolay", kalPorsiyon:340, sporcu:true,
  adler:{tr:"Letonyalı Tavuk Fileto",en:"Latvian Chicken Fillet with Vegetables"},
  malzemeler:[{ad:"Vistas fileja",miktar:400,birim:"g"},{ad:"Brokoļi",miktar:200,birim:"g"},{ad:"Burkāns",miktar:2,birim:"gabali"},{ad:"Olīveļļa",miktar:1,birim:"ēdamkarote"},{ad:"Sāls, pipari",miktar:1,birim:"pēc garšas"}],
  adimlar:["Tvaicē dārzeņus 8 minūtes.","Cep vistu olīveļļā 6 minūtes.","Pasniedz kopā."],
  etiketler:["sporcu","yüksek protein","glutensiz","kolay"], onay:true },

{ ad:"Kana Praetis Köögiviljadega", ulke:"et", sure:25, porsiyon:2, zorluk:"kolay", kalPorsiyon:345, sporcu:true,
  adler:{tr:"Estonya Kızarmış Tavuk",en:"Estonian Pan-Fried Chicken with Vegetables"},
  malzemeler:[{ad:"Kanafilee",miktar:400,birim:"g"},{ad:"Spargelkapsas",miktar:200,birim:"g"},{ad:"Porgand",miktar:2,birim:"tk"},{ad:"Oliiviõli",miktar:1,birim:"spl"},{ad:"Sool, pipar, tüümian",miktar:1,birim:"maitse järgi"}],
  adimlar:["Prae kana õlis 6 minutit mõlemalt poolt.","Auruta köögiviljad 8 minutit.","Serveeri koos."],
  etiketler:["sporcu","yüksek protein","glutensiz","kolay"], onay:true },

{ ad:"Vištienos Filė su Daržovėmis", ulke:"lt", sure:25, porsiyon:2, zorluk:"kolay", kalPorsiyon:340, sporcu:true,
  adler:{tr:"Litvanya Tavuk Fileto",en:"Lithuanian Chicken Fillet with Vegetables"},
  malzemeler:[{ad:"Vištienos filė",miktar:400,birim:"g"},{ad:"Brokoliai",miktar:200,birim:"g"},{ad:"Morka",miktar:2,birim:"vnt"},{ad:"Aliejus",miktar:1,birim:"v.š."},{ad:"Druska, pipirai",miktar:1,birim:"pagal skonį"}],
  adimlar:["Kepkite vištieną aliejuje 6 minutes kiekvienoje pusėje.","Virkite daržoves 8 minutes.","Patiekite kartu."],
  etiketler:["sporcu","yüksek protein","glutensiz","kolay"], onay:true },

// ══════════════════════════════════════
// KİLO VERME / DÜŞÜK KALORİ — devam
// ══════════════════════════════════════
{ ad:"Ispanak Salatası & Haşlanmış Yumurta", ulke:"tr", sure:10, porsiyon:1, zorluk:"kolay", kalPorsiyon:210, sporcu:false,
  malzemeler:[{ad:"Taze Ispanak",miktar:100,birim:"g"},{ad:"Yumurta",miktar:2,birim:"adet"},{ad:"Domates",miktar:1,birim:"adet"},{ad:"Zeytinyağı",miktar:1,birim:"çay kaşığı"},{ad:"Limon, tuz",miktar:1,birim:"tutam"}],
  adimlar:["Yumurtaları 10 dakika haşla.","Ispanak ve domatesi tabağa koy.","Dilimlenmiş yumurta ekle.","Zeytinyağı ve limonla servis et."],
  etiketler:["düşük kalori","salata","vejetaryen","hızlı","glutensiz"], onay:true },

{ ad:"Kabak Çorbası", ulke:"tr", sure:30, porsiyon:4, zorluk:"kolay", kalPorsiyon:115, sporcu:false,
  malzemeler:[{ad:"Kabak",miktar:600,birim:"g"},{ad:"Soğan",miktar:1,birim:"adet"},{ad:"Sebze Suyu",miktar:1000,birim:"ml"},{ad:"Zeytinyağı",miktar:1,birim:"yemek kaşığı"},{ad:"Tuz, muskat",miktar:1,birim:"tutam"}],
  adimlar:["Soğanı kavur, kabağı ekle.","Sebze suyuyla kapla, 20 dakika pişir.","Blenderdan geçir."],
  etiketler:["çorba","düşük kalori","vegan","glutensiz","kolay"], onay:true },

{ ad:"Buharda Brokoli & Limon", ulke:"tr", sure:15, porsiyon:2, zorluk:"kolay", kalPorsiyon:95, sporcu:false,
  malzemeler:[{ad:"Brokoli",miktar:400,birim:"g"},{ad:"Limon",miktar:1,birim:"adet"},{ad:"Sarımsak",miktar:1,birim:"diş"},{ad:"Zeytinyağı",miktar:1,birim:"çay kaşığı"},{ad:"Tuz",miktar:1,birim:"tutam"}],
  adimlar:["Brokoliyi buharda 8 dakika pişir.","Sarımsaklı zeytinyağı gezdir.","Bol limon sık."],
  etiketler:["düşük kalori","vegan","hızlı","glutensiz","yan yemek"], onay:true },

{ ad:"Brokkoli-Käse-Suppe Light", ulke:"de", sure:25, porsiyon:4, zorluk:"kolay", kalPorsiyon:185, sporcu:false,
  adler:{tr:"Hafif Brokoli Peynir Çorbası"},
  malzemeler:[{ad:"Brokkoli",miktar:600,birim:"g"},{ad:"Gemüsebrühe",miktar:800,birim:"ml"},{ad:"Schmelzkäse light",miktar:80,birim:"g"},{ad:"Zwiebel",miktar:1,birim:"Stück"},{ad:"Salz, Pfeffer, Muskat",miktar:1,birim:"Prise"}],
  adimlar:["Zwiebel andünsten, Brokkoli zugeben.","Brühe zugießen, 15 Min. kochen.","Käse einrühren, pürieren."],
  etiketler:["çorba","düşük kalori","glutensiz","kolay","vejetaryen"], onay:true },

{ ad:"Gekochter Fisch mit Gemüse", ulke:"at", sure:25, porsiyon:2, zorluk:"kolay", kalPorsiyon:210, sporcu:false,
  adler:{tr:"Sebzeli Haşlanmış Balık"},
  malzemeler:[{ad:"Fischfilet (Zander/Forelle)",miktar:400,birim:"g"},{ad:"Karotten",miktar:2,birim:"Stück"},{ad:"Fenchel",miktar:1,birim:"Stück"},{ad:"Zitrone",miktar:1,birim:"Stück"},{ad:"Salz, Dill, Lorbeer",miktar:1,birim:"Prise"}],
  adimlar:["Gemüse in Wasser 10 Minuten kochen.","Fisch einlegen, 10 Minuten ziehen lassen.","Mit Zitrone und Dill servieren."],
  etiketler:["düşük kalori","yüksek protein","glutensiz","kolay"], onay:true },

{ ad:"Stoemp Light", ulke:"be", sure:30, porsiyon:4, zorluk:"kolay", kalPorsiyon:195, sporcu:false,
  adler:{tr:"Hafif Belçika Stoemp"},
  malzemeler:[{ad:"Aardappelen",miktar:400,birim:"g"},{ad:"Prei",miktar:2,birim:"stuk"},{ad:"Magere Melk",miktar:100,birim:"ml"},{ad:"Boter light",miktar:10,birim:"g"},{ad:"Nootmuskaat, zout",miktar:1,birim:"n.s."}],
  adimlar:["Aardappelen en prei koken tot gaar.","Fijnstampen met magere melk en boter.","Kruiden en serveren."],
  etiketler:["düşük kalori","vejetaryen","glutensiz","kolay","kış"], onay:true },

{ ad:"Groentestamppot", ulke:"nl", sure:30, porsiyon:4, zorluk:"kolay", kalPorsiyon:185, sporcu:false,
  adler:{tr:"Hollanda Sebze Püresi",en:"Dutch Vegetable Mash"},
  malzemeler:[{ad:"Aardappelen",miktar:500,birim:"g"},{ad:"Boerenkool",miktar:300,birim:"g"},{ad:"Magere melk",miktar:100,birim:"ml"},{ad:"Uitje",miktar:1,birim:"stuk"},{ad:"Zout, peper",miktar:1,birim:"n.s."}],
  adimlar:["Kook aardappelen en boerenkool gaar.","Stamp fijn met magere melk.","Bak uitje glazig, door de stamppot mengen."],
  etiketler:["düşük kalori","vegan","glutensiz","kış","kolay"], onay:true },

{ ad:"Sopa de Tomate Fresca", ulke:"pt", sure:20, porsiyon:4, zorluk:"kolay", kalPorsiyon:110, sporcu:false,
  adler:{tr:"Portekiz Taze Domates Çorbası"},
  malzemeler:[{ad:"Tomates maduros",miktar:800,birim:"g"},{ad:"Cebola",miktar:1,birim:"peça"},{ad:"Alho",miktar:2,birim:"dentes"},{ad:"Azeite",miktar:1,birim:"c.s."},{ad:"Coentros, sal",miktar:1,birim:"q.b."}],
  adimlar:["Refogar cebola e alho.","Juntar tomates e cozinhar 15 min.","Triturar e adicionar coentros."],
  etiketler:["çorba","düşük kalori","vegan","glutensiz","kolay"], onay:true },

{ ad:"Zelenninová Polévka s Pohankou", ulke:"cs", sure:30, porsiyon:4, zorluk:"kolay", kalPorsiyon:165, sporcu:false,
  adler:{tr:"Karabuğdaylı Çek Sebze Çorbası"},
  malzemeler:[{ad:"Zelenina mix",miktar:500,birim:"g"},{ad:"Pohanka",miktar:60,birim:"g"},{ad:"Zeleninový vývar",miktar:1000,birim:"ml"},{ad:"Sůl, pepř, majoránka",miktar:1,birim:"dle chuti"}],
  adimlar:["Zeleninu nakrájejte a vařte v bujónu 15 minut.","Přidejte pohankovou kroupu, vařte dalších 15 minut.","Dochuťte."],
  etiketler:["çorba","düşük kalori","vegan","glutensiz","kolay"], onay:true },

{ ad:"Salată de Legume Proaspete", ulke:"ro", sure:10, porsiyon:2, zorluk:"kolay", kalPorsiyon:95, sporcu:false,
  adler:{tr:"Rumen Taze Sebze Salatası"},
  malzemeler:[{ad:"Roșii",miktar:3,birim:"buc"},{ad:"Castraveți",miktar:1,birim:"buc"},{ad:"Ardei roșu",miktar:1,birim:"buc"},{ad:"Ceapă verde",miktar:3,birim:"fire"},{ad:"Ulei de măsline",miktar:1,birim:"lingură"},{ad:"Sare, oțet",miktar:1,birim:"după gust"}],
  adimlar:["Tăiați legumele.","Amestecați cu ulei, oțet și sare."],
  etiketler:["salata","düşük kalori","vegan","hızlı","glutensiz"], onay:true },

{ ad:"Juha od Povrća", ulke:"hr", sure:30, porsiyon:4, zorluk:"kolay", kalPorsiyon:110, sporcu:false,
  adler:{tr:"Hırvatistan Sebze Çorbası"},
  malzemeler:[{ad:"Mrkva",miktar:2,birim:"komada"},{ad:"Krumpir",miktar:2,birim:"komada"},{ad:"Tikvice",miktar:1,birim:"komad"},{ad:"Luk",miktar:1,birim:"komad"},{ad:"Juha od povrća",miktar:1200,birim:"ml"},{ad:"Sol, peršin",miktar:1,birim:"po ukusu"}],
  adimlar:["Povrće narežite i stavite u temeljac.","Kuhajte 25 minuta.","Dodajte svježi peršin."],
  etiketler:["çorba","düşük kalori","vegan","glutensiz","kolay"], onay:true },

{ ad:"Zeleninová Polievka", ulke:"cs", sure:30, porsiyon:4, zorluk:"kolay", kalPorsiyon:120, sporcu:false,
  adler:{tr:"Çekçe Sebze Çorbası"},
  malzemeler:[{ad:"Mrkva",miktar:2,birim:"ks"},{ad:"Zeler",miktar:1,birim:"kus"},{ad:"Cibule",miktar:1,birim:"ks"},{ad:"Zemiak",miktar:2,birim:"ks"},{ad:"Vývar",miktar:1200,birim:"ml"},{ad:"Soľ, korenie",miktar:1,birim:"podľa chuti"}],
  adimlar:["Zeleninu nakrájajte.","Varte v základnom vývare 25 minút.","Dochuťte."],
  etiketler:["çorba","düşük kalori","vegan","glutensiz","kolay"], onay:true },

{ ad:"Dārzeņu Zupa", ulke:"lv", sure:30, porsiyon:4, zorluk:"kolay", kalPorsiyon:115, sporcu:false,
  adler:{tr:"Letonya Sebze Çorbası"},
  malzemeler:[{ad:"Burkāns",miktar:2,birim:"gabali"},{ad:"Selerija",miktar:1,birim:"gabals"},{ad:"Kartupelis",miktar:2,birim:"gabali"},{ad:"Sīpols",miktar:1,birim:"gabals"},{ad:"Ūdens vai buljons",miktar:1200,birim:"ml"},{ad:"Sāls, pipari, pētersīļi",miktar:1,birim:"pēc garšas"}],
  adimlar:["Sagriez dārzeņus.","Vāri buljonā 25 minūtes.","Pievieno pētersīļus."],
  etiketler:["çorba","düşük kalori","vegan","glutensiz","kolay"], onay:true },

{ ad:"Köögiviljasupp", ulke:"et", sure:30, porsiyon:4, zorluk:"kolay", kalPorsiyon:110, sporcu:false,
  adler:{tr:"Estonya Sebze Çorbası"},
  malzemeler:[{ad:"Porgand",miktar:2,birim:"tk"},{ad:"Seller",miktar:1,birim:"tk"},{ad:"Kartul",miktar:2,birim:"tk"},{ad:"Sibul",miktar:1,birim:"tk"},{ad:"Puljong",miktar:1200,birim:"ml"},{ad:"Sool, pipar, petersell",miktar:1,birim:"maitse järgi"}],
  adimlar:["Lõika köögiviljad.","Keeda puljongis 25 minutit.","Lisa petersell."],
  etiketler:["çorba","düşük kalori","vegan","glutensiz","kolay"], onay:true },

// ══════════════════════════════════════
// SAĞLIKLI KAHVALTILAR — devam
// ══════════════════════════════════════
{ ad:"Chia Puding", ulke:"tr", sure:5, porsiyon:1, zorluk:"kolay", kalPorsiyon:285, sporcu:false,
  malzemeler:[{ad:"Chia Tohumu",miktar:3,birim:"yemek kaşığı"},{ad:"Hindistan Cevizi Sütü",miktar:200,birim:"ml"},{ad:"Bal",miktar:1,birim:"çay kaşığı"},{ad:"Meyve",miktar:80,birim:"g"}],
  adimlar:["Chia tohumunu sütle karıştır, gece boyunca dinlendir.","Sabah üzerine meyve ve bal ekle."],
  etiketler:["kahvaltı","vegan","meal prep","glutensiz","hızlı"], onay:true },

{ ad:"Tamagoyaki Style Yumurta", ulke:"tr", sure:10, porsiyon:1, zorluk:"kolay", kalPorsiyon:215, sporcu:false,
  malzemeler:[{ad:"Yumurta",miktar:2,birim:"adet"},{ad:"Taze Soğan",miktar:1,birim:"dal"},{ad:"Biber",miktar:30,birim:"g"},{ad:"Tuz",miktar:1,birim:"tutam"}],
  adimlar:["Yumurtaları çırpın, sebzeleri ekleyin.","Yağlanmış tavada ince tabaka yapın.","Rulo şeklinde katlayın, dilimleyip servis edin."],
  etiketler:["kahvaltı","vejetaryen","hızlı","düşük kalori","glutensiz"], onay:true },

{ ad:"Vollkornbrot mit Frischkäse", ulke:"de", sure:5, porsiyon:1, zorluk:"kolay", kalPorsiyon:295, sporcu:false,
  adler:{tr:"Tam Tahıllı Ekmek Kremalı Peynir"},
  malzemeler:[{ad:"Vollkornbrot",miktar:2,birim:"Scheiben"},{ad:"Magerfrischkäse",miktar:60,birim:"g"},{ad:"Gurke",miktar:0.5,birim:"Stück"},{ad:"Radieschen",miktar:4,birim:"Stück"},{ad:"Schnittlauch, Salz",miktar:1,birim:"Prise"}],
  adimlar:["Frischkäse auf Brot streichen.","Mit Gurke, Radieschen und Schnittlauch belegen."],
  etiketler:["kahvaltı","vejetaryen","hızlı","kolay"], onay:true },

{ ad:"Tartine Légère au Fromage Blanc", ulke:"fr", sure:5, porsiyon:1, zorluk:"kolay", kalPorsiyon:245, sporcu:false,
  adler:{tr:"Hafif Lor Peynirli Tost"},
  malzemeler:[{ad:"Pain complet",miktar:2,birim:"tranches"},{ad:"Fromage blanc 0%",miktar:80,birim:"g"},{ad:"Concombre",miktar:0.5,birim:"pièce"},{ad:"Radis",miktar:3,birim:"pièces"},{ad:"Ciboulette, sel",miktar:1,birim:"q.s."}],
  adimlar:["Tartiner le fromage blanc sur le pain.","Ajouter les crudités et la ciboulette."],
  etiketler:["kahvaltı","vejetaryen","hızlı","düşük kalori"], onay:true },

{ ad:"Fruktsallad med Kefir", ulke:"sv", sure:5, porsiyon:1, zorluk:"kolay", kalPorsiyon:220, sporcu:false,
  adler:{tr:"İsveç Kefirlı Meyve Salatası"},
  malzemeler:[{ad:"Kefir",miktar:150,birim:"ml"},{ad:"Blandad frukt",miktar:150,birim:"g"},{ad:"Chiafrön",miktar:1,birim:"tsk"},{ad:"Honung",miktar:1,birim:"tsk"}],
  adimlar:["Frukt i skål.","Häll kefir över, toppa med chiafrön och honung."],
  etiketler:["kahvaltı","vejetaryen","hızlı","probiyotik"], onay:true },

{ ad:"Hämmentämätön Kaurapuuro", ulke:"fi", sure:10, porsiyon:1, zorluk:"kolay", kalPorsiyon:295, sporcu:false,
  adler:{tr:"Finlandiya Geleneksel Yulaf"},
  malzemeler:[{ad:"Kaurahiutaleet",miktar:80,birim:"g"},{ad:"Vesi",miktar:200,birim:"ml"},{ad:"Suola",miktar:1,birim:"ripaus"},{ad:"Puolukat tai mustaherukat",miktar:60,birim:"g"},{ad:"Voi",miktar:5,birim:"g"}],
  adimlar:["Keitä kaura vedessä 5 minuuttia.","Lisää suola ja voi.","Tarjoile marjojen kanssa."],
  etiketler:["kahvaltı","vejetaryen","kolay","kış"], onay:true },

{ ad:"Morgenmad med Rugbrød", ulke:"da", sure:5, porsiyon:1, zorluk:"kolay", kalPorsiyon:310, sporcu:false,
  adler:{tr:"Danimarka Çavdar Ekmeği Kahvaltısı"},
  malzemeler:[{ad:"Rugbrød",miktar:2,birim:"skiver"},{ad:"Skyr",miktar:100,birim:"g"},{ad:"Blåbær",miktar:60,birim:"g"},{ad:"Solsikkekerner",miktar:15,birim:"g"},{ad:"Honning",miktar:1,birim:"tsk"}],
  adimlar:["Smør skyr på rugbrødet.","Pynt med blåbær og solsikkekerner.","Dryp honning over."],
  etiketler:["kahvaltı","vejetaryen","hızlı","düşük kalori"], onay:true },

{ ad:"Hommikusöök Kodujuustuga", ulke:"et", sure:5, porsiyon:1, zorluk:"kolay", kalPorsiyon:280, sporcu:false,
  adler:{tr:"Estonya Lor Peynirli Kahvaltı"},
  malzemeler:[{ad:"Kodujuust",miktar:150,birim:"g"},{ad:"Täistera leib",miktar:2,birim:"viilu"},{ad:"Mets marjad",miktar:60,birim:"g"},{ad:"Mesi",miktar:1,birim:"tl"}],
  adimlar:["Määri kodujuust leivale.","Lisa marjad ja mesi."],
  etiketler:["kahvaltı","vejetaryen","hızlı","kolay"], onay:true },

{ ad:"Reggeli Túró Deszkán", ulke:"hu", sure:5, porsiyon:1, zorluk:"kolay", kalPorsiyon:265, sporcu:false,
  adler:{tr:"Macar Lor Peynirli Kahvaltı"},
  malzemeler:[{ad:"Túró",miktar:100,birim:"g"},{ad:"Teljes kiőrlésű kenyér",miktar:2,birim:"szelet"},{ad:"Retek",miktar:3,birim:"db"},{ad:"Újhagyma",miktar:2,birim:"szál"},{ad:"Só, bors",miktar:1,birim:"ízlés"}],
  adimlar:["Kend a túrót a kenyérre.","Adj hozzá retket és újhagymát."],
  etiketler:["kahvaltı","vejetaryen","hızlı","kolay"], onay:true },

{ ad:"Pequeno-Almoço Mediterrâneo", ulke:"pt", sure:5, porsiyon:1, zorluk:"kolay", kalPorsiyon:320, sporcu:false,
  adler:{tr:"Portekiz Akdeniz Kahvaltısı"},
  malzemeler:[{ad:"Pão de centeio",miktar:2,birim:"fatias"},{ad:"Queijo fresco",miktar:50,birim:"g"},{ad:"Tomate",miktar:1,birim:"peça"},{ad:"Azeite",miktar:1,birim:"c.c."},{ad:"Azeitonas",miktar:5,birim:"unidades"}],
  adimlar:["Torrar o pão.","Colocar queijo, tomate e azeitonas.","Regar com azeite."],
  etiketler:["kahvaltı","vejetaryen","hızlı","Akdeniz"], onay:true },

{ ad:"Warsztaty Owsianki", ulke:"pl", sure:10, porsiyon:1, zorluk:"kolay", kalPorsiyon:355, sporcu:false,
  adler:{tr:"Polonya Meyveli Yulaf"},
  malzemeler:[{ad:"Płatki owsiane",miktar:80,birim:"g"},{ad:"Mleko",miktar:200,birim:"ml"},{ad:"Jabłko",miktar:0.5,birim:"szt"},{ad:"Cynamon",miktar:0.5,birim:"łyżeczka"},{ad:"Orzechy",miktar:15,birim:"g"},{ad:"Miód",miktar:1,birim:"łyżeczka"}],
  adimlar:["Ugotuj płatki w mleku 5 minut.","Dodaj starte jabłko i cynamon.","Posyp orzechami, polej miodem."],
  etiketler:["kahvaltı","vejetaryen","hızlı","kolay"], onay:true },

{ ad:"Mică Dejun Sănătos", ulke:"ro", sure:5, porsiyon:1, zorluk:"kolay", kalPorsiyon:270, sporcu:false,
  adler:{tr:"Rumen Sağlıklı Kahvaltı"},
  malzemeler:[{ad:"Iaurt",miktar:150,birim:"g"},{ad:"Miere",miktar:1,birim:"linguriță"},{ad:"Nuci",miktar:15,birim:"g"},{ad:"Fructe de pădure",miktar:60,birim:"g"},{ad:"Semințe de chia",miktar:1,birim:"linguriță"}],
  adimlar:["Pune iaurtul într-un bol.","Adaugă mierea, nucile, fructele și semințele."],
  etiketler:["kahvaltı","vejetaryen","hızlı","kolay","glutensiz"], onay:true },

// ══════════════════════════════════════
// VEGAN / VEJETARYEn — devam
// ══════════════════════════════════════
{ ad:"Kırmızı Pancar Humus", ulke:"tr", sure:15, porsiyon:4, zorluk:"kolay", kalPorsiyon:155, sporcu:false,
  malzemeler:[{ad:"Haşlanmış Nohut",miktar:240,birim:"g"},{ad:"Kırmızı Pancar",miktar:200,birim:"g"},{ad:"Tahin",miktar:2,birim:"yemek kaşığı"},{ad:"Limon",miktar:1,birim:"adet"},{ad:"Sarımsak",miktar:1,birim:"diş"},{ad:"Zeytinyağı, tuz",miktar:1,birim:"tutam"}],
  adimlar:["Tüm malzemeleri mutfak robotunda pürüzsüz kıvama getir.","Zeytinyağı gezdirerek servis et."],
  etiketler:["vegan","meze","düşük kalori","glutensiz","hızlı"], onay:true },

{ ad:"Fırın Patlıcan & Domates", ulke:"tr", sure:45, porsiyon:4, zorluk:"kolay", kalPorsiyon:145, sporcu:false,
  malzemeler:[{ad:"Patlıcan",miktar:3,birim:"adet"},{ad:"Domates",miktar:3,birim:"adet"},{ad:"Sarımsak",miktar:3,birim:"diş"},{ad:"Zeytinyağı",miktar:2,birim:"yemek kaşığı"},{ad:"Kekik, tuz",miktar:1,birim:"tutam"}],
  adimlar:["Sebzeleri dilimle, tepsiye diz.","Zeytinyağı, sarımsak ve kekik serp.","180°C'de 35 dakika pişir."],
  etiketler:["vegan","düşük kalori","fırın","glutensiz","kolay"], onay:true },

{ ad:"Veganer Kartoffelsalat", ulke:"de", sure:25, porsiyon:4, zorluk:"kolay", kalPorsiyon:180, sporcu:false,
  adler:{tr:"Vegan Alman Patates Salatası"},
  malzemeler:[{ad:"Kartoffeln",miktar:600,birim:"g"},{ad:"Zwiebeln",miktar:1,birim:"Stück"},{ad:"Gurke",miktar:1,birim:"Stück"},{ad:"Apfelessig",miktar:3,birim:"EL"},{ad:"Senf",miktar:1,birim:"TL"},{ad:"Salz, Zucker, Dill",miktar:1,birim:"Prise"}],
  adimlar:["Kartoffeln kochen, abkühlen, in Scheiben schneiden.","Dressing aus Essig, Senf, Öl und Zucker.","Alles mischen, 30 Min. ziehen lassen."],
  etiketler:["vegan","salata","düşük kalori","kolay"], onay:true },

{ ad:"Vegetarische Erbsensuppe", ulke:"at", sure:30, porsiyon:4, zorluk:"kolay", kalPorsiyon:195, sporcu:false,
  adler:{tr:"Avusturya Bezelye Çorbası"},
  malzemeler:[{ad:"Erbsen (TK)",miktar:500,birim:"g"},{ad:"Zwiebel",miktar:1,birim:"Stück"},{ad:"Gemüsebrühe",miktar:800,birim:"ml"},{ad:"Minze, Salz",miktar:1,birim:"Prise"},{ad:"Olivenöl",miktar:1,birim:"EL"}],
  adimlar:["Zwiebel anbraten.","Erbsen und Brühe zugeben, 15 Min. kochen.","Pürieren, mit Minze servieren."],
  etiketler:["çorba","vegan","düşük kalori","glutensiz","kolay"], onay:true },

{ ad:"Soupe au Pistou", ulke:"fr", sure:40, porsiyon:6, zorluk:"orta", kalPorsiyon:225, sporcu:false,
  adler:{tr:"Fransız Sebze Çorbası Pestolu"},
  malzemeler:[{ad:"Courgettes",miktar:2,birim:"pièces"},{ad:"Haricots verts",miktar:200,birim:"g"},{ad:"Pommes de terre",miktar:2,birim:"pièces"},{ad:"Tomates",miktar:2,birim:"pièces"},{ad:"Pistou (basilic, ail, huile)",miktar:3,birim:"c.à.s."},{ad:"Bouillon, sel",miktar:1,birim:"q.s."}],
  adimlar:["Faire bouillir le bouillon.","Ajouter tous les légumes coupés, cuire 25 min.","Servir avec le pistou par-dessus."],
  etiketler:["çorba","vegan","Fransız mutfağı","yaz","glutensiz"], onay:true },

{ ad:"Minestrone Vegana", ulke:"it", sure:40, porsiyon:6, zorluk:"kolay", kalPorsiyon:195, sporcu:false,
  adler:{tr:"Vegan İtalyan Minestrone"},
  malzemeler:[{ad:"Carote",miktar:2,birim:"pezzi"},{ad:"Sedano",miktar:2,birim:"gambi"},{ad:"Zucchine",miktar:1,birim:"pezzo"},{ad:"Pomodori",miktar:2,birim:"pezzi"},{ad:"Fagioli borlotti",miktar:200,birim:"g"},{ad:"Pasta piccola",miktar:80,birim:"g"},{ad:"Olio, sale, basilico",miktar:1,birim:"q.b."}],
  adimlar:["Soffriggere le verdure.","Aggiungere acqua, fagioli e cuocere 25 minuti.","Unire la pasta, cuocere al dente.","Aggiungere basilico."],
  etiketler:["çorba","vegan","kış","kolay"], onay:true },

{ ad:"Pisto Manchego", ulke:"es", sure:35, porsiyon:4, zorluk:"kolay", kalPorsiyon:155, sporcu:false,
  adler:{tr:"İspanya Kabak Domates Güveci"},
  malzemeler:[{ad:"Calabacín",miktar:2,birim:"piezas"},{ad:"Berenjena",miktar:1,birim:"pieza"},{ad:"Tomates",miktar:3,birim:"piezas"},{ad:"Cebolla",miktar:1,birim:"pieza"},{ad:"Aceite de oliva",miktar:2,birim:"c.s."},{ad:"Sal, azúcar",miktar:1,birim:"al gusto"}],
  adimlar:["Pochar la cebolla.","Añadir berenjena, calabacín y tomate.","Guisar 25 minutos a fuego lento."],
  etiketler:["vegan","ana yemek","düşük kalori","glutensiz","yaz"], onay:true },

{ ad:"Μελιτζανοσαλάτα", ulke:"el", sure:50, porsiyon:4, zorluk:"kolay", kalPorsiyon:130, sporcu:false,
  adler:{tr:"Yunan Köz Patlıcan Salatası",en:"Greek Smoky Eggplant Dip"},
  malzemeler:[{ad:"Μελιτζάνες",miktar:3,birim:"τεμ."},{ad:"Σκόρδο",miktar:2,birim:"σκελίδες"},{ad:"Ελαιόλαδο",miktar:2,birim:"κ.σ."},{ad:"Χυμός λεμονιού",miktar:1,birim:"τεμ."},{ad:"Αλάτι, μαϊντανός",miktar:1,birim:"ανάλογα"}],
  adimlar:["Ψήστε τις μελιτζάνες στη φλόγα ή στο φούρνο.","Αφαιρέστε τη φλούδα.","Λιώστε με σκόρδο, λάδι και λεμόνι."],
  etiketler:["vegan","meze","düşük kalori","glutensiz","kolay"], onay:true },

{ ad:"Belgische Groenteschotel", ulke:"be", sure:30, porsiyon:4, zorluk:"kolay", kalPorsiyon:165, sporcu:false,
  adler:{tr:"Belçika Sebze Tabağı"},
  malzemeler:[{ad:"Witlof",miktar:4,birim:"stuk"},{ad:"Wortelen",miktar:2,birim:"stuk"},{ad:"Aardappelen",miktar:2,birim:"stuk"},{ad:"Olijfolie",miktar:1,birim:"el"},{ad:"Nootmuskaat, zout",miktar:1,birim:"n.s."}],
  adimlar:["Groenten koken tot gaar.","Besprenkelen met olie en nootmuskaat."],
  etiketler:["vegan","düşük kalori","glutensiz","kolay","kış"], onay:true },

{ ad:"Bigos Warzywny", ulke:"pl", sure:35, porsiyon:4, zorluk:"kolay", kalPorsiyon:175, sporcu:false,
  adler:{tr:"Polonya Vegan Bigos"},
  malzemeler:[{ad:"Kapusta kiszona",miktar:400,birim:"g"},{ad:"Świeża kapusta",miktar:200,birim:"g"},{ad:"Grzyby suszone",miktar:20,birim:"g"},{ad:"Cebula",miktar:1,birim:"szt"},{ad:"Olej",miktar:1,birim:"łyżka"},{ad:"Majeranek, sól, pieprz",miktar:1,birim:"do smaku"}],
  adimlar:["Namocz grzyby, pokrój.","Podsmaż cebulę, dodaj kapustę i grzyby.","Gotuj 25 minut."],
  etiketler:["vegan","ana yemek","kış","glutensiz"], onay:true },

{ ad:"Jáhlový Salát s Zeleninou", ulke:"cs", sure:20, porsiyon:2, zorluk:"kolay", kalPorsiyon:280, sporcu:false,
  adler:{tr:"Çek Darılı Sebze Salatası"},
  malzemeler:[{ad:"Jáhly",miktar:100,birim:"g"},{ad:"Okurka",miktar:1,birim:"ks"},{ad:"Rajče",miktar:2,birim:"ks"},{ad:"Olivový olej",miktar:1,birim:"polévková lžíce"},{ad:"Citronová šťáva, sůl",miktar:1,birim:"dle chuti"}],
  adimlar:["Uvařte jáhly 15 minut.","Smíchejte se zeleninou.","Ochutnejte olejem a citronem."],
  etiketler:["vegan","salata","düşük kalori","glutensiz","kolay"], onay:true },

{ ad:"Savanyúkáposzta Saláta", ulke:"hu", sure:10, porsiyon:4, zorluk:"kolay", kalPorsiyon:65, sporcu:false,
  adler:{tr:"Macar Lahana Turşusu Salatası"},
  malzemeler:[{ad:"Savanyú káposzta",miktar:400,birim:"g"},{ad:"Alma",miktar:1,birim:"db"},{ad:"Kömény",miktar:0.5,birim:"kk"},{ad:"Olívaolaj",miktar:1,birim:"ek"},{ad:"Só",miktar:1,birim:"ízlés"}],
  adimlar:["A káposztát egy tálba tedd.","Add hozzá az apróra vágott almát és köményt.","Keverd össze olívaolajjal."],
  etiketler:["vegan","salata","düşük kalori","hızlı","glutensiz","probiyotik"], onay:true },

{ ad:"Varza Călita", ulke:"ro", sure:30, porsiyon:4, zorluk:"kolay", kalPorsiyon:110, sporcu:false,
  adler:{tr:"Rumen Kavrulmuş Lahana"},
  malzemeler:[{ad:"Varză albă",miktar:700,birim:"g"},{ad:"Ceapă",miktar:1,birim:"bucată"},{ad:"Ulei",miktar:1,birim:"lingură"},{ad:"Boia, cimbru, sare",miktar:1,birim:"după gust"}],
  adimlar:["Tăiați varza fâșii subțiri.","Căliți ceapa, adăugați varza.","Gătiți 20 de minute amestecând."],
  etiketler:["vegan","düşük kalori","glutensiz","kış","kolay"], onay:true },

{ ad:"Pindakaas Groentewrap", ulke:"nl", sure:10, porsiyon:1, zorluk:"kolay", kalPorsiyon:340, sporcu:false,
  adler:{tr:"Hollanda Fıstık Ezmeli Sebze Dürümü"},
  malzemeler:[{ad:"Volkoren wrap",miktar:1,birim:"stuk"},{ad:"Pindakaas naturel",miktar:2,birim:"el"},{ad:"Komkommer",miktar:0.5,birim:"stuk"},{ad:"Wortel (geraspt)",miktar:1,birim:"stuk"},{ad:"Spinazie",miktar:30,birim:"g"}],
  adimlar:["Smeer pindakaas op de wrap.","Groenten erop leggen, oprollen."],
  etiketler:["vegan","lunch","hızlı","kolay"], onay:true },

// ══════════════════════════════════════
// EK SPESİYAL TARİFLER
// ══════════════════════════════════════
{ ad:"Zeytinyağlı Bezelye", ulke:"tr", sure:35, porsiyon:4, zorluk:"kolay", kalPorsiyon:195, sporcu:false,
  malzemeler:[{ad:"Taze Bezelye",miktar:500,birim:"g"},{ad:"Soğan",miktar:1,birim:"adet"},{ad:"Havuç",miktar:2,birim:"adet"},{ad:"Zeytinyağı",miktar:3,birim:"yemek kaşığı"},{ad:"Su",miktar:200,birim:"ml"},{ad:"Tuz, şeker",miktar:1,birim:"tutam"}],
  adimlar:["Soğanı yağda kavur.","Havuç ve bezelyeyi ekle.","Su ekle, kapakla 25 dakika pişir.","Soğuk servis et."],
  etiketler:["vegan","zeytinyağlı","düşük kalori","glutensiz","yaz"], onay:true },

{ ad:"Balkabağı Çorbası (Hindistan Cevizli)", ulke:"tr", sure:30, porsiyon:4, zorluk:"kolay", kalPorsiyon:185, sporcu:false,
  malzemeler:[{ad:"Balkabağı",miktar:700,birim:"g"},{ad:"Hindistan Cevizi Sütü",miktar:200,birim:"ml"},{ad:"Soğan",miktar:1,birim:"adet"},{ad:"Sarımsak",miktar:2,birim:"diş"},{ad:"Zencefil",miktar:1,birim:"cm"},{ad:"Köri Tozu",miktar:1,birim:"çay kaşığı"},{ad:"Zeytinyağı, tuz",miktar:1,birim:"tutam"}],
  adimlar:["Soğan, sarımsak, zencefili kavur.","Kabağı ekle, su ile kapla, 20 dakika pişir.","Hindistan cevizi sütü ekle, blenderdan geçir."],
  etiketler:["çorba","vegan","glutensiz","kış","kolay"], onay:true },

{ ad:"Acıbadem Kurabiyesi (Glutensiz)", ulke:"tr", sure:25, porsiyon:4, zorluk:"kolay", kalPorsiyon:210, sporcu:false,
  malzemeler:[{ad:"Badem Unu",miktar:200,birim:"g"},{ad:"Yumurta Beyazı",miktar:2,birim:"adet"},{ad:"Bal",miktar:2,birim:"yemek kaşığı"},{ad:"Badem Özü",miktar:1,birim:"çay kaşığı"},{ad:"Tuz",miktar:1,birim:"tutam"}],
  adimlar:["Tüm malzemeleri karıştır.","Küçük toplar yap, tepsiye diz.","170°C'de 12-15 dakika pişir."],
  etiketler:["vejetaryen","glutensiz","atıştırmalık","düşük kalori"], onay:true },

{ ad:"Sigara Böreği (Fırında, Az Yağlı)", ulke:"tr", sure:35, porsiyon:4, zorluk:"kolay", kalPorsiyon:245, sporcu:false,
  malzemeler:[{ad:"Yufka",miktar:4,birim:"adet"},{ad:"Beyaz Peynir",miktar:200,birim:"g"},{ad:"Maydanoz",miktar:0.5,birim:"demet"},{ad:"Zeytinyağı (az)",miktar:1,birim:"yemek kaşığı"}],
  adimlar:["Peynir ve maydanozu karıştır.","Yufkayı ince şeritler kes, doldur, sar.","Tepside çok az yağ sürülmüş halde 180°C'de 20 dakika pişir."],
  etiketler:["vejetaryen","düşük kalori","fırın","atıştırmalık"], onay:true },

{ ad:"Fırında Sebzeli Yulaf Topları", ulke:"tr", sure:25, porsiyon:4, zorluk:"kolay", kalPorsiyon:195, sporcu:true,
  malzemeler:[{ad:"Yulaf",miktar:150,birim:"g"},{ad:"Rendelenmiş Kabak",miktar:100,birim:"g"},{ad:"Yumurta",miktar:1,birim:"adet"},{ad:"Beyaz Peynir",miktar:50,birim:"g"},{ad:"Dereotu, tuz",miktar:1,birim:"tutam"}],
  adimlar:["Kabağı rendele, suyunu sık.","Tüm malzemeleri karıştır, toplar yap.","Yağlı kağıt serili tepsiye diz, 180°C'de 20 dakika pişir."],
  etiketler:["sporcu","vejetaryen","meal prep","hızlı"], onay:true },

{ ad:"Kremalı Mantar Çorbası (Az Yağlı)", ulke:"tr", sure:25, porsiyon:4, zorluk:"kolay", kalPorsiyon:145, sporcu:false,
  malzemeler:[{ad:"Mantar",miktar:400,birim:"g"},{ad:"Soğan",miktar:1,birim:"adet"},{ad:"Sebze Suyu",miktar:800,birim:"ml"},{ad:"Az Yağlı Süt",miktar:100,birim:"ml"},{ad:"Un",miktar:1,birim:"yemek kaşığı"},{ad:"Zeytinyağı, tuz, kekik",miktar:1,birim:"tutam"}],
  adimlar:["Soğan ve mantarı kavur.","Un ekle, 1 dakika pişir.","Sebze suyu ekle, 15 dakika kaynat.","Sütü ekle, blenderdan geçir."],
  etiketler:["çorba","düşük kalori","vejetaryen","hızlı","kolay"], onay:true },

{ ad:"Füstölt Lazac Tojással", ulke:"hu", sure:10, porsiyon:1, zorluk:"kolay", kalPorsiyon:335, sporcu:true,
  adler:{tr:"Macar Füme Somonlu Yumurta"},
  malzemeler:[{ad:"Tojás",miktar:2,birim:"db"},{ad:"Füstölt lazac",miktar:60,birim:"g"},{ad:"Tejföl",miktar:30,birim:"g"},{ad:"Kapor, só",miktar:1,birim:"ízlés"}],
  adimlar:["A tojást rántottára sütjük.","A lazacot és a tejfölt rárakjuk.","Friss kaporral szórjuk."],
  etiketler:["sporcu","kahvaltı","yüksek protein","hızlı","glutensiz"], onay:true },

{ ad:"Makreel Salade", ulke:"nl", sure:10, porsiyon:2, zorluk:"kolay", kalPorsiyon:310, sporcu:true,
  adler:{tr:"Hollanda Uskumru Salatası"},
  malzemeler:[{ad:"Gerookte makreel",miktar:200,birim:"g"},{ad:"Komkommer",miktar:1,birim:"stuk"},{ad:"Yoghurt",miktar:50,birim:"g"},{ad:"Citroen",miktar:0.5,birim:"stuk"},{ad:"Dille, zout",miktar:1,birim:"n.s."}],
  adimlar:["Makreel in stukjes trekken.","Met komkommer, yoghurt en citroen mengen.","Dille erover en serveren."],
  etiketler:["sporcu","yüksek protein","hızlı","glutensiz","omega-3"], onay:true },

{ ad:"Lõhesalat Kurgiga", ulke:"et", sure:10, porsiyon:2, zorluk:"kolay", kalPorsiyon:285, sporcu:true,
  adler:{tr:"Estonya Somon Salatası"},
  malzemeler:[{ad:"Suitsulõhe",miktar:150,birim:"g"},{ad:"Kurk",miktar:1,birim:"tk"},{ad:"Hapukoor",miktar:40,birim:"g"},{ad:"Till, sidrunimahl",miktar:1,birim:"maitse järgi"}],
  adimlar:["Tükelda lõhe ja kurk.","Sega hapukoore ja tilliga.","Lisa sidrunimahla."],
  etiketler:["sporcu","yüksek protein","hızlı","glutensiz","omega-3"], onay:true },

{ ad:"Rūkytos Žuvies Salotos", ulke:"lt", sure:10, porsiyon:2, zorluk:"kolay", kalPorsiyon:280, sporcu:true,
  adler:{tr:"Litvanya Tütsülenmiş Balık Salatası"},
  malzemeler:[{ad:"Rūkyta žuvis",miktar:150,birim:"g"},{ad:"Agurkas",miktar:1,birim:"vnt"},{ad:"Grietinė",miktar:40,birim:"g"},{ad:"Krapai, citrinos sultys",miktar:1,birim:"pagal skonį"}],
  adimlar:["Supjaustykite žuvį ir agurką.","Sumaišykite su grietine ir krapais.","Pagardinkite citrinos sultimis."],
  etiketler:["sporcu","yüksek protein","hızlı","glutensiz","omega-3"], onay:true },

{ ad:"Sveikatos Kokteilas", ulke:"lt", sure:5, porsiyon:1, zorluk:"kolay", kalPorsiyon:245, sporcu:true,
  adler:{tr:"Litvanya Sağlık Smoothie"},
  malzemeler:[{ad:"Bananai",miktar:1,birim:"vnt"},{ad:"Špinatai",miktar:60,birim:"g"},{ad:"Obuoliai",miktar:0.5,birim:"vnt"},{ad:"Vanduo",miktar:200,birim:"ml"},{ad:"Chia sėklos",miktar:1,birim:"v.š."}],
  adimlar:["Sudėkite viską į blenderį.","Frullate fino ad ottenere un composto liscio.","Gerkite tuoj pat."],
  etiketler:["sporcu","kahvaltı","vegan","hızlı","detoks"], onay:true },

{ ad:"Tervislik Smuuti", ulke:"et", sure:5, porsiyon:1, zorluk:"kolay", kalPorsiyon:240, sporcu:true,
  adler:{tr:"Estonya Sağlıklı Smoothie"},
  malzemeler:[{ad:"Banaan",miktar:1,birim:"tk"},{ad:"Spinat",miktar:60,birim:"g"},{ad:"Õun",miktar:0.5,birim:"tk"},{ad:"Vesi",miktar:200,birim:"ml"},{ad:"Chiaseemned",miktar:1,birim:"spl"}],
  adimlar:["Pane kõik blenderisse.","Blenderda sujuvaks.","Joo kohe."],
  etiketler:["sporcu","kahvaltı","vegan","hızlı","detoks"], onay:true },

{ ad:"Veselības Smūtijs", ulke:"lv", sure:5, porsiyon:1, zorluk:"kolay", kalPorsiyon:240, sporcu:true,
  adler:{tr:"Letonya Sağlık Smoothie"},
  malzemeler:[{ad:"Banāns",miktar:1,birim:"gab."},{ad:"Spināti",miktar:60,birim:"g"},{ad:"Ābols",miktar:0.5,birim:"gab."},{ad:"Ūdens",miktar:200,birim:"ml"},{ad:"Chia sēklas",miktar:1,birim:"ēdamkarote"}],
  adimlar:["Liec visu blenderī.","Miksē gludu.","Dzer uzreiz."],
  etiketler:["sporcu","kahvaltı","vegan","hızlı","detoks"], onay:true },

];

exports.handler = async () => {
  try {
    initFirebase();
    const db = admin.firestore();
    const batch = db.batch();
    for (const tarif of TARIFLER) {
      const ref = db.collection("tarifler").doc();
      batch.set(ref, { ...tarif, eklenme: admin.firestore.FieldValue.serverTimestamp() });
    }
    await batch.commit();
    return {
      statusCode: 200,
      body: JSON.stringify({ mesaj: `✅ ${TARIFLER.length} tarif eklendi.` }),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ hata: e.message }) };
  }
};
