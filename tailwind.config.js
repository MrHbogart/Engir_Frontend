/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        night: {
          900: '#050814',
          800: '#0b1120',
          700: '#111a2d'
        }
      }
    }
  },
  plugins: []
}
