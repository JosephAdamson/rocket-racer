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
        slateblue : "#243552"
      },
      transitionProperty: {
        height: 'height'
      },
      fontFamily: {
        sourceCode: ['sourceCodePro']
      }
    },
  },
  plugins: [],
}
