import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

export type IconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = Colors.text.primary,
  style,
}) => {
  // Verificăm dacă numele pictogramei solicitate sugerează starea 'COMPLETED'
  const isCompletedPlaceholder = name === 'checkCircle';
  
  // Determinăm culorile pentru placeholder
  const placeholderColor = color;
  const placeholderBackgroundColor = isCompletedPlaceholder ? placeholderColor : `${placeholderColor}20`;
  const placeholderBorderWidth = isCompletedPlaceholder ? 0 : 2; // Fără chenar dacă e plin

  return (
    <View
      style={[
        styles.placeholder,
        {
          width: size,
          height: size,
          // Aplicăm culorile și stilul condițional
          backgroundColor: placeholderBackgroundColor,
          borderColor: placeholderColor,
          borderWidth: placeholderBorderWidth,
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
