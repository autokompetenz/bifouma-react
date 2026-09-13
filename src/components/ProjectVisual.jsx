import { sectorLabels } from '../data/projects.js';
import { useI18n } from '../i18n.jsx';

const SECTOR_THEME = {
  energy: {
    icon: 'ti-bolt',
    gradient: 'linear-gradient(135deg, #0e5fb1 0%, #17ffd3 130%)',
    accent: '#17ffd3',
  },
  realestate: {
    icon: 'ti-home',
    gradient: 'linear-gradient(135deg, #1b3a8f 0%, #008dec 130%)',
    accent: '#7fd1ff',
  },
  agro: {
    icon: 'ti-package',
    gradient: 'linear-gradient(135deg, #0a7d6c 0%, #21c87a 130%)',
    accent: '#a8f5c8',
  },
  retail: {
    icon: 'ti-shopping-cart',
    gradient: 'linear-gradient(135deg, #123a63 0%, #4a6cf7 135%)',
    accent: '#b3c5ff',
  },
};

export default function ProjectVisual({ image, sector, title = '', size = 'card' }) {
  const { lang } = useI18n();
  const theme = SECTOR_THEME[sector] || SECTOR_THEME.energy;
  const label =
    (sectorLabels[sector] && sectorLabels[sector][lang]) || sectorLabels[sector].de || sector;

  if (image) {
    return (
      <div
        className={`project-visual project-visual--${size} project-visual--photo`}
        role="img"
        aria-label={label}
      >
        <img src={image} alt={title} loading="lazy" />
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