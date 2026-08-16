import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import { Server as SocketIOServer } from 'socket.io';
import { pool, isDbConfigured, initDb } from './db.js';
import { signAdminToken, requireAdmin, verifyAdminToken, checkAdminCredentials } from './auth.js';
import { isWithinOfficeHours } from './officeHours.js';

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REVIEWS_CACHE_PATH = path.join(__dirname, 'cache', 'google-reviews.json');
const REVIEWS_SCRIPT_PATH = path.resolve(__dirname, '..', 'scripts', 'scrape_google_reviews.py');
const REVIEWS_CACHE_TTL_MS =
  Number(process.env.GOOGLE_REVIEWS_CACHE_TTL_HOURS || 24) * 60 * 60 * 1000;

let reviewsRefreshPromise = null;

// Middleware
const allowedOrigins = [
  "https://itmetasolutions.com",
  "https://www.itmetasolutions.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
  })
);
app.use(express.json());

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  },
});

async function readReviewsCache() {
  try {
    const raw = await fs.readFile(REVIEWS_CACHE_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isReviewsCacheFresh(cache) {
  if (!cache?.generated_at) {
    return false;
  }

  const generatedAt = new Date(cache.generated_at).getTime();
  if (Number.isNaN(generatedAt)) {
    return false;
  }

  return Date.now() - generatedAt < REVIEWS_CACHE_TTL_MS;
}

function refreshReviewsCache() {
  if (reviewsRefreshPromise) {
    return reviewsRefreshPromise;
  }

  reviewsRefreshPromise = new Promise((resolve, reject) => {
    const pythonBin = process.env.PYTHON_BIN || 'python';
    const args = [REVIEWS_SCRIPT_PATH, '--output', REVIEWS_CACHE_PATH];

    if (process.env.GOOGLE_REVIEWS_WIDGET_ID) {
      args.push('--widget-id', process.env.GOOGLE_REVIEWS_WIDGET_ID);
    }

    if (process.env.GOOGLE_REVIEWS_PAGE_URL) {
      args.push('--page-url', process.env.GOOGLE_REVIEWS_PAGE_URL);
    }

    if (process.env.GOOGLE_REVIEWS_PROFILE_URL) {
      args.push('--google-maps-url', process.env.GOOGLE_REVIEWS_PROFILE_URL);
    }

    const child = spawn(pythonBin, args, {
      cwd: path.resolve(__dirname, '..'),
      env: process.env,
      shell: false,
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      reject(new Error(`Reviews refresh failed with code ${code}: ${stderr || stdout}`));
    });
  }).finally(() => {
    reviewsRefreshPromise = null;
  });

  return reviewsRefreshPromise;
}

/* =========================
   ADD THESE ROUTES HERE
   ========================= */
app.get("/", (req, res) => {
  res.send("IT Meta Solutions API is running ✅");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Simple ping for contact endpoint
app.get("/api/contact", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/google-reviews", async (req, res) => {
  const forceRefresh = req.query.refresh === "1";
  const cached = await readReviewsCache();

  if (cached && !forceRefresh && isReviewsCacheFresh(cached)) {
    res.json({ ...cached, cache_status: "fresh" });
    return;
  }

  if (forceRefresh || !cached) {
    try {
      await refreshReviewsCache();
      const freshCache = await readReviewsCache();

      if (freshCache) {
        res.json({ ...freshCache, cache_status: "fresh" });
        return;
      }
    } catch (error) {
      console.error('Google reviews refresh error:', error);

      if (!cached) {
        res.status(500).json({ error: "Failed to load Google reviews" });
        return;
      }
    }
  }

  refreshReviewsCache().catch((error) => {
    console.error('Background Google reviews refresh error:', error);
  });

  if (cached) {
    res.json({ ...cached, cache_status: "stale" });
    return;
  }

  res.status(500).json({ error: "Google reviews are unavailable" });
});
/* =========================
   END HERE
   ========================= */

const resend = new Resend(process.env.RESEND_API_KEY);

const serviceLabelByValue = {
  meta: "Meta Ads",
  tiktok: "TikTok Ads",
  google: "Google Ads",
  web: "Website",
  social: "SMM",
  brand: "Brand Building",
  design: "Graphic Design",
  video: "Video Editing",
  salesforce: "Salesforce",
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, services, service, company, budget, message, source } = req.body;

  const serviceLabel = serviceLabelByValue?.[service] || service || "N/A";
  const servicesList = Array.isArray(services) && services.length > 0 ? services.join(', ') : "N/A";

  const isContactPage = source === "contact-page";
  const subject = isContactPage
    ? "New Contact Page Submission"
    : "New Home Page Submission";

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

  const mailOptions = {
    from: process.env.RESEND_FROM,
    to: process.env.TO_EMAIL,
    replyTo: email,
    subject,
    html,
  };

  if (isDbConfigured()) {
    try {
      await pool.query(
        `INSERT INTO contact_submissions (name, email, phone, company, service, budget, message, source)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [name, email, phone || null, company || null, isContactPage ? serviceLabel : servicesList, budget || null, message, source || null]
      );
    } catch (error) {
      console.error('Failed to store contact submission:', error);
    }
  }

  try {
    await resend.emails.send(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: "Failed to send message" });
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

function requireDb(req, res, next) {
  if (!isDbConfigured()) {
    return res.status(503).json({ error: 'Database is not configured on the server yet.' });
  }
  next();
}

app.get('/api/admin/submissions', requireAdmin, requireDb, async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 500'
  );
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
   ADMIN — LIVE CHAT (REST)
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

/* =========================
   VISITOR — LIVE CHAT (REST)
   ========================= */

// Creates the conversation row if needed and returns message history + a welcome
// message the first time a visitor opens the widget.
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
    await pool.query(
      `INSERT INTO chat_messages (conversation_id, sender, body) VALUES ($1, 'bot', $2)`,
      [conversation.id, greeting]
    );
  }

  const { rows: messages } = await pool.query(
    'SELECT * FROM chat_messages WHERE conversation_id = $1 ORDER BY created_at ASC',
    [conversation.id]
  );

  res.json({ conversation, messages });
});

httpServer.listen(PORT, async () => {
  await initDb().catch((error) => console.error('Failed to initialize database:', error));
  console.log(`Server running on port ${PORT}`);
});

/* =========================
   LIVE CHAT — SOCKET.IO
   ========================= */

const ADMIN_ROOM = 'admins';

io.on('connection', (socket) => {
  socket.on('admin:auth', (token) => {
    const payload = verifyAdminToken(token);
    if (!payload) return;
    socket.data.isAdmin = true;
    socket.join(ADMIN_ROOM);
  });

  socket.on('admin:join-conversation', ({ conversationId }) => {
    if (!socket.data.isAdmin) return;
    socket.join(`conversation:${conversationId}`);
  });

  socket.on('visitor:join', ({ visitorId }) => {
    if (!visitorId) return;
    socket.data.visitorId = visitorId;
    socket.join(`visitor:${visitorId}`);
  });

  socket.on('visitor:message', async ({ visitorId, conversationId, text }) => {
    if (!isDbConfigured() || !visitorId || !conversationId || !text?.trim()) return;
    try {
      const { rows } = await pool.query(
        `INSERT INTO chat_messages (conversation_id, sender, body) VALUES ($1, 'visitor', $2) RETURNING *`,
        [conversationId, text.trim()]
      );
      await pool.query('UPDATE chat_conversations SET last_message_at = now() WHERE id = $1', [conversationId]);
      const message = rows[0];
      io.to(`visitor:${visitorId}`).to(ADMIN_ROOM).to(`conversation:${conversationId}`).emit('message:new', message);

      // Automatic office-hours acknowledgement for the very first visitor message only.
      const { rows: visitorMsgCount } = await pool.query(
        "SELECT COUNT(*) FROM chat_messages WHERE conversation_id = $1 AND sender = 'visitor'",
        [conversationId]
      );
      if (Number(visitorMsgCount[0].count) === 1 && !isWithinOfficeHours()) {
        const auto = await pool.query(
          `INSERT INTO chat_messages (conversation_id, sender, body)
           VALUES ($1, 'bot', 'Thanks for the message! Our team is currently offline (Mon–Fri, 9AM–6PM UK time) but we''ve got this and will reply as soon as we''re back online.')
           RETURNING *`,
          [conversationId]
        );
        io.to(`visitor:${visitorId}`).to(ADMIN_ROOM).to(`conversation:${conversationId}`).emit('message:new', auto.rows[0]);
      }
    } catch (error) {
      console.error('Failed to save visitor message:', error);
    }
  });

  socket.on('admin:message', async ({ conversationId, text, token }) => {
    const payload = verifyAdminToken(token);
    if (!payload || !isDbConfigured() || !conversationId || !text?.trim()) return;
    try {
      const { rows } = await pool.query(
        `INSERT INTO chat_messages (conversation_id, sender, body, read_by_admin) VALUES ($1, 'admin', $2, true) RETURNING *`,
        [conversationId, text.trim()]
      );
      await pool.query('UPDATE chat_conversations SET last_message_at = now() WHERE id = $1', [conversationId]);
      const message = rows[0];
      const convo = await pool.query('SELECT visitor_id FROM chat_conversations WHERE id = $1', [conversationId]);
      const visitorId = convo.rows[0]?.visitor_id;
      io.to(ADMIN_ROOM).to(`conversation:${conversationId}`).emit('message:new', message);
      if (visitorId) io.to(`visitor:${visitorId}`).emit('message:new', message);
    } catch (error) {
      console.error('Failed to save admin message:', error);
    }
  });
});
