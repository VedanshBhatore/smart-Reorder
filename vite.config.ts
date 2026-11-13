/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  // Deep-linked routes (e.g. /prototype/a) are at the mercy of this: a relative
  // base resolves asset URLs against the *current* path, not the site root, and
  // 404s every asset on any route besides "/". This app serves from the domain
  // root on Vercel/Netlify, so an absolute base is correct here.
  base: "/",
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
