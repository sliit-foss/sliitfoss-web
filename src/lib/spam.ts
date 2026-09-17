import { headers } from "next/headers";

export const HONEYPOT_FIELD = "nickname";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// ponytail: per-instance memory; move to Vercel KV or BotID if abuse persists across instances
const hits = new Map<string, number[]>();

export async function isSpam(formData: FormData): Promise<boolean> {
  if (formData.get(HONEYPOT_FIELD)) return true;

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}
