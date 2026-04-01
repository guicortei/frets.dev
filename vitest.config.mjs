import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.js"],
    testTimeout: 30_000,
    hookTimeout: 30_000,
    pool: "forks",
    env: loadEnv("development", process.cwd(), ""),
    server: {
      deps: {
        inline: ["pg"],
      },
    },
  },
});
