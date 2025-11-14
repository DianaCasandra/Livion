import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing } from '../../constants/Colors';
import { ThemedText } from './ThemedText';

export type ButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
};

/**
 * Button Component
 * Rounded, accessible buttons with glow effects
 * 200-250ms animation timing for interactions
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  style,
  ...props
}) => {
  const sizeStyles: Record<string, ViewStyle> = {
    sm: {
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      borderRadius: BorderRadius.md,
    },
    md: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.lg,
    },
    lg: {
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.xl,
      borderRadius: BorderRadius.xl,
    },
  };

  const variantStyles: Record<string, ViewStyle> = {
    primary: {
      backgroundColor: Colors.primary.teal,
      ...Shadows.md,
    },
    secondary: {
      backgroundColor: Colors.primary.indigo,
      ...Shadows.md,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: Colors.primary.teal,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    gradient: {
      backgroundColor: Colors.primary.indigo, // Fallback
      ...Shadows.glow,
    },
  };

  const getTextColor = () => {
    if (variant === 'outline' || variant === 'ghost') return 'teal';
    return 'inverse';
  };

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || isLoading}
      style={[
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && styles.fullWidth,
        (disabled || isLoading) && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary.teal : Colors.text.inverse} 
        />
      ) : (
        <ThemedText
          variant="label"
          color={getTextColor() as any}
          weight="semibold"
          align="center"
        >
          {children}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});
