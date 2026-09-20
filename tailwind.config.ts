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
        accentColor: '#4BCDE2',
        submitColor: '#40B2C4',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Archivo Black', 'sans-serif'],
        logo: ['Silkscreen', 'sans-serif'],
      },
    },
  },
}