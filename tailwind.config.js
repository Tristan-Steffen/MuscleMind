// tailwind.config.js
const colors = require("./constants/colors");

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./expo-router/entry.js",
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        text: colors.light.text,
        placeHolderText: colors.light.placeHolderText,
        background: colors.light.background,
        highlight: colors.light.highlight,
        darkBackground: colors.light.darkBackground,
        darkerBackground: colors.light.darkerBackground,
        navigator: colors.light.navigator,
        tint: colors.light.tint,
        tabIconDefault: colors.light.tabIconDefault,
        tabIconSelected: colors.light.tabIconSelected,
        card: colors.light.card,
        border: colors.light.border,
        notification: colors.light.notification,
        basicButton: colors.light.basicButton,
        success: colors.light.success,
      },
    },
  },
  plugins: [
    // Generate CSS variables from your colors.
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-text': theme('colors.text'),
          '--color-placeHolderText': theme('colors.placeHolderText'),
          '--color-background': theme('colors.background'),
          '--color-highlight': theme('colors.highlight'),
          '--color-darkBackground': theme('colors.darkBackground'),
          '--color-darkerBackground': theme('colors.darkerBackground'),
          '--color-navigator': theme('colors.navigator'),
          '--color-tint': theme('colors.tint'),
          '--color-tabIconDefault': theme('colors.tabIconDefault'),
          '--color-tabIconSelected': theme('colors.tabIconSelected'),
          '--color-card': theme('colors.card'),
          '--color-border': theme('colors.border'),
          '--color-notification': theme('colors.notification'),
          '--color-basicButton': theme('colors.basicButton'),
          '--color-success': theme('colors.success'),
        },
        '.dark': {
          '--color-text': colors.dark.text,
          '--color-placeHolderText': colors.dark.placeHolderText,
          '--color-background': colors.dark.background,
          '--color-highlight': colors.dark.highlight,
          '--color-darkBackground': colors.dark.darkBackground,
          '--color-darkerBackground': colors.dark.darkerBackground,
          '--color-navigator': colors.dark.navigator,
          '--color-tint': colors.dark.tint,
          '--color-tabIconDefault': colors.dark.tabIconDefault,
          '--color-tabIconSelected': colors.dark.tabIconSelected,
          '--color-card': colors.dark.card,
          '--color-border': colors.dark.border,
          '--color-notification': colors.dark.notification,
          '--color-basicButton': colors.dark.basicButton,
          '--color-success': colors.dark.success,
        },
      });
    },
  ],
};
