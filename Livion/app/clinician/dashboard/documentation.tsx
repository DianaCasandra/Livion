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
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress} style={{ marginBottom: Spacing['2xl'] }}>
            <Animated.View style={[styles.cardBase, { transform: [{ scale: pressScale }] }]}>
                {/* Glow overlay (white accent line) */}
                <View style={styles.cardGlow} pointerEvents="none" />
                <View style={styles.cardContent}>{children}</View>
            </Animated.View>
        </Pressable>
    );
}
// ----------------------------------------------------

export default function DocumentationScreen() {
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
            Clinical Documentation
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.subheader}>
            Record visit notes and plan updates.
          </ThemedText>

          {/* Card 1: Visit Summary Draft (învelit în GlowyCard) */}
          <GlowyCard>
            <ThemedText variant="subtitle" weight="semibold" style={styles.sectionTitle}>
              Visit Summary Draft
            </ThemedText>
            <ThemedText variant="body" color="secondary" style={styles.body}>
              Oct 07, 2025 · Telehealth visit
            </ThemedText>
            <ThemedText variant="body" color="secondary" style={styles.body}>
              Assessment: Glucose trends improving, continue current regimen.
            </ThemedText>
            <ThemedText variant="body" color="secondary" style={styles.body}>
              Plan: Reassess in two weeks, monitor dietary journaling.
            </ThemedText>
            <Button variant="primary" fullWidth style={styles.button}>
              Save to EHR
            </Button>
          </GlowyCard>

          {/* Card 2: Shared Notes (învelit în GlowyCard) */}
          <GlowyCard>
            <ThemedText variant="subtitle" weight="semibold" style={styles.sectionTitle}>
              Shared Notes
            </ThemedText>
            <ThemedText variant="body" color="secondary" style={styles.body}>
              Next care conference scheduled for Oct 10. Prepare data visualizations and update care plan for review.
            </ThemedText>
            <Button variant="outline" fullWidth style={styles.button}>
              Download PDF
            </Button>
          </GlowyCard>

          {/* Padding pentru a preveni suprapunerea Navbar-ului fix (dacă este cazul) */}
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
    paddingBottom: Spacing.lg, 
  },
  header: {
    marginBottom: Spacing.sm,
    color: '#fff', // Textul headerului alb pentru contrast
    fontSize: 42,
    lineHeight: 48,
  },
  subheader: {
    marginBottom: Spacing.xl,
  },
  
  // Componente Glossy/Glassy Card (GlowyCard - Stil de bază pentru formă)
  cardBase: {
    backgroundColor: 'rgba(30, 27, 75, 0.4)', // Card de sticlă semitransparent
    borderRadius: BorderRadius.xl || 16,
    padding: Spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    // shadow
    ...Platform.select({
      ios: { shadowColor: '#a7f3d0', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 18 },
      android: { elevation: 6 },
    }),
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl || 16,
    backgroundColor: 'rgba(30, 27, 75, 0.4)', // Tonuri de Indigo și Teal
    borderTopWidth: 1.2,
    borderLeftWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  cardContent: {
    position: 'relative',
    zIndex: 2,
  },
  
  // STILURI SPECIFICE
  sectionTitle: {
    marginBottom: Spacing.sm,
    color: '#fff', // Titlurile din card sunt albe
  },
  body: {
    marginBottom: Spacing.sm,
  },
  button: {
    marginTop: Spacing.lg,
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