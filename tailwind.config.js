/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "280px",
        md: "760px",
        lg: "1024px",
        xlg: "1280px",
        xl: "1440px",
        xxl: "1780px",
      },
      colors: {
        "custom-blue": "#5C48F6",
        "custom-violet": "#6F42C1",
        "custom-gray": "#999999",
        "custom-black": "#1C273C",
        "custom-lite-gray": "#EDEDED",
        "custom-gray-border": "#CCCCCC",
        "custom-offwhite": "#F7F7F7",
        "custom-border": "#cccccc",
      },
      boxShadow: {
        custom: "rgba(0, 0, 0, 0.35) 0px 2px 7px",
        "custom-lite": "rgba(0, 0, 0, 0.35) 0px 1px 5px",
      },

      fontFamily: {
        spartan: ["League Spartan", "serif"],
      },
    },
  },
  plugins: [],
};
