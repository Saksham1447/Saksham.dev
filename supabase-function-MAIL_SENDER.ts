// Supabase Edge Function — deploy as: supabase/functions/mail-sender/index.ts
// Uses Resend (https://resend.com) for sending emails.
// Set these secrets in your Supabase project:
//   supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx
//   supabase secrets set OWNER_EMAIL=your@email.com

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const OWNER_EMAIL   = Deno.env.get("OWNER_EMAIL")!;     // your email
const FROM_EMAIL    = "Portfolio Contact <onboarding@resend.dev>"; // change after domain verified

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",           // tighten to your domain in production
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "name, email and message are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── 1. Notify the portfolio owner ────────────────────────────────────────
    await sendEmail({
      to: OWNER_EMAIL,
      subject: `New contact message from ${name}`,
      html: `
        <h2>New message from your portfolio contact form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left:3px solid #6366f1;padding-left:12px;color:#555">
          ${message.replace(/\n/g, "<br/>")}
        </blockquote>
      `,
    });

    // ── 2. Send confirmation to the visitor ──────────────────────────────────
    await sendEmail({
      to: email,
      subject: "Got your message! I'll get back to you soon.",
      html: `
        <h2>Hi ${name}, thanks for reaching out!</h2>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <hr/>
        <p style="color:#888;font-size:14px">Your message:</p>
        <blockquote style="border-left:3px solid #6366f1;padding-left:12px;color:#555">
          ${message.replace(/\n/g, "<br/>")}
        </blockquote>
        <p>— Saksham</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// ── Helper ────────────────────────────────────────────────────────────────────
async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend error: ${res.status} — ${body}`);
  }
}
