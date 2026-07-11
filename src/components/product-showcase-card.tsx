import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./ui/reveal";

/** Full-bleed numbered image card used in the home page product row. */
export function ProductShowcaseCard({
  index,
  title,
  href,
  imageUrl,
  imageAlt,
  delay = 0,
}: {
  index: number;
  title: string;
  href: string;
  imageUrl: string | null;
  imageAlt: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="group relative">
      <Link
        href={href}
        className="relative block aspect-[3/4] overflow-hidden rounded-2xl border border-line"
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

        <span className="absolute left-6 top-6 heading text-sm text-gold">
          {String(index).padStart(2, "0")}
        </span>

        <div className="absolute inset-x-6 bottom-6">
          <h3 className="heading text-2xl text-cream">{title}</h3>
          <span className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream/80 transition-colors group-hover:text-gold">
            View Collection
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
