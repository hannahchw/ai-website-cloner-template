import { cn } from "@/lib/utils";

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
