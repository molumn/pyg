/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/view/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dust: {
          primary: '#BEBEBE',
          secondary: '#7F7F7F',
          concentrate: '#A0A0A0',
          utility: '#5F5F5F',
          light: '#E0E0E0',
          text: {
            heavy: '#000000',
            base: '#333333'
          },
          handling: {
            highlight: 'rgba(170, 170, 170, 0.7)',
            warning: 'rgba(255, 0, 0, 0.7)'
          }
        }
      }
    }
  },
  plugins: []
}
