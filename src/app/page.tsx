import { ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { StatGrid } from "@/components/stat-grid";
import { FeatureGrid } from "@/components/feature-grid";
import { ProductLineCard } from "@/components/product-card";
import { CtaSection } from "@/components/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/icon";
import { whyAurevia } from "@/content/capabilities";
import { productOrder, productLines } from "@/content/products";
import { regions } from "@/content/regions";
import { industries } from "@/content/industries";
import { getPageHero, getSection, pageHeroDefaults } from "@/lib/site-content";

// Reads admin-editable content — always render fresh.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [hero, about, why, products, global] = await Promise.all([
    getPageHero("home"),
    getSection("home-about"),
    getSection("home-why"),
    getSection("home-products"),
    getSection("home-global"),
  ]);

  return (
    <>
      <HomeHero
        override={{
          eyebrow: hero.eyebrow,
          // Keep the styled two-line headline unless an admin has actually changed it.
          title: hero.title === pageHeroDefaults.home.title ? "" : hero.title,
          lead: hero.lead,
        }}
      />

      {/* Stats */}
      <Section className="pt-16 sm:pt-20">
        <StatGrid withSub />
      </Section>

      {/* About teaser */}
      <Section className="py-0">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">{about.eyebrow}</span>
            <h2 className="mt-4 heading text-4xl text-cream sm:text-5xl">
              {about.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              {about.lead}
            </p>
            <ButtonLink href="/about" variant="outline" className="mt-8">
              More About Us
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            {[
              { k: "End-to-end", v: "OEM & ODM solutions" },
              { k: "1M+", v: "Pieces produced monthly" },
              { k: "30+", v: "Countries served" },
              { k: "100%", v: "Quality-focused process" },
            ].map((c) => (
              <div
                key={c.v}
                className="rounded-2xl border border-line bg-surface-2/60 p-6"
              >
                <div className="heading text-2xl text-gold-gradient">{c.k}</div>
                <div className="mt-1 text-sm text-muted">{c.v}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Why Aurevia */}
      <Section>
        <SectionHeading
          eyebrow={why.eyebrow ?? undefined}
          title={why.title}
          lead={why.lead ?? undefined}
        />
        <FeatureGrid items={whyAurevia} columns={3} className="mt-12" />
      </Section>

      {/* Product lines */}
      <Section className="border-y border-line bg-surface/40">
        <SectionHeading
          eyebrow={products.eyebrow ?? undefined}
          title={products.title}
          lead={products.lead ?? undefined}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {productOrder.map((slug, i) => (
            <ProductLineCard key={slug} line={productLines[slug]} index={i} />
          ))}
        </div>
        <Reveal className="mt-10 flex justify-center">
          <ButtonLink href="/private-label" variant="ghost">
            Explore Private Label Solutions
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </Section>

      {/* Global reach */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <Reveal>
            <span className="eyebrow">{global.eyebrow}</span>
            <h2 className="mt-4 heading text-4xl text-cream sm:text-5xl">
              {global.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              {global.lead}
            </p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {regions.map((region, i) => (
              <Reveal
                key={region.name}
                delay={(i % 2) * 0.08}
                className="bg-surface p-6"
              >
                <div className="flex items-center gap-2 text-gold">
                  <Icon name="MapPin" className="h-4 w-4" />
                  <h3 className="heading text-sm tracking-wide text-cream">
                    {region.name}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-muted">{region.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Industries served */}
      <Section className="border-t border-line py-16">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-faint">
          Trusted across industries worldwide
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="inline-flex items-center gap-2 text-sm text-muted"
            >
              <Icon name={ind.icon} className="h-5 w-5 text-gold/80" strokeWidth={1.5} />
              {ind.name}
            </div>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
