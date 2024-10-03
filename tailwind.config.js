/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Recherchez toutes les classes dans tous les fichiers JS/JSX/TS/TSX dans src
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Police personnalisée
        inter: ['Inter', 'sans-serif'], // Ajouter Inter à Tailwind
      },
      colors: {
        primary: '#34D399', // Ajouter une couleur primaire personnalisée (vert)
        secondary: '#2563EB', // Ajouter une couleur secondaire personnalisée (bleu)
      },
      spacing: {
        '128': '32rem', // Exemple pour ajouter des valeurs d'espacement personnalisées
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Plugin pour styliser les formulaires
    require('@tailwindcss/typography'), // Plugin pour améliorer la typographie
  ],
}
