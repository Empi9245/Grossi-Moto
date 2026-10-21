import Link from "next/link";
import { ActionMark } from "@/components/ui/control-glyphs";
import styles from "./journey.module.css";

export function ContactBriefSection() {
  return (
    <section aria-labelledby="home-contact-heading" data-call-cta-theme="black" className={`rounded-[32px] bg-[var(--home-contact-surface)] text-[var(--gm-ink)] sm:rounded-[40px] lg:rounded-[56px] ${styles.section}`}>
      <div className={`${styles.frame} grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-16`}>
        <div>
          <h2 id="home-contact-heading" className={`font-display ${styles.heading}`}>Ci trovi a Roma.</h2>
          <p className="mt-5 text-base leading-7">Grossi Moto di Angelo Grossi<br />Via Festo Porzio, 22 · 00174 Roma RM</p>
          <div className={styles.actions}>
            <Link href="/contatti#richiesta" className={`font-ui ${styles.primary}`}>Scrivici <ActionMark /></Link>
            <a href="tel:+393289185029" className={`font-ui ${styles.secondary}`}>Chiama ora</a>
          </div>
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold leading-tight">Orari e indicazioni</h3>
          <ul className="mt-4 space-y-2 text-base leading-7">
            <li>Lun–Ven 08:30–13:00 / 14:30–19:00</li><li>Sabato 08:30–13:00</li><li>Domenica chiuso</li>
          </ul>
          <a href="https://share.google/ppfR023TdQcVrYya3" className={`font-ui mt-6 ${styles.secondary}`}>Apri su Google Maps <ActionMark /></a>
        </div>
      </div>
    </section>
  );
}
