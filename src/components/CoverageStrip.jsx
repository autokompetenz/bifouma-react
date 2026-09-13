import { countryLabels } from '../data/projects.js';
import { useI18n } from '../i18n.jsx';

export default function CoverageStrip() {
  const { lang } = useI18n();
  return (
    <div className="coverage-strip">
      {['de', 'fi', 'sr'].map((c) => (
        <span className="coverage-pill" key={c}>
          <i className="ti-location-pin" />
          {countryLabels[c][lang] || countryLabels[c].de}
        </span>
      ))}
    </div>
  );
}