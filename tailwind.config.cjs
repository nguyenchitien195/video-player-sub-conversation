/** @type {import('tailwindcss').Config} */

const primaryColor = '#008FD5';

module.exports = {
  content: ['./src/**/*.{js,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        dark: '#2e2e2e',
        primary: primaryColor,
      },
      borderColor: {
        primary: primaryColor,
      },
      fontFamily: {
        roboto: ['Roboto'],
        inter: ['Inter'],
        noto: ['Noto Sans JP'],
      },
      backgroundImage: {
        'primary-gradient':
          'linear-gradient(32.95deg, #FFCC21 8.75%, #FF963C 86.64%)',
      },
      aspectRatio: {
        '5/3': '5 / 3',
      },
      textColor: {
        primary: primaryColor,
      },
      screens: {
        betterhover: { raw: '(hover: hover)' },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
