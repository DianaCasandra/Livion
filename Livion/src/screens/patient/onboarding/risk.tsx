import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { AnimatedBlobBackground } from '../../../components/atoms/AnimatedBlobBackground';
import { Button } from '../../../components/atoms/Button';
import { Chip } from '../../../components/atoms/Chip';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { BorderRadius, COLORS, Spacing } from '@/src/constants/Colors';


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

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <AnimatedBlobBackground />

      <ScreenHeader />

      <ScrollView contentContainerStyle={styles.container}>

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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: { flexGrow: 1, padding: Spacing.xl },

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
});
