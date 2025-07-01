/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4FE9',
        secondary: '#8B85F0',
        accent: '#FF6B6B',
        success: '#4ECDC4',
        warning: '#FFD93D',
        error: '#FF6B6B',
        info: '#4D96FF',
        surface: '#FFFFFF',
        'gray-50': '#F8F9FA',
        'gray-100': '#F1F3F4',
        'gray-200': '#E8EAED',
        'gray-300': '#DADCE0',
        'gray-400': '#9AA0A6',
        'gray-500': '#5F6368',
        'gray-600': '#404040',
        'gray-700': '#2D2D2D',
        'gray-800': '#1F1F1F',
        'gray-900': '#121212',
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        'soft': '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 12px 0 rgba(0, 0, 0, 0.1)',
        'strong': '0 8px 24px 0 rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(91, 79, 233, 0.3)',
      },
      animation: {
        'bounce-subtle': 'bounce-subtle 0.6s ease-in-out',
        'slide-right': 'slide-right 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'confetti': 'confetti 0.8s ease-out',
        'progress-fill': 'progress-fill 0.5s ease-out',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100px)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'confetti': {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(180deg)', opacity: '0' },
        },
        'progress-fill': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
      },
    },
  },
  plugins: [],
}