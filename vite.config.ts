import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  tanstackStart: {
    server: { entry: "server" },
  },
});
