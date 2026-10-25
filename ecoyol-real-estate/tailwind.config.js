/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          50: '#f6f6f5',
          100: '#e8e8e6',
          200: '#d1d1cd',
          300: '#a8a8a2',
          400: '#787872',
          500: '#5a5a55',
          600: '#454541',
          700: '#343431',
          800: '#242422',
          900: '#181817',
          950: '#0e0e0d',
        },
        gold: {
          50: '#fbf9ef',
          100: '#f5efdb',
          200: '#eadbb5',
          300: '#dcc284',
          400: '#cfa954',
          500: '#c39638',
          600: '#a97c2a',
          700: '#8a5f24',
          800: '#714e25',
          900: '#5e4122',
          950: '#34210f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Tajawal', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
