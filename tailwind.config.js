const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors,
    extend: {
      colors: {
        primary: "#032541",
      },
    },
  },
  future: {
    purgeLayersByDefault: true,
  },
  plugins: [],
};
