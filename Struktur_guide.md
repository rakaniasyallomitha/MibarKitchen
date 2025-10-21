# 📂 Panduan Setup Struktur Folder

## 🎯 Langkah Mudah Setup

### Step 1: Buat Folder Utama
```
Buat folder baru bernama: mibar-kitchen
```

### Step 2: Buat Struktur Folder
Di dalam folder `mibar-kitchen`, buat struktur seperti ini:

```
mibar-kitchen/
│
├── index.html          ← Copy dari artifact
├── checkout.html       ← Copy dari artifact  
├── admin.html          ← Copy dari artifact
├── style.css           ← Copy dari artifact
├── script.js           ← Copy dari artifact
├── firebase.js         ← Kamu buat sendiri nanti
├── README.md           ← Dokumentasi
│
└── assets/
    └── images/
        ├── logo.png        ← Logo Mibar Kitchen (siapkan sendiri)
        ├── promix-1.jpg    ← Foto produk 1 (siapkan sendiri)
        └── promix-2.jpg    ← Foto produk 2 (siapkan sendiri)
```

---

## 📝 Checklist Persiapan

### ✅ File HTML/CSS/JS (5 file)
- [ ] `index.html` - Homepage
- [ ] `checkout.html` - Keranjang & Checkout
- [ ] `admin.html` - Panel Admin
- [ ] `style.css` - Semua styling
- [ ] `script.js` - Logika JavaScript

### ✅ File Gambar (3 file minimum)
- [ ] `assets/images/logo.png` - Logo Mibar Kitchen
- [ ] `assets/images/promix-1.jpg` - Foto produk utama
- [ ] `assets/images/promix-2.jpg` - Foto produk alternatif

### ✅ File Opsional
- [ ] `README.md` - Dokumentasi
- [ ] `firebase.js` - Backend integration (nanti)
- [ ] `.gitignore` - Jika pakai Git

---

## 🖼️ Persiapan Gambar

### Logo (logo.png)
- **Ukuran:** 500x500px (square)
- **Format:** PNG dengan background transparan
- **Ukuran file:** Max 200KB

### Foto Produk (promix-1.jpg, promix-2.jpg)
- **Ukuran:** 800x600px atau 1200x900px
- **Format:** JPG atau PNG
- **Orientasi:** Landscape (horizontal)
- **Ukuran file:** Max 500KB per gambar
- **Tips:** 
  - Gambar 1: Produk dari depan
  - Gambar 2: Produk dari angle berbeda atau saat dimasak

### Cara Optimize Gambar
1. Pakai [TinyPNG.com](https://tinypng.com) untuk compress
2. Atau pakai [Squoosh.app](https://squoosh.app)

---

## 🚀 Cara Copy File dari Artifact

### Untuk setiap file HTML/CSS/JS:

1. **Buka artifact** yang sudah saya buat
2. **Select All** (Ctrl+A)
3. **Copy** (Ctrl+C)
4. **Buat file baru** di text editor (VS Code, Notepad++, dll)
5. **Paste** (Ctrl+V)
6. **Save** dengan nama yang sesuai

Contoh:
- Artifact "index.html" → Save as `index.html`
- Artifact "style.css" → Save as `style.css`
- Dan seterusnya...

---

## 🔧 Text Editor yang Disarankan

### Pilihan Terbaik:
1. **Visual Studio Code** (RECOMMENDED)
   - Download: [code.visualstudio.com](https://code.visualstudio.com)
   - Install extension: Live Server

2. **Sublime Text**
   - Download: [sublimetext.com](https://www.sublimetext.com)

3. **Notepad++** (Windows only)
   - Download: [notepad-plus-plus.org](https://notepad-plus-plus.org)

---

## 🌐 Cara Jalankan Website

### Method 1: Double Click (Paling Mudah)
1. Buka folder `mibar-kitchen`
2. Double click `index.html`
3. Website terbuka di browser

### Method 2: Live Server (VS Code)
1. Install extension **Live Server** di VS Code
2. Right click di `index.html`
3. Pilih "Open with Live Server"
4. Website auto-reload saat edit!

### Method 3: Python Server
```bash
cd mibar-kitchen
python -m http.server 8000
```
Buka browser: `http://localhost:8000`

---

## 🎨 Quick Customization

### Ubah Logo
1. Siapkan logo baru (PNG transparan)
2. Rename jadi `logo.png`
3. Taruh di `assets/images/`
4. Replace file lama

### Ubah Foto Produk
1. Siapkan 2 foto produk
2. Rename: `promix-1.jpg` dan `promix-2.jpg`
3. Taruh di `assets/images/`
4. Replace file lama

### Ubah Harga
Buka `index.html`, cari:
```html
data-price="21000"
```
Ganti jadi harga yang kamu mau (dalam Rupiah, tanpa titik)

### Ubah Nomor HP/Rekening
Buka `script.js`, cari bagian:
```javascript
const CONFIG = {
    whatsappNumber: '6287875110992',  // GANTI DISINI
    ...
};

const ACCOUNTS = {
    dana: {
        number: '087875110992',  // GANTI DISINI
        ...
    }
};
```

---

## 🐛 Common Problems & Solutions

### Problem: Gambar tidak muncul
**Solution:**
- Cek path: harus `assets/images/logo.png` (huruf kecil semua)
- Cek nama file: `logo.png` BUKAN `Logo.PNG`
- Cek ekstensi: `.jpg` atau `.png` saja

### Problem: Cart tidak berfungsi
**Solution:**
- Buka Console (F12)
- Lihat error
- Clear localStorage:
  ```javascript
  localStorage.clear();
  location.reload();
  ```

### Problem: Admin tidak bisa login
**Solution:**
- Pastikan ketik: `bubunadmin` (semua huruf kecil)
- Clear cache browser (Ctrl + Shift + Delete)

### Problem: Warna tidak sesuai
**Solution:**
- Buka `style.css`
- Edit bagian `:root` (baris paling atas)
- Ganti kode warna

---

## 📱 Test Responsiveness

Setelah setup, test di:
1. **Desktop** - Full browser window
2. **Mobile** - Chrome DevTools (F12) → Toggle device toolbar
3. **Tablet** - Ubah viewport size

Shortcut Chrome DevTools:
- `Ctrl + Shift + M` - Toggle mobile view
- `Ctrl + Shift + C` - Inspect element

---

## 🎯 Prioritas Setup

### High Priority (Wajib)
1. ✅ Copy 5 file HTML/CSS/JS
2. ✅ Buat folder `assets/images/`
3. ✅ Siapkan logo & foto produk
4. ✅ Test buka `index.html`

### Medium Priority
5. ✅ Ubah nomor HP/rekening
6. ✅ Ubah harga produk
7. ✅ Test fitur cart & checkout

### Low Priority (Nanti)
8. ✅ Buat firebase.js
9. ✅ Deploy online
10. ✅ Custom domain

---

## 📞 Need Help?

Jika ada masalah saat setup:
1. Cek dokumentasi `README.md`
2. Lihat Console browser (F12) untuk error
3. Google error message
4. Tanya di komunitas developer

---

## 🎉 Next Steps Setelah Setup

1. ✅ Test semua fitur (cart, checkout, admin)
2. ✅ Isi dengan data produk real
3. ✅ Ambil foto produk yang bagus
4. ✅ Deploy online (GitHub Pages / Netlify)
5. ✅ Share link ke pelanggan!

---

**Good Luck! 🚀 Website-mu akan keren!**