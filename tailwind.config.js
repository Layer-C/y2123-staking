const palette = {
  white: '#FFFFFF',
  black: '#000000',
  'purplish-black-1': '#2B2E45',
  'blue-1': '#3A81FF',
  'gray-1': '#8F97B4',
  'gray-2': '#C4C4C4',
  'purplish-gray-1': 'rgba(58, 129, 255, 0.2)',
  'purplish-gray-2': 'rgba(43, 46, 69, 0.25)',
  'green-1': '#61FF2A',
  'red-1': '#FF4545',
  'cyan-1': '#2BF2FF',
};

const fontFamily = {
  avenirNext: 'Avenir Next',
  disketMono: 'Disket Mono',
};

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './hooks/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: { ...palette },
    },
    fontFamily,
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
