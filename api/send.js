import nodemailer from 'nodemailer';
import Busboy from 'busboy';

// ---------------------------------------------------------------------------
// BIFAUMA — fonction serverless (Vercel, runtime Node.js)
// Reçoit les demandes des formulaires (JSON ou multipart/form-data avec pièces
// jointes) et les transmet par e-mail via le SMTP configuré (Hostinger).
// Envoie ensuite au client un accusé de réception (dans sa langue : fr/de/fi/sr)
// contenant le récapitulatif de sa demande, si une adresse e-mail est fournie.
//
// Variables d'environnement attendues (à définir dans Vercel > Settings > Env) :
//   SMTP_HOST  ex. smtp.hostinger.com
//   SMTP_PORT  ex. 465 (SSL) ou 587 (STARTTLS)
//   SMTP_USER  adresse e-mail complète de la boîte d'envoi
//   SMTP_PASS  mot de passe de la boîte d'envoi
//   MAIL_TO    adresse e-mail qui reçoit les demandes
//   MAIL_FROM  (facultatif) expéditeur affiché, par défaut SMTP_USER
// ---------------------------------------------------------------------------

const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // 4 Mo (limite Vercel ~4,5 Mo)
const MAX_FILES = 6;
const MAX_FIELDS = 40;

const TYPE_LABELS = {
  loan: 'Demande de prêt',
  contact: 'Message de contact',
  project: 'Proposition de projet',
  newsletter: 'Inscription newsletter',
};

const FIELD_LABELS = {
  name: 'Nom',
  email: 'E-mail',
  contact: 'Contact',
  subject: 'Objet',
  message: 'Message',
  amount: 'Montant (€)',
  duration: 'Durée',
  startDate: 'Date de début',
  endDate: 'Date de fin',
  purpose: 'Objet du financement',
  income: 'Revenu mensuel (€)',
  situation: 'Situation financière',
  country: 'Pays',
  sector: 'Secteur',
  description: 'Description',
  consent: 'Consentement',
};

// Ordre d'affichage privilégié, le reste est ajouté à la suite.
const FIELD_ORDER = [
  'name', 'email', 'contact', 'subject', 'amount', 'duration', 'startDate', 'endDate', 'purpose',
  'income', 'situation', 'country', 'sector', 'description', 'message', 'consent',
];

