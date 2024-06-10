/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      "golden-dream": {
        50: "#fcfbea",
        100: "#f8f7c9",
        200: "#f3ed95",
        300: "#ebdd59",
        400: "#e6cf3d",
        500: "#d4b41e",
        600: "#b78d17",
        700: "#926716",
        800: "#79521a",
        900: "#68441b",
        950: "#3c240c",
      },

      "guardsman-red": {
        50: "#fff0f0",
        100: "#ffdede",
        200: "#ffc3c3",
        300: "#ff9999",
        400: "#ff5e5e",
        500: "#ff2c2c",
        600: "#f60c0c",
        700: "#cf0606",
        800: "#b80a0a",
        900: "#8d0f0f",
        950: "#4d0202",
      },
    },
  },
  plugins: [],
};
