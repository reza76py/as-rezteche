/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        accent: "#06b6d4",
        darkbg: "#020617",
      },
    },
  },
  plugins: [],
}
