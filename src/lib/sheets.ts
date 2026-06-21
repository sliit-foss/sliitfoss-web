import "server-only";
import type { MembershipInput } from "@/lib/mail/schemas";

export async function appendMembershipRow(data: MembershipInput): Promise<{ error?: string }> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    console.error("SHEETS_WEBHOOK_URL is not set — membership submission was not stored.");
    return { error: "not_configured" };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: process.env.SHEETS_WEBHOOK_TOKEN ?? "",
      submittedAt: new Date().toISOString(),
      ...data,
      teams: data.teams.join(", ")
    }),
    redirect: "follow",
    cache: "no-store"
  });

  if (!res.ok) {
    return { error: `sheet_error_${res.status}` };
  }
  return {};
}
