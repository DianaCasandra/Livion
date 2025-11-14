import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

export type IconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
};

/**
 * Icon Component
 * Simple, rounded icons; no fear imagery
 * 
 * Note: In a real app, you would use a library like:
 * - @expo/vector-icons
 * - react-native-vector-icons
 * 
 * This is a placeholder implementation
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = Colors.text.primary,
  style,
}) => {
  // Placeholder: In real implementation, render actual icon
  return (
    <View
      style={[
        styles.placeholder,
        {
          width: size,
          height: size,
          backgroundColor: `${color}20`,
          borderColor: color,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  placeholder: {
    borderRadius: 999,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * Common icon names used in the app:
 * - heart: Health/wellness
 * - shield: Safety/security
 * - user: Profile/patient
 * - calendar: Scheduling
 * - clipboard: Tasks/care plan
 * - message: Messages/communication
 * - bell: Notifications
 * - settings: Settings/preferences
 * - checkCircle: Completed/success
 * - alertCircle: Warning/attention
 * - info: Information
 * - chevronRight: Navigation
 * - plus: Add/create
 * - moon: Sleep/rest
 * - sun: Energy/activity
 */
