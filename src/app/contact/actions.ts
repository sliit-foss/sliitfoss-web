"use server";

import { contactSchema, type FormState } from "@/lib/mail/schemas";
import { sendContactEmail } from "@/lib/mail/resend";

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    const result = await sendContactEmail(parsed.data);
    if (result.error) {
      return { ok: false, formError: "We could not send your message. Please try again later." };
    }
    return { ok: true, message: "Thanks for reaching out — we'll get back to you soon." };
  } catch {
    return { ok: false, formError: "We could not send your message. Please try again later." };
  }
}
