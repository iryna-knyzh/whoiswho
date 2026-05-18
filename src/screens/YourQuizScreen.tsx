import { useState, useMemo } from 'react';
import type { YourCharacter } from '../types';
import { yourQuestions } from '../data/yourQuestions';

interface Props {
  onComplete: (answers: YourCharacter[]) => void;
}

export function YourQuizScreen({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<YourCharacter[]>([]);
  const [selected, setSelected] = useState<YourCharacter | null>(null);
  const [animating, setAnimating] = useState(false);

  const question = yourQuestions[currentIdx];
  const progress = (currentIdx / yourQuestions.length) * 100;

  const shuffledAnswers = useMemo(
    () => [...question.answers].sort(() => Math.random() - 0.5),
    [currentIdx] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleSelect = (type: YourCharacter) => {
    if (animating) return;
    setSelected(type);
    setAnimating(true);

    setTimeout(() => {
      const newAnswers = [...answers, type];
      if (currentIdx + 1 >= yourQuestions.length) {
        onComplete(newAnswers);
      } else {
        setAnswers(newAnswers);
        setCurrentIdx(i => i + 1);
        setSelected(null);
        setAnimating(false);
      }
    }, 350);
  };

  return (
    <div className="screen quiz-screen quiz-screen--you">
      <div className="quiz-you-intro">
        <span>А тепер про вас 💅</span>
      </div>

      <div className="quiz-header">
        <div className="quiz-progress-bar quiz-progress-bar--you">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="quiz-counter">
          {currentIdx + 1} / {yourQuestions.length}
        </div>
      </div>

      <div className="quiz-body">
        <div className="quiz-question-emoji">{question.emoji}</div>
        <h2 className="quiz-question">{question.question}</h2>

        <div className="quiz-answers">
          {shuffledAnswers.map((answer, i) => (
            <button
              key={i}
              className={`answer-btn ${selected === answer.type ? 'answer-selected' : ''}`}
              onClick={() => handleSelect(answer.type)}
              disabled={animating}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
