/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clearblue: "#2c90e8",
        coolgrey: "#bacbd9",
        highlightgreen: "#47d91a",
        dashyellow: "#f5d51d",
        slateblue: "#243552",
        coolgreen: "#4caf50",
        sparkorange: "#ff7c1d",
        softgreen: "#4caf50",
        melloworange: "#ffb21b"
      },
      animation: {
        "fadeIn": "fadeIn 1s ease-in"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      fontFamily: {
        sourceCode: ['Source Code Pro','monospace'],
        mulish: ['Mulish', 'sans-serif']
      },
    },
  },
  plugins: [],
}
