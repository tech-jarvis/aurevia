import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./ui/button";
import { Container } from "./ui/container";
import { Icon } from "./icon";
import { site } from "@/content/site";

const heroPills = [
  { icon: "HeartPulse", label: "Medical Apparel" },
  { icon: "HardHat", label: "Workwear" },
  { icon: "Activity", label: "Activewear" },
  { icon: "Tag", label: "Private Label" },
];

/** Home page hero. */
export function HomeHero() {
  return (
    <section className="bg-aura relative overflow-hidden">
      {/* faint grid + glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(70% 60% at 50% 30%, black, transparent)",
        }}
      />
      <Container className="relative flex min-h-[88vh] flex-col justify-center py-24">
        <div className="max-w-3xl">
          <span className="eyebrow inline-flex items-center gap-2">
            <span className="h-px w-8 bg-gold" />
            Premium Apparel Manufacturing
          </span>

          <h1 className="mt-6 heading text-6xl leading-[0.92] text-cream sm:text-7xl lg:text-8xl">
            Built to <span className="text-gold-gradient">Deliver</span>.
            <br />
            Made to <span className="text-gold-gradient">Lead</span>.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {site.name} partners with brands, distributors and retailers to
            produce premium medical apparel, workwear and activewear — at global
            standards for quality, consistency and performance.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/capabilities" variant="outline" size="lg">
              Our Capabilities
            </ButtonLink>
          </div>

          <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-4">
            {heroPills.map((pill) => (
              <li
                key={pill.label}
                className="inline-flex items-center gap-2 text-sm text-muted"
              >
                <Icon name={pill.icon} className="h-4 w-4 text-gold" strokeWidth={1.6} />
                {pill.label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/** Compact hero for inner pages. */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
}) {
  return (
    <section className="bg-aura border-b border-line">
      <Container className="py-24 sm:py-28">
        <div className="max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-5 heading text-5xl text-cream sm:text-6xl">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lg text-muted">{lead}</p>}
        </div>
      </Container>
    </section>
  );
}
