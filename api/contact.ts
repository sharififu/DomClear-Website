import nodemailer from 'nodemailer';

declare const process: {
  env: Record<string, string | undefined>;
};

type RequestLike = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  on(event: 'data', callback: (chunk: Uint8Array) => void): void;
  on(event: 'end', callback: () => void): void;
  on(event: 'error', callback: (error: Error) => void): void;
};

type ResponseLike = {
  status(code: number): ResponseLike;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
};

type ContactSubmission = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  organisation?: string;
  role?: string;
  subject?: string;
  message?: string;
  website?: string;
};

const subjectLabels: Record<string, string> = {
  demo: 'Request a demo',
  pricing: 'Pricing inquiry',
  support: 'Technical support',
  partnership: 'Partnership opportunity',
  other: 'Other',
};

const maxLengths = {
  firstName: 80,
  lastName: 80,
  email: 160,
  phone: 80,
  organisation: 160,
  role: 120,
  subject: 40,
  message: 3000,
};

function sendJson(res: ResponseLike, status: number, body: unknown) {
  res.setHeader('Content-Type', 'application/json');
  res.status(status).json(body);
}

function clean(value: unknown, maxLength: number) {
  return String(value ?? '').trim().slice(0, maxLength);
}

async function readBody(req: RequestLike): Promise<unknown> {
  if (req.body) {
    return req.body;
  }

  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];

    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const rawBody = Buffer.concat(chunks).toString('utf8');

      try {
        resolve(rawBody ? JSON.parse(rawBody) : {});
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function validateSubmission(body: unknown) {
  const data = body as ContactSubmission;
  const submission = {
    firstName: clean(data.firstName, maxLengths.firstName),
    lastName: clean(data.lastName, maxLengths.lastName),
    email: clean(data.email, maxLengths.email).toLowerCase(),
    phone: clean(data.phone, maxLengths.phone),
    organisation: clean(data.organisation, maxLengths.organisation),
    role: clean(data.role, maxLengths.role),
    subject: clean(data.subject, maxLengths.subject),
    message: clean(data.message, maxLengths.message),
    website: clean(data.website, 200),
  };

  if (submission.website) {
    return { isSpam: true, submission };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!submission.firstName || !submission.lastName || !emailPattern.test(submission.email)) {
    return { error: 'Please provide your name and a valid email address.' };
  }

  if (!subjectLabels[submission.subject]) {
    return { error: 'Please select a subject.' };
  }

  if (submission.message.length < 10) {
    return { error: 'Please add a message with at least 10 characters.' };
  }

  return { submission };
}

function buildEmail(submission: Required<Omit<ContactSubmission, 'website'>>) {
  const fullName = `${submission.firstName} ${submission.lastName}`;
  const subject = subjectLabels[submission.subject] ?? submission.subject;

  const text = [
    `New DomiClear contact form submission`,
    ``,
    `Name: ${fullName}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || 'Not provided'}`,
    `Organisation: ${submission.organisation || 'Not provided'}`,
    `Role: ${submission.role || 'Not provided'}`,
    `Subject: ${subject}`,
    ``,
    `Message:`,
    submission.message,
  ].join('\n');

  const html = `
    <h2>New DomiClear contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(submission.phone || 'Not provided')}</p>
    <p><strong>Organisation:</strong> ${escapeHtml(submission.organisation || 'Not provided')}</p>
    <p><strong>Role:</strong> ${escapeHtml(submission.role || 'Not provided')}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(submission.message).replace(/\n/g, '<br />')}</p>
  `;

  return { fullName, subject, text, html };
}

function getSmtpPort() {
  const port = Number(process.env.SMTP_PORT || 465);
  return Number.isFinite(port) ? port : 465;
}

function getSmtpSecure(port: number) {
  if (process.env.SMTP_SECURE) {
    return process.env.SMTP_SECURE === 'true';
  }

  return port === 465;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const body = await readBody(req);
    const result = validateSubmission(body);

    if ('isSpam' in result) {
      sendJson(res, 200, { ok: true });
      return;
    }

    if ('error' in result) {
      sendJson(res, 400, { error: result.error });
      return;
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = getSmtpPort();
    const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;
    const toEmail = process.env.CONTACT_TO_EMAIL || 'info@domi-clear.com';

    if (!smtpHost || !smtpUser || !smtpPass || !fromEmail) {
      sendJson(res, 500, {
        error: 'Contact form email delivery is not configured.',
      });
      return;
    }

    const email = buildEmail({
      firstName: result.submission.firstName,
      lastName: result.submission.lastName,
      email: result.submission.email,
      phone: result.submission.phone,
      organisation: result.submission.organisation,
      role: result.submission.role,
      subject: result.submission.subject,
      message: result.submission.message,
    });

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: getSmtpSecure(smtpPort),
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    try {
      await transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        replyTo: result.submission.email,
        subject: `DomiClear contact: ${email.subject}`,
        text: email.text,
        html: email.html,
      });
    } catch {
      sendJson(res, 502, { error: 'Unable to send your message right now.' });
      return;
    }

    sendJson(res, 200, { ok: true });
  } catch {
    sendJson(res, 400, { error: 'Invalid request body.' });
  }
}
