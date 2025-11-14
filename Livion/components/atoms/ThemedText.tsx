import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { Colors, Typography } from '../../constants/Colors';

export type ThemedTextProps = {
  children: React.ReactNode;
  variant?: 'h1' | 'display' | 'heading' | 'subtitle' | 'body' | 'label' | 'caption';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'teal' | 'indigo' | 'gold' | 'coral';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  style?: StyleProp<TextStyle>;
};

/**
 * ThemedText Component
 * Typography system following WCAG AA contrast requirements
 * Minimum 14-16pt base; 1.2-1.6 line-height
 */
export const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  align = 'left',
  style,
}) => {
  const variantStyles: Record<string, TextStyle> = {
    display: {
      fontSize: Typography.fontSize['4xl'],
      lineHeight: Typography.fontSize['4xl'] * Typography.lineHeight.tight,
      fontWeight: Typography.fontWeight.bold,
    },
    heading: {
      fontSize: Typography.fontSize['2xl'],
      lineHeight: Typography.fontSize['2xl'] * Typography.lineHeight.tight,
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

  const colorStyles: Record<string, string> = {
    primary: Colors.text.primary,
    secondary: Colors.text.secondary,
    tertiary: Colors.text.tertiary,
    inverse: Colors.text.inverse,
    teal: Colors.primary.teal,
    indigo: Colors.primary.indigo,
    gold: Colors.accent.gold,
    coral: Colors.accent.coral,
  };

  return (
    <Text
      style={[
        styles.base,
        variantStyles[variant],
        { color: colorStyles[color] },
        { fontWeight: Typography.fontWeight[weight] },
        { textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: Typography.fontFamily.sans,
  },
});
