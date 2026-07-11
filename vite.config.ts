import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // SSR-обёртка для перехвата ошибок. Prerender настраивается через
    // NITRO_PRESET=github-pages в GitHub Actions — с ним Nitro сам делает
    // статический билд (index.html, 404.html, .nojekyll) без конфликта
    // с этим кастомным server entry.
    server: { entry: "server" },
  },
});
