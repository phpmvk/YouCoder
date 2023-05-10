/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          pri: '#050505',
          sec: '#b300ff',
          alt: '#ccff00',
          blackTransparent: 'rgba(3, 0, 0, 0.5)',
          muigrey: '#2a2a2a',
          gptdark: '#202123',
        },
        text: {
          // normal: 'slate-300',
        },
      },
      fontFamily: {
        title: ['"Space Grotesk"'],
        console: ['"IBM Plex Mono"'],
      },
      animation: {
        blink: 'blink 1.5s infinite',
        turnYellow: 'toYellow 4s 1 forwards',
        expand: 'expand 3s forwards',
        'spin-slow': 'spin 5s linear infinite',
        'spin-xslow': 'spin 20s linear infinite',
      },
      keyframes: {
        blinking: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        toYellow: {
          '0%': { color: 'white' },
          '100%': { color: '#ccff00' },
        },
        expand: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(6)' },
        },
      },
      backgroundImage: (theme) => ({
        'gradient-primary': `radial-gradient(at bottom center, rgb(0, 0, 0), rgb(17, 24, 39), rgb(0, 0, 0))`,
      }),
    },
  },
  plugins: [],
};
