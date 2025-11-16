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
import { CareTaskTile } from '../../../components/molecules/CareTaskTile';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';
import { useMockData } from '../../../hooks/useMockData';
import { router } from 'expo-router';

// ----------------------------------------------------
// Componentă GlowyCard Reutilizată (Preluată din stilul Glossy)
// ----------------------------------------------------
function GlowyCard({ children, onPress = () => {}, compact = false, style }: any) {
    const pressScale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(pressScale, { toValue: 0.985, useNativeDriver: true, speed: 30 }).start();
    };
    const onPressOut = () => {
        Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start();
    };

    return (
        // Am eliminat marginBottom: Spacing['2xl'] din Pressable și l-am lăsat la nivel de utilizare.
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress} disabled={!onPress} style={style}>
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

export default function ClinicianDashboard() {
  const { patientData } = useMockData();

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

          {/* Back Button */}
                  <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <ThemedText variant="body" color="teal" style={styles.backButtonText}>
                      ⪻ Back
                    </ThemedText>
                  </Pressable>
          
          <ThemedText variant="display" weight="bold" style={styles.header}>
            Clinician Dashboard
          </ThemedText>
          <ThemedText variant="subtitle" color="secondary" style={styles.subtitle}>
            Today's alerts and patient insights
          </ThemedText>

          {/* Stat Grid */}
          <View style={styles.statGrid}>
            <GlowyCard style={{ flex: 1 }}>
              <View style={styles.statContent}>
                <ThemedText variant="heading" weight="bold" style={styles.statValue}>
                  14
                </ThemedText>
                <ThemedText variant="body" color="secondary">
                  Patients monitored
                </ThemedText>
              </View>
            </GlowyCard>
            
            <GlowyCard style={{ flex: 1 }}>
              <View style={styles.statContent}>
                {/* Am adăugat culoarea albă pe gold aici pentru a menține contrastul bun pe fundalul dark glossy */}
                <ThemedText variant="heading" weight="bold" style={[styles.statValue, { color: '#ffb700' }]}> 
                  3
                </ThemedText>
                <ThemedText variant="body" color="secondary">
                  Urgent reviews
                </ThemedText>
              </View>
            </GlowyCard>
          </View>

          {/* Priority Overview Section */}
          <View style={styles.section}>
            <ThemedText variant="heading" weight="semibold" style={styles.sectionTitle}>
              Priority Overview
            </ThemedText>
            {patientData.insights.map((insight) => (
              <GlowyCard key={insight.id}>
                <ThemedText variant="subtitle" weight="semibold" style={styles.insightTitle}>
                  {insight.title}
                </ThemedText>
                <ThemedText variant="body" color="secondary" style={styles.insightBody}>
                  {insight.reason}
                </ThemedText>
<Button
  variant="secondary"
  size="sm"
  style={{ ...styles.reviewButton, backgroundColor: 'rgba(57, 73, 171, 0.5)', borderColor: '#3949AB' }}
>
  Review patient
</Button>

              </GlowyCard>
            ))}
          </View>

          {/* Care Tasks Section */}
          <View style={styles.section}>
            <ThemedText variant="heading" weight="semibold" style={styles.sectionTitle}>
              Care Tasks Requiring Follow-Up
            </ThemedText>
            {patientData.careTasks
              .filter((task) => task.status !== 'completed')
              .map((task) => (
                <GlowyCard key={task.id} onPress={() => console.log('Task pressed:', task.id)}>
                  {/* Presupunem că CareTaskTile este făcut să se integreze pe fundal transparent */}
                  <CareTaskTile
                    title={task.title}
                    description={task.description}
                    dueDate={task.dueDate}
                    status={task.status}
                    style={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0 }}
                  />
                </GlowyCard>
              ))}
          </View>
          
          {/* Padding */}
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
    paddingHorizontal: Spacing.xl, // Consistență cu celelalte pagini
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg, 
  },
  header: {
    marginBottom: Spacing.sm,
    color: '#fff',
    fontSize: 42,
    lineHeight: 48,
  },
  subtitle: {
    marginBottom: Spacing.xl,
  },
  backButton: {
      alignSelf: 'flex-start',
      marginBottom: Spacing.lg,
    },
    backButtonText: {
      fontSize: 18,
      color: Colors.primary.teal,
    },
  
  // STAT GRID
  statGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing['2xl'],
  },
  statContent: {
    // Conținutul cardului de statistică
  },
  statValue: {
    color: '#fff',
  },

  // CARD BASE (GlowyCard component style)
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
    padding: Spacing.md,
  },
  
  // SECȚIUNI
  section: {
    marginBottom: Spacing['2xl'],
  },
  sectionTitle: {
    color: '#fff',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  
  // INSIGHT CARD
  insightTitle: {
    color: '#fff',
  },
  insightBody: {
    marginVertical: Spacing.sm,
  },
  reviewButton: {
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
  },
  
  // GLOWS (Preluate din HomeGlossyAnimated)
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