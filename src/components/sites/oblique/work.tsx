"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { work } from "./content";
import { ArrowUpRight, DotLabel } from "./shared";

/** Plays the showreel only while it is on screen. */
function Showreel({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`${label} showreel`}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.02]"
    />
  );
}

export function Work() {
  return (
    <section id="work" className="relative">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-40">
        <div className="mb-12 grid grid-cols-12 gap-6 md:mb-28 md:gap-10">
          <div className="col-span-12 md:col-span-7">
            <DotLabel className="mb-6">{work.eyebrow}</DotLabel>
            <h2 className="font-display display-md text-ink">
              {work.headline}
              <span className="text-accent">.</span>
            </h2>
          </div>
          <p className="col-span-12 max-w-[52ch] self-end text-[16px] leading-[1.65] text-ink-2 md:col-span-5 md:text-[17px]">
            {work.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-10 md:gap-y-24">
          {work.projects.map((p, i) => (
            <div key={p.title} className={cn(i % 2 === 1 && "md:mt-28")}>
              <a className="group block" href={p.href}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-surface-2 md:aspect-[4/4.6]">
                  <Showreel src={p.video} poster={p.poster} label={p.title} />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-muted">{p.year}</span>
                    <span className="h-[1px] w-5 translate-y-[-4px] bg-rule" />
                    <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-muted">{p.tags}</span>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 text-ink transition-all duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-accent"
                  />
                </div>
                <h3 className="mt-2 text-[clamp(1.05rem,0.85rem+0.6vw,1.4rem)] font-medium leading-[1.2] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-accent">
                  {p.title}
                </h3>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-28 flex items-center justify-between border-t border-rule pt-8">
          <span className="eyebrow">{work.archiveEyebrow}</span>
          <a
            className="group inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-[14px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            href={work.archiveHref}
          >
            {work.archiveLabel}
            <span className="inline-block translate-y-[-1px] transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
