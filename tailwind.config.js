/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#BAE0FF',
          300: '#91CAFF',
          400: '#69B1FF',
          500: '#1677FF', // Primary Blue
          600: '#0958D9',
          700: '#003EB3',
          800: '#002C8C',
          900: '#001D66',
        },
        surface: {
          light: '#FFFFFF',
          bg: '#F5F8FF', // Light Blue Background
          subtle: '#EEF2F9',
          border: '#E3E8F0',
          dark: '#121316',
          darkCard: '#1E2024',
          darkBorder: '#2E3238',
          darkSubtle: '#25282F',
        },
        appText: {
          primary: '#202124',
          secondary: '#5F6368',
          muted: '#80868B',
          darkPrimary: '#F1F3F4',
          darkSecondary: '#9AA0A6',
          darkMuted: '#5F6368',
        }
      },
      fontFamily: {
        sans: ['Google Sans', 'Inter', 'Roboto', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(22, 119, 255, 0.08), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(22, 119, 255, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(22, 119, 255, 0.18), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'modal': '0 24px 48px -12px rgba(15, 23, 42, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
