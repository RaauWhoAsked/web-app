/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        sky: colors.sky,
        teal: colors.teal,
        rose: colors.rose,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
