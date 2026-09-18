import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { EventsListing } from "./events-listing";

export const metadata: Metadata = {
  title: "Events",
  description: "Hackathons, workshops, tech talks, and meetups — there's always something happening at SLIIT FOSS."
};

export default function EventsPage() {
  return (
    <>
      <PageHeader label="What's Happening" title={metadata.title as string} subtitle={metadata.description as string} />
      <EventsListing />
    </>
  );
}
