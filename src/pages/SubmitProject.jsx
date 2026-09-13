import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';

let idSeq = 0;
function useId(prefix) {
  const [id] = useState(() => `${prefix}-${++idSeq}`);
  return id;
}

export default function SubmitProject() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const f = t('submit.form');
  const nameId = useId('sp-name');
  const countryId = useId('sp-country');
  const sectorId = useId('sp-sector');
  const amountId = useId('sp-amount');
  const durationId = useId('sp-duration');
  const descId = useId('sp-desc');
  const contactId = useId('sp-contact');
  const fileId = useId('sp-file');

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
              <Link to="/loan" className="btn btn-outline-dark">{t('misc.loan')}</Link>
            </div>
          </div>

          <div className="col-lg-7 order-1 order-lg-2 mb-4">
            <div className="rounded bg-white p-4 shadow-primary">
              {sent ? (
                <div className="bif-success-wrap text-center py-4">
                  <i className="ti-check-box text-success" style={{ fontSize: 44 }} />
                  <p className="bif-success mb-0">{f.success}</p>
                  <button type="button" className="btn btn-outline-dark mt-4" onClick={() => setSent(false)}>{t('loan.newRequest')}</button>
                </div>
              ) : (
                <form
                  className="bif-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor={nameId}>{f.name} *</label>
                      <input id={nameId} className="form-control mb-3" required autoComplete="name" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor={countryId}>{f.country} *</label>
                      <input id={countryId} className="form-control mb-3" required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor={sectorId}>{f.sector} *</label>
                      <input id={sectorId} className="form-control mb-3" required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor={amountId}>{f.amount} *</label>
                      <input id={amountId} type="number" min="0" className="form-control mb-3" required inputMode="numeric" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor={durationId}>{f.duration} *</label>
                      <input id={durationId} className="form-control mb-3" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor={descId}>{f.description} *</label>
                      <textarea id={descId} className="form-control mb-3" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor={contactId}>{f.contact} *</label>
                      <input id={contactId} className="form-control mb-3" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor={fileId}>{f.file}</label>
                      <input id={fileId} type="file" className="form-control mb-1" multiple accept=".pdf,.doc,.docx,.xls,.xlsx" />
                      <p className="bif-file-note">{f.fileHint}</p>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="d-flex align-items-start">
                        <input type="checkbox" className="mr-2" required />{f.consent}
                      </label>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-primary  btn-lg">{f.submit}</button>
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