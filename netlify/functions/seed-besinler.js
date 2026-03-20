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
  { ad:"Yulaf Ezmesi", kal:389, pro:17, karb:66, yag:7, lif:11, sod:6, por:100, kat:"Tahil", ulke:"tr", onay:true, yildiz:5, icerik:"yulaf", katkiMaddeleri:[] },
  { ad:"Beyaz Ekmek", kal:265, pro:9, karb:51, yag:3.2, lif:2.7, sod:491, por:100, kat:"Tahil", ulke:"tr", onay:true, yildiz:1.5, icerik:"bugday unu, su, tuz, maya, seker, bitkisel yag, E282, E471", katkiMaddeleri:[{kod:"E282",ad:"Kalsiyum propiyonat",tehlikeli:false,aciklama:"Kuf onleyici."},{kod:"E471",ad:"Mono ve digliseritler",tehlikeli:false,aciklama:"Emulgatoren."}] },
  { ad:"Tam Bugday Ekmegi", kal:247, pro:13, karb:41, yag:3.4, lif:7, sod:400, por:100, kat:"Tahil", ulke:"tr", onay:true, yildiz:4, icerik:"tam bugday unu, su, tuz, maya", katkiMaddeleri:[] },
  { ad:"Pilav", kal:130, pro:2.7, karb:28, yag:0.3, lif:0.4, sod:1, por:100, kat:"Tahil", ulke:"tr", onay:true, yildiz:2.5, icerik:"pirinc, su, tuz", katkiMaddeleri:[] },
  { ad:"Bulgur Pilavi", kal:151, pro:5.6, karb:29, yag:1.3, lif:4.5, sod:8, por:100, kat:"Tahil", ulke:"tr", onay:true, yildiz:4, icerik:"bulgur, su, tuz", katkiMaddeleri:[] },
  { ad:"Makarna", kal:158, pro:5.8, karb:31, yag:0.9, lif:1.8, sod:1, por:100, kat:"Tahil", ulke:"tr", onay:true, yildiz:2.5, icerik:"durum bugdayi irmik, su", katkiMaddeleri:[] },
  { ad:"Kepekli Makarna", kal:149, pro:5.5, karb:29, yag:0.9, lif:3.9, sod:3, por:100, kat:"Tahil", ulke:"tr", onay:true, yildiz:3, icerik:"tam bugday unu, su", katkiMaddeleri:[] },
  { ad:"Simit", kal:294, pro:9.5, karb:55, yag:4.5, lif:2.3, sod:380, por:100, kat:"Tahil", ulke:"tr", onay:true, yildiz:1.5, icerik:"bugday unu, susam, su, tuz, maya, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono ve digliseritler",tehlikeli:false,aciklama:"Emulgatoren."}] },
  { ad:"Tavuk Gogsu", kal:165, pro:31, karb:0, yag:3.6, lif:0, sod:74, por:100, kat:"Et", ulke:"tr", onay:true, yildiz:5, icerik:"tavuk gogsu, tuz", katkiMaddeleri:[] },
  { ad:"Tavuk But", kal:209, pro:26, karb:0, yag:11, lif:0, sod:95, por:100, kat:"Et", ulke:"tr", onay:true, yildiz:4, icerik:"tavuk but, tuz", katkiMaddeleri:[] },
  { ad:"Dana Kiyma", kal:250, pro:26, karb:0, yag:16, lif:0, sod:75, por:100, kat:"Et", ulke:"tr", onay:true, yildiz:4, icerik:"dana eti", katkiMaddeleri:[] },
  { ad:"Dana Biftek", kal:271, pro:29, karb:0, yag:17, lif:0, sod:65, por:100, kat:"Et", ulke:"tr", onay:true, yildiz:4, icerik:"dana eti", katkiMaddeleri:[] },
  { ad:"Ton Baligi", kal:116, pro:26, karb:0, yag:1, lif:0, sod:50, por:100, kat:"Balik", ulke:"tr", onay:true, yildiz:5, icerik:"ton baligi, su, tuz", katkiMaddeleri:[] },
  { ad:"Somon", kal:208, pro:20, karb:0, yag:13, lif:0, sod:59, por:100, kat:"Balik", ulke:"tr", onay:true, yildiz:5, icerik:"somon baligi", katkiMaddeleri:[] },
  { ad:"Yumurta", kal:155, pro:13, karb:1.1, yag:11, lif:0, sod:124, por:100, kat:"Yumurta", ulke:"tr", onay:true, yildiz:5, icerik:"yumurta", katkiMaddeleri:[] },
  { ad:"Tam Yagli Sut", kal:61, pro:3.2, karb:4.8, yag:3.3, lif:0, sod:43, por:100, kat:"Sut Urunleri", ulke:"tr", onay:true, yildiz:4, icerik:"inek sutu", katkiMaddeleri:[] },
  { ad:"Yoğurt", kal:61, pro:3.5, karb:4.7, yag:3.3, lif:0, sod:46, por:100, kat:"Sut Urunleri", ulke:"tr", onay:true, yildiz:5, icerik:"sut, yogurt kulturu", katkiMaddeleri:[] },
  { ad:"Beyaz Peynir", kal:264, pro:14, karb:2.7, yag:21, lif:0, sod:1116, por:30, kat:"Sut Urunleri", ulke:"tr", onay:true, yildiz:3.5, icerik:"sut, tuz, maya", katkiMaddeleri:[] },
  { ad:"Kasar Peyniri", kal:387, pro:25, karb:2, yag:31, lif:0, sod:760, por:30, kat:"Sut Urunleri", ulke:"tr", onay:true, yildiz:3, icerik:"sut, tuz, maya", katkiMaddeleri:[] },
  { ad:"Lor Peyniri", kal:98, pro:12, karb:3.3, yag:4, lif:0, sod:104, por:100, kat:"Sut Urunleri", ulke:"tr", onay:true, yildiz:4.5, icerik:"sut, tuz", katkiMaddeleri:[] },
  { ad:"Elma", kal:52, pro:0.3, karb:14, yag:0.2, lif:2.4, sod:1, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:4.5, icerik:"elma", katkiMaddeleri:[] },
  { ad:"Muz", kal:89, pro:1.1, karb:23, yag:0.3, lif:2.6, sod:1, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:4, icerik:"muz", katkiMaddeleri:[] },
  { ad:"Portakal", kal:47, pro:0.9, karb:12, yag:0.1, lif:2.4, sod:0, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:5, icerik:"portakal", katkiMaddeleri:[] },
  { ad:"Cilek", kal:32, pro:0.7, karb:7.7, yag:0.3, lif:2, sod:1, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:5, icerik:"cilek", katkiMaddeleri:[] },
  { ad:"Uzum", kal:67, pro:0.6, karb:17, yag:0.4, lif:0.9, sod:2, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:3.5, icerik:"uzum", katkiMaddeleri:[] },
  { ad:"Karpuz", kal:30, pro:0.6, karb:7.6, yag:0.2, lif:0.4, sod:1, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:4, icerik:"karpuz", katkiMaddeleri:[] },
  { ad:"Seftali", kal:39, pro:0.9, karb:10, yag:0.3, lif:1.5, sod:0, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:4.5, icerik:"seftali", katkiMaddeleri:[] },
  { ad:"Kiraz", kal:50, pro:1, karb:12, yag:0.3, lif:1.6, sod:0, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:5, icerik:"kiraz", katkiMaddeleri:[] },
  { ad:"Armut", kal:57, pro:0.4, karb:15, yag:0.1, lif:3.1, sod:1, por:100, kat:"Meyve", ulke:"tr", onay:true, yildiz:4, icerik:"armut", katkiMaddeleri:[] },
  { ad:"Domates", kal:18, pro:0.9, karb:3.9, yag:0.2, lif:1.2, sod:5, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:5, icerik:"domates", katkiMaddeleri:[] },
  { ad:"Salatalik", kal:16, pro:0.7, karb:3.6, yag:0.1, lif:0.5, sod:2, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:5, icerik:"salatalik", katkiMaddeleri:[] },
  { ad:"Biber", kal:31, pro:1, karb:7.6, yag:0.3, lif:1.7, sod:3, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:5, icerik:"biber", katkiMaddeleri:[] },
  { ad:"Patlican", kal:25, pro:1, karb:5.9, yag:0.2, lif:3, sod:2, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4.5, icerik:"patlican", katkiMaddeleri:[] },
  { ad:"Kabak", kal:17, pro:1.2, karb:3.1, yag:0.3, lif:1, sod:8, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4.5, icerik:"kabak", katkiMaddeleri:[] },
  { ad:"Havuc", kal:41, pro:0.9, karb:10, yag:0.2, lif:2.8, sod:69, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:5, icerik:"havuc", katkiMaddeleri:[] },
  { ad:"Ispanak", kal:23, pro:2.9, karb:3.6, yag:0.4, lif:2.2, sod:79, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:5, icerik:"ispanak", katkiMaddeleri:[] },
  { ad:"Brokoli", kal:34, pro:2.8, karb:7, yag:0.4, lif:2.6, sod:33, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:5, icerik:"brokoli", katkiMaddeleri:[] },
  { ad:"Patates", kal:87, pro:1.9, karb:20, yag:0.1, lif:1.8, sod:6, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:3.5, icerik:"patates, su", katkiMaddeleri:[] },
  { ad:"Sogan", kal:40, pro:1.1, karb:9.3, yag:0.1, lif:1.7, sod:4, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4, icerik:"sogan", katkiMaddeleri:[] },
  { ad:"Sarimsak", kal:149, pro:6.4, karb:33, yag:0.5, lif:2.1, sod:17, por:10, kat:"Sebze", ulke:"tr", onay:true, yildiz:5, icerik:"sarimsak", katkiMaddeleri:[] },
  { ad:"Marul", kal:15, pro:1.4, karb:2.9, yag:0.2, lif:1.3, sod:28, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:5, icerik:"marul", katkiMaddeleri:[] },
  { ad:"Bezelye", kal:81, pro:5.4, karb:14, yag:0.4, lif:5.1, sod:5, por:100, kat:"Sebze", ulke:"tr", onay:true, yildiz:4.5, icerik:"bezelye", katkiMaddeleri:[] },
  { ad:"Fasulye", kal:127, pro:8.7, karb:23, yag:0.5, lif:6.4, sod:2, por:100, kat:"Baklagil", ulke:"tr", onay:true, yildiz:5, icerik:"fasulye, su, tuz", katkiMaddeleri:[] },
  { ad:"Mercimek", kal:116, pro:9, karb:20, yag:0.4, lif:7.9, sod:2, por:100, kat:"Baklagil", ulke:"tr", onay:true, yildiz:5, icerik:"mercimek, su", katkiMaddeleri:[] },
  { ad:"Nohut", kal:164, pro:8.9, karb:27, yag:2.6, lif:7.6, sod:7, por:100, kat:"Baklagil", ulke:"tr", onay:true, yildiz:5, icerik:"nohut, su", katkiMaddeleri:[] },
  { ad:"Zeytinyagi", kal:884, pro:0, karb:0, yag:100, lif:0, sod:2, por:10, kat:"Yag", ulke:"tr", onay:true, yildiz:5, icerik:"sizma zeytinyagi", katkiMaddeleri:[] },
  { ad:"Tereyagi", kal:717, pro:0.9, karb:0.1, yag:81, lif:0, sod:11, por:10, kat:"Yag", ulke:"tr", onay:true, yildiz:3, icerik:"sut kremasi, tuz", katkiMaddeleri:[] },
  { ad:"Badem", kal:579, pro:21, karb:22, yag:50, lif:12.5, sod:1, por:30, kat:"Kuruyemis", ulke:"tr", onay:true, yildiz:5, icerik:"badem", katkiMaddeleri:[] },
  { ad:"Ceviz", kal:654, pro:15, karb:14, yag:65, lif:6.7, sod:2, por:30, kat:"Kuruyemis", ulke:"tr", onay:true, yildiz:5, icerik:"ceviz", katkiMaddeleri:[] },
  { ad:"Findik", kal:628, pro:15, karb:17, yag:61, lif:9.7, sod:0, por:30, kat:"Kuruyemis", ulke:"tr", onay:true, yildiz:5, icerik:"findik", katkiMaddeleri:[] },
  { ad:"Su", kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, por:250, kat:"Icecek", ulke:"tr", onay:true, yildiz:5, icerik:"su", katkiMaddeleri:[] },
  { ad:"Cay", kal:1, pro:0, karb:0.2, yag:0, lif:0, sod:3, por:200, kat:"Icecek", ulke:"tr", onay:true, yildiz:5, icerik:"cay, su", katkiMaddeleri:[] },
  { ad:"Turk Kahvesi", kal:2, pro:0.3, karb:0, yag:0, lif:0, sod:2, por:50, kat:"Icecek", ulke:"tr", onay:true, yildiz:4.5, icerik:"kahve, su", katkiMaddeleri:[] },
  { ad:"Portakal Suyu", kal:45, pro:0.7, karb:10, yag:0.2, lif:0.2, sod:1, por:200, kat:"Icecek", ulke:"tr", onay:true, yildiz:4, icerik:"portakal", katkiMaddeleri:[] },
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
