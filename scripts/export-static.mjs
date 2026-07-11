import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const outDir = resolve("dist/client");
const serverEntry = resolve("dist/server/index.mjs");

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

const html = makeRepoRelative(await render("/"));
await mkdir(outDir, { recursive: true });
await writeFile(resolve(outDir, "index.html"), html);
await writeFile(resolve(outDir, "404.html"), html);
await writeFile(resolve(outDir, ".nojekyll"), "");

const sitemap = await handler.fetch(new Request("https://example.com/sitemap.xml"), {}, context);
if (sitemap.ok) {
  await writeFile(resolve(outDir, "sitemap.xml"), await sitemap.text());
}

await mkdir(dirname(resolve(outDir, "assets/valeriy-pankov.png")), { recursive: true });
try {
  await copyFile(resolve("public/assets/valeriy-pankov.png"), resolve(outDir, "assets/valeriy-pankov.png"));
} catch {
  // The public asset is already copied by Vite when present.
}

console.log("Static export complete: dist/client/index.html, 404.html, sitemap.xml");