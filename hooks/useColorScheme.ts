// hooks/useColorScheme.ts

import { useState, useEffect } from "react";
import { Appearance } from "react-native";

export default function useColorScheme() {
  const [colorScheme, setColorScheme] = useState(
    Appearance.getColorScheme() || "light"
  );

  useEffect(() => {
    const loadTheme = async () => {
      //TODO: Implement Color storage in db I guess
      setColorScheme("dark");
    };
    loadTheme();
  }, []);

  const toggleColorScheme = async () => {
    const newScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newScheme);
  };

  return { colorScheme, toggleColorScheme };
}
