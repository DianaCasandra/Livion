import React from 'react';
import { Platform, StyleProp, Text, TextStyle } from 'react-native';
import { COLORS, Typography } from '../../constants/Colors';

export type ThemedTextProps = {
  children: React.ReactNode;
  variant?: 'h1' | 'display' | 'heading' | 'subtitle' | 'body' | 'label' | 'caption' | 'title';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'teal' | 'amber' | 'success' | 'error';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  style?: StyleProp<TextStyle>;
};

/**
 * ThemedText Component
 * Typography system following WCAG AA contrast requirements
 * Minimum 14-16pt base; 1.2-1.6 line-height
 * Uses System fonts - SF Pro (iOS) / Roboto (Android)
 */
export const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  weight,
  align = 'left',
  style,
}) => {
  // Variant styles with appropriate font weights
  const variantStyles: Record<string, TextStyle> = {
    display: {
      fontSize: Typography.fontSize['4xl'],
      lineHeight: Typography.fontSize['4xl'] * Typography.lineHeight.tight,
      fontWeight: Typography.fontWeight.bold,
    },
    h1: {
      fontSize: Typography.fontSize['3xl'],
      lineHeight: Typography.fontSize['3xl'] * Typography.lineHeight.tight,
      fontWeight: Typography.fontWeight.bold,
    },
    heading: {
      fontSize: Typography.fontSize['2xl'],
      lineHeight: Typography.fontSize['2xl'] * Typography.lineHeight.tight,
      fontWeight: Typography.fontWeight.semibold,
    },
    title: {
      fontSize: Typography.fontSize.xl,
      lineHeight: Typography.fontSize.xl * Typography.lineHeight.tight,
      fontWeight: Typography.fontWeight.semibold,
    },
    subtitle: {
      fontSize: Typography.fontSize.lg,
      lineHeight: Typography.fontSize.lg * Typography.lineHeight.normal,
      fontWeight: Typography.fontWeight.medium,
    },
    body: {
      fontSize: Typography.fontSize.base,
      lineHeight: Typography.fontSize.base * Typography.lineHeight.relaxed,
      fontWeight: Typography.fontWeight.normal,
    },
    label: {
      fontSize: Typography.fontSize.sm,
      lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
      fontWeight: Typography.fontWeight.medium,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: Typography.fontSize.xs,
      lineHeight: Typography.fontSize.xs * Typography.lineHeight.normal,
      fontWeight: Typography.fontWeight.normal,
    },
  };

  // Color mapping using COLORS constants - using soft dark grays instead of pure black
  const colorStyles: Record<string, string> = {
    primary: COLORS.textPrimary,     // #1a1a2e - deep navy-black (softer than pure black)
    secondary: COLORS.textSecondary, // #64748b - slate gray
    tertiary: COLORS.textTertiary,   // #94a3b8 - muted gray
    inverse: COLORS.cardWhite,       // #ffffff - white for dark backgrounds
    teal: COLORS.teal,               // #03d0c5 - brand teal
    amber: COLORS.amber,             // #ff6e1e - accent amber
    success: COLORS.success,         // #10b981 - success green
    error: COLORS.error,             // #ef4444 - error red
  };

  // Get final font weight - use explicit weight prop if provided, otherwise use variant default
  const finalFontWeight = weight ? Typography.fontWeight[weight] : variantStyles[variant]?.fontWeight;

  return (
    <Text
      style={[
        variantStyles[variant],
        { color: colorStyles[color] },
        { fontWeight: finalFontWeight },
        { textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
