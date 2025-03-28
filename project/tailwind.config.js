/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4k': '2560px',
        'ultrawide': '3440px'
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 0.8vw, 1rem)',
        'fluid-base': 'clamp(1rem, 1vw, 1.25rem)',
        'fluid-lg': 'clamp(1.125rem, 1.2vw, 1.5rem)',
        'fluid-xl': 'clamp(1.25rem, 1.5vw, 2rem)',
        'fluid-2xl': 'clamp(1.5rem, 2vw, 2.5rem)',
        'fluid-3xl': 'clamp(1.875rem, 2.5vw, 3rem)',
        'fluid-4xl': 'clamp(2.25rem, 3vw, 4rem)',
        'fluid-5xl': 'clamp(3rem, 4vw, 5rem)',
        'fluid-6xl': 'clamp(3.75rem, 5vw, 6rem)',
      },
      spacing: {
        'fluid-1': 'clamp(0.25rem, 0.5vw, 0.5rem)',
        'fluid-2': 'clamp(0.5rem, 1vw, 1rem)',
        'fluid-4': 'clamp(1rem, 2vw, 2rem)',
        'fluid-8': 'clamp(2rem, 4vw, 4rem)',
        'fluid-12': 'clamp(3rem, 6vw, 6rem)',
        'fluid-16': 'clamp(4rem, 8vw, 8rem)',
      },
      blur: {
        '3xl': '64px',
        '4xl': '96px',
      },
    },
  },
  plugins: [],
};