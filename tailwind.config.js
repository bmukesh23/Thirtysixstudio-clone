/** @type {import('tailwindcss').Config} */

export const content = [
  './pages/**/*.{js,jsx}',
  './components/**/*.{js,jsx}',
  './app/**/*.{js,jsx}',
  './src/**/*.{js,jsx}',
];

export const theme = {
  extend: { 
    fontFamily: {
      helvetica: ['Helvetica Now Display', 'sans-serif'],
    },
  },
};