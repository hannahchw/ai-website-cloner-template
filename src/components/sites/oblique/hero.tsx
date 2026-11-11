"use client";

import { useEffect, useState } from "react";
import { brand, hero } from "./content";

const ROTATE_MS = 2400;

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % hero.rotatingWords.length), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  // The widest word reserves space so the layout never jumps.
  const widest = hero.rotatingWords.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <section className="relative isolate overflow-hidden bg-surface">
      <div className="relative z-10 flex flex-col justify-center py-10 md:min-h-[calc(100svh-4rem)] md:py-16">
        <div style={{ animationDelay: "0.2s" }} className="hero-fade-up flex items-center justify-center px-4 md:px-12">
          <div className="flex max-w-[19rem] items-center justify-center gap-2.5 text-center sm:max-w-none">
            <span className="relative flex h-[6px] w-[6px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-accent" />
            </span>
            <span className="eyebrow !text-accent">{hero.eyebrow}</span>
          </div>
        </div>

        <h1 className="sr-only">{hero.srHeading}</h1>

        <div aria-hidden="true" className="mt-8 flex items-center justify-center px-4 text-center md:mt-14 md:px-12">
          <div className="mx-auto max-w-[1400px] font-display text-ink">
            <span className="block overflow-hidden pb-[0.16em] text-[clamp(3.25rem,10vw,7.5rem)] font-bold leading-[0.96] tracking-[-0.045em]">
              <i style={{ animationDelay: "0.3s" }} className="hero-rise inline-block not-italic">
                {hero.line1}
              </i>
            </span>
            <span className="relative -mt-[0.16em] block overflow-hidden pb-[0.18em] text-[clamp(3.25rem,10vw,7.5rem)] font-bold leading-[0.96] tracking-[-0.045em] text-accent">
              <i style={{ animationDelay: "0.5s" }} className="hero-rise inline-block not-italic">
                <span className="relative inline-block whitespace-nowrap">
                  <span className="invisible">{widest}.</span>
                  <span
                    key={index}
                    className="absolute inset-x-0 top-0 whitespace-nowrap text-center"
                    style={{ animation: index === 0 ? undefined : "word-in 0.5s cubic-bezier(0.22,0.61,0.36,1) both" }}
                  >
                    {hero.rotatingWords[index]}.
                  </span>
                </span>
              </i>
            </span>
          </div>
        </div>

        <div
          style={{ animationDelay: "1s" }}
          className="hero-fade-up mt-10 flex flex-col items-center gap-5 px-4 pb-6 text-center md:mt-14 md:px-12 md:pb-0"
        >
          <a
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-[14px] font-medium text-surface transition-all hover:-translate-y-0.5 hover:bg-accent"
            href={brand.contactHref}
          >
            {hero.ctaLabel}
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
          <p className="max-w-[620px] text-[14px] leading-[1.6] text-muted">
            {hero.intro} <span className="font-medium text-ink">{hero.introBold}</span>
          </p>
          <a
            className="inline-flex items-center gap-2 border-b border-transparent pb-0.5 text-[13px] font-medium text-ink transition-colors hover:border-ink"
            href={hero.secondaryHref}
          >
            {hero.secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
