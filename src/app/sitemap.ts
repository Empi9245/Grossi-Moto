import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/scooters", "/servizi", "/contatti", "/privacy", "/cookie-policy"].map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly", priority: path === "/" ? 1 : 0.7 }));
}
