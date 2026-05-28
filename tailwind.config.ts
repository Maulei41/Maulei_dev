import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Premium dark background palette
        bg: {
          primary: '#0A0A0A',
          secondary: '#111111',
          tertiary: '#171717',
          hover: '#1F1F1F',
        },
        // Text colors
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          tertiary: '#71717A',
        },
        // Accent - Emerald green
        accent: {
          DEFAULT: '#00FF95',
          light: '#33FFB2',
          dark: '#00CC77',
          glow: '#00FF95',
        },
        // Neutral grays for borders and accents
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        // Typography scale
        xs: ['12px', { lineHeight: '16px', letterSpacing: '0.5px' }],
        sm: ['14px', { lineHeight: '20px', letterSpacing: '0.25px' }],
        base: ['16px', { lineHeight: '24px', letterSpacing: '0px' }],
        lg: ['18px', { lineHeight: '28px', letterSpacing: '-0.25px' }],
        xl: ['20px', { lineHeight: '28px', letterSpacing: '-0.25px' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.5px' }],
        '3xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.5px' }],
        '4xl': ['36px', { lineHeight: '44px', letterSpacing: '-0.75px' }],
        '5xl': ['48px', { lineHeight: '52px', letterSpacing: '-1px' }],
        '6xl': ['60px', { lineHeight: '68px', letterSpacing: '-1.25px' }],
        '7xl': ['72px', { lineHeight: '80px', letterSpacing: '-1.5px' }],
      },
      spacing: {
        // 8px-based scale
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
        28: '112px',
        32: '128px',
        36: '144px',
        40: '160px',
        44: '176px',
        48: '192px',
        52: '208px',
        56: '224px',
        60: '240px',
        64: '256px',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        // Subtle shadow system
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
        inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
        // Glow effects with emerald accent
        'glow-sm': '0 0 8px rgba(0, 255, 149, 0.1)',
        'glow-md': '0 0 16px rgba(0, 255, 149, 0.15)',
        'glow-lg': '0 0 24px rgba(0, 255, 149, 0.2)',
        'glow-xl': '0 0 32px rgba(0, 255, 149, 0.25)',
        none: 'none',
      },
      borderRadius: {
        none: '0',
        sm: '4px',
        base: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        full: '9999px',
      },
      transitionDuration: {
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
        600: '600ms',
        700: '700ms',
        800: '800ms',
      },
      animation: {
        // Smooth, professional animations
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [
    // Custom plugin for glass effect
    function ({ addUtilities }: { addUtilities: Function }) {
      addUtilities({
        '.glass': {
          '@apply bg-black/20 backdrop-blur-md border border-white/10': {},
        },
        '.glass-sm': {
          '@apply bg-black/10 backdrop-blur-sm border border-white/5': {},
        },
        '.glass-lg': {
          '@apply bg-black/30 backdrop-blur-lg border border-white/15': {},
        },
        '.glow-emerald': {
          '@apply shadow-glow-md': {},
        },
        '.glow-emerald-lg': {
          '@apply shadow-glow-lg': {},
        },
        '.text-gradient': {
          '@apply bg-gradient-to-r from-white via-white to-text-secondary bg-clip-text text-transparent':
            {},
        },
      })
    },
  ],
} satisfies Config
