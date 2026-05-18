import { useState, useMemo } from 'react';
import type { PartnerCharacter } from '../types';
import { partnerQuestions } from '../data/questions';

interface Props {
  onComplete: (answers: PartnerCharacter[]) => void;
}

export function QuizScreen({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<PartnerCharacter[]>([]);
  const [selected, setSelected] = useState<PartnerCharacter | null>(null);
  const [animating, setAnimating] = useState(false);

  const question = partnerQuestions[currentIdx];
  const progress = (currentIdx / partnerQuestions.length) * 100;

  const shuffledAnswers = useMemo(
    () => [...question.answers].sort(() => Math.random() - 0.5),
    [currentIdx] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleSelect = (type: PartnerCharacter) => {
    if (animating) return;
    setSelected(type);
    setAnimating(true);

    setTimeout(() => {
      const newAnswers = [...answers, type];
      if (currentIdx + 1 >= partnerQuestions.length) {
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
    <div className="screen quiz-screen">
      <div className="quiz-header">
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="quiz-counter">
          {currentIdx + 1} / {partnerQuestions.length}
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
