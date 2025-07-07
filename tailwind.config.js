/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1DBF73",
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#1DBF73",
          600: "#17a862",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },
        secondary: {
          DEFAULT: "#1DBF73",
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#1DBF73",
          600: "#17a862",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
