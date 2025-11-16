import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Activity, Heart, Sparkles } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { BorderRadius, Spacing } from '../../../constants/Colors';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export default function HomeGlossyAnimated() {
  const router = useRouter()
  // Entrance animations
  const titleY = useRef(new Animated.Value(18)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const cardsOffset = useRef(new Animated.Value(22)).current;
  const cardsOpacity = useRef(new Animated.Value(0)).current;

  // Pulse for badge
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Staggered entrance
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

    // pulse loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* background ombré + soft glow layers */}
      <LinearGradient
        colors={["#07203f", "#04363a", "#06233d"]}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* subtle radial glows (pure view overlays) */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />

      <Animated.View style={[styles.container, { opacity: titleOpacity, transform: [{ translateY: titleY }] }] }>
        <ThemedText variant="caption" style={styles.kicker}>DAILY PULSE</ThemedText>
        <ThemedText variant="display" weight="bold" style={styles.title}>Welcome back, Avery</ThemedText>
      </Animated.View>

      <Animated.View style={[styles.scrollArea, { opacity: cardsOpacity, transform: [{ translateY: cardsOffset }] }] }>
        {/* Status bar card */}
        <GlowyCard compact>
          <View style={styles.rowBadges}>
            <Animated.View style={[styles.pulseDot, { transform: [{ scale: pulse }] }]} />
            <ThemedText variant="body" color="secondary">2 insights this week</ThemedText>
          </View>
        </GlowyCard>

        {/* Health reminder */}
        <GlowyCard>
          <ThemedText variant="heading" weight="bold" style={{ color: '#fff' }}>Health Reminder</ThemedText>
          <ThemedText variant="body" color="secondary" style={{ marginTop: 8 }}>
            Your care team has reviewed your recent data. Everything looks in range, keep up the great work!
          </ThemedText>
        </GlowyCard>

        {/* Insights header */}
        <ThemedText variant="heading" weight="bold" style={styles.sectionTitle}>Insights</ThemedText>
        <ThemedText variant="body" color="secondary">AI-generated, clinician-reviewed</ThemedText>

        {/* Example insight card */}
        <GlowyCard>
          <ThemedText variant="heading" weight="bold">Steady Respiratory Health</ThemedText>
          <ThemedText variant="body" color="secondary" style={{ marginTop: 8 }}>
            Average SpO2 stayed above 97% over the last 7 days. Keep the light breathing exercises.
          </ThemedText>

          {/* little pill footer */}
          <View style={styles.cardFooter}>
            <View style={styles.pill}><Activity size={14} color="white" /><ThemedText color="inverse" style={{ marginLeft: 8 }}>Daily Pulse</ThemedText></View>
            <View style={styles.footerIcons}><Sparkles size={16} color="#fff" style={{ marginRight: 12 }} /><Heart size={16} color="#fff" /></View>
          </View>
        </GlowyCard>

      </Animated.View>
    </View>
  );
}

function GlowyCard({ children, compact = false }: any) {
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#041025',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44,
  },
  container: {
    paddingHorizontal: Spacing.xl,
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
    marginBottom: Spacing.sm,
  },
  lead: {
    color: 'rgba(255,255,255,0.85)',
    marginBottom: Spacing.lg,
    maxWidth: SCREEN_W - 80,
  },
  scrollArea: {
    paddingHorizontal: Spacing.xl,
    marginTop: 18,
  },

  // Card
  card: {
    backgroundColor: 'rgba(10,25,40,0.55)',
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
  cardCompact: {
    paddingVertical: 12,
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl || 16,
    backgroundColor: 'rgba(30, 27, 75, 0.4)',
    // subtle top-left white accent line
    borderTopWidth: 1.2,
    borderLeftWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.03)',
  },

  cardGlo: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl || 16,
    backgroundColor: 'rgba(30, 27, 75, 0.1)',
    // subtle top-left white accent line
    borderTopWidth: 1.2,
    borderLeftWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.03)',
  },

  cardContent: {
    position: 'relative',
    zIndex: 2,
  },

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
    elevation: 6,
  },

  sectionTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    color: '#fff',
    paddingHorizontal: Spacing.xs,
  },

  // card footer
  cardFooter: {
    marginTop: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pill: {
    backgroundColor: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  footerIcons: { flexDirection: 'row', alignItems: 'center' },

  // Floating nav
  floatingNavWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 22,
    alignItems: 'center',
  },
  floatingNav: {
    width: SCREEN_W - 48,
    backgroundColor: 'rgba(12,18,30,0.7)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // glass effect
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    ...Platform.select({ ios: { backdropFilter: 'blur(6px)' as any }, android: {} }),
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 10,
  },
  navLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 4,
  },
  navLabelActive: {
    color: '#fff',
    fontWeight: '600',
  },

  // glows
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
