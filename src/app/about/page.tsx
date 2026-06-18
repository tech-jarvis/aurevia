import type { Metadata } from "next";
import { Target, Compass } from "lucide-react";
import { PageHero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { StatGrid } from "@/components/stat-grid";
import { FeatureGrid } from "@/components/feature-grid";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { commitments } from "@/content/stats";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aurevia Global is a premium apparel manufacturer specializing in private label production, healthcare apparel, workwear and performance apparel for international markets.",
};

const commitmentItems = commitments.map((c) => ({
  icon: "BadgeCheck",
  title: c.title,
  text: c.text,
}));

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={<>We don&apos;t just manufacture apparel — we build partnerships.</>}
        lead="Aurevia Global is a premium apparel manufacturing company specializing in private label production, healthcare apparel, workwear and performance apparel for international markets."
      />

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
          eyebrow="By the Numbers"
          title="Built for scale. Engineered for excellence."
          align="center"
        />
        <StatGrid className="mt-12" />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Our Commitment to Excellence"
          title="The standards behind every order."
          lead="Six principles guide how we work with every client, on every project."
        />
        <FeatureGrid items={commitmentItems} columns={3} className="mt-12" />
      </Section>

      <CtaSection />
    </>
  );
}
