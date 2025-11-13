import { useContext } from 'react';
import { ThemeContext } from '../components/providers/ThemeProvider';
import { Colors } from '../constants/Colors';

export const useThemeColor = (key: keyof typeof Colors) => {
  const { theme } = useContext(ThemeContext);
  // Simple: theme can be 'light' or 'dark' but we keep same palette for POC
  return Colors[key];
};