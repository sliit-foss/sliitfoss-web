"use client";

import Image from "next/image";
import Link from "next/link";
import { Event, formatEventDate, eventTypeLabel } from "@/content/events";
import { WordAnimate } from "@/components/animations/word-animate";
import { FadeUp } from "@/components/animations/fade-up";

export function EventDetail({ event }: { event: Event }) {
  return (
    <>
      {/* Hero */}
      <section className={`pt-32 pb-16 md:pt-40 md:pb-20 px-6 ${event.color.bg}`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className={`font-mono text-xs ${event.color.accent} uppercase tracking-wider font-medium`}>
              {eventTypeLabel(event.type)}
            </span>
            <span className="w-1 h-1 rounded-full bg-black/20" />
            <span className="font-mono text-xs text-[#999]">{formatEventDate(event.date, event.endDate)}</span>
            {event.status === "completed" && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/6 text-[#999]">Completed</span>
            )}
          </div>
          <WordAnimate className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-3px] leading-[0.95] uppercase text-[#111]">
            {event.name}
          </WordAnimate>
          <FadeUp delay={0.3}>
            <p className="mt-4 text-sm text-[#777]">{event.venue}</p>
          </FadeUp>
          {event.banner && (
            <FadeUp delay={0.4}>
              <div className="mt-8 rounded-2xl overflow-hidden border border-black/6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <Image
                  src={event.banner}
                  alt={`${event.name} banner`}
                  width={1200}
                  height={630}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <p className="text-base text-[#555] leading-relaxed mb-12">{event.description}</p>
          </FadeUp>

          {/* Speakers */}
          {event.speakers.length > 0 && (
            <FadeUp delay={0.1}>
              <h3 className="font-heading text-xl font-semibold text-[#111] mb-4">
                {event.type === "hackathon" ? "Organizers & Mentors" : "Speakers"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
                {event.speakers.map((speaker) => (
                  <div key={speaker.name} className="p-4 rounded-xl border border-black/4 bg-[#fafafa]">
                    <div className="font-medium text-sm text-[#111]">{speaker.name}</div>
                    <div className="text-xs text-[#999]">{speaker.role}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          )}

          {/* Schedule */}
          {event.schedule.length > 0 && (
            <FadeUp delay={0.2}>
              <h3 className="font-heading text-xl font-semibold text-[#111] mb-4">Schedule</h3>
              <div className="space-y-0 mb-12">
                {event.schedule.map((item, i) => (
                  <div key={i} className="flex gap-4 py-3 border-b border-black/4 last:border-0">
                    <span className="font-mono text-sm text-[#999] shrink-0 w-14">{item.time}</span>
                    <span className="text-sm text-[#555]">{item.title}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          )}

          {/* Registration CTA */}
          {event.status === "upcoming" && event.registrationUrl && (
            <FadeUp delay={0.3}>
              <div className="text-center py-8">
                <Link
                  href={event.registrationUrl}
                  target="_blank"
                  className="inline-block px-8 py-3.5 rounded-xl bg-[#111] text-white text-sm font-semibold transition-all hover:shadow-lg"
                >
                  Register Now
                </Link>
              </div>
            </FadeUp>
          )}

          <FadeUp delay={0.3}>
            <div className="text-center pt-8 border-t border-black/4">
              <Link href="/events" className="text-sm text-[#999] hover:underline">
                ← Back to all events
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
