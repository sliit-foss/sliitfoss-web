import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { JoinForm } from "./join-form";

export const metadata: Metadata = {
  title: "Become a Member",
  description:
    "Fill out the form below and we'll get you onboarded. All skill levels welcome — the only requirement is curiosity."
};

export default function JoinPage() {
  return (
    <>
      <PageHeader
        label="Join the Community"
        title={metadata.title as string}
        subtitle={metadata.description as string}
      />
      <JoinForm />
    </>
  );
}
