import { AccessoryRail } from "./AccessoryRail";
import styles from "./journey.module.css";

export function AccessoriesSection() {
  return (
    <section aria-labelledby="accessories-heading" data-call-cta-theme="black" className="relative bg-white text-[#111111]">
      <div className={`relative overflow-hidden rounded-[32px] bg-[var(--home-accessories-surface)] sm:rounded-[40px] lg:rounded-[56px] ${styles.section}`}>
        <div className={styles.frame}>
          <div className="mb-8 grid gap-5 md:grid-cols-2 md:items-start md:gap-10 lg:mb-10">
            <h2 id="accessories-heading" className={`font-display ${styles.heading}`}>Accessori per i tuoi tragitti.</h2>
            <p className={styles.body}>Spazio, protezione o praticità: scegli una categoria e chiedici cosa si adatta al tuo mezzo.</p>
          </div>
          <AccessoryRail />
        </div>
      </div>
    </section>
  );
}
