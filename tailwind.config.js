/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  prefix: "tw-",

  layers: {
    "no-tailwindcss": {
      // Add any styles you want to disable here
      ".no-tailwindcss": {
        all: "unset",
      },
    },
  },
  plugins: [],
};
