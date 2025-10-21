# 🍗 Mibar Kitchen Website

> "Gigitan Kecil, Rasa Besar - Promix Nugget Bites!"

Website e-commerce untuk **Mibar Kitchen** yang menjual nugget tempe ayam premium tanpa pengawet.

---

## 📁 Struktur Folder

```
mibar-kitchen/
├── index.html              # Halaman utama (beranda & produk)
├── checkout.html           # Halaman keranjang & checkout
├── admin.html              # Panel admin (protected)
├── style.css               # All styling dalam 1 file
├── script.js               # Logika JavaScript utama
├── firebase.js             # (Kamu buat sendiri untuk backend)
├── README.md               # Dokumentasi ini
└── assets/
    └── images/
        ├── logo.png        # Logo Mibar Kitchen
        ├── promix-1.jpg    # Gambar produk 1
        └── promix-2.jpg    # Gambar produk 2
```

---

## 🎨 Fitur Utama

### 🏠 **Halaman Utama (index.html)**
- ✅ Hero section dengan tagline premium
- ✅ Katalog produk dengan image slider (2 gambar per produk)
  - Auto-slide setiap 3 detik
  - Navigasi arrow (prev/next)
  - Dots indicator
- ✅ Detail produk dalam modal:
  - Komposisi
  - Nilai gizi lengkap
  - Cara penyajian
- ✅ Tombol "Tambah ke Keranjang"
- ✅ Section "Tentang Kami" (Visi & Misi)
- ✅ Admin trigger tersembunyi di footer (klik 5x cepat)

### 🛒 **Halaman Checkout (checkout.html)**
- ✅ Tampilan keranjang belanja
- ✅ Kontrol quantity (+/-)
- ✅ Hapus item dari keranjang
- ✅ Form data pelanggan
- ✅ Pilihan metode pembayaran:
  - 💳 Transfer DANA
  - 🏦 Transfer MANDIRI
  - 💵 COD (Cash on Delivery)
- ✅ Generate kode pesanan otomatis
- ✅ Tampilkan nomor rekening setelah konfirmasi
- ✅ Tombol WhatsApp otomatis

### 👨‍💼 **Panel Admin (admin.html)**
- ✅ Login dengan passphrase: `bubunadmin`
- ✅ Dashboard statistik:
  - Total pesanan
  - Pesanan pending
  - Total pendapatan
- ✅ Tabel daftar pesanan
- ✅ Filter by status
- ✅ Detail pesanan
- ✅ Update status pesanan

---

## 🎨 Palet Warna

```css
Primary Orange:  #ff8c42  /* Warna utama brand */
Primary Dark:    #ff6b1a  /* Orange gelap */
Saddle Brown:    #8b4513  /* Coklat aksen (BARU!) */
Brown Dark:      #6b3410  /* Coklat gelap */
Cream:           #fff5e6  /* Background terang */
Cream Light:     #fffbf5  /* Background super terang */
```

