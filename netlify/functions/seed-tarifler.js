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
  {
    ad: "Mercimek Çorbası",
    adler: { tr:"Mercimek Çorbası", de:"Rote Linsensuppe", en:"Red Lentil Soup", fr:"Soupe aux Lentilles Rouges", es:"Sopa de Lentejas", it:"Zuppa di Lenticchie" },
    ulke: "tr", sure: 35, porsiyon: 4, zorluk: "kolay",
    malzemeler: [
      { ad:"Kırmızı Mercimek", miktar:200, birim:"g" },
      { ad:"Soğan", miktar:1, birim:"adet" },
      { ad:"Havuç", miktar:1, birim:"adet" },
      { ad:"Sarımsak", miktar:2, birim:"diş" },
      { ad:"Zeytinyağı", miktar:2, birim:"yemek kaşığı" },
      { ad:"Kimyon", miktar:1, birim:"çay kaşığı" },
      { ad:"Pul Biber", miktar:1, birim:"çay kaşığı" },
      { ad:"Su", miktar:1500, birim:"ml" },
    ],
    adimlar: [
      "Soğan ve havucu küçük doğrayın, zeytinyağında 5 dakika kavurun.",
      "Sarımsak ve kimyonu ekleyip 1 dakika daha kavurun.",
      "Yıkanmış mercimeği ekleyin, su ile örtün.",
      "Kaynayınca kısık ateşte 20 dakika pişirin.",
      "Blender ile pürüzsüz kıvama getirin.",
      "Üzerine pul biberli tereyağı gezdirerek servis yapın.",
    ],
    kalPorsiyon: 380,
    etiketler: ["çorba", "baklagil", "vejetaryen", "glutensiz", "kolay"],
    onay: true,
  },
  {
    ad: "İmam Bayıldı",
    adler: { tr:"İmam Bayıldı", de:"Gefüllte Auberginen", en:"Stuffed Aubergine", fr:"Aubergines Farcies", it:"Melanzane Ripiene" },
    ulke: "tr", sure: 60, porsiyon: 4, zorluk: "orta",
    malzemeler: [
      { ad:"Patlıcan", miktar:4, birim:"adet" },
      { ad:"Soğan", miktar:3, birim:"adet" },
      { ad:"Sarımsak", miktar:4, birim:"diş" },
      { ad:"Domates", miktar:4, birim:"adet" },
      { ad:"Maydanoz", miktar:1, birim:"demet" },
      { ad:"Zeytinyağı", miktar:100, birim:"ml" },
    ],
    adimlar: [
      "Patlıcanları almaşık soyup tuzlu suda 20 dakika bekletin.",
      "Soğan ve sarımsağı zeytinyağında pembeleşene kadar kavurun.",
      "Domatesleri rendeleyip ekleyin, 10 dakika pişirin.",
      "İç harcı patlıcanların içine doldurun.",
      "180°C fırında 40 dakika pişirin.",
    ],
    kalPorsiyon: 270,
    etiketler: ["ana yemek", "sebze", "vegan", "zeytinyağlı", "glutensiz"],
    onay: true,
  },
  {
    ad: "Sauerbraten",
    adler: { tr:"Alman Ekşi Eti", de:"Sauerbraten", en:"German Pot Roast", fr:"Rôti Mariné Allemand" },
    ulke: "de", sure: 180, porsiyon: 6, zorluk: "zor",
    malzemeler: [
      { ad:"Dana Antrikot", miktar:1200, birim:"g" },
      { ad:"Kırmızı Şarap Sirkesi", miktar:250, birim:"ml" },
      { ad:"Kırmızı Şarap", miktar:250, birim:"ml" },
      { ad:"Soğan", miktar:2, birim:"adet" },
      { ad:"Havuç", miktar:2, birim:"adet" },
      { ad:"Defne Yaprağı", miktar:3, birim:"adet" },
      { ad:"Lebkuchen", miktar:3, birim:"adet" },
    ],
    adimlar: [
      "Eti sirke, şarap, baharat ve sebzelerle 2-3 gün marine edin.",
      "Eti marine'den çıkarıp her tarafını yağda kızartın.",
      "Marine suyunu ekleyip kapakla 2.5 saat pişirin.",
      "Sosu süzün, lebkucheni rendeleyin, sosun içinde eritin.",
      "Sos koyulaşana kadar kaynatın, dilimlenmiş etle servis yapın.",
    ],
    kalPorsiyon: 600,
    etiketler: ["ana yemek", "et", "Alman mutfağı", "özel gün"],
    onay: true,
  },
  {
    ad: "Ratatouille",
    adler: { tr:"Ratatouille", de:"Ratatouille", en:"Ratatouille", es:"Ratatouille", it:"Ratatouille" },
    ulke: "fr", sure: 75, porsiyon: 4, zorluk: "orta",
    malzemeler: [
      { ad:"Patlıcan", miktar:2, birim:"adet" },
      { ad:"Kabak", miktar:2, birim:"adet" },
      { ad:"Kırmızı Biber", miktar:2, birim:"adet" },
      { ad:"Domates", miktar:4, birim:"adet" },
      { ad:"Soğan", miktar:1, birim:"adet" },
      { ad:"Sarımsak", miktar:3, birim:"diş" },
      { ad:"Zeytinyağı", miktar:60, birim:"ml" },
      { ad:"Taze Kekik", miktar:3, birim:"dal" },
    ],
    adimlar: [
      "Soğan ve sarımsağı zeytinyağında kavurun, domatesleri rendeleyip 15 dakika soslaştırın.",
      "Tüm sebzeleri çok ince yuvarlak dilimleyin.",
      "Fırın kabına domates sosunu yayın.",
      "Sebzeleri üst üste bindirerek sıralayın, zeytinyağı ve kekik serpin.",
      "180°C'de 45 dakika pişirin.",
    ],
    kalPorsiyon: 170,
    etiketler: ["ana yemek", "sebze", "vegan", "Fransız mutfağı", "fırın", "glutensiz"],
    onay: true,
  },
  {
    ad: "Spaghetti alla Carbonara",
    adler: { tr:"Karbonara", de:"Spaghetti Carbonara", en:"Spaghetti Carbonara", fr:"Carbonara", es:"Espaguetis Carbonara" },
    ulke: "it", sure: 20, porsiyon: 2, zorluk: "orta",
    malzemeler: [
      { ad:"Spaghetti", miktar:200, birim:"g" },
      { ad:"Guanciale veya Pastırma", miktar:100, birim:"g" },
      { ad:"Yumurta Sarısı", miktar:3, birim:"adet" },
      { ad:"Pecorino Romano", miktar:60, birim:"g" },
      { ad:"Karabiber", miktar:1, birim:"çay kaşığı" },
    ],
    adimlar: [
      "Makarnayı tuzlu suda al dente pişirin.",
      "Guanciale'yi tavada kavurun, ocaktan alın.",
      "Yumurta sarıları ve peyniri çırpın, bol karabiber ekleyin.",
      "Sıcak makarnayı guanciale'ye atın, ateş kapalı.",
      "Sos karışımını ekleyin, pişirme suyu ile kıvam verin — asla ateşe koymayın.",
    ],
    kalPorsiyon: 560,
    etiketler: ["makarna", "İtalyan mutfağı", "hızlı", "klasik"],
    onay: true,
  },
  {
    ad: "Paella Valenciana",
    adler: { tr:"Paella", de:"Paella Valenciana", en:"Valencian Paella", fr:"Paella Valenciana" },
    ulke: "es", sure: 60, porsiyon: 4, zorluk: "zor",
    malzemeler: [
      { ad:"Kısa Taneli Pirinç", miktar:320, birim:"g" },
      { ad:"Tavuk But", miktar:4, birim:"parça" },
      { ad:"Taze Fasulye", miktar:200, birim:"g" },
      { ad:"Domates", miktar:2, birim:"adet" },
      { ad:"Safran", miktar:1, birim:"tutam" },
      { ad:"Zeytinyağı", miktar:80, birim:"ml" },
      { ad:"Tavuk Suyu", miktar:800, birim:"ml" },
    ],
    adimlar: [
      "Safranı ılık suda 10 dakika bekletin.",
      "Tavukları paella tavasında altın rengi olana dek kızartın.",
      "Fasulye, sarımsak, domates ekleyip kavurun.",
      "Pirinci ekleyin, 2 dakika kavurun, sıcak suyu ve safranı dökün.",
      "Karıştırmadan 18 dakika kısık ateşte pişirin, son 2 dakika ateşi artırın.",
    ],
    kalPorsiyon: 620,
    etiketler: ["ana yemek", "pirinç", "İspanyol mutfağı", "özel gün", "glutensiz"],
    onay: true,
  },
  {
    ad: "Moussaka",
    adler: { tr:"Musaka", de:"Moussaka", en:"Moussaka", fr:"Moussaka", es:"Musaca", el:"Μουσακάς" },
    ulke: "el", sure: 90, porsiyon: 6, zorluk: "zor",
    malzemeler: [
      { ad:"Patlıcan", miktar:3, birim:"adet" },
      { ad:"Kuzu Kıyma", miktar:500, birim:"g" },
      { ad:"Soğan", miktar:2, birim:"adet" },
      { ad:"Konserve Domates", miktar:400, birim:"g" },
      { ad:"Tarçın", miktar:0.5, birim:"çay kaşığı" },
      { ad:"Süt", miktar:500, birim:"ml" },
      { ad:"Un", miktar:50, birim:"g" },
      { ad:"Tereyağı", miktar:50, birim:"g" },
      { ad:"Yumurta", miktar:2, birim:"adet" },
      { ad:"Gravyer", miktar:100, birim:"g" },
    ],
    adimlar: [
      "Patlıcanları tuzlayın, kurulayın, zeytinyağında kızartın.",
      "Soğan kavurun, kıymayı ekleyin, domates, tarçın, tuz ekleyip 15 dakika pişirin.",
      "Béchamel: tereyağı + un + süt, koyulaşınca ocaktan alıp yumurta ve peynir ekleyin.",
      "Tepsiye patlıcan — kıyma — patlıcan katmanları oluşturun.",
      "Béchamel'i dökün, 180°C'de 45 dakika pişirin.",
    ],
    kalPorsiyon: 600,
    etiketler: ["ana yemek", "et", "Yunan mutfağı", "fırın", "özel gün"],
    onay: true,
  },
  {
    ad: "Shepherd's Pie",
    adler: { tr:"Çoban Turtası", de:"Shepherd's Pie", en:"Shepherd's Pie", fr:"Tourte du Berger" },
    ulke: "en", sure: 70, porsiyon: 4, zorluk: "orta",
    malzemeler: [
      { ad:"Kuzu Kıyma", miktar:500, birim:"g" },
      { ad:"Patates", miktar:800, birim:"g" },
      { ad:"Soğan", miktar:1, birim:"adet" },
      { ad:"Havuç", miktar:2, birim:"adet" },
      { ad:"Bezelye", miktar:150, birim:"g" },
      { ad:"Et Suyu", miktar:300, birim:"ml" },
      { ad:"Tereyağı", miktar:50, birim:"g" },
      { ad:"Süt", miktar:100, birim:"ml" },
    ],
    adimlar: [
      "Patatesleri haşlayın, tereyağı ve sütle püre yapın.",
      "Soğan ve havucu kavurun, kıyma, et suyu ve bezelyeyi ekleyip 15 dakika pişirin.",
      "Karışımı fırın kabına aktarın, üzerine püre kaplayın.",
      "180°C'de 25 dakika, üzeri altın rengi olana kadar pişirin.",
    ],
    kalPorsiyon: 600,
    etiketler: ["ana yemek", "et", "İngiliz mutfağı", "fırın", "kış"],
    onay: true,
  },
  {
    ad: "Fårikål",
    adler: { tr:"Norveç Kuzu Güveci", de:"Fårikål", en:"Norwegian Lamb Stew", fr:"Ragoût d'Agneau Norvégien", no:"Fårikål" },
    ulke: "no", sure: 150, porsiyon: 4, zorluk: "kolay",
    malzemeler: [
      { ad:"Kuzu Eti (Kemikli)", miktar:1200, birim:"g" },
      { ad:"Beyaz Lahana", miktar:1000, birim:"g" },
      { ad:"Karabiber Tanesi", miktar:15, birim:"tane" },
      { ad:"Tuz", miktar:2, birim:"tatlı kaşığı" },
      { ad:"Su", miktar:500, birim:"ml" },
    ],
    adimlar: [
      "Lahanayı iri dilimleyin, eti büyük parçalara kesin.",
      "Tencereye kuzu ve lahana katmanları oluşturun, her katmana tuz ve karabiber serpin.",
      "Su ekleyip kaynayınca kısık ateşe alın.",
      "Kapakla 2-2.5 saat, et kemikten ayrılana kadar pişirin.",
      "Haşlanmış patatesle servis yapın.",
    ],
    kalPorsiyon: 700,
    etiketler: ["ana yemek", "et", "Norveç mutfağı", "geleneksel", "kış", "glutensiz"],
    onay: true,
  },
  {
    ad: "Bigos",
    adler: { tr:"Leh Avcı Yahnisi", de:"Bigos", en:"Hunter's Stew", fr:"Ragoût du Chasseur Polonais", pl:"Bigos" },
    ulke: "pl", sure: 120, porsiyon: 6, zorluk: "orta",
    malzemeler: [
      { ad:"Ekşi Lahana", miktar:500, birim:"g" },
      { ad:"Taze Lahana", miktar:300, birim:"g" },
      { ad:"Domuz Güveci Eti", miktar:300, birim:"g" },
      { ad:"Kielbasa Sosisi", miktar:200, birim:"g" },
      { ad:"Kuru Erik", miktar:50, birim:"g" },
      { ad:"Kuru Mantar", miktar:30, birim:"g" },
      { ad:"Kırmızı Şarap", miktar:150, birim:"ml" },
      { ad:"Defne Yaprağı", miktar:2, birim:"adet" },
    ],
    adimlar: [
      "Kuru mantarları ılık suda 30 dakika ıslatın, suyunu saklayın.",
      "Eti ve sosisi büyük tencerede kavurun.",
      "Ekşi lahana, taze lahana, mantar suyu, şarap ve baharatları ekleyin.",
      "Kısık ateşte 1.5 saat pişirin — bekledikçe lezzetlenir.",
    ],
    kalPorsiyon: 600,
    etiketler: ["ana yemek", "et", "Leh mutfağı", "geleneksel", "kış"],
    onay: true,
  },
];

exports.handler = async () => {
  try {
    initFirebase();
    const db = admin.firestore();

    // Daha önce eklenmiş mi kontrol et
    const mevcut = await db.collection("tarifler").limit(1).get();
    if (!mevcut.empty) {
      return {
        statusCode: 200,
        body: JSON.stringify({ mesaj: "⚠️ Tarifler zaten mevcut, tekrar eklenmedi." }),
      };
    }

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
    return {
      statusCode: 500,
      body: JSON.stringify({ hata: e.message }),
    };
  }
};
