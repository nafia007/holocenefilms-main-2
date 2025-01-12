import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: "8080",
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "lib",
        replacement: resolve(__dirname, "lib"),
      },
    ],
  },
  build: {
    rollupOptions: {
      // Properly handle pure annotations
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
      external: ['stream', 'http', 'https', 'zlib'], // Externalize problematic Node.js modules
    },
    // Increase memory limit
    chunkSizeWarningLimit: 1000,
    // Handle browser compatibility
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    exclude: ['ox'], // Exclude problematic package from optimization
  },
}));