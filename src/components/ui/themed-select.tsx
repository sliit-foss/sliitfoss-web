"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type ThemedSelectProps = {
  "name": string;
  "options": readonly string[];
  "value": string;
  "onChange": (value: string) => void;
  "placeholder"?: string;
  "invalid"?: boolean;
  "aria-labelledby"?: string;
};

export function ThemedSelect({
  name,
  options,
  value,
  onChange,
  placeholder = "Select",
  invalid,
  "aria-labelledby": ariaLabelledBy
}: ThemedSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={ariaLabelledBy}
        className={cn(
          "flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999]",
          invalid ? "border-red-300" : "border-black/[0.06]",
          value ? "text-[#111]" : "text-[#999]"
        )}
      >
        <span>{value || placeholder}</span>
        <ChevronDown className={cn("h-4 w-4 text-[#999] transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-black/[0.06] bg-white p-1 shadow-[0_16px_48px_rgba(17,17,17,0.1)]"
          >
            {options.map((option) => {
              const selected = value === option;
              return (
                <li key={option}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      selected ? "bg-[#f0f0f0] text-[#111]" : "text-[#555] hover:bg-[#f6f6f6]"
                    )}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
