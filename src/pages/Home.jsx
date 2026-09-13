import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import Reveal from '../components/Reveal.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import BrandVisual from '../components/BrandVisual.jsx';
import CoverageStrip from '../components/CoverageStrip.jsx';

function Newsletter() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  return (
    <section className="newsletter">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>{t('newsletter.title')}</h2>
            <p className="mb-5">{t('newsletter.subtitle')}</p>
          </div>
          <div className="col-lg-8 col-sm-10 col-12 mx-auto">
            {sent ? (
              <p className="bif-success text-center">{t('newsletter.success')}</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="input-wrapper position-relative">
                  <input type="email" className="newsletter-form" placeholder={t('newsletter.placeholder')} required />
                  <button type="submit" className="btn newsletter-btn">{t('newsletter.btn')}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useI18n();

  const stats = t('home.stats');

  const counterMap = {
    '72 h': { end: 72, suffix: ' h' },
    '0 €': { end: 0, suffix: ' €' },
    '3': { end: 3 },
  };

  const featureItems = [
    { icon: 'ti-check-box', data: t('features.f1') },
    { icon: 'ti-eye', data: t('features.f2') },
    { icon: 'ti-lock', data: t('features.f3') },
    { icon: 'ti-agenda', data: t('features.f4') },
  ];

  return (
    <>
      {/* hero */}
      <section className="hero-section hero hero-bif">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="mb-3">
                {t('hero.title1')}<br />
                {t('hero.title2')}
              </h1>
              <p className="mb-4">{t('hero.subtitle')}</p>
              <div className="mb-4">
                <Link to="/loan" className="btn btn-primary btn-lg primary-shadow mr-2">{t('hero.tryFree')}</Link>
                <Link to="/service" className="btn btn-secondary btn-lg">{t('hero.explore')}</Link>
              </div>
              <div className="hero-trust">
                {t('home.stats').slice(0, 3).map((s) => (
                  <span key={s.label}>
                    <i className="ti-check" aria-hidden="true" />
                    <strong>{s.value}</strong>&nbsp;{s.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="section pt-0 pb-0">
        <div className="container">
          <div className="stat-grid mt-4 mb-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 120} as="div" className="stat-cell">
                <div className="stat-value">
                  {counterMap[s.value] ? (
                    <AnimatedCounter
                      end={counterMap[s.value].end}
                      prefix={counterMap[s.value].prefix}
                      suffix={counterMap[s.value].suffix}
                    />
                  ) : (
                    s.value
                  )}
                </div>
                <div className="stat-label">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* loan CTA — privilégié */}
      <section className="section loan-cta pt-0">
        <div className="container">
          <Reveal>
            <div className="loan-cta-card">
              <div className="row align-items-center">
                <div className="col-lg-5 mb-4 mb-lg-0">
                  <span className="loan-cta-tag">{t('home.loanCta.tag')}</span>
                  <h2 className="section-title mb-3">{t('home.loanCta.title')}</h2>
                  <p className="loan-cta-sub">{t('home.loanCta.subtitle')}</p>
                  <Link to="/loan" className="btn btn-secondary btn-lg loan-cta-btn">
                    {t('home.loanCta.cta')} <i className="ti-arrow-right ml-2" />
                  </Link>
                </div>
                <div className="col-lg-7">
                  {t('loan.steps').map((s, i) => (
                    <div className="loan-cta-step" key={s}>
                      <span className="loan-cta-num">{i + 1}</span>
                      <strong>{s}</strong>
                    </div>
                  ))}
                </div>
              </div>
              <div className="loan-cta-facts">
                <div className="loan-cta-fact">
                  <strong>{t('home.loanCta.answer')}</strong>
                  <span>{t('home.loanCta.answerLabel')}</span>
                </div>
                <div className="loan-cta-fact">
                  <strong>{t('home.loanCta.cost')}</strong>
                  <span>{t('home.loanCta.costLabel')}</span>
                </div>
                <div className="loan-cta-fact">
                  <strong>{t('home.loanCta.support')}</strong>
                  <span>{t('home.loanCta.supportLabel')}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* feature */}
      <section className="section feature mb-0" id="solutions">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">{t('features.title')}</h2>
              <p className="mb-4">{t('features.subtitle')}</p>
            </div>
            {featureItems.map((f, i) => (
              <Reveal as="div" className="col-md-6 mb-4" key={f.icon} delay={i * 100}>
                <div className="d-flex feature-item">
                  <div>
                    <i className={`${f.icon} feature-icon mr-4`} />
                  </div>
                  <div>
                    <h4>{f.data.title}</h4>
                    <p>{f.data.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="section-lg seo" id="how">
        <div className="container">
          <div className="row">
            <Reveal as="div" className="col-md-6">
              <BrandVisual icon="ti-agenda" items={t('how.list')} />
            </Reveal>
            <Reveal as="div" className="col-md-5" delay={150}>
              <h2 className="section-title">{t('how.title')}</h2>
              <p>{t('how.desc')}</p>
              <Link to="/loan" className="btn btn-primary primary-shadow mt-3">{t('misc.loan')}</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* trust */}
      <section className="section-lg service">
        <div className="container">
          <div className="row justify-content-between">
            <Reveal as="div" className="col-md-5 order-2 order-md-1">
              <h2 className="section-title">{t('trust.title')}</h2>
              <p className="mb-4">{t('trust.desc')}</p>
              <div className="d-flex flex-wrap mt-4">
                <Link to="/service" className="btn btn-primary primary-shadow mr-2 mb-2">{t('misc.services')}</Link>
                <Link to="/loan" className="btn btn-secondary mr-2 mb-2">{t('misc.loan')}</Link>
                <Link to="/submit" className="btn btn-outline-dark mb-2">{t('misc.submitProject')}</Link>
              </div>
            </Reveal>
            <Reveal as="div" className="col-md-7 order-1 order-md-2" delay={150}>
              <BrandVisual icon="ti-shield" items={t('trust.list')} size="lg" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* clients */}
      <section className="section">
        <div className="container">
          <h2 className="text-center section-title mb-4">{t('clients.title')}</h2>
          <CoverageStrip />
        </div>
      </section>

      <Newsletter />
    </>
  );
}