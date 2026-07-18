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
  return (
    <div className="overflow-hidden py-10 border-t border-b border-black/6 bg-[#fafafa]">
      <div className="flex gap-0 animate-ticker w-max">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  );
}
