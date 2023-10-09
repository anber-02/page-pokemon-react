/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundColor: {
        'radial-gradient': 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,0,0,1) 100%)'
      },
      fontSize: {
        '5xl': '3.2rem'
      }
    }
  },
  plugins: []
}
