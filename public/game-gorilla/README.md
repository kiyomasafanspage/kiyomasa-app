# 🦍 Kiyomasa Holder Hub · 清正 Community Tracker

Web app satu halaman + mini game yang **dikunci khusus holder** untuk token **Kiyomasa (清正)**
di Solana. Hanya wallet yang **memegang token** yang bisa masuk. Di dalamnya, holder mendapat
**menu utama**, game **Gorilla Tomato Farm**, **leaderboard mingguan untuk airdrop**, dan **profil**.

- **Stack:** HTML + Tailwind CSS (CDN) + JavaScript vanilla + Animate.css (CDN). Tanpa proses build.
- **Mint token (CA):** `ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump` *(SPL **Token-2022**)*
- **Penyimpanan:** **Supabase** (bersama, multi-perangkat) bila dikonfigurasi, atau otomatis
  fallback ke `localStorage` (single-device) bila tidak.

---

## ▶️ Cara menjalankan (PENTING — jangan double-click filenya)

Pengecekan holder memanggil **RPC Solana**. RPC publik **menolak permintaan `file://`**
(CORS / `Origin: null`), jadi kalau kamu cuma double-click `index.html` akan muncul:

> 🚫 Could not reach Solana…

Kamu harus menyajikan folder ini lewat **http://**. Pilih salah satu:

### Opsi 1 — VS Code "Live Server" (paling mudah)
1. Install ekstensi **Live Server**.
2. Klik kanan `index.html` → **Open with Live Server**.

### Opsi 2 — Node
```bash
npx serve .
# lalu buka http://localhost:3000 yang muncul
```

### Opsi 3 — Python
```bash
python -m http.server 8000
# lalu buka http://localhost:8000
```

Begitu berjalan di `http://localhost…`, pengecek wallet akan berfungsi.

---

## 🌐 RPC Solana (Helius disarankan)

Endpoint default `https://api.mainnet-beta.solana.com` dipakai bersama-sama dan sering
kena rate-limit. Di layar awal, buka **⚙️ Advanced → custom RPC endpoint** lalu tempel URL
milikmu (disimpan lokal). Gratis & bekerja baik dari browser:

- **Helius** – https://helius.dev → buat API key gratis →
  `https://mainnet.helius-rpc.com/?api-key=KEY_KAMU`
- **QuickNode** – https://quicknode.com → URL endpoint Solana gratis.

Endpoint khusus juga membuat **refresh leaderboard** (yang mengambil banyak wallet) jauh lebih andal.

---

## 🎮 Fitur

| Layar | Fungsinya |
| --- | --- |
| **Holder Gate** | Tempel alamat wallet Solana → cek saldo Kiyomasa via RPC. `balance > 0` membuka akses. Non-holder diblokir. Background branding Kiyomasa ("Real CTO"). |
| **Registrasi** | Holder baru membuat username (≤20 karakter, emoji boleh) + emoji avatar + bio opsional. **Username unik global.** |
| **Menu Utama** | Background gorila + maskot beranimasi → Play / Leaderboard / Profile. |
| **Game Farm** | Plant → Water → Harvest tomat → Feed gorila. Hunger/Happiness, XP & level, siang/malam, efek. Disimpan per-wallet. |
| **Leaderboard** | 30 holder teratas berdasarkan kepemilikan, label minggu (ISO week), refresh saldo, + kartu **🎁 Pemenang Minggu Lalu** (arsip airdrop). |
| **Profil** | Username, wallet disingkat + tombol copy, saldo terkini, tanggal gabung, badge Verified Holder, refresh / edit. |

### Cara kerja pengecekan saldo
Aplikasi memanggil metode JSON-RPC standar **`getTokenAccountsByOwner`** dengan filter mint
Kiyomasa, lalu menjumlahkan `uiAmount` tiap akun (sudah disesuaikan desimal). Kiyomasa adalah
mint **SPL Token-2022** — filter mint mengembalikan akun Token-2022-nya dengan benar.

---

## 🗂️ Struktur proyek

```
game-gorilla/
├── index.html                 # seluruh aplikasi (markup + style + JS)
├── README.md                  # file ini
├── supabase/
│   ├── schema.sql             # tabel + fungsi unik-username + RLS + pg_cron mingguan
│   └── functions/
│       └── snapshot-holders/  # Edge Function: snapshot saldo on-chain (airdrop)
└── assets/
    ├── background menu utama/ # background branding (landing / menu)
    ├── assets ui/             # latar siang / malam game
    └── clean/                 # sprite PNG transparan yang dipakai aplikasi
```

File `assets/clean/*.png` adalah versi transparan dari JPG aslinya (gambar asli punya latar
putih/kotak-kotak yang tidak bisa dibuat transparan karena format JPG).

