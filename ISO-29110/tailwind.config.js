/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(217, 91%, 60%)',
          dark: 'hsl(217, 91%, 45%)',
          light: 'hsl(217, 91%, 75%)',
        },
        secondary: {
          DEFAULT: 'hsl(262, 83%, 65%)',
          dark: 'hsl(262, 83%, 50%)',
          light: 'hsl(262, 83%, 80%)',
        },
        accent: {
          DEFAULT: 'hsl(172, 66%, 50%)',
          dark: 'hsl(172, 66%, 35%)',
          light: 'hsl(172, 66%, 65%)',
        },
        warning: {
          DEFAULT: 'hsl(38, 92%, 55%)',
          dark: 'hsl(38, 92%, 40%)',
          light: 'hsl(38, 92%, 70%)',
        },
        danger: {
          DEFAULT: 'hsl(0, 84%, 60%)',
          dark: 'hsl(0, 84%, 45%)',
        },
        surface: {
          DEFAULT: 'hsl(220, 20%, 10%)',
          2: 'hsl(220, 18%, 14%)',
          3: 'hsl(220, 16%, 18%)',
          4: 'hsl(220, 14%, 22%)',
        },
        'text-primary': 'hsl(210, 40%, 96%)',
        'text-muted': 'hsl(215, 20%, 65%)',
        'border-subtle': 'hsl(220, 15%, 22%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, hsl(220,20%,10%) 0%, hsl(240,20%,14%) 50%, hsl(262,20%,12%) 100%)',
        'gradient-primary': 'linear-gradient(135deg, hsl(217,91%,60%), hsl(262,83%,65%))',
        'gradient-accent': 'linear-gradient(135deg, hsl(172,66%,50%), hsl(217,91%,60%))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px hsl(217,91%,60%,0.3)' },
          '100%': { boxShadow: '0 0 20px hsl(217,91%,60%,0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-primary': '0 0 20px hsl(217,91%,60%,0.3)',
        'glow-secondary': '0 0 20px hsl(262,83%,65%,0.3)',
        'glow-accent': '0 0 20px hsl(172,66%,50%,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
