/**
 * WelcomeBlob - Animated breathing blob for welcome screen
 * Shows health status with pulsing animation
 */

import { Heart } from 'lucide-react-native';
import React, { useRef, useEffect } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { ThemedText } from '../atoms/ThemedText';
import { COLORS } from '@/src/constants/Colors';

type WelcomeBlobProps = {
  onPress: () => void;
  healthStatus: string;
  greeting: string;
  userName: string;
  tapHint?: string;
};

export function WelcomeBlob({ onPress, healthStatus, greeting, userName, tapHint = 'Tap to see your details' }: WelcomeBlobProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scalePress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Breathing/pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 8,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scalePress, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scalePress, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Greeting */}
      <View style={styles.header}>
        <ThemedText style={styles.greeting}>{greeting}</ThemedText>
        <ThemedText style={styles.name}>{userName}</ThemedText>
      </View>

      {/* Blob */}
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.blobPressable}
      >
        {/* Outer glow */}
        <Animated.View
          style={[
            styles.blobGlow,
            {
              opacity: glowAnim,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />

        {/* Main blob */}
        <Animated.View
          style={[
            styles.blob,
            {
              transform: [
                { scale: Animated.multiply(pulseAnim, scalePress) },
                { translateY: floatAnim },
              ],
            },
          ]}
        >
          {/* Inner gradient effect */}
          <View style={styles.blobInner}>
            <Heart size={48} color="rgba(255, 255, 255, 0.9)" />
          </View>
        </Animated.View>
      </Pressable>

      {/* Health Status Message */}
      <View style={styles.messageContainer}>
        <ThemedText style={styles.healthMessage}>{healthStatus}</ThemedText>
        <ThemedText style={styles.tapHint}>{tapHint}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  greeting: {
    fontSize: 18,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  name: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 4,
    lineHeight: 44,
  },
  blobPressable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 220,
  },
  blobGlow: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: COLORS.teal,
  },
  blob: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.teal,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.teal,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 30,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  blobInner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  healthMessage: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 32,
  },
  tapHint: {
    fontSize: 15,
    color: COLORS.textTertiary,
    marginTop: 12,
  },
});
