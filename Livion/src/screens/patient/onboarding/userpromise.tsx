import { useNavigation } from '@react-navigation/native';
import { JSX, useEffect, useRef } from 'react';
import {
  Animated,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { AnimatedBlobBackground } from '../../../components/atoms/AnimatedBlobBackground';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { Spacing, COLORS } from '@/src/constants/Colors';

// Icons Lucide
import {
  CircleCheck,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sparkles,
  Zap,
  Users,
  Eye,
  ThumbsUp,
  Bed,
  Mic,
  TrendingUp,
  Home,
} from 'lucide-react-native';

// Icon color for all manifesto items
const ICON_COLOR = COLORS.teal;

// Icons for items 6-13
const additionalIcons = [
  <Zap size={20} color={ICON_COLOR} />,
  <Users size={20} color={ICON_COLOR} />,
  <Eye size={20} color={ICON_COLOR} />,
  <ThumbsUp size={20} color={ICON_COLOR} />,
  <Bed size={20} color={ICON_COLOR} />,
  <Mic size={20} color={ICON_COLOR} />,
  <TrendingUp size={20} color={ICON_COLOR} />,
  <Home size={20} color={ICON_COLOR} />,
];

export default function UserPromise() {
  const navigation = useNavigation();

  const slide = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <AnimatedBlobBackground />

      <ScreenHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >

          <Animated.View
            style={{
              transform: [{ translateY: slide }],
              opacity: opacity,
            }}
          >
            {/* Title */}
            <ThemedText variant="display" weight="bold" style={styles.title}>
              LIVION "User Promise" Manifesto
            </ThemedText>

            {/* Main Card */}
            <View style={styles.card}>
              {/* Manifesto Section */}
              <View style={styles.sectionCentered}>
                {/* Items 1-5 */}
                <ManifestoItem
                  icon={<Sparkles size={20} color={ICON_COLOR} />}
                  textBold="1. You are not a datapoint."
                  text=" You're a story — full of days, pauses, and restarts. Livion listens, not just measures."
                />

                <ManifestoItem
                  icon={<ShieldCheck size={20} color={ICON_COLOR} />}
                  textBold="2. We protect what's yours."
                  text=" Your data is private by default. We'll never sell it or trade it. You choose what to share."
                />

                <ManifestoItem
                  icon={<Leaf size={20} color={ICON_COLOR} />}
                  textBold="3. Small steps count."
                  text=" Health isn't a race. Small moments matter — Livion helps you notice them."
                />

                <ManifestoItem
                  icon={<CircleCheck size={20} color={ICON_COLOR} />}
                  textBold="4. Your journey is unique."
                  text=" Our AI adapts to you, never judges you."
                />

                <ManifestoItem
                  icon={<HeartHandshake size={20} color={ICON_COLOR} />}
                  textBold="5. You're part of something bigger."
                  text=" Every choice contributes to a mission of stronger communities and honest care."
                />

                {/* Items 6-13 */}
                {[
                  ['6. Everyone belongs.', ' Diversity is our foundation.'],
                  ['7. Connection is care.', ' Healing grows through shared progress.'],
                  ['8. We lead with clarity.', ' Transparency is care.'],
                  ['9. Progress feels good.', ' We design for joy, not guilt.'],
                  ['10. Rest is also progress.', ' Doing nothing can be healthy.'],
                  ['11. Your voice shapes Livion.', ' We build this with you.'],
                  ['12. We aim for lasting change.', ' Beyond screens — real-world good.'],
                  ['13. Health is hope.', ' Every tap is toward collective wellbeing.'],
                ].map(([bold, rest], i) => (
                  <ManifestoItem
                    key={i}
                    icon={additionalIcons[i]}
                    textBold={bold}
                    text={rest}
                  />
                ))}
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Privacy Explainer Card */}
            <View style={styles.card}>
              <ThemedText
                variant="heading"
                weight="bold"
                align="center"
                style={styles.subtitle}
              >
                Privacy Explainer
              </ThemedText>

              <ThemedText
                variant="body"
                align="center"
                style={styles.paragraph}
              >
                This is placeholder text for a future plain-language privacy explainer...
              </ThemedText>

              <ThemedText
                variant="body"
                align="center"
                style={styles.paragraph}
              >
                Here we'll clarify what stays on-device, how encryption works...
              </ThemedText>
            </View>
          </Animated.View>
      </ScrollView>
    </View>
  );
}

function ManifestoItem({ icon, textBold, text }: { icon: JSX.Element, textBold: string, text: string }) {
  return (
    <View style={styles.manifestoRow}>
      <View style={styles.iconContainer}>{icon}</View>
      <ThemedText variant="body" style={styles.itemText}>
        <ThemedText weight="bold" style={{ color: COLORS.teal }}>{textBold}</ThemedText>
        {text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  },

  title: {
    marginBottom: Spacing.xl,
    textAlign: 'center',
    color: COLORS.textPrimary,
  },

  card: {
    padding: Spacing.xl,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 10 }, shadowRadius: 30 },
      android: { elevation: 6 },
    }),
  },

  /* Manifesto Items */
  sectionCentered: {
    gap: Spacing.lg,
    alignItems: 'center',
  },

  manifestoRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-start',
    maxWidth: 350,
  },

  itemText: {
    lineHeight: 22,
    textAlign: 'left',
    maxWidth: 300,
    color: COLORS.textSecondary,
  },

  iconContainer: {
    paddingTop: 3,
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(3, 208, 197, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    marginVertical: Spacing['2xl'],
  },

  subtitle: {
    marginBottom: Spacing.md,
    color: COLORS.textPrimary,
  },

  paragraph: {
    marginBottom: Spacing.md,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
});
