"use client";

import Link from "next/link";
import { events, formatEventDate, eventTypeLabel } from "@/content/events";
import { FadeUp } from "@/components/animations/fade-up";
import { WordAnimate } from "@/components/animations/word-animate";

export function EventsListing() {
  const upcoming = events.filter((e) => e.status === "upcoming");
  const completed = events.filter((e) => e.status === "completed");

  return (
    <>
      {/* Upcoming */}
      <section className="py-12 px-6 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcoming.map((event, i) => (
              <FadeUp key={event.slug} delay={i * 0.08}>
                <Link href={`/events/${event.slug}`} className="group block h-full">
                  <div className={`h-full ${event.color.bg} rounded-2xl border border-black/[0.04] p-8 flex flex-col justify-between transition-all duration-300 ${event.color.borderHover} hover:shadow-lg min-h-[240px]`}>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`font-mono text-[0.65rem] ${event.color.accent} uppercase tracking-wider font-medium`}>
                          {eventTypeLabel(event.type)}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-black/15" />
                        <span className="font-mono text-[0.65rem] text-[#999]">
                          {formatEventDate(event.date, event.endDate)}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl md:text-2xl font-bold tracking-[-1px] text-[#111] mb-2">
                        {event.name}
                      </h3>
                      <p className="text-sm text-[#666] leading-relaxed">
                        {event.shortDescription}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-xs text-[#999]">{event.venue}</span>
                      <span className={`text-xs ${event.color.accent} opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                        View details →
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      {completed.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <WordAnimate className="font-heading text-2xl md:text-3xl font-bold tracking-[-2px] uppercase text-[#111] mb-8">
              Past Events
            </WordAnimate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completed.map((event, i) => (
                <FadeUp key={event.slug} delay={i * 0.08}>
                  <Link href={`/events/${event.slug}`} className="group block">
                    <div className="rounded-2xl border border-black/[0.04] bg-[#fafafa] p-6 transition-all hover:border-black/[0.08] hover:shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[0.6rem] text-[#999] uppercase tracking-wider">
                          {eventTypeLabel(event.type)}
                        </span>
                        <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-black/[0.04] text-[#999]">
                          Completed
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-[#111] mb-1">
                        {event.name}
                      </h3>
                      <p className="text-xs text-[#999]">
                        {formatEventDate(event.date)} · {event.venue}
                      </p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
