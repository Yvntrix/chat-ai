/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/typography"),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
