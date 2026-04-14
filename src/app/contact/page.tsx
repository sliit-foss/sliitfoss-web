import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Say Hello"
        title="Get in Touch"
        subtitle="Have a question, want to collaborate, or just want to say hi? We'd love to hear from you."
      />
      <ContactForm />
    </>
  );
}
