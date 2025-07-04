import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
    include: ["react", "react-dom", "framer-motion"],
  },
  plugins: [react(), tempo()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["framer-motion", "lucide-react"],
          charts: ["recharts"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Enable compression
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // CDN configuration for assets
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      // Use CDN for production builds
      if (process.env.NODE_ENV === "production" && process.env.VITE_CDN_URL) {
        if (hostType === "js" || hostType === "css") {
          return `${process.env.VITE_CDN_URL}/assets/${filename}`;
        }
        // For images and other assets
        return `${process.env.VITE_CDN_URL}/assets/${filename}`;
      }
      return filename;
    },
  },
  // Asset optimization
  assetsInclude: ["**/*.woff2", "**/*.woff"],
});
