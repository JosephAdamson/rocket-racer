/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainPurple: "#a32ce8"
      },
      fontFamily: {
        sourceCode: ['sourceCodePro']
      }
    },
  },
  plugins: [],
}
