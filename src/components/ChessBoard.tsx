import { useState } from 'react'
import { Chessboard } from 'react-chessboard'
import type { Square } from 'chess.js'

interface ChessBoardProps {
  position: string
  turn: 'w' | 'b'
  isGameOver: boolean
  onMove: (from: Square, to: Square) => boolean
  legalMovesFrom: (square: Square) => Square[]
}

type SquareStyles = Record<string, React.CSSProperties>

const DOT_STYLE: React.CSSProperties = {
  background:
    'radial-gradient(circle, rgba(0,0,0,0.28) 22%, transparent 24%)',
  borderRadius: '50%',
}
const SELECTED_STYLE: React.CSSProperties = {
  background: 'rgba(56, 189, 248, 0.45)',
}

/**
 * Papan catur interaktif. Mendukung dua cara bermain:
 * 1. Drag-and-drop bidak.
 * 2. Klik kotak asal lalu klik kotak tujuan.
 * Langkah legal di-highlight saat sebuah bidak dipilih.
 */
export default function ChessBoard({
  position,
  turn,
  isGameOver,
  onMove,
  legalMovesFrom,
}: ChessBoardProps) {
  const [selected, setSelected] = useState<Square | null>(null)
  const [optionSquares, setOptionSquares] = useState<SquareStyles>({})

  function clearSelection() {
    setSelected(null)
    setOptionSquares({})
  }

  /** Menyorot kotak tujuan legal dari kotak yang dipilih. */
  function showOptions(square: Square): boolean {
    const moves = legalMovesFrom(square)
    if (moves.length === 0) return false

    const styles: SquareStyles = {}
    for (const target of moves) {
      styles[target] = DOT_STYLE
    }
    styles[square] = SELECTED_STYLE
    setOptionSquares(styles)
    return true
  }

  function onSquareClick(square: Square) {
    if (isGameOver) return

    // Belum ada yang dipilih: coba pilih kotak ini.
    if (!selected) {
      if (showOptions(square)) setSelected(square)
      return
    }

    // Klik kotak yang sama: batalkan pilihan.
    if (square === selected) {
      clearSelection()
      return
    }

    // Coba jalankan langkah ke kotak tujuan.
    const moved = onMove(selected, square)
    if (moved) {
      clearSelection()
    } else {
      // Bukan langkah legal: anggap sebagai pemilihan bidak baru.
      if (showOptions(square)) setSelected(square)
      else clearSelection()
    }
  }

  function onPieceDrop(from: Square, to: Square): boolean {
    clearSelection()
    if (isGameOver) return false
    return onMove(from, to)
  }

  return (
    <div className="board-wrapper">
      <Chessboard
        id="chess-coach-board"
        position={position}
        onPieceDrop={onPieceDrop}
        onSquareClick={onSquareClick}
        boardOrientation="white"
        arePiecesDraggable={!isGameOver}
        customSquareStyles={optionSquares}
        customBoardStyle={{
          borderRadius: '12px',
          boxShadow: '0 18px 50px rgba(2, 6, 23, 0.45)',
        }}
        customDarkSquareStyle={{ backgroundColor: '#6b7f94' }}
        customLightSquareStyle={{ backgroundColor: '#dfe7ef' }}
        customDropSquareStyle={{
          boxShadow: 'inset 0 0 0 4px rgba(56, 189, 248, 0.75)',
        }}
      />
      <p className="board-turn-indicator">
        <span className={`turn-dot turn-dot--${turn}`} />
        Giliran {turn === 'w' ? 'Putih' : 'Hitam'}
      </p>
    </div>
  )
}
