/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1ABB8F',
          50: '#E6F7F2',
          100: '#CCEFE5',
          200: '#99DFC9',
          300: '#66CFAD',
          400: '#33BF91',
          500: '#1ABB8F',
          600: '#148E6C',
          700: '#0F6149',
          800: '#0A3426',
          900: '#051713'
        }
      }
    },
  },
  plugins: [],
};