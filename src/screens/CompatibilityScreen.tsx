import { useEffect, useState } from 'react';
import type { PartnerCharacter, YourCharacter } from '../types';
import { compatibilityData } from '../data/compatibility';
import { getPartnerData, getYourData } from '../utils/calculate';

interface Props {
  partnerCharacter: PartnerCharacter;
  yourCharacter: YourCharacter;
  onNext: () => void;
}

export function CompatibilityScreen({ partnerCharacter, yourCharacter, onNext }: Props) {
  const [visible, setVisible] = useState(false);
  const metrics = compatibilityData[partnerCharacter];
  const partnerData = getPartnerData(partnerCharacter);
  const yourData = getYourData(yourCharacter);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="screen compat-screen">
      <div className="compat-header">
        <h2 className="compat-title">Аналіз сумісності</h2>
        <div className="compat-pair">
          <span className="compat-you">{yourData.emoji}<br /><small>ви</small></span>
          <span className="compat-heart">💘</span>
          <span className="compat-partner">{partnerData.emoji}<br /><small>{partnerData.name}</small></span>
        </div>
      </div>

      <div className="compat-metrics">
        {metrics.map((metric, i) => {
          const displayPct = Math.min(metric.value, 100);
          const isOverflow = metric.value > 100;
          return (
            <div key={i} className="metric-row" style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="metric-label">
                <span>{metric.emoji}</span>
                <span>{metric.label}</span>
              </div>
              <div className="metric-bar-wrap">
                <div className="metric-bar">
                  <div
                    className={`metric-fill ${isOverflow ? 'metric-fill--overflow' : ''}`}
                    style={{
                      width: visible ? `${displayPct}%` : '0%',
                      transitionDelay: `${i * 0.12}s`,
                    }}
                  />
                </div>
                <span className={`metric-value ${isOverflow ? 'metric-value--spicy' : ''}`}>
                  {metric.value}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="compat-disclaimer">
        * Числа понад 100% — це не помилка. Це ваше життя.
      </div>

      <div className="result-actions">
        <button className="btn-primary" onClick={onNext}>
          Крутити колесо долі 🎰
        </button>
      </div>
    </div>
  );
}
