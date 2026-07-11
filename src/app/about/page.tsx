import type { Metadata } from "next";
import Image from "next/image";
import { Target, Compass } from "lucide-react";
import { PageHero } from "@/components/hero";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { StatGrid } from "@/components/stat-grid";
import { FeatureGrid } from "@/components/feature-grid";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { commitments } from "@/content/stats";
import { getPageHero, getSection, getSiteImage } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aurevia Global is a premium apparel manufacturer specializing in private label production, healthcare apparel, workwear and performance apparel for international markets.",
};

// Reads admin-editable content — always render fresh.
export const dynamic = "force-dynamic";

const commitmentItems = commitments.map((c) => ({
  icon: "BadgeCheck",
  title: c.title,
  text: c.text,
}));

export default async function AboutPage() {
  const [hero, numbers, commitment, facilityPhoto] = await Promise.all([
    getPageHero("about"),
    getSection("about-numbers"),
    getSection("about-commitment"),
    getSiteImage("about-factory-aisle"),
  ]);

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead ?? undefined} />

      {facilityPhoto && (
        <Container className="-mt-8">
          <div className="relative aspect-[21/7] overflow-hidden rounded-3xl border border-line">
            <Image
              src={facilityPhoto.url}
              alt={facilityPhoto.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>
        </Container>
      )}

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Who We Are</span>
            <div className="mt-5 space-y-5 text-base leading-relaxed text-muted">
              <p>
                We partner with brands, distributors, wholesalers, healthcare
                institutions and retailers to deliver apparel solutions that meet
                global standards for quality, consistency and performance.
              </p>
              <p>
                With a commitment to precision manufacturing and scalable
                production, Aurevia Global helps businesses transform concepts
                into market-ready products — built to deliver, made to lead.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5">
            <Reveal className="rounded-3xl border border-line bg-surface-2/60 p-8">
              <div className="flex items-center gap-3 text-gold">
                <Compass className="h-6 w-6" strokeWidth={1.6} />
                <h3 className="heading text-xl text-cream">Our Vision</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                To become a globally recognized apparel manufacturing partner
                trusted for innovation, reliability and excellence.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="rounded-3xl border border-line bg-surface-2/60 p-8">
              <div className="flex items-center gap-3 text-gold">
                <Target className="h-6 w-6" strokeWidth={1.6} />
                <h3 className="heading text-xl text-cream">Our Mission</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                To provide world-class apparel manufacturing solutions through
                quality craftsmanship, modern production processes and
                customer-focused service.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="border-y border-line bg-surface/40">
        <SectionHeading
          eyebrow={numbers.eyebrow ?? undefined}
          title={numbers.title}
          align="center"
        />
        <StatGrid className="mt-12" />
      </Section>

      <Section>
        <SectionHeading
          eyebrow={commitment.eyebrow ?? undefined}
          title={commitment.title}
          lead={commitment.lead ?? undefined}
        />
        <FeatureGrid items={commitmentItems} columns={3} className="mt-12" />
      </Section>

      <CtaSection />
    </>
  );
}
