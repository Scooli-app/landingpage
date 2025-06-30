// @ts-nocheck
// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/x/supabase_functions@1.0.3/mod.ts";
import { generateWelcomeEmail } from "../_shared/emailTemplate.ts";

interface Payload {
  to: string;
  name?: string;
  subject?: string;
}

/**
 * Edge Function: send-email
 *
 * This function can be invoked from the client without authentication.
 * It expects a JSON payload with at minimum the "to" field (recipient email).
 * Optionally, the payload can include a "name" (for the email greeting) and
 * "subject" to override the default subject line.
 *
 * Environment variables required (set in Supabase dashboard > Project Settings > Secrets):
 *  - SENDGRID_API_KEY  : Your SendGrid API key
 *  - SENDGRID_FROM_EMAIL : The verified sender email address in SendGrid
 */

serve(async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
  const FROM_EMAIL = Deno.env.get("SENDGRID_FROM_EMAIL");

  if (!SENDGRID_API_KEY || !FROM_EMAIL) {
    return new Response(
      JSON.stringify({ error: "Email service is not configured properly." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  let payload: Payload;
  try {
    payload = await req.json();
  } catch (_) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON payload" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!payload?.to) {
    return new Response(
      JSON.stringify({ error: "Missing 'to' field in request body." }),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const name = payload.name ?? "";
  const subject = payload.subject ?? "Welcome to Our Service";
  const htmlContent = generateWelcomeEmail(name);

  // Construct SendGrid request body as per v3 /mail/send endpoint
  const sgBody = {
    personalizations: [
      {
        to: [{ email: payload.to }],
        subject,
      },
    ],
    from: { email: FROM_EMAIL },
    content: [
      {
        type: "text/html",
        value: htmlContent,
      },
    ],
  };

  const sgResp = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sgBody),
  });

  if (!sgResp.ok) {
    const errorText = await sgResp.text();
    return new Response(
      JSON.stringify({ error: "Failed to send email", details: errorText }),
      {
        status: sgResp.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});