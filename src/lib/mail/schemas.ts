import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(4000)
});

export const membershipSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  studentId: z.string().trim().min(1, "Student number is required").max(40),
  year: z.string().trim().min(1, "Year of study is required"),
  whatsapp: z
    .string()
    .trim()
    .min(7, "Enter a valid contact number")
    .max(30)
    .regex(/^[+0-9 ()-]+$/, "Use only digits, spaces, +, - or ()"),
  github: z
    .string()
    .trim()
    .url("Enter a valid GitHub link")
    .max(200)
    .refine((value) => /github\.com/i.test(value), "Enter a link to your GitHub profile"),
  linkedin: z.union([z.literal(""), z.string().trim().url("Enter a valid LinkedIn link")]).optional(),
  website: z.union([z.literal(""), z.string().trim().url("Enter a valid URL")]).optional(),
  employment: z.string().trim().max(200).optional(),
  teams: z.array(z.string().trim()).min(1, "Pick at least one team").max(3),
  note: z.string().trim().max(2000).optional()
});

export type ContactInput = z.infer<typeof contactSchema>;
export type MembershipInput = z.infer<typeof membershipSchema>;

export type FormState =
  | { ok: true; message: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; formError?: string }
  | { ok: null };

export const initialFormState: FormState = { ok: null };
