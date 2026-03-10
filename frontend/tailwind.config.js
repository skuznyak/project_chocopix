/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cocoa: {
          50: '#fbf4ef',
          100: '#f5e6d3',
          500: '#7a4b2e',
          700: '#52240d',
          900: '#3d1c02',
        },
        gold: '#d4a017',
        cream: '#fff8ef',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Cormorant Garamond"', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 45px rgba(61, 28, 2, 0.12)',
        glass: '0 18px 40px rgba(61, 28, 2, 0.16)',
      },
      backgroundImage: {
        velvet:
          'radial-gradient(circle at top, rgba(212,160,23,0.28), transparent 35%), linear-gradient(135deg, #fff8ef 0%, #f5e6d3 45%, #f0d7ba 100%)',
      },
    },
  },
  plugins: [],
}
