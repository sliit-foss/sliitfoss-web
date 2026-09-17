"use client";

import { useState } from "react";

const items = ["Hackathons", "Workshops", "Tech Talks", "Open Source", "Community", "Contributions", "Collaboration"];

function TickerContent() {
  return (
    <>
      {items.map((item) => (
        <span
          key={item}
          className="font-heading text-lg font-medium whitespace-nowrap opacity-25 uppercase tracking-[3px] text-[#111]"
        >
          {item}
          <span className="inline-block w-1.5 h-1.5 bg-[#ccc] rounded-full mx-5 align-middle" />
        </span>
      ))}
    </>
  );
}

export function Ticker() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative overflow-hidden py-10 border-t border-b border-black/6 bg-[#fafafa]">
      <div className="flex gap-0 animate-ticker w-max" style={{ animationPlayState: paused ? "paused" : "running" }}>
        <TickerContent />
        <span aria-hidden="true" className="contents">
          <TickerContent />
        </span>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play ticker" : "Pause ticker"}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-black/10 bg-[#fafafa] text-[#555] text-xs hover:bg-black/4 focus:outline-none focus:ring-2 focus:ring-[#999]/30 transition-colors"
      >
        {paused ? "▶" : "❚❚"}
      </button>
    </div>
  );
}
