import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { CtaSection } from "@/components/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/icon";
import {
  productLines,
  productOrder,
  type ProductCategory,
} from "@/content/products";
import Image from "next/image";
import {
  getPageHero,
  getSection,
  type PageHeroKey,
  type SectionKey,
} from "@/lib/site-content";
import { productItems } from "@/content/product-items";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return productOrder.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const line = productLines[category as ProductCategory];
  if (!line) return {};
  return {
    title: line.name,
    description: line.intro,
  };
}

// Reads admin-editable content — always render fresh.
export const dynamic = "force-dynamic";

export default async function ProductCategoryPage({ params }: Params) {
  const { category } = await params;
  const line = productLines[category as ProductCategory];
  if (!line) notFound();

  const others = productOrder.filter((s) => s !== line.slug);
  const [hero, range, featured] = await Promise.all([
    getPageHero(`product-${line.slug}` as PageHeroKey),
    getSection(`product-${line.slug}-range` as SectionKey),
    getPageHero(`product-item-${line.slug}` as PageHeroKey),
  ]);
  const featuredSlug = productItems[line.slug].slug;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead ?? undefined}
        image={
          hero.imageUrl
            ? { src: hero.imageUrl, alt: hero.imageAlt ?? `${line.name} apparel` }
            : undefined
        }
      />

      {/* highlight pills */}
      <Section className="py-12">
        <div className="flex flex-wrap gap-3">
          {line.highlights.map((h) => (
            <span
              key={h.title}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2/60 px-4 py-2 text-sm text-cream"
            >
              <Icon name={h.icon} className="h-4 w-4 text-gold" strokeWidth={1.6} />
              {h.title}
            </span>
          ))}
        </div>
      </Section>

      {/* Featured product */}
      <Section className="pt-0">
        <Reveal className="group grid overflow-hidden rounded-3xl border border-line bg-surface-2/60 transition-colors hover:border-gold/40 sm:grid-cols-[1fr_1.3fr]">
          <div className="relative aspect-[4/3] sm:aspect-auto">
            {featured.imageUrl && (
              <Image
                src={featured.imageUrl}
                alt={featured.imageAlt ?? featured.title}
                fill
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <span className="eyebrow">Featured Product</span>
            <h3 className="mt-3 heading text-2xl text-cream sm:text-3xl">
              {featured.title}
            </h3>
            {featured.lead && (
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                {featured.lead}
              </p>
            )}
            <ButtonLink
              href={`/products/${line.slug}/${featuredSlug}`}
              variant="outline"
              className="mt-6 self-start"
            >
              View Product Details
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          {/* Range */}
          <div>
            <SectionHeading
              eyebrow={range.eyebrow ?? undefined}
              title={range.title}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {line.range.map((item, i) => (
                <Reveal
                  key={item.name}
                  delay={(i % 2) * 0.08}
                  className="rounded-2xl border border-line bg-surface-2/60 p-6 transition-colors hover:border-gold/40"
                >
                  <h3 className="heading text-lg text-cream">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Key features */}
          <Reveal className="rounded-3xl border border-line bg-surface p-8 lg:sticky lg:top-28">
            <span className="eyebrow">Key Features</span>
            <ul className="mt-6 flex flex-col gap-6">
              {line.features.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold">
                    <Icon name={f.icon} className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h4 className="heading text-sm tracking-wide text-cream">
                      {f.title}
                    </h4>
                    <p className="mt-1 text-sm text-muted">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact" className="mt-8 w-full">
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* Explore other lines */}
      <Section className="border-t border-line bg-surface/40 py-16">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="heading text-2xl text-cream">Explore other lines</h2>
          <div className="flex flex-wrap gap-3">
            {others.map((slug) => (
              <Link
                key={slug}
                href={`/products/${slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
              >
                {productLines[slug].name}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
            <Link
              href="/private-label"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Private Label
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
