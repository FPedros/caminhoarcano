/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        color1: "#68b2f8",
        color2: "#506ee5",
        color3: "#7037cd",
        color4: "#651f71",
        color5: "#1d0c20"
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
