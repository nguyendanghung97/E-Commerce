const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.html',
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Satoshi', ...defaultTheme.fontFamily.sans],
      'serif': ['Archivo', ...defaultTheme.fontFamily.serif],
      'mono': [...defaultTheme.fontFamily.mono]
    },
    extend: {
      keyframes: {
        headerSticky: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)'},
        },
        infinitescroll: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        rotate: {
          from: { transform: 'rotate(-360deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shine: {
          '100%': { right: '150%' },
        },
        burgerHover: {
          '0%': { width: '100%' },
          '50%': { width: '50%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'headerSticky' : 'headerSticky .5s ease-in-out 1 forwards',
        'infinitescroll': 'infinitescroll 20s linear infinite',
        'rotate':'rotate 20s linear infinite',
        'shine': 'shine 2s',
        'burger-hover-2': 'burgerHover 1s infinite ease-in-out alternate forwards 200ms',
        'burger-hover-4': 'burgerHover 1s infinite ease-in-out alternate forwards 400ms',
        'burger-hover-6': 'burgerHover 1s infinite ease-in-out alternate forwards 600ms',
      }
    },
  },
  plugins: [],
}

