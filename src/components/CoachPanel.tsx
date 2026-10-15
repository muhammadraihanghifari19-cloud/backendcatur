/**
 * Panel AI Coach — placeholder.
 *
 * Logika AI (saran langkah, analisis, materi belajar) BELUM diimplementasikan.
 * Komponen ini sengaja dibuat sebagai kerangka agar fitur AI mudah ditambahkan
 * nanti tanpa mengubah layout utama. Lihat juga src/services/coach.ts.
 */
export default function CoachPanel() {
  return (
    <section className="panel coach-panel">
      <header className="panel__header">
        <h2 className="panel__title">
          <span className="coach-panel__spark" aria-hidden>✦</span>
          AI Coach
        </h2>
        <span className="badge badge--soon">Segera Hadir</span>
      </header>

      <div className="coach-panel__body">
        <p className="coach-panel__intro">
          Asisten AI akan menganalisis posisimu, menyarankan langkah terbaik, dan
          menjelaskan ide di balik setiap langkah untuk membantumu belajar.
        </p>

        <ul className="coach-feature-list">
          <li>Saran langkah terbaik secara real-time</li>
          <li>Penjelasan strategi dengan bahasa sederhana</li>
          <li>Analisis kesalahan setelah permainan</li>
          <li>Latihan taktik yang disesuaikan levelmu</li>
        </ul>

        <button className="btn btn--primary btn--block" disabled>
          Minta Saran AI
        </button>
        <p className="coach-panel__note">
          Fitur ini akan aktif pada pembaruan berikutnya.
        </p>
      </div>
    </section>
  )
}
