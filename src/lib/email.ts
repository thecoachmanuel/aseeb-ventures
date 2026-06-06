const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_ADDRESS = process.env.EMAIL_FROM || "noreply@aseeb-ventures.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@aseeb-ventures.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  if (!RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping email send");
    return { success: false, reason: "no_api_key" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Aseeb Ventures <${FROM_ADDRESS}>`,
      to,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    console.error("[email] Resend API error:", err);
    return { success: false, error: err };
  }

  return { success: true, data: await res.json() };
}

export function sendContactNotification({
  name,
  email,
  phone,
  company,
  message,
  service,
}: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  service?: string;
}) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #009050;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
        ${phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>` : ""}
        ${company ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Company</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${company}</td></tr>` : ""}
        ${service ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Service</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${service}</td></tr>` : ""}
      </table>
      <div style="margin-top: 16px; padding: 16px; background: #f9f9f9; border-radius: 8px;">
        <p style="font-weight: bold; margin: 0 0 8px;">Message:</p>
        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
      </div>
      <p style="margin-top: 24px; color: #666; font-size: 12px;">Sent from Aseeb Ventures Contact Form</p>
    </div>
  `;

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `New Contact: ${name} — ${service || "General Inquiry"}`,
    html,
    replyTo: email,
  });
}

export function sendNewsletterWelcome({
  firstName,
  email,
}: {
  firstName: string;
  email: string;
}) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #009050;">Welcome to Aseeb Ventures!</h1>
      </div>
      <p>Hi ${firstName},</p>
      <p>Thank you for subscribing to the Aseeb Ventures newsletter. You'll now receive the latest updates on:</p>
      <ul>
        <li>Agricultural testing and laboratory services</li>
        <li>Agronomy tips and best practices</li>
        <li>Training opportunities and events</li>
        <li>Case studies and success stories</li>
      </ul>
      <p>If you have any questions, feel free to reach out to us.</p>
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>Aseeb Ventures — Growing More With Less</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to the Aseeb Ventures Newsletter!",
    html,
  });
}

export function sendWelcomeEmail({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #009050;">Welcome to Aseeb Ventures, ${name}!</h1>
      </div>
      <p>Your account has been created successfully. You can now:</p>
      <ul>
        <li>View your laboratory test results</li>
        <li>Submit samples for testing</li>
        <li>Access agronomy recommendations</li>
        <li>Manage your account settings</li>
      </ul>
      <p>
        <a href="${SITE_URL}/dashboard" style="display: inline-block; background: #009050; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
          Go to Dashboard
        </a>
      </p>
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>Aseeb Ventures — Growing More With Less</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to Aseeb Ventures!",
    html,
  });
}

export function sendPasswordResetEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const resetUrl = `${SITE_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #009050;">Reset Your Password</h1>
      </div>
      <p>We received a request to reset your password for your Aseeb Ventures account.</p>
      <p>Click the button below to create a new password. This link will expire in 1 hour.</p>
      <p style="text-align: center; margin: 24px 0;">
        <a href="${resetUrl}" style="display: inline-block; background: #009050; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
          Reset Password
        </a>
      </p>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>Aseeb Ventures</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Reset your Aseeb Ventures password",
    html,
  });
}
