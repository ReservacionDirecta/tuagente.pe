/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#18181b', // Negro humo oscuro (Zinc 900)
          light: '#27272a',   // Zinc 800
          dark: '#09090b',    // Zinc 950
        },
        secondary: {
          DEFAULT: '#71717a', // Gris medio elegante (Zinc 500)
          light: '#a1a1aa',   // Zinc 400
          dark: '#3f3f46',    // Zinc 700
        },
        snow: '#fafafa',       // Blanco nieve (Zinc 50)
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
