import "server-only";
import { Resend } from "resend";
import { siteConfig } from "@/content/site";

const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || "SLIIT FOSS <onboarding@resend.dev>";
const toEmail = process.env.RESEND_TO_EMAIL?.trim() || siteConfig.contact.email;

let cachedClient: Resend | null = null;

const getClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  if (!cachedClient) {
    cachedClient = new Resend(apiKey);
  }
  return cachedClient;
};

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderRow = (label: string, value: string) =>
  `<tr><td style="padding:6px 12px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.04em;width:140px;vertical-align:top;">${escape(label)}</td><td style="padding:6px 12px;color:#111;font-size:14px;white-space:pre-wrap;">${escape(value)}</td></tr>`;

const wrap = (title: string, rowsHtml: string) => `
<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#fafafa;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:white;border:1px solid #eee;border-radius:12px;overflow:hidden;">
    <div style="padding:20px 24px;border-bottom:1px solid #eee;">
      <div style="font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.08em;">SLIIT FOSS</div>
      <div style="font-size:18px;font-weight:600;color:#111;margin-top:4px;">${escape(title)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;">${rowsHtml}</table>
  </div>
</div>`;

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

type MembershipPayload = {
  name: string;
  email: string;
  studentId: string;
  year: string;
  github: string;
  portfolio?: string;
  skills: string[];
  reason: string;
};

export const sendContactEmail = async (payload: ContactPayload) => {
  const rows = [
    renderRow("Name", payload.name),
    renderRow("Email", payload.email),
    renderRow("Message", payload.message)
  ].join("");
  const html = wrap("New contact form submission", rows);

  return getClient().emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: payload.email,
    subject: `Contact form — ${payload.name}`,
    html
  });
};

export const sendMembershipEmail = async (payload: MembershipPayload) => {
  const rows = [
    renderRow("Name", payload.name),
    renderRow("Email", payload.email),
    renderRow("Student ID", payload.studentId),
    renderRow("Year", payload.year),
    renderRow("GitHub", payload.github),
    payload.portfolio ? renderRow("Portfolio", payload.portfolio) : "",
    renderRow("Skills", payload.skills.length ? payload.skills.join(", ") : "—"),
    renderRow("Why join", payload.reason)
  ].join("");
  const html = wrap("New membership application", rows);

  return getClient().emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: payload.email,
    subject: `Membership application — ${payload.name}`,
    html
  });
};
