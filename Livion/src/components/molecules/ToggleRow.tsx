/**
 * ToggleRow - Reusable toggle switch row component
 * Used for settings, consent screens, and preferences
 */

import React from 'react';
import { StyleSheet, Switch, View, ViewStyle, StyleProp } from 'react-native';
import { ThemedText } from '../atoms/ThemedText';
import { COLORS, Spacing, GlassStyles } from '@/src/constants/Colors';

export type ToggleRowProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  /** Smaller variant for nested toggles */
  small?: boolean;
  /** Center the label text */
  centerText?: boolean;
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
};

export const ToggleRow: React.FC<ToggleRowProps> = ({
  label,
  value,
  onValueChange,
  small = false,
  centerText = false,
  style,
}) => {
  return (
    <View style={[styles.toggleRow, small && styles.smallToggleRow, style]}>
      <ThemedText
        variant="body"
        style={[
          styles.toggleLabel,
          small && styles.smallToggleLabel,
          { textAlign: centerText ? 'center' : 'left' },
        ]}
      >
        {label}
      </ThemedText>

      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? COLORS.teal : COLORS.switchThumbOff}
        trackColor={{ true: COLORS.tealLight, false: COLORS.switchTrackOff }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: GlassStyles.cardSubtle.backgroundColor,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GlassStyles.cardSubtle.borderColor,
  },
  smallToggleRow: {
    paddingLeft: Spacing.lg,
  },
  toggleLabel: {
    flex: 1,
    marginRight: Spacing.md,
    color: COLORS.textPrimary,
  },
  smallToggleLabel: {
    fontSize: 14,
  },
});
