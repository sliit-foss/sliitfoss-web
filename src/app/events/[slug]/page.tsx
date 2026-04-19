import { notFound } from "next/navigation";
import { events, getEventBySlug } from "@/content/events";
import { EventDetail } from "./event-detail";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();
  return <EventDetail event={event} />;
}
