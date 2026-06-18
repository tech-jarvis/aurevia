/**
 * Industries served. The source deck displayed third-party brand logos
 * (illustrative only); to avoid trademark issues we present the industries
 * and client types Aurevia supplies instead. Swap in real, authorized
 * client logos under /public/logos when available.
 */

export type Industry = { name: string; icon: string };

export const industries: Industry[] = [
  { name: "Healthcare & Hospitals", icon: "Stethoscope" },
  { name: "Sportswear Brands", icon: "Dumbbell" },
  { name: "Corporate & Hospitality", icon: "Building2" },
  { name: "Industrial & Safety", icon: "HardHat" },
  { name: "Retailers & Distributors", icon: "Store" },
  { name: "Fashion Labels", icon: "Shirt" },
];
