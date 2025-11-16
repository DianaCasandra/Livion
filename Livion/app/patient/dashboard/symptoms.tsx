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
import { BorderRadius, Spacing } from '../../../constants/Colors';

// ----------------------------------------------------
// Componentă GlowyCard Reutilizată (Preluată din stilul Glossy)
// ----------------------------------------------------
function GlowyCard({ children, onPress = () => {} }: any) {
    const pressScale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(pressScale, { toValue: 0.985, useNativeDriver: true, speed: 30 }).start();
    };
    const onPressOut = () => {
        Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start();
    };

    return (
        // Folosim stilul styles.cardBase de la final
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
            <Animated.View style={[styles.cardBase, { transform: [{ scale: pressScale }] }]}>
                {/* Glow overlay (white accent line) */}
                <View style={styles.cardGlow} pointerEvents="none" />
                <View style={styles.cardContent}>{children}</View>
            </Animated.View>
        </Pressable>
    );
}
// ----------------------------------------------------

export default function SymptomsScreen() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* 1. Background Gradient (Stardust) */}
      <LinearGradient
        colors={["#07203f", "#04363a", "#06233d"]} // Tonuri de Indigo și Teal
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* 2. Subtle Radial Glows */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          <ThemedText variant="display" weight="bold" style={styles.header}>
            Symptom Log
          </ThemedText>

          {/* Card: Today's Check-In (învelit în GlowyCard) */}
          <GlowyCard>
            <ThemedText variant="subtitle" weight="semibold" style={styles.cardTitle}>
              Today's Check-In
            </ThemedText>
            {/* Presupunem că InputField și ThemedText sunt stilate pentru fundal întunecat */}
            <InputField label="How are you feeling today?" placeholder="Describe your symptoms..." multiline style={styles.input} />
            <InputField label="Pain level (1-10)" placeholder="e.g. 4" keyboardType="numeric" style={styles.input} />
            <InputField label="Notes" placeholder="Anything else your care team should know?" multiline style={styles.input} />
            <Button variant="primary" fullWidth style={styles.submitButton}>
              Submit Log
            </Button>
          </GlowyCard>

          {/* History Section */}
          <View style={styles.history}>
            <ThemedText variant="heading" weight="semibold" style={styles.historyHeader}>
              Recent Entries
            </ThemedText>
            
            {/* History Card (învelit în GlowyCard) */}
            <GlowyCard>
              <View style={styles.historyContent}>
                <ThemedText variant="body" color="secondary">
                  Oct 07 • Mild fatigue, slight headache. Pain level: 3/10.
                </ThemedText>
                <ThemedText variant="caption" color="tertiary" style={styles.disclaimer}>
                  This is general information, not a diagnosis.
                </ThemedText>
              </View>
            </GlowyCard>
          </View>

          {/* Padding pentru a preveni suprapunerea Navbar-ului fix */}
          <View style={{ height: Spacing['3xl'] + 60 }} /> 
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  // STILURI GLOBALE ȘI LAYOUT
  root: {
    flex: 1,
    backgroundColor: '#041025', // Fundal de rezervă
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    paddingHorizontal: Spacing.xl, // Folosim XL pentru a se potrivi cu celelalte pagini
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg, // Ajustat din cauza padding-ului final
  },
  header: {
    marginBottom: Spacing.xl,
    color: '#fff', // Textul headerului alb pentru contrast
    fontSize: 42,
    lineHeight: 48,
  },
  
  // Componente Glossy/Glassy Card (GlowyCard)
  cardBase: {
    backgroundColor: 'rgba(10,25,40,0.55)', // Card de sticlă semitransparent
    borderRadius: BorderRadius.xl || 16,
    padding: Spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: Spacing['2xl'],
    // shadow
    ...Platform.select({
      ios: { shadowColor: '#a7f3d0', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 18 },
      android: { elevation: 6 },
    }),
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl || 16,
    backgroundColor: 'rgba(30, 27, 75, 0.4)',
    borderTopWidth: 1.2,
    borderLeftWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  cardContent: {
    position: 'relative',
    zIndex: 2,
  },
  
  // STILURI SPECIFICE
  cardTitle: {
    marginBottom: Spacing.md,
    color: '#fff',
  },
  input: {
    marginTop: Spacing.md,
  },
  submitButton: {
    marginTop: Spacing.lg,
  },
  history: {
    // Înlăturăm marginTop.lg de pe history și îl adăugăm pe cardBase
  },
  historyHeader: {
    color: '#fff',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs, // Mic padding pentru aliniere
  },
  historyContent: {
    // Conținutul cardului istoric
  },
  disclaimer: {
    marginTop: Spacing.sm,
  },

  // Glows (Preluate din HomeGlossyAnimated)
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