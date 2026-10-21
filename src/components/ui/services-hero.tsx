import Image from "next/image";
import Link from "next/link";
import { MapPin, PhoneCall } from "lucide-react";
import { ActionMark } from "@/components/ui/control-glyphs";
import journey from "@/components/sections/journey.module.css";
import styles from "./services-hero.module.css";

export function ServicesHero() {
  return (
    <section aria-labelledby="services-hero-title" data-services-hero className={`${journey.section} ${styles.hero}`}>
      <div className={`${journey.frame} ${styles.layout}`}>
        <div className={styles.copy}>
          <h1 id="services-hero-title" data-services-title className={`font-display ${styles.title}`}>
            <span>Officina</span><span>moto e scooter.</span>
          </h1>
          <p className={`${journey.body} ${styles.description}`}>
            Tagliandi, diagnosi e accessori per KYMCO e Voge. Da Grossi Moto di
            Angelo Grossi, showroom e officina sono nello stesso indirizzo, a Roma.
          </p>
          <div className={journey.actions}>
            <Link href="/contatti?argomento=officina#richiesta" className={`font-ui ${journey.primary} ${styles.request}`}>
              Richiedi assistenza <ActionMark />
            </Link>
            <a href="tel:+393289185029" aria-label="Chiama l’officina al 328 918 5029" className={`font-ui ${journey.secondary}`}>
              <PhoneCall aria-hidden="true" className="h-4 w-4" />328 918 5029
            </a>
          </div>
          <a href="https://share.google/ppfR023TdQcVrYya3" className={`font-ui ${styles.directions}`}>
            <MapPin aria-hidden="true" className="h-5 w-5 shrink-0" />
            <span>Via Festo Porzio 22, Roma<br /><span className="underline underline-offset-4">Indicazioni per arrivare</span></span>
          </a>
        </div>
        <figure className={styles.media}>
          <Image
            src="/grossimoto/servizi/manutenzione-dettaglio.webp"
            alt="Dettaglio illustrativo di un intervento sulla ruota di uno scooter."
            width={768}
            height={576}
            priority
            sizes="(min-width: 1440px) 580px, (min-width: 768px) 46vw, 100vw"
            className={styles.photo}
          />
          <figcaption className="mt-3 text-sm leading-6">Immagine illustrativa</figcaption>
        </figure>
      </div>
    </section>
  );
}
