/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#070A13',
        'brand-primary': '#00B4D8',
        'brand-cyan': '#00F5FF',
      },
      fontFamily: {
        sporty: ['Outfit', 'Inter', 'sans-serif'],
        sans: ['Noto Sans KR', 'Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
}
