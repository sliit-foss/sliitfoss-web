"use client";

import { aboutContent, siteConfig } from "@/content/site";
import { WordAnimate } from "@/components/animations/word-animate";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { JourneyTimeline } from "@/components/about/journey-timeline";

export function AboutContent() {
  return (
    <>
      {/* Stats */}
      <section className="bg-white px-6 py-16">
        <Stagger className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="rounded-2xl border border-black/4 bg-[#fafafa] p-6 text-center">
                <div className="text-gradient mb-1 font-heading text-3xl font-bold md:text-4xl">{stat.value}</div>

                <div className="text-[0.75rem] uppercase tracking-widest text-[#999]">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Timeline */}
      <section className="overflow-hidden px-6 bg-[#fafafa] py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <WordAnimate className="font-heading text-3xl font-bold uppercase tracking-[-2px] text-[#111] md:text-4xl">
            Our Journey
          </WordAnimate>

          <JourneyTimeline milestones={aboutContent.milestones} />
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <WordAnimate className="mb-12 font-heading text-3xl font-bold uppercase tracking-[-2px] text-[#111] md:text-4xl">
            What We Do
          </WordAnimate>

          <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {aboutContent.activities.map((activity) => (
              <StaggerItem key={activity.title}>
                <div className="rounded-2xl border border-black/4 bg-[#fafafa] p-8 transition-all hover:border-black/8 hover:shadow-sm">
                  <div className="mb-4 text-3xl">{activity.icon}</div>

                  <div className="mb-2 font-heading text-lg font-semibold text-[#111]">{activity.title}</div>

                  <div className="text-sm leading-relaxed text-[#777]">{activity.description}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
