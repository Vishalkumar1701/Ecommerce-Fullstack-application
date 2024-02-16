/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'min': '240px', 'max': '767px'},

      'md': {'min': '768px', 'max': '1023px'},

      'lg': {'min': '1024px', 'max': '1279px'},

      'xl': {'min': '1280px', 'max': '1535px'},

      '2xl': {'min': '1536px'},
    },
    extend: {
      height: {
        '90vh': '90vh',
        '40vh' : '40vh',
      },
      width: {
        '97' : '30rem',
      }
    },
  },
  plugins: [],
}