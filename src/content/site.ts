/** Single source of truth for company-wide info, navigation and contact. */

export const site = {
  name: "Aurevia Global",
  shortName: "Aurevia",
  tagline: "Built to Deliver. Made to Lead.",
  description:
    "Aurevia Global is a premium apparel manufacturer specializing in private label production, medical apparel, workwear, and performance activewear for international markets.",
  url: "https://aureviaglobal.site",
  email: "info@aureviaglobal.site",
  phone: "+1 (212) 555-0187",
  phoneHref: "tel:+12125550187",
  address: {
    line1: "300 5th Avenue, Suite 4200",
    line2: "New York, NY 10118",
    country: "United States",
  },
  socials: [
    { label: "Instagram", handle: "@aureviaglobal", href: "https://instagram.com/aureviaglobal" },
    { label: "LinkedIn", handle: "Aurevia Global", href: "https://linkedin.com/company/aureviaglobal" },
    { label: "Facebook", handle: "Aurevia Global", href: "https://facebook.com/aureviaglobal" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const nav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "/capabilities" },
  {
    label: "Products",
    href: "/products/medical",
    children: [
      { label: "Aurevia Medical", href: "/products/medical", description: "Scrubs, lab coats & healthcare apparel" },
      { label: "Aurevia Workwear", href: "/products/workwear", description: "Uniforms & industrial workwear" },
      { label: "Aurevia Active", href: "/products/active", description: "Performance & sports apparel" },
    ],
  },
  { label: "Private Label", href: "/private-label" },
  { label: "Our Factory", href: "/our-factory" },
  { label: "Contact", href: "/contact" },
];
