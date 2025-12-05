import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Animation } from '../constants/Colors';

/**
 * useAnimations Hook
 * Common animation patterns (200-250ms timing)
 */

export const useFadeIn = (duration = Animation.duration.normal) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return fadeAnim;
};

export const useSlideIn = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance = 20,
  duration = Animation.duration.normal
) => {
  const slideAnim = useRef(new Animated.Value(distance)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  }, [slideAnim, duration]);

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return [{ translateY: slideAnim }];
      case 'down':
        return [{ translateY: Animated.multiply(slideAnim, -1) }];
      case 'left':
        return [{ translateX: slideAnim }];
      case 'right':
        return [{ translateX: Animated.multiply(slideAnim, -1) }];
      default:
        return [{ translateY: slideAnim }];
    }
  };

  return {
    opacity: slideAnim.interpolate({
      inputRange: [0, distance],
      outputRange: [1, 0],
    }),
    transform: getTransform(),
  };
};

export const useScale = (
  fromScale = 0.9,
  toScale = 1,
  duration = Animation.duration.normal
) => {
  const scaleAnim = useRef(new Animated.Value(fromScale)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: toScale,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim, toScale]);

  return scaleAnim;
};

export const usePulse = (duration = 1000) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim, duration]);

  return pulseAnim;
};
