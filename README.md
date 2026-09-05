# SESIKREASI - Studio Desain Kreatif & Cetak

Website profil usaha studio kreatif dan percetakan modern **SESIKREASI** berbasis *pure client-side* (HTML5, CSS3, dan Vanilla JavaScript). Siap di-deploy langsung menggunakan **GitHub Pages** tanpa perlu konfigurasi server khusus.

---

## 📁 Struktur File Proyek

```text
├── index.html     # Halaman Utama (Beranda, Layanan, Portofolio, Kontak, dan Widget Chatbot)
├── admin.html     # Dashboard Admin (Kelola Layanan, Pencatatan Pesanan, dan Ringkasan Total Pendapatan)
├── style.css      # Stylesheet Responsif Mobile-First dengan Skema Warna Putih, Soft Violet, dan Soft Gray
├── script.js      # Logika Mobile Menu, Chatbot Interaktif, Filter Portofolio, dan Sinkronisasi LocalStorage
└── README.md      # Panduan Deployment GitHub Pages
```

---

## 🚀 Panduan Upload ke GitHub & Mengaktifkan GitHub Pages

Ikuti langkah-langkah berikut untuk meng-online-kan website SESIKREASI secara gratis via GitHub Pages:

### Langkah 1: Buat Repository Baru di GitHub
1. Buka [GitHub.com](https://github.com) dan login ke akun Anda.
2. Klik tombol **New** (atau ikon **+** di pojok kanan atas) lalu pilih **New repository**.
3. Isi kolom **Repository name** (misal: `sesikreasi` atau `sesikreasi-studio`).
4. Pilih opsi **Public**.
5. Jangan centang "Add a README file" (karena Anda sudah memiliki file proyek ini).
6. Klik tombol hijau **Create repository**.

### Langkah 2: Upload File ke Repository
Pilih salah satu cara di bawah ini yang paling mudah:

#### Cara A: Upload Langsung Lewat Browser (Tanpa Git CLI)
1. Pada halaman repository yang baru dibuat, klik tautan **"uploading an existing file"**.
2. Tarik (*drag & drop*) atau pilih file-file berikut:
   - `index.html`
   - `admin.html`
   - `style.css`
   - `script.js`
3. Pada bagian bawah, tulis pesan commit (misal: `Initial release SESIKREASI website`) dan klik **Commit changes**.

#### Cara B: Menggunakan Git Terminal / Command Prompt
Jalankan perintah berikut di folder proyek Anda:
```bash
git init
git add index.html admin.html style.css script.js README.md
git commit -m "Initial commit SESIKREASI website"
git branch -M main
git remote add origin https://github.com/USERNAME-ANDA/NAMA-REPOSITORY.git
git push -u origin main
```
*(Ganti `USERNAME-ANDA` dan `NAMA-REPOSITORY` dengan akun Anda).*

---

### Langkah 3: Mengaktifkan GitHub Pages
1. Di halaman repository GitHub Anda, klik tab **Settings** (ikon roda gigi di bagian atas).
2. Di menu bilah samping kiri (*sidebar*), cari dan klik menu **Pages** (pada bagian *Code and automation*).
3. Pada bagian **Build and deployment**:
   - **Source**: Pilih `Deploy from a branch`.
   - **Branch**: Pilih branch `main` (atau `master`), dan biarkan foldernya pada root `/(root)`.
4. Klik tombol **Save**.
5. Tunggu sekitar 1–2 menit. Segarkan (*refresh*) halaman Settings > Pages tersebut.
6. Link website Anda akan muncul dengan pesan:  
   **"Your site is live at https://USERNAME-ANDA.github.io/NAMA-REPOSITORY/"**

---

## 💡 Fitur Utama

1. **Desain Mobile-First & Responsif**:
   - Skema warna dominan Putih, aksen Soft Violet (`#8A2BE2` / `#A855F7`), dan Soft Gray (`#F3F4F6`).
   - Hamburger menu responsif dengan drawer halus dan touch target jempol yang nyaman (44px+).
2. **Katalog 6 Layanan Lengkap (Grid Simetris)**:
   - Jasa Desain, Cetak Undangan, Print, Label Stiker, Cetak Foto, dan Cetak Custom (Nota NCR, Tiket Acara, dll).
   - Setiap kartu layanan terhubung langsung ke tombol pemesanan WhatsApp dengan teks terformat otomatis.
3. **Widget Chatbot Interaktif**:
   - Floating widget di sudut kanan bawah yang kompak untuk layar HP.
   - Fitur Quick Replies ("Lihat Daftar Layanan", "Cara Pemesanan", "Tanya Harga / Konsultasi", "Lokasi & Jam Buka").
   - Deteksi kata kunci cerdas dan tombol otomatis **"Lanjutkan ke WhatsApp"**.
4. **Dashboard Admin Terproteksi Kata Sandi (`admin.html`)**:
   - **Gerbang Keamanan (Password Gate)**: Akses dashboard dikunci dengan modal kata sandi (*sandi tetap: `RYU1234`*), sehingga pengunjung umum tidak dapat melihat omzet maupun data pesanan. Layar input sandi selalu muncul setiap kali menu admin diklik.
   - **Keamanan Tetap**: Kata sandi admin dikunci permanen pada `RYU1234` untuk mencegah kesalahan pengubahan kata sandi atau penyalahgunaan pihak lain.
   - **Tombol Kunci / Keluar**: Mengunci kembali dashboard secara instan saat selesai mengelola data.
   - **Ringkasan Pendapatan Otomatis**: Menghitung omzet dari pesanan selesai secara real-time.
   - **Kelola Layanan**: Tambah, edit, dan hapus 6 layanan yang langsung memperbarui katalog di `index.html`.
   - **Catatan Pesanan**: Form pencatatan data pembeli, status pengerjaan, dan tombol follow-up WhatsApp langsung.
   - **Pengaturan WhatsApp Studio**: Mengubah nomor tujuan WhatsApp di seluruh website tanpa perlu mengedit kode.
   - **Cadangan Data (Backup & Restore)**: Fitur ekspor/impor JSON via LocalStorage.
