"use client";

import { TextReveal } from "@/components/animations/text-reveal";
import { WordAnimate } from "@/components/animations/word-animate";

export function Manifesto() {
  return (
    <section className="py-32 md:py-44 px-6 bg-[#fafafa] text-[#111]">
      <div className="max-w-5xl mx-auto">
        <WordAnimate className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-[-3px] leading-[0.95] uppercase mb-12 text-[#111]">
          We don&apos;t just talk about open source
        </WordAnimate>
        <TextReveal className="font-heading text-xl sm:text-2xl md:text-3xl font-light leading-[1.5] tracking-[-1px] max-w-3xl text-[#111]">
          We ship it. From hackathons to kernel patches, from first-time contributors to seasoned maintainers, we believe the best way to learn is to build something that matters.
        </TextReveal>
      </div>
    </section>
  );
}
