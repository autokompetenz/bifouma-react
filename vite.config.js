import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En développement, on exécute la même fonction serverless que sur Vercel
// (api/send.js) afin que les formulaires aient un comportement identique
// en local et en production (y compris le code d'erreur « not_configured »
// tant que les variables SMTP ne sont pas définies).
function apiDevPlugin() {
  return {
    name: 'bifouma-api',
    configureServer(server) {
      server.middlewares.use('/api/send', async (req, res, next) => {
        if (req.method !== 'POST') return next();
        try {
          const { default: handler } = await server.ssrLoadModule('/api/send.js');
          return handler(req, res);
        } catch {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'send_failed' }));
          return undefined;
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
});