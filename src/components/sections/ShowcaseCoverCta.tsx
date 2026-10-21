import Link from "next/link";
import { ActionMark } from "@/components/ui/control-glyphs";
import styles from "./journey.module.css";

export function ShowcaseCoverCta() {
  return (
    <section aria-labelledby="showroom-next-heading" data-call-cta-theme="black" className={`relative z-30 bg-white text-[var(--gm-ink)] ${styles.section}`}>
      <div className={`${styles.frame} grid gap-6 md:grid-cols-2 md:items-start md:gap-10`}>
        <h2 id="showroom-next-heading" className={`font-display ${styles.heading}`}>Scegli dal vivo.</h2>
        <div>
          <p className={styles.body}>
            Tra due modelli, la differenza si sente in sella. Confrontiamo altezza,
            posizione di guida e spazio in base ai tuoi tragitti.
          </p>
          <div className={styles.actions}>
            <Link href="/scooters" className={`font-ui ${styles.primary}`}>Esplora la gamma <ActionMark /></Link>
            <a href="tel:+393289185029" className={`font-ui ${styles.secondary}`}>Chiedi un consiglio</a>
          </div>
        </div>
      </div>
    </section>
  );
}
