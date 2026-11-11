"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { problem } from "./content";
import { SectionLabel } from "./shared";

const WORD_STAGGER_MS = 110;

/** Words start dim, then light up one by one once the line comes into view. */
function ScrollWords({ text, className, trailingRedDot }: { text: string; className: string; trailingRedDot?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");
  const [lit, setLit] = useState(words.length);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return; // already on screen at load
    const dimFrame = requestAnimationFrame(() => setLit(0)); // dim the words until they come into view
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = setInterval(() => {
          setLit((n) => {
            if (n + 1 >= words.length && timer) clearInterval(timer);
            return n + 1;
          });
        }, WORD_STAGGER_MS);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(dimFrame);
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [words.length]);

  return (
    <div ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="transition-opacity duration-300" style={{ opacity: i < lit ? 1 : 0.22 }}>
            {w}
            {trailingRedDot && i === words.length - 1 ? <span className="text-accent">.</span> : null}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </div>
  );
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1600);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setShown(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{shown}</span>;
}

export function Problem() {
  const big = "font-display text-[clamp(1.85rem,1.15rem+2.3vw,3rem)] leading-[1.15] tracking-[-0.018em] text-surface";
  const mid = "font-display text-[clamp(1.3rem,1rem+1.1vw,1.9rem)] leading-[1.4] tracking-[-0.01em] text-surface/90";
  const close = "font-display text-[clamp(1.5rem,1.1rem+1.3vw,2.1rem)] leading-[1.3] tracking-[-0.012em]";

  return (
    <section className="relative bg-ink text-surface">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6 px-6 pb-0 pt-20 md:px-10 md:pt-48">
        <SectionLabel
          className="col-span-12 md:col-span-3 md:items-start"
          lineClassName="md:mt-[1.1rem]"
          labelClassName="!text-surface/60"
        >
          {problem.eyebrow}
        </SectionLabel>
        <div className="col-span-12 md:col-span-9">
          <div className="space-y-4 md:space-y-5">
            <ScrollWords text={problem.headline[0]} className={big} />
            <ScrollWords text={problem.headline[1]} className={big} trailingRedDot />
          </div>
          <div className="mt-14 space-y-6 md:space-y-8">
            {problem.points.map((p) => (
              <ScrollWords key={p} text={p} className={mid} />
            ))}
          </div>
          <div className="mt-14 space-y-3">
            <ScrollWords text={problem.closingWhite} className={cn(close, "text-surface")} />
            <ScrollWords text={problem.closingRed} className={cn(close, "text-accent")} />
          </div>
        </div>
      </div>

      <section aria-label="By the numbers" className="relative">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-32">
          <SectionLabel className="mb-14" labelClassName="!text-surface/60">
            {problem.numbersEyebrow}
          </SectionLabel>
          <div className="grid grid-cols-2 gap-y-14 md:grid-cols-4 md:gap-x-10">
            {problem.numbers.map((n) => (
              <div key={n.label} className="border-t border-surface/15 pt-6">
                <div className="font-display text-[clamp(2.25rem,1.2rem+3.8vw,4.5rem)] leading-none tracking-[-0.035em] text-surface">
                  <span className="tabular-nums">
                    {n.prefix}
                    <CountUp value={n.value} />
                    {n.suffix}
                  </span>
                </div>
                <p className="mt-5 max-w-[26ch] whitespace-pre-line text-[13px] leading-[1.55] text-surface/70 md:text-[14px]">
                  {n.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="pointer-events-none absolute right-0 top-1/2 h-40 w-px -translate-y-1/2 bg-accent/40" />
    </section>
  );
}
