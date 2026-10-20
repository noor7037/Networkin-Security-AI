/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        accent: {
          amber: '#F59E0B',
          coral: '#F97316',
          rose: '#EF4444',
          yellow: '#FBBF24',
        },
        subject: {
          math: '#2563EB',      // Blue
          science: '#059669',   // Emerald Green
          english: '#7C3AED',   // Violet
          sst: '#EA580C',       // Vibrant Orange
          hindi: '#E11D48',     // Rose / Crimson
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(15, 23, 42, 0.06), 0 1px 4px -1px rgba(15, 23, 42, 0.04)',
        'soft-md': '0 6px 16px -4px rgba(15, 23, 42, 0.08), 0 2px 6px -2px rgba(15, 23, 42, 0.04)',
        'soft-lg': '0 12px 28px -6px rgba(15, 23, 42, 0.1), 0 4px 10px -2px rgba(15, 23, 42, 0.05)',
        'soft-xl': '0 20px 40px -10px rgba(79, 70, 229, 0.15)',
        'colored-math': '0 10px 25px -5px rgba(37, 99, 235, 0.25)',
        'colored-science': '0 10px 25px -5px rgba(5, 150, 105, 0.25)',
        'colored-english': '0 10px 25px -5px rgba(124, 58, 237, 0.25)',
        'colored-sst': '0 10px 25px -5px rgba(234, 88, 12, 0.25)',
        'colored-hindi': '0 10px 25px -5px rgba(225, 29, 72, 0.25)',
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Noto Sans Devanagari',
          'sans-serif',
        ],
        devanagari: [
          'Noto Sans Devanagari',
          '-apple-system',
          'sans-serif',
        ],
      },
      scale: {
        '97': '0.97',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'pulse-slow': 'pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
