import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import Reveal from '../components/Reveal.jsx';
import { SOLUTION_ICONS } from '../data/icons.js';

export default function Service() {
  const { t } = useI18n();
  const items = t('service.items');

  return (
    <>
      <div className="page-hero-head">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title mb-0">{t('service.title')}</h1>
            <p className="lead">{t('service.subtitle')}</p>
          </div>
        </div>
      </div>

      <section className="section-lg">
        <div className="container">
          <div className="row">
            {items.map((s, i) => (
              <div className="col-sm-6 col-lg-4 mb-4" key={s.title}>
                <Reveal as="div" delay={i * 70} className="h-100">
                  <div className="solution-card">
                    <i className={`${SOLUTION_ICONS[i]} round-icon blue`} aria-hidden="true" />
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
          <div className="d-flex flex-wrap justify-content-center mt-4">
            <Link to="/loan" className="btn btn-primary btn-lg mr-2 mb-2">{t('nav.cta')}</Link>
            <Link to="/submit" className="btn btn-secondary btn-lg mb-2">{t('misc.submitProject')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}