import React, { createContext, useContext, useState } from "react";
import { type Theme } from "@fluentui/react-components";
import { lightTheme, darkTheme } from "../themes";

interface ThemeContextValue {
  isDark: boolean;
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  theme: lightTheme,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((d) => !d);
  return (
    <ThemeContext.Provider value={{ isDark, theme: isDark ? darkTheme : lightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
