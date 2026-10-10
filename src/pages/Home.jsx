import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import Reveal from '../components/Reveal.jsx';
import Simulator from '../components/Simulator.jsx';
import BrandVisual from '../components/BrandVisual.jsx';
import CoverageStrip from '../components/CoverageStrip.jsx';
import ProjectVisual from '../components/ProjectVisual.jsx';
import { projects, sectorLabels, countryLabels } from '../data/projects.js';
import { SOLUTION_ICONS, FEATURE_ICONS } from '../data/icons.js';
import { sendForm, describeSendError, SendError } from '../lib/sendForm.js';

function Newsletter() {
  const { t, lang } = useI18n();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await sendForm('newsletter', { email }, [], lang);
      setStatus('sent');
      setEmail('');
    } catch (err) {
      const code = err instanceof SendError ? err.code : 'send_failed';
      setErrorMsg(describeSendError(code, t));
      setStatus('error');
    }
  };

  return (
    <section className="y-newsletter" id="newsletter">
      <div className="container text-center">
        <h2>{t('newsletter.title')}</h2>
        <p className="newsletter-sub">{t('newsletter.subtitle')}</p>
        {status === 'sent' ? (
          <p className="bif-success mx-auto" style={{ maxWidth: 420 }}>
            {t('newsletter.success')}
          </p>
        ) : (
          <>
            {status === 'error' && (
              <p className="bif-error mx-auto mb-3" style={{ maxWidth: 460 }} role="alert">{errorMsg}</p>
            )}
            <form className="newsletter-form-wrap" onSubmit={subscribe}>
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
          </>
        )}
      </div>
    </section>
  );
}

function StatsRow() {
  const { t } = useI18n();
  const stats = t('home.stats');
  return (
    <section className="y-section y-section--tight">
      <div className="container">
        <ul className="y-stats">
          {stats.map((s) => (
            <li key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
        <p className="y-stats__note">{t('home.statsNote')}</p>
      </div>
    </section>
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

  const loanFacts = [
    { v: t('loanCta.answer'), l: t('loanCta.answerLabel') },
    { v: t('loanCta.cost'), l: t('loanCta.costLabel') },
    { v: t('loanCta.support'), l: t('loanCta.supportLabel') },
  ];

  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      {/* ============ HERO + SIMULATEUR ============ */}
      <section className="y-hero">
        <div className="container">
          <div className="y-hero__grid">
            <div className="y-hero__copy">
              <span className="y-eyebrow">
                <i className="ti-shield" aria-hidden="true" /> {t('misc.invest')}
              </span>
              <h1 className="y-hero__title">
                {t('hero.title1')}{' '}
                <span className="accent">{t('hero.title2')}</span>
              </h1>
              <p className="y-hero__sub">{t('hero.subtitle')}</p>
              <div className="y-hero__actions">
                <Link to="/loan" className="btn btn-primary btn-lg">
                  {t('nav.cta')}
                </Link>
                <Link to="/service" className="btn btn-secondary btn-lg">
                  {t('hero.explore')}
                </Link>
              </div>
              <div className="y-hero__trust">
                {t('hero.trust').split(' · ').map((item) => (
                  <span key={item}><i className="ti-check" aria-hidden="true" />{item}</span>
                ))}
              </div>
            </div>
            <div className="y-hero__aside">
              <Simulator />
            </div>
          </div>
        </div>
      </section>

      {/* ============ MENTION LÉGALE ============ */}
      <p className="y-legal">{t('home.legalNotice')}</p>

      {/* ============ CHIFFRES ============ */}
      <StatsRow />

      {/* ============ POURQUOI BIFAUMA ============ */}
      <section className="y-band" id="why">
        <div className="container">
          <div className="y-head">
            <h2>{t('features.title')}</h2>
            <p>{t('features.subtitle')}</p>
          </div>
          <div className="y-cards">
            {featureItems.map((f, i) => (
              <Reveal as="article" className="y-card" key={f.data.title} delay={i * 80}>
                <span className="y-card__icon y-card__icon--teal">
                  <i className={f.icon} aria-hidden="true" />
                </span>
                <h3>{f.data.title}</h3>
                <p>{f.data.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NOS SOLUTIONS ============ */}
      <section className="y-section" id="solutions">
        <div className="container">
          <div className="y-head">
            <h2>{t('misc.services')}</h2>
            <p>{t('service.subtitle')}</p>
          </div>
          <div className="y-cards">
            {solutions.map((s, i) => (
              <Reveal as="article" className="y-card" key={s.title} delay={i * 80}>
                <span className="y-card__icon">
                  <i className={SOLUTION_ICONS[i]} aria-hidden="true" />
                </span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to="/service" className="y-card__link">
                  {t('misc.more')} <i className="ti-arrow-right" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMMENT ÇA MARCHE ============ */}
      <section className="y-band" id="how">
        <div className="container">
          <div className="y-head">
            <h2>{t('how.title')}</h2>
            <p>{t('how.desc')}</p>
          </div>
          <div className="y-steps">
            {howSteps.map((s, i) => (
              <Reveal as="div" className="y-step" key={i} delay={i * 80}>
                <span className="y-step__num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BLOC DEMANDE DE FINANCEMENT ============ */}
      <section className="y-section">
        <div className="container">
          <Reveal as="div">
            <div className="y-cta">
              <div className="y-cta__copy">
                <span className="y-cta__tag">{t('loanCta.tag')}</span>
                <h2>{t('loanCta.title')}</h2>
                <p>{t('loanCta.subtitle')}</p>
                <Link to="/loan" className="btn btn-primary btn-lg">
                  {t('loanCta.cta')} <i className="ti-arrow-right ml-2" aria-hidden="true" />
                </Link>
              </div>
              <div className="y-cta__facts">
                {loanFacts.map((f) => (
                  <div className="y-cta__fact" key={f.l}>
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
      <section className="y-band">
        <div className="container">
          <div className="y-head">
            <h2>{t('projects.title')}</h2>
            <p>{t('projects.subtitle')}</p>
          </div>
          <p className="y-note">
            <i className="ti-info-alt" aria-hidden="true" />
            {t('projects.illustrativeNote')}
          </p>
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
          <div className="y-center">
            <Link to="/projects" className="btn btn-secondary btn-lg">{t('misc.allProjects')}</Link>
          </div>
        </div>
      </section>

      {/* ============ CONFIANCE ============ */}
      <section className="y-section">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-5 order-2 order-md-1 mb-4 mb-md-0">
              <h2 className="y-h2">{t('trust.title')}</h2>
              <p className="y-lead">{t('trust.desc')}</p>
              <ul className="y-checks">
                {t('trust.list').map((s, i) => (
                  <li key={i}><i className="ti-check" aria-hidden="true" />{s}</li>
                ))}
              </ul>
              <div className="y-hero__actions" style={{ marginBottom: 0 }}>
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
      <section className="y-band">
        <div className="container">
          <div className="y-head">
            <h2>{t('clients.title')}</h2>
          </div>
          <CoverageStrip />
        </div>
      </section>

      <Newsletter />
    </>
  );
}
