// Envoi réel des formulaires vers la fonction serverless /api/send.
// Aucun faux succès : la promesse ne se résout que si le serveur confirme
// (HTTP 2xx + { ok: true }).

export class SendError extends Error {
  constructor(code) {
    super(code);
    this.name = 'SendError';
    this.code = code;
  }
}

/**
 * @param {string} type  'loan' | 'contact' | 'project' | 'newsletter'
 * @param {Record<string, string|boolean>} fields
 * @param {File[]} [files]
 * @param {string} [lang]  Langue du visiteur (fr/de/fi/sr), pour l'accusé de réception.
 */
export async function sendForm(type, fields, files = [], lang = 'fr') {
  const body = new FormData();
  body.append('_type', type);
  // Langue du visiteur : sert à l'accusé de réception envoyé par e-mail.
  body.append('_lang', lang);
  // Champ anti-robots, toujours vide du côté visiteurs.
  body.append('_gotcha', '');
  Object.entries(fields).forEach(([k, v]) => {
    if (v !== undefined && v !== null) body.append(k, String(v));
  });
  files.forEach((file) => body.append('files', file, file.name));

  let response;
  try {
    response = await fetch('/api/send', {
      method: 'POST',
      body,
      headers: { Accept: 'application/json' },
    });
  } catch {
    throw new SendError('network');
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    /* corps non-JSON → erreur générique */
  }

  if (!response.ok || !payload || payload.ok !== true) {
    throw new SendError((payload && payload.error) || 'send_failed');
  }
  return payload;
}

/** Traduit un code d'erreur en message utilisateur. */
export function describeSendError(code, t) {
  if (code === 'not_configured') return t('forms.notConfigured');
  if (code === 'too_large') return t('forms.tooLarge');
  if (code === 'network') return t('forms.network');
  return t('forms.error');
}

/** Vérifie côté client la taille totale des fichiers (limite 4 Mo). */
export function filesTooLarge(files, limitBytes = 4 * 1024 * 1024) {
  const total = files.reduce((sum, file) => sum + (file.size || 0), 0);
  return total > limitBytes;
}