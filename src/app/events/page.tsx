import { PageHeader } from "@/components/layout/page-header";
import { EventsListing } from "./events-listing";

export default function EventsPage() {
  return (
    <>
      <PageHeader
        label="What's Happening"
        title="Events"
        subtitle="Hackathons, workshops, tech talks, and meetups — there's always something happening at SLIIT FOSS."
      />
      <EventsListing />
    </>
  );
}
