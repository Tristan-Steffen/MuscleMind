import { Theme } from "@react-navigation/native";

const white = "#fff";

const Colors = {
  light: {
    text: "#000",
    placeHolderText: "#666",
    background: white,
    highlight: "#FFEEE7",
    lighterBackground: "#40455C",
    darkerBackground: "#383C4E",
    navigator: white,
    tint: "#2f95dc",
    tabIconDefault: "#ccc",
    tabIconSelected: "#2f95dc",
    card: "#f9f9f9",
    border: "#666778",
    notification: "#ff453a",
    basicButton: "#505F9E",
    success: "#4CD964",
  },
  dark: {
    text: white,
    placeHolderText: "#666",
    background: "#010104",
    lighterBackground: "#1C1624",
    darkerBackground: "#100B1A",
    highlight: "#FFEEE7",
    navigator: "#0D0D48",
    tint: white,
    tabIconDefault: "#ccc",
    tabIconSelected: white,
    card: "#262831",
    border: "#51515B",
    notification: "#ff453a",
    basicButton: "#505F9E",
    success: "#4CD964",
  },
};

export default Colors;

export type CustomTheme = Theme & {
  colors: Theme["colors"] & {
    highlight: string;
    lighterBackground: string;
    basicButton: string;
    darkerBackground: string;
    placeHolderText: string;
    success: string;
    navigator: string;
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
    basicButton: Colors[colorScheme].basicButton,
    lighterBackground: Colors[colorScheme].lighterBackground,
    darkerBackground: Colors[colorScheme].darkerBackground,
    placeHolderText: Colors[colorScheme].placeHolderText,
    success: Colors[colorScheme].success,
    navigator: Colors[colorScheme].navigator
  },
});
