import { useState, useRef, useEffect } from "react";
import {
  auth, db,
  googleGiris as fbGoogleGiris,
  cikisYap as fbCikis,
  kullaniciyiGetir,
  kullaniciyiGuncelle,
  tumKullanicilariGetir,
  postPaylas,
  postlariDinle,
  postSil,
  postGuncelle,
  sikayetGonder,
  sikayetleriGetir,
  sikayetGuncelle,
  istekleriDinle,
  gunVeriKaydet,
  tumGunleriGetir,
  besinGonder,
  onAuthStateChanged,
  sendEmailVerification,
} from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";

// ─── UID SAYAÇ — artık Firebase'de tutulur ───────────────────
function uidUret() { return "NTR-" + String(Math.floor(Math.random()*900000)+100000); }

// ─── DİL METİNLERİ ───────────────────────────────────────────
const LANG = {
  tr: {
    dilSec: "Dil Seçin",
    hosgeldin: "Hoşgeldin!",
    basla: "Başlayalım →",
    atla: "Geç",
    devam: "Devam →",
    slides: [
      {
        baslik: "10.000+ Besin",
        alt: "Kalori & Makro Takibi",
        acik: "Dev veritabanından saniyeler içinde ara, ekle. Protein, karbonhidrat, yağ ve vitamin değerlerini günlük olarak takip et.",
        renk: "#10b981",
        ic: ["Kalori & makro takibi","Öğün bazlı gruplama","Su & kilo takibi"],
        svgIkon: `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1" strokeLinecap="round"><path d="M3 3h18M3 9h18M3 15h18M3 21h18"/><circle cx="7" cy="12" r="2" fill="#34d399" stroke="none" opacity=".6"/></svg>`,
      },
      {
        baslik: "AI ile Analiz",
        alt: "Fotoğrafla Kalori Tara",
        acik: "Yemeğini fotoğrafla, yapay zeka tüm besin değerlerini anında hesaplasın. Öğünü tek tıkla günlüğüne ekle.",
        renk: "#6366f1",
        ic: ["Fotoğrafla besin tanıma","Anında kalori tahmini","Otomatik öğüne ekle"],
        svgIkon: `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/><circle cx="12" cy="13" r="1.5" fill="#a5b4fc" stroke="none" opacity=".6"/></svg>`,
      },
      {
        baslik: "AI Diyet Planı",
        alt: "Kişiselleştirilmiş Günlük Plan",
        acik: "Hedefine, alerjen ve beslenme tarzına göre her gün taze bir diyet planı oluşturulsun. Sabah kahvaltısından gece atıştırmalığına kadar.",
        renk: "#c8922a",
        ic: ["Günlük kişisel plan","Alerji & diyet uyumu","AI beslenme danışmanı"],
        svgIkon: `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#f0c14b" strokeWidth="1" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
      },
      {
        baslik: "Sağlık Takibi",
        alt: "Kilo · BMI · TDEE · Su",
        acik: "Kilo değişimini grafikle izle, BMI ve günlük kalori hedefini öğren. Su tüketiminizi kaydet, oruç saatlerini takip et.",
        renk: "#0891b2",
        ic: ["Kilo grafiği & BMI","TDEE hesaplama","Aralıklı oruç takibi"],
        svgIkon: `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
      },
    ],
  },
  en: {
    dilSec: "Select Language",
    hosgeldin: "Welcome!",
    basla: "Get Started →",
    atla: "Skip",
    devam: "Next →",
    slides: [
      {
        ikon: "kalori",
        baslik: "Eat Healthy with Doya",
        acik: "Log everything you eat in seconds. Track calories, protein and vitamins with 1,900+ foods from top Turkish & global brands.",
        renk: "#030604",
        vurgu: "#10b981",
        detaylar: ["10K+ besin", "Makro takibi", "Vitamin analizi"],
      },
      {
        ikon: "ai",
        baslik: "AI Photo Scanner",
        acik: "Snap a photo of your meal and let AI instantly calculate calories and macros. Premium Plus members get 10 scans per day.",
        renk: "#030604",
        vurgu: "#818cf8",
        detaylar: ["Fotoğrafla kaydet", "Anında analiz", "AI destekli"],
      },
      {
        ikon: "diyetisyen",
        baslik: "Your Personal AI Dietitian",
        acik: "Chat with your 24/7 AI dietitian anytime. Get personalized meal plans tailored to your goal, allergies, and diet style.",
        renk: "#030604",
        vurgu: "#34d399",
        detaylar: ["24/7 access", "Personal plans", "Allergy-aware"],
      },
      {
        ikon: "saglik",
        baslik: "Full Health Tracking",
        acik: "Track your weight with charts, monitor water intake, and practice intermittent fasting. Reach your goals.",
        renk: "#030604",
        vurgu: "#60a5fa",
        detaylar: ["Weight charts", "Water tracking", "Fasting mode"],
      },
    ],
  },
  de: {
    dilSec: "Sprache wählen",
    hosgeldin: "Willkommen!",
    basla: "Los geht's →",
    atla: "Überspringen",
    devam: "Weiter →",
    slides: [
      {
        ikon: "kalori",
        baslik: "Gesund essen mit Doya",
        acik: "Tracke alles was du isst in Sekunden. Kalorien, Protein, Kohlenhydrate und Vitamine — mit über 2.100 Lebensmitteln aus türkischen und deutschen Marken.",
        renk: "#030604",
        vurgu: "#10b981",
        detaylar: ["10K+ besin", "Makro takibi", "Vitamin analizi"],
      },
      {
        ikon: "ai",
        baslik: "KI-Fotoanalyse",
        acik: "Fotografiere dein Essen und lass die KI sofort Kalorien und Nährwerte berechnen. Premium Plus Mitglieder erhalten 10 Scans pro Tag.",
        renk: "#030604",
        vurgu: "#818cf8",
        detaylar: ["Fotoğrafla kaydet", "Anında analiz", "AI destekli"],
      },
      {
        ikon: "diyetisyen",
        baslik: "Dein KI-Ernährungsberater",
        acik: "Chatte jederzeit mit deinem 24/7 KI-Ernährungsberater. Persönliche Pläne nach Ziel und Allergien.",
        renk: "#030604",
        vurgu: "#34d399",
        detaylar: ["24/7 Zugang", "Persönliche Pläne", "Allergiebewusst"],
      },
      {
        ikon: "saglik",
        baslik: "Gesundheits-Tracking",
        acik: "Gewichtsverlauf mit Diagrammen, Wasserzähler und Intervallfasten. Analysiere deinen Körper.",
        renk: "#030604",
        vurgu: "#60a5fa",
        detaylar: ["Gewichtsdiagramm", "Wasserzähler", "Fastenmodus"],
      },
    ],
  },
  it: {
    dilSec: "Seleziona lingua",
    hosgeldin: "Benvenuto!",
    basla: "Iniziamo →",
    atla: "Salta",
    devam: "Avanti →",
    slides: [
      {
        ikon: "kalori",
        baslik: "Mangia sano con Doya",
        acik: "Registra tutto ciò che mangi in pochi secondi. Traccia calorie, proteine e vitamine con oltre 2.100 alimenti.",
        renk: "#030604",
        vurgu: "#10b981",
        detaylar: ["10K+ besin", "Makro takibi", "Vitamin analizi"],
      },
      {
        ikon: "ai",
        baslik: "Scanner AI per foto",
        acik: "Scatta una foto del tuo pasto e lascia che l'IA calcoli immediatamente calorie e macros.",
        renk: "#030604",
        vurgu: "#818cf8",
        detaylar: ["Fotoğrafla kaydet", "Anında analiz", "AI destekli"],
      },
      {
        ikon: "diyetisyen",
        baslik: "Il Tuo Dietologo AI",
        acik: "Chatta con il tuo dietologo AI 24/7. Piani alimentari personalizzati.",
        renk: "#030604",
        vurgu: "#34d399",
        detaylar: ["Accesso 24/7", "Piani personali", "Allergie-friendly"],
      },
      {
        ikon: "saglik",
        baslik: "Monitoraggio Salute",
        acik: "Traccia peso, acqua e digiuno intermittente.",
        renk: "#030604",
        vurgu: "#60a5fa",
        detaylar: ["Grafico peso", "Acqua", "Digiuno"],
      },
    ],
  },
  fr: {
    dilSec: "Choisir la langue",
    hosgeldin: "Bienvenue !",
    basla: "Commençons →",
    atla: "Passer",
    devam: "Suivant →",
    slides: [
      {
        ikon: "kalori",
        baslik: "Mangez sainement avec Doya",
        acik: "Enregistrez tout ce que vous mangez en quelques secondes. Suivez calories, protéines et vitamines avec plus de 2 100 aliments.",
        renk: "#030604",
        vurgu: "#10b981",
        detaylar: ["10K+ besin", "Makro takibi", "Vitamin analizi"],
      },
      {
        ikon: "ai",
        baslik: "Scanner IA par photo",
        acik: "Photographiez votre repas et laissez l'IA calculer instantanément les calories et les macros.",
        renk: "#030604",
        vurgu: "#818cf8",
        detaylar: ["Fotoğrafla kaydet", "Anında analiz", "AI destekli"],
      },
      {
        ikon: "diyetisyen",
        baslik: "Votre Diététicien IA",
        acik: "Discutez avec votre diététicien IA 24/7. Plans alimentaires personnalisés.",
        renk: "#030604",
        vurgu: "#34d399",
        detaylar: ["Accès 24/7", "Plans personnels", "Allergie-adapté"],
      },
      {
        ikon: "saglik",
        baslik: "Suivi Santé",
        acik: "Poids, eau et jeûne intermittent — suivez tout.",
        renk: "#030604",
        vurgu: "#60a5fa",
        detaylar: ["Graphique poids", "Eau", "Jeûne"],
      },
    ],
  },
  es: {
    dilSec: "Seleccionar idioma",
    hosgeldin: "¡Bienvenido!",
    basla: "Empecemos →",
    atla: "Saltar",
    devam: "Siguiente →",
    slides: [
      {
        ikon: "kalori",
        baslik: "Come sano con Doya",
        acik: "Registra todo lo que comes en segundos. Rastrea calorías, proteínas y vitaminas con más de 2.100 alimentos.",
        renk: "#030604",
        vurgu: "#10b981",
        detaylar: ["10K+ besin", "Makro takibi", "Vitamin analizi"],
      },
      {
        ikon: "ai",
        baslik: "Escáner IA por foto",
        acik: "Fotografía tu comida y deja que la IA calcule al instante las calorías y macros.",
        renk: "#030604",
        vurgu: "#818cf8",
        detaylar: ["Fotoğrafla kaydet", "Anında analiz", "AI destekli"],
      },
      {
        ikon: "diyetisyen",
        baslik: "Tu Dietista IA Personal",
        acik: "Habla con tu dietista IA 24/7. Planes personalizados.",
        renk: "#030604",
        vurgu: "#34d399",
        detaylar: ["Acceso 24/7", "Planes personales", "Sin alérgenos"],
      },
      {
        ikon: "saglik",
        baslik: "Seguimiento de Salud",
        acik: "Peso, agua y ayuno intermitente — todo en uno.",
        renk: "#030604",
        vurgu: "#60a5fa",
        detaylar: ["Gráfico peso", "Agua", "Ayuno"],
      },
    ],
  },
};

// ─── SABİTLER ────────────────────────────────────────────────
const DESTEK_MAIL   = "Doyasupport@gmail.com";
const ORTAKLIK_MAIL = "Doyasupport@gmail.com";
const PREMIUM_FIYAT = 100;        // aylık ₺ (reklamsız)
const PREMIUM_YILLIK = 900;       // yıllık ₺ (2 ay bedava)
const PREMIUM_PLUS_YILLIK = 990;  // yıllık ₺ premium plus
const PREMIUM_PLUS_FIYAT = 110;   // aylık ₺ (AI + reklamsız)
const AI_GUNLUK_LIMIT = 10;
const GUNLUK_MAX_PUAN = 750; // Günlük kazanılabilir max puan (manipülasyon önleme) // premium plus günlük fotoğraf hakkı
const AYLAR  = ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"];
const GUNLER = ["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"];

const AKTIVITE_ETIKET = {
  sedanter : "Hareketsiz (spor yapmıyorum)",
  hafif    : "Hafif aktif (haftada 1-2 gün)",
  orta     : "Orta aktif (haftada 3-5 gün)",
  aktif    : "Aktif (haftada 5-6 gün)",
  cokAktif : "Çok aktif (her gün yoğun spor)",
};

const YEMEK_KAT = ["Kahvaltı","Öğle Yemeği","Akşam Yemeği","Atıştırmalık","İçecek","Diğer"];

// Spor listesi — MET değerleri tempo'ya göre
const SPOR_LISTESI = [
  { id:"yuruyus",  ad:"Yürüyüş",              ikon:"🚶", met:{ hafif:2.5, orta:3.8, yuksek:5.0 } },
  { id:"kosma",    ad:"Koşma",                 ikon:"🏃", met:{ hafif:6.0, orta:8.5, yuksek:11.0 } },
  { id:"bisiklet", ad:"Bisiklet",              ikon:"🚴", met:{ hafif:4.0, orta:6.5, yuksek:10.0 } },
  { id:"yuzme",    ad:"Yüzme",                 ikon:"🏊", met:{ hafif:4.0, orta:6.0, yuksek:8.5 } },
  { id:"fitness",  ad:"Fitness / Ağırlık",     ikon:"🏋️", met:{ hafif:3.0, orta:5.0, yuksek:7.0 } },
  { id:"yoga",     ad:"Yoga / Pilates",        ikon:"🧘", met:{ hafif:2.0, orta:2.8, yuksek:3.5 } },
  { id:"dans",     ad:"Dans / Zumba",          ikon:"💃", met:{ hafif:3.0, orta:5.0, yuksek:7.5 } },
  { id:"futbol",   ad:"Futbol",                ikon:"⚽", met:{ hafif:5.0, orta:7.0, yuksek:9.5 } },
  { id:"basketbol",ad:"Basketbol",             ikon:"🏀", met:{ hafif:4.5, orta:6.5, yuksek:8.5 } },
  { id:"tenis",    ad:"Tenis",                 ikon:"🎾", met:{ hafif:4.0, orta:6.0, yuksek:8.0 } },
  { id:"voleybol", ad:"Voleybol",              ikon:"🏐", met:{ hafif:3.0, orta:4.5, yuksek:6.5 } },
  { id:"ip",       ad:"İp Atlama",             ikon:"🪢", met:{ hafif:7.0, orta:10.0,yuksek:12.0 } },
  { id:"hiit",     ad:"HIIT / Kardiyo",        ikon:"🔥", met:{ hafif:6.0, orta:9.0, yuksek:12.0 } },
  { id:"doga",     ad:"Doğa Yürüyüşü (Trekking)",ikon:"🥾",met:{ hafif:4.0, orta:6.0, yuksek:8.0 } },
  { id:"kayak",    ad:"Kayak",                 ikon:"⛷️", met:{ hafif:5.0, orta:7.0, yuksek:9.5 } },
  { id:"pilates",  ad:"Pilates",               ikon:"🤸", met:{ hafif:2.0, orta:3.0, yuksek:4.0 } },
  { id:"kalistenik",ad:"Kalistenik",           ikon:"💪", met:{ hafif:3.5, orta:5.5, yuksek:8.0 } },
  { id:"crossfit", ad:"CrossFit",              ikon:"🏋️", met:{ hafif:7.0, orta:10.0,yuksek:13.0 } },
  { id:"boks",     ad:"Boks / Kickboks",       ikon:"🥊", met:{ hafif:5.0, orta:8.0, yuksek:11.0 } },
  { id:"gulres",   ad:"Güreş / Judo",          ikon:"🥋", met:{ hafif:5.0, orta:7.5, yuksek:10.0 } },
  { id:"squash",   ad:"Squash / Badminton",    ikon:"🏸", met:{ hafif:5.0, orta:7.5, yuksek:10.0 } },
  { id:"golf",     ad:"Golf",                  ikon:"⛳", met:{ hafif:2.5, orta:3.5, yuksek:4.5 } },
  { id:"satilik",  ad:"Satranç / Masa Oyunu",  ikon:"♟️", met:{ hafif:1.5, orta:1.5, yuksek:1.5 } },
  { id:"kano",     ad:"Kano / Kürek",          ikon:"🛶", met:{ hafif:3.5, orta:6.0, yuksek:8.0 } },
  { id:"surf",     ad:"Sörf / Stand-up Paddle",ikon:"🏄", met:{ hafif:3.0, orta:5.0, yuksek:7.5 } },
  { id:"trampolın",ad:"Trambolin",             ikon:"🤸", met:{ hafif:3.5, orta:5.5, yuksek:7.5 } },
  { id:"bahce",    ad:"Bahçe İşleri",          ikon:"🌱", met:{ hafif:2.5, orta:3.5, yuksek:4.5 } },
  { id:"evtemizlik",ad:"Ev Temizliği",         ikon:"🧹", met:{ hafif:2.0, orta:3.0, yuksek:4.0 } },
  { id:"diger",    ad:"Diğer Aktivite",        ikon:"🏅", met:{ hafif:3.0, orta:5.0, yuksek:7.0 } },
];

// ─── BESİN VERİTABANI ────────────────────────────────────────
// Kaynak: USDA FoodData Central, TÜBİTAK Besin Tablosu, Türk Gıda Kodeksi
// Tüm değerler 100g baz alınarak hesaplanmıştır (por farklıysa orantılıdır)
const BESIN_DB = [
  // ── TAHIl ──
  { id:1,   ad:"Yulaf Ezmesi",          marka:"", kal:389, pro:17,   karb:66,  yag:7,   lif:11,  sod:6,   demir:4.7, kals:54,  vitC:0,    vitD:0,    vitB12:0,    acik:85, por:100, aclik:"3-4 saat", onay:true, kat:"Tahıl", yildiz:5 },
  { id:2,   ad:"Beyaz Ekmek",           marka:"", kal:265, pro:9,    karb:51,  yag:3.2, lif:2.7, sod:491, demir:2.7, kals:151, vitC:0,    vitD:0,    vitB12:0,    acik:30, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:1.5 },
  { id:3,   ad:"Tam Buğday Ekmeği",     marka:"", kal:247, pro:13,   karb:41,  yag:3.4, lif:7,   sod:400, demir:2.5, kals:107, vitC:0,    vitD:0,    vitB12:0,    acik:55, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4 },
  { id:4,   ad:"Pilav (Pişmiş)",        marka:"", kal:130, pro:2.7,  karb:28,  yag:0.3, lif:0.4, sod:1,   demir:0.4, kals:10,  vitC:0,    vitD:0,    vitB12:0,    acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2.5 },
  { id:5,   ad:"Bulgur Pilavı",         marka:"", kal:151, pro:5.6,  karb:29,  yag:1.3, lif:4.5, sod:8,   demir:1.4, kals:32,  vitC:0,    vitD:0,    vitB12:0,    acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4 },
  { id:6,   ad:"Makarna (Pişmiş)",      marka:"", kal:158, pro:5.8,  karb:31,  yag:0.9, lif:1.8, sod:1,   demir:1.3, kals:7,   vitC:0,    vitD:0,    vitB12:0,    acik:40, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2.5 },
  { id:7,   ad:"Kepekli Makarna",       marka:"", kal:149, pro:5.5,  karb:29,  yag:0.9, lif:3.9, sod:3,   demir:1.4, kals:21,  vitC:0,    vitD:0,    vitB12:0,    acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:3 },
  { id:8,   ad:"Müsli",                 marka:"", kal:368, pro:10,   karb:66,  yag:6.3, lif:7.5, sod:35,  demir:3.6, kals:76,  vitC:0,    vitD:0,    vitB12:0,    acik:70, por:100,  aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4 },
  { id:9,   ad:"Simit",                 marka:"", kal:294, pro:9.5,  karb:55,  yag:4.5, lif:2.3, sod:380, demir:2.1, kals:36,  vitC:0,    vitD:0,    vitB12:0,    acik:35, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:1.5 },
  { id:10,  ad:"Galeta Unu / Kırık Buğday",marka:"",kal:348,pro:9.8,karb:72,  yag:1.4, lif:2.0, sod:12,  demir:2.8, kals:28,  vitC:0,    vitD:0,    vitB12:0,    acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2.5 },
];


// ─── DEMO VERİLER ───────────────────────────────────────────────

// ─── YARDIMCI FONKSİYONLAR ───────────────────────────────────
function tarihKey(d){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function bugunKey(){ return tarihKey(new Date()); }
function bmiHesapla(k,b){ if(!k||!b)return null; return +(k/((b/100)**2)).toFixed(1); }
function bmiDurum(v){
  if(!v)return null;
  if(v<18.5) return { etiket:"Zayıf",       renk:"#3b82f6", acik:"Kilo almanız önerilir." };
  if(v<25)   return { etiket:"Normal",       renk:"#22c55e", acik:"Kilonuz ideal aralıkta!" };
  if(v<30)   return { etiket:"Fazla Kilolu", renk:"#f59e0b", acik:"Kilo vermeniz önerilir." };
  if(v<35)   return { etiket:"Obez I",       renk:"#ef4444", acik:"Sağlık riski var." };
  return       { etiket:"Obez II+",     renk:"#7f1d1d", acik:"Ciddi risk. Uzman görünüz." };
}
function tdeeHesapla(k,b,y,c,a){
  if(!k||!b||!y)return null;
  const bmr=c==="erkek"?10*k+6.25*b-5*y+5:10*k+6.25*b-5*y-161;
  return Math.round(bmr*({ sedanter:1.2, hafif:1.375, orta:1.55, aktif:1.725, cokAktif:1.9 }[a]||1.2));
}
function suHedHesapla(k,a){ return Math.round((k||60)*33+({ sedanter:0, hafif:300, orta:500, aktif:700, cokAktif:900 }[a]||0)); }
function sporKcal(met,sure,kilo){ return Math.round((met*3.5*(kilo||70)*sure)/200); }
function gramKalHesapla(bKal,bPor,gram){ return Math.round((bKal/(bPor||100))*(gram||100)); }
function acikRenk(s){ return s>=70?"#22c55e":s>=45?"#f59e0b":"#ef4444"; }
function acikEtiket(s){ return s>=70?"Çok Doyurucu":s>=45?"Orta Doyurucu":"Az Doyurucu"; }
function YildizGoster({v=3,boyut=12}){
  const stars=[];
  for(let i=1;i<=5;i++){
    if(v>=i) stars.push(<span key={i} style={{color:"#f59e0b",fontSize:boyut,lineHeight:1}}>★</span>);
    else if(v>=i-0.5) stars.push(
      <span key={i} style={{position:"relative",display:"inline-block",fontSize:boyut,lineHeight:1}}>
        <span style={{color:"#d1d5db"}}>★</span>
        <span style={{position:"absolute",left:0,top:0,width:"50%",overflow:"hidden",color:"#f59e0b"}}>★</span>
      </span>
    );
    else stars.push(<span key={i} style={{color:"#d1d5db",fontSize:boyut,lineHeight:1}}>★</span>);
  }
  return <span style={{display:"inline-flex",gap:0}}>{stars}</span>;
}


// ─── EGZERSİZ ANİMASYON BİLEŞENİ ────────────────────────────
function EgzersizAnim({egzId, ikon}) {
  const tip = (()=>{
    const id = (egzId||"").toLowerCase();
    if(id.includes("sinav")||id.includes("push")||id.includes("sikistirma")) return "sinav";
    if(id.includes("squat")||id.includes("comelme")) return "squat";
    if(id.includes("barfix")||id.includes("pullup")||id.includes("pull")) return "barfix";
    if(id.includes("curl")||id.includes("biceps")||id.includes("dambil")) return "curl";
    if(id.includes("plank")) return "plank";
    if(id.includes("lunge")||id.includes("akbasa")) return "lunge";
    if(id.includes("omuz")||id.includes("press")||id.includes("militar")||id.includes("shoulder")) return "press";
    if(id.includes("mekik")||id.includes("situp")||id.includes("crunch")) return "mekik";
    if(id.includes("kos")||id.includes("sprint")||id.includes("kardi")||id.includes("jump")) return "kos";
    if(id.includes("dips")||id.includes("triceps")) return "dips";
    return null;
  })();

  // Renk paleti - temiz minimal
  const SK = "#f0d0b0";   // ten
  const LN = "#34d399";   // emerald - çizgi rengi (dark theme)
  const AC = "#10b981";   // accent
  const GD = "#1a2e1e";   // zemin

  const css = `
    @keyframes ea-pushup   { 0%,100%{transform:translateY(0)} 45%,55%{transform:translateY(13px)} }
    @keyframes ea-squat    { 0%,100%{transform:translateY(0) scaleY(1)} 45%,55%{transform:translateY(10px) scaleY(0.82)} }
    @keyframes ea-pullup   { 0%,100%{transform:translateY(0)} 45%,55%{transform:translateY(-20px)} }
    @keyframes ea-arm-up   { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(-80deg)} }
    @keyframes ea-press-a  { 0%,100%{transform:rotate(50deg)} 45%,55%{transform:rotate(10deg)} }
    @keyframes ea-torso    { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(-40deg)} }
    @keyframes ea-leg-f    { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(30deg)} }
    @keyframes ea-leg-b    { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-30deg)} }
    @keyframes ea-arm-f    { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-40deg)} }
    @keyframes ea-arm-bk   { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(40deg)} }
    @keyframes ea-run-x    { 0%,100%{transform:translateX(-3px)} 50%{transform:translateX(3px)} }
    @keyframes ea-dips-y   { 0%,100%{transform:translateY(0)} 45%,55%{transform:translateY(18px)} }
    @keyframes ea-lunge-y  { 0%,100%{transform:translateY(0)} 45%,55%{transform:translateY(9px)} }
    @keyframes ea-dot      { 0%,100%{opacity:.2} 50%{opacity:.9} }
    .p-ud  { animation: ea-pushup 1.6s cubic-bezier(.45,0,.55,1) infinite }
    .p-sq  { animation: ea-squat 1.8s cubic-bezier(.45,0,.55,1) infinite; transform-origin: 50% 100% }
    .p-pu  { animation: ea-pullup 1.6s cubic-bezier(.45,0,.55,1) infinite }
    .p-au  { animation: ea-arm-up 1.4s cubic-bezier(.45,0,.55,1) infinite; transform-origin: 50% 0% }
    .p-pa  { animation: ea-press-a 1.4s cubic-bezier(.45,0,.55,1) infinite; transform-origin: 50% 0% }
    .p-tor { animation: ea-torso 1.5s cubic-bezier(.45,0,.55,1) infinite; transform-origin: 50% 100% }
    .p-lf  { animation: ea-leg-f .7s cubic-bezier(.45,0,.55,1) infinite; transform-origin: 50% 0% }
    .p-lb  { animation: ea-leg-b .7s cubic-bezier(.45,0,.55,1) infinite; transform-origin: 50% 0% }
    .p-af  { animation: ea-arm-f .7s cubic-bezier(.45,0,.55,1) infinite; transform-origin: 50% 0% }
    .p-ab  { animation: ea-arm-bk .7s cubic-bezier(.45,0,.55,1) infinite; transform-origin: 50% 0% }
    .p-rx  { animation: ea-run-x .7s ease-in-out infinite }
    .p-di  { animation: ea-dips-y 1.5s cubic-bezier(.45,0,.55,1) infinite }
    .p-lu  { animation: ea-lunge-y 1.6s cubic-bezier(.45,0,.55,1) infinite; transform-origin:50% 0% }
    .p-dot { animation: ea-dot 1.6s ease-in-out infinite }
  `;

  // ── Yardımcı: stick figure parçaları ──
  // Çizgi kalınlığı, yuvarlak uçlar
  const sw = 5;    // stroke-width gövde
  const sw2 = 4;   // uzuvlar
  const sw3 = 3;   // ince

  const svgs = {

    // ── ŞINAV ──────────────────────────────────────
    sinav: (
      <svg viewBox="0 0 200 120" width="100%" height="100%">
        <style>{css}</style>
        {/* Zemin */}
        <line x1="10" y1="108" x2="190" y2="108" stroke={LN} strokeWidth="2" strokeLinecap="round" opacity=".25"/>
        <g className="p-ud">
          {/* Kollar */}
          <line x1="40" y1="108" x2="60" y2="78" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="148" y1="108" x2="128" y2="78" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          {/* Gövde */}
          <line x1="60" y1="78" x2="128" y2="78" stroke={LN} strokeWidth={sw} strokeLinecap="round"/>
          {/* Baş */}
          <circle cx="140" cy="66" r="12" fill="none" stroke={SK} strokeWidth={sw2}/>
          {/* Bacaklar */}
          <line x1="80" y1="78" x2="75" y2="108" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="105" y1="78" x2="108" y2="108" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        </g>
        {/* Etiket */}
        <text x="100" y="14" textAnchor="middle" fill={LN} fontSize="10" fontWeight="700" fontFamily="system-ui" opacity=".7">ŞINAV</text>
        {/* Yön oku */}
        <g className="p-dot" style={{transformOrigin:"100px 90px"}}>
          <path d="M96 96 L96 86 L93 90 M96 86 L99 90" stroke={AC} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </g>
      </svg>
    ),

    // ── SQUAT ──────────────────────────────────────
    squat: (
      <svg viewBox="0 0 200 140" width="100%" height="100%">
        <style>{css}</style>
        <line x1="30" y1="128" x2="170" y2="128" stroke={LN} strokeWidth="2" strokeLinecap="round" opacity=".25"/>
        {/* Baş her zaman sabit */}
        <circle cx="100" cy="22" r="13" fill="none" stroke={SK} strokeWidth={sw2}/>
        <g className="p-sq">
          {/* Gövde */}
          <line x1="100" y1="35" x2="100" y2="68" stroke={LN} strokeWidth={sw} strokeLinecap="round"/>
          {/* Kollar */}
          <line x1="100" y1="45" x2="68" y2="55" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="100" y1="45" x2="132" y2="55" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          {/* Bacaklar - kalça ekleminden */}
          <line x1="100" y1="68" x2="72" y2="100" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="72" y1="100" x2="65" y2="128" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="100" y1="68" x2="128" y2="100" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="128" y1="100" x2="135" y2="128" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        </g>
        <text x="100" y="14" textAnchor="middle" fill={LN} fontSize="10" fontWeight="700" fontFamily="system-ui" opacity=".7">SQUAT</text>
        <g className="p-dot"><path d="M100 118 L100 108 L97 112 M100 108 L103 112" stroke={AC} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></g>
      </svg>
    ),

    // ── BARFİKS ────────────────────────────────────
    barfix: (
      <svg viewBox="0 0 200 150" width="100%" height="100%">
        <style>{css}</style>
        {/* Bar */}
        <line x1="20" y1="22" x2="180" y2="22" stroke={LN} strokeWidth="8" strokeLinecap="round" opacity=".6"/>
        <g className="p-pu">
          {/* Baş */}
          <circle cx="100" cy="44" r="13" fill="none" stroke={SK} strokeWidth={sw2}/>
          {/* Kollar */}
          <line x1="100" y1="35" x2="72" y2="22" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="100" y1="35" x2="128" y2="22" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          {/* Gövde */}
          <line x1="100" y1="57" x2="100" y2="95" stroke={LN} strokeWidth={sw} strokeLinecap="round"/>
          {/* Bacaklar sarkan */}
          <line x1="100" y1="95" x2="88" y2="130" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="88" y1="130" x2="92" y2="146" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="100" y1="95" x2="112" y2="130" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="112" y1="130" x2="108" y2="146" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        </g>
        <text x="100" y="138" textAnchor="middle" fill={LN} fontSize="10" fontWeight="700" fontFamily="system-ui" opacity=".7">BARFİKS</text>
        <g className="p-dot"><path d="M100 80 L100 70 L97 74 M100 70 L103 74" stroke={AC} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></g>
      </svg>
    ),

    // ── BİSEPS CURL ────────────────────────────────
    curl: (
      <svg viewBox="0 0 200 150" width="100%" height="100%">
        <style>{css}</style>
        <line x1="30" y1="138" x2="170" y2="138" stroke={LN} strokeWidth="2" strokeLinecap="round" opacity=".25"/>
        {/* Baş */}
        <circle cx="100" cy="22" r="13" fill="none" stroke={SK} strokeWidth={sw2}/>
        {/* Gövde */}
        <line x1="100" y1="35" x2="100" y2="85" stroke={LN} strokeWidth={sw} strokeLinecap="round"/>
        {/* Sol kol sabit */}
        <line x1="100" y1="50" x2="130" y2="68" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        <line x1="130" y1="68" x2="138" y2="90" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        {/* Dambıl sağ sabit */}
        <rect x="130" y="86" width="18" height="7" rx="3.5" fill={LN} opacity=".5"/>
        {/* Sağ kol hareketli */}
        <g className="p-au" style={{transformOrigin:"70px 50px"}}>
          <line x1="100" y1="50" x2="70" y2="68" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="70" y1="68" x2="58" y2="46" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          {/* Dambıl sol */}
          <rect x="48" y="40" width="18" height="7" rx="3.5" fill={LN} opacity=".7"/>
        </g>
        {/* Bacaklar */}
        <line x1="100" y1="85" x2="88" y2="120" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        <line x1="88" y1="120" x2="84" y2="138" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        <line x1="100" y1="85" x2="112" y2="120" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        <line x1="112" y1="120" x2="116" y2="138" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        <text x="100" y="14" textAnchor="middle" fill={LN} fontSize="10" fontWeight="700" fontFamily="system-ui" opacity=".7">BİSEPS CURL</text>
        <g className="p-dot"><path d="M56 52 L56 42 L53 46 M56 42 L59 46" stroke={AC} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></g>
      </svg>
    ),

    // ── PLANK ──────────────────────────────────────
    plank: (
      <svg viewBox="0 0 220 100" width="100%" height="100%">
        <style>{css}</style>
        <line x1="10" y1="90" x2="210" y2="90" stroke={LN} strokeWidth="2" strokeLinecap="round" opacity=".25"/>
        {/* Gövde düz */}
        <line x1="52" y1="72" x2="162" y2="68" stroke={LN} strokeWidth={sw} strokeLinecap="round"/>
        {/* Baş */}
        <circle cx="174" cy="60" r="12" fill="none" stroke={SK} strokeWidth={sw2}/>
        {/* Ön kollar */}
        <line x1="130" y1="70" x2="128" y2="90" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        <line x1="156" y1="69" x2="154" y2="90" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        {/* Bacaklar */}
        <line x1="52" y1="72" x2="44" y2="90" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        {/* Nefes animasyonu */}
        <g className="p-dot">
          <circle cx="110" cy="68" r="4" fill={AC} opacity=".6"/>
        </g>
        <text x="110" y="14" textAnchor="middle" fill={LN} fontSize="10" fontWeight="700" fontFamily="system-ui" opacity=".7">PLANK — SABİT TUT</text>
        {/* Çekirdek oku */}
        <line x1="90" y1="58" x2="140" y2="56" stroke={AC} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" opacity=".4" className="p-dot"/>
      </svg>
    ),

    // ── LUNGE ──────────────────────────────────────
    lunge: (
      <svg viewBox="0 0 200 150" width="100%" height="100%">
        <style>{css}</style>
        <line x1="20" y1="138" x2="180" y2="138" stroke={LN} strokeWidth="2" strokeLinecap="round" opacity=".25"/>
        {/* Baş */}
        <circle cx="100" cy="22" r="13" fill="none" stroke={SK} strokeWidth={sw2}/>
        <g className="p-lu" style={{transformOrigin:"100px 36px"}}>
          {/* Gövde */}
          <line x1="100" y1="35" x2="100" y2="80" stroke={LN} strokeWidth={sw} strokeLinecap="round"/>
          {/* Kollar */}
          <line x1="100" y1="50" x2="72" y2="62" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="100" y1="50" x2="128" y2="62" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          {/* Bacak ileri */}
          <line x1="100" y1="80" x2="68" y2="110" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="68" y1="110" x2="58" y2="138" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          {/* Bacak geri */}
          <line x1="100" y1="80" x2="128" y2="108" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="128" y1="108" x2="138" y2="138" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        </g>
        <text x="100" y="14" textAnchor="middle" fill={LN} fontSize="10" fontWeight="700" fontFamily="system-ui" opacity=".7">LUNGE</text>
        <g className="p-dot"><path d="M100 120 L100 110 L97 114 M100 110 L103 114" stroke={AC} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></g>
      </svg>
    ),

    // ── OMUZ PRESS ─────────────────────────────────
    press: (
      <svg viewBox="0 0 200 155" width="100%" height="100%">
        <style>{css}</style>
        <line x1="30" y1="144" x2="170" y2="144" stroke={LN} strokeWidth="2" strokeLinecap="round" opacity=".25"/>
        {/* Baş */}
        <circle cx="100" cy="32" r="13" fill="none" stroke={SK} strokeWidth={sw2}/>
        {/* Gövde */}
        <line x1="100" y1="45" x2="100" y2="95" stroke={LN} strokeWidth={sw} strokeLinecap="round"/>
        {/* Sol kol hareketli */}
        <g className="p-pa" style={{transformOrigin:"100px 55px"}}>
          <line x1="100" y1="55" x2="64" y2="72" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="64" y1="72" x2="48" y2="44" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          {/* Dambıl sol */}
          <rect x="36" y="36" width="18" height="7" rx="3.5" fill={LN} opacity=".7"/>
        </g>
        {/* Sağ kol hareketli (ters delay) */}
        <g className="p-pa" style={{transformOrigin:"100px 55px",animationDelay:"0s",transform:"scaleX(-1)",transformOrigin:"100px 55px"}}>
          <line x1="100" y1="55" x2="136" y2="72" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="136" y1="72" x2="152" y2="44" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <rect x="146" y="36" width="18" height="7" rx="3.5" fill={LN} opacity=".7"/>
        </g>
        {/* Bacaklar */}
        <line x1="100" y1="95" x2="86" y2="126" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        <line x1="86" y1="126" x2="82" y2="144" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        <line x1="100" y1="95" x2="114" y2="126" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        <line x1="114" y1="126" x2="118" y2="144" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        <text x="100" y="20" textAnchor="middle" fill={LN} fontSize="10" fontWeight="700" fontFamily="system-ui" opacity=".7">OMUZ PRESS</text>
        <g className="p-dot"><path d="M100 50 L100 40 L97 44 M100 40 L103 44" stroke={AC} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></g>
      </svg>
    ),

    // ── MEKİK ──────────────────────────────────────
    mekik: (
      <svg viewBox="0 0 200 130" width="100%" height="100%">
        <style>{css}</style>
        <line x1="20" y1="120" x2="180" y2="120" stroke={LN} strokeWidth="2" strokeLinecap="round" opacity=".25"/>
        {/* Bacaklar yerde sabit */}
        <line x1="115" y1="100" x2="162" y2="120" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        <line x1="110" y1="104" x2="155" y2="120" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        {/* Üst vücut hareketli */}
        <g className="p-tor" style={{transformOrigin:"113px 100px"}}>
          {/* Gövde */}
          <line x1="113" y1="100" x2="72" y2="82" stroke={LN} strokeWidth={sw} strokeLinecap="round"/>
          {/* Baş */}
          <circle cx="62" cy="74" r="12" fill="none" stroke={SK} strokeWidth={sw2}/>
          {/* Kollar */}
          <line x1="88" y1="88" x2="72" y2="68" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="96" y1="85" x2="82" y2="64" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        </g>
        <text x="100" y="14" textAnchor="middle" fill={LN} fontSize="10" fontWeight="700" fontFamily="system-ui" opacity=".7">MEKİK</text>
        <g className="p-dot"><path d="M76 68 L76 58 L73 62 M76 58 L79 62" stroke={AC} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></g>
      </svg>
    ),

    // ── KOŞU / KARDİYO ─────────────────────────────
    kos: (
      <svg viewBox="0 0 200 145" width="100%" height="100%">
        <style>{css}</style>
        <line x1="10" y1="132" x2="190" y2="132" stroke={LN} strokeWidth="2" strokeLinecap="round" opacity=".25"/>
        <g className="p-rx">
          {/* Baş */}
          <circle cx="116" cy="28" r="13" fill="none" stroke={SK} strokeWidth={sw2}/>
          {/* Gövde eğik */}
          <line x1="112" y1="41" x2="100" y2="80" stroke={LN} strokeWidth={sw} strokeLinecap="round"/>
          {/* Kol ileri */}
          <g className="p-af" style={{transformOrigin:"108px 52px"}}>
            <line x1="108" y1="52" x2="78" y2="42" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          </g>
          {/* Kol geri */}
          <g className="p-ab" style={{transformOrigin:"108px 52px"}}>
            <line x1="108" y1="52" x2="136" y2="46" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          </g>
          {/* Bacak ileri */}
          <g className="p-lf" style={{transformOrigin:"100px 80px"}}>
            <line x1="100" y1="80" x2="78" y2="112" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
            <line x1="78" y1="112" x2="62" y2="132" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          </g>
          {/* Bacak geri */}
          <g className="p-lb" style={{transformOrigin:"100px 80px"}}>
            <line x1="100" y1="80" x2="122" y2="108" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
            <line x1="122" y1="108" x2="138" y2="128" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          </g>
        </g>
        {/* Hareket çizgileri */}
        {[0,1,2].map(i=>(
          <line key={i} className="p-dot" x1={55-i*12} y1={52+i*14} x2={40-i*12} y2={52+i*14} stroke={AC} strokeWidth="2" strokeLinecap="round" style={{animationDelay:`${i*0.2}s`}}/>
        ))}
        <text x="100" y="16" textAnchor="middle" fill={LN} fontSize="10" fontWeight="700" fontFamily="system-ui" opacity=".7">KARDİYO / KOŞU</text>
      </svg>
    ),

    // ── DİPS ───────────────────────────────────────
    dips: (
      <svg viewBox="0 0 200 150" width="100%" height="100%">
        <style>{css}</style>
        {/* Paralel barlar */}
        <line x1="38" y1="50" x2="38" y2="110" stroke={LN} strokeWidth="7" strokeLinecap="round" opacity=".5"/>
        <line x1="162" y1="50" x2="162" y2="110" stroke={LN} strokeWidth="7" strokeLinecap="round" opacity=".5"/>
        <g className="p-di">
          {/* Baş */}
          <circle cx="100" cy="42" r="13" fill="none" stroke={SK} strokeWidth={sw2}/>
          {/* Kollar */}
          <line x1="100" y1="55" x2="62" y2="50" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="100" y1="55" x2="138" y2="50" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          {/* Gövde */}
          <line x1="100" y1="55" x2="100" y2="100" stroke={LN} strokeWidth={sw} strokeLinecap="round"/>
          {/* Bacaklar sarkan */}
          <line x1="100" y1="100" x2="88" y2="132" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="88" y1="132" x2="84" y2="148" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="100" y1="100" x2="112" y2="132" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
          <line x1="112" y1="132" x2="116" y2="148" stroke={SK} strokeWidth={sw2} strokeLinecap="round"/>
        </g>
        <text x="100" y="16" textAnchor="middle" fill={LN} fontSize="10" fontWeight="700" fontFamily="system-ui" opacity=".7">DİPS</text>
        <g className="p-dot"><path d="M100 78 L100 68 L97 72 M100 68 L103 72" stroke={AC} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></g>
      </svg>
    ),
  };

  return (
    <div style={{
      background:"linear-gradient(160deg,rgba(16,185,129,.06) 0%,transparent 60%), #080e09",
      borderRadius:18,
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      height:148,
      overflow:"hidden",
      marginBottom:12,
      border:"1px solid rgba(52,211,153,.1)",
      position:"relative"
    }}>
      {tip && svgs[tip] ? svgs[tip] : (
        <div style={{textAlign:"center",opacity:.5}}>
          <div style={{fontSize:52}}>{ikon||"💪"}</div>
          <div style={{fontSize:9,color:"#34d399",marginTop:6,fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>Hazır ol</div>
        </div>
      )}
    </div>
  );
}


// ─── ANA COMPONENT ───────────────────────────────────────────
export default function App(){
  const profFotoRef = useRef(null);
  const besinFotoRef = useRef(null);
  const postFotoRef = useRef(null);
  const perfPanelRef = useRef(null);

  // ── KARŞILAMA EKRANI ──
  const [welcomeGoster,setWelcomeGoster]=useState(false); // Firebase'den kontrol edilir
  const [welcomeSlide,setWelcomeSlide]=useState(0); // 0=dil seç, 1-5=slaytlar
  const [dil,setDil]=useState(()=>localStorage.getItem("doya_dil")||"tr");
  const L=LANG[dil]||LANG.tr;

  // ── DARK MODE ──
  const [dark,setDark]=useState(()=>{try{const t=localStorage.getItem("doya_tema");if(t==="light")return false;return true;}catch(e){return true;}});
  const d=dark;

  // ── AUTH ──
  const [ekran,setEkran]=useState("giris");
  const [gHata,setGHata]=useState("");
  const [kvkkModal,setKvkkModal]=useState(false);
  const [kvkkOnay,setKvkkOnay]=useState(false);
  const [gdprOnay,setGdprOnay]=useState(false);
  const [pazarlamaOnay,setPazarlamaOnay]=useState(false);
  const [gdprModal,setGdprModal]=useState(false);
  const [hesapSilOnay,setHesapSilOnay]=useState(false);
  const [hesapSilModal,setHesapSilModal]=useState(false);

  // ── ORUÇ TAKİP STATE ──────────────────────────────────────────
  const [orucSure,setOrucSure]=useState(()=>{
    try{const s=localStorage.getItem("doya_oruc_sure");return s?parseInt(s):16;}catch{return 16;}
  });
  const [orucBaslangic,setOrucBaslangic]=useState(()=>{
    try{const s=localStorage.getItem("doya_oruc_baslangic");return s?parseInt(s):null;}catch{return null;}
  });
  const [orucAlarmCalindi,setOrucAlarmCalindi]=useState(false);
  const [orucBitti,setOrucBitti]=useState(false);
  const [orucOzelSure,setOrucOzelSure]=useState(16);
  const [orucSecilenPlan,setOrucSecilenPlan]=useState("16:8");
  const [orucTick,setOrucTick]=useState(0);
  const [kullanicilar,setKullanicilar]=useState([]);
  const [aktif,setAktif]=useState(null);
  const [firebaseUID,setFirebaseUID]=useState(null);
  const [yukleniyor,setYukleniyor]=useState(true);
  const [paylasimDB,setPaylasimDB]=useState({});

  // ── ONBOARDING ──
  const [onboard,setOnboard]=useState(false); const [obAdim,setObAdim]=useState(1);
  const [obK,setObK]=useState(""); const [obB,setObB]=useState(""); const [obY,setObY]=useState("");
  const [obC,setObC]=useState("erkek"); const [obA,setObA]=useState("orta"); const [obHK,setObHK]=useState("");
  const [obSosyal,setObSosyal]=useState(true); const [obAcik,setObAcik]=useState(true);
  const [obHedef,setObHedef]=useState("saglikli"); const [obDiyet,setObDiyet]=useState("");
  const [obAlerji,setObAlerji]=useState([]); // alerji listesi
  const [alerjiListesi,setAlerjiListesi]=useState([]); // profil alerji

  // ── APP STATE ──
  const [tab,setTab]=useState("anasayfa");
  const [hamMenu,setHamMenu]=useState(false);
  const [profil,setProfil]=useState({ kilo:"",boy:"",yas:"",cinsiyet:"erkek",aktivite:"orta",hedef:"" });
  const [gunluk,setGunluk]=useState({});
  const [secTarih,setSecTarih]=useState(bugunKey());
  const [takvimAy,setTakvimAy]=useState(new Date());
  const [puan,setPuan]=useState(0);
  const [premium,setPremium]=useState(false);
  const [premiumPlus,setPremiumPlus]=useState(false);
  const [aiGunlukKullanim,setAiGunlukKullanim]=useState(0);
  const [reklam,setReklam]=useState(true);
  const [acikHesap,setAcikHesap]=useState(true);
  const [sosyalAktif,setSosyalAktif]=useState(true);
  const [besinler,setBesinler]=useState(BESIN_DB);
  const [bekBesin,setBekBesin]=useState([]);

  const [tarifler, setTarifler] = useState([]);
  const [profFoto,setProfFoto]=useState(null);
  const [adimSayar,setAdimSayar]=useState(0);
  const [adimAktif,setAdimAktif]=useState(false);
  const [adimIzin,setAdimIzin]=useState("bekliyor");
  const [adimIzinModal,setAdimIzinModal]=useState(false);
  const [eVeriGizle,setEVeriGizle]=useState(false); // "bekliyor"|"verildi"|"reddedildi"|"desteklenmiyor"
  const adimRef=useRef({son:null,sayac:0,aktif:false});

  // ── BESİN ARA ──
  const [secBesin,setSecBesin]=useState(null);
  const [besinArama,setBesinArama]=useState("");
  const [yemekEkleModal,setYemekEkleModal]=useState(false);
  const [yemekEkleSekme,setYemekEkleSekme]=useState("ara"); // ara | foto | hizli | yemeklerim
  const [yemekEkleOgun,setYemekEkleOgun]=useState("Kahvaltı");
  const [hizliEkleMetin,setHizliEkleMetin]=useState("");
  const [hizliEkleYuk,setHizliEkleYuk]=useState(false);
  const [hizliSonuc,setHizliSonuc]=useState(null);
  const [sonYemekler,setSonYemekler]=useState([]);
  const [aramaOdak,setAramaOdak]=useState(false);
  const [aiModal,setAiModal]=useState(false);
  const [aiNot,setAiNot]=useState("");
  const [aiOgun,setAiOgun]=useState("Kahvaltı");
  const [aiYukleniyor,setAiYukleniyor]=useState(false);
  const [aiSonuc,setAiSonuc]=useState(null);
  const [aiHata,setAiHata]=useState(null);
  const [aiImg,setAiImg]=useState(null);
  const [oncekiAramalar,setOncekiAramalar]=useState(()=>{try{return JSON.parse(localStorage.getItem("doya_ara_gecmis")||"[]")}catch{return[]}});
  const [gozatLimit,setGozatLimit]=useState(30);
  const [yemekGram,setYemekGram]=useState("100");
  const [yemekKat,setYemekKat]=useState("Kahvaltı");
  const [yeniB,setYeniB]=useState({ ad:"",marka:"",kal:"",pro:"",karb:"",yag:"",lif:"",sod:"",acik:"",por:"100",aclik:"2-3 saat",kat:"Diğer" });
  const [besinFil,setBesinFil]=useState({ kat:"",minKal:"",maxKal:"",acikSecim:[],sira:"isim",minDemir:"",minKals:"",minVitC:"",minVitD:"",minVitB12:"",yildizSecim:[] });
  const [yildizAcik,setYildizAcik]=useState(false);
  const [araSekmesi,setAraSekmesi]=useState("ara");

  // ── SPOR ──
  const [sporModal,setSporModal]=useState(false);
  // ─── SPOR UYGULAMASI ─────────────────────────────────────────
  const [sporAppAcik,setSporAppAcik]=useState(false);
  const [sporAppAdim,setSporAppAdim]=useState(0); // 0=sorular, 1=program sec, 2=antrenman aktif
  const [sporSoruAdim,setSporSoruAdim]=useState(0); // setup içi soru adımı 0-4
  const [sporEkipman,setSporEkipman]=useState([]); // dambil, barfix, bench, mat
  const [sporHedef,setSporHedefSA]=useState(""); // kilo_ver, kilo_al, kas, form, saglik
  const [sporBolge,setSporBolge]=useState([]); // karin, omuz, gogus, sirt, bacak, kol
  const [sporSeviye,setSporSeviye]=useState(""); // baslangic, orta, ileri
  const [sporSure2,setSporSure2]=useState(30); // dk
  const [sporGun,setSporGun]=useState(3); // haftada kaç gün
  const [sporProgram,setSporProgram]=useState(null); // seçili program
  const [aktifAntrenman,setAktifAntrenman]=useState(null); // başlatılan antrenman
  const [antSaniye,setAntSaniye]=useState(0); // antrenman süresi
  const [antInterval,setAntInterval]=useState(null);
  const [antAdim,setAntAdim]=useState(0); // kaçıncı egzersizde
  const [antSetTamamla,setAntSetTamamla]=useState({}); // tamamlanan setler
  const [antBitmis,setAntBitmis]=useState(false);
  const [sporSec,setSporSec]=useState(SPOR_LISTESI[0]);
  const [sporSure,setSporSure]=useState("30");
  const [sporTempo,setSporTempo]=useState("orta");

  // ── SOSYAL ──
  const [arkadaslar,setArkadaslar]=useState([]);
  const [gelenIstekler,setGelenIstekler]=useState([]);
  const [gonderilen,setGonderilen]=useState([]); // [{uid, isim, zaman}]
  const [engelliler,setEngelliler]=useState([]);
  const [uidArama,setUidArama]=useState(""); const [uidSonuc,setUidSonuc]=useState(null); const [uidHata,setUidHata]=useState("");
  const [secArk,setSecArk]=useState(null);
  

  // ── SOSYAL AKIŞ ──
  const [paylasimlar,setPaylasimlar]=useState([]);
  const [yeniPS,setYeniPS]=useState(""); const [postFoto,setPostFoto]=useState(null); const [sosyalSekme,setSosyalSekme]=useState("genel");
  const [gunlukKazanilanPuan,setGunlukKazanilanPuan]=useState(0);
  const [gunlukPuanGun,setGunlukPuanGun]=useState("");
  const [marketSekme,setMarketSekme]=useState("market"); // "market" | "reklam"
  const [reklamIzleniyor,setReklamIzleniyor]=useState(false);
  const [reklamSayac,setReklamSayac]=useState(0);
  const [gunlukReklamIzle,setGunlukReklamIzle]=useState(0);
  const [gunlukReklamGun,setGunlukReklamGun]=useState("");
  const [ekstraAiHak,setEkstraAiHak]=useState(0);
  // ─── AI DİYETİSYEN ───────────────────────────────
  const [diyetisyenAcik,setDiyetisyenAcik]=useState(false);
  const [diyMesajlar,setDiyMesajlar]=useState([]);
  const [diyYazi,setDiyYazi]=useState("");
  const [diyYukleniyor,setDiyYukleniyor]=useState(false);
  // ─── KİLO TAKİP ──────────────────────────────────
  const [kiloKayitlar,setKiloKayitlar]=useState([]); // [{tarih,kilo}]
  const [kiloGirModal,setKiloGirModal]=useState(false);
  const [kiloInput,setKiloInput]=useState("");
  const [kiloNot,setKiloNot]=useState("");
  const [kiloGirDeger,setKiloGirDeger]=useState("");
  // ─── GÜNLÜK DİYET LİSTESİ ────────────────────────
  const [diyetListesiAcik,setDiyetListesiAcik]=useState(false);
  const [diyetListesi,setDiyetListesi]=useState(null); // AI üretilen plan
  const [diyetListesiYuk,setDiyetListesiYuk]=useState(false);
  const [yorumMet,setYorumMet]=useState({});
  const [sikayet,setSikayet]=useState({ hedef:null,sebep:"",modal:false,tip:"kullanici",postId:null,postFotoUrl:null });

  // ── REFERANS ──
  const [refBasvuruModal,setRefBasvuruModal]=useState(false);
  const [sozlesmeModal,setSozlesmeModal]=useState(false);
  const [sozlesmeOnay,setSozlesmeOnay]=useState(false);
  const [basTip,setBasTip]=useState("influencer"); const [basAd,setBasAd]=useState("");
  const [basPlatform,setBasPlatform]=useState([]); const [basAcik,setBasAcik]=useState("");
  const [basGonderildi,setBasGonderildi]=useState(false);
  const [refBasvurular,setRefBasvurular]=useState([]);

  // ── HAFTALIK PANEL ──
  const [hpDonem,setHpDonem]=useState("hafta"); // hafta | ay | yil
  const [hpSecGun,setHpSecGun]=useState(null);  // seçilen gün key'i
  const [hpModal,setHpModal]=useState(false);   // haftalık özet modal
  const [alerjiModal,setAlerjiModal]=useState(false);

  // ── ADMIN ──
  const [adminUid,setAdminUid]=useState(""); const [adminTip,setAdminTip]=useState("influencer");
  const [adminMsg,setAdminMsg]=useState(""); const [banMsg,setBanMsg]=useState("");
  const [adminOzelRefKod,setAdminOzelRefKod]=useState("");
  const [adminIsletmeIsmi,setAdminIsletmeIsmi]=useState("");
  const [sikayetler,setSikayetler]=useState([]);

  // ── SERİLER ──
  const [yemekSeri,setYemekSeri]=useState(0);
  const [adimSeri,setAdimSeri]=useState(0);
  const [seriToast,setSeriToast]=useState(null);
  const [seriMsg,setSeriMsg]=useState(null);
  const [dogrulamaGonderildi,setDogrulamaGonderildi]=useState(false);
  const [doyuruBilgi,setDoyuruBilgi]=useState(null);
  const [derinAnaliz,setDerinAnaliz]=useState(null); // besin id

  // ── REFERANS KODU GİRİŞ ──
  const [girRefKod,setGirRefKod]=useState("");
  const [girRefMesaj,setGirRefMesaj]=useState(null); // {tip:"basari"|"hata", mesaj}
  const [girRefKilitli,setGirRefKilitli]=useState(false);

  // ── PAYLASIM MODAL ──
  const [psModal,setPsModal]=useState(false);

  // ── PROFİL DÜZENLEME ──
  const [isimDuzenle,setIsimDuzenle]=useState(false);
  const [yeniIsim,setYeniIsim]=useState("");
  const [profilSekme,setProfilSekme]=useState("genel"); // "genel" | "gonderiler" | "performans"
  const [yillikPlan,setYillikPlan]=useState(false); // aylık mı yıllık mı
  const [tabAnimClass,setTabAnimClass]=useState(""); // geçiş animasyonu
  const [perfDonem,setPerfDonem]=useState("hafta"); // "hafta" | "ay" | "yil"
  const [perfAnimDeger,setPerfAnimDeger]=useState({kal:0,pro:0,karb:0,yag:0,su:0,adim:0});
  const [donemOzetGoster,setDonemOzetGoster]=useState(false);
  const [donemOzetTip,setDonemOzetTip]=useState(null);

  const isAdmin = aktif?.admin===true;
  const isOrtak = !!(aktif?.refTip && aktif?.refOnay);

  // ── VERİ YARDIMCILARI ──
  const gunV=(key)=>gunluk[key]||{ yemekler:[],su:0,kilo:"",spor:[] };
  const gunSet=(key,alan,val,ekstraFirebase={})=>{
    setGunluk(p=>{
      const yeni={...p,[key]:{...gunV(key),[alan]:val}};
      if(firebaseUID) gunVeriKaydet(firebaseUID,key,yeni[key]).catch(console.error);
      // Ekstra Firebase güncellemesi (ör. su için toplam)
      if(firebaseUID && Object.keys(ekstraFirebase).length>0){
        kullaniciyiGuncelle(firebaseUID,ekstraFirebase).catch(console.error);
      }
      return yeni;
    });
  };
  const bugYemekler = gunV(bugunKey()).yemekler||[];
  const bugSu       = gunV(bugunKey()).su||0;
  const bugSpor     = gunV(bugunKey()).spor||[];
  const topKal  = bugYemekler.reduce((t,y)=>t+(y.gramKal||0),0);
  const topPro  = bugYemekler.reduce((t,y)=>t+(y.gramPro||0),0);
  const topKarb = bugYemekler.reduce((t,y)=>t+(y.gramKarb||0),0);
  const topYag  = bugYemekler.reduce((t,y)=>t+(y.gramYag||0),0);
  const topSpor = bugSpor.reduce((t,s)=>t+(s.kcal||0),0);

  const p    = profil;
  const tdee = tdeeHesapla(+p.kilo,+p.boy,+p.yas,p.cinsiyet,p.aktivite);
  const bmi  = bmiHesapla(+p.kilo,+p.boy);
  const bmiD = bmiDurum(bmi);
  const suHed= suHedHesapla(+p.kilo,p.aktivite);
  const HEDEF= (tdee||2000)+topSpor;

  const onayBesinler = besinler.filter(b=>b.onay&&!b.silindi);
  // Sadece arama için (gözat filtreleri olmadan)
  const aramaBesinler = !besinArama ? [] : onayBesinler.filter(b=>
    b.ad.toLowerCase().includes(besinArama.toLowerCase())||
    (b.marka&&b.marka.toLowerCase().includes(besinArama.toLowerCase()))
  );
  // Gözat listesi için (arama olmadan, sadece filtreler)
  const filtreBesinler = onayBesinler.filter(b=>{
    const katUy  = !besinFil.kat||b.kat===besinFil.kat;
    const minK   = !besinFil.minKal||b.kal>=+besinFil.minKal;
    const maxK   = !besinFil.maxKal||b.kal<=+besinFil.maxKal;
    const acikUy = besinFil.acikSecim.length===0||besinFil.acikSecim.some(s=>s==="cok"?b.acik>=70:s==="orta"?(b.acik>=45&&b.acik<70):b.acik<45);
    const demirUy= !besinFil.minDemir||((b.demir||0)>=+besinFil.minDemir);
    const kalsUy = !besinFil.minKals||((b.kals||0)>=+besinFil.minKals);
    const vitCUy = !besinFil.minVitC||((b.vitC||0)>=+besinFil.minVitC);
    const vitDUy = !besinFil.minVitD||((b.vitD||0)>=+besinFil.minVitD);
    const vitB12Uy=!besinFil.minVitB12||((b.vitB12||0)>=+besinFil.minVitB12);
    const yildizUy = besinFil.yildizSecim.length===0||besinFil.yildizSecim.includes(b.yildiz??3);
    return katUy&&minK&&maxK&&acikUy&&demirUy&&kalsUy&&vitCUy&&vitDUy&&vitB12Uy&&yildizUy;
  }).sort((a,b2)=>({
    isim:"",kal_az:0,kal_cok:0,acik_cok:0
  }[besinFil.sira]!==undefined? {
    kal_az:(a2,b3)=>a2.kal-b3.kal,
    kal_cok:(a2,b3)=>b3.kal-a2.kal,
    acik_cok:(a2,b3)=>b3.acik-a2.acik,
    yildiz_cok:(a2,b3)=>(b3.yildiz??3)-(a2.yildiz??3),
    yildiz_az:(a2,b3)=>(a2.yildiz??3)-(b3.yildiz??3),
    isim:(a2,b3)=>a2.ad.localeCompare(b3.ad),
  }[besinFil.sira](a,b2):0));

  // ─── ADIM SAYAR ──────────────────────────────────────────────
  // Otomatik başlat: izin daha önce verilmişse hemen başlat
  useEffect(()=>{
    const bugunKey2=tarihKey(new Date());
    // Gün değiştiyse sıfırla
    const kayitliGun=localStorage.getItem("doya_adim_gun");
    if(kayitliGun&&kayitliGun!==bugunKey2){
      setAdimSayar(0);
      adimRef.current.sayac=0;
      localStorage.setItem("doya_adim_"+bugunKey2,"0");
    }
    localStorage.setItem("doya_adim_gun",bugunKey2);
    
    // Kaydedilmiş adım sayısını yükle
    const kayitli=parseInt(localStorage.getItem("doya_adim_"+bugunKey2)||"0");
    adimRef.current.sayac=kayitli;

    // İzin zaten verilmişse otomatik başlat
    const kayitliIzin=localStorage.getItem("doya_adim_izin");
    if(kayitliIzin==="verildi"||kayitliIzin==="android"){
      setAdimAktif(true);
    } else if(kayitliIzin==="bekliyor"||!kayitliIzin){
      // İlk açılışta izin modalı göster
      setTimeout(()=>setAdimIzinModal(true),1500);
    }
  },[]);

  useEffect(()=>{
    if(!adimAktif) return;
    let handler=null;

    const baslat=()=>{
      adimRef.current.sayac=parseInt(localStorage.getItem("doya_adim_"+tarihKey(new Date()))||"0");
      handler=(event)=>{
        const acc=event.acceleration||event.accelerationIncludingGravity||{};
        const {x=0,y=0,z=0}=acc;
        const mag=Math.sqrt(x*x+y*y+z*z);
        const ref=adimRef.current;
        const now=Date.now();
        if(ref.son!==null){
          const delta=Math.abs(mag-ref.son);
          if(delta>2.8&&(now-ref.lastStep)>280){
            ref.lastStep=now;
            ref.sayac+=1;
            setAdimSayar(ref.sayac);
            // Her 10 adımda kaydet
            if(ref.sayac%10===0){
              const bg=tarihKey(new Date());
              localStorage.setItem("doya_adim_"+bg, ref.sayac);
              // Takvime kaydet
              gunSet(bg,"adim",ref.sayac);
              gunSet(bg,"adimKal",Math.round(ref.sayac*0.04));
            }
          }
        }
        ref.son=mag;
      };
      window.addEventListener("devicemotion",handler,{passive:true});
      setAdimIzin("verildi");
    };

    if(typeof DeviceMotionEvent!=="undefined"&&typeof DeviceMotionEvent.requestPermission==="function"){
      // iOS
      DeviceMotionEvent.requestPermission().then(r=>{
        if(r==="granted"){ localStorage.setItem("doya_adim_izin","verildi"); baslat(); }
        else { setAdimIzin("reddedildi"); localStorage.setItem("doya_adim_izin","reddedildi"); setAdimAktif(false); }
      }).catch(()=>{ setAdimIzin("reddedildi"); setAdimAktif(false); });
    } else if(typeof DeviceMotionEvent!=="undefined"){
      localStorage.setItem("doya_adim_izin","android");
      baslat();
    } else {
      setAdimIzin("desteklenmiyor");
      setAdimAktif(false);
    }

    return ()=>{ if(handler) window.removeEventListener("devicemotion",handler); };
  },[adimAktif]);

  // Adım sayısı değişince takvime kaydet (debounced)
  useEffect(()=>{
    if(adimSayar===0) return;
    const t=setTimeout(()=>{
      const bg=tarihKey(new Date());
      localStorage.setItem("doya_adim_"+bg,adimSayar);
      gunSet(bg,"adim",adimSayar);
      gunSet(bg,"adimKal",Math.round(adimSayar*0.04));
      if(adimSayar>=10000) seriGuncelle("adim");
    },2000);
    return ()=>clearTimeout(t);
  },[adimSayar]);

  // ─── TEMA ────────────────────────────────────────────────────
  const r = {
    // ── Koyu tema (obsidian) ──
    bg   : d?"#040907":"#f2f7f3",
    card : d?"#080e09":"#ffffff",
    brd  : d?"rgba(16,185,129,.1)":"rgba(16,185,129,.12)",
    text : d?"#e8f5ec":"#0a1f0c",
    sub  : d?"#6ee7b7":"#047857",
    muted: d?"#2d5a3d":"#7aab8a",
    inp  : d?"#060c07":"#f8fbf9",
    inpB : d?"rgba(16,185,129,.15)":"rgba(16,185,129,.2)",
    nav  : d?"#050a06":"#ffffff",
    rowB : d?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)",
    pg   : d?"rgba(16,185,129,.1)":"rgba(16,185,129,.12)",
    accent:"#10b981", accentL:"#34d399", accentD:"#065f46",
    gold:"#c8922a", goldL:"#f0c14b",
    // Renk sistemi
    emerald:"#10b981", teal:"#14b8a6", jade:"#059669",
  };
  const CS = {
    background: d
      ? "linear-gradient(160deg,#090e0a 0%,#06100800 100%),#0a0f0b"
      : "linear-gradient(160deg,#ffffff 0%,#f8fdf9 100%)",
    border: `1px solid ${r.brd}`,
    borderRadius: 22,
    padding: "20px 20px",
    margin: "8px 14px",
    boxShadow: d
      ? "0 1px 0 rgba(16,185,129,.08) inset, 0 20px 60px rgba(0,0,0,.5), 0 1px 0 rgba(255,255,255,.03)"
      : "0 1px 0 rgba(16,185,129,.15) inset, 0 8px 32px rgba(10,31,12,.06), 0 1px 3px rgba(0,0,0,.05)",
    position: "relative",
    overflow: "hidden",
  };
  const CT = {
    fontSize: 9,
    fontWeight: 800,
    color: r.sub,
    textTransform: "uppercase",
    letterSpacing: 2.5,
    marginBottom: 14,
    display: "flex",
    alignItems: "center",
    gap: 6,
  };
  const PB  = { height:4,background:d?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)",borderRadius:99,overflow:"hidden",marginTop:6 };
  const PF  = (pct,c)=>({ height:"100%",width:Math.min(100,Math.max(0,pct))+"%",background:c||"linear-gradient(90deg,#10b981,#34d399)",borderRadius:99,transition:"width .6s cubic-bezier(.34,1.2,.64,1)" });
  const IS  = { width:"100%",padding:"11px 14px",border:`1px solid ${d?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}`,borderRadius:13,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"'Nunito',sans-serif",background:d?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)",color:r.text,transition:"all .15s",WebkitAppearance:"none" };
  const BTN = (c,s)=>({ background:c||"linear-gradient(135deg,#10b981,#059669)",color:"#fff",border:"none",borderRadius:14,padding:s||"13px 22px",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"'Nunito',sans-serif",letterSpacing:.4,boxShadow:c?"none":"0 4px 16px rgba(16,185,129,.3)" });
  const BAD = (c)=>({ background:c+"15",color:c,padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:800,display:"inline-block",letterSpacing:.3,border:`1px solid ${c}25` });
  const NB  = (a)=>({ flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"10px 4px 8px",cursor:"pointer",color:a?"#10b981":r.muted,fontSize:9,fontWeight:a?800:600,gap:3,background:"none",border:"none",minWidth:44,letterSpacing:.5,position:"relative",transition:"color .2s" });

  // ─── FİREBASE: AUTH STATE & VERİ YÜKLEME ────────────────────
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async (user)=>{
      if(user){
        setFirebaseUID(user.uid);
        try {
          // Silinmiş tarifleri Firebase'den yükle
          try {
            const fbMod2 = await import("firebase/firestore");
            const silSnap = await fbMod2.getDoc(fbMod2.doc(db,"appConfig","silinenTarifler"));
            if(silSnap.exists()){
              const silList = silSnap.data().ids||[];
              setTarifler(prev=>prev.filter(t=>!silList.includes(t.id)));
            }
          } catch(e){ console.error("Tarif silme listesi:",e); }
          const veri = await kullaniciyiGetir(user.uid);
          if(veri){
            // Eski kullanıcı → welcome slaytları gösterme
            setWelcomeGoster(false);
            // Admin kontrolü: Firestore'dan oku, kodda şifre YOK
            const adminSnap = await getDoc(doc(db,"adminConfig","settings"));
            const adminEmails = adminSnap.exists() ? (adminSnap.data().adminEmails||[]) : [];
            const isAdminUser = adminEmails.includes(veri.email);
            const tam = {...veri, admin: isAdminUser};
            setAktif(tam);
            setPuan(tam.puan||0);
            setPremium(tam.premium||false);
            setPremiumPlus(tam.premiumPlus||false);
            setAcikHesap(tam.acik??true);
            setSosyalAktif(tam.sosyal??true);
            setProfFoto(tam.foto||null);
            if(tam.kilo||tam.boy){
              setProfil({kilo:tam.kilo||"",boy:tam.boy||"",yas:tam.yas||"",cinsiyet:tam.cinsiyet||"erkek",aktivite:tam.aktivite||"orta",hedef:tam.hedef||""});
            } else {
              // Firebase'de veri var ama kilo/boy yok → onboard tamamlanmamış
              setOnboard(true);
            }
            if(tam.refKodKullandi) setGirRefKilitli(true);
            // AI kullanım hakkını Firebase'den yükle (localStorage silinse de korunur)
            if(tam.aiKullanim){
              const bugun=new Date().toISOString().split("T")[0];
              setAiGunlukKullanim(tam.aiKullanim.tarih===bugun ? (tam.aiKullanim.sayi||0) : 0);
            }
            // Günlük puan takibi yükle
            if(tam.gunlukPuan){
              const bugunP=bugunKey();
              if(tam.gunlukPuan.gun===bugunP){
                setGunlukKazanilanPuan(tam.gunlukPuan.toplam||0);
                setGunlukPuanGun(bugunP);
              }
            }
            // Ekstra AI hak
            setEkstraAiHak(tam.ekstraAiHak||0); // her zaman firebase'den yükle
            // Alerjileri yükle (alerji veya alerjiListesi key'i, her ikisini de dene)
            const yuklenenAlerji = tam.alerji||tam.alerjiListesi||[];
            if(yuklenenAlerji.length>0) setAlerjiListesi(yuklenenAlerji);
            if(tam.kiloKayitlar) setKiloKayitlar(tam.kiloKayitlar||[]); // 0 dahil
            // Kilo geçmişini yükle
            if(tam.kiloKayitlar) setKiloGecmis(tam.kiloKayitlar||[]);
            // Diyetisyen geçmişini yükle
            if(tam.diyMesajlar) setDiyMesajlar(tam.diyMesajlar||[]);
            // Günlük reklam izleme sayısı
            if(tam.gunlukReklam){
              const bugunR=bugunKey();
              if(tam.gunlukReklam.gun===bugunR){
                setGunlukReklamIzle(tam.gunlukReklam.sayi||0);
                setGunlukReklamGun(bugunR);
              }
            }
            // Günlük verileri yükle
            const gunler = await tumGunleriGetir(user.uid);
            if(Object.keys(gunler).length>0) setGunluk(gunler);
            // Tüm kullanıcıları yükle (arkadaş arama için)
            const hepsi = await tumKullanicilariGetir();
            setKullanicilar(hepsi);
            // Şikayetleri ve referans başvurularını yükle (admin için)
            if(isAdminUser){
              const sk = await sikayetleriGetir();
              setSikayetler(sk);
              try {
                const fbMod = await import("firebase/firestore");
                const snap = await fbMod.getDocs(fbMod.collection(db,"refBasvurular"));
                setRefBasvurular(snap.docs.map(d=>({id:d.id,...d.data()})));
              } catch(e){ console.error("Ref başvuruları yüklenemedi:",e); }
            }
            // Arkadaş listesini Firestore'dan yükle
            if(tam.arkadaslar?.length>0){
              const arkList = kullanicilar.filter ? [] : [];
              // arkadaslar uid listesinden isim eşleştir
              const hepsiSnap = await tumKullanicilariGetir();
              const arkFull = (tam.arkadaslar||[]).map(uid=>{
                const k = hepsiSnap.find(u=>u.uid===uid);
                return k ? {uid:k.uid, isim:k.isim} : {uid, isim:"Kullanıcı"};
              });
              setArkadaslar(arkFull);
            }
            // Arkadaş isteklerini gerçek zamanlı dinle
            istekleriDinle(user.uid, (istekler)=>{
              setGelenIstekler(istekler.filter(i=>i.durum==="bekliyor"));
            }).catch(console.error);
          }
        } catch(e){ console.error("Veri yükleme hatası:",e); }
        setYukleniyor(false);
      } else {
        setAktif(null); setFirebaseUID(null);
        // Giriş yapılmamış → daha önce welcome görmediyse göster
        if(localStorage.getItem("doya_welcome_done")!=="1") setWelcomeGoster(true);
        setYukleniyor(false);
      }
    });
    return ()=>unsub();
  },[]);

  // ─── GÜNLÜK GİRİŞ BONUSU ─────────────────────────────────────
  useEffect(()=>{
    if(!firebaseUID||!aktif) return;
    const bugun=bugunKey();
    const sonGirisKey="doya_son_giris_"+firebaseUID;
    const sonGiris=localStorage.getItem(sonGirisKey);
    if(sonGiris===bugun) return; // Bugün zaten bonus aldı
    // İlk kez bugün giriş yapıyor → +100 puan
    const yeniPuan=(puan||0)+100;
    setPuan(yeniPuan);
    localStorage.setItem(sonGirisKey,bugun);
    kullaniciyiGuncelle(firebaseUID,{
      puan:yeniPuan,
      sonGiris:bugun
    }).catch(console.error);
  },[firebaseUID,aktif?.uid]); // aktif?.uid değişince (yeni oturum) tetikle

  // ─── FİREBASE: GERÇEK ZAMANLI POST DİNLEYİCİ ────────────────
  useEffect(()=>{
    const unsub = postlariDinle((posts)=>{
      const donusturulmus = posts.map(p=>({
        ...p,
        zaman: p.createdAt?.toDate ? zamanFarki(p.createdAt.toDate()) : "Az önce",
        begeniler: p.begeniler||[],
        yorumlar: p.yorumlar||[],
      }));
      setPaylasimlar(donusturulmus);
    });
    return ()=>unsub();
  },[]);

  // ─── DÖNEM BAŞLANGIÇ ÖZET KONTROLÜ ─────────────────────────
  useEffect(()=>{
    if(!aktif||!firebaseUID) return;
    const bugun = new Date();
    const bugunStr = tarihKey(bugun);
    const kontolKey = "donemOzetKontrol_"+firebaseUID;
    const son = localStorage.getItem ? (()=>{try{return JSON.parse(localStorage.getItem(kontolKey)||"{}")}catch{return{}}})() : {};
    
    // Hafta başı: Pazartesi
    const gunHafta = bugun.getDay();
    const pazartesTarih = new Date(bugun);
    pazartesTarih.setDate(bugun.getDate()-(gunHafta===0?6:gunHafta-1));
    const haftaKey = tarihKey(pazartesTarih);
    
    // Ay başı
    const ayKey = bugun.getFullYear()+"-"+String(bugun.getMonth()+1).padStart(2,"0");
    
    // Yıl başı
    const yilKey = String(bugun.getFullYear());
    
    let tip = null;
    if(son.yil !== yilKey) tip = "yil";
    else if(son.ay !== ayKey) tip = "ay";
    else if(son.hafta !== haftaKey) tip = "hafta";
    
    if(tip){
      // Bir önceki dönemi hesapla
      const gosterilenVeri = {};
      const donemGunler = [];
      if(tip==="yil"){
        const gecenYil = bugun.getFullYear()-1;
        for(let ay=0;ay<12;ay++){const g=new Date(gecenYil,ay+1,0).getDate();for(let i=1;i<=g;i++){donemGunler.push(tarihKey(new Date(gecenYil,ay,i)));}}
        gosterilenVeri.donemAdi = gecenYil+" Yılı";
      } else if(tip==="ay"){
        const gecenAy = new Date(bugun.getFullYear(),bugun.getMonth(),0);
        const g=gecenAy.getDate(),m=gecenAy.getMonth(),y=gecenAy.getFullYear();
        for(let i=1;i<=g;i++) donemGunler.push(tarihKey(new Date(y,m,i)));
        gosterilenVeri.donemAdi = AYLAR[m]+" "+y;
      } else {
        // Geçen hafta
        const pt = new Date(pazartesTarih);
        pt.setDate(pt.getDate()-7);
        for(let i=0;i<7;i++){const d=new Date(pt);d.setDate(pt.getDate()+i);donemGunler.push(tarihKey(d));}
        gosterilenVeri.donemAdi = "Geçen Hafta";
      }
      
      let tKal=0,tPro=0,tAdim=0,tSu=0,aktifG=0;
      donemGunler.forEach(k=>{
        const v=gunV(k);
        const gk=(v.yemekler||[]).reduce((s,y)=>s+(y.kal||0),0);
        if(gk>0)aktifG++;
        tKal+=gk; tPro+=Math.round((v.yemekler||[]).reduce((s,y)=>s+(y.pro||0),0));
        tAdim+=(v.adim||0); tSu+=(v.su||0);
      });
      
      if(aktifG>0){
        gosterilenVeri.kal=tKal; gosterilenVeri.pro=tPro;
        gosterilenVeri.adim=tAdim; gosterilenVeri.su=tSu; gosterilenVeri.aktifGun=aktifG;
        setDonemOzetTip({tip, ...gosterilenVeri});
        setDonemOzetGoster(true);
      }
      
      // Kaydet
      const yeniSon={...son,yil:yilKey,ay:ayKey,hafta:haftaKey};
      if(localStorage.setItem) try{localStorage.setItem(kontolKey,JSON.stringify(yeniSon));}catch(e){}
    }
  },[aktif,firebaseUID]);

  // ── ORUÇ TIMER useEffect ──────────────────────────────────────
  useEffect(()=>{
    const interval = setInterval(()=>{
      setOrucTick(t=>t+1);
      if(orucBaslangic!==null){
        const hedef = orucBaslangic + orucSure*3600000;
        const kalan = hedef - Date.now();
        if(kalan<=0 && !orucAlarmCalindi){
          setOrucAlarmCalindi(true);
          setOrucBitti(true);
          // Web Audio ile alarm
          try{
            const ctx=new(window.AudioContext||window.webkitAudioContext)();
            const beep=(freq,t,dur)=>{
              const o=ctx.createOscillator(),g=ctx.createGain();
              o.connect(g);g.connect(ctx.destination);
              o.frequency.value=freq;o.type="sine";
              g.gain.setValueAtTime(0,ctx.currentTime+t);
              g.gain.linearRampToValueAtTime(0.45,ctx.currentTime+t+0.04);
              g.gain.linearRampToValueAtTime(0,ctx.currentTime+t+dur);
              o.start(ctx.currentTime+t);o.stop(ctx.currentTime+t+dur+0.1);
            };
            beep(880,0,0.25);beep(880,0.35,0.25);beep(1100,0.7,0.5);
            beep(880,1.5,0.25);beep(880,1.85,0.25);beep(1100,2.2,0.7);
            beep(1320,3.2,1.0);
          }catch(e){}
          // Tarayıcı bildirimi
          try{
            if(Notification.permission==="granted"){
              new Notification("🎉 Oruç Tamamlandı!",{
                body:`${orucSure} saatlik orucunu başarıyla bitirdin! Tebrikler! 💪`,
                icon:"/favicon.ico"
              });
            }
          }catch(e){}
        }
      }
    },1000);
    return()=>clearInterval(interval);
  },[orucBaslangic,orucSure,orucAlarmCalindi]);

  // ─── ZAMAN FARKI YARDIMCISI ──────────────────────────────────
  function zamanFarki(tarih){
    const fark = Math.floor((Date.now()-tarih)/1000);
    if(fark<60) return "Az önce";
    if(fark<3600) return Math.floor(fark/60)+" dakika önce";
    if(fark<86400) return Math.floor(fark/3600)+" saat önce";
    return Math.floor(fark/86400)+" gün önce";
  }

  // ─── AUTH ────────────────────────────────────────────────────
  const cikis=async()=>{
    await fbCikis();
    setAktif(null); setFirebaseUID(null);
    setGHata(""); setTab("anasayfa"); setOnboard(false);
    setGunluk({}); setPaylasimlar([]); setKullanicilar([]);
  };

  const onboardBitir=async(atla=false)=>{
    // firebaseUID state async olabileceğinden aktif'ten de al
    const uid = firebaseUID || aktif?.firebaseUID;
    if(!atla && uid){
      const yeniProfil={kilo:obK,boy:obB,yas:obY,cinsiyet:obC,aktivite:obA,hedef:obHK};
      setProfil(yeniProfil);
      setAcikHesap(obAcik); setSosyalAktif(obSosyal);
      // Firestore'a kaydet (hedef ve diyet tipi dahil)
      await kullaniciyiGuncelle(uid, {
        kilo:obK, boy:obB, yas:obY, cinsiyet:obC, aktivite:obA, hedef:obHK, onboardTamamlandi:true,
        acik:obAcik, sosyal:obSosyal,
        hedefTip:obHedef, diyetTip:obDiyet, alerji:obAlerji, alerjiListesi:obAlerji
      }).catch(console.error);
      // Aktif kullanıcı nesnesini de güncelle
      setAktif(p=>p?{...p,kilo:obK,boy:obB,yas:obY,cinsiyet:obC,aktivite:obA,hedef:obHK,alerji:obAlerji}:p);
      setAlerjiListesi(obAlerji);
      if(!firebaseUID && uid) setFirebaseUID(uid);
    }
    setOnboard(false);
  };

  // ─── AI DİYETİSYEN SOHBET ───────────────────────────────────
  const diyYaziGonder=async()=>{
    if(!diyYazi.trim()||diyYukleniyor) return;
    const kulMesaj={rol:"kullanici",mesaj:diyYazi.trim(),zaman:new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})};
    const yeniMesajlar=[...diyMesajlar,kulMesaj];
    setDiyMesajlar(yeniMesajlar);
    setDiyYazi("");
    setDiyYukleniyor(true);
    const sistem=`Sen Doya uygulamasının AI diyetisyenisin. Kullanıcı bilgileri:
- Kilo: ${profil.kilo||"?"} kg, Boy: ${profil.boy||"?"} cm, Yaş: ${profil.yas||"?"}
- Cinsiyet: ${profil.cinsiyet==="erkek"?"Erkek":"Kadın"}, Aktivite: ${profil.aktivite}
- Hedef: ${p.hedef||"belirtilmemiş"} kg, Diyet tipi: ${aktif?.diyetTip||"belirtilmemiş"}
- Alerjiler: ${alerjiListesi.length>0?alerjiListesi.join(", "):"Yok"}
- Günlük kalori hedefi: ${tdee} kcal
Türkçe, kısa, samimi ve profesyonel cevap ver. Medikal tanı koyma, doktora yönlendir.`;
    try{
      const res=await fetch("/.netlify/functions/ai-proxy",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:600,system:sistem,
          messages:yeniMesajlar.map(m=>({role:m.rol==="kullanici"?"user":"assistant",content:m.mesaj}))})});
      const data=await res.json();
      const cevap=data.content?.[0]?.text||"Üzgünüm, şu an cevap veremiyorum.";
      setDiyMesajlar(p=>[...p,{rol:"ai",mesaj:cevap,zaman:new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})}]);
    }catch(e){setDiyMesajlar(p=>[...p,{rol:"ai",mesaj:"Bağlantı hatası oluştu. Lütfen tekrar deneyin.",zaman:"--:--"}]);}
    setDiyYukleniyor(false);
  };

  // ─── GÜNLÜK DİYET LİSTESİ ÜRET ──────────────────────────────
  const diyetListesiUret=async(zorla=false)=>{
    // Günlük cache — bugün zaten yapıldıysa tekrar yapma
    const cacheKey="doya_diyet_"+bugunKey();
    if(!zorla){
      try{const c=localStorage.getItem(cacheKey);if(c){setDiyetListesi(JSON.parse(c));return;}}catch(e){}
    }
    setDiyetListesiYuk(true);
    setDiyetListesi(null);
    const alerjiStr=alerjiListesi.length>0?alerjiListesi.join(", "):"Yok";
    const diyetTip=aktif?.diyetTip||"Normal";
    const hedefStr=aktif?.hedefTip==="kilo_ver"?"Kilo vermek":aktif?.hedefTip==="kilo_al"?"Kilo almak":"Sağlıklı beslenmek";
    const sistem2=`Sen Doya uygulamasının diyetisyenisin. Kullanıcı için GÜNLÜK diyet planı oluştur.
Kullanıcı: ${profil.kilo||70}kg, ${profil.boy||170}cm, ${profil.yas||25} yaş, ${profil.cinsiyet==="erkek"?"Erkek":"Kadın"}
Kalori hedefi: ${tdee} kcal/gün.
Alerjiler: ${alerjiStr} — Bu alerjilere sahip besinleri KESİNLİKLE önerme.
Beslenme tarzı: ${diyetTip} — Buna uygun yiyecekler öner (örn. vegan ise hayvansal ürün olmasın).
Hedef: ${hedefStr}

SADECE JSON döndür (başka metin yok):
{"kahvalti":{"yemekler":["..."],"kalori":0,"tokluk":"uzun/orta/kısa"},"ogle":{"yemekler":["..."],"kalori":0,"tokluk":"uzun/orta/kısa"},"aksam":{"yemekler":["..."],"kalori":0,"tokluk":"uzun/orta/kısa"},"atistirma":["...","..."],"toplam_kalori":0,"su_tavsiye":"...","ipucu":"..."}`;
    try{
      const res=await fetch("/.netlify/functions/ai-proxy",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:800,messages:[{role:"user",content:sistem2}]})});
      const data=await res.json();
      const txt=(data.content?.[0]?.text||"{}").replace(/```json|```/g,"").trim();
      const plan=JSON.parse(txt);
      setDiyetListesi(plan);
      try{localStorage.setItem(cacheKey,JSON.stringify(plan));}catch(e){}
    }catch(e){setDiyetListesi({hata:"Plan oluşturulamadı, tekrar deneyin."});}
    setDiyetListesiYuk(false);
  };

  // ─── KİLO KAYDET ──────────────────────────────────────────────
  const kiloKaydet=async()=>{
    if(!kiloGirDeger||isNaN(+kiloGirDeger)) return;
    const yeni=[...kiloKayitlar,{tarih:bugunKey(),kilo:+kiloGirDeger}].slice(-90); // son 90 gün
    setKiloKayitlar(yeni);
    setKiloGirDeger("");
    setKiloGirModal(false);
    if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{kiloKayitlar:yeni}).catch(console.error);
  };

  // ─── EGZERSIZ VERİTABANI ────────────────────────────────────
  const EGZERSIZ_DB = {
    // GÖĞÜs
    sıkıştırma:      {id:"sıkıştırma",ad:"Şınav",ikon:"💪",kas:"Göğüs",ekipman:"yok",
      acik:"Eller omuz genişliğinde, vücut düz. Göğüs yere değecek kadar in.",
      met:5.5, kaloriDak:0.09,
      setRep:[{set:3,rep:"8-12"},{set:4,rep:"10-15"},{set:5,rep:"15-20"}],
      video:"push_up"},
    genis_sinav:     {id:"genis_sinav",ad:"Geniş Şınav",ikon:"💪",kas:"Göğüs Dış",ekipman:"yok",
      acik:"Eller normalden geniş. Daha çok dış göğüs çalışır.",
      met:5.5,kaloriDak:0.09,setRep:[{set:3,rep:"8-12"},{set:4,rep:"10-15"}],video:"wide_push"},
    dambil_press:    {id:"dambil_press",ad:"Dambıl Bench Press",ikon:"🏋️",kas:"Göğüs",ekipman:"dambil",
      acik:"Sırtta yatarak dambılları göğüs hizasında yukarı itin.",
      met:6,kaloriDak:0.1,setRep:[{set:3,rep:"10-12"},{set:4,rep:"8-12"}],video:"db_press"},
    dambil_flye:     {id:"dambil_flye",ad:"Dambıl Flye",ikon:"🦅",kas:"Göğüs İç",ekipman:"dambil",
      acik:"Kollar yanlara açık, hafif kıvrık. Dambılları yukarı getir.",
      met:5,kaloriDak:0.08,setRep:[{set:3,rep:"12-15"}],video:"db_flye"},
    // SIRT
    pullup:          {id:"pullup",ad:"Pull-Up (Barfiks)",ikon:"🏗️",kas:"Sırt",ekipman:"barfix",
      acik:"Palmar tutuş. Çene bare kadar çekil, kontrollü in.",
      met:7,kaloriDak:0.12,setRep:[{set:3,rep:"5-10"},{set:4,rep:"8-12"}],video:"pullup"},
    dambil_row:      {id:"dambil_row",ad:"Tek Kol Dambıl Row",ikon:"🤸",kas:"Sırt",ekipman:"dambil",
      acik:"Bir dizi bank üzerinde. Dambılı bele çekip kontrollü indir.",
      met:5.5,kaloriDak:0.09,setRep:[{set:3,rep:"10-12"}],video:"db_row"},
    superman:        {id:"superman",ad:"Superman",ikon:"🦸",kas:"Alt Sırt",ekipman:"yok",
      acik:"Yüzüstü yat. Kol ve bacakları aynı anda kaldır, 2 sn tut.",
      met:3.5,kaloriDak:0.06,setRep:[{set:3,rep:"12-15"}],video:"superman"},
    // OMUZ
    dambil_press_omuz:{id:"dambil_press_omuz",ad:"Omuz Press",ikon:"🏋️",kas:"Omuz",ekipman:"dambil",
      acik:"Ayakta ya da oturarak dambılları başın üzerine itin.",
      met:5.5,kaloriDak:0.09,setRep:[{set:3,rep:"10-12"}],video:"shoulder_press"},
    lateral_raise:   {id:"lateral_raise",ad:"Lateral Raise",ikon:"🦋",kas:"Omuz Yan",ekipman:"dambil",
      acik:"Dambılları yanlara kaldır, omuz seviyesinde dur.",
      met:4.5,kaloriDak:0.075,setRep:[{set:3,rep:"12-15"}],video:"lateral"},
    pike_push:       {id:"pike_push",ad:"Pike Şınav",ikon:"⬆️",kas:"Omuz",ekipman:"yok",
      acik:"Kalçayı yukarı kaldırıp baş aşağı pozisyonda şınav yap.",
      met:5,kaloriDak:0.08,setRep:[{set:3,rep:"8-12"}],video:"pike_push"},
    // KOL
    dambil_curl:     {id:"dambil_curl",ad:"Dambıl Curl",ikon:"💪",kas:"Biceps",ekipman:"dambil",
      acik:"Dirsekleri sabit tut. Dambılı omzuna doğru curl yap.",
      met:4.5,kaloriDak:0.075,setRep:[{set:3,rep:"12-15"}],video:"curl"},
    hammer_curl:     {id:"hammer_curl",ad:"Hammer Curl",ikon:"🔨",kas:"Biceps/Ön Kol",ekipman:"dambil",
      acik:"Avuç içi içe bakacak şekilde curl yap.",
      met:4.5,kaloriDak:0.075,setRep:[{set:3,rep:"12-15"}],video:"hammer"},
    triceps_dips:    {id:"triceps_dips",ad:"Triceps Dips",ikon:"⬇️",kas:"Triceps",ekipman:"yok",
      acik:"Sandalye ya da bank kenarında. Dirsekler arkada, vücudu indir.",
      met:5,kaloriDak:0.08,setRep:[{set:3,rep:"10-15"}],video:"dips"},
    skull_crusher:   {id:"skull_crusher",ad:"Skull Crusher",ikon:"💀",kas:"Triceps",ekipman:"dambil",
      acik:"Sırtüstü. Dambılları alna doğru bükerek indir, it.",
      met:5,kaloriDak:0.08,setRep:[{set:3,rep:"10-12"}],video:"skull"},
    // BACAK
    squat:           {id:"squat",ad:"Squat",ikon:"🦵",kas:"Bacak/Kalça",ekipman:"yok",
      acik:"Ayaklar omuz genişliğinde. Kalçayı geri çekerek diz 90° olana kadar in.",
      met:6,kaloriDak:0.1,setRep:[{set:3,rep:"15-20"},{set:4,rep:"12-15"}],video:"squat"},
    lunge:           {id:"lunge",ad:"Lunge",ikon:"🦵",kas:"Quadriceps",ekipman:"yok",
      acik:"Adım at, ön diz 90°. Her bacak için tekrar et.",
      met:5.5,kaloriDak:0.09,setRep:[{set:3,rep:"12 her bacak"}],video:"lunge"},
    dambil_squat:    {id:"dambil_squat",ad:"Dambıl Squat",ikon:"🏋️",kas:"Bacak",ekipman:"dambil",
      acik:"Her elde dambıl, normal squat hareketi.",
      met:6.5,kaloriDak:0.11,setRep:[{set:4,rep:"12-15"}],video:"db_squat"},
    hip_thrust:      {id:"hip_thrust",ad:"Hip Thrust",ikon:"🍑",kas:"Kalça/Glut",ekipman:"yok",
      acik:"Sırtı banka daya, kalçayı yukarı kaldır. 1 sn tepede tut.",
      met:5,kaloriDak:0.08,setRep:[{set:4,rep:"15-20"}],video:"hip_thrust"},
    calf_raise:      {id:"calf_raise",ad:"Calf Raise",ikon:"🦶",kas:"Baldır",ekipman:"yok",
      acik:"Parmak uçlarında yüksel, kontrollü in.",
      met:3.5,kaloriDak:0.06,setRep:[{set:4,rep:"20-25"}],video:"calf"},
    glut_bridge:     {id:"glut_bridge",ad:"Glut Bridge",ikon:"🌉",kas:"Kalça/Hamstring",ekipman:"yok",
      acik:"Sırtüstü, dizler bükük. Kalçayı yukarı kaldır, 1 sn tut.",
      met:4,kaloriDak:0.07,setRep:[{set:3,rep:"15-20"}],video:"glut_bridge"},
    // KARIN
    crunch:          {id:"crunch",ad:"Crunch",ikon:"🔄",kas:"Karın Üst",ekipman:"mat",
      acik:"Sırtüstü, dizler bükük. Omuzları yerden kaldır, anında bırakma.",
      met:4,kaloriDak:0.07,setRep:[{set:3,rep:"15-20"}],video:"crunch"},
    plank:           {id:"plank",ad:"Plank",ikon:"🪵",kas:"Karın/Core",ekipman:"mat",
      acik:"Dirsekler omuz altında, vücut düz çizgi. Nefes al.",
      met:4,kaloriDak:0.07,setRep:[{set:3,rep:"30-60 sn"}],video:"plank"},
    mountain_climber:{id:"mountain_climber",ad:"Mountain Climber",ikon:"🏔️",kas:"Core/Kardiyo",ekipman:"mat",
      acik:"Şınav pozisyonunda dizleri göğse doğru hızlı çek.",
      met:8,kaloriDak:0.13,setRep:[{set:3,rep:"30 sn"}],video:"mountain"},
    bicycle_crunch:  {id:"bicycle_crunch",ad:"Bicycle Crunch",ikon:"🚴",kas:"Karın Yan",ekipman:"mat",
      acik:"Sırtüstü, dirsek karşı dize değecek şekilde bisiklet hareketi.",
      met:6,kaloriDak:0.1,setRep:[{set:3,rep:"20 her yan"}],video:"bicycle"},
    leg_raise:       {id:"leg_raise",ad:"Leg Raise",ikon:"🦵",kas:"Karın Alt",ekipman:"mat",
      acik:"Sırtüstü, bacakları düz tutarak 90° kaldır, kontrollü indir.",
      met:4.5,kaloriDak:0.075,setRep:[{set:3,rep:"12-15"}],video:"leg_raise"},
    // KARDİYO
    jumping_jack:    {id:"jumping_jack",ad:"Jumping Jack",ikon:"⭐",kas:"Tüm Vücut",ekipman:"yok",
      acik:"Ayaklar birlikte, eller aşağıda başla. Zıpla, ayaklar açılır eller tepede.",
      met:8.5,kaloriDak:0.14,setRep:[{set:3,rep:"30 sn"}],video:"jj"},
    burpee:          {id:"burpee",ad:"Burpee",ikon:"🔥",kas:"Tüm Vücut",ekipman:"yok",
      acik:"Çök→şınav→çök→zıpla. En etkili kardiyo hareketlerinden biri.",
      met:12,kaloriDak:0.2,setRep:[{set:3,rep:"8-12"},{set:4,rep:"10-15"}],video:"burpee"},
    high_knees:      {id:"high_knees",ad:"High Knees",ikon:"🏃",kas:"Bacak/Kardiyo",ekipman:"yok",
      acik:"Yerde koşar gibi dizleri bele kadar kaldır. Kolları salla.",
      met:10,kaloriDak:0.17,setRep:[{set:3,rep:"30 sn"}],video:"high_knees"},
    box_jump:        {id:"box_jump",ad:"Squat Jump",ikon:"🦘",kas:"Bacak/Kardiyo",ekipman:"yok",
      acik:"Squat pozisyonundan yukarı zıpla, yumuşak iş.",
      met:9,kaloriDak:0.15,setRep:[{set:3,rep:"10-12"}],video:"squat_jump"},
  };

  // PROGRAM ÜRETICI
  const sporProgramUret=(hedef,seviye,ekipmanlar,sure,gun,bolgeler=[])=>{
    const ekip=(e)=>ekipmanlar.includes(e);
    const hepsiVar=(e)=>!e||ekip(e)||e==="yok";
    const egz=Object.values(EGZERSIZ_DB).filter(e=>hepsiVar(e.ekipman));
    
    const setIdx = seviye==="baslangic"?0:seviye==="orta"?1:2;
    const programlar = {
      kilo_ver:{
        ad:"🔥 Yağ Yakım Programı",renk:"#ef4444",
        programlar:[
          {gun:1,baslik:"Üst Vücut + Kardiyo",egzersizler:["sıkıştırma","triceps_dips","pike_push","mountain_climber","jumping_jack","plank"]},
          {gun:2,baslik:"Alt Vücut + Kardiyo",egzersizler:["squat","lunge","hip_thrust","high_knees","box_jump","calf_raise"]},
          {gun:3,baslik:"Full Body HIIT",egzersizler:["burpee","mountain_climber","jumping_jack","squat","sıkıştırma","high_knees"]},
          {gun:4,baslik:"Karın + Core",egzersizler:["plank","crunch","bicycle_crunch","leg_raise","mountain_climber"]},
        ],
      },
      kas:{
        ad:"💪 Kas Geliştirme",renk:"#7c3aed",
        programlar:[
          {gun:1,baslik:"Göğüs + Triceps",egzersizler:ekip("dambil")?["dambil_press","dambil_flye","sıkıştırma","triceps_dips","skull_crusher"]:["sıkıştırma","genis_sinav","triceps_dips","pike_push"]},
          {gun:2,baslik:"Sırt + Biceps",egzersizler:ekip("dambil")?(ekip("barfix")?["pullup","dambil_row","dambil_curl","hammer_curl","superman"]:["dambil_row","dambil_curl","hammer_curl","superman"]):["pullup","superman","triceps_dips"]},
          {gun:3,baslik:"Omuz + Kol",egzersizler:ekip("dambil")?["dambil_press_omuz","lateral_raise","dambil_curl","hammer_curl","skull_crusher"]:["pike_push","triceps_dips","sıkıştırma"]},
          {gun:4,baslik:"Bacak + Kalça",egzersizler:ekip("dambil")?["dambil_squat","lunge","hip_thrust","glut_bridge","calf_raise"]:["squat","lunge","hip_thrust","glut_bridge","calf_raise"]},
          {gun:5,baslik:"Karın + Core",egzersizler:["plank","crunch","bicycle_crunch","leg_raise","mountain_climber"]},
        ],
      },
      kilo_al:{
        ad:"📈 Kilo Alma Programı",renk:"#16a34a",
        programlar:[
          {gun:1,baslik:"Üst Vücut Hacim",egzersizler:ekip("dambil")?["dambil_press","dambil_flye","dambil_row","dambil_curl","skull_crusher","pike_push"]:["sıkıştırma","genis_sinav","triceps_dips","pullup"]},
          {gun:2,baslik:"Alt Vücut Hacim",egzersizler:ekip("dambil")?["dambil_squat","lunge","hip_thrust","calf_raise","glut_bridge"]:["squat","lunge","hip_thrust","glut_bridge","calf_raise"]},
          {gun:3,baslik:"Güç + Core",egzersizler:["burpee","plank","crunch","superman","leg_raise"]},
        ],
      },
      form:{
        ad:"🎯 Form Geliştirme",renk:"#f59e0b",
        programlar:[
          {gun:1,baslik:"Üst Vücut Form",egzersizler:["sıkıştırma","pike_push","triceps_dips","plank","mountain_climber"]},
          {gun:2,baslik:"Alt Vücut Form",egzersizler:["squat","lunge","glut_bridge","calf_raise","hip_thrust"]},
          {gun:3,baslik:"Core & Esneklik",egzersizler:["plank","crunch","bicycle_crunch","leg_raise","superman"]},
          {gun:4,baslik:"Kardiyo & Dayanıklılık",egzersizler:["jumping_jack","high_knees","burpee","mountain_climber","box_jump"]},
        ],
      },
      saglik:{
        ad:"🌿 Sağlıklı Yaşam",renk:"#0891b2",
        programlar:[
          {gun:1,baslik:"Hafif Kardiyo",egzersizler:["jumping_jack","high_knees","squat","plank","crunch"]},
          {gun:2,baslik:"Esneme + Core",egzersizler:["superman","plank","glut_bridge","calf_raise","crunch"]},
          {gun:3,baslik:"Aktif Dinlenme",egzersizler:["jumping_jack","mountain_climber","bicycle_crunch","leg_raise","plank"]},
        ],
      },
    };
    const pBase=programlar[hedef]||programlar.saglik;
    const gunler=pBase.programlar.slice(0,gun).map(g=>({
      ...g,
      egzersizler:g.egzersizler.filter(id=>EGZERSIZ_DB[id]&&hepsiVar(EGZERSIZ_DB[id].ekipman))
        .map(id=>{
          const e=EGZERSIZ_DB[id];
          const sr=e.setRep[Math.min(setIdx,e.setRep.length-1)];
          return{...e,set:sr.set,rep:sr.rep};
        })
    }));
    return{...pBase,gunler,topEgz:gunler.reduce((t,g)=>t+g.egzersizler.length,0)};
  };

  // ANTRENMAN BAŞLAT
  const antrenmanBaslat=(gun)=>{
    if(antInterval) clearInterval(antInterval);
    setAktifAntrenman(gun);
    setAntSaniye(0); setAntAdim(0); setAntSetTamamla({}); setAntBitmis(false);
    const iv=setInterval(()=>setAntSaniye(s=>s+1),1000);
    setAntInterval(iv);
    setSporAppAdim(2);
  };

  // ANTRENMAN BİTİR
  const antrenmanBitir=async(sporPrg)=>{
    if(antInterval) clearInterval(antInterval);
    // Kalori hesapla
    const topKcal=aktifAntrenman?.egzersizler?.reduce((t,e)=>{
      const setTam=Object.values(antSetTamamla).filter(s=>s===e.id).length||e.set;
      return t+Math.round(e.kaloriDak*(antSaniye/60/e.set*setTam));
    },0)||Math.round(antSaniye/60*6);
    const kal=Math.max(50,topKcal);
    // Güne ekle
    const bg=bugunKey();
    const kayit={kcal:kal,sure:Math.round(antSaniye/60),ad:aktifAntrenman?.baslik||"Antrenman",
      ikon:"🏋️",tempo:"orta",antrenman:true};
    const eskiSpor=gunV(bg).spor||[];
    const yeniGun={...gunV(bg),spor:[...eskiSpor,kayit]};
    setGunluk(prev=>({...prev,[bg]:yeniGun}));
    if(firebaseUID) await gunVeriKaydet(firebaseUID,bg,yeniGun).catch(console.error);
    setAntBitmis(true);
    setAktifAntrenman(null);
    setAntInterval(null);
  };

  // ─── SPOR EKLE ───────────────────────────────────────────────
  const sporEkle=async()=>{
    const bg=bugunKey();
    const met=sporSec.met[sporTempo]||5;
    const kcal=sporKcal(met,+sporSure,+(p.kilo||70));
    const kayit={ kcal,sure:+sporSure,tempo:sporTempo,ad:sporSec.ad,ikon:sporSec.ikon||"🏃" };
    const eskiSpor=gunV(bg).spor||[];
    const yeniGun={...gunV(bg),spor:[...eskiSpor,kayit]};
    setGunluk(prev=>({...prev,[bg]:yeniGun}));
    if(firebaseUID) await gunVeriKaydet(firebaseUID,bg,yeniGun).catch(console.error);
    setSporModal(false); setSporSure("30"); setSporTempo("orta");
  };

  // ─── YEMEK EKLE ──────────────────────────────────────────────
  const aiKullanimArttir = async () => {
    const bugun=new Date().toISOString().split("T")[0];
    const yeni=aiGunlukKullanim+1;
    setAiGunlukKullanim(yeni);
    // Firebase'e kaydet - veri silinse bile korunur
    if(firebaseUID){
      await kullaniciyiGuncelle(firebaseUID,{aiKullanim:{tarih:bugun,sayi:yeni}}).catch(console.error);
    }
  };

  const aiFotoAnalizEt = async (base64, mediaType, kullaniciNot="") => {
    setAiYukleniyor(true);
    setAiSonuc(null);
    setAiHata(null);
    aiKullanimArttir();
    try {
      const notEkle = kullaniciNot.trim() ? `\n\nKullanıcı notu: "${kullaniciNot.trim()}"` : "";
      const res = await fetch("/.netlify/functions/ai-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1200,
          system: `Sen bir beslenme uzmanı yapay zekasısın. Fotoğraftaki yemeği/içeceği analiz et ve TAM OLARAK şu JSON formatında cevap ver, başka hiçbir şey yazma:
{"yemekAdi":"string","kal":number,"pro":number,"porsiyon":number,"birim":"string","karb":number,"yag":number,"lif":number,"guven":"yuksek|orta|dusuk","aciklama":"string","parcalar":[{"ad":"string","kal":number,"gram":number}]}
Önemli notlar:
- Tüm değerler TAHMİNDİR, hata payı olabilir
- porsiyon: görsel porsiyonu gram/ml olarak tahmin et
- birim: "g" veya "ml"  
- parcalar: tabakta birden fazla yiyecek varsa her biri için ayrı tahmin
- guven: yuksek=net görünüyor, orta=biraz belirsiz, dusuk=çok belirsiz
- aciklama: kısa Türkçe açıklama (max 80 karakter)
- Eğer kullanıcı not verdiyse bunu dikkate al (porsiyon miktarı, malzeme bilgisi vs)`,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
              { type: "text", text: `Bu yiyeceğin kalori ve makro değerlerini tahmin et.${notEkle}` }
            ]
          }]
        })
      });
      const data = await res.json();
      console.log("AI yanıt:", data);
      if(data.error) { setAiHata("API Hata: " + (data.error?.message || JSON.stringify(data.error))); setAiYukleniyor(false); return; }
      const text = data.content?.map(i=>i.text||"").join("") || "";
      const clean = text.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);
      setAiSonuc(parsed);
    } catch(e) {
      console.error("AI Hata:", e);
      setAiHata("Hata: " + (e?.message || JSON.stringify(e)));
    }
    setAiYukleniyor(false);
  };

  const aramaKaydet=(kelime)=>{
    if(!kelime||kelime.trim().length<2)return;
    const temiz=kelime.trim();
    setOncekiAramalar(prev=>{
      const yeni=[temiz,...prev.filter(x=>x!==temiz)].slice(0,8);
      try{localStorage.setItem("doya_ara_gecmis",JSON.stringify(yeni));}catch(e){}
      return yeni;
    });
  };

  const yemekEkle=async()=>{
    if(!secBesin)return;
    aramaKaydet(besinArama);
    const bg=bugunKey();
    const gram=+yemekGram||secBesin.por||100;
    const oran=gram/(secBesin.por||100);
    const saat=new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"});
    const kayit={
      ...secBesin, gram, kat:yemekKat, saat,
      gramKal : Math.round(secBesin.kal*oran),
      gramPro : +(secBesin.pro*oran).toFixed(1),
      gramKarb: +(secBesin.karb*oran).toFixed(1),
      gramYag : +(secBesin.yag*oran).toFixed(1),
      gramSod : Math.round((secBesin.sod||0)*oran),
    };
    const eskiY=gunV(bg).yemekler||[];
    const yeniGun={...gunV(bg),yemekler:[...eskiY,kayit]};
    setGunluk(prev=>({...prev,[bg]:yeniGun}));
    if(firebaseUID) await gunVeriKaydet(firebaseUID,bg,yeniGun).catch(console.error);
    setSecBesin(null); setBesinArama(""); setYemekGram("100");
    // tab koru
    seriGuncelle("yemek");
  };

  // ─── SERİ GÜNCELLE ───────────────────────────────────────────
  const seriGuncelle=(tip)=>{
    const bugun=tarihKey(new Date());
    const dun=tarihKey(new Date(Date.now()-864e5));
    const sonGun=localStorage.getItem("doya_"+tip+"_son");
    let yeniSeri=1;
    if(sonGun===dun){ yeniSeri=(tip==="yemek"?yemekSeri:adimSeri)+1; }
    else if(sonGun===bugun){ return; } // bugün zaten sayıldı
    localStorage.setItem("doya_"+tip+"_son",bugun);
    localStorage.setItem("doya_"+tip+"_seri",yeniSeri);
    if(tip==="yemek") setYemekSeri(yeniSeri);
    else setAdimSeri(yeniSeri);
    if(yeniSeri>1) setSeriMsg({tip, gun:yeniSeri});
    if(firebaseUID) kullaniciyiGuncelle(firebaseUID,{[tip+"Seri"]:yeniSeri}).catch(console.error);
  };

  // ─── SOSYAL ──────────────────────────────────────────────────
  const uidAra=()=>{
    setUidHata(""); setUidSonuc(null);
    const h=kullanicilar.find(u=>u.uid===uidArama.trim());
    if(!h){setUidHata("UID bulunamadı!");return;}
    if(h.uid===aktif?.uid){setUidHata("Kendinizi ekleyemezsiniz!");return;}
    if(engelliler.includes(h.uid)){setUidHata("Bu kullanıcıyı engellediniz.");return;}
    if(h.banli){setUidHata("Bu kullanıcı banlıdır.");return;}
    if(!h.sosyal){setUidHata("Bu kullanıcının sosyal özellikleri kapalı.");return;}
    if(arkadaslar.find(a=>a.uid===h.uid)){setUidHata("Zaten arkadaşsınız!");return;}
    setUidSonuc(h);
  };
  const DAVET_PUAN_LIMIT = 5; // Max kaç kişi davet ederek puan alınabilir
  const istekGonder=async(hUid)=>{
    const h=kullanicilar.find(u=>u.uid===hUid); if(!h)return;
    if(h.acik){
      const davetSayisi=aktif?.davet||0;
      const puanKazanilsin=davetSayisi<DAVET_PUAN_LIMIT;
      const yeniPuan=puanKazanilsin?(puan||0)+100:(puan||0);
      setArkadaslar(p=>[...p,{uid:h.uid,isim:h.isim}]);
      if(puanKazanilsin) setPuan(yeniPuan);
      if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{puan:yeniPuan}).catch(console.error);
    } else {
      setGonderilen(p=>[...p,{uid:h.uid,isim:h.isim,zaman:"Az önce"}]);
      if(firebaseUID && h.firebaseUID){
        try {
          const fbMod = await import("firebase/firestore");
          await fbMod.addDoc(fbMod.collection(db,"users",h.firebaseUID,"istekler"),{
            uid:aktif?.uid, isim:aktif.isim, firebaseUID, zaman: new Date().toISOString()
          });
        } catch(e){ console.error("İstek gönderilemedi:",e); }
      }
    }
    setUidArama(""); setUidSonuc(null);
  };
  const istekKabul=async(uid)=>{
    const h=kullanicilar.find(u=>u.uid===uid);
    if(h){
      setArkadaslar(p=>[...p,{uid:h.uid,isim:h.isim}]);
      if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{arkadaslar:[...arkadaslar.map(a=>a.uid),h.uid]}).catch(console.error);
    }
    setGelenIstekler(p=>p.filter(i=>i.uid!==uid));
  };
  const engelle=(uid)=>{setEngelliler(p=>[...p,uid]); setArkadaslar(p=>p.filter(a=>a.uid!==uid)); if(secArk?.uid===uid)setSecArk(null);};

  // ─── ADMIN ───────────────────────────────────────────────────
  // Admin kontrolü kodda değil — Firestore adminConfig/settings.adminEmails'de
  const banla=async(hedefUID)=>{
    const hedef=kullanicilar.find(u=>u.uid===hedefUID||u.firebaseUID===hedefUID);
    if(!hedef?.firebaseUID){setBanMsg("Kullanıcı bulunamadı!");return;}
    await kullaniciyiGuncelle(hedef.firebaseUID,{banli:true}).catch(console.error);
    setKullanicilar(p=>p.map(u=>u.uid===hedefUID?{...u,banli:true}:u));
    setBanMsg("Kullanıcı banlandı!"); setTimeout(()=>setBanMsg(""),2500);
  };
  const banKaldir=async(hedefUID)=>{
    const hedef=kullanicilar.find(u=>u.uid===hedefUID||u.firebaseUID===hedefUID);
    if(hedef?.firebaseUID) await kullaniciyiGuncelle(hedef.firebaseUID,{banli:false}).catch(console.error);
    setKullanicilar(p=>p.map(u=>u.uid===hedefUID?{...u,banli:false}:u));
  };
  const sosyalKisitla=async(hedefUID)=>{
    const hedef=kullanicilar.find(u=>u.uid===hedefUID||u.firebaseUID===hedefUID);
    if(hedef?.firebaseUID) await kullaniciyiGuncelle(hedef.firebaseUID,{sosyalKisitli:true,sosyal:false}).catch(console.error);
    setKullanicilar(p=>p.map(u=>u.uid===hedefUID?{...u,sosyalKisitli:true,sosyal:false}:u));
  };
  const sosyalKisitKaldir=async(hedefUID)=>{
    const hedef=kullanicilar.find(u=>u.uid===hedefUID||u.firebaseUID===hedefUID);
    if(hedef?.firebaseUID) await kullaniciyiGuncelle(hedef.firebaseUID,{sosyalKisitli:false,sosyal:true}).catch(console.error);
    setKullanicilar(p=>p.map(u=>u.uid===hedefUID?{...u,sosyalKisitli:false,sosyal:true}:u));
  };
  const adminOrtak=async(uid,tip,ozelRefKod,isletmeIsmi)=>{
    const h=kullanicilar.find(u=>u.uid===uid);
    if(!h){setAdminMsg("UID bulunamadı!");return;}
    if(h.admin){setAdminMsg("Admin hesabına atanamaz!");return;}
    const guncellemeler={refTip:tip,refOnay:true};
    if(ozelRefKod&&ozelRefKod.trim()) guncellemeler.refKod=ozelRefKod.trim().toUpperCase();
    if(isletmeIsmi&&isletmeIsmi.trim()) guncellemeler.isletmeIsmi=isletmeIsmi.trim();
    if(h.firebaseUID) await kullaniciyiGuncelle(h.firebaseUID,guncellemeler).catch(console.error);
    setKullanicilar(p=>p.map(u=>u.uid===uid?{...u,...guncellemeler}:u));
    setAdminMsg(`${h.isim} → ${tip} yapıldı!${ozelRefKod?" Kod: "+ozelRefKod.toUpperCase():""}${isletmeIsmi?" · "+isletmeIsmi:""}`);
    setTimeout(()=>setAdminMsg(""),3000);
    setAdminUid(""); setAdminOzelRefKod(""); setAdminIsletmeIsmi("");
  };
  const adminOrtakKaldir=async(uid)=>{
    const h=kullanicilar.find(u=>u.uid===uid);
    if(h?.firebaseUID) await kullaniciyiGuncelle(h.firebaseUID,{refTip:null,refOnay:false}).catch(console.error);
    setKullanicilar(p=>p.map(u=>u.uid===uid?{...u,refTip:null,refOnay:false}:u));
  };

  // ─── REFERANS KODU UYGULA ─────────────────────────────────────
  const refKodUygula=async()=>{
    const kod=girRefKod.trim().toUpperCase();
    if(!kod){setGirRefMesaj({tip:"hata",mesaj:"Lütfen bir referans kodu gir."});return;}
    if(girRefKilitli){return;}
    // Kendi kodunu giremez
    if(kod===aktif.refKod){setGirRefMesaj({tip:"hata",mesaj:"Kendi referans kodunu kullanamazsın."});return;}
    // Kodu bul
    const sahip=kullanicilar.find(u=>u.refKod===kod&&u.uid!==aktif?.uid);
    if(!sahip){setGirRefMesaj({tip:"hata",mesaj:"Geçersiz referans kodu. Tekrar kontrol et."});return;}
    // Influencer/işletme → sadece davet sayısı artar, puan kazanmaz (komisyon alır)
    // Normal kullanıcı → ikisine +150 puan
    const sahipOrtak = sahip.refTip==="influencer" || sahip.refTip==="isletme";
    const girenPuan = sahipOrtak ? 300 : 100; // influencer/işletme kodunda +300, normalde +100
    const sahipPuan = sahipOrtak ? 0 : 100; // influencer/işletme puan almaz
    const yeniPuanGiren = (puan||0) + girenPuan;
    const yeniPuanSahip = (sahip.puan||0) + sahipPuan;
    setPuan(yeniPuanGiren);
    setAktif(p=>({...p,puan:yeniPuanGiren,refKodKullandi:kod}));
    setKullanicilar(p=>p.map(u=>{
      if(u.uid===aktif?.uid) return{...u,puan:yeniPuanGiren,refKodKullandi:kod};
      if(u.uid===sahip.uid) return{...u,puan:yeniPuanSahip,davet:(u.davet||0)+1};
      return u;
    }));
    // Firebase'e kaydet
    if(firebaseUID){
      await kullaniciyiGuncelle(firebaseUID,{puan:yeniPuanGiren,refKodKullandi:kod}).catch(console.error);
    }
    if(sahip.firebaseUID){
      const sahipGuncelle = {davet:(sahip.davet||0)+1};
      if(!sahipOrtak) sahipGuncelle.puan = yeniPuanSahip;
      await kullaniciyiGuncelle(sahip.firebaseUID, sahipGuncelle).catch(console.error);
    }
    setGirRefKilitli(true);
    const mesaj = sahipOrtak
      ? `✅ Kod geçerli! Sana +300 puan eklendi. ${sahip.isim} komisyonunu alacak.`
      : `✅ Kod geçerli! Sana +100, ${sahip.isim}'e +100 puan eklendi.`;
    setGirRefMesaj({tip:"basari",mesaj});
  };

  // ─── TAKVIM ──────────────────────────────────────────────────
  const takvimGunler=()=>{
    const yil=takvimAy.getFullYear(),ay=takvimAy.getMonth();
    const bos=(new Date(yil,ay,1).getDay()+6)%7;
    const son=new Date(yil,ay+1,0).getDate();
    const arr=[];
    for(let i=0;i<bos;i++)arr.push(null);
    for(let i=1;i<=son;i++)arr.push({gun:i,key:tarihKey(new Date(yil,ay,i))});
    return arr;
  };

  // ─── YARIŞMA ─────────────────────────────────────────────────
  const yarisData=[
    {uid:aktif?.uid||"",isim:aktif?.isim||"",puan,kalBug:topKal,sporBug:topSpor},
    ...arkadaslar.map(a=>{
      const av=paylasimDB[a.uid]||{};
      const ay2=av.gunluk?.[bugunKey()]?.yemekler||[];
      const as=av.gunluk?.[bugunKey()]?.spor||[];
      return{uid:a.uid,isim:a.isim,puan:kullanicilar.find(u=>u.uid===a.uid)?.puan||0,
        kalBug:ay2.reduce((t,y)=>t+(y.gramKal||y.kal||0),0),
        sporBug:as.reduce((t,s)=>t+(s.kcal||0),0)};
    }),
  ].sort((a,b2)=>b2.puan-a.puan);

  // ─── KARŞILAMA / TANITIM EKRANI ──────────────────────────────
  if(welcomeGoster) {
    const slideIdx = welcomeSlide - 1; // -1 = dil seçim ekranı
    const slide = welcomeSlide > 0 ? L.slides[slideIdx] : null;
    const toplamSlide = L.slides.length;

    const welcomeBit=()=>{
      localStorage.setItem("doya_welcome_done","1");
      localStorage.setItem("doya_dil",dil);
      setWelcomeGoster(false);
      // Welcome bitince giriş/kayıt ekranına geçer (aktif null olduğundan zaten geçecek)
    };

    const ileri=()=>{
      if(welcomeSlide===0){
        localStorage.setItem("doya_dil",dil);
        setWelcomeSlide(1);
      } else if(welcomeSlide < toplamSlide){
        setWelcomeSlide(s=>s+1);
      } else {
        welcomeBit();
      }
    };

    const renderSlide = () => {
      if (!welcomeSlide || !slide) return null;
      const C = slide.vurgu||slide.renk||"#10b981";
      const ikonSVG = {
        kalori: `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1" stroke-linecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/><line x1="12" y1="10" x2="12" y2="16"/><line x1="9" y1="13" x2="15" y2="13"/></svg>`,
        ai: `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="3"/><path d="M8 21h8M12 17v4"/><circle cx="8.5" cy="10" r="1.5" fill="${C}"/><circle cx="15.5" cy="10" r="1.5" fill="${C}"/><path d="M9.5 13.5c.83.83 4.17.83 5 0"/></svg>`,
        diyetisyen: `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1" stroke-linecap="round"><path d="M12 2a5 5 0 0 1 5 5c0 3-2 5-5 8-3-3-5-5-5-8a5 5 0 0 1 5-5z"/><circle cx="12" cy="7" r="2"/><path d="M6 21v-1a6 6 0 0 1 12 0v1"/></svg>`,
        saglik: `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1" stroke-linecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
      };
      const svgStr = slide.svgIkon || ikonSVG[slide.ikon] || `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="${C}" strokeWidth="1" strokeLinecap="round"><circle cx="12" cy="12" r="10"/></svg>`;
      return (
        <div key={welcomeSlide} style={{flex:1,display:"flex",flexDirection:"column",minHeight:"100vh",position:"relative",background:"#030604"}}>
          {/* Glow */}
          <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:350,height:350,background:`radial-gradient(ellipse,${C}10 0%,transparent 65%)`,pointerEvents:"none"}}/>
          <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C}40,transparent)`}}/>
          {/* Progress */}
          <div style={{display:"flex",gap:4,padding:"6px 22px 0",position:"relative",zIndex:2}}>
            {L.slides.map((_,i)=>(
              <div key={i} style={{flex:1,height:2,borderRadius:99,background:i<welcomeSlide?C:"rgba(255,255,255,.07)",transition:"background .4s",boxShadow:i<welcomeSlide?`0 0 6px ${C}60`:"none"}}/>
            ))}
          </div>
          {/* İçerik */}
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"32px 28px 24px",position:"relative",zIndex:2,overflowY:"auto"}}>
            {/* İkon kutusu */}
            <div className="w1 w-float" style={{marginBottom:36}}>
              <div style={{width:96,height:96,borderRadius:32,background:`${C}09`,border:`1px solid ${C}20`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 0 14px ${C}05, 0 24px 64px rgba(0,0,0,.5)`}}
                dangerouslySetInnerHTML={{__html:svgStr}}/>
            </div>
            {/* Numara */}
            <div className="w2" style={{fontSize:9,fontWeight:700,color:`${C}60`,letterSpacing:3.5,textTransform:"uppercase",marginBottom:14}}>
              {String(slideIdx+1).padStart(2,"0")} — {L.slides.length} özellik
            </div>
            {/* Ana başlık */}
            <div className="w3" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:44,color:"#f0fdf4",lineHeight:1.05,fontWeight:300,letterSpacing:-1,marginBottom:16}}>
              {slide.baslik}
            </div>
            {/* Açıklama */}
            <div className="w4" style={{fontSize:14,color:"rgba(255,255,255,.38)",lineHeight:1.85,marginBottom:28,maxWidth:340,fontWeight:400}}>
              {slide.acik}
            </div>
            {/* Chip'ler */}
            <div className="w5" style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {(slide.detaylar||slide.ic||[]).map((item,i)=>(
                <div key={i} style={{background:`${C}0d`,border:`1px solid ${C}22`,borderRadius:99,padding:"6px 14px",fontSize:11,fontWeight:700,color:C,letterSpacing:.5}}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          {/* Alt buton */}
          <div style={{padding:"0 24px 52px",position:"relative",zIndex:2,display:"flex",flexDirection:"column",gap:14,alignItems:"center"}}>
            <button onClick={ileri} style={{
              width:"100%",maxWidth:380,padding:"17px 0",
              background:`linear-gradient(135deg,${C},${C}cc)`,
              border:`1px solid ${C}30`,
              borderRadius:18,fontSize:15,fontWeight:800,
              color:"#030604",cursor:"pointer",fontFamily:"'Nunito',sans-serif",
              boxShadow:`0 16px 48px ${C}30, 0 4px 12px rgba(0,0,0,.4)`,
              letterSpacing:.5,display:"flex",alignItems:"center",justifyContent:"center",gap:8,
            }}>
              {welcomeSlide===toplamSlide ? L.basla : L.devam}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <div style={{display:"flex",gap:7}}>
              {L.slides.map((_,i)=>(
                <div key={i} onClick={()=>setWelcomeSlide(i+1)} style={{
                  width:i===slideIdx?20:6,height:6,borderRadius:3,
                  background:i===slideIdx?C:"rgba(255,255,255,.12)",
                  cursor:"pointer",transition:"all .35s cubic-bezier(.34,1.2,.64,1)",
                  boxShadow:i===slideIdx?`0 0 8px ${C}60`:"none",
                }}/>
              ))}
            </div>
          </div>
        </div>
      );
    };

    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <style>{`
          @keyframes w-rise { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
          @keyframes w-glow { 0%,100%{opacity:.2} 50%{opacity:.45} }
          @keyframes w-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes w-check { from{transform:scale(0) rotate(-15deg);opacity:0} to{transform:scale(1) rotate(0);opacity:1} }
          .w1{animation:w-rise .6s .05s both cubic-bezier(.34,1.1,.64,1)}
          .w2{animation:w-rise .6s .15s both cubic-bezier(.34,1.1,.64,1)}
          .w3{animation:w-rise .6s .25s both cubic-bezier(.34,1.1,.64,1)}
          .w4{animation:w-rise .6s .35s both cubic-bezier(.34,1.1,.64,1)}
          .w5{animation:w-rise .6s .45s both cubic-bezier(.34,1.1,.64,1)}
          .w-float{animation:w-float 4s ease-in-out infinite}
          button:active{transform:scale(.96)!important}
          ::-webkit-scrollbar{width:0}
        `}</style>
        <div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",maxWidth:430,margin:"0 auto",background:"#030604",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden"}}>

          {/* Üst bar */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 22px",position:"relative",zIndex:2}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:"#e8f5ec",lineHeight:1,fontWeight:300,letterSpacing:.5}}>Doya</div>
            {welcomeSlide > 0 && (
              <button onClick={welcomeBit} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.07)",borderRadius:99,padding:"5px 16px",color:"rgba(255,255,255,.35)",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif",letterSpacing:.5}}>
                Atla
              </button>
            )}
          </div>

          {/* DİL SEÇİM EKRANI */}
          {welcomeSlide===0&&(
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px 48px",position:"relative",zIndex:2}}>
              {/* Glow */}
              <div style={{position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:280,height:200,background:"radial-gradient(ellipse,rgba(16,185,129,.06) 0%,transparent 70%)",animation:"w-glow 5s ease-in-out infinite",pointerEvents:"none"}}/>

              <div className="w1 w-float" style={{marginBottom:28}}>
                <div style={{width:80,height:80,borderRadius:28,background:"linear-gradient(145deg,rgba(16,185,129,.12),rgba(16,185,129,.02))",border:"1px solid rgba(16,185,129,.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
              </div>
              <div className="w2" style={{textAlign:"center",marginBottom:36}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,color:"#f0fdf4",fontWeight:300,letterSpacing:-.5,marginBottom:8}}>Dil Seçin</div>
                <div style={{fontSize:10,color:"rgba(52,211,153,.35)",letterSpacing:3,textTransform:"uppercase"}}>Select Language</div>
              </div>

              <div className="w3" style={{display:"flex",flexDirection:"column",gap:8,width:"100%",maxWidth:300}}>
                {[{k:"tr",ad:"Türkçe",fl:"🇹🇷"},{k:"en",ad:"English",fl:"🇬🇧"},{k:"de",ad:"Deutsch",fl:"🇩🇪"},{k:"it",ad:"Italiano",fl:"🇮🇹"},{k:"fr",ad:"Français",fl:"🇫🇷"},{k:"es",ad:"Español",fl:"🇪🇸"}].map(l=>(
                  <button key={l.k} onClick={()=>setDil(l.k)} style={{
                    padding:"13px 18px",
                    borderRadius:14,
                    border:`1px solid ${dil===l.k?"rgba(16,185,129,.4)":"rgba(255,255,255,.06)"}`,
                    background:dil===l.k?"rgba(16,185,129,.07)":"rgba(255,255,255,.02)",
                    cursor:"pointer",
                    fontFamily:"'Nunito',sans-serif",
                    display:"flex",alignItems:"center",justifyContent:"space-between",
                    transition:"all .2s",
                  }}>
                    <span style={{fontSize:15,fontWeight:700,color:dil===l.k?"#d1fae5":"rgba(255,255,255,.4)"}}>{l.fl} {l.ad}</span>
                    {dil===l.k&&<div className="w-check" style={{width:18,height:18,borderRadius:6,background:"rgba(16,185,129,.2)",border:"1px solid rgba(16,185,129,.4)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <svg width="9" height="8" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>}
                  </button>
                ))}
              </div>

              <div className="w4" style={{marginTop:32,width:"100%",maxWidth:300}}>
                <button onClick={ileri} style={{
                  width:"100%",padding:"16px 0",borderRadius:16,
                  background:"linear-gradient(135deg,#10b981,#059669 70%)",
                  border:"1px solid rgba(52,211,153,.2)",
                  color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",
                  fontFamily:"'Nunito',sans-serif",letterSpacing:.5,
                  boxShadow:"0 16px 48px rgba(16,185,129,.25), 0 4px 12px rgba(0,0,0,.4)",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                }}>
                  Devam Et
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* SLAYT EKRANLARI */}
          {renderSlide()}
        </div>
      </>
    );
  }

  // ─── YÜKLENİYOR EKRANI ───────────────────────────────────────
  if(yukleniyor) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/>
      <div style={{
        minHeight:"100vh",maxWidth:430,margin:"0 auto",
        background:"linear-gradient(150deg,#052e16 0%,#14532d 40%,#15803d 100%)",
        display:"flex",flexDirection:"column",alignItems:"center",
        justifyContent:"center",position:"relative",overflow:"hidden"
      }}>
        {/* Arka plan parçacıkları */}
        <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
          {[...Array(12)].map((_,i)=>(
            <div key={i} style={{
              position:"absolute",
              width: 4+((i*7)%8)+"px",
              height: 4+((i*7)%8)+"px",
              borderRadius:"50%",
              background:`rgba(134,239,172,${0.1+((i*13)%20)/100})`,
              left: (i*137%90)+"%",
              top: (i*97%90)+"%",
              animation:`floatUp ${3+((i*11)%4)}s ease-in-out ${((i*7)%30)/10}s infinite alternate`
            }}/>
          ))}
        </div>

        {/* Büyük halka animasyonu */}
        <div style={{position:"relative",marginBottom:32}}>
          <div style={{
            width:140,height:140,borderRadius:"50%",
            border:"3px solid rgba(134,239,172,0.15)",
            position:"absolute",top:-20,left:-20,
            animation:"ringPulse 2s ease-in-out infinite"
          }}/>
          <div style={{
            width:120,height:120,borderRadius:"50%",
            border:"2px solid rgba(134,239,172,0.25)",
            position:"absolute",top:-10,left:-10,
            animation:"ringPulse 2s ease-in-out 0.3s infinite"
          }}/>
          {/* Logo ikonu */}
          <div style={{
            width:100,height:100,
            background:"linear-gradient(145deg,#22c55e,#16a34a)",
            borderRadius:"50%",
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:"0 0 40px rgba(34,197,94,0.4)",
            animation:"iconBounce 1.8s ease-in-out infinite"
          }}>
            <svg width="56" height="56" viewBox="0 0 120 120" fill="none">
              <path d="M26 52 Q26 88 60 88 Q94 88 94 52 Z" fill="url(#bL2)"/>
              <ellipse cx="60" cy="52" rx="34" ry="8" fill="url(#rL2)"/>
              <path d="M52 65 Q60 52 72 60 Q60 78 52 65Z" fill="#fbbf24"/>
              <defs>
                <linearGradient id="bL2" x1="26" y1="52" x2="94" y2="88" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f0fdf4"/>
                  <stop offset="100%" stopColor="#bbf7d0"/>
                </linearGradient>
                <linearGradient id="rL2" x1="26" y1="44" x2="94" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#dcfce7"/>
                  <stop offset="100%" stopColor="#f0fdf4"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Uygulama adı */}
        <div style={{
          fontFamily:"'DM Serif Display',serif",
          fontSize:52,color:"#f0fdf4",
          lineHeight:1,marginBottom:8,
          animation:"fadeSlideUp 0.8s ease-out forwards"
        }}>
          Do<span style={{color:"#4ade80"}}>ya</span>
        </div>

        {/* Slogan */}
        <div style={{
          fontSize:13,color:"rgba(187,247,208,0.7)",
          letterSpacing:3,textTransform:"uppercase",
          marginBottom:48,fontFamily:"sans-serif",
          animation:"fadeSlideUp 0.8s ease-out 0.2s both"
        }}>
          Sağlıklı Beslenme Takibi
        </div>

        {/* İlerleme çubuğu */}
        <div style={{
          width:200,height:3,
          background:"rgba(255,255,255,0.1)",
          borderRadius:99,overflow:"hidden",
          marginBottom:16
        }}>
          <div style={{
            height:"100%",
            background:"linear-gradient(90deg,#22c55e,#4ade80,#86efac)",
            borderRadius:99,
            animation:"progressBar 2.2s ease-in-out infinite"
          }}/>
        </div>

        {/* Yükleniyor yazısı */}
        <div style={{
          fontSize:12,color:"rgba(187,247,208,0.5)",
          fontFamily:"sans-serif",letterSpacing:1,
          animation:"dotPulse 1.4s ease-in-out infinite"
        }}>
          Yükleniyor
          <span style={{animation:"dotPulse 1.4s 0.2s infinite"}}>.</span>
          <span style={{animation:"dotPulse 1.4s 0.4s infinite"}}>.</span>
          <span style={{animation:"dotPulse 1.4s 0.6s infinite"}}>.</span>
        </div>

        {/* Alttaki küçük bilgi */}
        <div style={{
          position:"absolute",bottom:32,
          fontSize:11,color:"rgba(187,247,208,0.3)",
          fontFamily:"sans-serif"
        }}>
          10.000+ besin · AI destekli
        </div>

        <style>{`
          @keyframes floatUp {
            from { transform: translateY(0) scale(1); opacity: 0.5; }
            to { transform: translateY(-20px) scale(1.2); opacity: 1; }
          }
          @keyframes ringPulse {
            0%,100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.08); opacity: 0.8; }
          }
          @keyframes iconBounce {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes progressBar {
            0% { width: 0%; margin-left: 0%; }
            50% { width: 60%; margin-left: 20%; }
            100% { width: 0%; margin-left: 100%; }
          }
          @keyframes tabSlideIn {
          0%  { opacity:0; transform:translateY(8px); }
          100%{ opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from{ opacity:0; } to{ opacity:1; }
        }
        @keyframes slideUp {
          0%  { opacity:0; transform:translateY(20px); }
          100%{ opacity:1; transform:translateY(0); }
        }
        @keyframes scaleIn {
          0%  { opacity:0; transform:scale(.95); }
          100%{ opacity:1; transform:scale(1); }
        }
        @keyframes dotPulse {
            0%,100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    </>
  );

    // ─── GİRİŞ EKRANI ────────────────────────────────────────────
  if(!aktif) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes g-rise  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes g-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes g-glow  { 0%,100%{opacity:.2} 50%{opacity:.45} }
        .g1{animation:g-rise .7s .1s both cubic-bezier(.34,1.1,.64,1)}
        .g2{animation:g-rise .7s .22s both cubic-bezier(.34,1.1,.64,1)}
        .g3{animation:g-rise .7s .34s both cubic-bezier(.34,1.1,.64,1)}
        .g4{animation:g-rise .7s .46s both cubic-bezier(.34,1.1,.64,1)}
        input:focus{border-color:rgba(16,185,129,.5)!important;box-shadow:0 0 0 3px rgba(16,185,129,.08)!important;outline:none!important}
        button:active{transform:scale(.96)!important}
        ::-webkit-scrollbar{width:0}
      `}</style>
      <div style={{fontFamily:"'Nunito',sans-serif",background:"#030604",minHeight:"100vh",maxWidth:430,margin:"0 auto",position:"relative",overflow:"hidden"}}>

        {/* Arka plan */}
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:320,height:320,background:"radial-gradient(circle,rgba(16,185,129,.07) 0%,transparent 65%)",animation:"g-glow 5s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(52,211,153,.2),transparent)"}}/>

        {/* Hero */}
        <div style={{position:"relative",paddingTop:88,paddingBottom:48,textAlign:"center",zIndex:1}}>
          {/* Logo */}
          <div className="g1" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:100,height:100,background:"linear-gradient(145deg,rgba(16,185,129,.15),rgba(16,185,129,.03))",borderRadius:32,marginBottom:28,boxShadow:"0 0 0 1px rgba(16,185,129,.12), 0 0 0 8px rgba(16,185,129,.03), 0 32px 80px rgba(0,0,0,.5)",animation:"g-float 5s ease-in-out infinite",border:"1px solid rgba(16,185,129,.15)"}}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1" strokeLinecap="round">
              <path d="M12 2a5 5 0 0 1 5 5c0 3-2 5-5 8-3-3-5-5-5-8a5 5 0 0 1 5-5z"/>
              <circle cx="12" cy="7" r="2" fill="#34d399" stroke="none" opacity=".8"/>
              <path d="M7 18c0-2 2-3 5-3s5 1 5 3" opacity=".5"/>
            </svg>
          </div>

          <div className="g1">
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:62,color:"#f0fdf4",lineHeight:.9,letterSpacing:-2,fontWeight:300}}>
              Do<span style={{color:"#34d399"}}>ya</span>
            </div>
          </div>
          <div className="g2" style={{fontSize:10,color:"rgba(52,211,153,.35)",letterSpacing:5,textTransform:"uppercase",marginTop:12,marginBottom:4}}>
            Beslen &nbsp;·&nbsp; Takip Et &nbsp;·&nbsp; Doyur
          </div>
          {/* Pills */}
          <div className="g3" style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap",padding:"0 24px"}}>
            {["AI Destekli","10K+ Besin","Kişisel Plan"].map(t=>(
              <span key={t} style={{background:"rgba(16,185,129,.06)",border:"1px solid rgba(16,185,129,.12)",color:"rgba(52,211,153,.6)",padding:"4px 12px",borderRadius:99,fontSize:9,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase"}}>{t}</span>
            ))}
          </div>
        </div>

        {/* Kart */}
        <div style={{position:"relative",zIndex:1,padding:"0 16px 40px"}}>
          <div style={{background:"rgba(255,255,255,.025)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",border:"1px solid rgba(255,255,255,.06)",borderRadius:28,padding:"28px 24px",boxShadow:"0 1px 0 rgba(255,255,255,.04) inset, 0 40px 100px rgba(0,0,0,.5)"}}>

            <div style={{textAlign:"center",marginBottom:24}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:"#e8f5ec",lineHeight:1.1,fontWeight:300,marginBottom:6}}>Hoşgeldiniz</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.3)",lineHeight:1.6,letterSpacing:.3}}>Google hesabınızla saniyeler içinde başlayın</div>
            </div>

            {/* KVKK onaylar */}
            <div style={{background:"rgba(16,185,129,.04)",border:"1px solid rgba(16,185,129,.1)",borderRadius:16,padding:"14px 16px",marginBottom:20}}>
              <div style={{fontSize:9,fontWeight:700,color:"rgba(52,211,153,.4)",marginBottom:12,letterSpacing:2,textTransform:"uppercase"}}>Onay Gerekiyor</div>
              {[
                {s:kvkkOnay,set:setKvkkOnay,label:"KVKK & Kullanım Koşulları",link:()=>setKvkkModal(true),zorunlu:true},
                {s:gdprOnay,set:setGdprOnay,label:"Gizlilik Politikası (GDPR)",link:()=>setGdprModal(true),zorunlu:true},
                {s:pazarlamaOnay,set:setPazarlamaOnay,label:"Güncelleme bildirimleri (isteğe bağlı)",link:null,zorunlu:false},
              ].map((f,i)=>(
                <label key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:i<2?10:0,cursor:"pointer"}}>
                  <div onClick={()=>f.set(!f.s)} style={{width:20,height:20,borderRadius:7,border:`1.5px solid ${f.s?"rgba(16,185,129,.6)":"rgba(255,255,255,.12)"}`,background:f.s?"rgba(16,185,129,.15)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}}>
                    {f.s&&<svg width="11" height="9" viewBox="0 0 11 9"><path d="M1 4.5L4 7.5L10 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
                  </div>
                  <span style={{fontSize:11,color:"rgba(187,247,208,.7)",lineHeight:1.5,flex:1}}>
                    {f.link?<button onClick={e=>{e.preventDefault();f.link();}} style={{background:"none",border:"none",padding:0,color:"#4ade80",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>{f.label}</button>:f.label}
                    {f.zorunlu&&<span style={{color:"#f87171",marginLeft:2}}>*</span>}
                  </span>
                </label>
              ))}
            </div>

            {gHata&&<div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",color:"#fca5a5",padding:"10px 14px",borderRadius:12,fontSize:12,marginBottom:16,textAlign:"center"}}>{gHata}</div>}

            {/* Google butonu */}
            <button style={{width:"100%",padding:"16px 0",borderRadius:16,border:`1px solid ${(kvkkOnay&&gdprOnay)?"rgba(16,185,129,.2)":"rgba(255,255,255,.05)"}`,background:(kvkkOnay&&gdprOnay)?"linear-gradient(145deg,rgba(16,185,129,.1),rgba(16,185,129,.05))":"rgba(255,255,255,.01)",cursor:(kvkkOnay&&gdprOnay)?"pointer":"not-allowed",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:15,color:(kvkkOnay&&gdprOnay)?"#d1fae5":"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",gap:12,transition:"all .25s",boxShadow:(kvkkOnay&&gdprOnay)?"0 8px 24px rgba(16,185,129,.15)":"none"}}
              onClick={async()=>{
                if(!kvkkOnay||!gdprOnay){setGHata("Devam edebilmek için zorunlu onayları işaretleyin.");return;}
                try{
                  const kul = await fbGoogleGiris();
                  try{
                    const {doc,setDoc}=await import("firebase/firestore");
                    await setDoc(doc(db,"users",kul.firebaseUID),{kvkkOnay:true,gdprOnay:true,pazarlamaOnay,onayTarihi:new Date().toISOString()},{merge:true});
                  }catch(e2){}
                  setAktif(kul); setFirebaseUID(kul.firebaseUID);
                  if(!kul.kilo && !kul.boy){ setOnboard(true); }
                }catch(e){setGHata(e.message);}
              }}>
              <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.6 26.9 36.5 24 36.5c-5.2 0-9.7-3-11.3-7.2L6 33.6C9.4 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C41 35.7 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"/></svg>
              Google ile Devam Et
            </button>

            <div style={{display:"flex",alignItems:"center",gap:8,margin:"14px 0"}}>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,.05)"}}/>
              <span style={{fontSize:9,color:"rgba(255,255,255,.18)",letterSpacing:1.5,textTransform:"uppercase"}}>Yakında</span>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,.05)"}}/>
            </div>

            <button disabled style={{width:"100%",padding:"14px 0",borderRadius:16,border:"1px solid rgba(255,255,255,.04)",background:"transparent",cursor:"not-allowed",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,color:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",gap:12}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,.2)"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple ile Giriş Yap
            </button>

            <div style={{marginTop:20,textAlign:"center"}}>
              <a href={"mailto:"+DESTEK_MAIL} style={{fontSize:10,color:"rgba(52,211,153,.25)",textDecoration:"none",letterSpacing:.5}}> {DESTEK_MAIL}</a>
            </div>
          </div>
        </div>

      </div>

      {/* KVKK MODAL */}
      {kvkkModal&&(
        <div style={{position:"fixed",inset:0,background:"#000a",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#fff",borderRadius:18,padding:24,maxWidth:400,width:"100%",maxHeight:"82vh",overflowY:"auto"}}>
            <div style={{fontWeight:900,fontSize:17,marginBottom:14,color:"#111"}}>📋 KVKK Aydınlatma Metni & Kullanım Koşulları</div>
            <div style={{fontSize:12,color:"#374151",lineHeight:1.9}}>
              <b>1. Veri Sorumlusu</b><br/>
              <b>Doya</b> uygulaması, 6698 sayılı KVKK kapsamında veri sorumlusudur. İletişim: {DESTEK_MAIL}<br/><br/>
              <b>2. İşlenen Kişisel Veriler</b><br/>
              • Ad, e-posta adresi (Google hesabından)<br/>
              • Yaş, cinsiyet, kilo, boy bilgileri<br/>
              • Günlük beslenme, su ve aktivite kayıtları<br/>
              • Uygulama kullanım istatistikleri<br/><br/>
              <b>3. İşleme Amaçları ve Hukuki Dayanak</b><br/>
              • Beslenme takip hizmetinin sunulması (sözleşme)<br/>
              • Kişiselleştirilmiş içerik (açık rıza)<br/>
              • Yasal yükümlülüklerin yerine getirilmesi<br/><br/>
              <b>4. Veri Güvenliği ve Aktarım</b><br/>
              Verileriniz, Firebase (Google Cloud, Europe-West3/Frankfurt sunucuları) üzerinde şifreli olarak saklanır. Üçüncü taraflarla pazarlama amacıyla paylaşılmaz. Firebase ile GDPR uyumlu Veri İşleme Sözleşmesi (DPA) imzalanmıştır.<br/><br/>
              <b>5. Saklama Süresi</b><br/>
              Hesap aktif olduğu sürece + hesap silme talebinden itibaren 30 gün. Yasal zorunluluk halinde bu süre uzayabilir.<br/><br/>
              <b>6. KVKK Haklarınız</b><br/>
              • Verilerinize erişim ve kopyasını isteme<br/>
              • Yanlış verilerin düzeltilmesini talep etme<br/>
              • Verilerinizin silinmesini talep etme<br/>
              • Veri işlemeye itiraz etme<br/>
              • Verilerinizi taşınabilir formatta alma<br/><br/>
              <b>7. Kullanım Koşulları</b><br/>
              Uygulama yalnızca kişisel kullanım içindir. Sunulan besin bilgileri ve sağlık puanları <b>bilgilendirme amaçlıdır</b>, tıbbi tavsiye niteliği taşımaz. Sağlıkla ilgili kararlarınız için mutlaka bir doktor veya diyetisyene danışınız. Doya, beslenme verilerinin doğruluğunu garanti etmez.<br/><br/>
              <b>İletişim:</b> {DESTEK_MAIL}
            </div>
            <button style={{...BTN(),width:"100%",marginTop:16,padding:"12px 0"}} onClick={()=>{setKvkkOnay(true);setKvkkModal(false);}}>Okudum ve Kabul Ediyorum</button>
            <button style={{...BTN("#6b7280"),width:"100%",marginTop:8,padding:"12px 0"}} onClick={()=>setKvkkModal(false)}>Kapat</button>
          </div>
        </div>
      )}

      {/* GDPR / GİZLİLİK POLİTİKASI MODAL */}
      {gdprModal&&(
        <div style={{position:"fixed",inset:0,background:"#000a",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#fff",borderRadius:18,padding:24,maxWidth:400,width:"100%",maxHeight:"82vh",overflowY:"auto"}}>
            <div style={{fontWeight:900,fontSize:17,marginBottom:14,color:"#111"}}>🔒 Gizlilik Politikası (GDPR/DSGVO)</div>
            <div style={{fontSize:12,color:"#374151",lineHeight:1.9}}>
              <b>Geçerlilik Tarihi:</b> {new Date().toLocaleDateString("tr-TR")}<br/><br/>
              <b>1. Veri Sorumlusu (Controller)</b><br/>
              Doya Uygulaması — {DESTEK_MAIL}<br/><br/>
              <b>2. Hangi Verileri Topluyoruz?</b><br/>
              • <b>Hesap bilgileri:</b> Ad, e-posta (Google OAuth)<br/>
              • <b>Sağlık verileri:</b> Kilo, boy, yaş, BMI hesaplamaları<br/>
              • <b>Beslenme verileri:</b> Günlük yemek, kalori, makro kayıtları<br/>
              • <b>Teknik veriler:</b> IP adresi, tarayıcı, kullanım saatleri<br/><br/>
              <b>3. Hukuki Dayanak (GDPR Madde 6)</b><br/>
              • Sözleşme ifası (Art. 6(1)(b))<br/>
              • Açık rıza — özel kategori sağlık verileri (Art. 9(2)(a))<br/>
              • Meşru menfaat — güvenlik ve kötüye kullanım önleme (Art. 6(1)(f))<br/><br/>
              <b>4. Veri İşleyenler (Processors)</b><br/>
              • <b>Google Firebase</b> (EU-West3, Frankfurt) — veritabanı ve kimlik doğrulama. Google ile GDPR DPA imzalanmıştır.<br/>
              • <b>Netlify</b> (CDN, ABD) — web hosting. Netlify ile DPA imzalanmıştır.<br/>
              • <b>Anthropic Claude API</b> — yalnızca AI fotoğraf analizi özelliği kullanıldığında, görüntü işleme için.<br/><br/>
              <b>5. Veri Aktarımı (AB Dışı)</b><br/>
              Netlify ve Anthropic ABD merkezlidir; aktarımlar Standart Sözleşme Maddeleri (SCCs) kapsamında gerçekleştirilmektedir.<br/><br/>
              <b>6. GDPR Haklarınız</b><br/>
              • <b>Erişim hakkı</b> (Art. 15) — Verilerinizi indirin<br/>
              • <b>Düzeltme hakkı</b> (Art. 16) — Profil bölümünden güncelleyin<br/>
              • <b>Silme hakkı</b> (Art. 17) — "Hesabımı Sil" butonu<br/>
              • <b>İşlemeyi kısıtlama</b> (Art. 18) — {DESTEK_MAIL}'e yazın<br/>
              • <b>Taşınabilirlik</b> (Art. 20) — Verilerinizi JSON formatında indirin<br/>
              • <b>İtiraz hakkı</b> (Art. 21) — {DESTEK_MAIL}'e yazın<br/>
              • <b>Denetim kurumuna şikayet:</b> Türkiye için KVK Kurumu, Almanya için Bundesbeauftragter für den Datenschutz (BfDI)<br/><br/>
              <b>7. Çerezler (Cookies)</b><br/>
              Yalnızca teknik zorunlu çerezler kullanılmaktadır. Analitik veya pazarlama çerezi kullanılmamaktadır.<br/><br/>
              <b>8. İletişim</b><br/>
              {DESTEK_MAIL}
            </div>
            <button style={{...BTN(),width:"100%",marginTop:16,padding:"12px 0"}} onClick={()=>{setGdprOnay(true);setGdprModal(false);}}>Okudum ve Kabul Ediyorum</button>
            <button style={{...BTN("#6b7280"),width:"100%",marginTop:8,padding:"12px 0"}} onClick={()=>setGdprModal(false)}>Kapat</button>
          </div>
        </div>
      )}
    </>
  );

  // ─── ONBOARDING ──────────────────────────────────────────────
  const obACC=["#10b981","#f0c14b","#3b82f6","#a78bfa","#f87171"];
  const obColor=obACC[obAdim-1]||obACC[0];
  const obPct=(obAdim/5)*100;

  if(onboard) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes ob-rise  { from{opacity:0;transform:translateY(30px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes ob-fade  { from{opacity:0} to{opacity:1} }
        @keyframes ob-glow  { 0%,100%{opacity:.25} 50%{opacity:.5} }
        @keyframes ob-pulse { 0%,100%{transform:scale(1)} 50%{transform:translateY(-6px)} }
        @keyframes ob-check { from{transform:scale(0) rotate(-20deg);opacity:0} to{transform:scale(1) rotate(0);opacity:1} }
        @keyframes ob-line  { from{width:0} to{width:100%} }
        .ob-r1{animation:ob-rise .55s .05s both cubic-bezier(.34,1.1,.64,1)}
        .ob-r2{animation:ob-rise .55s .15s both cubic-bezier(.34,1.1,.64,1)}
        .ob-r3{animation:ob-rise .55s .25s both cubic-bezier(.34,1.1,.64,1)}
        .ob-r4{animation:ob-rise .55s .35s both cubic-bezier(.34,1.1,.64,1)}
        .ob-r5{animation:ob-rise .55s .45s both cubic-bezier(.34,1.1,.64,1)}
        .ob-float{animation:ob-pulse 4s ease-in-out infinite}
        .ob-check-pop{animation:ob-check .3s cubic-bezier(.34,1.6,.64,1) both}
        ::-webkit-scrollbar{width:0}
        button{-webkit-tap-highlight-color:transparent}
        input{-webkit-tap-highlight-color:transparent}
        input:focus{outline:none}
        .ob-inp{background:rgba(255,255,255,.04);border:1px solid rgba(16,185,129,.15);border-radius:16px;color:#e8f5ec;font-family:'Nunito',sans-serif;transition:all .2s}
        .ob-inp:focus{border-color:rgba(16,185,129,.5)!important;background:rgba(16,185,129,.04)!important;box-shadow:0 0 0 3px rgba(16,185,129,.08)!important}
        .ob-inp::placeholder{color:rgba(255,255,255,.2)}
        .ob-sel{transition:all .22s cubic-bezier(.34,1.1,.64,1)}
        .ob-sel:active{transform:scale(.96)}
      `}</style>
      <div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",maxWidth:430,margin:"0 auto",background:"#030604",overflow:"hidden",position:"relative"}}>

        {/* ── İlerleme çubuğu ── */}
        <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,zIndex:999}}>
          <div style={{height:2,background:"rgba(255,255,255,.06)"}}>
            <div style={{height:"100%",width:obPct+"%",background:`linear-gradient(90deg,${obColor}aa,${obColor})`,borderRadius:2,transition:"width .5s cubic-bezier(.34,1.2,.64,1)",boxShadow:`0 0 8px ${obColor}60`}}/>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:8,padding:"14px 0 0"}}>
            {[1,2,3,4,5].map(i=>(
              <div key={i} style={{width:i===obAdim?20:6,height:6,borderRadius:3,background:i<obAdim?obColor:i===obAdim?obColor:"rgba(255,255,255,.12)",transition:"all .4s cubic-bezier(.34,1.2,.64,1)",opacity:i>obAdim?.4:1}}/>
            ))}
          </div>
        </div>

        {/* ══ ADIM 1 — Fiziksel Bilgiler ══ */}
        {obAdim===1&&(
          <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",position:"relative",background:"radial-gradient(ellipse 100% 60% at 50% -10%,rgba(16,185,129,.08) 0%,transparent 70%), #030604"}}>
            <div style={{position:"absolute",top:"15%",left:"50%",transform:"translateX(-50%)",width:400,height:400,background:"radial-gradient(circle,rgba(16,185,129,.04) 0%,transparent 65%)",animation:"ob-glow 5s ease-in-out infinite",pointerEvents:"none"}}/>

            <div style={{flex:1,padding:"80px 28px 32px",display:"flex",flexDirection:"column",position:"relative",zIndex:1}}>
              {/* İkon */}
              <div className="ob-r1 ob-float" style={{marginBottom:32}}>
                <div style={{width:80,height:80,borderRadius:28,background:"linear-gradient(145deg,rgba(16,185,129,.15),rgba(16,185,129,.03))",border:"1px solid rgba(16,185,129,.2)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 12px rgba(16,185,129,.04), 0 24px 64px rgba(0,0,0,.5)"}}>
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
              </div>

              <div className="ob-r2" style={{marginBottom:32}}>
                <div style={{fontSize:11,fontWeight:700,color:"rgba(52,211,153,.45)",letterSpacing:4,textTransform:"uppercase",marginBottom:12}}>01 — Beş adımdan biri</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:40,color:"#f0fdf4",lineHeight:1.05,fontWeight:300,letterSpacing:-.5,marginBottom:12}}>
                  Seni<br/><em style={{color:"#34d399",fontStyle:"italic"}}>tanıyalım</em>
                </div>
                <div style={{fontSize:14,color:"rgba(255,255,255,.35)",lineHeight:1.7,fontWeight:400}}>Kişisel kalori ve makro hedeflerini hesaplamak için birkaç bilgiye ihtiyacımız var.</div>
              </div>

              {/* Inputlar */}
              <div className="ob-r3" style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
                {[
                  {l:"Mevcut Kilo",u:"kg",v:obK,s:setObK,ph:"75",ic:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>},
                  {l:"Boy",u:"cm",v:obB,s:setObB,ph:"175",ic:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 7l-5-5-5 5"/><path d="M17 17l-5 5-5-5"/></svg>},
                  {l:"Yaş",u:"yıl",v:obY,s:setObY,ph:"25",ic:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-1a6 6 0 0 1 12 0v1"/></svg>},
                ].map((f,i)=>(
                  <div key={i}>
                    <div style={{fontSize:10,fontWeight:700,color:"rgba(52,211,153,.45)",letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>{f.l}</div>
                    <div style={{position:"relative"}}>
                      <div style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"rgba(52,211,153,.35)"}}>{f.ic}</div>
                      <input type="number" value={f.v} onChange={e=>f.s(e.target.value)} placeholder={f.ph} className="ob-inp"
                        style={{width:"100%",padding:"14px 52px 14px 42px",fontSize:18,fontWeight:700,boxSizing:"border-box"}}/>
                      <div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:11,color:"rgba(52,211,153,.35)",fontWeight:700,letterSpacing:1}}>{f.u}</div>
                    </div>
                  </div>
                ))}
                {/* Cinsiyet */}
                <div>
                  <div style={{fontSize:10,fontWeight:700,color:"rgba(52,211,153,.45)",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Cinsiyet</div>
                  <div style={{display:"flex",gap:8}}>
                    {[{v:"erkek",l:"Erkek"},{v:"kadin",l:"Kadın"}].map(c=>(
                      <button key={c.v} onClick={()=>setObC(c.v)} className="ob-sel"
                        style={{flex:1,padding:"13px 0",borderRadius:14,border:`1px solid ${obC===c.v?"rgba(16,185,129,.5)":"rgba(255,255,255,.07)"}`,background:obC===c.v?"rgba(16,185,129,.08)":"rgba(255,255,255,.02)",color:obC===c.v?"#34d399":"rgba(255,255,255,.4)",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:14}}>
                        {c.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ob-r4">
                <button onClick={()=>{if(!obK||!obB||!obY)return alert("Tüm alanları doldurun");setObAdim(2);}}
                  style={{width:"100%",padding:"17px 0",borderRadius:18,background:"linear-gradient(135deg,#10b981,#059669 70%)",border:"1px solid rgba(52,211,153,.2)",color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:"0 0 0 1px rgba(16,185,129,.1), 0 16px 48px rgba(16,185,129,.3), 0 4px 12px rgba(0,0,0,.4)",letterSpacing:.5,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  Devam Et
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ ADIM 2 — Hedef ══ */}
        {obAdim===2&&(
          <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",position:"relative",background:"radial-gradient(ellipse 100% 60% at 50% -10%,rgba(200,146,42,.07) 0%,transparent 70%), #030604"}}>
            <div style={{position:"absolute",top:"15%",right:"0",width:300,height:300,background:"radial-gradient(circle,rgba(200,146,42,.04) 0%,transparent 65%)",animation:"ob-glow 5s ease-in-out infinite",pointerEvents:"none"}}/>
            <button onClick={()=>setObAdim(1)} style={{position:"absolute",top:52,left:24,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"rgba(255,255,255,.4)",zIndex:2}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            <div style={{flex:1,padding:"80px 28px 32px",display:"flex",flexDirection:"column",position:"relative",zIndex:1}}>
              <div className="ob-r1 ob-float" style={{marginBottom:32}}>
                <div style={{width:80,height:80,borderRadius:28,background:"linear-gradient(145deg,rgba(200,146,42,.15),rgba(200,146,42,.03))",border:"1px solid rgba(200,146,42,.2)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 12px rgba(200,146,42,.03), 0 24px 64px rgba(0,0,0,.5)"}}>
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#f0c14b" strokeWidth="1.2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
              </div>
              <div className="ob-r2" style={{marginBottom:28}}>
                <div style={{fontSize:11,fontWeight:700,color:"rgba(240,193,75,.4)",letterSpacing:4,textTransform:"uppercase",marginBottom:12}}>02 — Hedefin</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:40,color:"#fefce8",lineHeight:1.05,fontWeight:300,letterSpacing:-.5,marginBottom:12}}>
                  Ne<br/><em style={{color:"#f0c14b",fontStyle:"italic"}}>istiyorsun?</em>
                </div>
              </div>
              <div className="ob-r3" style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
                {[
                  {v:"kilo_ver",l:"Kilo Vermek",a:"Kalori açığı ve yağ yakımı",c:"#10b981"},
                  {v:"kilo_al", l:"Kas Kazanmak",a:"Kalori fazlası ve kas gelişimi",c:"#3b82f6"},
                  {v:"koruma", l:"Sağlıklı Kalmak",a:"İdeal kiloda yaşam kalitesi",c:"#f0c14b"},
                ].map(o=>(
                  <button key={o.v} onClick={()=>setObHedef(o.v)} className="ob-sel"
                    style={{width:"100%",padding:"18px 18px",borderRadius:18,border:`1px solid ${obHedef===o.v?o.c+"55":"rgba(255,255,255,.06)"}`,background:obHedef===o.v?`${o.c}0a`:"rgba(255,255,255,.02)",cursor:"pointer",textAlign:"left",fontFamily:"'Nunito',sans-serif",display:"flex",alignItems:"center",gap:14}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:obHedef===o.v?o.c:"rgba(255,255,255,.15)",flexShrink:0,boxShadow:obHedef===o.v?`0 0 12px ${o.c}80`:"none",transition:"all .2s"}}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,fontWeight:700,color:obHedef===o.v?"#f0fdf4":"rgba(255,255,255,.55)",marginBottom:3}}>{o.l}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.25)"}}>{o.a}</div>
                    </div>
                    {obHedef===o.v&&<div className="ob-check-pop" style={{color:o.c}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>}
                  </button>
                ))}
                {(obHedef==="kilo_ver"||obHedef==="kilo_al")&&(
                  <div className="ob-r1">
                    <div style={{fontSize:10,fontWeight:700,color:"rgba(240,193,75,.4)",letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>Hedef Kilo</div>
                    <div style={{position:"relative"}}>
                      <input type="number" value={obHK} onChange={e=>setObHK(e.target.value)} placeholder="65" className="ob-inp"
                        style={{width:"100%",padding:"14px 52px 14px 16px",fontSize:18,fontWeight:700,boxSizing:"border-box"}}/>
                      <div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:11,color:"rgba(240,193,75,.4)",fontWeight:700,letterSpacing:1}}>kg</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="ob-r4">
                <button onClick={()=>setObAdim(3)}
                  style={{width:"100%",padding:"17px 0",borderRadius:18,background:"linear-gradient(135deg,#c8922a,#a16207)",border:"1px solid rgba(240,193,75,.2)",color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:"0 0 0 1px rgba(200,146,42,.1), 0 16px 48px rgba(200,146,42,.25), 0 4px 12px rgba(0,0,0,.4)",letterSpacing:.5,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  Devam Et
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ ADIM 3 — Aktivite ══ */}
        {obAdim===3&&(
          <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",position:"relative",background:"radial-gradient(ellipse 100% 60% at 50% -10%,rgba(59,130,246,.06) 0%,transparent 70%), #030604"}}>
            <button onClick={()=>setObAdim(2)} style={{position:"absolute",top:52,left:24,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"rgba(255,255,255,.4)",zIndex:2}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div style={{flex:1,padding:"80px 28px 32px",display:"flex",flexDirection:"column",position:"relative",zIndex:1}}>
              <div className="ob-r1 ob-float" style={{marginBottom:32}}>
                <div style={{width:80,height:80,borderRadius:28,background:"linear-gradient(145deg,rgba(59,130,246,.15),rgba(59,130,246,.03))",border:"1px solid rgba(59,130,246,.2)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 24px 64px rgba(0,0,0,.5)"}}>
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
              </div>
              <div className="ob-r2" style={{marginBottom:24}}>
                <div style={{fontSize:11,fontWeight:700,color:"rgba(96,165,250,.4)",letterSpacing:4,textTransform:"uppercase",marginBottom:12}}>03 — Aktivite</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:40,color:"#eff6ff",lineHeight:1.05,fontWeight:300,letterSpacing:-.5}}>
                  Ne kadar<br/><em style={{color:"#60a5fa",fontStyle:"italic"}}>hareket ediyorsun?</em>
                </div>
              </div>
              <div className="ob-r3" style={{display:"flex",flexDirection:"column",gap:6,marginBottom:24}}>
                {[
                  {v:"sedanter",  l:"Hareketsiz",    a:"Masa başı, spor yok",        w:15},
                  {v:"hafif",    l:"Hafif Aktif",   a:"Haftada 1–2 gün egzersiz",   w:35},
                  {v:"orta",     l:"Orta Aktif",    a:"Haftada 3–5 gün egzersiz",   w:55},
                  {v:"aktif",    l:"Çok Aktif",     a:"Günlük yoğun egzersiz",      w:80},
                  {v:"cokAktif", l:"Profesyonel",   a:"Günde 2 antrenman",          w:100},
                ].map(a=>(
                  <button key={a.v} onClick={()=>setObA(a.v)} className="ob-sel"
                    style={{width:"100%",padding:"14px 16px",borderRadius:16,border:`1px solid ${obA===a.v?"rgba(59,130,246,.4)":"rgba(255,255,255,.05)"}`,background:obA===a.v?"rgba(59,130,246,.07)":"rgba(255,255,255,.01)",cursor:"pointer",textAlign:"left",fontFamily:"'Nunito',sans-serif"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <span style={{fontSize:13,fontWeight:700,color:obA===a.v?"#bfdbfe":"rgba(255,255,255,.45)"}}>{a.l}</span>
                      {obA===a.v&&<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" className="ob-check-pop"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                    <div style={{height:2,background:"rgba(255,255,255,.05)",borderRadius:99,overflow:"hidden"}}>
                      <div style={{width:obA===a.v?a.w+"%":"0%",height:"100%",background:"linear-gradient(90deg,#3b82f6,#60a5fa)",borderRadius:99,transition:"width .6s cubic-bezier(.34,1.2,.64,1)"}}/>
                    </div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.2)",marginTop:4}}>{a.a}</div>
                  </button>
                ))}
              </div>
              <div className="ob-r4">
                <button onClick={()=>setObAdim(4)}
                  style={{width:"100%",padding:"17px 0",borderRadius:18,background:"linear-gradient(135deg,#2563eb,#1d4ed8)",border:"1px solid rgba(96,165,250,.2)",color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:"0 16px 48px rgba(37,99,235,.25), 0 4px 12px rgba(0,0,0,.4)",letterSpacing:.5,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  Devam Et
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ ADIM 4 — Beslenme Tarzı ══ */}
        {obAdim===4&&(
          <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",position:"relative",background:"radial-gradient(ellipse 100% 60% at 50% -10%,rgba(139,92,246,.06) 0%,transparent 70%), #030604",overflowY:"auto"}}>
            <button onClick={()=>setObAdim(3)} style={{position:"absolute",top:52,left:24,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"rgba(255,255,255,.4)",zIndex:2}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div style={{flex:1,padding:"80px 28px 32px",display:"flex",flexDirection:"column",position:"relative",zIndex:1}}>
              <div className="ob-r1 ob-float" style={{marginBottom:32}}>
                <div style={{width:80,height:80,borderRadius:28,background:"linear-gradient(145deg,rgba(139,92,246,.15),rgba(139,92,246,.03))",border:"1px solid rgba(139,92,246,.2)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 24px 64px rgba(0,0,0,.5)"}}>
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="1.2" strokeLinecap="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/></svg>
                </div>
              </div>
              <div className="ob-r2" style={{marginBottom:24}}>
                <div style={{fontSize:11,fontWeight:700,color:"rgba(196,181,253,.4)",letterSpacing:4,textTransform:"uppercase",marginBottom:12}}>04 — Beslenme</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:40,color:"#faf5ff",lineHeight:1.05,fontWeight:300,letterSpacing:-.5}}>
                  Beslenme<br/><em style={{color:"#a78bfa",fontStyle:"italic"}}>tarzın</em>
                </div>
              </div>
              <div className="ob-r3" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:24}}>
                {[
                  {v:"Normal",    l:"Her şey",    c:"#8b5cf6",ic:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>},
                  {v:"Vejeteryan",l:"Vejeteryan", c:"#10b981",ic:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/></svg>},
                  {v:"Vegan",     l:"Vegan",      c:"#34d399",ic:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>},
                  {v:"Ketojenik", l:"Keto",       c:"#f0c14b",ic:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>},
                  {v:"GlutenFree",l:"Glutensiz",  c:"#f87171",ic:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>},
                  {v:"Akdeniz",   l:"Akdeniz",    c:"#38bdf8",ic:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>},
                ].map(o=>(
                  <button key={o.v} onClick={()=>setObDiyet(o.v)} className="ob-sel"
                    style={{padding:"18px 12px",borderRadius:16,border:`1px solid ${obDiyet===o.v?o.c+"55":"rgba(255,255,255,.06)"}`,background:obDiyet===o.v?`${o.c}0d`:"rgba(255,255,255,.02)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,fontFamily:"'Nunito',sans-serif",position:"relative"}}>
                    {obDiyet===o.v&&<div className="ob-check-pop" style={{position:"absolute",top:8,right:8,width:16,height:16,borderRadius:5,background:o.c,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="8" height="7" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
                    <div style={{color:obDiyet===o.v?o.c:"rgba(255,255,255,.25)"}}>{o.ic}</div>
                    <span style={{fontSize:12,fontWeight:700,color:obDiyet===o.v?"#f5f3ff":"rgba(255,255,255,.4)"}}>{o.l}</span>
                  </button>
                ))}
              </div>
              <div className="ob-r4">
                <button onClick={()=>setObAdim(5)}
                  style={{width:"100%",padding:"17px 0",borderRadius:18,background:"linear-gradient(135deg,#7c3aed,#6d28d9)",border:"1px solid rgba(196,181,253,.15)",color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:"0 16px 48px rgba(124,58,237,.25), 0 4px 12px rgba(0,0,0,.4)",letterSpacing:.5,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  Devam Et
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ ADIM 5 — Alerji ══ */}
        {obAdim===5&&(
          <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",position:"relative",background:"radial-gradient(ellipse 100% 60% at 50% -10%,rgba(239,68,68,.05) 0%,transparent 70%), #030604",overflowY:"auto"}}>
            <button onClick={()=>setObAdim(4)} style={{position:"absolute",top:52,left:24,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"rgba(255,255,255,.4)",zIndex:2}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div style={{flex:1,padding:"80px 28px 32px",display:"flex",flexDirection:"column",position:"relative",zIndex:1}}>
              <div className="ob-r1 ob-float" style={{marginBottom:28}}>
                <div style={{width:80,height:80,borderRadius:28,background:"linear-gradient(145deg,rgba(239,68,68,.12),rgba(239,68,68,.02))",border:"1px solid rgba(239,68,68,.15)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 24px 64px rgba(0,0,0,.5)"}}>
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="1.2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
              </div>
              <div className="ob-r2" style={{marginBottom:20}}>
                <div style={{fontSize:11,fontWeight:700,color:"rgba(252,165,165,.4)",letterSpacing:4,textTransform:"uppercase",marginBottom:12}}>05 — Alerji</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:40,color:"#fff1f2",lineHeight:1.05,fontWeight:300,letterSpacing:-.5,marginBottom:8}}>
                  Alerji &<br/><em style={{color:"#f87171",fontStyle:"italic"}}>kısıtlamalar</em>
                </div>
                <div style={{fontSize:13,color:"rgba(255,255,255,.25)",lineHeight:1.6}}>Tariflerde ve AI önerilerinde otomatik işaretlenir</div>
              </div>
              <div className="ob-r3" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:16}}>
                {[
                  {id:"gluten",   l:"Gluten"},
                  {id:"laktoz",   l:"Laktoz"},
                  {id:"yumurta",  l:"Yumurta"},
                  {id:"kuruyemis",l:"Kuruyemiş"},
                  {id:"balik",    l:"Balık"},
                  {id:"kabuklu",  l:"Kabuklu"},
                  {id:"soya",     l:"Soya"},
                  {id:"susam",    l:"Susam"},
                ].map(a=>{
                  const s=obAlerji.includes(a.id);
                  return(
                    <button key={a.id} onClick={()=>setObAlerji(p=>s?p.filter(x=>x!==a.id):[...p,a.id])} className="ob-sel"
                      style={{padding:"14px 10px",borderRadius:14,border:`1px solid ${s?"rgba(239,68,68,.4)":"rgba(255,255,255,.06)"}`,background:s?"rgba(239,68,68,.07)":"rgba(255,255,255,.01)",cursor:"pointer",fontFamily:"'Nunito',sans-serif",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                      {s&&<div className="ob-check-pop" style={{position:"absolute",top:6,right:6,width:14,height:14,borderRadius:4,background:"#ef4444",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="7" height="6" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
                      <span style={{fontSize:13,fontWeight:700,color:s?"#fca5a5":"rgba(255,255,255,.4)"}}>{a.l}</span>
                    </button>
                  );
                })}
              </div>
              {obAlerji.length>0&&(
                <div className="ob-r1" style={{background:"rgba(239,68,68,.07)",border:"1px solid rgba(239,68,68,.15)",borderRadius:12,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>
                  <span style={{fontSize:11,color:"rgba(252,165,165,.7)",fontWeight:700}}>{obAlerji.length} alerji seçili</span>
                </div>
              )}
              <div className="ob-r4">
                <button onClick={()=>onboardBitir(false)}
                  style={{width:"100%",padding:"17px 0",borderRadius:18,background:"linear-gradient(135deg,#10b981,#059669 70%)",border:"1px solid rgba(52,211,153,.2)",color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:"0 16px 48px rgba(16,185,129,.3), 0 4px 12px rgba(0,0,0,.4)",letterSpacing:.5,display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:10}}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  Doya'ya Başla
                </button>
                <button onClick={()=>onboardBitir(true)}
                  style={{width:"100%",padding:"10px",background:"none",border:"none",color:"rgba(255,255,255,.2)",fontSize:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>
                  Alerjisiz devam et
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );


  // ─── ANA UYGULAMA ─────────────────────────────────────────────

  const secilenGV  = gunV(secTarih);
  const bugKatYemek= (kat)=>bugYemekler.filter(y=>y.kat===kat);
  const bugKatKal  = (kat)=>bugKatYemek(kat).reduce((t,y)=>t+(y.gramKal||0),0);

  // Su ring hesapları (IIFE yerine)
  const suRingPct = Math.min(1, bugSu/suHed);
  const suRingSC32 = 2*Math.PI*32;
  const suRingSC44 = 2*Math.PI*44;

  // Market reklam sekme render helper (IIFE yerine)
  const renderMarketReklam = () => {
    if(marketSekme!=="reklam") return null;
    const bugunR=bugunKey();
    const gecenGunR=gunlukReklamGun!==bugunR;
    const bugunIzlenen=gecenGunR?0:gunlukReklamIzle;
    const GUNLUK_REKLAM_MAX=10;
    const kalanReklam=GUNLUK_REKLAM_MAX-bugunIzlenen;
    return(
      <div style={{padding:14}}>
        {/* Günlük durum */}
        <div style={{background:"linear-gradient(135deg,#f59e0b22,#d9770611)",border:"1.5px solid #f59e0b44",borderRadius:12,padding:14,marginBottom:12,textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:4}}>📺</div>
          <div style={{fontSize:15,fontWeight:900,color:"#d97706"}}>Reklam İzle, Puan Kazan!</div>
          <div style={{fontSize:12,color:r.sub,marginTop:2}}>Her reklam <b style={{color:"#f59e0b"}}>+50 puan</b> kazandırır</div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:16,marginTop:10}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:28,fontWeight:900,color:"#f59e0b"}}>{bugunIzlenen}</div>
              <div style={{fontSize:9,color:r.muted}}>Bugün izlendi</div>
            </div>
            <div style={{fontSize:18,color:r.muted}}>/</div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:28,fontWeight:900,color:r.sub}}>{GUNLUK_REKLAM_MAX}</div>
              <div style={{fontSize:9,color:r.muted}}>Günlük max</div>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{...PB,height:8,marginTop:10,borderRadius:10}}>
            <div style={{...PF(bugunIzlenen/GUNLUK_REKLAM_MAX*100,"#f59e0b"),height:8,borderRadius:10}}/>
          </div>
        </div>
        {kalanReklam<=0?(
          <div style={{textAlign:"center",padding:"18px 0",color:r.muted}}>
            <div style={{fontSize:32,marginBottom:6}}>✅</div>
            <div style={{fontSize:13,fontWeight:700}}>Bugünkü tüm reklamları izledin!</div>
            <div style={{fontSize:11,marginTop:4}}>Yarın 10 reklam hakkın yenilenir.</div>
            <div style={{fontWeight:900,color:"#f59e0b",fontSize:16,marginTop:8}}>+{bugunIzlenen*50} puan kazandın bugün! 🎉</div>
          </div>
        ):(
          <>
            {reklamIzleniyor?(
              <div style={{textAlign:"center",padding:"20px 0"}}>
                <div style={{fontSize:14,fontWeight:700,color:r.text,marginBottom:12}}>Reklam yükleniyor...</div>
                <div style={{background:d?"#1e293b":"#f3f4f6",borderRadius:12,padding:"20px",marginBottom:12,position:"relative",overflow:"hidden"}}>
                  {/* Simüle reklam */}
                  <div style={{background:"linear-gradient(135deg,#667eea,#764ba2)",borderRadius:8,padding:"24px 20px",color:"#fff",marginBottom:8}}>
                    <div style={{fontSize:11,fontWeight:700,opacity:.7,marginBottom:4}}>REKLAM</div>
                    <div style={{fontSize:16,fontWeight:900,marginBottom:4}}>Sağlıklı Yaşam ile Doya!</div>
                    <div style={{fontSize:11,opacity:.8}}>Beslenme takibini hiç bu kadar kolay yapmadın.</div>
                    <div style={{marginTop:12,background:"rgba(255,255,255,.2)",borderRadius:6,padding:"6px 12px",display:"inline-block",fontSize:11,fontWeight:700}}>Daha Fazla Bilgi →</div>
                  </div>
                  {/* Geri sayım */}
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{fontSize:12,color:r.muted}}>Reklam oynatılıyor...</div>
                    <div style={{background:"#f59e0b",color:"#fff",borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:800}}>{reklamSayac}s</div>
                  </div>
                </div>
                <div style={{...PB,height:6}}>
                  <div style={{...PF((30-reklamSayac)/30*100,"#f59e0b"),height:6,transition:"width .9s linear"}}/>
                </div>
              </div>
            ):(
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:12,color:r.sub,marginBottom:12,lineHeight:1.6}}>
                  Reklam izleyerek puan kazan. Her reklam yaklaşık <b>30 saniye</b> sürer.
                  {ekstraAiHak>0&&<div style={{marginTop:6,color:"#7c3aed",fontWeight:700}}>✅ Aktif: +{ekstraAiHak} ekstra AI hak</div>}
                </div>
                <button onClick={()=>{
                  setReklamIzleniyor(true);
                  setReklamSayac(30);
                  const interval=setInterval(()=>{
                    setReklamSayac(s=>{
                      if(s<=1){
                        clearInterval(interval);
                        setReklamIzleniyor(false);
                        setReklamSayac(0);
                        // Puan ver
                        const yeniPuan=puan+50;
                        const bugunRR=bugunKey();
                        const gecenRR=gunlukReklamGun!==bugunRR;
                        const yeniIzlenen=(gecenRR?0:gunlukReklamIzle)+1;
                        setPuan(yeniPuan);
                        setGunlukReklamIzle(yeniIzlenen);
                        setGunlukReklamGun(bugunRR);
                        if(firebaseUID){
                          kullaniciyiGuncelle(firebaseUID,{
                            puan:yeniPuan,
                            gunlukReklam:{gun:bugunRR,sayi:yeniIzlenen}
                          }).catch(console.error);
                        }
                        return 0;
                      }
                      return s-1;
                    });
                  },1000);
                }} style={{...BTN("#f59e0b"),width:"100%",padding:"14px 0",fontSize:15,fontWeight:900}}>
                  📺 Reklam İzle → +50 Puan
                </button>
                <div style={{fontSize:10,color:r.muted,marginTop:8}}>
                  Bugün {kalanReklam} reklam hakkın kaldı · Toplam kazanabilirsin: +{kalanReklam*50} puan
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // Oruç tab render helper (IIFE yerine)
  const renderOrucTab = () => {
    if(tab!=="oruc") return null;
    const POPULER = [
      {ad:"14:10",sure:14,acik:"Başlangıç seviyesi"},
      {ad:"16:8", sure:16,acik:"En popüler yöntem"},
      {ad:"18:6", sure:18,acik:"Orta-ileri seviye"},
      {ad:"20:4", sure:20,acik:"İleri seviye"},
      {ad:"OMAD", sure:23,acik:"Günde 1 öğün"},
      {ad:"Özel", sure:0, acik:"Kendi sürenizi girin"},
    ];
    const simdi = Date.now();
    const aktifOruç = orucBaslangic !== null;
    const hedefMs = aktifOruç ? orucBaslangic + orucSure*3600000 : 0;
    const kalanMs = aktifOruç ? Math.max(0, hedefMs - simdi) : 0;
    const gecenMs = aktifOruç ? simdi - orucBaslangic : 0;
    const ilerleme = aktifOruç ? Math.min(100, (gecenMs / (orucSure*3600000))*100) : 0;
    const fmt = (ms) => {
      if(ms<=0) return "00:00:00";
      const s=Math.floor(ms/1000)%60;
      const m=Math.floor(ms/60000)%60;
      const h=Math.floor(ms/3600000);
      return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
    };
    const fmtGecen = (ms) => {
      const h=Math.floor(ms/3600000);
      const m=Math.floor((ms%3600000)/60000);
      return `${h} sa ${m} dk geçti`;
    };
    const baslat = (sureH) => {
      const now = Date.now();
      setOrucBaslangic(now);
      setOrucSure(sureH);
      setOrucAlarmCalindi(false);
      setOrucBitti(false);
      try{
        localStorage.setItem("doya_oruc_baslangic", String(now));
        localStorage.setItem("doya_oruc_sure", String(sureH));
      }catch(e){}
      if(Notification.permission==="default") Notification.requestPermission();
    };
    const durdur = () => {
      setOrucBaslangic(null);
      setOrucAlarmCalindi(false);
      setOrucBitti(false);
      try{ localStorage.removeItem("doya_oruc_baslangic"); }catch(e){}
    };
    const renkGradient = orucBitti
      ? "linear-gradient(135deg,#16a34a,#15803d)"
      : ilerleme>80
      ? "linear-gradient(135deg,#f59e0b,#d97706)"
      : "linear-gradient(135deg,#1e40af,#3b82f6)";
    const orucRenk = orucBitti ? "#10b981" : ilerleme>80 ? "#fbbf24" : "#60a5fa";
    const orucRenkGlow = orucBitti ? "rgba(16,185,129,.2)" : ilerleme>80 ? "rgba(251,191,36,.15)" : "rgba(96,165,250,.15)";
    return(
    <div style={{paddingBottom:80}}>
      {/* HERO */}
      <div style={{margin:"0 14px 8px",background:d?"linear-gradient(145deg,#030608,#040a12)":"linear-gradient(145deg,#eff6ff,#fff)",borderRadius:22,padding:"24px 20px 22px",border:`1px solid ${orucRenk}18`,position:"relative",overflow:"hidden",boxShadow:d?"0 20px 60px rgba(0,0,0,.5)":"0 8px 32px rgba(59,130,246,.08)"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:180,height:180,background:`radial-gradient(circle,${orucRenkGlow} 0%,transparent 65%)`}}/>
        <div style={{fontSize:9,fontWeight:700,color:`${orucRenk}66`,letterSpacing:3,textTransform:"uppercase",marginBottom:16}}>Aralıklı Oruç</div>
        {!aktifOruç ? (
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,fontWeight:300,color:d?"#e8f0fe":"#1e3a8a",lineHeight:1.1,letterSpacing:-.5,marginBottom:6}}>Oruç Başlat</div>
            <div style={{fontSize:10,color:r.muted,letterSpacing:.5}}>Bir plan seçin veya özel süre belirleyin</div>
          </div>
        ) : orucBitti ? (
          <div style={{textAlign:"center",padding:"8px 0"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:300,color:"#10b981",marginBottom:4,letterSpacing:-.5}}>Tebrikler</div>
            <div style={{fontSize:10,color:"rgba(16,185,129,.6)",letterSpacing:1}}>{orucSure} saatlik oruç tamamlandı</div>
          </div>
        ) : (
          <div>
            <div style={{fontSize:9,color:r.muted,marginBottom:8,letterSpacing:.5}}>{orucSecilenPlan} · {orucSure} saatlik oruç</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:54,fontWeight:300,color:orucRenk,letterSpacing:-1,lineHeight:1,marginBottom:8}}>{fmt(kalanMs)}</div>
            <div style={{fontSize:10,color:r.muted,marginBottom:14,letterSpacing:.5}}>{fmtGecen(gecenMs)} · %{Math.round(ilerleme)} tamamlandı</div>
            <div style={{height:2,background:d?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",borderRadius:99,overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:99,width:`${ilerleme}%`,background:orucRenk,transition:"width 1s linear",boxShadow:`0 0 8px ${orucRenkGlow}`}}/>
            </div>
          </div>
        )}
      </div>
      <div style={{padding:"0 14px"}}>
        {/* AKTİF STAT KARTLARI */}
        {aktifOruç&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            {[
              {label:"Geçen Süre",val:fmtGecen(gecenMs),c:"#60a5fa"},
              {label:"Bitiş Saati",val:new Date(hedefMs).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"}),c:"#a78bfa"},
              {label:"Yağ Yakımı",val:ilerleme>50?"Aktif":"Bekleniyor",c:ilerleme>50?"#10b981":"#fbbf24"},
              {label:"Su",val:"İçmeyi unutma",c:"#60a5fa"},
            ].map(k=>(
              <div key={k.label} style={{background:d?"#080e09":"#fff",border:`1px solid ${k.c}15`,borderRadius:16,padding:"14px 14px"}}>
                <div style={{fontSize:9,color:`${k.c}88`,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>{k.label}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:300,color:k.c,letterSpacing:-.3}}>{k.val}</div>
              </div>
            ))}
          </div>
        )}
        {/* TAMAMLANDI */}
        {orucBitti&&(
          <div style={{background:d?"linear-gradient(145deg,#04100a,#060f0b)":"linear-gradient(145deg,#f0fdf4,#fafff8)",border:"1px solid rgba(16,185,129,.15)",borderRadius:18,padding:"20px",marginBottom:8,textAlign:"center"}}>
            <div style={{fontSize:9,fontWeight:700,color:"rgba(16,185,129,.4)",letterSpacing:3,textTransform:"uppercase",marginBottom:10}}>Oruç Tamamlandı</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:"#10b981",marginBottom:12}}>{orucSure} saat boyunca mükemmel bir iş çıkardın</div>
            <button onClick={durdur} style={{background:"linear-gradient(135deg,#10b981,#059669)",border:"1px solid rgba(52,211,153,.2)",borderRadius:14,padding:"12px 32px",color:"#fff",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,cursor:"pointer",letterSpacing:.3,boxShadow:"0 8px 24px rgba(16,185,129,.25)"}}>Yeni Oruç Başlat</button>
          </div>
        )}
        {/* DURDUR BUTONU */}
        {aktifOruç&&!orucBitti&&(
          <button onClick={durdur} style={{width:"100%",padding:"14px 0",borderRadius:16,border:"1px solid rgba(248,113,113,.2)",background:d?"rgba(248,113,113,.06)":"rgba(239,68,68,.04)",color:"#f87171",fontFamily:"'Nunito',sans-serif",fontSize:14,fontWeight:800,cursor:"pointer",marginBottom:8,letterSpacing:.3}}>
            Orucu Sonlandır
          </button>
        )}
        {/* PLAN SEÇ */}
        {!aktifOruç&&(
          <>
            <div style={{...CS}}>
              <div style={{fontSize:9,fontWeight:700,color:r.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Popüler Planlar</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                {POPULER.filter(p=>p.sure>0).map(p=>(
                  <button key={p.ad} onClick={()=>{setOrucSecilenPlan(p.ad);setOrucOzelSure(p.sure);}}
                    style={{padding:"13px 6px",borderRadius:13,border:`1px solid ${orucSecilenPlan===p.ad?"rgba(96,165,250,.3)":"rgba(255,255,255,.05)"}`,
                      background:orucSecilenPlan===p.ad?(d?"rgba(96,165,250,.08)":"rgba(59,130,246,.05)"):(d?"rgba(255,255,255,.02)":"rgba(0,0,0,.02)"),
                      cursor:"pointer",textAlign:"center",transition:"all .15s",fontFamily:"'Nunito',sans-serif"}}>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:orucSecilenPlan===p.ad?"#60a5fa":r.text,letterSpacing:-.3}}>{p.ad}</div>
                    <div style={{fontSize:8,color:r.muted,marginTop:3,lineHeight:1.3,letterSpacing:.3}}>{p.acik}</div>
                  </button>
                ))}
              </div>
            </div>
            {/* SÜRE AYARLA */}
            <div style={{...CS}}>
              <div style={{fontSize:9,fontWeight:700,color:r.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:16}}>Süre Ayarla</div>
              <div style={{display:"flex",alignItems:"center",gap:16,justifyContent:"center",marginBottom:16}}>
                <button onClick={()=>setOrucOzelSure(v=>Math.max(1,v-1))}
                  style={{width:44,height:44,borderRadius:13,border:`1px solid ${d?"rgba(255,255,255,.07)":"rgba(0,0,0,.07)"}`,background:"transparent",fontSize:20,cursor:"pointer",color:r.muted,fontWeight:300}}>−</button>
                <div style={{textAlign:"center",minWidth:80}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:56,fontWeight:300,color:"#60a5fa",lineHeight:1,letterSpacing:-2}}>{orucOzelSure}</div>
                  <div style={{fontSize:9,color:r.muted,letterSpacing:2,textTransform:"uppercase",marginTop:4}}>Saat</div>
                </div>
                <button onClick={()=>setOrucOzelSure(v=>Math.min(72,v+1))}
                  style={{width:44,height:44,borderRadius:13,border:`1px solid ${d?"rgba(255,255,255,.07)":"rgba(0,0,0,.07)"}`,background:"transparent",fontSize:20,cursor:"pointer",color:r.muted,fontWeight:300}}>+</button>
              </div>
              <input type="range" min={1} max={72} value={orucOzelSure} onChange={e=>{setOrucOzelSure(Number(e.target.value));setOrucSecilenPlan("Özel");}}
                style={{width:"100%",accentColor:"#60a5fa",marginBottom:8,boxSizing:"border-box"}}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:r.muted,letterSpacing:.5}}>
                <span>1 sa</span><span>24 sa</span><span>48 sa</span><span>72 sa</span>
              </div>
            </div>
            {/* BAŞLANGIÇ BİLGİSİ */}
            <div style={{...CS,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:9,color:r.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Başlangıç</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,color:r.text,letterSpacing:-.5}}>{new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})}</div>
              </div>
              <div style={{width:1,height:32,background:d?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)"}}/>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:9,color:r.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Bitiş</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,color:"#60a5fa",letterSpacing:-.5}}>{new Date(Date.now()+orucOzelSure*3600000).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})}</div>
              </div>
            </div>
            {/* BAŞLAT */}
            <div style={{margin:"0 0 8px"}}>
              <button onClick={()=>baslat(orucOzelSure)}
                style={{width:"100%",padding:"17px 0",borderRadius:16,border:"1px solid rgba(96,165,250,.2)",background:"linear-gradient(135deg,rgba(37,99,235,.15),rgba(96,165,250,.08))",color:"#60a5fa",
                  fontSize:14,fontWeight:800,cursor:"pointer",boxShadow:"0 8px 32px rgba(59,130,246,.15)",
                  fontFamily:"'Nunito',sans-serif",letterSpacing:.5,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {orucOzelSure} Saatlik Oruca Başla
              </button>
            </div>
          </>
        )}
        {/* BİLGİ */}
        <div style={{...CS}}>
          <div style={{fontSize:9,fontWeight:700,color:r.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Zaman Çizelgesi</div>
          {[
            {sa:"12",bilgi:"İnsulin düşmeye başlar",c:"#60a5fa"},
            {sa:"14",bilgi:"Yağ yakımı başlar",c:"#fbbf24"},
            {sa:"16",bilgi:"Otofaji (hücre temizliği) aktifleşir",c:"#10b981"},
            {sa:"18",bilgi:"Büyüme hormonu yükselir",c:"#a78bfa"},
            {sa:"24",bilgi:"Derin otofaji, belirgin yağ yakımı",c:"#f87171"},
          ].map((b,bi,arr)=>(
            <div key={b.sa} style={{display:"flex",alignItems:"center",gap:12,paddingBottom:bi<arr.length-1?12:0,marginBottom:bi<arr.length-1?12:0,borderBottom:bi<arr.length-1?`1px solid ${d?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)"}`:undefined}}>
              <div style={{background:`${b.c}10`,border:`1px solid ${b.c}20`,borderRadius:8,padding:"5px 8px",fontSize:10,fontWeight:700,color:b.c,minWidth:30,textAlign:"center",letterSpacing:-.3}}>{b.sa}s</div>
              <div style={{fontSize:12,color:r.muted,lineHeight:1.4}}>{b.bilgi}</div>
            </div>
          ))}
          <div style={{fontSize:9,color:r.muted,marginTop:12,letterSpacing:.3,lineHeight:1.6}}>Bilgilendirme amaçlıdır. Sağlık durumunuza göre doktorunuza danışın.</div>
        </div>
      </div>
    </div>
    );
  };

  // Tarif listesi render helper (IIFE yerine)
  const renderTarifListesi = () => {
    const filtreli = tarifler.filter(t=>{
      if(tarifUlke==="Almanya") return t.ulke==="Almanya";
      if(tarifUlke==="Türkiye") return !t.ulke;
      if(!tarifKat) return true;
      return tarifKat==="Sporcu"?t.sporcu:t.kategori===tarifKat;
    });
    const goster = filtreli.slice(0,tarifLimit);
    return(<>
      {goster.map(tarif=>{
        // Alerji kontrolü
        const alerjiEslesme = alerjiListesi.filter(a=>{
          const malStr = (tarif.malzemeler||[]).join(" ").toLowerCase();
          const aMap = {
            "gluten":["un","ekmek","makarna","bulgur","arpa","yulaf","buğday","galeta","kraker","börek","pide"],
            "laktoz":["süt","peynir","tereyağ","yoğurt","krema","kefir","ayran","kaşar","mozzarella","parmesan"],
            "yumurta":["yumurta","omlet","mayonez"],
            "fındık":["fındık","fıstık","ceviz","badem","kaju","antep fıstığı","yer fıstığı"],
            "soya":["soya","tofu","tempeh"],
            "kabuklu":["karides","istakoz","yengeç","midye","kalamar","ahtapot"],
            "balık":["somon","ton","hamsi","uskumru","levrek","çipura","balık","alabalık"],
            "susam":["susam","tahini","tahin"],
          };
          return (aMap[a]||[]).some(k=>malStr.includes(k));
        });
        // Tokluk hesabı (protein+lif bazlı)
        const p=tarif.makro?.p||0, k=tarif.makro?.k||0, y=tarif.makro?.y||0;
        const kal=tarif.kalori||300;
        const tokPuan=Math.min(5,Math.max(1,Math.round(((p*0.5)+(k*0.1)+(y*0.2)+(kal>400?0.5:1))*2)/2));
        const tokRenk=tokPuan>=4?"#16a34a":tokPuan>=3?"#f59e0b":"#ef4444";
        const tokEtiket=tokPuan>=4?"Çok tok tutar":tokPuan>=3?"Orta tok":tokPuan>=2?"Az tok":"Kısa süre tok";
        return(
        <div key={tarif.id} style={{...CS,marginBottom:10,border:alerjiEslesme.length>0?"2px solid #ef444455":undefined}}>
          {alerjiEslesme.length>0&&(
            <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:8,padding:"6px 10px",marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:14}}>⚠️</span>
              <div>
                <div style={{fontSize:11,fontWeight:800,color:"#dc2626"}}>Alerji Uyarısı</div>
                <div style={{fontSize:10,color:"#b91c1c"}}>İçerebilir: {alerjiEslesme.map(a=>a.charAt(0).toUpperCase()+a.slice(1)).join(", ")}</div>
              </div>
            </div>
          )}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div>
              <div style={{fontSize:22,marginBottom:2}}>{tarif.emoji}</div>
              <div style={{fontWeight:800,fontSize:14,color:r.text}}>{tarif.baslik}</div>
              <div style={{display:"flex",gap:6,marginTop:4}}>
                <span style={{background:"#f0fdf4",color:"#16a34a",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700}}>⏱ {tarif.sure}</span>
                <span style={{background:"#eff6ff",color:"#2563eb",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700}}>{tarif.kategori}</span>
                <span style={{background:"#fef3c7",color:"#d97706",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700}}>{tarif.kalori} kcal</span>
              </div>
            </div>
            <div style={{background:"#f0fdf4",borderRadius:10,padding:"8px 10px",textAlign:"center",minWidth:60}}>
              <div style={{fontSize:10,color:r.muted,fontWeight:700}}>P/K/Y</div>
              <div style={{fontSize:10,fontWeight:800,color:"#16a34a"}}>{tarif.makro.p}g</div>
              <div style={{fontSize:10,fontWeight:800,color:"#f59e0b"}}>{tarif.makro.k}g</div>
              <div style={{fontSize:10,fontWeight:800,color:"#ef4444"}}>{tarif.makro.y}g</div>
            </div>
          </div>
          {/* Sağlık Yıldızı - makro bazlı hesaplama */}
          <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:8}}>
            <YildizGoster v={getTarifSaglik(tarif)} boyut={14}/>
            <span style={{fontSize:11,color:"#f59e0b",fontWeight:700}}>{getTarifSaglik(tarif)}/5</span>
            <span style={{fontSize:10,color:r.muted}}>sağlık puanı</span>
          </div>
          <details>
            <summary style={{cursor:"pointer",fontSize:12,fontWeight:700,color:"#16a34a",marginBottom:6}}>📋 Malzemeler ({tarif.malzemeler.length} adet)</summary>
            <div style={{background:d?"#1e293b":"#f9fafb",borderRadius:8,padding:"8px 10px",marginBottom:6}}>
              {tarif.malzemeler.map((m,i)=>{
                const alerjiKelimeler={gluten:["buğday","un","makarna","ekmek","arpa","çavdar","yulaf","galeta","kraker","bulgur"],laktoz:["süt","peynir","yoğurt","tereyağ","krema","lor","kaşar","mozzarella","kefir","ayran"],yumurta:["yumurta","omlet","mayonez"],fistik:["fıstık","yerfıstığı"],kuruyemis:["ceviz","badem","fındık","kaju","antep fıstığı","çam fıstığı"],fındık:["ceviz","badem","fındık","kaju","antep fıstığı"],balik:["somon","hamsi","ton","levrek","balık","karides","midye","deniz","uskumru","alabalık"],kabuklu:["karides","midye","yengeç","ıstakoz","ahtapot","kalamar"],soya:["soya","tofu","tempeh"],susam:["susam","tahin"],hardal:["hardal"],kereviz:["kereviz"]};
                const alerjiVar=alerjiListesi.some(al=>alerjiKelimeler[al]?.some(k=>m.toLowerCase().includes(k)));
                return(
                <div key={i} style={{fontSize:12,color:alerjiVar?"#ef4444":r.sub,marginBottom:2,display:"flex",alignItems:"center",gap:4}}>
                  {alerjiVar&&<span title="Alerjen içerebilir">⚠️</span>}
                  <span style={{fontWeight:alerjiVar?700:400}}>• {m}</span>
                  {alerjiVar&&<span style={{fontSize:9,background:"#fef2f2",color:"#ef4444",borderRadius:4,padding:"1px 5px",fontWeight:700}}>ALERJİ</span>}
                </div>);
              })}
            </div>
          </details>
          <details>
            <summary style={{cursor:"pointer",fontSize:12,fontWeight:700,color:"#2563eb",marginBottom:6}}>👨‍🍳 Hazırlanış ({tarif.adimlar.length} adım)</summary>
            <div style={{background:d?"#1e293b":"#f9fafb",borderRadius:8,padding:"8px 10px"}}>
              {tarif.adimlar.map((a,i)=>(
                <div key={i} style={{fontSize:12,color:r.sub,marginBottom:4,display:"flex",gap:8}}>
                  <span style={{background:"#16a34a",color:"#fff",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,flexShrink:0}}>{i+1}</span>
                  {a}
                </div>
              ))}
            </div>
          </details>
        </div>
        );
      })}
      {filtreli.length>tarifLimit&&(
        <button onClick={()=>setTarifLimit(p=>p+10)} style={{...BTN("#16a34a"),width:"100%",padding:"12px 0",fontSize:13,fontWeight:800,marginTop:4}}>
          ↓ Daha Fazla Göster ({filtreli.length-tarifLimit} tarif daha)
        </button>
      )}
      {tarifLimit>10&&filtreli.length<=tarifLimit&&(
        <div style={{textAlign:"center",fontSize:11,color:r.muted,padding:"8px 0"}}>Tüm tarifler listelendi ({filtreli.length})</div>
      )}
    </>);
  };

  // Tarif sağlık puanı hesaplama helper (IIFE yerine)
  const getTarifSaglik = (tarif) => {
    const kal=tarif.kalori||300;
    const p=tarif.makro?.p||0;
    const k=tarif.makro?.k||0;
    const y=tarif.makro?.y||0;
    const toplam=p*4+k*4+y*9||1;
    const proOran=(p*4/toplam)*100;
    const yagOran=(y*9/toplam)*100;
    let puan=0;
    if(proOran>=30) puan+=2; else if(proOran>=20) puan+=1.5; else if(proOran>=10) puan+=1;
    if(yagOran<=25) puan+=1.5; else if(yagOran<=35) puan+=1; else if(yagOran<=45) puan+=0.5;
    if(kal<=350) puan+=1; else if(kal<=500) puan+=0.5;
    if(p>=30) puan+=0.5;
    return Math.min(5,Math.max(0.5,Math.round(puan*2)/2));
  };

  // Kalori ring render helper (IIFE yerine)
  const renderKaloriRing = () => {
    const pct = Math.min(1, topKal / HEDEF);
    const R = 72, C = 2*Math.PI*R;
    const renk = topKal > HEDEF ? "#f87171" : topKal > HEDEF*0.8 ? "#fbbf24" : "#10b981";
    const renkGlow = topKal > HEDEF ? "rgba(248,113,113,.25)" : topKal > HEDEF*0.8 ? "rgba(251,191,36,.2)" : "rgba(16,185,129,.2)";
    const makrolar = [
      {l:"Protein",  v:Math.round(topPro), c:"#60a5fa"},
      {l:"Karb",     v:Math.round(topKarb),c:"#fbbf24"},
      {l:"Yağ",      v:Math.round(topYag), c:"#f87171"},
    ];
    return (
      <div className="lux-card" style={{...CS,padding:"22px 20px",background:d?"#080e09":"#ffffff",border:d?"1px solid rgba(16,185,129,.1)":"1px solid rgba(16,185,129,.12)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div>
            <div style={{fontSize:9,fontWeight:700,color:r.sub,letterSpacing:3,textTransform:"uppercase",marginBottom:5}}>Günlük Kalori</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:r.muted,fontWeight:300}}>{new Date().toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
          <button onClick={()=>setPsModal(true)} style={{background:d?"rgba(255,255,255,.04)":"rgba(0,0,0,.03)",border:`1px solid ${d?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)"}`,borderRadius:10,padding:"6px 12px",fontSize:9,fontWeight:700,color:r.muted,cursor:"pointer",display:"flex",alignItems:"center",gap:4,letterSpacing:1,textTransform:"uppercase"}}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            Paylaş
          </button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:24}}>
          <div style={{position:"relative",flexShrink:0}}>
            <svg width="168" height="168" viewBox="0 0 168 168">
              <defs>
                <radialGradient id="rG2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={renk} stopOpacity=".06"/>
                  <stop offset="100%" stopColor={renk} stopOpacity="0"/>
                </radialGradient>
              </defs>
              <circle cx="84" cy="84" r="84" fill="url(#rG2)"/>
              <circle cx="84" cy="84" r={R} fill="none" stroke={d?"rgba(255,255,255,.04)":"rgba(0,0,0,.05)"} strokeWidth="9"/>
              <circle cx="84" cy="84" r={R} fill="none" stroke={renk} strokeWidth="9"
                strokeDasharray={C} strokeDashoffset={C*(1-pct)} strokeLinecap="round"
                transform="rotate(-90 84 84)" style={{transition:"stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)",filter:`drop-shadow(0 0 8px ${renkGlow})`}}/>
            </svg>
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:40,fontWeight:300,color:renk,lineHeight:1,letterSpacing:-2}}>{topKal}</div>
              <div style={{fontSize:9,fontWeight:700,color:r.muted,letterSpacing:2,textTransform:"uppercase"}}>kcal</div>
              <div style={{fontSize:10,fontWeight:700,color:renk,marginTop:2,opacity:.6}}>{Math.round(pct*100)}%</div>
            </div>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:11}}>
            {[
              {l:"Hedef",v:HEDEF,c:r.text},
              {l:"Yedim",v:topKal,c:renk},
              {l:topKal<=HEDEF?"Kalan":"Fazla",v:Math.abs(HEDEF-topKal),c:topKal<=HEDEF?"#10b981":"#f87171"},
              ...(topSpor>0?[{l:"Spor",v:"+"+topSpor,c:"#10b981"}]:[]),
            ].map((s,i,arr)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:i<arr.length-1?11:0,borderBottom:i<arr.length-1?`1px solid ${d?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)"}`:undefined}}>
                <span style={{fontSize:9,color:r.muted,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase"}}>{s.l}</span>
                <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,color:s.c,letterSpacing:-.5}}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:20}}>
          {makrolar.map((m,i)=>(
            <div key={i} style={{flex:1,borderRadius:14,padding:"12px 8px",textAlign:"center",background:d?`${m.c}07`:`${m.c}06`,border:`1px solid ${m.c}15`}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,color:m.c,lineHeight:1,letterSpacing:-.5}}>{m.v}</div>
              <div style={{fontSize:7.5,color:r.muted,marginTop:4,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase"}}>{m.l}</div>
              <div style={{fontSize:9,color:m.c,fontWeight:600,opacity:.5}}>g</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Diyet listesi render helper (IIFE yerine)
  const renderDiyetListesi = () => {
    if(diyetListesiYuk||!diyetListesi||diyetListesi?.hata) return null;
    const katMeta={
      "Kahvaltı":{c:"#f59e0b"},
      "Öğle Yemeği":{c:"#3b82f6"},
      "Akşam Yemeği":{c:"#8b5cf6"},
      "Atıştırmalık":{c:"#10b981"},
    };
    const ogunler=[
      {k:"Kahvaltı",v:diyetListesi?.kahvalti},
      {k:"Öğle Yemeği",v:diyetListesi?.ogle},
      {k:"Akşam Yemeği",v:diyetListesi?.aksam},
      {k:"Atıştırmalık",v:diyetListesi?.atistirmalik},
    ].filter(o=>o.v?.length>0);
    return(
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {ogunler.map((og,oi)=>{
          const c=(katMeta[og.k]||{c:"#10b981"}).c;
          return(
            <div key={oi} style={{background:d?`${c}07`:`${c}05`,borderRadius:14,border:`1px solid ${c}18`,padding:"12px 14px"}}>
              <div style={{fontSize:9,fontWeight:700,color:`${c}99`,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>{og.k}</div>
              {og.v.map((item,ii)=>(
                <div key={ii} style={{display:"flex",gap:8,alignItems:"center",paddingBottom:ii<og.v.length-1?6:0,marginBottom:ii<og.v.length-1?6:0,borderBottom:ii<og.v.length-1?`1px solid ${c}12`:"none"}}>
                  <div style={{width:4,height:4,borderRadius:"50%",background:c,flexShrink:0,opacity:.6}}/>
                  <span style={{fontSize:12,color:d?"rgba(255,255,255,.55)":"rgba(0,0,0,.55)",flex:1,lineHeight:1.4}}>{item}</span>
                </div>
              ))}
            </div>
          );
        })}
        {diyetListesi?.su_tavsiye&&(
          <div style={{background:d?"rgba(59,130,246,.06)":"rgba(59,130,246,.05)",borderRadius:14,border:"1px solid rgba(59,130,246,.12)",padding:"11px 14px",display:"flex",alignItems:"center",gap:10}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            <span style={{fontSize:11,color:d?"rgba(147,197,253,.6)":"rgba(29,78,216,.6)",lineHeight:1.5,flex:1}}>{diyetListesi?.su_tavsiye}</span>
          </div>
        )}
        {diyetListesi?.toplam_kalori&&(
          <div style={{display:"flex",justifyContent:"flex-end",paddingTop:4}}>
            <span style={{fontSize:10,color:"rgba(167,139,250,.5)",fontWeight:700,letterSpacing:1}}>Toplam: {diyetListesi?.toplam_kalori} kcal</span>
          </div>
        )}
      </div>
    );
  };

  // Kilo grafik render helper (IIFE yerine)
  const renderKiloGrafik = () => {
    const son = kiloKayitlar.slice(-14);
    const minK = Math.min(...son.map(x=>x.kilo))-0.5;
    const maxK = Math.max(...son.map(x=>x.kilo))+0.5;
    const aral = maxK-minK||1;
    const W=280, H=72;
    const pts = son.map((x,i)=>`${Math.round(i/(son.length-1||1)*W)},${Math.round(H-(x.kilo-minK)/aral*H)}`).join(" ");
    const son_=son[son.length-1].kilo;
    const fark=son_-son[0].kilo;
    return(
      <div>
        <svg viewBox={`0 0 ${W} ${H+18}`} style={{width:"100%",height:82}}>
          <defs>
            <linearGradient id="kg2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity=".15"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon points={`0,${H} ${pts} ${W},${H}`} fill="url(#kg2)"/>
          <polyline points={pts} fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          {son.map((x,i)=>{
            const cx=Math.round(i/(son.length-1||1)*W);
            const cy=Math.round(H-(x.kilo-minK)/aral*H);
            return <circle key={i} cx={cx} cy={cy} r="2.5" fill="#10b981" opacity=".7"/>;
          })}
          <text x="0" y={H+16} fontSize="7.5" fill={d?"rgba(255,255,255,.2)":"rgba(0,0,0,.25)"}>{son[0].tarih.slice(5)}</text>
          <text x={W} y={H+16} fontSize="7.5" fill={d?"rgba(255,255,255,.2)":"rgba(0,0,0,.25)"} textAnchor="end">{son[son.length-1].tarih.slice(5)}</text>
        </svg>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:4}}>
          <div>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:300,color:r.text,letterSpacing:-1}}>{son_.toFixed(1)}</span>
            <span style={{fontSize:11,color:r.muted,fontWeight:500}}> kg şu an</span>
          </div>
          <div style={{display:"flex",gap:12}}>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:9,color:r.muted,letterSpacing:1.5,textTransform:"uppercase",marginBottom:2}}>Değişim</div>
              <div style={{fontSize:13,fontWeight:700,color:fark<0?"#10b981":fark>0?"#f87171":"#fbbf24"}}>{fark<0?"↓":"↑"} {Math.abs(fark).toFixed(1)} kg</div>
            </div>
            {profil.hedef&&<div style={{textAlign:"right"}}>
              <div style={{fontSize:9,color:r.muted,letterSpacing:1.5,textTransform:"uppercase",marginBottom:2}}>Hedefe</div>
              <div style={{fontSize:13,fontWeight:700,color:"#a78bfa"}}>{Math.abs(son_-+profil.hedef).toFixed(1)} kg</div>
            </div>}
          </div>
        </div>
      </div>
    );
  };

  // Aktif antrenman render helper (IIFE yerine)
  const renderAktifAntrenman = () => {
    if(!(sporAppAdim===2&&aktifAntrenman&&!antBitmis)) return null;
    const egz=aktifAntrenman.egzersizler;
    const aktifEgz=egz[antAdim]||egz[egz.length-1];
    const tamamlananSet=Object.entries(antSetTamamla).filter(([k])=>k.startsWith(antAdim+"-")).length;
    const mm=String(Math.floor(antSaniye/60)).padStart(2,"0");
    const ss=String(antSaniye%60).padStart(2,"0");
    return (
      <div>
        {/* Süre sayacı */}
        <div style={{background:"linear-gradient(135deg,#1e293b,#0f172a)",borderRadius:20,padding:"20px",marginBottom:14,textAlign:"center",color:"#fff"}}>
          <div style={{fontSize:48,fontWeight:900,fontFamily:"monospace"}}>{mm}:{ss}</div>
          <div style={{fontSize:12,opacity:.7}}>{aktifAntrenman.baslik}</div>
          <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>
            {egz.map((_,i)=>(
              <div key={i} style={{width:24,height:4,borderRadius:4,
                background:i<antAdim?"#22c55e":i===antAdim?"#f59e0b":"#374151"}}/>
            ))}
          </div>
        </div>

        {/* Aktif egzersiz */}
        <div style={{...CS,marginBottom:12,border:"2px solid #f59e0b"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
            <span style={{fontSize:36}}>{aktifEgz.ikon}</span>
            <div>
              <div style={{fontSize:17,fontWeight:900,color:r.text}}>{aktifEgz.ad}</div>
              <div style={{fontSize:11,color:"#f59e0b",fontWeight:700}}>{aktifEgz.kas} · {aktifEgz.set} set × {aktifEgz.rep}</div>
            </div>
          </div>
          {/* Hareket animasyonu */}
          <EgzersizAnim egzId={aktifEgz.id} ikon={aktifEgz.ikon}/>
          <div style={{background:r.inp,borderRadius:10,padding:"10px 12px",marginBottom:10,fontSize:12,color:r.sub,lineHeight:1.6}}>
            💡 {aktifEgz.acik}
          </div>
          {/* Set tamamlama */}
          <div style={{marginBottom:10}}>
            <div style={{fontSize:12,fontWeight:700,color:r.sub,marginBottom:6}}>Set Takibi</div>
            <div style={{display:"flex",gap:6}}>
              {Array(aktifEgz.set).fill(0).map((_,si)=>{
                const key=`${antAdim}-${si}`;
                const tam=!!antSetTamamla[key];
                return(
                  <button key={si} onClick={()=>setAntSetTamamla(p=>tam?Object.fromEntries(Object.entries(p).filter(([k])=>k!==key)):{...p,[key]:aktifEgz.id})}
                    style={{flex:1,padding:"10px 0",borderRadius:10,border:`2px solid ${tam?"#16a34a":"#e5e7eb"}`,
                      background:tam?"#16a34a":r.inp,color:tam?"#fff":r.sub,
                      cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .15s"}}>
                    {tam?"✓":si+1}. Set
                  </button>
                );
              })}
            </div>
          </div>
          {tamamlananSet===aktifEgz.set&&(
            <div style={{background:"#f0fdf4",borderRadius:10,padding:"8px 12px",fontSize:12,color:"#16a34a",fontWeight:700,textAlign:"center",marginBottom:8}}>
              ✅ {aktifEgz.ad} tamamlandı!
            </div>
          )}
        </div>

        {/* Navigasyon */}
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          {antAdim>0&&(
            <button onClick={()=>setAntAdim(p=>p-1)}
              style={{...BTN("transparent","11px 0"),flex:1,border:`1.5px solid ${r.inpB}`,color:r.sub,fontSize:13}}>
              ← Önceki</button>
          )}
          {antAdim<egz.length-1?(
            <button onClick={()=>setAntAdim(p=>p+1)}
              style={{...BTN("#1d4ed8","11px 0"),flex:2,fontSize:13}}>
              Sonraki Egzersiz →</button>
          ):(
            <button onClick={()=>antrenmanBitir(sporProgram)}
              style={{...BTN("#16a34a","11px 0"),flex:2,fontSize:13,fontWeight:900}}>
              🏆 Antrenmanı Bitir!</button>
          )}
        </div>

        {/* Tüm egzersizler mini listesi */}
        <div style={{...CS}}>
          <div style={{fontSize:11,fontWeight:700,color:r.sub,marginBottom:6}}>Egzersizler</div>
          {egz.map((e,i)=>(
            <button key={i} onClick={()=>setAntAdim(i)}
              style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"7px 8px",
                borderRadius:8,border:"none",background:i===antAdim?"#eff6ff":i<antAdim?"#f0fdf4":"transparent",
                cursor:"pointer",marginBottom:2}}>
              <span style={{fontSize:14}}>{e.ikon}</span>
              <span style={{flex:1,textAlign:"left",fontSize:12,fontWeight:i===antAdim?700:400,
                color:i===antAdim?"#1d4ed8":i<antAdim?"#16a34a":r.sub}}>{e.ad}</span>
              <span style={{fontSize:10,color:r.sub}}>{e.set}×{e.rep}</span>
              {i<antAdim&&<span style={{color:"#16a34a",fontSize:12}}>✓</span>}
              {i===antAdim&&<span style={{color:"#f59e0b",fontSize:10,fontWeight:700}}>● şimdi</span>}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Nunito:wght@400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');
        * { -webkit-tap-highlight-color: transparent; box-sizing:border-box; }
        ::-webkit-scrollbar { width:0; height:0; }
        button { transition: all .18s cubic-bezier(.34,1.2,.64,1); }
        button:active { transform:scale(.95); }
        input:focus { outline:none; }
        input::placeholder { opacity:.4; }

        /* ── Animasyonlar ── */
        @keyframes lux-in   { from{opacity:0;transform:translateY(18px) scale(.98)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes lux-fade { from{opacity:0} to{opacity:1} }
        @keyframes lux-up   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes tab-in   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes tab-out  { from{opacity:1} to{opacity:0;transform:translateY(-5px)} }
        @keyframes slide-up { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes shimmer  { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes glow-pulse { 0%,100%{opacity:.3} 50%{opacity:.6} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes ring-fill { from{stroke-dashoffset:427} }
        @keyframes number-pop { 0%{transform:scale(.8);opacity:0} 100%{transform:scale(1);opacity:1} }

        .lux-card { animation: lux-in .5s cubic-bezier(.34,1.1,.64,1) both; }
        .lux-card:nth-child(1){animation-delay:.05s}
        .lux-card:nth-child(2){animation-delay:.1s}
        .lux-card:nth-child(3){animation-delay:.15s}
        .lux-card:nth-child(4){animation-delay:.2s}
        .lux-card:nth-child(5){animation-delay:.25s}
        .tab-enter { animation: tab-in .25s cubic-bezier(.34,1.2,.64,1) forwards; }
        .tab-exit  { animation: tab-out .14s ease-in forwards; }
        .modal-enter { animation: slide-up .32s cubic-bezier(.34,1.3,.64,1) forwards; }
        .spin  { animation: spin .8s linear infinite; }
        .pulse { animation: pulse 1.5s ease-in-out infinite; }
        .float { animation: float 3.5s ease-in-out infinite; }

        /* ── Lüks kart hover ── */
        .lux-lift { transition: transform .2s, box-shadow .2s; }
        .lux-lift:active { transform:scale(.985); }

        /* ── Input focus ── */
        .lux-input:focus {
          border-color: rgba(16,185,129,.6) !important;
          box-shadow: 0 0 0 3px rgba(16,185,129,.1), 0 2px 8px rgba(0,0,0,.3) !important;
        }
        .ob-inp {
          background: rgba(255,255,255,.04) !important;
          border: 1px solid rgba(255,255,255,.08) !important;
          border-radius: 14px !important;
          color: #e8f5ec !important;
          font-family: 'Nunito', sans-serif !important;
          font-size: 14px !important;
          transition: border .15s, box-shadow .15s !important;
        }
        .ob-inp:focus {
          border-color: rgba(52,211,153,.3) !important;
          box-shadow: 0 0 0 3px rgba(16,185,129,.06) !important;
          outline: none !important;
        }
        .ob-inp::placeholder { color: rgba(255,255,255,.2) !important; }

        /* ── Shimmer efekti ── */
        .shimmer-line::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent);
          animation: shimmer 2.5s ease-in-out infinite;
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Nunito:wght@400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/>
      <div style={{fontFamily:"'Nunito',sans-serif",background:r.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",paddingBottom:92,transition:"background .5s ease",position:"relative"}}>
        {/* Arka plan doku */}
        {d&&<div style={{position:"fixed",inset:0,maxWidth:430,left:"50%",transform:"translateX(-50%)",background:"radial-gradient(ellipse 60% 40% at 50% 0%,rgba(16,185,129,.04) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>}

        {/* ══ SPOR UYGULAMASI MODAL ══════════════════════════════════ */}
        {sporAppAcik&&(
          <div style={{position:"fixed",inset:0,background:r.bg,zIndex:9990,display:"flex",flexDirection:"column",overflowY:"auto"}}>
            {/* Header */}
            <div style={{background:"linear-gradient(135deg,#1d4ed8,#7c3aed)",padding:"16px 18px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
              <div>
                <div style={{color:"#fff",fontSize:18,fontWeight:900}}>
                  {sporAppAdim===0?"🏋️ Spor Kurulumu":sporAppAdim===1?"📋 Programın":sporAppAdim===2?"💪 Antrenman":"✅ Tebrikler!"}
                </div>
                <div style={{color:"rgba(255,255,255,.75)",fontSize:11}}>
                  {sporAppAdim===0?"Sana özel program oluşturalım":sporAppAdim===1?"Bugünkü egzersizlerini seç":sporAppAdim===2?"Sağlıklı ol, güçlen!":"Harika iş çıkardın!"}
                </div>
              </div>
              <button onClick={()=>{setSporAppAcik(false);if(antInterval)clearInterval(antInterval);}}
                style={{background:"rgba(255,255,255,.2)",border:"none",color:"#fff",borderRadius:10,padding:"6px 12px",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13}}>
                ✕ Kapat</button>
            </div>

            <div style={{flex:1,padding:"16px 16px 24px",maxWidth:430,margin:"0 auto",width:"100%"}}>

            {/* ── ADIM 0: KURULUM SORULARI ─────────────────────── */}
            {sporAppAdim===0&&(
              <div>
                {/* Progress bar */}
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
                  {[0,1,2,3,4].map(i=>(
                    <div key={i} style={{flex:1,height:4,borderRadius:2,
                      background:i<sporSoruAdim?"#1d4ed8":i===sporSoruAdim?"#1d4ed8":r.inpB,
                      opacity:i===sporSoruAdim?1:i<sporSoruAdim?0.9:0.3,
                      transition:"all .3s"}}/>
                  ))}
                  <span style={{fontSize:11,color:r.sub,whiteSpace:"nowrap"}}>{sporSoruAdim+1}/5</span>
                </div>

                {/* Soru 0: Hedef */}
                {sporSoruAdim===0&&(
                  <div style={{animation:"ob-rise .4s both"}}>
                    <div style={{textAlign:"center",marginBottom:20}}>
                      <div style={{fontSize:36,marginBottom:8}}>🎯</div>
                      <div style={{fontSize:18,fontWeight:900,color:r.text,marginBottom:4}}>Hedefin ne?</div>
                      <div style={{fontSize:12,color:r.sub}}>Sana özel bir program hazırlayalım</div>
                    </div>
                    {[
                      {v:"kilo_ver",ikon:"🔥",l:"Yağ Yak / Kilo Ver",a:"Kalori yak, formu iyileştir"},
                      {v:"kas",     ikon:"💪",l:"Kas Geliştir",       a:"Hacim ve güç kazan"},
                      {v:"kilo_al", ikon:"📈",l:"Kilo Al / Hacim",    a:"Sağlıklı kilo kazan"},
                      {v:"form",    ikon:"🎯",l:"Formu Koru",         a:"Kondisyonu geliştir"},
                      {v:"saglik",  ikon:"🌿",l:"Sağlıklı Yaşa",      a:"Genel sağlık ve enerji"},
                    ].map(o=>(
                      <button key={o.v} onClick={()=>{setSporHedefSA(o.v);setSporSoruAdim(1);}}
                        style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"14px 16px",
                          borderRadius:14,border:`2px solid ${sporHedef===o.v?"#1d4ed8":r.inpB}`,
                          background:sporHedef===o.v?"#eff6ff":r.inp,marginBottom:10,cursor:"pointer",
                          transition:"all .15s",textAlign:"left"}}>
                        <span style={{fontSize:26}}>{o.ikon}</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:14,fontWeight:700,color:sporHedef===o.v?"#1d4ed8":r.text}}>{o.l}</div>
                          <div style={{fontSize:11,color:r.sub}}>{o.a}</div>
                        </div>
                        {sporHedef===o.v&&<span style={{color:"#1d4ed8",fontSize:20}}>✓</span>}
                      </button>
                    ))}
                  </div>
                )}

                {/* Soru 1: Bölge */}
                {sporSoruAdim===1&&(
                  <div style={{animation:"ob-rise .4s both"}}>
                    <div style={{textAlign:"center",marginBottom:20}}>
                      <div style={{fontSize:36,marginBottom:8}}>🎯</div>
                      <div style={{fontSize:18,fontWeight:900,color:r.text,marginBottom:4}}>Hangi bölgeye odaklanmak istersin?</div>
                      <div style={{fontSize:12,color:r.sub}}>Birden fazla seçebilirsin</div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
                      {[
                        {v:"karin",  ikon:"⚡",l:"Karın",      a:"Core & abs"},
                        {v:"omuz",   ikon:"🏔️",l:"Omuz",       a:"Deltoid & trapez"},
                        {v:"gogus",  ikon:"🦁",l:"Göğüs",      a:"Pektoral kaslar"},
                        {v:"sirt",   ikon:"🦅",l:"Sırt",        a:"Lat & rhomboid"},
                        {v:"bacak",  ikon:"🦵",l:"Bacak",       a:"Quad, hamstring, kalça"},
                        {v:"kol",    ikon:"💪",l:"Kol",         a:"Biceps & triceps"},
                      ].map(o=>(
                        <button key={o.v}
                          onClick={()=>setSporBolge(p=>p.includes(o.v)?p.filter(x=>x!==o.v):[...p,o.v])}
                          style={{padding:"14px 10px",borderRadius:14,
                            border:`2px solid ${sporBolge.includes(o.v)?"#7c3aed":r.inpB}`,
                            background:sporBolge.includes(o.v)?"#f5f3ff":r.inp,
                            cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
                          <div style={{fontSize:28,marginBottom:4}}>{o.ikon}</div>
                          <div style={{fontSize:13,fontWeight:800,color:sporBolge.includes(o.v)?"#7c3aed":r.text}}>{o.l}</div>
                          <div style={{fontSize:10,color:r.sub}}>{o.a}</div>
                          {sporBolge.includes(o.v)&&<div style={{fontSize:10,color:"#7c3aed",fontWeight:700,marginTop:4}}>✓ Seçildi</div>}
                        </button>
                      ))}
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>setSporSoruAdim(0)}
                        style={{...BTN("transparent","13px 0"),flex:"0 0 80px",border:`1.5px solid ${r.inpB}`,color:r.sub,fontSize:13}}>
                        ← Geri</button>
                      <button onClick={()=>setSporSoruAdim(2)}
                        style={{...BTN("#7c3aed","13px 0"),flex:1,fontSize:14,fontWeight:800}}>
                        Devam Et →</button>
                    </div>
                  </div>
                )}

                {/* Soru 2: Seviye */}
                {sporSoruAdim===2&&(
                  <div style={{animation:"ob-rise .4s both"}}>
                    <div style={{textAlign:"center",marginBottom:20}}>
                      <div style={{fontSize:36,marginBottom:8}}>📊</div>
                      <div style={{fontSize:18,fontWeight:900,color:r.text,marginBottom:4}}>Spor seviyeniz nedir?</div>
                      <div style={{fontSize:12,color:r.sub}}>Dürüst ol — en iyi sonucu bu verir 😊</div>
                    </div>
                    {[
                      {v:"baslangic",ikon:"🌱",l:"Başlangıç",a:"Düzenli spor yapmıyorum veya yeni başlıyorum",renk:"#10b981"},
                      {v:"orta",     ikon:"⚡",l:"Orta",     a:"Haftada birkaç kez düzenli spor yapıyorum",renk:"#f59e0b"},
                      {v:"ileri",    ikon:"🔥",l:"İleri",    a:"Yoğun antrenman yapıyorum, formum iyi",renk:"#ef4444"},
                    ].map(o=>(
                      <button key={o.v} onClick={()=>{setSporSeviye(o.v);setSporSoruAdim(3);}}
                        style={{width:"100%",display:"flex",alignItems:"center",gap:14,padding:"16px",
                          borderRadius:14,border:`2px solid ${sporSeviye===o.v?o.renk:r.inpB}`,
                          background:sporSeviye===o.v?o.renk+"18":r.inp,marginBottom:10,cursor:"pointer",
                          transition:"all .15s",textAlign:"left"}}>
                        <span style={{fontSize:30}}>{o.ikon}</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:15,fontWeight:800,color:sporSeviye===o.v?o.renk:r.text}}>{o.l}</div>
                          <div style={{fontSize:11,color:r.sub,marginTop:2}}>{o.a}</div>
                        </div>
                        {sporSeviye===o.v&&<span style={{color:o.renk,fontSize:20}}>✓</span>}
                      </button>
                    ))}
                    <button onClick={()=>setSporSoruAdim(1)}
                      style={{...BTN("transparent","10px 0"),width:"100%",border:`1.5px solid ${r.inpB}`,color:r.sub,fontSize:13}}>
                      ← Geri</button>
                  </div>
                )}

                {/* Soru 3: Ekipman */}
                {sporSoruAdim===3&&(
                  <div style={{animation:"ob-rise .4s both"}}>
                    <div style={{textAlign:"center",marginBottom:20}}>
                      <div style={{fontSize:36,marginBottom:8}}>🏠</div>
                      <div style={{fontSize:18,fontWeight:900,color:r.text,marginBottom:4}}>Elindeki ekipman?</div>
                      <div style={{fontSize:12,color:r.sub}}>Hiç seçmesen de olur — vücut ağırlığıyla da harika program çıkar</div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
                      {[
                        {v:"dambil",  ikon:"🏋️",l:"Dambıl",         a:"1 çift yeter"},
                        {v:"barfix",  ikon:"🏗️",l:"Barfiks",         a:"Pull-up bar"},
                        {v:"bench",   ikon:"🪑",l:"Bank / Sedir",    a:"Düz bench"},
                        {v:"mat",     ikon:"🧘",l:"Egzersiz Matı",   a:"Zemin hareketleri"},
                        {v:"ip",      ikon:"🪢",l:"Atlama İpi",      a:"Kardiyo"},
                        {v:"direnc",  ikon:"🟡",l:"Direnç Bandı",    a:"Kasları aktive et"},
                      ].map(o=>(
                        <button key={o.v}
                          onClick={()=>setSporEkipman(p=>p.includes(o.v)?p.filter(x=>x!==o.v):[...p,o.v])}
                          style={{padding:"12px 10px",borderRadius:12,
                            border:`2px solid ${sporEkipman.includes(o.v)?"#16a34a":r.inpB}`,
                            background:sporEkipman.includes(o.v)?"#f0fdf4":r.inp,
                            cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
                          <div style={{fontSize:24,marginBottom:4}}>{o.ikon}</div>
                          <div style={{fontSize:12,fontWeight:700,color:sporEkipman.includes(o.v)?"#15803d":r.text}}>{o.l}</div>
                          <div style={{fontSize:10,color:r.sub}}>{o.a}</div>
                          {sporEkipman.includes(o.v)&&<div style={{fontSize:10,color:"#16a34a",fontWeight:700,marginTop:2}}>✓</div>}
                        </button>
                      ))}
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>setSporSoruAdim(2)}
                        style={{...BTN("transparent","13px 0"),flex:"0 0 80px",border:`1.5px solid ${r.inpB}`,color:r.sub,fontSize:13}}>
                        ← Geri</button>
                      <button onClick={()=>setSporSoruAdim(4)}
                        style={{...BTN("#16a34a","13px 0"),flex:1,fontSize:14,fontWeight:800}}>
                        Devam Et →</button>
                    </div>
                  </div>
                )}

                {/* Soru 4: Süre & Gün */}
                {sporSoruAdim===4&&(
                  <div style={{animation:"ob-rise .4s both"}}>
                    <div style={{textAlign:"center",marginBottom:20}}>
                      <div style={{fontSize:36,marginBottom:8}}>⏱️</div>
                      <div style={{fontSize:18,fontWeight:900,color:r.text,marginBottom:4}}>Ne kadar zamanın var?</div>
                      <div style={{fontSize:12,color:r.sub}}>Programa göre süre ve gün ayarlıyoruz</div>
                    </div>

                    <div style={{...CS,marginBottom:12}}>
                      <div style={{fontSize:13,fontWeight:800,color:r.text,marginBottom:12}}>🕐 Antrenman süresi</div>
                      <div style={{display:"flex",gap:8}}>
                        {[20,30,45,60].map(dk=>(
                          <button key={dk} onClick={()=>setSporSure2(dk)}
                            style={{flex:1,padding:"12px 0",borderRadius:12,
                              border:`2px solid ${sporSure2===dk?"#1d4ed8":r.inpB}`,
                              background:sporSure2===dk?"#eff6ff":r.inp,cursor:"pointer",
                              fontSize:13,fontWeight:800,color:sporSure2===dk?"#1d4ed8":r.sub,
                              transition:"all .15s"}}>
                            {dk}<br/><span style={{fontSize:9,fontWeight:600}}>dk</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{...CS,marginBottom:16}}>
                      <div style={{fontSize:13,fontWeight:800,color:r.text,marginBottom:12}}>📅 Haftada kaç gün?</div>
                      <div style={{display:"flex",gap:8}}>
                        {[2,3,4,5,6].map(g=>(
                          <button key={g} onClick={()=>setSporGun(g)}
                            style={{flex:1,padding:"12px 0",borderRadius:12,
                              border:`2px solid ${sporGun===g?"#1d4ed8":r.inpB}`,
                              background:sporGun===g?"#eff6ff":r.inp,cursor:"pointer",
                              fontSize:15,fontWeight:800,color:sporGun===g?"#1d4ed8":r.sub,
                              transition:"all .15s"}}>
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Özet */}
                    <div style={{background:"linear-gradient(135deg,#1d4ed818,#7c3aed12)",border:`1px solid ${r.inpB}`,borderRadius:14,padding:"12px 14px",marginBottom:16}}>
                      <div style={{fontSize:12,fontWeight:800,color:r.text,marginBottom:8}}>📋 Seçimlerinin özeti</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                        {sporHedef&&<span style={{background:"#eff6ff",color:"#1d4ed8",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700}}>{sporHedef.replace("kilo_ver","🔥 Yağ Yak").replace("kas","💪 Kas").replace("kilo_al","📈 Kilo Al").replace("form","🎯 Form").replace("saglik","🌿 Sağlık")}</span>}
                        {sporBolge.length>0&&sporBolge.map(b=><span key={b} style={{background:"#f5f3ff",color:"#7c3aed",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700}}>{b==="karin"?"⚡ Karın":b==="omuz"?"🏔️ Omuz":b==="gogus"?"🦁 Göğüs":b==="sirt"?"🦅 Sırt":b==="bacak"?"🦵 Bacak":"💪 Kol"}</span>)}
                        {sporSeviye&&<span style={{background:"#f0fdf4",color:"#16a34a",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700}}>{sporSeviye==="baslangic"?"🌱 Başlangıç":sporSeviye==="orta"?"⚡ Orta":"🔥 İleri"}</span>}
                      </div>
                    </div>

                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>setSporSoruAdim(3)}
                        style={{...BTN("transparent","13px 0"),flex:"0 0 80px",border:`1.5px solid ${r.inpB}`,color:r.sub,fontSize:13}}>
                        ← Geri</button>
                      <button onClick={()=>{
                        if(!sporHedef){setSporSoruAdim(0);return;}
                        if(!sporSeviye){setSporSoruAdim(2);return;}
                        const prg=sporProgramUret(sporHedef,sporSeviye,sporEkipman,sporSure2,sporGun,sporBolge);
                        setSporProgram(prg);
                        setSporAppAdim(1);
                      }} style={{...BTN("linear-gradient(135deg,#1d4ed8,#7c3aed)","13px 0"),flex:1,fontSize:14,fontWeight:900}}>
                        💪 Programımı Oluştur →</button>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ── ADIM 1: PROGRAM GÖRÜNÜMÜ ────────────────────── */}
            {sporAppAdim===1&&sporProgram&&(
              <div>
                {/* Program başlığı */}
                <div style={{background:`linear-gradient(135deg,${sporProgram.renk},${sporProgram.renk}cc)`,borderRadius:16,padding:"16px 18px",marginBottom:14,color:"#fff"}}>
                  <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>{sporProgram.ad}</div>
                  <div style={{display:"flex",gap:12,fontSize:12,opacity:.9}}>
                    <span>📋 {sporProgram.gunler.length} günlük döngü</span>
                    <span>💪 {sporProgram.topEgz} egzersiz</span>
                    <span>⏱️ ~{sporSure2} dk/seans</span>
                  </div>
                  <div style={{marginTop:8,fontSize:11,opacity:.8}}>
                    Seviye: {sporSeviye==="baslangic"?"🌱 Başlangıç":sporSeviye==="orta"?"⚡ Orta":"🔥 İleri"} &nbsp;·&nbsp;
                    Ekipman: {sporEkipman.length===0?"Ekipmansız (vücut ağırlığı)":sporEkipman.join(", ")}
                  </div>
                </div>

                {/* Günler */}
                {sporProgram.gunler.map((gun,gi)=>(
                  <div key={gi} style={{...CS,marginBottom:10,border:`2px solid ${sporProgram.renk}22`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:900,color:r.text}}>📅 Gün {gi+1}: {gun.baslik}</div>
                        <div style={{fontSize:11,color:r.sub}}>{gun.egzersizler.length} egzersiz</div>
                      </div>
                      <button onClick={()=>antrenmanBaslat(gun)}
                        style={{...BTN(sporProgram.renk,"8px 16px"),fontSize:12,fontWeight:800}}>
                        ▶ Başlat</button>
                    </div>
                    {gun.egzersizler.map((e,ei)=>(
                      <div key={ei} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",
                        borderRadius:10,background:r.inp,marginBottom:5}}>
                        <span style={{fontSize:20,minWidth:26}}>{e.ikon}</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:12,fontWeight:700,color:r.text}}>{e.ad}</div>
                          <div style={{fontSize:10,color:r.sub}}>{e.kas}</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontSize:11,fontWeight:700,color:sporProgram.renk}}>{e.set} set × {e.rep}</div>
                          <div style={{fontSize:10,color:r.sub}}>~{Math.round(e.kaloriDak*sporSure2/gun.egzersizler.length*60)} kcal</div>
                        </div>
                      </div>
                    ))}
                    <div style={{marginTop:6,padding:"6px 10px",background:sporProgram.renk+"15",borderRadius:8,fontSize:11,color:sporProgram.renk,fontWeight:700,textAlign:"center"}}>
                      Tahmini yakım: ~{gun.egzersizler.reduce((t,e)=>t+Math.round(e.kaloriDak*sporSure2/gun.egzersizler.length*60),0)} kcal
                    </div>
                  </div>
                ))}

                <button onClick={()=>setSporAppAdim(0)} style={{...BTN("transparent","10px"),width:"100%",border:`1.5px solid ${r.inpB}`,color:r.sub,fontSize:13}}>
                  ← Yeniden Oluştur</button>
              </div>
            )}

            {/* ── ADIM 2: AKTİF ANTRENMAN ─────────────────────── */}
            {renderAktifAntrenman()}

            {/* ── ANTRENMAN BİTİŞ ─────────────────────────────── */}
            {antBitmis&&(
              <div style={{textAlign:"center",paddingTop:40}}>
                <div style={{fontSize:72,marginBottom:16}}>🏆</div>
                <div style={{fontSize:28,fontWeight:900,color:r.text,marginBottom:8}}>Harika iş!</div>
                <div style={{fontSize:14,color:r.sub,marginBottom:24}}>Antrenmanın tamamlandı ve kaloriler hesabına eklendi.</div>
                <div style={{...CS,marginBottom:24,background:"linear-gradient(135deg,#16a34a18,#16a34a08)"}}>
                  <div style={{fontSize:40,marginBottom:4}}>🔥</div>
                  <div style={{fontSize:32,fontWeight:900,color:"#16a34a"}}>{Math.round(antSaniye/60*6)} kcal</div>
                  <div style={{fontSize:12,color:r.sub}}>yakıldı • {Math.floor(antSaniye/60)} dk {antSaniye%60} sn</div>
                  <div style={{fontSize:11,color:"#16a34a",marginTop:4,fontWeight:700}}>✅ Günlük takibine eklendi</div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>{setSporAppAdim(1);setAntBitmis(false);}}
                    style={{...BTN("#7c3aed","13px 0"),flex:1,fontSize:13}}>📋 Programa Dön</button>
                  <button onClick={()=>setSporAppAcik(false)}
                    style={{...BTN("#16a34a","13px 0"),flex:1,fontSize:13}}>🏠 Ana Sayfaya</button>
                </div>
              </div>
            )}

            </div>
          </div>
        )}

        {/* EMAIL DOĞRULAMA BANNER */}
        {auth.currentUser&&!auth.currentUser.emailVerified&&!eVeriGizle&&!auth.currentUser.providerData?.some(p=>p.providerId==="google.com")&&(
          <div style={{background:"#fffbeb",borderBottom:"2px solid #fcd34d",padding:"10px 16px",display:"flex",gap:10,alignItems:"center"}}>
            <div style={{fontSize:18}}>📧</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:12,color:"#92400e"}}>E-posta adresin doğrulanmadı</div>
              <div style={{fontSize:11,color:"#78350f"}}>{aktif?.email} — gelen kutunu kontrol et</div>
            </div>
            <button style={{...BTN("#f59e0b","5px 10px"),fontSize:11,flexShrink:0}} onClick={async()=>{
              const u=auth.currentUser;
              if(u){await sendEmailVerification(u).catch(console.error);setDogrulamaGonderildi(true);setTimeout(()=>setDogrulamaGonderildi(false),4000);}
            }}>{dogrulamaGonderildi?"✓ Gönderildi":"Tekrar Gönder"}</button>
            <button onClick={()=>setEVeriGizle(true)} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",color:"#92400e",fontWeight:900}}>×</button>
          </div>
        )}

        {/* HEADER */}
        <div style={{background:d?"linear-gradient(180deg,#030704 0%,#060d07 100%)":"linear-gradient(180deg,#065f46 0%,#047857 100%)",padding:"0",color:"#fff",position:"relative",overflow:"hidden",boxShadow:d?"0 1px 0 rgba(16,185,129,.08), 0 8px 40px rgba(0,0,0,.6)":"0 8px 40px rgba(4,120,87,.3)"}}>
          {/* Glow */}
          <div style={{position:"absolute",top:-40,left:"50%",transform:"translateX(-50%)",width:280,height:120,background:"radial-gradient(ellipse,rgba(16,185,129,.12) 0%,transparent 70%)",pointerEvents:"none"}}/>
          {/* İnce yeşil çizgi - üst */}
          <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(52,211,153,.3),transparent)"}}/>
          {/* Ana içerik */}
          <div style={{padding:"13px 16px 15px",position:"relative",zIndex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              {/* Hamburger */}
              <button onClick={()=>setHamMenu(true)} style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,width:38,height:38,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,flexShrink:0}}>
                <span style={{display:"block",width:16,height:1.5,background:"rgba(255,255,255,.9)",borderRadius:2}}/>
                <span style={{display:"block",width:10,height:1.5,background:"rgba(255,255,255,.5)",borderRadius:2,alignSelf:"flex-start",marginLeft:3}}/>
                <span style={{display:"block",width:16,height:1.5,background:"rgba(255,255,255,.9)",borderRadius:2}}/>
              </button>
              {/* Kamera */}
              <button onClick={()=>{setAiModal(true);setAiSonuc(null);setAiHata(null);setAiImg(null);setAiNot("");setAiOgun("Kahvaltı");}}
                style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,width:38,height:38,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </button>
              {/* Logo */}
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <div style={{width:34,height:34,background:"linear-gradient(145deg,rgba(16,185,129,.25),rgba(16,185,129,.05))",borderRadius:12,border:"1px solid rgba(52,211,153,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2a5 5 0 0 1 5 5c0 3-2 5-5 8-3-3-5-5-5-8a5 5 0 0 1 5-5z"/><circle cx="12" cy="7" r="2" fill="#34d399" stroke="none"/></svg>
                </div>
                <div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,lineHeight:1,letterSpacing:.5,fontWeight:600,color:"#fff"}}>Doya</div>
                  <div style={{fontSize:10,color:"rgba(52,211,153,.7)",letterSpacing:.5,marginTop:1}}>
                    {aktif.isim?.split(" ")[0]}
                    {isAdmin&&<span style={{background:"rgba(251,191,36,.15)",color:"#fbbf24",fontSize:8,fontWeight:800,padding:"1px 5px",borderRadius:6,marginLeft:5,border:"1px solid rgba(251,191,36,.2)"}}>ADMIN</span>}
                    {isOrtak&&<span style={{background:"rgba(255,255,255,.08)",fontSize:8,fontWeight:800,padding:"1px 5px",borderRadius:6,marginLeft:5}}>{aktif.refTip==="influencer"?"INFLUENCER":"İŞLETME"}</span>}
                  </div>
                </div>
              </div>
            </div>
            {/* Sağ aksiyonlar */}
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              <button onClick={()=>setHpModal(true)}
                style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,width:38,height:38,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </button>
              <button onClick={()=>{const nd=!d;setDark(nd);try{localStorage.setItem("doya_tema",nd?"dark":"light");}catch(e){}}}
                style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,width:38,height:38,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {d
                  ?<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                  :<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                }
              </button>
              <div onClick={()=>setTab("puan")} style={{height:38,padding:"0 12px",display:"flex",alignItems:"center",gap:5,cursor:"pointer",flexShrink:0,background:"rgba(200,146,42,.12)",border:"1px solid rgba(240,193,75,.15)",borderRadius:12}}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#f0c14b" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span style={{fontSize:13,fontWeight:800,color:"#f0c14b",letterSpacing:.3}}>{puan}</span>
              </div>
              {premiumPlus&&<span style={{background:"linear-gradient(135deg,#7c3aed,#6d28d9)",fontSize:9,fontWeight:800,padding:"5px 9px",borderRadius:10,color:"#fff",letterSpacing:.8,flexShrink:0,border:"1px solid rgba(196,181,253,.15)"}}>PLUS</span>}
              {premium&&!premiumPlus&&<span style={{background:"rgba(200,146,42,.12)",border:"1px solid rgba(240,193,75,.2)",fontSize:9,fontWeight:800,padding:"5px 9px",borderRadius:10,color:"#f0c14b",letterSpacing:.8,flexShrink:0}}>PRO</span>}
            </div>
          </div>
          </div>
        </div>

        {/* ──── ANASAYFA ──────────────────────────────────────────── */}
        {tab==="anasayfa"&&(
          <div className={tabAnimClass} style={{paddingBottom:16}}>

            {/* ── Reklam banner ── */}
            {reklam&&!premium&&!premiumPlus&&(
              <div style={{display:"flex",alignItems:"center",gap:10,margin:"10px 14px 0",padding:"11px 14px",background:d?"rgba(200,146,42,.06)":"rgba(200,146,42,.05)",border:"1px solid rgba(200,146,42,.12)",borderRadius:16}}>
                <div style={{width:28,height:28,borderRadius:9,background:"rgba(200,146,42,.1)",border:"1px solid rgba(240,193,75,.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f0c14b" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:9,color:"rgba(240,193,75,.45)",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:2}}>Duyuru</div>
                  <div style={{fontSize:11,color:d?"rgba(255,255,255,.45)":"rgba(0,0,0,.45)",fontWeight:500}}>Premium ile reklamsız, tam deneyim — sadece {PREMIUM_FIYAT}₺/ay</div>
                </div>
                <button onClick={()=>setReklam(false)} style={{background:"none",border:"none",cursor:"pointer",color:d?"rgba(255,255,255,.2)":"rgba(0,0,0,.2)",padding:4,display:"flex"}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            )}

            {/* ── BMI Kartı ── */}
            {bmi&&bmiD&&(
              <div className="lux-card" style={{...CS,background:d?"#080e09":"#fff",border:`1px solid ${bmiD.renk}18`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontSize:9,fontWeight:700,color:`${bmiD.renk}88`,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Vücut Kitle İndeksi</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:52,fontWeight:300,color:bmiD.renk,lineHeight:1,letterSpacing:-2,marginBottom:6}}>{bmi}</div>
                    <div style={{fontSize:11,fontWeight:700,color:bmiD.renk,letterSpacing:1,marginBottom:4}}>{bmiD.etiket}</div>
                    <div style={{fontSize:10,color:r.muted,lineHeight:1.5}}>{bmiD.acik}</div>
                  </div>
                  {profil.hedef&&(
                    <div style={{background:d?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)",border:`1px solid ${d?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)"}`,borderRadius:16,padding:"14px 16px",textAlign:"right"}}>
                      <div style={{fontSize:9,color:r.muted,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>Hedef</div>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,color:"#10b981",lineHeight:1,letterSpacing:-1}}>{profil.hedef}<span style={{fontSize:12,fontWeight:400}}>kg</span></div>
                      <div style={{fontSize:9,color:r.muted,marginTop:6,fontWeight:600}}>{(+profil.kilo-+profil.hedef)>0?`${(+profil.kilo-+profil.hedef).toFixed(1)}kg kaldı`:"✦ Hedefe ulaştın"}</div>
                    </div>
                  )}
                </div>
                {/* BMI skalası */}
                <div style={{marginTop:16}}>
                  <div style={{height:3,borderRadius:99,overflow:"hidden",background:`linear-gradient(90deg,#60a5fa,#10b981 35%,#fbbf24 60%,#f87171)`,position:"relative"}}>
                    <div style={{position:"absolute",top:-3,width:9,height:9,borderRadius:"50%",background:"#fff",border:`2px solid ${bmiD.renk}`,left:`${Math.min(95,Math.max(2,(bmi-16)/24*100))}%`,transition:"left .8s cubic-bezier(.34,1.2,.64,1)",boxShadow:`0 0 8px ${bmiD.renk}`}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
                    {["Zayıf","Normal","Kilolu","Obez"].map(l=>(
                      <span key={l} style={{fontSize:8,color:r.muted,fontWeight:600,letterSpacing:.5}}>{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Kilo Takip ── */}
            {(kiloKayitlar.length>0||profil.kilo)&&(
              <div className="lux-card" style={{...CS}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                  <div>
                    <div style={{fontSize:9,fontWeight:700,color:"rgba(16,185,129,.5)",letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>Kilo Takibi</div>
                    {profil.hedef&&<div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:r.muted,fontWeight:300}}>Hedef: {profil.hedef} kg</div>}
                  </div>
                  <button onClick={()=>{setKiloGirModal(true);setKiloInput(profil.kilo||"");setKiloNot("");}}
                    style={{background:d?"rgba(16,185,129,.08)":"rgba(16,185,129,.06)",border:"1px solid rgba(16,185,129,.15)",borderRadius:12,padding:"7px 14px",fontSize:10,fontWeight:700,color:"#10b981",cursor:"pointer",letterSpacing:.5,display:"flex",alignItems:"center",gap:5}}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Ekle
                  </button>
                </div>
                {kiloKayitlar.length>1?renderKiloGrafik():(
                  <div style={{textAlign:"center",padding:"16px 0 8px",color:r.muted,fontSize:12}}>
                    {kiloKayitlar.length===1?`Son: ${kiloKayitlar[0].kilo} kg — bir kayıt daha ekle, grafik görünür`:"Kilo ekle tuşuyla ölçümlerini kaydet"}
                  </div>
                )}
              </div>
            )}

            {/* ── Kilo Gir Modal ── */}
            {kiloGirModal&&(
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:24,backdropFilter:"blur(8px)"}}>
                <div className="modal-enter" style={{background:d?"#080e09":"#fff",border:`1px solid ${d?"rgba(255,255,255,.07)":"rgba(0,0,0,.07)"}`,borderRadius:24,padding:28,width:"100%",maxWidth:320,boxShadow:"0 40px 100px rgba(0,0,0,.6)"}}>
                  <div style={{fontSize:9,fontWeight:700,color:"rgba(16,185,129,.5)",letterSpacing:3,textTransform:"uppercase",marginBottom:16}}>Kilo Kaydet</div>
                  <input type="number" step="0.1" placeholder="75.0" value={kiloGirDeger}
                    onChange={e=>setKiloGirDeger(e.target.value)}
                    className="ob-inp"
                    style={{width:"100%",padding:"16px",fontSize:28,fontWeight:300,fontFamily:"'Cormorant Garamond',serif",textAlign:"center",boxSizing:"border-box",borderRadius:16,marginBottom:20,color:d?"#e8f5ec":"#0a1f0c",letterSpacing:-1}}/>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>{setKiloGirModal(false);setKiloGirDeger("");}}
                      style={{flex:1,padding:"13px",borderRadius:14,border:`1px solid ${d?"rgba(255,255,255,.07)":"rgba(0,0,0,.08)"}`,background:"transparent",color:r.muted,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13}}>İptal</button>
                    <button onClick={kiloKaydet}
                      style={{flex:1,padding:"13px",borderRadius:14,background:"linear-gradient(135deg,#10b981,#059669)",border:"1px solid rgba(52,211,153,.2)",color:"#fff",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,boxShadow:"0 8px 24px rgba(16,185,129,.25)"}}>Kaydet</button>
                  </div>
                </div>
              </div>
            )}

                        {/* ── TDEE ── */}
            {tdee&&<div className="lux-card" style={{margin:"0 14px 8px",background:d?"#080e09":"#fff",borderRadius:18,padding:"16px 20px",border:"1px solid rgba(139,92,246,.1)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:9,fontWeight:700,color:"rgba(167,139,250,.4)",letterSpacing:2.5,textTransform:"uppercase",marginBottom:6}}>Günlük Hedef</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,color:"#a78bfa",lineHeight:1,letterSpacing:-1}}>{HEDEF} <span style={{fontSize:13,fontWeight:400}}>kcal</span></div>
                {topSpor>0&&<div style={{fontSize:10,color:"rgba(167,139,250,.35)",marginTop:4,letterSpacing:.3}}>Temel {tdee} + spor +{topSpor}</div>}
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:9,fontWeight:700,color:r.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>{topKal<=HEDEF?"Kalan":"Fazla"}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,color:topKal<=HEDEF?"#10b981":"#f87171",lineHeight:1,letterSpacing:-1}}>{Math.abs(HEDEF-topKal)}</div>
              </div>
            </div>}

            {/* ── Kalori Ring ── */}
            {renderKaloriRing()}

            {/* ── Seri Kartları ── */}
            {(yemekSeri>0||adimSeri>0)&&(
              <div style={{display:"flex",gap:8,margin:"0 14px 8px"}}>
                {yemekSeri>0&&(
                  <div className="lux-card" style={{flex:1,background:d?"#080e09":"#fff",border:"1px solid rgba(245,158,11,.1)",borderRadius:18,padding:"18px 16px",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:-15,right:-15,width:80,height:80,background:"radial-gradient(circle,rgba(245,158,11,.06) 0%,transparent 70%)",borderRadius:"50%"}}/>
                    <div style={{fontSize:9,fontWeight:700,color:"rgba(245,158,11,.4)",letterSpacing:2.5,textTransform:"uppercase",marginBottom:10}}>Öğün Serisi</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:42,fontWeight:300,color:"#f59e0b",lineHeight:1,letterSpacing:-2}}>{yemekSeri}</div>
                    <div style={{fontSize:9,color:r.muted,marginTop:5,fontWeight:600,letterSpacing:.5}}>gün</div>
                    {yemekSeri>=7&&<div style={{fontSize:8,fontWeight:800,marginTop:10,color:"rgba(245,158,11,.5)",letterSpacing:2,textTransform:"uppercase"}}>{yemekSeri>=30?"EFSANE":yemekSeri>=14?"HARIKA":"DEVAM"} ✦</div>}
                  </div>
                )}
                {adimSeri>0&&(
                  <div className="lux-card" style={{flex:1,background:d?"#080e09":"#fff",border:"1px solid rgba(16,185,129,.1)",borderRadius:18,padding:"18px 16px",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:-15,right:-15,width:80,height:80,background:"radial-gradient(circle,rgba(16,185,129,.06) 0%,transparent 70%)",borderRadius:"50%"}}/>
                    <div style={{fontSize:9,fontWeight:700,color:"rgba(16,185,129,.4)",letterSpacing:2.5,textTransform:"uppercase",marginBottom:10}}>Adım Serisi</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:42,fontWeight:300,color:"#10b981",lineHeight:1,letterSpacing:-2}}>{adimSeri}</div>
                    <div style={{fontSize:9,color:r.muted,marginTop:5,fontWeight:600,letterSpacing:.5}}>gün</div>
                    {adimSeri>=7&&<div style={{fontSize:8,fontWeight:800,marginTop:10,color:"rgba(16,185,129,.5)",letterSpacing:2,textTransform:"uppercase"}}>{adimSeri>=30?"EFSANE":adimSeri>=14?"HARIKA":"DEVAM"} ✦</div>}
                  </div>
                )}
              </div>
            )}

            {/* ── Öğünler ── */}
            <div className="lux-card" style={{...CS,padding:0,overflow:"hidden"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 20px 16px",borderBottom:`1px solid ${d?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)"}`}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:36,height:36,borderRadius:12,background:d?"rgba(16,185,129,.08)":"rgba(16,185,129,.06)",border:"1px solid rgba(16,185,129,.12)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"/></svg>
                  </div>
                  <div>
                    <div style={{fontSize:9,fontWeight:700,color:"rgba(16,185,129,.45)",letterSpacing:2.5,textTransform:"uppercase"}}>Öğünler</div>
                    {bugYemekler.length>0&&<div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:r.muted,fontWeight:300,marginTop:2}}>{bugYemekler.length} besin · {bugYemekler.reduce((t,y)=>t+(y.gramKal||0),0)} kcal</div>}
                  </div>
                </div>
                <button onClick={()=>{setYemekEkleModal(true);setYemekEkleSekme("ara");setBesinArama("");setHizliSonuc(null);}} style={{background:"linear-gradient(135deg,#10b981,#059669)",border:"1px solid rgba(52,211,153,.2)",borderRadius:12,padding:"9px 16px",fontSize:11,fontWeight:800,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:5,boxShadow:"0 4px 16px rgba(16,185,129,.3)",letterSpacing:.3}}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Ekle
                </button>
              </div>
              <div style={{padding:"14px 18px 18px"}}>
              {YEMEK_KAT.map(kat=>{
                const yk=bugKatYemek(kat);
                if(yk.length===0)return null;
                const KM={
                  "Kahvaltı":{c:"#f59e0b"},
                  "Öğle":{c:"#3b82f6"},
                  "Akşam":{c:"#8b5cf6"},
                  "Atıştırmalık":{c:"#10b981"},
                };
                const km=KM[kat]||{c:"#10b981"};
                return(
                  <div key={kat} style={{marginBottom:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:km.c}}/>
                        <span style={{fontSize:9,fontWeight:700,color:`${km.c}99`,letterSpacing:2,textTransform:"uppercase"}}>{kat}</span>
                      </div>
                      <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:300,color:km.c,letterSpacing:-.3}}>{bugKatKal(kat)} kcal</span>
                    </div>
                    <div style={{borderRadius:12,overflow:"hidden",border:`1px solid ${d?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)"}`}}>
                    {yk.map((y,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:i%2===0?(d?"rgba(255,255,255,.015)":"rgba(0,0,0,.01)"):"transparent",borderBottom:i<yk.length-1?`1px solid ${d?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)"}`:undefined}}>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,fontWeight:600,color:r.text,letterSpacing:-.1}}>{y.ad}</div>
                          <div style={{fontSize:9,color:r.muted,marginTop:3,letterSpacing:.5}}>{y.gram}g · {y.saat}</div>
                        </div>
                        <div style={{display:"flex",gap:6,alignItems:"center"}}>
                          <span style={{fontSize:11,fontWeight:700,color:km.c,opacity:.8}}>{y.gramKal}</span>
                          <button onClick={()=>{const bg=bugunKey();gunSet(bg,"yemekler",gunV(bg).yemekler.filter((_,idx)=>idx!==bugYemekler.indexOf(y)));}}
                            style={{background:"none",border:`1px solid ${d?"rgba(248,113,113,.15)":"rgba(239,68,68,.15)"}`,borderRadius:8,width:24,height:24,cursor:"pointer",color:"rgba(248,113,113,.6)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                );
              })}
              {bugYemekler.length===0&&(
                <div style={{textAlign:"center",padding:"28px 0 12px"}}>
                  <div style={{width:48,height:48,borderRadius:16,background:d?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)",border:`1px solid ${d?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)"}`,margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={r.muted} strokeWidth="1.2" strokeLinecap="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"/></svg>
                  </div>
                  <div style={{fontSize:13,color:r.text,fontWeight:600,marginBottom:4,letterSpacing:-.2}}>Öğün eklenmedi</div>
                  <div style={{fontSize:10,color:r.muted,letterSpacing:.3}}>Yukarıdaki Ekle tuşuna dokun</div>
                </div>
              )}
              </div>
            </div>

            {/* ── Spor ── */}
            <div className="lux-card" style={{...CS,padding:0,overflow:"hidden"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 20px 16px",borderBottom:`1px solid ${d?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)"}`}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:36,height:36,borderRadius:12,background:d?"rgba(16,185,129,.08)":"rgba(16,185,129,.06)",border:"1px solid rgba(16,185,129,.12)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"><path d="M6 5v14M18 5v14M6 12h12M3 7h3M18 7h3M3 17h3M18 17h3"/></svg>
                  </div>
                  <div>
                    <div style={{fontSize:9,fontWeight:700,color:"rgba(16,185,129,.45)",letterSpacing:2.5,textTransform:"uppercase"}}>Spor</div>
                    {bugSpor.length>0&&<div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:r.muted,fontWeight:300,marginTop:2}}>−{topSpor} kcal yakıldı</div>}
                  </div>
                </div>
                <button onClick={()=>setSporModal(true)}
                  style={{background:d?"rgba(16,185,129,.06)":"rgba(16,185,129,.06)",border:"1px solid rgba(16,185,129,.12)",borderRadius:12,padding:"9px 16px",fontSize:11,fontWeight:800,color:"#10b981",cursor:"pointer",display:"flex",alignItems:"center",gap:5,letterSpacing:.3}}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Ekle
                </button>
              </div>
              <div style={{padding:"14px 18px 18px"}}>
              {bugSpor.length===0?(
                <div style={{textAlign:"center",padding:"28px 0 12px"}}>
                  <div style={{width:48,height:48,borderRadius:16,background:d?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)",border:`1px solid ${d?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)"}`,margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={r.muted} strokeWidth="1.2" strokeLinecap="round"><path d="M6 5v14M18 5v14M6 12h12M3 7h3M18 7h3M3 17h3M18 17h3"/></svg>
                  </div>
                  <div style={{fontSize:13,color:r.text,fontWeight:600,marginBottom:4,letterSpacing:-.2}}>Spor eklenmedi</div>
                  <div style={{fontSize:10,color:r.muted,letterSpacing:.3}}>Aktiviteni kaydet</div>
                </div>
              ):(
                <>
                <div style={{borderRadius:12,overflow:"hidden",border:`1px solid ${d?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)"}`}}>
                {bugSpor.map((s,i)=>{
                  const tc=s.tempo==="hafif"?"#10b981":s.tempo==="orta"?"#fbbf24":"#f87171";
                  return(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderBottom:i<bugSpor.length-1?`1px solid ${d?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)"}`:undefined}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:600,color:r.text,marginBottom:3,letterSpacing:-.1}}>{s.ad||"Spor"}</div>
                        <div style={{display:"flex",gap:8,alignItems:"center"}}>
                          <span style={{fontSize:9,color:r.muted,letterSpacing:.5}}>{s.sure} dk</span>
                          <div style={{width:4,height:4,borderRadius:"50%",background:tc,opacity:.7}}/>
                          <span style={{fontSize:9,color:tc,fontWeight:700,letterSpacing:.5}}>{s.tempo==="hafif"?"Hafif":s.tempo==="orta"?"Orta":"Yüksek"}</span>
                        </div>
                      </div>
                      <div style={{display:"flex",gap:6,alignItems:"center"}}>
                        <span style={{fontSize:11,fontWeight:700,color:"#10b981",opacity:.8}}>−{s.kcal}</span>
                        <button onClick={()=>{const bg=bugunKey();gunSet(bg,"spor",gunV(bg).spor.filter((_,idx)=>idx!==i));}}
                          style={{background:"none",border:`1px solid ${d?"rgba(248,113,113,.15)":"rgba(239,68,68,.15)"}`,borderRadius:8,width:24,height:24,cursor:"pointer",color:"rgba(248,113,113,.6)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12,padding:"10px 14px",background:d?"rgba(16,185,129,.05)":"rgba(16,185,129,.04)",borderRadius:12,border:"1px solid rgba(16,185,129,.1)"}}>
                  <span style={{fontSize:9,fontWeight:700,color:"rgba(16,185,129,.5)",letterSpacing:2,textTransform:"uppercase"}}>Toplam Yakım</span>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:"#10b981",letterSpacing:-.5}}>−{topSpor} kcal</span>
                </div>
                </>
              )}
              </div>
            </div>

            {/* ── Su ── */}
            <div className="lux-card lux-lift" style={{...CS,cursor:"pointer",padding:0,overflow:"hidden"}} onClick={()=>setTab("su")}>
              <div style={{padding:"18px 20px 15px",borderBottom:`1px solid ${d?"rgba(59,130,246,.06)":"rgba(59,130,246,.06)"}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:36,height:36,borderRadius:12,background:d?"rgba(59,130,246,.06)":"rgba(59,130,246,.05)",border:"1px solid rgba(59,130,246,.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                    </div>
                    <div>
                      <div style={{fontSize:9,fontWeight:700,color:"rgba(96,165,250,.4)",letterSpacing:2.5,textTransform:"uppercase"}}>Su Takibi</div>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:r.muted,fontWeight:300,marginTop:2}}>Hedef: {(suHed/1000).toFixed(1)}L</div>
                    </div>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={r.muted} strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>
              <div style={{padding:"16px 20px"}}>
                <div style={{display:"flex",alignItems:"center",gap:20}}>
                  <div style={{position:"relative",width:72,height:72,flexShrink:0}}>
                    <svg width="72" height="72" viewBox="0 0 72 72">
                      <circle cx="36" cy="36" r={32} fill="none" stroke={d?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)"} strokeWidth="7"/>
                      <circle cx="36" cy="36" r={32} fill="none" stroke="#3b82f6" strokeWidth="7"
                        strokeDasharray={suRingSC32} strokeDashoffset={suRingSC32*(1-suRingPct)} strokeLinecap="round"
                        transform="rotate(-90 36 36)" style={{transition:"stroke-dashoffset .8s cubic-bezier(.4,0,.2,1)",filter:"drop-shadow(0 0 5px rgba(59,130,246,.25))"}}/>
                      <text x="36" y="40" fontSize="12" fontWeight="600" fill="#60a5fa" textAnchor="middle" dominantBaseline="middle">{Math.round(suRingPct*100)}%</text>
                    </svg>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:300,color:"#60a5fa",lineHeight:1,letterSpacing:-1}}>{(bugSu/1000).toFixed(1)}<span style={{fontSize:14,fontWeight:300}}> L</span></div>
                    <div style={{height:2,background:d?"rgba(59,130,246,.06)":"rgba(59,130,246,.07)",borderRadius:99,overflow:"hidden",margin:"10px 0 6px"}}>
                      <div style={{height:"100%",width:Math.min(100,bugSu/suHed*100)+"%",background:"linear-gradient(90deg,#60a5fa,#3b82f6)",borderRadius:99,transition:"width .8s cubic-bezier(.34,1.2,.64,1)"}}/>
                    </div>
                    <div style={{fontSize:9,color:"rgba(96,165,250,.5)",fontWeight:700,letterSpacing:.5}}>{bugSu>=suHed?"✦ HEDEF TAMAMLANDI":(suHed-bugSu)+"ml kaldı"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Adım Sayar ── */}
            <div className="lux-card" style={{...CS}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:36,height:36,borderRadius:12,background:d?"rgba(251,191,36,.05)":"rgba(251,191,36,.05)",border:"1px solid rgba(251,191,36,.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"><path d="M13 4v4l3 3-3 3v4M9 4v4L6 11l3 3v4"/></svg>
                  </div>
                  <div style={{fontSize:9,fontWeight:700,color:"rgba(251,191,36,.4)",letterSpacing:2.5,textTransform:"uppercase"}}>Adım Sayar</div>
                </div>
                {adimIzin==="verildi"||adimIzin==="android"
                  ?<span style={{fontSize:8,fontWeight:700,color:"#10b981",background:"rgba(16,185,129,.07)",padding:"3px 10px",borderRadius:99,border:"1px solid rgba(16,185,129,.12)",letterSpacing:1.5,textTransform:"uppercase"}}>Aktif</span>
                  :adimIzin==="reddedildi"
                  ?<span style={{fontSize:8,fontWeight:700,color:"#f87171",background:"rgba(248,113,113,.07)",padding:"3px 10px",borderRadius:99,border:"1px solid rgba(248,113,113,.12)",letterSpacing:1.5,textTransform:"uppercase"}}>İzin Yok</span>
                  :<span style={{fontSize:8,fontWeight:700,color:"#fbbf24",background:"rgba(251,191,36,.07)",padding:"3px 10px",borderRadius:99,border:"1px solid rgba(251,191,36,.12)",letterSpacing:1.5,textTransform:"uppercase"}}>Bekliyor</span>
                }
              </div>

              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:12}}>
                <div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:52,fontWeight:300,color:"#fbbf24",lineHeight:1,letterSpacing:-2}}>{adimSayar.toLocaleString("tr-TR")}</div>
                  <div style={{fontSize:9,color:r.muted,marginTop:5,letterSpacing:.5}}>
                    ~{Math.round(adimSayar*0.04)} kcal · ~{(adimSayar*0.00076).toFixed(2)} km
                  </div>
                </div>
                <div style={{textAlign:"right",paddingBottom:4}}>
                  <div style={{fontSize:9,color:r.muted,letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>Hedef</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,color:adimSayar>=10000?"#10b981":"rgba(251,191,36,.5)",letterSpacing:-.5}}>{Math.min(100,Math.round((adimSayar/10000)*100))}%</div>
                </div>
              </div>

              <div style={{height:2,background:d?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)",borderRadius:99,overflow:"hidden",marginBottom:10}}>
                <div style={{height:"100%",width:Math.min(100,(adimSayar/10000)*100)+"%",background:adimSayar>=10000?"#10b981":"linear-gradient(90deg,#fbbf24,#f59e0b)",borderRadius:99,transition:"width .8s cubic-bezier(.34,1.2,.64,1)"}}/>
              </div>

              {adimSayar>=10000&&<div style={{fontSize:9,fontWeight:800,color:"#10b981",letterSpacing:2,textTransform:"uppercase",textAlign:"center",marginBottom:10}}>✦ Günlük hedefe ulaştın</div>}

              {adimIzin==="reddedildi"&&(
                <div style={{background:d?"rgba(248,113,113,.06)":"rgba(239,68,68,.04)",border:"1px solid rgba(239,68,68,.12)",borderRadius:12,padding:"10px 14px",marginTop:8,fontSize:11,color:d?"rgba(248,113,113,.7)":"rgba(220,38,38,.7)",lineHeight:1.6}}>
                  Hareket izni reddedildi. Telefon Ayarları → Hareket iznini aç.
                  <button style={{display:"block",marginTop:8,background:"rgba(248,113,113,.1)",border:"1px solid rgba(248,113,113,.2)",borderRadius:10,padding:"8px 16px",width:"100%",fontSize:11,color:"#f87171",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700}} onClick={()=>{localStorage.removeItem("doya_adim_izin");setAdimIzin("bekliyor");setAdimIzinModal(true);}}>Tekrar Dene</button>
                </div>
              )}
              {adimIzin==="desteklenmiyor"&&(
                <div style={{background:d?"rgba(251,191,36,.05)":"rgba(245,158,11,.04)",border:"1px solid rgba(251,191,36,.12)",borderRadius:12,padding:"10px 14px",marginTop:8,fontSize:10,color:d?"rgba(251,191,36,.6)":"rgba(180,83,9,.7)",lineHeight:1.6}}>
                  Bu tarayıcı sensörü desteklemiyor. iPhone'da Safari, Android'de Chrome kullan.
                </div>
              )}
              {(adimIzin==="verildi"||adimIzin==="android")&&(
                <div style={{display:"flex",gap:8,marginTop:10}}>
                  <button style={{flex:1,padding:"10px",borderRadius:12,border:`1px solid ${d?"rgba(255,255,255,.07)":"rgba(0,0,0,.07)"}`,background:d?"rgba(255,255,255,.03)":"rgba(0,0,0,.02)",color:r.muted,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:11,letterSpacing:.3}} onClick={()=>{setAdimAktif(false);localStorage.setItem("doya_adim_izin","bekliyor");setAdimIzin("bekliyor");}}>Durdur</button>
                  <button style={{flex:1,padding:"10px",borderRadius:12,border:"1px solid rgba(248,113,113,.15)",background:"rgba(248,113,113,.05)",color:"rgba(248,113,113,.7)",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:11,letterSpacing:.3}} onClick={()=>{setAdimSayar(0);adimRef.current.sayac=0;localStorage.setItem("doya_adim_"+tarihKey(new Date()),"0");}}>Sıfırla</button>
                </div>
              )}
            </div>

          </div>
        )}


        {/* ──── SU ──────────────────────────────────────────────── */}
        {tab==="su"&&(
          <div style={{padding:"8px 0 16px"}}>
            {/* Hero */}
            <div style={{margin:"0 14px 8px",background:d?"linear-gradient(145deg,#04090f,#060d17)":"linear-gradient(145deg,#eff6ff,#fff)",borderRadius:22,padding:"22px 22px 20px",border:"1px solid rgba(59,130,246,.12)",position:"relative",overflow:"hidden",boxShadow:d?"0 20px 60px rgba(0,0,0,.4)":"0 8px 32px rgba(59,130,246,.08)"}}>
              <div style={{position:"absolute",top:-20,right:-20,width:140,height:140,background:"radial-gradient(circle,rgba(59,130,246,.07) 0%,transparent 70%)"}}/>
              <div style={{fontSize:9,fontWeight:700,color:"rgba(96,165,250,.4)",letterSpacing:3,textTransform:"uppercase",marginBottom:16}}>Su Takibi</div>
              <div style={{display:"flex",alignItems:"flex-end",gap:20}}>
                <div style={{position:"relative",width:96,height:96,flexShrink:0}}>
                  <svg width="96" height="96" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r={44} fill="none" stroke={d?"rgba(255,255,255,.04)":"rgba(0,0,0,.05)"} strokeWidth="8"/>
                    <circle cx="48" cy="48" r={44} fill="none" stroke="#3b82f6" strokeWidth="8"
                      strokeDasharray={suRingSC44} strokeDashoffset={suRingSC44*(1-suRingPct)} strokeLinecap="round"
                      transform="rotate(-90 48 48)" style={{transition:"stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)",filter:"drop-shadow(0 0 8px rgba(59,130,246,.3))"}}/>
                    <text x="48" y="52" fontSize="17" fontWeight="300" fontFamily="Cormorant Garamond,serif" fill="#60a5fa" textAnchor="middle" dominantBaseline="middle">{Math.round(suRingPct*100)}%</text>
                  </svg>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:44,fontWeight:300,color:"#60a5fa",lineHeight:1,letterSpacing:-2}}>{(bugSu/1000).toFixed(1)}<span style={{fontSize:18,fontWeight:300}}> L</span></div>
                  <div style={{fontSize:10,color:r.muted,marginTop:6,letterSpacing:.3}}>Hedef {(suHed/1000).toFixed(1)}L · {suHed-bugSu>0?`${suHed-bugSu}ml kaldı`:"tamamlandı"}</div>
                  <div style={{height:2,background:d?"rgba(59,130,246,.07)":"rgba(59,130,246,.1)",borderRadius:99,overflow:"hidden",marginTop:10}}>
                    <div style={{height:"100%",width:Math.min(100,bugSu/suHed*100)+"%",background:"linear-gradient(90deg,#60a5fa,#3b82f6)",borderRadius:99,transition:"width 1s"}}/>
                  </div>
                </div>
              </div>
            </div>

            {/* Hızlı Ekle */}
            <div style={{...CS}}>
              <div style={{fontSize:9,fontWeight:700,color:r.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Hızlı Ekle</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
                {[100,150,200,250,330,500].map(m=>(
                  <button key={m} onClick={()=>{const bg=bugunKey();gunSet(bg,"su",Math.min((gunV(bg).su||0)+m,9999));}}
                    style={{background:d?"rgba(59,130,246,.06)":"rgba(59,130,246,.05)",color:"#60a5fa",border:"1px solid rgba(59,130,246,.1)",borderRadius:12,padding:"13px 0",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif",letterSpacing:.3}}>+{m}ml</button>
                ))}
              </div>
              <div style={{borderTop:`1px solid ${d?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)"}`,paddingTop:14}}>
                <div style={{fontSize:9,color:r.muted,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",marginBottom:10}}>Özel Miktar</div>
                <div style={{display:"flex",gap:8,marginBottom:8}}>
                  <input type="number" placeholder="ml..." id="suManuel" className="ob-inp"
                    style={{flex:1,padding:"12px 14px",fontSize:15,boxSizing:"border-box",color:d?"#e8f5ec":"#0a1f0c"}}
                    onKeyDown={e=>{if(e.key==="Enter"){const v=+e.target.value;if(v>0){const bg=bugunKey();gunSet(bg,"su",Math.min((gunV(bg).su||0)+v,9999));e.target.value="";}}}
                  }/>
                  <button style={{background:"linear-gradient(135deg,#3b82f6,#2563eb)",border:"1px solid rgba(96,165,250,.2)",borderRadius:12,padding:"12px 18px",color:"#fff",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,cursor:"pointer",letterSpacing:.3}}
                    onClick={()=>{const inp=document.getElementById("suManuel");const v=+inp.value;if(v>0){const bg=bugunKey();gunSet(bg,"su",Math.min((gunV(bg).su||0)+v,9999));inp.value="";}}}
                  >Ekle</button>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button style={{flex:1,padding:"10px",borderRadius:12,border:"1px solid rgba(248,113,113,.15)",background:"rgba(248,113,113,.05)",color:"rgba(248,113,113,.7)",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:11}} onClick={()=>{const bg=bugunKey();gunSet(bg,"su",Math.max((gunV(bg).su||0)-100,0));}}>−100ml</button>
                  <button style={{flex:1,padding:"10px",borderRadius:12,border:`1px solid ${d?"rgba(255,255,255,.07)":"rgba(0,0,0,.07)"}`,background:"transparent",color:r.muted,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:11}} onClick={()=>{const bg=bugunKey();gunSet(bg,"su",0);}}>Sıfırla</button>
                </div>
              </div>
            </div>

            {/* Son 7 Gün */}
            <div style={{...CS}}>
              <div style={{fontSize:9,fontWeight:700,color:r.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:16}}>Son 7 Gün</div>
              {Array.from({length:7},(_,i)=>{const dt=new Date();dt.setDate(dt.getDate()-i);return{key:tarihKey(dt),label:i===0?"Bugün":AYLAR[dt.getMonth()]+" "+dt.getDate()};}).map((g,gi)=>{
                const gs=gunV(g.key).su||0;
                const pct=Math.min(100,(gs/suHed)*100);
                return(
                  <div key={g.key} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:gi<6?`1px solid ${d?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)"}`:undefined}}>
                    <div style={{fontSize:10,color:r.muted,width:52,fontWeight:600}}>{g.label}</div>
                    <div style={{flex:1,height:2,background:d?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",borderRadius:99,overflow:"hidden"}}>
                      <div style={{height:"100%",width:pct+"%",background:pct>=100?"#10b981":"linear-gradient(90deg,#60a5fa,#3b82f6)",borderRadius:99,transition:"width .6s"}}/>
                    </div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:300,color:pct>=100?"#10b981":"#60a5fa",width:52,textAlign:"right",letterSpacing:-.3}}>{(gs/1000).toFixed(1)}L</div>
                  </div>
                );
              })}
            </div>

            {/* Fayda grid */}
            <div style={{...CS}}>
              <div style={{fontSize:9,fontWeight:700,color:"rgba(96,165,250,.4)",letterSpacing:3,textTransform:"uppercase",marginBottom:16}}>Neden Su?</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[
                  {baslik:"Beyin",acik:"Konsantrasyon & hafıza",c:"#a78bfa"},
                  {baslik:"Metabolizma",acik:"%30 hızlanma",c:"#f59e0b"},
                  {baslik:"Kaslar",acik:"Güç & performans",c:"#10b981"},
                  {baslik:"Cilt",acik:"Nem & parlaklık",c:"#f472b6"},
                  {baslik:"Eklemler",acik:"Ağrı önleme",c:"#60a5fa"},
                  {baslik:"Toksin",acik:"Böbrek temizliği",c:"#34d399"},
                ].map(f=>(
                  <div key={f.baslik} style={{background:d?`${f.c}07`:`${f.c}05`,border:`1px solid ${f.c}15`,borderRadius:14,padding:"12px 12px"}}>
                    <div style={{fontSize:11,fontWeight:700,color:f.c,marginBottom:3,letterSpacing:.3}}>{f.baslik}</div>
                    <div style={{fontSize:10,color:r.muted,lineHeight:1.4}}>{f.acik}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ──── TAKVİM ──────────────────────────────────────────── */}
        {tab==="takvim"&&(
          <div style={{padding:16}}>
            <div style={{...CS,padding:"12px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <button onClick={()=>{const d2=new Date(takvimAy);d2.setMonth(d2.getMonth()-1);setTakvimAy(d2);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:r.text}}>‹</button>
                <div style={{fontWeight:800,fontSize:15,color:r.text}}>{AYLAR[takvimAy.getMonth()]} {takvimAy.getFullYear()}</div>
                <button onClick={()=>{const d2=new Date(takvimAy);d2.setMonth(d2.getMonth()+1);setTakvimAy(d2);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:r.text}}>›</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:4}}>
                {GUNLER.map(g=><div key={g} style={{textAlign:"center",fontSize:9,color:r.muted,fontWeight:700,padding:"2px 0"}}>{g}</div>)}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
                {takvimGunler().map((gun,i)=>{
                  if(!gun)return<div key={i}/>;
                  const v=gunV(gun.key);
                  const sel=gun.key===secTarih,bug2=gun.key===bugunKey();
                  return(
                    <button key={gun.key} onClick={()=>setSecTarih(gun.key)} style={{aspectRatio:"1",border:`2px solid ${sel?"#16a34a":bug2?"#86efac":"transparent"}`,borderRadius:8,cursor:"pointer",background:sel?"#16a34a":d?"#334155":"#f9fafb",color:sel?"#fff":r.text,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:bug2?800:400}}>
                      {gun.gun}
                      <div style={{display:"flex",gap:1,marginTop:1}}>
                        {(v.yemekler||[]).length>0&&<div style={{width:4,height:4,borderRadius:"50%",background:sel?"#fff":"#16a34a"}}/>}
                        {(v.su||0)>=suHed*0.8&&<div style={{width:4,height:4,borderRadius:"50%",background:sel?"#fff":"#2563eb"}}/>}
                        {v.kilo&&<div style={{width:4,height:4,borderRadius:"50%",background:sel?"#fff":"#8b5cf6"}}/>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={CS}>
              <div style={CT}>{secTarih===bugunKey()?"Bugün":secTarih}</div>
              <div style={{display:"flex",gap:8,marginBottom:12,alignItems:"center"}}>
                <div style={{fontSize:12,color:r.sub,fontWeight:700,whiteSpace:"nowrap"}}>Kilo:</div>
                <input style={{...IS,flex:1,padding:"8px 11px",fontSize:13}} placeholder="kg" type="number" value={secilenGV.kilo||""} onChange={e=>gunSet(secTarih,"kilo",e.target.value)}/>
                <button style={{...BTN("#8b5cf6","8px 12px"),fontSize:12}} onClick={()=>{}}>Kaydet</button>
              </div>
              <div style={{fontSize:11,fontWeight:700,color:r.sub,marginBottom:6}}>YEMEKLER</div>
              {(secilenGV.yemekler||[]).length===0?<div style={{color:r.muted,fontSize:12}}>Kayıt yok.</div>:(secilenGV.yemekler||[]).map((y,i)=>(
                <div key={i} style={{padding:"6px 0",borderBottom:`1px solid ${r.rowB}`}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div style={{fontSize:12,fontWeight:700,color:r.text}}>{y.ad} ({y.gram}g) <span style={{color:r.muted}}>{y.kat}</span></div>
                    <div style={{fontWeight:800,color:"#16a34a",fontSize:12}}>{y.gramKal} kcal</div>
                  </div>
                </div>
              ))}
              {(secilenGV.spor||[]).length>0&&<>
                <div style={{fontSize:11,fontWeight:700,color:r.sub,margin:"10px 0 6px"}}>SPOR</div>
                {(secilenGV.spor||[]).map((s,i)=>(
                  <div key={i} style={{padding:"5px 0",borderBottom:`1px solid ${r.rowB}`}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <div style={{fontSize:12,color:r.text}}>{s.ikon||"🏃"} {s.ad||"Spor"} · {s.sure} dk · {s.tempo==="hafif"?"🚶 Hafif":s.tempo==="orta"?"🏃 Orta":"💨 Yüksek"} tempo</div>
                      <div style={{fontWeight:700,color:"#10b981",fontSize:12}}>−{s.kcal} kcal</div>
                    </div>
                  </div>
                ))}
              </>}
            </div>
          </div>
        )}

        {/* ──── ARA ─────────────────────────────────────────────── */}
        {/* ──── GÖZAT ─────────────────────────────────────────────── */}
        {tab==="gozat"&&(
          <div style={{padding:"8px 0 16px"}}>
            {/* BAŞLIK */}
            <div style={{padding:"0 4px 14px"}}>
              <div style={{fontSize:18,fontWeight:900,color:r.text}}>Yiyecek Ara</div>
              <div style={{fontSize:12,color:r.sub}}>Veritabanında besin ara, filtrele</div>
            </div>

            {/* ARAMA KUTUSU */}
            <div style={{position:"relative",marginBottom:12}}>
              <input
                style={{...IS,paddingLeft:38,fontSize:14}}
                placeholder="Besin veya marka ara..."
                value={besinArama}
                onChange={e=>{setBesinArama(e.target.value);setAramaOdak(true);}}
                onFocus={()=>setAramaOdak(true)}
                onBlur={()=>setTimeout(()=>setAramaOdak(false),200)}
              />
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:16,pointerEvents:"none"}}>🔍</span>
              {besinArama&&<button onClick={()=>setBesinArama("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:18,color:r.muted,lineHeight:1}}>×</button>}
            </div>

            {/* Önceki aramalar */}
            {!besinArama&&aramaOdak&&oncekiAramalar.length>0&&(
              <div style={{background:d?"#1e293b":"#f8fafc",borderRadius:14,padding:"10px 14px",marginBottom:10,border:`1px solid ${d?"#334155":"#e2e8f0"}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{fontSize:11,fontWeight:800,color:r.sub}}>🕐 Son Aramalar</div>
                  <button onClick={()=>{setOncekiAramalar([]);localStorage.setItem("doya_ara_gecmis",JSON.stringify([]));}} style={{background:"none",border:"none",cursor:"pointer",fontSize:10,color:r.muted,fontFamily:"'Nunito',sans-serif",fontWeight:700}}>Temizle</button>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {oncekiAramalar.map((ara,i)=>(
                    <button key={i} onClick={()=>{setBesinArama(ara);setAramaOdak(true);}} style={{background:d?"#0f172a":"#fff",border:`1.5px solid ${d?"#334155":"#e2e8f0"}`,borderRadius:20,padding:"5px 12px",fontSize:12,fontWeight:700,cursor:"pointer",color:r.sub,fontFamily:"'Nunito',sans-serif"}}>🔍 {ara}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Arama sonuçları */}
            {besinArama&&(
              <div>
                {aramaBesinler.length===0&&<div style={{textAlign:"center",padding:"24px",color:r.muted,fontSize:13}}>Sonuç bulunamadı.</div>}
                {aramaBesinler.slice(0,30).map(b=>(
                  <div key={b.id} style={{...CS,margin:"7px 0",padding:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>{setSecBesin(b);setYemekGram(String(b.por||100));}}>
                      <div>
                        <div style={{fontWeight:800,fontSize:13,color:r.text}}>{b.ad}{b.marka?` (${b.marka})`:""}</div>
                        <div style={{marginBottom:1}}><YildizGoster v={b.yildiz??3} boyut={12}/></div>
                        <div style={{fontSize:11,color:r.muted}}>{b.kal} kcal · P:{b.pro}g K:{b.karb}g Y:{b.yag}g</div>
                      </div>
                      <button onClick={e=>{e.stopPropagation();setSecBesin(b);setYemekGram(String(b.por||100));}} style={{background:"#16a34a",border:"none",borderRadius:10,width:30,height:30,color:"#fff",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!besinArama&&(
            <div style={CS}>
              <div style={CT}>Filtreler</div>
              <div style={{marginBottom:12}}>
                <div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:5}}>Kategori</div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  {["","Tahıl","Protein","Meyve","Sebze","Süt Ürünü","Atıştırmalık","Hazır Yemek","İçecek","Çorba"].map(k=>(
                    <button key={k} onClick={()=>setBesinFil(p=>({...p,kat:k}))} style={{padding:"4px 10px",border:`1.5px solid ${besinFil.kat===k?"#16a34a":r.inpB}`,borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",background:besinFil.kat===k?"#16a34a":r.inp,color:besinFil.kat===k?"#fff":r.sub,fontFamily:"'Nunito',sans-serif"}}>{k||"Tümü"}</button>
                  ))}
                </div>
              </div>
            </div>
            )}

            {!besinArama&&filtreBesinler.length>0&&(
              <>
                <div style={{fontSize:12,color:r.sub,padding:"0 4px",marginBottom:6}}>{filtreBesinler.length} besin bulundu</div>
                {filtreBesinler.slice(0,gozatLimit).map(b=>(
                  <div key={b.id} style={{...CS,margin:"6px 0",cursor:"pointer",padding:12}} onClick={()=>{setSecBesin(b);setYemekGram(String(b.por||100));}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:800,fontSize:13,color:r.text}}>{b.ad}{b.marka?` (${b.marka})`:""}</div>
                        <YildizGoster v={b.yildiz??3} boyut={11}/>
                        <div style={{fontSize:11,color:r.muted,marginTop:2}}>{b.kal} kcal · P:{b.pro}g K:{b.karb}g Y:{b.yag}g</div>
                        <div style={{fontSize:10,color:r.sub}}>{b.kat}</div>
                      </div>
                      <button onClick={e=>{e.stopPropagation();setSecBesin(b);setYemekGram(String(b.por||100));}}
                        style={{background:"#16a34a",border:"none",borderRadius:10,width:30,height:30,color:"#fff",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginLeft:8}}>+</button>
                    </div>
                  </div>
                ))}
                {filtreBesinler.length>gozatLimit&&(
                  <button onClick={()=>setGozatLimit(l=>l+30)} style={{...BTN("transparent","10px 0"),width:"100%",border:`1px solid ${r.inpB}`,color:r.sub,fontSize:12}}>Daha Fazla Göster</button>
                )}
              </>
            )}
          </div>
        )}

      {/* ──── SOSYAL ──────────────────────────────────────────── */}
        {tab==="sosyal"&&(
          <div style={{padding:16}}>
            <div style={CS}>
              <div style={CT}>Bir Şeyler Paylaş</div>
              {kullanicilar.find(u=>u.uid===aktif?.uid)?.sosyalKisitli?(
                <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:10,padding:"10px 14px",fontSize:12,color:"#ef4444",fontWeight:700}}>
                  🔇 Hesabınızın sosyal özellikleri yönetici tarafından kısıtlanmıştır.
                </div>
              ):(
                <>
                  <textarea style={{...IS,height:70,resize:"none",marginBottom:8}} placeholder="Bugün ne yedin? Nasıl hissediyorsun?" value={yeniPS} onChange={e=>setYeniPS(e.target.value)}/>

                  {/* Fotoğraf önizleme */}
                  {postFoto&&(
                    <div style={{position:"relative",marginBottom:8,borderRadius:10,overflow:"hidden"}}>
                      <img src={postFoto} style={{width:"100%",maxHeight:180,objectFit:"cover",display:"block",borderRadius:10}} alt="post"/>
                      <button onClick={()=>setPostFoto(null)} style={{position:"absolute",top:6,right:6,background:"rgba(0,0,0,.55)",border:"none",borderRadius:"50%",width:24,height:24,color:"#fff",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>×</button>
                    </div>
                  )}

                  <div style={{display:"flex",gap:8}}>
                    <button style={{...BTN("#6b7280","9px 0"),flex:1,fontSize:12}} onClick={()=>postFotoRef.current.click()}>
                      📷 Fotoğraf Ekle
                    </button>
                    <button style={{...BTN(),flex:2,padding:"9px 0"}} onClick={async()=>{
                      if(!yeniPS.trim()&&!postFoto)return;
                      if(!yeniPS.trim())return;
                      try {
                        await postPaylas({
                          uid: aktif?.uid,
                          isim: aktif.isim,
                          foto: profFoto||null,
                          icerik: yeniPS,
                          postFoto: postFoto||null,
                          yemekler: bugYemekler.slice(-3).map(y=>({ad:y.ad,kal:y.gramKal,gram:y.gram})),
                        });
                        setYeniPS(""); setPostFoto(null);
                      } catch(e){ console.error("Post paylaşma hatası:",e); }
                    }}>Paylaş</button>
                  </div>
                  <input ref={postFotoRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{
                    const f=e.target.files[0]; if(!f)return;
                    // Firebase: storage.ref(`posts/${aktif?.uid}/${Date.now()}`).put(f) → getDownloadURL()
                    const reader=new FileReader();
                    reader.onload=ev=>setPostFoto(ev.target.result);
                    reader.readAsDataURL(f);
                  }}/>
                </>
              )}
            </div>
            {/* Genel / Arkadaşlar sekmesi */}
            <div style={{display:"flex",background:d?"#1e293b":"#f0fdf4",borderRadius:12,padding:4,marginBottom:12,gap:4}}>
              {[{v:"genel",l:"🌍 Genel"},{v:"arkadaslar",l:"👥 Arkadaşlar"},{v:"tarifler",l:"🍳 Tarifler"}].map(s=>(
                <button key={s.v} onClick={()=>setSosyalSekme(s.v)} style={{flex:1,padding:"8px 0",borderRadius:9,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,background:sosyalSekme===s.v?d?"#334155":"#fff":"transparent",color:sosyalSekme===s.v?"#16a34a":r.sub,boxShadow:sosyalSekme===s.v?"0 1px 4px #0001":"none",transition:"all .15s"}}>{s.l}</button>
              ))}
            </div>
            {(sosyalSekme==="arkadaslar"&&arkadaslar.length===0)&&(
              <div style={{textAlign:"center",color:r.muted,padding:"24px 0",fontSize:13}}>Henüz arkadaşın yok. Arkadaş ekleyerek onların paylaşımlarını gör!</div>
            )}
            {sosyalSekme==="tarifler"&&(
              <div>
                {/* Kategori filtreleri */}
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                  {["","Kahvaltı","Öğle","Akşam","Atıştırmalık","Çorba","Sporcu"].map(k=>(
                    <button key={k} onClick={()=>{setTarifKat(k);setTarifUlke("");setTarifLimit(10);}} style={{padding:"5px 12px",borderRadius:20,border:`1.5px solid ${tarifKat===k&&!tarifUlke?"#16a34a":r.inpB}`,background:tarifKat===k&&!tarifUlke?"#16a34a":r.inp,color:tarifKat===k&&!tarifUlke?"#fff":r.sub,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>
                      {k||"Tümü"} {k===""?`(${tarifler.length})`:`(${tarifler.filter(t=>t.kategori===k||(k==="Sporcu"&&t.sporcu)).length})`}
                    </button>
                  ))}
                </div>
                {/* Ülke filtreleri */}
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
                  {[
                    {k:"",l:"🌍 Tümü"},
                    {k:"Almanya",l:"🇩🇪 Almanya"},
                    {k:"Türkiye",l:"🇹🇷 Türkiye"},
                  ].map(u=>{
                    const ulkeSayisi = u.k===""
                      ? tarifler.length
                      : u.k==="Türkiye"
                      ? tarifler.filter(t=>!t.ulke).length
                      : tarifler.filter(t=>t.ulke===u.k).length;
                    const aktif = tarifUlke===u.k;
                    return(
                      <button key={u.k} onClick={()=>{setTarifUlke(u.k);setTarifKat("");setTarifLimit(10);}}
                        style={{padding:"5px 12px",borderRadius:20,
                          border:`1.5px solid ${aktif?"#7c3aed":r.inpB}`,
                          background:aktif?"#7c3aed":r.inp,
                          color:aktif?"#fff":r.sub,
                          fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>
                        {u.l} ({ulkeSayisi})
                      </button>
                    );
                  })}
                </div>
                {renderTarifListesi()}
              </div>
            )}
            {sosyalSekme!=="tarifler"&&paylasimlar.filter(ps=>{
              if(engelliler.includes(ps.uid)) return false;
              if(sosyalSekme==="arkadaslar") return arkadaslar.some(a=>a.uid===ps.uid)||ps.uid===aktif?.uid;
              return true;
            }).map(ps=>(
              <div key={ps.id} style={CS}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <div style={{width:38,height:38,borderRadius:"50%",background:"#16a34a",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:15,overflow:"hidden"}}>
                      {ps.foto?<img src={ps.foto} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:ps.isim[0]}
                    </div>
                    <div>
                      <div style={{fontSize:13,fontWeight:800,color:r.text}}>{ps.isim}</div>
                      <div style={{fontSize:10,color:r.muted}}>{ps.zaman}</div>
                    </div>
                  </div>
                  {ps.uid===aktif?.uid&&(
                    <span style={{fontSize:10,color:r.muted,fontStyle:"italic"}}>senin paylaşımın</span>
                  )}
                </div>
                <div style={{fontSize:13,color:r.text,marginBottom:8,lineHeight:1.5}}>{ps.icerik}</div>
                {ps.postFoto&&(
                  <div style={{position:"relative",borderRadius:12,overflow:"hidden",marginBottom:8}}>
                    <img src={ps.postFoto} style={{width:"100%",maxHeight:220,objectFit:"cover",display:"block"}} alt="post foto"/>
                    {ps.uid!==aktif?.uid&&(
                      <button
                        onClick={()=>setSikayet({hedef:ps.uid,sebep:"",modal:true,tip:"foto",postId:ps.id,postFotoUrl:ps.postFoto})}
                        style={{position:"absolute",top:7,right:7,background:"rgba(0,0,0,.55)",border:"none",borderRadius:8,padding:"4px 8px",color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer"}}>
                        ⚑ Fotoğrafı Bildir
                      </button>
                    )}
                  </div>
                )}
                {ps.yemekler.length>0&&(
                  <div style={{background:d?"#0f172a":"#f0fdf4",borderRadius:10,padding:8,marginBottom:8}}>
                    {ps.yemekler.map((y,i)=><div key={i} style={{fontSize:11,color:r.sub}}>🍽 {y.ad} ({y.gram}g) — {y.kal} kcal</div>)}
                  </div>
                )}
                <div style={{display:"flex",gap:6,marginBottom:8}}>
                  <button onClick={async()=>{
                    const yeniB2=ps.begeniler.includes(aktif?.uid)?ps.begeniler.filter(u=>u!==aktif?.uid):[...ps.begeniler,aktif?.uid];
                    await postGuncelle(ps.id,{begeniler:yeniB2}).catch(console.error);
                  }} style={{...BTN(ps.begeniler.includes(aktif?.uid)?"#16a34a":"#f3f4f6","6px 12px"),color:ps.begeniler.includes(aktif?.uid)?"#fff":"#374151",fontSize:12}}>❤️ {ps.begeniler.length}</button>
                  {ps.uid===aktif?.uid?(
                    <button onClick={async()=>{ await postSil(ps.id).catch(console.error); }} style={{...BTN("#ef4444","6px 10px"),fontSize:12}}>🗑 Sil</button>
                  ):(
                    <>
                      <button onClick={()=>setSikayet({hedef:ps.uid,sebep:"",modal:true,tip:"kullanici",postId:ps.id,postFotoUrl:null})} style={{background:"none",border:`1px solid ${r.inpB}`,borderRadius:8,padding:"5px 9px",cursor:"pointer",fontSize:12,color:r.muted,fontFamily:"'Nunito',sans-serif"}}>⚑ Bildir</button>
                      <button onClick={()=>engelle(ps.uid)} style={{...BTN("#fef2f2","6px 10px"),color:"#ef4444",fontSize:12}}>Engelle</button>
                    </>
                  )}
                </div>
                {ps.yorumlar.map((y,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 9px",background:d?"#0f172a":"#f9fafb",borderRadius:8,marginBottom:4}}>
                    <div><span style={{fontWeight:700,fontSize:12,color:r.text}}>{y.isim}: </span><span style={{fontSize:12,color:r.sub}}>{y.yorum}</span></div>
                    {(y.uid===aktif?.uid||ps.uid===aktif?.uid)&&<button onClick={()=>setPaylasimlar(prev=>prev.map(p2=>p2.id===ps.id?{...p2,yorumlar:p2.yorumlar.filter((_,ii)=>ii!==i)}:p2))} style={{background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:12}}>×</button>}
                  </div>
                ))}
                <div style={{display:"flex",gap:6,marginTop:6}}>
                  <input style={{...IS,flex:1,padding:"7px 10px",fontSize:12}} placeholder="Yorum yaz..." value={yorumMet[ps.id]||""} onChange={e=>setYorumMet(p=>({...p,[ps.id]:e.target.value}))} onKeyDown={async e=>{if(e.key==="Enter"&&yorumMet[ps.id]?.trim()){const yYorum=[...ps.yorumlar,{uid:aktif?.uid,isim:aktif.isim,yorum:yorumMet[ps.id],zaman:"Az önce"}];await postGuncelle(ps.id,{yorumlar:yYorum}).catch(console.error);setYorumMet(p=>({...p,[ps.id]:""}));}}}/>
                  <button onClick={async()=>{if(!yorumMet[ps.id]?.trim())return;const yYorum=[...ps.yorumlar,{uid:aktif?.uid,isim:aktif.isim,yorum:yorumMet[ps.id],zaman:"Az önce"}];await postGuncelle(ps.id,{yorumlar:yYorum}).catch(console.error);setYorumMet(p=>({...p,[ps.id]:""}));}} style={{...BTN("#3b82f6","7px 12px"),fontSize:12}}>↑</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ──── ARKADASLAR ─────────────────────────────────────── */}
        {tab==="arkadaslar"&&sosyalAktif&&(
          <div style={{padding:16}}>
            <div style={{background:"linear-gradient(135deg,#16a34a,#0d9488)",borderRadius:16,padding:18,color:"#fff",marginBottom:10}}>
              <div style={{fontSize:10,fontWeight:700,opacity:.85}}>KULLANICI KODUN</div>
              <div style={{fontSize:22,fontWeight:900,letterSpacing:2,margin:"4px 0"}}>{aktif?.uid}</div>
              <div style={{display:"flex",gap:8,marginTop:8}}>
                <span style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700}}>{acikHesap?"🔓 Açık":"🔒 Gizli"}</span>
                <span style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700}}>{arkadaslar.length} Arkadaş</span>
              </div>
            </div>

            {gelenIstekler.length>0&&(
              <div style={{...CS,border:"2px solid #f59e0b"}}>
                <div style={CT}>Gelen İstekler ({gelenIstekler.length})</div>
                {gelenIstekler.map(ist=>(
                  <div key={ist.uid} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${r.rowB}`}}>
                    <div><div style={{fontWeight:700,color:r.text}}>{ist.isim}</div><div style={{fontSize:10,color:r.muted}}>{ist.uid}</div></div>
                    <div style={{display:"flex",gap:6}}>
                      <button onClick={()=>istekKabul(ist.uid)} style={{...BTN("#16a34a","5px 10px"),fontSize:12}}>Kabul</button>
                      <button onClick={()=>setGelenIstekler(p=>p.filter(i=>i.uid!==ist.uid))} style={{...BTN("#ef4444","5px 10px"),fontSize:12}}>Reddet</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {gonderilen.length>0&&(
              <div style={{...CS,border:`1px solid ${r.brd}`}}>
                <div style={CT}>Gönderilen İstekler ({gonderilen.length})</div>
                {gonderilen.map(ist=>(
                  <div key={ist.uid} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${r.rowB}`}}>
                    <div>
                      <div style={{fontWeight:700,color:r.text}}>{ist.isim}</div>
                      <div style={{fontSize:10,color:r.muted}}>{ist.uid} · {ist.zaman}</div>
                    </div>
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      <span style={{fontSize:10,color:"#f59e0b",fontWeight:700}}>⏳ Bekliyor</span>
                      <button onClick={()=>setGonderilen(p=>p.filter(i=>i.uid!==ist.uid))} style={{...BTN("#6b7280","4px 8px"),fontSize:11}}>İptal</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={CS}>
              <div style={CT}>UID ile Arkadaş Ekle</div>
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                <input style={{...IS,flex:1}} placeholder="NTR-000000" value={uidArama} onChange={e=>setUidArama(e.target.value)}/>
                <button onClick={uidAra} style={{...BTN(),whiteSpace:"nowrap"}}>Ara</button>
              </div>
              {uidHata&&<div style={{background:"#fef2f2",color:"#ef4444",padding:"8px 11px",borderRadius:10,fontSize:12,marginBottom:8}}>{uidHata}</div>}
              {uidSonuc&&(
                <div style={{background:d?"#0f172a":"#f9fafb",borderRadius:12,padding:12,border:`1px solid ${r.brd}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontWeight:800,fontSize:14,color:r.text}}>{uidSonuc.isim}</div>
                      <div style={{fontSize:11,color:uidSonuc.acik?"#16a34a":"#f59e0b",fontWeight:700}}>{uidSonuc.acik?"🔓 Açık — Direkt eklenir":"🔒 Gizli — Onay gerekir"}</div>
                    </div>
                    <button onClick={()=>istekGonder(uidSonuc.uid)} style={{...BTN(),fontSize:12}}>{uidSonuc.acik?"Ekle":"İstek Gönder"}</button>
                  </div>
                </div>
              )}
            </div>



            <div style={CS}>
              <div style={CT}>Arkadaşlarım ({arkadaslar.length})</div>
              {arkadaslar.length===0?<div style={{color:r.muted,fontSize:13,textAlign:"center",padding:"12px 0"}}>Henüz arkadaşın yok.</div>:
                arkadaslar.map(a=>{
                  const av=paylasimDB[a.uid]||{};
                  const ay2=av.gunluk?.[bugunKey()]?.yemekler||[];
                  const as=av.gunluk?.[bugunKey()]?.spor||[];
                  const aKal=ay2.reduce((t,y)=>t+(y.gramKal||y.kal||0),0);
                  const aSpor=as.reduce((t,s)=>t+(s.kcal||0),0);
                  const aBmi=bmiHesapla(av.profil?.kilo,av.profil?.boy);
                  const aBmiD=bmiDurum(aBmi);
                  return(
                    <div key={a.uid} style={{padding:"10px 0",borderBottom:`1px solid ${r.rowB}`}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <div>
                          <div style={{fontWeight:800,fontSize:14,color:r.text}}>{a.isim}</div>
                          <div style={{fontSize:10,color:r.muted}}>{a.uid}</div>
                        </div>
                        <div style={{display:"flex",gap:5}}>
                          <button onClick={()=>setSecArk(secArk?.uid===a.uid?null:a)} style={{...BTN("#3b82f6","5px 9px"),fontSize:11}}>{secArk?.uid===a.uid?"Kapat":"Detay"}</button>
                          <button onClick={()=>engelle(a.uid)} style={{...BTN("#ef4444","5px 9px"),fontSize:11}}>Engelle</button>
                          <button onClick={()=>setSikayet({hedef:a.uid,sebep:"",modal:true})} style={{...BTN("#f59e0b","5px 9px"),fontSize:11}}>⚑</button>
                        </div>
                      </div>
                      <div style={{display:"flex",gap:6}}>
                        <div style={{flex:1,background:d?"#0f172a":"#f0fdf4",borderRadius:8,padding:8,textAlign:"center"}}>
                          <div style={{fontSize:14,fontWeight:900,color:"#16a34a"}}>{aKal}</div>
                          <div style={{fontSize:9,color:r.muted}}>kcal</div>
                        </div>
                        {aBmi&&aBmiD&&<div style={{flex:1,background:aBmiD.renk+"20",borderRadius:8,padding:8,textAlign:"center"}}>
                          <div style={{fontSize:14,fontWeight:900,color:aBmiD.renk}}>{aBmi}</div>
                          <div style={{fontSize:9,color:aBmiD.renk,fontWeight:700}}>{aBmiD.etiket}</div>
                        </div>}
                        {aSpor>0&&<div style={{flex:1,background:"#10b98120",borderRadius:8,padding:8,textAlign:"center"}}>
                          <div style={{fontSize:14,fontWeight:900,color:"#10b981"}}>−{aSpor}</div>
                          <div style={{fontSize:9,color:r.muted}}>spor</div>
                        </div>}
                      </div>
                      {secArk?.uid===a.uid&&(
                        <div style={{marginTop:8,background:d?"#0f172a":"#f9fafb",borderRadius:10,padding:12}}>
                          <div style={{fontSize:11,fontWeight:700,color:r.sub,marginBottom:6}}>BUGÜNÜN YEMEKLERİ</div>
                          {ay2.length===0?<div style={{fontSize:12,color:r.muted}}>Kayıt yok.</div>:ay2.map((y,i)=>(
                            <div key={i} style={{padding:"5px 0",borderBottom:`1px solid ${r.rowB}`}}>
                              <div style={{display:"flex",justifyContent:"space-between"}}>
                                <div style={{fontSize:12,fontWeight:700,color:r.text}}>{y.ad} ({y.gram}g)</div>
                                <div style={{fontWeight:800,color:"#16a34a",fontSize:12}}>{y.gramKal||y.kal} kcal</div>
                              </div>
                            </div>
                          ))}
                          {as.length>0&&<>
                            <div style={{fontSize:11,fontWeight:700,color:r.sub,margin:"8px 0 4px"}}>SPOR</div>
                            {as.map((s,i)=><div key={i} style={{fontSize:12,color:r.text}}>{s.ikon||"🏃"} {s.ad||"Spor"} · {s.sure} dk · −{s.kcal} kcal</div>)}
                          </>}
                        </div>
                      )}
                    </div>
                  );
                })
              }
            </div>

            {engelliler.length>0&&(
              <div style={CS}>
                <div style={CT}>Engellenenler ({engelliler.length})</div>
                {engelliler.map(uid=>{
                  const k=kullanicilar.find(u=>u.uid===uid);
                  return(
                    <div key={uid} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${r.rowB}`}}>
                      <div style={{fontSize:13,color:r.text}}>{k?.isim||uid}</div>
                      <button onClick={()=>setEngelliler(p=>p.filter(u=>u!==uid))} style={{...BTN("#16a34a","5px 10px"),fontSize:12}}>Engeli Kaldır</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ──── YARIŞ ──────────────────────────────────────────── */}

        {/* ──── ORUÇ TAKİP ──────────────────────────────────────── */}
        {renderOrucTab()}

        {/* ──── PUAN ────────────────────────────────────────────── */}
        {tab==="puan"&&(
          <div style={{padding:"8px 0 16px"}}>
            <div style={{margin:"0 14px 8px",background:d?"linear-gradient(145deg,#090700,#120c00)":"linear-gradient(145deg,#fefce8,#fff)",borderRadius:22,padding:"22px 22px 20px",border:"1px solid rgba(200,146,42,.12)",position:"relative",overflow:"hidden",boxShadow:d?"0 20px 60px rgba(0,0,0,.4)":"0 8px 32px rgba(200,146,42,.08)"}}>
              <div style={{position:"absolute",top:-20,right:-20,width:140,height:140,background:"radial-gradient(circle,rgba(200,146,42,.07) 0%,transparent 70%)"}}/>
              <div style={{fontSize:9,fontWeight:700,color:"rgba(240,193,75,.4)",letterSpacing:3,textTransform:"uppercase",marginBottom:16}}>Puan Durumu</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:56,fontWeight:300,color:"#f0c14b",lineHeight:1,letterSpacing:-3,marginBottom:6}}>{puan}</div>
              <div style={{fontSize:10,color:r.muted,letterSpacing:.5}}>Puan biriktir, AI hakkı kazan</div>
              {firebaseUID&&localStorage.getItem("doya_son_giris_"+firebaseUID)===bugunKey()&&<div style={{marginTop:12,background:"rgba(200,146,42,.08)",border:"1px solid rgba(240,193,75,.15)",borderRadius:10,padding:"8px 12px",fontSize:10,color:"rgba(240,193,75,.7)",fontWeight:700,letterSpacing:.5}}>Bugünkü giriş bonusu — +100 puan alındı</div>}
            </div>

            {/* Premium planlar */}
            {!premium&&!premiumPlus&&(
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {/* Aylık/Yıllık toggle */}
                <div style={{display:"flex",background:d?"rgba(255,255,255,.03)":"rgba(0,0,0,.04)",borderRadius:14,padding:4,gap:4,margin:"0 14px"}}>
                  {[{v:false,l:"Aylık"},{v:true,l:"Yıllık — %25 İndirim"}].map(p=>(
                    <button key={String(p.v)} onClick={()=>setYillikPlan(p.v)}
                      style={{flex:1,padding:"9px 0",borderRadius:10,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",
                        fontWeight:700,fontSize:11,transition:"all .2s",letterSpacing:.3,
                        background:yillikPlan===p.v?(d?"rgba(16,185,129,.12)":"rgba(16,185,129,.08)"):"transparent",
                        color:yillikPlan===p.v?"#10b981":r.muted,
                        boxShadow:yillikPlan===p.v?`0 2px 8px rgba(16,185,129,.15)`:"none"}}>
                      {p.l}
                    </button>
                  ))}
                </div>
                {/* Temel Premium */}
                <div style={{...CS,border:"1px solid rgba(200,146,42,.2)",background:d?"linear-gradient(145deg,#0a0800,#100d00)":"linear-gradient(145deg,#fefce8,#fffdf5)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{fontSize:9,fontWeight:700,color:"rgba(240,193,75,.5)",letterSpacing:2.5,textTransform:"uppercase"}}>Premium</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:300,color:"#f0c14b",letterSpacing:-.5}}>{PREMIUM_FIYAT}₺<span style={{fontSize:12,fontWeight:300}}>/ay</span></div>
                  </div>
                  <div style={{fontSize:12,color:r.sub,marginBottom:10}}>
                    {["Tüm banner reklamlar kalkar","Reklamsız gezinme","İstediğin zaman reklam izleyip puan kazan"].map((f,i)=><div key={i} style={{display:"flex",gap:6,alignItems:"center",marginBottom:5,fontSize:11,color:r.muted}}><div style={{width:4,height:4,borderRadius:"50%",background:"rgba(240,193,75,.5)",flexShrink:0}}/>{f}</div>)}
                  </div>
                  <button style={{...BTN("#f59e0b"),width:"100%",padding:"11px 0",fontSize:13}} onClick={async()=>{
                    setPremium(true); setReklam(false);
                    if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{premium:true,onboardTamamlandi:true}).catch(console.error);
                    setKullanicilar(p=>p.map(u=>u.uid===aktif?.uid?{...u,premium:true}:u));
                  }}>
                    {yillikPlan?`Satın Al — ${PREMIUM_YILLIK}₺/yıl (${Math.round(PREMIUM_YILLIK/12)}₺/ay)`:`Satın Al — ${PREMIUM_FIYAT}₺/ay`}
                  </button>
                </div>

                {/* Premium Plus */}
                <div style={{...CS,border:"1px solid rgba(167,139,250,.2)",background:d?"linear-gradient(145deg,#08051a,#0d0820)":"linear-gradient(145deg,#faf5ff,#f8f3ff)",position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:12,right:16,background:"linear-gradient(135deg,rgba(139,92,246,.2),rgba(109,40,217,.15))",border:"1px solid rgba(167,139,250,.2)",color:"#a78bfa",fontSize:8,fontWeight:800,padding:"3px 10px",borderRadius:20,letterSpacing:1.5,textTransform:"uppercase"}}>En İyi</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{fontSize:9,fontWeight:700,color:"rgba(167,139,250,.5)",letterSpacing:2.5,textTransform:"uppercase"}}>Premium Plus</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:300,color:"#a78bfa",letterSpacing:-.5}}>{PREMIUM_PLUS_FIYAT}₺<span style={{fontSize:12,fontWeight:300}}>/ay</span></div>
                  </div>
                  <div style={{fontSize:12,color:r.sub,marginBottom:10}}>
                    {["Tüm banner reklamlar kalkar","Günde 10 AI fotoğraf analizi","Fotoğraftan kalori hesaplama","Reklam izleyerek ek puan kazan","Temel Premium'ın tüm özellikleri"].map((f,i)=><div key={i} style={{display:"flex",gap:6,alignItems:"center",marginBottom:5,fontSize:11,color:r.muted}}><div style={{width:4,height:4,borderRadius:"50%",background:"rgba(167,139,250,.5)",flexShrink:0}}/>{f}</div>)}
                  </div>
                  <button style={{...BTN("#7c3aed"),width:"100%",padding:"11px 0",fontSize:13}} onClick={async()=>{
                    setPremiumPlus(true); setPremium(true); setReklam(false);
                    if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{premium:true,premiumPlus:true,onboardTamamlandi:true}).catch(console.error);
                    setKullanicilar(p=>p.map(u=>u.uid===aktif?.uid?{...u,premium:true,premiumPlus:true}:u));
                  }}>
                    {yillikPlan?`Satın Al — ${PREMIUM_PLUS_YILLIK}₺/yıl (${Math.round(PREMIUM_PLUS_YILLIK/12)}₺/ay)`:`Satın Al — ${PREMIUM_PLUS_FIYAT}₺/ay`}
                  </button>
                </div>
              </div>
            )}

            {/* AI DİYETİSYEN BUTONU */}
            <div style={{...CS,background:d?"linear-gradient(145deg,#060f07,#08120a)":"linear-gradient(145deg,#f0fdf4,#fafff8)",border:"1px solid rgba(16,185,129,.1)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:9,fontWeight:700,color:"rgba(16,185,129,.4)",letterSpacing:2.5,textTransform:"uppercase",marginBottom:5}}>AI Diyetisyen</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:300,color:r.text}}>Kişisel beslenme danışmanın</div>
                </div>
                <button onClick={()=>{setDiyetisyenAcik(true);if(diyMesajlar.length===0)setDiyMesajlar([{rol:"ai",mesaj:"Merhaba! Ben Doya AI Diyetisyeninim. Beslenme, kilo yönetimi, tarif önerileri veya diyet planı hakkında sormak istediğin her şeyi sorabilirsin. Ne konuda yardım edebilirim?",zaman:new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})}]);}}
                  style={{background:"linear-gradient(135deg,#10b981,#059669)",border:"1px solid rgba(52,211,153,.2)",borderRadius:12,padding:"10px 16px",color:"#fff",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:12,cursor:"pointer",letterSpacing:.3,boxShadow:"0 4px 16px rgba(16,185,129,.2)"}}>
                  Sohbet</button>
              </div>
            </div>


            {/* Aktif plan gösterimi */}
            {premiumPlus&&(
              <div style={{...CS,background:d?"linear-gradient(145deg,#0a0818,#0d0a22)":"linear-gradient(145deg,#faf5ff,#f8f3ff)",border:"1px solid rgba(139,92,246,.15)"}}>
                <div style={{fontSize:9,fontWeight:700,color:"rgba(167,139,250,.45)",letterSpacing:2.5,textTransform:"uppercase",marginBottom:10}}>Premium Plus Aktif</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:300,color:"#a78bfa",marginBottom:10}}>Reklamsız deneyim · AI analizi aktif</div>
                <div style={{background:d?"rgba(139,92,246,.08)":"rgba(139,92,246,.05)",border:"1px solid rgba(167,139,250,.1)",borderRadius:12,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:10,color:r.muted,letterSpacing:.3}}>Bugünkü AI hakkı</span>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:300,color:"#a78bfa"}}>{AI_GUNLUK_LIMIT-aiGunlukKullanim} / {AI_GUNLUK_LIMIT}</span>
                </div>
              </div>
            )}
            {premium&&!premiumPlus&&(
              <div style={{...CS,background:d?"linear-gradient(145deg,#090800,#110e00)":"linear-gradient(145deg,#fefce8,#fffdf5)",border:"1px solid rgba(200,146,42,.15)"}}>
                <div style={{fontSize:9,fontWeight:700,color:"rgba(240,193,75,.45)",letterSpacing:2.5,textTransform:"uppercase",marginBottom:10}}>Premium Aktif</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:300,color:"#f0c14b",marginBottom:12}}>Reklamsız deneyim etkin</div>
                <button style={{width:"100%",padding:"12px 0",borderRadius:14,border:"1px solid rgba(167,139,250,.2)",background:d?"rgba(139,92,246,.08)":"rgba(139,92,246,.06)",color:"#a78bfa",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:12,cursor:"pointer"}} onClick={async()=>{
                  setPremiumPlus(true);
                  if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{premiumPlus:true}).catch(console.error);
                }}>
                  Plus'a Yükselt — {PREMIUM_PLUS_FIYAT}₺/ay
                </button>
              </div>
            )}


            {/* ── MARKET + REKLAM ─────────────────────────── */}
            <div style={{...CS,padding:0,overflow:"hidden",marginBottom:12}}>
              <div style={{display:"flex",background:d?"#1e293b":"#f0fdf4"}}>
                {[{v:"market",l:"🛒 Market"},{v:"reklam",l:"📺 Reklam İzle"}].map(s=>(
                  <button key={s.v} onClick={()=>setMarketSekme(s.v)} style={{flex:1,padding:"11px 0",border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,background:marketSekme===s.v?(d?"#334155":"#fff"):"transparent",color:marketSekme===s.v?"#16a34a":r.sub,boxShadow:marketSekme===s.v?"0 1px 4px #0001":"none",transition:"all .15s"}}>{s.l}</button>
                ))}
              </div>

              {/* MARKET */}
              {marketSekme==="market"&&(
                <div style={{padding:14}}>
                  <div style={{fontSize:11,color:r.muted,marginBottom:10,lineHeight:1.6}}>
                    Biriktirdiğin puanları harcayarak ekstra AI analiz hakkı satın alabilirsin.
                    <br/><span style={{color:"#f59e0b",fontWeight:700}}>1 reklam izle = 50 puan</span> · <span style={{color:"#7c3aed",fontWeight:700}}>1 AI hakkı = 130 puan</span>
                  </div>

                  {/* AI Hak paketleri */}
                  {[
                    {adet:1, puan:130, emoji:"⚡", acikla:"Tek seferlik analiz"},
                    {adet:3, puan:360, emoji:"🔋", acikla:"En çok tercih edilen"},
                    {adet:5, puan:580, emoji:"🚀", acikla:"Haftalık paket"},
                    {adet:10,puan:1100,emoji:"💎", acikla:"Tam günlük limit"},
                  ].map(item=>(
                    <div key={item.adet} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:d?"#0f172a":"#f9fafb",borderRadius:12,padding:"10px 12px",marginBottom:8,border:`1.5px solid ${puan>=item.puan?"#16a34a33":r.inpB}`}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{fontSize:24}}>{item.emoji}</div>
                        <div>
                          <div style={{fontWeight:800,fontSize:13,color:r.text}}>+{item.adet} AI Analiz Hakkı</div>
                          <div style={{fontSize:10,color:r.muted}}>{item.acikla}</div>
                        </div>
                      </div>
                      <button
                        disabled={puan<item.puan}
                        onClick={async()=>{
                          if(puan<item.puan) return;
                          const yeniPuan=puan-item.puan;
                          const yeniHak=ekstraAiHak+item.adet;
                          setPuan(yeniPuan);
                          setEkstraAiHak(yeniHak);
                          if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{puan:yeniPuan,ekstraAiHak:yeniHak}).catch(console.error);
                        }}
                        style={{...BTN(puan>=item.puan?"#7c3aed":"#9ca3af","8px 14px"),fontSize:12,opacity:puan>=item.puan?1:0.5,cursor:puan>=item.puan?"pointer":"not-allowed"}}>
                        {item.puan} puan
                      </button>
                    </div>
                  ))}

                  <div style={{background:d?"#0f172a":"#eff6ff",borderRadius:10,padding:"10px 12px",marginTop:4}}>
                    <div style={{fontSize:10,fontWeight:700,color:"#3b82f6",marginBottom:4}}>💡 Nasıl puan kazanırsın?</div>
                    <div style={{fontSize:10,color:r.sub,lineHeight:1.7}}>
                      📺 Reklam izle → <b>+50 puan</b> (günde max 10 reklam)<br/>
                      🍽️ Yemek kaydet → <b>+10 puan</b><br/>
                      👥 Arkadaş davet et → <b>+100 puan</b>
                    </div>
                  </div>
                </div>
              )}

              {/* REKLAM İZLE */}
              {renderMarketReklam()}
              {false&&(()=>{
                const bugunR=bugunKey();
                const gecenGunR=gunlukReklamGun!==bugunR;
                const bugunIzlened=gecenGunR?0:gunlukReklamIzle;
                const GUNLUK_REKLAM_MAX=10;
                const kalanReklam=GUNLUK_REKLAM_MAX-bugunIzlened;

                return(
                  <div style={{padding:14}}>
                    {/* Günlük durum */}
                    <div style={{background:"linear-gradient(135deg,#f59e0b22,#d9770611)",border:"1.5px solid #f59e0b44",borderRadius:12,padding:14,marginBottom:12,textAlign:"center"}}>
                      <div style={{fontSize:28,marginBottom:4}}>📺</div>
                      <div style={{fontSize:15,fontWeight:900,color:"#d97706"}}>Reklam İzle, Puan Kazan!</div>
                      <div style={{fontSize:12,color:r.sub,marginTop:2}}>Her reklam <b style={{color:"#f59e0b"}}>+50 puan</b> kazandırır</div>
                      <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:16,marginTop:10}}>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:28,fontWeight:900,color:"#f59e0b"}}>{bugunIzlenen}</div>
                          <div style={{fontSize:9,color:r.muted}}>Bugün izlendi</div>
                        </div>
                        <div style={{fontSize:18,color:r.muted}}>/</div>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:28,fontWeight:900,color:r.sub}}>{GUNLUK_REKLAM_MAX}</div>
                          <div style={{fontSize:9,color:r.muted}}>Günlük max</div>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div style={{...PB,height:8,marginTop:10,borderRadius:10}}>
                        <div style={{...PF(bugunIzlenen/GUNLUK_REKLAM_MAX*100,"#f59e0b"),height:8,borderRadius:10}}/>
                      </div>
                    </div>

                    {kalanReklam<=0?(
                      <div style={{textAlign:"center",padding:"18px 0",color:r.muted}}>
                        <div style={{fontSize:32,marginBottom:6}}>✅</div>
                        <div style={{fontSize:13,fontWeight:700}}>Bugünkü tüm reklamları izledin!</div>
                        <div style={{fontSize:11,marginTop:4}}>Yarın 10 reklam hakkın yenilenir.</div>
                        <div style={{fontWeight:900,color:"#f59e0b",fontSize:16,marginTop:8}}>+{bugunIzlenen*50} puan kazandın bugün! 🎉</div>
                      </div>
                    ):(
                      <>
                        {reklamIzleniyor?(
                          <div style={{textAlign:"center",padding:"20px 0"}}>
                            <div style={{fontSize:14,fontWeight:700,color:r.text,marginBottom:12}}>Reklam yükleniyor...</div>
                            <div style={{background:d?"#1e293b":"#f3f4f6",borderRadius:12,padding:"20px",marginBottom:12,position:"relative",overflow:"hidden"}}>
                              {/* Simüle reklam */}
                              <div style={{background:"linear-gradient(135deg,#667eea,#764ba2)",borderRadius:8,padding:"24px 20px",color:"#fff",marginBottom:8}}>
                                <div style={{fontSize:11,fontWeight:700,opacity:.7,marginBottom:4}}>REKLAM</div>
                                <div style={{fontSize:16,fontWeight:900,marginBottom:4}}>Sağlıklı Yaşam ile Doya!</div>
                                <div style={{fontSize:11,opacity:.8}}>Beslenme takibini hiç bu kadar kolay yapmadın.</div>
                                <div style={{marginTop:12,background:"rgba(255,255,255,.2)",borderRadius:6,padding:"6px 12px",display:"inline-block",fontSize:11,fontWeight:700}}>Daha Fazla Bilgi →</div>
                              </div>
                              {/* Geri sayım */}
                              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                <div style={{fontSize:12,color:r.muted}}>Reklam oynatılıyor...</div>
                                <div style={{background:"#f59e0b",color:"#fff",borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:800}}>{reklamSayac}s</div>
                              </div>
                            </div>
                            <div style={{...PB,height:6}}>
                              <div style={{...PF((30-reklamSayac)/30*100,"#f59e0b"),height:6,transition:"width .9s linear"}}/>
                            </div>
                          </div>
                        ):(
                          <div style={{textAlign:"center"}}>
                            <div style={{fontSize:12,color:r.sub,marginBottom:12,lineHeight:1.6}}>
                              Reklam izleyerek puan kazan. Her reklam yaklaşık <b>30 saniye</b> sürer.
                              {ekstraAiHak>0&&<div style={{marginTop:6,color:"#7c3aed",fontWeight:700}}>✅ Aktif: +{ekstraAiHak} ekstra AI hak</div>}
                            </div>
                            <button onClick={()=>{
                              setReklamIzleniyor(true);
                              setReklamSayac(30);
                              const interval=setInterval(()=>{
                                setReklamSayac(s=>{
                                  if(s<=1){
                                    clearInterval(interval);
                                    setReklamIzleniyor(false);
                                    setReklamSayac(0);
                                    // Puan ver
                                    const yeniPuan=puan+50;
                                    const bugunRR=bugunKey();
                                    const gecenRR=gunlukReklamGun!==bugunRR;
                                    const yeniIzlenen=(gecenRR?0:gunlukReklamIzle)+1;
                                    setPuan(yeniPuan);
                                    setGunlukReklamIzle(yeniIzlenen);
                                    setGunlukReklamGun(bugunRR);
                                    if(firebaseUID){
                                      kullaniciyiGuncelle(firebaseUID,{
                                        puan:yeniPuan,
                                        gunlukReklam:{gun:bugunRR,sayi:yeniIzlenen}
                                      }).catch(console.error);
                                    }
                                    return 0;
                                  }
                                  return s-1;
                                });
                              },1000);
                            }} style={{...BTN("#f59e0b"),width:"100%",padding:"14px 0",fontSize:15,fontWeight:900}}>
                              📺 Reklam İzle → +50 Puan
                            </button>
                            <div style={{fontSize:10,color:r.muted,marginTop:8}}>
                              Bugün {kalanReklam} reklam hakkın kaldı · Toplam kazanabilirsin: +{kalanReklam*50} puan
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Aktif AI hak gösterimi */}
            {ekstraAiHak>0&&(
              <div style={{...CS,background:"linear-gradient(135deg,#7c3aed15,#6d28d908)",border:"2px solid #7c3aed44"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontWeight:800,color:"#7c3aed",fontSize:13}}>⚡ Aktif Ekstra AI Hakkı</div>
                    <div style={{fontSize:11,color:r.sub,marginTop:2}}>Günlük limitine ek olarak kullanılır</div>
                  </div>
                  <div style={{fontSize:32,fontWeight:900,color:"#7c3aed"}}>+{ekstraAiHak}</div>
                </div>
              </div>
            )}

            <div style={CS}>
              <div style={CT}>Referans Kodun</div>
              <div style={{background:d?"#0f172a":"#f0fdf4",border:"1.5px solid #86efac",borderRadius:12,padding:12,marginBottom:10}}>
                <div style={{fontSize:20,fontWeight:900,color:r.text,letterSpacing:2,marginBottom:4}}>{aktif.refKod}</div>
                <div style={{fontSize:11,color:r.sub}}>Arkadaşın bu kodla kayıt olursa ikisine de +100 puan!</div>
                <button onClick={()=>navigator.clipboard?.writeText(aktif.refKod)} style={{...BTN("#16a34a","7px 14px"),marginTop:8,fontSize:12}}>Kopyala</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div style={{background:d?"#1e293b":"#f9fafb",borderRadius:10,padding:12,textAlign:"center"}}>
                  <div style={{fontSize:24,fontWeight:900,color:"#f59e0b"}}>{aktif.davet||0}<span style={{fontSize:13,color:r.muted}}>/5</span></div>
                  <div style={{fontSize:10,color:r.sub}}>Davet Ettiğin</div>
                </div>
                <div style={{background:d?"#1e293b":"#f9fafb",borderRadius:10,padding:12,textAlign:"center"}}>
                  <div style={{fontSize:24,fontWeight:900,color:"#16a34a"}}>{Math.min(aktif.davet||0,5)*100}</div>
                  <div style={{fontSize:10,color:r.sub}}>Kazanılan Puan</div>
                </div>
              </div>
            </div>

            {/* REFERANS KODU GİR */}
            <div style={{...CS,border:girRefKilitli?"1.5px solid #16a34a":"1.5px solid "+r.brd,background:girRefKilitli?(d?"#0f2a1a":"#f0fdf4"):r.card}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <div style={{fontSize:14,fontWeight:900,color:r.text}}>🎁 Referans Kodu Gir</div>
                {girRefKilitli&&<span style={{background:"#16a34a",color:"#fff",fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:20}}>✓ Kullanıldı</span>}
              </div>
              {girRefKilitli?(
                <div style={{fontSize:12,color:r.sub,lineHeight:1.6}}>
                  <div style={{fontWeight:700,color:"#16a34a",marginBottom:2}}>Referans kodu başarıyla uygulandı!</div>
                  <div>Kullandığın kod: <b style={{color:r.text}}>{aktif.refKodKullandi}</b></div>
                  <div style={{marginTop:4,fontSize:11,color:r.muted}}>Normal kod: her iki tarafa +100 puan. Influencer/işletme kodu: sana +300 puan!</div>
                </div>
              ):(
                <>
                  <div style={{fontSize:11,color:r.sub,marginBottom:10,lineHeight:1.6}}>
                    Arkadaşının referans kodunu gir — sana <b style={{color:"#f59e0b"}}>+100 puan</b>, arkadaşına da <b style={{color:"#f59e0b"}}>+100 puan</b>! (Influencer kodunda sana <b style={{color:"#16a34a"}}>+300 puan</b>!)
                  </div>
                  <div style={{display:"flex",gap:8,marginBottom:8}}>
                    <input
                      style={{...IS,flex:1,fontWeight:800,fontSize:15,letterSpacing:2,textTransform:"uppercase"}}
                      placeholder="DOYA123"
                      value={girRefKod}
                      onChange={e=>setGirRefKod(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,""))}
                      maxLength={12}
                    />
                    <button
                      style={{...BTN(girRefKod.length>=3?"#16a34a":"#d1d5db"),padding:"0 18px",fontWeight:800}}
                      onClick={refKodUygula}
                    >Uygula</button>
                  </div>
                  {girRefMesaj&&(
                    <div style={{background:girRefMesaj.tip==="basari"?(d?"#0f2a1a":"#f0fdf4"):(d?"#2a0f0f":"#fef2f2"),border:`1px solid ${girRefMesaj.tip==="basari"?"#86efac":"#fca5a5"}`,borderRadius:10,padding:"8px 12px",fontSize:12,fontWeight:700,color:girRefMesaj.tip==="basari"?"#16a34a":"#ef4444"}}>
                      {girRefMesaj.mesaj}
                    </div>
                  )}
                </>
              )}
            </div>

            {!isOrtak&&(
              <div style={{...CS,border:"1.5px dashed #f59e0b",background:d?"#1c1a10":"#fffbeb"}}>
                <div style={{fontSize:13,fontWeight:800,color:"#d97706",marginBottom:6}}>🤝 Ortaklık Programı</div>
                <div style={{fontSize:12,color:r.sub,lineHeight:1.7,marginBottom:12}}>
                  Doya'yı çevrenle paylaş, davet ettiğin kişilerden <b>gelir kazan</b>! Influencer veya işletme olarak başvurabilirsin.
                </div>
                <div style={{display:"flex",gap:8,marginBottom:12}}>
                  {["👥 Arkadaşlarını davet et","💼 İşletmeni tanıt","📣 İçerik üret"].map((t,i)=>(
                    <div key={i} style={{flex:1,background:d?"#1e293b":"#fff8e1",borderRadius:10,padding:"8px 6px",textAlign:"center",fontSize:10,fontWeight:700,color:"#d97706"}}>{t}</div>
                  ))}
                </div>
                <button style={{...BTN("#f59e0b"),width:"100%",padding:"11px 0"}} onClick={()=>setRefBasvuruModal(true)}>Kazanmak için Başvur →</button>
              </div>
            )}

            <div style={CS}>
              <div style={CT}>Puan Kazanma Yolları</div>
              {[{l:"🌅 Günlük giriş",p:"+100"},{l:"📺 Reklam izle",p:"+50"},{l:"📋 Besin gönder (onay)",p:"+20"},{l:"👥 Arkadaş davet et (max 5)",p:"+100"},{l:"🎁 Referans kodu gir (normal)",p:"+100"},{l:"🎯 Influencer kodu gir",p:"+300"}].map(x=>(
                <div key={x.l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${r.rowB}`}}>
                  <div style={{fontSize:13,color:r.text}}>{x.l}</div>
                  <div style={{fontWeight:800,color:"#f59e0b"}}>{x.p}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ──── PARA PANELİ ─────────────────────────────────────── */}
        {tab==="para"&&isOrtak&&(
          <div style={{padding:16}}>
            {/* Ana kart */}
            <div style={{background:`linear-gradient(135deg,${aktif.refTip==="influencer"?"#7c3aed,#4f46e5":"#1d4ed8,#2563eb"})`,borderRadius:16,padding:20,color:"#fff",marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:700,opacity:.85}}>{aktif.refTip==="influencer"?"🎯 INFLUENCER":"🏢 İŞLETME"} PARA PANELİ</div>
              <div style={{fontSize:11,opacity:.7,marginBottom:12}}>{aktif.isim} · {aktif.refKod}</div>
              <div style={{fontSize:11,opacity:.8}}>Toplam Birikimli Kazanç</div>
              <div style={{fontSize:46,fontWeight:900,lineHeight:1.1,margin:"4px 0"}}>{(aktif.kazanim||0).toFixed(2)}<span style={{fontSize:16}}> ₺</span></div>
              <div style={{background:"rgba(255,255,255,.15)",borderRadius:10,padding:"10px 12px",marginTop:10}}>
                <div style={{fontSize:11,opacity:.9,marginBottom:6,fontWeight:700}}>KAZANÇ DAĞILIMI</div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:12,opacity:.85}}>📢 Reklam geliri payı</span>
                  <span style={{fontWeight:800,fontSize:13}}>%25</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:12,opacity:.85}}>💳 Premium satın alım komisyonu</span>
                  <span style={{fontWeight:800,fontSize:13}}>%25</span>
                </div>
              </div>
            </div>

            {/* Davetler */}
            <div style={CS}>
              <div style={CT}>Davetlerimin Durumu</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                {[
                  {l:"Toplam Davet",  v:aktif.davet||0,                       c:"#16a34a", suf:"kişi"},
                  {l:"Toplam Kazanç",v:(aktif.kazanim||0).toFixed(2),         c:"#f59e0b", suf:"₺"},
                  {l:"Reklam Payı",  v:((aktif.kazanim||0)*0.7).toFixed(2),  c:"#7c3aed", suf:"₺"},
                  {l:"Premium Payı", v:((aktif.kazanim||0)*0.3).toFixed(2),  c:"#2563eb", suf:"₺"},
                ].map(x=>(
                  <div key={x.l} style={{background:d?"#1e293b":"#f9fafb",borderRadius:12,padding:12,textAlign:"center"}}>
                    <div style={{fontSize:22,fontWeight:900,color:x.c}}>{x.v}</div>
                    <div style={{fontSize:9,color:r.muted,marginTop:2}}>{x.l}</div>
                    <div style={{fontSize:10,color:x.c,fontWeight:700}}>{x.suf}</div>
                  </div>
                ))}
              </div>
              <div style={{background:d?"#0f172a":"#f0fdf4",border:`1px solid #bbf7d0`,borderRadius:10,padding:12}}>
                <div style={{fontSize:11,fontWeight:700,color:"#16a34a",marginBottom:6}}>💡 Nasıl daha fazla kazan?</div>
                {[
                  "Aktif kullanıcı davet et — ayda 1.000 puan yapan her kişi = +1₺ sabit gelir",
                  "Premium kullanıcı getir — platform komisyonu sonrası net tutarın %50si sana",
                  "Sosyal medyanda referans kodunu paylaş",
                ].map((t,i)=>(
                  <div key={i} style={{fontSize:11,color:r.sub,marginBottom:4}}>• {t}</div>
                ))}
              </div>
            </div>

            {/* Referans kodu */}
            <div style={{...CS,background:d?"#0f172a":"#f0fdf4",border:"1.5px solid #86efac"}}>
              <div style={CT}>Referans Kodunu Paylaş</div>
              <div style={{fontSize:24,fontWeight:900,color:r.text,letterSpacing:3,marginBottom:6}}>{aktif.refKod}</div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>navigator.clipboard?.writeText(aktif.refKod)} style={{...BTN("#16a34a"),flex:1,padding:"10px 0",fontSize:13}}>Kodu Kopyala</button>
                <button onClick={()=>navigator.clipboard?.writeText("Doya'e benden katıl! Referans kodum: "+aktif.refKod+" — Kayıtta +100 puan ile başla! 🥗")} style={{...BTN("#3b82f6"),flex:1,padding:"10px 0",fontSize:13}}>Davet Mesajı</button>
              </div>
            </div>

            {/* IBAN */}
            <div style={CS}>
              <div style={CT}>IBAN Bilgisi</div>
              <div style={{background:d?"#0f172a":"#eff6ff",borderRadius:10,padding:10,marginBottom:12,fontSize:12,color:"#1d4ed8",lineHeight:1.6}}>
                📅 Her ayın 1'inde ödeme yapılır · Min. 50₺<br/>
                <span style={{fontSize:10,opacity:.8}}>
                  {/* Firebase: users/{uid}/private/paymentInfo belgesi olarak saklanır */}
                  Ödeme bilgileriniz şifreli olarak saklanmaktadır.
                </span>
              </div>
              {[{l:"IBAN",ph:"TR00 0000 0000 0000 0000 0000 00",k:"iban"},{l:"Hesap Sahibi",ph:"Ad Soyad",k:"ibanAd"}].map(f=>(
                <div key={f.k} style={{marginBottom:10}}>
                  <div style={{fontSize:12,color:r.sub,fontWeight:700,marginBottom:4}}>{f.l}</div>
                  <input style={{...IS}} placeholder={f.ph} value={aktif?.[f.k]||""} onChange={e=>setKullanicilar(prev=>prev.map(u=>u.uid===aktif?.uid?{...u,[f.k]:e.target.value}:u))}/>
                </div>
              ))}
              <button style={{...BTN(),width:"100%",padding:"11px 0"}} onClick={()=>{setAdminMsg("IBAN kaydedildi!");setTimeout(()=>setAdminMsg(""),2000);}}>Kaydet</button>
              {adminMsg&&<div style={{color:"#16a34a",fontWeight:700,fontSize:13,textAlign:"center",marginTop:8}}>{adminMsg}</div>}
            </div>

          </div>
        )}

        {/* ──── PROFİL ──────────────────────────────────────────── */}
        {tab==="profil"&&(
          <div style={{padding:"8px 0 16px"}}>

            {/* PROFİL KARTI */}
            <div style={{margin:"0 14px 8px",background:d?"#080e09":"#fff",border:"1px solid rgba(16,185,129,.1)",borderRadius:22,overflow:"hidden"}}>
              {/* Banner */}
              <div style={{height:72,background:"linear-gradient(135deg,rgba(16,185,129,.12),rgba(52,211,153,.06))",position:"relative"}}>
                <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 100% 150% at 70% 50%, rgba(16,185,129,.08), transparent)`}}/>
                <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(52,211,153,.2),transparent)"}}/>
              </div>
              <div style={{padding:"0 18px 18px",position:"relative"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:14}}>
                  <div style={{position:"relative",marginTop:-32}}>
                    <div onClick={()=>profFotoRef.current.click()}
                      style={{width:72,height:72,borderRadius:"50%",background:"linear-gradient(145deg,rgba(16,185,129,.2),rgba(16,185,129,.06))",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",overflow:"hidden",border:`3px solid ${d?"#080e09":"#fff"}`,boxShadow:"0 8px 24px rgba(0,0,0,.3)",flexShrink:0}}>
                      {profFoto?<img src={profFoto} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="profil"/>
                        :<span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,color:"#34d399"}}>{aktif.isim?.[0]||"D"}</span>}
                    </div>
                    <button onClick={()=>profFotoRef.current.click()}
                      style={{position:"absolute",bottom:0,right:0,width:22,height:22,borderRadius:"50%",background:"rgba(16,185,129,.15)",border:`2px solid ${d?"#080e09":"#fff"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    </button>
                  </div>
                  <div style={{display:"flex",gap:5,paddingBottom:2}}>
                    {isAdmin&&<span style={{background:"rgba(200,146,42,.1)",color:"rgba(240,193,75,.8)",fontSize:8,fontWeight:800,padding:"3px 8px",borderRadius:99,letterSpacing:1.5,textTransform:"uppercase",border:"1px solid rgba(200,146,42,.2)"}}>Admin</span>}
                    {premium&&<span style={{background:"rgba(200,146,42,.08)",color:"rgba(240,193,75,.7)",fontSize:8,fontWeight:800,padding:"3px 8px",borderRadius:99,letterSpacing:1.5,textTransform:"uppercase",border:"1px solid rgba(200,146,42,.15)"}}>Premium</span>}
                  </div>
                </div>

                {isimDuzenle?(
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:9,color:r.muted,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>İsim Düzenle</div>
                    <div style={{display:"flex",gap:8}}>
                      <input className="ob-inp" style={{flex:1,padding:"11px 14px",fontSize:14,color:d?"#e8f5ec":"#0a1f0c",boxSizing:"border-box"}}
                        value={yeniIsim} onChange={e=>setYeniIsim(e.target.value)} placeholder={aktif.isim} autoFocus maxLength={30}/>
                      <button style={{background:"linear-gradient(135deg,#10b981,#059669)",border:"none",borderRadius:12,padding:"0 14px",color:"#fff",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,cursor:"pointer"}}
                        onClick={async()=>{const t=yeniIsim.trim();if(!t||t===aktif.isim){setIsimDuzenle(false);return;}setAktif(p=>({...p,isim:t}));setKullanicilar(p=>p.map(u=>u.uid===aktif?.uid?{...u,isim:t}:u));if(firebaseUID)await kullaniciyiGuncelle(firebaseUID,{isim:t}).catch(console.error);setIsimDuzenle(false);}}>✓</button>
                      <button style={{background:"transparent",border:`1px solid ${d?"rgba(255,255,255,.07)":"rgba(0,0,0,.07)"}`,borderRadius:12,padding:"0 12px",color:r.muted,fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}} onClick={()=>setIsimDuzenle(false)}>✕</button>
                    </div>
                    <div style={{fontSize:9,color:r.muted,marginTop:5,letterSpacing:.5}}>{yeniIsim.length}/30</div>
                  </div>
                ):(
                  <div style={{marginBottom:14}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:300,color:r.text,letterSpacing:-.3}}>{aktif.isim}</div>
                      <button onClick={()=>{setYeniIsim(aktif.isim);setIsimDuzenle(true);}}
                        style={{background:d?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)",border:`1px solid ${d?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)"}`,borderRadius:8,padding:"3px 8px",fontSize:9,cursor:"pointer",color:r.muted,fontFamily:"'Nunito',sans-serif",fontWeight:700,letterSpacing:.5}}>Düzenle</button>
                    </div>
                    <div style={{fontSize:11,color:r.muted,letterSpacing:.3}}>{aktif.email}</div>
                  </div>
                )}

                <div style={{display:"flex",gap:8}}>
                  {[
                    {l:"Gönderi",v:paylasimlar.filter(p=>p.uid===aktif?.uid).length,c:"#10b981"},
                    {l:"Puan",v:puan,c:"#f0c14b"},
                    {l:"Arkadaş",v:arkadaslar.length,c:"#60a5fa"},
                  ].map(s=>(
                    <div key={s.l} style={{flex:1,textAlign:"center",background:d?`${s.c}06`:`${s.c}05`,border:`1px solid ${s.c}12`,borderRadius:12,padding:"10px 4px"}}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,color:s.c,letterSpacing:-.5}}>{s.v}</div>
                      <div style={{fontSize:8,color:r.muted,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginTop:2}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <input ref={profFotoRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const reader=new FileReader();reader.onload=ev=>{setProfFoto(ev.target.result);setKullanicilar(prev=>prev.map(u=>u.uid===aktif?.uid?{...u,foto:ev.target.result}:u));if(firebaseUID)kullaniciyiGuncelle(firebaseUID,{foto:ev.target.result}).catch(console.error);};reader.readAsDataURL(f);}}/>
            </div>

            {/* SEKME */}
            <div style={{display:"flex",background:d?"rgba(255,255,255,.03)":"rgba(0,0,0,.04)",borderRadius:14,padding:3,margin:"0 14px 8px",gap:3}}>
              {[{v:"genel",l:"Genel"},{v:"gonderiler",l:`Gönderiler (${paylasimlar.filter(p=>p.uid===aktif?.uid).length})`},{v:"performans",l:"Performans"}].map(s=>(
                <button key={s.v} onClick={()=>setProfilSekme(s.v)} style={{flex:1,padding:"9px 4px",borderRadius:11,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:10,letterSpacing:.5,background:profilSekme===s.v?(d?"rgba(16,185,129,.12)":"rgba(16,185,129,.08)"):"transparent",color:profilSekme===s.v?"#10b981":r.muted,transition:"all .15s",boxShadow:profilSekme===s.v?"0 2px 8px rgba(16,185,129,.12)":"none"}}>{s.l}</button>
              ))}
            </div>

            {/* ── GENEL SEKME ── */}
            {profilSekme==="genel"&&(
              <>
                {bmi&&bmiD&&(
                  <div style={{...CS,background:d?"#080e09":"#fff",border:`1px solid ${bmiD.renk}18`}}>
                    <div style={{fontSize:9,fontWeight:700,color:`${bmiD.renk}66`,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>İlerleme & BMI</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                      <div>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:44,fontWeight:300,color:bmiD.renk,lineHeight:1,letterSpacing:-2}}>{bmi}</div>
                        <div style={{fontSize:11,fontWeight:700,color:bmiD.renk,letterSpacing:.5,marginTop:4}}>{bmiD.etiket}</div>
                        <div style={{fontSize:10,color:r.muted,marginTop:3,lineHeight:1.5}}>{bmiD.acik}</div>
                      </div>
                      {tdee&&<div style={{textAlign:"right"}}>
                        <div style={{fontSize:9,color:r.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>TDEE</div>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:300,color:"#a78bfa",letterSpacing:-1}}>{tdee}</div>
                        <div style={{fontSize:9,color:r.muted,marginTop:2}}>kcal/gün</div>
                      </div>}
                    </div>
                    {tdee&&<div style={{borderTop:`1px solid ${d?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)"}`,paddingTop:12}}>
                      <div style={{display:"flex",gap:8}}>
                        {[{l:"Sürdür",v:tdee,c:"#10b981"},{l:"Kilo Ver",v:tdee-500,c:"#60a5fa"},{l:"Kilo Al",v:tdee+300,c:"#fbbf24"}].map(x=>(
                          <div key={x.l} style={{flex:1,textAlign:"center",background:d?`${x.c}07`:`${x.c}06`,border:`1px solid ${x.c}12`,borderRadius:12,padding:"10px 4px"}}>
                            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:300,color:x.c,letterSpacing:-.5}}>{x.v}</div>
                            <div style={{fontSize:8,color:r.muted,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginTop:3}}>{x.l}</div>
                          </div>
                        ))}
                      </div>
                    </div>}
                  </div>
                )}

                {/* ─── KİLO TAKİP GRAFİĞİ ─────────────────── */}
                <div style={CS}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <div style={{fontSize:9,fontWeight:700,color:"rgba(16,185,129,.5)",letterSpacing:3,textTransform:"uppercase"}}>Kilo Takibi</div>
                    <button onClick={()=>{setKiloGirModal(true);setKiloInput(profil.kilo||"");setKiloNot("");}} style={{...BTN("transparent","4px 10px"),color:r.sub,fontSize:11,border:`1px solid ${r.brd}`}}>+ Kaydet</button>
                  </div>
                  {kiloKayitlar.length===0?(
                    <div style={{textAlign:"center",padding:"16px 0",color:r.muted,fontSize:12}}>
                      <div style={{fontSize:28,marginBottom:6}}>⚖️</div>
                      Henüz kilo kaydı yok.<br/>Düzenli kayıt yaparak ilerlemeyi gör!
                    </div>
                  ):(()=>{
                    const son30=kiloKayitlar.slice(-30);
                    const minK=Math.min(...son30.map(k=>+k.kilo))-2;
                    const maxK=Math.max(...son30.map(k=>+k.kilo))+2;
                    const hedefK=+profil.hedef||null;
                    const w=320, h=120, padL=30, padB=20;
                    const xStep=(w-padL)/(Math.max(son30.length-1,1));
                    const yScale=(h-padB)/(maxK-minK||1);
                    const pts=son30.map((k,i)=>({
                      x:padL+i*xStep,
                      y:h-padB-(+k.kilo-minK)*yScale,
                      kilo:k.kilo, tarih:k.tarih
                    }));
                    const pathD=pts.map((p,i)=>i===0?`M${p.x},${p.y}`:`L${p.x},${p.y}`).join(" ");
                    const areaD=`${pathD} L${pts[pts.length-1].x},${h-padB} L${padL},${h-padB} Z`;
                    const baslangic=+son30[0].kilo, guncel=+son30[son30.length-1].kilo;
                    const fark=guncel-baslangic;
                    return(
                    <div>
                      <div style={{display:"flex",gap:12,marginBottom:8}}>
                        <div style={{flex:1,textAlign:"center",background:d?"#0f172a":"#f0fdf4",borderRadius:10,padding:"8px"}}>
                          <div style={{fontSize:10,color:r.muted}}>Güncel</div>
                          <div style={{fontSize:16,fontWeight:900,color:r.text}}>{guncel} kg</div>
                        </div>
                        {hedefK&&<div style={{flex:1,textAlign:"center",background:d?"#0f172a":"#eff6ff",borderRadius:10,padding:"8px"}}>
                          <div style={{fontSize:10,color:r.muted}}>Hedef</div>
                          <div style={{fontSize:16,fontWeight:900,color:"#2563eb"}}>{hedefK} kg</div>
                        </div>}
                        <div style={{flex:1,textAlign:"center",background:d?"#0f172a":"#fef9c3",borderRadius:10,padding:"8px"}}>
                          <div style={{fontSize:10,color:r.muted}}>Değişim</div>
                          <div style={{fontSize:16,fontWeight:900,color:fark<0?"#16a34a":fark>0?"#ef4444":"#f59e0b"}}>{fark>0?"+":""}{fark.toFixed(1)} kg</div>
                        </div>
                      </div>
                      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{overflow:"visible"}}>
                        {/* Arka plan çizgileri */}
                        {[0,1,2,3].map(i=>{
                          const y2=padB/2+i*((h-padB)/3);
                          return <line key={i} x1={padL} y1={y2} x2={w} y2={y2} stroke={d?"#334155":"#e5e7eb"} strokeWidth="1" strokeDasharray="3,3"/>;
                        })}
                        {/* Alan */}
                        <path d={areaD} fill="url(#kiloGrad)" opacity=".3"/>
                        <defs>
                          <linearGradient id="kiloGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#16a34a"/>
                            <stop offset="100%" stopColor="#16a34a" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        {/* Çizgi */}
                        <path d={pathD} fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
                        {/* Hedef çizgisi */}
                        {hedefK&&hedefK>=minK&&hedefK<=maxK&&(
                          <line x1={padL} y1={h-padB-(hedefK-minK)*yScale} x2={w} y2={h-padB-(hedefK-minK)*yScale} stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,3"/>
                        )}
                        {/* Noktalar */}
                        {pts.map((p,i)=>(
                          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#16a34a" stroke="#fff" strokeWidth="2"/>
                        ))}
                        {/* Son değer label */}
                        <text x={pts[pts.length-1].x} y={pts[pts.length-1].y-10} textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="700">{guncel}kg</text>
                        {/* Y ekseni */}
                        <text x={padL-4} y={padB/2} textAnchor="end" fontSize="8" fill={d?"#94a3b8":"#9ca3af"}>{maxK}kg</text>
                        <text x={padL-4} y={h-padB+4} textAnchor="end" fontSize="8" fill={d?"#94a3b8":"#9ca3af"}>{minK}kg</text>
                      </svg>
                      {hedefK&&<div style={{fontSize:11,color:r.sub,marginTop:4,textAlign:"center"}}>
                        {guncel<=hedefK?"🎉 Hedefe ulaştın!":`Hedefe ${Math.abs(guncel-hedefK).toFixed(1)} kg kaldı`}
                      </div>}
                    </div>
                    );
                  })()}
                </div>

                <div style={CS}>
                  <div style={CT}>Vücut Bilgileri</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
                    {[{l:"Kilo (kg)",k:"kilo"},{l:"Boy (cm)",k:"boy"},{l:"Yaş",k:"yas"},{l:"Hedef Kilo",k:"hedef"}].map(f=>(
                      <div key={f.k}><div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:3}}>{f.l}</div>
                      <input style={{...IS,padding:"9px 11px",fontSize:13}} type="number" value={profil[f.k]} onChange={e=>setProfil(p=>({...p,[f.k]:e.target.value}))}/></div>
                    ))}
                  </div>
                  <div style={{marginBottom:10}}>
                    <div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:4}}>Cinsiyet</div>
                    <div style={{display:"flex",gap:8}}>
                      {["erkek","kadin"].map(c=><button key={c} onClick={()=>setProfil(p=>({...p,cinsiyet:c}))} style={{flex:1,padding:"9px",border:`2px solid ${profil.cinsiyet===c?"#16a34a":r.inpB}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,background:profil.cinsiyet===c?d?"#0f2a1a":"#f0fdf4":r.inp,color:profil.cinsiyet===c?"#16a34a":r.sub}}>{c==="erkek"?"Erkek":"Kadın"}</button>)}
                    </div>
                  </div>
                  <div style={{marginBottom:14}}>
                    <div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:4}}>Aktivite Seviyesi</div>
                    {Object.entries(AKTIVITE_ETIKET).map(([k,v])=>(
                      <button key={k} onClick={()=>setProfil(p=>({...p,aktivite:k}))} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 12px",marginBottom:4,border:`2px solid ${profil.aktivite===k?"#16a34a":r.inpB}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:profil.aktivite===k?700:500,fontSize:12,background:profil.aktivite===k?d?"#0f2a1a":"#f0fdf4":r.inp,color:profil.aktivite===k?"#16a34a":r.text}}>{v}</button>
                    ))}
                  </div>
                  <button style={{...BTN(),width:"100%",padding:"12px 0"}} onClick={async()=>{
                    if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{
                      kilo:profil.kilo, boy:profil.boy, yas:profil.yas,
                      cinsiyet:profil.cinsiyet, aktivite:profil.aktivite, hedef:profil.hedef,
                      alerji:alerjiListesi
                    }).catch(console.error);
                    setTab("anasayfa");
                  }}>Kaydet</button>
                </div>

                {/* ─── ALERJİ YÖNETİMİ ───────────────────── */}
                <div style={CS}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <div style={CT}>🚨 Alerji & Diyet Kısıtları</div>
                    <button onClick={()=>setAlerjiModal(true)} style={{...BTN("transparent","4px 10px"),color:"#ef4444",fontSize:11,border:"1px solid #fca5a5"}}>Düzenle</button>
                  </div>
                  {alerjiListesi.length===0?(
                    <div style={{fontSize:12,color:r.muted,textAlign:"center",padding:"10px 0"}}>
                      Henüz alerji eklenmedi.<br/>
                      <button onClick={()=>setAlerjiModal(true)} style={{...BTN("#ef4444","6px 14px"),fontSize:11,marginTop:8}}>+ Alerji Ekle</button>
                    </div>
                  ):(
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {alerjiListesi.map(a=>(
                        <span key={a} style={{background:"#fef2f2",color:"#dc2626",border:"1px solid #fca5a5",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700}}>
                          ⚠️ {a.charAt(0).toUpperCase()+a.slice(1)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div style={CS}>
                  <div style={CT}>Gizlilik & Sosyal</div>
                  <div style={{marginBottom:10}}>
                    <div style={{fontSize:12,fontWeight:700,color:r.text,marginBottom:6}}>Sosyal Özellikler</div>
                    <div style={{display:"flex",gap:8}}>
                      {[{v:true,l:"Aktif"},{v:false,l:"Kapalı"}].map(o=><button key={String(o.v)} onClick={()=>{setSosyalAktif(o.v);setKullanicilar(p=>p.map(u=>u.uid===aktif?.uid?{...u,sosyal:o.v}:u));}} style={{flex:1,padding:"9px",border:`2px solid ${sosyalAktif===o.v?"#16a34a":r.inpB}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,background:sosyalAktif===o.v?d?"#0f2a1a":"#f0fdf4":r.inp,color:sosyalAktif===o.v?"#16a34a":r.sub}}>{o.l}</button>)}
                    </div>
                  </div>
                  {sosyalAktif&&<div>
                    <div style={{fontSize:12,fontWeight:700,color:r.text,marginBottom:6}}>Hesap Türü</div>
                    <div style={{display:"flex",gap:8}}>
                      {[{v:true,l:"🔓 Açık"},{v:false,l:"🔒 Gizli"}].map(o=><button key={String(o.v)} onClick={()=>{setAcikHesap(o.v);setKullanicilar(p=>p.map(u=>u.uid===aktif?.uid?{...u,acik:o.v}:u));}} style={{flex:1,padding:"9px",border:`2px solid ${acikHesap===o.v?"#16a34a":r.inpB}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,background:acikHesap===o.v?d?"#0f2a1a":"#f0fdf4":r.inp,color:acikHesap===o.v?"#16a34a":r.sub}}>{o.l}</button>)}
                    </div>
                  </div>}
                </div>

                <div style={CS}>
                  <div style={CT}>İletişim & Destek</div>
                  <a href={"mailto:"+DESTEK_MAIL} style={{display:"block",padding:"10px 14px",background:d?"#0f172a":"#f0fdf4",borderRadius:10,color:"#16a34a",fontWeight:700,fontSize:13,textDecoration:"none",marginBottom:8}}>✉️ Destek: {DESTEK_MAIL}</a>
                  <a href={"mailto:"+ORTAKLIK_MAIL} style={{display:"block",padding:"10px 14px",background:d?"#0f172a":"#eff6ff",borderRadius:10,color:"#2563eb",fontWeight:700,fontSize:13,textDecoration:"none"}}>🤝 Ortaklık: {ORTAKLIK_MAIL}</a>
                </div>
              </>
            )}

            {/* ── GÖNDERİLER SEKME ── */}
            {profilSekme==="gonderiler"&&(()=>{
              const benimGonderiler=paylasimlar.filter(ps=>ps.uid===aktif?.uid);
              if(benimGonderiler.length===0) return(
                <div style={{...CS,textAlign:"center",padding:"32px 16px"}}>
                  <div style={{fontSize:44,marginBottom:10}}>📭</div>
                  <div style={{fontSize:15,fontWeight:800,color:r.text,marginBottom:6}}>Henüz gönderin yok</div>
                  <div style={{fontSize:12,color:r.muted,marginBottom:16}}>Sosyal akıştan bir şeyler paylaşınca burada görünür.</div>
                  <button onClick={()=>setTab("sosyal")} style={{...BTN(),padding:"10px 24px",fontSize:13}}>📢 Paylaşım Yap</button>
                </div>
              );

              // Fotoğraflı gönderiler grid
              const fotoluGonderiler=benimGonderiler.filter(ps=>ps.postFoto);
              const metinGonderiler=benimGonderiler.filter(ps=>!ps.postFoto);

              return(
                <div>
                  {/* Fotoğraf grid */}
                  {fotoluGonderiler.length>0&&(
                    <div style={CS}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                        <div style={{fontSize:13,fontWeight:900,color:r.text}}>📷 Fotoğraflı Gönderiler</div>
                        <div style={{fontSize:11,color:r.muted}}>{fotoluGonderiler.length} adet</div>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4}}>
                        {fotoluGonderiler.map(ps=>(
                          <div key={ps.id} style={{position:"relative",aspectRatio:"1",borderRadius:10,overflow:"hidden"}}>
                            <img src={ps.postFoto} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} alt=""/>
                            <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 50%,rgba(0,0,0,.7))",opacity:0,transition:"opacity .2s"}}/>
                            {/* Beğeni sayısı */}
                            <div style={{position:"absolute",bottom:4,left:5,fontSize:9,color:"#fff",fontWeight:700,textShadow:"0 1px 3px #000"}}>❤️ {ps.begeniler?.length||0}</div>
                            <button onClick={async()=>{
                              if(!window.confirm("Bu gönderiyi silmek istiyor musun?"))return;
                              await postSil(ps.id).catch(console.error);
                            }} style={{position:"absolute",top:4,right:4,background:"rgba(0,0,0,.55)",border:"none",borderRadius:"50%",width:22,height:22,color:"#fff",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>×</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metin gönderileri liste */}
                  {metinGonderiler.length>0&&(
                    <div style={CS}>
                      <div style={{fontSize:13,fontWeight:900,color:r.text,marginBottom:10}}>💬 Metin Gönderileri</div>
                      {metinGonderiler.map(ps=>(
                        <div key={ps.id} style={{padding:"12px 0",borderBottom:`1px solid ${r.rowB}`}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                            <div style={{fontSize:12,color:r.muted}}>{ps.zaman}</div>
                            <button onClick={async()=>{
                              if(!window.confirm("Bu gönderiyi silmek istiyor musun?"))return;
                              await postSil(ps.id).catch(console.error);
                            }} style={{background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:14,fontWeight:700}}>🗑</button>
                          </div>
                          <div style={{fontSize:13,color:r.text,lineHeight:1.5,marginBottom:6}}>{ps.icerik}</div>
                          {ps.yemekler?.length>0&&(
                            <div style={{background:d?"#0f172a":"#f0fdf4",borderRadius:8,padding:"6px 10px",marginBottom:6}}>
                              {ps.yemekler.map((y,i)=><div key={i} style={{fontSize:11,color:r.sub}}>🍽 {y.ad} — {y.kal} kcal</div>)}
                            </div>
                          )}
                          <div style={{display:"flex",gap:10,fontSize:11,color:r.muted}}>
                            <span>❤️ {ps.begeniler?.length||0}</span>
                            <span>💬 {ps.yorumlar?.length||0}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}


        {/* ──── PERFORMANS PANELİ (profil sekmesi) ──────────────── */}
        {tab==="profil"&&profilSekme==="performans"&&(()=>{
          try {
            const bugun = new Date();
            const gunler = [];
            let etiket = "";
            if(perfDonem==="hafta"){
              const fark = (bugun.getDay()===0?6:bugun.getDay()-1);
              for(let i=0;i<7;i++){const d=new Date(bugun);d.setDate(bugun.getDate()-fark+i);gunler.push(tarihKey(d));}
              etiket="Bu Hafta";
            } else if(perfDonem==="ay"){
              const yil=bugun.getFullYear(),ay=bugun.getMonth();
              const gunSayisi=new Date(yil,ay+1,0).getDate();
              for(let i=1;i<=gunSayisi;i++)gunler.push(tarihKey(new Date(yil,ay,i)));
              etiket=AYLAR[ay]+" "+yil;
            } else {
              const yil=bugun.getFullYear();
              for(let ay=0;ay<12;ay++){const gs=new Date(yil,ay+1,0).getDate();for(let i=1;i<=gs;i++)gunler.push(tarihKey(new Date(yil,ay,i)));}
              etiket=yil+" Yılı";
            }

            let topKal=0,topPro=0,topKarb=0,topYag=0,topSu=0,topAdim=0,aktifGun=0,topLif=0;
            gunler.forEach(k=>{
              const v=gunV(k);
              const yemekler=v.yemekler||[];
              const gKal=yemekler.reduce((s,y)=>s+(+y.kal||0),0);
              topKal+=gKal;
              topPro+=yemekler.reduce((s,y)=>s+(+y.pro||0),0);
              topKarb+=yemekler.reduce((s,y)=>s+(+y.karb||0),0);
              topYag+=yemekler.reduce((s,y)=>s+(+y.yag||0),0);
              topLif+=yemekler.reduce((s,y)=>s+(+y.lif||0),0);
              if(gKal>0)aktifGun++;
              topSu+=(+v.su||0);
              topAdim+=(+v.adim||0);
            });

            const aktifSayi=Math.max(aktifGun,1);
            const ortaKal=Math.round(topKal/aktifSayi);
            const ortaPro=Math.round(topPro/aktifSayi);
            const ortaSu=Math.round(topSu/aktifSayi);
            const ortaAdim=Math.round(topAdim/aktifSayi);
            const hedefPro=Math.round((+profil.kilo||70)*1.6);
            const hedefKal=2000;
            const suHedAylik=suHed||2000;

            const statRenk=(y)=>y>=80?"#16a34a":y>=50?"#f59e0b":"#ef4444";
            const pbar=(y,renk)=>(
              <div style={{background:d?"#1e293b":"#f1f5f9",borderRadius:8,height:10,overflow:"hidden",marginTop:4}}>
                <div style={{height:"100%",width:Math.min(100,y||0)+"%",background:renk,borderRadius:8,transition:"width 0.8s ease-out"}}/>
              </div>
            );
            const StatRow=({label,deger,yuzde})=>{
              const renk=statRenk(yuzde||0);
              return(
                <div style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                    <div style={{fontSize:12,fontWeight:700,color:r.text}}>{label}</div>
                    <div style={{fontSize:12,fontWeight:800,color:renk}}>{deger}</div>
                  </div>
                  {pbar(yuzde,renk)}
                  <div style={{fontSize:9,color:r.muted,textAlign:"right",marginTop:2}}>{Math.min(100,yuzde||0)}%</div>
                </div>
              );
            };

            const besinSayac={};
            gunler.forEach(k=>{(gunV(k).yemekler||[]).forEach(y=>{if(y.ad)besinSayac[y.ad]=(besinSayac[y.ad]||0)+1;});});
            const topBesinler=Object.entries(besinSayac).sort((a,b)=>b[1]-a[1]).slice(0,5);

            const fark=bugun.getDay()===0?6:bugun.getDay()-1;

            return(
              <div ref={perfPanelRef} style={{paddingBottom:20}}>
                {/* Dönem seçici */}
                <div style={{display:"flex",background:d?"#1e293b":"#f1f5f9",borderRadius:12,padding:4,margin:"0 16px 12px",gap:4}}>
                  {[{v:"hafta",l:"📅 Hafta"},{v:"ay",l:"📆 Ay"},{v:"yil",l:"🗓 Yıl"}].map(s=>(
                    <button key={s.v} onClick={()=>setPerfDonem(s.v)} style={{flex:1,padding:"8px 0",borderRadius:10,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12,background:perfDonem===s.v?"#16a34a":"transparent",color:perfDonem===s.v?"#fff":r.sub,transition:"all .2s"}}>{s.l}</button>
                  ))}
                </div>

                {/* Başlık kartı */}
                <div style={{margin:"0 16px 12px",background:"linear-gradient(135deg,#16a34a,#15803d)",borderRadius:16,padding:"16px 18px",color:"#fff"}}>
                  <div style={{fontSize:11,fontWeight:700,opacity:.85}}>DÖNEM ÖZETİ</div>
                  <div style={{fontSize:20,fontWeight:900,marginTop:2}}>{etiket}</div>
                  <div style={{display:"flex",gap:10,marginTop:10,flexWrap:"wrap"}}>
                    {[{l:"Aktif Gün",v:aktifGun},{l:"Toplam Kalori",v:Math.round(topKal).toLocaleString()+" kcal"},{l:"Toplam Adım",v:Math.round(topAdim).toLocaleString()}].map(s=>(
                      <div key={s.l} style={{background:"rgba(255,255,255,.18)",borderRadius:10,padding:"8px 12px",flex:1,minWidth:90}}>
                        <div style={{fontSize:16,fontWeight:900}}>{s.v}</div>
                        <div style={{fontSize:9,opacity:.85}}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress barlar — inline, hook yok */}
                <div style={{...CS,margin:"0 16px 10px"}}>
                  <div style={{fontSize:13,fontWeight:900,color:r.text,marginBottom:14}}>📈 Günlük Ortalamalar</div>
                  <StatRow label={"🔥 Kalori — "+ortaKal+" kcal/gün"} deger={ortaKal+" / "+hedefKal+" kcal"} yuzde={Math.min(100,Math.round((ortaKal/hedefKal)*100))}/>
                  <StatRow label={"💪 Protein — "+ortaPro+"g/gün"} deger={ortaPro+" / "+hedefPro+"g"} yuzde={Math.min(100,Math.round((ortaPro/hedefPro)*100))}/>
                  <StatRow label={"💧 Su — "+ortaSu+"ml/gün"} deger={ortaSu+" / "+suHedAylik+"ml"} yuzde={Math.min(100,Math.round((ortaSu/suHedAylik)*100))}/>
                  <StatRow label={"👟 Adım — "+ortaAdim.toLocaleString()+"/gün"} deger={ortaAdim.toLocaleString()+" / 10.000"} yuzde={Math.min(100,Math.round((ortaAdim/10000)*100))}/>
                </div>

                {/* Makro dağılımı */}
                <div style={{...CS,margin:"0 16px 10px"}}>
                  <div style={{fontSize:13,fontWeight:900,color:r.text,marginBottom:10}}>🥗 Makro Dağılımı (Toplam)</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                    {[
                      {l:"Protein",v:Math.round(topPro)+"g",renk:"#16a34a"},
                      {l:"Karbonhidrat",v:Math.round(topKarb)+"g",renk:"#f59e0b"},
                      {l:"Yağ",v:Math.round(topYag)+"g",renk:"#ef4444"},
                      {l:"Lif",v:Math.round(topLif)+"g",renk:"#8b5cf6"},
                      {l:"Su Toplam",v:(Math.round(topSu/100)/10)+"L",renk:"#2563eb"},
                      {l:"Adım Toplam",v:(Math.round(topAdim/100)/10)+"K",renk:"#f97316"},
                    ].map(s=>(
                      <div key={s.l} style={{background:d?"#1e293b":"#f9fafb",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
                        <div style={{fontSize:18,fontWeight:900,color:s.renk}}>{s.v}</div>
                        <div style={{fontSize:9,color:r.sub,marginTop:2}}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* En çok yenenler */}
                {topBesinler.length>0&&(
                  <div style={{...CS,margin:"0 16px 10px"}}>
                    <div style={{fontSize:13,fontWeight:900,color:r.text,marginBottom:10}}>🏆 En Çok Yediklerin</div>
                    {topBesinler.map(([ad,sayi],i)=>(
                      <div key={ad} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${r.rowB}`}}>
                        <div style={{fontSize:15,fontWeight:900,color:["#f59e0b","#9ca3af","#cd7c3a","#16a34a","#6b7280"][i],width:22,textAlign:"center"}}>{i+1}</div>
                        <div style={{flex:1,fontSize:12,fontWeight:700,color:r.text}}>{ad}</div>
                        <div style={{fontSize:11,color:r.sub,background:d?"#1e293b":"#f1f5f9",padding:"3px 10px",borderRadius:20}}>{sayi}x</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Haftalık çizelge */}
                {perfDonem==="hafta"&&(
                  <div style={{...CS,margin:"0 16px 10px"}}>
                    <div style={{fontSize:13,fontWeight:900,color:r.text,marginBottom:10}}>📅 Günlük Kalorim</div>
                    {gunler.map((k,i)=>{
                      const gKal=(gunV(k).yemekler||[]).reduce((s,y)=>s+(+y.kal||0),0);
                      const yp=Math.min(100,Math.round((gKal/hedefKal)*100));
                      return(
                        <div key={k} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0"}}>
                          <div style={{fontSize:10,color:r.sub,width:28,flexShrink:0}}>{GUNLER[i]}</div>
                          <div style={{flex:1,background:d?"#1e293b":"#f1f5f9",borderRadius:6,height:8,overflow:"hidden"}}>
                            <div style={{height:"100%",width:yp+"%",background:yp>=80?"#16a34a":yp>=50?"#f59e0b":"#ef4444",borderRadius:6,transition:"width 0.6s ease-out"}}/>
                          </div>
                          <div style={{fontSize:10,fontWeight:700,color:r.text,width:65,textAlign:"right",flexShrink:0}}>{gKal>0?gKal+" kcal":"—"}</div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Veri yok mesajı */}
                {aktifGun===0&&(
                  <div style={{...CS,margin:"0 16px 10px",textAlign:"center",padding:"32px 16px"}}>
                    <div style={{fontSize:36,marginBottom:8}}>📊</div>
                    <div style={{fontSize:14,fontWeight:800,color:r.text,marginBottom:6}}>Henüz veri yok</div>
                    <div style={{fontSize:12,color:r.sub}}>Yemek kaydettikçe burada dönem özetini göreceksin!</div>
                  </div>
                )}
              </div>
            );
          } catch(e) {
            return(
              <div style={{padding:32,textAlign:"center"}}>
                <div style={{fontSize:32,marginBottom:8}}>⚠️</div>
                <div style={{fontSize:14,fontWeight:800,color:r.text||"#111",marginBottom:6}}>Bir hata oluştu</div>
                <div style={{fontSize:12,color:"#64748b"}}>{String(e.message||e)}</div>
              </div>
            );
          }
        })()}

        {/* ──── ADMİN ───────────────────────────────────────────── */}
        {tab==="admin"&&isAdmin&&(
          <div style={{padding:16}}>
            <div style={{background:"linear-gradient(135deg,#f59e0b,#d97706)",borderRadius:16,padding:16,color:"#fff",marginBottom:10}}>
              <div style={{fontSize:12,fontWeight:700}}>ADMİN PANELİ</div>
              <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
                {[{n:bekBesin.length,l:"Besin"},{n:refBasvurular.filter(b=>b.onay==="bekliyor").length,l:"Başvuru"},{n:sikayetler.filter(s=>!s.islem).length,l:"Şikayet"},{n:kullanicilar.length,l:"Kullanıcı"}].map(s=>(
                  <div key={s.l} style={{background:"rgba(255,255,255,.2)",borderRadius:10,padding:"7px 12px",flex:1,minWidth:55}}>
                    <div style={{fontSize:18,fontWeight:900}}>{s.n}</div>
                    <div style={{fontSize:9,opacity:.85}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{...CS,border:"2px solid #2563eb"}}>
              <div style={CT}>UID ile Ortak Ata / Kaldır</div>
              <div style={{fontSize:11,color:r.sub,marginBottom:6}}>Kullanıcı UID'si veya NTR kodunu gir:</div>
              <input style={{...IS,marginBottom:8}} placeholder="NTR-000000" value={adminUid} onChange={e=>setAdminUid(e.target.value)}/>

              <div style={{display:"flex",gap:8,marginBottom:10}}>
                {[{v:"influencer",l:"🎯 Influencer"},{v:"isletme",l:"🏢 İşletme"}].map(o=>(
                  <button key={o.v} onClick={()=>setAdminTip(o.v)} style={{flex:1,padding:"8px",border:`2px solid ${adminTip===o.v?"#2563eb":r.inpB}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12,background:adminTip===o.v?"#eff6ff":r.inp,color:adminTip===o.v?"#2563eb":r.sub}}>{o.l}</button>
                ))}
              </div>

              {/* İşletme ismi (işletme tipinde) */}
              {adminTip==="isletme"&&(
                <div style={{marginBottom:8}}>
                  <div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:3}}>İşletme Adı <span style={{color:"#6b7280"}}>(opsiyonel)</span></div>
                  <input style={{...IS}} placeholder="FitLife Spor Salonu — Kadıköy" value={adminIsletmeIsmi} onChange={e=>setAdminIsletmeIsmi(e.target.value)}/>
                </div>
              )}

              {/* Özel Ref Kodu */}
              <div style={{marginBottom:10}}>
                <div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:3}}>Özel Ref Kodu <span style={{color:"#6b7280"}}>(opsiyonel — boş bırakılırsa otomatik)</span></div>
                <input style={{...IS}} placeholder="FITLIFE25 veya ZEYNEP10..." value={adminOzelRefKod} onChange={e=>setAdminOzelRefKod(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,""))} maxLength={12}/>
                {adminOzelRefKod&&<div style={{fontSize:10,color:"#2563eb",marginTop:3,fontWeight:700}}>Kod: {adminOzelRefKod}</div>}
              </div>

              {adminMsg&&<div style={{background:r.card,color:"#16a34a",padding:"8px 11px",borderRadius:10,fontSize:12,fontWeight:700,marginBottom:8}}>{adminMsg}</div>}
              <div style={{display:"flex",gap:8}}>
                <button style={{...BTN("#2563eb"),flex:2,padding:"10px 0"}} onClick={()=>adminOrtak(adminUid,adminTip,adminOzelRefKod,adminIsletmeIsmi)}>Ata</button>
                <button style={{...BTN("#ef4444"),flex:1,padding:"10px 0"}} onClick={()=>adminOrtakKaldir(adminUid)}>Kaldır</button>
              </div>
            </div>

            <div style={CS}>
              <div style={CT}>Kullanıcı Yönetimi & Ban</div>
              {kullanicilar.filter(u=>!u.admin).map(u=>(
                <div key={u.uid} style={{padding:"10px 0",borderBottom:`1px solid ${r.rowB}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:r.text}}>{u.isim}</div>
                      <div style={{fontSize:10,color:r.muted}}>{u.uid}{u.refTip&&<span style={{color:"#2563eb",fontWeight:700}}> · {u.refTip}</span>}</div>
                      <div style={{display:"flex",gap:4,marginTop:3,flexWrap:"wrap"}}>
                        {u.banli&&<span style={BAD("#ef4444")}>🚫 BANLI</span>}
                        {u.sosyalKisitli&&<span style={BAD("#7c3aed")}>🔇 SOSYAL KISITLI</span>}
                        {u.premium&&<span style={BAD("#f59e0b")}>⭐ Premium</span>}
                      </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
                      {u.banli
                        ?<button onClick={()=>banKaldir(u.uid)} style={{...BTN("#16a34a","4px 9px"),fontSize:10}}>Banı Kaldır</button>
                        :<button onClick={()=>banla(u.uid)} style={{...BTN("#ef4444","4px 9px"),fontSize:10}}>🚫 Banla</button>
                      }
                      {u.sosyalKisitli
                        ?<button onClick={()=>sosyalKisitKaldir(u.uid)} style={{...BTN("#16a34a","4px 9px"),fontSize:10}}>Kısıtı Kaldır</button>
                        :<button onClick={()=>sosyalKisitla(u.uid)} style={{...BTN("#7c3aed","4px 9px"),fontSize:10}}>🔇 Sosyal Kısıtla</button>
                      }
                    </div>
                  </div>
                </div>
              ))}
              {banMsg&&<div style={{color:"#ef4444",fontWeight:700,fontSize:12,marginTop:6}}>{banMsg}</div>}
            </div>

            {/* ORTAK KAZANÇ YÖNETİMİ */}
            {kullanicilar.filter(u=>u.refOnay&&!u.admin).length>0&&(
              <div style={CS}>
                <div style={CT}>💰 Ortak Ödemeleri</div>
                <div style={{background:d?"#0f2a1a":"#f0fdf4",border:"1px solid #86efac",borderRadius:10,padding:"9px 12px",marginBottom:10,fontSize:11,color:"#16a34a"}}>
                  ✅ Ödemeyi yaptıktan sonra ilgili ortağın kazancını sıfırla.
                </div>
                {kullanicilar.filter(u=>u.refOnay&&!u.admin).map(u=>(
                  <div key={u.uid} style={{padding:"10px 0",borderBottom:`1px solid ${r.rowB}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:r.text}}>{u.isim}</div>
                        <div style={{fontSize:10,color:r.muted}}>{u.uid} · {u.refTip==="influencer"?"🎯 Influencer":"🏢 İşletme"}</div>
                        {u.iban&&<div style={{fontSize:10,color:"#2563eb",fontWeight:700,marginTop:2}}>IBAN: {u.iban}</div>}
                        {u.ibanAd&&<div style={{fontSize:10,color:r.muted}}>Hesap: {u.ibanAd}</div>}
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:20,fontWeight:900,color:"#f59e0b"}}>{(u.kazanim||0).toFixed(2)}₺</div>
                        <button
                          style={{...BTN((u.kazanim||0)>=50?"#16a34a":"#d1d5db","5px 10px"),fontSize:10,marginTop:4}}
                          onClick={async()=>{
                            if((u.kazanim||0)<50){alert("Minimum ödeme tutarı 50₺ — henüz yeterli bakiye yok.");return;}
                            if(!window.confirm(`${u.isim} için ${(u.kazanim||0).toFixed(2)}₺ ödendi ve sıfırlanacak. Onaylıyor musunuz?`))return;
                            if(u.firebaseUID) await kullaniciyiGuncelle(u.firebaseUID,{kazanim:0}).catch(console.error);
                            setKullanicilar(p=>p.map(x=>x.uid===u.uid?{...x,kazanim:0}:x));
                          }}
                        >
                          {(u.kazanim||0)>=50?"✓ Ödendi & Sıfırla":"Min. 50₺ değil"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sikayetler.filter(s=>!s.islem).length>0&&(
              <div style={CS}>
                <div style={CT}>Şikayetler ({sikayetler.filter(s=>!s.islem).length})</div>
                {sikayetler.map(s=>(
                  <div key={s.id} style={{padding:"10px 0",borderBottom:`1px solid ${r.rowB}`}}>
                    <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                      {s.postFotoUrl&&(
                        <img src={s.postFotoUrl} style={{width:52,height:52,objectFit:"cover",borderRadius:8,flexShrink:0}} alt=""/>
                      )}
                      <div style={{flex:1}}>
                        <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap",marginBottom:4}}>
                          <span style={BAD(s.tip==="foto"?"#f59e0b":s.tip==="yorum"?"#3b82f6":"#6b7280")}>
                            {s.tip==="foto"?"📷 Fotoğraf":s.tip==="yorum"?"💬 Yorum":"👤 Kullanıcı"}
                          </span>
                          <span style={{fontWeight:700,color:r.text,fontSize:12}}>{kullanicilar.find(u=>u.uid===s.hedef)?.isim||s.hedef}</span>
                          <span style={{fontSize:10,color:r.muted}}>· Bildiren: {kullanicilar.find(u=>u.uid===s.eden)?.isim||s.eden}</span>
                        </div>
                        <div style={{background:d?"#0f172a":"#f9fafb",borderRadius:8,padding:"6px 10px",marginBottom:5}}>
                          <div style={{fontSize:11,fontWeight:700,color:"#ef4444",marginBottom:2}}>📋 Sebep: {s.sebep||"Belirtilmemiş"}</div>
                          {s.icerik&&<div style={{fontSize:11,color:r.muted,fontStyle:"italic"}}>"{s.icerik}"</div>}
                        </div>
                        <div style={{fontSize:10,color:r.muted}}>{s.zaman}</div>
                        {s.tip==="foto"&&s.postId&&!s.islem&&(
                          <button style={{...BTN("#f59e0b","4px 8px"),fontSize:10,marginTop:4}} onClick={()=>{
                            setPaylasimlar(prev=>prev.map(p=>p.id===s.postId?{...p,postFoto:null}:p));
                            postGuncelle(s.postId,{postFoto:null}).catch(console.error);
                            setSikayetler(p=>p.map(x=>x.id===s.id?{...x,islem:"foto_silindi"}:x));
                            sikayetGuncelle(s.id,"foto_silindi").catch(console.error);
                          }}>🗑 Fotoğrafı Kaldır</button>
                        )}
                        {s.postId&&!s.islem&&(
                          <button style={{...BTN("#ef4444","4px 8px"),fontSize:10,marginTop:4,marginLeft:4}} onClick={()=>{
                            setPaylasimlar(prev=>prev.filter(p=>p.id!==s.postId));
                            postSil(s.postId).catch(console.error);
                            setSikayetler(p=>p.map(x=>x.id===s.id?{...x,islem:"post_silindi"}:x));
                            sikayetGuncelle(s.id,"post_silindi").catch(console.error);
                          }}>🗑 Postu Sil</button>
                        )}
                      </div>
                    </div>
                    {!s.islem&&<div style={{display:"flex",gap:6,marginTop:6}}>
                      <button style={{...BTN("#ef4444","5px 9px"),fontSize:11}} onClick={async()=>{banla(s.hedef);setSikayetler(p=>p.map(x=>x.id===s.id?{...x,islem:"banlandi"}:x));await sikayetGuncelle(s.id,"banlandi").catch(console.error);}}>🚫 Banla</button>
                      <button style={{...BTN("#7c3aed","5px 9px"),fontSize:11}} onClick={async()=>{sosyalKisitla(s.hedef);setSikayetler(p=>p.map(x=>x.id===s.id?{...x,islem:"sosyal_kisitlandi"}:x));await sikayetGuncelle(s.id,"sosyal_kisitlandi").catch(console.error);}}>🔇 Sosyal Kısıtla</button>
                      <button style={{...BTN("#f59e0b","5px 9px"),fontSize:11}} onClick={async()=>{setSikayetler(p=>p.map(x=>x.id===s.id?{...x,islem:"incelendi"}:x));await sikayetGuncelle(s.id,"incelendi").catch(console.error);}}>✓ İncelendi</button>
                    </div>}
                    {s.islem&&<span style={BAD(s.islem==="banlandi"?"#ef4444":s.islem==="sosyal_kisitlandi"?"#7c3aed":s.islem==="foto_silindi"?"#f59e0b":"#16a34a")}>{s.islem==="banlandi"?"🚫 Banlandı":s.islem==="sosyal_kisitlandi"?"🔇 Sosyal Kısıtlandı":s.islem==="foto_silindi"?"🗑 Fotoğraf Kaldırıldı":"✓ İncelendi"}</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Admin - Tüm Yorumları Yönet */}
            <div style={CS}>
              <div style={CT}>💬 Yorum Yönetimi</div>
              {paylasimlar.filter(p=>p.yorumlar?.length>0).length===0?(
                <div style={{color:r.muted,fontSize:12,textAlign:"center",padding:"10px 0"}}>Yorum yok.</div>
              ):paylasimlar.filter(p=>p.yorumlar?.length>0).map(p=>(
                <div key={p.id} style={{padding:"8px 0",borderBottom:`1px solid ${r.brd}`}}>
                  <div style={{fontSize:11,fontWeight:700,color:r.sub,marginBottom:4}}>📝 {p.isim}: <span style={{fontStyle:"italic",fontWeight:400}}>"{p.icerik?.slice(0,40)}..."</span></div>
                  {p.yorumlar.map((y,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 8px",background:d?"#0f172a":"#f9fafb",borderRadius:7,marginBottom:3}}>
                      <div><span style={{fontWeight:700,fontSize:11,color:r.text}}>{y.isim}: </span><span style={{fontSize:11,color:r.sub}}>{y.yorum}</span></div>
                      <button onClick={async()=>{
                        const yeniYorumlar=p.yorumlar.filter((_,ii)=>ii!==i);
                        setPaylasimlar(prev=>prev.map(x=>x.id===p.id?{...x,yorumlar:yeniYorumlar}:x));
                        await postGuncelle(p.id,{yorumlar:yeniYorumlar}).catch(console.error);
                      }} style={{background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:13,fontWeight:700}}>×</button>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {refBasvurular.filter(b=>b.onay==="bekliyor").length>0&&(
              <div style={{...CS,border:"2px solid #7c3aed"}}>
                <div style={CT}>Referans Başvuruları</div>
                {refBasvurular.filter(b=>b.onay==="bekliyor").map(b=>(
                  <div key={b.id} style={{padding:"10px 0",borderBottom:`1px solid ${r.rowB}`}}>
                    <div style={{fontWeight:800,color:r.text}}>{b.isim} <span style={BAD("#7c3aed")}>{b.tip}</span></div>
                    <div style={{fontSize:11,color:r.muted,marginTop:2}}>{b.platform} · {b.acik}</div>
                    <div style={{display:"flex",gap:6,marginTop:6}}>
                      <button style={{...BTN("#7c3aed","5px 9px"),flex:1,fontSize:11}} onClick={()=>{setRefBasvurular(p=>p.map(x=>x.id===b.id?{...x,onay:"onaylandi"}:x));adminOrtak(b.uid,b.tip);}}>Onayla</button>
                      <button style={{...BTN("#ef4444","5px 9px"),flex:1,fontSize:11}} onClick={()=>setRefBasvurular(p=>p.map(x=>x.id===b.id?{...x,onay:"reddedildi"}:x))}>Reddet</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TARİF YÖNETİMİ */}
            <div style={{...CS,border:"2px solid #7c3aed",marginBottom:10}}>
              <div style={{fontWeight:800,color:"#7c3aed",marginBottom:10,fontSize:13}}>🍳 Tarif Yönetimi ({tarifler.length} tarif)</div>
              <div style={{maxHeight:320,overflowY:"auto"}}>
                {tarifler.map(t=>(
                  <div key={t.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${r.brd}`}}>
                    <div>
                      <span style={{fontSize:16,marginRight:6}}>{t.emoji}</span>
                      <span style={{fontSize:12,fontWeight:700,color:r.text}}>{t.baslik}</span>
                      <span style={{fontSize:10,color:r.muted,marginLeft:6}}>{t.kategori} · {t.kalori} kcal</span>
                    </div>
                    <button onClick={async()=>{
  setTarifler(prev=>prev.filter(x=>x.id!==t.id));
  try{
    const fbMod2=await import("firebase/firestore");
    const ref=fbMod2.doc(db,"appConfig","silinenTarifler");
    const snap=await fbMod2.getDoc(ref);
    const mevcutIds=snap.exists()?(snap.data().ids||[]):[];
    if(!mevcutIds.includes(t.id)){
      await fbMod2.setDoc(ref,{ids:[...mevcutIds,t.id]},{merge:true});
    }
  }catch(e){console.error("Tarif silme kayıt:",e);}
}} style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:11,fontWeight:700,color:"#ef4444"}}>Kaldır</button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{fontSize:12,fontWeight:700,color:r.sub,padding:"4px 4px 6px"}}>Besin Onay Kuyruğu ({bekBesin.length})</div>
            {bekBesin.length===0?<div style={{...CS,textAlign:"center",color:r.muted,padding:"20px"}}>Onay bekleyen yok.</div>:
              bekBesin.map(b=>(
                <div key={b.id} style={{...CS,border:"2px solid #f59e0b"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <div><div style={{fontWeight:800,color:r.text}}>{b.ad}</div><div style={{fontSize:11,color:r.muted}}>Gönderen: {b.gonderen}</div></div>
                    <span style={BAD("#f59e0b")}>Bekliyor</span>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button style={{...BTN("#16a34a"),flex:1,padding:"9px 0"}} onClick={async()=>{
  const yeniB={...b,id:Date.now(),onay:true};
  setBesinler(p=>[...p,yeniB]);
  setBekBesin(p=>p.filter(x=>x.id!==b.id));
  // Firestore'a kalıcı kaydet
  try{
    const {addDoc,collection:col,deleteDoc,doc:dc}=await import("firebase/firestore");
    await addDoc(col(db,"onaylananBesinler"),yeniB);
    if(b.firebaseId) await deleteDoc(dc(db,"besinOnay",b.firebaseId));
  }catch(e){console.error("Besin onay kayıt:",e);}
}}>Onayla</button>
                    <button style={{...BTN("#ef4444"),flex:1,padding:"9px 0"}} onClick={()=>setBekBesin(p=>p.filter(x=>x.id!==b.id))}>Reddet</button>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* FAB */}
        {tab==="anasayfa"&&(
          <button style={{position:"fixed",bottom:100,right:"calc(50% - 215px + 16px)",background:"linear-gradient(145deg,#10b981,#059669 60%,#047857)",color:"#fff",border:"1px solid rgba(52,211,153,.2)",borderRadius:22,width:54,height:54,cursor:"pointer",boxShadow:"0 0 0 1px rgba(16,185,129,.15), 0 12px 40px rgba(16,185,129,.45), 0 4px 12px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:99}} onClick={()=>{setYemekEkleModal(true);setYemekEkleSekme("ara");setBesinArama("");setHizliSonuc(null);}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        )}

        {/* NAV */}
        <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:430,background:d?"rgba(4,9,6,.97)":"rgba(255,255,255,.97)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",display:"flex",borderTop:`1px solid ${d?"rgba(16,185,129,.08)":"rgba(16,185,129,.1)"}`,zIndex:100,boxShadow:d?"0 -1px 0 rgba(16,185,129,.05), 0 -20px 60px rgba(0,0,0,.8)":"0 -1px 0 rgba(16,185,129,.08), 0 -8px 32px rgba(0,0,0,.06)",paddingBottom:"env(safe-area-inset-bottom,0)"}}>
          {[
            {id:"anasayfa",svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,label:"Ana"},
            {id:"gozat",svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,label:"Gözat"},
            ...(sosyalAktif?[
              {id:"sosyal",svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,label:"Sosyal"},
            ]:[]),
            {id:"oruc",svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,label:"Oruç"},
            {id:"puan",svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,label:"Puan"},
            {id:"profil",svg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,label:"Profil"},
          ].map(n=>(
            <button key={n.id} style={NB(tab===n.id)} onClick={()=>{
  const changeTab=(newTab)=>{
    setTabAnimClass("tab-exit");
    setTimeout(()=>{ 
      if(newTab==="gozat"){setGozatLimit(30);setAramaOdak(true);}
      setTab(newTab); 
      setTabAnimClass("tab-enter");
      setTimeout(()=>setTabAnimClass(""),200);
    },120);
  };
  if(n.id==="gozat"){changeTab("gozat");}
  else changeTab(n.id);
}}>
              <div style={{width:36,height:28,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:18,background:tab===n.id?(d?"rgba(16,185,129,.12)":"rgba(16,185,129,.1)"):"transparent",transition:"all .2s",marginBottom:1}}>{n.svg}</div>
              <span style={{fontSize:9,letterSpacing:.5}}>{n.label}</span>
              {(n.badge||0)>0&&<span style={{position:"absolute",top:6,right:"calc(50% - 16px)",background:"#ef4444",color:"#fff",fontSize:8,fontWeight:800,padding:"1px 5px",borderRadius:10,minWidth:14,textAlign:"center"}}>{n.badge}</span>}
            </button>
          ))}
        </nav>

        {/* HAMBURGER DRAWER */}

        {/* AI DİYETİSYEN MODAL - ana seviyede */}
            {diyetisyenAcik&&(
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.72)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",zIndex:9999,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
                <div style={{background:r.card,borderRadius:"24px 24px 0 0",maxHeight:"85vh",animation:"slideUp 0.3s cubic-bezier(0.34,1.2,0.64,1) both",display:"flex",flexDirection:"column"}}>
                  {/* Header */}
                  <div style={{padding:"16px 20px",borderBottom:`1px solid ${r.inpB}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
                    <div>
                      <div style={{fontSize:16,fontWeight:900,color:r.text}}>🧑‍⚕️ AI Diyetisyen</div>
                      <div style={{fontSize:11,color:"#16a34a"}}>● Çevrimiçi</div>
                    </div>
                    <button onClick={()=>setDiyetisyenAcik(false)} style={{background:"transparent",border:"none",fontSize:22,cursor:"pointer",color:r.sub}}>✕</button>
                  </div>
                  {/* Mesajlar */}
                  <div style={{flex:1,overflowY:"auto",padding:"16px 16px 8px"}}>
                    {diyMesajlar.map((m,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:m.rol==="kullanici"?"flex-end":"flex-start",marginBottom:10}}>
                        {m.rol==="ai"&&<div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#16a34a,#052e16)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,marginRight:8,flexShrink:0}}>🌿</div>}
                        <div style={{maxWidth:"75%",background:m.rol==="kullanici"?"linear-gradient(135deg,#16a34a,#059669)":"#f0fdf4",color:m.rol==="kullanici"?"#fff":r.text,borderRadius:m.rol==="kullanici"?"18px 18px 4px 18px":"18px 18px 18px 4px",padding:"10px 14px",fontSize:13,lineHeight:1.5}}>
                          {m.mesaj}
                          <div style={{fontSize:9,opacity:.6,marginTop:4,textAlign:m.rol==="kullanici"?"right":"left"}}>{m.zaman}</div>
                        </div>
                      </div>
                    ))}
                    {diyYukleniyor&&(
                      <div style={{display:"flex",justifyContent:"flex-start",marginBottom:10}}>
                        <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#16a34a,#052e16)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,marginRight:8}}>🌿</div>
                        <div style={{background:"#f0fdf4",borderRadius:"18px 18px 18px 4px",padding:"12px 16px"}}>
                          <div style={{display:"flex",gap:4}}>
                            {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"#16a34a",animation:`dotPulse 1.2s ${i*0.2}s infinite`}}/>)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Hızlı sorular */}
                  <div style={{padding:"4px 12px",display:"flex",gap:6,overflowX:"auto"}}>
                    {["💪 Protein önerileri","🥗 Diyet planı","⚖️ Kilo verme","🍽️ Tarif öner","💊 Vitamin eksikliği"].map(s=>(
                      <button key={s} onClick={()=>{setDiyYazi(s.slice(3));}} style={{whiteSpace:"nowrap",padding:"5px 11px",borderRadius:20,border:`1.5px solid ${r.inpB}`,background:r.inp,color:r.sub,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>{s}</button>
                    ))}
                  </div>
                  {/* Input */}
                  <div style={{padding:"8px 16px 20px",display:"flex",gap:8,flexShrink:0}}>
                    <input value={diyYazi} onChange={e=>setDiyYazi(e.target.value)}
                      onKeyDown={e=>e.key==="Enter"&&diyYaziGonder()}
                      placeholder="Diyetisyene sor..." style={{...IS,flex:1,padding:"11px 14px",fontSize:13,borderRadius:24}}/>
                    <button onClick={diyYaziGonder} disabled={!diyYazi.trim()||diyYukleniyor}
                      style={{...BTN("#16a34a","11px 16px"),borderRadius:24,fontSize:13,opacity:!diyYazi.trim()||diyYukleniyor?.5:1}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
                  </div>
                </div>
              </div>
            )}

        {hamMenu&&(
          <div style={{position:"fixed",inset:0,zIndex:300,display:"flex"}} onClick={()=>setHamMenu(false)}>
            {/* drawer */}
            <div style={{width:248,background:d?"rgba(8,15,10,.97)":"rgba(255,255,255,.97)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",height:"100%",padding:"0 0 24px",overflowY:"auto",boxShadow:d?"6px 0 48px rgba(0,0,0,.7)":"6px 0 48px rgba(13,31,15,.12)",borderRight:d?"1px solid rgba(255,255,255,.06)":"1px solid #e8f0e9"}} onClick={e=>e.stopPropagation()}>
              {/* drawer header */}
              <div style={{background:d?"linear-gradient(160deg,#0a1f0c,#0d2e12)":"linear-gradient(160deg,#052e16,#14532d)",padding:"24px 18px 18px",color:"#fff",marginBottom:8,borderBottom:d?"1px solid rgba(255,255,255,.06)":"none",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 80% 50%,rgba(34,197,94,.15),transparent 60%)",pointerEvents:"none"}}/>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <div style={{width:28,height:28,background:"linear-gradient(145deg,#22c55e,#052e16 90%)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px #22c55e30"}}>
                    <svg width="16" height="16" viewBox="0 0 120 120" fill="none"><path d="M26 52 Q26 88 60 88 Q94 88 94 52 Z" fill="#dcfce7"/><ellipse cx="60" cy="52" rx="34" ry="8" fill="#bbf7d0"/><path d="M52 65 Q60 52 72 60 Q60 78 52 65Z" fill="#fbbf24"/></svg>
                  </div>
                  <div style={{fontSize:16,fontWeight:900,fontFamily:"'DM Serif Display',serif",letterSpacing:-.3}}>Do<span style={{color:"#4ade80"}}>ya</span></div>
                </div>
                <div style={{fontSize:11,opacity:.85}}>{aktif?.isim}</div>
                <div style={{fontSize:10,opacity:.65,marginTop:1}}>{aktif?.uid}</div>
              </div>

              {(()=>{
                const HAM_IC={
                  su:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
                  takvim: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
                  arkadaslar:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                  spor:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 5v14M18 5v14M6 12h12M3 7h3M18 7h3M3 17h3M18 17h3"/></svg>,
                  diyetisyen:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
                  diyet:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
                  alerji: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
                  kilo:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                  puan:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                  para:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                  admin:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                };
                const HAM_C={su:"#3b82f6",takvim:"#8b5cf6",arkadaslar:"#f59e0b",spor:"#10b981",diyetisyen:"#22c55e",diyet:"#16a34a",alerji:"#ef4444",kilo:"#6366f1",puan:"#f59e0b",para:"#059669",admin:"#dc2626"};
                const groups=[
                  { grup:"Takip", items:[
                    {id:"su",    ic:HAM_IC.su,    c:HAM_C.su,    label:"Su Takibi"},
                    {id:"takvim",ic:HAM_IC.takvim,c:HAM_C.takvim,label:"Takvim"},
                  ]},
                  ...(sosyalAktif?[{ grup:"Sosyal", items:[
                    {id:"arkadaslar",ic:HAM_IC.arkadaslar,c:HAM_C.arkadaslar,label:"Arkadaşlar",badge:gelenIstekler.length},
                  ]}]:[]),
                  { grup:"Spor", items:[
                    {id:"__sporapp__",ic:HAM_IC.spor,c:HAM_C.spor,label:"Spor Uygulaması"},
                  ]},
                  { grup:"Sağlık AI", items:[
                    {id:"__diyetisyen__",ic:HAM_IC.diyetisyen,c:HAM_C.diyetisyen,label:"AI Diyetisyen"},
                    {id:"__diyetlistesi__",ic:HAM_IC.diyet,c:HAM_C.diyet,label:"Günlük Diyet Listesi"},
                    {id:"__alerji__",ic:HAM_IC.alerji,c:HAM_C.alerji,label:"Alerji Yönetimi"},
                    {id:"__kilotakip__",ic:HAM_IC.kilo,c:HAM_C.kilo,label:"Kilo Takibi"},
                  ]},
                  { grup:"Kazanç", items:[
                    ...(isOrtak?[{id:"para",ic:HAM_IC.para,c:HAM_C.para,label:"Para Paneli"}]:[]),
                    {id:"puan",ic:HAM_IC.puan,c:HAM_C.puan,label:"Puan & Ödüller"},
                  ]},
                  ...(isAdmin?[{ grup:"Yönetim", items:[
                    {id:"admin",ic:HAM_IC.admin,c:HAM_C.admin,label:"Admin Paneli",badge:bekBesin.length+sikayetler.filter(s=>!s.islem).length},
                  ]}]:[]),
                ];
                return groups.map(grp=>(
                  <div key={grp.grup} style={{marginBottom:4}}>
                    <div style={{fontSize:9,fontWeight:800,color:r.muted,padding:"12px 18px 5px",textTransform:"uppercase",letterSpacing:2}}>{grp.grup}</div>
                    {grp.items.map(n=>{
                      const akt=tab===n.id;
                      return(
                      <button key={n.id} onClick={()=>{
                        if(n.id==="__sporapp__"){setSporAppAcik(true);setSporAppAdim(0);setSporSoruAdim(0);setSporProgram(null);setAntBitmis(false);setSporHedefSA("");setSporBolge([]);setSporSeviye("");}
                        else if(n.id==="__diyetisyen__"){setDiyetisyenAcik(true);}
                        else if(n.id==="__diyetlistesi__"){setDiyetListesiAcik(true);diyetListesiUret();}
                        else if(n.id==="__alerji__"){setAlerjiModal(true);}
                        else if(n.id==="__kilotakip__"){setKiloGirModal(true);setKiloInput(profil.kilo||"");setKiloNot("");}
                        else setTab(n.id);
                        setHamMenu(false);
                      }} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 14px 10px 16px",border:"none",background:akt?(d?`${n.c}15`:`${n.c}0a`):"transparent",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:akt?800:600,fontSize:13,color:akt?n.c:r.text,borderLeft:`2px solid ${akt?n.c:"transparent"}`,transition:"all .15s"}}>
                        <div style={{width:32,height:32,borderRadius:10,background:akt?`${n.c}20`:(d?"rgba(255,255,255,.05)":"#f4f4f5"),display:"flex",alignItems:"center",justifyContent:"center",color:akt?n.c:r.sub,flexShrink:0,transition:"all .15s"}}>{n.ic}</div>
                        <span style={{flex:1,textAlign:"left"}}>{n.label}</span>
                        {(n.badge||0)>0&&<span style={{background:"#ef4444",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 6px",borderRadius:10,minWidth:16,textAlign:"center"}}>{n.badge}</span>}
                      </button>
                    );})}
                  </div>
                ));
              })()}

              <div style={{height:1,background:r.brd,margin:"10px 0"}}/>
              <button onClick={()=>{cikis();setHamMenu(false);}}
                style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 16px",border:"none",background:"transparent",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,color:"#ef4444"}}>
                <div style={{width:32,height:32,borderRadius:10,background:"rgba(239,68,68,.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                </div>
                Çıkış Yap
              </button>

              <button onClick={async()=>{
                try{
                  const {doc,getDoc}=await import("firebase/firestore");
                  const snap=await getDoc(doc(db,"users",firebaseUID));
                  const blob=new Blob([JSON.stringify({profil:{isim:aktif?.isim,email:aktif?.email,kilo:aktif?.kilo,boy:aktif?.boy},tarih:new Date().toISOString(),...(snap.data()||{})},null,2)],{type:"application/json"});
                  const a=document.createElement("a");a.href=URL.createObjectURL(blob);
                  a.download=`doya-verilerim-${new Date().toISOString().split("T")[0]}.json`;a.click();
                }catch(e){alert("Veri indirilemedi.");}
                setHamMenu(false);
              }} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 16px",border:"none",background:"transparent",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,color:"#3b82f6"}}>
                <div style={{width:32,height:32,borderRadius:10,background:"rgba(59,130,246,.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                Verilerimi İndir (GDPR/KVKK)
              </button>

              <button onClick={()=>{setHesapSilModal(true);setHamMenu(false);}}
                style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 16px",border:"none",background:"transparent",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,color:"#dc2626"}}>
                <div style={{width:32,height:32,borderRadius:10,background:"rgba(220,38,38,.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                </div>
                Hesabımı Kalıcı Olarak Sil
              </button>
            </div>
            {/* overlay - sağda */}
            <div style={{flex:1,background:"rgba(0,0,0,.45)"}}/>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            MODALLER
        ══════════════════════════════════════════════════════ */}

        {/* HESAP SİL MODAL */}
        {hesapSilModal&&(
          <div style={{position:"fixed",inset:0,background:"#000b",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
            <div style={{background:r.card,borderRadius:18,padding:24,maxWidth:380,width:"100%"}}>
              <div style={{fontSize:24,textAlign:"center",marginBottom:8}}>🗑️</div>
              <div style={{fontWeight:900,fontSize:17,textAlign:"center",marginBottom:8,color:"#dc2626"}}>Hesabı Kalıcı Olarak Sil</div>
              <div style={{fontSize:12,color:r.sub,lineHeight:1.7,marginBottom:16,textAlign:"center"}}>
                Bu işlem <b>geri alınamaz.</b><br/>
                Tüm beslenme geçmişiniz, puanlarınız, arkadaşlıklarınız ve kişisel verileriniz kalıcı olarak silinecektir.<br/><br/>
                GDPR/KVKK kapsamında verilerinizin silinmesi 30 gün içinde tamamlanır.
              </div>
              <label style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:16,cursor:"pointer",background:"#fef2f2",borderRadius:10,padding:10}}>
                <input type="checkbox" checked={hesapSilOnay} onChange={e=>setHesapSilOnay(e.target.checked)}
                  style={{marginTop:2,width:16,height:16,accentColor:"#dc2626",flexShrink:0}}/>
                <span style={{fontSize:12,color:"#374151",lineHeight:1.5}}>Hesabımı ve tüm verilerimi kalıcı olarak silmek istediğimi anlıyor ve onaylıyorum.</span>
              </label>
              <button
                disabled={!hesapSilOnay}
                onClick={async()=>{
                  if(!hesapSilOnay) return;
                  try{
                    const {doc,deleteDoc,collection,getDocs,writeBatch}=await import("firebase/firestore");
                                        const {deleteUser}=await import("firebase/auth");
                    // Firestore verilerini sil
                    const batch=writeBatch(db);
                    batch.delete(doc(db,"users",firebaseUID));
                    await batch.commit();
                    // Auth hesabını sil
                    if(auth.currentUser) await deleteUser(auth.currentUser);
                    alert("Hesabınız başarıyla silindi. Güle güle! 👋");
                    setAktif(null);setFirebaseUID(null);setHesapSilModal(false);
                  }catch(e){
                    alert("Hata: "+e.message+"\n\nLütfen önce çıkış yapıp tekrar giriş yapın, sonra tekrar deneyin.");
                  }
                }}
                style={{...BTN(hesapSilOnay?"#dc2626":"#d1d5db"),width:"100%",padding:"12px 0",marginBottom:8,opacity:hesapSilOnay?1:0.5}}>
                Hesabımı Kalıcı Olarak Sil
              </button>
              <button style={{...BTN("#6b7280"),width:"100%",padding:"12px 0"}} onClick={()=>{setHesapSilModal(false);setHesapSilOnay(false);}}>Vazgeç</button>
            </div>
          </div>
        )}

        {/* SPOR MODAL */}
        {sporModal&&(
          <div style={{position:"fixed",inset:0,background:"#0009",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setSporModal(false)}>
            <div style={{background:r.card,borderRadius:"18px 18px 0 0",padding:22,width:"100%",maxWidth:430,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
                <div style={{fontSize:17,fontWeight:900,color:r.text}}>Spor Ekle</div>
                <button onClick={()=>setSporModal(false)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:r.sub}}>×</button>
              </div>
              <div style={{background:d?"#0f172a":"#f0fdf4",borderRadius:12,padding:10,marginBottom:12,fontSize:11,color:"#16a34a"}}>
                💡 Yaptığın aktiviteyi seç, süre ve tempoya göre kalori otomatik hesaplanır.
              </div>
              <div style={{marginBottom:12}}>
                <div style={CT}>Aktivite Türü</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                  {SPOR_LISTESI.map(s=>(
                    <button key={s.id} onClick={()=>setSporSec(s)} style={{padding:"10px 8px",border:`2px solid ${sporSec.id===s.id?"#10b981":r.inpB}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12,background:sporSec.id===s.id?d?"#0f2e2a":"#f0fdf4":r.inp,color:sporSec.id===s.id?"#10b981":r.sub,display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:16}}>{s.ikon}</span>{s.ad}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:12}}>
                <div style={CT}>Tempo</div>
                <div style={{display:"flex",gap:8}}>
                  {[{v:"hafif",l:"🚶 Hafif tempo"},{v:"orta",l:"🏃 Orta tempo"},{v:"yuksek",l:"💨 Yüksek tempo"}].map(t=>(
                    <button key={t.v} onClick={()=>setSporTempo(t.v)} style={{flex:1,padding:"9px 4px",border:`2px solid ${sporTempo===t.v?"#10b981":r.inpB}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:11,background:sporTempo===t.v?d?"#0f2e2a":"#f0fdf4":r.inp,color:sporTempo===t.v?"#10b981":r.sub}}>{t.l}</button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={CT}>Süre (dakika)</div>
                <input style={{...IS}} type="number" value={sporSure} onChange={e=>setSporSure(e.target.value)} placeholder="30"/>
              </div>
              {sporSure&&(
                <div style={{background:"#f0fdf4",borderRadius:12,padding:12,marginBottom:14,textAlign:"center"}}>
                  <div style={{fontSize:11,color:"#6b7280"}}>Tahmini yakılan kalori</div>
                  <div style={{fontSize:30,fontWeight:900,color:"#10b981"}}>~{sporKcal(sporSec.met[sporTempo],+sporSure,+(p.kilo||70))} kcal</div>
                  <div style={{fontSize:11,color:"#6b7280"}}>{sporSure} dk · {sporSec.ikon} {sporSec.ad} · {sporTempo==="hafif"?"🚶 Hafif":sporTempo==="orta"?"🏃 Orta":"💨 Yüksek"} tempo</div>
                </div>
              )}
              <button style={{...BTN("#10b981"),width:"100%",padding:"12px 0"}} onClick={sporEkle}>Günlüğe Ekle</button>
            </div>
          </div>
        )}

        {/* BESİN DETAY MODAL */}
        {/* ──── YEMEK EKLEME MODAL (Fotoğraf tarzı) ─────────── */}
        {yemekEkleModal&&(
          <div style={{position:"fixed",inset:0,background:"#0009",zIndex:199,display:"flex",flexDirection:"column",justifyContent:"flex-end"}} onClick={()=>setYemekEkleModal(false)}>
            <div style={{background:r.card,borderRadius:"20px 20px 0 0",maxHeight:"92vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>

              {/* Header */}
              <div style={{background:d?"linear-gradient(135deg,#134e2a,#166534)":"linear-gradient(135deg,#10b981,#059669)",borderRadius:"20px 20px 0 0",padding:"16px 18px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
                <div>
                  <div style={{color:"#fff",fontSize:16,fontWeight:900}}>{yemekEkleOgun}</div>
                  <div style={{color:"rgba(255,255,255,.7)",fontSize:12}}>{bugKatKal(yemekEkleOgun)} / {HEDEF} kcal</div>
                </div>
                <button onClick={()=>setYemekEkleModal(false)} style={{background:"rgba(255,255,255,.2)",border:"none",color:"#fff",borderRadius:10,padding:"6px 12px",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13}}>✕</button>
              </div>

              {/* Öğün Seçici */}
              <div style={{display:"flex",gap:6,padding:"10px 14px 0",overflowX:"auto",flexShrink:0}}>
                {["Kahvaltı","Öğle Yemeği","Akşam Yemeği","Atıştırmalık"].map(og=>(
                  <button key={og} onClick={()=>setYemekEkleOgun(og)}
                    style={{padding:"5px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,whiteSpace:"nowrap",
                      background:yemekEkleOgun===og?"#16a34a":d?"#1e293b":"#f1f5f9",
                      color:yemekEkleOgun===og?"#fff":r.sub,transition:"all .15s"}}>{og}</button>
                ))}
              </div>

              {/* Sekmeler */}
              <div style={{display:"flex",padding:"10px 14px 0",gap:4,flexShrink:0}}>
                {[{k:"ara",ikon:"🔍",l:"Ara"},{k:"foto",ikon:"📷",l:"Fotoğraf"},{k:"hizli",ikon:"✨",l:"Hızlı Ekle"},{k:"yemeklerim",ikon:"🍽️",l:"Yemeklerim"}].map(s=>(
                  <button key={s.k} onClick={()=>{setYemekEkleSekme(s.k);setBesinArama("");setHizliSonuc(null);}}
                    style={{flex:1,padding:"8px 4px",borderRadius:"12px 12px 0 0",border:"none",cursor:"pointer",fontSize:11,fontWeight:700,
                      background:yemekEkleSekme===s.k?(d?"#1e293b":"#fff"):d?"#0f172a":"#f8fafc",
                      color:yemekEkleSekme===s.k?"#16a34a":r.muted,
                      borderBottom:yemekEkleSekme===s.k?`2px solid #16a34a`:"2px solid transparent",
                      transition:"all .15s"}}>
                    <div style={{fontSize:16,marginBottom:2}}>{s.ikon}</div>
                    <div>{s.l}</div>
                  </button>
                ))}
              </div>

              {/* İçerik */}
              <div style={{flex:1,overflowY:"auto",padding:"12px 14px 24px"}}>

                {/* ARA sekmesi */}
                {yemekEkleSekme==="ara"&&(
                  <div>
                    <div style={{position:"relative",marginBottom:12}}>
                      <input autoFocus
                        style={{...IS,paddingLeft:38,fontSize:14}}
                        placeholder="Bir yiyecek ara..."
                        value={besinArama}
                        onChange={e=>setBesinArama(e.target.value)}
                      />
                      <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:16,pointerEvents:"none"}}>🔍</span>
                      {besinArama&&<button onClick={()=>setBesinArama("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:18,color:r.muted}}>×</button>}
                    </div>
                    {!besinArama&&(
                      <div style={{textAlign:"center",paddingTop:30}}>
                        <div style={{fontSize:64,marginBottom:12}}>🥑</div>
                        <div style={{fontSize:14,color:r.sub,lineHeight:1.6}}>
                          Uygulamayı kullanmaya devam<br/>edebilirsiniz, 📸 fotoğraf çekebiliriz,<br/>biz yiyecekleri tanırız!
                        </div>
                      </div>
                    )}
                    {besinArama&&aramaBesinler.length===0&&(
                      <div style={{textAlign:"center",padding:"24px",color:r.muted,fontSize:13}}>Sonuç bulunamadı. Hızlı Ekle ile AI'ya sor!</div>
                    )}
                    {aramaBesinler.slice(0,20).map(b=>(
                      <div key={b.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",borderRadius:14,border:`1px solid ${r.inpB}`,marginBottom:8,background:r.inp,cursor:"pointer"}}
                        onClick={()=>{setSecBesin(b);setYemekGram(String(b.por||100));setYemekKat(yemekEkleOgun);setYemekEkleModal(false);}}>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:800,fontSize:13,color:r.text}}>{b.ad}{b.marka?` (${b.marka})`:""}</div>
                          <div style={{fontSize:11,color:r.muted}}>{b.kal} kcal · P:{b.pro}g K:{b.karb}g Y:{b.yag}g</div>
                        </div>
                        <div style={{background:"#16a34a",borderRadius:10,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:20,flexShrink:0}}>+</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* FOTOĞRAF sekmesi */}
                {yemekEkleSekme==="foto"&&(
                  <div style={{textAlign:"center",paddingTop:20}}>
                    <div style={{fontSize:56,marginBottom:14}}>📸</div>
                    <div style={{fontSize:15,fontWeight:800,color:r.text,marginBottom:8}}>Yemeğini Fotoğrafla</div>
                    <div style={{fontSize:12,color:r.sub,marginBottom:24}}>AI yiyeceği tanıyacak ve kalorilerini hesaplayacak</div>
                    <label style={{display:"inline-block",background:"linear-gradient(135deg,#10b981,#059669)",color:"#fff",borderRadius:16,padding:"14px 28px",fontSize:14,fontWeight:800,cursor:"pointer"}}>
                      📷 Fotoğraf Çek / Seç
                      <input type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={async e=>{
                        const file=e.target.files?.[0];
                        if(!file)return;
                        setHizliEkleYuk(true);
                        try{
                          const reader=new FileReader();
                          reader.onload=async(ev)=>{
                            const b64=ev.target.result.split(",")[1];
                            const resp=await fetch("/.netlify/functions/ai-proxy",{
                              method:"POST",headers:{"Content-Type":"application/json"},
                              body:JSON.stringify({
                                model:"claude-haiku-4-5-20251001",max_tokens:600,
                                messages:[{role:"user",content:[
                                  {type:"image",source:{type:"base64",media_type:file.type,data:b64}},
                                  {type:"text",text:'Bu yemeği tanı. JSON ile cevap ver: {"ad":"...","kal":number,"pro":number,"karb":number,"yag":number,"por":number,"acik":"kısa açıklama"}'}
                                ]}]
                              })
                            });
                            const data=await resp.json();
                            const text=data.content?.[0]?.text||"{}";
                            const clean=text.replace(/```json|```/g,"").trim();
                            setHizliSonuc(JSON.parse(clean));
                            setHizliEkleYuk(false);
                          };
                          reader.readAsDataURL(file);
                        }catch(err){setHizliEkleYuk(false);}
                      }}/>
                    </label>
                    {hizliEkleYuk&&<div style={{marginTop:20,color:r.sub,fontSize:13}}>🤖 AI analiz ediyor...</div>}
                    {hizliSonuc&&!hizliEkleYuk&&(
                      <div style={{...CS,marginTop:16,textAlign:"left"}}>
                        <div style={{fontSize:15,fontWeight:900,color:r.text,marginBottom:4}}>{hizliSonuc.ad}</div>
                        <div style={{fontSize:12,color:r.sub,marginBottom:10}}>{hizliSonuc.acik}</div>
                        <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                          {[{l:"Kalori",v:hizliSonuc.kal,b:"kcal",c:"#16a34a"},{l:"Protein",v:hizliSonuc.pro,b:"g",c:"#3b82f6"},{l:"Karb",v:hizliSonuc.karb,b:"g",c:"#f59e0b"},{l:"Yağ",v:hizliSonuc.yag,b:"g",c:"#ef4444"}].map(m=>(
                            <div key={m.l} style={{flex:"1 1 40%",background:r.inp,borderRadius:10,padding:"8px 10px",textAlign:"center"}}>
                              <div style={{fontSize:16,fontWeight:900,color:m.c}}>{m.v}<span style={{fontSize:10}}>{m.b}</span></div>
                              <div style={{fontSize:10,color:r.sub}}>{m.l}</div>
                            </div>
                          ))}
                        </div>
                        <button onClick={async()=>{
                          const kayit={...hizliSonuc,kat:yemekEkleOgun,gram:hizliSonuc.por||100,
                            gramKal:hizliSonuc.kal,gramPro:hizliSonuc.pro||0,gramKarb:hizliSonuc.karb||0,gramYag:hizliSonuc.yag||0,
                            saat:new Date().toTimeString().slice(0,5)};
                          const bg=bugunKey();
                          const yeniGun={...gunV(bg),yemekler:[...gunV(bg).yemekler,kayit]};
                          await gunSet(bg,"yemekler",yeniGun.yemekler);
                          setSonYemekler(p=>[kayit,...p.slice(0,9)]);
                          setHizliSonuc(null);setYemekEkleModal(false);
                        }} style={{...BTN(),width:"100%",padding:"13px 0",fontSize:14}}>✅ {yemekEkleOgun} Öğününe Ekle</button>
                      </div>
                    )}
                  </div>
                )}

                {/* HIZLI EKLE sekmesi */}
                {yemekEkleSekme==="hizli"&&(
                  <div>
                    <div style={{fontSize:13,fontWeight:800,color:r.text,marginBottom:10}}>Ne yedin? AI kalorini hesaplasın ✨</div>
                    <div style={{position:"relative",marginBottom:12}}>
                      <textarea
                        style={{...IS,resize:"none",height:90,fontSize:13,paddingTop:12}}
                        placeholder={"Örn: 2 yumurta, 1 dilim ekmek ve bir bardak süt yedim"}
                        value={hizliEkleMetin}
                        onChange={e=>setHizliEkleMetin(e.target.value)}
                      />
                    </div>
                    <button disabled={!hizliEkleMetin.trim()||hizliEkleYuk}
                      onClick={async()=>{
                        if(!hizliEkleMetin.trim())return;
                        setHizliEkleYuk(true);
                        setHizliSonuc(null);
                        try{
                          const resp=await fetch("/.netlify/functions/ai-proxy",{
                            method:"POST",headers:{"Content-Type":"application/json"},
                            body:JSON.stringify({
                              model:"claude-haiku-4-5-20251001",max_tokens:600,
                              system:"Sen bir beslenme uzmanısın. Sadece JSON ile cevap ver, başka hiçbir şey yazma.",
                              messages:[{role:"user",content:`Şu yiyeceklerin besin değerlerini hesapla: "${hizliEkleMetin}". Format: {"ad":"...","kal":number,"pro":number,"karb":number,"yag":number,"por":100,"acik":"kısa açıklama"}`}]
                            })
                          });
                          const data=await resp.json();
                          const text=data.content?.[0]?.text||"{}";
                          const clean=text.replace(/```json|```/g,"").trim();
                          setHizliSonuc(JSON.parse(clean));
                        }catch(err){setHizliSonuc({hata:"Hesaplanamadı"});}
                        setHizliEkleYuk(false);
                      }}
                      style={{...BTN(hizliEkleMetin.trim()&&!hizliEkleYuk?"#7c3aed":"#9ca3af"),width:"100%",padding:"12px 0",fontSize:14,marginBottom:14}}>
                      {hizliEkleYuk?"🤖 Hesaplanıyor...":"✨ AI ile Hesapla"}
                    </button>
                    {hizliSonuc&&!hizliSonuc.hata&&!hizliEkleYuk&&(
                      <div style={{...CS}}>
                        <div style={{fontSize:15,fontWeight:900,color:r.text,marginBottom:4}}>{hizliSonuc.ad}</div>
                        <div style={{fontSize:12,color:r.sub,marginBottom:12}}>{hizliSonuc.acik}</div>
                        <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                          {[{l:"Kalori",v:hizliSonuc.kal,b:"kcal",c:"#16a34a"},{l:"Protein",v:hizliSonuc.pro,b:"g",c:"#3b82f6"},{l:"Karb",v:hizliSonuc.karb,b:"g",c:"#f59e0b"},{l:"Yağ",v:hizliSonuc.yag,b:"g",c:"#ef4444"}].map(m=>(
                            <div key={m.l} style={{flex:"1 1 40%",background:r.inp,borderRadius:10,padding:"8px 10px",textAlign:"center"}}>
                              <div style={{fontSize:16,fontWeight:900,color:m.c}}>{m.v}<span style={{fontSize:10}}>{m.b}</span></div>
                              <div style={{fontSize:10,color:r.sub}}>{m.l}</div>
                            </div>
                          ))}
                        </div>
                        <button onClick={async()=>{
                          const kayit={...hizliSonuc,kat:yemekEkleOgun,gram:hizliSonuc.por||100,
                            gramKal:hizliSonuc.kal,gramPro:hizliSonuc.pro||0,gramKarb:hizliSonuc.karb||0,gramYag:hizliSonuc.yag||0,
                            saat:new Date().toTimeString().slice(0,5)};
                          const bg=bugunKey();
                          await gunSet(bg,"yemekler",[...gunV(bg).yemekler,kayit]);
                          setSonYemekler(p=>[kayit,...p.slice(0,9)]);
                          setHizliSonuc(null);setHizliEkleMetin("");setYemekEkleModal(false);
                        }} style={{...BTN(),width:"100%",padding:"13px 0",fontSize:14}}>✅ {yemekEkleOgun} Öğününe Ekle</button>
                      </div>
                    )}
                    {hizliSonuc?.hata&&<div style={{color:"#ef4444",textAlign:"center",fontSize:12,padding:8}}>{hizliSonuc.hata}</div>}
                  </div>
                )}

                {/* YEMEKLERİM sekmesi */}
                {yemekEkleSekme==="yemeklerim"&&(
                  <div>
                    {sonYemekler.length===0&&bugYemekler.length===0?(
                      <div style={{textAlign:"center",paddingTop:30}}>
                        <div style={{fontSize:48,marginBottom:12}}>🍽️</div>
                        <div style={{fontSize:13,color:r.sub}}>Henüz yemek eklemedin.<br/>Ara veya Hızlı Ekle ile başla!</div>
                      </div>
                    ):(
                      <>
                        {[...new Map([...sonYemekler,...bugYemekler].map(y=>[y.ad,y])).values()].slice(0,15).map((y,i)=>(
                          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",borderRadius:14,border:`1px solid ${r.inpB}`,marginBottom:8,background:r.inp,cursor:"pointer"}}
                            onClick={async()=>{
                              const kayit={...y,kat:yemekEkleOgun,saat:new Date().toTimeString().slice(0,5)};
                              const bg=bugunKey();
                              await gunSet(bg,"yemekler",[...gunV(bg).yemekler,kayit]);
                              setYemekEkleModal(false);
                            }}>
                            <div style={{flex:1}}>
                              <div style={{fontWeight:800,fontSize:13,color:r.text}}>{y.ad}</div>
                              <div style={{fontSize:11,color:r.muted}}>{y.gramKal||y.kal} kcal</div>
                            </div>
                            <div style={{background:"#16a34a",borderRadius:10,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:20,flexShrink:0}}>+</div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

                {secBesin&&(
          <div style={{position:"fixed",inset:0,background:"#0009",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setSecBesin(null)}>
            <div style={{background:r.card,borderRadius:"18px 18px 0 0",padding:22,width:"100%",maxWidth:430,maxHeight:"93vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                <div>
                  <div style={{fontSize:17,fontWeight:900,color:r.text}}>{secBesin.ad}</div>
                  {secBesin.marka&&<div style={{fontSize:12,color:"#16a34a",fontWeight:700}}>{secBesin.marka}</div>}
                  <div style={{fontSize:11,color:r.muted}}>{secBesin.kat}</div>
                  <div style={{fontSize:10,color:r.muted,fontStyle:"italic",marginTop:2}}>*Besin değerleri tahminidir</div>
                </div>
                <button onClick={()=>setSecBesin(null)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:r.sub}}>×</button>
              </div>

              <div style={{background:d?"#0f2a1a":"#f0fdf4",borderRadius:14,padding:14,marginBottom:12}}>
                <div style={{fontSize:11,fontWeight:700,color:"#16a34a",marginBottom:8}}>Kaç gram yedin?</div>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
                  <input style={{...IS,flex:1}} type="number" value={yemekGram} onChange={e=>setYemekGram(e.target.value)} placeholder="gram"/>
                  <div style={{fontSize:13,color:r.sub,fontWeight:700}}>gram</div>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                  {[secBesin.por,Math.round(secBesin.por*0.5),Math.round(secBesin.por*1.5),200,250].filter((v,i,a)=>a.indexOf(v)===i).map(g=>(
                    <button key={g} onClick={()=>setYemekGram(String(g))} style={{padding:"4px 10px",border:`1.5px solid ${+yemekGram===g?"#16a34a":r.inpB}`,borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",background:+yemekGram===g?"#16a34a":r.inp,color:+yemekGram===g?"#fff":r.sub,fontFamily:"'Nunito',sans-serif"}}>{g}g</button>
                  ))}
                </div>
                <div style={{fontSize:11,fontWeight:700,color:r.sub,marginBottom:5}}>Öğün</div>
                <select style={{...IS}} value={yemekKat} onChange={e=>setYemekKat(e.target.value)}>
                  {YEMEK_KAT.map(k=><option key={k}>{k}</option>)}
                </select>
              </div>

              {/* Hesaplanan makrolar */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
                {[
                  {l:"Kalori",  v:gramKalHesapla(secBesin.kal, secBesin.por,+yemekGram),       birim:"kcal",c:"#16a34a"},
                  {l:"Protein", v:+(secBesin.pro *(+yemekGram||secBesin.por)/secBesin.por).toFixed(1),birim:"g",c:"#3b82f6"},
                  {l:"Karb",    v:+(secBesin.karb*(+yemekGram||secBesin.por)/secBesin.por).toFixed(1),birim:"g",c:"#f59e0b"},
                  {l:"Yağ",     v:+(secBesin.yag *(+yemekGram||secBesin.por)/secBesin.por).toFixed(1),birim:"g",c:"#ef4444"},
                  {l:"Lif",     v:+((secBesin.lif||0)*(+yemekGram||secBesin.por)/secBesin.por).toFixed(1),birim:"g",c:"#8b5cf6"},
                  {l:"Sodyum",  v:Math.round((secBesin.sod||0)*(+yemekGram||secBesin.por)/secBesin.por),birim:"mg",c:"#f97316"},
                ].map(m=>(
                  <div key={m.l} style={{background:m.c+"18",borderRadius:10,padding:8,textAlign:"center"}}>
                    <div style={{fontSize:m.l==="Kalori"?18:14,fontWeight:900,color:m.c}}>{m.v}</div>
                    <div style={{fontSize:9,color:r.muted}}>{m.l} ({m.birim})</div>
                  </div>
                ))}
              </div>

              {/* Vitamin/Mineral + günlük ihtiyaç kıyaslaması */}
              {p.kilo&&(
                <div style={{background:d?"#0f172a":"#f9fafb",borderRadius:12,padding:12,marginBottom:12}}>
                  <div style={{fontSize:10,fontWeight:700,color:r.sub,marginBottom:8}}>VİTAMİN & MİNERAL — {p.kilo}kg için günlük tavsiye</div>
                  {[
                    {l:"Demir",    v:+((secBesin.demir ||0)*(+yemekGram||secBesin.por)/secBesin.por).toFixed(1), birim:"mg",  ihtiyac:+p.cinsiyet==="kadin"?18:8,  renk:"#ef4444"},
                    {l:"Kalsiyum", v:Math.round((secBesin.kals||0)*(+yemekGram||secBesin.por)/secBesin.por),    birim:"mg",  ihtiyac:1000,                         renk:"#f97316"},
                    {l:"Vit C",    v:Math.round((secBesin.vitC||0)*(+yemekGram||secBesin.por)/secBesin.por),    birim:"mg",  ihtiyac:90,                           renk:"#f59e0b"},
                    {l:"Vit D",    v:+((secBesin.vitD||0)*(+yemekGram||secBesin.por)/secBesin.por).toFixed(1),  birim:"mcg", ihtiyac:20,                           renk:"#fbbf24"},
                    {l:"Vit B12",  v:+((secBesin.vitB12||0)*(+yemekGram||secBesin.por)/secBesin.por).toFixed(1),birim:"mcg", ihtiyac:2.4,                          renk:"#8b5cf6"},
                  ].map(m=>{
                    const pct=Math.min(100,(m.v/m.ihtiyac)*100);
                    return(
                      <div key={m.l} style={{marginBottom:7}}>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:r.sub,marginBottom:2}}>
                          <span>{m.l}</span>
                          <span style={{fontWeight:700,color:m.renk}}>{m.v}{m.birim} / günlük {m.ihtiyac}{m.birim} tavsiye</span>
                        </div>
                        <div style={{...PB,height:5,marginTop:0}}><div style={{...PF(pct,m.renk),height:5}}/></div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Kalori etkisi önizleme */}
              <div style={{background:d?"#0f2a1a":"#f0fdf4",borderRadius:12,padding:12,marginBottom:14}}>
                <div style={{fontSize:11,fontWeight:700,color:"#16a34a",marginBottom:4}}>Bu besini eklersen:</div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:r.text}}>
                  <span>Şimdiki toplam</span><span style={{fontWeight:700}}>{topKal} kcal</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#16a34a"}}>
                  <span>+ Bu besin</span><span style={{fontWeight:700}}>+{gramKalHesapla(secBesin.kal,secBesin.por,+yemekGram)} kcal</span>
                </div>
                <div style={{borderTop:`1px solid ${r.brd}`,marginTop:6,paddingTop:6,display:"flex",justifyContent:"space-between",fontSize:13,color:r.text}}>
                  <span style={{fontWeight:700}}>Yeni toplam</span>
                  <span style={{fontWeight:900,color:topKal+gramKalHesapla(secBesin.kal,secBesin.por,+yemekGram)>HEDEF?"#ef4444":"#16a34a"}}>
                    {topKal+gramKalHesapla(secBesin.kal,secBesin.por,+yemekGram)} kcal
                  </span>
                </div>
              </div>

              <div style={{...PB,marginBottom:14}}><div style={PF(((topKal+gramKalHesapla(secBesin.kal,secBesin.por,+yemekGram))/HEDEF)*100, topKal+gramKalHesapla(secBesin.kal,secBesin.por,+yemekGram)>HEDEF?"#ef4444":"#16a34a")}/></div>

              <button style={{...BTN(),width:"100%",padding:"13px 0",fontSize:15}} onClick={yemekEkle}>Öğüne Ekle</button>
            </div>
          </div>
        )}

        {/* PAYLAŞIM MODAL */}
        {psModal&&(
          <div style={{position:"fixed",inset:0,background:"#0009",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setPsModal(false)}>
            <div style={{background:r.card,borderRadius:"18px 18px 0 0",padding:22,width:"100%",maxWidth:430,maxHeight:"85vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
                <div style={{fontSize:17,fontWeight:900,color:r.text}}>Günü Paylaş</div>
                <button onClick={()=>setPsModal(false)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:r.sub}}>×</button>
              </div>
              <div style={{background:d?"#0f172a":"#f9fafb",borderRadius:12,padding:14,marginBottom:14}}>
                <div style={{fontWeight:800,color:r.text,marginBottom:6}}>📊 Günlük Özet</div>
                <div style={{fontSize:13,color:r.sub,lineHeight:1.9}}>
                  🗓 {bugunKey()}<br/>
                  🔥 Kalori: {topKal} / {HEDEF} kcal<br/>
                  💪 Protein: {Math.round(topPro)}g | Karb: {Math.round(topKarb)}g | Yağ: {Math.round(topYag)}g<br/>
                  💧 Su: {bugSu} / {suHed} ml<br/>
                  🏃 Spor: {topSpor} kcal yakıldı<br/>
                  {bmi&&`📏 BMI: ${bmi} (${bmiD?.etiket})`}
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button style={{...BTN("#16a34a"),flex:1,padding:"11px 0"}} onClick={()=>{
                  const txt=`Doya Günlük Özet\n🗓 ${bugunKey()}\n🔥 ${topKal}/${HEDEF} kcal\n💧 ${bugSu}/${suHed}ml\n🏃 ${topSpor} kcal spor`;
                  navigator.clipboard?.writeText(txt);
                  setPsModal(false);
                }}>📋 Kopyala</button>
              </div>
            </div>
          </div>
        )}

        {/* ŞİKAYET MODAL */}
        {sikayet.modal&&(
          <div style={{position:"fixed",inset:0,background:"#0009",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
            <div style={{background:r.card,borderRadius:18,padding:22,maxWidth:380,width:"100%"}}>
              <div style={{fontSize:15,fontWeight:900,color:r.text,marginBottom:4}}>
                {sikayet.tip==="foto"?"📷 Fotoğrafı Bildir":"⚑ Kullanıcıyı Bildir"}
              </div>
              <div style={{fontSize:11,color:r.muted,marginBottom:12}}>
                {sikayet.tip==="foto"?"Bu fotoğraf uygunsuz, zararlı veya yanıltıcı içerik barındırıyor.":"Bu kullanıcının davranışını veya içeriğini bildiriyorsunuz."}
              </div>
              {sikayet.tip==="foto"&&sikayet.postFotoUrl&&(
                <div style={{borderRadius:10,overflow:"hidden",marginBottom:12,maxHeight:120}}>
                  <img src={sikayet.postFotoUrl} style={{width:"100%",height:120,objectFit:"cover",display:"block",opacity:.7}} alt=""/>
                </div>
              )}
              <div style={{marginBottom:10}}>
                <div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:6}}>Şikayet Sebebi</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                  {(sikayet.tip==="foto"
                    ?["Müstehcen içerik","Şiddet içeriyor","Yanıltıcı/sahte","Fikri mülkiyet","Diğer"]
                    :["Spam","Taciz","Nefret söylemi","Sahte hesap","Diğer"]
                  ).map(s=>(
                    <button key={s} onClick={()=>setSikayet(p=>({...p,sebep:s}))}
                      style={{padding:"5px 10px",border:`1.5px solid ${sikayet.sebep===s?"#ef4444":r.inpB}`,borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",background:sikayet.sebep===s?"#fef2f2":r.inp,color:sikayet.sebep===s?"#ef4444":r.sub,fontFamily:"'Nunito',sans-serif"}}>
                      {s}
                    </button>
                  ))}
                </div>
                <textarea style={{...IS,height:60,resize:"none"}} placeholder="Ek açıklama (isteğe bağlı)..." value={sikayet.sebep.length>0&&!["Spam","Taciz","Nefret söylemi","Sahte hesap","Müstehcen içerik","Şiddet içeriyor","Yanıltıcı/sahte","Fikri mülkiyet","Diğer"].includes(sikayet.sebep)?sikayet.sebep:""} onChange={e=>setSikayet(p=>({...p,sebep:e.target.value}))}/>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button style={{...BTN("#ef4444"),flex:1,padding:"10px 0"}} onClick={async()=>{
                  if(sikayet.sebep.trim()){
                    const bildirilenPost = paylasimlar.find(p=>p.id===sikayet.postId);
                    await sikayetGonder({
                      eden:aktif?.uid, hedef:sikayet.hedef,
                      sebep:sikayet.sebep, tip:sikayet.tip,
                      postId:sikayet.postId||null,
                      postFotoUrl:sikayet.postFotoUrl||null,
                      icerik:bildirilenPost?.icerik||null,
                      isim:kullanicilar.find(u=>u.uid===sikayet.hedef)?.isim||"",
                      islem:null
                    }).catch(console.error);
                  }
                  setSikayet({hedef:null,sebep:"",modal:false,tip:"kullanici",postId:null,postFotoUrl:null});
                }}>Gönder</button>
                <button style={{...BTN("#6b7280"),flex:1,padding:"10px 0"}} onClick={()=>setSikayet({hedef:null,sebep:"",modal:false,tip:"kullanici",postId:null,postFotoUrl:null})}>İptal</button>
              </div>
            </div>
          </div>
        )}

        {/* DÖNEM ÖZETİ POPUP */}
        {donemOzetGoster&&donemOzetTip&&(()=>{
          const {tip,donemAdi,kal,pro,adim,su,aktifGun}=donemOzetTip;
          const tipLabel=tip==="yil"?"🗓 Yıl Özeti":tip==="ay"?"📆 Ay Özeti":"📅 Hafta Özeti";
          const tipRenk=tip==="yil"?"linear-gradient(135deg,#7c3aed,#4f46e5)":tip==="ay"?"linear-gradient(135deg,#2563eb,#1d4ed8)":"linear-gradient(135deg,#16a34a,#15803d)";
          const istatler=[
            {l:"🔥 Kalori",v:Math.round(kal||0).toLocaleString()+" kcal",renk:"#f59e0b"},
            {l:"💪 Protein",v:Math.round(pro||0)+"g",renk:"#16a34a"},
            {l:"👟 Adım",v:(adim||0).toLocaleString(),renk:"#2563eb"},
            {l:"💧 Su",v:(Math.round((su||0)/100)/10)+"L",renk:"#0ea5e9"},
            {l:"📅 Aktif Gün",v:(aktifGun||0)+" gün",renk:"#8b5cf6"},
            {l:"🏅 Puan",v:puan+" pts",renk:"#f59e0b"},
          ];

          // Arkadaş haftalık özeti
          const arkListeTam=[
            ...arkadaslar.map(a=>({uid:a.uid,isim:a.isim,veri:paylasimDB[a.uid]||{}})),
          ];
          const arkHafta=arkListeTam.map(ark=>{
            const bugunObj=new Date();
            const farkGun=bugunObj.getDay()===0?6:bugunObj.getDay()-1;
            let aKal=0,aPro=0,aAdim=0,aSu=0,aAktif=0;
            for(let i=0;i<7;i++){
              const dd=new Date(bugunObj);dd.setDate(bugunObj.getDate()-farkGun+i);
              const kk=dd.getFullYear()+"-"+String(dd.getMonth()+1).padStart(2,"0")+"-"+String(dd.getDate()).padStart(2,"0");
              const gv=(ark.veri.gunluk||{})[kk]||{};
              const ys=gv.yemekler||[];
              const gKal=ys.reduce((s,y)=>s+(+y.kal||0),0);
              if(gKal>0)aAktif++;
              aKal+=gKal;
              aPro+=ys.reduce((s,y)=>s+(+y.pro||0),0);
              aAdim+=(+gv.adim||0);
              aSu+=(+gv.su||0);
            }
            return {uid:ark.uid,isim:ark.isim,kal:Math.round(aKal),pro:Math.round(aPro),adim:Math.round(aAdim),su:Math.round(aSu/100)/10,aktif:aAktif};
          }).filter(a=>a.aktif>0||a.uid==="bendensize769");

          return(
            <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:900,background:"rgba(0,0,0,.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 16px"}} onClick={()=>setDonemOzetGoster(false)}>
              <div onClick={e=>e.stopPropagation()} style={{background:d?"#1e293b":"#fff",borderRadius:24,padding:22,width:"100%",maxWidth:400,boxShadow:"0 20px 60px #0006",animation:"slideUp 0.35s ease-out",maxHeight:"90vh",overflowY:"auto"}}>
                <style>{`@keyframes slideUp{from{opacity:0;transform:scale(0.85) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>

                {/* Başlık */}
                <div style={{background:tipRenk,borderRadius:16,padding:"14px 18px",color:"#fff",marginBottom:14,textAlign:"center"}}>
                  <div style={{fontSize:11,fontWeight:700,opacity:.85,marginBottom:3}}>{tipLabel}</div>
                  <div style={{fontSize:22,fontWeight:900}}>{donemAdi}</div>
                  <div style={{fontSize:12,opacity:.85,marginTop:3}}>tamamlandı! 🎉</div>
                </div>

                {/* Kendi istatistikler */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                  {istatler.map(s=>(
                    <div key={s.l} style={{background:d?"#0f172a":"#f8fafc",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
                      <div style={{fontSize:9,color:"#94a3b8",fontWeight:700,marginBottom:3}}>{s.l}</div>
                      <div style={{fontSize:17,fontWeight:900,color:s.renk}}>{s.v}</div>
                    </div>
                  ))}
                </div>

                {/* ── Arkadaşların Bu Hafta ── */}
                {arkHafta.length>0&&tip==="hafta"&&(
                  <div style={{background:d?"#0f172a":"#f0fdf4",borderRadius:16,padding:14,marginBottom:14,border:`1.5px solid ${d?"#16a34a33":"#bbf7d0"}`}}>
                    <div style={{fontSize:12,fontWeight:900,color:"#16a34a",marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
                      <span>👥 Arkadaşların Bu Hafta</span>
                      <span style={{fontSize:10,background:"#16a34a",color:"#fff",borderRadius:20,padding:"2px 8px",fontWeight:700}}>{arkHafta.length}</span>
                    </div>
                    {arkHafta.map((a,i)=>(
                      <div key={a.uid} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<arkHafta.length-1?`1px solid ${d?"#1e293b":"#dcfce7"}`:"none"}}>
                        {/* Avatar */}
                        <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#16a34a,#059669)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:900,color:"#fff",flexShrink:0}}>
                          {a.isim[0]}
                        </div>
                        {/* İsim + istatler */}
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:12,fontWeight:800,color:r.text,marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.isim}</div>
                          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                            <span style={{fontSize:10,background:d?"#1e293b":"#fff",border:"1px solid #fde68a",borderRadius:8,padding:"2px 7px",color:"#f59e0b",fontWeight:700}}>🔥 {a.kal.toLocaleString()} kcal</span>
                            <span style={{fontSize:10,background:d?"#1e293b":"#fff",border:"1px solid #bbf7d0",borderRadius:8,padding:"2px 7px",color:"#16a34a",fontWeight:700}}>💪 {a.pro}g</span>
                            <span style={{fontSize:10,background:d?"#1e293b":"#fff",border:"1px solid #bfdbfe",borderRadius:8,padding:"2px 7px",color:"#2563eb",fontWeight:700}}>👟 {(a.adim/1000).toFixed(1)}K</span>
                          </div>
                        </div>
                        {/* Aktif gün */}
                        <div style={{textAlign:"center",flexShrink:0}}>
                          <div style={{fontSize:16,fontWeight:900,color:"#8b5cf6"}}>{a.aktif}</div>
                          <div style={{fontSize:9,color:r.muted}}>aktif gün</div>
                        </div>
                      </div>
                    ))}
                    <button onClick={()=>{setDonemOzetGoster(false);setTab("arkadaslar");}} style={{width:"100%",padding:"9px 0",marginTop:10,background:"none",border:`1px solid ${d?"#16a34a66":"#86efac"}`,borderRadius:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12,color:"#16a34a"}}>
                      👥 Tüm arkadaşlarına bak →
                    </button>
                  </div>
                )}

                <button onClick={()=>setDonemOzetGoster(false)} style={{...BTN("#16a34a"),width:"100%",padding:"12px 0",fontSize:14,fontWeight:800,marginBottom:8}}>
                  Harika! Devam Et →
                </button>
                <button onClick={()=>{setDonemOzetGoster(false);setTab("profil");setProfilSekme("performans");requestAnimationFrame(()=>window.scrollTo(0,0));}} style={{width:"100%",padding:"10px 0",background:"none",border:`1px solid ${d?"#334155":"#e2e8f0"}`,borderRadius:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12,color:r.sub}}>
                  📊 Detaylı Performans Gör
                </button>
              </div>
            </div>
          );
        })()}

        {/* ── HAFTALIK ÖZET MODALİ ── */}
        {hpModal&&(()=>{
          const bugun=new Date();
          const bugunK=tarihKey(bugun);
          const pazFark=bugun.getDay()===0?6:bugun.getDay()-1;
          const GUN_TAM=["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"];

          const haftaGunler=Array.from({length:7},(_,i)=>{
            const d=new Date(bugun);d.setDate(bugun.getDate()-pazFark+i);return d;
          });

          const gunHesapla=(dd)=>{
            const k=tarihKey(dd);
            const v=gunV(k);
            const ys=v.yemekler||[];
            const gKal=ys.reduce((s,y)=>s+(+y.kal||0),0);
            const sporK=(v.spor||[]).reduce((s,sp)=>s+(+sp.kcal||0),0);
            const adim=+v.adim||0;
            const hasFood=ys.length>0;
            const yakim=hasFood?Math.round((tdee||2000)+sporK+adim*0.04):0;
            const yildizliYs=ys.filter(y=>y.yildiz>0);
            const gYildiz=yildizliYs.length>0?Math.round(yildizliYs.reduce((s,y)=>s+(+y.yildiz||0),0)/yildizliYs.length*10)/10:null;
            return {k,d:dd,gKal,yakim,fark:hasFood?gKal-yakim:null,urun:ys.length,adim,su:+v.su||0,gYildiz,sporK};
          };

          const haftaV=haftaGunler.map(gunHesapla);
          const aktifGunler=haftaV.filter(g=>g.urun>0);
          const topKal=Math.round(aktifGunler.reduce((s,g)=>s+g.gKal,0));
          const topYakim=Math.round(aktifGunler.reduce((s,g)=>s+g.yakim,0));
          const topAdim=Math.round(haftaV.reduce((s,g)=>s+g.adim,0));
          const topSu=Math.round(haftaV.reduce((s,g)=>s+g.su,0));
          const haftaFark=topKal-topYakim;
          const yildizliG=aktifGunler.filter(g=>g.gYildiz);
          const haftaYildiz=yildizliG.length>0?Math.round(yildizliG.reduce((s,g)=>s+g.gYildiz,0)/yildizliG.length*10)/10:null;

          const secK2=hpSecGun||bugunK;
          const secV=haftaV.find(g=>g.k===secK2)||haftaV[pazFark]||haftaV[0];

          const fR=(f)=>f>300?"#ef4444":f>0?"#f59e0b":f>-300?"#22c55e":"#2563eb";
          const yR=(v)=>v>=4?"#22c55e":v>=3?"#f59e0b":v>=2?"#f97316":"#ef4444";

          const YMini=({v})=>{
            if(!v)return null;
            const dolu=Math.floor(v);const yarim=v-dolu>=0.5;
            return(
              <span style={{display:"inline-flex",alignItems:"center",gap:1}}>
                {Array.from({length:5},(_,i)=>(
                  <span key={i} style={{fontSize:11,color:i<dolu?"#f59e0b":i===dolu&&yarim?"#f59e0b":"#d1d5db",opacity:i===dolu&&yarim?0.55:1}}>★</span>
                ))}
                <span style={{fontSize:10,fontWeight:800,color:"#f59e0b",marginLeft:2}}>{v.toFixed(1)}</span>
              </span>
            );
          };

          return(
            <div style={{position:"fixed",inset:0,zIndex:950,background:"rgba(0,0,0,.65)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setHpModal(false)}>
              <div onClick={e=>e.stopPropagation()} style={{
                background:d?"#1e293b":"#fff",
                borderRadius:"24px 24px 0 0",
                width:"100%",maxWidth:480,
                maxHeight:"90vh",overflowY:"auto",
                padding:"0 0 32px",
                boxShadow:"0 -8px 40px #0005",
                animation:"slideUp2 0.3s ease-out",
              }}>
                <style>{`@keyframes slideUp2{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>

                {/* Tutamaç + başlık */}
                <div style={{background:"linear-gradient(135deg,#16a34a,#15803d)",padding:"16px 20px 20px",borderRadius:"24px 24px 0 0",color:"#fff",position:"relative"}}>
                  <div style={{width:36,height:4,background:"rgba(255,255,255,.4)",borderRadius:2,margin:"0 auto 14px"}}/>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontSize:16,fontWeight:900}}>📊 Haftalık Özet</div>
                      <div style={{fontSize:11,opacity:.85,marginTop:2}}>
                        {haftaGunler[0].getDate()} {AYLAR[haftaGunler[0].getMonth()]} – {haftaGunler[6].getDate()} {AYLAR[haftaGunler[6].getMonth()]}
                      </div>
                    </div>
                    <button onClick={()=>setHpModal(false)} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:10,padding:"4px 10px",color:"#fff",fontSize:18,cursor:"pointer",lineHeight:1}}>×</button>
                  </div>

                  {/* Haftalık 3 özet */}
                  <div style={{display:"flex",gap:8,marginTop:12}}>
                    {[
                      {l:"Aktif Gün",v:aktifGunler.length+" / 7",c:"#fff"},
                      {l:"Kalori Farkı",v:aktifGunler.length>0?(haftaFark>0?"+":"")+Math.round(haftaFark/100)/10+"K":"—",c:aktifGunler.length>0?fR(haftaFark):"rgba(255,255,255,.6)"},
                      {l:"Toplam Adım",v:(topAdim/1000).toFixed(1)+"K",c:"#fff"},
                    ].map(s=>(
                      <div key={s.l} style={{flex:1,background:"rgba(255,255,255,.15)",borderRadius:12,padding:"8px 6px",textAlign:"center"}}>
                        <div style={{fontSize:14,fontWeight:900,color:s.c}}>{s.v}</div>
                        <div style={{fontSize:9,opacity:.8,marginTop:2}}>{s.l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Haftalık yıldız */}
                  {haftaYildiz&&(
                    <div style={{marginTop:10,display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,255,255,.12)",borderRadius:12,padding:"8px 12px"}}>
                      <div style={{fontSize:10,fontWeight:700,opacity:.9}}>⭐ Haftalık Ort. Yıldız</div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <YMini v={haftaYildiz}/>
                        <span style={{fontSize:10,fontWeight:800,color:haftaYildiz>=4?"#86efac":haftaYildiz>=3?"#fde68a":"#fca5a5"}}>
                          {haftaYildiz>=4?"Harika!":haftaYildiz>=3?"İyi":haftaYildiz>=2?"Gelişebilir":"Dikkat!"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 7 gün kartları */}
                <div style={{padding:"14px 16px 0"}}>
                  <div style={{fontSize:11,fontWeight:800,color:r.sub,marginBottom:8}}>Günlük Kalori & Yıldız Detayı</div>
                  <div style={{display:"flex",gap:5,overflowX:"auto",paddingBottom:6,scrollbarWidth:"none"}}>
                    {haftaV.map((gv,i)=>{
                      const isSec=gv.k===secK2;
                      const isBug=gv.k===bugunK;
                      const has=gv.urun>0;
                      const renk=fR(gv.fark);
                      return(
                        <div key={gv.k} onClick={()=>setHpSecGun(isSec?null:gv.k)} style={{
                          flexShrink:0,width:50,borderRadius:14,padding:"10px 4px 8px",textAlign:"center",cursor:"pointer",
                          border:`2px solid ${isSec?"#16a34a":isBug?"#86efac44":has?renk+"44":d?"#1e293b":"#e2e8f0"}`,
                          background:isSec?"#16a34a":has?(d?"#0f172a":"#f0fdf4"):(d?"#1e293b":"#f8fafc"),
                          transition:"all .2s",
                          boxShadow:isSec?"0 4px 14px #16a34a44":"none",
                        }}>
                          <div style={{fontSize:10,fontWeight:900,color:isSec?"#fff":isBug?"#16a34a":r.sub,marginBottom:2}}>
                            {["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"][i]}
                          </div>
                          <div style={{fontSize:9,color:isSec?"rgba(255,255,255,.65)":r.muted,marginBottom:5}}>{gv.d.getDate()}</div>
                          <div style={{fontSize:17,fontWeight:900,color:isSec?"#fff":has?"#16a34a":"#cbd5e1",lineHeight:1}}>{has?gv.urun:"·"}</div>
                          <div style={{fontSize:8,color:isSec?"rgba(255,255,255,.7)":r.muted,marginBottom:4}}>{has?"ürün":""}</div>
                          {has&&gv.fark!==null&&(
                            <div style={{fontSize:8,fontWeight:800,color:isSec?"#fff":fR(gv.fark),background:isSec?"rgba(255,255,255,.2)":fR(gv.fark)+"15",borderRadius:5,padding:"2px 0",marginBottom:3}}>
                              {gv.fark>0?"+":""}{Math.round(Math.abs(gv.fark)/100)/10}k
                            </div>
                          )}
                          {has&&gv.gYildiz&&(
                            <div style={{fontSize:9,fontWeight:900,color:isSec?"rgba(255,255,255,.9)":"#f59e0b"}}>{gv.gYildiz.toFixed(1)}★</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Seçili gün detayı */}
                {secV&&secV.urun>0&&(
                  <div style={{padding:"10px 16px 0"}}>
                    <div style={{background:d?"#0f172a":"#f8fafc",borderRadius:14,padding:14,border:`1.5px solid ${d?"#1e293b":"#e2e8f0"}`}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                        <div>
                          <div style={{fontSize:13,fontWeight:900,color:r.text}}>{GUN_TAM[haftaV.findIndex(g=>g.k===secK2)]} Performansı</div>
                          <div style={{fontSize:10,color:r.muted,marginTop:1}}>{secV.urun} ürün kaydedildi</div>
                          {secV.gYildiz&&(
                            <div style={{marginTop:4,display:"flex",alignItems:"center",gap:4}}>
                              <span style={{fontSize:9,color:r.sub,fontWeight:700}}>Günlük ort.:</span>
                              <YMini v={secV.gYildiz}/>
                            </div>
                          )}
                        </div>
                        <div style={{background:fR(secV.fark)+"18",borderRadius:11,padding:"8px 10px",textAlign:"center",border:`1.5px solid ${fR(secV.fark)}33`}}>
                          <div style={{fontSize:16,fontWeight:900,color:fR(secV.fark)}}>{secV.fark>0?"+":""}{(Math.round(secV.fark/100)/10).toFixed(1)}k</div>
                          <div style={{fontSize:8,color:fR(secV.fark),fontWeight:700}}>{secV.fark>0?"fazla":"eksik"} kcal</div>
                        </div>
                      </div>

                      {/* Kalori bar */}
                      <div style={{marginBottom:6}}>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:r.sub,fontWeight:700,marginBottom:4}}>
                          <span>🔥 Aldı: {secV.gKal} kcal</span><span>⚡ Yaktı: {secV.yakim} kcal</span>
                        </div>
                        <div style={{display:"flex",gap:3,height:10,borderRadius:6,overflow:"hidden"}}>
                          <div style={{flex:secV.gKal||1,background:"linear-gradient(90deg,#f59e0b,#fbbf24)",minWidth:4,borderRadius:"6px 0 0 6px"}}/>
                          <div style={{flex:Math.max(secV.yakim-secV.gKal,1)||1,background:"linear-gradient(90deg,#7c3aed,#8b5cf6)",minWidth:4,borderRadius:"0 6px 6px 0"}}/>
                        </div>
                      </div>

                      {/* Su + adım */}
                      <div style={{display:"flex",gap:6,marginTop:8}}>
                        <div style={{flex:1,background:d?"#1e293b":"#eff6ff",borderRadius:10,padding:"8px",textAlign:"center"}}>
                          <div style={{fontSize:13,fontWeight:900,color:"#2563eb"}}>{secV.su}ml</div>
                          <div style={{fontSize:8,color:r.muted}}>💧 su</div>
                        </div>
                        <div style={{flex:1,background:d?"#1e293b":"#f5f3ff",borderRadius:10,padding:"8px",textAlign:"center"}}>
                          <div style={{fontSize:13,fontWeight:900,color:"#7c3aed"}}>{(secV.adim||0).toLocaleString()}</div>
                          <div style={{fontSize:8,color:r.muted}}>👟 adım</div>
                        </div>
                        {secV.sporK>0&&<div style={{flex:1,background:d?"#1e293b":"#f0fdf4",borderRadius:10,padding:"8px",textAlign:"center"}}>
                          <div style={{fontSize:13,fontWeight:900,color:"#16a34a"}}>-{secV.sporK}</div>
                          <div style={{fontSize:8,color:r.muted}}>🏃 spor</div>
                        </div>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tam detay butonu */}
                <div style={{padding:"14px 16px 0"}}>
                  <button onClick={()=>{
                    setHpModal(false);
                    setTab("profil");
                    setProfilSekme("performans");
                    requestAnimationFrame(()=>{
                      if(perfPanelRef.current) perfPanelRef.current.scrollIntoView({behavior:"smooth",block:"start"});
                      else window.scrollTo(0,0);
                    });
                  }} style={{...BTN("#16a34a"),width:"100%",padding:"13px 0",fontSize:13,fontWeight:800}}>
                    📊 Tüm Performans Geçmişi →
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

                {/* ── AI FOTOĞRAF KALORİ TARAMA MODALİ ── */}
        {aiModal&&(
          <div style={{position:"fixed",inset:0,zIndex:960,background:"rgba(0,0,0,.7)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setAiModal(false)}>
            <div onClick={e=>e.stopPropagation()} style={{
              background:d?"#1e293b":"#fff",
              borderRadius:"24px 24px 0 0",
              width:"100%",maxWidth:480,
              maxHeight:"92vh",overflowY:"auto",
              padding:"0 0 36px",
              boxShadow:"0 -8px 40px #0006",
              animation:"slideUp2 0.3s ease-out",
            }}>
              {/* Başlık */}
              <div style={{background:"linear-gradient(135deg,#7c3aed,#6d28d9)",padding:"16px 20px 20px",borderRadius:"24px 24px 0 0",color:"#fff",position:"relative"}}>
                <div style={{width:36,height:4,background:"rgba(255,255,255,.4)",borderRadius:2,margin:"0 auto 14px"}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontSize:16,fontWeight:900}}>🤖 AI Kalori Tarayıcı</div>
                    <div style={{fontSize:11,opacity:.85,marginTop:2}}>Fotoğraf çek veya yükle — yapay zeka tahmin eder</div>
                  </div>
                  <button onClick={()=>setAiModal(false)} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:10,padding:"4px 10px",color:"#fff",fontSize:18,cursor:"pointer",lineHeight:1}}>×</button>
                </div>
              </div>

              <div style={{padding:"16px 16px 0"}}>

                {/* Fotoğraf yükleme alanı */}
                {!aiImg&&(
                  <div>
                    {/* Premium değilse */}
                    {!premiumPlus&&(
                      <div style={{background:d?"#1e1b4b":"#f5f3ff",border:"2px solid #7c3aed",borderRadius:14,padding:"14px",marginBottom:12,textAlign:"center"}}>
                        <div style={{fontSize:24,marginBottom:6}}>🤖</div>
                        <div style={{fontSize:13,fontWeight:900,color:"#7c3aed",marginBottom:4}}>AI Fotoğraf Analizi</div>
                        <div style={{fontSize:11,color:r.sub,marginBottom:10}}>Bu özellik sadece <b>Premium Plus</b> üyelerine açıktır.<br/>Günde 20 fotoğraf analizi hakkı.</div>
                        <button onClick={()=>{setAiModal(false);setTab("profil");}} style={{...BTN("#7c3aed"),width:"100%",padding:"10px 0",fontSize:12}}>
                          🤖 Plus'a Geç — {PREMIUM_PLUS_FIYAT}₺/ay
                        </button>
                      </div>
                    )}
                    {/* Limit doldu */}
                    {(premiumPlus||ekstraAiHak>0)&&aiGunlukKullanim>=(AI_GUNLUK_LIMIT+ekstraAiHak)&&(
                      <div style={{background:d?"#1c1a10":"#fef2f2",border:"1.5px solid #fca5a5",borderRadius:14,padding:"14px",marginBottom:12,textAlign:"center"}}>
                        <div style={{fontSize:24,marginBottom:6}}>⏰</div>
                        <div style={{fontSize:13,fontWeight:900,color:"#ef4444",marginBottom:4}}>Günlük limit doldu</div>
                        <div style={{fontSize:11,color:r.sub}}>Bugün {AI_GUNLUK_LIMIT+ekstraAiHak} analiz hakkını kullandın. Yarın yenilenir.</div>
                        <button onClick={()=>setTab("puan")} style={{...BTN("#f59e0b","8px 16px"),fontSize:12,marginTop:8}}>🛒 Ekstra Hak Al</button>
                      </div>
                    )}
                    {/* Plus ya da ekstra hak var + kullanılabilir */}
                    {(premiumPlus||ekstraAiHak>0)&&aiGunlukKullanim<(AI_GUNLUK_LIMIT+(premiumPlus?0:0)+ekstraAiHak)&&(
                      <div>
                        {/* Kalan hak */}
                        <div style={{background:d?"#1e293b":"#f0fdf4",borderRadius:12,padding:"8px 12px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <div style={{fontSize:11,color:r.sub}}>Bugünkü hak</div>
                          <div style={{fontSize:13,fontWeight:900,color:"#16a34a"}}>{(premiumPlus?AI_GUNLUK_LIMIT:0)+ekstraAiHak-aiGunlukKullanim} / {(premiumPlus?AI_GUNLUK_LIMIT:0)+ekstraAiHak} kaldı</div>
                        </div>
                        {/* Gizli input'lar */}
                        <input type="file" accept="image/*" capture="environment" id="aiCameraInput" style={{display:"none"}}
                          onChange={e=>{
                            const file=e.target.files[0]; if(!file)return;
                            const reader=new FileReader();
                            reader.onload=ev=>{
                              setAiImg(ev.target.result);
                              setAiSonuc(null); setAiHata(null);
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        <input type="file" accept="image/*" id="aiGalleryInput" style={{display:"none"}}
                          onChange={e=>{
                            const file=e.target.files[0]; if(!file)return;
                            const reader=new FileReader();
                            reader.onload=ev=>{
                              setAiImg(ev.target.result);
                              setAiSonuc(null); setAiHata(null);
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        {/* Çek / Yükle butonları */}
                        <div style={{display:"flex",gap:10,marginBottom:12}}>
                          <button onClick={()=>document.getElementById("aiCameraInput").click()}
                            style={{flex:1,background:d?"#1e293b":"#f5f3ff",border:"2px dashed #7c3aed",borderRadius:16,padding:"24px 12px",cursor:"pointer",textAlign:"center",fontFamily:"'Nunito',sans-serif"}}>
                            <div style={{fontSize:32,marginBottom:6}}>📸</div>
                            <div style={{fontSize:13,fontWeight:800,color:"#7c3aed"}}>Fotoğraf Çek</div>
                            <div style={{fontSize:10,color:r.muted,marginTop:2}}>Kamera ile çek</div>
                          </button>
                          <button onClick={()=>document.getElementById("aiGalleryInput").click()}
                            style={{flex:1,background:d?"#1e293b":"#f5f3ff",border:"2px dashed #7c3aed",borderRadius:16,padding:"24px 12px",cursor:"pointer",textAlign:"center",fontFamily:"'Nunito',sans-serif"}}>
                            <div style={{fontSize:32,marginBottom:6}}>🖼️</div>
                            <div style={{fontSize:13,fontWeight:800,color:"#7c3aed"}}>Galeriden Seç</div>
                            <div style={{fontSize:10,color:r.muted,marginTop:2}}>Kayıtlı fotoğraf</div>
                          </button>
                        </div>
                        {/* Açıklama kutusu */}
                        <div style={{marginBottom:10}}>
                          <div style={{fontSize:11,fontWeight:800,color:r.sub,marginBottom:5}}>📝 Yapay zekaya ipucu ver (isteğe bağlı)</div>
                          <textarea
                            value={aiNot}
                            onChange={e=>setAiNot(e.target.value)}
                            placeholder="Örn: 2 kişilik tavuk güveç, 200g pilav, ev yapımı köfte..."
                            style={{...IS,height:64,resize:"none",fontSize:12,lineHeight:1.5}}
                          ></textarea>
                          <div style={{fontSize:10,color:r.muted,marginTop:3}}>💡 Porsiyon bilgisi verirsen tahmin daha doğru olur</div>
                        </div>
                        {/* İpuçları */}
                        <div style={{background:d?"#0f172a":"#f8fafc",borderRadius:14,padding:"12px 14px",border:`1px solid ${d?"#1e293b":"#e2e8f0"}`}}>
                          <div style={{fontSize:11,fontWeight:800,color:r.sub,marginBottom:6}}>📸 En iyi sonuç için:</div>
                          {["Tabakta ne olduğu açıkça görünsün","İyi aydınlatılmış bir ortamda çek","Tek tabak daha doğru tahmin verir","Paket/etiket varsa o da görünsün"].map((t,i)=>(
                            <div key={i} style={{fontSize:11,color:r.muted,marginBottom:3}}>• {t}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Fotoğraf + analiz durumu */}
                {aiImg&&(
                  <div>
                    <div style={{position:"relative",marginBottom:12}}>
                      <img src={aiImg} alt="analiz" style={{width:"100%",borderRadius:16,maxHeight:220,objectFit:"cover"}}/>
                      <button
                        onClick={()=>{setAiImg(null);setAiSonuc(null);setAiHata(null);}}
                        style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,.6)",border:"none",borderRadius:20,width:28,height:28,color:"#fff",fontSize:14,cursor:"pointer",fontFamily:"'Nunito',sans-serif",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        ×
                      </button>
                    </div>

                    {/* Not + Gönder butonu — analiz başlamadıysa göster */}
                    {!aiSonuc&&!aiYukleniyor&&(
                      <div style={{marginBottom:12}}>
                        <textarea
                          value={aiNot}
                          onChange={e=>setAiNot(e.target.value)}
                          placeholder="Ek bilgi: 2 porsiyon, ev yapımı, tahin soslu... (isteğe bağlı)"
                          style={{...IS,height:56,resize:"none",fontSize:12,lineHeight:1.5,marginBottom:10}}
                        />
                        <button
                          onClick={()=>aiFotoAnalizEt(aiImg.split(",")[1],"image/jpeg",aiNot)}
                          style={{width:"100%",padding:"15px 0",borderRadius:14,border:"none",
                            background:"linear-gradient(135deg,#7c3aed,#6d28d9)",
                            color:"#fff",fontSize:16,fontWeight:900,cursor:"pointer",
                            fontFamily:"'Nunito',sans-serif",
                            boxShadow:"0 4px 18px #7c3aed50",
                            display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                          <span style={{fontSize:20}}>🔍</span> AI'ya Gönder — Analiz Et
                        </button>
                      </div>
                    )}

                    {/* Yükleniyor */}
                    {aiYukleniyor&&(
                      <div style={{textAlign:"center",padding:"20px 0"}}>
                        <div style={{fontSize:36,marginBottom:10,animation:"spin 1s linear infinite",display:"inline-block"}}>🔍</div>
                        <div style={{fontSize:14,fontWeight:800,color:"#7c3aed"}}>Yapay zeka analiz ediyor...</div>
                        <div style={{fontSize:11,color:r.muted,marginTop:4}}>Yemek tanınıyor, besinler hesaplanıyor</div>
                        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                      </div>
                    )}

                    {/* Hata */}
                    {aiHata&&(
                      <div style={{background:"#fef2f2",border:"1.5px solid #fca5a5",borderRadius:14,padding:"12px 14px",marginBottom:12,textAlign:"center"}}>
                        <div style={{fontSize:11,color:"#ef4444",fontWeight:700}}>{aiHata}</div>
                        <button onClick={()=>{setAiImg(null);setAiHata(null);}} style={{marginTop:8,...BTN("#ef4444","6px 16px"),fontSize:12}}>Tekrar Dene</button>
                      </div>
                    )}

                    {/* Sonuç */}
                    {aiSonuc&&!aiYukleniyor&&(()=>{
                      const s=aiSonuc;
                      const guvenRenk=s.guven==="yuksek"?"#22c55e":s.guven==="orta"?"#f59e0b":"#ef4444";
                      const guvenEt=s.guven==="yuksek"?"✅ Yüksek Güven":s.guven==="orta"?"⚠️ Orta Güven":"❓ Düşük Güven";
                      return(
                        <div>
                          {/* Ana sonuç kartı */}
                          <div style={{background:d?"#1e293b":"#f8fafc",border:`2px solid ${guvenRenk}55`,borderRadius:18,padding:"14px 16px",marginBottom:10}}>

                            {/* Başlık + kalori */}
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                              <div style={{flex:1,paddingRight:10}}>
                                <div style={{fontSize:17,fontWeight:900,color:r.text,lineHeight:1.2}}>{s.yemekAdi}</div>
                                <div style={{fontSize:11,color:r.muted,marginTop:3}}>Tahmini porsiyon: ~{s.porsiyon}{s.birim}</div>
                                <div style={{marginTop:5,background:guvenRenk+"20",color:guvenRenk,fontSize:10,fontWeight:800,padding:"3px 10px",borderRadius:20,display:"inline-block"}}>{guvenEt}</div>
                              </div>
                              <div style={{textAlign:"center",background:`linear-gradient(135deg,${guvenRenk}22,${guvenRenk}08)`,borderRadius:14,padding:"10px 14px",minWidth:70}}>
                                <div style={{fontSize:30,fontWeight:900,color:guvenRenk,lineHeight:1}}>{s.kal}</div>
                                <div style={{fontSize:10,color:guvenRenk,fontWeight:800}}>kcal</div>
                              </div>
                            </div>

                            {/* Makrolar - 4'lü grid */}
                            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:5,marginBottom:8}}>
                              {[
                                {l:"Protein",v:s.pro,c:"#16a34a",e:"💪"},
                                {l:"Karb",v:s.karb,c:"#f59e0b",e:"🌾"},
                                {l:"Yağ",v:s.yag,c:"#ef4444",e:"🫙"},
                                {l:"Lif",v:s.lif||0,c:"#8b5cf6",e:"🌿"},
                              ].map(m=>(
                                <div key={m.l} style={{background:d?"#0f172a":"#fff",borderRadius:10,padding:"8px 4px",textAlign:"center",border:`1px solid ${m.c}22`}}>
                                  <div style={{fontSize:11}}>{m.e}</div>
                                  <div style={{fontSize:14,fontWeight:900,color:m.c,lineHeight:1.1}}>{m.v}g</div>
                                  <div style={{fontSize:9,color:r.muted,marginTop:1}}>{m.l}</div>
                                </div>
                              ))}
                            </div>

                            {/* Açıklama */}
                            {s.aciklama&&<div style={{fontSize:11,color:r.sub,fontStyle:"italic",marginTop:4}}>💬 {s.aciklama}</div>}
                          </div>

                          {/* Parçalar (birden fazla besin varsa) */}
                          {s.parcalar&&s.parcalar.length>1&&(
                            <div style={{background:d?"#1e293b":"#f8fafc",borderRadius:14,padding:"10px 14px",marginBottom:10,border:`1px solid ${d?"#334155":"#e2e8f0"}`}}>
                              <div style={{fontSize:11,fontWeight:800,color:r.sub,marginBottom:8}}>📋 Tabaktaki bileşenler</div>
                              {s.parcalar.map((p,i)=>(
                                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:i<s.parcalar.length-1?`1px solid ${d?"#334155":"#f1f5f9"}`:"none"}}>
                                  <div>
                                    <div style={{fontSize:12,color:r.text,fontWeight:700}}>{p.ad}</div>
                                    {p.gram&&<div style={{fontSize:10,color:r.muted}}>~{p.gram}g</div>}
                                  </div>
                                  <div style={{fontSize:13,fontWeight:900,color:"#16a34a"}}>~{p.kal} kcal</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* ⚠️ Yapay Zeka Uyarısı */}
                          <div style={{background:d?"#1c1a10":"#fffbeb",border:"1.5px solid #fde68a",borderRadius:12,padding:"10px 14px",marginBottom:12}}>
                            <div style={{fontSize:11,fontWeight:800,color:"#92400e",marginBottom:3}}>⚠️ Önemli Uyarı</div>
                            <div style={{fontSize:10,color:"#a16207",lineHeight:1.5}}>
                              Bu değerler yapay zekanın tahminidir. Gerçek kalori pişirme yöntemi, porsiyon ve malzemelere göre değişir. Düşük güven seviyesindeki tahminlerde hata payı yüksektir. Diyet takibinde referans olarak kullanın.
                            </div>
                          </div>

                          {/* Öğün seçimi */}
                          <div style={{marginBottom:10}}>
                            <div style={{fontSize:11,fontWeight:800,color:r.sub,marginBottom:6}}>🍽️ Hangi öğüne eklensin?</div>
                            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                              {["Kahvaltı","Öğle","Akşam","Atıştırmalık"].map(og=>(
                                <button key={og} onClick={()=>setAiOgun(og)} style={{
                                  padding:"7px 14px",border:`2px solid ${aiOgun===og?"#7c3aed":d?"#334155":"#e2e8f0"}`,
                                  borderRadius:20,fontSize:12,fontWeight:800,cursor:"pointer",
                                  background:aiOgun===og?"#7c3aed":d?"#1e293b":"#fff",
                                  color:aiOgun===og?"#fff":r.sub,
                                  fontFamily:"'Nunito',sans-serif"
                                }}>{og}</button>
                              ))}
                            </div>
                          </div>

                          {/* Butonlar */}
                          <div style={{display:"flex",gap:8}}>
                            <button onClick={()=>{
                              const bg=bugunKey();
                              const gram=s.porsiyon||100;
                              const kayit={
                                id:Date.now(),
                                ad:s.yemekAdi+" 📷",
                                marka:"🤖 AI Tahmin",
                                kal:s.kal, gramKal:s.kal,
                                pro:s.pro,  gramPro:s.pro,
                                karb:s.karb,gramKarb:s.karb,
                                yag:s.yag,  gramYag:s.yag,
                                lif:s.lif||0,
                                gram,
                                saat:new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"}),
                                kat:aiOgun,
                                yildiz:null,
                              };
                              const eskiY=gunV(bg).yemekler||[];
                              const yeniGun={...gunV(bg),yemekler:[...eskiY,kayit]};
                              setGunluk(prev=>({...prev,[bg]:yeniGun}));
                              if(firebaseUID) gunVeriKaydet(firebaseUID,bg,yeniGun).catch(console.error);
                              setAiModal(false);
                              setTab("anasayfa");
                            }} style={{...BTN("#16a34a"),flex:2,padding:"13px 0",fontSize:13,fontWeight:800}}>
                              ✅ {aiOgun}'a Ekle
                            </button>
                            <button onClick={()=>{setAiImg(null);setAiSonuc(null);setAiHata(null);setAiNot("");}} style={{...BTN("#7c3aed"),flex:1,padding:"13px 0",fontSize:13}}>
                              🔄 Yeni
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

                {/* SERİ TOAST */}
        {seriMsg&&(
          <div style={{position:"fixed",top:70,left:"50%",transform:"translateX(-50%)",zIndex:600,background:seriMsg.tip==="yemek"?"#fff7ed":"#ecfdf5",border:`2px solid ${seriMsg.tip==="yemek"?"#f59e0b":"#16a34a"}`,borderRadius:16,padding:"14px 20px",boxShadow:"0 8px 32px #0002",display:"flex",alignItems:"center",gap:10,minWidth:240,maxWidth:340}} onClick={()=>setSeriMsg(null)}>
            <div style={{fontSize:28}}>{seriMsg.tip==="yemek"?"🍽️":"👟"}</div>
            <div>
              <div style={{fontWeight:900,fontSize:14,color:seriMsg.tip==="yemek"?"#ea580c":"#16a34a"}}>
                {seriMsg.gun} günlük seri! 🔥
              </div>
              <div style={{fontSize:11,color:"#6b7280"}}>
                {seriMsg.tip==="yemek"?"Her gün yemek kaydettirdin!":"10.000 adımı geçtin, tebrikler!"}
              </div>
            </div>
          </div>
        )}

        {/* ADIM SAYAR İZİN MODAL */}
        {adimIzinModal&&(
          <div style={{position:"fixed",inset:0,background:"#000a",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:16}}>
            <div style={{background:d?"#080e09":"#fff",border:`1px solid ${d?"rgba(255,255,255,.07)":"rgba(0,0,0,.06)"}`,borderRadius:22,padding:24,width:"100%",maxWidth:400}}>
              <div style={{fontSize:40,textAlign:"center",marginBottom:12}}>👟</div>
              <div style={{fontSize:17,fontWeight:900,color:r.text,textAlign:"center",marginBottom:8}}>Adım Sayar</div>
              <div style={{fontSize:13,color:r.sub,textAlign:"center",marginBottom:20,lineHeight:1.6}}>
                Doya adımlarını otomatik saymak için telefonunun <b>hareket sensörüne</b> erişmek istiyor.<br/>
                İzin verirsen her gün otomatik olarak çalışır, tekrar sorulmaz.
              </div>
              <button style={{...BTN("#f59e0b","13px 0"),width:"100%",marginBottom:10,fontSize:14}} onClick={()=>{
                setAdimIzinModal(false);
                setAdimAktif(true);
              }}>📱 İzin Ver ve Başlat</button>
              <button style={{background:"none",border:"none",width:"100%",padding:"10px 0",cursor:"pointer",fontSize:13,color:r.muted,fontFamily:"'Nunito',sans-serif"}} onClick={()=>{
                setAdimIzinModal(false);
                localStorage.setItem("doya_adim_izin","reddedildi");
              }}>Şimdi Değil</button>
            </div>
          </div>
        )}

        {/* INFLUENCER SÖZLEŞMESİ MODAL */}
        {sozlesmeModal&&(
          <div style={{position:"fixed",inset:0,background:"#000a",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
            <div style={{background:"#fff",borderRadius:18,padding:24,maxWidth:400,width:"100%",maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:16,fontWeight:900,color:"#111",marginBottom:14}}>Ortaklık Sözleşmesi</div>
              <div style={{fontSize:11.5,color:"#374151",lineHeight:2}}>
                <div style={{background:"#fff7ed",border:"1.5px solid #f59e0b",borderRadius:10,padding:"10px 12px",marginBottom:14,fontSize:11,color:"#92400e",fontWeight:700}}>
                  ⚠️ Bu sözleşmeyi dikkatlice okuyunuz. Onaylamanız hukuki bağlayıcılık taşır.
                </div>

                Bu sözleşme ("Sözleşme"), <b>Doya Beslenme Takip Uygulaması</b> ("Doya" veya "Platform") ile ortaklık başvurusu onaylanan <b>Influencer / İşletme Ortağı</b> ("Ortak") arasında kurulmaktadır. Başvuruyu onaylayarak ve referans kodunu kullanmaya başlayarak bu sözleşmenin tüm maddelerini okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.<br/><br/>

                <b>1. KAZANÇ MODELİ VE KOMİSYON</b><br/>
                Ortak, referans kodu aracılığıyla Doya'ya davet ettiği kullanıcıların ürettiği kazançtan aşağıdaki şekilde pay alır:<br/>
                <b>a) Aktif Kullanıcı Başına Sabit Ödeme:</b> Ortak'ın davet ettiği kullanıcılardan her biri, bir takvim ayı içinde en az <b>1.000 puan</b> kazanmışsa o kullanıcı "aktif" sayılır. Her aktif kullanıcı başına Ortak'a aylık <b>1 ₺ (bir Türk Lirası)</b> sabit ödeme yapılır.<br/>
                <b>b) Satın Alım Komisyonu:</b> Ortak'ın davet ettiği kullanıcıların gerçekleştirdiği premium satın alımlarından; Google Play ve Apple App Store komisyonları (%15–30) düşüldükten sonra kalan net tutarın <b>%50'si</b> Ortak'a ödenir.<br/>
                <b>c) Aktif Kullanıcı Tanımı:</b> Bir kullanıcının aktif sayılabilmesi için 30 takvim günü içinde uygulama içi puan sisteminde <b>1.000 puan</b> veya üzeri kazanmış olması şarttır. Bu eşiği karşılamayan kullanıcılar o ay için aktif sayılmaz ve komisyona dahil edilmez.<br/>
                Kazanç tutarı; aktif kullanıcı sayısına, satın alım hacmine ve platform komisyon politikalarına göre değişkenlik gösterir. Doya, herhangi bir asgari kazanç tutarı taahhüt etmez.<br/><br/>

                <b>2. ÖDEME KOŞULLARI</b><br/>
                Ödemeler her takvim ayının 1'inde, Ortak'ın sisteme kaydettiği IBAN hesabına yapılır. Minimum ödeme tutarı <b>50 ₺</b>'dir; bu tutara ulaşılmayan kazançlar bir sonraki ödeme dönemine aktarılır. Banka transfer süreçlerinden kaynaklanan gecikmelerden Doya sorumlu tutulamaz. Hatalı IBAN bilgisi nedeniyle gerçekleşmeyen ödemelerden Ortak sorumludur.<br/><br/>

                <b>3. REKABET YASAĞI VE ANLИК FESİH HAKKI</b><br/>
                Ortak; aktif ortaklık süresi boyunca aşağıdaki faaliyetlerde bulunamaz:<br/>
                • Doya ile doğrudan rekabet eden beslenme takibi, kalori sayacı, diyet uygulamaları veya benzeri dijital sağlık ürünlerini sosyal medya hesaplarında, YouTube kanallarında, blog veya podcast gibi kanallarında tanıtamaz, reklam yapamaz, ortaklık/sponsorluk anlaşması imzalayamaz.<br/>
                • Kullanıcıları Doya'dan rakip platformlara yönlendirecek içerik üretemez.<br/><br/>
                <b>Bu maddenin ihlali halinde Doya, herhangi bir ihbar süresi, ön bildirim veya gerekçe gösterme yükümlülüğü olmaksızın ortaklığı ANINDA feshedebilir.</b> Fesih tarihine kadar birikmiş ve henüz ödenmemiş kazançlar minimum ödeme tutarını geçiyorsa bir sonraki dönemde ödenir; geçmiyorsa ödenmez.<br/><br/>

                <b>4. İÇERİK STANDARTLARI VE MARKA KULLANIMI</b><br/>
                Ortak; Doya adını, logosunu ve uygulama görsellerini yalnızca Doya'nın onayladığı biçimde kullanabilir. Ortak, Doya hakkında yanıltıcı, abartılı, bilimsel dayanaktan yoksun veya sağlık vaadinde bulunan hiçbir içerik üretemez. Ortak, sponsorlu içeriklerini yasal zorunluluklar çerçevesinde "reklam", "sponsorlu" veya "#reklam" etiketiyle açıkça işaretlemekle yükümlüdür; aksi hâlde doğacak idari ve hukuki yaptırımların sorumluluğu tamamen Ortak'a aittir.<br/><br/>

                <b>5. PERFORMANS VE AKTİFLİK ZORUNLULUĞU</b><br/>
                Ortak, onaylanmasının ardından ilk <b>30 gün</b> içinde en az <b>1 aktif kullanıcı</b> davet etmekle yükümlüdür. Ardışık <b>3 ay</b> boyunca hiç yeni kullanıcı davet edilmemesi halinde Doya, herhangi bir bildirim yapmaksızın ortaklık statüsünü askıya alabilir ya da tamamen sonlandırabilir.<br/><br/>

                <b>6. DOYA'NIN TEK TARAFLI FESİH HAKKI</b><br/>
                Doya, aşağıdaki durumlarda ortaklığı önceden bildirim yapmaksızın derhal feshedebilir:<br/>
                • Rekabet yasağının ihlali (Madde 3)<br/>
                • Yanıltıcı, hakaret içerikli veya Doya'nın itibarını zedeleyen içerik paylaşımı<br/>
                • Sahte hesap, bot trafik veya hile yoluyla referans kodu kullanımı<br/>
                • Kullanıcıları manipüle edecek biçimde maddi vaat içeren paylaşımlar<br/>
                • Ortağın mahkûmiyet kararıyla sonuçlanan suç işlemesi<br/>
                • Doya'nın marka bütünlüğünü, güvenilirliğini veya ticari itibarını zedeleyecek herhangi bir kamuoyu açıklaması<br/><br/>
                Bunların dışında Doya, gerekçe göstermeksizin ortaklığı <b>15 gün</b> öncesinde yazılı bildirimle sonlandırabilir.<br/><br/>

                <b>7. GİZLİLİK VE TİCARİ SIRRN KORUNMASI</b><br/>
                Ortak; ortaklık kapsamında öğrendiği kullanıcı verilerini, gelir rakamlarını, komisyon oranlarını, sistem altyapı bilgilerini ve iş modelini üçüncü şahıslarla paylaşamaz, kendi çıkarı için kullanamaz. Bu yükümlülük sözleşmenin sona ermesinden sonra <b>2 yıl</b> daha geçerlidir.<br/><br/>

                <b>8. MALİ RİSK, ÖDEME GECİKMESİ VE İFLAS</b><br/>
                Doya'nın nakit akışı sorunları, beklenmedik gider artışları veya piyasa koşullarının kötüleşmesi durumunda ödemeler gecikmeli yapılabilir; bu durum Ortak'a önceden bildirilir. Doya'nın mahkeme kararıyla iflası hâlinde birikmiş kazançlar iflas masasına dahil edilir ve yasal süreç kapsamında ödeme yapılır ya da yapılamayabilir. Ortak bu finansal riski peşinen kabul etmiş sayılır.<br/><br/>

                <b>9. SINIRLI SORUMLULUK</b><br/>
                Doya, Ortak'ın içerik üretim faaliyetleri sırasında üçüncü kişilere verdiği zararlardan, telif hakkı ihlallerinden veya vergi yükümlülüklerinden hiçbir şekilde sorumlu tutulamaz. Ortak, kendi ürettiği içeriklerden doğan tüm hukuki ve mali sorumluluğu bizzat üstlenir.<br/><br/>

                <b>10. VERGİ, STOPAJ VE FATURA ZORUNLULUĞU</b><br/>
                <u>a) Fatura/Makbuz İbrazı:</u> Ortak, her ödeme dönemine ilişkin hizmet bedelini belgelemek amacıyla Doya'ya fatura veya serbest meslek makbuzu ibraz etmekle yükümlüdür. Fatura/makbuz ibraz edilmemesi durumunda Doya, brüt ödeme tutarı üzerinden yürürlükteki vergi mevzuatı kapsamında gerekli <b>stopaj kesintilerini</b> yaparak ilgili vergi dairelerine beyan eder ve yatırır; Ortak'a kalan net tutar ödenir. Bu kesinti bir ceza olmayıp yasal bir zorunluluktur.<br/><br/>
                <u>b) Stopaj Oranı:</u> Geçerli mevzuat çerçevesinde serbest meslek ödemelerinde uygulanan stopaj oranı (hâlihazırda brüt tutarın <b>%20'si</b>) esas alınır. Yasal oranın değişmesi hâlinde güncel oran otomatik olarak uygulanır; Ortak bu değişikliği ayrıca kabul etmiş sayılır.<br/><br/>
                <u>c) Vergi Mükellefiyeti:</u> Ortaklık kapsamında elde edilen gelirler üzerindeki tüm vergi ve yasal yükümlülükler (gelir vergisi, KDV vb.) münhasıran Ortak'a aittir. Doya'nın stopaj kesip yatırması, Ortak'ın kendi vergi beyan ve ödeme yükümlülüklerini ortadan kaldırmaz.<br/><br/>
                <u>d) Sorumluluk Reddi:</u> Ortak'ın hatalı veya eksik vergi beyanından, fatura kesmemesinden ya da muhasebe ihmâlinden doğacak her türlü idari para cezası, vergi ziyaı ve gecikme faizi münhasıran Ortak'a aittir; Doya bu konuda hiçbir sorumluluk kabul etmez.<br/><br/>

                <b>11. DEĞİŞİKLİK HAKKI</b><br/>
                Doya, sözleşme koşullarını, komisyon oranlarını ve ödeme politikalarını <b>15 gün</b> öncesinde Ortak'a e-posta yoluyla bildirerek değiştirebilir. Değişikliğin yürürlük tarihinden sonra referans kodu kullanılmaya devam edilmesi, yeni koşulların kabul edildiği anlamına gelir.<br/><br/>

                <b>12. UYUŞMAZLIK ÇÖZÜMÜ</b><br/>
                Bu sözleşmeden doğan uyuşmazlıklarda öncelikle taraflar arabuluculuk yoluna başvurur. Arabuluculukta uzlaşı sağlanamaması halinde <b>Adana mahkemeleri ve icra daireleri</b> yetkilidir; Türkiye Cumhuriyeti hukuku uygulanır.<br/><br/>

                <b>13. ORTAKLIK SÜRESİ VE YÜRÜRLÜK</b><br/>
                <u>a) Başlangıç ve Süre:</u> Bu sözleşme, Ortak'ın başvurusunun Doya tarafından onaylandığı tarihte yürürlüğe girer. Ortaklık süresi başlangıç tarihinden itibaren <b>3 (üç) ay</b>dır.<br/><br/>
                <u>b) Süre Uzatımı:</u> Ortaklık süresi sona ermeden en geç <b>7 gün</b> önce her iki taraf da itirazını yazılı olarak bildirmezse, sözleşme aynı koşullarla otomatik olarak <b>birer aylık dönemler</b> halinde uzar. Uzatım sınırsız kez tekrarlanabilir.<br/><br/>
                <u>c) Karşılıklı Uzatma:</u> Her iki tarafın da yazılı onay vermesi halinde sözleşme, belirlenen yeni koşullar ve/veya süreyle uzatılabilir. Uzatım teklifi Doya tarafından e-posta ile iletilir; Ortak'ın <b>5 iş günü</b> içinde yanıt vermemesi, teklifi reddettiği anlamına gelir.<br/><br/>
                <u>d) Süre Sonu:</u> Ortaklık süresi sona erdiğinde referans kodu otomatik olarak devre dışı bırakılır. Süre sonuna kadar kazanılmış ve henüz ödenmemiş komisyon tutarları, normal ödeme takviminde Ortak'a eksiksiz aktarılır.<br/><br/>
                <u>e) Performans Değerlendirmesi:</u> Doya, 3 aylık dönem sonunda ortağın performansını değerlendirme hakkını saklı tutar. İlk 3 ayda <b>en az 10 aktif kullanıcı</b> getirilememesi halinde Doya, uzatım teklifinde bulunmama hakkına sahiptir; bu durum hukuki bir yükümlülük doğurmaz.<br/><br/>

                <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"8px 12px",fontSize:10.5,color:"#166534"}}>
                  📌 <b>Önemli:</b> Bu sözleşme {new Date().toLocaleDateString("tr-TR")} tarihi itibarıyla geçerlidir.<br/>
                  İletişim: <b>{DESTEK_MAIL}</b> | Ortaklık: <b>{ORTAKLIK_MAIL}</b>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"flex-start",gap:8,margin:"14px 0",background:"#fff7ed",borderRadius:10,padding:10}}>
                <input type="checkbox" id="soz" checked={sozlesmeOnay} onChange={e=>setSozlesmeOnay(e.target.checked)} style={{marginTop:3,width:18,height:18,cursor:"pointer",accentColor:"#f59e0b"}}/>
                <label htmlFor="soz" style={{fontSize:12,color:"#374151",cursor:"pointer",lineHeight:1.6}}>Sözleşmenin tüm maddelerini okudum; <b>rekabet yasağı, anlık fesih hakkı, mali risk ve gizlilik</b> koşulları dahil tüm hükümleri kabul ediyorum. Bu onayın hukuki bağlayıcılık taşıdığını biliyor ve kabul ediyorum.</label>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button style={{...BTN(sozlesmeOnay?"#f59e0b":"#d1d5db"),flex:2,padding:"11px 0"}} onClick={()=>{if(!sozlesmeOnay)return;setSozlesmeModal(false);}}>Kabul Et ve Devam</button>
                <button style={{...BTN("#6b7280"),flex:1,padding:"11px 0"}} onClick={()=>{setSozlesmeModal(false);setSozlesmeOnay(false);}}>İptal</button>
              </div>
            </div>
          </div>
        )}

        {/* REFERANS BAŞVURU MODAL */}
        {refBasvuruModal&&(
          <div style={{position:"fixed",inset:0,background:"#000a",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setRefBasvuruModal(false)}>
            <div style={{background:r.card,borderRadius:"18px 18px 0 0",padding:22,width:"100%",maxWidth:430,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
                <div style={{fontSize:17,fontWeight:900,color:r.text}}>Ortak Başvurusu</div>
                <button onClick={()=>setRefBasvuruModal(false)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:r.sub}}>×</button>
              </div>
              <div style={{background:d?"#1c1a10":"#fffbeb",border:"1.5px solid #fcd34d",borderRadius:12,padding:12,marginBottom:14}}>
                <div style={{fontSize:12,fontWeight:700,color:"#d97706",marginBottom:4}}>🤝 Ortaklık hakkında</div>
                <div style={{fontSize:11,color:d?"#fde68a":"#78350f",lineHeight:1.7}}>
                  Davet ettiğin kişilerden gelir kazanırsın. Detaylar onaylanınca Para Panelinde gösterilir. <span style={{fontWeight:700,textDecoration:"underline",cursor:"pointer",color:"#d97706"}} onClick={()=>setSozlesmeModal(true)}>Ortaklık Sözleşmesini oku →</span>
                </div>
              </div>

              <div style={{marginBottom:12}}>
                <div style={CT}>Başvuru Türü</div>
                <div style={{display:"flex",gap:8}}>
                  {[{v:"influencer",l:"🎯 Influencer"},{v:"isletme",l:"🏢 İşletme"}].map(o=>(
                    <button key={o.v} onClick={()=>setBasTip(o.v)} style={{flex:1,padding:"10px",border:`2px solid ${basTip===o.v?"#f59e0b":r.inpB}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12,background:basTip===o.v?"#fffbeb":r.inp,color:basTip===o.v?"#d97706":r.sub}}>{o.l}</button>
                  ))}
                </div>
              </div>

              <div style={{background:d?"#1e293b":"#f9fafb",borderRadius:12,padding:12,marginBottom:12,fontSize:12,color:r.sub}}>
                <b>Şartlar:</b> Min. <b>1.000 takipçi</b> veya aktif işletme. Spam / yanıltıcı içerik yasak.
              </div>

              <div style={{marginBottom:10}}>
                <div style={{fontSize:12,color:r.sub,fontWeight:700,marginBottom:5}}>{basTip==="influencer"?"Platform & Kullanıcı Adı":"İşletme Adı & Adresi"}  <span style={{color:"#ef4444"}}>*</span></div>
                <input style={{...IS}} placeholder={basTip==="influencer"?"@instagram / youtube.com/kanal":"FitLife Spor Salonu - Kadıköy"} value={basAd} onChange={e=>setBasAd(e.target.value)}/>
              </div>

              {basTip==="influencer"&&(
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:12,color:r.sub,fontWeight:700,marginBottom:5}}>Aktif Olduğun Platformlar</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {["Instagram","YouTube","TikTok","Twitter/X","Facebook","Blog"].map(pl=>(
                      <button key={pl} onClick={()=>setBasPlatform(p=>p.includes(pl)?p.filter(x=>x!==pl):[...p,pl])} style={{padding:"5px 11px",border:`1.5px solid ${basPlatform.includes(pl)?"#f59e0b":r.inpB}`,borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",background:basPlatform.includes(pl)?"#fffbeb":r.inp,color:basPlatform.includes(pl)?"#d97706":r.sub,fontFamily:"'Nunito',sans-serif"}}>{pl}</button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{marginBottom:14}}>
                <div style={{fontSize:12,color:r.sub,fontWeight:700,marginBottom:5}}>Açıklama</div>
                <textarea style={{...IS,height:70,resize:"none"}} placeholder="Kendinizi kısaca tanıtın..." value={basAcik} onChange={e=>setBasAcik(e.target.value)}/>
              </div>

              {!sozlesmeOnay&&(
                <div style={{background:"#fef2f2",border:"1.5px solid #fca5a5",borderRadius:10,padding:"9px 12px",marginBottom:10,fontSize:11,color:"#ef4444"}}>
                  Göndermeden önce <span style={{fontWeight:700,textDecoration:"underline",cursor:"pointer"}} onClick={()=>setSozlesmeModal(true)}>Ortaklık Sözleşmesini</span> okuyup onaylamanız gerekiyor.
                </div>
              )}

              {basGonderildi?(
                <div style={{background:d?"#0f2a1a":"#f0fdf4",borderRadius:12,padding:14,textAlign:"center"}}>
                  <div style={{fontSize:24,marginBottom:4}}>✅</div>
                  <div style={{fontWeight:800,color:"#16a34a",fontSize:14}}>Başvurun Alındı!</div>
                  <div style={{fontSize:11,color:r.sub,marginTop:3}}>Admin inceleyecek ve bilgilendireceğiz.</div>
                </div>
              ):(
                <button style={{...BTN(sozlesmeOnay&&basAd?"#f59e0b":"#d1d5db"),width:"100%",padding:"12px 0"}} onClick={async()=>{
                  if(!sozlesmeOnay||!basAd)return;
                  const basvuru={id:Date.now(),uid:aktif?.uid,isim:aktif.isim,tip:basTip,platform:basPlatform.join(", "),acik:basAd+" | "+basAcik,onay:"bekliyor",firebaseUID};
                  setRefBasvurular(p=>[...p,basvuru]);
                  setKullanicilar(p=>p.map(u=>u.uid===aktif?.uid?{...u,refTip:basTip,refOnay:false}:u));
                  // Firebase'e kaydet
                  try {
                    const fbMod = await import("firebase/firestore");
                    await fbMod.addDoc(fbMod.collection(db,"refBasvurular"),{
                      ...basvuru, createdAt: fbMod.serverTimestamp()
                    });
                  } catch(e){ console.error("Başvuru kaydedilemedi:",e); }
                  setBasGonderildi(true);
                  setTimeout(()=>{setRefBasvuruModal(false);setBasGonderildi(false);setBasAd("");setBasAcik("");setBasPlatform([]);setSozlesmeOnay(false);},2500);
                }}>Gönder</button>
              )}
            </div>
          </div>
        )}

        {/* ════════════════ ALERJİ MODAL ════════════════ */}
        {alerjiModal&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.72)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(4px)"}} onClick={()=>setAlerjiModal(false)}>
            <div className="modal-enter" style={{background:d?"#0e1a10":"#ffffff",width:"100%",maxWidth:430,borderRadius:"28px 28px 0 0",paddingBottom:40,maxHeight:"88vh",overflowY:"auto",boxShadow:"0 -20px 60px rgba(0,0,0,.4)",border:d?"1px solid rgba(255,255,255,.06)":"none"}} onClick={e=>e.stopPropagation()}>
              {/* Handle */}
              <div style={{width:36,height:4,background:d?"rgba(255,255,255,.15)":"#e5e7eb",borderRadius:99,margin:"14px auto 20px"}}/>
              {/* Header */}
              <div style={{padding:"0 22px 18px",borderBottom:`1px solid ${r.brd}`}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
                  <div style={{width:40,height:40,borderRadius:14,background:"linear-gradient(135deg,#ef444420,#dc262620)",border:"1px solid #ef444430",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
                  <div>
                    <div style={{fontSize:18,fontWeight:900,color:r.text,letterSpacing:-.3}}>Alerji & Kısıtlar</div>
                    <div style={{fontSize:11,color:r.sub,marginTop:1}}>Seçimler AI önerilerini ve tarifleri etkiler</div>
                  </div>
                </div>
              </div>
              {/* Liste */}
              <div style={{padding:"16px 16px 0"}}>
              {[
                {k:"gluten",    l:"Gluten",        a:"Buğday, arpa, çavdar",  ic:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12c0-2.76 1.12-5.26 2.93-7.07"/><path d="M12 6v6l4 2"/></svg>, c:"#f59e0b"},
                {k:"laktoz",    l:"Laktoz",        a:"Süt ve süt ürünleri",   ic:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2h8l2 4H6L8 2z"/><path d="M6 6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6"/><path d="M10 11h4"/></svg>, c:"#3b82f6"},
                {k:"yumurta",   l:"Yumurta",       a:"Tüm yumurta içerikli",  ic:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="13" rx="7" ry="9"/></svg>, c:"#f59e0b"},
                {k:"kuruyemis", l:"Kuruyemiş",     a:"Fındık, badem, ceviz",  ic:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8 2 5 6 5 11c0 4 3 7 7 8v1h4v-1c4-1 7-4 7-8 0-5-3-9-7-9z"/></svg>, c:"#92400e"},
                {k:"soya",      l:"Soya",           a:"Tofu, tempeh, soya sütü",ic:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>, c:"#16a34a"},
                {k:"kabuklu",   l:"Kabuklu Deniz", a:"Karides, midye, yengeç",ic:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"/><path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4c.1.17.2.35.28.53"/><path d="m12 6 3.13 5.73C15.66 12.7 16.6 13 17.6 13c.74 0 1.47-.23 2.07-.65"/></svg>, c:"#0284c7"},
                {k:"balık",     l:"Balık",          a:"Her türlü balık ürünü", ic:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 3.09 7 6-.94 2.91-3.44 6-7 6s-7.56-3.54-8.5-6z"/><circle cx="17" cy="12" r="1"/><path d="M5 8c-2.05 2-3 3.5-3 4s.95 2 3 4M3.5 18c.5-1.5 2-2 2-4s-1.5-2.5-2-4"/></svg>, c:"#0891b2"},
                {k:"susam",     l:"Susam",          a:"Susam ve tahin",        ic:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><circle cx="6" cy="8" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="6" cy="16" r="2"/><circle cx="18" cy="16" r="2"/></svg>, c:"#d97706"},
                {k:"vejeteryan",l:"Vejeteryan",    a:"Et ürünleri yok",       ic:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>, c:"#16a34a"},
                {k:"vegan",     l:"Vegan",          a:"Hiçbir hayvansal ürün", ic:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, c:"#059669"},
                {k:"diyabet",   l:"Diyabet",        a:"Yüksek şekeri işaretle",ic:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, c:"#e11d48"},
              ].map(item=>{
                const secili=alerjiListesi.includes(item.k);
                return(
                  <div key={item.k} onClick={async()=>{
                    const yeni=secili?alerjiListesi.filter(a=>a!==item.k):[...alerjiListesi,item.k];
                    setAlerjiListesi(yeni);
                    if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{alerji:yeni,alerjiListesi:yeni}).catch(console.error);
                  }} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:16,marginBottom:8,cursor:"pointer",
                    background:secili?(d?`${item.c}18`:`${item.c}0e`):(d?"rgba(255,255,255,.03)":"#fafafa"),
                    border:`1.5px solid ${secili?item.c+"55":r.brd}`,transition:"all .2s"}}>
                    <div style={{width:36,height:36,borderRadius:12,background:secili?`${item.c}20`:(d?"rgba(255,255,255,.05)":"#f4f4f5"),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:secili?item.c:r.muted,transition:"all .2s"}}>{item.ic}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:800,color:secili?item.c:r.text,letterSpacing:.1}}>{item.l}</div>
                      <div style={{fontSize:11,color:r.muted,marginTop:1}}>{item.a}</div>
                    </div>
                    <div style={{width:22,height:22,borderRadius:8,border:`2px solid ${secili?item.c:r.brd}`,background:secili?item.c:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}}>
                      {secili&&<svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  </div>
                );
              })}
              </div>
              <div style={{padding:"16px 16px 0"}}>
                <button onClick={()=>setAlerjiModal(false)} style={{width:"100%",padding:"15px 0",borderRadius:16,border:"none",background:"linear-gradient(135deg,#16a34a,#15803d)",color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:"0 8px 24px rgba(22,163,74,.35)",display:"flex",alignItems:"center",justifyContent:"center",gap:8,letterSpacing:.3}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Kaydet & Kapat
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ KİLO TAKİP MODAL ════════════════ */}
        {kiloGirModal&&(
          <div style={{position:"fixed",inset:0,background:"#0008",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setKiloGirModal(false)}>
            <div className="modal-enter" style={{background:r.card,width:"100%",maxWidth:430,borderRadius:"24px 24px 0 0",padding:24,paddingBottom:34}} onClick={e=>e.stopPropagation()}>
              <div style={{width:40,height:4,background:"#e5e7eb",borderRadius:99,margin:"0 auto 18px"}}/>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}><div style={{width:40,height:40,borderRadius:14,background:"linear-gradient(135deg,#6366f120,#4f46e520)",border:"1px solid #6366f130",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><div style={{fontSize:17,fontWeight:900,color:r.text,letterSpacing:-.3}}>Kilo Kaydet</div></div>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:r.sub,marginBottom:6}}>Bugünkü Kilonuz (kg)</div>
                <input type="number" step="0.1" value={kiloInput} onChange={e=>setKiloInput(e.target.value)}
                  placeholder="75.5" style={{width:"100%",padding:"14px",borderRadius:12,border:`1.5px solid ${r.inpB}`,background:r.inp,color:r.text,fontSize:18,fontWeight:900,fontFamily:"'Nunito',sans-serif",boxSizing:"border-box",textAlign:"center",marginBottom:10}}/>
                <div style={{fontSize:12,fontWeight:700,color:r.sub,marginBottom:6}}>Not (opsiyonel)</div>
                <input value={kiloNot} onChange={e=>setKiloNot(e.target.value)} placeholder="Sabah aç karnına ölçtüm..."
                  style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${r.inpB}`,background:r.inp,color:r.text,fontSize:12,fontFamily:"'Nunito',sans-serif",boxSizing:"border-box",marginBottom:16}}/>
                {kiloKayitlar.length>0&&(
                  <div style={{fontSize:11,color:r.sub,marginBottom:12}}>
                    Son kayıt: <b>{kiloKayitlar[kiloKayitlar.length-1].kilo} kg</b> — {kiloKayitlar[kiloKayitlar.length-1].tarih}
                    {" · "}Değişim: <b style={{color:(+kiloInput||0)<(+kiloKayitlar[kiloKayitlar.length-1].kilo)?"#16a34a":"#ef4444"}}>
                      {kiloInput?((+kiloInput)-(+kiloKayitlar[kiloKayitlar.length-1].kilo)>0?"+":"")+((+kiloInput)-(+kiloKayitlar[kiloKayitlar.length-1].kilo)).toFixed(1)+" kg":"—"}
                    </b>
                  </div>
                )}
                <button onClick={async()=>{
                  if(!kiloInput||isNaN(+kiloInput)) return;
                  const kayit={tarih:new Date().toLocaleDateString("tr-TR"),kilo:+kiloInput,not:kiloNot};
                  const yeni=[...kiloKayitlar,kayit].slice(-90);
                  setKiloGecmis(yeni);
                  setProfil(p=>({...p,kilo:String(kiloInput)}));
                  if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{
        kiloKayitlar:yeni,
        kilo:String(kiloInput),
        sonKiloTarih:new Date().toISOString(),
        guncelKilo:+kiloInput
      }).catch(console.error);
                  setKiloInput(""); setKiloNot("");
                  setKiloGirModal(false);
                }} style={{width:"100%",padding:"14px 0",borderRadius:14,border:"none",background:"linear-gradient(135deg,#16a34a,#15803d)",color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:"0 6px 20px rgba(22,163,74,.35)",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Kaydet
                </button>
                {kiloKayitlar.length>0&&(
                  <div style={{marginTop:14,maxHeight:150,overflowY:"auto"}}>
                    <div style={{fontSize:11,fontWeight:800,color:r.sub,marginBottom:8,letterSpacing:.5,textTransform:"uppercase"}}>Son 10 Kayıt</div>
                    {[...kiloKayitlar].reverse().slice(0,10).map((k,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${r.brd}`,fontSize:12}}>
                        <span style={{color:r.sub}}>{k.tarih}</span>
                        <span style={{fontWeight:800,color:r.text}}>{k.kilo} kg</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ GÜNLÜK DİYET LİSTESİ MODAL ════════════════ */}
        {diyetListesiAcik&&(
          <div style={{position:"fixed",inset:0,background:"#0008",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setDiyetListesiAcik(false)}>
            <div className="modal-enter" style={{background:r.card,width:"100%",maxWidth:430,borderRadius:"24px 24px 0 0",padding:24,paddingBottom:34,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
              <div style={{width:40,height:4,background:"#e5e7eb",borderRadius:99,margin:"0 auto 14px"}}/>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <div>
                  <div style={{fontSize:17,fontWeight:900,color:r.text}}>📋 Günlük Diyet Planı</div>
                  <div style={{fontSize:11,color:r.sub}}>Hedefine göre kişisel beslenme listesi</div>
                </div>
                <button onClick={async()=>{
                  setDiyetListesiYukleniyor(true);
                  try{
                    const hedefAcik=profil.hedef&&+profil.hedef<+profil.kilo?"kilo vermek":"kilo korumak";
                    const resp=await fetch("/.netlify/functions/ai-proxy",{
                      method:"POST",headers:{"Content-Type":"application/json"},
                      body:JSON.stringify({
                        model:"claude-haiku-4-5-20251001",max_tokens:800,
                        system:"Sen Doya beslenme uygulamasının yapay zeka diyetisyenisin. Türkçe JSON ile cevap ver. Sadece JSON, başka hiçbir şey yazma.",
                        messages:[{role:"user",content:`Profil: ${profil.kilo}kg, ${profil.boy}cm, ${profil.yas}y, ${profil.cinsiyet}, hedef:${hedefAcik}, TDEE:${tdee||2000}kcal, alerjiListesi:${alerjiListesi.join(",")||"yok"}. Günlük diyet planı oluştur. Format: {"kaloriHedef":number,"ogünler":[{"ogun":"Kahvaltı","ikon":"🌅","yiyecekler":[{"ad":"...","miktar":"...","kal":number,"tok":number}],"toplamKal":number}],"ipuclari":["...","...","..."]} - tok: 1-5 arası tokluk değeri`}]
                      })
                    });
                    const data=await resp.json();
                    const text=data.content?.[0]?.text||"{}";
                    const clean=text.replace(/```json|```/g,"").trim();
                    setDiyetListesi(JSON.parse(clean));
                  }catch(e){setDiyetListesi(null);}
                  setDiyetListesiYukleniyor(false);
                }} style={{...BTN("#7c3aed","8px 14px"),fontSize:11}}>🔄 Yenile</button>
              </div>

              {diyetListesiYuk&&(
                <div style={{textAlign:"center",padding:"40px 0",color:r.sub}}>
                  <div className="spin" style={{fontSize:32,display:"inline-block",marginBottom:12}}>⚙️</div>
                  <div style={{fontSize:13}}>AI planı hazırlıyor...</div>
                </div>
              )}
              {!diyetListesi&&!diyetListesiYuk&&(
                <div style={{textAlign:"center",padding:"30px 0",color:r.muted}}>
                  <div style={{fontSize:40,marginBottom:10}}>🥗</div>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:6}}>Kişiselleştirilmiş plan hazır değil</div>
                  <div style={{fontSize:11,color:r.sub,marginBottom:16}}>Profil bilgilerin kullanılarak bugüne özel<br/>bir diyet planı oluşturulacak.</div>
                  <button onClick={async()=>{
                    setDiyetListesiYukleniyor(true);
                    try{
                      const hedefAcik=profil.hedef&&+profil.hedef<+profil.kilo?"kilo vermek":"kilo korumak";
                      const resp=await fetch("/.netlify/functions/ai-proxy",{
                        method:"POST",headers:{"Content-Type":"application/json"},
                        body:JSON.stringify({
                          model:"claude-haiku-4-5-20251001",max_tokens:800,
                          system:"Sen Doya beslenme uygulamasının yapay zeka diyetisyenisin. Türkçe JSON ile cevap ver. Sadece JSON, başka hiçbir şey yazma.",
                          messages:[{role:"user",content:`Profil: ${profil.kilo}kg, ${profil.boy}cm, ${profil.yas}y, ${profil.cinsiyet}, hedef:${hedefAcik}, TDEE:${tdee||2000}kcal, alerjiListesi:${alerjiListesi.join(",")||"yok"}. Günlük diyet planı oluştur. Format: {"kaloriHedef":number,"ogünler":[{"ogun":"Kahvaltı","ikon":"🌅","yiyecekler":[{"ad":"...","miktar":"...","kal":number,"tok":number}],"toplamKal":number}],"ipuclari":["...","...","..."]} - tok: 1-5 arası tokluk değeri`}]
                        })
                      });
                      const data=await resp.json();
                      const text=data.content?.[0]?.text||"{}";
                      const clean=text.replace(/```json|```/g,"").trim();
                      setDiyetListesi(JSON.parse(clean));
                    }catch(e){setDiyetListesi(null);}
                    setDiyetListesiYukleniyor(false);
                  }} style={{...BTN("#16a34a","10px 24px"),fontSize:13}}>🤖 Plan Oluştur</button>
                </div>
              )}
              {diyetListesi&&!diyetListesiYuk&&(
                <div>
                  <div style={{background:"linear-gradient(135deg,#16a34a,#15803d)",borderRadius:14,padding:"12px 16px",color:"#fff",marginBottom:14,display:"flex",justifyContent:"space-between"}}>
                    <div>
                      <div style={{fontSize:11,opacity:.8}}>Günlük Kalori Hedefi</div>
                      <div style={{fontSize:26,fontWeight:900}}>{diyetListesi.kaloriHedef} kcal</div>
                    </div>
                    <div style={{textAlign:"right",fontSize:11,opacity:.8}}>
                      <div>Protein: {Math.round(diyetListesi.kaloriHedef*0.3/4)}g</div>
                      <div>Karb: {Math.round(diyetListesi.kaloriHedef*0.45/4)}g</div>
                      <div>Yağ: {Math.round(diyetListesi.kaloriHedef*0.25/9)}g</div>
                    </div>
                  </div>
                  {(diyetListesi.ogünler||[]).map((og,ogi)=>(
                    <div key={ogi} style={{...CS,marginBottom:10}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                        <div style={{fontSize:14,fontWeight:800,color:r.text}}>{og.ikon} {og.ogun}</div>
                        <span style={{background:"#f0fdf4",color:"#16a34a",borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:700}}>{og.toplamKal} kcal</span>
                      </div>
                      {(og.yiyecekler||[]).map((y,yi)=>{
                        const alerjiVar=alerjiListesi.some(a=>{
                          const aMap={"gluten":["un","ekmek","makarna","buğday"],"laktoz":["süt","peynir","yoğurt"],"yumurta":["yumurta"],"fındık":["fındık","fıstık","ceviz"],"soya":["soya","tofu"],"balık":["balık","somon","ton"],"susam":["susam","tahin"]};
                          return (aMap[a]||[]).some(k=>y.ad.toLowerCase().includes(k));
                        });
                        return(
                          <div key={yi} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${r.brd}`}}>
                            <div style={{flex:1}}>
                              <div style={{fontSize:13,fontWeight:700,color:alerjiVar?"#dc2626":r.text,display:"flex",alignItems:"center",gap:4}}>
                                {alerjiVar&&<span title="Alerji uyarısı">⚠️</span>}{y.ad}
                              </div>
                              <div style={{fontSize:11,color:r.sub}}>{y.miktar}</div>
                            </div>
                            <div style={{textAlign:"right",flexShrink:0}}>
                              <div style={{fontSize:12,fontWeight:700,color:"#f59e0b"}}>{y.kal} kcal</div>
                              <div style={{display:"flex",alignItems:"center",gap:2,justifyContent:"flex-end"}}>
                                <span style={{fontSize:9,color:r.muted}}>tok:</span>
                                {[1,2,3,4,5].map(s=><span key={s} style={{color:s<=(y.tok||3)?"#16a34a":"#e5e7eb",fontSize:10}}>●</span>)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  {diyetListesi?.ipuclari&&(
                    <div style={{...CS,background:d?"#1e293b":"#fffbeb",border:"1px solid #fcd34d"}}>
                      <div style={{fontSize:13,fontWeight:800,color:"#d97706",marginBottom:8}}>💡 AI İpuçları</div>
                      {(diyetListesi?.ipuclari||[]).map((ip,i)=>(
                        <div key={i} style={{fontSize:12,color:r.sub,marginBottom:6,display:"flex",gap:6}}>
                          <span style={{color:"#f59e0b"}}>•</span>{ip}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
