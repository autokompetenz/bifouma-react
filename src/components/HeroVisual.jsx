import { projects, sectorLabels } from '../data/projects.js';
import { useI18n } from '../i18n.jsx';

export default function HeroVisual() {
  const { t, lang } = useI18n();
  const p = projects[0];
  const content = p.content[lang] || p.content.fr;
  const c = (obj) => obj[lang] || obj.fr;
  const steps = t('loan.steps');
  const facts = [
    { v: t('loanCta.answer'), l: t('loanCta.answerLabel') },
    { v: t('loanCta.cost'), l: t('loanCta.costLabel') },
    { v: t('loanCta.support'), l: t('loanCta.supportLabel') },
  ];

  return (
    <div className="hero-visual">
      <div className="hero-visual__card">
        <div className="hero-visual__top">
          <span className="hero-visual__label">{t('projects.title')}</span>
          <span className="hero-visual__pill">{c(sectorLabels[p.sector])}</span>
        </div>
        <h3 className="hero-visual__title">{content.title}</h3>
        <p className="hero-visual__desc">{content.intro}</p>
        <div className="hero-visual__steps">
          {steps.map((s, i) => (
            <div className="hero-visual__step" key={s}>
              <em>{i + 1}</em>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-visual__float" aria-hidden="true">
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