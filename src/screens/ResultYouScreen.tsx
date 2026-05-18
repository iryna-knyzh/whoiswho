import { useMemo } from 'react';
import type { PartnerCharacter, YourCharacter } from '../types';
import { getYourData, getPartnerData, getRandomDescription } from '../utils/calculate';
import { yourCharacters } from '../data/yourCharacters';

interface Props {
  character: YourCharacter;
  partnerCharacter: PartnerCharacter;
  onNext: () => void;
}

const COMBOS: Partial<Record<YourCharacter, Partial<Record<PartnerCharacter, string>>>> = {
  rescuer: {
    vampire: 'Оце так сильний магніт 🧲 Рятівник + Вампір = класика жанру.',
    frog: 'Ти рятуєш, він мовчить. Гарний тандем... для нього.',
    rollercoaster: 'Ти рятуєш, він влаштовує аварії. Безперервна робота.',
  },
  dumpling: {
    vampire: 'Тривожний пельмешок і Вампір — це окрема книга з хеппі-ендом десь на сторінці 847.',
    rollercoaster: 'Ти переживаєш. Він гойдається. Це мистецтво.',
  },
  psychologist: {
    vampire: 'Ти знаходиш виправдання всьому. Навіть цьому. 🏆',
    frog: 'Ти пояснюєш його мовчання дитячою травмою вже третій рік.',
  },
};

export function ResultYouScreen({ character, partnerCharacter, onNext }: Props) {
  const data = getYourData(character);
  const partnerData = getPartnerData(partnerCharacter);
  const description = useMemo(() => getRandomDescription(character, yourCharacters), [character]);

  const comboText = COMBOS[character]?.[partnerCharacter];

  return (
    <div className="screen result-screen">
      <div className="result-header">
        <p className="result-label">У цих стосунках ви...</p>
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

      {comboText && (
        <div className="combo-card">
          <span className="combo-icon">{data.emoji} + {partnerData.emoji}</span>
          <p>{comboText}</p>
        </div>
      )}

      <div className="result-actions">
        <p className="result-cta-hint">Подивимось на вашу сумісність 📊</p>
        <button className="btn-primary" onClick={onNext}>
          Показати аналіз 🎯
        </button>
      </div>
    </div>
  );
}
