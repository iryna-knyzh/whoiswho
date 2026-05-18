import { useMemo } from 'react';

interface Props {
  onRestart: () => void;
  onWheel: () => void;
}

const CONFETTI_EMOJIS = ['🎊', '✨', '🎉', '💫', '⭐', '🌟', '💎', '👑'];

function Confetti() {
  const pieces = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: (i / 24) * 100 + (Math.random() - 0.5) * 8,
      delay: (Math.random() * 3).toFixed(2),
      duration: (2.5 + Math.random() * 2.5).toFixed(2),
      emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
      size: 14 + Math.floor(Math.random() * 14),
    })), []
  );

  return (
    <div className="confetti-container" aria-hidden>
      {pieces.map(p => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

export function QueenScreen({ onRestart, onWheel }: Props) {
  return (
    <div className="screen queen-screen">
      <Confetti />

      <div className="queen-content">
        <div className="queen-chandelier">✨ 💎 ✨</div>

        <div className="queen-stage">
          <span className="queen-dancer queen-dancer--left">💃</span>
          <span className="queen-crown">👑</span>
          <span className="queen-dancer queen-dancer--right">🕺</span>
        </div>

        <div className="queen-ballroom-label">Велика бальна зала</div>

        <h1 className="queen-title">Режим королеви<br />активовано</h1>

        <div className="queen-level-badge">
          <span className="queen-level-text">👑 Ваш рівень королеви:</span>
          <span className="queen-level-value">+100</span>
        </div>

        <div className="queen-sparkles">
          <span>✨</span><span>💫</span><span>⭐</span><span>💫</span><span>✨</span>
        </div>
      </div>

      <div className="result-actions">
        <button className="btn-primary btn-xl btn-cha-cha" onClick={onWheel}>
          🎰 Покрутити колесо долі
        </button>
        <button className="btn-secondary" onClick={onRestart}>
          🔄 Пройти ще раз
        </button>
      </div>
    </div>
  );
}
