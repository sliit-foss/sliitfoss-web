"use client";

import Image from "next/image";
import { galleryItems } from "@/content/gallery";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { FadeUp } from "@/components/animations/fade-up";

export function GalleryGrid() {
  return (
    <section className="pb-24 md:pb-32 px-6 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="mb-8 md:mb-10">
          <p className="max-w-2xl text-sm md:text-base text-[#777] leading-relaxed">
            From workshops and hackathons to speaker sessions and behind-the-scenes
            build nights, this space is meant to hold the moments that shape the
            SLIIT FOSS community.
          </p>
        </FadeUp>

        <div className="rounded-[2rem] border border-black/[0.05] bg-white p-3 md:p-4 shadow-[0_24px_80px_rgba(17,17,17,0.05)]">
          <Stagger
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4"
            staggerDelay={0.07}
          >
            {galleryItems.map((item) => (
              <StaggerItem key={item.title} className={item.layout}>
                <article className="group relative overflow-hidden rounded-[1.6rem] border border-black/[0.04] bg-[#f4f4f4] shadow-[0_20px_50px_rgba(17,17,17,0.08)]">
                  <div className={`relative w-full ${item.aspectRatio}`}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-black/8 to-transparent opacity-100 md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100" />

                    <div className="absolute left-4 bottom-4 right-4">
                      <div className="inline-flex max-w-full translate-y-0 flex-col rounded-2xl border border-white/16 bg-black/12 px-3.5 py-3 text-white backdrop-blur-[10px] transition-all duration-300 opacity-100 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/78">
                          {item.label}
                        </span>
                        <span className="mt-1 font-heading text-lg md:text-xl tracking-[-0.04em] leading-none text-white">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
