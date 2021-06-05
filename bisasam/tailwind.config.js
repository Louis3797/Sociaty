module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      primary: "#262626",
      secondary: "#b011f5",
      text: "#f1f1f1",
      bg: "#1e1e1e",
      error: "#df0000",
    },
    fontFamily: {
      comfortaa: ["Comfortaa", "cursive"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
