/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dust': {
          primary: '#212529',
          secondary: '#343A40',
          highlight: '#495057',
          heavy: '#6C757D',
          light: '#ADB5BD',
          'text-heavy': '#F8F9FA',
          'text-light': '#F8F9FA',
        },
        'picnic': {
          primary: '#CCD5AE',
          secondary: '#E9EDC9',
          highlight: '#D4A373',
          heavy: '#FAEDCD',
          light: '#FEFAE0',
          'text-heavy': '#212529',
          'text-light': '#212529',
        },
        'warm': {
          primary: '#D6CCC2',
          secondary: '#E3D5CA',
          highlight: '#D5BDAF',
          heavy: '#F5EBE0',
          light: '#F9F5F1',
          'text-heavy': '#EDEDE9',
          'text-light': '#EDEDE9',
        },
        'mud': {
          primary: '#595959',
          secondary: '#7F7F7F',
          highlight: '#A5A5A5',
          heavy: '#CCCCCC',
          light: '#F2F2F2',
          'text-heavy': '#F5EBE0',
          'text-light': '#F5EBE0',
        }
      }
    },
  },
  plugins: [],
}

