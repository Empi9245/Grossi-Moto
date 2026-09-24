import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
} from "lucide-react";

import { ContactForm } from "@/components/contact/ContactForm";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { catalogScooters, getCatalogScooterBrand } from "@/data/catalog-scooters";

export const metadata = pageMetadata(
  "Contatti e orari a Roma",
  "Chiama Grossi Moto al 328 918 5029 o invia una richiesta per scooter e officina. Indirizzo, orari e indicazioni per Via Festo Porzio 22, Roma.",
  "/contatti",
);

const navItems = [
  { label: "Gamma", href: "/scooters" },
  { label: "Servizi", href: "/servizi" },
  { label: "Contatti", href: "/contatti" },
];

const hours = [
  { days: "Lun – Ven", time: "08:30 – 13:00 / 14:30 – 19:00" },
  { days: "Sabato", time: "08:30 – 13:00" },
  { days: "Domenica", time: "Chiuso" },
];

const channels = [
  {
    icon: Phone,
    label: "Telefono",
    value: "+39 328 918 5029",
    href: "tel:+393289185029",
    cta: "Chiama ora",
    note: "Parla direttamente con Grossi Moto.",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@grossimoto.it",
    href: "mailto:info@grossimoto.it",
    cta: "Scrivi un’email",
    note: "Descrivi il mezzo o il lavoro che ti serve.",
  },
  {
    icon: MapPin,
    label: "Dove siamo",
    value: "Via Festo Porzio, 22 · 00174 Roma RM",
    href: "https://share.google/ppfR023TdQcVrYya3",
    cta: "Apri su Google Maps",
    note: "Showroom e officina in sede.",
  },
];

