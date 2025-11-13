import React, { createContext, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggle: () => {}
});

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [theme, setTheme] = useState<'light'|'dark'>('light');
  return (
    <ThemeContext.Provider value={{theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light')}}>
      {children}
    </ThemeContext.Provider>
  );
};