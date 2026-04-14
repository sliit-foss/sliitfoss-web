import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
}

export function GlassContainer({ children, className }: GlassContainerProps) {
  return (
    <div
      className={cn(
        "glass rounded-[32px] p-12 md:p-20 relative",
        "shadow-[0_40px_80px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      {children}
    </div>
  );
}
