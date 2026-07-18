"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemedSelectProps = {
  "name": string;
  "options": readonly string[];
  "value": string;
  "onChange": (value: string) => void;
  "placeholder"?: string;
  "invalid"?: boolean;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
};

export function ThemedSelect({
  name,
  options,
  value,
  onChange,
  placeholder = "Select",
  invalid,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy
}: ThemedSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) {
      return;
    }

    button.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      button.setAttribute("aria-controls", listId);
    } else {
      button.removeAttribute("aria-controls");
    }
  }, [open, listId]);

  useEffect(() => {
    if (!open || !ref.current) {
      return;
    }

    ref.current.querySelectorAll('[role="option"]').forEach((element) => {
      if (element.getAttribute("data-selected") === "true") {
        element.setAttribute("aria-selected", "true");
      } else {
        element.removeAttribute("aria-selected");
      }
    });
  }, [open, value, options]);

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
      <input type="hidden" name={name} value={value} tabIndex={-1} aria-hidden="true" />
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        className={cn(
          "flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999]",
          invalid ? "border-red-300" : "border-black/6",
          value ? "text-[#111]" : "text-[#999]"
        )}
      >
        <span>{value || placeholder}</span>
        <ChevronDown className={cn("h-4 w-4 text-[#999] transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={ariaLabelledBy}
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-black/6 bg-white p-1 shadow-[0_16px_48px_rgba(17,17,17,0.1)] animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {options.map((option) => {
            const selected = value === option;
            return (
              <li
                key={option}
                role="option"
                aria-selected="false"
                data-selected={selected ? "true" : "false"}
                tabIndex={0}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onChange(option);
                    setOpen(false);
                  }
                }}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors focus:outline-none focus:bg-[#f0f0f0]",
                  selected ? "bg-[#f0f0f0] text-[#111]" : "text-[#555] hover:bg-[#f6f6f6]"
                )}
              >
                {option}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
