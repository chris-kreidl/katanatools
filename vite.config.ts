import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    ignorePatterns: ["dist", "build"],
  },
  fmt: {
    ignorePatterns: ["dist", "build", ".pnpm-store"],
  },
});
