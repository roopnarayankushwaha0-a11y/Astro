/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🌌 Cosmic Theme Palette
        cosmic: {
          900: '#050508', // Void Black
          800: '#0f0f1a', // Deep Space (Main BG)
          700: '#1a1a2e', // Card BG
          600: '#2d2d44', // Lighter Card
        },
        // 🔮 Mystical Purples
        mystic: {
          dark: '#3b0764',
          base: '#5b21b6', // Primary Purple
          light: '#7c3aed',
          glow: '#a78bfa',
        },
        // ✨ Neon Accents
        accent: {
          cyan: '#22d3ee', // Cyan Glow
          teal: '#2dd4bf',
          pink: '#f472b6',
          gold: '#fbbf24',
        },
        // 🌫️ Glass Effect Bases
        glass: {
          10: 'rgba(255, 255, 255, 0.05)',
          20: 'rgba(255, 255, 255, 0.10)',
          30: 'rgba(255, 255, 255, 0.15)',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'], // Modern, clean, spiritual
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px', // Soft edges mandatory
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(167, 139, 250, 0.3)',
        'glow-md': '0 0 20px rgba(167, 139, 250, 0.4)',
        'glow-lg': '0 0 30px rgba(34, 211, 238, 0.4)', // Cyan glow
        'neon': '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #a78bfa',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to bottom, #0f0f1a, #1a1a2e)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
        'accent-gradient': 'linear-gradient(135deg, #7c3aed 0%, #22d3ee 100%)',
      }
    },
  },
  plugins: [],
}
