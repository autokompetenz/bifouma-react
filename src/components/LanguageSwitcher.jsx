import { useI18n, LANGS } from '../i18n.jsx';

const SHORT = { fr: 'FR', de: 'DE', fi: 'FI', sr: 'SR' };

export default function LanguageSwitcher({ compact = false }) {
  const { lang, setLang } = useI18n();
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          className={lang === l.code ? 'active' : ''}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
        >
          {compact ? SHORT[l.code] || l.code : l.label}
        </button>
      ))}
    </div>
  );
}