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

export default async function ProductCategoryPage({ params }: Params) {
  const { category } = await params;
  const line = productLines[category as ProductCategory];
  if (!line) notFound();

  const others = productOrder.filter((s) => s !== line.slug);

  return (
    <>
      <PageHero
        eyebrow={line.kicker}
        title={line.name}
        lead={line.intro}
        image={{ src: line.image, alt: `${line.name} apparel` }}
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

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          {/* Range */}
          <div>
            <SectionHeading
              eyebrow={`Our ${line.name.replace("Aurevia ", "")} Range`}
              title="Engineered for the job."
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
