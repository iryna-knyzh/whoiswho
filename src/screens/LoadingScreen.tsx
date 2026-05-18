import { useEffect, useState } from 'react';

const MESSAGES = [
  { text: 'Шукаємо червоні прапорці...', emoji: '🚩' },
  { text: 'Аналізуємо "ок"...', emoji: '💬' },
  { text: 'Перевіряємо емоційні гойдалки...', emoji: '🎢' },
  { text: 'Повертаємо ваші нерви...', emoji: '🧠' },
  { text: 'Завантажуємо почуття власної цінності...', emoji: '👑' },
];

interface Props {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step < MESSAGES.length - 1) {
      const t = setTimeout(() => setStep(s => s + 1), 800);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setDone(true), 600);
      return () => clearTimeout(t);
    }
  }, [step]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 500);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  return (
    <div className="screen loading-screen">
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner-ring" />
          <span className="spinner-emoji">{MESSAGES[step].emoji}</span>
        </div>

        <div className="loading-messages">
          {MESSAGES.map((msg, i) => (
            <div
              key={i}
              className={`loading-msg ${i === step ? 'active' : i < step ? 'done' : 'pending'}`}
            >
              <span className="loading-msg-emoji">{msg.emoji}</span>
              <span>{msg.text}</span>
              {i < step && <span className="loading-check">✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
