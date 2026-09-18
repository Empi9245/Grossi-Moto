"use client";

import Image from "next/image";
import { PhoneCall } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ServiceSwipe, type Service } from "./ServiceSwipe";

const services: Service[] = [
  {
    title: "Officina moto e scooter",
    statement: "Capire il problema è il primo passo.",
    description:
      "Descrivici cosa hai notato. Controlliamo il mezzo per individuare le necessità e definire il lavoro.",
    features: [
      "Diagnosi strumentale",
      "Spiegazione degli interventi",
      "Controllo del veicolo",
    ],
    image: "/grossimoto/servizi/officina-autorizzata.webp",
    alt: "Officina scooter Grossi Moto a Roma",
  },
  {
    title: "Tagliandi",
    statement: "Il tagliando adatto al tuo mezzo.",
    description:
      "Modello, chilometri e tempo trascorso dall’ultimo tagliando ci aiutano a valutare i controlli necessari.",
    features: [
      "Chilometri e scadenze",
      "Materiali adatti al modello",
      "Lavori concordati",
    ],
    image: "/grossimoto/servizi/tagliandi.webp",
    alt: "Tagliando scooter a Roma, Grossi Moto",
  },
  {
    title: "Ricambi e accessori",
    statement: "Compatibili con il mezzo e con il tuo uso.",
    description:
      "Ci dici il modello e cosa ti serve. Verifichiamo compatibilità, disponibilità e possibilità di montaggio in officina.",
    features: [
      "Componenti per KYMCO e Voge",
      "Verifica della compatibilità",
      "Montaggio in officina",
    ],
    image: "/grossimoto/servizi/ricambi-originali.webp",
    alt: "Ricambi e accessori scooter a Roma, Grossi Moto",
  },
  {
    title: "Finanziamenti",
    statement: "Valuta anche come acquistarlo.",
    description:
      "Chiedici quali soluzioni di finanziamento sono disponibili per il modello che hai scelto e quali condizioni prevedono.",
    features: [
      "Soluzioni da verificare in sede",
      "Informazioni su anticipo e durata",
      "Condizioni da valutare",
    ],
    image: "/grossimoto/servizi/finanziamenti.webp",
    alt: "Finanziamento scooter a Roma, Grossi Moto",
  },
  {
    title: "Permute",
    statement: "Vuoi cambiare mezzo? Partiamo dal tuo.",
    description:
      "Portaci le informazioni sul tuo mezzo. Ne valutiamo lo stato per capire insieme la possibilità di una permuta.",
    features: [
      "Valutazione diretta",
      "Verifica dello stato del mezzo",
      "Possibilità di permuta",
    ],
    image: "/grossimoto/servizi/permute.webp",
    alt: "Valutazione permuta scooter usato a Roma, Grossi Moto",
  },
  {
    title: "Consulenza",
    statement: "La scelta parte dai tuoi percorsi.",
    description:
      "Traffico, passeggero, tragitti più lunghi: raccontaci come ti muovi. Confrontiamo postura, cilindrata e accessori adatti al tuo uso.",
    features: [
      "Confronto sull’uso quotidiano",
      "Postura e cilindrata",
      "Accessori adatti al mezzo",
    ],
    image: "/grossimoto/servizi/consulenza.webp",
    alt: "Consulenza per scegliere uno scooter a Roma, Grossi Moto",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export function StickyScrollShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="services-showcase-heading"
      className="bg-white px-5 py-16 text-[#0A0A0A] sm:px-7 sm:py-20 md:px-10 lg:px-5 lg:py-24 xl:py-28"
    >
      <div className="mx-auto max-w-[122rem]">
        <div className="grid gap-7 border-t border-black/16 pt-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(24rem,0.7fr)] lg:items-end lg:gap-12 lg:px-9 xl:px-11">
          <h2
            id="services-showcase-heading"
            className="font-display max-w-[11ch] text-[clamp(3.2rem,10vw,8.5rem)] font-bold uppercase leading-[0.84] tracking-[-0.04em]"
          >
            Cosa possiamo fare per te.
          </h2>
          <p className="max-w-[34rem] text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
            Dalla manutenzione alla scelta del mezzo: un unico punto di
            riferimento per capire cosa serve e come procedere.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20">
          <ServiceSwipe services={services} />

          <div className="hidden grid-cols-3 gap-5 lg:grid xl:gap-6">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                className="group relative flex min-h-[36rem] flex-col overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-sm"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 24,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion ? 0 : (index % 3) * 0.08,
                  ease: easeOut,
                }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 32vw, 1px"
                    className="object-cover transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] motion-reduce:transition-none"
                    priority={index < 3}
                  />

                  <div className="font-ui absolute left-5 top-5 flex min-h-9 items-center rounded-full bg-white/94 px-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0A0A0A] shadow-sm backdrop-blur-sm">
                    <span className="mr-2 text-[#C72A09]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    / {String(services.length).padStart(2, "0")}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 xl:p-7">
                  <h3 className="font-display max-w-[14ch] text-[clamp(2rem,2.6vw,3.35rem)] font-bold uppercase leading-[0.88] tracking-[-0.035em] text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mt-4 max-w-[25ch] text-[clamp(1.15rem,1.35vw,1.5rem)] font-semibold leading-[1.06] text-gray-900">
                    {service.statement}
                  </p>

                  <p className="mt-4 max-w-[42ch] text-sm leading-6 text-gray-600 xl:text-[0.98rem] xl:leading-7">
                    {service.description}
                  </p>

                  <ul className="font-ui mt-6 grid border-y border-black/10 text-[0.68rem] font-bold uppercase tracking-[0.045em] text-gray-600">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="border-b border-black/8 py-2.5 last:border-b-0"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                    <span className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.14em] text-black/40">
                      Grossimoto · Roma
                    </span>

                    <a
                      href="tel:+393289185029"
                      aria-label={`Chiama per informazioni su ${service.title}`}
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] text-white transition-[background-color,transform] duration-200 hover:bg-[#C72A09] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-3 motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      <PhoneCall
                        aria-hidden="true"
                        className="h-4 w-4"
                        strokeWidth={1.8}
                      />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
