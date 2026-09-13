import { useI18n, LANGS } from '../i18n.jsx';

export default function LanguageSwitcher({ compact = false }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={`lang-switch ${compact ? '' : ''}`} aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          className={lang === l.code ? 'active' : ''}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}