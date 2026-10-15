import type { Square } from 'chess.js'
import ChessBoard from './components/ChessBoard'
import GamePanel from './components/GamePanel'
import CoachPanel from './components/CoachPanel'
import { useChessGame } from './hooks/useChessGame'
import './styles/app.css'

export default function App() {
  const game = useChessGame()

  function handleMove(from: Square, to: Square): boolean {
    return game.makeMove(from, to).ok
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="brand">
          <span className="brand__logo" aria-hidden>♞</span>
          <div>
            <h1 className="brand__name">Chess Coach AI</h1>
            <p className="brand__tagline">Bermain catur, sekaligus belajar.</p>
          </div>
        </div>
      </header>

      <main className="app__main">
        <div className="board-column">
          <ChessBoard
            position={game.fen}
            turn={game.turn}
            isGameOver={game.isGameOver}
            onMove={handleMove}
            legalMovesFrom={game.legalMovesFrom}
          />
        </div>

        <aside className="side-column">
          <GamePanel
            status={game.status}
            turn={game.turn}
            winner={game.winner}
            history={game.history}
            isGameOver={game.isGameOver}
            canUndo={game.history.length > 0}
            onReset={game.reset}
            onUndo={game.undo}
          />
          <CoachPanel />
        </aside>
      </main>

      <footer className="app__footer">
        <p>Dibuat dengan React, chess.js, dan react-chessboard.</p>
      </footer>
    </div>
  )
}
