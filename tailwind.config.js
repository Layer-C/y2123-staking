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

const extendedSize = {
  fit: 'fit-content',
  full: '100%',
  '2/3': `${(2 / 3) * 100}%`,
  '3/4': `${(3 / 4) * 100}%`,
  '9/10': `${(9 / 10) * 100}%`,
  '9/16': `${(9 / 16) * 100}%`,
  '15/16': `${(15 / 16) * 100}%`,
};

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './hooks/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: { ...palette, error: palette['red-1'] },
      padding: extendedSize,
      paddingTop: extendedSize,
      paddingBottom: extendedSize,
      paddingLeft: extendedSize,
      paddingRight: extendedSize,
      lineHeight: {
        3.5: '0.875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
      },
      spacing: {
        18: '4.5rem',
        75: '18.75rem',
      },
      minWidth: {
        75: '18.75rem',
      },
    },
    fontFamily,
    backgroundImage: {
      dashboard: "url('/dashboard-background.svg')",
    },
    screens: {
      '2xl': { max: '1400px' },
      xl: { max: '1200px' },
      lg: { max: '992px' },
      md: { max: '768px' },
      sm: { max: '576px' },
      xs: { max: '414px' },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
