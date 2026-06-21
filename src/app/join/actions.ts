"use server";

import { membershipSchema, type FormState } from "@/lib/mail/schemas";
import { sendMembershipEmail } from "@/lib/mail/resend";

export async function submitMembership(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = membershipSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    studentId: formData.get("studentId"),
    year: formData.get("year"),
    github: formData.get("github"),
    portfolio: formData.get("portfolio") ?? "",
    skills: formData.getAll("skills").map(String),
    reason: formData.get("reason")
  });

  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    const result = await sendMembershipEmail(parsed.data);
    if (result.error) {
      return { ok: false, formError: "We could not submit your application. Please try again later." };
    }
    return { ok: true, message: "Welcome aboard — we'll reach out via email with next steps." };
  } catch {
    return { ok: false, formError: "We could not submit your application. Please try again later." };
  }
}
