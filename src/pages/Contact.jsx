import { useState } from 'react';
import { useI18n } from '../i18n.jsx';

export default function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const cards = t('contact.infoCards');
  const f = t('contact.form');

  const telegram = { url: 'https://t.me/491745944264', label: '+49 174 594 4264' };
  const facebook = 'https://www.facebook.com/profile.php?id=61594025471011';

  const nameId = 'ct-name';
  const emailId = 'ct-email';
  const subjectId = 'ct-subject';
  const messageId = 'ct-message';

  return (
    <div className="contact page-hero">
      <div className="page-hero-head">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title mb-0">{t('contact.title')}</h1>
            <p className="lead">{t('contact.desc')}</p>
          </div>
        </div>
      </div>

      <section className="section-lg">
        <div className="container">
          <div className="contact-bg p-5 rounded mb-5">
            <div className="row">
              <div className="col-lg-7 mb-4 mb-lg-0">
                {sent ? (
                  <p className="bif-success">{t('contact.form.success')}</p>
                ) : (
                  <form
                    className="bif-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <label htmlFor={nameId}>{f.name} *</label>
                    <input id={nameId} type="text" className="form-control mb-3" name="name" required autoComplete="name" />
                    <label htmlFor={emailId}>{f.email} *</label>
                    <input id={emailId} type="email" className="form-control mb-3" name="mail" required autoComplete="email" />
                    <label htmlFor={subjectId}>{f.subject} *</label>
                    <input id={subjectId} type="text" className="form-control mb-3" name="subject" required />
                    <label htmlFor={messageId}>{f.message} *</label>
                    <textarea id={messageId} name="message" className="form-control mb-3" required />
                    <button type="submit" className="btn btn-primary">{f.send}</button>
                  </form>
                )}
              </div>
              <div className="col-lg-5">
                <div className="contact-row">
                  <i className="ti-location-arrow" aria-hidden="true" />
                  <div>
                    <strong>{t('contact.telephone')}</strong>
                    <br />
                    <a href={telegram.url} target="_blank" rel="noreferrer" className="contact-link">{telegram.label}</a>
                  </div>
                </div>
                <div className="contact-row">
                  <i className="ti-facebook" aria-hidden="true" />
                  <div>
                    <strong>{t('contact.facebook')}</strong>
                    <br />
                    <a href={facebook} target="_blank" rel="noreferrer" className="contact-link">BIFAUMA</a>
                  </div>
                </div>
                <div className="contact-row">
                  <i className="ti-location-pin" aria-hidden="true" />
                  <div>
                    <strong>{t('contact.address')}</strong>
                    <br />
                    <span>Europe · DE · FI · SR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            {cards.map((c) => (
              <div className="col-lg-4 col-sm-6 mb-4 mb-lg-0" key={c.title}>
                <div className="info-card">
                  <h3><i className="ti-shield round-icon blue mr-2" /> {c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}