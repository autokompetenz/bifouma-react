import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import { sendForm, describeSendError, filesTooLarge, SendError } from '../lib/sendForm.js';

const emptyForm = {
  name: '',
  country: '',
  sector: '',
  amount: '',
  duration: '',
  description: '',
  contact: '',
  files: [],
  consent: false,
};

let idSeq = 0;
function useId(prefix) {
  const [id] = useState(() => `${prefix}-${++idSeq}`);
  return id;
}

export default function SubmitProject() {
  const { t, lang } = useI18n();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');
  const f = t('submit.form');
  const nameId = useId('sp-name');
  const countryId = useId('sp-country');
  const sectorId = useId('sp-sector');
  const amountId = useId('sp-amount');
  const durationId = useId('sp-duration');
  const descId = useId('sp-desc');
  const contactId = useId('sp-contact');
  const fileId = useId('sp-file');

  const set = (key) => (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked
      : e.target.type === 'file' ? Array.from(e.target.files)
      : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.consent) return;
    if (filesTooLarge(form.files)) {
      setErrorMsg(t('forms.tooLarge'));
      setStatus('error');
      return;
    }
    setStatus('sending');
    setErrorMsg('');
    try {
      await sendForm(
        'project',
        {
          name: form.name,
          country: form.country,
          sector: form.sector,
          amount: form.amount,
          duration: form.duration,
          description: form.description,
          contact: form.contact,
          consent: form.consent ? 'Oui' : '',
        },
        form.files,
        lang
      );
      setStatus('sent');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const code = err instanceof SendError ? err.code : 'send_failed';
      setErrorMsg(describeSendError(code, t));
      setStatus('error');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sending = status === 'sending';

  return (
    <div className="submit page-hero">
      <div className="page-hero-head">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title mb-0">{t('submit.title')}</h1>
            <p className="lead">{t('submit.subtitle')}</p>
          </div>
        </div>
      </div>
      <section className="section-lg">
        <div className="container">

        <div className="row justify-content-center">
          <div className="col-lg-5 order-2 order-lg-1">
            <h2 className="h4">{t('submit.stepsTitle')}</h2>
            <ul className="service-list pl-0 mt-3">
              {t('submit.steps').map((s, i) => (
                <li key={i}><i className="ti-check mr-2" />{s}</li>
              ))}
            </ul>
            <div className="text-center mt-4">
              <Link to="/loan" className="btn btn-secondary">{t('nav.cta')}</Link>
            </div>
          </div>

          <div className="col-lg-7 order-1 order-lg-2 mb-4">
            <div className="rounded bg-white p-4 shadow-primary">
              {status === 'sent' ? (
                <div className="bif-success-wrap text-center py-4">
                  <i className="ti-check-box confirm-icon" aria-hidden="true" />
                  <p className="bif-success mb-0">{f.success}</p>
                  <button
                    type="button"
                    className="btn btn-outline-dark mt-4"
                    onClick={() => {
                      setForm(emptyForm);
                      setStatus('idle');
                      setErrorMsg('');
                    }}
                  >
                    {t('loan.newRequest')}
                  </button>
                </div>
              ) : (
                <form className="bif-form" onSubmit={submit} noValidate>
                  {status === 'error' && (
                    <div className="bif-error mb-3" role="alert">
                      {errorMsg}
                      <span className="d-block text-muted mt-1">
                        Telegram: +49 174 594 4264 · Facebook: BIFAUMA
                      </span>
                    </div>
                  )}
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor={nameId}>{f.name} *</label>
                      <input id={nameId} className="form-control mb-3" value={form.name} onChange={set('name')} required autoComplete="name" disabled={sending} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor={countryId}>{f.country} *</label>
                      <input id={countryId} className="form-control mb-3" value={form.country} onChange={set('country')} required disabled={sending} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor={sectorId}>{f.sector} *</label>
                      <input id={sectorId} className="form-control mb-3" value={form.sector} onChange={set('sector')} required disabled={sending} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor={amountId}>{f.amount} *</label>
                      <input id={amountId} type="number" min="0" className="form-control mb-3" value={form.amount} onChange={set('amount')} required inputMode="numeric" disabled={sending} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor={durationId}>{f.duration} *</label>
                      <input id={durationId} className="form-control mb-3" value={form.duration} onChange={set('duration')} required inputMode="numeric" disabled={sending} />
                    </div>
                    <div className="col-12">
                      <label htmlFor={descId}>{f.description} *</label>
                      <textarea id={descId} className="form-control mb-3" value={form.description} onChange={set('description')} required disabled={sending} />
                    </div>
                    <div className="col-12">
                      <label htmlFor={contactId}>{f.contact} *</label>
                      <input id={contactId} className="form-control mb-3" value={form.contact} onChange={set('contact')} required autoComplete="email" disabled={sending} />
                    </div>
                    <div className="col-12">
                      <label htmlFor={fileId}>{f.file}</label>
                      <input id={fileId} type="file" className="form-control mb-1" multiple accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={set('files')} aria-describedby={`${fileId}-note`} disabled={sending} />
                      <p className="bif-file-note" id={`${fileId}-note`}>{f.fileHint}</p>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="d-flex align-items-start">
                        <input type="checkbox" className="mr-2" checked={form.consent} onChange={set('consent')} required disabled={sending} />{f.consent}
                      </label>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-primary btn-lg" disabled={!form.consent || sending}>
                        {sending ? t('forms.sending') : f.submit}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}