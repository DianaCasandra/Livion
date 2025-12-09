/**
 * AnimatedBlobBackground - Reusable animated background blobs
 * Used across onboarding and other screens for visual interest
 */

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from '@/src/constants/Colors';

export type BlobConfig = {
  color: string;
  size: number;
  position: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  opacity: number;
  translateXRange?: [number, number];
  translateYRange?: [number, number];
};

export type AnimatedBlobBackgroundProps = {
  /** Duration of one animation cycle in ms */
  duration?: number;
  /** Delay before second blob starts animating */
  secondBlobDelay?: number;
  /** Custom blob configurations (overrides defaults) */
  blobs?: [BlobConfig, BlobConfig];
  /** Additional style for the container */
  style?: ViewStyle;
};

const DEFAULT_BLOBS: [BlobConfig, BlobConfig] = [
  {
    color: COLORS.teal,
    size: 400,
    position: { right: -120, top: -80 },
    opacity: 0.12,
    translateXRange: [-40, 40],
    translateYRange: [-20, 20],
  },
  {
    color: COLORS.amber,
    size: 450,
    position: { left: -180, bottom: -100 },
    opacity: 0.10,
    translateXRange: [30, -30],
    translateYRange: [40, -40],
  },
];

export const AnimatedBlobBackground: React.FC<AnimatedBlobBackgroundProps> = ({
  duration = 8000,
  secondBlobDelay = 1500,
  blobs = DEFAULT_BLOBS,
  style,
}) => {
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopAnimation = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    loopAnimation(anim1, 0);
    loopAnimation(anim2, secondBlobDelay);
  }, [duration, secondBlobDelay]);

  const getAnimatedStyle = (
    anim: Animated.Value,
    config: BlobConfig
  ): Animated.WithAnimatedObject<ViewStyle> => {
    const { translateXRange = [-40, 40], translateYRange = [-20, 20] } = config;

    return {
      transform: [
        {
          translateX: anim.interpolate({
            inputRange: [0, 1],
            outputRange: translateXRange,
          }),
        },
        {
          translateY: anim.interpolate({
            inputRange: [0, 1],
            outputRange: translateYRange,
          }),
        },
      ],
    };
  };

  const getBlobStyle = (config: BlobConfig): ViewStyle => ({
    position: 'absolute',
    width: config.size,
    height: config.size,
    borderRadius: 9999,
    backgroundColor: config.color,
    opacity: config.opacity,
    ...config.position,
  });

  return (
    <View style={[styles.container, style]} pointerEvents="none">
      <Animated.View
        style={[getBlobStyle(blobs[0]), getAnimatedStyle(anim1, blobs[0])]}
      />
      <Animated.View
        style={[getBlobStyle(blobs[1]), getAnimatedStyle(anim2, blobs[1])]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
});
