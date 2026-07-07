import { createContext } from "react";

// Create Context
export const ThemeContext = createContext();

// Theme Provider Component
export function ThemeProvider({ children }) {
  const theme = {
    background: "#1f2937",
    color: "#ffffff",
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}