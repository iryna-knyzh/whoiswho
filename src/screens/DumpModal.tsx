import type { DumpableCharacter } from '../data/dumpData';
import { DUMP_SIDE_EFFECTS } from '../data/dumpData';
import { getPartnerData } from '../utils/calculate';

interface Props {
  character: DumpableCharacter;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DumpModal({ character, onConfirm, onCancel }: Props) {
  const data = getPartnerData(character);

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-emoji">{data.emoji}</div>
        <h2 className="modal-title">🚮 Ви впевнені?</h2>

        <p className="modal-text">Після видалення можливі побічні ефекти:</p>

        <ul className="modal-effects">
          {DUMP_SIDE_EFFECTS.map((effect, i) => (
            <li key={i} className="modal-effect-item">{effect}</li>
          ))}
        </ul>

        <div className="modal-actions">
          <button className="btn-primary" onClick={onConfirm}>
            👑 Так, активувати режим королеви
          </button>
          <button className="btn-secondary" onClick={onCancel}>
            ❌ Ні, я передумала
          </button>
        </div>
      </div>
    </div>
  );
}
