"use client";

import { useActionState } from "react";
import { siteConfig } from "@/content/site";
import { FadeUp } from "@/components/animations/fade-up";
import { FormTransition } from "@/components/animations/form-transition";
import { FormSuccess } from "@/components/animations/form-success";
import { submitContact } from "./actions";
import { initialFormState } from "@/lib/mail/schemas";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-black/6 bg-white text-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-[#999]/20 focus:border-[#999] transition-all";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialFormState);
  const fieldErrors = state.ok === false ? state.fieldErrors : undefined;
  const formError = state.ok === false ? state.formError : undefined;
  const isSuccess = state.ok === true;

  return (
    <section className="py-12 pb-24 px-6 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <FadeUp>
          <FormTransition
            state={isSuccess ? "success" : "form"}
            success={
              <div className="rounded-2xl border border-black/4 bg-white p-10">
                <FormSuccess icon="✉️" title="Message sent" description={state.ok === true ? state.message : ""} />
              </div>
            }
            form={
              <form action={formAction} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
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
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(fieldErrors?.email)}
                  />
                  {fieldErrors?.email && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email[0]}</p>}
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#555] uppercase tracking-wider mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="What's on your mind?"
                    aria-invalid={Boolean(fieldErrors?.message)}
                  />
                  {fieldErrors?.message && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.message[0]}</p>}
                </div>
                {formError && (
                  <p className="text-xs text-red-600" role="alert">
                    {formError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-8 py-3 rounded-xl bg-[#111] text-white text-sm font-semibold transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            }
          />
        </FadeUp>

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
