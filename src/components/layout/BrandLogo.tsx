import Image from "next/image";

import blackLogo from "../../../public/logo/logo testo black.png";
import whiteLogo from "../../../public/logo/logo testo white.png";

type BrandLogoProps = {
  tone?: "black" | "white";
  alt?: string;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  tone = "black",
  alt = "Grossi Moto di Angelo Grossi",
  className = "w-40 sm:w-44 lg:w-48",
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src={tone === "white" ? whiteLogo : blackLogo}
      alt={alt}
      sizes="(min-width: 1024px) 192px, (min-width: 640px) 176px, 160px"
      className={`block h-auto max-w-full object-contain ${className}`}
      priority={priority}
    />
  );
}