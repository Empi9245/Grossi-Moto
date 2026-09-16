import { pageMetadata } from "@/lib/seo";

import { CatalogPage } from "@/components/catalog/CatalogPage";

export const metadata = pageMetadata("Moto e scooter KYMCO e Voge a Roma", "Confronta moto e scooter KYMCO e Voge: cilindrate, caratteristiche e uso. Grossi Moto a Roma ti aiuta a scegliere. Chiedi prezzo e disponibilità.", "/scooters");

type ScootersPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getFocusParam(searchParams: Record<string, string | string[] | undefined>) {
  const focus = searchParams.focus;

  if (Array.isArray(focus)) {
    return focus[0];
  }

  return focus;
}

export default async function ScootersPage({ searchParams }: ScootersPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const focusParam = getFocusParam(resolvedSearchParams);

  return (
    <CatalogPage
      key={focusParam ?? "no-focus"}
      initialFocusId={focusParam}
    />
  );
}
