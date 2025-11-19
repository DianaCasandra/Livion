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
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/atoms/Button';
import { InputField } from '../../components/atoms/InputField';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';
import { router } from 'expo-router';

// ----------------------------------------------------
// GlowyCard Component
// ----------------------------------------------------
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
      <Animated.View style={[styles.cardBase, { transform: [{ scale: pressScale }] }]}>
        <View style={styles.cardGlow} pointerEvents="none" />
        <View style={styles.cardContent}>{children}</View>
      </Animated.View>
    </Pressable>
  );
}

// ----------------------------------------------------

export default function CarePlanAuthoringScreen() {
  return (
    <View style={styles.root}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />

      {/* Clean ADMIN gradient */}
      <LinearGradient
        colors={['#081729', '#0A2633', '#103A48']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* Softer administrative glows */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          {/* Back button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ThemedText variant="body" style={styles.backButtonText}>
              ⪻ Back
            </ThemedText>
          </TouchableOpacity>

          {/* Header */}
          <ThemedText
            variant="display"
            weight="bold"
            align="center"
            style={styles.header}
          >
            ePrescription Portal
          </ThemedText>

          <ThemedText
            variant="body"
            color="secondary"
            align="center"
            style={styles.subheader}
          >
            Your central hub for managing and fulfilling electronic prescriptions.
          </ThemedText>

          {/* Main Form */}
          <GlowyCard>
            <InputField
              label="Prescription Title"
              placeholder="e.g. Acne treatment"
              style={styles.input}
            />

            <InputField
              label="List of medications"
              placeholder="e.g. Fucidin 30ml, Roaccutane 40mg"
              multiline
              style={styles.input}
            />

            <InputField
              label="Other specifications"
              placeholder="e.g. Fucidin every morning
3 capsules of Roaccutane each day (every 8 hours)"
              multiline
              style={styles.input}
            />

            <InputField
              label="Specify the Patient"
              placeholder="e.g. Jane Doe"
              style={styles.input}
            />

            <Button variant="primary" fullWidth style={styles.button}>
              Save Draft
            </Button>

            <Button variant="outline" fullWidth style={styles.button}>
              Share with Patient
            </Button>
          </GlowyCard>

          <View style={{ height: Spacing['3xl'] + 60 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ----------------------------------------------------

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#08121E',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },

  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  container: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },

  backButton: {
    paddingVertical: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },

  backButtonText: {
    fontSize: 16,
    marginTop: -40,
    color: Colors.primary.teal,
    opacity: 0.9,
  },

  header: {
    marginBottom: Spacing.xs,
    color: '#fff',
    fontSize: 34,
    lineHeight: 40,
  },

  subheader: {
    marginBottom: Spacing.xl,
    maxWidth: '90%',
    alignSelf: 'center',
    fontSize: 14,
    lineHeight: 20,
  },

  // Card aesthetic
  cardBase: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 18,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  cardContent: {
    position: 'relative',
    zIndex: 2,
  },

  input: {
    marginTop: Spacing.md,
  },

  button: {
    marginTop: Spacing.md,
  },

  // Softer admin glows
  glowTopRight: {
    position: 'absolute',
    width: 380,
    height: 380,
    right: -140,
    top: -90,
    borderRadius: 999,
    backgroundColor: '#1e3a5f',
    opacity: 0.07,
  },

  glowBottomLeft: {
    position: 'absolute',
    width: 500,
    height: 500,
    left: -200,
    bottom: -150,
    borderRadius: 999,
    backgroundColor: '#0f766e',
    opacity: 0.06,
  },
});
