import Image from "next/image";
import { brand, cta, footer } from "./content";
import { SectionLabel } from "./shared";

export function Cta() {
  return (
    <section id="cta" className="relative">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6 px-6 py-20 md:px-10 md:py-48">
        <SectionLabel className="col-span-12 md:col-span-3 md:items-start" lineClassName="md:mt-[1.1rem]">
          {cta.eyebrow}
        </SectionLabel>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display display-lg text-ink">
            {cta.headline} <span className="text-accent">{cta.headlineRed}</span>?
          </h2>
          <p className="mt-8 max-w-[58ch] text-[16px] leading-[1.65] text-ink-2 md:text-[18px]">{cta.body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-5 md:gap-8">
            <a
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-[15px] font-medium text-surface transition-transform hover:translate-y-[-1px]"
              href={brand.contactHref}
            >
              {cta.primaryLabel}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={brand.quizHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-[14px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {cta.secondaryLabel}
              <span className="inline-block translate-y-[-1px] transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const footLink = "text-[14px] text-surface/85 transition-colors hover:text-accent";

export function Footer() {
  return (
    <footer className="relative bg-surface">
      <div className="mx-auto max-w-[1600px] px-4 pb-6 md:px-6 md:pb-8">
        <div className="relative overflow-hidden rounded-[32px] bg-ink text-surface md:rounded-[40px]">
          <div className="px-6 pb-10 pt-14 md:px-12 md:pb-12 md:pt-20">
            <div className="grid grid-cols-12 gap-x-6 gap-y-12 border-b border-surface/10 pb-14 md:gap-y-16 md:pb-20">
              <div className="col-span-12 flex flex-col justify-between gap-10 md:col-span-4">
                <p className="text-[12px] uppercase tracking-[0.24em] text-surface/50">{footer.copyright}</p>
                <div>
                  <a
                    className="group inline-flex items-center gap-4 rounded-full bg-surface px-7 py-4 text-[14px] font-medium text-ink transition-colors hover:bg-accent hover:text-surface"
                    href={brand.contactHref}
                  >
                    {footer.ctaLabel}
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
                      →
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-span-6 md:col-span-2">
                <h2 className="eyebrow !text-surface/50">Contact</h2>
                <ul className="mt-6 space-y-2.5">
                  {footer.contact.map((line) => (
                    <li key={line} className="text-[14px] text-surface/85">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              {footer.columns.map((col) => (
                <div key={col.title} className="col-span-6 md:col-span-2">
                  <h2 className="eyebrow !text-surface/50">{col.title}</h2>
                  <ul className="mt-6 space-y-2.5">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a className={footLink} href={l.href}>
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="relative mt-12 flex items-center md:mt-16">
              <Image
                src={brand.logoWhite.src}
                alt={brand.name}
                width={brand.logoWhite.width}
                height={brand.logoWhite.height}
                className="h-auto w-[min(100%,420px)] select-none md:w-[min(100%,560px)]"
              />
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-6 text-[12px] md:mt-14 md:flex-row md:items-center">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 uppercase tracking-[0.22em] text-surface/50">
                {footer.facts.map((f) => (
                  <span key={f}>{f}</span>
                ))}
                <span>
                  {footer.hours} <span className="text-surface/35">{footer.hoursZone}</span>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                {footer.socials.map((s) => (
                  <a key={s.label} className="group inline-flex items-center gap-1 text-[13px] text-surface/85 transition-colors hover:text-accent" href={s.href}>
                    {s.label}
                    <span className="inline-block text-[11px] transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
