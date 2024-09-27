import { Theme } from "@react-navigation/native";

const white = "#fff";

const Colors = {
  light: {
    text: "#000",
    background: white,
    lightBackground: "#FFEEE7",
    navigator: white,
    tint: "#2f95dc",
    tabIconDefault: "#ccc",
    tabIconSelected: "#2f95dc",
    card: "#f9f9f9",
    border: "#ddd",
    notification: "#ff453a",
    basicButton: "#505F9E",
  },
  dark: {
    text: white,
    background: "#080813",
    lightBackground: "#FFEEE7",
    navigator: "#010103",
    tint: white,
    tabIconDefault: "#ccc",
    tabIconSelected: white,
    card: "#16213E",
    border: "#333",
    notification: "#ff453a",
    basicButton: "#505F9E",
  },
};

export default Colors;

export type CustomTheme = Theme & {
  colors: Theme["colors"] & {
    lightBackground: string;
    basicButton: string;
  };
};

export const createTheme = (colorScheme: "light" | "dark"): CustomTheme => ({
  dark: colorScheme === "dark",
  colors: {
    background: Colors[colorScheme].background,
    text: Colors[colorScheme].text,
    primary: Colors[colorScheme].tint,
    card: Colors[colorScheme].card,
    border: Colors[colorScheme].border,
    notification: Colors[colorScheme].notification,
    lightBackground: Colors[colorScheme].lightBackground,
    basicButton: Colors[colorScheme].basicButton,
  },
});
