/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./expo-router/entry.js" // Include your entry file
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        text: "var(--color-text)",
        placeHolderText: "var(--color-placeHolderText)",
        background: "var(--color-background)",
        lightBackground: "var(--color-lightBackground)",
        darkBackground: "var(--color-darkBackground)",
        darkerBackground: "var(--color-darkerBackground)",
        navigator: "var(--color-navigator)",
        tint: "var(--color-tint)",
        tabIconDefault: "var(--color-tabIconDefault)",
        tabIconSelected: "var(--color-tabIconSelected)",
        card: "var(--color-card)",
        border: "var(--color-border)",
        notification: "var(--color-notification)",
        basicButton: "var(--color-basicButton)",
        success: "var(--color-success)",
      },
    },
  },
  plugins: [],
};