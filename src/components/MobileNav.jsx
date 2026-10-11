import { NavLink } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';

// Barre de navigation inférieure fixe (format mobile, conforme à la maquette
// « accueil_bifauma_financement ») : 5 entrées à cible tactile ≥ 44 px.
const ITEMS = [
  { to: '/', icon: 'ti-home', label: 'overview', end: true },
  { to: '/loan', icon: 'ti-wallet', label: 'simulator' },
  { to: '/projects', icon: 'ti-briefcase', label: 'financing' },
  { to: '/submit', icon: 'ti-folder', label: 'files' },
  { to: '/contact', icon: 'ti-headphone-alt', label: 'advisor' },
];

export default function MobileNav() {
  const { t } = useI18n();
  return (
    <nav className="mobile-nav d-lg-none" aria-label={t('mobileNav.label')}>
      {ITEMS.map((it) => (
        <NavLink key={it.to} to={it.to} end={it.end} className="mobile-nav__item">
          <i className={it.icon} aria-hidden="true" />
          <span>{t(`mobileNav.${it.label}`)}</span>
        </NavLink>
      ))}
    </nav>
  );
}