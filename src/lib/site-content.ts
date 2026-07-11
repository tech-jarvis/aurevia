/**
 * Admin-editable page heroes, section headings and standalone images.
 * Defaults below are the site's original copy/photos; an admin edit stores an
 * override row in Postgres (PageHero / SectionHeading / SiteImage) which,
 * when present, takes precedence over the default.
 */

import { prisma } from "@/lib/db";

export type PageHeroKey =
  | "home"
  | "about"
  | "capabilities"
  | "private-label"
  | "contact"
  | "our-factory"
  | "product-medical"
  | "product-workwear"
  | "product-active";

export type PageHeroContent = {
  eyebrow: string;
  title: string;
  lead: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
};

export const pageHeroLabels: Record<PageHeroKey, string> = {
  home: "Home — Hero",
  about: "About — Hero",
  capabilities: "Capabilities — Hero",
  "private-label": "Private Label — Hero",
  contact: "Contact — Hero",
  "our-factory": "Our Factory — Hero",
  "product-medical": "Products / Medical — Hero",
  "product-workwear": "Products / Workwear — Hero",
  "product-active": "Products / Active — Hero",
};

export const pageHeroDefaults: Record<PageHeroKey, PageHeroContent> = {
  home: {
    eyebrow: "Premium Apparel Manufacturing",
    title: "Manufacturing Without Compromise",
    lead: "Premium apparel manufacturing built on precision, innovation and integrity.",
    imageUrl: "/photos/factory-aisle.jpg",
    imageAlt: "Aurevia Global manufacturing facility",
  },
  about: {
    eyebrow: "About Us",
    title: "We don't just manufacture apparel — we build partnerships.",
    lead: "Aurevia Global is a premium apparel manufacturing company specializing in private label production, healthcare apparel, workwear and performance apparel for international markets.",
    imageUrl: null,
    imageAlt: null,
  },
  capabilities: {
    eyebrow: "Manufacturing Capabilities",
    title: "Built for scale. Engineered for excellence.",
    lead: "At Aurevia Global we offer end-to-end manufacturing solutions designed to support your brand at every stage of development and production.",
    imageUrl: "/photos/factory-worker.jpg",
    imageAlt: "Aurevia Global production floor",
  },
  "private-label": {
    eyebrow: "Private Label Solutions",
    title: "Your brand. Our expertise.",
    lead: "We help brands bring their vision to life with comprehensive private label solutions — from design to delivery, we handle every detail so you can focus on growing your brand.",
    imageUrl: null,
    imageAlt: null,
  },
  contact: {
    eyebrow: "Let's Build Something Great Together",
    title: "Request a Quote",
    lead: "Whether you're launching a new brand or expanding your product line, tell us what you need and our team will respond promptly.",
    imageUrl: null,
    imageAlt: null,
  },
  "product-medical": {
    eyebrow: "Engineered for Healthcare Professionals",
    title: "Aurevia Medical",
    lead: "Our medical apparel is designed to meet the demanding needs of healthcare environments while ensuring comfort, durability and a professional appearance.",
    imageUrl: "/photos/medical.jpg",
    imageAlt: "Aurevia Medical apparel",
  },
  "product-workwear": {
    eyebrow: "Built for Performance. Made to Last.",
    title: "Aurevia Workwear",
    lead: "Our workwear and uniform solutions are designed to deliver durability, comfort and a professional look across a wide range of industries and working environments.",
    imageUrl: "/photos/workwear.jpg",
    imageAlt: "Aurevia Workwear apparel",
  },
  "product-active": {
    eyebrow: "Performance Driven. Designed to Move.",
    title: "Aurevia Active",
    lead: "Our activewear is engineered for performance, comfort and durability. Whether it's training, competition or everyday performance, Aurevia Active keeps you ahead.",
    imageUrl: "/photos/active.jpg",
    imageAlt: "Aurevia Active apparel",
  },
  "our-factory": {
    eyebrow: "Our Factory",
    title: "Infrastructure That Delivers",
    lead: "A modern manufacturing facility built for scale — advanced machinery, skilled teams and a logistics network that gets your order where it needs to be, on time.",
    imageUrl: "/photos/factory-aisle.jpg",
    imageAlt: "Aurevia Global factory floor",
  },
};

export type SectionKey =
  | "home-about"
  | "home-why"
  | "home-products"
  | "home-process"
  | "home-factory"
  | "home-global"
  | "about-numbers"
  | "about-commitment"
  | "capabilities-what"
  | "capabilities-capacity"
  | "private-label-services"
  | "private-label-process"
  | "product-medical-range"
  | "product-workwear-range"
  | "product-active-range"
  | "our-factory-numbers";

