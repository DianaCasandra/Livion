import React, { useRef } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, Spacing } from '@/src/constants/Colors';

export type GlassCardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  highlight?: 'teal' | 'amber';
  animated?: boolean;
};

/**
 * GlassCard Component
 * Glassmorphic card with optional press animation and color highlights
 * Used across onboarding and dashboard screens
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  onPress,
  highlight,
  animated = true,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    if (!onPress || !animated) return;
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const onPressOut = () => {
    if (!onPress || !animated) return;
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const cardContent = (
    <Animated.View
      style={[
        styles.card,
        highlight === 'teal' && styles.cardTealHighlight,
        highlight === 'amber' && styles.cardAmberHighlight,
        animated && onPress && { transform: [{ scale }] },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
      >
        {cardContent}
      </Pressable>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius: 24,
    padding: Spacing.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 24,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardTealHighlight: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.teal,
    backgroundColor: 'rgba(3, 208, 197, 0.08)',
  },
  cardAmberHighlight: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.amber,
    backgroundColor: 'rgba(255, 110, 30, 0.06)',
  },
});