function ContactsNav() {
  return (
    <header className="bg-white px-2 sm:px-4 lg:px-5">
      <nav
        aria-label="Navigazione Grossimoto"
        className="mx-auto flex min-h-[5.6rem] max-w-[122rem] items-center justify-between gap-3 px-3 py-3 text-[#0A0A0A] sm:px-4 lg:justify-start lg:gap-8 lg:px-5"
      >
        <Link
          href="/"
          aria-label="Torna alla home Grossimoto"
          className="font-ui group flex min-w-0 flex-col rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
        >
          <span className="text-base font-bold leading-none transition-opacity duration-150 group-hover:opacity-68 sm:text-lg">
            Grossimoto
          </span>
          <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.17em] text-black/48">
            Moto e scooter a Roma
          </span>
        </Link>

        <div className="font-ui hidden min-h-11 items-center gap-1 rounded-full bg-[#0A0A0A] p-1 text-sm font-bold text-white/72 lg:flex">
          {navItems.map((item) => {
            const current = item.href === "/contatti";
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={[
                  "rounded-full px-6 py-2.5 transition-[background-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none",
                  current
                    ? "bg-white text-[#0A0A0A]"
                    : "text-white/72 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex shrink-0 justify-end lg:hidden">
          <a
            href="tel:+393289185029"
            className="font-ui inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0A0A0A] px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white transition-[opacity,transform] duration-150 hover:opacity-[0.84] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none sm:px-4"
          >
            <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            <span className="hidden sm:inline">Chiama ora</span>
            <span className="sm:hidden">Chiama</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default async function ContattiPage({
  searchParams,
}: {
  searchParams: Promise<{
    modello?: string | string[];
    argomento?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const model = catalogScooters.find((item) => item.id === params.modello);
  const initialSubject = model
    ? "Disponibilità e acquisto"
    : params.argomento === "officina"
      ? "Prenotazione officina"
      : "";
  const initialMessage = model
    ? `Buongiorno, vorrei conoscere prezzo e disponibilità di ${model.name}.`
    : "";

  return (
    <main id="main-content" className="min-h-screen bg-white text-[#0A0A0A]">
      <ContactsNav />

      <section className="px-5 pb-16 pt-10 sm:px-7 sm:pb-20 sm:pt-14 md:px-10 lg:px-14 lg:pb-24 lg:pt-20 xl:px-20">
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(24rem,0.85fr)] lg:items-end lg:gap-16">
          <div>
            <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#C72A09] sm:text-xs">
              Contatti
            </p>
            <h1 className="font-display mt-5 max-w-[10ch] text-[clamp(3.1rem,16vw,9rem)] font-bold uppercase leading-[0.84] tracking-[-0.045em]">
              Parliamone.
            </h1>
          </div>

          <div className="max-w-[38rem] lg:pb-2">
            <p className="text-base leading-7 text-black/62 sm:text-lg sm:leading-8">
              Per scegliere moto o scooter, chiedere prezzo e disponibilità,
              parlare con l’officina o cercare ricambi e accessori: scegli il
              modo più semplice per contattarci.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="tel:+393289185029"
                className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-[opacity,transform] duration-150 hover:opacity-[0.86] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none"
              >
                Chiama ora
                <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </a>
              <Link
                href="#richiesta"
                className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0A0A0A]/18 px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#0A0A0A] transition-[border-color,background-color,transform] duration-150 hover:border-[#0A0A0A]/35 hover:bg-black/[0.035] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C72A09]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none"
              >
                Invia una richiesta
              </Link>
              <Link
                href="#sede"
                className="font-ui group inline-flex min-h-11 items-center justify-center gap-2 px-2 text-sm font-bold text-[#C72A09] outline-none transition-opacity duration-150 hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[#C72A09]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transition-none sm:justify-start"
              >
                Come raggiungerci
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-channels-title" className="px-5 pb-20 sm:px-7 sm:pb-24 md:px-10 lg:px-14 lg:pb-28 xl:px-20">
        <div className="mx-auto max-w-[92rem]">
          <h2 id="contact-channels-title" className="sr-only">
            Modi per contattare Grossi Moto
          </h2>
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-4 lg:gap-6">
            {channels.map(({ icon: Icon, label, value, href, cta, note }) => (
              <article
                key={label}
                className="flex min-w-0 flex-col rounded-[28px] bg-black/[0.035] px-5 py-6 sm:px-5 sm:py-6 lg:px-6 lg:py-7"
              >
                <div className="flex items-center gap-3 text-[#C72A09]">
                  <Icon aria-hidden="true" className="h-10 w-10 rounded-full bg-[#C72A09]/10 p-2.5 text-[#C72A09]" strokeWidth={1.8} />
                  <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em]">
                    {label}
                  </p>
                </div>
                <p className="mt-5 break-words text-lg font-semibold leading-7 text-[#0A0A0A] sm:text-base lg:text-lg">
                  {value}
                </p>
                <p className="mt-2 min-h-0 text-sm leading-6 text-black/52 sm:min-h-12">
                  {note}
                </p>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-ui group mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-sm text-sm font-bold text-[#0A0A0A] outline-none transition-colors duration-150 hover:text-[#C72A09] focus-visible:ring-2 focus-visible:ring-[#C72A09]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transition-none"
                >
                  {cta}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                    strokeWidth={1.8}
                  />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-2 pb-2 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5">
        <div className="overflow-hidden rounded-[32px] bg-[#C72A09] px-5 py-12 text-white sm:rounded-[40px] sm:px-7 sm:py-16 md:px-10 lg:rounded-[56px] lg:px-14 lg:py-20 xl:px-16">
          <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(32rem,1.28fr)] lg:items-start lg:gap-16 xl:gap-20">
            <div className="lg:sticky lg:top-10">
              <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                Invia una richiesta
              </p>
              <h2 className="font-display mt-4 max-w-[8ch] text-[clamp(3.2rem,8vw,7rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em] lg:text-[clamp(3.2rem,5.2vw,5.5rem)]">
                Raccontaci cosa ti serve.
              </h2>
              <p className="mt-6 max-w-[30rem] text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
                Indica il modello che stai valutando oppure, per l’officina, il
                mezzo e cosa hai notato. Se preferisci parlare direttamente,
                puoi sempre chiamarci.
              </p>
              <a
                href="tel:+393289185029"
                className="font-ui mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-bold text-white outline-none transition-opacity duration-150 hover:opacity-75 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#C72A09] motion-reduce:transition-none"
              >
                +39 328 918 5029
                <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </a>
            </div>

            <div className="rounded-[24px] bg-white p-5 text-[#0A0A0A] sm:rounded-[30px] sm:p-7 lg:p-9">
              <ContactForm
                key={model?.id ?? initialSubject}
                initialSubject={initialSubject}
                initialMessage={initialMessage}
                initialModelId={model?.id}
                models={catalogScooters.map(({ id, name, brand }) => ({
                  id,
                  name,
                  brand: getCatalogScooterBrand({ brand }),
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="sede" className="scroll-mt-6 bg-white px-2 pb-2 pt-2 sm:px-4 sm:pb-4 sm:pt-4 lg:px-5 lg:pb-5 lg:pt-5">
        <div className="overflow-hidden rounded-[32px] bg-[#111111] px-5 py-14 text-white sm:rounded-[40px] sm:px-7 sm:py-16 md:px-10 lg:rounded-[56px] lg:px-14 lg:py-20 xl:px-16">
          <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.72fr)] lg:items-start lg:gap-20">
            <div>
              <div className="flex items-center gap-3 text-[#C72A09]">
                <MapPin aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.2em] sm:text-xs">
                  Showroom e officina
                </p>
              </div>
              <h2 className="font-display mt-5 max-w-[10ch] text-[clamp(3rem,8vw,6.5rem)] font-bold uppercase leading-[0.87] tracking-[-0.04em]">
                Via Festo Porzio, 22.
              </h2>
              <p className="mt-4 text-base text-white/60 sm:text-lg">
                00174 Roma RM
              </p>
              <a
                href="https://share.google/ppfR023TdQcVrYya3"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#0A0A0A] transition-[background-color,transform] duration-150 hover:bg-white/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111] motion-reduce:transform-none motion-reduce:transition-none"
              >
                Apri su Google Maps
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                  strokeWidth={1.8}
                />
              </a>
            </div>

            <div className="pt-7 lg:pl-12 lg:pt-0">
              <div className="flex items-center gap-3 text-[#C72A09]">
                <Clock aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                <h2 className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.2em] sm:text-xs">
                  Orari di apertura
                </h2>
              </div>
              <ul className="mt-7 grid gap-3">
                {hours.map(({ days, time }) => (
                  <li
                    key={days}
                    className="grid gap-1 rounded-2xl bg-white/[0.06] px-4 py-3 text-sm sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-baseline sm:gap-5"
                  >
                    <span className="font-semibold text-white">{days}</span>
                    <span className="font-numeric break-words text-white/62 sm:text-right">
                      {time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-7 sm:py-24 md:px-10 lg:px-14 lg:py-28 xl:px-20">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-8 pt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-14 lg:pt-14">
          <div>
            <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#C72A09] sm:text-xs">
              Un ultimo dubbio?
            </p>
            <h2 className="font-display mt-3 text-[clamp(3rem,7vw,6rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em]">
              Chiedi pure.
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="tel:+393289185029"
              className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-[opacity,transform] duration-150 hover:opacity-[0.86] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none"
            >
              Chiama ora
              <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </a>
            <Link
              href="#richiesta"
              className="font-ui inline-flex min-h-12 items-center justify-center rounded-full border border-[#C72A09] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#C72A09] transition-[background-color,color,transform] duration-150 hover:bg-[#C72A09] hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C72A09]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none"
            >
              Invia una richiesta
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
