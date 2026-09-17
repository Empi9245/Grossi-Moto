import type { Metadata } from "next";

// The public URL supplied for this project; override when moving to a custom domain.
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://grossi-moto.vercel.app",
).origin;

export const defaultSocialImage =
  "/grossimoto/home-scroll/01-people-s-125-abs-lago.jpg";

type PageMetadataOptions = {
  image?: string;
  imageAlt?: string;
};

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  options: PageMetadataOptions = {},
): Metadata {
  const fullTitle = title + " | Grossi Moto";
  const image = options.image ?? defaultSocialImage;
  const imageAlt = options.imageAlt ?? fullTitle;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "it_IT",
      siteName: "Grossi Moto",
      title: fullTitle,
      description,
      url: path,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
