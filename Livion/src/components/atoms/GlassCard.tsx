/**
 * GlassCard - Reusable glassmorphism card component
 * Used across the app for consistent frosted glass effect cards
 */

import React from 'react';
import { Platform, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { COLORS, Spacing, BorderRadius } from '@/src/constants/Colors';

export type GlassCardVariant =
  | 'default'
  | 'teal-highlight'
  | 'amber-highlight'
  | 'subtle';

export type GlassCardShadowSize = 'sm' | 'md' | 'lg';

export type GlassCardProps = {
  children: React.ReactNode;
  /** Card style variant */
  variant?: GlassCardVariant;
  /** Shadow intensity */
  shadowSize?: GlassCardShadowSize;
  /** Custom border radius */
  borderRadius?: number;
  /** Custom padding */
  padding?: number;
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
};

const SHADOW_CONFIGS = {
  sm: {
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
    },
    android: { elevation: 2 },
  },
  md: {
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 16,
    },
    android: { elevation: 4 },
  },
  lg: {
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 24,
    },
    android: { elevation: 6 },
  },
};

const VARIANT_STYLES: Record<GlassCardVariant, ViewStyle> = {
  default: {},
  'teal-highlight': {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.teal,
    backgroundColor: 'rgba(3, 208, 197, 0.08)',
  },
  'amber-highlight': {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.amber,
    backgroundColor: 'rgba(255, 110, 30, 0.06)',
  },
  subtle: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  shadowSize = 'md',
  borderRadius = BorderRadius['2xl'],
  padding = Spacing.xl,
  style,
}) => {
  const shadowConfig = SHADOW_CONFIGS[shadowSize];
  const variantStyle = VARIANT_STYLES[variant];

  const cardStyle: ViewStyle = {
    ...styles.base,
    ...variantStyle,
    borderRadius,
    padding,
    ...Platform.select({
      ios: shadowConfig.ios,
      android: shadowConfig.android,
    }),
  };

  return <View style={[cardStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
});
