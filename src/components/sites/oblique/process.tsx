import { process } from "./content";
import { PhotoOrPlaceholder, SectionLabel } from "./shared";

/** Card colours per theme. Brand colours come from globals.css. */
const themes = {
  light: { bg: "var(--brand-surface)", fg: "var(--brand-ink)", tag: undefined, body: "var(--brand-ink-2)", meta: "var(--brand-muted)" },
  sand: { bg: "var(--brand-surface-2)", fg: "var(--brand-ink)", tag: undefined, body: "var(--brand-ink-2)", meta: "var(--brand-muted)" },
  beige: { bg: "var(--brand-surface-3)", fg: "var(--brand-ink)", tag: undefined, body: "var(--brand-ink-2)", meta: "var(--brand-muted)" },
  dark: { bg: "var(--brand-ink)", fg: "var(--brand-surface)", tag: "rgba(250,249,246,0.6)", body: "rgba(250,249,246,0.75)", meta: "rgba(250,249,246,0.55)" },
};

export function Process() {
  const total = process.steps.length;
  return (
    <section id="process" className="relative">
      <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-20 md:px-10 md:pb-36 md:pt-40">
        <div className="grid grid-cols-12 gap-6">
          <SectionLabel className="col-span-12 md:col-span-3 md:items-start" lineClassName="md:mt-[1.1rem]">
            {process.eyebrow}
          </SectionLabel>
          <h2 className="col-span-12 font-display display-md text-ink md:col-span-9">
            {process.headline}
            <span className="text-accent">.</span>
          </h2>
        </div>
      </div>

      {/* Each card sticks to the top so the next one slides over it. */}
      <div className="relative h-auto md:h-[var(--stack-h)]" style={{ "--stack-h": `${total * 100}vh` } as React.CSSProperties}>
        {process.steps.map((step, i) => {
          const t = themes[step.theme];
          return (
            <div key={step.number} className="relative w-full md:sticky md:top-0 md:h-screen" style={{ zIndex: 10 + i }}>
              <div
                className="relative flex w-full items-start overflow-hidden rounded-t-[28px] shadow-[0_-30px_70px_-30px_rgba(20,19,18,0.22)] md:h-full md:items-center md:rounded-t-[36px]"
                style={{ backgroundColor: t.bg, color: t.fg }}
              >
                <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-20 md:grid md:grid-cols-12 md:gap-16 md:px-10 md:py-0">
                  <div className="col-span-12 md:col-span-3">
                    <span className="font-display text-[clamp(6rem,4rem+10vw,14rem)] leading-[0.85] tracking-[-0.045em] text-accent">
                      {step.number}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <span className="eyebrow block pb-5" style={t.tag ? { color: t.tag } : undefined}>
                      {step.tag}
                    </span>
                    <h3 className="font-display text-[clamp(2rem,1.4rem+2.6vw,3.75rem)] leading-[1.05] tracking-[-0.028em]">
                      {step.title}
                    </h3>
                    <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.7] md:text-[17px]" style={{ color: t.body }}>
                      {step.body}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-surface-3">
                      <PhotoOrPlaceholder
                        src={step.image}
                        label={step.imageLabel}
                        sizes="(min-width: 768px) 30vw, 100vw"
                        fit={step.imageFit}
                        position={step.imagePosition}
                        poster={step.poster}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="absolute bottom-6 right-6 hidden items-center gap-3 text-[11px] uppercase tracking-[0.22em] md:bottom-10 md:right-10 md:flex"
                  style={{ color: t.meta }}
                >
                  <span>Step {step.number}</span>
                  <span className="h-px w-8 bg-current opacity-40" />
                  <span>
                    {i + 1} / {total}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
