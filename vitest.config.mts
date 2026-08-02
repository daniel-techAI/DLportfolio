import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/tests/**/*.test.{ts,tsx}"],
    pool: "threads",
    maxWorkers: 1,
    fileParallelism: false,
    coverage: {
      reporter: ["text", "json-summary"],
    },
  },
});
