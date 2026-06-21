"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

type FormSuccessProps = {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  className?: string;
};

const containerTransition = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const };
const iconSpring = { type: "spring" as const, stiffness: 220, damping: 14, mass: 0.8 };

export function FormSuccess({ icon, title, description, className }: FormSuccessProps) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      className={className ?? "text-center"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={containerTransition}
    >
      <motion.div
        className="text-5xl mb-4 inline-block"
        aria-hidden
        initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ ...iconSpring, delay: 0.1 }}
      >
        {icon}
      </motion.div>

      <motion.h2
        className="font-heading text-2xl font-bold text-[#111] mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...containerTransition, delay: 0.25 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="text-sm text-[#777]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...containerTransition, delay: 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
