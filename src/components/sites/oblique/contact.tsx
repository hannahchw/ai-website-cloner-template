"use client";

import { useState } from "react";
import { brand, contact } from "./content";
import { SectionLabel } from "./shared";

const field =
  "mt-2 block w-full rounded-[12px] border border-rule bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/25";
const label = "text-[13px] font-medium text-ink";

/**
 * Contact form (name, email, company, phone).
 *
 * NOT CONNECTED YET: submitting only shows `contact.notConnectedNote`.
 * To go live, replace <form> below with the real form embed (e.g. HubSpot),
 * or send the fields to your form endpoint inside onSubmit.
 */
export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative border-t border-rule">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12 md:gap-16 md:px-10 md:py-32">
        <div className="md:col-span-5">
          <SectionLabel className="mb-6">{contact.eyebrow}</SectionLabel>
          <h2 className="font-display display-md text-ink">
            {contact.headline} <span className="text-accent">{contact.headlineRed}</span>
          </h2>
          <p className="mt-7 max-w-[40ch] text-[16px] leading-[1.65] text-ink-2 md:text-[17px]">{contact.body}</p>
          <a
            href={brand.contactHref}
            className="group mt-8 inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-[14px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {contact.whatsappLabel}
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="md:col-span-7">
          <form
            className="grid grid-cols-1 gap-5 rounded-[24px] bg-surface-2 p-6 sm:grid-cols-2 md:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className={label}>
              {contact.fields.name}
              <input className={field} name="name" type="text" autoComplete="name" required />
            </label>
            <label className={label}>
              {contact.fields.email}
              <input className={field} name="email" type="email" autoComplete="email" required />
            </label>
            <label className={label}>
              {contact.fields.company}
              <input className={field} name="company" type="text" autoComplete="organization" required />
            </label>
            <label className={label}>
              {contact.fields.phone}
              <input className={field} name="phone" type="tel" autoComplete="tel" inputMode="tel" required />
            </label>
            <div className="flex flex-col gap-4 sm:col-span-2">
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-3 self-start rounded-full bg-ink px-8 py-4 text-[15px] font-medium text-surface transition-colors hover:bg-accent"
              >
                {contact.submitLabel}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
              <p className="text-[12px] text-muted">{contact.privacy}</p>
              {sent && (
                <p role="status" className="rounded-[12px] bg-white px-4 py-3 text-[14px] text-ink">
                  {contact.notConnectedNote}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
