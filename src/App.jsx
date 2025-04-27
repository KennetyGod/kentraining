import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const getStatusMessage = () => {
    if (winner) return `🏆 Pemenang: ${winner}`;
    if (!board.includes(null)) return '⚔️ Seri!';
    return `🎮 Giliran: ${isXNext ? 'Ricken' : 'Eddy'}`;
  };

  const renderSquare = (index) => {
    const isWinningSquare = winnerLine?.includes(index);
    return (
      <div
        key={index}
        className={`square ${isWinningSquare ? 'winner' : ''}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  const { line: winnerLine } = winner || {};

  return (
    <div className="container">
      <h1>Tic Tac Toe KenVersion</h1>
      <div className="status">{getStatusMessage()}</div>
      <div className="board">
        {board.map((_, i) => renderSquare(i))}
      </div>
      <button className="reset-button" onClick={resetGame}>PLAY</button>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }

  return null;
}

export default App;
