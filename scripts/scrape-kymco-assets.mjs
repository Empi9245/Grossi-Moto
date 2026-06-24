import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";

const CATEGORIES = [
  {
    slug: "scooter",
    label: "Scooter",
    url: "https://kymco.it/prodotti_categorie/scooter/",
    coverNeedle: "cat_scooter",
  },
  {
    slug: "sport",
    label: "Sport",
    url: "https://kymco.it/prodotti_categorie/sport/",
    coverNeedle: "cat_sport",
  },
];
const HOST_ALLOWLIST = new Set(["kymco.it", "www.kymco.it"]);
const ROOT = process.cwd();
const OUTPUT_ROOT = path.join(ROOT, "public", "kymco-all");
const TMP_ROOT = await fs.mkdtemp(path.join(os.tmpdir(), "kymco-assets-"));

const MIN_USEFUL_DIMENSION = 280;
const MIN_COLOR_DIMENSION = 16;
const POLITE_DELAY_MS = 120;

const skipUrlParts = [
  "/wp-content/themes/",
  "/wp-includes/",
  "/wp-json/",
  "/plugins/",
  "/listini/",
  "/allegati/",
  "cookie",
  "favicon",
  "icon_apple",
  "kymco_logo",
  "facebook",
  "youtube",
  "instagram",
  "GIVI_sito",
  "assistenza-oltre125",
  "finanziamento-oltre125",
  "raccomandazione-oltre125",
];

const directImageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const manifest = [];
const modelSummaries = new Map();
const skipped = [];
const seenUrls = new Set();
const seenHashes = new Map();
const galleryZipUrls = new Set();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function decodeEntities(value) {
  return value
    .replaceAll("&#038;", "&")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&nbsp;", " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripTags(value) {
  return decodeEntities(value.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function slugify(value) {
  return stripTags(String(value || "unknown"))
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "unknown";
}

function toAbsoluteUrl(raw, baseUrl) {
  if (!raw) return null;
  const cleaned = decodeEntities(raw.trim()).replace(/^url\((.*)\)$/i, "$1").replace(/^['"]|['"]$/g, "");
  if (!cleaned || cleaned.startsWith("data:") || cleaned.startsWith("mailto:") || cleaned.startsWith("tel:")) {
    return null;
  }

  try {
    const parsed = new URL(cleaned, baseUrl);
    if (!HOST_ALLOWLIST.has(parsed.hostname)) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

function extensionFromUrl(url, fallback = ".jpg") {
  const pathname = new URL(url).pathname;
  const ext = path.extname(decodeURIComponent(pathname)).toLowerCase();
  if (directImageExtensions.has(ext)) return ext === ".jpeg" ? ".jpg" : ext;
  return fallback;
}

function fileStemFromUrl(url) {
  const pathname = new URL(url).pathname;
  const base = path.basename(decodeURIComponent(pathname), path.extname(pathname));
  return slugify(base);
}

function isProbablyDownloadableImage(url) {
  const lower = url.toLowerCase();
  if (skipUrlParts.some((part) => lower.includes(part.toLowerCase()))) return false;
  return directImageExtensions.has(extensionFromUrl(url, ""));
}

function classifyCandidate(url, context = {}) {
  const lower = url.toLowerCase();
  const filename = fileStemFromUrl(url);

  if (lower.includes("/media/schede/colori/")) {
    return { imageType: "color", angle: "swatch", baseFolder: "models" };
  }

  if (lower.includes("/cover-pagine/") || lower.includes("cat_scooter")) {
    return { imageType: "section", angle: "category-cover", baseFolder: "sections" };
  }

  if (lower.includes("bauletto") || lower.includes("driving") || lower.includes("promo")) {
    return { imageType: "promo", angle: filename, baseFolder: "promo" };
  }

  if (lower.includes("/media/schede/imm/")) {
    return { imageType: "model", angle: "main", baseFolder: "models" };
  }

  if (context.fromCarousel || /(^|[-_])(front|rear|retro|side|sx|dx|3-?4|gallery|\d{1,2})([-_]|$)/i.test(filename)) {
    return { imageType: "model", angle: context.angle || `gallery-${String(context.index || 1).padStart(2, "0")}`, baseFolder: "models" };
  }

  if (lower.includes("/wp-content/uploads/")) {
    const type = /lifestyle|design|overview|city|urban|dettag/i.test(filename) ? "lifestyle" : "section";
    return { imageType: type, angle: context.angle || filename, baseFolder: type === "lifestyle" ? "sections" : "sections" };
  }

  return { imageType: "section", angle: context.angle || filename, baseFolder: "sections" };
}

async function fetchBuffer(url) {
  await sleep(POLITE_DELAY_MS);
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "GrossiMotoAssetCollector/1.0 (+https://kymco.it/prodotti_categorie/scooter/)",
      Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return {
    buffer: Buffer.from(await response.arrayBuffer()),
    finalUrl: response.url || url,
    contentType: response.headers.get("content-type") || "",
  };
}

async function fetchHtml(url) {
  await sleep(POLITE_DELAY_MS);
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "GrossiMotoAssetCollector/1.0 (+https://kymco.it/prodotti_categorie/scooter/)",
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return {
    html: await response.text(),
    finalUrl: response.url || url,
  };
}

function getImageDimensions(buffer) {
  if (buffer.length < 32) return { width: 0, height: 0, format: "unknown" };

  if (buffer.readUInt32BE(0) === 0x89504e47) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
      format: "png",
    };
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
          format: "jpg",
        };
      }
      offset += 2 + length;
    }
  }

  if (buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") {
    const chunk = buffer.subarray(12, 16).toString("ascii");
    if (chunk === "VP8X") {
      const width = 1 + buffer.readUIntLE(24, 3);
      const height = 1 + buffer.readUIntLE(27, 3);
      return { width, height, format: "webp" };
    }
  }

  return { width: 0, height: 0, format: "unknown" };
}

async function getImageDimensionsSafe(buffer) {
  const parsed = getImageDimensions(buffer);
  if (parsed.width && parsed.height) return parsed;

  try {
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: metadata.format || parsed.format,
    };
  } catch {
    return parsed;
  }
}

function extractProductCards(html, categoryUrl, categorySlug) {
  const cards = [];
  const cardRegex = /<a\s+href="(?<href>https:\/\/kymco\.it\/Prodotti\/_[^"]+)"[^>]*>\s*<img\s+src="(?<src>[^"]+)"[^>]*alt="(?<alt>[^"]*)"/gi;
  for (const match of html.matchAll(cardRegex)) {
    const modelName = stripTags(match.groups.alt);
    const modelSlug = slugify(modelName);
    cards.push({
      modelName,
      modelSlug,
      category: categorySlug,
      sourcePageUrl: toAbsoluteUrl(match.groups.href, categoryUrl),
      categoryImageUrl: toAbsoluteUrl(match.groups.src, categoryUrl),
    });
  }
  return cards;
}