**Penggunaan Saddle Brown (#8b4513):**
- Button "Tambah ke Keranjang"
- Judul section
- Hover effects
- Footer background
- Admin navbar

---

## ⚙️ Konfigurasi

### 📝 **Ubah Harga Produk**
Di `index.html`, cari button dengan `data-price`:
```html
<button class="btn btn-add-cart" 
        data-id="promix-bites" 
        data-name="Promix Chicken Bites" 
        data-price="21000"  <!-- UBAH DISINI -->
        data-image="assets/images/promix-1.jpg">
```

### 💳 **Ubah Nomor Rekening**
Di `script.js`, bagian atas:
```javascript
const ACCOUNTS = {
    dana: {
        number: '087875110992',      // Ganti nomor DANA
        name: 'Mibar Kitchen'         // Ganti nama penerima
    },
    mandiri: {
        number: '1610015070274',      // Ganti nomor MANDIRI
        name: 'Mibar Kitchen'
    }
};
```

### 📱 **Ubah Nomor WhatsApp**
Di `script.js`:
```javascript
const CONFIG = {
    adminPassphrase: 'bubunadmin',
    whatsappNumber: '6287875110992',  // Ganti nomor WA (format: 62xxx)
    deliveryDays: '1-2 hari kerja'
};
```

### 🔐 **Ubah Password Admin**
Di `script.js`:
```javascript
const CONFIG = {
    adminPassphrase: 'bubunadmin',  // Ganti password admin
    ...
};
```

---

## 🚀 Cara Menjalankan

### 1️⃣ **Lokal (Tanpa Server)**
1. Download semua file
2. Pastikan struktur folder sesuai
3. Buka `index.html` dengan browser
4. Selesai! Website sudah jalan

### 2️⃣ **Online (GitHub Pages)**
1. Buat repository baru di GitHub
2. Upload semua file
3. Ke Settings → Pages
4. Source: pilih `main` branch
5. Save, tunggu beberapa menit
6. Website online di: `https://username.github.io/repo-name`

### 3️⃣ **Online (Netlify)**
1. Drag & drop folder ke [Netlify Drop](https://app.netlify.com/drop)
2. Website langsung online!
3. Custom domain bisa diatur gratis

---

## 📱 Responsiveness

Website **full responsive** untuk:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1024px)
- 📱 Mobile (< 768px)

---

## 🔒 Keamanan

⚠️ **PENTING:**
- Data disimpan di **localStorage** (browser)
- Tidak ada backend/database real
- Untuk production, gunakan Firebase/backend nyata
- Passphrase admin tersimpan di JavaScript (tidak aman untuk production)

---

## 🎯 Cara Akses Admin

### Metode 1: URL Langsung
Ketik di browser:
```
http://localhost/admin.html
```

### Metode 2: Hidden Button
1. Buka halaman utama (index.html)
2. Scroll ke footer
3. Klik **5x cepat** di pojok kanan bawah footer (area kosong)
4. Otomatis redirect ke admin.html

### Login Admin
- **Passphrase:** `bubunadmin`

---

## 📦 Data Storage

Semua data disimpan di **localStorage** browser:

| Key | Isi |
|-----|-----|
| `mibar_cart` | Data keranjang belanja |
| `mibar_orders` | Data semua pesanan |
| `mibar_admin_logged` | Status login admin |

### Cara Reset Data
Buka Console browser (F12), ketik:
```javascript
localStorage.clear();
location.reload();
```

---

## 🎨 Customization Ideas

### Tambah Produk Baru
1. Copy-paste HTML product card di `index.html`
2. Ubah `data-id`, `data-name`, `data-price`
3. Tambahkan gambar di `assets/images/`
4. Update detail di modal

### Ubah Warna
Edit di `style.css`, bagian `:root`:
```css
:root {
    --primary-orange: #ff8c42;  /* Ubah warna utama */
    --saddle-brown: #8b4513;    /* Ubah aksen */
}
```

### Tambah Payment Method
1. Edit HTML di `checkout.html` (section payment-methods)
2. Update logic di `script.js` → function `showOrderConfirmation()`

---

## 🐛 Troubleshooting

### Gambar Tidak Muncul?
- Pastikan path benar: `assets/images/logo.png`
- Cek case sensitive (Linux/Mac)
- Format: JPG, PNG, WebP

### Cart Tidak Update?
- Clear localStorage
- Refresh browser (Ctrl + F5)

### Admin Tidak Bisa Login?
- Cek passphrase: `bubunadmin` (case sensitive)
- Clear localStorage
- Cek Console untuk error

---

## 📞 Support

**Developer:** Tim Mibar Kitchen  
**WhatsApp:** 087875110992  
**Email:** mibarkitchen@gmail.com

---

## 📝 Changelog

### Version 1.0 (15 Oktober 2025)
- ✅ Initial release
- ✅ Homepage dengan slider
- ✅ Checkout system
- ✅ Admin panel
- ✅ Responsive design
- ✅ localStorage integration
- ✅ WhatsApp integration

---

## 📄 License

© 2025 Mibar Kitchen. All rights reserved.

---

## 🚧 Next Steps (Untuk Firebase.js)

Kamu perlu buat `firebase.js` untuk:
1. 🔥 Real-time database (Firebase Firestore)
2. 📸 Image storage (Firebase Storage)
3. 🔐 Authentication admin
4. 📧 Email notifications
5. 💾 Backup data

**Struktur yang disarankan:**
```javascript
// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    // Config dari Firebase Console
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
```

---

**Happy Coding! 🚀**