import { Icon } from "./icon";
import { Reveal } from "./ui/reveal";
import { cn } from "@/lib/utils";

export type FeatureItem = { icon: string; title: string; text?: string };

/** Grid of icon + title + text cards. Used for capabilities, why-us, features. */
export function FeatureGrid({
  items,
  columns = 3,
  className,
}: {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={cn("grid grid-cols-1 gap-4", cols, className)}>
      {items.map((item, i) => (
        <Reveal
          key={item.title}
          delay={(i % 3) * 0.08}
          className="group rounded-2xl border border-line bg-surface-2/60 p-6 transition-colors hover:border-gold/40"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold transition-colors group-hover:bg-gold/10">
            <Icon name={item.icon} className="h-6 w-6" strokeWidth={1.6} />
          </div>
          <h3 className="heading text-base tracking-wide text-cream">
            {item.title}
          </h3>
          {item.text && (
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
          )}
        </Reveal>
      ))}
    </div>
  );
}
