/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ enable class-based dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      // App Router
    "./pages/**/*.{js,ts,jsx,tsx}",    // Pages Router
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
