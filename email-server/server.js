/**
 * Email Server — Node.js + Express + Nodemailer
 * -----------------------------------------------
 * Handles contact form submissions from the portfolio frontend.
 * Sends:
 *   1. A confirmation email to the client.
 *   2. A notification email to the admin.
 *
 * Usage: node server.js  (or: npm start)
 */

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

// ─── Validate required env vars on startup ───────────────────────────────────
const REQUIRED_ENV = ["EMAIL_USER", "EMAIL_PASS", "ADMIN_EMAIL"];
const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`[FATAL] Missing env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const {
  EMAIL_USER,
  EMAIL_PASS,
  ADMIN_EMAIL,
  PORT = 5000,
  FRONTEND_URL = "http://localhost:5173",
} = process.env;

// ─── Express setup ───────────────────────────────────────────────────────────
const app = express();

app.use(express.json({ limit: "10kb" }));

// CORS — allow the configured frontend URL plus common Vite dev ports
const allowedOrigins = [
  FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];
app.use(
  cors({
    origin: (origin, cb) => {
      // allow requests with no origin (e.g. curl / Postman) or matched origins
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`CORS blocked: ${origin}`));
    },
    methods: ["POST", "GET"],
  })
);

// ─── Rate limiter — max 5 submissions per IP per 15 minutes ──────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many messages sent. Please wait 15 minutes before trying again.",
  },
});

// ─── Nodemailer transporter ──────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS, // Gmail App Password (NOT your regular password)
  },
});

// Verify transporter on startup
transporter.verify((err) => {
  if (err) {
    console.error("[Nodemailer] Connection failed:", err.message);
  } else {
    console.log("[Nodemailer] SMTP connection established ✓");
  }
});

// ─── Helper: validate email format ───────────────────────────────────────────
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim().toLowerCase());

// ─── HTML email templates ─────────────────────────────────────────────────────

/**
 * Confirmation email sent TO the client who filled the form.
 */
const buildClientEmail = ({ name, message }) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contact Confirmation</title>

<style>
  @media only screen and (max-width: 600px) {
    .container {
      width: 100% !important;
    }
    .padding {
      padding: 20px !important;
    }
    .mobile-center {
      text-align: center !important;
    }
    .mobile-text {
      font-size: 14px !important;
    }
  }
</style>

</head>

<body style="margin:0;padding:0;background:#f2f4f8;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f2f4f8">
<tr>
<td align="center">

<!-- Main Container -->
<table width="600" cellpadding="0" cellspacing="0" class="container" style="background:#ffffff;margin:40px 0;border-radius:12px;overflow:hidden;">

  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#4f46e5,#6366f1);padding:35px;text-align:center;color:#ffffff;">
      <h1 style="margin:0;font-size:24px;">Thanks for reaching out 👋</h1>
      <p style="margin-top:8px;font-size:14px;opacity:0.9;">
        Your message has been successfully received.
      </p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td class="padding" style="padding:40px;color:#333333;">

      <p class="mobile-text" style="font-size:16px;margin-top:0;">
        Hi <strong>${name}</strong>,
      </p>

      <p class="mobile-text" style="font-size:15px;line-height:1.6;">
        Thank you for contacting me through my portfolio website.
        I truly appreciate your message and will respond within
        <strong>24–48 hours</strong>.
      </p>

      <!-- Message Box -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:25px;">
        <tr>
          <td style="background:#f4f6fb;padding:18px;border-radius:8px;">
            <p style="margin:0;font-size:13px;color:#666;">Your Message:</p>
            <p style="margin-top:10px;font-size:14px;color:#111;line-height:1.5;">
              ${message.replace(/\n/g, "<br/>")}
            </p>
          </td>
        </tr>
      </table>

      <p style="margin-top:30px;font-size:14px;">
        Best regards,<br>
        <strong>Saksham Wayadande</strong>
      </p>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#f9fafc;padding:18px;text-align:center;font-size:12px;color:#888;">
      © 2026 Saksham Wayadande • Portfolio Website
    </td>
  </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

/**
 * Notification email sent TO the admin when a new message arrives.
 */
const buildAdminEmail = ({ name, email, message }) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Contact Submission</title>

<style>
@media only screen and (max-width: 600px) {
  .container { width: 100% !important; }
  .padding { padding: 20px !important; }
  .mobile-text { font-size: 14px !important; }
}
</style>
</head>

<body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#eef2f7">
<tr>
<td align="center">

<!-- Main Container -->
<table width="600" cellpadding="0" cellspacing="0" class="container"
style="background:#ffffff;margin:40px 0;border-radius:8px;border:1px solid #e5e7eb;">

  <!-- Header -->
  <tr>
    <td style="padding:25px 30px;border-bottom:1px solid #e5e7eb;">
      <h2 style="margin:0;font-size:18px;color:#111827;">
        New Contact Form Submission
      </h2>
      <p style="margin:5px 0 0 0;font-size:12px;color:#6b7280;">
        Portfolio Website Notification
      </p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td class="padding" style="padding:30px;">

      <!-- Information Table -->
      <table width="100%" cellpadding="0" cellspacing="0">

        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f1f1f1;">
            <span style="font-size:12px;color:#6b7280;">Name</span><br>
            <span class="mobile-text" style="font-size:15px;color:#111827;font-weight:500;">
              ${name}
            </span>
          </td>
        </tr>

        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f1f1f1;">
            <span style="font-size:12px;color:#6b7280;">Email</span><br>
            <span class="mobile-text" style="font-size:15px;color:#1d4ed8;font-weight:500;">
              ${email}
            </span>
          </td>
        </tr>

        <tr>
          <td style="padding:18px 0;">
            <span style="font-size:12px;color:#6b7280;">Message</span>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
              <tr>
                <td style="background:#f9fafb;padding:15px;border:1px solid #e5e7eb;border-radius:6px;">
                  <span style="font-size:14px;color:#111827;line-height:1.6;">
                    ${message.replace(/\n/g, "<br/>")}
                  </span>
                </td>
              </tr>
            </table>

          </td>
        </tr>

      </table>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="padding:18px 30px;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;text-align:center;">
      This email was automatically generated from your portfolio contact form.
    </td>
  </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

// ─── Route: Health check ──────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Route: Contact form submission ──────────────────────────────────────────
app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;

  // ── Input validation ────────────────────────────────────────────────────────
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (String(name).trim().length < 2) {
    return res.status(400).json({ error: "Name must be at least 2 characters." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }
  if (String(message).trim().length < 10) {
    return res.status(400).json({ error: "Message must be at least 10 characters." });
  }
  if (String(message).trim().length > 2000) {
    return res.status(400).json({ error: "Message must not exceed 2000 characters." });
  }

  const sanitized = {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    message: String(message).trim(),
  };

  try {
    // 1️⃣  Confirmation email → client
    await transporter.sendMail({
      from: `"Saksham Waydande" <${EMAIL_USER}>`,
      to: sanitized.email,
      replyTo: EMAIL_USER,
      subject: "✅ Got your message — I'll be in touch soon!",
      html: buildClientEmail(sanitized),
    });

    // 2️⃣  Notification email → admin
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      replyTo: sanitized.email, // hitting Reply goes straight to the client
      subject: `📬 New message from ${sanitized.name}`,
      html: buildAdminEmail(sanitized),
    });

    console.log(`[Contact] Email sent — from: ${sanitized.email}, name: ${sanitized.name}`);

    return res.status(200).json({
      success: true,
      message: "Your message has been sent! Check your inbox for a confirmation email.",
    });
  } catch (err) {
    console.error("[Contact] Failed to send email:", err.message);
    return res.status(500).json({
      error: "Failed to send email. Please try again later.",
    });
  }
});

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("[Unhandled Error]", err.message);
  res.status(500).json({ error: "Internal server error." });
});

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
  console.log(`[Server] Accepting requests from: ${FRONTEND_URL}`);
});