// ---------------------------------------------------------------------------
// Accusé de réception envoyé au client (dans la langue du site).
// Textes localisés : fr / de / fi / sr.
// ---------------------------------------------------------------------------
const CONFIRM_LOCALES = {
  fr: {
    subjectPrefix: 'Confirmation',
    greeting: 'Bonjour',
    thanks: "Merci de votre confiance. Nous avons bien reçu votre demande et un membre de notre équipe va l'étudier.",
    deadlines: {
      loan: 'Traitement sous 72 heures.',
      contact: 'Nous vous répondons sous 24 heures.',
      project: 'Nous vous répondons sous 5 jours ouvrables.',
      newsletter: 'Merci pour votre inscription.',
    },
    recapTitle: 'Récapitulatif de votre demande',
    closingTitle: 'Une question ? Contactez-nous :',
    yes: 'Oui',
    badge: 'Demande reçue',
    tagline: 'Prêt & financement',
    footerNote: 'Message automatique — envoyé suite à votre demande sur bifauma-investieren.com.',
    signature: ['Cordialement,', "L'équipe BIFAUMA"],
    types: {
      loan: 'Demande de prêt',
      contact: 'Message de contact',
      project: 'Proposition de projet',
      newsletter: 'Inscription newsletter',
    },
    fields: {
      name: 'Nom', email: 'E-mail', contact: 'Contact', subject: 'Objet',
      message: 'Message', amount: 'Montant (€)', duration: 'Durée',
      startDate: 'Date de début', endDate: 'Date de fin',
      purpose: 'Objet du financement', income: 'Revenu mensuel (€)',
      situation: 'Situation financière', country: 'Pays', sector: 'Secteur',
      description: 'Description', consent: 'Consentement',
    },
  },
  de: {
    subjectPrefix: 'Bestätigung',
    greeting: 'Guten Tag',
    thanks: 'Vielen Dank für Ihr Vertrauen. Wir haben Ihre Anfrage erhalten und unser Team wird sie prüfen.',
    deadlines: {
      loan: 'Bearbeitung innerhalb von 72 Stunden.',
      contact: 'Wir antworten innerhalb von 24 Stunden.',
      project: 'Wir antworten innerhalb von 5 Werktagen.',
      newsletter: 'Vielen Dank für Ihre Anmeldung.',
    },
    recapTitle: 'Zusammenfassung Ihrer Anfrage',
    closingTitle: 'Fragen? Kontaktieren Sie uns:',
    yes: 'Ja',
    badge: 'Anfrage erhalten',
    tagline: 'Kredite & Finanzierung',
    footerNote: 'Automatische Nachricht — gesendet nach Ihrer Anfrage auf bifauma-investieren.com.',
    signature: ['Mit freundlichen Grüßen,', 'Ihr BIFAUMA-Team'],
    types: {
      loan: 'Kreditanfrage',
      contact: 'Kontaktnachricht',
      project: 'Projektvorschlag',
      newsletter: 'Newsletter-Anmeldung',
    },
    fields: {
      name: 'Name', email: 'E-Mail', contact: 'Kontakt', subject: 'Betreff',
      message: 'Nachricht', amount: 'Betrag (€)', duration: 'Laufzeit',
      startDate: 'Startdatum', endDate: 'Enddatum',
      purpose: 'Verwendungszweck', income: 'Monatliches Einkommen (€)',
      situation: 'Finanzielle Situation', country: 'Land', sector: 'Branche',
      description: 'Beschreibung', consent: 'Einwilligung',
    },
  },
  fi: {
    subjectPrefix: 'Vahvistus',
    greeting: 'Hei',
    thanks: 'Kiitos luottamuksestanne. Olemme vastaanottaneet hakemuksenne ja tiimimme käsittelee sitä.',
    deadlines: {
      loan: 'Käsittely 72 tunnin kuluessa.',
      contact: 'Vastaamme 24 tunnin kuluessa.',
      project: 'Vastaamme 5 työpäivän kuluessa.',
      newsletter: 'Kiitos ilmoittautumisesta.',
    },
    recapTitle: 'Yhteenveto hakemuksestasi',
    closingTitle: 'Kysyttävää? Ota yhteyttä:',
    yes: 'Kyllä',
    badge: 'Hakemus vastaanotettu',
    tagline: 'Lainat & rahoitus',
    footerNote: 'Automaattinen viesti — lähetetty hakemuksesi perusteella osoitteessa bifauma-investieren.com.',
    signature: ['Ystävällisin terveisin,', 'BIFAUMA-tiimi'],
    types: {
      loan: 'Lainahakemus',
      contact: 'Yhteydenotto',
      project: 'Projektiehdotus',
      newsletter: 'Uutiskirjeen tilaus',
    },
    fields: {
      name: 'Nimi', email: 'Sähköposti', contact: 'Yhteystieto', subject: 'Aihe',
      message: 'Viesti', amount: 'Summa (€)', duration: 'Kesto',
      startDate: 'Aloituspäivä', endDate: 'Päättymispäivä',
      purpose: 'Käyttötarkoitus', income: 'Kuukausitulot (€)',
      situation: 'Taloudellinen tilanne', country: 'Maa', sector: 'Toimiala',
      description: 'Kuvaus', consent: 'Suostumus',
    },
  },
  sr: {
    subjectPrefix: 'Потврда',
    greeting: 'Здраво',
    thanks: 'Хвала на поверењу. Примили смо ваш захтев и наш тим ће га размотрити.',
    deadlines: {
      loan: 'Обрада у року од 72 сата.',
      contact: 'Одговарамо у року од 24 сата.',
      project: 'Одговарамо у року од 5 радних дана.',
      newsletter: 'Хвала на пријави.',
    },
    recapTitle: 'Преглед вашег захтева',
    closingTitle: 'Имате питање? Контактирајте нас:',
    yes: 'Да',
    badge: 'Захтев примљен',
    tagline: 'Кредити и финансирање',
    footerNote: 'Аутоматска порука — послата након вашег захтева на bifauma-investieren.com.',
    signature: ['С поштовањем,', 'BIFAUMA тим'],
    types: {
      loan: 'Захтев за кредит',
      contact: 'Порука',
      project: 'Предлог пројекта',
      newsletter: 'Пријава за билтен',
    },
    fields: {
      name: 'Име', email: 'Е-пошта', contact: 'Контакт', subject: 'Тема',
      message: 'Порука', amount: 'Износ (€)', duration: 'Трајање',
      startDate: 'Датум почетка', endDate: 'Датум завршетка',
      purpose: 'Намена', income: 'Месечни приход (€)',
      situation: 'Финансијска ситуација', country: 'Земља', sector: 'Сектор',
      description: 'Опис', consent: 'Сагласност',
    },
  },
};

