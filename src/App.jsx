import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import PageTransition from './components/PageTransition.jsx';
import { useI18n } from './i18n.jsx';
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
  const { t } = useI18n();
  useEffect(() => {
    if (t('meta.title')) document.title = t('meta.title');
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash, t]);
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