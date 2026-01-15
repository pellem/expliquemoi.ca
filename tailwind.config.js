/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Palette "Bleu Confiance" - Style gouvernemental moderne
        'gov': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',  // Primary Blue
          700: '#1d4ed8',  // Dark Blue (hover)
          800: '#1e40af',  // Navy
          900: '#1e3a8a',  // Deep Navy
          950: '#172554',  // Darkest
        },
        'trust': {
          'white': '#ffffff',
          'light': '#f8fafc',
          'muted': '#f1f5f9',
          'border': '#e2e8f0',
          'text': '#334155',
          'dark': '#1e293b',
        },
        'accent': {
          'success': '#059669',  // Vert confiance
          'warning': '#d97706',  // Orange attention
          'danger': '#dc2626',   // Rouge alerte
          'info': '#0891b2',     // Cyan info
        },
        'maple': {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',  // Rouge érable canadien
          700: '#b91c1c',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'sticky': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
