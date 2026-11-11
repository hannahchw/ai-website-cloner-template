"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { brand, nav } from "./content";
import { glassShadow } from "./shared";

const pill =
  "rounded-full px-3.5 py-2 text-[13px] font-medium tracking-[-0.005em] text-ink transition-colors hover:bg-ink/[0.06]";

export function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a aria-label={`${brand.name} home`} className="flex items-center" href="#top">
          <Image
            src={brand.logo.src}
            alt={brand.logo.alt}
            width={brand.logo.width}
            height={brand.logo.height}
            preload
            className="h-9 w-auto md:h-10"
          />
        </a>

        <nav
          className="relative hidden items-center gap-1 rounded-full border border-ink/[0.06] bg-surface/40 p-1.5 backdrop-blur-2xl backdrop-saturate-[1.8] md:flex"
          style={{ boxShadow: glassShadow }}
        >
          <div className="relative" onMouseEnter={openServices} onMouseLeave={closeServicesSoon}>
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              onClick={() => setServicesOpen((v) => !v)}
              className={cn("inline-flex items-center gap-1", pill, servicesOpen && "bg-ink/[0.06]")}
            >
              Services
              <svg
                viewBox="0 0 10 6"
                width="10"
                height="6"
                fill="none"
                aria-hidden="true"
                className={cn("transition-transform duration-200", servicesOpen && "rotate-180")}
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          {nav.links.map((link) => (
            <a key={link.label} className={pill} href={link.href}>
              {link.label}
            </a>
          ))}

          <div
            role="menu"
            onMouseEnter={openServices}
            onMouseLeave={closeServicesSoon}
            className={cn(
              "absolute left-1/2 top-[calc(100%+24px)] grid w-[720px] -translate-x-1/2 grid-cols-2 gap-x-4 rounded-[20px] border border-ink/[0.06] bg-surface/95 p-3 backdrop-blur-2xl transition-all duration-200",
              servicesOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
            )}
            style={{ boxShadow: "0 30px 60px -24px rgba(20,19,18,0.25)" }}
          >
            {nav.services.map((s) => (
              <a
                key={s.label}
                role="menuitem"
                href={s.href}
                className="group flex items-center justify-between rounded-xl px-2 py-3 transition-colors hover:bg-ink/[0.04]"
              >
                <span>
                  <span className="block text-[13px] font-medium text-ink">{s.label}</span>
                  <span className="mt-0.5 block text-[11px] text-muted">{s.note}</span>
                </span>
                <span className="text-[12px] text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent">
                  →
                </span>
              </a>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <span className="hidden font-mono text-[11px] text-muted md:inline">{brand.locationTag}</span>
          <a
            className="hidden rounded-full bg-ink px-4 py-2.5 text-[13px] font-medium text-surface transition-colors hover:bg-accent md:inline-flex md:items-center md:gap-1.5"
            href={brand.contactHref}
          >
            {nav.ctaLabel}
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative -mr-1 flex h-10 w-10 items-center justify-center rounded-full border border-ink/[0.06] bg-surface/40 text-ink backdrop-blur-2xl backdrop-saturate-[1.8] md:hidden"
            style={{ boxShadow: glassShadow }}
          >
            <span className="sr-only">Menu</span>
            <span
              aria-hidden="true"
              className={cn(
                "absolute h-[1.5px] w-4 bg-current transition-transform duration-300",
                menuOpen ? "rotate-45" : "-translate-y-[5px]",
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                "absolute h-[1.5px] w-4 bg-current transition-transform duration-300",
                menuOpen ? "-rotate-45" : "translate-y-[5px]",
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-[72px] z-40 h-[calc(100dvh-72px)] overflow-y-auto bg-surface transition-all duration-300 md:hidden",
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-8">
          <div className="border-b border-rule">
            <button
              type="button"
              aria-expanded={mobileServicesOpen}
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex w-full items-center justify-between py-5 text-left font-display text-[28px] font-medium leading-none tracking-[-0.02em] text-ink"
            >
              Services
              <svg
                viewBox="0 0 14 8"
                width="16"
                height="10"
                fill="none"
                aria-hidden="true"
                className={cn("transition-transform duration-200", mobileServicesOpen && "rotate-180")}
              >
                <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileServicesOpen && (
              <ul className="pb-5">
                {nav.services.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="block py-2 text-[15px] text-ink-2">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-rule py-5 font-display text-[28px] font-medium leading-none tracking-[-0.02em] text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href={brand.contactHref}
            className="mt-10 inline-flex w-full items-center justify-between rounded-full bg-ink px-6 py-4 text-[15px] font-medium text-surface"
          >
            {nav.ctaLabel}
            <span aria-hidden="true">→</span>
          </a>
          <div className="mt-8 font-mono text-[11px] text-muted">{brand.locationTag}</div>
        </nav>
      </div>
    </header>
  );
}
