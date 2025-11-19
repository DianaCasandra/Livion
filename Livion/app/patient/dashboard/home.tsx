import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Activity, Heart, Sparkles } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
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
import { ThemedText } from '../../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';
import { InsightModal } from '../../../components/atoms/InsightModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type GlowyCardProps = {
  children: React.ReactNode;
  compact?: boolean;
  onPress?: () => void;
  style?: any;
};

function GlowyCard({ children, compact = false, onPress, style }: GlowyCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!onPress) return;
    Animated.spring(scale, {
      toValue: 0.985,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  const handlePressOut = () => {
    if (!onPress) return;
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  return (
    <Pressable
      disabled={!onPress}
      onPressIn={onPress ? handlePressIn : undefined}
      onPressOut={onPress ? handlePressOut : undefined}
      onPress={onPress}
      style={style}
    >
      <Animated.View
        style={[
          styles.card,
          compact && styles.cardCompact,
          { transform: [{ scale }] },
        ]}
      >
        <View style={styles.cardGlow} pointerEvents="none" />
        <View style={styles.cardContent}>{children}</View>
      </Animated.View>
    </Pressable>
  );
}

export default function PatientDashboardHome() {
  const router = useRouter();

  // Modal state for AI explanation
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  async function askLocalAI(question: string) {
    try {
      const response = await fetch(
        'https://jolliest-joshingly-shaneka.ngrok-free.dev/ask',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question }),
        },
      );

      const data = await response.json();
      console.log('AI response:', data);

      setModalMessage(data.answer || 'No response');
      setModalVisible(true);
    } catch (error) {
      console.error('AI API error:', error);
      setModalMessage('Could not reach the AI server.');
      setModalVisible(true);
    }
  }

  // Subtle entrance animation
  const titleY = useRef(new Animated.Value(16)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const cardsOffset = useRef(new Animated.Value(24)).current;
  const cardsOpacity = useRef(new Animated.Value(0)).current;

  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleY, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(cardsOffset, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(cardsOpacity, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.18,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [cardsOffset, cardsOpacity, pulse, titleOpacity, titleY]);

  return (
    <View style={styles.root}>
      <StatusBar hidden />

      {/* Background gradient */}
      <LinearGradient
        colors={['#050816', '#031824', '#031b2e']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* Glows */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />

      {/* AI insight modal */}
      <InsightModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={modalMessage}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Back */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ThemedText variant="body" color="teal" style={styles.backButtonTextNoUnderline}>
            ⪻ Back
          </ThemedText>
        </Pressable>

        {/* Header */}
        <Animated.View
          style={[
            styles.headerBlock,
            { opacity: titleOpacity, transform: [{ translateY: titleY }] },
          ]}
        >
          <ThemedText variant="caption" color="secondary">
            Daily pulse
          </ThemedText>

          <ThemedText
            variant="display"
            weight="bold"
            style={[styles.headerTitle, { fontSize: 28 }]}
          >
            Welcome back, Darian
          </ThemedText>

          <ThemedText variant="subtitle" color="secondary" style={{ fontSize: 14 }}>
            A calm overview of today’s vitals, goals and care-plan tasks.
          </ThemedText>

          <View style={styles.rowBadges}>
            <Animated.View style={[styles.pulseDot, { transform: [{ scale: pulse }] }]} />
            <ThemedText variant="body" color="secondary" style={{ fontSize: 12 }}>
              2 insights this week • all safety checks green
            </ThemedText>
          </View>
        </Animated.View>

        {/* Compact stat strip */}
        <Animated.View
          style={[
            styles.statStrip,
            { opacity: cardsOpacity, transform: [{ translateY: cardsOffset }] },
          ]}
        >
          <GlowyCard compact style={styles.statChip}>
            <View style={styles.chipRow}>
              <Activity size={16} color="#a5b4fc" />
              <ThemedText variant="caption" color="secondary" style={{ fontSize: 10 }}>
                Steps
              </ThemedText>
            </View>

            <ThemedText
              variant="heading"
              weight="bold"
              style={[styles.chipValue, { fontSize: 20 }]}
            >
              7,820
            </ThemedText>

            <ThemedText variant="body" color="secondary" style={{ fontSize: 12 }}>
              78% of today’s goal
            </ThemedText>
          </GlowyCard>

          <GlowyCard compact style={styles.statChip}>
            <View style={styles.chipRow}>
              <Heart size={16} color="#fca5a5" />
              <ThemedText variant="caption" color="secondary" style={{ fontSize: 10 }}>
                Heart Rate
              </ThemedText>
            </View>

            <ThemedText
              variant="heading"
              weight="bold"
              style={[styles.chipValue, { fontSize: 20 }]}
            >
              68 bpm
            </ThemedText>

            <ThemedText variant="body" color="secondary" style={{ fontSize: 12 }}>
              in your usual range
            </ThemedText>
          </GlowyCard>

          <GlowyCard compact style={styles.statChip}>
            <View style={styles.chipRow}>
              <Sparkles size={16} color="#facc15" />
              <ThemedText variant="caption" color="secondary" style={{ fontSize: 10 }}>
                Mood
              </ThemedText>
            </View>

            <ThemedText
              variant="heading"
              weight="bold"
              style={[styles.chipValue, { fontSize: 20 }]}
            >
              steady
            </ThemedText>

            <ThemedText variant="body" color="secondary" style={{ fontSize: 12 }}>
              last 3 days logged
            </ThemedText>
          </GlowyCard>
        </Animated.View>

        {/* Main content cards */}
        <Animated.View
          style={[
            styles.cardsBlock,
            { opacity: cardsOpacity, transform: [{ translateY: cardsOffset }] },
          ]}
        >
          <GlowyCard>
            <ThemedText
              variant="heading"
              weight="bold"
              style={[styles.cardTitle, { fontSize: 16 }]}
            >
              Health reminder
            </ThemedText>

            <ThemedText
              variant="body"
              color="secondary"
              style={[styles.cardBody, { fontSize: 13 }]}
            >
              Your care team has reviewed your recent readings. Everything looks in range.
              Keep logging your values and checking in with how you feel.
            </ThemedText>
          </GlowyCard>

          {/* Insights */}
          <ThemedText
            variant="heading"
            weight="bold"
            style={[styles.sectionTitle, { fontSize: 18 }]}
          >
            Insights
          </ThemedText>

          <ThemedText
            variant="body"
            color="secondary"
            style={[styles.sectionCaption, { fontSize: 12 }]}
          >
            AI-generated, clinician-reviewed
          </ThemedText>

          {/* Insight card 1 */}
          <GlowyCard>
            <ThemedText
              variant="heading"
              weight="bold"
              style={[styles.cardTitle, { fontSize: 16 }]}
            >
              Steady respiratory health
            </ThemedText>
            <ThemedText
              variant="body"
              color="secondary"
              style={[styles.cardBody, { fontSize: 13 }]}
            >
              Your breathing rate has stayed within your agreed range over the last 7 days.
            </ThemedText>

            <Pressable
              style={{
                marginTop: 10,
                alignSelf: 'flex-start',
                paddingVertical: 6,
                paddingHorizontal: 12,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.25)',
              }}
              onPress={() =>
                askLocalAI(
                  'Explain why this insight might occur for a patient: Steady respiratory health, Your breathing rate has stayed within your agreed range over the last 7 days',
                )
              }
            >
              <ThemedText variant="caption" color="secondary">
                Why this?
              </ThemedText>
            </Pressable>
          </GlowyCard>

          {/* Insight card 2 */}
          <GlowyCard>
            <ThemedText
              variant="heading"
              weight="bold"
              style={[styles.cardTitle, { fontSize: 16 }]}
            >
              Evening blood pressure is improving
            </ThemedText>
            <ThemedText
              variant="body"
              color="secondary"
              style={[styles.cardBody, { fontSize: 13 }]}
            >
              Your last 3 evening measurements show a gentle downward trend.
            </ThemedText>

            <Pressable
              style={{
                marginTop: 10,
                alignSelf: 'flex-start',
                paddingVertical: 6,
                paddingHorizontal: 12,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.25)',
              }}
              onPress={() =>
                askLocalAI(
                  'Explain why this insight might occur for a patient: Evening blood pressure is improving, Your last 3 evening measurements show a gentle downward trend.',
                )
              }
            >
              <ThemedText variant="caption" color="secondary">
                Why this?
              </ThemedText>
            </Pressable>
          </GlowyCard>

          {/* Care plan summary */}
          <ThemedText
            variant="heading"
            weight="bold"
            style={[styles.sectionTitle, { fontSize: 18 }]}
          >
            Today’s plan
          </ThemedText>
          <ThemedText
            variant="body"
            color="secondary"
            style={[styles.sectionCaption, { fontSize: 12 }]}
          >
            Small actions, big impact
          </ThemedText>

          <GlowyCard compact>
            <ThemedText variant="body" style={[styles.planItem, { fontSize: 13 }]}>
              • Take blood pressure reading before 22:00
            </ThemedText>
            <ThemedText variant="body" style={[styles.planItem, { fontSize: 13 }]}>
              • 10 minute walk after lunch
            </ThemedText>
            <ThemedText variant="body" style={[styles.planItem, { fontSize: 13 }]}>
              • Log mood & symptoms once today
            </ThemedText>
          </GlowyCard>

          <View style={{ height: Spacing['3xl'] }} />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

/* ------------------------------ STYLES ------------------------------ */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  scrollContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },

  backButton: {
    alignSelf: 'flex-start',
    marginTop: 12,
    marginBottom: Spacing.md,
  },

  backButtonTextNoUnderline: {
    textDecorationLine: 'none',
  },

  headerBlock: {
    marginBottom: Spacing['2xl'],
    maxWidth: SCREEN_WIDTH * 0.9,
  },
  headerTitle: {
    color: '#fff',
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },

  rowBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: 8,
  },
  pulseDot: {
    width: 9,
    height: 9,
    borderRadius: 999,
    backgroundColor: '#22c55e',
    shadowColor: '#22c55e',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
  },

  statStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    marginBottom: Spacing['2xl'],
  },
  statChip: {
    flex: 1,
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.xs,
  },
  chipValue: {
    color: '#e5e7eb',
    marginBottom: Spacing.xs,
  },

  cardsBlock: {
    gap: Spacing.lg,
  },

  card: {
    backgroundColor: 'rgba(15,23,42,0.74)',
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.35)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 22,
      },
      android: {
        elevation: 4,
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
  cardTitle: {
    color: '#fff',
    marginBottom: Spacing.xs,
  },
  cardBody: {
    lineHeight: 20,
  },

  sectionTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
    color: '#fff',
  },
  sectionCaption: {
    marginBottom: Spacing.sm,
  },

  planItem: {
    marginBottom: Spacing.xs,
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
