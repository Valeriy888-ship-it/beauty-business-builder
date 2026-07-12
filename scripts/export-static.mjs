import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const outDir = resolve("dist/client");
const serverEntry = resolve("dist/server/index.mjs");

const handler = (await import(serverEntry)).default;
const context = { waitUntil() {} };

const basePath = process.env.BASE_PATH || "/";
const normalizedBase = basePath.endsWith("/") ? basePath : `${basePath}/`;

async function render(path) {
  const url = `https://example.com${path}`;
  const response = await handler.fetch(new Request(url), {}, context);
  if (!response.ok) {
    throw new Error(`Static export failed for ${path}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

await mkdir(outDir, { recursive: true });

const html = await render(normalizedBase);
await writeFile(resolve(outDir, "index.html"), html);
await writeFile(resolve(outDir, "404.html"), html);
await writeFile(resolve(outDir, ".nojekyll"), "");

try {
  const sitemap = await handler.fetch(new Request("https://example.com/sitemap.xml"), {}, context);
  if (sitemap.ok) {
    await writeFile(resolve(outDir, "sitemap.xml"), await sitemap.text());
  }
} catch {}

const pngSrc = resolve("public/assets/valeriy-pankov.png");
const pngDst = resolve(outDir, "assets/valeriy-pankov.png");
if (existsSync(pngSrc)) {
  await mkdir(dirname(pngDst), { recursive: true });
  try {
    await copyFile(pngSrc, pngDst);
  } catch {}
}

console.log("Static export complete:", outDir, "base:", basePath);
