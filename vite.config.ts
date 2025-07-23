import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/data-mesh-opus/", // 👈 ESSENCIAL para GitHub Pages
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    // 👇 ESSENCIAL: garantir fallback SPA
    rollupOptions: {
      input: "./index.html",
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
