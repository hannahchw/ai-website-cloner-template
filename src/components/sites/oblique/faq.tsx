"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { faq } from "./content";
import { SectionLabel } from "./shared";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-rule">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-20 md:grid md:grid-cols-12 md:gap-16 md:px-10 md:py-40">
        <div className="col-span-12 md:sticky md:top-28 md:col-span-5 md:self-start">
          <SectionLabel className="mb-8">{faq.eyebrow}</SectionLabel>
          <h2 className="font-display display-md text-ink">
            {faq.headline} <span className="text-accent">{faq.headlineRed}</span>
          </h2>
          <p className="mt-8 max-w-[38ch] text-[16px] leading-[1.65] text-ink-2">{faq.intro}</p>
        </div>
        <ul className="col-span-12 md:col-span-7">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-rule first:border-t">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-start justify-between gap-8 py-7 text-left md:py-8"
                >
                  <span
                    className={cn(
                      "font-display text-[clamp(1.1rem,0.95rem+0.6vw,1.35rem)] leading-[1.3] tracking-[-0.015em] transition-colors duration-200",
                      isOpen ? "text-accent" : "text-ink group-hover:text-accent",
                    )}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-[10px] flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "rotate-45 border-accent text-accent"
                        : "border-rule text-muted group-hover:border-accent group-hover:text-accent",
                    )}
                  >
                    <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[58ch] pb-8 pr-6 text-[15px] leading-[1.7] text-ink-2 md:pr-12 md:text-[16px]">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
