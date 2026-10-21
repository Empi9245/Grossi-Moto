import { BrandLogo } from "@/components/layout/BrandLogo";
import { ActionMark } from "@/components/ui/control-glyphs";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

import { ContactForm } from "@/components/contact/ContactForm";
import styles from "@/components/sections/journey.module.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { catalogScooters, getCatalogScooterBrand } from "@/data/catalog-scooters";

export const metadata = pageMetadata(
  "Contatti e orari a Roma",
  "Chiama Grossi Moto al 328 918 5029 o invia una richiesta per scooter e officina. Indirizzo, orari e indicazioni per Via Festo Porzio 22, Roma.",
  "/contatti",
);

const navItems = [
  { label: "Home", href: "/" },
  { label: "Gamma", href: "/scooters" },
  { label: "Servizi", href: "/servizi" },
  { label: "Contatti", href: "/contatti" },
];

const hours = [
  { days: "Lun – Ven", time: "08:30 – 13:00 / 14:30 – 19:00" },
  { days: "Sabato", time: "08:30 – 13:00" },
  { days: "Domenica", time: "Chiuso" },
];

function ContactsNav() {
  return (
    <header className="bg-white px-2 sm:px-4 lg:px-5">
      <nav
        aria-label="Navigazione Grossimoto"
        className="mx-auto flex min-h-[5.6rem] max-w-[122rem] items-center justify-between gap-3 px-3 py-3 text-[#0A0A0A] sm:px-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-5"
      >
        <Link
          href="/"
          aria-label="Torna alla home Grossimoto"
          className="group inline-flex min-w-0 items-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
        >
          <BrandLogo tone="black" priority className="w-[8.25rem] sm:w-[9rem]" />
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

        <div className="ml-auto flex shrink-0 justify-end lg:ml-0 lg:justify-self-end">
          <a
            href="tel:+393289185029"
            className="font-ui inline-flex min-h-11 items-center gap-2 rounded-[0.9rem] bg-[#0A0A0A] px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white transition-[opacity,transform] duration-150 hover:opacity-[0.84] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none sm:px-4"
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

      <section aria-labelledby="contacts-heading" className={styles.section}>
        <div className={`${styles.frame} grid gap-6 md:grid-cols-2 md:gap-10 lg:gap-16`}>
          <h1 id="contacts-heading" className={`font-display ${styles.heading}`}>Contatti e orari.</h1>
          <div>
            <p className={styles.body}>Grossi Moto di Angelo Grossi, a Roma. Per un modello da conoscere o un intervento da concordare, scegli come contattarci.</p>
            <div className={styles.actions}>
              <a href="tel:+393289185029" className={`font-ui ${styles.primary}`}>Chiama ora <PhoneCall aria-hidden="true" className="h-4 w-4" /></a>
              <Link href="#richiesta" className={`font-ui ${styles.secondary}`}>Prepara una richiesta <ActionMark /></Link>
            </div>
            <p className="mt-6 text-base leading-7">
              <a href="tel:+393289185029" className="rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">+39 328 918 5029</a><br />
              <a href="mailto:info@grossimoto.it" className="rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">info@grossimoto.it</a>
              <br />
              <a href="https://share.google/ppfR023TdQcVrYya3" className="inline-flex min-h-11 items-center gap-2 rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Indicazioni per arrivare <ActionMark /></a>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="request-heading" className="bg-white px-2 pb-2 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5">
        <div className={`rounded-[32px] bg-[#A34A3E] text-white sm:rounded-[40px] lg:rounded-[56px] ${styles.section} ${styles.inset} ${styles.inverse}`}>
          <div className={`${styles.frame} grid gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:items-start lg:gap-16`}>
            <div>
              <h2 id="request-heading" className={`font-display ${styles.heading}`}>La tua richiesta.</h2>
              <p className={`mt-5 ${styles.body}`}>Alla fine scegli come contattarci: WhatsApp, email o una richiesta di richiamata.</p>
            </div>
            <div className="min-w-0 rounded-[24px] bg-white p-5 text-[#0A0A0A] sm:p-6 lg:p-8">
              <ContactForm
                key={model?.id ?? initialSubject}
                initialSubject={initialSubject}
                initialMessage={initialMessage}
                initialModelId={model?.id}
                models={catalogScooters.map(({ id, name, brand }) => ({
                  id, name, brand: getCatalogScooterBrand({ brand }),
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="sede" aria-labelledby="location-heading" className="scroll-mt-6 bg-white px-2 pb-2 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5">
        <div className={`rounded-[32px] bg-[#111111] text-white sm:rounded-[40px] lg:rounded-[56px] ${styles.section} ${styles.inset} ${styles.inverse}`}>
          <div className={`${styles.frame} grid gap-10 md:grid-cols-2 md:gap-10 lg:gap-16`}>
            <div>
              <h2 id="location-heading" className={`font-display ${styles.heading}`}>Vieni in sede.</h2>
              <p className="mt-5 text-base leading-7">Grossi Moto di Angelo Grossi<br />Via Festo Porzio, 22 · 00174 Roma RM<br />Showroom e officina nello stesso posto.</p>
              <div className={styles.actions}>
                <a href="https://share.google/ppfR023TdQcVrYya3" target="_blank" rel="noopener noreferrer" className={`font-ui ${styles.primary}`}>Apri su Google Maps <ActionMark /></a>
              </div>
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold leading-tight">Orari di apertura</h3>
              <dl className="mt-5 grid gap-4">
                {hours.map(({ days, time }) => (
                  <div key={days} className="grid gap-1 text-base leading-7 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-5">
                    <dt className="font-semibold">{days}</dt><dd className="font-numeric">{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