function extractColorMap(html, baseUrl) {
  const descByIndex = new Map();
  const swatches = [];

  const descRegex = /<p[^>]+class="[^"]*\binfocolori\b[^"]*\bdesc-color-(?<index>\d+)\b[^"]*"[^>]*>(?<text>.*?)<\/p>/gis;
  for (const match of html.matchAll(descRegex)) {
    descByIndex.set(match.groups.index, stripTags(match.groups.text));
  }

  const swatchRegex = /<a[^>]+data-color-src="color-(?<index>\d+)"[^>]*>\s*<img\s+src="(?<src>[^"]+)"/gis;
  const seen = new Set();
  for (const match of html.matchAll(swatchRegex)) {
    const url = toAbsoluteUrl(match.groups.src, baseUrl);
    if (!url || seen.has(url)) continue;
    seen.add(url);
    const colorName = descByIndex.get(match.groups.index) || "unknown";
    swatches.push({
      index: Number(match.groups.index),
      colorName,
      colorSlug: slugify(colorName),
      url,
    });
  }

  return swatches;
}

function extractZipUrls(html, baseUrl) {
  const urls = [];
  const zipRegex = /href=["'](?<href>[^"']+gallery\.zip[^"']*)["']/gi;
  for (const match of html.matchAll(zipRegex)) {
    const url = toAbsoluteUrl(match.groups.href, baseUrl);
    if (url) urls.push(url);
  }
  return urls;
}

function contextBefore(html, index, radius = 500) {
  return html.slice(Math.max(0, index - radius), index);
}

