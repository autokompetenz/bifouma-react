import { useI18n } from '../i18n.jsx';

export default function LegalPage({ type }) {
  const { t } = useI18n();
  const telegram = 'https://t.me/491745944264';
  const facebook = 'https://www.facebook.com/profile.php?id=61594025471011';

  if (type === 'faq') {
    const faq = t('legal.faq');
    return (
      <section className="section-lg page-hero">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">{faq.title}</h2>
            <p>{faq.subtitle}</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {faq.items.map((item, i) => (
                <div className="rounded bg-white p-4 shadow-primary mb-3" key={i}>
                  <h5 className="mb-2">{item.q}</h5>
                  <p className="mb-0">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const p = t(`legal.${type}`);

  return (
    <section className="section-lg page-hero">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">{p.title}</h2>
          {p.intro && <p>{p.intro}</p>}
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {p.company && (
              <div className="rounded bg-white p-4 shadow-primary mb-3">
                <h5 className="mb-0">{p.company}</h5>
              </div>
            )}
            {p.repTitle && p.rep && (
              <div className="rounded bg-white p-4 shadow-primary mb-3">
                <h6 className="mb-1">{p.repTitle}</h6>
                <p className="mb-0">{p.rep}</p>
              </div>
            )}
            {p.contactTitle && (
              <div className="rounded bg-white p-4 shadow-primary mb-3">
                <h6 className="mb-2">{p.contactTitle}</h6>
                <ul className="service-list pl-0 mb-0">
                  {p.contact.map((c, i) => (
                    <li key={i}><i className="ti-check text-purple mr-2" />{c}</li>
                  ))}
                </ul>
              </div>
            )}
            {p.sections &&
              p.sections.map((s, i) => (
                <div className="rounded bg-white p-4 shadow-primary mb-3" key={i}>
                  <h5 className="mb-2">{s.title}</h5>
                  <p className="mb-0">{s.text}</p>
                </div>
              ))}
            {p.liabilityTitle && (
              <div className="rounded bg-white p-4 shadow-primary mb-3">
                <h6 className="mb-2">{p.liabilityTitle}</h6>
                <p className="mb-0">{p.liability}</p>
              </div>
            )}
            {p.copyrightTitle && (
              <div className="rounded bg-white p-4 shadow-primary">
                <h6 className="mb-2">{p.copyrightTitle}</h6>
                <p className="mb-0">{p.copyright}</p>
              </div>
            )}
            {p.contactNote && (
              <p className="mt-4 text-center" style={{ color: '#6c7690' }}>{p.contactNote}</p>
            )}
            <div className="text-center mt-4">
              <a href={telegram} target="_blank" rel="noreferrer" className="btn btn-primary primary-shadow mr-2 mb-2">
                <i className="ti-location-arrow mr-1" />{t('projectDetail.telegram')}
              </a>
              <a href={facebook} target="_blank" rel="noreferrer" className="btn btn-secondary mb-2">
                <i className="ti-facebook mr-1" />{t('projectDetail.facebook')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}