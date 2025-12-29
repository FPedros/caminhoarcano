import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/aztro": {
        target: "https://aztro.sameerkumar.website",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/aztro/, "/")
      },
      "/api/horoscope": {
        target: "https://horoscope-app-api.vercel.app",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/horoscope/, "")
      },
      "/api/translate": {
        target: "https://api.mymemory.translated.net",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/translate/, "/get")
      },
      "/api/d1xz": {
        target: "https://www.d1xz.net",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/d1xz/, "")
      }
    }
  },
  preview: {
    proxy: {
      "/api/aztro": {
        target: "https://aztro.sameerkumar.website",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/aztro/, "/")
      },
      "/api/horoscope": {
        target: "https://horoscope-app-api.vercel.app",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/horoscope/, "")
      },
      "/api/translate": {
        target: "https://api.mymemory.translated.net",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/translate/, "/get")
      },
      "/api/d1xz": {
        target: "https://www.d1xz.net",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/d1xz/, "")
      }
    }
  }
});
