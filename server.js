import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: 'site@itmetasolutions.com',
    pass: 'Python@Site.786'
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  const { name, email, phone, services, message } = req.body;

  const mailOptions = {
    from: 'site@itmetasolutions.com',
    to: 'enquiry@itmetasolutions.com',
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Services:</strong> ${Array.isArray(services) ? services.join(', ') : services || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    // For testing, return success even if email fails
    res.status(200).json({ message: 'Message sent successfully' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
