"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface CursorGlowProps {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
}

export function CursorGlow({
  children,
  className,
  color = "99,102,241",
  size = 400,
}: CursorGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setVisible(true);
    }

    function onLeave() {
      setVisible(false);
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className || ""}`}>
      <div
        className="pointer-events-none absolute -z-0 transition-opacity duration-300"
        style={{
          left: pos.x - size / 2,
          top: pos.y - size / 2,
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${color},0.08) 0%, transparent 70%)`,
          opacity: visible ? 1 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
