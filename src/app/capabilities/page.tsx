import type { Metadata } from "next";
import { PageHero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FeatureGrid } from "@/components/feature-grid";
import { StatGrid } from "@/components/stat-grid";
import { CtaSection } from "@/components/cta-section";
import { capabilities } from "@/content/capabilities";
import { getPageHero, getSection } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Manufacturing Capabilities",
  description:
    "End-to-end apparel manufacturing: OEM & ODM production, product development, fabric sourcing, sampling, embroidery, printing, sublimation, quality assurance and global shipping.",
};

// Reads admin-editable content — always render fresh.
export const dynamic = "force-dynamic";

export default async function CapabilitiesPage() {
  const [hero, what, capacity] = await Promise.all([
    getPageHero("capabilities"),
    getSection("capabilities-what"),
    getSection("capabilities-capacity"),
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
          eyebrow={what.eyebrow ?? undefined}
          title={what.title}
          lead={what.lead ?? undefined}
        />
        <FeatureGrid items={capabilities} columns={3} className="mt-12" />
      </Section>

      <Section className="border-t border-line bg-surface/40">
        <SectionHeading
          eyebrow={capacity.eyebrow ?? undefined}
          title={capacity.title}
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
