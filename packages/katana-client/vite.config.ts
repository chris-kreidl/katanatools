import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: "src/index.ts",
    platform: "node",
    outDir: "dist",
    format: "esm",
    dts: true,
    minify: true,
  },
});
