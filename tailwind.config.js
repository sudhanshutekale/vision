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
        eco: {
          bg: '#05110a',
          surface: '#081a11',
          card: '#0c2317',
          border: 'rgba(52, 211, 153, 0.15)',
          hover: '#133523',
          emerald: '#10b981',
          neon: '#10e283',
          lime: '#a3e635',
          darkest: '#030805'
        },
        bin: {
          blue: '#2563eb',
          green: '#16a34a',
          black: '#374151',
          red: '#dc2626',
          purple: '#9333ea',
          amber: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'scan': 'scan 2.4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'radar': 'radar 3s linear infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(16, 226, 131, 0.25)',
        'glow': '0 0 25px -3px rgba(16, 226, 131, 0.35)',
        'glow-lg': '0 0 40px -5px rgba(16, 226, 131, 0.45)',
        'glow-lime': '0 0 25px -3px rgba(163, 230, 53, 0.35)',
      }
    },
  },
  plugins: [],
}
