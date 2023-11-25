/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        'file-header-light': '#2C2C2C',
        'options-light': '#F7F7F7',
        'options-stroke-light': '#CCCCCC',
        'options-hover-light': '#D9D9D9',
        'options-active-light': '#C8C8C8',
      },  
      fontFamily: {
        'google-sans': ['Google Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

