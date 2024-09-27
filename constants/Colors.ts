import { Theme } from "@react-navigation/native";

const Colors = {
  light: {
    text: "#000",
    background: "#fff",
    navigator: "#fff",
    tint: "#2f95dc",
    tabIconDefault: "#ccc",
    tabIconSelected: "#2f95dc",
    card: "#f9f9f9",
    border: "#ddd",
    highlight: "#ff453a",
    notification: "#ff453a",
  },
  dark: {
    text: "#fff",
    background: "#080813",
    navigator: "#010103",
    tint: "#fff",
    tabIconDefault: "#ccc",
    tabIconSelected: "#fff",
    card: "#16213E",
    border: "#333",
    highlight: "#FFEEE7",
    notification: "#ff453a",
  },
};

export default Colors;

export type CustomTheme = Theme & {
  colors: Theme["colors"] & {
    highlight: string;
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
    highlight: Colors[colorScheme].highlight,
  },
});
