import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/Colors';

export type AnimatedBlobBackgroundProps = {
  tealOpacity?: number;
  amberOpacity?: number;
};

/**
 * AnimatedBlobBackground Component
 * Floating teal and amber blobs used as decorative background across onboarding screens
 */
export const AnimatedBlobBackground: React.FC<AnimatedBlobBackgroundProps> = ({
  tealOpacity = 0.12,
  amberOpacity = 0.10,
}) => {
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopAnimation = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 8000,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 8000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    loopAnimation(anim1, 0);
    loopAnimation(anim2, 1500);
  }, [anim1, anim2]);

  const blob1Style = {
    transform: [
      {
        translateX: anim1.interpolate({
          inputRange: [0, 1],
          outputRange: [-40, 40],
        }),
      },
      {
        translateY: anim1.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, 20],
        }),
      },
    ],
  };

  const blob2Style = {
    transform: [
      {
        translateX: anim2.interpolate({
          inputRange: [0, 1],
          outputRange: [30, -30],
        }),
      },
      {
        translateY: anim2.interpolate({
          inputRange: [0, 1],
          outputRange: [40, -40],
        }),
      },
    ],
  };

  return (
    <>
      <Animated.View
        style={[styles.blobTeal, { opacity: tealOpacity }, blob1Style]}
      />
      <Animated.View
        style={[styles.blobAmber, { opacity: amberOpacity }, blob2Style]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  blobTeal: {
    position: 'absolute',
    width: 400,
    height: 400,
    right: -120,
    top: -80,
    borderRadius: 999,
    backgroundColor: COLORS.teal,
  },
  blobAmber: {
    position: 'absolute',
    width: 450,
    height: 450,
    left: -180,
    bottom: -100,
    borderRadius: 999,
    backgroundColor: COLORS.amber,
  },
});
