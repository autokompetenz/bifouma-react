import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import { sendForm, describeSendError, filesTooLarge, SendError } from '../lib/sendForm.js';

// --- Aide dates : le prêt se choisit par date de début / date de fin,
//     la durée (en mois) est calculée automatiquement. ---
const toISO = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};
const addMonths = (iso, months) => {
  const d = new Date(`${iso}T00:00:00`);
  d.setMonth(d.getMonth() + months);
  return toISO(d);
};
const monthDiff = (startISO, endISO) => {
  if (!startISO || !endISO) return 0;
  const s = new Date(`${startISO}T00:00:00`);
  const e = new Date(`${endISO}T00:00:00`);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime()) || e <= s) return 0;
  let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (e.getDate() < s.getDate()) months -= 1;
  return months > 0 ? months : 1;
};
const formatDate = (iso, lang) => {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  try {
    return d.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return iso;
  }
};

const emptyForm = {
  amount: '',
  startDate: '',
  endDate: '',
  purpose: '',
  income: '',
  situation: '',
  name: '',
  contact: '',
  files: [],
  consent: false,
};

export default function Loan() {
  const { t, lang } = useI18n();
  const [params] = useSearchParams();
  const [step, setStep] = useState(1);
  // Pré-remplissage venant du simulateur de la page d'accueil (?amount=…&duration=…).
  const [form, setForm] = useState(() => {
    const amount = params.get('amount') || '';
    const months = parseInt(params.get('duration') || '', 10);
    let startDate = '';
    let endDate = '';
    if (Number.isFinite(months) && months > 0) {
      startDate = toISO(new Date());
      endDate = addMonths(startDate, months);
    }
    return { ...emptyForm, amount, startDate, endDate };
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');
  const f = t('loan.form');
  const steps = t('loan.steps');

  const set = (key) => (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked
      : e.target.type === 'file' ? Array.from(e.target.files)
      : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const requiredByStep = { 1: ['amount', 'startDate', 'endDate', 'purpose'], 3: ['name', 'contact'] };

  const validate = (n) => {
    const errs = {};
    (requiredByStep[n] || []).forEach((k) => {
      if (!String(form[k] || '').trim()) errs[k] = t('loan.required');
    });
    if (
      n === 1 &&
      form.startDate &&
      form.endDate &&
      !errs.startDate &&
      !errs.endDate &&
      new Date(form.endDate) <= new Date(form.startDate)
    ) {
      errs.endDate = t('loan.dateOrder');
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(4, s + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const back = () => {
    setStep((s) => Math.max(1, s - 1));
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const go = (n) => {
    if (status === 'sending') return;
    if (n < step || validate(step)) {
      setStep(n);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const reset = () => {
    setForm(emptyForm);
    setStatus('idle');
    setErrorMsg('');
    setStep(1);
    setErrors({});
    window.scrollTo({ top: 0 });
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
        'loan',
        {
          amount: form.amount,
          startDate: formatDate(form.startDate, lang),
          endDate: formatDate(form.endDate, lang),
          duration: durationLabel,
          purpose: form.purpose,
          income: form.income,
          situation: form.situation,
          name: form.name,
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

  const inputCls = (k) => `form-control mb-1 ${errors[k] ? 'is-invalid' : ''}`;

  const valueOrDash = (v) => (String(v).trim() ? v : '—');

  const todayISO = toISO(new Date());
  const durationMonths = monthDiff(form.startDate, form.endDate);
  const durationLabel = durationMonths ? `${durationMonths} ${t('projects.months')}` : '';

  const recapValue = (k) => {
    if (k === 'period') {
      return form.startDate && form.endDate
        ? `${formatDate(form.startDate, lang)} → ${formatDate(form.endDate, lang)}`
        : '—';
    }
    if (k === 'duration') return durationLabel || '—';
    if (k === 'file') {
      return form.files.length > 0 ? `${form.files.length} ${t('loan.filesAdded')}` : t('loan.fileNone');
    }
    return valueOrDash(form[k]);
  };

  const groups = [
    { step: 1, title: steps[0], rows: [['amount', f.amount], ['period', t('loan.period')], ['duration', f.duration], ['purpose', f.purpose]] },
    { step: 2, title: steps[1], rows: [['income', f.income], ['situation', f.situation]] },
    { step: 3, title: steps[2], rows: [['name', f.name], ['contact', f.contact], ['file', f.file]] },
  ];

  const sending = status === 'sending';

  return (
    <section className="ak-loan">
      <header className="ak-loan__head">
        <div className="container ak-loan__head-inner">
          <p className="ak-loan__eyebrow">{t('misc.invest')}</p>
          <h1 className="ak-loan__title">
            <span className="ak-loan__title-line">{t('loan.title1')}</span>
            <span className="ak-loan__title-line ak-loan__title-accent">{t('loan.title2')}</span>
          </h1>
          <p className="ak-loan__sub">{t('loan.subtitle')}</p>
        </div>
      </header>

      <div className="container ak-loan__body">
        {status === 'sent' ? (
          <div className="ak-loan__success">
            <span className="ak-loan__success-icon"><i className="ti-check" aria-hidden="true" /></span>
            <h3>{t('loan.form.success')}</h3>
            <button type="button" className="btn btn-outline-dark mt-3" onClick={reset}>
              {t('loan.newRequest')}
            </button>
          </div>
        ) : (
          <>
            <ol className="ak-steps">
              {steps.map((label, i) => {
                const n = i + 1;
                const cls = n === step ? 'active' : n < step ? 'done' : '';
                return (
                  <li key={label} className={`ak-step ${cls}`}>
                    <button type="button" className="ak-step-btn" onClick={() => go(n)} disabled={sending || n > step + 1}>
                      <span className="ak-step-num">{n < step ? <i className="ti-check" /> : n}</span>
                    </button>
                    <span className="ak-step-label">{label}</span>
                  </li>
                );
              })}
            </ol>

            <p className="ak-loan__progress">
              {t('loan.progress')} {step} {t('loan.of')} 4
            </p>

            <div className="ak-loan__grid">
              <aside className="ak-loan__aside">
                <div className="ak-panel">
                  <p className="ak-panel__label">{t('loan.terms')}</p>
                  <ul className="ak-checklist">
                    {t('loan.termsList').map((s, i) => (
                      <li key={i}><i className="ti-check" aria-hidden="true" />{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="ak-panel">
                  <h4 className="ak-panel__title">{f.contact}</h4>
                  <p className="ak-panel__note">Telegram: +49 174 594 4264</p>
                  <p className="ak-panel__note">Facebook: BIFAUMA</p>
                </div>
              </aside>

              <div className="ak-loan__main">
                <div className="ak-panel ak-panel--form">
                  {status === 'error' && (
                    <div className="ak-alert" role="alert">
                      {errorMsg}
                      <span>Telegram: +49 174 594 4264 · Facebook: BIFAUMA</span>
                    </div>
                  )}

                  {step === 1 && (
                    <form className="ak-form" onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="loan-amount">{f.amount} *</label>
                          <input id="loan-amount" type="text" inputMode="numeric" autoComplete="off" className={inputCls('amount')} value={form.amount} onChange={set('amount')} required aria-invalid={!!errors.amount} aria-describedby={errors.amount ? 'loan-amount-error' : undefined} />
                          {errors.amount && <p className="form-error" id="loan-amount-error" role="alert">{errors.amount}</p>}
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="loan-purpose">{f.purpose} *</label>
                          <input id="loan-purpose" type="text" className={inputCls('purpose')} value={form.purpose} onChange={set('purpose')} required aria-invalid={!!errors.purpose} aria-describedby={errors.purpose ? 'loan-purpose-error' : undefined} />
                          {errors.purpose && <p className="form-error" id="loan-purpose-error" role="alert">{errors.purpose}</p>}
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="loan-start">{f.startDate} *</label>
                          <input id="loan-start" type="date" min={todayISO} className={inputCls('startDate')} value={form.startDate} onChange={set('startDate')} required aria-invalid={!!errors.startDate} aria-describedby={errors.startDate ? 'loan-start-error' : undefined} />
                          {errors.startDate && <p className="form-error" id="loan-start-error" role="alert">{errors.startDate}</p>}
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="loan-end">{f.endDate} *</label>
                          <input id="loan-end" type="date" min={form.startDate || todayISO} className={inputCls('endDate')} value={form.endDate} onChange={set('endDate')} required aria-invalid={!!errors.endDate} aria-describedby={errors.endDate ? 'loan-end-error' : undefined} />
                          {errors.endDate && <p className="form-error" id="loan-end-error" role="alert">{errors.endDate}</p>}
                        </div>
                        <div className="col-12">
                          {durationLabel && (
                            <p className="ak-loan__duration">
                              {f.duration}: <strong>{durationLabel}</strong>
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="ak-actions ak-actions--end">
                        <button type="submit" className="btn btn-primary">{t('loan.next')} <i className="ti-arrow-right" aria-hidden="true" /></button>
                      </div>
                    </form>
                  )}

                  {step === 2 && (
                    <form className="ak-form" onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="loan-income">{f.income}</label>
                          <input id="loan-income" type="text" inputMode="numeric" autoComplete="off" className={inputCls('income')} value={form.income} onChange={set('income')} />
                        </div>
                        <div className="col-12">
                          <label htmlFor="loan-situation">{f.situation}</label>
                          <textarea id="loan-situation" className={inputCls('situation')} value={form.situation} onChange={set('situation')} />
                        </div>
                      </div>
                      <div className="ak-actions">
                        <button type="button" className="btn btn-outline-dark" onClick={back}><i className="ti-arrow-left" aria-hidden="true" /> {t('loan.back')}</button>
                        <button type="submit" className="btn btn-primary">{t('loan.next')} <i className="ti-arrow-right" aria-hidden="true" /></button>
                      </div>
                    </form>
                  )}

                  {step === 3 && (
                    <form className="ak-form" onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="loan-name">{f.name} *</label>
                          <input id="loan-name" type="text" autoComplete="name" className={inputCls('name')} value={form.name} onChange={set('name')} required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'loan-name-error' : undefined} />
                          {errors.name && <p className="form-error" id="loan-name-error" role="alert">{errors.name}</p>}
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="loan-contact">{f.contact} *</label>
                          <input id="loan-contact" type="text" autoComplete="email" className={inputCls('contact')} value={form.contact} onChange={set('contact')} required aria-invalid={!!errors.contact} aria-describedby={errors.contact ? 'loan-contact-error' : undefined} />
                          {errors.contact && <p className="form-error" id="loan-contact-error" role="alert">{errors.contact}</p>}
                        </div>
                        <div className="col-12">
                          <label htmlFor="loan-file">{f.file}</label>
                          <input id="loan-file" type="file" className="form-control mb-1" multiple accept=".pdf" onChange={set('files')} aria-describedby="loan-file-note" />
                          <p className="bif-file-note" id="loan-file-note">
                            {form.files.length > 0 ? `${form.files.length} ${t('loan.filesAdded')}` : t('loan.fileNone')}
                          </p>
                        </div>
                      </div>
                      <div className="ak-actions">
                        <button type="button" className="btn btn-outline-dark" onClick={back}><i className="ti-arrow-left" aria-hidden="true" /> {t('loan.back')}</button>
                        <button type="submit" className="btn btn-primary">{t('loan.next')} <i className="ti-arrow-right" aria-hidden="true" /></button>
                      </div>
                    </form>
                  )}

                  {step === 4 && (
                    <form className="ak-form" onSubmit={submit} noValidate>
                      <h3 className="mb-1">{t('loan.recapTitle')}</h3>
                      <p className="text-muted mb-4">{t('loan.recapHint')}</p>
                      {groups.map((g) => (
                        <div className="ak-recap" key={g.step}>
                          <div className="ak-recap__head">
                            <h4 className="ak-recap__title">{g.title}</h4>
                            <button type="button" className="ak-recap__edit" onClick={() => go(g.step)} disabled={sending}><i className="ti-pencil mr-1" aria-hidden="true" />{t('loan.edit')}</button>
                          </div>
                          <ul className="ak-recap__list">
                            {g.rows.map(([k, label]) => (
                              <li key={k}>
                                <span className="ak-recap__k">{label}</span>
                                <span className="ak-recap__v">{recapValue(k)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <label className="ak-consent" htmlFor="loan-consent">
                        <input id="loan-consent" type="checkbox" required checked={form.consent} onChange={set('consent')} disabled={sending} />
                        {f.consent}
                      </label>
                      <div className="ak-actions">
                        <button type="button" className="btn btn-outline-dark" onClick={back} disabled={sending}><i className="ti-arrow-left" aria-hidden="true" /> {t('loan.back')}</button>
                        <button type="submit" className="btn btn-primary btn-lg" disabled={!form.consent || sending}>
                          {sending ? <><i className="ti-reload mr-2" aria-hidden="true" />{t('forms.sending')}</> : <><i className="ti-check mr-2" aria-hidden="true" />{t('loan.confirm')}</>}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
