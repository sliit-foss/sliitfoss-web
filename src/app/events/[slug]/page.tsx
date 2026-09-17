import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { events, getEventBySlug } from "@/content/events";
import { EventDetail } from "./event-detail";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  return event ? { title: event.name, description: event.shortDescription } : {};
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();
  return <EventDetail event={event} />;
}
