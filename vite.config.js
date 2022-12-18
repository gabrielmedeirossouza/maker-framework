import { defineConfig } from "vite";
import alias from "@rollup/plugin-alias";
import path from "node:path";

export default defineConfig({
  plugins: [alias()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }]
  }
});
