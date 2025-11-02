/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // important pour que Tailwind trouve les classes
    ],
    theme: {
      extend: {
        colors: {
          primary: "#F0CF29",
          secondary: "#FACC15",
          accent: "#06B6D4",
          dark: "#0F172A",
          light: "#F9FAFB",
        },
      },
    },
    plugins: [],
  }