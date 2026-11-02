/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gemini: {
          blue: '#4285F4',
          purple: '#9B51E0',
          pink: '#E91E63'
        }
      }
    },
  },
  plugins: [],
}
