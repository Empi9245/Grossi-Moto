"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
      className="bg-white px-5 py-16 text-[#0A0A0A] sm:px-7 sm:py-20 md:px-10 lg:px-2 lg:py-12 xl:py-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="lg:px-2">
          <h2
            id="services-showcase-heading"
            className="font-display text-[clamp(3rem,6vw,5.8rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]"
          >
            Cosa possiamo fare per te.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-black/60 sm:text-lg sm:leading-8">
            Dalla manutenzione alla scelta del mezzo: un unico punto di
            riferimento per capire cosa serve e come procedere.
          </p>
        </div>

        <div className="mt-12">
          <ServiceSwipe services={services} />

          <div className="hidden grid-cols-3 gap-4 lg:grid xl:gap-6">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                className="group relative min-h-[390px] overflow-hidden rounded-3xl bg-[#F4F4F2] p-6"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.6,
                  delay: reduceMotion ? 0 : (index % 3) * 0.1,
                  ease: easeOut,
                }}
              >
                <h3 className="font-display relative z-10 mx-auto max-w-[12ch] text-center text-[clamp(2rem,2.7vw,3.35rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em] text-[#0A0A0A]">
                  {service.title}
                </h3>

                <div className="absolute inset-x-6 top-[6.5rem] flex h-[13.5rem] items-center justify-center xl:top-[7.2rem] xl:h-[14.5rem]">
                  <div className="relative h-full w-[78%] overflow-hidden rounded-2xl bg-white/55">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 1px"
                      className="object-cover opacity-95 transition-[transform,opacity] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  </div>
                </div>

                <div className="absolute inset-x-6 bottom-6 pr-16">
                  <p className="text-[1.02rem] font-semibold leading-[1.12] text-black/82">
                    {service.statement}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-black/56">
                    {service.description}
                  </p>
                </div>

                <div className="absolute bottom-0 right-0 z-20 h-20 w-20 rounded-tl-2xl border-l border-t border-black/5 bg-white">
                  <a
                    href="tel:+393289185029"
                    aria-label={"Chiama per informazioni su " + service.title}
                    className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0A0A0A] text-white shadow-sm transition-[background-color,transform] duration-300 group-hover:bg-[#C72A09] group-hover:scale-105 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-3 motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.9}
                    />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
