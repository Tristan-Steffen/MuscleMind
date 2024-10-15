import { Theme } from "@react-navigation/native";

const white = "#fff";

const Colors = {
  light: {
    text: "#000",
    placeHolderText: "#666",
    background: white,
    lightBackground: "#FFEEE7",
    darkBackground: "#40455C",
    darkerBackground: "#383C4E",
    navigator: white,
    tint: "#2f95dc",
    tabIconDefault: "#ccc",
    tabIconSelected: "#2f95dc",
    card: "#f9f9f9",
    border: "#666778",
    notification: "#ff453a",
    basicButton: "#505F9E",
  },
  dark: {
    text: white,
    placeHolderText: "#666",
    background: "#080813",
    darkBackground: "#2D2538",
    darkerBackground: "#1C1624",
    lightBackground: "#FFEEE7",
    navigator: "#010103",
    tint: white,
    tabIconDefault: "#ccc",
    tabIconSelected: white,
    card: "#16213E",
    border: "#51515B",
    notification: "#ff453a",
    basicButton: "#505F9E",
  },
};

export default Colors;

export type CustomTheme = Theme & {
  colors: Theme["colors"] & {
    lightBackground: string;
    darkBackground: string;
    basicButton: string;
    darkerBackground: string;
    placeHolderText: string;
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
    darkBackground: Colors[colorScheme].darkBackground,
    darkerBackground: Colors[colorScheme].darkerBackground,
    placeHolderText: Colors[colorScheme].placeHolderText,
  },
});
