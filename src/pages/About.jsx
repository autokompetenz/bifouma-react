import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import BrandVisual from '../components/BrandVisual.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import Reveal from '../components/Reveal.jsx';
import CoverageStrip from '../components/CoverageStrip.jsx';

export default function About() {
  const { t } = useI18n();
  const serviceItems = t('service.items');
  const stats = t('about.stats');
  const certs = t('about.certs');
  const members = t('team.members');

  const counterMap = {
    '€850K+': { end: 850, prefix: '€', suffix: 'K+' },
    '26': { end: 26 },
    '3': { end: 3 },
  };

  return (
    <>
      {/* about us */}
      <section className="section-lg about pb-0 page-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="section-title">{t('about.title')}</h2>
            </div>
            <div className="col-lg-12 mb-5">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <div className="d-flex flex-wrap mt-4">
                <Link to="/projects" className="btn btn-primary primary-shadow mr-2 mb-2">{t('misc.invest')}</Link>
                <Link to="/submit" className="btn btn-secondary mr-2 mb-2">{t('misc.submitProject')}</Link>
                <Link to="/loan" className="btn btn-outline-dark mb-2">{t('misc.loan')}</Link>
              </div>
            </div>
            <div className="col-lg-12 mb-4">
              <h3 className="section-title text-center">{t('about.statsTitle')}</h3>
              <div className="stat-grid">
                {stats.map((s) => (
                  <div className="stat-cell" key={s.label}>
                    <div className="stat-value">
                      {counterMap[s.value] ? (
                        <AnimatedCounter end={counterMap[s.value].end} suffix={counterMap[s.value].suffix} />
                      ) : (
                        s.value
                      )}
                    </div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* history */}
      <section className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <BrandVisual icon="ti-rocket" />
            </div>
            <div className="col-lg-6">
              <h2 className="section-title">{t('about.historyTitle')}</h2>
              <p>{t('about.history')}</p>
              <Link to="/projects" className="btn btn-primary primary-shadow">{t('hero.explore')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* services */}
      <section className="section product">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">{t('about.productTitle')}</h2>
              <p className="mb-4">{t('service.subtitle')}</p>
            </div>
            {serviceItems.map((s, i) => (
              <Reveal as="div" className="col-md-5 col-sm-6 m-2 shadow-primary rounded p-4" key={s.title} delay={i * 80} style={{ background: '#fff' }}>
                <i className="ti-layers-alt round-icon blue mb-3" />
                <h4>{s.title}</h4>
                <p className="mb-0">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* vision + standards */}
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
                  <li key={i}><i className="ti-shield text-purple mr-2" />{c}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* team */}
      <section className="section-lg team">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center mb-5">
              <h2 className="section-title">{t('about.teamTitle')}</h2>
              <p>{t('team.subtitle')}</p>
            </div>
            {members.map((m) => (
              <div className="col-md-6 col-lg-4 mb-4" key={m.name}>
                <div className="rounded bg-white p-4 shadow-primary text-center h-100">
                  <span
                    className="d-flex align-items-center justify-content-center mx-auto rounded-circle text-white font-weight-bold mb-3"
                    style={{ width: 72, height: 72, background: 'linear-gradient(25deg,#17ffd3,#008dec)' }}
                  >
                    {m.name.split(' ').map((p) => p[0]).join('')}
                  </span>
                  <h4 className="mb-0">{m.name}</h4>
                  <h6 className="text-color mb-0">{m.role}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* coverage */}
      <section className="section">
        <div className="container">
          <div className="col-lg-12 text-center">
            <h2 className="section-title">{t('about.clients')}</h2>
            <CoverageStrip />
          </div>
        </div>
      </section>
    </>
  );
}