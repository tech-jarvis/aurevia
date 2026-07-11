/** Individual product (SKU) detail data — one demo product per line, linked from the category range. */

import type { ProductCategory } from "./products";

export type EngineeredDetail = { number: string; title: string; text: string };
export type FabricFeature = { icon: string; label: string };
export type JourneyStep = { step: string; label: string };
export type SizeChartRow = { label: string; values: string[] };
export type ProductColor = { name: string; hex: string };

export type ProductItem = {
  slug: string;
  badges: { icon: string; label: string }[];
  engineeredDetails: EngineeredDetail[];
  fabric: {
    gsm: string;
    composition: { label: string; percent: string }[];
    features: FabricFeature[];
  };
  journey: JourneyStep[];
  sizeChart: {
    sizes: string[];
    rows: SizeChartRow[];
  };
  colors: ProductColor[];
};

const journey: JourneyStep[] = [
  { step: "01", label: "Yarn" },
  { step: "02", label: "Knitting" },
  { step: "03", label: "Dyeing" },
  { step: "04", label: "Cutting" },
  { step: "05", label: "Sewing" },
  { step: "06", label: "Quality Check" },
  { step: "07", label: "Packaging" },
  { step: "08", label: "Delivered" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const productItems: Record<ProductCategory, ProductItem> = {
  medical: {
    slug: "performance-scrub-01",
    badges: [
      { icon: "Move", label: "4-Way Stretch" },
      { icon: "Sparkles", label: "Anti Wrinkle" },
      { icon: "Wind", label: "Breathable" },
      { icon: "Droplets", label: "Moisture Wicking" },
    ],
    engineeredDetails: [
      { number: "01", title: "Shoulder Reinforcement", text: "Enhanced durability for every movement." },
      { number: "02", title: "Hidden Utility Pocket", text: "Secure storage for your essentials." },
      { number: "03", title: "Double Needle Stitching", text: "Stronger seams for longer wear." },
      { number: "04", title: "4-Way Stretch Fabric", text: "Maximum mobility & all-day comfort." },
      { number: "05", title: "Side Vent", text: "Better airflow. Greater flexibility." },
    ],
    fabric: {
      gsm: "240",
      composition: [
        { label: "Polyester", percent: "72%" },
        { label: "Rayon", percent: "21%" },
        { label: "Spandex", percent: "7%" },
      ],
      features: [
        { icon: "Wind", label: "Breathable Fabric" },
        { icon: "Droplets", label: "Moisture Wicking" },
        { icon: "Sparkles", label: "Anti Wrinkle" },
        { icon: "ShieldCheck", label: "Odor Resistant" },
        { icon: "BadgeCheck", label: "Easy Care" },
      ],
    },
    journey,
    sizeChart: {
      sizes,
      rows: [
        { label: "Chest", values: ["48", "51", "54", "57", "60", "63"] },
        { label: "Length", values: ["70", "71", "72", "73", "74", "75"] },
        { label: "Shoulder", values: ["42", "44", "46", "48", "50", "52"] },
        { label: "Sleeve", values: ["20", "21", "22", "23", "24", "25"] },
        { label: "Waist (Pants)", values: ["33", "36", "39", "42", "45", "48"] },
        { label: "Inseam", values: ["76", "77", "78", "79", "80", "80"] },
      ],
    },
    colors: [
      { name: "Navy", hex: "#1f2a3d" },
      { name: "Black", hex: "#0a0a0b" },
      { name: "Burgundy", hex: "#5c1f2c" },
      { name: "Ceil Blue", hex: "#4c6d8c" },
      { name: "Charcoal", hex: "#3a3a3f" },
    ],
  },
  workwear: {
    slug: "duty-jacket-01",
    badges: [
      { icon: "ShieldCheck", label: "Durable Construction" },
      { icon: "HardHat", label: "Safety Compliant" },
      { icon: "Wind", label: "Breathable" },
      { icon: "Scissors", label: "Reinforced Seams" },
    ],
    engineeredDetails: [
      { number: "01", title: "Reinforced Shoulders", text: "Built to withstand daily wear on site." },
      { number: "02", title: "Multi-Tool Pockets", text: "Quick access storage for tools & gear." },
      { number: "03", title: "Bar-Tacked Stress Points", text: "Extra stitching where it matters most." },
      { number: "04", title: "Weatherproof Shell", text: "Protection against wind and light rain." },
      { number: "05", title: "Reflective Trim", text: "Improved visibility in low light." },
    ],
    fabric: {
      gsm: "320",
      composition: [
        { label: "Polyester", percent: "65%" },
        { label: "Cotton", percent: "33%" },
        { label: "Spandex", percent: "2%" },
      ],
      features: [
        { icon: "ShieldCheck", label: "Abrasion Resistant" },
        { icon: "Wind", label: "Breathable Fabric" },
        { icon: "Droplets", label: "Water Repellent" },
        { icon: "Scissors", label: "Reinforced Stitching" },
        { icon: "BadgeCheck", label: "Easy Care" },
      ],
    },
    journey,
    sizeChart: {
      sizes,
      rows: [
        { label: "Chest", values: ["50", "53", "56", "59", "62", "65"] },
        { label: "Length", values: ["72", "73", "74", "75", "76", "77"] },
        { label: "Shoulder", values: ["46", "48", "50", "52", "54", "56"] },
        { label: "Sleeve", values: ["62", "63", "64", "65", "66", "67"] },
        { label: "Waist (Pants)", values: ["34", "37", "40", "43", "46", "49"] },
        { label: "Inseam", values: ["78", "79", "80", "81", "82", "82"] },
      ],
    },
    colors: [
      { name: "Charcoal", hex: "#3a3a3f" },
      { name: "Black", hex: "#0a0a0b" },
      { name: "Hi-Vis Yellow", hex: "#c9a24b" },
      { name: "Navy", hex: "#1f2a3d" },
      { name: "Olive", hex: "#4a4a35" },
    ],
  },
  active: {
    slug: "performance-tee-01",
    badges: [
      { icon: "Droplets", label: "Moisture Wicking" },
      { icon: "Move", label: "Four-Way Stretch" },
      { icon: "Feather", label: "Lightweight" },
      { icon: "Sun", label: "UV Protection" },
    ],
    engineeredDetails: [
      { number: "01", title: "Raglan Sleeve Construction", text: "Unrestricted range of motion." },
      { number: "02", title: "Mesh Ventilation Panels", text: "Targeted airflow where you need it." },
      { number: "03", title: "Flatlock Seams", text: "Reduced chafing during high output." },
      { number: "04", title: "Four-Way Stretch Fabric", text: "Moves with you, not against you." },
      { number: "05", title: "Drop-Tail Hem", text: "Extra coverage that stays in place." },
    ],
    fabric: {
      gsm: "160",
      composition: [
        { label: "Polyester", percent: "88%" },
        { label: "Spandex", percent: "12%" },
      ],
      features: [
        { icon: "Droplets", label: "Moisture Wicking" },
        { icon: "Feather", label: "Lightweight" },
        { icon: "Wind", label: "Odor Resistant" },
        { icon: "Sun", label: "UV Protection" },
        { icon: "BadgeCheck", label: "Easy Care" },
      ],
    },
    journey,
    sizeChart: {
      sizes,
      rows: [
        { label: "Chest", values: ["46", "49", "52", "55", "58", "61"] },
        { label: "Length", values: ["66", "67", "68", "69", "70", "71"] },
        { label: "Shoulder", values: ["40", "42", "44", "46", "48", "50"] },
        { label: "Sleeve", values: ["19", "20", "21", "22", "23", "24"] },
      ],
    },
    colors: [
      { name: "Black", hex: "#0a0a0b" },
      { name: "Charcoal", hex: "#3a3a3f" },
      { name: "Navy", hex: "#1f2a3d" },
      { name: "Crimson", hex: "#7a2331" },
    ],
  },
};
