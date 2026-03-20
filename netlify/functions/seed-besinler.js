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

const BESINLER = [
  { ad:"Acur", kal:14, pro:0.6, karb:3.2, yag:0.1, lif:0.5, sod:2, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4, icerik:"acur", katkiMaddeleri:[] },
  { ad:"Ahududu", kal:52, pro:1.2, karb:12, yag:0.7, lif:6.5, sod:1, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:5, icerik:"ahududu", katkiMaddeleri:[] },
  { ad:"Akcigerotu", kal:22, pro:2.1, karb:3.8, yag:0.3, lif:2.0, sod:12, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4, icerik:"akcigerotu", katkiMaddeleri:[] },
  { ad:"Alabalik", kal:148, pro:20, karb:0, yag:7, lif:0, sod:52, por:100, kat:"Balik", ulke:"tr", onay:true, yildiz:5, icerik:"alabalik", katkiMaddeleri:[] },
  { ad:"Alici", kal:50, pro:0.4, karb:13, yag:0.1, lif:1.8, sod:1, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:3.5, icerik:"alici", katkiMaddeleri:[] },
  { ad:"Ananas", kal:50, pro:0.5, karb:13, yag:0.1, lif:1.4, sod:1, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:4.5, icerik:"ananas", katkiMaddeleri:[] },
  { ad:"Arap Salatasi", kal:45, pro:1.5, karb:8, yag:1.2, lif:2.0, sod:180, por:100, kat:"Salata", ulke:"tr", onay:true, yildiz:4, icerik:"domates, maydanoz, nane, limon suyu, zeytinyagi", katkiMaddeleri:[] },
  { ad:"Arpa", kal:354, pro:12, karb:73, yag:2.3, lif:17, sod:12, por:100, kat:"Tahil", ulke:"tr", onay:true, yildiz:4.5, icerik:"arpa", katkiMaddeleri:[] },
  { ad:"Arpa Unu", kal:345, pro:10, karb:74, yag:1.6, lif:10, sod:5, por:100, kat:"Tahil", ulke:"tr", onay:true, yildiz:4, icerik:"arpa unu", katkiMaddeleri:[] },
  { ad:"Armut", kal:57, pro:0.4, karb:15, yag:0.1, lif:3.1, sod:1, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:4, icerik:"armut", katkiMaddeleri:[] },
  { ad:"Asma Yapragi", kal:93, pro:5.6, karb:17, yag:2.1, lif:11, sod:9, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4, icerik:"asma yapragi", katkiMaddeleri:[] },
  { ad:"At Eti", kal:133, pro:21, karb:0, yag:5, lif:0, sod:47, por:100, kat:"Et", ulke:"tr", onay:true, yildiz:3.5, icerik:"at eti", katkiMaddeleri:[] },
  { ad:"Avokado", kal:160, pro:2, karb:9, yag:15, lif:7, sod:7, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:5, icerik:"avokado", katkiMaddeleri:[] },
  { ad:"Ayca Fasulyesi", kal:131, pro:9, karb:24, yag:0.5, lif:6, sod:4, por:100, kat:"Baklagil", ulke:"tr", onay:true, yildiz:4.5, icerik:"ayca fasulyesi, su", katkiMaddeleri:[] },
  { ad:"Aycicek Tohumu", kal:584, pro:21, karb:20, yag:51, lif:8.6, sod:9, por:30, kat:"Kuruyemis", ulke:"tr", onay:true, yildiz:4.5, icerik:"aycicek tohumu", katkiMaddeleri:[] },
  { ad:"Aycicek Yagi", kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, por:10, kat:"Yag", ulke:"tr", onay:true, yildiz:3, icerik:"aycicek yagi", katkiMaddeleri:[] },
  { ad:"Ayran", kal:36, pro:1.8, karb:2.6, yag:2, lif:0, sod:85, por:200, kat:"Icecek", ulke:"tr", onay:true, yildiz:5, icerik:"yogurt, su, tuz", katkiMaddeleri:[] },
  { ad:"Ayva", kal:57, pro:0.4, karb:15, yag:0.1, lif:1.9, sod:4, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:4, icerik:"ayva", katkiMaddeleri:[] },
  { ad:"Azgin Ot", kal:18, pro:1.5, karb:3, yag:0.3, lif:1.8, sod:30, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4, icerik:"azgin ot", katkiMaddeleri:[] },
  { ad:"Acili Ezme", kal:35, pro:1.2, karb:6, yag:1, lif:1.5, sod:200, por:100, kat:"Meze", ulke:"tr", onay:true, yildiz:4.5, icerik:"domates, biber, sogan, maydanoz, limon, tuz", katkiMaddeleri:[] },
  { ad:"Adana Kebap", kal:250, pro:22, karb:0, yag:17, lif:0, sod:380, por:100, kat:"Et", ulke:"tr", onay:true, yildiz:4.5, icerik:"dana kiyma, kuzu kiyma, tuz, biber, kirmizi biber", katkiMaddeleri:[] },
  { ad:"Adayi Otu Cayi", kal:2, pro:0.1, karb:0.3, yag:0, lif:0, sod:1, por:200, kat:"Icecek", ulke:"tr", onay:true, yildiz:4.5, icerik:"ada cayi, su", katkiMaddeleri:[] },
  { ad:"Akcaagac Sirubu", kal:260, pro:0, karb:67, yag:0.1, lif:0, sod:9, por:30, kat:"Tatlandirici", ulke:"tr", onay:true, yildiz:3.5, icerik:"akcaagac ozutu", katkiMaddeleri:[] },
  { ad:"Akdeniz Salatasi", kal:72, pro:2, karb:6, yag:4.5, lif:2.5, sod:220, por:150, kat:"Salata", ulke:"tr", onay:true, yildiz:5, icerik:"domates, salatalik, zeytin, peynir, zeytinyagi", katkiMaddeleri:[] },
  { ad:"Alabalik Izgara", kal:158, pro:22, karb:0, yag:7.5, lif:0, sod:68, por:100, kat:"Balik", ulke:"tr", onay:true, yildiz:5, icerik:"alabalik, tuz, zeytinyagi", katkiMaddeleri:[] },
  { ad:"Alkol Icermeyen Bira", kal:20, pro:0.5, karb:4, yag:0, lif:0, sod:5, por:330, kat:"Icecek", ulke:"tr", onay:true, yildiz:3, icerik:"arpa, su, serbek maddesi", katkiMaddeleri:[{kod:"E224",ad:"Potasyum metabisulfit",tehlikeli:false,aciklama:"Koruyucu."}] },
  { ad:"Almond Milk", kal:13, pro:0.4, karb:0.3, yag:1.1, lif:0.3, sod:65, por:240, kat:"Icecek", ulke:"tr", onay:true, yildiz:4, icerik:"badem, su, tuz", katkiMaddeleri:[] },
  { ad:"Alo Vera Icecegi", kal:25, pro:0, karb:6, yag:0, lif:0, sod:10, por:240, kat:"Icecek", ulke:"tr", onay:true, yildiz:3.5, icerik:"alo vera suyu, su, E330", katkiMaddeleri:[{kod:"E330",ad:"Sitrik asit",tehlikeli:false,aciklama:"Asitlik duzenleyici."}] },
  { ad:"Anason Cayi", kal:2, pro:0.1, karb:0.4, yag:0, lif:0, sod:1, por:200, kat:"Icecek", ulke:"tr", onay:true, yildiz:4, icerik:"anason, su", katkiMaddeleri:[] },
  { ad:"Antep Fisigi", kal:562, pro:20, karb:28, yag:45, lif:10, sod:1, por:30, kat:"Kuruyemis", ulke:"tr", onay:true, yildiz:5, icerik:"antep fisigi", katkiMaddeleri:[] },
  { ad:"Arnavut Cigeri", kal:178, pro:19, karb:8, yag:7.5, lif:0.5, sod:320, por:100, kat:"Et", ulke:"tr", onay:true, yildiz:4, icerik:"dana cigeri, un, sogan, zeytinyagi, tuz, karabiber", katkiMaddeleri:[] },
  { ad:"Asure", kal:170, pro:4.5, karb:36, yag:1.2, lif:3.5, sod:5, por:150, kat:"Tatli", ulke:"tr", onay:true, yildiz:4.5, icerik:"bugday, nohut, kuru fasulye, uzum, incir, seker, tarcilik", katkiMaddeleri:[] },
  { ad:"Ates Bockegi Cayi", kal:3, pro:0.1, karb:0.5, yag:0, lif:0, sod:1, por:200, kat:"Icecek", ulke:"tr", onay:true, yildiz:3.5, icerik:"ihlamur, nane, su", katkiMaddeleri:[] },
  { ad:"Avurtmak Cayi", kal:2, pro:0, karb:0.3, yag:0, lif:0, sod:1, por:200, kat:"Icecek", ulke:"tr", onay:true, yildiz:4, icerik:"bitki cayi, su", katkiMaddeleri:[] },
  { ad:"Ayaklar Corbasi", kal:82, pro:8, karb:4, yag:3.5, lif:0, sod:420, por:250, kat:"Corba", ulke:"tr", onay:true, yildiz:3.5, icerik:"koyun ayagi, sarmisak, sirke, tuz", katkiMaddeleri:[] },
  { ad:"Ayas Koyunu Eti", kal:294, pro:25, karb:0, yag:21, lif:0, sod:72, por:100, kat:"Et", ulke:"tr", onay:true, yildiz:4, icerik:"kuzu eti", katkiMaddeleri:[] },
  { ad:"Ac Biber", kal:40, pro:2, karb:7.3, yag:0.4, lif:1.5, sod:7, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4.5, icerik:"ac biber", katkiMaddeleri:[] },
  { ad:"Acikabak", kal:26, pro:1, karb:6.5, yag:0.1, lif:0.5, sod:2, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:3.5, icerik:"acikabak", katkiMaddeleri:[] },
  { ad:"Acisu", kal:0, pro:0, karb:0, yag:0, lif:0, sod:220, por:250, kat:"Icecek", ulke:"tr", onay:true, yildiz:3, icerik:"su, sodyum bikarbonat, sodyum klorur", katkiMaddeleri:[{kod:"E500",ad:"Sodyum karbonat",tehlikeli:false,aciklama:"Asitlik duzenleyici."}] },
  { ad:"Agiz Seker", kal:398, pro:0, karb:100, yag:0, lif:0, sod:1, por:10, kat:"Tatlandirici", ulke:"tr", onay:true, yildiz:1, icerik:"seker", katkiMaddeleri:[] },
  { ad:"Ahtapot", kal:82, pro:15, karb:2.2, yag:1, lif:0, sod:230, por:100, kat:"Deniz Urunu", ulke:"tr", onay:true, yildiz:4.5, icerik:"ahtapot", katkiMaddeleri:[] },
  { ad:"Ahtapot Salatasi", kal:95, pro:14, karb:4, yag:3, lif:0.5, sod:280, por:150, kat:"Salata", ulke:"tr", onay:true, yildiz:4.5, icerik:"ahtapot, zeytinyagi, limon, sarimsak, maydanoz", katkiMaddeleri:[] },
  { ad:"Ak Balik", kal:95, pro:18, karb:0, yag:2.4, lif:0, sod:58, por:100, kat:"Balik", ulke:"tr", onay:true, yildiz:4, icerik:"ak balik", katkiMaddeleri:[] },
  { ad:"Akdeniz Levrek", kal:124, pro:19, karb:0, yag:5.2, lif:0, sod:87, por:100, kat:"Balik", ulke:"tr", onay:true, yildiz:5, icerik:"levrek", katkiMaddeleri:[] },
  { ad:"Akcaagac Sekeri", kal:354, pro:0, karb:91, yag:0, lif:0, sod:1, por:10, kat:"Tatlandirici", ulke:"tr", onay:true, yildiz:3, icerik:"akcaagac suyu", katkiMaddeleri:[] },
  { ad:"Alaca Fasulye", kal:127, pro:8.7, karb:23, yag:0.5, lif:6.4, sod:2, por:100, kat:"Baklagil", ulke:"tr", onay:true, yildiz:5, icerik:"alaca fasulye, su", katkiMaddeleri:[] },
  { ad:"Alet Coregi", kal:285, pro:8, karb:50, yag:5, lif:2.5, sod:280, por:100, kat:"Ekmek", ulke:"tr", onay:true, yildiz:3.5, icerik:"bugday unu, su, tuz, maya, corek otu", katkiMaddeleri:[] },
  { ad:"Alkaragoz Balik", kal:88, pro:17, karb:0, yag:2, lif:0, sod:62, por:100, kat:"Balik", ulke:"tr", onay:true, yildiz:4, icerik:"alkaragoz", katkiMaddeleri:[] },
  { ad:"Alleci", kal:46, pro:0.3, karb:12, yag:0.1, lif:1.2, sod:1, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:3.5, icerik:"alleci", katkiMaddeleri:[] },
  { ad:"Alman Salatasi", kal:165, pro:3.5, karb:12, yag:12, lif:1.5, sod:380, por:150, kat:"Salata", ulke:"de", onay:true, yildiz:3.5, icerik:"patates, hardal, sirke, mayonez, tuz", katkiMaddeleri:[] },
  { ad:"Altin Elma", kal:52, pro:0.3, karb:14, yag:0.2, lif:2.4, sod:1, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:4.5, icerik:"elma", katkiMaddeleri:[] },
  { ad:"Aluc", kal:50, pro:0.4, karb:13, yag:0.1, lif:1.8, sod:1, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:3.5, icerik:"aluc", katkiMaddeleri:[] },
  { ad:"Amerikan Salatasi", kal:145, pro:2, karb:14, yag:9, lif:1.5, sod:290, por:100, kat:"Salata", ulke:"tr", onay:true, yildiz:3.5, icerik:"misir, bezelye, havuc, mayonez", katkiMaddeleri:[] },
  { ad:"Amberbaligi", kal:105, pro:19, karb:0, yag:3, lif:0, sod:72, por:100, kat:"Balik", ulke:"tr", onay:true, yildiz:4, icerik:"amberbaligi", katkiMaddeleri:[] },
  { ad:"Anado Dut", kal:43, pro:1.4, karb:9.8, yag:0.4, lif:1.7, sod:10, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:4.5, icerik:"dut", katkiMaddeleri:[] },
  { ad:"Anadolu Peyniri", kal:310, pro:18, karb:2, yag:25, lif:0, sod:950, por:30, kat:"Sut Urunleri", ulke:"tr", onay:true, yildiz:4, icerik:"sut, tuz, maya", katkiMaddeleri:[] },
  { ad:"Anason", kal:337, pro:18, karb:50, yag:16, lif:15, sod:16, por:5, kat:"Baharat", ulke:"tr", onay:true, yildiz:5, icerik:"anason tohumu", katkiMaddeleri:[] },
  { ad:"Anchovy", kal:131, pro:20, karb:0, yag:4.8, lif:0, sod:104, por:100, kat:"Balik", ulke:"tr", onay:true, yildiz:4, icerik:"hamsi", katkiMaddeleri:[] },
  { ad:"Angut Eti", kal:122, pro:20, karb:0, yag:4.5, lif:0, sod:68, por:100, kat:"Et", ulke:"tr", onay:true, yildiz:3.5, icerik:"angut eti", katkiMaddeleri:[] },
  { ad:"Antep Baklava", kal:445, pro:7, karb:52, yag:24, lif:1.5, sod:90, por:100, kat:"Tatli", ulke:"tr", onay:true, yildiz:4.5, icerik:"bugday unu, tereyagi, antep fisigi, seker, su", katkiMaddeleri:[] },
  { ad:"Antep Fistigi Ezmesi", kal:558, pro:20, karb:22, yag:46, lif:6, sod:350, por:30, kat:"Meze", ulke:"tr", onay:true, yildiz:5, icerik:"antep fisigi, tuz", katkiMaddeleri:[] },
  { ad:"Antep Pekmezi", kal:290, pro:0.5, karb:72, yag:0.2, lif:0.5, sod:8, por:20, kat:"Tatlandirici", ulke:"tr", onay:true, yildiz:4, icerik:"uzum pekmezi", katkiMaddeleri:[] },
  { ad:"Apricot", kal:48, pro:1.4, karb:11, yag:0.4, lif:2, sod:1, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:4.5, icerik:"kayisi", katkiMaddeleri:[] },
  { ad:"Araka", kal:81, pro:5.4, karb:14, yag:0.4, lif:5.1, sod:5, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4.5, icerik:"bezelye", katkiMaddeleri:[] },
  { ad:"Arda Coregi", kal:310, pro:9, karb:54, yag:7, lif:2, sod:310, por:100, kat:"Ekmek", ulke:"tr", onay:true, yildiz:4, icerik:"bugday unu, su, tuz, maya, yag", katkiMaddeleri:[] },
  { ad:"Arnavutluk Borek", kal:328, pro:10, karb:32, yag:18, lif:1, sod:450, por:100, kat:"Borek", ulke:"tr", onay:true, yildiz:4, icerik:"yufka, peynir, yumurta, yag", katkiMaddeleri:[] },
  { ad:"Arpa Corbasi", kal:68, pro:2.5, karb:14, yag:0.8, lif:2.5, sod:380, por:250, kat:"Corba", ulke:"tr", onay:true, yildiz:4, icerik:"arpa, et suyu, tuz, karabiber", katkiMaddeleri:[] },
  { ad:"Artichoke", kal:47, pro:3.3, karb:10, yag:0.2, lif:5.4, sod:94, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:5, icerik:"enginar", katkiMaddeleri:[] },
  { ad:"Asalya", kal:22, pro:1.8, karb:4, yag:0.3, lif:2, sod:15, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4, icerik:"asalya", katkiMaddeleri:[] },
  { ad:"Asar Otu", kal:18, pro:1.5, karb:3.2, yag:0.3, lif:1.8, sod:12, por:100, kat:"Baharat", ulke:"tr", onay:true, yildiz:4, icerik:"taze nane", katkiMaddeleri:[] },
  { ad:"Asci Kadayif", kal:380, pro:6, karb:58, yag:15, lif:1, sod:120, por:100, kat:"Tatli", ulke:"tr", onay:true, yildiz:4, icerik:"kadayif, tereyagi, seker, su, ceviz", katkiMaddeleri:[] },
  { ad:"Asure Bugdayi", kal:339, pro:14, karb:71, yag:1.9, lif:12, sod:2, por:100, kat:"Tahil", ulke:"tr", onay:true, yildiz:4.5, icerik:"bugday", katkiMaddeleri:[] },
  { ad:"At Helvasi", kal:450, pro:8, karb:68, yag:17, lif:2, sod:15, por:50, kat:"Tatli", ulke:"tr", onay:true, yildiz:3.5, icerik:"seker, tereyagi, un", katkiMaddeleri:[] },
  { ad:"Atlar Peyniri", kal:320, pro:19, karb:2, yag:26, lif:0, sod:880, por:30, kat:"Sut Urunleri", ulke:"tr", onay:true, yildiz:3.5, icerik:"at sutu, tuz, maya", katkiMaddeleri:[] },
  { ad:"Atom Corba", kal:58, pro:2.8, karb:9, yag:1.2, lif:1.5, sod:360, por:250, kat:"Corba", ulke:"tr", onay:true, yildiz:3.5, icerik:"domates, biber, sogan, et suyu, tuz", katkiMaddeleri:[] },
  { ad:"Avci Corbasi", kal:72, pro:5, karb:8, yag:2.2, lif:2, sod:400, por:250, kat:"Corba", ulke:"tr", onay:true, yildiz:4, icerik:"mantar, sogan, et, tereyagi, tuz", katkiMaddeleri:[] },
  { ad:"Avsar Perdesi", kal:290, pro:12, karb:38, yag:10, lif:1.5, sod:420, por:100, kat:"Borek", ulke:"tr", onay:true, yildiz:4, icerik:"yufka, peynir, maydanoz, yumurta", katkiMaddeleri:[] },
  { ad:"Ayak Corbasi", kal:78, pro:7.5, karb:5, yag:3, lif:0, sod:410, por:250, kat:"Corba", ulke:"tr", onay:true, yildiz:3.5, icerik:"koyun ayagi, sarimsak, sirke, tuz", katkiMaddeleri:[] },
  { ad:"Aydinlikevler Pilici", kal:185, pro:25, karb:0, yag:9, lif:0, sod:86, por:100, kat:"Et", ulke:"tr", onay:true, yildiz:4, icerik:"pili, tuz, baharat", katkiMaddeleri:[] },
  { ad:"Ayik Balik", kal:92, pro:17, karb:0, yag:2.5, lif:0, sod:68, por:100, kat:"Balik", ulke:"tr", onay:true, yildiz:4, icerik:"balik", katkiMaddeleri:[] },
  { ad:"Ayna Sazan", kal:127, pro:18, karb:0, yag:5.6, lif:0, sod:52, por:100, kat:"Balik", ulke:"tr", onay:true, yildiz:3.5, icerik:"sazan", katkiMaddeleri:[] },
  { ad:"Aypare Tatli", kal:420, pro:5, karb:65, yag:16, lif:1, sod:45, por:100, kat:"Tatli", ulke:"tr", onay:true, yildiz:4, icerik:"un, tereyagi, seker, su, sut", katkiMaddeleri:[] },
  { ad:"Ayrica", kal:58, pro:2.4, karb:10, yag:1, lif:3.8, sod:22, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4.5, icerik:"enginar", katkiMaddeleri:[] },
  { ad:"Ayse Kadir Fasulyesi", kal:31, pro:2, karb:7, yag:0.1, lif:2.5, sod:6, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:5, icerik:"taze fasulye", katkiMaddeleri:[] },
  { ad:"Ayvali Pilav", kal:168, pro:3, karb:32, yag:3.5, lif:1.5, sod:180, por:150, kat:"Tahil", ulke:"tr", onay:true, yildiz:4, icerik:"pirinc, ayva, tereyagi, tuz, seker", katkiMaddeleri:[] },
  { ad:"Azerice Bozartma", kal:195, pro:18, karb:8, yag:9, lif:1.5, sod:380, por:200, kat:"Et", ulke:"tr", onay:true, yildiz:4, icerik:"kuzu, sogan, domates, biberi, tuz, baharat", katkiMaddeleri:[] },
  { ad:"Azerbeycani Dushbere", kal:210, pro:12, karb:22, yag:8, lif:1, sod:450, por:200, kat:"Corba", ulke:"tr", onay:true, yildiz:4, icerik:"bugday unu, et, sogan, tuz, baharat", katkiMaddeleri:[] },
  { ad:"Acili Sus Biber", kal:40, pro:2, karb:7.3, yag:0.4, lif:1.5, sod:7, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4, icerik:"sus biber", katkiMaddeleri:[] },
  { ad:"Acili Tavuk Sis", kal:185, pro:28, karb:2, yag:7, lif:0.3, sod:320, por:100, kat:"Et", ulke:"tr", onay:true, yildiz:4.5, icerik:"tavuk gogsu, kirmizi biber, yogurt, tuz, baharat", katkiMaddeleri:[] },
  { ad:"Acisukre", kal:270, pro:6, karb:30, yag:14, lif:2, sod:150, por:50, kat:"Atistirmalik", ulke:"tr", onay:true, yildiz:3, icerik:"un, seker, kakao, yag, E322, E471", katkiMaddeleri:[{kod:"E322",ad:"Lesitinler",tehlikeli:false,aciklama:"Emulgatoren."},{kod:"E471",ad:"Mono ve digliseritler",tehlikeli:false,aciklama:"Emulgatoren."}] },
  { ad:"Acuka", kal:52, pro:2, karb:8, yag:1.5, lif:2, sod:280, por:50, kat:"Meze", ulke:"tr", onay:true, yildiz:4.5, icerik:"domates salcasi, biber salcasi, ceviz, sarimsak", katkiMaddeleri:[] },
  { ad:"Adacayi Cayi", kal:2, pro:0.1, karb:0.3, yag:0, lif:0, sod:1, por:200, kat:"Icecek", ulke:"tr", onay:true, yildiz:4.5, icerik:"ada cayi, su", katkiMaddeleri:[] },
  { ad:"Adana Tarhana Corbasi", kal:75, pro:3, karb:14, yag:1.5, lif:1.5, sod:520, por:250, kat:"Corba", ulke:"tr", onay:true, yildiz:4.5, icerik:"tarhana, domates, biber, yogurt, tuz", katkiMaddeleri:[] },
  { ad:"Agaclarda Mantar", kal:22, pro:3.1, karb:3.3, yag:0.3, lif:2.5, sod:5, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4.5, icerik:"agac mantari", katkiMaddeleri:[] },
  { ad:"Ahududu Suyu", kal:48, pro:0.4, karb:12, yag:0.2, lif:0.5, sod:2, por:200, kat:"Icecek", ulke:"tr", onay:true, yildiz:4.5, icerik:"ahududu, su", katkiMaddeleri:[] },
  { ad:"Akdeniz Hamsi", kal:131, pro:20, karb:0, yag:4.8, lif:0, sod:104, por:100, kat:"Balik", ulke:"tr", onay:true, yildiz:5, icerik:"hamsi", katkiMaddeleri:[] },
  { ad:"Akdogan Tarhana", kal:348, pro:12, karb:68, yag:2.5, lif:3, sod:480, por:30, kat:"Tahil", ulke:"tr", onay:true, yildiz:4.5, icerik:"bugday unu, domates, yogurt, biber, tuz, maya", katkiMaddeleri:[] },
  { ad:"Aklara Samsa", kal:310, pro:11, karb:36, yag:13, lif:1.5, sod:380, por:100, kat:"Borek", ulke:"tr", onay:true, yildiz:4, icerik:"yufka, et, sogan, tuz, baharat", katkiMaddeleri:[] },
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
        const ref = db.collection("besinler").doc();
        batch.set(ref, {
          ...besin,
          isimler: [...new Set([besin.ad.toLowerCase(), ...besin.ad.toLowerCase().split(" ")])],
          eklenme: new Date().toISOString(),
        });
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
