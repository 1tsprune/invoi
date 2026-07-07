import type { DocType, Locale } from "./types";

export type Dictionary = {
  appName: string;
  tagline: string;
  tabs: { form: string; brand: string; preview: string; export: string };
  docTypes: Record<DocType, string>;
  fillInfo: string;
  invoiceNo: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientPlaceholder: string;
  currency: string;
  productsServices: string;
  qty: string;
  description: string;
  duration: string;
  price: string;
  addItem: string;
  otherCosts: string;
  addCost: string;
  discount: string;
  tax: string;
  paymentMethod: string;
  paymentPlaceholder: string;
  signatory: string;
  notes: string;
  notesPlaceholder: string;
  billTo: string;
  bestRegards: string;
  signature: string;
  subtotal: string;
  total: string;
  brandSettings: string;
  brandSettingsSub: string;
  brandIdentity: string;
  brandName: string;
  brandSub: string;
  brandSub2: string;
  logo: string;
  uploadLogo: string;
  chooseTheme: string;
  colorCustomization: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  tableTextColor: string;
  tableRowColor: string;
  showDuration: string;
  watermark: string;
  watermarkPlaceholder: string;
  qrisConfig: string;
  qrisSub: string;
  uploadQris: string;
  showQris: string;
  qrisDynamic: string;
  qrisStatic: string;
  manualEntry: string;
  inventorySync: string;
  selectInventory: string;
  manageInventory: string;
  newDoc: string;
  saveData: string;
  loadData: string;
  downloadPdf: string;
  downloadPng: string;
  copyWhatsapp: string;
  copied: string;
  storageUsed: string;
  noLogin: string;
  tutorial: string;
  inventoryTitle: string;
  inventorySub: string;
  inventoryEmpty: string;
  addProduct: string;
  backToApp: string;
  unit: string;
  docLabel: Record<DocType, string>;
  homeTitle: string;
  homeSub: string;
  invoiceFont: string;
  signatureFontLabel: string;
  watermarkImage: string;
  rotation: string;
  downloadJpg: string;
  dataBrowser: string;
  resetData: string;
  bankName: string;
  bankAccount: string;
  paymentStatus: string;
  paymentStatusNone: string;
  paidStamp: string;
  unpaidStamp: string;
  itemSubtotal: string;
  inventoryName: string;
  qrisSuccess: string;
  qrisScanning: string;
  qrisReadValue: string;
  qrisWarning: string;
  inventoryCardTitle: string;
  inventoryCardSub: string;
  unitPrice: string;
  someone: string;
  name: string;
  additionalCost: string;
  reduction: string;
  bgColorHint: string;
  mainTextColorHint: string;
  accentColorHint: string;
  tableTextColorHint: string;
  tableRowColorHint: string;
  signatureSettings: string;
  signatureSettingsSub: string;
  uploadSignature: string;
  signatureImageHint: string;
  showSignatureOnDoc: string;
  previewSignature: string;
  signatureTitle: string;
  signatureTitlePlaceholder: string;
  yourNamePlaceholder: string;
  watermarkConfig: string;
  showQrisOnInvoice: string;
  donationMessage: string;
  donationButton: string;
  donationGoalLabel: string;
  donationGoalReached: string;
  mayGoalReached: string;
  thankYou: string;
  haloUser: string;
  downloadTitle: string;
  downloadSub: string;
  downloadPdfDesc: string;
  downloadJpgDesc: string;
  downloadPngDesc: string;
  cleanResultHint: string;
  live: string;
  detailInvoice: string;
  reset: string;
  newDocConfirm: string;
  itemCount: string;
  inventoryCount: string;
  totalSize: string;
  brandDataSize: string;
  memoryLimitWarning: string;
  resetBrowserDataSub: string;
  inventoryEmptyHint: string;
  inventorySyncHint: string;
  welcomePrefix: string;
  welcomeLead: string;
  welcomeFree: string;
  welcomeMid: string;
  welcomeForbidden: string;
  welcomeEnd: string;
  welcomeSupport: string;
  welcomeSupportSuffix: string;
  startNow: string;
  developer: string;
  follow: string;
  supporters: string;
  feature1: string;
  feature1Sub: string;
  feature2: string;
  feature2Sub: string;
  feature3: string;
  feature3Sub: string;
  mainTextColor: string;
  surfaceColor: string;
  borderColor: string;
  surfaceColorHint: string;
  borderColorHint: string;
  backgroundConfig: string;
  backgroundSub: string;
  uploadBackground: string;
  backgroundPresets: string;
  backgroundOpacity: string;
  backgroundOverlay: string;
  backgroundOverlayHint: string;
  backgroundSize: string;
  backgroundPosition: string;
  backgroundPositionX: string;
  backgroundPositionY: string;
  backgroundPosCenter: string;
  backgroundPosTop: string;
  backgroundPosBottom: string;
  backgroundPosLeft: string;
  backgroundPosRight: string;
  enableBackground: string;
  addWatermark: string;
  watermarkSub: string;
  watermarkHint: string;
  uploadWatermark: string;
  deleteImage: string;
  fontSearch: string;
  fontsAvailable: string;
  downloadSuccess: string;
  resetBrowserData: string;
  cancel: string;
  confirmReset: string;
  enableOtherCosts: string;
  discountTaxTitle: string;
  paymentClosingTitle: string;
  itemNamePlaceholder: string;
  durationPlaceholder: string;
  inventoryModeManualDesc: string;
  inventoryPriceFromInventory: string;
  inventoryPageSub: string;
  inventoryLocalNote: string;
  backToInvoice: string;
  inventoryDescription: string;
  deleteProduct: string;
  newProduct: string;
  subBrandPlaceholder: string;
  subBrand2Placeholder: string;
  logoHint: string;
  logoUploaded: string;
  watermarkTextPlaceholder: string;
  qrisHint: string;
  qrisErrorRead: string;
  qrisErrorLoad: string;
  changeImage: string;
  deleteQris: string;
  otherCostPlaceholder: string;
  bankNamePlaceholder: string;
  bankAccountPlaceholder: string;
  inventorySaveData: string;
  inventoryLoadData: string;
  tutorialInventoryTitle: string;
  tutorialSection1Title: string;
  tutorialSection1Body: string;
  tutorialSection2Title: string;
  tutorialSection2Body: string;
  tutorialSection3Title: string;
  tutorialSection3Body: string;
  zoomIn: string;
  zoomOut: string;
  zoomReset: string;
  zoomFit: string;
  inventoryFullPage: string;
  newDocTitle: string;
  invalidBackupFile: string;
  faqNoLogin: string;
  faqNoLoginAnswer: string;
  faqNoAccount: string;
  faqNoAccountAnswer: string;
  loading: string;
  dismiss: string;
  storageQuotaTitle: string;
  storageQuotaAction: string;
};

