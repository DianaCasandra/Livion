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
import { MessageBubble } from '../../../components/molecules/MessageBubble';
import { BorderRadius, Spacing } from '../../../constants/Colors';

// ----------------------------------------------------
// Componentă GlowyCard Reutilizată (Preluată din stilul Glossy)
// ----------------------------------------------------
function GlowyCard({ children, onPress = () => {}, compact = false }: any) {
    const pressScale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(pressScale, { toValue: 0.985, useNativeDriver: true, speed: 30 }).start();
    };
    const onPressOut = () => {
        Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start();
    };

    return (
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress} disabled={!onPress}>
            <Animated.View style={[
                styles.cardBase, 
                compact && styles.cardCompact,
                { transform: [{ scale: pressScale }] }
            ]}>
                {/* Glow overlay (white accent line) */}
                <View style={styles.cardGlow} pointerEvents="none" />
                <View style={styles.cardContent}>{children}</View>
            </Animated.View>
        </Pressable>
    );
}
// ----------------------------------------------------

export default function ClinicianMessagesScreen() {
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
            Care Team Messages
          </ThemedText>
          <ThemedText variant="caption" color="tertiary" style={styles.subheader}>
            Secure channel between clinicians and patients.
          </ThemedText>

          {/* Firul de Mesaje (învelit în GlowyCard) */}
          <GlowyCard>
            <View style={styles.threadContent}>
              <MessageBubble
                message="Jane reported increased fatigue this morning."
                sender="clinician"
                senderName="Nurse Lee"
                timestamp={new Date()}
              />
              <MessageBubble
                message="Thanks, scheduling a check-in call at 3 PM."
                sender="clinician"
                senderName="Dr. Harper"
                timestamp={new Date()}
              />
              <MessageBubble
                message="System alert: new CGM data available."
                sender="system"
                timestamp={new Date()}
              />
            </View>
          </GlowyCard>

          {/* Zona de Compunere Mesaj (învelită în GlowyCard compact) */}
          <GlowyCard compact>
            <View style={styles.composerContent}>
              <InputField placeholder="Compose message..." multiline style={styles.input} />
              <Button variant="primary" fullWidth>
                Send Message
              </Button>
            </View>
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
    marginBottom: Spacing.xs,
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
    // shadow
    ...Platform.select({
      ios: { shadowColor: '#a7f3d0', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 18 },
      android: { elevation: 6 },
    }),
    marginBottom: Spacing.lg, // Adăugăm un spațiu sub fiecare card
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl || 16,
    backgroundColor: 'transparent',
    borderTopWidth: 1.2,
    borderLeftWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  cardContent: {
    position: 'relative',
    zIndex: 2,
  },
  cardCompact: {
    borderRadius: BorderRadius.lg, // Facem cardul compozitor puțin mai mic
  },

  // STILURI SPECIFICE
  threadContent: {
    gap: Spacing.md, // Spațiu între MessageBubble-uri
  },
  composerContent: {
    // Conținutul din compozitor
  },
  input: {
    marginBottom: Spacing.md,
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