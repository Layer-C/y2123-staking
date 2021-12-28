const palette = {
  white: '#FFFFFF',
  black: '000000',
  'purplish-black-1': '#2B2E45',
  'blue-1': '#3A81FF',
  'gray-1': '#8F97B4',
  'purplish-gray-1': 'rgba(58, 129, 255, 0.2)',
  'green-1': '#61FF2A',
  'red-1': '#FF4545',
  'cyan-1': '#2BF2FF',
};

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extends: {
      colors: { ...palette },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
