import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{js,jsx,ts,tsx}"],
    exclude: [
      "node_modules",
      "dist",
      ".next",
      "**/*.stories.{js,ts,jsx,tsx}",
      "storybook-static",
    ],
  },
});