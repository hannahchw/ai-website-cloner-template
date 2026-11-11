"use client";

import { useRef, useState } from "react";
import { integration } from "./content";
import { SectionLabel } from "./shared";

const RADIUS = 42; // spoke length in the 100x100 diagram space

export function Integration() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const nodes = integration.nodes.map((label, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / integration.nodes.length;
    const x = Math.cos(angle) * RADIUS;
    const y = Math.sin(angle) * RADIUS;
    return { label, x, y, left: 50 + x, top: 50 + y };
  });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return;
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    // The core drifts up to ~6% of the diagram towards the cursor.
    setOffset({ x: dx * r.width * 0.06, y: dy * r.height * 0.06 });
  };

  return (
    <section id="integration" className="relative bg-surface-2">
      <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <SectionLabel className="col-span-12 md:col-span-3 md:items-start" lineClassName="md:mt-[1.1rem]">
            {integration.eyebrow}
          </SectionLabel>
          <h2 className="col-span-12 max-w-[22ch] font-display text-[clamp(2.5rem,1.4rem+4.2vw,5.5rem)] leading-[0.98] tracking-[-0.035em] text-ink md:col-span-9">
            {integration.headline} <span className="text-accent">{integration.headlineRed}</span>
          </h2>
        </div>

        <div className="mt-20 flex flex-col gap-12 md:mt-28 md:grid md:grid-cols-12 md:gap-16">
          <div className="col-span-12 md:col-span-5">
            <div
              ref={boxRef}
              onPointerMove={onMove}
              onPointerLeave={() => setOffset({ x: 0, y: 0 })}
              className="relative mx-auto aspect-square w-full max-w-[400px] sm:max-w-[460px] md:max-w-[520px]"
            >
              <div className="absolute inset-[4%] md:inset-0">
                <div className="absolute inset-0 rounded-full border border-rule" />
                <div className="absolute inset-[10%] rounded-full border border-rule/70" />
                <div className="absolute inset-[22%] rounded-full border border-rule/50" />
                <svg className="absolute inset-0 h-full w-full" viewBox="-50 -50 100 100" aria-hidden="true">
                  {nodes.map((n) => (
                    <line
                      key={n.label}
                      x1={0}
                      y1={0}
                      x2={n.x}
                      y2={n.y}
                      stroke="var(--color-rule)"
                      strokeWidth={0.3}
                      strokeDasharray="1 1"
                    />
                  ))}
                </svg>
                <div
                  className="absolute left-1/2 top-1/2 flex size-[27%] flex-col items-center justify-center rounded-full bg-ink text-surface shadow-[0_30px_60px_-20px_rgba(229,28,66,0.35)] transition-transform duration-300 ease-out"
                  style={{ transform: `translate(${offset.x}px, ${offset.y}px) translate(-50%, -50%)` }}
                >
                  <span className="font-display text-[13px] font-semibold tracking-tight md:text-[15px]">
                    {integration.coreTitle}
                  </span>
                  <span className="mt-1 text-[8px] uppercase tracking-[0.22em] text-surface/70 md:text-[9px]">
                    {integration.coreSubtitle}
                  </span>
                </div>
                {nodes.map((n) => (
                  <div
                    key={n.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-cta)] bg-surface px-3 py-1.5 text-[11px] font-medium text-ink shadow-[0_10px_24px_-12px_rgba(20,19,18,0.25)] ring-1 ring-rule md:text-[12px]"
                    style={{ left: `${n.left}%`, top: `${n.top}%` }}
                  >
                    {n.label}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-6 text-center text-[11px] text-muted">{integration.hint}</p>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div className="space-y-6 text-[17px] leading-[1.7] text-ink-2 md:text-[18px]">
              {integration.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-10 border-t border-rule pt-8">
              <p className="max-w-[52ch] text-[17px] font-semibold leading-[1.55] text-ink md:text-[18px]">
                {integration.closing}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
