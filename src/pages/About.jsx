import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import Reveal from '../components/Reveal.jsx';
import CoverageStrip from '../components/CoverageStrip.jsx';

export default function About() {
  const { t } = useI18n();
  const serviceItems = t('service.items');
  const stats = t('about.stats');
  const certs = t('about.certs');

  return (
    <div className="about page-hero">
      <div className="page-hero-head">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title mb-0">{t('about.title')}</h1>
            <p className="lead">{t('about.p1')}</p>
          </div>
        </div>
      </div>

      {/* Histoire */}
      <section className="section-lg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img className="about-photo" src="/assets/images/about.jpg" alt="" loading="lazy" />
            </div>
            <div className="col-lg-6">
              <h2 className="section-title">{t('about.historyTitle')}</h2>
              <p>{t('about.history')}</p>
              <Link to="/projects" className="btn btn-primary">{t('hero.explore')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="section" style={{ borderTop: '1px solid var(--bf-line)', borderBottom: '1px solid var(--bf-line)' }}>
        <div className="container text-center">
          <h2 className="section-title mb-4">{t('about.statsTitle')}</h2>
          <div className="stat-grid">
            {stats.map((s) => {
              const m = /^(\d+)(.*)$/.exec(s.value);
              const animatable = m && m[1] !== '0' && !s.value.includes('/');
              return (
                <div className="stat-cell" key={s.label}>
                  <div className="stat-value">
                    {animatable ? (
                      <AnimatedCounter end={Number(m[1])} suffix={m[2].trim() ? ` ${m[2].trim()}` : ''} />
                    ) : (
                      s.value
                    )}
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision + engagements */}
      <section className="section">
        <div className="container">
          <div className="row">
            <Reveal as="div" className="col-md-6 mb-4 mb-md-0">
              <h2 className="section-title">{t('about.visionTitle')}</h2>
              <p>{t('about.vision')}</p>
            </Reveal>
            <Reveal as="div" className="col-md-6" delay={120}>
              <h2 className="section-title">{t('about.certTitle')}</h2>
              <ul className="service-list pl-0">
                {certs.map((c, i) => (
                  <li key={i}><i className="ti-shield mr-2" />{c}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" style={{ borderTop: '1px solid var(--bf-line)' }}>
        <div className="container">
          <h2 className="section-title text-center mb-4">{t('about.productTitle')}</h2>
          <p className="text-center mb-5 mx-auto" style={{ maxWidth: 640 }}>{t('service.subtitle')}</p>
          <div className="row">
            {serviceItems.map((s, i) => (
              <div className="col-sm-6 col-lg-3 mb-4" key={s.title}>
                <Reveal as="div" delay={i * 70} className="h-100">
                  <div className="solution-card">
                    <i className="ti-layers-alt round-icon blue" aria-hidden="true" />
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
          <div className="d-flex flex-wrap justify-content-center mt-3">
            <Link to="/loan" className="btn btn-primary mr-2 mb-2">{t('misc.loan')}</Link>
            <Link to="/submit" className="btn btn-secondary mr-2 mb-2">{t('misc.submitProject')}</Link>
            <Link to="/service" className="btn btn-outline-dark mb-2">{t('misc.services')}</Link>
          </div>
        </div>
      </section>

      {/* Couverture */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title mb-4">{t('about.clients')}</h2>
          <CoverageStrip />
        </div>
      </section>
    </div>
  );
}