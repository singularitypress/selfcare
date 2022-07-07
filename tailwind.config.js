/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "eerie-black": "#252627",
        isabelline: "#F2EDEB",
        "medium-state-blue": "#7D83FF",
        "fiery-rose": "#F05365",
        "forest-green-crayola": "#57A773",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
