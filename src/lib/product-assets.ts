import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  getCatalogScooterBrand,
  type CatalogScooter,
} from "@/data/catalog-scooters";

export type ProductGalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type KymcoManifestImage = {
  modelSlug: string;
  imageType: string;
  angle: string;
  localPath: string;
  width?: number;
  height?: number;
};

type KymcoManifest = {
  images: KymcoManifestImage[];
};

type VogeManifestImage = {
  role: "color" | "gallery" | "main" | "spin360";
  localPath: string;
  width?: number;
  height?: number;
};

type VogeManifest = {
  images: VogeManifestImage[];
};

async function readJsonFile<T>(relativePath: string): Promise<T | null> {
  try {
    const absolutePath = path.join(process.cwd(), "public", relativePath);
    const raw = await readFile(absolutePath, "utf8");

    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

let kymcoManifestPromise: Promise<KymcoManifest | null> | undefined;

function getKymcoManifest() {
  kymcoManifestPromise ??= readJsonFile<KymcoManifest>(
    "kymco-all/manifest.json",
  );

  return kymcoManifestPromise;
}

function toGalleryImage(
  scooter: CatalogScooter,
  image: { localPath: string; width?: number; height?: number },
  index: number,
): ProductGalleryImage {
  const brand = getCatalogScooterBrand(scooter);

  return {
    src: image.localPath,
    alt: `${brand} ${scooter.name}, immagine del modello ${index + 1}`,
    width: image.width && image.width > 0 ? image.width : 1600,
    height: image.height && image.height > 0 ? image.height : 1067,
  };
}

async function getVogeGalleryImages(scooter: CatalogScooter) {
  const match = scooter.image.match(
    /^\/voge\/models\/([^/]+)\/([^/]+)\//,
  );

  if (!match) {
    return [];
  }

  const [, family, modelSlug] = match;
  const manifest = await readJsonFile<VogeManifest>(
    path.join("voge", "models", family, modelSlug, "index.json"),
  );

  if (!manifest) {
    return [];
  }

  const gallery = manifest.images.filter((image) => image.role === "gallery");
  const fallback = manifest.images.filter((image) => image.role === "spin360");
  const candidates = gallery.length > 0 ? gallery : fallback.slice(0, 4);

  return candidates
    .slice(0, 6)
    .map((image, index) => toGalleryImage(scooter, image, index));
}

async function getKymcoGalleryImages(scooter: CatalogScooter) {
  const manifest = await getKymcoManifest();

  if (!manifest) {
    return [];
  }

  const modelImages = manifest.images.filter(
    (image) =>
      image.modelSlug === scooter.id &&
      image.imageType === "model" &&
      image.angle.startsWith("gallery-"),
  );
  const colorImages = manifest.images.filter(
    (image) =>
      image.modelSlug === scooter.id &&
      image.imageType === "color",
  );
  const candidates = modelImages.length > 0 ? modelImages : colorImages;

  return candidates
    .slice(0, 6)
    .map((image, index) => toGalleryImage(scooter, image, index));
}

export async function getProductGalleryImages(scooter: CatalogScooter) {
  return getCatalogScooterBrand(scooter) === "Voge"
    ? getVogeGalleryImages(scooter)
    : getKymcoGalleryImages(scooter);
}
