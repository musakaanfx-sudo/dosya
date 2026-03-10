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
        ikon: "🥗",
        baslik: "Doya ile Sağlıklı Beslen",
        acik: "Yediğin her şeyi saniyeler içinde kaydet. McDonald's, Ülker, Barilla ve daha fazlası dahil 800'den fazla besin içeren veritabanımızla günlük kalorini, protein ve vitamin alımını takip et.",
      },
      {
        ikon: "⭐",
        baslik: "Sağlık Yıldız Sistemi",
        acik: "Her besine 0-5 arası sağlık puanı verilmiştir. Protein, lif, vitamin ve sodyum dengesi baz alınarak hesaplanır. 🔬 Derin Analiz ile vitamin ve mineral detaylarını incele.",
      },
      {
        ikon: "👟",
        baslik: "Adım Sayar & Haftalık Performans",
        acik: "Telefonunun sensörüyle adımlarını otomatik say. Profilinde haftalık, aylık ve yıllık performans özeti gör — ne kadar protein aldın, kaç kalori yaktın, su hedefine ulaştın mı?",
      },
      {
        ikon: "🎁",
        baslik: "Referans Kodu ile Kazan",
        acik: "Arkadaşına referans kodunu gönder — ikisine de +150 puan! Her satın alımda referans sahibine bonus puan. Ortak olursan satışlardan %25 komisyon kazanırsın.",
      },
      {
        ikon: "🔥",
        baslik: "Seri & Sosyal Beslenme",
        acik: "Her gün yemek kaydet ve seri artır. 10.000 adımı geçince adım serini yükselt. Arkadaşlarınla beslenme yarışması yap, puan kazan ve en sağlıklı sen ol!",
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
        ikon: "🥗",
        baslik: "Eat Healthy with Doya",
        acik: "Log everything you eat in seconds. Track calories, protein and vitamins with 800+ foods including McDonald's, Ülker, Barilla and many more brands.",
      },
      {
        ikon: "⭐",
        baslik: "Health Star System",
        acik: "Every food has a health score from 0-5 stars. Use Deep Analysis to inspect vitamins, minerals and daily intake percentages for each food.",
      },
      {
        ikon: "👟",
        baslik: "Steps & Weekly Performance",
        acik: "Auto-count steps with your phone sensor. View weekly, monthly and yearly performance summaries — protein intake, calories burned, water goals and more.",
      },
      {
        ikon: "🎁",
        baslik: "Earn with Referral Codes",
        acik: "Share your referral code — both you and your friend get +150 points! Partners earn 25% commission on every premium purchase through their code.",
      },
      {
        ikon: "🔥",
        baslik: "Streaks & Social Nutrition",
        acik: "Keep your meal and step streaks alive. Compete with friends on nutrition goals, earn points and become the healthiest in your circle!",
      },
    ],
  },
};

// ─── SABİTLER ────────────────────────────────────────────────
const DESTEK_MAIL   = "Doyasupport@gmail.com";
const ORTAKLIK_MAIL = "Doyasupport@gmail.com";
const PREMIUM_FIYAT = 25; // aylık ₺
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
  // ── PROTEİN ──
  { id:11,  ad:"Yumurta (Bütün)",       marka:"", kal:155, pro:13,   karb:1.1, yag:11,  lif:0,   sod:124, demir:1.8, kals:56,  vitC:0,    vitD:2.2,  vitB12:1.1,  acik:74, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:12,  ad:"Tavuk Göğsü (Izgara)",  marka:"", kal:165, pro:31,   karb:0,   yag:3.6, lif:0,   sod:74,  demir:0.9, kals:11,  vitC:0,    vitD:0.1,  vitB12:0.3,  acik:88, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:13,  ad:"Tavuk But (Fırın)",     marka:"", kal:189, pro:25,   karb:0,   yag:9.7, lif:0,   sod:88,  demir:1.0, kals:14,  vitC:0,    vitD:0.1,  vitB12:0.3,  acik:80, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:14,  ad:"Dana Kıyma (Yağsız)",   marka:"", kal:215, pro:26,   karb:0,   yag:12,  lif:0,   sod:75,  demir:2.7, kals:18,  vitC:0,    vitD:0.1,  vitB12:2.1,  acik:82, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:15,  ad:"Dana Biftek",           marka:"", kal:250, pro:26,   karb:0,   yag:16,  lif:0,   sod:60,  demir:2.1, kals:11,  vitC:0,    vitD:0.1,  vitB12:2.3,  acik:85, por:100, aclik:"4-5 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:16,  ad:"Somon (Fırın)",         marka:"", kal:208, pro:20,   karb:0,   yag:13,  lif:0,   sod:59,  demir:0.3, kals:9,   vitC:3.5,  vitD:11.1, vitB12:3.2,  acik:87, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:17,  ad:"Ton Balığı (Konserve)", marka:"", kal:116, pro:26,   karb:0,   yag:0.8, lif:0,   sod:320, demir:1.0, kals:10,  vitC:0,    vitD:3.7,  vitB12:2.5,  acik:88, por:100,  aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:18,  ad:"Hamsi (Taze)",          marka:"", kal:131, pro:20,   karb:0,   yag:5,   lif:0,   sod:104, demir:3.2, kals:63,  vitC:0,    vitD:5.1,  vitB12:1.7,  acik:82, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:19,  ad:"Levrek",                marka:"", kal:97,  pro:19,   karb:0,   yag:2,   lif:0,   sod:62,  demir:0.3, kals:15,  vitC:0,    vitD:4.0,  vitB12:1.9,  acik:80, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:20,  ad:"Mercimek (Pişmiş)",     marka:"", kal:116, pro:9,    karb:20,  yag:0.4, lif:7.9, sod:238, demir:3.3, kals:19,  vitC:1.5,  vitD:0,    vitB12:0,    acik:86, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:21,  ad:"Nohut (Pişmiş)",        marka:"", kal:164, pro:8.9,  karb:27,  yag:2.6, lif:7.6, sod:7,   demir:2.9, kals:49,  vitC:1.3,  vitD:0,    vitB12:0,    acik:83, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:22,  ad:"Kuru Fasulye",          marka:"", kal:127, pro:8.7,  karb:22,  yag:0.5, lif:6.4, sod:2,   demir:2.5, kals:37,  vitC:0,    vitD:0,    vitB12:0,    acik:85, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:23,  ad:"Kırmızı Mercimek",      marka:"", kal:338, pro:26,   karb:57,  yag:1.1, lif:11,  sod:6,   demir:7.6, kals:35,  vitC:4.4,  vitD:0,    vitB12:0,    acik:88, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  // ── MEYVE ──
  { id:24,  ad:"Elma",                  marka:"", kal:52,  pro:0.3,  karb:14,  yag:0.2, lif:2.4, sod:1,   demir:0.1, kals:6,   vitC:4.6,  vitD:0,    vitB12:0,    acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4 },
  { id:25,  ad:"Muz",                   marka:"", kal:89,  pro:1.1,  karb:23,  yag:0.3, lif:2.6, sod:1,   demir:0.3, kals:5,   vitC:8.7,  vitD:0,    vitB12:0,    acik:62, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4 },
  { id:26,  ad:"Portakal",              marka:"", kal:47,  pro:0.9,  karb:12,  yag:0.1, lif:2.4, sod:0,   demir:0.1, kals:40,  vitC:53,   vitD:0,    vitB12:0,    acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:5 },
  { id:27,  ad:"Çilek",                 marka:"", kal:32,  pro:0.7,  karb:7.7, yag:0.3, lif:2,   sod:1,   demir:0.4, kals:16,  vitC:58,   vitD:0,    vitB12:0,    acik:50, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:5 },
  { id:28,  ad:"Üzüm",                  marka:"", kal:69,  pro:0.7,  karb:18,  yag:0.2, lif:0.9, sod:2,   demir:0.4, kals:10,  vitC:3.2,  vitD:0,    vitB12:0,    acik:35, por:100, aclik:"1 saat",   onay:true, kat:"Meyve", yildiz:3.5 },
  { id:29,  ad:"Karpuz",                marka:"", kal:30,  pro:0.6,  karb:7.6, yag:0.2, lif:0.4, sod:1,   demir:0.2, kals:7,   vitC:8.1,  vitD:0,    vitB12:0,    acik:35, por:100, aclik:"1 saat",   onay:true, kat:"Meyve", yildiz:4 },
  { id:30,  ad:"Kavun",                 marka:"", kal:34,  pro:0.8,  karb:8.2, yag:0.2, lif:0.9, sod:16,  demir:0.2, kals:11,  vitC:36,   vitD:0,    vitB12:0,    acik:40, por:100, aclik:"1 saat",   onay:true, kat:"Meyve", yildiz:4 },
  { id:31,  ad:"Şeftali",               marka:"", kal:39,  pro:0.9,  karb:9.5, yag:0.3, lif:1.5, sod:0,   demir:0.3, kals:6,   vitC:6.6,  vitD:0,    vitB12:0,    acik:50, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4 },
  { id:32,  ad:"Mandalina",             marka:"", kal:53,  pro:0.8,  karb:13,  yag:0.3, lif:1.8, sod:2,   demir:0.2, kals:37,  vitC:27,   vitD:0,    vitB12:0,    acik:50, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4 },
  { id:33,  ad:"Armut",                 marka:"", kal:57,  pro:0.4,  karb:15,  yag:0.1, lif:3.1, sod:1,   demir:0.2, kals:9,   vitC:4.3,  vitD:0,    vitB12:0,    acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4 },
  { id:34,  ad:"Kiraz",                 marka:"", kal:63,  pro:1.1,  karb:16,  yag:0.2, lif:2.1, sod:0,   demir:0.4, kals:13,  vitC:7,    vitD:0,    vitB12:0,    acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4 },
  { id:35,  ad:"Kivi",                  marka:"", kal:61,  pro:1.1,  karb:15,  yag:0.5, lif:3,   sod:3,   demir:0.3, kals:34,  vitC:93,   vitD:0,    vitB12:0,    acik:58, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:5 },
  { id:36,  ad:"Ananas",                marka:"", kal:50,  pro:0.5,  karb:13,  yag:0.1, lif:1.4, sod:1,   demir:0.3, kals:13,  vitC:47,   vitD:0,    vitB12:0,    acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4 },
  // ── SEBZE ──
  { id:37,  ad:"Ispanak",               marka:"", kal:23,  pro:2.9,  karb:3.6, yag:0.4, lif:2.2, sod:79,  demir:2.7, kals:99,  vitC:28,   vitD:0,    vitB12:0,    acik:78, por:100, aclik:"2-3 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:38,  ad:"Domates",               marka:"", kal:18,  pro:0.9,  karb:3.9, yag:0.2, lif:1.2, sod:5,   demir:0.3, kals:10,  vitC:13,   vitD:0,    vitB12:0,    acik:40, por:100, aclik:"1 saat",   onay:true, kat:"Sebze", yildiz:5 },
  { id:39,  ad:"Salatalık",             marka:"", kal:16,  pro:0.7,  karb:3.6, yag:0.1, lif:0.5, sod:2,   demir:0.3, kals:16,  vitC:2.8,  vitD:0,    vitB12:0,    acik:30, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:40,  ad:"Biber (Yeşil)",         marka:"", kal:20,  pro:0.9,  karb:4.6, yag:0.2, lif:1.7, sod:3,   demir:0.4, kals:10,  vitC:80,   vitD:0,    vitB12:0,    acik:38, por:100, aclik:"1 saat",   onay:true, kat:"Sebze", yildiz:5 },
  { id:41,  ad:"Brokoli",               marka:"", kal:34,  pro:2.8,  karb:7,   yag:0.4, lif:2.6, sod:33,  demir:0.7, kals:47,  vitC:89,   vitD:0,    vitB12:0,    acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:42,  ad:"Karnabahar",            marka:"", kal:25,  pro:1.9,  karb:5,   yag:0.3, lif:2,   sod:30,  demir:0.4, kals:22,  vitC:48,   vitD:0,    vitB12:0,    acik:65, por:100, aclik:"2-3 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:43,  ad:"Havuç",                 marka:"", kal:41,  pro:0.9,  karb:10,  yag:0.2, lif:2.8, sod:69,  demir:0.3, kals:33,  vitC:5.9,  vitD:0,    vitB12:0,    acik:60, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:44,  ad:"Patlıcan",              marka:"", kal:25,  pro:1,    karb:6,   yag:0.2, lif:3,   sod:2,   demir:0.2, kals:9,   vitC:2.2,  vitD:0,    vitB12:0,    acik:50, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4 },
  { id:45,  ad:"Kabak (Tatı)",          marka:"", kal:45,  pro:2,    karb:12,  yag:0.1, lif:2,   sod:1,   demir:0.3, kals:21,  vitC:9,    vitD:0,    vitB12:0,    acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4 },
  { id:46,  ad:"Mısır (Haşlanmış)",     marka:"", kal:96,  pro:3.4,  karb:21,  yag:1.5, lif:2.4, sod:15,  demir:0.5, kals:2,   vitC:6.8,  vitD:0,    vitB12:0,    acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:3.5 },
  { id:47,  ad:"Bezelye",               marka:"", kal:81,  pro:5.4,  karb:14,  yag:0.4, lif:5.1, sod:5,   demir:1.5, kals:25,  vitC:40,   vitD:0,    vitB12:0,    acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:48,  ad:"Soğan",                 marka:"", kal:40,  pro:1.1,  karb:9.3, yag:0.1, lif:1.7, sod:4,   demir:0.2, kals:23,  vitC:7.4,  vitD:0,    vitB12:0,    acik:30, por:100, aclik:"1 saat",   onay:true, kat:"Sebze", yildiz:4 },
  { id:49,  ad:"Sarımsak",              marka:"", kal:149, pro:6.4,  karb:33,  yag:0.5, lif:2.1, sod:17,  demir:1.7, kals:181, vitC:31,   vitD:0,    vitB12:0,    acik:40, por:100,  aclik:"1 saat",   onay:true, kat:"Sebze", yildiz:5 },
  // ── SÜT ÜRÜNLERİ ──
  { id:50,  ad:"Süt (Tam Yağlı)",       marka:"", kal:61,  pro:3.2,  karb:4.8, yag:3.3, lif:0,   sod:44,  demir:0.1, kals:113, vitC:0,    vitD:1.2,  vitB12:0.4,  acik:62, por:100, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:3.5 },
  { id:51,  ad:"Süt (Yarım Yağlı)",     marka:"", kal:46,  pro:3.3,  karb:4.7, yag:1.5, lif:0,   sod:47,  demir:0,   kals:120, vitC:0,    vitD:1.0,  vitB12:0.4,  acik:60, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:4 },
  { id:52,  ad:"Yoğurt (Tam Yağlı)",    marka:"", kal:61,  pro:3.5,  karb:4.7, yag:3.3, lif:0,   sod:46,  demir:0.1, kals:121, vitC:0.8,  vitD:0.1,  vitB12:0.4,  acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:3.5 },
  { id:53,  ad:"Yoğurt (Yağsız)",       marka:"", kal:56,  pro:5.7,  karb:7.7, yag:0.4, lif:0,   sod:58,  demir:0.1, kals:199, vitC:0.5,  vitD:0.1,  vitB12:0.5,  acik:76, por:100, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:4 },
  { id:54,  ad:"Beyaz Peynir",          marka:"", kal:265, pro:14,   karb:4,   yag:21,  lif:0,   sod:1116,demir:0.2, kals:493, vitC:0,    vitD:0.5,  vitB12:0.4,  acik:75, por:100,  aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:2.5 },
  { id:55,  ad:"Kaşar Peyniri",         marka:"", kal:378, pro:24,   karb:3,   yag:29,  lif:0,   sod:760, demir:0.2, kals:650, vitC:0,    vitD:0.3,  vitB12:0.8,  acik:76, por:100,  aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:2.5 },
  { id:56,  ad:"Lor Peyniri",           marka:"", kal:98,  pro:11,   karb:3,   yag:4.3, lif:0,   sod:290, demir:0.1, kals:111, vitC:0,    vitD:0.1,  vitB12:0.5,  acik:79, por:100, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:4 },
  { id:57,  ad:"Kefir",                 marka:"", kal:52,  pro:3.6,  karb:4.5, yag:1.4, lif:0,   sod:42,  demir:0.1, kals:117, vitC:0,    vitD:0.4,  vitB12:0.4,  acik:68, por:100, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:5 },
  { id:58,  ad:"Ayran",                 marka:"", kal:36,  pro:1.4,  karb:2.8, yag:2,   lif:0,   sod:138, demir:0,   kals:76,  vitC:0,    vitD:0,    vitB12:0.2,  acik:45, por:100, aclik:"1 saat",   onay:true, kat:"Süt Ürünü", yildiz:2.5 },
  // ── HAZIR YEMEK ──
  { id:59,  ad:"Döner (Tavuk)",         marka:"", kal:218, pro:20,   karb:5,   yag:13,  lif:0.5, sod:520, demir:1.2, kals:28,  vitC:2,    vitD:0,    vitB12:0.4,  acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:2.5 },
  { id:60,  ad:"Döner (Et)",            marka:"", kal:270, pro:22,   karb:4,   yag:18,  lif:0.4, sod:600, demir:2.5, kals:22,  vitC:0,    vitD:0,    vitB12:1.5,  acik:74, por:100, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:1.5 },
  { id:61,  ad:"Tavuk Dürüm",           marka:"", kal:220, pro:18,   karb:22,  yag:6,   lif:2,   sod:380, demir:1.5, kals:80,  vitC:2,    vitD:0,    vitB12:0.2,  acik:70, por:100, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:2.5 },
  { id:62,  ad:"Lahmacun",              marka:"", kal:211, pro:11,   karb:26,  yag:7.2, lif:1.8, sod:430, demir:2.1, kals:45,  vitC:4,    vitD:0,    vitB12:0.5,  acik:60, por:100, aclik:"1-2 saat", onay:true, kat:"Hazır Yemek", yildiz:2.5 },
  { id:63,  ad:"Pizza (Karışık)",       marka:"", kal:266, pro:11,   karb:33,  yag:10,  lif:2.3, sod:598, demir:1.7, kals:147, vitC:4,    vitD:0.1,  vitB12:0.4,  acik:50, por:100, aclik:"1-2 saat", onay:true, kat:"Hazır Yemek", yildiz:1.5 },
  { id:64,  ad:"Hamburger",             marka:"", kal:295, pro:17,   karb:24,  yag:14,  lif:1.3, sod:497, demir:2.5, kals:55,  vitC:0,    vitD:0.1,  vitB12:1.0,  acik:62, por:100, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:1.5 },
  { id:65,  ad:"Mercimek Çorbası",      marka:"", kal:63,  pro:4.2,  karb:10,  yag:0.8, lif:3.8, sod:310, demir:1.9, kals:18,  vitC:1.5,  vitD:0,    vitB12:0,    acik:82, por:100, aclik:"2-3 saat", onay:true, kat:"Çorba", yildiz:5 },
  { id:66,  ad:"Domates Çorbası",       marka:"", kal:54,  pro:1.6,  karb:10,  yag:1.4, lif:1.5, sod:380, demir:0.5, kals:20,  vitC:7,    vitD:0,    vitB12:0,    acik:65, por:100, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:3.5 },
  { id:67,  ad:"Ezogelin Çorbası",      marka:"", kal:70,  pro:4.5,  karb:12,  yag:1,   lif:4.2, sod:350, demir:2.1, kals:22,  vitC:1.8,  vitD:0,    vitB12:0,    acik:84, por:100, aclik:"2-3 saat", onay:true, kat:"Çorba", yildiz:5 },
  { id:68,  ad:"Tarhana Çorbası",       marka:"", kal:60,  pro:3,    karb:11,  yag:0.8, lif:2,   sod:400, demir:1.2, kals:38,  vitC:3,    vitD:0,    vitB12:0,    acik:70, por:100, aclik:"2-3 saat", onay:true, kat:"Çorba", yildiz:4 },
  // ── ATIŞTIRMALIk ──
  { id:70,  ad:"Sütlü Çikolata",        marka:"",kal:535, pro:7.7,  karb:60,  yag:30,  lif:1.4, sod:79,  demir:1.2, kals:189, vitC:0.5,  vitD:0,    vitB12:0.5,  acik:22, por:100,  aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1.5 },
  { id:71,  ad:"Bitter Çikolata (%70)", marka:"",kal:598, pro:7.8,  karb:46,  yag:43,  lif:11,  sod:20,  demir:12,  kals:73,  vitC:0,    vitD:0,    vitB12:0,    acik:35, por:100,  aclik:"1 saat",   onay:true, kat:"Atıştırmalık", yildiz:3.5 },
  { id:72,  ad:"Cips (Patates)",        marka:"",kal:536, pro:7,    karb:53,  yag:35,  lif:4.4, sod:525, demir:1.9, kals:35,  vitC:13,   vitD:0,    vitB12:0,    acik:14, por:100,  aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:73,  ad:"Kraker",                marka:"",kal:409, pro:8.5,  karb:68,  yag:10,  lif:3.5, sod:790, demir:2.7, kals:49,  vitC:0,    vitD:0,    vitB12:0,    acik:28, por:100,  aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1.5 },
  { id:74,  ad:"Badem",                 marka:"",kal:579, pro:21,   karb:22,  yag:50,  lif:12,  sod:1,   demir:3.7, kals:264, vitC:0,    vitD:0,    vitB12:0,    acik:70, por:100,  aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:5 },
  { id:75,  ad:"Ceviz",                 marka:"",kal:654, pro:15,   karb:14,  yag:65,  lif:6.7, sod:2,   demir:2.9, kals:98,  vitC:1.3,  vitD:0,    vitB12:0,    acik:68, por:100,  aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:5 },
  { id:76,  ad:"Yer Fıstığı",           marka:"",kal:567, pro:26,   karb:16,  yag:49,  lif:8.5, sod:18,  demir:4.6, kals:92,  vitC:0,    vitD:0,    vitB12:0,    acik:68, por:100,  aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:5 },
  { id:77,  ad:"Fındık",                marka:"",kal:628, pro:15,   karb:17,  yag:61,  lif:9.7, sod:0,   demir:4.7, kals:114, vitC:6.3,  vitD:0,    vitB12:0,    acik:65, por:100,  aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:5 },
  { id:78,  ad:"Fıstık Ezmesi",         marka:"",kal:588, pro:25,   karb:20,  yag:50,  lif:6,   sod:459, demir:1.9, kals:49,  vitC:0,    vitD:0,    vitB12:0,    acik:65, por:100,  aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:3.5 },
  { id:79,  ad:"Popcorn (Tuzsuz)",      marka:"",kal:387, pro:12,   karb:78,  yag:4.5, lif:15,  sod:8,   demir:3.2, kals:7,   vitC:0,    vitD:0,    vitB12:0,    acik:55, por:100,  aclik:"1-2 saat", onay:true, kat:"Atıştırmalık", yildiz:3.5 },
  // ── İÇECEK ──
  { id:80,  ad:"Portakal Suyu (Taze)",  marka:"",kal:45,  pro:0.7,  karb:10,  yag:0.2, lif:0.4, sod:1,   demir:0.2, kals:11,  vitC:50,   vitD:0,    vitB12:0,    acik:30, por:100, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4.5 },
  { id:81,  ad:"Elma Suyu",             marka:"",kal:46,  pro:0.1,  karb:11,  yag:0.1, lif:0.2, sod:4,   demir:0.1, kals:8,   vitC:0.9,  vitD:0,    vitB12:0,    acik:22, por:100, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:2.5 },
  { id:82,  ad:"Limonata (Ev Yapımı)",  marka:"",kal:26,  pro:0.1,  karb:6.6, yag:0,   lif:0.1, sod:1,   demir:0.1, kals:5,   vitC:8,    vitD:0,    vitB12:0,    acik:20, por:100, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:3.5 },
  { id:83,  ad:"Çay (Sade)",            marka:"",kal:1,   pro:0,    karb:0.3, yag:0,   lif:0,   sod:3,   demir:0.1, kals:1,   vitC:0,    vitD:0,    vitB12:0,    acik:5,  por:100, aclik:"30 dk",    onay:true, kat:"İçecek", yildiz:4 },
  { id:84,  ad:"Türk Kahvesi (Sade)",   marka:"",kal:2,   pro:0.3,  karb:0,   yag:0,   lif:0,   sod:4,   demir:0,   kals:2,   vitC:0,    vitD:0,    vitB12:0,    acik:8,  por:100,  aclik:"30 dk",    onay:true, kat:"İçecek", yildiz:4 },
  { id:85,  ad:"Kola",                  marka:"",kal:42,  pro:0,    karb:11,  yag:0,   lif:0,   sod:10,  demir:0,   kals:0,   vitC:0,    vitD:0,    vitB12:0,    acik:5,  por:100, aclik:"30 dk",    onay:true, kat:"İçecek", yildiz:0 },
  { id:86,  ad:"Enerji İçeceği",        marka:"",kal:45,  pro:0,    karb:11,  yag:0,   lif:0,   sod:100, demir:0,   kals:0,   vitC:0,    vitD:0,    vitB12:2.5,  acik:8,  por:100, aclik:"30 dk",    onay:true, kat:"İçecek", yildiz:0 },
  { id:87,  ad:"Smoothie (Muz-Süt)",    marka:"",kal:97,  pro:4,    karb:18,  yag:1.3, lif:1.2, sod:48,  demir:0.3, kals:103, vitC:4,    vitD:0.6,  vitB12:0.4,  acik:62, por:100, aclik:"1-2 saat", onay:true, kat:"İçecek", yildiz:4 },
  // ── YAĞLAR & SOSLAR ──
  { id:88,  ad:"Zeytinyağı",            marka:"",kal:884, pro:0,    karb:0,   yag:100, lif:0,   sod:2,   demir:0.1, kals:1,   vitC:0,    vitD:0,    vitB12:0,    acik:10, por:100,  aclik:"—",        onay:true, kat:"Diğer", yildiz:4.5 },
  { id:89,  ad:"Tereyağı",              marka:"",kal:717, pro:0.9,  karb:0.1, yag:81,  lif:0,   sod:714, demir:0,   kals:24,  vitC:0,    vitD:1.5,  vitB12:0.1,  acik:10, por:100,  aclik:"—",        onay:true, kat:"Diğer", yildiz:1 },
  { id:90,  ad:"Bal",                   marka:"",kal:304, pro:0.3,  karb:82,  yag:0,   lif:0.2, sod:4,   demir:0.4, kals:6,   vitC:0.5,  vitD:0,    vitB12:0,    acik:20, por:100,  aclik:"30-60 dk", onay:true, kat:"Diğer", yildiz:2.5 },
  { id:91,  ad:"Reçel",                 marka:"",kal:278, pro:0.4,  karb:68,  yag:0.1, lif:1.6, sod:32,  demir:0.4, kals:20,  vitC:6,    vitD:0,    vitB12:0,    acik:15, por:100,  aclik:"30-60 dk", onay:true, kat:"Diğer", yildiz:1 },
  { id:92,  ad:"Zeytin (Siyah)",        marka:"",kal:115, pro:0.8,  karb:6.3, yag:10,  lif:3.2, sod:735, demir:3.3, kals:88,  vitC:0,    vitD:0,    vitB12:0,    acik:45, por:100,  aclik:"1 saat",   onay:true, kat:"Diğer", yildiz:3.5 },
  { id:93,  ad:"Zeytin (Yeşil)",        marka:"",kal:145, pro:1,    karb:3.8, yag:15,  lif:3.3, sod:1556,demir:3.3, kals:52,  vitC:0,    vitD:0,    vitB12:0,    acik:45, por:100,  aclik:"1 saat",   onay:true, kat:"Diğer", yildiz:2.5 },
  { id:94,  ad:"Tahin",                 marka:"",kal:595, pro:17,   karb:22,  yag:53,  lif:9.3, sod:115, demir:8.9, kals:426, vitC:0,    vitD:0,    vitB12:0,    acik:58, por:100,  aclik:"1-2 saat", onay:true, kat:"Diğer", yildiz:4 },
  // ── TATLI ──
  { id:95,  ad:"Baklava",               marka:"",kal:427, pro:6.8,  karb:48,  yag:24,  lif:1.5, sod:205, demir:1.5, kals:60,  vitC:0,    vitD:0,    vitB12:0,    acik:20, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0 },
  { id:96,  ad:"Sütlaç",                marka:"",kal:133, pro:4,    karb:24,  yag:2.8, lif:0.1, sod:65,  demir:0.1, kals:116, vitC:0,    vitD:0.2,  vitB12:0.3,  acik:50, por:100, aclik:"1-2 saat", onay:true, kat:"Atıştırmalık", yildiz:2.5 },
  { id:97,  ad:"Lokma",                 marka:"",kal:354, pro:5,    karb:55,  yag:12,  lif:0.8, sod:180, demir:0.9, kals:40,  vitC:0,    vitD:0,    vitB12:0,    acik:15, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:98,  ad:"Kadayıf",               marka:"",kal:352, pro:6,    karb:52,  yag:14,  lif:1.2, sod:200, demir:1.3, kals:71,  vitC:0,    vitD:0,    vitB12:0,    acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  // ── KAHVALTI ──
  { id:99,  ad:"Sucuk (Sığır)",         marka:"",kal:444, pro:19,   karb:1.5, yag:40,  lif:0,   sod:1300,demir:3.2, kals:20,  vitC:0,    vitD:0,    vitB12:1.5,  acik:50, por:100,  aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:0.5 },
  { id:100, ad:"Pastırma",              marka:"",kal:320, pro:36,   karb:1,   yag:19,  lif:0,   sod:1800,demir:4.5, kals:30,  vitC:0,    vitD:0,    vitB12:2.0,  acik:60, por:100,  aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:1.5 },
  { id:101, ad:"Sosis",                 marka:"",kal:296, pro:11,   karb:2.4, yag:27,  lif:0,   sod:820, demir:1.0, kals:14,  vitC:0,    vitD:0,    vitB12:0.8,  acik:40, por:100,  aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:1.5 },
  { id:102, ad:"Granola",               marka:"",kal:471, pro:10,   karb:64,  yag:19,  lif:6.6, sod:26,  demir:3.5, kals:50,  vitC:0,    vitD:0,    vitB12:0,    acik:65, por:100,  aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:3.5 },
  { id:103, ad:"Krep",                  marka:"",kal:186, pro:5.5,  karb:24,  yag:7.7, lif:0.7, sod:319, demir:0.7, kals:83,  vitC:0.2,  vitD:0.2,  vitB12:0.3,  acik:40, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2.5 },
  { id:104, ad:"Pankek",                marka:"",kal:227, pro:6,    karb:38,  yag:6.4, lif:1,   sod:380, demir:1.4, kals:79,  vitC:0,    vitD:0.2,  vitB12:0.2,  acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2.5 },
  { id:105, ad:"Avokado",               marka:"",kal:160, pro:2,    karb:9,   yag:15,  lif:6.7, sod:7,   demir:0.6, kals:12,  vitC:10,   vitD:0,    vitB12:0,    acik:78, por:100, aclik:"2-3 saat", onay:true, kat:"Meyve", yildiz:5 },

  // ── ET & TAVUK ──
  { id:106, ad:"Kuzu Pirzola",           marka:"",kal:294, pro:25,   karb:0,   yag:21,  lif:0,   sod:72,  demir:2.3, kals:17,  vitC:0,    vitD:0.1,  vitB12:2.5,  acik:84, por:100, aclik:"4-5 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:107, ad:"Hindi Göğsü (Fırın)",    marka:"",kal:135, pro:30,   karb:0,   yag:1.5, lif:0,   sod:63,  demir:1.1, kals:14,  vitC:0,    vitD:0.1,  vitB12:0.3,  acik:89, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:108, ad:"Tavuk Kanat (Fırın)",    marka:"",kal:222, pro:22,   karb:0,   yag:14,  lif:0,   sod:82,  demir:0.9, kals:15,  vitC:0,    vitD:0.1,  vitB12:0.3,  acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:109, ad:"Köfte (Izgara)",         marka:"",kal:240, pro:23,   karb:4,   yag:14,  lif:0.3, sod:420, demir:2.8, kals:22,  vitC:1,    vitD:0.1,  vitB12:1.8,  acik:80, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:110, ad:"Kavurma (Dana)",         marka:"",kal:310, pro:28,   karb:1,   yag:21,  lif:0,   sod:580, demir:3.1, kals:20,  vitC:0,    vitD:0,    vitB12:2.0,  acik:82, por:100, aclik:"4-5 saat", onay:true, kat:"Protein", yildiz:2.5 },
  { id:111, ad:"Ciğer (Dana, Izgara)",   marka:"",kal:175, pro:26,   karb:4.5, yag:5,   lif:0,   sod:75,  demir:6.5, kals:5,   vitC:1.3,  vitD:1.1,  vitB12:60,   acik:85, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:112, ad:"Balık Köfte (Fırın)",    marka:"",kal:160, pro:18,   karb:8,   yag:6,   lif:0.5, sod:310, demir:1.1, kals:55,  vitC:2,    vitD:3.5,  vitB12:1.5,  acik:78, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:113, ad:"Uskumru (Fırın)",        marka:"",kal:205, pro:19,   karb:0,   yag:14,  lif:0,   sod:95,  demir:1.6, kals:66,  vitC:0,    vitD:16.1, vitB12:8.7,  acik:85, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:114, ad:"Karidesler (Haşlanmış)", marka:"",kal:99,  pro:24,   karb:0.2, yag:0.9, lif:0,   sod:111, demir:0.5, kals:64,  vitC:2.3,  vitD:0.4,  vitB12:1.3,  acik:88, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:115, ad:"Midye (Haşlanmış)",      marka:"",kal:172, pro:24,   karb:7,   yag:4.5, lif:0,   sod:369, demir:6.7, kals:33,  vitC:13,   vitD:0.6,  vitB12:12,   acik:84, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:116, ad:"Sardalya (Konserve)",    marka:"",kal:208, pro:25,   karb:0,   yag:11,  lif:0,   sod:505, demir:2.9, kals:382, vitC:0,    vitD:4.8,  vitB12:8.9,  acik:87, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },

  // ── TAHIL & EKMEK ──
  { id:117, ad:"Tam Buğday Erişte",      marka:"",kal:145, pro:5.8,  karb:27,  yag:1.2, lif:4.5, sod:5,   demir:1.5, kals:25,  vitC:0,    vitD:0,    vitB12:0,    acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4 },
  { id:118, ad:"Kinoa (Pişmiş)",         marka:"",kal:120, pro:4.4,  karb:22,  yag:1.9, lif:2.8, sod:7,   demir:1.5, kals:17,  vitC:0,    vitD:0,    vitB12:0,    acik:74, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:5 },
  { id:119, ad:"Karabuğday (Pişmiş)",    marka:"",kal:92,  pro:3.4,  karb:20,  yag:0.6, lif:2.7, sod:4,   demir:0.8, kals:7,   vitC:0,    vitD:0,    vitB12:0,    acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4.5 },
  { id:120, ad:"Çavdar Ekmeği",          marka:"",kal:259, pro:8.5,  karb:48,  yag:3.3, lif:6.2, sod:600, demir:2.5, kals:73,  vitC:0,    vitD:0,    vitB12:0,    acik:60, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4.5 },
  { id:121, ad:"Pide (Sade)",            marka:"",kal:275, pro:9,    karb:54,  yag:3,   lif:2,   sod:480, demir:2.3, kals:28,  vitC:0,    vitD:0,    vitB12:0,    acik:35, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:1.5 },
  { id:122, ad:"Tortilla (Tam Buğday)",  marka:"",kal:218, pro:6,    karb:38,  yag:5,   lif:3.5, sod:390, demir:2.1, kals:80,  vitC:0,    vitD:0,    vitB12:0,    acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:3 },
  { id:123, ad:"Waffle",                 marka:"",kal:291, pro:7.9,  karb:43,  yag:10,  lif:1.3, sod:494, demir:1.9, kals:179, vitC:0.3,  vitD:0.6,  vitB12:0.4,  acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2 },
  { id:124, ad:"Mısır Unu Ekmeği",       marka:"",kal:227, pro:4.5,  karb:43,  yag:4,   lif:2.2, sod:360, demir:1.5, kals:47,  vitC:0,    vitD:0,    vitB12:0,    acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2.5 },

  // ── SÜPERBESINLER & DİYET ──
  { id:125, ad:"Chia Tohumu",            marka:"",kal:486, pro:17,   karb:42,  yag:31,  lif:34,  sod:16,  demir:7.7, kals:631, vitC:1.6,  vitD:0,    vitB12:0,    acik:82, por:100, aclik:"3-4 saat", onay:true, kat:"Diğer", yildiz:5 },
  { id:126, ad:"Keten Tohumu",           marka:"",kal:534, pro:18,   karb:29,  yag:42,  lif:27,  sod:30,  demir:5.7, kals:255, vitC:0.6,  vitD:0,    vitB12:0,    acik:78, por:100, aclik:"3-4 saat", onay:true, kat:"Diğer", yildiz:5 },
  { id:127, ad:"Kabak Çekirdeği",        marka:"",kal:559, pro:30,   karb:11,  yag:49,  lif:6,   sod:7,   demir:8.8, kals:46,  vitC:1.9,  vitD:0,    vitB12:0,    acik:74, por:100, aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:5 },
  { id:128, ad:"Ay Çekirdeği",           marka:"",kal:584, pro:21,   karb:20,  yag:51,  lif:8.6, sod:9,   demir:5.2, kals:78,  vitC:1.4,  vitD:0,    vitB12:0,    acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:5 },
  { id:129, ad:"Spirulina (Toz)",        marka:"",kal:290, pro:57,   karb:24,  yag:8,   lif:3.6, sod:1048,demir:28,  kals:120, vitC:10,   vitD:0,    vitB12:0,    acik:80, por:100, aclik:"3-4 saat", onay:true, kat:"Diğer", yildiz:5 },
  { id:130, ad:"Protein Tozu (Whey)",    marka:"",kal:370, pro:78,   karb:8,   yag:4,   lif:1,   sod:150, demir:1.5, kals:130, vitC:0,    vitD:0,    vitB12:1.0,  acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },

  // ── MEYVE (EK) ──
  { id:131, ad:"Nar",                    marka:"",kal:83,  pro:1.7,  karb:19,  yag:1.2, lif:4,   sod:3,   demir:0.3, kals:10,  vitC:10,   vitD:0,    vitB12:0,    acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4.5 },
  { id:132, ad:"Yaban Mersini (Blueberry)",marka:"",kal:57,pro:0.7,  karb:14,  yag:0.3, lif:2.4, sod:1,   demir:0.3, kals:6,   vitC:9.7,  vitD:0,    vitB12:0,    acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:5 },
  { id:133, ad:"Ahududu",                marka:"",kal:52,  pro:1.2,  karb:12,  yag:0.7, lif:6.5, sod:1,   demir:0.7, kals:25,  vitC:26,   vitD:0,    vitB12:0,    acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:5 },
  { id:134, ad:"İncir (Taze)",           marka:"",kal:74,  pro:0.8,  karb:19,  yag:0.3, lif:2.9, sod:1,   demir:0.4, kals:35,  vitC:2,    vitD:0,    vitB12:0,    acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:3.5 },
  { id:135, ad:"Kayısı (Taze)",          marka:"",kal:48,  pro:1.4,  karb:11,  yag:0.4, lif:2,   sod:1,   demir:0.4, kals:13,  vitC:10,   vitD:0,    vitB12:0,    acik:50, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4.5 },
  { id:136, ad:"Hurma",                  marka:"",kal:277, pro:1.8,  karb:75,  yag:0.2, lif:6.7, sod:1,   demir:0.9, kals:64,  vitC:0.4,  vitD:0,    vitB12:0,    acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:3.5 },
  { id:137, ad:"Greyfurt",               marka:"",kal:42,  pro:0.8,  karb:11,  yag:0.1, lif:1.6, sod:0,   demir:0.1, kals:22,  vitC:31,   vitD:0,    vitB12:0,    acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:5 },
  { id:138, ad:"Erik",                   marka:"",kal:46,  pro:0.7,  karb:11,  yag:0.3, lif:1.4, sod:0,   demir:0.2, kals:6,   vitC:9.5,  vitD:0,    vitB12:0,    acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4 },
  { id:139, ad:"Dut (Kara)",             marka:"",kal:43,  pro:1.4,  karb:10,  yag:0.4, lif:1.7, sod:10,  demir:1.9, kals:39,  vitC:36,   vitD:0,    vitB12:0,    acik:50, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:5 },

  // ── SEBZE (EK) ──
  { id:140, ad:"Kabak (Yeşil/Zucchini)", marka:"",kal:17,  pro:1.2,  karb:3.1, yag:0.3, lif:1,   sod:8,   demir:0.4, kals:16,  vitC:17,   vitD:0,    vitB12:0,    acik:38, por:100, aclik:"1 saat",   onay:true, kat:"Sebze", yildiz:5 },
  { id:141, ad:"Kuşkonmaz",              marka:"",kal:20,  pro:2.2,  karb:3.9, yag:0.1, lif:2.1, sod:2,   demir:2.1, kals:24,  vitC:5.6,  vitD:0,    vitB12:0,    acik:72, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:142, ad:"Kereviz Sapı",           marka:"",kal:16,  pro:0.7,  karb:3,   yag:0.2, lif:1.6, sod:80,  demir:0.2, kals:40,  vitC:3.1,  vitD:0,    vitB12:0,    acik:32, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:143, ad:"Kırmızı Lahana",         marka:"",kal:31,  pro:1.4,  karb:7.4, yag:0.2, lif:2.1, sod:27,  demir:0.8, kals:45,  vitC:57,   vitD:0,    vitB12:0,    acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:144, ad:"Beyaz Lahana",           marka:"",kal:25,  pro:1.3,  karb:5.8, yag:0.1, lif:2.5, sod:18,  demir:0.5, kals:40,  vitC:36,   vitD:0,    vitB12:0,    acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:145, ad:"Roka",                   marka:"",kal:25,  pro:2.6,  karb:3.7, yag:0.7, lif:1.6, sod:27,  demir:1.5, kals:160, vitC:15,   vitD:0,    vitB12:0,    acik:40, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:146, ad:"Marul (İceberg)",        marka:"",kal:14,  pro:0.9,  karb:2.9, yag:0.1, lif:1.2, sod:10,  demir:0.5, kals:18,  vitC:2.8,  vitD:0,    vitB12:0,    acik:28, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4 },
  { id:147, ad:"Rezene",                 marka:"",kal:31,  pro:1.2,  karb:7.3, yag:0.2, lif:3.1, sod:52,  demir:0.7, kals:49,  vitC:12,   vitD:0,    vitB12:0,    acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:148, ad:"Tatlı Patates (Fırın)",  marka:"",kal:90,  pro:2,    karb:21,  yag:0.1, lif:3.3, sod:36,  demir:0.7, kals:38,  vitC:19,   vitD:0,    vitB12:0,    acik:68, por:100, aclik:"2-3 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:149, ad:"Patates (Haşlanmış)",    marka:"",kal:87,  pro:1.9,  karb:20,  yag:0.1, lif:1.8, sod:6,   demir:0.3, kals:5,   vitC:13,   vitD:0,    vitB12:0,    acik:62, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:2.5 },
  { id:150, ad:"Mantar (Kültür)",        marka:"",kal:22,  pro:3.1,  karb:3.3, yag:0.3, lif:1,   sod:5,   demir:0.5, kals:3,   vitC:2.1,  vitD:0.2,  vitB12:0,    acik:65, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:151, ad:"Enginar (Haşlanmış)",    marka:"",kal:53,  pro:2.9,  karb:12,  yag:0.2, lif:5.4, sod:77,  demir:1.3, kals:21,  vitC:7.4,  vitD:0,    vitB12:0,    acik:78, por:100, aclik:"2-3 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:152, ad:"Pazı (Pişmiş)",          marka:"",kal:19,  pro:1.9,  karb:3.6, yag:0.1, lif:2.1, sod:179, demir:2.3, kals:58,  vitC:18,   vitD:0,    vitB12:0,    acik:70, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },

  // ── BAKLIYAT ──
  { id:153, ad:"Siyah Fasulye (Pişmiş)", marka:"",kal:132, pro:8.9,  karb:24,  yag:0.5, lif:8.7, sod:1,   demir:2.1, kals:27,  vitC:0,    vitD:0,    vitB12:0,    acik:88, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:154, ad:"Barbunya (Pişmiş)",      marka:"",kal:127, pro:8.7,  karb:22,  yag:0.5, lif:7.4, sod:3,   demir:2.6, kals:50,  vitC:1.2,  vitD:0,    vitB12:0,    acik:86, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:155, ad:"Yeşil Mercimek (Pişmiş)",marka:"",kal:116, pro:9,    karb:20,  yag:0.4, lif:7.9, sod:2,   demir:3.3, kals:19,  vitC:1.5,  vitD:0,    vitB12:0,    acik:86, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:156, ad:"Edamame (Yeşil Soya)",   marka:"",kal:121, pro:11,   karb:9,   yag:5.2, lif:5.2, sod:6,   demir:2.3, kals:63,  vitC:6.1,  vitD:0,    vitB12:0,    acik:82, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:157, ad:"Tofu",                   marka:"",kal:76,  pro:8,    karb:1.9, yag:4.8, lif:0.3, sod:7,   demir:1.6, kals:350, vitC:0.1,  vitD:0,    vitB12:0,    acik:70, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:158, ad:"Falafel (Fırın)",        marka:"",kal:333, pro:14,   karb:32,  yag:18,  lif:5,   sod:294, demir:4.0, kals:58,  vitC:1.5,  vitD:0,    vitB12:0,    acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:159, ad:"Hummus",                 marka:"",kal:166, pro:7.9,  karb:14,  yag:9.6, lif:6,   sod:379, demir:2.4, kals:49,  vitC:3.5,  vitD:0,    vitB12:0,    acik:74, por:100, aclik:"2-3 saat", onay:true, kat:"Diğer", yildiz:4.5 },

  // ── SÜT ÜRÜNLERİ (EK) ──
  { id:160, ad:"Labne (Süzme Yoğurt)",   marka:"",kal:201, pro:8.5,  karb:3.5, yag:17,  lif:0,   sod:72,  demir:0.1, kals:93,  vitC:0,    vitD:0.1,  vitB12:0.5,  acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:3 },
  { id:161, ad:"Cottage Cheese",         marka:"",kal:98,  pro:11,   karb:3.4, yag:4.5, lif:0,   sod:364, demir:0.1, kals:83,  vitC:0,    vitD:0,    vitB12:0.4,  acik:76, por:100, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:4 },
  { id:162, ad:"Parmesan Peyniri",       marka:"",kal:431, pro:38,   karb:4.1, yag:29,  lif:0,   sod:1109,demir:0.8, kals:1184,vitC:0,    vitD:0.6,  vitB12:1.2,  acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:2.5 },
  { id:163, ad:"Mozzarella (Az Yağlı)",  marka:"",kal:254, pro:28,   karb:2.8, yag:14,  lif:0,   sod:627, demir:0.3, kals:505, vitC:0,    vitD:0.4,  vitB12:0.8,  acik:74, por:100, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:3.5 },
  { id:164, ad:"İçli Süt (UHT, Light)",  marka:"",kal:46,  pro:3.4,  karb:5,   yag:1.6, lif:0,   sod:48,  demir:0,   kals:120, vitC:0,    vitD:1.0,  vitB12:0.4,  acik:60, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:4 },
  { id:165, ad:"Badem Sütü (Sade)",      marka:"",kal:17,  pro:0.6,  karb:0.6, yag:1.5, lif:0.3, sod:72,  demir:0.2, kals:184, vitC:0,    vitD:1.1,  vitB12:0,    acik:30, por:100, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4 },
  { id:166, ad:"Yulaf Sütü",             marka:"",kal:47,  pro:1,    karb:9,   yag:1.5, lif:0.8, sod:95,  demir:0.3, kals:120, vitC:0,    vitD:1.2,  vitB12:0.4,  acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:3.5 },

  // ── HAZIR YEMEK & TÜRK MUTFAĞI ──
  { id:167, ad:"Menemen",                marka:"",kal:125, pro:7.5,  karb:7,   yag:7.5, lif:1.5, sod:320, demir:1.2, kals:55,  vitC:22,   vitD:0.4,  vitB12:0.4,  acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:4 },
  { id:168, ad:"Karnıyarık",             marka:"",kal:165, pro:9,    karb:12,  yag:10,  lif:3.5, sod:380, demir:2.1, kals:40,  vitC:12,   vitD:0,    vitB12:0.8,  acik:78, por:100, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:3.5 },
  { id:169, ad:"İmam Bayıldı",           marka:"",kal:112, pro:1.8,  karb:9,   yag:8,   lif:3,   sod:290, demir:0.6, kals:18,  vitC:8,    vitD:0,    vitB12:0,    acik:68, por:100, aclik:"1-2 saat", onay:true, kat:"Hazır Yemek", yildiz:3.5 },
  { id:170, ad:"Türlü (Sebzeli Güveç)",  marka:"",kal:75,  pro:2.5,  karb:10,  yag:3,   lif:3.2, sod:250, demir:0.9, kals:35,  vitC:18,   vitD:0,    vitB12:0,    acik:76, por:100, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:4.5 },
  { id:171, ad:"Etli Nohut",             marka:"",kal:148, pro:10,   karb:15,  yag:5.5, lif:4.8, sod:310, demir:2.2, kals:42,  vitC:1.5,  vitD:0,    vitB12:0.8,  acik:85, por:100, aclik:"3-4 saat", onay:true, kat:"Hazır Yemek", yildiz:4.5 },
  { id:172, ad:"Etli Barbunya",          marka:"",kal:145, pro:9.5,  karb:15,  yag:5,   lif:5.5, sod:300, demir:2.8, kals:48,  vitC:1.2,  vitD:0,    vitB12:0.8,  acik:86, por:100, aclik:"3-4 saat", onay:true, kat:"Hazır Yemek", yildiz:4.5 },
  { id:173, ad:"Çoban Salatası",         marka:"",kal:45,  pro:1.5,  karb:7,   yag:2,   lif:2,   sod:180, demir:0.5, kals:22,  vitC:30,   vitD:0,    vitB12:0,    acik:50, por:100, aclik:"1 saat",   onay:true, kat:"Sebze", yildiz:5 },
  { id:174, ad:"Cacık",                  marka:"",kal:46,  pro:2.5,  karb:3.8, yag:2.2, lif:0.3, sod:200, demir:0.2, kals:80,  vitC:1.5,  vitD:0.1,  vitB12:0.3,  acik:55, por:100, aclik:"1 saat",   onay:true, kat:"Süt Ürünü", yildiz:4 },
  { id:175, ad:"Patlıcan Kebabı",        marka:"",kal:195, pro:14,   karb:8,   yag:12,  lif:2.8, sod:420, demir:2.0, kals:30,  vitC:5,    vitD:0,    vitB12:1.2,  acik:80, por:100, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:3 },
  { id:176, ad:"Şiş Köfte",             marka:"",kal:245, pro:22,   karb:3,   yag:16,  lif:0.5, sod:450, demir:2.5, kals:25,  vitC:1,    vitD:0.1,  vitB12:1.8,  acik:82, por:100, aclik:"3-4 saat", onay:true, kat:"Hazır Yemek", yildiz:3 },
  { id:177, ad:"Zeytinyağlı Fasulye",    marka:"",kal:98,  pro:3.2,  karb:13,  yag:4.5, lif:4.5, sod:260, demir:1.8, kals:45,  vitC:5,    vitD:0,    vitB12:0,    acik:80, por:100, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:4.5 },
  { id:178, ad:"Zeytinyağlı Enginar",    marka:"",kal:85,  pro:2,    karb:10,  yag:4.5, lif:4.5, sod:200, demir:1.1, kals:35,  vitC:6,    vitD:0,    vitB12:0,    acik:76, por:100, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:5 },

  // ── ÇORBA (EK) ──
  { id:179, ad:"Sebze Çorbası",          marka:"",kal:40,  pro:1.8,  karb:7.5, yag:0.8, lif:2.2, sod:340, demir:0.6, kals:22,  vitC:9,    vitD:0,    vitB12:0,    acik:70, por:100, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:4.5 },
  { id:180, ad:"Yayla Çorbası",          marka:"",kal:65,  pro:3.5,  karb:8,   yag:2,   lif:0.5, sod:360, demir:0.4, kals:95,  vitC:0.5,  vitD:0.1,  vitB12:0.3,  acik:68, por:100, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:3.5 },
  { id:181, ad:"İşkembe Çorbası",        marka:"",kal:55,  pro:5,    karb:3,   yag:2.8, lif:0,   sod:420, demir:0.6, kals:30,  vitC:0,    vitD:0,    vitB12:0.5,  acik:65, por:100, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:2 },
  { id:182, ad:"Düğün Çorbası",          marka:"",kal:78,  pro:5.5,  karb:6,   yag:3.5, lif:0.3, sod:390, demir:0.8, kals:35,  vitC:0,    vitD:0.1,  vitB12:0.4,  acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Çorba", yildiz:3 },
  { id:183, ad:"Tavuk Çorbası",          marka:"",kal:58,  pro:5.5,  karb:5,   yag:1.8, lif:0.4, sod:350, demir:0.5, kals:18,  vitC:1,    vitD:0.1,  vitB12:0.2,  acik:74, por:100, aclik:"2-3 saat", onay:true, kat:"Çorba", yildiz:4 },

  // ── TATLI & PASTA ──
  { id:184, ad:"Revani",                 marka:"",kal:298, pro:4.5,  karb:52,  yag:8.5, lif:0.5, sod:150, demir:0.8, kals:38,  vitC:0,    vitD:0.1,  vitB12:0.1,  acik:20, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:185, ad:"Muhallebi",              marka:"",kal:115, pro:3.2,  karb:22,  yag:2,   lif:0,   sod:55,  demir:0.1, kals:100, vitC:0,    vitD:0.2,  vitB12:0.3,  acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Atıştırmalık", yildiz:2 },
  { id:186, ad:"Tulumba Tatlısı",        marka:"",kal:380, pro:4,    karb:60,  yag:13,  lif:0.5, sod:190, demir:0.7, kals:35,  vitC:0,    vitD:0,    vitB12:0,    acik:14, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0 },
  { id:187, ad:"Çikolatalı Kek",         marka:"",kal:371, pro:5,    karb:54,  yag:15,  lif:2.4, sod:260, demir:1.8, kals:44,  vitC:0,    vitD:0.2,  vitB12:0.1,  acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:188, ad:"Cheesecake",             marka:"",kal:321, pro:5.5,  karb:26,  yag:22,  lif:0.5, sod:235, demir:0.5, kals:66,  vitC:2,    vitD:0.5,  vitB12:0.3,  acik:22, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:189, ad:"Dondurma (Vanilyalı)",   marka:"",kal:207, pro:3.5,  karb:24,  yag:11,  lif:0.7, sod:80,  demir:0.1, kals:128, vitC:0.8,  vitD:0.3,  vitB12:0.3,  acik:25, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1.5 },

  // ── KAHVALTI ──
  { id:190, ad:"Yumurtalı Sahanda",      marka:"",kal:185, pro:14,   karb:0.8, yag:14,  lif:0,   sod:370, demir:1.7, kals:54,  vitC:0,    vitD:2.0,  vitB12:1.0,  acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:191, ad:"Haşlanmış Yumurta",      marka:"",kal:155, pro:13,   karb:1.1, yag:11,  lif:0,   sod:124, demir:1.8, kals:56,  vitC:0,    vitD:2.2,  vitB12:1.1,  acik:76, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:192, ad:"Omlet (2 Yumurta)",      marka:"",kal:190, pro:14,   karb:1.5, yag:14,  lif:0,   sod:180, demir:1.7, kals:55,  vitC:0,    vitD:2.1,  vitB12:1.0,  acik:74, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:193, ad:"Poğaça (Peynirli)",      marka:"",kal:310, pro:9,    karb:38,  yag:14,  lif:1.2, sod:480, demir:1.8, kals:120, vitC:0,    vitD:0.2,  vitB12:0.2,  acik:40, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:1.5 },
  { id:194, ad:"Börek (Ispanaklı)",      marka:"",kal:265, pro:8.5,  karb:28,  yag:13,  lif:2.5, sod:420, demir:2.1, kals:140, vitC:8,    vitD:0.2,  vitB12:0.2,  acik:65, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:3 },
  { id:195, ad:"Börek (Kıymalı)",        marka:"",kal:290, pro:12,   karb:27,  yag:15,  lif:1.5, sod:450, demir:2.5, kals:55,  vitC:1,    vitD:0.1,  vitB12:1.0,  acik:68, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:2.5 },

  // ── ATIŞTIMALIK & İÇECEK (EK) ──
  { id:196, ad:"Karışık Kuruyemiş",      marka:"",kal:607, pro:18,   karb:21,  yag:54,  lif:7.5, sod:10,  demir:3.2, kals:120, vitC:1,    vitD:0,    vitB12:0,    acik:68, por:100, aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:4.5 },
  { id:197, ad:"Muzlu Milkshake",        marka:"",kal:112, pro:3.5,  karb:20,  yag:2.5, lif:0.8, sod:60,  demir:0.2, kals:120, vitC:5,    vitD:0.5,  vitB12:0.3,  acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"İçecek", yildiz:3.5 },
  { id:198, ad:"Türk Çayı (Şekerli)",    marka:"",kal:30,  pro:0,    karb:7.5, yag:0,   lif:0,   sod:3,   demir:0.1, kals:1,   vitC:0,    vitD:0,    vitB12:0,    acik:5,  por:100, aclik:"30 dk",    onay:true, kat:"İçecek", yildiz:2 },
  { id:199, ad:"Bitki Çayı (Papatya)",   marka:"",kal:1,   pro:0,    karb:0.2, yag:0,   lif:0,   sod:2,   demir:0.1, kals:2,   vitC:0,    vitD:0,    vitB12:0,    acik:5,  por:100, aclik:"30 dk",    onay:true, kat:"İçecek", yildiz:4.5 },
  { id:200, ad:"Taze Sıkılmış Limon Suyu",marka:"",kal:25, pro:0.4,  karb:7.8, yag:0.3, lif:0.3, sod:1,   demir:0.1, kals:6,   vitC:39,   vitD:0,    vitB12:0,    acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4.5 },
  { id:201, ad:"Domates Suyu (Ev Yapımı)",marka:"",kal:17, pro:0.9,  karb:3.5, yag:0.1, lif:0.4, sod:18,  demir:0.5, kals:10,  vitC:22,   vitD:0,    vitB12:0,    acik:28, por:100, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4.5 },
  { id:202, ad:"Nane Limon (Sıcak)",     marka:"",kal:5,   pro:0.1,  karb:1.2, yag:0,   lif:0,   sod:2,   demir:0.1, kals:3,   vitC:4,    vitD:0,    vitB12:0,    acik:5,  por:100, aclik:"30 dk",    onay:true, kat:"İçecek", yildiz:5 },
  { id:203, ad:"Hindistan Cevizi Suyu",  marka:"",kal:19,  pro:0.7,  karb:3.7, yag:0.2, lif:1.1, sod:105, demir:0.3, kals:24,  vitC:2.4,  vitD:0,    vitB12:0,    acik:30, por:100, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4 },

  // ── DIĞER / BAHARATLAR & SOSLAR ──
  { id:204, ad:"Hardal",                 marka:"",kal:66,  pro:3.7,  karb:5.8, yag:4,   lif:3.3, sod:1140,demir:1.8, kals:58,  vitC:3.3,  vitD:0,    vitB12:0,    acik:15, por:100, aclik:"—",        onay:true, kat:"Diğer", yildiz:2 },
  { id:205, ad:"Ketçap",                 marka:"",kal:101, pro:1.7,  karb:25,  yag:0.2, lif:0.5, sod:907, demir:0.6, kals:17,  vitC:4.4,  vitD:0,    vitB12:0,    acik:10, por:100, aclik:"—",        onay:true, kat:"Diğer", yildiz:0.5 },
  { id:206, ad:"Mayonez",                marka:"",kal:680, pro:1,    karb:0.6, yag:75,  lif:0,   sod:635, demir:0.1, kals:13,  vitC:0,    vitD:0,    vitB12:0,    acik:8,  por:100, aclik:"—",        onay:true, kat:"Diğer", yildiz:0 },
  { id:207, ad:"Zeytinyağlı Sos (Sirke)",marka:"",kal:45,  pro:0,    karb:2,   yag:4,   lif:0,   sod:220, demir:0,   kals:2,   vitC:0,    vitD:0,    vitB12:0,    acik:5,  por:100, aclik:"—",        onay:true, kat:"Diğer", yildiz:3 },
  { id:208, ad:"Lor ile Incir Reçeli",   marka:"",kal:185, pro:5,    karb:35,  yag:3,   lif:1,   sod:105, demir:0.2, kals:75,  vitC:3,    vitD:0,    vitB12:0.2,  acik:38, por:100, aclik:"1 saat",   onay:true, kat:"Diğer", yildiz:2.5 },
  { id:209, ad:"Fıstık Ezmesi (Light)",  marka:"",kal:489, pro:22,   karb:28,  yag:37,  lif:6,   sod:390, demir:1.6, kals:44,  vitC:0,    vitD:0,    vitB12:0,    acik:62, por:100, aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:3 },
  { id:210, ad:"Zencefil (Taze)",        marka:"",kal:80,  pro:1.8,  karb:18,  yag:0.8, lif:2,   sod:13,  demir:0.6, kals:16,  vitC:5,    vitD:0,    vitB12:0,    acik:20, por:100, aclik:"—",        onay:true, kat:"Diğer", yildiz:5 },
  { id:211, ad:"Big Mac", marka:"McDonald's",kal:563, pro:26, karb:45, yag:31, lif:3, sod:1010, demir:3.2, kals:196, vitC:1.4, vitD:0.3, vitB12:1.2, acik:18, por:200, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:0.5 },
  { id:212, ad:"McChicken", marka:"McDonald's",kal:395, pro:19, karb:41, yag:17, lif:2, sod:700, demir:2.0, kals:100, vitC:0, vitD:0.1, vitB12:0.5, acik:20, por:160, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:1 },
  { id:213, ad:"Cheeseburger", marka:"McDonald's",kal:303, pro:15, karb:33, yag:13, lif:1.5, sod:750, demir:2.5, kals:182, vitC:0.6, vitD:0.2, vitB12:0.8, acik:18, por:120, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:1 },
  { id:214, ad:"McFlurry (Oreo)", marka:"McDonald's",kal:340, pro:8, karb:53, yag:11, lif:0.5, sod:180, demir:0.3, kals:260, vitC:0.5, vitD:0.4, vitB12:0.5, acik:15, por:240, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:215, ad:"Hamburger (Sade)", marka:"McDonald's",kal:253, pro:12, karb:31, yag:9, lif:1.3, sod:520, demir:2.2, kals:150, vitC:0.5, vitD:0.2, vitB12:0.7, acik:15, por:100, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:1 },
  { id:216, ad:"Patates Kızartması (Büyük)", marka:"McDonald's",kal:490, pro:7, karb:62, yag:23, lif:6, sod:400, demir:1.2, kals:18, vitC:9, vitD:0, vitB12:0, acik:22, por:154, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:217, ad:"McDouble", marka:"McDonald's",kal:448, pro:25, karb:37, yag:21, lif:2, sod:840, demir:3.8, kals:224, vitC:0.8, vitD:0.3, vitB12:1.6, acik:20, por:176, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:1 },
  { id:218, ad:"Mozzarella Stick (4'lü)", marka:"McDonald's",kal:290, pro:12, karb:26, yag:15, lif:1, sod:560, demir:0.8, kals:220, vitC:0.2, vitD:0.2, vitB12:0.4, acik:16, por:96, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:219, ad:"Whopper", marka:"Burger King",kal:677, pro:28, karb:51, yag:40, lif:3, sod:980, demir:3.9, kals:100, vitC:3.6, vitD:0.2, vitB12:1.4, acik:18, por:290, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:0.5 },
  { id:220, ad:"Chicken Royale", marka:"Burger King",kal:660, pro:25, karb:57, yag:37, lif:3, sod:1040, demir:3.0, kals:80, vitC:1.5, vitD:0.1, vitB12:0.4, acik:17, por:270, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:0.5 },
  { id:221, ad:"Onion Rings (Büyük)", marka:"Burger King",kal:500, pro:7, karb:60, yag:26, lif:4, sod:820, demir:1.4, kals:28, vitC:4, vitD:0, vitB12:0, acik:18, por:150, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:222, ad:"Zinger Burger", marka:"KFC",kal:450, pro:26, karb:38, yag:22, lif:2, sod:900, demir:2.5, kals:100, vitC:1.2, vitD:0.2, vitB12:0.4, acik:19, por:188, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:1 },
  { id:223, ad:"Tavuk Parçaları (2'li)", marka:"KFC",kal:320, pro:22, karb:14, yag:20, lif:0.8, sod:680, demir:1.1, kals:15, vitC:0, vitD:0.2, vitB12:0.4, acik:22, por:138, aclik:"30-60 dk", onay:true, kat:"Protein", yildiz:1.5 },
  { id:224, ad:"Coleslaw", marka:"KFC",kal:130, pro:1.2, karb:14, yag:7.5, lif:1.5, sod:250, demir:0.3, kals:30, vitC:4, vitD:0, vitB12:0, acik:35, por:80, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:2 },
  { id:225, ad:"Taco (Klasik)", marka:"Taco Bell",kal:210, pro:10, karb:19, yag:10, lif:3, sod:360, demir:1.4, kals:50, vitC:0.5, vitD:0.1, vitB12:0.3, acik:20, por:78, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:1.5 },
  { id:226, ad:"Pizza Dilimi (Pepperoni)", marka:"Pizza Hut",kal:285, pro:12, karb:34, yag:12, lif:2, sod:640, demir:2.0, kals:150, vitC:0.9, vitD:0.2, vitB12:0.5, acik:20, por:107, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:1 },
  { id:227, ad:"Pizza Dilimi (Margherita)", marka:"Pizza Hut",kal:240, pro:10, karb:35, yag:7, lif:2, sod:520, demir:1.8, kals:180, vitC:1.2, vitD:0.2, vitB12:0.4, acik:22, por:107, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:1.5 },
  { id:228, ad:"Baconator", marka:"Wendy's",kal:950, pro:57, karb:49, yag:62, lif:2, sod:1620, demir:7.0, kals:100, vitC:0, vitD:0.5, vitB12:2.2, acik:14, por:308, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:0 },
  { id:229, ad:"Tavuklu Wrap", marka:"Subway",kal:310, pro:22, karb:40, yag:8, lif:3, sod:690, demir:2.5, kals:150, vitC:2.5, vitD:0.2, vitB12:0.3, acik:30, por:200, aclik:"1-2 saat", onay:true, kat:"Hazır Yemek", yildiz:2.5 },
  { id:230, ad:"Italian BMT", marka:"Subway",kal:480, pro:23, karb:47, yag:22, lif:4, sod:1560, demir:3.0, kals:100, vitC:2.5, vitD:0.2, vitB12:0.7, acik:22, por:230, aclik:"1-2 saat", onay:true, kat:"Hazır Yemek", yildiz:1 },
  { id:231, ad:"Köfte Dürüm", marka:"Döner Place",kal:480, pro:28, karb:42, yag:22, lif:2.5, sod:820, demir:2.5, kals:40, vitC:2, vitD:0, vitB12:1.2, acik:35, por:220, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:2 },
  { id:232, ad:"Tavuk Dürüm", marka:"Döner Place",kal:420, pro:25, karb:43, yag:18, lif:2.5, sod:750, demir:1.8, kals:40, vitC:1.2, vitD:0.1, vitB12:0.3, acik:32, por:200, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:2 },
  { id:233, ad:"Lahmacun", marka:"Güneyli",kal:210, pro:10, karb:28, yag:7, lif:2, sod:480, demir:2.0, kals:30, vitC:2, vitD:0, vitB12:0.5, acik:38, por:110, aclik:"1-2 saat", onay:true, kat:"Hazır Yemek", yildiz:2.5 },
  { id:234, ad:"Pide (Kuşbaşılı)", marka:"Kıyı",kal:380, pro:22, karb:42, yag:14, lif:2.2, sod:590, demir:2.8, kals:45, vitC:1.5, vitD:0, vitB12:1.0, acik:52, por:200, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:2.5 },
  { id:235, ad:"Balık Ekmek", marka:"Tarihi Eminönü",kal:280, pro:18, karb:30, yag:10, lif:1.5, sod:480, demir:1.2, kals:40, vitC:1.2, vitD:3.0, vitB12:1.5, acik:40, por:150, aclik:"1-2 saat", onay:true, kat:"Hazır Yemek", yildiz:2.5 },
  { id:236, ad:"Midye Dolma (adet)", marka:"Boğaz",kal:55, pro:3, karb:7, yag:2, lif:0.5, sod:140, demir:0.5, kals:10, vitC:1, vitD:0.1, vitB12:0.3, acik:28, por:30, aclik:"30-60 dk", onay:true, kat:"Protein", yildiz:3 },
  { id:237, ad:"Islak Hamburger", marka:"Bambi Cafe",kal:280, pro:14, karb:32, yag:12, lif:2, sod:610, demir:2.0, kals:100, vitC:0.6, vitD:0.2, vitB12:0.6, acik:18, por:120, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:1 },
  { id:238, ad:"Tantuni", marka:"Mersin Tantuni",kal:350, pro:22, karb:35, yag:14, lif:2.5, sod:680, demir:2.5, kals:30, vitC:2, vitD:0, vitB12:1.0, acik:42, por:160, aclik:"1-2 saat", onay:true, kat:"Hazır Yemek", yildiz:2.5 },
  { id:239, ad:"Gözleme (Peynirli)", marka:"Kafeterya",kal:280, pro:10, karb:32, yag:13, lif:1.5, sod:420, demir:1.5, kals:180, vitC:0.5, vitD:0.2, vitB12:0.4, acik:42, por:130, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2.5 },
  { id:240, ad:"Gözleme (Ispanaklı)", marka:"Kafeterya",kal:240, pro:9, karb:30, yag:10, lif:2, sod:380, demir:2.0, kals:160, vitC:3, vitD:0.2, vitB12:0.3, acik:45, por:130, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:3 },
  { id:241, ad:"Coca-Cola (330ml)", marka:"Coca-Cola",kal:139, pro:0, karb:35, yag:0, lif:0, sod:14, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:330, aclik:"30 dk", onay:true, kat:"İçecek", yildiz:0 },
  { id:242, ad:"Coca-Cola Zero (330ml)", marka:"Coca-Cola",kal:1, pro:0, karb:0.1, yag:0, lif:0, sod:14, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:330, aclik:"30 dk", onay:true, kat:"İçecek", yildiz:1 },
  { id:243, ad:"Fanta Portakal (330ml)", marka:"Fanta",kal:152, pro:0, karb:39, yag:0, lif:0, sod:9, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:330, aclik:"30 dk", onay:true, kat:"İçecek", yildiz:0 },
  { id:244, ad:"Sprite (330ml)", marka:"Sprite",kal:140, pro:0, karb:36, yag:0, lif:0, sod:30, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:330, aclik:"30 dk", onay:true, kat:"İçecek", yildiz:0 },
  { id:245, ad:"Ayran (200ml)", marka:"Sek",kal:70, pro:4, karb:4, yag:3.5, lif:0, sod:300, demir:0, kals:120, vitC:0, vitD:0.1, vitB12:0.3, acik:35, por:200, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4 },
  { id:246, ad:"Kefir (250ml)", marka:"Pınar",kal:120, pro:7, karb:10, yag:4.5, lif:0, sod:105, demir:0, kals:230, vitC:1.5, vitD:0.1, vitB12:0.5, acik:48, por:250, aclik:"1-2 saat", onay:true, kat:"İçecek", yildiz:4.5 },
  { id:247, ad:"Red Bull (250ml)", marka:"Red Bull",kal:113, pro:1.2, karb:27, yag:0.3, lif:0, sod:105, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:250, aclik:"30 dk", onay:true, kat:"İçecek", yildiz:0.5 },
  { id:248, ad:"Monster Energy (500ml)", marka:"Monster",kal:230, pro:0, karb:54, yag:0, lif:0, sod:360, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:500, aclik:"30 dk", onay:true, kat:"İçecek", yildiz:0 },
  { id:249, ad:"Starbucks Latte (Tall)", marka:"Starbucks",kal:190, pro:9, karb:19, yag:9, lif:0, sod:150, demir:0, kals:300, vitC:0, vitD:0.4, vitB12:0.7, acik:35, por:354, aclik:"1-2 saat", onay:true, kat:"İçecek", yildiz:2.5 },
  { id:250, ad:"Starbucks Frappuccino", marka:"Starbucks",kal:410, pro:4, karb:66, yag:14, lif:0, sod:260, demir:0, kals:120, vitC:0, vitD:0.2, vitB12:0.3, acik:14, por:473, aclik:"30 dk", onay:true, kat:"İçecek", yildiz:0.5 },
  { id:251, ad:"Nescafé 3in1", marka:"Nestlé",kal:75, pro:1, karb:12, yag:2.5, lif:0, sod:40, demir:0, kals:15, vitC:0, vitD:0, vitB12:0, acik:12, por:180, aclik:"30 dk", onay:true, kat:"İçecek", yildiz:1 },
  { id:252, ad:"Lipton Ice Tea (330ml)", marka:"Lipton",kal:115, pro:0, karb:28, yag:0.1, lif:0, sod:15, demir:0, kals:5, vitC:0, vitD:0, vitB12:0, acik:8, por:330, aclik:"30 dk", onay:true, kat:"İçecek", yildiz:0.5 },
  { id:253, ad:"Uludağ Gazoz (330ml)", marka:"Uludağ",kal:132, pro:0, karb:33, yag:0, lif:0, sod:5, demir:0, kals:5, vitC:0, vitD:0, vitB12:0, acik:5, por:330, aclik:"30 dk", onay:true, kat:"İçecek", yildiz:0.5 },
  { id:254, ad:"Fruko (330ml)", marka:"Fruko",kal:128, pro:0, karb:32, yag:0, lif:0, sod:20, demir:0, kals:5, vitC:1.5, vitD:0, vitB12:0, acik:5, por:330, aclik:"30 dk", onay:true, kat:"İçecek", yildiz:0.5 },
  { id:255, ad:"Elidor Meyve Suyu (200ml)", marka:"Elidor",kal:88, pro:0.5, karb:21, yag:0.1, lif:0, sod:10, demir:0.1, kals:8, vitC:10, vitD:0, vitB12:0, acik:12, por:200, aclik:"30 dk", onay:true, kat:"İçecek", yildiz:1 },
  { id:256, ad:"Dimes Portakal Suyu (200ml)", marka:"Dimes",kal:92, pro:1, karb:22, yag:0.2, lif:0, sod:5, demir:0.1, kals:10, vitC:25, vitD:0, vitB12:0, acik:18, por:200, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:2.5 },
  { id:257, ad:"Ülker Çikolatalı Süt (200ml)", marka:"Ülker",kal:160, pro:6, karb:23, yag:5, lif:0.5, sod:100, demir:0, kals:200, vitC:0.5, vitD:0.3, vitB12:0.5, acik:35, por:200, aclik:"1-2 saat", onay:true, kat:"İçecek", yildiz:2.5 },
  { id:258, ad:"Sütaş Ayran (180ml)", marka:"Sütaş",kal:54, pro:3.2, karb:3.5, yag:2.5, lif:0, sod:230, demir:0, kals:110, vitC:0, vitD:0.1, vitB12:0.3, acik:35, por:180, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4 },
  { id:259, ad:"Activia İçecek (320ml)", marka:"Danone",kal:115, pro:5, karb:16, yag:3.5, lif:0, sod:85, demir:0, kals:160, vitC:0, vitD:0.1, vitB12:0.4, acik:42, por:320, aclik:"1-2 saat", onay:true, kat:"İçecek", yildiz:3.5 },
  { id:260, ad:"Nesquik Çikolatalı Süt", marka:"Nestlé",kal:170, pro:7, karb:26, yag:4.5, lif:0.5, sod:110, demir:0.5, kals:220, vitC:0.5, vitD:0.4, vitB12:0.6, acik:38, por:250, aclik:"1-2 saat", onay:true, kat:"İçecek", yildiz:2.5 },
  { id:261, ad:"Doritos (Nacho Peynirli)", marka:"Doritos",kal:143, pro:2, karb:18, yag:7, lif:1.3, sod:210, demir:0.4, kals:10, vitC:0.5, vitD:0, vitB12:0, acik:12, por:28, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:262, ad:"Lay's Classic", marka:"Lay's",kal:160, pro:2, karb:15, yag:10, lif:1.4, sod:170, demir:0.4, kals:9, vitC:3, vitD:0, vitB12:0, acik:12, por:28, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:263, ad:"Pringles Orjinal", marka:"Pringles",kal:155, pro:1.5, karb:15, yag:10, lif:1, sod:150, demir:0.4, kals:6, vitC:3.2, vitD:0, vitB12:0, acik:12, por:28, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:264, ad:"Ülker Çikolata (70g)", marka:"Ülker",kal:374, pro:5, karb:53, yag:17, lif:2, sod:50, demir:1.5, kals:120, vitC:0.2, vitD:0, vitB12:0.2, acik:10, por:70, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:265, ad:"Eti Browni", marka:"Eti",kal:190, pro:2.5, karb:29, yag:8, lif:1, sod:65, demir:0.8, kals:30, vitC:0, vitD:0, vitB12:0.1, acik:8, por:40, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:266, ad:"Eti Crax", marka:"Eti",kal:115, pro:2.5, karb:17, yag:4.5, lif:0.8, sod:220, demir:0.6, kals:10, vitC:0, vitD:0, vitB12:0, acik:12, por:25, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:267, ad:"Bisküvi Petit Beurre", marka:"Ülker",kal:120, pro:2, karb:19, yag:4.5, lif:0.5, sod:90, demir:0.6, kals:15, vitC:0, vitD:0, vitB12:0, acik:12, por:25, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:268, ad:"Oreo (3'lü)", marka:"Nabisco",kal:160, pro:2, karb:25, yag:7, lif:0.5, sod:135, demir:1.5, kals:10, vitC:0, vitD:0, vitB12:0, acik:8, por:34, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:269, ad:"Milka Çikolata (45g)", marka:"Milka",kal:240, pro:3.5, karb:28, yag:13, lif:0.5, sod:75, demir:0.8, kals:130, vitC:0, vitD:0.2, vitB12:0.3, acik:9, por:45, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:270, ad:"Twix", marka:"Mars",kal:250, pro:3, karb:34, yag:12, lif:0.5, sod:110, demir:0.8, kals:55, vitC:0.5, vitD:0, vitB12:0.1, acik:9, por:50, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:271, ad:"Snickers", marka:"Mars",kal:250, pro:4, karb:33, yag:12, lif:1, sod:120, demir:0.8, kals:55, vitC:0.5, vitD:0, vitB12:0.1, acik:10, por:52, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:272, ad:"Kit Kat (4'lü)", marka:"Nestlé",kal:217, pro:3, karb:27, yag:11, lif:0.5, sod:50, demir:1.0, kals:72, vitC:0.3, vitD:0.1, vitB12:0.2, acik:8, por:45, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:273, ad:"Toblerone (35g)", marka:"Toblerone",kal:185, pro:3, karb:23, yag:10, lif:0.5, sod:20, demir:0.8, kals:60, vitC:0.2, vitD:0, vitB12:0.1, acik:10, por:35, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:274, ad:"Nutella (15g)", marka:"Ferrero",kal:80, pro:1, karb:9, yag:4.5, lif:0.3, sod:15, demir:0.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:8, por:15, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:275, ad:"Ülker Halley", marka:"Ülker",kal:100, pro:1.5, karb:13, yag:5, lif:0.5, sod:55, demir:0.4, kals:25, vitC:0, vitD:0, vitB12:0, acik:9, por:25, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:276, ad:"Ritz Kraker (5'li)", marka:"Nabisco",kal:79, pro:1.5, karb:10, yag:3.8, lif:0.3, sod:135, demir:0.3, kals:3, vitC:0, vitD:0, vitB12:0, acik:12, por:16, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:277, ad:"Ülker Dido", marka:"Ülker",kal:142, pro:1.8, karb:20, yag:6, lif:0.5, sod:80, demir:0.5, kals:35, vitC:0, vitD:0, vitB12:0, acik:8, por:30, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:278, ad:"Patos (Mısır Cipsi)", marka:"Patos",kal:130, pro:1.5, karb:18, yag:5.5, lif:1.2, sod:190, demir:0.3, kals:3, vitC:0, vitD:0, vitB12:0, acik:10, por:25, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:279, ad:"Cheetos", marka:"Cheetos",kal:150, pro:2, karb:17, yag:9, lif:0.5, sod:280, demir:0.4, kals:10, vitC:0, vitD:0, vitB12:0, acik:10, por:28, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:280, ad:"PopCorn (Tuzlu)", marka:"Act II",kal:110, pro:3, karb:14, yag:5, lif:2.5, sod:260, demir:0.5, kals:2, vitC:0, vitD:0, vitB12:0, acik:20, por:28, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:1.5 },
  { id:281, ad:"PopCorn (Tereyağlı)", marka:"Act II",kal:150, pro:3, karb:18, yag:8, lif:2.5, sod:310, demir:0.5, kals:2, vitC:0, vitD:0, vitB12:0, acik:16, por:28, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:282, ad:"Gummy Bears", marka:"Haribo",kal:310, pro:5.5, karb:76, yag:0.1, lif:0, sod:20, demir:0.3, kals:4, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0 },
  { id:283, ad:"M&M's (Fıstıklı)", marka:"Mars",kal:250, pro:5, karb:30, yag:13, lif:1.5, sod:90, demir:0.5, kals:40, vitC:0.5, vitD:0, vitB12:0.1, acik:9, por:48, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:284, ad:"Reese's", marka:"Hershey's",kal:232, pro:5, karb:25, yag:14, lif:1.5, sod:150, demir:0.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:9, por:45, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:285, ad:"Mısır Unu Patso", marka:"Eti",kal:120, pro:2, karb:17, yag:5, lif:1, sod:200, demir:0.4, kals:4, vitC:0, vitD:0, vitB12:0, acik:12, por:25, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:286, ad:"Rice Cake (Pirinç Kraker)", marka:"Oryza",kal:35, pro:0.7, karb:7.4, yag:0.3, lif:0.2, sod:15, demir:0.1, kals:1, vitC:0, vitD:0, vitB12:0, acik:18, por:10, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:2.5 },
  { id:287, ad:"Protein Bar", marka:"Quest",kal:190, pro:21, karb:25, yag:7, lif:14, sod:250, demir:3.5, kals:140, vitC:0, vitD:0.5, vitB12:0.2, acik:55, por:60, aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:4 },
  { id:288, ad:"Granola Bar (Yulaf)", marka:"Nature Valley",kal:190, pro:3, karb:29, yag:7, lif:2, sod:160, demir:1.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:38, por:42, aclik:"1-2 saat", onay:true, kat:"Atıştırmalık", yildiz:2.5 },
  { id:289, ad:"Kind Bar (Badem)", marka:"Kind",kal:200, pro:6, karb:22, yag:8, lif:3.5, sod:115, demir:1.8, kals:20, vitC:0.5, vitD:0, vitB12:0, acik:42, por:40, aclik:"1-2 saat", onay:true, kat:"Atıştırmalık", yildiz:3 },
  { id:290, ad:"Ülker İkram Bisküvisi", marka:"Ülker",kal:130, pro:2, karb:20, yag:5, lif:0.5, sod:80, demir:0.5, kals:15, vitC:0, vitD:0, vitB12:0, acik:12, por:30, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:291, ad:"Nutella Kavanozu (20g)", marka:"Ferrero",kal:107, pro:1.3, karb:12, yag:6, lif:0.4, sod:20, demir:0.6, kals:26, vitC:0, vitD:0, vitB12:0, acik:8, por:20, aclik:"30 dk", onay:true, kat:"Diğer", yildiz:0.5 },
  { id:292, ad:"Philadelphia Krem Peynir", marka:"Kraft",kal:100, pro:2.5, karb:1.5, yag:10, lif:0, sod:95, demir:0, kals:60, vitC:0, vitD:0.2, vitB12:0.2, acik:35, por:30, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:2.5 },
  { id:293, ad:"Keçi Peyniri", marka:"Pınar",kal:103, pro:6.5, karb:0.3, yag:8.5, lif:0, sod:200, demir:0.3, kals:100, vitC:0, vitD:0.2, vitB12:0.2, acik:42, por:30, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:3.5 },
  { id:294, ad:"Çedar Peynir Dilimi", marka:"Kraft",kal:120, pro:7, karb:0.5, yag:10, lif:0, sod:180, demir:0.2, kals:200, vitC:0, vitD:0.3, vitB12:0.4, acik:42, por:28, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:3 },
  { id:295, ad:"Lor Peyniri", marka:"Güney",kal:60, pro:7, karb:2.5, yag:2.5, lif:0, sod:95, demir:0, kals:80, vitC:0, vitD:0.1, vitB12:0.2, acik:45, por:50, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:4 },
  { id:296, ad:"Provolone Peynir", marka:"Sütaş",kal:98, pro:7, karb:0.5, yag:7.5, lif:0, sod:420, demir:0.2, kals:212, vitC:0, vitD:0.3, vitB12:0.5, acik:42, por:28, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:3 },
  { id:297, ad:"Kaşar Peyniri", marka:"Eriş",kal:110, pro:7, karb:0.5, yag:9, lif:0, sod:550, demir:0.1, kals:220, vitC:0, vitD:0.3, vitB12:0.4, acik:42, por:30, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:3 },
  { id:298, ad:"Hellmann's Mayonez (15g)", marka:"Hellmann's",kal:99, pro:0.1, karb:0.2, yag:11, lif:0, sod:90, demir:0, kals:2, vitC:0, vitD:0, vitB12:0, acik:5, por:15, aclik:"—", onay:true, kat:"Diğer", yildiz:0 },
  { id:299, ad:"Heinz Ketçap (15g)", marka:"Heinz",kal:15, pro:0.3, karb:3.8, yag:0.1, lif:0.2, sod:160, demir:0.1, kals:5, vitC:0.7, vitD:0, vitB12:0, acik:8, por:15, aclik:"—", onay:true, kat:"Diğer", yildiz:1 },
  { id:300, ad:"Ferrero Rocher (adet)", marka:"Ferrero",kal:73, pro:1.3, karb:6.4, yag:4.7, lif:0.3, sod:15, demir:0.2, kals:12, vitC:0, vitD:0, vitB12:0, acik:8, por:12, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:301, ad:"Yulaf Sütü Barista", marka:"Oatly",kal:60, pro:1, karb:9, yag:1.5, lif:0.8, sod:90, demir:0.2, kals:120, vitC:0, vitD:1.0, vitB12:0.3, acik:32, por:240, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:3.5 },
  { id:302, ad:"Badem Sütü (Sade)", marka:"Alpro",kal:17, pro:0.5, karb:0.6, yag:1.4, lif:0.3, sod:60, demir:0.2, kals:180, vitC:0, vitD:1.0, vitB12:0, acik:32, por:240, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4 },
  { id:303, ad:"Soya Sütü", marka:"Alpro",kal:54, pro:3.3, karb:2.5, yag:2.7, lif:0.5, sod:50, demir:0.5, kals:120, vitC:0, vitD:1.2, vitB12:0.4, acik:38, por:240, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4 },
  { id:304, ad:"Hindistan Cevizi Sütü (kutu)", marka:"Aroy-D",kal:197, pro:2, karb:3, yag:21, lif:0.5, sod:15, demir:1.5, kals:15, vitC:0.5, vitD:0, vitB12:0, acik:25, por:100, aclik:"30-60 dk", onay:true, kat:"Diğer", yildiz:2.5 },
  { id:305, ad:"Greek Yogurt", marka:"Chobani",kal:100, pro:17, karb:7, yag:0.5, lif:0, sod:65, demir:0.1, kals:140, vitC:0, vitD:0.1, vitB12:0.5, acik:62, por:170, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:5 },
  { id:306, ad:"Skyr", marka:"Arla",kal:65, pro:11, karb:4, yag:0.2, lif:0, sod:60, demir:0, kals:135, vitC:0, vitD:0.1, vitB12:0.4, acik:65, por:170, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:5 },
  { id:307, ad:"Whey Protein (Vanilya)", marka:"Optimum",kal:120, pro:24, karb:3, yag:1, lif:0, sod:150, demir:0.5, kals:130, vitC:0, vitD:0, vitB12:0.5, acik:70, por:33, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:308, ad:"Whey Protein (Çikolata)", marka:"Optimum",kal:130, pro:24, karb:4, yag:1.5, lif:1, sod:160, demir:0.8, kals:130, vitC:0, vitD:0, vitB12:0.5, acik:70, por:33, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:309, ad:"BCAA Takviyesi", marka:"MyProtein",kal:20, pro:5, karb:0, yag:0, lif:0, sod:50, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:60, por:10, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:310, ad:"Creatine", marka:"Dymatize",kal:20, pro:4, karb:0, yag:0, lif:0, sod:10, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:60, por:5, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:311, ad:"Maca Tozu", marka:"Organic",kal:295, pro:14, karb:65, yag:2, lif:8.5, sod:18, demir:10, kals:150, vitC:0, vitD:0, vitB12:0, acik:42, por:100, aclik:"2-3 saat", onay:true, kat:"Diğer", yildiz:4.5 },
  { id:312, ad:"Çiğ Badem", marka:"Blue Diamond",kal:579, pro:21, karb:22, yag:50, lif:12.5, sod:1, demir:3.7, kals:264, vitC:0, vitD:0, vitB12:0, acik:68, por:100, aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:4.5 },
  { id:313, ad:"Karışık Fındık", marka:"Planters",kal:607, pro:14, karb:21, yag:56, lif:7, sod:5, demir:3.0, kals:108, vitC:0, vitD:0, vitB12:0, acik:65, por:100, aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:4 },
  { id:314, ad:"Ceviz (İç)", marka:"Antep",kal:654, pro:15, karb:14, yag:65, lif:6.7, sod:2, demir:2.9, kals:98, vitC:1.3, vitD:0, vitB12:0, acik:65, por:100, aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:5 },
  { id:315, ad:"Kaju", marka:"Wonderful",kal:553, pro:18, karb:30, yag:44, lif:3.3, sod:12, demir:6.7, kals:37, vitC:0.5, vitD:0, vitB12:0, acik:60, por:100, aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:3.5 },
  { id:316, ad:"Macadamia", marka:"Macadamia",kal:718, pro:8, karb:14, yag:76, lif:8.6, sod:5, demir:3.7, kals:85, vitC:1.2, vitD:0, vitB12:0, acik:62, por:100, aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:3.5 },
  { id:317, ad:"Antep Fıstığı", marka:"Antep",kal:557, pro:20, karb:28, yag:45, lif:10, sod:1, demir:3.9, kals:105, vitC:5.6, vitD:0, vitB12:0, acik:68, por:100, aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:4.5 },
  { id:318, ad:"Yer Fıstığı", marka:"Maranki",kal:567, pro:26, karb:16, yag:49, lif:8.5, sod:18, demir:4.6, kals:92, vitC:0, vitD:0, vitB12:0, acik:65, por:100, aclik:"2-3 saat", onay:true, kat:"Atıştırmalık", yildiz:3.5 },
  { id:319, ad:"Tahini", marka:"Koska",kal:595, pro:18, karb:21, yag:54, lif:3.5, sod:115, demir:8.9, kals:426, vitC:0, vitD:0, vitB12:0, acik:60, por:100, aclik:"2-3 saat", onay:true, kat:"Diğer", yildiz:4 },
  { id:320, ad:"Karaçalı Balı", marka:"Doğadan",kal:304, pro:0.3, karb:82, yag:0, lif:0.2, sod:4, demir:0.4, kals:6, vitC:0.5, vitD:0, vitB12:0, acik:18, por:100, aclik:"1 saat", onay:true, kat:"Diğer", yildiz:2.5 },
  { id:321, ad:"Kuru Köfte (pişmiş)", marka:"Banvit",kal:220, pro:20, karb:8, yag:13, lif:1.5, sod:580, demir:2.5, kals:30, vitC:0.5, vitD:0.1, vitB12:1.0, acik:48, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:2 },
  { id:322, ad:"Sosisli Sandviç", marka:"Polonez",kal:380, pro:14, karb:38, yag:19, lif:2, sod:980, demir:1.8, kals:80, vitC:0.5, vitD:0.1, vitB12:0.5, acik:20, por:150, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:0.5 },
  { id:323, ad:"Sosis (Biftek)", marka:"Namet",kal:320, pro:13, karb:5, yag:28, lif:0, sod:1100, demir:1.5, kals:15, vitC:0, vitD:0, vitB12:0.5, acik:20, por:100, aclik:"30-60 dk", onay:true, kat:"Protein", yildiz:0.5 },
  { id:324, ad:"Salam (Tavuk)", marka:"Banvit",kal:155, pro:13, karb:1.5, yag:11, lif:0, sod:880, demir:0.5, kals:10, vitC:0, vitD:0, vitB12:0.2, acik:20, por:50, aclik:"30-60 dk", onay:true, kat:"Protein", yildiz:0.5 },
  { id:325, ad:"Pepperoni", marka:"Namet",kal:504, pro:22, karb:1, yag:46, lif:0, sod:1762, demir:0.9, kals:9, vitC:0, vitD:0.3, vitB12:1.1, acik:15, por:100, aclik:"30-60 dk", onay:true, kat:"Protein", yildiz:0 },
  { id:326, ad:"Tulum Peyniri", marka:"Komili",kal:370, pro:25, karb:0.5, yag:30, lif:0, sod:1150, demir:0.3, kals:700, vitC:0, vitD:0.3, vitB12:1.0, acik:50, por:100, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:2 },
  { id:327, ad:"Ezine Peyniri", marka:"Ezine",kal:280, pro:18, karb:2, yag:22, lif:0, sod:900, demir:0.3, kals:500, vitC:0, vitD:0.3, vitB12:0.8, acik:48, por:100, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:2.5 },
  { id:328, ad:"Dil Peyniri", marka:"Sütaş",kal:240, pro:24, karb:1, yag:16, lif:0, sod:780, demir:0.2, kals:600, vitC:0, vitD:0.4, vitB12:1.0, acik:52, por:100, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:3 },
  { id:329, ad:"Örgü Peyniri", marka:"Pınar",kal:280, pro:22, karb:2, yag:20, lif:0, sod:850, demir:0.2, kals:550, vitC:0, vitD:0.3, vitB12:0.8, acik:50, por:100, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:2.5 },
  { id:330, ad:"Labne Köy", marka:"Sütaş",kal:215, pro:7.5, karb:3, yag:19, lif:0, sod:90, demir:0.1, kals:120, vitC:0, vitD:0.1, vitB12:0.4, acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:2.5 },
  { id:331, ad:"Çiğ Köfte (Ambalajlı)", marka:"Antep Ocakbaşı",kal:130, pro:4, karb:24, yag:2.5, lif:4, sod:280, demir:2.0, kals:20, vitC:2, vitD:0, vitB12:0, acik:40, por:100, aclik:"1-2 saat", onay:true, kat:"Hazır Yemek", yildiz:2 },
  { id:332, ad:"Dondurulmuş Naan", marka:"Solan",kal:260, pro:7, karb:50, yag:3.5, lif:2, sod:440, demir:1.8, kals:30, vitC:0, vitD:0, vitB12:0, acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2 },
  { id:333, ad:"Dondurulmuş Ispanaklı Börek", marka:"TAT",kal:220, pro:8, karb:24, yag:11, lif:2.5, sod:420, demir:1.8, kals:140, vitC:3, vitD:0.2, vitB12:0.2, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:3 },
  { id:334, ad:"Dondurulmuş Peynirli Börek", marka:"Üçgen",kal:230, pro:9, karb:22, yag:13, lif:1.5, sod:440, demir:0.8, kals:160, vitC:0, vitD:0.2, vitB12:0.3, acik:40, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2.5 },
  { id:335, ad:"Dondurulmuş Pide (Sucuklu)", marka:"Yayla",kal:310, pro:14, karb:35, yag:14, lif:2, sod:780, demir:2.0, kals:80, vitC:0.5, vitD:0.1, vitB12:0.6, acik:35, por:150, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:1 },
  { id:336, ad:"Hazır Makarna (Kuru)", marka:"Barilla",kal:355, pro:12, karb:70, yag:1.7, lif:3, sod:5, demir:2.5, kals:21, vitC:0, vitD:0, vitB12:0, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2.5 },
  { id:337, ad:"Tam Buğday Makarna", marka:"Barilla",kal:330, pro:13, karb:64, yag:2, lif:7, sod:15, demir:3.5, kals:40, vitC:0, vitD:0, vitB12:0, acik:55, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4 },
  { id:338, ad:"Egg Noodle (Kuru)", marka:"Knorr",kal:340, pro:11, karb:68, yag:2.5, lif:2.5, sod:10, demir:2.5, kals:20, vitC:0, vitD:0.1, vitB12:0, acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2 },
  { id:339, ad:"Orzo (Şehriye)", marka:"Ege",kal:350, pro:11, karb:71, yag:1.5, lif:2, sod:5, demir:2.0, kals:15, vitC:0, vitD:0, vitB12:0, acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2 },
  { id:340, ad:"Couscous", marka:"Knorr",kal:376, pro:13, karb:78, yag:0.6, lif:2.4, sod:10, demir:1.4, kals:24, vitC:0, vitD:0, vitB12:0, acik:40, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2.5 },
  { id:341, ad:"Ton Balığı Suyunda", marka:"Dardanel",kal:116, pro:26, karb:0, yag:0.8, lif:0, sod:330, demir:1.0, kals:12, vitC:0, vitD:4.5, vitB12:2.5, acik:80, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:342, ad:"Ton Balığı Yağda", marka:"Dardanel",kal:200, pro:22, karb:0, yag:13, lif:0, sod:310, demir:0.9, kals:10, vitC:0, vitD:4.0, vitB12:2.2, acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:343, ad:"Sardine (Domatesli)", marka:"Dardanel",kal:185, pro:18, karb:2, yag:12, lif:0, sod:380, demir:2.5, kals:240, vitC:3, vitD:4.0, vitB12:5.5, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:344, ad:"Fasulye Konserve", marka:"TAT",kal:90, pro:5.5, karb:16, yag:0.4, lif:5.5, sod:320, demir:2.0, kals:45, vitC:0, vitD:0, vitB12:0, acik:70, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:345, ad:"Nohut Konserve", marka:"TAT",kal:130, pro:7.5, karb:21, yag:2, lif:6, sod:240, demir:2.4, kals:40, vitC:0, vitD:0, vitB12:0, acik:68, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:346, ad:"Domates Konserve (Küp)", marka:"Mutti",kal:25, pro:1.2, karb:4.5, yag:0.3, lif:1.2, sod:150, demir:0.6, kals:12, vitC:12, vitD:0, vitB12:0, acik:38, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4.5 },
  { id:347, ad:"Domates Püresi", marka:"TAT",kal:34, pro:1.6, karb:6, yag:0.4, lif:1.5, sod:95, demir:0.8, kals:18, vitC:16, vitD:0, vitB12:0, acik:40, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4.5 },
  { id:348, ad:"Şeftali Konserve (Şuruplu)", marka:"Dardanel",kal:70, pro:0.4, karb:18, yag:0.1, lif:0.8, sod:6, demir:0.2, kals:4, vitC:3.2, vitD:0, vitB12:0, acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:1.5 },
  { id:349, ad:"Mısır Konserve", marka:"Bonduelle",kal:86, pro:3, karb:16.8, yag:1.2, lif:2.7, sod:180, demir:0.5, kals:3, vitC:6, vitD:0, vitB12:0, acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:2.5 },
  { id:350, ad:"Bezelye Konserve", marka:"Bonduelle",kal:84, pro:5.4, karb:14.5, yag:0.4, lif:4.5, sod:220, demir:1.5, kals:22, vitC:8, vitD:0, vitB12:0, acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Sebze", yildiz:4 },
  { id:351, ad:"Zeytinyağı", marka:"Kristal",kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:3.5 },
  { id:352, ad:"Hindistan Cevizi Yağı", marka:"Karma",kal:892, pro:0, karb:0, yag:99, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2 },
  { id:353, ad:"Tereyağı (Pastörize)", marka:"Sütaş",kal:737, pro:0.5, karb:0.5, yag:83, lif:0, sod:643, demir:0.1, kals:24, vitC:0, vitD:0.6, vitB12:0.2, acik:8, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:1 },
  { id:354, ad:"Margarin", marka:"Sana",kal:718, pro:0.1, karb:0.1, yag:80, lif:0, sod:580, demir:0, kals:2, vitC:0, vitD:0, vitB12:0, acik:8, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:0.5 },
  { id:355, ad:"Soya Sosu (Light)", marka:"Kikkoman",kal:43, pro:5.5, karb:6, yag:0, lif:0.5, sod:3550, demir:0.5, kals:14, vitC:0, vitD:0, vitB12:0, acik:8, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:1 },
  { id:356, ad:"Balzamik Sirke", marka:"Borges",kal:88, pro:0.4, karb:18, yag:0.1, lif:0, sod:23, demir:0.7, kals:17, vitC:0, vitD:0, vitB12:0, acik:8, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2.5 },
  { id:357, ad:"Sriracha Sos", marka:"Huy Fong",kal:35, pro:0.5, karb:8, yag:0.5, lif:0.5, sod:595, demir:0.5, kals:5, vitC:1, vitD:0, vitB12:0, acik:8, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:1 },
  { id:358, ad:"Tabasco", marka:"McIlhenny",kal:12, pro:0.4, karb:0.5, yag:0.2, lif:0, sod:600, demir:0.4, kals:5, vitC:0, vitD:0, vitB12:0, acik:8, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2 },
  { id:359, ad:"Pesto Sos", marka:"Barilla",kal:421, pro:5, karb:4.5, yag:43, lif:1.5, sod:830, demir:2.5, kals:140, vitC:2, vitD:0, vitB12:0, acik:18, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2.5 },
  { id:360, ad:"Tahin Helvası", marka:"Koska",kal:510, pro:10, karb:55, yag:30, lif:2, sod:50, demir:4.0, kals:190, vitC:0.2, vitD:0, vitB12:0, acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:2 },
  { id:361, ad:"Baget Ekmek", marka:"Uno",kal:270, pro:8, karb:52, yag:2, lif:2.5, sod:510, demir:2.0, kals:25, vitC:0, vitD:0, vitB12:0, acik:32, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:1.5 },
  { id:362, ad:"Kepekli Ekmek (Dilim)", marka:"Uno",kal:210, pro:8, karb:38, yag:2.8, lif:7, sod:380, demir:2.2, kals:50, vitC:0, vitD:0, vitB12:0, acik:48, por:30, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:4 },
  { id:363, ad:"Çavdar Crispbread", marka:"Wasa",kal:335, pro:10, karb:67, yag:2, lif:14, sod:390, demir:3.0, kals:30, vitC:0, vitD:0, vitB12:0, acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:5 },
  { id:364, ad:"Glütensiz Ekmek", marka:"Schar",kal:210, pro:3, karb:42, yag:3.5, lif:2, sod:380, demir:1.5, kals:30, vitC:0, vitD:0, vitB12:0, acik:30, por:60, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2 },
  { id:365, ad:"Pita Ekmeği", marka:"Ege",kal:275, pro:9, karb:56, yag:1.2, lif:2, sod:400, demir:1.8, kals:30, vitC:0, vitD:0, vitB12:0, acik:35, por:60, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2 },
  { id:366, ad:"Tam Buğday Lavaş", marka:"Yufka",kal:240, pro:8, karb:45, yag:2.5, lif:5, sod:350, demir:2.0, kals:25, vitC:0, vitD:0, vitB12:0, acik:42, por:60, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:3.5 },
  { id:367, ad:"Akşam Poğaçası (Sade)", marka:"Sahibinin Yeri",kal:290, pro:7, karb:40, yag:12, lif:1.5, sod:450, demir:1.5, kals:25, vitC:0, vitD:0, vitB12:0.1, acik:28, por:80, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:1 },
  { id:368, ad:"Açma", marka:"Unlu Mamüller",kal:350, pro:7, karb:45, yag:16, lif:1.5, sod:380, demir:1.5, kals:30, vitC:0, vitD:0.1, vitB12:0.1, acik:22, por:90, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:0.5 },
  { id:369, ad:"Milföy Hamuru (Çiğ)", marka:"Göknur",kal:380, pro:5, karb:38, yag:24, lif:1.5, sod:260, demir:1.2, kals:10, vitC:0, vitD:0.1, vitB12:0.1, acik:18, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:1 },
  { id:370, ad:"Pankek (Hazır)", marka:"Betty Crocker",kal:270, pro:5, karb:49, yag:6, lif:1, sod:420, demir:1.8, kals:50, vitC:0, vitD:0.2, vitB12:0.2, acik:25, por:100, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:1.5 },
  { id:371, ad:"Tarçın (Öğütülmüş)", marka:"Arifoğlu",kal:247, pro:4, karb:81, yag:1.2, lif:53, sod:10, demir:8.3, kals:1002, vitC:3.8, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:372, ad:"Zerdeçal", marka:"Arifoğlu",kal:354, pro:8, karb:65, yag:10, lif:21, sod:38, demir:55, kals:183, vitC:26, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:373, ad:"Kimyon", marka:"Arifoğlu",kal:375, pro:18, karb:45, yag:22, lif:11, sod:168, demir:66, kals:931, vitC:7.7, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:374, ad:"Kırmızı Pul Biber", marka:"Arifoğlu",kal:318, pro:14, karb:49, yag:17, lif:28, sod:12, demir:14, kals:148, vitC:107, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:375, ad:"Nane (Kuru)", marka:"Doğadan",kal:285, pro:20, karb:60, yag:6, lif:18, sod:96, demir:87, kals:1386, vitC:31, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:376, ad:"Kekik", marka:"Arifoğlu",kal:276, pro:9, karb:64, yag:7, lif:19, sod:55, demir:124, kals:405, vitC:50, vitD:0.5, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:377, ad:"Zencefil Tozu", marka:"Arifoğlu",kal:335, pro:9, karb:71, yag:6, lif:2, sod:14, demir:19.8, kals:116, vitC:0, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:378, ad:"Sarımsak Tozu", marka:"Arifoğlu",kal:331, pro:16, karb:73, yag:0.7, lif:2.1, sod:60, demir:2.3, kals:79, vitC:1, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:379, ad:"Karabiber", marka:"Arifoğlu",kal:251, pro:10, karb:64, yag:3.3, lif:25, sod:20, demir:28, kals:443, vitC:0, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4.5 },
  { id:380, ad:"Pul Biber (Acı)", marka:"Urfa Bıber",kal:318, pro:14, karb:49, yag:17, lif:28, sod:10, demir:14, kals:148, vitC:64, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:381, ad:"Granola (Fındıklı)", marka:"Dr. Oetker",kal:420, pro:8, karb:62, yag:16, lif:5, sod:80, demir:3.0, kals:40, vitC:0.5, vitD:0, vitB12:0, acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:3 },
  { id:382, ad:"Cornflakes", marka:"Kellogg's",kal:370, pro:7, karb:84, yag:0.9, lif:2, sod:790, demir:8.3, kals:4, vitC:14, vitD:4.2, vitB12:0, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:2.5 },
  { id:383, ad:"Special K", marka:"Kellogg's",kal:375, pro:15, karb:75, yag:1, lif:1.5, sod:680, demir:13.5, kals:10, vitC:24, vitD:4.5, vitB12:1.4, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:3 },
  { id:384, ad:"Weetabix", marka:"Weetabix",kal:362, pro:12, karb:70, yag:2.5, lif:9.7, sod:560, demir:12, kals:15, vitC:0, vitD:2.5, vitB12:0, acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:4 },
  { id:385, ad:"Yulaf Ezmesi Anında", marka:"Quaker",kal:376, pro:13, karb:67, yag:7.5, lif:10, sod:290, demir:4.5, kals:50, vitC:0, vitD:0, vitB12:0, acik:62, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:4.5 },
  { id:386, ad:"Mısır Gevreği (Bal-Badem)", marka:"Kellogg's",kal:380, pro:7, karb:80, yag:4, lif:2.5, sod:220, demir:6.5, kals:20, vitC:10, vitD:2.5, vitB12:0.5, acik:32, por:100, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:2.5 },
  { id:387, ad:"Mısır Unu", marka:"Yörem",kal:361, pro:8.1, karb:76, yag:3.9, lif:7.3, sod:35, demir:2.7, kals:7, vitC:0, vitD:0, vitB12:0, acik:38, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:3 },
  { id:388, ad:"Pirinç Unu", marka:"Ege",kal:366, pro:6, karb:80, yag:1.4, lif:2.4, sod:5, demir:0.4, kals:10, vitC:0, vitD:0, vitB12:0, acik:35, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2 },
  { id:389, ad:"Nişasta", marka:"Duryea",kal:381, pro:0.5, karb:91, yag:0.1, lif:0, sod:10, demir:0.1, kals:2, vitC:0, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:1 },
  { id:390, ad:"Tapioka", marka:"Tapioca",kal:358, pro:0.2, karb:88, yag:0.2, lif:0.2, sod:1, demir:0.3, kals:20, vitC:4, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:1 },
  { id:391, ad:"Magnum Almond", marka:"Algida",kal:280, pro:4, karb:24, yag:19, lif:0.5, sod:60, demir:0.5, kals:90, vitC:0.3, vitD:0.2, vitB12:0.2, acik:10, por:86, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:392, ad:"Cornetto Klasik", marka:"Algida",kal:230, pro:3.5, karb:27, yag:12, lif:0.5, sod:75, demir:0.3, kals:80, vitC:0.5, vitD:0.2, vitB12:0.2, acik:10, por:75, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:393, ad:"Carte d'Or Vanilya", marka:"Algida",kal:185, pro:3, karb:22, yag:9.5, lif:0, sod:65, demir:0.1, kals:120, vitC:0.3, vitD:0.2, vitB12:0.2, acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1.5 },
  { id:394, ad:"Ben & Jerry's Cookie Dough", marka:"Ben & Jerry's",kal:280, pro:3, karb:33, yag:15, lif:0.5, sod:100, demir:0.5, kals:100, vitC:0.5, vitD:0.1, vitB12:0.1, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:395, ad:"Dondurma (Çikolatalı)", marka:"Panda",kal:190, pro:3, karb:22, yag:10, lif:0.5, sod:65, demir:0.2, kals:100, vitC:0.3, vitD:0.2, vitB12:0.2, acik:14, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:396, ad:"Profiterol (3'lü)", marka:"Pâtisserie",kal:320, pro:6, karb:38, yag:16, lif:0.5, sod:80, demir:0.5, kals:80, vitC:0.3, vitD:0.3, vitB12:0.3, acik:14, por:90, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:397, ad:"Tiramisu", marka:"Pâtisserie",kal:450, pro:6, karb:42, yag:28, lif:0.5, sod:120, demir:0.5, kals:100, vitC:0.2, vitD:0.4, vitB12:0.3, acik:12, por:150, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:398, ad:"Cheesecake Dilimi", marka:"Pâtisserie",kal:400, pro:7, karb:38, yag:25, lif:0.5, sod:220, demir:0.5, kals:120, vitC:2, vitD:0.5, vitB12:0.3, acik:12, por:150, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:399, ad:"Supangle", marka:"Pâtisserie",kal:280, pro:6, karb:38, yag:12, lif:1.5, sod:80, demir:1.0, kals:100, vitC:0.3, vitD:0.3, vitB12:0.3, acik:18, por:150, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1.5 },
  { id:400, ad:"Sütlü Pirinç", marka:"Sütaş",kal:130, pro:3, karb:22, yag:3.5, lif:0.2, sod:55, demir:0.1, kals:80, vitC:0, vitD:0.2, vitB12:0.3, acik:35, por:150, aclik:"1-2 saat", onay:true, kat:"Atıştırmalık", yildiz:2 },
  { id:401, ad:"Kivi (Altın)", marka:"Zespri",kal:63, pro:1.2, karb:15, yag:0.4, lif:1.4, sod:3, demir:0.2, kals:17, vitC:109, vitD:0, vitB12:0, acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:5 },
  { id:402, ad:"Yıldız Meyvesi (Starfruit)", marka:"Tropikal",kal:31, pro:1, karb:6.7, yag:0.3, lif:2.8, sod:2, demir:0.1, kals:3, vitC:34, vitD:0, vitB12:0, acik:52, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:403, ad:"Papaya", marka:"Tropik",kal:43, pro:0.5, karb:11, yag:0.3, lif:1.7, sod:8, demir:0.3, kals:20, vitC:62, vitD:0, vitB12:0, acik:50, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:404, ad:"Mango", marka:"Tropik",kal:60, pro:0.8, karb:15, yag:0.4, lif:1.6, sod:1, demir:0.2, kals:11, vitC:36, vitD:0, vitB12:0, acik:48, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:4.5 },
  { id:405, ad:"Ananas", marka:"Tropik",kal:50, pro:0.5, karb:13, yag:0.1, lif:1.4, sod:1, demir:0.3, kals:13, vitC:48, vitD:0, vitB12:0, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:4.5 },
  { id:406, ad:"Hindistan Cevizi Eti", marka:"Taze",kal:354, pro:3.3, karb:15, yag:33, lif:9, sod:20, demir:2.4, kals:14, vitC:3.3, vitD:0, vitB12:0, acik:35, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:3 },
  { id:407, ad:"Güneş Kurusu Domates", marka:"Hazır",kal:258, pro:14, karb:55, yag:3, lif:12, sod:2095, demir:9.1, kals:110, vitC:39, vitD:0, vitB12:0, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4 },
  { id:408, ad:"Kurutulmuş Kayısı", marka:"Doğadan",kal:241, pro:3.4, karb:63, yag:0.5, lif:7.3, sod:10, demir:2.7, kals:55, vitC:1, vitD:0, vitB12:0, acik:28, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:3.5 },
  { id:409, ad:"Kuru Üzüm", marka:"Doğadan",kal:299, pro:3.1, karb:79, yag:0.5, lif:3.7, sod:11, demir:1.9, kals:50, vitC:3.2, vitD:0, vitB12:0, acik:22, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:2.5 },
  { id:410, ad:"Kuru Incir", marka:"Doğadan",kal:249, pro:3.3, karb:64, yag:0.9, lif:9.8, sod:10, demir:2.0, kals:162, vitC:1.2, vitD:0, vitB12:0, acik:28, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:3.5 },
  { id:411, ad:"Kuru Dut", marka:"Doğadan",kal:344, pro:11, karb:73, yag:2.5, lif:8, sod:26, demir:2.6, kals:97, vitC:66, vitD:0, vitB12:0, acik:35, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:5 },
  { id:412, ad:"Kızılcık", marka:"Ege",kal:46, pro:0.4, karb:12, yag:0.1, lif:3.6, sod:1, demir:0.2, kals:8, vitC:13, vitD:0, vitB12:0, acik:52, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:413, ad:"Böğürtlen", marka:"Ege",kal:43, pro:1.4, karb:10, yag:0.5, lif:5.3, sod:1, demir:0.6, kals:29, vitC:21, vitD:0, vitB12:0, acik:55, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:414, ad:"Gojiberry (Kuru)", marka:"Örgün",kal:349, pro:14, karb:77, yag:0.4, lif:13, sod:298, demir:6.8, kals:190, vitC:48, vitD:0, vitB12:0, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:5 },
  { id:415, ad:"Kuru Erik", marka:"Doğadan",kal:240, pro:2.2, karb:64, yag:0.4, lif:7.1, sod:2, demir:0.9, kals:43, vitC:0.6, vitD:0, vitB12:0, acik:28, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:3 },
  { id:416, ad:"Şekersiz Reçel (Çilek)", marka:"Beypazarı",kal:50, pro:0.5, karb:12, yag:0.2, lif:3, sod:10, demir:0.5, kals:10, vitC:6, vitD:0, vitB12:0, acik:18, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:3 },
  { id:417, ad:"Marmelat (Portakal)", marka:"Hero",kal:250, pro:0.5, karb:62, yag:0.2, lif:1.5, sod:25, demir:0.3, kals:10, vitC:3, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:1 },
  { id:418, ad:"Nar Ekşisi", marka:"Anatolia",kal:310, pro:1, karb:75, yag:0.5, lif:0.5, sod:20, demir:1.0, kals:30, vitC:5, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:3 },
  { id:419, ad:"Üzüm Pekmezi", marka:"Kurtköy",kal:280, pro:1.5, karb:68, yag:0.2, lif:0.5, sod:30, demir:4.5, kals:62, vitC:2.5, vitD:0, vitB12:0, acik:15, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:3.5 },
  { id:420, ad:"Harnup Pekmezi", marka:"Herdem",kal:240, pro:4, karb:57, yag:1, lif:6, sod:80, demir:5.8, kals:350, vitC:1, vitD:0, vitB12:0, acik:20, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4.5 },
  { id:421, ad:"Taze Soğan", marka:"Çiftlik",kal:32, pro:1.8, karb:7.3, yag:0.2, lif:2.6, sod:16, demir:1.5, kals:72, vitC:19, vitD:0, vitB12:0, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:422, ad:"Sarımsak (Diş)", marka:"Çiftlik",kal:149, pro:6.4, karb:33, yag:0.5, lif:2.1, sod:17, demir:1.7, kals:181, vitC:31, vitD:0, vitB12:0, acik:30, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:423, ad:"Brokoli Salatası (Çiğ)", marka:"Çiftlik",kal:34, pro:2.8, karb:7, yag:0.4, lif:2.6, sod:33, demir:0.7, kals:47, vitC:89, vitD:0, vitB12:0, acik:72, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:424, ad:"Karnabahar (Haşlanmış)", marka:"Çiftlik",kal:25, pro:1.9, karb:5, yag:0.3, lif:2, sod:15, demir:0.4, kals:22, vitC:44, vitD:0, vitB12:0, acik:68, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:425, ad:"Turp (Kırmızı)", marka:"Çiftlik",kal:16, pro:0.7, karb:3.4, yag:0.1, lif:1.6, sod:39, demir:0.3, kals:25, vitC:15, vitD:0, vitB12:0, acik:38, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:426, ad:"Maydanoz", marka:"Çiftlik",kal:36, pro:3, karb:6.3, yag:0.8, lif:3.3, sod:56, demir:6.2, kals:138, vitC:133, vitD:0, vitB12:0, acik:45, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:427, ad:"Kişniş (Taze)", marka:"Çiftlik",kal:23, pro:2.1, karb:3.7, yag:0.5, lif:2.8, sod:46, demir:1.8, kals:67, vitC:27, vitD:0, vitB12:0, acik:42, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:428, ad:"Dereotu", marka:"Çiftlik",kal:43, pro:3.5, karb:7, yag:1.1, lif:2.1, sod:61, demir:6.6, kals:208, vitC:85, vitD:0, vitB12:0, acik:45, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:429, ad:"Nane (Taze)", marka:"Çiftlik",kal:70, pro:3.8, karb:15, yag:0.9, lif:6.8, sod:31, demir:5.1, kals:243, vitC:31, vitD:0, vitB12:0, acik:45, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:430, ad:"Fesleğen (Taze)", marka:"Çiftlik",kal:23, pro:3.2, karb:2.7, yag:0.6, lif:1.6, sod:4, demir:3.2, kals:177, vitC:18, vitD:0, vitB12:0, acik:42, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:431, ad:"Bamya (Taze)", marka:"Çiftlik",kal:33, pro:2, karb:7.5, yag:0.2, lif:3.2, sod:7, demir:0.6, kals:82, vitC:23, vitD:0, vitB12:0, acik:68, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:432, ad:"Hindiba Salatası", marka:"Çiftlik",kal:23, pro:1.7, karb:4.7, yag:0.3, lif:4, sod:42, demir:0.9, kals:100, vitC:10, vitD:0, vitB12:0, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:433, ad:"Mıcık (Taze Bakla)", marka:"Çiftlik",kal:88, pro:8, karb:15, yag:0.7, lif:5.4, sod:1, demir:1.5, kals:36, vitC:29, vitD:0, vitB12:0, acik:75, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:434, ad:"Taze Bezelye", marka:"Çiftlik",kal:81, pro:5.4, karb:14, yag:0.4, lif:5.1, sod:5, demir:1.5, kals:25, vitC:40, vitD:0, vitB12:0, acik:62, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:435, ad:"Barbunya Fasulyesi (Taze)", marka:"Çiftlik",kal:127, pro:8.7, karb:22, yag:0.5, lif:7.4, sod:2, demir:2.6, kals:50, vitC:1.2, vitD:0, vitB12:0, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:436, ad:"Taze Mısır", marka:"Çiftlik",kal:86, pro:3.2, karb:19, yag:1.2, lif:2.7, sod:15, demir:0.5, kals:2, vitC:6.8, vitD:0, vitB12:0, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:3 },
  { id:437, ad:"Kırmızı Turp", marka:"Çiftlik",kal:16, pro:0.7, karb:3.4, yag:0.1, lif:1.6, sod:39, demir:0.3, kals:25, vitC:15, vitD:0, vitB12:0, acik:38, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:438, ad:"Pancar (Haşlanmış)", marka:"Çiftlik",kal:44, pro:1.7, karb:10, yag:0.2, lif:2, sod:77, demir:0.8, kals:16, vitC:4.9, vitD:0, vitB12:0, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4 },
  { id:439, ad:"Semizotu", marka:"Çiftlik",kal:20, pro:2, karb:3.4, yag:0.4, lif:0.4, sod:45, demir:2.0, kals:65, vitC:21, vitD:0, vitB12:0, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:440, ad:"Lahana Turşusu", marka:"Ev Yapımı",kal:19, pro:0.9, karb:4.3, yag:0.1, lif:2.9, sod:661, demir:0.3, kals:30, vitC:14.7, vitD:0, vitB12:0, acik:48, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4 },
  { id:441, ad:"Kırmızı Fasulye (Pişmiş)", marka:"Çiftlik",kal:127, pro:8.7, karb:22, yag:0.5, lif:6.4, sod:2, demir:2.5, kals:37, vitC:0, vitD:0, vitB12:0, acik:70, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:442, ad:"Siyah Göz Bezelye (Pişmiş)", marka:"Çiftlik",kal:116, pro:8, karb:21, yag:0.5, lif:6, sod:4, demir:2.5, kals:24, vitC:0.4, vitD:0, vitB12:0, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:443, ad:"Börülce (Pişmiş)", marka:"Çiftlik",kal:116, pro:8, karb:21, yag:0.5, lif:6.5, sod:4, demir:2.5, kals:24, vitC:0.4, vitD:0, vitB12:0, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:444, ad:"Yeşil Fasulye (Pişmiş)", marka:"Çiftlik",kal:31, pro:1.8, karb:7, yag:0.2, lif:3.4, sod:6, demir:1.0, kals:37, vitC:12, vitD:0, vitB12:0, acik:58, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:445, ad:"Lupine (Acı Bakla)", marka:"Çiftlik",kal:120, pro:16, karb:10, yag:2.9, lif:4.6, sod:12, demir:3.2, kals:72, vitC:1, vitD:0, vitB12:0, acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:446, ad:"Maş Fasulyesi (Pişmiş)", marka:"Çiftlik",kal:105, pro:7, karb:19, yag:0.4, lif:7.6, sod:2, demir:1.4, kals:27, vitC:1, vitD:0, vitB12:0, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:447, ad:"İzmir Bakla", marka:"Çiftlik",kal:88, pro:8, karb:15, yag:0.7, lif:5.4, sod:1, demir:1.5, kals:36, vitC:29, vitD:0, vitB12:0, acik:75, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:448, ad:"Pinto Fasulye (Pişmiş)", marka:"Çiftlik",kal:143, pro:9, karb:27, yag:0.6, lif:9, sod:2, demir:1.8, kals:46, vitC:0, vitD:0, vitB12:0, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:449, ad:"Adzuki Fasulye (Pişmiş)", marka:"Çiftlik",kal:128, pro:7.5, karb:25, yag:0.1, lif:5.5, sod:8, demir:2.3, kals:28, vitC:0, vitD:0, vitB12:0, acik:70, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:450, ad:"Mercimek Çorbası Hazır", marka:"Knorr",kal:62, pro:3.5, karb:10, yag:1, lif:2, sod:540, demir:1.5, kals:20, vitC:0.5, vitD:0, vitB12:0, acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:2.5 },
  { id:451, ad:"Palamut (Taze)", marka:"Ege",kal:197, pro:19, karb:0, yag:13, lif:0, sod:57, demir:1.8, kals:15, vitC:0.5, vitD:5.5, vitB12:5.5, acik:80, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:452, ad:"Kalamar (Izgara)", marka:"Ege",kal:92, pro:16, karb:3.1, yag:1.4, lif:0, sod:220, demir:0.7, kals:32, vitC:0, vitD:0.3, vitB12:1.3, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:453, ad:"Ahtapot (Haşlanmış)", marka:"Ege",kal:164, pro:30, karb:4.4, yag:2.1, lif:0, sod:196, demir:5.3, kals:53, vitC:0, vitD:0.5, vitB12:20, acik:80, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:454, ad:"Çipura (Fırın)", marka:"Ege",kal:90, pro:18, karb:0, yag:1.9, lif:0, sod:60, demir:0.4, kals:11, vitC:0, vitD:5.2, vitB12:3.5, acik:78, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:455, ad:"Mercan Balığı", marka:"Ege",kal:109, pro:20, karb:0, yag:2.6, lif:0, sod:64, demir:0.3, kals:47, vitC:0, vitD:5.0, vitB12:3.0, acik:80, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:456, ad:"Kılıç Balığı", marka:"Ege",kal:172, pro:20, karb:0, yag:10, lif:0, sod:97, demir:0.9, kals:4, vitC:0, vitD:14, vitB12:1.7, acik:82, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:457, ad:"Kalkan Balığı", marka:"Ege",kal:95, pro:16, karb:0, yag:3, lif:0, sod:80, demir:0.3, kals:14, vitC:0, vitD:4.5, vitB12:1.2, acik:78, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:458, ad:"İstavrit", marka:"Ege",kal:140, pro:19, karb:0, yag:7, lif:0, sod:76, demir:1.4, kals:52, vitC:0, vitD:6.5, vitB12:4.8, acik:80, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:459, ad:"Yengeç Eti (Haşlanmış)", marka:"Deniz",kal:97, pro:19, karb:0, yag:1.5, lif:0, sod:912, demir:0.7, kals:89, vitC:3.5, vitD:0.4, vitB12:9, acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:460, ad:"Istakoz Eti", marka:"Deniz",kal:89, pro:19, karb:1.2, yag:0.9, lif:0, sod:423, demir:0.3, kals:60, vitC:0, vitD:0.4, vitB12:1.4, acik:78, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:461, ad:"Istiridye", marka:"Deniz",kal:68, pro:7, karb:3.9, yag:2.5, lif:0, sod:106, demir:5.5, kals:59, vitC:3, vitD:0.4, vitB12:16, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:462, ad:"Taraklar (Tarak Deniz)", marka:"Deniz",kal:111, pro:20, karb:5.4, yag:0.8, lif:0, sod:392, demir:0.4, kals:6, vitC:1, vitD:0.3, vitB12:1.4, acik:78, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:463, ad:"Alabalık (Fırın)", marka:"Çiftlik",kal:190, pro:27, karb:0, yag:9, lif:0, sod:47, demir:0.8, kals:86, vitC:4.5, vitD:16, vitB12:4.6, acik:85, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:464, ad:"Ringa Balığı (Füme)", marka:"İskandinav",kal:217, pro:24, karb:0, yag:13, lif:0, sod:918, demir:1.2, kals:84, vitC:0, vitD:18, vitB12:13, acik:78, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:465, ad:"Çinakop", marka:"Ege",kal:142, pro:20, karb:0, yag:7, lif:0, sod:59, demir:1.0, kals:20, vitC:0, vitD:4.8, vitB12:2.5, acik:80, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:466, ad:"Kısır", marka:"Ev Yapımı",kal:165, pro:4, karb:28, yag:5, lif:4, sod:290, demir:1.5, kals:30, vitC:12, vitD:0, vitB12:0, acik:62, por:100, aclik:"1-2 saat", onay:true, kat:"Hazır Yemek", yildiz:4.5 },
  { id:467, ad:"Tarator", marka:"Ev Yapımı",kal:85, pro:2.5, karb:7, yag:5.5, lif:0.5, sod:220, demir:0.6, kals:100, vitC:1.5, vitD:0, vitB12:0.1, acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Diğer", yildiz:3.5 },
  { id:468, ad:"Baba Ganuş", marka:"Ev Yapımı",kal:93, pro:2.6, karb:8.6, yag:6, lif:2, sod:95, demir:0.5, kals:28, vitC:1, vitD:0, vitB12:0, acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4 },
  { id:469, ad:"Arnavut Ciğeri", marka:"Ev Yapımı",kal:220, pro:22, karb:8, yag:11, lif:0.5, sod:380, demir:8.5, kals:15, vitC:5, vitD:0.5, vitB12:24, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:470, ad:"Tas Kebabı", marka:"Ev Yapımı",kal:185, pro:18, karb:8, yag:9, lif:2, sod:360, demir:2.2, kals:40, vitC:8, vitD:0, vitB12:1.0, acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:3.5 },
  { id:471, ad:"İzmir Köfte", marka:"Ev Yapımı",kal:220, pro:16, karb:10, yag:13, lif:1.8, sod:430, demir:2.5, kals:50, vitC:12, vitD:0, vitB12:0.9, acik:70, por:100, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:3 },
  { id:472, ad:"Terbiyeli Köfte Çorbası", marka:"Ev Yapımı",kal:95, pro:6, karb:8, yag:4.5, lif:0.5, sod:350, demir:1.2, kals:50, vitC:0.5, vitD:0.1, vitB12:0.5, acik:65, por:100, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:3.5 },
  { id:473, ad:"Kadayıf", marka:"Tatlıcı",kal:380, pro:5, karb:60, yag:14, lif:1, sod:150, demir:1.0, kals:50, vitC:0.2, vitD:0, vitB12:0.1, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:474, ad:"Sütlaç (Fırın)", marka:"Tatlıcı",kal:130, pro:4, karb:22, yag:3.5, lif:0.3, sod:65, demir:0.1, kals:110, vitC:0, vitD:0.3, vitB12:0.4, acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Atıştırmalık", yildiz:2 },
  { id:475, ad:"Kazandibi", marka:"Tatlıcı",kal:185, pro:5, karb:32, yag:4.5, lif:0, sod:110, demir:0.2, kals:120, vitC:0, vitD:0.2, vitB12:0.3, acik:28, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:2 },
  { id:476, ad:"Lokum (Gül Sulu)", marka:"Hacı Bekir",kal:322, pro:0, karb:80, yag:0.2, lif:0.5, sod:10, demir:0.2, kals:5, vitC:0, vitD:0, vitB12:0, acik:8, por:100, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:477, ad:"Helva (Susam)", marka:"Koska",kal:480, pro:13, karb:51, yag:27, lif:2, sod:70, demir:4.5, kals:190, vitC:0.5, vitD:0, vitB12:0, acik:18, por:100, aclik:"1 saat", onay:true, kat:"Atıştırmalık", yildiz:2 },
  { id:478, ad:"Türk Kahvesi (Sade)", marka:"Mehmet Efendi",kal:22, pro:0.5, karb:3.5, yag:1.2, lif:0, sod:2, demir:0, kals:6, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"30 dk", onay:true, kat:"İçecek", yildiz:3 },
  { id:479, ad:"Salep", marka:"Selamlique",kal:95, pro:2.5, karb:19, yag:1.5, lif:0.5, sod:30, demir:0.1, kals:80, vitC:0.2, vitD:0, vitB12:0.1, acik:35, por:200, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:2.5 },
  { id:480, ad:"Boza", marka:"Vefa",kal:65, pro:0.8, karb:12, yag:0.3, lif:0.5, sod:10, demir:0.5, kals:12, vitC:0, vitD:0, vitB12:0.1, acik:38, por:200, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:2.5 },
  { id:481, ad:"Siyah Zeytin", marka:"Marmarabirlik",kal:115, pro:0.8, karb:6.3, yag:10.9, lif:3.2, sod:735, demir:1.2, kals:88, vitC:0, vitD:0, vitB12:0, acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Diğer", yildiz:3 },
  { id:482, ad:"Yeşil Zeytin", marka:"Marmarabirlik",kal:145, pro:1, karb:3.8, yag:15, lif:3.3, sod:1560, demir:1.5, kals:88, vitC:0, vitD:0, vitB12:0, acik:35, por:100, aclik:"1-2 saat", onay:true, kat:"Diğer", yildiz:2.5 },
  { id:483, ad:"Kaymak", marka:"Sütaş",kal:338, pro:2.5, karb:2.5, yag:35, lif:0, sod:40, demir:0, kals:90, vitC:0, vitD:0.5, vitB12:0.2, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Süt Ürünü", yildiz:1 },
  { id:484, ad:"Yağsız Süzme Yoğurt", marka:"Pınar",kal:57, pro:10, karb:4, yag:0.2, lif:0, sod:57, demir:0, kals:130, vitC:0, vitD:0.1, vitB12:0.4, acik:58, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:5 },
  { id:485, ad:"Kefir (Tam Yağlı)", marka:"Sütas",kal:62, pro:3.4, karb:4.8, yag:3, lif:0, sod:40, demir:0, kals:120, vitC:1.5, vitD:0.1, vitB12:0.4, acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:4.5 },
  { id:486, ad:"Taze Süt", marka:"Tahsildaroğlu",kal:62, pro:3.2, karb:4.7, yag:3.5, lif:0, sod:44, demir:0, kals:120, vitC:0, vitD:0.1, vitB12:0.4, acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:4 },
  { id:487, ad:"UHT Süt (Tam Yağ)", marka:"Sütaş",kal:62, pro:3.2, karb:4.7, yag:3.5, lif:0, sod:44, demir:0, kals:120, vitC:0, vitD:0.9, vitB12:0.4, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:4 },
  { id:488, ad:"Çökelek", marka:"Ev Yapımı",kal:80, pro:14, karb:2, yag:1.5, lif:0, sod:50, demir:0.1, kals:100, vitC:0, vitD:0, vitB12:0.1, acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:4.5 },
  { id:489, ad:"Kuru Kayısı Reçeli", marka:"Ev Yapımı",kal:220, pro:0.5, karb:56, yag:0.2, lif:1.2, sod:10, demir:0.5, kals:12, vitC:1, vitD:0, vitB12:0, acik:14, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2 },
  { id:490, ad:"Tahin Pekmez Karışımı", marka:"Koska",kal:435, pro:7, karb:55, yag:22, lif:2, sod:60, demir:3.0, kals:160, vitC:1, vitD:0, vitB12:0, acik:20, por:100, aclik:"1-2 saat", onay:true, kat:"Diğer", yildiz:3 },
  { id:491, ad:"Yumurta Akı (Hazır)", marka:"Egglands",kal:52, pro:11, karb:0.7, yag:0.2, lif:0, sod:173, demir:0.1, kals:7, vitC:0, vitD:0, vitB12:0.1, acik:65, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:492, ad:"Jambon (Hindi)", marka:"Namet",kal:100, pro:16, karb:2, yag:3.5, lif:0, sod:780, demir:0.5, kals:10, vitC:0, vitD:0, vitB12:0.2, acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:2.5 },
  { id:493, ad:"Marine Somon", marka:"Dardanel",kal:180, pro:18, karb:2, yag:11, lif:0, sod:890, demir:0.4, kals:14, vitC:0, vitD:13, vitB12:2.8, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:494, ad:"Smoked Salmon (Füme Somon)", marka:"Dardanel",kal:210, pro:21, karb:0.5, yag:14, lif:0, sod:1200, demir:0.5, kals:15, vitC:0, vitD:14, vitB12:3.2, acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:495, ad:"Kuru Et (Pastırma)", marka:"Cumhuriyet",kal:332, pro:25, karb:4, yag:24, lif:0, sod:1890, demir:3.0, kals:30, vitC:0, vitD:0, vitB12:2.0, acik:52, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:1 },
  { id:496, ad:"Sucuk (Dana)", marka:"Cumhuriyet",kal:450, pro:20, karb:2.5, yag:40, lif:0, sod:1480, demir:2.8, kals:30, vitC:0, vitD:0.1, vitB12:1.5, acik:25, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:0.5 },
  { id:497, ad:"Kavurma (Kuzu)", marka:"Dardanel",kal:300, pro:25, karb:1, yag:22, lif:0, sod:600, demir:3.0, kals:18, vitC:0, vitD:0, vitB12:2.0, acik:72, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:2.5 },
  { id:498, ad:"Hindi Jambon (Düşük Yağ)", marka:"Banvit",kal:78, pro:14, karb:2.5, yag:1.5, lif:0, sod:660, demir:0.4, kals:8, vitC:0, vitD:0, vitB12:0.1, acik:58, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:499, ad:"Kuzu Kuşbaşı (Pişmiş)", marka:"Halal",kal:280, pro:24, karb:0, yag:20, lif:0, sod:68, demir:1.8, kals:16, vitC:0, vitD:0.1, vitB12:2.0, acik:80, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:500, ad:"Biftek (Wagyu)", marka:"Premium",kal:250, pro:26, karb:0, yag:16, lif:0, sod:55, demir:2.2, kals:10, vitC:0, vitD:0.1, vitB12:2.5, acik:88, por:100, aclik:"4-5 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:501, ad:"Pad Thai", marka:"Asya Mutfağı",kal:320, pro:14, karb:45, yag:10, lif:2, sod:880, demir:1.8, kals:40, vitC:1.5, vitD:0.1, vitB12:0.2, acik:45, por:250, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:2.5 },
  { id:502, ad:"Sushi (Somon Nigiri)", marka:"Japon",kal:45, pro:3.5, karb:5, yag:0.5, lif:0.1, sod:180, demir:0.2, kals:5, vitC:0, vitD:3.2, vitB12:0.8, acik:48, por:25, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:3.5 },
  { id:503, ad:"Ramen (Tavuklu)", marka:"Japon",kal:480, pro:22, karb:65, yag:14, lif:2.5, sod:1800, demir:2.5, kals:40, vitC:0.5, vitD:0.2, vitB12:0.4, acik:42, por:450, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:2 },
  { id:504, ad:"Biryani (Tavuklu)", marka:"Hint",kal:350, pro:22, karb:45, yag:9, lif:2, sod:680, demir:2.5, kals:40, vitC:2, vitD:0.1, vitB12:0.3, acik:55, por:250, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:3 },
  { id:505, ad:"Dal Curry", marka:"Hint",kal:155, pro:8, karb:25, yag:4, lif:6, sod:480, demir:3.5, kals:30, vitC:3, vitD:0, vitB12:0, acik:68, por:200, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:4.5 },
  { id:506, ad:"Shawarma (Tavuk)", marka:"Orta Doğu",kal:410, pro:25, karb:42, yag:15, lif:2.5, sod:950, demir:2.2, kals:40, vitC:1.5, vitD:0.1, vitB12:0.3, acik:42, por:200, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:2.5 },
  { id:507, ad:"Falafel Tabağı", marka:"Orta Doğu",kal:380, pro:12, karb:44, yag:18, lif:7, sod:680, demir:3.8, kals:80, vitC:3, vitD:0, vitB12:0, acik:55, por:250, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:3.5 },
  { id:508, ad:"Kuskus Salatası", marka:"Akdeniz",kal:210, pro:6, karb:38, yag:5, lif:4, sod:320, demir:1.5, kals:30, vitC:5, vitD:0, vitB12:0, acik:52, por:150, aclik:"1-2 saat", onay:true, kat:"Hazır Yemek", yildiz:3.5 },
  { id:509, ad:"Gazpacho", marka:"İspanyol",kal:65, pro:1.5, karb:12, yag:2, lif:1.8, sod:390, demir:0.8, kals:22, vitC:18, vitD:0, vitB12:0, acik:42, por:200, aclik:"30-60 dk", onay:true, kat:"Çorba", yildiz:4.5 },
  { id:510, ad:"Paella", marka:"İspanyol",kal:320, pro:20, karb:40, yag:8, lif:2, sod:780, demir:1.8, kals:40, vitC:1.5, vitD:0.2, vitB12:0.5, acik:52, por:250, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:3 },
  { id:511, ad:"Risotto (Mantarlı)", marka:"İtalyan",kal:280, pro:8, karb:45, yag:8, lif:2, sod:480, demir:1.5, kals:30, vitC:1.5, vitD:0.2, vitB12:0.1, acik:42, por:250, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:3 },
  { id:512, ad:"Gnocchi (Patatesli)", marka:"İtalyan",kal:170, pro:4, karb:33, yag:2.5, lif:2, sod:350, demir:0.8, kals:15, vitC:0, vitD:0, vitB12:0, acik:35, por:150, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2 },
  { id:513, ad:"Bruschetta", marka:"İtalyan",kal:180, pro:5, karb:28, yag:5, lif:2, sod:320, demir:1.2, kals:30, vitC:3, vitD:0, vitB12:0, acik:30, por:80, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:2.5 },
  { id:514, ad:"Caprese Salatası", marka:"İtalyan",kal:170, pro:10, karb:5, yag:13, lif:0.5, sod:340, demir:0.3, kals:300, vitC:5, vitD:0.2, vitB12:0.3, acik:45, por:150, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:4 },
  { id:515, ad:"Burrito (Fasulye)", marka:"Meksika",kal:380, pro:14, karb:55, yag:10, lif:10, sod:880, demir:3.5, kals:80, vitC:2, vitD:0, vitB12:0.2, acik:58, por:250, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:3 },
  { id:516, ad:"Nachos (Peynirli)", marka:"Meksika",kal:490, pro:12, karb:54, yag:26, lif:4, sod:820, demir:1.5, kals:210, vitC:0.5, vitD:0.2, vitB12:0.3, acik:18, por:150, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:517, ad:"Tom Yum Çorbası", marka:"Tayland",kal:65, pro:4, karb:9, yag:1.5, lif:1, sod:850, demir:0.5, kals:30, vitC:8, vitD:0, vitB12:0.2, acik:42, por:200, aclik:"30-60 dk", onay:true, kat:"Çorba", yildiz:3.5 },
  { id:518, ad:"Dim Sum (4'lü)", marka:"Çin",kal:220, pro:10, karb:28, yag:8, lif:1.5, sod:680, demir:1.8, kals:30, vitC:1, vitD:0.1, vitB12:0.3, acik:38, por:80, aclik:"1-2 saat", onay:true, kat:"Hazır Yemek", yildiz:2 },
  { id:519, ad:"Spring Roll (2'li)", marka:"Vietnam",kal:230, pro:6, karb:29, yag:11, lif:2, sod:520, demir:1.2, kals:30, vitC:1.5, vitD:0, vitB12:0.1, acik:32, por:80, aclik:"30-60 dk", onay:true, kat:"Hazır Yemek", yildiz:2 },
  { id:520, ad:"Greek Salad", marka:"Yunan",kal:160, pro:5, karb:9, yag:12, lif:2.5, sod:680, demir:0.5, kals:120, vitC:10, vitD:0, vitB12:0.1, acik:48, por:200, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4 },
  { id:521, ad:"Tarhana Çorbası", marka:"Ev Yapımı",kal:72, pro:3.5, karb:12, yag:1.5, lif:1.5, sod:380, demir:1.2, kals:30, vitC:1.5, vitD:0, vitB12:0.1, acik:62, por:200, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:4 },
  { id:522, ad:"İşkembe Çorbası", marka:"Lokanta",kal:75, pro:7, karb:5, yag:3, lif:0, sod:650, demir:0.8, kals:30, vitC:0, vitD:0, vitB12:0.6, acik:58, por:200, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:2 },
  { id:523, ad:"Beyaz Pelte", marka:"Ev Yapımı",kal:55, pro:1.5, karb:12, yag:0.5, lif:0, sod:15, demir:0.1, kals:40, vitC:0, vitD:0.1, vitB12:0.1, acik:28, por:100, aclik:"30-60 dk", onay:true, kat:"Diğer", yildiz:1.5 },
  { id:524, ad:"Ayvalık Tostu", marka:"Kafeterya",kal:520, pro:22, karb:55, yag:24, lif:3, sod:980, demir:3.0, kals:200, vitC:1.5, vitD:0.3, vitB12:0.5, acik:35, por:200, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2 },
  { id:525, ad:"Tombik Sandviç", marka:"Kafeterya",kal:480, pro:20, karb:52, yag:22, lif:2.5, sod:860, demir:2.5, kals:180, vitC:1, vitD:0.2, vitB12:0.5, acik:32, por:200, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2 },
  { id:526, ad:"Kumpir (Temel)", marka:"Kumpirci",kal:430, pro:12, karb:70, yag:14, lif:8.5, sod:580, demir:1.8, kals:30, vitC:12, vitD:0, vitB12:0.2, acik:55, por:300, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:3 },
  { id:527, ad:"Tavuk Sarma (Beşamel)", marka:"Ev Yapımı",kal:280, pro:28, karb:8, yag:16, lif:0.5, sod:480, demir:0.8, kals:80, vitC:0.5, vitD:0.3, vitB12:0.4, acik:68, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:528, ad:"Lazanya (Etli)", marka:"Ev Yapımı",kal:320, pro:18, karb:30, yag:14, lif:2, sod:680, demir:2.0, kals:120, vitC:1.5, vitD:0.2, vitB12:0.8, acik:52, por:200, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:2.5 },
  { id:529, ad:"Musakka", marka:"Ev Yapımı",kal:245, pro:14, karb:14, yag:16, lif:3.5, sod:430, demir:2.0, kals:60, vitC:5, vitD:0, vitB12:0.8, acik:62, por:200, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:3 },
  { id:530, ad:"Hünkar Beğendi", marka:"Ev Yapımı",kal:310, pro:20, karb:15, yag:19, lif:2.5, sod:580, demir:2.5, kals:80, vitC:4, vitD:0.1, vitB12:0.9, acik:68, por:200, aclik:"2-3 saat", onay:true, kat:"Hazır Yemek", yildiz:3 },
  { id:531, ad:"Klorella Tableti", marka:"Chlorella",kal:280, pro:60, karb:20, yag:9, lif:0, sod:124, demir:130, kals:210, vitC:3, vitD:0, vitB12:0, acik:55, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:532, ad:"Spirulina Tableti", marka:"Spirulina",kal:290, pro:58, karb:24, yag:8, lif:3.6, sod:1050, demir:28, kals:120, vitC:10, vitD:0, vitB12:0, acik:52, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:533, ad:"Kolajen Peptidi", marka:"Vital Proteins",kal:36, pro:9, karb:0, yag:0, lif:0, sod:40, demir:0, kals:18, vitC:0, vitD:0, vitB12:0, acik:60, por:10, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:534, ad:"Omega-3 (Kapsül)", marka:"Nordic",kal:9, pro:0, karb:0, yag:1, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:535, ad:"Probiyotik Takviye", marka:"Lactobacillus",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:536, ad:"D Vitamini Damla", marka:"Vigantol",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:25, vitB12:0, acik:50, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:537, ad:"Magnezyum Süplement", marka:"Solgar",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:538, ad:"B12 Supplement", marka:"Jarrow",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:539, ad:"Çinko Takviyesi", marka:"Swisse",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:540, ad:"Demir Takviyesi", marka:"Ferrolin",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:541, ad:"Mercimek Çorbası (Kırmızı)", marka:"Ev Yapımı",kal:95, pro:5.8, karb:15, yag:2, lif:3.8, sod:320, demir:1.8, kals:20, vitC:2, vitD:0, vitB12:0, acik:68, por:200, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:4.5 },
  { id:542, ad:"Mantar Çorbası", marka:"Ev Yapımı",kal:78, pro:3.5, karb:9, yag:3.5, lif:1.5, sod:380, demir:0.8, kals:20, vitC:1, vitD:0, vitB12:0, acik:52, por:200, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:4 },
  { id:543, ad:"Domates Çorbası", marka:"Ev Yapımı",kal:85, pro:2.5, karb:12, yag:3.5, lif:2, sod:280, demir:0.8, kals:25, vitC:14, vitD:0, vitB12:0, acik:48, por:200, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:4 },
  { id:544, ad:"Patates Çorbası", marka:"Ev Yapımı",kal:95, pro:2.5, karb:16, yag:3, lif:2, sod:350, demir:0.6, kals:25, vitC:8, vitD:0, vitB12:0, acik:42, por:200, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:3 },
  { id:545, ad:"Brokoli Çorbası", marka:"Ev Yapımı",kal:72, pro:3.5, karb:9, yag:3, lif:2.5, sod:280, demir:0.8, kals:60, vitC:35, vitD:0, vitB12:0, acik:52, por:200, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:5 },
  { id:546, ad:"Soğan Çorbası", marka:"Fransız",kal:85, pro:2.5, karb:12, yag:3, lif:1.5, sod:650, demir:0.5, kals:30, vitC:5, vitD:0, vitB12:0, acik:38, por:200, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:3.5 },
  { id:547, ad:"Gaziantep Ezme", marka:"Ev Yapımı",kal:45, pro:1.5, karb:9, yag:0.8, lif:2, sod:280, demir:0.5, kals:20, vitC:15, vitD:0, vitB12:0, acik:42, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:548, ad:"Piyaz", marka:"Ev Yapımı",kal:180, pro:10, karb:28, yag:4.5, lif:8, sod:290, demir:3.5, kals:60, vitC:5, vitD:0, vitB12:0, acik:70, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:549, ad:"Gavurdağı Salatası", marka:"Ev Yapımı",kal:82, pro:2, karb:12, yag:3.5, lif:2.5, sod:380, demir:0.8, kals:30, vitC:18, vitD:0, vitB12:0, acik:42, por:150, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:550, ad:"Atom (Baharatlı Yoğurt)", marka:"Ev Yapımı",kal:65, pro:4, karb:6, yag:3, lif:0.5, sod:220, demir:0.2, kals:80, vitC:2, vitD:0.1, vitB12:0.3, acik:50, por:100, aclik:"30-60 dk", onay:true, kat:"Süt Ürünü", yildiz:4 },
  { id:551, ad:"Shirataki Makarna", marka:"Miracle Noodle",kal:10, pro:0.5, karb:3, yag:0.1, lif:2.5, sod:15, demir:0.1, kals:10, vitC:0, vitD:0, vitB12:0, acik:25, por:100, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:3.5 },
  { id:552, ad:"Konjac Eriştesi", marka:"Konjac",kal:9, pro:0.1, karb:2, yag:0, lif:2, sod:10, demir:0.1, kals:8, vitC:0, vitD:0, vitB12:0, acik:22, por:100, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:3 },
  { id:553, ad:"Nori (Deniz Yosunu Yaprağı)", marka:"Kanpaku",kal:35, pro:5.8, karb:5, yag:0.3, lif:0.3, sod:48, demir:0.8, kals:70, vitC:1.5, vitD:0, vitB12:0, acik:40, por:10, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:554, ad:"Wakame (Deniz Yosunu)", marka:"Kanpaku",kal:45, pro:3, karb:9, yag:0.6, lif:0.5, sod:872, demir:2.2, kals:150, vitC:3, vitD:0, vitB12:0, acik:38, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:555, ad:"Kombu (Deniz Yosunu)", marka:"Muso",kal:43, pro:1.7, karb:10, yag:0.6, lif:1.3, sod:2310, demir:2.8, kals:168, vitC:3, vitD:0, vitB12:0, acik:38, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:556, ad:"Tempeh", marka:"Indonesian",kal:193, pro:19, karb:9, yag:11, lif:0, sod:9, demir:2.2, kals:111, vitC:0, vitD:0, vitB12:0, acik:68, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:557, ad:"Seitan (Buğday Eti)", marka:"Vegan",kal:370, pro:75, karb:14, yag:1.9, lif:0, sod:135, demir:5.2, kals:142, vitC:0, vitD:0, vitB12:0, acik:68, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:558, ad:"Jackfruit (Olgun)", marka:"Tropikal",kal:95, pro:1.7, karb:24, yag:0.6, lif:1.5, sod:2, demir:0.2, kals:24, vitC:13.7, vitD:0, vitB12:0, acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4 },
  { id:559, ad:"Moringa Tozu", marka:"Moringa",kal:64, pro:9.4, karb:8, yag:1.4, lif:2, sod:9, demir:4, kals:185, vitC:51, vitD:0, vitB12:0, acik:45, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:560, ad:"Ashwagandha Tozu", marka:"Himalaya",kal:245, pro:4, karb:50, yag:0.3, lif:32, sod:40, demir:3.3, kals:14, vitC:0, vitD:0, vitB12:0, acik:30, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:561, ad:"Elmalı Bebek Püresi", marka:"Hipp",kal:52, pro:0.4, karb:12, yag:0.3, lif:1.5, sod:5, demir:0.2, kals:5, vitC:2, vitD:0, vitB12:0, acik:40, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:4.5 },
  { id:562, ad:"Kaşarlı Makarna Bebek", marka:"Nestle",kal:105, pro:3.5, karb:18, yag:2, lif:1.5, sod:110, demir:0.8, kals:70, vitC:0, vitD:0.2, vitB12:0.2, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:3 },
  { id:563, ad:"Bebek Bisküvisi", marka:"Ülker",kal:420, pro:8, karb:78, yag:8, lif:2, sod:60, demir:6, kals:60, vitC:5, vitD:1.5, vitB12:0.5, acik:22, por:100, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:2.5 },
  { id:564, ad:"Çocuk Yoğurt (Çilekli)", marka:"Danino",kal:95, pro:3.2, karb:14, yag:2.8, lif:0, sod:65, demir:0, kals:100, vitC:2.5, vitD:0.1, vitB12:0.3, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Süt Ürünü", yildiz:2.5 },
  { id:565, ad:"Hazır Meyve Kısesi", marka:"Ella's Kitchen",kal:52, pro:0.5, karb:12, yag:0.3, lif:1.5, sod:5, demir:0.2, kals:8, vitC:5, vitD:0, vitB12:0, acik:42, por:90, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:4 },
  { id:566, ad:"Teff (Tahıl)", marka:"Habeş",kal:367, pro:13, karb:73, yag:2.4, lif:8, sod:12, demir:7.6, kals:180, vitC:0, vitD:0, vitB12:0, acik:55, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:5 },
  { id:567, ad:"Sorgum", marka:"Afrika",kal:329, pro:10.6, karb:72.1, yag:3.3, lif:6.7, sod:6, demir:4.4, kals:28, vitC:0, vitD:0, vitB12:0, acik:52, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4.5 },
  { id:568, ad:"Freekeh", marka:"Orta Doğu",kal:338, pro:12, karb:66, yag:2.7, lif:10.7, sod:20, demir:3.5, kals:50, vitC:0, vitD:0, vitB12:0, acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:5 },
  { id:569, ad:"Amaranth", marka:"Aztec",kal:371, pro:14, karb:65, yag:7, lif:6.7, sod:4, demir:7.6, kals:159, vitC:4.2, vitD:0, vitB12:0, acik:60, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:5 },
  { id:570, ad:"Emmer Buğdayı", marka:"Eski",kal:320, pro:15, karb:60, yag:2.5, lif:7, sod:5, demir:3.8, kals:60, vitC:0, vitD:0, vitB12:0, acik:55, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4.5 },
  { id:571, ad:"Einkorn", marka:"Eski",kal:346, pro:17, karb:62, yag:2.5, lif:8.5, sod:5, demir:4.5, kals:55, vitC:0, vitD:0, vitB12:0, acik:55, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:5 },
  { id:572, ad:"Spelta Buğdayı", marka:"Bio",kal:338, pro:15, karb:63, yag:2.5, lif:10.7, sod:8, demir:4.0, kals:30, vitC:0, vitD:0, vitB12:0, acik:55, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4.5 },
  { id:573, ad:"Millet (Darı)", marka:"Çiftlik",kal:378, pro:11, karb:73, yag:4.2, lif:8.5, sod:5, demir:3.0, kals:8, vitC:0, vitD:0, vitB12:0, acik:52, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4 },
  { id:574, ad:"Bulgur (İri)", marka:"Ege",kal:342, pro:12, karb:76, yag:1.3, lif:18.3, sod:17, demir:2.5, kals:35, vitC:0, vitD:0, vitB12:0, acik:60, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:5 },
  { id:575, ad:"Pirinç (Siyah)", marka:"Oryza",kal:356, pro:9, karb:74, yag:3.3, lif:2.5, sod:4, demir:3.5, kals:21, vitC:0, vitD:0, vitB12:0, acik:48, por:100, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4.5 },
  { id:576, ad:"Kombucha (Zencefilli)", marka:"GT's",kal:35, pro:0, karb:9, yag:0, lif:0, sod:10, demir:0.1, kals:5, vitC:1, vitD:0, vitB12:0, acik:20, por:240, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4.5 },
  { id:577, ad:"Kefir (Az Yağlı)", marka:"Activia",kal:51, pro:4.5, karb:5.5, yag:1.5, lif:0, sod:58, demir:0, kals:120, vitC:1.5, vitD:0.1, vitB12:0.5, acik:48, por:200, aclik:"1-2 saat", onay:true, kat:"İçecek", yildiz:4.5 },
  { id:578, ad:"Kımız", marka:"Moğol",kal:44, pro:1.6, karb:2.4, yag:2.5, lif:0, sod:45, demir:0.1, kals:60, vitC:0.5, vitD:0.1, vitB12:0.5, acik:30, por:200, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:3 },
  { id:579, ad:"Şalgam Suyu", marka:"Adana",kal:25, pro:1.2, karb:4.5, yag:0.2, lif:0.8, sod:850, demir:0.5, kals:30, vitC:5, vitD:0, vitB12:0, acik:35, por:200, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:3.5 },
  { id:580, ad:"Taze Sıkılmış Greyfurt Suyu", marka:"Taze",kal:39, pro:0.5, karb:9.5, yag:0.1, lif:0.2, sod:0, demir:0.1, kals:11, vitC:38, vitD:0, vitB12:0, acik:25, por:200, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4 },
  { id:581, ad:"Acai Suyu", marka:"Sambazon",kal:60, pro:0.5, karb:14, yag:0, lif:0.5, sod:20, demir:0.5, kals:10, vitC:4, vitD:0, vitB12:0, acik:20, por:240, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4 },
  { id:582, ad:"Noni Suyu", marka:"Morinda",kal:47, pro:0.4, karb:11, yag:0.1, lif:0.5, sod:18, demir:0.2, kals:18, vitC:8, vitD:0, vitB12:0, acik:18, por:240, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:3.5 },
  { id:583, ad:"Wheatgrass Suyu", marka:"Green",kal:28, pro:2.2, karb:5, yag:0.3, lif:2, sod:8, demir:1.0, kals:24, vitC:2.6, vitD:0, vitB12:0, acik:35, por:30, aclik:"—", onay:true, kat:"İçecek", yildiz:5 },
  { id:584, ad:"Karaağaç Özü Çayı", marka:"Doğadan",kal:2, pro:0, karb:0.5, yag:0, lif:0, sod:1, demir:0.1, kals:5, vitC:0, vitD:0, vitB12:0, acik:5, por:200, aclik:"—", onay:true, kat:"İçecek", yildiz:4 },
  { id:585, ad:"Rooibos Çayı", marka:"Organic",kal:2, pro:0, karb:0.3, yag:0, lif:0, sod:1, demir:0.1, kals:10, vitC:0, vitD:0, vitB12:0, acik:5, por:200, aclik:"—", onay:true, kat:"İçecek", yildiz:4.5 },
  { id:586, ad:"Yerba Mate", marka:"Guayaki",kal:5, pro:0.2, karb:0.5, yag:0, lif:0, sod:8, demir:0.1, kals:5, vitC:0, vitD:0, vitB12:0, acik:10, por:240, aclik:"—", onay:true, kat:"İçecek", yildiz:3.5 },
  { id:587, ad:"Matcha Latte", marka:"Ippodo",kal:95, pro:5, karb:11, yag:3, lif:0.5, sod:55, demir:0.5, kals:150, vitC:0, vitD:0.5, vitB12:0, acik:38, por:240, aclik:"1-2 saat", onay:true, kat:"İçecek", yildiz:4.5 },
  { id:588, ad:"Chai Latte (Sütlü)", marka:"Tazo",kal:160, pro:6, karb:28, yag:3, lif:0.5, sod:130, demir:0.5, kals:160, vitC:0, vitD:0.4, vitB12:0.5, acik:35, por:240, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:3 },
  { id:589, ad:"Golden Milk (Zerdeçallı Süt)", marka:"Ev Yapımı",kal:105, pro:5, karb:12, yag:4, lif:0.5, sod:60, demir:0.5, kals:160, vitC:0.5, vitD:0.8, vitB12:0.4, acik:42, por:240, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4.5 },
  { id:590, ad:"Elma Sirkesi (Seyreltik)", marka:"Bragg",kal:3, pro:0, karb:0.7, yag:0, lif:0, sod:5, demir:0.1, kals:2, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:591, ad:"Miso (Beyaz)", marka:"Hikari",kal:206, pro:12, karb:28, yag:6, lif:5.4, sod:3600, demir:2.5, kals:58, vitC:0, vitD:0, vitB12:0, acik:25, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:3.5 },
  { id:592, ad:"Miso (Kırmızı)", marka:"Hikari",kal:217, pro:13, karb:25, yag:6, lif:5.4, sod:3728, demir:3.0, kals:52, vitC:0, vitD:0, vitB12:0, acik:22, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:3.5 },
  { id:593, ad:"Oyster Sauce", marka:"Lee Kum Kee",kal:51, pro:1, karb:12, yag:0.2, lif:0, sod:3200, demir:0.5, kals:32, vitC:0.5, vitD:0, vitB12:0, acik:12, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:1.5 },
  { id:594, ad:"Fish Sauce", marka:"Tiparos",kal:35, pro:5.5, karb:1, yag:0, lif:0, sod:6000, demir:0.8, kals:25, vitC:0, vitD:0, vitB12:0, acik:12, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:1.5 },
  { id:595, ad:"Worchestershire Sos", marka:"Lea & Perrins",kal:78, pro:1, karb:19, yag:0.1, lif:0.5, sod:980, demir:1.0, kals:35, vitC:2, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2 },
  { id:596, ad:"Hoisin Sos", marka:"Lee Kum Kee",kal:220, pro:4, karb:45, yag:4, lif:2.5, sod:2440, demir:0.8, kals:18, vitC:0, vitD:0, vitB12:0, acik:10, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:1 },
  { id:597, ad:"Teriyaki Sos", marka:"Kikkoman",kal:89, pro:4.5, karb:16, yag:0.8, lif:0, sod:2300, demir:0.5, kals:10, vitC:0, vitD:0, vitB12:0, acik:12, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:1.5 },
  { id:598, ad:"Guacamole", marka:"Kraft",kal:152, pro:1.8, karb:9, yag:14, lif:6.5, sod:230, demir:0.5, kals:12, vitC:8.5, vitD:0, vitB12:0, acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Diğer", yildiz:4.5 },
  { id:599, ad:"Salsa Sos", marka:"Old El Paso",kal:32, pro:1.2, karb:6.5, yag:0.2, lif:1.5, sod:430, demir:0.5, kals:20, vitC:8, vitD:0, vitB12:0, acik:25, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:600, ad:"Chimichurri", marka:"Ev Yapımı",kal:280, pro:1, karb:4, yag:29, lif:0.5, sod:350, demir:1.5, kals:25, vitC:3, vitD:0, vitB12:0, acik:20, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:3.5 },
  { id:601, ad:"Çikolatalı Kurabiye", marka:"Ev Yapımı",kal:480, pro:6, karb:62, yag:24, lif:2, sod:280, demir:2.5, kals:30, vitC:0.5, vitD:0.2, vitB12:0.2, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:602, ad:"Vanilyalı Kurabiye", marka:"Ev Yapımı",kal:450, pro:5.5, karb:62, yag:21, lif:1, sod:260, demir:2.0, kals:30, vitC:0, vitD:0.2, vitB12:0.1, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:603, ad:"Kek (Limonlu)", marka:"Ev Yapımı",kal:360, pro:5, karb:55, yag:14, lif:1, sod:290, demir:1.5, kals:50, vitC:2, vitD:0.2, vitB12:0.2, acik:14, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:604, ad:"Muffin (Yabanmersini)", marka:"Ev Yapımı",kal:350, pro:5, karb:52, yag:14, lif:1.5, sod:260, demir:1.5, kals:50, vitC:3, vitD:0.2, vitB12:0.1, acik:14, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:605, ad:"Browni", marka:"Ev Yapımı",kal:400, pro:5, karb:56, yag:20, lif:2, sod:180, demir:2.5, kals:30, vitC:0.5, vitD:0.2, vitB12:0.2, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:606, ad:"Tart (Limonlu)", marka:"Pâtisserie",kal:340, pro:5, karb:48, yag:14, lif:1, sod:250, demir:1.0, kals:50, vitC:5, vitD:0.2, vitB12:0.1, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:607, ad:"Éclair", marka:"Pâtisserie",kal:260, pro:5, karb:35, yag:12, lif:0.5, sod:150, demir:0.8, kals:50, vitC:0.5, vitD:0.2, vitB12:0.2, acik:10, por:80, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:608, ad:"Macaron", marka:"Ladurée",kal:75, pro:1.5, karb:12, yag:3, lif:0.3, sod:20, demir:0.2, kals:20, vitC:0.2, vitD:0, vitB12:0, acik:8, por:15, aclik:"30 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:609, ad:"Kruvasan (Sade)", marka:"Pâtisserie",kal:406, pro:8, karb:46, yag:21, lif:1.5, sod:375, demir:1.8, kals:25, vitC:0, vitD:0.2, vitB12:0.2, acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:1 },
  { id:610, ad:"Pain au Chocolat", marka:"Pâtisserie",kal:430, pro:8, karb:48, yag:23, lif:2, sod:350, demir:2.0, kals:30, vitC:0, vitD:0.2, vitB12:0.2, acik:14, por:100, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:1 },
  { id:611, ad:"Simit Açması", marka:"Simit Sarayı",kal:385, pro:9, karb:55, yag:15, lif:1.5, sod:480, demir:1.5, kals:30, vitC:0, vitD:0.1, vitB12:0.1, acik:20, por:110, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:1 },
  { id:612, ad:"Nohut Unu Ekmeği", marka:"Glütensiz",kal:260, pro:12, karb:40, yag:5, lif:5.5, sod:380, demir:3.5, kals:45, vitC:0, vitD:0, vitB12:0, acik:48, por:80, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:4 },
  { id:613, ad:"Glutensiz Pizza Hamuru", marka:"Schar",kal:185, pro:3, karb:38, yag:2, lif:2, sod:300, demir:1.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:28, por:100, aclik:"—", onay:true, kat:"Tahıl", yildiz:2 },
  { id:614, ad:"Vegan Burger (Bitki Bazlı)", marka:"Beyond Meat",kal:250, pro:20, karb:17, yag:14, lif:3, sod:390, demir:4.0, kals:30, vitC:2.5, vitD:0, vitB12:4.0, acik:55, por:113, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:615, ad:"Vegan Sosis", marka:"Vivera",kal:235, pro:16, karb:10, yag:14, lif:3, sod:620, demir:2.5, kals:25, vitC:1, vitD:0, vitB12:0, acik:48, por:90, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:616, ad:"Vegan Peynir", marka:"Violife",kal:90, pro:0.5, karb:2, yag:9, lif:0, sod:380, demir:0.2, kals:30, vitC:0, vitD:0.5, vitB12:0, acik:20, por:30, aclik:"30-60 dk", onay:true, kat:"Süt Ürünü", yildiz:2 },
  { id:617, ad:"Espresso (Tek)", marka:"Nespresso",kal:5, pro:0.3, karb:0.7, yag:0.2, lif:0, sod:2, demir:0.1, kals:5, vitC:0, vitD:0, vitB12:0, acik:5, por:30, aclik:"—", onay:true, kat:"İçecek", yildiz:3.5 },
  { id:618, ad:"Americano", marka:"Nespresso",kal:10, pro:0.6, karb:1.5, yag:0.3, lif:0, sod:4, demir:0.2, kals:10, vitC:0, vitD:0, vitB12:0, acik:8, por:240, aclik:"—", onay:true, kat:"İçecek", yildiz:3.5 },
  { id:619, ad:"Flat White", marka:"Starbucks",kal:180, pro:11, karb:16, yag:7, lif:0, sod:110, demir:0, kals:320, vitC:0, vitD:0.5, vitB12:0.8, acik:38, por:220, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:3 },
  { id:620, ad:"Cappuccino", marka:"İlly",kal:95, pro:5, karb:9, yag:4.5, lif:0, sod:70, demir:0, kals:150, vitC:0, vitD:0.3, vitB12:0.5, acik:35, por:180, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:3 },
  { id:621, ad:"Latte (Sütlü)", marka:"Costa",kal:130, pro:7, karb:13, yag:5, lif:0, sod:110, demir:0, kals:240, vitC:0, vitD:0.4, vitB12:0.6, acik:38, por:280, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:3 },
  { id:622, ad:"Macchiato (Büyük)", marka:"Starbucks",kal:220, pro:9, karb:33, yag:7, lif:0, sod:200, demir:0, kals:300, vitC:0.3, vitD:0.4, vitB12:0.6, acik:30, por:355, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:2 },
  { id:623, ad:"Türk Kahvesi (Şekerli)", marka:"Mehmet Efendi",kal:40, pro:0.5, karb:9, yag:0.3, lif:0, sod:5, demir:0.1, kals:6, vitC:0, vitD:0, vitB12:0, acik:8, por:60, aclik:"—", onay:true, kat:"İçecek", yildiz:2 },
  { id:624, ad:"Filtre Kahve (Sade)", marka:"Tchibo",kal:5, pro:0.3, karb:0.7, yag:0.1, lif:0, sod:2, demir:0.1, kals:5, vitC:0, vitD:0, vitB12:0, acik:5, por:240, aclik:"—", onay:true, kat:"İçecek", yildiz:4 },
  { id:625, ad:"Cold Brew Kahve", marka:"Blue Bottle",kal:20, pro:0.8, karb:3, yag:0.1, lif:0, sod:10, demir:0.2, kals:10, vitC:0, vitD:0, vitB12:0, acik:10, por:240, aclik:"—", onay:true, kat:"İçecek", yildiz:3.5 },
  { id:626, ad:"Iced Coffee (Şekerli)", marka:"McCafé",kal:120, pro:3, karb:22, yag:3, lif:0, sod:90, demir:0.2, kals:90, vitC:0.5, vitD:0.2, vitB12:0.3, acik:15, por:355, aclik:"—", onay:true, kat:"İçecek", yildiz:1.5 },
  { id:627, ad:"İzlanda Yoğurdu (Skyr)", marka:"Siggi's",kal:110, pro:19, karb:8, yag:0.5, lif:0, sod:65, demir:0, kals:150, vitC:0, vitD:0.1, vitB12:0.5, acik:68, por:170, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:5 },
  { id:628, ad:"Yüksek Proteinli Yoğurt", marka:"Arla Protein",kal:95, pro:15, karb:8, yag:0.4, lif:0, sod:65, demir:0, kals:180, vitC:0, vitD:0.1, vitB12:0.5, acik:68, por:200, aclik:"2-3 saat", onay:true, kat:"Süt Ürünü", yildiz:5 },
  { id:629, ad:"Kefir Kremsi", marka:"Lifeway",kal:110, pro:10, karb:12, yag:2.5, lif:0, sod:125, demir:0, kals:300, vitC:3, vitD:0.2, vitB12:0.5, acik:58, por:240, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:4.5 },
  { id:630, ad:"Ricotta Peyniri", marka:"Galbani",kal:174, pro:11, karb:3, yag:13, lif:0, sod:84, demir:0.2, kals:207, vitC:0, vitD:0.3, vitB12:0.3, acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:3.5 },
  { id:631, ad:"Mascarpone", marka:"Galbani",kal:429, pro:4, karb:4, yag:44, lif:0, sod:30, demir:0.1, kals:100, vitC:0, vitD:0.3, vitB12:0.1, acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Süt Ürünü", yildiz:1 },
  { id:632, ad:"Halloumi Peyniri", marka:"Cyprus",kal:321, pro:22, karb:1, yag:25, lif:0, sod:1290, demir:0.2, kals:700, vitC:0, vitD:0.4, vitB12:0.8, acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:2.5 },
  { id:633, ad:"Feta Peyniri", marka:"Dodoni",kal:264, pro:14, karb:4, yag:21, lif:0, sod:1116, demir:0.6, kals:493, vitC:0, vitD:0.3, vitB12:0.5, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:2.5 },
  { id:634, ad:"Brie Peyniri", marka:"President",kal:334, pro:20, karb:0.5, yag:28, lif:0, sod:629, demir:0.3, kals:184, vitC:0, vitD:0.5, vitB12:1.6, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:2.5 },
  { id:635, ad:"Camembert", marka:"Normandy",kal:300, pro:20, karb:0.5, yag:24, lif:0, sod:760, demir:0.3, kals:388, vitC:0, vitD:0.3, vitB12:1.8, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:2.5 },
  { id:636, ad:"Blue Cheese (Rokfor)", marka:"Roquefort",kal:353, pro:22, karb:2, yag:29, lif:0, sod:1809, demir:0.3, kals:662, vitC:0, vitD:0.5, vitB12:1.2, acik:40, por:100, aclik:"1-2 saat", onay:true, kat:"Süt Ürünü", yildiz:2 },
  { id:637, ad:"Casein Protein", marka:"Dymatize",kal:120, pro:25, karb:4, yag:1, lif:0.5, sod:200, demir:0.5, kals:500, vitC:0, vitD:0.5, vitB12:0.5, acik:60, por:33, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:638, ad:"Plant Protein", marka:"Vega",kal:130, pro:20, karb:7, yag:3.5, lif:4, sod:320, demir:4.5, kals:80, vitC:1, vitD:0, vitB12:0, acik:58, por:38, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:639, ad:"Creatine Monohydrate", marka:"Optimum",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:60, por:5, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:640, ad:"Glutamin Tozu", marka:"Optimum",kal:25, pro:6, karb:0, yag:0, lif:0, sod:5, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:60, por:5, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:641, ad:"Pre-Workout (Cafeinli)", marka:"C4",kal:10, pro:0, karb:2, yag:0, lif:0, sod:200, demir:0, kals:15, vitC:0, vitD:0, vitB12:0, acik:10, por:5, aclik:"—", onay:true, kat:"Diğer", yildiz:2 },
  { id:642, ad:"Mass Gainer", marka:"Dymatize",kal:650, pro:60, karb:86, yag:8, lif:4, sod:400, demir:4, kals:400, vitC:0, vitD:2, vitB12:1, acik:45, por:165, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:643, ad:"Elektrolit Tozu", marka:"Nuun",kal:30, pro:0, karb:8, yag:0, lif:0, sod:380, demir:0, kals:15, vitC:0, vitD:0, vitB12:0, acik:20, por:5, aclik:"—", onay:true, kat:"İçecek", yildiz:3.5 },
  { id:644, ad:"Karnitın Takviyesi", marka:"Now Foods",kal:0, pro:0, karb:0, yag:0, lif:0, sod:10, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:5, aclik:"—", onay:true, kat:"Diğer", yildiz:3.5 },
  { id:645, ad:"CLA Yağ Asidi", marka:"Tonalin",kal:0, pro:0, karb:0, yag:1, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:30, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:3 },
  { id:646, ad:"HMB Takviyesi", marka:"Optimum",kal:0, pro:0, karb:0, yag:0, lif:0, sod:5, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:3, aclik:"—", onay:true, kat:"Diğer", yildiz:3.5 },
  { id:647, ad:"Smoothie Bowl (Açai)", marka:"Acai",kal:220, pro:5, karb:42, yag:4, lif:5, sod:80, demir:1.5, kals:50, vitC:15, vitD:0, vitB12:0, acik:38, por:250, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:4.5 },
  { id:648, ad:"Overnight Oats", marka:"Ev Yapımı",kal:320, pro:12, karb:52, yag:7, lif:6, sod:65, demir:2.5, kals:200, vitC:3, vitD:0.5, vitB12:0.5, acik:58, por:250, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4.5 },
  { id:649, ad:"Chia Puding", marka:"Ev Yapımı",kal:220, pro:7, karb:22, yag:12, lif:12, sod:95, demir:3.5, kals:250, vitC:3, vitD:0.5, vitB12:0, acik:55, por:200, aclik:"2-3 saat", onay:true, kat:"Diğer", yildiz:5 },
  { id:650, ad:"Yulaf Keki (Muz-Yulaf)", marka:"Ev Yapımı",kal:180, pro:5, karb:32, yag:4.5, lif:4.5, sod:50, demir:1.5, kals:25, vitC:2, vitD:0.3, vitB12:0.2, acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:4 },
  { id:651, ad:"Avokado Toast", marka:"Ev Yapımı",kal:280, pro:7, karb:28, yag:16, lif:7, sod:350, demir:1.8, kals:30, vitC:8, vitD:0, vitB12:0.1, acik:55, por:130, aclik:"2-3 saat", onay:true, kat:"Tahıl", yildiz:4.5 },
  { id:652, ad:"Eggs Benedict", marka:"Kafeterya",kal:380, pro:20, karb:28, yag:22, lif:1.5, sod:820, demir:3.0, kals:80, vitC:0.5, vitD:1.5, vitB12:0.8, acik:52, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:653, ad:"French Toast", marka:"Ev Yapımı",kal:310, pro:11, karb:42, yag:12, lif:2, sod:450, demir:2.5, kals:120, vitC:0.5, vitD:0.8, vitB12:0.5, acik:38, por:150, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2.5 },
  { id:654, ad:"Pancake (Yulaf Unu)", marka:"Ev Yapımı",kal:230, pro:9, karb:35, yag:6.5, lif:4, sod:280, demir:2.0, kals:80, vitC:0.5, vitD:0.5, vitB12:0.5, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:3.5 },
  { id:655, ad:"Krep (İnce)", marka:"Ev Yapımı",kal:220, pro:7, karb:30, yag:9, lif:1, sod:280, demir:1.5, kals:80, vitC:0.5, vitD:0.5, vitB12:0.3, acik:32, por:100, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:2 },
  { id:656, ad:"Smoothie (Yeşil)", marka:"Ev Yapımı",kal:120, pro:3, karb:25, yag:1.5, lif:3.5, sod:40, demir:1.5, kals:100, vitC:35, vitD:0, vitB12:0, acik:42, por:300, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:5 },
  { id:657, ad:"Smoothie (Muz-Berry)", marka:"Ev Yapımı",kal:140, pro:3, karb:30, yag:1, lif:3, sod:30, demir:0.8, kals:50, vitC:15, vitD:0, vitB12:0, acik:40, por:300, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:4 },
  { id:658, ad:"Protein Pancake", marka:"Ev Yapımı",kal:280, pro:22, karb:32, yag:7, lif:3, sod:310, demir:2.5, kals:100, vitC:0.5, vitD:0.5, vitB12:0.5, acik:55, por:150, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:4.5 },
  { id:659, ad:"Avokado Yağı", marka:"Chosen Foods",kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:3.5 },
  { id:660, ad:"Keten Tohumu Yağı", marka:"Barlean's",kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:661, ad:"Balık Yağı (Omega-3)", marka:"Nordic Naturals",kal:40, pro:0, karb:0, yag:4.5, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:4, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:662, ad:"Ay Çiçeği Yağı", marka:"Komili",kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2 },
  { id:663, ad:"Mısır Yağı", marka:"Yıldız",kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:1.5 },
  { id:664, ad:"Kanola Yağı", marka:"Vitalis",kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2.5 },
  { id:665, ad:"Ceviz Yağı", marka:"La Tourangelle",kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:666, ad:"Malt İçeceği (Alkolsüz)", marka:"Efes",kal:28, pro:0.7, karb:5.5, yag:0.1, lif:0, sod:16, demir:0.1, kals:8, vitC:0, vitD:0, vitB12:0, acik:8, por:330, aclik:"—", onay:true, kat:"İçecek", yildiz:1.5 },
  { id:667, ad:"Şalgam (Fermente)", marka:"Adana",kal:30, pro:1.2, karb:5.5, yag:0.2, lif:0.8, sod:920, demir:0.5, kals:30, vitC:5, vitD:0, vitB12:0, acik:30, por:200, aclik:"—", onay:true, kat:"İçecek", yildiz:3 },
  { id:668, ad:"Kefir (Yaban Mersini)", marka:"Activia",kal:75, pro:4, karb:8, yag:1.5, lif:0.5, sod:55, demir:0, kals:120, vitC:3, vitD:0.1, vitB12:0.4, acik:45, por:200, aclik:"1-2 saat", onay:true, kat:"İçecek", yildiz:4 },
  { id:669, ad:"Boza (Az Şekerli)", marka:"Vefa",kal:45, pro:0.8, karb:8.5, yag:0.3, lif:0.5, sod:10, demir:0.3, kals:12, vitC:0, vitD:0, vitB12:0, acik:35, por:200, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:2.5 },
  { id:670, ad:"Limonata (Ev Yapımı)", marka:"Ev Yapımı",kal:40, pro:0.2, karb:10, yag:0.1, lif:0.1, sod:5, demir:0.1, kals:5, vitC:8, vitD:0, vitB12:0, acik:12, por:240, aclik:"—", onay:true, kat:"İçecek", yildiz:3 },
  { id:671, ad:"Bone Broth (Kemik Suyu)", marka:"Kettle & Fire",kal:45, pro:9, karb:0, yag:1, lif:0, sod:410, demir:0.3, kals:10, vitC:0, vitD:0, vitB12:0.5, acik:55, por:240, aclik:"2-3 saat", onay:true, kat:"Çorba", yildiz:4.5 },
  { id:672, ad:"Kollajen Çorbası", marka:"Ev Yapımı",kal:50, pro:8, karb:0.5, yag:1.5, lif:0, sod:380, demir:0.3, kals:15, vitC:0.5, vitD:0, vitB12:0.4, acik:52, por:200, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:4.5 },
  { id:673, ad:"Tavuk Suyu", marka:"Ev Yapımı",kal:38, pro:5, karb:0.5, yag:1.5, lif:0, sod:380, demir:0.4, kals:10, vitC:0.5, vitD:0.1, vitB12:0.3, acik:50, por:200, aclik:"1-2 saat", onay:true, kat:"Çorba", yildiz:4 },
  { id:674, ad:"Miso Çorbası", marka:"Japon",kal:40, pro:3, karb:5, yag:1.5, lif:0.5, sod:820, demir:0.5, kals:30, vitC:0, vitD:0, vitB12:0.2, acik:42, por:200, aclik:"30-60 dk", onay:true, kat:"Çorba", yildiz:3.5 },
  { id:675, ad:"Çöp Şiş (Kuzu)", marka:"Mangal",kal:320, pro:24, karb:2, yag:24, lif:0, sod:420, demir:2.8, kals:18, vitC:0, vitD:0.1, vitB12:1.5, acik:75, por:120, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:676, ad:"Bıldırcın Eti (Fırın)", marka:"Çiftlik",kal:227, pro:25, karb:0, yag:14, lif:0, sod:58, demir:4.4, kals:15, vitC:0, vitD:0.4, vitB12:0.9, acik:82, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:677, ad:"Ördek Göğsü", marka:"Çiftlik",kal:357, pro:19, karb:0, yag:31, lif:0, sod:59, demir:2.7, kals:11, vitC:0, vitD:0.2, vitB12:0.4, acik:75, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:2.5 },
  { id:678, ad:"Bıldırcın Yumurtası", marka:"Çiftlik",kal:158, pro:13, karb:0.4, yag:11, lif:0, sod:141, demir:3.6, kals:64, vitC:0, vitD:2.5, vitB12:1.6, acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:679, ad:"Hindi Eti (Büyük, Izgara)", marka:"Çiftlik",kal:218, pro:32, karb:0, yag:9, lif:0, sod:68, demir:2.4, kals:18, vitC:0, vitD:0.2, vitB12:0.4, acik:85, por:100, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:680, ad:"Keçi Eti (Haşlanmış)", marka:"Halal",kal:143, pro:27, karb:0, yag:3, lif:0, sod:86, demir:3.7, kals:15, vitC:0, vitD:0.1, vitB12:1.5, acik:82, por:100, aclik:"4-5 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:681, ad:"Dondurma (Matcha)", marka:"Matchado",kal:180, pro:3, karb:22, yag:9, lif:0.5, sod:55, demir:0.2, kals:100, vitC:0.3, vitD:0.2, vitB12:0.2, acik:15, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1.5 },
  { id:682, ad:"Açma Çörek", marka:"Simit Sarayı",kal:420, pro:8, karb:58, yag:19, lif:1.5, sod:280, demir:1.5, kals:30, vitC:0, vitD:0.1, vitB12:0.1, acik:16, por:120, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:0.5 },
  { id:683, ad:"Islak Kek (Kakaolu)", marka:"Ev Yapımı",kal:380, pro:6, karb:52, yag:18, lif:2, sod:200, demir:2.2, kals:50, vitC:0.5, vitD:0.2, vitB12:0.2, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:684, ad:"Kaymak Tatlısı", marka:"Tatlıcı",kal:380, pro:5, karb:35, yag:25, lif:0, sod:80, demir:0.1, kals:130, vitC:0, vitD:0.4, vitB12:0.2, acik:10, por:150, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:685, ad:"Kabak Tatlısı (Cevizli)", marka:"Ev Yapımı",kal:215, pro:2, karb:45, yag:5.5, lif:1, sod:35, demir:0.5, kals:40, vitC:4, vitD:0, vitB12:0, acik:20, por:150, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:2.5 },
  { id:686, ad:"Aşure", marka:"Ev Yapımı",kal:185, pro:5, karb:38, yag:2, lif:4.5, sod:35, demir:2.0, kals:50, vitC:3, vitD:0, vitB12:0, acik:38, por:200, aclik:"1-2 saat", onay:true, kat:"Atıştırmalık", yildiz:3 },
  { id:687, ad:"Keşkül", marka:"Tatlıcı",kal:168, pro:4.5, karb:28, yag:5, lif:0.5, sod:85, demir:0.2, kals:130, vitC:0, vitD:0.2, vitB12:0.3, acik:28, por:200, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:2 },
  { id:688, ad:"Laz Böreği", marka:"Karadeniz",kal:290, pro:6, karb:40, yag:13, lif:0.5, sod:190, demir:0.8, kals:80, vitC:0, vitD:0.3, vitB12:0.3, acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1.5 },
  { id:689, ad:"Zerde", marka:"Ev Yapımı",kal:210, pro:1, karb:52, yag:0.5, lif:0.5, sod:5, demir:0.5, kals:15, vitC:0.5, vitD:0, vitB12:0, acik:10, por:200, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1.5 },
  { id:690, ad:"Helvani", marka:"Kastamonu",kal:470, pro:10, karb:70, yag:18, lif:2.5, sod:180, demir:3.5, kals:100, vitC:0.5, vitD:0, vitB12:0, acik:18, por:100, aclik:"1 saat", onay:true, kat:"Atıştırmalık", yildiz:2 },
  { id:691, ad:"Lif Takviyesi (Psyllium)", marka:"Metamucil",kal:20, pro:0, karb:5, yag:0.2, lif:5, sod:95, demir:0.2, kals:10, vitC:0, vitD:0, vitB12:0, acik:25, por:8, aclik:"—", onay:true, kat:"Diğer", yildiz:4.5 },
  { id:692, ad:"İnülin Tozu", marka:"Now Foods",kal:45, pro:0, karb:11, yag:0.1, lif:9.5, sod:5, demir:0.1, kals:15, vitC:0, vitD:0, vitB12:0, acik:22, por:13, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:693, ad:"Prebiyotik Lif", marka:"Garden of Life",kal:30, pro:0, karb:8, yag:0, lif:6, sod:5, demir:0.1, kals:10, vitC:0, vitD:0, vitB12:0, acik:20, por:8, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:694, ad:"Koenzim Q10", marka:"Swisse",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:695, ad:"Resveratrol", marka:"Solgar",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:4.5 },
  { id:696, ad:"Kurkumin (Zerdeçal Ekstresi)", marka:"Thorne",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:697, ad:"Niasin (B3)", marka:"Jarrow",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:698, ad:"Folik Asit", marka:"Solgar",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:699, ad:"Biotin", marka:"Now Foods",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:50, por:1, aclik:"—", onay:true, kat:"Diğer", yildiz:4.5 },
  { id:700, ad:"Kalsiyum + D Vitamini", marka:"Centrum",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:25, vitB12:0, acik:50, por:2, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:701, ad:"Mekan Çikolata (70% Kakao)", marka:"Lindt",kal:600, pro:8, karb:44, yag:47, lif:11, sod:10, demir:9.0, kals:50, vitC:0.5, vitD:0, vitB12:0, acik:25, por:100, aclik:"1 saat", onay:true, kat:"Atıştırmalık", yildiz:3.5 },
  { id:702, ad:"Kakao Tozu (Ham)", marka:"Navitas",kal:228, pro:20, karb:57, yag:14, lif:33, sod:11, demir:13.9, kals:128, vitC:0, vitD:0, vitB12:0, acik:30, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:703, ad:"Cacao Nibs", marka:"Navitas",kal:480, pro:12, karb:35, yag:35, lif:9, sod:5, demir:9.8, kals:57, vitC:0, vitD:0, vitB12:0, acik:35, por:100, aclik:"1-2 saat", onay:true, kat:"Diğer", yildiz:4.5 },
  { id:704, ad:"Karouba Tozu", marka:"Organic",kal:222, pro:5, karb:58, yag:0.7, lif:40, sod:35, demir:2.9, kals:348, vitC:0.2, vitD:0, vitB12:0, acik:25, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:705, ad:"Baobab Tozu", marka:"Aduna",kal:238, pro:3, karb:80, yag:0.5, lif:44, sod:20, demir:3.0, kals:295, vitC:300, vitD:0, vitB12:0, acik:35, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:706, ad:"Lucuma Tozu", marka:"Navitas",kal:324, pro:4, karb:76, yag:3, lif:2, sod:0, demir:0.5, kals:0, vitC:0, vitD:0, vitB12:0, acik:18, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:3 },
  { id:707, ad:"Mesquite Tozu", marka:"Navitas",kal:325, pro:17, karb:75, yag:2, lif:25, sod:35, demir:3.8, kals:550, vitC:0, vitD:0, vitB12:0, acik:30, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:708, ad:"Sacha Inchi", marka:"Peru",kal:582, pro:27, karb:8, yag:47, lif:36, sod:5, demir:4.0, kals:56, vitC:2, vitD:0, vitB12:0, acik:60, por:100, aclik:"2-3 saat", onay:true, kat:"Diğer", yildiz:5 },
  { id:709, ad:"Hemp Protein", marka:"Manitoba",kal:340, pro:50, karb:40, yag:10, lif:12, sod:12, demir:8.0, kals:105, vitC:0, vitD:0, vitB12:0, acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:710, ad:"Pea Protein", marka:"Myprotein",kal:400, pro:85, karb:4, yag:6, lif:3, sod:800, demir:12.5, kals:50, vitC:0, vitD:0, vitB12:0, acik:62, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:711, ad:"Brown Rice Protein", marka:"Sunwarrior",kal:360, pro:80, karb:10, yag:4, lif:4, sod:500, demir:9.0, kals:50, vitC:0, vitD:0, vitB12:0, acik:62, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:712, ad:"Mısır Gluteni", marka:"Teksoy",kal:365, pro:60, karb:18, yag:5, lif:5, sod:10, demir:5.0, kals:10, vitC:0, vitD:0, vitB12:0, acik:55, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:713, ad:"Susam (Beyaz)", marka:"Arifoğlu",kal:573, pro:18, karb:23, yag:50, lif:11.6, sod:11, demir:14.6, kals:975, vitC:0.4, vitD:0, vitB12:0, acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Diğer", yildiz:5 },
  { id:714, ad:"Haşhaş Tohumu", marka:"Arifoğlu",kal:525, pro:18, karb:28, yag:42, lif:19, sod:26, demir:9.7, kals:1438, vitC:1, vitD:0, vitB12:0, acik:52, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4.5 },
  { id:715, ad:"Kenevir Tohumu", marka:"Naturya",kal:553, pro:32, karb:9, yag:49, lif:4, sod:5, demir:7.7, kals:70, vitC:0.5, vitD:0, vitB12:0, acik:60, por:100, aclik:"2-3 saat", onay:true, kat:"Diğer", yildiz:5 },
  { id:716, ad:"Kakao Yağı", marka:"Navitas",kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, demir:0.3, kals:0.5, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2 },
  { id:717, ad:"Shea Yağı", marka:"Organic",kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2 },
  { id:718, ad:"Argan Yağı", marka:"Zitoun",kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, demir:0.5, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:3 },
  { id:719, ad:"Neem Tozu", marka:"Organic",kal:160, pro:7.5, karb:19, yag:4.2, lif:2, sod:20, demir:1.5, kals:60, vitC:0, vitD:0, vitB12:0, acik:15, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:4 },
  { id:720, ad:"Trüf (Siyah, Taze)", marka:"Périgord",kal:92, pro:5, karb:17, yag:0.5, lif:2, sod:10, demir:3.0, kals:8, vitC:0, vitD:0, vitB12:0, acik:30, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:721, ad:"Şitake Mantar (Kuru)", marka:"Çiftlik",kal:296, pro:10, karb:75, yag:1, lif:11.5, sod:13, demir:1.7, kals:11, vitC:3.5, vitD:0.4, vitB12:0, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:722, ad:"Portobello Mantar", marka:"Çiftlik",kal:22, pro:3.1, karb:3.9, yag:0.3, lif:1.3, sod:9, demir:0.5, kals:3, vitC:2, vitD:0.3, vitB12:0, acik:52, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:723, ad:"Kral Mantar (King Oyster)", marka:"Çiftlik",kal:35, pro:3.3, karb:6.3, yag:0.5, lif:2.3, sod:20, demir:0.8, kals:3, vitC:0, vitD:0.2, vitB12:0, acik:48, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:724, ad:"Maitake Mantar", marka:"Çiftlik",kal:31, pro:1.9, karb:6.9, yag:0.2, lif:2.7, sod:1, demir:0.3, kals:1, vitC:12, vitD:14, vitB12:0, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:725, ad:"Reishi Mantar (Toz)", marka:"Fungi",kal:104, pro:9, karb:75, yag:1, lif:26, sod:3, demir:3.5, kals:5, vitC:0, vitD:0, vitB12:0, acik:28, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:726, ad:"Chaga Mantar (Toz)", marka:"Organic",kal:53, pro:1.5, karb:10, yag:0.3, lif:5, sod:35, demir:0.5, kals:3, vitC:0, vitD:0, vitB12:0, acik:25, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:727, ad:"Lion's Mane (Toz)", marka:"Host Defense",kal:110, pro:5, karb:20, yag:1, lif:6.3, sod:5, demir:0.8, kals:5, vitC:0, vitD:0, vitB12:0, acik:30, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:728, ad:"Cordyceps (Toz)", marka:"Real Mushrooms",kal:325, pro:20, karb:45, yag:7, lif:14, sod:7, demir:3.8, kals:8, vitC:0, vitD:0, vitB12:0, acik:28, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:729, ad:"Tremella Mantar", marka:"Çiftlik",kal:355, pro:4, karb:92, yag:1.5, lif:15, sod:135, demir:4.2, kals:8, vitC:0, vitD:0, vitB12:0, acik:22, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:5 },
  { id:730, ad:"Enoki Mantar", marka:"Çiftlik",kal:37, pro:2.7, karb:7.6, yag:0.3, lif:2.7, sod:3, demir:0.6, kals:3, vitC:3, vitD:0, vitB12:0, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:731, ad:"Peynirli Pide (Kasap)", marka:"Fırın",kal:320, pro:16, karb:36, yag:12, lif:2, sod:680, demir:1.5, kals:200, vitC:0, vitD:0.2, vitB12:0.4, acik:38, por:150, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:2 },
  { id:732, ad:"Sucuklu Yumurta", marka:"Lokanta",kal:280, pro:18, karb:3, yag:22, lif:0, sod:850, demir:2.5, kals:55, vitC:0.3, vitD:1.5, vitB12:1.5, acik:60, por:150, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:1.5 },
  { id:733, ad:"Kavurmalı Yumurta", marka:"Lokanta",kal:295, pro:18, karb:1, yag:24, lif:0, sod:380, demir:2.8, kals:55, vitC:0.3, vitD:1.5, vitB12:1.8, acik:62, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:2 },
  { id:734, ad:"Pastırmalı Yumurta", marka:"Lokanta",kal:295, pro:20, karb:2, yag:22, lif:0, sod:780, demir:3.5, kals:55, vitC:0.3, vitD:1.5, vitB12:2.0, acik:65, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:2 },
  { id:735, ad:"Tahinli Ekmek", marka:"Fırın",kal:285, pro:8, karb:40, yag:12, lif:2, sod:380, demir:1.5, kals:50, vitC:0, vitD:0.1, vitB12:0, acik:28, por:80, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:2 },
  { id:736, ad:"Şeker Kamışı Suyu", marka:"Tropikal",kal:70, pro:0.2, karb:17, yag:0.3, lif:0, sod:15, demir:0.2, kals:10, vitC:0, vitD:0, vitB12:0, acik:8, por:240, aclik:"—", onay:true, kat:"İçecek", yildiz:2 },
  { id:737, ad:"Kokos Kreması", marka:"Chaokoh",kal:330, pro:3.5, karb:7, yag:34, lif:2, sod:30, demir:2.8, kals:10, vitC:0.5, vitD:0, vitB12:0, acik:18, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2 },
  { id:738, ad:"Tırnaklı Kiraz (Vişne)", marka:"Ege",kal:50, pro:1, karb:12, yag:0.3, lif:1.6, sod:3, demir:0.3, kals:16, vitC:10, vitD:0, vitB12:0, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:4.5 },
  { id:739, ad:"Dağ Çileği", marka:"Ege",kal:52, pro:1.2, karb:12, yag:0.3, lif:2, sod:1, demir:0.4, kals:25, vitC:16, vitD:0, vitB12:0, acik:48, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:740, ad:"Bektaşi Üzümü", marka:"Ege",kal:44, pro:0.9, karb:10, yag:0.6, lif:4.3, sod:1, demir:0.3, kals:25, vitC:27, vitD:0, vitB12:0, acik:52, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:741, ad:"Taze Fasulye (Pişmiş)", marka:"Çiftlik",kal:31, pro:1.8, karb:7, yag:0.2, lif:3.4, sod:6, demir:1.0, kals:37, vitC:12, vitD:0, vitB12:0, acik:58, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:742, ad:"Karnıbahar Pirinç", marka:"Ev Yapımı",kal:25, pro:2, karb:5, yag:0.3, lif:2.5, sod:30, demir:0.4, kals:22, vitC:44, vitD:0, vitB12:0, acik:55, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:743, ad:"Kabak Spagetti", marka:"Ev Yapımı",kal:17, pro:1.2, karb:3.6, yag:0.3, lif:1.1, sod:8, demir:0.4, kals:15, vitC:17, vitD:0, vitB12:0, acik:40, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:744, ad:"Mor Lahana Turşusu", marka:"Ev Yapımı",kal:19, pro:0.9, karb:4.3, yag:0.1, lif:2.1, sod:620, demir:0.3, kals:40, vitC:14, vitD:0, vitB12:0, acik:48, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:745, ad:"Kimchi", marka:"Kore",kal:15, pro:1.1, karb:2.4, yag:0.5, lif:1.6, sod:498, demir:0.3, kals:33, vitC:3.2, vitD:0, vitB12:0, acik:45, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:746, ad:"Tofu Salatası", marka:"Ev Yapımı",kal:90, pro:8, karb:4, yag:4.8, lif:1.2, sod:250, demir:1.6, kals:350, vitC:2, vitD:0, vitB12:0, acik:60, por:150, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:747, ad:"Humus + Havuç", marka:"Ev Yapımı",kal:120, pro:4.5, karb:14, yag:6, lif:4.5, sod:290, demir:1.5, kals:42, vitC:4, vitD:0, vitB12:0, acik:60, por:150, aclik:"1-2 saat", onay:true, kat:"Diğer", yildiz:5 },
  { id:748, ad:"Edamame (Buharda)", marka:"Çiftlik",kal:121, pro:11, karb:9, yag:5.2, lif:5.2, sod:6, demir:2.3, kals:63, vitC:6.1, vitD:0, vitB12:0, acik:75, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:749, ad:"Mercimek Salatası", marka:"Ev Yapımı",kal:145, pro:9, karb:22, yag:3.5, lif:7.5, sod:280, demir:3.2, kals:28, vitC:4, vitD:0, vitB12:0, acik:72, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:750, ad:"Semizotu Salatası", marka:"Ev Yapımı",kal:28, pro:2.5, karb:4.5, yag:0.5, lif:0.8, sod:350, demir:2.5, kals:75, vitC:22, vitD:0, vitB12:0, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:751, ad:"Böğürtlen Smoothie", marka:"Ev Yapımı",kal:95, pro:2.5, karb:20, yag:1, lif:4, sod:35, demir:0.8, kals:80, vitC:22, vitD:0, vitB12:0, acik:42, por:300, aclik:"30-60 dk", onay:true, kat:"İçecek", yildiz:5 },
  { id:752, ad:"Kale Çipsi", marka:"Baked",kal:155, pro:9, karb:18, yag:7, lif:4, sod:400, demir:2.5, kals:180, vitC:80, vitD:0, vitB12:0, acik:42, por:30, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:753, ad:"Zucchini Cipsi (Fırın)", marka:"Ev Yapımı",kal:85, pro:2, karb:12, yag:3.5, lif:1.5, sod:180, demir:0.6, kals:20, vitC:8, vitD:0, vitB12:0, acik:38, por:50, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4 },
  { id:754, ad:"Havuç Cipsi (Fırın)", marka:"Ev Yapımı",kal:90, pro:1.5, karb:18, yag:2, lif:4, sod:80, demir:0.5, kals:30, vitC:5, vitD:0, vitB12:0, acik:38, por:50, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:755, ad:"Kinoalı Salata", marka:"Ev Yapımı",kal:185, pro:7, karb:28, yag:5.5, lif:4, sod:310, demir:2.0, kals:40, vitC:5, vitD:0, vitB12:0, acik:58, por:200, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:4.5 },
  { id:756, ad:"Tabbule", marka:"Lübnan",kal:140, pro:3.5, karb:20, yag:5.5, lif:4, sod:250, demir:1.5, kals:50, vitC:12, vitD:0, vitB12:0, acik:55, por:150, aclik:"1-2 saat", onay:true, kat:"Tahıl", yildiz:5 },
  { id:757, ad:"Waldorf Salatası", marka:"Kafeterya",kal:185, pro:3, karb:18, yag:12, lif:2.5, sod:280, demir:0.5, kals:40, vitC:5, vitD:0, vitB12:0, acik:40, por:150, aclik:"30-60 dk", onay:true, kat:"Diğer", yildiz:3.5 },
  { id:758, ad:"Niçoise Salata", marka:"Fransız",kal:200, pro:15, karb:12, yag:10, lif:3.5, sod:480, demir:2.5, kals:60, vitC:12, vitD:3.0, vitB12:1.2, acik:52, por:200, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:759, ad:"Caesar Salata (Tavuklu)", marka:"Kafeterya",kal:320, pro:24, karb:16, yag:18, lif:2.5, sod:780, demir:1.5, kals:120, vitC:5, vitD:0.1, vitB12:0.3, acik:48, por:250, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:760, ad:"Tuna Salata", marka:"Ev Yapımı",kal:195, pro:22, karb:5, yag:9.5, lif:1.5, sod:480, demir:1.5, kals:20, vitC:5, vitD:3.0, vitB12:2.0, acik:60, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:761, ad:"Baklava (Antep Fıstıklı)", marka:"Güllüoğlu",kal:560, pro:7, karb:55, yag:36, lif:2.5, sod:200, demir:1.5, kals:40, vitC:0.5, vitD:0, vitB12:0.1, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:762, ad:"Künefe", marka:"Hatay",kal:420, pro:11, karb:50, yag:22, lif:1, sod:250, demir:0.8, kals:180, vitC:0, vitD:0.2, vitB12:0.3, acik:14, por:150, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:763, ad:"Kestane Şekeri", marka:"Saray",kal:390, pro:3.5, karb:90, yag:0.5, lif:5, sod:10, demir:0.8, kals:30, vitC:15, vitD:0, vitB12:0, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:2 },
  { id:764, ad:"Tatlı Pişi", marka:"Karadeniz",kal:310, pro:5, karb:42, yag:15, lif:1.5, sod:290, demir:1.5, kals:30, vitC:0, vitD:0.1, vitB12:0.1, acik:15, por:80, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:1 },
  { id:765, ad:"Şeker Halva", marka:"Koska",kal:400, pro:3, karb:90, yag:5, lif:0.5, sod:50, demir:0.5, kals:30, vitC:0, vitD:0, vitB12:0, acik:8, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:766, ad:"Cevizli Sucuk", marka:"Hatay",kal:450, pro:9, karb:90, yag:9, lif:3.5, sod:20, demir:2.5, kals:60, vitC:1, vitD:0, vitB12:0, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:2.5 },
  { id:767, ad:"Dövme (Kabak Çekirdeği Ezmesi)", marka:"Hatay",kal:380, pro:16, karb:45, yag:20, lif:8, sod:80, demir:5.5, kals:80, vitC:1.5, vitD:0, vitB12:0, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Diğer", yildiz:4 },
  { id:768, ad:"Şambalılı (Köy Tahinlisi)", marka:"Hatay",kal:510, pro:11, karb:55, yag:28, lif:3, sod:90, demir:3.5, kals:140, vitC:0.2, vitD:0, vitB12:0, acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:2 },
  { id:769, ad:"Mısır (Haşlanmış)", marka:"Çiftlik",kal:108, pro:3.4, karb:25, yag:1.2, lif:2.4, sod:14, demir:0.5, kals:3, vitC:6.4, vitD:0, vitB12:0, acik:38, por:150, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:3 },
  { id:770, ad:"Kızarmış Nohut", marka:"Ev Yapımı",kal:180, pro:9.5, karb:27, yag:5, lif:7, sod:240, demir:2.8, kals:48, vitC:1.2, vitD:0, vitB12:0, acik:62, por:60, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:771, ad:"Kek (Havuçlu)", marka:"Fırın",kal:380, pro:5, karb:58, yag:15, lif:2.5, sod:280, demir:1.8, kals:60, vitC:1.5, vitD:0.2, vitB12:0.2, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:772, ad:"Muffin (Çikolatalı)", marka:"Fırın",kal:420, pro:6, karb:56, yag:20, lif:2.5, sod:290, demir:2.5, kals:60, vitC:0.5, vitD:0.2, vitB12:0.2, acik:10, por:120, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:773, ad:"Scone", marka:"Pâtisserie",kal:360, pro:6, karb:55, yag:14, lif:2, sod:380, demir:1.5, kals:80, vitC:0, vitD:0.2, vitB12:0.2, acik:15, por:80, aclik:"30-60 dk", onay:true, kat:"Tahıl", yildiz:1.5 },
  { id:774, ad:"Financier", marka:"Pâtisserie",kal:430, pro:8, karb:55, yag:22, lif:1, sod:220, demir:1.2, kals:40, vitC:0.2, vitD:0.2, vitB12:0.1, acik:10, por:60, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:1 },
  { id:775, ad:"Sable Kurabiye", marka:"Pâtisserie",kal:500, pro:6, karb:62, yag:26, lif:1.5, sod:380, demir:1.5, kals:20, vitC:0.2, vitD:0.2, vitB12:0.1, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0.5 },
  { id:776, ad:"Dondurulmuş Tatlı Mısır", marka:"Bonduelle",kal:76, pro:2.8, karb:17, yag:0.7, lif:2, sod:8, demir:0.4, kals:2, vitC:5.5, vitD:0, vitB12:0, acik:38, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:3 },
  { id:777, ad:"Dondurulmuş Karışık Sebze", marka:"Superfresh",kal:48, pro:2.5, karb:9, yag:0.3, lif:3, sod:55, demir:0.8, kals:25, vitC:8, vitD:0, vitB12:0, acik:55, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:778, ad:"Dondurulmuş Ispanak", marka:"Superfresh",kal:23, pro:2.9, karb:3.6, yag:0.4, lif:2.4, sod:70, demir:2.7, kals:136, vitC:28, vitD:0, vitB12:0, acik:62, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:779, ad:"Dondurulmuş Brokoli", marka:"Superfresh",kal:35, pro:2.8, karb:7, yag:0.4, lif:2.6, sod:30, demir:0.8, kals:47, vitC:65, vitD:0, vitB12:0, acik:62, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:780, ad:"Dondurulmuş Edamame", marka:"Superfresh",kal:121, pro:11, karb:9, yag:5.2, lif:5.2, sod:6, demir:2.3, kals:63, vitC:6, vitD:0, vitB12:0, acik:70, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:781, ad:"Domatesi İşlenmiş Sos", marka:"Barilla",kal:76, pro:2, karb:13, yag:2.5, lif:2, sod:680, demir:0.8, kals:30, vitC:12, vitD:0, vitB12:0, acik:38, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:3.5 },
  { id:782, ad:"Beyaz Sos (Beşamel)", marka:"Dr. Oetker",kal:85, pro:2.5, karb:9, yag:5, lif:0.3, sod:320, demir:0.3, kals:80, vitC:0.5, vitD:0.2, vitB12:0.2, acik:25, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2 },
  { id:783, ad:"Ranch Sos", marka:"Hidden Valley",kal:130, pro:0.5, karb:2.5, yag:14, lif:0, sod:360, demir:0.1, kals:20, vitC:0.5, vitD:0, vitB12:0, acik:10, por:30, aclik:"—", onay:true, kat:"Diğer", yildiz:0.5 },
  { id:784, ad:"Hummus (Kırmızı Biberli)", marka:"Sabra",kal:173, pro:5, karb:14, yag:11, lif:4.5, sod:390, demir:1.8, kals:35, vitC:3.5, vitD:0, vitB12:0, acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Diğer", yildiz:4.5 },
  { id:785, ad:"Tzatziki", marka:"Ev Yapımı",kal:72, pro:4, karb:5, yag:4.5, lif:0.5, sod:200, demir:0.2, kals:80, vitC:1.5, vitD:0.1, vitB12:0.3, acik:48, por:100, aclik:"30-60 dk", onay:true, kat:"Süt Ürünü", yildiz:4 },
  { id:786, ad:"Tapenade (Zeytin Ezmesi)", marka:"Kaviari",kal:235, pro:1.5, karb:5, yag:24, lif:3.5, sod:940, demir:1.5, kals:120, vitC:0.5, vitD:0, vitB12:0, acik:32, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:2.5 },
  { id:787, ad:"Aïoli", marka:"Ev Yapımı",kal:330, pro:1, karb:2.5, yag:36, lif:0, sod:410, demir:0.1, kals:10, vitC:1.5, vitD:0, vitB12:0, acik:12, por:30, aclik:"—", onay:true, kat:"Diğer", yildiz:1 },
  { id:788, ad:"Muhammara", marka:"Ev Yapımı",kal:220, pro:4, karb:22, yag:14, lif:3.5, sod:350, demir:1.5, kals:40, vitC:3, vitD:0, vitB12:0, acik:38, por:100, aclik:"30-60 dk", onay:true, kat:"Diğer", yildiz:3.5 },
  { id:789, ad:"Baba Ganoush (Marka)", marka:"Sabra",kal:55, pro:1.5, karb:7, yag:3, lif:1.5, sod:190, demir:0.4, kals:25, vitC:1, vitD:0, vitB12:0, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4 },
  { id:790, ad:"Romesco Sos", marka:"İspanyol",kal:180, pro:3, karb:12, yag:15, lif:2.5, sod:340, demir:1.0, kals:30, vitC:8, vitD:0, vitB12:0, acik:28, por:100, aclik:"—", onay:true, kat:"Diğer", yildiz:3.5 },
  { id:791, ad:"Mandalina", marka:"Ege",kal:53, pro:0.8, karb:13, yag:0.3, lif:1.8, sod:2, demir:0.1, kals:37, vitC:27, vitD:0, vitB12:0, acik:48, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:4.5 },
  { id:792, ad:"Kan Portakalı", marka:"Sicilya",kal:50, pro:1, karb:12, yag:0.1, lif:2.5, sod:0, demir:0.1, kals:42, vitC:56, vitD:0, vitB12:0, acik:52, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:793, ad:"Bergamot", marka:"Kalabria",kal:45, pro:0.8, karb:11, yag:0.2, lif:2.2, sod:0, demir:0.1, kals:30, vitC:48, vitD:0, vitB12:0, acik:48, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:794, ad:"Feijoa", marka:"Yeni Zelanda",kal:55, pro:1.2, karb:13, yag:0.6, lif:6.4, sod:3, demir:0.1, kals:17, vitC:32, vitD:0, vitB12:0, acik:52, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:795, ad:"Passionfruit", marka:"Tropikal",kal:97, pro:2.2, karb:23, yag:0.7, lif:10.4, sod:28, demir:1.6, kals:12, vitC:30, vitD:0, vitB12:0, acik:55, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:796, ad:"Dragon Fruit (Kırmızı)", marka:"Tropikal",kal:60, pro:1.2, karb:13, yag:0.4, lif:2.9, sod:39, demir:0.2, kals:18, vitC:9, vitD:0, vitB12:0, acik:48, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:797, ad:"Rambutan", marka:"Tropikal",kal:75, pro:0.9, karb:16, yag:0.5, lif:0.9, sod:1, demir:0.4, kals:22, vitC:4.9, vitD:0, vitB12:0, acik:40, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:4 },
  { id:798, ad:"Lychee", marka:"Çin",kal:66, pro:0.8, karb:17, yag:0.4, lif:1.3, sod:1, demir:0.3, kals:5, vitC:71.5, vitD:0, vitB12:0, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:4.5 },
  { id:799, ad:"Longan", marka:"Tayland",kal:60, pro:1.3, karb:15, yag:0.1, lif:1.1, sod:0, demir:0.1, kals:1, vitC:84, vitD:0, vitB12:0, acik:40, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:4.5 },
  { id:800, ad:"Sapote (Siyah)", marka:"Orta Amerika",kal:130, pro:0.7, karb:32, yag:0.5, lif:8, sod:3, demir:0.5, kals:26, vitC:0, vitD:0, vitB12:0, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:4 },
  { id:801, ad:"Mantar Corbasi (Knorr)", marka:"Knorr",kal:68, pro:2.5, karb:10, yag:2, lif:1, sod:740, demir:0.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:42, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:2 },
  { id:802, ad:"Kremali Tavuk Corbasi", marka:"Knorr",kal:85, pro:4, karb:10, yag:3.5, lif:0.5, sod:820, demir:0.4, kals:30, vitC:0, vitD:0.1, vitB12:0.2, acik:45, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:2 },
  { id:803, ad:"Havuc (Haslanmis)", marka:"",kal:35, pro:0.8, karb:8.2, yag:0.2, lif:2.9, sod:58, demir:0.4, kals:30, vitC:3.6, vitD:0, vitB12:0, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:804, ad:"Kereviz Sapi (Cig)", marka:"",kal:16, pro:0.7, karb:3, yag:0.2, lif:1.6, sod:80, demir:0.2, kals:40, vitC:3.1, vitD:0, vitB12:0, acik:20, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:805, ad:"Mantar (Kultur, Cig)", marka:"",kal:22, pro:3.1, karb:3.3, yag:0.3, lif:1, sod:5, demir:0.5, kals:3, vitC:2.1, vitD:0.2, vitB12:0, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:806, ad:"Bezelye Corbasi (Ev)", marka:"",kal:92, pro:5.5, karb:15, yag:2, lif:4.5, sod:310, demir:1.8, kals:22, vitC:8, vitD:0, vitB12:0, acik:62, por:200, aclik:"1-2 saat", onay:true, kat:"Corba", yildiz:4.5 },
  { id:807, ad:"Sebze Corbasi (Ev)", marka:"",kal:55, pro:2.5, karb:10, yag:1.5, lif:3, sod:290, demir:0.8, kals:30, vitC:12, vitD:0, vitB12:0, acik:52, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:5 },
  { id:808, ad:"Bulgur Pilavi", marka:"",kal:185, pro:5.5, karb:38, yag:2, lif:4.5, sod:180, demir:1.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:58, por:150, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:4.5 },
  { id:809, ad:"Sehriye Pilavi", marka:"",kal:210, pro:5, karb:42, yag:4, lif:1.5, sod:320, demir:1.2, kals:15, vitC:0, vitD:0, vitB12:0, acik:45, por:150, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:810, ad:"Zeytinyagli Fasulye", marka:"",kal:95, pro:4, karb:13, yag:4, lif:4.5, sod:180, demir:1.5, kals:42, vitC:8, vitD:0, vitB12:0, acik:68, por:150, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:5 },
  { id:811, ad:"Zeytinyagli Pirasa", marka:"",kal:80, pro:2, karb:10, yag:4, lif:2.5, sod:160, demir:1.2, kals:50, vitC:12, vitD:0, vitB12:0, acik:52, por:150, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:812, ad:"Zeytinyagli Enginar", marka:"",kal:65, pro:2, karb:8, yag:3.5, lif:4, sod:150, demir:0.8, kals:44, vitC:8, vitD:0, vitB12:0, acik:55, por:150, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:813, ad:"Patates Koftesi (Firin)", marka:"",kal:155, pro:4, karb:28, yag:3.5, lif:2.5, sod:240, demir:1.0, kals:18, vitC:10, vitD:0, vitB12:0, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:3 },
  { id:814, ad:"Firin Tavuk (But)", marka:"",kal:245, pro:28, karb:0, yag:15, lif:0, sod:75, demir:1.2, kals:15, vitC:0, vitD:0.1, vitB12:0.3, acik:82, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:815, ad:"Tavuk Kanat (Izgara)", marka:"",kal:203, pro:18, karb:0, yag:14, lif:0, sod:82, demir:1.0, kals:12, vitC:0, vitD:0.1, vitB12:0.3, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:816, ad:"Kusbasi Dana (Sote)", marka:"",kal:195, pro:24, karb:3, yag:10, lif:0.5, sod:320, demir:2.5, kals:18, vitC:3, vitD:0, vitB12:1.8, acik:80, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:817, ad:"Mercimekli Kofte", marka:"",kal:165, pro:7, karb:26, yag:5, lif:6, sod:260, demir:2.8, kals:30, vitC:3, vitD:0, vitB12:0, acik:65, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:818, ad:"Domates Salatasi", marka:"",kal:70, pro:1.5, karb:9, yag:4, lif:2, sod:180, demir:0.5, kals:18, vitC:20, vitD:0, vitB12:0, acik:38, por:150, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:819, ad:"Cacik", marka:"",kal:55, pro:3.5, karb:5, yag:2.5, lif:0.5, sod:200, demir:0.2, kals:80, vitC:2, vitD:0.1, vitB12:0.3, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Sut Urunu", yildiz:4.5 },
  { id:820, ad:"Coban Salatasi", marka:"",kal:55, pro:1.5, karb:8, yag:2.5, lif:2.5, sod:220, demir:0.5, kals:20, vitC:22, vitD:0, vitB12:0, acik:40, por:150, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:821, ad:"Tavuk Sis", marka:"",kal:165, pro:28, karb:2, yag:5, lif:0.5, sod:420, demir:0.8, kals:15, vitC:1.5, vitD:0, vitB12:0.3, acik:80, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:822, ad:"Kuzu Pirzola (Izgara)", marka:"",kal:285, pro:26, karb:0, yag:20, lif:0, sod:72, demir:1.9, kals:14, vitC:0, vitD:0.1, vitB12:2.0, acik:82, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:823, ad:"Nohutlu Tavuk", marka:"",kal:220, pro:22, karb:18, yag:7, lif:4, sod:380, demir:2.0, kals:45, vitC:2, vitD:0, vitB12:0.3, acik:75, por:200, aclik:"3-4 saat", onay:true, kat:"Hazir Yemek", yildiz:4.5 },
  { id:824, ad:"Etli Nohut", marka:"",kal:240, pro:18, karb:22, yag:9, lif:5, sod:420, demir:3.0, kals:50, vitC:2, vitD:0, vitB12:1.0, acik:78, por:200, aclik:"3-4 saat", onay:true, kat:"Hazir Yemek", yildiz:4.5 },
  { id:825, ad:"Imam Bayildi", marka:"",kal:120, pro:2, karb:12, yag:8, lif:3.5, sod:280, demir:0.8, kals:20, vitC:8, vitD:0, vitB12:0, acik:55, por:200, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4 },
  { id:826, ad:"Karniyarik", marka:"",kal:185, pro:10, karb:12, yag:12, lif:3, sod:380, demir:1.5, kals:30, vitC:8, vitD:0, vitB12:0.5, acik:68, por:200, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:3.5 },
  { id:827, ad:"Barbunya Pilaki", marka:"",kal:145, pro:7, karb:22, yag:4, lif:6, sod:240, demir:2.2, kals:45, vitC:5, vitD:0, vitB12:0, acik:70, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:828, ad:"Fava (Bakla Ezmesi)", marka:"",kal:110, pro:6.5, karb:16, yag:2.5, lif:5, sod:180, demir:1.5, kals:35, vitC:5, vitD:0, vitB12:0, acik:65, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:829, ad:"Zeytinyagli Dolma", marka:"",kal:155, pro:3, karb:22, yag:7, lif:2.5, sod:290, demir:1.0, kals:25, vitC:3, vitD:0, vitB12:0, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:3 },
  { id:830, ad:"Etli Biber Dolma", marka:"",kal:195, pro:14, karb:18, yag:9, lif:2, sod:480, demir:1.8, kals:30, vitC:25, vitD:0, vitB12:0.8, acik:68, por:150, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:4 },
  { id:831, ad:"Menemen (2 Yumurta)", marka:"",kal:185, pro:14, karb:8, yag:12, lif:1.5, sod:480, demir:2.2, kals:55, vitC:18, vitD:1.5, vitB12:0.9, acik:65, por:200, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:4 },
  { id:832, ad:"Sigara Boregi (2 adet)", marka:"",kal:160, pro:5, karb:18, yag:8, lif:0.8, sod:280, demir:0.5, kals:80, vitC:0, vitD:0.1, vitB12:0.2, acik:30, por:80, aclik:"30-60 dk", onay:true, kat:"Tahil", yildiz:1.5 },
  { id:833, ad:"Su Boregi (Peynirli)", marka:"",kal:220, pro:9, karb:24, yag:10, lif:1, sod:420, demir:0.8, kals:150, vitC:0, vitD:0.2, vitB12:0.3, acik:40, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:834, ad:"Ulker Banta Biskuvi", marka:"Ulker",kal:460, pro:7, karb:66, yag:20, lif:2, sod:350, demir:2.0, kals:30, vitC:0, vitD:0, vitB12:0, acik:14, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:835, ad:"Ulker 9Kat Tat", marka:"Ulker",kal:490, pro:6, karb:64, yag:23, lif:1.5, sod:300, demir:1.5, kals:25, vitC:0, vitD:0, vitB12:0, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:836, ad:"Eti Popkek", marka:"Eti",kal:380, pro:4.5, karb:57, yag:16, lif:1, sod:210, demir:1.2, kals:30, vitC:0, vitD:0, vitB12:0, acik:10, por:45, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:837, ad:"Eti Sultan Kek", marka:"Eti",kal:365, pro:4, karb:55, yag:15, lif:0.8, sod:230, demir:1.0, kals:25, vitC:0, vitD:0, vitB12:0, acik:10, por:50, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:838, ad:"Ulker Albeni", marka:"Ulker",kal:490, pro:5, karb:65, yag:24, lif:1, sod:200, demir:1.5, kals:40, vitC:0, vitD:0, vitB12:0, acik:10, por:45, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:839, ad:"Tadim Leblebi", marka:"Tadim",kal:364, pro:22, karb:58, yag:4.5, lif:17, sod:10, demir:5.8, kals:57, vitC:0.5, vitD:0, vitB12:0, acik:60, por:100, aclik:"2-3 saat", onay:true, kat:"Atistirmalik", yildiz:4.5 },
  { id:840, ad:"Tadim Antep Fistigi", marka:"Tadim",kal:557, pro:20, karb:28, yag:45, lif:10, sod:1, demir:3.9, kals:105, vitC:5.6, vitD:0, vitB12:0, acik:68, por:100, aclik:"2-3 saat", onay:true, kat:"Atistirmalik", yildiz:4.5 },
  { id:841, ad:"Sutas Meyveli Yogurt", marka:"Sutas",kal:105, pro:3.5, karb:16, yag:3, lif:0.2, sod:55, demir:0.1, kals:110, vitC:1, vitD:0.1, vitB12:0.3, acik:35, por:150, aclik:"30-60 dk", onay:true, kat:"Sut Urunu", yildiz:2.5 },
  { id:842, ad:"Pinar Kakaolu Icecek", marka:"Pinar",kal:120, pro:4.5, karb:16, yag:4, lif:0.5, sod:60, demir:0.8, kals:140, vitC:0, vitD:0.5, vitB12:0.4, acik:35, por:200, aclik:"30-60 dk", onay:true, kat:"Icecek", yildiz:2.5 },
  { id:843, ad:"Nescafe Gold (Sade)", marka:"Nestle",kal:4, pro:0.6, karb:0.5, yag:0.1, lif:0, sod:3, demir:0, kals:4, vitC:0, vitD:0, vitB12:0, acik:5, por:2, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:3 },
  { id:844, ad:"Icim Sut Tam Yag 200ml", marka:"Icim",kal:124, pro:6.4, karb:9.4, yag:7, lif:0, sod:88, demir:0, kals:240, vitC:0, vitD:0.8, vitB12:0.8, acik:48, por:200, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:4 },
  { id:845, ad:"Torku Helvasi", marka:"Torku",kal:490, pro:8.5, karb:64, yag:23, lif:2.5, sod:85, demir:3.5, kals:160, vitC:0, vitD:0, vitB12:0, acik:15, por:100, aclik:"1 saat", onay:true, kat:"Atistirmalik", yildiz:2 },
  { id:846, ad:"Dr Oetker Puding Cikolata", marka:"Dr. Oetker",kal:335, pro:4, karb:71, yag:4.5, lif:0.8, sod:200, demir:0.8, kals:100, vitC:0, vitD:0.2, vitB12:0.3, acik:18, por:150, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:847, ad:"Taze Sikilmis Nar Suyu", marka:"",kal:62, pro:0.9, karb:15, yag:0.3, lif:0.2, sod:9, demir:0.3, kals:11, vitC:10, vitD:0, vitB12:0, acik:18, por:200, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:4 },
  { id:848, ad:"Taze Sikilmis Elma Suyu", marka:"",kal:46, pro:0.1, karb:11, yag:0.1, lif:0.2, sod:1, demir:0.1, kals:5, vitC:1.5, vitD:0, vitB12:0, acik:12, por:200, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:3 },
  { id:849, ad:"Taze Sikilmis Havuc Suyu", marka:"",kal:40, pro:0.9, karb:9.3, yag:0.2, lif:0.5, sod:69, demir:0.5, kals:29, vitC:9, vitD:0, vitB12:0, acik:22, por:200, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:5 },
  { id:850, ad:"Ispanakli Yumurtali Pide", marka:"",kal:290, pro:14, karb:38, yag:10, lif:2.5, sod:550, demir:2.5, kals:130, vitC:5, vitD:1.0, vitB12:0.6, acik:52, por:200, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:3.5 },
  { id:851, ad:"Simit (Susam)", marka:"",kal:285, pro:9, karb:54, yag:4.5, lif:3, sod:410, demir:2.5, kals:30, vitC:0, vitD:0, vitB12:0, acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:852, ad:"Pogaca (Zeytinli)", marka:"",kal:320, pro:7, karb:44, yag:13, lif:2, sod:480, demir:1.8, kals:40, vitC:0, vitD:0, vitB12:0, acik:30, por:80, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:853, ad:"Pogaca (Peynirli)", marka:"",kal:335, pro:10, karb:42, yag:14, lif:1.5, sod:520, demir:1.5, kals:120, vitC:0, vitD:0.1, vitB12:0.2, acik:32, por:80, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:854, ad:"Borek (Kiymali)", marka:"",kal:310, pro:14, karb:28, yag:17, lif:1.5, sod:560, demir:2.5, kals:50, vitC:1, vitD:0, vitB12:0.8, acik:50, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:855, ad:"Acma (Tereyagli)", marka:"",kal:360, pro:8, karb:48, yag:16, lif:1.5, sod:390, demir:1.5, kals:30, vitC:0, vitD:0.1, vitB12:0.1, acik:25, por:90, aclik:"30-60 dk", onay:true, kat:"Tahil", yildiz:0.5 },
  { id:856, ad:"Tost (Kasar-Domates)", marka:"",kal:340, pro:14, karb:42, yag:13, lif:2, sod:680, demir:1.5, kals:200, vitC:3, vitD:0.2, vitB12:0.3, acik:38, por:120, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:857, ad:"Tost (Sucuklu-Kasar)", marka:"",kal:420, pro:18, karb:40, yag:22, lif:2, sod:980, demir:2.0, kals:180, vitC:0, vitD:0.2, vitB12:0.5, acik:42, por:140, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:1 },
  { id:858, ad:"Doner Kebap (Dana)", marka:"",kal:240, pro:22, karb:2, yag:16, lif:0, sod:580, demir:2.5, kals:20, vitC:0, vitD:0, vitB12:1.5, acik:75, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:859, ad:"Doner Kebap (Tavuk)", marka:"",kal:185, pro:24, karb:2, yag:9, lif:0, sod:520, demir:0.8, kals:15, vitC:0, vitD:0, vitB12:0.3, acik:78, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:860, ad:"Kofte Ekmek", marka:"",kal:380, pro:22, karb:40, yag:14, lif:2.5, sod:640, demir:2.8, kals:50, vitC:2, vitD:0, vitB12:0.9, acik:55, por:180, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:3 },
  { id:861, ad:"Pilav Ustu Nohut", marka:"",kal:280, pro:10, karb:52, yag:5, lif:5, sod:310, demir:2.5, kals:35, vitC:1, vitD:0, vitB12:0, acik:62, por:300, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:4 },
  { id:862, ad:"Pilav Ustu Tavuk", marka:"",kal:310, pro:22, karb:40, yag:8, lif:1, sod:420, demir:1.0, kals:15, vitC:0, vitD:0, vitB12:0.2, acik:65, por:300, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:3.5 },
  { id:863, ad:"Kuru Fasulye (Pismis)", marka:"",kal:140, pro:9.5, karb:22, yag:1.5, lif:6.5, sod:280, demir:2.5, kals:55, vitC:0, vitD:0, vitB12:0, acik:72, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:864, ad:"Nohut (Pismis)", marka:"",kal:165, pro:9, karb:27, yag:2.5, lif:7.5, sod:8, demir:3.0, kals:49, vitC:1.5, vitD:0, vitB12:0, acik:70, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:865, ad:"Mercimek (Yesil, Pismis)", marka:"",kal:115, pro:9, karb:20, yag:0.4, lif:7.9, sod:2, demir:3.3, kals:19, vitC:1.5, vitD:0, vitB12:0, acik:70, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:866, ad:"Asure", marka:"",kal:190, pro:5.5, karb:39, yag:2, lif:4, sod:30, demir:2.0, kals:50, vitC:2, vitD:0, vitB12:0, acik:40, por:200, aclik:"1-2 saat", onay:true, kat:"Atistirmalik", yildiz:3.5 },
  { id:867, ad:"Kabak Mucveri", marka:"",kal:145, pro:7, karb:12, yag:8, lif:2, sod:320, demir:1.0, kals:80, vitC:10, vitD:0.5, vitB12:0.3, acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:3.5 },
  { id:868, ad:"Patates Mucveri", marka:"",kal:165, pro:5, karb:22, yag:7.5, lif:2, sod:280, demir:0.8, kals:50, vitC:12, vitD:0.3, vitB12:0.2, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:3 },
  { id:869, ad:"Midye Tavasi", marka:"",kal:320, pro:14, karb:28, yag:18, lif:1, sod:580, demir:3.5, kals:40, vitC:0.5, vitD:0.2, vitB12:5, acik:45, por:150, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:2 },
  { id:870, ad:"Karides Guvec", marka:"",kal:180, pro:20, karb:8, yag:8, lif:1.5, sod:680, demir:1.5, kals:80, vitC:8, vitD:0.2, vitB12:1.2, acik:68, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:871, ad:"Katmer (Antep)", marka:"",kal:485, pro:8, karb:55, yag:27, lif:1.5, sod:180, demir:1.5, kals:40, vitC:0, vitD:0.2, vitB12:0.1, acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Tahil", yildiz:0.5 },
  { id:872, ad:"Gullac", marka:"",kal:185, pro:5, karb:32, yag:5, lif:0.5, sod:95, demir:0.3, kals:150, vitC:0.5, vitD:0.2, vitB12:0.4, acik:30, por:150, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:2.5 },
  { id:873, ad:"Kalburabasti", marka:"",kal:420, pro:5, karb:60, yag:20, lif:2, sod:150, demir:1.5, kals:30, vitC:0, vitD:0, vitB12:0, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:874, ad:"Sekerpare", marka:"",kal:380, pro:4.5, karb:60, yag:15, lif:1, sod:100, demir:1.2, kals:25, vitC:0, vitD:0, vitB12:0, acik:10, por:80, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:875, ad:"Revani", marka:"",kal:355, pro:5, karb:58, yag:12, lif:1, sod:80, demir:1.0, kals:20, vitC:0, vitD:0.1, vitB12:0.1, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:876, ad:"Ekmek Kadayifi", marka:"",kal:340, pro:6, karb:54, yag:12, lif:1, sod:220, demir:0.8, kals:100, vitC:0, vitD:0.2, vitB12:0.2, acik:12, por:150, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:877, ad:"Tahin Kurabiyesi", marka:"",kal:470, pro:9, karb:55, yag:25, lif:3, sod:120, demir:3.0, kals:130, vitC:0, vitD:0, vitB12:0, acik:15, por:100, aclik:"1 saat", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:878, ad:"Cevizli Rulo", marka:"",kal:430, pro:8, karb:52, yag:22, lif:3, sod:140, demir:1.8, kals:40, vitC:0.5, vitD:0, vitB12:0, acik:14, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:879, ad:"Sobiyet", marka:"",kal:510, pro:7, karb:56, yag:30, lif:2, sod:190, demir:1.2, kals:50, vitC:0, vitD:0, vitB12:0, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:880, ad:"Tepsi Boregi (Ispanakli)", marka:"",kal:240, pro:9, karb:26, yag:12, lif:2.5, sod:440, demir:2.0, kals:130, vitC:5, vitD:0.2, vitB12:0.2, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:3 },
  { id:881, ad:"Tike Adana Durum", marka:"Tike",kal:510, pro:30, karb:44, yag:24, lif:2.5, sod:920, demir:2.8, kals:45, vitC:2, vitD:0, vitB12:1.2, acik:55, por:220, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:2.5 },
  { id:882, ad:"Borsa Balik Ekmek", marka:"Borsa",kal:310, pro:20, karb:32, yag:10, lif:2, sod:580, demir:1.5, kals:45, vitC:1, vitD:3.0, vitB12:2.0, acik:50, por:160, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:3.5 },
  { id:883, ad:"Popeyes Chicken Sandwich", marka:"Popeyes",kal:700, pro:28, karb:69, yag:42, lif:3, sod:1440, demir:3.0, kals:80, vitC:0.5, vitD:0.1, vitB12:0.4, acik:40, por:270, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:0.5 },
  { id:884, ad:"Little Caesars Pepperoni", marka:"Little Caesars",kal:280, pro:13, karb:31, yag:12, lif:1.5, sod:680, demir:2.0, kals:160, vitC:1, vitD:0.2, vitB12:0.5, acik:35, por:107, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:1 },
  { id:885, ad:"Dominos Sucuklu Pizza Dilim", marka:"Dominos",kal:295, pro:13, karb:34, yag:12, lif:2, sod:720, demir:1.8, kals:120, vitC:0.5, vitD:0.2, vitB12:0.4, acik:35, por:110, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:1 },
  { id:886, ad:"Starbucks Egg Bites", marka:"Starbucks",kal:300, pro:19, karb:9, yag:22, lif:0, sod:730, demir:1.5, kals:150, vitC:0.5, vitD:1.2, vitB12:1.0, acik:60, por:110, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:887, ad:"Simit Sarayi Sigara Boregi", marka:"Simit Sarayi",kal:180, pro:6, karb:20, yag:9, lif:0.8, sod:310, demir:0.6, kals:90, vitC:0, vitD:0.1, vitB12:0.1, acik:28, por:80, aclik:"30-60 dk", onay:true, kat:"Tahil", yildiz:1.5 },
  { id:888, ad:"Simit Sarayi Klasik Simit", marka:"Simit Sarayi",kal:295, pro:9.5, karb:55, yag:5, lif:3.5, sod:420, demir:2.8, kals:35, vitC:0, vitD:0, vitB12:0, acik:40, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:3 },
  { id:889, ad:"Kebapci Pirzola (200g)", marka:"",kal:480, pro:40, karb:0, yag:36, lif:0, sod:95, demir:2.8, kals:18, vitC:0, vitD:0.1, vitB12:2.5, acik:88, por:200, aclik:"4-5 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:890, ad:"Ocakbasi Kofte (4 adet)", marka:"",kal:380, pro:28, karb:4, yag:28, lif:0.5, sod:640, demir:3.5, kals:25, vitC:0, vitD:0, vitB12:2.0, acik:82, por:160, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:891, ad:"Coca-Cola (1.5L)", marka:"Coca-Cola",kal:630, pro:0, karb:162, yag:0, lif:0, sod:64, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:1500, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:0 },
  { id:892, ad:"Pepsi (330ml)", marka:"Pepsi",kal:152, pro:0, karb:40, yag:0, lif:0, sod:25, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:330, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:0 },
  { id:893, ad:"Pepsi Max (330ml)", marka:"Pepsi",kal:1, pro:0, karb:0, yag:0, lif:0, sod:25, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:330, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:1 },
  { id:894, ad:"7UP (330ml)", marka:"7UP",kal:140, pro:0, karb:36, yag:0, lif:0, sod:40, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:330, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:0 },
  { id:895, ad:"Mountain Dew (330ml)", marka:"Mountain Dew",kal:170, pro:0, karb:46, yag:0, lif:0, sod:60, demir:0, kals:0, vitC:54, vitD:0, vitB12:0, acik:5, por:330, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:0 },
  { id:896, ad:"Burn Energy (500ml)", marka:"Burn",kal:225, pro:0, karb:55, yag:0, lif:0, sod:350, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:500, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:0 },
  { id:897, ad:"Tiger Energy (250ml)", marka:"Tiger",kal:113, pro:0.5, karb:27, yag:0, lif:0, sod:100, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:250, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:0 },
  { id:898, ad:"Prime Hydration", marka:"Prime",kal:25, pro:0, karb:6, yag:0, lif:0, sod:10, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:10, por:500, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:3 },
  { id:899, ad:"Powerade (500ml)", marka:"Powerade",kal:120, pro:0, karb:30, yag:0, lif:0, sod:150, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:8, por:500, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:1.5 },
  { id:900, ad:"Gatorade (500ml)", marka:"Gatorade",kal:130, pro:0, karb:34, yag:0, lif:0, sod:270, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:8, por:500, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:1.5 },
  { id:901, ad:"Fuze Tea Limon (330ml)", marka:"Fuze Tea",kal:75, pro:0, karb:19, yag:0, lif:0, sod:15, demir:0, kals:0, vitC:1.5, vitD:0, vitB12:0, acik:5, por:330, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:0.5 },
  { id:902, ad:"Cappy Karisik Meyve", marka:"Cappy",kal:90, pro:0.5, karb:22, yag:0.1, lif:0, sod:10, demir:0.1, kals:8, vitC:20, vitD:0, vitB12:0, acik:10, por:200, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:1.5 },
  { id:903, ad:"Minute Maid Portakal", marka:"Minute Maid",kal:110, pro:1, karb:27, yag:0, lif:0, sod:10, demir:0, kals:11, vitC:120, vitD:0, vitB12:0, acik:15, por:240, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:2.5 },
  { id:904, ad:"Pinar Icecat (200ml)", marka:"Pinar",kal:72, pro:3, karb:10, yag:2, lif:0, sod:90, demir:0, kals:120, vitC:0, vitD:0.5, vitB12:0.5, acik:35, por:200, aclik:"30-60 dk", onay:true, kat:"Icecek", yildiz:3.5 },
  { id:905, ad:"Ikitelli Soda", marka:"Ikitelli",kal:0, pro:0, karb:0, yag:0, lif:0, sod:158, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:200, aclik:"—", onay:true, kat:"Icecek", yildiz:3 },
  { id:906, ad:"Frosted Flakes", marka:"Kelloggs",kal:380, pro:5, karb:90, yag:0.5, lif:1, sod:520, demir:8, kals:1, vitC:15, vitD:4.5, vitB12:1.5, acik:25, por:100, aclik:"30 dk", onay:true, kat:"Tahil", yildiz:1.5 },
  { id:907, ad:"Honey Smacks", marka:"Kelloggs",kal:395, pro:8, karb:90, yag:1.5, lif:2, sod:130, demir:9, kals:5, vitC:15, vitD:3.5, vitB12:1.5, acik:25, por:100, aclik:"30 dk", onay:true, kat:"Tahil", yildiz:1.5 },
  { id:908, ad:"Cheerios (Orijinal)", marka:"General Mills",kal:375, pro:13, karb:68, yag:6.5, lif:10, sod:540, demir:25, kals:350, vitC:10, vitD:10, vitB12:25, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:4 },
  { id:909, ad:"Honey Nut Cheerios", marka:"General Mills",kal:375, pro:8, karb:74, yag:5, lif:5, sod:410, demir:25, kals:130, vitC:10, vitD:10, vitB12:25, acik:38, por:100, aclik:"30-60 dk", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:910, ad:"Coco Pops", marka:"Kelloggs",kal:390, pro:5, karb:88, yag:2, lif:2, sod:500, demir:7, kals:2, vitC:15, vitD:4.5, vitB12:1.5, acik:22, por:100, aclik:"30 dk", onay:true, kat:"Tahil", yildiz:1 },
  { id:911, ad:"Lucky Charms", marka:"General Mills",kal:380, pro:8, karb:80, yag:5, lif:2.5, sod:380, demir:25, kals:130, vitC:10, vitD:10, vitB12:25, acik:25, por:100, aclik:"30 dk", onay:true, kat:"Tahil", yildiz:1.5 },
  { id:912, ad:"Quaker Oat Granola", marka:"Quaker",kal:450, pro:11, karb:62, yag:18, lif:6, sod:200, demir:3.5, kals:45, vitC:0, vitD:0, vitB12:0, acik:52, por:100, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:3.5 },
  { id:913, ad:"Bircher Muesli", marka:"",kal:310, pro:9, karb:52, yag:7.5, lif:5.5, sod:85, demir:2.5, kals:180, vitC:2, vitD:0.2, vitB12:0.3, acik:58, por:200, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:4 },
  { id:914, ad:"Yulaf Sutlu Kaynatilmis", marka:"",kal:115, pro:4.5, karb:18, yag:2.8, lif:2, sod:55, demir:1.0, kals:130, vitC:0, vitD:0.5, vitB12:0.3, acik:52, por:250, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:4.5 },
  { id:915, ad:"Tam Bugday Muesli", marka:"Dr. Oetker",kal:360, pro:10, karb:64, yag:7, lif:9, sod:40, demir:3.5, kals:60, vitC:0, vitD:0, vitB12:0, acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:4.5 },
  { id:916, ad:"Kabak Cicegi Tohumu", marka:"",kal:559, pro:30, karb:10, yag:49, lif:6, sod:7, demir:8.8, kals:46, vitC:1.9, vitD:0, vitB12:0, acik:65, por:100, aclik:"2-3 saat", onay:true, kat:"Atistirmalik", yildiz:5 },
  { id:917, ad:"Ayi Cigneme Gurme Antep", marka:"Kuruyemisci",kal:585, pro:21, karb:19, yag:51, lif:7, sod:300, demir:2.5, kals:60, vitC:3, vitD:0, vitB12:0, acik:65, por:100, aclik:"2-3 saat", onay:true, kat:"Atistirmalik", yildiz:3.5 },
  { id:918, ad:"Cin Fistig (Tuzlu)", marka:"Tadim",kal:567, pro:26, karb:16, yag:49, lif:8.5, sod:320, demir:3.9, kals:105, vitC:5.6, vitD:0, vitB12:0, acik:65, por:100, aclik:"2-3 saat", onay:true, kat:"Atistirmalik", yildiz:3 },
  { id:919, ad:"Brezilya Fistigi", marka:"",kal:656, pro:14, karb:12, yag:66, lif:7.5, sod:3, demir:2.4, kals:160, vitC:0.7, vitD:0, vitB12:0, acik:60, por:100, aclik:"2-3 saat", onay:true, kat:"Atistirmalik", yildiz:4 },
  { id:920, ad:"Cekirdek (Aycicegi Tuzlu)", marka:"",kal:588, pro:21, karb:20, yag:52, lif:8.6, sod:540, demir:5.2, kals:78, vitC:1.4, vitD:0, vitB12:0, acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Atistirmalik", yildiz:3 },
  { id:921, ad:"Cekirdek (Aycicegi Sade)", marka:"",kal:570, pro:21, karb:20, yag:51, lif:8.6, sod:9, demir:5.2, kals:78, vitC:1.4, vitD:0, vitB12:0, acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Atistirmalik", yildiz:4.5 },
  { id:922, ad:"Keten Tohumu (Ogutulmus)", marka:"",kal:534, pro:18, karb:29, yag:42, lif:27, sod:6, demir:5.7, kals:255, vitC:0.6, vitD:0, vitB12:0, acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Diger", yildiz:5 },
  { id:923, ad:"Chia Tohumu", marka:"",kal:486, pro:17, karb:42, yag:31, lif:34, sod:16, demir:7.7, kals:631, vitC:1.6, vitD:0, vitB12:0, acik:60, por:100, aclik:"2-3 saat", onay:true, kat:"Diger", yildiz:5 },
  { id:924, ad:"Kino Tohumu", marka:"",kal:368, pro:14, karb:64, yag:6, lif:7, sod:5, demir:4.6, kals:47, vitC:0, vitD:0, vitB12:0, acik:55, por:100, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:5 },
  { id:925, ad:"Susam (Siyah)", marka:"",kal:573, pro:18, karb:23, yag:50, lif:11.6, sod:11, demir:14.6, kals:975, vitC:0.4, vitD:0, vitB12:0, acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Diger", yildiz:5 },
  { id:926, ad:"Simit + Ayran", marka:"",kal:355, pro:13, karb:58, yag:6, lif:3, sod:710, demir:2.5, kals:150, vitC:0, vitD:0.1, vitB12:0.3, acik:48, por:280, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:3 },
  { id:927, ad:"Pogaca + Cay", marka:"",kal:330, pro:7.5, karb:45, yag:13.5, lif:2, sod:490, demir:1.8, kals:45, vitC:0, vitD:0, vitB12:0, acik:28, por:120, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:1.5 },
  { id:928, ad:"Karisik Tabak (Okul)", marka:"",kal:580, pro:25, karb:65, yag:22, lif:4, sod:850, demir:3.0, kals:80, vitC:5, vitD:0.2, vitB12:0.8, acik:65, por:300, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:2.5 },
  { id:929, ad:"Calippo Portakal", marka:"Algida",kal:75, pro:0.5, karb:18, yag:0.1, lif:0, sod:10, demir:0.1, kals:5, vitC:3, vitD:0, vitB12:0, acik:8, por:75, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:930, ad:"Twister (Meyveli)", marka:"Algida",kal:85, pro:0.5, karb:19, yag:1.5, lif:0, sod:15, demir:0.1, kals:5, vitC:1.5, vitD:0, vitB12:0, acik:8, por:85, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:931, ad:"Cornetto Classico", marka:"Algida",kal:255, pro:3.5, karb:32, yag:13, lif:0.5, sod:75, demir:0.3, kals:80, vitC:0.5, vitD:0.2, vitB12:0.2, acik:10, por:90, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:932, ad:"Bounty Dondurma", marka:"Mars",kal:275, pro:3, karb:30, yag:16, lif:1, sod:80, demir:0.8, kals:60, vitC:0, vitD:0, vitB12:0, acik:8, por:55, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:933, ad:"Haagen-Dazs Cikolata", marka:"Haagen-Dazs",kal:285, pro:5, karb:27, yag:17, lif:1, sod:60, demir:1.5, kals:130, vitC:0.5, vitD:0.3, vitB12:0.3, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:934, ad:"Haagen-Dazs Vanilya", marka:"Haagen-Dazs",kal:265, pro:4.5, karb:26, yag:16, lif:0, sod:60, demir:0.1, kals:120, vitC:0.5, vitD:0.4, vitB12:0.3, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:935, ad:"Lotus Biskuvi", marka:"Lotus",kal:497, pro:5.6, karb:70, yag:21, lif:1.8, sod:230, demir:2.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:936, ad:"Digestive Biskuvi (McVities)", marka:"McVities",kal:476, pro:8.2, karb:64, yag:20, lif:3.5, sod:490, demir:2.0, kals:55, vitC:0, vitD:0, vitB12:0, acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:937, ad:"After Eight", marka:"Nestle",kal:369, pro:2.5, karb:72, yag:8, lif:1, sod:60, demir:2.5, kals:10, vitC:0, vitD:0, vitB12:0, acik:8, por:100, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:938, ad:"Raffaello (3 adet)", marka:"Ferrero",kal:210, pro:2.5, karb:19, yag:14, lif:1, sod:35, demir:0.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:8, por:30, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:939, ad:"Kinder Bueno", marka:"Ferrero",kal:554, pro:9, karb:57, yag:32, lif:1.5, sod:120, demir:1.5, kals:80, vitC:0, vitD:0.2, vitB12:0.2, acik:12, por:43, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:940, ad:"Kinder Maxi", marka:"Ferrero",kal:558, pro:9, karb:56, yag:33, lif:0.5, sod:120, demir:0.8, kals:180, vitC:0, vitD:0.3, vitB12:0.3, acik:12, por:21, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:941, ad:"Godiva Cilekli Pralin", marka:"Godiva",kal:540, pro:5, karb:58, yag:32, lif:1.5, sod:50, demir:1.5, kals:60, vitC:0, vitD:0, vitB12:0, acik:10, por:100, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:942, ad:"Dolfin 85 Kakao Cikolata", marka:"Dolfin",kal:620, pro:10, karb:32, yag:52, lif:12, sod:10, demir:10, kals:55, vitC:0.5, vitD:0, vitB12:0, acik:28, por:100, aclik:"1-2 saat", onay:true, kat:"Atistirmalik", yildiz:4 },
  { id:943, ad:"Labneh (Yoğurt Peyniri)", marka:"",kal:195, pro:8.5, karb:3.5, yag:16, lif:0, sod:85, demir:0.1, kals:130, vitC:0, vitD:0.1, vitB12:0.3, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:3 },
  { id:944, ad:"Suttas Dondurulmus Yoğurt", marka:"Suttas",kal:90, pro:4, karb:15, yag:2, lif:0, sod:65, demir:0.1, kals:130, vitC:0, vitD:0.2, vitB12:0.3, acik:38, por:100, aclik:"30-60 dk", onay:true, kat:"Sut Urunu", yildiz:3.5 },
  { id:945, ad:"Clotted Cream", marka:"",kal:586, pro:2, karb:2.5, yag:63, lif:0, sod:35, demir:0, kals:65, vitC:0, vitD:0.3, vitB12:0.1, acik:8, por:30, aclik:"30 dk", onay:true, kat:"Sut Urunu", yildiz:0.5 },
  { id:946, ad:"Yoğurt (Tam Yagli Ev)", marka:"",kal:62, pro:3.5, karb:4.8, yag:3.2, lif:0, sod:46, demir:0, kals:121, vitC:0.5, vitD:0.1, vitB12:0.4, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Sut Urunu", yildiz:4.5 },
  { id:947, ad:"Bebek Peyniri (Minik Peynir)", marka:"Mini Babybel",kal:305, pro:23, karb:0, yag:24, lif:0, sod:800, demir:0, kals:750, vitC:0, vitD:0.5, vitB12:1.0, acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:3 },
  { id:948, ad:"Mozarella (Taze)", marka:"",kal:280, pro:17, karb:3.1, yag:22, lif:0, sod:370, demir:0.3, kals:505, vitC:0, vitD:0.3, vitB12:0.7, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:3.5 },
  { id:949, ad:"Parmesan (Rendelenmis)", marka:"",kal:431, pro:38, karb:4.1, yag:29, lif:0, sod:1529, demir:0.9, kals:1184, vitC:0, vitD:0.4, vitB12:1.2, acik:50, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:2 },
  { id:950, ad:"Edam Peyniri", marka:"",kal:357, pro:25, karb:1.4, yag:28, lif:0, sod:965, demir:0.4, kals:731, vitC:0, vitD:0.5, vitB12:1.5, acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:2.5 },
  { id:951, ad:"Levrek (Izgara)", marka:"",kal:97, pro:19, karb:0, yag:2.2, lif:0, sod:63, demir:0.3, kals:12, vitC:0, vitD:5.5, vitB12:3.8, acik:80, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:952, ad:"Barbun (Tawa)", marka:"",kal:117, pro:20, karb:0, yag:3.8, lif:0, sod:65, demir:1.0, kals:50, vitC:0.5, vitD:4.5, vitB12:3.5, acik:78, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:953, ad:"Hamsi Tavas", marka:"",kal:195, pro:18, karb:8, yag:10, lif:0.5, sod:280, demir:1.5, kals:40, vitC:0, vitD:4.2, vitB12:4.5, acik:72, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:954, ad:"Hamsi Buglama", marka:"",kal:145, pro:22, karb:0.5, yag:6, lif:0, sod:68, demir:1.0, kals:45, vitC:0, vitD:5.5, vitB12:5.5, acik:80, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:955, ad:"Lufler (Izgara)", marka:"",kal:188, pro:20, karb:0, yag:12, lif:0, sod:71, demir:0.8, kals:15, vitC:0, vitD:6.8, vitB12:3.5, acik:78, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:956, ad:"Hamsili Pilav", marka:"",kal:280, pro:16, karb:38, yag:7, lif:1.5, sod:380, demir:1.8, kals:40, vitC:0, vitD:2.5, vitB12:2.8, acik:68, por:250, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:4 },
  { id:957, ad:"Enginar (Taze)", marka:"",kal:47, pro:3.3, karb:11, yag:0.2, lif:5.4, sod:94, demir:1.3, kals:44, vitC:11.7, vitD:0, vitB12:0, acik:62, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:958, ad:"Asparajus (Buharda)", marka:"",kal:22, pro:2.2, karb:4.1, yag:0.2, lif:2.1, sod:14, demir:2.1, kals:24, vitC:5.6, vitD:0, vitB12:0, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:959, ad:"Bezelye Filizi", marka:"",kal:38, pro:3.8, karb:7, yag:0.2, lif:1.8, sod:8, demir:1.0, kals:36, vitC:13, vitD:0, vitB12:0, acik:40, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:960, ad:"Kuzu Kulagi (Ev)", marka:"",kal:22, pro:2, karb:3.2, yag:0.7, lif:0.9, sod:4, demir:2.4, kals:44, vitC:48, vitD:0, vitB12:0, acik:40, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:961, ad:"Tere (Acı)", marka:"",kal:32, pro:2.6, karb:5.5, yag:0.7, lif:1.1, sod:14, demir:1.3, kals:81, vitC:69, vitD:0, vitB12:0, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:962, ad:"Enginar Kalbi (Konserve)", marka:"",kal:53, pro:2.9, karb:11, yag:0.3, lif:4.4, sod:240, demir:0.6, kals:18, vitC:6, vitD:0, vitB12:0, acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4 },
  { id:963, ad:"Sun-Dried Tomato", marka:"",kal:258, pro:14, karb:55, yag:3, lif:12, sod:2095, demir:9.1, kals:110, vitC:39, vitD:0, vitB12:0, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:964, ad:"Patlican (Firinda)", marka:"",kal:33, pro:0.8, karb:8.7, yag:0.2, lif:2.5, sod:2, demir:0.2, kals:9, vitC:1.3, vitD:0, vitB12:0, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:965, ad:"Kivi", marka:"",kal:61, pro:1.1, karb:15, yag:0.5, lif:3, sod:3, demir:0.3, kals:34, vitC:92.7, vitD:0, vitB12:0, acik:50, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:966, ad:"Hurma (Medjool)", marka:"",kal:277, pro:1.8, karb:75, yag:0.2, lif:6.7, sod:1, demir:0.9, kals:64, vitC:0, vitD:0, vitB12:0, acik:28, por:100, aclik:"1 saat", onay:true, kat:"Meyve", yildiz:3 },
  { id:967, ad:"Coruk Elmasi", marka:"",kal:52, pro:0.3, karb:14, yag:0.2, lif:2.4, sod:1, demir:0.1, kals:6, vitC:4.6, vitD:0, vitB12:0, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:968, ad:"Avokado (Yarım)", marka:"",kal:160, pro:2, karb:9, yag:15, lif:7, sod:7, demir:0.6, kals:12, vitC:10, vitD:0, vitB12:0, acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:5 },
  { id:969, ad:"Muz (Olgun)", marka:"",kal:89, pro:1.1, karb:23, yag:0.3, lif:2.6, sod:1, demir:0.3, kals:5, vitC:8.7, vitD:0, vitB12:0, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:4 },
  { id:970, ad:"Kuru Kaysisi (Organik)", marka:"",kal:241, pro:3.4, karb:63, yag:0.5, lif:7.3, sod:10, demir:2.7, kals:55, vitC:1, vitD:0, vitB12:0, acik:28, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:3.5 },
  { id:971, ad:"Acai Kaseleri (Dondurulmus)", marka:"Sambazon",kal:70, pro:1.5, karb:6, yag:5, lif:2, sod:10, demir:0.8, kals:20, vitC:9, vitD:0, vitB12:0, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:972, ad:"Sea Buckthorn (Deniz Igdesi)", marka:"",kal:82, pro:1.2, karb:18, yag:1.6, lif:3.6, sod:0, demir:0.5, kals:12, vitC:695, vitD:0, vitB12:0, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:973, ad:"Kakaolu Kinoa Kasesi", marka:"",kal:280, pro:10, karb:45, yag:8, lif:5, sod:95, demir:3.5, kals:50, vitC:1, vitD:0, vitB12:0, acik:58, por:200, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:5 },
  { id:974, ad:"Protein Smoothie (Cilek)", marka:"",kal:285, pro:28, karb:32, yag:5, lif:3, sod:180, demir:1.5, kals:200, vitC:18, vitD:0.5, vitB12:0.8, acik:65, por:350, aclik:"2-3 saat", onay:true, kat:"Icecek", yildiz:5 },
  { id:975, ad:"Turmeric Latte", marka:"",kal:85, pro:3.5, karb:10, yag:4, lif:0.5, sod:85, demir:0.5, kals:140, vitC:0.5, vitD:0.5, vitB12:0.3, acik:38, por:240, aclik:"30-60 dk", onay:true, kat:"Icecek", yildiz:5 },
  { id:976, ad:"Pirinc Lapasi", marka:"",kal:70, pro:1.5, karb:15, yag:0.5, lif:0.5, sod:30, demir:0.5, kals:20, vitC:0, vitD:0.2, vitB12:0, acik:22, por:100, aclik:"30-60 dk", onay:true, kat:"Tahil", yildiz:2 },
  { id:977, ad:"Sebzeli Tavuk Lapasi", marka:"",kal:85, pro:6, karb:12, yag:1.5, lif:1.5, sod:75, demir:0.8, kals:25, vitC:5, vitD:0.1, vitB12:0.2, acik:42, por:150, aclik:"30-60 dk", onay:true, kat:"Hazir Yemek", yildiz:4.5 },
  { id:978, ad:"Ketojenik Bombe Kahve", marka:"",kal:230, pro:0.5, karb:0.5, yag:26, lif:0, sod:8, demir:0, kals:5, vitC:0, vitD:0, vitB12:0, acik:45, por:300, aclik:"2-3 saat", onay:true, kat:"Icecek", yildiz:2 },
  { id:979, ad:"Protein Shake (Su ile)", marka:"Optimum",kal:120, pro:24, karb:3, yag:1, lif:0.5, sod:150, demir:0.5, kals:130, vitC:0, vitD:0, vitB12:0.5, acik:65, por:300, aclik:"2-3 saat", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:980, ad:"Protein Shake (Sutlu)", marka:"Optimum",kal:275, pro:30, karb:15, yag:8, lif:1, sod:200, demir:0.5, kals:280, vitC:0, vitD:0.8, vitB12:1.0, acik:70, por:400, aclik:"2-3 saat", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:981, ad:"Kind Protein Bar Badem", marka:"Kind",kal:250, pro:12, karb:26, yag:12, lif:4, sod:230, demir:1.5, kals:30, vitC:0, vitD:0, vitB12:0, acik:55, por:60, aclik:"2-3 saat", onay:true, kat:"Atistirmalik", yildiz:4 },
  { id:982, ad:"RX Bar Cikolata Deniz Tuzu", marka:"RXBAR",kal:210, pro:12, karb:24, yag:9, lif:5, sod:250, demir:1.5, kals:30, vitC:0, vitD:0, vitB12:0.4, acik:55, por:52, aclik:"2-3 saat", onay:true, kat:"Atistirmalik", yildiz:4 },
  { id:983, ad:"Clif Bar (Cikolata)", marka:"Clif",kal:260, pro:10, karb:45, yag:6, lif:5, sod:200, demir:2.5, kals:300, vitC:0, vitD:0, vitB12:0, acik:55, por:68, aclik:"2-3 saat", onay:true, kat:"Atistirmalik", yildiz:3.5 },
  { id:984, ad:"Larabar (Hurma-Badem)", marka:"Larabar",kal:230, pro:6, karb:29, yag:11, lif:5, sod:5, demir:1.5, kals:40, vitC:0, vitD:0, vitB12:0, acik:52, por:48, aclik:"2-3 saat", onay:true, kat:"Atistirmalik", yildiz:4 },
  { id:985, ad:"Grenade Protein Bar Karamel", marka:"Grenade",kal:215, pro:20, karb:22, yag:8, lif:7, sod:355, demir:2.5, kals:100, vitC:0, vitD:0, vitB12:0.5, acik:58, por:60, aclik:"2-3 saat", onay:true, kat:"Atistirmalik", yildiz:4 },
  { id:986, ad:"Croissant (Tereyagli)", marka:"",kal:406, pro:8, karb:46, yag:21, lif:1.5, sod:375, demir:1.8, kals:25, vitC:0, vitD:0.2, vitB12:0.2, acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Tahil", yildiz:1 },
  { id:987, ad:"Bagel (Sade)", marka:"",kal:245, pro:10, karb:48, yag:1.5, lif:2, sod:440, demir:2.5, kals:15, vitC:0, vitD:0, vitB12:0, acik:38, por:98, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:988, ad:"Pretzel (Kalin)", marka:"",kal:380, pro:9, karb:79, yag:3, lif:3, sod:1710, demir:2.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:28, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:989, ad:"Tortilla (Tam Bugday)", marka:"Mission",kal:218, pro:6, karb:38, yag:5.5, lif:3.5, sod:460, demir:2.0, kals:100, vitC:0, vitD:0, vitB12:0, acik:38, por:66, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:3 },
  { id:990, ad:"Focaccia Ekmegi", marka:"",kal:295, pro:7.5, karb:45, yag:10, lif:2, sod:480, demir:2.0, kals:30, vitC:0, vitD:0, vitB12:0, acik:32, por:80, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:991, ad:"Naan Ekmegi (Tereyagli)", marka:"",kal:310, pro:9, karb:54, yag:8, lif:2, sod:480, demir:2.5, kals:45, vitC:0, vitD:0, vitB12:0, acik:38, por:110, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:992, ad:"Injera (Etiyopya Ekmegi)", marka:"",kal:145, pro:5, karb:28, yag:1, lif:4, sod:240, demir:3.5, kals:60, vitC:0, vitD:0, vitB12:0, acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:4 },
  { id:993, ad:"Corn Tortilla Chip", marka:"",kal:490, pro:8, karb:67, yag:23, lif:5, sod:520, demir:1.5, kals:35, vitC:0, vitD:0, vitB12:0, acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:994, ad:"Takoyaki (3 adet)", marka:"",kal:175, pro:7, karb:22, yag:7, lif:1, sod:560, demir:0.8, kals:35, vitC:0.5, vitD:0, vitB12:0.3, acik:35, por:90, aclik:"30-60 dk", onay:true, kat:"Hazir Yemek", yildiz:2.5 },
  { id:995, ad:"Momo (Tibetli Mantisi)", marka:"",kal:250, pro:12, karb:32, yag:8, lif:1.5, sod:620, demir:1.5, kals:40, vitC:1, vitD:0, vitB12:0.4, acik:42, por:120, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:2.5 },
  { id:996, ad:"Intermittent Fasting Cayı", marka:"",kal:2, pro:0, karb:0.5, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:250, aclik:"—", onay:true, kat:"Icecek", yildiz:5 },
  { id:997, ad:"Detox Suyu (Limon-Nane-Zencefil)", marka:"",kal:15, pro:0.2, karb:3.5, yag:0.1, lif:0.3, sod:2, demir:0.1, kals:8, vitC:8, vitD:0, vitB12:0, acik:10, por:300, aclik:"—", onay:true, kat:"Icecek", yildiz:5 },
  { id:998, ad:"Sicak Su + Limon (Sabah)", marka:"",kal:5, pro:0.1, karb:1.5, yag:0, lif:0.1, sod:0, demir:0, kals:2, vitC:9, vitD:0, vitB12:0, acik:5, por:250, aclik:"—", onay:true, kat:"Icecek", yildiz:5 },
  { id:999, ad:"Apple Cider Vinegar Sulandirmis", marka:"Bragg",kal:3, pro:0, karb:0.7, yag:0, lif:0, sod:5, demir:0.1, kals:2, vitC:0, vitD:0, vitB12:0, acik:5, por:250, aclik:"—", onay:true, kat:"Icecek", yildiz:4 },
  { id:1000, ad:"Doya Saglikli Tabak", marka:"Doya",kal:480, pro:35, karb:45, yag:18, lif:10, sod:420, demir:4.5, kals:180, vitC:35, vitD:1.0, vitB12:1.5, acik:85, por:300, aclik:"3-4 saat", onay:true, kat:"Hazir Yemek", yildiz:5 },
  { id:1001, ad:"Hunkar Begendi", marka:"",kal:310, pro:20, karb:15, yag:19, lif:2.5, sod:580, demir:2.5, kals:80, vitC:4, vitD:0.1, vitB12:0.9, acik:68, por:200, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:3 },
  { id:1002, ad:"Terbiyeli Kofte", marka:"",kal:195, pro:16, karb:8, yag:11, lif:0.8, sod:420, demir:2.2, kals:45, vitC:1, vitD:0.5, vitB12:0.8, acik:68, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:1003, ad:"Sehriyeli Kofte Corbasi", marka:"",kal:110, pro:8, karb:12, yag:4, lif:1, sod:480, demir:1.5, kals:30, vitC:0, vitD:0.2, vitB12:0.4, acik:60, por:200, aclik:"1-2 saat", onay:true, kat:"Corba", yildiz:4 },
  { id:1004, ad:"Eksi Corbasi", marka:"",kal:85, pro:5, karb:11, yag:3, lif:1, sod:380, demir:0.8, kals:50, vitC:0, vitD:0.1, vitB12:0.2, acik:48, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:3.5 },
  { id:1005, ad:"Yoğurt Corbasi", marka:"",kal:90, pro:4.5, karb:10, yag:4, lif:0.5, sod:350, demir:0.3, kals:120, vitC:0, vitD:0.1, vitB12:0.3, acik:42, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:3.5 },
  { id:1006, ad:"Yayla Corbasi", marka:"",kal:95, pro:5, karb:11, yag:4.5, lif:0.5, sod:360, demir:0.4, kals:130, vitC:0, vitD:0.1, vitB12:0.3, acik:45, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:3.5 },
  { id:1007, ad:"Paça Corbasi", marka:"",kal:78, pro:9, karb:2, yag:4, lif:0, sod:750, demir:1.0, kals:30, vitC:0, vitD:0, vitB12:0.5, acik:52, por:200, aclik:"1-2 saat", onay:true, kat:"Corba", yildiz:2 },
  { id:1008, ad:"Etli Lahana Sarmasi", marka:"",kal:215, pro:15, karb:16, yag:10, lif:2, sod:520, demir:2.0, kals:50, vitC:18, vitD:0, vitB12:0.8, acik:68, por:200, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:4 },
  { id:1009, ad:"Zeytinyagli Asma Yaprak", marka:"",kal:140, pro:2.5, karb:20, yag:6.5, lif:3, sod:380, demir:1.2, kals:28, vitC:2, vitD:0, vitB12:0, acik:40, por:100, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:3.5 },
  { id:1010, ad:"Firinda Kofte (Soslu)", marka:"",kal:285, pro:22, karb:12, yag:17, lif:1.5, sod:580, demir:3.0, kals:55, vitC:8, vitD:0, vitB12:1.2, acik:72, por:200, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:3.5 },
  { id:1011, ad:"Sebzeli Guvec", marka:"",kal:135, pro:5, karb:18, yag:6, lif:4.5, sod:340, demir:1.5, kals:50, vitC:25, vitD:0, vitB12:0, acik:62, por:250, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:1012, ad:"Etli Guvec", marka:"",kal:225, pro:18, karb:14, yag:12, lif:3, sod:460, demir:2.8, kals:45, vitC:20, vitD:0, vitB12:1.0, acik:72, por:250, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:4 },
  { id:1013, ad:"Kasarli Kofte", marka:"",kal:355, pro:26, karb:8, yag:25, lif:0.8, sod:680, demir:3.0, kals:180, vitC:0, vitD:0.3, vitB12:1.5, acik:72, por:180, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:1014, ad:"Cavuş Unu Ekmegi", marka:"",kal:225, pro:7, karb:44, yag:1.5, lif:6, sod:380, demir:2.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:48, por:70, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:4 },
  { id:1015, ad:"Misir Ekmegi (Karadeniz)", marka:"",kal:230, pro:5, karb:46, yag:3, lif:2.5, sod:290, demir:1.5, kals:8, vitC:0, vitD:0, vitB12:0, acik:35, por:80, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:1016, ad:"Peksimed (Kuru Ekmek)", marka:"",kal:390, pro:11, karb:78, yag:4, lif:5, sod:580, demir:3.0, kals:30, vitC:0, vitD:0, vitB12:0, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:3 },
  { id:1017, ad:"Haribo Goldbaren", marka:"Haribo",kal:343, pro:6.5, karb:77, yag:0.5, lif:0, sod:30, demir:0.2, kals:4, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:0 },
  { id:1018, ad:"Skittles", marka:"Mars",kal:404, pro:0, karb:90, yag:4.5, lif:0, sod:20, demir:0.2, kals:0, vitC:40, vitD:0, vitB12:0, acik:5, por:100, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:0 },
  { id:1019, ad:"Starburst", marka:"Wrigley",kal:400, pro:0, karb:88, yag:6, lif:0, sod:30, demir:0.1, kals:0, vitC:12, vitD:0, vitB12:0, acik:5, por:100, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:0 },
  { id:1020, ad:"Trolli Solucan Sekeri", marka:"Trolli",kal:340, pro:7, karb:76, yag:0.5, lif:0, sod:35, demir:0.2, kals:4, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:0 },
  { id:1021, ad:"Ülker Biskuvi Cizi", marka:"Ulker",kal:480, pro:8, karb:65, yag:22, lif:1.5, sod:440, demir:2.0, kals:30, vitC:0, vitD:0, vitB12:0, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1022, ad:"Eti Cin Biskuvi", marka:"Eti",kal:460, pro:7, karb:68, yag:19, lif:2, sod:380, demir:1.8, kals:20, vitC:0, vitD:0, vitB12:0, acik:14, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1023, ad:"Ülker Meşhur Çikolatalı Gofret", marka:"Ulker",kal:530, pro:6, karb:62, yag:28, lif:1.5, sod:110, demir:1.5, kals:55, vitC:0, vitD:0, vitB12:0.1, acik:15, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1024, ad:"Eti Tender Cikolata", marka:"Eti",kal:510, pro:6.5, karb:60, yag:27, lif:2, sod:95, demir:2.0, kals:60, vitC:0, vitD:0, vitB12:0, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1025, ad:"Ülker Dankek", marka:"Ulker",kal:370, pro:5.5, karb:56, yag:15, lif:1.5, sod:180, demir:1.5, kals:50, vitC:0, vitD:0, vitB12:0, acik:12, por:50, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1026, ad:"Eti Kremali Rulo", marka:"Eti",kal:460, pro:5.5, karb:63, yag:21, lif:1.5, sod:210, demir:1.5, kals:35, vitC:0, vitD:0, vitB12:0, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1027, ad:"Pınar Tereyagi (10g)", marka:"Pinar",kal:74, pro:0.1, karb:0.1, yag:8.3, lif:0, sod:64, demir:0, kals:2, vitC:0, vitD:0.1, vitB12:0, acik:5, por:10, aclik:"—", onay:true, kat:"Diger", yildiz:0.5 },
  { id:1028, ad:"Sütaş Kaymak (20g)", marka:"Sutas",kal:68, pro:0.5, karb:0.5, yag:7, lif:0, sod:8, demir:0, kals:18, vitC:0, vitD:0.1, vitB12:0, acik:8, por:20, aclik:"—", onay:true, kat:"Sut Urunu", yildiz:1 },
  { id:1029, ad:"Pınar Light Labne", marka:"Pinar",kal:115, pro:7, karb:4, yag:8, lif:0, sod:75, demir:0.1, kals:100, vitC:0, vitD:0.1, vitB12:0.2, acik:40, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:3.5 },
  { id:1030, ad:"Sütaş Sutumsuz Fındık Kreması", marka:"Sutas",kal:490, pro:8, karb:56, yag:27, lif:3, sod:80, demir:2.0, kals:100, vitC:0, vitD:0, vitB12:0, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Diger", yildiz:1 },
  { id:1031, ad:"Çiğ Köfte Wrap (Küçük)", marka:"Antalya Ocakbasi",kal:220, pro:6, karb:38, yag:6.5, lif:5, sod:480, demir:2.5, kals:30, vitC:3, vitD:0, vitB12:0, acik:45, por:120, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:3 },
  { id:1032, ad:"Kokorec (Yari Ekmek)", marka:"",kal:480, pro:22, karb:38, yag:28, lif:2.5, sod:920, demir:3.5, kals:30, vitC:0, vitD:0, vitB12:2.0, acik:52, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:1 },
  { id:1033, ad:"Misir (Soguk, Bardak)", marka:"",kal:130, pro:4, karb:27, yag:1.5, lif:3, sod:10, demir:0.5, kals:4, vitC:6, vitD:0, vitB12:0, acik:42, por:200, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:3 },
  { id:1034, ad:"Kestane (Kavrulmus)", marka:"",kal:245, pro:3.2, karb:53, yag:2.2, lif:5.1, sod:3, demir:1.7, kals:29, vitC:40, vitD:0, vitB12:0, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4.5 },
  { id:1035, ad:"Kirmizibiber Dolmasi", marka:"",kal:75, pro:2, karb:12, yag:3, lif:2.5, sod:180, demir:0.8, kals:15, vitC:55, vitD:0, vitB12:0, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:1036, ad:"Kizarmis Peynir (Hellim)", marka:"",kal:280, pro:17, karb:2.5, yag:22, lif:0, sod:1080, demir:0.3, kals:560, vitC:0, vitD:0.2, vitB12:0.4, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:2 },
  { id:1037, ad:"Firinda Mantar (Dolmali)", marka:"",kal:95, pro:4, karb:8, yag:5.5, lif:2.5, sod:280, demir:0.8, kals:20, vitC:2, vitD:0.2, vitB12:0, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:1038, ad:"Domates Corbasi (Kremali)", marka:"",kal:120, pro:2.5, karb:14, yag:6.5, lif:2, sod:420, demir:0.8, kals:30, vitC:12, vitD:0, vitB12:0, acik:42, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:3.5 },
  { id:1039, ad:"Tarator (Cevizli Sarimsakli)", marka:"",kal:155, pro:4, karb:6, yag:14, lif:1.5, sod:180, demir:0.8, kals:50, vitC:1, vitD:0, vitB12:0, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Diger", yildiz:3.5 },
  { id:1040, ad:"Haydari", marka:"",kal:80, pro:4, karb:5, yag:5, lif:0.5, sod:210, demir:0.2, kals:90, vitC:1, vitD:0.1, vitB12:0.3, acik:48, por:100, aclik:"30-60 dk", onay:true, kat:"Sut Urunu", yildiz:4 },
  { id:1041, ad:"Hummus (Klasik)", marka:"",kal:177, pro:8, karb:20, yag:10, lif:6, sod:380, demir:2.4, kals:49, vitC:1, vitD:0, vitB12:0, acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Diger", yildiz:5 },
  { id:1042, ad:"Baba Ghanoush (Ev)", marka:"",kal:95, pro:2.5, karb:8.5, yag:6, lif:2, sod:95, demir:0.5, kals:28, vitC:1, vitD:0, vitB12:0, acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:1043, ad:"Shakshuka (2 Yumurta)", marka:"",kal:195, pro:15, karb:10, yag:12, lif:2.5, sod:620, demir:2.8, kals:60, vitC:22, vitD:1.5, vitB12:0.9, acik:65, por:200, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:5 },
  { id:1044, ad:"Poke Bowl (Somon)", marka:"",kal:420, pro:28, karb:48, yag:14, lif:4, sod:680, demir:1.5, kals:40, vitC:5, vitD:8, vitB12:3.5, acik:72, por:350, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:5 },
  { id:1045, ad:"Açık Sandviç (Avokado-Yumurta)", marka:"",kal:310, pro:16, karb:30, yag:17, lif:6, sod:420, demir:2.5, kals:55, vitC:8, vitD:1.2, vitB12:0.5, acik:62, por:180, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:4.5 },
  { id:1046, ad:"Açık Sandviç (Somon-Krem Peynir)", marka:"",kal:345, pro:22, karb:28, yag:16, lif:2, sod:680, demir:0.8, kals:80, vitC:0, vitD:8, vitB12:3.0, acik:62, por:160, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:4 },
  { id:1047, ad:"Sashimi (6 Dilim Somon)", marka:"",kal:180, pro:26, karb:0, yag:8, lif:0, sod:75, demir:0.4, kals:14, vitC:0, vitD:14, vitB12:4.0, acik:75, por:120, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1048, ad:"Tempura Karides", marka:"",kal:290, pro:14, karb:26, yag:16, lif:1, sod:490, demir:0.8, kals:60, vitC:0, vitD:0.1, vitB12:0.8, acik:45, por:150, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:2.5 },
  { id:1049, ad:"Banh Mi Sandvici", marka:"",kal:440, pro:20, karb:55, yag:16, lif:2.5, sod:780, demir:2.5, kals:40, vitC:3, vitD:0.1, vitB12:0.5, acik:52, por:220, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:2.5 },
  { id:1050, ad:"Bibimbap (Biftek)", marka:"",kal:380, pro:24, karb:52, yag:9, lif:3.5, sod:820, demir:3.0, kals:40, vitC:8, vitD:0, vitB12:1.5, acik:72, por:350, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:4 },
  { id:1051, ad:"Tavuk Gogus Salata Bowl", marka:"",kal:320, pro:35, karb:22, yag:10, lif:6, sod:480, demir:2.5, kals:80, vitC:25, vitD:0.1, vitB12:0.3, acik:75, por:300, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1052, ad:"Somon Pilaki", marka:"",kal:280, pro:25, karb:12, yag:15, lif:3, sod:420, demir:1.5, kals:45, vitC:8, vitD:9, vitB12:3.8, acik:75, por:200, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1053, ad:"Kinoa Tabbule", marka:"",kal:190, pro:7, karb:30, yag:6, lif:4.5, sod:280, demir:2.5, kals:40, vitC:18, vitD:0, vitB12:0, acik:60, por:200, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:5 },
  { id:1054, ad:"Tavuk Brokoli Bowl", marka:"",kal:290, pro:32, karb:20, yag:9, lif:5.5, sod:420, demir:2.0, kals:80, vitC:55, vitD:0.2, vitB12:0.3, acik:78, por:300, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1055, ad:"Nohut Salatasi (Pirasa Biberiye)", marka:"",kal:195, pro:9, karb:28, yag:6.5, lif:7, sod:280, demir:2.8, kals:55, vitC:10, vitD:0, vitB12:0, acik:65, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1056, ad:"Hibiskus Cay", marka:"",kal:3, pro:0.1, karb:0.7, yag:0, lif:0.1, sod:3, demir:0.2, kals:8, vitC:6, vitD:0, vitB12:0, acik:5, por:240, aclik:"—", onay:true, kat:"Icecek", yildiz:5 },
  { id:1057, ad:"Kuşburnu Cay", marka:"Doğadan",kal:8, pro:0.2, karb:1.8, yag:0.1, lif:0.5, sod:2, demir:0.3, kals:10, vitC:18, vitD:0, vitB12:0, acik:8, por:240, aclik:"—", onay:true, kat:"Icecek", yildiz:5 },
  { id:1058, ad:"Ihlamur Cay", marka:"Doğadan",kal:2, pro:0, karb:0.5, yag:0, lif:0.1, sod:1, demir:0.1, kals:5, vitC:1, vitD:0, vitB12:0, acik:5, por:240, aclik:"—", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:1059, ad:"Yeşil Cay (Matcha Yok)", marka:"",kal:2, pro:0.2, karb:0.3, yag:0, lif:0, sod:2, demir:0.1, kals:3, vitC:0, vitD:0, vitB12:0, acik:5, por:240, aclik:"—", onay:true, kat:"Icecek", yildiz:5 },
  { id:1060, ad:"Siyah Cay (Demli)", marka:"Çaykur",kal:2, pro:0.1, karb:0.4, yag:0, lif:0, sod:0, demir:0.2, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:200, aclik:"—", onay:true, kat:"Icecek", yildiz:4 },
  { id:1061, ad:"Elma Cay (Tatli)", marka:"Lipton",kal:40, pro:0, karb:10, yag:0, lif:0, sod:5, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:240, aclik:"—", onay:true, kat:"Icecek", yildiz:1.5 },
  { id:1062, ad:"Buzlu Cay Ev Yapimi", marka:"",kal:15, pro:0.1, karb:3.5, yag:0, lif:0, sod:5, demir:0.1, kals:0, vitC:1, vitD:0, vitB12:0, acik:5, por:300, aclik:"—", onay:true, kat:"Icecek", yildiz:3 },
  { id:1063, ad:"Oat Milk Latte", marka:"",kal:130, pro:3, karb:19, yag:5, lif:1, sod:95, demir:0.5, kals:120, vitC:0, vitD:0.8, vitB12:0.3, acik:35, por:300, aclik:"30-60 dk", onay:true, kat:"Icecek", yildiz:3.5 },
  { id:1064, ad:"Hindistan Cevizi Su", marka:"Vita Coco",kal:45, pro:0.5, karb:11, yag:0, lif:0, sod:25, demir:0.1, kals:57, vitC:2.4, vitD:0, vitB12:0, acik:15, por:330, aclik:"—", onay:true, kat:"Icecek", yildiz:4 },
  { id:1065, ad:"Aloe Vera Suyu", marka:"",kal:25, pro:0, karb:6.5, yag:0, lif:0, sod:5, demir:0.1, kals:5, vitC:0.5, vitD:0, vitB12:0, acik:8, por:240, aclik:"—", onay:true, kat:"Icecek", yildiz:4 },
  { id:1066, ad:"Mocha Protein Shake", marka:"",kal:210, pro:30, karb:15, yag:5, lif:2, sod:200, demir:1.0, kals:200, vitC:0, vitD:0.5, vitB12:0.5, acik:68, por:300, aclik:"2-3 saat", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:1067, ad:"Sporcu Muzlu Shake", marka:"",kal:320, pro:28, karb:42, yag:4, lif:3, sod:180, demir:1.5, kals:180, vitC:8, vitD:0.5, vitB12:0.5, acik:70, por:400, aclik:"2-3 saat", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:1068, ad:"Post Workout Karişik", marka:"",kal:380, pro:32, karb:55, yag:5, lif:3, sod:250, demir:2.0, kals:200, vitC:5, vitD:0.5, vitB12:0.5, acik:75, por:400, aclik:"2-3 saat", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:1069, ad:"Collagen Smoothie", marka:"",kal:180, pro:18, karb:22, yag:3, lif:2, sod:80, demir:0.5, kals:150, vitC:25, vitD:0, vitB12:0, acik:60, por:300, aclik:"1-2 saat", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:1070, ad:"Magnezyumlu Su", marka:"Doğadan",kal:0, pro:0, karb:0, yag:0, lif:0, sod:5, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:500, aclik:"—", onay:true, kat:"Icecek", yildiz:5 },
  { id:1071, ad:"Elektrolit Icecegi Ev Yapimi", marka:"",kal:20, pro:0, karb:5, yag:0, lif:0, sod:380, demir:0, kals:15, vitC:8, vitD:0, vitB12:0, acik:5, por:500, aclik:"—", onay:true, kat:"Icecek", yildiz:4 },
  { id:1072, ad:"Probiyotik Yoğurt (Activo)", marka:"Activia",kal:65, pro:3.8, karb:8, yag:2, lif:0, sod:55, demir:0, kals:120, vitC:0, vitD:0.1, vitB12:0.3, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Sut Urunu", yildiz:4.5 },
  { id:1073, ad:"Vitamin C Takviye", marka:"Now Foods",kal:4, pro:0, karb:1, yag:0, lif:0, sod:10, demir:0, kals:0, vitC:1000, vitD:0, vitB12:0, acik:5, por:1, aclik:"—", onay:true, kat:"Diger", yildiz:5 },
  { id:1074, ad:"Multivitamin Tablet", marka:"Centrum",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:18, kals:162, vitC:60, vitD:400, vitB12:6, acik:5, por:1, aclik:"—", onay:true, kat:"Diger", yildiz:5 },
  { id:1075, ad:"Demir Bisgilysinat", marka:"Solgar",kal:0, pro:0, karb:0.5, yag:0, lif:0, sod:5, demir:25, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:1, aclik:"—", onay:true, kat:"Diger", yildiz:5 },
  { id:1076, ad:"Karadeniz Tereyagli Pilav", marka:"",kal:265, pro:4.5, karb:45, yag:9, lif:0.5, sod:290, demir:0.8, kals:15, vitC:0, vitD:0.2, vitB12:0.1, acik:42, por:150, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:1077, ad:"Ege Zeytinyagli Barbunya", marka:"",kal:150, pro:7.5, karb:22, yag:4.5, lif:6, sod:230, demir:2.2, kals:45, vitC:5, vitD:0, vitB12:0, acik:70, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1078, ad:"Manisa Tarhana Corbasi", marka:"",kal:78, pro:3.5, karb:13, yag:1.5, lif:2, sod:350, demir:1.5, kals:28, vitC:2, vitD:0, vitB12:0, acik:58, por:200, aclik:"1-2 saat", onay:true, kat:"Corba", yildiz:4.5 },
  { id:1079, ad:"Konya Firini Ekmek", marka:"",kal:255, pro:8.5, karb:50, yag:2, lif:3, sod:395, demir:2.2, kals:20, vitC:0, vitD:0, vitB12:0, acik:40, por:80, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:3 },
  { id:1080, ad:"Gaziantep Sutlu Tatli", marka:"",kal:295, pro:6, karb:42, yag:13, lif:0.5, sod:80, demir:0.3, kals:150, vitC:0, vitD:0.2, vitB12:0.3, acik:20, por:150, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:2 },
  { id:1081, ad:"Denizli Kiremit Tavuğu", marka:"",kal:275, pro:32, karb:4, yag:15, lif:0.5, sod:620, demir:1.5, kals:25, vitC:2, vitD:0.1, vitB12:0.3, acik:80, por:200, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1082, ad:"Urfa Bıber Kebab", marka:"",kal:260, pro:24, karb:3, yag:17, lif:0.5, sod:580, demir:2.8, kals:25, vitC:2, vitD:0, vitB12:1.5, acik:78, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:1083, ad:"Antakya Kunefelik Peynir", marka:"",kal:260, pro:18, karb:2, yag:21, lif:0, sod:1100, demir:0.2, kals:530, vitC:0, vitD:0.3, vitB12:0.5, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:2 },
  { id:1084, ad:"Trabzon Hamsili Ekmek", marka:"",kal:315, pro:18, karb:38, yag:10, lif:2, sod:420, demir:2.0, kals:40, vitC:0, vitD:4.5, vitB12:4.0, acik:65, por:180, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:4.5 },
  { id:1085, ad:"Bolu Dağı Güveç", marka:"",kal:320, pro:22, karb:20, yag:18, lif:4, sod:520, demir:3.0, kals:60, vitC:20, vitD:0.1, vitB12:1.0, acik:72, por:250, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:4 },
  { id:1086, ad:"Cig Kofte (Hazir Paket)", marka:"Asyum",kal:155, pro:5, karb:28, yag:3.5, lif:5.5, sod:520, demir:2.5, kals:28, vitC:3, vitD:0, vitB12:0, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Hazir Yemek", yildiz:2.5 },
  { id:1087, ad:"Lokma Tatlisi", marka:"",kal:380, pro:4, karb:58, yag:16, lif:1, sod:120, demir:1.0, kals:15, vitC:0, vitD:0, vitB12:0, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1088, ad:"Churros (3 adet)", marka:"",kal:320, pro:4.5, karb:44, yag:15, lif:1.5, sod:280, demir:1.2, kals:20, vitC:0, vitD:0, vitB12:0, acik:14, por:90, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1089, ad:"Waffle (Taze)", marka:"",kal:350, pro:7, karb:48, yag:15, lif:1.5, sod:360, demir:2.0, kals:80, vitC:0, vitD:0.5, vitB12:0.3, acik:25, por:120, aclik:"30-60 dk", onay:true, kat:"Tahil", yildiz:1.5 },
  { id:1090, ad:"Galeta Unu", marka:"",kal:395, pro:12, karb:78, yag:4, lif:4, sod:590, demir:3.5, kals:35, vitC:0, vitD:0, vitB12:0, acik:25, por:100, aclik:"—", onay:true, kat:"Diger", yildiz:2 },
  { id:1091, ad:"Crème Brûlée", marka:"",kal:285, pro:4.5, karb:30, yag:17, lif:0, sod:55, demir:0.2, kals:80, vitC:0, vitD:0.3, vitB12:0.2, acik:10, por:120, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:1092, ad:"Panna Cotta (Vanilya)", marka:"",kal:220, pro:3.5, karb:22, yag:14, lif:0, sod:60, demir:0, kals:90, vitC:0, vitD:0.2, vitB12:0.2, acik:10, por:120, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:1093, ad:"Mousse au Chocolat", marka:"",kal:310, pro:6, karb:28, yag:21, lif:2, sod:50, demir:2.5, kals:50, vitC:0.2, vitD:0.3, vitB12:0.2, acik:12, por:120, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:1094, ad:"Sufle (Cikolata)", marka:"",kal:325, pro:8, karb:38, yag:17, lif:1.5, sod:140, demir:2.0, kals:60, vitC:0, vitD:0.4, vitB12:0.3, acik:12, por:130, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:1095, ad:"Waffle (Nutellali)", marka:"",kal:490, pro:8, karb:66, yag:23, lif:2, sod:340, demir:2.0, kals:90, vitC:0, vitD:0.5, vitB12:0.3, acik:15, por:150, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1096, ad:"Mercimekli Pirinc Pilavi", marka:"",kal:245, pro:9, karb:48, yag:3, lif:4.5, sod:220, demir:2.8, kals:25, vitC:0, vitD:0, vitB12:0, acik:62, por:200, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:4.5 },
  { id:1097, ad:"Sarimsakli Yogurt Makarna", marka:"",kal:385, pro:14, karb:62, yag:11, lif:2, sod:420, demir:1.5, kals:80, vitC:1, vitD:0.2, vitB12:0.2, acik:45, por:250, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:1098, ad:"Makarna Carbonara", marka:"",kal:480, pro:18, karb:55, yag:22, lif:2, sod:580, demir:1.5, kals:100, vitC:0, vitD:0.5, vitB12:0.5, acik:48, por:250, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:1099, ad:"Ton Balikli Makarna", marka:"",kal:350, pro:25, karb:42, yag:8, lif:2.5, sod:520, demir:1.8, kals:30, vitC:0, vitD:3.5, vitB12:2.0, acik:65, por:250, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1100, ad:"Kisir (Tam Bardak)", marka:"",kal:198, pro:5, karb:34, yag:6, lif:5, sod:350, demir:1.8, kals:35, vitC:15, vitD:0, vitB12:0, acik:62, por:200, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:5 },
  { id:1101, ad:"Manti (100g Pismis)", marka:"",kal:220, pro:10, karb:32, yag:7, lif:1.5, sod:420, demir:1.5, kals:50, vitC:0, vitD:0.2, vitB12:0.4, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:1102, ad:"Manti (Yoğurtlu Tam Porsiyon)", marka:"",kal:380, pro:16, karb:52, yag:13, lif:2, sod:680, demir:2.0, kals:130, vitC:0, vitD:0.2, vitB12:0.4, acik:52, por:300, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:3 },
  { id:1103, ad:"Gözleme (Kıymalı)", marka:"",kal:310, pro:15, karb:34, yag:14, lif:2, sod:520, demir:2.5, kals:35, vitC:1, vitD:0, vitB12:0.8, acik:52, por:150, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:1104, ad:"Börek (Patatesli)", marka:"",kal:255, pro:6, karb:34, yag:12, lif:2, sod:380, demir:1.2, kals:30, vitC:8, vitD:0, vitB12:0, acik:38, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:1105, ad:"Firinda Sütlaç", marka:"",kal:145, pro:4.5, karb:24, yag:4, lif:0.2, sod:70, demir:0.1, kals:125, vitC:0, vitD:0.3, vitB12:0.4, acik:38, por:150, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:2.5 },
  { id:1106, ad:"Tulum Peyniri (Izmir)", marka:"",kal:360, pro:25, karb:0.5, yag:30, lif:0, sod:1080, demir:0.3, kals:650, vitC:0, vitD:0.3, vitB12:0.8, acik:48, por:100, aclik:"2-3 saat", onay:true, kat:"Sut Urunu", yildiz:2 },
  { id:1107, ad:"Mihalıç Peyniri", marka:"",kal:345, pro:26, karb:1, yag:27, lif:0, sod:1260, demir:0.3, kals:720, vitC:0, vitD:0.3, vitB12:0.9, acik:50, por:100, aclik:"2-3 saat", onay:true, kat:"Sut Urunu", yildiz:2 },
  { id:1108, ad:"Civil Peyniri (Haskoy)", marka:"",kal:280, pro:24, karb:2, yag:20, lif:0, sod:980, demir:0.2, kals:580, vitC:0, vitD:0.3, vitB12:0.7, acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:2.5 },
  { id:1109, ad:"Kelle Peyniri", marka:"",kal:320, pro:22, karb:1.5, yag:26, lif:0, sod:1100, demir:0.3, kals:600, vitC:0, vitD:0.3, vitB12:0.8, acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:2 },
  { id:1110, ad:"Sirdan (Kuzey Doğu)", marka:"",kal:185, pro:10, karb:18, yag:8.5, lif:1.5, sod:450, demir:1.5, kals:60, vitC:2, vitD:0, vitB12:0.5, acik:55, por:150, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:2.5 },
  { id:1111, ad:"Duz Soda (Maden Suyu)", marka:"",kal:0, pro:0, karb:0, yag:0, lif:0, sod:170, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:330, aclik:"—", onay:true, kat:"Icecek", yildiz:3 },
  { id:1112, ad:"Kefir + Meyve Karisimi", marka:"",kal:155, pro:7, karb:24, yag:3, lif:1.5, sod:85, demir:0.5, kals:200, vitC:12, vitD:0.1, vitB12:0.5, acik:52, por:250, aclik:"1-2 saat", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:1113, ad:"Zeytin Yagi + Ekmek", marka:"",kal:320, pro:6, karb:42, yag:14, lif:2.5, sod:390, demir:1.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:35, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:1114, ad:"Bütün Yumurta (Rafadan)", marka:"",kal:77, pro:6.3, karb:0.6, yag:5.3, lif:0, sod:62, demir:0.9, kals:25, vitC:0, vitD:0.9, vitB12:0.6, acik:55, por:50, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1115, ad:"Cig Yumurta (Smoothie)", marka:"",kal:72, pro:6.3, karb:0.4, yag:5, lif:0, sod:71, demir:0.9, kals:28, vitC:0, vitD:0.9, vitB12:0.5, acik:55, por:50, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:1116, ad:"Fırında Yumurta (Shakshuka Stili)", marka:"",kal:145, pro:12, karb:6, yag:9, lif:1.5, sod:480, demir:2.5, kals:50, vitC:18, vitD:1.5, vitB12:0.9, acik:65, por:150, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1117, ad:"Yumurta (Baked, Firin)", marka:"",kal:155, pro:13, karb:1.5, yag:11, lif:0, sod:140, demir:1.8, kals:50, vitC:0, vitD:1.5, vitB12:0.9, acik:65, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1118, ad:"Develi Yoğurt (Koyun)", marka:"",kal:90, pro:5.5, karb:5, yag:5.5, lif:0, sod:50, demir:0.1, kals:180, vitC:0, vitD:0.1, vitB12:0.5, acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:5 },
  { id:1119, ad:"İnek Sütü (Çiğ, Taze)", marka:"",kal:65, pro:3.4, karb:4.8, yag:3.7, lif:0, sod:44, demir:0, kals:125, vitC:0, vitD:0.1, vitB12:0.4, acik:48, por:100, aclik:"1 saat", onay:true, kat:"Sut Urunu", yildiz:4.5 },
  { id:1120, ad:"Manda Sütü", marka:"",kal:97, pro:4.5, karb:5.2, yag:6.9, lif:0, sod:52, demir:0.1, kals:169, vitC:0, vitD:0.1, vitB12:0.5, acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:4 },
  { id:1121, ad:"Kefir (Keçi Sütü)", marka:"",kal:58, pro:3.2, karb:4.5, yag:3, lif:0, sod:38, demir:0.1, kals:120, vitC:1, vitD:0.1, vitB12:0.3, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Sut Urunu", yildiz:5 },
  { id:1122, ad:"Keçi Sütü", marka:"",kal:69, pro:3.6, karb:4.5, yag:4.1, lif:0, sod:50, demir:0, kals:134, vitC:1.3, vitD:0.1, vitB12:0.1, acik:45, por:100, aclik:"1 saat", onay:true, kat:"Sut Urunu", yildiz:4.5 },
  { id:1123, ad:"Oat Krema (Kafedeki)", marka:"Oatly",kal:150, pro:1, karb:15, yag:9, lif:0.5, sod:95, demir:0.2, kals:120, vitC:0, vitD:1.0, vitB12:0.3, acik:20, por:200, aclik:"30-60 dk", onay:true, kat:"Icecek", yildiz:3 },
  { id:1124, ad:"Bebek Dondurması (Meyve Suyu)", marka:"",kal:40, pro:0.2, karb:10, yag:0.1, lif:0, sod:5, demir:0, kals:3, vitC:3, vitD:0, vitB12:0, acik:5, por:60, aclik:"—", onay:true, kat:"Atistirmalik", yildiz:2 },
  { id:1125, ad:"Dondurmali Waffle", marka:"",kal:580, pro:8, karb:78, yag:28, lif:2, sod:380, demir:1.5, kals:110, vitC:0, vitD:0.3, vitB12:0.2, acik:14, por:200, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1126, ad:"Hazır Döner (Dondurulmus)", marka:"Banvit",kal:195, pro:16, karb:4, yag:13, lif:0.5, sod:680, demir:1.0, kals:12, vitC:0, vitD:0, vitB12:0.2, acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:1.5 },
  { id:1127, ad:"Hazır Kofte (Dondurulmus)", marka:"Banvit",kal:240, pro:18, karb:8, yag:16, lif:1, sod:720, demir:2.0, kals:20, vitC:0, vitD:0, vitB12:0.8, acik:58, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:1.5 },
  { id:1128, ad:"Hazır Tavuk Nugget", marka:"Pinar",kal:270, pro:14, karb:18, yag:16, lif:0.5, sod:680, demir:0.8, kals:20, vitC:0, vitD:0, vitB12:0.2, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:1 },
  { id:1129, ad:"Hazır Çorba (Knorr Mercimek)", marka:"Knorr",kal:62, pro:3.5, karb:10, yag:1, lif:2, sod:540, demir:1.5, kals:20, vitC:0.5, vitD:0, vitB12:0, acik:55, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:2.5 },
  { id:1130, ad:"Hazır Pilav (Mikrodalgada)", marka:"Uncle Bens",kal:250, pro:5, karb:52, yag:3, lif:1, sod:380, demir:1.0, kals:8, vitC:0, vitD:0, vitB12:0, acik:32, por:200, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:1.5 },
  { id:1131, ad:"Havuc Cipsi (Kekikli)", marka:"",kal:120, pro:2, karb:19, yag:4.5, lif:4.5, sod:190, demir:0.6, kals:35, vitC:6, vitD:0, vitB12:0, acik:40, por:50, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1132, ad:"Pancar Cipsi (Tuzlu)", marka:"",kal:115, pro:2.5, karb:18, yag:4, lif:3.5, sod:280, demir:1.0, kals:20, vitC:3.5, vitD:0, vitB12:0, acik:42, por:50, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:1133, ad:"Lahana Cipsi", marka:"",kal:115, pro:4, karb:12, yag:6, lif:4, sod:280, demir:1.2, kals:90, vitC:35, vitD:0, vitB12:0, acik:42, por:30, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1134, ad:"Tatli Patates Cipsi (Firın)", marka:"",kal:130, pro:1.5, karb:22, yag:4.5, lif:3, sod:160, demir:0.5, kals:20, vitC:12, vitD:0, vitB12:0, acik:38, por:50, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:1135, ad:"Nohut Cipsi (Baharatlı)", marka:"",kal:155, pro:7, karb:22, yag:5.5, lif:5, sod:380, demir:2.2, kals:35, vitC:0.5, vitD:0, vitB12:0, acik:55, por:50, aclik:"1-2 saat", onay:true, kat:"Atistirmalik", yildiz:4.5 },
  { id:1136, ad:"Fasulye Cipsi", marka:"",kal:148, pro:7.5, karb:20, yag:5, lif:5.5, sod:280, demir:2.0, kals:30, vitC:0, vitD:0, vitB12:0, acik:52, por:50, aclik:"1-2 saat", onay:true, kat:"Atistirmalik", yildiz:4.5 },
  { id:1137, ad:"Kinoa Krekerler", marka:"",kal:415, pro:10, karb:62, yag:15, lif:5, sod:380, demir:3.0, kals:35, vitC:0, vitD:0, vitB12:0, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Atistirmalik", yildiz:3.5 },
  { id:1138, ad:"Tam Bugday Galeta", marka:"",kal:370, pro:12, karb:68, yag:5.5, lif:8, sod:490, demir:3.5, kals:30, vitC:0, vitD:0, vitB12:0, acik:48, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:4.5 },
  { id:1139, ad:"Badem Sütü Dondurma", marka:"",kal:110, pro:1.5, karb:15, yag:5.5, lif:0.5, sod:95, demir:0.5, kals:180, vitC:0, vitD:1.0, vitB12:0, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:3 },
  { id:1140, ad:"Kokonat Dondurma (Vegán)", marka:"",kal:200, pro:1.5, karb:22, yag:12, lif:1, sod:55, demir:0.8, kals:10, vitC:0, vitD:0, vitB12:0, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:2 },
  { id:1141, ad:"Pirinç Pilavi (Yağlı)", marka:"",kal:215, pro:3.8, karb:44, yag:3.5, lif:0.5, sod:280, demir:0.8, kals:10, vitC:0, vitD:0, vitB12:0, acik:38, por:150, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:1142, ad:"Mercimekli Bulgur (Pismis)", marka:"",kal:210, pro:10, karb:40, yag:2, lif:7, sod:180, demir:2.5, kals:30, vitC:0, vitD:0, vitB12:0, acik:65, por:200, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:5 },
  { id:1143, ad:"Domatesli Bulgur Pilavi", marka:"",kal:195, pro:5, karb:38, yag:5, lif:4.5, sod:310, demir:1.8, kals:25, vitC:5, vitD:0, vitB12:0, acik:58, por:200, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:4 },
  { id:1144, ad:"Ezogelin Corbasi", marka:"",kal:92, pro:5.5, karb:15, yag:2, lif:3.8, sod:320, demir:1.8, kals:22, vitC:2, vitD:0, vitB12:0, acik:62, por:200, aclik:"1-2 saat", onay:true, kat:"Corba", yildiz:4.5 },
  { id:1145, ad:"Patates Corbasi (Kremali)", marka:"",kal:130, pro:3, karb:18, yag:6, lif:2, sod:390, demir:0.6, kals:30, vitC:10, vitD:0, vitB12:0, acik:42, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:3 },
  { id:1146, ad:"Ispanak Corbasi (Kremali)", marka:"",kal:105, pro:4, karb:9, yag:6.5, lif:2.5, sod:360, demir:2.2, kals:120, vitC:20, vitD:0, vitB12:0.1, acik:50, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:5 },
  { id:1147, ad:"Tavuklu Sebze Corbasi", marka:"",kal:88, pro:7, karb:10, yag:2.5, lif:2.5, sod:420, demir:0.8, kals:25, vitC:8, vitD:0, vitB12:0.2, acik:58, por:200, aclik:"1-2 saat", onay:true, kat:"Corba", yildiz:5 },
  { id:1148, ad:"Pirasa Sote (Zeytinyagli)", marka:"",kal:75, pro:1.5, karb:9, yag:4, lif:2.5, sod:145, demir:1.2, kals:45, vitC:10, vitD:0, vitB12:0, acik:48, por:150, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:1149, ad:"Kabak Sote (Zeytinyagli)", marka:"",kal:60, pro:1.5, karb:7, yag:3.5, lif:2, sod:130, demir:0.5, kals:20, vitC:15, vitD:0, vitB12:0, acik:40, por:150, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1150, ad:"Biber Sote (Acili-Tatli)", marka:"",kal:65, pro:1.8, karb:9.5, yag:3, lif:3, sod:160, demir:0.6, kals:15, vitC:85, vitD:0, vitB12:0, acik:42, por:150, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1151, ad:"Menemen (Sucuklu)", marka:"",kal:285, pro:18, karb:8, yag:20, lif:1.5, sod:820, demir:2.5, kals:50, vitC:12, vitD:0.8, vitB12:1.2, acik:68, por:200, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:2.5 },
  { id:1152, ad:"Omlet (Domatesli Biberli)", marka:"",kal:195, pro:14, karb:5, yag:14, lif:1.5, sod:380, demir:2.0, kals:55, vitC:18, vitD:1.5, vitB12:0.9, acik:65, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:1153, ad:"Omlet (Peynirli)", marka:"",kal:250, pro:16, karb:2, yag:20, lif:0, sod:480, demir:1.8, kals:180, vitC:0, vitD:1.5, vitB12:0.9, acik:62, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1154, ad:"Sahanda Yumurta (Tereyagli)", marka:"",kal:200, pro:12, karb:1, yag:17, lif:0, sod:290, demir:1.8, kals:40, vitC:0, vitD:1.5, vitB12:0.9, acik:60, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1155, ad:"Pastirma Yumurta", marka:"",kal:310, pro:22, karb:1.5, yag:24, lif:0, sod:1050, demir:3.0, kals:45, vitC:0, vitD:1.5, vitB12:1.8, acik:70, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:2.5 },
  { id:1156, ad:"Sucuklu Yumurta", marka:"",kal:350, pro:20, karb:2, yag:29, lif:0, sod:980, demir:2.8, kals:40, vitC:0, vitD:1.5, vitB12:1.5, acik:65, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:2 },
  { id:1157, ad:"Avokado Toast (2 dilim)", marka:"",kal:340, pro:9, karb:38, yag:18, lif:8, sod:420, demir:2.5, kals:40, vitC:12, vitD:0, vitB12:0, acik:55, por:180, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:4.5 },
  { id:1158, ad:"French Toast (2 dilim)", marka:"",kal:380, pro:13, karb:44, yag:18, lif:1.5, sod:420, demir:2.0, kals:90, vitC:0, vitD:1.2, vitB12:0.5, acik:42, por:160, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:1159, ad:"Pancakes (3 adet, Surup)", marka:"",kal:420, pro:10, karb:70, yag:14, lif:2, sod:580, demir:2.5, kals:80, vitC:0, vitD:0.5, vitB12:0.3, acik:38, por:180, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:1.5 },
  { id:1160, ad:"Granola + Yoğurt Kaseleri", marka:"",kal:310, pro:10, karb:48, yag:9, lif:5, sod:120, demir:2.5, kals:180, vitC:1, vitD:0.2, vitB12:0.3, acik:55, por:200, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:4 },
  { id:1161, ad:"Beyaz Peynir (Klasik)", marka:"",kal:265, pro:16, karb:1.5, yag:22, lif:0, sod:1210, demir:0.2, kals:520, vitC:0, vitD:0.3, vitB12:0.8, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:2 },
  { id:1162, ad:"Kasar Peyniri", marka:"",kal:390, pro:26, karb:2, yag:32, lif:0, sod:920, demir:0.4, kals:780, vitC:0, vitD:0.5, vitB12:1.2, acik:48, por:100, aclik:"2-3 saat", onay:true, kat:"Sut Urunu", yildiz:2.5 },
  { id:1163, ad:"Ezine Peyniri", marka:"",kal:280, pro:17, karb:1.8, yag:23, lif:0, sod:1180, demir:0.2, kals:540, vitC:0, vitD:0.3, vitB12:0.9, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:2 },
  { id:1164, ad:"Lor Peyniri", marka:"",kal:98, pro:9, karb:3.5, yag:5.5, lif:0, sod:80, demir:0.1, kals:160, vitC:0, vitD:0.2, vitB12:0.3, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Sut Urunu", yildiz:4.5 },
  { id:1165, ad:"Çökelek", marka:"",kal:85, pro:11, karb:3, yag:3, lif:0, sod:95, demir:0.2, kals:200, vitC:0, vitD:0.1, vitB12:0.3, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:5 },
  { id:1166, ad:"Dil Peyniri", marka:"",kal:300, pro:20, karb:1, yag:25, lif:0, sod:990, demir:0.3, kals:600, vitC:0, vitD:0.3, vitB12:0.9, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:2.5 },
  { id:1167, ad:"Örgü Peyniri", marka:"",kal:315, pro:21, karb:1.5, yag:26, lif:0, sod:1100, demir:0.3, kals:620, vitC:0, vitD:0.3, vitB12:0.9, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:2 },
  { id:1168, ad:"Süzme Peynir (Krem)", marka:"",kal:190, pro:7, karb:4.5, yag:16, lif:0, sod:320, demir:0.1, kals:98, vitC:0, vitD:0.2, vitB12:0.3, acik:38, por:100, aclik:"30-60 dk", onay:true, kat:"Sut Urunu", yildiz:3 },
  { id:1169, ad:"Aydın Milas Yağlı Peynir", marka:"",kal:355, pro:22, karb:1, yag:30, lif:0, sod:1050, demir:0.3, kals:670, vitC:0, vitD:0.3, vitB12:0.9, acik:48, por:100, aclik:"2-3 saat", onay:true, kat:"Sut Urunu", yildiz:2 },
  { id:1170, ad:"Kars Gravyeri", marka:"",kal:420, pro:30, karb:0.5, yag:34, lif:0, sod:680, demir:0.4, kals:890, vitC:0, vitD:0.5, vitB12:1.5, acik:52, por:100, aclik:"2-3 saat", onay:true, kat:"Sut Urunu", yildiz:3 },
  { id:1171, ad:"Siyah Zeytin (Gemlik)", marka:"",kal:185, pro:1.5, karb:5, yag:19, lif:3.2, sod:1480, demir:3.3, kals:94, vitC:0, vitD:0, vitB12:0, acik:30, por:100, aclik:"1 saat", onay:true, kat:"Diger", yildiz:3 },
  { id:1172, ad:"Yesil Zeytin (Yaglanmis)", marka:"",kal:145, pro:1.2, karb:4.5, yag:15, lif:3.3, sod:1560, demir:3.1, kals:88, vitC:0, vitD:0, vitB12:0, acik:30, por:100, aclik:"1 saat", onay:true, kat:"Diger", yildiz:2.5 },
  { id:1173, ad:"Kizartilmis Zeytin", marka:"",kal:220, pro:1.3, karb:5.5, yag:23, lif:3, sod:1280, demir:3.0, kals:90, vitC:0, vitD:0, vitB12:0, acik:28, por:100, aclik:"1 saat", onay:true, kat:"Diger", yildiz:2.5 },
  { id:1174, ad:"Ketçap (Heinz, 1 yemek kasigi)", marka:"Heinz",kal:20, pro:0.3, karb:5, yag:0, lif:0.2, sod:160, demir:0.1, kals:3, vitC:2, vitD:0, vitB12:0, acik:5, por:17, aclik:"—", onay:true, kat:"Diger", yildiz:1 },
  { id:1175, ad:"Mayonez (1 yemek kasigi)", marka:"Hellmanns",kal:90, pro:0.1, karb:0.5, yag:10, lif:0, sod:90, demir:0, kals:0, vitC:0, vitD:0.1, vitB12:0, acik:5, por:14, aclik:"—", onay:true, kat:"Diger", yildiz:0.5 },
  { id:1176, ad:"Hardal (1 yemek kasigi)", marka:"",kal:10, pro:0.6, karb:1, yag:0.5, lif:0.4, sod:190, demir:0.2, kals:12, vitC:0.2, vitD:0, vitB12:0, acik:5, por:15, aclik:"—", onay:true, kat:"Diger", yildiz:3 },
  { id:1177, ad:"Domates Sosu (Ev Yapimi, 100g)", marka:"",kal:35, pro:1.2, karb:7.5, yag:0.5, lif:1.5, sod:280, demir:0.5, kals:15, vitC:12, vitD:0, vitB12:0, acik:12, por:100, aclik:"—", onay:true, kat:"Diger", yildiz:4.5 },
  { id:1178, ad:"Tahin (1 yemek kasigi)", marka:"",kal:89, pro:2.6, karb:3.2, yag:8, lif:1.4, sod:17, demir:1.3, kals:64, vitC:0, vitD:0, vitB12:0, acik:25, por:15, aclik:"30-60 dk", onay:true, kat:"Diger", yildiz:4.5 },
  { id:1179, ad:"Zeytinyağı (1 yemek kasigi)", marka:"",kal:119, pro:0, karb:0, yag:13.5, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:14, aclik:"—", onay:true, kat:"Diger", yildiz:4.5 },
  { id:1180, ad:"Tereyağı (1 yemek kasigi)", marka:"",kal:102, pro:0.1, karb:0, yag:11.5, lif:0, sod:82, demir:0, kals:3, vitC:0, vitD:0.1, vitB12:0, acik:5, por:14, aclik:"—", onay:true, kat:"Diger", yildiz:0.5 },
  { id:1181, ad:"Bal (1 yemek kasigi)", marka:"",kal:64, pro:0.1, karb:17.3, yag:0, lif:0, sod:1, demir:0.1, kals:1, vitC:0.1, vitD:0, vitB12:0, acik:8, por:21, aclik:"30 dk", onay:true, kat:"Diger", yildiz:3 },
  { id:1182, ad:"Pekmez (Üzüm, 1 yemek kasigi)", marka:"",kal:75, pro:0.3, karb:19, yag:0, lif:0, sod:3, demir:1.2, kals:18, vitC:0, vitD:0, vitB12:0, acik:10, por:20, aclik:"30 dk", onay:true, kat:"Diger", yildiz:3.5 },
  { id:1183, ad:"Reçel (Çilek, 1 yemek kasigi)", marka:"Balparmak",kal:55, pro:0.1, karb:14, yag:0, lif:0.3, sod:5, demir:0.1, kals:4, vitC:1, vitD:0, vitB12:0, acik:5, por:20, aclik:"—", onay:true, kat:"Diger", yildiz:1 },
  { id:1184, ad:"Acı Biber Sosu (Tabasco)", marka:"Tabasco",kal:1, pro:0, karb:0.1, yag:0, lif:0, sod:35, demir:0, kals:0, vitC:0.3, vitD:0, vitB12:0, acik:5, por:5, aclik:"—", onay:true, kat:"Diger", yildiz:4 },
  { id:1185, ad:"Soya Sosu (1 yemek kasigi)", marka:"Kikkoman",kal:8, pro:1, karb:1, yag:0, lif:0, sod:920, demir:0.2, kals:3, vitC:0, vitD:0, vitB12:0, acik:5, por:15, aclik:"—", onay:true, kat:"Diger", yildiz:2 },
  { id:1186, ad:"Worcestershire Sosu", marka:"Lea Perrins",kal:13, pro:0.2, karb:3, yag:0, lif:0, sod:165, demir:0.3, kals:10, vitC:0.5, vitD:0, vitB12:0, acik:5, por:17, aclik:"—", onay:true, kat:"Diger", yildiz:3 },
  { id:1187, ad:"Fıstık Ezmesi (Doğal, 2 k.k.)", marka:"",kal:188, pro:8, karb:6.5, yag:16, lif:2, sod:75, demir:0.6, kals:12, vitC:0, vitD:0, vitB12:0, acik:45, por:32, aclik:"1-2 saat", onay:true, kat:"Diger", yildiz:4.5 },
  { id:1188, ad:"Badem Ezmesi (2 k.k.)", marka:"",kal:196, pro:7, karb:6, yag:18, lif:3.5, sod:55, demir:1.0, kals:88, vitC:0, vitD:0, vitB12:0, acik:48, por:32, aclik:"1-2 saat", onay:true, kat:"Diger", yildiz:5 },
  { id:1189, ad:"Kaju Ezmesi (2 k.k.)", marka:"",kal:188, pro:5.5, karb:9, yag:16, lif:0.5, sod:90, demir:1.5, kals:13, vitC:0, vitD:0, vitB12:0, acik:42, por:32, aclik:"1-2 saat", onay:true, kat:"Diger", yildiz:4 },
  { id:1190, ad:"Fındık Kreması (Nutella Tarzı, Ev)", marka:"",kal:540, pro:7, karb:56, yag:33, lif:3, sod:50, demir:2.0, kals:80, vitC:0, vitD:0, vitB12:0, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Diger", yildiz:1.5 },
  { id:1191, ad:"McDonalds Big Mac", marka:"McDonalds",kal:550, pro:25, karb:47, yag:29, lif:3, sod:1040, demir:4.5, kals:250, vitC:1, vitD:0.3, vitB12:1.5, acik:45, por:220, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:1 },
  { id:1192, ad:"McDonalds McChicken", marka:"McDonalds",kal:400, pro:17, karb:41, yag:19, lif:2, sod:820, demir:2.5, kals:100, vitC:0.5, vitD:0.1, vitB12:0.5, acik:38, por:165, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:1 },
  { id:1193, ad:"McDonalds McNugget (6 adet)", marka:"McDonalds",kal:280, pro:15, karb:17, yag:17, lif:1, sod:510, demir:0.5, kals:14, vitC:0, vitD:0, vitB12:0.2, acik:32, por:104, aclik:"30-60 dk", onay:true, kat:"Protein", yildiz:1 },
  { id:1194, ad:"McDonalds Büyük Boy Patates", marka:"McDonalds",kal:490, pro:6, karb:63, yag:23, lif:5, sod:400, demir:2.0, kals:26, vitC:9, vitD:0, vitB12:0, acik:25, por:178, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:0.5 },
  { id:1195, ad:"McDonalds McFlurry Oreo", marka:"McDonalds",kal:510, pro:12, karb:80, yag:17, lif:0.5, sod:270, demir:0.5, kals:360, vitC:1, vitD:1.5, vitB12:0.5, acik:12, por:278, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1196, ad:"Burger King Whopper", marka:"Burger King",kal:660, pro:28, karb:51, yag:40, lif:2, sod:980, demir:4.0, kals:80, vitC:3, vitD:0.2, vitB12:1.5, acik:42, por:287, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:0.5 },
  { id:1197, ad:"Burger King Chick n Crispy", marka:"Burger King",kal:560, pro:22, karb:56, yag:28, lif:2, sod:1060, demir:2.5, kals:90, vitC:1, vitD:0.1, vitB12:0.4, acik:38, por:210, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:0.5 },
  { id:1198, ad:"Burger King Onion Rings", marka:"Burger King",kal:310, pro:4.5, karb:42, yag:15, lif:2, sod:560, demir:1.0, kals:20, vitC:1, vitD:0, vitB12:0, acik:20, por:91, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:0.5 },
  { id:1199, ad:"KFC Original Chicken (1 Parca)", marka:"KFC",kal:320, pro:20, karb:16, yag:20, lif:0.5, sod:710, demir:0.8, kals:20, vitC:0, vitD:0.1, vitB12:0.3, acik:45, por:130, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:1 },
  { id:1200, ad:"KFC Coleslaw (Orta)", marka:"KFC",kal:180, pro:1, karb:24, yag:9, lif:1.5, sod:280, demir:0.5, kals:30, vitC:18, vitD:0, vitB12:0, acik:22, por:113, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:2 },
  { id:1201, ad:"Pizza Margherita (Ev Yapimi, 1 dilim)", marka:"",kal:200, pro:9, karb:26, yag:7, lif:1.5, sod:380, demir:1.5, kals:150, vitC:3, vitD:0.2, vitB12:0.2, acik:32, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:1202, ad:"Pizza Margarita (Hazir, Firin)", marka:"Dr. Oetker",kal:245, pro:11, karb:31, yag:9, lif:2, sod:550, demir:1.5, kals:160, vitC:2, vitD:0.2, vitB12:0.3, acik:30, por:115, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:1203, ad:"Pizza Hut Pepperoni (1 dilim)", marka:"Pizza Hut",kal:310, pro:14, karb:32, yag:14, lif:1.5, sod:760, demir:2.0, kals:180, vitC:1, vitD:0.2, vitB12:0.5, acik:32, por:120, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:1 },
  { id:1204, ad:"Calzone (Ispanakli Ricotta)", marka:"",kal:380, pro:16, karb:42, yag:16, lif:2.5, sod:680, demir:2.5, kals:220, vitC:5, vitD:0.3, vitB12:0.3, acik:42, por:200, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:1205, ad:"Subway Italian BMT (15cm)", marka:"Subway",kal:480, pro:23, karb:47, yag:22, lif:3.5, sod:1580, demir:3.5, kals:140, vitC:5, vitD:0.1, vitB12:0.8, acik:45, por:210, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:1 },
  { id:1206, ad:"Subway Tavuklu Teriyaki (15cm)", marka:"Subway",kal:430, pro:28, karb:55, yag:10, lif:4, sod:1180, demir:3.0, kals:120, vitC:8, vitD:0.1, vitB12:0.5, acik:48, por:210, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:2.5 },
  { id:1207, ad:"Club Sandvici (Ev)", marka:"",kal:440, pro:28, karb:38, yag:20, lif:3, sod:820, demir:2.5, kals:80, vitC:2, vitD:0.5, vitB12:0.8, acik:52, por:200, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:3 },
  { id:1208, ad:"BLT Sandvici (Bacon-Marul-Domates)", marka:"",kal:380, pro:18, karb:36, yag:20, lif:2.5, sod:920, demir:2.0, kals:60, vitC:5, vitD:0.2, vitB12:0.5, acik:48, por:180, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:1209, ad:"Karisik Sandvic (Kasar Jambon)", marka:"",kal:360, pro:18, karb:36, yag:18, lif:2, sod:880, demir:1.8, kals:200, vitC:1, vitD:0.2, vitB12:0.5, acik:45, por:160, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:1210, ad:"Makarna Bolognese (Kiyma Soslu)", marka:"",kal:420, pro:22, karb:52, yag:14, lif:3, sod:580, demir:3.0, kals:60, vitC:5, vitD:0, vitB12:1.5, acik:58, por:300, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:3.5 },
  { id:1211, ad:"Makarna Arabiata", marka:"",kal:340, pro:11, karb:60, yag:7, lif:4, sod:480, demir:2.5, kals:30, vitC:12, vitD:0, vitB12:0, acik:48, por:250, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:3.5 },
  { id:1212, ad:"Lazanya (Kiymali)", marka:"",kal:350, pro:18, karb:32, yag:17, lif:2, sod:620, demir:2.5, kals:180, vitC:3, vitD:0.2, vitB12:0.8, acik:55, por:250, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:1213, ad:"Penne Arrabiata", marka:"Barilla",kal:180, pro:7, karb:36, yag:1, lif:2.5, sod:330, demir:2.0, kals:15, vitC:8, vitD:0, vitB12:0, acik:40, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:3.5 },
  { id:1214, ad:"Rigatoni Pastırmalı", marka:"",kal:480, pro:20, karb:56, yag:20, lif:2.5, sod:780, demir:2.5, kals:80, vitC:0, vitD:0.1, vitB12:1.0, acik:52, por:300, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:1215, ad:"Ramen (Hazir, Tavuk Aromalı)", marka:"Nongshim",kal:380, pro:9, karb:55, yag:14, lif:2, sod:1820, demir:2.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:28, por:120, aclik:"30-60 dk", onay:true, kat:"Tahil", yildiz:0.5 },
  { id:1216, ad:"Eriste (Ev Yapimi)", marka:"",kal:330, pro:11, karb:64, yag:3, lif:3, sod:250, demir:2.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:45, por:150, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:3 },
  { id:1217, ad:"Eriste Corbasi", marka:"",kal:95, pro:4.5, karb:16, yag:2, lif:1, sod:380, demir:1.0, kals:20, vitC:0, vitD:0, vitB12:0, acik:42, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:3.5 },
  { id:1218, ad:"Sardalya (Konserve, Zeytinyagli)", marka:"",kal:208, pro:25, karb:0, yag:12, lif:0, sod:505, demir:2.9, kals:351, vitC:0, vitD:4.8, vitB12:8.9, acik:82, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1219, ad:"Somon Fileto (Buharda)", marka:"",kal:185, pro:25, karb:0, yag:9, lif:0, sod:59, demir:0.8, kals:13, vitC:3.9, vitD:14.4, vitB12:3.2, acik:82, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1220, ad:"Ton Baligi (Konserve, Sade)", marka:"",kal:109, pro:24, karb:0, yag:1, lif:0, sod:320, demir:1.3, kals:10, vitC:0, vitD:3.1, vitB12:2.5, acik:80, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1221, ad:"Ringa Baligi (Islenmis)", marka:"",kal:262, pro:18, karb:0, yag:21, lif:0, sod:870, demir:1.1, kals:68, vitC:0, vitD:5.1, vitB12:13.7, acik:78, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1222, ad:"Akya (Izgara)", marka:"",kal:168, pro:22, karb:0, yag:9, lif:0, sod:60, demir:0.6, kals:14, vitC:0, vitD:7.5, vitB12:3.8, acik:78, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1223, ad:"Iskorpit (Firin)", marka:"",kal:97, pro:18, karb:0, yag:2.5, lif:0, sod:68, demir:0.5, kals:50, vitC:0, vitD:4.2, vitB12:2.5, acik:80, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1224, ad:"Sazan (Kizartma)", marka:"",kal:235, pro:20, karb:8, yag:14, lif:0.5, sod:280, demir:0.9, kals:35, vitC:0, vitD:4.8, vitB12:2.8, acik:72, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:1225, ad:"Levrek Buharda (Tam Balik)", marka:"",kal:97, pro:19, karb:0, yag:2, lif:0, sod:63, demir:0.3, kals:12, vitC:0, vitD:5.5, vitB12:3.8, acik:82, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1226, ad:"Hamsi Tava (Misir Unlu)", marka:"",kal:210, pro:17, karb:10, yag:11, lif:1, sod:290, demir:1.5, kals:45, vitC:0, vitD:4.2, vitB12:4.5, acik:68, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:1227, ad:"Midye (Haşlanmış)", marka:"",kal:86, pro:12, karb:4, yag:2.2, lif:0, sod:290, demir:3.9, kals:26, vitC:8, vitD:0.3, vitB12:12.0, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1228, ad:"Karides (Izgara)", marka:"",kal:99, pro:21, karb:0.9, yag:1.7, lif:0, sod:111, demir:0.5, kals:52, vitC:0, vitD:0.1, vitB12:1.0, acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1229, ad:"Istakoz (Haşlanmış)", marka:"",kal:98, pro:21, karb:1.3, yag:0.6, lif:0, sod:380, demir:0.4, kals:61, vitC:0, vitD:0.1, vitB12:1.4, acik:80, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1230, ad:"Yengeç (Buharda)", marka:"",kal:97, pro:19, karb:0, yag:1.8, lif:0, sod:395, demir:0.7, kals:89, vitC:3.5, vitD:0.1, vitB12:9.0, acik:78, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1231, ad:"Dana Bonfile (Izgara, 150g)", marka:"",kal:330, pro:40, karb:0, yag:18, lif:0, sod:65, demir:3.0, kals:20, vitC:0, vitD:0, vitB12:2.8, acik:88, por:150, aclik:"4-5 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1232, ad:"Dana Antrikot (Izgara)", marka:"",kal:285, pro:26, karb:0, yag:20, lif:0, sod:68, demir:2.5, kals:14, vitC:0, vitD:0, vitB12:2.2, acik:85, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1233, ad:"Kuzu Sis Kebap", marka:"",kal:255, pro:22, karb:0, yag:18, lif:0, sod:72, demir:2.0, kals:14, vitC:0, vitD:0, vitB12:2.5, acik:82, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1234, ad:"Tavuk Gogus (Firin)", marka:"",kal:165, pro:31, karb:0, yag:3.6, lif:0, sod:74, demir:0.9, kals:15, vitC:0, vitD:0.1, vitB12:0.3, acik:85, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1235, ad:"Tavuk Gogus (Haşlanmış)", marka:"",kal:150, pro:30, karb:0, yag:3, lif:0, sod:72, demir:0.8, kals:14, vitC:0, vitD:0.1, vitB12:0.3, acik:85, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1236, ad:"Hindi Göğsü (Fırın)", marka:"",kal:135, pro:30, karb:0, yag:1.5, lif:0, sod:58, demir:1.2, kals:14, vitC:0, vitD:0.1, vitB12:0.3, acik:85, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1237, ad:"Ördek But (Firin)", marka:"",kal:337, pro:19, karb:0, yag:29, lif:0, sod:74, demir:2.7, kals:13, vitC:0, vitD:0.2, vitB12:0.4, acik:78, por:150, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:1238, ad:"Sucuk (100g)", marka:"Namet",kal:460, pro:18, karb:2, yag:42, lif:0, sod:1420, demir:2.5, kals:18, vitC:0, vitD:0, vitB12:1.2, acik:28, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:0.5 },
  { id:1239, ad:"Salam (100g)", marka:"",kal:290, pro:14, karb:2.5, yag:25, lif:0, sod:1280, demir:1.5, kals:10, vitC:0, vitD:0, vitB12:0.8, acik:22, por:100, aclik:"1 saat", onay:true, kat:"Protein", yildiz:0.5 },
  { id:1240, ad:"Jambon (Tavuk, 100g)", marka:"Banvit",kal:115, pro:17, karb:2.5, yag:4, lif:0, sod:980, demir:0.8, kals:12, vitC:0, vitD:0, vitB12:0.3, acik:45, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:1.5 },
  { id:1241, ad:"Eksi Hamur Ekmegi", marka:"",kal:260, pro:8, karb:50, yag:2, lif:3, sod:430, demir:2.5, kals:25, vitC:0, vitD:0, vitB12:0, acik:45, por:80, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:4 },
  { id:1242, ad:"Çavdar Ekmegi (Dilim)", marka:"",kal:210, pro:6, karb:40, yag:2.5, lif:7, sod:390, demir:2.5, kals:23, vitC:0, vitD:0, vitB12:0, acik:55, por:65, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:4.5 },
  { id:1243, ad:"Spelta Ekmegi", marka:"",kal:240, pro:9, karb:46, yag:3, lif:5, sod:380, demir:2.8, kals:25, vitC:0, vitD:0, vitB12:0, acik:50, por:70, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:4.5 },
  { id:1244, ad:"Glutensiz Ekmek", marka:"Schar",kal:250, pro:3, karb:52, yag:3.5, lif:2.5, sod:420, demir:1.5, kals:10, vitC:0, vitD:0, vitB12:0, acik:30, por:75, aclik:"30-60 dk", onay:true, kat:"Tahil", yildiz:2 },
  { id:1245, ad:"Yulaf Kraker", marka:"Nairns",kal:420, pro:9, karb:68, yag:12, lif:8, sod:450, demir:3.0, kals:35, vitC:0, vitD:0, vitB12:0, acik:50, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:4.5 },
  { id:1246, ad:"Dondurma Wafer Rulo", marka:"Algida",kal:155, pro:2, karb:20, yag:7.5, lif:0.3, sod:55, demir:0.2, kals:50, vitC:0, vitD:0.1, vitB12:0.1, acik:8, por:50, aclik:"—", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:1247, ad:"Çikolata Fondue (2 k.k.)", marka:"",kal:155, pro:1.5, karb:18, yag:9, lif:1, sod:12, demir:1.5, kals:15, vitC:0, vitD:0, vitB12:0, acik:8, por:30, aclik:"—", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:1248, ad:"Çilek Cheesecake (Dilim)", marka:"",kal:380, pro:7, karb:42, yag:21, lif:1, sod:280, demir:0.8, kals:100, vitC:5, vitD:0.2, vitB12:0.3, acik:14, por:120, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:1249, ad:"Tiramisu (Dilim)", marka:"",kal:350, pro:6, karb:36, yag:21, lif:0.5, sod:120, demir:1.0, kals:70, vitC:0.2, vitD:0.3, vitB12:0.3, acik:12, por:120, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:1250, ad:"Muzlu Kek (Ev)", marka:"",kal:310, pro:5, karb:48, yag:12, lif:2, sod:180, demir:1.0, kals:20, vitC:2, vitD:0.2, vitB12:0.1, acik:18, por:80, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:2 },
  { id:1251, ad:"Kek (Limonlu Kremalı)", marka:"",kal:360, pro:4.5, karb:52, yag:16, lif:0.8, sod:220, demir:1.2, kals:30, vitC:3, vitD:0.2, vitB12:0.1, acik:14, por:80, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:1252, ad:"Kurabiye (Hayvani Yaglib)", marka:"",kal:480, pro:5, karb:68, yag:22, lif:1.5, sod:280, demir:1.5, kals:20, vitC:0, vitD:0, vitB12:0, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1253, ad:"Churros (Nutellali, 3 adet)", marka:"",kal:480, pro:6, karb:64, yag:23, lif:2, sod:310, demir:1.5, kals:25, vitC:0, vitD:0, vitB12:0, acik:12, por:120, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1254, ad:"Çilek (Taze)", marka:"",kal:32, pro:0.7, karb:7.7, yag:0.3, lif:2, sod:1, demir:0.4, kals:16, vitC:58.8, vitD:0, vitB12:0, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:1255, ad:"Böğürtlen (Taze)", marka:"",kal:43, pro:1.4, karb:10, yag:0.5, lif:5.3, sod:1, demir:0.6, kals:29, vitC:21, vitD:0, vitB12:0, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:1256, ad:"Ahududu (Taze)", marka:"",kal:52, pro:1.2, karb:12, yag:0.7, lif:6.5, sod:1, demir:0.7, kals:25, vitC:26.2, vitD:0, vitB12:0, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:1257, ad:"Yaban Mersini (Blueberry)", marka:"",kal:57, pro:0.7, karb:14, yag:0.3, lif:2.4, sod:1, demir:0.3, kals:6, vitC:9.7, vitD:0, vitB12:0, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:1258, ad:"Nar (Taze Taneler)", marka:"",kal:83, pro:1.7, karb:19, yag:1.2, lif:4, sod:3, demir:0.3, kals:10, vitC:10.2, vitD:0, vitB12:0, acik:45, por:100, aclik:"1 saat", onay:true, kat:"Meyve", yildiz:5 },
  { id:1259, ad:"Papaya (Taze)", marka:"",kal:43, pro:0.5, karb:11, yag:0.3, lif:1.7, sod:8, demir:0.3, kals:20, vitC:62, vitD:0, vitB12:0, acik:32, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:1260, ad:"Mango (Taze)", marka:"",kal:60, pro:0.8, karb:15, yag:0.4, lif:1.6, sod:1, demir:0.2, kals:11, vitC:36.4, vitD:0, vitB12:0, acik:35, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:1261, ad:"Ananas (Taze)", marka:"",kal:50, pro:0.5, karb:13, yag:0.1, lif:1.4, sod:1, demir:0.3, kals:13, vitC:47.8, vitD:0, vitB12:0, acik:30, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:5 },
  { id:1262, ad:"Hindistancevizi Eti (Taze)", marka:"",kal:354, pro:3.3, karb:15, yag:33, lif:9, sod:20, demir:2.4, kals:14, vitC:3.3, vitD:0, vitB12:0, acik:42, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4 },
  { id:1263, ad:"Incir (Taze)", marka:"",kal:74, pro:0.8, karb:19, yag:0.3, lif:2.9, sod:1, demir:0.4, kals:35, vitC:2, vitD:0, vitB12:0, acik:32, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:4.5 },
  { id:1264, ad:"Kuru İncir", marka:"",kal:249, pro:3.3, karb:64, yag:0.9, lif:9.8, sod:10, demir:2.0, kals:162, vitC:1.2, vitD:0, vitB12:0, acik:28, por:100, aclik:"1-2 saat", onay:true, kat:"Meyve", yildiz:4 },
  { id:1265, ad:"Kuru Üzüm", marka:"",kal:299, pro:3.1, karb:79, yag:0.5, lif:3.7, sod:11, demir:1.9, kals:50, vitC:3.2, vitD:0, vitB12:0, acik:20, por:100, aclik:"30-60 dk", onay:true, kat:"Meyve", yildiz:3 },
  { id:1266, ad:"Brokoli (Buharda)", marka:"",kal:35, pro:2.4, karb:7, yag:0.4, lif:2.6, sod:41, demir:0.7, kals:47, vitC:89.2, vitD:0, vitB12:0, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1267, ad:"Karnabahar (Buharda)", marka:"",kal:25, pro:2, karb:5, yag:0.3, lif:2, sod:30, demir:0.4, kals:22, vitC:48.2, vitD:0, vitB12:0, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1268, ad:"Bezelye (Taze)", marka:"",kal:81, pro:5.4, karb:14, yag:0.4, lif:5.1, sod:5, demir:1.5, kals:25, vitC:40, vitD:0, vitB12:0, acik:60, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:1269, ad:"Brokoli Rabe (Fırın)", marka:"",kal:55, pro:3.2, karb:8.5, yag:2, lif:3.5, sod:180, demir:1.8, kals:90, vitC:20, vitD:0, vitB12:0, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1270, ad:"Tatlı Mısır (Haşlanmış)", marka:"",kal:96, pro:3.4, karb:21, yag:1.5, lif:2.4, sod:15, demir:0.5, kals:3, vitC:7, vitD:0, vitB12:0, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:3.5 },
  { id:1271, ad:"Tatlı Patates (Fırın)", marka:"",kal:90, pro:2, karb:21, yag:0.1, lif:3.3, sod:36, demir:0.7, kals:38, vitC:19.6, vitD:0, vitB12:0, acik:50, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:1272, ad:"Pancar (Haşlanmış)", marka:"",kal:44, pro:1.7, karb:10, yag:0.2, lif:2, sod:77, demir:0.8, kals:16, vitC:3.6, vitD:0, vitB12:0, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1273, ad:"Kırmızıbiber (Çiğ)", marka:"",kal:31, pro:1, karb:7.3, yag:0.3, lif:2.1, sod:4, demir:0.4, kals:7, vitC:127.7, vitD:0, vitB12:0, acik:38, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1274, ad:"Turp (Kırmızı, Çiğ)", marka:"",kal:16, pro:0.7, karb:3.4, yag:0.1, lif:1.6, sod:39, demir:0.3, kals:25, vitC:14.8, vitD:0, vitB12:0, acik:25, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:1275, ad:"Pırasa (Haşlanmış)", marka:"",kal:31, pro:0.8, karb:7.6, yag:0.2, lif:1.8, sod:10, demir:1.1, kals:35, vitC:8, vitD:0, vitB12:0, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1276, ad:"Mass Gainer Shake", marka:"Optimum",kal:650, pro:50, karb:90, yag:8, lif:5, sod:350, demir:3.5, kals:280, vitC:15, vitD:3.5, vitB12:6.0, acik:75, por:330, aclik:"3-4 saat", onay:true, kat:"Icecek", yildiz:4 },
  { id:1277, ad:"BCAA Tozu (1 porsiyon)", marka:"Scitec",kal:18, pro:5, karb:0, yag:0, lif:0, sod:110, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:20, por:10, aclik:"—", onay:true, kat:"Icecek", yildiz:4 },
  { id:1278, ad:"Kreatin Monohidrat (1 porsiyon)", marka:"Myprotein",kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:5, por:5, aclik:"—", onay:true, kat:"Diger", yildiz:5 },
  { id:1279, ad:"Pre-Workout C4 (1 porsiyon)", marka:"Cellucor",kal:30, pro:1, karb:5, yag:0, lif:0, sod:200, demir:0, kals:0, vitC:250, vitD:0, vitB12:0, acik:5, por:6, aclik:"—", onay:true, kat:"Icecek", yildiz:3 },
  { id:1280, ad:"Yoğun Yulaf (4 k.k.)", marka:"",kal:300, pro:10, karb:54, yag:5, lif:8, sod:0, demir:3.5, kals:30, vitC:0, vitD:0, vitB12:0, acik:65, por:100, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:5 },
  { id:1281, ad:"Smoothie Yeşil Detoks", marka:"",kal:120, pro:3, karb:26, yag:1, lif:4, sod:65, demir:2.5, kals:80, vitC:45, vitD:0, vitB12:0, acik:35, por:300, aclik:"30-60 dk", onay:true, kat:"Icecek", yildiz:5 },
  { id:1282, ad:"Smoothie Cilek Muz", marka:"",kal:165, pro:4, karb:38, yag:1.5, lif:3.5, sod:55, demir:0.8, kals:130, vitC:35, vitD:0.2, vitB12:0.3, acik:42, por:300, aclik:"30-60 dk", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:1283, ad:"Smoothie Mango Hindistancevizi", marka:"",kal:195, pro:2, karb:42, yag:5, lif:3, sod:40, demir:0.5, kals:25, vitC:28, vitD:0, vitB12:0, acik:32, por:300, aclik:"30-60 dk", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:1284, ad:"Kefir (Hazir, Sade)", marka:"Suttas",kal:52, pro:3.3, karb:4.8, yag:1.5, lif:0, sod:38, demir:0.1, kals:120, vitC:0, vitD:0.1, vitB12:0.4, acik:45, por:100, aclik:"30-60 dk", onay:true, kat:"Icecek", yildiz:5 },
  { id:1285, ad:"Kefir (Meyveli)", marka:"Activia",kal:85, pro:3, karb:13, yag:2, lif:0, sod:45, demir:0.1, kals:110, vitC:1, vitD:0.1, vitB12:0.3, acik:35, por:200, aclik:"30-60 dk", onay:true, kat:"Icecek", yildiz:3.5 },
  { id:1286, ad:"Sut + Banan Smoothie", marka:"",kal:185, pro:7, karb:35, yag:3.5, lif:2, sod:90, demir:0.4, kals:220, vitC:8, vitD:0.8, vitB12:0.5, acik:50, por:350, aclik:"1-2 saat", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:1287, ad:"Taze Portakal Suyu", marka:"",kal:45, pro:0.7, karb:10.4, yag:0.2, lif:0.2, sod:1, demir:0.2, kals:11, vitC:50, vitD:0, vitB12:0, acik:15, por:200, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:1288, ad:"Taze Domates Suyu", marka:"",kal:17, pro:0.8, karb:3.5, yag:0.2, lif:0.4, sod:10, demir:0.4, kals:10, vitC:22.7, vitD:0, vitB12:0, acik:15, por:200, aclik:"—", onay:true, kat:"Icecek", yildiz:5 },
  { id:1289, ad:"Taze Kereviz Suyu", marka:"",kal:14, pro:0.7, karb:3, yag:0.2, lif:0.7, sod:88, demir:0.2, kals:40, vitC:3.1, vitD:0, vitB12:0, acik:15, por:200, aclik:"—", onay:true, kat:"Icecek", yildiz:5 },
  { id:1290, ad:"Kombucha (Zencefil)", marka:"Health-Ade",kal:30, pro:0, karb:7, yag:0, lif:0, sod:15, demir:0, kals:0, vitC:0, vitD:0, vitB12:0, acik:8, por:355, aclik:"—", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:1291, ad:"Mercimek Corbasi (Ev)", marka:"",kal:98, pro:6, karb:16, yag:2, lif:4, sod:330, demir:2.2, kals:25, vitC:2, vitD:0, vitB12:0, acik:62, por:200, aclik:"1-2 saat", onay:true, kat:"Corba", yildiz:5 },
  { id:1292, ad:"Domates Corbasi (Ev)", marka:"",kal:65, pro:2, karb:11, yag:2, lif:2.5, sod:340, demir:0.8, kals:20, vitC:15, vitD:0, vitB12:0, acik:42, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:4.5 },
  { id:1293, ad:"Kremali Brokoli Corbasi", marka:"",kal:115, pro:4.5, karb:10, yag:7, lif:3.5, sod:380, demir:0.8, kals:80, vitC:35, vitD:0, vitB12:0.1, acik:55, por:200, aclik:"1-2 saat", onay:true, kat:"Corba", yildiz:5 },
  { id:1294, ad:"Mısır Corbasi", marka:"",kal:88, pro:2.5, karb:16, yag:2.5, lif:1.5, sod:360, demir:0.4, kals:12, vitC:5, vitD:0, vitB12:0, acik:42, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:3 },
  { id:1295, ad:"Trabzon Lahana Corbasi", marka:"",kal:72, pro:4, karb:10, yag:2, lif:3, sod:320, demir:0.8, kals:80, vitC:22, vitD:0, vitB12:0, acik:52, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:5 },
  { id:1296, ad:"Pumpkin Spice Latte (Orta)", marka:"Starbucks",kal:380, pro:14, karb:52, yag:14, lif:0.5, sod:240, demir:0.2, kals:400, vitC:2, vitD:3.5, vitB12:1.2, acik:28, por:473, aclik:"30-60 dk", onay:true, kat:"Icecek", yildiz:1.5 },
  { id:1297, ad:"Starbucks Caramel Macchiato", marka:"Starbucks",kal:250, pro:10, karb:33, yag:9, lif:0, sod:150, demir:0.2, kals:350, vitC:0, vitD:2.5, vitB12:0.8, acik:28, por:354, aclik:"30-60 dk", onay:true, kat:"Icecek", yildiz:1.5 },
  { id:1298, ad:"Tim Hortons Double Double", marka:"Tim Hortons",kal:210, pro:4, karb:24, yag:11, lif:0, sod:80, demir:0, kals:130, vitC:0, vitD:0.5, vitB12:0.3, acik:18, por:355, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:1 },
  { id:1299, ad:"Türk Kahvesi (Sade)", marka:"",kal:4, pro:0.2, karb:0.8, yag:0, lif:0, sod:1, demir:0, kals:2, vitC:0, vitD:0, vitB12:0, acik:5, por:60, aclik:"—", onay:true, kat:"Icecek", yildiz:4 },
  { id:1300, ad:"Türk Kahvesi (Sekerli)", marka:"",kal:38, pro:0.2, karb:9.5, yag:0, lif:0, sod:1, demir:0, kals:2, vitC:0, vitD:0, vitB12:0, acik:5, por:60, aclik:"—", onay:true, kat:"Icecek", yildiz:2 },
  { id:1301, ad:"Yaprak Sarma (Kiymali, Sos)", marka:"",kal:205, pro:12, karb:18, yag:10, lif:2, sod:480, demir:2.0, kals:40, vitC:5, vitD:0, vitB12:0.8, acik:65, por:150, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:3.5 },
  { id:1302, ad:"Salca Kofte", marka:"",kal:260, pro:20, karb:10, yag:16, lif:1.5, sod:560, demir:2.8, kals:35, vitC:5, vitD:0, vitB12:1.2, acik:68, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:1303, ad:"Hamsi Tuzlamasi (Karadeniz)", marka:"",kal:148, pro:20, karb:0, yag:7.5, lif:0, sod:2800, demir:1.0, kals:45, vitC:0, vitD:4.2, vitB12:4.5, acik:72, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:2 },
  { id:1304, ad:"Pastirma (Ince Dilim)", marka:"Cumhuriyet",kal:380, pro:25, karb:1, yag:32, lif:0, sod:2100, demir:3.5, kals:20, vitC:0, vitD:0, vitB12:2.0, acik:30, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:1 },
  { id:1305, ad:"Kavurma (Dana)", marka:"",kal:310, pro:24, karb:0, yag:24, lif:0, sod:620, demir:2.8, kals:18, vitC:0, vitD:0, vitB12:2.0, acik:78, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:1306, ad:"Konya Etli Ekmek", marka:"",kal:380, pro:20, karb:44, yag:14, lif:2, sod:680, demir:3.0, kals:40, vitC:1, vitD:0, vitB12:1.0, acik:58, por:220, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:2.5 },
  { id:1307, ad:"Pide (Kiymali, Tam)", marka:"",kal:650, pro:32, karb:82, yag:22, lif:4, sod:980, demir:4.5, kals:80, vitC:2, vitD:0, vitB12:1.5, acik:60, por:350, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:1308, ad:"Pide (Peynirli, Tam)", marka:"",kal:580, pro:24, karb:78, yag:22, lif:3, sod:1050, demir:2.5, kals:420, vitC:0, vitD:0.3, vitB12:0.8, acik:52, por:320, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:1309, ad:"Adana Kebap (Tam Porsiyon)", marka:"",kal:420, pro:32, karb:2, yag:32, lif:0.5, sod:860, demir:3.5, kals:25, vitC:0.5, vitD:0, vitB12:2.0, acik:78, por:200, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:1310, ad:"Urfa Kebap (Tam Porsiyon)", marka:"",kal:390, pro:30, karb:2, yag:30, lif:0.5, sod:780, demir:3.2, kals:22, vitC:0.5, vitD:0, vitB12:1.8, acik:78, por:200, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:1311, ad:"Sushi Nigiri Somon (2 adet)", marka:"",kal:140, pro:9, karb:20, yag:3, lif:0.5, sod:350, demir:0.5, kals:15, vitC:0, vitD:5.5, vitB12:2.0, acik:45, por:80, aclik:"30-60 dk", onay:true, kat:"Protein", yildiz:4.5 },
  { id:1312, ad:"Sushi Maki (8 adet)", marka:"",kal:220, pro:7, karb:40, yag:3, lif:2, sod:580, demir:0.8, kals:18, vitC:2, vitD:0.5, vitB12:0.5, acik:38, por:160, aclik:"30-60 dk", onay:true, kat:"Tahil", yildiz:3.5 },
  { id:1313, ad:"Pad Thai (Karides)", marka:"",kal:360, pro:18, karb:52, yag:9, lif:2.5, sod:980, demir:1.5, kals:60, vitC:3, vitD:0.1, vitB12:0.8, acik:55, por:300, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:3 },
  { id:1314, ad:"Pho Ga (Tavuklu Noodle Corbasi)", marka:"",kal:280, pro:22, karb:35, yag:5, lif:1.5, sod:980, demir:1.8, kals:30, vitC:4, vitD:0.1, vitB12:0.3, acik:65, por:400, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:1315, ad:"Nasi Goreng (Endonezya)", marka:"",kal:380, pro:14, karb:55, yag:13, lif:2, sod:880, demir:2.0, kals:40, vitC:4, vitD:0.5, vitB12:0.5, acik:55, por:300, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:3 },
  { id:1316, ad:"Butter Chicken (Hint)", marka:"",kal:295, pro:25, karb:14, yag:16, lif:2, sod:650, demir:2.0, kals:40, vitC:5, vitD:0.1, vitB12:0.4, acik:68, por:250, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1317, ad:"Dhal (Mercimek Hint Currysi)", marka:"",kal:165, pro:9.5, karb:25, yag:4, lif:7.5, sod:380, demir:3.2, kals:35, vitC:4, vitD:0, vitB12:0, acik:68, por:250, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1318, ad:"Tom Yum Corbasi", marka:"",kal:95, pro:8, karb:9, yag:3.5, lif:1.5, sod:820, demir:1.2, kals:30, vitC:8, vitD:0.2, vitB12:0.5, acik:52, por:300, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:4.5 },
  { id:1319, ad:"Kimchi (Fermente Lahana)", marka:"",kal:15, pro:1.1, karb:2.4, yag:0.5, lif:1.6, sod:890, demir:0.3, kals:33, vitC:18, vitD:0, vitB12:0, acik:22, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:1320, ad:"Tacos (2 Adet, Tavuklu)", marka:"",kal:380, pro:22, karb:42, yag:14, lif:4, sod:720, demir:2.5, kals:80, vitC:8, vitD:0.1, vitB12:0.3, acik:52, por:160, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:3.5 },
  { id:1321, ad:"Mozaik Pasta", marka:"",kal:420, pro:5.5, karb:52, yag:22, lif:2, sod:110, demir:2.0, kals:60, vitC:0, vitD:0.1, vitB12:0.1, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:1322, ad:"Çikolatalı Sufle", marka:"",kal:350, pro:8.5, karb:40, yag:19, lif:2, sod:160, demir:2.5, kals:65, vitC:0, vitD:0.4, vitB12:0.3, acik:14, por:130, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:1323, ad:"Sütlaç (Soğuk)", marka:"",kal:130, pro:4, karb:22, yag:3.5, lif:0.2, sod:65, demir:0.1, kals:115, vitC:0, vitD:0.3, vitB12:0.4, acik:35, por:150, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:2.5 },
  { id:1324, ad:"Kazandibi", marka:"",kal:195, pro:5, karb:30, yag:7, lif:0.3, sod:80, demir:0.2, kals:140, vitC:0, vitD:0.3, vitB12:0.4, acik:32, por:150, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:2 },
  { id:1325, ad:"Keşkül", marka:"",kal:175, pro:4.5, karb:27, yag:6, lif:1, sod:75, demir:0.5, kals:120, vitC:0, vitD:0.3, vitB12:0.3, acik:28, por:150, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:2 },
  { id:1326, ad:"Trileçe", marka:"",kal:305, pro:6.5, karb:38, yag:15, lif:0, sod:145, demir:0.3, kals:160, vitC:0.5, vitD:0.4, vitB12:0.4, acik:14, por:150, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:1327, ad:"Ayva Tatlisi (Kaymakli)", marka:"",kal:220, pro:2, karb:38, yag:8, lif:3.5, sod:50, demir:0.4, kals:60, vitC:8, vitD:0.1, vitB12:0.1, acik:22, por:150, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:3 },
  { id:1328, ad:"Armut Kompostosu", marka:"",kal:85, pro:0.4, karb:22, yag:0.1, lif:2.5, sod:10, demir:0.2, kals:8, vitC:4, vitD:0, vitB12:0, acik:18, por:200, aclik:"—", onay:true, kat:"Atistirmalik", yildiz:3 },
  { id:1329, ad:"Visne Kompostosu", marka:"",kal:75, pro:0.5, karb:19, yag:0.2, lif:1, sod:5, demir:0.3, kals:12, vitC:10, vitD:0, vitB12:0, acik:15, por:200, aclik:"—", onay:true, kat:"Atistirmalik", yildiz:3.5 },
  { id:1330, ad:"Elma Kompostosu", marka:"",kal:68, pro:0.2, karb:18, yag:0.1, lif:1.5, sod:8, demir:0.1, kals:6, vitC:2, vitD:0, vitB12:0, acik:12, por:200, aclik:"—", onay:true, kat:"Atistirmalik", yildiz:3 },
  { id:1331, ad:"Kabak Tatlisi (Tahinli)", marka:"",kal:260, pro:3.5, karb:42, yag:10, lif:3, sod:30, demir:1.5, kals:80, vitC:5, vitD:0, vitB12:0, acik:18, por:150, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:3 },
  { id:1332, ad:"Zerde (Saffron Pudding)", marka:"",kal:155, pro:1, karb:38, yag:0.5, lif:0.5, sod:15, demir:0.5, kals:10, vitC:0, vitD:0, vitB12:0, acik:10, por:150, aclik:"—", onay:true, kat:"Atistirmalik", yildiz:2 },
  { id:1333, ad:"Dondurma Sandwich", marka:"",kal:320, pro:4.5, karb:45, yag:14, lif:0.8, sod:190, demir:0.5, kals:80, vitC:0, vitD:0.3, vitB12:0.2, acik:10, por:110, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:1334, ad:"Tofu (Sert, Izgara)", marka:"",kal:144, pro:15, karb:3.5, yag:9, lif:0.3, sod:15, demir:2.7, kals:350, vitC:0.1, vitD:0, vitB12:0, acik:52, por:150, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:1335, ad:"Tempeh (Izgara)", marka:"",kal:193, pro:19, karb:9, yag:11, lif:4.1, sod:9, demir:2.7, kals:111, vitC:0, vitD:0, vitB12:0, acik:62, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1336, ad:"Seitan (Buğday Proteini)", marka:"",kal:370, pro:75, karb:14, yag:2, lif:0, sod:960, demir:5.2, kals:142, vitC:0, vitD:0, vitB12:0, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:1337, ad:"Vegan Burger (Beyond Meat)", marka:"Beyond Meat",kal:260, pro:20, karb:5, yag:18, lif:2, sod:390, demir:4.1, kals:40, vitC:0, vitD:0, vitB12:0, acik:65, por:113, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1338, ad:"Jackfruit Tacos (Vegan)", marka:"",kal:195, pro:3, karb:42, yag:4, lif:5, sod:480, demir:1.0, kals:22, vitC:8, vitD:0, vitB12:0, acik:42, por:200, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:4 },
  { id:1339, ad:"Nüks Burgers (Mercimekli)", marka:"",kal:210, pro:10, karb:30, yag:6, lif:6.5, sod:420, demir:2.8, kals:35, vitC:2, vitD:0, vitB12:0, acik:55, por:130, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:1340, ad:"Nohut Köftesi (Falafel)", marka:"",kal:333, pro:13, karb:32, yag:18, lif:5, sod:580, demir:3.4, kals:55, vitC:5.1, vitD:0, vitB12:0, acik:60, por:150, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1341, ad:"Chips Ahoy Orijinal", marka:"Chips Ahoy",kal:480, pro:5, karb:68, yag:22, lif:1.5, sod:380, demir:2.5, kals:10, vitC:0, vitD:0, vitB12:0, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1342, ad:"Doritos Cool Ranch", marka:"Doritos",kal:490, pro:7, karb:60, yag:25, lif:3.5, sod:640, demir:1.5, kals:50, vitC:0, vitD:0, vitB12:0, acik:15, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1343, ad:"Cheetos Puffs", marka:"Cheetos",kal:540, pro:7, karb:60, yag:31, lif:1.5, sod:820, demir:1.5, kals:10, vitC:0, vitD:0, vitB12:0, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0 },
  { id:1344, ad:"Ritz Kraker", marka:"Ritz",kal:480, pro:7, karb:66, yag:21, lif:2, sod:780, demir:2.5, kals:30, vitC:0, vitD:0, vitB12:0, acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:1345, ad:"Lay's Klasik Tuzlu", marka:"Lays",kal:535, pro:7, karb:52, yag:34, lif:4.5, sod:490, demir:1.5, kals:18, vitC:22, vitD:0, vitB12:0, acik:15, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:1346, ad:"Pringles Krem Peynirli", marka:"Pringles",kal:520, pro:6.5, karb:55, yag:31, lif:4, sod:640, demir:1.5, kals:35, vitC:0, vitD:0, vitB12:0, acik:14, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1347, ad:"M&Ms Fistikli", marka:"Mars",kal:491, pro:10, karb:63, yag:24, lif:2.5, sod:75, demir:1.5, kals:80, vitC:1, vitD:0.2, vitB12:0, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:1348, ad:"Snickers (55g)", marka:"Mars",kal:265, pro:4.5, karb:35, yag:13, lif:1, sod:105, demir:0.5, kals:55, vitC:0.5, vitD:0, vitB12:0, acik:12, por:55, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1349, ad:"Twix (50g)", marka:"Mars",kal:250, pro:2.5, karb:32, yag:13, lif:0.5, sod:105, demir:0.5, kals:40, vitC:0, vitD:0, vitB12:0, acik:8, por:50, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1350, ad:"Doya Protein Kasesi (1000 Kcal Hedef)", marka:"Doya",kal:995, pro:85, karb:95, yag:28, lif:18, sod:680, demir:9.0, kals:380, vitC:65, vitD:3.5, vitB12:3.5, acik:95, por:600, aclik:"5-6 saat", onay:true, kat:"Hazir Yemek", yildiz:5 },
  { id:1351, ad:"Beyin Tava (Kuzu)", marka:"",kal:185, pro:12, karb:0, yag:14, lif:0, sod:180, demir:1.8, kals:12, vitC:0, vitD:0.5, vitB12:2.5, acik:60, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:2 },
  { id:1352, ad:"Ciğer Tava (Dana)", marka:"",kal:175, pro:26, karb:3, yag:6, lif:0, sod:80, demir:17.9, kals:10, vitC:2.5, vitD:1.1, vitB12:59.3, acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:1353, ad:"Böbrek Sote (Kuzu)", marka:"",kal:112, pro:20, karb:0, yag:3.5, lif:0, sod:180, demir:5.0, kals:14, vitC:10.0, vitD:0.5, vitB12:27.5, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:1354, ad:"Dana Dil (Haşlanmış)", marka:"",kal:280, pro:21, karb:0, yag:22, lif:0, sod:110, demir:3.2, kals:6, vitC:2, vitD:0.4, vitB12:5.5, acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:1355, ad:"Tavuk Kalp (Izgara)", marka:"",kal:185, pro:26, karb:0.1, yag:9, lif:0, sod:90, demir:9.9, kals:10, vitC:3.5, vitD:0.5, vitB12:7.3, acik:75, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:1356, ad:"Tavuk Kara Ciğer", marka:"",kal:119, pro:17, karb:0.9, yag:5, lif:0, sod:71, demir:9.0, kals:11, vitC:13.4, vitD:1.1, vitB12:16.6, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1357, ad:"Sakatat Şiş (Karaciğer+Böbrek)", marka:"",kal:155, pro:22, karb:1, yag:7, lif:0, sod:135, demir:11.2, kals:12, vitC:6, vitD:0.8, vitB12:35.0, acik:72, por:120, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:1358, ad:"Beyti Sarma", marka:"",kal:390, pro:28, karb:22, yag:22, lif:2, sod:780, demir:3.2, kals:80, vitC:2, vitD:0, vitB12:1.8, acik:65, por:200, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:3 },
  { id:1359, ad:"Tantuni (Tam Porsiyon)", marka:"",kal:350, pro:24, karb:32, yag:14, lif:2.5, sod:680, demir:2.5, kals:40, vitC:3, vitD:0, vitB12:1.2, acik:65, por:200, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:3 },
  { id:1360, ad:"Lahmacun (1 Adet Ince)", marka:"",kal:195, pro:10, karb:26, yag:7, lif:2, sod:380, demir:2.0, kals:25, vitC:2, vitD:0, vitB12:0.5, acik:40, por:110, aclik:"30-60 dk", onay:true, kat:"Hazir Yemek", yildiz:2.5 },
  { id:1361, ad:"Sac Kavurma (Dana)", marka:"",kal:320, pro:26, karb:5, yag:22, lif:1, sod:520, demir:3.0, kals:30, vitC:5, vitD:0, vitB12:2.0, acik:78, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:1362, ad:"Sac Kavurma (Tavuk)", marka:"",kal:265, pro:28, karb:6, yag:15, lif:1.5, sod:480, demir:1.2, kals:25, vitC:8, vitD:0.1, vitB12:0.3, acik:78, por:200, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1363, ad:"Tas Kebabı", marka:"",kal:285, pro:22, karb:12, yag:18, lif:2.5, sod:480, demir:2.8, kals:40, vitC:8, vitD:0, vitB12:1.5, acik:72, por:200, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:3.5 },
  { id:1364, ad:"Çökertme Kebabı", marka:"",kal:420, pro:28, karb:30, yag:22, lif:2, sod:680, demir:2.5, kals:60, vitC:5, vitD:0.1, vitB12:1.5, acik:68, por:300, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:3 },
  { id:1365, ad:"Kuzu Tandır", marka:"",kal:310, pro:30, karb:0, yag:22, lif:0, sod:72, demir:2.2, kals:16, vitC:0, vitD:0.1, vitB12:2.5, acik:85, por:200, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1366, ad:"Kuzu Kapama", marka:"",kal:295, pro:24, karb:8, yag:20, lif:2, sod:520, demir:2.5, kals:35, vitC:4, vitD:0.1, vitB12:2.2, acik:78, por:250, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:3.5 },
  { id:1367, ad:"İskembe Corbasi", marka:"",kal:68, pro:7.5, karb:2.5, yag:3.2, lif:0, sod:450, demir:0.8, kals:20, vitC:0, vitD:0, vitB12:0.8, acik:52, por:200, aclik:"1-2 saat", onay:true, kat:"Corba", yildiz:2 },
  { id:1368, ad:"Kelle Paça Corbasi", marka:"",kal:88, pro:9, karb:2, yag:5, lif:0, sod:380, demir:1.5, kals:25, vitC:0, vitD:0, vitB12:1.0, acik:55, por:200, aclik:"1-2 saat", onay:true, kat:"Corba", yildiz:2 },
  { id:1369, ad:"Sütlü Pirinç Corbasi", marka:"",kal:82, pro:3, karb:13, yag:2, lif:0.3, sod:280, demir:0.2, kals:90, vitC:0, vitD:0.2, vitB12:0.2, acik:38, por:200, aclik:"30-60 dk", onay:true, kat:"Corba", yildiz:3 },
  { id:1370, ad:"Tarhana (Hazır Toz)", marka:"",kal:78, pro:4, karb:14, yag:1, lif:2.5, sod:340, demir:1.8, kals:28, vitC:3, vitD:0, vitB12:0, acik:60, por:200, aclik:"1-2 saat", onay:true, kat:"Corba", yildiz:4.5 },
  { id:1371, ad:"Noodle Soup (Cup, Tavuk)", marka:"Nongshim",kal:310, pro:7, karb:46, yag:12, lif:2, sod:1550, demir:2.0, kals:12, vitC:0, vitD:0, vitB12:0, acik:22, por:75, aclik:"30 dk", onay:true, kat:"Tahil", yildiz:0 },
  { id:1372, ad:"Yufka (Çiğ, 1 Yaprak)", marka:"",kal:310, pro:8, karb:62, yag:3.5, lif:2, sod:280, demir:2.0, kals:15, vitC:0, vitD:0, vitB12:0, acik:30, por:100, aclik:"1 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:1373, ad:"Börek Yufkası (Hazır)", marka:"",kal:330, pro:9, karb:66, yag:3.5, lif:2.5, sod:380, demir:2.2, kals:18, vitC:0, vitD:0, vitB12:0, acik:28, por:100, aclik:"1 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:1374, ad:"Milföy Hamuru (Pişmiş)", marka:"",kal:540, pro:7, karb:44, yag:38, lif:1.5, sod:390, demir:1.5, kals:20, vitC:0, vitD:0.1, vitB12:0.1, acik:18, por:100, aclik:"30-60 dk", onay:true, kat:"Tahil", yildiz:0.5 },
  { id:1375, ad:"Pizza Hamuru (Pişmiş)", marka:"",kal:270, pro:9, karb:52, yag:3.5, lif:2.5, sod:450, demir:3.0, kals:25, vitC:0, vitD:0, vitB12:0, acik:38, por:100, aclik:"1 saat", onay:true, kat:"Tahil", yildiz:2.5 },
  { id:1376, ad:"Fırın Patates (Zeytinyağlı)", marka:"",kal:110, pro:2.5, karb:20, yag:3.5, lif:2.5, sod:180, demir:0.8, kals:10, vitC:12, vitD:0, vitB12:0, acik:40, por:150, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4 },
  { id:1377, ad:"Patates Graten", marka:"",kal:220, pro:7, karb:25, yag:11, lif:2, sod:380, demir:0.8, kals:130, vitC:10, vitD:0.2, vitB12:0.3, acik:42, por:150, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:2.5 },
  { id:1378, ad:"Patates Kızartması (Ev, İnce)", marka:"",kal:312, pro:3.8, karb:38, yag:17, lif:3.5, sod:210, demir:0.9, kals:12, vitC:10, vitD:0, vitB12:0, acik:30, por:150, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:1 },
  { id:1379, ad:"Mücver (Kabak Peynirli)", marka:"",kal:165, pro:8, karb:12, yag:10, lif:1.5, sod:380, demir:1.0, kals:100, vitC:8, vitD:0.3, vitB12:0.3, acik:52, por:100, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4 },
  { id:1380, ad:"Karışık Izgara (Restoran)", marka:"",kal:580, pro:48, karb:5, yag:42, lif:0.5, sod:780, demir:4.5, kals:35, vitC:0, vitD:0.1, vitB12:3.5, acik:88, por:300, aclik:"4-5 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:1381, ad:"Sebze Sote (Karışık)", marka:"",kal:95, pro:3, karb:12, yag:5, lif:4, sod:220, demir:1.2, kals:45, vitC:28, vitD:0, vitB12:0, acik:50, por:150, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1382, ad:"Çiğ Köfte (Porsiyonluk)", marka:"Asyum",kal:210, pro:6.5, karb:38, yag:5, lif:7, sod:680, demir:3.5, kals:35, vitC:4, vitD:0, vitB12:0, acik:48, por:140, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:2.5 },
  { id:1383, ad:"Kısır (Küçük Kase)", marka:"",kal:145, pro:3.5, karb:26, yag:4.5, lif:4, sod:260, demir:1.5, kals:28, vitC:12, vitD:0, vitB12:0, acik:52, por:150, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:5 },
  { id:1384, ad:"Taze Fasulye Zeytinyağlı", marka:"",kal:70, pro:1.8, karb:9, yag:3.5, lif:3, sod:170, demir:0.8, kals:32, vitC:12, vitD:0, vitB12:0, acik:48, por:150, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1385, ad:"Semizotu Salatası", marka:"",kal:50, pro:1.8, karb:7, yag:2, lif:1.5, sod:140, demir:1.8, kals:65, vitC:21, vitD:0, vitB12:0, acik:40, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1386, ad:"Tarator (Yoğurtlu Ceviz)", marka:"",kal:165, pro:5, karb:8, yag:13, lif:1, sod:200, demir:0.8, kals:100, vitC:1, vitD:0.1, vitB12:0.3, acik:50, por:100, aclik:"1-2 saat", onay:true, kat:"Diger", yildiz:3.5 },
  { id:1387, ad:"Meze Tabağı (Karışık)", marka:"",kal:280, pro:8, karb:18, yag:22, lif:4, sod:680, demir:2.5, kals:80, vitC:8, vitD:0.1, vitB12:0.2, acik:45, por:200, aclik:"1-2 saat", onay:true, kat:"Diger", yildiz:3.5 },
  { id:1388, ad:"Patlıcan Ezmesi", marka:"",kal:75, pro:2, karb:8, yag:4.5, lif:2.5, sod:160, demir:0.5, kals:18, vitC:2, vitD:0, vitB12:0, acik:42, por:100, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:1389, ad:"Atom (Sarımsaklı Yoğurt)", marka:"",kal:95, pro:5, karb:7, yag:5.5, lif:0.5, sod:250, demir:0.2, kals:120, vitC:1, vitD:0.1, vitB12:0.3, acik:50, por:100, aclik:"30-60 dk", onay:true, kat:"Sut Urunu", yildiz:4 },
  { id:1390, ad:"Acılı Ezme", marka:"",kal:45, pro:1.5, karb:8, yag:1.5, lif:2.5, sod:280, demir:0.8, kals:15, vitC:18, vitD:0, vitB12:0, acik:35, por:100, aclik:"—", onay:true, kat:"Diger", yildiz:4.5 },
  { id:1391, ad:"Gavurdağı Salatası", marka:"",kal:85, pro:2, karb:10, yag:5, lif:3, sod:220, demir:0.8, kals:22, vitC:18, vitD:0, vitB12:0, acik:42, por:150, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:5 },
  { id:1392, ad:"Sirkeli Patlıcan Salatası", marka:"",kal:65, pro:1.5, karb:8, yag:3.5, lif:3, sod:180, demir:0.4, kals:12, vitC:3, vitD:0, vitB12:0, acik:40, por:150, aclik:"30-60 dk", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:1393, ad:"Kapuska (Etli Lahana)", marka:"",kal:145, pro:10, karb:10, yag:8, lif:3.5, sod:420, demir:1.8, kals:55, vitC:22, vitD:0, vitB12:0.8, acik:62, por:200, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:4 },
  { id:1394, ad:"Taze Soğan Salatası", marka:"",kal:32, pro:0.8, karb:7, yag:0.2, lif:2, sod:8, demir:0.4, kals:30, vitC:9, vitD:0, vitB12:0, acik:25, por:100, aclik:"—", onay:true, kat:"Sebze", yildiz:5 },
  { id:1395, ad:"Rokfor Soslu Biftek Salata", marka:"",kal:320, pro:28, karb:8, yag:20, lif:2.5, sod:580, demir:3.0, kals:120, vitC:5, vitD:0.1, vitB12:2.5, acik:75, por:250, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:1396, ad:"Caesar Salata (Tavuklu)", marka:"",kal:295, pro:22, karb:18, yag:17, lif:2.5, sod:680, demir:2.0, kals:120, vitC:6, vitD:0.3, vitB12:0.3, acik:62, por:250, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:1397, ad:"Nişasta (Patates, 1 yemek kasigi)", marka:"",kal:40, pro:0, karb:9.7, yag:0, lif:0.1, sod:1, demir:0, kals:1, vitC:0, vitD:0, vitB12:0, acik:5, por:10, aclik:"—", onay:true, kat:"Diger", yildiz:1 },
  { id:1398, ad:"Çöp Şiş", marka:"",kal:175, pro:20, karb:0, yag:10, lif:0, sod:380, demir:1.5, kals:10, vitC:0, vitD:0, vitB12:0.5, acik:70, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1399, ad:"Fistikli Kebap", marka:"",kal:360, pro:26, karb:5, yag:27, lif:1.5, sod:620, demir:2.8, kals:28, vitC:0, vitD:0, vitB12:1.8, acik:78, por:180, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:1400, ad:"Doya Günlük Sağlıklı Menü", marka:"Doya",kal:1800, pro:120, karb:200, yag:55, lif:30, sod:2000, demir:18, kals:800, vitC:90, vitD:10, vitB12:6, acik:95, por:1500, aclik:"tüm gün", onay:true, kat:"Hazir Yemek", yildiz:5 },
  { id:1401, ad:"Kıymalı Ispanak", marka:"",kal:165, pro:12, karb:8, yag:10, lif:3, sod:380, demir:3.5, kals:80, vitC:18, vitD:0, vitB12:0.8, acik:68, por:200, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:4.5 },
  { id:1402, ad:"Kıymalı Enginar", marka:"",kal:145, pro:10, karb:10, yag:8, lif:4, sod:340, demir:2.0, kals:45, vitC:8, vitD:0, vitB12:0.5, acik:65, por:200, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:5 },
  { id:1403, ad:"Kıymalı Patlıcan", marka:"",kal:180, pro:11, karb:10, yag:12, lif:3, sod:420, demir:1.8, kals:25, vitC:5, vitD:0, vitB12:0.5, acik:65, por:200, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:4 },
  { id:1404, ad:"Patatesli Yumurta (Sote)", marka:"",kal:230, pro:10, karb:26, yag:11, lif:2.5, sod:360, demir:1.8, kals:40, vitC:12, vitD:1.2, vitB12:0.6, acik:58, por:200, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:4 },
  { id:1405, ad:"Sucuklu Patates (Sote)", marka:"",kal:310, pro:12, karb:28, yag:18, lif:3, sod:780, demir:1.5, kals:25, vitC:10, vitD:0, vitB12:0.5, acik:48, por:200, aclik:"1-2 saat", onay:true, kat:"Hazir Yemek", yildiz:1.5 },
  { id:1406, ad:"Arpa Şehriyeli Pilav", marka:"",kal:200, pro:5, karb:40, yag:4, lif:2, sod:280, demir:1.0, kals:12, vitC:0, vitD:0, vitB12:0, acik:38, por:150, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:3 },
  { id:1407, ad:"Tas Fırında Patlıcan Kebabı", marka:"",kal:260, pro:16, karb:14, yag:16, lif:3.5, sod:480, demir:2.0, kals:35, vitC:10, vitD:0, vitB12:1.0, acik:68, por:200, aclik:"2-3 saat", onay:true, kat:"Hazir Yemek", yildiz:4 },
  { id:1408, ad:"Karnıyarık (Kıymasız)", marka:"",kal:130, pro:2, karb:14, yag:8.5, lif:3.5, sod:280, demir:0.8, kals:18, vitC:8, vitD:0, vitB12:0, acik:50, por:200, aclik:"1-2 saat", onay:true, kat:"Sebze", yildiz:4.5 },
  { id:1409, ad:"Mısır Lapası (Muhlama)", marka:"",kal:380, pro:14, karb:32, yag:22, lif:0.5, sod:580, demir:0.5, kals:280, vitC:0, vitD:0.3, vitB12:0.5, acik:42, por:200, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:1410, ad:"Kuymak (Trabzon)", marka:"",kal:410, pro:15, karb:30, yag:28, lif:0.5, sod:620, demir:0.5, kals:300, vitC:0, vitD:0.3, vitB12:0.5, acik:42, por:200, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:1.5 },
  { id:1411, ad:"Fırın Sütlaç (Görkemlisi)", marka:"",kal:210, pro:5.5, karb:32, yag:7.5, lif:0.2, sod:90, demir:0.2, kals:160, vitC:0, vitD:0.5, vitB12:0.5, acik:35, por:200, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:2.5 },
  { id:1412, ad:"Vezir Parmagi", marka:"",kal:480, pro:5.5, karb:62, yag:25, lif:1.5, sod:160, demir:1.5, kals:30, vitC:0, vitD:0, vitB12:0, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1413, ad:"Hanım Göbeği", marka:"",kal:430, pro:4.5, karb:60, yag:21, lif:1, sod:130, demir:1.2, kals:20, vitC:0, vitD:0, vitB12:0, acik:10, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1414, ad:"Kemalpaşa Tatlısı", marka:"",kal:315, pro:7, karb:48, yag:11, lif:0.5, sod:110, demir:0.5, kals:120, vitC:0, vitD:0.2, vitB12:0.2, acik:14, por:120, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:1415, ad:"Höşmerim", marka:"",kal:280, pro:8, karb:38, yag:12, lif:0.3, sod:180, demir:0.3, kals:140, vitC:0, vitD:0.3, vitB12:0.3, acik:22, por:150, aclik:"30-60 dk", onay:true, kat:"Sut Urunu", yildiz:2 },
  { id:1416, ad:"Şekerpare Syrup", marka:"",kal:395, pro:4, karb:62, yag:15, lif:0.8, sod:90, demir:1.0, kals:22, vitC:0, vitD:0, vitB12:0, acik:10, por:90, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1417, ad:"Dilber Dudağı", marka:"",kal:415, pro:5, karb:58, yag:19, lif:1, sod:120, demir:1.2, kals:25, vitC:0, vitD:0, vitB12:0, acik:10, por:90, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1418, ad:"Pelte (Şalgam Şerbeti)", marka:"",kal:65, pro:0.5, karb:16, yag:0.5, lif:0.3, sod:20, demir:0.2, kals:8, vitC:1, vitD:0, vitB12:0, acik:8, por:200, aclik:"—", onay:true, kat:"Icecek", yildiz:2.5 },
  { id:1419, ad:"Boza (Geleneksel)", marka:"Vefa",kal:75, pro:1.2, karb:17, yag:0.3, lif:1, sod:5, demir:0.5, kals:12, vitC:0, vitD:0, vitB12:0, acik:15, por:200, aclik:"30 dk", onay:true, kat:"Icecek", yildiz:3 },
  { id:1420, ad:"Şalgam Suyu (Sade)", marka:"",kal:18, pro:0.8, karb:4, yag:0.2, lif:1, sod:240, demir:0.5, kals:25, vitC:12, vitD:0, vitB12:0, acik:8, por:200, aclik:"—", onay:true, kat:"Icecek", yildiz:4 },
  { id:1421, ad:"Limonata (Ev, Şekersiz)", marka:"",kal:15, pro:0.1, karb:3.8, yag:0, lif:0.1, sod:1, demir:0, kals:5, vitC:15, vitD:0, vitB12:0, acik:5, por:250, aclik:"—", onay:true, kat:"Icecek", yildiz:4.5 },
  { id:1422, ad:"Limonata (Şekerli)", marka:"",kal:75, pro:0.1, karb:19, yag:0, lif:0.1, sod:1, demir:0, kals:5, vitC:12, vitD:0, vitB12:0, acik:5, por:250, aclik:"—", onay:true, kat:"Icecek", yildiz:2 },
  { id:1423, ad:"Tahin Pekmez", marka:"",kal:295, pro:4, karb:38, yag:15, lif:2.5, sod:30, demir:2.5, kals:90, vitC:0, vitD:0, vitB12:0, acik:28, por:60, aclik:"1-2 saat", onay:true, kat:"Diger", yildiz:3.5 },
  { id:1424, ad:"Mısır Ekmeği (Kepekli)", marka:"",kal:245, pro:7, karb:48, yag:3, lif:5, sod:320, demir:2.0, kals:12, vitC:0, vitD:0, vitB12:0, acik:45, por:80, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:4 },
  { id:1425, ad:"Protein Pancake (2 Adet)", marka:"",kal:280, pro:24, karb:28, yag:9, lif:3, sod:360, demir:2.5, kals:120, vitC:0, vitD:0.5, vitB12:0.5, acik:65, por:160, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:4.5 },
  { id:1426, ad:"Yüksek Proteinli Yoğurt (Skyr)", marka:"Arla",kal:62, pro:10, karb:4.5, yag:0.2, lif:0, sod:40, demir:0, kals:120, vitC:0, vitD:0.1, vitB12:0.5, acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:5 },
  { id:1427, ad:"İzlanda Yoğurdu Skyr (Meyveli)", marka:"Arla",kal:88, pro:9, karb:10, yag:0.3, lif:0.3, sod:45, demir:0, kals:115, vitC:1, vitD:0.1, vitB12:0.4, acik:50, por:150, aclik:"1-2 saat", onay:true, kat:"Sut Urunu", yildiz:4.5 },
  { id:1428, ad:"Tavuk Sote (Sarımsaklı Limonlu)", marka:"",kal:220, pro:30, karb:4, yag:10, lif:0.5, sod:380, demir:1.0, kals:18, vitC:5, vitD:0.1, vitB12:0.3, acik:80, por:200, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1429, ad:"Portakallı Ördek Göğsü", marka:"",kal:265, pro:25, karb:8, yag:15, lif:0.5, sod:320, demir:2.5, kals:15, vitC:12, vitD:0.2, vitB12:0.5, acik:80, por:180, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:4.5 },
  { id:1430, ad:"Kuzu Fıstıklı (Antep)", marka:"",kal:395, pro:24, karb:8, yag:31, lif:2, sod:680, demir:2.5, kals:40, vitC:0, vitD:0, vitB12:1.8, acik:78, por:180, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:1431, ad:"Kıyma (Dana, Çiğ, 100g)", marka:"",kal:215, pro:17, karb:0, yag:17, lif:0, sod:75, demir:2.1, kals:15, vitC:0, vitD:0, vitB12:2.0, acik:70, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3.5 },
  { id:1432, ad:"Kıyma (Karışık Kuzu+Dana)", marka:"",kal:250, pro:18, karb:0, yag:20, lif:0, sod:78, demir:2.3, kals:14, vitC:0, vitD:0, vitB12:2.5, acik:72, por:100, aclik:"2-3 saat", onay:true, kat:"Protein", yildiz:3 },
  { id:1433, ad:"Yumurta Akı (3 Adet)", marka:"",kal:51, pro:10.8, karb:0.7, yag:0.2, lif:0, sod:165, demir:0.1, kals:15, vitC:0, vitD:0, vitB12:0, acik:55, por:100, aclik:"1-2 saat", onay:true, kat:"Protein", yildiz:5 },
  { id:1434, ad:"Yumurta Sarısı (2 Adet)", marka:"",kal:110, pro:5.4, karb:1.2, yag:9.6, lif:0, sod:14, demir:1.6, kals:49, vitC:0, vitD:1.8, vitB12:1.1, acik:45, por:34, aclik:"30-60 dk", onay:true, kat:"Protein", yildiz:4 },
  { id:1435, ad:"Peynirli Omlet Makarna Wrap", marka:"",kal:480, pro:28, karb:45, yag:20, lif:2.5, sod:780, demir:2.5, kals:200, vitC:2, vitD:1.2, vitB12:0.8, acik:58, por:280, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:3 },
  { id:1436, ad:"Protein Waffles", marka:"",kal:310, pro:25, karb:32, yag:9, lif:3.5, sod:400, demir:2.5, kals:140, vitC:0, vitD:0.5, vitB12:0.5, acik:65, por:150, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:4.5 },
  { id:1437, ad:"High Protein Pasta Salata", marka:"",kal:390, pro:30, karb:40, yag:11, lif:4, sod:520, demir:2.5, kals:60, vitC:5, vitD:0.2, vitB12:0.5, acik:70, por:300, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:4.5 },
  { id:1438, ad:"İnce Bulgur (Çiğ)", marka:"",kal:342, pro:12, karb:73, yag:1.5, lif:18, sod:9, demir:2.5, kals:35, vitC:0, vitD:0, vitB12:0, acik:65, por:100, aclik:"2-3 saat", onay:true, kat:"Tahil", yildiz:5 },
  { id:1439, ad:"Pilavlık Pirinç (Çiğ)", marka:"",kal:365, pro:7, karb:80, yag:0.7, lif:1.3, sod:5, demir:0.8, kals:10, vitC:0, vitD:0, vitB12:0, acik:30, por:100, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:2 },
  { id:1440, ad:"Tam Pirinç (Pişmiş)", marka:"",kal:111, pro:2.6, karb:23, yag:0.9, lif:1.8, sod:5, demir:0.4, kals:10, vitC:0, vitD:0, vitB12:0, acik:45, por:180, aclik:"1-2 saat", onay:true, kat:"Tahil", yildiz:3.5 },
  { id:1441, ad:"Süt Helvası", marka:"",kal:425, pro:7.5, karb:55, yag:21, lif:0.5, sod:105, demir:0.5, kals:170, vitC:0, vitD:0.2, vitB12:0.3, acik:15, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:1442, ad:"İrmik Helvası", marka:"",kal:460, pro:6.5, karb:62, yag:22, lif:1, sod:90, demir:2.5, kals:25, vitC:0, vitD:0.1, vitB12:0, acik:12, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:1 },
  { id:1443, ad:"Tahin Helvası", marka:"Koska",kal:504, pro:12, karb:55, yag:29, lif:3, sod:80, demir:6.5, kals:200, vitC:0, vitD:0, vitB12:0, acik:18, por:100, aclik:"1-2 saat", onay:true, kat:"Atistirmalik", yildiz:2 },
  { id:1444, ad:"Çikolatalı Helva", marka:"Koska",kal:530, pro:11, karb:58, yag:31, lif:2.5, sod:75, demir:5.5, kals:180, vitC:0, vitD:0, vitB12:0, acik:15, por:100, aclik:"1-2 saat", onay:true, kat:"Atistirmalik", yildiz:1.5 },
  { id:1445, ad:"Pestil (Üzüm)", marka:"",kal:285, pro:2, karb:72, yag:0.5, lif:2, sod:8, demir:1.5, kals:30, vitC:2, vitD:0, vitB12:0, acik:15, por:100, aclik:"30-60 dk", onay:true, kat:"Atistirmalik", yildiz:3 },
  { id:1446, ad:"Köme (Cevizli Pestil Rulo)", marka:"",kal:380, pro:8, karb:62, yag:14, lif:3.5, sod:10, demir:2.5, kals:45, vitC:1, vitD:0, vitB12:0, acik:30, por:100, aclik:"1-2 saat", onay:true, kat:"Atistirmalik", yildiz:3.5 },
  { id:1447, ad:"Macun (Bitki Karışımlı)", marka:"",kal:310, pro:1.5, karb:78, yag:0.5, lif:0.5, sod:15, demir:0.8, kals:25, vitC:5, vitD:0, vitB12:0, acik:10, por:100, aclik:"30 dk", onay:true, kat:"Diger", yildiz:2.5 },
  { id:1448, ad:"Cevizli Sucuk (Tatlı)", marka:"",kal:345, pro:6.5, karb:58, yag:12, lif:2.5, sod:15, demir:2.0, kals:50, vitC:1, vitD:0, vitB12:0, acik:22, por:100, aclik:"1-2 saat", onay:true, kat:"Atistirmalik", yildiz:3.5 },
  { id:1449, ad:"Lokum (Gül Aromalı)", marka:"",kal:325, pro:0.5, karb:82, yag:0.5, lif:0.2, sod:20, demir:0.2, kals:5, vitC:0, vitD:0, vitB12:0, acik:5, por:100, aclik:"30 dk", onay:true, kat:"Atistirmalik", yildiz:0.5 },
  { id:1450, ad:"Doya Yıldız Gıda (5 Yıldız)", marka:"Doya",kal:350, pro:30, karb:35, yag:10, lif:12, sod:320, demir:8, kals:350, vitC:60, vitD:5, vitB12:4, acik:88, por:250, aclik:"3-4 saat", onay:true, kat:"Protein", yildiz:5 },
];

// ─── DEMO VERİLER (sadece sosyal akış için örnek post'lar) ───
const DEMO_PAYLASIM = {};

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

// ─── ANA COMPONENT ───────────────────────────────────────────
export default function App(){
  const profFotoRef = useRef(null);
  const besinFotoRef = useRef(null);
  const postFotoRef = useRef(null);

  // ── KARŞILAMA EKRANI ──
  const [welcomeGoster,setWelcomeGoster]=useState(()=>localStorage.getItem("doya_welcome_done")!=="1");
  const [welcomeSlide,setWelcomeSlide]=useState(0); // 0=dil seç, 1-5=slaytlar
  const [dil,setDil]=useState(()=>localStorage.getItem("doya_dil")||"tr");
  const L=LANG[dil]||LANG.tr;

  // ── DARK MODE ──
  const [dark,setDark]=useState(false);
  const d=dark;

  // ── AUTH ──
  const [ekran,setEkran]=useState("giris");
  const [gHata,setGHata]=useState("");
  const [kvkkModal,setKvkkModal]=useState(false);
  const [kullanicilar,setKullanicilar]=useState([]);
  const [aktif,setAktif]=useState(null);
  const [firebaseUID,setFirebaseUID]=useState(null);
  const [yukleniyor,setYukleniyor]=useState(true);
  const [paylasimDB,setPaylasimDB]=useState(DEMO_PAYLASIM);

  // ── ONBOARDING ──
  const [onboard,setOnboard]=useState(false); const [obAdim,setObAdim]=useState(1);
  const [obK,setObK]=useState(""); const [obB,setObB]=useState(""); const [obY,setObY]=useState("");
  const [obC,setObC]=useState("erkek"); const [obA,setObA]=useState("orta"); const [obHK,setObHK]=useState("");
  const [obSosyal,setObSosyal]=useState(true); const [obAcik,setObAcik]=useState(true);

  // ── APP STATE ──
  const [tab,setTab]=useState("anasayfa");
  const [hamMenu,setHamMenu]=useState(false);
  const [profil,setProfil]=useState({ kilo:"",boy:"",yas:"",cinsiyet:"erkek",aktivite:"orta",hedef:"" });
  const [gunluk,setGunluk]=useState({});
  const [secTarih,setSecTarih]=useState(bugunKey());
  const [takvimAy,setTakvimAy]=useState(new Date());
  const [puan,setPuan]=useState(0);
  const [premium,setPremium]=useState(false);
  const [reklam,setReklam]=useState(true);
  const [acikHesap,setAcikHesap]=useState(true);
  const [sosyalAktif,setSosyalAktif]=useState(true);
  const [besinler,setBesinler]=useState(BESIN_DB);
  const [bekBesin,setBekBesin]=useState([]);
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
  const [yemekGram,setYemekGram]=useState("100");
  const [yemekKat,setYemekKat]=useState("Kahvaltı");
  const [yeniB,setYeniB]=useState({ ad:"",marka:"",kal:"",pro:"",karb:"",yag:"",lif:"",sod:"",acik:"",por:"100",aclik:"2-3 saat",kat:"Diğer" });
  const [besinFil,setBesinFil]=useState({ kat:"",minKal:"",maxKal:"",acikSecim:[],sira:"isim",minDemir:"",minKals:"",minVitC:"",minVitD:"",minVitB12:"",yildizSecim:[] });
  const [yildizAcik,setYildizAcik]=useState(false);
  const [araSekmesi,setAraSekmesi]=useState("ara");

  // ── SPOR ──
  const [sporModal,setSporModal]=useState(false);
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
  const [demoEklendi,setDemoEklendi]=useState(false);

  // ── SOSYAL AKIŞ ──
  const [paylasimlar,setPaylasimlar]=useState([]);
  const [yeniPS,setYeniPS]=useState(""); const [postFoto,setPostFoto]=useState(null); const [sosyalSekme,setSosyalSekme]=useState("genel");
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
  const [perfDonem,setPerfDonem]=useState("hafta"); // "hafta" | "ay" | "yil"
  const [perfAnimDeger,setPerfAnimDeger]=useState({kal:0,pro:0,karb:0,yag:0,su:0,adim:0});
  const [donemOzetGoster,setDonemOzetGoster]=useState(false);
  const [donemOzetTip,setDonemOzetTip]=useState(null);

  const isAdmin = aktif?.admin===true;
  const isOrtak = !!(aktif?.refTip && aktif?.refOnay);

  // ── VERİ YARDIMCILARI ──
  const gunV=(key)=>gunluk[key]||{ yemekler:[],su:0,kilo:"",spor:[] };
  const gunSet=(key,alan,val)=>{
    setGunluk(p=>{
      const yeni={...p,[key]:{...gunV(key),[alan]:val}};
      if(firebaseUID) gunVeriKaydet(firebaseUID,key,yeni[key]).catch(console.error);
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
  const filtreBesinler = onayBesinler.filter(b=>{
    const araUy  = b.ad.toLowerCase().includes(besinArama.toLowerCase())||(b.marka&&b.marka.toLowerCase().includes(besinArama.toLowerCase()));
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
    return araUy&&katUy&&minK&&maxK&&acikUy&&demirUy&&kalsUy&&vitCUy&&vitDUy&&vitB12Uy&&yildizUy;
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
    bg   : d?"#0f172a":"#f0fdf4", card : d?"#1e293b":"#ffffff",
    brd  : d?"#334155":"#e5e7eb", text : d?"#f1f5f9":"#111827",
    sub  : d?"#94a3b8":"#6b7280", muted: d?"#64748b":"#9ca3af",
    inp  : d?"#0f172a":"#ffffff", inpB : d?"#334155":"#e5e7eb",
    nav  : d?"#1e293b":"#ffffff", rowB : d?"#334155":"#f3f4f6",
    pg   : d?"#334155":"#e5e7eb",
  };
  const CS   = { background:r.card,border:`1px solid ${r.brd}`,borderRadius:16,padding:16,margin:"10px 16px",boxShadow:d?"0 2px 10px #0006":"0 2px 10px #00000012" };
  const CT   = { fontSize:10,fontWeight:700,color:r.sub,textTransform:"uppercase",letterSpacing:1,marginBottom:10 };
  const PB   = { height:8,background:r.pg,borderRadius:8,overflow:"hidden",marginTop:6 };
  const PF   = (pct,c)=>({ height:"100%",width:Math.min(100,Math.max(0,pct))+"%",background:c||"#16a34a",borderRadius:8,transition:"width .4s" });
  const IS   = { width:"100%",padding:"11px 14px",border:`2px solid ${r.inpB}`,borderRadius:12,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"'Nunito',sans-serif",background:r.inp,color:r.text };
  const BTN  = (c,s)=>({ background:c||"#16a34a",color:"#fff",border:"none",borderRadius:12,padding:s||"12px 20px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif" });
  const BAD  = (c)=>({ background:c+"22",color:c,padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700,display:"inline-block" });
  const NB   = (a)=>({ flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"7px 2px",cursor:"pointer",color:a?"#16a34a":r.muted,fontSize:9,fontWeight:a?700:500,gap:2,background:"none",border:"none",minWidth:44 });

  // ─── FİREBASE: AUTH STATE & VERİ YÜKLEME ────────────────────
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async (user)=>{
      if(user){
        setFirebaseUID(user.uid);
        try {
          const veri = await kullaniciyiGetir(user.uid);
          if(veri){
            // Admin kontrolü: Firestore'dan oku, kodda şifre YOK
            const adminSnap = await getDoc(doc(db,"adminConfig","settings"));
            const adminEmails = adminSnap.exists() ? (adminSnap.data().adminEmails||[]) : [];
            const isAdminUser = adminEmails.includes(veri.email);
            const tam = {...veri, admin: isAdminUser};
            setAktif(tam);
            setPuan(tam.puan||0);
            setPremium(tam.premium||false);
            setAcikHesap(tam.acik??true);
            setSosyalAktif(tam.sosyal??true);
            setProfFoto(tam.foto||null);
            if(tam.kilo||tam.boy) setProfil({kilo:tam.kilo||"",boy:tam.boy||"",yas:tam.yas||"",cinsiyet:tam.cinsiyet||"erkek",aktivite:tam.aktivite||"orta",hedef:tam.hedef||""});
            if(tam.refKodKullandi) setGirRefKilitli(true);
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
        setYukleniyor(false);
      }
    });
    return ()=>unsub();
  },[]);

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
    if(!atla && firebaseUID){
      const yeniProfil={kilo:obK,boy:obB,yas:obY,cinsiyet:obC,aktivite:obA,hedef:obHK};
      setProfil(yeniProfil);
      setAcikHesap(obAcik); setSosyalAktif(obSosyal);
      // Firestore'a kaydet
      await kullaniciyiGuncelle(firebaseUID, {
        kilo:obK, boy:obB, yas:obY, cinsiyet:obC, aktivite:obA, hedef:obHK,
        acik:obAcik, sosyal:obSosyal
      }).catch(console.error);
    }
    setOnboard(false);
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
  const yemekEkle=async()=>{
    if(!secBesin)return;
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
    const yeniPuan=(puan||0)+10;
    setPuan(yeniPuan);
    if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{puan:yeniPuan}).catch(console.error);
    setSecBesin(null); setBesinArama(""); setYemekGram("100"); setTab("anasayfa");
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
  const istekGonder=async(hUid)=>{
    const h=kullanicilar.find(u=>u.uid===hUid); if(!h)return;
    if(h.acik){
      const yeniPuan=(puan||0)+100;
      setArkadaslar(p=>[...p,{uid:h.uid,isim:h.isim}]);
      setPuan(yeniPuan);
      if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{puan:yeniPuan}).catch(console.error);
    } else {
      setGonderilen(p=>[...p,{uid:h.uid,isim:h.isim,zaman:"Az önce"}]);
      if(firebaseUID && h.firebaseUID){
        try {
          const fbMod = await import("firebase/firestore");
          await fbMod.addDoc(fbMod.collection(db,"users",h.firebaseUID,"istekler"),{
            uid:aktif.uid, isim:aktif.isim, firebaseUID, zaman: new Date().toISOString()
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
    const sahip=kullanicilar.find(u=>u.refKod===kod&&u.uid!==aktif.uid);
    if(!sahip){setGirRefMesaj({tip:"hata",mesaj:"Geçersiz referans kodu. Tekrar kontrol et."});return;}
    // Puanları ver — kodu giren kişiye +150, kodu sahibine +150
    const yeniPuanGiren=(puan||0)+150;
    const yeniPuanSahip=(sahip.puan||0)+150;
    setPuan(yeniPuanGiren);
    setAktif(p=>({...p,puan:yeniPuanGiren,refKodKullandi:kod}));
    setKullanicilar(p=>p.map(u=>{
      if(u.uid===aktif.uid) return{...u,puan:yeniPuanGiren,refKodKullandi:kod};
      if(u.uid===sahip.uid) return{...u,puan:yeniPuanSahip,davet:(u.davet||0)+1};
      return u;
    }));
    // Firebase'e kaydet
    if(firebaseUID){
      await kullaniciyiGuncelle(firebaseUID,{puan:yeniPuanGiren,refKodKullandi:kod}).catch(console.error);
    }
    if(sahip.firebaseUID){
      await kullaniciyiGuncelle(sahip.firebaseUID,{puan:yeniPuanSahip,davet:(sahip.davet||0)+1}).catch(console.error);
    }
    setGirRefKilitli(true);
    setGirRefMesaj({tip:"basari",mesaj:`✅ Kod geçerli! Sana +150, ${sahip.isim}'e +150 puan eklendi.`});
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

    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/>
        <div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",maxWidth:430,margin:"0 auto",background:"linear-gradient(160deg,#052e16 0%,#15803d 50%,#16a34a 100%)",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden"}}>

          {/* Dekoratif nokta desen */}
          <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,#ffffff0a 1px,transparent 1px)",backgroundSize:"30px 30px",pointerEvents:"none"}}/>
          {/* Glow efekti */}
          <div style={{position:"absolute",top:-80,right:-80,width:300,height:300,background:"radial-gradient(#4ade8022,transparent 70%)",pointerEvents:"none"}}/>
          <div style={{position:"absolute",bottom:-60,left:-60,width:250,height:250,background:"radial-gradient(#22c55e18,transparent 70%)",pointerEvents:"none"}}/>

          {/* Üst bar */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",position:"relative",zIndex:2}}>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:"#f0fdf4",lineHeight:1}}>Do<span style={{color:"#86efac"}}>ya</span></div>
            {welcomeSlide > 0 && (
              <button onClick={welcomeBit} style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:20,padding:"5px 14px",color:"#f0fdf4",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>
                {L.atla}
              </button>
            )}
          </div>

          {/* DİL SEÇİM EKRANI */}
          {welcomeSlide===0&&(
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px 40px",position:"relative",zIndex:2}}>
              <div style={{fontSize:64,marginBottom:16,filter:"drop-shadow(0 4px 12px #0004)"}}>🌍</div>
              <div style={{fontSize:24,fontWeight:900,color:"#f0fdf4",marginBottom:6,textAlign:"center"}}>{L.dilSec}</div>
              <div style={{fontSize:13,color:"#86efac",marginBottom:36,textAlign:"center",opacity:.85}}>Select Language / Dil Seçin</div>

              <div style={{display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:280}}>
                {[{k:"tr",ad:"🇹🇷  Türkçe",alt:"Turkish"},{k:"en",ad:"🇬🇧  English",alt:"İngilizce"}].map(l=>(
                  <button key={l.k} onClick={()=>setDil(l.k)} style={{
                    padding:"16px 20px",
                    borderRadius:16,
                    border:`2.5px solid ${dil===l.k?"#4ade80":"rgba(255,255,255,.2)"}`,
                    background:dil===l.k?"rgba(74,222,128,.15)":"rgba(255,255,255,.08)",
                    cursor:"pointer",
                    fontFamily:"'Nunito',sans-serif",
                    display:"flex",alignItems:"center",justifyContent:"space-between",
                    transition:"all .2s",
                  }}>
                    <div style={{textAlign:"left"}}>
                      <div style={{fontSize:16,fontWeight:800,color:"#f0fdf4"}}>{l.ad}</div>
                      <div style={{fontSize:11,color:"#86efac",opacity:.8,marginTop:2}}>{l.alt}</div>
                    </div>
                    {dil===l.k&&<div style={{width:22,height:22,borderRadius:"50%",background:"#4ade80",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#052e16",flexShrink:0}}>✓</div>}
                  </button>
                ))}
              </div>

              <button onClick={ileri} style={{
                marginTop:36,
                background:"linear-gradient(135deg,#22c55e,#16a34a)",
                border:"none",
                borderRadius:16,
                padding:"15px 48px",
                fontSize:16,
                fontWeight:900,
                color:"#fff",
                cursor:"pointer",
                fontFamily:"'Nunito',sans-serif",
                boxShadow:"0 6px 24px #22c55e40",
              }}>{L.devam}</button>
            </div>
          )}

          {/* SLAYT EKRANLARI */}
          {welcomeSlide > 0 && slide && (
            <div style={{flex:1,display:"flex",flexDirection:"column",position:"relative",zIndex:2}}>

              {/* İlerleme çubukları */}
              <div style={{display:"flex",gap:5,padding:"0 20px 20px"}}>
                {L.slides.map((_,i)=>(
                  <div key={i} style={{flex:1,height:3,borderRadius:3,background:i<welcomeSlide?"#4ade80":"rgba(255,255,255,.2)",transition:"background .3s"}}/>
                ))}
              </div>

              {/* İkon büyük */}
              <div style={{textAlign:"center",padding:"20px 0 0",fontSize:90,filter:"drop-shadow(0 8px 24px #0006)",lineHeight:1}}>
                {slide.ikon}
              </div>

              {/* Metin */}
              <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"24px 28px"}}>
                <div style={{fontSize:26,fontWeight:900,color:"#f0fdf4",lineHeight:1.2,marginBottom:16,textAlign:"center"}}>
                  {slide.baslik}
                </div>
                <div style={{fontSize:14,color:"#bbf7d0",lineHeight:1.8,textAlign:"center",opacity:.9}}>
                  {slide.acik}
                </div>
              </div>

              {/* Alt butonlar */}
              <div style={{padding:"0 20px 44px",display:"flex",flexDirection:"column",gap:10,alignItems:"center"}}>
                <button onClick={ileri} style={{
                  width:"100%",
                  maxWidth:360,
                  padding:"15px 0",
                  background:"linear-gradient(135deg,#22c55e,#16a34a)",
                  border:"none",
                  borderRadius:16,
                  fontSize:16,
                  fontWeight:900,
                  color:"#fff",
                  cursor:"pointer",
                  fontFamily:"'Nunito',sans-serif",
                  boxShadow:"0 6px 24px #22c55e40",
                }}>
                  {welcomeSlide===toplamSlide ? L.basla : L.devam}
                </button>

                {/* Nokta indikatör */}
                <div style={{display:"flex",gap:7,marginTop:6}}>
                  {L.slides.map((_,i)=>(
                    <div key={i} onClick={()=>setWelcomeSlide(i+1)} style={{
                      width:i===slideIdx?22:7,
                      height:7,
                      borderRadius:4,
                      background:i===slideIdx?"#4ade80":"rgba(255,255,255,.3)",
                      cursor:"pointer",
                      transition:"all .3s",
                    }}/>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  // ─── YÜKLENİYOR EKRANI ───────────────────────────────────────
  if(yukleniyor) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/>
      <div style={{minHeight:"100vh",maxWidth:430,margin:"0 auto",background:"linear-gradient(150deg,#052e16,#15803d 55%,#16a34a)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:24}}>
        <div style={{width:80,height:80,background:"linear-gradient(145deg,#22c55e,#052e16 90%)",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 12px 40px #22c55e30"}}>
          <svg width="48" height="48" viewBox="0 0 120 120" fill="none">
            <path d="M26 52 Q26 88 60 88 Q94 88 94 52 Z" fill="url(#bL)"/>
            <ellipse cx="60" cy="52" rx="34" ry="8" fill="url(#rL)"/>
            <path d="M52 65 Q60 52 72 60 Q60 78 52 65Z" fill="#fbbf24"/>
            <defs>
              <linearGradient id="bL" x1="26" y1="52" x2="94" y2="88" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#16a34a"/><stop offset="100%" stopColor="#052e16"/></linearGradient>
              <linearGradient id="rL" x1="26" y1="44" x2="94" y2="60" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#4ade80"/><stop offset="100%" stopColor="#15803d"/></linearGradient>
            </defs>
          </svg>
        </div>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:44,color:"#f0fdf4",lineHeight:1}}>Do<span style={{color:"#4ade80"}}>ya</span></div>
        <div style={{width:48,height:4,background:"#ffffff20",borderRadius:99,overflow:"hidden"}}>
          <div style={{width:"50%",height:"100%",background:"linear-gradient(90deg,#22c55e,#4ade80)",borderRadius:99,animation:"ldAnim 1.2s ease-in-out infinite"}}/>
        </div>
        <style>{`@keyframes ldAnim{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
      </div>
    </>
  );

  // ─── GİRİŞ EKRANI ────────────────────────────────────────────
  if(!aktif) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/>
      <div style={{fontFamily:"'Nunito',sans-serif",background:"#f0fdf4",minHeight:"100vh",maxWidth:430,margin:"0 auto"}}>
        <div style={{background:"linear-gradient(150deg,#052e16 0%,#15803d 55%,#16a34a 100%)",padding:"52px 32px 52px",textAlign:"center",color:"#fff",position:"relative",overflow:"hidden"}}>
          {/* dot pattern */}
          <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,#ffffff08 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}/>
          {/* glow */}
          <div style={{position:"absolute",top:"-40px",left:"50%",transform:"translateX(-50%)",width:220,height:220,background:"radial-gradient(#4ade8018,transparent 70%)",pointerEvents:"none"}}/>
          {/* icon */}
          <div style={{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",width:88,height:88,background:"linear-gradient(145deg,#22c55e,#052e16 90%)",borderRadius:22,marginBottom:18,boxShadow:"0 8px 32px #22c55e28,inset 0 1px 0 #4ade8030"}}>
            <svg width="52" height="52" viewBox="0 0 120 120" fill="none">
              <path d="M26 52 Q26 88 60 88 Q94 88 94 52 Z" fill="url(#b1)"/>
              <ellipse cx="60" cy="52" rx="34" ry="8" fill="url(#r1)"/>
              <path d="M44 40 Q46 34 44 28" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" opacity=".8"/>
              <path d="M60 38 Q62 30 60 22" stroke="#4ade80" strokeWidth="3" strokeLinecap="round"/>
              <path d="M76 40 Q78 34 76 28" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" opacity=".8"/>
              <path d="M52 65 Q60 52 72 60 Q60 78 52 65Z" fill="#fbbf24"/>
              <path d="M62 60 Q60 68 56 72" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="b1" x1="26" y1="52" x2="94" y2="88" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#16a34a"/><stop offset="100%" stopColor="#052e16"/>
                </linearGradient>
                <linearGradient id="r1" x1="26" y1="44" x2="94" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4ade80"/><stop offset="100%" stopColor="#15803d"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:44,lineHeight:1,marginBottom:8,position:"relative"}}>
            Do<span style={{color:"#4ade80"}}>ya</span>
          </div>
          <div style={{fontSize:12,opacity:.65,letterSpacing:"3px",textTransform:"uppercase",fontWeight:400,marginTop:4}}>Beslen · Takip Et · Doyur</div>
        </div>
        <div style={{padding:"0 20px",marginTop:-22}}>
          <div style={{background:"#fff",borderRadius:22,padding:24,boxShadow:"0 8px 32px #00000018"}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:15,fontWeight:900,color:"#111",marginBottom:4}}>Hoşgeldin 👋</div>
              <div style={{fontSize:12,color:"#6b7280"}}>Devam etmek için Google hesabınla giriş yap</div>
            </div>

            {gHata&&<div style={{background:"#fef2f2",color:"#ef4444",padding:"9px 13px",borderRadius:10,fontSize:13,marginBottom:13}}>{gHata}</div>}

            <button style={{width:"100%",padding:"14px 0",borderRadius:14,border:"1.5px solid #e5e7eb",background:"#fff",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:15,color:"#374151",display:"flex",alignItems:"center",justifyContent:"center",gap:12,boxShadow:"0 2px 8px #0001"}} onClick={async()=>{
              try{
                const kul = await fbGoogleGiris();
                setAktif(kul); setFirebaseUID(kul.firebaseUID);
              }catch(e){setGHata(e.message);}
            }}>
              <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.6 26.9 36.5 24 36.5c-5.2 0-9.7-3-11.3-7.2L6 33.6C9.4 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C41 35.7 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"/></svg>
              Google ile Giriş Yap
            </button>

            <div style={{display:"flex",alignItems:"center",gap:8,margin:"14px 0"}}>
              <div style={{flex:1,height:1,background:"#e5e7eb"}}/>
              <span style={{fontSize:11,color:"#9ca3af"}}>yakında</span>
              <div style={{flex:1,height:1,background:"#e5e7eb"}}/>
            </div>

            <button disabled style={{width:"100%",padding:"14px 0",borderRadius:14,border:"1.5px solid #e5e7eb",background:"#f9fafb",cursor:"not-allowed",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:15,color:"#9ca3af",display:"flex",alignItems:"center",justifyContent:"center",gap:12}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#9ca3af"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple ile Giriş Yap
            </button>

            <div style={{marginTop:16,textAlign:"center"}}>
              <a href={"mailto:"+DESTEK_MAIL} style={{fontSize:12,color:"#16a34a",textDecoration:"none"}}>✉️ {DESTEK_MAIL}</a>
            </div>
          </div>
        </div>
      </div>

      {/* KVKK MODAL */}
      {kvkkModal&&(
        <div style={{position:"fixed",inset:0,background:"#000a",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#fff",borderRadius:18,padding:24,maxWidth:400,width:"100%",maxHeight:"82vh",overflowY:"auto"}}>
            <div style={{fontWeight:900,fontSize:17,marginBottom:14,color:"#111"}}>KVKK Aydınlatma Metni</div>
            <div style={{fontSize:12,color:"#374151",lineHeight:1.9}}>
              <b>Doya</b> uygulaması olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında kişisel verilerinizin işlenmesine ilişkin bilgilendirme yapılmaktadır.<br/><br/>
              <b>İşlenen Kişisel Veriler:</b><br/>
              • Ad, soyad, e-posta adresi<br/>
              • Yaş, cinsiyet, kilo, boy bilgileri<br/>
              • Günlük beslenme ve aktivite verileri<br/>
              • Uygulama kullanım verileri<br/><br/>
              <b>İşleme Amaçları:</b><br/>
              • Kişiselleştirilmiş sağlık takibi sağlamak<br/>
              • Uygulama hizmetlerinin yürütülmesi<br/>
              • Kullanıcı deneyiminin iyileştirilmesi<br/><br/>
              <b>Veri Güvenliği:</b><br/>
              Verileriniz şifreli olarak güvenli sunucularda saklanır. 3. kişilerle paylaşılmaz.<br/><br/>
              <b>Haklarınız:</b><br/>
              Verilerinize erişim, düzeltme, silme ve taşıma haklarına sahipsiniz.<br/><br/>
              <b>Kullanım Koşulları:</b><br/>
              Uygulama yalnızca kişisel kullanım içindir. Sağlık kararları için mutlaka bir doktora danışınız. Doya sağlık kararlarınızın sorumluluğunu kabul etmez.<br/><br/>
              <b>İletişim:</b> {DESTEK_MAIL}
            </div>
            <button style={{...BTN(),width:"100%",marginTop:16,padding:"12px 0"}} onClick={()=>{setKvkkOnay(true);setKvkkModal(false);}}>Okudum ve Onaylıyorum</button>
            <button style={{...BTN("#6b7280"),width:"100%",marginTop:8,padding:"12px 0"}} onClick={()=>setKvkkModal(false)}>Kapat</button>
          </div>
        </div>
      )}
    </>
  );

  // ─── ONBOARDING ──────────────────────────────────────────────
  if(onboard) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/>
      <div style={{fontFamily:"'Nunito',sans-serif",background:"#f0fdf4",minHeight:"100vh",maxWidth:430,margin:"0 auto",padding:20}}>
        <div style={{display:"flex",gap:6,marginBottom:24}}>
          {[1,2].map(i=><div key={i} style={{flex:1,height:4,borderRadius:4,background:obAdim>=i?"#16a34a":"#e5e7eb"}}/>)}
        </div>
        {obAdim===1&&(
          <div>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:40}}>👋</div>
              <div style={{fontSize:22,fontWeight:900,color:"#111"}}>Hoşgeldin, {aktif.isim}!</div>
              <div style={{fontSize:13,color:"#6b7280",marginTop:3}}>Kişisel plan için bilgilerini gir.</div>
            </div>
            <div style={{background:"#fff",borderRadius:18,padding:20,boxShadow:"0 4px 18px #00000012"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                {[{l:"Kilo (kg)",v:obK,s:setObK,ph:"75"},{l:"Boy (cm)",v:obB,s:setObB,ph:"175"},{l:"Yaş",v:obY,s:setObY,ph:"25"},{l:"Hedef Kilo",v:obHK,s:setObHK,ph:"70"}].map(f=>(
                  <div key={f.l}><div style={{fontSize:11,color:"#6b7280",fontWeight:700,marginBottom:4}}>{f.l}</div>
                  <input style={{...IS,padding:"9px 11px",fontSize:13}} placeholder={f.ph} type="number" value={f.v} onChange={e=>f.s(e.target.value)}/></div>
                ))}
              </div>
              <div style={{marginBottom:10}}>
                <div style={{fontSize:11,color:"#6b7280",fontWeight:700,marginBottom:5}}>Cinsiyet</div>
                <div style={{display:"flex",gap:8}}>
                  {["erkek","kadin"].map(c=><button key={c} onClick={()=>setObC(c)} style={{flex:1,padding:"9px",border:`2px solid ${obC===c?"#16a34a":"#e5e7eb"}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,background:obC===c?"#f0fdf4":"#fff",color:obC===c?"#16a34a":"#6b7280"}}>{c==="erkek"?"Erkek":"Kadın"}</button>)}
                </div>
              </div>
              <div style={{marginBottom:18}}>
                <div style={{fontSize:11,color:"#6b7280",fontWeight:700,marginBottom:5}}>Aktivite Seviyesi</div>
                {Object.entries(AKTIVITE_ETIKET).map(([k,v])=>(
                  <button key={k} onClick={()=>setObA(k)} style={{display:"block",width:"100%",textAlign:"left",padding:"9px 12px",marginBottom:4,border:`2px solid ${obA===k?"#16a34a":"#e5e7eb"}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:obA===k?700:500,fontSize:12,background:obA===k?"#f0fdf4":"#fff",color:obA===k?"#16a34a":"#374151"}}>{v}</button>
                ))}
              </div>
              <button style={{...BTN(),width:"100%",padding:"13px 0",marginBottom:8}} onClick={()=>setObAdim(2)}>Devam →</button>
              <button style={{background:"none",border:"none",color:"#9ca3af",fontSize:12,cursor:"pointer",width:"100%",fontFamily:"'Nunito',sans-serif"}} onClick={()=>setObAdim(2)}>Atla</button>
            </div>
          </div>
        )}
        {obAdim===2&&(
          <div>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:40}}>👥</div>
              <div style={{fontSize:22,fontWeight:900,color:"#111"}}>Sosyal Tercihler</div>
            </div>
            <div style={{background:"#fff",borderRadius:18,padding:20,boxShadow:"0 4px 18px #00000012"}}>
              <div style={{background:"#f0fdf4",border:"1.5px solid #86efac",borderRadius:12,padding:12,marginBottom:16,textAlign:"center"}}>
                <div style={{fontSize:10,fontWeight:700,color:"#16a34a",marginBottom:3}}>KULLANICI KODUN</div>
                <div style={{fontSize:20,fontWeight:900,letterSpacing:2,color:"#111"}}>{aktif.uid}</div>
              </div>
              <div style={{marginBottom:12}}>
                <div style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:8}}>Sosyal özellikler aktif mi?</div>
                <div style={{display:"flex",gap:8}}>
                  {[{v:true,l:"Aktif"},{v:false,l:"Kapalı"}].map(o=><button key={String(o.v)} onClick={()=>setObSosyal(o.v)} style={{flex:1,padding:"9px",border:`2px solid ${obSosyal===o.v?"#16a34a":"#e5e7eb"}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,background:obSosyal===o.v?"#f0fdf4":"#fff",color:obSosyal===o.v?"#16a34a":"#6b7280"}}>{o.l}</button>)}
                </div>
              </div>
              {obSosyal&&(
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:8}}>Hesap türü</div>
                  <div style={{display:"flex",gap:8}}>
                    {[{v:true,l:"🔓 Açık"},{v:false,l:"🔒 Gizli"}].map(o=><button key={String(o.v)} onClick={()=>setObAcik(o.v)} style={{flex:1,padding:"9px",border:`2px solid ${obAcik===o.v?"#16a34a":"#e5e7eb"}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12,background:obAcik===o.v?"#f0fdf4":"#fff",color:obAcik===o.v?"#16a34a":"#6b7280"}}>{o.l}</button>)}
                  </div>
                  <div style={{fontSize:11,color:"#6b7280",marginTop:6,padding:"8px 10px",background:"#f9fafb",borderRadius:8}}>{obAcik?"Açık: Arkadaşlık istekleri otomatik kabul edilir.":"Gizli: İstekleri kendin onaylarsın."}</div>
                </div>
              )}
              <button style={{...BTN(),width:"100%",padding:"13px 0",marginBottom:8}} onClick={()=>onboardBitir(false)}>Başlayalım! 🚀</button>
              <button style={{background:"none",border:"none",color:"#9ca3af",fontSize:12,cursor:"pointer",width:"100%",fontFamily:"'Nunito',sans-serif"}} onClick={()=>onboardBitir(true)}>Atla</button>
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

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/>
      <div style={{fontFamily:"'Nunito',sans-serif",background:r.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",paddingBottom:88,transition:"background .3s"}}>

        {/* EMAIL DOĞRULAMA BANNER */}
        {(()=>{
          const fbUser=auth.currentUser;
          if(!fbUser||fbUser.emailVerified||eVeriGizle||fbUser.providerData?.some(p=>p.providerId==="google.com")) return null;
          return(
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
          );
        })()}

        {/* HEADER */}
        <div style={{background:"linear-gradient(135deg,#16a34a,#15803d)",padding:"14px 18px 18px",color:"#fff"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <button onClick={()=>setHamMenu(true)} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:8,padding:"6px 8px",cursor:"pointer",display:"flex",flexDirection:"column",gap:3}}>
                <span style={{display:"block",width:16,height:2,background:"#fff",borderRadius:2}}/>
                <span style={{display:"block",width:16,height:2,background:"#fff",borderRadius:2}}/>
                <span style={{display:"block",width:16,height:2,background:"#fff",borderRadius:2}}/>
              </button>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:7}}>
                  <div style={{width:28,height:28,background:"linear-gradient(145deg,#22c55e,#052e16 90%)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width="17" height="17" viewBox="0 0 120 120" fill="none">
                      <path d="M26 52 Q26 88 60 88 Q94 88 94 52 Z" fill="url(#bHH)"/>
                      <ellipse cx="60" cy="52" rx="34" ry="8" fill="url(#rHH)"/>
                      <path d="M52 65 Q60 52 72 60 Q60 78 52 65Z" fill="#fbbf24"/>
                      <defs>
                        <linearGradient id="bHH" x1="26" y1="52" x2="94" y2="88" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#16a34a"/><stop offset="100%" stopColor="#052e16"/></linearGradient>
                        <linearGradient id="rHH" x1="26" y1="44" x2="94" y2="60" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#4ade80"/><stop offset="100%" stopColor="#15803d"/></linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,lineHeight:1}}>Do<span style={{color:"#86efac"}}>ya</span></div>
                </div>
                <div style={{display:"flex",gap:5,alignItems:"center",marginTop:2,flexWrap:"wrap"}}>
                  <div style={{fontSize:11,opacity:.9}}>Merhaba, {aktif.isim}</div>
                  {isAdmin&&<span style={{background:"#fbbf24",color:"#78350f",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:20}}>ADMIN</span>}
                  {isOrtak&&<span style={{background:"rgba(255,255,255,.25)",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:20}}>{aktif.refTip==="influencer"?"🎯 INFLUENCER":"🏢 İŞLETME"}</span>}
                  {premium&&<span style={{background:"rgba(255,255,255,.2)",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:20}}>⭐ PREMIUM</span>}
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              <div style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"4px 9px",fontSize:11,fontWeight:700}}>{puan} puan</div>
              <button onClick={()=>setDark(!d)} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:8,padding:"5px 8px",fontSize:14,cursor:"pointer"}}>{d?"☀️":"🌙"}</button>
            </div>
          </div>
        </div>

        {/* ──── ANASAYFA ──────────────────────────────────────────── */}
        {tab==="anasayfa"&&(
          <div>
            {reklam&&!premium&&(eVeriGizle||!auth.currentUser||auth.currentUser?.emailVerified||auth.currentUser?.providerData?.some(p=>p.providerId==="google.com"))&&(
              <div style={{background:d?"#1c1a10":"#fef3c7",border:"1px dashed #f59e0b",borderRadius:12,padding:"9px 14px",margin:"10px 16px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontSize:9,color:"#92400e",fontWeight:700}}>REKLAM</div><div style={{fontSize:12,color:"#78350f"}}>Protein Tozu %20 İndirim → Premium: sadece {PREMIUM_FIYAT}₺/ay</div></div>
                <button onClick={()=>setReklam(false)} style={{background:"none",border:"none",cursor:"pointer",color:"#92400e",fontSize:18}}>×</button>
              </div>
            )}

            {/* BMI */}
            {bmi&&bmiD&&(
              <div style={{...CS,background:`linear-gradient(135deg,${bmiD.renk}18,${bmiD.renk}08)`,border:`1.5px solid ${bmiD.renk}33`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontSize:10,color:r.sub,fontWeight:700}}>BMI</div>
                    <div style={{fontSize:30,fontWeight:900,color:bmiD.renk}}>{bmi}</div>
                    <div style={{fontSize:13,fontWeight:800,color:bmiD.renk}}>{bmiD.etiket}</div>
                    <div style={{fontSize:11,color:r.sub}}>{bmiD.acik}</div>
                  </div>
                  {profil.hedef&&<div style={{textAlign:"right",background:r.card,borderRadius:12,padding:"9px 14px"}}>
                    <div style={{fontSize:9,color:r.muted,fontWeight:700}}>HEDEF</div>
                    <div style={{fontSize:22,fontWeight:900,color:"#16a34a"}}>{profil.hedef}kg</div>
                    <div style={{fontSize:10,color:r.sub}}>{(+profil.kilo-+profil.hedef)>0?(+profil.kilo-+profil.hedef).toFixed(1)+"kg kaldı":"✓ Hedefe ulaştın"}</div>
                  </div>}
                </div>
              </div>
            )}

            {/* TDEE + Spor */}
            {tdee&&<div style={{background:"linear-gradient(135deg,#7c3aed,#4f46e5)",borderRadius:16,padding:14,margin:"0 16px 10px",color:"#fff"}}>
              <div style={{fontSize:10,opacity:.8,fontWeight:700}}>GÜNLÜK YAKIM + SPOR</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                <div>
                  <div style={{fontSize:30,fontWeight:900}}>{HEDEF} <span style={{fontSize:13}}>kcal</span></div>
                  {topSpor>0&&<div style={{fontSize:11,opacity:.8}}>Spor: +{topSpor} kcal</div>}
                </div>
                <div style={{textAlign:"right",fontSize:12}}>
                  <div>Yedim: <b>{topKal}</b></div>
                  <div style={{color:topKal<=HEDEF?"#86efac":"#fca5a5"}}>{topKal<=HEDEF?(HEDEF-topKal)+" kaldı":(topKal-HEDEF)+" fazla"}</div>
                </div>
              </div>
            </div>}

            {/* KALORİ ÖZET */}
            <div style={CS}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={CT}>Kalori Özeti</div>
                <button onClick={()=>setPsModal(true)} style={{...BTN("#3b82f6","6px 12px"),fontSize:12}}>📤 Paylaş</button>
              </div>
              <div style={{fontSize:38,fontWeight:900,color:"#16a34a"}}>{topKal} <span style={{fontSize:14,color:r.muted}}>/ {HEDEF} kcal</span></div>
              <div style={PB}><div style={PF((topKal/HEDEF)*100,topKal>HEDEF?"#ef4444":"#16a34a")}/></div>
              <div style={{display:"flex",gap:6,marginTop:10}}>
                {[{l:"Protein",v:Math.round(topPro)+"g",c:"#3b82f6"},{l:"Karb",v:Math.round(topKarb)+"g",c:"#f59e0b"},{l:"Yağ",v:Math.round(topYag)+"g",c:"#ef4444"}].map(m=>(
                  <div key={m.l} style={{flex:1,background:m.c+"18",borderRadius:10,padding:8,textAlign:"center"}}>
                    <div style={{fontSize:15,fontWeight:800,color:m.c}}>{m.v}</div>
                    <div style={{fontSize:10,color:r.muted}}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SERİ KARTLARI */}
            {(yemekSeri>0||adimSeri>0)&&(
              <div style={{display:"flex",gap:8,marginBottom:0}}>
                {yemekSeri>0&&(
                  <div style={{flex:1,background:d?"#1c1917":"#fff7ed",border:`2px solid ${yemekSeri>=7?"#f59e0b":"#fed7aa"}`,borderRadius:14,padding:"12px 14px",textAlign:"center"}}>
                    <div style={{fontSize:24}}>🍽️</div>
                    <div style={{fontSize:22,fontWeight:900,color:"#ea580c",lineHeight:1}}>{yemekSeri}</div>
                    <div style={{fontSize:10,color:r.sub,fontWeight:700}}>günlük yemek serisi</div>
                    {yemekSeri>=7&&<div style={{fontSize:9,color:"#f59e0b",fontWeight:800,marginTop:2}}>🔥 {yemekSeri>=30?"Efsane!":yemekSeri>=14?"Harika!":"Devam et!"}</div>}
                  </div>
                )}
                {adimSeri>0&&(
                  <div style={{flex:1,background:d?"#0c1a1a":"#ecfdf5",border:`2px solid ${adimSeri>=7?"#16a34a":"#86efac"}`,borderRadius:14,padding:"12px 14px",textAlign:"center"}}>
                    <div style={{fontSize:24}}>👟</div>
                    <div style={{fontSize:22,fontWeight:900,color:"#16a34a",lineHeight:1}}>{adimSeri}</div>
                    <div style={{fontSize:10,color:r.sub,fontWeight:700}}>günlük 10K adım serisi</div>
                    {adimSeri>=7&&<div style={{fontSize:9,color:"#16a34a",fontWeight:800,marginTop:2}}>🔥 {adimSeri>=30?"Efsane!":adimSeri>=14?"Harika!":"Devam et!"}</div>}
                  </div>
                )}
              </div>
            )}

            {/* ÖĞÜNLER */}
            <div style={CS}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={CT}>Bugünün Öğünleri</div>
                <button onClick={()=>setTab("ara")} style={{...BTN("#16a34a","6px 13px"),fontSize:12}}>+ Ekle</button>
              </div>
              {YEMEK_KAT.map(kat=>{
                const yk=bugKatYemek(kat);
                if(yk.length===0)return null;
                return(
                  <div key={kat} style={{marginBottom:10}}>
                    <div style={{fontSize:11,fontWeight:800,color:r.sub,marginBottom:5,display:"flex",justifyContent:"space-between"}}>
                      <span>{kat.toUpperCase()}</span><span style={{color:"#16a34a"}}>{bugKatKal(kat)} kcal</span>
                    </div>
                    {yk.map((y,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${r.rowB}`}}>
                        <div>
                          <div style={{fontSize:13,fontWeight:700,color:r.text}}>{y.ad}</div>
                          <div style={{fontSize:10,color:r.muted}}>{y.gram}g · {y.saat}</div>
                        </div>
                        <div style={{display:"flex",gap:5,alignItems:"center"}}>
                          <span style={BAD(acikRenk(y.acik||50))}>{y.acik}</span>
                          <div style={{fontWeight:800,color:"#16a34a",fontSize:13}}>{y.gramKal}</div>
                          <button onClick={()=>{const bg=bugunKey();gunSet(bg,"yemekler",gunV(bg).yemekler.filter((_,idx)=>idx!==bugYemekler.indexOf(y)));}} style={{background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:15}}>×</button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
              {bugYemekler.length===0&&<div style={{textAlign:"center",color:r.muted,padding:"14px 0",fontSize:13}}>Henüz yemek eklenmedi.</div>}
            </div>

            {/* SPOR */}
            <div style={CS}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={CT}>Bugünün Sporu</div>
                <button onClick={()=>setSporModal(true)} style={{...BTN("#10b981","6px 13px"),fontSize:12}}>+ Spor Ekle</button>
              </div>
              {bugSpor.length===0
                ?<div style={{color:r.muted,fontSize:13,textAlign:"center",padding:"8px 0"}}>Henüz spor kaydedilmedi.</div>
                :bugSpor.map((s,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${r.rowB}`}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:r.text}}>{s.ikon||"🏃"} {s.ad||"Spor"}</div>
                      <div style={{fontSize:10,color:r.muted}}>{s.sure} dk · {s.tempo==="hafif"?"🚶 Hafif tempo":s.tempo==="orta"?"🏃 Orta tempo":"💨 Yüksek tempo"}</div>
                    </div>
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      <div style={{fontWeight:800,color:"#10b981"}}>−{s.kcal} kcal</div>
                      <button onClick={()=>{const bg=bugunKey();gunSet(bg,"spor",gunV(bg).spor.filter((_,idx)=>idx!==i));}} style={{background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:15}}>×</button>
                    </div>
                  </div>
                ))
              }
              {bugSpor.length>0&&<div style={{fontSize:12,fontWeight:700,color:"#10b981",marginTop:6}}>Toplam: −{topSpor} kcal yakıldı</div>}
            </div>

            {/* SU */}
            <div style={{...CS,cursor:"pointer"}} onClick={()=>setTab("su")}>
              <div style={CT}>Su Takibi</div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{fontSize:26,fontWeight:900,color:"#2563eb"}}>{bugSu}<span style={{fontSize:11}}>ml</span></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,color:r.muted}}>Hedef: {suHed}ml</div>
                  <div style={PB}><div style={PF((bugSu/suHed)*100,"#2563eb")}/></div>
                </div>
              </div>
            </div>

            {/* ADIM SAYAR */}
            <div style={CS}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={CT}>👟 Adım Sayar</div>
                {adimIzin==="verildi"||adimIzin==="android"
                  ?<span style={{fontSize:10,fontWeight:700,color:"#16a34a",background:"#dcfce7",padding:"2px 10px",borderRadius:99}}>● Sayıyor</span>
                  :adimIzin==="reddedildi"
                  ?<span style={{fontSize:10,fontWeight:700,color:"#ef4444",background:"#fef2f2",padding:"2px 10px",borderRadius:99}}>İzin Yok</span>
                  :<span style={{fontSize:10,fontWeight:700,color:"#f59e0b",background:"#fffbeb",padding:"2px 10px",borderRadius:99}}>Bekliyor</span>
                }
              </div>

              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:10}}>
                <div>
                  <div style={{fontSize:40,fontWeight:900,color:"#f59e0b",lineHeight:1}}>{adimSayar.toLocaleString("tr-TR")}</div>
                  <div style={{fontSize:11,color:r.sub,marginTop:3}}>
                    ~{Math.round(adimSayar*0.04)} kcal yakıldı · ~{(adimSayar*0.00076).toFixed(2)} km
                  </div>
                </div>
                <div style={{textAlign:"right",paddingBottom:4}}>
                  <div style={{fontSize:11,color:r.muted}}>Hedef: 10.000</div>
                  <div style={{fontSize:22,fontWeight:900,color:adimSayar>=10000?"#16a34a":"#f59e0b"}}>{Math.min(100,Math.round((adimSayar/10000)*100))}%</div>
                </div>
              </div>

              <div style={PB}><div style={PF(Math.min(100,(adimSayar/10000)*100),"#f59e0b")}/></div>

              {adimSayar>=10000&&<div style={{textAlign:"center",fontSize:13,fontWeight:800,color:"#16a34a",marginTop:8}}>🎉 Günlük hedefe ulaştın!</div>}

              {adimIzin==="reddedildi"&&(
                <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:10,padding:"10px 12px",marginTop:10,fontSize:11,color:"#ef4444"}}>
                  ❌ Hareket izni reddedildi. Telefon Ayarları → Safari/Chrome → Hareket & Yön iznini aç, sonra sayfayı yenile.
                  <button style={{...BTN("#ef4444","5px 0"),width:"100%",marginTop:6,fontSize:11}} onClick={()=>{localStorage.removeItem("doya_adim_izin");setAdimIzin("bekliyor");setAdimIzinModal(true);}}>Tekrar Dene</button>
                </div>
              )}
              {adimIzin==="desteklenmiyor"&&(
                <div style={{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:10,padding:"10px 12px",marginTop:10,fontSize:11,color:"#d97706"}}>
                  ⚠️ Bu tarayıcı sensörü desteklemiyor. iPhone'da Safari, Android'de Chrome kullan.
                </div>
              )}
              {(adimIzin==="verildi"||adimIzin==="android")&&(
                <div style={{display:"flex",gap:8,marginTop:10}}>
                  <button style={{...BTN("#6b7280","8px 0"),flex:1,fontSize:11}} onClick={()=>{setAdimAktif(false);localStorage.setItem("doya_adim_izin","bekliyor");setAdimIzin("bekliyor");}}>⏹ Durdur</button>
                  <button style={{...BTN("#ef4444","8px 0"),flex:1,fontSize:11}} onClick={()=>{setAdimSayar(0);adimRef.current.sayac=0;localStorage.setItem("doya_adim_"+tarihKey(new Date()),"0");}}>🔄 Sıfırla</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ──── SU ──────────────────────────────────────────────── */}
        {tab==="su"&&(
          <div style={{padding:16}}>
            <div style={{background:"linear-gradient(135deg,#2563eb,#1d4ed8)",borderRadius:16,padding:18,color:"#fff",marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:700}}>SU TAKİBİ</div>
              <div style={{fontSize:46,fontWeight:900}}>{bugSu}<span style={{fontSize:16}}>ml</span></div>
              <div style={{opacity:.8,fontSize:12}}>Hedef: {suHed}ml</div>
              <div style={{marginTop:8,background:"rgba(255,255,255,.2)",borderRadius:6,height:10,overflow:"hidden"}}>
                <div style={{height:"100%",width:Math.min(100,(bugSu/suHed)*100)+"%",background:"#fff",borderRadius:6}}/>
              </div>
            </div>
            <div style={CS}>
              <div style={CT}>Hızlı Ekle</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
                {[100,150,200,250,330,500].map(m=>(
                  <button key={m} onClick={()=>{const bg=bugunKey();gunSet(bg,"su",Math.min((gunV(bg).su||0)+m,9999));}} style={{background:d?"#1e3a5f":"#dbeafe",color:"#2563eb",border:"none",borderRadius:10,padding:"12px 0",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>+{m}ml</button>
                ))}
              </div>
              <div style={{borderTop:`1px solid ${r.brd}`,paddingTop:12}}>
                <div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:6}}>ÖZEL MİKTAR</div>
                <div style={{display:"flex",gap:8}}>
                  <input
                    style={{...IS,flex:1}}
                    type="number"
                    placeholder="ml gir..."
                    id="suManuel"
                    onKeyDown={e=>{if(e.key==="Enter"){const v=+e.target.value;if(v>0){const bg=bugunKey();gunSet(bg,"su",Math.min((gunV(bg).su||0)+v,9999));e.target.value="";}}}
                  }/>
                  <button
                    style={{...BTN("#2563eb","12px 16px"),whiteSpace:"nowrap"}}
                    onClick={()=>{const inp=document.getElementById("suManuel");const v=+inp.value;if(v>0){const bg=bugunKey();gunSet(bg,"su",Math.min((gunV(bg).su||0)+v,9999));inp.value="";}}}
                  >Ekle</button>
                </div>
                <div style={{display:"flex",gap:8,marginTop:8}}>
                  <button style={{...BTN("#ef4444","8px 0"),flex:1,fontSize:12}} onClick={()=>{const bg=bugunKey();gunSet(bg,"su",Math.max((gunV(bg).su||0)-100,0));}}>−100ml</button>
                  <button style={{...BTN("#6b7280","8px 0"),flex:1,fontSize:12}} onClick={()=>{const bg=bugunKey();gunSet(bg,"su",0);}}>Sıfırla</button>
                </div>
              </div>
            </div>
            {/* SU FAYDALARI */}
            <div style={{...CS,background:d?"#0f1f3d":"#eff6ff",border:`1px solid ${d?"#1e3a5f":"#bfdbfe"}`}}>
              <div style={{fontSize:13,fontWeight:900,color:"#2563eb",marginBottom:10}}>💧 Neden Su İçmeliyiz?</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[
                  {ikon:"🧠",baslik:"Beyin Fonksiyonu",acik:"Yalnızca %1-2 dehidrasyon konsantrasyon ve hafızayı bozar"},
                  {ikon:"🔥",baslik:"Metabolizma",acik:"Günlük 2L su içmek metabolizmayı %30 hızlandırır"},
                  {ikon:"💪",baslik:"Kas Performansı",acik:"Kasların %75'i sudur — spor öncesi/sonrası içmek gücü artırır"},
                  {ikon:"🫀",baslik:"Kalp Sağlığı",acik:"Yeterli hidrasyon kan viskozitesini düşürür, kalbi korur"},
                  {ikon:"🌿",baslik:"Toksin Atımı",acik:"Böbrekler suyla çalışır, toksinleri idrarla dışarı atar"},
                  {ikon:"✨",baslik:"Cilt Sağlığı",acik:"Su cildi nemlendirir, kırışıklıkları azaltır, parlaklık verir"},
                  {ikon:"🤸",baslik:"Eklem Sağlığı",acik:"Eklem sıvısının ana maddesi sudur, ağrıyı önler"},
                  {ikon:"😴",baslik:"Uyku Kalitesi",acik:"Gece yeterli hidrasyon kas kramplarını ve uykusuzluğu azaltır"},
                ].map(f=>(
                  <div key={f.baslik} style={{background:d?"#0d1b2a":"#fff",borderRadius:10,padding:"10px 10px",display:"flex",gap:8,alignItems:"flex-start"}}>
                    <div style={{fontSize:18,flexShrink:0}}>{f.ikon}</div>
                    <div>
                      <div style={{fontSize:11,fontWeight:800,color:d?"#93c5fd":"#1d4ed8",marginBottom:2}}>{f.baslik}</div>
                      <div style={{fontSize:10,color:r.sub,lineHeight:1.4}}>{f.acik}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:10,background:d?"#0d1b2a":"#dbeafe",borderRadius:10,padding:"10px 12px"}}>
                <div style={{fontSize:11,fontWeight:800,color:"#1d4ed8",marginBottom:4}}>💡 Günlük Su Hedefi Nasıl Hesaplanır?</div>
                <div style={{fontSize:11,color:r.sub,lineHeight:1.6}}>
                  <b>Temel kural:</b> Vücut ağırlığı (kg) × 35ml = günlük su ihtiyacı<br/>
                  Örneğin 70 kg → 70 × 35 = <b style={{color:"#2563eb"}}>2.450 ml/gün</b><br/>
                  Yoğun spor yapıyorsan +500-750ml ekle. Sıcak havalarda +300-500ml.
                </div>
              </div>
            </div>

            <div style={CS}>
              <div style={CT}>Son 7 Gün</div>
              {Array.from({length:7},(_,i)=>{const dt=new Date();dt.setDate(dt.getDate()-i);return{key:tarihKey(dt),label:i===0?"Bugün":AYLAR[dt.getMonth()]+" "+dt.getDate()};}).map(g=>{
                const gs=gunV(g.key).su||0;
                return(
                  <div key={g.key} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:`1px solid ${r.rowB}`}}>
                    <div style={{fontSize:11,color:r.sub,width:55}}>{g.label}</div>
                    <div style={{flex:1,...PB,marginTop:0}}><div style={PF((gs/suHed)*100,"#2563eb")}/></div>
                    <div style={{fontSize:11,fontWeight:700,color:"#2563eb",width:60,textAlign:"right"}}>{gs}ml</div>
                  </div>
                );
              })}
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
                <button style={{...BTN("#8b5cf6","8px 12px"),fontSize:12}} onClick={()=>setPuan(pp=>pp+5)}>Kaydet +5</button>
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
        {(tab==="ara"||tab==="gozat")&&(
          <div style={{padding:16}}>
            <div style={{display:"flex",background:d?"#0f172a":"#f3f4f6",borderRadius:12,padding:3,marginBottom:12}}>
              {["ara","gozat"].map(t=><button key={t} onClick={()=>setAraSekmesi(t)||setTab(t)} style={{flex:1,padding:"9px 0",border:"none",borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,background:tab===t?"#16a34a":"transparent",color:tab===t?"#fff":r.sub}}>{t==="ara"?"🔍 Ara":"🗂 Gözat"}</button>)}
            </div>

            {tab==="ara"&&(
              <>
                <input style={{...IS,marginBottom:10}} placeholder="Besin veya marka ara..." value={besinArama} onChange={e=>setBesinArama(e.target.value)} autoFocus/>
                {filtreBesinler.map(b=>(
                  <div key={b.id} style={{...CS,margin:"7px 0",padding:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>{setSecBesin(b);setYemekGram(String(b.por||100));}}>
                      <div>
                        <div style={{fontWeight:800,fontSize:13,color:r.text}}>{b.ad}{b.marka?` (${b.marka})`:""}</div>
                        <div style={{marginBottom:1}}><YildizGoster v={b.yildiz??3} boyut={12}/></div>
                        <div style={{fontSize:10,color:r.muted}}>{b.por}g · P:{b.pro}g K:{b.karb}g Y:{b.yag}g · {b.kat}</div>
                        <div style={{fontSize:9,color:r.muted,fontStyle:"italic",marginTop:1}}>*Tahmini değerlerdir</div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontWeight:900,color:"#16a34a",fontSize:16}}>{b.kal}</div>
                          <div style={{fontSize:9,color:r.muted}}>kcal/{b.por}g</div>
                        </div>
                        {/* 🔬 Derin analiz tik */}
                        <button
                          onClick={e=>{e.stopPropagation();setDerinAnaliz(p=>p===b.id?null:b.id);}}
                          title="Derin Analiz"
                          style={{background:derinAnaliz===b.id?"#7c3aed":"transparent",border:`1.5px solid ${derinAnaliz===b.id?"#7c3aed":r.inpB}`,borderRadius:8,padding:"3px 7px",cursor:"pointer",fontSize:10,fontWeight:800,color:derinAnaliz===b.id?"#fff":r.sub,fontFamily:"'Nunito',sans-serif",display:"flex",alignItems:"center",gap:3}}>
                          🔬 {derinAnaliz===b.id?"▲":"▼"}
                        </button>
                      </div>
                    </div>
                    <div style={{...PB,height:5,marginTop:6}}><div style={{...PF(b.acik,acikRenk(b.acik)),height:5}}/></div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:3}}>
                      <span style={{fontSize:10,color:r.muted}}>{b.aclik} içinde acıktırır</span>
                      <div style={{display:"flex",alignItems:"center",gap:4}}>
                        {b.acik<45&&(
                          <button onClick={e=>{e.stopPropagation();setDoyuruBilgi(p=>p===b.id?false:b.id);}} style={{background:"#fef9c3",border:"1.5px solid #fde047",borderRadius:"50%",width:16,height:16,fontSize:10,fontWeight:900,cursor:"pointer",color:"#ca8a04",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"'Nunito',sans-serif"}}>!</button>
                        )}
                        <span style={BAD(acikRenk(b.acik))}>{acikEtiket(b.acik)}</span>
                      </div>
                    </div>
                    {doyuruBilgi===b.id&&(
                      <div style={{background:d?"#1c1917":"#fffbeb",border:"1.5px solid #fde047",borderRadius:10,padding:"10px 12px",marginTop:6,fontSize:11,color:d?"#fef3c7":"#78350f",lineHeight:1.7}}>
                        <div style={{fontWeight:800,marginBottom:4}}>⚠️ Neden az doyurucu?</div>
                        {b.kat==="Meyve"&&<div>🍎 Meyveler ağırlıklı olarak <b>su ve basit şeker</b> içerir. Mide hızla sindirir, tokluk hormonu (leptin) yeterince tetiklenmez. Yüksek lif içeren meyveler (elma, armut) biraz daha doyurucudur.</div>}
                        {b.kat==="Sebze"&&<div>🥦 Sebzeler <b>çok düşük kalorili</b> olduğu için mide hacmini doldursa da enerji düşük kalır. Protein ve yağ içermediğinden tokluk kısa sürer — ama bu aslında düşük kalorili beslenme için <b>büyük avantaj!</b></div>}
                        {b.kat==="İçecek"&&<div>🧃 Sıvılar mide duvarını <b>katı gıdalar kadar germez</b>, bu yüzden tokluk sinyali zayıf kalır. Şekerli içecekler kan şekerini hızlı yükseltip hızlı düşürdüğü için kısa sürede tekrar acıktırır.</div>}
                        {b.kat==="Atıştırmalık"&&<div>🍪 İşlenmiş atıştırmalıklar <b>yüksek kalori, düşük lif</b> dengesiyle tasarlanmıştır. Hızlı sindirilir, kan şekerini ani yükseltir — birkaç dakika sonra daha çok yemek istenir.</div>}
                        {!["Meyve","Sebze","İçecek","Atıştırmalık"].includes(b.kat)&&<div>Bu besin <b>düşük protein ve lif</b> içerdiğinden mide boşalması hızlı olur. Yanına protein (yumurta, yoğurt) veya lif (sebze) eklemek doyum süresini uzatır.</div>}
                        <div style={{fontSize:10,color:d?"#a16207":"#92400e",marginTop:6,fontStyle:"italic"}}>💡 İpucu: Az doyurucu besinleri protein veya sağlıklı yağlarla tüket.</div>
                      </div>
                    )}
                    {/* 🔬 DERİN ANALİZ PANELİ */}
                    {derinAnaliz===b.id&&(
                      <div style={{background:d?"#1e1b2e":"#f5f3ff",border:"1.5px solid #7c3aed",borderRadius:12,padding:12,marginTop:8}}>
                        <div style={{fontSize:12,fontWeight:900,color:"#7c3aed",marginBottom:10}}>🔬 Derin Analiz — 100g başına</div>
                        {/* Ana makro çubukları */}
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
                          {[
                            {l:"Protein",  v:b.pro,  birim:"g",  renk:"#3b82f6"},
                            {l:"Karbonhidrat",v:b.karb,birim:"g",renk:"#f59e0b"},
                            {l:"Yağ",      v:b.yag,  birim:"g",  renk:"#f97316"},
                            {l:"Lif",      v:b.lif,  birim:"g",  renk:"#16a34a"},
                            {l:"Sodyum",   v:b.sod,  birim:"mg", renk:"#ef4444"},
                          ].map(m=>(
                            <div key={m.l} style={{background:d?"#0f172a":"#fff",borderRadius:8,padding:"7px 10px"}}>
                              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}>
                                <span style={{color:r.sub,fontWeight:700}}>{m.l}</span>
                                <span style={{fontWeight:900,color:m.renk}}>{m.v}{m.birim}</span>
                              </div>
                              <div style={{...PB,height:4,marginTop:0}}>
                                <div style={{...PF(Math.min(100,(m.v/(m.birim==="mg"?500:30))*100),m.renk),height:4}}/>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Vitamin & Mineral */}
                        <div style={{fontSize:11,fontWeight:800,color:"#7c3aed",marginBottom:6}}>Vitamin & Mineral</div>
                        {[
                          {l:"🩸 Demir",    v:b.demir, birim:"mg",  ihtiyac:8,   renk:"#ef4444"},
                          {l:"🦴 Kalsiyum", v:b.kals,  birim:"mg",  ihtiyac:1000,renk:"#f97316"},
                          {l:"🍊 Vit C",    v:b.vitC,  birim:"mg",  ihtiyac:90,  renk:"#f59e0b"},
                          {l:"☀️ Vit D",    v:b.vitD,  birim:"mcg", ihtiyac:20,  renk:"#fbbf24"},
                          {l:"💊 Vit B12",  v:b.vitB12,birim:"mcg", ihtiyac:2.4, renk:"#8b5cf6"},
                        ].map(m=>{
                          const pct=Math.min(100,((m.v||0)/m.ihtiyac)*100);
                          const gunlukYuzde=pct.toFixed(0);
                          return(
                            <div key={m.l} style={{marginBottom:7}}>
                              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:2}}>
                                <span style={{color:r.sub,fontWeight:700}}>{m.l}</span>
                                <span style={{fontWeight:700,color:m.v>0?m.renk:r.muted}}>
                                  {m.v>0?`${m.v}${m.birim} (%${gunlukYuzde} günlük)`:"—"}
                                </span>
                              </div>
                              <div style={{...PB,height:5,marginTop:0}}>
                                <div style={{...PF(pct,m.renk),height:5,background:m.v>0?m.renk:"#e5e7eb"}}/>
                              </div>
                            </div>
                          );
                        })}
                        <div style={{fontSize:9,color:r.muted,marginTop:6,fontStyle:"italic"}}>*Günlük yüzdeler 70kg yetişkin referansına göredir</div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {tab==="gozat"&&(
              <>
                <div style={CS}>
                  <div style={CT}>Filtreler</div>

                  {/* Kategori */}
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:5}}>Kategori</div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      {["","Tahıl","Protein","Meyve","Sebze","Süt Ürünü","Atıştırmalık","Hazır Yemek","İçecek","Çorba"].map(k=>(
                        <button key={k} onClick={()=>setBesinFil(p=>({...p,kat:k}))} style={{padding:"4px 10px",border:`1.5px solid ${besinFil.kat===k?"#16a34a":r.inpB}`,borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",background:besinFil.kat===k?"#16a34a":r.inp,color:besinFil.kat===k?"#fff":r.sub,fontFamily:"'Nunito',sans-serif"}}>{k||"Tümü"}</button>
                      ))}
                    </div>
                  </div>

                  {/* Kalori */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                    {[{l:"Min Kalori",k:"minKal"},{l:"Max Kalori",k:"maxKal"}].map(f=>(
                      <div key={f.k}><div style={{fontSize:10,color:r.sub,fontWeight:700,marginBottom:3}}>{f.l}</div>
                      <input style={{...IS,padding:"7px 9px",fontSize:12}} type="number" placeholder="kcal" value={besinFil[f.k]} onChange={e=>setBesinFil(p=>({...p,[f.k]:e.target.value}))}/></div>
                    ))}
                  </div>

                  {/* Acıktırma seçimi */}
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:5}}>Acıktırma Düzeyi</div>
                    <div style={{display:"flex",gap:6}}>
                      {[
                        {v:"cok", l:"Çok Doyurucu",  c:"#22c55e", desc:"70+"},
                        {v:"orta",l:"Orta Doyurucu",  c:"#f59e0b", desc:"45–69"},
                        {v:"az",  l:"Az Doyurucu",    c:"#ef4444", desc:"<45"},
                      ].map(o=>{
                        const sec=besinFil.acikSecim.includes(o.v);
                        return(
                          <button key={o.v} onClick={()=>setBesinFil(p=>({...p,acikSecim:sec?p.acikSecim.filter(x=>x!==o.v):[...p.acikSecim,o.v]}))}
                            style={{flex:1,padding:"8px 4px",border:`2px solid ${sec?o.c:r.inpB}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:10,background:sec?o.c+"20":r.inp,color:sec?o.c:r.sub,textAlign:"center",lineHeight:1.4}}>
                            <div>{o.l}</div>
                            <div style={{fontSize:9,opacity:.75}}>{o.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Vitamin & Mineral */}
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:7}}>Vitamin & Mineral Filtrele</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {[
                        {l:"🩸 Demir",   k:"minDemir", val:"2",   renk:"#ef4444"},
                        {l:"🦴 Kalsiyum",k:"minKals",  val:"50",  renk:"#f97316"},
                        {l:"🍊 Vit C",   k:"minVitC",  val:"10",  renk:"#f59e0b"},
                        {l:"☀️ Vit D",   k:"minVitD",  val:"1",   renk:"#fbbf24"},
                        {l:"💊 Vit B12", k:"minVitB12",val:"0.5", renk:"#8b5cf6"},
                      ].map(f=>{
                        const aktif=!!besinFil[f.k];
                        return(
                          <button key={f.k} onClick={()=>setBesinFil(p=>({...p,[f.k]:p[f.k]?undefined:f.val}))}
                            style={{padding:"5px 11px",border:`2px solid ${aktif?f.renk:r.inpB}`,borderRadius:20,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:11,background:aktif?f.renk+"22":r.inp,color:aktif?f.renk:r.sub,display:"flex",alignItems:"center",gap:4}}>
                            {aktif&&<span style={{fontSize:10}}>✓</span>}{f.l}
                          </button>
                        );
                      })}
                    </div>
                    {(besinFil.minDemir||besinFil.minKals||besinFil.minVitC||besinFil.minVitD||besinFil.minVitB12)&&(
                      <div style={{marginTop:6,fontSize:10,color:"#16a34a",fontWeight:700}}>
                        ✓ Seçilen vitaminleri yeterince içeren besinler gösteriliyor
                      </div>
                    )}
                  </div>

                  {/* Yıldız Filtresi */}
                  <div style={{marginBottom:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                      <div style={{fontSize:11,color:r.sub,fontWeight:700}}>Min. Sağlık Puanı</div>
                      <button title="Yıldız Puanı Nedir?" onClick={()=>setYildizAcik(p=>!p)} style={{background:"#16a34a",color:"#fff",border:"none",borderRadius:"50%",width:16,height:16,fontSize:10,cursor:"pointer",fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center"}}>?</button>
                    </div>
                    {yildizAcik&&(
                      <div style={{background:d?"#1e3a2a":"#f0fdf4",border:"1.5px solid #86efac",borderRadius:10,padding:"10px 12px",marginBottom:8,fontSize:11,color:r.text}}>
                        <div style={{fontWeight:800,marginBottom:4}}>⭐ Sağlık Puanı Nedir?</div>
                        <div style={{lineHeight:1.7}}>
                          <div>⭐⭐⭐⭐⭐ <b>5.0</b> — Çok sağlıklı (sebze, baklagil, balık)</div>
                          <div>⭐⭐⭐⭐ <b>4.0</b> — Sağlıklı (tam tahıl, meyve)</div>
                          <div>⭐⭐⭐ <b>3.0</b> — Orta (süt ürünleri, kepekli)</div>
                          <div>⭐⭐ <b>2.0</b> — Az sağlıklı (beyaz ekmek, pilav)</div>
                          <div>⭐ <b>1.0</b> — Düşük (işlenmiş et, tatlı)</div>
                          <div>☆☆☆☆☆ <b>0.0</b> — Sağlıksız (kola, cips, sucuk)</div>
                        </div>
                        <div style={{fontSize:10,color:r.muted,marginTop:4}}>Protein, lif, vitamin ve sodyum/yağ dengesi baz alınarak hesaplanmıştır.</div>
                      </div>
                    )}
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      {[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5].map(v=>{
                        const sec=besinFil.yildizSecim.includes(v);
                        return(
                          <button key={v} onClick={()=>setBesinFil(p=>({...p,yildizSecim:p.yildizSecim.includes(v)?p.yildizSecim.filter(x=>x!==v):[...p.yildizSecim,v]}))}
                            style={{padding:"4px 8px",border:`1.5px solid ${sec?"#f59e0b":r.inpB}`,borderRadius:8,cursor:"pointer",background:sec?"#fffbeb":r.inp,fontFamily:"'Nunito',sans-serif",display:"inline-flex",alignItems:"center"}}>
                            {v===0?<span style={{fontSize:11,fontWeight:700,color:sec?"#d97706":r.sub}}>Tümü</span>:<YildizGoster v={v} boyut={13}/>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sıralama */}
                  <div style={{marginBottom:8}}>
                    <div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:4}}>Sıralama</div>
                    <select style={{...IS}} value={besinFil.sira} onChange={e=>setBesinFil(p=>({...p,sira:e.target.value}))}>
                      <option value="isim">İsme Göre (A-Z)</option>
                      <option value="kal_az">En Az Kalori</option>
                      <option value="kal_cok">En Çok Kalori</option>
                      <option value="acik_cok">En Çok Doyurucu</option>
                      <option value="yildiz_cok">En Sağlıklı (⭐ Yüksek)</option>
                      <option value="yildiz_az">En Düşük Sağlık</option>
                    </select>
                  </div>

                  <button style={{...BTN("#6b7280","7px 0"),width:"100%",fontSize:12}} onClick={()=>{setBesinFil({kat:"",minKal:"",maxKal:"",acikSecim:[],sira:"isim",minDemir:"",minKals:"",minVitC:"",minVitD:"",minVitB12:"",yildizSecim:[]});setYildizAcik(false);}}>
                    Filtreleri Temizle
                  </button>
                </div>

                <div style={{fontSize:12,color:r.sub,padding:"0 4px",marginBottom:6}}>{filtreBesinler.length} besin bulundu</div>
                {filtreBesinler.map(b=>(
                  <div key={b.id} style={{...CS,margin:"6px 0",cursor:"pointer",padding:12}} onClick={()=>{setSecBesin(b);setYemekGram(String(b.por||100));setTab("ara");}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <div>
                        <div style={{fontWeight:800,fontSize:13,color:r.text}}>{b.ad}{b.marka?` · ${b.marka}`:""}</div>
                        <div style={{fontSize:10,color:r.muted}}>{b.kat} · {b.por}g</div>
                        <div style={{fontSize:9,color:r.muted,marginTop:1,fontStyle:"italic"}}>*Tahmini değerlerdir</div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontWeight:900,color:"#16a34a",fontSize:15}}>{b.kal} kcal</div>
                        <span style={BAD(acikRenk(b.acik))}>{b.acik}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* YENİ BESİN GÖNDER */}
            <div style={{...CS,border:"2px dashed #16a34a"}}>
              <div style={{fontWeight:800,color:"#16a34a",marginBottom:8}}>Yeni Besin Gönder (+20 puan)</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                {[{l:"Ad*",k:"ad",ph:"Gofret"},{l:"Marka",k:"marka",ph:"Ülker"},{l:"Kalori*",k:"kal",ph:"508"},{l:"Protein",k:"pro",ph:"5.8"},{l:"Karb",k:"karb",ph:"60"},{l:"Yağ",k:"yag",ph:"27"},{l:"Lif",k:"lif",ph:"1.2"},{l:"Sodyum(mg)",k:"sod",ph:"110"},{l:"Acıktırma",k:"acik",ph:"18"},{l:"Porsiyon(g)",k:"por",ph:"100"}].map(f=>(
                  <div key={f.k}><div style={{fontSize:10,color:r.sub,fontWeight:700,marginBottom:2}}>{f.l}</div>
                  <input style={{...IS,padding:"7px 9px",fontSize:12}} placeholder={f.ph} value={yeniB[f.k]||""} onChange={e=>setYeniB({...yeniB,[f.k]:e.target.value})}/></div>
                ))}
              </div>
              <div style={{marginBottom:8}}>
                <div style={{fontSize:10,color:r.sub,fontWeight:700,marginBottom:3}}>Kategori</div>
                <select style={{...IS}} value={yeniB.kat} onChange={e=>setYeniB({...yeniB,kat:e.target.value})}>
                  {["Tahıl","Protein","Meyve","Sebze","Süt Ürünü","Atıştırmalık","Hazır Yemek","İçecek","Çorba","Diğer"].map(k=><option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <button style={{...BTN(),width:"100%",padding:"11px 0"}} onClick={()=>{
                if(!yeniB.ad||!yeniB.kal)return;
                setBekBesin(prev=>[...prev,{...yeniB,id:Date.now(),kal:+yeniB.kal,pro:+yeniB.pro||0,karb:+yeniB.karb||0,yag:+yeniB.yag||0,lif:+yeniB.lif||0,sod:+yeniB.sod||0,acik:+yeniB.acik||50,por:+yeniB.por||100,aclik:"2-3 saat",onay:false,gonderen:aktif.isim}]);
                setPuan(pp=>pp+20);
                setYeniB({ad:"",marka:"",kal:"",pro:"",karb:"",yag:"",lif:"",sod:"",acik:"",por:"100",aclik:"2-3 saat",kat:"Diğer"});
              }}>Admin Onayına Gönder</button>
            </div>
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
                          uid: aktif.uid,
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
                    // Firebase: storage.ref(`posts/${aktif.uid}/${Date.now()}`).put(f) → getDownloadURL()
                    const reader=new FileReader();
                    reader.onload=ev=>setPostFoto(ev.target.result);
                    reader.readAsDataURL(f);
                  }}/>
                </>
              )}
            </div>
            {/* Genel / Arkadaşlar sekmesi */}
            <div style={{display:"flex",background:d?"#1e293b":"#f0fdf4",borderRadius:12,padding:4,marginBottom:12,gap:4}}>
              {[{v:"genel",l:"🌍 Genel"},{v:"arkadaslar",l:"👥 Arkadaşlar"}].map(s=>(
                <button key={s.v} onClick={()=>setSosyalSekme(s.v)} style={{flex:1,padding:"8px 0",borderRadius:9,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,background:sosyalSekme===s.v?d?"#334155":"#fff":"transparent",color:sosyalSekme===s.v?"#16a34a":r.sub,boxShadow:sosyalSekme===s.v?"0 1px 4px #0001":"none",transition:"all .15s"}}>{s.l}</button>
              ))}
            </div>
            {(sosyalSekme==="arkadaslar"&&arkadaslar.length===0)&&(
              <div style={{textAlign:"center",color:r.muted,padding:"24px 0",fontSize:13}}>Henüz arkadaşın yok. Arkadaş ekleyerek onların paylaşımlarını gör!</div>
            )}
            {paylasimlar.filter(ps=>{
              if(engelliler.includes(ps.uid)) return false;
              if(sosyalSekme==="arkadaslar") return arkadaslar.some(a=>a.uid===ps.uid)||ps.uid===aktif.uid;
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
                  {ps.uid===aktif.uid&&(
                    <span style={{fontSize:10,color:r.muted,fontStyle:"italic"}}>senin paylaşımın</span>
                  )}
                </div>
                <div style={{fontSize:13,color:r.text,marginBottom:8,lineHeight:1.5}}>{ps.icerik}</div>
                {ps.postFoto&&(
                  <div style={{position:"relative",borderRadius:12,overflow:"hidden",marginBottom:8}}>
                    <img src={ps.postFoto} style={{width:"100%",maxHeight:220,objectFit:"cover",display:"block"}} alt="post foto"/>
                    {ps.uid!==aktif.uid&&(
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
                    const yeniB2=ps.begeniler.includes(aktif.uid)?ps.begeniler.filter(u=>u!==aktif.uid):[...ps.begeniler,aktif.uid];
                    await postGuncelle(ps.id,{begeniler:yeniB2}).catch(console.error);
                  }} style={{...BTN(ps.begeniler.includes(aktif.uid)?"#16a34a":"#f3f4f6","6px 12px"),color:ps.begeniler.includes(aktif.uid)?"#fff":"#374151",fontSize:12}}>❤️ {ps.begeniler.length}</button>
                  {ps.uid===aktif.uid?(
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
                    {(y.uid===aktif.uid||ps.uid===aktif.uid)&&<button onClick={()=>setPaylasimlar(prev=>prev.map(p2=>p2.id===ps.id?{...p2,yorumlar:p2.yorumlar.filter((_,ii)=>ii!==i)}:p2))} style={{background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:12}}>×</button>}
                  </div>
                ))}
                <div style={{display:"flex",gap:6,marginTop:6}}>
                  <input style={{...IS,flex:1,padding:"7px 10px",fontSize:12}} placeholder="Yorum yaz..." value={yorumMet[ps.id]||""} onChange={e=>setYorumMet(p=>({...p,[ps.id]:e.target.value}))} onKeyDown={async e=>{if(e.key==="Enter"&&yorumMet[ps.id]?.trim()){const yYorum=[...ps.yorumlar,{uid:aktif.uid,isim:aktif.isim,yorum:yorumMet[ps.id],zaman:"Az önce"}];await postGuncelle(ps.id,{yorumlar:yYorum}).catch(console.error);setYorumMet(p=>({...p,[ps.id]:""}));}}}/>
                  <button onClick={async()=>{if(!yorumMet[ps.id]?.trim())return;const yYorum=[...ps.yorumlar,{uid:aktif.uid,isim:aktif.isim,yorum:yorumMet[ps.id],zaman:"Az önce"}];await postGuncelle(ps.id,{yorumlar:yYorum}).catch(console.error);setYorumMet(p=>({...p,[ps.id]:""}));}} style={{...BTN("#3b82f6","7px 12px"),fontSize:12}}>↑</button>
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
              <div style={{fontSize:22,fontWeight:900,letterSpacing:2,margin:"4px 0"}}>{aktif.uid}</div>
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

            {!demoEklendi&&arkadaslar.length===0&&(
              <div style={{...CS,border:"1px dashed #6b7280",textAlign:"center"}}>
                <div style={{fontSize:12,color:r.sub,marginBottom:8}}>Demo: Gelen istek simüle et</div>
                <button onClick={()=>{setGelenIstekler([{uid:"NTR-000003",isim:"Ayşe Kaya"}]);setDemoEklendi(true);}} style={{...BTN("#6b7280","8px 16px"),fontSize:12}}>Demo İstek</button>
              </div>
            )}

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
        {tab==="yaris"&&(
          <div style={{padding:16}}>
            <div style={{background:"linear-gradient(135deg,#f59e0b,#d97706)",borderRadius:16,padding:18,color:"#fff",marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:700}}>ARKADAŞLARLA YARIŞ</div>
              <div style={{fontSize:13,opacity:.8,marginTop:2}}>En çok puan toplayan birinci!</div>
            </div>
            {yarisData[0]?.uid===aktif.uid&&(
              <div style={{...CS,textAlign:"center",background:d?"#1c1a10":"linear-gradient(135deg,#fef3c7,#fde68a)",border:"2px solid #f59e0b"}}>
                <div style={{fontSize:52,marginBottom:4}}>🏆</div>
                <div style={{fontSize:18,fontWeight:900,color:"#92400e"}}>1. Sıradasın!</div>
                <div style={{fontSize:13,color:"#78350f",marginTop:4}}>Tebrikler, lider sensin! 🎉</div>
              </div>
            )}
            <div style={CS}>
              <div style={CT}>Lider Tablosu</div>
              {yarisData.map((u,i)=>(
                <div key={u.uid} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${r.rowB}`,background:u.uid===aktif.uid?d?"#1a2e1a":"#f0fdf4":"transparent",borderRadius:8,paddingLeft:8,marginBottom:2}}>
                  <div style={{fontSize:i===0?28:18,minWidth:34,textAlign:"center"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}.`}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:u.uid===aktif.uid?900:700,color:r.text}}>{u.isim}{u.uid===aktif.uid?" (Sen)":""}</div>
                    <div style={{fontSize:10,color:r.muted}}>Bugün: {u.kalBug} kcal · Spor: {u.sporBug} kcal</div>
                  </div>
                  <div style={{fontWeight:900,color:"#f59e0b",fontSize:16}}>{u.puan}</div>
                </div>
              ))}
              {arkadaslar.length===0&&<div style={{textAlign:"center",color:r.muted,padding:"14px 0",fontSize:12}}>Arkadaş ekleyerek yarışa katıl!</div>}
            </div>
          </div>
        )}

        {/* ──── PUAN ────────────────────────────────────────────── */}
        {tab==="puan"&&(
          <div style={{padding:16}}>
            <div style={{background:"linear-gradient(135deg,#f59e0b,#d97706)",borderRadius:16,padding:18,color:"#fff",marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:700}}>PUANINIZ</div>
              <div style={{fontSize:46,fontWeight:900}}>{puan}</div>
              <div style={{fontSize:12,opacity:.8}}>Puan biriktir, premium kazan!</div>
            </div>

            {!premium&&(
              <div style={{...CS,border:"2px solid #f59e0b",background:d?"#1c1a10":"#fffbeb"}}>
                <div style={{fontSize:15,fontWeight:900,color:"#d97706",marginBottom:6}}>⭐ Premium — Sadece {PREMIUM_FIYAT}₺/ay</div>
                <div style={{fontSize:12,color:r.sub,marginBottom:12}}>Tek avantaj: Tüm reklamlar kalkar. Başka hiçbir şey değişmez.</div>
                <button style={{...BTN("#f59e0b"),width:"100%",padding:"12px 0"}} onClick={async()=>{
                  setPremium(true); setReklam(false);
                  if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{premium:true}).catch(console.error);
                  setKullanicilar(p=>p.map(u=>u.uid===aktif.uid?{...u,premium:true}:u));
                }}>
                  {PREMIUM_FIYAT}₺/ay — Şimdi Satın Al
                </button>
              </div>
            )}
            {premium&&(
              <div style={{...CS,textAlign:"center"}}>
                <div style={{fontSize:32}}>⭐</div>
                <div style={{fontSize:16,fontWeight:900,color:"#16a34a"}}>Premium Aktif — Reklamsız!</div>
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
                  <div style={{fontSize:24,fontWeight:900,color:"#f59e0b"}}>{aktif.davet||0}</div>
                  <div style={{fontSize:10,color:r.sub}}>Davet Ettiğin</div>
                </div>
                <div style={{background:d?"#1e293b":"#f9fafb",borderRadius:10,padding:12,textAlign:"center"}}>
                  <div style={{fontSize:24,fontWeight:900,color:"#16a34a"}}>{(aktif.davet||0)*100}</div>
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
                  <div style={{marginTop:4,fontSize:11,color:r.muted}}>Her satın alımda referans sahibine otomatik +150 puan eklenir.</div>
                </div>
              ):(
                <>
                  <div style={{fontSize:11,color:r.sub,marginBottom:10,lineHeight:1.6}}>
                    Arkadaşının referans kodunu gir — sana <b style={{color:"#f59e0b"}}>+150 puan</b>, arkadaşına da <b style={{color:"#f59e0b"}}>+150 puan</b>!
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
              {[{l:"Yemek kaydet",p:"+10"},{l:"Besin gönder (onay)",p:"+20"},{l:"Arkadaş davet et",p:"+100"},{l:"Referans kodu ile kayıt",p:"+100"},{l:"Kilo kaydı",p:"+5"}].map(x=>(
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
                  "Aktif kullanıcı davet et — günlük giren kişiler daha fazla reklam görür",
                  "Premium kullanıcı getir — satın alım başına %25 komisyon",
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
                  <input style={{...IS}} placeholder={f.ph} value={aktif?.[f.k]||""} onChange={e=>setKullanicilar(prev=>prev.map(u=>u.uid===aktif.uid?{...u,[f.k]:e.target.value}:u))}/>
                </div>
              ))}
              <button style={{...BTN(),width:"100%",padding:"11px 0"}} onClick={()=>{setAdminMsg("IBAN kaydedildi!");setTimeout(()=>setAdminMsg(""),2000);}}>Kaydet</button>
              {adminMsg&&<div style={{color:"#16a34a",fontWeight:700,fontSize:13,textAlign:"center",marginTop:8}}>{adminMsg}</div>}
            </div>

          </div>
        )}

        {/* ──── PROFİL ──────────────────────────────────────────── */}
        {tab==="profil"&&(
          <div style={{padding:16}}>

            {/* PROFIL KARTI — büyük fotoğraf + isim düzenleme */}
            <div style={{...CS,padding:0,overflow:"hidden"}}>
              {/* Arka plan banner */}
              <div style={{height:90,background:"linear-gradient(135deg,#16a34a,#15803d)",position:"relative"}}>
                <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,#ffffff0a 1px,transparent 1px)",backgroundSize:"20px 20px"}}/>
              </div>

              <div style={{padding:"0 16px 16px",position:"relative"}}>
                {/* Büyük profil fotoğrafı */}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:12}}>
                  <div style={{position:"relative",marginTop:-36}}>
                    <div
                      onClick={()=>profFotoRef.current.click()}
                      style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,#22c55e,#052e16)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,color:"#fff",cursor:"pointer",overflow:"hidden",border:"4px solid "+r.card,boxShadow:"0 4px 14px #0003",flexShrink:0}}
                    >
                      {profFoto
                        ?<img src={profFoto} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="profil"/>
                        :<span>{aktif.isim[0]}</span>
                      }
                    </div>
                    {/* Fotoğraf değiştir butonu */}
                    <button
                      onClick={()=>profFotoRef.current.click()}
                      style={{position:"absolute",bottom:2,right:2,width:24,height:24,borderRadius:"50%",background:"#16a34a",border:"2px solid "+r.card,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:12,color:"#fff"}}
                    >📷</button>
                  </div>
                  <div style={{display:"flex",gap:6,paddingBottom:4}}>
                    {isAdmin&&<span style={{background:"#fef3c7",color:"#78350f",fontSize:11,fontWeight:800,padding:"3px 9px",borderRadius:20}}>ADMIN</span>}
                    {isOrtak&&<span style={{background:"#eff6ff",color:"#2563eb",fontSize:11,fontWeight:800,padding:"3px 9px",borderRadius:20}}>{aktif.refTip==="influencer"?"🎯":"🏢"}</span>}
                    {premium&&<span style={{background:"#fef3c7",color:"#92400e",fontSize:11,fontWeight:800,padding:"3px 9px",borderRadius:20}}>⭐</span>}
                  </div>
                </div>

                {/* İsim düzenleme */}
                {isimDuzenle?(
                  <div style={{marginBottom:10}}>
                    <div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:5}}>Yeni İsim</div>
                    <div style={{display:"flex",gap:8}}>
                      <input
                        style={{...IS,flex:1,fontWeight:800,fontSize:15}}
                        value={yeniIsim}
                        onChange={e=>setYeniIsim(e.target.value)}
                        placeholder={aktif.isim}
                        autoFocus
                        maxLength={30}
                      />
                      <button style={{...BTN("#16a34a","10px 14px")}} onClick={async()=>{
                        const trimmed=yeniIsim.trim();
                        if(!trimmed||trimmed===aktif.isim){setIsimDuzenle(false);return;}
                        setAktif(p=>({...p,isim:trimmed}));
                        setKullanicilar(p=>p.map(u=>u.uid===aktif.uid?{...u,isim:trimmed}:u));
                        if(firebaseUID) await kullaniciyiGuncelle(firebaseUID,{isim:trimmed}).catch(console.error);
                        setIsimDuzenle(false);
                      }}>✓</button>
                      <button style={{...BTN("#6b7280","10px 14px")}} onClick={()=>setIsimDuzenle(false)}>×</button>
                    </div>
                    <div style={{fontSize:10,color:r.muted,marginTop:4}}>{yeniIsim.length}/30 karakter</div>
                  </div>
                ):(
                  <div style={{marginBottom:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                      <div style={{fontSize:20,fontWeight:900,color:r.text}}>{aktif.isim}</div>
                      <button
                        onClick={()=>{setYeniIsim(aktif.isim);setIsimDuzenle(true);}}
                        style={{background:d?"#334155":"#f3f4f6",border:"none",borderRadius:8,padding:"4px 8px",fontSize:11,cursor:"pointer",color:r.sub,fontFamily:"'Nunito',sans-serif",fontWeight:700}}
                      >✏️ Düzenle</button>
                    </div>
                    <div style={{fontSize:12,color:r.sub}}>{aktif.email}</div>
                    <div style={{fontSize:11,color:"#16a34a",fontWeight:700,marginTop:2}}>{aktif.uid}</div>
                  </div>
                )}

                {/* İstatistikler */}
                <div style={{display:"flex",gap:8,marginTop:8}}>
                  {[
                    {l:"Gönderi",v:paylasimlar.filter(p=>p.uid===aktif.uid).length},
                    {l:"Puan",v:puan},
                    {l:"Arkadaş",v:arkadaslar.length},
                  ].map(s=>(
                    <div key={s.l} style={{flex:1,textAlign:"center",background:d?"#0f172a":"#f9fafb",borderRadius:10,padding:"8px 4px"}}>
                      <div style={{fontSize:18,fontWeight:900,color:"#16a34a"}}>{s.v}</div>
                      <div style={{fontSize:9,color:r.muted,fontWeight:700}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <input ref={profFotoRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{
                const f=e.target.files[0]; if(!f)return;
                const reader=new FileReader();
                reader.onload=ev=>{
                  setProfFoto(ev.target.result);
                  setKullanicilar(prev=>prev.map(u=>u.uid===aktif.uid?{...u,foto:ev.target.result}:u));
                  if(firebaseUID) kullaniciyiGuncelle(firebaseUID,{foto:ev.target.result}).catch(console.error);
                };
                reader.readAsDataURL(f);
              }}/>
            </div>

            {/* SEKME: Genel / Gönderiler */}
            <div style={{display:"flex",background:d?"#0f172a":"#f3f4f6",borderRadius:12,padding:3,marginBottom:12,gap:3}}>
              {[{v:"genel",l:"⚙️ Genel"},{v:"gonderiler",l:`📸 Gönderilerim (${paylasimlar.filter(p=>p.uid===aktif.uid).length})`},{v:"performans",l:"📊 Performans"}].map(s=>(
                <button key={s.v} onClick={()=>setProfilSekme(s.v)} style={{flex:1,padding:"9px 4px",borderRadius:10,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12,background:profilSekme===s.v?"#16a34a":"transparent",color:profilSekme===s.v?"#fff":r.sub,transition:"all .15s"}}>{s.l}</button>
              ))}
            </div>

            {/* ── GENEL SEKME ── */}
            {profilSekme==="genel"&&(
              <>
                {bmi&&bmiD&&(
                  <div style={{...CS,background:`${bmiD.renk}12`,border:`1.5px solid ${bmiD.renk}30`}}>
                    <div style={CT}>İlerleme & BMI</div>
                    <div style={{fontSize:32,fontWeight:900,color:bmiD.renk}}>{bmi} <span style={{fontSize:14}}>{bmiD.etiket}</span></div>
                    <div style={{fontSize:12,color:r.sub}}>{bmiD.acik}</div>
                    {tdee&&<div style={{marginTop:10,background:d?"#1e293b":"#f9fafb",borderRadius:10,padding:10}}>
                      <div style={{fontSize:12,color:r.sub,fontWeight:700,marginBottom:6}}>Günlük Yakım</div>
                      <div style={{display:"flex",gap:8}}>
                        {[{l:"İdeal sürdür",v:tdee},{l:"Kilo ver",v:tdee-500},{l:"Kilo al",v:tdee+300}].map(x=>(
                          <div key={x.l} style={{flex:1,textAlign:"center"}}>
                            <div style={{fontSize:13,fontWeight:900,color:"#7c3aed"}}>{x.v}</div>
                            <div style={{fontSize:9,color:r.muted}}>{x.l}</div>
                          </div>
                        ))}
                      </div>
                    </div>}
                  </div>
                )}

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
                      cinsiyet:profil.cinsiyet, aktivite:profil.aktivite, hedef:profil.hedef
                    }).catch(console.error);
                    setTab("anasayfa");
                  }}>Kaydet</button>
                </div>

                <div style={CS}>
                  <div style={CT}>Gizlilik & Sosyal</div>
                  <div style={{marginBottom:10}}>
                    <div style={{fontSize:12,fontWeight:700,color:r.text,marginBottom:6}}>Sosyal Özellikler</div>
                    <div style={{display:"flex",gap:8}}>
                      {[{v:true,l:"Aktif"},{v:false,l:"Kapalı"}].map(o=><button key={String(o.v)} onClick={()=>{setSosyalAktif(o.v);setKullanicilar(p=>p.map(u=>u.uid===aktif.uid?{...u,sosyal:o.v}:u));}} style={{flex:1,padding:"9px",border:`2px solid ${sosyalAktif===o.v?"#16a34a":r.inpB}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,background:sosyalAktif===o.v?d?"#0f2a1a":"#f0fdf4":r.inp,color:sosyalAktif===o.v?"#16a34a":r.sub}}>{o.l}</button>)}
                    </div>
                  </div>
                  {sosyalAktif&&<div>
                    <div style={{fontSize:12,fontWeight:700,color:r.text,marginBottom:6}}>Hesap Türü</div>
                    <div style={{display:"flex",gap:8}}>
                      {[{v:true,l:"🔓 Açık"},{v:false,l:"🔒 Gizli"}].map(o=><button key={String(o.v)} onClick={()=>{setAcikHesap(o.v);setKullanicilar(p=>p.map(u=>u.uid===aktif.uid?{...u,acik:o.v}:u));}} style={{flex:1,padding:"9px",border:`2px solid ${acikHesap===o.v?"#16a34a":r.inpB}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,background:acikHesap===o.v?d?"#0f2a1a":"#f0fdf4":r.inp,color:acikHesap===o.v?"#16a34a":r.sub}}>{o.l}</button>)}
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
              const benimGonderiler=paylasimlar.filter(ps=>ps.uid===aktif.uid);
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
              <div style={{paddingBottom:20}}>
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

            <div style={{fontSize:12,fontWeight:700,color:r.sub,padding:"4px 4px 6px"}}>Besin Onay Kuyruğu ({bekBesin.length})</div>
            {bekBesin.length===0?<div style={{...CS,textAlign:"center",color:r.muted,padding:"20px"}}>Onay bekleyen yok.</div>:
              bekBesin.map(b=>(
                <div key={b.id} style={{...CS,border:"2px solid #f59e0b"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <div><div style={{fontWeight:800,color:r.text}}>{b.ad}</div><div style={{fontSize:11,color:r.muted}}>Gönderen: {b.gonderen}</div></div>
                    <span style={BAD("#f59e0b")}>Bekliyor</span>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button style={{...BTN("#16a34a"),flex:1,padding:"9px 0"}} onClick={()=>{setBesinler(p=>[...p,{...b,id:Date.now(),onay:true}]);setBekBesin(p=>p.filter(x=>x.id!==b.id));}}>Onayla</button>
                    <button style={{...BTN("#ef4444"),flex:1,padding:"9px 0"}} onClick={()=>setBekBesin(p=>p.filter(x=>x.id!==b.id))}>Reddet</button>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* FAB */}
        {tab==="anasayfa"&&(
          <button style={{position:"fixed",bottom:94,right:"calc(50% - 215px + 14px)",background:"#16a34a",color:"#fff",border:"none",borderRadius:50,width:52,height:52,fontSize:28,cursor:"pointer",boxShadow:"0 4px 18px #16a34a66",display:"flex",alignItems:"center",justifyContent:"center",zIndex:99}} onClick={()=>setTab("ara")}>+</button>
        )}

        {/* NAV */}
        <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:430,background:r.nav,display:"flex",borderTop:`1px solid ${r.brd}`,zIndex:100}}>
          {[
            {id:"anasayfa",ikon:"🏠",label:"Ana"},
            {id:"ara",     ikon:"🔍",label:"Ara"},
            ...(sosyalAktif?[
              {id:"sosyal",    ikon:"📢",label:"Sosyal"},
              {id:"arkadaslar",ikon:"👥",label:"Arkadaş",badge:gelenIstekler.length},
            ]:[]),
            {id:"puan",   ikon:"🏅",label:"Puan"},
            {id:"profil", ikon:"👤",label:"Profil"},
          ].map(n=>(
            <button key={n.id} style={NB(tab===n.id)} onClick={()=>setTab(n.id)}>
              <span style={{fontSize:17}}>{n.ikon}</span>
              {n.label}
              {(n.badge||0)>0&&<span style={{background:"#ef4444",color:"#fff",fontSize:8,fontWeight:800,padding:"1px 4px",borderRadius:10}}>{n.badge}</span>}
            </button>
          ))}
        </nav>

        {/* HAMBURGER DRAWER */}
        {hamMenu&&(
          <div style={{position:"fixed",inset:0,zIndex:300,display:"flex"}} onClick={()=>setHamMenu(false)}>
            {/* drawer */}
            <div style={{width:240,background:r.card,height:"100%",padding:"0 0 24px",overflowY:"auto",boxShadow:"4px 0 24px rgba(0,0,0,.18)"}} onClick={e=>e.stopPropagation()}>
              {/* drawer header */}
              <div style={{background:"linear-gradient(135deg,#16a34a,#15803d)",padding:"20px 18px 16px",color:"#fff",marginBottom:8}}>
                <div style={{fontSize:15,fontWeight:900,marginBottom:4}}>🥗 Doya</div>
                <div style={{fontSize:11,opacity:.85}}>{aktif?.isim}</div>
                <div style={{fontSize:10,opacity:.65,marginTop:1}}>{aktif?.uid}</div>
              </div>

              {[
                { grup:"Takip", items:[
                  {id:"su",    ikon:"💧",label:"Su Takibi"},
                  {id:"takvim",ikon:"📅",label:"Takvim"},
                ]},
                ...(sosyalAktif?[{ grup:"Sosyal", items:[
                  {id:"yaris", ikon:"🏆",label:"Yarış"},
                ]}]:[]),
                { grup:"Kazanç", items:[
                  ...(isOrtak?[{id:"para",ikon:"💰",label:"Para Paneli"}]:[]),
                  {id:"puan",  ikon:"🏅",label:"Puan & Ödüller"},
                ]},
                ...(isAdmin?[{ grup:"Yönetim", items:[
                  {id:"admin", ikon:"🔐",label:"Admin Paneli",badge:bekBesin.length+sikayetler.filter(s=>!s.islem).length},
                ]}]:[]),
              ].map(grp=>(
                <div key={grp.grup} style={{marginBottom:4}}>
                  <div style={{fontSize:10,fontWeight:700,color:r.muted,padding:"10px 18px 4px",textTransform:"uppercase",letterSpacing:1}}>{grp.grup}</div>
                  {grp.items.map(n=>(
                    <button key={n.id} onClick={()=>{setTab(n.id);setHamMenu(false);}}
                      style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"11px 18px",border:"none",background:tab===n.id?(d?"#1e3a1e":"#f0fdf4"):"transparent",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:tab===n.id?800:600,fontSize:14,color:tab===n.id?"#16a34a":r.text,borderLeft:tab===n.id?"3px solid #16a34a":"3px solid transparent"}}>
                      <span style={{fontSize:18,minWidth:24}}>{n.ikon}</span>
                      <span style={{flex:1,textAlign:"left"}}>{n.label}</span>
                      {(n.badge||0)>0&&<span style={{background:"#ef4444",color:"#fff",fontSize:10,fontWeight:800,padding:"1px 6px",borderRadius:10,minWidth:18,textAlign:"center"}}>{n.badge}</span>}
                    </button>
                  ))}
                </div>
              ))}

              <div style={{borderTop:`1px solid ${r.brd}`,margin:"8px 0"}}/>
              <button onClick={()=>{cikis();setHamMenu(false);}}
                style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"11px 18px",border:"none",background:"transparent",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:600,fontSize:14,color:"#ef4444"}}>
                <span style={{fontSize:18}}>🚪</span> Çıkış Yap
              </button>
            </div>
            {/* overlay - sağda */}
            <div style={{flex:1,background:"rgba(0,0,0,.45)"}}/>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            MODALLER
        ══════════════════════════════════════════════════════ */}

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
                      eden:aktif.uid, hedef:sikayet.hedef,
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
          return(
            <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:900,background:"rgba(0,0,0,.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setDonemOzetGoster(false)}>
              <div onClick={e=>e.stopPropagation()} style={{background:d?"#1e293b":"#fff",borderRadius:24,padding:24,width:"100%",maxWidth:380,boxShadow:"0 20px 60px #0004",animation:"slideUp 0.35s ease-out"}}>
                <style>{`@keyframes slideUp{from{opacity:0;transform:scale(0.85) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
                <div style={{background:tipRenk,borderRadius:16,padding:"16px 20px",color:"#fff",marginBottom:16,textAlign:"center"}}>
                  <div style={{fontSize:11,fontWeight:700,opacity:.85,marginBottom:4}}>{tipLabel}</div>
                  <div style={{fontSize:22,fontWeight:900}}>{donemAdi}</div>
                  <div style={{fontSize:12,opacity:.85,marginTop:4}}>tamamlandı! 🎉</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                  {istatler.map(s=>(
                    <div key={s.l} style={{background:d?"#0f172a":"#f8fafc",borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
                      <div style={{fontSize:9,color:"#94a3b8",fontWeight:700,marginBottom:4}}>{s.l}</div>
                      <div style={{fontSize:18,fontWeight:900,color:s.renk}}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <button onClick={()=>setDonemOzetGoster(false)} style={{...BTN("#16a34a"),width:"100%",padding:"12px 0",fontSize:14,fontWeight:800}}>
                  Harika! Devam Et →
                </button>
                <button onClick={()=>{setDonemOzetGoster(false);setTab("profil");setProfilSekme("performans");}} style={{width:"100%",padding:"10px 0",marginTop:8,background:"none",border:`1px solid ${d?"#334155":"#e2e8f0"}`,borderRadius:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12,color:r.sub}}>
                  📊 Detaylı Performans Gör
                </button>
              </div>
            </div>
          );
        })()}

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
            <div style={{background:r.card,borderRadius:20,padding:24,width:"100%",maxWidth:400}}>
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
              <div style={{fontSize:12,color:"#374151",lineHeight:1.9}}>
                Bu sözleşme, <b>Doya</b> uygulaması ile onaylanan Influencer/İşletme ortağı arasındaki ilişkiyi düzenler.<br/><br/>
                <b>1. Kazanç Modeli</b><br/>
                Ortaklar, referans kodlarıyla uygulamaya davet ettikleri aktif kullanıcıların ürettiği reklam gelirinin <b>%25'ini</b> ve premium satın alımlardan <b>%25 komisyonu</b> alır. Kazanç, kullanıcıların aktifliğine bağlıdır ve her ay değişebilir.<br/><br/>
                <b>2. Ödeme Koşulları</b><br/>
                Ödemeler her ayın 1'inde kayıtlı IBAN'a yapılır. Minimum ödeme tutarı 50 ₺'dir.<br/><br/>
                <b>3. Mali Risk ve Ödeme Gecikmesi</b><br/>
                Doya'in mali durumunun kötüleşmesi, nakit akışı sorunları veya beklenmedik gider artışları durumunda <b>ödemeler gecikebilir</b>. Bu durum ortağa önceden bildirilir.<br/><br/>
                <b>4. Şirketin İflası</b><br/>
                Doya'in mahkeme kararıyla <b>iflası halinde</b>, ortakların birikmiş kazançları iflas masasına dahil edilir ve yasal süreç kapsamında ödeme yapılır ya da <b>yapılamayabilir</b>. Ortak bu riski kabul etmiş sayılır.<br/><br/>
                <b>5. Sözleşmenin Feshi</b><br/>
                Doya, gerekçe göstermeksizin ortaklığı 30 gün öncesinde bildirerek sonlandırabilir. Birikmiş kazançlar son ödeme döneminde ödenir.<br/><br/>
                <b>6. Ortağın Sorumlulukları</b><br/>
                Ortak, paylaşımlarında Doya'i yanıltıcı şekilde tanıtamaz. Sözleşmeye aykırı davranış ortaklığın derhal feshine neden olur.<br/><br/>
                <b>7. Uyuşmazlık Çözümü</b><br/>
                Taraflar arasındaki uyuşmazlıklarda Türkiye Cumhuriyeti mahkemeleri yetkilidir.<br/><br/>
                <b>Destek:</b> {DESTEK_MAIL} | <b>Ortaklık:</b> {ORTAKLIK_MAIL}
              </div>
              <div style={{display:"flex",alignItems:"flex-start",gap:8,margin:"14px 0",background:"#fff7ed",borderRadius:10,padding:10}}>
                <input type="checkbox" id="soz" checked={sozlesmeOnay} onChange={e=>setSozlesmeOnay(e.target.checked)} style={{marginTop:3,width:18,height:18,cursor:"pointer",accentColor:"#f59e0b"}}/>
                <label htmlFor="soz" style={{fontSize:12,color:"#374151",cursor:"pointer",lineHeight:1.6}}>Sözleşmeyi okudum, yukarıdaki <b>mali risk ve iflas</b> koşulları dahil tüm maddeleri kabul ediyorum.</label>
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
                  const basvuru={id:Date.now(),uid:aktif.uid,isim:aktif.isim,tip:basTip,platform:basPlatform.join(", "),acik:basAd+" | "+basAcik,onay:"bekliyor",firebaseUID};
                  setRefBasvurular(p=>[...p,basvuru]);
                  setKullanicilar(p=>p.map(u=>u.uid===aktif.uid?{...u,refTip:basTip,refOnay:false}:u));
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

      </div>
    </>
  );
}
