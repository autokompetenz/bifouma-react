import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import Reveal from '../components/Reveal.jsx';
import HeroVisual from '../components/HeroVisual.jsx';
import BrandVisual from '../components/BrandVisual.jsx';
import CoverageStrip from '../components/CoverageStrip.jsx';
import ProjectVisual from '../components/ProjectVisual.jsx';
import { projects, sectorLabels, countryLabels } from '../data/projects.js';
import { SOLUTION_ICONS, FEATURE_ICONS } from '../data/icons.js';
import { sendForm, describeSendError, SendError } from '../lib/sendForm.js';

function Newsletter() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await sendForm('newsletter', { email });
      setStatus('sent');
      setEmail('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const code = err instanceof SendError ? err.code : 'send_failed';
      setErrorMsg(describeSendError(code, t));
      setStatus('error');
    }
  };

  return (
    <section className="newsletter section" id="newsletter">
      <div className="container">
        <div className="text-center">
          <h2>{t('newsletter.title')}</h2>
          <p className="newsletter-sub">{t('newsletter.subtitle')}</p>
          {status === 'sent' ? (
            <p className="bif-success mx-auto" style={{ maxWidth: 420 }}>
              {t('newsletter.success')}
            </p>
          ) : (
            <form className="newsletter-form-wrap" onSubmit={subscribe}>
              {status === 'error' && (
                <p className="bif-error mx-auto mb-3" style={{ maxWidth: 460 }} role="alert">{errorMsg}</p>
              )}
              <label className="sr-only" htmlFor="nl-email">{t('newsletter.placeholder')}</label>
              <input
                id="nl-email"
                type="email"
                className="newsletter-form"
                placeholder={t('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'sending'}
              />
              <button type="submit" className="btn btn-primary newsletter-btn" disabled={status === 'sending'}>
                {status === 'sending' ? t('forms.sending') : t('newsletter.btn')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function StatsRow() {
  const { t } = useI18n();
  const stats = t('home.stats');
  return (
    <div className="stat-strip">
      <div className="container">
        <ul className="stat-strip__list">
          {stats.map((s) => (
            <li className="stat-strip__item" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
        <p className="stat-strip__note">{t('home.statsNote')}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const { t, lang } = useI18n();
  const c = (obj) => obj[lang] || obj.fr;

  const featureItems = [
    { icon: FEATURE_ICONS[0], data: t('features.f1') },
    { icon: FEATURE_ICONS[1], data: t('features.f2') },
    { icon: FEATURE_ICONS[2], data: t('features.f3') },
    { icon: FEATURE_ICONS[3], data: t('features.f4') },
  ];

  const solutions = t('service.items').slice(0, 4);

  const howSteps = t('how.list').map((item) => {
    const i = item.indexOf('—');
    return i >= 0
      ? { title: item.slice(0, i).trim(), desc: item.slice(i + 1).trim() }
      : { title: item, desc: '' };
  });

  const loanSteps = t('loan.steps');
  const loanFacts = [
    { v: t('loanCta.answer'), l: t('loanCta.answerLabel') },
    { v: t('loanCta.cost'), l: t('loanCta.costLabel') },
    { v: t('loanCta.support'), l: t('loanCta.supportLabel') },
  ];

  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero hero-bif">
        <div className="hero-bif__bg" aria-hidden="true" />
        <div className="container">
          <div className="hero-inner">
            <div>
              <span className="hero-badge">
                <i className="ti-shield" aria-hidden="true" /> {t('misc.invest')}
              </span>
              <h1>
                {t('hero.title1')}<br />{t('hero.title2')}
              </h1>
              <p className="hero-sub">{t('hero.subtitle')}</p>
              <div className="hero-actions">
                <Link to="/loan" className="btn btn-primary btn-lg">
                  {t('nav.cta')}
                </Link>
                <Link to="/service" className="btn btn-ghost btn-lg">
                  {t('hero.explore')}
                </Link>
              </div>
              <div className="hero-trust">
                {t('hero.trust').split(' · ').map((item) => (
                  <span key={item}><i className="ti-check" aria-hidden="true" />{item}</span>
                ))}
              </div>
            </div>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ============ CHIFFRES (secondaires, avec contexte) ============ */}
      <section className="section pt-3 pb-5">
        <div className="container">
          <StatsRow />
        </div>
      </section>

      {/* ============ POURQUOI BIFAUMA ============ */}
      <section className="section section-white-top" id="why">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">{t('features.title')}</h2>
            <p className="lead mx-auto" style={{ maxWidth: 640 }}>{t('features.subtitle')}</p>
          </div>
          <div className="row">
            {featureItems.map((f, i) => (
              <div className="col-md-6 col-lg-3 mb-4" key={f.data.title}>
                <Reveal as="div" delay={i * 90} className="h-100">
                  <div className="feature-item d-flex flex-column">
                    <i className={`${f.icon} feature-icon mr-3`} aria-hidden="true" />
                    <h4 className="my-3">{f.data.title}</h4>
                    <p>{f.data.desc}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NOS SOLUTIONS ============ */}
      <section className="section" id="solutions">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">{t('misc.services')}</h2>
            <p className="lead mx-auto" style={{ maxWidth: 640 }}>{t('service.subtitle')}</p>
          </div>
          <div className="row">
            {solutions.map((s, i) => (
              <div className="col-md-6 col-lg-3 mb-4" key={s.title}>
                <div className="solution-card">
                  <i className={`${SOLUTION_ICONS[i]} round-icon blue`} aria-hidden="true" />
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                  <Link to="/service" className="btn btn-secondary btn-sm">{t('misc.more')}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMMENT ÇA MARCHE ============ */}
      <section className="section section-white-top" id="how">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">{t('how.title')}</h2>
            <p className="lead mx-auto" style={{ maxWidth: 640 }}>{t('how.desc')}</p>
          </div>
          <div className="steps-grid">
            {howSteps.map((s, i) => (
              <Reveal as="div" className="step-card" key={i} delay={i * 90}>
                <span className="step-card__num">{i + 1}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BLOC DEMANDE DE FINANCEMENT ============ */}
      <section className="section">
        <div className="container">
          <Reveal as="div">
            <div className="loan-cta-card">
              <div className="row align-items-center">
                <div className="col-lg-5 mb-4 mb-lg-0">
                  <span className="loan-cta-tag">{t('loanCta.tag')}</span>
                  <h2 className="section-title mb-3">{t('loanCta.title')}</h2>
                  <p className="loan-cta-sub mb-4">{t('loanCta.subtitle')}</p>
                  <Link to="/loan" className="btn btn-secondary btn-lg loan-cta-btn">
                    {t('loanCta.cta')} <i className="ti-arrow-right ml-2" aria-hidden="true" />
                  </Link>
                </div>
                <div className="col-lg-7">
                  {loanSteps.map((s, i) => (
                    <div className="loan-cta-step" key={s}>
                      <span className="loan-cta-num" aria-hidden="true">{i + 1}</span>
                      <strong>{s}</strong>
                    </div>
                  ))}
                </div>
              </div>
              <div className="loan-cta-facts">
                {loanFacts.map((f) => (
                  <div className="loan-cta-fact" key={f.l}>
                    <strong>{f.v}</strong>
                    <span>{f.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ EXEMPLES DE PROJETS ============ */}
      <section className="section section-white-top">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title">{t('projects.title')}</h2>
            <p className="lead mx-auto" style={{ maxWidth: 640 }}>{t('projects.subtitle')}</p>
            <p className="illustrative-note text-left text-md-center" style={{ maxWidth: 760, marginInline: 'auto' }}>
              <i className="ti-info-alt mr-2" aria-hidden="true" />
              {t('projects.illustrativeNote')}
            </p>
          </div>
          <div className="row">
            {featuredProjects.map((p) => {
              const content = p.content[lang] || p.content.fr;
              return (
                <div className="col-md-6 col-lg-4 mb-4" key={p.slug}>
                  <div className="project-card">
                    <ProjectVisual sector={p.sector} title={content.title} image={p.image} />
                    <div className="card-body d-flex flex-column p-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge badge-primary">{c(sectorLabels[p.sector])}</span>
                        <span className="badge badge-soft">
                          <i className="ti-pin mr-1" aria-hidden="true" />{c(countryLabels[p.country])}
                        </span>
                      </div>
                      <h3 className="h5 mb-2">{content.title}</h3>
                      <p className="mb-3 text-muted" style={{ fontSize: 14.5 }}>{content.intro}</p>
                      <Link to={`/projects/${p.slug}`} className="btn btn-primary w-100 mt-auto">{t('projects.view')}</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-3">
            <Link to="/projects" className="btn btn-outline-dark btn-lg">{t('misc.allProjects')}</Link>
          </div>
        </div>
      </section>

      {/* ============ CONFIANCE ============ */}
      <section className="section-lg">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-5 order-2 order-md-1 mb-4 mb-md-0">
              <h2 className="section-title">{t('trust.title')}</h2>
              <p className="mb-4">{t('trust.desc')}</p>
              <ul className="service-list mb-4">
                {t('trust.list').map((s, i) => (
                  <li key={i}><i className="ti-check" aria-hidden="true" /><strong>{s}</strong></li>
                ))}
              </ul>
              <div className="hero-actions" style={{ marginBottom: 0 }}>
                <Link to="/loan" className="btn btn-primary">{t('nav.cta')}</Link>
                <Link to="/submit" className="btn btn-secondary">{t('misc.submitProject')}</Link>
              </div>
            </div>
            <div className="col-md-6 order-1 order-md-2 mb-4 mb-md-0">
              <Reveal as="div">
                <BrandVisual icon="ti-shield" items={t('trust.list')} size="lg" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRÉSENCE EUROPÉENNE ============ */}
      <section className="section section-white-top">
        <div className="container">
          <h2 className="text-center section-title mb-4">{t('clients.title')}</h2>
          <CoverageStrip />
        </div>
      </section>

      <Newsletter />
    </>
  );
}