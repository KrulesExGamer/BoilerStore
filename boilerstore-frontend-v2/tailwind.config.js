/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  purge: [
    './public/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [],
}

