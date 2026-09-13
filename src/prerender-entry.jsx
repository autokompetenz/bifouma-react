import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { I18nProvider } from './i18n.jsx';
import App from './App.jsx';
import { projects } from './data/projects.js';

const ROOT = path.resolve(process.cwd());
const DIST = path.join(ROOT, 'dist');

const TITLES = {
  '/': 'BIFAUMA — Prêts & Financement de projets',
  '/about': 'À propos — BIFAUMA',
  '/service': 'Nos solutions — BIFAUMA',
  '/projects': 'Projets de financement — BIFAUMA',
  '/loan': 'Demande de prêt — BIFAUMA',
  '/submit': 'Proposer un projet — BIFAUMA',
  '/contact': 'Contact — BIFAUMA',
  '/imprint': 'Mentions légales — BIFAUMA',
  '/privacy': 'Confidentialité — BIFAUMA',
  '/faq': 'FAQ — BIFAUMA',
  '/not-found': 'Page introuvable — BIFAUMA',
};

const routes = Object.keys(TITLES).filter((r) => r !== '/not-found');

const DESC =
  'BIFAUMA — solutions de prêt et de financement de projets. Demande simple, traitement sous 72 h, accompagnement personnel. Allemagne, Finlande, Serbie.';

function renderRoute(route) {
  const markup = renderToStaticMarkup(
    <StaticRouter location={route}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </StaticRouter>
  );
  return markup;
}

function buildPage(route, title, template) {
  const html = renderRoute(route);
  const canonical = route === '/' ? '/' : route;
  return template
    .replace('id="root"></div>', `id="root">${html}</div>`)
    .replace(/<title>.*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${DESC}" />`)
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="https://bifouma-react.vercel.app${canonical}" />`
    )
    .replace(
      /<meta property="og:url"[^>]*>/,
      `<meta property="og:url" content="https://bifouma-react.vercel.app${canonical}" />`
    );
}

function writePage(route, outPath, title, template) {
  const page = buildPage(route, title, template);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, page);
  console.log(`prerendered ${route} -> ${path.relative(ROOT, outPath)}`);
}

function main() {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }

  const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  if (!template.includes('id="root"></div>')) {
    console.error('dist/index.html is not a pristine template (missing empty #root).');
    process.exit(1);
  }

  for (const route of routes) {
    const out = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route.replace(/^\//, ''), 'index.html');
    writePage(route, out, TITLES[route], template);
  }

  for (const p of projects) {
    const content = p.content.fr || p.content.de;
    const title = `Financement — ${content.title} — BIFAUMA`;
    writePage(`/projects/${p.slug}`, path.join(DIST, 'projects', p.slug, 'index.html'), title, template);
  }

  console.log('Prerender done.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main();
}