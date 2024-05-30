/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-abstract': "url(/black_bg.webp)"
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'lobster': ['Lobster', 'sans-serif'],
        'platypi': ['Platypi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

