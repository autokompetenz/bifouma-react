import { useState } from 'react';
import { useI18n } from '../i18n.jsx';

const emptyForm = {
  amount: '',
  duration: '',
  purpose: '',
  income: '',
  situation: '',
  name: '',
  contact: '',
  files: [],
};

export default function Loan() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const f = t('loan.form');
  const steps = t('loan.steps');

  const set = (key) => (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked
      : e.target.type === 'file' ? Array.from(e.target.files).map((x) => x.name)
      : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const requiredByStep = { 1: ['amount', 'duration', 'purpose'], 2: [], 3: ['name', 'contact'] };

  const validate = (n) => {
    const errs = {};
    (requiredByStep[n] || []).forEach((k) => {
      if (!String(form[k] || '').trim()) errs[k] = t('loan.required');
    });
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
    if (n < step || validate(step)) {
      setStep(n);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const inputCls = (k) => `form-control mb-1 ${errors[k] ? 'is-invalid' : ''}`;

  const valueOrDash = (v) => (String(v).trim() ? v : '—');

  const groups = [
    { step: 1, title: steps[0], rows: [['amount', f.amount], ['duration', f.duration], ['purpose', f.purpose]] },
    { step: 2, title: steps[1], rows: [['income', f.income], ['situation', f.situation]] },
    { step: 3, title: steps[2], rows: [['name', f.name], ['contact', f.contact], ['file', f.file]] },
  ];

  return (
    <section className="section-lg loan page-hero">
      <div className="page-hero-head">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title mb-0">{t('loan.title')}</h1>
            <p className="lead">{t('loan.subtitle')}</p>
          </div>
        </div>
      </div>
      <div className="container mt-5">

        {sent ? (
          <div className="row justify-content-center mt-5">
            <div className="col-lg-8 text-center">
              <div className="rounded bg-white p-5 shadow-primary">
                <i className="ti-check-box" style={{ fontSize: 48, color: 'var(--bf-teal)' }} />
                <h3 className="mt-3 mb-2">{t('loan.form.success')}</h3>
                <button
                  type="button"
                  className="btn btn-outline-dark mt-4"
                  onClick={() => {
                    setForm(emptyForm);
                    setSent(false);
                    setStep(1);
                    setErrors({});
                  }}
                >
                  {t('loan.newRequest')}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <ol className="loan-steps">
              {steps.map((label, i) => {
                const n = i + 1;
                const cls = n === step ? 'active' : n < step ? 'done' : '';
                return (
                  <li key={label} className={`loan-step ${cls}`}>
                    <button type="button" className="loan-step-btn" onClick={() => go(n)} disabled={n > step + 1}>
                      <span className="loan-step-num">{n < step ? <i className="ti-check" /> : n}</span>
                    </button>
                    <span className="loan-step-label">{label}</span>
                  </li>
                );
              })}
            </ol>

            <div className="text-center text-muted mb-4">
              {t('loan.progress')} {step} {t('loan.of')} 4
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-5 order-2 order-lg-1">
                <h4>{t('loan.terms')}</h4>
                <ul className="service-list pl-0 mt-3">
                  {t('loan.termsList').map((s, i) => (
                    <li key={i}><i className="ti-check mr-2" />{s}</li>
                  ))}
                </ul>
                <div className="rounded bg-white p-4 shadow-primary mt-4">
                  <h6 className="mb-2">{f.contact}</h6>
                  <p className="mb-0 text-muted">Telegram: +49 174 594 4264</p>
                  <p className="mb-0 text-muted">Facebook: BIFAUMA</p>
                </div>
              </div>

              <div className="col-lg-7 order-1 order-lg-2 mb-4">
                <div className="rounded bg-white p-4 shadow-primary">
                  {step === 1 && (
                    <form className="bif-form" onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
                      <div className="row">
                        <div className="col-md-6">
                          <label>{f.amount} *</label>
                          <input className={inputCls('amount')} value={form.amount} onChange={set('amount')} required />
                          {errors.amount && <p className="form-error">{errors.amount}</p>}
                        </div>
                        <div className="col-md-6">
                          <label>{f.duration} *</label>
                          <input className={inputCls('duration')} value={form.duration} onChange={set('duration')} required />
                          {errors.duration && <p className="form-error">{errors.duration}</p>}
                        </div>
                        <div className="col-12">
                          <label>{f.purpose} *</label>
                          <input className={inputCls('purpose')} value={form.purpose} onChange={set('purpose')} required />
                          {errors.purpose && <p className="form-error">{errors.purpose}</p>}
                        </div>
                        <div className="col-12 text-right">
                          <button type="submit" className="btn btn-primary ">{t('loan.next')} <i className="ti-arrow-right" /></button>
                        </div>
                      </div>
                    </form>
                  )}

                  {step === 2 && (
                    <form className="bif-form" onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
                      <div className="row">
                        <div className="col-md-6">
                          <label>{f.income}</label>
                          <input className={inputCls('income')} value={form.income} onChange={set('income')} />
                        </div>
                        <div className="col-12">
                          <label>{f.situation}</label>
                          <textarea className={inputCls('situation')} value={form.situation} onChange={set('situation')} />
                        </div>
                        <div className="col-md-6 col-12">
                          <button type="button" className="btn btn-outline-dark" onClick={back}><i className="ti-arrow-left" /> {t('loan.back')}</button>
                        </div>
                        <div className="col-md-6 col-12 text-left text-md-right mt-1">
                          <button type="submit" className="btn btn-primary ">{t('loan.next')} <i className="ti-arrow-right" /></button>
                        </div>
                      </div>
                    </form>
                  )}

                  {step === 3 && (
                    <form className="bif-form" onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
                      <div className="row">
                        <div className="col-md-6">
                          <label>{f.name} *</label>
                          <input className={inputCls('name')} value={form.name} onChange={set('name')} required />
                          {errors.name && <p className="form-error">{errors.name}</p>}
                        </div>
                        <div className="col-md-6">
                          <label>{f.contact} *</label>
                          <input className={inputCls('contact')} value={form.contact} onChange={set('contact')} required />
                          {errors.contact && <p className="form-error">{errors.contact}</p>}
                        </div>
                        <div className="col-12">
                          <label>{f.file}</label>
                          <input type="file" className="form-control mb-1" multiple accept=".pdf" onChange={set('files')} />
                          <p className="bif-file-note">
                            {form.files.length > 0 ? `${form.files.length} ${t('loan.filesAdded')}` : t('loan.fileNone')}
                          </p>
                        </div>
                        <div className="col-md-6 col-12">
                          <button type="button" className="btn btn-outline-dark" onClick={back}><i className="ti-arrow-left" /> {t('loan.back')}</button>
                        </div>
                        <div className="col-md-6 col-12 text-left text-md-right mt-1">
                          <button type="submit" className="btn btn-primary ">{t('loan.next')} <i className="ti-arrow-right" /></button>
                        </div>
                      </div>
                    </form>
                  )}

                  {step === 4 && (
                    <form className="bif-form" onSubmit={(e) => { e.preventDefault(); setSent(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} noValidate>
                      <h5 className="mb-1">{t('loan.recapTitle')}</h5>
                      <p className="text-muted mb-4">{t('loan.recapHint')}</p>
                      {groups.map((g) => (
                        <div className="recap-group" key={g.step}>
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <h6 className="mb-0">{g.title}</h6>
                            <button type="button" className="recap-edit" onClick={() => go(g.step)}><i className="ti-pencil mr-1" />{t('loan.edit')}</button>
                          </div>
                          <ul className="recap-list">
                            {g.rows.map(([k, label]) => (
                              <li key={k}>
                                <span className="recap-k">{label}</span>
                                <span className="recap-v">
                                  {k === 'file'
                                    ? form.files.length > 0 ? `${form.files.length} ${t('loan.filesAdded')}` : t('loan.fileNone')
                                    : valueOrDash(form[k])}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <label className="d-flex align-items-start">
                        <input type="checkbox" className="mr-2" required checked={form.consent} onChange={set('consent')} />
                        {f.consent}
                      </label>
                      <div className="d-flex justify-content-between mt-3">
                        <button type="button" className="btn btn-outline-dark" onClick={back}><i className="ti-arrow-left" /> {t('loan.back')}</button>
                        <button type="submit" className="btn btn-primary  btn-lg" disabled={!form.consent}>
                          <i className="ti-check mr-2" />{t('loan.confirm')}
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