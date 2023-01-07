/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class", // or 'media' or 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@vechaiui/core"),
    require("flowbite/plugin"),
    require("daisyui"),
  ],
  daisyui: {
    themes: ["light"],
  },
};
