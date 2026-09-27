/**
 * Contact form notification email.
 *
 * Design read: transactional notice for one recipient (Andy), in the same warm
 * editorial-paper language as the site. Dials ENERGY 1 / RHYTHM 1 / MOTION 1
 * (a static, single-column reading surface: no motion, one column, one focal point).
 *
 * Tokens are copied from src/resources/custom.css :root. They cannot be CSS
 * variables here, since email clients strip them. Palette: warm neutrals (not
 * counted as core colors) plus one accent, the site blue #1D4ED8, used only for
 * the reply action and the sender address so the eye finds the one next step.
 *
 * Layout is table-based with inline styles: the only reliable markup for Gmail,
 * Outlook and Apple Mail. The `<style>` block handles two things no client lets
 * you inline: hiding the inbox preheader, and tightening padding under 480px.
 */

const C = {
  page: "#F3F1EA",
  surface: "#FFFDF8",
  subtle: "#E8E5DC",
  ink: "#1A1814",
  secondary: "#4F4B44",
  muted: "#6F6B64",
  border: "#D4D0C6",
  accent: "#1D4ED8",
} as const;

/* Geist is not installed on the recipient's machine, so the stack falls back to
   the platform UI font, which is what the reader is used to reading in. */
const FONT = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;

export const OWNER_EMAIL = "andypratama1211@gmail.com";

const SITE_URL = "https://andypratama.vercel.app";
const OWNER_TIME_ZONE = "Asia/Jakarta";

const LIMITS = {
  name: 120,
  email: 254,
  message: 5000,
  availability: 200,
  engagement: 40,
  engagementCount: 12,
} as const;

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  engagementTypes: string[];
  availability: string;
  subscribe: boolean;
  receivedAt: Date;
};

export type ContactEmail = {
  subject: string;
  preheader: string;
  html: string;
  text: string;
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function asString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function asText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

/* Deliberately narrow: a permissive pattern would let a quote or angle bracket
   through into the mailto attribute, since the address is interpolated there. */
const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export function parseContactSubmission(
  body: unknown
): { ok: true; value: ContactSubmission } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body." };
  }

  const input = body as Record<string, unknown>;
  const email = asString(input.email, LIMITS.email).toLowerCase();
  const message = asText(input.message, LIMITS.message);
  const engagementTypes = Array.isArray(input.engagementTypes)
    ? input.engagementTypes
        .map((item) => asString(item, LIMITS.engagement))
        .filter((item) => item.length > 0)
        .slice(0, LIMITS.engagementCount)
    : [];

  if (!email && !message) {
    return { ok: false, error: "Email and message are required." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "That email address does not look right." };
  }
  if (!message) {
    return { ok: false, error: "Message is required." };
  }

  return {
    ok: true,
    value: {
      name: asString(input.name, LIMITS.name),
      email,
      message,
      engagementTypes,
      availability: asText(input.availability, LIMITS.availability),
      subscribe: input.subscribe === true,
      receivedAt: new Date(),
    },
  };
}

function formatReceivedAt(date: Date): string {
  return `${new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: OWNER_TIME_ZONE,
  }).format(date)} (Jakarta, UTC+7)`;
}

function row(label: string, value: string): string {
  return `<tr>
  <td style="padding:8px 16px 8px 0;vertical-align:top;font-family:${FONT};font-size:13px;line-height:1.5;color:${C.muted};white-space:nowrap;">${label}</td>
  <td style="padding:8px 0;vertical-align:top;font-family:${FONT};font-size:14px;line-height:1.5;color:${C.ink};">${escapeHtml(value)}</td>
</tr>`;
}

