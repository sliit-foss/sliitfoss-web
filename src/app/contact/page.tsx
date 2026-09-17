import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Get in Touch",
  description: "Have a question, want to collaborate, or just want to say hi? We'd love to hear from you."
};

export default function ContactPage() {
  return (
    <>
      <PageHeader label="Say Hello" title={metadata.title as string} subtitle={metadata.description as string} />
      <ContactForm />
    </>
  );
}
