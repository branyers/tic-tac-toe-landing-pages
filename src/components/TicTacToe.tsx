import React, { useState } from 'react';
import QuizModal from './QuizModal';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    question: "¿Cuál es la capital de Francia?",
    options: ["Londres", "París", "Madrid", "Roma"],
    correctAnswer: "París"
  },
  {
    question: "¿Cuántos planetas hay en el sistema solar?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "8"
  },
  // Add more questions as needed
];

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Array<string>>(Array(9).fill(''));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const handleCellClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    setSelectedCell(index);
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setModalOpen(true);
  };

  const handleAnswerSubmit = (isCorrect: boolean) => {
    if (isCorrect && selectedCell !== null) {
      const newBoard = [...board];
      const currentPlayer = isXNext ? 'X' : 'O';
      newBoard[selectedCell] = currentPlayer;
      setBoard(newBoard);
      setIsXNext(!isXNext);
    } else {
      setIsXNext(!isXNext);
    }
    setModalOpen(false);
    setSelectedCell(null);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsXNext(true);
  };

  const calculateWinner = (squares: string[]): string | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game-container">
      <div className="game-info">
        <div className="status">{status}</div>
        <button className="reset-button" onClick={resetGame}>
          Resetear Juego
        </button>
      </div>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="scores">
        <div>X Points: {scores.X}</div>
        <div>O Points: {scores.O}</div>
      </div>
      {modalOpen && currentQuestion && (
        <QuizModal
          question={currentQuestion}
          onClose={() => setModalOpen(false)}
          onAnswer={handleAnswerSubmit}
        />
      )}
      <style>{`
        .game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
        }

        .game-info {
          text-align: center;
          margin-bottom: 1rem;
        }

        .status {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .reset-button {
          padding: 0.5rem 1rem;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          background: #2c3e50;
          padding: 8px;
          border-radius: 8px;
        }

        .cell {
          width: 100px;
          height: 100px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          cursor: pointer;
          border-radius: 4px;
        }

        .scores {
          display: flex;
          gap: 2rem;
          font-size: 1.2rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default TicTacToe;