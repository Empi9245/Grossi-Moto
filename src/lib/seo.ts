import type { Metadata } from "next";

// The public URL supplied for this project; override when moving to a custom domain.
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://grossi-moto.vercel.app").origin;

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = title + " | Grossi Moto";
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "it_IT", siteName: "Grossi Moto", title: fullTitle, description, url: path },
    twitter: { card: "summary", title: fullTitle, description },
  };
}
