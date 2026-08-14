import { FadeUp } from "@/components/animations/fade-up";

interface MilestoneProps {
  year: string;
  title: string;
  description: string;
  position: "top" | "bottom";
  delay: number;
}

export function Milestone({ year, title, description, position, delay }: MilestoneProps) {
  return (
    <FadeUp delay={delay}>
      <div
        className={`
          absolute 
          ${position === "top" ? "-top-32" : "top-28"}
          w-48
          text-center
        `}
      >
        <div className="font-mono text-xs text-[#999] mb-2">{year}</div>

        <div className="font-heading text-lg font-semibold text-[#111]">{title}</div>

        <p className="text-sm text-[#777] leading-relaxed mt-2">{description}</p>
      </div>
    </FadeUp>
  );
}
