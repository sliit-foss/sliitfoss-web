"use client";

import { useActionState, useState } from "react";
import { skillOptions, yearOptions } from "@/content/join-form";
import { FadeUp } from "@/components/animations/fade-up";
import { submitMembership } from "./actions";
import { initialFormState } from "@/lib/mail/schemas";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-white text-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999] transition-all";

export function JoinForm() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [state, formAction, isPending] = useActionState(submitMembership, initialFormState);

  const fieldErrors = state.ok === false ? state.fieldErrors : undefined;
  const formError = state.ok === false ? state.formError : undefined;
  const isSuccess = state.ok === true;

  function toggleSkill(skill: string) {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  }

  if (isSuccess) {
    return (
      <section className="py-24 px-6 bg-[#fafafa] text-center">
        <div className="max-w-lg mx-auto">
          <div className="text-5xl mb-4" aria-hidden>
            🎉
          </div>
          <h2 className="font-heading text-2xl font-bold text-[#111] mb-3">Welcome to SLIIT FOSS!</h2>
          <p className="text-sm text-[#777]">{state.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 pb-24 px-6 bg-[#fafafa]">
      <div className="max-w-2xl mx-auto">
        <FadeUp>
          <form action={formAction} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="join-name"
                  className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="join-name"
                  name="name"
                  type="text"
                  required
                  className={inputClass}
                  placeholder="Your name"
                  aria-invalid={Boolean(fieldErrors?.name)}
                />
                {fieldErrors?.name && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.name[0]}</p>}
              </div>
              <div>
                <label
                  htmlFor="join-email"
                  className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2"
                >
                  Email *
                </label>
                <input
                  id="join-email"
                  name="email"
                  type="email"
                  required
                  className={inputClass}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(fieldErrors?.email)}
                />
                {fieldErrors?.email && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email[0]}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="join-student-id"
                  className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2"
                >
                  Student ID *
                </label>
                <input
                  id="join-student-id"
                  name="studentId"
                  type="text"
                  required
                  className={inputClass}
                  placeholder="IT12345678"
                  aria-invalid={Boolean(fieldErrors?.studentId)}
                />
                {fieldErrors?.studentId && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.studentId[0]}</p>}
              </div>
              <div>
                <label
                  htmlFor="join-year"
                  className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2"
                >
                  Year / Batch *
                </label>
                <select
                  id="join-year"
                  name="year"
                  required
                  className={inputClass}
                  defaultValue=""
                  aria-invalid={Boolean(fieldErrors?.year)}
                >
                  <option value="" disabled>
                    Select year
                  </option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {fieldErrors?.year && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.year[0]}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="join-github"
                  className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2"
                >
                  GitHub Username *
                </label>
                <input
                  id="join-github"
                  name="github"
                  type="text"
                  required
                  className={inputClass}
                  placeholder="octocat"
                  aria-invalid={Boolean(fieldErrors?.github)}
                />
                {fieldErrors?.github && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.github[0]}</p>}
              </div>
              <div>
                <label
                  htmlFor="join-portfolio"
                  className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2"
                >
                  Portfolio URL
                </label>
                <input
                  id="join-portfolio"
                  name="portfolio"
                  type="url"
                  className={inputClass}
                  placeholder="https://yoursite.com"
                  aria-invalid={Boolean(fieldErrors?.portfolio)}
                />
                {fieldErrors?.portfolio && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.portfolio[0]}</p>}
              </div>
            </div>

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
              {selectedSkills.map((skill) => (
                <input key={skill} type="hidden" name="skills" value={skill} />
              ))}
            </div>

            <div>
              <label
                htmlFor="join-reason"
                className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2"
              >
                Why do you want to join SLIIT FOSS? *
              </label>
              <textarea
                id="join-reason"
                name="reason"
                required
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Tell us about yourself and what excites you about open source..."
                aria-invalid={Boolean(fieldErrors?.reason)}
              />
              {fieldErrors?.reason && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.reason[0]}</p>}
            </div>

            {formError && (
              <p className="text-xs text-red-600" role="alert">
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full px-8 py-4 rounded-xl bg-[#111] text-white text-sm font-semibold transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending..." : "Submit Application"}
            </button>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
