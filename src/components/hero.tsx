import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./ui/button";
import { Container } from "./ui/container";
import { LogoMark } from "./logo";

/** Home page hero: big headline + factory photo, sourced from admin-editable content. */
export function HomeHero({
  eyebrow,
  title,
  lead,
  imageUrl,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  lead: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
}) {
  return (
    <section className="bg-aura relative overflow-hidden border-b border-line">
      <Container className="relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-24">
        <div>
          {eyebrow && (
            <span className="eyebrow inline-flex items-center gap-2">
              <span className="h-px w-8 bg-gold" />
              {eyebrow}
            </span>
          )}

          <h1 className="mt-5 heading text-5xl leading-[0.95] text-cream sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          {lead && (
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {lead}
            </p>
          )}

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" size="lg">
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href="/capabilities"
              variant="ghost"
              className="!px-0 uppercase tracking-[0.15em]"
            >
              Discover Our Capabilities
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line sm:aspect-[5/6] lg:aspect-[4/5]">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={imageAlt ?? ""}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
              <LogoMark className="h-16 w-auto sm:h-20" />
            </div>
          </div>

          {/* Decorative vertical "scroll down" label, matches the reference layout. */}
          <span
            aria-hidden
            className="absolute -right-6 bottom-6 hidden text-[10px] uppercase tracking-[0.35em] text-faint [writing-mode:vertical-rl] lg:block"
          >
            Scroll Down
          </span>
        </div>
      </Container>
    </section>
  );
}

/** Compact hero for inner pages. Pass `image` for a split text/photo layout. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="bg-aura border-b border-line">
      <Container
        className={
          image
            ? "grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2"
            : "py-24 sm:py-28"
        }
      >
        <div className="max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-5 heading text-5xl text-cream sm:text-6xl">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lg text-muted">{lead}</p>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </div>
        )}
      </Container>
    </section>
  );
}
