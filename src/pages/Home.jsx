import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import Reveal from '../components/Reveal.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import BrandVisual from '../components/BrandVisual.jsx';
import CoverageStrip from '../components/CoverageStrip.jsx';

function TeamSlider() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [limit, setLimit] = useState(1);

  const measure = () => {
    const track = document.querySelector('.team-slider');
    if (!track) return;
    const vw = track.clientWidth;
    const item = 320 + 24;
    const n = Math.max(1, Math.floor(vw / item));
    setLimit((document.querySelectorAll('.team-slider .team-member').length || 0) - n);
  };

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const scrollTo = (i) => {
    const track = document.querySelector('.team-slider');
    if (track) track.scrollTo({ left: i * (320 + 24), behavior: 'smooth' });
    setIndex(i);
  };

  return (
    <div className="team-slider-wrap">
      <button type="button" className="team-arrow prev" aria-label="Previous" onClick={() => scrollTo(Math.max(0, index - 1))}>
        <i className="ti-arrow-left" />
      </button>
      <div className="team-slider">
        {t('team.members').map((m) => (
          <div className="team-member" key={m.name}>
            <div className="d-flex mb-3">
              <div className="mr-3">
                <span
                  className="d-flex align-items-center justify-content-center rounded-circle text-white font-weight-bold"
                  style={{ width: 64, height: 64, background: 'linear-gradient(25deg,#17ffd3,#008dec)' }}
                >
                  {m.name.split(' ').map((p) => p[0]).join('')}
                </span>
              </div>
              <div className="align-self-center">
                <h4 className="mb-0">{m.name}</h4>
                <h6 className="text-color mb-0">{m.role}</h6>
              </div>
            </div>
            <p>{t('team.bio')}</p>
          </div>
        ))}
      </div>
      <button type="button" className="team-arrow next" aria-label="Next" onClick={() => scrollTo(Math.min(limit, index + 1))}>
        <i className="ti-arrow-right" />
      </button>
    </div>
  );
}

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
    '€850K+': { end: 850, prefix: '€', suffix: 'K+' },
    '26': { end: 26 },
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
                <Link to="/projects" className="btn btn-secondary btn-lg mr-2">{t('hero.explore')}</Link>
                <Link to="/submit" className="btn btn-primary btn-lg primary-shadow">{t('hero.tryFree')}</Link>
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
      <section className="section feature mb-0" id="feature">
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
      <section className="section-lg seo">
        <div className="container">
          <div className="row">
            <Reveal as="div" className="col-md-6">
              <BrandVisual icon="ti-agenda" items={t('how.list')} />
            </Reveal>
            <Reveal as="div" className="col-md-5" delay={150}>
              <h2 className="section-title">{t('how.title')}</h2>
              <p>{t('how.desc')}</p>
              <Link to="/projects" className="btn btn-primary primary-shadow mt-3">{t('hero.explore')}</Link>
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
                <Link to="/projects" className="btn btn-primary primary-shadow mr-2 mb-2">{t('misc.invest')}</Link>
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

      {/* team */}
      <section className="section-lg team" id="team">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 text-center">
              <Reveal>
                <h2 className="section-title">{t('team.title')}</h2>
                <p className="mb-4">{t('team.subtitle')}</p>
              </Reveal>
            </div>
          </div>
          <Reveal delay={120} className="col-11 mx-auto">
            <TeamSlider />
          </Reveal>
        </div>
      </section>

      {/* pricing */}
      <section className="section-lg pb-0 pricing" id="pricing">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <Reveal>
                <h2 className="section-title">{t('pricing.title')}</h2>
                <p className="mb-50">{t('pricing.subtitle')}</p>
              </Reveal>
            </div>
            <div className="col-lg-10 mx-auto">
              <div className="row justify-content-center">
                {t('pricing.cards').map((card, i) => (
                  <Reveal as="div" className="col-md-6 col-lg-4 mb-5 mb-lg-0" key={card.title} delay={i * 120}>
                    <div className={`rounded text-center pricing-table table-${i + 1}`}>
                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>
                      <Link to={card.to} className="btn pricing-btn px-3">{card.btn}</Link>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
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