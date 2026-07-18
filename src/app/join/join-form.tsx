"use client";

import { useActionState, useState, type ChangeEvent } from "react";
import { teamOptions, yearOptions } from "@/content/join-form";
import { siteConfig } from "@/content/site";
import { FadeUp } from "@/components/animations/fade-up";
import { FormTransition } from "@/components/animations/form-transition";
import { FormSuccess } from "@/components/animations/form-success";
import { ThemedSelect } from "@/components/ui/themed-select";
import { QRCodeSVG } from "qrcode.react";
import { submitMembership } from "./actions";
import { initialFormState } from "@/lib/mail/schemas";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-black/6 bg-white text-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999] transition-all";

const labelClass = "block text-xs font-medium text-[#555] uppercase tracking-wider mb-2";

const errorClass = "mt-1.5 text-xs text-red-600";
const errorHiddenClass = "sr-only";

const emptyValues = {
  name: "",
  email: "",
  studentId: "",
  whatsapp: "",
  github: "",
  linkedin: "",
  website: "",
  employment: "",
  note: ""
};

export function JoinForm() {
  const [values, setValues] = useState(emptyValues);
  const [year, setYear] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const [state, formAction, isPending] = useActionState(submitMembership, initialFormState);

  const fieldErrors = state.ok === false ? state.fieldErrors : undefined;
  const formError = state.ok === false ? state.formError : undefined;
  const isSuccess = state.ok === true;

  function update(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function toggleTeam(team: string) {
    setSelectedTeams((prev) => (prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]));
  }

  function clearForm() {
    setValues(emptyValues);
    setYear("");
    setSelectedTeams([]);
    setDismissed(true);
  }

  return (
    <section className="py-12 pb-24 px-6 bg-[#fafafa]">
      <div className="max-w-2xl mx-auto">
        <FadeUp>
          <FormTransition
            state={isSuccess ? "success" : "form"}
            success={
              <div className="py-12">
                <FormSuccess
                  icon="🎉"
                  title="Welcome to SLIIT FOSS!"
                  description={state.ok === true ? state.message : ""}
                />
                <div className="mt-8 flex flex-col items-center gap-5">
                  <div className="rounded-3xl border border-black/6 bg-white p-5 shadow-[0_16px_48px_rgba(17,17,17,0.08)]">
                    <QRCodeSVG
                      value={siteConfig.whatsappGroup}
                      size={176}
                      level="M"
                      marginSize={2}
                      bgColor="#ffffff"
                      fgColor="#111111"
                    />
                  </div>
                  <p className="text-xs text-[#999]">Scan with your phone to join the group</p>
                  <a
                    href={siteConfig.whatsappGroup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg"
                  >
                    Join the WhatsApp group →
                  </a>
                </div>
              </div>
            }
            form={
              <form action={formAction} onSubmit={() => setDismissed(false)} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="join-name" className={labelClass}>
                      Full Name *
                    </label>
                    <input
                      id="join-name"
                      name="name"
                      type="text"
                      required
                      value={values.name}
                      onChange={update}
                      className={inputClass}
                      placeholder="Your name"
                      aria-describedby="join-name-error"
                    />
                    <p
                      id="join-name-error"
                      className={fieldErrors?.name ? errorClass : errorHiddenClass}
                      {...(fieldErrors?.name ? { role: "alert" } : {})}
                    >
                      {fieldErrors?.name?.[0] ?? ""}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="join-email" className={labelClass}>
                      Email *
                    </label>
                    <input
                      id="join-email"
                      name="email"
                      type="email"
                      required
                      value={values.email}
                      onChange={update}
                      className={inputClass}
                      placeholder="you@example.com"
                      aria-describedby="join-email-error"
                    />
                    <p
                      id="join-email-error"
                      className={fieldErrors?.email ? errorClass : errorHiddenClass}
                      {...(fieldErrors?.email ? { role: "alert" } : {})}
                    >
                      {fieldErrors?.email?.[0] ?? ""}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="join-student-id" className={labelClass}>
                      SLIIT Student Number *
                    </label>
                    <input
                      id="join-student-id"
                      name="studentId"
                      type="text"
                      required
                      value={values.studentId}
                      onChange={update}
                      className={inputClass}
                      placeholder="IT12345678"
                      aria-describedby="join-student-id-error"
                    />
                    <p
                      id="join-student-id-error"
                      className={fieldErrors?.studentId ? errorClass : errorHiddenClass}
                      {...(fieldErrors?.studentId ? { role: "alert" } : {})}
                    >
                      {fieldErrors?.studentId?.[0] ?? ""}
                    </p>
                  </div>
                  <div>
                    <label id="join-year-label" className={labelClass}>
                      Year of Study *
                    </label>
                    <ThemedSelect
                      name="year"
                      options={yearOptions}
                      value={year}
                      onChange={setYear}
                      placeholder="Select year"
                      invalid={Boolean(fieldErrors?.year)}
                      aria-labelledby="join-year-label"
                      aria-describedby="join-year-error"
                    />
                    <p
                      id="join-year-error"
                      className={fieldErrors?.year ? errorClass : errorHiddenClass}
                      {...(fieldErrors?.year ? { role: "alert" } : {})}
                    >
                      {fieldErrors?.year?.[0] ?? ""}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="join-whatsapp" className={labelClass}>
                      Contact Number (WhatsApp) *
                    </label>
                    <input
                      id="join-whatsapp"
                      name="whatsapp"
                      type="tel"
                      required
                      value={values.whatsapp}
                      onChange={update}
                      className={inputClass}
                      placeholder="+94 77 123 4567"
                      aria-describedby="join-whatsapp-error"
                    />
                    <p
                      id="join-whatsapp-error"
                      className={fieldErrors?.whatsapp ? errorClass : errorHiddenClass}
                      {...(fieldErrors?.whatsapp ? { role: "alert" } : {})}
                    >
                      {fieldErrors?.whatsapp?.[0] ?? ""}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="join-github" className={labelClass}>
                      GitHub Profile *
                    </label>
                    <input
                      id="join-github"
                      name="github"
                      type="url"
                      required
                      value={values.github}
                      onChange={update}
                      className={inputClass}
                      placeholder="https://github.com/yourusername"
                      aria-describedby="join-github-error"
                    />
                    <p
                      id="join-github-error"
                      className={fieldErrors?.github ? errorClass : errorHiddenClass}
                      {...(fieldErrors?.github ? { role: "alert" } : {})}
                    >
                      {fieldErrors?.github?.[0] ?? ""}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="join-linkedin" className={labelClass}>
                      LinkedIn Profile
                    </label>
                    <input
                      id="join-linkedin"
                      name="linkedin"
                      type="url"
                      value={values.linkedin}
                      onChange={update}
                      className={inputClass}
                      placeholder="https://linkedin.com/in/you"
                      aria-describedby="join-linkedin-error"
                    />
                    <p
                      id="join-linkedin-error"
                      className={fieldErrors?.linkedin ? errorClass : errorHiddenClass}
                      {...(fieldErrors?.linkedin ? { role: "alert" } : {})}
                    >
                      {fieldErrors?.linkedin?.[0] ?? ""}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="join-website" className={labelClass}>
                      Personal Website
                    </label>
                    <input
                      id="join-website"
                      name="website"
                      type="url"
                      value={values.website}
                      onChange={update}
                      className={inputClass}
                      placeholder="https://yoursite.com"
                      aria-describedby="join-website-error"
                    />
                    <p
                      id="join-website-error"
                      className={fieldErrors?.website ? errorClass : errorHiddenClass}
                      {...(fieldErrors?.website ? { role: "alert" } : {})}
                    >
                      {fieldErrors?.website?.[0] ?? ""}
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor="join-employment" className={labelClass}>
                    Currently employed or interning?
                  </label>
                  <input
                    id="join-employment"
                    name="employment"
                    type="text"
                    value={values.employment}
                    onChange={update}
                    className={inputClass}
                    placeholder="e.g. Software Engineering Intern at Acme (optional)"
                    aria-describedby="join-employment-error"
                  />
                  <p
                    id="join-employment-error"
                    className={fieldErrors?.employment ? errorClass : errorHiddenClass}
                    {...(fieldErrors?.employment ? { role: "alert" } : {})}
                  >
                    {fieldErrors?.employment?.[0] ?? ""}
                  </p>
                </div>

                <div role="group" aria-labelledby="join-teams-label" aria-describedby="join-teams-error">
                  <p id="join-teams-label" className={labelClass}>
                    Which teams interest you? *
                  </p>
                  <p className="mb-3 text-xs text-[#999]">Pick one or more — you can be part of multiple teams.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {teamOptions.map((team) => {
                      const active = selectedTeams.includes(team.name);
                      const checkboxId = `join-team-${team.name.toLowerCase().replace(/\s+/g, "-")}`;
                      return (
                        <label
                          key={team.name}
                          htmlFor={checkboxId}
                          className={`block cursor-pointer text-left rounded-2xl border p-4 transition-all ${
                            active
                              ? "border-[#111] bg-white shadow-sm"
                              : "border-black/6 bg-white hover:border-black/12"
                          }`}
                        >
                          <input
                            id={checkboxId}
                            type="checkbox"
                            name="teams"
                            value={team.name}
                            checked={active}
                            onChange={() => toggleTeam(team.name)}
                            className="sr-only"
                          />
                          <div className="text-2xl mb-2" aria-hidden>
                            {team.emoji}
                          </div>
                          <div className="text-sm font-semibold text-[#111]">{team.name}</div>
                          <div className="mt-1 text-xs leading-relaxed text-[#777]">{team.description}</div>
                          <div
                            className={`mt-3 inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] transition-colors ${
                              active ? "border-[#111] bg-[#111] text-white" : "border-black/15 text-transparent"
                            }`}
                            aria-hidden
                          >
                            ✓
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  <p
                    id="join-teams-error"
                    className={fieldErrors?.teams ? errorClass : errorHiddenClass}
                    {...(fieldErrors?.teams ? { role: "alert" } : {})}
                  >
                    {fieldErrors?.teams?.[0] ?? ""}
                  </p>
                </div>

                <div>
                  <label htmlFor="join-note" className={labelClass}>
                    Anything else you&apos;d like us to know?
                  </label>
                  <textarea
                    id="join-note"
                    name="note"
                    rows={3}
                    value={values.note}
                    onChange={update}
                    className={`${inputClass} resize-none`}
                    placeholder="Optional — tell us anything else (projects, links, questions)."
                    aria-describedby="join-note-error"
                  />
                  <p
                    id="join-note-error"
                    className={fieldErrors?.note ? errorClass : errorHiddenClass}
                    {...(fieldErrors?.note ? { role: "alert" } : {})}
                  >
                    {fieldErrors?.note?.[0] ?? ""}
                  </p>
                </div>

                {formError && !dismissed && (
                  <p className="text-xs text-red-600" role="alert">
                    {formError}
                  </p>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={clearForm}
                    className="px-6 py-4 rounded-xl border border-black/8 text-[#555] text-sm font-semibold transition-all hover:bg-[#f0f0f0]"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 rounded-xl border-0 bg-[#111] bg-[linear-gradient(#f0f0f0,#f0f0f0)] bg-size-[0%_100%] bg-left bg-no-repeat px-8 py-4 text-sm font-semibold text-white transition-[background-size,color] duration-300 ease-out enabled:hover:bg-size-[100%_100%] enabled:hover:text-[#111] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isPending ? "Sending..." : "Submit Application"}
                  </button>
                </div>
              </form>
            }
          />
        </FadeUp>
      </div>
    </section>
  );
}
