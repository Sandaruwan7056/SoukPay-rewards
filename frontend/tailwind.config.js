module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter-Regular", "sans-serif"],
        "inter-bold": ["Inter-Bold", "sans-serif"],
        manrope: ["Manrope-Regular", "sans-serif"],
        "manrope-bold": ["Manrope-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};