module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        degen: "#00ff99",
        darkBg: "#0d1521",
        card: "#232531",
        marketData: '#7788bb',
        cardHover: "#31324e",
        softBorder: "#2c2c2c",
        marketData: "#7788bb",
      },
      boxShadow: {
        soft: "0 4px 15px rgba(0,0,0,0.3)",
        cardGlow: "0 2px 16px 0 rgba(0,255,153,0.14), 0 1.5px 5px 0 rgba(0,0,0,0.14)",
      },
      transitionProperty: {
        glow: "box-shadow, background-color, color",
      },
    },
  },
  plugins: [],
};
