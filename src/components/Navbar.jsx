import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Navbar() {
  const { t } = useI18n();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onDark = location.pathname === '/' && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Fermer le menu quand la route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/#solutions', label: t('nav.features'), end: true },
    { to: '/#how', label: t('nav.comment'), end: true },
    { to: '/about', label: t('nav.about') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed-top navigation ${scrolled ? 'nav-bg' : ''} ${onDark ? 'nav-on-dark' : ''}`}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg px-0" aria-label={t('nav.menu')}>
          <Link className="navbar-brand" to="/" onClick={() => setOpen(false)}>
            <span className="bif-wordmark">BIFAUMA</span>
          </Link>
          <div className="d-flex align-items-center order-lg-3 ml-auto">
            <LanguageSwitcher compact />
            <button
              className="navbar-toggler border-0 ml-2"
              type="button"
              aria-label={open ? t('nav.menu') : t('nav.menu')}
              aria-expanded={open}
              aria-controls="bifMenu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="bif-hamburger" aria-hidden="true" />
            </button>
          </div>
          <div id="bifMenu" className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
            <ul className="navbar-nav ml-auto">
              {links.map((l) => (
                <li className="nav-item" key={l.label}>
                  {l.to.includes('#') ? (
                    <Link className="nav-link" to={l.to}>
                      {l.label}
                    </Link>
                  ) : (
                    <NavLink className="nav-link" to={l.to} end={l.end}>
                      {l.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-center ml-lg-3 my-2 my-lg-0">
              <Link className="btn btn-primary" to="/loan">
                {t('nav.cta')}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}