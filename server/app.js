import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import { pool, isDbConfigured, ensureSchema } from './db.js';
import { signAdminToken, requireAdmin, checkAdminCredentials } from './auth.js';
import { isWithinOfficeHours } from './officeHours.js';
import { scrapeReviews, refreshReviewsCache, getCachedReviews } from './reviews.js';

const app = express();

const allowedOrigins = [
  'https://itmetasolutions.com',
  'https://www.itmetasolutions.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  })
);
app.use(express.json());

async function requireDb(req, res, next) {
  if (!isDbConfigured()) {
    return res.status(503).json({ error: 'Database is not configured on the server yet.' });
  }
  try {
    await ensureSchema();
    next();
  } catch (error) {
    console.error('Schema init error:', error);
    res.status(500).json({ error: 'Database initialization failed.' });
  }
}

// Resend is created lazily so a missing RESEND_API_KEY only breaks the
// contact-form route, not the whole app (important on serverless, where a
// throw at module load kills every route on every cold start).
function getResendClient() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

/* =========================
   HEALTH / MISC
   ========================= */

app.get('/', (req, res) => {
  res.send('IT Meta Solutions API is running ✅');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/contact', (req, res) => {
  res.json({ status: 'ok' });
});

/* =========================
   GOOGLE REVIEWS
   ========================= */

app.get('/api/google-reviews', async (req, res) => {
  const forceRefresh = req.query.refresh === '1';

  if (!isDbConfigured()) {
    try {
      const payload = await scrapeReviews();
      return res.json({ ...payload, cache_status: 'fresh' });
    } catch (error) {
      console.error('Live reviews fetch error:', error);
      return res.status(500).json({ error: 'Google reviews are unavailable' });
    }
  }

  const cached = await getCachedReviews();

  if (cached && !forceRefresh && cached.fresh) {
    return res.json({ ...cached.payload, cache_status: 'fresh' });
  }

  try {
    const payload = await refreshReviewsCache();
    return res.json({ ...payload, cache_status: 'fresh' });
  } catch (error) {
    console.error('Reviews refresh error:', error);
    if (cached) return res.json({ ...cached.payload, cache_status: 'stale' });
    return res.status(500).json({ error: 'Google reviews are unavailable' });
  }
});

