import { copyFile, cp, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const outDir = resolve("dist/static");
const clientBuildDir = firstExisting([resolve("dist/client"), resolve(".output/public")]);
const serverEntry = firstExisting([resolve("dist/server/index.mjs"), resolve(".output/server/index.mjs")]);

if (!clientBuildDir) {
  throw new Error("Static export failed: client build output was not found in dist/client or .output/public");
}

if (!serverEntry) {
  throw new Error("Static export failed: server entry was not found in dist/server/index.mjs or .output/server/index.mjs");
}

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

function firstExisting(paths) {
  return paths.find((path) => existsSync(path));
}

await mkdir(outDir, { recursive: true });
await cp(clientBuildDir, outDir, { recursive: true, force: true });

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
