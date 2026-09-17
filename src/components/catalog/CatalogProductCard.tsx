import type { ComponentType, CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Gauge,
  Layers2,
  MapPinned,
  Minimize2,
  PhoneCall,
  Route,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

import {
  getCatalogScooterBrand,
  type CatalogScooter,
  type CatalogSpecIcon,
} from "@/data/catalog-scooters";
import type { ProductCardToneAssignment } from "@/data/scooter-color-system";

type CatalogProductCardProps = {
  scooter: CatalogScooter;
  shouldReduceMotion: boolean;
  isExpanded: boolean;
  transitionImageId: string | null;
  cardToneAssignment?: ProductCardToneAssignment;
  isPriority?: boolean;
  layoutDependency: string;
  onExpandScooter: (scooterId: string) => void;
  onCollapseScooter: () => void;
};

type ProductCardStyle = CSSProperties & Record<`--${string}`, string>;

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

const productEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const productLayoutDuration = 0.32;
const expandedContentDuration = 0.22;

export function CatalogProductCard({
  scooter,
  shouldReduceMotion,
  isExpanded,
  transitionImageId,
  cardToneAssignment,
  isPriority = false,
  layoutDependency,
  onExpandScooter,
  onCollapseScooter,
}: CatalogProductCardProps) {
  const style: ProductCardStyle = {
    "--product-accent": scooter.accentTone,
    "--product-muted": scooter.mutedTone,
    "--product-shadow": scooter.shadowTone,
    background: isExpanded
      ? scooter.featureSurface
      : (cardToneAssignment?.cardSurface ?? scooter.cardSurface),
    color: scooter.textTone,
  };
  const brand = getCatalogScooterBrand(scooter);
  const cardTitleId = `catalog-card-title-${scooter.id}`;
  const expandedContentId = `catalog-card-content-${scooter.id}`;
  const sharedImageLayoutId =
    !shouldReduceMotion && isExpanded && transitionImageId === scooter.id
      ? `scooter-image-${scooter.id}`
      : undefined;
  const imageSizes = isExpanded
    ? "(max-width: 767px) 88vw, (max-width: 1279px) 44vw, 38vw"
    : "(max-width: 767px) 82vw, (max-width: 1279px) 42vw, 22vw";
  const imageClassName = clsx(
    "relative z-10 w-full object-contain object-center",
    isExpanded
      ? "h-[14rem] max-h-[22rem] sm:h-[16.5rem] md:h-full md:max-h-[28rem]"
      : "h-[12.25rem] max-h-[12.25rem]",
  );
  const expandedContentMotion = shouldReduceMotion
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y: 6, filter: "blur(3px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: expandedContentDuration, ease: productEase },
      };
  const cardLayout = shouldReduceMotion ? false : "position";

  return (
    <motion.div
      layout={cardLayout}
      layoutDependency={layoutDependency}
      transition={{
        layout: {
          duration: shouldReduceMotion ? 0.01 : productLayoutDuration,
          ease: productEase,
        },
      }}
      className={clsx(
        "relative",
        isExpanded
          ? "z-10 self-stretch md:col-span-2 md:row-span-2 lg:col-span-6"
          : "z-0 self-start md:col-span-1 md:row-span-1 lg:col-span-3",
      )}
      data-scooter-id={scooter.id}
      data-expanded={isExpanded}
      data-card-tone={cardToneAssignment?.toneId ?? scooter.cardToneId}
      >
      <article
        aria-labelledby={cardTitleId}
        className={clsx(
          "group relative overflow-hidden rounded-[1.35rem] p-4 shadow-[0_0_0_1px_oklch(18%_0.014_56/0.052),0_18px_46px_oklch(18%_0.014_56/0.09)] sm:p-5",
          isExpanded
            ? "h-full min-h-0 sm:min-h-[35rem]"
            : "min-h-[17.75rem] sm:min-h-[19.5rem]",
          !isExpanded &&
            "transition-[box-shadow,transform] duration-200 hover:shadow-[0_0_0_1px_oklch(18%_0.014_56/0.075),0_22px_56px_oklch(18%_0.014_56/0.12)]",
        )}
        style={style}
      >
        <div
          className={clsx(
            "relative z-10 grid gap-5",
            isExpanded
              ? "grid h-full min-h-0 gap-5 sm:min-h-[31rem] md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] md:grid-rows-[auto_minmax(12rem,1fr)_auto]"
              : "min-h-[15.75rem] grid-rows-[auto_minmax(10rem,1fr)_auto] sm:min-h-[17rem] sm:grid-rows-[auto_minmax(11.25rem,1fr)_auto]",
          )}
        >
          <div className="flex min-w-0 items-start justify-between gap-4 md:col-start-1 md:row-start-1">
            <div className="min-w-0">
              <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">
                <span className="font-ui inline-flex min-h-7 items-center rounded-full bg-[oklch(96%_0.006_78/0.42)] px-2.5 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-current shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.1)]">
                  {brand}
                </span>
                <span className="font-ui truncate text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[var(--product-muted)]">
                  {scooter.family}
                </span>
              </div>
              <h2
                id={cardTitleId}
                className={clsx(
                  "font-display font-bold tracking-normal text-current",
                  isExpanded
                    ? "text-[clamp(2.45rem,10vw,4.2rem)] leading-[0.9] md:text-[clamp(2.4rem,4.4vw,4.7rem)]"
                    : "text-[1.55rem] leading-none",
                )}
              >
                {scooter.name}
              </h2>
              <p className="font-ui mt-2 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-[var(--product-muted)]">
                {scooter.subtitle}
              </p>
            </div>

            {isExpanded ? (
              <button
                type="button"
                aria-label={`Comprimi ${scooter.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onCollapseScooter();
                }}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[oklch(96%_0.006_78/0.46)] text-current shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.12)] outline-none transition-[background,transform] duration-200 hover:bg-[oklch(98%_0.004_78/0.64)] active:translate-y-px focus-visible:ring-2 focus-visible:ring-[var(--product-accent)]"
              >
                <Minimize2
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </button>
            ) : null}
          </div>

          <div
            className={clsx(
              "relative flex min-h-0 items-center justify-center",
              isExpanded
                ? "min-h-[15rem] md:col-start-2 md:row-span-2 md:row-start-1 md:min-h-0"
                : "min-h-[11.25rem]",
            )}
          >
            <div
              aria-hidden="true"
              className={clsx(
                "absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-[var(--product-shadow)]",
                isExpanded
                  ? "bottom-[8%] h-[10%] w-[80%] blur-[13px]"
                  : "bottom-[7%] h-[9%] w-[76%] blur-[10px]",
              )}
            />
            {sharedImageLayoutId ? (
              <motion.img
                layoutId={sharedImageLayoutId}
                src={scooter.image}
                alt={scooter.imageAlt}
                width={780}
                height={585}
                draggable={false}
                decoding="async"
                className={imageClassName}
                transition={{ type: "spring", duration: 0.46, bounce: 0 }}
              />
            ) : (
              <Image
                src={scooter.image}
                alt={scooter.imageAlt}
                width={780}
                height={585}
                sizes={imageSizes}
                priority={isPriority}
                draggable={false}
                className={imageClassName}
              />
            )}
          </div>

          {isExpanded ? (
            <motion.div
              key="expanded-content"
              {...expandedContentMotion}
              id={expandedContentId}
              className="min-w-0 md:col-span-2 md:row-start-3"
            >
              <p className="max-w-[46rem] text-[0.98rem] leading-7 text-[var(--product-muted)] sm:text-base">
                {scooter.positioning}
              </p>

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {scooter.specs.slice(0, 3).map((spec) => {
                  const Icon = specIcons[spec.icon];

                  return (
                    <div
                      key={`${scooter.id}-${spec.label}`}
                      className="min-w-0 rounded-[0.9rem] bg-[oklch(96%_0.006_78/0.36)] px-3.5 py-3 shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.09)]"
                    >
                      <Icon
                        aria-hidden
                        className="h-4 w-4 text-[var(--product-accent)]"
                        strokeWidth={1.7}
                      />
                      <p className="font-display mt-3 truncate text-xl font-bold leading-none text-current">
                        {spec.value}
                      </p>
                      <p className="font-ui mt-2 truncate text-[0.61rem] font-bold uppercase tracking-[0.13em] text-[var(--product-muted)]">
                        {spec.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+393289185029"
                  aria-label={`Chiama per disponibilità per ${scooter.name}: chiama Grossi Moto`}
                  className="font-ui inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[oklch(18%_0.014_56)] px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[oklch(94%_0.01_78)] outline-none transition-[background,transform] duration-200 hover:bg-[oklch(23%_0.016_56)] active:translate-y-px focus-visible:ring-2 focus-visible:ring-[var(--product-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(88%_0.015_78)] sm:w-fit"
                >
                  <PhoneCall
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                  Chiama per disponibilità
                </a>
                <Link href={`/contatti?modello=${encodeURIComponent(scooter.id)}#richiesta`} className="font-ui inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-bold underline underline-offset-4 focus-visible:outline focus-visible:outline-2" aria-label={`Scrivi per questo modello: ${scooter.name}`}>
                  Scrivi per questo modello
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="font-ui text-[0.62rem] font-bold uppercase tracking-[0.13em] text-[var(--product-muted)]">
                  {scooter.displacement}
                </p>
                <p className="mt-1 truncate text-sm leading-5 text-[var(--product-muted)]">
                  {scooter.idealUse}
                </p>
              </div>

              <button
                type="button"
                aria-controls={expandedContentId}
                aria-expanded={false}
                aria-label={`Apri la scheda di ${scooter.name}`}
                onClick={() => onExpandScooter(scooter.id)}
                className="font-ui inline-flex min-h-11 shrink-0 items-center gap-3 rounded-full px-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-current outline-none transition-[background,color] duration-200 hover:bg-[oklch(96%_0.006_78/0.38)] group-hover:text-[var(--product-accent)] focus-visible:ring-2 focus-visible:ring-[var(--product-accent)] focus-visible:ring-offset-2"
              >
                Apri la scheda
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </button>
            </div>
          )}
        </div>
      </article>
    </motion.div>
  );
}
