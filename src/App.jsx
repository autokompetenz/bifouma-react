import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import PageTransition from './components/PageTransition.jsx';
import { useI18n } from './i18n.jsx';
import { projects } from './data/projects.js';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Service from './pages/Service.jsx';
import Contact from './pages/Contact.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import SubmitProject from './pages/SubmitProject.jsx';
import Loan from './pages/Loan.jsx';
import LegalPage from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollAndTitle() {
  const { pathname, hash } = useLocation();
  const { t, lang } = useI18n();
  useEffect(() => {
    const seg = pathname.split('/').filter(Boolean);
    const root = seg[0] || 'home';
    let title;
    if (root === 'home') {
      title = t('meta.title');
    } else if (root === 'projects' && seg[1]) {
      const project = projects.find((p) => p.slug === seg[1]);
      const content = project && (project.content[lang] || project.content.fr);
      title = content ? `${content.title} — BIFAUMA` : t('meta.routes.projects');
    } else {
      title = t(`meta.routes.${root}`);
    }
    if (title && title !== `meta.routes.${root}`) document.title = title;

    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash, t, lang]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollAndTitle />
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/submit" element={<SubmitProject />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/imprint" element={<LegalPage type="imprint" />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/faq" element={<LegalPage type="faq" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <Footer />
    </>
  );
}