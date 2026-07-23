"use client";

import Link from "next/link";
import { WordAnimate } from "@/components/animations/word-animate";
import { FadeUp } from "@/components/animations/fade-up";

export function CTA() {
  return (
    <section className="py-32 md:py-44 px-6 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeUp>
          <div className="font-mono text-xs text-[#999] mb-10">$ join --community sliit-foss</div>
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

        <Link
          href="/join"
          className="inline-flex items-center justify-center rounded-full border-0 bg-[#111] bg-[linear-gradient(#f0f0f0,#f0f0f0)] bg-size-[0%_100%] bg-left bg-no-repeat px-6 py-2.5 text-[0.7rem] font-normal uppercase tracking-wide whitespace-nowrap text-white transition-[background-size,color] duration-300 ease-out hover:bg-size-[100%_100%] hover:text-[#111]"
        >
          Become a Member
        </Link>
      </div>
    </section>
  );
}
