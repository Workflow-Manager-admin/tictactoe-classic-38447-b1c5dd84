import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main Tic Tac Toe App container.
 * Implements local 2-player classic mode with win/draw detection,
 * status display, centered 3x3 board, and restart button.
 */
function App() {
  // 'X' always starts
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null); // "X" | "O" | "draw" | null

  // Winning combinations
  const LINES = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6] // diags
  ];

  // PUBLIC_INTERFACE
  function checkWinner(squares) {
    for (let line of LINES) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a]; // "X" or "O"
      }
    }
    if (squares.every(Boolean)) return "draw";
    return null;
  }

  // PUBLIC_INTERFACE
  function handleClick(idx) {
    // do nothing if game over or square filled
    if (winner || board[idx]) return;

    const nextBoard = [...board];
    nextBoard[idx] = isXNext ? "X" : "O";
    const winResult = checkWinner(nextBoard);

    setBoard(nextBoard);
    setIsXNext((prev) => !prev);
    setWinner(winResult);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  }

  // PUBLIC_INTERFACE
  function renderStatus() {
    if (winner === "draw") return "It's a draw!";
    if (winner === "X" || winner === "O") return `Player ${winner} wins!`;
    return `Current turn: Player ${isXNext ? "X" : "O"}`;
  }

  // Render square
  function Square({ value, onClick }) {
    const accentColor = "var(--kavia-orange)";
    return (
      <button
        className="ttt-square"
        style={{
          color: value === "X" ? "var(--kavia-dark)" : accentColor,
          backgroundColor: value ? "var(--kavia-orange)" : "#fff",
          transition: "background 0.2s"
        }}
        onClick={onClick}
        aria-label={value ? `Square filled by ${value}` : "Empty square"}
      >
        {value}
      </button>
    );
  }

  // Board grid
  function Board({ squares, onSquareClick }) {
    return (
      <div className="ttt-board">
        {squares.map((val, idx) => (
          <Square key={idx} value={val} onClick={() => onSquareClick(idx)} />
        ))}
      </div>
    );
  }

  return (
    <div className="app" style={{ minHeight: '100vh', background: '#fff', color: '#222' }}>
      <nav className="navbar" style={{ background: "#222", color: "#fff", borderBottom: "1px solid #e0e0e0" }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={{ color: "#fff" }}>
              <span style={{ color: "#4caf50" }} className="logo-symbol">#</span> Tic Tac Toe Classic
            </div>
            <div />
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          {/* Vertically center using flex */}
          <div
            style={{
              minHeight: "calc(100vh - 90px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32
            }}
          >
            <h1 className="title" style={{ margin: 0, color: "#4caf50", fontSize: "2.8rem" }}>
              Tic Tac Toe
            </h1>
            <div style={{
              marginBottom: 12,
              fontSize: "1.25rem",
              fontWeight: 500,
              color: "#222"
            }}>
              {renderStatus()}
            </div>

            <Board squares={board} onSquareClick={handleClick} />

            <button
              className="btn btn-large"
              type="button"
              style={{
                marginTop: 28,
                background: "#4caf50",
                color: "#fff",
                fontWeight: 600
              }}
              onClick={handleRestart}
              aria-label="Restart game"
            >
              Restart Game
            </button>
          </div>
        </div>
      </main>
      {/* Add minimal scoped styling for new components */}
      <style>
        {`
        .ttt-board {
          display: grid;
          grid-template-columns: repeat(3, 64px);
          grid-template-rows: repeat(3, 64px);
          gap: 8px;
          background: #222;
          border-radius: 16px;
          padding: 18px;
        }
        .ttt-square {
          width: 64px;
          height: 64px;
          font-size: 2.1rem;
          font-family: inherit;
          border-radius: 9px;
          border: 2.5px solid #4caf50;
          box-sizing: border-box;
          background: #fff;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: background 0.2s;
        }
        .ttt-square:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
        `}
      </style>
    </div>
  );
}

export default App;