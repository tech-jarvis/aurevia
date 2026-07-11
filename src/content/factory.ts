/** Factory infrastructure stats & highlights — shown on the home page teaser and /our-factory. */

export type FactoryStat = { value: string; label: string };

export const factoryStats: FactoryStat[] = [
  { value: "12+", label: "Years of Experience" },
  { value: "50,000+", label: "Garments Per Day" },
  { value: "30+", label: "Countries Served" },
  { value: "99%", label: "On-Time Delivery" },
];

export const facilityHighlights: { icon: string; title: string; text: string }[] = [
  {
    icon: "Factory",
    title: "Advanced Machinery",
    text: "500+ precision machines across cutting, sewing, printing and finishing.",
  },
  {
    icon: "Users",
    title: "Skilled Workforce",
    text: "200+ trained professionals delivering consistent craftsmanship at scale.",
  },
  {
    icon: "BadgeCheck",
    title: "Quality Control Labs",
    text: "In-house inspection at every stage, from incoming fabric to final packing.",
  },
  {
    icon: "Truck",
    title: "Logistics Hub",
    text: "Reliable documentation and global shipping to 30+ countries, on time.",
  },
];
