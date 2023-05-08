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
          sec: '#b300ff'
        },
      },
      fontFamily: {
        title: ['"Space Grotesk"']
      },
      animation: {
        'blink': 'blink 1.5s infinite',
      },
      keyframes: {
        blinking: {
          '0%, 100%': {opacity: 1},
          '50%': {opacity: 0}
        }
      }
    }
  },
  plugins: []
}
