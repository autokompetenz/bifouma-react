import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Navbar() {
  const { t } = useI18n();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const togglerRef = useRef(null);
  // En-tête clair en permanence (le hero de l'accueil est désormais clair) :
  // une ombre n'apparaît qu'une fois la page défilée ou le menu ouvert.
  const solid = scrolled || open;

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

  // Fermer au clavier (Échap) et rendre le focus au bouton
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        togglerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Navigation principale resserrée : une seule destination par besoin.
  const links = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/service', label: t('nav.service') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className={`fixed-top navigation y-nav ${solid ? 'y-nav--solid' : ''}`}>
      <div className="container">
        <nav className="navbar navbar-expand-lg px-0" aria-label={t('nav.menu')}>
          <Link className="navbar-brand" to="/" onClick={() => setOpen(false)}>
            <span className="bif-wordmark">BIFAUMA</span>
          </Link>
          <div className="d-flex align-items-center order-lg-3 ml-auto">
            <div className="bif-header-lang">
              <LanguageSwitcher compact />
            </div>
            <button
              ref={togglerRef}
              className="navbar-toggler border-0 ml-2"
              type="button"
              aria-label={t('nav.menu')}
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
                <li className="nav-item" key={l.to}>
                  <NavLink className="nav-link" to={l.to} end={l.end}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-center ml-lg-3 my-2 my-lg-0">
              <Link className="btn btn-primary" to="/loan" onClick={() => setOpen(false)}>
                {t('nav.cta')}
              </Link>
            </div>
            <div className="d-lg-none mt-3 d-flex justify-content-center">
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}