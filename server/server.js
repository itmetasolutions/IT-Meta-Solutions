import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
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
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(express.json());

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

  try {
    await resend.emails.send(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
