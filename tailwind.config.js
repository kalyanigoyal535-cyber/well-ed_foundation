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
          50: '#f0f7ff', // Light pale blue from mood board
          100: '#e6f0f8',
          200: '#cce1f1',
          300: '#99c3e3',
          400: '#66a5d5',
          500: '#1A4B8A', // Dark deep blue from mood board
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
          500: '#666666',
          600: '#525252',
          700: '#3d3d3d',
          800: '#292929',
          900: '#141414',
          950: '#0a0a0a',
        },
        accent: {
          light: '#f0f7ff', // Light pale blue from mood board
          DEFAULT: '#1A4B8A', // Dark deep blue from mood board
          dark: '#102e53',
        },
        // Vibrant medium green from mood board
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Vibrant medium green
          600: '#16a34a',
          700: '#15803d',
        },
        // Mood board colors
        moodboard: {
          yellow: '#FFD700', // Bright sunny yellow
          orange: '#FF6B35', // Vibrant orange
          red: '#DC2626', // Deep rich red
          green: '#22c55e', // Vibrant medium green
          blue: '#1A4B8A', // Dark deep blue
          lightBlue: '#f0f7ff', // Light pale blue
        }
      },
      fontFamily: {
        sans: ['Atkinson Hyperlegible', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Atkinson Hyperlegible', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(26, 75, 138, 0.1) 0%, rgba(102, 102, 102, 0.05) 100%)',
        'card-gradient': 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)',
        'accent-gradient': 'linear-gradient(135deg, #1A4B8A 0%, #153d6f 100%)',
        'blue-gradient': 'linear-gradient(135deg, #1A4B8A 0%, #102e53 100%)',
        'logo-gradient': 'linear-gradient(135deg, #1A4B8A 0%, #22c55e 100%)',
        'moodboard-gradient': 'linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #DC2626 100%)',
        'moodboard-warm': 'linear-gradient(135deg, #FFD700 0%, #FF6B35 100%)',
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
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'fadeInLeft': 'fadeInLeft 0.7s ease-out forwards',
        'fadeInRight': 'fadeInRight 0.7s ease-out forwards',
        'zoomIn': 'zoomIn 0.5s ease-out forwards',
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
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}