const TELEGRAM_URL = 'https://t.me/BIFAUMA';
const TELEGRAM_LABEL = '+49 174 594 4264';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61595091127325';

function text(value) {
  return String(value == null ? '' : value)
    .replace(/[\u0000-\u001F\u007F]+/g, ' ')
    .trim();
}

function escapeHtml(value) {
  return text(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

// Analyse le corps de la requête : JSON simple ou multipart (pièces jointes).
function parseRequest(req) {
  return new Promise((resolve, reject) => {
    const contentType = req.headers['content-type'] || '';

    if (contentType.includes('application/json')) {
      let raw = '';
      req.on('data', (chunk) => {
        raw += chunk;
        if (raw.length > MAX_TOTAL_BYTES) reject(new Error('too_large'));
      });
      req.on('end', () => {
        try {
          resolve({ fields: JSON.parse(raw || '{}'), files: [] });
        } catch {
          reject(new Error('bad_request'));
        }
      });
      req.on('error', reject);
      return;
    }

    if (contentType.includes('multipart/form-data')) {
      let busboy;
      try {
        busboy = Busboy({
          headers: req.headers,
          limits: { fileSize: MAX_TOTAL_BYTES, files: MAX_FILES, fields: MAX_FIELDS },
        });
      } catch {
        reject(new Error('bad_request'));
        return;
      }

      const fields = {};
      const files = [];
      let total = 0;
      let overflow = false;

      busboy.on('field', (name, value) => {
        fields[name] = value;
      });
      busboy.on('file', (_name, stream, info) => {
        const chunks = [];
        stream.on('data', (chunk) => {
          total += chunk.length;
          if (total > MAX_TOTAL_BYTES) overflow = true;
          chunks.push(chunk);
        });
        stream.on('limit', () => { overflow = true; stream.resume(); });
        stream.on('end', () => {
          if (!overflow) {
            files.push({
              filename: text(info.filename) || 'document',
              content: Buffer.concat(chunks),
              contentType: info.mimeType,
            });
          }
        });
      });
      busboy.on('error', reject);
      busboy.on('close', () => {
        if (overflow) reject(new Error('too_large'));
        else resolve({ fields, files });
      });
      req.pipe(busboy);
      return;
    }

    reject(new Error('bad_request'));
  });
}

function buildBodies(type, fields) {
  const typeLabel = TYPE_LABELS[type] || 'Message';
  const keys = Object.keys(fields).filter((k) => !k.startsWith('_') && text(fields[k]) !== '');
  const ordered = [
    ...FIELD_ORDER.filter((k) => keys.includes(k)),
    ...keys.filter((k) => !FIELD_ORDER.includes(k)),
  ];

  const rows = ordered
    .map((k) => {
      const label = FIELD_LABELS[k] || k;
      return `<tr><td style="padding:6px 12px 6px 0;color:#55637A;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;color:#172033"><strong>${escapeHtml(fields[k])}</strong></td></tr>`;
    })
    .join('');

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#172033">
      <h2 style="color:#071A3A;margin:0 0 4px">${escapeHtml(typeLabel)}</h2>
      <p style="color:#55637A;margin:0 0 16px">Nouvelle demande reçue depuis le site BIFAUMA.</p>
      <table style="border-collapse:collapse">${rows}</table>
    </div>`;

  const plain = [
    `${typeLabel} — nouvelle demande reçue depuis le site BIFAUMA.`,
    '',
    ...ordered.map((k) => `${FIELD_LABELS[k] || k}: ${text(fields[k])}`),
  ].join('\n');

  return { typeLabel, html, plain };
}

// Construit l'accusé de réception destiné au client : un message de remerciement
// localisé suivi du récapitulatif détaillé de sa demande.
function buildConfirmation(type, fields, lang) {
  const L = CONFIRM_LOCALES[lang] || CONFIRM_LOCALES.fr;
  const typeLabel = L.types[type] || L.types.contact;

  const keys = Object.keys(fields).filter((k) => !k.startsWith('_') && text(fields[k]) !== '');
  const ordered = [
    ...FIELD_ORDER.filter((k) => keys.includes(k)),
    ...keys.filter((k) => !FIELD_ORDER.includes(k)),
  ];

  // Pour une proposition de projet, « name » est le nom du projet et non celui
  // de la personne : on évite de l'utiliser comme salutation.
  const personName = type === 'project' ? '' : text(fields.name);
  const greeting = `${L.greeting}${personName ? ` ${personName}` : ''},`;
  const deadline = L.deadlines[type] || '';

  // Le consentement est transmis comme « Oui » : on l'affiche dans la langue du client.
  const valueOf = (k) => (k === 'consent' ? L.yes : fields[k]);

  const rows = ordered
    .map((k, i) => {
      const label = L.fields[k] || k;
      const isLast = i === ordered.length - 1;
      const border = isLast ? 'none' : '1px solid #EEF1F6';
      return `<tr>`
        + `<td style="padding:11px 16px 11px 0;border-bottom:${border};color:#55637A;font-size:13px;vertical-align:top;width:42%;">${escapeHtml(label)}</td>`
        + `<td style="padding:11px 0;border-bottom:${border};color:#172033;font-size:15px;font-weight:600;vertical-align:top;">${escapeHtml(valueOf(k))}</td>`
        + `</tr>`;
    })
    .join('');

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>BIFAUMA</title>
</head>
<body style="margin:0;padding:0;background:#F6F8FB;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F6F8FB;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#FFFFFF;border:1px solid #E4E8EF;border-radius:16px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">

          <!-- En-tête -->
          <tr>
            <td style="background:#071A3A;padding:26px 34px;border-bottom:3px solid #16B8A6;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size:22px;font-weight:700;letter-spacing:0.05em;color:#FFFFFF;">BIFAUMA</td>
                  <td align="right" style="font-size:13px;letter-spacing:0.02em;color:#9FB3CF;">${escapeHtml(L.tagline)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:30px 34px 0;">
              <span style="display:inline-block;background:#E6F7F5;color:#0E8C7E;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;padding:6px 13px;border-radius:999px;">&#10003;&nbsp; ${escapeHtml(L.badge)}</span>
              <h1 style="margin:20px 0 10px;font-size:21px;line-height:1.3;color:#071A3A;">${escapeHtml(greeting)}</h1>
              <p style="margin:0 0 10px;font-size:15px;line-height:1.6;color:#55637A;">${escapeHtml(L.thanks)}</p>
              ${deadline ? `<p style="margin:0;font-size:15px;line-height:1.6;color:#0879D1;font-weight:700;">${escapeHtml(deadline)}</p>` : ''}
            </td>
          </tr>

          <!-- Récapitulatif -->
          <tr>
            <td style="padding:26px 34px 0;">
              <h2 style="margin:0 0 6px;font-size:16px;color:#071A3A;">${escapeHtml(L.recapTitle)}</h2>
              <p style="margin:0 0 14px;font-size:13px;color:#8A96A8;">${escapeHtml(typeLabel)}</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:15px;">${rows}</table>
            </td>
          </tr>

          <!-- Contact -->
          <tr>
            <td style="padding:26px 34px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EAF3FC;border-radius:12px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#071A3A;">${escapeHtml(L.closingTitle)}</p>
                    <p style="margin:0;font-size:14px;line-height:1.9;color:#172033;">
                      Telegram : <a href="${TELEGRAM_URL}" style="color:#0879D1;text-decoration:none;font-weight:600;">${escapeHtml(TELEGRAM_LABEL)}</a><br />
                      Facebook : <a href="${FACEBOOK_URL}" style="color:#0879D1;text-decoration:none;font-weight:600;">BIFAUMA</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding:26px 34px 30px;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#55637A;">${L.signature.map(escapeHtml).join('<br />')}</p>
            </td>
          </tr>

          <!-- Pied de page -->
          <tr>
            <td style="background:#F6F8FB;border-top:1px solid #E4E8EF;padding:18px 34px;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#8A96A8;">
                ${escapeHtml(L.footerNote)}<br />
                &copy; BIFAUMA &middot; bifauma-investieren.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const plain = [
    'B I F A U M A',
    '------------------------------',
    `[${L.badge}]`,
    '',
    greeting,
    '',
    L.thanks,
    ...(deadline ? [deadline] : []),
    '',
    `${L.recapTitle} — ${typeLabel}`,
    ...ordered.map((k) => `${L.fields[k] || k}: ${text(valueOf(k))}`),
    '',
    L.closingTitle,
    `Telegram : ${TELEGRAM_LABEL}`,
    'Facebook : BIFAUMA',
    '',
    ...L.signature,
    '',
    '------------------------------',
    L.footerNote,
  ].join('\n');

  const subject = `BIFAUMA — ${L.subjectPrefix} : ${typeLabel}`.slice(0, 180);

  return { subject, html, plain };
}

export default async function handler(req, res) {
  if (req.method && req.method !== 'POST') {
    sendJson(res, 405, { ok: false, error: 'method_not_allowed' });
    return;
  }

  const missing = ['SMTP_HOST', 'MAIL_TO'].filter((k) => !process.env[k]);
  if (missing.length > 0) {
    // Volontairement explicite : tant que le SMTP n'est pas configuré, on ne
    // prétend pas que le message a été envoyé.
    sendJson(res, 501, { ok: false, error: 'not_configured' });
    return;
  }

  let parsed;
  try {
    parsed = await parseRequest(req);
  } catch (err) {
    const tooLarge = err && err.message === 'too_large';
    sendJson(res, tooLarge ? 413 : 400, {
      ok: false,
      error: tooLarge ? 'too_large' : 'bad_request',
    });
    return;
  }

  const { fields, files } = parsed;

  // Champ anti-robots invisible : rempli = on ignore silencieusement.
  if (text(fields._gotcha)) {
    sendJson(res, 200, { ok: true });
    return;
  }

  const type = TYPE_LABELS[fields._type] ? fields._type : 'contact';
  const lang = CONFIRM_LOCALES[text(fields._lang)] ? text(fields._lang) : 'fr';
  const { typeLabel, html, plain } = buildBodies(type, fields);

  // Adresse du client (e-mail explicite ou « contact » qui en est un).
  const replyTo = [fields.email, fields.contact].map(text).find(isEmail);
  const who = text(fields.name) || replyTo || '';

  try {
    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      replyTo: replyTo || undefined,
      subject: `[BIFAUMA] ${typeLabel}${who ? ` — ${who}` : ''}`.slice(0, 180),
      text: plain,
      html,
      attachments: files.map((file) => ({
        filename: file.filename,
        content: file.content,
        contentType: file.contentType,
      })),
    });

    // Accusé de réception au client, dans la langue du site. Envoyé uniquement
    // si l'on dispose d'une adresse e-mail valide. Un échec ici ne doit pas
    // invalider la demande : l'e-mail interne est déjà parti.
    if (replyTo) {
      const confirmation = buildConfirmation(type, fields, lang);
      try {
        await transporter.sendMail({
          from: process.env.MAIL_FROM || process.env.SMTP_USER,
          to: replyTo,
          replyTo: process.env.MAIL_TO || undefined,
          subject: confirmation.subject,
          text: confirmation.plain,
          html: confirmation.html,
        });
      } catch {
        /* accusé facultatif : on ignore un échec d'envoi au client */
      }
    }

    sendJson(res, 200, { ok: true });
  } catch {
    sendJson(res, 502, { ok: false, error: 'send_failed' });
  }
}
