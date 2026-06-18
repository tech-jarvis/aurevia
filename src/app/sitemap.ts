import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { productOrder } from "@/content/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const routes = [
    "",
    "/about",
    "/capabilities",
    "/private-label",
    "/contact",
    ...productOrder.map((slug) => `/products/${slug}`),
  ];

  const now = new Date();
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