const id: Dictionary = {
  appName: "Invoi",
  tagline: "invoice satset · gaperlu login",
  tabs: { form: "Invoice", brand: "Brand", preview: "Preview", export: "Unduh" },
  docTypes: { invoice: "Invoice", kwitansi: "Kwitansi", quotation: "Penawaran" },
  fillInfo: "Isi informasi di bawah ini",
  invoiceNo: "No. Invoice",
  date: "Tanggal",
  dueDate: "Jatuh Tempo",
  clientName: "Nama Klien / Penerima",
  clientPlaceholder: "Nama klien kamu",
  currency: "Mata Uang (Currency)",
  productsServices: "Produk / Layanan",
  qty: "Qty",
  description: "Deskripsi",
  duration: "Durasi",
  price: "Harga",
  addItem: "TAMBAH ITEM",
  otherCosts: "Biaya Lainnya",
  addCost: "Tambah biaya",
  discount: "Diskon",
  tax: "Pajak (PPN)",
  paymentMethod: "Metode Pembayaran",
  paymentPlaceholder: "Transfer Bank / Tunai / QRIS",
  signatory: "Penandatangan",
  notes: "Catatan",
  notesPlaceholder: "Catatan tambahan atau syarat & ketentuan...",
  billTo: "Untuk",
  bestRegards: "Hormat kami,",
  signature: "Tanda Tangan",
  subtotal: "Subtotal",
  total: "Total",
  brandSettings: "Pengaturan Brand",
  brandSettingsSub: "Sesuaikan tampilan dokumen kamu",
  brandIdentity: "Identitas Brand",
  brandName: "Nama Brand",
  brandSub: "Sub-brand / slogan",
  brandSub2: "Kontak / alamat",
  logo: "Logo",
  uploadLogo: "Upload Logo",
  chooseTheme: "Pilih Tema",
  colorCustomization: "Kustomisasi Warna",
  bgColor: "Warna Latar",
  mainTextColor: "Warna Teks Utama",
  textColor: "Warna Teks",
  surfaceColor: "Warna Panel",
  borderColor: "Warna Garis",
  accentColor: "Warna Aksen",
  tableTextColor: "Teks Tabel",
  tableRowColor: "Baris Tabel",
  showDuration: "Tampilkan kolom durasi",
  watermark: "Watermark teks",
  watermarkPlaceholder: "LUNAS / COPY / dll",
  qrisConfig: "Konfigurasi QRIS",
  qrisSub: "Upload gambar QRIS untuk ditampilkan di dokumen",
  uploadQris: "Upload Gambar QRIS",
  showQris: "Tampilkan QRIS di dokumen",
  qrisDynamic: "QR Dinamis (nominal total)",
  qrisStatic: "QR Statis (gambar upload)",
  manualEntry: "Input Manual",
  inventorySync: "Dari Inventory",
  selectInventory: "Pilih item inventory",
  manageInventory: "Kelola Inventory",
  newDoc: "Dokumen baru",
  saveData: "Simpan Data",
  loadData: "Load Data",
  downloadPdf: "Download PDF",
  downloadPng: "Download Gambar",
  copyWhatsapp: "Salin teks WA",
  copied: "Tersalin!",
  storageUsed: "Penyimpanan browser",
  noLogin: "Tanpa login — data tersimpan di browser kamu",
  tutorial: "Tutorial & FAQ",
  inventoryTitle: "Inventory Produk",
  inventorySub: "Simpan daftar barang & harga untuk isi dokumen lebih cepat",
  inventoryEmpty: "Inventory masih kosong. Tambahkan produk pertama kamu.",
  addProduct: "Tambah Produk",
  backToApp: "Kembali",
  unit: "Satuan",
  docLabel: { invoice: "INVOICE", kwitansi: "KWITANSI", quotation: "PENAWARAN" },
  homeTitle: "Invoice selesai dalam hitungan detik",
  homeSub: "Isi form di kiri — preview langsung update di kanan. Tanpa daftar, gratis, data aman di browser kamu.",
  invoiceFont: "Font Invoice",
  signatureFontLabel: "Font Tanda Tangan",
  watermarkImage: "Watermark Gambar",
  rotation: "Rotasi",
  downloadJpg: "Download JPG",
  dataBrowser: "Data Browser",
  resetData: "Reset Semua Data",
  bankName: "Nama Bank",
  bankAccount: "No. Rekening",
  paymentStatus: "Status Pembayaran",
  paymentStatusNone: "Tanpa stempel",
  paidStamp: "LUNAS",
  unpaidStamp: "BELUM LUNAS",
  itemSubtotal: "Subtotal item ini",
  inventoryName: "Nama item",
  qrisSuccess: "QR berhasil dipindai",
  qrisScanning: "Memindai QR...",
  qrisReadValue: "Nilai terbaca dari QR",
  qrisWarning: "Pelanggan bayar tepat {total}. QRIS dinamis mengikuti nominal invoice.",
  inventoryCardTitle: "Inventory Produk & Layanan",
  inventoryCardSub: "Simpan daftar barang supaya invoice terisi otomatis dari inventory.",
  unitPrice: "Harga Satuan",
  someone: "Seseorang",
  name: "Nama",
  additionalCost: "Biaya Tambahan",
  reduction: "Potongan Biaya",
  bgColorHint: "(warna dasar dokumen)",
  mainTextColorHint: "(warna font utama)",
  accentColorHint: "(latar tabel & total)",
  tableTextColorHint: "(teks header tabel & total)",
  tableRowColorHint: "(baris selang-seling tabel)",
  surfaceColorHint: "(kotak catatan & panel)",
  borderColorHint: "(garis pemisah & border)",
  backgroundConfig: "Gambar Latar Belakang",
  backgroundSub: "Upload gambar lucu atau pilih preset — bikin invoice kamu lebih unik",
  uploadBackground: "Upload Gambar Latar",
  backgroundPresets: "Preset Lucu",
  backgroundOpacity: "Opasitas Gambar",
  backgroundOverlay: "Overlay Warna",
  backgroundOverlayHint: "Lapisan warna di atas gambar supaya teks tetap terbaca",
  backgroundSize: "Mode Tampilan",
  backgroundPosition: "Posisi Gambar",
  backgroundPositionX: "Horizontal",
  backgroundPositionY: "Vertikal",
  backgroundPosCenter: "Tengah",
  backgroundPosTop: "Atas",
  backgroundPosBottom: "Bawah",
  backgroundPosLeft: "Kiri",
  backgroundPosRight: "Kanan",
  enableBackground: "Aktifkan gambar latar belakang",
  addWatermark: "Tambah Watermark",
  watermarkSub: "Kustom watermark buat invoice kamu",
  watermarkHint: "Teks watermark akan hilang jika gambar watermark aktif",
  uploadWatermark: "Upload Watermark",
  deleteImage: "Hapus gambar",
  fontSearch: "Cari font...",
  fontsAvailable: "font",
  downloadSuccess: "Berhasil diunduh!",
  resetBrowserData: "Reset Data Browser",
  cancel: "Batal",
  confirmReset: "Ya, Reset",
  enableOtherCosts: "Aktifkan biaya tambahan",
  discountTaxTitle: "Diskon & Pajak",
  paymentClosingTitle: "Pembayaran & Penutup",
  itemNamePlaceholder: "Nama item",
  durationPlaceholder: "XX Hari",
  inventoryModeManualDesc: "Ketik nama dan harga produk secara manual di setiap baris.",
  inventoryPriceFromInventory: "Harga mengikuti data inventory — tidak bisa diedit manual.",
  inventoryPageSub: "Kelola daftar produk & layanan kamu di sini",
  inventoryLocalNote: "Data tersimpan di browser kamu. Simpan backup secara berkala.",
  backToInvoice: "Kembali ke Invoice",
  inventoryDescription: "Deskripsi / Catatan",
  deleteProduct: "Hapus",
  newProduct: "Produk baru",
  subBrandPlaceholder: "Slogan / tagline brand kamu",
  subBrand2Placeholder: "Email, telepon, atau alamat lengkap",
  logoHint: "Gunakan rasio 1:1 untuk hasil terbaik (PNG/JPG)",
  logoUploaded: "Logo terupload",
  watermarkTextPlaceholder: "Biarkan kosong kalau gak mau pakai teks...",
  qrisHint: "Upload gambar QRIS resmi dari merchant kamu",
  qrisErrorRead: "QR tidak terbaca — coba gambar lebih jelas",
  qrisErrorLoad: "Gagal memuat gambar QRIS",
  changeImage: "Ganti gambar",
  deleteQris: "Hapus QRIS",
  otherCostPlaceholder: "Ongkir / Admin",
  bankNamePlaceholder: "BCA / Mandiri / dll",
  bankAccountPlaceholder: "1234567890 a.n. ...",
  inventorySaveData: "Simpan Data",
  inventoryLoadData: "Load Data",
  tutorialInventoryTitle: "Cara Kerja Inventory",
  tutorialSection1Title: "1. Mengelola Produk",
  tutorialSection1Body:
    "Tambah produk baru lewat tombol Tambah Produk. Isi nama, harga, satuan, dan deskripsi. Data tersimpan otomatis di browser.",
  tutorialSection2Title: "2. Sinkron ke Invoice",
  tutorialSection2Body:
    "Di tab Invoice, aktifkan mode Sync Inventory lalu pilih item dari dropdown. Nama dan harga terisi otomatis.",
  tutorialSection3Title: "3. Backup Data",
  tutorialSection3Body:
    "Rutin klik Simpan Data untuk download file JSON. Restore kapan saja lewat Load Data — terutama setelah update inventory.",
  signatureSettings: "Tanda Tangan (TTD)",
  signatureSettingsSub: "Atur font, upload gambar TTD, dan tampilan di dokumen",
  uploadSignature: "Upload Gambar TTD",
  signatureImageHint: "Opsional — jika diupload, gambar TTD menggantikan teks tanda tangan",
  showSignatureOnDoc: "Tampilkan blok tanda tangan di dokumen",
  previewSignature: "Preview TTD",
  signatureTitle: "Jabatan / Title",
  signatureTitlePlaceholder: "Direktur / Manager / dll",
  yourNamePlaceholder: "Nama penandatangan",
  watermarkConfig: "Konfigurasi Watermark",
  showQrisOnInvoice: "Tampilkan QRIS di invoice",
  donationMessage:
    "Makasih udah pake Invoi! App ini gratis, no ads, buat semua orang. Kalau helpful dan mau support dev-nya, traktir kopi aja — vibes.",
  donationButton: "Traktir Kopi Developer ☕ (Rp 1.000)",
  donationGoalLabel: "Goal",
  donationGoalReached: "{percent}%",
  mayGoalReached: "Target goal bulan ini sudah tercapai! 🎉",
  thankYou: "Terima kasih atas dukungannya! 🤍",
  haloUser: "Halo, {name}!",
  downloadTitle: "Download Dokumen",
  downloadSub: "Simpan dokumen kamu dalam berbagai format",
  downloadPdfDesc: "Download dokumen dalam format PDF",
  downloadJpgDesc: "Download dokumen dalam format JPG",
  downloadPngDesc: "Download dokumen dalam format PNG",
  cleanResultHint: "Hasil lebih rapi saat di download",
  live: "Live",
  detailInvoice: "Detail Invoice",
  reset: "Reset",
  newDocConfirm: "Buat dokumen baru? Data form akan dikosongkan.",
  itemCount: "Jumlah Elemen",
  inventoryCount: "Jumlah Produk Inventory",
  totalSize: "Total Ukuran",
  brandDataSize: "Ukuran Data Brand Kamu",
  memoryLimitWarning:
    "Memori sudah melebihi batas maksimum, data brand kamu di browser bisa hilang kapan saja tanpa pemberitahuan",
  resetBrowserDataSub:
    "Semua data akan dihapus dan aplikasi dimuat ulang. Kamu yakin?",
  inventoryEmptyHint:
    "Inventory masih kosong. Tambahkan produk dulu supaya bisa disinkronkan ke invoice. Buka tab Brand untuk mengatur inventory.",
  inventorySyncHint: "Pilih barang dari inventory untuk mengisi nama dan harga otomatis",
  welcomePrefix: "hai, selamat datang di",
  welcomeLead: "app ini beneran",
  welcomeFree: "gratis total",
  welcomeMid: "buat bikin invoice & struk tanpa ribet.",
  welcomeForbidden: "dilarang",
  welcomeEnd: "diperjualbelikan dalam bentuk apapun.",
  welcomeSupport: "dukung pengembangannya dengan share ke teman-teman dan follow",
  welcomeSupportSuffix: "aku di X",
  startNow: "mulai sekarang",
  developer: "Developer",
  follow: "ikuti",
  supporters: "pendukung",
  feature1: "QRIS dinamis",
  feature1Sub: "scan langsung, nominal otomatis ke-update.",
  feature2: "210+ tema & background",
  feature2Sub: "upload background + 36 font invoice & 24 font tanda tangan.",
  feature3: "aman & lokal",
  feature3Sub: "data di perangkat kamu, bukan server.",
  zoomIn: "Perbesar",
  zoomOut: "Perkecil",
  zoomReset: "Reset zoom",
  zoomFit: "Perbesar pas",
  inventoryFullPage: "Halaman penuh",
  newDocTitle: "Dokumen Baru",
  invalidBackupFile: "File tidak valid. Pastikan format JSON backup Invoi.",
  faqNoLogin: "Apakah perlu daftar atau login?",
  faqNoLoginAnswer:
    "Nope. Invoi langsung dipake. Semua data disimpan di browser kamu (localStorage), bukan di server kami.",
  faqNoAccount: "Kenapa tidak ada login?",
  faqNoAccountAnswer:
    "Invoi dirancang satset tanpa akun. Data kamu di browser — rutin Simpan Data biar aman.",
  loading: "Memuat...",
  dismiss: "Tutup",
  storageQuotaTitle: "Penyimpanan browser penuh",
  storageQuotaAction: "Buka tab Unduh → Simpan Data",
};

