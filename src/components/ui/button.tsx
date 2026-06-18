import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-60 disabled:pointer-events-none";

const sizes = {
  md: "px-6 py-3",
  lg: "px-8 py-4 text-base",
} as const;

const variants = {
  primary:
    "bg-gradient-to-r from-gold-light to-gold text-ink hover:brightness-110 shadow-[0_8px_30px_-12px_rgba(201,162,75,0.6)]",
  outline:
    "border border-line-strong text-cream hover:border-gold hover:text-gold",
  ghost: "text-cream hover:text-gold",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