function extractImageCandidates(html, baseUrl, model, colorMap) {
  const candidates = [];
  const push = (url, context = {}) => {
    if (!url || !isProbablyDownloadableImage(url)) return;
    const colorFromSwatch = colorMap.find((color) => color.url === url);
    const classification = classifyCandidate(url, context);
    candidates.push({
      ...classification,
      url,
      sourcePageUrl: baseUrl,
      modelName: model?.modelName || null,
      modelSlug: model?.modelSlug || null,
      category: model?.category || context.category || null,
      colorName: colorFromSwatch?.colorName || context.colorName || "unknown",
      colorSlug: colorFromSwatch?.colorSlug || context.colorSlug || "color-unknown",
      note: context.note || "",
      sourceContext: context.sourceContext || "",
    });
  };

  const imgRegex = /<img\b[^>]*\bsrc=["'](?<src>[^"']+)["'][^>]*>/gi;
  let imgIndex = 0;
  for (const match of html.matchAll(imgRegex)) {
    const url = toAbsoluteUrl(match.groups.src, baseUrl);
    push(url, {
      index: ++imgIndex,
      angle: "inline-img",
      note: "inline image from source page",
      sourceContext: match[0].slice(0, 180),
    });
  }

  const backgroundRegex = /background(?:-image)?:\s*url\((?<url>[^)]+)\)/gi;
  let bgIndex = 0;
  for (const match of html.matchAll(backgroundRegex)) {
    const url = toAbsoluteUrl(match.groups.url, baseUrl);
    const before = contextBefore(html, match.index);
    const fromCarousel = /carousel_gallery|blocco_gallery|carousel-item/i.test(before);
    push(url, {
      index: ++bgIndex,
      fromCarousel,
      angle: fromCarousel ? `gallery-${String(bgIndex).padStart(2, "0")}` : undefined,
      note: fromCarousel ? "gallery carousel background image" : "section background image",
      sourceContext: match[0].slice(0, 180),
    });
  }

  return candidates;
}

function resolveLocalPath(candidate) {
  const ext = extensionFromUrl(candidate.url);
  const angleSlug = slugify(candidate.angle || fileStemFromUrl(candidate.url));
  const urlSlug = fileStemFromUrl(candidate.url);

  if (candidate.baseFolder === "models" && candidate.modelSlug) {
    const colorSlug = candidate.colorSlug || "color-unknown";
    const file = candidate.imageType === "color" ? `swatch-${urlSlug}${ext}` : `${angleSlug}-${urlSlug}${ext}`;
    return path.join(OUTPUT_ROOT, "models", candidate.modelSlug, colorSlug, file);
  }

  if (candidate.baseFolder === "promo") {
    const modelPrefix = candidate.modelSlug ? `${candidate.modelSlug}-` : "";
    return path.join(OUTPUT_ROOT, "promo", `${modelPrefix}${angleSlug}-${urlSlug}${ext}`);
  }

  const modelPrefix = candidate.modelSlug ? `${candidate.modelSlug}-` : "";
  return path.join(OUTPUT_ROOT, "sections", `${modelPrefix}${angleSlug}-${urlSlug}${ext}`);
}

function toPublicPath(absPath) {
  return path.relative(path.join(ROOT, "public"), absPath).replaceAll(path.sep, "/").replace(/^/, "/");
}

function shouldKeepImage(candidate, dimensions) {
  if (candidate.imageType === "color") {
    return dimensions.width >= MIN_COLOR_DIMENSION && dimensions.height >= MIN_COLOR_DIMENSION;
  }
  return dimensions.width >= MIN_USEFUL_DIMENSION || dimensions.height >= MIN_USEFUL_DIMENSION;
}

