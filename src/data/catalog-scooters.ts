import {
  catalogSurfaceTone,
  type ProductCardToneId,
} from "./scooter-color-system";

export type CatalogFilter =
  | "all"
  | "50cc"
  | "125cc"
  | "150-250cc"
  | "300cc+";

export type CatalogFilterCategory = Exclude<CatalogFilter, "all"> | "other";

export type CatalogBrand = "KYMCO" | "Voge";

export type CatalogSpecIcon = "gauge" | "layers" | "route" | "shield" | "map";

export type CatalogSpec = {
  label:
    | "Cilindrata"
    | "Categoria"
    | "Sicurezza"
    | "Uso ideale"
    | "Omologazione"
    | "Disponibilita";
  value: string;
  icon: CatalogSpecIcon;
};

export type CatalogScooter = {
  id: string;
  brand?: CatalogBrand;
  name: string;
  shortName: string;
  subtitle: string;
  displacement: string;
  filterCategory: CatalogFilterCategory;
  family: string;
  positioning: string;
  idealUse: string;
  image: string;
  imageAlt: string;
  imageKind: "transparent" | "official";
  imageOffsetX?: string;
  imageOffsetY?: string;
  cardToneId: ProductCardToneId;
  featureSurface: string;
  cardSurface: string;
  accentTone: string;
  textTone: string;
  mutedTone: string;
  shadowTone: string;
  specs: CatalogSpec[];
  isFlagship?: boolean;
  isShowroomModel?: boolean;
};

const kymcoProductWorkbenchBase = "/kymco-workbench/catalog-products-originals";

const sharedSpecs = {
  showroom: {
    label: "Disponibilita" as const,
    value: "Verifica in sede",
    icon: "map" as const,
  },
  official: {
    label: "Sicurezza" as const,
    value: "Dotazioni da verificare",
    icon: "shield" as const,
  },
};

export const catalogFilters: { id: CatalogFilter; label: string }[] = [
  { id: "all", label: "Tutti" },
  { id: "50cc", label: "50cc" },
  { id: "125cc", label: "125cc" },
  { id: "150-250cc", label: "150-250cc" },
  { id: "300cc+", label: "300cc+" },
];

