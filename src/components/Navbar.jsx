import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 100);
      if (y > lastY && y > 140 && !open) {
        setHidden(true);
      } else if (y < lastY || y < 140) {
        setHidden(false);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  const close = () => setOpen(false);

  const links = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/#feature', label: t('nav.features') },
    { to: '/about', label: t('nav.about') },
    { to: '/service', label: t('nav.service') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/#team', label: t('nav.team') },
    { to: '/#pricing', label: t('nav.pricing') },
    { to: '/loan', label: t('nav.loan') },
    { to: '/submit', label: t('nav.submitProject') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <section className={`fixed-top navigation ${scrolled ? 'nav-bg' : ''} ${hidden ? 'nav-hidden' : ''}`}>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light px-0">
          <Link className="navbar-brand" to="/" onClick={close}>
            <img src="/assets/images/logo.png" alt="BIFAUMA logo" style={{ height: 36 }} />
          </Link>
          <div className="d-flex align-items-center order-lg-3 ml-auto ml-lg-3">
            <LanguageSwitcher compact />
            <button
              className="navbar-toggler border-0 ml-2"
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
          <div className={`collapse navbar-collapse text-center ${open ? 'show' : ''}`}>
            <ul className="navbar-nav ml-auto">
              {links.map((l) =>
                l.to.includes('#') ? (
                  <li className="nav-item" key={l.label}>
                    <Link className="nav-link page-scroll" onClick={close} to={l.to}>
                      {l.label}
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item" key={l.label}>
                    <NavLink className="nav-link page-scroll" onClick={close} to={l.to} end={l.end}>
                      {l.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
            <div className="d-flex align-items-center justify-content-center flex-wrap ml-lg-3">
              <Link className="btn btn-primary primary-shadow my-2" onClick={close} to="/projects">
                {t('nav.tryFree')}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}