import { useCallback, useMemo, useRef, useState } from 'react'
import { Chess, type Square } from 'chess.js'

export type GameStatus =
  | 'playing'
  | 'check'
  | 'checkmate'
  | 'stalemate'
  | 'draw'

export interface MoveResult {
  ok: boolean
  /** True jika langkah membutuhkan promosi pion. */
  needsPromotion?: boolean
}

export interface ChessGameState {
  /** Posisi papan dalam notasi FEN. */
  fen: string
  /** Giliran saat ini: 'w' (putih) atau 'b' (hitam). */
  turn: 'w' | 'b'
  /** Status permainan saat ini. */
  status: GameStatus
  /** Daftar langkah dalam notasi SAN, cth: ['e4', 'e5', 'Nf3']. */
  history: string[]
  /** True jika permainan sudah selesai. */
  isGameOver: boolean
  /** Pemenang bila ada: 'w', 'b', atau null (seri/belum selesai). */
  winner: 'w' | 'b' | null
}

/**
 * Mengubah instance Chess menjadi snapshot state yang mudah dipakai komponen.
 */
function readState(game: Chess): ChessGameState {
  let status: GameStatus = 'playing'
  let winner: 'w' | 'b' | null = null

  if (game.isCheckmate()) {
    status = 'checkmate'
    // Yang terkena skakmat adalah pihak yang sedang giliran, lawannya menang.
    winner = game.turn() === 'w' ? 'b' : 'w'
  } else if (game.isStalemate()) {
    status = 'stalemate'
  } else if (game.isDraw()) {
    status = 'draw'
  } else if (game.isCheck()) {
    status = 'check'
  }

  return {
    fen: game.fen(),
    turn: game.turn(),
    status,
    history: game.history(),
    isGameOver: game.isGameOver(),
    winner,
  }
}

/**
 * Hook yang membungkus semua logika permainan catur menggunakan chess.js.
 * Komponen UI cukup memakai state dan fungsi yang dikembalikan di sini.
 */
export function useChessGame() {
  // Satu instance Chess yang bertahan selama komponen hidup.
  const gameRef = useRef<Chess>(new Chess())
  const [state, setState] = useState<ChessGameState>(() => readState(gameRef.current))

  const sync = useCallback(() => {
    setState(readState(gameRef.current))
  }, [])

  /**
   * Mencoba menjalankan langkah dari satu kotak ke kotak lain.
   * Promosi default ke ratu (queen) bila tidak ditentukan.
   */
  const makeMove = useCallback(
    (from: Square, to: Square, promotion: 'q' | 'r' | 'b' | 'n' = 'q'): MoveResult => {
      try {
        const move = gameRef.current.move({ from, to, promotion })
        if (!move) return { ok: false }
        sync()
        return { ok: true }
      } catch {
        // chess.js melempar error untuk langkah ilegal.
        return { ok: false }
      }
    },
    [sync],
  )

  /** Daftar kotak tujuan legal dari sebuah kotak asal, untuk highlight. */
  const legalMovesFrom = useCallback((square: Square): Square[] => {
    const moves = gameRef.current.moves({ square, verbose: true })
    return moves.map((m) => m.to as Square)
  }, [])

  /** Mengulang permainan dari posisi awal. */
  const reset = useCallback(() => {
    gameRef.current.reset()
    sync()
  }, [sync])

  /** Membatalkan satu langkah terakhir. */
  const undo = useCallback(() => {
    gameRef.current.undo()
    sync()
  }, [sync])

  return useMemo(
    () => ({
      ...state,
      makeMove,
      legalMovesFrom,
      reset,
      undo,
    }),
    [state, makeMove, legalMovesFrom, reset, undo],
  )
}
