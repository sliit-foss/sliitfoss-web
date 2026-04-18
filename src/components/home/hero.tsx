"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/animations/magnetic-button";

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timeout = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      30 + Math.random() * 40
    );
    return () => clearTimeout(timeout);
  }, [displayed, started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="inline-block w-[2px] h-[1em] bg-emerald-500 ml-0.5 animate-pulse align-text-bottom" />
      )}
    </span>
  );
}

const commitMessages = [
  { hash: "a3f8d21", msg: "feat: add member registration flow", time: "2h ago" },
  { hash: "7bc9e44", msg: "fix: resolve event date parsing bug", time: "5h ago" },
  { hash: "e1d5f87", msg: "docs: update contribution guidelines", time: "1d ago" },
  { hash: "2ca8b19", msg: "feat: implement blog MDX renderer", time: "2d ago" },
  { hash: "f9a2c33", msg: "refactor: optimize image pipeline", time: "3d ago" },
];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const terminalY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden bg-[#fafafa]"
    >
      <motion.div
        className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        style={{ opacity }}
      >
        {/* Left: Statement */}
        <motion.div style={{ y: textY }}>
          <motion.div
            className="font-mono text-xs text-[#999] mb-6 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#999] animate-pulse" />
            <span>~/sliit-foss</span>
          </motion.div>

          <motion.h1
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-3px] leading-[0.95] mb-6 text-[#111]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We build
            <br />
            <span className="text-gradient">in the open</span>
            <span className="text-[#999]">.</span>
          </motion.h1>

          <motion.p
            className="text-lg text-[#888] max-w-md leading-relaxed mb-10 font-light"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            A collective of student developers pushing the boundaries of open
            source. One commit at a time.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <MagneticButton strength={0.25}>
              <Link
                href="/join"
                className="inline-block px-7 py-3 rounded-lg bg-[#111] text-white text-sm font-semibold transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:rounded-2xl duration-300"
              >
                Become a Member
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Link
                href="/about"
                className="inline-block px-7 py-3 rounded-lg bg-white text-[#333] text-sm border border-black/[0.08] transition-all hover:border-black/15 hover:shadow-sm"
              >
                See What We Do
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right: Terminal window — light themed */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ y: terminalY }}
        >
          <div className="rounded-xl border border-black/[0.08] bg-white overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.06] bg-[#fafafa]">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-[0.7rem] text-[#999] font-mono">
                git log --oneline
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-4 font-mono text-[0.8rem] leading-relaxed space-y-1 bg-[#1a1a2e] text-white">
              {commitMessages.map((commit, i) => (
                <motion.div
                  key={commit.hash}
                  className="flex gap-3 py-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.12 }}
                >
                  <span className="text-yellow-400/80 shrink-0">{commit.hash}</span>
                  <span className="text-white/80 truncate">{commit.msg}</span>
                  <span className="text-white/30 shrink-0 hidden sm:inline">
                    {commit.time}
                  </span>
                </motion.div>
              ))}

              <motion.div
                className="pt-3 border-t border-white/[0.06] mt-3 text-emerald-400/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <span className="text-white/40">$ </span>
                <TypingText text="git push origin main" delay={1800} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
