import { useMemo } from "react";
import { useColorScheme } from "react-native";

const lightThemeColors = {
  background: {
    bright: "#ffffff",
    variant: "#aaaaaa",
    main: "#eeeeee",
    subdued: "#cccccc",
  },
  text: {
    bright: "#000000",
    variant: "#1a1a1a",
    main: "#111111",
    subdued: "#333333",
  },
};

export type NornIronThemeColors = typeof lightThemeColors;

const darkThemeColors: NornIronThemeColors = {
  background: {
    main: "#1f1f1f",
    variant: "#4a4a4a",
    bright: "#5a5a5a",
    subdued: "#3a3a3a",
  },
  text: {
    bright: "#ffffff",
    variant: "#ffffff",
    main: "#e8e8e8",
    subdued: "#cccccc",
  },
};

export const useColors = (): NornIronThemeColors => {
  const darkMode = useColorScheme() === "dark";
  return useMemo(() => {
    return darkMode ? darkThemeColors : lightThemeColors;
  }, [darkMode]);
};
