/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores corporativos EAI
        'eai-blue': '#1C00FF',        // Azul Eléctrico - Color principal
        'eai-turquoise': '#00D1E6',   // Turquesa Claro - Color secundario
        'eai-black': '#000000',       // Negro - Texto
        'eai-white': '#FFFFFF',       // Blanco - Fondos y contraste

        // Variantes para estados (generadas automáticamente)
        primary: {
          DEFAULT: '#1C00FF',
          50: '#E6E0FF',
          100: '#CCC2FF',
          200: '#9985FF',
          300: '#6647FF',
          400: '#3309FF',
          500: '#1C00FF',
          600: '#1600CC',
          700: '#110099',
          800: '#0B0066',
          900: '#060033',
        },
        secondary: {
          DEFAULT: '#00D1E6',
          50: '#E0F9FC',
          100: '#C2F4FA',
          200: '#85E8F5',
          300: '#47DDF0',
          400: '#0AD1EB',
          500: '#00D1E6',
          600: '#00A7B8',
          700: '#007D8A',
          800: '#00545C',
          900: '#002A2E',
        },
      },
      fontFamily: {
        // Tipografías del manual de marca
        sans: ['Gilroy', 'system-ui', '-apple-system', 'sans-serif'],
        logo: ['TT Firs Neue', 'Gilroy', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'eai': '8px',      // Radio estándar para componentes
        'eai-lg': '12px',  // Radio grande para cards
      },
      spacing: {
        'logo-space': '44px', // Espacio de respiro alrededor del logo
      },
      boxShadow: {
        'eai-card': '0 2px 8px rgba(28, 0, 255, 0.08)',
        'eai-hover': '0 4px 12px rgba(28, 0, 255, 0.12)',
      },
    },
  },
  plugins: [],
}
