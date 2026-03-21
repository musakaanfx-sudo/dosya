// ══════════════════════════════════════════════════════
// seed-besinler.js — E-Z arası ürünler (1660 ürün)
// KULLANIM: Bu dosyadaki BESINLER_EZ array'ini
//           mevcut seed script'inizdeki BESINLER array'ine
//           spread operatörü ile ekleyin:
//   const BESINLER = [...BESINLER_AD, ...BESINLER_EZ];
// ══════════════════════════════════════════════════════

const BESINLER_EZ = [
// ══════════════════════════════════════════════════════
// E HARFİ — DOYA BESIN VERİTABANI
// ══════════════════════════════════════════════════════
// Kurallar:
// - Paylaşılan ürünler: ulkeler:[...AB] veya ulkeler:[...]
// - Ülkeye özgü: ulke:"xx"
// - Yunanca/Macarca/Lehçe vb. için adLatin eklendi
// - tokPuan, aclikSuresi, yildiz hesaplanmış
// ══════════════════════════════════════════════════════

// ── PAYLAŞILAN (Tüm Avrupa) ──
{ ad:"Egg (Yumurta)", adler:{tr:"Yumurta",de:"Ei",el:"Αυγό",hu:"Tojás",pl:"Jajko",cs:"Vejce",ro:"Ou",hr:"Jaje",fr:"Oeuf",es:"Huevo",it:"Uovo",pt:"Ovo",no:"Egg",sv:"Ägg",da:"Æg",fi:"Muna",nl:"Ei",lv:"Ola",et:"Muna",lt:"Kiaušinis"}, kal:155, pro:13, karb:1.1, yag:11, lif:0, sod:124, por:100, kat:"Eggs", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"egg", katkiMaddeleri:[] },
{ ad:"Eggplant (Patlıcan)", adler:{tr:"Patlıcan",de:"Aubergine",el:"Μελιτζάνα",hu:"Padlizsán",pl:"Bakłażan",cs:"Lilek",ro:"Vânătă",hr:"Patlidžan",fr:"Aubergine",es:"Berenjena",it:"Melanzana",pt:"Beringela",no:"Aubergine",sv:"Aubergine",da:"Aubergine",fi:"Munakoiso",nl:"Aubergine",lv:"Baklažāns",et:"Baklažaan",lt:"Baklažanas"}, kal:25, pro:1, karb:5.9, yag:0.2, lif:3, sod:2, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"eggplant", katkiMaddeleri:[] },
{ ad:"Elderberry (Mürver)", adler:{tr:"Mürver Meyvesi",de:"Holunderbeere",el:"Κουφοξυλιά",hu:"Bodza",pl:"Bez Czarny",cs:"Bezinky",ro:"Soc",hr:"Bazga",fr:"Sureau",es:"Saúco",it:"Sambuco",pt:"Sabugueiro",no:"Hyllebær",sv:"Fläder",da:"Hyldebær",fi:"Mustaseljamarja",nl:"Vlierbes",lv:"Plūškoks",et:"Leeder",lt:"Šeivamedis"}, kal:73, pro:0.7, karb:18, yag:0.5, lif:7, sod:6, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","lv","et","lt"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"elderberries", katkiMaddeleri:[] },
{ ad:"Endive (Hindiba)", adler:{tr:"Hindiba",de:"Endivie",el:"Αντίβι",hu:"Endívia",pl:"Endywia",cs:"Endivie",ro:"Andivă",hr:"Endivija",fr:"Endive",es:"Endibia",it:"Indivia",pt:"Endívia",no:"Endive",sv:"Endive",da:"Endivie",fi:"Endiivikaali",nl:"Witlof",lv:"Endīvija",et:"Endiiv",lt:"Endivija"}, kal:17, pro:1.3, karb:3.4, yag:0.2, lif:1.6, sod:22, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"endive", katkiMaddeleri:[] },
{ ad:"Emmental Cheese", adler:{tr:"Emmental Peyniri",de:"Emmentaler Käse",el:"Τυρί Έμενταλ",hu:"Ementáli Sajt",pl:"Ser Ementaler",cs:"Sýr Ementál",ro:"Brânză Emmental",hr:"Sir Emmental",fr:"Fromage Emmental",es:"Queso Emmental",it:"Formaggio Emmental",pt:"Queijo Emmental",no:"Emmental Ost",sv:"Emmental Ost",da:"Emmental Ost",fi:"Emmental Juusto",nl:"Emmental Kaas",lv:"Emmentāla Siers",et:"Emmentali Juust",lt:"Emmentalis Sūris"}, kal:378, pro:28, karb:0.5, yag:30, lif:0, sod:450, por:30, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"milk, salt, rennet", katkiMaddeleri:[] },
{ ad:"Extra Virgin Olive Oil", adler:{tr:"Sızma Zeytinyağı",de:"Natives Olivenöl Extra",el:"Εξαιρετικό Παρθένο Ελαιόλαδο",hu:"Extra Szűz Olívaolaj",pl:"Oliwa z Oliwek Extra",cs:"Extra Panenský Olivový Olej",ro:"Ulei de Măsline Extra Virgin",hr:"Ekstra Djevičansko Maslinovo Ulje",fr:"Huile d'Olive Extra Vierge",es:"Aceite de Oliva Virgen Extra",it:"Olio Extra Vergine di Oliva",pt:"Azeite Extra Virgem",no:"Extra Virgin Olivenolje",sv:"Extra Virgin Olivolja",da:"Extra Virgin Olivenolie",fi:"Extra Virgin Oliiviöljy",nl:"Extra Vergine Olijfolie",lv:"Augstākās Klases Olīveļļa",et:"Extra Virgin Oliiviõli",lt:"Ekstra Grynasis Alyvuogių Aliejus"}, kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, por:10, kat:"Oil", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"extra virgin olive oil", katkiMaddeleri:[] },
{ ad:"Espresso", adler:{tr:"Espresso",de:"Espresso",el:"Εσπρέσο",hu:"Eszpresszó",pl:"Espresso",cs:"Espresso",ro:"Espresso",hr:"Espresso",fr:"Espresso",es:"Espresso",it:"Espresso",pt:"Espresso",no:"Espresso",sv:"Espresso",da:"Espresso",fi:"Espresso",nl:"Espresso",lv:"Espresso",et:"Espresso",lt:"Espresso"}, kal:2, pro:0.1, karb:0.3, yag:0.1, lif:0, sod:4, por:30, kat:"Coffee", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"coffee, water", katkiMaddeleri:[] },
{ ad:"Edam Cheese", adler:{tr:"Edam Peyniri",de:"Edamer Käse",el:"Τυρί Ένταμ",hu:"Edami Sajt",pl:"Ser Edam",cs:"Sýr Eidam",ro:"Brânză Edam",hr:"Edam Sir",fr:"Fromage Edam",es:"Queso Edam",it:"Formaggio Edam",pt:"Queijo Edam",no:"Edam Ost",sv:"Edam Ost",da:"Edam Ost",fi:"Edam Juusto",nl:"Edammer Kaas",lv:"Edamas Siers",et:"Edam Juust",lt:"Edamo Sūris"}, kal:357, pro:25, karb:1.4, yag:28, lif:0, sod:820, por:30, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"milk, salt, rennet, E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Colouring."}] },
{ ad:"Eel (Yılan Balığı)", adler:{tr:"Yılan Balığı",de:"Aal",el:"Χέλι",hu:"Angolna",pl:"Węgorz",cs:"Úhoř",ro:"Anghilă",hr:"Jegulja",fr:"Anguille",es:"Anguila",it:"Anguilla",pt:"Enguia",no:"Ål",sv:"Ål",da:"Ål",fi:"Ankerias",nl:"Paling",lv:"Zutis",et:"Angerjas",lt:"Ungurys"}, kal:184, pro:18, karb:0, yag:12, lif:0, sod:51, por:100, kat:"Fish", ulkeler:["de","nl","be","da","sv","no","fi","pl","lv","et","lt","en"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"eel", katkiMaddeleri:[] },

// ── TR ──
{ ad:"Ekmek (Beyaz)", kal:265, pro:9, karb:51, yag:3.2, lif:2.7, sod:491, por:100, kat:"Ekmek", ulke:"tr", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"buğday unu, su, tuz, maya", katkiMaddeleri:[] },
{ ad:"Ekmek (Tam Buğday)", kal:247, pro:13, karb:41, yag:4.2, lif:7, sod:472, por:100, kat:"Ekmek", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"tam buğday unu, su, tuz, maya", katkiMaddeleri:[] },
{ ad:"Ekmek Kadayıfı", kal:298, pro:5.5, karb:48, yag:10, lif:0.5, sod:180, por:150, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"ekmek, şeker şerbeti, kaymak, ceviz", katkiMaddeleri:[] },
{ ad:"Enginar", kal:47, pro:3.3, karb:10, yag:0.2, lif:5.4, sod:94, por:100, kat:"Sebze", ulke:"tr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"enginar", katkiMaddeleri:[] },
{ ad:"Enginar Dolması", kal:155, pro:6, karb:14, yag:9, lif:5, sod:380, por:150, kat:"Meze", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"enginar, zeytinyağı, pirinç, soğan, dereotu, limon", katkiMaddeleri:[] },
{ ad:"Erişte", kal:350, pro:12, karb:71, yag:1.5, lif:2.5, sod:5, por:100, kat:"Hamur İşleri", ulke:"tr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"buğday unu, yumurta, tuz", katkiMaddeleri:[] },
{ ad:"Ezme (Acılı)", kal:35, pro:1.2, karb:6, yag:1, lif:1.5, sod:200, por:100, kat:"Meze", ulke:"tr", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"domates, biber, soğan, maydanoz, limon, zeytinyağı", katkiMaddeleri:[] },
{ ad:"Elma (Amasya)", kal:52, pro:0.3, karb:14, yag:0.2, lif:2.4, sod:1, por:100, kat:"Meyve", ulke:"tr", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"elma", katkiMaddeleri:[] },
{ ad:"Elma Çayı", kal:3, pro:0.1, karb:0.5, yag:0, lif:0, sod:1, por:200, kat:"İçecek", ulke:"tr", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"elma çayı, su", katkiMaddeleri:[] },
{ ad:"Elma Pekmezi", kal:285, pro:0.5, karb:72, yag:0, lif:0.3, sod:5, por:20, kat:"Tatlandırıcı", ulke:"tr", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"elma suyu", katkiMaddeleri:[] },
{ ad:"Ege Zeytinyağlıları", kal:125, pro:2.5, karb:12, yag:8, lif:3, sod:280, por:150, kat:"Sebze Yemekleri", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"mevsim sebzeleri, zeytinyağı, soğan, domates", katkiMaddeleri:[] },
{ ad:"Et Kavurma", kal:285, pro:24, karb:2, yag:20, lif:0.5, sod:380, por:150, kat:"Et", ulke:"tr", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"dana eti, kuyruk yağı, tuz, karabiber", katkiMaddeleri:[] },
{ ad:"Et Suyu", kal:28, pro:4, karb:0.5, yag:1, lif:0, sod:380, por:250, kat:"Çorba", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"dana kemik, sebze, tuz", katkiMaddeleri:[] },
{ ad:"Ev Makarnası", kal:348, pro:13, karb:68, yag:2.5, lif:3, sod:8, por:100, kat:"Hamur İşleri", ulke:"tr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"buğday unu, yumurta, su, tuz", katkiMaddeleri:[] },
{ ad:"Ebegümeci Yemeği", kal:65, pro:2.8, karb:8, yag:3, lif:3.5, sod:280, por:200, kat:"Sebze Yemekleri", ulke:"tr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"ebegümeci, soğan, domates, zeytinyağı, pirinç, tuz", katkiMaddeleri:[] },
{ ad:"Ekşili Köfte", kal:235, pro:16, karb:14, yag:13, lif:2, sod:420, por:200, kat:"Et", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"dana kıyma, soğan, nohut, ekşi nar ekşisi, tuz", katkiMaddeleri:[] },

// ── DE ──
{ ad:"Erbsensuppe", kal:125, pro:8, karb:18, yag:3, lif:6, sod:520, por:300, kat:"Suppe", ulke:"de", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"Erbsen, Speck, Karotten, Sellerie, Zwiebeln, Salz", katkiMaddeleri:[] },
{ ad:"Eisbein", kal:298, pro:26, karb:0, yag:21, lif:0, sod:680, por:200, kat:"Fleisch", ulke:"de", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"Schweinshaxe, Sauerkraut, Salz, Kümmel", katkiMaddeleri:[] },
{ ad:"Erdbeertorte", kal:298, pro:5.5, karb:42, yag:13, lif:2, sod:185, por:100, kat:"Torte", ulke:"de", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"Weizenmehl, Erdbeeren, Sahne, Butter, Zucker, Eier", katkiMaddeleri:[] },
{ ad:"Emmentaler DE", marka:"Allgäuer", kal:378, pro:28, karb:0.5, yag:30, lif:0, sod:450, por:30, kat:"Käse", ulke:"de", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"Rohmilch, Salz, Lab", katkiMaddeleri:[] },
{ ad:"Ente mit Rotkohl", kal:285, pro:22, karb:12, yag:18, lif:3, sod:520, por:250, kat:"Fleisch", ulke:"de", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"Ente, Rotkohl, Apfel, Zwiebel, Rotwein, Gewürze", katkiMaddeleri:[] },

// ── FR ──
{ ad:"Escargots de Bourgogne", kal:128, pro:18, karb:2.5, yag:5.5, lif:0, sod:480, por:100, kat:"Entrée", ulke:"fr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"escargots, beurre, ail, persil, sel", katkiMaddeleri:[] },
{ ad:"Éclair au Chocolat", kal:342, pro:6, karb:38, yag:18, lif:1, sod:185, por:80, kat:"Pâtisserie", ulke:"fr", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"pâte à choux, crème pâtissière, chocolat, beurre", katkiMaddeleri:[] },
{ ad:"Époisses de Bourgogne", kal:335, pro:20, karb:0.5, yag:28, lif:0, sod:580, por:30, kat:"Fromages", ulke:"fr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"lait, sel, présure, marc de Bourgogne", katkiMaddeleri:[] },
{ ad:"Endives au Jambon", kal:165, pro:14, karb:8, yag:8, lif:3, sod:680, por:200, kat:"Plat", ulke:"fr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"endives, jambon, béchamel, gruyère, sel", katkiMaddeleri:[] },

// ── IT ──
{ ad:"Erbazzone", kal:248, pro:9, karb:28, yag:12, lif:3, sod:480, por:150, kat:"Torta Salata", ulke:"it", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"bietole, parmigiano, lardo, farina, cipolla, aglio", katkiMaddeleri:[] },
{ ad:"Eliche Pasta", kal:353, pro:12, karb:71, yag:1.5, lif:2.7, sod:3, por:100, kat:"Pasta", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"semolino di grano duro", katkiMaddeleri:[] },
{ ad:"Estratto di Pomodoro", kal:82, pro:4, karb:18, yag:0.5, lif:4, sod:1250, por:20, kat:"Condimento", ulke:"it", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"pomodori concentrati, sale", katkiMaddeleri:[] },

// ── ES ──
{ ad:"Escalivada", kal:88, pro:1.8, karb:10, yag:4.5, lif:3.5, sod:280, por:150, kat:"Tapas", ulke:"es", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"pimientos, berenjenas, cebolla, ajos, aceite, sal", katkiMaddeleri:[] },
{ ad:"Empanada Gallega", kal:285, pro:12, karb:38, yag:12, lif:2.5, sod:580, por:200, kat:"Plato", ulke:"es", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"harina, atún, pimientos, tomate, aceite, sal", katkiMaddeleri:[] },
{ ad:"Ensaladilla Rusa", kal:155, pro:4, karb:16, yag:9, lif:2.5, sod:380, por:150, kat:"Tapas", ulke:"es", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"patatas, zanahorias, guisantes, mayonesa, atún, huevo", katkiMaddeleri:[] },

// ── EL ──
{ ad:"Ελιές Καλαμάτας", adLatin:"Elies Kalamatas", kal:155, pro:1, karb:4, yag:15, lif:3, sod:1560, por:30, kat:"Mezedes", ulke:"el", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"elies kalamata, nero, alati, E270", katkiMaddeleri:[{kod:"E270",ad:"Γαλακτικό οξύ",tehlikeli:false,aciklama:"Ρυθμιστής οξύτητας."}] },
{ ad:"Ελληνικό Γιαούρτι", adLatin:"Elliniko Giaourti", kal:115, pro:6, karb:6, yag:8, lif:0, sod:55, por:150, kat:"Galaktokomika", ulke:"el", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"pilares gala, kalliergeies", katkiMaddeleri:[] },
{ ad:"Ελληνικός Καφές", adLatin:"Ellinikos Kafes", kal:4, pro:0.2, karb:0.7, yag:0.1, lif:0, sod:4, por:50, kat:"Pota", ulke:"el", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"kafe, nero", katkiMaddeleri:[] },
{ ad:"Εγγλέζικη Μουστάρδα Ντιπ", adLatin:"Englesiki Moustarda Dip", kal:66, pro:4, karb:5.5, yag:3.5, lif:1.5, sod:1020, por:15, kat:"Sauces", ulke:"el", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"sinapi, xidi, nero, alati", katkiMaddeleri:[] },

// ── EN ──
{ ad:"English Breakfast", kal:465, pro:28, karb:24, yag:32, lif:3.5, sod:1250, por:400, kat:"Breakfast", ulke:"en", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:3, icerik:"bacon, eggs, sausages, beans, toast, mushrooms, tomatoes, E250", katkiMaddeleri:[{kod:"E250",ad:"Sodium nitrite",tehlikeli:true,aciklama:"In high amounts may be carcinogenic."}] },
{ ad:"Eton Mess", kal:285, pro:3.5, karb:42, yag:13, lif:1, sod:68, por:150, kat:"Dessert", ulke:"en", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"strawberries, meringue, whipped cream, sugar", katkiMaddeleri:[] },
{ ad:"Eccles Cake", kal:398, pro:4.5, karb:54, yag:19, lif:2.5, sod:285, por:80, kat:"Pastry", ulke:"en", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"puff pastry, currants, sugar, butter, spices", katkiMaddeleri:[] },
{ ad:"Elsinore Herring EN", kal:158, pro:18, karb:0, yag:9, lif:0, sod:680, por:80, kat:"Fish", ulke:"en", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"herring, salt, vinegar, spices", katkiMaddeleri:[] },

// ── DA ──
{ ad:"Efterårskylling", kal:195, pro:22, karb:5, yag:10, lif:1.5, sod:480, por:250, kat:"Fjerkræ", ulke:"da", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kylling, svampe, fløde, timian, hvidvin, salt", katkiMaddeleri:[] },
{ ad:"Æbleskiver", kal:265, pro:7, karb:38, yag:10, lif:1, sod:180, por:100, kat:"Bagvaerk", ulke:"da", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"hvedemel, aeg, maelk, smor, bagepulver, kardemomme", katkiMaddeleri:[] },
{ ad:"Eddikesild", kal:155, pro:16, karb:4, yag:8, lif:0, sod:980, por:80, kat:"Fisk", ulke:"da", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"sild, eddike, sukker, lög, peber, laurbær", katkiMaddeleri:[] },

// ── NO ──
{ ad:"Elgbiff NO", kal:155, pro:26, karb:0, yag:5.5, lif:0, sod:65, por:150, kat:"Kjøtt", ulke:"no", tokPuan:78, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"elgkjøtt", katkiMaddeleri:[] },
{ ad:"Ertesuppe NO", kal:125, pro:8, karb:18, yag:3, lif:6, sod:520, por:300, kat:"Suppe", ulke:"no", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"erter, flesk, løk, gulrot, salt, pepper", katkiMaddeleri:[] },
{ ad:"Eplejuice NO", kal:44, pro:0.4, karb:10, yag:0.1, lif:0.2, sod:3, por:200, kat:"Drikkevarer", ulke:"no", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"eplejuice", katkiMaddeleri:[] },

// ── SV ──
{ ad:"Ärtsoppa SV", kal:125, pro:8, karb:18, yag:3, lif:6, sod:520, por:300, kat:"Soppa", ulke:"sv", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"gula ärtor, fläsk, lök, salt, senap", katkiMaddeleri:[] },
{ ad:"Elderblomssaft SV", kal:58, pro:0.1, karb:14, yag:0, lif:0, sod:5, por:200, kat:"Drycker", ulke:"sv", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"fläderblomma, socker, citronsyra, vatten, E330", katkiMaddeleri:[{kod:"E330",ad:"Citronsyra",tehlikeli:false,aciklama:"Surhetsreglering."}] },

// ── FI ──
{ ad:"Erilainen Silakkalaatikko", kal:185, pro:14, karb:12, yag:9, lif:1.5, sod:480, por:200, kat:"Kalaruoat", ulke:"fi", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"silakka, peruna, sipuli, kerma, voi, suola", katkiMaddeleri:[] },
{ ad:"Etanäkisselli FI", kal:65, pro:0.5, karb:16, yag:0.2, lif:1, sod:5, por:200, kat:"Jalkkiruoat", ulke:"fi", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"marja, sokeri, perunajauho, E330", katkiMaddeleri:[{kod:"E330",ad:"Sitruunahappo",tehlikeli:false,aciklama:"Happamuudensaataja."}] },

// ── NL ──
{ ad:"Erwtensoep NL", kal:125, pro:8, karb:18, yag:3, lif:6, sod:520, por:300, kat:"Soep", ulke:"nl", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"spliterwten, rookworst, wortel, prei, selderij, zout", katkiMaddeleri:[] },
{ ad:"Eierkoek NL", kal:362, pro:8, karb:56, yag:14, lif:1.5, sod:285, por:60, kat:"Koek", ulke:"nl", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"bloem, eieren, suiker, boter, vanille, E500", katkiMaddeleri:[{kod:"E500",ad:"Natriumcarbonaten",tehlikeli:false,aciklama:"Rijsmiddel."}] },
{ ad:"Edammer Kaas NL", marka:"Beemster", kal:357, pro:25, karb:1.4, yag:28, lif:0, sod:820, por:30, kat:"Kaas", ulke:"nl", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"volle melk, zout, stremsel, E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Kleurstof."}] },

// ── BE ──
{ ad:"Estaminet Bier BE", kal:52, pro:0.4, karb:5, yag:0, lif:0, sod:8, por:330, kat:"Bier", ulke:"be", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"water, mout, hop, gist", katkiMaddeleri:[] },
{ ad:"Elzässer Vlaaien BE", kal:285, pro:6, karb:44, yag:10, lif:1.5, sod:185, por:100, kat:"Gebak", ulke:"be", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"bloem, eieren, boter, suiker, fruit, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono en diglyceriden",tehlikeli:false,aciklama:"Emulgator."}] },

// ── AT ──
{ ad:"Erdäpfelgulasch AT", kal:165, pro:5.5, karb:24, yag:6, lif:3.5, sod:480, por:300, kat:"Eintopf", ulke:"at", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"Kartoffeln, Paprika, Zwiebel, Tomaten, Majoran, Salz", katkiMaddeleri:[] },
{ ad:"Esterházy Torte AT", kal:385, pro:8, karb:46, yag:21, lif:2, sod:120, por:100, kat:"Torten", ulke:"at", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"Walnüsse, Eier, Zucker, Sahne, Marzipan, Vanille", katkiMaddeleri:[] },

// ── PL ──
{ ad:"Esencja Rosołu", adLatin:"Esencja Rosolu", kal:28, pro:3.5, karb:0.5, yag:1, lif:0, sod:380, por:250, kat:"Zupy", ulke:"pl", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"kości wołowe, warzywa, sól, natka pietruszki", katkiMaddeleri:[] },
{ ad:"Ekspres do Kawy PL", adLatin:"Ekspres do Kawy PL", kal:4, pro:0.2, karb:0.7, yag:0.1, lif:0, sod:4, por:30, kat:"Napoje", ulke:"pl", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"kawa mielona, woda", katkiMaddeleri:[] },
{ ad:"Eintopf PL (Grochówka)", adLatin:"Grochowka PL", kal:125, pro:8, karb:18, yag:3, lif:6, sod:520, por:300, kat:"Zupy", ulke:"pl", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"groch, wieprzowina, warzywa, majeranek, sol", katkiMaddeleri:[] },

// ── CS ──
{ ad:"Esterhazy Dort CS", adLatin:"Esterhazy Dort CS", kal:385, pro:8, karb:46, yag:21, lif:2, sod:120, por:100, kat:"Dezerty", ulke:"cs", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"vlašské ořechy, vejce, cukr, máslo, marzipan", katkiMaddeleri:[] },
{ ad:"Eintopf CS (Hrachová Polévka)", adLatin:"Hrachova Polevka CS", kal:125, pro:8, karb:18, yag:3, lif:6, sod:520, por:300, kat:"Polevky", ulke:"cs", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"hráchy, vepřové kosti, mrkev, celer, majoránka, sůl", katkiMaddeleri:[] },

// ── HU ──
{ ad:"Eszterházy Torta HU", adLatin:"Esterhazy Torta HU", kal:385, pro:8, karb:46, yag:21, lif:2, sod:120, por:100, kat:"Sutemeny", ulke:"hu", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"dió, tojás, cukor, tejszín, marcipán, vanília", katkiMaddeleri:[] },
{ ad:"Erdélyi Töltött Káposzta", adLatin:"Erdelyi Toltott Kaposzta", kal:195, pro:14, karb:16, yag:9, lif:3.5, sod:520, por:300, kat:"Fogasok", ulke:"hu", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"savanyú káposzta, darált hús, rizs, füstölt húsok, tejföl", katkiMaddeleri:[] },

// ── RO ──
{ ad:"Fasole cu Ciolan RO", adLatin:"Fasole cu Ciolan RO", kal:195, pro:14, karb:22, yag:8, lif:7, sod:680, por:300, kat:"Mancare", ulke:"ro", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"fasole alba, ciolan, morcov, ceapa, cimbru, sare", katkiMaddeleri:[] },
{ ad:"Ecler RO", adLatin:"Ecler RO", kal:342, pro:6, karb:38, yag:18, lif:1, sod:185, por:80, kat:"Patiserie", ulke:"ro", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"faina, oua, unt, crema, ciocolata", katkiMaddeleri:[] },

// ── HR ──
{ ad:"Englez HR (Rižot s Manistrama)", adLatin:"Englez HR Rizot", kal:265, pro:12, karb:38, yag:9, lif:2.5, sod:580, por:250, kat:"Jela", ulke:"hr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"riza, dagnje, skampi, vino, cesnjak, maslinovo ulje", katkiMaddeleri:[] },
{ ad:"Eko Jabuka HR", adLatin:"Eko Jabuka HR", kal:52, pro:0.3, karb:14, yag:0.2, lif:2.4, sod:1, por:100, kat:"Voce", ulke:"hr", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"bio jabuka", katkiMaddeleri:[] },

// ── PT ──
{ ad:"Enchidos Portugueses", kal:385, pro:20, karb:2, yag:34, lif:0, sod:1580, por:30, kat:"Enchidos", ulke:"pt", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"carne de porco, gordura, sal, pimentão, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito de sódio",tehlikeli:true,aciklama:"Em altas doses pode ser cancerígeno."}] },
{ ad:"Estrela Portuguesa PT", kal:358, pro:22, karb:0.5, yag:30, lif:0, sod:650, por:30, kat:"Queijos", ulke:"pt", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"leite de ovelha, sal, coalho", katkiMaddeleri:[] },

// ── LV ──
{ ad:"Ēdamais Āboliņš LV", adLatin:"Edamais Abolins LV", kal:25, pro:1.5, karb:4, yag:0.4, lif:2, sod:8, por:100, kat:"Zaļumi", ulke:"lv", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"āboliņš", katkiMaddeleri:[] },
{ ad:"Eiro Salāti LV", adLatin:"Eiro Salati LV", kal:88, pro:3, karb:8, yag:5.5, lif:2.5, sod:280, por:150, kat:"Salāti", ulke:"lv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"bietes, kartupeļi, burkāni, olas, skābs krējums", katkiMaddeleri:[] },
{ ad:"Efiedrina Piens LV", adLatin:"Kefīrs LV", kal:55, pro:3.5, karb:4.2, yag:2, lif:0, sod:50, por:200, kat:"Piena Produkti", ulke:"lv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"piens, kefīra kultūras", katkiMaddeleri:[] },

// ── ET ──
{ ad:"Eesti Leib ET", adLatin:"Eesti Leib ET", kal:215, pro:7.5, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Leib", ulke:"et", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"rukkijahu, vesi, sool, hapujuuretis", katkiMaddeleri:[] },
{ ad:"Erinevatest Marjadest Kissell", adLatin:"Marjakissell ET", kal:65, pro:0.5, karb:16, yag:0.2, lif:1, sod:5, por:200, kat:"Joogid", ulke:"et", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"metsmaasikas, mustika, suhkur, tärklis, E330", katkiMaddeleri:[{kod:"E330",ad:"Sidrunhape",tehlikeli:false,aciklama:"Happesuse regulaator."}] },
{ ad:"Eesti Kiluvõileib ET", adLatin:"Eesti Kiluvoileib ET", kal:215, pro:10, karb:22, yag:10, lif:2, sod:680, por:100, kat:"Võileivad", ulke:"et", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"rukkileib, kilud, oder, till, hapukurk", katkiMaddeleri:[] },

// ── LT ──
{ ad:"Ėriena LT (Avienos Troškinys)", adLatin:"Eriena LT", kal:195, pro:20, karb:5, yag:12, lif:1.5, sod:480, por:250, kat:"Patiekalai", ulke:"lt", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"aviena, morka, svogūnas, česnakas, druska, pipirai", katkiMaddeleri:[] },
{ ad:"Egzotinis Vaisių Desertas LT", adLatin:"Egzotinis Vaisiu Desertas LT", kal:65, pro:0.8, karb:16, yag:0.2, lif:2.5, sod:3, por:150, kat:"Desertai", ulke:"lt", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"egzotiniai vaisiai, citrinų sultys, mėta", katkiMaddeleri:[] },
{ ad:"Ešeriai LT (Lydekos)", adLatin:"Eseriai LT", kal:88, pro:18, karb:0, yag:1.5, lif:0, sod:55, por:150, kat:"Zuvis", ulke:"lt", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lydeka", katkiMaddeleri:[] },

// ── TR EK ──
{ ad:"Et Döner", kal:265, pro:22, karb:18, yag:12, lif:1.5, sod:480, por:200, kat:"Et", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"dana/kuzu eti, ekmek, domates, soğan, sos", katkiMaddeleri:[] },
{ ad:"Ezogelin Çorbası", kal:88, pro:4.5, karb:14, yag:2, lif:3.5, sod:520, por:250, kat:"Çorba", ulke:"tr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"kırmızı mercimek, bulgur, soğan, domates, tereyağı, baharat", katkiMaddeleri:[] },
{ ad:"Ekşi Hamur Ekmeği", kal:235, pro:8.5, karb:44, yag:2, lif:5.5, sod:480, por:100, kat:"Ekmek", ulke:"tr", tokPuan:60, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"tam buğday unu, su, tuz, ekşi hamur", katkiMaddeleri:[] },
{ ad:"Elma Dilimli Pasta", kal:298, pro:5.5, karb:42, yag:13, lif:2, sod:185, por:100, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"un, elma, şeker, yumurta, tereyağı, tarçın", katkiMaddeleri:[] },
{ ad:"Etli Nohut", kal:195, pro:14, karb:22, yag:8, lif:7, sod:380, por:200, kat:"Baklagil", ulke:"tr", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"nohut, dana eti, soğan, domates, tuz, baharat", katkiMaddeleri:[] },
{ ad:"Etli Pilav", kal:245, pro:12, karb:36, yag:8, lif:1.5, sod:380, por:200, kat:"Tahıl", ulke:"tr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"pirinç, dana eti, tereyağı, tuz, biber", katkiMaddeleri:[] },
{ ad:"Erik (Yeşil)", kal:46, pro:0.7, karb:11, yag:0.3, lif:1.4, sod:0, por:100, kat:"Meyve", ulke:"tr", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"yeşil erik", katkiMaddeleri:[] },
{ ad:"Erik Marmelatı", kal:245, pro:0.4, karb:62, yag:0, lif:1, sod:6, por:20, kat:"Reçeller", ulke:"tr", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"erik, şeker, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektin",tehlikeli:false,aciklama:"Jelleşme maddesi."},{kod:"E330",ad:"Sitrik asit",tehlikeli:false,aciklama:"Asitlik düzenleyici."}] },
{ ad:"Ekmek Arası Köfte", kal:345, pro:20, karb:32, yag:14, lif:2.5, sod:580, por:200, kat:"Et", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"köfte, ekmek, domates, soğan, sos", katkiMaddeleri:[] },

// ── DE EK ──
{ ad:"Endiviensalat DE", kal:22, pro:1.5, karb:3.8, yag:0.2, lif:3.5, sod:28, por:150, kat:"Salat", ulke:"de", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"Endivie, Essig, Öl, Speck, Knoblauch, Salz", katkiMaddeleri:[] },
{ ad:"Eingelegter Hering DE", kal:155, pro:18, karb:2, yag:8, lif:0, sod:980, por:80, kat:"Fisch", ulke:"de", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"Hering, Essig, Zwiebeln, Zucker, Gewürze, E220", katkiMaddeleri:[{kod:"E220",ad:"Schwefeldioxid",tehlikeli:true,aciklama:"Kann allergische Reaktionen auslösen."}] },
{ ad:"Eintopf DE", kal:145, pro:10, karb:16, yag:5, lif:4, sod:520, por:350, kat:"Eintopf", ulke:"de", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"Kartoffeln, Karotten, Sellerie, Fleisch, Brühe, Salz", katkiMaddeleri:[] },
{ ad:"Erdbeermarmelade DE", kal:250, pro:0.4, karb:63, yag:0, lif:1, sod:8, por:20, kat:"Aufstrich", ulke:"de", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"Erdbeeren, Zucker, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektine",tehlikeli:false,aciklama:"Geliermittel."},{kod:"E330",ad:"Zitronensäure",tehlikeli:false,aciklama:"Säureregulator."}] },

// ── FR EK ──
{ ad:"Entrecôte FR", kal:265, pro:28, karb:0, yag:17, lif:0, sod:75, por:200, kat:"Viande", ulke:"fr", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"entrecôte de boeuf, sel, poivre, beurre", katkiMaddeleri:[] },
{ ad:"Emincé de Veau FR", kal:195, pro:24, karb:4, yag:9, lif:0.5, sod:420, por:200, kat:"Viande", ulke:"fr", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"veau, champignons, crème, vin blanc, échalotes", katkiMaddeleri:[] },
{ ad:"Eau de Vie FR", kal:230, pro:0, karb:0, yag:0, lif:0, sod:0, por:40, kat:"Boissons", ulke:"fr", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:1.5, icerik:"fruit distillé, alcool", katkiMaddeleri:[] },

// ── IT EK ──
{ ad:"Erbette Saltate", kal:45, pro:3.5, karb:6, yag:1.5, lif:3.5, sod:280, por:150, kat:"Contorni", ulke:"it", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"erbette, aglio, olio, sale", katkiMaddeleri:[] },
{ ad:"Espresso Romano IT", kal:4, pro:0.2, karb:0.7, yag:0.1, lif:0, sod:4, por:30, kat:"Caffè", ulke:"it", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"caffè espresso, scorza di limone", katkiMaddeleri:[] },
{ ad:"Erborinato Gorgonzola", marka:"Gorgonzola", kal:360, pro:20, karb:0.5, yag:31, lif:0, sod:1380, por:30, kat:"Formaggi", ulke:"it", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"latte, sale, caglio, Penicillium glaucum", katkiMaddeleri:[] },
{ ad:"Elicoidali al Sugo", kal:285, pro:10, karb:46, yag:7, lif:3, sod:480, por:200, kat:"Pasta", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"elicoidali, pomodoro, basilico, olio, aglio, sale", katkiMaddeleri:[] },

// ── ES EK ──
{ ad:"Erizos de Mar ES", kal:125, pro:18, karb:3, yag:5, lif:0, sod:380, por:100, kat:"Mariscos", ulke:"es", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"erizos de mar", katkiMaddeleri:[] },
{ ad:"Espinacas a la Catalana", kal:88, pro:3.5, karb:8, yag:5, lif:4, sod:280, por:150, kat:"Verduras", ulke:"es", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"espinacas, pasas, piñones, aceite, ajo, sal", katkiMaddeleri:[] },
{ ad:"Esgarraet Valenciano", kal:98, pro:12, karb:2, yag:5, lif:0.5, sod:480, por:100, kat:"Tapas", ulke:"es", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"bacalà, pimiento rojo asado, ajo, aceite", katkiMaddeleri:[] },
{ ad:"Embutido Ibérico ES", kal:415, pro:22, karb:1, yag:36, lif:0, sod:1680, por:30, kat:"Embutidos", ulke:"es", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"cerdo ibérico, sal, pimentón, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito sódico",tehlikeli:true,aciklama:"En altas dosis puede ser cancerígeno."}] },

// ── EL EK ──
{ ad:"Ελληνικό Παστίτσιο", adLatin:"Elliniko Pastitsio", kal:295, pro:16, karb:32, yag:12, lif:2, sod:520, por:250, kat:"Kyria Piata", ulke:"el", tokPuan:60, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"makaronia, kima, besarnel, graviera, tomates", katkiMaddeleri:[] },
{ ad:"Εξοχικό Αρνί", adLatin:"Eksochiko Arni", kal:265, pro:24, karb:5, yag:17, lif:1, sod:420, por:200, kat:"Kreas", ulke:"el", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"arnaki, patates, tyri, tomates, rigani, elaiolado", katkiMaddeleri:[] },
{ ad:"Ελληνικό Φρέσκο Τυρί", adLatin:"Elliniko Fresko Tyri", kal:98, pro:11, karb:3, yag:4.5, lif:0, sod:320, por:100, kat:"Galaktokomika", ulke:"el", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"provo gala, alati, mazithra", katkiMaddeleri:[] },

// ── EN EK ──
{ ad:"Egg and Cress Sandwich", kal:285, pro:12, karb:28, yag:14, lif:2.5, sod:580, por:150, kat:"Sandwiches", ulke:"en", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"bread, eggs, mustard cress, mayonnaise, salt", katkiMaddeleri:[] },
{ ad:"Eggy Bread EN", kal:265, pro:10, karb:28, yag:13, lif:2, sod:380, por:100, kat:"Breakfast", ulke:"en", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"bread, eggs, butter, milk, salt", katkiMaddeleri:[] },
{ ad:"Eve's Pudding EN", kal:285, pro:4.5, karb:44, yag:12, lif:2, sod:185, por:150, kat:"Dessert", ulke:"en", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"apples, sponge cake, butter, sugar, eggs, flour", katkiMaddeleri:[] },

// ── DA EK ──
{ ad:"Elg Gryderet DA", kal:185, pro:22, karb:6, yag:9, lif:2, sod:480, por:300, kat:"Kød", ulke:"da", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"elgkød, rodfrugter, rødvin, salt, peber", katkiMaddeleri:[] },
{ ad:"Estragon Sauce DA", kal:88, pro:1.5, karb:4, yag:8, lif:0.3, sod:380, por:30, kat:"Saucer", ulke:"da", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"estragon, smør, fløde, hvidvinseddike, salt", katkiMaddeleri:[] },

// ── NO EK ──
{ ad:"Eplekake NO", kal:298, pro:4.5, karb:44, yag:13, lif:2, sod:185, por:100, kat:"Kaker", ulke:"no", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"epler, mel, smør, sukker, egg, kanel, bakepulver", katkiMaddeleri:[] },
{ ad:"Elgkjøtt NO", kal:145, pro:24, karb:0, yag:5.5, lif:0, sod:65, por:150, kat:"Kjøtt", ulke:"no", tokPuan:78, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"elgkjøtt", katkiMaddeleri:[] },
{ ad:"Eplemost NO", kal:44, pro:0.4, karb:10, yag:0.1, lif:0.2, sod:3, por:200, kat:"Drikkevarer", ulke:"no", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"eplemost", katkiMaddeleri:[] },

// ── SV EK ──
{ ad:"Elgkött SV", kal:145, pro:24, karb:0, yag:5.5, lif:0, sod:65, por:150, kat:"Kött", ulke:"sv", tokPuan:78, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"älgkött", katkiMaddeleri:[] },
{ ad:"Elderblomssoppa SV", kal:58, pro:0.3, karb:13, yag:0.2, lif:0.5, sod:8, por:250, kat:"Soppa", ulke:"sv", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"fläderblommor, vatten, socker, citron", katkiMaddeleri:[] },
{ ad:"Entrecôte SV", kal:265, pro:28, karb:0, yag:17, lif:0, sod:75, por:200, kat:"Kött", ulke:"sv", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"nötentrecôte, salt, peppar, smör", katkiMaddeleri:[] },

// ── FI EK ──
{ ad:"Etikkasilakoita FI", kal:148, pro:16, karb:4, yag:7, lif:0, sod:980, por:80, kat:"Kala", ulke:"fi", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"silakka, etikka, sokeri, sipuli, mausteet, E220", katkiMaddeleri:[{kod:"E220",ad:"Rikkidioksidi",tehlikeli:true,aciklama:"Voi aiheuttaa allergisia reaktioita."}] },
{ ad:"Emmental FI", kal:378, pro:28, karb:0.5, yag:30, lif:0, sod:450, por:30, kat:"Juusto", ulke:"fi", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"maito, suola, juoksute", katkiMaddeleri:[] },
{ ad:"Eri Kalalajit Kalakeitossa FI", kal:98, pro:12, karb:6, yag:4, lif:1.5, sod:480, por:300, kat:"Keitot", ulke:"fi", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"lohi, siika, peruna, sipuli, kerma, tilli, suola", katkiMaddeleri:[] },

// ── NL EK ──
{ ad:"Eendenborst NL", kal:201, pro:19, karb:0, yag:14, lif:0, sod:72, por:150, kat:"Gevogelte", ulke:"nl", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"eendenborst", katkiMaddeleri:[] },
{ ad:"Endive Salade NL", kal:22, pro:1.5, karb:3.8, yag:0.2, lif:3.5, sod:28, por:150, kat:"Groente", ulke:"nl", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"witlof, ui, azijn, olie, spek, knoflook, zout", katkiMaddeleri:[] },
{ ad:"Entrecôte NL", kal:265, pro:28, karb:0, yag:17, lif:0, sod:75, por:200, kat:"Vlees", ulke:"nl", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"runderentrecôte, zout, peper, boter", katkiMaddeleri:[] },

// ── BE EK ──
{ ad:"Entrecôte BE", kal:265, pro:28, karb:0, yag:17, lif:0, sod:75, por:200, kat:"Vlees", ulke:"be", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"runderentrecôte, zout, peper, boter", katkiMaddeleri:[] },
{ ad:"Endive Gratin BE", kal:165, pro:14, karb:8, yag:8, lif:3, sod:680, por:200, kat:"Groente", ulke:"be", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"witlof, hesp, kaassaus, nootmuskaat", katkiMaddeleri:[] },
{ ad:"Erwtensoep BE", kal:125, pro:8, karb:18, yag:3, lif:6, sod:520, por:300, kat:"Soep", ulke:"be", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"spliterwten, rookworst, wortel, prei, selderij, zout", katkiMaddeleri:[] },

// ── AT EK ──
{ ad:"Eierschwammerlsuppe AT", kal:88, pro:3, karb:8, yag:5, lif:2.5, sod:480, por:300, kat:"Suppe", ulke:"at", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"Eierschwammerl, Sahne, Zwiebel, Petersilie, Salz", katkiMaddeleri:[] },
{ ad:"Erdäpfelsalat AT", kal:145, pro:3, karb:22, yag:6, lif:2.5, sod:380, por:150, kat:"Salate", ulke:"at", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Kartoffeln, Essig, Öl, Zwiebel, Senf, Salz", katkiMaddeleri:[] },
{ ad:"Entenbrust AT", kal:201, pro:19, karb:0, yag:14, lif:0, sod:72, por:150, kat:"Geflügel", ulke:"at", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"Entenbrust", katkiMaddeleri:[] },

// ── PL EK ──
{ ad:"Esencja Bulionu PL", adLatin:"Esencja Bulionu PL", kal:22, pro:2.5, karb:2, yag:0.8, lif:0, sod:580, por:250, kat:"Zupy", ulke:"pl", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"kości wołowe, marchew, seler, pietruszka, sól", katkiMaddeleri:[] },
{ ad:"Eskalopki Wieprzowe PL", adLatin:"Eskalopki Wieprzowe PL", kal:228, pro:24, karb:6, yag:12, lif:0.5, sod:380, por:150, kat:"Mięso", ulke:"pl", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"wieprzowina, bułka tarta, jajko, mąka, sól, pieprz", katkiMaddeleri:[] },
{ ad:"Edamer PL", adLatin:"Edamer PL", kal:357, pro:25, karb:1.4, yag:28, lif:0, sod:820, por:30, kat:"Sery", ulke:"pl", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mleko, sól, podpuszczka, E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Barwnik."}] },

// ── CS EK ──
{ ad:"Eidamský Sýr CS", adLatin:"Eidamsky Syr CS", kal:357, pro:25, karb:1.4, yag:28, lif:0, sod:820, por:30, kat:"Sýry", ulke:"cs", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mléko, sůl, syřidlo, E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Barvivo."}] },
{ ad:"Eskalopy CS", adLatin:"Eskalopy CS", kal:228, pro:24, karb:6, yag:12, lif:0.5, sod:380, por:150, kat:"Maso", ulke:"cs", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"vepřové, strouhanka, vejce, mouka, sůl, pepř", katkiMaddeleri:[] },
{ ad:"Eintopf Hrachový CS", adLatin:"Eintopf Hrachovy CS", kal:125, pro:8, karb:18, yag:3, lif:6, sod:520, por:300, kat:"Polévky", ulke:"cs", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"hrách, vepřové kosti, mrkev, celer, majoránka, sůl", katkiMaddeleri:[] },

// ── HU EK ──
{ ad:"Ecetes Uborka HU", adLatin:"Ecetes Uborka HU", kal:15, pro:0.7, karb:3.6, yag:0.1, lif:0.5, sod:680, por:50, kat:"Savanyúságok", ulke:"hu", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"uborka, ecet, só, cukor, fokhagyma, kapor", katkiMaddeleri:[] },
{ ad:"Esterházy Rostélyos", adLatin:"Esterhazy Rostelyos", kal:265, pro:24, karb:8, yag:16, lif:1.5, sod:480, por:200, kat:"Fogások", ulke:"hu", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"marhahús, tejföl, gyökérzöldségek, só, bors", katkiMaddeleri:[] },
{ ad:"Édeskömény HU (Ánizs)", adLatin:"Edeskomenys HU", kal:31, pro:1.3, karb:6.8, yag:0.2, lif:2.7, sod:52, por:100, kat:"Zöldségek", ulke:"hu", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"édeskömény", katkiMaddeleri:[] },

// ── RO EK ──
{ ad:"Estragon Sos RO", adLatin:"Estragon Sos RO", kal:88, pro:1.5, karb:4, yag:8, lif:0.3, sod:380, por:30, kat:"Sosuri", ulke:"ro", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"tarhon, smântână, unt, otet, sare", katkiMaddeleri:[] },
{ ad:"Escalop de Vitel RO", adLatin:"Escalop de Vitel RO", kal:228, pro:24, karb:6, yag:12, lif:0.5, sod:380, por:150, kat:"Carne", ulke:"ro", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"vitel, pesmet, ou, faina, sare, piper", katkiMaddeleri:[] },
{ ad:"Edam Românesc RO", adLatin:"Edam Romanesc RO", kal:357, pro:25, karb:1.4, yag:28, lif:0, sod:820, por:30, kat:"Brânzeturi", ulke:"ro", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"lapte, sare, cheag, E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Colorant."}] },

// ── HR EK ──
{ ad:"Entalop HR (Svinjski Odrezak)", adLatin:"Entalop HR", kal:228, pro:24, karb:6, yag:12, lif:0.5, sod:380, por:150, kat:"Meso", ulke:"hr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"svinjski but, prezle, jaje, brašno, sol, papar", katkiMaddeleri:[] },
{ ad:"Edam Sir HR", adLatin:"Edam Sir HR", kal:357, pro:25, karb:1.4, yag:28, lif:0, sod:820, por:30, kat:"Sir", ulke:"hr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mlijeko, sol, siriste, E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Boja."}] },
{ ad:"Eko Maslinovo Ulje HR", adLatin:"Eko Maslinovo Ulje HR", kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, por:10, kat:"Ulja", ulke:"hr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"ekstra djevičansko maslinovo ulje", katkiMaddeleri:[] },

// ── PT EK ──
{ ad:"Espadarte PT (Peixe Espada)", kal:115, pro:20, karb:0, yag:4, lif:0, sod:68, por:150, kat:"Peixe", ulke:"pt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"peixe espada", katkiMaddeleri:[] },
{ ad:"Entrecosto PT", kal:285, pro:22, karb:0, yag:22, lif:0, sod:72, por:150, kat:"Carne", ulke:"pt", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"entrecosto de porco, alho, sal, pimenta", katkiMaddeleri:[] },
{ ad:"Esparregado PT", kal:65, pro:3.5, karb:5, yag:3.5, lif:4, sod:280, por:150, kat:"Legumes", ulke:"pt", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"espinafres, azeite, alho, sal, farinha", katkiMaddeleri:[] },

// ── LV EK ──
{ ad:"Ēdamais Siers LV", adLatin:"Edamais Siers LV", kal:357, pro:25, karb:1.4, yag:28, lif:0, sod:820, por:30, kat:"Sieri", ulke:"lv", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"piens, sāls, Lab, E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Krāsviela."}] },
{ ad:"Entrekots LV", adLatin:"Entrekots LV", kal:265, pro:28, karb:0, yag:17, lif:0, sod:75, por:200, kat:"Gaļa", ulke:"lv", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"liellopa gaļa, sāls, pipari, sviests", katkiMaddeleri:[] },

// ── ET EK ──
{ ad:"Eesti Hapukurk ET", adLatin:"Eesti Hapukurk ET", kal:15, pro:0.7, karb:3.6, yag:0.1, lif:0.5, sod:680, por:50, kat:"Marineeritud", ulke:"et", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"kurk, äädikas, sool, suhkur, küüslauk, till", katkiMaddeleri:[] },
{ ad:"Entrekoot ET", adLatin:"Entrekoot ET", kal:265, pro:28, karb:0, yag:17, lif:0, sod:75, por:200, kat:"Liha", ulke:"et", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"veiseliha, sool, pipar, või", katkiMaddeleri:[] },

// ── LT EK ──
{ ad:"Ešeriai Kepti LT", adLatin:"Eseriai Kepti LT", kal:148, pro:20, karb:4, yag:6, lif:0.5, sod:280, por:150, kat:"Žuvis", ulke:"lt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"ešeriai, kvietiniai miltai, druska, pipirai, aliejus", katkiMaddeleri:[] },
{ ad:"Entrekotas LT", adLatin:"Entrekotas LT", kal:265, pro:28, karb:0, yag:17, lif:0, sod:75, por:200, kat:"Mėsa", ulke:"lt", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"jautiena, druska, pipirai, sviestas", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// F HARFİ
// ══════════════════════════════════════════════════════

// ── PAYLAŞILAN ──
{ ad:"Fig (İncir)", adler:{tr:"İncir",de:"Feige",el:"Σύκο",hu:"Füge",pl:"Figa",cs:"Fík",ro:"Smochină",hr:"Smokva",fr:"Figue",es:"Higo",it:"Fico",pt:"Figo",no:"Fiken",sv:"Fikon",da:"Figen",fi:"Viikuna",nl:"Vijg",lv:"Vīģe",et:"Viigimarj",lt:"Figa"}, kal:74, pro:0.8, karb:19, yag:0.3, lif:2.9, sod:1, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"fig", katkiMaddeleri:[] },
{ ad:"Flaxseed (Keten Tohumu)", adler:{tr:"Keten Tohumu",de:"Leinsamen",el:"Λιναρόσπορος",hu:"Lenmag",pl:"Siemię Lniane",cs:"Lněné Semínko",ro:"Semințe de In",hr:"Laneno Sjeme",fr:"Graine de Lin",es:"Semilla de Lino",it:"Semi di Lino",pt:"Semente de Linho",no:"Linfrø",sv:"Linfrön",da:"Hørfrø",fi:"Pellavansiemen",nl:"Lijnzaad",lv:"Linsēklas",et:"Linaseemned",lt:"Linų Sėklos"}, kal:534, pro:18, karb:29, yag:42, lif:27, sod:30, por:15, kat:"Seeds", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:78, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"flaxseeds", katkiMaddeleri:[] },
{ ad:"Fennel (Rezene)", adler:{tr:"Rezene",de:"Fenchel",el:"Μάραθο",hu:"Édeskömény",pl:"Koper Włoski",cs:"Fenykl",ro:"Fenicul",hr:"Komorač",fr:"Fenouil",es:"Hinojo",it:"Finocchio",pt:"Funcho",no:"Fennikel",sv:"Fänkål",da:"Fennikel",fi:"Fenkoli",nl:"Venkel",lv:"Fenhelis",et:"Apteegitill",lt:"Pankoliai"}, kal:31, pro:1.2, karb:7.3, yag:0.2, lif:3.1, sod:52, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"fennel", katkiMaddeleri:[] },
{ ad:"Feta Cheese", adler:{tr:"Beyaz Peynir",de:"Feta Käse",el:"Φέτα",hu:"Feta Sajt",pl:"Ser Feta",cs:"Sýr Feta",ro:"Brânză Feta",hr:"Feta Sir",fr:"Fromage Feta",es:"Queso Feta",it:"Formaggio Feta",pt:"Queijo Feta",no:"Feta Ost",sv:"Feta Ost",da:"Feta Ost",fi:"Feta Juusto",nl:"Feta Kaas",lv:"Fetas Siers",et:"Feta Juust",lt:"Fetos Sūris"}, kal:264, pro:14, karb:4, yag:21, lif:0, sod:1116, por:30, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"sheep milk, salt, rennet", katkiMaddeleri:[] },
{ ad:"Frozen Peas (Dondurulmuş Bezelye)", adler:{tr:"Dondurulmuş Bezelye",de:"Tiefkühlerbsen",el:"Κατεψυγμένος Αρακάς",hu:"Fagyasztott Borsó",pl:"Mrożony Groszek",cs:"Mražený Hrášek",ro:"Mazăre Congelată",hr:"Smrznuti Grašak",fr:"Petits Pois Surgelés",es:"Guisantes Congelados",it:"Piselli Surgelati",pt:"Ervilhas Congeladas",no:"Frosne Erter",sv:"Frysta Ärtor",da:"Frosne Ærter",fi:"Pakasteherneet",nl:"Diepvrieserwten",lv:"Saldētas Zirņi",et:"Külmutatud Herned",lt:"Šaldyti Žirniai"}, kal:77, pro:5.4, karb:14, yag:0.4, lif:5.1, sod:5, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"peas", katkiMaddeleri:[] },
{ ad:"Fromage Blanc", adler:{tr:"Beyaz Peynir Kreması",de:"Frischkäse",el:"Φρέσκο Τυρί",hu:"Friss Sajt",pl:"Twaróg",cs:"Čerstvý Sýr",ro:"Brânză Proaspătă",hr:"Svježi Sir",fr:"Fromage Blanc",es:"Queso Fresco",it:"Formaggio Fresco",pt:"Queijo Fresco",no:"Fersk Ost",sv:"Färskost",da:"Frisk Ost",fi:"Tuorejuusto",nl:"Verse Kaas",lv:"Svaigs Siers",et:"Värske Juust",lt:"Šviežias Sūris"}, kal:60, pro:7.5, karb:4, yag:2, lif:0, sod:55, por:100, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"milk, cultures", katkiMaddeleri:[] },
{ ad:"Flatbread", adler:{tr:"Yufka Ekmeği",de:"Fladenbrot",el:"Πίτα",hu:"Lepénykenyér",pl:"Podpłomyk",cs:"Placka",ro:"Pâine Plată",hr:"Lepinja",fr:"Pain Plat",es:"Pan Plano",it:"Piadina",pt:"Pão Plano",no:"Flatbrød",sv:"Flatbröd",da:"Fladbrød",fi:"Litteä Leipä",nl:"Plat Brood",lv:"Plakmaize",et:"Lapileib",lt:"Plokščia Duona"}, kal:290, pro:9, karb:58, yag:3.5, lif:3, sod:490, por:100, kat:"Bread", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"flour, water, salt, yeast", katkiMaddeleri:[] },
{ ad:"Fish Fillet (Balık Fileto)", adler:{tr:"Balık Fileto",de:"Fischfilet",el:"Φιλέτο Ψαριού",hu:"Halfilé",pl:"Filet Rybny",cs:"Rybí Filé",ro:"File de Pește",hr:"Riblje File",fr:"Filet de Poisson",es:"Filete de Pescado",it:"Filetto di Pesce",pt:"Filete de Peixe",no:"Fiskefilet",sv:"Fiskfilé",da:"Fiskefilet",fi:"Kalafile",nl:"Visfilet",lv:"Zivju Fileja",et:"Kalafile",lt:"Žuvies Filė"}, kal:92, pro:18, karb:0, yag:2, lif:0, sod:62, por:100, kat:"Fish", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"fish fillet", katkiMaddeleri:[] },
{ ad:"Full-Fat Yogurt", adler:{tr:"Tam Yağlı Yoğurt",de:"Vollfett Joghurt",el:"Πλήρες Γιαούρτι",hu:"Teljes Zsírtartalmú Joghurt",pl:"Jogurt Pełnotłusty",cs:"Plnotučný Jogurt",ro:"Iaurt Gras",hr:"Punomasni Jogurt",fr:"Yaourt Entier",es:"Yogur Entero",it:"Yogurt Intero",pt:"Iogurte Gordo",no:"Helmelk Yoghurt",sv:"Naturell Yoghurt",da:"Sødmælks Yoghurt",fi:"Täysrasvainen Jogurtti",nl:"Volle Yoghurt",lv:"Pilnpiena Jogurts",et:"Täispiima Jogurt",lt:"Riebiosios Rūgpienio"}, kal:98, pro:5, karb:7.8, yag:5.5, lif:0, sod:55, por:150, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"whole milk, cultures", katkiMaddeleri:[] },

// ── TR ──
{ ad:"Fıstıklı Baklava", kal:445, pro:7.5, karb:52, yag:24, lif:2, sod:90, por:100, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"yufka, antep fıstığı, tereyağı, şeker şerbeti", katkiMaddeleri:[] },
{ ad:"Fasulye Pilaki", kal:145, pro:7.5, karb:20, yag:5, lif:7, sod:280, por:150, kat:"Baklagil", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"kuru fasulye, domates, havuç, soğan, zeytinyağı", katkiMaddeleri:[] },
{ ad:"Fırın Sütlaç", kal:168, pro:5, karb:28, yag:5, lif:0, sod:58, por:150, kat:"Tatlı", ulke:"tr", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"süt, pirinç, şeker, yumurta sarısı, vanilin", katkiMaddeleri:[] },
{ ad:"Fındık", kal:628, pro:15, karb:17, yag:61, lif:9.7, sod:0, por:30, kat:"Kuruyemiş", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"fındık", katkiMaddeleri:[] },
{ ad:"Fındıklı Muhallebi", kal:185, pro:4.5, karb:28, yag:7, lif:0.5, sod:55, por:150, kat:"Tatlı", ulke:"tr", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"süt, nişasta, şeker, fındık, gülsuyu", katkiMaddeleri:[] },
{ ad:"Fesleğen", kal:22, pro:3.2, karb:2.7, yag:0.6, lif:1.6, sod:4, por:10, kat:"Baharat", ulke:"tr", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"taze fesleğen", katkiMaddeleri:[] },
{ ad:"Fırın Tavuk", kal:215, pro:28, karb:2, yag:11, lif:0, sod:320, por:150, kat:"Et", ulke:"tr", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"tavuk, zeytinyağı, sarımsak, kekik, tuz", katkiMaddeleri:[] },
{ ad:"Fava (Bakla Ezmesi)", kal:142, pro:8, karb:18, yag:4.5, lif:5, sod:280, por:150, kat:"Meze", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"sarı bakla, zeytinyağı, soğan, dereotu, limon", katkiMaddeleri:[] },
{ ad:"Fondue Peyniri", kal:385, pro:24, karb:2, yag:32, lif:0, sod:680, por:30, kat:"Süt Ürünleri", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"emmental, gruyere, beyaz şarap, nişasta", katkiMaddeleri:[] },
{ ad:"Fırın Patlıcan", kal:55, pro:1.5, karb:8, yag:2.5, lif:4, sod:180, por:150, kat:"Sebze Yemekleri", ulke:"tr", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"patlıcan, zeytinyağı, sarımsak, tuz", katkiMaddeleri:[] },

// ── DE ──
{ ad:"Forelle Blau DE", kal:148, pro:20, karb:0, yag:7, lif:0, sod:52, por:200, kat:"Fisch", ulke:"de", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"Forelle, Essig, Salz, Zitrone, Dill", katkiMaddeleri:[] },
{ ad:"Frankfurter Würstchen", kal:265, pro:12, karb:2, yag:23, lif:0, sod:920, por:100, kat:"Wurst", ulke:"de", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"Schweinefleisch, Rindfleisch, Salz, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."},{kod:"E451",ad:"Triphosphate",tehlikeli:false,aciklama:"Feuchthaltemittel."}] },
{ ad:"Fleischsalat DE", kal:245, pro:10, karb:4, yag:22, lif:0.5, sod:680, por:100, kat:"Salat", ulke:"de", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"Fleischwurst, Mayonnaise, Essiggurken, E250, E471", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."},{kod:"E471",ad:"Mono und Diglyceride",tehlikeli:false,aciklama:"Emulgator."}] },
{ ad:"Flammkuchen DE", kal:255, pro:9, karb:38, yag:9, lif:2, sod:580, por:200, kat:"Backwaren", ulke:"de", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"Weizenmehl, Crème fraîche, Speck, Zwiebel, Salz", katkiMaddeleri:[] },
{ ad:"Frikadellen DE", kal:235, pro:18, karb:6, yag:16, lif:0.8, sod:420, por:100, kat:"Fleisch", ulke:"de", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"Hackfleisch, Zwiebel, Ei, Semmelbröseln, Salz", katkiMaddeleri:[] },

// ── FR ──
{ ad:"Foie Gras FR", kal:462, pro:11, karb:4.5, yag:45, lif:0, sod:680, por:30, kat:"Charcuterie", ulke:"fr", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"foie de canard ou d'oie, sel, poivre, armagnac", katkiMaddeleri:[] },
{ ad:"Flamiche FR", kal:295, pro:9, karb:28, yag:18, lif:2, sod:480, por:150, kat:"Plat", ulke:"fr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"poireaux, crème, beurre, farine, oeufs, sel", katkiMaddeleri:[] },
{ ad:"Fromage de Chèvre FR", kal:298, pro:18, karb:1, yag:25, lif:0, sod:680, por:30, kat:"Fromages", ulke:"fr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"lait de chèvre, sel, présure", katkiMaddeleri:[] },
{ ad:"Ficelle Picarde FR", kal:285, pro:14, karb:22, yag:16, lif:1.5, sod:680, por:150, kat:"Plat", ulke:"fr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"crêpe, jambon, champignons, béchamel, fromage", katkiMaddeleri:[] },

// ── IT ──
{ ad:"Focaccia IT", kal:268, pro:7, karb:42, yag:9, lif:2.5, sod:580, por:100, kat:"Pane", ulke:"it", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"farina, olio d'oliva, acqua, sale, rosmarino, lievito", katkiMaddeleri:[] },
{ ad:"Frittata IT", kal:195, pro:13, karb:3, yag:15, lif:0.8, sod:380, por:150, kat:"Uova", ulke:"it", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"uova, zucchine, cipolla, olio, parmigiano, sale", katkiMaddeleri:[] },
{ ad:"Farro IT", kal:335, pro:15, karb:67, yag:2.5, lif:7.5, sod:3, por:100, kat:"Cereali", ulke:"it", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"farro", katkiMaddeleri:[] },
{ ad:"Finocchiona IT", kal:415, pro:22, karb:1, yag:36, lif:0, sod:1680, por:30, kat:"Salumi", ulke:"it", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"maiale, finocchio, sale, E250, vino", katkiMaddeleri:[{kod:"E250",ad:"Nitrito di sodio",tehlikeli:true,aciklama:"In alte dosi può essere cancerogeno."}] },

// ── ES ──
{ ad:"Fabada Asturiana", kal:245, pro:14, karb:28, yag:9, lif:8, sod:720, por:300, kat:"Legumbres", ulke:"es", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"fabes, chorizo, morcilla, lacón, sal", katkiMaddeleri:[] },
{ ad:"Fideuà ES", kal:265, pro:14, karb:38, yag:8, lif:2.5, sod:580, por:250, kat:"Plato", ulke:"es", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"fideos, gambas, mejillones, caldo, azafrán, ajo", katkiMaddeleri:[] },
{ ad:"Flamenquín ES", kal:298, pro:18, karb:12, yag:20, lif:1, sod:580, por:150, kat:"Plato", ulke:"es", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"lomo de cerdo, jamón, pan rallado, huevo, aceite", katkiMaddeleri:[] },

// ── EL ──
{ ad:"Φακές Σούπα", adLatin:"Fakes Soupa", kal:115, pro:9, karb:18, yag:2.5, lif:8, sod:480, por:300, kat:"Soupa", ulke:"el", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"fakes, tomates, kremidi, elaiolado, xidi, dafni", katkiMaddeleri:[] },
{ ad:"Φέτα Σαγανάκι", adLatin:"Feta Saganaki", kal:265, pro:14, karb:4, yag:22, lif:0.5, sod:680, por:100, kat:"Mezedes", ulke:"el", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"feta, alevri, elaiolado, lemoni", katkiMaddeleri:[] },
{ ad:"Φασολάδα", adLatin:"Fasolada", kal:145, pro:8, karb:22, yag:4, lif:8, sod:480, por:300, kat:"Soupa", ulke:"el", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"fasolia, tomates, kremidi, selinon, elaiolado", katkiMaddeleri:[] },
{ ad:"Φρουτοσαλάτα EL", adLatin:"Froutosalata EL", kal:58, pro:0.8, karb:14, yag:0.2, lif:2.5, sod:3, por:150, kat:"Frouta", ulke:"el", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"vasilikia frouta, lemoni, meli", katkiMaddeleri:[] },

// ── EN ──
{ ad:"Fish and Chips EN", kal:365, pro:18, karb:38, yag:18, lif:3, sod:680, por:350, kat:"Dish", ulke:"en", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"cod, potato, batter, sunflower oil, salt, vinegar", katkiMaddeleri:[] },
{ ad:"Full English Breakfast", kal:465, pro:28, karb:24, yag:32, lif:3.5, sod:1250, por:400, kat:"Breakfast", ulke:"en", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:3, icerik:"bacon, eggs, sausages, beans, toast, mushrooms, tomato", katkiMaddeleri:[] },
{ ad:"Flapjack EN", kal:448, pro:5, karb:62, yag:22, lif:4.5, sod:185, por:60, kat:"Baked Goods", ulke:"en", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"oats, golden syrup, butter, sugar, E306", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Faggots EN", kal:248, pro:16, karb:12, yag:15, lif:1.5, sod:680, por:150, kat:"Dish", ulke:"en", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"pig offal, breadcrumbs, onion, herbs, E250", katkiMaddeleri:[{kod:"E250",ad:"Sodium nitrite",tehlikeli:true,aciklama:"In high amounts may be carcinogenic."}] },

// ── DA ──
{ ad:"Flæskesteg DA", kal:285, pro:22, karb:0, yag:22, lif:0, sod:480, por:150, kat:"Kød", ulke:"da", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"svinekam, salt, laurbær, peber", katkiMaddeleri:[] },
{ ad:"Franskbrød DA", kal:265, pro:9, karb:52, yag:1.5, lif:2.5, sod:480, por:100, kat:"Brød", ulke:"da", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"hvedemel, vand, salt, gær", katkiMaddeleri:[] },
{ ad:"Flæskepølse DA", kal:310, pro:13, karb:3, yag:28, lif:0, sod:980, por:100, kat:"Pølser", ulke:"da", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"svinekød, spæk, salt, E250, krydderier", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"Konserveringsmiddel."}] },
{ ad:"Frisk Laks DA", kal:208, pro:20, karb:0, yag:13, lif:0, sod:59, por:150, kat:"Fisk", ulke:"da", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"laks", katkiMaddeleri:[] },

// ── NO ──
{ ad:"Fiskesuppe NO", kal:98, pro:8, karb:8, yag:4, lif:1, sod:580, por:300, kat:"Suppe", ulke:"no", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"fisk, rotgrønnsaker, fløte, smør, salt, pepper", katkiMaddeleri:[] },
{ ad:"Fårikål NO", kal:185, pro:20, karb:6, yag:10, lif:3, sod:380, por:300, kat:"Gryteretter", ulke:"no", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lammekjøtt, kål, salt, hel pepper", katkiMaddeleri:[] },
{ ad:"Flatbrød NO", kal:358, pro:9, karb:72, yag:4, lif:4.5, sod:380, por:30, kat:"Brød", ulke:"no", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"hvetemel, bygmel, salt, vann", katkiMaddeleri:[] },
{ ad:"Fenalår NO", kal:218, pro:28, karb:0, yag:12, lif:0, sod:1680, por:30, kat:"Kjøtt", ulke:"no", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"lammebein, salt", katkiMaddeleri:[] },

// ── SV ──
{ ad:"Fläskfile SV", kal:185, pro:24, karb:0, yag:10, lif:0, sod:72, por:150, kat:"Kött", ulke:"sv", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"fläskfilé", katkiMaddeleri:[] },
{ ad:"Filmjölk SV", kal:48, pro:3.5, karb:5.5, yag:1.5, lif:0, sod:46, por:200, kat:"Mejeri", ulke:"sv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"mjölk, kulturer", katkiMaddeleri:[] },
{ ad:"Färskpotatis SV", kal:70, pro:1.7, karb:16, yag:0.1, lif:1.5, sod:5, por:150, kat:"Grönsaker", ulke:"sv", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"färskpotatis", katkiMaddeleri:[] },

// ── FI ──
{ ad:"Fenkoli FI", kal:31, pro:1.2, karb:7.3, yag:0.2, lif:3.1, sod:52, por:100, kat:"Vihannekset", ulke:"fi", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"fenkoli", katkiMaddeleri:[] },
{ ad:"Finnjävel FI (Ruisleipäjuusto)", kal:285, pro:16, karb:4, yag:22, lif:0, sod:680, por:30, kat:"Juustot", ulke:"fi", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"maito, suola, juoksute", katkiMaddeleri:[] },
{ ad:"Friteerattu Siika FI", kal:195, pro:20, karb:8, yag:9, lif:0.5, sod:380, por:150, kat:"Kalaruoat", ulke:"fi", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"siika, vehnäjauho, voi, suola, sitruuna", katkiMaddeleri:[] },

// ── NL ──
{ ad:"Frikandel NL", kal:265, pro:13, karb:8, yag:21, lif:0.5, sod:680, por:100, kat:"Snack", ulke:"nl", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"vlees, vet, kruiden, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitriet",tehlikeli:true,aciklama:"In hoge doses kankerverwekkend."},{kod:"E451",ad:"Trifosfaten",tehlikeli:false,aciklama:"Vochtbehouder."}] },
{ ad:"Friet Speciaal NL", kal:298, pro:6, karb:36, yag:15, lif:3.5, sod:580, por:200, kat:"Snack", ulke:"nl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"friet, mayonaise, satésaus, uitjes", katkiMaddeleri:[] },
{ ad:"Flemish Stew NL", kal:245, pro:20, karb:12, yag:13, lif:1.5, sod:520, por:300, kat:"Stoofpotten", ulke:"nl", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"rundvlees, bier, ui, tijm, laurier, boter", katkiMaddeleri:[] },

// ── BE ──
{ ad:"Frieten BE (Belgische Friet)", kal:312, pro:3.5, karb:40, yag:16, lif:4, sod:480, por:200, kat:"Gerechten", ulke:"be", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"aardappel, rundvet, zout", katkiMaddeleri:[] },
{ ad:"Filet Américain BE", kal:195, pro:20, karb:2, yag:12, lif:0.5, sod:420, por:100, kat:"Vlees", ulke:"be", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"rundergehakt, mayonaise, piccalilly, kappertjes, ui", katkiMaddeleri:[] },
{ ad:"Flamiche BE", kal:295, pro:9, karb:28, yag:18, lif:2, sod:480, por:150, kat:"Gebak", ulke:"be", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"prei, room, boter, bloem, eieren, zout", katkiMaddeleri:[] },

// ── AT ──
{ ad:"Faschiertes AT (Hackfleisch)", kal:225, pro:20, karb:0, yag:16, lif:0, sod:75, por:100, kat:"Fleisch", ulke:"at", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"gemischtes Hackfleisch", katkiMaddeleri:[] },
{ ad:"Fritattensuppe AT", kal:65, pro:4, karb:6, yag:2.5, lif:0.5, sod:480, por:300, kat:"Suppe", ulke:"at", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Rindersuppe, Eierpfannkuchenstreifen, Schnittlauch", katkiMaddeleri:[] },
{ ad:"Fischsuppe AT", kal:88, pro:8, karb:6, yag:4, lif:1, sod:480, por:300, kat:"Suppe", ulke:"at", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Fisch, Wurzelgemüse, Sahne, Wein, Salz", katkiMaddeleri:[] },

// ── PL ──
{ ad:"Flaki PL", adLatin:"Flaki PL", kal:88, pro:10, karb:6, yag:3.5, lif:0.5, sod:580, por:300, kat:"Zupy", ulke:"pl", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"flaki wołowe, marchew, pietruszka, majeranek, sól", katkiMaddeleri:[] },
{ ad:"Fasolka Szparagowa PL", adLatin:"Fasolka Szparagowa PL", kal:31, pro:2, karb:7, yag:0.1, lif:2.5, sod:6, por:100, kat:"Warzywa", ulke:"pl", tokPuan:30, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"fasolka szparagowa", katkiMaddeleri:[] },
{ ad:"Filety z Dorsza PL", adLatin:"Filety z Dorsza PL", kal:82, pro:18, karb:0, yag:0.7, lif:0, sod:55, por:150, kat:"Ryby", ulke:"pl", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"filet z dorsza", katkiMaddeleri:[] },

// ── CS ──
{ ad:"Fazolová Polévka CS", adLatin:"Fazolova Polevka CS", kal:115, pro:7, karb:18, yag:2.5, lif:7, sod:520, por:300, kat:"Polévky", ulke:"cs", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"fazole, mrkev, celer, uzené maso, majoránka, sůl", katkiMaddeleri:[] },
{ ad:"Frankfurtky CS", adLatin:"Frankfurtky CS", kal:265, pro:12, karb:2, yag:23, lif:0, sod:920, por:100, kat:"Uzeniny", ulke:"cs", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"vepřové, hovězí, sůl, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Dusičnan sodný",tehlikeli:true,aciklama:"Ve vysokých dávkách karcinogenní."},{kod:"E451",ad:"Trifosfáty",tehlikeli:false,aciklama:"Udržovač vlhkosti."}] },
{ ad:"Fíky Sušené CS", adLatin:"Fiky Susene CS", kal:249, pro:3.3, karb:64, yag:0.9, lif:9.8, sod:10, por:30, kat:"Sušené Ovoce", ulke:"cs", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"sušené fíky", katkiMaddeleri:[] },

// ── HU ──
{ ad:"Főzelék HU", adLatin:"Fozelek HU", kal:115, pro:4.5, karb:16, yag:4, lif:5, sod:380, por:250, kat:"Főételek", ulke:"hu", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"zöldség, tejföl, liszt, só, bors", katkiMaddeleri:[] },
{ ad:"Füstölt Lazac HU", adLatin:"Fustolt Lazac HU", kal:208, pro:20, karb:0, yag:13, lif:0, sod:1200, por:80, kat:"Hal", ulke:"hu", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"lazac, só, füst", katkiMaddeleri:[] },
{ ad:"Fehér Bab HU", adLatin:"Feher Bab HU", kal:135, pro:9, karb:22, yag:0.5, lif:7, sod:5, por:100, kat:"Hüvelyesek", ulke:"hu", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"fehér bab", katkiMaddeleri:[] },

// ── RO ──
{ ad:"Fasole Bătută RO", adLatin:"Fasole Batuta RO", kal:145, pro:8, karb:20, yag:5, lif:7, sod:280, por:150, kat:"Mancare", ulke:"ro", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"fasole alba, ceapa prajita, ulei, sare, usturoi", katkiMaddeleri:[] },
{ ad:"Ficăței de Pui RO", adLatin:"Ficatei de Pui RO", kal:172, pro:24, karb:2.5, yag:7, lif:0, sod:68, por:100, kat:"Carne", ulke:"ro", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"ficat pui", katkiMaddeleri:[] },
{ ad:"Frigărui RO", adLatin:"Frigarui RO", kal:215, pro:22, karb:2, yag:13, lif:0.5, sod:380, por:150, kat:"Grătar", ulke:"ro", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"carne de porc, usturoi, boia, cimbru, sare", katkiMaddeleri:[] },

// ── HR ──
{ ad:"Fuži HR", adLatin:"Fuzi HR", kal:353, pro:12, karb:71, yag:1.5, lif:2.7, sod:3, por:100, kat:"Tjestenina", ulke:"hr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"pšenično brašno, jaja, sol", katkiMaddeleri:[] },
{ ad:"Fritaja HR", adLatin:"Fritaja HR", kal:195, pro:13, karb:3, yag:15, lif:0.8, sod:380, por:150, kat:"Jaja", ulke:"hr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"jaja, divlje šparoge ili tartufi, maslinovo ulje, sol", katkiMaddeleri:[] },
{ ad:"Fažol HR (Grah)", adLatin:"Fazol HR", kal:127, pro:8.7, karb:23, yag:0.5, lif:6.4, sod:5, por:100, kat:"Mahunarke", ulke:"hr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"grah", katkiMaddeleri:[] },

// ── PT ──
{ ad:"Francesinha PT", kal:485, pro:28, karb:38, yag:24, lif:2.5, sod:1250, por:350, kat:"Prato", ulke:"pt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"pão, presunto, linguiça, bife, molho de tomate e cerveja, queijo", katkiMaddeleri:[] },
{ ad:"Filhós PT", kal:352, pro:5.5, karb:52, yag:15, lif:1.5, sod:185, por:80, kat:"Doces", ulke:"pt", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"farinha, ovos, abóbora, azeite, açúcar, canela", katkiMaddeleri:[] },
{ ad:"Feijão Verde PT", kal:31, pro:2, karb:7, yag:0.1, lif:2.5, sod:6, por:100, kat:"Legumes", ulke:"pt", tokPuan:30, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"feijão verde", katkiMaddeleri:[] },

// ── LV ──
{ ad:"Filipiņu Rīsi LV", adLatin:"Filipinu Risi LV", kal:130, pro:3, karb:28, yag:0.5, lif:1, sod:5, por:150, kat:"Piedevas", ulke:"lv", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"rīsi, ūdens, sāls", katkiMaddeleri:[] },
{ ad:"Forele LV (Upesforele)", adLatin:"Forele LV", kal:148, pro:20, karb:0, yag:7, lif:0, sod:52, por:150, kat:"Zivis", ulke:"lv", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"upesforele", katkiMaddeleri:[] },
{ ad:"Fermentēts Kāposts LV", adLatin:"Fermentets Kaposts LV", kal:19, pro:0.9, karb:4.3, yag:0.1, lif:2.5, sod:661, por:100, kat:"Rūgušumi", ulke:"lv", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"kāposts, sāls", katkiMaddeleri:[] },

// ── ET ──
{ ad:"Forell ET", adLatin:"Forell ET", kal:148, pro:20, karb:0, yag:7, lif:0, sod:52, por:150, kat:"Kala", ulke:"et", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"forell", katkiMaddeleri:[] },
{ ad:"Fermenteeritud Kapsas ET", adLatin:"Fermenteeritud Kapsas ET", kal:19, pro:0.9, karb:4.3, yag:0.1, lif:2.5, sod:661, por:100, kat:"Hapendatud", ulke:"et", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"kapsas, sool", katkiMaddeleri:[] },

// ── LT ──
{ ad:"Forėlė LT", adLatin:"Forele LT", kal:148, pro:20, karb:0, yag:7, lif:0, sod:52, por:150, kat:"Žuvis", ulke:"lt", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"upinė forėlė", katkiMaddeleri:[] },
{ ad:"Fermentuoti Kopūstai LT", adLatin:"Fermentuoti Kopustai LT", kal:19, pro:0.9, karb:4.3, yag:0.1, lif:2.5, sod:661, por:100, kat:"Rauginiai", ulke:"lt", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"kopūstai, druska", katkiMaddeleri:[] },
{ ad:"Fazolų Sriuba LT", adLatin:"Fazolu Sriuba LT", kal:115, pro:7, karb:18, yag:2.5, lif:7, sod:520, por:300, kat:"Sriubos", ulke:"lt", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"pupelės, morka, svogūnas, česnakas, majoranas, druska", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// G HARFİ
// ══════════════════════════════════════════════════════

// ── PAYLAŞILAN ──
{ ad:"Garlic (Sarımsak)", adler:{tr:"Sarımsak",de:"Knoblauch",el:"Σκόρδο",hu:"Fokhagyma",pl:"Czosnek",cs:"Česnek",ro:"Usturoi",hr:"Češnjak",fr:"Ail",es:"Ajo",it:"Aglio",pt:"Alho",no:"Hvitløk",sv:"Vitlök",da:"Hvidløg",fi:"Valkosipuli",nl:"Knoflook",lv:"Ķiploks",et:"Küüslauk",lt:"Česnakas"}, kal:149, pro:6.4, karb:33, yag:0.5, lif:2.1, sod:17, por:10, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"garlic", katkiMaddeleri:[] },
{ ad:"Ginger (Zencefil)", adler:{tr:"Zencefil",de:"Ingwer",el:"Τζίντζερ",hu:"Gyömbér",pl:"Imbir",cs:"Zázvor",ro:"Ghimbir",hr:"Đumbir",fr:"Gingembre",es:"Jengibre",it:"Zenzero",pt:"Gengibre",no:"Ingefær",sv:"Ingefära",da:"Ingefær",fi:"Inkivääri",nl:"Gember",lv:"Ingvers",et:"Ingver",lt:"Imbieras"}, kal:80, pro:1.8, karb:18, yag:0.8, lif:2, sod:13, por:10, kat:"Spice", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"ginger", katkiMaddeleri:[] },
{ ad:"Grape (Üzüm)", adler:{tr:"Üzüm",de:"Weintraube",el:"Σταφύλι",hu:"Szőlő",pl:"Winogrono",cs:"Hrozny",ro:"Struguri",hr:"Grožđe",fr:"Raisin",es:"Uva",it:"Uva",pt:"Uva",no:"Drue",sv:"Druva",da:"Drue",fi:"Viinirypäle",nl:"Druif",lv:"Vīnoga",et:"Viinamari",lt:"Vynuogė"}, kal:67, pro:0.6, karb:17, yag:0.4, lif:0.9, sod:2, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"grapes", katkiMaddeleri:[] },
{ ad:"Green Tea (Yeşil Çay)", adler:{tr:"Yeşil Çay",de:"Grüner Tee",el:"Πράσινο Τσάι",hu:"Zöld Tea",pl:"Zielona Herbata",cs:"Zelený Čaj",ro:"Ceai Verde",hr:"Zeleni Čaj",fr:"Thé Vert",es:"Té Verde",it:"Tè Verde",pt:"Chá Verde",no:"Grønn Te",sv:"Grönt Te",da:"Grøn Te",fi:"Vihreä Tee",nl:"Groene Thee",lv:"Zaļā Tēja",et:"Roheline Tee",lt:"Žalioji Arbata"}, kal:2, pro:0.2, karb:0.4, yag:0, lif:0, sod:2, por:200, kat:"Tea", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"green tea leaves, water", katkiMaddeleri:[] },
{ ad:"Gouda Cheese", adler:{tr:"Gouda Peyniri",de:"Gouda Käse",el:"Τυρί Γκούντα",hu:"Gouda Sajt",pl:"Ser Gouda",cs:"Sýr Gouda",ro:"Brânză Gouda",hr:"Gouda Sir",fr:"Fromage Gouda",es:"Queso Gouda",it:"Formaggio Gouda",pt:"Queijo Gouda",no:"Gouda Ost",sv:"Gouda Ost",da:"Gouda Ost",fi:"Gouda Juusto",nl:"Goudse Kaas",lv:"Gaudas Siers",et:"Gouda Juust",lt:"Gaudos Sūris"}, kal:356, pro:25, karb:2.2, yag:28, lif:0, sod:820, por:30, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"milk, salt, rennet, E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Colouring."}] },
{ ad:"Greek Yogurt", adler:{tr:"Yunan Yoğurdu",de:"Griechischer Joghurt",el:"Ελληνικό Γιαούρτι",hu:"Görög Joghurt",pl:"Jogurt Grecki",cs:"Řecký Jogurt",ro:"Iaurt Grecesc",hr:"Grčki Jogurt",fr:"Yaourt Grec",es:"Yogur Griego",it:"Yogurt Greco",pt:"Iogurte Grego",no:"Gresk Yoghurt",sv:"Grekisk Yoghurt",da:"Græsk Yoghurt",fi:"Kreikkalainen Jogurtti",nl:"Griekse Yoghurt",lv:"Grieķu Jogurts",et:"Kreeka Jogurt",lt:"Graikiškas Jogurtas"}, kal:115, pro:6, karb:6, yag:8, lif:0, sod:55, por:150, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"whole milk, cultures", katkiMaddeleri:[] },
{ ad:"Granola", adler:{tr:"Granola",de:"Granola",el:"Γκρανόλα",hu:"Granola",pl:"Granola",cs:"Granola",ro:"Granola",hr:"Granola",fr:"Granola",es:"Granola",it:"Granola",pt:"Granola",no:"Granola",sv:"Granola",da:"Granola",fi:"Granola",nl:"Granola",lv:"Granola",et:"Granola",lt:"Granola"}, marka:"", kal:471, pro:10, karb:64, yag:20, lif:7, sod:45, por:45, kat:"Cereal", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"oats, honey, sunflower oil, nuts, E306", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Grapefruit", adler:{tr:"Greyfurt",de:"Grapefruit",el:"Γκρέιπφρουτ",hu:"Grapefruit",pl:"Grejpfrut",cs:"Grapefruit",ro:"Grepfrut",hr:"Grejpfrut",fr:"Pamplemousse",es:"Pomelo",it:"Pompelmo",pt:"Toranja",no:"Grapefrukt",sv:"Grapefrukt",da:"Grapefrugt",fi:"Greippi",nl:"Grapefruit",lv:"Greipfrūts",et:"Greip",lt:"Greipfrutas"}, kal:42, pro:0.8, karb:11, yag:0.1, lif:1.6, sod:0, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"grapefruit", katkiMaddeleri:[] },

// ── TR ──
{ ad:"Güveç (Et)", kal:225, pro:18, karb:12, yag:12, lif:3, sod:420, por:250, kat:"Et", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"dana eti, sebzeler, domates, zeytinyağı, tuz, baharat", katkiMaddeleri:[] },
{ ad:"Güveç (Sebze)", kal:95, pro:3, karb:14, yag:4, lif:4, sod:280, por:250, kat:"Sebze Yemekleri", ulke:"tr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"patlıcan, kabak, domates, biber, soğan, zeytinyağı", katkiMaddeleri:[] },
{ ad:"Güllaç", kal:185, pro:6, karb:32, yag:4, lif:0.5, sod:65, por:150, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"güllaç yaprağı, süt, şeker, gülsuyu, ceviz, nar", katkiMaddeleri:[] },
{ ad:"Greyfurt", kal:42, pro:0.8, karb:11, yag:0.1, lif:1.6, sod:0, por:100, kat:"Meyve", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"greyfurt", katkiMaddeleri:[] },
{ ad:"Gözleme (Peynirli)", kal:285, pro:12, karb:38, yag:11, lif:2, sod:480, por:150, kat:"Hamur İşleri", ulke:"tr", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"yufka, beyaz peynir, maydanoz, tereyağı", katkiMaddeleri:[] },
{ ad:"Gözleme (Ispanaklı)", kal:265, pro:10, karb:36, yag:10, lif:3, sod:420, por:150, kat:"Hamur İşleri", ulke:"tr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"yufka, ıspanak, soğan, tereyağı, tuz", katkiMaddeleri:[] },
{ ad:"Gün Kurusu Domates", kal:258, pro:5.5, karb:56, yag:2.5, lif:12, sod:2820, por:20, kat:"Sebze", ulke:"tr", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"domates, tuz", katkiMaddeleri:[] },
{ ad:"Garnitür (Sebze)", kal:55, pro:2.5, karb:9, yag:1.5, lif:3.5, sod:180, por:100, kat:"Sebze", ulke:"tr", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"bezelye, havuç, mısır, fasulye", katkiMaddeleri:[] },
{ ad:"Galeta Unu", kal:388, pro:12, karb:77, yag:3, lif:3.5, sod:485, por:30, kat:"Tahıl", ulke:"tr", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"buğday unu, tuz", katkiMaddeleri:[] },
{ ad:"Göbek Salata", kal:15, pro:1.3, karb:2.8, yag:0.2, lif:1.3, sod:8, por:100, kat:"Sebze", ulke:"tr", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"göbek marul", katkiMaddeleri:[] },

// ── DE ──
{ ad:"Grünkohl DE", kal:49, pro:4.3, karb:9, yag:0.9, lif:4.2, sod:43, por:150, kat:"Gemüse", ulke:"de", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"Grünkohl, Pinkel, Speck, Zwiebeln, Hafer, Schmalz", katkiMaddeleri:[] },
{ ad:"Gulasch DE", kal:225, pro:20, karb:8, yag:13, lif:2, sod:480, por:250, kat:"Fleisch", ulke:"de", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"Rindfleisch, Zwiebeln, Paprika, Tomatenmark, Gewürze", katkiMaddeleri:[] },
{ ad:"Griebenschmalz DE", kal:745, pro:6, karb:2, yag:80, lif:0, sod:280, por:20, kat:"Aufstrich", ulke:"de", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"Schweineschmalz, Grieben, Zwiebeln, Salz", katkiMaddeleri:[] },
{ ad:"Gemüsebrühe DE", kal:22, pro:1.5, karb:3.5, yag:0.5, lif:0.5, sod:580, por:250, kat:"Suppe", ulke:"de", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"Gemüse, Salz, Kräuter", katkiMaddeleri:[] },

// ── FR ──
{ ad:"Gratin Dauphinois FR", kal:195, pro:5, karb:18, yag:12, lif:2, sod:380, por:200, kat:"Accompagnement", ulke:"fr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"pommes de terre, crème, ail, noix de muscade, sel", katkiMaddeleri:[] },
{ ad:"Galette Bretonne FR", kal:268, pro:8, karb:38, yag:11, lif:3.5, sod:580, por:150, kat:"Plat", ulke:"fr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"farine de sarrasin, oeufs, lait, beurre, sel", katkiMaddeleri:[] },
{ ad:"Gruyère FR", kal:415, pro:30, karb:0.4, yag:33, lif:0, sod:680, por:30, kat:"Fromages", ulke:"fr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"lait cru, sel, présure", katkiMaddeleri:[] },
{ ad:"Gâteau Basque FR", kal:365, pro:6, karb:48, yag:18, lif:1.5, sod:185, por:80, kat:"Pâtisserie", ulke:"fr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"farine, beurre, sucre, oeufs, crème pâtissière ou confiture cerise", katkiMaddeleri:[] },

// ── IT ──
{ ad:"Gnocchi IT", kal:195, pro:5.5, karb:38, yag:2, lif:2, sod:285, por:150, kat:"Pasta", ulke:"it", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"patate, farina, uova, sale", katkiMaddeleri:[] },
{ ad:"Grana Padano IT", kal:385, pro:33, karb:0, yag:28, lif:0, sod:620, por:20, kat:"Formaggi", ulke:"it", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"latte, sale, caglio, lisozima E1105", katkiMaddeleri:[{kod:"E1105",ad:"Lisozima",tehlikeli:false,aciklama:"Conservante."}] },
{ ad:"Grissini IT", kal:392, pro:11, karb:74, yag:7, lif:3.5, sod:580, por:30, kat:"Pane", ulke:"it", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"farina, olio, acqua, lievito, sale", katkiMaddeleri:[] },
{ ad:"Gorgonzola IT", kal:360, pro:20, karb:0.5, yag:31, lif:0, sod:1380, por:30, kat:"Formaggi", ulke:"it", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"latte, sale, caglio, Penicillium glaucum", katkiMaddeleri:[] },

// ── ES ──
{ ad:"Gazpacho ES", kal:45, pro:1.5, karb:7, yag:1.5, lif:1.5, sod:380, por:300, kat:"Sopas Frías", ulke:"es", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"tomates, pepino, pimiento, cebolla, ajo, aceite, vinagre", katkiMaddeleri:[] },
{ ad:"Gambas al Ajillo ES", kal:165, pro:18, karb:2, yag:10, lif:0.3, sod:380, por:150, kat:"Tapas", ulke:"es", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"gambas, ajo, aceite de oliva, guindilla, sal", katkiMaddeleri:[] },
{ ad:"Gallos ES (Sargo)", kal:88, pro:18, karb:0, yag:1.8, lif:0, sod:65, por:150, kat:"Pescado", ulke:"es", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"sargo", katkiMaddeleri:[] },
{ ad:"Garbanzos Cocidos ES", kal:164, pro:8.9, karb:27, yag:2.6, lif:7.6, sod:7, por:100, kat:"Legumbres", ulke:"es", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"garbanzos cocidos, agua, sal", katkiMaddeleri:[] },

// ── EL ──
{ ad:"Γεμιστά", adLatin:"Gemista", kal:145, pro:4, karb:18, yag:7, lif:3, sod:380, por:200, kat:"Kyria Piata", ulke:"el", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"tomates, piperies, rizi, kremydaki, diosmos, elaiolado", katkiMaddeleri:[] },
{ ad:"Γαλακτομπούρεκο", adLatin:"Galaktoboureko", kal:365, pro:7, karb:48, yag:18, lif:1, sod:185, por:100, kat:"Glika", ulke:"el", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"filo, krema simigdali, gala, zachari, voutiro, kaneloporizia", katkiMaddeleri:[] },
{ ad:"Γίγαντες Πλακί", adLatin:"Gigantes Plaki", kal:185, pro:8.5, karb:28, yag:6, lif:8, sod:380, por:200, kat:"Ospriolahaniko", ulke:"el", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"gigantes, tomates, kremidi, elaiolado, selinon", katkiMaddeleri:[] },
{ ad:"Γιουβέτσι", adLatin:"Giouvetsi", kal:265, pro:18, karb:32, yag:8, lif:2.5, sod:480, por:250, kat:"Kyria Piata", ulke:"el", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"arnaki, kritharaki, tomates, kremidi, kanela, elaiolado", katkiMaddeleri:[] },

// ── EN ──
{ ad:"Gammon EN", kal:195, pro:26, karb:0, yag:10, lif:0, sod:1480, por:150, kat:"Meat", ulke:"en", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:3, icerik:"pork, salt, E250, E252", katkiMaddeleri:[{kod:"E250",ad:"Sodium nitrite",tehlikeli:true,aciklama:"In high amounts may be carcinogenic."},{kod:"E252",ad:"Potassium nitrate",tehlikeli:true,aciklama:"In high amounts harmful."}] },
{ ad:"Ginger Beer EN", kal:38, pro:0, karb:9.5, yag:0, lif:0, sod:10, por:330, kat:"Drinks", ulke:"en", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"water, sugar, ginger extract, E330, E224", katkiMaddeleri:[{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."},{kod:"E224",ad:"Potassium metabisulphite",tehlikeli:false,aciklama:"Preservative."}] },
{ ad:"Grouse EN", kal:148, pro:26, karb:0, yag:4.5, lif:0, sod:68, por:150, kat:"Game", ulke:"en", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"grouse", katkiMaddeleri:[] },

// ── DA ──
{ ad:"Gravet Laks DA", kal:208, pro:20, karb:2, yag:13, lif:0, sod:680, por:100, kat:"Fisk", ulke:"da", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"laks, salt, sukker, dild, hvid peber", katkiMaddeleri:[] },
{ ad:"Grønlangkål DA", kal:55, pro:3.5, karb:7, yag:2, lif:4, sod:280, por:200, kat:"Grøntsager", ulke:"da", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"grønkål, mælk, smør, mel, salt", katkiMaddeleri:[] },
{ ad:"Gammeldansk DA", kal:255, pro:0, karb:0, yag:0, lif:0, sod:0, por:40, kat:"Drikkevarer", ulke:"da", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:1.5, icerik:"alkohol, urter", katkiMaddeleri:[] },

// ── NO ──
{ ad:"Gravlaks NO", kal:208, pro:20, karb:2, yag:13, lif:0, sod:680, por:100, kat:"Fisk", ulke:"no", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"laks, salt, sukker, dill, hvit pepper", katkiMaddeleri:[] },
{ ad:"Grøt NO (Risgrøt)", kal:115, pro:2.8, karb:22, yag:2.5, lif:0.3, sod:45, por:200, kat:"Frokost", ulke:"no", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"ris, melk, salt, smør, kanel, sukker", katkiMaddeleri:[] },
{ ad:"Geitost NO", marka:"Gudbrandsdalen", kal:375, pro:9, karb:50, yag:16, lif:0, sod:640, por:30, kat:"Meieri", ulke:"no", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"geitemelk, helmelk, fløte, sukker", katkiMaddeleri:[] },
{ ad:"Grovbrød NO", kal:225, pro:8, karb:43, yag:2.5, lif:5.5, sod:480, por:100, kat:"Brod", ulke:"no", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"hvetemel, rugmel, havre, vann, salt, gjær", katkiMaddeleri:[] },

// ── SV ──
{ ad:"Gravad Lax SV", kal:208, pro:20, karb:2, yag:13, lif:0, sod:680, por:100, kat:"Fisk", ulke:"sv", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lax, salt, socker, dill, vit peppar", katkiMaddeleri:[] },
{ ad:"Gubbröra SV", kal:195, pro:10, karb:3, yag:16, lif:0.5, sod:480, por:100, kat:"Smörgåsbord", ulke:"sv", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"ansjovis, ägg, rödlök, kavring, gräddfil", katkiMaddeleri:[] },
{ ad:"Gräddfil SV", kal:125, pro:2.8, karb:4.2, yag:10.5, lif:0, sod:55, por:100, kat:"Mejeri", ulke:"sv", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"grädde, kulturer", katkiMaddeleri:[] },

// ── FI ──
{ ad:"Graavilohi FI", kal:208, pro:20, karb:2, yag:13, lif:0, sod:680, por:100, kat:"Kala", ulke:"fi", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lohi, suola, sokeri, tilli, valkoinen pippuri", katkiMaddeleri:[] },
{ ad:"Gruyère FI", kal:415, pro:30, karb:0.4, yag:33, lif:0, sod:680, por:30, kat:"Juusto", ulke:"fi", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"maito, suola, juoksute", katkiMaddeleri:[] },
{ ad:"Gluteeniton Kaura FI", kal:369, pro:13, karb:59, yag:7, lif:10, sod:7, por:45, kat:"Viljatuotteet", ulke:"fi", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"gluteeniton kaurahiutale", katkiMaddeleri:[] },

// ── NL ──
{ ad:"Gouda NL", marka:"Beemster", kal:356, pro:25, karb:2.2, yag:28, lif:0, sod:820, por:30, kat:"Kaas", ulke:"nl", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"volle melk, zout, stremsel, E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Kleurstof."}] },
{ ad:"Gehakt NL", kal:225, pro:20, karb:0, yag:16, lif:0, sod:75, por:100, kat:"Vlees", ulke:"nl", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"gemengd gehakt", katkiMaddeleri:[] },
{ ad:"Gevulde Koek NL", kal:445, pro:6, karb:58, yag:22, lif:2.5, sod:185, por:60, kat:"Koek", ulke:"nl", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"bloem, boter, suiker, amandelen, eieren, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono en diglyceriden",tehlikeli:false,aciklama:"Emulgator."}] },

// ── BE ──
{ ad:"Gentse Waterzooi BE", kal:165, pro:18, karb:8, yag:7, lif:2, sod:520, por:350, kat:"Soep", ulke:"be", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"kip of vis, prei, wortelen, aardappelen, room, eieren", katkiMaddeleri:[] },
{ ad:"Geuze BE", kal:42, pro:0.4, karb:4, yag:0, lif:0, sod:8, por:330, kat:"Bier", ulke:"be", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"water, mout, hop, gist, wild gisten", katkiMaddeleri:[] },
{ ad:"Grijze Garnalen BE", kal:82, pro:16, karb:0.5, yag:1.5, lif:0, sod:380, por:100, kat:"Zeevruchten", ulke:"be", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"grijze garnalen", katkiMaddeleri:[] },

// ── AT ──
{ ad:"Gulasch AT", kal:225, pro:20, karb:8, yag:13, lif:2, sod:480, por:250, kat:"Fleisch", ulke:"at", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"Rindfleisch, Zwiebeln, Paprika, Kümmel, Salz", katkiMaddeleri:[] },
{ ad:"Germknödel AT", kal:398, pro:9, karb:62, yag:13, lif:3, sod:185, por:150, kat:"Mehlspeisen", ulke:"at", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"Hefeteig, Powidl, Mohn, Butter, Zucker, Vanille", katkiMaddeleri:[] },
{ ad:"Grüner Veltliner AT", kal:85, pro:0.1, karb:2.5, yag:0, lif:0, sod:6, por:150, kat:"Getraenk", ulke:"at", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"Grüner Veltliner Trauben, E220", katkiMaddeleri:[{kod:"E220",ad:"Schwefeldioxid",tehlikeli:true,aciklama:"Kann allergische Reaktionen auslösen."}] },

// ── PL ──
{ ad:"Gołąbki PL", adLatin:"Golabki PL", kal:185, pro:12, karb:15, yag:9, lif:3, sod:480, por:200, kat:"Dania Glowne", ulke:"pl", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kapusta, mielone mieso, ryż, cebula, marchew, sos pomidorowy", katkiMaddeleri:[] },
{ ad:"Grochówka PL", adLatin:"Grochowka PL", kal:125, pro:8, karb:18, yag:3, lif:6, sod:520, por:300, kat:"Zupy", ulke:"pl", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"groch, boczek, marchew, seler, majeranek, sol", katkiMaddeleri:[] },
{ ad:"Gzik PL (Twarożek)", adLatin:"Gzik PL", kal:115, pro:10, karb:4, yag:7, lif:0.5, sod:280, por:100, kat:"Nabial", ulke:"pl", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"twaróg, śmietana, rzodkiewka, szczypiorek, sól", katkiMaddeleri:[] },
{ ad:"Gęsina PL", adLatin:"Gesina PL", kal:348, pro:22, karb:0, yag:29, lif:0, sod:75, por:150, kat:"Mieso", ulke:"pl", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"gęś", katkiMaddeleri:[] },

// ── CS ──
{ ad:"Guláš CS", adLatin:"Gulas CS", kal:225, pro:20, karb:8, yag:13, lif:2, sod:480, por:250, kat:"Hlavni Jidla", ulke:"cs", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"hovězí maso, cibule, paprika, kmín, sůl", katkiMaddeleri:[] },
{ ad:"Grenadýrmarš CS", adLatin:"Grenadyrmarc CS", kal:285, pro:9, karb:38, yag:12, lif:3, sod:480, por:250, kat:"Hlavni Jidla", ulke:"cs", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"brambory, těstoviny, cibule, sádlo, sůl, pepř", katkiMaddeleri:[] },
{ ad:"Griotky CS", adLatin:"Griotky CS", kal:248, pro:0.5, karb:62, yag:0, lif:1, sod:6, por:30, kat:"Dezerty", ulke:"cs", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"višně v alkoholu, čokoláda, cukr", katkiMaddeleri:[] },

// ── HU ──
{ ad:"Gulyásleves HU", adLatin:"Gulyasleves HU", kal:125, pro:10, karb:12, yag:5, lif:2, sod:480, por:300, kat:"Levesek", ulke:"hu", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"marhabus, burgonya, pirospaprika, hagyma, köménymag, só", katkiMaddeleri:[] },
{ ad:"Gombóc HU", adLatin:"Gomboc HU", kal:265, pro:5, karb:48, yag:7, lif:2, sod:165, por:150, kat:"Dessert", ulke:"hu", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"burgonya, liszt, tojás, szilva vagy baracklekvár, zsemlemorzsa, vaj", katkiMaddeleri:[] },
{ ad:"Grillcsirke HU", adLatin:"Grillcsirke HU", kal:215, pro:28, karb:2, yag:11, lif:0, sod:320, por:150, kat:"Baromfi", ulke:"hu", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"csirke, só, fokhagyma, paprika, olaj", katkiMaddeleri:[] },

// ── RO ──
{ ad:"Ghiveci RO", adLatin:"Ghiveci RO", kal:88, pro:2.5, karb:14, yag:3.5, lif:4, sod:280, por:250, kat:"Mancare", ulke:"ro", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"legume asortate, ulei, sare, condimente", katkiMaddeleri:[] },
{ ad:"Gulaș Românesc RO", adLatin:"Gulas Romanesc RO", kal:225, pro:20, karb:8, yag:13, lif:2, sod:480, por:250, kat:"Mancare", ulke:"ro", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"carne de vita, ceapa, ardei, boia, chimen, sare", katkiMaddeleri:[] },
{ ad:"Gogoși RO", adLatin:"Gogosi RO", kal:352, pro:6, karb:52, yag:15, lif:1.5, sod:185, por:60, kat:"Patiserie", ulke:"ro", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"faina, drojdie, lapte, oua, zahar, ulei", katkiMaddeleri:[] },

// ── HR ──
{ ad:"Gregada HR", adLatin:"Gregada HR", kal:145, pro:18, karb:8, yag:5.5, lif:1.5, sod:480, por:300, kat:"Jela", ulke:"hr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"riba, krumpir, luk, maslinovo ulje, vino, sol", katkiMaddeleri:[] },
{ ad:"Grah HR", adLatin:"Grah HR", kal:127, pro:8.7, karb:23, yag:0.5, lif:6.4, sod:5, por:100, kat:"Mahunarke", ulke:"hr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"grah", katkiMaddeleri:[] },
{ ad:"Gulaš HR", adLatin:"Gulas HR", kal:225, pro:20, karb:8, yag:13, lif:2, sod:480, por:250, kat:"Jela", ulke:"hr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"govedina, luk, paprika, kim, sol", katkiMaddeleri:[] },

// ── PT ──
{ ad:"Grão de Bico Ensopado PT", kal:185, pro:9, karb:28, yag:5, lif:8, sod:380, por:250, kat:"Prato", ulke:"pt", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"grão de bico, tomate, cebola, azeite, alho, sal", katkiMaddeleri:[] },
{ ad:"Gambas à Guilho PT", kal:165, pro:18, karb:2, yag:10, lif:0.3, sod:380, por:150, kat:"Mariscos", ulke:"pt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"gambas, azeite, alho, piri-piri, sal, limão", katkiMaddeleri:[] },

// ── LV ──
{ ad:"Griķi LV (Griķu Putra)", adLatin:"Griki LV", kal:92, pro:3.5, karb:18, yag:0.8, lif:2, sod:45, por:150, kat:"Putras", ulke:"lv", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"griķi, ūdens, sāls", katkiMaddeleri:[] },
{ ad:"Garšaugi LV (Dilles un Pētersīļi)", adLatin:"Garsaugi LV", kal:40, pro:3, karb:6, yag:0.8, lif:3, sod:50, por:10, kat:"Garšaugi", ulke:"lv", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"svaigi zaļumi", katkiMaddeleri:[] },
{ ad:"Gailene LV (Sēne)", adLatin:"Gailene LV", kal:20, pro:1.5, karb:3, yag:0.4, lif:2, sod:5, por:100, kat:"Sēnes", ulke:"lv", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"gailenes", katkiMaddeleri:[] },

// ── ET ──
{ ad:"Grillitud Lõhe ET", adLatin:"Grillitud Lohe ET", kal:208, pro:20, karb:0, yag:13, lif:0, sod:59, por:150, kat:"Kala", ulke:"et", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lõhe, sool, sidrunimahl, till", katkiMaddeleri:[] },
{ ad:"Grillitud Kana ET", adLatin:"Grillitud Kana ET", kal:215, pro:28, karb:2, yag:11, lif:0, sod:320, por:150, kat:"Liha", ulke:"et", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"kana, sool, küüslauk, ürdid", katkiMaddeleri:[] },
{ ad:"Gruusia Khinkali ET", adLatin:"Gruusia Khinkali ET", kal:195, pro:10, karb:28, yag:6, lif:1.5, sod:380, por:150, kat:"Toidud", ulke:"et", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"nisujahu, sealiha, veiseliha, sibul, koriander, sool", katkiMaddeleri:[] },

// ── LT ──
{ ad:"Gira LT (Tradicinis Gėrimas)", adLatin:"Gira LT", kal:28, pro:0.5, karb:6.5, yag:0, lif:0, sod:10, por:200, kat:"Gėrimai", ulke:"lt", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"rugiai, miežiai, vanduo, cukrus, mielės", katkiMaddeleri:[] },
{ ad:"Grybų Sriuba LT", adLatin:"Grybu Sriuba LT", kal:65, pro:3.5, karb:8, yag:3, lif:2.5, sod:480, por:300, kat:"Sriubos", ulke:"lt", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"grybai, svogūnas, morka, grietinė, druska, krapai", katkiMaddeleri:[] },
{ ad:"Grikiai LT (Grikių Košė)", adLatin:"Grikiai LT", kal:92, pro:3.5, karb:18, yag:0.8, lif:2, sod:45, por:150, kat:"Košės", ulke:"lt", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"grikiai, vanduo, druska", katkiMaddeleri:[] },
{ ad:"Griliuoti Šparagai LT", adLatin:"Griliuoti Sparagai LT", kal:20, pro:2.2, karb:3.9, yag:0.1, lif:2.1, sod:2, por:100, kat:"Daržovės", ulke:"lt", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"šparagai, alyvuogių aliejus, druska, pipirai", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// H HARFİ
// ══════════════════════════════════════════════════════

// ── PAYLAŞILAN ──
{ ad:"Honey (Bal)", adler:{tr:"Bal",de:"Honig",el:"Μέλι",hu:"Méz",pl:"Miód",cs:"Med",ro:"Miere",hr:"Med",fr:"Miel",es:"Miel",it:"Miele",pt:"Mel",no:"Honning",sv:"Honung",da:"Honning",fi:"Hunaja",nl:"Honing",lv:"Medus",et:"Mesi",lt:"Medus"}, kal:304, pro:0.3, karb:82, yag:0, lif:0, sod:4, por:20, kat:"Sweetener", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"honey", katkiMaddeleri:[] },
{ ad:"Hummus", adler:{tr:"Humus",de:"Hummus",el:"Χούμους",hu:"Humusz",pl:"Hummus",cs:"Hummus",ro:"Hummus",hr:"Hummus",fr:"Houmous",es:"Hummus",it:"Hummus",pt:"Hummus",no:"Hummus",sv:"Hummus",da:"Hummus",fi:"Hummus",nl:"Hummus",lv:"Humuss",et:"Hummus",lt:"Humusas"}, kal:166, pro:8, karb:14, yag:9.6, lif:6, sod:428, por:100, kat:"Dip", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"chickpeas, tahini, olive oil, lemon, garlic, salt", katkiMaddeleri:[] },
{ ad:"Herring (Ringa Balığı)", adler:{tr:"Ringa Balığı",de:"Hering",el:"Ρέγγα",hu:"Hering",pl:"Śledź",cs:"Sleď",ro:"Hering",hr:"Haringa",fr:"Hareng",es:"Arenque",it:"Aringa",pt:"Arenque",no:"Sild",sv:"Sill",da:"Sild",fi:"Silli",nl:"Haring",lv:"Siļķe",et:"Räim",lt:"Silkė"}, kal:158, pro:18, karb:0, yag:9, lif:0, sod:160, por:100, kat:"Fish", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"herring", katkiMaddeleri:[] },
{ ad:"Hazelnut (Fındık)", adler:{tr:"Fındık",de:"Haselnuss",el:"Φουντούκι",hu:"Mogyoró",pl:"Orzech Laskowy",cs:"Lískový Ořech",ro:"Alună",hr:"Lješnjak",fr:"Noisette",es:"Avellana",it:"Nocciola",pt:"Avelã",no:"Hasselnøtt",sv:"Hasselnöt",da:"Hasselnød",fi:"Hasselpähkinä",nl:"Hazelnoot",lv:"Lazdu Rieksts",et:"Sarapuupähkel",lt:"Lazdyno Riešutas"}, kal:628, pro:15, karb:17, yag:61, lif:9.7, sod:0, por:30, kat:"Nuts", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"hazelnuts", katkiMaddeleri:[] },
{ ad:"Ham (Jambon)", adler:{tr:"Jambon",de:"Schinken",el:"Ζαμπόν",hu:"Sonka",pl:"Szynka",cs:"Šunka",ro:"Șuncă",hr:"Šunka",fr:"Jambon",es:"Jamón",it:"Prosciutto Cotto",pt:"Fiambre",no:"Skinke",sv:"Skinka",da:"Skinke",fi:"Kinkku",nl:"Ham",lv:"Šķiņķis",et:"Sink",lt:"Kumpis"}, kal:145, pro:20, karb:1.5, yag:7, lif:0, sod:1150, por:50, kat:"Meat", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"pork, water, salt, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Sodium nitrite",tehlikeli:true,aciklama:"In high amounts may be carcinogenic."},{kod:"E451",ad:"Triphosphates",tehlikeli:false,aciklama:"Moisture retainer."}] },
{ ad:"Heavy Cream (Krema)", adler:{tr:"Sıvı Krema",de:"Sahne",el:"Κρέμα Γάλακτος",hu:"Tejszín",pl:"Śmietana",cs:"Smetana",ro:"Smântână",hr:"Vrhnje",fr:"Crème Liquide",es:"Nata",it:"Panna",pt:"Natas",no:"Fløte",sv:"Grädde",da:"Fløde",fi:"Kerma",nl:"Room",lv:"Krējums",et:"Koor",lt:"Grietinėlė"}, kal:340, pro:2.1, karb:2.9, yag:36, lif:0, sod:38, por:30, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"cream", katkiMaddeleri:[] },

// ── TR ──
{ ad:"Hamsili Pilav", kal:245, pro:14, karb:28, yag:9, lif:1.5, sod:380, por:200, kat:"Balık", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"hamsi, pirinç, fındık, kuş üzümü, tereyağı, soğan", katkiMaddeleri:[] },
{ ad:"Hamsili Ekmek", kal:265, pro:14, karb:32, yag:10, lif:2, sod:480, por:150, kat:"Balık", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"hamsi, ekmek, mısır unu, zeytinyağı, tuz", katkiMaddeleri:[] },
{ ad:"Haytalı", kal:145, pro:3.5, karb:28, yag:3, lif:0.5, sod:55, por:150, kat:"Tatlı", ulke:"tr", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"süt, nişasta, gülsuyu, şeker, Hindistan cevizi", katkiMaddeleri:[] },
{ ad:"Helva (Tahin)", kal:498, pro:14, karb:55, yag:28, lif:3, sod:85, por:50, kat:"Tatlı", ulke:"tr", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"tahin, şeker, vanilin", katkiMaddeleri:[] },
{ ad:"Helva (Un)", kal:345, pro:5.5, karb:52, yag:13, lif:1.5, sod:65, por:100, kat:"Tatlı", ulke:"tr", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"un, tereyağı, şeker, süt, çam fıstığı", katkiMaddeleri:[] },
{ ad:"Ispanak (Haşlanmış)", kal:23, pro:2.5, karb:3.6, yag:0.4, lif:2.4, sod:70, por:150, kat:"Sebze", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"ıspanak", katkiMaddeleri:[] },
{ ad:"Hindiba Salatası", kal:22, pro:1.8, karb:3.8, yag:0.3, lif:2, sod:28, por:150, kat:"Sebze", ulke:"tr", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"hindiba, zeytinyağı, limon, tuz", katkiMaddeleri:[] },
{ ad:"Humus (Türk Usulü)", kal:172, pro:8.5, karb:14, yag:10, lif:6, sod:380, por:100, kat:"Meze", ulke:"tr", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"nohut, tahin, zeytinyağı, limon, sarımsak, tuz", katkiMaddeleri:[] },
{ ad:"Hünkar Beğendi", kal:245, pro:16, karb:12, yag:16, lif:3, sod:480, por:250, kat:"Et", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"kuzu eti, patlıcan, tereyağı, un, süt, kaşar peyniri", katkiMaddeleri:[] },
{ ad:"Havuç Salatası", kal:55, pro:1, karb:11, yag:1.5, lif:3, sod:180, por:100, kat:"Salata", ulke:"tr", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"havuç, zeytinyağı, limon, sarımsak, tuz, maydanoz", katkiMaddeleri:[] },
{ ad:"Hayvansal Yağ (Tereyağı)", kal:717, pro:0.9, karb:0.1, yag:81, lif:0, sod:643, por:10, kat:"Yağlar", ulke:"tr", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"inek sütü, tuz", katkiMaddeleri:[] },

// ── DE ──
{ ad:"Haxe DE (Schweinshaxe)", kal:295, pro:25, karb:0, yag:21, lif:0, sod:680, por:200, kat:"Fleisch", ulke:"de", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"Schweinshaxe, Salz, Kümmel, Bier", katkiMaddeleri:[] },
{ ad:"Hefeweizen DE", kal:45, pro:0.5, karb:4.5, yag:0, lif:0, sod:8, por:330, kat:"Bier", ulke:"de", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"Wasser, Weizenmalz, Hopfen, Hefe", katkiMaddeleri:[] },
{ ad:"Heringsfilet DE", kal:155, pro:18, karb:2, yag:8, lif:0, sod:980, por:80, kat:"Fisch", ulke:"de", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"Heringsfilet, Essig, Zwiebeln, Gewürze, E220", katkiMaddeleri:[{kod:"E220",ad:"Schwefeldioxid",tehlikeli:true,aciklama:"Kann allergische Reaktionen auslösen."}] },
{ ad:"Himbeertorte DE", kal:285, pro:4.5, karb:42, yag:13, lif:2.5, sod:185, por:100, kat:"Torte", ulke:"de", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"Himbeeren, Sahne, Weizenmehl, Butter, Zucker, Eier", katkiMaddeleri:[] },
{ ad:"Handkäse DE", kal:112, pro:22, karb:0.5, yag:1.5, lif:0, sod:1280, por:100, kat:"Käse", ulke:"de", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"Magermilch, Salz, Lab, Kulturen", katkiMaddeleri:[] },

// ── FR ──
{ ad:"Huîtres FR", kal:69, pro:9, karb:3.9, yag:2, lif:0, sod:380, por:100, kat:"Fruits de Mer", ulke:"fr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"huîtres", katkiMaddeleri:[] },
{ ad:"Hachis Parmentier FR", kal:195, pro:12, karb:18, yag:9, lif:2.5, sod:480, por:300, kat:"Plat", ulke:"fr", tokPuan:60, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"boeuf haché, pommes de terre, beurre, lait, sel", katkiMaddeleri:[] },
{ ad:"Herbes de Provence FR", kal:265, pro:11, karb:64, yag:7, lif:43, sod:48, por:5, kat:"Épices", ulke:"fr", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"thym, romarin, origan, marjolaine, sarriette, lavande", katkiMaddeleri:[] },

// ── IT ──
{ ad:"Haricots Verts IT (Fagiolini)", kal:31, pro:2, karb:7, yag:0.1, lif:2.5, sod:6, por:100, kat:"Verdure", ulke:"it", tokPuan:30, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"fagiolini", katkiMaddeleri:[] },

// ── ES ──
{ ad:"Horchata de Chufa ES", kal:72, pro:0.5, karb:14, yag:1.5, lif:0.5, sod:5, por:200, kat:"Bebidas", ulke:"es", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"chufas, agua, azúcar", katkiMaddeleri:[] },
{ ad:"Huevos Rotos ES", kal:285, pro:14, karb:22, yag:18, lif:2.5, sod:580, por:250, kat:"Plato", ulke:"es", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"huevos, patatas fritas, jamón ibérico, aceite", katkiMaddeleri:[] },
{ ad:"Habas con Jamón ES", kal:148, pro:10, karb:16, yag:5.5, lif:7, sod:480, por:200, kat:"Verduras", ulke:"es", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"habas tiernas, jamón, ajo, aceite, sal", katkiMaddeleri:[] },

// ── EL ──
{ ad:"Χταπόδι Ξυδάτο", adLatin:"Chtapodi Xydato", kal:82, pro:15, karb:2, yag:1.5, lif:0, sod:480, por:100, kat:"Mezedes", ulke:"el", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"chtapodi, xidi, elaiolado, rigani", katkiMaddeleri:[] },
{ ad:"Χωριάτικο Ψωμί", adLatin:"Choriatiko Psomi", kal:235, pro:8, karb:44, yag:2.5, lif:5, sod:480, por:100, kat:"Artopoiia", ulke:"el", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"aleuron, nero, alati, prozia", katkiMaddeleri:[] },
{ ad:"Χαλούμι Σχαρίστο", adLatin:"Chaloumi Scharistó", kal:322, pro:22, karb:1.4, yag:26, lif:0, sod:1680, por:80, kat:"Galaktokomika", ulke:"el", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"provatino gala, alati, diosmos", katkiMaddeleri:[] },

// ── EN ──
{ ad:"Haggis EN", kal:295, pro:16, karb:14, yag:20, lif:1.5, sod:680, por:150, kat:"Dish", ulke:"en", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"sheep offal, oatmeal, onion, suet, spices", katkiMaddeleri:[] },
{ ad:"Hot Cross Bun EN", kal:322, pro:8, karb:54, yag:9, lif:2.5, sod:280, por:80, kat:"Baked Goods", ulke:"en", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"flour, dried fruit, spices, yeast, milk, egg, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."}] },
{ ad:"Haddock EN", kal:82, pro:19, karb:0, yag:0.7, lif:0, sod:68, por:150, kat:"Fish", ulke:"en", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"haddock", katkiMaddeleri:[] },

// ── DA ──
{ ad:"Hvedebrød DA", kal:265, pro:9, karb:52, yag:1.5, lif:2.5, sod:480, por:100, kat:"Brød", ulke:"da", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"hvedemel, vand, salt, gær", katkiMaddeleri:[] },
{ ad:"Hjemmelavet Syltetøj DA", kal:250, pro:0.4, karb:63, yag:0, lif:1.5, sod:8, por:20, kat:"Syltetoj", ulke:"da", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"bær, sukker, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektin",tehlikeli:false,aciklama:"Geliermiddel."},{kod:"E330",ad:"Citronsyre",tehlikeli:false,aciklama:"Surhetsregulator."}] },
{ ad:"Hyldeblomstdrik DA", kal:58, pro:0.1, karb:14, yag:0, lif:0, sod:5, por:200, kat:"Drikkevarer", ulke:"da", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"hyldeblomst, sukker, vand, E330", katkiMaddeleri:[{kod:"E330",ad:"Citronsyre",tehlikeli:false,aciklama:"Surhetsregulator."}] },

// ── NO ──
{ ad:"Hvalbiff NO", kal:135, pro:22, karb:0, yag:5, lif:0, sod:68, por:150, kat:"Kjøtt", ulke:"no", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"hvalkjøtt", katkiMaddeleri:[] },
{ ad:"Hjemmelaget Brod NO", kal:225, pro:8, karb:43, yag:2.5, lif:5.5, sod:480, por:100, kat:"Brod", ulke:"no", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"hvetemel, rugmel, havre, vann, gjær, salt", katkiMaddeleri:[] },
{ ad:"Hyllebærjuice NO", kal:58, pro:0.1, karb:14, yag:0, lif:0, sod:5, por:200, kat:"Drikkevarer", ulke:"no", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"hyllebær, vann, sukker, E330", katkiMaddeleri:[{kod:"E330",ad:"Sitronsyre",tehlikeli:false,aciklama:"Surhetsregulator."}] },

// ── SV ──
{ ad:"Husmanskost SV", kal:285, pro:18, karb:22, yag:14, lif:3, sod:580, por:350, kat:"Kott", ulke:"sv", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"kött, potatis, rotfrukter, sås", katkiMaddeleri:[] },
{ ad:"Havreflarn SV", kal:448, pro:6, karb:62, yag:22, lif:5, sod:185, por:30, kat:"Bakelse", ulke:"sv", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"havregryn, smör, socker, sirap, ägg, vetemjöl", katkiMaddeleri:[] },
{ ad:"Hushållsost SV", kal:312, pro:22, karb:0.5, yag:25, lif:0, sod:650, por:30, kat:"Mejeri", ulke:"sv", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mjölk, salt, löpe", katkiMaddeleri:[] },

// ── FI ──
{ ad:"Hernekeitto FI", kal:125, pro:8, karb:18, yag:3, lif:6, sod:520, por:300, kat:"Keitot", ulke:"fi", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"herneet, sianliha, sipuli, sinappi, suola, timjami", katkiMaddeleri:[] },
{ ad:"Hapankaali FI", kal:19, pro:0.9, karb:4.3, yag:0.1, lif:2.5, sod:661, por:100, kat:"Kasvikset", ulke:"fi", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"kaali, suola", katkiMaddeleri:[] },
{ ad:"Hillotäytekakku FI", kal:295, pro:5.5, karb:46, yag:11, lif:1.5, sod:185, por:100, kat:"Kakut", ulke:"fi", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"vehnäjauho, voi, sokeri, kananmuna, hillo, kermavaahto", katkiMaddeleri:[] },

// ── NL ──
{ ad:"Huzarensalade NL", kal:195, pro:6, karb:16, yag:13, lif:2.5, sod:480, por:150, kat:"Salades", ulke:"nl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"aardappelen, bieten, zure augurken, vlees, mayonaise", katkiMaddeleri:[] },
{ ad:"Hollandse Nieuwe NL", kal:158, pro:18, karb:0, yag:9, lif:0, sod:160, por:100, kat:"Vis", ulke:"nl", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"maatjesharing, uitjes", katkiMaddeleri:[] },
{ ad:"Hagelslag NL", kal:485, pro:4, karb:72, yag:22, lif:2, sod:45, por:20, kat:"Ontbijt", ulke:"nl", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"suiker, cacaomassa, cacaoboter, E322, E476", katkiMaddeleri:[{kod:"E322",ad:"Lecithinen",tehlikeli:false,aciklama:"Emulgator."},{kod:"E476",ad:"Polyglycerol",tehlikeli:false,aciklama:"Emulgator."}] },

// ── BE ──
{ ad:"Hutspot BE", kal:148, pro:5, karb:22, yag:5, lif:4, sod:380, por:300, kat:"Groenten", ulke:"be", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"aardappelen, wortelen, uien, boter, zout", katkiMaddeleri:[] },
{ ad:"Hanswijkse Taart BE", kal:335, pro:6, karb:48, yag:15, lif:2, sod:185, por:80, kat:"Gebak", ulke:"be", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"bloem, boter, eieren, suiker, amandelen", katkiMaddeleri:[] },

// ── AT ──
{ ad:"Heringsschmaus AT", kal:158, pro:18, karb:2, yag:8, lif:0, sod:980, por:80, kat:"Fisch", ulke:"at", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"Heringsfilet, Essig, Zwiebel, Sauerrahm", katkiMaddeleri:[] },
{ ad:"Heuriger Wein AT", kal:82, pro:0.1, karb:2.5, yag:0, lif:0, sod:6, por:150, kat:"Getraenk", ulke:"at", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"Wein, E220", katkiMaddeleri:[{kod:"E220",ad:"Schwefeldioxid",tehlikeli:true,aciklama:"Kann allergische Reaktionen auslösen."}] },
{ ad:"Husarenfleisch AT", kal:285, pro:20, karb:8, yag:19, lif:1.5, sod:580, por:200, kat:"Fleisch", ulke:"at", tokPuan:60, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"Schweinefleisch, Essiggurken, Zwiebel, Senf, Salz", katkiMaddeleri:[] },

// ── PL ──
{ ad:"Herczyk PL (Śledź po Polsku)", adLatin:"Herczyk PL", kal:155, pro:16, karb:4, yag:8, lif:0, sod:980, por:80, kat:"Ryby", ulke:"pl", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"śledź, cebula, śmietana, ocet, pieprz", katkiMaddeleri:[] },
{ ad:"Hałuski PL", adLatin:"Haluski PL", kal:285, pro:8, karb:42, yag:11, lif:2.5, sod:380, por:200, kat:"Dania Glowne", ulke:"pl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"kopytka, kapusta, cebula, boczek, sól, pieprz", katkiMaddeleri:[] },
{ ad:"Herbata Polska PL", adLatin:"Herbata Polska PL", kal:2, pro:0.1, karb:0.3, yag:0, lif:0, sod:1, por:200, kat:"Napoje", ulke:"pl", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"czarna herbata, woda", katkiMaddeleri:[] },

// ── CS ──
{ ad:"Hovězí Vývar CS", adLatin:"Hovezi Vyvar CS", kal:28, pro:3.5, karb:0.5, yag:1, lif:0, sod:380, por:250, kat:"Polévky", ulke:"cs", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"hovězí kosti, kořenová zelenina, sůl, petržel", katkiMaddeleri:[] },
{ ad:"Houskový Knedlík CS", adLatin:"Houskovy Knedlik CS", kal:215, pro:7, karb:40, yag:3, lif:2, sod:280, por:150, kat:"Přílohy", ulke:"cs", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"housky, mléko, vejce, mouka, sůl", katkiMaddeleri:[] },
{ ad:"Hrachová Kaše CS", adLatin:"Hrachova Kase CS", kal:118, pro:7.5, karb:18, yag:2.5, lif:6, sod:380, por:200, kat:"Prilohy", ulke:"cs", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"hrách, cibule, česnek, sůl", katkiMaddeleri:[] },

// ── HU ──
{ ad:"Halászlé HU", adLatin:"Halaszle HU", kal:88, pro:8, karb:5, yag:4, lif:1.5, sod:480, por:300, kat:"Halételek", ulke:"hu", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"ponty vagy duna hal, hagyma, paprika, só", katkiMaddeleri:[] },
{ ad:"Hurka HU", adLatin:"Hurka HU", kal:285, pro:12, karb:14, yag:22, lif:1, sod:880, por:100, kat:"Hentesáruk", ulke:"hu", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"sertésvér, rizs, hagyma, zsír, só, E250", katkiMaddeleri:[{kod:"E250",ad:"Nátrium-nitrit",tehlikeli:true,aciklama:"Nagyobb adagban karcinogén."}] },
{ ad:"Házi Kenyér HU", adLatin:"Hazi Kenyer HU", kal:225, pro:8, karb:43, yag:2.5, lif:5, sod:480, por:100, kat:"Pékáruk", ulke:"hu", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"liszt, víz, élesztő, só", katkiMaddeleri:[] },

// ── RO ──
{ ad:"Haluști RO", adLatin:"Halusti RO", kal:185, pro:7, karb:28, yag:6, lif:2, sod:380, por:150, kat:"Mancare", ulke:"ro", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"faina, cartofi, branza, unt, sare", katkiMaddeleri:[] },
{ ad:"Hribi la Tigaie RO", adLatin:"Hribi la Tigaie RO", kal:35, pro:3, karb:5, yag:1, lif:2.5, sod:180, por:150, kat:"Legume", ulke:"ro", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"hribi, usturoi, patrunjel, ulei, sare, piper", katkiMaddeleri:[] },

// ── HR ──
{ ad:"Hvarska Gregada HR", adLatin:"Hvarska Gregada HR", kal:145, pro:18, karb:8, yag:5.5, lif:1.5, sod:480, por:300, kat:"Jela", ulke:"hr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"riba, krumpir, luk, maslinovo ulje, vino", katkiMaddeleri:[] },
{ ad:"Hladni Rez HR", adLatin:"Hladni Rez HR", kal:215, pro:14, karb:2, yag:17, lif:0, sod:980, por:50, kat:"Mesne Preradjevine", ulke:"hr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"svinjina, sol, E250, E451, zacini", katkiMaddeleri:[{kod:"E250",ad:"Natrijev nitrit",tehlikeli:true,aciklama:"U visokim dozama može biti kancerogen."},{kod:"E451",ad:"Trifosfati",tehlikeli:false,aciklama:"Zadržavač vlage."}] },

// ── PT ──
{ ad:"Hortelã PT (Erva-Boa)", kal:44, pro:3.3, karb:8, yag:0.7, lif:6.8, sod:30, por:10, kat:"Ervas", ulke:"pt", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"hortelã fresca", katkiMaddeleri:[] },
{ ad:"Húmus de Grão PT", kal:172, pro:8.5, karb:14, yag:10, lif:6, sod:380, por:100, kat:"Pasta", ulke:"pt", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"grão de bico, tahini, azeite, limão, alho, sal", katkiMaddeleri:[] },

// ── LV ──
{ ad:"Herings LV (Sālīts)", adLatin:"Herins LV Salits", kal:158, pro:18, karb:0, yag:9, lif:0, sod:1200, por:80, kat:"Zivis", ulke:"lv", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"siļķe, sāls, garšvielas", katkiMaddeleri:[] },
{ ad:"Hrustu Dārzeņi LV", adLatin:"Hrustu Darzeni LV", kal:55, pro:2, karb:9, yag:1.5, lif:3.5, sod:180, por:150, kat:"Dārzeņi", ulke:"lv", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"jaukti dārzeņi, olīveļļa, sāls", katkiMaddeleri:[] },
{ ad:"Ābolu Sīrups LV", adLatin:"Abolu Sirups LV", kal:265, pro:0.2, karb:68, yag:0, lif:0, sod:4, por:20, kat:"Saldumi", ulke:"lv", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"ābolu sula, cukurs", katkiMaddeleri:[] },

// ── ET ──
{ ad:"Hapukurk ET", adLatin:"Hapukurk ET", kal:15, pro:0.7, karb:3.6, yag:0.1, lif:0.5, sod:680, por:50, kat:"Marineeritud", ulke:"et", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"kurk, äädikas, sool, suhkur, küüslauk, till", katkiMaddeleri:[] },
{ ad:"Hapupiim ET", adLatin:"Hapupiim ET", kal:55, pro:3.5, karb:4.2, yag:2, lif:0, sod:50, por:200, kat:"Piimatooted", ulke:"et", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"piim, kultuurid", katkiMaddeleri:[] },
{ ad:"Heeringas ET", adLatin:"Heeringas ET", kal:158, pro:18, karb:0, yag:9, lif:0, sod:980, por:80, kat:"Kala", ulke:"et", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"heeringas, äädikas, sibul, vürtsid, E220", katkiMaddeleri:[{kod:"E220",ad:"Vääveldioksiid",tehlikeli:true,aciklama:"Võib põhjustada allergilisi reaktsioone."}] },

// ── LT ──
{ ad:"Heringa LT (Silkė)", adLatin:"Heringa LT Silke", kal:158, pro:18, karb:0, yag:9, lif:0, sod:980, por:80, kat:"Zuvis", ulke:"lt", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"silkė, actas, svogūnas, prieskoniai, E220", katkiMaddeleri:[{kod:"E220",ad:"Sieros dioksidas",tehlikeli:true,aciklama:"Gali sukelti alergines reakcijas."}] },
{ ad:"Hollandiškas Padažas LT", adLatin:"Hollandiskas Padazas LT", kal:325, pro:3, karb:1.5, yag:34, lif:0, sod:380, por:30, kat:"Padažai", ulke:"lt", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"sviestas, kiaušinių tryniai, citrinos sultys, druska", katkiMaddeleri:[] },
{ ad:"Haringa su Bulvėmis LT", adLatin:"Haringa su Bulvemis LT", kal:195, pro:14, karb:18, yag:8, lif:2, sod:780, por:200, kat:"Patiekalai", ulke:"lt", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"silkė, bulvės, svogūnas, grietinė, druska", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// I HARFİ
// ══════════════════════════════════════════════════════

// ── PAYLAŞILAN ──
{ ad:"Ice Cream (Dondurma)", adler:{tr:"Dondurma",de:"Eis",el:"Παγωτό",hu:"Fagylalt",pl:"Lody",cs:"Zmrzlina",ro:"Înghețată",hr:"Sladoled",fr:"Glace",es:"Helado",it:"Gelato",pt:"Gelado",no:"Is",sv:"Glass",da:"Is",fi:"Jäätelö",nl:"Ijs",lv:"Saldējums",et:"Jäätis",lt:"Ledai"}, kal:207, pro:3.5, karb:24, yag:11, lif:0, sod:80, por:100, kat:"Dessert", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"milk, cream, sugar, egg yolks, vanilla, E471, E410", katkiMaddeleri:[{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E410",ad:"Locust bean gum",tehlikeli:false,aciklama:"Thickener."}] },

// ── TR ──
{ ad:"Ispanak Yemeği", kal:88, pro:3.5, karb:8, yag:5, lif:3.5, sod:280, por:200, kat:"Sebze Yemekleri", ulke:"tr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"ıspanak, soğan, zeytinyağı, domates, tuz", katkiMaddeleri:[] },
{ ad:"Islama Köfte", kal:248, pro:18, karb:12, yag:15, lif:1.5, sod:480, por:150, kat:"Et", ulke:"tr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"kıyma, ekmek, soğan, baharat, tuz", katkiMaddeleri:[] },
{ ad:"İnegöl Köfte", kal:245, pro:20, karb:5, yag:17, lif:0.5, sod:380, por:150, kat:"Et", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"dana kıyma, soğan, tuz, karabiber", katkiMaddeleri:[] },
{ ad:"İrmik Helvası", kal:358, pro:6, karb:58, yag:13, lif:1.5, sod:65, por:100, kat:"Tatlı", ulke:"tr", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"irmik, şeker, tereyağı, süt, çam fıstığı", katkiMaddeleri:[] },
{ ad:"İskender Kebap", kal:385, pro:24, karb:24, yag:22, lif:2, sod:580, por:250, kat:"Et", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"döner eti, pide, domates sosu, tereyağı, yoğurt", katkiMaddeleri:[] },
{ ad:"İnce Bulgur", kal:342, pro:12, karb:72, yag:1.5, lif:8, sod:6, por:100, kat:"Tahıl", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"buğday", katkiMaddeleri:[] },
{ ad:"İçli Köfte", kal:295, pro:14, karb:28, yag:16, lif:3, sod:420, por:100, kat:"Et", ulke:"tr", tokPuan:60, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"ince bulgur, kıyma, ceviz, soğan, baharat", katkiMaddeleri:[] },

// ── DE ──
{ ad:"Ingwertee DE", kal:4, pro:0.1, karb:0.8, yag:0, lif:0, sod:2, por:200, kat:"Getraenk", ulke:"de", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"Ingwer, Wasser, Zitrone", katkiMaddeleri:[] },
{ ad:"Ingwerplätzchen DE", kal:412, pro:5.5, karb:66, yag:15, lif:2, sod:185, por:30, kat:"Gebaeck", ulke:"de", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"Weizenmehl, Butter, Zucker, Ingwer, Gewürze, E500", katkiMaddeleri:[{kod:"E500",ad:"Natriumcarbonat",tehlikeli:false,aciklama:"Triebmittel."}] },

// ── FR ──
{ ad:"Île Flottante FR", kal:195, pro:6, karb:28, yag:8, lif:0, sod:65, por:150, kat:"Desserts", ulke:"fr", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"blancs d'oeufs, lait, crème anglaise, caramel, sucre", katkiMaddeleri:[] },
{ ad:"Ibérique Charcuterie FR", kal:415, pro:22, karb:1, yag:36, lif:0, sod:1680, por:30, kat:"Charcuterie", ulke:"fr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"porc ibérique, sel, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrite de sodium",tehlikeli:true,aciklama:"En grande quantité peut être cancérigène."}] },

// ── IT ──
{ ad:"Insalata Caprese IT", kal:165, pro:11, karb:3, yag:13, lif:0.5, sod:420, por:150, kat:"Antipasto", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"mozzarella, pomodori, basilico, olio d'oliva, sale", katkiMaddeleri:[] },
{ ad:"Involtini IT", kal:218, pro:22, karb:4, yag:13, lif:1, sod:420, por:150, kat:"Carne", ulke:"it", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"vitello o manzo, prosciutto, salvia, aglio, vino bianco", katkiMaddeleri:[] },
{ ad:"Insalata di Riso IT", kal:155, pro:4.5, karb:28, yag:4.5, lif:2, sod:380, por:200, kat:"Insalate", ulke:"it", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"riso, tonno, olive, capperi, pomodori, olio, sale", katkiMaddeleri:[] },

// ── ES ──
{ ad:"Ibérico Jamón ES", kal:268, pro:30, karb:0, yag:17, lif:0, sod:1680, por:30, kat:"Embutidos", ulke:"es", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"cerdo ibérico, sal marina", katkiMaddeleri:[] },
{ ad:"Ibérico Chorizo ES", kal:415, pro:22, karb:2, yag:36, lif:0, sod:1680, por:30, kat:"Embutidos", ulke:"es", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"cerdo ibérico, pimentón, sal, ajo, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito sódico",tehlikeli:true,aciklama:"En altas dosis puede ser cancerígeno."}] },

// ── EL ──
{ ad:"Ιμάμ Μπαϊλντί", adLatin:"Imam Bailldi", kal:125, pro:2.5, karb:12, yag:8, lif:4, sod:280, por:200, kat:"Ladera", ulke:"el", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"melitzana, kremidi, tomates, skordho, elaiolado, maidanos", katkiMaddeleri:[] },

// ── EN ──
{ ad:"Irish Stew EN", kal:185, pro:18, karb:14, yag:7, lif:3, sod:480, por:350, kat:"Dish", ulke:"en", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"lamb, potatoes, carrots, onions, thyme, salt, water", katkiMaddeleri:[] },
{ ad:"Irn-Bru EN", marka:"A.G. Barr", kal:43, pro:0, karb:10.5, yag:0, lif:0, sod:20, por:330, kat:"Drinks", ulke:"en", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:1, icerik:"water, sugar, E150c, E160c, E211, flavourings", katkiMaddeleri:[{kod:"E150c",ad:"Ammonia caramel",tehlikeli:false,aciklama:"Colouring."},{kod:"E211",ad:"Sodium benzoate",tehlikeli:false,aciklama:"Preservative."}] },

// ── DA ──
{ ad:"Is og Sorbet DA", kal:195, pro:2.5, karb:28, yag:9, lif:0, sod:65, por:100, kat:"Dessert", ulke:"da", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"mælk, fløde, sukker, bær, E410, E471", katkiMaddeleri:[{kod:"E410",ad:"Johannesbrødkernemel",tehlikeli:false,aciklama:"Fortykningsmiddel."},{kod:"E471",ad:"Mono og diglycerider",tehlikeli:false,aciklama:"Emulgator."}] },
{ ad:"Ingefærøl DA", kal:38, pro:0, karb:9.5, yag:0, lif:0, sod:10, por:330, kat:"Drikkevarer", ulke:"da", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"vand, sukker, ingefærekstrakt, E330, E224", katkiMaddeleri:[{kod:"E330",ad:"Citronsyre",tehlikeli:false,aciklama:"Surhetsregulator."},{kod:"E224",ad:"Kaliummetabisulfit",tehlikeli:false,aciklama:"Konserveringsmiddel."}] },

// ── NO ──
{ ad:"Ingefærøl NO", kal:38, pro:0, karb:9.5, yag:0, lif:0, sod:10, por:330, kat:"Drikkevarer", ulke:"no", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"vann, sukker, ingefærektakt, E330", katkiMaddeleri:[{kod:"E330",ad:"Sitronsyre",tehlikeli:false,aciklama:"Surhetsregulator."}] },

// ── SV ──
{ ad:"Ingefärskakor SV", kal:398, pro:5, karb:62, yag:16, lif:2, sod:185, por:30, kat:"Bakelse", ulke:"sv", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"vetemjöl, smör, socker, ingefära, kanel, kryddnejlika", katkiMaddeleri:[] },
{ ad:"Inkokt Lax SV", kal:195, pro:19, karb:2, yag:12, lif:0, sod:380, por:100, kat:"Fisk", ulke:"sv", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"lax, dill, salt, lagerblad, vitpeppar", katkiMaddeleri:[] },

// ── FI ──
{ ad:"Inkivääritee FI", kal:4, pro:0.1, karb:0.8, yag:0, lif:0, sod:2, por:200, kat:"Juomat", ulke:"fi", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"inkivääri, vesi, sitruuna", katkiMaddeleri:[] },
{ ad:"Islantilainen Suklaa FI", kal:546, pro:5, karb:60, yag:31, lif:11, sod:20, por:30, kat:"Makeiset", ulke:"fi", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"kaakao, sokeri, kaakaovoi, E322", katkiMaddeleri:[{kod:"E322",ad:"Lesitiinit",tehlikeli:false,aciklama:"Emulgaattori."}] },

// ── NL ──
{ ad:"Indische Rijsttafel NL", kal:285, pro:12, karb:38, yag:10, lif:3, sod:580, por:350, kat:"Maaltijden", ulke:"nl", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"rijst, diverse Indische bereidingen, kruiden, specerijen", katkiMaddeleri:[] },
{ ad:"Ingelegde Haring NL", kal:155, pro:16, karb:4, yag:8, lif:0, sod:980, por:80, kat:"Vis", ulke:"nl", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"haring, azijn, uien, gewurzen, E220", katkiMaddeleri:[{kod:"E220",ad:"Zwaveldioxide",tehlikeli:true,aciklama:"Kan allergische reacties veroorzaken."}] },

// ── BE ──
{ ad:"Iers Stoofvlees BE", kal:185, pro:18, karb:14, yag:7, lif:3, sod:480, por:350, kat:"Vlees", ulke:"be", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"lam, aardappelen, wortelen, uien, tijm, zout", katkiMaddeleri:[] },

// ── AT ──
{ ad:"Ingwerlimo AT", kal:38, pro:0, karb:9.5, yag:0, lif:0, sod:10, por:330, kat:"Getraenk", ulke:"at", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"Wasser, Zucker, Ingwerextrakt, E330, E224", katkiMaddeleri:[{kod:"E330",ad:"Zitronensäure",tehlikeli:false,aciklama:"Säureregulator."},{kod:"E224",ad:"Kaliummetabisulfit",tehlikeli:false,aciklama:"Konservierungsmittel."}] },

// ── PL ──
{ ad:"Indyk Pieczony PL", adLatin:"Indyk Pieczony PL", kal:165, pro:25, karb:0, yag:7, lif:0, sod:72, por:150, kat:"Mięso", ulke:"pl", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"indyk, majeranek, czosnek, sól, pieprz, oliwa", katkiMaddeleri:[] },
{ ad:"Imbirowa Herbata PL", adLatin:"Imbirowa Herbata PL", kal:4, pro:0.1, karb:0.8, yag:0, lif:0, sod:2, por:200, kat:"Napoje", ulke:"pl", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"imbir, woda, cytryna", katkiMaddeleri:[] },

// ── CS ──
{ ad:"Ingverový Čaj CS", adLatin:"Ingverovy Caj CS", kal:4, pro:0.1, karb:0.8, yag:0, lif:0, sod:2, por:200, kat:"Napoje", ulke:"cs", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"zázvor, voda, citron", katkiMaddeleri:[] },
{ ad:"Italský Salát CS", adLatin:"Italsky Salat CS", kal:155, pro:4, karb:16, yag:9, lif:2.5, sod:380, por:150, kat:"Salatky", ulke:"cs", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"brambory, zelenina, mayonéza, sůl", katkiMaddeleri:[] },

// ── HU ──
{ ad:"Ingveres Sütemény HU", adLatin:"Ingveres Sutemeny HU", kal:412, pro:5.5, karb:66, yag:15, lif:2, sod:185, por:30, kat:"Sütemény", ulke:"hu", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"liszt, vaj, cukor, gyömbér, fahéj, szegfűszeg", katkiMaddeleri:[] },

// ── RO ──
{ ad:"Icrele de Crap RO", adLatin:"Icrele de Crap RO", kal:185, pro:18, karb:1, yag:12, lif:0, sod:480, por:100, kat:"Aperitive", ulke:"ro", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"icre de crap, ulei, suc de lamaie, ceapa, sare", katkiMaddeleri:[] },
{ ad:"Iahnie de Fasole RO", adLatin:"Iahnie de Fasole RO", kal:148, pro:8, karb:22, yag:4.5, lif:7.5, sod:380, por:200, kat:"Mancare", ulke:"ro", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"fasole alba, ceapa, ulei, rosii, cimbru, sare", katkiMaddeleri:[] },

// ── HR ──
{ ad:"Istarski Pršut HR", adLatin:"Istarski Prsut HR", kal:248, pro:28, karb:0, yag:15, lif:0, sod:1680, por:30, kat:"Suhe Mesne Preradjevine", ulke:"hr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"svinjski but, sol, bilje", katkiMaddeleri:[] },
{ ad:"Istarska Maneštra HR", adLatin:"Istarska Manestra HR", kal:165, pro:8.5, karb:22, yag:5.5, lif:6, sod:520, por:350, kat:"Jela", ulke:"hr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"grah, kukuruz, raštike, panceta, cesnjak, maslinovo ulje", katkiMaddeleri:[] },

// ── PT ──
{ ad:"Iscas de Porco PT", kal:235, pro:24, karb:3, yag:14, lif:0.5, sod:480, por:150, kat:"Carne", ulke:"pt", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"fígado de porco, vinho branco, alho, louro, sal", katkiMaddeleri:[] },
{ ad:"Inhame PT (Taro)", kal:112, pro:1.5, karb:26, yag:0.2, lif:3.7, sod:11, por:100, kat:"Tuberculos", ulke:"pt", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"inhame", katkiMaddeleri:[] },

// ── LV ──
{ ad:"Ingvera Tēja LV", adLatin:"Ingvera Teja LV", kal:4, pro:0.1, karb:0.8, yag:0, lif:0, sod:2, por:200, kat:"Dzērieni", ulke:"lv", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"ingvers, ūdens, citrons", katkiMaddeleri:[] },
{ ad:"Iesala Maize LV", adLatin:"Iesala Maize LV", kal:218, pro:7.5, karb:40, yag:2, lif:7, sod:480, por:100, kat:"Maize", ulke:"lv", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"rudzu milti, iesals, ūdens, sāls", katkiMaddeleri:[] },

// ── ET ──
{ ad:"Ingveri Tee ET", adLatin:"Ingveri Tee ET", kal:4, pro:0.1, karb:0.8, yag:0, lif:0, sod:2, por:200, kat:"Joogid", ulke:"et", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"ingver, vesi, sidrun", katkiMaddeleri:[] },
{ ad:"Isemajanduse Liha ET", adLatin:"Isemajanduse Liha ET", kal:185, pro:22, karb:0, yag:11, lif:0, sod:68, por:150, kat:"Liha", ulke:"et", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"kodune liha", katkiMaddeleri:[] },

// ── LT ──
{ ad:"Imbierinė Arbata LT", adLatin:"Imbierine Arbata LT", kal:4, pro:0.1, karb:0.8, yag:0, lif:0, sod:2, por:200, kat:"Gėrimai", ulke:"lt", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"imbieras, vanduo, citrina", katkiMaddeleri:[] },
{ ad:"Įdaryta Paprika LT", adLatin:"Idaryta Paprika LT", kal:145, pro:10, karb:14, yag:6, lif:2.5, sod:380, por:200, kat:"Patiekalai", ulke:"lt", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"paprika, mėsa, ryžiai, morka, svogūnas, druska", katkiMaddeleri:[] },

// ══════════════════════════════════════════
// GERÇEK EKSİKLER — F/G/H/I TAMAMLAMA
// ══════════════════════════════════════════

// ── PAYLAŞILAN EKLER ──
{ ad:"Falafel", adler:{tr:"Falafel",de:"Falafel",el:"Φαλάφελ",hu:"Falafel",pl:"Falafel",cs:"Falafel",ro:"Falafel",hr:"Falafel",fr:"Falafel",es:"Falafel",it:"Falafel",pt:"Falafel",no:"Falafel",sv:"Falafel",da:"Falafel",fi:"Falafel",nl:"Falafel",lv:"Falafel",et:"Falafel",lt:"Falafelis"}, kal:333, pro:13, karb:32, yag:18, lif:5, sod:580, por:100, kat:"Vegetarian", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"chickpeas, onion, garlic, parsley, cumin, coriander, salt", katkiMaddeleri:[] },
{ ad:"Guacamole", adler:{tr:"Guakamole",de:"Guacamole",el:"Γκουακαμόλε",hu:"Guacamole",pl:"Guacamole",cs:"Guacamole",ro:"Guacamole",hr:"Guacamole",fr:"Guacamole",es:"Guacamole",it:"Guacamole",pt:"Guacamole",no:"Guacamole",sv:"Guacamole",da:"Guacamole",fi:"Guacamole",nl:"Guacamole",lv:"Gvakamole",et:"Guacamole",lt:"Gvakamolė"}, kal:160, pro:2, karb:9, yag:15, lif:6.7, sod:280, por:100, kat:"Dip", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:52, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"avocado, lime, onion, coriander, salt", katkiMaddeleri:[] },
{ ad:"Halloumi", adler:{tr:"Hellim Peyniri",de:"Halloumi",el:"Χαλούμι",hu:"Halloumi",pl:"Ser Halloumi",cs:"Sýr Halloumi",ro:"Brânză Halloumi",hr:"Sir Halloumi",fr:"Fromage Halloumi",es:"Queso Halloumi",it:"Formaggio Halloumi",pt:"Queijo Halloumi",no:"Halloumi",sv:"Halloumi",da:"Halloumi",fi:"Halloumi",nl:"Halloumi",lv:"Halumi",et:"Halloumi",lt:"Halumis"}, kal:322, pro:22, karb:1.4, yag:26, lif:0, sod:1680, por:80, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"sheep milk, goat milk, salt, mint", katkiMaddeleri:[] },

// ── F EK ──
// SV
{ ad:"Falukorv SV", kal:265, pro:12, karb:4, yag:23, lif:0, sod:920, por:100, kat:"Kött", ulke:"sv", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"nötkött, fläsk, potatisstärkelse, salt, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"I höga mängder cancerframkallande."},{kod:"E451",ad:"Trifosfater",tehlikeli:false,aciklama:"Fuktighetsbevarande."}] },
{ ad:"Fläskpannkaka SV", kal:225, pro:9, karb:18, yag:14, lif:0.5, sod:380, por:200, kat:"Kött", ulke:"sv", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"fläsk, mjölk, ägg, vetemjöl, salt", katkiMaddeleri:[] },
// DA
{ ad:"Frikadeller DA", kal:235, pro:16, karb:8, yag:16, lif:0.8, sod:480, por:100, kat:"Kød", ulke:"da", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"hakket svinekød, løg, æg, mel, mælk, salt, peber", katkiMaddeleri:[] },
{ ad:"Frikassé DA", kal:195, pro:20, karb:5, yag:11, lif:1, sod:480, por:250, kat:"Fjerkræ", ulke:"da", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"kylling, grøntsager, fløde, mel, salt", katkiMaddeleri:[] },
// NO
{ ad:"Fiskekaker NO", kal:165, pro:14, karb:10, yag:8, lif:1, sod:480, por:100, kat:"Fisk", ulke:"no", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"fiskekjøtt, potetmel, salt, ingefær, løk", katkiMaddeleri:[] },
// IT
{ ad:"Farinata IT", kal:245, pro:8, karb:32, yag:10, lif:3.5, sod:380, por:100, kat:"Pane", ulke:"it", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"farina di ceci, acqua, olio d'oliva, sale, rosmarino", katkiMaddeleri:[] },
{ ad:"Fagioli all'Uccelletto IT", kal:155, pro:8, karb:22, yag:5, lif:8, sod:380, por:200, kat:"Legumi", ulke:"it", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"fagioli cannellini, pomodoro, salvia, aglio, olio, sale", katkiMaddeleri:[] },
// ES
{ ad:"Flan ES", kal:168, pro:5.5, karb:24, yag:6, lif:0, sod:68, por:120, kat:"Postres", ulke:"es", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"leche, huevos, azúcar, caramelo, vainilla", katkiMaddeleri:[] },
// EL
{ ad:"Φρικάσε Αρνί", adLatin:"Frikase Arni", kal:265, pro:22, karb:5, yag:18, lif:2, sod:480, por:250, kat:"Kyria Piata", ulke:"el", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"arnaki, maroulia, kremydakia, avgolemo, anithos", katkiMaddeleri:[] },
// FR
{ ad:"Fricassée de Poulet FR", kal:225, pro:24, karb:5, yag:13, lif:1, sod:480, por:250, kat:"Plat", ulke:"fr", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"poulet, crème, champignons, échalotes, vin blanc, sel", katkiMaddeleri:[] },
// DE
{ ad:"Frühstücksspeck DE", kal:548, pro:28, karb:0, yag:48, lif:0, sod:1580, por:30, kat:"Fleisch", ulke:"de", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:2.5, icerik:"Schweinebauch, Salz, E250, E252", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."},{kod:"E252",ad:"Kaliumnitrat",tehlikeli:true,aciklama:"In hohen Mengen schädlich."}] },
// PL
{ ad:"Fasolka po Bretońsku PL", adLatin:"Fasolka po Bretonsku PL", kal:175, pro:10, karb:20, yag:7, lif:8, sod:580, por:200, kat:"Dania Glowne", ulke:"pl", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"biała fasola, kiełbasa, boczek, pomidory, majeranek, sol", katkiMaddeleri:[] },
// CS
{ ad:"Frgál CS (Valašský)", adLatin:"Frgal CS", kal:335, pro:6, karb:52, yag:12, lif:2.5, sod:185, por:100, kat:"Dezerty", ulke:"cs", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"mouka, mléko, vejce, sádlo, ovoce nebo mák, cukr", katkiMaddeleri:[] },
// HU
{ ad:"Flekken HU", adLatin:"Flekken HU", kal:348, pro:22, karb:0, yag:29, lif:0, sod:580, por:150, kat:"Grill", ulke:"hu", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"sertésoldalas, só, fokhagyma, bors", katkiMaddeleri:[] },
// RO
{ ad:"Friptură RO", adLatin:"Friptura RO", kal:245, pro:24, karb:2, yag:16, lif:0.5, sod:380, por:150, kat:"Gratar", ulke:"ro", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"carne de porc sau vita, usturoi, cimbru, boia, sare", katkiMaddeleri:[] },
// HR
{ ad:"Fritule HR", adLatin:"Fritule HR", kal:328, pro:6, karb:48, yag:14, lif:1.5, sod:185, por:80, kat:"Kolaci", ulke:"hr", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"brašno, grožđice, rakija, naranča, jaja, šećer, ulje", katkiMaddeleri:[] },
// PT
{ ad:"Farinheira PT", kal:398, pro:16, karb:12, yag:34, lif:0, sod:1480, por:30, kat:"Enchidos", ulke:"pt", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"gordura de porco, farinha, pimentão, sal, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito de sódio",tehlikeli:true,aciklama:"Em altas doses pode ser cancerígeno."}] },
// LV
{ ad:"Forshmaks LV", adLatin:"Forshmaks LV", kal:165, pro:12, karb:8, yag:10, lif:0.5, sod:980, por:100, kat:"Uzkožumi", ulke:"lv", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"siļķe, āboli, sīpoli, maize, etiķis, pipari", katkiMaddeleri:[] },
// LT
{ ad:"Frikadelės LT", adLatin:"Frikadeles LT", kal:195, pro:15, karb:8, yag:12, lif:0.8, sod:420, por:100, kat:"Patiekalai", ulke:"lt", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"mėsa, svogūnas, kiaušinis, miltai, druska, pipirai", katkiMaddeleri:[] },
// BE
{ ad:"Faro Bier BE", marka:"Brasserie Cantillon", kal:40, pro:0.4, karb:3.5, yag:0, lif:0, sod:8, por:330, kat:"Bier", ulke:"be", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"water, gerst, tarwe, hop, kandijsuiker, wilde gisten", katkiMaddeleri:[] },
// ET
{ ad:"Frikadell ET", adLatin:"Frikadell ET", kal:195, pro:15, karb:8, yag:12, lif:0.8, sod:420, por:100, kat:"Liha", ulke:"et", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"hakkliha, sibul, muna, jahu, sool, pipar", katkiMaddeleri:[] },
// AT
{ ad:"Faschiertes Laibchen AT", kal:228, pro:18, karb:8, yag:15, lif:0.8, sod:480, por:100, kat:"Fleisch", ulke:"at", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"Hackfleisch, Ei, Semmelbröseln, Zwiebel, Salz, Pfeffer", katkiMaddeleri:[] },

// ── G EK ──
// PT
{ ad:"Ginjinha PT", kal:185, pro:0, karb:28, yag:0, lif:0, sod:0, por:40, kat:"Bebidas", ulke:"pt", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"ginja, aguardente, açúcar", katkiMaddeleri:[] },
{ ad:"Grão de Bico Assado PT", kal:175, pro:9.5, karb:27, yag:4, lif:8, sod:280, por:100, kat:"Petiscos", ulke:"pt", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"grão de bico, azeite, alho, pimentão, sal", katkiMaddeleri:[] },
// SV
{ ad:"Gröt SV (Havregrynsgröt)", kal:68, pro:2.5, karb:13, yag:0.5, lif:2, sod:45, por:200, kat:"Frukost", ulke:"sv", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"havregryn, vatten, salt", katkiMaddeleri:[] },
{ ad:"Getost SV", kal:335, pro:20, karb:1, yag:28, lif:0, sod:680, por:30, kat:"Mejeri", ulke:"sv", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"getmjölk, salt, löpe", katkiMaddeleri:[] },
// DA
{ ad:"Gule Ærter DA", kal:125, pro:8, karb:18, yag:3, lif:6, sod:520, por:300, kat:"Suppe", ulke:"da", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"gule ærter, flæsk, gulerødder, selleri, sennep, salt", katkiMaddeleri:[] },
// NO
{ ad:"Grovt Brød NO", kal:218, pro:8, karb:40, yag:2, lif:7, sod:480, por:100, kat:"Brod", ulke:"no", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"grovt hvetemel, rugmel, frø, vann, gjær, salt", katkiMaddeleri:[] },
// FI
{ ad:"Grillimakkara FI", kal:285, pro:12, karb:4, yag:25, lif:0, sod:920, por:100, kat:"Lihatuotteet", ulke:"fi", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"sianliha, naudanliha, suola, E250, E451, mausteet", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitriitti",tehlikeli:true,aciklama:"Suurina annoksina karsinogeeninen."},{kod:"E451",ad:"Trifosfaatit",tehlikeli:false,aciklama:"Kosteudensäilyttäjä."}] },
{ ad:"Graavihauki FI", kal:145, pro:20, karb:2, yag:6.5, lif:0, sod:480, por:100, kat:"Kala", ulke:"fi", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"hauki, suola, sokeri, tilli, valkoinen pippuri", katkiMaddeleri:[] },
// EN
{ ad:"Grilled Mackerel EN", kal:205, pro:19, karb:0, yag:14, lif:0, sod:90, por:150, kat:"Fish", ulke:"en", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"mackerel", katkiMaddeleri:[] },
// NL
{ ad:"Groentesoep NL", kal:55, pro:2.5, karb:8, yag:1.5, lif:2.5, sod:480, por:300, kat:"Soep", ulke:"nl", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"groenten, bouillon, vermicelli, zout", katkiMaddeleri:[] },
{ ad:"Gehaktbal NL", kal:225, pro:16, karb:6, yag:16, lif:0.8, sod:480, por:100, kat:"Vlees", ulke:"nl", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"gehakt, ui, ei, paneermeel, zout, nootmuskaat", katkiMaddeleri:[] },
// CS
{ ad:"Guláš se Špenátem CS", adLatin:"Gulas se Spenatam CS", kal:195, pro:16, karb:10, yag:11, lif:3, sod:480, por:250, kat:"Hlavni Jidla", ulke:"cs", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"vepřové maso, špenát, cibule, paprika, česnek, sůl", katkiMaddeleri:[] },
// HU
{ ad:"Gesztenye Püré HU", adLatin:"Gesztenye Pure HU", kal:215, pro:3, karb:48, yag:2, lif:5, sod:8, por:100, kat:"Dessert", ulke:"hu", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"gesztenye, cukor, tejszín, vanília", katkiMaddeleri:[] },
// BE
{ ad:"Gepaneerde Kip BE", kal:285, pro:22, karb:14, yag:16, lif:1, sod:420, por:150, kat:"Gevogelte", ulke:"be", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"kipfilet, paneermeel, eieren, bloem, zout", katkiMaddeleri:[] },
// AT
{ ad:"Grammelschmalz AT", kal:745, pro:6, karb:2, yag:80, lif:0, sod:280, por:20, kat:"Aufstrich", ulke:"at", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"Schweineschmalz, Grieben, Zwiebeln, Majoran, Salz", katkiMaddeleri:[] },
// PL
{ ad:"Grzyby Marynowane PL", adLatin:"Grzyby Marynowane PL", kal:28, pro:2, karb:4, yag:0.5, lif:2, sod:380, por:50, kat:"Przetwory", ulke:"pl", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"grzyby, ocet, sól, cukier, ziele angielskie", katkiMaddeleri:[] },
// RO
{ ad:"Grâu cu Lapte RO", adLatin:"Grau cu Lapte RO", kal:115, pro:3.5, karb:22, yag:2.5, lif:1, sod:45, por:200, kat:"Mic Dejun", ulke:"ro", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"grâu, lapte, zahar, sare", katkiMaddeleri:[] },
// HR
{ ad:"Grožđe HR", adLatin:"Grozde HR", kal:67, pro:0.6, karb:17, yag:0.4, lif:0.9, sod:2, por:100, kat:"Voce", ulke:"hr", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"grožđe", katkiMaddeleri:[] },
// LV
{ ad:"Grauzdētas Maizes Grauzdiņi LV", adLatin:"Grauzdetas Maizes LV", kal:398, pro:11, karb:74, yag:7, lif:3.5, sod:580, por:30, kat:"Uzkožumi", ulke:"lv", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"maize, eļļa, sāls, ķiploks", katkiMaddeleri:[] },
// ET
{ ad:"Grillitud Sealiha ET", adLatin:"Grillitud Sealiha ET", kal:265, pro:24, karb:0, yag:18, lif:0, sod:72, por:150, kat:"Liha", ulke:"et", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"sealiha, sool, küüslauk, pipar", katkiMaddeleri:[] },
// LT
{ ad:"Grietinė LT", adLatin:"Grietine LT", kal:198, pro:3, karb:3.8, yag:20, lif:0, sod:55, por:100, kat:"Pieno Produktai", ulke:"lt", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"grietinė, kultūros", katkiMaddeleri:[] },

// ── H EK ──
// Shared
{ ad:"Hollandaise Sauce", adler:{tr:"Hollandaz Sosu",de:"Sauce Hollandaise",el:"Σάλτσα Ολλανδέζ",hu:"Holland Mártás",pl:"Sos Hollandaise",cs:"Holandská Omáčka",ro:"Sos Hollandaise",hr:"Hollandaise Umak",fr:"Sauce Hollandaise",es:"Salsa Holandesa",it:"Salsa Olandese",pt:"Molho Holandês",no:"Sauce Hollandaise",sv:"Sauce Hollandaise",da:"Sauce Hollandaise",fi:"Hollandaise Kastike",nl:"Sauce Hollandaise",lv:"Hollandaise Mērce",et:"Hollandaise Kaste",lt:"Hollandaise Padažas"}, kal:325, pro:3, karb:1.5, yag:34, lif:0, sod:380, por:30, kat:"Sauce", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"butter, egg yolks, lemon juice, salt", katkiMaddeleri:[] },
// IT
{ ad:"Hamburger Italiano IT", kal:285, pro:20, karb:4, yag:22, lif:0.5, sod:420, por:150, kat:"Carne", ulke:"it", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"manzo, sale, pepe", katkiMaddeleri:[] },
{ ad:"Hummus di Ceci IT", kal:168, pro:8.5, karb:14, yag:10, lif:6, sod:380, por:100, kat:"Antipasto", ulke:"it", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"ceci, tahini, olio, limone, aglio, sale", katkiMaddeleri:[] },
// DA
{ ad:"Havregrød DA", kal:68, pro:2.5, karb:13, yag:0.5, lif:2, sod:45, por:200, kat:"Morgenmad", ulke:"da", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"havregryn, vand, salt", katkiMaddeleri:[] },
{ ad:"Hanegal Ost DA", kal:365, pro:22, karb:0.5, yag:31, lif:0, sod:650, por:30, kat:"Mejeri", ulke:"da", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mælk, salt, løbe", katkiMaddeleri:[] },
// NO
{ ad:"Havregrøt NO", kal:68, pro:2.5, karb:13, yag:0.5, lif:2, sod:45, por:200, kat:"Frokost", ulke:"no", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"havre, vann, salt", katkiMaddeleri:[] },
// SV
{ ad:"Havregrynsgröt SV", kal:68, pro:2.5, karb:13, yag:0.5, lif:2, sod:45, por:200, kat:"Frukost", ulke:"sv", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"havregryn, vatten, salt", katkiMaddeleri:[] },
// EL
{ ad:"Χόρτα Βραστά EL2", adLatin:"Chorta Vrasta EL2", kal:35, pro:2.5, karb:5, yag:0.8, lif:3.5, sod:45, por:200, kat:"Lachanika", ulke:"el", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"agria chorta, elaiolado, lemoni, alati", katkiMaddeleri:[] },
// FR
{ ad:"Harengs Marinés FR", kal:158, pro:18, karb:2, yag:8, lif:0, sod:980, por:80, kat:"Poisson", ulke:"fr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"harengs, vinaigre, oignons, épices, E220", katkiMaddeleri:[{kod:"E220",ad:"Dioxyde de soufre",tehlikeli:true,aciklama:"Peut causer des réactions allergiques."}] },
// ES
{ ad:"Hígado Encebollado ES", kal:175, pro:22, karb:6, yag:8, lif:1, sod:380, por:150, kat:"Carne", ulke:"es", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"hígado de ternera, cebolla, aceite, sal, pimienta", katkiMaddeleri:[] },
// EN
{ ad:"Hot Pot EN", kal:195, pro:18, karb:14, yag:7, lif:3, sod:480, por:350, kat:"Dish", ulke:"en", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"lamb, potatoes, onions, carrots, stock, salt", katkiMaddeleri:[] },
// DE
{ ad:"Holundersaft DE", kal:58, pro:0.1, karb:14, yag:0, lif:0, sod:5, por:200, kat:"Getraenk", ulke:"de", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"Holunderblüten, Wasser, Zucker, E330", katkiMaddeleri:[{kod:"E330",ad:"Zitronensäure",tehlikeli:false,aciklama:"Säureregulator."}] },
{ ad:"Hähnchen Braten DE", kal:215, pro:28, karb:2, yag:11, lif:0, sod:320, por:150, kat:"Geflügel", ulke:"de", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"Hähnchen, Gewürze, Knoblauch, Öl, Salz", katkiMaddeleri:[] },
// FI
{ ad:"Hapanleipä FI", kal:215, pro:7.5, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Leipa", ulke:"fi", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ruisjauho, vesi, suola, hapanjuuri", katkiMaddeleri:[] },
// BE
{ ad:"Hutsepot BE", kal:148, pro:8, karb:18, yag:5, lif:4, sod:480, por:300, kat:"Stoofpotten", ulke:"be", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"aardappelen, wortelen, rapen, uien, rundvlees, zout", katkiMaddeleri:[] },
// RO
{ ad:"Hurmuze RO", adLatin:"Hurmuze RO", kal:248, pro:0.4, karb:62, yag:0, lif:1, sod:6, por:30, kat:"Dulciuri", ulke:"ro", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"zahar, sirop, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pectine",tehlikeli:false,aciklama:"Agent de gelificare."},{kod:"E330",ad:"Acid citric",tehlikeli:false,aciklama:"Regulator de aciditate."}] },
// HR
{ ad:"Hobotnica na Salatu HR", adLatin:"Hobotnica na Salatu HR", kal:88, pro:15, karb:4, yag:2.5, lif:0.5, sod:480, por:150, kat:"Salate", ulke:"hr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"hobotnica, maslinovo ulje, limun, cesnjak, peršin", katkiMaddeleri:[] },
// PT
{ ad:"Honrado Queijo PT", kal:358, pro:22, karb:0.5, yag:30, lif:0, sod:650, por:30, kat:"Queijos", ulke:"pt", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"leite de ovelha, sal, coalho", katkiMaddeleri:[] },
// LV
{ ad:"Heringsalāti LV", adLatin:"Heringsalati LV", kal:185, pro:10, karb:8, yag:13, lif:1.5, sod:680, por:150, kat:"Salāti", ulke:"lv", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"siļķe, bietes, kartupeļi, āboli, sīpoli, majonēze", katkiMaddeleri:[] },
// AT
{ ad:"Hirtenkäse AT", kal:298, pro:20, karb:0.5, yag:24, lif:0, sod:680, por:30, kat:"Milchprodukte", ulke:"at", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Rohmilch, Salz, Lab", katkiMaddeleri:[] },
// PL
{ ad:"Herbatniki PL", adLatin:"Herbatniki PL", kal:448, pro:7, karb:62, yag:22, lif:3, sod:480, por:30, kat:"Ciastka", ulke:"pl", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"mąka, cukier, tłuszcz roślinny, sól, E471, E500", katkiMaddeleri:[{kod:"E471",ad:"Mono i diglicerydy",tehlikeli:false,aciklama:"Emulgator."},{kod:"E500",ad:"Węglany sodu",tehlikeli:false,aciklama:"Spulchniacz."}] },
// CS
{ ad:"Hovězí Karbanátky CS", adLatin:"Hovezi Karbanatky CS", kal:235, pro:18, karb:8, yag:16, lif:0.8, sod:480, por:100, kat:"Maso", ulke:"cs", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"hovězí maso, vejce, cibule, strouhanka, sůl, pepř", katkiMaddeleri:[] },
// LT
{ ad:"Hercogai LT (Pyrago Gabalai)", adLatin:"Hercogai LT", kal:365, pro:6, karb:52, yag:16, lif:1.5, sod:185, por:80, kat:"Kepiniai", ulke:"lt", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"miltai, sviestas, cukrus, kiaušiniai, uogienė", katkiMaddeleri:[] },
// ET extra
{ ad:"Hakkliharoog ET", adLatin:"Hakkliharoog ET", kal:225, pro:18, karb:8, yag:14, lif:1, sod:420, por:150, kat:"Liha", ulke:"et", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"hakkliha, sibul, muna, sool, pipar", katkiMaddeleri:[] },

// ── I EK ──
// Shared
{ ad:"Instant Oats", adler:{tr:"Hazır Yulaf Ezmesi",de:"Instanthafer",el:"Βρώμη Στιγμής",hu:"Instant Zabpehely",pl:"Płatki Owsiane Instant",cs:"Instantní Ovesné Vločky",ro:"Fulgi de Ovăz Instant",hr:"Instant Zobene Pahuljice",fr:"Flocons d'Avoine Instant",es:"Avena Instantánea",it:"Avena Istantanea",pt:"Aveia Instantânea",no:"Instant Havre",sv:"Instant Havregryn",da:"Instant Havregryn",fi:"Pikakaurahiutale",nl:"Instant Havermout",lv:"Tūlītēji Auzu Pārsli",et:"Kiirkaerahelbed",lt:"Momentiniai Avižų Dribsniai"}, kal:371, pro:13, karb:59, yag:7, lif:10, sod:380, por:40, kat:"Cereal", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"oats, salt, E306", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
// IT
{ ad:"Insalata Mista IT", kal:22, pro:1.5, karb:3.8, yag:0.5, lif:2, sod:28, por:150, kat:"Insalate", ulke:"it", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"lattuga, radicchio, rucola, pomodori, olio, aceto, sale", katkiMaddeleri:[] },
{ ad:"Insaccati Italiani IT", kal:385, pro:22, karb:1, yag:33, lif:0, sod:1580, por:30, kat:"Salumi", ulke:"it", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"carne di maiale, sale, E250, spezie", katkiMaddeleri:[{kod:"E250",ad:"Nitrito di sodio",tehlikeli:true,aciklama:"In alte dosi può essere cancerogeno."}] },
{ ad:"Insalata di Farro IT", kal:185, pro:8, karb:32, yag:5, lif:5, sod:280, por:200, kat:"Insalate", ulke:"it", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"farro, pomodori, rucola, feta, olio, aceto, sale", katkiMaddeleri:[] },
// EL
{ ad:"Ιχθυόσουπα", adLatin:"Ichthuosoupa", kal:88, pro:8, karb:6, yag:4, lif:1, sod:480, por:300, kat:"Soupa", ulke:"el", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"psari, patates, kremidi, elaiolado, avgolemo, dafni", katkiMaddeleri:[] },
// ES
{ ad:"Idiazábal ES", kal:415, pro:28, karb:0.5, yag:34, lif:0, sod:650, por:30, kat:"Quesos", ulke:"es", tokPuan:50, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"leche cruda de oveja latxa, sal, cuajo", katkiMaddeleri:[] },
// FR
{ ad:"Indochine Poulet FR", kal:215, pro:22, karb:8, yag:12, lif:2, sod:480, por:200, kat:"Plat", ulke:"fr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"poulet, lait de coco, citronnelle, gingembre, curcuma, sel", katkiMaddeleri:[] },
// DE
{ ad:"Ingwerschorle DE", kal:38, pro:0.1, karb:9, yag:0, lif:0, sod:10, por:330, kat:"Getraenk", ulke:"de", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"Ingwersaft, Mineralwasser, E330", katkiMaddeleri:[{kod:"E330",ad:"Zitronensäure",tehlikeli:false,aciklama:"Säureregulator."}] },
// EN
{ ad:"Iced Tea EN", kal:28, pro:0.1, karb:7, yag:0, lif:0, sod:3, por:330, kat:"Drinks", ulke:"en", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"black tea, water, sugar, lemon, E330", katkiMaddeleri:[{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."}] },
// HU
{ ad:"Ízletes Sertésborda HU", adLatin:"Izletes Sertesborda HU", kal:265, pro:24, karb:4, yag:17, lif:0.5, sod:380, por:150, kat:"Fogások", ulke:"hu", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"sertéskaraj, mustár, fokhagyma, só, bors, olaj", katkiMaddeleri:[] },
// AT
{ ad:"Insalata Triestina AT", adLatin:"Insalata Triestina AT", kal:145, pro:4, karb:14, yag:8, lif:2.5, sod:380, por:150, kat:"Salate", ulke:"at", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"Bohnen, Kapern, Sardellen, Öl, Essig, Salz", katkiMaddeleri:[] },
// PL
{ ad:"Imbirowe Pierniki PL", adLatin:"Imbirowe Pierniki PL", kal:398, pro:5.5, karb:66, yag:14, lif:2, sod:185, por:30, kat:"Ciastka", ulke:"pl", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"mąka, miód, jajka, imbir, cynamon, goździki, cukier", katkiMaddeleri:[] },
// CS
{ ad:"Italská Omáčka CS", adLatin:"Italska Omacka CS", kal:85, pro:2.5, karb:12, yag:3.5, lif:2, sod:480, por:100, kat:"Omacky", ulke:"cs", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"rajčata, bazalka, česnek, olio, sůl, cukr", katkiMaddeleri:[] },
// RO
{ ad:"Ienupăr Sos RO", adLatin:"Ienupăr Sos RO", kal:65, pro:0.5, karb:8, yag:3, lif:0.5, sod:280, por:50, kat:"Sosuri", ulke:"ro", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"ienupăr, unt, smântână, vin roșu, sare", katkiMaddeleri:[] },
// HR
{ ad:"Ispod Peke HR", adLatin:"Ispod Peke HR", kal:285, pro:22, karb:8, yag:18, lif:2, sod:480, por:300, kat:"Jela", ulke:"hr", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"janjetina ili teletina, krumpir, luk, maslinovo ulje, bilje, sol", katkiMaddeleri:[] },
// PT
{ ad:"Infusão de Camomila PT", kal:2, pro:0.1, karb:0.3, yag:0, lif:0, sod:1, por:200, kat:"Infusões", ulke:"pt", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"camomila, água", katkiMaddeleri:[] },
// NO
{ ad:"Iskrem med Bær NO", kal:195, pro:3, karb:26, yag:10, lif:0.5, sod:65, por:100, kat:"Dessert", ulke:"no", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"fløte, melk, sukker, bær, E410, E471", katkiMaddeleri:[{kod:"E410",ad:"Johannesbrødkernemel",tehlikeli:false,aciklama:"Fortykningsmiddel."},{kod:"E471",ad:"Mono og diglycerider",tehlikeli:false,aciklama:"Emulgator."}] },
// BE
{ ad:"Italiaanse Salade BE", kal:145, pro:4, karb:14, yag:8, lif:2.5, sod:380, por:150, kat:"Salades", ulke:"be", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"pasta, groenten, tonijn, olijven, kappertjes, olie, azijn, zout", katkiMaddeleri:[] },
// LV
{ ad:"Ievārījums ar Burkānu LV", adLatin:"Ievarijums ar Burkanu LV", kal:248, pro:0.5, karb:62, yag:0, lif:1, sod:8, por:20, kat:"Ievārījumi", ulke:"lv", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"burkāni, cukurs, citronskābe, E440", katkiMaddeleri:[{kod:"E440",ad:"Pektīns",tehlikeli:false,aciklama:"Želejviela."}] },
// LT
{ ad:"Itališka Pasta LT", adLatin:"Italiska Pasta LT", kal:265, pro:10, karb:42, yag:7, lif:2.5, sod:380, por:200, kat:"Patiekalai", ulke:"lt", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"makaronai, pomidorų padažas, bazilikas, česnakas, druska", katkiMaddeleri:[] },
// ET
{ ad:"Itaalia Pasta ET", adLatin:"Itaalia Pasta ET", kal:265, pro:10, karb:42, yag:7, lif:2.5, sod:380, por:200, kat:"Toidud", ulke:"et", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"pasta, tomatikaste, basiilik, küüslauk, sool", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// J HARFİ
// ══════════════════════════════════════════════════════

// ── PAYLAŞILAN ──
{ ad:"Jalapeño", adler:{tr:"Jalapeño Biber",de:"Jalapeño",el:"Χαλαπένιο",hu:"Jalapeño",pl:"Jalapeño",cs:"Jalapeño",ro:"Jalapeño",hr:"Jalapeño",fr:"Jalapeño",es:"Jalapeño",it:"Jalapeño",pt:"Jalapeño",no:"Jalapeño",sv:"Jalapeño",da:"Jalapeño",fi:"Jalapeño",nl:"Jalapeño",lv:"Jalapeño",et:"Jalapeño",lt:"Jalapeño"}, kal:29, pro:0.9, karb:6.5, yag:0.4, lif:2.8, sod:3, por:30, kat:"Spice", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"jalapeño pepper", katkiMaddeleri:[] },

// ── TR ──
{ ad:"Jöleli Lokum", kal:350, pro:1.5, karb:85, yag:1, lif:0, sod:28, por:30, kat:"Tatlı", ulke:"tr", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"nişasta, şeker, E440, E330, gülsuyu", katkiMaddeleri:[{kod:"E440",ad:"Pektin",tehlikeli:false,aciklama:"Jelleşme maddesi."},{kod:"E330",ad:"Sitrik asit",tehlikeli:false,aciklama:"Asitlik düzenleyici."}] },

// ── DE ──
{ ad:"Jägerschnitzel DE", kal:298, pro:22, karb:8, yag:20, lif:1.5, sod:520, por:200, kat:"Fleisch", ulke:"de", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"Schweineschnitzel, Champignons, Sahne, Zwiebeln, Salz", katkiMaddeleri:[] },
{ ad:"Jägermeister DE", kal:325, pro:0, karb:22, yag:0, lif:0, sod:0, por:40, kat:"Alkohol", ulke:"de", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:1.5, icerik:"Alkohol, Kräuter, Zucker", katkiMaddeleri:[] },
{ ad:"Johannisbeerkuchen DE", kal:285, pro:5.5, karb:42, yag:12, lif:2.5, sod:185, por:100, kat:"Kuchen", ulke:"de", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"Johannisbeeren, Weizenmehl, Butter, Zucker, Eier", katkiMaddeleri:[] },

// ── FR ──
{ ad:"Jambon de Bayonne FR", kal:215, pro:28, karb:0, yag:12, lif:0, sod:1680, por:30, kat:"Charcuterie", ulke:"fr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"jambon, sel marin", katkiMaddeleri:[] },
{ ad:"Julienne FR", kal:42, pro:2, karb:7, yag:1, lif:2.5, sod:180, por:150, kat:"Légumes", ulke:"fr", tokPuan:30, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"carottes, poireaux, céleri, courgettes", katkiMaddeleri:[] },

// ── IT ──
{ ad:"Jota IT (Zuppa Triestina)", kal:145, pro:8, karb:18, yag:5, lif:6, sod:520, por:300, kat:"Zuppe", ulke:"it", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"fagioli, crauti, patate, speck, aglio, olio, sale", katkiMaddeleri:[] },

// ── ES ──
{ ad:"Jamón Serrano ES", kal:248, pro:30, karb:0, yag:14, lif:0, sod:1680, por:30, kat:"Embutidos", ulke:"es", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"cerdo, sal marina", katkiMaddeleri:[] },
{ ad:"Judías Verdes ES", kal:31, pro:2, karb:7, yag:0.1, lif:2.5, sod:6, por:100, kat:"Verduras", ulke:"es", tokPuan:30, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"judías verdes", katkiMaddeleri:[] },

// ── EL ──
{ ad:"Γαρίδες Γιουβέτσι", adLatin:"Garides Giouvetsi", kal:248, pro:16, karb:30, yag:7, lif:2, sod:580, por:250, kat:"Thalassina", ulke:"el", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"garides, kritharaki, tomates, feta, elaiolado, basilikas", katkiMaddeleri:[] },

// ── EN ──
{ ad:"Jacket Potato EN", kal:93, pro:2.5, karb:21, yag:0.1, lif:2.2, sod:6, por:200, kat:"Dish", ulke:"en", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"potato, butter, sour cream, chives", katkiMaddeleri:[] },
{ ad:"Jam Roly-Poly EN", kal:335, pro:5, karb:52, yag:13, lif:1.5, sod:285, por:150, kat:"Dessert", ulke:"en", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"suet pastry, jam, sugar, flour", katkiMaddeleri:[] },

// ── DA ──
{ ad:"Julefrokost Pålæg DA", kal:285, pro:14, karb:4, yag:24, lif:0.5, sod:980, por:100, kat:"Julemad", ulke:"da", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"leverpostej, sildesalat, røget laks, E250", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"Konserveringsmiddel."}] },
{ ad:"Jordbærsyltetøj DA", kal:250, pro:0.4, karb:63, yag:0, lif:1, sod:8, por:20, kat:"Syltetoj", ulke:"da", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"jordbær, sukker, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektin",tehlikeli:false,aciklama:"Geliermiddel."},{kod:"E330",ad:"Citronsyre",tehlikeli:false,aciklama:"Surhetsregulator."}] },

// ── NO ──
{ ad:"Julenisse Karamell NO", kal:398, pro:2, karb:78, yag:10, lif:0, sod:185, por:30, kat:"Julemat", ulke:"no", tokPuan:10, aclikSuresi:"1 saatten az", onay:true, yildiz:1.5, icerik:"sukker, glukosesirup, smør, fløte, salt", katkiMaddeleri:[] },
{ ad:"Jordbær NO", kal:32, pro:0.7, karb:7.7, yag:0.3, lif:2, sod:1, por:100, kat:"Frukt", ulke:"no", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"jordbær", katkiMaddeleri:[] },

// ── SV ──
{ ad:"Janssons Frestelse SV", kal:245, pro:7, karb:22, yag:15, lif:2.5, sod:480, por:200, kat:"Gratang", ulke:"sv", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"ansjovis, potatis, lök, grädde, smör", katkiMaddeleri:[] },
{ ad:"Jordgubbar SV", kal:32, pro:0.7, karb:7.7, yag:0.3, lif:2, sod:1, por:100, kat:"Bär", ulke:"sv", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"jordgubbar", katkiMaddeleri:[] },

// ── FI ──
{ ad:"Joulu Kinkku FI", kal:215, pro:26, karb:2, yag:12, lif:0, sod:1150, por:150, kat:"Jouluruoat", ulke:"fi", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"joulusika, suola, E250, E451, sinappi", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitriitti",tehlikeli:true,aciklama:"Suurina annoksina karsinogeeninen."},{kod:"E451",ad:"Trifosfaatit",tehlikeli:false,aciklama:"Kosteudensäilyttäjä."}] },
{ ad:"Juusto FI (Edam)", kal:357, pro:25, karb:1.4, yag:28, lif:0, sod:820, por:30, kat:"Juustot", ulke:"fi", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"maito, suola, juoksute, E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Väriaine."}] },

// ── NL ──
{ ad:"Jeneverbes Gin NL", kal:222, pro:0, karb:0, yag:0, lif:0, sod:0, por:40, kat:"Dranken", ulke:"nl", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"alcohol, jeneverbessenextract", katkiMaddeleri:[] },
{ ad:"Jachtschotel NL", kal:265, pro:16, karb:22, yag:13, lif:3.5, sod:520, por:300, kat:"Maaltijden", ulke:"nl", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"varkensvlees, aardappelen, appel, ui, laurierblad, zout", katkiMaddeleri:[] },

// ── BE ──
{ ad:"Jenever BE", kal:222, pro:0, karb:0, yag:0, lif:0, sod:0, por:40, kat:"Dranken", ulke:"be", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"alcohol, graan, jeneverbes", katkiMaddeleri:[] },
{ ad:"Jonge Kaas BE", kal:335, pro:22, karb:2, yag:28, lif:0, sod:640, por:30, kat:"Zuivel", ulke:"be", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"volle melk, zout, stremsel", katkiMaddeleri:[] },

// ── AT ──
{ ad:"Jagdwurst AT", kal:298, pro:14, karb:3, yag:26, lif:0, sod:980, por:50, kat:"Wurst", ulke:"at", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"Schweinefleisch, Rindfleisch, Salz, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."},{kod:"E451",ad:"Triphosphate",tehlikeli:false,aciklama:"Feuchthaltemittel."}] },

// ── PL ──
{ ad:"Jagody PL (Borówki)", adLatin:"Jagody PL", kal:57, pro:0.7, karb:14, yag:0.3, lif:2.4, sod:1, por:100, kat:"Owoce", ulke:"pl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"borówki", katkiMaddeleri:[] },
{ ad:"Jajka na Miękko PL", adLatin:"Jajka na Miekko PL", kal:155, pro:13, karb:1.1, yag:11, lif:0, sod:124, por:100, kat:"Jajka", ulke:"pl", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"jajko", katkiMaddeleri:[] },

// ── CS ──
{ ad:"Jelení Guláš CS", adLatin:"Jeleni Gulas CS", kal:195, pro:22, karb:6, yag:9, lif:1.5, sod:480, por:250, kat:"Hlavni Jidla", ulke:"cs", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"jelení maso, cibule, paprika, česnek, červené víno, sůl", katkiMaddeleri:[] },
{ ad:"Jahody CS", adLatin:"Jahody CS", kal:32, pro:0.7, karb:7.7, yag:0.3, lif:2, sod:1, por:100, kat:"Ovoce", ulke:"cs", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"jahody", katkiMaddeleri:[] },

// ── HU ──
{ ad:"Juhtúrós Galuska HU", adLatin:"Juhturas Galuska HU", kal:285, pro:14, karb:32, yag:12, lif:1.5, sod:480, por:200, kat:"Fogások", ulke:"hu", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"juhtúró, tojás, tejföl, liszt, hagyma, zsíros szalonna", katkiMaddeleri:[] },
{ ad:"Juharszirup HU (Juharszörp)", adLatin:"Juharszirup HU", kal:260, pro:0, karb:67, yag:0, lif:0, sod:9, por:20, kat:"Édesítők", ulke:"hu", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"juharszirup", katkiMaddeleri:[] },

// ── RO ──
{ ad:"Jumări RO", adLatin:"Jumari RO", kal:685, pro:25, karb:0, yag:66, lif:0, sod:980, por:30, kat:"Produse Porc", ulke:"ro", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"grăsime de porc, sare", katkiMaddeleri:[] },
{ ad:"Jeleu de Caise RO", adLatin:"Jeleu de Caise RO", kal:248, pro:0.4, karb:62, yag:0, lif:0.8, sod:6, por:20, kat:"Dulciuri", ulke:"ro", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"caise, zahar, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pectine",tehlikeli:false,aciklama:"Agent de gelificare."},{kod:"E330",ad:"Acid citric",tehlikeli:false,aciklama:"Regulator de aciditate."}] },

// ── HR ──
{ ad:"Juha od Povrća HR", adLatin:"Juha od Povrca HR", kal:45, pro:2, karb:7, yag:1, lif:2.5, sod:380, por:300, kat:"Jela", ulke:"hr", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"miješano povrće, voda, sol, peršin", katkiMaddeleri:[] },
{ ad:"Janjetina na Ražnju HR", adLatin:"Janjetina na Raznju HR", kal:245, pro:24, karb:0, yag:16, lif:0, sod:65, por:150, kat:"Meso", ulke:"hr", tokPuan:72, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"janjetina, sol, ružmarin, maslinovo ulje", katkiMaddeleri:[] },

// ── PT ──
{ ad:"Jerimum PT (Abóbora)", kal:26, pro:1, karb:6.5, yag:0.1, lif:0.5, sod:1, por:100, kat:"Legumes", ulke:"pt", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"abóbora", katkiMaddeleri:[] },
{ ad:"Jardineira PT", kal:88, pro:3.5, karb:12, yag:3, lif:4, sod:280, por:200, kat:"Legumes", ulke:"pt", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"ervilhas, cenoura, feijão verde, batata, azeite, sal", katkiMaddeleri:[] },

// ── LV ──
{ ad:"Jāņu Siers LV", adLatin:"Janu Siers LV", kal:285, pro:18, karb:4, yag:22, lif:0, sod:680, por:30, kat:"Sieri", ulke:"lv", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"biezpiens, olas, sviests, ķimenes, sāls", katkiMaddeleri:[] },
{ ad:"Jāņogas LV (Upenes)", adLatin:"Janogas LV", kal:63, pro:1, karb:15, yag:0.4, lif:3.5, sod:1, por:100, kat:"Ogas", ulke:"lv", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"jāņogas", katkiMaddeleri:[] },

// ── ET ──
{ ad:"Jõhvikas ET (Jõhvikamoos)", adLatin:"Johvikas ET", kal:46, pro:0.4, karb:12, yag:0.1, lif:3.6, sod:2, por:100, kat:"Marjad", ulke:"et", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"jõhvikad", katkiMaddeleri:[] },
{ ad:"Juust ET (Kodune)", adLatin:"Juust ET Kodune", kal:285, pro:18, karb:2, yag:22, lif:0, sod:680, por:30, kat:"Piimatooted", ulke:"et", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"piim, kodune kultuur, sool", katkiMaddeleri:[] },

// ── LT ──
{ ad:"Juodoji Duona LT", adLatin:"Juodoji Duona LT", kal:215, pro:7.5, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Duona", ulke:"lt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ruginiai miltai, raugintas tešlos, vanduo, druska", katkiMaddeleri:[] },
{ ad:"Juodieji Serbentai LT", adLatin:"Juodieji Serbentai LT", kal:63, pro:1.4, karb:15, yag:0.4, lif:4.3, sod:1, por:100, kat:"Uogos", ulke:"lt", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"juodieji serbentai", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// K HARFİ
// ══════════════════════════════════════════════════════

// ── PAYLAŞILAN ──
{ ad:"Kale (Karalahana)", adler:{tr:"Karalahana",de:"Grünkohl",el:"Λάχανο Κατσαρό",hu:"Fodros Kel",pl:"Jarmuż",cs:"Kadeřávek",ro:"Kale",hr:"Kelj",fr:"Chou Kale",es:"Col Rizada",it:"Cavolo Nero",pt:"Couve Galega",no:"Grønnkål",sv:"Grönkål",da:"Grønkål",fi:"Lehtikaali",nl:"Boerenkool",lv:"Kāposts",et:"Lehtkapsas",lt:"Garbanotieji Kopūstai"}, kal:49, pro:4.3, karb:9, yag:0.9, lif:4.2, sod:43, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"kale", katkiMaddeleri:[] },
{ ad:"Kiwi", adler:{tr:"Kivi",de:"Kiwi",el:"Ακτινίδιο",hu:"Kivi",pl:"Kiwi",cs:"Kiwi",ro:"Kiwi",hr:"Kivi",fr:"Kiwi",es:"Kiwi",it:"Kiwi",pt:"Kiwi",no:"Kiwi",sv:"Kiwi",da:"Kiwi",fi:"Kiivi",nl:"Kiwi",lv:"Kivi",et:"Kiivi",lt:"Kivis"}, kal:61, pro:1.1, karb:15, yag:0.5, lif:3, sod:3, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"kiwi fruit", katkiMaddeleri:[] },
{ ad:"Kimchi", adler:{tr:"Kimchi",de:"Kimchi",el:"Κίμτσι",hu:"Kimchi",pl:"Kimchi",cs:"Kimchi",ro:"Kimchi",hr:"Kimchi",fr:"Kimchi",es:"Kimchi",it:"Kimchi",pt:"Kimchi",no:"Kimchi",sv:"Kimchi",da:"Kimchi",fi:"Kimchi",nl:"Kimchi",lv:"Kimči",et:"Kimchi",lt:"Kimchi"}, kal:15, pro:1.1, karb:2.4, yag:0.5, lif:1.6, sod:498, por:100, kat:"Fermented", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"napa cabbage, gochugaru, garlic, ginger, salt", katkiMaddeleri:[] },

// ── TR ──
{ ad:"Kuru Fasulye", kal:135, pro:9, karb:22, yag:0.5, lif:7, sod:5, por:100, kat:"Baklagil", ulke:"tr", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"beyaz fasulye, domates, soğan, tereyağı, tuz", katkiMaddeleri:[] },
{ ad:"Karnıyarık", kal:225, pro:14, karb:12, yag:15, lif:4, sod:420, por:250, kat:"Et", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"patlıcan, kıyma, soğan, domates, biber, zeytinyağı", katkiMaddeleri:[] },
{ ad:"Kabak Dolması", kal:165, pro:9, karb:16, yag:8, lif:2.5, sod:380, por:200, kat:"Et", ulke:"tr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"kabak, kıyma, pirinç, soğan, domates, baharat", katkiMaddeleri:[] },
{ ad:"Kadayıf (Fırında)", kal:385, pro:6, karb:58, yag:16, lif:1.5, sod:95, por:100, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"tel kadayıf, tereyağı, şeker şerbeti, kaymak", katkiMaddeleri:[] },
{ ad:"Karides Güveç", kal:185, pro:18, karb:6, yag:10, lif:1.5, sod:480, por:200, kat:"Deniz Ürünü", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"karides, domates, biber, soğan, tereyağı, tuz", katkiMaddeleri:[] },
{ ad:"Kaymaklı Dondurma", kal:215, pro:4, karb:26, yag:11, lif:0, sod:75, por:100, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"süt, kaymak, şeker, salep, E471, E410", katkiMaddeleri:[{kod:"E471",ad:"Mono ve digliseritler",tehlikeli:false,aciklama:"Emülgatör."},{kod:"E410",ad:"Keçiboynuzu zamkı",tehlikeli:false,aciklama:"Kıvam arttırıcı."}] },
{ ad:"Kavurma (Kuzu)", kal:295, pro:22, karb:2, yag:22, lif:0, sod:380, por:150, kat:"Et", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"kuzu eti, kuyruk yağı, tuz, baharat", katkiMaddeleri:[] },
{ ad:"Kaşar Peyniri", kal:380, pro:25, karb:1.5, yag:31, lif:0, sod:780, por:30, kat:"Süt Ürünleri", ulke:"tr", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"inek sütü, tuz, maya", katkiMaddeleri:[] },
{ ad:"Kızartma (Patlıcan)", kal:165, pro:1.5, karb:8, yag:14, lif:3.5, sod:180, por:150, kat:"Sebze Yemekleri", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"patlıcan, sıvı yağ, tuz", katkiMaddeleri:[] },
{ ad:"Kazandibi", kal:185, pro:5.5, karb:28, yag:6.5, lif:0, sod:58, por:150, kat:"Tatlı", ulke:"tr", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"süt, şeker, nişasta, un, tavuk göğsü, tereyağı", katkiMaddeleri:[] },

// ── DE ──
{ ad:"Kartoffelsuppe DE", kal:115, pro:3.5, karb:18, yag:4, lif:2.5, sod:480, por:300, kat:"Suppe", ulke:"de", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"Kartoffeln, Möhren, Sellerie, Zwiebeln, Brühe, Sahne, Salz", katkiMaddeleri:[] },
{ ad:"Kohlrouladen DE", kal:195, pro:14, karb:10, yag:11, lif:3, sod:480, por:250, kat:"Fleisch", ulke:"de", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"Weißkohl, Hackfleisch, Reis, Zwiebeln, Tomatenmark, Salz", katkiMaddeleri:[] },
{ ad:"Kassler DE", kal:198, pro:24, karb:1.5, yag:11, lif:0, sod:980, por:100, kat:"Fleisch", ulke:"de", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"Schweinefleisch, Salz, E250, E252", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."},{kod:"E252",ad:"Kaliumnitrat",tehlikeli:true,aciklama:"In hohen Mengen schädlich."}] },
{ ad:"Kirschkuchen DE", kal:285, pro:5.5, karb:42, yag:12, lif:2, sod:185, por:100, kat:"Kuchen", ulke:"de", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"Kirschen, Weizenmehl, Butter, Zucker, Eier", katkiMaddeleri:[] },
{ ad:"Käsespätzle DE", kal:348, pro:15, karb:42, yag:14, lif:2, sod:580, por:200, kat:"Mehlspeisen", ulke:"de", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"Spätzle, Emmentaler, Bergkäse, Zwiebeln, Butter, Salz", katkiMaddeleri:[] },

// ── FR ──
{ ad:"Kouign-Amann FR", kal:398, pro:5.5, karb:52, yag:20, lif:1.5, sod:380, por:80, kat:"Viennoiserie", ulke:"fr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"farine, beurre, sucre, sel, levure", katkiMaddeleri:[] },
{ ad:"Kir Royal FR", kal:88, pro:0.3, karb:5.5, yag:0, lif:0, sod:10, por:150, kat:"Boissons", ulke:"fr", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"champagne, crème de cassis", katkiMaddeleri:[] },

// ── IT ──
{ ad:"Karpadžo IT (Carpaccio)", kal:165, pro:20, karb:0.5, yag:9, lif:0, sod:380, por:100, kat:"Antipasto", ulke:"it", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"manzo crudo, olio, limone, capperi, rucola, parmigiano", katkiMaddeleri:[] },
{ ad:"Krema di Funghi IT", kal:88, pro:3.5, karb:8, yag:5, lif:2.5, sod:480, por:300, kat:"Zuppe", ulke:"it", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"funghi misti, crema, cipolla, aglio, timo, olio, sale", katkiMaddeleri:[] },

// ── ES ──
{ ad:"Kokotxas ES (Bacalao)", kal:145, pro:20, karb:2, yag:7, lif:0.5, sod:380, por:150, kat:"Pescado", ulke:"es", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"kokotxas de bacalao, aceite de oliva, ajo, guindilla", katkiMaddeleri:[] },
{ ad:"Kroketas Mixtas ES", kal:265, pro:10, karb:24, yag:15, lif:1, sod:680, por:100, kat:"Tapas", ulke:"es", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"harina, leche, bacalao, jamón, pan rallado, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono y diglicéridos",tehlikeli:false,aciklama:"Emulsionante."}] },

// ── EL ──
{ ad:"Κεφτέδες Αρνίσιοι", adLatin:"Keftedes Arnivioi", kal:248, pro:20, karb:8, yag:16, lif:1, sod:420, por:150, kat:"Kreas", ulke:"el", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kima arnisiou, kremidi, skordho, diosmos, aarnioi, elaiolado", katkiMaddeleri:[] },
{ ad:"Κολοκύθα Σούπα", adLatin:"Kolokitha Soupa", kal:72, pro:1.5, karb:10, yag:3, lif:2, sod:380, por:300, kat:"Soupa", ulke:"el", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"kolokitha, kremidi, skordho, elaiolado, gala", katkiMaddeleri:[] },
{ ad:"Κρήτης Χαλβάδες", adLatin:"Kritis Chalvades", kal:488, pro:12, karb:52, yag:28, lif:3.5, sod:85, por:50, kat:"Glika", ulke:"el", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"tahini, zachari, amygdala, sesami", katkiMaddeleri:[] },

// ── EN ──
{ ad:"Kedgeree EN", kal:245, pro:18, karb:28, yag:7, lif:2, sod:380, por:250, kat:"Breakfast", ulke:"en", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"smoked haddock, rice, eggs, curry powder, butter, parsley", katkiMaddeleri:[] },
{ ad:"Kippers EN", kal:205, pro:25, karb:0, yag:12, lif:0, sod:1200, por:100, kat:"Fish", ulke:"en", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"herring, salt, smoke", katkiMaddeleri:[] },

// ── DA ──
{ ad:"Koldskål DA", kal:88, pro:5.5, karb:10, yag:3, lif:0, sod:55, por:200, kat:"Dessert", ulke:"da", tokPuan:35, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"kærnemælk, æg, sukker, citronsaft, vanille", katkiMaddeleri:[] },
{ ad:"Kartofler DA (Nye)", kal:70, pro:1.7, karb:16, yag:0.1, lif:1.5, sod:5, por:150, kat:"Grøntsager", ulke:"da", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"nye kartofler", katkiMaddeleri:[] },
{ ad:"Kryddersnaps DA", kal:230, pro:0, karb:0, yag:0, lif:0, sod:0, por:40, kat:"Drikkevarer", ulke:"da", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:1.5, icerik:"alkohol, krydderurter", katkiMaddeleri:[] },

// ── NO ──
{ ad:"Kjøttkaker NO", kal:225, pro:16, karb:8, yag:15, lif:0.8, sod:480, por:150, kat:"Kjøtt", ulke:"no", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"kjøttdeig, løk, mel, egg, salt, pepper, muskat", katkiMaddeleri:[] },
{ ad:"Krumkake NO", kal:385, pro:6, karb:52, yag:18, lif:1.5, sod:185, por:30, kat:"Kaker", ulke:"no", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"mel, smør, sukker, egg, kardemomme", katkiMaddeleri:[] },
{ ad:"Kumle NO (Raspeball)", kal:145, pro:3.5, karb:28, yag:3, lif:2.5, sod:380, por:200, kat:"Tradisjonsmat", ulke:"no", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"rå poteter, kokte poteter, salt, hvetemel", katkiMaddeleri:[] },

// ── SV ──
{ ad:"Köttbullar SV", kal:235, pro:16, karb:8, yag:16, lif:0.8, sod:480, por:150, kat:"Kött", ulke:"sv", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"nöt- och fläskfärs, lök, ägg, mjölk, ströbröd, salt, peppar", katkiMaddeleri:[] },
{ ad:"Knäckebröd SV", kal:345, pro:10, karb:68, yag:3.5, lif:12, sod:380, por:30, kat:"Brod", ulke:"sv", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"rågmjöl, vatten, salt, jäst", katkiMaddeleri:[] },
{ ad:"Kroppkaka SV", kal:248, pro:8, karb:32, yag:11, lif:2.5, sod:380, por:200, kat:"Tradisjonsmat", ulke:"sv", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"potatis, mjöl, bacon eller fläsk, lök, smör, salt", katkiMaddeleri:[] },

// ── FI ──
{ ad:"Karjalanpiirakka FI", kal:175, pro:5, karb:28, yag:5.5, lif:2.5, sod:380, por:100, kat:"Leivonnaiset", ulke:"fi", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"ruisjauho, riisipuuro, voi, suola", katkiMaddeleri:[] },
{ ad:"Kalakeitto FI", kal:98, pro:9, karb:8, yag:4, lif:1.5, sod:480, por:300, kat:"Keitot", ulke:"fi", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"lohi tai hauki, peruna, sipuli, kerma, tilli, suola", katkiMaddeleri:[] },
{ ad:"Korvapuusti FI", kal:368, pro:7, karb:52, yag:16, lif:2.5, sod:280, por:80, kat:"Leivonnaiset", ulke:"fi", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"vehnäjauho, voi, sokeri, maito, kaneli, kardemumma, hiiva", katkiMaddeleri:[] },

// ── NL ──
{ ad:"Kroket NL", kal:265, pro:10, karb:24, yag:15, lif:1, sod:680, por:100, kat:"Snack", ulke:"nl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"rundvlees, bloem, boter, zout, paneermeel, E450", katkiMaddeleri:[{kod:"E450",ad:"Difosfaten",tehlikeli:false,aciklama:"Rijsmiddel."}] },
{ ad:"Kippenpoten NL", kal:215, pro:22, karb:2, yag:14, lif:0, sod:380, por:150, kat:"Gevogelte", ulke:"nl", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"kippenpoten, kruiden, knoflook, olijfolie, zout", katkiMaddeleri:[] },

// ── BE ──
{ ad:"Konijn met Pruimen BE", kal:248, pro:24, karb:12, yag:12, lif:2, sod:480, por:250, kat:"Vlees", ulke:"be", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"konijn, gedroogde pruimen, bier, tijm, laurier, boter", katkiMaddeleri:[] },
{ ad:"Kaaskroket BE", kal:278, pro:11, karb:22, yag:17, lif:0.8, sod:680, por:100, kat:"Snack", ulke:"be", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"kaas, bloem, boter, paneermeel, E450", katkiMaddeleri:[{kod:"E450",ad:"Difosfaten",tehlikeli:false,aciklama:"Rijsmiddel."}] },

// ── AT ──
{ ad:"Kaiserschmarrn AT", kal:348, pro:9, karb:48, yag:15, lif:1.5, sod:185, por:150, kat:"Mehlspeisen", ulke:"at", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"Weizenmehl, Eier, Milch, Butter, Zucker, Rosinen, Rum", katkiMaddeleri:[] },
{ ad:"Kärntner Kasnudeln AT", kal:285, pro:12, karb:36, yag:12, lif:2, sod:380, por:200, kat:"Mehlspeisen", ulke:"at", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"Nudelteig, Topfen, Minze, Majoran, Schnittlauch, Salz", katkiMaddeleri:[] },
{ ad:"Kürbiscremesuppe AT", kal:88, pro:2, karb:12, yag:4, lif:2.5, sod:480, por:300, kat:"Suppe", ulke:"at", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"Kürbis, Zwiebel, Knoblauch, Ingwer, Sahne, Salz", katkiMaddeleri:[] },

// ── PL ──
{ ad:"Kielbasa PL", adLatin:"Kielbasa PL", kal:348, pro:15, karb:2, yag:31, lif:0, sod:1050, por:100, kat:"Wedliny", ulke:"pl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"wieprzowina, sól, E250, E451, czosnek, majeranek", katkiMaddeleri:[{kod:"E250",ad:"Azotyn sodu",tehlikeli:true,aciklama:"W dużych ilościach może być rakotwórczy."},{kod:"E451",ad:"Trifosfaty",tehlikeli:false,aciklama:"Środek utrzymujący wilgotność."}] },
{ ad:"Krupnik PL", adLatin:"Krupnik PL", kal:88, pro:3.5, karb:14, yag:2.5, lif:2.5, sod:480, por:300, kat:"Zupy", ulke:"pl", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"kasze, warzywa, mięso, sól, liść laurowy", katkiMaddeleri:[] },
{ ad:"Kotlet Schabowy PL", adLatin:"Kotlet Schabowy PL", kal:298, pro:24, karb:10, yag:18, lif:1, sod:480, por:150, kat:"Mieso", ulke:"pl", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"schab, jajko, bułka tarta, mąka, sól, pieprz", katkiMaddeleri:[] },

// ── CS ──
{ ad:"Knedlík CS (Svíčková)", adLatin:"Knedlik CS", kal:195, pro:5.5, karb:38, yag:3, lif:2, sod:280, por:150, kat:"Prilohy", ulke:"cs", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"housky, mléko, vejce, mouka, sůl", katkiMaddeleri:[] },
{ ad:"Koprová Omáčka CS", adLatin:"Koprova Omacka CS", kal:88, pro:2.5, karb:8, yag:5.5, lif:0.5, sod:380, por:100, kat:"Omacky", ulke:"cs", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"kopr, smetana, mouka, vývar, sůl, cukr, ocet", katkiMaddeleri:[] },
{ ad:"Kyselý Zelí CS", adLatin:"Kysely Zeli CS", kal:19, pro:0.9, karb:4.3, yag:0.1, lif:2.5, sod:661, por:100, kat:"Kvašená Zelenina", ulke:"cs", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"zelí, sůl", katkiMaddeleri:[] },

// ── HU ──
{ ad:"Kürtőskalács HU", adLatin:"Kurtoskalacs HU", kal:385, pro:7, karb:62, yag:14, lif:2, sod:185, por:100, kat:"Sutemeny", ulke:"hu", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"liszt, tej, tojás, cukor, vaj, fahéj", katkiMaddeleri:[] },
{ ad:"Körözött HU", adLatin:"Korozott HU", kal:215, pro:12, karb:2.5, yag:18, lif:0.3, sod:680, por:100, kat:"Kenheto", ulke:"hu", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"juhtúró, tejföl, paprika, köménymag, vaj, só", katkiMaddeleri:[] },

// ── RO ──
{ ad:"Kaizer RO", adLatin:"Kaizer RO", kal:348, pro:20, karb:1.5, yag:30, lif:0, sod:1350, por:50, kat:"Mezeluri", ulke:"ro", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"piept de porc, sare, E250, E452", katkiMaddeleri:[{kod:"E250",ad:"Nitrit de sodiu",tehlikeli:true,aciklama:"In doze mari poate fi cancerigen."},{kod:"E452",ad:"Polifosfati",tehlikeli:false,aciklama:"Emulsificator."}] },
{ ad:"Kuptor RO (Fasole la Cuptor)", adLatin:"Kuptor RO", kal:145, pro:7.5, karb:22, yag:4.5, lif:7.5, sod:380, por:200, kat:"Mancare", ulke:"ro", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"fasole, ceapa, usturoi, rosii, ulei, cimbru, sare", katkiMaddeleri:[] },

// ── HR ──
{ ad:"Kulen HR (Slavonski)", adLatin:"Kulen HR", kal:398, pro:20, karb:2, yag:35, lif:0, sod:1580, por:50, kat:"Kobasice", ulke:"hr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"svinjska mišićna masa, crvena paprika, sol, E250", katkiMaddeleri:[{kod:"E250",ad:"Natrijev nitrit",tehlikeli:true,aciklama:"U visokim dozama može biti kancerogen."}] },
{ ad:"Kruh HR (Domaći)", adLatin:"Kruh HR Domaci", kal:225, pro:8, karb:43, yag:2.5, lif:5, sod:480, por:100, kat:"Kruh", ulke:"hr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"brašno, voda, kvasac, sol", katkiMaddeleri:[] },

// ── PT ──
{ ad:"Kale PT (Couve Tronchuda)", kal:49, pro:4.3, karb:9, yag:0.9, lif:4.2, sod:43, por:100, kat:"Legumes", ulke:"pt", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"couve tronchuda", katkiMaddeleri:[] },
{ ad:"Kiwi PT", kal:61, pro:1.1, karb:15, yag:0.5, lif:3, sod:3, por:100, kat:"Frutas", ulke:"pt", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"kiwi", katkiMaddeleri:[] },

// ── LV ──
{ ad:"Karbonāde LV", adLatin:"Karbonade LV", kal:245, pro:25, karb:0, yag:16, lif:0, sod:72, por:150, kat:"Gaļa", ulke:"lv", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"cūkgaļas karbonāde, sāls, pipari", katkiMaddeleri:[] },
{ ad:"Kāposta Zupa LV", adLatin:"Kaposta Zupa LV", kal:55, pro:2.5, karb:8, yag:1.5, lif:2.5, sod:480, por:300, kat:"Zupi", ulke:"lv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"kāposts, kartupeļi, burkāni, sīpoli, sviests, sāls", katkiMaddeleri:[] },
{ ad:"Kvass LV", adLatin:"Kvass LV", kal:28, pro:0.5, karb:6.5, yag:0, lif:0, sod:10, por:200, kat:"Dzērieni", ulke:"lv", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"rudzu maize, ūdens, cukurs, raugs", katkiMaddeleri:[] },

// ── ET ──
{ ad:"Kama ET", adLatin:"Kama ET", kal:358, pro:14, karb:62, yag:7, lif:8, sod:8, por:40, kat:"Traditsioonilised", ulke:"et", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"odrajahu, rukkijahu, hernestejahu, kaerajahu", katkiMaddeleri:[] },
{ ad:"Kohuke ET", adLatin:"Kohuke ET", kal:185, pro:8, karb:22, yag:8, lif:0.5, sod:65, por:50, kat:"Piimatooted", ulke:"et", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"kohupiim, šokolaad, suhkur, vanill", katkiMaddeleri:[] },
{ ad:"Kali ET (Tera)", adLatin:"Kali ET", kal:28, pro:0.5, karb:6.5, yag:0, lif:0, sod:10, por:200, kat:"Joogid", ulke:"et", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"leib, vesi, suhkur, pärm", katkiMaddeleri:[] },

// ── LT ──
{ ad:"Kibinai LT", adLatin:"Kibinai LT", kal:348, pro:12, karb:38, yag:18, lif:2, sod:480, por:150, kat:"Kepiniai", ulke:"lt", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"tešla, avienos mėsa, svogūnas, druska, pipirai", katkiMaddeleri:[] },
{ ad:"Koldūnai LT", adLatin:"Kolduunai LT2", kal:215, pro:10, karb:28, yag:8, lif:2, sod:420, por:150, kat:"Patiekalai", ulke:"lt", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"kviečių miltai, kiauliena, jautiena, svogūnas, druska, pipirai", katkiMaddeleri:[] },
{ ad:"Kvass LT", adLatin:"Kvass LT", kal:28, pro:0.5, karb:6.5, yag:0, lif:0, sod:10, por:200, kat:"Gėrimai", ulke:"lt", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"ruginė duona, vanduo, cukrus, mielės", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// L HARFİ
// ══════════════════════════════════════════════════════

// ── PAYLAŞILAN ──
{ ad:"Lemon (Limon)", adler:{tr:"Limon",de:"Zitrone",el:"Λεμόνι",hu:"Citrom",pl:"Cytryna",cs:"Citron",ro:"Lămâie",hr:"Limun",fr:"Citron",es:"Limón",it:"Limone",pt:"Limão",no:"Sitron",sv:"Citron",da:"Citron",fi:"Sitruuna",nl:"Citroen",lv:"Citrons",et:"Sidrun",lt:"Citrina"}, kal:29, pro:1.1, karb:9.3, yag:0.3, lif:2.8, sod:2, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"lemon", katkiMaddeleri:[] },
{ ad:"Lamb (Kuzu Eti)", adler:{tr:"Kuzu Eti",de:"Lammfleisch",el:"Αρνί",hu:"Bárányhús",pl:"Jagnięcina",cs:"Jehněčí",ro:"Miel",hr:"Janjetina",fr:"Agneau",es:"Cordero",it:"Agnello",pt:"Borrego",no:"Lammekjøtt",sv:"Lammkött",da:"Lammekød",fi:"Karitsa",nl:"Lamsvlees",lv:"Jēra Gaļa",et:"Talleliha",lt:"Avienos Mėsa"}, kal:258, pro:25, karb:0, yag:17, lif:0, sod:72, por:100, kat:"Meat", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"lamb", katkiMaddeleri:[] },
{ ad:"Leek (Pırasa)", adler:{tr:"Pırasa",de:"Lauch",el:"Πράσο",hu:"Póréhagyma",pl:"Por",cs:"Pórek",ro:"Praz",hr:"Poriluk",fr:"Poireau",es:"Puerro",it:"Porro",pt:"Alho-Francês",no:"Purre",sv:"Purjolök",da:"Porre",fi:"Purjosipuli",nl:"Prei",lv:"Loks",et:"Porrulauk",lt:"Poras"}, kal:61, pro:1.5, karb:14, yag:0.3, lif:1.8, sod:20, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"leek", katkiMaddeleri:[] },
{ ad:"Lentils (Mercimek)", adler:{tr:"Mercimek",de:"Linsen",el:"Φακές",hu:"Lencse",pl:"Soczewica",cs:"Čočka",ro:"Linte",hr:"Leća",fr:"Lentilles",es:"Lentejas",it:"Lenticchie",pt:"Lentilhas",no:"Linser",sv:"Linser",da:"Linser",fi:"Linssit",nl:"Linzen",lv:"Lēcas",et:"Läätsed",lt:"Lęšiai"}, kal:116, pro:9, karb:20, yag:0.4, lif:7.9, sod:2, por:100, kat:"Legume", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lentils", katkiMaddeleri:[] },
{ ad:"Lime", adler:{tr:"Limon (Lime)",de:"Limette",el:"Λάιμ",hu:"Lime",pl:"Limonka",cs:"Limetka",ro:"Lime",hr:"Limeta",fr:"Citron Vert",es:"Lima",it:"Lime",pt:"Lima",no:"Lime",sv:"Lime",da:"Lime",fi:"Lime",nl:"Limoen",lv:"Laims",et:"Laim",lt:"Laimas"}, kal:30, pro:0.7, karb:10, yag:0.2, lif:2.8, sod:2, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"lime", katkiMaddeleri:[] },

// ── TR ──
{ ad:"Lahmacun", kal:268, pro:14, karb:38, yag:8, lif:2.5, sod:480, por:150, kat:"Hamur İşleri", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"buğday unu, kıyma, soğan, domates, baharat, limon", katkiMaddeleri:[] },
{ ad:"Lüfer Tava", kal:195, pro:20, karb:5, yag:11, lif:0.5, sod:280, por:150, kat:"Balık", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lüfer, mısır unu, zeytinyağı, tuz", katkiMaddeleri:[] },
{ ad:"Lokma", kal:312, pro:4, karb:48, yag:13, lif:1, sod:185, por:80, kat:"Tatlı", ulke:"tr", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"un, maya, şeker şerbeti, sıvı yağ", katkiMaddeleri:[] },
{ ad:"Levrek Buğulama", kal:124, pro:19, karb:0, yag:5.2, lif:0, sod:87, por:200, kat:"Balık", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"levrek, zeytinyağı, limon, otlar, tuz", katkiMaddeleri:[] },
{ ad:"Lor Peyniri", kal:98, pro:11, karb:3.4, yag:4.3, lif:0, sod:364, por:100, kat:"Süt Ürünleri", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"yayık sütü, tuz", katkiMaddeleri:[] },
{ ad:"Lavaş", kal:252, pro:8, karb:50, yag:2, lif:2.5, sod:490, por:80, kat:"Ekmek", ulke:"tr", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"buğday unu, su, tuz", katkiMaddeleri:[] },
{ ad:"Limonlu Tart", kal:298, pro:5.5, karb:42, yag:13, lif:1.5, sod:185, por:100, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"un, tereyağı, şeker, yumurta, limon suyu, kabuk", katkiMaddeleri:[] },
{ ad:"Lahana Dolması", kal:175, pro:10, karb:16, yag:9, lif:3.5, sod:420, por:200, kat:"Et", ulke:"tr", tokPuan:60, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"lahana, kıyma, pirinç, soğan, baharat, domates", katkiMaddeleri:[] },

// ── DE ──
{ ad:"Leberkäse DE", kal:280, pro:13, karb:5, yag:24, lif:0, sod:980, por:100, kat:"Fleisch", ulke:"de", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"Schweinefleisch, Rindfleisch, Salz, E250, E451, Eischweiß", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."},{kod:"E451",ad:"Triphosphate",tehlikeli:false,aciklama:"Feuchthaltemittel."}] },
{ ad:"Linzer Torte DE", kal:395, pro:7, karb:48, yag:22, lif:3, sod:120, por:100, kat:"Torte", ulke:"de", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"Haselnüsse, Mehl, Butter, Zucker, Eier, Johannisbeergelee", katkiMaddeleri:[] },
{ ad:"Labskaus DE", kal:195, pro:12, karb:18, yag:9, lif:2, sod:680, por:250, kat:"Eintopf", ulke:"de", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"Pökelfleisch, Kartoffeln, Rote Bete, Zwiebeln, Rollmops, Ei", katkiMaddeleri:[] },

// ── FR ──
{ ad:"Lyonnaise Pommes de Terre FR", kal:175, pro:3, karb:24, yag:8, lif:2.5, sod:380, por:200, kat:"Accompagnement", ulke:"fr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"pommes de terre, oignons, huile, persil, sel", katkiMaddeleri:[] },
{ ad:"Lardons FR", kal:485, pro:20, karb:1, yag:44, lif:0, sod:1580, por:30, kat:"Charcuterie", ulke:"fr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"lard fumé, sel, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrite de sodium",tehlikeli:true,aciklama:"En grande quantité peut être cancérigène."}] },
{ ad:"Lapin à la Moutarde FR", kal:218, pro:24, karb:3, yag:13, lif:0.5, sod:480, por:250, kat:"Plat", ulke:"fr", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"lapin, moutarde, crème, vin blanc, échalotes, thym", katkiMaddeleri:[] },

// ── IT ──
{ ad:"Lasagne IT", kal:305, pro:14, karb:32, yag:14, lif:2.5, sod:580, por:250, kat:"Pasta", ulke:"it", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"sfoglie, ragù, béchamel, parmigiano, sale", katkiMaddeleri:[] },
{ ad:"Limoncello IT", kal:260, pro:0, karb:30, yag:0, lif:0, sod:0, por:50, kat:"Liquori", ulke:"it", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"alcool, limoni, zucchero, acqua", katkiMaddeleri:[] },
{ ad:"Lenticchie in Umido IT", kal:115, pro:9, karb:20, yag:2.5, lif:7.9, sod:380, por:200, kat:"Legumi", ulke:"it", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lenticchie, pomodori, carota, sedano, cipolla, olio, sale", katkiMaddeleri:[] },

// ── ES ──
{ ad:"Lentejas Estofadas ES", kal:115, pro:8.5, karb:20, yag:2, lif:7.5, sod:380, por:200, kat:"Legumbres", ulke:"es", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lentejas, chorizo, morcilla, verduras, aceite, sal", katkiMaddeleri:[] },
{ ad:"Lacón con Grelos ES", kal:215, pro:22, karb:5, yag:13, lif:2.5, sod:680, por:250, kat:"Plato", ulke:"es", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"lacón, grelos, patatas, cebolla, chorizo", katkiMaddeleri:[] },
{ ad:"Leche Frita ES", kal:248, pro:6, karb:38, yag:9, lif:0.5, sod:185, por:100, kat:"Postres", ulke:"es", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"leche, harina, azúcar, canela, limón, huevo, aceite", katkiMaddeleri:[] },

// ── EL ──
{ ad:"Λαδερά", adLatin:"Ladera", kal:125, pro:3, karb:14, yag:7, lif:4, sod:280, por:200, kat:"Lahanokefthes", ulke:"el", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"epoches lachanika, elaiolado, tomates, kremidi, skordho", katkiMaddeleri:[] },
{ ad:"Λουκάνικο Χωριάτικο", adLatin:"Loukaniko Choriatiko", kal:348, pro:18, karb:2, yag:30, lif:0, sod:1350, por:100, kat:"Kreas", ulke:"el", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"xoirini kreas, piperita, alati, portokali, fenikelo, E250", katkiMaddeleri:[{kod:"E250",ad:"Νιτρώδες νάτριο",tehlikeli:true,aciklama:"Σε μεγάλες δόσεις καρκινογόνο."}] },
{ ad:"Λουκουμάδες", adLatin:"Loukoumades", kal:335, pro:5.5, karb:48, yag:15, lif:1.5, sod:185, por:80, kat:"Glika", ulke:"el", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"aleuron, prozia, nero, alati, meli, kanela", katkiMaddeleri:[] },

// ── EN ──
{ ad:"Lancashire Hotpot EN", kal:245, pro:18, karb:20, yag:10, lif:3, sod:480, por:350, kat:"Dish", ulke:"en", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"lamb, potato, onion, carrot, stock, salt", katkiMaddeleri:[] },
{ ad:"Lardy Cake EN", kal:398, pro:6.5, karb:52, yag:20, lif:2, sod:185, por:80, kat:"Baked Goods", ulke:"en", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"lard, flour, yeast, sugar, dried fruit, salt", katkiMaddeleri:[] },

// ── DA ──
{ ad:"Lagkage DA", kal:295, pro:5.5, karb:46, yag:11, lif:1.5, sod:185, por:100, kat:"Kager", ulke:"da", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"hvedemel, æg, sukker, fløde, syltetøj, flødeskum", katkiMaddeleri:[] },
{ ad:"Leverpostej DA", kal:285, pro:11, karb:6, yag:25, lif:0.5, sod:920, por:30, kat:"Paalæg", ulke:"da", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"svinelever, svinefedt, løg, salt, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"Konserveringsmiddel."},{kod:"E451",ad:"Trifosfater",tehlikeli:false,aciklama:"Fugtbevarende."}] },
{ ad:"Lam DA (Stegt)", kal:258, pro:25, karb:0, yag:17, lif:0, sod:72, por:150, kat:"Kød", ulke:"da", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"lammekød, rosmarin, hvidløg, salt, peber", katkiMaddeleri:[] },

// ── NO ──
{ ad:"Lutefisk NO", kal:88, pro:18, karb:0.5, yag:1, lif:0, sod:65, por:200, kat:"Fisk", ulke:"no", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"tørrfisk, lut, salt, pepper", katkiMaddeleri:[] },
{ ad:"Lapskaus NO", kal:145, pro:10, karb:16, yag:5, lif:2.5, sod:520, por:300, kat:"Gryteretter", ulke:"no", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"kjøtt, rotgrønnsaker, poteter, vann, salt, pepper", katkiMaddeleri:[] },
{ ad:"Lefse NO", kal:285, pro:5.5, karb:52, yag:7, lif:2, sod:380, por:80, kat:"Brod", ulke:"no", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"poteter, mel, smør, salt", katkiMaddeleri:[] },

// ── SV ──
{ ad:"Lussekatt SV", kal:325, pro:7, karb:52, yag:11, lif:2, sod:280, por:80, kat:"Bageri", ulke:"sv", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"vetemjöl, smör, mjölk, ägg, saffran, russin, socker, jäst", katkiMaddeleri:[] },
{ ad:"Lax SV (Gravad)", kal:208, pro:20, karb:2, yag:13, lif:0, sod:680, por:100, kat:"Fisk", ulke:"sv", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lax, salt, socker, dill, vit peppar", katkiMaddeleri:[] },
{ ad:"Lingonsylt SV", marka:"Ikea", kal:212, pro:0.3, karb:55, yag:0, lif:1.5, sod:8, por:20, kat:"Sylt", ulke:"sv", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"lingon, socker, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektiner",tehlikeli:false,aciklama:"Geliermittel."},{kod:"E330",ad:"Citronsyra",tehlikeli:false,aciklama:"Surhetsreglering."}] },

// ── FI ──
{ ad:"Lihapullat FI", kal:235, pro:16, karb:8, yag:16, lif:0.8, sod:480, por:150, kat:"Liharuoat", ulke:"fi", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"naudanliha, sianliha, sipuli, kananmuna, maito, korppujauho, suola", katkiMaddeleri:[] },
{ ad:"Lipeäkala FI", kal:88, pro:18, karb:0.5, yag:1, lif:0, sod:65, por:200, kat:"Kala", ulke:"fi", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"turskanliha, lipeä, suola", katkiMaddeleri:[] },
{ ad:"Lanttulaatikko FI", kal:115, pro:2.5, karb:18, yag:4, lif:3, sod:280, por:200, kat:"Jouluruoat", ulke:"fi", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"lanttu, kerma, korppujauho, siirappi, voi, suola", katkiMaddeleri:[] },

// ── NL ──
{ ad:"Lamsrack NL", kal:258, pro:25, karb:0, yag:17, lif:0, sod:72, por:150, kat:"Vlees", ulke:"nl", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"lamskotelet, kruiden, knoflook, olijfolie, zout", katkiMaddeleri:[] },
{ ad:"Limburgse Rijstvlaai NL", kal:285, pro:6, karb:44, yag:10, lif:1.5, sod:185, por:100, kat:"Gebak", ulke:"nl", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"gistdeeg, rijstepap, melk, suiker, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono en diglyceriden",tehlikeli:false,aciklama:"Emulgator."}] },

// ── BE ──
{ ad:"Luikse Wafel BE", kal:395, pro:7, karb:58, yag:18, lif:2, sod:280, por:100, kat:"Wafels", ulke:"be", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"tarwebloem, gist, boter, parelsuiker, eieren, vanillesuiker", katkiMaddeleri:[] },
{ ad:"Lambic Bier BE", kal:38, pro:0.4, karb:3.5, yag:0, lif:0, sod:8, por:330, kat:"Bier", ulke:"be", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"water, gerst, tarwe, hop, wilde gisten", katkiMaddeleri:[] },

// ── AT ──
{ ad:"Linzer Torte AT", kal:395, pro:7, karb:48, yag:22, lif:3, sod:120, por:100, kat:"Torten", ulke:"at", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"Haselnüsse, Mehl, Butter, Zucker, Eier, Ribiselmarmelade", katkiMaddeleri:[] },
{ ad:"Lüngerl AT (Beuschel)", kal:175, pro:18, karb:8, yag:9, lif:0.5, sod:380, por:150, kat:"Innereien", ulke:"at", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"Kalbslunge, Kalbsherz, Sauerrahmsauce, Zitrone", katkiMaddeleri:[] },

// ── PL ──
{ ad:"Łazanki PL", adLatin:"Lazanki PL", kal:245, pro:9, karb:38, yag:8, lif:3, sod:380, por:200, kat:"Dania Glowne", ulke:"pl", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"makaron, kapusta kiszona, kiełbasa, cebula, sól", katkiMaddeleri:[] },
{ ad:"Leczo PL", adLatin:"Leczo PL", kal:88, pro:3, karb:12, yag:3.5, lif:3.5, sod:380, por:200, kat:"Warzywa", ulke:"pl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"papryka, cukinia, pomidory, cebula, kiełbasa, sól", katkiMaddeleri:[] },
{ ad:"Lody PL", adLatin:"Lody PL", kal:195, pro:3.5, karb:24, yag:10, lif:0, sod:75, por:100, kat:"Desery", ulke:"pl", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"mleko, śmietana, cukier, żółtka, wanilia, E471, E410", katkiMaddeleri:[{kod:"E471",ad:"Mono i diglicerydy",tehlikeli:false,aciklama:"Emulgator."},{kod:"E410",ad:"Maczka chleba świętojańskiego",tehlikeli:false,aciklama:"Środek zagęszczający."}] },

// ── CS ──
{ ad:"Lečo CS", adLatin:"Leco CS", kal:88, pro:3, karb:12, yag:3.5, lif:3.5, sod:380, por:200, kat:"Zelenina", ulke:"cs", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"paprika, rajčata, cibule, klobása, sůl", katkiMaddeleri:[] },
{ ad:"Lívanec CS", adLatin:"Livanec CS", kal:195, pro:6.5, karb:28, yag:8, lif:1.5, sod:185, por:100, kat:"Moukova Jidla", ulke:"cs", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"mouka, tvaroh, vejce, mleko, olej, sůl", katkiMaddeleri:[] },

// ── HU ──
{ ad:"Lángos HU", adLatin:"Langos HU", kal:348, pro:8, karb:52, yag:15, lif:2.5, sod:380, por:150, kat:"Utcai Ételek", ulke:"hu", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"liszt, tej, élesztő, só, fokhagymakrém, tejföl, sajt", katkiMaddeleri:[] },
{ ad:"Leves HU (Gulyásleves)", adLatin:"Leves HU Gulyasleves", kal:125, pro:10, karb:12, yag:5, lif:2, sod:480, por:300, kat:"Levesek", ulke:"hu", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"marhabus, burgonya, hagyma, paprika, köménymag, só", katkiMaddeleri:[] },
{ ad:"Lecsó HU", adLatin:"Lecso HU", kal:88, pro:3, karb:12, yag:3.5, lif:3.5, sod:380, por:200, kat:"Zöldségek", ulke:"hu", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"paprika, paradicsom, hagyma, kolbász, só", katkiMaddeleri:[] },

// ── RO ──
{ ad:"Limonată Românească RO", adLatin:"Limonata Romaneasca RO", kal:38, pro:0.1, karb:9.5, yag:0, lif:0, sod:3, por:330, kat:"Bauturi", ulke:"ro", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"lamaie, apa, zahar, E330", katkiMaddeleri:[{kod:"E330",ad:"Acid citric",tehlikeli:false,aciklama:"Regulator de aciditate."}] },
{ ad:"Lapte cu Miere RO", adLatin:"Lapte cu Miere RO", kal:95, pro:3.5, karb:14, yag:3.5, lif:0, sod:45, por:200, kat:"Bauturi", ulke:"ro", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"lapte, miere", katkiMaddeleri:[] },

// ── HR ──
{ ad:"Lička Janjetina HR", adLatin:"Licka Janjetina HR", kal:245, pro:24, karb:0, yag:16, lif:0, sod:65, por:150, kat:"Meso", ulke:"hr", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"janjetina, sol, ružmarin, maslinovo ulje", katkiMaddeleri:[] },
{ ad:"Lešnik HR", adLatin:"Lesnik HR", kal:628, pro:15, karb:17, yag:61, lif:9.7, sod:0, por:30, kat:"Orascasti Plodovi", ulke:"hr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lješnjak", katkiMaddeleri:[] },

// ── PT ──
{ ad:"Linguado PT", kal:82, pro:17, karb:0, yag:1.5, lif:0, sod:65, por:150, kat:"Peixe", ulke:"pt", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"linguado", katkiMaddeleri:[] },
{ ad:"Lampreia PT", kal:145, pro:16, karb:3, yag:8, lif:0, sod:380, por:150, kat:"Peixe", ulke:"pt", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"lampreia, vinho tinto, alho, louro, sal", katkiMaddeleri:[] },
{ ad:"Licor Beirão PT", kal:265, pro:0, karb:32, yag:0, lif:0, sod:0, por:40, kat:"Bebidas", ulke:"pt", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"alcool, ervas aromáticas, especiarias", katkiMaddeleri:[] },

// ── LV ──
{ ad:"Ļoti Gards Maizes Kvass LV", adLatin:"Maizes Kvass LV", kal:28, pro:0.5, karb:6.5, yag:0, lif:0, sod:10, por:200, kat:"Dzērieni", ulke:"lv", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"rudzu maize, ūdens, cukurs, raugs", katkiMaddeleri:[] },
{ ad:"Lasis LV (Kūpināts)", adLatin:"Lasis LV Kupinats", kal:208, pro:20, karb:0, yag:13, lif:0, sod:1200, por:80, kat:"Zivis", ulke:"lv", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"laša fileja, sāls, kūpinājums", katkiMaddeleri:[] },
{ ad:"Lietuvas Pelmeņi LV", adLatin:"Lietuvas Pelmeni LV", kal:215, pro:10, karb:28, yag:8, lif:2, sod:420, por:150, kat:"Ēdieni", ulke:"lv", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"kviešu milti, cūkgaļa, liellopa gaļa, sīpoli, sāls, pipari", katkiMaddeleri:[] },

// ── ET ──
{ ad:"Leivasupp ET", adLatin:"Leivasupp ET", kal:88, pro:2.5, karb:16, yag:2, lif:1.5, sod:280, por:250, kat:"Supid", ulke:"et", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"rukkileib, vesi, suhkur, sidrun, koor", katkiMaddeleri:[] },
{ ad:"Lõhemari ET", adLatin:"Lohemari ET", kal:265, pro:28, karb:3.9, yag:16, lif:0, sod:1500, por:30, kat:"Kala", ulke:"et", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"lõhemari, sool", katkiMaddeleri:[] },
{ ad:"Lihasupp ET", adLatin:"Lihasupp ET", kal:72, pro:6, karb:6, yag:2.5, lif:1.5, sod:480, por:300, kat:"Supid", ulke:"et", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"veiseliha, köögiviljad, sool, petersell", katkiMaddeleri:[] },

// ── LT ──
{ ad:"Lietiniai LT (Blyneliai)", adLatin:"Lietiniai LT", kal:185, pro:6.5, karb:26, yag:7.5, lif:1, sod:285, por:100, kat:"Pusryčiai", ulke:"lt", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"kviečių miltai, kiaušiniai, pienas, sviestas, druska", katkiMaddeleri:[] },
{ ad:"Lašiniai LT", adLatin:"Lasiniai LT", kal:685, pro:12, karb:0, yag:72, lif:0, sod:680, por:30, kat:"Riebalai", ulke:"lt", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"kiaulienos riebalai, druska", katkiMaddeleri:[] },
{ ad:"Lietuviška Duona LT", adLatin:"Lietuviska Duona LT", kal:215, pro:7.5, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Duona", ulke:"lt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ruginiai miltai, kvietiniai miltai, raugas, vanduo, druska", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// M HARFİ
// ══════════════════════════════════════════════════════

// ── PAYLAŞILAN ──
{ ad:"Mango", adler:{tr:"Mango",de:"Mango",el:"Μάνγκο",hu:"Mangó",pl:"Mango",cs:"Mango",ro:"Mango",hr:"Mango",fr:"Mangue",es:"Mango",it:"Mango",pt:"Manga",no:"Mango",sv:"Mango",da:"Mango",fi:"Mango",nl:"Mango",lv:"Mango",et:"Mango",lt:"Mangas"}, kal:60, pro:0.8, karb:15, yag:0.4, lif:1.6, sod:1, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"mango", katkiMaddeleri:[] },
{ ad:"Milk (Süt)", adler:{tr:"Süt",de:"Milch",el:"Γάλα",hu:"Tej",pl:"Mleko",cs:"Mléko",ro:"Lapte",hr:"Mlijeko",fr:"Lait",es:"Leche",it:"Latte",pt:"Leite",no:"Melk",sv:"Mjölk",da:"Mælk",fi:"Maito",nl:"Melk",lv:"Piens",et:"Piim",lt:"Pienas"}, kal:61, pro:3.2, karb:4.7, yag:3.3, lif:0, sod:43, por:200, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"whole milk", katkiMaddeleri:[] },
{ ad:"Mushroom (Mantar)", adler:{tr:"Mantar",de:"Champignon",el:"Μανιτάρι",hu:"Gomba",pl:"Pieczarka",cs:"Žampion",ro:"Ciupercă",hr:"Šampinjon",fr:"Champignon",es:"Champiñón",it:"Fungo",pt:"Cogumelo",no:"Sopp",sv:"Svamp",da:"Champignon",fi:"Herkkusieni",nl:"Champignon",lv:"Sēne",et:"Seeni",lt:"Grybas"}, kal:22, pro:3.1, karb:3.3, yag:0.3, lif:1, sod:5, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"mushrooms", katkiMaddeleri:[] },
{ ad:"Mustard (Hardal)", adler:{tr:"Hardal",de:"Senf",el:"Μουστάρδα",hu:"Mustár",pl:"Musztarda",cs:"Hořčice",ro:"Muștar",hr:"Senf",fr:"Moutarde",es:"Mostaza",it:"Senape",pt:"Mostarda",no:"Sennep",sv:"Senap",da:"Sennep",fi:"Sinappi",nl:"Mosterd",lv:"Sinepju",et:"Sinep",lt:"Garstyčios"}, kal:66, pro:4, karb:5.5, yag:3.5, lif:1.5, sod:1020, por:15, kat:"Condiment", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"mustard seeds, water, vinegar, salt", katkiMaddeleri:[] },
{ ad:"Mozzarella", adler:{tr:"Mozzarella",de:"Mozzarella",el:"Μοτσαρέλα",hu:"Mozzarella",pl:"Mozzarella",cs:"Mozzarella",ro:"Mozzarella",hr:"Mozzarella",fr:"Mozzarella",es:"Mozzarella",it:"Mozzarella",pt:"Mozzarella",no:"Mozzarella",sv:"Mozzarella",da:"Mozzarella",fi:"Mozzarella",nl:"Mozzarella",lv:"Mozzarella",et:"Mozzarella",lt:"Mozzarella"}, kal:280, pro:28, karb:2.2, yag:17, lif:0, sod:486, por:30, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"buffalo or cow milk, salt, rennet", katkiMaddeleri:[] },
{ ad:"Melon (Kavun/Karpuz)", adler:{tr:"Kavun",de:"Melone",el:"Πεπόνι",hu:"Dinnye",pl:"Melon",cs:"Meloun",ro:"Pepene Galben",hr:"Dinja",fr:"Melon",es:"Melón",it:"Melone",pt:"Melão",no:"Melon",sv:"Melon",da:"Melon",fi:"Meloni",nl:"Meloen",lv:"Melone",et:"Melon",lt:"Melionas"}, kal:34, pro:0.8, karb:8.2, yag:0.2, lif:0.9, sod:16, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"melon", katkiMaddeleri:[] },

// ── TR ──
{ ad:"Mantı", kal:298, pro:13, karb:38, yag:12, lif:2, sod:480, por:200, kat:"Hamur İşleri", ulke:"tr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"un, kıyma, soğan, yoğurt, sarımsaklı tereyağı, nane, tuz", katkiMaddeleri:[] },
{ ad:"Musakka", kal:245, pro:14, karb:15, yag:15, lif:3, sod:520, por:250, kat:"Et", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"patlıcan, kıyma, domates, soğan, tereyağı, un, süt", katkiMaddeleri:[] },
{ ad:"Menemen", kal:145, pro:8, karb:8, yag:10, lif:2, sod:380, por:200, kat:"Et", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"yumurta, domates, biber, soğan, zeytinyağı, tuz", katkiMaddeleri:[] },
{ ad:"Mercimek Köftesi", kal:155, pro:8, karb:26, yag:3.5, lif:6, sod:380, por:100, kat:"Meze", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"kırmızı mercimek, bulgur, soğan, biber salçası, baharat", katkiMaddeleri:[] },
{ ad:"Mısır Ekmeği", kal:218, pro:4.5, karb:44, yag:3.5, lif:2.5, sod:380, por:100, kat:"Ekmek", ulke:"tr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"mısır unu, yoğurt, yumurta, tuz", katkiMaddeleri:[] },
{ ad:"Meyve Suyu (Vişne)", kal:48, pro:0.4, karb:11, yag:0, lif:0.2, sod:5, por:200, kat:"İçecek", ulke:"tr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"vişne, şeker, E330, E202", katkiMaddeleri:[{kod:"E330",ad:"Sitrik asit",tehlikeli:false,aciklama:"Asitlik düzenleyici."},{kod:"E202",ad:"Potasyum sorbat",tehlikeli:false,aciklama:"Koruyucu."}] },
{ ad:"Mücver", kal:145, pro:5.5, karb:14, yag:8, lif:2, sod:280, por:100, kat:"Sebze Yemekleri", ulke:"tr", tokPuan:50, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"kabak, yumurta, un, beyaz peynir, dereotu, tuz", katkiMaddeleri:[] },
{ ad:"Midye Dolma", kal:145, pro:10, karb:18, yag:4.5, lif:1.5, sod:480, por:100, kat:"Deniz Ürünü", ulke:"tr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"midye, pirinç, soğan, fıstık, baharat, limon", katkiMaddeleri:[] },
{ ad:"Muhallebi", kal:155, pro:4.5, karb:26, yag:4, lif:0, sod:55, por:150, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"süt, nişasta, şeker, gülsuyu", katkiMaddeleri:[] },
{ ad:"Mısır (Koçan)", kal:86, pro:3.2, karb:19, yag:1.2, lif:2.7, sod:15, por:100, kat:"Sebze", ulke:"tr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mısır", katkiMaddeleri:[] },

// ── DE ──
{ ad:"Maultaschen DE", kal:268, pro:12, karb:32, yag:11, lif:2, sod:480, por:200, kat:"Mehlspeisen", ulke:"de", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"Nudelteig, Hackfleisch, Spinat, Zwiebeln, Eier, Salz", katkiMaddeleri:[] },
{ ad:"Münchner Weißwurst DE", kal:298, pro:13, karb:2, yag:27, lif:0, sod:920, por:100, kat:"Wurst", ulke:"de", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"Kalbfleisch, Schweinespeck, Petersilie, Salz, Zitronenschale", katkiMaddeleri:[] },
{ ad:"Milchreis DE", kal:115, pro:2.8, karb:22, yag:2.5, lif:0.3, sod:45, por:200, kat:"Dessert", ulke:"de", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"Reis, Milch, Zucker, Vanille, Zimt", katkiMaddeleri:[] },
{ ad:"Mettwurst DE", kal:385, pro:16, karb:2, yag:35, lif:0, sod:1150, por:30, kat:"Aufschnitt", ulke:"de", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"Schweinefleisch, Salz, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."},{kod:"E451",ad:"Triphosphate",tehlikeli:false,aciklama:"Feuchthaltemittel."}] },

// ── FR ──
{ ad:"Moules Marinières FR", kal:88, pro:12, karb:5, yag:3, lif:0.3, sod:380, por:300, kat:"Fruits de Mer", ulke:"fr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"moules, vin blanc, échalotes, persil, crème, sel", katkiMaddeleri:[] },
{ ad:"Millefeuille FR", kal:385, pro:6, karb:46, yag:21, lif:1, sod:185, por:100, kat:"Pâtisserie", ulke:"fr", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"pâte feuilletée, crème pâtissière, fondant", katkiMaddeleri:[] },
{ ad:"Magret de Canard FR", kal:245, pro:20, karb:0, yag:18, lif:0, sod:72, por:150, kat:"Viande", ulke:"fr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"magret de canard, sel, poivre", katkiMaddeleri:[] },
{ ad:"Munster Fromage FR", kal:335, pro:20, karb:0.5, yag:28, lif:0, sod:580, por:30, kat:"Fromages", ulke:"fr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"lait, sel, présure, cultures", katkiMaddeleri:[] },

// ── IT ──
{ ad:"Minestrone IT", kal:88, pro:3.5, karb:14, yag:2.5, lif:4, sod:480, por:300, kat:"Zuppe", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"verdure miste, fagioli, pasta, olio, sale, parmigiano", katkiMaddeleri:[] },
{ ad:"Mortadella IT", kal:311, pro:15, karb:1.5, yag:28, lif:0, sod:1050, por:50, kat:"Salumi", ulke:"it", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"maiale, grasso, sale, E250, E451, pistacchi", katkiMaddeleri:[{kod:"E250",ad:"Nitrito di sodio",tehlikeli:true,aciklama:"In alte dosi può essere cancerogeno."},{kod:"E451",ad:"Trifosfati",tehlikeli:false,aciklama:"Agente umettante."}] },
{ ad:"Melanzane alla Parmigiana IT", kal:185, pro:8, karb:12, yag:12, lif:4, sod:480, por:250, kat:"Contorni", ulke:"it", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"melanzane, pomodoro, mozzarella, parmigiano, basilico, olio", katkiMaddeleri:[] },

// ── ES ──
{ ad:"Morcilla de Burgos ES", kal:398, pro:14, karb:22, yag:32, lif:1.5, sod:1150, por:100, kat:"Embutidos", ulke:"es", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"sangre de cerdo, arroz, cebolla, manteca, especias, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito sódico",tehlikeli:true,aciklama:"En altas dosis puede ser cancerígeno."}] },
{ ad:"Merluza a la Vasca ES", kal:145, pro:22, karb:4, yag:5.5, lif:0.8, sod:380, por:200, kat:"Pescado", ulke:"es", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"merluza, almejas, espárragos, huevos duros, ajo, aceite, perejil", katkiMaddeleri:[] },
{ ad:"Manchego ES", kal:395, pro:27, karb:0.5, yag:32, lif:0, sod:650, por:30, kat:"Quesos", ulke:"es", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"leche cruda de oveja manchega, sal, cuajo", katkiMaddeleri:[] },

// ── EL ──
{ ad:"Μελιτζανοσαλάτα", adLatin:"Melitzanosalata", kal:88, pro:1.5, karb:8, yag:6, lif:3, sod:280, por:100, kat:"Mezedes", ulke:"el", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"melitzana psiti, elaiolado, skordho, lemoni, alati", katkiMaddeleri:[] },
{ ad:"Μαρίδα Τηγανητή", adLatin:"Marida Tiganiti", kal:195, pro:18, karb:6, yag:11, lif:0.5, sod:280, por:150, kat:"Psaria", ulke:"el", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"marida, aleuron, elaiolado, lemoni, alati", katkiMaddeleri:[] },
{ ad:"Μανιτάρια Σαγανάκι", adLatin:"Manitaria Saganaki", kal:145, pro:6, karb:8, yag:10, lif:2.5, sod:480, por:150, kat:"Mezedes", ulke:"el", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"manitaria, tyri, elaiolado, skordho, basiilikos", katkiMaddeleri:[] },

// ── EN ──
{ ad:"Mince Pie EN", kal:335, pro:3.5, karb:48, yag:15, lif:2, sod:185, por:60, kat:"Pastry", ulke:"en", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"shortcrust pastry, mincemeat, dried fruit, spices, E220", katkiMaddeleri:[{kod:"E220",ad:"Sulphur dioxide",tehlikeli:true,aciklama:"May cause allergic reactions."}] },
{ ad:"Mulled Wine EN", kal:165, pro:0.2, karb:18, yag:0, lif:0, sod:8, por:200, kat:"Drinks", ulke:"en", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"red wine, cinnamon, cloves, orange, sugar", katkiMaddeleri:[] },
{ ad:"Marmalade EN", kal:250, pro:0.4, karb:63, yag:0, lif:1, sod:8, por:20, kat:"Spreads", ulke:"en", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"oranges, sugar, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pectin",tehlikeli:false,aciklama:"Gelling agent."},{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."}] },

// ── DA ──
{ ad:"Medisterpølse DA", kal:298, pro:13, karb:4, yag:26, lif:0.5, sod:920, por:100, kat:"Polser", ulke:"da", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"svinekød, allehånde, løg, salt, E250", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"Konserveringsmiddel."}] },
{ ad:"Millionbøf DA", kal:185, pro:14, karb:12, yag:9, lif:2, sod:480, por:300, kat:"Kød", ulke:"da", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"hakket oksekød, løg, gulerødder, tomat, bouillon, salt", katkiMaddeleri:[] },
{ ad:"Majs DA (Frisk)", kal:86, pro:3.2, karb:19, yag:1.2, lif:2.7, sod:15, por:100, kat:"Grøntsager", ulke:"da", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"majs", katkiMaddeleri:[] },

// ── NO ──
{ ad:"Mølje NO", kal:88, pro:16, karb:0.5, yag:2.5, lif:0, sod:380, por:200, kat:"Fisk", ulke:"no", tokPuan:60, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"torsk, torskeleversaus, rogn, salt", katkiMaddeleri:[] },
{ ad:"Multebær NO", kal:51, pro:1.7, karb:11, yag:0.8, lif:4.7, sod:0, por:100, kat:"Baer", ulke:"no", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"molter", katkiMaddeleri:[] },
{ ad:"Moltekrem NO", kal:245, pro:2.5, karb:22, yag:17, lif:2, sod:25, por:100, kat:"Dessert", ulke:"no", tokPuan:30, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"molter, fløte, sukker", katkiMaddeleri:[] },

// ── SV ──
{ ad:"Midsommar Jordgubbar SV", kal:32, pro:0.7, karb:7.7, yag:0.3, lif:2, sod:1, por:100, kat:"Bar", ulke:"sv", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"jordgubbar", katkiMaddeleri:[] },
{ ad:"Mjuk Pepparkaka SV", kal:348, pro:5.5, karb:58, yag:12, lif:2.5, sod:380, por:60, kat:"Bageri", ulke:"sv", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"vetemjöl, smör, socker, ägg, ingefära, kanel, kryddnejlika, bakpulver", katkiMaddeleri:[] },
{ ad:"Messmör SV", kal:325, pro:8, karb:50, yag:12, lif:0, sod:640, por:20, kat:"Mejeri", ulke:"sv", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"messmör, mjölk, grädde, socker", katkiMaddeleri:[] },

// ── FI ──
{ ad:"Mustikkapiirakka FI", kal:295, pro:5.5, karb:46, yag:11, lif:3, sod:185, por:100, kat:"Leivonnaiset", ulke:"fi", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"mustikka, vehnäjauho, voi, sokeri, kananmuna, kerma", katkiMaddeleri:[] },
{ ad:"Makkara FI (Grilli)", kal:285, pro:12, karb:4, yag:25, lif:0, sod:920, por:100, kat:"Lihatuotteet", ulke:"fi", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"sianliha, naudanliha, suola, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitriitti",tehlikeli:true,aciklama:"Suurina annoksina karsinogeeninen."},{kod:"E451",ad:"Trifosfaatit",tehlikeli:false,aciklama:"Kosteudensäilyttäjä."}] },
{ ad:"Maitokahvi FI", kal:42, pro:1.5, karb:4.5, yag:2, lif:0, sod:22, por:200, kat:"Juomat", ulke:"fi", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"kahvi, maito", katkiMaddeleri:[] },

// ── NL ──
{ ad:"Mossel NL", kal:86, pro:12, karb:4, yag:2.2, lif:0, sod:280, por:200, kat:"Zeevruchten", ulke:"nl", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"mosselen, vin blanc, sjalot, peterselie, boter", katkiMaddeleri:[] },
{ ad:"Macaroni met Kaassaus NL", kal:285, pro:12, karb:38, yag:10, lif:2, sod:480, por:250, kat:"Pasta", ulke:"nl", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"macaroni, melk, bloem, kaas, boter, zout, nootmuskaat", katkiMaddeleri:[] },

// ── BE ──
{ ad:"Moules-Frites BE", kal:295, pro:16, karb:26, yag:14, lif:3.5, sod:580, por:400, kat:"Gerechten", ulke:"be", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"mosselen, frieten, witte wijn, sjalot, boter, peterselie", katkiMaddeleri:[] },
{ ad:"Macarons Belges BE", kal:398, pro:5, karb:58, yag:18, lif:2, sod:120, por:30, kat:"Snoep", ulke:"be", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"amandelen, suiker, eiwitten, boter, E102, E133", katkiMaddeleri:[{kod:"E102",ad:"Tartrazine",tehlikeli:true,aciklama:"Kan hyperactiviteit veroorzaken bij kinderen."},{kod:"E133",ad:"Briljantblauw",tehlikeli:true,aciklama:"Controversieel kleurmiddel."}] },

// ── AT ──
{ ad:"Marillenknödel AT", kal:298, pro:5.5, karb:48, yag:10, lif:2.5, sod:165, por:150, kat:"Mehlspeisen", ulke:"at", tokPuan:28, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Topfen, Mehl, Eier, Marillen, Semmelbrösel, Butter, Zucker", katkiMaddeleri:[] },
{ ad:"Mohnnudeln AT", kal:335, pro:9, karb:52, yag:12, lif:3, sod:185, por:150, kat:"Mehlspeisen", ulke:"at", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"Kartoffelnudeln, Mohn, Butter, Zucker", katkiMaddeleri:[] },

// ── PL ──
{ ad:"Mazurek PL", adLatin:"Mazurek PL", kal:385, pro:6, karb:56, yag:18, lif:2.5, sod:120, por:80, kat:"Ciasta Swiateczne", ulke:"pl", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"mąka, masło, jajka, cukier, migdały, owoce kandyzowane", katkiMaddeleri:[] },
{ ad:"Mizeria PL", adLatin:"Mizeria PL", kal:55, pro:1.5, karb:5.5, yag:3, lif:0.8, sod:280, por:150, kat:"Salatki", ulke:"pl", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"ogórek, śmietana, koperek, sól, cukier", katkiMaddeleri:[] },
{ ad:"Makowiec PL", adLatin:"Makowiec PL", kal:368, pro:8, karb:52, yag:16, lif:3, sod:185, por:80, kat:"Ciasta Swiateczne", ulke:"pl", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"mąka drożdżowa, mak, miód, orzechy, rodzynki, skórka pomarańczowa", katkiMaddeleri:[] },

// ── CS ──
{ ad:"Marlenka CS", adLatin:"Marlenka CS", marka:"Marlenka", kal:398, pro:6, karb:52, yag:20, lif:1.5, sod:185, por:80, kat:"Dezerty", ulke:"cs", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"mouka, med, vejce, máslo, vlasske orechy", katkiMaddeleri:[] },
{ ad:"Moravský Vrabec CS", adLatin:"Moravsky Vrabec CS", kal:395, pro:22, karb:0, yag:34, lif:0, sod:580, por:150, kat:"Maso", ulke:"cs", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"vepřový bok, sůl, kmín, česnek", katkiMaddeleri:[] },
{ ad:"Medovník CS", adLatin:"Medovnik CS", kal:385, pro:6, karb:58, yag:16, lif:1.5, sod:185, por:80, kat:"Dezerty", ulke:"cs", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"mouka, med, vajicka, maslo, kakao, smetana", katkiMaddeleri:[] },

// ── HU ──
{ ad:"Meggyves Rétes HU", adLatin:"Meggyves Retes HU", kal:295, pro:5.5, karb:48, yag:11, lif:2.5, sod:185, por:100, kat:"Sutemeny", ulke:"hu", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"rétestészta, meggy, cukor, vaj, zsemlemorzsa", katkiMaddeleri:[] },
{ ad:"Mézeskalács HU", adLatin:"Mezeskálacs HU", kal:385, pro:6, karb:72, yag:10, lif:1.5, sod:185, por:30, kat:"Sutemeny", ulke:"hu", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"liszt, méz, tojás, cukor, gyömbér, fahéj, szegfűszeg", katkiMaddeleri:[] },
{ ad:"Májas Hurka HU", adLatin:"Majas Hurka HU", kal:285, pro:12, karb:14, yag:22, lif:1, sod:880, por:100, kat:"Hentesáruk", ulke:"hu", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"sertésmáj, rizs, hagyma, zsír, só, bors, E250", katkiMaddeleri:[{kod:"E250",ad:"Nátrium-nitrit",tehlikeli:true,aciklama:"Nagyobb adagban karcinogén."}] },

// ── RO ──
{ ad:"Mici RO (Mititei)", adLatin:"Mici RO", kal:268, pro:20, karb:2, yag:20, lif:0.5, sod:480, por:100, kat:"Gratar", ulke:"ro", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"carne tocata de vita si porc, boia, cimbru, bicarbonat, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrit de sodiu",tehlikeli:true,aciklama:"In doze mari poate fi cancerigen."}] },
{ ad:"Mămăligă RO", adLatin:"Mamaliga RO", kal:95, pro:2.5, karb:20, yag:1, lif:1.5, sod:8, por:150, kat:"Mancare de Baza", ulke:"ro", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"malai, apa, sare, unt", katkiMaddeleri:[] },
{ ad:"Mucenici RO", adLatin:"Mucenici RO", kal:265, pro:6, karb:52, yag:4.5, lif:2, sod:185, por:150, kat:"Dulciuri", ulke:"ro", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"faina, apa, zahăr, nuci, scortisoara", katkiMaddeleri:[] },

// ── HR ──
{ ad:"Mlinci HR", adLatin:"Mlinci HR", kal:298, pro:8, karb:56, yag:5, lif:2.5, sod:480, por:100, kat:"Prilog", ulke:"hr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"brašno, voda, sol, mast od pečene purice", katkiMaddeleri:[] },
{ ad:"Makaruni HR", adLatin:"Makaruni HR", kal:335, pro:11, karb:65, yag:4, lif:3, sod:285, por:150, kat:"Tjestenina", ulke:"hr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"pšenično brašno, jaja, maslinovo ulje, sol", katkiMaddeleri:[] },

// ── PT ──
{ ad:"Migas PT", kal:298, pro:6.5, karb:48, yag:9, lif:3, sod:580, por:200, kat:"Prato", ulke:"pt", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"pão duro, azeite, alho, coentros, água, sal", katkiMaddeleri:[] },
{ ad:"Mexilhão PT", kal:86, pro:12, karb:4, yag:2.2, lif:0, sod:280, por:200, kat:"Mariscos", ulke:"pt", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"mexilhão, vinho branco, alho, salsa, manteiga", katkiMaddeleri:[] },
{ ad:"Manteigada PT", kal:365, pro:6, karb:52, yag:16, lif:1.5, sod:185, por:80, kat:"Doces", ulke:"pt", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"farinha, manteiga, ovos, açúcar, limão, fermento", katkiMaddeleri:[] },

// ── LV ──
{ ad:"Maize ar Ķiplokiem LV", adLatin:"Maize ar Kiplokiem LV", kal:295, pro:7, karb:42, yag:10, lif:2.5, sod:520, por:100, kat:"Maize", ulke:"lv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"maize, ķiploki, sviests, sāls", katkiMaddeleri:[] },
{ ad:"Mellenie LV (Melleni)", adLatin:"Mellenie LV", kal:57, pro:0.7, karb:14, yag:0.3, lif:2.4, sod:1, por:100, kat:"Ogas", ulke:"lv", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"mellenes", katkiMaddeleri:[] },
{ ad:"Makrele LV (Kūpināta)", adLatin:"Makrele LV Kupinata", kal:205, pro:19, karb:0, yag:14, lif:0, sod:680, por:100, kat:"Zivis", ulke:"lv", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"makrele, sāls, kūpinājums", katkiMaddeleri:[] },

// ── ET ──
{ ad:"Mulgipuder ET", adLatin:"Mulgipuder ET", kal:145, pro:4, karb:22, yag:5, lif:2.5, sod:280, por:200, kat:"Traditsioonilised", ulke:"et", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"potatoes, oder, sealiha, sool, piim", katkiMaddeleri:[] },
{ ad:"Mustikamoos ET", adLatin:"Mustikamoos ET", kal:57, pro:0.7, karb:14, yag:0.3, lif:2.4, sod:1, por:100, kat:"Marjad", ulke:"et", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"mustikad", katkiMaddeleri:[] },
{ ad:"Makrell ET (Grillitud)", adLatin:"Makrell ET Grillitud", kal:205, pro:19, karb:0, yag:14, lif:0, sod:90, por:150, kat:"Kala", ulke:"et", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"makrell", katkiMaddeleri:[] },

// ── LT ──
{ ad:"Marinuotos Grybų Salotos LT", adLatin:"Marinuotos Grybu Salotos LT", kal:45, pro:2.5, karb:5, yag:2, lif:2, sod:480, por:100, kat:"Salotos", ulke:"lt", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"marinuoti grybai, svogūnas, aliejus, actas, druska", katkiMaddeleri:[] },
{ ad:"Makaronai su Morka LT", adLatin:"Makaronai su Morka LT", kal:185, pro:5.5, karb:34, yag:3.5, lif:2.5, sod:280, por:200, kat:"Patiekalai", ulke:"lt", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"makaronai, morka, svogūnas, aliejus, druska, pipirai", katkiMaddeleri:[] },
{ ad:"Mėsos Kotletai LT", adLatin:"Mesos Kotletai LT", kal:235, pro:18, karb:8, yag:16, lif:0.8, sod:480, por:100, kat:"Patiekalai", ulke:"lt", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"mėsa, svogūnas, kiaušinis, miltai, druska, pipirai", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// N HARFİ
// ══════════════════════════════════════════════════════

// ── PAYLAŞILAN ──
{ ad:"Nuts Mixed (Karışık Kuruyemiş)", adler:{tr:"Karışık Kuruyemiş",de:"Gemischte Nüsse",el:"Ανάμεικτοι Ξηροί Καρποί",hu:"Vegyes Magvak",pl:"Orzechy Mieszane",cs:"Smíšené Ořechy",ro:"Nuci Asortate",hr:"Miješani Orašasti Plodovi",fr:"Noix Mélangées",es:"Frutos Secos Variados",it:"Frutta Secca Mista",pt:"Frutos Secos Mistos",no:"Blandede Nøtter",sv:"Blandade Nötter",da:"Blandede Nødder",fi:"Sekoitetut Pähkinät",nl:"Gemengde Noten",lv:"Jaukti Rieksti",et:"Segapähklid",lt:"Mišrūs Riešutai"}, kal:607, pro:18, karb:22, yag:54, lif:6, sod:4, por:30, kat:"Nuts", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"almonds, cashews, walnuts, hazelnuts, peanuts", katkiMaddeleri:[] },
{ ad:"Noodles (Erişte/Noodle)", adler:{tr:"Noodle",de:"Nudeln",el:"Νούντλς",hu:"Tészta",pl:"Kluski",cs:"Nudle",ro:"Tăiței",hr:"Rezanci",fr:"Nouilles",es:"Fideos",it:"Tagliolini",pt:"Macarrão",no:"Nudler",sv:"Nudlar",da:"Nudler",fi:"Nuudelit",nl:"Noedels",lv:"Nūdeles",et:"Nuudlid",lt:"Makaronai"}, kal:335, pro:11, karb:70, yag:1.5, lif:2, sod:5, por:100, kat:"Grain", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"wheat flour, water, salt", katkiMaddeleri:[] },
{ ad:"Nectarine (Nektarin)", adler:{tr:"Nektarin",de:"Nektarine",el:"Νεκταρίνι",hu:"Nektarin",pl:"Nektaryna",cs:"Nektarinka",ro:"Nectarină",hr:"Nektarina",fr:"Nectarine",es:"Nectarina",it:"Nettarina",pt:"Nectarina",no:"Nektarin",sv:"Nektarin",da:"Nektarin",fi:"Nektariini",nl:"Nectarine",lv:"Nektarīns",et:"Nektariin",lt:"Nektarinas"}, kal:44, pro:1.1, karb:10.6, yag:0.3, lif:1.7, sod:0, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"nectarine", katkiMaddeleri:[] },

// ── TR ──
{ ad:"Nohut", kal:164, pro:8.9, karb:27, yag:2.6, lif:7.6, sod:7, por:100, kat:"Baklagil", ulke:"tr", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"nohut", katkiMaddeleri:[] },
{ ad:"Nohut Çorbası", kal:98, pro:5.5, karb:15, yag:2.5, lif:5, sod:480, por:250, kat:"Çorba", ulke:"tr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"nohut, soğan, zeytinyağı, tuz, kırmızıbiber", katkiMaddeleri:[] },
{ ad:"Nar", kal:83, pro:1.7, karb:19, yag:1.2, lif:4, sod:3, por:100, kat:"Meyve", ulke:"tr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"nar", katkiMaddeleri:[] },
{ ad:"Nar Ekşisi", kal:285, pro:1, karb:72, yag:0.3, lif:0.5, sod:8, por:15, kat:"Sos", ulke:"tr", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"nar suyu", katkiMaddeleri:[] },

// ── DE ──
{ ad:"Nürnberger Bratwurst DE", kal:335, pro:16, karb:3, yag:29, lif:0, sod:980, por:100, kat:"Wurst", ulke:"de", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"Schweinefleisch, Majoran, Kümmel, Salz, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."},{kod:"E451",ad:"Triphosphate",tehlikeli:false,aciklama:"Feuchthaltemittel."}] },
{ ad:"Nuss-Nougat DE", kal:568, pro:8, karb:52, yag:38, lif:3.5, sod:45, por:30, kat:"Suessigkeiten", ulke:"de", tokPuan:30, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"Haselnüsse, Zucker, Kakaobutter, Milch, E322, E476", katkiMaddeleri:[{kod:"E322",ad:"Lecithine",tehlikeli:false,aciklama:"Emulgator."},{kod:"E476",ad:"Polyglycerol",tehlikeli:false,aciklama:"Emulgator."}] },
{ ad:"Nieheimer Sauermilchkäse DE", kal:88, pro:20, karb:0.5, yag:0.5, lif:0, sod:1280, por:30, kat:"Kaese", ulke:"de", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"Magermilch, Salz, Kümmel, Bier", katkiMaddeleri:[] },

// ── FR ──
{ ad:"Niçoise Salade FR", kal:195, pro:14, karb:8, yag:13, lif:3, sod:480, por:250, kat:"Salades", ulke:"fr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"thon, oeufs durs, olives, tomates, haricots verts, anchois", katkiMaddeleri:[] },
{ ad:"Normande Crêpe FR", kal:265, pro:7, karb:36, yag:12, lif:1.5, sod:380, por:150, kat:"Crêpes", ulke:"fr", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"farine de blé, oeufs, lait, beurre, sel, pommes, calvados", katkiMaddeleri:[] },
{ ad:"Nougat de Montélimar FR", kal:385, pro:5, karb:72, yag:12, lif:2, sod:45, por:30, kat:"Confiserie", ulke:"fr", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"amandes, pistaches, miel, blancs d'oeufs, sucre", katkiMaddeleri:[] },

// ── IT ──
{ ad:"Nduja IT", kal:448, pro:18, karb:2, yag:42, lif:0, sod:1680, por:30, kat:"Salumi", ulke:"it", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"carne di maiale, peperoncino, sale, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito di sodio",tehlikeli:true,aciklama:"In alte dosi può essere cancerogeno."}] },
{ ad:"Nocciole IT (Piemontesi)", kal:628, pro:15, karb:17, yag:61, lif:9.7, sod:0, por:30, kat:"Frutta Secca", ulke:"it", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"nocciole piemontesi", katkiMaddeleri:[] },
{ ad:"Nero di Seppia Pasta IT", kal:348, pro:13, karb:68, yag:3.5, lif:3, sod:580, por:100, kat:"Pasta", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"semolino di grano duro, nero di seppia, sale", katkiMaddeleri:[] },

// ── ES ──
{ ad:"Navaja ES (Mariscos)", kal:58, pro:11, karb:2, yag:0.8, lif:0, sod:280, por:100, kat:"Mariscos", ulke:"es", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"navajas", katkiMaddeleri:[] },
{ ad:"Natillas ES", kal:155, pro:5.5, karb:22, yag:5.5, lif:0, sod:65, por:120, kat:"Postres", ulke:"es", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"leche, yemas, azúcar, canela, maizena", katkiMaddeleri:[] },

// ── EL ──
{ ad:"Ντολμαδάκια Λεμονάτα", adLatin:"Dolmadakia Lemonata", kal:155, pro:4.5, karb:20, yag:7, lif:2.5, sod:280, por:100, kat:"Mezedes", ulke:"el", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"ambelofylla, rizi, kremydaki, lemoni, elaiolado, diosmos", katkiMaddeleri:[] },
{ ad:"Νουτέλα EL", adLatin:"Nouintela EL", marka:"Ferrero", kal:541, pro:6.3, karb:57, yag:31, lif:2.5, sod:55, por:30, kat:"Epidorpia", ulke:"el", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"zachari, fytiko lipako, foutzouki, kakao, gala, E322", katkiMaddeleri:[{kod:"E322",ad:"Λεκιθίνες",tehlikeli:false,aciklama:"Γαλακτωματοποιητής."}] },

// ── EN ──
{ ad:"Neeps and Tatties EN", kal:88, pro:1.8, karb:18, yag:2, lif:3, sod:180, por:200, kat:"Dish", ulke:"en", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"swede, potatoes, butter, salt, pepper", katkiMaddeleri:[] },
{ ad:"Nutella EN", marka:"Ferrero", kal:541, pro:6.3, karb:57, yag:31, lif:2.5, sod:55, por:30, kat:"Spreads", ulke:"en", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"sugar, palm oil, hazelnuts, cocoa, skimmed milk, E322", katkiMaddeleri:[{kod:"E322",ad:"Lecithins",tehlikeli:false,aciklama:"Emulsifier."}] },
{ ad:"Norfolk Dumpling EN", kal:218, pro:5, karb:36, yag:7, lif:2, sod:380, por:100, kat:"Dish", ulke:"en", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"flour, suet, water, salt, E500", katkiMaddeleri:[{kod:"E500",ad:"Sodium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },

// ── DA ──
{ ad:"Nougat DA (Konfekt)", kal:395, pro:5, karb:62, yag:16, lif:2, sod:45, por:30, kat:"Konfekt", ulke:"da", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"mandler, sukker, honning, æggehvider", katkiMaddeleri:[] },
{ ad:"Nybagt Rugbrød DA", kal:215, pro:8, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Brod", ulke:"da", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"rugmel, vand, surdej, salt, kerner", katkiMaddeleri:[] },

// ── NO ──
{ ad:"Nystekte Vafler NO", kal:295, pro:7, karb:38, yag:14, lif:1.5, sod:380, por:100, kat:"Brod", ulke:"no", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"hvetemel, melk, egg, smør, sukker, kardemomme, bakepulver", katkiMaddeleri:[] },
{ ad:"Nordlandslefse NO", kal:268, pro:5, karb:46, yag:9, lif:3, sod:285, por:100, kat:"Brod", ulke:"no", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"poteter, mel, smør, salt, rømme", katkiMaddeleri:[] },

// ── SV ──
{ ad:"Nässelsoppa SV", kal:55, pro:3.5, karb:6, yag:2, lif:3, sod:380, por:300, kat:"Soppa", ulke:"sv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"brännässlor, lök, smör, mjölk, salt", katkiMaddeleri:[] },
{ ad:"Nötfärs SV", kal:215, pro:20, karb:0, yag:15, lif:0, sod:75, por:100, kat:"Kött", ulke:"sv", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"nötfärs", katkiMaddeleri:[] },

// ── FI ──
{ ad:"Nokkelost FI", kal:357, pro:25, karb:1.4, yag:28, lif:0, sod:820, por:30, kat:"Juustot", ulke:"fi", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"maito, suola, juoksute, kumina", katkiMaddeleri:[] },
{ ad:"Neilikka FI (Mauste)", kal:274, pro:6, karb:66, yag:13, lif:34, sod:277, por:2, kat:"Mausteet", ulke:"fi", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"neilikka", katkiMaddeleri:[] },

// ── NL ──
{ ad:"Nieuw Amsterdams Bier NL", kal:42, pro:0.4, karb:4.2, yag:0, lif:0, sod:8, por:330, kat:"Dranken", ulke:"nl", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"water, mout, hop, gist", katkiMaddeleri:[] },
{ ad:"Nasi Goreng NL", kal:285, pro:12, karb:38, yag:10, lif:2, sod:580, por:250, kat:"Maaltijden", ulke:"nl", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"rijst, kip, garnalen, kool, prei, kecap, sambal", katkiMaddeleri:[] },

// ── BE ──
{ ad:"Naturel Yoghurt BE", kal:72, pro:4.5, karb:5, yag:3.8, lif:0, sod:46, por:150, kat:"Zuivel", ulke:"be", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"volle melk, culturen", katkiMaddeleri:[] },
{ ad:"Nieren BE (Nierkens)", kal:145, pro:24, karb:2, yag:5, lif:0, sod:380, por:100, kat:"Orgaanvlees", ulke:"be", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"nieren, boter, mosterd, cognac, zout, peper", katkiMaddeleri:[] },

// ── AT ──
{ ad:"Nockerl AT (Salzburger)", kal:265, pro:8, karb:32, yag:14, lif:0.5, sod:120, por:150, kat:"Mehlspeisen", ulke:"at", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"Eier, Mehl, Butter, Zucker, Vanille, Marmelade", katkiMaddeleri:[] },
{ ad:"Nusskuchen AT", kal:395, pro:8, karb:48, yag:22, lif:3, sod:120, por:100, kat:"Kuchen", ulke:"at", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"Haselnüsse, Mehl, Butter, Zucker, Eier, Backpulver", katkiMaddeleri:[] },

// ── PL ──
{ ad:"Naleśniki PL", adLatin:"Nalesniki PL", kal:195, pro:6.5, karb:26, yag:8, lif:1, sod:285, por:100, kat:"Nalesniki", ulke:"pl", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"mąka, jajka, mleko, masło, sól", katkiMaddeleri:[] },
{ ad:"Nóżki w Galarecie PL", adLatin:"Nozki w Galarecie PL", kal:145, pro:14, karb:6, yag:8, lif:0, sod:580, por:100, kat:"Wedliny", ulke:"pl", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"nóżki wieprzowe, marchew, pietruszka, sól, żelatyna", katkiMaddeleri:[] },

// ── CS ──
{ ad:"Nakládaný Hermelín CS", adLatin:"Nakladany Hermelin CS", kal:285, pro:20, karb:2, yag:22, lif:0, sod:640, por:80, kat:"Nalozeninky", ulke:"cs", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"camembert, olej, cibule, paprika, česnek", katkiMaddeleri:[] },
{ ad:"Nočové Knedlíky CS", adLatin:"Nocove Knedliky CS", kal:295, pro:5.5, karb:48, yag:10, lif:2, sod:165, por:150, kat:"Dezerty", ulke:"cs", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"mouky, vejce, mléko, švestky, tvaroh, máslo, mák", katkiMaddeleri:[] },

// ── HU ──
{ ad:"Nyúlpörkölt HU", adLatin:"Nyulporkolt HU", kal:185, pro:22, karb:5, yag:9, lif:1, sod:480, por:250, kat:"Fogások", ulke:"hu", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"nyúlhús, tejföl, paprika, hagyma, só, fokhagyma", katkiMaddeleri:[] },
{ ad:"Nyári Saláta HU", adLatin:"Nyari Salata HU", kal:55, pro:2, karb:8, yag:2.5, lif:2.5, sod:180, por:150, kat:"Salátak", ulke:"hu", tokPuan:32, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"paradicsom, uborka, paprika, vöröshagyma, só, ecet, olaj", katkiMaddeleri:[] },
{ ad:"Nudli HU (Krumplinudli)", adLatin:"Nudli HU", kal:248, pro:6, karb:38, yag:9, lif:2, sod:165, por:150, kat:"Tesztak", ulke:"hu", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"burgonya, liszt, tojás, só, vaj, zsemlemorzsa, cukor", katkiMaddeleri:[] },

// ── RO ──
{ ad:"Negresă RO", adLatin:"Negresa RO", kal:395, pro:7, karb:52, yag:20, lif:2.5, sod:185, por:80, kat:"Prajituri", ulke:"ro", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"faina, cacao, oua, zahar, unt, bicarbonat", katkiMaddeleri:[] },
{ ad:"Nuci Umplute RO", adLatin:"Nuci Umplute RO", kal:545, pro:10, karb:38, yag:44, lif:4, sod:88, por:30, kat:"Dulciuri", ulke:"ro", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"nuci, zahar, smantana, cacao", katkiMaddeleri:[] },

// ── HR ──
{ ad:"Njoki HR", adLatin:"Njoki HR", kal:195, pro:5.5, karb:38, yag:2, lif:2, sod:285, por:150, kat:"Tjestenina", ulke:"hr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"krumpir, brašno, jaja, sol", katkiMaddeleri:[] },
{ ad:"Neretvanski Brodet HR", adLatin:"Neretvanski Brodet HR", kal:148, pro:18, karb:8, yag:5.5, lif:1.5, sod:580, por:300, kat:"Jela", ulke:"hr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"mješana riba, crni luk, rajčica, maslinovo ulje, crveno vino", katkiMaddeleri:[] },

// ── PT ──
{ ad:"Natillas PT", kal:155, pro:5.5, karb:22, yag:5.5, lif:0, sod:65, por:120, kat:"Doces", ulke:"pt", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"leite, gemas, açúcar, canela, maisena", katkiMaddeleri:[] },
{ ad:"Nêveda PT (Erva)", kal:22, pro:1.5, karb:4, yag:0.3, lif:2.5, sod:5, por:10, kat:"Ervas", ulke:"pt", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"nêveda fresca", katkiMaddeleri:[] },

// ── LV ──
{ ad:"Nātres Zupa LV", adLatin:"Natres Zupa LV", kal:55, pro:3.5, karb:6, yag:2, lif:3, sod:380, por:300, kat:"Zupi", ulke:"lv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"nātres, sīpoli, sviests, piens, sāls", katkiMaddeleri:[] },
{ ad:"Nūjas Jeb Rīvmaize LV", adLatin:"Nuja Rivmaize LV", kal:388, pro:12, karb:77, yag:3, lif:3.5, sod:485, por:30, kat:"Maizes Produkti", ulke:"lv", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"maize, sāls", katkiMaddeleri:[] },
{ ad:"Nātre Zupa ar Olu LV", adLatin:"Natre Zupa ar Olu LV", kal:65, pro:4.5, karb:6, yag:2.5, lif:3, sod:380, por:300, kat:"Zupi", ulke:"lv", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"nātres, olas, sīpoli, sviests, sāls", katkiMaddeleri:[] },

// ── ET ──
{ ad:"Nõgessupp ET", adLatin:"Nogessupp ET", kal:55, pro:3.5, karb:6, yag:2, lif:3, sod:380, por:300, kat:"Supid", ulke:"et", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"nõgesed, sibul, või, piim, sool", katkiMaddeleri:[] },
{ ad:"Naeri ET", adLatin:"Naeri ET", kal:28, pro:0.9, karb:6.4, yag:0.1, lif:1.8, sod:67, por:100, kat:"Köögiviljad", ulke:"et", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"naeris", katkiMaddeleri:[] },

// ── LT ──
{ ad:"Naminė Degtinė LT", adLatin:"Nomine Degtine LT", kal:230, pro:0, karb:0, yag:0, lif:0, sod:0, por:40, kat:"Gėrimai", ulke:"lt", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:1.5, icerik:"alkoholis", katkiMaddeleri:[] },
{ ad:"Naminė Varškė LT", adLatin:"Nomine Varskele LT", kal:98, pro:11, karb:3.4, yag:4.3, lif:0, sod:364, por:100, kat:"Pieno Produktai", ulke:"lt", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"pienas, kultūros", katkiMaddeleri:[] },
{ ad:"Naminė Duona su Kmynais LT", adLatin:"Nomine Duona su Kmynais LT", kal:215, pro:7.5, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Duona", ulke:"lt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ruginiai miltai, kmynai, vanduo, raugas, druska", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// O HARFİ
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"Olive Oil (Zeytinyağı)", adler:{tr:"Zeytinyağı",de:"Olivenöl",el:"Ελαιόλαδο",hu:"Olívaolaj",pl:"Oliwa z Oliwek",cs:"Olivový Olej",ro:"Ulei de Măsline",hr:"Maslinovo Ulje",fr:"Huile d'Olive",es:"Aceite de Oliva",it:"Olio d'Oliva",pt:"Azeite",no:"Olivenolje",sv:"Olivolja",da:"Olivenolie",fi:"Oliiviöljy",nl:"Olijfolie",lv:"Olīveļļa",et:"Oliiviõli",lt:"Alyvuogių Aliejus"}, kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, por:10, kat:"Oil", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"olive oil", katkiMaddeleri:[] },
{ ad:"Oats (Yulaf)", adler:{tr:"Yulaf",de:"Hafer",el:"Βρώμη",hu:"Zab",pl:"Owies",cs:"Oves",ro:"Ovăz",hr:"Zob",fr:"Avoine",es:"Avena",it:"Avena",pt:"Aveia",no:"Havre",sv:"Havre",da:"Havre",fi:"Kaura",nl:"Haver",lv:"Auzu Pārslas",et:"Kaerahelbed",lt:"Avižos"}, kal:389, pro:17, karb:66, yag:7, lif:11, sod:6, por:45, kat:"Grain", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:82, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"oats", katkiMaddeleri:[] },
{ ad:"Orange (Portakal)", adler:{tr:"Portakal",de:"Orange",el:"Πορτοκάλι",hu:"Narancs",pl:"Pomarańcza",cs:"Pomeranč",ro:"Portocală",hr:"Naranča",fr:"Orange",es:"Naranja",it:"Arancia",pt:"Laranja",no:"Appelsin",sv:"Apelsin",da:"Appelsin",fi:"Appelsiini",nl:"Sinaasappel",lv:"Apelsīns",et:"Apelsin",lt:"Apelsinas"}, kal:47, pro:0.9, karb:12, yag:0.1, lif:2.4, sod:0, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"orange", katkiMaddeleri:[] },
{ ad:"Onion (Soğan)", adler:{tr:"Soğan",de:"Zwiebel",el:"Κρεμμύδι",hu:"Hagyma",pl:"Cebula",cs:"Cibule",ro:"Ceapă",hr:"Luk",fr:"Oignon",es:"Cebolla",it:"Cipolla",pt:"Cebola",no:"Løk",sv:"Lök",da:"Løg",fi:"Sipuli",nl:"Ui",lv:"Sīpols",et:"Sibul",lt:"Svogūnas"}, kal:40, pro:1.1, karb:9.3, yag:0.1, lif:1.7, sod:4, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"onion", katkiMaddeleri:[] },
// ── TR ──
{ ad:"Otlu Peynir", kal:298, pro:18, karb:2, yag:24, lif:0, sod:980, por:30, kat:"Süt Ürünleri", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"koyun sütü, otlar, tuz, maya", katkiMaddeleri:[] },
{ ad:"Oruk (Bulgur Köfte)", kal:218, pro:9, karb:32, yag:7, lif:5, sod:380, por:100, kat:"Meze", ulke:"tr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"ince bulgur, kıyma, soğan, biber, baharat", katkiMaddeleri:[] },
{ ad:"Orman Meyveli Çay", kal:3, pro:0.1, karb:0.5, yag:0, lif:0, sod:1, por:200, kat:"İçecek", ulke:"tr", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"orman meyveleri, su", katkiMaddeleri:[] },
// ── DE ──
{ ad:"Ochsenschwanzsuppe DE", kal:145, pro:12, karb:6, yag:9, lif:1, sod:480, por:300, kat:"Suppe", ulke:"de", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"Ochsenschwanz, Möhren, Sellerie, Zwiebeln, Rotwein, Salz", katkiMaddeleri:[] },
{ ad:"Obatzda DE", kal:285, pro:15, karb:3, yag:24, lif:0.3, sod:680, por:100, kat:"Kaese", ulke:"de", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"Camembert, Butter, Zwiebeln, Paprika, Bier, Salz", katkiMaddeleri:[] },
// ── FR ──
{ ad:"Omelette FR", kal:195, pro:13, karb:1.5, yag:15, lif:0, sod:380, por:150, kat:"Oeufs", ulke:"fr", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"oeufs, beurre, sel", katkiMaddeleri:[] },
{ ad:"Osso Buco FR", kal:245, pro:24, karb:5, yag:14, lif:1, sod:480, por:250, kat:"Plat", ulke:"fr", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"jarret de veau, tomates, vin blanc, citron, persil, ail", katkiMaddeleri:[] },
// ── IT ──
{ ad:"Osso Buco IT", kal:245, pro:24, karb:5, yag:14, lif:1, sod:480, por:250, kat:"Carne", ulke:"it", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"garretto di vitello, gremolata, vino bianco, brodo, sale", katkiMaddeleri:[] },
{ ad:"Orecchiette IT", kal:353, pro:12, karb:71, yag:1.5, lif:2.7, sod:3, por:100, kat:"Pasta", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"semolino di grano duro", katkiMaddeleri:[] },
// ── ES ──
{ ad:"Olla Podrida ES", kal:285, pro:18, karb:22, yag:13, lif:7, sod:680, por:400, kat:"Plato", ulke:"es", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"alubias, carnes variadas, verduras, chorizo, morcilla, sal", katkiMaddeleri:[] },
// ── EL ──
{ ad:"Ορεκτικά", adLatin:"Orektika", kal:165, pro:7, karb:10, yag:12, lif:2, sod:580, por:150, kat:"Mezedes", ulke:"el", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"elies, feta, kremmydakia, domatesakia, elaiolado", katkiMaddeleri:[] },
// ── EN ──
{ ad:"Oxtail Stew EN", kal:265, pro:22, karb:8, yag:16, lif:2, sod:520, por:350, kat:"Dish", ulke:"en", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"oxtail, carrots, onion, celery, red wine, thyme, salt", katkiMaddeleri:[] },
{ ad:"Oxford Marmalade EN", marka:"Frank Cooper", kal:250, pro:0.4, karb:63, yag:0, lif:1, sod:8, por:20, kat:"Spreads", ulke:"en", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"Seville oranges, sugar, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pectin",tehlikeli:false,aciklama:"Gelling agent."},{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."}] },
// ── DA ──
{ ad:"Oksesteg DA", kal:245, pro:26, karb:0, yag:15, lif:0, sod:68, por:150, kat:"Kød", ulke:"da", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"oksekød, rosmarin, hvidløg, salt, peber", katkiMaddeleri:[] },
// ── NO ──
{ ad:"Ovnsbakt Laks NO", kal:208, pro:20, karb:0, yag:13, lif:0, sod:59, por:150, kat:"Fisk", ulke:"no", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"laks, sitron, dill, salt, peper", katkiMaddeleri:[] },
// ── SV ──
{ ad:"Oxfilé SV", kal:185, pro:28, karb:0, yag:8, lif:0, sod:65, por:150, kat:"Kött", ulke:"sv", tokPuan:78, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"oxfilé", katkiMaddeleri:[] },
// ── FI ──
{ ad:"Ohrapuuro FI", kal:68, pro:2.5, karb:13, yag:0.5, lif:2, sod:45, por:200, kat:"Aamupalat", ulke:"fi", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"ohrasuurimo, vesi, suola", katkiMaddeleri:[] },
// ── NL ──
{ ad:"Ossenworst NL", kal:248, pro:18, karb:1.5, yag:19, lif:0, sod:980, por:50, kat:"Vleeswaren", ulke:"nl", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"rundvlees, zout, peper, foelie, E250", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitriet",tehlikeli:true,aciklama:"In hoge doses kankerverwekkend."}] },
// ── BE ──
{ ad:"Oude Geuze BE", kal:42, pro:0.4, karb:4, yag:0, lif:0, sod:8, por:330, kat:"Bier", ulke:"be", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"water, gerst, tarwe, hop, wilde gisten", katkiMaddeleri:[] },
// ── AT ──
{ ad:"Österreichische Palatschinken AT", kal:195, pro:6.5, karb:28, yag:8, lif:1.5, sod:185, por:100, kat:"Mehlspeisen", ulke:"at", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Weizenmehl, Eier, Milch, Butter, Salz", katkiMaddeleri:[] },
// ── PL ──
{ ad:"Ogórek Kiszony PL", adLatin:"Ogorek Kiszony PL", kal:15, pro:0.7, karb:3.6, yag:0.1, lif:0.5, sod:680, por:50, kat:"Kiszonki", ulke:"pl", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"ogórek, sól, czosnek, koperek, liść laurowy", katkiMaddeleri:[] },
{ ad:"Oscypek PL", adLatin:"Oscypek PL", kal:285, pro:20, karb:1.5, yag:22, lif:0, sod:980, por:30, kat:"Sery", ulke:"pl", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"mleko owcze, sól", katkiMaddeleri:[] },
// ── CS ──
{ ad:"Olomoucké Tvarůžky CS", adLatin:"Olomoucke Tvaruzky CS", kal:88, pro:22, karb:0.5, yag:0.3, lif:0, sod:1280, por:50, kat:"Sýry", ulke:"cs", tokPuan:52, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"odtučněné mléko, sůl, kultury", katkiMaddeleri:[] },
// ── HU ──
{ ad:"Őszibarack Lekvár HU", adLatin:"Oszibarack Lekvar HU", kal:248, pro:0.4, karb:62, yag:0, lif:1, sod:6, por:20, kat:"Lekvarok", ulke:"hu", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"őszibarack, cukor, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektinek",tehlikeli:false,aciklama:"Zselésítő."},{kod:"E330",ad:"Citromsav",tehlikeli:false,aciklama:"Savanyúságszabályzó."}] },
// ── RO ──
{ ad:"Ouă Ochiuri RO", adLatin:"Oua Ochiuri RO", kal:155, pro:13, karb:1.1, yag:11, lif:0, sod:124, por:100, kat:"Oua", ulke:"ro", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"oua, unt, sare", katkiMaddeleri:[] },
// ── HR ──
{ ad:"Ovčji Sir HR", adLatin:"Ovcji Sir HR", kal:385, pro:25, karb:0.5, yag:32, lif:0, sod:650, por:30, kat:"Sir", ulke:"hr", tokPuan:50, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"ovčje mlijeko, sol, sirište", katkiMaddeleri:[] },
// ── PT ──
{ ad:"Ovos Verdes PT", kal:155, pro:13, karb:1.1, yag:11, lif:0, sod:124, por:100, kat:"Ovos", ulke:"pt", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"ovos, manteiga, salsa, sal", katkiMaddeleri:[] },
// ── LV ──
{ ad:"Ogles Zupa LV (Ogru)", adLatin:"Ogru Zupa LV", kal:28, pro:1.5, karb:5, yag:0.5, lif:2, sod:180, por:250, kat:"Zupi", ulke:"lv", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"ogres, ūdens, cukurs, citrona sula", katkiMaddeleri:[] },
// ── ET ──
{ ad:"Odrajahu Puder ET", adLatin:"Odrajahu Puder ET", kal:68, pro:2.5, karb:13, yag:0.5, lif:2, sod:45, por:200, kat:"Hommikusook", ulke:"et", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"odrajahu, vesi, sool", katkiMaddeleri:[] },
// ── LT ──
{ ad:"Obuolių Pyragas LT", adLatin:"Obuoliu Pyragas LT", kal:285, pro:4.5, karb:44, yag:12, lif:2, sod:185, por:100, kat:"Kepiniai", ulke:"lt", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"obuoliai, miltai, cukrus, kiaušiniai, sviestas, cinamonas", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Ö HARFİ (Türkçe'ye özgü, diğer dillerde olmaz)
// ══════════════════════════════════════════════════════
{ ad:"Ördek Kavurma", kal:285, pro:20, karb:2, yag:22, lif:0, sod:380, por:150, kat:"Et", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"ördek eti, tuz, karabiber, kekik", katkiMaddeleri:[] },
{ ad:"Örgü Peyniri", kal:315, pro:22, karb:1.5, yag:26, lif:0, sod:1150, por:30, kat:"Süt Ürünleri", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"inek sütü, tuz, maya", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// P HARFİ
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"Pasta (Spaghetti)", adler:{tr:"Spagetti",de:"Spaghetti",el:"Μακαρόνια",hu:"Spagetti",pl:"Spaghetti",cs:"Špagety",ro:"Spaghete",hr:"Špageti",fr:"Spaghetti",es:"Espaguetis",it:"Spaghetti",pt:"Esparguete",no:"Spaghetti",sv:"Spaghetti",da:"Spaghetti",fi:"Spagetti",nl:"Spaghetti",lv:"Spageti",et:"Spaghetti",lt:"Spageti"}, kal:353, pro:12, karb:71, yag:1.5, lif:2.7, sod:3, por:100, kat:"Pasta", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"durum wheat semolina, water", katkiMaddeleri:[] },
{ ad:"Peanut Butter (Fıstık Ezmesi)", adler:{tr:"Fıstık Ezmesi",de:"Erdnussbutter",el:"Φυστικοβούτυρο",hu:"Mogyoróvaj",pl:"Masło Orzechowe",cs:"Arašídové Máslo",ro:"Unt de Arahide",hr:"Maslac od Kikirikija",fr:"Beurre de Cacahuète",es:"Mantequilla de Cacahuete",it:"Burro di Arachidi",pt:"Manteiga de Amendoim",no:"Peanøttsmør",sv:"Jordnötssmör",da:"Jordnøddesmør",fi:"Maapähkinävoi",nl:"Pindakaas",lv:"Zemesriekstu Sviests",et:"Maapähklivõi",lt:"Žemės Riešutų Sviestas"}, kal:588, pro:25, karb:20, yag:50, lif:6, sod:459, por:30, kat:"Spreads", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"peanuts, salt, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."}] },
{ ad:"Parmesan (Parmigiano)", adler:{tr:"Parmesan Peyniri",de:"Parmesan Käse",el:"Παρμεζάνα",hu:"Parmezán Sajt",pl:"Ser Parmezan",cs:"Sýr Parmazán",ro:"Parmezan",hr:"Parmezan Sir",fr:"Parmesan",es:"Queso Parmesano",it:"Parmigiano Reggiano",pt:"Queijo Parmesão",no:"Parmesan Ost",sv:"Parmesan Ost",da:"Parmesan Ost",fi:"Parmesaani Juusto",nl:"Parmezaan Kaas",lv:"Parmezāna Siers",et:"Parmesani Juust",lt:"Parmezano Sūris"}, kal:431, pro:38, karb:0, yag:29, lif:0, sod:1529, por:20, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:50, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"milk, salt, rennet, E1105", katkiMaddeleri:[{kod:"E1105",ad:"Lysozyme",tehlikeli:false,aciklama:"Preservative."}] },
{ ad:"Pork (Domuz Eti)", adler:{tr:"Domuz Eti",de:"Schweinefleisch",el:"Χοιρινό",hu:"Sertéshús",pl:"Wieprzowina",cs:"Vepřové",ro:"Carne de Porc",hr:"Svinjetina",fr:"Porc",es:"Cerdo",it:"Maiale",pt:"Porco",no:"Svinekjøtt",sv:"Fläsk",da:"Svinekød",fi:"Sianliha",nl:"Varkensvlees",lv:"Cūkgaļa",et:"Sealiha",lt:"Kiauliena"}, kal:242, pro:27, karb:0, yag:14, lif:0, sod:62, por:100, kat:"Meat", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","lv","et","lt"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"pork", katkiMaddeleri:[] },
{ ad:"Peach (Şeftali)", adler:{tr:"Şeftali",de:"Pfirsich",el:"Ροδάκινο",hu:"Őszibarack",pl:"Brzoskwinia",cs:"Broskev",ro:"Piersică",hr:"Breskva",fr:"Pêche",es:"Melocotón",it:"Pesca",pt:"Pêssego",no:"Fersken",sv:"Persika",da:"Fersken",fi:"Persikka",nl:"Perzik",lv:"Persiks",et:"Virsik",lt:"Persikas"}, kal:39, pro:0.9, karb:10, yag:0.3, lif:1.5, sod:0, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"peach", katkiMaddeleri:[] },
{ ad:"Pear (Armut)", adler:{tr:"Armut",de:"Birne",el:"Αχλάδι",hu:"Körte",pl:"Gruszka",cs:"Hruška",ro:"Pară",hr:"Kruška",fr:"Poire",es:"Pera",it:"Pera",pt:"Pêra",no:"Pære",sv:"Päron",da:"Pære",fi:"Päärynä",nl:"Peer",lv:"Bumbieris",et:"Pirn",lt:"Kriaušė"}, kal:57, pro:0.4, karb:15, yag:0.1, lif:3.1, sod:1, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"pear", katkiMaddeleri:[] },
{ ad:"Plum (Erik)", adler:{tr:"Erik",de:"Pflaume",el:"Δαμάσκηνο",hu:"Szilva",pl:"Śliwka",cs:"Švestka",ro:"Prună",hr:"Šljiva",fr:"Prune",es:"Ciruela",it:"Prugna",pt:"Ameixa",no:"Plomme",sv:"Plommon",da:"Blomme",fi:"Luumu",nl:"Pruim",lv:"Plūme",et:"Ploom",lt:"Slyva"}, kal:46, pro:0.7, karb:11, yag:0.3, lif:1.4, sod:0, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"plum", katkiMaddeleri:[] },
// ── TR ──
{ ad:"Pilav (Pirinç)", kal:195, pro:3.5, karb:42, yag:3.5, lif:0.6, sod:185, por:150, kat:"Tahıl", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"pirinç, tereyağı, su, tuz", katkiMaddeleri:[] },
{ ad:"Pide (Peynirli)", kal:285, pro:12, karb:38, yag:11, lif:2, sod:480, por:150, kat:"Hamur İşleri", ulke:"tr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"un, beyaz peynir, kaşar, yumurta, maydanoz, tuz", katkiMaddeleri:[] },
{ ad:"Pide (Kıymalı)", kal:298, pro:15, karb:36, yag:12, lif:2.5, sod:520, por:150, kat:"Hamur İşleri", ulke:"tr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"un, kıyma, soğan, biber, domates, baharat", katkiMaddeleri:[] },
{ ad:"Patates Kızartması", kal:312, pro:3.4, karb:41, yag:15, lif:3.8, sod:480, por:150, kat:"Sebze Yemekleri", ulke:"tr", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"patates, sıvı yağ, tuz", katkiMaddeleri:[] },
{ ad:"Pastırma", kal:285, pro:30, karb:2, yag:18, lif:0, sod:1680, por:30, kat:"Et", ulke:"tr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"kürlenmiş sığır eti, çemek, tuz", katkiMaddeleri:[] },
{ ad:"Pekmez (Üzüm)", kal:285, pro:1.5, karb:72, yag:0.3, lif:0.5, sod:8, por:20, kat:"Tatlandırıcı", ulke:"tr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"üzüm suyu", katkiMaddeleri:[] },
{ ad:"Piyaz", kal:145, pro:7, karb:20, yag:5, lif:6.5, sod:280, por:150, kat:"Meze", ulke:"tr", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"kuru fasulye, soğan, domates, maydanoz, zeytinyağı, sirke", katkiMaddeleri:[] },
{ ad:"Paça Çorbası", kal:145, pro:14, karb:5, yag:9, lif:0, sod:480, por:300, kat:"Çorba", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"kuzu paçası, limon, sarımsak, tuz", katkiMaddeleri:[] },
{ ad:"Patlıcan Salatası", kal:88, pro:1.5, karb:8, yag:6, lif:3, sod:280, por:100, kat:"Meze", ulke:"tr", tokPuan:35, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"patlıcan, zeytinyağı, sarımsak, limon, tuz", katkiMaddeleri:[] },
{ ad:"Pestil (Üzüm)", kal:285, pro:2, karb:72, yag:0.5, lif:2, sod:5, por:30, kat:"Tatlı", ulke:"tr", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"üzüm suyu, nişasta", katkiMaddeleri:[] },
// ── DE ──
{ ad:"Pfannkuchen DE", kal:195, pro:6.5, karb:28, yag:8, lif:1.5, sod:185, por:100, kat:"Mehlspeisen", ulke:"de", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"Weizenmehl, Milch, Eier, Butter, Salz", katkiMaddeleri:[] },
{ ad:"Pumpernickel DE", kal:218, pro:8, karb:45, yag:1.5, lif:7.5, sod:460, por:100, kat:"Brot", ulke:"de", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"Roggenschrot, Roggenmehl, Wasser, Salz, Sauerteig", katkiMaddeleri:[] },
{ ad:"Pfefferkuchen DE", kal:385, pro:6, karb:68, yag:11, lif:2.5, sod:185, por:30, kat:"Gebaeck", ulke:"de", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"Mehl, Honig, Gewürze, Eier, E500", katkiMaddeleri:[{kod:"E500",ad:"Natriumcarbonat",tehlikeli:false,aciklama:"Triebmittel."}] },
// ── FR ──
{ ad:"Pot-au-Feu FR", kal:195, pro:22, karb:8, yag:9, lif:2.5, sod:520, por:400, kat:"Plat", ulke:"fr", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"boeuf, légumes racines, poireau, bouquet garni, sel", katkiMaddeleri:[] },
{ ad:"Profiteroles FR", kal:345, pro:6, karb:38, yag:20, lif:0.8, sod:185, por:100, kat:"Pâtisserie", ulke:"fr", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"pâte à choux, crème Chantilly, chocolat fondu", katkiMaddeleri:[] },
{ ad:"Pistou Soupe FR", kal:88, pro:4.5, karb:12, yag:3.5, lif:4, sod:480, por:300, kat:"Soupes", ulke:"fr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"courgettes, haricots, tomates, pâtes, pistou, sel", katkiMaddeleri:[] },
// ── IT ──
{ ad:"Pizza Margherita IT", kal:265, pro:12, karb:38, yag:8, lif:2.5, sod:580, por:200, kat:"Pizza", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"farina, mozzarella, pomodoro, basilico, olio, lievito, sale", katkiMaddeleri:[] },
{ ad:"Pesto Genovese IT", kal:400, pro:8, karb:3.5, yag:40, lif:1.5, sod:580, por:30, kat:"Condimento", ulke:"it", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"basilico, parmigiano, pinoli, aglio, olio d'oliva, sale", katkiMaddeleri:[] },
{ ad:"Panettone IT", kal:345, pro:8, karb:54, yag:12, lif:2.5, sod:280, por:100, kat:"Dolci", ulke:"it", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"farina, uova, burro, zucchero, uvetta, cedro, lievito madre", katkiMaddeleri:[] },
// ── ES ──
{ ad:"Paella Valenciana ES", kal:285, pro:18, karb:38, yag:8, lif:2.5, sod:480, por:250, kat:"Arroz", ulke:"es", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"arroz, pollo, conejo, judías verdes, tomate, azafrán, aceite", katkiMaddeleri:[] },
{ ad:"Patatas Bravas ES", kal:195, pro:3.5, karb:24, yag:10, lif:3, sod:480, por:200, kat:"Tapas", ulke:"es", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"patatas, aceite, salsa brava, ali-oli", katkiMaddeleri:[] },
{ ad:"Pulpo a la Gallega ES", kal:82, pro:15, karb:2, yag:1.5, lif:0.5, sod:280, por:150, kat:"Tapas", ulke:"es", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"pulpo, pimentón, aceite de oliva, sal gruesa", katkiMaddeleri:[] },
// ── EL ──
{ ad:"Παστίτσιο", adLatin:"Pastitsio", kal:295, pro:16, karb:32, yag:12, lif:2, sod:520, por:250, kat:"Kyria Piata", ulke:"el", tokPuan:60, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"makaronia, kima, besarnel, graviera, tomates, kanela", katkiMaddeleri:[] },
{ ad:"Πίτα Σπανακόπιτα", adLatin:"Pita Spanakopita", kal:248, pro:9, karb:28, yag:13, lif:2.5, sod:480, por:150, kat:"Pites", ulke:"el", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"filo, spanaki, feta, avga, voutiro, kremydakia", katkiMaddeleri:[] },
// ── EN ──
{ ad:"Ploughman's Lunch EN", kal:365, pro:18, karb:28, yag:20, lif:3, sod:780, por:300, kat:"Lunch", ulke:"en", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"cheddar, crusty bread, pickle, salad, apple, ham", katkiMaddeleri:[] },
{ ad:"Pork Scratchings EN", kal:585, pro:38, karb:0, yag:48, lif:0, sod:980, por:30, kat:"Snacks", ulke:"en", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"pork rind, salt, E250", katkiMaddeleri:[{kod:"E250",ad:"Sodium nitrite",tehlikeli:true,aciklama:"In high amounts may be carcinogenic."}] },
// ── DA ──
{ ad:"Pandekager DA", kal:195, pro:6.5, karb:26, yag:8, lif:1, sod:285, por:100, kat:"Dessert", ulke:"da", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"hvedemel, æg, mælk, smør, salt", katkiMaddeleri:[] },
{ ad:"Pickled Sild DA", kal:155, pro:16, karb:4, yag:8, lif:0, sod:980, por:80, kat:"Fisk", ulke:"da", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"sild, eddike, sukker, løg, peber, E220", katkiMaddeleri:[{kod:"E220",ad:"Svovldioxid",tehlikeli:true,aciklama:"Kan forårsage allergiske reaktioner."}] },
// ── NO ──
{ ad:"Pinnekjøtt NO", kal:265, pro:24, karb:0, yag:18, lif:0, sod:1680, por:150, kat:"Kjøtt", ulke:"no", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"lammeribbe, salt", katkiMaddeleri:[] },
{ ad:"Plukkfisk NO", kal:145, pro:14, karb:12, yag:5.5, lif:2, sod:380, por:250, kat:"Fisk", ulke:"no", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"torrfisk, poteter, smør, løk, salt", katkiMaddeleri:[] },
// ── SV ──
{ ad:"Pytt i Panna SV", kal:225, pro:12, karb:22, yag:11, lif:2.5, sod:480, por:250, kat:"Kött", ulke:"sv", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"kött, potatis, lök, ägg, salt, peppar", katkiMaddeleri:[] },
{ ad:"Prinskorv SV", kal:265, pro:12, karb:4, yag:23, lif:0, sod:920, por:100, kat:"Kött", ulke:"sv", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"fläsk, nöt, salt, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"I höga mängder cancerframkallande."},{kod:"E451",ad:"Trifosfater",tehlikeli:false,aciklama:"Fuktighetsbevarande."}] },
// ── FI ──
{ ad:"Poronkäristys FI", kal:245, pro:26, karb:2, yag:15, lif:0, sod:68, por:200, kat:"Poroliha", ulke:"fi", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"poronliha, voi, suola, pippuri", katkiMaddeleri:[] },
{ ad:"Porkkanalaatikko FI", kal:98, pro:2, karb:16, yag:3.5, lif:2.5, sod:280, por:200, kat:"Jouluruoat", ulke:"fi", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"porkkana, kerma, korppujauho, siirappi, voi, suola", katkiMaddeleri:[] },
// ── NL ──
{ ad:"Poffertjes NL", kal:285, pro:8, karb:48, yag:9, lif:1.5, sod:285, por:100, kat:"Nagerecht", ulke:"nl", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"boekweitmeel, tarwebloem, melk, ei, gist, boter, suiker", katkiMaddeleri:[] },
{ ad:"Pannenkoek NL", kal:215, pro:7, karb:30, yag:9, lif:1.5, sod:285, por:150, kat:"Maaltijd", ulke:"nl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"bloem, melk, ei, zout, boter, stroop of appel", katkiMaddeleri:[] },
// ── BE ──
{ ad:"Potage Liégeois BE", kal:88, pro:3.5, karb:14, yag:2.5, lif:4, sod:480, por:300, kat:"Soepen", ulke:"be", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"groenten, aardappelen, spek, room, zout", katkiMaddeleri:[] },
// ── AT ──
{ ad:"Powidltascherln AT", kal:285, pro:6, karb:48, yag:10, lif:2, sod:165, por:150, kat:"Mehlspeisen", ulke:"at", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"Nudelteig, Powidl, Butter, Semmelbröseln, Zucker, Mohn", katkiMaddeleri:[] },
// ── PL ──
{ ad:"Pierogi PL", adLatin:"Pierogi PL", kal:225, pro:8, karb:36, yag:7, lif:2.5, sod:380, por:150, kat:"Pierogi", ulke:"pl", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"mąka, kapusta z grzybami lub twaróg, ziemniaki, cebula, sól", katkiMaddeleri:[] },
{ ad:"Placki Ziemniaczane PL", adLatin:"Placki Ziemniaczane PL", kal:225, pro:5.5, karb:28, yag:11, lif:2.5, sod:380, por:150, kat:"Dania Glowne", ulke:"pl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"ziemniaki, jajko, mąka, cebula, sól, olej", katkiMaddeleri:[] },
// ── CS ──
{ ad:"Pečená Kachna CS", adLatin:"Pecena Kachna CS", kal:285, pro:22, karb:4, yag:20, lif:0.5, sod:520, por:200, kat:"Hlavni Jidla", ulke:"cs", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kachna, kmín, majoránka, sůl, česnek, zelí, knedlíky", katkiMaddeleri:[] },
{ ad:"Povidla CS (Švestková)", adLatin:"Povidla CS", kal:245, pro:0.5, karb:62, yag:0, lif:2, sod:6, por:20, kat:"Zavary", ulke:"cs", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"švestky, cukr, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektiny",tehlikeli:false,aciklama:"Gelovaci cinidlo."},{kod:"E330",ad:"Kyselina citronova",tehlikeli:false,aciklama:"Regulator kyselosti."}] },
// ── HU ──
{ ad:"Pörkölt HU", adLatin:"Porkolt HU", kal:225, pro:20, karb:8, yag:13, lif:2, sod:480, por:250, kat:"Fogások", ulke:"hu", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"sertés- vagy marhahús, hagyma, paprika, só, bors", katkiMaddeleri:[] },
{ ad:"Pogácsa HU", adLatin:"Pogacsa HU", kal:348, pro:9, karb:42, yag:18, lif:2, sod:280, por:50, kat:"Pékáruk", ulke:"hu", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"liszt, tej, tojás, zsír, só, élesztő, sajt", katkiMaddeleri:[] },
// ── RO ──
{ ad:"Papanași RO", adLatin:"Papanasi RO", kal:298, pro:9, karb:36, yag:14, lif:1.5, sod:185, por:150, kat:"Dulciuri", ulke:"ro", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"branza dulce, oua, gris, zahar, smantana, gem", katkiMaddeleri:[] },
{ ad:"Pulă de Rață RO", adLatin:"Pula de Rata RO", kal:268, pro:22, karb:5, yag:18, lif:1, sod:380, por:200, kat:"Carne", ulke:"ro", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"picioare rata, morcov, ceapa, cimbru, sare, vin", katkiMaddeleri:[] },
// ── HR ──
{ ad:"Paška Janjetina HR", adLatin:"Paska Janjetina HR", kal:245, pro:24, karb:0, yag:16, lif:0, sod:65, por:150, kat:"Meso", ulke:"hr", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"paška janjetina, sol, ružmarin, maslinovo ulje", katkiMaddeleri:[] },
{ ad:"Paška Sir HR", adLatin:"Paska Sir HR", kal:398, pro:25, karb:0.5, yag:33, lif:0, sod:650, por:30, kat:"Sir", ulke:"hr", tokPuan:50, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"ovčje mlijeko, sol, sirište", katkiMaddeleri:[] },
// ── PT ──
{ ad:"Polvo à Lagareiro PT", kal:148, pro:22, karb:5, yag:6.5, lif:0.5, sod:580, por:250, kat:"Prato", ulke:"pt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"polvo, batatas assadas, azeite, alho, sal", katkiMaddeleri:[] },
{ ad:"Pastéis de Nata PT", kal:298, pro:5.5, karb:38, yag:14, lif:0.8, sod:185, por:80, kat:"Patisserie", ulke:"pt", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"massa folhada, creme de leite, ovos, açúcar, canela, limão", katkiMaddeleri:[] },
// ── LV ──
{ ad:"Pelmeņi LV", adLatin:"Pelmeni LV", kal:215, pro:10, karb:28, yag:8, lif:2, sod:420, por:150, kat:"Ēdieni", ulke:"lv", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"kviešu milti, cūkgaļa, liellopa gaļa, sīpoli, sāls, pipari", katkiMaddeleri:[] },
{ ad:"Pīrāgs LV (Speķa)", adLatin:"Pirags LV", kal:285, pro:9, karb:38, yag:13, lif:2, sod:480, por:80, kat:"Maizes Izstrādājumi", ulke:"lv", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"kviešu milti, speķis, sīpoli, sviests, raugs, sāls", katkiMaddeleri:[] },
// ── ET ──
{ ad:"Pirukad ET", adLatin:"Pirukad ET", kal:265, pro:9, karb:36, yag:12, lif:2, sod:380, por:100, kat:"Pirukad", ulke:"et", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"nisujahu, sealiha, kapsas, sibul, sool, pärm", katkiMaddeleri:[] },
// ── LT ──
{ ad:"Plokštainis LT", adLatin:"Plokstainis LT", kal:185, pro:5.5, karb:28, yag:7.5, lif:2, sod:285, por:100, kat:"Pusryčiai", ulke:"lt", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"kviečių miltai, kiaušiniai, pienas, sviestas, druska", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// R HARFİ
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"Rice (Pirinç)", adler:{tr:"Pirinç",de:"Reis",el:"Ρύζι",hu:"Rizs",pl:"Ryż",cs:"Rýže",ro:"Orez",hr:"Riža",fr:"Riz",es:"Arroz",it:"Riso",pt:"Arroz",no:"Ris",sv:"Ris",da:"Ris",fi:"Riisi",nl:"Rijst",lv:"Rīsi",et:"Riis",lt:"Ryžiai"}, kal:355, pro:7, karb:79, yag:0.5, lif:1, sod:4, por:100, kat:"Grain", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"white rice", katkiMaddeleri:[] },
{ ad:"Raspberry (Ahududu)", adler:{tr:"Ahududu",de:"Himbeere",el:"Βατόμουρο",hu:"Málna",pl:"Malina",cs:"Malina",ro:"Zmeură",hr:"Malina",fr:"Framboise",es:"Frambuesa",it:"Lampone",pt:"Framboesa",no:"Bringebær",sv:"Hallon",da:"Hindbær",fi:"Vadelma",nl:"Framboos",lv:"Avene",et:"Vaarikas",lt:"Avietė"}, kal:52, pro:1.2, karb:12, yag:0.7, lif:6.5, sod:1, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"raspberries", katkiMaddeleri:[] },
{ ad:"Red Wine (Kırmızı Şarap)", adler:{tr:"Kırmızı Şarap",de:"Rotwein",el:"Κόκκινο Κρασί",hu:"Vörösbor",pl:"Czerwone Wino",cs:"Červené Víno",ro:"Vin Roșu",hr:"Crno Vino",fr:"Vin Rouge",es:"Vino Tinto",it:"Vino Rosso",pt:"Vinho Tinto",no:"Rødvin",sv:"Rödvin",da:"Rødvin",fi:"Punaviini",nl:"Rode Wijn",lv:"Sarkanvīns",et:"Punane Vein",lt:"Raudonas Vynas"}, kal:85, pro:0.1, karb:2.6, yag:0, lif:0, sod:6, por:150, kat:"Drinks", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","lv","et","lt"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"grapes, E220", katkiMaddeleri:[{kod:"E220",ad:"Sulphur dioxide",tehlikeli:true,aciklama:"May cause allergic reactions."}] },
// ── TR ──
{ ad:"Roka Salatası", kal:25, pro:2.6, karb:3.7, yag:0.7, lif:1.6, sod:27, por:100, kat:"Salata", ulke:"tr", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"roka, zeytinyağı, limon, parmesan, tuz", katkiMaddeleri:[] },
{ ad:"Rosto (Dana)", kal:225, pro:26, karb:3, yag:12, lif:0.5, sod:480, por:150, kat:"Et", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"dana eti, soğan, domates, zeytinyağı, tuz, baharat", katkiMaddeleri:[] },
{ ad:"Revani", kal:298, pro:5, karb:52, yag:9, lif:1, sod:120, por:100, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"irmik, yumurta, yoğurt, un, şeker şerbeti, limon", katkiMaddeleri:[] },
// ── DE ──
{ ad:"Rollmops DE", kal:165, pro:18, karb:3, yag:9, lif:0, sod:980, por:80, kat:"Fisch", ulke:"de", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"Heringsfilet, Essig, Senf, Gurke, Zwiebeln, E220", katkiMaddeleri:[{kod:"E220",ad:"Schwefeldioxid",tehlikeli:true,aciklama:"Kann allergische Reaktionen auslösen."}] },
{ ad:"Reibekuchen DE", kal:225, pro:5, karb:28, yag:11, lif:2.5, sod:380, por:150, kat:"Mehlspeisen", ulke:"de", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Kartoffeln, Mehl, Eier, Zwiebel, Salz, Öl", katkiMaddeleri:[] },
// ── FR ──
{ ad:"Ratatouille FR", kal:88, pro:2.5, karb:12, yag:4, lif:4, sod:280, por:200, kat:"Légumes", ulke:"fr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"aubergine, courgette, poivron, tomate, oignon, ail, huile", katkiMaddeleri:[] },
{ ad:"Raclette FR", kal:335, pro:22, karb:1, yag:28, lif:0, sod:680, por:100, kat:"Fromages", ulke:"fr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"fromage à raclette, pommes de terre, charcuterie", katkiMaddeleri:[] },
// ── IT ──
{ ad:"Ribollita IT", kal:115, pro:5, karb:18, yag:4, lif:6, sod:480, por:300, kat:"Zuppe", ulke:"it", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"cavolo nero, fagioli, pane raffermo, verdure, olio, sale", katkiMaddeleri:[] },
{ ad:"Risotto ai Funghi IT", kal:225, pro:7, karb:38, yag:7, lif:2.5, sod:480, por:250, kat:"Riso", ulke:"it", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"riso Arborio, porcini, cipolla, parmigiano, burro, vino, sale", katkiMaddeleri:[] },
// ── ES ──
{ ad:"Rabo de Toro ES", kal:285, pro:22, karb:8, yag:18, lif:2, sod:520, por:300, kat:"Plato", ulke:"es", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"rabo de toro, vino tinto, verduras, especias, aceite", katkiMaddeleri:[] },
// ── EL ──
{ ad:"Ρεβυθάδα", adLatin:"Revithada", kal:195, pro:9, karb:28, yag:6, lif:8, sod:380, por:250, kat:"Ospriolahaniko", ulke:"el", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"revithia, kremidi, elaiolado, dafni, rigani, alati", katkiMaddeleri:[] },
// ── EN ──
{ ad:"Roast Beef EN", kal:265, pro:30, karb:0, yag:16, lif:0, sod:68, por:150, kat:"Roast", ulke:"en", tokPuan:72, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"beef sirloin, salt, pepper, mustard", katkiMaddeleri:[] },
{ ad:"Rhubarb Crumble EN", kal:285, pro:3.5, karb:46, yag:11, lif:2.5, sod:185, por:150, kat:"Dessert", ulke:"en", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"rhubarb, flour, butter, oats, sugar", katkiMaddeleri:[] },
// ── DA ──
{ ad:"Rødgrød med Fløde DA", kal:155, pro:2, karb:32, yag:4, lif:3, sod:22, por:150, kat:"Dessert", ulke:"da", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"bær, sukker, maizena, fløde", katkiMaddeleri:[] },
{ ad:"Rugbrød DA", kal:215, pro:8, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Brod", ulke:"da", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"rugmel, vand, surdej, salt, rugkerner", katkiMaddeleri:[] },
// ── NO ──
{ ad:"Rømmegrøt NO", kal:285, pro:4, karb:18, yag:22, lif:0, sod:280, por:150, kat:"Dessert", ulke:"no", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"rømme, mel, melk, sukker, salt, smør", katkiMaddeleri:[] },
{ ad:"Rakfisk NO", kal:195, pro:22, karb:0, yag:12, lif:0, sod:1200, por:80, kat:"Fisk", ulke:"no", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"ørret eller røye, salt, gjæring", katkiMaddeleri:[] },
// ── SV ──
{ ad:"Raggmunk SV", kal:215, pro:5, karb:28, yag:10, lif:2.5, sod:380, por:150, kat:"Kött", ulke:"sv", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"potatis, mjöl, ägg, mjölk, salt, smör, lingon, fläsk", katkiMaddeleri:[] },
{ ad:"Rödbetssallad SV", kal:65, pro:1.5, karb:14, yag:0.2, lif:3, sod:380, por:100, kat:"Sallader", ulke:"sv", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"rödbetor, ättika, socker, salt", katkiMaddeleri:[] },
// ── FI ──
{ ad:"Ruisleipä FI", kal:215, pro:7.5, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Leipa", ulke:"fi", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ruisjauho, vesi, suola, hapanjuuri", katkiMaddeleri:[] },
{ ad:"Riisipuuro FI", kal:115, pro:2.8, karb:22, yag:2.5, lif:0.3, sod:45, por:200, kat:"Jouluruoat", ulke:"fi", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"riisi, maito, suola", katkiMaddeleri:[] },
// ── NL ──
{ ad:"Rookworst NL", marka:"Unox", kal:295, pro:14, karb:3, yag:26, lif:0, sod:1050, por:100, kat:"Worst", ulke:"nl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"varkensvlees, water, zout, E250, E451, kruiden", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitriet",tehlikeli:true,aciklama:"In hoge doses kankerverwekkend."},{kod:"E451",ad:"Trifosfaten",tehlikeli:false,aciklama:"Vochtbehouder."}] },
// ── BE ──
{ ad:"Rijsttaart BE", kal:265, pro:7, karb:42, yag:9, lif:1, sod:185, por:100, kat:"Gebak", ulke:"be", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"rijstepap, melk, eieren, suiker, boter, deeg, vanillesuiker", katkiMaddeleri:[] },
// ── AT ──
{ ad:"Rindsgulasch AT", kal:225, pro:20, karb:8, yag:13, lif:2, sod:480, por:250, kat:"Fleisch", ulke:"at", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"Rindfleisch, Zwiebeln, Paprika, Kümmel, Majoran, Salz", katkiMaddeleri:[] },
// ── PL ──
{ ad:"Rosół PL", adLatin:"Rosol PL", kal:28, pro:3.5, karb:0.5, yag:1, lif:0, sod:380, por:250, kat:"Zupy", ulke:"pl", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"kura, marchew, pietruszka, seler, sól, lubczyk", katkiMaddeleri:[] },
// ── CS ──
{ ad:"Rohlík CS", adLatin:"Rohlik CS", kal:265, pro:9, karb:52, yag:2, lif:2.5, sod:480, por:60, kat:"Pecivo", ulke:"cs", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"mouka, voda, sůl, droždí", katkiMaddeleri:[] },
// ── HU ──
{ ad:"Rétes HU (Almás)", adLatin:"Retes HU Almas", kal:265, pro:4.5, karb:42, yag:11, lif:2, sod:165, por:100, kat:"Sutemeny", ulke:"hu", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"rétestészta, alma, cukor, fahéj, zsemlemorzsa, vaj", katkiMaddeleri:[] },
// ── RO ──
{ ad:"Rasolul RO (Carne Fiartă)", adLatin:"Rasolul RO", kal:185, pro:22, karb:3, yag:9, lif:0.8, sod:380, por:150, kat:"Mancare", ulke:"ro", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"carne de vita, morcov, ceapa, patrunjel, sare", katkiMaddeleri:[] },
// ── HR ──
{ ad:"Riblja Juha HR", adLatin:"Riblja Juha HR", kal:65, pro:7, karb:5, yag:2.5, lif:1, sod:480, por:300, kat:"Jela", ulke:"hr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"mješana riba, luk, mrkva, maslinovo ulje, peršin, sol", katkiMaddeleri:[] },
// ── PT ──
{ ad:"Rojões PT", kal:398, pro:22, karb:2, yag:35, lif:0, sod:680, por:150, kat:"Carne", ulke:"pt", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"entremeada de porco, vinho, alho, louro, sal, pimenta", katkiMaddeleri:[] },
// ── LV ──
{ ad:"Rūgušpiens LV", adLatin:"Ruguspiens LV", kal:55, pro:3.5, karb:4.2, yag:2, lif:0, sod:50, por:200, kat:"Piena Produkti", ulke:"lv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"piens, kultūras", katkiMaddeleri:[] },
// ── ET ──
{ ad:"Rukkileib ET", adLatin:"Rukkileib ET", kal:215, pro:7.5, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Leib", ulke:"et", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"rukkijahu, vesi, sool, hapujuuretis", katkiMaddeleri:[] },
// ── LT ──
{ ad:"Rauginti Kopūstai LT", adLatin:"Rauginti Kopustai LT", kal:19, pro:0.9, karb:4.3, yag:0.1, lif:2.5, sod:661, por:100, kat:"Rauginiai", ulke:"lt", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"kopūstai, druska", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// S HARFİ
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"Salmon (Somon)", adler:{tr:"Somon",de:"Lachs",el:"Σολομός",hu:"Lazac",pl:"Łosoś",cs:"Losos",ro:"Somon",hr:"Losos",fr:"Saumon",es:"Salmón",it:"Salmone",pt:"Salmão",no:"Laks",sv:"Lax",da:"Laks",fi:"Lohi",nl:"Zalm",lv:"Lasis",et:"Lõhe",lt:"Lašiša"}, kal:208, pro:20, karb:0, yag:13, lif:0, sod:59, por:100, kat:"Fish", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"salmon", katkiMaddeleri:[] },
{ ad:"Spinach (Ispanak)", adler:{tr:"Ispanak",de:"Spinat",el:"Σπανάκι",hu:"Spenót",pl:"Szpinak",cs:"Špenát",ro:"Spanac",hr:"Špinat",fr:"Épinard",es:"Espinaca",it:"Spinaci",pt:"Espinafre",no:"Spinat",sv:"Spenat",da:"Spinat",fi:"Pinaatti",nl:"Spinazie",lv:"Spināti",et:"Spinat",lt:"Špinatai"}, kal:23, pro:2.9, karb:3.6, yag:0.4, lif:2.2, sod:79, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"spinach", katkiMaddeleri:[] },
{ ad:"Strawberry (Çilek)", adler:{tr:"Çilek",de:"Erdbeere",el:"Φράουλα",hu:"Eper",pl:"Truskawka",cs:"Jahoda",ro:"Căpșună",hr:"Jagoda",fr:"Fraise",es:"Fresa",it:"Fragola",pt:"Morango",no:"Jordbær",sv:"Jordgubbe",da:"Jordbær",fi:"Mansikka",nl:"Aardbei",lv:"Zemene",et:"Maasikas",lt:"Braškė"}, kal:32, pro:0.7, karb:7.7, yag:0.3, lif:2, sod:1, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"strawberries", katkiMaddeleri:[] },
{ ad:"Sunflower Oil (Ayçiçek Yağı)", adler:{tr:"Ayçiçek Yağı",de:"Sonnenblumenöl",el:"Ηλιέλαιο",hu:"Napraforgóolaj",pl:"Olej Słonecznikowy",cs:"Slunečnicový Olej",ro:"Ulei de Floarea-Soarelui",hr:"Suncokretovo Ulje",fr:"Huile de Tournesol",es:"Aceite de Girasol",it:"Olio di Girasole",pt:"Óleo de Girassol",no:"Solsikkeolje",sv:"Solrosolja",da:"Solsikkeolie",fi:"Auringonkukkaöljy",nl:"Zonnebloemolie",lv:"Saulespuķu Eļļa",et:"Päevalilleõli",lt:"Saulėgrąžų Aliejus"}, kal:884, pro:0, karb:0, yag:100, lif:0, sod:0, por:10, kat:"Oil", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"sunflower oil", katkiMaddeleri:[] },
{ ad:"Sour Cream (Ekşi Krema)", adler:{tr:"Ekşi Krema",de:"Saure Sahne",el:"Ξινή Κρέμα",hu:"Tejföl",pl:"Śmietana Kwaśna",cs:"Zakysaná Smetana",ro:"Smântână",hr:"Kiselo Vrhnje",fr:"Crème Fraîche",es:"Nata Agria",it:"Panna Acida",pt:"Nata Azeda",no:"Rømme",sv:"Gräddfil",da:"Creme Fraiche",fi:"Kermaviili",nl:"Zure Room",lv:"Skābais Krējums",et:"Hapukoor",lt:"Grietinė"}, kal:198, pro:3, karb:3.8, yag:20, lif:0, sod:55, por:100, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"cream, cultures", katkiMaddeleri:[] },
// ── TR ──
{ ad:"Sucuk", kal:415, pro:22, karb:2, yag:36, lif:0, sod:1680, por:30, kat:"Et", ulke:"tr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"sığır eti, kuyruk yağı, sarımsak, baharatlar, E250, E252", katkiMaddeleri:[{kod:"E250",ad:"Sodyum nitrit",tehlikeli:true,aciklama:"Yüksek miktarda kanserojen."},{kod:"E252",ad:"Potasyum nitrat",tehlikeli:true,aciklama:"Yüksek miktarda zararlı."}] },
{ ad:"Sarma (Et)", kal:175, pro:11, karb:14, yag:9, lif:3.5, sod:420, por:200, kat:"Et", ulke:"tr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"lahana, kıyma, pirinç, soğan, domates suyu, baharat", katkiMaddeleri:[] },
{ ad:"Sütlaç", kal:125, pro:3.8, karb:20, yag:3.8, lif:0, sod:55, por:150, kat:"Tatlı", ulke:"tr", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"süt, pirinç, şeker, vanilya", katkiMaddeleri:[] },
{ ad:"Simit", kal:298, pro:10, karb:58, yag:4, lif:3, sod:480, por:100, kat:"Ekmek", ulke:"tr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"un, susam, pekmez, maya, tuz", katkiMaddeleri:[] },
{ ad:"Soğuk Çorba (Tarator)", kal:88, pro:3.5, karb:8, yag:5, lif:1, sod:280, por:250, kat:"Çorba", ulke:"tr", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"yoğurt, salatalık, sarımsak, ceviz, dereotu, zeytinyağı", katkiMaddeleri:[] },
{ ad:"Süzme Yoğurt", kal:95, pro:8.5, karb:5, yag:4.5, lif:0, sod:50, por:150, kat:"Süt Ürünleri", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"yoğurt", katkiMaddeleri:[] },
// ── DE ──
{ ad:"Sauerbraten DE", kal:265, pro:26, karb:8, yag:14, lif:1.5, sod:520, por:250, kat:"Fleisch", ulke:"de", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"Rindfleisch, Essig, Rotwein, Zwiebeln, Gewürze, Lebkuchen", katkiMaddeleri:[] },
{ ad:"Sauerkraut DE", kal:19, pro:0.9, karb:4.3, yag:0.1, lif:2.5, sod:661, por:100, kat:"Fermentiertes", ulke:"de", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"Weißkohl, Salz", katkiMaddeleri:[] },
{ ad:"Schnitzel DE", kal:325, pro:26, karb:14, yag:20, lif:1, sod:420, por:150, kat:"Fleisch", ulke:"de", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"Schweinefleisch, Ei, Mehl, Semmelbrösel, Salz, Pfeffer", katkiMaddeleri:[] },
// ── FR ──
{ ad:"Soupe à l'Oignon FR", kal:88, pro:3, karb:12, yag:3.5, lif:1.5, sod:480, por:300, kat:"Soupes", ulke:"fr", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"oignons, bouillon, pain gratiné, gruyère, beurre, sel", katkiMaddeleri:[] },
{ ad:"Steak Tartare FR", kal:195, pro:22, karb:2, yag:12, lif:0.5, sod:420, por:150, kat:"Viande", ulke:"fr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"boeuf cru haché, oeuf, câpres, cornichons, moutarde, sel", katkiMaddeleri:[] },
// ── IT ──
{ ad:"Saltimbocca IT", kal:245, pro:26, karb:3, yag:15, lif:0.3, sod:480, por:150, kat:"Carne", ulke:"it", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"scaloppine di vitello, prosciutto crudo, salvia, vino bianco", katkiMaddeleri:[] },
{ ad:"Stracciatella IT", kal:185, pro:8, karb:14, yag:11, lif:0, sod:185, por:100, kat:"Gelato", ulke:"it", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"panna, latte, zucchero, cioccolato fondente, E471", katkiMaddeleri:[{kod:"E471",ad:"Monogliceridi",tehlikeli:false,aciklama:"Emulsionante."}] },
// ── ES ──
{ ad:"Salmorejo ES", kal:125, pro:2.5, karb:14, yag:7, lif:2, sod:380, por:250, kat:"Sopas Frías", ulke:"es", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"tomates, pan, ajo, aceite, vinagre, jamón, huevo duro", katkiMaddeleri:[] },
{ ad:"Sobrasada ES", kal:448, pro:15, karb:2, yag:43, lif:0, sod:1580, por:30, kat:"Embutidos", ulke:"es", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"carne de cerdo, pimentón, sal, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrito sódico",tehlikeli:true,aciklama:"En altas dosis puede ser cancerígeno."}] },
// ── EL ──
{ ad:"Σαγανάκι Γαρίδες", adLatin:"Saganaki Garides", kal:185, pro:16, karb:5, yag:11, lif:1, sod:580, por:200, kat:"Thalassina", ulke:"el", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"garides, feta, tomates, ouzo, elaiolado, basilikas", katkiMaddeleri:[] },
{ ad:"Σταμναγκάθι", adLatin:"Stamnagkathi", kal:35, pro:2.5, karb:5, yag:0.8, lif:3.5, sod:45, por:150, kat:"Chorta", ulke:"el", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"stamnagkathi, elaiolado, lemoni", katkiMaddeleri:[] },
// ── EN ──
{ ad:"Shepherd's Pie EN", kal:225, pro:16, karb:20, yag:10, lif:3, sod:480, por:300, kat:"Dish", ulke:"en", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"lamb mince, mashed potato, onion, carrot, peas, gravy", katkiMaddeleri:[] },
{ ad:"Scones EN", kal:348, pro:7, karb:52, yag:14, lif:2, sod:380, por:60, kat:"Baked Goods", ulke:"en", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"flour, butter, milk, sugar, E503", katkiMaddeleri:[{kod:"E503",ad:"Ammonium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },
// ── DA ──
{ ad:"Stegt Flæsk DA", kal:395, pro:22, karb:0, yag:35, lif:0, sod:480, por:100, kat:"Kød", ulke:"da", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"svinekam, salt", katkiMaddeleri:[] },
{ ad:"Smørrebrød DA", kal:285, pro:12, karb:28, yag:14, lif:3, sod:580, por:150, kat:"Smorrebrod", ulke:"da", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"rugbrød, smør, pålæg, diverse toppings", katkiMaddeleri:[] },
// ── NO ──
{ ad:"Sodd NO", kal:125, pro:12, karb:8, yag:5.5, lif:1.5, sod:480, por:300, kat:"Suppe", ulke:"no", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"lammekjøtt, poteter, gulrot, kålrot, salt, pepper", katkiMaddeleri:[] },
{ ad:"Smalahove NO", kal:285, pro:24, karb:0, yag:20, lif:0, sod:680, por:200, kat:"Tradisjonsmat", ulke:"no", tokPuan:60, aclikSuresi:"3-4 saat", onay:true, yildiz:3, icerik:"sauehovud, salt", katkiMaddeleri:[] },
// ── SV ──
{ ad:"Smörgåsbord SV", kal:285, pro:15, karb:18, yag:18, lif:2, sod:680, por:250, kat:"Buffé", ulke:"sv", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"sill, lax, köttbullar, janssons, ägg, bröd", katkiMaddeleri:[] },
{ ad:"Surströmming SV", kal:88, pro:16, karb:0, yag:2.5, lif:0, sod:2200, por:80, kat:"Fisk", ulke:"sv", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"sill, salt, surning", katkiMaddeleri:[] },
// ── FI ──
{ ad:"Salmiak FI (Lakritsi)", kal:330, pro:4, karb:78, yag:0.5, lif:0, sod:680, por:30, kat:"Makeiset", ulke:"fi", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"lakritsijuuri, salmiaakki, sokeri, E415", katkiMaddeleri:[{kod:"E415",ad:"Ksantaanikumi",tehlikeli:false,aciklama:"Sakeuttamisaine."}] },
{ ad:"Siika FI (Grillattuna)", kal:145, pro:20, karb:0, yag:7, lif:0, sod:52, por:150, kat:"Kala", ulke:"fi", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"siika, suola", katkiMaddeleri:[] },
// ── NL ──
{ ad:"Stroopwafel NL", marka:"Daelmans", kal:448, pro:4, karb:68, yag:19, lif:1.5, sod:185, por:32, kat:"Koek", ulke:"nl", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"bloem, stroop, boter, suiker, kaneel, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono en diglyceriden",tehlikeli:false,aciklama:"Emulgator."}] },
{ ad:"Snert NL (Erwtensoep)", kal:125, pro:8, karb:18, yag:3, lif:6, sod:520, por:300, kat:"Soep", ulke:"nl", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"spliterwten, rookworst, prei, selderij, zout", katkiMaddeleri:[] },
// ── BE ──
{ ad:"Stoemp BE", kal:165, pro:5.5, karb:22, yag:6.5, lif:5, sod:380, por:300, kat:"Groenten", ulke:"be", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"aardappelen, groenten, boter, zout", katkiMaddeleri:[] },
{ ad:"Speculoos BE", marka:"Lotus", kal:498, pro:6, karb:68, yag:24, lif:2.5, sod:380, por:30, kat:"Koek", ulke:"be", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"bloem, suiker, boter, speculaaskruiden, E471, E500", katkiMaddeleri:[{kod:"E471",ad:"Mono en diglyceriden",tehlikeli:false,aciklama:"Emulgator."},{kod:"E500",ad:"Natriumcarbonaten",tehlikeli:false,aciklama:"Rijsmiddel."}] },
// ── AT ──
{ ad:"Schweinsbraten AT", kal:298, pro:26, karb:2, yag:21, lif:0, sod:480, por:200, kat:"Fleisch", ulke:"at", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"Schweinsbraten, Kümmel, Knoblauch, Bier, Salz", katkiMaddeleri:[] },
// ── PL ──
{ ad:"Bigos Staropolski S", adLatin:"Bigos Staropolski S", kal:175, pro:11, karb:13, yag:9, lif:4.5, sod:720, por:300, kat:"Dania Glowne", ulke:"pl", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kapusta kiszona, kiełbasa, grzyby, śliwki, E250", katkiMaddeleri:[{kod:"E250",ad:"Azotyn sodu",tehlikeli:true,aciklama:"W duzych ilosciach moze byc rakotwórczy."}] },
{ ad:"Smalec PL", adLatin:"Smalec PL", kal:745, pro:6, karb:2, yag:80, lif:0, sod:280, por:20, kat:"Tluszcze", ulke:"pl", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"smalec wieprzowy, cebula, majeranek, sól", katkiMaddeleri:[] },
// ── CS ──
{ ad:"Svíčková CS", adLatin:"Svickova CS", kal:285, pro:20, karb:18, yag:15, lif:2, sod:520, por:300, kat:"Hlavni Jidla", ulke:"cs", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"hovězí svíčková, kořenová zelenina, smetana, citron, brusinky, knedlíky", katkiMaddeleri:[] },
// ── HU ──
{ ad:"Somlói Galuska HU", adLatin:"Somloi Galuska HU", kal:395, pro:8, karb:52, yag:20, lif:2, sod:120, por:150, kat:"Dessert", ulke:"hu", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"piskóta, vanília, dió, csokoládé, tejszín, rum", katkiMaddeleri:[] },
{ ad:"Sólet HU", adLatin:"Solet HU", kal:315, pro:18, karb:32, yag:13, lif:8, sod:580, por:300, kat:"Fogások", ulke:"hu", tokPuan:70, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"bab, füstölt hús, árpagyöngy, csont, só", katkiMaddeleri:[] },
// ── RO ──
{ ad:"Sarmale RO", adLatin:"Sarmale RO", kal:195, pro:12, karb:16, yag:11, lif:3.5, sod:520, por:200, kat:"Mancare", ulke:"ro", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"varza murata, carne tocata, orez, ceapa, cimbru, sare", katkiMaddeleri:[] },
{ ad:"Stufat RO (Toba)", adLatin:"Stufat RO Toba", kal:285, pro:16, karb:5, yag:24, lif:0, sod:980, por:50, kat:"Mezeluri", ulke:"ro", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"sange porc, carne, sare, piper, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrit de sodiu",tehlikeli:true,aciklama:"In doze mari poate fi cancerigen."}] },
// ── HR ──
{ ad:"Soparnik HR", adLatin:"Soparnik HR", kal:185, pro:5, karb:28, yag:7, lif:4, sod:380, por:150, kat:"Jela", ulke:"hr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"šunka blitva ili raštika, tijesto, maslinovo ulje, sol", katkiMaddeleri:[] },
{ ad:"Slavonska Kobasica HR", adLatin:"Slavonska Kobasica HR", kal:385, pro:20, karb:2, yag:34, lif:0, sod:1480, por:50, kat:"Kobasice", ulke:"hr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"svinjina, sol, češnjak, paprika, E250", katkiMaddeleri:[{kod:"E250",ad:"Natrijev nitrit",tehlikeli:true,aciklama:"U visokim dozama može biti kancerogen."}] },
// ── PT ──
{ ad:"Sardinhas Assadas PT", kal:185, pro:22, karb:0, yag:11, lif:0, sod:280, por:150, kat:"Peixe", ulke:"pt", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"sardinhas, sal, azeite, limão", katkiMaddeleri:[] },
{ ad:"Sopa de Pedra PT", kal:145, pro:8, karb:20, yag:4.5, lif:6, sod:580, por:350, kat:"Sopas", ulke:"pt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"feijão, chouriço, entrecosto, batata, couve, cebola, sal", katkiMaddeleri:[] },
// ── LV ──
{ ad:"Speķa Pīrāgi LV", adLatin:"Speka Piragi LV", kal:285, pro:9, karb:38, yag:13, lif:2, sod:480, por:80, kat:"Maizes Izstrādājumi", ulke:"lv", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"kviešu milti, speķis, sīpoli, sviests, raugs, sāls", katkiMaddeleri:[] },
{ ad:"Siļķe LV (Iesālīta)", adLatin:"Silke LV", kal:158, pro:18, karb:0, yag:9, lif:0, sod:980, por:80, kat:"Zivis", ulke:"lv", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"siļķe, sāls", katkiMaddeleri:[] },
// ── ET ──
{ ad:"Seljanka ET", adLatin:"Seljanka ET", kal:88, pro:6, karb:6, yag:4.5, lif:1.5, sod:580, por:300, kat:"Supid", ulke:"et", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"liha, kurk, kappar, sibul, tomatipüree, sool", katkiMaddeleri:[] },
// ── LT ──
{ ad:"Šaltibarščiai LT", adLatin:"Saltibarsciai LT", kal:65, pro:2.5, karb:8, yag:2.5, lif:1.5, sod:380, por:300, kat:"Sriubos", ulke:"lt", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"kefyras, burokėliai, agurkai, kiaušiniai, krapai", katkiMaddeleri:[] },
{ ad:"Skilandis LT", adLatin:"Skilandis LT", kal:385, pro:22, karb:2, yag:33, lif:0, sod:1480, por:50, kat:"Mėsos Gaminiai", ulke:"lt", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"kiaulienos mėsa, druska, česnakas, pipirai, rūkymas", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Ş HARFİ (Türkçe'ye özgü)
// ══════════════════════════════════════════════════════
{ ad:"Şiş Köfte", kal:265, pro:22, karb:4, yag:18, lif:0.5, sod:380, por:150, kat:"Et", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"dana kıyma, soğan, maydanoz, tuz, karabiber", katkiMaddeleri:[] },
{ ad:"Şiş Kebap", kal:248, pro:22, karb:2, yag:17, lif:0, sod:280, por:150, kat:"Et", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kuzu eti, zeytinyağı, kekik, tuz", katkiMaddeleri:[] },
{ ad:"Şarap (Türk Kırmızı)", kal:85, pro:0.1, karb:2.6, yag:0, lif:0, sod:6, por:150, kat:"İçecek", ulke:"tr", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"üzüm, E220", katkiMaddeleri:[{kod:"E220",ad:"Kükürt dioksit",tehlikeli:true,aciklama:"Alerjik reaksiyona neden olabilir."}] },
{ ad:"Şekerpare", kal:342, pro:5.5, karb:48, yag:15, lif:1.5, sod:120, por:80, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"un, tereyağı, yumurta, nişasta, şeker şerbeti, fıstık", katkiMaddeleri:[] },
{ ad:"Şalgam Suyu", kal:18, pro:0.5, karb:4, yag:0.1, lif:0.5, sod:480, por:200, kat:"İçecek", ulke:"tr", tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"şalgam, su, tuz, bulgur, E330", katkiMaddeleri:[{kod:"E330",ad:"Sitrik asit",tehlikeli:false,aciklama:"Asitlik düzenleyici."}] },
{ ad:"Şıra", kal:62, pro:0.5, karb:15, yag:0, lif:0.5, sod:5, por:200, kat:"İçecek", ulke:"tr", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"taze üzüm suyu", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// T HARFİ
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"Tomato (Domates)", adler:{tr:"Domates",de:"Tomate",el:"Ντομάτα",hu:"Paradicsom",pl:"Pomidor",cs:"Rajče",ro:"Roșie",hr:"Rajčica",fr:"Tomate",es:"Tomate",it:"Pomodoro",pt:"Tomate",no:"Tomat",sv:"Tomat",da:"Tomat",fi:"Tomaatti",nl:"Tomaat",lv:"Tomāts",et:"Tomat",lt:"Pomidoras"}, kal:18, pro:0.9, karb:3.9, yag:0.2, lif:1.2, sod:5, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"tomato", katkiMaddeleri:[] },
{ ad:"Tuna (Ton Balığı)", adler:{tr:"Ton Balığı",de:"Thunfisch",el:"Τόνος",hu:"Tonhal",pl:"Tuńczyk",cs:"Tuňák",ro:"Ton",hr:"Tuna",fr:"Thon",es:"Atún",it:"Tonno",pt:"Atum",no:"Tunfisk",sv:"Tonfisk",da:"Tunfisk",fi:"Tonnikala",nl:"Tonijn",lv:"Tunzivs",et:"Tuunikala",lt:"Tunas"}, kal:144, pro:30, karb:0, yag:2.5, lif:0, sod:420, por:100, kat:"Fish", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"tuna in water, salt", katkiMaddeleri:[] },
{ ad:"Turkey (Hindi)", adler:{tr:"Hindi",de:"Truthahn",el:"Γαλοπούλα",hu:"Pulyka",pl:"Indyk",cs:"Krůta",ro:"Curcan",hr:"Purica",fr:"Dinde",es:"Pavo",it:"Tacchino",pt:"Peru",no:"Kalkun",sv:"Kalkon",da:"Kalkun",fi:"Kalkkuna",nl:"Kalkoen",lv:"Tītars",et:"Kalkun",lt:"Kalakutas"}, kal:165, pro:25, karb:0, yag:7, lif:0, sod:72, por:100, kat:"Meat", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"turkey", katkiMaddeleri:[] },
{ ad:"Tahini", adler:{tr:"Tahin",de:"Tahini",el:"Ταχίνι",hu:"Tahini",pl:"Tahini",cs:"Tahini",ro:"Tahini",hr:"Tahini",fr:"Tahini",es:"Tahini",it:"Tahini",pt:"Tahini",no:"Tahini",sv:"Tahini",da:"Tahini",fi:"Tahini",nl:"Tahini",lv:"Tahīni",et:"Tahini",lt:"Tahinis"}, kal:595, pro:17, karb:21, yag:54, lif:9, sod:17, por:30, kat:"Paste", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"sesame seeds", katkiMaddeleri:[] },
// ── TR ──
{ ad:"Tavuk Çorbası", kal:65, pro:5.5, karb:6, yag:2, lif:0.5, sod:480, por:250, kat:"Çorba", ulke:"tr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"tavuk, sebze, tuz, arpa şehriye", katkiMaddeleri:[] },
{ ad:"Tavuk Döner", kal:215, pro:20, karb:16, yag:9, lif:1.5, sod:420, por:200, kat:"Et", ulke:"tr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"tavuk eti, ekmek, sebze, yoğurt sosu", katkiMaddeleri:[] },
{ ad:"Tarhana Çorbası", kal:88, pro:4, karb:15, yag:2, lif:2, sod:520, por:250, kat:"Çorba", ulke:"tr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"tarhana, domates, biber, soğan, yoğurt, tereyağı", katkiMaddeleri:[] },
{ ad:"Tarator", kal:52, pro:3.5, karb:3.8, yag:2.5, lif:0.5, sod:280, por:150, kat:"Meze", ulke:"tr", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"yoğurt, salatalık, sarımsak, nane, dereotu, tuz", katkiMaddeleri:[] },
{ ad:"Turşu (Karışık)", kal:22, pro:1, karb:4.5, yag:0.2, lif:1.5, sod:1200, por:50, kat:"Turşu", ulke:"tr", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"salatalık, lahana, havuç, biber, sirke, tuz, sarımsak", katkiMaddeleri:[] },
{ ad:"Tel Kadayıf", kal:355, pro:5.5, karb:52, yag:15, lif:1.5, sod:95, por:100, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"tel kadayıf, tereyağı, şeker şerbeti, antep fıstığı", katkiMaddeleri:[] },
{ ad:"Tepsi Böreği", kal:325, pro:10, karb:34, yag:18, lif:1.5, sod:580, por:150, kat:"Hamur İşleri", ulke:"tr", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"yufka, beyaz peynir, yumurta, süt, tereyağı", katkiMaddeleri:[] },
// ── DE ──
{ ad:"Tafelspitz DE", kal:195, pro:26, karb:0, yag:10, lif:0, sod:68, por:200, kat:"Fleisch", ulke:"de", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"Tafelspitz, Wurzelgemüse, Meerrettich, Salz", katkiMaddeleri:[] },
{ ad:"Thüringer Rostbratwurst DE", kal:335, pro:16, karb:3, yag:29, lif:0, sod:980, por:100, kat:"Wurst", ulke:"de", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"Schweinefleisch, Majoran, Kümmel, Knoblauch, Salz, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."},{kod:"E451",ad:"Triphosphate",tehlikeli:false,aciklama:"Feuchthaltemittel."}] },
{ ad:"Topfenstrudel DE", kal:285, pro:9, karb:38, yag:13, lif:1.5, sod:185, por:100, kat:"Mehlspeisen", ulke:"de", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Strudelteig, Topfen, Zucker, Eier, Rosinen, Butter", katkiMaddeleri:[] },
// ── FR ──
{ ad:"Tarte Tatin FR", kal:315, pro:3.5, karb:46, yag:14, lif:2.5, sod:185, por:100, kat:"Pâtisserie", ulke:"fr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"pommes, pâte feuilletée, beurre, sucre, cannelle", katkiMaddeleri:[] },
{ ad:"Terrine de Campagne FR", kal:315, pro:18, karb:2, yag:28, lif:0.5, sod:980, por:50, kat:"Charcuterie", ulke:"fr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"porc, foie, lard, cognac, herbes, sel, E250", katkiMaddeleri:[{kod:"E250",ad:"Nitrite de sodium",tehlikeli:true,aciklama:"En grande quantité peut être cancérigène."}] },
// ── IT ──
{ ad:"Tiramisù IT", kal:395, pro:7, karb:38, yag:25, lif:0.5, sod:185, por:100, kat:"Dolci", ulke:"it", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"mascarpone, uova, savoiardi, caffè, zucchero, cacao", katkiMaddeleri:[] },
{ ad:"Tagliatelle al Ragù IT", kal:355, pro:16, karb:48, yag:12, lif:3, sod:520, por:250, kat:"Pasta", ulke:"it", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"tagliatelle, ragù di manzo, parmigiano, vino rosso", katkiMaddeleri:[] },
// ── ES ──
{ ad:"Tortilla Española ES", kal:195, pro:10, karb:14, yag:13, lif:1.5, sod:380, por:150, kat:"Tapas", ulke:"es", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"huevos, patatas, cebolla, aceite de oliva, sal", katkiMaddeleri:[] },
{ ad:"Turrón ES", kal:468, pro:9, karb:58, yag:24, lif:2.5, sod:45, por:50, kat:"Dulces", ulke:"es", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"almendras, miel, clara de huevo, azúcar", katkiMaddeleri:[] },
// ── EL ──
{ ad:"Τζατζίκι", adLatin:"Tzatziki", kal:65, pro:4.5, karb:4.5, yag:3, lif:0.5, sod:280, por:150, kat:"Mezedes", ulke:"el", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"giaourti, aggouria, skordho, elaiolado, anithos, alati", katkiMaddeleri:[] },
{ ad:"Τηγανητές Πατάτες", adLatin:"Tiganites Patates", kal:312, pro:3.4, karb:41, yag:15, lif:3.8, sod:480, por:150, kat:"Orektika", ulke:"el", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"patates, elaiolado, alati", katkiMaddeleri:[] },
// ── EN ──
{ ad:"Toad in the Hole EN", kal:298, pro:14, karb:28, yag:16, lif:1.5, sod:580, por:250, kat:"Dish", ulke:"en", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"pork sausages, Yorkshire pudding batter, onion gravy, E250", katkiMaddeleri:[{kod:"E250",ad:"Sodium nitrite",tehlikeli:true,aciklama:"In high amounts may be carcinogenic."}] },
{ ad:"Treacle Tart EN", kal:342, pro:3.5, karb:56, yag:13, lif:1.5, sod:285, por:80, kat:"Dessert", ulke:"en", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"golden syrup, breadcrumbs, shortcrust pastry, lemon", katkiMaddeleri:[] },
// ── DA ──
{ ad:"Torsk DA (Kogt)", kal:82, pro:18, karb:0, yag:0.7, lif:0, sod:55, por:150, kat:"Fisk", ulke:"da", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"torsk, salt, citronsaft", katkiMaddeleri:[] },
{ ad:"Tærte DA (Bunde)", kal:295, pro:5.5, karb:44, yag:13, lif:1.5, sod:185, por:80, kat:"Kager", ulke:"da", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"hvedemel, smør, sukker, æg, vanille, bagepulver", katkiMaddeleri:[] },
// ── NO ──
{ ad:"Torsk NO (Ovnsbakt)", kal:82, pro:18, karb:0, yag:0.7, lif:0, sod:55, por:150, kat:"Fisk", ulke:"no", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"torsk, sitron, dill, salt", katkiMaddeleri:[] },
{ ad:"Tyttebærsyltetøy NO", kal:212, pro:0.3, karb:55, yag:0, lif:1.5, sod:8, por:20, kat:"Syltetoy", ulke:"no", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"tyttebær, sukker, E440", katkiMaddeleri:[{kod:"E440",ad:"Pektiner",tehlikeli:false,aciklama:"Gelingsmiddel."}] },
// ── SV ──
{ ad:"Toast Skagen SV", kal:295, pro:14, karb:22, yag:18, lif:2, sod:580, por:150, kat:"Forratt", ulke:"sv", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"räkor, dill, majonnäs, kaviar, rostat bröd, citron", katkiMaddeleri:[] },
// ── FI ──
{ ad:"Tatari FI (Tattaripuuro)", kal:92, pro:3.5, karb:18, yag:0.8, lif:2, sod:45, por:200, kat:"Aamupalat", ulke:"fi", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"tattarijauho, vesi, suola", katkiMaddeleri:[] },
// ── NL ──
{ ad:"Tomatensoep NL", kal:55, pro:1.5, karb:10, yag:1.5, lif:1.5, sod:480, por:300, kat:"Soep", ulke:"nl", tokPuan:30, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"tomaten, bouillon, ui, zout, basilicum", katkiMaddeleri:[] },
// ── BE ──
{ ad:"Tomatenstoofpot BE", kal:145, pro:10, karb:12, yag:7, lif:3, sod:480, por:300, kat:"Stoofpotten", ulke:"be", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"tomaten, gehakt, ui, knoflook, kruiden, zout", katkiMaddeleri:[] },
// ── AT ──
{ ad:"Tafelspitz AT", kal:195, pro:26, karb:0, yag:10, lif:0, sod:68, por:200, kat:"Fleisch", ulke:"at", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"Tafelspitz, Wurzelgemüse, Meerrettich, Schnittlauch, Salz", katkiMaddeleri:[] },
// ── PL ──
{ ad:"Twaróg PL", adLatin:"Twarog PL", kal:98, pro:11, karb:3.4, yag:4.3, lif:0, sod:364, por:100, kat:"Nabial", ulke:"pl", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"twaróg, kultury", katkiMaddeleri:[] },
{ ad:"Tatar PL (Befsztyk)", adLatin:"Tatar PL", kal:195, pro:20, karb:2, yag:12, lif:0.5, sod:420, por:100, kat:"Mieso", ulke:"pl", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"wołowina, jajko, cebula, ogórek, kapary, sól", katkiMaddeleri:[] },
// ── CS ──
{ ad:"Trdelník CS", adLatin:"Trdelnik CS", kal:385, pro:7, karb:62, yag:14, lif:2, sod:185, por:100, kat:"Dezerty", ulke:"cs", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"mouka, vejce, mléko, cukr, skořice, ořechy, droždí, máslo", katkiMaddeleri:[] },
// ── HU ──
{ ad:"Töltött Káposzta HU", adLatin:"Toltott Kaposzta HU", kal:195, pro:14, karb:16, yag:9, lif:3.5, sod:520, por:300, kat:"Fogások", ulke:"hu", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"savanyú káposzta, darált hús, rizs, tejföl, só, bors", katkiMaddeleri:[] },
{ ad:"Túrógombóc HU", adLatin:"Turogomboc HU", kal:265, pro:9, karb:32, yag:13, lif:1.5, sod:165, por:150, kat:"Dessert", ulke:"hu", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"túró, liszt, tojás, tejföl, vaj, zsemlemorzsa, cukor", katkiMaddeleri:[] },
// ── RO ──
{ ad:"Tocăniță RO", adLatin:"Tocanita RO", kal:215, pro:18, karb:8, yag:13, lif:2, sod:480, por:250, kat:"Mancare", ulke:"ro", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"carne de porc, ceapa, usturoi, rosii, vin, cimbru, sare", katkiMaddeleri:[] },
// ── HR ──
{ ad:"Travarica HR", adLatin:"Travarica HR", kal:220, pro:0, karb:0, yag:0, lif:0, sod:0, por:40, kat:"Pica", ulke:"hr", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"alkohol, ljekovito bilje", katkiMaddeleri:[] },
{ ad:"Tjestenina s Tartufima HR", adLatin:"Tjestenina s Tartufima HR", kal:348, pro:12, karb:52, yag:12, lif:3, sod:380, por:200, kat:"Tjestenina", ulke:"hr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"tjestenina, tartufi, maslinovo ulje, češnjak, sol", katkiMaddeleri:[] },
// ── PT ──
{ ad:"Tripas à Moda do Porto PT", kal:185, pro:16, karb:12, yag:9, lif:3, sod:680, por:300, kat:"Prato", ulke:"pt", tokPuan:60, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"tripas, feijão branco, chouriço, cenoura, salsa, sal", katkiMaddeleri:[] },
// ── LV ──
{ ad:"Tvaicēts Lasis LV", adLatin:"Tvaicets Lasis LV", kal:195, pro:20, karb:0, yag:12, lif:0, sod:68, por:150, kat:"Zivis", ulke:"lv", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lasis, sāls, citronskābe, dilles", katkiMaddeleri:[] },
// ── ET ──
{ ad:"Taimne Karbonaad ET", adLatin:"Taimne Karbonaad ET", kal:185, pro:14, karb:12, yag:9, lif:4, sod:380, por:100, kat:"Toidud", ulke:"et", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"taimne valk, vürtsid, jahu, sool", katkiMaddeleri:[] },
// ── LT ──
{ ad:"Tinginys LT", adLatin:"Tinginys LT", kal:448, pro:7, karb:58, yag:23, lif:3.5, sod:185, por:50, kat:"Desertas", ulke:"lt", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"sviesto sausainiai, kakao, pienas, cukrus, sviestas, riešutai", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// U HARFİ
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"Udon Noodles", adler:{tr:"Udon",de:"Udon Nudeln",el:"Ούντον",hu:"Udon",pl:"Udon",cs:"Udon",ro:"Udon",hr:"Udon",fr:"Nouilles Udon",es:"Fideos Udon",it:"Udon",pt:"Udon",no:"Udon",sv:"Udon",da:"Udon",fi:"Udon",nl:"Udon Noedels",lv:"Udon",et:"Udon",lt:"Udonas"}, kal:132, pro:4, karb:28, yag:0.5, lif:1.5, sod:5, por:100, kat:"Noodles", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"wheat flour, water, salt", katkiMaddeleri:[] },
// ── TR ──
{ ad:"Un Helvası", kal:345, pro:5.5, karb:52, yag:13, lif:1.5, sod:65, por:100, kat:"Tatlı", ulke:"tr", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"un, tereyağı, şeker, süt, çam fıstığı", katkiMaddeleri:[] },
{ ad:"Uykuluk (Dana)", kal:145, pro:14, karb:2, yag:9, lif:0, sod:280, por:100, kat:"Sakatat", ulke:"tr", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"dana timüs, zeytinyağı, limon, tuz", katkiMaddeleri:[] },
// ── DE ──
{ ad:"Ungarischer Gulasch DE", kal:225, pro:20, karb:8, yag:13, lif:2, sod:480, por:250, kat:"Fleisch", ulke:"de", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"Rindfleisch, Paprika, Zwiebeln, Tomate, Kümmel, Salz", katkiMaddeleri:[] },
// ── FR ──
{ ad:"Uhtout FR (Pain Brioché)", kal:348, pro:8, karb:52, yag:14, lif:2, sod:280, por:80, kat:"Viennoiserie", ulke:"fr", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"farine, oeufs, beurre, lait, sucre, levure, sel", katkiMaddeleri:[] },
// ── IT ──
{ ad:"Uova in Purgatorio IT", kal:155, pro:10, karb:8, yag:10, lif:2, sod:380, por:200, kat:"Uova", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"uova, pomodoro, aglio, olio, basilico, sale", katkiMaddeleri:[] },
// ── ES ──
{ ad:"Uva Española ES", kal:67, pro:0.6, karb:17, yag:0.4, lif:0.9, sod:2, por:100, kat:"Frutas", ulke:"es", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"uvas", katkiMaddeleri:[] },
// ── EL ──
{ ad:"Υπόλοιπο Σαλάτα", adLatin:"Ypolipo Salata", kal:55, pro:2, karb:8, yag:2.5, lif:2.5, sod:180, por:150, kat:"Salates", ulke:"el", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"lachanika epoches, elaiolado, lemoni, alati", katkiMaddeleri:[] },
// ── EN ──
{ ad:"Unicorn Cake EN", kal:395, pro:5.5, karb:58, yag:18, lif:1.5, sod:185, por:80, kat:"Cakes", ulke:"en", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"flour, butter, sugar, eggs, fondant, E102, E133, E122", katkiMaddeleri:[{kod:"E102",ad:"Tartrazine",tehlikeli:true,aciklama:"May cause hyperactivity in children."},{kod:"E133",ad:"Brilliant blue",tehlikeli:true,aciklama:"Controversial colouring."},{kod:"E122",ad:"Carmoisine",tehlikeli:true,aciklama:"Banned in some countries."}] },
// ── DA ──
{ ad:"Ungersk Gullasch DA", kal:225, pro:20, karb:8, yag:13, lif:2, sod:480, por:250, kat:"Kød", ulke:"da", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"oksekød, peber, løg, tomat, spidskommen, salt", katkiMaddeleri:[] },
// ── NO ──
{ ad:"Urtete NO", kal:2, pro:0.1, karb:0.3, yag:0, lif:0, sod:1, por:200, kat:"Drikkevarer", ulke:"no", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"urter, vann", katkiMaddeleri:[] },
// ── SV ──
{ ad:"Upplandskubb SV", kal:225, pro:8, karb:42, yag:3.5, lif:6, sod:480, por:100, kat:"Brod", ulke:"sv", tokPuan:60, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"rågmjöl, vetemjöl, vatten, surdeg, salt", katkiMaddeleri:[] },
// ── FI ──
{ ad:"Uunilohi FI", kal:208, pro:20, karb:0, yag:13, lif:0, sod:59, por:150, kat:"Kala", ulke:"fi", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"lohi, sitruuna, tilli, suola, pippuri", katkiMaddeleri:[] },
// ── NL ──
{ ad:"Uitsmijter NL", kal:295, pro:16, karb:22, yag:16, lif:2, sod:580, por:200, kat:"Ontbijt", ulke:"nl", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"brood, ham, gebakken eieren, kaas, zout", katkiMaddeleri:[] },
// ── BE ──
{ ad:"Uiesoep BE", kal:65, pro:2.5, karb:9, yag:2.5, lif:1.5, sod:480, por:300, kat:"Soepen", ulke:"be", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"uien, bouillon, kaas, brood, boter, zout", katkiMaddeleri:[] },
// ── AT ──
{ ad:"Urfahraner Markt AT", kal:385, pro:7, karb:58, yag:16, lif:2, sod:185, por:80, kat:"Suessigkeiten", ulke:"at", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"Mehl, Butter, Zucker, Eier, Lebkuchengewürze", katkiMaddeleri:[] },
// ── PL ──
{ ad:"Uszka PL", adLatin:"Uszka PL", kal:165, pro:6.5, karb:26, yag:5, lif:2, sod:380, por:100, kat:"Pierogi", ulke:"pl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"mąka, grzyby, kapusta, cebula, sól", katkiMaddeleri:[] },
// ── CS ──
{ ad:"Uzený Sýr CS", adLatin:"Uzeny Syr CS", kal:285, pro:22, karb:1, yag:22, lif:0, sod:680, por:30, kat:"Sýry", ulke:"cs", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mléko, sůl, syřidlo, uzení", katkiMaddeleri:[] },
// ── HU ──
{ ad:"Uborka Saláta HU", adLatin:"Uborka Salata HU", kal:22, pro:0.8, karb:4, yag:0.3, lif:0.5, sod:280, por:150, kat:"Salátak", ulke:"hu", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"uborka, ecet, só, cukor, kömény, tejföl", katkiMaddeleri:[] },
// ── RO ──
{ ad:"Urzici Mâncare RO", adLatin:"Urzici Mancare RO", kal:55, pro:3.5, karb:6, yag:2, lif:3, sod:380, por:200, kat:"Mancare", ulke:"ro", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"urzici, usturoi, ulei, sare, smantana", katkiMaddeleri:[] },
// ── HR ──
{ ad:"Uštipci HR", adLatin:"Ustipci HR", kal:265, pro:8, karb:36, yag:12, lif:2, sod:380, por:100, kat:"Pecivo", ulke:"hr", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"brašno, jaja, mlijeko, sol, ulje, kvasac", katkiMaddeleri:[] },
// ── PT ──
{ ad:"Ungido de Sarrabulho PT", kal:395, pro:20, karb:5, yag:34, lif:0.5, sod:980, por:150, kat:"Prato", ulke:"pt", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"sangue de porco, carnes, arroz, pão, especiarias, sal", katkiMaddeleri:[] },
// ── LV ──
{ ad:"Upenes LV (Melnās Jāņogas)", adLatin:"Upenes LV", kal:63, pro:1, karb:15, yag:0.4, lif:3.5, sod:1, por:100, kat:"Ogas", ulke:"lv", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"melnās jāņogas", katkiMaddeleri:[] },
// ── ET ──
{ ad:"Ubinal ET (Kodujuust)", adLatin:"Ubinal ET Kodujuust", kal:98, pro:11, karb:3.4, yag:4.3, lif:0, sod:364, por:100, kat:"Piimatooted", ulke:"et", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"piim, kultuurid", katkiMaddeleri:[] },
// ── LT ──
{ ad:"Uogienė LT (Braškių)", adLatin:"Uogiene LT Braski", kal:250, pro:0.4, karb:63, yag:0, lif:1, sod:8, por:20, kat:"Uogienės", ulke:"lt", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"braškės, cukrus, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektinas",tehlikeli:false,aciklama:"Gelinimo agentė."},{kod:"E330",ad:"Citrinų rūgštis",tehlikeli:false,aciklama:"Rūgštingumo reguliatorius."}] },

// ══════════════════════════════════════════════════════
// V HARFİ
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"Vanilla (Vanilya)", adler:{tr:"Vanilya",de:"Vanille",el:"Βανίλια",hu:"Vanília",pl:"Wanilia",cs:"Vanilka",ro:"Vanilie",hr:"Vanilija",fr:"Vanille",es:"Vainilla",it:"Vaniglia",pt:"Baunilha",no:"Vanilje",sv:"Vanilj",da:"Vanilje",fi:"Vanilja",nl:"Vanille",lv:"Vaniļe",et:"Vanill",lt:"Vanilė"}, kal:288, pro:0.1, karb:13, yag:0.1, lif:0, sod:9, por:5, kat:"Spice", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"vanilla extract", katkiMaddeleri:[] },
// ── TR ──
{ ad:"Vişne Kompostosu", kal:85, pro:0.8, karb:22, yag:0.2, lif:1, sod:5, por:200, kat:"Tatlı", ulke:"tr", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"vişne, su, şeker", katkiMaddeleri:[] },
{ ad:"Vişneli Muhallebi", kal:185, pro:4.5, karb:30, yag:5.5, lif:0.5, sod:55, por:150, kat:"Tatlı", ulke:"tr", tokPuan:28, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"süt, nişasta, şeker, vişne, gülsuyu", katkiMaddeleri:[] },
// ── DE ──
{ ad:"Vollkornbrot DE", kal:215, pro:9, karb:40, yag:2.5, lif:8.5, sod:480, por:100, kat:"Brot", ulke:"de", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"Vollkornroggenmehl, Weizenmehl, Sauerteig, Salz, Körner", katkiMaddeleri:[] },
{ ad:"Veltliner DE", kal:82, pro:0.1, karb:2.4, yag:0, lif:0, sod:6, por:150, kat:"Getraenk", ulke:"de", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"Trauben, E220", katkiMaddeleri:[{kod:"E220",ad:"Schwefeldioxid",tehlikeli:true,aciklama:"Kann allergische Reaktionen auslösen."}] },
// ── FR ──
{ ad:"Vichyssoise FR", kal:145, pro:3, karb:14, yag:9, lif:2, sod:380, por:300, kat:"Soupes", ulke:"fr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"poireaux, pommes de terre, crème, beurre, sel", katkiMaddeleri:[] },
{ ad:"Velouté de Champignons FR", kal:88, pro:3.5, karb:8, yag:5, lif:2.5, sod:480, por:300, kat:"Soupes", ulke:"fr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"champignons, crème, bouillon, beurre, sel", katkiMaddeleri:[] },
// ── IT ──
{ ad:"Vitello Tonnato IT", kal:245, pro:22, karb:3, yag:16, lif:0.5, sod:480, por:150, kat:"Antipasto", ulke:"it", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"vitello, tonno, capperi, maionese, limone, sale", katkiMaddeleri:[] },
// ── ES ──
{ ad:"Vieiras ES (Vieiras con Jamón)", kal:125, pro:16, karb:5, yag:5, lif:0.5, sod:480, por:150, kat:"Mariscos", ulke:"es", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"vieiras, jamón, cebolla, pimiento, aceite, sal", katkiMaddeleri:[] },
{ ad:"Verdinas ES (Fabes)", kal:135, pro:9, karb:22, yag:0.5, lif:7, sod:5, por:100, kat:"Legumbres", ulke:"es", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"fabes verdinas, aceite", katkiMaddeleri:[] },
// ── EL ──
{ ad:"Βαρβούνι Τηγανητό", adLatin:"Varvouni Tiganito", kal:195, pro:18, karb:6, yag:11, lif:0.5, sod:280, por:150, kat:"Psaria", ulke:"el", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"varvouni, aleuron, elaiolado, lemoni, alati", katkiMaddeleri:[] },
// ── EN ──
{ ad:"Victoria Sponge EN", kal:365, pro:5.5, karb:52, yag:17, lif:1.5, sod:185, por:80, kat:"Cakes", ulke:"en", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"flour, butter, sugar, eggs, jam, cream, E503", katkiMaddeleri:[{kod:"E503",ad:"Ammonium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },
// ── DA ──
{ ad:"Vandmelon DA", kal:30, pro:0.6, karb:7.6, yag:0.2, lif:0.4, sod:1, por:100, kat:"Frugt", ulke:"da", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"vandmelon", katkiMaddeleri:[] },
{ ad:"Vinrankesaft DA", kal:67, pro:0.3, karb:17, yag:0, lif:0, sod:5, por:200, kat:"Drikkevarer", ulke:"da", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"druesaft, E220", katkiMaddeleri:[{kod:"E220",ad:"Svovldioxid",tehlikeli:true,aciklama:"Kan forårsage allergiske reaktioner."}] },
// ── NO ──
{ ad:"Villaks NO", kal:195, pro:20, karb:0, yag:12, lif:0, sod:59, por:150, kat:"Fisk", ulke:"no", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"villaks", katkiMaddeleri:[] },
// ── SV ──
{ ad:"Viltgryta SV", kal:195, pro:22, karb:6, yag:9, lif:2, sod:480, por:300, kat:"Kött", ulke:"sv", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"viltfärs eller hjort, svamp, rotsaker, rödvin, salt", katkiMaddeleri:[] },
{ ad:"Vörtbröd SV", kal:225, pro:7, karb:44, yag:2.5, lif:5, sod:480, por:100, kat:"Brod", ulke:"sv", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"rågmjöl, vört, sirap, kryddor, salt, jäst", katkiMaddeleri:[] },
// ── FI ──
{ ad:"Voileipäkakku FI", kal:265, pro:10, karb:18, yag:17, lif:2, sod:480, por:100, kat:"Voileivat", ulke:"fi", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"ruisleipä, kinkku, lohi, kurkku, kermaviili, tilli", katkiMaddeleri:[] },
// ── NL ──
{ ad:"Vlaamse Karbonaden NL", kal:245, pro:20, karb:12, yag:13, lif:1.5, sod:520, por:300, kat:"Vlees", ulke:"nl", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"rundvlees, bier, ui, tijm, laurier, boter, zout", katkiMaddeleri:[] },
// ── BE ──
{ ad:"Vol-au-Vent BE", kal:398, pro:16, karb:28, yag:28, lif:1.5, sod:680, por:200, kat:"Gerechten", ulke:"be", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"bladerdeeg, kip, paddenstoelen, room, sjalotjes", katkiMaddeleri:[] },
// ── AT ──
{ ad:"Veltliner Wein AT", kal:82, pro:0.1, karb:2.4, yag:0, lif:0, sod:6, por:150, kat:"Getraenk", ulke:"at", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"Grüner Veltliner Trauben, E220", katkiMaddeleri:[{kod:"E220",ad:"Schwefeldioxid",tehlikeli:true,aciklama:"Kann allergische Reaktionen auslösen."}] },
// ── PL ──
{ ad:"Veal PL (Cielęcina)", adLatin:"Veal PL Cielecina", kal:185, pro:22, karb:0, yag:10, lif:0, sod:68, por:100, kat:"Mieso", ulke:"pl", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"cielęcina", katkiMaddeleri:[] },
// ── CS ──
{ ad:"Vepřové Koleno CS", adLatin:"Veprove Koleno CS", kal:395, pro:26, karb:0, yag:32, lif:0, sod:580, por:200, kat:"Maso", ulke:"cs", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"vepřové koleno, kmín, česnek, pivo, sůl", katkiMaddeleri:[] },
// ── HU ──
{ ad:"Vaddisznó Pörkölt HU", adLatin:"Vaddiszno Porkolt HU", kal:245, pro:22, karb:6, yag:15, lif:2, sod:480, por:250, kat:"Fogások", ulke:"hu", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"vaddisznó, vöröshagyma, paprika, só, bors", katkiMaddeleri:[] },
// ── RO ──
{ ad:"Vărzare RO", adLatin:"Varzare RO", kal:245, pro:8, karb:30, yag:12, lif:4, sod:480, por:150, kat:"Mancare", ulke:"ro", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"varza, carne tocata, orez, ceapa, rosii, sare", katkiMaddeleri:[] },
// ── HR ──
{ ad:"Vrganj HR (Šumska Gljiva)", adLatin:"Vrganj HR", kal:20, pro:1.5, karb:3, yag:0.4, lif:2, sod:5, por:100, kat:"Gljive", ulke:"hr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"vrganj", katkiMaddeleri:[] },
// ── PT ──
{ ad:"Vinho Verde PT", kal:58, pro:0.1, karb:1.5, yag:0, lif:0, sod:6, por:150, kat:"Bebidas", ulke:"pt", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"uvas, E220", katkiMaddeleri:[{kod:"E220",ad:"Dióxido de enxofre",tehlikeli:true,aciklama:"Pode causar reações alérgicas."}] },
// ── LV ──
{ ad:"Vistas Gaļa LV", adLatin:"Vistas Gala LV", kal:215, pro:28, karb:2, yag:11, lif:0, sod:320, por:150, kat:"Gaļa", ulke:"lv", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"vistas krūtiņa, sāls, garšvielas", katkiMaddeleri:[] },
// ── ET ──
{ ad:"Vasikaliha ET", adLatin:"Vasikaliha ET", kal:185, pro:22, karb:0, yag:10, lif:0, sod:68, por:100, kat:"Liha", ulke:"et", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"vasikaliha", katkiMaddeleri:[] },
// ── LT ──
{ ad:"Veršiena LT", adLatin:"Versiena LT", kal:185, pro:22, karb:0, yag:10, lif:0, sod:68, por:100, kat:"Mesa", ulke:"lt", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"veršiena", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Y HARFİ (Türkçe'ye özgü + Diğer diller)
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"Yogurt (Yoğurt)", adler:{tr:"Yoğurt",de:"Joghurt",el:"Γιαούρτι",hu:"Joghurt",pl:"Jogurt",cs:"Jogurt",ro:"Iaurt",hr:"Jogurt",fr:"Yaourt",es:"Yogur",it:"Yogurt",pt:"Iogurte",no:"Yoghurt",sv:"Yoghurt",da:"Yoghurt",fi:"Jogurtti",nl:"Yoghurt",lv:"Jogurts",et:"Jogurt",lt:"Jogurtas"}, kal:61, pro:3.5, karb:4.7, yag:3.3, lif:0, sod:46, por:150, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"whole milk, cultures", katkiMaddeleri:[] },
// ── TR ──
{ ad:"Yoğurtlu Kebap", kal:348, pro:22, karb:22, yag:20, lif:2, sod:580, por:250, kat:"Et", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kuzu eti, yoğurt, tereyağı, domates sosu, pide", katkiMaddeleri:[] },
{ ad:"Yufka Böreği", kal:295, pro:9, karb:32, yag:16, lif:1.5, sod:480, por:150, kat:"Hamur İşleri", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"yufka, iç harç, sıvı yağ, tereyağı", katkiMaddeleri:[] },
{ ad:"Yumurtalı Ekmek", kal:265, pro:10, karb:28, yag:13, lif:2, sod:380, por:100, kat:"Kahvaltı", ulke:"tr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"ekmek, yumurta, tereyağı, tuz", katkiMaddeleri:[] },
// ── DE ──
{ ad:"Yufka Teig DE", kal:265, pro:7, karb:52, yag:3.5, lif:2, sod:380, por:80, kat:"Teig", ulke:"de", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"Weizenmehl, Wasser, Salz, Öl", katkiMaddeleri:[] },
// ── FR ──
{ ad:"Yaourt à la Grecque FR", kal:115, pro:6, karb:6, yag:8, lif:0, sod:55, por:150, kat:"Produits Laitiers", ulke:"fr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"lait entier, cultures", katkiMaddeleri:[] },
// ── IT ──
{ ad:"Ypsilon Pasta IT (Farfalle)", kal:353, pro:12, karb:71, yag:1.5, lif:2.7, sod:3, por:100, kat:"Pasta", ulke:"it", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"semolino di grano duro", katkiMaddeleri:[] },
// ── ES ──
{ ad:"Yema de Huevo ES", kal:322, pro:16, karb:3.6, yag:27, lif:0, sod:48, por:50, kat:"Ingredientes", ulke:"es", tokPuan:35, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"yema de huevo", katkiMaddeleri:[] },
// ── EL ──
{ ad:"Γιαουρτόπιτα", adLatin:"Giaourtopita", kal:285, pro:8, karb:38, yag:13, lif:1.5, sod:185, por:100, kat:"Glika", ulke:"el", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"giaourti, aleuron, zachari, avga, lemoni, banilin", katkiMaddeleri:[] },
// ── EN ──
{ ad:"Yorkshire Pudding EN", kal:195, pro:6.5, karb:22, yag:9, lif:0.5, sod:185, por:60, kat:"Baked Goods", ulke:"en", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"flour, eggs, milk, lard or oil, salt", katkiMaddeleri:[] },
// ── DA ──
{ ad:"Ymerdrys DA", kal:265, pro:7, karb:44, yag:8, lif:3, sod:280, por:60, kat:"Morgenmad", ulke:"da", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"franskbrød, smør, sukker", katkiMaddeleri:[] },
// ── NO ──
{ ad:"Ytrefilet NO", kal:185, pro:28, karb:0, yag:8, lif:0, sod:65, por:150, kat:"Kjøtt", ulke:"no", tokPuan:78, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"ytrefilet av okse", katkiMaddeleri:[] },
// ── SV ──
{ ad:"Ymersopp SV", kal:285, pro:22, karb:3, yag:22, lif:2.5, sod:480, por:150, kat:"Svamp", ulke:"sv", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"svamp, smör, lök, grädde, timjan, salt", katkiMaddeleri:[] },
// ── FI ──
{ ad:"Yrttipesto FI", kal:400, pro:8, karb:3.5, yag:40, lif:1.5, sod:580, por:30, kat:"Kastikkeet", ulke:"fi", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"basilika, pinjansiemenet, parmesaani, valkosipuli, oliiviöljy, suola", katkiMaddeleri:[] },
// ── NL ──
{ ad:"Yoghurt met Fruit NL", kal:88, pro:4.5, karb:12, yag:2.5, lif:0.5, sod:46, por:150, kat:"Zuivel", ulke:"nl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"volle yoghurt, verse vruchten", katkiMaddeleri:[] },
// ── BE ──
{ ad:"Yoghurt Natuur BE", kal:72, pro:4.5, karb:5, yag:3.8, lif:0, sod:46, por:150, kat:"Zuivel", ulke:"be", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"volle melk, culturen", katkiMaddeleri:[] },
// ── AT ──
{ ad:"Yoghurt Erdbeere AT", marka:"NÖM", kal:88, pro:4.5, karb:12, yag:2.5, lif:0.2, sod:46, por:150, kat:"Milchprodukte", ulke:"at", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"Joghurt, Erdbeeren, Zucker, E440", katkiMaddeleri:[{kod:"E440",ad:"Pektine",tehlikeli:false,aciklama:"Geliermittel."}] },
// ── PL ──
{ ad:"Ymer PL (Jogurt Naturalny)", adLatin:"Ymer PL", kal:61, pro:3.5, karb:4.7, yag:3.3, lif:0, sod:46, por:150, kat:"Nabial", ulke:"pl", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"mleko, kultury", katkiMaddeleri:[] },
// ── CS ──
{ ad:"Ymer CS (Jogurt)", adLatin:"Ymer CS Jogurt", kal:61, pro:3.5, karb:4.7, yag:3.3, lif:0, sod:46, por:150, kat:"Mlecne Vyrobky", ulke:"cs", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"mléko, kultury", katkiMaddeleri:[] },
// ── HU ──
{ ad:"Ymerszerű HU (Joghurt)", adLatin:"Ymerszeru HU", kal:61, pro:3.5, karb:4.7, yag:3.3, lif:0, sod:46, por:150, kat:"TejTermekek", ulke:"hu", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"tej, kultúrák", katkiMaddeleri:[] },
// ── RO ──
{ ad:"Ymer RO (Iaurt Natural)", adLatin:"Ymer RO", kal:61, pro:3.5, karb:4.7, yag:3.3, lif:0, sod:46, por:150, kat:"Lactate", ulke:"ro", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"lapte, culturi", katkiMaddeleri:[] },
// ── HR ──
{ ad:"Ymer HR (Jogurt Prirodni)", adLatin:"Ymer HR", kal:61, pro:3.5, karb:4.7, yag:3.3, lif:0, sod:46, por:150, kat:"Mlijecni Proizvodi", ulke:"hr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"mlijeko, kulture", katkiMaddeleri:[] },
// ── PT ──
{ ad:"Ymer PT (Iogurte Natural)", adLatin:"Ymer PT", kal:61, pro:3.5, karb:4.7, yag:3.3, lif:0, sod:46, por:150, kat:"Lacticinios", ulke:"pt", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"leite, culturas", katkiMaddeleri:[] },
// ── LV ──
{ ad:"Jogurts LV (Dabīgais)", adLatin:"Jogurts LV", kal:61, pro:3.5, karb:4.7, yag:3.3, lif:0, sod:46, por:150, kat:"Piena Produkti", ulke:"lv", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"piens, kultūras", katkiMaddeleri:[] },
// ── ET ──
{ ad:"Yahni ET (Oad Tomatikastmes)", adLatin:"Yahni ET", kal:115, pro:7, karb:18, yag:2.5, lif:7, sod:480, por:200, kat:"Toidud", ulke:"et", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"oad, tomatid, sibul, küüslauk, oliiviõli, sool", katkiMaddeleri:[] },
// ── LT ──
{ ad:"Yra Sūris LT (Varškės)", adLatin:"Yra Suris LT", kal:98, pro:11, karb:3.4, yag:4.3, lif:0, sod:364, por:100, kat:"Pieno Produktai", ulke:"lt", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"pienas, kultūros", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Z HARFİ
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"Zucchini (Kabak)", adler:{tr:"Kabak",de:"Zucchini",el:"Κολοκυθάκι",hu:"Cukkini",pl:"Cukinia",cs:"Cuketa",ro:"Dovlecel",hr:"Tikvica",fr:"Courgette",es:"Calabacín",it:"Zucchina",pt:"Curgete",no:"Zucchini",sv:"Zucchini",da:"Zucchini",fi:"Kesäkurpitsa",nl:"Courgette",lv:"Cukīni",et:"Suvikõrvits",lt:"Cukinija"}, kal:17, pro:1.2, karb:3.1, yag:0.3, lif:1, sod:8, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"zucchini", katkiMaddeleri:[] },
// ── TR ──
{ ad:"Zerde", kal:145, pro:2, karb:32, yag:2, lif:0.5, sod:8, por:150, kat:"Tatlı", ulke:"tr", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"pirinç, şeker, zerdeçal, su, çam fıstığı, fındık", katkiMaddeleri:[] },
{ ad:"Zeytinyağlı Fasulye", kal:125, pro:5.5, karb:16, yag:5, lif:5.5, sod:280, por:150, kat:"Sebze Yemekleri", ulke:"tr", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"taze fasulye, domates, soğan, zeytinyağı, tuz", katkiMaddeleri:[] },
{ ad:"Zeytinyağlı Pırasa", kal:88, pro:2.5, karb:12, yag:4, lif:3, sod:180, por:200, kat:"Sebze Yemekleri", ulke:"tr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"pırasa, pirinç, zeytinyağı, soğan, havuç, tuz", katkiMaddeleri:[] },
{ ad:"Zeytin (Yeşil)", kal:145, pro:1, karb:4, yag:15, lif:3.3, sod:1560, por:30, kat:"Meze", ulke:"tr", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"yeşil zeytin, su, tuz", katkiMaddeleri:[] },
// ── DE ──
{ ad:"Zwiebelkuchen DE", kal:265, pro:8, karb:28, yag:15, lif:2, sod:480, por:150, kat:"Kuchen", ulke:"de", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"Zwiebeln, Sahne, Speck, Hefeteig, Eier, Kümmel, Salz", katkiMaddeleri:[] },
{ ad:"Zander DE", kal:88, pro:19, karb:0, yag:1.5, lif:0, sod:55, por:150, kat:"Fisch", ulke:"de", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"Zander", katkiMaddeleri:[] },
// ── FR ──
{ ad:"Zucchini Farcie FR", kal:125, pro:8, karb:8, yag:7, lif:2.5, sod:380, por:200, kat:"Légumes", ulke:"fr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"courgettes, boeuf haché, tomates, ail, herbes, sel", katkiMaddeleri:[] },
// ── IT ──
{ ad:"Zabaione IT", kal:215, pro:5.5, karb:22, yag:12, lif:0, sod:28, por:100, kat:"Dolci", ulke:"it", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"tuorli d'uovo, Marsala, zucchero", katkiMaddeleri:[] },
{ ad:"Ziti al Forno IT", kal:298, pro:13, karb:42, yag:10, lif:2.5, sod:520, por:250, kat:"Pasta", ulke:"it", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"ziti, ragù, mozzarella, parmigiano, besciamella", katkiMaddeleri:[] },
// ── ES ──
{ ad:"Zarzuela ES", kal:185, pro:22, karb:6, yag:8, lif:1.5, sod:580, por:300, kat:"Mariscos", ulke:"es", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"mariscos variados, tomate, ajo, azafrán, vino blanco, aceite", katkiMaddeleri:[] },
// ── EL ──
{ ad:"Ζυμαρικά με Σκορδαλιά", adLatin:"Zimarika me Skordalia", kal:285, pro:8, karb:46, yag:9, lif:2.5, sod:380, por:200, kat:"Zimarika", ulke:"el", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"zimarika, skordalia, elaiolado, lemoni, alati", katkiMaddeleri:[] },
// ── EN ──
{ ad:"Zucchini Bread EN", kal:265, pro:5, karb:42, yag:10, lif:2, sod:285, por:80, kat:"Baked Goods", ulke:"en", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"courgette, flour, eggs, oil, sugar, cinnamon, E500", katkiMaddeleri:[{kod:"E500",ad:"Sodium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },
// ── DA ──
{ ad:"Æblekage DA", kal:195, pro:3, karb:34, yag:7, lif:2.5, sod:120, por:150, kat:"Dessert", ulke:"da", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"æbler, rasp, flødeskum, sukker, smør", katkiMaddeleri:[] },
// ── NO ──
{ ad:"Ørret NO", kal:148, pro:20, karb:0, yag:7, lif:0, sod:52, por:150, kat:"Fisk", ulke:"no", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ørret", katkiMaddeleri:[] },
// ── SV ──
{ ad:"Äppelkaka SV", kal:195, pro:3, karb:32, yag:8, lif:2, sod:120, por:100, kat:"Kaka", ulke:"sv", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"äpplen, vetemjöl, smör, socker, ägg, kanel", katkiMaddeleri:[] },
// ── FI ──
{ ad:"Yrtti-Smetana FI", kal:125, pro:1.5, karb:3, yag:12, lif:0.2, sod:55, por:100, kat:"Kastikkeet", ulke:"fi", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"smetana, yrtit, suola, pippuri", katkiMaddeleri:[] },
// ── NL ──
{ ad:"Zuurkool NL", kal:19, pro:0.9, karb:4.3, yag:0.1, lif:2.5, sod:661, por:100, kat:"Groente", ulke:"nl", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"witte kool, zout", katkiMaddeleri:[] },
// ── BE ──
{ ad:"Zoervleisch BE", kal:245, pro:20, karb:12, yag:13, lif:1.5, sod:520, por:300, kat:"Vlees", ulke:"be", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"paardenvlees of rundvlees, azijn, speculoos, ui, tijm, laurier, boter", katkiMaddeleri:[] },
// ── AT ──
{ ad:"Zwetschkenknödel AT", kal:285, pro:5.5, karb:46, yag:11, lif:2.5, sod:165, por:150, kat:"Mehlspeisen", ulke:"at", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"Topfen, Mehl, Eier, Zwetschken, Semmelbrösel, Butter, Zucker, Zimt", katkiMaddeleri:[] },
// ── PL ──
{ ad:"Żurek PL", adLatin:"Zurek PL", kal:88, pro:4.5, karb:10, yag:4, lif:1, sod:580, por:300, kat:"Zupy", ulke:"pl", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"zakwas żytni, kiełbasa, jajko, czosnek, majeranek, sól", katkiMaddeleri:[] },
{ ad:"Żubr PL (Piwo)", adLatin:"Zubr PL", marka:"Żubr", kal:42, pro:0.4, karb:4.2, yag:0, lif:0, sod:8, por:330, kat:"Napoje", ulke:"pl", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"woda, słód, chmiel, drożdże", katkiMaddeleri:[] },
// ── CS ──
{ ad:"Zelňačka CS", adLatin:"Zelnacka CS", kal:88, pro:4, karb:8, yag:4.5, lif:3, sod:520, por:300, kat:"Polevky", ulke:"cs", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"kyselé zelí, vepřové maso, cibule, majoránka, sůl", katkiMaddeleri:[] },
// ── HU ──
{ ad:"Zserbó HU", adLatin:"Zserbo HU", kal:398, pro:7, karb:52, yag:20, lif:2.5, sod:185, por:60, kat:"Sutemeny", ulke:"hu", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"liszt, vaj, tojás, cukros dió, sárgabarack lekvár, csokoládé", katkiMaddeleri:[] },
// ── RO ──
{ ad:"Zacuscă RO", adLatin:"Zacusca RO", kal:65, pro:1.5, karb:10, yag:2.5, lif:3, sod:280, por:50, kat:"Conserve", ulke:"ro", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"vinete, ardei copt, rosii, ceapa, ulei, sare", katkiMaddeleri:[] },
// ── HR ──
{ ad:"Zelena Salata HR", adLatin:"Zelena Salata HR", kal:15, pro:1.3, karb:2.8, yag:0.2, lif:1.3, sod:8, por:100, kat:"Salate", ulke:"hr", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"zelena salata, maslinovo ulje, ocat, sol", katkiMaddeleri:[] },
// ── PT ──
{ ad:"Zimbro PT (Bebida)", kal:222, pro:0, karb:0, yag:0, lif:0, sod:0, por:40, kat:"Bebidas", ulke:"pt", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"aguardente, zimbro, especiarias", katkiMaddeleri:[] },
// ── LV ──
{ ad:"Zaļumi LV (Pētersīļi)", adLatin:"Zalumi LV", kal:36, pro:3, karb:6, yag:0.8, lif:3.3, sod:56, por:10, kat:"Zaļumi", ulke:"lv", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"pētersīļi", katkiMaddeleri:[] },
// ── ET ──
{ ad:"Zander ET (Koha)", adLatin:"Zander ET Koha", kal:88, pro:19, karb:0, yag:1.5, lif:0, sod:55, por:150, kat:"Kala", ulke:"et", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"koha", katkiMaddeleri:[] },
// ── LT ──
{ ad:"Žuvis Troškinta LT", adLatin:"Zuvis Troskinta LT", kal:115, pro:18, karb:4, yag:4.5, lif:1, sod:380, por:200, kat:"Zuvis", ulke:"lt", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"žuvis, svogūnas, morka, grietinė, druska", katkiMaddeleri:[] },
{ ad:"Žagarėliai LT", adLatin:"Zagaleliai LT", kal:448, pro:7, karb:58, yag:22, lif:2, sod:185, por:50, kat:"Kepiniai", ulke:"lt", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"kviečių miltai, kiaušiniai, cukrus, sviestas, medus, cinamonas", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// W HARFİ (DE/AT/BE/NL/SV/EN/PL + diğerleri)
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"White Wine (Beyaz Şarap)", adler:{tr:"Beyaz Şarap",de:"Weißwein",el:"Λευκό Κρασί",hu:"Fehérbor",pl:"Białe Wino",cs:"Bílé Víno",ro:"Vin Alb",hr:"Bijelo Vino",fr:"Vin Blanc",es:"Vino Blanco",it:"Vino Bianco",pt:"Vinho Branco",no:"Hvitvin",sv:"Vitt Vin",da:"Hvidvin",fi:"Valkoviini",nl:"Witte Wijn",lv:"Baltais Vīns",et:"Valge Vein",lt:"Baltas Vynas"}, kal:82, pro:0.1, karb:2.5, yag:0, lif:0, sod:6, por:150, kat:"Drinks", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","lv","et","lt"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"white grapes, E220", katkiMaddeleri:[{kod:"E220",ad:"Sulphur dioxide",tehlikeli:true,aciklama:"May cause allergic reactions."}] },
{ ad:"Walnut (Ceviz)", adler:{tr:"Ceviz",de:"Walnuss",el:"Καρύδι",hu:"Dió",pl:"Orzech Włoski",cs:"Vlašský Ořech",ro:"Nucă",hr:"Orah",fr:"Noix",es:"Nuez",it:"Noce",pt:"Noz",no:"Valnøtt",sv:"Valnöt",da:"Valnød",fi:"Saksanpähkinä",nl:"Walnoot",lv:"Valrieksts",et:"Kreeka Pähkel",lt:"Graikinis Riešutas"}, kal:654, pro:15, karb:14, yag:65, lif:6.7, sod:2, por:30, kat:"Nuts", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"walnuts", katkiMaddeleri:[] },
// ── DE ──
{ ad:"Wurst DE (Allgemein)", kal:315, pro:14, karb:2, yag:28, lif:0, sod:980, por:50, kat:"Wurst", ulke:"de", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"Schweinefleisch, Salz, E250, E451, Gewürze", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."},{kod:"E451",ad:"Triphosphate",tehlikeli:false,aciklama:"Feuchthaltemittel."}] },
{ ad:"Waffeln DE", kal:335, pro:8, karb:48, yag:15, lif:2, sod:280, por:80, kat:"Gebaeck", ulke:"de", tokPuan:30, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"Weizenmehl, Eier, Milch, Butter, Zucker, Backpulver", katkiMaddeleri:[] },
{ ad:"Westfälischer Schinken DE", kal:215, pro:28, karb:0, yag:12, lif:0, sod:1680, por:30, kat:"Aufschnitt", ulke:"de", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"Schweinefleisch, Salz, E250", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."}] },
{ ad:"Weizenbier DE", kal:45, pro:0.5, karb:4.5, yag:0, lif:0, sod:8, por:330, kat:"Bier", ulke:"de", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"Wasser, Weizenmalz, Gerstenmalz, Hopfen, Hefe", katkiMaddeleri:[] },
{ ad:"Waldpilzsuppe DE", kal:72, pro:3, karb:8, yag:3.5, lif:2.5, sod:480, por:300, kat:"Suppe", ulke:"de", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"Waldpilze, Sahne, Zwiebeln, Petersilie, Salz", katkiMaddeleri:[] },
// ── AT ──
{ ad:"Wiener Schnitzel AT", kal:348, pro:26, karb:14, yag:22, lif:1, sod:420, por:150, kat:"Fleisch", ulke:"at", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"Kalbfleisch, Ei, Mehl, Semmelbrösel, Butterschmalz, Salz, Zitrone", katkiMaddeleri:[] },
{ ad:"Wiener Würstchen AT", kal:265, pro:12, karb:2, yag:23, lif:0, sod:920, por:100, kat:"Wurst", ulke:"at", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"Kalbfleisch, Schweinefleisch, Salz, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"In hohen Mengen krebserregend."},{kod:"E451",ad:"Triphosphate",tehlikeli:false,aciklama:"Feuchthaltemittel."}] },
{ ad:"Waldviertler Mohn AT", kal:498, pro:18, karb:23, yag:43, lif:10, sod:88, por:30, kat:"Backwaren", ulke:"at", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"Waldviertler Graumohn, Zucker, Honig", katkiMaddeleri:[] },
// ── BE ──
{ ad:"Wafels BE (Brusselse)", kal:368, pro:7, karb:52, yag:17, lif:2, sod:280, por:100, kat:"Wafels", ulke:"be", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"tarwebloem, gist, boter, eieren, suiker, vanillesuiker", katkiMaddeleri:[] },
{ ad:"Waterzooi BE", kal:165, pro:18, karb:8, yag:7, lif:2, sod:520, por:350, kat:"Soepen", ulke:"be", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"kip of vis, prei, wortelen, aardappelen, room, eieren", katkiMaddeleri:[] },
{ ad:"Witbier BE", marka:"Hoegaarden", kal:42, pro:0.4, karb:4.2, yag:0, lif:0, sod:8, por:330, kat:"Bier", ulke:"be", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"water, gerst, tarwe, hop, gist, koriander, sinaasappelschil", katkiMaddeleri:[] },
// ── NL ──
{ ad:"Wentelteefje NL", kal:265, pro:10, karb:28, yag:13, lif:2, sod:380, por:100, kat:"Ontbijt", ulke:"nl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"brood, eieren, melk, boter, suiker, kaneel", katkiMaddeleri:[] },
{ ad:"Witlof NL", kal:17, pro:1.3, karb:3.4, yag:0.2, lif:1.6, sod:22, por:100, kat:"Groente", ulke:"nl", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"witlof", katkiMaddeleri:[] },
{ ad:"Witte Asperges NL", kal:20, pro:2.2, karb:3.9, yag:0.1, lif:2.1, sod:2, por:100, kat:"Groente", ulke:"nl", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"witte asperges", katkiMaddeleri:[] },
// ── SV ──
{ ad:"Wallenbergare SV", kal:285, pro:22, karb:6, yag:20, lif:0.5, sod:380, por:150, kat:"Kött", ulke:"sv", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"kalvfärs, grädde, ägg, salt, peppar, smör", katkiMaddeleri:[] },
{ ad:"Wienerbröd SV", kal:385, pro:7, karb:52, yag:18, lif:2, sod:280, por:80, kat:"Bageri", ulke:"sv", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"vetemjöl, smör, socker, ägg, jäst, mandelmassa", katkiMaddeleri:[] },
// ── DA ──
{ ad:"Wienerbrød DA", kal:385, pro:7, karb:52, yag:18, lif:2, sod:280, por:80, kat:"Bagvaerk", ulke:"da", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"hvedemel, smør, sukker, æg, gær, marcipan", katkiMaddeleri:[] },
{ ad:"Waldorf Salat DA", kal:195, pro:3, karb:12, yag:16, lif:2.5, sod:280, por:150, kat:"Salater", ulke:"da", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"æble, selleri, valnødder, mayonnaise, citronsaft", katkiMaddeleri:[] },
// ── NO ──
{ ad:"Wienerpølse NO", kal:265, pro:12, karb:2, yag:23, lif:0, sod:920, por:100, kat:"Pølser", ulke:"no", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"svinekjøtt, kalvekjøtt, salt, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitrit",tehlikeli:true,aciklama:"Konserveringsmiddel."},{kod:"E451",ad:"Trifosfater",tehlikeli:false,aciklama:"Fuktbevarende."}] },
// ── EN ──
{ ad:"Welsh Rarebit EN", kal:365, pro:18, karb:28, yag:22, lif:2, sod:780, por:200, kat:"Dish", ulke:"en", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"cheddar, beer, mustard, Worcestershire sauce, toast", katkiMaddeleri:[] },
{ ad:"Watercress EN", kal:11, pro:2.3, karb:1.3, yag:0.1, lif:0.5, sod:41, por:100, kat:"Vegetables", ulke:"en", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"watercress", katkiMaddeleri:[] },
// ── PL ──
{ ad:"Wino Polskie PL", adLatin:"Wino Polskie PL", kal:82, pro:0.1, karb:2.5, yag:0, lif:0, sod:6, por:150, kat:"Napoje", ulke:"pl", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"winogrona, E220", katkiMaddeleri:[{kod:"E220",ad:"Dwutlenek siarki",tehlikeli:true,aciklama:"Może powodować reakcje alergiczne."}] },
// ── CS ──
{ ad:"Waldorf Salát CS", adLatin:"Waldorf Salat CS", kal:195, pro:3, karb:12, yag:16, lif:2.5, sod:280, por:150, kat:"Salatky", ulke:"cs", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"jablko, celer, vlašské ořechy, majonéza, citronová šťáva", katkiMaddeleri:[] },
// ── FI ──
{ ad:"Wieneri FI", kal:265, pro:12, karb:2, yag:23, lif:0, sod:920, por:100, kat:"Lihatuotteet", ulke:"fi", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"sianliha, vasikanliha, suola, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Natriumnitriitti",tehlikeli:true,aciklama:"Suurina annoksina karsinogeeninen."},{kod:"E451",ad:"Trifosfaatit",tehlikeli:false,aciklama:"Kosteudensäilyttäjä."}] },
// ── HU ──
{ ad:"Waldorf Saláta HU", adLatin:"Waldorf Salata HU", kal:195, pro:3, karb:12, yag:16, lif:2.5, sod:280, por:150, kat:"Salátak", ulke:"hu", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"alma, zeller, dió, majonéz, citromlé", katkiMaddeleri:[] },
// ── RO ──
{ ad:"Waldorf Salată RO", adLatin:"Waldorf Salata RO", kal:195, pro:3, karb:12, yag:16, lif:2.5, sod:280, por:150, kat:"Salate", ulke:"ro", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mere, telina, nuci, maioneza, lamaie", katkiMaddeleri:[] },
// ── HR ──
{ ad:"Wiener Schnitzel HR", kal:345, pro:26, karb:14, yag:22, lif:1, sod:420, por:150, kat:"Meso", ulke:"hr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"svinjski ili teleći odrezak, jaje, brašno, prezle, ulje, sol", katkiMaddeleri:[] },
// ── PT ──
{ ad:"Waldorf Salada PT", adLatin:"Waldorf Salada PT", kal:195, pro:3, karb:12, yag:16, lif:2.5, sod:280, por:150, kat:"Saladas", ulke:"pt", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"maçã, aipo, nozes, maionese, sumo de limão", katkiMaddeleri:[] },
// ── LV ──
{ ad:"Vafeles LV", adLatin:"Vafeles LV", kal:335, pro:8, karb:48, yag:15, lif:2, sod:280, por:80, kat:"Maizes Izstrādājumi", ulke:"lv", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"kviešu milti, olas, piens, sviests, cukurs, cepamais pulveris", katkiMaddeleri:[] },
// ── ET ──
{ ad:"Vaffel ET", adLatin:"Vaffel ET", kal:335, pro:8, karb:48, yag:15, lif:2, sod:280, por:80, kat:"Leivonnaiset", ulke:"et", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"nisujahu, munad, piim, või, suhkur, küpsetuspulber", katkiMaddeleri:[] },
// ── LT ──
{ ad:"Vafliai LT", adLatin:"Vafliai LT", kal:335, pro:8, karb:48, yag:15, lif:2, sod:280, por:80, kat:"Kepiniai", ulke:"lt", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"kviečių miltai, kiaušiniai, pienas, sviestas, cukrus, kepimo milteliai", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Q HARFİ (FR/ES/IT ağırlıklı)
// ══════════════════════════════════════════════════════
// ── FR ──
{ ad:"Quiche Lorraine FR", kal:325, pro:11, karb:22, yag:23, lif:1.5, sod:580, por:150, kat:"Plat", ulke:"fr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"pâte brisée, lardons, crème, oeufs, gruyère, sel, poivre", katkiMaddeleri:[] },
{ ad:"Quenelle FR", kal:215, pro:15, karb:12, yag:13, lif:0.5, sod:480, por:150, kat:"Plat", ulke:"fr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"brochet ou veau, farine, oeuf, crème, sel", katkiMaddeleri:[] },
{ ad:"Quatre-Quarts FR", kal:385, pro:7, karb:48, yag:20, lif:1, sod:185, por:80, kat:"Pâtisserie", ulke:"fr", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"farine, beurre, sucre, oeufs (proportions égales)", katkiMaddeleri:[] },
// ── ES ──
{ ad:"Queso Fresco ES", kal:98, pro:11, karb:3, yag:4.5, lif:0, sod:320, por:100, kat:"Quesos", ulke:"es", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"leche pasteurizada, sal, cuajo", katkiMaddeleri:[] },
{ ad:"Queso de Cabrales ES", kal:368, pro:21, karb:0.5, yag:31, lif:0, sod:1380, por:30, kat:"Quesos", ulke:"es", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"leche cruda de vaca, oveja y cabra, sal, Penicillium", katkiMaddeleri:[] },
// ── IT ──
{ ad:"Quinto Quarto IT", kal:172, pro:20, karb:4, yag:9, lif:0.5, sod:380, por:150, kat:"Carne", ulke:"it", tokPuan:58, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"frattaglie miste, aglio, cipolla, pomodoro, rosmarino, olio", katkiMaddeleri:[] },
// ── PT ──
{ ad:"Queijadas de Sintra PT", kal:285, pro:8, karb:42, yag:11, lif:0.5, sod:185, por:60, kat:"Doces", ulke:"pt", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"requeijão, açúcar, ovos, farinha, manteiga, canela", katkiMaddeleri:[] },
{ ad:"Queijo da Serra PT", kal:345, pro:20, karb:0.5, yag:29, lif:0, sod:620, por:30, kat:"Queijos", ulke:"pt", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"leite cru de ovelha, sal, flor de cardo", katkiMaddeleri:[] },
// ── EN ──
{ ad:"Quiche EN", kal:295, pro:10, karb:20, yag:20, lif:1.5, sod:480, por:150, kat:"Dish", ulke:"en", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"shortcrust pastry, eggs, cream, filling, salt", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// X HARFİ (ES/PT/CAT ağırlıklı — nadir ama gerçek)
// ══════════════════════════════════════════════════════
{ ad:"Xató ES (Katalon Salatası)", kal:245, pro:12, karb:12, yag:18, lif:3.5, sod:480, por:200, kat:"Ensaladas", ulke:"es", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"escarola, bacallà, anxoves, olives, salsa romesco", katkiMaddeleri:[] },
{ ad:"Xerém PT (Farinha de Milho)", kal:95, pro:2.5, karb:20, yag:0.8, lif:1.5, sod:8, por:150, kat:"Prato", ulke:"pt", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"farinha de milho, água, azeite, sal, mariscos", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Æ HARFİ (DA / NO)
// ══════════════════════════════════════════════════════
{ ad:"Æblegrød DA", kal:98, pro:0.4, karb:24, yag:0.3, lif:2.5, sod:5, por:200, kat:"Dessert", ulke:"da", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"æbler, sukker, vand, kanel, kartoffelmel", katkiMaddeleri:[] },
{ ad:"Æggekage DA", kal:175, pro:11, karb:5, yag:13, lif:0.5, sod:380, por:150, kat:"Æg", ulke:"da", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"æg, fløde, bacon, purløg, salt, peber", katkiMaddeleri:[] },
{ ad:"Æblemos NO", kal:88, pro:0.3, karb:22, yag:0.2, lif:2.5, sod:3, por:150, kat:"Tilbehor", ulke:"no", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"epler, sukker, vann, kanel", katkiMaddeleri:[] },
{ ad:"Øllebrød DA", kal:145, pro:4.5, karb:28, yag:2, lif:4, sod:285, por:250, kat:"Morgenmad", ulke:"da", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"rugbrød, øl, sukker, citronskal, fløde", katkiMaddeleri:[] },
{ ad:"Østers DA", kal:68, pro:8, karb:3.9, yag:2, lif:0, sod:380, por:100, kat:"Skaldyr", ulke:"da", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"østers", katkiMaddeleri:[] },
{ ad:"Ørret Grillet NO", kal:148, pro:20, karb:0, yag:7, lif:0, sod:52, por:150, kat:"Fisk", ulke:"no", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ørret, salt, sitron, dill", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Ä HARFİ (SV / DE / FI)
// ══════════════════════════════════════════════════════
{ ad:"Äppelmos SV", kal:72, pro:0.2, karb:18, yag:0.1, lif:1.5, sod:3, por:100, kat:"Tillbehor", ulke:"sv", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"äpplen, socker, vatten, kanel", katkiMaddeleri:[] },
{ ad:"Äggröra SV", kal:155, pro:11, karb:1, yag:12, lif:0, sod:380, por:150, kat:"Frukost", ulke:"sv", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"ägg, smör, salt, gräslök, grädde", katkiMaddeleri:[] },
{ ad:"Äppelpaj SV", kal:265, pro:3.5, karb:40, yag:11, lif:2.5, sod:185, por:100, kat:"Dessert", ulke:"sv", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"äpplen, vetemjöl, smör, socker, kanel, vanilj", katkiMaddeleri:[] },
{ ad:"Äppelkaka FI", kal:265, pro:3.5, karb:42, yag:10, lif:2, sod:185, por:100, kat:"Leivonnaiset", ulke:"fi", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"omenat, vehnäjauho, voi, sokeri, kaneli, kananmuna", katkiMaddeleri:[] },
{ ad:"Äpfel Strudel DE", kal:285, pro:4.5, karb:42, yag:12, lif:2.5, sod:165, por:100, kat:"Mehlspeisen", ulke:"de", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"Strudelteig, Äpfel, Zucker, Zimt, Rosinen, Butter", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Å HARFİ (SV / DA / NO)
// ══════════════════════════════════════════════════════
{ ad:"Ål Grillad SV", kal:184, pro:18, karb:0, yag:12, lif:0, sod:51, por:100, kat:"Fisk", ulke:"sv", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"ål, salt, dill, citron", katkiMaddeleri:[] },
{ ad:"Ålesuppe DA", kal:115, pro:10, karb:6, yag:6, lif:1, sod:480, por:300, kat:"Fisk", ulke:"da", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"ål, grøntsager, fløde, salt, peber, dild", katkiMaddeleri:[] },
{ ad:"Årets Torsk NO", kal:82, pro:18, karb:0, yag:0.7, lif:0, sod:55, por:150, kat:"Fisk", ulke:"no", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"fersk torsk, salt, sitron", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Ü HARFİ (TR / DE)
// ══════════════════════════════════════════════════════
{ ad:"Üzüm Hoşafı", kal:125, pro:0.8, karb:32, yag:0.2, lif:0.8, sod:5, por:200, kat:"Tatlı", ulke:"tr", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"üzüm, su, şeker", katkiMaddeleri:[] },
{ ad:"Üzüm Reçeli", kal:255, pro:0.4, karb:65, yag:0, lif:0.8, sod:6, por:20, kat:"Reçeller", ulke:"tr", tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"üzüm, şeker, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pektin",tehlikeli:false,aciklama:"Jelleşme maddesi."},{kod:"E330",ad:"Sitrik asit",tehlikeli:false,aciklama:"Asitlik düzenleyici."}] },
{ ad:"Überbackene Kartoffeln DE", kal:225, pro:7, karb:28, yag:10, lif:3, sod:480, por:200, kat:"Beilage", ulke:"de", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"Kartoffeln, Käse, Sahne, Zwiebeln, Salz, Pfeffer", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Ñ HARFİ (ES)
// ══════════════════════════════════════════════════════
{ ad:"Ñora ES (Pimiento Seco)", kal:258, pro:12, karb:52, yag:8, lif:24, sod:35, por:10, kat:"Especias", ulke:"es", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"ñora seca", katkiMaddeleri:[] },
{ ad:"Ñoquis ES (Gnocchi)", kal:195, pro:5.5, karb:38, yag:2, lif:2, sod:285, por:150, kat:"Pasta", ulke:"es", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"patatas, harina, huevo, sal", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Đ HARFİ (HR) — Đuveč
// ══════════════════════════════════════════════════════
{ ad:"Đuveč HR", adLatin:"Djuvec HR", kal:145, pro:8, karb:18, yag:6, lif:4, sod:380, por:250, kat:"Jela", ulke:"hr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"povrće, riža, meso, paradajz, paprika, luk, maslinovo ulje", katkiMaddeleri:[] },
{ ad:"Đakon HR (Rotkvica)", adLatin:"Djakon HR", kal:18, pro:0.7, karb:4.1, yag:0.1, lif:1.6, sod:21, por:100, kat:"Povrce", ulke:"hr", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"rotkva", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Ğ HARFİ (TR) — yumuşak G, sözcük başlatmaz ama
// Ğ ile başlayan yemek olmadığından bu bölüm boş
// ══════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════
// Ș / Ț HARFLERİ (RO) — yemek isimleri
// ══════════════════════════════════════════════════════
{ ad:"Șuncă Afumată RO", adLatin:"Sunca Afumata RO", kal:215, pro:28, karb:0, yag:12, lif:0, sod:1680, por:30, kat:"Mezeluri", ulke:"ro", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"sunca de porc, sare, afumare", katkiMaddeleri:[] },
{ ad:"Țuică RO", adLatin:"Tuica RO", kal:220, pro:0, karb:0, yag:0, lif:0, sod:0, por:40, kat:"Bauturi", ulke:"ro", tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"prune, alcool", katkiMaddeleri:[] },
{ ad:"Șaormă RO", adLatin:"Saorma RO", kal:265, pro:18, karb:28, yag:10, lif:2, sod:580, por:200, kat:"Mancare", ulke:"ro", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"carne de pui sau vita, pita, salata, sos", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Ć / Č (HR/CS/PL) — başlangıç olarak eksik olanlar
// ══════════════════════════════════════════════════════
{ ad:"Ćevapčići HR", adLatin:"Cevapici HR", kal:248, pro:20, karb:4, yag:17, lif:0.5, sod:480, por:150, kat:"Jela", ulke:"hr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"mljevena govedina, janjetina, luk, sol, biber", katkiMaddeleri:[] },
{ ad:"Čabajka SK/CS", adLatin:"Cabajka SK", kal:348, pro:14, karb:3, yag:31, lif:0, sod:1050, por:50, kat:"Maso", ulke:"cs", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"vepřové maso, tuk, sůl, E250, paprika", katkiMaddeleri:[{kod:"E250",ad:"Dusičnan sodný",tehlikeli:true,aciklama:"Ve vysokych davkach karcinogenni."}] },

// ══════════════════════════════════════════════════════
// Ž (LT/HR/CS/LV) — başlangıç olarak
// ══════════════════════════════════════════════════════
{ ad:"Žemaitiška Duona LT", adLatin:"Zemaitiška Duona LT", kal:215, pro:7.5, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Duona", ulke:"lt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ruginiai miltai, vanduo, raugas, druska, kmynai", katkiMaddeleri:[] },
{ ad:"Žuvinė Sriuba LT", adLatin:"Zuvine Sriuba LT", kal:65, pro:7, karb:5, yag:2.5, lif:1, sod:480, por:300, kat:"Sriubos", ulke:"lt", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"žuvis, bulvės, morka, svogūnas, petražolės, druska", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Ś / Ź (PL) başlangıç olanlar
// ══════════════════════════════════════════════════════
{ ad:"Śledź PL (Sledź Marynowany)", adLatin:"Sledz Marynowany PL", kal:155, pro:16, karb:4, yag:8, lif:0, sod:980, por:80, kat:"Ryby", ulke:"pl", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"śledź, ocet, cebula, pieprz, ziele angielskie, E220", katkiMaddeleri:[{kod:"E220",ad:"Dwutlenek siarki",tehlikeli:true,aciklama:"Może powodować reakcje alergiczne."}] },
{ ad:"Śmietana PL", adLatin:"Smietana PL", kal:198, pro:3, karb:3.8, yag:20, lif:0, sod:55, por:100, kat:"Nabial", ulke:"pl", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"śmietana, kultury", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Š (LV / ET) başlangıç olanlar
// ══════════════════════════════════════════════════════
{ ad:"Šķiņķis LV (Kūpināts)", adLatin:"Skinkis LV Kupinats", kal:215, pro:28, karb:0, yag:12, lif:0, sod:1680, por:30, kat:"Gaļas Produkti", ulke:"lv", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"šķiņķis, sāls, kūpinājums", katkiMaddeleri:[] },
{ ad:"Šašliks LV", adLatin:"Sasliks LV", kal:215, pro:22, karb:2, yag:13, lif:0.5, sod:380, por:150, kat:"Gaļa", ulke:"lv", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"cūkgaļa vai liellopa gaļa, sīpoli, garšvielas, etiķis", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// Ç HARFİ (TR)
// ══════════════════════════════════════════════════════
{ ad:"Çılbır", kal:185, pro:12, karb:4, yag:14, lif:0.5, sod:380, por:150, kat:"Kahvaltı", ulke:"tr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"yumurta, yoğurt, sarımsak, tereyağı, pul biber", katkiMaddeleri:[] },
{ ad:"Çökertme Kebabı", kal:295, pro:22, karb:16, yag:16, lif:2, sod:480, por:250, kat:"Et", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"dana bonfile, yoğurt, tereyağı, domates, biber, pide", katkiMaddeleri:[] },
{ ad:"Çemen (Baharat)", kal:323, pro:23, karb:58, yag:6, lif:25, sod:67, por:10, kat:"Baharat", ulke:"tr", tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"çemen otu, kırmızıbiber, sarımsak, kimyon", katkiMaddeleri:[] },
{ ad:"Çoban Salatası", kal:48, pro:1.8, karb:7, yag:2, lif:2.5, sod:180, por:150, kat:"Salata", ulke:"tr", tokPuan:30, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"domates, salatalık, soğan, maydanoz, zeytinyağı, limon, tuz", katkiMaddeleri:[] },
{ ad:"Çulluk Yahnisi", kal:225, pro:22, karb:4, yag:14, lif:1, sod:380, por:200, kat:"Et", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"çulluk eti, soğan, sarımsak, zeytinyağı, tuz, baharat", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// EKSİK ALMANCA ÖZEL HARFLER
// ══════════════════════════════════════════════════════
// ß ile başlayan yemek ismi yoktur (Almanca ß sözcük başı harf değil)

// ══════════════════════════════════════════════════════
// EKSİK LEHÇE ÖZEL HARFLER
// ══════════════════════════════════════════════════════
{ ad:"Ąkacjowy Miód PL", adLatin:"Akacjowy Miod PL", kal:304, pro:0.3, karb:82, yag:0, lif:0, sod:4, por:20, kat:"Sladzone", ulke:"pl", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"miód akacjowy", katkiMaddeleri:[] },
{ ad:"Ćwikła PL", adLatin:"Cwikla PL", kal:55, pro:1.5, karb:12, yag:0.2, lif:2.5, sod:380, por:100, kat:"Surówki", ulke:"pl", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"burak, chrzan, cukier, sól, ocet", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// EKSİK ÇEKÇE ÖZEL HARFLER
// ══════════════════════════════════════════════════════
{ ad:"Řepa CS (Červená)", adLatin:"Repa CS Cervena", kal:43, pro:1.6, karb:10, yag:0.2, lif:2.8, sod:78, por:100, kat:"Zelenina", ulke:"cs", tokPuan:30, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"červená řepa", katkiMaddeleri:[] },
{ ad:"Řízeček CS (Vepřový)", adLatin:"Rizecek CS", kal:295, pro:24, karb:10, yag:18, lif:1, sod:480, por:150, kat:"Maso", ulke:"cs", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"vepřové maso, vejce, mouka, strouhanka, sůl", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// EKSİK MACARCA ÖZEL HARFLER
// ══════════════════════════════════════════════════════
{ ad:"Újházy Tyúkhúsleves HU", adLatin:"Ujhazy Tyukhúsleves HU", kal:88, pro:8.5, karb:5, yag:4, lif:1.5, sod:480, por:300, kat:"Levesek", ulke:"hu", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"tyúk, gyökérzöldség, gomba, karfiol, borsó, tészta, só", katkiMaddeleri:[] },
{ ad:"Ácsi Fánk HU", adLatin:"Acsi Fank HU", kal:348, pro:7, karb:52, yag:15, lif:2, sod:185, por:80, kat:"Sutemeny", ulke:"hu", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"liszt, tojás, tej, cukor, szódabikarbóna, olaj", katkiMaddeleri:[] },
{ ad:"Ószibarack Befőtt HU", adLatin:"Oszibarack Befott HU", kal:68, pro:0.6, karb:17, yag:0.1, lif:1.5, sod:5, por:150, kat:"Befőttek", ulke:"hu", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"őszibarack, cukor, víz, citromsav", katkiMaddeleri:[] },
{ ad:"Úrkúti Kecske Sajt HU", adLatin:"Urkuti Kecske Sajt HU", kal:265, pro:18, karb:1, yag:22, lif:0, sod:650, por:30, kat:"Sajtok", ulke:"hu", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"kecsketej, só, oltó", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// EKSİK LETONCA ÖZEL HARFLER
// ══════════════════════════════════════════════════════
{ ad:"Ķirbju Zupa LV", adLatin:"Kirbju Zupa LV", kal:72, pro:1.5, karb:10, yag:3, lif:2, sod:380, por:300, kat:"Zupi", ulke:"lv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"ķirbis, sīpols, ķiploks, ingvers, krējums, sāls", katkiMaddeleri:[] },
{ ad:"Ķiploku Maizīte LV", adLatin:"Kiploku Maizite LV", kal:285, pro:7, karb:42, yag:10, lif:2.5, sod:520, por:100, kat:"Maize", ulke:"lv", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"maize, ķiploki, sviests, sāls", katkiMaddeleri:[] },
{ ad:"Ņemeckais Kūpinājums LV", adLatin:"Nemeckais Kupinajums LV", kal:215, pro:20, karb:0, yag:15, lif:0, sod:980, por:50, kat:"Gaļas Produkti", ulke:"lv", tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"cūkgaļa, sāls, kūpinājums, E250", katkiMaddeleri:[{kod:"E250",ad:"Nātrija nitrīts",tehlikeli:true,aciklama:"Lielās devās kancerogēns."}] },
{ ad:"Ūdens Burkāni LV (Marinēti)", adLatin:"Udens Burkani LV", kal:35, pro:0.9, karb:8, yag:0.2, lif:2.8, sod:480, por:100, kat:"Marinēti", ulke:"lv", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"burkāni, ūdens, etiķis, cukurs, sāls, lauru lapa", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// EKSİK ESTONCA ÖZEL HARFLER
// ══════════════════════════════════════════════════════
{ ad:"Õunamoos ET", adLatin:"Ounamoos ET", kal:72, pro:0.2, karb:18, yag:0.1, lif:1.5, sod:3, por:100, kat:"Moosid", ulke:"et", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"õunad, suhkur, kaneel, sidrunimahl", katkiMaddeleri:[] },
{ ad:"Õunapirukas ET", adLatin:"Ounapirukas ET", kal:265, pro:3.5, karb:42, yag:10, lif:2, sod:185, por:100, kat:"Pirukad", ulke:"et", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"nisujahu, õunad, suhkur, või, kaneel, kaneelisuhkur", katkiMaddeleri:[] },
{ ad:"Õllekala ET", adLatin:"Ollekala ET", kal:165, pro:18, karb:5, yag:8, lif:0.5, sod:480, por:200, kat:"Kala", ulke:"et", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"kala, õlu, sibul, loorberileht, pipar, sool", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// EKSİK LİTVANCA ÖZEL HARFLER
// ══════════════════════════════════════════════════════
{ ad:"Ūkininko Duona LT", adLatin:"Ukininko Duona LT", kal:215, pro:7.5, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Duona", ulke:"lt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ruginiai miltai, vanduo, raugas, druska", katkiMaddeleri:[] },
{ ad:"Ūsoriai LT (Tütsülenmiş Balık)", adLatin:"Usoriai LT", kal:195, pro:22, karb:0, yag:12, lif:0, sod:980, por:80, kat:"Zuvis", ulke:"lt", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"rūkyta žuvis, druska", katkiMaddeleri:[] },
{ ad:"Ąžuolų Medus LT", adLatin:"Azuolu Medus LT", kal:304, pro:0.3, karb:82, yag:0, lif:0, sod:4, por:20, kat:"Saldikliai", ulke:"lt", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"ąžuolų medus", katkiMaddeleri:[] },
{ ad:"Ęgliškos Bulvės LT (Keptuvėje)", adLatin:"Egliiskos Bulves LT", kal:175, pro:3, karb:24, yag:8, lif:3, sod:380, por:200, kat:"Garnyras", ulke:"lt", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"bulvės, svogūnas, riebalai, druska, pipirai", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// EKSİK RUMENCE ÖZEL HARFLER
// ══════════════════════════════════════════════════════
{ ad:"Ărdelenesc Ciorbă RO", adLatin:"Ardelenesc Ciorba RO", kal:125, pro:8, karb:12, yag:5.5, lif:3, sod:520, por:350, kat:"Ciorbe", ulke:"ro", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"carne de porc, legume, bors, smantana, tarragon, sare", katkiMaddeleri:[] },
{ ad:"Ăblămare RO (Plăcintă)", adLatin:"Ablămare RO Placinta", kal:285, pro:5.5, karb:44, yag:12, lif:2, sod:185, por:100, kat:"Patiserie", ulke:"ro", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"faina, oua, lapte, unt, zahar, mar, scortisoara", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// EKSİK YUNANCA HARFLER (Α Δ Η Θ Ψ)
// ══════════════════════════════════════════════════════
{ ad:"Αρνί Κλέφτικο", adLatin:"Arni Kleftiko", kal:285, pro:26, karb:3, yag:19, lif:0.8, sod:380, por:250, kat:"Kyria Piata", ulke:"el", tokPuan:72, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"arnaki, elaiolado, skordho, rigani, retsina, alati, piperi", katkiMaddeleri:[] },
{ ad:"Αγκινάρες à la Polita", adLatin:"Agkinares a la Polita", kal:115, pro:3.5, karb:14, yag:5.5, lif:5, sod:280, por:200, kat:"Ladera", ulke:"el", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"agkinares, patates, karoto, annitho, elaiolado, lemoni, alati", katkiMaddeleri:[] },
{ ad:"Αβγοτάραχο EL", adLatin:"Avgotaracho EL", kal:265, pro:28, karb:3.9, yag:16, lif:0, sod:1500, por:30, kat:"Delicatessen", ulke:"el", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"avgotaracho Mesologiou", katkiMaddeleri:[] },
{ ad:"Δολμάς EL", adLatin:"Dolmas EL", kal:155, pro:4.5, karb:20, yag:7, lif:2.5, sod:280, por:100, kat:"Mezedes", ulke:"el", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"ambelofylla, rizi, kremydaki, lemoni, elaiolado, diosmos, anithos", katkiMaddeleri:[] },
{ ad:"Δίπλες EL", adLatin:"Diples EL", kal:365, pro:5.5, karb:52, yag:17, lif:1.5, sod:185, por:80, kat:"Glika", ulke:"el", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"aleuron, avga, portokali, meli, karidia, kanela, elaiolado", katkiMaddeleri:[] },
{ ad:"Ηπειρώτικη Πίτα", adLatin:"Ipeirotiki Pita", kal:265, pro:10, karb:30, yag:14, lif:2, sod:480, por:150, kat:"Pites", ulke:"el", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"homemade filo, feta, gala, avga, voutiro, alati", katkiMaddeleri:[] },
{ ad:"Θαλασσινά Σχάρας", adLatin:"Thalassina Scharás", kal:145, pro:22, karb:2, yag:5.5, lif:0.5, sod:380, por:200, kat:"Thalassina", ulke:"el", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"garidhes, kalamari, chtapodi, elaiolado, lemoni, rigani, alati", katkiMaddeleri:[] },
{ ad:"Θεσσαλονίκης Μπουγάτσα", adLatin:"Thessalonikis Bougatsa", kal:335, pro:8, karb:44, yag:16, lif:1.5, sod:285, por:100, kat:"Artopoiia", ulke:"el", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"filo, semolina krema, zachari, kanela, voutiro", katkiMaddeleri:[] },
{ ad:"Ψάρι Πλακί", adLatin:"Psari Plaki", kal:145, pro:20, karb:6, yag:6, lif:1.5, sod:380, por:200, kat:"Psaria", ulke:"el", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"psari, tomates, kremidi, skordho, elaiolado, maidanos, alati", katkiMaddeleri:[] },
{ ad:"Ψωμί Σπιτικό", adLatin:"Psomi Spitiko", kal:235, pro:8, karb:44, yag:2.5, lif:5, sod:480, por:100, kat:"Artopoiia", ulke:"el", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"aleuron, nero, alati, prozia", katkiMaddeleri:[] },
{ ad:"Ψητό Αρνί", adLatin:"Psito Arni", kal:265, pro:26, karb:0, yag:18, lif:0, sod:65, por:150, kat:"Kreas", ulke:"el", tokPuan:72, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"arnaki, skordho, lemoni, rigani, elaiolado, alati", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// KAYIP BÖLGELER — diğer alfabe karakterlerinden
// ══════════════════════════════════════════════════════
// Ó (PL) — Óvar peyniri Macar kökenli ama PL'de kullanılıyor
{ ad:"Óvári Sajt HU", adLatin:"Ovari Sajt HU", kal:315, pro:22, karb:0.5, yag:26, lif:0, sod:680, por:30, kat:"Sajtok", ulke:"hu", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"tehéntej, só, oltó, szárítás", katkiMaddeleri:[] },

// Ā (LV) — Āboliņš / Āboļu sula var
{ ad:"Āboļu Sula LV", adLatin:"Abolu Sula LV", kal:48, pro:0.1, karb:11, yag:0.1, lif:0.2, sod:3, por:200, kat:"Dzērieni", ulke:"lv", tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"ābolu sula, E330", katkiMaddeleri:[{kod:"E330",ad:"Citronskābe",tehlikeli:false,aciklama:"Skābuma regulators."}] },
{ ad:"Āboļu Kūka LV", adLatin:"Abolu Kuka LV", kal:265, pro:3.5, karb:42, yag:10, lif:2, sod:185, por:100, kat:"Kūkas", ulke:"lv", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"āboli, kviešu milti, sviests, cukurs, olas, kanēlis", katkiMaddeleri:[] },

// Ē (LV) — Ēdiens
{ ad:"Ērgļu Piparkūkas LV", adLatin:"Erglu Piparkukas LV", kal:385, pro:5.5, karb:68, yag:11, lif:2, sod:185, por:30, kat:"Saldumi", ulke:"lv", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"kviešu milti, cukurs, medus, sviests, ingvers, kanēlis, krustnagliņas", katkiMaddeleri:[] },

// İ (TR) — İ noktasız İ - Turkish dotted İ
{ ad:"İnegöl Köftesi", kal:245, pro:20, karb:5, yag:17, lif:0.5, sod:380, por:150, kat:"Et", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"dana kıyma, soğan, tuz, karabiber", katkiMaddeleri:[] },
{ ad:"İçli Pilav", kal:245, pro:6.5, karb:42, yag:8, lif:2, sod:285, por:150, kat:"Tahıl", ulke:"tr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"pirinç, tavuk ciğeri, çam fıstığı, kuş üzümü, tereyağı, tuz", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// MEYVE ÇEŞİTLERİ
// ══════════════════════════════════════════════════════

// ── Elma çeşitleri ──
{ ad:"Elma (Granny Smith)", adler:{tr:"Granny Smith Elma",de:"Granny Smith Apfel",el:"Μήλο Γκράνι Σμιθ",hu:"Granny Smith Alma",pl:"Jabłko Granny Smith",cs:"Jablko Granny Smith",ro:"Măr Granny Smith",hr:"Jabuka Granny Smith",fr:"Pomme Granny Smith",es:"Manzana Granny Smith",it:"Mela Granny Smith",pt:"Maçã Granny Smith",no:"Granny Smith Eple",sv:"Granny Smith Äpple",da:"Granny Smith Æble",fi:"Granny Smith Omena",nl:"Granny Smith Appel",lv:"Granny Smith Ābols",et:"Granny Smith Õun",lt:"Granny Smith Obuolys"}, kal:52, pro:0.3, karb:14, yag:0.2, lif:2.4, sod:1, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"elma", katkiMaddeleri:[] },
{ ad:"Elma (Fuji)", adler:{tr:"Fuji Elma",de:"Fuji Apfel",el:"Μήλο Φούτζι",hu:"Fuji Alma",pl:"Jabłko Fuji",cs:"Jablko Fuji",ro:"Măr Fuji",hr:"Jabuka Fuji",fr:"Pomme Fuji",es:"Manzana Fuji",it:"Mela Fuji",pt:"Maçã Fuji",no:"Fuji Eple",sv:"Fuji Äpple",da:"Fuji Æble",fi:"Fuji Omena",nl:"Fuji Appel",lv:"Fuji Ābols",et:"Fuji Õun",lt:"Fuji Obuolys"}, kal:54, pro:0.3, karb:14, yag:0.2, lif:2.4, sod:1, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"elma", katkiMaddeleri:[] },
{ ad:"Elma (Golden)", adler:{tr:"Golden Elma",de:"Golden Delicious Apfel",el:"Μήλο Γκόλντεν",hu:"Golden Alma",pl:"Jabłko Golden",cs:"Jablko Golden Delicious",ro:"Măr Golden",hr:"Jabuka Golden",fr:"Pomme Golden",es:"Manzana Golden",it:"Mela Golden",pt:"Maçã Golden",no:"Golden Eple",sv:"Golden Äpple",da:"Golden Æble",fi:"Golden Omena",nl:"Golden Appel",lv:"Golden Ābols",et:"Golden Õun",lt:"Golden Obuolys"}, kal:52, pro:0.3, karb:14, yag:0.1, lif:2.4, sod:1, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"elma", katkiMaddeleri:[] },

// ── Armut çeşitleri ──
{ ad:"Armut (Williams)", adler:{tr:"Williams Armutu",de:"Williams Birne",el:"Αχλάδι Williams",hu:"Williams Körte",pl:"Gruszka Williams",cs:"Hruška Williams",ro:"Pară Williams",hr:"Kruška Williams",fr:"Poire Williams",es:"Pera Williams",it:"Pera Williams",pt:"Pêra Williams",no:"Williams Pære",sv:"Williams Päron",da:"Williams Pære",fi:"Williams Päärynä",nl:"Williams Peer",lv:"Williams Bumbieris",et:"Williams Pirn",lt:"Williams Kriaušė"}, kal:57, pro:0.4, karb:15, yag:0.1, lif:3.1, sod:1, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"armut", katkiMaddeleri:[] },

// ── Kiraz / Vişne ──
{ ad:"Kiraz (Tatlı)", adler:{tr:"Tatlı Kiraz",de:"Süßkirsche",el:"Κεράσι",hu:"Cseresznye",pl:"Czereśnia",cs:"Třešeň",ro:"Cireașă",hr:"Trešnja",fr:"Cerise",es:"Cereza",it:"Ciliegia",pt:"Cereja",no:"Søtkirsebær",sv:"Körsbär",da:"Sødkirsebær",fi:"Kirsikka",nl:"Kers",lv:"Ķirsis",et:"Kirss",lt:"Vyšnia"}, kal:63, pro:1.1, karb:16, yag:0.2, lif:2.1, sod:0, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"kiraz", katkiMaddeleri:[] },
{ ad:"Vişne (Ekşi Kiraz)", adler:{tr:"Vişne",de:"Sauerkirsche",el:"Βύσσινο",hu:"Meggy",pl:"Wiśnia",cs:"Višeň",ro:"Vișină",hr:"Višnja",fr:"Griotte",es:"Guinda",it:"Amarena",pt:"Ginja",no:"Surkirsebær",sv:"Surkörsbär",da:"Surkirsebær",fi:"Hapankirsikka",nl:"Zure Kers",lv:"Skābais Ķirsis",et:"Hapu Kirss",lt:"Rūgščioji Vyšnia"}, kal:50, pro:1, karb:12, yag:0.3, lif:1.6, sod:3, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"vişne", katkiMaddeleri:[] },

// ── Kayısı / Şeftali ──
{ ad:"Kayısı", adler:{tr:"Kayısı",de:"Aprikose",el:"Βερίκοκο",hu:"Sárgabarack",pl:"Morela",cs:"Meruňka",ro:"Caisă",hr:"Marelica",fr:"Abricot",es:"Albaricoque",it:"Albicocca",pt:"Alperce",no:"Aprikos",sv:"Aprikos",da:"Abrikos",fi:"Aprikoosi",nl:"Abrikoos",lv:"Aprikoze",et:"Aprikoos",lt:"Abrikotas"}, kal:48, pro:1.4, karb:11, yag:0.4, lif:2, sod:1, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"kayısı", katkiMaddeleri:[] },

// ── Muz ──

// ── Avokado ──

// ── Yaban Meyveleri ──
{ ad:"Yaban Mersini (Blueberry)", adler:{tr:"Yaban Mersini",de:"Blaubeere",el:"Βακκίνιο",hu:"Áfonya",pl:"Borówka Czarna",cs:"Borůvka",ro:"Afine",hr:"Borovnica",fr:"Myrtille",es:"Arándano",it:"Mirtillo",pt:"Mirtilo",no:"Blåbær",sv:"Blåbär",da:"Blåbær",fi:"Mustikka",nl:"Bosbes",lv:"Mellene",et:"Mustikas",lt:"Mėlynė"}, kal:57, pro:0.7, karb:14, yag:0.3, lif:2.4, sod:1, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"yaban mersini", katkiMaddeleri:[] },
{ ad:"Böğürtlen (Blackberry)", adler:{tr:"Böğürtlen",de:"Brombeere",el:"Βατόμουρο",hu:"Szeder",pl:"Jeżyna",cs:"Ostružina",ro:"Mure",hr:"Kupina",fr:"Mûre",es:"Mora",it:"Mora",pt:"Amora",no:"Bjørnebær",sv:"Björnbär",da:"Brombær",fi:"Karhunvatukka",nl:"Braam",lv:"Kazene",et:"Mustsõstar",lt:"Gervuogė"}, kal:43, pro:1.4, karb:10, yag:0.5, lif:5.3, sod:1, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"böğürtlen", katkiMaddeleri:[] },
{ ad:"Kuşburnu", adler:{tr:"Kuşburnu",de:"Hagebutte",el:"Τριανταφυλλιά",hu:"Csipkebogyó",pl:"Dzika Róża",cs:"Šípek",ro:"Măceș",hr:"Šipak",fr:"Cynorrhodon",es:"Escaramujo",it:"Rosa Canina",pt:"Rosa Silvestre",no:"Nype",sv:"Nypon",da:"Hyben",fi:"Ruusunmarja",nl:"Rozenbottel",lv:"Mežrozītes",et:"Kibuvits",lt:"Šaltekšnis"}, kal:162, pro:3.6, karb:38, yag:0.3, lif:24, sod:4, por:100, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"kuşburnu", katkiMaddeleri:[] },

// ── Ananas / Papaya / Passion ──
{ ad:"Karpuz", adler:{tr:"Karpuz",de:"Wassermelone",el:"Καρπούζι",hu:"Görögdinnye",pl:"Arbuz",cs:"Vodní Meloun",ro:"Pepene Verde",hr:"Lubenica",fr:"Pastèque",es:"Sandía",it:"Anguria",pt:"Melancia",no:"Vannmelon",sv:"Vattenmelon",da:"Vandmelon",fi:"Vesimeloni",nl:"Watermeloen",lv:"Arbūzs",et:"Arbuus",lt:"Arbūzas"}, kal:30, pro:0.6, karb:7.6, yag:0.2, lif:0.4, sod:1, por:200, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"karpuz", katkiMaddeleri:[] },
{ ad:"Kavun", adler:{tr:"Kavun",de:"Honigmelone",el:"Πεπόνι",hu:"Sárgadinnye",pl:"Melon Żółty",cs:"Žlutý Meloun",ro:"Pepene Galben",hr:"Dinja",fr:"Melon Miel",es:"Melón Cantalupo",it:"Melone Giallo",pt:"Melão Amarelo",no:"Honningmelon",sv:"Honungsmelon",da:"Honningmelon",fi:"Hunajameloni",nl:"Honingmeloen",lv:"Dzeltenis Melone",et:"Kollane Melon",lt:"Geltonasis Melionas"}, kal:34, pro:0.8, karb:8.2, yag:0.2, lif:0.9, sod:16, por:200, kat:"Fruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"kavun", katkiMaddeleri:[] },

// ── Kuru Meyveler ──
{ ad:"Kuru Üzüm (Raisin)", adler:{tr:"Kuru Üzüm",de:"Rosinen",el:"Σταφίδες",hu:"Mazsola",pl:"Rodzynki",cs:"Rozinky",ro:"Stafide",hr:"Grožđice",fr:"Raisins Secs",es:"Pasas",it:"Uva Passa",pt:"Passas",no:"Rosiner",sv:"Russin",da:"Rosiner",fi:"Rusinat",nl:"Rozijnen",lv:"Rozīnes",et:"Rosinad",lt:"Razinos"}, kal:299, pro:3.1, karb:79, yag:0.5, lif:3.7, sod:11, por:30, kat:"DriedFruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"kuru üzüm", katkiMaddeleri:[] },
{ ad:"Kuru Kayısı", adler:{tr:"Kuru Kayısı",de:"Getrocknete Aprikosen",el:"Αποξηραμένα Βερίκοκα",hu:"Aszalt Sárgabarack",pl:"Suszone Morele",cs:"Sušené Meruňky",ro:"Caise Uscate",hr:"Sušene Marelice",fr:"Abricots Secs",es:"Albaricoques Secos",it:"Albicocche Secche",pt:"Damascos Secos",no:"Tørkede Aprikoser",sv:"Torkade Aprikoser",da:"Tørrede Abrikoser",fi:"Kuivatut Aprikoosit",nl:"Gedroogde Abrikozen",lv:"Kaltētas Aprikozes",et:"Kuivatatud Aprikoosid",lt:"Džiovinti Abrikosai"}, kal:241, pro:3.4, karb:63, yag:0.5, lif:7.3, sod:10, por:30, kat:"DriedFruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"kuru kayısı, E220", katkiMaddeleri:[{kod:"E220",ad:"Sulphur dioxide",tehlikeli:true,aciklama:"May cause allergic reactions."}] },
{ ad:"Hurma (Taze)", adler:{tr:"Hurma",de:"Dattel",el:"Χουρμάς",hu:"Datolya",pl:"Daktyl",cs:"Datle",ro:"Curmale",hr:"Datulja",fr:"Datte",es:"Dátil",it:"Dattero",pt:"Tâmara",no:"Dadler",sv:"Dadlar",da:"Dadler",fi:"Taatelit",nl:"Dadel",lv:"Datele",et:"Datlid",lt:"Datulės"}, kal:277, pro:1.8, karb:75, yag:0.2, lif:6.7, sod:1, por:30, kat:"DriedFruit", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"hurma", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// SEBZE ÇEŞİTLERİ
// ══════════════════════════════════════════════════════

// ── Domates çeşitleri ──
{ ad:"Cherry Domates", adler:{tr:"Cherry Domates",de:"Kirschtomaten",el:"Τοματίνια",hu:"Koktélparadicsom",pl:"Pomidorki Koktajlowe",cs:"Cherry Rajčata",ro:"Roșii Cherry",hr:"Cherry Rajčica",fr:"Tomates Cerises",es:"Tomates Cherry",it:"Pomodorini",pt:"Tomates Cherry",no:"Cherrytomater",sv:"Körsbärstomater",da:"Cherrytomater",fi:"Kirsikkatomaatit",nl:"Cherrytomaatjes",lv:"Ķiršu Tomāti",et:"Kirsstomatid",lt:"Vyšniniai Pomidorai"}, kal:18, pro:0.9, karb:3.9, yag:0.2, lif:1.2, sod:5, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"cherry domates", katkiMaddeleri:[] },
{ ad:"Domates (Konserve)", adler:{tr:"Konserve Domates",de:"Dosentomaten",el:"Ντομάτες Κονσέρβα",hu:"Konzerv Paradicsom",pl:"Pomidory z Puszki",cs:"Konzervovaná Rajčata",ro:"Roșii Conservate",hr:"Konzervirana Rajčica",fr:"Tomates en Conserve",es:"Tomates en Lata",it:"Pomodori in Scatola",pt:"Tomates em Lata",no:"Hermetiske Tomater",sv:"Konserverade Tomater",da:"Dåsekatte Tomater",fi:"Säilyketomaat",nl:"Blikje Tomaten",lv:"Konservēti Tomāti",et:"Konserveeritud Tomatid",lt:"Konservuoti Pomidorai"}, kal:17, pro:0.8, karb:3.5, yag:0.2, lif:1.1, sod:180, por:200, kat:"Canned", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"domates, domates suyu, sitrik asit, E330", katkiMaddeleri:[{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."}] },

// ── Patates çeşitleri ──
{ ad:"Patates (Tatlı / Yer Elması)", adler:{tr:"Tatlı Patates",de:"Süßkartoffel",el:"Γλυκοπατάτα",hu:"Édesburgonya",pl:"Batat",cs:"Batát",ro:"Cartof Dulce",hr:"Slatki Krumpir",fr:"Patate Douce",es:"Boniato",it:"Patata Dolce",pt:"Batata Doce",no:"Søtpotet",sv:"Sötpotatis",da:"Sødkartoffel",fi:"Bataatti",nl:"Zoete Aardappel",lv:"Saldais Kartupelis",et:"Bataat",lt:"Batatai"}, kal:86, pro:1.6, karb:20, yag:0.1, lif:3, sod:55, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"tatlı patates", katkiMaddeleri:[] },

// ── Biber çeşitleri ──
{ ad:"Kırmızı Biber (Dolmalık)", adler:{tr:"Kırmızı Dolmalık Biber",de:"Rote Paprika",el:"Κόκκινη Πιπεριά",hu:"Piros Paprika",pl:"Czerwona Papryka",cs:"Červená Paprika",ro:"Ardei Roșu",hr:"Crvena Paprika",fr:"Poivron Rouge",es:"Pimiento Rojo",it:"Peperone Rosso",pt:"Pimento Vermelho",no:"Rød Paprika",sv:"Röd Paprika",da:"Rød Peber",fi:"Punainen Paprika",nl:"Rode Paprika",lv:"Sarkanā Paprika",et:"Punane Paprika",lt:"Raudonoji Paprika"}, kal:31, pro:1, karb:7.1, yag:0.3, lif:2.1, sod:4, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"kırmızı biber", katkiMaddeleri:[] },
{ ad:"Sarı Biber (Dolmalık)", adler:{tr:"Sarı Dolmalık Biber",de:"Gelbe Paprika",el:"Κίτρινη Πιπεριά",hu:"Sárga Paprika",pl:"Żółta Papryka",cs:"Žlutá Paprika",ro:"Ardei Galben",hr:"Žuta Paprika",fr:"Poivron Jaune",es:"Pimiento Amarillo",it:"Peperone Giallo",pt:"Pimento Amarelo",no:"Gul Paprika",sv:"Gul Paprika",da:"Gul Peber",fi:"Keltainen Paprika",nl:"Gele Paprika",lv:"Dzeltenā Paprika",et:"Kollane Paprika",lt:"Geltonoji Paprika"}, kal:27, pro:1, karb:6.3, yag:0.2, lif:1.7, sod:2, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"sarı biber", katkiMaddeleri:[] },

// ── Lahana / Yeşillik ──
{ ad:"Brokoli", adler:{tr:"Brokoli",de:"Brokkoli",el:"Μπρόκολο",hu:"Brokkoli",pl:"Brokuł",cs:"Brokolice",ro:"Broccoli",hr:"Brokula",fr:"Brocoli",es:"Brócoli",it:"Broccolo",pt:"Brócolos",no:"Brokkoli",sv:"Broccoli",da:"Broccoli",fi:"Parsakaali",nl:"Broccoli",lv:"Brokoļi",et:"Spargelkapsas",lt:"Brokoliai"}, kal:34, pro:2.8, karb:7, yag:0.4, lif:2.6, sod:33, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"brokoli", katkiMaddeleri:[] },
{ ad:"Karnabahar", adler:{tr:"Karnabahar",de:"Blumenkohl",el:"Κουνουπίδι",hu:"Karfiol",pl:"Kalafior",cs:"Květák",ro:"Conopidă",hr:"Cvjetača",fr:"Chou-fleur",es:"Coliflor",it:"Cavolfiore",pt:"Couve-flor",no:"Blomkål",sv:"Blomkål",da:"Blomkål",fi:"Kukkakaali",nl:"Bloemkool",lv:"Ziedkāposts",et:"Lillkapsas",lt:"Žiedinis Kopūstas"}, kal:25, pro:1.9, karb:5, yag:0.3, lif:2, sod:30, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"karnabahar", katkiMaddeleri:[] },
{ ad:"Bürüksel Lahanası", adler:{tr:"Brüksel Lahanası",de:"Rosenkohl",el:"Λαχανάκια Βρυξελλών",hu:"Kelbimbó",pl:"Brukselka",cs:"Růžičková Kapusta",ro:"Varză de Bruxelles",hr:"Prokelj",fr:"Choux de Bruxelles",es:"Coles de Bruselas",it:"Cavolini di Bruxelles",pt:"Couve de Bruxelas",no:"Rosenkål",sv:"Brysselkål",da:"Rosenkål",fi:"Ruusukaalit",nl:"Spruitjes",lv:"Briseles Kāposti",et:"Rooskapsas",lt:"Briuselio Kopūstai"}, kal:43, pro:3.4, karb:9, yag:0.3, lif:3.8, sod:25, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"brüksel lahanası", katkiMaddeleri:[] },
{ ad:"Bezelye (Taze)", adler:{tr:"Taze Bezelye",de:"Erbsen",el:"Φρέσκος Αρακάς",hu:"Friss Zöldborsó",pl:"Zielony Groszek",cs:"Hrášek",ro:"Mazăre",hr:"Grašak",fr:"Petits Pois",es:"Guisantes Frescos",it:"Piselli Freschi",pt:"Ervilhas Frescas",no:"Erter",sv:"Ärtor",da:"Ærter",fi:"Herneet",nl:"Erwtjes",lv:"Zirņi",et:"Herned",lt:"Žirniai"}, kal:81, pro:5.4, karb:14, yag:0.4, lif:5.5, sod:5, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"taze bezelye", katkiMaddeleri:[] },
{ ad:"Kereviz (Kök)", adler:{tr:"Kereviz",de:"Sellerie",el:"Σέλινο",hu:"Zeller",pl:"Seler",cs:"Celer",ro:"Ţelină",hr:"Celer",fr:"Céleri",es:"Apio",it:"Sedano",pt:"Aipo",no:"Selleri",sv:"Selleri",da:"Selleri",fi:"Selleri",nl:"Selderij",lv:"Selerija",et:"Seller",lt:"Salierai"}, kal:42, pro:1.5, karb:9.2, yag:0.3, lif:1.8, sod:100, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"kereviz", katkiMaddeleri:[] },
{ ad:"Pırasa", adler:{tr:"Pırasa",de:"Porree",el:"Πράσο",hu:"Póréhagyma",pl:"Por",cs:"Pórek",ro:"Praz",hr:"Poriluk",fr:"Poireau",es:"Puerro",it:"Porro",pt:"Alho-Francês",no:"Purre",sv:"Purjolök",da:"Porre",fi:"Purjosipuli",nl:"Prei",lv:"Poras",et:"Porrulauk",lt:"Poras"}, kal:61, pro:1.5, karb:14, yag:0.3, lif:1.8, sod:20, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"pırasa", katkiMaddeleri:[] },
{ ad:"Semizotu", adler:{tr:"Semizotu",de:"Portulak",el:"Αντράκλα",hu:"Portulák",pl:"Portulaka",cs:"Portulák",ro:"Ştir",hr:"Tušanj",fr:"Pourpier",es:"Verdolaga",it:"Portulaca",pt:"Beldroega",no:"Portulakk",sv:"Portlak",da:"Portulak",fi:"Portulakki",nl:"Postelein",lv:"Portulaks",et:"Portulak",lt:"Portulakasas"}, kal:16, pro:1.3, karb:3.4, yag:0.1, lif:0.4, sod:45, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"semizotu", katkiMaddeleri:[] },
{ ad:"Kuşkonmaz (Beyaz)", adler:{tr:"Beyaz Kuşkonmaz",de:"Weißer Spargel",el:"Λευκό Σπαράγγι",hu:"Fehér Spárga",pl:"Biały Szparag",cs:"Bílý Chřest",ro:"Sparanghel Alb",hr:"Bijele Šparoge",fr:"Asperge Blanche",es:"Espárrago Blanco",it:"Asparago Bianco",pt:"Espargo Branco",no:"Hvit Asparges",sv:"Vit Sparris",da:"Hvid Asparges",fi:"Valkoinen Parsa",nl:"Witte Asperge",lv:"Baltais Sparģelis",et:"Valge Spargel",lt:"Baltieji Šparagas"}, kal:18, pro:2, karb:3.1, yag:0.1, lif:2, sod:2, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"beyaz kuşkonmaz", katkiMaddeleri:[] },
{ ad:"Pancar (Kırmızı)", adler:{tr:"Kırmızı Pancar",de:"Rote Bete",el:"Κόκκινο Παντζάρι",hu:"Cékla",pl:"Burak Czerwony",cs:"Červená Řepa",ro:"Sfeclă Roșie",hr:"Cikla",fr:"Betterave Rouge",es:"Remolacha",it:"Barbabietola",pt:"Beterraba",no:"Rødbeter",sv:"Rödbeta",da:"Rødbede",fi:"Punajuurikas",nl:"Rode Biet",lv:"Sarkanā Biete",et:"Peet",lt:"Burokėliai"}, kal:43, pro:1.6, karb:10, yag:0.2, lif:2.8, sod:78, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"kırmızı pancar", katkiMaddeleri:[] },
{ ad:"Balkabağı", adler:{tr:"Balkabağı",de:"Kürbis",el:"Κολοκύθα",hu:"Tök",pl:"Dynia",cs:"Dýně",ro:"Dovleac",hr:"Bundeva",fr:"Courge",es:"Calabaza",it:"Zucca",pt:"Abóbora",no:"Gresskar",sv:"Pumpa",da:"Græskar",fi:"Kurpitsa",nl:"Pompoen",lv:"Ķirbis",et:"Kõrvits",lt:"Moliūgas"}, kal:26, pro:1, karb:6.5, yag:0.1, lif:0.5, sod:1, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"balkabağı", katkiMaddeleri:[] },
{ ad:"Biberiye", adler:{tr:"Biberiye",de:"Rosmarin",el:"Δεντρολίβανο",hu:"Rozmaring",pl:"Rozmaryn",cs:"Rozmarýn",ro:"Rozmarin",hr:"Ružmarin",fr:"Romarin",es:"Romero",it:"Rosmarino",pt:"Alecrim",no:"Rosmarin",sv:"Rosmarin",da:"Rosmarin",fi:"Rosmariini",nl:"Rozemarijn",lv:"Rozmarīns",et:"Rosmariin",lt:"Rozmarinas"}, kal:131, pro:3.3, karb:21, yag:5.9, lif:14, sod:26, por:5, kat:"Herb", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"taze biberiye", katkiMaddeleri:[] },
{ ad:"Kişniş (Taze)", adler:{tr:"Kişniş",de:"Koriander",el:"Κόλιανδρος",hu:"Koriander",pl:"Kolendra",cs:"Koriandr",ro:"Coriandru",hr:"Korijander",fr:"Coriandre",es:"Cilantro",it:"Coriandolo",pt:"Coentros",no:"Koriander",sv:"Koriander",da:"Koriander",fi:"Korianteri",nl:"Koriander",lv:"Koriandrs",et:"Koriander",lt:"Kalendra"}, kal:23, pro:2.1, karb:3.7, yag:0.5, lif:2.8, sod:46, por:10, kat:"Herb", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"taze kişniş", katkiMaddeleri:[] },
{ ad:"Roka (Arugula)", adler:{tr:"Roka",de:"Rucola",el:"Ρόκα",hu:"Rukkola",pl:"Rukola",cs:"Rukola",ro:"Rucola",hr:"Rikula",fr:"Roquette",es:"Rúcula",it:"Rucola",pt:"Rúcula",no:"Ruccola",sv:"Rucola",da:"Rucola",fi:"Rucola",nl:"Rucola",lv:"Rukola",et:"Rukola",lt:"Rukola"}, kal:25, pro:2.6, karb:3.7, yag:0.7, lif:1.6, sod:27, por:100, kat:"Salad", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"roka", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// PEYNİR ÇEŞİTLERİ
// ══════════════════════════════════════════════════════

// ── İngiliz Peynirleri ──
{ ad:"Stilton EN", kal:411, pro:24, karb:0.1, yag:35, lif:0, sod:1150, por:30, kat:"Cheese", ulke:"en", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"pasteurised cow's milk, salt, rennet, Penicillium roqueforti", katkiMaddeleri:[] },
{ ad:"Red Leicester EN", kal:395, pro:24, karb:0.5, yag:33, lif:0, sod:620, por:30, kat:"Cheese", ulke:"en", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"cow's milk, salt, rennet, annatto E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Natural colouring."}] },
{ ad:"Wensleydale EN", kal:375, pro:23, karb:0.5, yag:31, lif:0, sod:590, por:30, kat:"Cheese", ulke:"en", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"cow's milk, salt, rennet", katkiMaddeleri:[] },
{ ad:"Brie EN", kal:334, pro:21, karb:0.5, yag:28, lif:0, sod:629, por:30, kat:"Cheese", ulke:"en", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"cow's milk, salt, rennet, white mould", katkiMaddeleri:[] },

// ── Fransız Peynirleri ──
{ ad:"Camembert de Normandie FR", kal:300, pro:20, karb:0.5, yag:24, lif:0, sod:842, por:30, kat:"Fromages", ulke:"fr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"lait cru, sel, présure, moisissures", katkiMaddeleri:[] },
{ ad:"Roquefort FR", kal:369, pro:22, karb:2, yag:31, lif:0, sod:1809, por:30, kat:"Fromages", ulke:"fr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"lait cru de brebis, sel, présure, Penicillium roqueforti", katkiMaddeleri:[] },
{ ad:"Comté FR", kal:415, pro:29, karb:0.5, yag:33, lif:0, sod:658, por:30, kat:"Fromages", ulke:"fr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"lait cru, sel, présure", katkiMaddeleri:[] },
{ ad:"Reblochon FR", kal:332, pro:21, karb:0, yag:27, lif:0, sod:630, por:30, kat:"Fromages", ulke:"fr", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"lait cru de vache, sel, présure, ferments", katkiMaddeleri:[] },
{ ad:"Époisses FR", kal:295, pro:18, karb:0.5, yag:24, lif:0, sod:1580, por:30, kat:"Fromages", ulke:"fr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"lait de vache, sel, Marc de Bourgogne, présure", katkiMaddeleri:[] },
{ ad:"Mimolette FR", kal:370, pro:24, karb:0.2, yag:30, lif:0, sod:760, por:30, kat:"Fromages", ulke:"fr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"lait de vache, sel, présure, annatto E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Colorant naturel."}] },

// ── İtalyan Peynirleri ──
{ ad:"Pecorino Romano IT", kal:387, pro:32, karb:0, yag:28, lif:0, sod:1800, por:20, kat:"Formaggi", ulke:"it", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"latte di pecora, sale, caglio", katkiMaddeleri:[] },
{ ad:"Taleggio IT", kal:291, pro:20, karb:0.2, yag:23, lif:0, sod:1200, por:30, kat:"Formaggi", ulke:"it", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"latte, sale, caglio, ferments smear", katkiMaddeleri:[] },
{ ad:"Asiago IT", kal:352, pro:29, karb:0, yag:26, lif:0, sod:780, por:30, kat:"Formaggi", ulke:"it", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"latte vaccino, sale, caglio, E1105", katkiMaddeleri:[{kod:"E1105",ad:"Lisozima",tehlikeli:false,aciklama:"Conservante."}] },
{ ad:"Fontina IT", kal:343, pro:26, karb:1.6, yag:26, lif:0, sod:800, por:30, kat:"Formaggi", ulke:"it", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"latte crudo di vacca, sale, caglio", katkiMaddeleri:[] },
{ ad:"Burrata IT", kal:330, pro:17, karb:2, yag:28, lif:0, sod:580, por:80, kat:"Formaggi", ulke:"it", tokPuan:50, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"latte, panna, sale, caglio", katkiMaddeleri:[] },
{ ad:"Scamorza IT", kal:334, pro:28, karb:2, yag:24, lif:0, sod:850, por:30, kat:"Formaggi", ulke:"it", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"latte vaccino, sale, caglio", katkiMaddeleri:[] },
{ ad:"Ricotta IT", kal:174, pro:11, karb:3, yag:13, lif:0, sod:84, por:100, kat:"Formaggi", ulke:"it", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"siero di latte, sale", katkiMaddeleri:[] },
{ ad:"Mascarpone IT", kal:429, pro:4.7, karb:2.7, yag:45, lif:0, sod:33, por:50, kat:"Formaggi", ulke:"it", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"panna, acido citrico", katkiMaddeleri:[] },

// ── İspanyol Peynirleri ──
{ ad:"Tetilla ES", kal:325, pro:22, karb:0.5, yag:26, lif:0, sod:780, por:30, kat:"Quesos", ulke:"es", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"leche de vaca gallega, sal, cuajo", katkiMaddeleri:[] },
{ ad:"Murcia al Vino ES", kal:325, pro:20, karb:0.5, yag:27, lif:0, sod:620, por:30, kat:"Quesos", ulke:"es", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"leche de cabra, vino tinto, sal, cuajo", katkiMaddeleri:[] },
{ ad:"Zamorano ES", kal:385, pro:27, karb:0.5, yag:31, lif:0, sod:680, por:30, kat:"Quesos", ulke:"es", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"leche cruda de oveja, sal, cuajo", katkiMaddeleri:[] },

// ── Hollanda / Belçika Peynirleri ──
{ ad:"Leyden NL", kal:350, pro:26, karb:0, yag:28, lif:0, sod:820, por:30, kat:"Kaas", ulke:"nl", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"koemelk, komijn, karwij, zout, stremsel, E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Kleurstof."}] },
{ ad:"Maasdammer NL", kal:350, pro:24, karb:0, yag:28, lif:0, sod:760, por:30, kat:"Kaas", ulke:"nl", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"volle koemelk, zout, stremsel", katkiMaddeleri:[] },
{ ad:"Herve BE", kal:385, pro:22, karb:0.5, yag:32, lif:0, sod:1200, por:30, kat:"Kaas", ulke:"be", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"koemelk, zout, stremsel, ferments", katkiMaddeleri:[] },

// ── Alman / Avusturya Peynirleri ──
{ ad:"Allgäuer Emmentaler DE", kal:382, pro:29, karb:0.4, yag:29, lif:0, sod:450, por:30, kat:"Käse", ulke:"de", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"Rohmilch, Salz, Lab", katkiMaddeleri:[] },
{ ad:"Bergkäse AT", kal:388, pro:29, karb:0, yag:30, lif:0, sod:550, por:30, kat:"Käse", ulke:"at", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"Rohmilch, Salz, Lab", katkiMaddeleri:[] },
{ ad:"Tilsiter DE", kal:340, pro:25, karb:0, yag:27, lif:0, sod:820, por:30, kat:"Käse", ulke:"de", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Milch, Salz, Lab, Kulturen", katkiMaddeleri:[] },
{ ad:"Limburger DE", kal:327, pro:22, karb:0.5, yag:26, lif:0, sod:1200, por:30, kat:"Käse", ulke:"de", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"Milch, Salz, Lab, Rotschmier-Bakterien", katkiMaddeleri:[] },
{ ad:"Quark DE", kal:67, pro:7, karb:4, yag:1, lif:0, sod:50, por:100, kat:"Käse", ulke:"de", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"Magermilch, Kulturen", katkiMaddeleri:[] },

// ── İsviçre ──
{ ad:"Appenzeller CH", kal:390, pro:27, karb:0, yag:31, lif:0, sod:700, por:30, kat:"Swiss Cheese", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"Rohmilch, Salz, Lab, Kräutersulz", katkiMaddeleri:[] },
{ ad:"Raclette CH", kal:335, pro:22, karb:1, yag:28, lif:0, sod:680, por:30, kat:"Swiss Cheese", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"lait cru de vache, sel, présure", katkiMaddeleri:[] },
{ ad:"Vacherin Fribourgeois CH", kal:338, pro:23, karb:0.5, yag:27, lif:0, sod:730, por:30, kat:"Swiss Cheese", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"lait cru, sel, présure", katkiMaddeleri:[] },

// ── Kuzey Avrupa Peynirleri ──
{ ad:"Havarti DA", kal:355, pro:25, karb:0, yag:29, lif:0, sod:700, por:30, kat:"Ost", ulke:"da", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"mælk, salt, løbe", katkiMaddeleri:[] },
{ ad:"Danbo DA", kal:348, pro:26, karb:0, yag:27, lif:0, sod:750, por:30, kat:"Ost", ulke:"da", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mælk, salt, løbe, karvefrø", katkiMaddeleri:[] },
{ ad:"Jarlsberg NO", kal:356, pro:27, karb:0, yag:27, lif:0, sod:650, por:30, kat:"Ost", ulke:"no", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"melk, salt, løpe", katkiMaddeleri:[] },
{ ad:"Brunost NO", kal:375, pro:9.7, karb:43, yag:20, lif:0, sod:600, por:20, kat:"Ost", ulke:"no", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mysost, melk, fløte, sukker", katkiMaddeleri:[] },
{ ad:"Präst SV", kal:370, pro:26, karb:0, yag:30, lif:0, sod:800, por:30, kat:"Ost", ulke:"sv", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"komjölk, salt, löpe", katkiMaddeleri:[] },
{ ad:"Kvibille Cheddar SV", kal:395, pro:25, karb:1.3, yag:33, lif:0, sod:621, por:30, kat:"Ost", ulke:"sv", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"komjölk, salt, löpe, annatto E160b", katkiMaddeleri:[{kod:"E160b",ad:"Annatto",tehlikeli:false,aciklama:"Naturligt färgämne."}] },
{ ad:"Emmental FI (Kotimainen)", kal:382, pro:29, karb:0.4, yag:29, lif:0, sod:450, por:30, kat:"Juusto", ulke:"fi", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"maito, suola, juoksute", katkiMaddeleri:[] },

// ── Doğu Avrupa Peynirleri ──
{ ad:"Bryndza SK/PL", adLatin:"Bryndza PL", kal:342, pro:20, karb:2.5, yag:28, lif:0, sod:1500, por:30, kat:"Sery", ulke:"pl", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"owcze mleko, sól", katkiMaddeleri:[] },
{ ad:"Niva CS (Modrý Sýr)", adLatin:"Niva CS", kal:355, pro:21, karb:0.5, yag:30, lif:0, sod:1380, por:30, kat:"Sýry", ulke:"cs", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mléko, sůl, syřidlo, Penicillium roqueforti", katkiMaddeleri:[] },
{ ad:"Trappista HU", adLatin:"Trappista HU", kal:338, pro:24, karb:0, yag:27, lif:0, sod:780, por:30, kat:"Sajtok", ulke:"hu", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"tehéntej, só, oltó", katkiMaddeleri:[] },
{ ad:"Caș RO (Proaspăt)", adLatin:"Cas RO", kal:220, pro:17, karb:2, yag:17, lif:0, sod:480, por:50, kat:"Branzeturi", ulke:"ro", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"lapte, cheag, sare", katkiMaddeleri:[] },
{ ad:"Brinza Dacică RO", adLatin:"Brinza Dacica RO", kal:280, pro:18, karb:1, yag:23, lif:0, sod:1200, por:30, kat:"Branzeturi", ulke:"ro", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"lapte de oaie, sare", katkiMaddeleri:[] },
{ ad:"Paški Sir Stari HR", adLatin:"Paski Sir Stari HR", kal:420, pro:26, karb:0, yag:35, lif:0, sod:680, por:30, kat:"Sirevi", ulke:"hr", tokPuan:52, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"ovčje mlijeko, sol, sirište", katkiMaddeleri:[] },

// ── Baltık ──
{ ad:"Džiugas LT", adLatin:"Dziugas LT", kal:395, pro:33, karb:0, yag:29, lif:0, sod:700, por:20, kat:"Sūriai", ulke:"lt", tokPuan:50, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"pienas, druska, fermentai, šliužo fermentas", katkiMaddeleri:[] },
{ ad:"Latvijas Siers LV", adLatin:"Latvijas Siers LV", kal:350, pro:24, karb:0, yag:28, lif:0, sod:780, por:30, kat:"Sieri", ulke:"lv", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"piens, sāls, fermentai, kimmers", katkiMaddeleri:[] },
{ ad:"Eesti Juust ET", adLatin:"Eesti Juust ET", kal:345, pro:24, karb:0.5, yag:27, lif:0, sod:750, por:30, kat:"Juustud", ulke:"et", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"piim, sool, laap", katkiMaddeleri:[] },

// ── Türk Peynirleri ──
{ ad:"Tulum Peyniri TR", kal:350, pro:22, karb:1.5, yag:29, lif:0, sod:1380, por:30, kat:"Süt Ürünleri", ulke:"tr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"koyun sütü, tuz, peynir mayası", katkiMaddeleri:[] },
{ ad:"Van Otlu Peyniri TR", kal:298, pro:18, karb:2, yag:24, lif:0, sod:980, por:30, kat:"Süt Ürünleri", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"koyun sütü, keklik otu, sedir otu, tuz", katkiMaddeleri:[] },
{ ad:"Mihaliç Peyniri TR", kal:365, pro:23, karb:1, yag:30, lif:0, sod:1200, por:30, kat:"Süt Ürünleri", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"koyun sütü, tuz, peynir mayası", katkiMaddeleri:[] },
{ ad:"Ezine Peyniri TR", kal:312, pro:20, karb:1.5, yag:26, lif:0, sod:1100, por:30, kat:"Süt Ürünleri", ulke:"tr", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"koyun/keçi/inek sütü, tuz, peynir mayası", katkiMaddeleri:[] },

// ── Yunan Peynirleri ──
{ ad:"Κασέρι EL", adLatin:"Kaseri EL", kal:345, pro:24, karb:0, yag:27, lif:0, sod:780, por:30, kat:"Tyria", ulke:"el", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"provatino gala, alati, pitia", katkiMaddeleri:[] },
{ ad:"Μανούρι EL", adLatin:"Manouri EL", kal:330, pro:9, karb:2, yag:32, lif:0, sod:580, por:50, kat:"Tyria", ulke:"el", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"oros gala provatou kai gidinou, alati", katkiMaddeleri:[] },
{ ad:"Γραβιέρα Κρήτης", adLatin:"Graviera Kritis", kal:395, pro:28, karb:0.5, yag:31, lif:0, sod:760, por:30, kat:"Tyria", ulke:"el", tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"provatino gala, alati, pitia", katkiMaddeleri:[] },
{ ad:"Ανθότυρο EL", adLatin:"Anthotiro EL", kal:174, pro:11, karb:3, yag:13, lif:0, sod:84, por:100, kat:"Tyria", ulke:"el", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"oros gala, alati", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// PAKETLİ / HAZIR GIDALAR
// ══════════════════════════════════════════════════════

// ── Konserveler ──
{ ad:"Ton Balığı (Konserve Suyu)", adler:{tr:"Konserve Ton Balığı",de:"Thunfisch Dose (Wasser)",el:"Κονσέρβα Τόνος",hu:"Tonhal Konzerv",pl:"Tuńczyk Puszka",cs:"Tuňák Konzerva",ro:"Ton la Conservă",hr:"Tuna Konzerva",fr:"Thon en Conserve",es:"Atún en Conserva",it:"Tonno in Scatola",pt:"Atum em Lata",no:"Tunfisk Boks",sv:"Tonfisk Burk",da:"Tunfisk Dåse",fi:"Tonnikala Tölkki",nl:"Tonijn Blik",lv:"Tuncis Kārbā",et:"Tuunikala Konserv",lt:"Tunas Konservai"}, marka:"", kal:116, pro:26, karb:0, yag:1, lif:0, sod:360, por:100, kat:"Canned", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"ton balığı, su, tuz", katkiMaddeleri:[] },
{ ad:"Ton Balığı (Konserve Yağlı)", adler:{tr:"Yağlı Konserve Ton",de:"Thunfisch Dose (Öl)",el:"Τόνος σε Λάδι",hu:"Tonhal Olajban",pl:"Tuńczyk w Oleju",cs:"Tuňák v Oleji",ro:"Ton în Ulei",hr:"Tuna u Ulju",fr:"Thon à l'Huile",es:"Atún en Aceite",it:"Tonno Sott'Olio",pt:"Atum em Óleo",no:"Tunfisk i Olje",sv:"Tonfisk i Olja",da:"Tunfisk i Olie",fi:"Tonnikala Öljyssä",nl:"Tonijn in Olie",lv:"Tuncis Eļļā",et:"Tuunikala Õlis",lt:"Tunas Aliejuje"}, marka:"", kal:184, pro:24, karb:0, yag:10, lif:0, sod:380, por:100, kat:"Canned", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"ton balığı, zeytinyağı, tuz", katkiMaddeleri:[] },
{ ad:"Sardalya (Konserve)", adler:{tr:"Konserve Sardalya",de:"Sardinen Dose",el:"Σαρδέλες Κονσέρβα",hu:"Szardínia Konzerv",pl:"Sardynki Puszka",cs:"Sardinky Konzerva",ro:"Sardine la Conservă",hr:"Sardine Konzerva",fr:"Sardines en Conserve",es:"Sardinas en Lata",it:"Sardine in Scatola",pt:"Sardinhas em Lata",no:"Sardiner Boks",sv:"Sardiner Burk",da:"Sardiner Dåse",fi:"Sardiinit Tölkki",nl:"Sardines Blik",lv:"Sardīnes Kārbā",et:"Sardiinid Konserv",lt:"Sardinės Konservai"}, marka:"", kal:208, pro:24, karb:0, yag:12, lif:0, sod:420, por:100, kat:"Canned", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"sardalya, zeytinyağı, tuz", katkiMaddeleri:[] },

// ── Makarna / Pirinç ──
{ ad:"Basmati Pirinç", adler:{tr:"Basmati Pirinç",de:"Basmati Reis",el:"Ρύζι Μπασμάτι",hu:"Basmati Rizs",pl:"Ryż Basmati",cs:"Basmati Rýže",ro:"Orez Basmati",hr:"Basmati Riža",fr:"Riz Basmati",es:"Arroz Basmati",it:"Riso Basmati",pt:"Arroz Basmati",no:"Basmati Ris",sv:"Basmatiris",da:"Basmatiris",fi:"Basmatiriisi",nl:"Basmatirijst",lv:"Basmati Rīsi",et:"Basmatiriis",lt:"Basmati Ryžiai"}, marka:"", kal:355, pro:7.5, karb:78, yag:0.5, lif:0.6, sod:4, por:100, kat:"Grain", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"basmati rice", katkiMaddeleri:[] },

// ── Soslar / Ketçap ──
{ ad:"Ketçap", adler:{tr:"Ketçap",de:"Ketchup",el:"Κέτσαπ",hu:"Ketchup",pl:"Ketchup",cs:"Ketchup",ro:"Ketchup",hr:"Ketchup",fr:"Ketchup",es:"Ketchup",it:"Ketchup",pt:"Ketchup",no:"Ketchup",sv:"Ketchup",da:"Ketchup",fi:"Ketchup",nl:"Ketchup",lv:"Kečups",et:"Ketšup",lt:"Kečupas"}, marka:"Heinz", kal:112, pro:1.5, karb:27, yag:0.1, lif:0.5, sod:978, por:30, kat:"Condiment", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"domates, sirke, şeker, tuz, baharatlar, E211, E202", katkiMaddeleri:[{kod:"E211",ad:"Sodium benzoate",tehlikeli:false,aciklama:"Preservative."},{kod:"E202",ad:"Potassium sorbate",tehlikeli:false,aciklama:"Preservative."}] },
{ ad:"Mayonez", adler:{tr:"Mayonez",de:"Mayonnaise",el:"Μαγιονέζα",hu:"Majonéz",pl:"Majonez",cs:"Majonéza",ro:"Maioneză",hr:"Majoneza",fr:"Mayonnaise",es:"Mayonesa",it:"Maionese",pt:"Maionese",no:"Majones",sv:"Majonnäs",da:"Mayonnaise",fi:"Majoneesi",nl:"Mayonaise",lv:"Majonēze",et:"Majonees",lt:"Majonezas"}, marka:"Hellmann's", kal:680, pro:1.5, karb:2.7, yag:74, lif:0, sod:630, por:15, kat:"Condiment", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"sıvı yağ, yumurta sarısı, sirke, tuz, E415, E300", katkiMaddeleri:[{kod:"E415",ad:"Xanthan gum",tehlikeli:false,aciklama:"Stabilizer."},{kod:"E300",ad:"Ascorbic acid",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Soya Sosu", adler:{tr:"Soya Sosu",de:"Sojasoße",el:"Σάλτσα Σόγιας",hu:"Szójaszósz",pl:"Sos Sojowy",cs:"Sójová Omáčka",ro:"Sos de Soia",hr:"Soja Umak",fr:"Sauce Soja",es:"Salsa de Soja",it:"Salsa di Soia",pt:"Molho de Soja",no:"Soyasaus",sv:"Sojasås",da:"Sojasauce",fi:"Soijakastike",nl:"Sojasaus",lv:"Sojas Mērce",et:"Sojakaste",lt:"Sojos Padažas"}, marka:"Kikkoman", kal:53, pro:5.6, karb:8, yag:0, lif:0, sod:5493, por:15, kat:"Condiment", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"su, soya, buğday, tuz, E211", katkiMaddeleri:[{kod:"E211",ad:"Sodium benzoate",tehlikeli:false,aciklama:"Preservative."}] },

// ── Süt Ürünleri (Paketli) ──
{ ad:"Süt (Tam Yağlı, Tetra Pak)", adler:{tr:"Tam Yağlı Süt",de:"Vollmilch",el:"Πλήρες Γάλα",hu:"Teljes Tejzsírtartalmú Tej",pl:"Mleko Pełne",cs:"Plnotučné Mléko",ro:"Lapte Integral",hr:"Punomasno Mlijeko",fr:"Lait Entier",es:"Leche Entera",it:"Latte Intero",pt:"Leite Gordo",no:"Helmelk",sv:"Helmjölk",da:"Sødmælk",fi:"Täysmaito",nl:"Volle Melk",lv:"Pilnpiens",et:"Täispiim",lt:"Riebiosios Pienas"}, marka:"", kal:61, pro:3.2, karb:4.7, yag:3.3, lif:0, sod:43, por:200, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"tam yağlı inek sütü", katkiMaddeleri:[] },
{ ad:"Süt (Yarım Yağlı)", adler:{tr:"Yarım Yağlı Süt",de:"Halbfettmilch",el:"Ημιαποβουτυρωμένο Γάλα",hu:"Félzsíros Tej",pl:"Mleko Półtłuste",cs:"Polotučné Mléko",ro:"Lapte Semidegresat",hr:"Polumasno Mlijeko",fr:"Lait Demi-Écrémé",es:"Leche Semidesnatada",it:"Latte Parzialmente Scremato",pt:"Leite Meio-Gordo",no:"Lettmelk",sv:"Lättmjölk",da:"Letmælk",fi:"Kevytmaito",nl:"Halfvolle Melk",lv:"Puspiens",et:"Poolrasvane Piim",lt:"Pusriebus Pienas"}, marka:"", kal:47, pro:3.3, karb:4.8, yag:1.6, lif:0, sod:44, por:200, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"yarım yağlı inek sütü", katkiMaddeleri:[] },
{ ad:"Tereyağı (Tuzlu)", adler:{tr:"Tuzlu Tereyağı",de:"Gesalzene Butter",el:"Αλατισμένο Βούτυρο",hu:"Sózott Vaj",pl:"Masło Solone",cs:"Solené Máslo",ro:"Unt Sărat",hr:"Slano Maslac",fr:"Beurre Demi-Sel",es:"Mantequilla Salada",it:"Burro Salato",pt:"Manteiga Salgada",no:"Saltet Smør",sv:"Saltat Smör",da:"Saltet Smør",fi:"Suolainen Voi",nl:"Gezouten Boter",lv:"Sālsvajsviests",et:"Soolane Või",lt:"Sūrus Sviestas"}, marka:"", kal:717, pro:0.9, karb:0.1, yag:81, lif:0, sod:643, por:10, kat:"Dairy", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"inek sütü, tuz", katkiMaddeleri:[] },

// ── Tahıl / Kahvaltılık ──
{ ad:"Yulaf Ezmesi (Hazır)", adler:{tr:"Hazır Yulaf Ezmesi",de:"Porridge",el:"Χυλός Βρώμης",hu:"Zabkása",pl:"Owsianka",cs:"Ovesná Kaše",ro:"Terci de Ovăz",hr:"Zobena Kaša",fr:"Flocons d'Avoine",es:"Copos de Avena",it:"Fiocchi d'Avena",pt:"Flocos de Aveia",no:"Havregrøt",sv:"Gröt",da:"Havregrød",fi:"Kaurapuuro",nl:"Havermoutpap",lv:"Auzu Putraimi",et:"Kaerahelbed",lt:"Avižinė Košė"}, marka:"Quaker", kal:371, pro:13, karb:59, yag:7, lif:10, sod:380, por:40, kat:"Cereal", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"yulaf, tuz, E306", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Mısır Gevreği", adler:{tr:"Mısır Gevreği",de:"Cornflakes",el:"Νιφάδες Καλαμποκιού",hu:"Kukoricapehely",pl:"Płatki Kukurydziane",cs:"Kukuřičné Vločky",ro:"Fulgi de Porumb",hr:"Kukuruzne Pahuljice",fr:"Céréales au Maïs",es:"Copos de Maíz",it:"Fiocchi di Mais",pt:"Flocos de Milho",no:"Cornflakes",sv:"Cornflakes",da:"Cornflakes",fi:"Cornflakes",nl:"Cornflakes",lv:"Kukurūzas Pārslas",et:"Maisihelbed",lt:"Kukurūzų Dribsniai"}, marka:"Kellogg's", kal:357, pro:7.5, karb:84, yag:0.9, lif:2.7, sod:500, por:30, kat:"Cereal", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"mısır, şeker, tuz, niyasin B3, demir, B6, B2, B1, folik asit, D, B12, E306", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Müsli (Meyveli)", adler:{tr:"Meyveli Müsli",de:"Müsli mit Früchten",el:"Μούσλι με Φρούτα",hu:"Gyümölcsös Müzli",pl:"Musli z Owocami",cs:"Müsli s Ovocem",ro:"Muesli cu Fructe",hr:"Musli s Voćem",fr:"Muesli aux Fruits",es:"Muesli con Frutas",it:"Muesli con Frutta",pt:"Muesli com Frutas",no:"Müsli med Frukt",sv:"Müsli med Frukt",da:"Müsli med Frugt",fi:"Mysli Hedelmillä",nl:"Muesli met Fruit",lv:"Muesli ar Augļiem",et:"Müsli Puuviljadega",lt:"Muesli su Vaisiais"}, marka:"", kal:369, pro:9, karb:66, yag:7, lif:8, sod:55, por:45, kat:"Cereal", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"yulaf, kuru meyveler, fındık, buğday, E306, E330", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."},{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."}] },

// ── Cips / Atıştırmalık ──
{ ad:"Cips (Sade)", adler:{tr:"Sade Cips",de:"Chips Natur",el:"Πατατάκια Σκέτα",hu:"Natúr Chips",pl:"Chipsy Naturalne",cs:"Chipsy Přírodní",ro:"Chipsuri Simple",hr:"Čips Prirodni",fr:"Chips Nature",es:"Patatas Fritas Naturales",it:"Patatine Naturali",pt:"Batatas Fritas Simples",no:"Chips Naturell",sv:"Chips Naturell",da:"Chips Naturel",fi:"Sipsit Suolaiset",nl:"Chips Naturel",lv:"Čipsi Dabīgie",et:"Krõpsud Looduslikud",lt:"Traškučiai Natūralūs"}, marka:"Lay's", kal:536, pro:7, karb:53, yag:34, lif:4.8, sod:535, por:30, kat:"Snack", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"patates, sıvıyağ, tuz, E306", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Bisküvi (Tam Tahıllı)", adler:{tr:"Tam Tahıllı Bisküvi",de:"Vollkornkeks",el:"Ολικής Μπισκότο",hu:"Teljes Kiőrlésű Keksz",pl:"Herbatnik Pełnoziarnisty",cs:"Celozrnný Sušenka",ro:"Biscuit Integral",hr:"Integralni Keks",fr:"Biscuit Complet",es:"Galleta Integral",it:"Biscotto Integrale",pt:"Bolacha Integral",no:"Grovkjeks",sv:"Fullkornskex",da:"Fuldkornskiks",fi:"Täysjyvä Keksi",nl:"Volkoren Koek",lv:"Pilngraudu Cepums",et:"Täisterakuivak",lt:"Pilno Grūdo Sausainis"}, marka:"", kal:421, pro:9, karb:68, yag:14, lif:5.5, sod:380, por:30, kat:"Snack", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"tam tahıl unu, şeker, sıvı yağ, tuz, E322, E471, E500", katkiMaddeleri:[{kod:"E322",ad:"Lecithin",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E500",ad:"Sodium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },

// ── Hazır Çorba ──
{ ad:"Hazır Çorba (Domates)", adler:{tr:"Hazır Domates Çorbası",de:"Tomatensuppe Fertig",el:"Έτοιμη Σούπα Τομάτας",hu:"Instant Paradicsomleves",pl:"Zupa Pomidorowa Instant",cs:"Instantní Polévka Rajčatová",ro:"Supă Instant Tomate",hr:"Instant Juha Rajčica",fr:"Soupe Tomate Instantanée",es:"Sopa Tomate Instantánea",it:"Zuppa di Pomodoro Pronta",pt:"Sopa de Tomate Instantânea",no:"Instant Tomatsuppe",sv:"Instant Tomatsoppa",da:"Instant Tomatsoup",fi:"Pikatomaattikeitto",nl:"Instant Tomatensoep",lv:"Tomātu Zupa Tūlītēja",et:"Tomatisupp Instant",lt:"Momentinė Pomidorų Sriuba"}, marka:"Knorr", kal:45, pro:1.5, karb:8, yag:1, lif:0.5, sod:720, por:250, kat:"ReadyMeal", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"domates tozu, nişasta, tuz, şeker, E621, E330, E150c", katkiMaddeleri:[{kod:"E621",ad:"Monosodium glutamate",tehlikeli:false,aciklama:"Flavour enhancer."},{kod:"E150c",ad:"Ammonia caramel",tehlikeli:false,aciklama:"Colouring."},{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."}] },

// ── Dondurulmuş Gıdalar ──
{ ad:"Dondurulmuş Pizza (Margarita)", adler:{tr:"Dondurulmuş Margarita Pizza",de:"Tiefkühlpizza Margherita",el:"Κατεψυγμένη Πίτσα Μαργαρίτα",hu:"Mélyhűtött Margherita Pizza",pl:"Mrożona Pizza Margherita",cs:"Mražená Pizza Margherita",ro:"Pizza Congelată Margherita",hr:"Zamrznuta Pizza Margherita",fr:"Pizza Surgelée Margherita",es:"Pizza Congelada Margarita",it:"Pizza Surgelata Margherita",pt:"Pizza Congelada Margarita",no:"Fryst Pizza Margherita",sv:"Fryst Pizza Margherita",da:"Frossen Pizza Margherita",fi:"Pakaste Pizza Margherita",nl:"Diepvriespizza Margherita",lv:"Saldēta Pica Margherita",et:"Külmutatud Pizza Margherita",lt:"Šaldyta Pica Margherita"}, marka:"Dr. Oetker", kal:248, pro:10, karb:32, yag:9, lif:2, sod:580, por:150, kat:"Frozen", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"un, domates sosu, mozzarella, E471, E450, E412", katkiMaddeleri:[{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E450",ad:"Diphosphates",tehlikeli:false,aciklama:"Raising agent."},{kod:"E412",ad:"Guar gum",tehlikeli:false,aciklama:"Thickener."}] },

// ── Doğal Tatlandırıcı / Sürülebilir ──
{ ad:"Fıstık Ezmesi (Çıtır)", adler:{tr:"Çıtır Fıstık Ezmesi",de:"Knusprige Erdnussbutter",el:"Τραγανό Φυστικοβούτυρο",hu:"Ropogós Mogyoróvaj",pl:"Masło Orzechowe Chrupiące",cs:"Křupavé Arašídové Máslo",ro:"Unt de Arahide Crocant",hr:"Hrskavi Kikiriki Maslac",fr:"Beurre de Cacahuète Crunchy",es:"Mantequilla de Cacahuete Crujiente",it:"Burro di Arachidi Croccante",pt:"Manteiga de Amendoim Crocante",no:"Sprø Peanøttsmør",sv:"Chunky Jordnötssmör",da:"Crunchy Jordnøddesmør",fi:"Rapea Maapähkinävoi",nl:"Pindakaas Crunchy",lv:"Riekstains Zemesriekstu Sviests",et:"Krõbe Maapähklivõi",lt:"Traškus Žemės Riešutų Sviestas"}, marka:"Skippy", kal:593, pro:22, karb:22, yag:51, lif:6, sod:459, por:30, kat:"Spreads", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"fıstık, tuz, şeker, hidrojenize bitkisel yağ, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."}] },

// ── İçecekler ──
{ ad:"Portakal Suyu (Paketli)", adler:{tr:"Paketli Portakal Suyu",de:"Orangensaft",el:"Χυμός Πορτοκαλιού",hu:"Narancslé",pl:"Sok Pomarańczowy",cs:"Pomerančový Džus",ro:"Suc de Portocale",hr:"Sok od Naranče",fr:"Jus d'Orange",es:"Zumo de Naranja",it:"Succo d'Arancia",pt:"Sumo de Laranja",no:"Appelsinjuice",sv:"Apelsinjuice",da:"Appelsinjuice",fi:"Appelsiinimehu",nl:"Sinaasappelsap",lv:"Apelsīnu Sula",et:"Apelsinimahl",lt:"Apelsinų Sultys"}, marka:"Tropicana", kal:45, pro:0.7, karb:10, yag:0.2, lif:0.2, sod:1, por:200, kat:"Drinks", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"portakal suyu, E330", katkiMaddeleri:[{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."}] },
{ ad:"Maden Suyu (Doğal)", adler:{tr:"Doğal Maden Suyu",de:"Mineralwasser",el:"Μεταλλικό Νερό",hu:"Ásványvíz",pl:"Woda Mineralna",cs:"Minerální Voda",ro:"Apă Minerală",hr:"Mineralna Voda",fr:"Eau Minérale",es:"Agua Mineral",it:"Acqua Minerale",pt:"Água Mineral",no:"Mineralvann",sv:"Mineralvatten",da:"Mineralvand",fi:"Kivennäisvesi",nl:"Mineraalwater",lv:"Minerālūdens",et:"Mineraalvesi",lt:"Mineralinis Vanduo"}, marka:"", kal:0, pro:0, karb:0, yag:0, lif:0, sod:12, por:500, kat:"Drinks", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"doğal kaynak suyu, mineraller", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// ET KESİM TÜRLERİ
// ══════════════════════════════════════════════════════

// ── PAYLAŞILAN ──
{ ad:"Dana But (Rosto)", adler:{tr:"Dana But",de:"Rinderkeule",el:"Μοσχαρίσιο Κότσι",hu:"Marhacomb",pl:"Udziec Wołowy",cs:"Hovězí Kýta",ro:"Pulpă de Vită",hr:"Goveđi But",fr:"Cuisse de Boeuf",es:"Muslo de Vaca",it:"Coscia di Manzo",pt:"Perna de Vaca",no:"Oksekjøtt Lårtykk",sv:"Nötköttslår",da:"Okselår",fi:"Naudanpaisti",nl:"Runderschenkel",lv:"Liellopu Stilbs",et:"Veise Puusaliha",lt:"Jautienos Šlaunelė"}, kal:185, pro:28, karb:0, yag:8, lif:0, sod:65, por:100, kat:"Meat", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"dana but", katkiMaddeleri:[] },
{ ad:"Dana Antrikot", adler:{tr:"Dana Antrikot",de:"Rib-Eye Steak",el:"Ριμπάι Στέικ",hu:"Marha Entrecôte",pl:"Antrykot Wołowy",cs:"Hovězí Antrekot",ro:"Antricot de Vită",hr:"Goveđi Antrekot",fr:"Entrecôte de Boeuf",es:"Entrecot de Ternera",it:"Entrecôte di Manzo",pt:"Entrecosto de Vaca",no:"Entrecôte",sv:"Entrecôte",da:"Entrecôte",fi:"Entrecôte",nl:"Entrecôte",lv:"Antrekots",et:"Entrekoot",lt:"Antrekotas"}, kal:248, pro:26, karb:0, yag:16, lif:0, sod:65, por:150, kat:"Meat", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"dana antrikot", katkiMaddeleri:[] },
{ ad:"Kuzu Pirzola", adler:{tr:"Kuzu Pirzola",de:"Lammkotelett",el:"Αρνίσια Μπριζόλα",hu:"Bárányborda",pl:"Kotlet Jagnięcy",cs:"Jehněčí Kotleta",ro:"Cotlet de Miel",hr:"Janjeći Kotlet",fr:"Côtelette d'Agneau",es:"Chuleta de Cordero",it:"Costoletta d'Agnello",pt:"Costeleta de Borrego",no:"Lammekotelett",sv:"Lammkotlett",da:"Lammekotelet",fi:"Lampaankyljys",nl:"Lamskotelet",lv:"Jēra Karbonāde",et:"Talleliha Karbonaad",lt:"Avienos Kotletas"}, kal:215, pro:24, karb:0, yag:13, lif:0, sod:65, por:150, kat:"Meat", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"kuzu pirzola", katkiMaddeleri:[] },
{ ad:"Domuz Kaburga (Spare Rib)", adler:{tr:"Domuz Kaburga",de:"Schweinerippchen",el:"Πλευρά Χοιρινά",hu:"Sertésborda",pl:"Żeberka Wieprzowe",cs:"Vepřová Žebra",ro:"Coaste de Porc",hr:"Svinjska Rebra",fr:"Travers de Porc",es:"Costillas de Cerdo",it:"Costine di Maiale",pt:"Entrecosto de Porco",no:"Svineribber",sv:"Fläskrevben",da:"Svinekam",fi:"Siankylki",nl:"Spareribs",lv:"Cūkgaļas Ribas",et:"Searibi",lt:"Kiaulienos Šonkauliai"}, kal:285, pro:22, karb:0, yag:22, lif:0, sod:65, por:150, kat:"Meat", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","lv","et","lt"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"domuz kaburga", katkiMaddeleri:[] },
{ ad:"Tavuk But (Bütün)", adler:{tr:"Tavuk But",de:"Hähnchenschenkel",el:"Μηρός Κοτόπουλου",hu:"Csirkecomb",pl:"Udziec Kurczaka",cs:"Kuřecí Stehno",ro:"Pulpă de Pui",hr:"Pileći But",fr:"Cuisse de Poulet",es:"Muslo de Pollo",it:"Coscia di Pollo",pt:"Coxa de Frango",no:"Kyllinglår",sv:"Kycklingklubba",da:"Kyllingelår",fi:"Kanankoipi",nl:"Kippenpoot",lv:"Vistas Stilbs",et:"Kana Koib",lt:"Vištienos Kojelė"}, kal:195, pro:22, karb:0, yag:12, lif:0, sod:80, por:150, kat:"Meat", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"tavuk but", katkiMaddeleri:[] },
{ ad:"Tavuk Göğsü (Fileto)", adler:{tr:"Tavuk Göğsü",de:"Hühnerbrust",el:"Στήθος Κοτόπουλου",hu:"Csirkemell",pl:"Pierś Kurczaka",cs:"Kuřecí Prsa",ro:"Piept de Pui",hr:"Pileće Prsa",fr:"Blanc de Poulet",es:"Pechuga de Pollo",it:"Petto di Pollo",pt:"Peito de Frango",no:"Kyllingfilet",sv:"Kycklingfilé",da:"Kyllingefilet",fi:"Kananfilee",nl:"Kipfilet",lv:"Vistas Fileja",et:"Kanafilee",lt:"Vištienos Filė"}, kal:165, pro:31, karb:0, yag:3.5, lif:0, sod:74, por:100, kat:"Meat", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:75, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"tavuk göğsü", katkiMaddeleri:[] },
// ── TR ──
{ ad:"Kuzu İncik", kal:225, pro:22, karb:0, yag:15, lif:0, sod:65, por:200, kat:"Et", ulke:"tr", tokPuan:72, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"kuzu incik", katkiMaddeleri:[] },
{ ad:"Dana İncik", kal:195, pro:24, karb:0, yag:11, lif:0, sod:65, por:200, kat:"Et", ulke:"tr", tokPuan:72, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"dana incik", katkiMaddeleri:[] },
{ ad:"Dana Pirzola", kal:248, pro:25, karb:0, yag:16, lif:0, sod:65, por:150, kat:"Et", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"dana pirzola", katkiMaddeleri:[] },
{ ad:"Kuzu Kol (Omuz)", kal:245, pro:22, karb:0, yag:17, lif:0, sod:65, por:200, kat:"Et", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kuzu kol/omuz", katkiMaddeleri:[] },
{ ad:"Kuzu But Kıyması", kal:215, pro:20, karb:0, yag:15, lif:0, sod:72, por:100, kat:"Et", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kuzu kıyma", katkiMaddeleri:[] },
{ ad:"Dana Kıyma (Yağlı)", kal:285, pro:17, karb:0, yag:24, lif:0, sod:72, por:100, kat:"Et", ulke:"tr", tokPuan:60, aclikSuresi:"3-4 saat", onay:true, yildiz:3.5, icerik:"dana kıyma %20 yağ", katkiMaddeleri:[] },
{ ad:"Dana Kıyma (Yağsız)", kal:165, pro:22, karb:0, yag:8, lif:0, sod:72, por:100, kat:"Et", ulke:"tr", tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"dana kıyma %5 yağ", katkiMaddeleri:[] },
{ ad:"Tavuk Kanat", kal:215, pro:18, karb:0, yag:15, lif:0, sod:80, por:100, kat:"Et", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"tavuk kanat", katkiMaddeleri:[] },
// ── DE ──
{ ad:"Rinderfilet DE", kal:165, pro:28, karb:0, yag:5.5, lif:0, sod:58, por:150, kat:"Fleisch", ulke:"de", tokPuan:78, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"Rinderfilet", katkiMaddeleri:[] },
{ ad:"Schweinekotelett DE", kal:235, pro:24, karb:0, yag:15, lif:0, sod:65, por:150, kat:"Fleisch", ulke:"de", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"Schweinekotelett", katkiMaddeleri:[] },
{ ad:"Hähnchenoberschenkel DE", kal:195, pro:22, karb:0, yag:12, lif:0, sod:80, por:150, kat:"Fleisch", ulke:"de", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"Hähnchenoberschenkel", katkiMaddeleri:[] },
{ ad:"Rinderrippe DE (Short Rib)", kal:305, pro:20, karb:0, yag:25, lif:0, sod:65, por:150, kat:"Fleisch", ulke:"de", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"Rinderrippe", katkiMaddeleri:[] },
// ── FR ──
{ ad:"Gigot d'Agneau FR", kal:215, pro:24, karb:0, yag:13, lif:0, sod:65, por:200, kat:"Viande", ulke:"fr", tokPuan:72, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"gigot d'agneau", katkiMaddeleri:[] },
{ ad:"Côte de Boeuf FR", kal:285, pro:26, karb:0, yag:20, lif:0, sod:65, por:200, kat:"Viande", ulke:"fr", tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"côte de boeuf", katkiMaddeleri:[] },
{ ad:"Bavette de Boeuf FR", kal:195, pro:27, karb:0, yag:10, lif:0, sod:65, por:150, kat:"Viande", ulke:"fr", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"bavette de boeuf", katkiMaddeleri:[] },
// ── IT ──
{ ad:"Costata di Manzo IT", kal:265, pro:26, karb:0, yag:18, lif:0, sod:65, por:150, kat:"Carne", ulke:"it", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"costata di manzo", katkiMaddeleri:[] },
{ ad:"Stinco di Maiale IT", kal:285, pro:24, karb:0, yag:20, lif:0, sod:65, por:200, kat:"Carne", ulke:"it", tokPuan:68, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"stinco di maiale", katkiMaddeleri:[] },
// ── ES ──
{ ad:"Costilla de Buey ES", kal:285, pro:24, karb:0, yag:20, lif:0, sod:65, por:200, kat:"Carne", ulke:"es", tokPuan:72, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"costilla de buey", katkiMaddeleri:[] },
{ ad:"Secreto Ibérico ES", kal:295, pro:22, karb:0, yag:23, lif:0, sod:65, por:150, kat:"Carne", ulke:"es", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"secreto de cerdo ibérico", katkiMaddeleri:[] },
// ── EN ──
{ ad:"T-Bone Steak EN", kal:272, pro:26, karb:0, yag:18, lif:0, sod:65, por:200, kat:"Meat", ulke:"en", tokPuan:75, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"beef T-bone", katkiMaddeleri:[] },
{ ad:"Rack of Lamb EN", kal:215, pro:24, karb:0, yag:13, lif:0, sod:65, por:150, kat:"Meat", ulke:"en", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"rack of lamb", katkiMaddeleri:[] },
{ ad:"Pork Belly EN", kal:395, pro:16, karb:0, yag:36, lif:0, sod:65, por:100, kat:"Meat", ulke:"en", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"pork belly", katkiMaddeleri:[] },
// ── EL ──
{ ad:"Αρνίσια Μπριζόλα", adLatin:"Arnisia Mprizola", kal:215, pro:24, karb:0, yag:13, lif:0, sod:65, por:150, kat:"Kreas", ulke:"el", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"arnisia mprizola", katkiMaddeleri:[] },
{ ad:"Χοιρινό Φιλέτο", adLatin:"Xoirino Fileto", kal:185, pro:26, karb:0, yag:9, lif:0, sod:65, por:150, kat:"Kreas", ulke:"el", tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"xoirino fileto", katkiMaddeleri:[] },
// ── Diğer ülkeler ──
{ ad:"Schweinshaxe AT (Stiege)", kal:285, pro:24, karb:0, yag:20, lif:0, sod:65, por:200, kat:"Fleisch", ulke:"at", tokPuan:65, aclikSuresi:"4-5 saat", onay:true, yildiz:4.5, icerik:"Schweinsstiege", katkiMaddeleri:[] },
{ ad:"Lamsschouder NL", kal:225, pro:22, karb:0, yag:15, lif:0, sod:65, por:200, kat:"Vlees", ulke:"nl", tokPuan:70, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"lamsbout", katkiMaddeleri:[] },
{ ad:"Kotellet BE", kal:235, pro:24, karb:0, yag:15, lif:0, sod:65, por:150, kat:"Vlees", ulke:"be", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"varkenskoteletten", katkiMaddeleri:[] },
{ ad:"Wołowina Rostbef PL", adLatin:"Wolowina Rostbef PL", kal:195, pro:28, karb:0, yag:9, lif:0, sod:65, por:150, kat:"Mięso", ulke:"pl", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"rostbef wołowy", katkiMaddeleri:[] },
{ ad:"Naudaliha Sisefilee ET", adLatin:"Naudaliha Sisefilee ET", kal:165, pro:28, karb:0, yag:5.5, lif:0, sod:58, por:150, kat:"Liha", ulke:"et", tokPuan:78, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"veise sisefilee", katkiMaddeleri:[] },
{ ad:"Jautienos Sprandinė LT", adLatin:"Jautienos Sprandine LT", kal:225, pro:22, karb:0, yag:15, lif:0, sod:65, por:150, kat:"Mėsa", ulke:"lt", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"jautienos sprandinė", katkiMaddeleri:[] },
{ ad:"Rostbiff SV", kal:185, pro:28, karb:0, yag:8, lif:0, sod:65, por:150, kat:"Kött", ulke:"sv", tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"nötkött rostbiff", katkiMaddeleri:[] },
{ ad:"Svinekam DA", kal:235, pro:24, karb:0, yag:15, lif:0, sod:65, por:150, kat:"Kød", ulke:"da", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"svinekam", katkiMaddeleri:[] },
{ ad:"Lammestek NO", kal:215, pro:24, karb:0, yag:13, lif:0, sod:65, por:200, kat:"Kjøtt", ulke:"no", tokPuan:72, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"lammelår", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// EKMEK ÇEŞİTLERİ
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"Tam Buğday Ekmeği", adler:{tr:"Tam Buğday Ekmeği",de:"Vollkornweizenbrot",el:"Ψωμί Ολικής Άλεσης",hu:"Teljes Kiőrlésű Búzakenyér",pl:"Chleb Pełnoziarnisty",cs:"Celozrnný Chléb",ro:"Pâine Integrală",hr:"Integralni Kruh",fr:"Pain Complet",es:"Pan Integral",it:"Pane Integrale",pt:"Pão Integral",no:"Grovbrød",sv:"Fullkornsbröd",da:"Fuldkornsbrød",fi:"Täysjyväleipä",nl:"Volkoren Brood",lv:"Pilngraudu Maize",et:"Täistera Leib",lt:"Pilno Grūdo Duona"}, kal:248, pro:10, karb:44, yag:3.5, lif:6.5, sod:480, por:100, kat:"Bread", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"tam buğday unu, su, maya, tuz, çavdar maltı", katkiMaddeleri:[] },
{ ad:"Çavdar Ekmeği (Karanlık)", adler:{tr:"Çavdar Ekmeği",de:"Roggenbrot",el:"Ψωμί Σικάλεως",hu:"Rozskenyér",pl:"Chleb Żytni",cs:"Žitný Chléb",ro:"Pâine de Secară",hr:"Raženi Kruh",fr:"Pain de Seigle",es:"Pan de Centeno",it:"Pane di Segale",pt:"Pão de Centeio",no:"Rugbrød",sv:"Rågbröd",da:"Rugbrød",fi:"Ruisleipä",nl:"Roggebrood",lv:"Rudzu Maize",et:"Rukkileib",lt:"Ruginė Duona"}, kal:215, pro:8, karb:40, yag:2, lif:7.5, sod:480, por:100, kat:"Bread", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"çavdar unu, su, ekşi maya, tuz", katkiMaddeleri:[] },
{ ad:"Kepekli Ekmek", adler:{tr:"Kepekli Ekmek",de:"Kleiebrот",el:"Ψωμί Πίτουρου",hu:"Korpás Kenyér",pl:"Chleb Otrębowy",cs:"Otruby Chléb",ro:"Pâine cu Tărâțe",hr:"Kruh s Mekinjama",fr:"Pain au Son",es:"Pan con Salvado",it:"Pane con Crusca",pt:"Pão com Farelo",no:"Knekkebrød",sv:"Klidbrød",da:"Klidbrød",fi:"Lestyäleipä",nl:"Zemelen Brood",lv:"Kliju Maize",et:"Kliileib",lt:"Sėlenų Duona"}, kal:235, pro:9.5, karb:42, yag:3, lif:8.5, sod:480, por:100, kat:"Bread", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"buğday kepeği, un, su, maya, tuz", katkiMaddeleri:[] },
{ ad:"Baguette FR", adler:{tr:"Baget Ekmek",de:"Baguette",el:"Μπαγκέτα",hu:"Baguette",pl:"Bagietka",cs:"Bageta",ro:"Baghetă",hr:"Baguette",fr:"Baguette",es:"Baguette",it:"Baguette",pt:"Baguete",no:"Baguette",sv:"Baguette",da:"Baguette",fi:"Patonki",nl:"Stokbrood",lv:"Bagete",et:"Baguette",lt:"Bagetas"}, kal:265, pro:9, karb:52, yag:1.5, lif:2.5, sod:490, por:100, kat:"Bread", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"un, su, maya, tuz", katkiMaddeleri:[] },
{ ad:"Ciabatta IT", adler:{tr:"Ciabatta",de:"Ciabatta",el:"Τσιαμπάτα",hu:"Ciabatta",pl:"Ciabatta",cs:"Ciabatta",ro:"Ciabatta",hr:"Ciabatta",fr:"Ciabatta",es:"Ciabatta",it:"Ciabatta",pt:"Ciabatta",no:"Ciabatta",sv:"Ciabatta",da:"Ciabatta",fi:"Ciabatta",nl:"Ciabatta",lv:"Čabata",et:"Ciabatta",lt:"Čiabata"}, kal:260, pro:8, karb:50, yag:3, lif:2, sod:550, por:100, kat:"Bread", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"un, su, zeytinyağı, maya, tuz", katkiMaddeleri:[] },
{ ad:"Ekşi Mayalı Ekmek (Sourdough)", adler:{tr:"Ekşi Mayalı Ekmek",de:"Sauerteigbrot",el:"Ψωμί Προζύμι",hu:"Kovászos Kenyér",pl:"Chleb na Zakwasie",cs:"Kváskový Chléb",ro:"Pâine cu Maia",hr:"Kruh na Kvascu",fr:"Pain au Levain",es:"Pan de Masa Madre",it:"Pane a Lievitazione Naturale",pt:"Pão de Massa Mãe",no:"Surdeigsbrod",sv:"Surdegsbröd",da:"Surdejsbrød",fi:"Hapanjuurileipä",nl:"Zuurdesembrood",lv:"Raudzētas Mīklas Maize",et:"Hapujuuretiseleib",lt:"Raugintų Mielių Duona"}, kal:240, pro:9, karb:46, yag:2, lif:3.5, sod:480, por:100, kat:"Bread", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"un, su, ekşi maya, tuz", katkiMaddeleri:[] },
{ ad:"Pide Ekmeği (Yassı)", adler:{tr:"Pide Ekmeği",de:"Fladenbrot Türkisch",el:"Τούρκικη Πίτα",hu:"Pide Kenyér",pl:"Chleb Pide",cs:"Pide Chléb",ro:"Pita Turcească",hr:"Turski Kruh",fr:"Pain Pide",es:"Pan Pide",it:"Pane Pide",pt:"Pão Pide",no:"Tyrkisk Flatbrød",sv:"Turkiskt Bröd",da:"Tyrkisk Brød",fi:"Pide Leipä",nl:"Turks Brood",lv:"Turku Maize",et:"Türgi Leib",lt:"Turkiškas Duona"}, kal:252, pro:8, karb:50, yag:2, lif:2.5, sod:490, por:100, kat:"Bread", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"buğday unu, su, maya, tuz", katkiMaddeleri:[] },
// ── Ülkeye özgü ──
{ ad:"Knäckebröd SV (Kernal)", kal:350, pro:12, karb:68, yag:2.5, lif:14, sod:460, por:30, kat:"Bröd", ulke:"sv", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"råg, vatten, salt, jäst", katkiMaddeleri:[] },
{ ad:"Naan Bread EN", kal:275, pro:9, karb:52, yag:5, lif:2, sod:385, por:100, kat:"Bread", ulke:"en", tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"flour, yogurt, yeast, milk, salt, ghee", katkiMaddeleri:[] },
{ ad:"Pretzel DE (Laugenstange)", kal:298, pro:10, karb:56, yag:4, lif:3, sod:980, por:100, kat:"Brot", ulke:"de", tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"Weizenmehl, Wasser, Natronlauge, Salz, Hefe", katkiMaddeleri:[] },
{ ad:"Pan de Pueblo ES", kal:238, pro:8, karb:46, yag:2, lif:3, sod:480, por:100, kat:"Pan", ulke:"es", tokPuan:48, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"harina, agua, masa madre, sal", katkiMaddeleri:[] },
{ ad:"Pão de Ló PT", kal:325, pro:8, karb:52, yag:11, lif:1, sod:120, por:80, kat:"Pão", ulke:"pt", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"ovos, açúcar, farinha, sal", katkiMaddeleri:[] },
{ ad:"Tsoureki EL (Paskalya Ekmeği)", adLatin:"Tsoureki EL", kal:325, pro:9, karb:54, yag:10, lif:2, sod:185, por:80, kat:"Artopoia", ulke:"el", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"aleuron, yeast, avga, voutiro, vanila, mahlepi", katkiMaddeleri:[] },
{ ad:"Hallulla CL/FR BE (Brioche)", kal:340, pro:8, karb:50, yag:14, lif:2, sod:280, por:80, kat:"Gebaeck", ulke:"be", tokPuan:28, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"bloem, boter, eieren, melk, suiker, gist, zout", katkiMaddeleri:[] },
{ ad:"Broa PT (Mısır Ekmeği)", kal:215, pro:4.5, karb:44, yag:3, lif:2.5, sod:380, por:100, kat:"Pão", ulke:"pt", tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"farinha de milho, farinha de trigo, água, sal, fermento", katkiMaddeleri:[] },
{ ad:"Pohanka CS (Pohankový Chléb)", adLatin:"Pohanka CS", kal:215, pro:6, karb:40, yag:3, lif:4, sod:480, por:100, kat:"Chléby", ulke:"cs", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"pohankova mouka, voda, kvásek, sůl", katkiMaddeleri:[] },
{ ad:"Kakaós Csiga HU (Ekmek)", adLatin:"Kakaos Csiga HU", kal:348, pro:8, karb:52, yag:14, lif:2, sod:185, por:80, kat:"Pékáruk", ulke:"hu", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"liszt, tej, tojás, vaj, cukor, kakaó, élesztő", katkiMaddeleri:[] },
{ ad:"Cozonac RO (Bayram Ekmeği)", adLatin:"Cozonac RO", kal:348, pro:8, karb:56, yag:13, lif:2, sod:185, por:80, kat:"Patiserie", ulke:"ro", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"faina, lapte, oua, zahar, unt, nuca, cacao, drojdie", katkiMaddeleri:[] },
{ ad:"Pogača HR (Sade Ekmek)", adLatin:"Pogaca HR", kal:265, pro:8, karb:50, yag:5, lif:2.5, sod:480, por:100, kat:"Kruh", ulke:"hr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"brašno, voda, sol, kvasac, maslinovo ulje", katkiMaddeleri:[] },
{ ad:"Sēklu Maize LV (Tohumlu)", adLatin:"Seklu Maize LV", kal:245, pro:9, karb:42, yag:5.5, lif:6, sod:480, por:100, kat:"Maize", ulke:"lv", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"rudzu milti, saulespuķu sēklas, linsēklas, ūdens, sāls, raugs", katkiMaddeleri:[] },
{ ad:"Seemneleib ET (Tohumlu Ekmek)", adLatin:"Seemneleib ET", kal:245, pro:9, karb:42, yag:5.5, lif:6, sod:480, por:100, kat:"Leib", ulke:"et", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"rukkijahu, seemned, vesi, sool, juuretis", katkiMaddeleri:[] },
{ ad:"Sezaminis Duona LT", adLatin:"Sezaminis Duona LT", kal:255, pro:9, karb:43, yag:5, lif:5, sod:480, por:100, kat:"Duona", ulke:"lt", tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"miltai, sezamo sėklos, vanduo, raugas, druska", katkiMaddeleri:[] },
{ ad:"Bröd med Frön NO (Tohumlu)", kal:245, pro:9, karb:42, yag:5.5, lif:6, sod:480, por:100, kat:"Bröd", ulke:"no", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"rugmel, frø, vann, salt, gjær", katkiMaddeleri:[] },
{ ad:"Speltbrood NL", kal:248, pro:11, karb:44, yag:3, lif:5.5, sod:480, por:100, kat:"Brood", ulke:"nl", tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"speltmeel, water, zuurdesem, zout", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// İÇECEKLER
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"Elma Suyu (Taze Sıkılmış)", adler:{tr:"Taze Sıkılmış Elma Suyu",de:"Frisch Gepresster Apfelsaft",el:"Χυμός Μήλου",hu:"Frissen Facsart Almalé",pl:"Świeżo Wyciskany Sok Jabłkowy",cs:"Čerstvý Jablečný Džus",ro:"Suc de Mere Proaspăt",hr:"Svježe Cijeđeni Sok od Jabuke",fr:"Jus de Pomme Frais",es:"Zumo de Manzana Fresco",it:"Succo di Mela Fresco",pt:"Sumo de Maçã Fresco",no:"Fersk Eplejuice",sv:"Färskpressad Äppeljuice",da:"Friskpresset Æblejuice",fi:"Tuore Omenamehu",nl:"Vers Geperst Appelsap",lv:"Svaigi Spiesta Ābolu Sula",et:"Värskelt Pressitud Õunamahl",lt:"Šviežiai Spaustos Obuolių Sultys"}, kal:48, pro:0.1, karb:11, yag:0.1, lif:0.2, sod:3, por:200, kat:"Drinks", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"elma suyu", katkiMaddeleri:[] },
{ ad:"Limonata (Ev Yapımı)", adler:{tr:"Ev Yapımı Limonata",de:"Hausgemachte Limonade",el:"Σπιτική Λεμονάδα",hu:"Házi Limonádé",pl:"Domowa Lemoniada",cs:"Domácí Limonáda",ro:"Limonadă de Casă",hr:"Domaća Limonada",fr:"Citronnade Maison",es:"Limonada Casera",it:"Limonata Fatta in Casa",pt:"Limonada Caseira",no:"Hjemmelaget Sitronvann",sv:"Hemgjord Lemonad",da:"Hjemmelavet Limonade",fi:"Kotitekoinen Limonaadi",nl:"Zelfgemaakte Limonade",lv:"Mājās Gatavota Limonāde",et:"Kodune Limonaad",lt:"Naminė Limonada"}, kal:38, pro:0.1, karb:9.5, yag:0, lif:0, sod:3, por:300, kat:"Drinks", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"limon suyu, su, şeker/bal", katkiMaddeleri:[] },
{ ad:"Siyah Çay (Demleme)", adler:{tr:"Siyah Çay",de:"Schwarzer Tee",el:"Μαύρο Τσάι",hu:"Fekete Tea",pl:"Czarna Herbata",cs:"Černý Čaj",ro:"Ceai Negru",hr:"Crni Čaj",fr:"Thé Noir",es:"Té Negro",it:"Tè Nero",pt:"Chá Preto",no:"Sort Te",sv:"Svart Te",da:"Sort Te",fi:"Musta Tee",nl:"Zwarte Thee",lv:"Melnā Tēja",et:"Must Tee",lt:"Juodoji Arbata"}, kal:2, pro:0.1, karb:0.3, yag:0, lif:0, sod:1, por:200, kat:"Tea", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"siyah çay yaprağı, su", katkiMaddeleri:[] },
{ ad:"Filtre Kahve", adler:{tr:"Filtre Kahve",de:"Filterkaffee",el:"Φίλτρου Καφές",hu:"Filteres Kávé",pl:"Kawa Parzona",cs:"Překápaná Káva",ro:"Cafea Filtru",hr:"Filter Kava",fr:"Café Filtre",es:"Café de Filtro",it:"Caffè Filtro",pt:"Café de Filtro",no:"Filterkaffe",sv:"Filterkaffe",da:"Filterkaffe",fi:"Suodatinkahvi",nl:"Filterkoffie",lv:"Filtra Kafija",et:"Filterkohv",lt:"Kavos Filtras"}, kal:4, pro:0.3, karb:0.6, yag:0.1, lif:0, sod:5, por:200, kat:"Coffee", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"kahve çekirdeği, su", katkiMaddeleri:[] },
{ ad:"Espresso", adler:{tr:"Espresso",de:"Espresso",el:"Εσπρέσο",hu:"Eszpresszó",pl:"Espresso",cs:"Espresso",ro:"Espresso",hr:"Espresso",fr:"Espresso",es:"Café Espresso",it:"Caffè Espresso",pt:"Café Espresso",no:"Espresso",sv:"Espresso",da:"Espresso",fi:"Espresso",nl:"Espresso",lv:"Espresso",et:"Espresso",lt:"Espreso"}, kal:8, pro:0.5, karb:1.2, yag:0.2, lif:0, sod:8, por:30, kat:"Coffee", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"espresso kahvesi, su", katkiMaddeleri:[] },
{ ad:"Latte Macchiato", adler:{tr:"Latte Macchiato",de:"Latte Macchiato",el:"Λάτε Μακιάτο",hu:"Latte Macchiato",pl:"Latte Macchiato",cs:"Latte Macchiato",ro:"Latte Macchiato",hr:"Latte Macchiato",fr:"Latte Macchiato",es:"Latte Macchiato",it:"Latte Macchiato",pt:"Latte Macchiato",no:"Latte Macchiato",sv:"Latte Macchiato",da:"Latte Macchiato",fi:"Latte Macchiato",nl:"Latte Macchiato",lv:"Latte Macchiato",et:"Latte Macchiato",lt:"Latte Macchiato"}, kal:95, pro:4.5, karb:9, yag:4.5, lif:0, sod:55, por:250, kat:"Coffee", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"espresso, süt, süt köpüğü", katkiMaddeleri:[] },
// ── Ülkeye özgü içecekler ──
{ ad:"Ayran TR", kal:42, pro:2.5, karb:3, yag:2, lif:0, sod:480, por:200, kat:"İçecek", ulke:"tr", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"yoğurt, su, tuz", katkiMaddeleri:[] },
{ ad:"Boza TR", kal:78, pro:2, karb:16, yag:0.5, lif:0.5, sod:10, por:200, kat:"İçecek", ulke:"tr", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"mısır, buğday, şeker, su, maya", katkiMaddeleri:[] },
{ ad:"Sahlep TR", kal:115, pro:3.5, karb:22, yag:2.5, lif:0, sod:55, por:200, kat:"İçecek", ulke:"tr", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"süt, sahlep tozu, şeker, tarçın", katkiMaddeleri:[] },
{ ad:"Smoothie (Meyve-Sebze)", adler:{tr:"Smoothie",de:"Smoothie",el:"Σμούθι",hu:"Turmix",pl:"Koktajl Owocowy",cs:"Smoothie",ro:"Smoothie",hr:"Smoothie",fr:"Smoothie",es:"Batido de Frutas",it:"Frullato",pt:"Batido de Fruta",no:"Smoothie",sv:"Smoothie",da:"Smoothie",fi:"Smoothie",nl:"Smoothie",lv:"Smūtijs",et:"Smuuti",lt:"Smutis"}, kal:65, pro:1.5, karb:15, yag:0.5, lif:2, sod:15, por:250, kat:"Drinks", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"meyve, sebze, süt/yoğurt/bitki bazlı süt", katkiMaddeleri:[] },
{ ad:"Kefir", adler:{tr:"Kefir",de:"Kefir",el:"Κεφίρ",hu:"Kefír",pl:"Kefir",cs:"Kefír",ro:"Chefir",hr:"Kefir",fr:"Kéfir",es:"Kéfir",it:"Kefir",pt:"Kefir",no:"Kefir",sv:"Kefir",da:"Kefir",fi:"Kefiiri",nl:"Kefir",lv:"Kefīrs",et:"Keefir",lt:"Kefyras"}, kal:52, pro:3.5, karb:4.7, yag:1.8, lif:0, sod:46, por:200, kat:"Dairy Drink", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"süt, kefir granülleri (bakteri + maya)", katkiMaddeleri:[] },
{ ad:"Çiçek Açan Elma Şarabı (Cider)", adler:{tr:"Elma Şarabı (Cider)",de:"Apfelwein",el:"Μηλίτης",hu:"Almabor",pl:"Cydr",cs:"Cidre",ro:"Cidru",hr:"Jabukovača",fr:"Cidre",es:"Sidra",it:"Sidro",pt:"Sidra",no:"Eplemost",sv:"Äppelcider",da:"Æblecider",fi:"Siideri",nl:"Appelcider",lv:"Ābolu Sidrs",et:"Siider",lt:"Sidras"}, kal:42, pro:0, karb:4, yag:0, lif:0, sod:8, por:330, kat:"Drinks", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","lv","et","lt"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"elma, maya, E220", katkiMaddeleri:[{kod:"E220",ad:"Sulphur dioxide",tehlikeli:true,aciklama:"May cause allergic reactions."}] },
{ ad:"Bitter Bira (IPA)", adler:{tr:"IPA Birası",de:"IPA Bier",el:"Μπύρα IPA",hu:"IPA Sör",pl:"Piwo IPA",cs:"Pivo IPA",ro:"Bere IPA",hr:"IPA Pivo",fr:"Bière IPA",es:"Cerveza IPA",it:"Birra IPA",pt:"Cerveja IPA",no:"IPA Øl",sv:"IPA Öl",da:"IPA Øl",fi:"IPA Olut",nl:"IPA Bier",lv:"IPA Alus",et:"IPA Õlu",lt:"IPA Alus"}, kal:52, pro:0.5, karb:5, yag:0, lif:0, sod:8, por:330, kat:"Beer", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","lv","et","lt"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"su, malt, şerbetçiotu, maya", katkiMaddeleri:[] },
{ ad:"Bitki Çayı (Papatya)", adler:{tr:"Papatya Çayı",de:"Kamillentee",el:"Τσάι Χαμομηλιού",hu:"Kamilla Tea",pl:"Herbata Rumiankowa",cs:"Heřmánkový Čaj",ro:"Ceai de Mușețel",hr:"Čaj od Kamilice",fr:"Infusion de Camomille",es:"Infusión de Manzanilla",it:"Infuso di Camomilla",pt:"Chá de Camomila",no:"Kamilletek",sv:"Kamomill Te",da:"Kamillete",fi:"Kamillentee",nl:"Kamille Thee",lv:"Kumelīšu Tēja",et:"Kummelitee",lt:"Ramunėlių Arbata"}, kal:2, pro:0.1, karb:0.3, yag:0, lif:0, sod:1, por:200, kat:"Tea", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"papatya, su", katkiMaddeleri:[] },
{ ad:"Nane Limon Çayı", adler:{tr:"Nane Limon Çayı",de:"Pfefferminz-Zitronen-Tee",el:"Τσάι Μέντας Λεμονιού",hu:"Menta-Citrom Tea",pl:"Herbata Miętowo-Cytrynowa",cs:"Mátový Čaj s Citronem",ro:"Ceai de Mentă cu Lămâie",hr:"Čaj Metvice i Limuna",fr:"Thé Menthe Citron",es:"Té de Menta Limón",it:"Tè Menta Limone",pt:"Chá Hortelã Limão",no:"Myntetea med Sitron",sv:"Pepparmyntte med Citron",da:"Mynte Citron Te",fi:"Minttu-Sitruunatee",nl:"Muntthee met Citroen",lv:"Piparmētru Citronāde Tēja",et:"Mündi-Sidrunimel Tee",lt:"Mėtų Citrinų Arbata"}, kal:3, pro:0.1, karb:0.5, yag:0, lif:0, sod:1, por:200, kat:"Tea", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"nane, limon, su", katkiMaddeleri:[] },
{ ad:"Gazoz (Alkolsüz)", adler:{tr:"Gazoz",de:"Limonade",el:"Αναψυκτικό",hu:"Szénsavas Üdítő",pl:"Napój Gazowany",cs:"Limonáda Sycená",ro:"Sucuri Acidulate",hr:"Gazirani Napitak",fr:"Limonade",es:"Refresco",it:"Bibita Gassata",pt:"Refrigerante",no:"Brus",sv:"Läsk",da:"Sodavand",fi:"Limonaati",nl:"Limonade",lv:"Limonāde",et:"Limonaad",lt:"Gazuotas Gėrimas"}, kal:42, pro:0, karb:10.5, yag:0, lif:0, sod:10, por:330, kat:"Drinks", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"su, şeker, aroma, E330, E211", katkiMaddeleri:[{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."},{kod:"E211",ad:"Sodium benzoate",tehlikeli:false,aciklama:"Preservative."}] },
{ ad:"Bitter Meşrubat (Tonic Water)", adler:{tr:"Tonik Suyu",de:"Tonic Water",el:"Τόνικ",hu:"Tonic Water",pl:"Woda Tonikowa",cs:"Tonik",ro:"Apă Tonică",hr:"Tonik",fr:"Eau Tonique",es:"Agua Tónica",it:"Acqua Tonica",pt:"Água Tónica",no:"Tonic Water",sv:"Tonic Water",da:"Tonic Water",fi:"Tonic Water",nl:"Tonic Water",lv:"Toniks",et:"Tonik",lt:"Tonik Vanduo"}, kal:34, pro:0, karb:8.5, yag:0, lif:0, sod:22, por:200, kat:"Drinks", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:3, icerik:"water, sugar, quinine, E330, E211", katkiMaddeleri:[{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."},{kod:"E211",ad:"Sodium benzoate",tehlikeli:false,aciklama:"Preservative."}] },

// ══════════════════════════════════════════════════════
// ATIŞTIMALIKLAR
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"Cips (Paprika/Kırmızı Biber)", adler:{tr:"Kırmızı Biber Cips",de:"Paprika Chips",el:"Πατατάκια Πάπρικα",hu:"Paprika Chips",pl:"Chipsy Paprykowe",cs:"Paprika Chipsy",ro:"Chipsuri Ardei",hr:"Čips Paprika",fr:"Chips Paprika",es:"Patatas Fritas Pimentón",it:"Patatine Paprika",pt:"Batatas Fritas Pimentão",no:"Paprika Chips",sv:"Paprika Chips",da:"Paprika Chips",fi:"Paprika Sipsit",nl:"Paprika Chips",lv:"Paprikas Čipsi",et:"Paprika Krõpsud",lt:"Paprika Traškučiai"}, marka:"Lay's", kal:536, pro:7, karb:52, yag:34, lif:5, sod:580, por:30, kat:"Snack", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"patates, sıvı yağ, paprika tozu, tuz, E621", katkiMaddeleri:[{kod:"E621",ad:"Monosodium glutamate",tehlikeli:false,aciklama:"Flavour enhancer."}] },
{ ad:"Cips (Ekşi Krema Soğan)", adler:{tr:"Ekşi Krema Soğan Cips",de:"Sauerrahm Zwiebel Chips",el:"Πατατάκια Κρέμα Κρεμμύδι",hu:"Tejfölös-Hagyma Chips",pl:"Chipsy Śmietana Cebula",cs:"Chipsy Smetana Cibule",ro:"Chipsuri Smântână Ceapă",hr:"Čips Kiselo Vrhnje Luk",fr:"Chips Crème Fraîche Oignon",es:"Patatas Nata Cebolla",it:"Patatine Panna Cipolla",pt:"Batatas Nata Cebola",no:"Rømme Løk Chips",sv:"Sourcream Lök Chips",da:"Cremefraiche Løg Chips",fi:"Kermaviili Sipuli Sipsit",nl:"Zure Room Ui Chips",lv:"Skābā Krējuma Sīpolu Čipsi",et:"Hapukoor Sibula Krõpsud",lt:"Grietinė Svogūnų Traškučiai"}, marka:"", kal:545, pro:6.5, karb:54, yag:35, lif:4.5, sod:650, por:30, kat:"Snack", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"patates, sıvı yağ, ekşi krema tozu, soğan tozu, tuz, E621, E330", katkiMaddeleri:[{kod:"E621",ad:"Monosodium glutamate",tehlikeli:false,aciklama:"Flavour enhancer."},{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."}] },
{ ad:"Kraker (Tuzlu)", adler:{tr:"Tuzlu Kraker",de:"Salzcracker",el:"Αλμυρά Κράκερ",hu:"Sós Kréker",pl:"Słone Krakersy",cs:"Slané Krekry",ro:"Crăckers Sărate",hr:"Slani Krekeri",fr:"Crackers Salés",es:"Galletas Saladas",it:"Crackers al Sale",pt:"Crackers Salgados",no:"Salt Knekkebrød",sv:"Saltade Kex",da:"Saltkiks",fi:"Suolakeksit",nl:"Zout Crackers",lv:"Sāļie Cepumi",et:"Soolased Kreekerid",lt:"Sūrūs Krekeriai"}, marka:"", kal:421, pro:9, karb:68, yag:14, lif:3, sod:680, por:30, kat:"Snack", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"un, bitkisel yağ, tuz, maya, E322, E471", katkiMaddeleri:[{kod:"E322",ad:"Lecithin",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."}] },
{ ad:"Popcorn (Tuzlu)", adler:{tr:"Tuzlu Popcorn",de:"Gesalzenes Popcorn",el:"Αλμυρό Ποπκορν",hu:"Sós Popcorn",pl:"Słony Popcorn",cs:"Slaný Popcorn",ro:"Popcorn Sărat",hr:"Slani Popcorn",fr:"Popcorn Salé",es:"Palomitas Saladas",it:"Popcorn Salato",pt:"Pipocas Salgadas",no:"Salt Popcorn",sv:"Salt Popcorn",da:"Salt Popcorn",fi:"Suolainen Popcorn",nl:"Zoute Popcorn",lv:"Sāļie Popkorni",et:"Soolane Popkorn",lt:"Sūrus Spraginti Kukurūzai"}, kal:375, pro:13, karb:74, yag:5, lif:14, sod:480, por:30, kat:"Snack", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"mısır, tuz, bitkisel yağ", katkiMaddeleri:[] },
{ ad:"Popcorn (Tatlı / Karamel)", adler:{tr:"Tatlı Popcorn",de:"Karamell Popcorn",el:"Γλυκό Ποπκορν",hu:"Édes Popcorn",pl:"Słodki Popcorn",cs:"Sladký Popcorn",ro:"Popcorn Dulce",hr:"Slatki Popcorn",fr:"Popcorn Sucré",es:"Palomitas Dulces",it:"Popcorn Dolce",pt:"Pipocas Doces",no:"Søt Popcorn",sv:"Söt Popcorn",da:"Sød Popcorn",fi:"Makea Popcorn",nl:"Zoete Popcorn",lv:"Saldais Popkorns",et:"Magus Popkorn",lt:"Saldus Spraginti Kukurūzai"}, kal:418, pro:6, karb:80, yag:9, lif:7, sod:280, por:30, kat:"Snack", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"mısır, şeker, bitkisel yağ, tuz, E150a", katkiMaddeleri:[{kod:"E150a",ad:"Plain caramel",tehlikeli:false,aciklama:"Colouring."}] },
{ ad:"Çikolata Kaplı Bisküvi", adler:{tr:"Çikolatalı Bisküvi",de:"Schokoladenkeks",el:"Μπισκότο Σοκολάτας",hu:"Csokis Keksz",pl:"Herbatnik Czekoladowy",cs:"Čokoládový Sušenka",ro:"Biscuit de Ciocolată",hr:"Čokoladni Keksi",fr:"Biscuit au Chocolat",es:"Galleta de Chocolate",it:"Biscotto al Cioccolato",pt:"Bolacha de Chocolate",no:"Sjokoladekjeks",sv:"Chokladkex",da:"Chokoladekiks",fi:"Suklaakeksi",nl:"Chocoladekoek",lv:"Šokolādes Cepums",et:"Šokolaadikuivak",lt:"Šokoladinis Sausainis"}, marka:"", kal:485, pro:5.5, karb:68, yag:22, lif:2.5, sod:280, por:30, kat:"Snack", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:2.5, icerik:"un, şeker, çikolata, bitkisel yağ, E322, E471, E500", katkiMaddeleri:[{kod:"E322",ad:"Lecithin",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E500",ad:"Sodium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },
{ ad:"Rice Cake (Pirinç Galeti)", adler:{tr:"Pirinç Galeti",de:"Reiskuchen",el:"Γκοφρέτα Ρυζιού",hu:"Rizspogácsa",pl:"Wafle Ryżowe",cs:"Rýžové Chlebíčky",ro:"Vafe de Orez",hr:"Rižini Vafli",fr:"Galette de Riz",es:"Tortas de Arroz",it:"Gallette di Riso",pt:"Bolos de Arroz",no:"Risknekk",sv:"Riskaka",da:"Riskage",fi:"Riisikakku",nl:"Rijstwafels",lv:"Rīsu Vafele",et:"Riisiküpsis",lt:"Ryžių Pyragas"}, kal:385, pro:8, karb:81, yag:3, lif:4, sod:25, por:30, kat:"Snack", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"pirinç, tuz", katkiMaddeleri:[] },
{ ad:"Granola Bar (Fındıklı)", adler:{tr:"Fındıklı Granola Bar",de:"Müsliriegel",el:"Μπάρα Δημητριακών",hu:"Gabonapehely Rúd",pl:"Batonik Musli",cs:"Cereální Tyčinka",ro:"Baton de Cereale",hr:"Pločica Žitarica",fr:"Barre de Céréales",es:"Barrita de Cereales",it:"Barretta di Cereali",pt:"Barra de Cereais",no:"Müslibar",sv:"Müslibar",da:"Müslibar",fi:"Myslipatukka",nl:"Mueslireep",lv:"Musli Batoniņš",et:"Mürgli Batoon",lt:"Muesli Batonėlis"}, marka:"", kal:398, pro:9, karb:62, yag:14, lif:5, sod:120, por:35, kat:"Snack", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"yulaf, bal, fındık, kuru üzüm, E306", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Pringles (Sade)", adler:{tr:"Sade Pringles",de:"Pringles Original",el:"Pringles Φυσικά",hu:"Pringles Original",pl:"Pringles Original",cs:"Pringles Original",ro:"Pringles Original",hr:"Pringles Original",fr:"Pringles Original",es:"Pringles Original",it:"Pringles Original",pt:"Pringles Original",no:"Pringles Original",sv:"Pringles Original",da:"Pringles Original",fi:"Pringles Original",nl:"Pringles Original",lv:"Pringles Original",et:"Pringles Original",lt:"Pringles Originalūs"}, marka:"Pringles", kal:536, pro:5, karb:52, yag:35, lif:4, sod:535, por:30, kat:"Snack", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"patates nişastası, bitkisel yağ, un, tuz, E621", katkiMaddeleri:[{kod:"E621",ad:"Monosodium glutamate",tehlikeli:false,aciklama:"Flavour enhancer."}] },
// ── Ülkeye özgü ──
{ ad:"Simit Kurusu TR", kal:348, pro:10, karb:66, yag:6, lif:3.5, sod:520, por:30, kat:"Atıştırmalık", ulke:"tr", tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"un, susam, pekmez, maya, tuz", katkiMaddeleri:[] },
{ ad:"Leblebi (Tuzlu Nohut)", kal:355, pro:20, karb:52, yag:6, lif:12, sod:480, por:30, kat:"Atıştırmalık", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"nohut, tuz", katkiMaddeleri:[] },
{ ad:"Çekirdek (Kavurga)", kal:582, pro:20, karb:16, yag:51, lif:8.6, sod:3, por:30, kat:"Atıştırmalık", ulke:"tr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"ay çekirdeği", katkiMaddeleri:[] },
{ ad:"Stroopwafel Stuk NL", kal:148, pro:1.5, karb:22, yag:6.5, lif:0.5, sod:65, por:32, kat:"Koek", ulke:"nl", tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"bloem, stroop, boter, suiker, kaneel, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono en diglyceriden",tehlikeli:false,aciklama:"Emulgator."}] },
{ ad:"Speculoos NL/BE (Stuk)", kal:165, pro:2, karb:23, yag:8, lif:0.8, sod:125, por:32, kat:"Koek", ulke:"be", tokPuan:20, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"bloem, suiker, boter, speculaaskruiden, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono en diglyceriden",tehlikeli:false,aciklama:"Emulgator."}] },
{ ad:"Pretzel Sticks DE", kal:348, pro:10, karb:72, yag:3, lif:3, sod:1250, por:30, kat:"Snack", ulke:"de", tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"Weizenmehl, Natronlauge, Salz, Hefe", katkiMaddeleri:[] },
{ ad:"Crème de Marrons FR (Kestane)", kal:292, pro:2, karb:67, yag:0.5, lif:3, sod:22, por:30, kat:"Snack", ulke:"fr", tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"kestane, sucre, vanille, E330", katkiMaddeleri:[{kod:"E330",ad:"Acide citrique",tehlikeli:false,aciklama:"Régulateur d'acidité."}] },
{ ad:"Tortas de Aceite ES", kal:448, pro:6.5, karb:62, yag:21, lif:3, sod:280, por:30, kat:"Snack", ulke:"es", tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"harina, aceite de oliva, anís, azúcar, sal", katkiMaddeleri:[] },
{ ad:"Nachos (Tortilla Chips)", adler:{tr:"Tortilla Chips",de:"Tortilla Chips",el:"Τορτίγια Τσιπς",hu:"Tortilla Chips",pl:"Chipsy Tortilla",cs:"Tortilla Chipsy",ro:"Chips Tortilla",hr:"Tortilla Čips",fr:"Chips de Maïs",es:"Nachos Tortilla",it:"Chips di Mais",pt:"Tortilhas",no:"Tortilla Chips",sv:"Tortilla Chips",da:"Tortilla Chips",fi:"Tortilla Chips",nl:"Tortilla Chips",lv:"Tortiljas Čipsi",et:"Tortilla Krõpsud",lt:"Tortiljos Traškučiai"}, marka:"Doritos", kal:490, pro:7, karb:64, yag:22, lif:5, sod:580, por:30, kat:"Snack", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"mısır, bitkisel yağ, tuz, E621, baharat", katkiMaddeleri:[{kod:"E621",ad:"Monosodium glutamate",tehlikeli:false,aciklama:"Flavour enhancer."}] },

// ══════════════════════════════════════════════════════
// DONDURULMUŞ ÜRÜNLER
// ══════════════════════════════════════════════════════
// ── PAYLAŞILAN ──
{ ad:"Dondurulmuş Ispanak", adler:{tr:"Dondurulmuş Ispanak",de:"Tiefkühl Spinat",el:"Κατεψυγμένο Σπανάκι",hu:"Mélyhűtött Spenót",pl:"Mrożony Szpinak",cs:"Mražený Špenát",ro:"Spanac Congelat",hr:"Smrznuti Špinat",fr:"Épinards Surgelés",es:"Espinacas Congeladas",it:"Spinaci Surgelati",pt:"Espinafres Congelados",no:"Frossen Spinat",sv:"Fryst Spenat",da:"Frossen Spinat",fi:"Pakaste Pinaatti",nl:"Diepvries Spinazie",lv:"Saldēti Spināti",et:"Külmutatud Spinat",lt:"Šaldyti Špinatai"}, kal:23, pro:2.9, karb:3.6, yag:0.4, lif:2.2, sod:79, por:100, kat:"Frozen", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"ıspanak", katkiMaddeleri:[] },
{ ad:"Dondurulmuş Brokoli", adler:{tr:"Dondurulmuş Brokoli",de:"Tiefkühl Brokkoli",el:"Κατεψυγμένο Μπρόκολο",hu:"Mélyhűtött Brokkoli",pl:"Mrożone Brokuły",cs:"Mražená Brokolice",ro:"Broccoli Congelat",hr:"Smrznuta Brokula",fr:"Brocoli Surgelé",es:"Brócoli Congelado",it:"Broccolo Surgelato",pt:"Brócolos Congelados",no:"Frossen Brokkoli",sv:"Fryst Broccoli",da:"Frossen Broccoli",fi:"Pakaste Parsakaali",nl:"Diepvries Broccoli",lv:"Saldēti Brokoļi",et:"Külmutatud Spargelkapsas",lt:"Šaldyti Brokoliai"}, kal:34, pro:2.8, karb:7, yag:0.4, lif:2.6, sod:33, por:100, kat:"Frozen", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"brokoli", katkiMaddeleri:[] },
{ ad:"Dondurulmuş Karışık Sebze", adler:{tr:"Dondurulmuş Karışık Sebze",de:"Tiefkühl Gemüsemischung",el:"Κατεψυγμένα Μικτά Λαχανικά",hu:"Mélyhűtött Zöldségkeverék",pl:"Mieszanka Warzyw Mrożona",cs:"Mražená Zeleninová Směs",ro:"Legume Mixte Congelate",hr:"Smrznuto Miješano Povrće",fr:"Légumes Mélangés Surgelés",es:"Verduras Variadas Congeladas",it:"Verdure Miste Surgelate",pt:"Legumes Variados Congelados",no:"Frosne Blandede Grønnsaker",sv:"Fryst Blandade Grönsaker",da:"Frosne Blandede Grøntsager",fi:"Pakaste Sekavihannekset",nl:"Diepvries Groentemix",lv:"Saldētu Dārzeņu Maisījums",et:"Külmutatud Segaköögiviljad",lt:"Šaldytų Daržovių Mišinys"}, kal:55, pro:2.5, karb:9, yag:1, lif:3.5, sod:50, por:100, kat:"Frozen", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"havuç, bezelye, mısır, fasulye", katkiMaddeleri:[] },
{ ad:"Dondurulmuş Balık Parmağı", adler:{tr:"Balık Parmağı",de:"Fischstäbchen",el:"Κατεψυγμένα Ψαράκια",hu:"Halrudak",pl:"Paluszki Rybne",cs:"Rybí Prsty",ro:"Batoane de Pește",hr:"Riblje Štapiće",fr:"Bâtonnets de Poisson",es:"Palitos de Pescado",it:"Bastoncini di Pesce",pt:"Palitos de Peixe",no:"Fiskepinner",sv:"Fiskpinnar",da:"Fiskepinde",fi:"Kalapuikot",nl:"Vissticks",lv:"Zivju Standziņas",et:"Kalakarbonaadid",lt:"Žuvų Lazdelės"}, marka:"Iglo", kal:195, pro:12, karb:18, yag:8, lif:1, sod:480, por:100, kat:"Frozen", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"pollock, buğday unu, ekmek kırıntısı, tuz, E450, E500", katkiMaddeleri:[{kod:"E450",ad:"Diphosphates",tehlikeli:false,aciklama:"Raising agent."},{kod:"E500",ad:"Sodium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },
{ ad:"Dondurulmuş Patates (Fırın)", adler:{tr:"Dondurulmuş Fırınlık Patates",de:"Tiefkühl Ofenkartoffeln",el:"Κατεψυγμένες Πατάτες Φούρνου",hu:"Mélyhűtött Sütőkrumpli",pl:"Mrożone Ziemniaki do Piekarnika",cs:"Mražené Brambory do Trouby",ro:"Cartofi Congelați la Cuptor",hr:"Smrznuti Krumpiri za Pećnicu",fr:"Pommes de Terre Surgelées Four",es:"Patatas para Horno Congeladas",it:"Patate al Forno Surgelate",pt:"Batatas para Forno Congeladas",no:"Frosne Ovnsbakt Poteter",sv:"Fryst Ugnspotatis",da:"Frosne Ovnkartofler",fi:"Pakaste Uuniperunat",nl:"Diepvries Ovenaardappelen",lv:"Saldēti Kartupeļi Cepeškrāsnij",et:"Külmutatud Ahjukartuliviilud",lt:"Šaldytos Bulvės Orkaitei"}, kal:135, pro:2.5, karb:25, yag:3.5, lif:2.5, sod:380, por:150, kat:"Frozen", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:3, icerik:"patates, bitkisel yağ, tuz, E450, E500", katkiMaddeleri:[{kod:"E450",ad:"Diphosphates",tehlikeli:false,aciklama:"Stabilizer."},{kod:"E500",ad:"Sodium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },
{ ad:"Dondurulmuş Börek (Ispanaklı)", adler:{tr:"Dondurulmuş Ispanaklı Börek",de:"Tiefkühl Spinatpastete",el:"Κατεψυγμένη Σπανακόπιτα",hu:"Mélyhűtött Spenótos Rétes",pl:"Mrożone Ciasto Szpinak",cs:"Mražená Špenátová Placka",ro:"Plăcintă cu Spanac Congelată",hr:"Smrznuta Pita sa Špinatom",fr:"Feuilleté Épinards Surgelé",es:"Empanada de Espinacas Congelada",it:"Pasta Sfoglia Spinaci Surgelata",pt:"Pastéis de Espinafres Congelados",no:"Frossen Spinatpai",sv:"Fryst Spenatpaj",da:"Frossen Spinattærte",fi:"Pakaste Pinaattipiirakka",nl:"Diepvries Spinazietaart",lv:"Saldēts Spinātu Pīrāgs",et:"Külmutatud Spinatipirukad",lt:"Šaldyta Špinatų Tešla"}, kal:215, pro:7, karb:24, yag:11, lif:2.5, sod:480, por:100, kat:"Frozen", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:45, aclikSuresi:"1-2 saat", onay:true, yildiz:3.5, icerik:"ıspanak, yufka, feta, yumurta, bitkisel yağ, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."}] },
{ ad:"Dondurulmuş Nohut (Haşlanmış)", adler:{tr:"Dondurulmuş Nohut",de:"Tiefkühl Kichererbsen",el:"Κατεψυγμένα Ρεβύθια",hu:"Mélyhűtött Csicseriborsó",pl:"Mrożona Ciecierzyca",cs:"Mražená Cizrna",ro:"Năut Congelat",hr:"Smrznuta Slanutak",fr:"Pois Chiches Surgelés",es:"Garbanzos Congelados",it:"Ceci Surgelati",pt:"Grão de Bico Congelado",no:"Frosne Kikerter",sv:"Fryst Kikärter",da:"Frosne Kikærter",fi:"Pakaste Kikherneet",nl:"Diepvries Kikkererwten",lv:"Saldētas Aunazirņi",et:"Külmutatud Kikerherned",lt:"Šaldyti Avinžirniai"}, kal:164, pro:8.9, karb:27, yag:2.6, lif:7.6, sod:7, por:100, kat:"Frozen", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"nohut", katkiMaddeleri:[] },
// ── Konserve ──
{ ad:"Konserve Nohut", adler:{tr:"Konserve Nohut",de:"Kichererbsen Dose",el:"Ρεβύθια Κονσέρβα",hu:"Csicseriborsó Konzerv",pl:"Ciecierzyca Puszka",cs:"Cizrna Konzerva",ro:"Năut la Conservă",hr:"Slanutak Konzerva",fr:"Pois Chiches en Boîte",es:"Garbanzos en Lata",it:"Ceci in Scatola",pt:"Grão de Bico em Lata",no:"Kikerter Boks",sv:"Kikärtor Burk",da:"Kikærter Dåse",fi:"Kikherneet Tölkki",nl:"Kikkererwten Blik",lv:"Aunazirņi Kārbā",et:"Kikerherned Konservis",lt:"Avinžirniai Kons."}, marka:"", kal:164, pro:8.9, karb:27, yag:2.6, lif:7.6, sod:240, por:100, kat:"Canned", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"nohut, su, tuz", katkiMaddeleri:[] },
{ ad:"Konserve Kırmızı Mercimek", adler:{tr:"Konserve Kırmızı Mercimek",de:"Rote Linsen Dose",el:"Κόκκινες Φακές Κονσέρβα",hu:"Vörös Lencse Konzerv",pl:"Czerwona Soczewica Puszka",cs:"Červená Čočka Konzerva",ro:"Linte Roșie la Conservă",hr:"Crvena Leća Konzerva",fr:"Lentilles Rouges en Boîte",es:"Lentejas Rojas en Lata",it:"Lenticchie Rosse in Scatola",pt:"Lentilhas Vermelhas em Lata",no:"Røde Linser Boks",sv:"Röda Linser Burk",da:"Røde Linser Dåse",fi:"Punaiset Linssit Tölkki",nl:"Rode Linzen Blik",lv:"Sarkanās Lēcas Kārbā",et:"Punased Läätsed Konservis",lt:"Raudonieji Lęšiai Kons."}, marka:"", kal:116, pro:9, karb:20, yag:0.4, lif:7.9, sod:240, por:100, kat:"Canned", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kırmızı mercimek, su, tuz", katkiMaddeleri:[] },
{ ad:"Konserve Domates Sosu (Passata)", adler:{tr:"Domates Passata",de:"Tomaten Passata",el:"Πασάτα Ντομάτας",hu:"Paradicsom Passata",pl:"Passata Pomidorowa",cs:"Rajčatová Passata",ro:"Roșii Pasate",hr:"Passata od Rajčice",fr:"Passata de Tomates",es:"Passata de Tomate",it:"Passata di Pomodoro",pt:"Passata de Tomate",no:"Tomatpassata",sv:"Tomatpassata",da:"Tomatpassata",fi:"Tomaattipassata",nl:"Tomatenpassata",lv:"Tomātu Pasāta",et:"Tomatipasata",lt:"Pomidorų Pasata"}, marka:"Mutti", kal:38, pro:1.6, karb:7.5, yag:0.3, lif:1.8, sod:120, por:200, kat:"Canned", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"domates, sitrik asit E330", katkiMaddeleri:[{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."}] },
{ ad:"Konserve Fasulye (Barbunya)", adler:{tr:"Konserve Barbunya",de:"Kidney Bohnen Dose",el:"Φασόλια Κόκκινα Κονσέρβα",hu:"Vörösbab Konzerv",pl:"Fasola Czerwona Puszka",cs:"Červené Fazole Konzerva",ro:"Fasole Roșie Conservă",hr:"Crveni Grah Konzerva",fr:"Haricots Rouges en Boîte",es:"Alubias Rojas en Lata",it:"Fagioli Rossi in Scatola",pt:"Feijão Vermelho em Lata",no:"Kidney Bønner Boks",sv:"Kidney Bönor Burk",da:"Kidney Bønner Dåse",fi:"Kidneypaput Tölkki",nl:"Kidney Bonen Blik",lv:"Sarkanās Pupiņas Kārbā",et:"Punased Oad Konservis",lt:"Raudonieji Pupelės Kons."}, marka:"", kal:127, pro:8.7, karb:23, yag:0.5, lif:6.4, sod:240, por:100, kat:"Canned", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"barbunya, su, tuz", katkiMaddeleri:[] },
{ ad:"Konserve Mısır", adler:{tr:"Konserve Mısır",de:"Mais Dose",el:"Καλαμπόκι Κονσέρβα",hu:"Kukorica Konzerv",pl:"Kukurydza Puszka",cs:"Kukuřice Konzerva",ro:"Porumb la Conservă",hr:"Kukuruz Konzerva",fr:"Maïs en Boîte",es:"Maíz en Lata",it:"Mais in Scatola",pt:"Milho em Lata",no:"Mais Boks",sv:"Majs Burk",da:"Majs Dåse",fi:"Maissi Tölkki",nl:"Mais Blik",lv:"Kukurūza Kārbā",et:"Mais Konservis",lt:"Kukurūzai Kons."}, marka:"", kal:86, pro:3.2, karb:19, yag:1.2, lif:2.7, sod:180, por:100, kat:"Canned", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"mısır, su, tuz, şeker", katkiMaddeleri:[] },
{ ad:"Konserve Siyah Zeytin", adler:{tr:"Konserve Siyah Zeytin",de:"Schwarze Oliven Dose",el:"Μαύρες Ελιές Κονσέρβα",hu:"Fekete Olíva Konzerv",pl:"Czarne Oliwki Puszka",cs:"Černé Olivy Konzerva",ro:"Măsline Negre Conservă",hr:"Crne Masline Konzerva",fr:"Olives Noires en Boîte",es:"Aceitunas Negras en Lata",it:"Olive Nere in Scatola",pt:"Azeitonas Pretas em Lata",no:"Sorte Oliven Boks",sv:"Svarta Oliver Burk",da:"Sorte Oliven Dåse",fi:"Mustat Oliivit Tölkki",nl:"Zwarte Olijven Blik",lv:"Melnas Olīvas Kārbā",et:"Mustad Oliivid Konservis",lt:"Juodosios Alyvuogės Kons."}, marka:"", kal:145, pro:1, karb:4, yag:15, lif:3.3, sod:735, por:30, kat:"Canned", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"siyah zeytin, su, tuz, E579", katkiMaddeleri:[{kod:"E579",ad:"Ferrous gluconate",tehlikeli:false,aciklama:"Colour stabilizer."}] },

// ══════════════════════════════════════════════════════
// KAHVALTILIKlar
// ══════════════════════════════════════════════════════
{ ad:"Müsli (Yoğurt ile)", adler:{tr:"Yoğurtlu Müsli",de:"Joghurt Müsli",el:"Μούσλι Γιαουρτιού",hu:"Joghurtos Müzli",pl:"Musli z Jogurtem",cs:"Müsli s Jogurtem",ro:"Muesli cu Iaurt",hr:"Musli s Jogurtom",fr:"Muesli au Yaourt",es:"Muesli con Yogur",it:"Muesli con Yogurt",pt:"Muesli com Iogurte",no:"Müsli med Yoghurt",sv:"Müsli med Yoghurt",da:"Müsli med Yoghurt",fi:"Mysli Jogurtilla",nl:"Muesli met Yoghurt",lv:"Muesli ar Jogurtu",et:"Müsli Jogurtiga",lt:"Muesli su Jogurtu"}, kal:185, pro:7, karb:28, yag:5, lif:3.5, sod:85, por:150, kat:"Cereal", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"yulaf, kuru meyve, fındık, yoğurt, bal, E306", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Granola (Bal-Fındık)", adler:{tr:"Ballı Fındıklı Granola",de:"Honig Nuss Granola",el:"Γρανόλα Μέλι Ξηροί Καρποί",hu:"Méz-Dió Granola",pl:"Granola Miód Orzech",cs:"Granola Med Ořechy",ro:"Granola Miere Nuci",hr:"Granola Med Orasi",fr:"Granola Miel Noisettes",es:"Granola Miel Frutos Secos",it:"Granola Miele Nocciole",pt:"Granola Mel Frutos Secos",no:"Granola Honning Nøtter",sv:"Granola Honung Nötter",da:"Granola Honning Nødder",fi:"Granola Hunaja Pähkinät",nl:"Granola Honing Noten",lv:"Granola Medus Rieksti",et:"Granola Mesi Pähklid",lt:"Granola Medus Riešutai"}, kal:468, pro:10, karb:62, yag:21, lif:7, sod:45, por:45, kat:"Cereal", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"yulaf, bal, fındık, mısır gevreği, E306", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Pancake (Amerikan Krep)", adler:{tr:"Amerikan Krep",de:"Amerikanische Pfannkuchen",el:"Αμερικάνικες Τηγανίτες",hu:"Amerikai Palacsinta",pl:"Naleśniki Amerykańskie",cs:"Americké Palačinky",ro:"Pancakes Americane",hr:"Američki Palačinci",fr:"Pancakes Américains",es:"Tortitas Americanas",it:"Pancakes Americani",pt:"Panquecas Americanas",no:"Amerikanske Pannekaker",sv:"Amerikanska Pannkakor",da:"Amerikanske Pandekager",fi:"Amerikkalaiset Pannukakut",nl:"Amerikaanse Pannenkoekjes",lv:"Amerikāņu Pankūkas",et:"Ameerika Pannkoogid",lt:"Amerikietiški Blynai"}, kal:225, pro:7, karb:34, yag:8, lif:1.5, sod:380, por:100, kat:"Breakfast", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"un, yumurta, süt, şeker, tuz, kabartma tozu, E500", katkiMaddeleri:[{kod:"E500",ad:"Sodium carbonates",tehlikeli:false,aciklama:"Raising agent."}] },
{ ad:"Waffle (Belçika)", adler:{tr:"Belçika Waffle",de:"Belgische Waffeln",el:"Βαφλάκια Βελγικά",hu:"Belga Gofri",pl:"Belgijskie Gofry",cs:"Belgické Vafle",ro:"Vafe Belgiene",hr:"Belgijski Wafli",fr:"Gaufres Belges",es:"Gofres Belgas",it:"Waffle Belgi",pt:"Waffles Belgas",no:"Belgiske Vafler",sv:"Belgiska Våfflor",da:"Belgiske Vafler",fi:"Belgialaiset Vohvelit",nl:"Belgische Wafels",lv:"Beļģu Vafeles",et:"Belgia Vahvlid",lt:"Belgiški Vafliai"}, kal:368, pro:7, karb:52, yag:17, lif:2, sod:280, por:100, kat:"Breakfast", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:28, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"un, yumurta, tereyağı, şeker, maya, tuz", katkiMaddeleri:[] },
{ ad:"Yulaf Lapası (Meyveli)", adler:{tr:"Meyveli Yulaf Lapası",de:"Früchte Porridge",el:"Χυλός Βρώμης με Φρούτα",hu:"Gyümölcsös Zabkása",pl:"Owsianka z Owocami",cs:"Ovesná Kaše s Ovocem",ro:"Terci cu Fructe",hr:"Zobena Kaša s Voćem",fr:"Porridge aux Fruits",es:"Gachas con Frutas",it:"Porridge con Frutta",pt:"Papas com Frutas",no:"Havregrøt med Frukt",sv:"Gröt med Frukt",da:"Havregrød med Frugt",fi:"Hedelmäinen Kaurapuuro",nl:"Pap met Fruit",lv:"Putras Biezputra ar Augļiem",et:"Puuvilja Kaerahelbeputru",lt:"Avižinė Košė su Vaisiais"}, kal:145, pro:5, karb:26, yag:3, lif:4, sod:55, por:200, kat:"Breakfast", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"yulaf, süt, kuru meyve, muz, bal", katkiMaddeleri:[] },
{ ad:"Fıstık Ezmesi (Sade)", adler:{tr:"Sade Fıstık Ezmesi",de:"Erdnussbutter Pur",el:"Φυστικοβούτυρο Σκέτο",hu:"Natúr Mogyoróvaj",pl:"Masło Orzechowe Naturalne",cs:"Přírodní Arašídové Máslo",ro:"Unt Natural de Arahide",hr:"Prirodni Kikiriki Maslac",fr:"Beurre de Cacahuète Naturel",es:"Mantequilla de Cacahuete Natural",it:"Burro di Arachidi Naturale",pt:"Manteiga de Amendoim Natural",no:"Naturlig Peanøttsmør",sv:"Naturell Jordnötssmör",da:"Naturlig Jordnøddesmør",fi:"Luonnollinen Maapähkinävoi",nl:"Pindakaas Naturel",lv:"Dabīgais Zemesriekstu Sviests",et:"Looduslik Maapähklivõi",lt:"Natūralus Žemės Riešutų Sviestas"}, marka:"", kal:588, pro:25, karb:20, yag:50, lif:6, sod:5, por:30, kat:"Breakfast", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"fıstık", katkiMaddeleri:[] },
{ ad:"Bütün Yumurta (Çiftlik)", adler:{tr:"Çiftlik Yumurtası",de:"Freiland Ei",el:"Αυγό Ελεύθερης Βοσκής",hu:"Szabadtartásos Tojás",pl:"Jajko z Wolnego Wybiegu",cs:"Vejce z Volného Chovu",ro:"Ou de Găini Crescute Liber",hr:"Jaje Slobodnog Uzgoja",fr:"Oeuf de Poule Élevée en Plein Air",es:"Huevo de Gallina Campera",it:"Uovo di Galline Allevate all'Aperto",pt:"Ovo de Galinhas Criadas ao Ar Livre",no:"Frittgående Hønseegg",sv:"Frigående Ägg",da:"Frilandshønsæg",fi:"Vapaan Kanan Muna",nl:"Vrije Uitloop Ei",lv:"Brīvās Turēšanas Olas",et:"Vabapidamise Muna",lt:"Laisvai Auginamos Vištos Kiaušinis"}, kal:155, pro:13, karb:1.1, yag:11, lif:0, sod:124, por:100, kat:"Breakfast", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"tam yumurta", katkiMaddeleri:[] },
{ ad:"Tereyağı (Tuzsuz)", adler:{tr:"Tuzsuz Tereyağı",de:"Ungesalzene Butter",el:"Αγλύκαντο Βούτυρο",hu:"Sótlan Vaj",pl:"Masło Niesolone",cs:"Neslaná Máslo",ro:"Unt Nesărat",hr:"Neslan Maslac",fr:"Beurre Doux",es:"Mantequilla sin Sal",it:"Burro non Salato",pt:"Manteiga sem Sal",no:"Usaltet Smør",sv:"Osaltat Smör",da:"Usaltet Smør",fi:"Suolaton Voi",nl:"Ongezouten Boter",lv:"Nesālsvajsviests",et:"Soolamata Või",lt:"Nesūrus Sviestas"}, marka:"", kal:717, pro:0.9, karb:0.1, yag:81, lif:0, sod:11, por:10, kat:"Breakfast", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:4.5, icerik:"inek sütü", katkiMaddeleri:[] },
{ ad:"Çikolata Fındık Kreması (Generic)", adler:{tr:"Çikolata Fındık Kreması",de:"Schoko-Nuss-Creme",el:"Κρέμα Σοκολάτας Φουντουκιού",hu:"Csokoládé Mogyorókrém",pl:"Krem Czekoladowo-Orzechowy",cs:"Čokoládovo-Oříšková Pomazánka",ro:"Cremă de Ciocolată cu Alune",hr:"Krema od Čokolade i Lješnjaka",fr:"Pâte à Tartiner Chocolat Noisette",es:"Crema de Cacao con Avellanas",it:"Crema di Cioccolato e Nocciole",pt:"Creme de Chocolate com Avelãs",no:"Sjokolade Nøttekrem",sv:"Choklad Nötkräm",da:"Chokolade Nøddecreme",fi:"Suklaa Pähkinätahna",nl:"Chocolade Hazelnootpasta",lv:"Šokolādes Riekstu Krēms",et:"Šokolaadi Pähklikreem",lt:"Šokolado Lazdynų Kremas"}, marka:"", kal:541, pro:6.3, karb:57, yag:31, lif:2.5, sod:55, por:30, kat:"Breakfast", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:25, aclikSuresi:"1 saatten az", onay:true, yildiz:2, icerik:"şeker, bitkisel yağ, fındık, kakao, yağsız süt tozu, E322", katkiMaddeleri:[{kod:"E322",ad:"Lecithins",tehlikeli:false,aciklama:"Emulsifier."}] },

// ══════════════════════════════════════════════════════
// BAKLİYAT ÇEŞİTLERİ
// ══════════════════════════════════════════════════════
{ ad:"Yeşil Mercimek", adler:{tr:"Yeşil Mercimek",de:"Grüne Linsen",el:"Πράσινες Φακές",hu:"Zöld Lencse",pl:"Zielona Soczewica",cs:"Zelená Čočka",ro:"Linte Verde",hr:"Zelena Leća",fr:"Lentilles Vertes",es:"Lentejas Verdes",it:"Lenticchie Verdi",pt:"Lentilhas Verdes",no:"Grønne Linser",sv:"Gröna Linser",da:"Grønne Linser",fi:"Vihreät Linssit",nl:"Groene Linzen",lv:"Zaļās Lēcas",et:"Rohelised Läätsed",lt:"Žalieji Lęšiai"}, kal:116, pro:9, karb:20, yag:0.4, lif:7.9, sod:2, por:100, kat:"Legume", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"yeşil mercimek", katkiMaddeleri:[] },
{ ad:"Siyah Mercimek (Beluga)", adler:{tr:"Siyah Mercimek",de:"Schwarze Linsen",el:"Μαύρες Φακές",hu:"Fekete Lencse",pl:"Czarna Soczewica",cs:"Černá Čočka",ro:"Linte Neagră",hr:"Crna Leća",fr:"Lentilles Noires",es:"Lentejas Negras",it:"Lenticchie Nere",pt:"Lentilhas Pretas",no:"Svarte Linser",sv:"Svarta Linser",da:"Sorte Linser",fi:"Mustat Linssit",nl:"Zwarte Linzen",lv:"Melnās Lēcas",et:"Mustad Läätsed",lt:"Juodieji Lęšiai"}, kal:116, pro:9, karb:20, yag:0.4, lif:7.9, sod:2, por:100, kat:"Legume", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"siyah mercimek", katkiMaddeleri:[] },
{ ad:"Sarı Mercimek (Yarım)", adler:{tr:"Sarı Mercimek",de:"Gelbe Schälerbsen",el:"Κίτρινες Φακές",hu:"Sárga Lencse",pl:"Żółta Soczewica",cs:"Žlutý Hrách",ro:"Linte Galbenă",hr:"Žuta Leća",fr:"Lentilles Jaunes",es:"Lentejas Amarillas",it:"Lenticchie Gialle",pt:"Lentilhas Amarelas",no:"Gule Linser",sv:"Gula Linser",da:"Gule Linser",fi:"Keltaiset Linssit",nl:"Gele Linzen",lv:"Dzeltenās Lēcas",et:"Kollased Läätsed",lt:"Geltonieji Lęšiai"}, kal:116, pro:9, karb:20, yag:0.4, lif:7.9, sod:2, por:100, kat:"Legume", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"sarı mercimek", katkiMaddeleri:[] },
{ ad:"Kuru Fasulye (Siyah)", adler:{tr:"Siyah Fasulye",de:"Schwarze Bohnen",el:"Μαύρα Φασόλια",hu:"Fekete Bab",pl:"Czarny Fasola",cs:"Černé Fazole",ro:"Fasole Neagră",hr:"Crni Grah",fr:"Haricots Noirs",es:"Frijoles Negros",it:"Fagioli Neri",pt:"Feijão Preto",no:"Svarte Bønner",sv:"Svarta Bönor",da:"Sorte Bønner",fi:"Mustat Pavut",nl:"Zwarte Bonen",lv:"Melnās Pupiņas",et:"Mustad Oad",lt:"Juodieji Pupelės"}, kal:132, pro:8.9, karb:24, yag:0.5, lif:8.7, sod:1, por:100, kat:"Legume", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"siyah fasulye", katkiMaddeleri:[] },
{ ad:"Kuru Fasulye (Borlotti)", adler:{tr:"Borlotti Fasulye",de:"Borlotti Bohnen",el:"Φασόλια Μποτλότι",hu:"Borlotti Bab",pl:"Fasola Borlotti",cs:"Borlotti Fazole",ro:"Fasole Borlotti",hr:"Borlotti Grah",fr:"Haricots Borlotti",es:"Alubias Borlotti",it:"Fagioli Borlotti",pt:"Feijão Borlotti",no:"Borlotti Bønner",sv:"Borlottibönor",da:"Borlotti Bønner",fi:"Borlottipavut",nl:"Borlotti Bonen",lv:"Borlotti Pupiņas",et:"Borlotti Oad",lt:"Borlotti Pupelės"}, kal:110, pro:7.6, karb:20, yag:0.4, lif:5.5, sod:2, por:100, kat:"Legume", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:68, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"borlotti fasulye", katkiMaddeleri:[] },
{ ad:"Kuru Fasulye (Beyaz Pinto)", adler:{tr:"Pinto Fasulye",de:"Pinto Bohnen",el:"Φασόλια Πίντο",hu:"Pinto Bab",pl:"Fasola Pinto",cs:"Pinto Fazole",ro:"Fasole Pinto",hr:"Pinto Grah",fr:"Haricots Pinto",es:"Alubias Pintas",it:"Fagioli Pinto",pt:"Feijão Pinto",no:"Pinto Bønner",sv:"Pintobönor",da:"Pinto Bønner",fi:"Pintopavut",nl:"Pinto Bonen",lv:"Pinto Pupiņas",et:"Pinto Oad",lt:"Pinto Pupelės"}, kal:143, pro:9, karb:26, yag:0.5, lif:9, sod:1, por:100, kat:"Legume", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"pinto fasulye", katkiMaddeleri:[] },
{ ad:"Bakla (Geniş Fasulye)", adler:{tr:"Bakla",de:"Saubohnen",el:"Κουκιά",hu:"Lóbab",pl:"Bób",cs:"Fava",ro:"Bob",hr:"Bob",fr:"Fèves",es:"Habas",it:"Fave",pt:"Favas",no:"Bondebønner",sv:"Bondbönor",da:"Hestebønner",fi:"Härkäpapu",nl:"Tuinbonen",lv:"Cūku Pupas",et:"Põldoad",lt:"Puplainai"}, kal:88, pro:7.6, karb:14, yag:0.4, lif:5.4, sod:13, por:100, kat:"Legume", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"bakla", katkiMaddeleri:[] },
{ ad:"Yeşil Soya Fasulyesi (Taze Edamame)", adler:{tr:"Edamame",de:"Edamame",el:"Εντάμαμε",hu:"Edamame",pl:"Edamame",cs:"Edamame",ro:"Edamame",hr:"Edamame",fr:"Edamame",es:"Edamame",it:"Edamame",pt:"Edamame",no:"Edamame",sv:"Edamame",da:"Edamame",fi:"Edamame",nl:"Edamame",lv:"Edamame",et:"Edamame",lt:"Edamame"}, kal:122, pro:11, karb:9.9, yag:5.2, lif:5.2, sod:6, por:100, kat:"Legume", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"yeşil soya fasulyesi", katkiMaddeleri:[] },
{ ad:"Lupinus (Acı Bakla)", adler:{tr:"Acı Bakla",de:"Lupinen",el:"Λούπινα",hu:"Lupine",pl:"Łubin",cs:"Lupiny",ro:"Lupin",hr:"Lupini",fr:"Lupins",es:"Altramuces",it:"Lupini",pt:"Tremoços",no:"Lupiner",sv:"Lupiner",da:"Lupiner",fi:"Lupiinit",nl:"Lupinebonen",lv:"Lupīnas",et:"Lupiin",lt:"Lubinai"}, kal:119, pro:14.5, karb:9.8, yag:3, lif:5, sod:360, por:50, kat:"Legume", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"tuzlu bakla, su, tuz", katkiMaddeleri:[] },
// ── TR özgü bakliyat ──
{ ad:"Mercimek Çorbası (Sarı)", kal:88, pro:5, karb:14, yag:2, lif:4, sod:480, por:250, kat:"Çorba", ulke:"tr", tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"sarı mercimek, soğan, tuz, tereyağı, nane", katkiMaddeleri:[] },
{ ad:"Nohut Yahnisi", kal:145, pro:7, karb:20, yag:5, lif:6, sod:380, por:200, kat:"Baklagil", ulke:"tr", tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"nohut, soğan, domates, zeytinyağı, baharat", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// FAST FOOD
// ══════════════════════════════════════════════════════
{ ad:"Cheeseburger", adler:{tr:"Cheeseburger",de:"Cheeseburger",el:"Τσίζμπεργκερ",hu:"Sajtburger",pl:"Cheeseburger",cs:"Cheeseburger",ro:"Cheeseburger",hr:"Cheeseburger",fr:"Cheeseburger",es:"Cheeseburger",it:"Cheeseburger",pt:"Cheeseburger",no:"Cheeseburger",sv:"Cheeseburger",da:"Cheeseburger",fi:"Juustoburger",nl:"Cheeseburger",lv:"Čīzburgeris",et:"Cheeseburger",lt:"Čysbogeris"}, marka:"McDonald's", kal:303, pro:15, karb:33, yag:12, lif:2, sod:750, por:113, kat:"FastFood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:40, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"burger, peynir, bun, hardal, ketçap, soğan, salatalık, E471, E450", katkiMaddeleri:[{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E450",ad:"Diphosphates",tehlikeli:false,aciklama:"Stabilizer."}] },
{ ad:"Double Whopper", adler:{tr:"Double Whopper",de:"Double Whopper",el:"Ντάμπλ Γουόπερ",hu:"Double Whopper",pl:"Double Whopper",cs:"Double Whopper",ro:"Double Whopper",hr:"Double Whopper",fr:"Double Whopper",es:"Doble Whopper",it:"Double Whopper",pt:"Double Whopper",no:"Double Whopper",sv:"Double Whopper",da:"Double Whopper",fi:"Double Whopper",nl:"Double Whopper",lv:"Dubultais Vūpers",et:"Topelt Whopper",lt:"Dvigubas Vūperis"}, marka:"Burger King", kal:726, pro:48, karb:50, yag:40, lif:3, sod:1025, por:295, kat:"FastFood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:2, icerik:"dana eti, ekmek, salata, domates, soğan, ketçap, mayonez, E471", katkiMaddeleri:[{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."}] },
{ ad:"Patates Kızartması (Fast Food)", adler:{tr:"Fast Food Patates",de:"Pommes Frites",el:"Πατάτες Τηγανητές",hu:"Sült Krumpli",pl:"Frytki Fast Food",cs:"Hranolky Fast Food",ro:"Cartofi Prăjiți Fast Food",hr:"Pomfrit Fast Food",fr:"Frites Fast Food",es:"Patatas Fritas Fast Food",it:"Patatine Fritte Fast Food",pt:"Batatas Fritas Fast Food",no:"Pommes Frites",sv:"Pommes Frites",da:"Pommes Frites",fi:"Ranskalaiset Fast Food",nl:"Friet Fast Food",lv:"Frī Kartupeļi",et:"Friikartulid",lt:"Kepto Bulvytės"}, marka:"", kal:312, pro:3.4, karb:41, yag:15, lif:3.8, sod:480, por:115, kat:"FastFood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"patates, bitkisel yağ, tuz, E450, E621", katkiMaddeleri:[{kod:"E450",ad:"Diphosphates",tehlikeli:false,aciklama:"Stabilizer."},{kod:"E621",ad:"Monosodium glutamate",tehlikeli:false,aciklama:"Flavour enhancer."}] },
{ ad:"Tavuk Nugget", adler:{tr:"Tavuk Nugget",de:"Chicken Nuggets",el:"Τσικέν Νάγκετς",hu:"Csirkenuggetek",pl:"Nuggetsy Kurczak",cs:"Kuřecí Nugety",ro:"Nuggets de Pui",hr:"Pileći Nugetići",fr:"Nuggets de Poulet",es:"Nuggets de Pollo",it:"Nugget di Pollo",pt:"Nuggets de Frango",no:"Kyllingnuggets",sv:"Kycklingnuggets",da:"Kyllingnuggets",fi:"Kananuggetit",nl:"Kipnuggets",lv:"Vistas Neugeti",et:"Kananugetid",lt:"Vištienos Sparneliai"}, marka:"", kal:295, pro:15, karb:18, yag:18, lif:1, sod:680, por:100, kat:"FastFood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"tavuk, un, ekmek kırıntısı, bitkisel yağ, tuz, E450, E471", katkiMaddeleri:[{kod:"E450",ad:"Diphosphates",tehlikeli:false,aciklama:"Stabilizer."},{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."}] },
{ ad:"Pizza Slice (Pepperoni)", adler:{tr:"Pepperoni Pizza Dilimi",de:"Pepperoni Pizza Stück",el:"Πίτσα Πεπερόνι",hu:"Pepperoni Pizza Szelet",pl:"Pizza Pepperoni Kawałek",cs:"Pepperoni Pizza Kousek",ro:"Felie Pepperoni Pizza",hr:"Kriška Pepperoni Pizze",fr:"Part de Pizza Pepperoni",es:"Porción Pizza Pepperoni",it:"Fetta Pizza Pepperoni",pt:"Fatia Pizza Pepperoni",no:"Pizza Skive Pepperoni",sv:"Pizzaskiva Pepperoni",da:"Pizzaskive Pepperoni",fi:"Pizzapala Pepperoni",nl:"Pizza Punt Pepperoni",lv:"Picas Šķēle Pepperoni",et:"Pitsakiilu Pepperoni",lt:"Picos Gabalėlis Pepperoni"}, marka:"", kal:285, pro:12, karb:32, yag:12, lif:2, sod:680, por:120, kat:"FastFood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:2.5, icerik:"hamur, domates sosu, mozzarella, pepperoni, E250, E471", katkiMaddeleri:[{kod:"E250",ad:"Sodium nitrite",tehlikeli:true,aciklama:"In high amounts may be carcinogenic."},{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."}] },
{ ad:"Wrap (Tavuklu)", adler:{tr:"Tavuklu Wrap",de:"Hähnchen Wrap",el:"Σνακ Κοτόπουλο",hu:"Csirke Wrap",pl:"Wrap z Kurczakiem",cs:"Kuřecí Wrap",ro:"Wrap cu Pui",hr:"Pileći Wrap",fr:"Wrap au Poulet",es:"Wrap de Pollo",it:"Wrap al Pollo",pt:"Wrap de Frango",no:"Kylling Wrap",sv:"Kyckling Wrap",da:"Kylling Wrap",fi:"Kana Wrap",nl:"Kip Wrap",lv:"Vistas Rullītis",et:"Kana Wrap",lt:"Vištienos Suktinukas"}, marka:"", kal:285, pro:20, karb:28, yag:11, lif:3, sod:680, por:180, kat:"FastFood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:50, aclikSuresi:"2-3 saat", onay:true, yildiz:3, icerik:"tortilla, tavuk, salata, domates, sos, E471, E450", katkiMaddeleri:[{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E450",ad:"Diphosphates",tehlikeli:false,aciklama:"Stabilizer."}] },
{ ad:"Hot Dog", adler:{tr:"Hot Dog",de:"Hot Dog",el:"Χοτ Ντογκ",hu:"Hot Dog",pl:"Hot Dog",cs:"Hot Dog",ro:"Hot Dog",hr:"Hot Dog",fr:"Hot Dog",es:"Perrito Caliente",it:"Hot Dog",pt:"Cachorro Quente",no:"Hot Dog",sv:"Hot Dog",da:"Hot Dog",fi:"Hot Dog",nl:"Hot Dog",lv:"Hotdogs",et:"Hot Dog",lt:"Dešrelė su Keptuku"}, marka:"", kal:265, pro:10, karb:22, yag:15, lif:1.5, sod:780, por:130, kat:"FastFood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:38, aclikSuresi:"1-2 saat", onay:true, yildiz:2, icerik:"sosis, ekmek, hardal, ketçap, soğan, E250, E451", katkiMaddeleri:[{kod:"E250",ad:"Sodium nitrite",tehlikeli:true,aciklama:"In high amounts may be carcinogenic."},{kod:"E451",ad:"Triphosphates",tehlikeli:false,aciklama:"Moisture retainer."}] },
{ ad:"Falafel Wrap", adler:{tr:"Falafel Dürüm",de:"Falafel Wrap",el:"Φαλάφελ Σνακ",hu:"Falafel Wrap",pl:"Falafel Wrap",cs:"Falafel Wrap",ro:"Falafel Wrap",hr:"Falafel Wrap",fr:"Wrap Falafel",es:"Wrap de Falafel",it:"Pita con Falafel",pt:"Wrap de Falafel",no:"Falafel Wrap",sv:"Falafel Wrap",da:"Falafel Wrap",fi:"Falafel Wrap",nl:"Falafelwrap",lv:"Falafel Rullītis",et:"Falafel Wrap",lt:"Falafelio Suktinukas"}, marka:"", kal:295, pro:11, karb:38, yag:12, lif:5.5, sod:680, por:180, kat:"FastFood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"falafel, pita/tortilla, hümüs, tarator, salata", katkiMaddeleri:[] },
// ── TR fast food ──
{ ad:"İskender (Fast Food)", kal:445, pro:26, karb:32, yag:24, lif:2, sod:680, por:300, kat:"Fast Food", ulke:"tr", tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"döner eti, pide, domates sosu, yoğurt, tereyağı", katkiMaddeleri:[] },
{ ad:"Lahmacun Dürüm", kal:295, pro:14, karb:42, yag:9, lif:3, sod:580, por:150, kat:"Fast Food", ulke:"tr", tokPuan:52, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"lahmacun, salata, limon, maydanoz, nar ekşisi", katkiMaddeleri:[] },
{ ad:"Kumpir", kal:395, pro:10, karb:52, yag:18, lif:5, sod:680, por:400, kat:"Fast Food", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"büyük patates, tereyağı, kaşar, mısır, turşu, sosis, iç malzeme", katkiMaddeleri:[] },
{ ad:"Balık Ekmek (Boğaz)", kal:365, pro:22, karb:34, yag:15, lif:2.5, sod:780, por:250, kat:"Fast Food", ulke:"tr", tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"balık, ekmek, soğan, biber, maydanoz, zeytinyağı", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// BEBEK / ÇOCUK GIDALARI
// ══════════════════════════════════════════════════════
{ ad:"Bebek Maması (Pirinç)", adler:{tr:"Pirinç Bebek Maması",de:"Reisbrei Baby",el:"Βρεφική Κρέμα Ρυζιού",hu:"Rizspép Bébiétel",pl:"Kasza Ryżowa dla Niemowląt",cs:"Rýžová Kaše pro Miminka",ro:"Terci de Orez pentru Bebeluși",hr:"Rižina Kašica za Bebe",fr:"Bouillie de Riz pour Bébé",es:"Papilla de Arroz para Bebé",it:"Pappa di Riso per Neonati",pt:"Papinha de Arroz para Bebé",no:"Risblandingsbrem for Baby",sv:"Risvälling",da:"Risengrød for Babyer",fi:"Riisipuuro Vauvalle",nl:"Rijstepap Baby",lv:"Rīsu Biezputra Bērniem",et:"Riisipuder Imikutele",lt:"Ryžių Košė Kūdikiams"}, marka:"Hipp", kal:65, pro:1.5, karb:12, yag:1, lif:0.5, sod:18, por:100, kat:"Baby", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"pirinç, bebek sütü/su, E306", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Bebek Maması (Sebzeli)", adler:{tr:"Sebzeli Bebek Maması",de:"Gemüsebrei Baby",el:"Βρεφικό Βαζάκι Λαχανικών",hu:"Zöldséges Bébiétel",pl:"Papka Warzywna dla Niemowląt",cs:"Zeleninový Příkrm pro Miminka",ro:"Piure de Legume pentru Bebeluși",hr:"Pire od Povrća za Bebe",fr:"Petits Pots Légumes Bébé",es:"Potito de Verduras para Bebé",it:"Omogeneizzato Verdure",pt:"Puré de Legumes para Bebé",no:"Grønnsakspuré for Baby",sv:"Grönsaksmos för Baby",da:"Grøntsagspuré for Babyer",fi:"Kasvismuusi Vauvalle",nl:"Groentepuree Baby",lv:"Dārzeņu Biezputra Bērniem",et:"Köögiviljapuder Imikutele",lt:"Daržovių Tyrė Kūdikiams"}, marka:"Hipp", kal:42, pro:1.5, karb:8, yag:0.5, lif:1.5, sod:22, por:100, kat:"Baby", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"karışık sebze, su, nişasta, E306", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Bebek Maması (Meyveli)", adler:{tr:"Meyveli Bebek Maması",de:"Fruchtbrei Baby",el:"Βρεφικό Βαζάκι Φρούτων",hu:"Gyümölcspép Bébiétel",pl:"Papka Owocowa dla Niemowląt",cs:"Ovocný Příkrm pro Miminka",ro:"Piure de Fructe pentru Bebeluși",hr:"Pire od Voća za Bebe",fr:"Petits Pots Fruits Bébé",es:"Potito de Frutas para Bebé",it:"Omogeneizzato Frutta",pt:"Puré de Frutas para Bebé",no:"Fruktpuré for Baby",sv:"Fruktmos för Baby",da:"Frugtpuré for Babyer",fi:"Hedelmämuusi Vauvalle",nl:"Fruitpuree Baby",lv:"Augļu Biezputra Bērniem",et:"Puuviljapuder Imikutele",lt:"Vaisių Tyrė Kūdikiams"}, marka:"Hipp", kal:58, pro:0.5, karb:13, yag:0.2, lif:1.2, sod:5, por:100, kat:"Baby", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:28, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"karışık meyve, su, pirinç nişastası, E306, E300", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."},{kod:"E300",ad:"Ascorbic acid",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Bebek Bisküvisi", adler:{tr:"Bebek Bisküvisi",de:"Kinderkekse",el:"Βρεφικά Μπισκότα",hu:"Bébi Keksz",pl:"Herbatniki dla Niemowląt",cs:"Dětské Sušenky",ro:"Biscuiți pentru Bebeluși",hr:"Dječji Keksi za Bebe",fr:"Biscuits Bébé",es:"Galletas para Bebé",it:"Biscotti per Neonati",pt:"Bolachas para Bebé",no:"Babykjeks",sv:"Bebiskex",da:"Babykiks",fi:"Vauvan Keksit",nl:"Babykoekie",lv:"Bērnu Cepumi",et:"Beebiküpsised",lt:"Kūdikių Sausainiai"}, marka:"Hipp", kal:398, pro:8, karb:70, yag:10, lif:3, sod:45, por:20, kat:"Baby", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:28, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"buğday unu, şeker, bitkisel yağ, malt, E306", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Çocuk Yoğurdu (Meyveli)", adler:{tr:"Çocuk Yoğurdu",de:"Kinderjoghurt",el:"Παιδικό Γιαούρτι",hu:"Gyerek Joghurt",pl:"Jogurt Dziecięcy",cs:"Dětský Jogurt",ro:"Iaurt pentru Copii",hr:"Dječji Jogurt",fr:"Yaourt Enfant",es:"Yogur para Niños",it:"Yogurt per Bambini",pt:"Iogurte para Crianças",no:"Barneyoghurt",sv:"Barnjoghurt",da:"Børneyoghurt",fi:"Lasten Jogurtti",nl:"Kinderyoghurt",lv:"Bērnu Jogurts",et:"Lastejogurt",lt:"Vaikiškas Jogurtas"}, marka:"Danone", kal:88, pro:4, karb:13, yag:2.5, lif:0, sod:46, por:100, kat:"Baby", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"süt, meyve, şeker, kültürler, E440, E330", katkiMaddeleri:[{kod:"E440",ad:"Pectin",tehlikeli:false,aciklama:"Gelling agent."},{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."}] },
{ ad:"Bebek Devam Sütü (2. Yaş)", adler:{tr:"Devam Sütü",de:"Folgenahrung",el:"Δεύτερη Βρεφική Φόρμουλα",hu:"Anyatejpótló",pl:"Mleko Następne",cs:"Pokračovací Mléko",ro:"Lapte de Continuare",hr:"Nastavna Hrana za Dojenčad",fr:"Lait de Suite",es:"Leche de Continuación",it:"Latte di Proseguimento",pt:"Leite de Continuação",no:"Oppfølgingsmelk",sv:"Följjmjölk",da:"Tilskudsmælk",fi:"Jatkomaito",nl:"Opvolgmelk",lv:"Turpmāk Barojošais Maisījums",et:"Jätkupiimasegu",lt:"Tolesnio Maitinimo Pienas"}, marka:"Aptamil", kal:66, pro:2.1, karb:8.3, yag:2.9, lif:0, sod:30, por:100, kat:"Baby", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"laktoz, bitkisel yağ, peynir altı suyu, DHA, ARA, demir, E306, E300", katkiMaddeleri:[{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."},{kod:"E300",ad:"Ascorbic acid",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Çocuk Makarnası", adler:{tr:"Çocuk Makarnası",de:"Kindernudeln",el:"Μακαρόνια για Παιδιά",hu:"Gyerek Tészta",pl:"Makaron dla Dzieci",cs:"Dětské Těstoviny",ro:"Paste pentru Copii",hr:"Dječja Tjestenina",fr:"Pâtes Enfants",es:"Pasta para Niños",it:"Pasta per Bambini",pt:"Massa para Crianças",no:"Barnenudler",sv:"Barnnudlar",da:"Børnenudler",fi:"Lastenmakaronit",nl:"Kinderpasta",lv:"Bērnu Makaroni",et:"Lastemakaron",lt:"Vaikiškas Makaronai"}, marka:"Barilla", kal:353, pro:12, karb:71, yag:1.5, lif:2.7, sod:3, por:50, kat:"Baby", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:48, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"durum buğday irmik, su", katkiMaddeleri:[] },
{ ad:"Çocuk Meyve Suyu Kutusu", adler:{tr:"Çocuk Meyve Suyu",de:"Kindersaft",el:"Παιδικός Χυμός",hu:"Gyerek Gyümölcslé",pl:"Sok dla Dzieci",cs:"Dětský Džus",ro:"Suc de Fructe pentru Copii",hr:"Dječji Voćni Sok",fr:"Jus de Fruits Enfants",es:"Zumo Infantil",it:"Succo di Frutta per Bambini",pt:"Sumo para Crianças",no:"Barnesaft",sv:"Barnjuice",da:"Børnejuice",fi:"Lasten Mehu",nl:"Kindersap",lv:"Bērnu Augļu Sula",et:"Lastemahlakarbike",lt:"Vaikų Vaisių Sultys"}, marka:"", kal:42, pro:0.3, karb:10, yag:0, lif:0.2, sod:3, por:200, kat:"Baby", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:18, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"meyve suyu, su, E330, E300", katkiMaddeleri:[{kod:"E330",ad:"Citric acid",tehlikeli:false,aciklama:"Acidity regulator."},{kod:"E300",ad:"Ascorbic acid",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Bebek Püresi (Havuç-Patates)", adler:{tr:"Havuç-Patates Püresi",de:"Möhren-Kartoffelpüree Baby",el:"Πουρές Καρότου-Πατάτας για Μωρά",hu:"Sárgarépa-Burgonyapüré Bébiétel",pl:"Puree Marchewka-Ziemniaki dla Niemowląt",cs:"Mrkvovo-Bramborová Kaše pro Miminka",ro:"Piure Morcov-Cartofi pentru Bebeluși",hr:"Pire Mrkva-Krumpir za Bebe",fr:"Purée Carotte-Pomme de Terre Bébé",es:"Puré Zanahoria-Patata para Bebé",it:"Passato Carota-Patata per Neonati",pt:"Puré Cenoura-Batata para Bebé",no:"Gulrot-Potetpuré for Baby",sv:"Morot-Potatismos för Baby",da:"Gulerod-Kartoffelpuré for Babyer",fi:"Porkkana-Perunamuusi Vauvalle",nl:"Wortel-Aardappelpuree Baby",lv:"Burkānu-Kartupeļu Biezputra Bērniem",et:"Porgandi-Kartulipuder Imikutele",lt:"Morkų-Bulvių Tyrė Kūdikiams"}, marka:"Gerber", kal:48, pro:1.2, karb:10, yag:0.3, lif:1.5, sod:18, por:100, kat:"Baby", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"havuç, patates, su, nişasta", katkiMaddeleri:[] },
// ── Türk bebek gıdaları ──
{ ad:"Bebek Maması (Pirinç-Sütlü, TR)", kal:72, pro:2, karb:13, yag:1.5, lif:0.5, sod:18, por:100, kat:"Bebek", ulke:"tr", tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"pirinç unu, süt tozu, şeker, E306, E300", katkiMaddeleri:[{kod:"E306",ad:"Tokoferoller",tehlikeli:false,aciklama:"Antioksidan."},{kod:"E300",ad:"Askorbik asit",tehlikeli:false,aciklama:"Antioksidan."}] },
{ ad:"Çocuk Atıştırmalık (Meyve Cipsi)", kal:342, pro:2, karb:82, yag:0.5, lif:5, sod:15, por:15, kat:"Bebek", ulke:"tr", tokPuan:42, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"dondurarak kurutulmuş meyve", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// DENİZ ÜRÜNLERİ ÇEŞİTLERİ
// ══════════════════════════════════════════════════════
{ ad:"Karides (Çiğ, Soyulmuş)", adler:{tr:"Çiğ Karides",de:"Rohe Garnelen",el:"Ωμές Γαρίδες",hu:"Nyers Garnéla",pl:"Surowe Krewetki",cs:"Syrové Krevety",ro:"Creveți Cruzi",hr:"Sirove Kozice",fr:"Crevettes Crues",es:"Gambas Crudas",it:"Gamberi Crudi",pt:"Camarões Crus",no:"Rå Reker",sv:"Råa Räkor",da:"Rå Rejer",fi:"Raa'at Katkaravut",nl:"Rauwe Garnalen",lv:"Neapstrādātas Garneles",et:"Toored Krevetid",lt:"Žalios Krevetės"}, kal:82, pro:16, karb:0.5, yag:1.5, lif:0, sod:65, por:100, kat:"Seafood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"karides", katkiMaddeleri:[] },
{ ad:"Kalamar (Taze)", adler:{tr:"Kalamar",de:"Tintenfisch",el:"Καλαμάρι",hu:"Tintahal",pl:"Kałamarnica",cs:"Kalamáry",ro:"Calmari",hr:"Lignja",fr:"Calamar",es:"Calamar",it:"Calamaro",pt:"Lula",no:"Blekksprut",sv:"Bläckfisk",da:"Blæksprutte",fi:"Kalmari",nl:"Inktvis",lv:"Kalmārs",et:"Kalmaar",lt:"Kalmaras"}, kal:92, pro:15.6, karb:3.1, yag:1.4, lif:0, sod:44, por:100, kat:"Seafood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"kalamar", katkiMaddeleri:[] },
{ ad:"Midye (Taze)", adler:{tr:"Taze Midye",de:"Frische Muscheln",el:"Μύδια Φρέσκα",hu:"Friss Kagyló",pl:"Świeże Małże",cs:"Čerstvé Slávky",ro:"Midii Proaspete",hr:"Svježe Dagnje",fr:"Moules Fraîches",es:"Mejillones Frescos",it:"Cozze Fresche",pt:"Mexilhões Frescos",no:"Ferske Blåskjell",sv:"Färska Blåmusslor",da:"Friske Muslinger",fi:"Tuoreet Sinisimpukat",nl:"Verse Mosselen",lv:"Svaigi Gliemži",et:"Värsked Rannakarbid",lt:"Švieži Midijos"}, kal:86, pro:12, karb:4, yag:2.2, lif:0, sod:280, por:200, kat:"Seafood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"midye", katkiMaddeleri:[] },
{ ad:"Istiridye", adler:{tr:"İstiridye",de:"Auster",el:"Στρείδι",hu:"Osztriga",pl:"Ostryga",cs:"Ústřice",ro:"Stridie",hr:"Kamenica",fr:"Huître",es:"Ostra",it:"Ostrica",pt:"Ostra",no:"Østers",sv:"Ostron",da:"Østers",fi:"Osteri",nl:"Oester",lv:"Austere",et:"Auster",lt:"Austė"}, kal:69, pro:9, karb:3.9, yag:2, lif:0, sod:380, por:100, kat:"Seafood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"istiridye", katkiMaddeleri:[] },
{ ad:"Yengeç (Taze)", adler:{tr:"Yengeç",de:"Krabbe",el:"Καβούρι",hu:"Rák",pl:"Krab",cs:"Krab",ro:"Crab",hr:"Rak",fr:"Crabe",es:"Cangrejo",it:"Granchio",pt:"Caranguejo",no:"Krabbe",sv:"Krabba",da:"Krabbe",fi:"Rapu",nl:"Krab",lv:"Krabis",et:"Krabi",lt:"Krabas"}, kal:87, pro:18, karb:0, yag:1.5, lif:0, sod:295, por:100, kat:"Seafood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"yengeç", katkiMaddeleri:[] },
{ ad:"Istakoz", adler:{tr:"Istakoz",de:"Hummer",el:"Αστακός",hu:"Homár",pl:"Homar",cs:"Humr",ro:"Homar",hr:"Jastog",fr:"Homard",es:"Langosta",it:"Aragosta",pt:"Lagosta",no:"Hummer",sv:"Hummer",da:"Hummer",fi:"Hummeri",nl:"Kreeft",lv:"Omārs",et:"Homaar",lt:"Omaras"}, kal:89, pro:19, karb:0, yag:1.2, lif:0, sod:296, por:100, kat:"Seafood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ıstakoz", katkiMaddeleri:[] },
{ ad:"Ahtapot (Taze)", adler:{tr:"Ahtapot",de:"Oktopus",el:"Χταπόδι",hu:"Polip",pl:"Ośmiornica",cs:"Chobotnice",ro:"Caracatiță",hr:"Hobotnica",fr:"Poulpe",es:"Pulpo",it:"Polpo",pt:"Polvo",no:"Blekksprut",sv:"Bläckfisk",da:"Blæksprutte",fi:"Mustekala",nl:"Octopus",lv:"Astoņkājis",et:"Kaheksajalg",lt:"Aštuonkojis"}, kal:82, pro:15, karb:2.2, yag:1, lif:0, sod:230, por:100, kat:"Seafood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"ahtapot", katkiMaddeleri:[] },
{ ad:"Somon Havyarı (Kırmızı)", adler:{tr:"Kırmızı Havyar",de:"Lachskaviar",el:"Κόκκινο Χαβιάρι",hu:"Lazackaviar",pl:"Kawior Łososiowy",cs:"Lososí Kaviar",ro:"Icre de Somon",hr:"Kavijar od Lososa",fr:"Oeufs de Saumon",es:"Huevas de Salmón",it:"Uova di Salmone",pt:"Ovas de Salmão",no:"Rognkaviar",sv:"Laxkaviar",da:"Laksekaviar",fi:"Lohenmäti",nl:"Zalmkuit",lv:"Laša Ikri",et:"Lõhemari",lt:"Lašišų Ikrai"}, kal:265, pro:28, karb:3.9, yag:16, lif:0, sod:1500, por:30, kat:"Seafood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"somon yumurtası, tuz", katkiMaddeleri:[] },
{ ad:"Karides Kokteyli (Hazır)", adler:{tr:"Hazır Karides Kokteyli",de:"Cocktailgarnelen",el:"Κοκτέιλ Γαρίδες",hu:"Koktélgarnéla",pl:"Koktajlowe Krewetki",cs:"Koktejlové Krevety",ro:"Creveți Cocktail",hr:"Koktajl Kozice",fr:"Crevettes Cocktail",es:"Gambas Cocktail",it:"Gamberi Cocktail",pt:"Camarões Cocktail",no:"Cocktailreker",sv:"Cocktailräkor",da:"Cocktailrejer",fi:"Cocktailkatkaravut",nl:"Cocktailgarnalen",lv:"Kokteiļa Garneles",et:"Kokteilkrevetid",lt:"Kokteilių Krevetės"}, kal:82, pro:16, karb:0.5, yag:1.5, lif:0, sod:320, por:100, kat:"Seafood", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:4, icerik:"karides, su, tuz, E220", katkiMaddeleri:[{kod:"E220",ad:"Sulphur dioxide",tehlikeli:true,aciklama:"May cause allergic reactions."}] },

// ══════════════════════════════════════════════════════
// MANTAR ÇEŞİTLERİ
// ══════════════════════════════════════════════════════
{ ad:"Portobello Mantar", adler:{tr:"Portobello Mantar",de:"Portobello Pilz",el:"Μανιτάρι Πορτομπέλο",hu:"Portobello Gomba",pl:"Grzyb Portobello",cs:"Houby Portobello",ro:"Ciupercă Portobello",hr:"Portobello Gljiva",fr:"Champignon Portobello",es:"Champiñón Portobello",it:"Fungo Portobello",pt:"Cogumelo Portobello",no:"Portobello Sopp",sv:"Portobellosvamp",da:"Portobello Svamp",fi:"Portobello Sieni",nl:"Portobello Champignon",lv:"Portobello Sēne",et:"Portobello Seen",lt:"Portobello Grybas"}, kal:22, pro:2.1, karb:3.9, yag:0.3, lif:1.3, sod:5, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"portobello mantar", katkiMaddeleri:[] },
{ ad:"Shiitake Mantar", adler:{tr:"Shiitake Mantar",de:"Shiitake Pilz",el:"Μανιτάρι Σιτάκε",hu:"Shiitake Gomba",pl:"Grzyb Shiitake",cs:"Houby Shiitake",ro:"Ciupercă Shiitake",hr:"Šiitake Gljiva",fr:"Champignon Shiitake",es:"Seta Shiitake",it:"Fungo Shiitake",pt:"Cogumelo Shiitake",no:"Shiitake Sopp",sv:"Shiitakesvamp",da:"Shiitake Svamp",fi:"Shiitakesieni",nl:"Shiitake Paddenstoel",lv:"Šiitake Sēne",et:"Šiitake Seen",lt:"Šiitake Grybas"}, kal:39, pro:2.2, karb:6.8, yag:0.5, lif:2.5, sod:9, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"shiitake mantar", katkiMaddeleri:[] },
{ ad:"Chanterelle (Sarı Mantar)", adler:{tr:"Sarı Mantar",de:"Pfifferling",el:"Μανιτάρι Κανθαρέλλα",hu:"Rókagomba",pl:"Kurka Leśna",cs:"Liška",ro:"Gălbioară",hr:"Lisičarka",fr:"Girolle",es:"Rebozuelo",it:"Finferlo",pt:"Cantarelo",no:"Kantarell",sv:"Kantarell",da:"Kantarel",fi:"Keltavahvero",nl:"Cantharel",lv:"Gailene",et:"Kukeseened",lt:"Voveraitė"}, kal:20, pro:1.5, karb:3, yag:0.4, lif:2, sod:5, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:28, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"chanterelle mantar", katkiMaddeleri:[] },
{ ad:"Porcini (Kep Mantar)", adler:{tr:"Kep Mantar",de:"Steinpilz",el:"Πορτσίνι",hu:"Vargánya",pl:"Prawdziwek",cs:"Hřib Smrkový",ro:"Hrib",hr:"Vrganj",fr:"Cèpe",es:"Boleto",it:"Porcino",pt:"Cogumelo Porcini",no:"Steinsopp",sv:"Karl Johan Svamp",da:"Stensvamp",fi:"Herkkutatti",nl:"Eekhoorntjesbrood",lv:"Baravika",et:"Puravikseened",lt:"Baravykas"}, kal:22, pro:3.3, karb:3.2, yag:0.4, lif:2.3, sod:5, por:100, kat:"Vegetable", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:32, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"porcini mantar", katkiMaddeleri:[] },
{ ad:"Truffle Yağı (Beyaz)", adler:{tr:"Beyaz Truffle Yağı",de:"Weißes Trüffelöl",el:"Λάδι Λευκής Τρούφας",hu:"Fehér Szarvasgomba Olaj",pl:"Olej z Białej Trufli",cs:"Bílý Lanýžový Olej",ro:"Ulei de Trufe Albe",hr:"Ulje Bijelog Tartufa",fr:"Huile de Truffe Blanche",es:"Aceite de Trufa Blanca",it:"Olio al Tartufo Bianco",pt:"Óleo de Trufa Branca",no:"Hvit Trøffelolje",sv:"Vit Tryffellolja",da:"Hvid Trøffelolie",fi:"Valkoinen Tryffeliöljy",nl:"Witte Truffelolie",lv:"Baltās Trifeļu Eļļa",et:"Valge Trühvliõli",lt:"Baltojo Triufelio Aliejus"}, kal:828, pro:0, karb:0, yag:95, lif:0, sod:0, por:5, kat:"Oil", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:10, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"zeytinyağı, beyaz truffle aroması", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// SÜT ALTERNATİFLERİ
// ══════════════════════════════════════════════════════
{ ad:"Yulaf Sütü (Barista)", adler:{tr:"Barista Yulaf Sütü",de:"Barista Haferdrink",el:"Βρώμης Γάλα Μπαρίστα",hu:"Barista Zabital",pl:"Napój Owsiany Barista",cs:"Ovesný Nápoj Barista",ro:"Băutură din Ovăz Barista",hr:"Zobeno Mlijeko Barista",fr:"Boisson Avoine Barista",es:"Bebida de Avena Barista",it:"Drink di Avena Barista",pt:"Bebida de Aveia Barista",no:"Havre Barista",sv:"Havre Barista",da:"Havre Barista",fi:"Kaura Barista",nl:"Haver Barista",lv:"Auzu Dzēriens Barista",et:"Kaerajook Barista",lt:"Avižų Gėrimas Barista"}, marka:"Oatly", kal:46, pro:0.8, karb:7, yag:1.5, lif:0.5, sod:65, por:200, kat:"Dairy Alt", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"su, yulaf, bitkisel yağ, tuz, E339, E412", katkiMaddeleri:[{kod:"E339",ad:"Sodium phosphates",tehlikeli:false,aciklama:"Acidity regulator."},{kod:"E412",ad:"Guar gum",tehlikeli:false,aciklama:"Thickener."}] },
{ ad:"Soya Sütü (Sade)", adler:{tr:"Soya Sütü",de:"Sojadrink Natur",el:"Γάλα Σόγιας",hu:"Szójatej",pl:"Napój Sojowy",cs:"Sójový Nápoj",ro:"Băutură din Soia",hr:"Sojino Mlijeko",fr:"Boisson au Soja",es:"Bebida de Soja",it:"Latte di Soia",pt:"Bebida de Soja",no:"Soyamelk",sv:"Sojamjölk",da:"Sojamælk",fi:"Soijamaito",nl:"Sojadrink",lv:"Sojas Dzēriens",et:"Sojajook",lt:"Sojos Pienas"}, marka:"Alpro", kal:37, pro:3.3, karb:2.5, yag:1.8, lif:0.5, sod:52, por:200, kat:"Dairy Alt", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:35, aclikSuresi:"1-2 saat", onay:true, yildiz:4, icerik:"su, soya %8.7, kalsiyum, E412, E415, E306", katkiMaddeleri:[{kod:"E412",ad:"Guar gum",tehlikeli:false,aciklama:"Thickener."},{kod:"E415",ad:"Xanthan gum",tehlikeli:false,aciklama:"Stabilizer."},{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Badem Sütü (Şekersiz)", adler:{tr:"Şekersiz Badem Sütü",de:"Ungesüßter Mandeldrink",el:"Γάλα Αμυγδάλου Χωρίς Ζάχαρη",hu:"Cukormentes Mandulatej",pl:"Napój Migdałowy Niesłodzony",cs:"Mandlový Nápoj Neslazenný",ro:"Băutură din Migdale Fără Zahăr",hr:"Bademovo Mlijeko Bez Šećera",fr:"Boisson Amande Sans Sucre",es:"Bebida de Almendras Sin Azúcar",it:"Bevanda di Mandorle Senza Zucchero",pt:"Bebida de Amêndoa Sem Açúcar",no:"Usøtet Mandelmelk",sv:"Osötat Mandelmjölk",da:"Usødet Mandelmelk",fi:"Makeutumaton Mantelimaito",nl:"Ongezoete Amandeldrink",lv:"Nesaldināts Mandeļu Dzēriens",et:"Magustamata Mandlijook",lt:"Nesaldintas Migdolų Pienas"}, marka:"Alpro", kal:13, pro:0.4, karb:0.1, yag:1.1, lif:0.5, sod:52, por:200, kat:"Dairy Alt", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:15, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"su, badem %2, E412, E415, E306, kalsiyum", katkiMaddeleri:[{kod:"E412",ad:"Guar gum",tehlikeli:false,aciklama:"Thickener."},{kod:"E415",ad:"Xanthan gum",tehlikeli:false,aciklama:"Stabilizer."},{kod:"E306",ad:"Tocopherols",tehlikeli:false,aciklama:"Antioxidant."}] },
{ ad:"Hindistan Cevizi Sütü (Kutu)", adler:{tr:"Hindistan Cevizi Sütü",de:"Kokosmilch Dose",el:"Γάλα Καρύδας",hu:"Kókusztej",pl:"Mleko Kokosowe",cs:"Kokosové Mléko",ro:"Lapte de Cocos",hr:"Kokosovo Mlijeko",fr:"Lait de Coco",es:"Leche de Coco",it:"Latte di Cocco",pt:"Leite de Coco",no:"Kokosmjølk",sv:"Kokosmjölk",da:"Kokosmælk",fi:"Kookosmaito",nl:"Kokosmelk",lv:"Kokosriekstu Piens",et:"Kookospiim",lt:"Kokosų Pienas"}, marka:"", kal:197, pro:2, karb:2.8, yag:21, lif:0.3, sod:15, por:100, kat:"Dairy Alt", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:4.5, icerik:"Hindistan cevizi özü, su, E412", katkiMaddeleri:[{kod:"E412",ad:"Guar gum",tehlikeli:false,aciklama:"Thickener."}] },

// ══════════════════════════════════════════════════════
// YUMURTA TÜRLERİ / PIŞIRME YÖNTEMLERİ
// ══════════════════════════════════════════════════════
{ ad:"Haşlanmış Yumurta (Tam Pişmiş)", adler:{tr:"Haşlanmış Yumurta",de:"Hartgekochtes Ei",el:"Βραστό Αυγό",hu:"Keménytojás",pl:"Jajko na Twardo",cs:"Vejce Natvrdo",ro:"Ou Fiert Tare",hr:"Tvrdo Kuhano Jaje",fr:"Oeuf Dur",es:"Huevo Duro",it:"Uovo Sodo",pt:"Ovo Cozido",no:"Hardkokt Egg",sv:"Hårdkokt Ägg",da:"Hårdkogt Æg",fi:"Kovaksi Keitetty Kananmuna",nl:"Hardgekookt Ei",lv:"Cieti Vārīta Ola",et:"Kõvaks Keedetud Muna",lt:"Kietai Virtas Kiaušinis"}, kal:155, pro:13, karb:1.1, yag:11, lif:0, sod:124, por:100, kat:"Egg", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"yumurta", katkiMaddeleri:[] },
{ ad:"Haşlanmış Yumurta (Yarım Pişmiş)", adler:{tr:"Yarım Haşlanmış Yumurta",de:"Wachsweiches Ei",el:"Μελάτο Αυγό",hu:"Félkeménytojás",pl:"Jajko na Miękko",cs:"Vejce Naměkko",ro:"Ou Fiert Moale",hr:"Meko Kuhano Jaje",fr:"Oeuf Mollet",es:"Huevo Pasado por Agua",it:"Uovo alla Coque",pt:"Ovo Cozido Mole",no:"Bløtkokt Egg",sv:"Löskokt Ägg",da:"Blødkogt Æg",fi:"Pehmeäksi Keitetty Kananmuna",nl:"Zachtgekookt Ei",lv:"Mīksti Vārīta Ola",et:"Pehme Keedetud Muna",lt:"Minkštai Virtas Kiaušinis"}, kal:155, pro:13, karb:1.1, yag:11, lif:0, sod:124, por:100, kat:"Egg", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"yumurta", katkiMaddeleri:[] },
{ ad:"Sahanda Yumurta (Tereyağlı)", adler:{tr:"Sahanda Yumurta",de:"Spiegelei",el:"Τηγανητό Αυγό",hu:"Tükörtojás",pl:"Jajko Sadzone",cs:"Volské Oko",ro:"Ochi de Bou",hr:"Jaje na Oko",fr:"Oeuf sur le Plat",es:"Huevo Frito",it:"Uovo al Tegamino",pt:"Ovo Estrelado",no:"Speilegg",sv:"Speglägg",da:"Spejlæg",fi:"Paistettu Kananmuna",nl:"Spiegelei",lv:"Ceptā Ola",et:"Praetud Muna",lt:"Keptas Kiaušinis"}, kal:185, pro:12, karb:0.5, yag:15, lif:0, sod:185, por:100, kat:"Egg", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"yumurta, tereyağı, tuz", katkiMaddeleri:[] },
{ ad:"Omlet (Peynirli)", adler:{tr:"Peynirli Omlet",de:"Käse Omelett",el:"Ομελέτα Τυριού",hu:"Sajtos Omlett",pl:"Omlet z Serem",cs:"Vaječná Omeleta se Sýrem",ro:"Omletă cu Brânză",hr:"Omlet sa Sirom",fr:"Omelette au Fromage",es:"Tortilla Francesa con Queso",it:"Frittata al Formaggio",pt:"Omelete com Queijo",no:"Omelett med Ost",sv:"Omelett med Ost",da:"Omelett med Ost",fi:"Juusto Munakas",nl:"Kaas Omelet",lv:"Omletes ar Sieru",et:"Juustu Omlett",lt:"Omletas su Sūriu"}, kal:215, pro:15, karb:2, yag:17, lif:0, sod:380, por:150, kat:"Egg", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:62, aclikSuresi:"2-3 saat", onay:true, yildiz:4.5, icerik:"yumurta, peynir, tereyağı, tuz", katkiMaddeleri:[] },
{ ad:"Çırpılmış Yumurta (Scrambled)", adler:{tr:"Çırpılmış Yumurta",de:"Rührei",el:"Αυγά Σκραμπλ",hu:"Rántotta",pl:"Jajecznica",cs:"Míchaná Vajíčka",ro:"Ouă Omletă Amestecate",hr:"Kajgana",fr:"Oeufs Brouillés",es:"Huevos Revueltos",it:"Uova Strapazzate",pt:"Ovos Mexidos",no:"Eggerøre",sv:"Äggröra",da:"Røræg",fi:"Munakokkeli",nl:"Roerei",lv:"Ceptas Olas ar Sviestu",et:"Munapuder",lt:"Kiaušinienė"}, kal:175, pro:13, karb:1, yag:13, lif:0, sod:280, por:150, kat:"Egg", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:60, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"yumurta, tereyağı, süt, tuz", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// BAHARAT KARIŞIMLARI
// ══════════════════════════════════════════════════════
{ ad:"Curry Powder (Hint Baharı)", adler:{tr:"Köri Tozu",de:"Currypulver",el:"Κάρυ Σκόνη",hu:"Curry Fűszer",pl:"Curry Proszek",cs:"Kari Koření",ro:"Praf de Curry",hr:"Curry Prah",fr:"Poudre de Curry",es:"Curry en Polvo",it:"Curry in Polvere",pt:"Pó de Caril",no:"Karripulver",sv:"Currypulver",da:"Karrypulver",fi:"Curryjauhe",nl:"Kerrie Poeder",lv:"Karijs Pulveris",et:"Karriipulber",lt:"Kario Milteliai"}, kal:325, pro:13, karb:55, yag:14, lif:33, sod:52, por:5, kat:"Spice", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"zerdeçal, koriander, kimyon, çemen otu, biber, zencefil", katkiMaddeleri:[] },
{ ad:"Garam Masala", adler:{tr:"Garam Masala",de:"Garam Masala",el:"Γκαράμ Μασάλα",hu:"Garam Masala",pl:"Garam Masala",cs:"Garam Masala",ro:"Garam Masala",hr:"Garam Masala",fr:"Garam Masala",es:"Garam Masala",it:"Garam Masala",pt:"Garam Masala",no:"Garam Masala",sv:"Garam Masala",da:"Garam Masala",fi:"Garam Masala",nl:"Garam Masala",lv:"Garam Masala",et:"Garam Masala",lt:"Garam Masala"}, kal:379, pro:14, karb:50, yag:15, lif:17, sod:30, por:3, kat:"Spice", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:8, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"kimyon, karabiber, tarçın, kakule, karanfil, hindistan cevizi", katkiMaddeleri:[] },
{ ad:"Za'atar (Zahter Karışım)", adler:{tr:"Zahter Baharatı",de:"Za'atar Gewürzmischung",el:"Ζα'τάρ",hu:"Za'atar Fűszerkeverék",pl:"Za'atar Mieszanka Przypraw",cs:"Za'atar Koření",ro:"Za'atar Condiment",hr:"Za'atar Začin",fr:"Za'atar Mélange d'Épices",es:"Za'atar Mezcla de Especias",it:"Za'atar Mix di Spezie",pt:"Za'atar Mistura de Especiarias",no:"Za'atar Krydderblanding",sv:"Za'atar Kryddblandning",da:"Za'atar Krydderiblanding",fi:"Za'atar Maustesekoitus",nl:"Za'atar Kruidenmix",lv:"Za'atar Garšvielu Maisījums",et:"Za'atar Vürtsisegu",lt:"Za'atar Prieskonių Mišinys"}, kal:286, pro:12, karb:53, yag:8, lif:14, sod:28, por:5, kat:"Spice", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"keklik otu, susamhumu, sumaç, tuz", katkiMaddeleri:[] },
{ ad:"Pul Biber (Kırmızı Biber Pul)", adler:{tr:"Pul Biber",de:"Chiliflocken",el:"Νιφάδες Τσίλι",hu:"Chili Pelyhek",pl:"Płatki Chili",cs:"Chili Vločky",ro:"Fulgi de Chili",hr:"Čili Pahuljice",fr:"Flocons de Piment",es:"Copos de Chile",it:"Peperoncino a Scaglie",pt:"Flocos de Malagueta",no:"Chiliflak",sv:"Chiliflingor",da:"Chiliflag",fi:"Chilikuiteet",nl:"Chilivlokken",lv:"Čili Pārslas",et:"Tšiilipunad",lt:"Čili Dribsniai"}, kal:314, pro:12, karb:57, yag:17, lif:30, sod:30, por:3, kat:"Spice", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"kırmızı biber, tuz", katkiMaddeleri:[] },
{ ad:"Sumak", adler:{tr:"Sumak",de:"Sumach",el:"Σουμάκ",hu:"Szumák",pl:"Sumak",cs:"Sumach",ro:"Sumac",hr:"Sumac",fr:"Sumac",es:"Zumaque",it:"Sommaco",pt:"Sumagre",no:"Sumak",sv:"Sumak",da:"Sumak",fi:"Sumakki",nl:"Sumak",lv:"Sumaks",et:"Sumak",lt:"Sumakas"}, kal:239, pro:3.5, karb:61, yag:0.5, lif:14, sod:12, por:3, kat:"Spice", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"sumak", katkiMaddeleri:[] },
{ ad:"Paprika Tozu (Tatlı)", adler:{tr:"Tatlı Kırmızıbiber Tozu",de:"Süßes Paprikapulver",el:"Γλυκιά Πάπρικα",hu:"Édes Paprika Őrlemény",pl:"Słodka Papryka Mielona",cs:"Sladká Paprika Mletá",ro:"Boia Dulce",hr:"Slatka Paprika Mljevena",fr:"Paprika Doux",es:"Pimentón Dulce",it:"Paprika Dolce",pt:"Páprica Doce",no:"Søt Paprika",sv:"Söt Paprika",da:"Sød Paprika",fi:"Makea Paprika Jauhe",nl:"Zoete Paprikapoeder",lv:"Saldā Paprika",et:"Magus Paprika",lt:"Saldžioji Paprika"}, kal:282, pro:14, karb:54, yag:13, lif:35, sod:68, por:3, kat:"Spice", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"kırmızıbiber", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// FINDIK / TOHUM ÇEŞİTLERİ
// ══════════════════════════════════════════════════════
{ ad:"Badem (Çiğ)", adler:{tr:"Çiğ Badem",de:"Rohe Mandel",el:"Ωμό Αμύγδαλο",hu:"Nyers Mandula",pl:"Migdały Surowe",cs:"Syrové Mandle",ro:"Migdale Crude",hr:"Sirovi Bademi",fr:"Amandes Brutes",es:"Almendras Crudas",it:"Mandorle Crude",pt:"Amêndoas Cruas",no:"Rå Mandler",sv:"Råa Mandlar",da:"Rå Mandler",fi:"Raa'at Mantelit",nl:"Rauwe Amandelen",lv:"Neapstrādātas Mandeles",et:"Toored Mandlid",lt:"Žalios Migdolai"}, kal:579, pro:21, karb:22, yag:50, lif:12.5, sod:1, por:30, kat:"Nuts", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"badem", katkiMaddeleri:[] },
{ ad:"Pistache (Antep Fıstığı)", adler:{tr:"Antep Fıstığı",de:"Pistazie",el:"Φιστίκι Αιγίνης",hu:"Pisztácia",pl:"Pistacja",cs:"Pistácie",ro:"Fistic",hr:"Pistacija",fr:"Pistache",es:"Pistacho",it:"Pistacchio",pt:"Pistácio",no:"Pistasjnøtt",sv:"Pistagenöt",da:"Pistacienød",fi:"Pistaasipähkinä",nl:"Pistachenoot",lv:"Pistācija",et:"Pistaatsiapähkel",lt:"Pistacijos"}, kal:562, pro:20, karb:28, yag:45, lif:10.6, sod:1, por:30, kat:"Nuts", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:65, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"antep fıstığı", katkiMaddeleri:[] },
{ ad:"Kaju Fıstığı", adler:{tr:"Kaju",de:"Cashew",el:"Κάσιους",hu:"Kesudió",pl:"Nerkowiec",cs:"Kešu",ro:"Caju",hr:"Indijski Oraščić",fr:"Noix de Cajou",es:"Anacardo",it:"Anacardio",pt:"Caju",no:"Cashewnøtt",sv:"Cashewnöt",da:"Cashewnød",fi:"Cashewpähkinä",nl:"Cashewnoot",lv:"Indijas Rieksts",et:"Kašupähkel",lt:"Anakardžiai"}, kal:553, pro:18, karb:30, yag:44, lif:3.3, sod:12, por:30, kat:"Nuts", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:62, aclikSuresi:"3-4 saat", onay:true, yildiz:4.5, icerik:"kaju", katkiMaddeleri:[] },
{ ad:"Susam Tohumu", adler:{tr:"Susam",de:"Sesam",el:"Σουσάμι",hu:"Szezámmag",pl:"Sezam",cs:"Sezam",ro:"Susan",hr:"Sezam",fr:"Sésame",es:"Sésamo",it:"Sesamo",pt:"Sésamo",no:"Sesam",sv:"Sesam",da:"Sesam",fi:"Seesami",nl:"Sesam",lv:"Sezams",et:"Seesam",lt:"Sezamai"}, kal:573, pro:18, karb:23, yag:50, lif:11.8, sod:11, por:10, kat:"Seeds", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:55, aclikSuresi:"2-3 saat", onay:true, yildiz:5, icerik:"susam", katkiMaddeleri:[] },
{ ad:"Kabak Çekirdeği", adler:{tr:"Kabak Çekirdeği",de:"Kürbiskerne",el:"Κολοκυθόσποροι",hu:"Tökmagok",pl:"Pestki Dyni",cs:"Dýňová Semínka",ro:"Semințe de Dovleac",hr:"Sjemenke Bundeve",fr:"Graines de Courge",es:"Pipas de Calabaza",it:"Semi di Zucca",pt:"Sementes de Abóbora",no:"Gresskarfrø",sv:"Pumpafrön",da:"Græskarfrø",fi:"Kurpitsansiemenet",nl:"Pompoenpitten",lv:"Ķirbja Sēklas",et:"Kõrvitsaseemned",lt:"Moliūgų Sėklos"}, kal:559, pro:30, karb:11, yag:49, lif:6, sod:7, por:15, kat:"Seeds", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:70, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"kabak çekirdeği", katkiMaddeleri:[] },
{ ad:"Chia Tohumu", adler:{tr:"Chia Tohumu",de:"Chiasamen",el:"Σπόροι Τσία",hu:"Chia Mag",pl:"Nasiona Chia",cs:"Chia Semínka",ro:"Semințe de Chia",hr:"Sjemenke Chie",fr:"Graines de Chia",es:"Semillas de Chía",it:"Semi di Chia",pt:"Sementes de Chia",no:"Chiafrø",sv:"Chiafrön",da:"Chiafrø",fi:"Chiaviljat",nl:"Chiazaad",lv:"Čia Sēklas",et:"Chiaseemned",lt:"Čija Sėklos"}, kal:486, pro:17, karb:42, yag:31, lif:34, sod:16, por:15, kat:"Seeds", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:75, aclikSuresi:"4-5 saat", onay:true, yildiz:5, icerik:"chia tohumu", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// PROTEIN / SPOR GIDASI
// ══════════════════════════════════════════════════════
{ ad:"Whey Protein Tozu (Çikolatalı)", adler:{tr:"Whey Protein Tozu",de:"Whey Protein Pulver",el:"Πρωτεΐνη Ορού Σκόνη",hu:"Fehérjepor",pl:"Białko Serwatkowe",cs:"Syrovátkový Protein",ro:"Proteină din Zer",hr:"Proteinski Prah",fr:"Protéine de Lactosérum",es:"Proteína de Suero",it:"Proteine del Siero",pt:"Proteína de Soro",no:"Myseprotein",sv:"Vassleprotein",da:"Valle Protein",fi:"Heraproteiini",nl:"Wei Eiwit",lv:"Sūkalu Proteīns",et:"Vadakuvalk",lt:"Išrūgų Baltymai"}, marka:"", kal:380, pro:75, karb:8, yag:5, lif:1.5, sod:180, por:30, kat:"Sport", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:78, aclikSuresi:"3-4 saat", onay:true, yildiz:4, icerik:"whey konsantrat, kakao, tatlandırıcı, E322, E471, E341", katkiMaddeleri:[{kod:"E322",ad:"Lecithins",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E341",ad:"Calcium phosphates",tehlikeli:false,aciklama:"Acidity regulator."}] },
{ ad:"Protein Bar (Çikolatalı)", adler:{tr:"Protein Bar",de:"Proteinriegel",el:"Μπάρα Πρωτεΐνης",hu:"Fehérjeszivárvány",pl:"Baton Proteinowy",cs:"Proteinová Tyčinka",ro:"Baton Proteic",hr:"Proteinska Pločica",fr:"Barre Protéinée",es:"Barrita Proteica",it:"Barretta Proteica",pt:"Barra de Proteína",no:"Proteinbar",sv:"Proteinbar",da:"Proteinbar",fi:"Proteiinipatukka",nl:"Eiwitreep",lv:"Proteīna Batoniņš",et:"Proteiinibatoon",lt:"Proteininis Batonėlis"}, marka:"", kal:385, pro:28, karb:40, yag:12, lif:5, sod:250, por:60, kat:"Sport", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:58, aclikSuresi:"2-3 saat", onay:true, yildiz:3.5, icerik:"whey protein, yulaf, kakao, tatlandırıcı, E322, E471", katkiMaddeleri:[{kod:"E322",ad:"Lecithins",tehlikeli:false,aciklama:"Emulsifier."},{kod:"E471",ad:"Mono and diglycerides",tehlikeli:false,aciklama:"Emulsifier."}] },
{ ad:"Creatine (Kreatin Tozu)", adler:{tr:"Kreatin",de:"Kreatin Pulver",el:"Κρεατίνη",hu:"Kreatin Por",pl:"Kreatyna",cs:"Kreatin",ro:"Creatină",hr:"Kreatin",fr:"Créatine",es:"Creatina",it:"Creatina",pt:"Creatina",no:"Kreatin",sv:"Kreatin",da:"Kreatin",fi:"Kreatiini",nl:"Creatine",lv:"Kreatīns",et:"Kreatiin",lt:"Kreatinas"}, kal:0, pro:0, karb:0, yag:0, lif:0, sod:0, por:5, kat:"Sport", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:5, aclikSuresi:"1 saatten az", onay:true, yildiz:4, icerik:"kreatin monohidrat", katkiMaddeleri:[] },

// ══════════════════════════════════════════════════════
// TURŞU / FERMENTE
// ══════════════════════════════════════════════════════
{ ad:"Lahana Turşusu (Ev Yapımı)", adler:{tr:"Lahana Turşusu",de:"Selbstgemachtes Sauerkraut",el:"Σπιτική Ξινολάχανο",hu:"Házi Savanyú Káposzta",pl:"Domowa Kiszona Kapusta",cs:"Domácí Kyselé Zelí",ro:"Varză Murată de Casă",hr:"Domaći Kiseli Kupus",fr:"Choucroute Maison",es:"Chucrut Casero",it:"Crauti Fatti in Casa",pt:"Chucrute Caseiro",no:"Hjemmelaget Surkål",sv:"Hemgjord Surkål",da:"Hjemmelavet Surkål",fi:"Kotitekoinen Hapankaali",nl:"Zelfgemaakte Zuurkool",lv:"Mājas Skābēti Kāposti",et:"Kodune Hapukapsas",lt:"Naminiai Rauginti Kopūstai"}, kal:19, pro:0.9, karb:4.3, yag:0.1, lif:2.5, sod:661, por:100, kat:"Fermented", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:22, aclikSuresi:"1 saatten az", onay:true, yildiz:5, icerik:"lahana, tuz", katkiMaddeleri:[] },
{ ad:"Miso (Soya Ezmesi)", adler:{tr:"Miso",de:"Miso Paste",el:"Μίσο",hu:"Miso Paszta",pl:"Pasta Miso",cs:"Miso Pasta",ro:"Pastă Miso",hr:"Miso Pasta",fr:"Pâte Miso",es:"Pasta de Miso",it:"Pasta di Miso",pt:"Pasta Miso",no:"Miso Paste",sv:"Misopaste",da:"Miso Paste",fi:"Misotahna",nl:"Miso Pasta",lv:"Miso Pasta",et:"Miso Pasta",lt:"Miso Pasta"}, kal:199, pro:12, karb:26, yag:6, lif:5.4, sod:3728, por:15, kat:"Fermented", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:30, aclikSuresi:"1-2 saat", onay:true, yildiz:5, icerik:"soya, pirinç/arpa, tuz, koji kültürü", katkiMaddeleri:[] },
{ ad:"Tempeh", adler:{tr:"Tempeh",de:"Tempeh",el:"Τέμπε",hu:"Tempeh",pl:"Tempeh",cs:"Tempeh",ro:"Tempeh",hr:"Tempeh",fr:"Tempeh",es:"Tempeh",it:"Tempeh",pt:"Tempeh",no:"Tempeh",sv:"Tempeh",da:"Tempeh",fi:"Tempeh",nl:"Tempeh",lv:"Tempeh",et:"Tempeh",lt:"Tempeh"}, kal:193, pro:19, karb:9.4, yag:11, lif:9, sod:9, por:100, kat:"Fermented", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:72, aclikSuresi:"3-4 saat", onay:true, yildiz:5, icerik:"soya, Rhizopus kültürü", katkiMaddeleri:[] },
{ ad:"Turşu (Salatalık, Tatlı)", adler:{tr:"Tatlı Salatalık Turşusu",de:"Süß-Saure Gurken",el:"Γλυκόξινα Αγγούρια",hu:"Édeskés Savanyú Uborka",pl:"Słodkie Kiszone Ogórki",cs:"Sladkokyselé Okurky",ro:"Castraveți Dulce-Acrișori",hr:"Slatki Kiseli Krastavci",fr:"Cornichons Doux",es:"Pepinillos Dulces",it:"Cetrioli Agrodolci",pt:"Pepinos em Vinagre Doces",no:"Søtsur Agurk",sv:"Sötsur Gurka",da:"Syltede Agurker Sød",fi:"Maku Kurkkuja",nl:"Zoetzure Komkommer",lv:"Saldinātie Marinētie Gurķi",et:"Magushapud Marineeritud Kurgid",lt:"Saldžiarūgščiai Konservuoti Agurkai"}, kal:75, pro:0.3, karb:18, yag:0.1, lif:0.5, sod:680, por:50, kat:"Fermented", ulkeler:["de","at","be","nl","fr","es","it","pt","el","sv","da","no","fi","pl","cs","hu","ro","hr","en","tr","lv","et","lt"], tokPuan:12, aclikSuresi:"1 saatten az", onay:true, yildiz:3.5, icerik:"salatalık, sirke, şeker, tuz, baharat, E211", katkiMaddeleri:[{kod:"E211",ad:"Sodium benzoate",tehlikeli:false,aciklama:"Preservative."}] }
];

module.exports = BESINLER_EZ;
