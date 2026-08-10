export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', '@nuxtjs/google-fonts'],
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  vite: {
    optimizeDeps: {
      include: ['@vuepic/vue-datepicker'],
    },
  },
  googleFonts: {
    families: {
      'Inter': [400, 500, 600, 700, 800, 900],
      'Silkscreen': [400, 700],
      'Archivo Black': true,
    },
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/*'],
    },
  },
  app: {
    head: {
      script: [
        { src: '/_vercel/insights/script.js', defer: true }
      ],
      link: [
        { rel: 'icon', href: 'data:,' }
      ]
    }
  },
})