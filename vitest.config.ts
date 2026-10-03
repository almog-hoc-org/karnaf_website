import { defineConfig } from "vitest/config";
import path from "path";

// Unit tests for pure logic (calculators, formatters, rules). Kept apart
// from vite.config.ts so the SSG build's plugins never run under vitest.
export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
