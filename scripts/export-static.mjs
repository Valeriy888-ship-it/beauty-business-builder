import { copyFile, mkdir, writeFile, cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const outDir = resolve(".output/public");
const serverEntry = resolve(".output/server/index.mjs");

const handler = (await import(serverEntry)).default;
const context = { waitUntil() {} };

async function render(path) {
  const response = await handler.fetch(new Request(`https://example.com${path}`), {}, context);
  if (!response.ok) {
    throw new Error(`Static export failed for ${path}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

function makeRepoRelative(html) {
  return html
    .replaceAll('href="/assets/', 'href="./assets/')
    .replaceAll('src="/assets/', 'src="./assets/')
    .replaceAll('href="/favicon.ico"', 'href="./favicon.ico"')
    .replaceAll('href="/"', 'href="./"')
    .replaceAll('href="/__l5e/assets-v1/0b286332-7e10-481e-b1cf-6a492de34373/valeriy-pankov.png"', 'href="./assets/valeriy-pankov.png"')
    .replaceAll('src="/__l5e/assets-v1/0b286332-7e10-481e-b1cf-6a492de34373/valeriy-pankov.png"', 'src="./assets/valeriy-pankov.png"');
}

await mkdir(outDir, { recursive: true });

const html = makeRepoRelative(await render("/"));
await writeFile(resolve(outDir, "index.html"), html);
await writeFile(resolve(outDir, "404.html"), html);
await writeFile(resolve(outDir, ".nojekyll"), "");

const sitemap = await handler.fetch(new Request("https://example.com/sitemap.xml"), {}, context);
if (sitemap.ok) {
  await writeFile(resolve(outDir, "sitemap.xml"), await sitemap.text());
}

const pngSrc = resolve("public/assets/valeriy-pankov.png");
const pngDst = resolve(outDir, "assets/valeriy-pankov.png");
if (existsSync(pngSrc)) {
  await mkdir(dirname(pngDst), { recursive: true });
  try {
    await copyFile(pngSrc, pngDst);
  } catch {}
}

// Mirror to dist/client for backwards compatibility if anything still expects it.
const legacyOut = resolve("dist/client");
await mkdir(legacyOut, { recursive: true });
await cp(outDir, legacyOut, { recursive: true });

console.log("Static export complete:", outDir);
