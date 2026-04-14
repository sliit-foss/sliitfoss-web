"use client";

import Link from "next/link";
import { StackCards } from "@/components/animations/stack-cards";
import { WordAnimate } from "@/components/animations/word-animate";
import { getUpcomingEvents, formatEventDate, eventTypeLabel } from "@/content/events";

const events = getUpcomingEvents().slice(0, 3);

export function EventsStack() {
  return (
    <section className="py-20 md:py-32 px-6 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 md:mb-24">
          <div className="font-mono text-[0.65rem] text-[#999] uppercase tracking-wider mb-4">
            What&apos;s Next
          </div>
          <WordAnimate className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-3px] leading-[0.95] uppercase text-[#111]">
            Upcoming Events
          </WordAnimate>
        </div>

        <StackCards>
          {events.map((event) => (
            <Link key={event.slug} href={`/events/${event.slug}`}>
              <div
                className={`relative rounded-3xl overflow-hidden ${event.color.bg} border border-black/[0.06] min-h-[50vh] md:min-h-[60vh] p-8 md:p-12 flex flex-col justify-between group cursor-pointer transition-all duration-500 ${event.color.borderHover} hover:shadow-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)]`}
              >
                <div
                  className={`absolute top-0 right-0 w-1/2 h-full ${event.color.shape} rounded-l-[100px] transition-all duration-700 group-hover:w-[60%]`}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`font-mono text-xs ${event.color.accent} uppercase tracking-wider font-medium`}>
                      {eventTypeLabel(event.type)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-black/20" />
                    <span className="font-mono text-xs text-[#999]">
                      {formatEventDate(event.date, event.endDate)}
                    </span>
                  </div>

                  <h3 className="font-heading text-3xl md:text-5xl font-bold tracking-[-2px] leading-[0.95] uppercase mb-4 text-[#111]">
                    {event.name}
                  </h3>
                </div>

                <div className="relative z-10 flex items-end justify-between">
                  <p className="text-sm md:text-base text-[#666] max-w-lg leading-relaxed">
                    {event.shortDescription}
                  </p>
                  <span className={`text-sm ${event.color.accent} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 shrink-0 ml-6`}>
                    Learn more →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </StackCards>
      </div>
    </section>
  );
}
