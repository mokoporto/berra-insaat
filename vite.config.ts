import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  // Bilinmeyen yollar 404 dönsün (SPA fallback olmasın) — sahte sitemap URL'leri
  // gibi olmayan dosyalar arama motorlarına hatalı içerik olarak gitmesin.
  appType: 'mpa',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
