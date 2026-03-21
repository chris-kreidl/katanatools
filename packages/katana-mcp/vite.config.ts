import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    environment: "node",
  },
  pack: {
    entry: "src/index.ts",
    platform: "node",
    outDir: "dist",
    format: "esm",
    banner: "#!/usr/bin/env node",
    dts: true,
    minify: true,
  },
});
