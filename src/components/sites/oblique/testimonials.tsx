"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { testimonials } from "./content";
import { SectionLabel } from "./shared";

const AUTOPLAY_MS = 7000;

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(flip && "rotate-180")}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Testimonials() {
  const quotes = testimonials.quotes;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (i: number) => setIndex((i + quotes.length) % quotes.length);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % quotes.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, quotes.length]);

  const current = quotes[index];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8 px-6 py-20 md:gap-10 md:px-10 md:py-48">
        <div className="col-span-12 md:col-span-4">
          <SectionLabel className="pb-8">{testimonials.eyebrow}</SectionLabel>
          <div className="relative aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[20px] bg-surface-2">
            <Image src={testimonials.image} alt={testimonials.imageAlt} fill sizes="320px" className="object-cover" />
          </div>
          <div className="mt-6">
            <p className="font-display text-[18px] leading-tight text-ink">{testimonials.caption}</p>
            <p className="mt-1 text-[13px] text-muted">{testimonials.captionSub}</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8 md:pl-12">
          <span aria-hidden="true" className="block font-display text-[clamp(5rem,3rem+4vw,8rem)] leading-[0.8] text-accent">
            &ldquo;
          </span>
          <div className="-mt-6 min-h-[340px] md:-mt-10 md:min-h-[360px]" aria-live="polite">
            <div key={index} style={{ animation: "hero-fade-up 0.6s cubic-bezier(0.22,0.61,0.36,1) both" }}>
              <blockquote className="font-display text-[clamp(1.4rem,0.95rem+1.7vw,2.4rem)] leading-[1.25] tracking-[-0.018em] text-ink">
                {current.quote}
              </blockquote>
              <p className="mt-7 text-[15px] font-medium text-ink">{current.name}</p>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-rule pt-6">
            <div className="flex items-center gap-3">
              {quotes.map((q, i) => (
                <button
                  key={q.name}
                  type="button"
                  aria-label={`Show testimonial from ${q.name}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-7 bg-accent" : "w-2 bg-rule hover:bg-muted",
                  )}
                />
              ))}
              <span className="ml-3 text-[12px] uppercase tracking-[0.22em] text-muted">
                {pad(index + 1)} / {pad(quotes.length)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(index - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Arrow flip />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(index + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
