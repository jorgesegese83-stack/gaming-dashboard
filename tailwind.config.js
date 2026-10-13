/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gamer: {
          bg: '#04060a',
          surface: '#0d0f18',
          card: '#131623',
          border: '#23263a',
          muted: '#8a8fa8',
        },
        neon: {
          purple: '#a855f7',
          violet: '#8b5cf6',
          blue: '#3b82f6',
          cyan: '#22d3ee',
          pink: '#f472b6',
          green: '#4ade80',
        },
        steam: {
          dark: '#171a21',
          DEFAULT: '#1b2838',
          blue: '#2a475e',
          light: '#66c0f4',
        },
        psn: {
          dark: '#00439c',
          DEFAULT: '#0070d1',
          light: '#3ea6ff',
        },
        gold: {
          light: '#fde68a',
          DEFAULT: '#f5c542',
          dark: '#b7791f',
        },
        rarity: {
          common: '#a1a1aa',
          rare: '#38bdf8',
          ultra: '#e879f9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        numeric: ['Rajdhani', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-purple': '0 0 0 1px rgba(168, 85, 247, 0.35), 0 12px 40px -8px rgba(168, 85, 247, 0.45)',
        'neon-cyan': '0 0 18px rgba(34, 211, 238, 0.35)',
        'neon-blue': '0 0 18px rgba(59, 130, 246, 0.4)',
        'neon-pink': '0 0 18px rgba(244, 114, 182, 0.35)',
        'neon-gold': '0 0 0 1px rgba(245, 197, 66, 0.45), 0 12px 40px -8px rgba(245, 197, 66, 0.45)',
        'badge-steam': '0 0 12px rgba(102, 192, 244, 0.25)',
        'badge-psn': '0 0 14px rgba(0, 112, 209, 0.6)',
        'badge-gold': '0 0 14px rgba(245, 197, 66, 0.55)',
        glass: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06), 0 8px 32px -12px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(90deg, #a855f7 0%, #3b82f6 55%, #22d3ee 100%)',
        'gold-shimmer':
          'linear-gradient(110deg, #b7791f 0%, #f5c542 30%, #fff6d5 45%, #f5c542 60%, #b7791f 100%)'
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96) translateY(12px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up': 'slide-up 0.5s ease-out both',
        shimmer: 'shimmer 3.5s linear infinite',
      },
    },
  },
  plugins: [],
};
