import type { ComponentType, CSSProperties } from "react";
import { ArrowRight, Gauge, Layers2, MapPinned, Route, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import type { CatalogScooter, CatalogSpecIcon } from "@/data/catalog-scooters";

type CatalogFeaturedCardProps = {
  scooter: CatalogScooter;
  shouldReduceMotion: boolean;
  enableSharedLayout?: boolean;
};

type IconComponent = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
  strokeWidth?: number;
}>;

const specIcons: Record<CatalogSpecIcon, IconComponent> = {
  gauge: Gauge,
  layers: Layers2,
  route: Route,
  shield: ShieldCheck,
  map: MapPinned,
};

const cardEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FeaturedStyle = CSSProperties & Record<`--${string}`, string>;

export function CatalogFeaturedCard({
  scooter,
  shouldReduceMotion,
  enableSharedLayout = false,
}: CatalogFeaturedCardProps) {
  const cardLayoutId = shouldReduceMotion || !enableSharedLayout
    ? undefined
    : `scooter-card-${scooter.id}`;
  const imageLayoutId = shouldReduceMotion || !enableSharedLayout
    ? undefined
    : `scooter-image-${scooter.id}`;
  const style: FeaturedStyle = {
    "--catalog-accent": scooter.accentTone,
    "--catalog-muted": scooter.mutedTone,
    "--catalog-shadow": scooter.shadowTone,
    background: scooter.featureSurface,
    color: scooter.textTone,
  };

  return (
    <motion.article
      layout
      layoutId={cardLayoutId}
      className="relative min-h-[42rem] overflow-hidden rounded-[1.6rem] p-6 shadow-[0_0_0_1px_oklch(18%_0.014_56/0.055),0_26px_72px_oklch(18%_0.014_56/0.12)] sm:p-8 lg:min-h-[calc(100dvh-8.9rem)] lg:max-h-[54rem] lg:p-10"
      style={style}
      transition={{ type: "spring", duration: 0.58, bounce: 0 }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-75"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { opacity: 0.75 }}
        transition={{ duration: 0.34, ease: cardEase }}
        style={{ background: scooter.featureSurface }}
      />

      <div className="relative z-10 grid h-full grid-rows-[auto_minmax(16rem,1fr)_auto] gap-6 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)] lg:grid-rows-[auto_1fr_auto] lg:gap-x-8 lg:gap-y-5">
        <div className="max-w-[31rem] lg:col-start-1">
          <p className="font-ui text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[var(--catalog-muted)]">
            In evidenza
          </p>
          <h1 className="font-display mt-5 text-[clamp(3.4rem,12vw,6.6rem)] font-bold leading-[0.9] tracking-normal text-current lg:text-[clamp(4.2rem,5.2vw,7.4rem)]">
            {scooter.name}
          </h1>
          <p className="font-ui mt-4 text-[0.86rem] font-bold uppercase tracking-[0.13em] text-[var(--catalog-muted)]">
            {scooter.subtitle}
          </p>
          <p className="mt-7 max-w-[29rem] text-[0.98rem] leading-7 text-[var(--catalog-muted)] sm:text-base">
            {scooter.positioning}
          </p>
        </div>

        <div className="relative min-h-[16rem] lg:col-start-2 lg:row-span-3 lg:min-h-0">
          <div
            aria-hidden="true"
            className="absolute left-[50%] bottom-[9%] h-[9%] w-[74%] -translate-x-1/2 rounded-[50%] bg-[var(--catalog-shadow)] blur-[13px]"
          />
          <div
            className="relative h-full w-full"
            style={{
              transform: `translate(${scooter.imageOffsetX ?? "0%"}, ${
                scooter.imageOffsetY ?? "0%"
              })`,
            }}
          >
            <motion.img
              layoutId={imageLayoutId}
              src={scooter.image}
              alt={scooter.imageAlt}
              width={900}
              height={675}
              draggable={false}
              decoding="async"
              className="h-full w-full object-contain object-center"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:col-start-1 lg:mt-auto">
          {scooter.specs.slice(0, 3).map((spec) => {
            const Icon = specIcons[spec.icon];

            return (
              <div
                key={`${scooter.id}-${spec.label}`}
                className="min-w-0 border-t border-[oklch(18%_0.014_56/0.12)] pt-3"
              >
                <Icon
                  aria-hidden
                  className="h-5 w-5 text-[var(--catalog-accent)]"
                  strokeWidth={1.7}
                />
                <p className="font-display mt-3 truncate text-xl font-bold leading-none text-current">
                  {spec.value}
                </p>
                <p className="font-ui mt-2 text-[0.63rem] font-bold uppercase tracking-[0.13em] text-[var(--catalog-muted)]">
                  {spec.label}
                </p>
              </div>
            );
          })}
        </div>

        <a
          href="tel:+393289185029"
          aria-label={`Scopri ${scooter.name} chiamando Grossimoto`}
          className="font-ui inline-flex min-h-11 w-fit items-center gap-3 rounded-full text-[0.74rem] font-bold uppercase tracking-[0.12em] text-current outline-none transition-[color,transform] duration-200 hover:text-[var(--catalog-accent)] active:translate-y-px focus-visible:ring-2 focus-visible:ring-[var(--catalog-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(88%_0.015_78)] lg:col-start-1"
        >
          <span className="border-b border-[oklch(18%_0.014_56/0.22)] pb-1">
            Scopri di piu
          </span>
          <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
        </a>
      </div>
    </motion.article>
  );
}
