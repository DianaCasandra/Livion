/**
 * useEntranceAnimation - Hook for fade + slide entrance animations
 * Provides consistent entrance animations across screens
 */

import { useRef, useEffect } from 'react';
import { Animated, ViewStyle } from 'react-native';

export type UseEntranceAnimationOptions = {
  /** Animation duration in ms */
  duration?: number;
  /** Initial slide distance */
  slideDistance?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Whether to auto-start the animation */
  autoStart?: boolean;
  /** Use native driver for better performance */
  useNativeDriver?: boolean;
};

export type UseEntranceAnimationReturn = {
  /** Animated fade value (0-1) */
  fadeAnim: Animated.Value;
  /** Animated slide value */
  slideAnim: Animated.Value;
  /** Combined animated style */
  animatedStyle: Animated.WithAnimatedObject<ViewStyle>;
  /** Function to manually start animation */
  startAnimation: () => void;
  /** Function to reset animation */
  resetAnimation: () => void;
};

export const useEntranceAnimation = (
  options: UseEntranceAnimationOptions = {}
): UseEntranceAnimationReturn => {
  const {
    duration = 400,
    slideDistance = 20,
    delay = 0,
    autoStart = true,
    useNativeDriver = true,
  } = options;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(slideDistance)).current;

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver,
      }),
    ]).start();
  };

  const resetAnimation = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(slideDistance);
  };

  useEffect(() => {
    if (autoStart) {
      startAnimation();
    }
  }, [autoStart]);

  const animatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    opacity: fadeAnim,
    transform: [{ translateY: slideAnim }],
  };

  return {
    fadeAnim,
    slideAnim,
    animatedStyle,
    startAnimation,
    resetAnimation,
  };
};
