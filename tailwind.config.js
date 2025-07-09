/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4827EC",
          50: "#F3F1FF",
          100: "#E7E3FF",
          200: "#D4CBFF",
          300: "#BBA8FF",
          400: "#9E7BFF",
          500: "#4827EC",
          600: "#3D1FB8",
          700: "#321A94",
          800: "#271570",
          900: "#1C104C",
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
