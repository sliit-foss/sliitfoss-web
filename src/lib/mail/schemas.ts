import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(4000)
});

export const membershipSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  studentId: z.string().trim().min(1, "Student ID is required").max(40),
  year: z.string().trim().min(1, "Year is required"),
  github: z
    .string()
    .trim()
    .min(1, "GitHub username is required")
    .max(80)
    .regex(/^[A-Za-z0-9-]+$/, "GitHub username can only contain letters, numbers, and hyphens"),
  portfolio: z.union([z.literal(""), z.string().trim().url("Portfolio must be a valid URL")]).optional(),
  skills: z.array(z.string().trim()).max(40).default([]),
  reason: z.string().trim().min(20, "Tell us a bit more (at least 20 characters)").max(4000)
});

export type ContactInput = z.infer<typeof contactSchema>;
export type MembershipInput = z.infer<typeof membershipSchema>;

export type FormState =
  | { ok: true; message: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; formError?: string }
  | { ok: null };

export const initialFormState: FormState = { ok: null };
