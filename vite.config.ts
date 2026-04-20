import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // componentTagger só roda no dev client — nunca no build SSR
    mode === "development" && !isSsrBuild && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // Garante que esses pacotes sejam bundlados no build SSR
    // em vez de importados como externos no Node
    noExternal: ["framer-motion", "lucide-react"],
  },
}));
