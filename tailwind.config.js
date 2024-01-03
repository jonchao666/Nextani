const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "bottom-gradient":
          "linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.5))",
      },
      screens: {
        "3xl": "1680px",
        custom458: "458px",
      },
      margin: {
        // for responsive when width less then 458px
        custom458: "calc(((100vw - 242px) / -2))",
      },
      boxShadow: {
        sliderArrow: "0 4px 4px rgba(0, 0, 0, 0.3), 0 0 4px rgba(0, 0, 0, 0.2)",
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: { background: "#fafafa" },
          layout: {},
        },
        dark: {
          colors: {
            customGray: "rgba(255,255,255,0.2)",
          },
          layout: {},
        },
      },
    }),
  ],
};
