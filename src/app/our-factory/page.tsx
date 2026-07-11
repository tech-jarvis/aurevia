import type { Metadata } from "next";
import { PageHero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FeatureGrid } from "@/components/feature-grid";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { factoryStats, facilityHighlights } from "@/content/factory";
import { getPageHero, getSection } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Our Factory",
  description:
    "Inside Aurevia Global's manufacturing facility — advanced machinery, a skilled workforce and a logistics network built to deliver at scale.",
};

// Reads admin-editable content — always render fresh.
export const dynamic = "force-dynamic";

export default async function OurFactoryPage() {
  const [hero, numbers] = await Promise.all([
    getPageHero("our-factory"),
    getSection("our-factory-numbers"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead ?? undefined}
        image={
          hero.imageUrl
            ? { src: hero.imageUrl, alt: hero.imageAlt ?? "" }
            : undefined
        }
      />

      <Section>
        <SectionHeading
          eyebrow={numbers.eyebrow ?? undefined}
          title={numbers.title}
          align="center"
        />
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {factoryStats.map((stat, i) => (
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
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line bg-surface/40">
        <SectionHeading
          eyebrow="Inside the Facility"
          title="Built for scale, run with precision."
          lead="Every stage of production — from cutting to final packing — runs through a single, quality-controlled facility."
        />
        <FeatureGrid items={facilityHighlights} columns={4} className="mt-12" />
      </Section>

      <CtaSection
        title="Want to see it for yourself?"
        text="Schedule a tour of our facility, or tell us about your project and we'll walk you through how we'd produce it."
      />
    </>
  );
}
