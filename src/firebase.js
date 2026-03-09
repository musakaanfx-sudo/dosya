import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBzHQZTf8W1pF-jekLZuvwN863R7gTxHNk',
  authDomain: 'doya-4456f.firebaseapp.com',
  projectId: 'doya-4456f',
  storageBucket: 'doya-4456f.firebasestorage.app',
  messagingSenderId: '150275550580',
  appId: '1:150275550580:web:4238c37a4d9aa4107d1021',
  measurementId: 'G-NNX69XZF4G',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ─── UID SAYAÇ ────────────────────────────────────────────────
// Firestore'da "meta/uidCounter" belgesinde tutulur
async function uidUretFirestore() {
  const ref = doc(db, 'meta', 'uidCounter');
  const snap = await getDoc(ref);
  let n = snap.exists() ? snap.data().n || 1 : 1;
  await setDoc(ref, { n: n + 1 }, { merge: true });
  return 'NTR-' + String(n).padStart(6, '0');
}

// ─── AUTH İŞLEMLERİ ──────────────────────────────────────────

export async function kayitOl({ email, sifre, isim, refKodGirilen }) {
  // 1. Firebase Auth ile hesap oluştur
  const cred = await createUserWithEmailAndPassword(auth, email, sifre);
  const firebaseUID = cred.user.uid;

  // 2. Sıralı UID üret
  const uid = await uidUretFirestore();

  // 3. Referans kodu oluştur
  const refKod =
    'REF-' +
    isim
      .split(' ')[0]
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .slice(0, 3) +
    Math.floor(Math.random() * 900 + 100);

  // 4. Firestore'a kullanıcı belgesi yaz
  const kullanici = {
    uid,
    firebaseUID,
    email,
    isim,
    foto: null,
    admin: false,
    acik: true,
    sosyal: true,
    refKod,
    refTip: null,
    refOnay: false,
    davet: 0,
    kazanim: 0,
    premium: false,
    banli: false,
    sosyalKisit: false,
    puan: 100,
    iban: '',
    ibanAd: '',
    boy: '',
    kilo: '',
    yas: '',
    cinsiyet: 'erkek',
    aktivite: 'sedanter',
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, 'users', firebaseUID), kullanici);

  // 5. Referans kodu kullanıldıysa daveti kaydet
  if (refKodGirilen) {
    await addDoc(collection(db, 'referrals'), {
      refKod: refKodGirilen,
      davetEdilen: firebaseUID,
      tarih: serverTimestamp(),
    });
  }

  return kullanici;
}

export async function girisYap({ email, sifre }) {
  const cred = await signInWithEmailAndPassword(auth, email, sifre);
  const snap = await getDoc(doc(db, 'users', cred.user.uid));
  if (!snap.exists()) throw new Error('Kullanıcı verisi bulunamadı.');
  const data = snap.data();
  if (data.banli) throw new Error('BANLI');
  return data;
}

export async function cikisYap() {
  await signOut(auth);
}

// ─── KULLANICI İŞLEMLERİ ────────────────────────────────────

export async function kullaniciyiGetir(firebaseUID) {
  const snap = await getDoc(doc(db, 'users', firebaseUID));
  return snap.exists() ? snap.data() : null;
}

export async function kullaniciyiGuncelle(firebaseUID, data) {
  await updateDoc(doc(db, 'users', firebaseUID), data);
}

export async function tumKullanicilariGetir() {
  const snap = await getDocs(collection(db, 'users'));
  return snap.docs.map((d) => d.data());
}

// ─── POST İŞLEMLERİ ─────────────────────────────────────────

export async function postPaylas({
  uid,
  isim,
  foto,
  icerik,
  postFoto,
  yemekler,
}) {
  const ref = await addDoc(collection(db, 'posts'), {
    uid,
    isim,
    foto: foto || null,
    icerik,
    postFoto: postFoto || null,
    yemekler: yemekler || [],
    begeniler: [],
    yorumlar: [],
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export function postlariDinle(callback) {
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(posts);
  });
}

export async function postSil(postId) {
  await deleteDoc(doc(db, 'posts', postId));
}

export async function postGuncelle(postId, data) {
  await updateDoc(doc(db, 'posts', postId), data);
}

// ─── ŞİKAYET İŞLEMLERİ ──────────────────────────────────────

export async function sikayetGonder(data) {
  await addDoc(collection(db, 'sikayetler'), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function sikayetleriGetir() {
  const snap = await getDocs(collection(db, 'sikayetler'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ─── GÜNLÜK VERİ (yemekler, su, spor) ───────────────────────
// Her kullanıcı için: users/{firebaseUID}/gunler/{tarih}

export async function gunVeriKaydet(firebaseUID, tarih, data) {
  await setDoc(doc(db, 'users', firebaseUID, 'gunler', tarih), data, {
    merge: true,
  });
}

export async function gunVeriGetir(firebaseUID, tarih) {
  const snap = await getDoc(doc(db, 'users', firebaseUID, 'gunler', tarih));
  return snap.exists() ? snap.data() : {};
}

export async function tumGunleriGetir(firebaseUID) {
  const snap = await getDocs(collection(db, 'users', firebaseUID, 'gunler'));
  const result = {};
  snap.docs.forEach((d) => {
    result[d.id] = d.data();
  });
  return result;
}

// ─── ARKADAŞ İSTEKLERİ ──────────────────────────────────────

export async function arkadashIstegiGonder(gonderen, alici) {
  await setDoc(
    doc(db, 'users', alici.firebaseUID, 'istekler', gonderen.firebaseUID),
    {
      uid: gonderen.uid,
      isim: gonderen.isim,
      firebaseUID: gonderen.firebaseUID,
    }
  );
}

export async function istekleriDinle(firebaseUID, callback) {
  return onSnapshot(collection(db, 'users', firebaseUID, 'istekler'), (snap) =>
    callback(snap.docs.map((d) => d.data()))
  );
}

// ─── BESİN ONAY KUYRUĞU ─────────────────────────────────────

export async function besinGonder(data) {
  await addDoc(collection(db, 'besinOnay'), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function besinleriGetir() {
  const snap = await getDocs(collection(db, 'besinOnay'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export { onAuthStateChanged };