export type SectionContent = {
  eyebrow: string | null;
  title: string;
  lead: string | null;
};

export const sectionLabels: Record<SectionKey, string> = {
  "home-about": "Home — Who We Are",
  "home-why": "Home — Why Aurevia",
  "home-products": "Home — Product Lines",
  "home-process": "Home — Our Process",
  "home-factory": "Home — Our Factory Teaser",
  "home-global": "Home — Global Reach",
  "about-numbers": "About — By the Numbers",
  "about-commitment": "About — Our Commitment",
  "capabilities-what": "Capabilities — What We Do",
  "capabilities-capacity": "Capabilities — Capacity",
  "private-label-services": "Private Label — Services We Include",
  "private-label-process": "Private Label — From Concept to Delivery",
  "product-medical-range": "Products / Medical — Range",
  "product-workwear-range": "Products / Workwear — Range",
  "product-active-range": "Products / Active — Range",
  "our-factory-numbers": "Our Factory — By the Numbers",
};

export const sectionDefaults: Record<SectionKey, SectionContent> = {
  "home-about": {
    eyebrow: "Who We Are",
    title: "Built on Experience. Driven by Performance.",
    lead: "Aurevia Global is a premium apparel manufacturing company delivering world-class quality for global brands. From concept to production, we build partnerships that last.",
  },
  "home-why": {
    eyebrow: "Why Aurevia Global?",
    title: "Your growth is our purpose.",
    lead: "We combine advanced manufacturing, skilled craftsmanship and customer-focused solutions to deliver premium apparel that meets global expectations.",
  },
  "home-products": {
    eyebrow: "Product Lines",
    title: "Apparel for every industry.",
    lead: "End-to-end manufacturing across three specialized lines, plus full private label solutions.",
  },
  "home-global": {
    eyebrow: "Global Reach. Local Commitment.",
    title: "World-class manufacturing, delivered worldwide.",
    lead: "With a strong global network and a customer-first approach, Aurevia Global delivers world-class manufacturing solutions and builds long-term partnerships across the globe.",
  },
  "home-process": {
    eyebrow: "Our Process",
    title: "Precision at Every Step.",
    lead: null,
  },
  "home-factory": {
    eyebrow: "Our Factory",
    title: "Infrastructure That Delivers.",
    lead: null,
  },
  "about-numbers": {
    eyebrow: "By the Numbers",
    title: "Built for scale. Engineered for excellence.",
    lead: null,
  },
  "about-commitment": {
    eyebrow: "Our Commitment to Excellence",
    title: "The standards behind every order.",
    lead: "Six principles guide how we work with every client, on every project.",
  },
  "capabilities-what": {
    eyebrow: "What We Do",
    title: "Full-service apparel manufacturing.",
    lead: "Our modern facility is equipped with advanced machinery and a skilled workforce to deliver consistent quality and on-time delivery for brands worldwide.",
  },
  "capabilities-capacity": {
    eyebrow: "Capacity",
    title: "The scale behind your brand.",
    lead: null,
  },
  "private-label-services": {
    eyebrow: "Services We Include",
    title: "Everything your brand needs.",
    lead: "A complete private label service designed to make launching and scaling your apparel line seamless.",
  },
  "private-label-process": {
    eyebrow: "From Concept to Delivery",
    title: "Built for your brand. Made for the world.",
    lead: "A proven eight-step process that turns your idea into a market-ready product, delivered on time, anywhere.",
  },
  "product-medical-range": {
    eyebrow: "Our Medical Range",
    title: "Engineered for the job.",
    lead: null,
  },
  "product-workwear-range": {
    eyebrow: "Our Workwear Range",
    title: "Engineered for the job.",
    lead: null,
  },
  "product-active-range": {
    eyebrow: "Our Active Range",
    title: "Engineered for the job.",
    lead: null,
  },
  "our-factory-numbers": {
    eyebrow: "By the Numbers",
    title: "Built for scale. Engineered for excellence.",
    lead: null,
  },
};

export type ImageKey =
  | "about-factory-aisle"
  | "logo"
  | "home-who-we-are"
  | "home-card-private-label"
  | "home-process"
  | "home-factory";

export type ImageContent = { url: string; alt: string };

