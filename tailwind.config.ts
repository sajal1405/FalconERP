/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Simplified to cover all files under src
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Blue-500
          dark: '#2563EB', // Blue-600
          light: '#60A5FA', // Blue-400
        },
        secondary: {
          DEFAULT: '#10B981', // Green-500
          dark: '#059669', // Green-600
          light: '#34D399', // Green-400
        },
        accent: {
          DEFAULT: '#F97316', // Orange-500
          dark: '#EA580C', // Orange-600
          light: '#FB923C', // Orange-400
        },
        gray: {
          950: '#030712',
          900: '#0A0A0A',
          800: '#1F2937',
          700: '#374151',
        },
        zinc: {
          900: '#18181B',
          800: '#27272A',
          700: '#3F3F46',
        },
        'brand-dark-blue': '#0A1128',
        'brand-mid-blue': '#00174F',
        'brand-light-blue': '#0C1125',
      },
      // --- Confirmed: Your Custom Keyframes and Animations ---
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-in-down': { '0%': { transform: 'translateY(-100%)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'holographic-pulse': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'blob': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        'metalShine': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'rotateCircle': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'pulseScale': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'dotPulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'slide-in-down': 'slide-in-down 0.5s ease-out forwards',
        'holographic-pulse': 'holographic-pulse 10s infinite alternate',
        'blob': 'blob 7s infinite',
        'metalShine': 'metalShine 0.8s infinite alternate',
        'rotate-circle-text': 'rotateCircle 10s linear infinite',
        'pulse-scale': 'pulseScale 1.5s ease-in-out infinite',
        'dotPulse': 'dotPulse 1.4s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
