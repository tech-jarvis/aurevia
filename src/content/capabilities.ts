/** Manufacturing capabilities (icons map to lucide-react names in the page). */

export type Capability = { icon: string; title: string; text: string };

export const capabilities: Capability[] = [
  { icon: "Factory", title: "OEM Manufacturing", text: "High-quality production based on your designs and specifications." },
  { icon: "PencilRuler", title: "ODM Manufacturing", text: "Full product development from concept to finished product." },
  { icon: "Tag", title: "Private Label Production", text: "Custom branding, labeling and packaging to represent your brand." },
  { icon: "Lightbulb", title: "Product Development", text: "Expert product design and development to turn ideas into reality." },
  { icon: "Layers", title: "Fabric Sourcing", text: "Access to high-quality fabrics and trims from trusted suppliers." },
  { icon: "ClipboardCheck", title: "Sampling", text: "Precise sampling to ensure perfect fit, quality and readiness." },
  { icon: "Shirt", title: "Embroidery", text: "Advanced embroidery solutions for a premium branded finish." },
  { icon: "Printer", title: "Screen Printing", text: "High-quality prints with vibrant colours and long-lasting durability." },
  { icon: "Flame", title: "Sublimation", text: "Full-sublimation printing for performance and sports apparel." },
  { icon: "Package", title: "Packaging Solutions", text: "Custom packaging options that reflect your brand identity." },
  { icon: "BadgeCheck", title: "Quality Assurance", text: "Rigorous quality control at every stage for consistency." },
  { icon: "Globe", title: "Global Shipping Support", text: "Reliable documentation and logistics for smooth delivery." },
];

/** Reasons-to-choose blocks (home + why section). */
export const whyAurevia: { icon: string; title: string; text: string }[] = [
  { icon: "ShieldCheck", title: "Global Quality Standards", text: "International quality control systems ensuring consistent excellence in every order." },
  { icon: "Tag", title: "Private Label Expertise", text: "End-to-end OEM & ODM solutions tailored to your brand and market needs." },
  { icon: "TrendingUp", title: "Scalable Manufacturing", text: "Flexible capacity to support startups as well as large-scale brands." },
  { icon: "Handshake", title: "Reliable Partnerships", text: "Transparent communication, on-time delivery and long-term partnerships." },
  { icon: "CircleDollarSign", title: "Competitive Pricing", text: "Premium quality with efficient processes to deliver the best value." },
  { icon: "Globe", title: "International Focus", text: "Experienced in global compliance and export documentation." },
];
