"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { services } from "./content";
import { ArrowUpRight, PhotoOrPlaceholder, SectionLabel } from "./shared";

const arrowLink =
  "group/arrow inline-flex shrink-0 items-center justify-center text-ink transition-colors duration-300 hover:text-accent";
const arrowIcon = "transition-transform duration-300 group-hover/arrow:-translate-y-[3px] group-hover/arrow:translate-x-[3px]";

export function Services() {
  const [active, setActive] = useState(0);
  const current = services.items[active];

  return (
    <section id="services" className="relative">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-32">
        <div className="mb-14 grid grid-cols-12 gap-6 md:mb-20">
          <SectionLabel className="col-span-12 md:col-span-3 md:items-start" lineClassName="md:mt-[1.05rem]">
            {services.eyebrow}
          </SectionLabel>
          <h2 className="col-span-12 font-display display-md text-ink md:col-span-9">
            {services.headline} <span className="text-accent">{services.headlineRed}</span>
          </h2>
          <p className="col-span-12 max-w-[56ch] text-[17px] leading-[1.65] text-ink-2 md:col-span-9 md:col-start-4">
            {services.intro}
          </p>
        </div>

        <div className="flex flex-col gap-10 md:grid md:grid-cols-12 md:gap-16">
          <div className="col-span-12 md:col-span-6">
            <div className="md:sticky md:top-24">
              <div className="relative h-[320px] w-full overflow-hidden rounded-[20px] bg-surface-2 md:h-[640px]">
                {services.items.map((s, i) => (
                  <div
                    key={s.title}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500",
                      i === active ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <PhotoOrPlaceholder src={s.image} label={s.imageLabel} sizes="(min-width: 768px) 50vw, 100vw" />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-baseline justify-between text-[11px] text-muted">
                <span className="font-medium uppercase tracking-[0.22em]">
                  {current.number} · {current.tag}
                </span>
                <span>{current.title}</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="min-h-[200px] pb-4 md:min-h-[300px] md:pb-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[7px] w-[7px] rounded-full bg-accent" />
                <span className="eyebrow">{current.tag}</span>
              </div>
              <div key={active} style={{ animation: "hero-fade-up 0.5s cubic-bezier(0.22,0.61,0.36,1) both" }}>
                <div className="flex items-start justify-between gap-4 md:gap-8">
                  <h3 className="font-display text-[clamp(2rem,1.3rem+2.6vw,3.75rem)] leading-[0.98] tracking-[-0.035em] text-ink">
                    {current.title}
                  </h3>
                  <a aria-label={`Explore ${current.title}`} className={arrowLink} href={current.href}>
                    <ArrowUpRight size={22} className={arrowIcon} />
                  </a>
                </div>
                <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.65] text-ink-2 md:text-[17px]">{current.body}</p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {current.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-[12px] text-muted md:text-[13px]">
                      <span className="h-px w-3 bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ul className="border-t border-rule">
              {services.items.map((s, i) =>
                i === active ? null : (
                  <li key={s.title} className="group border-b border-rule">
                    <div className="grid w-full grid-cols-[auto_1fr_auto_auto] items-center gap-5 py-5 md:py-6">
                      <span className="font-display text-[12px] font-medium tabular-nums text-muted transition-colors duration-200 group-hover:text-accent md:text-[13px]">
                        / {s.number}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        className="text-left font-display text-[clamp(1.25rem,0.9rem+1.2vw,2rem)] leading-[1.1] tracking-[-0.02em] text-ink/85 transition-colors duration-200 hover:text-accent"
                      >
                        {s.title}
                      </button>
                      <span className="hidden text-[11px] font-medium uppercase tracking-[0.22em] text-muted md:inline">
                        {s.tag}
                      </span>
                      <a aria-label={`Explore ${s.title}`} className={arrowLink} href={s.href}>
                        <ArrowUpRight className={arrowIcon} />
                      </a>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
