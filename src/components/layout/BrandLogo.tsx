import Image from "next/image";

type BrandLogoProps = {
  alt?: string;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  alt = "Grossi Moto",
  className = "",
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src="/grossimoto/brand/grossi-moto-logo.webp"
      alt={alt}
      width={320}
      height={119}
      sizes="160px"
      priority={priority}
      className={["block h-auto shrink-0", className].filter(Boolean).join(" ")}
    />
  );
}
