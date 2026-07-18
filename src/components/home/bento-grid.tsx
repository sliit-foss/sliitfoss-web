"use client";

import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { TiltCard } from "@/components/animations/tilt-card";
import { CursorGlow } from "@/components/animations/cursor-glow";

const stats = [
  { value: "500+", label: "Members" },
  { value: "50+", label: "Events" },
  { value: "30+", label: "Projects" }
];

function BentoCard({
  children,
  className = "",
  href,
  tilt = true
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  tilt?: boolean;
}) {
  const inner = (
    <div
      className={`h-full rounded-2xl border border-white/6 bg-white/2 transition-all duration-300 hover:border-white/12 group relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );

  const wrapped = tilt ? <TiltCard className="h-full">{inner}</TiltCard> : inner;

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {wrapped}
      </Link>
    );
  }
  return wrapped;
}

export function BentoGrid() {
  return (
    <section className="py-20 md:py-28 px-6">
      <CursorGlow className="max-w-6xl mx-auto" size={500}>
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px]">
          {/* Featured Event — large card */}
          <StaggerItem className="col-span-2 row-span-2">
            <BentoCard
              href="/events/hackfoss-2026"
              className="bg-gradient-to-br from-indigo-950/40 to-[#0a0a12] p-8 flex flex-col justify-between hover:border-indigo-500/20"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-[80px] rounded-full transition-all duration-500 group-hover:bg-indigo-500/20 group-hover:w-52 group-hover:h-52" />
              <div className="relative">
                <div className="font-mono text-[0.65rem] text-indigo-400/80 uppercase tracking-wider mb-3">
                  Upcoming Event
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-2">HackFOSS 2026</h3>
                <p className="text-sm text-white/30 leading-relaxed max-w-xs">
                  24-hour open source hackathon. Build real projects. Ship real code.
                </p>
              </div>
              <div className="flex items-center justify-between relative">
                <span className="font-mono text-xs text-white/25">Apr 28–29</span>
                <span className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                  Learn more →
                </span>
              </div>
            </BentoCard>
          </StaggerItem>

          {/* Stats cards */}
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <BentoCard
                tilt={false}
                className="p-6 flex flex-col justify-center items-center text-center hover:border-white/10"
              >
                <div className="font-heading text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-[0.7rem] text-white/30 uppercase tracking-widest">{stat.label}</div>
              </BentoCard>
            </StaggerItem>
          ))}

          {/* whoami card */}
          <StaggerItem>
            <BentoCard tilt={false} className="p-5 flex flex-col justify-center">
              <div className="font-mono text-[0.65rem] text-emerald-400/60 mb-2">$ whoami</div>
              <div className="text-xs text-white/40 leading-relaxed">
                FOSS advocates at SLIIT. We build, learn, and contribute to open source.
              </div>
            </BentoCard>
          </StaggerItem>

          {/* Blog card 1 */}
          <StaggerItem>
            <BentoCard
              href="/blog/cli-in-rust"
              className="bg-gradient-to-br from-violet-950/30 to-[#0a0a12] p-5 flex flex-col justify-between hover:border-violet-500/20"
            >
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-violet-500/10 blur-[40px] rounded-full transition-all duration-500 group-hover:bg-violet-500/20 group-hover:w-28" />
              <div className="relative">
                <span className="font-mono text-[0.6rem] text-violet-400/60 uppercase tracking-wider">Blog</span>
                <h4 className="text-sm font-semibold mt-2 leading-snug">Why We Rewrote Our CLI in Rust</h4>
              </div>
              <span className="text-[0.65rem] text-white/20 relative">8 min read</span>
            </BentoCard>
          </StaggerItem>

          {/* Git Workshop */}
          <StaggerItem>
            <BentoCard
              href="/events/git-workshop"
              className="p-5 flex flex-col justify-between hover:border-cyan-500/20"
            >
              <div>
                <div className="font-mono text-[0.6rem] text-cyan-400/60 uppercase tracking-wider">Workshop</div>
                <h4 className="text-sm font-semibold mt-2 leading-snug">
                  Git & GitHub
                  <br />
                  Workshop
                </h4>
              </div>
              <span className="font-mono text-[0.65rem] text-white/20">May 12</span>
            </BentoCard>
          </StaggerItem>

          {/* Blog card 2 — wide */}
          <StaggerItem className="col-span-2">
            <BentoCard
              href="/blog/first-contribution"
              className="bg-gradient-to-r from-teal-950/30 to-[#0a0a12] p-6 flex items-center gap-6 hover:border-teal-500/20"
            >
              <div className="absolute right-0 top-0 w-32 h-32 bg-teal-500/8 blur-[60px] rounded-full transition-all duration-500 group-hover:bg-teal-500/15" />
              <div className="flex-1 relative">
                <span className="font-mono text-[0.6rem] text-teal-400/60 uppercase tracking-wider">Blog</span>
                <h4 className="text-base font-semibold mt-1.5 leading-snug">Your First Open Source Contribution</h4>
                <p className="text-xs text-white/25 mt-1.5">A step-by-step guide from fork to merged PR.</p>
              </div>
              <span className="text-xs text-white/15 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                Read →
              </span>
            </BentoCard>
          </StaggerItem>

          {/* Build with AI event */}
          <StaggerItem>
            <BentoCard
              href="/events/build-with-ai-2026"
              className="p-5 flex flex-col justify-between hover:border-violet-500/20"
            >
              <div>
                <div className="font-mono text-[0.6rem] text-violet-400/60 uppercase tracking-wider">Hackathon</div>
                <h4 className="text-sm font-semibold mt-2 leading-snug">
                  Build with
                  <br />
                  AI 2026
                </h4>
              </div>
              <span className="font-mono text-[0.65rem] text-white/20">Jul 21</span>
            </BentoCard>
          </StaggerItem>

          {/* Docker blog */}
          <StaggerItem>
            <BentoCard
              href="/blog/docker-students"
              className="bg-gradient-to-br from-blue-950/30 to-[#0a0a12] p-5 flex flex-col justify-between hover:border-blue-500/20"
            >
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-500/8 blur-[40px] rounded-full transition-all duration-500 group-hover:bg-blue-500/15" />
              <div className="relative">
                <span className="font-mono text-[0.6rem] text-blue-400/60 uppercase tracking-wider">Blog</span>
                <h4 className="text-sm font-semibold mt-2 leading-snug">Docker in 10 Min for Students</h4>
              </div>
              <span className="text-[0.65rem] text-white/20 relative">4 min read</span>
            </BentoCard>
          </StaggerItem>
        </Stagger>
      </CursorGlow>
    </section>
  );
}
