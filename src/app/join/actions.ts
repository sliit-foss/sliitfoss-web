"use server";

import { membershipSchema, type FormState } from "@/lib/mail/schemas";
import { appendMembershipRow } from "@/lib/sheets";

export async function submitMembership(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = membershipSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    studentId: formData.get("studentId"),
    year: formData.get("year"),
    whatsapp: formData.get("whatsapp"),
    github: formData.get("github"),
    linkedin: formData.get("linkedin") ?? "",
    website: formData.get("website") ?? "",
    employment: formData.get("employment") ?? "",
    teams: formData.getAll("teams").map(String),
    note: formData.get("note") ?? ""
  });

  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    const result = await appendMembershipRow(parsed.data);
    if (result.error) {
      return { ok: false, formError: "We couldn't submit your application. Please try again later." };
    }
    return {
      ok: true,
      message: "You're on the list — welcome aboard! Join the volunteer WhatsApp group below and we'll be in touch."
    };
  } catch {
    return { ok: false, formError: "We couldn't submit your application. Please try again later." };
  }
}
