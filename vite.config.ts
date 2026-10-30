import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// A CSP em index.html só libera connect-src para a API de produção
// (api.jurione.app.br). Em dev, os formulários chamam a API local — este
// plugin injeta essa exceção só no HTML servido pelo `vite dev`, sem afetar
// o CSP do build de produção.
function devCspAllowLocalApi(): Plugin {
  return {
    name: "dev-csp-allow-local-api",
    apply: "serve",
    transformIndexHtml(html) {
      return html.replace(
        "connect-src 'self' https://api.jurione.app.br",
        "connect-src 'self' https://api.jurione.app.br http://localhost:3000 http://127.0.0.1:3000",
      );
    },
  };
}

// Google Ads, GA4 e GTM só devem rodar em produção. Fora dela (vite dev e
// build:dev) este plugin remove do HTML os trechos entre os marcadores
// `google-tags:start` / `google-tags:end`, para o tráfego local não entrar
// nas métricas. O build de produção mantém o HTML intacto.
function stripGoogleTags(): Plugin {
  return {
    name: "strip-google-tags",
    transformIndexHtml(html) {
      return html.replace(
        /[ \t]*<!-- google-tags:start[\s\S]*?<!-- google-tags:end -->\r?\n?/g,
        "",
      );
    },
  };
}

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
    mode === "development" && !isSsrBuild && devCspAllowLocalApi(),
    mode !== "production" && !isSsrBuild && stripGoogleTags(),
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
