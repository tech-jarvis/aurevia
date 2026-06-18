import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "./ui/button";
import { Reveal } from "./ui/reveal";
import { type ProductLine } from "@/content/products";
import { cn } from "@/lib/utils";

/** Large card linking to a product line (Medical / Workwear / Active). */
export function ProductLineCard({
  line,
  index = 0,
}: {
  line: ProductLine;
  index?: number;
}) {
  return (
    <Reveal
      delay={index * 0.1}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface-2 p-8 transition-all hover:border-gold/40 hover:bg-surface"
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-light to-gold transition-transform duration-500 group-hover:scale-x-100",
        )}
      />
      <span className="eyebrow">{line.kicker}</span>
      <h3 className="mt-3 heading text-3xl text-cream">{line.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{line.intro}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {line.range.slice(0, 4).map((item) => (
          <li
            key={item.name}
            className="rounded-full border border-line px-3 py-1 text-xs text-muted"
          >
            {item.name}
          </li>
        ))}
      </ul>

      <ButtonLink
        href={`/products/${line.slug}`}
        variant="outline"
        className="mt-7 self-start"
      >
        Explore {line.name.replace("Aurevia ", "")}
        <ArrowUpRight className="h-4 w-4" />
      </ButtonLink>
    </Reveal>
  );
}
