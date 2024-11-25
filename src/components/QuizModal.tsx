import React, { useState } from 'react';

interface QuizModalProps {
  question: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
  onClose: () => void;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ question, onClose, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const handleSubmit = () => {
    const isCorrect = selectedAnswer === question.correctAnswer;
    onAnswer(isCorrect);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{question.question}</h3>
        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => setSelectedAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={handleSubmit} disabled={!selectedAnswer}>
            Submit
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem 0;
        }

        .option {
          padding: 0.5rem;
          border: 2px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          background: white;
          transition: all 0.3s;
        }

        .option.selected {
          border-color: var(--primary-color);
          background: var(--primary-color);
          color: white;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .modal-actions button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .modal-actions button:first-child {
          background: var(--primary-color);
          color: white;
        }

        .modal-actions button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default QuizModal;