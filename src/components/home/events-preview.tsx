"use client";

import Link from "next/link";
import { GlassCard } from "@/components/glass/glass-card";
import { FadeIn } from "@/components/animations/fade-in";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

const events = [
  {
    slug: "hackfoss-2026",
    date: "April 28 — 29, 2026",
    name: "HackFOSS 2026",
    description:
      "24-hour open source hackathon. Build real projects. Win real prizes. Ship real code. 200+ participants, 30+ mentors.",
    featured: true
  },
  {
    slug: "git-workshop",
    date: "May 12, 2026",
    name: "Git & GitHub Workshop",
    description: "From your first fork to your first pull request. Hands-on, beginner friendly.",
    featured: false
  },
  {
    slug: "build-with-ai-2026",
    date: "July 21, 2026",
    name: "Build with AI 2026 – SLIIT Buildathon",
    description: "Build with AI at SLIIT. Registrations open — limited slots available!",
    featured: false
  }
];

export function EventsPreview() {
  return (
    <section className="py-24 md:py-32 px-6 relative">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-[0.65rem] uppercase tracking-[5px] text-indigo-500 font-medium mb-3">
            What&apos;s Next
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-[-2px] mb-12">Events</h2>
        </FadeIn>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <StaggerItem key={event.slug} className={event.featured ? "md:col-span-2" : ""}>
              <Link href={`/events/${event.slug}`}>
                <GlassCard featured={event.featured} className={event.featured ? "p-10" : ""}>
                  {/* Arrow */}
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/4 border border-white/6 flex items-center justify-center text-sm opacity-30 transition-all group-hover:opacity-80">
                    &rarr;
                  </div>

                  <div className="font-heading text-[0.7rem] font-semibold text-indigo-500 uppercase tracking-[2px] mb-3">
                    {event.date}
                  </div>
                  <div
                    className={`font-heading font-semibold tracking-[-0.5px] mb-2 ${
                      event.featured ? "text-2xl md:text-3xl tracking-[-1px]" : "text-xl"
                    }`}
                  >
                    {event.name}
                  </div>
                  <div className="text-[0.85rem] text-white/40 leading-relaxed">{event.description}</div>
                </GlassCard>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.3}>
          <div className="text-center mt-8">
            <Link
              href="/events"
              className="text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
            >
              View all events &rarr;
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
