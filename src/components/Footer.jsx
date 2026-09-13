import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Footer() {
  const { t } = useI18n();
  const telegram = 'https://t.me/491745944264';
  const facebook = 'https://www.facebook.com/profile.php?id=61594025471011';

  return (
    <footer className="footer-section footer">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-4 text-center text-lg-left mb-4 mb-lg-0">
            <a href="/">
              <img className="img-fluid" src="/assets/images/logo.png" alt="BIFAUMA logo" />
            </a>
            <p className="mt-3" style={{ color: '#aab3cc', fontSize: 15 }}>
              {t('footer.tagline')}
            </p>
          </div>
          <nav className="col-lg-3 col-md-6 mb-4">
            <h6 className="mb-3" style={{ color: '#fff' }}>{t('footer.links')}</h6>
            <div className="footer-links">
              <Link to="/projects">{t('nav.projects')}</Link>
              <Link to="/about">{t('nav.about')}</Link>
              <Link to="/service">{t('nav.service')}</Link>
              <Link to="/contact">{t('nav.contact')}</Link>
            </div>
          </nav>
          <nav className="col-lg-3 col-md-6 mb-4">
            <h6 className="mb-3" style={{ color: '#fff' }}>{t('footer.legal')}</h6>
            <div className="footer-links">
              <Link to="/imprint">{t('footer.imprint')}</Link>
              <Link to="/privacy">{t('footer.privacy')}</Link>
              <Link to="/faq">{t('footer.faq')}</Link>
            </div>
          </nav>
          <nav className="col-lg-2 col-12 text-lg-right text-center align-self-center">
            <LanguageSwitcher />
            <h6 className="mt-4" style={{ color: '#fff' }}>{t('footer.contactTitle')}</h6>
            <ul className="list-inline social-icon mt-2">
              <li className="list-inline-item">
                <a className="twitter" href={telegram} target="_blank" rel="noreferrer" aria-label="Telegram">
                  <i className="ti-location-arrow" />
                </a>
              </li>
              <li className="list-inline-item">
                <a className="facebook" href={facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <i className="ti-facebook" />
                </a>
              </li>
            </ul>
          </nav>
          <nav className="col-12 text-center mt-2">
            <small style={{ color: '#7c8aab' }}>
              © {new Date().getFullYear()} BIFAUMA — {t('footer.rights')}
            </small>
          </nav>
        </div>
      </div>
    </footer>
  );
}