async function saveCandidate(candidate) {
  const normalizedUrl = new URL(candidate.url).href;
  if (seenUrls.has(normalizedUrl)) {
    skipped.push({ url: normalizedUrl, reason: "duplicate-url", sourcePageUrl: candidate.sourcePageUrl });
    return null;
  }
  seenUrls.add(normalizedUrl);

  let fetched;
  try {
    fetched = await fetchBuffer(normalizedUrl);
  } catch (error) {
    skipped.push({ url: normalizedUrl, reason: `download-failed: ${error.message}`, sourcePageUrl: candidate.sourcePageUrl });
    return null;
  }

  const sha256 = createHash("sha256").update(fetched.buffer).digest("hex");
  if (seenHashes.has(sha256)) {
    skipped.push({
      url: normalizedUrl,
      reason: "duplicate-hash",
      duplicateOf: seenHashes.get(sha256),
      sourcePageUrl: candidate.sourcePageUrl,
    });
    return null;
  }

  const dimensions = await getImageDimensionsSafe(fetched.buffer);
  if (!shouldKeepImage(candidate, dimensions)) {
    skipped.push({
      url: normalizedUrl,
      reason: `too-small-or-unknown-dimensions: ${dimensions.width}x${dimensions.height}`,
      sourcePageUrl: candidate.sourcePageUrl,
    });
    return null;
  }

  const localPath = resolveLocalPath(candidate);
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  await fs.writeFile(localPath, fetched.buffer);
  const publicPath = toPublicPath(localPath);
  seenHashes.set(sha256, publicPath);

  const entry = {
    modelName: candidate.modelName,
    modelSlug: candidate.modelSlug,
    category: candidate.category,
    colorName: candidate.colorName || "unknown",
    colorSlug: candidate.colorSlug || "color-unknown",
    imageType: candidate.imageType,
    angle: candidate.angle || fileStemFromUrl(normalizedUrl),
    localPath: publicPath,
    sourcePageUrl: candidate.sourcePageUrl,
    originalImageUrl: normalizedUrl,
    width: dimensions.width,
    height: dimensions.height,
    fileSize: fetched.buffer.length,
    sha256,
    note: candidate.note || "",
  };

  manifest.push(entry);
  addToModelSummary(entry);

  if (candidate.spriteColors?.length && candidate.imageType === "model" && candidate.angle === "main") {
    await saveSpriteColorFrames(candidate, entry, fetched.buffer, dimensions);
  }

  return entry;
}

function addToModelSummary(entry) {
  if (!entry.modelSlug) return;
  if (!modelSummaries.has(entry.modelSlug)) {
    modelSummaries.set(entry.modelSlug, { modelName: entry.modelName, total: 0, model: 0, color: 0, section: 0, lifestyle: 0, promo: 0 });
  }
  const summary = modelSummaries.get(entry.modelSlug);
  summary.total += 1;
  summary[entry.imageType] = (summary[entry.imageType] || 0) + 1;
}

async function saveSpriteColorFrames(candidate, sourceEntry, sourceBuffer, dimensions) {
  const frameWidth = 500;
  const frameHeight = 375;
  if (dimensions.width < frameWidth * 2 || dimensions.height < frameHeight) return;

  for (const color of candidate.spriteColors) {
    const left = (color.index + 1) * frameWidth;
    if (left + frameWidth > dimensions.width) {
      skipped.push({
        url: sourceEntry.originalImageUrl,
        reason: `missing-sprite-frame-for-color-${color.index}`,
        sourcePageUrl: sourceEntry.sourcePageUrl,
      });
      continue;
    }

    let buffer;
    try {
      buffer = await sharp(sourceBuffer)
        .extract({ left, top: 0, width: frameWidth, height: frameHeight })
        .jpeg({ quality: 95, mozjpeg: true })
        .toBuffer();
    } catch (error) {
      skipped.push({
        url: sourceEntry.originalImageUrl,
        reason: `sprite-crop-failed: ${error.message}`,
        sourcePageUrl: sourceEntry.sourcePageUrl,
      });
      continue;
    }

    const sha256 = createHash("sha256").update(buffer).digest("hex");
    if (seenHashes.has(sha256)) {
      skipped.push({
        url: sourceEntry.originalImageUrl,
        reason: "duplicate-sprite-frame-hash",
        duplicateOf: seenHashes.get(sha256),
        sourcePageUrl: sourceEntry.sourcePageUrl,
      });
      continue;
    }

    const localPath = path.join(
      OUTPUT_ROOT,
      "models",
      candidate.modelSlug,
      color.colorSlug || "color-unknown",
      `main-color-${String(color.index + 1).padStart(2, "0")}-${color.colorSlug || "unknown"}.jpg`,
    );
    await fs.mkdir(path.dirname(localPath), { recursive: true });
    await fs.writeFile(localPath, buffer);
    const publicPath = toPublicPath(localPath);
    seenHashes.set(sha256, publicPath);

    const entry = {
      modelName: candidate.modelName,
      modelSlug: candidate.modelSlug,
      category: candidate.category,
      colorName: color.colorName || "unknown",
      colorSlug: color.colorSlug || "color-unknown",
      imageType: "color",
      angle: `main-color-${String(color.index + 1).padStart(2, "0")}`,
      localPath: publicPath,
      sourcePageUrl: sourceEntry.sourcePageUrl,
      originalImageUrl: `${sourceEntry.originalImageUrl}#sprite-frame-${color.index + 1}`,
      width: frameWidth,
      height: frameHeight,
      fileSize: buffer.length,
      sha256,
      note: `cropped from official KYMCO color sprite; swatch ${color.url}`,
    };
    manifest.push(entry);
    addToModelSummary(entry);
  }
}

