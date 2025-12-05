import { useTheme } from '../components/providers/ThemeProvider';

/**
 * useThemeColor Hook
 * Access theme colors consistently across the app
 */
export const useThemeColor = () => {
  const { colors } = useTheme();
  return colors;
};
