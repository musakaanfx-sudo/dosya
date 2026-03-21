const admin = require("firebase-admin");

let initialized = false;
function initFirebase() {
  if (initialized) return;
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
  initialized = true;
}

const TARIFLER = [

// ════════════════════════════════════════════════════
// SPORCU / YÜKSEK PROTEİN (35 tarif)
// ════════════════════════════════════════════════════

// ── TR ──
{
  ad:"Izgara Tavuk & Kinoa Kasesi",
  adler:{tr:"Izgara Tavuk & Kinoa Kasesi",de:"Gegrilltes Hähnchen & Quinoa Bowl",en:"Grilled Chicken Quinoa Bowl"},
  ulke:"tr", sure:30, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:485, sporcu:true,
  malzemeler:[
    {ad:"Tavuk Göğsü",miktar:300,birim:"g"},
    {ad:"Kinoa",miktar:150,birim:"g"},
    {ad:"Cherry Domates",miktar:100,birim:"g"},
    {ad:"Roka",miktar:50,birim:"g"},
    {ad:"Zeytinyağı",miktar:1,birim:"yemek kaşığı"},
    {ad:"Limon suyu",miktar:1,birim:"adet"},
    {ad:"Tuz, karabiber, kekik",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Kinoayı 2 kat su ile 15 dakika haşlayın.",
    "Tavuğu tuz, karabiber, kekikle marine edip ızgarada her iki tarafı 6-7 dakika pişirin.",
    "Tavuğu dilimleyin. Kase: kinoa + roka + cherry domates + tavuk.",
    "Üzerine zeytinyağı ve limon sıkın.",
  ],
  etiketler:["sporcu","yüksek protein","öğle yemeği","glutensiz","kolay"],
  onay:true,
},
{
  ad:"Yumurtalı Avokado Tostu",
  adler:{tr:"Yumurtalı Avokado Tostu",de:"Avocado-Toast mit Ei",en:"Avocado Egg Toast"},
  ulke:"tr", sure:15, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:390, sporcu:true,
  malzemeler:[
    {ad:"Tam Buğday Ekmeği",miktar:2,birim:"dilim"},
    {ad:"Avokado",miktar:1,birim:"adet"},
    {ad:"Yumurta",miktar:2,birim:"adet"},
    {ad:"Limon suyu",miktar:0.5,birim:"adet"},
    {ad:"Pul biber, tuz",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Avokadoyu ezin, limon suyu ve tuz ekleyin.",
    "Yumurtaları haşlayın (yarım pişmiş veya sahanda).",
    "Ekmeği tost yapın, avokado ezip üzerine yumurta koyun.",
    "Pul biber ve tuz serpin.",
  ],
  etiketler:["kahvaltı","sporcu","hızlı","vejetaryen"],
  onay:true,
},
{
  ad:"Protein Smoothie Kasesi",
  adler:{tr:"Protein Smoothie Kasesi",de:"Protein-Smoothie-Bowl",en:"Protein Smoothie Bowl"},
  ulke:"tr", sure:10, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:420, sporcu:true,
  malzemeler:[
    {ad:"Dondurulmuş Muz",miktar:1,birim:"adet"},
    {ad:"Yunan Yoğurdu",miktar:150,birim:"g"},
    {ad:"Whey Protein Tozu",miktar:30,birim:"g"},
    {ad:"Süt veya Yulaf Sütü",miktar:100,birim:"ml"},
    {ad:"Granola",miktar:30,birim:"g"},
    {ad:"Yaban Mersini",miktar:50,birim:"g"},
    {ad:"Chia Tohumu",miktar:1,birim:"yemek kaşığı"},
  ],
  adimlar:[
    "Muz, yoğurt, protein tozu ve sütü blenderdan geçirin.",
    "Kaseye dökün. Granola, yaban mersini ve chia ekleyin.",
  ],
  etiketler:["kahvaltı","sporcu","yüksek protein","hızlı","vejetaryen"],
  onay:true,
},
{
  ad:"Izgara Somon & Buharda Brokoli",
  adler:{tr:"Izgara Somon & Buharda Brokoli",de:"Gegrillter Lachs mit Gedämpftem Brokkoli",en:"Grilled Salmon & Steamed Broccoli"},
  ulke:"tr", sure:25, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:520, sporcu:true,
  malzemeler:[
    {ad:"Somon Fileto",miktar:400,birim:"g"},
    {ad:"Brokoli",miktar:400,birim:"g"},
    {ad:"Zeytinyağı",miktar:2,birim:"yemek kaşığı"},
    {ad:"Sarımsak",miktar:2,birim:"diş"},
    {ad:"Limon",miktar:1,birim:"adet"},
    {ad:"Dereotu, tuz, karabiber",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Somonları zeytinyağı, sarımsak, dereotu, tuz ile marine edin.",
    "Brokoli buharında 8 dakika pişirin.",
    "Somonları ızgarada her taraf 4 dakika pişirin.",
    "Limon sıkarak servis yapın.",
  ],
  etiketler:["sporcu","yüksek protein","akşam yemeği","glutensiz","omega-3"],
  onay:true,
},
{
  ad:"Dana Kıymalı Sebzeli Sarma (Yufkasız)",
  adler:{tr:"Dana Kıymalı Sebzeli Sarma",en:"Lettuce Wrapped Beef"},
  ulke:"tr", sure:20, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:310, sporcu:true,
  malzemeler:[
    {ad:"Dana Kıyma (yağsız)",miktar:300,birim:"g"},
    {ad:"Marul Yaprakları",miktar:8,birim:"adet"},
    {ad:"Domates",miktar:1,birim:"adet"},
    {ad:"Soğan",miktar:0.5,birim:"adet"},
    {ad:"Zeytinyağı",miktar:1,birim:"yemek kaşığı"},
    {ad:"Kimyon, tuz, pul biber",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Soğanı yağda kavur, kıymayı ekle, baharatlarla pişir.",
    "Marul yapraklarına kıyma, domates ve soğan doldur.",
    "Dürüm gibi sarın.",
  ],
  etiketler:["sporcu","yüksek protein","hızlı","düşük karb","glutensiz"],
  onay:true,
},

// ── DE ──
{
  ad:"Hähnchen-Gemüse-Pfanne",
  adler:{tr:"Tavuk Sebze Tavası",de:"Hähnchen-Gemüse-Pfanne",en:"Chicken Veggie Stir Fry"},
  ulke:"de", sure:20, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:380, sporcu:true,
  malzemeler:[
    {ad:"Hähnchenbrust",miktar:300,birim:"g"},
    {ad:"Brokkoli",miktar:200,birim:"g"},
    {ad:"Paprika",miktar:2,birim:"Stück"},
    {ad:"Zucchini",miktar:1,birim:"Stück"},
    {ad:"Olivenöl",miktar:2,birim:"EL"},
    {ad:"Knoblauch",miktar:2,birim:"Zehen"},
    {ad:"Salz, Pfeffer, Paprikapulver",miktar:1,birim:"Prise"},
  ],
  adimlar:[
    "Hähnchen würfeln, im heißen Öl 5 Minuten anbraten.",
    "Gemüse zugeben, 8 Minuten unter Rühren garen.",
    "Knoblauch, Salz, Pfeffer und Paprika würzen.",
  ],
  etiketler:["sporcu","yüksek protein","hızlı","glutensiz","kolay"],
  onay:true,
},
{
  ad:"Magerquark mit Beeren & Nüssen",
  adler:{tr:"Meyveli Fındıklı Yağsız Quark",de:"Magerquark mit Beeren & Nüssen",en:"Quark with Berries & Nuts"},
  ulke:"de", sure:5, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:310, sporcu:true,
  malzemeler:[
    {ad:"Magerquark",miktar:250,birim:"g"},
    {ad:"Blaubeeren",miktar:80,birim:"g"},
    {ad:"Walnüsse",miktar:20,birim:"g"},
    {ad:"Honig",miktar:1,birim:"TL"},
    {ad:"Leinsamen",miktar:1,birim:"EL"},
  ],
  adimlar:[
    "Quark in eine Schüssel geben.",
    "Beeren, Nüsse und Leinsamen darüber verteilen.",
    "Mit Honig beträufeln.",
  ],
  etiketler:["kahvaltı","sporcu","yüksek protein","vejetaryen","hızlı"],
  onay:true,
},

// ── EN ──
{
  ad:"Overnight Oats (High Protein)",
  adler:{tr:"Gece Hazırlanan Yulaf",de:"Protein-Overnight-Oats",en:"High Protein Overnight Oats"},
  ulke:"en", sure:5, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:445, sporcu:true,
  malzemeler:[
    {ad:"Rolled Oats",miktar:80,birim:"g"},
    {ad:"Greek Yogurt",miktar:100,birim:"g"},
    {ad:"Milk or Oat Milk",miktar:150,birim:"ml"},
    {ad:"Whey Protein Powder",miktar:25,birim:"g"},
    {ad:"Chia Seeds",miktar:1,birim:"tbsp"},
    {ad:"Banana",miktar:0.5,birim:"adet"},
    {ad:"Almond Butter",miktar:1,birim:"tbsp"},
  ],
  adimlar:[
    "Mix oats, yogurt, milk, protein powder and chia seeds in a jar.",
    "Stir well, cover and refrigerate overnight.",
    "Top with banana slices and almond butter before serving.",
  ],
  etiketler:["kahvaltı","sporcu","yüksek protein","vejetaryen","meal prep"],
  onay:true,
},
{
  ad:"Tuna Sweetcorn Rice Cakes",
  adler:{tr:"Ton Balıklı Pirinç Galeti",de:"Thunfisch-Mais-Reiswaffeln",en:"Tuna Sweetcorn Rice Cakes"},
  ulke:"en", sure:5, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:285, sporcu:true,
  malzemeler:[
    {ad:"Rice Cakes",miktar:4,birim:"adet"},
    {ad:"Tinned Tuna in Water",miktar:120,birim:"g"},
    {ad:"Sweetcorn",miktar:50,birim:"g"},
    {ad:"Greek Yogurt",miktar:30,birim:"g"},
    {ad:"Lemon juice, salt, pepper",miktar:1,birim:"pinch"},
  ],
  adimlar:[
    "Mix tuna, sweetcorn and yogurt. Season with lemon, salt, pepper.",
    "Spread on rice cakes and serve.",
  ],
  etiketler:["sporcu","atıştırmalık","yüksek protein","hızlı","düşük kalori"],
  onay:true,
},
{
  ad:"Egg White Omelette with Spinach",
  adler:{tr:"Ispanaklı Yumurta Beyazı Omleti",de:"Eiweißomelett mit Spinat",en:"Egg White Omelette with Spinach"},
  ulke:"en", sure:10, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:195, sporcu:true,
  malzemeler:[
    {ad:"Egg Whites",miktar:5,birim:"adet"},
    {ad:"Spinach",miktar:80,birim:"g"},
    {ad:"Cherry Tomatoes",miktar:60,birim:"g"},
    {ad:"Low-fat Feta",miktar:30,birim:"g"},
    {ad:"Olive oil spray",miktar:1,birim:"spray"},
    {ad:"Salt, pepper, herbs",miktar:1,birim:"pinch"},
  ],
  adimlar:[
    "Whisk egg whites with salt and pepper.",
    "Sauté spinach in sprayed pan for 2 minutes.",
    "Pour egg whites over, cook 3 minutes.",
    "Add tomatoes and feta, fold and serve.",
  ],
  etiketler:["kahvaltı","sporcu","yüksek protein","düşük kalori","glutensiz","hızlı"],
  onay:true,
},

// ── IT ──
{
  ad:"Pollo alla Griglia con Verdure",
  adler:{tr:"Izgara Tavuk ve Sebzeler",de:"Gegrilltes Hähnchen mit Gemüse",en:"Grilled Chicken with Veggies",it:"Pollo alla Griglia con Verdure"},
  ulke:"it", sure:30, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:360, sporcu:true,
  malzemeler:[
    {ad:"Petto di Pollo",miktar:400,birim:"g"},
    {ad:"Zucchine",miktar:2,birim:"pezzi"},
    {ad:"Peperoni",miktar:2,birim:"pezzi"},
    {ad:"Olio d'oliva",miktar:2,birim:"cucchiai"},
    {ad:"Limone",miktar:1,birim:"pezzo"},
    {ad:"Rosmarino, sale, pepe",miktar:1,birim:"q.b."},
  ],
  adimlar:[
    "Marinare il pollo con olio, limone e rosmarino 15 minuti.",
    "Grigliare 6-7 minuti per lato.",
    "Grigliare le verdure a strisce 5 minuti.",
    "Servire con limone.",
  ],
  etiketler:["sporcu","yüksek protein","glutensiz","kolay"],
  onay:true,
},
{
  ad:"Insalata di Tonno e Fagioli",
  adler:{tr:"Ton Balığı ve Fasulye Salatası",de:"Thunfisch-Bohnen-Salat",en:"Tuna and Bean Salad",it:"Insalata di Tonno e Fagioli"},
  ulke:"it", sure:10, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:340, sporcu:true,
  malzemeler:[
    {ad:"Tonno in acqua",miktar:240,birim:"g"},
    {ad:"Fagioli bianchi",miktar:240,birim:"g"},
    {ad:"Cipolla rossa",miktar:0.5,birim:"pezzo"},
    {ad:"Prezzemolo",miktar:1,birim:"mazzetto"},
    {ad:"Olio d'oliva",miktar:2,birim:"cucchiai"},
    {ad:"Limone, sale, pepe",miktar:1,birim:"q.b."},
  ],
  adimlar:[
    "Scola il tonno e i fagioli.",
    "Trita la cipolla e il prezzemolo.",
    "Mescola tutto con olio e limone.",
  ],
  etiketler:["sporcu","yüksek protein","hızlı","glutensiz","kolay"],
  onay:true,
},

// ── EL ──
{
  ad:"Κοτόπουλο με Λαχανικά στο Φούρνο",
  adler:{tr:"Fırında Tavuk ve Sebzeler",de:"Hähnchen mit Gemüse im Ofen",en:"Baked Chicken with Vegetables",el:"Κοτόπουλο με Λαχανικά στο Φούρνο"},
  ulke:"el", sure:45, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:410, sporcu:true,
  malzemeler:[
    {ad:"Μπούτια κοτόπουλου",miktar:800,birim:"g"},
    {ad:"Πατάτες",miktar:400,birim:"g"},
    {ad:"Πιπεριές",miktar:2,birim:"τεμ."},
    {ad:"Ντομάτες",miktar:2,birim:"τεμ."},
    {ad:"Ελαιόλαδο",miktar:3,birim:"κ.σ."},
    {ad:"Σκόρδο, ρίγανη, αλάτι",miktar:1,birim:"ανάλογα"},
  ],
  adimlar:[
    "Κόψτε τα λαχανικά σε κομμάτια και απλώστε στο ταψί.",
    "Βάλτε το κοτόπουλο από πάνω, ραντίστε με λάδι και ρίγανη.",
    "Ψήστε στους 200°C για 40 λεπτά.",
  ],
  etiketler:["sporcu","yüksek protein","fırın","glutensiz"],
  onay:true,
},

// ── FR ──
{
  ad:"Salade Niçoise Protéinée",
  adler:{tr:"Niçoise Protein Salatası",de:"Proteinreicher Niçoise-Salat",en:"High Protein Niçoise Salad",fr:"Salade Niçoise Protéinée"},
  ulke:"fr", sure:20, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:420, sporcu:true,
  malzemeler:[
    {ad:"Thon en conserve",miktar:240,birim:"g"},
    {ad:"Oeufs durs",miktar:3,birim:"pièces"},
    {ad:"Haricots verts",miktar:200,birim:"g"},
    {ad:"Tomates cerises",miktar:150,birim:"g"},
    {ad:"Olives noires",miktar:50,birim:"g"},
    {ad:"Huile d'olive",miktar:2,birim:"c.à.s."},
    {ad:"Vinaigre, sel, poivre",miktar:1,birim:"q.s."},
  ],
  adimlar:[
    "Cuire les haricots verts 5 minutes, refroidir.",
    "Couper les oeufs durs en quartiers.",
    "Dresser tous les ingrédients en salade.",
    "Assaisonner avec huile, vinaigre, sel et poivre.",
  ],
  etiketler:["sporcu","yüksek protein","öğle yemeği","glutensiz","düşük kalori"],
  onay:true,
},
{
  ad:"Poulet Mariné Citron-Herbes",
  adler:{tr:"Limon Otlu Marine Tavuk",de:"Zitronen-Kräuter-Hähnchen",en:"Lemon Herb Marinated Chicken",fr:"Poulet Mariné Citron-Herbes"},
  ulke:"fr", sure:35, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:340, sporcu:true,
  malzemeler:[
    {ad:"Blancs de poulet",miktar:400,birim:"g"},
    {ad:"Citron",miktar:1,birim:"pièce"},
    {ad:"Huile d'olive",miktar:2,birim:"c.à.s."},
    {ad:"Thym, romarin, ail",miktar:1,birim:"q.s."},
    {ad:"Sel, poivre",miktar:1,birim:"q.s."},
  ],
  adimlar:[
    "Mariner le poulet 20 minutes avec citron, huile, herbes et ail.",
    "Cuire à la poêle 6-7 minutes de chaque côté.",
    "Servir avec légumes vapeur.",
  ],
  etiketler:["sporcu","yüksek protein","hızlı","glutensiz"],
  onay:true,
},

// ── ES ──
{
  ad:"Ensalada de Pollo y Garbanzos",
  adler:{tr:"Tavuk ve Nohutlu Salata",de:"Hähnchen-Kichererbsen-Salat",en:"Chicken & Chickpea Salad",es:"Ensalada de Pollo y Garbanzos"},
  ulke:"es", sure:15, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:450, sporcu:true,
  malzemeler:[
    {ad:"Pechuga de pollo cocida",miktar:300,birim:"g"},
    {ad:"Garbanzos cocidos",miktar:200,birim:"g"},
    {ad:"Espinacas baby",miktar:100,birim:"g"},
    {ad:"Tomates cherry",miktar:100,birim:"g"},
    {ad:"Aceite de oliva",miktar:2,birim:"c.s."},
    {ad:"Limón, sal, comino",miktar:1,birim:"al gusto"},
  ],
  adimlar:[
    "Desmenuzar el pollo cocido.",
    "Mezclar pollo, garbanzos, espinacas y tomates.",
    "Aliñar con aceite, limón, sal y comino.",
  ],
  etiketler:["sporcu","yüksek protein","öğle yemeği","glutensiz","kolay"],
  onay:true,
},

// ── NO ──
{
  ad:"Laks med Quinoa og Grønnsaker",
  adler:{tr:"Somonlu Kinoa ve Sebzeler",de:"Lachs mit Quinoa und Gemüse",en:"Salmon with Quinoa & Vegetables",no:"Laks med Quinoa og Grønnsaker"},
  ulke:"no", sure:30, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:510, sporcu:true,
  malzemeler:[
    {ad:"Laksefilet",miktar:400,birim:"g"},
    {ad:"Quinoa",miktar:150,birim:"g"},
    {ad:"Brokkoli",miktar:200,birim:"g"},
    {ad:"Sitron",miktar:1,birim:"stk"},
    {ad:"Olivenolje",miktar:2,birim:"ss"},
    {ad:"Dill, salt, pepper",miktar:1,birim:"etter smak"},
  ],
  adimlar:[
    "Kok quinoaen i 15 minutter.",
    "Damp brokkolien i 8 minutter.",
    "Stek laksen i olje 4-5 minutter per side.",
    "Server med sitron og dill.",
  ],
  etiketler:["sporcu","yüksek protein","omega-3","glutensiz","kolay"],
  onay:true,
},

// ── SV ──
{
  ad:"Kycklinggryta med Sötpotatis",
  adler:{tr:"Tavuk Tatlı Patates Güveci",de:"Hähnchen-Süßkartoffel-Eintopf",en:"Chicken Sweet Potato Stew",sv:"Kycklinggryta med Sötpotatis"},
  ulke:"sv", sure:35, porsiyon:3, zorluk:"kolay",
  kalPorsiyon:430, sporcu:true,
  malzemeler:[
    {ad:"Kycklingfilé",miktar:400,birim:"g"},
    {ad:"Sötpotatis",miktar:400,birim:"g"},
    {ad:"Kokosmjölk",miktar:200,birim:"ml"},
    {ad:"Curry",miktar:2,birim:"tsk"},
    {ad:"Lök, vitlök",miktar:1,birim:"stk"},
    {ad:"Olja, salt",miktar:1,birim:"q.s."},
  ],
  adimlar:[
    "Fräs lök och vitlök i olja. Tillsätt curry.",
    "Lägg i kycklingtärningar och sötpotatistärningar.",
    "Häll på kokosmjölk och låt sjuda 20 minuter.",
  ],
  etiketler:["sporcu","yüksek protein","glutensiz","kış"],
  onay:true,
},

// ── PL ──
{
  ad:"Kurczak z Kaszą Gryczaną",
  adler:{tr:"Karabuğdaylı Tavuk",de:"Hähnchen mit Buchweizen",en:"Chicken with Buckwheat",pl:"Kurczak z Kaszą Gryczaną"},
  ulke:"pl", sure:35, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:460, sporcu:true,
  malzemeler:[
    {ad:"Pierś kurczaka",miktar:350,birim:"g"},
    {ad:"Kasza gryczana",miktar:150,birim:"g"},
    {ad:"Cebula",miktar:1,birim:"szt"},
    {ad:"Marchewka",miktar:1,birim:"szt"},
    {ad:"Olej rzepakowy",miktar:2,birim:"łyżki"},
    {ad:"Czosnek, sól, tymianek",miktar:1,birim:"do smaku"},
  ],
  adimlar:[
    "Ugotuj kaszę gryczaną 15 minut.",
    "Podsmaż cebulę i marchewkę na oleju.",
    "Dodaj pokrojonego kurczaka, smaż do zrumienienia.",
    "Podawaj razem z kaszą.",
  ],
  etiketler:["sporcu","yüksek protein","glutensiz","kolay"],
  onay:true,
},

// ════════════════════════════════════════════════════
// KİLO VERME / DÜŞÜK KALORİ (30 tarif)
// ════════════════════════════════════════════════════

// ── TR ──
{
  ad:"Zeytinyağlı Mercimek Çorbası",
  adler:{tr:"Zeytinyağlı Mercimek Çorbası",en:"Light Lentil Soup"},
  ulke:"tr", sure:30, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:195, sporcu:false,
  malzemeler:[
    {ad:"Kırmızı Mercimek",miktar:200,birim:"g"},
    {ad:"Soğan",miktar:1,birim:"adet"},
    {ad:"Havuç",miktar:1,birim:"adet"},
    {ad:"Zeytinyağı",miktar:1,birim:"yemek kaşığı"},
    {ad:"Su",miktar:1500,birim:"ml"},
    {ad:"Kimyon, tuz, nane",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Soğan ve havucu zeytinyağında kavur.",
    "Mercimeği ekle, suyla kapla.",
    "20 dakika haşla, blenderdan geçir.",
    "Nane ve kimyonla servis yap.",
  ],
  etiketler:["çorba","düşük kalori","vegan","kolay","glutensiz"],
  onay:true,
},
{
  ad:"Sebzeli Nohut Salatası",
  adler:{tr:"Sebzeli Nohut Salatası",en:"Chickpea Veggie Salad"},
  ulke:"tr", sure:10, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:280, sporcu:false,
  malzemeler:[
    {ad:"Konserve Nohut",miktar:240,birim:"g"},
    {ad:"Salatalık",miktar:1,birim:"adet"},
    {ad:"Domates",miktar:2,birim:"adet"},
    {ad:"Kırmızı Soğan",miktar:0.5,birim:"adet"},
    {ad:"Maydanoz",miktar:0.5,birim:"demet"},
    {ad:"Zeytinyağı",miktar:1,birim:"yemek kaşığı"},
    {ad:"Limon, tuz, sumak",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Tüm sebzeleri doğrayın.",
    "Nohutla karıştırın.",
    "Zeytinyağı, limon ve sumakla tatlandırın.",
  ],
  etiketler:["salata","düşük kalori","vegan","hızlı","glutensiz"],
  onay:true,
},
{
  ad:"Kabak Dolması (Az Yağlı)",
  adler:{tr:"Az Yağlı Kabak Dolması",en:"Light Stuffed Zucchini"},
  ulke:"tr", sure:50, porsiyon:4, zorluk:"orta",
  kalPorsiyon:220, sporcu:false,
  malzemeler:[
    {ad:"Kabak",miktar:4,birim:"adet"},
    {ad:"Yağsız Kıyma",miktar:200,birim:"g"},
    {ad:"Pirinç",miktar:50,birim:"g"},
    {ad:"Domates",miktar:2,birim:"adet"},
    {ad:"Soğan",miktar:1,birim:"adet"},
    {ad:"Maydanoz, tuz, nane",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Kabakları oyup içini boşaltın.",
    "Kıyma, pirinç, soğan, baharatları karıştırın, doldurun.",
    "Üzerine domates rendesi dökün, kapakla 35 dakika pişirin.",
  ],
  etiketler:["ana yemek","düşük kalori","glutensiz"],
  onay:true,
},
{
  ad:"Ispanaklı Yumurta (Çılbır Style)",
  adler:{tr:"Ispanaklı Yumurta",en:"Spinach Poached Eggs"},
  ulke:"tr", sure:15, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:245, sporcu:false,
  malzemeler:[
    {ad:"Yumurta",miktar:2,birim:"adet"},
    {ad:"Ispanak",miktar:100,birim:"g"},
    {ad:"Sarımsak",miktar:1,birim:"diş"},
    {ad:"Yağsız Yoğurt",miktar:100,birim:"g"},
    {ad:"Zeytinyağı",miktar:1,birim:"çay kaşığı"},
    {ad:"Tuz, pul biber",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Sarımsağı zeytinyağında kavur, ıspanağı ekle 3 dakika pişir.",
    "Yumurtaları haşla veya sahanda pişir.",
    "Tabağa yoğurt, ıspanak ve yumurta koy.",
    "Pul biberli zeytinyağı gezdir.",
  ],
  etiketler:["kahvaltı","düşük kalori","vejetaryen","hızlı","glutensiz"],
  onay:true,
},

// ── DE ──
{
  ad:"Gemüsesuppe mit Linsen",
  adler:{tr:"Mercimekli Sebze Çorbası",de:"Gemüsesuppe mit Linsen",en:"Veggie Lentil Soup"},
  ulke:"de", sure:35, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:210, sporcu:false,
  malzemeler:[
    {ad:"Rote Linsen",miktar:150,birim:"g"},
    {ad:"Möhren",miktar:2,birim:"Stück"},
    {ad:"Sellerie",miktar:2,birim:"Stangen"},
    {ad:"Zwiebel",miktar:1,birim:"Stück"},
    {ad:"Tomaten (Dose)",miktar:400,birim:"g"},
    {ad:"Gemüsebrühe",miktar:1000,birim:"ml"},
    {ad:"Kurkuma, Kümmel, Salz",miktar:1,birim:"Prise"},
  ],
  adimlar:[
    "Zwiebel, Möhren und Sellerie in Öl andünsten.",
    "Linsen und Tomaten zugeben, mit Brühe aufgießen.",
    "30 Minuten köcheln lassen.",
    "Mit Kurkuma und Kümmel würzen.",
  ],
  etiketler:["çorba","düşük kalori","vegan","glutensiz","kolay"],
  onay:true,
},

// ── FR ──
{
  ad:"Soupe de Légumes Détox",
  adler:{tr:"Detoks Sebze Çorbası",de:"Detox-Gemüsesuppe",en:"Detox Veggie Soup",fr:"Soupe de Légumes Détox"},
  ulke:"fr", sure:30, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:145, sporcu:false,
  malzemeler:[
    {ad:"Courgettes",miktar:2,birim:"pièces"},
    {ad:"Carottes",miktar:2,birim:"pièces"},
    {ad:"Poireaux",miktar:1,birim:"pièce"},
    {ad:"Bouillon de légumes",miktar:1000,birim:"ml"},
    {ad:"Gingembre frais",miktar:1,birim:"morceau"},
    {ad:"Citron, sel",miktar:1,birim:"q.s."},
  ],
  adimlar:[
    "Couper les légumes en morceaux.",
    "Cuire dans le bouillon 20 minutes.",
    "Mixer avec le gingembre.",
    "Ajouter le jus de citron.",
  ],
  etiketler:["çorba","düşük kalori","vegan","detoks","glutensiz"],
  onay:true,
},
{
  ad:"Salade de Chou Rouge Légère",
  adler:{tr:"Hafif Kırmızı Lahana Salatası",de:"Leichter Rotkohl-Salat",en:"Light Red Cabbage Salad",fr:"Salade de Chou Rouge Légère"},
  ulke:"fr", sure:10, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:120, sporcu:false,
  malzemeler:[
    {ad:"Chou rouge",miktar:300,birim:"g"},
    {ad:"Pomme verte",miktar:1,birim:"pièce"},
    {ad:"Vinaigre de cidre",miktar:2,birim:"c.à.s."},
    {ad:"Huile d'olive",miktar:1,birim:"c.à.s."},
    {ad:"Sel, poivre, cumin",miktar:1,birim:"q.s."},
  ],
  adimlar:[
    "Émincer finement le chou rouge.",
    "Couper la pomme en fins bâtonnets.",
    "Mélanger avec vinaigre, huile, sel, poivre et cumin.",
  ],
  etiketler:["salata","düşük kalori","vegan","hızlı","glutensiz"],
  onay:true,
},

// ── IT ──
{
  ad:"Zuppa di Verdure Leggera",
  adler:{tr:"Hafif İtalyan Sebze Çorbası",de:"Leichte Italienische Gemüsesuppe",en:"Light Italian Vegetable Soup",it:"Zuppa di Verdure Leggera"},
  ulke:"it", sure:30, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:130, sporcu:false,
  malzemeler:[
    {ad:"Zucchine",miktar:2,birim:"pezzi"},
    {ad:"Carote",miktar:2,birim:"pezzi"},
    {ad:"Sedano",miktar:2,birim:"gambi"},
    {ad:"Pomodori",miktar:2,birim:"pezzi"},
    {ad:"Brodo vegetale",miktar:1000,birim:"ml"},
    {ad:"Basilico, sale, pepe",miktar:1,birim:"q.b."},
  ],
  adimlar:[
    "Tagliare le verdure a cubetti.",
    "Cuocere nel brodo 20 minuti.",
    "Aggiungere il basilico fresco.",
  ],
  etiketler:["çorba","düşük kalori","vegan","glutensiz","kolay"],
  onay:true,
},

// ── ES ──
{
  ad:"Gazpacho Andaluz",
  adler:{tr:"Gazpacho (Soğuk Domates Çorbası)",de:"Gazpacho",en:"Andalusian Gazpacho",es:"Gazpacho Andaluz"},
  ulke:"es", sure:15, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:115, sporcu:false,
  malzemeler:[
    {ad:"Tomates maduros",miktar:800,birim:"g"},
    {ad:"Pepino",miktar:0.5,birim:"pieza"},
    {ad:"Pimiento verde",miktar:0.5,birim:"pieza"},
    {ad:"Diente de ajo",miktar:1,birim:"pieza"},
    {ad:"Pan (un trozo)",miktar:50,birim:"g"},
    {ad:"Aceite de oliva",miktar:3,birim:"c.s."},
    {ad:"Vinagre, sal",miktar:1,birim:"al gusto"},
  ],
  adimlar:[
    "Remojar el pan en agua 5 minutos.",
    "Triturar todos los ingredientes.",
    "Colar y refrigerar mínimo 1 hora.",
    "Servir muy frío.",
  ],
  etiketler:["çorba","düşük kalori","vegan","soğuk","yaz"],
  onay:true,
},

// ── EL ──
{
  ad:"Χωριάτικη Σαλάτα (Ελαφριά)",
  adler:{tr:"Yunan Salatası (Hafif)",de:"Griechischer Salat Leicht",en:"Light Greek Salad",el:"Χωριάτικη Σαλάτα"},
  ulke:"el", sure:10, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:195, sporcu:false,
  malzemeler:[
    {ad:"Ντομάτες",miktar:3,birim:"τεμ."},
    {ad:"Αγγούρι",miktar:1,birim:"τεμ."},
    {ad:"Κρεμμύδι",miktar:0.5,birim:"τεμ."},
    {ad:"Φέτα",miktar:80,birim:"g"},
    {ad:"Ελιές",miktar:30,birim:"g"},
    {ad:"Ελαιόλαδο",miktar:1,birim:"κ.σ."},
    {ad:"Ρίγανη, αλάτι",miktar:1,birim:"ανάλογα"},
  ],
  adimlar:[
    "Κόψτε τα λαχανικά χοντροκομμένα.",
    "Βάλτε φέτα και ελιές.",
    "Περιχύστε λάδι, ρίγανη, αλάτι.",
  ],
  etiketler:["salata","düşük kalori","vejetaryen","hızlı","glutensiz"],
  onay:true,
},

// ── NO ──
{
  ad:"Torsk med Grønnsaker",
  adler:{tr:"Morina Balığı ve Sebzeler",de:"Kabeljau mit Gemüse",en:"Cod with Vegetables",no:"Torsk med Grønnsaker"},
  ulke:"no", sure:25, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:240, sporcu:false,
  malzemeler:[
    {ad:"Torskefilet",miktar:400,birim:"g"},
    {ad:"Brokkoli",miktar:200,birim:"g"},
    {ad:"Gulrot",miktar:2,birim:"stk"},
    {ad:"Sitron",miktar:1,birim:"stk"},
    {ad:"Olivenolje",miktar:1,birim:"ss"},
    {ad:"Dill, salt, pepper",miktar:1,birim:"etter smak"},
  ],
  adimlar:[
    "Damp grønnsakene 8 minutter.",
    "Stek torsken i olje 3-4 minutter per side.",
    "Server med sitron og dill.",
  ],
  etiketler:["düşük kalori","yüksek protein","glutensiz","hızlı"],
  onay:true,
},

// ════════════════════════════════════════════════════
// SAĞLIKLI KAHVALTILAR (25 tarif)
// ════════════════════════════════════════════════════

// ── TR ──
{
  ad:"Yoğurtlu Granola Kasesi",
  adler:{tr:"Yoğurtlu Granola Kasesi",de:"Joghurt-Granola-Bowl",en:"Yogurt Granola Bowl"},
  ulke:"tr", sure:5, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:380, sporcu:false,
  malzemeler:[
    {ad:"Yunan Yoğurdu",miktar:200,birim:"g"},
    {ad:"Granola (Bal-Fındıklı)",miktar:40,birim:"g"},
    {ad:"Taze Meyve",miktar:100,birim:"g"},
    {ad:"Bal",miktar:1,birim:"çay kaşığı"},
    {ad:"Chia Tohumu",miktar:1,birim:"çay kaşığı"},
  ],
  adimlar:[
    "Yoğurdu kaseye koyun.",
    "Granola ve meyveleri üzerine ekleyin.",
    "Bal ve chia tohumu serpin.",
  ],
  etiketler:["kahvaltı","vejetaryen","hızlı","kolay"],
  onay:true,
},
{
  ad:"Menemen (Az Yağlı)",
  adler:{tr:"Az Yağlı Menemen",de:"Menemen (Türkisches Eiergericht)",en:"Turkish Eggs (Menemen)"},
  ulke:"tr", sure:15, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:215, sporcu:false,
  malzemeler:[
    {ad:"Yumurta",miktar:3,birim:"adet"},
    {ad:"Domates",miktar:2,birim:"adet"},
    {ad:"Yeşil Biber",miktar:2,birim:"adet"},
    {ad:"Soğan",miktar:0.5,birim:"adet"},
    {ad:"Zeytinyağı",miktar:1,birim:"çay kaşığı"},
    {ad:"Tuz, karabiber",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Soğan ve biberi zeytinyağında 3 dakika kavur.",
    "Domatesleri ekle, 5 dakika pişir.",
    "Yumurtaları ekle, karıştırarak pişir.",
  ],
  etiketler:["kahvaltı","vejetaryen","hızlı","düşük kalori"],
  onay:true,
},
{
  ad:"Süzme Peynirli Tam Buğday Ekmek",
  adler:{tr:"Süzme Peynirli Tost",en:"Cottage Cheese Wholegrain Toast"},
  ulke:"tr", sure:5, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:290, sporcu:false,
  malzemeler:[
    {ad:"Tam Buğday Ekmeği",miktar:2,birim:"dilim"},
    {ad:"Süzme Peynir",miktar:80,birim:"g"},
    {ad:"Domates",miktar:0.5,birim:"adet"},
    {ad:"Salatalık",miktar:0.5,birim:"adet"},
    {ad:"Zeytinyağı, tuz, kekik",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Ekmeği tost yapın.",
    "Üzerine süzme peynir sürün.",
    "Domates, salatalık dilimleri koyun.",
    "Zeytinyağı ve kekikle tatlandırın.",
  ],
  etiketler:["kahvaltı","vejetaryen","hızlı","düşük kalori"],
  onay:true,
},

// ── DE ──
{
  ad:"Bircher Müsli",
  adler:{tr:"Bircher Müsli",de:"Bircher Müsli",en:"Bircher Muesli"},
  ulke:"de", sure:10, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:340, sporcu:false,
  malzemeler:[
    {ad:"Haferflocken",miktar:80,birim:"g"},
    {ad:"Milch oder Hafermilch",miktar:200,birim:"ml"},
    {ad:"Joghurt",miktar:100,birim:"g"},
    {ad:"Apfel",miktar:1,birim:"Stück"},
    {ad:"Zitronensaft",miktar:0.5,birim:"Stück"},
    {ad:"Honig",miktar:1,birim:"TL"},
    {ad:"Nüsse",miktar:20,birim:"g"},
  ],
  adimlar:[
    "Haferflocken mit Milch und Joghurt mischen.",
    "Apfel reiben, mit Zitronensaft unterrühren.",
    "Über Nacht kühlen oder 30 Minuten quellen lassen.",
    "Mit Nüssen und Honig servieren.",
  ],
  etiketler:["kahvaltı","vejetaryen","meal prep","kolay"],
  onay:true,
},
{
  ad:"Rührei mit Gemüse",
  adler:{tr:"Sebzeli Çırpılmış Yumurta",de:"Rührei mit Gemüse",en:"Scrambled Eggs with Vegetables"},
  ulke:"de", sure:10, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:245, sporcu:false,
  malzemeler:[
    {ad:"Eier",miktar:3,birim:"Stück"},
    {ad:"Spinat",miktar:80,birim:"g"},
    {ad:"Kirschtomaten",miktar:80,birim:"g"},
    {ad:"Butter",miktar:5,birim:"g"},
    {ad:"Salz, Pfeffer",miktar:1,birim:"Prise"},
  ],
  adimlar:[
    "Butter in Pfanne schmelzen, Spinat kurz anwilken.",
    "Eier verquirlen, zugeben und stocken lassen.",
    "Tomaten zugeben, mit Salz und Pfeffer abschmecken.",
  ],
  etiketler:["kahvaltı","vejetaryen","hızlı","düşük kalori","glutensiz"],
  onay:true,
},

// ── EN ──
{
  ad:"Porridge with Berries & Seeds",
  adler:{tr:"Meyveli Tohumlu Yulaf Lapası",de:"Porridge mit Beeren und Samen",en:"Porridge with Berries & Seeds"},
  ulke:"en", sure:10, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:365, sporcu:false,
  malzemeler:[
    {ad:"Rolled Oats",miktar:80,birim:"g"},
    {ad:"Milk or Oat Milk",miktar:200,birim:"ml"},
    {ad:"Mixed Berries",miktar:80,birim:"g"},
    {ad:"Pumpkin Seeds",miktar:15,birim:"g"},
    {ad:"Chia Seeds",miktar:1,birim:"tsp"},
    {ad:"Honey or maple syrup",miktar:1,birim:"tsp"},
  ],
  adimlar:[
    "Cook oats in milk over medium heat, stirring 5 minutes.",
    "Pour into bowl, top with berries, seeds and honey.",
  ],
  etiketler:["kahvaltı","vejetaryen","kolay","yüksek lif"],
  onay:true,
},

// ── FR ──
{
  ad:"Bol de Petit-Déjeuner Santé",
  adler:{tr:"Sağlıklı Kahvaltı Kasesi",de:"Gesunde Frühstücksschüssel",en:"Healthy Breakfast Bowl",fr:"Bol de Petit-Déjeuner Santé"},
  ulke:"fr", sure:5, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:350, sporcu:false,
  malzemeler:[
    {ad:"Yaourt grec",miktar:150,birim:"g"},
    {ad:"Fruits rouges",miktar:100,birim:"g"},
    {ad:"Granola",miktar:30,birim:"g"},
    {ad:"Miel",miktar:1,birim:"c.à.c."},
    {ad:"Graines de lin",miktar:1,birim:"c.à.s."},
  ],
  adimlar:[
    "Mettre le yaourt dans un bol.",
    "Ajouter les fruits rouges et le granola.",
    "Arroser de miel et parsemer de graines.",
  ],
  etiketler:["kahvaltı","vejetaryen","hızlı","kolay"],
  onay:true,
},

// ── IT ──
{
  ad:"Colazione con Frutta e Yogurt",
  adler:{tr:"Meyveli Yoğurtlu Kahvaltı",de:"Frühstück mit Früchten und Joghurt",en:"Fruit and Yogurt Breakfast",it:"Colazione con Frutta e Yogurt"},
  ulke:"it", sure:5, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:295, sporcu:false,
  malzemeler:[
    {ad:"Yogurt greco",miktar:150,birim:"g"},
    {ad:"Frutta mista",miktar:100,birim:"g"},
    {ad:"Noci",miktar:15,birim:"g"},
    {ad:"Miele",miktar:1,birim:"cucchiaino"},
    {ad:"Semi di chia",miktar:1,birim:"cucchiaino"},
  ],
  adimlar:[
    "Mettere lo yogurt in una ciotola.",
    "Aggiungere la frutta, le noci, il miele e i semi.",
  ],
  etiketler:["kahvaltı","vejetaryen","hızlı","kolay"],
  onay:true,
},

// ── ES ──
{
  ad:"Tostadas con Tomate y Aceite",
  adler:{tr:"Domatesli Zeytinyağlı Tost",de:"Toast mit Tomate und Olivenöl",en:"Toast with Tomato and Olive Oil",es:"Tostadas con Tomate y Aceite"},
  ulke:"es", sure:5, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:220, sporcu:false,
  malzemeler:[
    {ad:"Pan integral",miktar:2,birim:"rebanadas"},
    {ad:"Tomate maduro",miktar:1,birim:"pieza"},
    {ad:"Aceite de oliva virgen",miktar:1,birim:"c.s."},
    {ad:"Ajo",miktar:0.5,birim:"diente"},
    {ad:"Sal",miktar:1,birim:"al gusto"},
  ],
  adimlar:[
    "Tostar el pan.",
    "Frotar con ajo, restregar el tomate cortado.",
    "Aliñar con aceite de oliva y sal.",
  ],
  etiketler:["kahvaltı","vegan","hızlı","kolay"],
  onay:true,
},

// ── EL ──
{
  ad:"Στραγγιστό Γιαούρτι με Μέλι",
  adler:{tr:"Ballı Süzme Yoğurt",de:"Griechischer Joghurt mit Honig",en:"Strained Yogurt with Honey",el:"Στραγγιστό Γιαούρτι με Μέλι"},
  ulke:"el", sure:3, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:240, sporcu:false,
  malzemeler:[
    {ad:"Στραγγιστό Γιαούρτι",miktar:200,birim:"g"},
    {ad:"Μέλι θυμαρίσιο",miktar:1,birim:"κ.γ."},
    {ad:"Καρύδια",miktar:15,birim:"g"},
    {ad:"Κανέλα",miktar:1,birim:"πρέζα"},
  ],
  adimlar:[
    "Βάλτε το γιαούρτι σε μπολ.",
    "Περιχύστε το μέλι, προσθέστε καρύδια και κανέλα.",
  ],
  etiketler:["kahvaltı","vejetaryen","hızlı","glutensiz"],
  onay:true,
},

// ── SV ──
{
  ad:"Filmjölk med Müsli",
  adler:{tr:"Filmjölk ve Müsli",de:"Buttermilch mit Müsli",en:"Filmjölk with Muesli",sv:"Filmjölk med Müsli"},
  ulke:"sv", sure:3, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:310, sporcu:false,
  malzemeler:[
    {ad:"Filmjölk",miktar:200,birim:"ml"},
    {ad:"Müsli",miktar:50,birim:"g"},
    {ad:"Bär (blåbär/hallon)",miktar:80,birim:"g"},
    {ad:"Honung",miktar:1,birim:"tsk"},
  ],
  adimlar:[
    "Häll filmjölk i en skål.",
    "Toppa med müsli, bär och honung.",
  ],
  etiketler:["kahvaltı","vejetaryen","hızlı","kolay"],
  onay:true,
},

// ── NO ──
{
  ad:"Havregrøt med Eple og Kanel",
  adler:{tr:"Elmalı Tarçınlı Yulaf",de:"Haferbrei mit Apfel und Zimt",en:"Oat Porridge with Apple & Cinnamon",no:"Havregrøt med Eple og Kanel"},
  ulke:"no", sure:10, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:330, sporcu:false,
  malzemeler:[
    {ad:"Havregryn",miktar:80,birim:"g"},
    {ad:"Melk",miktar:200,birim:"ml"},
    {ad:"Eple",miktar:0.5,birim:"stk"},
    {ad:"Kanel",miktar:0.5,birim:"tsk"},
    {ad:"Lønnesirup",miktar:1,birim:"ts"},
  ],
  adimlar:[
    "Kok havregrynene i melk under omrøring i 5 minutter.",
    "Riv eple over og dryss kanel.",
    "Hell over lønnesirup.",
  ],
  etiketler:["kahvaltı","vejetaryen","hızlı","kolay","kış"],
  onay:true,
},

// ── DA ──
{
  ad:"Smørrebrød med Avocado og Æg",
  adler:{tr:"Avokadolu Yumurtalı Çavdar Ekmeği",de:"Roggenbrot mit Avocado und Ei",en:"Rye Bread with Avocado & Egg",da:"Smørrebrød med Avocado og Æg"},
  ulke:"da", sure:10, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:385, sporcu:false,
  malzemeler:[
    {ad:"Rugbrød",miktar:2,birim:"skiver"},
    {ad:"Avocado",miktar:0.5,birim:"stk"},
    {ad:"Æg",miktar:1,birim:"stk"},
    {ad:"Citronsaft",miktar:0.5,birim:"stk"},
    {ad:"Salt, peber",miktar:1,birim:"q.s."},
  ],
  adimlar:[
    "Kog ægget blødt (6 minutter).",
    "Mos avocadoen med citronsaft og salt.",
    "Smør avocado på rugbrødet, læg halvt æg ovenpå.",
  ],
  etiketler:["kahvaltı","vejetaryen","hızlı","düşük kalori"],
  onay:true,
},

// ── FI ──
{
  ad:"Kaurapuuro Marjoilla",
  adler:{tr:"Meyveli Yulaf Lapası",de:"Haferbrei mit Beeren",en:"Oat Porridge with Berries",fi:"Kaurapuuro Marjoilla"},
  ulke:"fi", sure:10, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:310, sporcu:false,
  malzemeler:[
    {ad:"Kaurahiutaleet",miktar:80,birim:"g"},
    {ad:"Maito tai kasvijuoma",miktar:200,birim:"ml"},
    {ad:"Mustikat tai mansikat",miktar:80,birim:"g"},
    {ad:"Hunaja",miktar:1,birim:"tl"},
    {ad:"Siemenet",miktar:1,birim:"rkl"},
  ],
  adimlar:[
    "Keitä kaurahiutaleet maidossa 5 minuuttia.",
    "Lisää marjat, hunaja ja siemenet.",
  ],
  etiketler:["kahvaltı","vejetaryen","hızlı","yüksek lif"],
  onay:true,
},

// ════════════════════════════════════════════════════
// VEGAN / VEJETARYEn SAĞLIKLI (30 tarif)
// ════════════════════════════════════════════════════

// ── TR ──
{
  ad:"Vegan Mercimek Köftesi",
  adler:{tr:"Vegan Mercimek Köftesi",de:"Vegane Linsenfrikadellen",en:"Vegan Lentil Patties"},
  ulke:"tr", sure:30, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:255, sporcu:false,
  malzemeler:[
    {ad:"Kırmızı Mercimek (haşlanmış)",miktar:300,birim:"g"},
    {ad:"Bulgur (ince)",miktar:100,birim:"g"},
    {ad:"Soğan",miktar:1,birim:"adet"},
    {ad:"Maydanoz",miktar:1,birim:"demet"},
    {ad:"Salça",miktar:1,birim:"yemek kaşığı"},
    {ad:"Kimyon, pul biber, tuz",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Mercimek ve bulguru karıştır, 10 dakika beklet.",
    "Soğan, maydanoz, salça ve baharatları ekle.",
    "Yoğur, oval şekiller ver, limon ve roka ile servis et.",
  ],
  etiketler:["vegan","vejetaryen","atıştırmalık","düşük kalori","kolay"],
  onay:true,
},
{
  ad:"Nohutlu Ispanak Yemeği",
  adler:{tr:"Nohutlu Ispanak",de:"Spinat mit Kichererbsen",en:"Spinach and Chickpeas"},
  ulke:"tr", sure:25, porsiyon:3, zorluk:"kolay",
  kalPorsiyon:265, sporcu:false,
  malzemeler:[
    {ad:"Ispanak",miktar:400,birim:"g"},
    {ad:"Haşlanmış Nohut",miktar:200,birim:"g"},
    {ad:"Soğan",miktar:1,birim:"adet"},
    {ad:"Sarımsak",miktar:2,birim:"diş"},
    {ad:"Domates",miktar:1,birim:"adet"},
    {ad:"Zeytinyağı",miktar:1,birim:"yemek kaşığı"},
    {ad:"Kimyon, tuz",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Soğan ve sarımsağı zeytinyağında kavur.",
    "Domatesi ekle, 5 dakika pişir.",
    "Nohut ve ıspanağı ekle, 10 dakika kapakla pişir.",
  ],
  etiketler:["vegan","ana yemek","düşük kalori","glutensiz"],
  onay:true,
},
{
  ad:"Domates Çorbası (Vegan)",
  adler:{tr:"Vegan Domates Çorbası",de:"Vegane Tomatensuppe",en:"Vegan Tomato Soup"},
  ulke:"tr", sure:25, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:125, sporcu:false,
  malzemeler:[
    {ad:"Olgun Domates",miktar:800,birim:"g"},
    {ad:"Soğan",miktar:1,birim:"adet"},
    {ad:"Sarımsak",miktar:2,birim:"diş"},
    {ad:"Zeytinyağı",miktar:1,birim:"yemek kaşığı"},
    {ad:"Sebze Suyu",miktar:500,birim:"ml"},
    {ad:"Fesleğen, tuz, şeker",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Soğan ve sarımsağı kavur.",
    "Domatesleri ekle, 15 dakika pişir.",
    "Sebze suyu ekle, blenderdan geçir.",
    "Fesleğen ekle, servis et.",
  ],
  etiketler:["çorba","vegan","düşük kalori","glutensiz","kolay"],
  onay:true,
},

// ── DE ──
{
  ad:"Veganes Chili sin Carne",
  adler:{tr:"Vegan Chili",de:"Veganes Chili sin Carne",en:"Vegan Chili sin Carne"},
  ulke:"de", sure:35, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:290, sporcu:false,
  malzemeler:[
    {ad:"Kidneybohnen",miktar:400,birim:"g"},
    {ad:"Maisbohnen",miktar:200,birim:"g"},
    {ad:"Tomaten (Dose)",miktar:400,birim:"g"},
    {ad:"Paprika",miktar:2,birim:"Stück"},
    {ad:"Zwiebel",miktar:1,birim:"Stück"},
    {ad:"Chili, Kreuzkümmel, Salz",miktar:1,birim:"Prise"},
    {ad:"Olivenöl",miktar:1,birim:"EL"},
  ],
  adimlar:[
    "Zwiebel und Paprika in Öl andünsten.",
    "Bohnen, Mais und Tomaten zugeben.",
    "Mit Chili und Kreuzkümmel würzen, 20 Minuten köcheln.",
  ],
  etiketler:["vegan","ana yemek","düşük kalori","glutensiz","kış"],
  onay:true,
},

// ── FR ──
{
  ad:"Curry de Lentilles Corail",
  adler:{tr:"Kırmızı Mercimek Körisi",de:"Rotes Linsen-Curry",en:"Red Lentil Curry",fr:"Curry de Lentilles Corail"},
  ulke:"fr", sure:30, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:295, sporcu:false,
  malzemeler:[
    {ad:"Lentilles corail",miktar:250,birim:"g"},
    {ad:"Lait de coco",miktar:200,birim:"ml"},
    {ad:"Tomates (conserve)",miktar:400,birim:"g"},
    {ad:"Oignon",miktar:1,birim:"pièce"},
    {ad:"Curry, cumin, gingembre",miktar:1,birim:"q.s."},
    {ad:"Huile de coco",miktar:1,birim:"c.à.s."},
  ],
  adimlar:[
    "Faire revenir l'oignon dans l'huile avec les épices.",
    "Ajouter les lentilles, tomates et lait de coco.",
    "Cuire 20 minutes en remuant.",
  ],
  etiketler:["vegan","ana yemek","glutensiz","kolay","kış"],
  onay:true,
},
{
  ad:"Taboulé Libanais Léger",
  adler:{tr:"Hafif Lübnan Tabboulesi",de:"Leichter Libanesischer Taboulé",en:"Light Lebanese Tabbouleh",fr:"Taboulé Libanais Léger"},
  ulke:"fr", sure:20, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:195, sporcu:false,
  malzemeler:[
    {ad:"Boulgour fin",miktar:150,birim:"g"},
    {ad:"Persil plat (bouquet)",miktar:2,birim:"bouquets"},
    {ad:"Menthe fraîche",miktar:0.5,birim:"bouquet"},
    {ad:"Tomates",miktar:3,birim:"pièces"},
    {ad:"Citron",miktar:2,birim:"pièces"},
    {ad:"Huile d'olive",miktar:3,birim:"c.à.s."},
    {ad:"Sel",miktar:1,birim:"q.s."},
  ],
  adimlar:[
    "Faire gonfler le boulgour dans de l'eau bouillante 15 min.",
    "Hacher finement le persil et la menthe.",
    "Couper les tomates en petits dés.",
    "Mélanger tout avec citron, huile et sel.",
  ],
  etiketler:["vegan","salata","düşük kalori","hızlı"],
  onay:true,
},

// ── IT ──
{
  ad:"Pasta e Fagioli Vegana",
  adler:{tr:"Vegan Fagioli Makarna",de:"Vegane Nudeln mit Bohnen",en:"Vegan Pasta e Fagioli",it:"Pasta e Fagioli Vegana"},
  ulke:"it", sure:35, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:320, sporcu:false,
  malzemeler:[
    {ad:"Pasta corta (ditalini)",miktar:200,birim:"g"},
    {ad:"Fagioli borlotti",miktar:400,birim:"g"},
    {ad:"Pomodori",miktar:2,birim:"pezzi"},
    {ad:"Aglio",miktar:2,birim:"spicchi"},
    {ad:"Rosmarino, salvia",miktar:1,birim:"q.b."},
    {ad:"Olio d'oliva",miktar:2,birim:"cucchiai"},
    {ad:"Sale, pepe",miktar:1,birim:"q.b."},
  ],
  adimlar:[
    "Soffriggere aglio e rosmarino nell'olio.",
    "Aggiungere fagioli e pomodori schiacciati.",
    "Versare acqua, cuocere 10 minuti.",
    "Aggiungere la pasta, cuocere al dente.",
  ],
  etiketler:["vegan","ana yemek","kış","kolay"],
  onay:true,
},

// ── ES ──
{
  ad:"Lentejas Guisadas",
  adler:{tr:"İspanyol Mercimek Yahnisi",de:"Spanisches Linsen-Eintopf",en:"Spanish Stewed Lentils",es:"Lentejas Guisadas"},
  ulke:"es", sure:40, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:270, sporcu:false,
  malzemeler:[
    {ad:"Lentejas",miktar:300,birim:"g"},
    {ad:"Zanahoria",miktar:2,birim:"piezas"},
    {ad:"Cebolla",miktar:1,birim:"pieza"},
    {ad:"Ajo",miktar:2,birim:"dientes"},
    {ad:"Tomate triturado",miktar:200,birim:"g"},
    {ad:"Pimentón, comino, laurel",miktar:1,birim:"al gusto"},
    {ad:"Aceite de oliva",miktar:2,birim:"c.s."},
  ],
  adimlar:[
    "Pochar cebolla, ajo y zanahoria en aceite.",
    "Añadir lentejas, tomate y especias.",
    "Cubrir con agua y cocer 30 minutos.",
  ],
  etiketler:["vegan","ana yemek","düşük kalori","glutensiz","kış"],
  onay:true,
},

// ── EL ──
{
  ad:"Φακές Σούπα",
  adler:{tr:"Yunan Mercimek Çorbası",de:"Griechische Linsensuppe",en:"Greek Lentil Soup",el:"Φακές Σούπα"},
  ulke:"el", sure:35, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:240, sporcu:false,
  malzemeler:[
    {ad:"Φακές πράσινες",miktar:300,birim:"g"},
    {ad:"Κρεμμύδι",miktar:1,birim:"τεμ."},
    {ad:"Σκόρδο",miktar:2,birim:"σκελίδες"},
    {ad:"Ντομάτες",miktar:2,birim:"τεμ."},
    {ad:"Ελαιόλαδο",miktar:2,birim:"κ.σ."},
    {ad:"Δεντρολίβανο, ρίγανη, αλάτι",miktar:1,birim:"ανάλογα"},
  ],
  adimlar:[
    "Σοτάρετε κρεμμύδι και σκόρδο.",
    "Προσθέστε ντομάτες, φακές και νερό.",
    "Βράστε 30 λεπτά, αλατίστε.",
  ],
  etiketler:["çorba","vegan","düşük kalori","glutensiz","kış"],
  onay:true,
},

// ── PL ──
{
  ad:"Zupa Krem z Dyni",
  adler:{tr:"Balkabağı Kreması",de:"Kürbiscremesuppe",en:"Pumpkin Cream Soup",pl:"Zupa Krem z Dyni"},
  ulke:"pl", sure:30, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:165, sporcu:false,
  malzemeler:[
    {ad:"Dynia",miktar:700,birim:"g"},
    {ad:"Cebula",miktar:1,birim:"szt"},
    {ad:"Czosnek",miktar:2,birim:"ząbki"},
    {ad:"Bulion warzywny",miktar:800,birim:"ml"},
    {ad:"Imbir, kurkuma, sól",miktar:1,birim:"do smaku"},
    {ad:"Olej",miktar:1,birim:"łyżka"},
  ],
  adimlar:[
    "Podsmaż cebulę i czosnek.",
    "Dodaj dynię pokrojoną w kostkę.",
    "Zalej bulionem, gotuj 20 minut.",
    "Zmiksuj, dodaj przyprawy.",
  ],
  etiketler:["çorba","vegan","düşük kalori","glutensiz","kış"],
  onay:true,
},

// ── HU ──
{
  ad:"Zöldségleves Gyöngyárpával",
  adler:{tr:"Arpalı Sebze Çorbası",de:"Gemüsesuppe mit Gerste",en:"Vegetable Barley Soup",hu:"Zöldségleves Gyöngyárpával"},
  ulke:"hu", sure:40, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:220, sporcu:false,
  malzemeler:[
    {ad:"Gyöngyárpa",miktar:100,birim:"g"},
    {ad:"Sárgarépa",miktar:2,birim:"db"},
    {ad:"Zeller",miktar:1,birim:"szár"},
    {ad:"Hagyma",miktar:1,birim:"db"},
    {ad:"Zöldségleves",miktar:1200,birim:"ml"},
    {ad:"Petrezselyem, só",miktar:1,birim:"ízlés szerint"},
  ],
  adimlar:[
    "Párold a hagymát, répát és zellert olajon.",
    "Add hozzá a gyöngyárpát és a levest.",
    "Főzd 35 percig, adj hozzá petrezselymet.",
  ],
  etiketler:["çorba","vegan","düşük kalori","kış"],
  onay:true,
},

// ── RO ──
{
  ad:"Ciorbă de Legume",
  adler:{tr:"Rumen Sebze Çorbası",de:"Rumänische Gemüsesuppe",en:"Romanian Vegetable Ciorbă",ro:"Ciorbă de Legume"},
  ulke:"ro", sure:35, porsiyon:6, zorluk:"kolay",
  kalPorsiyon:115, sporcu:false,
  malzemeler:[
    {ad:"Cartofi",miktar:3,birim:"buc"},
    {ad:"Morcovi",miktar:2,birim:"buc"},
    {ad:"Țelină",miktar:1,birim:"bucată"},
    {ad:"Fasole verde",miktar:150,birim:"g"},
    {ad:"Roșii",miktar:2,birim:"buc"},
    {ad:"Bors (zeamă)",miktar:100,birim:"ml"},
    {ad:"Sare, cimbru, pătrunjel",miktar:1,birim:"după gust"},
  ],
  adimlar:[
    "Tăiați legumele cubulețe.",
    "Fierbeți în apă 20 de minute.",
    "Adăugați borșul și roșiile.",
    "Condimentați și adăugați pătrunjel.",
  ],
  etiketler:["çorba","vegan","düşük kalori","glutensiz","kış"],
  onay:true,
},

// ── LV ──
{
  ad:"Bietes Salāti ar Riekstiem",
  adler:{tr:"Cevizli Pancar Salatası",de:"Rote-Bete-Salat mit Nüssen",en:"Beet Salad with Nuts",lv:"Bietes Salāti ar Riekstiem"},
  ulke:"lv", sure:15, porsiyon:2, zorluk:"kolay",
  kalPorsiyon:175, sporcu:false,
  malzemeler:[
    {ad:"Vārītas bietes",miktar:300,birim:"g"},
    {ad:"Valrieksti",miktar:30,birim:"g"},
    {ad:"Balzamiko etiķis",miktar:1,birim:"ēdamkarote"},
    {ad:"Olīveļļa",miktar:1,birim:"ēdamkarote"},
    {ad:"Ķiploks, sāls",miktar:1,birim:"pēc garšas"},
  ],
  adimlar:[
    "Bietes sagrieziet šķēlēs vai kubiņos.",
    "Pievienojiet riekstus.",
    "Aplejiet ar etiķi un eļļu, pievienojiet sāli.",
  ],
  etiketler:["salata","vegan","düşük kalori","hızlı","glutensiz"],
  onay:true,
},

// ════════════════════════════════════════════════════
// ANTRENMAN ÖNCESİ / SONRASI (15 tarif)
// ════════════════════════════════════════════════════

{
  ad:"Antrenman Öncesi Muz-Yulaf Karması",
  adler:{tr:"Antrenman Öncesi Muz Yulaf",en:"Pre-Workout Banana Oats"},
  ulke:"tr", sure:5, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:340, sporcu:true,
  malzemeler:[
    {ad:"Yulaf Ezmesi",miktar:80,birim:"g"},
    {ad:"Muz",miktar:1,birim:"adet"},
    {ad:"Bal",miktar:1,birim:"yemek kaşığı"},
    {ad:"Süt veya Su",miktar:200,birim:"ml"},
  ],
  adimlar:[
    "Yulafı sütle kaynatın, 5 dakika pişirin.",
    "Üzerine muz ve bal ekleyin.",
    "Antrenmandan 1-1.5 saat önce tüketin.",
  ],
  etiketler:["sporcu","antrenman öncesi","enerji","vejetaryen","kolay","hızlı"],
  onay:true,
},
{
  ad:"Antrenman Sonrası Protein Shake",
  adler:{tr:"Post-Workout Protein Shake",en:"Post-Workout Protein Shake"},
  ulke:"tr", sure:3, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:380, sporcu:true,
  malzemeler:[
    {ad:"Whey Protein Tozu",miktar:30,birim:"g"},
    {ad:"Muz",miktar:1,birim:"adet"},
    {ad:"Süt",miktar:250,birim:"ml"},
    {ad:"Badem Ezmesi",miktar:1,birim:"yemek kaşığı"},
    {ad:"Kakao (doğal)",miktar:1,birim:"çay kaşığı"},
  ],
  adimlar:[
    "Tüm malzemeleri blenderdan geçirin.",
    "Antrenman bittikten sonra 30 dakika içinde için.",
  ],
  etiketler:["sporcu","antrenman sonrası","yüksek protein","hızlı"],
  onay:true,
},
{
  ad:"Kas Yapıcı Tavuk-Pirinç Kasesi",
  adler:{tr:"Kas Yapıcı Tavuk Pirinç",en:"Muscle Building Chicken Rice Bowl"},
  ulke:"tr", sure:25, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:580, sporcu:true,
  malzemeler:[
    {ad:"Tavuk Göğsü",miktar:200,birim:"g"},
    {ad:"Basmati Pirinç",miktar:100,birim:"g"},
    {ad:"Brokoli",miktar:150,birim:"g"},
    {ad:"Zeytinyağı",miktar:1,birim:"yemek kaşığı"},
    {ad:"Tuz, zerdeçal, karabiber",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Pirinci haşlayın.",
    "Tavuğu baharatlarla pişirin.",
    "Brokoliyi buharda haşlayın.",
    "Kaseye koyun, zeytinyağı gezdirin.",
  ],
  etiketler:["sporcu","antrenman sonrası","yüksek protein","meal prep","glutensiz"],
  onay:true,
},
{
  ad:"Energy Balls (Tarih-Kakao)",
  adler:{tr:"Enerji Topları",de:"Energie-Bällchen",en:"Energy Balls Date Cacao"},
  ulke:"tr", sure:15, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:245, sporcu:true,
  malzemeler:[
    {ad:"Hurma",miktar:150,birim:"g"},
    {ad:"Yulaf",miktar:80,birim:"g"},
    {ad:"Kakaolu Kakao Tozu",miktar:2,birim:"yemek kaşığı"},
    {ad:"Badem Ezmesi",miktar:2,birim:"yemek kaşığı"},
    {ad:"Hindistan Cevizi (rendelenmiş)",miktar:2,birim:"yemek kaşığı"},
  ],
  adimlar:[
    "Hurmaları robottan geçirin.",
    "Yulaf, kakao ve bademi ekleyin, iyice karıştırın.",
    "Küçük toplar yapın, hindistan cevizine bulayın.",
    "Buzdolabında 30 dakika dinlendirin.",
  ],
  etiketler:["sporcu","atıştırmalık","vegan","antrenman öncesi","enerji"],
  onay:true,
},
{
  ad:"Grünkohl-Smoothie (Pre-Workout)",
  adler:{tr:"Lahana Smoothie",de:"Grünkohl-Smoothie",en:"Kale Pre-Workout Smoothie"},
  ulke:"de", sure:5, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:265, sporcu:true,
  malzemeler:[
    {ad:"Grünkohl (Kale)",miktar:80,birim:"g"},
    {ad:"Banane",miktar:1,birim:"Stück"},
    {ad:"Apfel",miktar:0.5,birim:"Stück"},
    {ad:"Ingwer",miktar:1,birim:"kleines Stück"},
    {ad:"Wasser oder Hafermilch",miktar:200,birim:"ml"},
    {ad:"Zitronensaft",miktar:0.5,birim:"Stück"},
  ],
  adimlar:[
    "Alle Zutaten in den Mixer geben.",
    "Glatt pürieren und sofort trinken.",
  ],
  etiketler:["sporcu","antrenman öncesi","vegan","hızlı","detoks"],
  onay:true,
},
{
  ad:"Rice Cakes with Peanut Butter & Banana",
  adler:{tr:"Fıstık Ezmeli Muzlu Pirinç Galeti",de:"Reiswaffeln mit Erdnussbutter",en:"Rice Cakes Peanut Butter Banana"},
  ulke:"en", sure:3, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:295, sporcu:true,
  malzemeler:[
    {ad:"Rice Cakes",miktar:3,birim:"adet"},
    {ad:"Peanut Butter",miktar:2,birim:"tbsp"},
    {ad:"Banana",miktar:0.5,birim:"adet"},
    {ad:"Honey",miktar:0.5,birim:"tsp"},
  ],
  adimlar:[
    "Spread peanut butter on rice cakes.",
    "Top with banana slices and a drizzle of honey.",
  ],
  etiketler:["sporcu","atıştırmalık","antrenman öncesi","hızlı","vegan"],
  onay:true,
},
{
  ad:"Proteinrik Pannkaka",
  adler:{tr:"Proteinli Pankek",de:"Proteinreicher Pfannkuchen",en:"High Protein Pancake",sv:"Proteinrik Pannkaka"},
  ulke:"sv", sure:15, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:430, sporcu:true,
  malzemeler:[
    {ad:"Ägg",miktar:2,birim:"stk"},
    {ad:"Kvarg",miktar:100,birim:"g"},
    {ad:"Havregryn",miktar:40,birim:"g"},
    {ad:"Vanilj",miktar:0.5,birim:"tsk"},
    {ad:"Smör",miktar:5,birim:"g"},
  ],
  adimlar:[
    "Mixa ägg, kvarg, havregryn och vanilj.",
    "Stek i smör på medelvärme, 2-3 minuter per sida.",
    "Servera med bär.",
  ],
  etiketler:["kahvaltı","sporcu","yüksek protein","vejetaryen","hızlı"],
  onay:true,
},
{
  ad:"Hüttenkäse Frühstücksbowl",
  adler:{tr:"Cottage Cheese Kahvaltı Kasesi",de:"Hüttenkäse Frühstücksbowl",en:"Cottage Cheese Breakfast Bowl"},
  ulke:"de", sure:5, porsiyon:1, zorluk:"kolay",
  kalPorsiyon:290, sporcu:true,
  malzemeler:[
    {ad:"Hüttenkäse (Magerquark)",miktar:200,birim:"g"},
    {ad:"Beeren",miktar:80,birim:"g"},
    {ad:"Leinsamen gemahlen",miktar:1,birim:"EL"},
    {ad:"Chiasamen",miktar:1,birim:"TL"},
    {ad:"Honig",miktar:1,birim:"TL"},
  ],
  adimlar:[
    "Hüttenkäse in Schüssel geben.",
    "Beeren, Samen und Honig darüber verteilen.",
  ],
  etiketler:["kahvaltı","sporcu","yüksek protein","vejetaryen","hızlı","glutensiz"],
  onay:true,
},

// ════════════════════════════════════════════════════
// MEAL PREP / HAFTALIK HAZIRLIK (10 tarif)
// ════════════════════════════════════════════════════

{
  ad:"Fırın Tavuk (Toplu Hazırlık)",
  adler:{tr:"Meal Prep Fırın Tavuk",en:"Meal Prep Baked Chicken"},
  ulke:"tr", sure:45, porsiyon:5, zorluk:"kolay",
  kalPorsiyon:285, sporcu:true,
  malzemeler:[
    {ad:"Tavuk Göğsü",miktar:1000,birim:"g"},
    {ad:"Zeytinyağı",miktar:3,birim:"yemek kaşığı"},
    {ad:"Sarımsak",miktar:4,birim:"diş"},
    {ad:"Tuz, karabiber, kekik, kırmızıbiber",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Tavukları baharatlarla marine edin.",
    "200°C fırında 25-30 dakika pişirin.",
    "Soğuduktan sonra dilimleyip 5 kap ayırın.",
    "Buzdolabında 4 gün, dondurucuda 3 ay dayanır.",
  ],
  etiketler:["sporcu","meal prep","yüksek protein","glutensiz","kolay"],
  onay:true,
},
{
  ad:"Kinoa Sebze Meal Prep Kasesi",
  adler:{tr:"Kinoa Sebze Kasesi",en:"Quinoa Veggie Meal Prep Bowl"},
  ulke:"tr", sure:30, porsiyon:4, zorluk:"kolay",
  kalPorsiyon:355, sporcu:false,
  malzemeler:[
    {ad:"Kinoa",miktar:250,birim:"g"},
    {ad:"Kırmızı Biber",miktar:2,birim:"adet"},
    {ad:"Kabak",miktar:2,birim:"adet"},
    {ad:"Cherry Domates",miktar:200,birim:"g"},
    {ad:"Konserve Nohut",miktar:200,birim:"g"},
    {ad:"Zeytinyağı",miktar:2,birim:"yemek kaşığı"},
    {ad:"Tuz, kekik, sumak",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Kinoayı haşlayın.",
    "Sebzeleri yağda kızartın.",
    "4 kaba eşit pay edin, nohut ekleyin.",
    "Buzdolabında 4 güne kadar taze kalır.",
  ],
  etiketler:["meal prep","vegan","düşük kalori","glutensiz"],
  onay:true,
},
{
  ad:"Mercimek-Bulgur Köfte (Toplu)",
  adler:{tr:"Toplu Mercimek Köftesi",en:"Bulk Lentil Kofta"},
  ulke:"tr", sure:30, porsiyon:6, zorluk:"kolay",
  kalPorsiyon:215, sporcu:false,
  malzemeler:[
    {ad:"Kırmızı Mercimek",miktar:300,birim:"g"},
    {ad:"İnce Bulgur",miktar:150,birim:"g"},
    {ad:"Soğan",miktar:1,birim:"adet"},
    {ad:"Salça",miktar:2,birim:"yemek kaşığı"},
    {ad:"Nane, kimyon, pul biber, tuz",miktar:1,birim:"tutam"},
  ],
  adimlar:[
    "Mercimeği haşlayın, bulgurun üstüne dökün, 15 dakika şişirin.",
    "Soğan, salça ve baharatlarla iyice yoğurun.",
    "Oval şekiller verin, buzdolabında 3 gün dayanır.",
  ],
  etiketler:["meal prep","vegan","düşük kalori","kolay"],
  onay:true,
},

];

exports.handler = async () => {
  try {
    initFirebase();
    const db = admin.firestore();

    // Kaç tarif var kontrol et
    const mevcut = await db.collection("tarifler").count().get();
    const mevcutSayi = mevcut.data().count;

    const batch = db.batch();
    for (const tarif of TARIFLER) {
      const ref = db.collection("tarifler").doc();
      batch.set(ref, { ...tarif, eklenme: admin.firestore.FieldValue.serverTimestamp() });
    }
    await batch.commit();

    return {
      statusCode: 200,
      body: JSON.stringify({
        mesaj: `✅ ${TARIFLER.length} yeni tarif eklendi.`,
        eskiSayi: mevcutSayi,
        yeniSayi: mevcutSayi + TARIFLER.length,
      }),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ hata: e.message }) };
  }
};
