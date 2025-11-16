import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Colors, Spacing } from '../../../constants/Colors';

// Icons
import {
  CircleCheck,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sparkles,
} from 'lucide-react-native';

export default function UserPromise() {
  const router = useRouter();

  const slide = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 240,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 240,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Back link */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ThemedText
            variant="body"
            color="teal"
            style={styles.backButtonText}
          >
            ⪻ Back to Onboarding
          </ThemedText>
        </TouchableOpacity>

        <Animated.View
          style={{
            transform: [{ translateY: slide }],
            opacity: opacity,
          }}
        >
          {/* Title */}
          <ThemedText variant="display" weight="bold" style={styles.title}>
            LIVION “User Promise” Manifesto
          </ThemedText>

          {/* Manifesto Section */}
          <View style={styles.sectionCentered}>
            <ManifestoItem
              icon={<Sparkles size={20} color="#0d9488" />}
              textBold="1. You are not a datapoint."
              text=" You’re a story — full of days, pauses, and restarts. Livion listens, not just measures."
            />

            <ManifestoItem
              icon={<ShieldCheck size={20} color="#0d9488" />}
              textBold="2. We protect what’s yours."
              text=" Your data is private by default. We’ll never sell it or trade it. You choose what to share."
            />

            <ManifestoItem
              icon={<Leaf size={20} color="#0d9488" />}
              textBold="3. Small steps count."
              text=" Health isn’t a race. Small moments matter — Livion helps you notice them."
            />

            <ManifestoItem
              icon={<CircleCheck size={20} color="#0d9488" />}
              textBold="4. Your journey is unique."
              text=" Our AI adapts to you, never judges you."
            />

            <ManifestoItem
              icon={<HeartHandshake size={20} color="#0d9488" />}
              textBold="5. You’re part of something bigger."
              text=" Every choice contributes to a mission of stronger communities and honest care."
            />

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
              <ThemedText key={i} variant="body" style={styles.itemCentered}>
                <ThemedText weight="bold">{bold}</ThemedText> {rest}
              </ThemedText>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Privacy Explainer */}
          <ThemedText
            variant="heading"
            weight="bold"
            color="teal"
            align="center"
            style={styles.subtitle}
          >
            Privacy Explainer
          </ThemedText>

          <ThemedText
            variant="body"
            color="secondary"
            align="center"
            style={styles.paragraph}
          >
            This is placeholder text for a future plain-language privacy explainer...
          </ThemedText>

          <ThemedText
            variant="body"
            color="secondary"
            align="center"
            style={styles.paragraph}
          >
            Here we’ll clarify what stays on-device, how encryption works...
          </ThemedText>

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ManifestoItem({ icon, textBold, text }: any) {
  return (
    <View style={styles.manifestoRow}>
      <View style={styles.iconContainer}>{icon}</View>
      <ThemedText variant="body" style={styles.itemCentered}>
        <ThemedText weight="bold">{textBold}</ThemedText>
        {text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  },

  /* Back Button (updated) */
  backButton: {
    marginTop: 30,
    marginBottom: 30,
  },
  backButtonText: {
    textDecorationLine: 'none',   // ← underline removed
    fontSize: 18,                 // ← bigger
    fontWeight: '600',            // ← slightly bold
  },

  title: {
    marginBottom: Spacing.xl,
    textAlign: 'center',
    color: '#0f766e',
  },

  /* Center content */
  sectionCentered: {
    gap: Spacing.md,
    alignItems: 'center',  // ← centers children
  },

  manifestoRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-start',
    maxWidth: 320,          // keeps rows readable
  },

  itemCentered: {
    lineHeight: 22,
    textAlign: 'left',
    maxWidth: 300,
  },

  iconContainer: {
    paddingTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: Spacing.xl,
  },

  subtitle: {
    marginBottom: Spacing.md,
  },

  paragraph: {
    marginBottom: Spacing.md,
    lineHeight: 22,
  },
});
