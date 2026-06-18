import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./ui/button";
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";
import { site } from "@/content/site";

/** Closing call-to-action band used at the bottom of most pages. */
export function CtaSection({
  title = "Let's build something great together.",
  text = "Whether you're launching a new brand or expanding your product line, Aurevia Global is your trusted manufacturing partner.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-aura border-t border-line">
      <Container className="py-24 text-center">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <span className="eyebrow">{site.tagline}</span>
          <h2 className="heading text-4xl text-cream sm:text-5xl">{title}</h2>
          <p className="text-base text-muted sm:text-lg">{text}</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="outline" size="lg">
              {site.email}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