// Hit by Vercel Cron on a schedule (see vercel.json) to keep the cache warm.
app.get('/api/cron/refresh-reviews', async (req, res) => {
  if (process.env.CRON_SECRET) {
    const auth = req.headers.authorization || '';
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
  try {
    const payload = await refreshReviewsCache();
    res.json({ success: true, reviews: payload.reviews.length });
  } catch (error) {
    console.error('Reviews refresh error:', error);
    res.status(500).json({ error: 'Failed to refresh reviews' });
  }
});

/* =========================
   CONTACT FORM
   ========================= */

const serviceLabelByValue = {
  meta: 'Meta Ads',
  tiktok: 'TikTok Ads',
  google: 'Google Ads',
  web: 'Website',
  social: 'SMM',
  brand: 'Brand Building',
  design: 'Graphic Design',
  video: 'Video Editing',
  salesforce: 'Salesforce',
};

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, services, service, company, budget, message, source } = req.body;

  const serviceLabel = serviceLabelByValue?.[service] || service || 'N/A';
  const servicesList = Array.isArray(services) && services.length > 0 ? services.join(', ') : 'N/A';

  const isContactPage = source === 'contact-page';
  const subject = isContactPage ? 'New Contact Page Submission' : 'New Home Page Submission';

  const html = isContactPage
    ? `
      <h2>New Contact Page Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Service Needed:</strong> ${serviceLabel}</p>
      <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
    : `
      <h2>New Home Page Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Services:</strong> ${servicesList}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

  if (isDbConfigured()) {
    try {
      await ensureSchema();
      await pool.query(
        `INSERT INTO contact_submissions (name, email, phone, company, service, budget, message, source)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [name, email, phone || null, company || null, isContactPage ? serviceLabel : servicesList, budget || null, message, source || null]
      );
    } catch (error) {
      console.error('Failed to store contact submission:', error);
    }
  }

  const resend = getResendClient();
  if (!resend) {
    console.error('RESEND_API_KEY is not set — contact email not sent.');
    return res.status(500).json({ error: 'Failed to send message' });
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject,
      html,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

/* =========================
   ADMIN AUTH
   ========================= */

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!checkAdminCredentials(username, password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ token: signAdminToken(username) });
});

app.get('/api/admin/me', requireAdmin, (req, res) => {
  res.json({ username: req.admin.username });
});

/* =========================
   ADMIN — FORM SUBMISSIONS
   ========================= */

app.get('/api/admin/submissions', requireAdmin, requireDb, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 500');
  res.json(rows);
});

app.patch('/api/admin/submissions/:id', requireAdmin, requireDb, async (req, res) => {
  const { status } = req.body || {};
  if (!['new', 'read', 'responded', 'archived'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const { rows } = await pool.query(
    'UPDATE contact_submissions SET status = $1 WHERE id = $2 RETURNING *',
    [status, req.params.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

/* =========================
   ADMIN — LIVE CHAT
   ========================= */

app.get('/api/admin/conversations', requireAdmin, requireDb, async (req, res) => {
  const { rows } = await pool.query(`
    SELECT c.*,
      (SELECT body FROM chat_messages m WHERE m.conversation_id = c.id ORDER BY m.created_at DESC LIMIT 1) AS last_message,
      (SELECT COUNT(*) FROM chat_messages m WHERE m.conversation_id = c.id AND m.sender = 'visitor' AND m.read_by_admin = false) AS unread_count
    FROM chat_conversations c
    ORDER BY c.last_message_at DESC
    LIMIT 200
  `);
  res.json(rows);
});

app.get('/api/admin/conversations/:id/messages', requireAdmin, requireDb, async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM chat_messages WHERE conversation_id = $1 ORDER BY created_at ASC',
    [req.params.id]
  );
  await pool.query(
    "UPDATE chat_messages SET read_by_admin = true WHERE conversation_id = $1 AND sender = 'visitor'",
    [req.params.id]
  );
  res.json(rows);
});

app.post('/api/admin/conversations/:id/messages', requireAdmin, requireDb, async (req, res) => {
  const { text } = req.body || {};
  if (!text?.trim()) return res.status(400).json({ error: 'text is required' });

  const inserted = await pool.query(
    `INSERT INTO chat_messages (conversation_id, sender, body, read_by_admin) VALUES ($1, 'admin', $2, true) RETURNING *`,
    [req.params.id, text.trim()]
  );
  await pool.query('UPDATE chat_conversations SET last_message_at = now() WHERE id = $1', [req.params.id]);
  res.status(201).json(inserted.rows[0]);
});

/* =========================
   VISITOR — LIVE CHAT
   ========================= */

// Creates the conversation row if needed and returns message history + a
// welcome message the first time a visitor opens the widget.
app.post('/api/chat/session', requireDb, async (req, res) => {
  const { visitorId } = req.body || {};
  if (!visitorId) return res.status(400).json({ error: 'visitorId is required' });

  const existing = await pool.query('SELECT * FROM chat_conversations WHERE visitor_id = $1', [visitorId]);
  let conversation = existing.rows[0];
  let isNew = false;

  if (!conversation) {
    isNew = true;
    const inserted = await pool.query(
      'INSERT INTO chat_conversations (visitor_id) VALUES ($1) RETURNING *',
      [visitorId]
    );
    conversation = inserted.rows[0];
  }

  if (isNew) {
    const greeting = isWithinOfficeHours()
      ? "👋 Welcome to IT Meta Solutions! We're online now — ask us anything about your project and we'll reply shortly."
      : "👋 Welcome to IT Meta Solutions! Our team is currently offline (office hours are Mon–Fri, 9AM–6PM UK time). Leave a message and we'll reply as soon as we're back.";
    await pool.query(`INSERT INTO chat_messages (conversation_id, sender, body) VALUES ($1, 'bot', $2)`, [
      conversation.id,
      greeting,
    ]);
  }

  const { rows: messages } = await pool.query(
    'SELECT * FROM chat_messages WHERE conversation_id = $1 ORDER BY created_at ASC',
    [conversation.id]
  );

  res.json({ conversation, messages });
});

async function assertOwnsConversation(conversationId, visitorId) {
  const { rows } = await pool.query('SELECT visitor_id FROM chat_conversations WHERE id = $1', [conversationId]);
  return rows.length > 0 && rows[0].visitor_id === visitorId;
}

// Polled by the widget every few seconds while the panel is open.
app.get('/api/chat/messages', requireDb, async (req, res) => {
  const { conversationId, visitorId } = req.query;
  if (!conversationId || !visitorId) {
    return res.status(400).json({ error: 'conversationId and visitorId are required' });
  }
  if (!(await assertOwnsConversation(conversationId, visitorId))) {
    return res.status(403).json({ error: 'Not authorized for this conversation' });
  }
  const { rows } = await pool.query(
    'SELECT * FROM chat_messages WHERE conversation_id = $1 ORDER BY created_at ASC',
    [conversationId]
  );
  res.json(rows);
});

app.post('/api/chat/messages', requireDb, async (req, res) => {
  const { visitorId, conversationId, text } = req.body || {};
  if (!visitorId || !conversationId || !text?.trim()) {
    return res.status(400).json({ error: 'visitorId, conversationId and text are required' });
  }
  if (!(await assertOwnsConversation(conversationId, visitorId))) {
    return res.status(403).json({ error: 'Not authorized for this conversation' });
  }

  const inserted = await pool.query(
    `INSERT INTO chat_messages (conversation_id, sender, body) VALUES ($1, 'visitor', $2) RETURNING *`,
    [conversationId, text.trim()]
  );
  await pool.query('UPDATE chat_conversations SET last_message_at = now() WHERE id = $1', [conversationId]);
  const newMessages = [inserted.rows[0]];

  // Automatic office-hours acknowledgement for the visitor's first message only.
  const countRes = await pool.query(
    "SELECT COUNT(*) FROM chat_messages WHERE conversation_id = $1 AND sender = 'visitor'",
    [conversationId]
  );
  if (Number(countRes.rows[0].count) === 1 && !isWithinOfficeHours()) {
    const auto = await pool.query(
      `INSERT INTO chat_messages (conversation_id, sender, body)
       VALUES ($1, 'bot', 'Thanks for the message! Our team is currently offline (Mon-Fri, 9AM-6PM UK time) but we''ve got this and will reply as soon as we''re back online.')
       RETURNING *`,
      [conversationId]
    );
    newMessages.push(auto.rows[0]);
  }

  res.status(201).json({ messages: newMessages });
});

export default app;
