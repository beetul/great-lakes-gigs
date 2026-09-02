export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/pages/**/*.vue',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        brandColor: '#4b91e2',
        accentColor: '#b76ee7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Archivo Black', 'sans-serif'],
        logo: ['Silkscreen', 'sans-serif'],
      },
    },
  },
}