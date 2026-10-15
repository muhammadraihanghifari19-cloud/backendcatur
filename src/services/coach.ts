/**
 * Antarmuka layanan AI Coach (placeholder).
 *
 * Fungsi-fungsi di sini mendefinisikan "kontrak" yang akan dipakai UI untuk
 * meminta saran dari AI. Implementasinya BELUM dibuat sesuai permintaan —
 * untuk saat ini semua mengembalikan nilai kosong/placeholder.
 *
 * Saat AI ditambahkan nanti, cukup isi implementasi fungsi di bawah
 * (mis. memanggil chess engine seperti Stockfish atau model bahasa) tanpa
 * perlu mengubah komponen UI.
 */

export interface CoachSuggestion {
  /** Langkah yang disarankan dalam notasi SAN, cth: "Nf3". */
  move: string
  /** Penjelasan singkat kenapa langkah ini bagus. */
  explanation: string
}

/**
 * Meminta saran langkah terbaik untuk posisi tertentu.
 * @param _fen Posisi papan dalam notasi FEN.
 */
export async function getSuggestion(_fen: string): Promise<CoachSuggestion | null> {
  // TODO: integrasikan engine/AI di sini.
  return null
}

/**
 * Meminta penjelasan edukatif tentang posisi saat ini.
 * @param _fen Posisi papan dalam notasi FEN.
 */
export async function explainPosition(_fen: string): Promise<string> {
  // TODO: integrasikan AI di sini.
  return ''
}
