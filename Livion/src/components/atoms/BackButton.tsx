import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, Spacing } from '@/src/constants/Colors';

export type BackButtonProps = {
  onPress?: () => void;
  style?: ViewStyle;
  iconColor?: string;
  iconSize?: number;
};

/**
 * BackButton Component
 * Glassmorphic back button used across onboarding and other screens
 */
export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  style,
  iconColor = COLORS.textPrimary,
  iconSize = 28,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.backButton, style]}>
      <Ionicons name="chevron-back" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
