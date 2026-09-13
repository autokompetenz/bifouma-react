import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';

const iconCycle = ['ti-wallet', 'ti-briefcase', 'ti-layers-alt', 'ti-headphone-alt', 'ti-search', 'ti-time'];

export default function Service() {
  const { t } = useI18n();
  const items = t('service.items');

  return (
    <>
      <section className="section-lg service-bg-image position-relative page-hero">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="section-title">{t('service.title')}</h2>
              <p className="mb-4">{t('service.subtitle')}</p>
            </div>
            {items.map((s, i) => (
              <div className="col-sm-6 mb-4" key={s.title}>
                <div className="rounded bg-white p-4 shadow-primary h-100">
                  <i className={`${iconCycle[i]} round-icon blue mb-4`} />
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="row justify-content-center mt-4">
            <Link to="/loan" className="btn btn-primary primary-shadow mr-2 mb-2">{t('misc.loan')}</Link>
            <Link to="/submit" className="btn btn-secondary mb-2 mr-2">{t('misc.submitProject')}</Link>
            <Link to="/projects" className="btn btn-primary mb-2">{t('misc.invest')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}