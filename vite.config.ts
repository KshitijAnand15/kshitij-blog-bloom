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
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: mode === "production" ? "/kshitij-blog-bloom/" : "/", // ✅ Ensures correct paths for GitHub Pages
  build: {
    outDir: "dist", // ✅ Ensures build outputs to `dist`
    manifest: true, // ✅ Generates manifest.json for hashed filenames
    rollupOptions: {
      input: "index.html", // ✅ Ensures Vite tracks index.html
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",  // ✅ Move assets to /assets
        chunkFileNames: "assets/[name]-[hash].js",  // ✅ Move chunk files to /assets
        entryFileNames: "assets/[name]-[hash].js",  // ✅ Move entry files to /assets
      },
    },
  },
}));
