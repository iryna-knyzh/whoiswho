import { useMemo, useState } from 'react';
import type { PartnerCharacter } from '../types';
import { getPartnerData, getRandomDescription } from '../utils/calculate';
import { partnerCharacters } from '../data/partnerCharacters';
import type { DumpableCharacter } from '../data/dumpData';
import { dumpData } from '../data/dumpData';
import { DumpModal } from './DumpModal';

interface Props {
  character: PartnerCharacter;
  onNext: () => void;
  onDump: (char: DumpableCharacter) => void;
}

const DUMPABLE: PartnerCharacter[] = ['frog', 'vampire'];

export function ResultPartnerScreen({ character, onNext, onDump }: Props) {
  const data = getPartnerData(character);
  const description = useMemo(() => getRandomDescription(character, partnerCharacters), [character]);
  const [modalOpen, setModalOpen] = useState(false);

  const isDumpable = DUMPABLE.includes(character);
  const dumpChar = isDumpable ? (character as DumpableCharacter) : null;

  return (
    <div className="screen result-screen">
      <div className="result-header">
        <p className="result-label">Поруч із вами...</p>
        <div className="result-emoji-big">{data.emoji}</div>
        <h1 className="result-name" style={{ background: data.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {data.name}
        </h1>
        <p className="result-tagline">{data.tagline}</p>
      </div>

      <div className="result-card" style={{ borderColor: data.accentColor + '44' }}>
        <div className="result-card-accent" style={{ background: data.gradient }} />
        <p className="result-description">{description}</p>
      </div>

      <div className="result-actions">
        {dumpChar && (
          <button className="btn-dump" onClick={() => setModalOpen(true)}>
            {dumpData[dumpChar].buttonText}
          </button>
        )}
        <p className="result-cta-hint">А хто ви самі у цих стосунках?</p>
        <button className="btn-primary" onClick={onNext}>
          Дізнатись хто я 🔍
        </button>
      </div>

      {modalOpen && dumpChar && (
        <DumpModal
          character={dumpChar}
          onConfirm={() => { setModalOpen(false); onDump(dumpChar); }}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
