import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import { projects, sectorLabels, riskLabels, countryLabels } from '../data/projects.js';
import ProjectVisual from '../components/ProjectVisual.jsx';

export default function Projects() {
  const { t, lang } = useI18n();
  const [sector, setSector] = useState('all');
  const [country, setCountry] = useState('all');
  const [risk, setRisk] = useState('all');

  const c = (obj) => obj[lang] || obj.de;

  const list = projects.filter((p) => {
    const okSector = sector === 'all' || p.sector === sector;
    const okCountry = country === 'all' || p.country === country;
    const okRisk = risk === 'all' || p.risk === risk;
    return okSector && okCountry && okRisk;
  });

  const sectors = ['all', ...new Set(projects.map((p) => p.sector))];
  const countries = ['all', ...new Set(projects.map((p) => p.country))];
  const risks = ['all', 'low', 'medium', 'high'];

  return (
    <section className="section-lg projects page-hero">
      <div className="container">
        <div className="col-lg-12 text-center">
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="mb-5">{t('projects.subtitle')}</p>
        </div>

        <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mb-4" style={{ gap: 10 }}>
          <div>
            <span className="mr-2">{t('projects.filters.sector')}:</span>
            {sectors.map((s) => (
              <button key={s} className={`filter-pill ${sector === s ? 'active' : ''}`} onClick={() => setSector(s)}>
                {s === 'all' ? t('projects.filters.all') : c(sectorLabels[s])}
              </button>
            ))}
          </div>
          <span className="mx-2">·</span>
          <div>
            <span className="mr-2">{t('projects.filters.country')}:</span>
            {countries.map((co) => (
              <button key={co} className={`filter-pill ${country === co ? 'active' : ''}`} onClick={() => setCountry(co)}>
                {co === 'all' ? t('projects.filters.all') : c(countryLabels[co])}
              </button>
            ))}
          </div>
          <span className="mx-2">·</span>
          <div>
            <span className="mr-2">{t('projects.filters.risk')}:</span>
            {risks.map((r) => (
              <button key={r} className={`filter-pill ${risk === r ? 'active' : ''}`} onClick={() => setRisk(r)}>
                {r === 'all' ? t('projects.filters.all') : c(riskLabels[r])}
              </button>
            ))}
          </div>
        </div>

        <div className="row">
          {list.map((p) => {
            const content = p.content[lang] || p.content.de;
            return (
              <div className="col-md-6 col-lg-4 mb-5" key={p.slug}>
                <div className="card project-card">
                  <ProjectVisual sector={p.sector} title={content.title} />
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge badge-primary" style={{ background: '#008dec' }}>{c(sectorLabels[p.sector])}</span>
                      <span className="badge" style={{ background: '#eef2ff', color: '#4d546f' }}>
                        {t(`projects.filters.${p.risk}`)}
                      </span>
                    </div>
                    <h4 className="mb-1">{content.title}</h4>
                    <p className="text-color mb-3"><i className="ti-pin mr-1" />{c(countryLabels[p.country])}</p>
                    <p className="mb-3">{content.intro}</p>
                    <div className="mb-2">
                      {t('projects.raised')}: <strong>€{p.raised.toLocaleString()}</strong>
                      <span className="float-right">€{p.target.toLocaleString()}</span>
                    </div>
                    <div className="progress mb-3">
                      <div className="progress-bar" style={{ width: `${p.progress}%` }} />
                    </div>
                    <div className="row text-center mb-3">
                      <div className="col-6">
                        <div className="stat-label">{t('projects.expected')}</div>
                        <strong>{p.returnRate}%</strong>
                      </div>
                      <div className="col-6">
                        <div className="stat-label">{t('projects.duration')}</div>
                        <strong>{p.durationMonths} {lang === 'sr' ? 'мес.' : 'mo'}</strong>
                      </div>
                    </div>
                    <Link to={`/projects/${p.slug}`} className="btn btn-primary primary-shadow w-100">{t('projects.view')}</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="row mt-5">
          <div className="col-12 text-center">
            <h3 className="section-title">{t('projects.ctaTitle')}</h3>
            <p className="mb-4">{t('projects.ctaText')}</p>
            <Link to="/submit" className="btn btn-secondary btn-lg">{t('projects.ctaBtn')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}