/**
 * usePressScale - Hook for animated press feedback
 * Provides scale animation handlers for pressable elements
 */

import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export type UsePressScaleOptions = {
  /** Scale value when pressed (0-1) */
  targetScale?: number;
  /** Animation speed */
  speed?: number;
  /** Use native driver for better performance */
  useNativeDriver?: boolean;
};

export type UsePressScaleReturn = {
  /** Animated scale value */
  scale: Animated.Value;
  /** Handler for press in */
  handlePressIn: () => void;
  /** Handler for press out */
  handlePressOut: () => void;
  /** Style object with transform */
  animatedStyle: { transform: { scale: Animated.Value }[] };
};

export const usePressScale = (
  options: UsePressScaleOptions = {}
): UsePressScaleReturn => {
  const {
    targetScale = 0.97,
    speed = 50,
    useNativeDriver = true,
  } = options;

  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: targetScale,
      useNativeDriver,
      speed,
    }).start();
  }, [targetScale, speed, useNativeDriver]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver,
      speed,
    }).start();
  }, [speed, useNativeDriver]);

  const animatedStyle = {
    transform: [{ scale }],
  };

  return {
    scale,
    handlePressIn,
    handlePressOut,
    animatedStyle,
  };
};
