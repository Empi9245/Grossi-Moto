import { ActionMark } from "@/components/ui/control-glyphs";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, PhoneCall } from "lucide-react";

import { CatalogNavbar } from "@/components/catalog/CatalogNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProductGallery } from "@/components/product/ProductGallery";
import {
  catalogUseCases,
  getCatalogGuidance,
  getModelAlternatives,
} from "@/data/catalog-guidance";
import {
  catalogScooters,
  getCatalogScooterBrand,
  getCatalogScooterById,
  type CatalogScooter,
} from "@/data/catalog-scooters";
import { getProductGalleryImages } from "@/lib/product-assets";
import { pageMetadata, siteUrl } from "@/lib/seo";

type ModelPageProps = {
  params: Promise<{ slug: string }>;
};

function lowercaseLeading(value: string) {
  return value
    ? value.charAt(0).toLocaleLowerCase("it-IT") + value.slice(1)
    : value;
}

function buildModelMetaDescription(scooter: CatalogScooter) {
  const brand = getCatalogScooterBrand(scooter);
  const useCase = lowercaseLeading(scooter.idealUse);

  return `Scopri ${brand} ${scooter.name} a Roma: ${lowercaseLeading(scooter.subtitle)}, pensato per ${useCase}. Caratteristiche e contatti Grossi Moto per prezzo e disponibilità.`;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return catalogScooters.map((scooter) => ({ slug: scooter.id }));
}

export async function generateMetadata({
  params,
}: ModelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const scooter = getCatalogScooterById(slug);

  if (!scooter) {
    return {
      title: "Modello non trovato",
      robots: { index: false, follow: false },
    };
  }

  const brand = getCatalogScooterBrand(scooter);
  const description = buildModelMetaDescription(scooter);
  const metadata = pageMetadata(
    `${brand} ${scooter.name} a Roma`,
    description,
    `/scooters/${scooter.id}`,
    {
      image: scooter.image,
      imageAlt: scooter.imageAlt,
    },
  );

  return {
    ...metadata,
    robots: { index: true, follow: true },
  };
}

