import type { Metadata } from "next";
import { PageHero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FeatureGrid } from "@/components/feature-grid";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { privateLabelServices, process } from "@/content/private-label";

export const metadata: Metadata = {
  title: "Private Label Solutions",
  description:
    "Your brand. Our expertise. End-to-end private label apparel manufacturing — from product development and custom branding to bulk production and global delivery.",
};

export default function PrivateLabelPage() {
  return (
    <>
      <PageHero
        eyebrow="Private Label Solutions"
        title={<>Your brand. Our expertise.</>}
        lead="We help brands bring their vision to life with comprehensive private label solutions — from design to delivery, we handle every detail so you can focus on growing your brand."
      />

      <Section>
        <SectionHeading
          eyebrow="Services We Include"
          title="Everything your brand needs."
          lead="A complete private label service designed to make launching and scaling your apparel line seamless."
        />
        <FeatureGrid items={privateLabelServices} columns={3} className="mt-12" />
      </Section>

      <Section className="border-y border-line bg-surface/40">
        <SectionHeading
          eyebrow="From Concept to Delivery"
          title="Built for your brand. Made for the world."
          lead="A proven eight-step process that turns your idea into a market-ready product, delivered on time, anywhere."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal
              key={p.step}
              delay={(i % 4) * 0.06}
              as="li"
              className="relative rounded-2xl border border-line bg-surface-2/60 p-6"
            >
              <span className="heading text-3xl text-gold-gradient">{p.step}</span>
              <h3 className="mt-3 heading text-base text-cream">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaSection
        title="Let's build your brand."
        text="Share your concept and we'll handle development, production, branding and delivery — end to end."
      />
    </>
  );
}
