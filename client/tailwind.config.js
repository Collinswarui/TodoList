/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D81E58',
        secondary: '#8A4EFC',
        light: '#EEE',
        'light-alt': '#61759b',
        dark: '#131A26',
        'dark-alt': '#20283E',
      },
    },
  },
  plugins: [],
}
