import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Halterodata - GameOn!",
      meta: [
        {
          name: "description",
          content: "Halterodata - Suivi des performances en haltéophilie.",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: {enabled: true},
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: "https://halterodata-api.valentinvirot.fr",
    },
  },
});