function buildHtml(submission: ContactSubmission, preheader: string): string {
  const { name, email, message, engagementTypes, availability, subscribe, receivedAt } = submission;
  const senderName = name.length > 0 ? name : "Anonymous";
  const replyHref = `mailto:${escapeHtml(email)}?subject=${encodeURIComponent(
    `Re: Portfolio message from ${senderName}`
  )}`;

  /* Only the fields that carry real information get a row. The earlier version
     printed "Not specified" four times, which buried the message. */
  const details: string[] = [];
  if (engagementTypes.length > 0) {
    details.push(row("Engagement", engagementTypes.join(", ")));
  }
  if (availability.length > 0) {
    details.push(row("Availability", availability));
  }
  if (subscribe) {
    details.push(row("Newsletter", "Wants project updates"));
  }

  const messageHtml = escapeHtml(message).replace(/\r\n|\r|\n/g, "<br />");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>Portfolio message from ${escapeHtml(senderName)}</title>
<style>
  @media only screen and (max-width:480px) {
    .wrap { padding: 16px 10px !important; }
    .pad { padding-left: 20px !important; padding-right: 20px !important; }
    .stack { display: block !important; width: 100% !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.page};">
<tr>
<td class="wrap" align="center" style="padding:40px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="stack" style="width:100%;max-width:600px;">

    <tr>
      <td style="background-color:${C.surface};border:1px solid ${C.border};border-radius:10px;padding:0;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td class="pad" style="padding:26px 30px 22px;border-bottom:1px solid ${C.border};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="stack" style="font-family:${FONT};font-size:12px;line-height:1.4;color:${C.muted};padding-bottom:2px;">Portfolio contact form</td>
                  <td class="stack" align="right" style="font-family:${FONT};font-size:12px;line-height:1.4;color:${C.muted};">${escapeHtml(formatReceivedAt(receivedAt))}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="pad" style="padding:26px 30px 0;">
              <div style="font-family:${FONT};font-size:12px;line-height:1.4;color:${C.muted};padding-bottom:6px;">From</div>
              <div style="font-family:${FONT};font-size:20px;line-height:1.3;font-weight:600;color:${C.ink};word-break:break-word;">${escapeHtml(senderName)}</div>
              <div style="font-family:${FONT};font-size:14px;line-height:1.5;padding-top:4px;word-break:break-word;">
                <a href="mailto:${escapeHtml(email)}" style="color:${C.accent};text-decoration:underline;">${escapeHtml(email)}</a>
              </div>
            </td>
          </tr>

          <tr>
            <td class="pad" style="padding:22px 30px 0;">
              <div style="font-family:${FONT};font-size:12px;line-height:1.4;color:${C.muted};padding-bottom:8px;">Message</div>
              <div style="background-color:${C.page};border:1px solid ${C.border};border-radius:8px;padding:16px 18px;font-family:${FONT};font-size:16px;line-height:1.6;color:${C.ink};word-break:break-word;">${messageHtml}</div>
            </td>
          </tr>
          ${
            details.length > 0
              ? `<tr>
          <td class="pad" style="padding:22px 30px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${details.join("")}</table>
          </td>
        </tr>`
              : ""
          }

          <tr>
            <td class="pad" style="padding:26px 30px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="${C.accent}" style="border-radius:8px;">
                    <a href="${replyHref}" style="display:inline-block;padding:13px 22px;font-family:${FONT};font-size:15px;font-weight:600;line-height:1.2;color:#FFFFFF;text-decoration:none;border-radius:8px;">Reply to ${escapeHtml(senderName)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>

    <tr>
      <td class="pad" style="padding:16px 30px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.muted};">
        Replying to this email answers ${escapeHtml(senderName)} directly. Sent from <a href="${SITE_URL}" style="color:${C.muted};text-decoration:underline;">${SITE_URL.replace("https://", "")}</a>.
      </td>
    </tr>

  </table>
</td>
</tr>
</table>
</body>
</html>`;
}

function buildText(submission: ContactSubmission): string {
  const { name, email, message, engagementTypes, availability, subscribe, receivedAt } = submission;
  const senderName = name.length > 0 ? name : "Anonymous";
  const lines = [
    "PORTFOLIO MESSAGE",
    `Received: ${formatReceivedAt(receivedAt)}`,
    "",
    `From: ${senderName}`,
    `Email: ${email}`,
    "",
    "MESSAGE",
    message,
  ];

  if (engagementTypes.length > 0) {
    lines.push("", `Engagement: ${engagementTypes.join(", ")}`);
  }
  if (availability.length > 0) {
    lines.push(`Availability: ${availability}`);
  }
  if (subscribe) {
    lines.push("Newsletter: wants project updates");
  }

  lines.push(
    "",
    `Reply to this email to answer ${senderName}.`,
    `Sent from ${SITE_URL}`
  );

  return lines.join("\n");
}

export function buildContactEmail(submission: ContactSubmission): ContactEmail {
  const senderName = submission.name.length > 0 ? submission.name : "Anonymous";
  const preview = submission.message.replace(/\s+/g, " ").trim();

  return {
    subject: `Portfolio message from ${senderName}`.slice(0, 120),
    preheader: `${senderName} wrote: ${preview.slice(0, 120)}`.trim(),
    html: buildHtml(submission, `${senderName} wrote: ${preview.slice(0, 120)}`.trim()),
    text: buildText(submission),
  };
}
