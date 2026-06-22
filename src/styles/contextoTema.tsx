import React, {
  createContext,
  useState,
} from "react";

export const ThemeContext = createContext<any>(null);

export function ThemeProvider({
  children,
}: any) {

  const [darkMode, setDarkMode] =
    useState(true);

  const [fontSize, setFontSize] =
    useState(1);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}