import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/content/site";
import { getSiteImage } from "@/lib/site-content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "apparel manufacturing",
    "private label clothing",
    "medical scrubs manufacturer",
    "workwear manufacturer",
    "activewear manufacturer",
    "OEM ODM apparel",
    "uniform manufacturer",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logo = await getSiteImage("logo");

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-cream">
        <SiteHeader logoUrl={logo?.url} />
        <main className="flex-1">{children}</main>
        <SiteFooter logoUrl={logo?.url} />
      </body>
    </html>
  );
}
