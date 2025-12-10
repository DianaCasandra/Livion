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
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../../../components/atoms/BackButton';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Spacing, COLORS } from '@/src/constants/Colors';
import { useLanguage } from '../../../components/providers/LanguageProvider';

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
  const { t } = useLanguage();

  const slide = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Animated blobs
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;

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

    // Blob animations
    const loopAnimation = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: 8000, delay, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 8000, useNativeDriver: true }),
        ])
      ).start();
    };
    loopAnimation(anim1, 0);
    loopAnimation(anim2, 1500);
  }, []);

  const blob1Style = {
    transform: [
      { translateX: anim1.interpolate({ inputRange: [0, 1], outputRange: [-40, 40] }) },
      { translateY: anim1.interpolate({ inputRange: [0, 1], outputRange: [-20, 20] }) },
    ],
  };

  const blob2Style = {
    transform: [
      { translateX: anim2.interpolate({ inputRange: [0, 1], outputRange: [30, -30] }) },
      { translateY: anim2.interpolate({ inputRange: [0, 1], outputRange: [40, -40] }) },
    ],
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Animated blobs */}
      <Animated.View style={[styles.blobTeal, blob1Style]} />
      <Animated.View style={[styles.blobAmber, blob2Style]} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <BackButton />
        </View>

        <ScrollView
          style={styles.container}
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
              {t.userPromise.title}
            </ThemedText>

            {/* Main Card */}
            <View style={styles.card}>
              {/* Manifesto Section */}
              <View style={styles.sectionCentered}>
                {/* Items 1-5 */}
                <ManifestoItem
                  icon={<Sparkles size={20} color={ICON_COLOR} />}
                  textBold={t.userPromise.manifesto.item1Bold}
                  text={t.userPromise.manifesto.item1Text}
                />

                <ManifestoItem
                  icon={<ShieldCheck size={20} color={ICON_COLOR} />}
                  textBold={t.userPromise.manifesto.item2Bold}
                  text={t.userPromise.manifesto.item2Text}
                />

                <ManifestoItem
                  icon={<Leaf size={20} color={ICON_COLOR} />}
                  textBold={t.userPromise.manifesto.item3Bold}
                  text={t.userPromise.manifesto.item3Text}
                />

                <ManifestoItem
                  icon={<CircleCheck size={20} color={ICON_COLOR} />}
                  textBold={t.userPromise.manifesto.item4Bold}
                  text={t.userPromise.manifesto.item4Text}
                />

                <ManifestoItem
                  icon={<HeartHandshake size={20} color={ICON_COLOR} />}
                  textBold={t.userPromise.manifesto.item5Bold}
                  text={t.userPromise.manifesto.item5Text}
                />

                {/* Items 6-13 */}
                {[
                  [t.userPromise.manifesto.item6Bold, t.userPromise.manifesto.item6Text],
                  [t.userPromise.manifesto.item7Bold, t.userPromise.manifesto.item7Text],
                  [t.userPromise.manifesto.item8Bold, t.userPromise.manifesto.item8Text],
                  [t.userPromise.manifesto.item9Bold, t.userPromise.manifesto.item9Text],
                  [t.userPromise.manifesto.item10Bold, t.userPromise.manifesto.item10Text],
                  [t.userPromise.manifesto.item11Bold, t.userPromise.manifesto.item11Text],
                  [t.userPromise.manifesto.item12Bold, t.userPromise.manifesto.item12Text],
                  [t.userPromise.manifesto.item13Bold, t.userPromise.manifesto.item13Text],
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
                {t.userPromise.privacyExplainer}
              </ThemedText>

              <ThemedText
                variant="body"
                align="center"
                style={styles.paragraph}
              >
                {t.userPromise.privacyPlaceholder1}
              </ThemedText>

              <ThemedText
                variant="body"
                align="center"
                style={styles.paragraph}
              >
                {t.userPromise.privacyPlaceholder2}
              </ThemedText>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },
  safeArea: {
    flex: 1,
  },

  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xs,
  },

  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.xl,
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

  blobTeal: {
    position: 'absolute',
    width: 400,
    height: 400,
    right: -120,
    top: -80,
    borderRadius: 999,
    backgroundColor: COLORS.teal,
    opacity: 0.12,
  },

  blobAmber: {
    position: 'absolute',
    width: 450,
    height: 450,
    left: -180,
    bottom: -100,
    borderRadius: 999,
    backgroundColor: COLORS.amber,
    opacity: 0.10,
  },
});