async function extractGalleryZip(zipUrl, model) {
  if (galleryZipUrls.has(zipUrl)) return [];
  galleryZipUrls.add(zipUrl);

  let fetched;
  try {
    fetched = await fetchBuffer(zipUrl);
  } catch (error) {
    skipped.push({ url: zipUrl, reason: `zip-download-failed: ${error.message}`, sourcePageUrl: model.sourcePageUrl });
    return [];
  }

  const zipFile = path.join(TMP_ROOT, `${model.modelSlug}-gallery.zip`);
  const extractDir = path.join(TMP_ROOT, `${model.modelSlug}-gallery`);
  await fs.writeFile(zipFile, fetched.buffer);
  await fs.mkdir(extractDir, { recursive: true });

  const expanded = spawnSync("tar", ["-xf", zipFile, "-C", extractDir], { encoding: "utf8" });

  if (expanded.status !== 0) {
    skipped.push({ url: zipUrl, reason: `zip-extract-failed: ${expanded.stderr || expanded.stdout}`, sourcePageUrl: model.sourcePageUrl });
    return [];
  }

  const files = await walkFiles(extractDir);
  const candidates = [];
  let index = 0;
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!directImageExtensions.has(ext)) continue;
    const buffer = await fs.readFile(file);
    const sha256 = createHash("sha256").update(buffer).digest("hex");
    if (seenHashes.has(sha256)) {
      skipped.push({ url: zipUrl, reason: "zip-image-duplicate-hash", duplicateOf: seenHashes.get(sha256), sourcePageUrl: model.sourcePageUrl });
      continue;
    }
    const dimensions = await getImageDimensionsSafe(buffer);
    if (dimensions.width < MIN_USEFUL_DIMENSION && dimensions.height < MIN_USEFUL_DIMENSION) {
      skipped.push({ url: zipUrl, reason: `zip-image-too-small: ${dimensions.width}x${dimensions.height}`, sourcePageUrl: model.sourcePageUrl });
      continue;
    }

    const stem = slugify(path.basename(file, ext));
    const localPath = path.join(OUTPUT_ROOT, "models", model.modelSlug, "color-unknown", `zip-gallery-${String(++index).padStart(2, "0")}-${stem}${ext === ".jpeg" ? ".jpg" : ext}`);
    await fs.mkdir(path.dirname(localPath), { recursive: true });
    await fs.writeFile(localPath, buffer);
    const publicPath = toPublicPath(localPath);
    seenHashes.set(sha256, publicPath);

    const entry = {
      modelName: model.modelName,
      modelSlug: model.modelSlug,
      category: model.category,
      colorName: "unknown",
      colorSlug: "color-unknown",
      imageType: "model",
      angle: `zip-gallery-${String(index).padStart(2, "0")}`,
      localPath: publicPath,
      sourcePageUrl: model.sourcePageUrl,
      originalImageUrl: `${zipUrl}#${path.relative(extractDir, file).replaceAll(path.sep, "/")}`,
      width: dimensions.width,
      height: dimensions.height,
      fileSize: buffer.length,
      sha256,
      note: "image extracted from official gallery.zip",
    };
    manifest.push(entry);
    if (!modelSummaries.has(model.modelSlug)) {
      modelSummaries.set(model.modelSlug, { modelName: model.modelName, total: 0, model: 0, color: 0, section: 0, lifestyle: 0, promo: 0 });
    }
    const summary = modelSummaries.get(model.modelSlug);
    summary.total += 1;
    summary.model += 1;
    candidates.push(entry);
  }
  return candidates;
}

