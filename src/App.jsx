import { useState, useRef, useEffect } from "react";
import {
  auth, db,
  googleGiris as fbGoogleGiris,
  girisYap as fbGiris,
  kayitOl as fbKayit,
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

// Spor listesi — dışarıda hepsi "Spor" olarak görünür, MET değerleri tempo'ya göre
const SPOR_LISTESI = [
  { id:"yuruyus",  ad:"Yürüyüş",        met:{ hafif:2.5, orta:3.8, yuksek:5.0 } },
  { id:"kosma",    ad:"Koşma",           met:{ hafif:6.0, orta:8.5, yuksek:11.0 } },
  { id:"bisiklet", ad:"Bisiklet",        met:{ hafif:4.0, orta:6.5, yuksek:10.0 } },
  { id:"yuzme",    ad:"Yüzme",           met:{ hafif:4.0, orta:6.0, yuksek:8.5 } },
  { id:"fitness",  ad:"Fitness/Ağırlık", met:{ hafif:3.0, orta:5.0, yuksek:7.0 } },
  { id:"yoga",     ad:"Yoga",            met:{ hafif:2.0, orta:2.8, yuksek:3.5 } },
  { id:"dans",     ad:"Dans",            met:{ hafif:3.0, orta:4.5, yuksek:6.5 } },
  { id:"futbol",   ad:"Futbol",          met:{ hafif:5.0, orta:7.0, yuksek:9.5 } },
  { id:"basketbol",ad:"Basketbol",       met:{ hafif:4.5, orta:6.5, yuksek:8.5 } },
  { id:"pilates",  ad:"Pilates",         met:{ hafif:2.5, orta:3.5, yuksek:4.5 } },
  { id:"dans2",    ad:"Zumba",           met:{ hafif:4.0, orta:6.0, yuksek:8.0 } },
  { id:"gizli",    ad:"Aktivite",        met:{ hafif:3.5, orta:5.0, yuksek:6.5 } },
  { id:"diger",    ad:"Diğer",           met:{ hafif:3.0, orta:5.0, yuksek:7.0 } },
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
  { id:69,  ad:"Çikolatalı Gofret",     marka:"Ülker", kal:508,pro:5.8,karb:60,yag:27, lif:1.2, sod:110, demir:1.1, kals:55,  vitC:0,    vitD:0,    vitB12:0,    acik:18, por:100,  aclik:"30-60 dk", onay:true, kat:"Atıştırmalık", yildiz:0 },
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

  // ── DARK MODE ──
  const [dark,setDark]=useState(false);
  const d=dark;

  // ── AUTH ──
  const [ekran,setEkran]=useState("giris");
  const [gEmail,setGEmail]=useState(""); const [gSifre,setGSifre]=useState(""); const [gHata,setGHata]=useState("");
  const [kIsim,setKIsim]=useState(""); const [kEmail,setKEmail]=useState(""); const [kSifre,setKSifre]=useState("");
  const [kRef,setKRef]=useState(""); const [kHata,setKHata]=useState("");
  const [kvkkOnay,setKvkkOnay]=useState(false); const [kvkkModal,setKvkkModal]=useState(false);
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
  const [sikayetler,setSikayetler]=useState([]);

  // ── SERİLER ──
  const [yemekSeri,setYemekSeri]=useState(0);
  const [adimSeri,setAdimSeri]=useState(0);
  const [seriToast,setSeriToast]=useState(null);
  const [seriMsg,setSeriMsg]=useState(null);
  const [dogrulamaGonderildi,setDogrulamaGonderildi]=useState(false);
  const [doyuruBilgi,setDoyuruBilgi]=useState(null);

  // ── PAYLASIM MODAL ──
  const [psModal,setPsModal]=useState(false);

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

  // ─── ZAMAN FARKI YARDIMCISI ──────────────────────────────────
  function zamanFarki(tarih){
    const fark = Math.floor((Date.now()-tarih)/1000);
    if(fark<60) return "Az önce";
    if(fark<3600) return Math.floor(fark/60)+" dakika önce";
    if(fark<86400) return Math.floor(fark/3600)+" saat önce";
    return Math.floor(fark/86400)+" gün önce";
  }

  // ─── AUTH ────────────────────────────────────────────────────
  const girisYap=async()=>{
    setGHata("");
    try {
      await fbGiris({ email:gEmail, sifre:gSifre });
      // onAuthStateChanged tetiklenir, veri oradan yüklenir
      setOnboard(true); setObAdim(1);
    } catch(e){
      if(e.message==="BANLI") setGHata("Hesabınız banlanmıştır. "+DESTEK_MAIL);
      else setGHata("E-posta veya şifre yanlış!");
    }
  };

  const kayitOl=async()=>{
    if(!kIsim||!kEmail||!kSifre){setKHata("Tüm alanları doldurun!");return;}
    if(!kvkkOnay){setKHata("KVKK metnini onaylamanız gerekiyor!");return;}
    setKHata("");
    try {
      await fbKayit({ email:kEmail, sifre:kSifre, isim:kIsim, refKodGirilen:kRef.trim()||null });
      setKHata(""); 
      alert("📧 " + kEmail + " adresine doğrulama maili gönderildi! Lütfen mailinizi onaylayın.");
      setOnboard(true); setObAdim(1);
    } catch(e){
      if(e.code==="auth/email-already-in-use") setKHata("Bu e-posta zaten kayıtlı!");
      else if(e.code==="auth/weak-password") setKHata("Şifre en az 6 karakter olmalı!");
      else setKHata("Kayıt başarısız: "+e.message);
    }
  };

  const cikis=async()=>{
    await fbCikis();
    setAktif(null); setFirebaseUID(null);
    setGEmail(""); setGSifre(""); setTab("anasayfa"); setOnboard(false);
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
    const kayit={ kcal,sure:+sporSure,tempo:sporTempo };
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
  const adminOrtak=async(uid,tip)=>{
    const h=kullanicilar.find(u=>u.uid===uid);
    if(!h){setAdminMsg("UID bulunamadı!");return;}
    if(h.admin){setAdminMsg("Admin hesabına atanamaz!");return;}
    if(h.firebaseUID) await kullaniciyiGuncelle(h.firebaseUID,{refTip:tip,refOnay:true}).catch(console.error);
    setKullanicilar(p=>p.map(u=>u.uid===uid?{...u,refTip:tip,refOnay:true}:u));
    setAdminMsg(`${h.isim} → ${tip} yapıldı!`); setTimeout(()=>setAdminMsg(""),2500); setAdminUid("");
  };
  const adminOrtakKaldir=async(uid)=>{
    const h=kullanicilar.find(u=>u.uid===uid);
    if(h?.firebaseUID) await kullaniciyiGuncelle(h.firebaseUID,{refTip:null,refOnay:false}).catch(console.error);
    setKullanicilar(p=>p.map(u=>u.uid===uid?{...u,refTip:null,refOnay:false}:u));
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
              <button onClick={cikis} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:8,padding:"5px 9px",fontSize:11,fontWeight:700,cursor:"pointer",color:"#fff",fontFamily:"'Nunito',sans-serif"}}>Çıkış</button>
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
                      <div style={{fontSize:13,fontWeight:700,color:r.text}}>Spor</div>
                      <div style={{fontSize:10,color:r.muted}}>{s.sure} dk · {s.tempo==="hafif"?"Hafif tempo":s.tempo==="orta"?"Orta tempo":"Yüksek tempo"}</div>
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
                      <div style={{fontSize:12,color:r.text}}>Spor · {s.sure} dk · {s.tempo==="hafif"?"Hafif":s.tempo==="orta"?"Orta":"Yüksek"} tempo</div>
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
                  <div key={b.id} style={{...CS,margin:"7px 0",cursor:"pointer",padding:12}} onClick={()=>{setSecBesin(b);setYemekGram(String(b.por||100));}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontWeight:800,fontSize:13,color:r.text}}>{b.ad}{b.marka?` (${b.marka})`:""}</div>
                        <div style={{marginBottom:1}}><YildizGoster v={b.yildiz??3} boyut={12}/></div>
                        <div style={{fontSize:10,color:r.muted}}>{b.por}g · P:{b.pro}g K:{b.karb}g Y:{b.yag}g · {b.kat}</div>
                        <div style={{fontSize:9,color:r.muted,fontStyle:"italic",marginTop:1}}>*Tahmini değerlerdir</div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontWeight:900,color:"#16a34a",fontSize:16}}>{b.kal}</div>
                        <div style={{fontSize:9,color:r.muted}}>kcal/{b.por}g</div>
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
                    <div style={{fontSize:11,color:r.sub,fontWeight:700,marginBottom:5}}>Min. Vitamin & Mineral</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      {[
                        {l:"Demir (mg)",  k:"minDemir", ph:"2"},
                        {l:"Kalsiyum (mg)",k:"minKals",  ph:"50"},
                        {l:"Vit C (mg)",  k:"minVitC",  ph:"10"},
                        {l:"Vit D (mcg)", k:"minVitD",  ph:"1"},
                        {l:"Vit B12 (mcg)",k:"minVitB12",ph:"0.5"},
                      ].map(f=>(
                        <div key={f.k}>
                          <div style={{fontSize:10,color:r.sub,fontWeight:700,marginBottom:3}}>{f.l} ≥</div>
                          <input style={{...IS,padding:"7px 9px",fontSize:12}} type="number" placeholder={f.ph} value={besinFil[f.k]} onChange={e=>setBesinFil(p=>({...p,[f.k]:e.target.value}))}/>
                        </div>
                      ))}
                    </div>
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
                            {as.map((s,i)=><div key={i} style={{fontSize:12,color:r.text}}>Spor · {s.sure} dk · −{s.kcal} kcal</div>)}
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

            {!isOrtak&&(
              <div style={{...CS,border:"1.5px dashed #f59e0b",background:d?"#1c1a10":"#fffbeb"}}>
                <div style={{fontSize:13,fontWeight:800,color:"#d97706",marginBottom:4}}>💸 Para da Kazan!</div>
                <div style={{fontSize:12,color:r.sub,marginBottom:10}}>Influencer / işletme başvurusu yap. Onaylanırsan reklam gelirinin <b>%25'ini</b> + satın alımlardan <b>%10</b> komisyon al!</div>
                <button style={{...BTN("#f59e0b"),width:"100%",padding:"11px 0"}} onClick={()=>setRefBasvuruModal(true)}>Başvur</button>
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
            <div style={CS}>
              <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:12}}>
                <div onClick={()=>profFotoRef.current.click()} style={{width:62,height:62,borderRadius:"50%",background:"#16a34a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,color:"#fff",cursor:"pointer",overflow:"hidden",border:"3px solid #86efac",flexShrink:0}}>
                  {profFoto?<img src={profFoto} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="profil"/>:aktif.isim[0]}
                </div>
                <div>
                  <div style={{fontSize:15,fontWeight:700,color:r.text}}>{aktif.isim}</div>
                  <div style={{fontSize:12,color:r.sub}}>{aktif.email}</div>
                  <div style={{fontSize:11,color:"#16a34a",fontWeight:700,marginTop:2}}>{aktif.uid}</div>
                  <div style={{fontSize:10,color:r.muted,marginTop:1}}>Fotoğrafı değiştirmek için tıkla</div>
                </div>
              </div>
              <input ref={profFotoRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{
                const f=e.target.files[0]; if(!f)return;
                const reader=new FileReader();
                reader.onload=ev=>{setProfFoto(ev.target.result);setKullanicilar(prev=>prev.map(u=>u.uid===aktif.uid?{...u,foto:ev.target.result}:u));};
                reader.readAsDataURL(f);
              }}/>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {isAdmin&&<span style={{background:"#fef3c7",color:"#78350f",fontSize:11,fontWeight:800,padding:"3px 9px",borderRadius:20}}>ADMIN</span>}
                {isOrtak&&<span style={{background:"#eff6ff",color:"#2563eb",fontSize:11,fontWeight:800,padding:"3px 9px",borderRadius:20}}>{aktif.refTip==="influencer"?"🎯 Influencer":"🏢 İşletme"}</span>}
                {premium&&<span style={{background:"#fef3c7",color:"#92400e",fontSize:11,fontWeight:800,padding:"3px 9px",borderRadius:20}}>⭐ Premium</span>}
              </div>
            </div>

            {/* FOTOĞRAF GALERİSİ */}
            {(()=>{
              const benimFotolar = paylasimlar.filter(ps=>ps.uid===aktif.uid&&ps.postFoto);
              return benimFotolar.length>0?(
                <div style={CS}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <div style={{fontSize:14,fontWeight:900,color:r.text}}>📷 Fotoğraflarım</div>
                    <div style={{fontSize:11,color:r.muted}}>{benimFotolar.length} fotoğraf</div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4}}>
                    {benimFotolar.map(ps=>(
                      <div key={ps.id} style={{position:"relative",aspectRatio:"1",borderRadius:10,overflow:"hidden",cursor:"pointer"}}>
                        <img src={ps.postFoto} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} alt=""/>
                        <button
                          onClick={()=>{if(window.confirm("Bu fotoğrafı silmek istiyor musun?"))setPaylasimlar(prev=>prev.map(p2=>p2.id===ps.id?{...p2,postFoto:null}:p2));}}
                          style={{position:"absolute",top:4,right:4,background:"rgba(0,0,0,.6)",border:"none",borderRadius:"50%",width:22,height:22,color:"#fff",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>
                          ×
                        </button>
                        {ps.icerik&&(
                          <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,.7))",padding:"12px 6px 5px",fontSize:9,color:"#fff",lineHeight:1.2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                            {ps.icerik}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize:10,color:r.muted,marginTop:8,fontStyle:"italic"}}>× ile fotoğrafı gönderiden kaldırabilirsin</div>
                </div>
              ):null;
            })()}

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
          </div>
        )}

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
              <input style={{...IS,marginBottom:8}} placeholder="NTR-000000" value={adminUid} onChange={e=>setAdminUid(e.target.value)}/>
              <div style={{display:"flex",gap:8,marginBottom:10}}>
                {[{v:"influencer",l:"🎯 Influencer"},{v:"isletme",l:"🏢 İşletme"}].map(o=>(
                  <button key={o.v} onClick={()=>setAdminTip(o.v)} style={{flex:1,padding:"8px",border:`2px solid ${adminTip===o.v?"#2563eb":r.inpB}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12,background:adminTip===o.v?"#eff6ff":r.inp,color:adminTip===o.v?"#2563eb":r.sub}}>{o.l}</button>
                ))}
              </div>
              {adminMsg&&<div style={{background:r.card,color:"#16a34a",padding:"8px 11px",borderRadius:10,fontSize:12,fontWeight:700,marginBottom:8}}>{adminMsg}</div>}
              <div style={{display:"flex",gap:8}}>
                <button style={{...BTN("#2563eb"),flex:2,padding:"10px 0"}} onClick={()=>adminOrtak(adminUid,adminTip)}>Ata</button>
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
                🔒 Spor türü sadece sana görünür. Herkese "Spor" olarak yansır.
              </div>
              <div style={{marginBottom:12}}>
                <div style={CT}>Aktivite Türü</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                  {SPOR_LISTESI.map(s=>(
                    <button key={s.id} onClick={()=>setSporSec(s)} style={{padding:"9px",border:`2px solid ${sporSec.id===s.id?"#10b981":r.inpB}`,borderRadius:10,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:12,background:sporSec.id===s.id?d?"#0f2e2a":"#f0fdf4":r.inp,color:sporSec.id===s.id?"#10b981":r.sub}}>{s.ad}</button>
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
                  <div style={{fontSize:11,color:"#6b7280"}}>{sporSure} dk · {sporSec.ad} · {sporTempo==="hafif"?"Hafif":sporTempo==="orta"?"Orta":"Yüksek"} tempo</div>
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
                Ortaklar, referans kodlarıyla uygulamaya davet ettikleri aktif kullanıcıların ürettiği reklam gelirinin <b>%25'ini</b> ve premium satın alımlardan <b>%10 komisyonu</b> alır. Kazanç, kullanıcıların aktifliğine bağlıdır ve her ay değişebilir.<br/><br/>
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
                <div style={{fontSize:12,fontWeight:700,color:"#d97706",marginBottom:4}}>⚠️ Başvurmadan önce oku</div>
                <div style={{fontSize:11,color:"#78350f",lineHeight:1.7}}>
                  Ortak olarak onaylanırsan reklam gelirinin <b>%25'ini</b> + satın alımlardan <b>%10</b> alırsın. Ancak şirketin mali durumu kötüleşirse ödemeler gecikebilir; iflas halinde ödeme yapılamayabilir. <span style={{fontWeight:700,textDecoration:"underline",cursor:"pointer",color:"#d97706"}} onClick={()=>setSozlesmeModal(true)}>Ortaklık Sözleşmesini oku →</span>
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
