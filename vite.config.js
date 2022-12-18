import { defineConfig } from "vite";
import alias from "@rollup/plugin-alias";
import path from "node:path";

export default defineConfig({
  plugins: [alias()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }]
  }
});
