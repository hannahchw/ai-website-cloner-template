import Image from "next/image";
import { clients } from "./content";

export function Clients() {
  // The list is rendered twice so the scroll loops without a gap.
  const loop = [...clients.logos, ...clients.logos];
  return (
    <section aria-label="Trusted by" className="relative overflow-hidden bg-surface pb-12 pt-2 md:pb-16 md:pt-3">
      <div className="mx-auto mb-8 flex max-w-[1440px] items-center gap-4 px-6 md:px-10">
        <span className="h-px w-12 bg-ink/20" />
        <span className="eyebrow">{clients.eyebrow}</span>
      </div>
      <div className="relative">
        <div className="marquee-track flex w-max items-center whitespace-nowrap">
          {loop.map((logo, i) => (
            <div key={`${logo.name}-${i}`} className="relative h-[80px] w-[130px] flex-shrink-0 md:h-[110px] md:w-[180px]">
              <Image
                src={logo.src}
                alt={i < clients.logos.length ? logo.name : ""}
                fill
                sizes="180px"
                className="object-contain opacity-[0.82] transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-surface to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-surface to-transparent md:w-32" />
      </div>
    </section>
  );
}
