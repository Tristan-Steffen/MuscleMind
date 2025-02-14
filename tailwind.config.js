/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./expo-router/entry.js" // Include your entry file
  ],
  presets: [require("nativewind/preset")],
  theme: { extend: {} },
  plugins: [],
};