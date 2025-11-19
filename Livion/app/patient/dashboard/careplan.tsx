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
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';
import { useMockData } from '../../../hooks/useMockData';

const { width: SCREEN_W } = Dimensions.get('window');

// ------------------------------------------------------------------
// Reusable GlowyCard with smoother shadows + Patient-style glow
// ------------------------------------------------------------------
function GlowyCard({ children, compact = false }: any) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 0.985,
      useNativeDriver: true,
      speed: 30,
    }).start();

  const onPressOut = () =>
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
    }).start();

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          styles.card,
          compact && styles.cardCompact,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.cardGlow} pointerEvents="none" />
        <View style={styles.cardContent}>{children}</View>
      </Animated.View>
    </Pressable>
  );
}

// ------------------------------------------------------------------
// CarePlan Screen
// ------------------------------------------------------------------
export default function CarePlanScreen() {
  const { patientData } = useMockData();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background gradient – matched to patient file */}
      <LinearGradient
        colors={['#050816', '#031824', '#031b2e']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* Soft glows – updated to match patient page */}
      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          {/* Header with same spacing + typography tone */}
          <ThemedText
            variant="display"
            weight="bold"
            style={[styles.header, { fontSize: 30, lineHeight: 36 }]}
          >
            Care Plan
          </ThemedText>

          {/* Active Tasks */}
          <View style={styles.section}>
            <ThemedText
              variant="heading"
              weight="semibold"
              style={[styles.sectionTitle, { fontSize: 18 }]}
            >
              Active Tasks
            </ThemedText>

            {patientData.careTasks.map((task) => (
              <GlowyCard key={task.id} compact>
                <CareTaskTile
                  title={task.title}
                  description={task.description}
                  dueDate={task.dueDate}
                  status={task.status}
                  style={{
                    backgroundColor: 'transparent',
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    borderWidth: 0,
                    marginVertical: 4,
                  }}
                />
              </GlowyCard>
            ))}
          </View>

          {/* Clinical Notes */}
          <View style={styles.section}>
            <ThemedText
              variant="heading"
              weight="semibold"
              style={[styles.sectionTitle, { fontSize: 18 }]}
            >
              Clinical Notes
            </ThemedText>

            <GlowyCard compact>
              <ThemedText variant="body" color="secondary" style={{ fontSize: 13, lineHeight: 19 }}>
                Last reviewed by Dr. Harper on Oct 04, 2025.
                Continue daily monitoring and weekly check-ins.
                Medication adjustment scheduled for next visit.
              </ThemedText>
            </GlowyCard>
          </View>

          <View style={{ height: 140 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },

  header: {
    color: '#fff',
    marginBottom: Spacing.lg,
  },

  section: {
    marginBottom: Spacing['2xl'],
  },

  sectionTitle: {
    color: '#fff',
    marginBottom: Spacing.md,
  },

  card: {
    backgroundColor: 'rgba(15,23,42,0.74)',
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.35)',
    marginBottom: Spacing.md,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 22,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  cardCompact: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
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

  glowTopRight: {
    position: 'absolute',
    width: 420,
    height: 420,
    right: -160,
    top: -80,
    borderRadius: 999,
    backgroundColor: Colors.primary.indigo,
    opacity: 0.12,
  },

  glowBottomLeft: {
    position: 'absolute',
    width: 520,
    height: 520,
    left: -220,
    bottom: -160,
    borderRadius: 999,
    backgroundColor: Colors.primary.teal,
    opacity: 0.08,
  },
});
