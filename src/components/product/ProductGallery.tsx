import Image from "next/image";
import { ChevronDown } from "lucide-react";

import type { ProductGalleryImage } from "@/lib/product-assets";

type ProductGalleryProps = {
  modelName: string;
  images: ProductGalleryImage[];
};

export function ProductGallery({
  modelName,
  images,
}: ProductGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  const [firstImage, ...otherImages] = images;
  const moreImagesLabel =
    otherImages.length === 1
      ? "Un’altra immagine"
      : `Altre ${otherImages.length} immagini`;

  return (
    <section
      aria-labelledby="product-gallery-title"
      data-model-gallery
      className="mt-10 pt-4"
    >
      <h2
        id="product-gallery-title"
        className="font-display text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[0.98] tracking-[-0.03em] text-black"
      >
        Galleria
      </h2>

      <figure className="mt-6 overflow-hidden rounded-[1.2rem] bg-[#F7F7F7]">
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:max-h-[36rem]">
          <Image
            src={firstImage.src}
            alt={firstImage.alt}
            fill
            sizes="(max-width: 639px) 92vw, (max-width: 1023px) 88vw, 90vw"
            loading="lazy"
            decoding="async"
            className="object-cover object-center"
          />
        </div>
      </figure>

      {otherImages.length > 0 ? (
        <details className="group mt-3">
          <summary
            aria-label={`${moreImagesLabel} di ${modelName}`}
            className="font-ui inline-flex min-h-12 cursor-pointer list-none scroll-mb-28 items-center gap-3 rounded-lg px-2 text-base font-semibold text-black underline decoration-black/35 underline-offset-4 hover:decoration-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/55 [&::-webkit-details-marker]:hidden"
          >
            {moreImagesLabel}
            <ChevronDown
              aria-hidden="true"
              className="h-4 w-4 group-open:rotate-180"
            />
          </summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {otherImages.map((image) => (
              <figure
                key={image.src}
                className="overflow-hidden rounded-[1.2rem] bg-[#F7F7F7]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 44vw, 29vw"
                    loading="lazy"
                    decoding="async"
                    className="object-cover object-center"
                  />
                </div>
              </figure>
            ))}
          </div>
        </details>
      ) : null}
    </section>
  );
}
