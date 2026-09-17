import { pageMetadata } from "@/lib/seo";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { AccessoriesSection } from "@/components/sections/AccessoriesSection";
import { ContactBriefSection } from "@/components/sections/ContactBriefSection";
import { GrossimotoExperienceSection } from "@/components/sections/GrossimotoExperienceSection";
import { HeroRevealStage } from "@/components/sections/HeroRevealStage";
import { ShowcaseCoverCta } from "@/components/sections/ShowcaseCoverCta";
import { WorkshopSection } from "@/components/sections/WorkshopSection";

export const metadata = pageMetadata("Scooter KYMCO e Voge a Roma", "Scegli il tuo scooter KYMCO o Voge da Grossi Moto a Roma. Consulenza, accessori e officina in Via Festo Porzio 22. Chiedi prezzo e disponibilità.", "/");

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MotorcycleDealer", "AutoRepair"],
  name: "Grossi Moto di Angelo Grossi",
  alternateName: "Grossimoto",
  description:
    "Punto vendita e officina scooter a Roma con gamma KYMCO e Voge, consulenza, accessori e assistenza.",
  telephone: "+393289185029",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Festo Porzio, 22",
    postalCode: "00174",
    addressLocality: "Roma",
    addressRegion: "RM",
    addressCountry: "IT",
  },
  areaServed: "Roma",
  hasMap: "https://share.google/ppfR023TdQcVrYya3",
  openingHours: [
    "Mo-Fr 08:30-13:00",
    "Mo-Fr 14:30-19:00",
    "Sa 08:30-13:00",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "14:30",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:30",
      closes: "13:00",
    },
  ],
};

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroRevealStage />
      <ShowcaseCoverCta />
      <GrossimotoExperienceSection />
      <AccessoriesSection />
      <WorkshopSection />
      <ContactBriefSection />
      <SiteFooter />
    </main>
  );
}
