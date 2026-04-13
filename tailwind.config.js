export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        glass: '0 20px 80px rgba(11, 19, 49, 0.20)',
        soft: '0 24px 60px rgba(15, 23, 42, 0.18)'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(120, 95, 255, 0.22), transparent 40%), radial-gradient(circle at bottom right, rgba(56, 189, 248, 0.18), transparent 30%), linear-gradient(135deg, #020617, #060d23)'
      },
      colors: {
        midnight: '#040b1f',
        celestial: '#0b122f',
        glass: 'rgba(255,255,255,0.08)'
      }
    }
  },
  plugins: []
};
