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

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, services, message } = req.body;

  const mailOptions = {
    from: process.env.RESEND_FROM,
    to: process.env.TO_EMAIL,
    replyTo: email,
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Services:</strong> ${Array.isArray(services) ? services.join(', ') : services || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
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
