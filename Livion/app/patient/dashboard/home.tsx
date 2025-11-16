import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Activity, Heart, Sparkles } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { BorderRadius, Spacing, Colors } from '../../../constants/Colors';

const { width: SCREEN_W } = Dimensions.get('window');

export default function HomeGlossyAnimated() {
  const router = useRouter();

  // Entrance animations
  const titleY = useRef(new Animated.Value(18)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const cardsOffset = useRef(new Animated.Value(22)).current;
  const cardsOpacity = useRef(new Animated.Value(0)).current;

  // Pulse for badge
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleY, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(titleOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(cardsOffset, { toValue: 0, duration: 380, useNativeDriver: true }),
        Animated.timing(cardsOpacity, { toValue: 1, duration: 380, useNativeDriver: true }),
      ]),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar hidden />

      {/* Background Gradient */}
      <LinearGradient
        colors={["#07203f", "#04363a", "#06233d"]}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* Glow Overlays */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        {/* Back Button */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ThemedText variant="body" color="teal" style={styles.backButtonText}>
            ⪻ Back
          </ThemedText>
        </Pressable>

        {/* Header */}
        <Animated.View style={[styles.headerBlock, { opacity: titleOpacity, transform: [{ translateY: titleY }] }]}>
          <ThemedText variant="caption" style={styles.kicker}>DAILY PULSE</ThemedText>
          <ThemedText variant="display" weight="bold" style={styles.title}>Welcome back, Avery</ThemedText>
        </Animated.View>

        {/* Cards */}
        <Animated.View style={[styles.cardsBlock, { opacity: cardsOpacity, transform: [{ translateY: cardsOffset }] }]}>

          {/* Top status card */}
          <GlowyCard compact>
            <View style={styles.rowBadges}>
              <Animated.View style={[styles.pulseDot, { transform: [{ scale: pulse }] }]} />
              <ThemedText variant="body" color="secondary">2 insights this week</ThemedText>
            </View>
          </GlowyCard>

          {/* Health Reminder */}
          <GlowyCard>
            <ThemedText variant="heading" weight="bold" style={{ color: '#fff' }}>
              Health Reminder
            </ThemedText>
            <ThemedText variant="body" color="secondary" style={{ marginTop: 8 }}>
              Your care team has reviewed your recent data. Everything looks in range—keep up the great work!
            </ThemedText>
          </GlowyCard>

          {/* Insights Section */}
          <ThemedText variant="heading" weight="bold" style={styles.sectionTitle}>Insights</ThemedText>
          <ThemedText variant="body" color="secondary">AI-generated, clinician-reviewed</ThemedText>

          {/* Sample Insight */}
          <GlowyCard>
            <ThemedText variant="heading" weight="bold">Steady Respiratory Health</ThemedText>
            <ThemedText variant="body" color="secondary" style={{ marginTop: 8 }}>
              Average SpO2 stayed above 97% over the last 7 days. Keep the light breathing exercises going.
            </ThemedText>

            {/* Footer */}
            <View style={styles.cardFooter}>
              <View style={styles.pill}>
                <Activity size={16} color="white" />
                <ThemedText color="teal" style={styles.pillText}>
                  Daily Pulse
                </ThemedText>
              </View>

              <View style={styles.footerIcons}>
                <Sparkles size={20} color="#ffffffaa" />
                <Heart size={20} color="#ffffffaa" style={{ marginLeft: 16 }} />
              </View>
            </View>
          </GlowyCard>

        </Animated.View>

      </ScrollView>
    </View>
  );
}

function GlowyCard({ children, compact = false }: any) {
  const pressScale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(pressScale, { toValue: 0.985, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(pressScale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} style={{ marginVertical: Spacing.sm }}>
      <Animated.View
        style={[
          styles.card,
          compact && styles.cardCompact,
          { transform: [{ scale: pressScale }] }
        ]}
      >
        <View style={styles.cardGlow} pointerEvents="none" />
        <View style={styles.cardContent}>{children}</View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#041025',
  },

  scrollContainer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: 50,
    paddingBottom: 80,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
  },
  backButtonText: {
    fontSize: 18,
    color: Colors.primary.teal,
  },

  headerBlock: {
    marginBottom: Spacing.xl,
  },

  kicker: {
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  title: {
    color: '#fff',
    fontSize: 42,
    lineHeight: 48,
  },

  cardsBlock: {
    marginTop: 10,
  },

  // Cards
  card: {
    backgroundColor: 'rgba(10,25,40,0.55)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  cardCompact: {
    paddingVertical: 12,
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl,
    backgroundColor: 'rgba(30, 27, 75, 0.4)',
    borderTopWidth: 1.2,
    borderLeftWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.03)',
  },

  cardContent: { zIndex: 2 },

  // Badge Row
  rowBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pulseDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#10b981',
    marginRight: 8,
    shadowColor: '#10b981',
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },

  // Section title
  sectionTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    color: '#fff',
  },

  // Footer pill
  cardFooter: {
    marginTop: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(17, 24, 39, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  pillText: {
    marginLeft: 8,
    fontSize: 14,
  },

  footerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Glow overlays
  glowTopRight: {
    position: 'absolute',
    width: 400,
    height: 400,
    right: -120,
    top: -60,
    borderRadius: 999,
    backgroundColor: '#075985',
    opacity: 0.08,
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
  },
});
