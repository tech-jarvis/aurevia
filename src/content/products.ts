/** Product lines: Medical, Workwear, Active. Drives /products/[category]. */

export type ProductCategory = "medical" | "workwear" | "active";

export type RangeItem = { name: string; text: string };
export type Feature = { icon: string; title: string; text: string };
export type Highlight = { icon: string; title: string; text: string };

export type ProductLine = {
  slug: ProductCategory;
  name: string; // e.g. "Aurevia Medical"
  kicker: string; // short positioning line
  headline: string; // hero phrase
  intro: string;
  highlights: Highlight[]; // small badges below hero
  range: RangeItem[]; // the product range cards
  features: Feature[]; // key features sidebar
};

export const productLines: Record<ProductCategory, ProductLine> = {
  medical: {
    slug: "medical",
    name: "Aurevia Medical",
    kicker: "Engineered for Healthcare Professionals",
    headline: "Built for the demands of modern healthcare.",
    intro:
      "Our medical apparel is designed to meet the demanding needs of healthcare environments while ensuring comfort, durability and a professional appearance.",
    highlights: [
      { icon: "Sparkles", title: "Premium Fabrics", text: "" },
      { icon: "Wind", title: "Comfort & Breathable", text: "" },
      { icon: "ShieldCheck", title: "Durable & Long Lasting", text: "" },
      { icon: "Scissors", title: "Precise Stitching", text: "" },
      { icon: "Ruler", title: "Modern & Functional Fit", text: "" },
      { icon: "Palette", title: "Custom Colours & Branding", text: "" },
    ],
    range: [
      { name: "Medical Scrubs", text: "Functional, comfortable and built for long shifts." },
      { name: "Lab Coats", text: "Professional design with premium finishing." },
      { name: "Healthcare Uniforms", text: "Smart, practical uniforms for hospitals and clinics." },
      { name: "Patient Apparel", text: "Comfortable and soft apparel for patient care." },
      { name: "Medical Jackets", text: "Added warmth and style for professionals." },
    ],
    features: [
      { icon: "Sparkles", title: "Premium Fabrics", text: "High-quality materials for comfort and performance." },
      { icon: "Droplets", title: "Moisture Wicking", text: "Keeps you cool, dry and comfortable." },
      { icon: "Move", title: "Flexible & Durable", text: "Designed for ease of movement and long-lasting wear." },
      { icon: "Tag", title: "Custom Branding", text: "Embroidery, printing, labels and custom packaging." },
    ],
  },
  workwear: {
    slug: "workwear",
    name: "Aurevia Workwear",
    kicker: "Built for Performance. Made to Last.",
    headline: "Durable uniforms for every industry.",
    intro:
      "Our workwear and uniform solutions are designed to deliver durability, comfort and a professional look across a wide range of industries and working environments.",
    highlights: [
      { icon: "ShieldCheck", title: "Durable Construction", text: "" },
      { icon: "Wind", title: "Comfort Focused", text: "" },
      { icon: "Scissors", title: "Superior Stitching", text: "" },
      { icon: "HardHat", title: "Functional Design", text: "" },
      { icon: "Palette", title: "Custom Colours & Branding", text: "" },
    ],
    range: [
      { name: "Corporate Uniforms", text: "Smart uniforms that reflect your brand's professionalism." },
      { name: "Industrial Workwear", text: "Engineered for safety and durability in industrial environments." },
      { name: "Hospitality Uniforms", text: "Elegant, comfortable uniforms for hospitality professionals." },
      { name: "Security Uniforms", text: "Functional and tough uniforms for security personnel." },
      { name: "Custom Uniform Programs", text: "Tailored solutions to meet your specific requirements." },
    ],
    features: [
      { icon: "Sparkles", title: "Premium Fabrics", text: "High-quality materials for strength, comfort and long life." },
      { icon: "ShieldCheck", title: "Safety Compliant", text: "Designed to meet industry safety standards." },
      { icon: "Wind", title: "Breathable & Comfortable", text: "Fabrics that keep your team comfortable all day long." },
      { icon: "Tag", title: "Custom Branding", text: "Embroidery, printing, labels and custom packaging." },
    ],
  },
  active: {
    slug: "active",
    name: "Aurevia Active",
    kicker: "Performance Driven. Designed to Move.",
    headline: "Activewear engineered for performance.",
    intro:
      "Our activewear is engineered for performance, comfort and durability. Whether it's training, competition or everyday performance, Aurevia Active keeps you ahead.",
    highlights: [
      { icon: "Droplets", title: "Breathable Fabrics", text: "" },
      { icon: "Move", title: "Four-Way Stretch", text: "" },
      { icon: "ShieldCheck", title: "Durable Performance", text: "" },
      { icon: "Scissors", title: "Premium Stitching", text: "" },
      { icon: "Palette", title: "Custom Colours & Designs", text: "" },
      { icon: "Activity", title: "Athletic Fit & Comfort", text: "" },
    ],
    range: [
      { name: "Performance T-Shirts", text: "Lightweight, breathable t-shirts for training and everyday wear." },
      { name: "Tracksuits", text: "Stylish and functional tracksuits built for comfort and movement." },
      { name: "Training Apparel", text: "Versatile training wear designed for high performance and durability." },
      { name: "Teamwear", text: "Custom teamwear solutions for clubs, teams and academies." },
      { name: "Sports Uniforms", text: "High-performance uniforms with custom designs and a professional finish." },
    ],
    features: [
      { icon: "Droplets", title: "Moisture Wicking", text: "Fabrics that pull sweat away from the body." },
      { icon: "Feather", title: "Lightweight", text: "Engineered lightweight materials for improved performance." },
      { icon: "Wind", title: "Odor Resistant", text: "Stay fresh and confident during every activity." },
      { icon: "Sun", title: "UV Protection", text: "Protective fabrics that shield you from harmful UV rays." },
      { icon: "Tag", title: "Custom Branding", text: "Logos, prints, embroidery and sublimation options available." },
    ],
  },
};

export const productOrder: ProductCategory[] = ["medical", "workwear", "active"];
