import type { CharacterData } from '../types';
import { partnerCharacters } from '../data/partnerCharacters';
import { yourCharacters } from '../data/yourCharacters';

interface Props {
  onStart: () => void;
}

function CharCard({ char }: { char: CharacterData }) {
  return (
    <div className="start-char-card" style={{ borderTopColor: char.accentColor }}>
      <span className="start-char-emoji">{char.emoji}</span>
      <span className="start-char-name">{char.name}</span>
      <span className="start-char-bio">{char.shortBio}</span>
    </div>
  );
}

export function StartScreen({ onStart }: Props) {
  return (
    <div className="screen start-screen">
      <div className="start-hero">
        <div className="start-emoji-row">
          <span className="float-emoji" style={{ animationDelay: '0s' }}>👑</span>
          <span className="float-emoji" style={{ animationDelay: '0.3s' }}>🐸</span>
          <span className="float-emoji" style={{ animationDelay: '0.6s' }}>🧛</span>
          <span className="float-emoji" style={{ animationDelay: '0.9s' }}>🍞</span>
          <span className="float-emoji" style={{ animationDelay: '1.2s' }}>🌀</span>
        </div>

        <h1 className="start-title">Хто поруч<br />із вами?</h1>
        <p className="start-subtitle">
          Діагностика стосунків з науковістю<br />приблизно як у гороскопа
        </p>

        <div className="start-badges">
          <span className="badge">🔬 Науково</span>
          <span className="badge">😂 Точно</span>
          <span className="badge">💅 Вірусно</span>
        </div>
      </div>

      <div className="start-chars">
        <div className="start-chars-section">
          <p className="start-chars-label">Хто поруч із вами</p>
          <div className="start-chars-scroll">
            {partnerCharacters.map(c => <CharCard key={c.id} char={c} />)}
          </div>
        </div>

        <div className="start-chars-section">
          <p className="start-chars-label">Хто ви?</p>
          <div className="start-chars-scroll">
            {yourCharacters.map(c => <CharCard key={c.id} char={c} />)}
          </div>
        </div>
      </div>

      <div className="start-footer">
        <p className="start-hint">20 питань · ~3 хв · безкоштовно</p>
        <button className="btn-primary btn-xl pulse-btn" onClick={onStart}>
          Почати сканування 👀
        </button>
        <p className="start-disclaimer">
          * Результати не є медичним діагнозом.<br />Але вони є.
        </p>
      </div>
    </div>
  );
}
