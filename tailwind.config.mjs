/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cosmic: {
          50: '#f0f4ff',
          100: '#dbe4ff',
          200: '#bac8ff',
          300: '#91a7ff',
          400: '#748ffc',
          500: '#5c7cfa',
          600: '#4c6ef5',
          700: '#4263eb',
          800: '#3b5bdb',
          900: '#364fc7',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'cosmic-spin': 'cosmic-spin 20s linear infinite',
        'nebula': 'nebula-drift 15s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      const newUtilities = {
        '.cosmic-glow': {
          boxShadow: '0 0 20px rgba(92, 124, 250, 0.2)',
        },
        '.cosmic-glow-lg': {
          boxShadow: '0 0 30px rgba(92, 124, 250, 0.3)',
        },
        '.text-balance': {
          textWrap: 'balance',
        },
      };
      addUtilities(newUtilities);
    },
  ],
}