export default async function ScooterModelPage({ params }: ModelPageProps) {
  const { slug } = await params;
  const scooter = getCatalogScooterById(slug);

  if (!scooter) {
    notFound();
  }

  const brand = getCatalogScooterBrand(scooter);
  const category =
    scooter.specs.find((spec) => spec.label === "Categoria")?.value ??
    scooter.family;
  const modelUrl = `${siteUrl}/scooters/${scooter.id}`;
  const guidance = getCatalogGuidance(scooter);
  const relatedScooters = getModelAlternatives(scooter);
  const galleryImages = await getProductGalleryImages(scooter);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProductModel",
    "@id": `${modelUrl}#model`,
    name: `${brand} ${scooter.name}`,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    model: scooter.name,
    category: scooter.family,
    description: scooter.positioning,
    image: [`${siteUrl}${scooter.image}`],
    url: modelUrl,
    additionalProperty: scooter.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gamma",
        item: `${siteUrl}/scooters`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${brand} ${scooter.name}`,
        item: modelUrl,
      },
    ],
  };

  return (
    <>
      <main
        id="main-content"
        className="min-h-[100dvh] bg-white p-2.5 text-[#171717] sm:p-4 lg:p-5"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([productJsonLd, breadcrumbJsonLd]).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />

        <div className="mx-auto max-w-[122rem] overflow-hidden rounded-[1.55rem] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_28px_70px_rgba(0,0,0,0.08)]">
          <CatalogNavbar />

          <div className="px-3 pb-8 pt-2 sm:px-7 sm:pb-10 sm:pt-4 lg:px-10 lg:pb-12 lg:pt-6">
            <Link
              href={`/scooters?focus=${encodeURIComponent(scooter.id)}`}
              data-model-back
              className="font-ui inline-flex min-h-12 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-black/75 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 motion-reduce:transition-none"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Torna al catalogo
            </Link>

            <nav
              aria-label="Breadcrumb"
              className="font-ui hidden flex-wrap items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.11em] text-black/52 lg:flex"
            >
              <Link
                href="/"
                className="rounded-md transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35"
              >
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href="/scooters"
                className="rounded-md transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35"
              >
                Gamma
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-black/78">
                {scooter.name}
              </span>
            </nav>

            <article
              aria-labelledby="model-title"
              data-model-opening
              className="mt-2 overflow-hidden rounded-[1.35rem] p-4 sm:p-6 lg:mt-6 lg:p-8 xl:p-10"
              style={{
                background: scooter.cardSurface,
                color: scooter.textTone,
              }}
            >
              <div className="grid gap-x-8 gap-y-3 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:grid-rows-[auto_1fr] lg:gap-y-5 xl:gap-x-12">
                <h1
                  id="model-title"
                  className="font-display min-w-0 text-[clamp(2.2rem,9.4vw,3rem)] font-bold leading-[0.98] tracking-[-0.035em] text-current [text-wrap:balance] sm:max-w-[22ch] sm:text-[clamp(3rem,6.5vw,4.3rem)] lg:col-start-1 lg:row-start-1 lg:self-end lg:text-[clamp(3rem,4.8vw,6.6rem)]"
                >
                  <span className="sr-only">{brand} </span>
                  {scooter.name}
                </h1>

                <div
                  data-model-photo
                  className="relative -mx-2 h-[clamp(14rem,68vw,18rem)] min-w-0 sm:mx-0 sm:h-[clamp(20rem,48vw,26rem)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[clamp(25rem,36vw,36rem)] lg:self-center"
                >
                  <Image
                    src={scooter.image}
                    alt={scooter.imageAlt}
                    fill
                    sizes="(max-width: 639px) calc(100vw - 60px), (max-width: 1023px) calc(100vw - 136px), 50vw"
                    priority
                    className="object-contain object-center"
                  />
                </div>

                <div className="min-w-0 lg:col-start-1 lg:row-start-2">
                  <p className="font-ui text-sm font-semibold leading-6 text-current sm:text-base">
                    {brand} · {scooter.displacement} · {category}
                  </p>
                  <p className="mt-2 max-w-[36rem] text-base leading-6 text-current sm:mt-3 sm:text-lg sm:leading-7">
                    {scooter.positioning}
                  </p>

                  <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 lg:mt-6">
                    <Link
                      href={`/contatti?modello=${encodeURIComponent(scooter.id)}#richiesta`}
                      data-model-primary
                      className="font-ui inline-flex min-h-12 scroll-mb-28 items-center justify-center gap-3 rounded-full bg-[#0A0A0A] px-6 py-3 text-base font-semibold text-white transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/55 focus-visible:ring-offset-4 motion-reduce:transition-none"
                    >
                      Chiedi informazioni
                      <ActionMark />
                    </Link>
                    <a
                      href="tel:+393289185029"
                      aria-label={`Chiama Grossi Moto per ${brand} ${scooter.name}`}
                      className="font-ui inline-flex min-h-12 scroll-mb-28 items-center justify-center gap-2 rounded-lg px-2 text-base font-semibold text-current underline decoration-current/40 underline-offset-4 transition-opacity duration-150 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/55 motion-reduce:transition-none"
                    >
                      <PhoneCall
                        aria-hidden="true"
                        className="h-4 w-4"
                        strokeWidth={1.8}
                      />
                      Chiama
                    </a>
                  </div>
                </div>
              </div>
            </article>

            <section
              aria-labelledby="model-details-title"
              className="mt-6 rounded-[1.2rem] border border-black/8 bg-[#F7F7F7] p-6 sm:p-8 lg:grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-stretch lg:gap-10 xl:gap-14"
            >
              <div className="min-w-0">
                <p className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.16em] text-black/50">
                  Pensato per
                </p>
                <h2
                  id="model-details-title"
                  className="font-display mt-4 max-w-[12ch] text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.92] text-black"
                >
                  {scooter.idealUse}
                </h2>
                <p className="mt-5 max-w-[32rem] text-sm leading-6 text-black/62 sm:text-base sm:leading-7">
                  {guidance.whyChoose}
                </p>
                <ul
                  aria-label="Percorsi consigliati"
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {catalogUseCases
                    .filter((useCase) => guidance.useCases.includes(useCase.id))
                    .map((useCase) => (
                      <li
                        key={useCase.id}
                        className="rounded-full border border-black/15 px-3 py-2 text-xs font-medium text-black/75"
                      >
                        {useCase.label}
                      </li>
                    ))}
                </ul>
                <p className="mt-3 max-w-[32rem] text-sm leading-6 text-black/52 sm:text-base sm:leading-7">
                  Per dotazioni, allestimenti, prezzo e disponibilità, chiedi
                  conferma direttamente a Grossi Moto.
                </p>
              </div>

              <div className="mt-7 grid gap-5 rounded-[1.05rem] bg-white/72 p-5 sm:grid-cols-3 sm:p-6 lg:mt-0 lg:items-end">
                {scooter.specs.slice(0, 3).map((spec) => (
                  <div
                    key={`${scooter.id}-${spec.label}`}
                    className="min-w-0 py-1"
                  >
                    <p className="font-ui text-[0.62rem] font-bold uppercase tracking-[0.14em] text-black/48">
                      {spec.label}
                    </p>
                    <p className="font-display mt-3 break-words text-[clamp(1.5rem,2.8vw,2.45rem)] font-bold leading-[0.96] text-black">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="model-advice-title"
              className="mt-10 border-y border-black/10 py-8 sm:py-10"
            >
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10 xl:gap-14">
                <div>
                  <p className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.16em] text-black/55">
                    Prima di scegliere
                  </p>
                  <h2
                    id="model-advice-title"
                    className="font-display mt-4 max-w-[15ch] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.96] text-black"
                  >
                    Come si adatta alla tua giornata.
                  </h2>
                  <p className="mt-4 max-w-[32rem] text-sm leading-6 text-black/65">
                    Parti dal percorso che fai davvero: le indicazioni d’uso
                    aiutano a orientarti, la posizione giusta si valuta di
                    persona.
                  </p>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-black">
                      Cosa valutare
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-black/70 sm:text-base">
                      {guidance.tradeoff}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-black">
                      Da verificare insieme in sede
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-black/70 sm:text-base">
                      {guidance.checkInStore}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-black/65">
                      Ti sposti spesso in due? Chiedi di valutare insieme
                      seduta, spazio e appoggi per il passeggero sul modello che
                      ti interessa.
                    </p>
                  </div>
                  <Link
                    href={`/contatti?modello=${encodeURIComponent(scooter.id)}#richiesta`}
                    className="font-ui inline-flex min-h-12 items-center gap-3 rounded-[0.9rem] bg-black px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4"
                  >
                    Parliamone insieme
                    <ActionMark />
                  </Link>
                </div>
              </div>
            </section>

            <ProductGallery
              modelName={`${brand} ${scooter.name}`}
              images={galleryImages}
            />

            <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/scooters"
                className="font-ui inline-flex min-h-11 items-center gap-2 rounded-[0.9rem] px-3 text-xs font-bold uppercase tracking-[0.08em] text-black transition-colors hover:text-black/58 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35"
              >
                Torna alla gamma
              </Link>
              <Link
                href={`/scooters?focus=${encodeURIComponent(scooter.id)}`}
                className="font-ui inline-flex min-h-11 items-center gap-2 rounded-[0.9rem] px-3 text-xs font-bold uppercase tracking-[0.08em] text-black transition-colors hover:text-black/58 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35"
              >
                Apri nel catalogo
                <ActionMark />
              </Link>
            </div>

            {relatedScooters.length > 0 ? (
              <section
                aria-labelledby="related-models-title"
                className="mt-12 pt-4"
              >
                <p className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.16em] text-black/50">
                  Un altro modo di muoverti
                </p>
                <h2
                  id="related-models-title"
                  className="font-display mt-3 text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[0.92] text-black"
                >
                  Alternative da valutare
                </h2>
                <p className="mt-4 max-w-[45rem] text-sm leading-7 text-black/65 sm:text-base">
                  Cambia un’esigenza, cambia la scelta. Ecco cosa distingue
                  queste proposte da {scooter.name}.
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {relatedScooters.map(({ scooter: related, reason }) => (
                    <Link
                      key={related.id}
                      href={`/scooters/${related.id}`}
                      className="group rounded-[1.1rem] border border-black/8 bg-[#F7F7F7] p-5 transition-[background,transform] duration-200 hover:bg-[#F1F1F1] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35"
                    >
                      <p className="font-ui text-[0.6rem] font-bold uppercase tracking-[0.13em] text-black/48">
                        {getCatalogScooterBrand(related)} ·{" "}
                        {related.displacement} · {related.family}
                      </p>
                      <p className="font-display mt-3 text-2xl font-bold leading-none text-black">
                        {related.name}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-black/60">
                        {reason}
                      </p>
                      <span className="font-ui mt-5 inline-flex min-h-10 items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-black">
                        Vedi il modello
                        <ActionMark />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
