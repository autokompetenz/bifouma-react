import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import { projects, sectorLabels, countryLabels } from '../data/projects.js';
import ProjectVisual from '../components/ProjectVisual.jsx';

export default function Projects() {
  const { t, lang } = useI18n();
  const [sector, setSector] = useState('all');
  const [country, setCountry] = useState('all');

  const c = (obj) => obj[lang] || obj.fr;

  const list = projects.filter((p) => {
    const okSector = sector === 'all' || p.sector === sector;
    const okCountry = country === 'all' || p.country === country;
    return okSector && okCountry;
  });

  const sectors = ['all', ...new Set(projects.map((p) => p.sector))];
  const countries = ['all', ...new Set(projects.map((p) => p.country))];

  return (
    <div className="projects page-hero">
      <div className="page-hero-head">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title mb-0">{t('projects.title')}</h1>
            <p className="lead">{t('projects.subtitle')}</p>
          </div>
        </div>
      </div>
      <section className="section-lg">
        <div className="container">

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
        </div>

        <div className="row">
          {list.map((p) => {
            const content = p.content[lang] || p.content.de;
            return (
              <div className="col-md-6 col-lg-4 mb-5" key={p.slug}>
                <div className="card project-card h-100">
                  <ProjectVisual sector={p.sector} title={content.title} image={p.image} />
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge badge-primary">{c(sectorLabels[p.sector])}</span>
                      <span className="badge" style={{ background: '#EEF2F8', color: 'var(--bf-muted)' }}>
                        <i className="ti-pin mr-1" />{c(countryLabels[p.country])}
                      </span>
                    </div>
                    <h3 className="h5 mb-1">{content.title}</h3>
                    <p className="mb-3">{content.intro}</p>
                    <Link to={`/projects/${p.slug}`} className="btn btn-primary w-100 mt-auto">{t('projects.view')}</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="row mt-5">
          <div className="col-12 text-center">
            <h2 className="section-title">{t('projects.ctaTitle')}</h2>
            <p className="mb-4">{t('projects.ctaText')}</p>
            <Link to="/submit" className="btn btn-secondary btn-lg">{t('projects.ctaBtn')}</Link>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}