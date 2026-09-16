import {tmpdir} from "node:os";
import {join} from "node:path";

import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      // Site francophone : sans cet attribut, les lecteurs d'écran lisent le
      // contenu avec une prononciation anglaise.
      htmlAttrs: {lang: "fr"},
      titleTemplate: "%s | Halterodata",
      title: "Statistiques d'haltérophilie française",
      meta: [
        {
          name: "description",
          content:
            "Résultats des compétitions et performances des athlètes de la Fédération Française d'haltérophilie.",
        },
        {name: "theme-color", content: "#050811"},
        {property: "og:site_name", content: "Halterodata"},
        {property: "og:type", content: "website"},
      ],
      link: [
        {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
        // La police est utilisée dès le premier rendu : la précharger évite
        // un repaint au swap.
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/Chillax-Regular.woff2",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: {enabled: true},
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint"],
  eslint: {
    config: {
      stylistic: false,
    },
  },
  typescript: {
    strict: true,
    // Le typecheck n'est pas branché sur le dev/build (trop lent au quotidien) :
    // il est joué explicitement via `npm run typecheck`, et bloquant en CI.
    typeCheck: false,
  },
  // Les résultats d'une compétition terminée ne changent plus : les rendre à
  // chaque requête est du gaspillage. `swr` sert la version en cache et
  // revalide en arrière-plan.
  routeRules: {
    "/": {swr: 300},
    "/athlete/**": {swr: 600},
    "/competition/**": {swr: 3600},
  },

  nitro: {
    // Cache sur disque plutôt qu'en mémoire : le site expose 10 148 pages
    // compétition et autorise le crawl (public/robots.txt), ce qui ferait
    // croître sans borne un cache mémoire. Driver intégré à unstorage.
    storage: {
      cache: {driver: "fs", base: join(tmpdir(), "halterodata-cache")},
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    // Point d'injection du token si l'API devient authentifiée.
    // Surchargeable par NUXT_API_TOKEN, jamais exposé au client.
    apiToken: "",
    public: {
      apiBaseUrl: "https://halterodata-api.valentinvirot.fr",
    },
  },
});
