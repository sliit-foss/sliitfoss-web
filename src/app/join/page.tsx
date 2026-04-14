import { PageHeader } from "@/components/layout/page-header";
import { JoinForm } from "./join-form";

export default function JoinPage() {
  return (
    <>
      <PageHeader
        label="Join the Community"
        title="Become a Member"
        subtitle="Fill out the form below and we'll get you onboarded. All skill levels welcome — the only requirement is curiosity."
      />
      <JoinForm />
    </>
  );
}
