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

export default function CarePlanAuthoringScreen() {
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
            Author Care Plan
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.subheader}>
            Draft updates before sharing with the patient.
          </ThemedText>

          {/* Card: Formularul principal (învelit în GlowyCard) */}
          <GlowyCard>
            <InputField label="Care Plan Title" placeholder="e.g. Glucose Stabilization" style={styles.input} />
            <InputField
              label="Goals"
              placeholder="Improve fasting glucose to 110 mg/dL within 6 weeks."
              multiline
              style={styles.input}
            />
            <InputField
              label="Daily Tasks"
              placeholder="1. Morning glucose check
2. 30 min light activity
3. Evening medication review"
              multiline
              style={styles.input}
            />
            <InputField
              label="Notes for Care Team"
              placeholder="Add any context or follow-up steps for next visit."
              multiline
              style={styles.input}
            />
            <Button variant="primary" fullWidth style={styles.button}>
              Save Draft
            </Button>
            <Button variant="outline" fullWidth style={styles.button}>
              Share with Patient
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
  input: {
    marginTop: Spacing.md,
    
  },
  button: {
    marginTop: Spacing.md,
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