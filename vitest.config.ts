import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    minThreads: 1,
    maxThreads: 1,
  },
});
