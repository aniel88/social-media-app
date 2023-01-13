/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        danger: colors.rose,
        warning: colors.amber,
        gray: colors.gray,
      },
    },
  },
  plugins: [],
};
