import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import { projects, sectorLabels, countryLabels } from '../data/projects.js';
import ProjectVisual from '../components/ProjectVisual.jsx';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const p = projects.find((x) => x.slug === slug);
  const c = (obj) => obj[lang] || obj.fr;

  if (!p) return <NotFoundLink />;

  const content = p.content[lang] || p.content.fr;
  const telegram = 'https://t.me/491745944264';
  const facebook = 'https://www.facebook.com/profile.php?id=61594025471011';

  return (
    <div className="project-detail page-hero">
      <div className="page-hero-head">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center mb-2">
            <span className="badge mr-2" style={{ background: 'var(--bf-blue)', color: '#fff' }}>{c(sectorLabels[p.sector])}</span>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.16)', color: 'rgba(255,255,255,0.92)' }}>
              <i className="ti-pin mr-1" />{c(countryLabels[p.country])}
            </span>
            <span className="badge" style={{ background: 'rgba(22,184,166,0.9)', color: '#FFFFFF' }}>
              <i className="ti-info-alt mr-1" />{t('projects.illustrativeNote')}
            </span>
          </div>
          <h1 className="section-title mb-0">{content.title}</h1>
          <p className="lead">{content.intro}</p>
        </div>
      </div>

      <section className="section-lg">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4">
              <ProjectVisual sector={p.sector} title={content.title} size="detail" image={p.image} />
            </div>
            <div className="col-lg-6">
              <h2 className="section-title">{t('projectDetail.overview')}</h2>
              <p>{content.description}</p>

              <div className="rounded bg-white p-4 shadow-primary my-4">
                <h3 className="h5 mb-2">{t('projectDetail.supportTitle')}</h3>
                <p className="mb-0">{t('projectDetail.supportText')}</p>
              </div>

              <h2 className="section-title">{t('projectDetail.conclusionTitle')}</h2>
              <p>{content.conclusion}</p>

              <div className="mt-4">
                <Link to="/submit" className="btn btn-primary mr-2 mb-2">
                  {t('projectDetail.apply')}
                </Link>
                <Link to="/contact" className="btn btn-secondary mr-2 mb-2">{t('nav.contact')}</Link>
                <a href={telegram} target="_blank" rel="noreferrer" className="btn btn-outline-dark mb-2">
                  <i className="ti-location-arrow mr-1" aria-hidden="true" />{t('projectDetail.telegram')}
                </a>
                <a href={facebook} target="_blank" rel="noreferrer" className="btn btn-outline-dark mb-2">
                  <i className="ti-facebook mr-1" aria-hidden="true" />{t('projectDetail.facebook')}
                </a>
              </div>
              <p className="text-muted mt-2" style={{ fontSize: 13 }}>{t('projectDetail.investorInfo')}</p>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-lg-7">
              <div className="rounded bg-white p-4 shadow-primary">
                <h2 className="h5 mb-2">{t('projectDetail.documents')}</h2>
                <ul className="service-list pl-0 mb-0">
                  {content.docs.map((d) => (
                    <li key={d}><i className="ti-file mr-2" aria-hidden="true" />{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link to="/projects" className="btn btn-outline-dark btn-lg"><i className="ti-arrow-left mr-2" aria-hidden="true" />{t('projectDetail.back')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function NotFoundLink() {
  const { t } = useI18n();
  return (
    <div className="page-hero">
      <div className="page-hero-head">
        <div className="container text-center">
          <h1 className="section-title mb-0">{t('notFound.title')}</h1>
        </div>
      </div>
      <section className="section-lg text-center">
        <Link to="/projects" className="btn btn-primary btn-lg">{t('notFound.back')}</Link>
      </section>
    </div>
  );
}