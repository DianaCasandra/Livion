import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Colors } from '../../constants/Colors';

type ThemeContextType = {
  colors: typeof Colors;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Currently only dark mode (Stardust-inspired deep navy background)
  // Can be extended to support light mode in the future
  const [isDarkMode] = useState(true);

  const toggleTheme = () => {
    // Future implementation for light/dark toggle
    console.log('Theme toggle not yet implemented');
  };

  return (
    <ThemeContext.Provider
      value={{
        colors: Colors,
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