export const catalogScooters: CatalogScooter[] = [
  {
    id: "dtx-360-350",
    name: "DTX 360 350",
    shortName: "DTX",
    subtitle: "Crossover 300cc+",
    displacement: "350cc",
    filterCategory: "300cc+",
    family: "Crossover",
    positioning: "Assetto alto, protezione e presenza tecnica per chi alterna Roma, raccordo e gite fuori porta.",
    idealUse: "Roma e fuori citta",
    image: `${kymcoProductWorkbenchBase}/01-dtx-360-350_no_bg.png`,
    imageAlt: "KYMCO DTX 360 350 nero e verde in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("warmIvory"),
    specs: [
      { label: "Cilindrata", value: "350cc", icon: "gauge" },
      { label: "Categoria", value: "Crossover", icon: "layers" },
      { label: "Uso ideale", value: "Urbano + touring", icon: "route" },
    ],
    isFlagship: true,
    isShowroomModel: true,
  },
  {
    id: "downtown-350-gt",
    name: "Downtown 350 GT",
    shortName: "GT",
    subtitle: "Gran turismo compatto",
    displacement: "350cc",
    filterCategory: "300cc+",
    family: "GT",
    positioning: "Un GT compatto per giornate dense, trasferimenti piu lunghi e comfort da maxi-scooter.",
    idealUse: "Tangenziale e commuting",
    image: `${kymcoProductWorkbenchBase}/02-downtown-350-gt_no_bg.png`,
    imageAlt: "KYMCO Downtown 350 GT nero opaco in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("lightClay"),
    specs: [
      { label: "Cilindrata", value: "350cc", icon: "gauge" },
      { label: "Categoria", value: "GT", icon: "layers" },
      { label: "Uso ideale", value: "Lungo raggio urbano", icon: "route" },
    ],
    isFlagship: true,
    isShowroomModel: true,
  },
  {
    id: "agility-350",
    name: "Agility 350",
    shortName: "Agility",
    subtitle: "Ruote alte 300cc+",
    displacement: "350cc",
    filterCategory: "300cc+",
    family: "Ruote alte",
    positioning: "Ruote alte e cilindrata importante, una scelta pratica quando il percorso cambia ogni giorno.",
    idealUse: "Citta veloce",
    image: `${kymcoProductWorkbenchBase}/03-agility-350_no_bg.png`,
    imageAlt: "KYMCO Agility 350 blu petrolio in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("mutedSage"),
    specs: [
      { label: "Cilindrata", value: "350cc", icon: "gauge" },
      { label: "Categoria", value: "Ruote alte", icon: "layers" },
      { label: "Uso ideale", value: "Pendolarismo", icon: "route" },
    ],
    isFlagship: true,
    isShowroomModel: true,
  },
  {
    id: "x-town-300",
    name: "X-Town 300",
    shortName: "X-Town",
    subtitle: "Touring urbano",
    displacement: "300cc",
    filterCategory: "300cc+",
    family: "Touring",
    positioning: "Una taglia concreta per chi vuole spazio, protezione e una posizione rilassata.",
    idealUse: "Casa, lavoro, weekend",
    image: `${kymcoProductWorkbenchBase}/04-x-town-300_no_bg.png`,
    imageAlt: "KYMCO X-Town 300 antracite in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("mineralBlueGrey"),
    specs: [
      { label: "Cilindrata", value: "300cc", icon: "gauge" },
      { label: "Categoria", value: "Touring", icon: "layers" },
      { label: "Uso ideale", value: "Comfort urbano", icon: "route" },
    ],
    isFlagship: true,
    isShowroomModel: true,
  },
  {
    id: "skytown-125",
    name: "Skytown 125",
    shortName: "Skytown",
    subtitle: "Accesso 125cc",
    displacement: "125cc",
    filterCategory: "125cc",
    family: "Urban",
    positioning: "Il primo passo nella mobilita KYMCO, leggero nella gestione e concreto nell'uso quotidiano.",
    idealUse: "Neopatentati e citta",
    image: `${kymcoProductWorkbenchBase}/05-skytown-125_no_bg.png`,
    imageAlt: "KYMCO Skytown 125 nero opaco in vista laterale",
    imageKind: "transparent",
    imageOffsetX: "1%",
    ...catalogSurfaceTone("paleStone"),
    specs: [
      { label: "Cilindrata", value: "125cc", icon: "gauge" },
      { label: "Categoria", value: "Urban", icon: "layers" },
      { label: "Uso ideale", value: "Citta", icon: "route" },
    ],
    isShowroomModel: true,
  },
  {
    id: "ak575-premium",
    name: "AK575 Premium",
    shortName: "AK575",
    subtitle: "KYMCO Sport premium",
    displacement: "575cc",
    filterCategory: "300cc+",
    family: "Sport",
    positioning:
      "Il modello KYMCO Sport piu prestazionale in catalogo: taglia maxi, finitura premium e impostazione da lungo raggio veloce.",
    idealUse: "Touring sportivo",
    image:
      `${kymcoProductWorkbenchBase}/06-ak575-premium_no_bg.png`,
    imageAlt: "KYMCO AK575 Premium nero opaco in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("dustyBlush"),
    specs: [
      { label: "Cilindrata", value: "575cc", icon: "gauge" },
      { label: "Categoria", value: "KYMCO Sport", icon: "layers" },
      { label: "Uso ideale", value: "Touring veloce", icon: "route" },
    ],
  },
  {
    id: "xciting-vs-400",
    name: "Xciting VS 400",
    shortName: "Xciting VS",
    subtitle: "KYMCO Sport 400cc",
    displacement: "400cc",
    filterCategory: "300cc+",
    family: "Sport",
    positioning:
      "Uno sport-tourer KYMCO con cilindrata 400cc, protezione e presenza adatte a tangenziale, raccordo e weekend.",
    idealUse: "Citta veloce e weekend",
    image:
      `${kymcoProductWorkbenchBase}/07-xciting-vs-400_no_bg.png`,
    imageAlt: "KYMCO Xciting VS 400 nero opaco in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("warmIvory"),
    specs: [
      { label: "Cilindrata", value: "400cc", icon: "gauge" },
      { label: "Categoria", value: "KYMCO Sport", icon: "layers" },
      { label: "Uso ideale", value: "Sport touring", icon: "route" },
    ],
  },
  {
    id: "voge-valico-800rally",
    brand: "Voge",
    name: "Valico 800DSX Rally",
    shortName: "800 Rally",
    subtitle: "Voge adventure rally",
    displacement: "800cc",
    filterCategory: "300cc+",
    family: "Adventure",
    positioning:
      "La proposta Voge piu tecnica della linea Valico: assetto rally, protezione e presenza per viaggi fuori porta.",
    idealUse: "Touring e sterrato leggero",
    image:
      "/voge/models/valico/voge-valico-800rally/main/voge-valico-800rally-product-01-dsc06605-b.png",
    imageAlt: "Voge Valico 800DSX Rally in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("dryChampagne"),
    specs: [
      { label: "Cilindrata", value: "800cc", icon: "gauge" },
      { label: "Categoria", value: "Adventure", icon: "layers" },
      { label: "Uso ideale", value: "Viaggio", icon: "route" },
    ],
  },
  {
    id: "voge-valico-625dsx",
    brand: "Voge",
    name: "Valico 625DSX",
    shortName: "625DSX",
    subtitle: "Voge adventure media",
    displacement: "625cc",
    filterCategory: "300cc+",
    family: "Adventure",
    positioning:
      "Una Valico Voge di taglia media, pensata per chi cerca equilibrio tra maneggevolezza, protezione e percorrenze lunghe.",
    idealUse: "Commuting esteso e weekend",
    image:
      "/voge/models/valico/voge-valico-625dsx/main/voge-valico-625dsx-product-01-img-9025.png",
    imageAlt: "Voge Valico 625DSX in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("mutedSage"),
    specs: [
      { label: "Cilindrata", value: "625cc", icon: "gauge" },
      { label: "Categoria", value: "Adventure", icon: "layers" },
      { label: "Uso ideale", value: "Touring", icon: "route" },
    ],
  },
  {
    id: "voge-valico-900dsx",
    brand: "Voge",
    name: "Valico 900DSX",
    shortName: "900DSX",
    subtitle: "Voge maxi adventure",
    displacement: "900cc",
    filterCategory: "300cc+",
    family: "Adventure",
    positioning:
      "La maxi Valico Voge per chi vuole una moto piu importante, con postura protettiva e vocazione da viaggio.",
    idealUse: "Touring a lungo raggio",
    image:
      "/voge/models/valico/voge-valico-900dsx/main/voge-valico-900dsx-product-01-900dsxblack.png",
    imageAlt: "Voge Valico 900DSX nera in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("mineralBlueGrey"),
    specs: [
      { label: "Cilindrata", value: "900cc", icon: "gauge" },
      { label: "Categoria", value: "Adventure", icon: "layers" },
      { label: "Uso ideale", value: "Viaggio", icon: "route" },
    ],
  },
  {
    id: "voge-sfida-sr1",
    brand: "Voge",
    name: "Sfida SR1",
    shortName: "SR1",
    subtitle: "Voge urban 125cc",
    displacement: "125cc",
    filterCategory: "125cc",
    family: "Urban",
    positioning:
      "Uno scooter Voge compatto per uso urbano, con taglia accessibile e presenza piu matura di un entry-level.",
    idealUse: "Citta quotidiana",
    image:
      "/voge/models/sfida/voge-sfida-sr1/main/voge-sfida-sr1-product-01-dsc7565.png",
    imageAlt: "Voge Sfida SR1 in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("paleStone"),
    specs: [
      { label: "Cilindrata", value: "125cc", icon: "gauge" },
      { label: "Categoria", value: "Urban", icon: "layers" },
      { label: "Uso ideale", value: "Citta", icon: "route" },
    ],
  },
  {
    id: "voge-sfida-sr1-adv",
    brand: "Voge",
    name: "Sfida SR1 ADV",
    shortName: "SR1 ADV",
    subtitle: "Voge urban adventure",
    displacement: "125cc",
    filterCategory: "125cc",
    family: "Urban ADV",
    positioning:
      "La variante ADV dello Sfida SR1 porta il linguaggio Voge adventure in una taglia leggera e gestibile.",
    idealUse: "Citta e fondi misti",
    image:
      "/voge/models/sfida/voge-sfida-sr1-adv/main/voge-sfida-sr1-adv-product-01-sr1advblack.png",
    imageAlt: "Voge Sfida SR1 ADV nero in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("lightClay"),
    specs: [
      { label: "Cilindrata", value: "125cc", icon: "gauge" },
      { label: "Categoria", value: "Urban ADV", icon: "layers" },
      { label: "Uso ideale", value: "Citta", icon: "route" },
    ],
  },
  {
    id: "voge-sfida-sr2-adv",
    brand: "Voge",
    name: "Sfida SR2 ADV",
    shortName: "SR2 ADV",
    subtitle: "Voge crossover medio",
    displacement: "250cc",
    filterCategory: "150-250cc",
    family: "Crossover",
    positioning:
      "Uno Sfida Voge piu strutturato, pensato per chi vuole posizione alta, protezione e piu margine nei tragitti estesi.",
    idealUse: "Citta e raccordo",
    image:
      "/voge/models/sfida/voge-sfida-sr2-adv/main/voge-sfida-sr2-adv-product-01-dsc1358.png",
    imageAlt: "Voge Sfida SR2 ADV in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("warmIvory"),
    specs: [
      { label: "Cilindrata", value: "250cc", icon: "gauge" },
      { label: "Categoria", value: "Crossover", icon: "layers" },
      { label: "Uso ideale", value: "Percorsi misti", icon: "route" },
    ],
  },
  {
    id: "voge-sfida-sr16-125",
    brand: "Voge",
    name: "Sfida SR16 125",
    shortName: "SR16 125",
    subtitle: "Voge ruote alte 125cc",
    displacement: "125cc",
    filterCategory: "125cc",
    family: "Ruote alte",
    positioning:
      "Il ruote alte Voge in taglia 125, adatto a chi cerca stabilita, praticita e accesso immediato alla mobilita urbana.",
    idealUse: "Citta e pavimentazioni irregolari",
    image:
      "/voge/models/sfida/voge-sfida-sr16-125/main/voge-sfida-sr16-125-product-01-sr16.png",
    imageAlt: "Voge Sfida SR16 125 in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("softSand"),
    specs: [
      { label: "Cilindrata", value: "125cc", icon: "gauge" },
      { label: "Categoria", value: "Ruote alte", icon: "layers" },
      { label: "Uso ideale", value: "Citta", icon: "route" },
    ],
  },
  {
    id: "voge-sfida-sr16-200",
    brand: "Voge",
    name: "Sfida SR16 200",
    shortName: "SR16 200",
    subtitle: "Voge ruote alte 200cc",
    displacement: "200cc",
    filterCategory: "150-250cc",
    family: "Ruote alte",
    positioning:
      "Lo stesso impianto ruote alte dello Sfida SR16 con una cilindrata intermedia per muoversi con piu margine.",
    idealUse: "Citta estesa",
    image:
      "/voge/models/sfida/voge-sfida-sr16-200/main/voge-sfida-sr16-200-product-01-dsc3733.png",
    imageAlt: "Voge Sfida SR16 200 in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("dustyBlush"),
    specs: [
      { label: "Cilindrata", value: "200cc", icon: "gauge" },
      { label: "Categoria", value: "Ruote alte", icon: "layers" },
      { label: "Uso ideale", value: "Commuting", icon: "route" },
    ],
  },
  {
    id: "voge-sfida-sr3",
    brand: "Voge",
    name: "Sfida SR3",
    shortName: "SR3",
    subtitle: "Voge GT compatto",
    displacement: "300cc",
    filterCategory: "300cc+",
    family: "GT",
    positioning:
      "Uno scooter Voge da commuting evoluto, con impostazione GT compatta e piu protezione per i percorsi quotidiani lunghi.",
    idealUse: "Commuting veloce",
    image:
      "/voge/models/sfida/voge-sfida-sr3/main/voge-sfida-sr3-product-01-sr3.png",
    imageAlt: "Voge Sfida SR3 nero in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("mineralBlueGrey"),
    specs: [
      { label: "Cilindrata", value: "300cc", icon: "gauge" },
      { label: "Categoria", value: "GT compatto", icon: "layers" },
      { label: "Uso ideale", value: "Commuting", icon: "route" },
    ],
  },
  {
    id: "voge-sfida-sr4-max",
    brand: "Voge",
    name: "Sfida SR4 MAX",
    shortName: "SR4 MAX",
    subtitle: "Voge maxi scooter",
    displacement: "350cc",
    filterCategory: "300cc+",
    family: "Maxi scooter",
    positioning:
      "Il maxi scooter Voge della famiglia Sfida, orientato a comfort, protezione e percorrenze piu lunghe.",
    idealUse: "Tangenziale e weekend",
    image:
      "/voge/models/sfida/voge-sfida-sr4-max/main/voge-sfida-sr4-max-product-01-wechatimg430.png",
    imageAlt: "Voge Sfida SR4 MAX in vista laterale",
    imageKind: "transparent",
    ...catalogSurfaceTone("mutedSage"),
    specs: [
      { label: "Cilindrata", value: "350cc", icon: "gauge" },
      { label: "Categoria", value: "Maxi scooter", icon: "layers" },
      { label: "Uso ideale", value: "Comfort", icon: "route" },
    ],
  },
  {
    id: "agility-50-r16-plus",
    name: "Agility 50 R16 Plus",
    shortName: "Agility 50",
    subtitle: "Ciclomotore ruote alte",
    displacement: "50cc",
    filterCategory: "50cc",
    family: "50cc",
    positioning: "Leggero, essenziale, adatto a chi vuole una prima mobilita semplice e assistita.",
    idealUse: "Primi spostamenti",
    image:
      `${kymcoProductWorkbenchBase}/08-agility-50-r16-plus_no_bg.png`,
    imageAlt: "KYMCO Agility 50 R16 Plus antracite",
    imageKind: "transparent",
    ...catalogSurfaceTone("dryChampagne"),
    specs: [
      { label: "Cilindrata", value: "50cc", icon: "gauge" },
      { label: "Categoria", value: "Ciclomotore", icon: "layers" },
      { label: "Uso ideale", value: "Primi tragitti", icon: "route" },
    ],
  },
  {
    id: "agility-s-125",
    name: "Agility S 125",
    shortName: "Agility S",
    subtitle: "125cc urbano",
    displacement: "125cc",
    filterCategory: "125cc",
    family: "Urban",
    positioning: "Compatto e pratico, con taglia equilibrata per muoversi spesso nel traffico.",
    idealUse: "Uso urbano frequente",
    image:
      `${kymcoProductWorkbenchBase}/09-agility-s-125_no_bg.png`,
    imageAlt: "KYMCO Agility S 125 bianco opaco",
    imageKind: "transparent",
    ...catalogSurfaceTone("paleStone"),
    specs: [
      { label: "Cilindrata", value: "125cc", icon: "gauge" },
      { label: "Categoria", value: "Urban", icon: "layers" },
      sharedSpecs.showroom,
    ],
  },
  {
    id: "dink-x-125",
    name: "DINK X 125",
    shortName: "DINK X",
    subtitle: "125cc tecnico",
    displacement: "125cc",
    filterCategory: "125cc",
    family: "Urban tecnico",
    positioning: "Un 125 dal taglio piu tecnico, pensato per chi vuole presenza senza passare ai 300cc.",
    idealUse: "Citta intensa",
    image:
      `${kymcoProductWorkbenchBase}/10-dink-x-125_no_bg.png`,
    imageAlt: "KYMCO DINK X 125 blu",
    imageKind: "transparent",
    ...catalogSurfaceTone("mineralBlueGrey"),
    specs: [
      { label: "Cilindrata", value: "125cc", icon: "gauge" },
      { label: "Categoria", value: "Urban tecnico", icon: "layers" },
      { label: "Uso ideale", value: "Citta intensa", icon: "route" },
    ],
  },
  {
    id: "filly-50",
    name: "Filly 50",
    shortName: "Filly",
    subtitle: "50cc compatto",
    displacement: "50cc",
    filterCategory: "50cc",
    family: "50cc",
    positioning: "Compatto e leggero, adatto a tragitti brevi e gestione semplice.",
    idealUse: "Tragitti brevi",
    image:
      `${kymcoProductWorkbenchBase}/11-filly-50_no_bg.png`,
    imageAlt: "KYMCO Filly 50 bianco",
    imageKind: "transparent",
    ...catalogSurfaceTone("dryChampagne"),
    specs: [
      { label: "Cilindrata", value: "50cc", icon: "gauge" },
      { label: "Categoria", value: "Compatto", icon: "layers" },
      sharedSpecs.showroom,
    ],
  },
  {
    id: "like-125",
    name: "Like 125",
    shortName: "Like",
    subtitle: "125cc urbano",
    displacement: "125cc",
    filterCategory: "125cc",
    family: "Urban",
    positioning: "Linee morbide e uso quotidiano, per chi cerca uno scooter semplice da vivere.",
    idealUse: "Centro e quartieri",
    image:
      `${kymcoProductWorkbenchBase}/12-like-125_no_bg.png`,
    imageAlt: "KYMCO Like 125 antracite",
    imageKind: "transparent",
    ...catalogSurfaceTone("dustyBlush"),
    specs: [
      { label: "Cilindrata", value: "125cc", icon: "gauge" },
      { label: "Categoria", value: "Urban", icon: "layers" },
      { label: "Uso ideale", value: "Centro", icon: "route" },
    ],
  },
  {
    id: "micare-125",
    name: "Micare 125",
    shortName: "Micare",
    subtitle: "125cc leggero",
    displacement: "125cc",
    filterCategory: "125cc",
    family: "Urban light",
    positioning: "Taglia leggera e lettura immediata, per chi privilegia maneggevolezza e facilita.",
    idealUse: "Spostamenti rapidi",
    image:
      `${kymcoProductWorkbenchBase}/13-micare-125_no_bg.png`,
    imageAlt: "KYMCO Micare 125 grigio",
    imageKind: "transparent",
    ...catalogSurfaceTone("softSand"),
    specs: [
      { label: "Cilindrata", value: "125cc", icon: "gauge" },
      { label: "Categoria", value: "Urban light", icon: "layers" },
      sharedSpecs.showroom,
    ],
  },
  {
    id: "people-s-125-abs",
    name: "People S 125 ABS",
    shortName: "People S",
    subtitle: "Ruote alte 125cc",
    displacement: "125cc",
    filterCategory: "125cc",
    family: "Ruote alte",
    positioning: "Ruote alte e postura ordinata, con indicazione ABS gia presente nella denominazione ufficiale.",
    idealUse: "Citta e pavé",
    image:
      `${kymcoProductWorkbenchBase}/14-people-s-125-abs_no_bg.png`,
    imageAlt: "KYMCO People S 125 ABS antracite",
    imageKind: "transparent",
    ...catalogSurfaceTone("mutedSage"),
    specs: [
      { label: "Cilindrata", value: "125cc", icon: "gauge" },
      { label: "Sicurezza", value: "ABS nel nome modello", icon: "shield" },
      { label: "Categoria", value: "Ruote alte", icon: "layers" },
    ],
  },
  {
    id: "people-s-200",
    name: "People S 200",
    shortName: "People 200",
    subtitle: "Ruote alte 200cc",
    displacement: "200cc",
    filterCategory: "150-250cc",
    family: "Ruote alte",
    positioning: "Una via intermedia per chi vuole piu corpo del 125 senza entrare nei maxi-scooter.",
    idealUse: "Citta estesa",
    image:
      `${kymcoProductWorkbenchBase}/15-people-s-200_no_bg.png`,
    imageAlt: "KYMCO People S 200 in foto prodotto ufficiale",
    imageKind: "transparent",
    ...catalogSurfaceTone("paleStone"),
    specs: [
      { label: "Cilindrata", value: "200cc", icon: "gauge" },
      { label: "Categoria", value: "Ruote alte", icon: "layers" },
      sharedSpecs.official,
    ],
  },
  {
    id: "super-8-50-r",
    name: "SUPER 8 50 R",
    shortName: "Super 8",
    subtitle: "50cc sportivo",
    displacement: "50cc",
    filterCategory: "50cc",
    family: "50cc",
    positioning: "Un 50cc dal taglio piu dinamico, adatto a chi vuole una presenza meno neutra.",
    idealUse: "Primi tragitti dinamici",
    image:
      `${kymcoProductWorkbenchBase}/16-super-8-50-r_no_bg.png`,
    imageAlt: "KYMCO SUPER 8 50 R in foto prodotto ufficiale",
    imageKind: "transparent",
    ...catalogSurfaceTone("lightClay"),
    specs: [
      { label: "Cilindrata", value: "50cc", icon: "gauge" },
      { label: "Categoria", value: "Sport 50", icon: "layers" },
      sharedSpecs.showroom,
    ],
  },
  {
    id: "x-town-250st",
    name: "X-Town 250ST",
    shortName: "X-Town ST",
    subtitle: "Touring 250cc",
    displacement: "250cc",
    filterCategory: "150-250cc",
    family: "Touring",
    positioning: "Spazio e protezione con cilindrata intermedia, pensato per chi cerca comfort quotidiano.",
    idealUse: "Commuting comodo",
    image:
      `${kymcoProductWorkbenchBase}/17-x-town-250st_no_bg.png`,
    imageAlt: "KYMCO X-Town 250ST antracite",
    imageKind: "transparent",
    ...catalogSurfaceTone("mineralBlueGrey"),
    specs: [
      { label: "Cilindrata", value: "250cc", icon: "gauge" },
      { label: "Categoria", value: "Touring", icon: "layers" },
      { label: "Uso ideale", value: "Comfort", icon: "route" },
    ],
  },
];

export function getCatalogScooterBrand(scooter: Pick<CatalogScooter, "brand">) {
  return scooter.brand ?? "KYMCO";
}

export const catalogBrandCount = new Set(
  catalogScooters.map((scooter) => getCatalogScooterBrand(scooter)),
).size;

export const flagshipScooter =
  catalogScooters.find((scooter) => scooter.isFlagship) ?? catalogScooters[0];

export function getCatalogScooterById(id?: string | null) {
  if (!id) {
    return undefined;
  }

  return catalogScooters.find((scooter) => scooter.id === id);
}
