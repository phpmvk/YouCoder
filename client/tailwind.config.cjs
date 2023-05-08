/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          pri: '#050505',
          sec: '#b300ff',
          alt: '#ccff00'
        },
      },
      fontFamily: {
        title: ['"Space Grotesk"']
      },
      animation: {
        'blink': 'blink 1.5s infinite',
        'turnYellow': 'toYellow 4s 1 forwards',
        'expand': 'expand 3s forwards'
      },
      keyframes: {
        blinking: {
          '0%, 100%': {opacity: 1},
          '50%': {opacity: 0}
        },
        toYellow: {
          '0%': { color: 'white' },
          '100%': { color: '#ccff00' },
        },
        expand: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(6)' },
        },
      }
    }
  },
  plugins: []
}
