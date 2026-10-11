import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';

const AMOUNT_MIN = 1000;
const AMOUNT_MAX = 100000;
const AMOUNT_STEP = 500;
const DURATION_MIN = 6;
const DURATION_MAX = 84;
const DURATION_STEP = 6;
// Taux annuel fixe indicatif (aligné sur la maquette du design system).
const ANNUAL_RATE = 0.0345;

// Simulateur montant / durée : les valeurs choisies sont transmises à la page
// de demande de prêt pour pré-remplir le formulaire. La mensualité estimée suit
// la formule d'amortissement bancaire M = C·r / (1 − (1+r)^−n).
export default function Simulator() {
  const { t, lang } = useI18n();
  const sim = t('home.sim');
  const [amount, setAmount] = useState(15000);
  const [duration, setDuration] = useState(24);

  const money = (v) =>
    new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v);

  const amountPct = ((amount - AMOUNT_MIN) / (AMOUNT_MAX - AMOUNT_MIN)) * 100;
  const durationPct = ((duration - DURATION_MIN) / (DURATION_MAX - DURATION_MIN)) * 100;

  const monthlyPayment = useMemo(() => {
    const r = ANNUAL_RATE / 12;
    if (r === 0) return amount / duration;
    return (amount * r) / (1 - Math.pow(1 + r, -duration));
  }, [amount, duration]);

  const ratePct = (ANNUAL_RATE * 100).toLocaleString(lang, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="y-sim">
      <p className="y-sim__head">{sim.title}</p>

      <div className="y-sim__row">
        <div className="y-sim__label">
          <span>{sim.amountLabel}</span>
          <span className="y-sim__value">{money(amount)}</span>
        </div>
        <input
          type="range"
          className="y-range"
          min={AMOUNT_MIN}
          max={AMOUNT_MAX}
          step={AMOUNT_STEP}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{ '--fill': `${amountPct}%` }}
          aria-label={sim.amountLabel}
        />
        <div className="y-sim__scale">
          <span>{money(AMOUNT_MIN)}</span>
          <span>{money(AMOUNT_MAX)}</span>
        </div>
      </div>

      <div className="y-sim__row">
        <div className="y-sim__label">
          <span>{sim.durationLabel}</span>
          <span className="y-sim__value">{duration} {sim.months}</span>
        </div>
        <input
          type="range"
          className="y-range"
          min={DURATION_MIN}
          max={DURATION_MAX}
          step={DURATION_STEP}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          style={{ '--fill': `${durationPct}%` }}
          aria-label={sim.durationLabel}
        />
        <div className="y-sim__scale">
          <span>{DURATION_MIN} {sim.months}</span>
          <span>{DURATION_MAX} {sim.months}</span>
        </div>
      </div>

      <div className="y-sim__result">
        <div className="y-sim__result-info">
          <span className="y-sim__result-label">{sim.monthlyLabel}</span>
          <span className="y-sim__result-rate">{sim.ratePrefix} {ratePct} %</span>
        </div>
        <div className="y-sim__result-value">
          <strong>{money(Math.round(monthlyPayment))}</strong>
          <span>{sim.perMonth}</span>
        </div>
      </div>

      <Link
        to={`/loan?amount=${amount}&duration=${duration}`}
        className="btn btn-primary btn-lg y-sim__cta"
      >
        {sim.cta}
      </Link>
      <p className="y-sim__note">{sim.note}</p>
    </div>
  );
}
