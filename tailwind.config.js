/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/stories/**/*.{js,jsx,ts,tsx}",
    "./tests/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3B82F6',
          600: '#2563EB',
        },
        secondary: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
        },
        danger: {
          500: '#EF4444',
          600: '#DC2626',
        }
      },
    },
  },
  plugins: [],
} 