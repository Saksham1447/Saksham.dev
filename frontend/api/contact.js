import nodemailer from "nodemailer";

// ─── Validation helpers ───────────────────────────────────────────────────────
const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function validate(body) {
  const errors = [];
  if (!body.name || body.name.trim().length < 2)
    errors.push("Name must be at least 2 characters.");
  if (!body.email || !validateEmail(body.email))
    errors.push("A valid email address is required.");
  if (!body.message || body.message.trim().length < 10)
    errors.push("Message must be at least 10 characters.");
  if (body.message && body.message.trim().length > 2000)
    errors.push("Message must not exceed 2000 characters.");
  return errors;
}

// ─── Rate limiting (in-memory, per serverless instance) ───────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Check env
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("EMAIL_USER or EMAIL_PASS is not set");
    return res.status(500).json({ error: "Email service is not configured." });
  }

  // Rate limit
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  // Validate
  const { name, email, message } = req.body || {};
  const validationErrors = validate({ name, email, message });
  if (validationErrors.length > 0) {
    return res.status(400).json({ error: validationErrors.join(" ") });
  }

  // Create SMTP transporter (Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  try {
    // 1) Notification email to you
    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      replyTo: email.trim(),
      subject: `New Contact Form Message from ${name.trim()}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a5f, #2563eb); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 80px;">Name</td>
                <td style="padding: 10px 0; color: #111827; font-size: 15px; font-weight: 500;">${name.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Email</td>
                <td style="padding: 10px 0; color: #111827; font-size: 15px;">
                  <a href="mailto:${email.trim()}" style="color: #2563eb;">${email.trim()}</a>
                </td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">Message</p>
            <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
              <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message.trim()}</p>
            </div>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
              Sent from your portfolio contact form &middot; ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
            </p>
          </div>
        </div>
      `,
    });

    // 2) Confirmation email to the sender
    await transporter.sendMail({
      from: `Saksham Wayadande <${process.env.EMAIL_USER}>`,
      to: email.trim(),
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a5f, #2563eb); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 22px;">Thanks for reaching out!</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="color: #374151; font-size: 15px; line-height: 1.7;">
              Hi <strong>${name.trim()}</strong>,
            </p>
            <p style="color: #374151; font-size: 15px; line-height: 1.7;">
              Thank you for your message! I've received it and will get back to you within
              <strong>24&ndash;48 hours</strong>.
            </p>
            <p style="color: #374151; font-size: 15px; line-height: 1.7;">
              In the meantime, feel free to check out my latest work on my portfolio.
            </p>
            <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
              Best regards,<br />
              <strong>Saksham Wayadande</strong>
            </p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ message: "Message sent successfully! Check your inbox for a confirmation." });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
}
