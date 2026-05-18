import { useEffect, useState } from 'react';
import type { DumpableCharacter } from '../data/dumpData';
import { dumpData } from '../data/dumpData';
import { getPartnerData } from '../utils/calculate';

interface Props {
  character: DumpableCharacter;
  onChaCha: () => void;
}

type Phase = 'dumping' | 'success';

export function DumpingScreen({ character, onChaCha }: Props) {
  const [phase, setPhase] = useState<Phase>('dumping');
  const [step, setStep] = useState(0);
  const scenario = dumpData[character];
  const partnerData = getPartnerData(character);
  const messages = scenario.dumpingMessages;

  useEffect(() => {
    if (phase !== 'dumping') return;
    if (step < messages.length - 1) {
      const t = setTimeout(() => setStep(s => s + 1), 750);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase('success'), 900);
      return () => clearTimeout(t);
    }
  }, [step, phase, messages.length]);

  if (phase === 'success') {
    return (
      <div className="screen dumping-screen">
        <div className="dump-success">
          <div className="dump-success-title">{scenario.successTitle}</div>
          <div className="dump-success-emoji">{partnerData.emoji}</div>
          <div className="dump-farewell-bubble">
            <p className="dump-farewell-text">"{scenario.farewellQuote}"</p>
          </div>
          <button className="btn-primary btn-xl btn-cha-cha" onClick={onChaCha}>
            💃 ТАНЦЮВАТИ ЧА-ЧА-ЧА
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen dumping-screen">
      <div className="dumping-content">
        <div className="dumping-spinner">
          <div className="spinner-ring" />
          <span className="spinner-emoji">{messages[step].emoji}</span>
        </div>

        <div className="loading-messages">
          {messages.map((msg, i) => (
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
