import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { dirname } from 'path';
import { fileURLToPath as urlToFile } from 'url';

const __filename = urlToFile(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(() => ({
  envPrefix: 'VITE_',
  server: {
    host: "::",
    port: "8080",
    hmr: {
      clientPort: 8080,
    },
  },
  plugins: [
    react(),
  ],
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
  },
  optimizeDeps: {
    exclude: ['ox'], // Exclude problematic package from optimization
  },
}));
