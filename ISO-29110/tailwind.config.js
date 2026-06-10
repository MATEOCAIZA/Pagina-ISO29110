/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark:    'var(--color-primary-dark)',
          light:   'var(--color-primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          dark:    'var(--color-secondary-dark)',
          light:   'var(--color-secondary-light)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          dark:    'var(--color-accent-dark)',
          light:   'var(--color-accent-light)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          dark:    'var(--color-warning-dark)',
          light:   'var(--color-warning-light)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          dark:    'var(--color-danger-dark)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          2: 'var(--color-surface-2)',
          3: 'var(--color-surface-3)',
          4: 'var(--color-surface-4)',
        },
        'text-primary':   'var(--color-text-primary)',
        'text-muted':     'var(--color-text-muted)',
        'border-subtle':  'var(--color-border-subtle)',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero':     'var(--gradient-hero)',
        'gradient-primary':  'var(--gradient-primary)',
        'gradient-accent':   'var(--gradient-accent)',
      },
      animation: {
        'fade-in':       'fadeIn 0.5s ease-out',
        'slide-up':      'slideUp 0.6s ease-out',
        'slide-in-right':'slideInRight 0.5s ease-out',
        'pulse-slow':    'pulse 3s ease-in-out infinite',
        'float':         'float 4s ease-in-out infinite',
        'glow':          'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%':   { boxShadow: '0 0 5px rgba(59,130,246,0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(59,130,246,0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-primary':   '0 0 20px rgba(59,130,246,0.3)',
        'glow-secondary': '0 0 20px rgba(139,92,246,0.3)',
        'glow-accent':    '0 0 20px rgba(20,184,166,0.3)',
        'card':           '0 4px 24px rgba(0,0,0,0.15)',
        'card-hover':     '0 8px 40px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
}
