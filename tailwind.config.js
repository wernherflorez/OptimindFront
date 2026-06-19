/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── LANDING (nueva paleta oscura violet/cyan) ──────────────────────
        deep:    '#060A14',
        surface: 'rgba(255,255,255,0.04)',
        violet: {
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
        },
        cyan: {
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
        },
        // ── DASHBOARD (conserva navy/teal) ─────────────────────────────────
        navy: {
          DEFAULT: '#0d2137',
          light:   '#1a3a5c',
        },
        teal: {
          300: '#5bcfd6',
          400: '#2ab8c1',
          500: '#0e9da3',
          600: '#0b7c82',
          900: '#0d2137',
        },
        mint: {
          DEFAULT: '#d6f0f0',
          light:   '#eaf8f8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out infinite',
        'blob':        'blob 8s ease-in-out infinite',
        'blob-2':      'blob 10s ease-in-out 2s infinite',
        'blob-3':      'blob 12s ease-in-out 4s infinite',
        'spin-slow':   'spin 20s linear infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'gradient':    'gradient 6s ease infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'slide-up':    'slideUp 0.6s ease-out',
        'fade-in':     'fadeIn 0.8s ease-out',
        'text-reveal': 'textReveal 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':     { transform: 'translateY(-24px) rotate(2deg)' },
        },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(40px,-60px) scale(1.15)' },
          '66%':     { transform: 'translate(-30px,20px) scale(0.9)' },
        },
        gradient: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        textReveal: {
          from: { opacity: '0', transform: 'translateY(20px)', filter: 'blur(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)',    filter: 'blur(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':   'conic-gradient(from 180deg, var(--tw-gradient-stops))',
        'gradient-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
