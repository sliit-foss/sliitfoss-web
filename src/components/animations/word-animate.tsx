"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

interface WordAnimateProps {
  children: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

export function WordAnimate({
  children,
  className,
  once = true,
  delay = 0,
}: WordAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  const words = children.split(" ");

  return (
    <div ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.3em]"
          aria-hidden
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: delay + i * 0.04,
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
