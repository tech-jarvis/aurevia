import { stats as defaultStats, type Stat } from "@/content/stats";
import { Reveal } from "./ui/reveal";
import { cn } from "@/lib/utils";

/** Proof-point statistics row. */
export function StatGrid({
  items = defaultStats,
  withSub = false,
  className,
}: {
  items?: Stat[];
  withSub?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3 lg:grid-cols-5",
        className,
      )}
    >
      {items.map((stat, i) => (
        <Reveal
          key={stat.label}
          delay={i * 0.06}
          className="bg-surface px-5 py-8 text-center"
        >
          <div className="heading text-4xl text-gold-gradient sm:text-5xl">
            {stat.value}
          </div>
          <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-cream">
            {stat.label}
          </div>
          {withSub && (
            <p className="mt-2 text-xs leading-relaxed text-muted">{stat.sub}</p>
          )}
        </Reveal>
      ))}
    </div>
  );
}
