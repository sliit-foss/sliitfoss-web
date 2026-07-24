import { z } from "zod";

import buildWithAi2026 from "@/data/events/build-with-ai-2026.json";
import docker101 from "@/data/events/docker-101.json";
import gitWorkshop from "@/data/events/git-workshop.json";
import hackfoss2026 from "@/data/events/hackfoss-2026.json";

const speakerSchema = z.strictObject({
  name: z.string().min(1),
  role: z.string().min(1)
});

const scheduleItemSchema = z.strictObject({
  time: z.string().min(1),
  title: z.string().min(1)
});

const eventSchema = z.strictObject({
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase, digits and dashes only"),
  name: z.string().min(1),
  date: z.iso.date(),
  endDate: z.iso.date().optional(),
  type: z.enum(["hackathon", "workshop", "tech-talk", "meetup"]),
  description: z.string().min(1),
  shortDescription: z.string().min(1),
  venue: z.string().min(1),
  speakers: z.array(speakerSchema),
  schedule: z.array(scheduleItemSchema),
  registrationUrl: z.string().url().optional(),
  banner: z.string().startsWith("/", "Banner must be a path under public/").optional(),
  status: z.enum(["upcoming", "completed", "cancelled"]),
  color: z.strictObject({
    bg: z.string().min(1),
    accent: z.string().min(1),
    borderHover: z.string().min(1),
    shape: z.string().min(1)
  })
});

export type Speaker = z.infer<typeof speakerSchema>;
export type ScheduleItem = z.infer<typeof scheduleItemSchema>;
export type Event = z.infer<typeof eventSchema>;

/**
 * Event data lives in `src/data/events/<slug>.json`, that folder is the source of truth.
 * To add an event: create the JSON file, then import and register it below.
 * Order here is the order events render in.
 */
const eventSources: unknown[] = [hackfoss2026, gitWorkshop, buildWithAi2026, docker101];

export const events: Event[] = eventSources.map((source, index) => {
  const parsed = eventSchema.safeParse(source);
  if (!parsed.success) {
    throw new Error(`Invalid event data at src/data/events (entry ${index}): ${z.prettifyError(parsed.error)}`);
  }
  return parsed.data;
});

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

function getEventEndDate(event: Event): Date {
  return new Date(event.endDate ?? event.date);
}

export function getUpcomingEvents() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return events.filter((event) => {
    if (event.status !== "upcoming") return false;

    const eventEnd = getEventEndDate(event);
    eventEnd.setHours(23, 59, 59, 999);

    return eventEnd >= today;
  });
}

export function getCompletedEvents() {
  return events.filter((e) => e.status === "completed");
}

export function formatEventDate(date: string, endDate?: string) {
  const d = new Date(date);
  const opts: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
  if (endDate) {
    const end = new Date(endDate);
    return `${d.toLocaleDateString("en-US", { month: "long", day: "numeric" })} — ${end.toLocaleDateString("en-US", opts)}`;
  }
  return d.toLocaleDateString("en-US", opts);
}

export function eventTypeLabel(type: Event["type"]) {
  const labels: Record<Event["type"], string> = {
    "hackathon": "Hackathon",
    "workshop": "Workshop",
    "tech-talk": "Tech Talk",
    "meetup": "Meetup"
  };
  return labels[type];
}
