module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp'), require('tailwind-scrollbar-hide')],
  daisyui: {
    themes: [
      // first one will be the default theme
      'dark',
    ],
  },
};
