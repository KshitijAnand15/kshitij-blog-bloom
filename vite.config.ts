import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: mode === "production" ? "/kshitij-blog-bloom/" : "/", // ✅ Ensures correct paths for GitHub Pages
  build: {
    outDir: "dist", // ✅ Ensure build outputs to `dist`
    rollupOptions: {
      output: {
        assetFileNames: "[name]-[hash][extname]", // ✅ Prevents 404 errors for assets
        chunkFileNames: "[name]-[hash].js",
        entryFileNames: "[name]-[hash].js",
      },
    },
  },
}));
