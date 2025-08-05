/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        degen: '#00ff99',
        darkBg: '#0d1521',
        card: '#232531',
        cardHover: '#1a1a1a',
        softBorder: '#2c2c2c',
        marketData: '#7788bb',
      },
      boxShadow: {
        soft: '0 4px 15px rgba(0,0,0,0.3)',
      },
      transitionProperty: {
        glow: 'box-shadow, background-color, color',
      }
    },
  },
  plugins: [],
};
