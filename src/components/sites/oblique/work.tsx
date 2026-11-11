import Image from "next/image";
import { work } from "./content";
import { DotLabel } from "./shared";

/** Case study block: client logo card on the left, results grid on the right. */
export function Work() {
  return (
    <section id="work" className="relative">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-40">
        <div className="mb-12 grid grid-cols-12 gap-6 md:mb-20 md:gap-10">
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

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <div className="relative flex aspect-[4/4.6] w-full items-center justify-center overflow-hidden rounded-[20px] bg-surface-2 md:sticky md:top-24">
              <div className="relative h-[60%] w-[70%]">
                <Image src={work.logo.src} alt={work.logo.alt} fill sizes="(min-width: 768px) 30vw, 70vw" className="object-contain" />
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {work.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={i === 0 ? "border-t border-rule py-8 sm:col-span-2 md:py-10" : "border-t border-rule py-8 sm:pr-8 md:py-10"}
                >
                  <div
                    className={
                      i === 0
                        ? "font-display text-[clamp(3.5rem,2rem+6vw,8rem)] leading-none tracking-[-0.04em] text-accent"
                        : "font-display text-[clamp(2.25rem,1.2rem+3.8vw,4.5rem)] leading-none tracking-[-0.035em] text-ink"
                    }
                  >
                    {s.value}
                  </div>
                  <p className="mt-4 max-w-[30ch] text-[14px] leading-[1.55] text-ink-2 md:text-[15px]">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-[70ch] border-t border-rule pt-6 text-[12px] leading-[1.6] text-muted">{work.disclaimer}</p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-28">
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
