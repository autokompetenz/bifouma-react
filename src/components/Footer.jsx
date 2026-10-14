import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Footer() {
  const { t } = useI18n();
  const telegram = 'https://t.me/BIFAUMA';
  const facebook = 'https://www.facebook.com/profile.php?id=61595091127325';
  const year = new Date().getFullYear();

  return (
    <footer className="y-footer">
      <div className="container">
        <div className="y-footer__cta">
          <h3>{t('footer.ctaTitle')}</h3>
          <Link to="/loan" className="btn btn-primary btn-lg">
            {t('footer.ctaBtn')}
          </Link>
        </div>

        <div className="y-footer__grid">
          <div className="y-footer__brand">
            <span className="y-logo">BIFAUMA</span>
            <p className="y-footer__tagline">{t('footer.tagline')}</p>
            <LanguageSwitcher />
            <div className="y-footer__social">
              <a href={telegram} target="_blank" rel="noreferrer" aria-label="Telegram">
                <i className="ti-location-arrow" aria-hidden="true" />
              </a>
              <a href={facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="ti-facebook" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav className="y-footer__col" aria-label={t('footer.links')}>
            <h6>{t('footer.links')}</h6>
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/service">{t('nav.service')}</Link>
            <Link to="/projects">{t('nav.projects')}</Link>
            <Link to="/submit">{t('nav.submitProject')}</Link>
            <Link to="/about">{t('nav.about')}</Link>
          </nav>

          <nav className="y-footer__col" aria-label={t('footer.legal')}>
            <h6>{t('footer.legal')}</h6>
            <Link to="/imprint">{t('footer.imprint')}</Link>
            <Link to="/privacy">{t('footer.privacy')}</Link>
            <Link to="/faq">{t('footer.faq')}</Link>
            <Link to="/contact">{t('nav.contact')}</Link>
          </nav>

          <nav className="y-footer__col" aria-label={t('footer.contactTitle')}>
            <h6>{t('footer.contactTitle')}</h6>
            <a href={telegram} target="_blank" rel="noreferrer">Telegram : +49 174 594 4264</a>
            <a href={facebook} target="_blank" rel="noreferrer">Facebook</a>
          </nav>
        </div>

        <div className="y-footer__bottom">
          <small>© {year} BIFAUMA — {t('footer.rights')}</small>
        </div>
      </div>
    </footer>
  );
}
