import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { HomeHero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FeatureGrid } from "@/components/feature-grid";
import { ProductShowcaseCard } from "@/components/product-showcase-card";
import { StatSpotlight } from "@/components/stat-spotlight";
import { CtaSection } from "@/components/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/icon";
import { whyAurevia } from "@/content/capabilities";
import { regions } from "@/content/regions";
import { industries } from "@/content/industries";
import { factoryStats } from "@/content/factory";
import { getPageHero, getSection, getSiteImage } from "@/lib/site-content";

// Reads admin-editable content — always render fresh.
export const dynamic = "force-dynamic";

const processSteps = [
  { icon: "Lightbulb", title: "Develop", text: "Conceptualization & design" },
  { icon: "Layers", title: "Source", text: "Premium materials & trims" },
  { icon: "Factory", title: "Produce", text: "Precision manufacturing" },
  { icon: "Truck", title: "Deliver", text: "Reliable global logistics" },
];

export default async function HomePage() {
  const [
    hero,
    about,
    why,
    process,
    factory,
    global,
    aboutPhoto,
    processPhoto,
    factoryPhoto,
    medicalHero,
    workwearHero,
    activeHero,
    privateLabelCard,
  ] = await Promise.all([
    getPageHero("home"),
    getSection("home-about"),
    getSection("home-why"),
    getSection("home-process"),
    getSection("home-factory"),
    getSection("home-global"),
    getSiteImage("home-who-we-are"),
    getSiteImage("home-process"),
    getSiteImage("home-factory"),
    getPageHero("product-medical"),
    getPageHero("product-workwear"),
    getPageHero("product-active"),
    getSiteImage("home-card-private-label"),
  ]);

  const productCards = [
    { title: "Medical Apparel", href: "/products/medical", image: medicalHero.imageUrl, alt: medicalHero.imageAlt ?? "Aurevia Medical apparel" },
    { title: "Workwear", href: "/products/workwear", image: workwearHero.imageUrl, alt: workwearHero.imageAlt ?? "Aurevia Workwear apparel" },
    { title: "Active", href: "/products/active", image: activeHero.imageUrl, alt: activeHero.imageAlt ?? "Aurevia Active apparel" },
    { title: "Private Label", href: "/private-label", image: privateLabelCard?.url ?? null, alt: privateLabelCard?.alt ?? "Aurevia Global private label production" },
  ];

  return (
    <>
      <HomeHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        imageUrl={hero.imageUrl}
        imageAlt={hero.imageAlt}
      />

      {/* Who We Are */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.85fr_0.75fr]">
          <Reveal>
            <span className="eyebrow">{about.eyebrow}</span>
            <h2 className="mt-4 heading text-3xl text-cream sm:text-4xl">
              {about.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              {about.lead}
            </p>
            <ButtonLink
              href="/about"
              variant="ghost"
              className="!px-0 mt-8 uppercase tracking-[0.15em]"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>

          {aboutPhoto && (
            <Reveal delay={0.08} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
              <Image
                src={aboutPhoto.url}
                alt={aboutPhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
            </Reveal>
          )}

          <StatSpotlight />
        </div>
      </Section>

      {/* Product lines */}
      <Section className="border-y border-line bg-surface/40">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productCards.map((card, i) => (
            <ProductShowcaseCard
              key={card.title}
              index={i + 1}
              title={card.title}
              href={card.href}
              imageUrl={card.image}
              imageAlt={card.alt}
              delay={i * 0.08}
            />
          ))}
        </div>
      </Section>

      {/* Our process */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">{process.eyebrow}</span>
            <h2 className="mt-4 heading text-3xl text-cream sm:text-4xl">
              {process.title}
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-6">
              {processSteps.map((step) => (
                <div key={step.title}>
                  <Icon name={step.icon} className="h-6 w-6 text-gold" strokeWidth={1.6} />
                  <h3 className="mt-3 heading text-sm tracking-wide text-cream">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{step.text}</p>
                </div>
              ))}
            </div>

            <ButtonLink
              href="/private-label"
              variant="ghost"
              className="!px-0 mt-8 uppercase tracking-[0.15em]"
            >
              Explore Our Process
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>

          {processPhoto && (
            <Reveal delay={0.08} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              <Image
                src={processPhoto.url}
                alt={processPhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          )}
        </div>
      </Section>

      {/* Why Aurevia */}
      <Section className="border-t border-line bg-surface/40">
        <SectionHeading
          eyebrow={why.eyebrow ?? undefined}
          title={why.title}
          lead={why.lead ?? undefined}
        />
        <FeatureGrid items={whyAurevia} columns={3} className="mt-12" />
      </Section>

      {/* Our Factory */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">{factory.eyebrow}</span>
            <h2 className="mt-4 heading text-3xl text-cream sm:text-4xl">
              {factory.title}
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {factoryStats.map((stat) => (
                <div key={stat.label}>
                  <div className="heading text-2xl text-gold-gradient sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted">{stat.label}</div>
                </div>
              ))}
            </div>

            <ButtonLink
              href="/our-factory"
              variant="ghost"
              className="!px-0 mt-8 uppercase tracking-[0.15em]"
            >
              Take a Tour
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>

          {factoryPhoto && (
            <Reveal delay={0.08} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              <Image
                src={factoryPhoto.url}
                alt={factoryPhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          )}
        </div>
      </Section>

      {/* Global reach */}
      <Section className="border-t border-line bg-surface/40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <Reveal>
            <span className="eyebrow">{global.eyebrow}</span>
            <h2 className="mt-4 heading text-3xl text-cream sm:text-4xl">
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
        <p className="text-center text-xs uppercase tracking-[0.3em] text-faint">
          Trusted across industries worldwide
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wide text-muted"
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
