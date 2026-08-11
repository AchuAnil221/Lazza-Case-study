/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#080B11',
          surface: '#0E131F',
          card: '#131927',
          border: 'rgba(255, 255, 255, 0.08)',
          cyan: '#00E5FF',
          blue: '#0066FF',
          amber: '#FFB703',
          emerald: '#10B981',
          rose: '#F43F5E',
          text: '#F3F4F6',
          muted: '#9CA3AF',
          dim: '#4B5563'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Plus Jakarta Sans', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 229, 255, 0.15)' },
          '100%': { boxShadow: '0 0 35px rgba(0, 229, 255, 0.35)' },
        }
      }
    },
  },
  plugins: [],
}
