import Link from "next/link";
import { cn } from "@/lib/utils";

/** Aurevia "A" chevron/mountain mark — placeholder SVG until brand asset supplied. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 44"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-auto", className)}
    >
      <defs>
        <linearGradient id="aurevia-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-gold-light)" />
          <stop offset="100%" stopColor="var(--color-gold-dark)" />
        </linearGradient>
      </defs>
      {/* outer chevron */}
      <path
        d="M24 1 L47 43 H36 L24 20 L12 43 H1 Z"
        fill="url(#aurevia-gold)"
      />
      {/* inner accent */}
      <path d="M24 16 L31 30 H17 Z" fill="url(#aurevia-gold)" opacity="0.85" />
    </svg>
  );
}

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label="Aurevia Global — home"
    >
      <LogoMark className="h-9 transition-transform group-hover:scale-105" />
      {showWordmark && (
        <span className="leading-none">
          <span className="block heading text-lg tracking-[0.18em] text-cream">
            Aurevia
          </span>
          <span className="block heading text-[0.6rem] tracking-[0.42em] text-gold">
            Global
          </span>
        </span>
      )}
    </Link>
  );
}
