/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      md2: '1000px',
      lg: '1024px',
      lg2: '1200px',
      xl: '1280px',
      '2xl': '1536px',
    },

    extend: {
      screens: {
        600: '600px',
        700: '700px',
        720: '720px',
        740: '740px',
        800: '800px',
        850: '850px',
        900: '900px',
        1140: '1140px',
      },
      scale: {
        80: '.80',
        82: '82',
        85: '.85',
      },
      margin: {
        '-200': '-200px',
      },
      colors: {
        bg: {
          pri: '#050505',
          sec: '#b300ff',
          alt: '#ccff00',
          blackTransparent: 'rgba(3, 0, 0, 0.5)',
          muigrey: '#2a2a2a',
          muilightgrey: '#515151',
          gptdark: '#202123',
          console: '#1e1e1e',
        },
      },

      backgroundImage: {
        player:
          "url('/client/src/components/HomePageComponents/PlayerPicture.svg)",
      },
      fontFamily: {
        title: ['"Space Grotesk"'],
        console: ['"IBM Plex Mono"'],
      },
      animation: {
        blink: 'blink 1.5s infinite',
        slowblink: 'blink 2.5s infinite',
        turnYellow: 'toYellow 4s 1 forwards',
        expand: 'expand 3s forwards',
        'spin-slow': 'spin 5s linear infinite',
        'spin-med': 'spin 10s linear infinite',
        'spin-xslow': 'spin 20s linear infinite',
        'spin-xxslow': 'spin 25s linear infinite',
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
  plugins: [require('daisyui')],
};
