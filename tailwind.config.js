/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      green: "#34A853",
      amber: "#FBBC04",
      red: "#CF3721",
      blue: "#4285F4",
      orange: "#F25C00",
      orchid: "#AC69B0",
      gray: "#4A4A4A",
      lightGray: "#9B9B9B",
      disabled: "#DFDFDF",
      black: "#000000",
      white: "#FFFFFF",
    },
    extend: {
      boxShadow: {
        'md': '0px 2px 4px 0px #9B9B9B',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
};

