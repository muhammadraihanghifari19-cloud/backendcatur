# Chess Coach AI

Website untuk **bermain catur sekaligus belajar catur**. Papan catur interaktif
yang bisa dimainkan penuh, dengan tampilan modern dan panel AI Coach yang
disiapkan untuk fitur pembelajaran berbasis AI (akan datang).

## Fitur

- ♟️ Papan catur yang bisa dimainkan (drag-and-drop maupun klik).
- ✅ Aturan catur lengkap: langkah legal, skak, skakmat, seri, stalemate.
- 💡 Highlight langkah legal saat sebuah bidak dipilih.
- 📜 Riwayat langkah dalam notasi catur standar (SAN).
- 🔁 Tombol **Ulangi Permainan** dan **Batalkan Langkah**.
- ✦ Panel **AI Coach** (placeholder, siap diisi fitur AI nanti).

## Teknologi

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) sebagai build tool
- [chess.js](https://github.com/jhlywa/chess.js) untuk logika & aturan catur
- [react-chessboard](https://github.com/Clariity/react-chessboard) untuk UI papan

## Menjalankan

```bash
npm install     # pasang dependency (sekali saja)
npm run dev      # jalankan di http://localhost:5173
```

Perintah lain:

```bash
npm run build    # build produksi ke folder dist/
npm run preview  # preview hasil build
```

## Struktur Proyek

```
src/
├─ components/
│  ├─ ChessBoard.tsx   # papan catur interaktif
│  ├─ GamePanel.tsx    # status, riwayat langkah, tombol kontrol
│  └─ CoachPanel.tsx   # panel AI Coach (placeholder)
├─ hooks/
│  └─ useChessGame.ts  # semua logika permainan (chess.js)
├─ services/
│  └─ coach.ts         # kontrak layanan AI Coach (belum diimplementasi)
├─ styles/             # CSS tema gelap modern
├─ App.tsx             # merangkai seluruh UI
└─ main.tsx            # entry point
```

## Rencana Berikutnya: AI Coach

Kerangka sudah disiapkan di `src/services/coach.ts` dengan dua fungsi:

- `getSuggestion(fen)` — menyarankan langkah terbaik.
- `explainPosition(fen)` — menjelaskan posisi secara edukatif.

Keduanya masih mengembalikan nilai kosong. Saat AI ditambahkan, cukup isi
implementasi di sana (misalnya memanggil engine seperti Stockfish atau model
bahasa) tanpa perlu mengubah komponen UI.
