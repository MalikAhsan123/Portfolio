"use server";

import { Resend } from "resend";

export type ContactFormResult = {
  success: boolean;
  message: string;
};

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeEnvValue(value: string | undefined, fallback: string) {
  return (value ?? fallback).trim().replace(/^["']|["']$/g, "");
}

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  message: string;
}): Promise<ContactFormResult> {
  const name = formData.name?.trim();
  const email = formData.email?.trim();
  const message = formData.message?.trim();

  if (!name || !email || !message) {
    return { success: false, message: "Please fill in all fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  if (message.length < 10) {
    return { success: false, message: "Message must be at least 10 characters." };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey || apiKey === "re_your_api_key_here") {
    return {
      success: false,
      message:
        "Email service is not configured. Add RESEND_API_KEY to .env.local for local dev, or to your hosting provider's Production environment variables and redeploy.",
    };
  }

  const toEmail = normalizeEnvValue(
    process.env.CONTACT_EMAIL,
    "ahsanraza2408@gmail.com",
  );
  const fromEmail = normalizeEnvValue(
    process.env.RESEND_FROM_EMAIL,
    "onboarding@resend.dev",
  );

  if (!emailRegex.test(fromEmail)) {
    return {
      success: false,
      message:
        "Invalid sender email configured. Set RESEND_FROM_EMAIL to a valid address like onboarding@resend.dev",
    };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio: New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #111; margin-bottom: 16px;">New portfolio contact</h2>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
          <p style="background: #f4f4f5; padding: 16px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
          <p style="margin-top: 24px; font-size: 12px; color: #71717a;">Sent from your portfolio contact form</p>
        </div>
      `,
    });

    if (error) {
      return {
        success: false,
        message: error.message || "Failed to send email. Please try again.",
      };
    }

    return { success: true, message: "Message sent successfully!" };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please email me directly.",
    };
  }
}
