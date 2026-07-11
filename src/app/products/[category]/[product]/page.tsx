import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/icon";
import { ButtonLink } from "@/components/ui/button";
import { CtaSection } from "@/components/cta-section";
import { ProductGallery } from "@/components/product-gallery";
import { productLines, productOrder, type ProductCategory } from "@/content/products";
import { productItems } from "@/content/product-items";
import {
  getPageHero,
  getSection,
  getSiteImage,
  type PageHeroKey,
  type ImageKey,
} from "@/lib/site-content";

type Params = { params: Promise<{ category: string; product: string }> };

export function generateStaticParams() {
  return productOrder.map((category) => ({
    category,
    product: productItems[category].slug,
  }));
}

function resolve(category: string, product: string) {
  const line = productLines[category as ProductCategory];
  const item = line ? productItems[line.slug] : undefined;
  if (!line || !item || item.slug !== product) return null;
  return { line, item };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category, product } = await params;
  const resolved = resolve(category, product);
  if (!resolved) return {};
  const hero = await getPageHero(`product-item-${resolved.line.slug}` as PageHeroKey);
  return { title: hero.title, description: hero.lead ?? undefined };
}

// Reads admin-editable content — always render fresh.
export const dynamic = "force-dynamic";

export default async function ProductItemPage({ params }: Params) {
  const { category, product } = await params;
  const resolved = resolve(category, product);
  if (!resolved) notFound();
  const { line, item } = resolved;

  const [
    hero,
    engineeredSection,
    fabricSection,
    journeySection,
    colorsSection,
    detailPhoto,
    fabric1,
    fabric2,
    ...journeyPhotos
  ] = await Promise.all([
    getPageHero(`product-item-${line.slug}` as PageHeroKey),
    getSection("product-item-engineered"),
    getSection("product-item-fabric"),
    getSection("product-item-journey"),
    getSection("product-item-colors"),
    getSiteImage(`product-item-${line.slug}-detail` as ImageKey),
    getSiteImage("product-item-fabric-1"),
    getSiteImage("product-item-fabric-2"),
    ...item.journey.map((_, i) =>
      getSiteImage(`product-item-journey-${i + 1}` as ImageKey),
    ),
  ]);

  const galleryImages = [
    { url: hero.imageUrl, alt: hero.imageAlt ?? hero.title },
    detailPhoto && { url: detailPhoto.url, alt: detailPhoto.alt },
    fabric1 && { url: fabric1.url, alt: fabric1.alt },
    fabric2 && { url: fabric2.url, alt: fabric2.alt },
  ].filter((img): img is { url: string; alt: string } => Boolean(img?.url));

  return (
    <>
      <Section className="border-b border-line pb-10 pt-10 sm:pt-12">
        <Link
          href={`/products/${line.slug}`}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1 className="mt-4 heading text-5xl leading-[0.95] text-cream sm:text-6xl">
              {hero.title}
            </h1>
            {hero.lead && (
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                {hero.lead}
              </p>
            )}

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {item.badges.map((badge) => (
                <div key={badge.label} className="flex flex-col items-start gap-2">
                  <Icon name={badge.icon} className="h-5 w-5 text-gold" strokeWidth={1.6} />
                  <span className="text-xs text-muted">{badge.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact" size="lg">
                Request Samples
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="lg">
                Download Spec Sheet
                <Download className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ProductGallery images={galleryImages} />
          </Reveal>
        </div>
      </Section>

      {/* Engineered details */}
      <Section className="border-b border-line bg-surface/40">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">{engineeredSection.eyebrow}</span>
            <h2 className="mt-4 heading text-3xl text-cream sm:text-4xl">
              {engineeredSection.title}
            </h2>
            {engineeredSection.lead && (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {engineeredSection.lead}
              </p>
            )}
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2">
            {detailPhoto && (
              <div className="relative col-span-full aspect-[16/9] overflow-hidden rounded-2xl border border-line">
                <Image
                  src={detailPhoto.url}
                  alt={detailPhoto.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            )}
            {item.engineeredDetails.map((detail) => (
              <Reveal key={detail.number} className="flex gap-4">
                <span className="heading text-xl text-gold">{detail.number}</span>
                <div>
                  <h3 className="heading text-sm tracking-wide text-cream">
                    {detail.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {detail.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Premium fabric */}
      <Section className="border-b border-line">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr_1fr] lg:items-center">
          {fabric1 && (
            <Reveal className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl border border-line lg:block">
              <Image
                src={fabric1.url}
                alt={fabric1.alt}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <span className="eyebrow">{fabricSection.eyebrow}</span>
            <h2 className="mt-4 heading text-3xl text-cream sm:text-4xl">
              {fabricSection.title}
            </h2>

            <div className="mt-6 heading text-5xl text-gold-gradient">
              {item.fabric.gsm}
              <span className="ml-2 text-lg text-muted">GSM</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {item.fabric.composition.map((c) => (
                <div key={c.label}>
                  <span className="heading text-2xl text-gold">{c.percent}</span>
                  <span className="ml-2 text-xs uppercase tracking-wide text-muted">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              {item.fabric.features.map((f) => (
                <div key={f.label} className="flex items-center gap-2">
                  <Icon name={f.icon} className="h-4 w-4 text-gold" strokeWidth={1.6} />
                  <span className="text-xs text-muted">{f.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {fabric2 && (
            <Reveal delay={0.1} className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl border border-line lg:block">
              <Image
                src={fabric2.url}
                alt={fabric2.alt}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </Reveal>
          )}
        </div>
      </Section>

      {/* Manufacturing journey */}
      <Section className="border-b border-line bg-surface/40">
        <SectionHeading
          eyebrow={journeySection.eyebrow ?? undefined}
          title={journeySection.title}
        />
        <div className="mt-10 -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-8">
          {item.journey.map((step, i) => {
            const photo = journeyPhotos[i];
            return (
              <Reveal
                key={step.step}
                delay={(i % 4) * 0.05}
                className="w-28 shrink-0 sm:w-auto"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl border border-line">
                  {photo && (
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="mt-2 text-xs text-gold">{step.step}</div>
                <div className="text-xs uppercase tracking-wide text-cream">
                  {step.label}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Size chart + colors */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <span className="eyebrow">Technical Details</span>
            <h2 className="mt-4 heading text-2xl text-cream sm:text-3xl">
              Measurements (cm)
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs uppercase tracking-wide text-faint">
                    <th className="py-2 pr-4 font-medium">Measurement</th>
                    {item.sizeChart.sizes.map((size) => (
                      <th key={size} className="px-3 py-2 font-medium">
                        {size}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.sizeChart.rows.map((row) => (
                    <tr key={row.label} className="border-b border-line/60">
                      <td className="py-3 pr-4 text-muted">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="px-3 py-3 text-cream">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <span className="eyebrow">{colorsSection.eyebrow}</span>
            <h2 className="mt-4 heading text-2xl text-cream sm:text-3xl">
              {colorsSection.title}
            </h2>
            <div className="mt-6 flex flex-wrap gap-4">
              {item.colors.map((color) => (
                <div key={color.name} className="flex flex-col items-center gap-2">
                  <span
                    className="h-12 w-12 rounded-full border border-line-strong"
                    style={{ backgroundColor: color.hex }}
                    aria-hidden
                  />
                  <span className="text-xs text-muted">{color.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaSection
        title="Ready to elevate your brand?"
        text={`Partner with Aurevia Global for premium ${line.name.replace("Aurevia ", "").toLowerCase()} production, reliable quality and on-time delivery.`}
      />
    </>
  );
}
