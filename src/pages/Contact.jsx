import { useState } from 'react';
import { useI18n } from '../i18n.jsx';
import { sendForm, describeSendError, SendError } from '../lib/sendForm.js';

const empty = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { t, lang } = useI18n();
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const cards = t('contact.infoCards');
  const f = t('contact.form');

  const telegram = { url: 'https://t.me/491745944264', label: '+49 174 594 4264' };
  const facebook = 'https://www.facebook.com/profile.php?id=61594025471011';

  const nameId = 'ct-name';
  const emailId = 'ct-email';
  const subjectId = 'ct-subject';
  const messageId = 'ct-message';

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await sendForm('contact', form, [], lang);
      setStatus('success');
      setForm(empty);
    } catch (err) {
      const code = err instanceof SendError ? err.code : 'send_failed';
      setErrorMsg(describeSendError(code, t));
      setStatus('error');
    }
  };

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
                {status === 'success' ? (
                  <p className="bif-success" role="status">{t('contact.form.success')}</p>
                ) : (
                  <form className="bif-form" onSubmit={submit} noValidate>
                    {status === 'error' && (
                      <div className="bif-error mb-3" role="alert">
                        {errorMsg}
                        <span className="d-block text-muted mt-1">
                          Telegram: <a href={telegram.url} target="_blank" rel="noreferrer">{telegram.label}</a>
                        </span>
                      </div>
                    )}
                    <label htmlFor={nameId}>{f.name} *</label>
                    <input id={nameId} type="text" className="form-control mb-3" value={form.name} onChange={set('name')} required autoComplete="name" disabled={status === 'sending'} />
                    <label htmlFor={emailId}>{f.email} *</label>
                    <input id={emailId} type="email" className="form-control mb-3" value={form.email} onChange={set('email')} required autoComplete="email" disabled={status === 'sending'} />
                    <label htmlFor={subjectId}>{f.subject} *</label>
                    <input id={subjectId} type="text" className="form-control mb-3" value={form.subject} onChange={set('subject')} required disabled={status === 'sending'} />
                    <label htmlFor={messageId}>{f.message} *</label>
                    <textarea id={messageId} name="message" className="form-control mb-3" value={form.message} onChange={set('message')} required disabled={status === 'sending'} />
                    <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                      {status === 'sending' ? t('forms.sending') : f.send}
                    </button>
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
                  <i className="ti-shield info-card__icon" aria-hidden="true" />
                  <h3>{c.title}</h3>
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