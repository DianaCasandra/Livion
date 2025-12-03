import { useRouter } from 'expo-router';
import { JSX, useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemedText } from '@/components/atoms/ThemedText';
import { Colors, Spacing } from '@/constants/Colors';

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

// Setăm culoarea cerută, folosită de toate iconițele
const ICON_COLOR = '#0d9488';

// Lista de iconițe pentru punctele 6-13 (toate folosesc culoarea ICON_COLOR)
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
  const router = useRouter();

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
    <SafeAreaView style={styles.safeArea}>
      {/* Container subtil de glow */}
      <View style={styles.glowEffect} pointerEvents="none" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
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
            {/* Punctele 1-5 (actualizate pentru a folosi ICON_COLOR) */}
            <ManifestoItem
              icon={<Sparkles size={20} color={ICON_COLOR} />}
              textBold="1. You are not a datapoint."
              text=" You’re a story — full of days, pauses, and restarts. Livion listens, not just measures."
            />

            <ManifestoItem
              icon={<ShieldCheck size={20} color={ICON_COLOR} />}
              textBold="2. We protect what’s yours."
              text=" Your data is private by default. We’ll never sell it or trade it. You choose what to share."
            />

            <ManifestoItem
              icon={<Leaf size={20} color={ICON_COLOR} />}
              textBold="3. Small steps count."
              text=" Health isn’t a race. Small moments matter — Livion helps you notice them."
            />

            <ManifestoItem
              icon={<CircleCheck size={20} color={ICON_COLOR} />}
              textBold="4. Your journey is unique."
              text=" Our AI adapts to you, never judges you."
            />

            <ManifestoItem
              icon={<HeartHandshake size={20} color={ICON_COLOR} />}
              textBold="5. You’re part of something bigger."
              text=" Every choice contributes to a mission of stronger communities and honest care."
            />

            {/* Punctele 6-13 (mapate cu iconițe noi de aceeași culoare) */}
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

          {/* Divider */}
          <View style={styles.divider} />

          {/* Privacy Explainer */}
          <ThemedText
            variant="heading"
            weight="bold"
            color="secondary"
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

function ManifestoItem({ icon, textBold, text }: { icon: JSX.Element, textBold: string, text: string }) {
  return (
    <View style={styles.manifestoRow}>
      <View style={styles.iconContainer}>{icon}</View>
      <ThemedText variant="body" style={styles.itemText}>
        {/* Folosim 'teal' din ThemedText pentru a asigura un contrast bun pe fundalul închis */}
        <ThemedText weight="bold" color="teal">{textBold}</ThemedText> 
        {text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#041025', // Fundal închis
  },
  glowEffect: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#075985',
    opacity: 0.08,
    top: -50,
    right: -50,
    shadowColor: '#0f766e', 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  },

  /* Back Button */
  backButton: {
    marginTop: 30,
    marginBottom: 30,
  },
  backButtonText: {
    textDecorationLine: 'none',
    fontSize: 18,
    fontWeight: '600',
  },

  title: {
    marginBottom: Spacing.xl,
    textAlign: 'center',
    color: 'rgba(203, 213, 225, 0.9)', // Teal puternic
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
    color: 'rgba(203, 213, 225, 0.9)', // Textul obișnuit alb-gri
  },

  iconContainer: {
    paddingTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: '#1e293b',
    marginVertical: Spacing['2xl'],
  },

  subtitle: {
    marginBottom: Spacing.md,
  },

  paragraph: {
    marginBottom: Spacing.md,
    lineHeight: 22,
  },
});