const en: Dictionary = {
  ...id,
  tagline: "invoices satset · no login needed",
  tabs: { form: "Invoice", brand: "Brand", preview: "Preview", export: "Export" },
  docTypes: { invoice: "Invoice", kwitansi: "Receipt", quotation: "Quotation" },
  fillInfo: "Fill in the information below",
  dueDate: "Due Date",
  clientName: "Client Name",
  clientPlaceholder: "Your client name",
  currency: "Currency",
  productsServices: "Products / Services",
  description: "Description",
  duration: "Duration",
  price: "Price",
  addItem: "ADD ITEM",
  otherCosts: "Other Costs",
  addCost: "Add cost",
  tax: "Tax (VAT)",
  paymentPlaceholder: "Bank Transfer / Cash",
  notesPlaceholder: "Additional notes or terms...",
  billTo: "Bill To",
  bestRegards: "Best regards,",
  signature: "Signature",
  brandSettingsSub: "Customize your document appearance",
  brandSub: "Sub-brand / tagline",
  brandSub2: "Contact / address",
  showDuration: "Show duration column",
  qrisSub: "Upload QRIS image to display on document",
  showQris: "Show QRIS on document",
  qrisDynamic: "Dynamic QR (total amount)",
  qrisStatic: "Static QR (uploaded image)",
  inventorySync: "From Inventory",
  selectInventory: "Select inventory item",
  manageInventory: "Manage Inventory",
  newDoc: "New document",
  saveData: "Save Data",
  loadData: "Load Data",
  downloadPdf: "Download PDF",
  downloadPng: "Download Image",
  copyWhatsapp: "Copy WA text",
  copied: "Copied!",
  storageUsed: "Browser storage",
  noLogin: "No login — data stays in your browser",
  tutorial: "Tutorial & FAQ",
  inventoryTitle: "Product Inventory",
  inventorySub: "Save products & prices for faster invoicing",
  inventoryEmpty: "Inventory is empty. Add your first product.",
  addProduct: "Add Product",
  backToApp: "Back",
  unit: "Unit",
  docLabel: { invoice: "INVOICE", kwitansi: "RECEIPT", quotation: "QUOTATION" },
  homeTitle: "Invoice done in seconds",
  homeSub: "Fill the form on the left — preview updates live on the right. No signup, free, data stays in your browser.",
  invoiceFont: "Invoice Font",
  signatureFontLabel: "Signature Font",
  watermarkImage: "Watermark Image",
  rotation: "Rotation",
  downloadJpg: "Download JPG",
  dataBrowser: "Browser Data",
  resetData: "Reset All Data",
  bankName: "Bank Name",
  bankAccount: "Account Number",
  paymentStatus: "Payment Status",
  paymentStatusNone: "No stamp",
  paidStamp: "PAID",
  unpaidStamp: "UNPAID",
  itemSubtotal: "Item subtotal",
  inventoryName: "Item name",
  qrisSuccess: "QR scanned successfully",
  qrisScanning: "Scanning QR...",
  qrisReadValue: "Value read from QR",
  qrisWarning: "Customer pays exact {total}. Dynamic QRIS follows invoice amount.",
  inventoryCardTitle: "Product & Service Inventory",
  inventoryCardSub: "Save product list to auto-fill invoices from inventory.",
  unitPrice: "Unit Price",
  someone: "Someone",
  name: "Name",
  additionalCost: "Additional Cost",
  reduction: "Reduction",
  bgColorHint: "(document background)",
  mainTextColorHint: "(main text color)",
  accentColorHint: "(table header & total)",
  tableTextColorHint: "(table header text)",
  tableRowColorHint: "(alternating table rows)",
  mainTextColor: "Main Text Color",
  surfaceColor: "Panel Color",
  borderColor: "Border Color",
  surfaceColorHint: "(notes box & panels)",
  borderColorHint: "(dividers & borders)",
  backgroundConfig: "Background Image",
  backgroundSub: "Upload a fun image or pick a preset to make your invoice unique",
  uploadBackground: "Upload Background",
  backgroundPresets: "Cute Presets",
  backgroundOpacity: "Image Opacity",
  backgroundOverlay: "Color Overlay",
  backgroundOverlayHint: "Color layer on top of image so text stays readable",
  backgroundSize: "Display Mode",
  backgroundPosition: "Image Position",
  backgroundPositionX: "Horizontal",
  backgroundPositionY: "Vertical",
  backgroundPosCenter: "Center",
  backgroundPosTop: "Top",
  backgroundPosBottom: "Bottom",
  backgroundPosLeft: "Left",
  backgroundPosRight: "Right",
  enableBackground: "Enable background image",
  addWatermark: "Add Watermark",
  watermarkSub: "Customize watermark for your invoice",
  watermarkHint: "Text watermark hides when image watermark is active",
  uploadWatermark: "Upload Watermark",
  deleteImage: "Remove image",
  fontSearch: "Search fonts...",
  fontsAvailable: "fonts",
  signatureSettings: "Signature (TTD)",
  signatureSettingsSub: "Set font, upload signature image, and document display",
  uploadSignature: "Upload Signature Image",
  signatureImageHint: "Optional — uploaded image replaces cursive signature text",
  showSignatureOnDoc: "Show signature block on document",
  previewSignature: "Signature Preview",
  signatureTitle: "Title / Position",
  signatureTitlePlaceholder: "Director / Manager / etc.",
  yourNamePlaceholder: "Signatory name",
  watermarkConfig: "Watermark Settings",
  showQrisOnInvoice: "Show QRIS on invoice",
  donationMessage:
    "Thanks for using Invoi! Free, no ads, for everyone. If it's helpful and you want to support the dev, buy them a coffee.",
  donationButton: "Buy Developer a Coffee ☕ (Rp 1,000)",
  donationGoalLabel: "Goal",
  donationGoalReached: "{percent}%",
  mayGoalReached: "This month's goal has been reached! 🎉",
  thankYou: "Thank you for your support! 🤍",
  haloUser: "Hello, {name}!",
  downloadTitle: "Download Document",
  downloadSub: "Save your document in multiple formats",
  downloadPdfDesc: "Download document as PDF",
  downloadJpgDesc: "Download document as JPG",
  downloadPngDesc: "Download document as PNG",
  cleanResultHint: "Cleaner result when downloaded",
  live: "Live",
  detailInvoice: "Invoice Details",
  reset: "Reset",
  newDocConfirm: "Create new document? Form data will be cleared.",
  itemCount: "Element Count",
  inventoryCount: "Inventory Product Count",
  totalSize: "Total Size",
  brandDataSize: "Your Brand Data Size",
  memoryLimitWarning:
    "Memory has exceeded the maximum limit; your brand data in the browser may be lost at any time without notice",
  resetBrowserDataSub: "All data will be deleted and the app will reload. Are you sure?",
  inventoryEmptyHint:
    "Inventory is empty. Add products first to sync to invoice. Open the Brand tab to manage inventory.",
  inventorySyncHint: "Pick items from inventory to auto-fill name and price",
  welcomePrefix: "hey, welcome to",
  welcomeLead: "this app is literally",
  welcomeFree: "100% FREE",
  welcomeMid: "for anyone who wants to create invoices easily and quickly.",
  welcomeForbidden: "FORBIDDEN",
  welcomeEnd: "to be resold in any form.",
  welcomeSupport: "Support development by sharing with friends and following",
  welcomeSupportSuffix: "on X 💚",
  startNow: "Start now",
  developer: "Developer",
  follow: "Follow",
  supporters: "Supporters",
  feature1: "Dynamic QRIS",
  feature1Sub: "Scan & pay automatically matching the total.",
  feature2: "210+ Themes & BG",
  feature2Sub: "Upload background images + 36 invoice & 24 signature fonts.",
  feature3: "Private & Safe",
  feature3Sub: "Data stays local, not on a server.",
  downloadSuccess: "Downloaded successfully!",
  resetBrowserData: "Reset Browser Data",
  cancel: "Cancel",
  confirmReset: "Yes, Reset",
  enableOtherCosts: "Enable additional costs",
  discountTaxTitle: "Discount & Tax",
  paymentClosingTitle: "Payment & Closing",
  itemNamePlaceholder: "Item name",
  durationPlaceholder: "XX Days",
  inventoryModeManualDesc: "Type product name and price manually on each line.",
  inventoryPriceFromInventory: "Price follows inventory — cannot edit manually.",
  inventoryPageSub: "Manage your product & service list here",
  inventoryLocalNote: "Data is stored in your browser. Save backups regularly.",
  backToInvoice: "Back to Invoice",
  inventoryDescription: "Description / Notes",
  deleteProduct: "Delete",
  newProduct: "New product",
  subBrandPlaceholder: "Your brand slogan / tagline",
  subBrand2Placeholder: "Email, phone, or full address",
  logoHint: "Use 1:1 ratio for best results (PNG/JPG)",
  logoUploaded: "Logo uploaded",
  watermarkTextPlaceholder: "Leave empty if you don't want text...",
  qrisHint: "Upload official QRIS image from your merchant",
  qrisErrorRead: "QR not readable — try a clearer image",
  qrisErrorLoad: "Failed to load QRIS image",
  changeImage: "Change image",
  deleteQris: "Remove QRIS",
  otherCostPlaceholder: "Shipping / Admin fee",
  bankNamePlaceholder: "BCA / Mandiri / etc.",
  bankAccountPlaceholder: "1234567890 a.n. ...",
  inventorySaveData: "Save Data",
  inventoryLoadData: "Load Data",
  tutorialInventoryTitle: "How Inventory Works",
  tutorialSection1Title: "1. Manage Products",
  tutorialSection1Body:
    "Add new products via Add Product. Fill name, price, unit, and description. Data auto-saves in your browser.",
  tutorialSection2Title: "2. Sync to Invoice",
  tutorialSection2Body:
    "On the Invoice tab, enable Sync Inventory mode then pick items from the dropdown. Name and price fill automatically.",
  tutorialSection3Title: "3. Backup Data",
  tutorialSection3Body:
    "Regularly click Save Data to download a JSON file. Restore anytime via Load Data — especially after inventory updates.",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  zoomReset: "Reset zoom",
  zoomFit: "Fit larger",
  inventoryFullPage: "Full page",
  newDocTitle: "New Document",
  invalidBackupFile: "Invalid file. Make sure it's an Invoi JSON backup.",
  faqNoLogin: "Do I need to sign up or log in?",
  faqNoLoginAnswer:
    "Nope. Invoi works instantly. All data stays in your browser (localStorage), not on our servers.",
  faqNoAccount: "Why is there no login?",
  faqNoAccountAnswer:
    "Invoi is built to work without an account. Data stays in your browser — back up regularly via Save Data.",
  loading: "Loading...",
  dismiss: "Dismiss",
  storageQuotaTitle: "Browser storage is full",
  storageQuotaAction: "Open Export tab → Save Data",
};

const dict: Record<Locale, Dictionary> = { id, en };

export function getDictionary(locale: Locale): Dictionary {
  return dict[locale];
}