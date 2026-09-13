import { projects } from '../data/projects.js';
import { useI18n } from '../i18n.jsx';

export default function HeroVisual() {
  const { t, lang } = useI18n();
  const p = projects[0];
  const content = p.content[lang] || p.content.fr;
  const steps = t('loan.steps');
  const facts = [
    { v: t('loanCta.answer'), l: t('loanCta.answerLabel') },
    { v: t('loanCta.cost'), l: t('loanCta.costLabel') },
    { v: t('loanCta.support'), l: t('loanCta.supportLabel') },
  ];

  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-visual__card">
        <div className="hero-visual__top">
          <span className="hero-visual__label">{t('projects.title')}</span>
          <span className="hero-visual__pill">{p.progress}%</span>
        </div>
        <div className="hero-visual__amount">
          <strong>{p.raised.toLocaleString('de-DE')} €</strong>
          <span>/ {p.target.toLocaleString('de-DE')} €</span>
        </div>
        <p className="hero-visual__title text-truncate" style={{ marginBottom: 14, fontSize: 15, color: 'rgba(255,255,255,0.85)' }}>
          {content.title}
        </p>
        <div className="hero-visual__bar">
          <span style={{ width: `${p.progress}%` }} />
        </div>
        <div className="hero-visual__steps">
          {steps.map((s, i) => (
            <div className="hero-visual__step" key={s}>
              <em>{i + 1}</em>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-visual__float">
        {facts.map((f) => (
          <div key={f.l}>
            <strong>{f.v}</strong>
            <span>{f.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}