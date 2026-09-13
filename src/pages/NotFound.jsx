import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <section className="section-lg page-hero text-center">
      <div className="container">
        <h1 className="display-3 mb-3">404</h1>
        <h2 className="section-title">{t('notFound.title')}</h2>
        <Link to="/" className="btn btn-primary primary-shadow mt-4">{t('notFound.back')}</Link>
      </div>
    </section>
  );
}