import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';

export default function SubmitProject() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const f = t('submit.form');

  return (
    <section className="section-lg submit page-hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-title">{t('submit.title')}</h2>
            <p>{t('submit.subtitle')}</p>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-lg-5 order-2 order-lg-1">
            <h4>{t('submit.stepsTitle')}</h4>
            <ul className="service-list pl-0 mt-3">
              {t('submit.steps').map((s, i) => (
                <li key={i}><i className="ti-check text-purple mr-2" />{s}</li>
              ))}
            </ul>
            <div className="text-center mt-4">
              <Link to="/loan" className="btn btn-outline-dark">{t('misc.loan')}</Link>
            </div>
          </div>

          <div className="col-lg-7 order-1 order-lg-2 mb-4">
            <div className="rounded bg-white p-4 shadow-primary">
              {sent ? (
                <p className="bif-success">{f.success}</p>
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
                      <label>{f.name} *</label>
                      <input className="form-control mb-3" required />
                    </div>
                    <div className="col-md-6">
                      <label>{f.country} *</label>
                      <input className="form-control mb-3" required />
                    </div>
                    <div className="col-md-6">
                      <label>{f.sector} *</label>
                      <input className="form-control mb-3" required />
                    </div>
                    <div className="col-md-6">
                      <label>{f.amount} *</label>
                      <input className="form-control mb-3" required />
                    </div>
                    <div className="col-md-6">
                      <label>{f.duration} *</label>
                      <input className="form-control mb-3" required />
                    </div>
                    <div className="col-md-6">
                      <label>{f.returnRate}</label>
                      <input className="form-control mb-3" />
                    </div>
                    <div className="col-12">
                      <label>{f.description} *</label>
                      <textarea className="form-control mb-3" required />
                    </div>
                    <div className="col-12">
                      <label>{f.contact} *</label>
                      <input className="form-control mb-3" required />
                    </div>
                    <div className="col-12">
                      <label>{f.file}</label>
                      <input type="file" className="form-control mb-1" multiple accept=".pdf" />
                      <p className="bif-file-note">{f.fileHint}</p>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="d-flex align-items-start">
                        <input type="checkbox" className="mr-2" required />{f.consent}
                      </label>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-primary primary-shadow btn-lg">{f.submit}</button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}