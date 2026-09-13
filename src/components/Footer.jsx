import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Footer() {
  const { t } = useI18n();
  const telegram = 'https://t.me/491745944264';
  const facebook = 'https://www.facebook.com/profile.php?id=61594025471011';
  const year = new Date().getFullYear();

  return (
    <footer className="footer footer-section">
      <div className="container">
        <div className="footer-cta-row">
          <h3 className="footer-cta-title mb-0">{t('footer.ctaTitle')}</h3>
          <Link to="/loan" className="btn btn-primary btn-lg">
            {t('footer.ctaBtn')}
          </Link>
        </div>

        <div className="row justify-content-between">
          <div className="col-lg-4 col-md-6 text-center text-md-left mb-4 mb-lg-0">
            <span className="bif-wordmark">BIFAUMA</span>
            <p className="mt-3 mb-4" style={{ maxWidth: 320, fontSize: 15 }}>
              {t('footer.tagline')}
            </p>
            <div className="d-flex justify-content-center justify-content-md-start">
              <LanguageSwitcher />
            </div>
          </div>

          <nav className="col-lg-3 col-md-6 mb-4" aria-label={t('footer.links')}>
            <h6 className="mb-3">{t('footer.links')}</h6>
            <div className="footer-links">
              <Link to="/">{t('nav.home')}</Link>
              <Link to="/service">{t('nav.service')}</Link>
              <Link to="/projects">{t('nav.projects')}</Link>
              <Link to="/submit">{t('nav.submitProject')}</Link>
              <Link to="/about">{t('nav.about')}</Link>
            </div>
          </nav>

          <nav className="col-lg-2 col-md-6 mb-4" aria-label={t('footer.legal')}>
            <h6 className="mb-3">{t('footer.legal')}</h6>
            <div className="footer-links">
              <Link to="/imprint">{t('footer.imprint')}</Link>
              <Link to="/privacy">{t('footer.privacy')}</Link>
              <Link to="/faq">{t('footer.faq')}</Link>
            </div>
          </nav>

          <nav className="col-lg-3 col-md-6 text-center text-md-left" aria-label={t('footer.contactTitle')}>
            <h6 className="mb-3">{t('footer.contactTitle')}</h6>
            <p className="mb-1" style={{ fontSize: 14.5 }}>
              <a href={telegram} target="_blank" rel="noreferrer" className="footer-links-a">
                Telegram: +49 174 594 4264
              </a>
            </p>
            <p className="mb-3" style={{ fontSize: 14.5 }}>
              <a href={facebook} target="_blank" rel="noreferrer" className="footer-links-a">
                Facebook
              </a>
            </p>
            <ul className="list-inline social-icon mt-3">
              <li className="list-inline-item">
                <a href={telegram} target="_blank" rel="noreferrer" aria-label="Telegram">
                  <i className="ti-location-arrow" aria-hidden="true" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href={facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <i className="ti-facebook" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <small>© {year} BIFAUMA — {t('footer.rights')}</small>
        </div>
      </div>
    </footer>
  );
}