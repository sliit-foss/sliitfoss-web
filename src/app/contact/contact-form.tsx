"use client";

import { siteConfig } from "@/content/site";
import { FadeUp } from "@/components/animations/fade-up";

export function ContactForm() {
  return (
    <section className="py-12 pb-24 px-6 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form */}
        <FadeUp>
          <form className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-white text-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999] transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-white text-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999] transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-white text-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999] transition-all resize-none"
                placeholder="What's on your mind?"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#111] text-white text-sm font-semibold transition-all hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </FadeUp>

        {/* Info */}
        <FadeUp delay={0.15}>
          <div className="space-y-8">
            <div>
              <div className="text-xs font-medium text-[#bbb] uppercase tracking-wider mb-2">Email</div>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-[#999] hover:underline">
                {siteConfig.contact.email}
              </a>
            </div>
            <div>
              <div className="text-xs font-medium text-[#bbb] uppercase tracking-wider mb-2">Location</div>
              <p className="text-sm text-[#555]">{siteConfig.contact.location}</p>
            </div>
            <div>
              <div className="text-xs font-medium text-[#bbb] uppercase tracking-wider mb-3">Connect</div>
              <div className="flex flex-col gap-2">
                {Object.entries(siteConfig.socials).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#555] hover:text-[#111] capitalize transition-colors"
                  >
                    {name} →
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
