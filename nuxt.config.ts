// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,

  modules: [
    "nuxt-icon",
    "nuxt-lodash",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
  ],

  runtimeConfig: {
    public: {
      stripePk: process.env.STRIPE_PK_KEY
    }
},

  app: {
    head: {
      title: "AliExpress",
      script: [{ src: "https://js.stripe.com/v3/", defer: true }],
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo-tab.png" }],
    },
  },

  compatibilityDate: "2024-09-21",
});
