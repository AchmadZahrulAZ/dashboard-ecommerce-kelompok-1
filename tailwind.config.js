/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // custom colors
        primarycstm: '#DB4444',
        textcstm: '#030406',
        textlightcstm: '#89868D',
        textdisablecstm: '#B4B2B7',
        neutralcstm: '#FFFFFF',
        backgroundcstm: '#F4F5F9',
        background2cstm: '#E7E7F4',
        bordercstm: '#DBDCDE',
      },
      backgroundImage: {
        // Add a custom gradient
        'gradient-custom': 'linear-gradient(to right, #C2A1FD, #9154FD)',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      fontSize: {
        // Headings
        'display-large': ['32px', { fontWeight: '700', lineHeight: '40px' }],
        'display-medium': ['30px', { fontWeight: '700', lineHeight: '38px' }],
        'display-small': ['28px', { fontWeight: '700', lineHeight: '36px' }],
        'header-large': ['26px', { fontWeight: '700', lineHeight: '34px' }],
        'header-medium': ['24px', { fontWeight: '700', lineHeight: '32px' }],
        'header-small': ['22px', { fontWeight: '700', lineHeight: '30px' }],
        'title-large': ['20px', { fontWeight: '500', lineHeight: '28px' }],
        'title-medium': ['18px', { fontWeight: '500', lineHeight: '26px' }],
        'title-small': ['16px', { fontWeight: '500', lineHeight: '24px' }],

        // Body
        'body-large': ['16px', { fontWeight: '400', lineHeight: '24px' }],
        'body-medium': ['14px', { fontWeight: '400', lineHeight: '22px' }],
        'body-small': ['12px', { fontWeight: '400', lineHeight: '18px' }],
      },
    },
  },
  plugins: [],
};
