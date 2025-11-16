import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { CareTaskTile } from '../../../components/molecules/CareTaskTile';
import { BorderRadius, Spacing } from '../../../constants/Colors';
import { useMockData } from '../../../hooks/useMockData';

const { width: SCREEN_W } = Dimensions.get('window');

// ----------------------------------------------------
// Componentă GlowyCard Reutilizată (preluată din HomeGlossyAnimated)
// ----------------------------------------------------
function GlowyCard({ children, compact = false }: any) {
  // Păstrăm animația de apăsare pentru un stil consistent
  const pressScale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(pressScale, { toValue: 0.985, useNativeDriver: true, speed: 30 }).start();
  };
  const onPressOut = () => {
    Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start();
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} style={{ marginVertical: Spacing.sm }}>
      <Animated.View style={[styles.card, compact && styles.cardCompact, { transform: [{ scale: pressScale }] }]}>
        {/* Glow overlay (white accent) */}
        <View style={styles.cardGlow} pointerEvents="none" />
        <View style={styles.cardContent}>{children}</View>
      </Animated.View>
    </Pressable>
  );
}
// ----------------------------------------------------


export default function CarePlanScreen() {
  // Lăsăm useRouter deși nu e folosit direct aici, pentru consistență
  // const router = useRouter(); 
  const { patientData } = useMockData();
  
  // (Am eliminat animațiile de intrare deoarece sunt specifice ecranului Home)

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* background ombré + soft glow layers (din HomeGlossyAnimated) */}
      <LinearGradient
        colors={["#07203f", "#04363a", "#06233d"]}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* subtle radial glows (pure view overlays) (din HomeGlossyAnimated) */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />
      
      {/* SafeAreaView și ScrollView sunt mutate înăuntru */}
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          
          {/* Header */}
          <ThemedText variant="display" weight="bold" style={styles.header}>
            Care Plan
          </ThemedText>

          {/* Active Tasks Section */}
          <View style={styles.section}>
            <ThemedText variant="heading" weight="semibold" style={styles.sectionTitle}>
              Active Tasks
            </ThemedText>
            {patientData.careTasks.map((task) => (
              <GlowyCard key={task.id}> 
                {/* Folosim CareTaskTile INSAIDUL GlowyCard pentru stilul "glossy" */}
                <CareTaskTile
                  title={task.title}
                  description={task.description}
                  dueDate={task.dueDate}
                  status={task.status}
                  // Trebuie să ne asigurăm că CareTaskTile primește stilul corect
                />
              </GlowyCard>
            ))}
          </View>

          {/* Clinical Notes Section */}
          <View style={styles.section}>
            <ThemedText variant="heading" weight="semibold" style={styles.sectionTitle}>
              Clinical Notes
            </ThemedText>
            {/* Folosim GlowyCard în locul noteCard pentru a menține stilul */}
            <GlowyCard>
              <ThemedText variant="body" color="secondary">
                Last reviewed by Dr. Harper on Oct 04, 2025. Continue daily monitoring and weekly check-ins. Adjustment to medication scheduled in next visit.
              </ThemedText>
            </GlowyCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}


const styles = StyleSheet.create({
  // ROOT Styles (preluate din HomeGlossyAnimated)
  root: {
    flex: 1,
    backgroundColor: '#041025', // Suprapus de LinearGradient, dar e bine să îl păstrăm
    // Padding-ul de sus este asigurat de Statusbar și SafeAreaView
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent', // IMPORTANT: Trebuie să fie transparent pentru a vedea LinearGradient
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },
  container: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg, // Ajustat puțin
    paddingBottom: Spacing['3xl'] + 60, // Mărim padding-ul de jos pentru a face loc navbar-ului fix
  },
  header: {
    color: '#fff', // Culoarea textului (din HomeGlossyAnimated)
    fontSize: 42,
    lineHeight: 48,
    marginBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing['2xl'],
  },
  sectionTitle: {
    color: '#fff',
    marginBottom: Spacing.md,
  },
  
  // Card Styles (preluate din HomeGlossyAnimated, adaptate pentru GlowyCard)
  card: {
    backgroundColor: 'rgba(10,25,40,0.55)',
    borderRadius: BorderRadius.xl || 16,
    padding: Spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    ...Platform.select({
      ios: { shadowColor: '#a7f3d0', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 18 },
      android: { elevation: 6 },
    }),
  },
  cardCompact: {
    paddingVertical: 12,
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl || 16,
    backgroundColor: 'rgba(245, 158, 11, )',
    borderTopWidth: 1.2,
    borderLeftWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  cardContent: {
    position: 'relative',
    zIndex: 2,
  },

  // Glows (preluate din HomeGlossyAnimated)
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