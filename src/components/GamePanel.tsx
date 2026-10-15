import type { GameStatus } from '../hooks/useChessGame'

interface GamePanelProps {
  status: GameStatus
  turn: 'w' | 'b'
  winner: 'w' | 'b' | null
  history: string[]
  isGameOver: boolean
  canUndo: boolean
  onReset: () => void
  onUndo: () => void
}

/** Mengubah status menjadi teks ramah pengguna dalam bahasa Indonesia. */
function statusText(
  status: GameStatus,
  turn: 'w' | 'b',
  winner: 'w' | 'b' | null,
): string {
  const sideName = (s: 'w' | 'b') => (s === 'w' ? 'Putih' : 'Hitam')
  switch (status) {
    case 'checkmate':
      return `Skakmat! ${winner ? sideName(winner) : ''} menang.`
    case 'stalemate':
      return 'Stalemate — permainan seri.'
    case 'draw':
      return 'Permainan berakhir seri.'
    case 'check':
      return `Skak! Giliran ${sideName(turn)}.`
    default:
      return `Giliran ${sideName(turn)}.`
  }
}

/**
 * Mengelompokkan riwayat langkah menjadi pasangan (putih, hitam) per ronde.
 */
function toMovePairs(history: string[]): Array<[string, string?]> {
  const pairs: Array<[string, string?]> = []
  for (let i = 0; i < history.length; i += 2) {
    pairs.push([history[i], history[i + 1]])
  }
  return pairs
}

export default function GamePanel({
  status,
  turn,
  winner,
  history,
  isGameOver,
  canUndo,
  onReset,
  onUndo,
}: GamePanelProps) {
  const pairs = toMovePairs(history)

  return (
    <section className="panel game-panel">
      <header className="panel__header">
        <h2 className="panel__title">Status Permainan</h2>
      </header>

      <div
        className={`status-badge status-badge--${
          isGameOver ? 'over' : status === 'check' ? 'check' : 'active'
        }`}
      >
        {statusText(status, turn, winner)}
      </div>

      <div className="move-history">
        <h3 className="move-history__title">Riwayat Langkah</h3>
        {pairs.length === 0 ? (
          <p className="move-history__empty">Belum ada langkah. Silakan mulai bermain.</p>
        ) : (
          <ol className="move-list">
            {pairs.map(([white, black], index) => (
              <li className="move-row" key={index}>
                <span className="move-row__num">{index + 1}.</span>
                <span className="move-row__ply">{white}</span>
                <span className="move-row__ply">{black ?? ''}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="panel__actions">
        <button className="btn btn--ghost" onClick={onUndo} disabled={!canUndo}>
          Batalkan Langkah
        </button>
        <button className="btn btn--primary" onClick={onReset}>
          Ulangi Permainan
        </button>
      </div>
    </section>
  )
}
