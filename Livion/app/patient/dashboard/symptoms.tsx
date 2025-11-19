import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../components/atoms/Button';
import { InputField } from '../../../components/atoms/InputField';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';

// Reusable glossy card
function GlowyCard({ children, onPress = () => {} }: any) {
  const pressScale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(pressScale, {
      toValue: 0.985,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(pressScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Animated.View
        style={[styles.cardBase, { transform: [{ scale: pressScale }] }]}
      >
        <View style={styles.cardGlow} pointerEvents="none" />
        <View style={styles.cardContent}>{children}</View>
      </Animated.View>
    </Pressable>
  );
}

export default function SymptomsScreen() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={['#07203f', '#04363a', '#06233d']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Slimmer header */}
          <ThemedText
            variant="display"
            weight="bold"
            style={[styles.header, { fontSize: 32, lineHeight: 38 }]}
          >
            Symptom Log
          </ThemedText>

          {/* Today's Check-in */}
          <GlowyCard>
            <ThemedText
              variant="subtitle"
              weight="semibold"
              style={[styles.cardTitle, { fontSize: 16 }]}
            >
              Today’s Check-In
            </ThemedText>

            <InputField
              label="How are you feeling today?"
              placeholder="Describe your symptoms..."
              multiline
              style={styles.inputField}
            />

            <InputField
              label="Pain level (1–10)"
              placeholder="e.g. 4"
              keyboardType="numeric"
              style={styles.inputField}
            />

            <InputField
              label="Notes"
              placeholder="Anything else the care team should know?"
              multiline
              style={styles.inputField}
            />

            <Button variant="primary" fullWidth style={styles.submitButton}>
              Submit Log
            </Button>
          </GlowyCard>

          {/* History */}
          <View style={styles.section}>
            <ThemedText
              variant="heading"
              weight="semibold"
              style={[styles.historyHeader, { fontSize: 18 }]}
            >
              Recent Entries
            </ThemedText>

            <GlowyCard>
              <View style={styles.historyContent}>
                <ThemedText
                  variant="body"
                  color="secondary"
                  style={{ fontSize: 13, lineHeight: 18 }}
                >
                  Oct 07 • Mild fatigue and slight headache. Pain level: 3/10.
                </ThemedText>

                <ThemedText
                  variant="caption"
                  color="tertiary"
                  style={[styles.disclaimer, { fontSize: 11 }]}
                >
                  This is general information, not a diagnosis.
                </ThemedText>
              </View>
            </GlowyCard>
          </View>

          <View style={{ height: Spacing['3xl'] + 60 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#041025',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },

  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
  },

  header: {
    color: '#fff',
    marginBottom: Spacing.lg,
  },

  // Glossy card base
  cardBase: {
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 18,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },

  cardContent: {
    position: 'relative',
    zIndex: 2,
  },

  cardTitle: {
    color: '#fff',
    marginBottom: Spacing.sm,
  },

  inputField: {
    marginTop: Spacing.md,
  },

  submitButton: {
    marginTop: Spacing.lg,
  },

  section: {
    marginBottom: Spacing['2xl'],
  },

  historyHeader: {
    color: '#fff',
    marginBottom: Spacing.sm,
  },

  historyContent: {},

  disclaimer: {
    marginTop: Spacing.xs,
  },

  // Glows (you asked to keep background exactly same)
  glowTopRight: {
    position: 'absolute',
    width: 400,
    height: 400,
    right: -120,
    top: -60,
    borderRadius: 999,
    backgroundColor: '#075985',
    opacity: 0.08,
    transform: [{ scale: 1.4 }],
  },
  glowBottomLeft: {
    position: 'absolute',
    width: 500,
    height: 500,
    left: -180,
    bottom: -120,
    borderRadius: 999,
    backgroundColor: '#0ea5a4',
    opacity: 0.06,
    transform: [{ scale: 1.2 }],
  },
});
