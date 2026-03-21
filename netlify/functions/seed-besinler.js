const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const AB = ["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","lv","et","lt"];
const KUZEYBATI = ["de","at","be","nl","fr","en","sv","da","no","fi","lv","et","lt"];
const ORTA_DOGU_EU = ["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","lv","et","lt"];

const BESINLER = [

  // ══════════════════════════════════════════════════════
  // BÖLÜM 1: TÜM AVRUPA'DA SATAN MARKALAR
  // ══════════════════════════════════════════════════════

  // ── BARILLA ──
  { ad:"Barilla Spaghetti No5", adler:{tr:"Barilla Spagetti No5",el:"Μπαρίλα Σπαγγέτι",hu:"Barilla Spagetti",pl:"Barilla Spaghetti",cs:"Barilla Špagety",ro:"Barilla Spaghetti",hr:"Barilla Špageti"}, marka:"Barilla", kal:353, pro:12, karb:71, yag:1.5, lif:2.7, sod:3, por:100, kat:"Pasta", ulkeler:[...AB,"tr"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"durum wheat semolina", katkiMaddeleri:[] },
  { ad:"Barilla Penne Rigate", adler:{tr:"Barilla Penne",el:"Μπαρίλα Πέννε",hu:"Barilla Penne",pl:"Barilla Penne",cs:"Barilla Penne",ro:"Barilla Penne",hr:"Barilla Penne"}, marka:"Barilla", kal:353, pro:12, karb:71, yag:1.5, lif:2.7, sod:3, por:100, kat:"Pasta", ulkeler:[...AB,"tr"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"durum wheat semolina", katkiMaddeleri:[] },
  { ad:"Barilla Fusilli", adler:{tr:"Barilla Burgu Makarna",el:"Μπαρίλα Φουζίλι",hu:"Barilla Fusilli",pl:"Barilla Fusilli",cs:"Barilla Fusilli",ro:"Barilla Fusilli",hr:"Barilla Fusilli"}, marka:"Barilla", kal:353, pro:12, karb:71, yag:1.5, lif:2.7, sod:3, por:100, kat:"Pasta", ulkeler:[...AB,"tr"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"durum wheat semolina", katkiMaddeleri:[] },
  { ad:"Barilla Wholegrain Spaghetti", adler:{tr:"Barilla Tam Buğday Spagetti",de:"Barilla Vollkorn Spaghetti",el:"Μπαρίλα Ολικής",hu:"Barilla Teljes Kiőrlésű",pl:"Barilla Pełnoziarniste",cs:"Barilla Celozrnné"}, marka:"Barilla", kal:335, pro:13, karb:66, yag:2.5, lif:7, sod:5, por:100, kat:"Pasta", ulkeler:[...AB,"tr"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"whole durum wheat semolina", katkiMaddeleri:[] },
  { ad:"Barilla Pasta Sauce Basilico", adler:{tr:"Barilla Fesleğenli Sos",de:"Barilla Sosse Basilikum",el:"Μπαρίλα Σάλτσα Βασιλικός",hu:"Barilla Bazsalikom Szósz"}, marka:"Barilla", kal:68, pro:2, karb:9, yag:3, lif:1.5, sod:580, por:100, kat:"Sauce", ulkeler:[...ORTA_DOGU_EU,"en"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"tomatoes, basil, sunflower oil, salt, sugar, E330", katkiMaddeleri:[{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."}] },
  { ad:"Barilla Pasta Sauce Bolognese", adler:{tr:"Barilla Bolonez Sos",de:"Barilla Sosse Bolognese",el:"Μπαρίλα Σάλτσα Μπολόνιε"}, marka:"Barilla", kal:88, pro:5, karb:8, yag:4, lif:1.5, sod:620, por:100, kat:"Sauce", ulkeler:[...ORTA_DOGU_EU,"en"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"tomatoes, beef, carrot, onion, salt, E330", katkiMaddeleri:[{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."}] },

  // ── BONDUELLE ──
  { ad:"Bonduelle Sweet Corn", adler:{tr:"Bonduelle Mısır",de:"Bonduelle Mais",el:"Μπονντουέλ Καλαμπόκι",hu:"Bonduelle Kukorica",pl:"Bonduelle Kukurydza",cs:"Bonduelle Kukuřice",ro:"Bonduelle Porumb",hr:"Bonduelle Kukuruz"}, marka:"Bonduelle", kal:95, pro:2.8, karb:19, yag:1, lif:1.8, sod:10, por:100, kat:"Vegetable", ulkeler:[...AB,"tr"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"sweet corn, water, salt", katkiMaddeleri:[] },
  { ad:"Bonduelle Green Peas", adler:{tr:"Bonduelle Bezelye",de:"Bonduelle Erbsen",el:"Μπονντουέλ Αρακάς",hu:"Bonduelle Borsó",pl:"Bonduelle Groszek",cs:"Bonduelle Hrách",ro:"Bonduelle Mazăre",hr:"Bonduelle Grašak"}, marka:"Bonduelle", kal:81, pro:5.4, karb:14, yag:0.4, lif:5.1, sod:5, por:100, kat:"Vegetable", ulkeler:[...AB,"tr"], tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"peas, water, salt, sugar", katkiMaddeleri:[] },
  { ad:"Bonduelle Kidney Beans", adler:{tr:"Bonduelle Kırmızı Fasulye",de:"Bonduelle Kidneybohnen",el:"Μπονντουέλ Φασόλια",hu:"Bonduelle Vörös Bab",pl:"Bonduelle Fasola Czerwona",cs:"Bonduelle Červené Fazole"}, marka:"Bonduelle", kal:127, pro:8.7, karb:23, yag:0.5, lif:6.4, sod:290, por:130, kat:"Legume", ulkeler:[...AB,"tr"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kidney beans, water, salt", katkiMaddeleri:[] },
  { ad:"Bonduelle Chickpeas", adler:{tr:"Bonduelle Nohut",de:"Bonduelle Kichererbsen",el:"Μπονντουέλ Ρεβύθια",hu:"Bonduelle Csicseriborsó",pl:"Bonduelle Ciecierzyca",cs:"Bonduelle Cizrna"}, marka:"Bonduelle", kal:120, pro:7.5, karb:20, yag:2, lif:6, sod:290, por:130, kat:"Legume", ulkeler:[...AB,"tr"], tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"chickpeas, water, salt", katkiMaddeleri:[] },

  // ── BECEL ──
  { ad:"Becel Original Margarine", adler:{tr:"Becel Orijinal Margarin",de:"Becel Original Margarine",el:"Μπέσελ Μαργαρίνη",hu:"Becel Margarin",pl:"Becel Margaryna",cs:"Becel Margarín",ro:"Becel Margarină",hr:"Becel Margarin"}, marka:"Becel", kal:535, pro:0.1, karb:0.4, yag:59, lif:0, sod:550, por:10, kat:"Fat", ulkeler:[...ORTA_DOGU_EU,"en"], tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"sunflower oil, water, salt, E471, E322, E160a, vitamin D", katkiMaddeleri:[{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E322",ad:"Lecithins",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E160a",ad:"Carotenes",tehlikeli:false,aciklama:"Colouring."}] },
  { ad:"Becel Pro.activ Margarine", adler:{tr:"Becel Pro.activ Margarin",de:"Becel Pro.activ Margarine"}, marka:"Becel", kal:390, pro:0.1, karb:0.5, yag:42, lif:0, sod:550, por:10, kat:"Fat", ulkeler:[...KUZEYBATI], tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"water, plant stanol ester, sunflower oil, salt, E471, E322, E160a", katkiMaddeleri:[{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E322",ad:"Lecithins",tehlikeli:false,aciklama:"Emulsifier."}] },

  // ── BUITONI ──
  { ad:"Buitoni Fresh Pasta Tagliatelle", adler:{tr:"Buitoni Taze Tagliatelle",de:"Buitoni Frische Tagliatelle"}, marka:"Buitoni", kal:298, pro:11, karb:54, yag:4, lif:2.5, sod:180, por:100, kat:"Pasta", ulkeler:["it","fr","de","at","be","es","en"], tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"wheat flour, eggs, water, salt", katkiMaddeleri:[] },

  // ── MEYVE/SEBZE (tüm ülkelerde aynı) ──
  { ad:"Banana (Muz)", adler:{tr:"Muz",de:"Banane",el:"Μπανάνα",hu:"Banán",pl:"Banan",cs:"Banán",ro:"Banană",hr:"Banana",fr:"Banane",es:"Plátano",it:"Banana",pt:"Banana",no:"Banan",sv:"Banan",da:"Banan",fi:"Banaani",nl:"Banaan"}, kal:89, pro:1.1, karb:23, yag:0.3, lif:2.6, sod:1, por:100, kat:"Fruit", ulkeler:[...AB,"tr"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"banana", katkiMaddeleri:[] },
  { ad:"Blueberry (Yaban Mersini)", adler:{tr:"Yaban Mersini",de:"Blaubeere",el:"Μύρτιλο",hu:"Áfonya",pl:"Borówka",cs:"Borůvka",ro:"Afine",hr:"Borovnica",fr:"Myrtille",es:"Arándano",it:"Mirtillo",pt:"Mirtilo",no:"Blåbær",sv:"Blåbär",da:"Blåbær",fi:"Mustikka",nl:"Bosbes"}, kal:57, pro:0.7, karb:14, yag:0.3, lif:2.4, sod:1, por:100, kat:"Fruit", ulkeler:[...AB,"tr"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"blueberries", katkiMaddeleri:[] },
  { ad:"Blackberry (Böğürtlen)", adler:{tr:"Böğürtlen",de:"Brombeere",el:"Βατόμουρο",hu:"Fekete Szeder",pl:"Jeżyna",cs:"Ostružina",ro:"Mure",hr:"Kupina",fr:"Mûre",es:"Mora",it:"Mora",pt:"Amora",no:"Bjørnebær",sv:"Björnbär",da:"Brombær",fi:"Karhunvatukka",nl:"Braam"}, kal:43, pro:1.4, karb:9.6, yag:0.5, lif:5.3, sod:1, por:100, kat:"Fruit", ulkeler:[...AB,"tr"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"blackberries", katkiMaddeleri:[] },
  { ad:"Broccoli", adler:{tr:"Brokoli",de:"Brokkoli",el:"Μπρόκολο",hu:"Brokkoli",pl:"Brokuł",cs:"Brokolice",ro:"Broccoli",hr:"Brokula",fr:"Brocoli",es:"Brócoli",it:"Broccolo",pt:"Brócolo",no:"Brokkoli",sv:"Broccoli",da:"Broccoli",fi:"Parsakaali",nl:"Broccoli"}, kal:34, pro:2.8, karb:7, yag:0.4, lif:2.6, sod:33, por:100, kat:"Vegetable", ulkeler:[...AB,"tr"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"broccoli", katkiMaddeleri:[] },
  { ad:"Brussels Sprouts (Brüksel Lahanası)", adler:{tr:"Brüksel Lahanası",de:"Rosenkohl",el:"Λαχανάκια Βρυξελλών",hu:"Kelbimbó",pl:"Brukselka",cs:"Růžičková Kapusta",ro:"Varză de Bruxelles",hr:"Prokulice",fr:"Choux de Bruxelles",es:"Coles de Bruselas",it:"Cavolini di Bruxelles",pt:"Couve de Bruxelas",no:"Rosenkål",sv:"Brysselkål",da:"Rosenkål",fi:"Ruusukaali",nl:"Spruitjes"}, kal:43, pro:3.4, karb:9, yag:0.3, lif:3.8, sod:25, por:100, kat:"Vegetable", ulkeler:[...AB,"tr"], tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"brussels sprouts", katkiMaddeleri:[] },
  { ad:"Beetroot (Pancar)", adler:{tr:"Kırmızı Pancar",de:"Rote Beete",el:"Παντζάρι",hu:"Cékla",pl:"Burak Ćwikłowy",cs:"Červená Řepa",ro:"Sfeclă Roșie",hr:"Cikla",fr:"Betterave Rouge",es:"Remolacha",it:"Barbabietola",pt:"Beterraba",no:"Rødbete",sv:"Rödbeta",da:"Rødbede",fi:"Punajuuri",nl:"Rode Biet"}, kal:43, pro:1.6, karb:10, yag:0.2, lif:2.8, sod:78, por:100, kat:"Vegetable", ulkeler:[...AB,"tr"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"beetroot", katkiMaddeleri:[] },
  { ad:"Butternut Squash (Balkabağı)", adler:{tr:"Balkabağı",de:"Butternut-Kürbis",el:"Κολοκύθα",hu:"Butternut Tök",pl:"Dynia Piżmowa",cs:"Dýně Máslová",ro:"Dovleac",hr:"Bundeva",fr:"Courge Butternut",es:"Calabaza",it:"Zucca Butternut",pt:"Abóbora",no:"Butternutsquash",sv:"Butternutpumpa",da:"Butternut Squash",fi:"Butternut-Kurpitsa",nl:"Butternut Pompoen"}, kal:45, pro:1, karb:12, yag:0.1, lif:2, sod:4, por:100, kat:"Vegetable", ulkeler:[...AB,"tr"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"butternut squash", katkiMaddeleri:[] },
  { ad:"Brazil Nut (Brezilya Cevizi)", adler:{tr:"Brezilya Cevizi",de:"Paranuss",el:"Καρύδι Βραζιλίας",hu:"Brazil Dió",pl:"Orzech Brazylijski",cs:"Para Ořech",ro:"Nuca de Brazilia",hr:"Brazil Orah",fr:"Noix du Brésil",es:"Nuez de Brasil",it:"Noce del Brasile",pt:"Castanha-do-Pará",no:"Paranøtt",sv:"Paranöt",da:"Paranød",fi:"Parapähkinä",nl:"Paranoot"}, kal:659, pro:14, karb:12, yag:67, lif:7.5, sod:3, por:30, kat:"Nuts", ulkeler:[...AB,"tr"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"brazil nuts", katkiMaddeleri:[] },
  { ad:"Buckwheat (Karabuğday)", adler:{tr:"Karabuğday",de:"Buchweizen",el:"Φαγόπυρο",hu:"Hajdina",pl:"Kasza Gryczana",cs:"Pohanka",ro:"Hrișcă",hr:"Heljda",fr:"Sarrasin",es:"Trigo Sarraceno",it:"Grano Saraceno",pt:"Trigo Sarraceno",no:"Bokhvete",sv:"Bovete",da:"Boghvede",fi:"Tattari",nl:"Boekweit"}, kal:343, pro:13, karb:72, yag:3.4, lif:10, sod:1, por:100, kat:"Grain", ulkeler:[...AB,"tr"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"buckwheat", katkiMaddeleri:[] },

  // ── BEBIDA/DRANKEN (içecekler) ──
  { ad:"Brita Water Filter", adler:{tr:"Brita Su Filtresi",de:"Brita Wasserfilter"}, marka:"Brita", kal:0, pro:0, karb:0, yag:0, lif:0, sod:2, por:250, kat:"Water", ulkeler:[...AB,"tr"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"filtered water", katkiMaddeleri:[] },

  // ══════════════════════════════════════════════════════
  // BÖLÜM 2: ÜLKEYE ÖZGÜ B ÜRÜNLERİ
  // ══════════════════════════════════════════════════════

  // ── TR ──
  { ad:"Beyaz Peynir", kal:264, pro:14, karb:2.7, yag:21, lif:0, sod:1116, por:30, kat:"Süt Ürünleri", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"süt, tuz, maya, kalsiyum klorür", katkiMaddeleri:[] },
  { ad:"Börek (Peynirli)", kal:298, pro:10, karb:32, yag:15, lif:1.5, sod:480, por:100, kat:"Hamur İşleri", ulke:"tr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"yufka, beyaz peynir, yumurta, tereyağı", katkiMaddeleri:[] },
  { ad:"Börek (Ispanaklı)", kal:265, pro:9, karb:28, yag:14, lif:2.5, sod:420, por:100, kat:"Hamur İşleri", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"yufka, ıspanak, soğan, zeytinyağı", katkiMaddeleri:[] },
  { ad:"Bulgur Pilavı", kal:151, pro:5.6, karb:29, yag:1.3, lif:4.5, sod:8, por:100, kat:"Tahıl", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"bulgur, su, tuz", katkiMaddeleri:[] },
  { ad:"Bulgur (Ham)", kal:342, pro:12, karb:71, yag:1.3, lif:12, sod:17, por:100, kat:"Tahıl", ulke:"tr", tokPuan:78, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"bulgur", katkiMaddeleri:[] },
  { ad:"Baklava", kal:445, pro:7, karb:52, yag:24, lif:1.5, sod:90, por:100, kat:"Tatlı", ulke:"tr", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"buğday unu, tereyağı, ceviz/antep fıstığı, şeker, su", katkiMaddeleri:[] },
  { ad:"Balık Ekmek", kal:285, pro:18, karb:32, yag:9, lif:2, sod:520, por:200, kat:"Balık", ulke:"tr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"ekmek, balık, marul, soğan, limon", katkiMaddeleri:[] },
  { ad:"Bamya", kal:33, pro:1.9, karb:7.5, yag:0.2, lif:3.2, sod:8, por:100, kat:"Sebze", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"bamya", katkiMaddeleri:[] },
  { ad:"Bezelye", kal:81, pro:5.4, karb:14, yag:0.4, lif:5.1, sod:5, por:100, kat:"Sebze", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"bezelye", katkiMaddeleri:[] },
  { ad:"Biber Dolması", kal:145, pro:8, karb:16, yag:6, lif:2.5, sod:380, por:150, kat:"Et", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"biber, pirinç, kıyma, domates, soğan, zeytinyağı", katkiMaddeleri:[] },
  { ad:"Biberiye Çayı", kal:2, pro:0.1, karb:0.3, yag:0, lif:0, sod:1, por:200, kat:"İçecek", ulke:"tr", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"biberiye, su", katkiMaddeleri:[] },
  { ad:"Boza", kal:75, pro:1.2, karb:16, yag:0.5, lif:0.5, sod:28, por:200, kat:"İçecek", ulke:"tr", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"mısır/buğday unu, şeker, su, maya", katkiMaddeleri:[] },
  { ad:"Böğürtlen Reçeli", kal:248, pro:0.4, karb:62, yag:0, lif:1.5, sod:8, por:20, kat:"Reçeller", ulke:"tr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"böğürtlen, şeker, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektin",tehlikeli:false,aciklama:"Jelleşme maddesi."},{kod:"E330",ad:"Sitrik asit",tehlikeli:false,aciklama:"Asitlik düzenleyici."}] },
  { ad:"Balık (Çipura)", kal:96, pro:18, karb:0, yag:2.6, lif:0, sod:68, por:100, kat:"Balık", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"çipura", katkiMaddeleri:[] },
  { ad:"Balık (Levrek Izgara)", kal:124, pro:19, karb:0, yag:5.2, lif:0, sod:87, por:100, kat:"Balık", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"levrek, tuz, zeytinyağı", katkiMaddeleri:[] },
  { ad:"Balık (Palamut)", kal:172, pro:22, karb:0, yag:9, lif:0, sod:75, por:100, kat:"Balık", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"palamut", katkiMaddeleri:[] },
  { ad:"Bal (Çiçek)", kal:304, pro:0.3, karb:82, yag:0, lif:0, sod:4, por:20, kat:"Tatlandırıcı", ulke:"tr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"çiçek balı", katkiMaddeleri:[] },
  { ad:"Bal (Petek)", kal:304, pro:0.3, karb:82, yag:0, lif:0, sod:4, por:20, kat:"Tatlandırıcı", ulke:"tr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"petek balı", katkiMaddeleri:[] },
  { ad:"Barbun (Tekir)", kal:97, pro:18, karb:0, yag:2.8, lif:0, sod:60, por:100, kat:"Balık", ulke:"tr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"barbun balığı", katkiMaddeleri:[] },
  // TR MARKALI
  { ad:"Banvit Tavuk Göğüs", marka:"Banvit", kal:108, pro:23, karb:0, yag:1.5, lif:0, sod:65, por:100, kat:"Et Ürünleri", ulke:"tr", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"tavuk göğsü", katkiMaddeleri:[] },
  { ad:"Banvit Tavuk Kanat", marka:"Banvit", kal:222, pro:19, karb:0, yag:16, lif:0, sod:82, por:100, kat:"Et Ürünleri", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"tavuk kanat", katkiMaddeleri:[] },
  { ad:"Banvit Nugget", marka:"Banvit", kal:265, pro:15, karb:18, yag:14, lif:0.8, sod:480, por:100, kat:"Et Ürünleri", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"tavuk eti, buğday unu, su, tuz, baharat, E450, E451, E471", katkiMaddeleri:[{kod:"E450",ad:"Difosfatlar",tehlikeli:false,aciklama:"Nem tutucu."},{kod:"E451",ad:"Trifosfatlar",tehlikeli:false,aciklama:"Nem tutucu."},{kod:"E471",ad:"Mono ve digliseritler",tehlikeli:false,aciklama:"Emülgatör."}] },
  { ad:"Berrak Ayçiçek Yağı", marka:"Berrak", kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, por:10, kat:"Yağ", ulke:"tr", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"rafine ayçiçek yağı", katkiMaddeleri:[] },
  { ad:"Bizim Zeytinyağı", marka:"Bizim", kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, por:10, kat:"Yağ", ulke:"tr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"sızma zeytinyağı", katkiMaddeleri:[] },
  { ad:"Börek Yufkası", kal:318, pro:9, karb:65, yag:2, lif:2, sod:380, por:100, kat:"Hamur İşleri", ulke:"tr", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"buğday unu, su, tuz", katkiMaddeleri:[] },

  // ── DE ──
  { ad:"Bratwurst", kal:330, pro:14, karb:3, yag:29, lif:0, sod:980, por:100, kat:"Wurst", ulke:"de", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"Schweinefleisch, Schweinespeck, Salz, Gewürze, E250", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."}] },
  { ad:"Berliner Pfannkuchen", kal:352, pro:6, karb:52, yag:14, lif:1.5, sod:185, por:100, kat:"Gebaeck", ulke:"de", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"Weizenmehl, Zucker, Eier, Butter, Hefe, Marmelade", katkiMaddeleri:[] },
  { ad:"Brezeln", kal:380, pro:11, karb:74, yag:2.5, lif:3, sod:1250, por:100, kat:"Brot", ulke:"de", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"Weizenmehl, Wasser, Hefe, Salz, Lauge E524", katkiMaddeleri:[{kod:"E524",ad:"Natriumhydroxid",tehlikeli:false,aciklama:"Laugenmittel fuer Backwaren."}] },
  { ad:"Blutwurst", kal:395, pro:13, karb:5, yag:37, lif:0, sod:1050, por:50, kat:"Wurst", ulke:"de", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"Schweineblut, Speck, Salz, Gewürze, E250", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."}] },
  { ad:"Buttermilch", kal:38, pro:3.3, karb:4.8, yag:0.5, lif:0, sod:45, por:200, kat:"Milchprodukte", ulke:"de", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Buttermilch", katkiMaddeleri:[] },
  { ad:"Bayerische Creme", kal:265, pro:4.5, karb:28, yag:16, lif:0.2, sod:68, por:100, kat:"Dessert", ulke:"de", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"Sahne, Milch, Zucker, Gelatine, Vanille, Eigelb", katkiMaddeleri:[] },
  { ad:"Birnen (Birne)", kal:57, pro:0.4, karb:15, yag:0.1, lif:3.1, sod:1, por:100, kat:"Obst", ulke:"de", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Birne", katkiMaddeleri:[] },
  { ad:"Bienenstich", kal:380, pro:7, karb:48, yag:18, lif:1, sod:120, por:100, kat:"Gebaeck", ulke:"de", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"Mehl, Butter, Zucker, Mandeln, Sahne, Vanille", katkiMaddeleri:[] },

  // ── FR ──
  { ad:"Baguette", kal:275, pro:9, karb:55, yag:1.5, lif:2.7, sod:490, por:100, kat:"Boulangerie", ulke:"fr", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"farine de blé, eau, sel, levure", katkiMaddeleri:[] },
  { ad:"Brie de Meaux", kal:334, pro:20, karb:0.5, yag:28, lif:0, sod:630, por:30, kat:"Fromages", ulke:"fr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"lait, sel, présure", katkiMaddeleri:[] },
  { ad:"Brioche", kal:385, pro:8.5, karb:52, yag:16, lif:2, sod:380, por:100, kat:"Boulangerie", ulke:"fr", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"farine, oeufs, beurre, sucre, levure, sel", katkiMaddeleri:[] },
  { ad:"Bouillabaisse", kal:125, pro:12, karb:8, yag:5, lif:1.5, sod:680, por:300, kat:"Plat", ulke:"fr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"poissons, crustacés, tomates, safran, fenouil, ail", katkiMaddeleri:[] },
  { ad:"Blanquette de Veau", kal:195, pro:22, karb:8, yag:9, lif:0.8, sod:420, por:200, kat:"Plat", ulke:"fr", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"veau, crème, champignons, carottes, farine, beurre", katkiMaddeleri:[] },
  { ad:"Beurre de Normandie", kal:717, pro:0.5, karb:0.5, yag:80, lif:0, sod:580, por:10, kat:"Produits Laitiers", ulke:"fr", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"crème pasteurisée", katkiMaddeleri:[] },
  { ad:"Bordeaux Vin Rouge", kal:85, pro:0.1, karb:2.6, yag:0, lif:0, sod:6, por:150, kat:"Boissons", ulke:"fr", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:1.5, icerik:"raisin, E220", katkiMaddeleri:[{kod:"E220",ad:"Dioxyde de soufre",tehlikeli:true,aciklama:"Peut causer des réactions allergiques."}] },

  // ── IT ──
  { ad:"Bruschetta", kal:225, pro:6, karb:38, yag:7, lif:2.5, sod:420, por:100, kat:"Antipasto", ulke:"it", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"pane, pomodori, aglio, olio d'oliva, basilico", katkiMaddeleri:[] },
  { ad:"Bresaola", kal:158, pro:28, karb:1, yag:4.5, lif:0, sod:1200, por:50, kat:"Salumi", ulke:"it", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"manzo, sale, E250, E252, spezie", katkiMaddeleri:[{kod:"E250",ad:"Nitrito di sodio",tehlikeli:true,aciklama:"In alte dosi può essere cancerogeno."},{kod:"E252",ad:"Nitrato di potassio",tehlikeli:true,aciklama:"In alte dosi dannoso."}] },
  { ad:"Burrata", kal:280, pro:15, karb:2, yag:24, lif:0, sod:420, por:100, kat:"Formaggi", ulke:"it", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"latte di bufala, mozzarella, panna, sale", katkiMaddeleri:[] },
  { ad:"Biscotti di Prato", kal:420, pro:9, karb:68, yag:13, lif:3, sod:85, por:30, kat:"Dolci", ulke:"it", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"farina, mandorle, zucchero, uova, E500", katkiMaddeleri:[{kod:"E500",ad:"Carbonato di sodio",tehlikeli:false,aciklama:"Lievitante."}] },
  { ad:"Bucatini all'Amatriciana", kal:285, pro:12, karb:42, yag:8, lif:2.5, sod:580, por:200, kat:"Pasta", ulke:"it", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"bucatini, guanciale, pomodori, pecorino, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito di sodio",tehlikeli:true,aciklama:"In alte dosi può essere cancerogeno."}] },

  // ── ES ──
  { ad:"Bocadillo de Jamón", kal:285, pro:18, karb:32, yag:9, lif:2, sod:1250, por:200, kat:"Bocadillos", ulke:"es", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"pan, jamón serrano, aceite", katkiMaddeleri:[] },
  { ad:"Boquerones en Vinagre", kal:145, pro:20, karb:1, yag:7, lif:0, sod:480, por:100, kat:"Tapas", ulke:"es", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"boquerones, vinagre, ajo, perejil, aceite", katkiMaddeleri:[] },
  { ad:"Berberecho (Berberechos)", kal:80, pro:14, karb:3.4, yag:1.5, lif:0, sod:420, por:100, kat:"Marisco", ulke:"es", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"berberechos", katkiMaddeleri:[] },
  { ad:"Bizcocho", kal:385, pro:6, karb:58, yag:15, lif:1, sod:280, por:100, kat:"Repostería", ulke:"es", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"harina, huevos, azúcar, aceite, levadura, E500", katkiMaddeleri:[{kod:"E500",ad:"Carbonato de sodio",tehlikeli:false,aciklama:"Leudante."}] },

  // ── EL ──
  { ad:"Μπριάμ", adLatin:"Briami", kal:118, pro:2.5, karb:14, yag:6, lif:3.5, sod:280, por:200, kat:"Ladera", ulke:"el", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"patates, kolokithia, melitzana, tomates, kremidi, elaiolado", katkiMaddeleri:[] },
  { ad:"Μπακαλιάρος", adLatin:"Bakaliaros", kal:82, pro:18, karb:0, yag:0.7, lif:0, sod:55, por:100, kat:"Psari", ulke:"el", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"bakaliaros", katkiMaddeleri:[] },
  { ad:"Μπακλαβάς", adLatin:"Baklava EL", kal:445, pro:7, karb:52, yag:24, lif:1.5, sod:90, por:100, kat:"Glika", ulke:"el", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"filo, voutiro, karidia, zachari, nero", katkiMaddeleri:[] },
  { ad:"Βύσσινο Γλυκό", adLatin:"Vissino Gliko", kal:285, pro:0.5, karb:72, yag:0.1, lif:0.8, sod:6, por:20, kat:"Glika Koutaliou", ulke:"el", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"vissina, zachari, E330", katkiMaddeleri:[{kod:"E330",ad:"Κιτρικό οξύ",tehlikeli:false,aciklama:"Ρυθμιστής οξύτητας."}] },

  // ── DA ──
  { ad:"Brunsviger", kal:368, pro:6, karb:58, yag:13, lif:1.5, sod:280, por:100, kat:"Bagvaerk", ulke:"da", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"hvedemel, smor, brun sukker, flode, hefe", katkiMaddeleri:[] },
  { ad:"Biksemad", kal:185, pro:12, karb:18, yag:8, lif:2, sod:480, por:200, kat:"Koed", ulke:"da", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"kartofler, oksekod, lok, salt, peber", katkiMaddeleri:[] },
  { ad:"Blodpølse", kal:295, pro:10, karb:25, yag:17, lif:0.5, sod:880, por:100, kat:"Koed", ulke:"da", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"svinblod, mel, salt, E250, krydderier", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"Konserveringsmiddel."}] },

  // ── NO ──
  { ad:"Brunost (Geitost)", kal:375, pro:9, karb:50, yag:15, lif:0, sod:580, por:30, kat:"Mejeri", ulke:"no", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"myse, geitemelk, sukker", katkiMaddeleri:[] },
  { ad:"Bergensk Fiskesuppe", kal:98, pro:8, karb:8, yag:4, lif:1, sod:580, por:300, kat:"Suppe", ulke:"no", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"fisk, rotgronsaker, flote, smor, salt, pepper", katkiMaddeleri:[] },
  { ad:"Bidos (Reinsdyrsuppe)", kal:88, pro:7, karb:9, yag:3, lif:1.5, sod:520, por:300, kat:"Suppe", ulke:"no", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"reinsdyrkjott, rotgronsaker, salt, pepper", katkiMaddeleri:[] },

  // ── SV ──
  { ad:"Blodpudding", kal:295, pro:10, karb:25, yag:17, lif:0.5, sod:850, por:100, kat:"Kott", ulke:"sv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"blod, miol, salt, E250, kryddor", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"Konserveringsmedel."}] },
  { ad:"Bullar (Kanelbullar)", kal:375, pro:7, karb:56, yag:14, lif:2, sod:280, por:80, kat:"Bageri", ulke:"sv", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"vete, smor, socker, kanel, kardemumma, jast", katkiMaddeleri:[] },
  { ad:"Bregott Smör", marka:"Bregott", kal:720, pro:0.5, karb:0.4, yag:80, lif:0, sod:580, por:10, kat:"Mejeri", ulke:"sv", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"gradsmor, rapsolja, salt", katkiMaddeleri:[] },

  // ── FI ──
  { ad:"Blinit (Blini)", kal:248, pro:8, karb:32, yag:11, lif:1.5, sod:380, por:100, kat:"Leivonnaiset", ulke:"fi", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"tattarijauho, maito, kananmuna, voi, suola", katkiMaddeleri:[] },
  { ad:"Borssi (Borscht)", kal:65, pro:2.5, karb:10, yag:2, lif:2.5, sod:480, por:300, kat:"Keitot", ulke:"fi", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"punajuuri, kaali, porkanna, sipuli, tomaatti, smetana", katkiMaddeleri:[] },

  // ── NL ──
  { ad:"Bitterballen", kal:295, pro:10, karb:22, yag:19, lif:1, sod:580, por:100, kat:"Snack", ulke:"nl", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"rundvlees, bloem, boter, zout, E450", katkiMaddeleri:[{kod:"E450",ad:"Difosfaten",tehlikeli:false,aciklama:"Rijsmiddel."}] },
  { ad:"Boterkoek", kal:448, pro:5, karb:52, yag:25, lif:1, sod:280, por:50, kat:"Koek", ulke:"nl", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"bloem, boter, suiker, zout", katkiMaddeleri:[] },
  { ad:"Broodje Kroket", kal:385, pro:12, karb:48, yag:16, lif:2.5, sod:820, por:180, kat:"Broodjes", ulke:"nl", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"brood, kroket, mosterd, E450, E471", katkiMaddeleri:[{kod:"E450",ad:"Difosfaten",tehlikeli:false,aciklama:"Rijsmiddel."},{kod:"E471",ad:"Mono en diglyceriden",tehlikeli:false,aciklama:"Emulgator."}] },

  // ── BE ──
  { ad:"Belgische Wafels", kal:358, pro:7, karb:52, yag:14, lif:1.5, sod:280, por:100, kat:"Gebaeck", ulke:"be", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"bloem, eieren, melk, suiker, boter, vanille", katkiMaddeleri:[] },
  { ad:"Bloedpens", kal:295, pro:10, karb:22, yag:19, lif:0.5, sod:950, por:100, kat:"Vlees", ulke:"be", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"varkensbloed, bloem, vet, zout, E250", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitriet",tehlikeli:true,aciklama:"In hoge doses kankerverwekkend."}] },

  // ── AT ──
  { ad:"Buchteln", kal:322, pro:7, karb:52, yag:10, lif:1.5, sod:220, por:100, kat:"Gebaeck", ulke:"at", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"Mehl, Hefe, Milch, Butter, Zucker, Eier, Vanille", katkiMaddeleri:[] },
  { ad:"Beuschel", kal:195, pro:18, karb:8, yag:10, lif:0.5, sod:480, por:200, kat:"Fleisch", ulke:"at", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"Rinderherz, Kalbslunge, Sahne, Zwiebel, Salz", katkiMaddeleri:[] },

  // ── PL ──
  { ad:"Bigos", adLatin:"Bigos", kal:165, pro:10, karb:12, yag:8, lif:4, sod:680, por:300, kat:"Dania Glowne", ulke:"pl", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"kapusta kiszona, mieso, kielbasa, grzyby, E250", katkiMaddeleri:[{kod:"E250",ad:"Azotyn sodu",tehlikeli:true,aciklama:"W duzych ilosciach moze byc rakotwórczy."}] },
  { ad:"Barszcz Czerwony", adLatin:"Barszcz Czerwony", kal:42, pro:1.5, karb:8, yag:0.5, lif:2, sod:580, por:300, kat:"Zupy", ulke:"pl", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"buraki, sok cytrynowy, vegeta, majeranek", katkiMaddeleri:[] },
  { ad:"Bułka Maślana", adLatin:"Bulka Maslana", kal:320, pro:8, karb:52, yag:10, lif:2, sod:380, por:80, kat:"Pieczywo", ulke:"pl", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"mąka pszenna, masło, mleko, jajka, cukier, drożdże", katkiMaddeleri:[] },

  // ── CS ──
  { ad:"Bramboráky", adLatin:"Bramboraky", kal:248, pro:5, karb:32, yag:12, lif:2.5, sod:480, por:150, kat:"Prilohy", ulke:"cs", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"brambory, mouka, vajicko, cesnek, majoranka, sůl", katkiMaddeleri:[] },
  { ad:"Bramborová Polévka", adLatin:"Bramborova Polevka", kal:72, pro:2.5, karb:12, yag:2, lif:1.5, sod:480, por:300, kat:"Polevky", ulke:"cs", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"brambory, mrkev, celer, petrzel, sůl, smetana", katkiMaddeleri:[] },

  // ── HU ──
  { ad:"Bableves", adLatin:"Bableves", kal:88, pro:5, karb:14, yag:2, lif:4, sod:520, por:300, kat:"Levesek", ulke:"hu", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"feher bab, sárgarépa, zeller, babérlevél, só", katkiMaddeleri:[] },
  { ad:"Bácskai Gulyás", adLatin:"Bacskai Gulyas", kal:175, pro:15, karb:10, yag:8, lif:2, sod:480, por:300, kat:"Fogasok", ulke:"hu", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"marhabus, paprika, hagyma, zsir, só, bors, pirospaprika", katkiMaddeleri:[] },

  // ── RO ──
  { ad:"Borș de Legume", adLatin:"Bors de Legume", kal:45, pro:1.5, karb:8, yag:1, lif:2, sod:480, por:300, kat:"Ciorbe", ulke:"ro", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"morcovi, radacina de patrunjel, ceapa, cartofi, bors, smantana", katkiMaddeleri:[] },
  { ad:"Bulz (Mămăligă cu Brânză)", adLatin:"Bulz Mamaliga cu Branza", kal:245, pro:9, karb:28, yag:12, lif:1.5, sod:620, por:150, kat:"Mancare", ulke:"ro", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"malai, branza de oaie, smantana, unt", katkiMaddeleri:[] },

  // ── HR ──
  { ad:"Brodet", adLatin:"Brodet", kal:145, pro:18, karb:6, yag:5.5, lif:1.5, sod:580, por:300, kat:"Jela", ulke:"hr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"riba, luk, maslinovo ulje, rajcica, vino, cesnjak", katkiMaddeleri:[] },
  { ad:"Burek s Mesom", adLatin:"Burek s Mesom", kal:318, pro:14, karb:30, yag:16, lif:1.5, sod:520, por:150, kat:"Pecivo", ulke:"hr", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"tijesto za burek, mljeveno meso, luk, sol", katkiMaddeleri:[] },

  // ── PT ──
  { ad:"Bacalhau à Brás", kal:285, pro:22, karb:18, yag:15, lif:2, sod:980, por:200, kat:"Prato", ulke:"pt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"bacalhau, batata palha, ovos, cebola, azeite, salsa", katkiMaddeleri:[] },
  { ad:"Bifanas", kal:285, pro:18, karb:32, yag:10, lif:2, sod:680, por:200, kat:"Sandes", ulke:"pt", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"pao, carne de porco, mostarda, piri-piri", katkiMaddeleri:[] },

  // ── EN ──
  { ad:"Bacon (Streaky)", kal:548, pro:30, karb:0, yag:48, lif:0, sod:1650, por:50, kat:"Meat", ulke:"en", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:2, icerik:"pork belly, salt, E250, E252", katkiMaddeleri:[{kod:"E250",ad:"Sodium nitrite",tehlikeli:true,aciklama:"In high amounts may be carcinogenic."},{kod:"E252",ad:"Potassium nitrate",tehlikeli:true,aciklama:"In high amounts harmful."}] },
  { ad:"Baked Beans (Heinz)", marka:"Heinz", kal:78, pro:4.8, karb:13, yag:0.4, lif:3.5, sod:420, por:130, kat:"Tinned", ulke:"en", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"navy beans, tomato sauce, sugar, salt, E260, modified starch", katkiMaddeleri:[{kod:"E260",ad:"Acetic acid",tehlikeli:false,aciklama:"Acidity regulator."}] },
  { ad:"Bangers and Mash", kal:295, pro:14, karb:28, yag:15, lif:2.5, sod:780, por:300, kat:"Dish", ulke:"en", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"pork sausages, potato, butter, milk, onion gravy, E250", katkiMaddeleri:[{kod:"E250",ad:"Sodium nitrite",tehlikeli:true,aciklama:"In high amounts may be carcinogenic."}] },
  { ad:"Brown Sauce (HP)", marka:"HP", kal:100, pro:1, karb:23, yag:0.1, lif:0.5, sod:1300, por:15, kat:"Sauces", ulke:"en", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"tomatoes, spirit vinegar, molasses, tamarind, E150c, E260", katkiMaddeleri:[{kod:"E150c",ad:"Ammonia caramel",tehlikeli:false,aciklama:"Colouring."},{kod:"E260",ad:"Acetic acid",tehlikeli:false,aciklama:"Acidity regulator."}] },
  { ad:"Branston Pickle", marka:"Branston", kal:88, pro:0.5, karb:20, yag:0.2, lif:1.5, sod:1100, por:30, kat:"Condiments", ulke:"en", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"vegetables, vinegar, sugar, salt, E150c, E415", katkiMaddeleri:[{kod:"E150c",ad:"Ammonia caramel",tehlikeli:false,aciklama:"Colouring."},{kod:"E415",ad:"Xanthan gum",tehlikeli:false,aciklama:"Thickener."}] },
  { ad:"Beef Burger (Asda)", marka:"Asda", kal:255, pro:18, karb:8, yag:17, lif:0.8, sod:580, por:120, kat:"Meat", ulke:"en", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"beef, rusk, water, salt, E450, E451", katkiMaddeleri:[{kod:"E450",ad:"Diphosphates",tehlikeli:false,aciklama:"Moisture retention."},{kod:"E451",ad:"Triphosphates",tehlikeli:false,aciklama:"Moisture retention."}] },
// ── PAYLAŞILAN MARKALAR EK ──
  { ad:"Belvita Breakfast Biscuits", adler:{tr:"Belvita Kahvaltı Bisküvisi",de:"Belvita Frühstückskeks",el:"Μπελβίτα Μπισκότο Πρωινού",hu:"Belvita Reggeli Keksz",pl:"Belvita Ciastka Śniadaniowe",cs:"Belvita Snídaňové Sušenky",ro:"Belvita Biscuiți de Dimineață",hr:"Belvita Jutarnji Keksi"}, marka:"Belvita", kal:422, pro:8, karb:68, yag:13, lif:5, sod:380, por:50, kat:"Breakfast", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"wheat flour, sugar, palm oil, oat flakes, E471, E322, E500", katkiMaddeleri:[{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E322",ad:"Lecithins",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E500",ad:"Sodium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },
  { ad:"Bounty Bar", adler:{tr:"Bounty Çikolata",de:"Bounty Schokolade",el:"Μπάουντι",hu:"Bounty Csoki",pl:"Bounty Baton",cs:"Bounty Čokoláda",ro:"Bounty Baton",hr:"Bounty Čokolada"}, marka:"Mars", kal:476, pro:4, karb:59, yag:25, lif:2, sod:115, por:57, kat:"Chocolate", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"sugar, coconut, glucose syrup, cocoa butter, cocoa mass, E322, E476", katkiMaddeleri:[{kod:"E322",ad:"Lecithins",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E476",ad:"Polyglycerol polyricinoleate",tehlikeli:false,aciklama:"Emulsifier."}] },
  { ad:"Basmati Rice (Kohinoor)", adler:{tr:"Basmati Pirinç",de:"Basmati Reis",el:"Ρύζι Μπασμάτι",hu:"Basmati Rizs",pl:"Ryż Basmati",cs:"Rýže Basmati",ro:"Orez Basmati",hr:"Basmati Riža"}, marka:"Kohinoor", kal:355, pro:7, karb:79, yag:0.5, lif:1, sod:4, por:100, kat:"Rice", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"basmati rice", katkiMaddeleri:[] },
  { ad:"Black Pepper", adler:{tr:"Karabiber",de:"Schwarzer Pfeffer",el:"Μαύρο Πιπέρι",hu:"Fekete Bors",pl:"Czarny Pieprz",cs:"Černý Pepř",ro:"Piper Negru",hr:"Crni Papar",fr:"Poivre Noir",es:"Pimienta Negra",it:"Pepe Nero",pt:"Pimenta Preta",no:"Svart Pepper",sv:"Svartpeppar",da:"Sort Peber",fi:"Mustapippuri",nl:"Zwarte Peper"}, kal:251, pro:10, karb:64, yag:3.3, lif:25, sod:20, por:5, kat:"Spice", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"black pepper", katkiMaddeleri:[] },
  { ad:"Bay Leaf (Defne Yaprağı)", adler:{tr:"Defne Yaprağı",de:"Lorbeerblatt",el:"Δάφνη",hu:"Babérlevél",pl:"Liść Laurowy",cs:"Bobkový List",ro:"Foi de Dafin",hr:"Lovorov List",fr:"Laurier",es:"Hoja de Laurel",it:"Alloro",pt:"Louro",no:"Laurbærblad",sv:"Lagerblad",da:"Laurbærblad",fi:"Laakerinlehti",nl:"Laurierblad"}, kal:313, pro:7.6, karb:75, yag:8.4, lif:26, sod:23, por:2, kat:"Herb", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"bay leaves", katkiMaddeleri:[] },
  { ad:"Basil (Fesleğen)", adler:{tr:"Fesleğen",de:"Basilikum",el:"Βασιλικός",hu:"Bazsalikom",pl:"Bazylia",cs:"Bazalka",ro:"Busuioc",hr:"Bosiljak",fr:"Basilic",es:"Albahaca",it:"Basilico",pt:"Manjericão",no:"Basilikum",sv:"Basilika",da:"Basilikum",fi:"Basilika",nl:"Basilicum"}, kal:22, pro:3.2, karb:2.7, yag:0.6, lif:1.6, sod:4, por:10, kat:"Herb", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"fresh basil", katkiMaddeleri:[] },
  { ad:"Brown Rice", adler:{tr:"Esmer Pirinç",de:"Brauner Reis",el:"Καστανό Ρύζι",hu:"Barna Rizs",pl:"Brązowy Ryż",cs:"Hnědá Rýže",ro:"Orez Brun",hr:"Smeđa Riža",fr:"Riz Complet",es:"Arroz Integral",it:"Riso Integrale",pt:"Arroz Integral",no:"Brun Ris",sv:"Brunt Ris",da:"Brun Ris",fi:"Ruskea Riisi",nl:"Bruine Rijst"}, kal:362, pro:8, karb:76, yag:2.9, lif:3.5, sod:7, por:100, kat:"Grain", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"brown rice", katkiMaddeleri:[] },
  { ad:"Bok Choy (Pak Choi)", adler:{tr:"Pak Çoy",de:"Pak Choi",el:"Πακ Τσόι",hu:"Pak Choi",pl:"Pak Choi",cs:"Pak Choi",ro:"Pak Choi",hr:"Pak Choi",fr:"Pak Choï",es:"Pak Choi",it:"Pak Choi",pt:"Pak Choi",no:"Pak Choi",sv:"Pak Choi",da:"Pak Choi",fi:"Pak Choi",nl:"Pak Choi"}, kal:13, pro:1.5, karb:2.2, yag:0.2, lif:1, sod:65, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"bok choy", katkiMaddeleri:[] },

  // ── TR EK B ──
  { ad:"Balık Çorbası", kal:72, pro:6.5, karb:6, yag:2.5, lif:0.8, sod:480, por:250, kat:"Çorba", ulke:"tr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"balık, sebze, tereyağı, un, tuz", katkiMaddeleri:[] },
  { ad:"Balık Tarator", kal:165, pro:12, karb:8, yag:10, lif:2, sod:380, por:100, kat:"Meze", ulke:"tr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"balık, ceviz, sarımsak, ekmek, limon", katkiMaddeleri:[] },
  { ad:"Baklava Kadayıf", kal:398, pro:6, karb:58, yag:16, lif:1.5, sod:95, por:100, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"kadayıf, tereyağı, şeker, su, ceviz", katkiMaddeleri:[] },
  { ad:"Bamya Yemeği", kal:95, pro:3, karb:12, yag:4, lif:4, sod:380, por:200, kat:"Sebze Yemekleri", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"bamya, domates, soğan, zeytinyağı, tuz", katkiMaddeleri:[] },
  { ad:"Barbunya Pilaki", kal:135, pro:7.5, karb:18, yag:4.5, lif:6, sod:280, por:150, kat:"Baklagil", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"barbunya fasulyesi, domates, soğan, havuç, zeytinyağı", katkiMaddeleri:[] },
  { ad:"Barbekü Soslu Kanat", kal:295, pro:24, karb:12, yag:18, lif:0.5, sod:680, por:150, kat:"Et", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:3, icerik:"tavuk kanat, barbekü sosu, tuz, baharat", katkiMaddeleri:[] },
  { ad:"Beyti Kebap", kal:268, pro:24, karb:4, yag:18, lif:0.5, sod:420, por:150, kat:"Et", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"dana kıyma, sarımsak, maydanoz, tuz, biber", katkiMaddeleri:[] },
  { ad:"Böğürtlenli Tart", kal:285, pro:5, karb:42, yag:12, lif:3.5, sod:180, por:100, kat:"Tatlı", ulke:"tr", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"un, tereyağı, şeker, böğürtlen, yumurta", katkiMaddeleri:[] },
  { ad:"Balık Buğulama", kal:145, pro:22, karb:2, yag:5.5, lif:0.5, sod:380, por:200, kat:"Balık", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"balık, domates, soğan, zeytinyağı, limon, maydanoz", katkiMaddeleri:[] },
  { ad:"Biberli Ekmek", kal:262, pro:8, karb:50, yag:4, lif:2.5, sod:520, por:100, kat:"Ekmek", ulke:"tr", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"buğday unu, su, tuz, maya, kırmızı biber", katkiMaddeleri:[] },
  { ad:"Biber Salçası", kal:65, pro:2.5, karb:13, yag:0.5, lif:3, sod:1850, por:20, kat:"Sos", ulke:"tr", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"kırmızı biber, tuz", katkiMaddeleri:[] },
  { ad:"Börek (Kol Böreği)", kal:312, pro:9, karb:34, yag:16, lif:1.5, sod:480, por:100, kat:"Hamur İşleri", ulke:"tr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"yufka, beyaz peynir, yumurta, sıvı yağ", katkiMaddeleri:[] },
  { ad:"Boza (Hazır)", marka:"Vefa", kal:75, pro:1.2, karb:16, yag:0.5, lif:0.5, sod:28, por:200, kat:"İçecek", ulke:"tr", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"mısır unu, şeker, su, maya, E330", katkiMaddeleri:[{kod:"E330",ad:"Sitrik asit",tehlikeli:false,aciklama:"Asitlik düzenleyici."}] },
  { ad:"Bal Kabağı Tatlısı", kal:185, pro:1.5, karb:42, yag:3, lif:2, sod:18, por:150, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"balkabağı, şeker, tahin, ceviz", katkiMaddeleri:[] },
  { ad:"Balık (Hamsi Tava)", kal:215, pro:18, karb:8, yag:12, lif:0.5, sod:320, por:100, kat:"Balık", ulke:"tr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"hamsi, mısır unu, zeytinyağı, tuz", katkiMaddeleri:[] },
  { ad:"Beyin (Dana)", kal:144, pro:10, karb:1.1, yag:11, lif:0, sod:120, por:100, kat:"Sakatat", ulke:"tr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"dana beyni", katkiMaddeleri:[] },

  // ── DE EK ──
  { ad:"Bockwurst", kal:290, pro:12, karb:2, yag:26, lif:0, sod:920, por:100, kat:"Wurst", ulke:"de", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"Schweine-/Rindfleisch, Salz, Gewürze, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."},{kod:"E451",ad:"Triphosphate",tehlikeli:false,aciklama:"Feuchthaltemittel."}] },
  { ad:"Bergkäse", kal:385, pro:27, karb:0.5, yag:31, lif:0, sod:640, por:30, kat:"Milchprodukte", ulke:"de", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"Alpenmilch, Salz, Lab", katkiMaddeleri:[] },
  { ad:"Butterkäse", kal:345, pro:23, karb:0.5, yag:28, lif:0, sod:580, por:30, kat:"Milchprodukte", ulke:"de", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Milch, Salz, Lab", katkiMaddeleri:[] },
  { ad:"Brötchen", kal:268, pro:9, karb:52, yag:2.5, lif:2.5, sod:480, por:60, kat:"Brot", ulke:"de", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"Weizenmehl, Wasser, Salz, Hefe", katkiMaddeleri:[] },
  { ad:"Bauernbrot", kal:225, pro:7.5, karb:43, yag:2, lif:6, sod:480, por:100, kat:"Brot", ulke:"de", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"Roggenmehl, Weizenmehl, Sauerteig, Wasser, Salz", katkiMaddeleri:[] },
  { ad:"Bircher Müsli", kal:165, pro:5, karb:28, yag:4, lif:4, sod:45, por:150, kat:"Fruehstueck", ulke:"de", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"Haferflocken, Milch, Joghurt, Äpfel, Nüsse, Honig", katkiMaddeleri:[] },

  // ── FR EK ──
  { ad:"Bœuf Bourguignon", kal:225, pro:22, karb:8, yag:12, lif:2, sod:520, por:250, kat:"Plat", ulke:"fr", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"boeuf, vin rouge, lardons, champignons, carottes, oignons", katkiMaddeleri:[] },
  { ad:"Brandade de Morue", kal:235, pro:18, karb:12, yag:14, lif:1, sod:680, por:150, kat:"Plat", ulke:"fr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"morue, pommes de terre, huile d'olive, lait, ail", katkiMaddeleri:[] },
  { ad:"Bleu d'Auvergne", kal:355, pro:21, karb:0.5, yag:30, lif:0, sod:1480, por:30, kat:"Fromages", ulke:"fr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"lait de vache, sel, presure, moisissures", katkiMaddeleri:[] },

  // ── IT EK ──
  { ad:"Bistecca alla Fiorentina", kal:285, pro:30, karb:0, yag:18, lif:0, sod:80, por:200, kat:"Carne", ulke:"it", tokPuan:78, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"bistecca di manzo Chianina, sale, pepe, olio", katkiMaddeleri:[] },
  { ad:"Borlotti Beans", kal:127, pro:8.7, karb:23, yag:0.5, lif:6.4, sod:2, por:100, kat:"Legumi", ulke:"it", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"fagioli borlotti, acqua", katkiMaddeleri:[] },
  { ad:"Bottarga", kal:235, pro:28, karb:0, yag:13, lif:0, sod:2800, por:20, kat:"Pesce", ulke:"it", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"uova di muggine o tonno, sale", katkiMaddeleri:[] },

  // ── ES EK ──
  { ad:"Bacalao al Pil-Pil", kal:225, pro:22, karb:2, yag:14, lif:0.5, sod:680, por:200, kat:"Pescado", ulke:"es", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"bacalao desalado, aceite de oliva, ajo, guindilla", katkiMaddeleri:[] },
  { ad:"Berberechos Lata", kal:78, pro:14, karb:2, yag:1.5, lif:0, sod:580, por:80, kat:"Conservas", ulke:"es", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"berberechos, agua, sal", katkiMaddeleri:[] },
  { ad:"Bombón de Chocolate", kal:510, pro:5, karb:58, yag:30, lif:2, sod:45, por:30, kat:"Dulces", ulke:"es", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"chocolate negro, azúcar, manteca de cacao, E322", katkiMaddeleri:[{kod:"E322",ad:"Lecitinas",tehlikeli:false,aciklama:"Emulsionante."}] },

  // ── EL EK ──
  { ad:"Μουσακάς", adLatin:"Mousakas", kal:245, pro:14, karb:15, yag:15, lif:3, sod:520, por:250, kat:"Kyria Piata", ulke:"el", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"melitzana, kima, tomates, besarnel, tyri, kremidi", katkiMaddeleri:[] },
  { ad:"Μπιφτέκι", adLatin:"Bifteki", kal:248, pro:20, karb:6, yag:16, lif:0.8, sod:420, por:150, kat:"Kyria Piata", ulke:"el", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"kima, kremidi, skordho, oregano, alati", katkiMaddeleri:[] },
  { ad:"Μπακλαβάς Θεσσαλονίκης", adLatin:"Baklava Thessalonikis", kal:448, pro:7, karb:52, yag:24, lif:2, sod:85, por:100, kat:"Glika", ulke:"el", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"filo, voutiro, karidia, amygdala, zachari, kanela", katkiMaddeleri:[] },
  { ad:"Βυσσινάδα", adLatin:"Vissinada", kal:58, pro:0.2, karb:14, yag:0, lif:0.2, sod:5, por:200, kat:"Pota", ulke:"el", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"vissino, zachari, nero, E330", katkiMaddeleri:[{kod:"E330",ad:"Κιτρικό οξύ",tehlikeli:false,aciklama:"Ρυθμιστής οξύτητας."}] },

  // ── DA EK ──
  { ad:"Boller i karry", kal:195, pro:15, karb:12, yag:10, lif:1.5, sod:520, por:200, kat:"Koed", ulke:"da", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"hakket svinekod, karry, lok, mel, fløde, salt", katkiMaddeleri:[] },
  { ad:"Bøfsandwich", kal:285, pro:18, karb:28, yag:12, lif:2, sod:680, por:200, kat:"Koed", ulke:"da", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"oksekod, sennep, lok, agurk, brod", katkiMaddeleri:[] },
  { ad:"Bondebrod", kal:225, pro:7.5, karb:42, yag:2.5, lif:6, sod:480, por:100, kat:"Brod", ulke:"da", tokPuan:60, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"rugmel, hvedemel, surdej, vand, salt", katkiMaddeleri:[] },
  { ad:"Blåbærsyltetøj", kal:245, pro:0.4, karb:62, yag:0, lif:1.5, sod:8, por:20, kat:"Syltetoj", ulke:"da", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"blåbær, sukker, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektin",tehlikeli:false,aciklama:"Geliermiddel."},{kod:"E330",ad:"Citronsyre",tehlikeli:false,aciklama:"Surhetsregulator."}] },

  // ── NO EK ──
  { ad:"Brunost Gudbrandsdalsost", marka:"Tine", kal:385, pro:8, karb:52, yag:17, lif:0, sod:640, por:30, kat:"Mejeri", ulke:"no", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"myse, helmelk, fløte, sukker", katkiMaddeleri:[] },
  { ad:"Bergensk Lapskaus", kal:145, pro:10, karb:16, yag:5, lif:2.5, sod:520, por:300, kat:"Gryteretter", ulke:"no", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"lammekjøtt, rotgrønnsaker, vann, salt, pepper", katkiMaddeleri:[] },
  { ad:"Blåbær (NO)", kal:57, pro:0.7, karb:14, yag:0.3, lif:2.4, sod:1, por:100, kat:"Baer", ulke:"no", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"blåbær", katkiMaddeleri:[] },

  // ── SV EK ──
  { ad:"Blåbärssoppa", kal:75, pro:0.5, karb:18, yag:0.2, lif:1.5, sod:5, por:200, kat:"Soppa", ulke:"sv", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"blåbär, socker, vatten, potatismjöl", katkiMaddeleri:[] },

  // ── FI EK ──
  { ad:"Bliniit Perinteinen", kal:248, pro:8, karb:32, yag:11, lif:1.5, sod:380, por:100, kat:"Leivonnaiset", ulke:"fi", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"tattarijauho, vehnäjauho, maito, kananmuna, voi, suola", katkiMaddeleri:[] },
  { ad:"Banaanipuuro", kal:105, pro:2.5, karb:20, yag:2, lif:2, sod:45, por:200, kat:"Aamupalat", ulke:"fi", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"kaura, maito, banaani, hunaja", katkiMaddeleri:[] },

  // ── NL EK ──
  { ad:"Boerenkool Stamppot", kal:165, pro:6, karb:22, yag:6, lif:5, sod:480, por:300, kat:"Stamppot", ulke:"nl", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"aardappelen, boerenkool, rookworst, zout, boter", katkiMadleleri:[] },
  { ad:"Beschuit", kal:398, pro:11, karb:78, yag:3.5, lif:4, sod:580, por:15, kat:"Ontbijt", ulke:"nl", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"bloem, zout, gist, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono en diglyceriden",tehlikeli:false,aciklama:"Emulgator."}] },
  { ad:"Bieslook", kal:30, pro:3.3, karb:4.4, yag:0.7, lif:2.5, sod:3, por:10, kat:"Groente", ulke:"nl", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"bieslook", katkiMaddeleri:[] },

  // ── BE EK ──
  { ad:"Berkebrod (Brood met zaden)", kal:242, pro:9, karb:44, yag:4.5, lif:6, sod:420, por:100, kat:"Brood", ulke:"be", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"volkorenmeel, water, zout, gist, zaden", katkiMaddeleri:[] },

  // ── AT EK ──
  { ad:"Backhendl", kal:285, pro:22, karb:14, yag:16, lif:1, sod:420, por:150, kat:"Fleisch", ulke:"at", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"Hühnchen, Paniermehl, Eier, Mehl, Butterschmalz", katkiMaddeleri:[] },
  { ad:"Bauernschmaus", kal:398, pro:22, karb:18, yag:28, lif:3, sod:980, por:300, kat:"Fleisch", ulke:"at", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:3, icerik:"Schweinefleisch, Sauerkraut, Knödel, Speck, E250", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."}] },
  { ad:"Birnenstrudel", kal:252, pro:4, karb:38, yag:10, lif:2.5, sod:95, por:100, kat:"Dessert", ulke:"at", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"Strudelteig, Birnen, Zucker, Zimt, Butter, Rosinen", katkiMaddeleri:[] },

  // ── PL EK ──
  { ad:"Barszcz Wigilijny", adLatin:"Barszcz Wigilijny", kal:38, pro:1.2, karb:7, yag:0.5, lif:1.5, sod:480, por:300, kat:"Zupy", ulke:"pl", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"buraki, ocet, czosnek, majeranek, sol", katkiMaddeleri:[] },
  { ad:"Bułka Kajzerka", adLatin:"Bulka Kajzerka", kal:268, pro:9, karb:52, yag:2.5, lif:2.5, sod:480, por:60, kat:"Pieczywo", ulke:"pl", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"mąka pszenna, woda, sól, drożdże", katkiMaddeleri:[] },
  { ad:"Befsztyk Tatarski", adLatin:"Befsztyk Tatarski", kal:195, pro:20, karb:2, yag:12, lif:0.5, sod:420, por:100, kat:"Dania Glowne", ulke:"pl", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"wołowina, jajko, cebula, ogórek, kapary", katkiMaddeleri:[] },

  // ── CS EK ──
  { ad:"Bramborové Knedlíky", adLatin:"Bramborove Knedliky", kal:185, pro:4.5, karb:38, yag:1.5, lif:2, sod:280, por:150, kat:"Prilohy", ulke:"cs", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"brambory, mouka, vajicko, sůl", katkiMaddeleri:[] },
  { ad:"Burizonka", adLatin:"Burizonka", kal:328, pro:18, karb:2, yag:28, lif:0, sod:1150, por:50, kat:"Maso", ulke:"cs", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"vepřové maso, sůl, E250, E451, koření", katkiMaddeleri:[{kod:"E250",ad:"Dusiétan sodný",tehlikeli:true,aciklama:"Ve vysokých dávkách karcinogenní."},{kod:"E451",ad:"Trifosfáty",tehlikeli:false,aciklama:"Udržovač vlhkosti."}] },
  { ad:"Borůvková Buchta", adLatin:"Boruvkova Buchta", kal:295, pro:5.5, karb:48, yag:10, lif:2, sod:185, por:100, kat:"Dezerty", ulke:"cs", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"mouka, borůvky, cukr, máslo, vejce, prašek do pečiva", katkiMaddeleri:[] },

  // ── HU EK ──
  { ad:"Biksemad Magyar", adLatin:"Biksemad Magyar", kal:185, pro:12, karb:18, yag:8, lif:2, sod:480, por:200, kat:"Fogasok", ulke:"hu", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"burgonya, hús, hagyma, só, bors", katkiMaddeleri:[] },
  { ad:"Bogácsi Birkapörkölt", adLatin:"Bogacsi Birkapoerkolt", kal:225, pro:20, karb:5, yag:14, lif:1.5, sod:480, por:250, kat:"Fogasok", ulke:"hu", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"birkahus, hagyma, paprika, só, zsir", katkiMaddeleri:[] },
  { ad:"Barackos Gombóc", adLatin:"Barackos Gomboc", kal:265, pro:5, karb:48, yag:7, lif:2, sod:165, por:150, kat:"Dessert", ulke:"hu", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"burgonya, liszt, tojás, őszibarack, zsemlemorzsa, vaj", katkiMaddeleri:[] },

  // ── RO EK ──
  { ad:"Balmoș", adLatin:"Balmos", kal:285, pro:8, karb:28, yag:16, lif:1, sod:580, por:200, kat:"Mancare", ulke:"ro", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"malai, smantana, branza, unt", katkiMaddeleri:[] },
  { ad:"Bragă", adLatin:"Braga", kal:65, pro:1, karb:14, yag:0.3, lif:0.5, sod:22, por:200, kat:"Bauturi", ulke:"ro", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"mălai, mei, zahar, drojdie, apa", katkiMaddeleri:[] },
  { ad:"Brânză de Burduf", adLatin:"Branza de Burduf", kal:335, pro:20, karb:1, yag:28, lif:0, sod:1480, por:30, kat:"Lactate", ulke:"ro", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"lapte de oaie, sare", katkiMaddeleri:[] },

  // ── HR EK ──
  { ad:"Bijeli Burek", adLatin:"Bijeli Burek", kal:295, pro:10, karb:30, yag:16, lif:1.5, sod:480, por:150, kat:"Pecivo", ulke:"hr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"tijesto, bijeli sir, jaja, sol, maslac", katkiMaddeleri:[] },
  { ad:"Bučnica", adLatin:"Bucnica", kal:185, pro:7, karb:22, yag:9, lif:2.5, sod:380, por:150, kat:"Pecivo", ulke:"hr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"bundeva, tijesto, jaja, sir, sol", katkiMaddeleri:[] },
  { ad:"Brancin na Gradele", adLatin:"Brancin na Gradele", kal:124, pro:19, karb:0, yag:5.2, lif:0, sod:87, por:200, kat:"Riba", ulke:"hr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"brancin, maslinovo ulje, sol, bilje", katkiMaddeleri:[] },

  // ── PT EK ──
  { ad:"Bacalhau com Grão", kal:195, pro:20, karb:16, yag:7, lif:5, sod:680, por:250, kat:"Prato", ulke:"pt", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"bacalhau, grao de bico, azeite, alho, cebola, coentros", katkiMaddeleri:[] },
  { ad:"Broa de Milho", kal:248, pro:5, karb:52, yag:3, lif:3.5, sod:380, por:100, kat:"Pao", ulke:"pt", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"farinha de milho, agua, sal, fermento", katkiMaddeleri:[] },
  { ad:"Bola de Berlim", kal:352, pro:6, karb:52, yag:14, lif:1.5, sod:185, por:100, kat:"Pastelaria", ulke:"pt", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"farinha, ovos, leite, manteiga, fermento, doce de ovos", katkiMaddeleri:[] },

  // ── EN EK ──
  { ad:"British Cheddar", kal:402, pro:25, karb:0.1, yag:34, lif:0, sod:670, por:30, kat:"Dairy", ulke:"en", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"milk, salt, starter culture, rennet", katkiMaddeleri:[] },
  { ad:"Bread and Butter Pudding", kal:285, pro:8, karb:38, yag:12, lif:1.5, sod:280, por:150, kat:"Dessert", ulke:"en", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"bread, butter, eggs, milk, sugar, raisins, vanilla", katkiMaddeleri:[] },
  { ad:"Bramley Apple", kal:36, pro:0.3, karb:9.6, yag:0.1, lif:1.9, sod:3, por:100, kat:"Fruit", ulke:"en", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"bramley apple", katkiMaddeleri:[] },
  { ad:"Black Pudding", kal:305, pro:11, karb:16, yag:22, lif:0.5, sod:1120, por:100, kat:"Meat", ulke:"en", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"pork blood, oatmeal, fat, salt, spices, E250", katkiMaddeleri:[{kod:"E250",ad:"Sodium nitrite",tehlikeli:true,aciklama:"In high amounts may be carcinogenic."}] },


  // ── PAYLAŞILAN EK ──
  { ad:"Baked Salmon", adler:{tr:"Fırında Somon",de:"Gebackener Lachs",el:"Ψητός Σολομός",hu:"Sült Lazac",pl:"Pieczony Łosoś",cs:"Pečený Losos",ro:"Somon la Cuptor",hr:"Pečeni Losos",fr:"Saumon au Four",es:"Salmón al Horno",it:"Salmone al Forno",pt:"Salmão no Forno",no:"Bakt Laks",sv:"Bakad Lax",da:"Bagt Laks",fi:"Paistettu Lohi",nl:"Gebakken Zalm"}, kal:208, pro:20, karb:0, yag:13, lif:0, sod:59, por:100, kat:"Fish", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"salmon", katkiMaddeleri:[] },
  { ad:"Beef Mince", adler:{tr:"Dana Kıyma",de:"Rinderhackfleisch",el:"Κιμάς Μοσχαρίσιος",hu:"Marhahús Darált",pl:"Mielona Wołowina",cs:"Mleté Hovězí",ro:"Carne Tocată de Vită",hr:"Mljevena Govedina",fr:"Boeuf Haché",es:"Carne Picada de Ternera",it:"Carne Macinata",pt:"Carne Picada",no:"Kjøttdeig",sv:"Nötfärs",da:"Oksekødsfars",fi:"Jauheliha",nl:"Gehakt"}, kal:215, pro:20, karb:0, yag:15, lif:0, sod:75, por:100, kat:"Meat", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"beef mince", katkiMaddeleri:[] },
  { ad:"Boiled Egg", adler:{tr:"Haşlanmış Yumurta",de:"Gekochtes Ei",el:"Βραστό Αυγό",hu:"Főtt Tojás",pl:"Gotowane Jajko",cs:"Vařené Vejce",ro:"Ou Fiert",hr:"Kuhano Jaje",fr:"Oeuf à la Coque",es:"Huevo Cocido",it:"Uovo Sodo",pt:"Ovo Cozido",no:"Kokt Egg",sv:"Kokt Ägg",da:"Kogt Æg",fi:"Keitetty Muna",nl:"Gekookt Ei"}, kal:155, pro:13, karb:1.1, yag:11, lif:0, sod:124, por:100, kat:"Eggs", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"egg", katkiMaddeleri:[] },
  { ad:"Butter Beans", adler:{tr:"Büyük Fasulye",de:"Butterbohnen",el:"Φασόλια Βουτύρου",hu:"Vajbab",pl:"Fasola Maślana",cs:"Máslové Fazole",ro:"Fasole Untă",hr:"Maslene Mahune",fr:"Haricots Beurre",es:"Judías de Lima",it:"Fagioli di Lima",pt:"Feijão Manteiga",no:"Smørbønner",sv:"Smörbönor",da:"Smørbønner",fi:"Voipavut",nl:"Boterbonen"}, kal:115, pro:7.5, karb:21, yag:0.4, lif:4.5, sod:4, por:100, kat:"Legume", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"butter beans, water", katkiMaddeleri:[] },
  { ad:"Beef Bone Broth", adler:{tr:"Dana Kemik Suyu",de:"Rinderknochenbrühe",el:"Ζωμός Βοδινού",hu:"Marhacsonteleves",pl:"Bulion Wołowy",cs:"Hovězí Vývar",ro:"Supă de Oase",hr:"Juha od Kostiju",fr:"Bouillon d'Os",es:"Caldo de Huesos",it:"Brodo di Ossa",pt:"Caldo de Ossos",no:"Beinbuljong",sv:"Benbuljong",da:"Benssuppe",fi:"Luuliemi",nl:"Beenbouillon"}, kal:38, pro:6, karb:0, yag:1, lif:0, sod:420, por:250, kat:"Soup", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"beef bones, water, vegetables, salt", katkiMaddeleri:[] },
  { ad:"Baby Spinach", adler:{tr:"Bebek Ispanağı",de:"Babyspinat",el:"Σπανάκι Μωρού",hu:"Bébi Spenót",pl:"Szpinak Baby",cs:"Dětský Špenát",ro:"Spanac Baby",hr:"Mladi Špinat",fr:"Pousses d'Épinards",es:"Espinacas Baby",it:"Spinaci Baby",pt:"Espinafres Baby",no:"Babyspinat",sv:"Babyspenat",da:"Babyspinat",fi:"Pinaatti Baby",nl:"Babyspinazie"}, kal:23, pro:2.9, karb:3.6, yag:0.4, lif:2.2, sod:79, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"baby spinach", katkiMaddeleri:[] },
  { ad:"Brie Cheese", adler:{tr:"Brie Peyniri",de:"Brie Käse",el:"Τυρί Μπρι",hu:"Brie Sajt",pl:"Ser Brie",cs:"Sýr Brie",ro:"Brânză Brie",hr:"Sir Brie",fr:"Fromage Brie",es:"Queso Brie",it:"Formaggio Brie",pt:"Queijo Brie",no:"Brie Ost",sv:"Brie Ost",da:"Brie Ost",fi:"Brie Juusto",nl:"Brie Kaas"}, kal:334, pro:20, karb:0.5, yag:28, lif:0, sod:630, por:30, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"milk, salt, rennet, cultures", katkiMaddeleri:[] },
  { ad:"Butterscotch", adler:{tr:"Şeker Kreması",de:"Karamellbonbon",el:"Καραμέλα Βουτύρου",hu:"Vajkaramella",pl:"Karmel Maślany",cs:"Máslový Karamel",ro:"Caramel cu Unt",hr:"Karamela od Maslaca",fr:"Caramel au Beurre",es:"Caramelo de Mantequilla",it:"Caramella al Burro",pt:"Caramelo de Manteiga",no:"Smørkaramell",sv:"Smörkaramell",da:"Smørkaramel",fi:"Vaahtokarkki",nl:"Butterscotch"}, kal:410, pro:0.5, karb:72, yag:14, lif:0, sod:185, por:20, kat:"Sweets", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en"], tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:1.5, icerik:"sugar, butter, glucose syrup, E330", katkiMaddeleri:[{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."}] },

  // ── TR EK 2 ──
  { ad:"Buğday Lapası", kal:82, pro:2.5, karb:17, yag:0.5, lif:1.5, sod:5, por:200, kat:"Tahıl", ulke:"tr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"buğday, su, tuz", katkiMaddeleri:[] },
  { ad:"Büryani Pirinç", kal:180, pro:4, karb:36, yag:3, lif:1, sod:280, por:150, kat:"Tahıl", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"pirinç, soy fidesi, baharat, tereyağı", katkiMaddeleri:[] },
  { ad:"Balık (Mezgit)", kal:82, pro:18, karb:0, yag:0.9, lif:0, sod:86, por:100, kat:"Balık", ulke:"tr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"mezgit balığı", katkiMaddeleri:[] },
  { ad:"Büyükada Peyniri", kal:285, pro:18, karb:1.5, yag:23, lif:0, sod:980, por:30, kat:"Süt Ürünleri", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"koyun sütü, tuz, maya", katkiMaddeleri:[] },
  { ad:"Balık (Sardalya Konserve)", kal:185, pro:21, karb:0, yag:11, lif:0, sod:420, por:100, kat:"Balık", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"sardalya, zeytinyağı, tuz", katkiMaddeleri:[] },
  { ad:"Bademli Kurabiye", kal:468, pro:8, karb:58, yag:24, lif:2.5, sod:120, por:30, kat:"Tatlı", ulke:"tr", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"un, badem, şeker, tereyağı, yumurta, vanilin", katkiMaddeleri:[] },
  { ad:"Biber (Yeşil)", kal:20, pro:0.9, karb:4.6, yag:0.2, lif:1.7, sod:3, por:100, kat:"Sebze", ulke:"tr", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"yeşil biber", katkiMaddeleri:[] },
  { ad:"Biber (Kırmızı)", kal:31, pro:1, karb:6, yag:0.3, lif:2.1, sod:4, por:100, kat:"Sebze", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"kırmızı biber", katkiMaddeleri:[] },
  { ad:"Balık (Uskumru)", kal:205, pro:19, karb:0, yag:14, lif:0, sod:90, por:100, kat:"Balık", ulke:"tr", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"uskumru balığı", katkiMaddeleri:[] },
  { ad:"Balık (Kalamar)", kal:92, pro:16, karb:3.1, yag:1.4, lif:0, sod:44, por:100, kat:"Deniz Ürünü", ulke:"tr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"kalamar", katkiMaddeleri:[] },
  { ad:"Bakla", kal:88, pro:6.4, karb:15, yag:0.6, lif:5, sod:5, por:100, kat:"Baklagil", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"bakla", katkiMaddeleri:[] },
  { ad:"Baklalı Pilav", kal:162, pro:5.5, karb:30, yag:3.5, lif:3.5, sod:185, por:150, kat:"Tahıl", ulke:"tr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"pirinç, bakla, tereyağı, tuz, dereotu", katkiMaddeleri:[] },
  { ad:"Biberli Köfte", kal:245, pro:20, karb:6, yag:16, lif:1, sod:380, por:100, kat:"Et", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"dana kıyma, soğan, biber, tuz, maydanoz", katkiMaddeleri:[] },
  { ad:"Bülbül Yuvası", kal:428, pro:6, karb:52, yag:22, lif:2, sod:88, por:100, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"yufka, fıstık, şeker şerbeti, tereyağı", katkiMaddeleri:[] },

  // ── DE EK 2 ──
  { ad:"Bauernwurst", kal:345, pro:14, karb:2, yag:31, lif:0, sod:1050, por:100, kat:"Wurst", ulke:"de", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"Schweinefleisch, Rindfleisch, Salz, E250, Gewürze", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."}] },
  { ad:"Bärlauch Pesto", kal:285, pro:4, karb:5, yag:28, lif:1.5, sod:580, por:30, kat:"Aufstrich", ulke:"de", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"Bärlauch, Olivenöl, Parmesan, Pinienkerne, Salz", katkiMaddeleri:[] },
  { ad:"Béchamelsauce", kal:98, pro:3.2, karb:8, yag:6, lif:0.2, sod:380, por:100, kat:"Sauce", ulke:"de", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"Milch, Mehl, Butter, Salz, Muskat", katkiMaddeleri:[] },
  { ad:"Buchweizenmehl", kal:335, pro:13, karb:72, yag:3.4, lif:10, sod:1, por:100, kat:"Mehl", ulke:"de", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"Buchweizenmehl", katkiMaddeleri:[] },

  // ── FR EK 2 ──
  { ad:"Baeckeoffe", kal:195, pro:18, karb:14, yag:9, lif:2.5, sod:520, por:300, kat:"Plat", ulke:"fr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"porc, agneau, boeuf, pommes de terre, poireaux, oignons, vin blanc", katkiMaddeleri:[] },
  { ad:"Beurre Blanc", kal:345, pro:0.5, karb:1.5, yag:37, lif:0, sod:380, por:30, kat:"Sauces", ulke:"fr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"beurre, échalotes, vin blanc, vinaigre", katkiMaddeleri:[] },
  { ad:"Boudin Blanc", kal:245, pro:14, karb:8, yag:18, lif:0.5, sod:780, por:100, kat:"Charcuterie", ulke:"fr", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:2.5, icerik:"porc, lait, oignon, épices, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrite de sodium",tehlikeli:true,aciklama:"En grande quantité peut être cancérigène."}] },

  // ── IT EK 2 ──
  { ad:"Baccalà alla Vicentina", kal:198, pro:22, karb:6, yag:10, lif:0.8, sod:580, por:200, kat:"Pesce", ulke:"it", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"baccalà, latte, cipolla, acciughe, olio, prezzemolo", katkiMaddeleri:[] },
  { ad:"Bistecca di Maiale", kal:242, pro:26, karb:0, yag:15, lif:0, sod:75, por:150, kat:"Carne", ulke:"it", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"bistecca di maiale, sale, pepe, olio", katkiMaddeleri:[] },
  { ad:"Brodo di Pollo", kal:28, pro:3.5, karb:0.5, yag:1, lif:0, sod:380, por:250, kat:"Zuppe", ulke:"it", tokPuan:30, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"pollo, sedano, carota, cipolla, sale, alloro", katkiMaddeleri:[] },

  // ── ES EK 2 ──
  { ad:"Buñuelos de Bacalao", kal:248, pro:16, karb:22, yag:12, lif:1.5, sod:480, por:100, kat:"Tapas", ulke:"es", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"bacalao, harina, huevos, ajo, perejil, aceite", katkiMaddeleri:[] },
  { ad:"Borrajas", kal:22, pro:1.8, karb:3.8, yag:0.3, lif:2.2, sod:88, por:100, kat:"Verduras", ulke:"es", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"borrajas", katkiMaddeleri:[] },

  // ── EL EK 2 ──
  { ad:"Μπριζόλα Χοιρινή", adLatin:"Brizola Xoirini", kal:242, pro:26, karb:0, yag:15, lif:0, sod:75, por:150, kat:"Kreas", ulke:"el", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"xoirini brizola, alati, piperi, elaiolado", katkiMaddeleri:[] },
  { ad:"Μπύρα Ελληνική", adLatin:"Bira Elliniki", kal:42, pro:0.4, karb:4.2, yag:0, lif:0, sod:8, por:330, kat:"Pota", ulke:"el", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"nero, krithali, houblon, mazithra", katkiMaddeleri:[] },

  // ── DA EK 2 ──
  { ad:"Brændte Mandler", kal:480, pro:12, karb:52, yag:28, lif:6, sod:8, por:30, kat:"Slik", ulke:"da", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"mandler, sukker", katkiMaddeleri:[] },
  { ad:"Bagt Torsk", kal:82, pro:18, karb:0, yag:0.7, lif:0, sod:55, por:150, kat:"Fisk", ulke:"da", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"torsk, citronsaft, salt, peber", katkiMaddeleri:[] },

  // ── NO EK 2 ──
  { ad:"Bjørnebærsyltetøy", kal:245, pro:0.5, karb:62, yag:0, lif:2.5, sod:8, por:20, kat:"Syltetoy", ulke:"no", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"bjørnebær, sukker, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektiner",tehlikeli:false,aciklama:"Gelingsmiddel."},{kod:"E330",ad:"Sitronsyre",tehlikeli:false,aciklama:"Surhetsregulator."}] },
  { ad:"Bakte Poteter", kal:93, pro:2.5, karb:21, yag:0.1, lif:2.2, sod:6, por:150, kat:"Gronnsaker", ulke:"no", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"poteter, olje, salt", katkiMaddeleri:[] },

  // ── SV EK 2 ──
  { ad:"Biff med Lök", kal:245, pro:24, karb:6, yag:14, lif:1, sod:420, por:200, kat:"Kott", ulke:"sv", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"nötbiff, lök, smör, salt, peppar", katkiMaddeleri:[] },
  { ad:"Bjørnebärssylt", kal:245, pro:0.5, karb:62, yag:0, lif:2.5, sod:8, por:20, kat:"Sylter", ulke:"sv", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"björnbär, socker, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektiner",tehlikeli:false,aciklama:"Geliermittel."},{kod:"E330",ad:"Citronsyra",tehlikeli:false,aciklama:"Surhetsreglering."}] },

  // ── FI EK 2 ──
  { ad:"Borssikeitto", kal:65, pro:2.5, karb:10, yag:2, lif:2.5, sod:480, por:300, kat:"Keitot", ulke:"fi", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"punajuuri, kaali, porkanna, sipuli, tomaatti", katkiMaddeleri:[] },
  { ad:"Banaaniletut", kal:205, pro:6, karb:32, yag:7, lif:2, sod:180, por:100, kat:"Leivonnaiset", ulke:"fi", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"banaani, jauhot, maito, kananmuna, voi", katkiMaddeleri:[] },

  // ── NL EK 2 ──
  { ad:"Bloemkoolsoep", kal:72, pro:2.5, karb:8, yag:3, lif:2, sod:480, por:300, kat:"Soep", ulke:"nl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"bloemkool, aardappel, room, zout, nootmuskaat", katkiMaddeleri:[] },
  { ad:"Brood Volkoren", kal:242, pro:9, karb:44, yag:4, lif:6, sod:420, por:100, kat:"Brood", ulke:"nl", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"volkorenmeel, water, zout, gist", katkiMaddeleri:[] },

  // ── BE EK 2 ──
  { ad:"Boudin Blanc Belge", kal:245, pro:14, karb:8, yag:18, lif:0.5, sod:780, por:100, kat:"Vlees", ulke:"be", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"varkens, melk, ui, kruiden, E250", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitriet",tehlikeli:true,aciklama:"In hoge doses kankerverwekkend."}] },
  { ad:"Brood Pistolet", kal:265, pro:9, karb:52, yag:2.5, lif:2.5, sod:480, por:60, kat:"Brood", ulke:"be", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"bloem, water, zout, gist", katkiMaddeleri:[] },

  // ── AT EK 2 ──
  { ad:"Beinfleisch mit Semmelkren", kal:235, pro:24, karb:12, yag:11, lif:1.5, sod:480, por:250, kat:"Fleisch", ulke:"at", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"Rindfleisch, Meerrettich, Semmel, Sahne, Salz", katkiMaddeleri:[] },
  { ad:"Bergkäse Aufschnitt", kal:385, pro:27, karb:0.5, yag:31, lif:0, sod:650, por:30, kat:"Milchprodukte", ulke:"at", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"Alpenmilch, Salz, Lab", katkiMaddeleri:[] },

  // ── PL EK 2 ──
  { ad:"Bigos Staropolski", adLatin:"Bigos Staropolski", kal:175, pro:11, karb:13, yag:9, lif:4.5, sod:720, por:300, kat:"Dania Glowne", ulke:"pl", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kapusta kiszona, wieprzowina, kiełbasa, grzyby, śliwki, E250", katkiMaddeleri:[{kod:"E250",ad:"Azotyn sodu",tehlikeli:true,aciklama:"W duzych ilościach może być rakotwórczy."}] },
  { ad:"Barszcz z Uszkami", adLatin:"Barszcz z Uszkami", kal:68, pro:3.5, karb:11, yag:1.5, lif:2, sod:580, por:300, kat:"Zupy", ulke:"pl", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"buraki, uszka z grzybami i kapustą, sol", katkiMaddeleri:[] },

  // ── CS EK 2 ──
  { ad:"Bramborový Salát", adLatin:"Bramborovy Salat", kal:145, pro:3.5, karb:22, yag:5, lif:2.5, sod:380, por:150, kat:"Salatky", ulke:"cs", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"brambory, mrkev, hrášek, vejce, majonéza, sůl", katkiMaddeleri:[] },
  { ad:"Buřty na Grilu", adLatin:"Burty na Grilu", kal:315, pro:12, karb:3, yag:28, lif:0, sod:980, por:100, kat:"Grillovani", ulke:"cs", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"vepřové maso, sůl, E250, E451, koření", katkiMaddeleri:[{kod:"E250",ad:"Dusičnan sodný",tehlikeli:true,aciklama:"Ve vysokych davkach karcinogenni."},{kod:"E451",ad:"Trifosfáty",tehlikeli:false,aciklama:"Udrzovac vlhkosti."}] },

  // ── HU EK 2 ──
  { ad:"Bakonyi Sertésborda", adLatin:"Bakonyi Sertesborda", kal:265, pro:24, karb:8, yag:16, lif:1.5, sod:480, por:200, kat:"Fogasok", ulke:"hu", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"sertéskaraj, tejszín, gomba, hagyma, só", katkiMaddeleri:[] },
  { ad:"Bundáskenyér", adLatin:"Bundaskenyér", kal:265, pro:8, karb:32, yag:13, lif:2, sod:285, por:100, kat:"Reggeli", ulke:"hu", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"kenyér, tojás, tej, zsír, porcukor, citrom", katkiMaddeleri:[] },

  // ── RO EK 2 ──
  { ad:"Brânzoaice", adLatin:"Brânzoaice", kal:295, pro:9, karb:36, yag:14, lif:1.5, sod:480, por:100, kat:"Patiserie", ulke:"ro", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"faina, branza dulce, oua, zahar, unt, lapte", katkiMaddeleri:[] },
  { ad:"Bors de Perisoare", adLatin:"Bors de Perisoare", kal:95, pro:7, karb:10, yag:4, lif:1.5, sod:520, por:300, kat:"Ciorbe", ulke:"ro", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"perisoare, orez, morcov, ceapa, rosii, bors, smantana", katkiMaddeleri:[] },

  // ── HR EK 2 ──
  { ad:"Bokovnik", adLatin:"Bokovnik", kal:225, pro:7, karb:44, yag:2, lif:4, sod:420, por:100, kat:"Kruh", ulke:"hr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"raženo brašno, pšenično brašno, voda, sol, kvasac", katkiMaddeleri:[] },
  { ad:"Blitva s Krumpirom", adLatin:"Blitva s Krumpirom", kal:88, pro:2.5, karb:14, yag:3, lif:3, sod:380, por:200, kat:"Prilog", ulke:"hr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"blitva, krumpir, cesnjak, maslinovo ulje, sol", katkiMaddeleri:[] },

  // ── PT EK 2 ──
  { ad:"Bacalhau à Lagareiro", kal:268, pro:24, karb:12, yag:15, lif:1.5, sod:980, por:250, kat:"Prato", ulke:"pt", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"bacalhau, batatas assadas, azeite, alho, azeitonas", katkiMaddeleri:[] },
  { ad:"Broa de Avintes", kal:218, pro:5, karb:45, yag:1.5, lif:5, sod:380, por:100, kat:"Pao", ulke:"pt", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"farinha de milho, farinha de centeio, agua, sal, fermento", katkiMaddeleri:[] },

  // ── EN EK 2 ──
  { ad:"Beef Wellington", kal:385, pro:24, karb:22, yag:24, lif:1.5, sod:580, por:200, kat:"Dish", ulke:"en", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"beef fillet, puff pastry, mushroom duxelles, Parma ham", katkiMaddeleri:[] },
  { ad:"Bubble and Squeak", kal:145, pro:3.5, karb:22, yag:5.5, lif:4, sod:380, por:200, kat:"Dish", ulke:"en", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"potatoes, cabbage, butter, salt, pepper", katkiMaddeleri:[] },
  { ad:"Battenberg Cake", kal:385, pro:6, karb:58, yag:16, lif:1, sod:280, por:80, kat:"Cakes", ulke:"en", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"flour, butter, sugar, eggs, marzipan, apricot jam, E102, E122", katkiMaddeleri:[{kod:"E102",ad:"Tartrazine",tehlikeli:true,aciklama:"May cause hyperactivity in children."},{kod:"E122",ad:"Carmoisine",tehlikeli:true,aciklama:"Banned in some countries."}] },


  // ══════════════════════════════════════════════════════
  // C HARFİ
  // ══════════════════════════════════════════════════════

  // ── PAYLAŞILAN MARKALAR ──
  { ad:"Coca-Cola", adler:{tr:"Coca-Cola",de:"Coca-Cola",el:"Κόκα Κόλα",hu:"Coca-Cola",pl:"Coca-Cola",cs:"Coca-Cola",ro:"Coca-Cola",hr:"Coca-Cola"}, marka:"Coca-Cola", kal:139, pro:0, karb:35, yag:0, lif:0, sod:45, por:330, kat:"Drinks", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:1, icerik:"water, sugar, caramel E150d, phosphoric acid E338, caffeine, flavourings", katkiMaddeleri:[{kod:"E150d",ad:"Sulphite ammonia caramel",tehlikeli:false,aciklama:"Colouring."},{kod:"E338",ad:"Phosphoric acid",tehlikeli:true,aciklama:"May damage tooth enamel and bones."}] },
  { ad:"Coca-Cola Zero", adler:{tr:"Coca-Cola Zero",de:"Coca-Cola Zero",el:"Κόκα Κόλα Ζίρο",hu:"Coca-Cola Zero"}, marka:"Coca-Cola", kal:2, pro:0, karb:0, yag:0, lif:0, sod:48, por:330, kat:"Drinks", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:1.5, icerik:"water, E150d, E338, E951, E950, caffeine", katkiMaddeleri:[{kod:"E150d",ad:"Caramel",tehlikeli:false,aciklama:"Colouring."},{kod:"E338",ad:"Phosphoric acid",tehlikeli:true,aciklama:"May damage tooth enamel."},{kod:"E951",ad:"Aspartame",tehlikeli:true,aciklama:"Harmful for phenylketonurics."},{kod:"E950",ad:"Acesulfame K",tehlikeli:false,aciklama:"Sweetener."}] },
  { ad:"Camembert", adler:{tr:"Camembert Peyniri",de:"Camembert Käse",el:"Καμαμπέρ",hu:"Camembert Sajt",pl:"Ser Camembert",cs:"Sýr Camembert",ro:"Brânză Camembert",hr:"Sir Camembert",fr:"Camembert",es:"Queso Camembert",it:"Formaggio Camembert",pt:"Queijo Camembert",no:"Camembert Ost",sv:"Camembert Ost",da:"Camembert Ost",fi:"Camembert Juusto",nl:"Camembert Kaas"}, kal:300, pro:20, karb:0.5, yag:25, lif:0, sod:640, por:30, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"milk, salt, rennet, cultures", katkiMaddeleri:[] },
  { ad:"Cashew Nuts", adler:{tr:"Kaju Fıstığı",de:"Cashewnüsse",el:"Κάσιους",hu:"Kesudió",pl:"Orzechy Nerkowca",cs:"Kešu Ořechy",ro:"Caju",hr:"Indijski Oraščić",fr:"Noix de Cajou",es:"Anacardos",it:"Anacardi",pt:"Castanha de Caju",no:"Cashewnøtter",sv:"Cashewnötter",da:"Cashewnødder",fi:"Cashewpähkinät",nl:"Cashewnoten"}, kal:553, pro:18, karb:30, yag:44, lif:3.3, sod:12, por:30, kat:"Nuts", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"cashew nuts", katkiMaddeleri:[] },
  { ad:"Carrot (Havuç)", adler:{tr:"Havuç",de:"Karotte",el:"Καρότο",hu:"Sárgarépa",pl:"Marchewka",cs:"Mrkev",ro:"Morcov",hr:"Mrkva",fr:"Carotte",es:"Zanahoria",it:"Carota",pt:"Cenoura",no:"Gulrot",sv:"Morot",da:"Gulerod",fi:"Porkkana",nl:"Wortel"}, kal:41, pro:0.9, karb:10, yag:0.2, lif:2.8, sod:69, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"carrot", katkiMaddeleri:[] },
  { ad:"Celery (Kereviz)", adler:{tr:"Kereviz",de:"Sellerie",el:"Σέλινο",hu:"Zeller",pl:"Seler",cs:"Celer",ro:"Țelină",hr:"Celer",fr:"Céleri",es:"Apio",it:"Sedano",pt:"Aipo",no:"Selleri",sv:"Selleri",da:"Selleri",fi:"Selleri",nl:"Selderij"}, kal:16, pro:0.7, karb:3, yag:0.2, lif:1.6, sod:80, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"celery", katkiMaddeleri:[] },
  { ad:"Cherry (Kiraz)", adler:{tr:"Kiraz",de:"Kirsche",el:"Κεράσι",hu:"Cseresznye",pl:"Czereśnia",cs:"Třešně",ro:"Cireșe",hr:"Trešnja",fr:"Cerise",es:"Cereza",it:"Ciliegia",pt:"Cereja",no:"Kirsebær",sv:"Körsbär",da:"Kirsebær",fi:"Kirsikka",nl:"Kers"}, kal:63, pro:1.1, karb:16, yag:0.2, lif:2.1, sod:0, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"cherries", katkiMaddeleri:[] },
  { ad:"Chickpeas (Nohut)", adler:{tr:"Nohut",de:"Kichererbsen",el:"Ρεβύθια",hu:"Csicseriborsó",pl:"Ciecierzyca",cs:"Cizrna",ro:"Năut",hr:"Slanutak",fr:"Pois Chiches",es:"Garbanzos",it:"Ceci",pt:"Grão de Bico",no:"Kikerter",sv:"Kikärtor",da:"Kikærter",fi:"Kikherneet",nl:"Kikkererwten"}, kal:164, pro:8.9, karb:27, yag:2.6, lif:7.6, sod:7, por:100, kat:"Legume", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"chickpeas", katkiMaddeleri:[] },
  { ad:"Cucumber (Salatalık)", adler:{tr:"Salatalık",de:"Gurke",el:"Αγγούρι",hu:"Uborka",pl:"Ogórek",cs:"Okurka",ro:"Castravete",hr:"Krastavac",fr:"Concombre",es:"Pepino",it:"Cetriolo",pt:"Pepino",no:"Agurk",sv:"Gurka",da:"Agurk",fi:"Kurkku",nl:"Komkommer"}, kal:15, pro:0.7, karb:3.6, yag:0.1, lif:0.5, sod:2, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"cucumber", katkiMaddeleri:[] },
  { ad:"Cauliflower (Karnabahar)", adler:{tr:"Karnabahar",de:"Blumenkohl",el:"Κουνουπίδι",hu:"Karfiol",pl:"Kalafior",cs:"Květák",ro:"Conopidă",hr:"Cvjetača",fr:"Chou-Fleur",es:"Coliflor",it:"Cavolfiore",pt:"Couve-Flor",no:"Blomkål",sv:"Blomkål",da:"Blomkål",fi:"Kukkakaali",nl:"Bloemkool"}, kal:25, pro:1.9, karb:5, yag:0.3, lif:2, sod:30, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"cauliflower", katkiMaddeleri:[] },
  { ad:"Cabbage (Lahana)", adler:{tr:"Beyaz Lahana",de:"Weißkohl",el:"Λάχανο",hu:"Fehér Káposzta",pl:"Kapusta",cs:"Zelí",ro:"Varză",hr:"Kupus",fr:"Chou Blanc",es:"Col Blanca",it:"Cavolo Bianco",pt:"Couve Branca",no:"Kål",sv:"Vitkål",da:"Hvidkål",fi:"Valkokaali",nl:"Witte Kool"}, kal:25, pro:1.3, karb:5.8, yag:0.1, lif:2.5, sod:18, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"cabbage", katkiMaddeleri:[] },
  { ad:"Coconut Milk", adler:{tr:"Hindistancevizi Sütü",de:"Kokosmilch",el:"Γάλα Καρύδας",hu:"Kókusztej",pl:"Mleko Kokosowe",cs:"Kokosové Mléko",ro:"Lapte de Cocos",hr:"Kokosovo Mlijeko",fr:"Lait de Coco",es:"Leche de Coco",it:"Latte di Cocco",pt:"Leite de Coco",no:"Kokosmelk",sv:"Kokosmjölk",da:"Kokosmælk",fi:"Kookosmaito",nl:"Kokosmelk"}, kal:197, pro:2, karb:6, yag:21, lif:0.5, sod:15, por:100, kat:"Plant Drinks", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"coconut extract, water, E331", katkiMaddeleri:[{kod:"E331",ad:"Sodium citrates",tehlikeli:false,aciklama:"Acidity regulator."}] },
  { ad:"Cinnamon (Tarçın)", adler:{tr:"Tarçın",de:"Zimt",el:"Κανέλα",hu:"Fahéj",pl:"Cynamon",cs:"Skořice",ro:"Scorțișoară",hr:"Cimet",fr:"Cannelle",es:"Canela",it:"Cannella",pt:"Canela",no:"Kanel",sv:"Kanel",da:"Kanel",fi:"Kaneli",nl:"Kaneel"}, kal:247, pro:4, karb:81, yag:1.2, lif:53, sod:10, por:5, kat:"Spice", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"cinnamon", katkiMaddeleri:[] },
  { ad:"Chia Seeds", adler:{tr:"Chia Tohumu",de:"Chiasamen",el:"Σπόροι Chia",hu:"Chia Mag",pl:"Nasiona Chia",cs:"Chia Semínka",ro:"Semințe de Chia",hr:"Chia Sjemenke",fr:"Graines de Chia",es:"Semillas de Chía",it:"Semi di Chia",pt:"Sementes de Chia",no:"Chiafrø",sv:"Chiafrön",da:"Chiafrø",fi:"Siemenet Chia",nl:"Chiazaden"}, kal:486, pro:17, karb:42, yag:31, lif:34, sod:16, por:15, kat:"Seeds", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:82, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"chia seeds", katkiMaddeleri:[] },
  { ad:"Cod (Morina)", adler:{tr:"Morina Balığı",de:"Kabeljau",el:"Μπακαλιάρος",hu:"Tőkehal",pl:"Dorsz",cs:"Treska",ro:"Cod",hr:"Bakalar",fr:"Cabillaud",es:"Bacalao",it:"Merluzzo",pt:"Bacalhau",no:"Torsk",sv:"Torsk",da:"Torsk",fi:"Turska",nl:"Kabeljauw"}, kal:82, pro:18, karb:0, yag:0.7, lif:0, sod:55, por:100, kat:"Fish", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"cod", katkiMaddeleri:[] },
  { ad:"Cottage Cheese", adler:{tr:"Lor Peyniri",de:"Hüttenkäse",el:"Cottage Τυρί",hu:"Túró",pl:"Twaróg",cs:"Tvaroh",ro:"Urdă",hr:"Svježi Sir",fr:"Fromage Blanc",es:"Queso Cottage",it:"Fiocchi di Latte",pt:"Queijo Cottage",no:"Cottage Cheese",sv:"Keso",da:"Hytteost",fi:"Raejuusto",nl:"Hüttenkäse"}, kal:98, pro:11, karb:3.4, yag:4.3, lif:0, sod:364, por:100, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"skimmed milk, cream, salt, cultures", katkiMaddeleri:[] },
  { ad:"Chicken Breast", adler:{tr:"Tavuk Göğsü",de:"Hähnchenbrust",el:"Στήθος Κοτόπουλο",hu:"Csirkemell",pl:"Pierś Kurczaka",cs:"Kuřecí Prsa",ro:"Piept de Pui",hr:"Pileća Prsa",fr:"Blanc de Poulet",es:"Pechuga de Pollo",it:"Petto di Pollo",pt:"Peito de Frango",no:"Kyllingbryst",sv:"Kycklingbröst",da:"Kyllingebryst",fi:"Kananrinta",nl:"Kipfilet"}, kal:108, pro:23, karb:0, yag:1.5, lif:0, sod:65, por:100, kat:"Meat", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"chicken breast", katkiMaddeleri:[] },
  { ad:"Cheddar Cheese", adler:{tr:"Cheddar Peyniri",de:"Cheddar Käse",el:"Τυρί Τσένταρ",hu:"Cheddar Sajt",pl:"Ser Cheddar",cs:"Sýr Cheddar",ro:"Brânză Cheddar",hr:"Cheddar Sir",fr:"Fromage Cheddar",es:"Queso Cheddar",it:"Formaggio Cheddar",pt:"Queijo Cheddar",no:"Cheddar Ost",sv:"Cheddar Ost",da:"Cheddar Ost",fi:"Cheddar Juusto",nl:"Cheddar Kaas"}, kal:402, pro:25, karb:0.1, yag:34, lif:0, sod:670, por:30, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"milk, salt, starter culture, rennet", katkiMaddeleri:[] },

  // ── TR ──
  { ad:"Çay (Türk Çayı)", kal:2, pro:0.1, karb:0.3, yag:0, lif:0, sod:1, por:200, kat:"İçecek", ulke:"tr", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"çay yaprağı, su", katkiMaddeleri:[] },
  { ad:"Çay (Ihlamur)", kal:2, pro:0.1, karb:0.3, yag:0, lif:0, sod:1, por:200, kat:"İçecek", ulke:"tr", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"ıhlamur, su", katkiMaddeleri:[] },
  { ad:"Çikolatalı Fındık Kreması", kal:545, pro:6.5, karb:58, yag:32, lif:1.5, sod:75, por:30, kat:"Kahvaltı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"şeker, bitkisel yağ, fındık, kakao, E322, süt tozu, vanilin", katkiMaddeleri:[{kod:"E322",ad:"Lesitinler",tehlikeli:false,aciklama:"Emülgatör."}] },
  { ad:"Çipura Buğulama", kal:112, pro:20, karb:2, yag:3.5, lif:0.5, sod:380, por:200, kat:"Balık", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"çipura, domates, soğan, zeytinyağı, limon", katkiMaddeleri:[] },
  { ad:"Çerkez Tavuğu", kal:235, pro:22, karb:5, yag:14, lif:1.5, sod:420, por:150, kat:"Et", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"tavuk, ceviz, sarımsak, ekmek içi, kırmızı biber", katkiMaddeleri:[] },
  { ad:"Çilek", kal:32, pro:0.7, karb:7.7, yag:0.3, lif:2, sod:1, por:100, kat:"Meyve", ulke:"tr", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"çilek", katkiMaddeleri:[] },
  { ad:"Çilek Reçeli", kal:250, pro:0.4, karb:64, yag:0, lif:1, sod:8, por:20, kat:"Reçeller", ulke:"tr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"çilek, şeker, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektin",tehlikeli:false,aciklama:"Jelleşme maddesi."},{kod:"E330",ad:"Sitrik asit",tehlikeli:false,aciklama:"Asitlik düzenleyici."}] },
  { ad:"Çörek Otu", kal:525, pro:18, karb:23, yag:43, lif:10, sod:88, por:10, kat:"Baharat", ulke:"tr", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"çörek otu", katkiMaddeleri:[] },
  { ad:"Çöp Şiş", kal:198, pro:22, karb:0, yag:12, lif:0, sod:280, por:100, kat:"Et", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kuzu eti, tuz, kekik, zeytinyağı", katkiMaddeleri:[] },
  { ad:"Cacık", kal:52, pro:3.5, karb:3.8, yag:2.5, lif:0.5, sod:280, por:150, kat:"Meze", ulke:"tr", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"yoğurt, salatalık, sarımsak, nane, dereotu, tuz", katkiMaddeleri:[] },
  { ad:"Ceviz", kal:654, pro:15, karb:14, yag:65, lif:6.7, sod:2, por:30, kat:"Kuruyemiş", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ceviz", katkiMaddeleri:[] },
  { ad:"Cevizli Baklava", kal:428, pro:6.5, karb:50, yag:23, lif:2, sod:88, por:100, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"yufka, ceviz, tereyağı, şeker şerbeti", katkiMaddeleri:[] },
  { ad:"Cevizli Erişte", kal:348, pro:13, karb:68, yag:5, lif:3, sod:120, por:100, kat:"Hamur İşleri", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"buğday unu, yumurta, ceviz, tuz", katkiMaddeleri:[] },
  { ad:"Çiğ Köfte", kal:168, pro:4.5, karb:32, yag:3.5, lif:5, sod:480, por:100, kat:"Atıştırmalık", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"ince bulgur, domates salçası, biber salçası, baharat", katkiMaddeleri:[] },
  { ad:"Çorba (Mercimek)", kal:98, pro:5.5, karb:16, yag:2.5, lif:4.5, sod:480, por:250, kat:"Çorba", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"kırmızı mercimek, soğan, havuç, tereyağı, tuz", katkiMaddeleri:[] },
  { ad:"Çorba (Ezogelin)", kal:88, pro:4.5, karb:14, yag:2, lif:3.5, sod:520, por:250, kat:"Çorba", ulke:"tr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"kırmızı mercimek, bulgur, soğan, domates, tereyağı", katkiMaddeleri:[] },
  { ad:"Cevizli Sucuk", marka:"Çelik", kal:395, pro:14, karb:45, yag:20, lif:1.5, sod:45, por:30, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"ceviz, üzüm suyu, un, tarçın", katkiMaddeleri:[] },
  { ad:"Çarliston Biber", kal:28, pro:1, karb:6.5, yag:0.2, lif:2, sod:3, por:100, kat:"Sebze", ulke:"tr", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"çarliston biber", katkiMaddeleri:[] },

  // ── DE ──
  { ad:"Currywurst", kal:285, pro:12, karb:14, yag:21, lif:1.5, sod:980, por:200, kat:"Streetfood", ulke:"de", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"Schweinswurst, Tomatensauce, Curry, E250", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."}] },
  { ad:"Camembert gebraten", kal:355, pro:22, karb:8, yag:26, lif:0.5, sod:680, por:125, kat:"Kaese", ulke:"de", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"Camembert, Paniermehl, Eier, Mehl", katkiMaddeleri:[] },
  { ad:"Christstollen", kal:385, pro:7, karb:56, yag:16, lif:2.5, sod:185, por:100, kat:"Weihnachtsgebaeck", ulke:"de", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"Weizenmehl, Butter, Zucker, Rosinen, Marzipan, Gewürze", katkiMaddeleri:[] },
  { ad:"Crème fraîche DE", kal:215, pro:2.5, karb:3.2, yag:21, lif:0, sod:55, por:30, kat:"Milchprodukte", ulke:"de", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"Sahne, Kulturen", katkiMaddeleri:[] },

  // ── FR ──
  { ad:"Croissant", kal:406, pro:8, karb:46, yag:21, lif:2.5, sod:380, por:80, kat:"Viennoiserie", ulke:"fr", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"farine, beurre, lait, sucre, sel, levure", katkiMaddeleri:[] },
  { ad:"Crème Brûlée", kal:285, pro:5, karb:25, yag:19, lif:0, sod:68, por:120, kat:"Desserts", ulke:"fr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"crème, jaunes d'oeufs, sucre, vanille", katkiMaddeleri:[] },
  { ad:"Cassoulet", kal:285, pro:18, karb:22, yag:14, lif:6.5, sod:720, por:300, kat:"Plat", ulke:"fr", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"haricots blancs, saucisse, confit de canard, tomates", katkiMaddeleri:[] },
  { ad:"Coq au Vin", kal:225, pro:24, karb:6, yag:12, lif:1.5, sod:480, por:250, kat:"Plat", ulke:"fr", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"poulet, vin rouge, lardons, champignons, oignons", katkiMaddeleri:[] },
  { ad:"Comté Fromage", kal:408, pro:28, karb:0.5, yag:33, lif:0, sod:680, por:30, kat:"Fromages", ulke:"fr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"lait cru, sel, présure", katkiMaddeleri:[] },

  // ── IT ──
  { ad:"Carbonara", kal:465, pro:18, karb:52, yag:22, lif:2, sod:520, por:200, kat:"Pasta", ulke:"it", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"spaghetti, guanciale, uova, pecorino, pepe", katkiMaddeleri:[] },
  { ad:"Caprese", kal:165, pro:11, karb:3, yag:13, lif:0.5, sod:420, por:150, kat:"Antipasto", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"mozzarella, pomodori, basilico, olio d'oliva, sale", katkiMaddeleri:[] },
  { ad:"Cotoletta alla Milanese", kal:385, pro:24, karb:18, yag:24, lif:1.5, sod:480, por:150, kat:"Carne", ulke:"it", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"vitello, pangrattato, uova, farina, burro", katkiMaddeleri:[] },
  { ad:"Cannoli Siciliani", kal:398, pro:10, karb:48, yag:20, lif:1.5, sod:185, por:100, kat:"Dolci", ulke:"it", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"farina, ricotta, zucchero, cioccolato, E471", katkiMaddeleri:[{kod:"E471",ad:"Monogliceridi e digliceridi",tehlikeli:false,aciklama:"Emulsionante."}] },

  // ── ES ──
  { ad:"Churros", kal:352, pro:6, karb:52, yag:14, lif:2, sod:280, por:100, kat:"Desayuno", ulke:"es", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"harina, agua, sal, aceite", katkiMaddeleri:[] },
  { ad:"Caldo Gallego", kal:125, pro:8, karb:18, yag:3.5, lif:5, sod:520, por:300, kat:"Caldos", ulke:"es", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"alubias, grelos, chorizo, lacón, patatas, sal", katkiMaddeleri:[] },
  { ad:"Croquetas de Jamón", kal:265, pro:10, karb:24, yag:15, lif:1, sod:680, por:100, kat:"Tapas", ulke:"es", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"harina, leche, jamón, mantequilla, pan rallado, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono y diglicéridos",tehlikeli:false,aciklama:"Emulsionante."}] },

  // ── EL ──
  { ad:"Χωριάτικη Σαλάτα", adLatin:"Choriatiki Salata", kal:148, pro:5.5, karb:8, yag:11, lif:2.5, sod:680, por:200, kat:"Salates", ulke:"el", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"tomates, aggouria, kremidi, elies, feta, elaiolado", katkiMaddeleri:[] },
  { ad:"Κρέμα Καραμελέ", adLatin:"Krema Karamele", kal:265, pro:6, karb:32, yag:13, lif:0, sod:68, por:120, kat:"Glika", ulke:"el", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"gala, avga, zachari, vanilia, karamelomeni zachari", katkiMaddeleri:[] },
  { ad:"Χαλβάς", adLatin:"Chalvas", kal:488, pro:12, karb:52, yag:28, lif:3.5, sod:85, por:50, kat:"Glika", ulke:"el", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"tahini, zachari, amygdala", katkiMaddeleri:[] },

  // ── DA ──
  { ad:"Citronfromage", kal:195, pro:5, karb:28, yag:8, lif:0.2, sod:68, por:120, kat:"Dessert", ulke:"da", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"citronsaft, aeg, sukker, fløde, husblas", katkiMaddeleri:[] },
  { ad:"Coppa (DK)", kal:380, pro:20, karb:1, yag:33, lif:0, sod:1580, por:30, kat:"Charcuteri", ulke:"da", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"svinekød, salt, E250, krydderier", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"Konserveringsmiddel."}] },
  { ad:"Citrusfrugtsalat", kal:52, pro:0.8, karb:13, yag:0.2, lif:2, sod:2, por:150, kat:"Frugt", ulke:"da", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"appelsin, grapefrugt, citron, sukker, mynte", katkiMaddeleri:[] },

  // ── NO ──
  { ad:"Clipfish (Klippfisk)", kal:88, pro:20, karb:0, yag:1, lif:0, sod:2200, por:100, kat:"Fisk", ulke:"no", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"torsk, salt", katkiMaddeleri:[] },
  { ad:"Cervelat (NO)", kal:320, pro:13, karb:3, yag:29, lif:0, sod:1050, por:50, kat:"Pølser", ulke:"no", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"svinekjøtt, storfekjøtt, salt, E250, krydder", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"Konserveringsmiddel."}] },
  { ad:"Cloudberry (Molte)", kal:51, pro:1.7, karb:11, yag:0.8, lif:4.7, sod:0, por:100, kat:"Baer", ulke:"no", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"molter", katkiMaddeleri:[] },

  // ── SV ──
  { ad:"Chokladboll", kal:448, pro:5, karb:58, yag:22, lif:3.5, sod:185, por:30, kat:"Fikabrod", ulke:"sv", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"havregryn, smör, kakao, socker, kokos", katkiMaddeleri:[] },
  { ad:"Citronmåne", kal:352, pro:5.5, karb:56, yag:13, lif:1.5, sod:185, por:80, kat:"Bakelse", ulke:"sv", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"vetemjöl, smör, ägg, socker, citronskal, frosting", katkiMaddeleri:[] },

  // ── FI ──
  { ad:"Curd (Rahka)", kal:72, pro:10, karb:4, yag:1.5, lif:0, sod:45, por:100, kat:"Maitotuotteet", ulke:"fi", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"maito, kultuurit", katkiMaddeleri:[] },

  // ── NL ──
  { ad:"Croket NL", kal:265, pro:10, karb:24, yag:15, lif:1, sod:680, por:100, kat:"Snack", ulke:"nl", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"rundvlees, bloem, boter, zout, paneermeel, E450", katkiMaddeleri:[{kod:"E450",ad:"Difosfaten",tehlikeli:false,aciklama:"Rijsmiddel."}] },

  // ── BE ──
  { ad:"Chicons au Gratin (Witloof)", kal:165, pro:10, karb:8, yag:10, lif:3, sod:480, por:200, kat:"Groente", ulke:"be", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"witloof, hesp, room, kaas, muskaatnoot", katkiMaddeleri:[] },
  { ad:"Cuberdons", kal:352, pro:2, karb:86, yag:0.5, lif:0, sod:45, por:30, kat:"Snoep", ulke:"be", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:1.5, icerik:"suiker, glucose, geleermiddel, E440", katkiMaddeleri:[{kod:"E440",ad:"Pectinen",tehlikeli:false,aciklama:"Geliermiddel."}] },
  { ad:"Carbonnades Flamandes", kal:245, pro:20, karb:12, yag:13, lif:1.5, sod:520, por:300, kat:"Vlees", ulke:"be", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"rundvlees, bier, ui, spek, tijm, E250", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitriet",tehlikeli:true,aciklama:"In hoge doses kankerverwekkend."}] },

  // ── AT ──
  { ad:"Cremeschnitten", kal:335, pro:5.5, karb:42, yag:16, lif:0.8, sod:185, por:100, kat:"Mehlspeisen", ulke:"at", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"Blätterteig, Pudding, Sahne, Staubzucker", katkiMaddeleri:[] },
  { ad:"Cordon Bleu AT", kal:368, pro:26, karb:16, yag:23, lif:1.5, sod:580, por:180, kat:"Fleisch", ulke:"at", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"Hähnchenbrust, Schinken, Käse, Paniermehl, Eier", katkiMaddeleri:[] },

  // ── PL ──
  { ad:"Czernina", adLatin:"Czernina", kal:88, pro:6, karb:12, yag:3, lif:1, sod:520, por:300, kat:"Zupy", ulke:"pl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"krew kacza, wywar, suszone owoce, ocet, sol", katkiMaddeleri:[] },
  { ad:"Chleb Żytni", adLatin:"Chleb Zytni", kal:218, pro:8.5, karb:41, yag:1.5, lif:7.5, sod:480, por:100, kat:"Pieczywo", ulke:"pl", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"mąka żytnia, woda, sól, zakwas", katkiMaddeleri:[] },
  { ad:"Ćwikła", adLatin:"Cwikla", kal:65, pro:1.5, karb:14, yag:0.2, lif:3, sod:380, por:50, kat:"Przetwory", ulke:"pl", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"buraki, chrzan, ocet, sól, cukier", katkiMaddeleri:[] },

  // ── CS ──
  { ad:"Česnečka", adLatin:"Cesnecka", kal:72, pro:2.5, karb:10, yag:3, lif:0.8, sod:480, por:300, kat:"Polevky", ulke:"cs", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"cesnek, brambory, chleb, sůl, majoranka", katkiMaddeleri:[] },
  { ad:"Cukrovi (Vánoční)", adLatin:"Cukrovi Vanocni", kal:448, pro:7, karb:58, yag:22, lif:2, sod:185, por:30, kat:"Dezerty", ulke:"cs", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"mouka, máslo, vajicko, cukr, orechy, E500", katkiMaddeleri:[{kod:"E500",ad:"Uhličitany sodné",tehlikeli:false,aciklama:"Kypřidlo."}] },
  { ad:"Čabajka", adLatin:"Cabajka", kal:345, pro:14, karb:3, yag:31, lif:0, sod:1080, por:50, kat:"Maso", ulke:"cs", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"vepřové maso, tuk, sůl, E250, paprika", katkiMaddeleri:[{kod:"E250",ad:"Dusičnan sodný",tehlikeli:true,aciklama:"Ve vysokych davkach karcinogenni."}] },

  // ── HU ──
  { ad:"Csirkepaprikás", adLatin:"Csirkepaprikas", kal:225, pro:24, karb:5, yag:13, lif:1, sod:480, por:250, kat:"Fogasok", ulke:"hu", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"csirkehús, tejföl, paprika, hagyma, só", katkiMaddeleri:[] },
  { ad:"Csokoládés Palacsinta", adLatin:"Csokolades Palacsinta", kal:265, pro:7.5, karb:38, yag:11, lif:1.5, sod:185, por:100, kat:"Reggeli", ulke:"hu", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"liszt, tej, tojás, kakaó, cukor, vaj", katkiMaddeleri:[] },
  { ad:"Cékla Saláta", adLatin:"Cekla Salata", kal:65, pro:1.5, karb:14, yag:0.2, lif:3, sod:380, por:100, kat:"Saláták", ulke:"hu", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"cékla, ecet, cukor, só, köménymag", katkiMaddeleri:[] },

  // ── RO ──
  { ad:"Ciorbă de Fasole", adLatin:"Ciorba de Fasole", kal:118, pro:7.5, karb:18, yag:3.5, lif:6, sod:520, por:300, kat:"Ciorbe", ulke:"ro", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"fasole alba, morcov, ceapa, rosii, bors, smantana", katkiMaddeleri:[] },
  { ad:"Cozonac", adLatin:"Cozonac", kal:352, pro:9, karb:58, yag:12, lif:2.5, sod:185, por:100, kat:"Patiserie", ulke:"ro", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"faina, lapte, oua, zahar, unt, nuca, cacao, rom", katkiMaddeleri:[] },
  { ad:"Cașcaval Afumat", adLatin:"Cascaval Afumat", kal:345, pro:22, karb:1, yag:28, lif:0, sod:980, por:30, kat:"Lactate", ulke:"ro", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"lapte de vaca, sare, cultura starter, cheag", katkiMaddeleri:[] },

  // ── HR ──
  { ad:"Čobanac", adLatin:"Cobanac", kal:195, pro:18, karb:8, yag:11, lif:2, sod:520, por:300, kat:"Jela", ulke:"hr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"govedina, janjetina, paprika, vino, cesnjak, luk", katkiMaddeleri:[] },
  { ad:"Crni Rizoto", adLatin:"Crni Rizoto", kal:265, pro:15, karb:32, yag:9, lif:2, sod:580, por:250, kat:"Jela", ulke:"hr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"lignje, riza, crno vino, maslinovo ulje, cesnjak, tinta", katkiMaddeleri:[] },
  { ad:"Čvarci", adLatin:"Cvarci", kal:685, pro:25, karb:0, yag:66, lif:0, sod:980, por:30, kat:"Grickalice", ulke:"hr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"svinjska mast, sol", katkiMaddeleri:[] },

  // ── PT ──
  { ad:"Caldo Verde", kal:88, pro:3.5, karb:12, yag:3.5, lif:2.5, sod:480, por:300, kat:"Sopas", ulke:"pt", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"couve-galega, batata, chourico, azeite, sal, alho", katkiMaddeleri:[] },
  { ad:"Cataplana de Marisco", kal:185, pro:22, karb:8, yag:8, lif:1.5, sod:680, por:300, kat:"Prato", ulke:"pt", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"amijoas, gambas, lingueirão, azeite, alho, tomate, vinho", katkiMaddeleri:[] },
  { ad:"Chouriço Português", kal:415, pro:22, karb:1, yag:36, lif:0, sod:1680, por:30, kat:"Enchidos", ulke:"pt", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"carne de porco, gordura, sal, alho, pimentão, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito de sódio",tehlikeli:true,aciklama:"Em altas doses pode ser cancerígeno."}] },

  // ── EN ──
  { ad:"Cornish Pasty", kal:312, pro:12, karb:38, yag:14, lif:2.5, sod:680, por:200, kat:"Pastry", ulke:"en", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"beef skirt, potato, swede, onion, shortcrust pastry, salt", katkiMaddeleri:[] },
  { ad:"Custard (Bird's)", marka:"Bird's", kal:98, pro:1.5, karb:18, yag:2.5, lif:0.2, sod:85, por:150, kat:"Desserts", ulke:"en", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"cornflour, sugar, salt, E102, E160a", katkiMaddeleri:[{kod:"E102",ad:"Tartrazine",tehlikeli:true,aciklama:"May cause hyperactivity in children."},{kod:"E160a",ad:"Carotenes",tehlikeli:false,aciklama:"Colouring."}] },
  { ad:"Clotted Cream", kal:586, pro:1.6, karb:2.3, yag:63, lif:0, sod:30, por:30, kat:"Dairy", ulke:"en", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"cream", katkiMaddeleri:[] },
  { ad:"Crumpet", kal:182, pro:5.5, karb:38, yag:0.8, lif:1.5, sod:480, por:85, kat:"Bread", ulke:"en", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"wheat flour, water, yeast, salt, E500", katkiMaddeleri:[{kod:"E500",ad:"Sodium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },


  // ── C EK ──
  // FR +2
  { ad:"Croque Monsieur", kal:385, pro:18, karb:32, yag:22, lif:2, sod:780, por:150, kat:"Sandwichs", ulke:"fr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"pain de mie, jambon, fromage, bechamel, beurre", katkiMaddeleri:[] },
  { ad:"Canelés Bordelais", kal:325, pro:5.5, karb:56, yag:10, lif:0.5, sod:120, por:60, kat:"Patisserie", ulke:"fr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"farine, lait, sucre, oeufs, beurre, rhum, vanille", katkiMaddeleri:[] },
  // DE +3
  { ad:"Christbaumgebäck", kal:425, pro:6, karb:62, yag:18, lif:2, sod:185, por:30, kat:"Weihnachtsgebaeck", ulke:"de", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"Mehl, Butter, Zucker, Gewürze, Nüsse", katkiMaddeleri:[] },
  { ad:"Cayennepfeffer DE", kal:318, pro:12, karb:57, yag:17, lif:27, sod:30, por:5, kat:"Gewürze", ulke:"de", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"Cayennepfeffer", katkiMaddeleri:[] },
  // IT +3
  { ad:"Carciofi alla Romana", kal:125, pro:4, karb:10, yag:8, lif:5, sod:380, por:150, kat:"Contorni", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"carciofi, aglio, prezzemolo, menta, olio d'oliva, sale", katkiMaddeleri:[] },
  { ad:"Calzone", kal:285, pro:13, karb:38, yag:10, lif:2.5, sod:580, por:200, kat:"Pizza", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"farina, mozzarella, prosciutto, pomodoro, lievito", katkiMaddeleri:[] },
  { ad:"Crostata di Marmellata", kal:352, pro:6, karb:56, yag:13, lif:2, sod:185, por:80, kat:"Dolci", ulke:"it", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"farina, burro, zucchero, uova, marmellata", katkiMaddeleri:[] },
  // EN +3
  { ad:"Coronation Chicken", kal:245, pro:20, karb:8, yag:15, lif:1, sod:480, por:150, kat:"Dish", ulke:"en", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"chicken, mayonnaise, curry powder, apricot jam, raisins", katkiMaddeleri:[] },
  { ad:"Chip Butty", kal:398, pro:9, karb:58, yag:16, lif:4, sod:680, por:250, kat:"Dish", ulke:"en", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:2, icerik:"white bread, chips, butter, salt, ketchup", katkiMaddeleri:[] },
  { ad:"Courgette (Marrow)", kal:17, pro:1.2, karb:3.1, yag:0.3, lif:1, sod:8, por:100, kat:"Vegetables", ulke:"en", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"courgette", katkiMaddeleri:[] },
  // ES +4
  { ad:"Chistorra", kal:398, pro:18, karb:2, yag:36, lif:0, sod:1580, por:50, kat:"Embutidos", ulke:"es", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"carne de cerdo, sal, pimentón, ajo, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito sódico",tehlikeli:true,aciklama:"En altas dosis puede ser cancerígeno."}] },
  { ad:"Cocido Madrileño", kal:285, pro:20, karb:22, yag:13, lif:7, sod:680, por:400, kat:"Plato Principal", ulke:"es", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"garbanzos, pollo, ternera, chorizo, tocino, verduras", katkiMaddeleri:[] },
  { ad:"Crema Catalana", kal:245, pro:5, karb:32, yag:12, lif:0, sod:68, por:120, kat:"Postres", ulke:"es", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"leche, yemas, azúcar, maizena, limón, canela", katkiMaddeleri:[] },
  { ad:"Chipirón en su Tinta", kal:148, pro:18, karb:4, yag:7, lif:0.5, sod:480, por:150, kat:"Pescado", ulke:"es", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"chipirones, tinta, cebolla, ajo, tomate, vino", katkiMaddeleri:[] },
  // EL +4
  { ad:"Χταπόδι Κρασάτο", adLatin:"Chtapodi Krasato", kal:148, pro:22, karb:6, yag:5, lif:0.5, sod:520, por:200, kat:"Thalassina", ulke:"el", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"chtapodi, krassi, tomates, kremidi, elaiolado", katkiMaddeleri:[] },
  { ad:"Κρέας με Κυδώνια", adLatin:"Kreas me Kydonia", kal:225, pro:18, karb:18, yag:12, lif:2, sod:480, por:250, kat:"Kyria Piata", ulke:"el", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"kreas, kydonia, kremmidi, kanela, zachari", katkiMaddeleri:[] },
  { ad:"Χόρτα Βραστά", adLatin:"Chorta Vrasta", kal:35, pro:2.5, karb:5, yag:0.8, lif:3.5, sod:45, por:200, kat:"Lachanika", ulke:"el", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"agria chorta, elaiolado, lemoni", katkiMaddeleri:[] },
  { ad:"Κολοκυθοκεφτέδες", adLatin:"Kolokithokeftedes", kal:165, pro:6.5, karb:18, yag:8, lif:2.5, sod:380, por:100, kat:"Mezedes", ulke:"el", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"kolokithi, feta, kremidi, diosmos, avgo, alati", katkiMaddeleri:[] },
  // DA +4
  { ad:"Citronkage", kal:352, pro:5.5, karb:52, yag:14, lif:1.2, sod:185, por:80, kat:"Kager", ulke:"da", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"hvedemel, smor, sukker, aeg, citron, bagepulver", katkiMaddeleri:[] },
  { ad:"Cremet Hvidkålssalat", kal:88, pro:1.5, karb:8, yag:5.5, lif:2.5, sod:280, por:150, kat:"Salater", ulke:"da", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"hvidkaal, creme fraiche, eddike, sukker, salt", katkiMaddeleri:[] },
  { ad:"Coppa DK", kal:380, pro:20, karb:1, yag:33, lif:0, sod:1580, por:30, kat:"Charcuteri", ulke:"da", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"svinekød, salt, E250, krydderier", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"Konserveringsmiddel."}] },
  { ad:"Carlsberg Øl", marka:"Carlsberg", kal:42, pro:0.4, karb:4.2, yag:0, lif:0, sod:8, por:330, kat:"Drikkevarer", ulke:"da", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"vand, malt, humle, gær", katkiMaddeleri:[] },
  // NO +4
  // SV +4
  { ad:"Citronkaka SV", kal:345, pro:5.5, karb:50, yag:14, lif:1, sod:185, por:80, kat:"Bakverk", ulke:"sv", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"vetemjöl, smör, socker, ägg, citron, bakpulver", katkiMaddeleri:[] },
  { ad:"Crunchy Muesli SV", kal:412, pro:10, karb:62, yag:14, lif:8, sod:120, por:45, kat:"Frukost", ulke:"sv", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"havregryn, honung, rapsolja, nötter, torkad frukt", katkiMaddeleri:[] },
  // FI +4
  // NL +4
  { ad:"Croquetje van Kaas", kal:278, pro:11, karb:22, yag:17, lif:0.8, sod:680, por:100, kat:"Snack", ulke:"nl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"kaas, bloem, boter, paneermeel, E450", katkiMaddeleri:[{kod:"E450",ad:"Difosfaten",tehlikeli:false,aciklama:"Rijsmiddel."}] },
  { ad:"Citroenvla", kal:98, pro:2.5, karb:16, yag:3, lif:0, sod:68, por:150, kat:"Nagerecht", ulke:"nl", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"melk, suiker, zetmeel, citroensap, E330", katkiMaddeleri:[{kod:"E330",ad:"Citroenzuur",tehlikeli:false,aciklama:"Zuurteregelaar."}] },
  // BE +4
  { ad:"Carbonade Flamande", kal:245, pro:20, karb:12, yag:13, lif:1.5, sod:520, por:300, kat:"Vlees", ulke:"be", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"rundvlees, donker bier, ui, tijm, laurier, boter", katkiMaddeleri:[] },
  { ad:"Coucou de Malines", kal:165, pro:22, karb:0, yag:8, lif:0, sod:72, por:150, kat:"Gevogelte", ulke:"be", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"Mechelse koekoek kip", katkiMaddeleri:[] },
  // AT +4
  // PL +4
  { ad:"Chleb Staropolski", adLatin:"Chleb Staropolski", kal:225, pro:8, karb:43, yag:2, lif:6, sod:480, por:100, kat:"Pieczywo", ulke:"pl", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"mąka żytnia, mąka pszenna, zakwas, woda, sól", katkiMaddeleri:[] },
  { ad:"Czosnek Pieczony", adLatin:"Czosnek Pieczony", kal:148, pro:5.5, karb:32, yag:0.5, lif:2, sod:17, por:50, kat:"Warzywa", ulke:"pl", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"czosnek, oliwa", katkiMaddeleri:[] },
  // CS +4
  { ad:"Chleba Polévka", adLatin:"Chleba Polevka", kal:88, pro:2.5, karb:14, yag:3, lif:1, sod:480, por:300, kat:"Polevky", ulke:"cs", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"staré pečivo, vývar, česnek, majoránka, sůl", katkiMaddeleri:[] },
  { ad:"Čokoládový Dort", adLatin:"Cokoladovy Dort", kal:385, pro:6, karb:52, yag:18, lif:2.5, sod:185, por:100, kat:"Dezerty", ulke:"cs", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"mouka, vajicka, cukr, kakao, máslo, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono a diglyceridy",tehlikeli:false,aciklama:"Emulgátor."}] },
  // HU +4
  { ad:"Csokoládétorta", adLatin:"Csokoladetorta", kal:385, pro:6, karb:52, yag:18, lif:2.5, sod:185, por:100, kat:"Sutemeny", ulke:"hu", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"liszt, tojás, cukor, kakaó, vaj, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono- és digliceridek",tehlikeli:false,aciklama:"Emulgátor."}] },
  { ad:"Csülök Pékné Módra", adLatin:"Csulok Pekne Modra", kal:295, pro:22, karb:8, yag:20, lif:0.5, sod:680, por:200, kat:"Fogasok", ulke:"hu", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"sertéscsülök, kömény, só, fokhagyma, zsir", katkiMaddeleri:[] },
  // RO +4
  { ad:"Ciorbă de Văcuță", adLatin:"Ciorba de Vacuta", kal:88, pro:7, karb:8, yag:4, lif:1.5, sod:520, por:300, kat:"Ciorbe", ulke:"ro", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"carne de vita, morcovi, ceapa, rosii, bors, smantana", katkiMaddeleri:[] },
  { ad:"Cornulețe", adLatin:"Cornulete", kal:398, pro:7, karb:52, yag:20, lif:2, sod:185, por:30, kat:"Patiserie", ulke:"ro", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"faina, unt, smantana, nuca, gem, zahar pudra", katkiMaddeleri:[] },
  { ad:"Cârnați de Pleșcoi", adLatin:"Carnati de Plescoi", kal:385, pro:20, karb:2, yag:34, lif:0, sod:1580, por:50, kat:"Mezeluri", ulke:"ro", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"carne de oaie, sare, ardei, cimbru, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrit de sodiu",tehlikeli:true,aciklama:"In doze mari poate fi cancerigen."}] },
  // HR +4
  { ad:"Ćevapi", adLatin:"Cevapi", kal:248, pro:20, karb:4, yag:17, lif:0.5, sod:480, por:150, kat:"Jela", ulke:"hr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"mljevena govedina, janjetina, sol, papar, crveni luk", katkiMaddeleri:[] },
  { ad:"Crni Kruh HR", adLatin:"Crni Kruh HR", kal:215, pro:8, karb:42, yag:2, lif:7, sod:480, por:100, kat:"Kruh", ulke:"hr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"raženo brašno, voda, sol, kvasac, sjemenke", katkiMaddeleri:[] },
  // PT +4
  { ad:"Caldo de Peixe", kal:72, pro:8, karb:6, yag:2.5, lif:1, sod:480, por:300, kat:"Sopas", ulke:"pt", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"peixe, batata, cenoura, cebola, azeite, sal", katkiMaddeleri:[] },
  { ad:"Caracóis", kal:72, pro:12, karb:3, yag:1.5, lif:0, sod:480, por:150, kat:"Petiscos", ulke:"pt", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"caracóis, alho, louro, sal, piri-piri", katkiMaddeleri:[] },


  // ══════════════════════════════════════════════════════
  // D HARFİ
  // ══════════════════════════════════════════════════════

  // ── PAYLAŞILAN ──
  { ad:"Dark Chocolate (Bitter Çikolata)", adler:{tr:"Bitter Çikolata",de:"Dunkle Schokolade",el:"Μαύρη Σοκολάτα",hu:"Étcsokoládé",pl:"Czekolada Gorzka",cs:"Hořká Čokoláda",ro:"Ciocolată Neagră",hr:"Tamna Čokolada",fr:"Chocolat Noir",es:"Chocolate Negro",it:"Cioccolato Fondente",pt:"Chocolate Negro",no:"Mørk Sjokolade",sv:"Mörk Choklad",da:"Mørk Chokolade",fi:"Tumma Suklaa",nl:"Pure Chocolade"}, kal:546, pro:5, karb:60, yag:31, lif:11, sod:20, por:30, kat:"Chocolate", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"cocoa mass, sugar, cocoa butter, E322", katkiMaddeleri:[{kod:"E322",ad:"Lecithins",tehlikeli:false,aciklama:"Emulsifier."}] },
  { ad:"Dates (Hurma)", adler:{tr:"Hurma",de:"Datteln",el:"Χουρμάδες",hu:"Datolya",pl:"Daktyle",cs:"Datle",ro:"Curmale",hr:"Datule",fr:"Dattes",es:"Dátiles",it:"Datteri",pt:"Tâmaras",no:"Dadler",sv:"Dadlar",da:"Dadler",fi:"Taatelit",nl:"Dadels"}, kal:277, pro:1.8, karb:75, yag:0.2, lif:6.7, sod:1, por:30, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"dates", katkiMaddeleri:[] },
  { ad:"Dill (Dereotu)", adler:{tr:"Dereotu",de:"Dill",el:"Άνηθος",hu:"Kapor",pl:"Koper",cs:"Kopr",ro:"Mărar",hr:"Kopar",fr:"Aneth",es:"Eneldo",it:"Aneto",pt:"Endro",no:"Dill",sv:"Dill",da:"Dild",fi:"Tilli",nl:"Dille"}, kal:43, pro:3.5, karb:7, yag:1.1, lif:2.1, sod:61, por:10, kat:"Herb", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"fresh dill", katkiMaddeleri:[] },
  { ad:"Dragon Fruit (Ejder Meyvesi)", adler:{tr:"Ejder Meyvesi",de:"Drachenfrucht",el:"Δράκος Φρούτο",hu:"Sárkánygyümölcs",pl:"Owoc Smoka",cs:"Dračí Ovoce",ro:"Fruct Dragon",hr:"Zmajevo Voće",fr:"Fruit du Dragon",es:"Pitaya",it:"Frutto del Drago",pt:"Pitaia",no:"Dragefrukt",sv:"Drakfrukt",da:"Dragefrugt",fi:"Lohikäärmehedelmä",nl:"Drakenvruchten"}, kal:60, pro:1.2, karb:13, yag:0, lif:3, sod:39, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"dragon fruit", katkiMaddeleri:[] },
  { ad:"Dijon Mustard", adler:{tr:"Dijon Hardalı",de:"Dijon Senf",el:"Μουστάρδα Ντιζόν",hu:"Dijoni Mustár",pl:"Musztarda Dijon",cs:"Dijonská Hořčice",ro:"Muștar Dijon",hr:"Dijon Senf",fr:"Moutarde de Dijon",es:"Mostaza de Dijon",it:"Senape di Digione",pt:"Mostarda de Dijon",no:"Dijon Sennep",sv:"Dijonsenap",da:"Dijonsennep",fi:"Dijon Sinappi",nl:"Dijonmosterd"}, kal:66, pro:4, karb:5.5, yag:3.5, lif:1.5, sod:1020, por:15, kat:"Condiment", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"mustard seeds, water, vinegar, salt, E224", katkiMaddeleri:[{kod:"E224",ad:"Potassium metabisulphite",tehlikeli:false,aciklama:"Preservative."}] },
  { ad:"Duck Breast (Ördek Göğsü)", adler:{tr:"Ördek Göğsü",de:"Entenbrust",el:"Στήθος Πάπιας",hu:"Kacsamell",pl:"Pierś Kaczki",cs:"Kachní Prsa",ro:"Piept de Rață",hr:"Pačja Prsa",fr:"Magret de Canard",es:"Pechuga de Pato",it:"Petto d'Anatra",pt:"Peito de Pato",no:"Andebryst",sv:"Ankbröst",da:"Andebryst",fi:"Ankanbröst",nl:"Eendenborst"}, kal:201, pro:19, karb:0, yag:14, lif:0, sod:72, por:100, kat:"Meat", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"duck breast", katkiMaddeleri:[] },
  { ad:"Dried Apricot (Kayısı Kurusu)", adler:{tr:"Kayısı Kurusu",de:"Getrocknete Aprikosen",el:"Αποξηραμένα Βερίκοκα",hu:"Aszalt Sárgabarack",pl:"Suszone Morele",cs:"Sušené Meruňky",ro:"Caise Uscate",hr:"Suhe Marelice",fr:"Abricots Secs",es:"Albaricoques Secos",it:"Albicocche Secche",pt:"Damascos Secos",no:"Tørkede Aprikoser",sv:"Torkade Aprikoser",da:"Tørrede Abrikoser",fi:"Kuivatut Aprikoosit",nl:"Gedroogde Abrikozen"}, kal:241, pro:3.4, karb:63, yag:0.5, lif:7.3, sod:10, por:30, kat:"Dried Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"apricots, E220", katkiMaddeleri:[{kod:"E220",ad:"Sulphur dioxide",tehlikeli:true,aciklama:"May cause allergic reactions."}] },
  { ad:"Dried Fig (İncir Kurusu)", adler:{tr:"Kuru İncir",de:"Getrocknete Feigen",el:"Αποξηραμένα Σύκα",hu:"Aszalt Füge",pl:"Suszone Figi",cs:"Sušené Fíky",ro:"Smochine Uscate",hr:"Suhe Smokve",fr:"Figues Sèches",es:"Higos Secos",it:"Fichi Secchi",pt:"Figos Secos",no:"Tørkede Fiken",sv:"Torkade Fikon",da:"Tørrede Figner",fi:"Kuivatut Viikunat",nl:"Gedroogde Vijgen"}, kal:249, pro:3.3, karb:64, yag:0.9, lif:9.8, sod:10, por:30, kat:"Dried Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"figs", katkiMaddeleri:[] },
  { ad:"Danone Yogurt", adler:{tr:"Danone Yoğurt",de:"Danone Joghurt",el:"Γιαούρτι Danone",hu:"Danone Joghurt",pl:"Jogurt Danone",cs:"Jogurt Danone",ro:"Iaurt Danone",hr:"Jogurt Danone",fr:"Yaourt Danone",es:"Yogur Danone",it:"Yogurt Danone",pt:"Iogurte Danone",no:"Danone Yoghurt",sv:"Danone Yoghurt",da:"Danone Yoghurt",fi:"Danone Jogurtti",nl:"Danone Yoghurt"}, marka:"Danone", kal:60, pro:4.5, karb:6, yag:1.6, lif:0, sod:65, por:125, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"milk, cultures", katkiMaddeleri:[] },
  { ad:"Edamame (Yeşil Soya)", adler:{tr:"Yeşil Soya",de:"Edamame",el:"Εντάμαμε",hu:"Edamame",pl:"Edamame",cs:"Edamame",ro:"Edamame",hr:"Edamame",fr:"Edamame",es:"Edamame",it:"Edamame",pt:"Edamame",no:"Edamame",sv:"Edamame",da:"Edamame",fi:"Edamame",nl:"Edamame"}, kal:122, pro:11, karb:10, yag:5.2, lif:5.2, sod:6, por:100, kat:"Legume", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"edamame beans", katkiMaddeleri:[] },

  // ── TR ──
  { ad:"Domates", kal:18, pro:0.9, karb:3.9, yag:0.2, lif:1.2, sod:5, por:100, kat:"Sebze", ulke:"tr", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"domates", katkiMaddeleri:[] },
  { ad:"Domates Çorbası", kal:72, pro:2, karb:10, yag:3, lif:1.5, sod:480, por:250, kat:"Çorba", ulke:"tr", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"domates, soğan, tereyağı, un, tuz, şeker", katkiMaddeleri:[] },
  { ad:"Domates Salçası", kal:65, pro:2.8, karb:13, yag:0.5, lif:3, sod:1850, por:20, kat:"Sos", ulke:"tr", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"domates, tuz", katkiMaddeleri:[] },
  { ad:"Dolma (Yaprak Sarma)", kal:168, pro:5, karb:22, yag:7, lif:3, sod:380, por:100, kat:"Meze", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"asma yaprağı, pirinç, kuru üzüm, çam fıstığı, zeytinyağı", katkiMaddeleri:[] },
  { ad:"Dolma (Biber)", kal:145, pro:7, karb:16, yag:6.5, lif:2.5, sod:380, por:150, kat:"Et", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"biber, kıyma, pirinç, soğan, domates, baharat", katkiMaddeleri:[] },
  { ad:"Dana Bonfile", kal:185, pro:28, karb:0, yag:8, lif:0, sod:65, por:100, kat:"Et", ulke:"tr", tokPuan:78, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"dana bonfile", katkiMaddeleri:[] },
  { ad:"Dana Kaburga", kal:245, pro:22, karb:0, yag:17, lif:0, sod:72, por:100, kat:"Et", ulke:"tr", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"dana kaburga", katkiMaddeleri:[] },
  { ad:"Dövme Buğday", kal:340, pro:12, karb:72, yag:1.5, lif:10, sod:5, por:100, kat:"Tahıl", ulke:"tr", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"dövme buğday", katkiMaddeleri:[] },
  { ad:"Dondurma (Vanilya)", kal:207, pro:3.5, karb:24, yag:11, lif:0, sod:80, por:100, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"süt, krema, şeker, yumurta sarısı, vanilin, E471, E410", katkiMaddeleri:[{kod:"E471",ad:"Mono ve digliseritler",tehlikeli:false,aciklama:"Emülgatör."},{kod:"E410",ad:"Keçiboynuzu zamkı",tehlikeli:false,aciklama:"Kıvam arttırıcı."}] },
  { ad:"Dondurma (Çikolatalı)", kal:218, pro:3.8, karb:26, yag:12, lif:0.5, sod:85, por:100, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"süt, krema, şeker, kakao, E471, E410, E407", katkiMaddeleri:[{kod:"E471",ad:"Mono ve digliseritler",tehlikeli:false,aciklama:"Emülgatör."},{kod:"E410",ad:"Keçiboynuzu zamkı",tehlikeli:false,aciklama:"Kıvam arttırıcı."},{kod:"E407",ad:"Karragenan",tehlikeli:false,aciklama:"Kıvam arttırıcı."}] },
  { ad:"Dere Balığı", kal:130, pro:19, karb:0, yag:6, lif:0, sod:52, por:100, kat:"Balık", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"dere alabalığı", katkiMaddeleri:[] },
  { ad:"Dövülmüş Tavuk", kal:175, pro:24, karb:4, yag:7, lif:0.5, sod:280, por:150, kat:"Et", ulke:"tr", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"tavuk, baharat, zeytinyağı, sarımsak", katkiMaddeleri:[] },
  { ad:"Dut", kal:43, pro:1.4, karb:9.8, yag:0.4, lif:1.7, sod:10, por:100, kat:"Meyve", ulke:"tr", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"dut", katkiMaddeleri:[] },
  { ad:"Dut Pekmezi", kal:285, pro:1.2, karb:72, yag:0.2, lif:0.5, sod:8, por:20, kat:"Tatlandırıcı", ulke:"tr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"dut suyu", katkiMaddeleri:[] },
  { ad:"Düğü Çorbası", kal:82, pro:3, karb:14, yag:2, lif:1, sod:480, por:250, kat:"Çorba", ulke:"tr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"pirinç, mercimek, tereyağı, nane, tuz", katkiMaddeleri:[] },
  { ad:"Dilek Pastası", kal:385, pro:6.5, karb:52, yag:18, lif:1.5, sod:185, por:100, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"un, yumurta, şeker, kakao, krema, E471, E322", katkiMaddeleri:[{kod:"E471",ad:"Mono ve digliseritler",tehlikeli:false,aciklama:"Emülgatör."},{kod:"E322",ad:"Lesitinler",tehlikeli:false,aciklama:"Emülgatör."}] },
  { ad:"Dövme Kereviz", kal:14, pro:0.6, karb:3, yag:0.2, lif:1.6, sod:80, por:100, kat:"Sebze", ulke:"tr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"kereviz", katkiMaddeleri:[] },

  // ── DE ──
  { ad:"Döner Kebab DE", kal:265, pro:18, karb:28, yag:10, lif:2, sod:580, por:200, kat:"Streetfood", ulke:"de", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"Lammfleisch, Rindfleisch, Weizenbrot, Salat, Joghurtsauce", katkiMaddeleri:[] },
  { ad:"Dampfnudeln", kal:295, pro:7, karb:52, yag:6, lif:2, sod:185, por:120, kat:"Mehlspeisen", ulke:"de", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"Weizenmehl, Hefe, Milch, Butter, Salz, Zucker", katkiMaddeleri:[] },
  { ad:"Dresdner Stollen", kal:398, pro:7, karb:58, yag:17, lif:2.5, sod:185, por:100, kat:"Weihnachtsgebaeck", ulke:"de", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"Mehl, Butter, Rosinen, Marzipan, Mandeln, Gewürze", katkiMaddeleri:[] },
  { ad:"Deutsches Beefsteak", kal:225, pro:22, karb:5, yag:14, lif:0.5, sod:420, por:150, kat:"Fleisch", ulke:"de", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"Rindfleisch, Zwiebel, Senf, Salz, Pfeffer", katkiMaddeleri:[] },
  { ad:"Dicke Bohnen Eintopf", kal:145, pro:8, karb:22, yag:3.5, lif:7, sod:480, por:300, kat:"Eintopf", ulke:"de", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"Dicke Bohnen, Speck, Zwiebel, Brühe, Majoran", katkiMaddeleri:[] },
  { ad:"Dreierlei Käse", kal:385, pro:24, karb:0.5, yag:32, lif:0, sod:660, por:30, kat:"Kaese", ulke:"de", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Gouda, Emmentaler, Brie, Salz", katkiMaddeleri:[] },

  // ── FR ──
  { ad:"Daube Provençale", kal:225, pro:22, karb:8, yag:12, lif:2, sod:520, por:300, kat:"Plat", ulke:"fr", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"boeuf, vin rouge, tomates, olives, herbes de Provence", katkiMaddeleri:[] },
  { ad:"Dauphinois Gratin", kal:195, pro:5, karb:18, yag:12, lif:2, sod:380, por:200, kat:"Accompagnements", ulke:"fr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"pommes de terre, crème, ail, noix de muscade, sel", katkiMaddeleri:[] },
  { ad:"Dinde Rôtie FR", kal:165, pro:25, karb:0, yag:7, lif:0, sod:72, por:150, kat:"Volaille", ulke:"fr", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"dinde, beurre, herbes, sel, poivre", katkiMaddeleri:[] },
  { ad:"Dacquoise", kal:358, pro:7, karb:46, yag:18, lif:2, sod:120, por:80, kat:"Patisserie", ulke:"fr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"amandes, noisettes, blancs d'oeufs, sucre, crème", katkiMaddeleri:[] },
  { ad:"Diots au Vin Blanc", kal:285, pro:14, karb:5, yag:23, lif:1, sod:780, por:150, kat:"Charcuterie", ulke:"fr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"saucisses, vin blanc, thym, laurier, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrite de sodium",tehlikeli:true,aciklama:"En grande quantité peut être cancérigène."}] },

  // ── IT ──
  { ad:"Dolcelatte", kal:365, pro:21, karb:0.5, yag:31, lif:0, sod:1380, por:30, kat:"Formaggi", ulke:"it", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"latte, sale, caglio, muffe", katkiMaddeleri:[] },
  { ad:"Ditalini", kal:353, pro:12, karb:71, yag:1.5, lif:2.7, sod:3, por:100, kat:"Pasta", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"semolino di grano duro", katkiMaddeleri:[] },
  { ad:"Dolci di Ricotta", kal:295, pro:10, karb:38, yag:13, lif:0.8, sod:185, por:100, kat:"Dolci", ulke:"it", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"ricotta, zucchero, uova, scorza di limone, E471", katkiMaddeleri:[{kod:"E471",ad:"Monogliceridi",tehlikeli:false,aciklama:"Emulsionante."}] },
  { ad:"Denominazione d'Origine Prosciutto", kal:268, pro:26, karb:0, yag:18, lif:0, sod:1680, por:50, kat:"Salumi", ulke:"it", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"coscia di maiale, sale marino", katkiMaddeleri:[] },
  { ad:"Donzella Fritto", kal:158, pro:20, karb:6, yag:6, lif:0.5, sod:280, por:100, kat:"Pesce", ulke:"it", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"donzella, farina, olio, sale", katkiMaddeleri:[] },

  // ── ES ──
  { ad:"Dorada a la Sal", kal:125, pro:22, karb:0, yag:4.5, lif:0, sod:380, por:200, kat:"Pescado", ulke:"es", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"dorada, sal marina", katkiMaddeleri:[] },
  { ad:"Dulce de Leche", kal:325, pro:7, karb:58, yag:8, lif:0, sod:120, por:30, kat:"Postres", ulke:"es", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"leche, azúcar, bicarbonato E500", katkiMaddeleri:[{kod:"E500",ad:"Carbonato de sodio",tehlikeli:false,aciklama:"Leudante."}] },
  { ad:"Dacsa (Maíz Valenciano)", kal:365, pro:9, karb:74, yag:4.7, lif:7.3, sod:35, por:100, kat:"Cereales", ulke:"es", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"maíz valenciano", katkiMaddeleri:[] },
  { ad:"Dados de Jamón", kal:248, pro:26, karb:0, yag:16, lif:0, sod:1580, por:30, kat:"Embutidos", ulke:"es", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"jamón curado, sal, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito sódico",tehlikeli:true,aciklama:"En altas dosis puede ser cancerígeno."}] },

  // ── EL ──
  { ad:"Δολμάδες", adLatin:"Dolmades", kal:168, pro:5, karb:22, yag:7, lif:3, sod:380, por:100, kat:"Mezedes", ulke:"el", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"ambelofylla, rizi, kremdyi, elaiolado, lemoni", katkiMaddeleri:[] },
  { ad:"Διπλός Εσπρέσο", adLatin:"Diplos Espresso", kal:5, pro:0.3, karb:0.6, yag:0.1, lif:0, sod:4, por:60, kat:"Pota", ulke:"el", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"kafe", katkiMaddeleri:[] },
  { ad:"Ντομάτα Σαντορίνης", adLatin:"Domates Santorinis", kal:18, pro:0.9, karb:3.9, yag:0.2, lif:1.2, sod:5, por:100, kat:"Lachanika", ulke:"el", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"santorinis domates", katkiMaddeleri:[] },
  { ad:"Δίπλα (Γλύκισμα)", adLatin:"Dipla Glikisma", kal:385, pro:5.5, karb:52, yag:18, lif:1, sod:185, por:80, kat:"Glika", ulke:"el", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"aleuron, meli, kanela, neros", katkiMaddeleri:[] },
  { ad:"Δωδωνή Γιαούρτι", adLatin:"Dodoni Giaourti", marka:"Dodoni", kal:115, pro:6, karb:6, yag:8, lif:0, sod:55, por:150, kat:"Galaktokomika", ulke:"el", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"pilares gala, kalliergeies", katkiMaddeleri:[] },

  // ── DA ──
  { ad:"Drikkevarer Æble", kal:44, pro:0.4, karb:10, yag:0.1, lif:0.2, sod:3, por:200, kat:"Drikkevarer", ulke:"da", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"æblesaft", katkiMaddeleri:[] },
  { ad:"Dyrlægens Natmad", kal:245, pro:12, karb:18, yag:14, lif:2, sod:680, por:100, kat:"Smorrebrod", ulke:"da", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"rugbrod, leverpostej, sky, løg, karse", katkiMaddeleri:[] },
  { ad:"Dansk Hotdog", kal:318, pro:14, karb:38, yag:14, lif:2.5, sod:980, por:200, kat:"Streetfood", ulke:"da", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"brød, pølse, remoulade, sennep, ketchup, ristede løg, E250", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"Konserveringsmiddel."}] },
  { ad:"Dansk Smør", kal:717, pro:0.5, karb:0.5, yag:80, lif:0, sod:580, por:10, kat:"Mejeri", ulke:"da", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"fløde, salt", katkiMaddeleri:[] },
  { ad:"Danskøl", marka:"Carlsberg", kal:42, pro:0.4, karb:4, yag:0, lif:0, sod:8, por:330, kat:"Drikkevarer", ulke:"da", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"vand, malt, humle, gær", katkiMaddeleri:[] },

  // ── NO ──
  { ad:"Dyresteg (Elg)", kal:145, pro:24, karb:0, yag:5.5, lif:0, sod:65, por:150, kat:"Kjøtt", ulke:"no", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"elgkjøtt", katkiMaddeleri:[] },
  { ad:"Dill-sild", kal:168, pro:18, karb:2, yag:10, lif:0, sod:1200, por:80, kat:"Fisk", ulke:"no", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"sild, dill, eddik, sukker, salt, E220", katkiMaddeleri:[{kod:"E220",ad:"Svoveldioksid",tehlikeli:true,aciklama:"Kan forårsake allergiske reaksjoner."}] },
  { ad:"Dugnadsbrød", kal:225, pro:8, karb:43, yag:2.5, lif:5.5, sod:480, por:100, kat:"Brod", ulke:"no", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"hvetemel, rugmel, havre, vann, salt, gjær", katkiMaddeleri:[] },
  { ad:"Dvergsmolt", kal:155, pro:22, karb:0, yag:7, lif:0, sod:68, por:100, kat:"Fisk", ulke:"no", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"laks", katkiMaddeleri:[] },
  { ad:"Dannebrog Ost NO", kal:355, pro:24, karb:0.5, yag:29, lif:0, sod:650, por:30, kat:"Meieri", ulke:"no", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"melk, salt, løpe, kulturer", katkiMaddeleri:[] },

  // ── SV ──
  { ad:"Dillkött", kal:195, pro:20, karb:5, yag:11, lif:0.8, sod:480, por:250, kat:"Kott", ulke:"sv", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"lammkött, dill, grädde, salt, vitpeppar", katkiMaddeleri:[] },
  { ad:"Danska Wienerbröd", kal:385, pro:7, karb:52, yag:18, lif:2, sod:280, por:80, kat:"Bageri", ulke:"sv", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"vetemjöl, smör, socker, ägg, jäst, mandelmassa", katkiMaddeleri:[] },
  { ad:"Dillstuvad Potatis", kal:105, pro:2.5, karb:18, yag:3, lif:2, sod:280, por:200, kat:"Tillbehor", ulke:"sv", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"potatis, dill, smör, grädde, salt", katkiMaddeleri:[] },
  { ad:"Dalby Ost SV", kal:355, pro:24, karb:0.5, yag:29, lif:0, sod:650, por:30, kat:"Mejeri", ulke:"sv", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mjölk, salt, löpe, kulturer", katkiMaddeleri:[] },
  { ad:"Druvmust SV", kal:68, pro:0.3, karb:17, yag:0, lif:0, sod:5, por:200, kat:"Drycker", ulke:"sv", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"druvjuice, E330", katkiMaddeleri:[{kod:"E330",ad:"Citronsyra",tehlikeli:false,aciklama:"Surhetsreglering."}] },

  // ── FI ──
  { ad:"Dessertijuusto FI", kal:355, pro:22, karb:0.5, yag:29, lif:0, sod:650, por:30, kat:"Maitotuotteet", ulke:"fi", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"maito, suola, juoksute, kulttuurit", katkiMaddeleri:[] },
  { ad:"Dilliperunat", kal:105, pro:2.5, karb:18, yag:3, lif:2, sod:280, por:200, kat:"Lisakkeet", ulke:"fi", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"perunat, tilli, voi, kerma, suola", katkiMaddeleri:[] },
  { ad:"Donitsit", kal:398, pro:6, karb:52, yag:20, lif:1.5, sod:280, por:60, kat:"Leivonnaiset", ulke:"fi", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"vehnäjauho, sokeri, maito, kananmuna, voi, hiiva, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono- ja diglyseridit",tehlikeli:false,aciklama:"Emulgaattori."}] },
  { ad:"Danskalaiset Voisilmäpullat", kal:375, pro:7, karb:52, yag:17, lif:2, sod:280, por:80, kat:"Leivonnaiset", ulke:"fi", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"vehnäjauho, voi, sokeri, kananmuna, hiiva, manteli", katkiMaddeleri:[] },
  { ad:"Demi-glace Kastike FI", kal:38, pro:3, karb:4, yag:1.5, lif:0.2, sod:580, por:50, kat:"Kastikkeet", ulke:"fi", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"liemi, tomaattipyree, punaviini, voi, suola", katkiMaddeleri:[] },

  // ── NL ──
  { ad:"Driehoekssla", kal:15, pro:1.3, karb:2.5, yag:0.2, lif:1.5, sod:28, por:100, kat:"Groente", ulke:"nl", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"sla", katkiMaddeleri:[] },

  // ── BE ──
  { ad:"Dartois BE", kal:338, pro:10, karb:30, yag:21, lif:1.5, sod:480, por:100, kat:"Boulangerie", ulke:"be", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"feuilletage, jambon, fromage, oeuf, beurre", katkiMaddeleri:[] },
  { ad:"Dame Blanche", kal:285, pro:4.5, karb:35, yag:15, lif:0.5, sod:80, por:150, kat:"Dessert", ulke:"be", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"glace vanille, sauce chocolat, chantilly", katkiMaddeleri:[] },
  { ad:"Dubbel Bier BE", kal:65, pro:0.5, karb:6.5, yag:0, lif:0, sod:10, por:330, kat:"Bier", ulke:"be", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"water, mout, hop, gist", katkiMaddeleri:[] },
  { ad:"Dendermondse Vlaaien", kal:285, pro:6, karb:44, yag:10, lif:1.5, sod:185, por:100, kat:"Gebak", ulke:"be", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"bloem, eieren, boter, suiker, fruit, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono en diglyceriden",tehlikeli:false,aciklama:"Emulgator."}] },
  { ad:"Diksmuids Botervlootje", kal:345, pro:8, karb:38, yag:18, lif:2, sod:280, por:60, kat:"Gebak", ulke:"be", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"bloem, boter, eieren, suiker, gist, rozijnen", katkiMaddeleri:[] },

  // ── AT ──
  { ad:"Debreziner", kal:330, pro:13, karb:2, yag:30, lif:0, sod:980, por:100, kat:"Wurst", ulke:"at", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"Schweinefleisch, Rindfleisch, Paprika, Salz, E250", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."}] },
  { ad:"Dalken (Topfendalken)", kal:225, pro:8, karb:28, yag:10, lif:1, sod:185, por:100, kat:"Mehlspeisen", ulke:"at", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"Topfen, Mehl, Eier, Butter, Zucker, Salz", katkiMaddeleri:[] },
  { ad:"Duroc Schweinebraten AT", kal:265, pro:24, karb:0, yag:18, lif:0, sod:72, por:150, kat:"Fleisch", ulke:"at", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"Duroc Schwein, Salz, Kümmel, Knoblauch", katkiMaddeleri:[] },
  { ad:"Dunkles Bier AT", kal:48, pro:0.4, karb:4.8, yag:0, lif:0, sod:10, por:330, kat:"Getraenk", ulke:"at", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"Wasser, Malz, Hopfen, Hefe", katkiMaddeleri:[] },
  { ad:"Dirndlmarmelade", kal:250, pro:0.4, karb:63, yag:0, lif:1.5, sod:8, por:20, kat:"Aufstrich", ulke:"at", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"Kornelkirschen, Zucker, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektine",tehlikeli:false,aciklama:"Geliermittel."},{kod:"E330",ad:"Zitronensaeure",tehlikeli:false,aciklama:"Saeureregulator."}] },

  // ── PL ──
  { ad:"Duszona Kapusta", adLatin:"Duszona Kapusta", kal:88, pro:2.5, karb:12, yag:3.5, lif:4.5, sod:380, por:200, kat:"Warzywa", ulke:"pl", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"kapusta, cebula, boczek, sól, pieprz, majeranek", katkiMaddeleri:[] },
  { ad:"Drożdżówka", adLatin:"Drozdzowka", kal:295, pro:6.5, karb:50, yag:9, lif:2, sod:185, por:80, kat:"Pieczywo Slodkie", ulke:"pl", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"mąka, drożdże, mleko, jajka, masło, cukier, marmolada", katkiMaddeleri:[] },
  { ad:"Dorsz Pieczony", adLatin:"Dorsz Pieczony", kal:88, pro:19, karb:0, yag:1.5, lif:0, sod:68, por:150, kat:"Ryby", ulke:"pl", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"dorsz, oliwa, sol, pieprz, zioła", katkiMaddeleri:[] },
  { ad:"Dżem Śliwkowy", adLatin:"Dzem Sliwkowy", kal:250, pro:0.4, karb:63, yag:0, lif:1.5, sod:8, por:20, kat:"Przetwory", ulke:"pl", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"śliwki, cukier, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektyny",tehlikeli:false,aciklama:"Środek żelujący."},{kod:"E330",ad:"Kwas cytrynowy",tehlikeli:false,aciklama:"Regulator kwasowości."}] },
  { ad:"Demi-sec Wino PL", adLatin:"Demi-sec Wino PL", kal:82, pro:0.1, karb:6, yag:0, lif:0, sod:6, por:150, kat:"Napoje", ulke:"pl", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"winogrona, E220", katkiMaddeleri:[{kod:"E220",ad:"Dwutlenek siarki",tehlikeli:true,aciklama:"Może powodować reakcje alergiczne."}] },

  // ── CS ──
  { ad:"Dušená Svíčková", adLatin:"Dusena Svickova", kal:285, pro:20, karb:18, yag:15, lif:2, sod:520, por:300, kat:"Hlavni Jidla", ulke:"cs", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"hovězí svíčková, kořenová zelenina, smetana, citron, brusinka", katkiMaddeleri:[] },
  { ad:"Domácí Knedlíky", adLatin:"Domaci Knedliky", kal:195, pro:5.5, karb:38, yag:2.5, lif:2, sod:280, por:150, kat:"Prilohy", ulke:"cs", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"mouka, voda, kvasnice, vejce, sůl", katkiMaddeleri:[] },
  { ad:"Dalamánek", adLatin:"Dalamánek", kal:252, pro:9, karb:48, yag:2, lif:3, sod:480, por:80, kat:"Pecivo", ulke:"cs", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"pšeničná mouka, voda, sůl, kvásek", katkiMaddeleri:[] },
  { ad:"Drůbežárna Játra", adLatin:"Drubezarna Jatra", kal:172, pro:24, karb:2.5, yag:7, lif:0, sod:68, por:100, kat:"Maso", ulke:"cs", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"kuřecí játra", katkiMaddeleri:[] },

  // ── HU ──
  { ad:"Dobos Torta", adLatin:"Dobos Torta", kal:398, pro:7, karb:52, yag:20, lif:1.5, sod:185, por:100, kat:"Sutemeny", ulke:"hu", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"liszt, tojás, cukor, vaj, csokoládé, karamell", katkiMaddeleri:[] },
  { ad:"Disznósajt", adLatin:"Disznosajt", kal:298, pro:18, karb:2, yag:25, lif:0, sod:1150, por:50, kat:"Husaruk", ulke:"hu", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"sertéshús, bőr, só, E250, E451, fűszerek", katkiMaddeleri:[{kod:"E250",ad:"Nátrium-nitrit",tehlikeli:true,aciklama:"Nagyobb adagban karcinogén."},{kod:"E451",ad:"Trifoszfátok",tehlikeli:false,aciklama:"Nedvességmegőrző."}] },
  { ad:"Debreceni Kolbász", adLatin:"Debreceni Kolbasz", kal:348, pro:15, karb:2, yag:32, lif:0, sod:1050, por:100, kat:"Husaruk", ulke:"hu", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"sertéshús, zsír, só, E250, paprika", katkiMaddeleri:[{kod:"E250",ad:"Nátrium-nitrit",tehlikeli:true,aciklama:"Nagyobb adagban karcinogén."}] },
  { ad:"Derelyetészta", adLatin:"Derelyeteszta", kal:245, pro:8, karb:38, yag:9, lif:2, sod:285, por:150, kat:"Tesztak", ulke:"hu", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"liszt, tojás, vaj, túró, cukor, citromhéj", katkiMaddeleri:[] },
  { ad:"Diós Bejgli", adLatin:"Dios Bejgli", kal:385, pro:8, karb:50, yag:19, lif:3, sod:185, por:80, kat:"Sutemeny", ulke:"hu", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"liszt, élesztő, tej, tojás, vaj, dió, cukor", katkiMaddeleri:[] },

  // ── RO ──
  { ad:"Drob de Miel", adLatin:"Drob de Miel", kal:235, pro:18, karb:5, yag:16, lif:0.5, sod:480, por:150, kat:"Mancare", ulke:"ro", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"maruntaie miel, oua, ceapa verde, marar, sare", katkiMaddeleri:[] },
  { ad:"Dovlecei Umpluti", adLatin:"Dovlecei Umpluti", kal:148, pro:8, karb:14, yag:7, lif:2.5, sod:380, por:200, kat:"Mancare", ulke:"ro", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"dovlecei, carne tocata, orez, rosii, smantana", katkiMaddeleri:[] },
  { ad:"Dulceață de Trandafiri", adLatin:"Dulceata de Trandafiri", kal:275, pro:0.3, karb:70, yag:0, lif:0.5, sod:6, por:20, kat:"Dulciuri", ulke:"ro", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"petale de trandafir, zahar, suc de lamaie, E440", katkiMaddeleri:[{kod:"E440",ad:"Pectine",tehlikeli:false,aciklama:"Agent de gelificare."}] },
  { ad:"Dobândă (Pastramă)", adLatin:"Dobanday Pastrama", kal:218, pro:25, karb:1, yag:13, lif:0, sod:1480, por:50, kat:"Mezeluri", ulke:"ro", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"carne de oaie, sare, usturoi, piper, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrit de sodiu",tehlikeli:true,aciklama:"In doze mari poate fi cancerigen."}] },
  { ad:"Degete cu Brânză", adLatin:"Degete cu Branza", kal:285, pro:10, karb:28, yag:16, lif:1.5, sod:480, por:100, kat:"Patiserie", ulke:"ro", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"faina, branza, unt, oua, sare", katkiMaddeleri:[] },

  // ── HR ──
  { ad:"Dalmatinski Pršut", adLatin:"Dalmatinski Prsut", kal:248, pro:28, karb:0, yag:15, lif:0, sod:1680, por:30, kat:"Suhe Mesne Preradjevine", ulke:"hr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"svinjski but, sol", katkiMaddeleri:[] },
  { ad:"Dalmatinska Gregada", adLatin:"Dalmatinska Gregada", kal:145, pro:18, karb:8, yag:5.5, lif:1.5, sod:480, por:300, kat:"Jela", ulke:"hr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"riba, krumpir, luk, maslinovo ulje, bijelo vino, sol", katkiMaddeleri:[] },
  { ad:"Domaći Kruh HR", adLatin:"Domaci Kruh HR", kal:225, pro:8, karb:43, yag:2.5, lif:5, sod:480, por:100, kat:"Kruh", ulke:"hr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"brašno, voda, sol, kvasac", katkiMaddeleri:[] },
  { ad:"Dinja HR", adLatin:"Dinja HR", kal:34, pro:0.8, karb:8.2, yag:0.2, lif:0.9, sod:16, por:100, kat:"Voce", ulke:"hr", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"dinja", katkiMaddeleri:[] },
  { ad:"Drniški Kulen", adLatin:"Drninski Kulen", kal:368, pro:20, karb:2, yag:32, lif:0, sod:1450, por:50, kat:"Kobasice", ulke:"hr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"svinjetina, sol, paprika, cesnjak, E250", katkiMaddeleri:[{kod:"E250",ad:"Natrijev nitrit",tehlikeli:true,aciklama:"U visokim dozama može biti kancerogen."}] },

  // ── PT ──
  { ad:"Dobrada", adLatin:"Dobrada", kal:155, pro:14, karb:8, yag:8, lif:2, sod:580, por:300, kat:"Prato", ulke:"pt", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"dobrada, feijao branco, chourico, cebola, alho, sal", katkiMaddeleri:[] },
  { ad:"Dourada Grelhada", adLatin:"Dourada Grelhada", kal:125, pro:22, karb:0, yag:4.5, lif:0, sod:380, por:200, kat:"Peixe", ulke:"pt", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"dourada, azeite, sal, limao, salsa", katkiMaddeleri:[] },
  { ad:"Doce de Abóbora", adLatin:"Doce de Abobora", kal:265, pro:0.5, karb:68, yag:0, lif:1, sod:8, por:20, kat:"Doces", ulke:"pt", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"abobora, acucar, canela, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pectinas",tehlikeli:false,aciklama:"Agente gelificante."},{kod:"E330",ad:"Acido citrico",tehlikeli:false,aciklama:"Regulador de acidez."}] },
  { ad:"Dúzio (Duros)", adLatin:"Duzio Duros", kal:458, pro:7, karb:66, yag:20, lif:2.5, sod:480, por:30, kat:"Salgados", ulke:"pt", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"farinha, oleo, sal, E450, E500", katkiMaddeleri:[{kod:"E450",ad:"Difosfatos",tehlikeli:false,aciklama:"Agente de levedura."},{kod:"E500",ad:"Carbonatos de sodio",tehlikeli:false,aciklama:"Agente de levedura."}] },
  { ad:"Duraznos en Almíbar PT", adLatin:"Duraznos en Almibar PT", kal:78, pro:0.5, karb:19, yag:0.1, lif:1, sod:8, por:100, kat:"Conservas", ulke:"pt", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"pessegos, calda de açúcar, E330", katkiMaddeleri:[{kod:"E330",ad:"Acido citrico",tehlikeli:false,aciklama:"Regulador de acidez."}] },

  // ── EN ──
  { ad:"Devonshire Cream Tea", kal:365, pro:6, karb:48, yag:18, lif:1.5, sod:280, por:150, kat:"Afternoon Tea", ulke:"en", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"scone, clotted cream, strawberry jam, tea", katkiMaddeleri:[] },
  { ad:"Digestive Biscuit", marka:"McVitie's", kal:476, pro:7, karb:62, yag:22, lif:3, sod:480, por:30, kat:"Biscuits", ulke:"en", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"wheat flour, vegetable fat, wholemeal wheat flour, sugar, salt, E503", katkiMaddeleri:[{kod:"E503",ad:"Ammonium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },
  { ad:"Duck à l'Orange", kal:285, pro:22, karb:12, yag:18, lif:0.8, sod:480, por:200, kat:"Dish", ulke:"en", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"duck, orange juice, sugar, vinegar, brandy", katkiMaddeleri:[] },
  { ad:"Dumplings (Suet)", kal:248, pro:5, karb:32, yag:12, lif:1.5, sod:480, por:100, kat:"Dish", ulke:"en", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"suet, flour, water, salt, E500", katkiMaddeleri:[{kod:"E500",ad:"Sodium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },
  { ad:"Dundee Cake", kal:375, pro:6, karb:54, yag:16, lif:3, sod:185, por:80, kat:"Cakes", ulke:"en", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"flour, butter, sugar, eggs, mixed fruit, almonds, whisky", katkiMaddeleri:[] },


  // ── D EK 2 ──
  // DE +9
  { ad:"Dinkelbrot", kal:228, pro:9, karb:42, yag:2.5, lif:7, sod:480, por:100, kat:"Brot", ulke:"de", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"Dinkelmehl, Wasser, Sauerteig, Salz, Hefe", katkiMaddeleri:[] },
  { ad:"Dinkelvollkorn Nudeln", kal:335, pro:13, karb:65, yag:2.5, lif:8, sod:5, por:100, kat:"Nudeln", ulke:"de", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"Vollkorn-Dinkelmehl", katkiMaddeleri:[] },
  { ad:"Doppelrahmfrischkäse", kal:285, pro:6, karb:2.5, yag:28, lif:0, sod:380, por:30, kat:"Milchprodukte", ulke:"de", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"Rahm, Milch, Salz, Kulturen", katkiMaddeleri:[] },
  { ad:"Dörrobst Mischung", kal:252, pro:3, karb:65, yag:0.5, lif:7.5, sod:10, por:30, kat:"Trockenfrüchte", ulke:"de", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Aprikosen, Pflaumen, Feigen, E220", katkiMaddeleri:[{kod:"E220",ad:"Schwefeldioxid",tehlikeli:true,aciklama:"Kann allergische Reaktionen auslösen."}] },
  { ad:"Dauerleberwurst DE", kal:328, pro:15, karb:3, yag:29, lif:0.5, sod:980, por:30, kat:"Aufschnitt", ulke:"de", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"Schweineleber, Schweinefleisch, Salz, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."},{kod:"E451",ad:"Triphosphate",tehlikeli:false,aciklama:"Feuchthaltemittel."}] },
  { ad:"Dicke Bohnen", kal:88, pro:6.4, karb:15, yag:0.6, lif:5, sod:5, por:100, kat:"Gemuese", ulke:"de", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"dicke Bohnen", katkiMaddeleri:[] },
  // FR +10
  { ad:"Délice de Bourgogne", kal:375, pro:14, karb:1, yag:35, lif:0, sod:580, por:30, kat:"Fromages", ulke:"fr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"lait, crème, sel, présure", katkiMaddeleri:[] },
  { ad:"Dorade Royale FR", kal:125, pro:22, karb:0, yag:4.5, lif:0, sod:380, por:200, kat:"Poisson", ulke:"fr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"dorade royale", katkiMaddeleri:[] },
  { ad:"Duchesse de Bourgogne", kal:48, pro:0.4, karb:4.5, yag:0, lif:0, sod:8, por:330, kat:"Boissons", ulke:"fr", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"eau, malt, houblon, levure", katkiMaddeleri:[] },
  { ad:"Demi-baguette", kal:265, pro:9, karb:52, yag:1.5, lif:2.5, sod:480, por:50, kat:"Boulangerie", ulke:"fr", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"farine de blé, eau, sel, levure", katkiMaddeleri:[] },
  { ad:"Diabolo Menthe", kal:52, pro:0, karb:13, yag:0, lif:0, sod:8, por:250, kat:"Boissons", ulke:"fr", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"limonade, sirop de menthe, E102, E133", katkiMaddeleri:[{kod:"E102",ad:"Tartrazine",tehlikeli:true,aciklama:"Peut causer hyperactivité chez les enfants."},{kod:"E133",ad:"Bleu brillant",tehlikeli:true,aciklama:"Colorant controversé."}] },
  { ad:"Darnes de Saumon FR", kal:208, pro:20, karb:0, yag:13, lif:0, sod:59, por:150, kat:"Poisson", ulke:"fr", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"saumon", katkiMaddeleri:[] },
  { ad:"Dolor (Pain d'Épices)", kal:325, pro:5.5, karb:66, yag:5, lif:2.5, sod:280, por:50, kat:"Biscuiterie", ulke:"fr", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"seigle, miel, épices, E500", katkiMaddeleri:[{kod:"E500",ad:"Carbonate de sodium",tehlikeli:false,aciklama:"Levure chimique."}] },
  { ad:"Dessert de Fromage Blanc", kal:98, pro:7.5, karb:8, yag:4, lif:0, sod:55, por:100, kat:"Produits Laitiers", ulke:"fr", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"fromage blanc, crème, cultures", katkiMaddeleri:[] },
  { ad:"Dinde Farcie FR", kal:195, pro:24, karb:6, yag:9, lif:1, sod:480, por:200, kat:"Volaille", ulke:"fr", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"dinde, farce, herbes, sel, poivre", katkiMaddeleri:[] },
  { ad:"Douce de Montagne", kal:358, pro:22, karb:0.5, yag:30, lif:0, sod:620, por:30, kat:"Fromages", ulke:"fr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"lait de montagne, sel, présure", katkiMaddeleri:[] },
  // IT +10
  { ad:"Ditaloni Rigati", kal:353, pro:12, karb:71, yag:1.5, lif:2.7, sod:3, por:100, kat:"Pasta", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"semolino di grano duro", katkiMaddeleri:[] },
  { ad:"Dolce Vita Tiramisù", kal:395, pro:7, karb:38, yag:25, lif:0.5, sod:185, por:100, kat:"Dolci", ulke:"it", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"mascarpone, uova, savoiardi, caffè, zucchero, cacao", katkiMaddeleri:[] },
  { ad:"Divina Commedia Pizza", kal:265, pro:12, karb:38, yag:8, lif:2.5, sod:580, por:200, kat:"Pizza", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"farina, pomodoro, mozzarella, funghi, prosciutto, lievito", katkiMaddeleri:[] },
  { ad:"Dentice al Forno", kal:115, pro:22, karb:0, yag:3.5, lif:0, sod:85, por:200, kat:"Pesce", ulke:"it", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"dentice, olio, limone, prezzemolo, aglio, sale", katkiMaddeleri:[] },
  { ad:"Dolce Latte IT", kal:335, pro:20, karb:0.5, yag:28, lif:0, sod:1250, por:30, kat:"Formaggi", ulke:"it", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"latte, caglio, sale, muffe", katkiMaddeleri:[] },
  { ad:"Datterini Pomodori", kal:20, pro:1, karb:4.5, yag:0.2, lif:1.2, sod:5, por:100, kat:"Verdure", ulke:"it", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"datterini", katkiMaddeleri:[] },
  { ad:"Dolci Siciliani Marzapane", kal:478, pro:10, karb:62, yag:23, lif:3, sod:88, por:30, kat:"Dolci", ulke:"it", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"mandorle, zucchero, acqua", katkiMaddeleri:[] },
  { ad:"Ditalini con Fagioli", kal:165, pro:8.5, karb:28, yag:3, lif:6, sod:380, por:250, kat:"Piatto Unico", ulke:"it", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"ditalini, fagioli, aglio, rosmarino, olio, sale", katkiMaddeleri:[] },
  { ad:"Dolce di Castagne", kal:248, pro:3, karb:55, yag:3, lif:5, sod:85, por:100, kat:"Dolci", ulke:"it", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"castagne, zucchero, burro, vaniglia", katkiMaddeleri:[] },
  { ad:"Degustazione di Formaggi", kal:380, pro:24, karb:0.5, yag:32, lif:0, sod:660, por:30, kat:"Formaggi", ulke:"it", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"parmigiano, pecorino, grana padano, sale", katkiMaddeleri:[] },
  // ES +11
  { ad:"Donut Español", kal:398, pro:6, karb:52, yag:20, lif:1.5, sod:280, por:60, kat:"Bolleria", ulke:"es", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"harina, azúcar, huevos, mantequilla, levadura, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono y diglicéridos",tehlikeli:false,aciklama:"Emulsionante."}] },
  { ad:"Dátiles con Bacon", kal:185, pro:6, karb:28, yag:7, lif:2.5, sod:480, por:50, kat:"Tapas", ulke:"es", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"dátiles, bacon, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito sódico",tehlikeli:true,aciklama:"En altas dosis puede ser cancerígeno."}] },
  { ad:"Dorada al Horno", kal:125, pro:22, karb:0, yag:4.5, lif:0, sod:380, por:200, kat:"Pescado", ulke:"es", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"dorada, ajos, aceite, limón, perejil, sal", katkiMaddeleri:[] },
  { ad:"Dulce de Membrillo", kal:290, pro:0.4, karb:73, yag:0.1, lif:2, sod:8, por:30, kat:"Dulces", ulke:"es", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"membrillo, azúcar, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pectinas",tehlikeli:false,aciklama:"Gelificante."},{kod:"E330",ad:"Ácido cítrico",tehlikeli:false,aciklama:"Regulador de acidez."}] },
  { ad:"Drontes (Alubias Blancas)", kal:135, pro:9, karb:22, yag:0.5, lif:7, sod:5, por:100, kat:"Legumbres", ulke:"es", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"alubias blancas", katkiMaddeleri:[] },
  { ad:"Diablo Salsa Picante", kal:45, pro:1.5, karb:9, yag:0.5, lif:2, sod:980, por:30, kat:"Salsas", ulke:"es", tokPuan:10, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"chile, tomate, vinagre, ajo, sal, E330", katkiMaddeleri:[{kod:"E330",ad:"Ácido cítrico",tehlikeli:false,aciklama:"Regulador de acidez."}] },
  { ad:"Dorada Salvaje", kal:112, pro:20, karb:0, yag:3.8, lif:0, sod:80, por:200, kat:"Pescado", ulke:"es", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"dorada salvaje", katkiMaddeleri:[] },
  { ad:"Duelos y Quebrantos", kal:295, pro:22, karb:2, yag:22, lif:0, sod:680, por:200, kat:"Plato Principal", ulke:"es", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:3, icerik:"huevos, sesos, chorizo, jamón, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito sódico",tehlikeli:true,aciklama:"En altas dosis puede ser cancerígeno."}] },
  { ad:"Deja de Cerdo", kal:225, pro:20, karb:0, yag:16, lif:0, sod:72, por:100, kat:"Carne", ulke:"es", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"aguja de cerdo", katkiMaddeleri:[] },
  { ad:"Dried Chorizo ES", kal:415, pro:22, karb:2, yag:36, lif:0, sod:1680, por:30, kat:"Embutidos", ulke:"es", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"carne de cerdo, pimentón, sal, ajo, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito sódico",tehlikeli:true,aciklama:"En altas dosis puede ser cancerígeno."}] },
  { ad:"Dessert de Arroz con Leche", kal:98, pro:3.2, karb:15, yag:3, lif:0, sod:62, por:120, kat:"Postres", ulke:"es", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"arroz, leche, azúcar, canela, E440", katkiMaddeleri:[{kod:"E440",ad:"Pectinas",tehlikeli:false,aciklama:"Gelificante."}] },
  // EL +10
  { ad:"Διπλοτυρόπιτα", adLatin:"Diplotiropitta", kal:335, pro:14, karb:32, yag:18, lif:1.5, sod:680, por:150, kat:"Pites", ulke:"el", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"filo, feta, graviera, avga, voutiro", katkiMaddeleri:[] },
  { ad:"Ντολμαδάκια Γιαλαντζί", adLatin:"Dolmadakia Gialantzi", kal:145, pro:3, karb:20, yag:6, lif:2.5, sod:280, por:100, kat:"Mezedes", ulke:"el", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"ambelofylla, rizi, kremydaki, diosmos, elaiolado, lemoni", katkiMaddeleri:[] },
  { ad:"Δίγαστρο", adLatin:"Digastro", kal:225, pro:18, karb:8, yag:14, lif:1, sod:480, por:200, kat:"Kreas", ulke:"el", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"arnaki, skordho, lemoni, rigani, elaiolado", katkiMaddeleri:[] },
  { ad:"Δροσερή Φρουτοσαλάτα", adLatin:"Droseri Froutosalata", kal:58, pro:0.8, karb:14, yag:0.2, lif:2.5, sod:3, por:150, kat:"Frouta", ulke:"el", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"peponi, karpouzi, stafoilia, portokali, lemoni", katkiMaddeleri:[] },
  { ad:"Διπλόμα Παγωτό", adLatin:"Diploma Pagoto", kal:225, pro:4, karb:28, yag:12, lif:0.3, sod:80, por:100, kat:"Pagota", ulke:"el", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"gala, krema, zachari, vanilia, E471, E410", katkiMaddeleri:[{kod:"E471",ad:"Μόνο και διγλυκερίδια",tehlikeli:false,aciklama:"Γαλακτωματοποιητής."},{kod:"E410",ad:"Άλευρο Χαρουπιάς",tehlikeli:false,aciklama:"Παχυντικό."}] },
  { ad:"Διφύλλα Ζύμη", adLatin:"Difilla Zimi", kal:385, pro:7, karb:48, yag:20, lif:2, sod:280, por:80, kat:"Glika", ulke:"el", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"aleuron, voutiro, zachari, avga", katkiMaddeleri:[] },
  { ad:"Ντάκος", adLatin:"Dakos", kal:248, pro:8, karb:32, yag:12, lif:3, sod:480, por:150, kat:"Mezedes", ulke:"el", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"kouloura barley, tomates, feta, elaiolado, rigani", katkiMaddeleri:[] },
  { ad:"Δυόσμος Ροφήμα", adLatin:"Dyosmos Rofima", kal:2, pro:0.1, karb:0.3, yag:0, lif:0, sod:1, por:200, kat:"Pota", ulke:"el", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"dyosmos, nero", katkiMaddeleri:[] },
  { ad:"Δύναμη Σαλάτα", adLatin:"Dynamis Salata", kal:95, pro:6.5, karb:8, yag:5, lif:3.5, sod:280, por:200, kat:"Salates", ulke:"el", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"roka, spinaki, avga, feta, elaiolado, aceto balsamico", katkiMaddeleri:[] },
  { ad:"Δάκτυλα Κυρίας", adLatin:"Daktylarakia Kyrias", kal:398, pro:6, karb:52, yag:20, lif:2, sod:88, por:30, kat:"Glika", ulke:"el", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"filo, karidia, zachari, kanela, voutiro", katkiMaddeleri:[] },


  // ── D EK 3 ── (DA, NO, SV, FI, NL, BE, AT, PL, CS, HU, RO, HR, PT, EN +10'ar)
  // DA +10
  { ad:"Dild Kartofler", kal:105, pro:2.5, karb:18, yag:3, lif:2, sod:280, por:200, kat:"Tilbehor", ulke:"da", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"kartofler, dild, smor, salt", katkiMaddeleri:[] },
  { ad:"Dansk Remoulade", kal:385, pro:1.5, karb:12, yag:38, lif:1.5, sod:680, por:30, kat:"Tilbehor", ulke:"da", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"mayonnaise, agurk, karry, E211", katkiMaddeleri:[{kod:"E211",ad:"Natriumbenzoat",tehlikeli:false,aciklama:"Konserveringsmiddel."}] },
  { ad:"Donuts DA", kal:398, pro:6, karb:52, yag:20, lif:1.5, sod:280, por:60, kat:"Bagvaerk", ulke:"da", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"hvedemel, sukker, aeg, smor, gær, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono og diglycerider",tehlikeli:false,aciklama:"Emulgator."}] },
  // NO +10
  { ad:"Dill-marinert Laks NO", kal:208, pro:20, karb:2, yag:13, lif:0, sod:480, por:100, kat:"Fisk", ulke:"no", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"laks, dill, sukker, salt", katkiMaddeleri:[] },
  { ad:"Drømmekage NO", kal:385, pro:5.5, karb:52, yag:18, lif:1.5, sod:185, por:80, kat:"Brod", ulke:"no", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"hvetemel, sukker, smør, egg, kokos, gjær", katkiMaddeleri:[] },
  { ad:"Dugg NO Mineralvann", kal:0, pro:0, karb:0, yag:0, lif:0, sod:10, por:500, kat:"Drikkevarer", ulke:"no", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"naturlig mineralvann", katkiMaddeleri:[] },
  { ad:"Dyrekjøtt Gryte NO", kal:185, pro:22, karb:6, yag:9, lif:2, sod:480, por:300, kat:"Gryteretter", ulke:"no", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"elgkjøtt, rotsgrønnsaker, rødvin, salt", katkiMaddeleri:[] },
  { ad:"Daim Sjokolade", marka:"Daim", kal:520, pro:4, karb:62, yag:28, lif:1, sod:185, por:28, kat:"Sjokolade", ulke:"no", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"sukker, karamell, smor, kakao, E322, E476", katkiMaddeleri:[{kod:"E322",ad:"Lecitiner",tehlikeli:false,aciklama:"Emulgator."},{kod:"E476",ad:"Polyglyserol",tehlikeli:false,aciklama:"Emulgator."}] },
  { ad:"Drue NO", kal:67, pro:0.6, karb:17, yag:0.4, lif:0.9, sod:2, por:100, kat:"Frukt", ulke:"no", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"druer", katkiMaddeleri:[] },
  { ad:"Dampet Torsk NO", kal:82, pro:18, karb:0, yag:0.7, lif:0, sod:55, por:150, kat:"Fisk", ulke:"no", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"torsk, salt", katkiMaddeleri:[] },
  { ad:"Duvetinbrød NO", kal:265, pro:9.5, karb:48, yag:4, lif:4, sod:480, por:100, kat:"Brod", ulke:"no", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"hvetemel, havre, vann, gjær, salt", katkiMaddeleri:[] },
  { ad:"Dovre Ost NO", marka:"Dovre", kal:355, pro:24, karb:0.5, yag:29, lif:0, sod:650, por:30, kat:"Meieri", ulke:"no", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"melk, salt, løpe", katkiMaddeleri:[] },
  // SV +10
  { ad:"Dillmarinerad Sill SV", kal:168, pro:18, karb:2, yag:10, lif:0, sod:1200, por:80, kat:"Fisk", ulke:"sv", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"sill, dill, ättika, socker, salt, E220", katkiMaddeleri:[{kod:"E220",ad:"Svaveldioxid",tehlikeli:true,aciklama:"Kan orsaka allergiska reaktioner."}] },
  { ad:"Drömkaka SV", kal:385, pro:5.5, karb:52, yag:18, lif:1.5, sod:185, por:80, kat:"Kaka", ulke:"sv", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"vetemjöl, smör, socker, ägg, kokos, bakpulver", katkiMaddeleri:[] },
  { ad:"Drickyoghurt SV", kal:48, pro:3.5, karb:5.5, yag:1.5, lif:0, sod:46, por:200, kat:"Mejeri", ulke:"sv", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mjölk, kulturer, frukt, E440", katkiMaddeleri:[{kod:"E440",ad:"Pektiner",tehlikeli:false,aciklama:"Geliermittel."}] },
  { ad:"Daim SV", marka:"Daim", kal:520, pro:4, karb:62, yag:28, lif:1, sod:185, por:28, kat:"Godis", ulke:"sv", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"socker, karamell, smör, kakao, E322, E476", katkiMaddeleri:[{kod:"E322",ad:"Lecitiner",tehlikeli:false,aciklama:"Emulgator."},{kod:"E476",ad:"Polyglyserol",tehlikeli:false,aciklama:"Emulgator."}] },
  { ad:"Druvjuice SV", kal:68, pro:0.3, karb:17, yag:0, lif:0, sod:5, por:200, kat:"Drycker", ulke:"sv", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"druvjuice, E330", katkiMaddeleri:[{kod:"E330",ad:"Citronsyra",tehlikeli:false,aciklama:"Surhetsreglering."}] },
  { ad:"Dubbel Grädde SV", kal:465, pro:2, karb:3, yag:48, lif:0, sod:38, por:30, kat:"Mejeri", ulke:"sv", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"grädde", katkiMaddeleri:[] },
  { ad:"Danbo Ost SV", kal:355, pro:24, karb:0.5, yag:29, lif:0, sod:650, por:30, kat:"Mejeri", ulke:"sv", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mjölk, salt, löpe", katkiMaddeleri:[] },
  { ad:"Dunderhonung SV", kal:304, pro:0.3, karb:82, yag:0, lif:0, sod:4, por:20, kat:"Sotningsmedel", ulke:"sv", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"honung", katkiMaddeleri:[] },
  { ad:"Dampkokt Fisk SV", kal:95, pro:19, karb:0, yag:1.8, lif:0, sod:62, por:150, kat:"Fisk", ulke:"sv", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"vitfisk, salt", katkiMaddeleri:[] },
  // FI +10
  { ad:"Dilliperanat FI", kal:105, pro:2.5, karb:18, yag:3, lif:2, sod:280, por:200, kat:"Lisakkeet", ulke:"fi", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"perunat, tilli, voi, suola", katkiMaddeleri:[] },
  { ad:"Duona FI (Ruisleipä)", kal:215, pro:7.5, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Leipa", ulke:"fi", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ruisjauho, vesi, hapanjuuri, suola", katkiMaddeleri:[] },
  // NL +10
  { ad:"Doperwtjes NL", kal:81, pro:5.4, karb:14, yag:0.4, lif:5.1, sod:5, por:100, kat:"Groente", ulke:"nl", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"doperwten, water, zout", katkiMaddeleri:[] },
  { ad:"Droge Worst NL", kal:395, pro:20, karb:2, yag:35, lif:0, sod:1580, por:30, kat:"Vleeswaren", ulke:"nl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"varkensvlees, zout, E250, kruiden", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitriet",tehlikeli:true,aciklama:"In hoge doses kankerverwekkend."}] },
  { ad:"Drooggist Thee NL", kal:2, pro:0.1, karb:0.3, yag:0, lif:0, sod:1, por:200, kat:"Dranken", ulke:"nl", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"theebladen, water", katkiMaddeleri:[] },
  { ad:"Diepvriesgroenten NL", kal:42, pro:2.5, karb:7, yag:0.3, lif:4, sod:28, por:100, kat:"Groente", ulke:"nl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"groenten mix", katkiMaddeleri:[] },
  { ad:"Dubbele Room NL", kal:465, pro:2, karb:3, yag:48, lif:0, sod:38, por:30, kat:"Zuivel", ulke:"nl", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"room", katkiMaddeleri:[] },
  { ad:"Dunkel Bier NL", kal:48, pro:0.4, karb:4.8, yag:0, lif:0, sod:10, por:330, kat:"Dranken", ulke:"nl", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"water, mout, hop, gist", katkiMaddeleri:[] },
  // BE +10
  { ad:"Dubbele Espresso BE", kal:5, pro:0.3, karb:0.6, yag:0.1, lif:0, sod:4, por:60, kat:"Koffie", ulke:"be", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"koffiebonen, water", katkiMaddeleri:[] },
  { ad:"Diksmuids Ham BE", kal:148, pro:20, karb:1.5, yag:7, lif:0, sod:1150, por:50, kat:"Vleeswaren", ulke:"be", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"varkens, water, zout, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitriet",tehlikeli:true,aciklama:"In hoge doses kankerverwekkend."},{kod:"E451",ad:"Trifosfaten",tehlikeli:false,aciklama:"Vochtbehouder."}] },
  // AT +10
  // PL +10
  { ad:"Duszona Wołowina PL", adLatin:"Duszona Wolowina PL", kal:225, pro:22, karb:5, yag:13, lif:1.5, sod:480, por:200, kat:"Mieso", ulke:"pl", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"wołowina, marchewka, pietruszka, sól, pieprz", katkiMaddeleri:[] },
  { ad:"Drożdżowe Bułki PL", adLatin:"Drozdzowe Bulki PL", kal:285, pro:7, karb:50, yag:8, lif:2, sod:280, por:80, kat:"Pieczywo Slodkie", ulke:"pl", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"mąka, drożdże, mleko, jajka, masło, cukier", katkiMaddeleri:[] },
  { ad:"Dorsz Filet PL", adLatin:"Dorsz Filet PL", kal:82, pro:18, karb:0, yag:0.7, lif:0, sod:55, por:150, kat:"Ryby", ulke:"pl", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"filet z dorsza", katkiMaddeleri:[] },
  { ad:"Dynia Zupa PL", adLatin:"Dynia Zupa PL", kal:72, pro:1.5, karb:10, yag:3, lif:2, sod:480, por:300, kat:"Zupy", ulke:"pl", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"dynia, cebula, czosnek, imbir, śmietana, sol", katkiMaddeleri:[] },
  { ad:"Danie z Kapusty PL", adLatin:"Danie z Kapusty PL", kal:88, pro:2.5, karb:12, yag:3.5, lif:4.5, sod:380, por:200, kat:"Warzywa", ulke:"pl", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"kapusta, cebula, boczek, sól, majeranek", katkiMaddeleri:[] },
  { ad:"Duszony Schab PL", adLatin:"Duszony Schab PL", kal:245, pro:24, karb:3, yag:15, lif:0.5, sod:480, por:150, kat:"Mieso", ulke:"pl", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"schab, cebula, czosnek, śmietana, sól, pieprz", katkiMaddeleri:[] },
  // CS +10
  { ad:"Dýňová Polévka", adLatin:"Dynova Polevka", kal:72, pro:1.5, karb:10, yag:3, lif:2, sod:480, por:300, kat:"Polevky", ulke:"cs", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"dyne, cibule, cesnek, zazvor, smetana, sul", katkiMaddeleri:[] },
  { ad:"Dinkový Chleb", adLatin:"Dinkovy Chleb", kal:228, pro:9, karb:42, yag:2.5, lif:7, sod:480, por:100, kat:"Pecivo", ulke:"cs", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"špalda mouka, voda, kvásek, sůl", katkiMaddeleri:[] },
  { ad:"Dýně Zapečená", adLatin:"Dyne Zapecena", kal:88, pro:1.5, karb:18, yag:2, lif:2.5, sod:180, por:200, kat:"Zelenina", ulke:"cs", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"dyne, cibule, cesnek, olivovy olej, sůl", katkiMaddeleri:[] },
  { ad:"Domácí Lívance", adLatin:"Domaci Livance", kal:215, pro:7, karb:32, yag:8, lif:1.5, sod:185, por:100, kat:"Mouky", ulke:"cs", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"mouka, tvaroh, vejce, mléko, olej, sůl", katkiMaddeleri:[] },
  { ad:"Dýňový Krém CS", adLatin:"Dynovy Krem CS", kal:72, pro:1.5, karb:10, yag:3, lif:2, sod:380, por:300, kat:"Polevky", ulke:"cs", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"dyne, smetana, cesnek, ingber, sůl", katkiMaddeleri:[] },
  // HU +10
  { ad:"Disznótoros HU", adLatin:"Disznotoros HU", kal:348, pro:18, karb:5, yag:30, lif:0.5, sod:1050, por:200, kat:"Husaruk", ulke:"hu", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:2.5, icerik:"sertéshús, vér, belsőségek, sül, só, E250", katkiMaddeleri:[{kod:"E250",ad:"Nátrium-nitrit",tehlikeli:true,aciklama:"Nagyobb adagban karcinogén."}] },
  { ad:"Diós Metélt", adLatin:"Dios Metelt", kal:335, pro:10, karb:52, yag:12, lif:3.5, sod:185, por:150, kat:"Tesztak", ulke:"hu", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"metélt tészta, dió, porcukor, fahéj, vaj", katkiMaddeleri:[] },
  { ad:"Dinnye HU (Görögdinnye)", adLatin:"Dinnye HU", kal:30, pro:0.6, karb:7.6, yag:0.2, lif:0.4, sod:1, por:100, kat:"Gyumolcsok", ulke:"hu", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"görögdinnye", katkiMaddeleri:[] },
  { ad:"Dobos Szelet HU", adLatin:"Dobos Szelet HU", kal:375, pro:6, karb:50, yag:18, lif:1.5, sod:185, por:80, kat:"Sutemeny", ulke:"hu", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"piskóta, csokoládékrém, karamell réteg", katkiMaddeleri:[] },
  { ad:"Dinnyelé HU", adLatin:"Dinnyele HU", kal:30, pro:0.5, karb:7.5, yag:0.1, lif:0.3, sod:1, por:200, kat:"Italok", ulke:"hu", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"görögdinnye, citromlé", katkiMaddeleri:[] },
  // RO +10
  { ad:"Drob de Porc RO", adLatin:"Drob de Porc RO", kal:225, pro:17, karb:5, yag:16, lif:0.5, sod:480, por:150, kat:"Mancare", ulke:"ro", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"maruntaie porc, oua, ceapa, marar, sare", katkiMaddeleri:[] },
  { ad:"Dovleac Copt RO", adLatin:"Dovleac Copt RO", kal:45, pro:1, karb:10, yag:0.1, lif:2, sod:4, por:200, kat:"Legume", ulke:"ro", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"dovleac, miere, scortisoara", katkiMaddeleri:[] },
  { ad:"Droburi de Pui RO", adLatin:"Droburi de Pui RO", kal:172, pro:24, karb:2.5, yag:7, lif:0, sod:68, por:100, kat:"Carne", ulke:"ro", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"ficat pui, inima, rinichi, sare", katkiMaddeleri:[] },
  { ad:"Dulceaţă de Caise RO", adLatin:"Dulceata de Caise RO", kal:270, pro:0.4, karb:68, yag:0.1, lif:1, sod:8, por:20, kat:"Dulciuri", ulke:"ro", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"caise, zahar, suc de lamaie, E440", katkiMaddeleri:[{kod:"E440",ad:"Pectine",tehlikeli:false,aciklama:"Agent de gelificare."}] },
  { ad:"Dulceaţă de Vișine RO", adLatin:"Dulceata de Visine RO", kal:258, pro:0.4, karb:65, yag:0, lif:0.8, sod:6, por:20, kat:"Dulciuri", ulke:"ro", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"visine, zahar, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pectine",tehlikeli:false,aciklama:"Agent de gelificare."},{kod:"E330",ad:"Acid citric",tehlikeli:false,aciklama:"Regulator de aciditate."}] },
  // HR +10
  { ad:"Dalmatinski Brodet HR", adLatin:"Dalmatinski Brodet HR", kal:145, pro:18, karb:6, yag:5.5, lif:1.5, sod:580, por:300, kat:"Jela", ulke:"hr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"mješana riba, luk, maslinovo ulje, rajčica, vino", katkiMaddeleri:[] },
  { ad:"Dinja HR (Lubenica)", adLatin:"Dinja HR Lubenica", kal:30, pro:0.6, karb:7.6, yag:0.2, lif:0.4, sod:1, por:100, kat:"Voce", ulke:"hr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"lubenica", katkiMaddeleri:[] },
  { ad:"Domaća Šunka HR", adLatin:"Domaca Sunka HR", kal:148, pro:20, karb:1.5, yag:7, lif:0, sod:1150, por:50, kat:"Suhe Mesne Preradjevine", ulke:"hr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"svinjski but, sol, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natrijev nitrit",tehlikeli:true,aciklama:"U visokim dozama može biti kancerogen."},{kod:"E451",ad:"Trifosfati",tehlikeli:false,aciklama:"Zadržavač vlage."}] },
  { ad:"Dalmatinska Pita HR", adLatin:"Dalmatinska Pita HR", kal:285, pro:7, karb:44, yag:11, lif:2, sod:280, por:100, kat:"Slatkisi", ulke:"hr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"filo tijesto, bademi, med, naranča, secer", katkiMaddeleri:[] },
  { ad:"Domaći Džem HR", adLatin:"Domaci Dzem HR", kal:250, pro:0.4, karb:63, yag:0, lif:1.5, sod:8, por:20, kat:"Namazi", ulke:"hr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"voce, secer, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektini",tehlikeli:false,aciklama:"Sredstvo za zeliranje."},{kod:"E330",ad:"Limunska kiselina",tehlikeli:false,aciklama:"Regulator kiselosti."}] },
  { ad:"Dimljeni Losos HR", adLatin:"Dimljeni Losos HR", kal:208, pro:20, karb:0, yag:13, lif:0, sod:1200, por:80, kat:"Riba", ulke:"hr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"losos, sol, dim", katkiMaddeleri:[] },
  { ad:"Domaća Rakija HR", adLatin:"Domaca Rakija HR", kal:230, pro:0, karb:0, yag:0, lif:0, sod:0, por:40, kat:"Pica", ulke:"hr", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:1.5, icerik:"voće, alkohol", katkiMaddeleri:[] },
  { ad:"Dalmatinska Kaštradina HR", adLatin:"Dalmatinska Kastradina HR", kal:215, pro:22, karb:0, yag:14, lif:0, sod:1480, por:100, kat:"Meso", ulke:"hr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"ovčji but, sol, dim", katkiMaddeleri:[] },
  // PT +10
  { ad:"Demi-sec Vinho PT", adLatin:"Demi-sec Vinho PT", kal:82, pro:0.1, karb:6, yag:0, lif:0, sod:6, por:150, kat:"Bebidas", ulke:"pt", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"uvas, E220", katkiMaddeleri:[{kod:"E220",ad:"Dióxido de enxofre",tehlikeli:true,aciklama:"Pode causar reações alérgicas."}] },
  { ad:"Doce de Figo PT", adLatin:"Doce de Figo PT", kal:260, pro:0.5, karb:66, yag:0.1, lif:2, sod:6, por:20, kat:"Doces", ulke:"pt", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"figos, açúcar, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pectinas",tehlikeli:false,aciklama:"Agente gelificante."},{kod:"E330",ad:"Ácido cítrico",tehlikeli:false,aciklama:"Regulador de acidez."}] },
  { ad:"Dourada no Forno PT", adLatin:"Dourada no Forno PT", kal:125, pro:22, karb:0, yag:4.5, lif:0, sod:380, por:200, kat:"Peixe", ulke:"pt", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"dourada, azeite, limão, alho, sal", katkiMaddeleri:[] },
  { ad:"Dobrada com Feijão PT", adLatin:"Dobrada com Feijao PT", kal:165, pro:14, karb:12, yag:8, lif:5, sod:620, por:300, kat:"Prato", ulke:"pt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"dobrada, feijao branco, chourico, cenoura, cebola", katkiMaddeleri:[] },
  { ad:"Dança dos Sabores PT", adLatin:"Danca dos Sabores PT", kal:265, pro:12, karb:38, yag:9, lif:2.5, sod:480, por:200, kat:"Prato", ulke:"pt", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"peixe, legumes, azeite, ervas, sal", katkiMaddeleri:[] },
  { ad:"Dória Bolachas PT", marka:"Doria", kal:448, pro:7, karb:68, yag:18, lif:3, sod:380, por:30, kat:"Bolachas", ulke:"pt", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"farinha, açúcar, óleo vegetal, sal, E471, E322", katkiMaddeleri:[{kod:"E471",ad:"Mono e diglicéridos",tehlikeli:false,aciklama:"Emulsionante."},{kod:"E322",ad:"Lecitinas",tehlikeli:false,aciklama:"Emulsionante."}] },
  // EN +10
  { ad:"Dressed Crab EN", kal:115, pro:18, karb:2, yag:4.5, lif:0, sod:320, por:100, kat:"Seafood", ulke:"en", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"brown and white crab meat, lemon juice, mustard", katkiMaddeleri:[] },
  { ad:"Daim EN", marka:"Daim", kal:520, pro:4, karb:62, yag:28, lif:1, sod:185, por:28, kat:"Confectionery", ulke:"en", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"sugar, caramel, butter, cocoa, E322, E476", katkiMaddeleri:[{kod:"E322",ad:"Lecithins",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E476",ad:"Polyglycerol",tehlikeli:false,aciklama:"Emulsifier."}] },
  { ad:"Devonshire Scone EN", kal:365, pro:7, karb:52, yag:16, lif:2, sod:380, por:80, kat:"Baked Goods", ulke:"en", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"flour, butter, milk, sugar, eggs, E503", katkiMaddeleri:[{kod:"E503",ad:"Ammonium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },
  { ad:"Dinner Roll EN", kal:298, pro:8, karb:52, yag:6, lif:2.5, sod:480, por:60, kat:"Bread", ulke:"en", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"wheat flour, water, yeast, salt, butter, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."}] },
  { ad:"Dorset Knob EN", kal:398, pro:8, karb:72, yag:9, lif:3, sod:480, por:30, kat:"Biscuits", ulke:"en", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"wheat flour, butter, sugar, yeast, salt", katkiMaddeleri:[] },
  { ad:"Double Gloucester EN", kal:408, pro:24, karb:0.1, yag:35, lif:0, sod:670, por:30, kat:"Dairy", ulke:"en", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"milk, salt, starter culture, rennet, E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Colouring."}] },
  { ad:"Devilled Kidneys EN", kal:165, pro:22, karb:4, yag:7, lif:0.5, sod:480, por:150, kat:"Dish", ulke:"en", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"lamb kidneys, mustard, Worcestershire sauce, butter, cream", katkiMaddeleri:[] },
  { ad:"Dhal (Red Lentil) EN", kal:98, pro:5.5, karb:16, yag:2.5, lif:4.5, sod:480, por:250, kat:"Dish", ulke:"en", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"red lentils, onion, garlic, turmeric, cumin, tomato", katkiMaddeleri:[] },
  { ad:"Dripping Toast EN", kal:285, pro:6, karb:32, yag:15, lif:2, sod:580, por:100, kat:"Dish", ulke:"en", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"bread, beef dripping, salt", katkiMaddeleri:[] },
  { ad:"Dairylea Triangles EN", marka:"Dairylea", kal:255, pro:12, karb:8, yag:20, lif:0, sod:780, por:30, kat:"Dairy", ulke:"en", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"cheese, milk, E452, E339, E331", katkiMaddeleri:[{kod:"E452",ad:"Polyphosphates",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E339",ad:"Sodium phosphates",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E331",ad:"Sodium citrates",tehlikeli:false,aciklama:"Acidity regulator."}] },


  // ── GERÇEK EKSİKLER ──
  { ad:"Drop NL", marka:"Venco", kal:330, pro:4, karb:78, yag:0.5, lif:0, sod:680, por:30, kat:"Snoep", ulke:"nl", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:1.5, icerik:"suiker, glucosestroop, zout, E415, E904, gelatine, E122", katkiMaddeleri:[{kod:"E415",ad:"Xanthaangom",tehlikeli:false,aciklama:"Verdikkingsmiddel."},{kod:"E904",ad:"Schellak",tehlikeli:false,aciklama:"Glansmiddel."},{kod:"E122",ad:"Azorubine",tehlikeli:true,aciklama:"Kan hyperactiviteit veroorzaken bij kinderen."}] },
  { ad:"Dansk Leverpostej", kal:285, pro:11, karb:6, yag:25, lif:0.5, sod:920, por:30, kat:"Smorrebrod", ulke:"da", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"svinelever, svinefedt, løg, salt, E250, E451, krydderier", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"Konserveringsmiddel."},{kod:"E451",ad:"Trifosfater",tehlikeli:false,aciklama:"Fugtbevarende middel."}] },
  { ad:"Donauwelle", kal:368, pro:5.5, karb:48, yag:18, lif:1.5, sod:185, por:80, kat:"Kuchen", ulkeler:["de","at"], tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"Weizenmehl, Butter, Zucker, Eier, Kakao, Kirschen, Sahne", katkiMaddeleri:[] },

  // ══ BALTİK (LV/ET/LT) A+B+C+D ══
  // ══════════════════════════════════════════════════════
  // A HARFİ — BALTİK
  // ══════════════════════════════════════════════════════

  // Paylaşılan (zaten AB'de var, A seed'de eklendi — burada tekrar yok)

  // ── LV (Letonya) ──
  { ad:"Ābolu Dārzenis", adLatin:"Abolu Darzenis", kal:52, pro:0.3, karb:14, yag:0.2, lif:2.4, sod:1, por:100, kat:"Augļi", ulke:"lv", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"ābols", katkiMaddeleri:[] },
  { ad:"Ābolu Sula", adLatin:"Abolu Sula", kal:44, pro:0.4, karb:10, yag:0.1, lif:0.2, sod:3, por:200, kat:"Dzērieni", ulke:"lv", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"ābolu sula", katkiMaddeleri:[] },
  { ad:"Aukstā Zupa", adLatin:"Auksta Zupa", kal:65, pro:2.5, karb:8, yag:2.5, lif:1.5, sod:380, por:300, kat:"Zupi", ulke:"lv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"kefīrs, bietes, gurķis, dilles, olas", katkiMaddeleri:[] },
  { ad:"Alus Valmiermuiža", adLatin:"Alus Valmiermuiza", marka:"Valmiermuiža", kal:42, pro:0.4, karb:4.2, yag:0, lif:0, sod:8, por:330, kat:"Dzērieni", ulke:"lv", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"ūdens, iesals, apiņi, raugs", katkiMaddeleri:[] },
  { ad:"Ābolu Ievārījums LV", adLatin:"Abolu Ievarijums LV", kal:248, pro:0.3, karb:62, yag:0, lif:1.5, sod:6, por:20, kat:"Ievārījumi", ulke:"lv", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"āboli, cukurs, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektīns",tehlikeli:false,aciklama:"Želejviela."},{kod:"E330",ad:"Citronskābe",tehlikeli:false,aciklama:"Skābes regulators."}] },

  // ── ET (Estonya) ──
  { ad:"Ahjukartuliid", adLatin:"Ahjukartuliid", kal:93, pro:2.5, karb:21, yag:0.1, lif:2.2, sod:6, por:150, kat:"Kartul", ulke:"et", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"kartul, õli, sool", katkiMaddeleri:[] },
  { ad:"Arõugapuder", adLatin:"Arogapuder", kal:75, pro:2.5, karb:13, yag:1.5, lif:2, sod:45, por:200, kat:"Hommikusook", ulke:"et", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"kaer, vesi, sool", katkiMaddeleri:[] },
  { ad:"A. Le Coq Õlu", adLatin:"A Le Coq Olu", marka:"A. Le Coq", kal:42, pro:0.4, karb:4.2, yag:0, lif:0, sod:8, por:330, kat:"Joogid", ulke:"et", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"vesi, linn, humal, pärm", katkiMaddeleri:[] },
  { ad:"Astelpaju Mahl", adLatin:"Astelpaju Mahl", kal:52, pro:0.4, karb:12, yag:0.5, lif:0.5, sod:2, por:200, kat:"Joogid", ulke:"et", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"astelpaju, vesi, E330", katkiMaddeleri:[{kod:"E330",ad:"Sidrunhape",tehlikeli:false,aciklama:"Happesuse regulaator."}] },
  { ad:"Ahjulõhe ET", adLatin:"Ahjulohe ET", kal:208, pro:20, karb:0, yag:13, lif:0, sod:59, por:150, kat:"Kala", ulke:"et", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lõhe, sool, sidrunimahl", katkiMaddeleri:[] },

  // ── LT (Litvanya) ──
  { ad:"Aguonų Pyragas", adLatin:"Aguonu Pyragas", kal:368, pro:7, karb:52, yag:16, lif:3, sod:185, por:100, kat:"Kepiniai", ulke:"lt", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"miltai, aguonos, cukrus, pienas, kiaušiniai, sviestas", katkiMaddeleri:[] },
  { ad:"Alus Svyturys", adLatin:"Alus Svyturys", marka:"Svyturys", kal:42, pro:0.4, karb:4.2, yag:0, lif:0, sod:8, por:330, kat:"Gėrimai", ulke:"lt", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"vanduo, salyklas, apyniai, mielės", katkiMaddeleri:[] },
  { ad:"Avižinė Košė LT", adLatin:"Avizine Kose LT", kal:389, pro:17, karb:66, yag:7, lif:11, sod:6, por:45, kat:"Pusryčiai", ulke:"lt", tokPuan:82, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"avižų dribsniai", katkiMaddeleri:[] },
  { ad:"Aštrūs Agurkai LT", adLatin:"Astrūs Agurkai LT", kal:15, pro:0.7, karb:3.6, yag:0.1, lif:0.5, sod:680, por:50, kat:"Konservai", ulke:"lt", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"agurkai, actas, druska, česnakai, krapai, E260", katkiMaddeleri:[{kod:"E260",ad:"Acto rūgštis",tehlikeli:false,aciklama:"Rūgštingumo reguliatorius."}] },
  { ad:"Alyva Rūgštynė LT", adLatin:"Alyva Rugstyne LT", kal:35, pro:2.2, karb:6, yag:0.5, lif:2.5, sod:12, por:100, kat:"Daržovės", ulke:"lt", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"rūgštynės", katkiMaddeleri:[] },

  // ══════════════════════════════════════════════════════
  // B HARFİ — BALTİK
  // ══════════════════════════════════════════════════════

  // ── LV ──
  { ad:"Biešu Zupa", adLatin:"Biesu Zupa", kal:55, pro:2, karb:9, yag:1.5, lif:2.5, sod:480, por:300, kat:"Zupi", ulke:"lv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"bietes, kartupeli, sīpoli, skābs krējums, dilles", katkiMaddeleri:[] },
  { ad:"Biezpiens LV", adLatin:"Biezpiens LV", kal:98, pro:11, karb:3.4, yag:4.3, lif:0, sod:364, por:100, kat:"Piena Produkti", ulke:"lv", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"piens, kultūras", katkiMaddeleri:[] },
  { ad:"Biezpiena Siers", adLatin:"Biezpiena Siers", kal:145, pro:12, karb:8, yag:7, lif:0, sod:420, por:50, kat:"Piena Produkti", ulke:"lv", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"biezpiens, cukurs, kviešu milti, olas", katkiMaddeleri:[] },
  { ad:"Baltais Maize LV", adLatin:"Baltais Maize LV", kal:265, pro:9, karb:52, yag:1.5, lif:2.5, sod:480, por:100, kat:"Maize", ulke:"lv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"kviešu milti, ūdens, raugs, sāls", katkiMaddeleri:[] },
  { ad:"Brūnais Maize LV", adLatin:"Brunais Maize LV", kal:218, pro:7.5, karb:40, yag:2, lif:7, sod:480, por:100, kat:"Maize", ulke:"lv", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"rudzu milti, kvasa mīkla, ūdens, sāls", katkiMaddeleri:[] },

  // ── ET ──
  { ad:"Borsš ET", adLatin:"Borss ET", kal:65, pro:2.5, karb:10, yag:2, lif:2.5, sod:480, por:300, kat:"Supid", ulke:"et", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"peet, kapsas, porgand, sibul, tomatid, hapukoor", katkiMaddeleri:[] },
  { ad:"Balyk ET (Suitsulõhe)", adLatin:"Balyk ET Suitsulõhe", kal:208, pro:20, karb:0, yag:13, lif:0, sod:1200, por:80, kat:"Kala", ulke:"et", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"lõhe, sool, suits", katkiMaddeleri:[] },
  { ad:"Brie ET", marka:"Arla", kal:334, pro:20, karb:0.5, yag:28, lif:0, sod:630, por:30, kat:"Juust", ulke:"et", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"piim, sool, laap, kultuurid", katkiMaddeleri:[] },
  { ad:"Banaanismuuti ET", adLatin:"Banaanismuuti ET", kal:98, pro:3, karb:18, yag:2, lif:1.5, sod:45, por:250, kat:"Joogid", ulke:"et", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"banaan, piim, jogurt", katkiMaddeleri:[] },

  // ── LT ──
  { ad:"Blynai LT", adLatin:"Blynai LT", kal:215, pro:7.5, karb:28, yag:9, lif:1.5, sod:285, por:100, kat:"Pusryčiai", ulke:"lt", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"miltai, kiaušiniai, pienas, sviestas, druska", katkiMaddeleri:[] },
  { ad:"Burokėlių Sriuba", adLatin:"Burokeniu Sriuba", kal:55, pro:2, karb:9, yag:1.5, lif:2.5, sod:480, por:300, kat:"Sriubos", ulke:"lt", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"burokėliai, bulvės, svogūnai, grietinė, krapai", katkiMaddeleri:[] },
  { ad:"Balandėliai LT", adLatin:"Balandeliai LT", kal:168, pro:11, karb:14, yag:8, lif:2, sod:420, por:200, kat:"Patiekalai", ulke:"lt", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"kopūstai, mėsa, ryžiai, morka, svogūnas", katkiMaddeleri:[] },
  { ad:"Baltoji Duona LT", adLatin:"Baltoji Duona LT", kal:265, pro:9, karb:52, yag:1.5, lif:2.5, sod:480, por:100, kat:"Duona", ulke:"lt", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"kviečių miltai, vanduo, mielės, druska", katkiMaddeleri:[] },
  { ad:"Burokinė Šaltibarščiai", adLatin:"Burokine Saltibarsciai", kal:65, pro:2.5, karb:8, yag:2.5, lif:1.5, sod:380, por:300, kat:"Sriubos", ulke:"lt", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"kefyras, burokėliai, agurkai, kiaušiniai, krapai", katkiMaddeleri:[] },

  // ══════════════════════════════════════════════════════
  // C HARFİ — BALTİK
  // ══════════════════════════════════════════════════════

  // ── LV ──
  { ad:"Cūkgaļas Karbonāde", adLatin:"Cukgalas Karbonade", kal:245, pro:25, karb:0, yag:16, lif:0, sod:72, por:150, kat:"Gaļa", ulke:"lv", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"cūkgaļas karbonāde, sāls, pipari", katkiMaddeleri:[] },
  { ad:"Cūkgaļas Desas LV", adLatin:"Cukgalas Desas LV", kal:330, pro:14, karb:3, yag:29, lif:0, sod:980, por:100, kat:"Gaļas Produkti", ulke:"lv", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"cūkgaļa, sāls, E250, E451, garšvielas", katkiMaddeleri:[{kod:"E250",ad:"Nātrija nitrīts",tehlikeli:true,aciklama:"Lielās devās kancerogēns."},{kod:"E451",ad:"Trifosfāti",tehlikeli:false,aciklama:"Mitruma saglabātājs."}] },
  { ad:"Cepelis LV (Kartupeļu Pankūkas)", adLatin:"Cepelis LV", kal:248, pro:5, karb:32, yag:12, lif:2.5, sod:480, por:150, kat:"Ēdieni", ulke:"lv", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"kartupeli, kviešu milti, olas, sīpoli, sāls", katkiMaddeleri:[] },

  // ── ET ──
  { ad:"Cepelin ET (Kartulivorst)", adLatin:"Cepelin ET Kartulivorst", kal:248, pro:10, karb:28, yag:12, lif:2, sod:520, por:200, kat:"Toidud", ulke:"et", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"kartul, sealiha, sibul, sool", katkiMaddeleri:[] },
  { ad:"Creme Fraiche ET", kal:215, pro:2.5, karb:3.2, yag:21, lif:0, sod:55, por:30, kat:"Piimatooted", ulke:"et", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"koor, kultuurid", katkiMaddeleri:[] },

  // ── LT ──
  { ad:"Cepelinai LT", adLatin:"Cepelinai LT", kal:265, pro:12, karb:30, yag:13, lif:2.5, sod:520, por:250, kat:"Patiekalai", ulke:"lt", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"bulvės, mėsa, svogūnai, lašiniai, grietinė", katkiMaddeleri:[] },
  { ad:"Cukrainis LT", adLatin:"Cukrainis LT", kal:385, pro:0.5, karb:97, yag:0, lif:0, sod:5, por:10, kat:"Saldainiai", ulke:"lt", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:1.5, icerik:"cukrus, gliukozės sirupas, E104", katkiMaddeleri:[{kod:"E104",ad:"Chinolino geltonas",tehlikeli:true,aciklama:"Gali sukelti hiperaktyvumą vaikams."}] },
  { ad:"Česnakų Duona LT", adLatin:"Cesnakin Duona LT", kal:285, pro:7, karb:42, yag:10, lif:2, sod:520, por:100, kat:"Duona", ulke:"lt", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"duona, česnakas, sviestas, druska, petražolės", katkiMaddeleri:[] },

  // ══════════════════════════════════════════════════════
  // D HARFİ — BALTİK
  // ══════════════════════════════════════════════════════

  // ── LV ──
  { ad:"Desas LV (Cūkgaļas)", adLatin:"Desas LV", kal:315, pro:13, karb:2, yag:28, lif:0, sod:980, por:100, kat:"Gaļas Produkti", ulke:"lv", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"cūkgaļa, sāls, E250, E451, garšvielas", katkiMaddeleri:[{kod:"E250",ad:"Nātrija nitrīts",tehlikeli:true,aciklama:"Lielās devās kancerogēns."},{kod:"E451",ad:"Trifosfāti",tehlikeli:false,aciklama:"Mitruma saglabātājs."}] },
  { ad:"Didini LV (Liels Pankūka)", adLatin:"Didini LV", kal:215, pro:6.5, karb:28, yag:9, lif:1.5, sod:285, por:100, kat:"Ēdieni", ulke:"lv", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"kviešu milti, olas, piens, sviests, sāls", katkiMaddeleri:[] },
  { ad:"Dilles LV", adLatin:"Dilles LV", kal:43, pro:3.5, karb:7, yag:1.1, lif:2.1, sod:61, por:10, kat:"Garšaugi", ulke:"lv", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"svaigi dilles", katkiMaddeleri:[] },
  { ad:"Dzērvenes LV (Cranberry)", adLatin:"Dzervenes LV", kal:46, pro:0.4, karb:12, yag:0.1, lif:3.6, sod:2, por:100, kat:"Ogas", ulke:"lv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"dzērvenes", katkiMaddeleri:[] },
  { ad:"Duona LV (Rudzu Maize)", adLatin:"Duona LV Rudzu", kal:215, pro:7.5, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Maize", ulke:"lv", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"rudzu milti, kvasa mīkla, ūdens, sāls", katkiMaddeleri:[] },

  // ── ET ──
  { ad:"Dill ET (Till)", adLatin:"Dill ET", kal:43, pro:3.5, karb:7, yag:1.1, lif:2.1, sod:61, por:10, kat:"Ürdid", ulke:"et", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"till", katkiMaddeleri:[] },
  { ad:"Dumplings ET (Pelmeenid)", adLatin:"Pelmeenid ET", kal:215, pro:10, karb:28, yag:8, lif:2, sod:420, por:150, kat:"Toidud", ulke:"et", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"nisujahu, sealiha, veiseliha, sibul, sool, pipar", katkiMaddeleri:[] },
  { ad:"Dzhusai ET (Murulauk)", adLatin:"Dzhusai ET", kal:30, pro:3.3, karb:4.4, yag:0.7, lif:2.5, sod:3, por:10, kat:"Ürdid", ulke:"et", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"murulauk", katkiMaddeleri:[] },
  { ad:"Dzira ET (Kaer-Rabarberikissell)", adLatin:"Dzira ET", kal:72, pro:0.5, karb:17, yag:0.2, lif:1, sod:5, por:200, kat:"Joogid", ulke:"et", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"rabarber, kaer, suhkur, E330", katkiMaddeleri:[{kod:"E330",ad:"Sidrunhape",tehlikeli:false,aciklama:"Happesuse regulaator."}] },
  { ad:"Dunkeldunk ET (Tumedad Küpsised)", adLatin:"Dunkeldunk ET", kal:445, pro:6, karb:62, yag:21, lif:3, sod:380, por:30, kat:"Küpsised", ulke:"et", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"nisujahu, suhkur, taimsed rasvad, kakao, E471, E322", katkiMaddeleri:[{kod:"E471",ad:"Mono- ja diglütseriidid",tehlikeli:false,aciklama:"Emulgaator."},{kod:"E322",ad:"Letsitiin",tehlikeli:false,aciklama:"Emulgaator."}] },

  // ── LT ──
  { ad:"Duona LT (Ruginė)", adLatin:"Duona LT Rugine", kal:215, pro:7.5, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Duona", ulke:"lt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ruginiai miltai, raugintas tešlos, vanduo, druska", katkiMaddeleri:[] },
  { ad:"Dešrelės LT", adLatin:"Desreles LT", kal:265, pro:12, karb:4, yag:23, lif:0, sod:900, por:100, kat:"Mėsos Gaminiai", ulke:"lt", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"kiauliena, vanduo, druska, E250, E451, E407", katkiMaddeleri:[{kod:"E250",ad:"Natrio nitritas",tehlikeli:true,aciklama:"Didelėmis dozėmis gali būti kancerogeninis."},{kod:"E451",ad:"Trifosfatai",tehlikeli:false,aciklama:"Drėgmės sulaikymo priemonė."},{kod:"E407",ad:"Karageninas",tehlikeli:false,aciklama:"Tirštiklis."}] },
  { ad:"Džemas LT (Braškių)", adLatin:"Dzemas LT Braski", kal:250, pro:0.4, karb:63, yag:0, lif:1, sod:8, por:20, kat:"Uogienės", ulke:"lt", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"braškės, cukrus, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektinas",tehlikeli:false,aciklama:"Gelinimo agentė."},{kod:"E330",ad:"Citrinų rūgštis",tehlikeli:false,aciklama:"Rūgštingumo reguliatorius."}] },
  { ad:"Dumplinukai LT (Koldūnai)", adLatin:"Kolduunai LT", kal:215, pro:10, karb:28, yag:8, lif:2, sod:420, por:150, kat:"Patiekalai", ulke:"lt", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"kviečių miltai, kiauliena, jautiena, svogūnas, druska, pipirai", katkiMaddeleri:[] },
  { ad:"Dievmedžio Uogos LT", adLatin:"Dievmedzio Uogos LT", kal:43, pro:1.4, karb:9.8, yag:0.4, lif:1.7, sod:10, por:100, kat:"Uogos", ulke:"lt", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"šilauogės", katkiMaddeleri:[] }
];

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") return { statusCode:405, body:"Method not allowed" };
  try {
    const db = getFirestore();
    let eklenen = 0;
    for (let i = 0; i < BESINLER.length; i += 400) {
      const batch = db.batch();
      const dilim = BESINLER.slice(i, i + 400);
      for (const besin of dilim) {
        const isimler = new Set([besin.ad.toLowerCase(), ...besin.ad.toLowerCase().split(" ")]);
        if (besin.adLatin) {
          isimler.add(besin.adLatin.toLowerCase());
          besin.adLatin.toLowerCase().split(" ").forEach(w => isimler.add(w));
        }
        if (besin.adler) {
          Object.values(besin.adler).forEach(v => {
            isimler.add(v.toLowerCase());
            v.toLowerCase().split(" ").forEach(w => isimler.add(w));
          });
        }
        const ref = db.collection("besinler").doc();
        batch.set(ref, { ...besin, isimler:[...isimler], eklenme:new Date().toISOString() });
        eklenen++;
      }
      await batch.commit();
    }
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mesaj: eklenen + " besin eklendi!", toplam: BESINLER.length }),
    };
  } catch(err) {
    return { statusCode:500, body:JSON.stringify({ hata:err.message }) };
  }
};
