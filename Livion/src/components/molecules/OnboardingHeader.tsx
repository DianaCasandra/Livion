/**
 * OnboardingHeader - Reusable header for onboarding screens
 * Contains the back button with consistent styling
 */

import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { BackButton, BackButtonProps } from '../atoms/BackButton';
import { Spacing } from '@/src/constants/Colors';

export type OnboardingHeaderProps = {
  /** Custom back button props */
  backButtonProps?: Partial<BackButtonProps>;
  /** Right side content (optional) */
  rightContent?: React.ReactNode;
  /** Additional styles for the header container */
  style?: StyleProp<ViewStyle>;
};

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  backButtonProps,
  rightContent,
  style,
}) => {
  return (
    <View style={[styles.header, style]}>
      <BackButton {...backButtonProps} />
      {rightContent && <View style={styles.rightContent}>{rightContent}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xs,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
