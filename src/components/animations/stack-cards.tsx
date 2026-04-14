"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface StackCardsProps {
  children: ReactNode[];
  className?: string;
}

function StackCard({
  children,
  index,
  total,
  progress,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const cardStart = index / total;
  const cardEnd = (index + 1) / total;

  // Only scale down slightly when next card pushes over it
  const scale = useTransform(
    progress,
    [cardStart, cardEnd],
    [1, index === total - 1 ? 1 : 0.95]
  );

  // Each card sticks at a progressively lower top so they peek
  const topOffset = 80 + index * 24;

  return (
    <motion.div
      className="sticky will-change-transform origin-top"
      style={{
        scale,
        top: topOffset,
        zIndex: total + index, // higher index = higher z
        marginBottom: 80,
      }}
    >
      {children}
    </motion.div>
  );
}

export function StackCards({ children, className }: StackCardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <StackCard
          key={i}
          index={i}
          total={children.length}
          progress={scrollYProgress}
        >
          {child}
        </StackCard>
      ))}
    </div>
  );
}
