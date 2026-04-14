"use client";

import { WordAnimate } from "@/components/animations/word-animate";
import { FadeUp } from "@/components/animations/fade-up";

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-[0.65rem] text-[#999] uppercase tracking-wider mb-4">
          {label}
        </div>
        <WordAnimate className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-3px] leading-[0.95] uppercase text-[#111]">
          {title}
        </WordAnimate>
        {subtitle && (
          <FadeUp delay={0.3}>
            <p className="mt-6 text-lg text-[#888] max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
