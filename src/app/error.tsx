"use client";

import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="pt-32 pb-24 md:pt-40 px-6 bg-[#fafafa] min-h-[60vh]">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-[0.65rem] text-[#999] uppercase tracking-wider mb-4">Something went wrong</div>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-3px] leading-[0.95] uppercase text-[#111]">
          Unexpected error
        </h1>
        <p className="mt-6 text-lg text-[#888] max-w-2xl leading-relaxed">
          We hit a snag loading this page. You can try again, or head back home.
        </p>
        {error.digest && <p className="mt-2 font-mono text-xs text-[#bbb]">Reference: {error.digest}</p>}
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 rounded-full bg-[#111] text-white text-sm font-medium hover:bg-[#333] transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full border border-black/10 text-[#111] text-sm font-medium hover:bg-black/4 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
