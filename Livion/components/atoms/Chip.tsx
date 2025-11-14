import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';
import { ThemedText } from './ThemedText';

export type ChipProps = {
  label: string;
  variant?: 'teal' | 'indigo' | 'gold' | 'coral' | 'status-ok' | 'status-attention' | 'status-action';
  size?: 'sm' | 'md';
  style?: ViewStyle;
};

/**
 * Chip Component
 * Small, rounded indicators for status and categorization
 * Used for consent status, care plan categories, etc.
 */
export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'teal',
  size = 'md',
  style,
}) => {
  const variantStyles: Record<string, { bg: string; text: string }> = {
    teal: {
      bg: `${Colors.primary.teal}20`, // 20% opacity
      text: Colors.primary.teal,
    },
    indigo: {
      bg: `${Colors.primary.indigo}20`,
      text: Colors.primary.indigo,
    },
    gold: {
      bg: `${Colors.accent.gold}20`,
      text: Colors.accent.gold,
    },
    coral: {
      bg: `${Colors.accent.coral}20`,
      text: Colors.accent.coral,
    },
    'status-ok': {
      bg: `${Colors.status.ok}20`,
      text: Colors.status.ok,
    },
    'status-attention': {
      bg: `${Colors.status.attention}20`,
      text: Colors.status.attention,
    },
    'status-action': {
      bg: `${Colors.status.action}20`,
      text: Colors.status.action,
    },
  };

  const sizeStyles: Record<string, ViewStyle> = {
    sm: {
      paddingVertical: Spacing.xs,
      paddingHorizontal: Spacing.sm,
      borderRadius: BorderRadius.sm,
    },
    md: {
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      borderRadius: BorderRadius.md,
    },
  };

  return (
    <View
      style={[
        styles.container,
        sizeStyles[size],
        { backgroundColor: variantStyles[variant].bg },
        style,
      ]}
    >
      <ThemedText
        variant={size === 'sm' ? 'caption' : 'label'}
        weight="medium"
        style={{ color: variantStyles[variant].text }}
      >
        {label}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
