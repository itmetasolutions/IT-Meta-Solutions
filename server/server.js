import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = [
  "https://itmetasolutions.com",
  "https://www.itmetasolutions.com",
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
