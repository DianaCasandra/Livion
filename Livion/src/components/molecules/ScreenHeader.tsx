import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '../atoms/ThemedText';
import { COLORS, Spacing } from '@/src/constants/Colors';

export type ScreenHeaderProps = {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  style?: ViewStyle;
};

/**
 * ScreenHeader Component
 * Header with proper safe area insets, optional back button and title
 * Used across onboarding and other screens that need navigation
 */
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  showBackButton = true,
  onBackPress,
  rightElement,
  style,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        styles.header,
        { paddingTop: insets.top + Spacing.sm },
        style,
      ]}
    >
      <View style={styles.headerContent}>
        {showBackButton ? (
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        {title && (
          <ThemedText variant="subtitle" weight="semibold" style={styles.title}>
            {title}
          </ThemedText>
        )}

        {rightElement ? (
          <View style={styles.rightElement}>{rightElement}</View>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
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
  title: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 44,
    height: 44,
  },
  rightElement: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
