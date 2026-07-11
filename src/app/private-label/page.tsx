import type { Metadata } from "next";
import { PageHero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FeatureGrid } from "@/components/feature-grid";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { privateLabelServices, process } from "@/content/private-label";
import { getPageHero, getSection } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Private Label Solutions",
  description:
    "Your brand. Our expertise. End-to-end private label apparel manufacturing — from product development and custom branding to bulk production and global delivery.",
};

// Reads admin-editable content — always render fresh.
export const dynamic = "force-dynamic";

export default async function PrivateLabelPage() {
  const [hero, services, processSection] = await Promise.all([
    getPageHero("private-label"),
    getSection("private-label-services"),
    getSection("private-label-process"),
  ]);

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead ?? undefined} />

      <Section>
        <SectionHeading
          eyebrow={services.eyebrow ?? undefined}
          title={services.title}
          lead={services.lead ?? undefined}
        />
        <FeatureGrid items={privateLabelServices} columns={3} className="mt-12" />
      </Section>

      <Section className="border-y border-line bg-surface/40">
        <SectionHeading
          eyebrow={processSection.eyebrow ?? undefined}
          title={processSection.title}
          lead={processSection.lead ?? undefined}
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
