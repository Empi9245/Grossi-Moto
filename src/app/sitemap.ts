import type { MetadataRoute } from "next";

import { catalogScooters } from "@/data/catalog-scooters";
import { siteUrl } from "@/lib/seo";

const staticPaths = [
  { path: "/", priority: 1 },
  { path: "/scooters", priority: 0.8 },
  { path: "/servizi", priority: 0.7 },
  { path: "/contatti", priority: 0.7 },
  { path: "/privacy", priority: 0.4 },
  { path: "/cookie-policy", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = staticPaths.map(
    ({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly",
      priority,
    }),
  );

  const modelPages: MetadataRoute.Sitemap = catalogScooters.map((scooter) => ({
    url: `${siteUrl}/scooters/${scooter.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...modelPages];
}
