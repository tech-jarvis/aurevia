"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Mobile menu closes via link onClick handlers (see below) rather than an
// effect on pathname, to avoid synchronous setState in an effect.
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./logo";
import { ButtonLink } from "./ui/button";
import { Container } from "./ui/container";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader({ logoUrl }: { logoUrl?: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-line bg-ink/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo imageUrl={logoUrl} />

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.children?.some((c) => pathname === c.href) ?? false);
            return (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1 text-sm tracking-wide transition-colors",
                    active ? "text-gold" : "text-cream hover:text-gold",
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>

                {item.children && (
                  <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="overflow-hidden rounded-2xl border border-line bg-surface/95 p-2 shadow-2xl backdrop-blur-md">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-4 py-3 transition-colors hover:bg-surface-2"
                        >
                          <span className="block text-sm font-medium text-cream">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="mt-0.5 block text-xs text-muted">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/contact" size="md">
            Request a Quote
          </ButtonLink>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-cream lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-ink lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <div key={item.label} className="py-1">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block py-2 text-base text-cream hover:text-gold"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-3 flex flex-col border-l border-line pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMenu}
                        className="py-2 text-sm text-muted hover:text-gold"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <ButtonLink href="/contact" onClick={closeMenu} className="mt-3 w-full">
              Request a Quote
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
