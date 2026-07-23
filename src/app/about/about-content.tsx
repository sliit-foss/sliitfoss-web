"use client";

import { aboutContent, siteConfig } from "@/content/site";
import { WordAnimate } from "@/components/animations/word-animate";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function AboutContent() {
  return (
    <>
      {/* Stats */}
      <section className="py-16 px-6 bg-white">
        <Stagger className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {siteConfig.stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center p-6 rounded-2xl border border-black/4 bg-[#fafafa]">
                <div className="font-heading text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-[0.75rem] text-[#999] uppercase tracking-widest">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 px-6 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto">
          <WordAnimate className="font-heading text-3xl md:text-4xl font-bold tracking-[-2px] uppercase text-[#111] mb-12">
            Our History
          </WordAnimate>
          <div className="space-y-0">
            {aboutContent.milestones.map((milestone, i) => (
              <FadeUp key={milestone.year} delay={i * 0.05}>
                <div className="flex gap-6 pb-10 relative">
                  {/* Timeline line */}
                  {i < aboutContent.milestones.length - 1 && (
                    <div className="absolute left-[23px] top-10 w-px h-full bg-black/6" />
                  )}
                  {/* Dot */}
                  <div className="w-[48px] shrink-0 flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[#999] mt-1.5" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-[#999] mb-1">{milestone.year}</div>
                    <div className="font-heading text-lg font-semibold text-[#111] mb-1">{milestone.title}</div>
                    <div className="text-sm text-[#777] leading-relaxed">{milestone.description}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <WordAnimate className="font-heading text-3xl md:text-4xl font-bold tracking-[-2px] uppercase text-[#111] mb-12">
            Our Activities
          </WordAnimate>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutContent.activities.map((activity) => (
              <StaggerItem key={activity.title}>
                <div className="p-8 rounded-2xl border border-black/4 bg-[#fafafa] hover:border-black/8 hover:shadow-sm transition-all">
                  <div className="text-3xl mb-4">{activity.icon}</div>
                  <div className="font-heading text-lg font-semibold text-[#111] mb-2">{activity.title}</div>
                  <div className="text-sm text-[#777] leading-relaxed">{activity.description}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
