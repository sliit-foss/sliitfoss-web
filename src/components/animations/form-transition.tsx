"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

type FormTransitionProps = {
  state: "form" | "success";
  form: ReactNode;
  success: ReactNode;
  className?: string;
};

const variants = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  enter: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.98 }
};

export function FormTransition({ state, form, success, className }: FormTransitionProps) {
  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={state}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {state === "success" ? success : form}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
