/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',      // Azul escuro / Slate 900
        secondary: '#111827',    // Cinza escuro
        accent: '#E50914',       // Vermelho cinema
        textPrimary: '#F9FAFB',  // Branco suave
        textSecondary: '#9CA3AF', // Cinza claro
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
