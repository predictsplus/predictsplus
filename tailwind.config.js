/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg1: "#030712",
        bg2: "#1D202A",
        bg3: "#282c34",
        pBlue: "#2196F3"
      },
      animation: {
        fade: 'fadeIn .3s ease-in-out',
        slideInRight: 'slideInRight .4s ease-in-out',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)', opacity: 0 },
          to: { transform: 'translateX(0)', opacity: 1 },
        }
      }
    },
  },
  plugins: [],
};
