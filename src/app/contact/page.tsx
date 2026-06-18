import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/hero";
import { Section } from "@/components/ui/section";
import { QuoteForm } from "@/components/quote-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description:
    "Get in touch with Aurevia Global. Request a quote for medical apparel, workwear, activewear or private label manufacturing.",
};

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    icon: MapPin,
    label: "Head Office",
    value: `${site.address.line1}, ${site.address.line2}, ${site.address.country}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri, 9:00–18:00 (EST)",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Let's Build Something Great Together"
        title="Request a Quote"
        lead="Whether you're launching a new brand or expanding your product line, tell us what you need and our team will respond promptly."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Contact info */}
          <div className="flex flex-col gap-4">
            <span className="eyebrow">In Touch</span>
            <h2 className="heading text-3xl text-cream">
              Talk to our team.
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              Share a few details about your project and we&apos;ll get back to
              you with next steps — from sampling to production and delivery.
            </p>

            <ul className="mt-4 flex flex-col gap-3">
              {contactCards.map((c) => {
                const inner = (
                  <div className="flex items-start gap-4 rounded-2xl border border-line bg-surface-2/60 p-5 transition-colors hover:border-gold/40">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold">
                      <c.icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-faint">
                        {c.label}
                      </div>
                      <div className="mt-0.5 text-sm text-cream">{c.value}</div>
                    </div>
                  </div>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a href={c.href} className="block">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-10">
            <QuoteForm />
          </div>
        </div>
      </Section>
    </>
  );
}