async function walkFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walkFiles(full));
    if (entry.isFile()) out.push(full);
  }
  return out;
}

async function main() {
  await fs.mkdir(path.join(OUTPUT_ROOT, "models"), { recursive: true });
  await fs.mkdir(path.join(OUTPUT_ROOT, "promo"), { recursive: true });
  await fs.mkdir(path.join(OUTPUT_ROOT, "sections"), { recursive: true });

  const allModels = [];

  for (const categoryConfig of CATEGORIES) {
    const category = await fetchHtml(categoryConfig.url);
    const models = extractProductCards(category.html, categoryConfig.url, categoryConfig.slug);
    allModels.push(...models);
    console.log(`Found ${models.length} ${categoryConfig.label} models in category.`);

    const categoryCandidates = extractImageCandidates(category.html, category.finalUrl, null, [])
      .filter((candidate) => candidate.imageType === "section" && candidate.url.includes(categoryConfig.coverNeedle));
    for (const candidate of categoryCandidates) {
      await saveCandidate({
        ...candidate,
        category: categoryConfig.slug,
        modelName: null,
        modelSlug: null,
        colorName: "unknown",
        colorSlug: "color-unknown",
        note: `${categoryConfig.label} category cover image`,
      });
    }

    for (const model of models) {
      const detail = await fetchHtml(model.sourcePageUrl);
      model.sourcePageUrl = detail.finalUrl;
      const colorMap = extractColorMap(detail.html, detail.finalUrl);
      const productCandidates = extractImageCandidates(detail.html, detail.finalUrl, model, colorMap);
      const cardCandidate = {
        ...classifyCandidate(model.categoryImageUrl, { angle: "category-card" }),
        url: model.categoryImageUrl,
        sourcePageUrl: categoryConfig.url,
        modelName: model.modelName,
        modelSlug: model.modelSlug,
        category: model.category,
        colorName: "unknown",
        colorSlug: "color-unknown",
        angle: "category-card",
        note: `${categoryConfig.label} category card product image`,
      };

      console.log(`${categoryConfig.label} / ${model.modelName}: ${productCandidates.length} page candidates, ${colorMap.length} colors.`);
      await saveCandidate(cardCandidate);
      for (const candidate of productCandidates) {
        if (candidate.imageType === "model" && candidate.angle === "main") {
          candidate.spriteColors = colorMap;
        }
        await saveCandidate(candidate);
      }

      for (const zipUrl of extractZipUrls(detail.html, detail.finalUrl)) {
        await extractGalleryZip(zipUrl, model);
      }
    }
  }

  manifest.sort((a, b) => {
    const modelA = a.modelSlug || "";
    const modelB = b.modelSlug || "";
    return modelA.localeCompare(modelB) || a.imageType.localeCompare(b.imageType) || a.localPath.localeCompare(b.localPath);
  });

  const summary = {
    generatedAt: new Date().toISOString(),
    sourceCategoryUrls: CATEGORIES.map((category) => category.url),
    outputRoot: "/kymco-all",
    modelCount: allModels.length,
    categorySummaries: CATEGORIES.map((category) => ({
      category: category.slug,
      sourceCategoryUrl: category.url,
      modelCount: allModels.filter((model) => model.category === category.slug).length,
      imageCount: manifest.filter((image) => image.category === category.slug).length,
    })),
    imageCount: manifest.length,
    modelSummaries: [...modelSummaries.values()].sort((a, b) => a.modelName.localeCompare(b.modelName)),
    skipped,
  };

  await fs.writeFile(path.join(OUTPUT_ROOT, "manifest.json"), `${JSON.stringify({ summary, images: manifest }, null, 2)}\n`);
  await fs.rm(TMP_ROOT, { recursive: true, force: true });

  console.log(`Saved ${manifest.length} unique images.`);
  console.log(`Manifest: ${path.join(OUTPUT_ROOT, "manifest.json")}`);
  console.log(`Skipped ${skipped.length} candidates.`);
}

main().catch(async (error) => {
  console.error(error);
  try {
    await fs.rm(TMP_ROOT, { recursive: true, force: true });
  } catch {}
  process.exit(1);
});
