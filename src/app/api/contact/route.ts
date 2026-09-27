import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildContactEmail,
  OWNER_EMAIL,
  parseContactSubmission,
} from "@/lib/contact-email";

const FROM_FALLBACK = "Portfolio <onboarding@resend.dev>";

function fromAddress(): string {
  return process.env.CONTACT_FROM_EMAIL?.trim() || FROM_FALLBACK;
}

function toAddress(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || OWNER_EMAIL;
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  try {
    const parsed = parseContactSubmission(body);

    if (!parsed.ok) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      console.log("Contact form submission (email not sent):", parsed.value);

      return NextResponse.json(
        {
          ok: false,
          error: "Email service not configured. Please contact directly at andypratama1211@gmail.com",
        },
        { status: 503 }
      );
    }

    const { subject, html, text } = buildContactEmail(parsed.value);
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: fromAddress(),
      to: toAddress(),
      replyTo: parsed.value.email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to send email. Please try again or contact directly at andypratama1211@gmail.com",
        },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data);

    return NextResponse.json(
      { ok: true, message: "Message received successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
