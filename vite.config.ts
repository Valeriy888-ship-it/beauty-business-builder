import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // Prerender the landing page to a static index.html so the site works on
    // GitHub Pages / any static host.
    pages: [
      { path: "/", prerender: { enabled: true, crawlLinks: true } },
    ],
  },
});
