/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#605BFF",
        "yellow": "",
        "foreground": "#FAFAFA",
        "input": "#F7F7F8",
        "black-primary": "#030229"
      }  
    },

  },
  plugins: [],
}

