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
          50: '#e6f0f8',
          100: '#cce1f1',
          200: '#99c3e3',
          300: '#66a5d5',
          400: '#3387c7',
          500: '#1A4B8A', // Main brand color from logo
          600: '#153d6f',
          700: '#102e53',
          800: '#0a1f38',
          900: '#05101c',
          950: '#02080e',
        },
        secondary: {
          50: '#f5f5f5',
          100: '#ebebeb',
          200: '#d7d7d7',
          300: '#c3c3c3',
          400: '#afafaf',
          500: '#666666', // Tagline color from logo
          600: '#525252',
          700: '#3d3d3d',
          800: '#292929',
          900: '#141414',
          950: '#0a0a0a',
        },
        accent: {
          light: '#e6f0f8',
          DEFAULT: '#1A4B8A', // Logo blue
          dark: '#153d6f',
        },
        // Keep green as complementary accent for variety
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(26, 75, 138, 0.1) 0%, rgba(102, 102, 102, 0.05) 100%)',
        'card-gradient': 'linear-gradient(135deg, #ffffff 0%, #e6f0f8 100%)',
        'accent-gradient': 'linear-gradient(135deg, #1A4B8A 0%, #153d6f 100%)',
        'blue-gradient': 'linear-gradient(135deg, #2563eb 0%, #1A4B8A 100%)',
        'logo-gradient': 'linear-gradient(135deg, #1A4B8A 0%, #2563eb 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow-primary': '0 0 20px rgba(26, 75, 138, 0.3)',
        'glow-blue': '0 0 20px rgba(26, 75, 138, 0.4)',
        'glow-success': '0 0 20px rgba(22, 163, 74, 0.3)',
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 15s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}






