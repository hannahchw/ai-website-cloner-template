import Image from "next/image";
import { cn } from "@/lib/utils";
import { brand } from "./content";

/** Branded block shown where a real photo has not been supplied yet. */
export function BrandPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[inherit] bg-gradient-to-br from-ink via-ink to-accent p-8 text-center ring-1 ring-inset ring-surface/20",
        className,
      )}
    >
      <Image
        src={brand.logoWhite.src}
        alt=""
        width={brand.logoWhite.width}
        height={brand.logoWhite.height}
        className="h-auto w-[55%] max-w-[260px] opacity-90"
      />
      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-surface/70">{label}</span>
    </div>
  );
}

/**
 * How an image sits in its box.
 * - "cover": a photo that fills the box (cropped at the edges).
 * - "contain": an icon, logo or screenshot shown whole, on a white card.
 */
export type ImageFit = "cover" | "contain";

/**
 * Shows the photo (or looping video, for .mp4 files) if one is set,
 * otherwise the branded placeholder.
 */
export function PhotoOrPlaceholder({
  src,
  alt,
  label,
  sizes,
  fit = "cover",
  position,
  poster,
  background = "#ffffff",
}: {
  src: string | null;
  alt?: string;
  label: string;
  sizes: string;
  fit?: ImageFit;
  /** CSS object-position, e.g. "35% center", to choose which part of a photo stays in view. */
  position?: string;
  /** Still frame shown before a video loads. */
  poster?: string;
  /** Card colour behind a "contain" image. Defaults to white. */
  background?: string;
}) {
  if (!src) return <BrandPlaceholder label={label} />;
  const contain = fit === "contain";
  const media = src.endsWith(".mp4") ? (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      aria-label={alt ?? label}
      className={cn("absolute inset-0 h-full w-full", contain ? "object-contain p-[12%]" : "object-cover")}
    />
  ) : (
    <Image
      src={src}
      alt={alt ?? label}
      fill
      sizes={sizes}
      unoptimized={src.endsWith(".gif")}
      className={contain ? "object-contain p-[12%]" : "object-cover"}
      style={position ? { objectPosition: position } : undefined}
    />
  );
  return contain ? (
    <div className="absolute inset-0 rounded-[inherit]" style={{ background }}>
      {media}
    </div>
  ) : (
    media
  );
}

/** Small uppercase label with a short red line in front. */
export function SectionLabel({
  children,
  className,
  lineClassName,
  labelClassName,
}: {
  children: React.ReactNode;
  className?: string;
  lineClassName?: string;
  labelClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className={cn("h-px w-10 bg-accent", lineClassName)} />
      <span className={cn("eyebrow", labelClassName)}>{children}</span>
    </div>
  );
}

/** Small uppercase label with a red dot in front. */
export function DotLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-[7px] w-[7px] rounded-full bg-accent" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

export function ArrowUpRight({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 18L18 6" />
      <path d="M8 6h10v10" />
    </svg>
  );
}

export const glassShadow =
  "inset 0 1px 0 0 rgba(255,255,255,0.55), inset 0 -1px 0 0 rgba(20,19,18,0.04), 0 10px 30px -12px rgba(20,19,18,0.12)";
