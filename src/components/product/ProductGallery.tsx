import Image from "next/image";

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

  return (
    <section
      aria-labelledby="product-gallery-title"
      className="mt-12 border-t border-black/10 pt-10"
    >
      <p className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.16em] text-black/50">
        Immagini del modello
      </p>
      <h2
        id="product-gallery-title"
        className="font-display mt-3 text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[0.92] text-black"
      >
        {modelName}
      </h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <figure
            key={image.src}
            className={
              index === 0
                ? "overflow-hidden rounded-[1.2rem] bg-[#F7F7F7] sm:col-span-2 lg:col-span-2"
                : "overflow-hidden rounded-[1.2rem] bg-[#F7F7F7]"
            }
          >
            <div
              className={
                index === 0
                  ? "relative aspect-[16/9]"
                  : "relative aspect-[4/3]"
              }
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 639px) 92vw, (max-width: 1023px) 88vw, 58vw"
                    : "(max-width: 639px) 92vw, (max-width: 1023px) 44vw, 29vw"
                }
                className="object-cover object-center"
              />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
