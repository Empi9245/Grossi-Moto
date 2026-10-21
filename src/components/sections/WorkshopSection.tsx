import Link from "next/link";
import { ActionMark } from "@/components/ui/control-glyphs";
import styles from "./journey.module.css";

const workshopItems = [
  { title: "Consegna e controlli", description: "Prima di partire, controlliamo il mezzo e ti spieghiamo come usarlo." },
  { title: "Manutenzione e diagnosi", description: "Dal tagliando al controllo di un problema, valutiamo il lavoro in base al mezzo e al suo utilizzo." },
  { title: "Montaggio accessori", description: "Verifichiamo compatibilità e punti di fissaggio prima del montaggio." },
];

export function WorkshopSection() {
  return (
    <section aria-labelledby="workshop-heading" data-call-cta-theme="black" className="relative bg-white text-[var(--gm-ink)]">
      <div className={`rounded-[32px] bg-[var(--home-workshop-surface)] sm:rounded-[40px] lg:rounded-[56px] ${styles.section}`}>
        <div className={`${styles.frame} grid gap-10 md:grid-cols-2 md:gap-10 lg:gap-16`}>
          <div>
            <h2 id="workshop-heading" className={`font-display ${styles.heading}`}>L’officina, nello stesso posto.</h2>
            <p className={`mt-5 ${styles.body}`}>Un tagliando da fare o un rumore da capire? In Via Festo Porzio 22 trovi assistenza per moto e scooter, anche dopo la consegna.</p>
            <div className={styles.actions}>
              <a href="tel:+393289185029" className={`font-ui ${styles.primary}`}>Chiama l’officina</a>
              <Link href="/servizi" className={`font-ui ${styles.secondary}`}>Esplora i servizi <ActionMark /></Link>
            </div>
          </div>
          <dl className="grid content-start gap-7">
            {workshopItems.map(({ title, description }) => (
              <div key={title}>
                <dt className="font-display text-2xl font-semibold leading-tight">{title}</dt>
                <dd className="mt-2 max-w-[48ch] text-base leading-7">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
