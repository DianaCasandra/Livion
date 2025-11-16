import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { Chip } from '../../../components/atoms/Chip';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';

const QUESTIONS = [
  "Do you experience severe headaches daily?",
  "Have you had episodes of dizziness or fainting?",
  "Are you experiencing chest pain or pressure?",
  "Do you have persistent shortness of breath?",
  "Do you notice unusual swelling in your legs or ankles?",
];

export default function RiskAssessmentScreen() {
  const router = useRouter();

  // 'yes' | 'no' | null for each question
  const [answers, setAnswers] = useState<(string | null)[]>(Array(QUESTIONS.length).fill(null));

  const yesCount = answers.filter(a => a === 'yes').length;

  const handleAnswer = (index: number, value: 'yes' | 'no') => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ThemedText variant="body" color="teal" style={styles.backButtonText}>
            ⪻ Back
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.card}>
          <ThemedText variant="display" weight="bold" align="center" color="teal" style={styles.title}>
            Risk Snapshot
          </ThemedText>

          <ThemedText variant="body" color="secondary" align="center" style={styles.body}>
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
              <ThemedText variant="subtitle" weight="bold" style={{ color: Colors.status.action, marginBottom: Spacing.sm }}>
                Seek Care
              </ThemedText>
              <ThemedText variant="body" color="secondary" align='center'>
                Based on your responses, it is recommended to contact your healthcare provider immediately. For emergencies, call:
              </ThemedText>
              <ThemedText variant="body" color="secondary">
                - 112 (EU)
              </ThemedText>
            </View>
          )}

          <Button variant="primary" fullWidth style={styles.button} onPress={() => router.replace('/patient/dashboard/home')}>
            Finish Assessment
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background.primary },
  container: { flexGrow: 1, padding: Spacing.xl },
  card: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.background.cardGlass,
    borderColor: Colors.border.medium,
    borderWidth: 1,
  },
  title: { marginBottom: Spacing.md },
  body: { marginBottom: Spacing.lg },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, marginTop: 15 },
  backButtonText: { marginBottom: Spacing.md, fontSize: 18 },
  questionsContainer: { gap: Spacing.lg, marginBottom: Spacing.xl },
  questionItem: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  questionText: { marginBottom: Spacing.sm },
  answerButtons: { flexDirection: 'row' },
  guidanceContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: `${Colors.status.action}20`,
    borderRadius: BorderRadius.md,
  },
  button: { marginTop: Spacing.lg },
});
