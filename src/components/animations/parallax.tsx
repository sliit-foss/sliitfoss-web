"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // negative = slower, positive = faster
  offset?: [string, string];
}

export function Parallax({
  children,
  className,
  speed = 0.3,
  offset,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset
      ? (offset as ["start end", "end start"])
      : ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
