/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/pages/loginPage.js",
    "./src/pages/homePage.js",
    "./src/components/navbar.js",
    "./src/utils/logo.js",
    "./src/pages/productInPharmaciePage.js"

  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}