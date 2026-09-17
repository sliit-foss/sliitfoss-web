export default function Loading() {
  return (
    <section className="pt-32 pb-24 md:pt-40 px-6 bg-[#fafafa] min-h-[60vh]" aria-busy="true" aria-label="Loading">
      <div className="max-w-5xl mx-auto animate-pulse">
        <div className="h-3 w-24 rounded bg-black/6 mb-6" />
        <div className="h-14 w-2/3 rounded-xl bg-black/6 mb-6" />
        <div className="h-5 w-1/2 rounded bg-black/6" />
      </div>
    </section>
  );
}
