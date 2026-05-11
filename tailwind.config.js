module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          glow: '#f28c18',
          pulse: '#ff7847',
          cool: '#37cdbe',
          haze: '#a991f7',
          deep: '#1a1a1a',
        },
      },
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        borderSpin: {
          '0%': { '--angle': '0deg' },
          '100%': { '--angle': '360deg' },
        },
        floatY: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        caret: {
          '0%,49%': { opacity: '1' },
          '50%,100%': { opacity: '0' },
        },
        gridFlow: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
        sheen: {
          '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
          '100%': { transform: 'translateX(250%) skewX(-20deg)' },
        },
      },
      animation: {
        scan: 'scan 4s linear infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        borderSpin: 'borderSpin 6s linear infinite',
        floatY: 'floatY 4s ease-in-out infinite',
        caret: 'caret 1s steps(1) infinite',
        gridFlow: 'gridFlow 8s linear infinite',
        sheen: 'sheen 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: ['halloween'],
    darkTheme: 'dark',
  },
};
