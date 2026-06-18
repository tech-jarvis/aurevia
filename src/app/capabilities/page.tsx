import type { Metadata } from "next";
import { PageHero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FeatureGrid } from "@/components/feature-grid";
import { StatGrid } from "@/components/stat-grid";
import { CtaSection } from "@/components/cta-section";
import { capabilities } from "@/content/capabilities";

export const metadata: Metadata = {
  title: "Manufacturing Capabilities",
  description:
    "End-to-end apparel manufacturing: OEM & ODM production, product development, fabric sourcing, sampling, embroidery, printing, sublimation, quality assurance and global shipping.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing Capabilities"
        title="Built for scale. Engineered for excellence."
        lead="At Aurevia Global we offer end-to-end manufacturing solutions designed to support your brand at every stage of development and production."
      />

      <Section>
        <SectionHeading
          eyebrow="What We Do"
          title="Full-service apparel manufacturing."
          lead="Our modern facility is equipped with advanced machinery and a skilled workforce to deliver consistent quality and on-time delivery for brands worldwide."
        />
        <FeatureGrid items={capabilities} columns={3} className="mt-12" />
      </Section>

      <Section className="border-t border-line bg-surface/40">
        <SectionHeading
          eyebrow="Capacity"
          title="The scale behind your brand."
          align="center"
        />
        <StatGrid className="mt-12" />
      </Section>

      <CtaSection
        title="Ready to put our capabilities to work?"
        text="Tell us about your product and we'll map out the right manufacturing path — from sampling to global delivery."
      />
    </>
  );
}
