import { defineConfig, mergeConfig } from "vite";
import lovable from "@lovable.dev/vite-tanstack-config";

const basePath = process.env.BASE_PATH || "/";

export default mergeConfig(
  lovable({
    tanstackStart: {
      server: { entry: "server" },
    },
  }),
  defineConfig({
    base: basePath,
  }),
);
