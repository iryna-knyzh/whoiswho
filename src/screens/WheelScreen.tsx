import { useState } from 'react';
import type { PartnerCharacter } from '../types';
import { wheelPhrases } from '../data/wheelPhrases';
import { getPartnerData } from '../utils/calculate';

interface Props {
  partnerCharacter: PartnerCharacter;
  onRestart: () => void;
}

type Phase = 'idle' | 'spinning' | 'result';

export function WheelScreen({ partnerCharacter, onRestart }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [phrase, setPhrase] = useState('');
  const [spinCount, setSpinCount] = useState(0);

  const partnerData = getPartnerData(partnerCharacter);
  const phrases = wheelPhrases[partnerCharacter];

  const handleSpin = () => {
    if (phase === 'spinning') return;
    const picked = phrases[Math.floor(Math.random() * phrases.length)];
    setPhase('spinning');
    setPhrase(picked);
    setSpinCount(n => n + 1);
    setTimeout(() => setPhase('result'), 2200);
  };

  const handleAgain = () => {
    setPhase('idle');
    setPhrase('');
  };

  return (
    <div className="screen wheel-screen">
      <div className="wheel-header">
        <h2 className="wheel-title">Колесо долі</h2>
        <p className="wheel-subtitle">
          Що скаже <strong>{partnerData.emoji} {partnerData.name}</strong>?
        </p>
      </div>

      <div className="wheel-stage">
        <div className={`wheel-visual ${phase === 'spinning' ? 'wheel-spinning' : ''}`} key={spinCount}>
          <div className="wheel-circle" style={{ background: partnerData.gradient }}>
            <span className="wheel-emoji">{partnerData.emoji}</span>
          </div>
          <div className="wheel-pointer">▼</div>
        </div>

        {phase === 'result' && (
          <div className="wheel-result">
            <div className="wheel-bubble">
              <span className="wheel-phrase">"{phrase}"</span>
              <span className="wheel-speaker">{partnerData.emoji}</span>
            </div>
          </div>
        )}

        {phase === 'idle' && (
          <p className="wheel-hint">Натисни щоб дізнатись що він/-а скаже цього разу</p>
        )}
      </div>

      <div className="wheel-actions">
        {phase !== 'spinning' && (
          <button className="btn-primary" onClick={phase === 'idle' ? handleSpin : handleAgain}>
            {phase === 'idle' ? 'Крутити 🎰' : 'Ще раз 🔄'}
          </button>
        )}
        {phase === 'spinning' && (
          <button className="btn-primary btn-disabled" disabled>
            Крутиться...
          </button>
        )}
        <button className="btn-secondary" onClick={onRestart}>
          Почати спочатку 🔁
        </button>
      </div>
    </div>
  );
}
