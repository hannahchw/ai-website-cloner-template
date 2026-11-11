import Image from "next/image";
import { awards } from "./content";
import { SectionLabel } from "./shared";

/** Awards & partnerships: intro + awards night photo, then a row of badges. */
export function Awards() {
  return (
    <section id="awards" className="relative bg-surface-2">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-32">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <SectionLabel className="mb-6">{awards.eyebrow}</SectionLabel>
            <h2 className="font-display display-md text-ink">
              {awards.headline} <span className="text-accent">{awards.headlineRed}</span>
            </h2>
            <p className="mt-7 max-w-[52ch] text-[16px] leading-[1.65] text-ink-2 md:text-[17px]">{awards.body}</p>
          </div>
          <figure className="md:col-span-6">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[20px]">
              <Image src={awards.photo.src} alt={awards.photo.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted">{awards.photo.caption}</figcaption>
          </figure>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-20 md:gap-4 lg:grid-cols-7">
          {awards.badges.map((b) => (
            <li key={b.name} className="relative flex h-[96px] items-center justify-center rounded-[16px] border border-rule bg-white p-4 md:h-[110px]">
              <div className="relative h-full w-full">
                <Image src={b.src} alt={b.name} fill sizes="200px" className="object-contain" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
