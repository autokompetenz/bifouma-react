import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="page-hero">
      <div className="page-hero-head">
        <div className="container text-center">
          <h1 className="section-title mb-0" style={{ fontSize: 72 }}>404</h1>
          <h2 className="section-title mb-0">{t('notFound.title')}</h2>
        </div>
      </div>
      <section className="section-lg text-center">
        <div className="container">
          <Link to="/" className="btn btn-primary btn-lg">{t('notFound.back')}</Link>
        </div>
      </section>
    </div>
  );
}