---

## ⭐ Mengaktifkan leaderboard bersama — Supabase (tanpa server sendiri)

Cukup **1 domain**, tanpa menjalankan server. Website statis memanggil **Supabase** langsung dari
browser → memberi **leaderboard bersama**, **username unik global**, dan **arsip mingguan otomatis**
untuk airdrop. Gratis.

### Langkah setup (sekali saja)

1. Buat akun + project gratis di **[supabase.com](https://supabase.com)**.
2. Buka **SQL Editor** → tempel seluruh isi [`supabase/schema.sql`](./supabase/schema.sql) → **Run**.
   Ini membuat tabel `holders` + `weekly_results`, fungsi unik-username, RLS, dan job
   **pg_cron** yang mengarsipkan ranking tiap **Senin 00:05 UTC** ke `weekly_results`
   (= daftar airdrop mingguan yang muncul di kartu "Pemenang Minggu Lalu").
3. Buka **Project Settings → API**, salin **Project URL** dan **anon public key**.
4. Sambungkan ke website — pilih salah satu:
   - **Edit file:** di `index.html`, isi dua konstanta ini:
     ```js
     const SUPABASE_URL      = 'https://xxxx.supabase.co';
     const SUPABASE_ANON_KEY = 'eyJhbGci...';   // anon public key
     ```
   - **Atau tanpa edit file** (lewat Console browser, tersimpan lokal):
     ```js
     localStorage.setItem('kiyomasa_sb_url', 'https://xxxx.supabase.co');
     localStorage.setItem('kiyomasa_sb_key', 'eyJhbGci...');
     ```
5. Selesai. Buka website (lewat http, bukan `file://`), registrasi → datanya kini **tersimpan
   di Supabase dan tampil untuk semua orang**.

> Jika kedua konstanta dikosongkan, website otomatis jalan di **mode localStorage**
> (single-device) seperti semula — jadi tidak akan error.

### ⚠️ Penting untuk keadilan airdrop

Saldo di leaderboard ditulis oleh browser, jadi sifatnya *best-effort* dan **bisa diakali**.
Untuk **daftar pembayaran airdrop yang tepercaya**, jangan pakai angka itu mentah-mentah.
Gunakan **Edge Function** [`supabase/functions/snapshot-holders`](./supabase/functions/snapshot-holders/index.ts)
yang mengecek ulang saldo **asli on-chain** (via Helius) untuk semua wallet terdaftar, lalu
menyimpan snapshot mingguan terverifikasi. Deploy & set rahasianya:

```bash
supabase functions deploy snapshot-holders --no-verify-jwt
supabase secrets set SOLANA_RPC_URL="https://mainnet.helius-rpc.com/?api-key=KEY_KAMU"
supabase secrets set TOKEN_MINT="ANP1wJHYWYQPfrZvg8FnjduwfBVJhRV3xqKcs3yapump"
```

Lalu jadwalkan mingguan (Dashboard → Edge Functions → Schedules, atau pg_cron). Output di tabel
`weekly_results` itulah **daftar pemenang airdrop** yang sah, dan otomatis tampil di kartu
"🎁 Pemenang Minggu Lalu".

---

## 🔌 Menyambungkan ke website utama Kiyomasa

Karena ini cuma file statis + Supabase, kamu bisa:
- taruh `index.html` di subfolder/subpath domainmu (mis. `kiyomasa.xyz/hub`), atau
- tautkan dari menu website utama, atau
- sematkan via `<iframe>`.

Semua tetap **1 domain**, tanpa server tambahan.

---

## ⚠️ Catatan keamanan (baca sebelum rilis)

Sesuai desain, akses dilakukan dengan **menempel alamat publik** (tanpa connect wallet). Gate
membuktikan wallet yang ditempel **memegang token** — tetapi **tidak** membuktikan pengunjung
benar-benar *memiliki* wallet itu, jadi secara teori seseorang bisa menempel alamat publik holder
lain. Ini trade-off yang diterima demi tool komunitas yang tanpa hambatan. Yang tetap dijaga:

- wallet harus benar-benar memegang token untuk bisa registrasi (dicek via RPC), dan
- **username unik secara global** (tidak peduli huruf besar/kecil) — ditegakkan oleh fungsi +
  unique index di Supabase, jadi tidak ada dua orang memakai nama sama.

Untuk airdrop, gunakan snapshot on-chain (Edge Function di atas) sebagai sumber pembayaran, bukan
angka leaderboard mentah.

---

## 📜 Disclaimer

Ini adalah **tool komunitas penggemar**. Tidak berafiliasi dengan tim resmi Kiyomasa.
Selalu **DYOR**. Bukan nasihat finansial.
