import { catalogScooters } from "./catalog-scooters";
import { showroomSurfaceTone } from "./scooter-color-system";

export type ShowcaseSpec = {
  label: string;
  value: string;
  unit?: string;
};

export type ShowcaseScooter = {
  id: string;
  name: string;
  shortName: string;
  categoryLabel: string;
  image: string;
  sourceAsset: string;
  specs: ShowcaseSpec[];
  statement: string;
  watermark: string;
  backgroundSurface: string;
  textTone: string;
  mutedTone: string;
  inactiveTone: string;
  watermarkTone: string;
  ruleTone: string;
  accentTone: string;
  chipSurface: string;
  shadowTone: string;
  shadowX: string;
  shadowY: string;
  shadowWidth: string;
  shadowHeight: string;
  shadowOpacity: number;
  imageOffsetX: string;
  imageOffsetY: string;
};

const catalogById = new Map(
  catalogScooters.map((scooter) => [scooter.id, scooter]),
);

function catalogScooter(id: string) {
  const scooter = catalogById.get(id);

  if (!scooter) {
    throw new Error(`Missing catalog scooter for showcase id: ${id}`);
  }

  return scooter;
}

function publicSourceAsset(image: string) {
  return `public${image}`;
}

const showroomImages = {
  peopleS:
    "/kymco-all/models/people-s-125-abs/antracite-scais-opaco-nh263/main-color-01-antracite-scais-opaco-nh263.jpg",
  agilityS:
    "/kymco-all/models/agility-s-125/bianco-cevedale-opaco-cn607/main-color-01-bianco-cevedale-opaco-cn607.jpg",
  downtown:
    "/foto sezione show/Downtown 350 GT-main-color-01-nero-collio-opaco-nh105_no_bg.png",
  agility:
    "/foto sezione show/Agility 350-main-color-01-blu-petrolio-cg411_no_bg.png",
  xTownSt:
    "/kymco-all/models/x-town-250st/antracite-scais-opaco-nh263/main-color-01-antracite-scais-opaco-nh263.jpg",
  ak575:
    "/kymco-all/models/ak575-premium/nero-odolo-opaco-nh294/main-color-02-nero-odolo-opaco-nh294.jpg",
} as const;

const peopleS = catalogScooter("people-s-125-abs");
const agilityS = catalogScooter("agility-s-125");
const downtown = catalogScooter("downtown-350-gt");
const agility = catalogScooter("agility-350");
const xTownSt = catalogScooter("x-town-250st");
const ak575 = catalogScooter("ak575-premium");

export const showcaseScooters: ShowcaseScooter[] = [
  {
    id: peopleS.id,
    name: peopleS.name,
    shortName: "People S",
    categoryLabel: "Ruote alte",
    image: showroomImages.peopleS,
    sourceAsset: publicSourceAsset(showroomImages.peopleS),
    specs: [
      { label: "Cilindrata", value: "125", unit: "CC" },
      { label: "Categoria", value: "Alte", unit: "Ruote" },
      { label: "Uso", value: "Centro", unit: "Roma" },
    ],
    statement: peopleS.positioning,
    watermark: "125",
    ...showroomSurfaceTone("heroWarmIvory"),
    shadowX: "6%",
    shadowY: "8%",
    shadowWidth: "72%",
    shadowHeight: "8%",
    shadowOpacity: 0.18,
    imageOffsetX: "1%",
    imageOffsetY: "0%",
  },
  {
    id: agilityS.id,
    name: agilityS.name,
    shortName: "Agility S",
    categoryLabel: "Urban",
    image: showroomImages.agilityS,
    sourceAsset: publicSourceAsset(showroomImages.agilityS),
    specs: [
      { label: "Cilindrata", value: "125", unit: "CC" },
      { label: "Categoria", value: "Urban", unit: "" },
      { label: "Uso", value: "Daily", unit: "Roma" },
    ],
    statement: agilityS.positioning,
    watermark: "S125",
    ...showroomSurfaceTone("mineralBlueGrey"),
    shadowX: "5%",
    shadowY: "8%",
    shadowWidth: "72%",
    shadowHeight: "8%",
    shadowOpacity: 0.18,
    imageOffsetX: "1%",
    imageOffsetY: "0%",
  },
  {
    id: downtown.id,
    name: downtown.name,
    shortName: "GT",
    categoryLabel: "GT",
    image: showroomImages.downtown,
    sourceAsset: publicSourceAsset(showroomImages.downtown),
    specs: [
      { label: "Cilindrata", value: "350", unit: "CC" },
      { label: "Categoria", value: "GT", unit: "" },
      { label: "Uso", value: "Lungo", unit: "Roma" },
    ],
    statement: downtown.positioning,
    watermark: "GT",
    ...showroomSurfaceTone("dryChampagne"),
    shadowX: "5%",
    shadowY: "8%",
    shadowWidth: "78%",
    shadowHeight: "8%",
    shadowOpacity: 0.19,
    imageOffsetX: "0%",
    imageOffsetY: "0%",
  },
  {
    id: agility.id,
    name: agility.name,
    shortName: "A350",
    categoryLabel: "Ruote alte",
    image: showroomImages.agility,
    sourceAsset: publicSourceAsset(showroomImages.agility),
    specs: [
      { label: "Cilindrata", value: "350", unit: "CC" },
      { label: "Categoria", value: "Alte", unit: "Ruote" },
      { label: "Uso", value: "Daily", unit: "Roma" },
    ],
    statement: agility.positioning,
    watermark: "350",
    ...showroomSurfaceTone("mutedSage"),
    shadowX: "2%",
    shadowY: "10%",
    shadowWidth: "70%",
    shadowHeight: "7.8%",
    shadowOpacity: 0.18,
    imageOffsetX: "-1%",
    imageOffsetY: "0%",
  },
  {
    id: xTownSt.id,
    name: xTownSt.name,
    shortName: "X-Town ST",
    categoryLabel: "250",
    image: showroomImages.xTownSt,
    sourceAsset: publicSourceAsset(showroomImages.xTownSt),
    specs: [
      { label: "Cilindrata", value: "250", unit: "CC" },
      { label: "Categoria", value: "Tour", unit: "" },
      { label: "Uso", value: "Comfort", unit: "" },
    ],
    statement: xTownSt.positioning,
    watermark: "250",
    ...showroomSurfaceTone("lightClay"),
    shadowX: "7%",
    shadowY: "8%",
    shadowWidth: "77%",
    shadowHeight: "8.5%",
    shadowOpacity: 0.2,
    imageOffsetX: "1%",
    imageOffsetY: "0%",
  },
  {
    id: ak575.id,
    name: ak575.name,
    shortName: "AK575",
    categoryLabel: "Sport",
    image: showroomImages.ak575,
    sourceAsset: publicSourceAsset(showroomImages.ak575),
    specs: [
      { label: "Cilindrata", value: "575", unit: "CC" },
      { label: "Categoria", value: "Sport", unit: "" },
      { label: "Uso", value: "Touring", unit: "" },
    ],
    statement: ak575.positioning,
    watermark: "AK",
    ...showroomSurfaceTone("paleStone"),
    shadowX: "7%",
    shadowY: "7%",
    shadowWidth: "82%",
    shadowHeight: "8.5%",
    shadowOpacity: 0.2,
    imageOffsetX: "0%",
    imageOffsetY: "0%",
  },
];
