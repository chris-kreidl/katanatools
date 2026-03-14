import { defineConfig } from "rolldown";

export default defineConfig({
  input: "src/index.ts",
  platform: "node",
  output: {
    dir: "build",
    format: "esm",
    banner: "#!/usr/bin/env node",
  },
  external: [/^@modelcontextprotocol\/sdk/],
});
