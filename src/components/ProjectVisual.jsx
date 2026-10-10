import { sectorLabels } from '../data/projects.js';
import { useI18n } from '../i18n.jsx';

const SECTOR_THEME = {
  energy: {
    icon: 'ti-bolt',
    gradient: 'linear-gradient(135deg, var(--bf-navy) 0%, var(--bf-navy-800) 55%, #0E5AA8 130%)',
    accent: 'var(--bf-teal)',
  },
  realestate: {
    icon: 'ti-home',
    gradient: 'linear-gradient(135deg, var(--bf-navy) 0%, var(--bf-navy-700) 55%, #1070C4 130%)',
    accent: '#7FC4F5',
  },
  agro: {
    icon: 'ti-package',
    gradient: 'linear-gradient(135deg, var(--bf-navy) 0%, #0C2A4A 55%, #0E6E63 130%)',
    accent: 'var(--bf-teal)',
  },
  retail: {
    icon: 'ti-shopping-cart',
    gradient: 'linear-gradient(135deg, var(--bf-navy) 0%, var(--bf-navy-800) 55%, #2C5AA8 130%)',
    accent: '#9DB8F0',
  },
};

export default function ProjectVisual({ image, sector, title = '', size = 'card' }) {
  const { lang } = useI18n();
  const theme = SECTOR_THEME[sector] || SECTOR_THEME.energy;
  const label =
    (sectorLabels[sector] && sectorLabels[sector][lang]) || sectorLabels[sector].fr || sector;

  if (image) {
    const webp = image.replace(/\.jpe?g$/i, '.webp');
    return (
      <div
        className={`project-visual project-visual--${size} project-visual--photo`}
        role="img"
        aria-label={label}
      >
        <picture>
          <source srcSet={webp} type="image/webp" />
          <img src={image} alt="" loading="lazy" decoding="async" />
        </picture>
        <div className="project-visual__scrim" aria-hidden="true" />
        <span className="project-visual__label" style={{ borderColor: theme.accent, color: '#fff' }}>{label}</span>
        <i className={`${theme.icon} project-visual__icon`} aria-hidden="true" />
      </div>
    );
  }

  const monogram = title.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <div className={`project-visual project-visual--${size}`} style={{ background: theme.gradient }} role="img" aria-label={label}>
      <div className="project-visual__grid" aria-hidden="true" />
      <span className="project-visual__monogram">{monogram || label.slice(0, 2).toUpperCase()}</span>
      <i className={`${theme.icon} project-visual__icon`} aria-hidden="true" />
      <span className="project-visual__label" style={{ borderColor: theme.accent, color: theme.accent }}>{label}</span>
    </div>
  );
}