import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../i18n.jsx';
import { projects, sectorLabels, countryLabels } from '../data/projects.js';
import ProjectVisual from '../components/ProjectVisual.jsx';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const p = projects.find((x) => x.slug === slug);
  const c = (obj) => obj[lang] || obj.de;

  if (!p) return <NotFoundLink />;

  const content = p.content[lang] || p.content.de;
  const telegram = 'https://t.me/491745944264';
  const facebook = 'https://www.facebook.com/profile.php?id=61594025471011';

  return (
    <section className="section-lg project-detail page-hero">
      <div className="container">
        <Link to="/projects" className="btn btn-outline-dark mb-4"><i className="ti-arrow-left mr-2" />{t('projectDetail.back')}</Link>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <ProjectVisual sector={p.sector} title={content.title} size="detail" />
          </div>
          <div className="col-lg-6">
            <div className="d-flex flex-wrap align-items-center mb-2">
              <span className="badge mr-2" style={{ background: '#008dec', color: '#fff' }}>{c(sectorLabels[p.sector])}</span>
              <span className="badge" style={{ background: '#eef2ff', color: '#4d546f' }}><i className="ti-pin mr-1" />{c(countryLabels[p.country])}</span>
            </div>
            <h1 className="h2 mb-3">{content.title}</h1>
            <p>{content.description}</p>

            <div className="text-center mt-5">
              <a href={telegram} target="_blank" rel="noreferrer" className="btn btn-primary primary-shadow mr-2 mb-2">
                {t('projectDetail.apply')}
              </a>
              <div className="mt-3 text-muted">{t('projectDetail.investorInfo')}</div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-7">
            <h2 className="section-title">{t('projectDetail.conclusionTitle')}</h2>
            <p>{content.conclusion}</p>
          </div>
          <div className="col-lg-5">
            <h2 className="section-title">{t('projectDetail.documents')}</h2>
            <ul className="service-list pl-0">
              {content.docs.map((d) => (
                <li key={d}><i className="ti-file text-purple mr-2" />{d}</li>
              ))}
            </ul>
            <div className="d-flex">
              <a href={telegram} target="_blank" rel="noreferrer" className="btn btn-secondary mr-2"><i className="ti-location-arrow mr-1" />{t('projectDetail.telegram')}</a>
              <a href={facebook} target="_blank" rel="noreferrer" className="btn btn-secondary"><i className="ti-facebook mr-1" />{t('projectDetail.facebook')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NotFoundLink() {
  const { t } = useI18n();
  return (
    <section className="section-lg page-hero text-center">
      <h1>{t('notFound.title')}</h1>
      <Link to="/projects" className="btn btn-primary mt-4">{t('notFound.back')}</Link>
    </section>
  );
}