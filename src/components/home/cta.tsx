"use client";

import Link from "next/link";
import { WordAnimate } from "@/components/animations/word-animate";
import { FadeUp } from "@/components/animations/fade-up";
import { MagneticButton } from "@/components/animations/magnetic-button";

export function CTA() {
  return (
    <section className="py-32 md:py-44 px-6 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeUp>
          <div className="font-mono text-xs text-[#999] mb-10">
            $ join --community sliit-foss
          </div>
        </FadeUp>

        <WordAnimate className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-[-3px] leading-[0.95] uppercase mb-4 text-[#111]">
          Stop watching.
        </WordAnimate>
        <WordAnimate
          className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-[-3px] leading-[0.95] uppercase text-gradient mb-10"
          delay={0.3}
        >
          Start shipping.
        </WordAnimate>

        <FadeUp delay={0.5}>
          <p className="text-base text-[#999] mb-12 max-w-md mx-auto">
            Join 500+ students building the future of open source
          </p>
        </FadeUp>

        <FadeUp delay={0.6}>
          <MagneticButton className="inline-block" strength={0.3}>
            <Link
              href="/join"
              className="inline-block px-10 py-4 rounded-xl bg-[#111] text-white text-sm font-semibold transition-all hover:shadow-[0_8px_40px_rgba(0,0,0,0.15)] hover:rounded-[28px] duration-300"
            >
              Become a Member
            </Link>
          </MagneticButton>
        </FadeUp>
      </div>
    </section>
  );
}
