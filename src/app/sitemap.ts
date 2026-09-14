import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) return [];
  return ["/", "/scooters", "/servizi", "/contatti", "/privacy", "/cookie-policy"].map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly", priority: path === "/" ? 1 : 0.7 }));
}
