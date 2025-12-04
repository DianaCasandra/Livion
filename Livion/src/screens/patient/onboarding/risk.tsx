import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/atoms/Button';
import { Chip } from '@/components/atoms/Chip';
import { ThemedText } from '@/components/atoms/ThemedText';
import { BorderRadius, Spacing } from '@/constants/Colors';

const COLORS = {
  background: '#f7f7f7',
  teal: '#03d0c5',
  tealLight: '#e6faf9',
  amber: '#ff6e1e',
  amberLight: '#fff4ed',
  textPrimary: '#1a1a2e',
  textSecondary: '#64748b',
  error: '#ef4444',
};

const QUESTIONS = [
  "Do you experience severe headaches daily?",
  "Have you had episodes of dizziness or fainting?",
  "Are you experiencing chest pain or pressure?",
  "Do you have persistent shortness of breath?",
  "Do you notice unusual swelling in your legs or ankles?",
];

export default function RiskAssessmentScreen() {
  const navigation = useNavigation();

  // 'yes' | 'no' | null for each question
  const [answers, setAnswers] = useState<(string | null)[]>(Array(QUESTIONS.length).fill(null));

  const yesCount = answers.filter(a => a === 'yes').length;

  const handleAnswer = (index: number, value: 'yes' | 'no') => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Animated blobs
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
        <ScrollView contentContainerStyle={styles.container}>

          {/* Back button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>

          {/* Card principal */}
          <View style={styles.card}>
            <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
              Risk Snapshot
            </ThemedText>

            <ThemedText variant="body" align="center" style={styles.body}>
              Please complete the following triage questions regarding your current symptoms. We will examine your state as a starting point in your health journey.
            </ThemedText>

            {/* Questions */}
            <View style={styles.questionsContainer}>
              {QUESTIONS.map((q, i) => (
                <View key={i} style={styles.questionItem}>
                  <ThemedText variant="subtitle" weight="semibold" style={styles.questionText}>
                    {q}
                  </ThemedText>
                  <View style={styles.answerButtons}>
                    <Chip
                      label="Yes"
                      variant={answers[i] === 'yes' ? 'status-action' : 'teal'}
                      style={{ marginRight: Spacing.sm }}
                      onPress={() => handleAnswer(i, 'yes')}
                    />
                    <Chip
                      label="No"
                      variant={answers[i] === 'no' ? 'status-ok' : 'teal'}
                      onPress={() => handleAnswer(i, 'no')}
                    />
                  </View>
                </View>
              ))}
            </View>

            {/* Guidance if 3+ yes */}
            {yesCount >= 3 && (
              <View style={styles.guidanceContainer}>
                <ThemedText variant="subtitle" weight="bold" style={{ color: COLORS.error, marginBottom: Spacing.sm }}>
                  Seek Care
                </ThemedText>
                <ThemedText variant="body" align='center' style={{ color: COLORS.textSecondary }}>
                  Based on your responses, it is recommended to contact your healthcare provider immediately. For emergencies, call:
                </ThemedText>
                <ThemedText variant="body" style={{ color: COLORS.textSecondary }}>
                  - 112 (EU)
                </ThemedText>
              </View>
            )}

            {/* Buton Continue */}
            <Button variant="primary" fullWidth style={styles.button} onPress={() => navigation.navigate('Dashboard' as never)}>
              Finish Assessment
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },
  safeArea: { flex: 1 },
  container: { flexGrow: 1, padding: Spacing.xl },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    marginTop: Spacing.md,
    padding: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12 },
      android: { elevation: 3 },
    }),
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
  title: {
    marginBottom: Spacing.md,
    color: COLORS.textPrimary,
  },
  body: {
    marginBottom: Spacing.lg,
    color: COLORS.textSecondary,
  },

  questionsContainer: { gap: Spacing.lg, marginBottom: Spacing.xl },
  questionItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 18,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  questionText: {
    marginBottom: Spacing.sm,
    color: COLORS.textPrimary,
  },
  answerButtons: { flexDirection: 'row' },

  guidanceContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  button: {
    marginTop: Spacing.lg,
    backgroundColor: COLORS.teal,
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
