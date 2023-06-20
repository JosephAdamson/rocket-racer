/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clearBlue: "#2c90e8",
        coolGrey: "#bacbd9",
        highlightGreen: "#47d91a",
        dashYellow: "#f5d51d",
        slateBlue: "#243552",
        coolGreen: "#4caf50",
        sparkOrange: "#ff7c1d",
        softGreen: "#4caf50",
        mellowOrange: "#ffb21b",
        rocketRed: "#e23526",
        teal: "#4790ae "
      },
      animation: {
        "fadeIn": "fadeIn 1s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      fontFamily: {
        sourceCode: ['SourceCodePro','monospace'],
        mulish: ['Mulish', 'sans-serif'],
        timeBomb: ['TimeBomb', 'monospace']
      },
    },
  },
  plugins: [],
}
