"use client";

import { useState } from "react";
import { skillOptions, yearOptions } from "@/content/join-form";
import { FadeUp } from "@/components/animations/fade-up";

export function JoinForm() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggleSkill(skill: string) {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Wire to API endpoint
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="py-24 px-6 bg-[#fafafa] text-center">
        <div className="max-w-lg mx-auto">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="font-heading text-2xl font-bold text-[#111] mb-3">
            Welcome to SLIIT FOSS!
          </h2>
          <p className="text-sm text-[#777]">
            We&apos;ve received your application. We&apos;ll reach out via email with next steps.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 pb-24 px-6 bg-[#fafafa]">
      <div className="max-w-2xl mx-auto">
        <FadeUp>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2">
                  Full Name *
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
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-white text-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999] transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Student ID + Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2">
                  Student ID *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-white text-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999] transition-all"
                  placeholder="IT12345678"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2">
                  Year / Batch *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-white text-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999] transition-all"
                  defaultValue=""
                >
                  <option value="" disabled>Select year</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* GitHub + Portfolio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2">
                  GitHub Username *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-white text-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999] transition-all"
                  placeholder="octocat"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-white text-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999] transition-all"
                  placeholder="https://yoursite.com"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-3">
                Skills & Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedSkills.includes(skill)
                        ? "bg-[#111] text-white"
                        : "bg-white border border-black/[0.06] text-[#666] hover:border-black/[0.12]"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Why join */}
            <div>
              <label className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2">
                Why do you want to join SLIIT FOSS? *
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-white text-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999] transition-all resize-none"
                placeholder="Tell us about yourself and what excites you about open source..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 rounded-xl bg-[#111] text-white text-sm font-semibold transition-all hover:shadow-lg"
            >
              Submit Application
            </button>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