export const imageLabels: Record<ImageKey, string> = {
  "about-factory-aisle": "About — Facility Photo",
  logo: "Site Logo",
  "home-who-we-are": "Home — Who We Are Photo",
  "home-card-private-label": "Home — Private Label Card Photo",
  "home-process": "Home — Our Process Photo",
  "home-factory": "Home — Our Factory Photo",
};

export const imageDefaults: Record<ImageKey, ImageContent | null> = {
  "about-factory-aisle": {
    url: "/photos/factory-aisle.jpg",
    alt: "Aurevia Global manufacturing facility",
  },
  // No default file — falls back to the built-in SVG mark until an admin uploads one.
  logo: null,
  "home-who-we-are": {
    url: "/photos/factory-worker.jpg",
    alt: "Precision manufacturing at Aurevia Global",
  },
  "home-card-private-label": {
    url: "/photos/factory-worker.jpg",
    alt: "Aurevia Global private label production",
  },
  "home-process": {
    url: "/photos/workwear.jpg",
    alt: "Aurevia Global craftsmanship detail",
  },
  "home-factory": {
    url: "/photos/factory-aisle.jpg",
    alt: "Aurevia Global factory exterior",
  },
};

/** Runs a Prisma read for editable content; falls back to defaults if the DB is unreachable (e.g. at build time). */
async function safeRead<T>(read: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await read();
  } catch (err) {
    console.error("Failed to read editable content:", err);
    return fallback;
  }
}

export async function getPageHero(key: PageHeroKey): Promise<PageHeroContent> {
  const fallback = pageHeroDefaults[key];
  const row = await safeRead(() => prisma.pageHero.findUnique({ where: { key } }), null);
  if (!row) return fallback;
  return {
    eyebrow: row.eyebrow,
    title: row.title,
    lead: row.lead,
    imageUrl: row.imageUrl ?? fallback.imageUrl,
    imageAlt: row.imageAlt ?? fallback.imageAlt,
  };
}

export async function getSection(key: SectionKey): Promise<SectionContent> {
  const fallback = sectionDefaults[key];
  const row = await safeRead(() => prisma.sectionHeading.findUnique({ where: { key } }), null);
  if (!row) return fallback;
  return { eyebrow: row.eyebrow, title: row.title, lead: row.lead };
}

export async function getSiteImage(key: ImageKey): Promise<ImageContent | null> {
  const fallback = imageDefaults[key];
  const row = await safeRead(() => prisma.siteImage.findUnique({ where: { key } }), null);
  if (row) return { url: row.url, alt: row.alt };
  return fallback;
}

/** All editable content, keyed for the admin content dashboard. */
export async function getAllEditableContent() {
  const [heroRows, sectionRows, imageRows] = await Promise.all([
    safeRead(() => prisma.pageHero.findMany(), []),
    safeRead(() => prisma.sectionHeading.findMany(), []),
    safeRead(() => prisma.siteImage.findMany(), []),
  ]);

  const heroByKey = new Map(heroRows.map((r) => [r.key, r]));
  const sectionByKey = new Map(sectionRows.map((r) => [r.key, r]));
  const imageByKey = new Map(imageRows.map((r) => [r.key, r]));

  const heroes = (Object.keys(pageHeroDefaults) as PageHeroKey[]).map((key) => {
    const row = heroByKey.get(key);
    const fallback = pageHeroDefaults[key];
    return {
      key,
      label: pageHeroLabels[key],
      eyebrow: row?.eyebrow ?? fallback.eyebrow,
      title: row?.title ?? fallback.title,
      lead: row?.lead ?? fallback.lead,
      imageUrl: row?.imageUrl ?? fallback.imageUrl,
      imageAlt: row?.imageAlt ?? fallback.imageAlt,
    };
  });

  const sections = (Object.keys(sectionDefaults) as SectionKey[]).map((key) => {
    const row = sectionByKey.get(key);
    const fallback = sectionDefaults[key];
    return {
      key,
      label: sectionLabels[key],
      eyebrow: row?.eyebrow ?? fallback.eyebrow,
      title: row?.title ?? fallback.title,
      lead: row?.lead ?? fallback.lead,
    };
  });

  const images = (Object.keys(imageDefaults) as ImageKey[]).map((key) => {
    const row = imageByKey.get(key);
    const fallback = imageDefaults[key];
    return {
      key,
      label: imageLabels[key],
      url: row?.url ?? fallback?.url ?? null,
      alt: row?.alt ?? fallback?.alt ?? "",
    };
  });

  return { heroes, sections, images };
}
