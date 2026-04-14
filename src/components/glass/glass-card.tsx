import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  featured?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  featured = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-7 relative overflow-hidden transition-all duration-300",
        hover && "hover:-translate-y-1 glass-hover cursor-pointer",
        featured && "bg-[rgba(99,102,241,0.06)] border-[rgba(99,102,241,0.1)]",
        className
      )}
    >
      {children}
    </div>
  );
}
