import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./logo";
import { Container } from "./ui/container";
import { site, nav } from "@/content/site";
import { productOrder, productLines } from "@/content/products";

export function SiteFooter({ logoUrl }: { logoUrl?: string | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Logo imageUrl={logoUrl} />
            <p className="max-w-xs text-sm text-muted">{site.description}</p>
            <p className="eyebrow text-gold">{site.tagline}</p>
          </div>

          <div>
            <h3 className="heading mb-4 text-xs tracking-[0.25em] text-cream">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="heading mb-4 text-xs tracking-[0.25em] text-cream">
              Products
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted">
              {productOrder.map((slug) => (
                <li key={slug}>
                  <Link href={`/products/${slug}`} className="hover:text-gold">
                    {productLines[slug].name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/private-label" className="hover:text-gold">
                  Private Label Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="heading mb-4 text-xs tracking-[0.25em] text-cream">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${site.email}`} className="hover:text-gold">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={site.phoneHref} className="hover:text-gold">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}, {site.address.country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-faint">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-faint hover:text-gold"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
