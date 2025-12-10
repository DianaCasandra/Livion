import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedBlobBackground } from '../../../components/atoms/AnimatedBlobBackground';
import { GlassCard } from '../../../components/atoms/GlassCard';
import { Button } from '../../../components/atoms/Button';
import { Chip } from '../../../components/atoms/Chip';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { OnboardingHeader } from '../../../components/molecules/OnboardingHeader';
import { BorderRadius, COLORS, Spacing, GlassStyles } from '@/src/constants/Colors';
import { useLanguage } from '../../../components/providers/LanguageProvider';

export default function RiskAssessmentScreen() {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const QUESTIONS = t.risk.questions;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(QUESTIONS.length).fill(null));

  const yesCount = answers.filter((a) => a === 'yes').length;

  const handleAnswer = (index: number, value: 'yes' | 'no') => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <AnimatedBlobBackground />

      <SafeAreaView style={styles.safeArea}>
        <OnboardingHeader />

        <ScrollView contentContainerStyle={styles.container}>
          <GlassCard shadowSize="lg">
            <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
              {t.risk.title}
            </ThemedText>

            <ThemedText variant="body" align="center" style={styles.body}>
              {t.risk.subtitle}
            </ThemedText>

            <View style={styles.questionsContainer}>
              {QUESTIONS.map((q, i) => (
                <View key={i} style={styles.questionItem}>
                  <ThemedText variant="subtitle" weight="semibold" style={styles.questionText}>
                    {q}
                  </ThemedText>
                  <View style={styles.answerButtons}>
                    <Chip
                      label={t.common.yes}
                      variant={answers[i] === 'yes' ? 'status-action' : 'teal'}
                      style={{ marginRight: Spacing.sm }}
                      onPress={() => handleAnswer(i, 'yes')}
                    />
                    <Chip
                      label={t.common.no}
                      variant={answers[i] === 'no' ? 'status-ok' : 'teal'}
                      onPress={() => handleAnswer(i, 'no')}
                    />
                  </View>
                </View>
              ))}
            </View>

            {yesCount >= 3 && (
              <View style={styles.guidanceContainer}>
                <ThemedText variant="subtitle" weight="bold" style={styles.guidanceTitle}>
                  {t.risk.seekCare}
                </ThemedText>
                <ThemedText variant="body" align="center" style={styles.guidanceText}>
                  {t.risk.seekCareMessage}
                </ThemedText>
                <ThemedText variant="body" style={styles.guidanceText}>
                  {t.risk.emergencyNumber}
                </ThemedText>
              </View>
            )}

            <Button
              variant="primary"
              fullWidth
              style={styles.button}
              onPress={() => navigation.navigate('Dashboard' as never)}
            >
              <ThemedText variant="label" weight="semibold" style={styles.buttonText}>
                {t.risk.finishAssessment}
              </ThemedText>
            </Button>
          </GlassCard>
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
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  title: {
    marginBottom: Spacing.md,
    color: COLORS.textPrimary,
  },
  body: {
    marginBottom: Spacing.lg,
    color: COLORS.textSecondary,
  },
  questionsContainer: {
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  questionItem: {
    ...GlassStyles.cardSubtle,
    borderRadius: 18,
    padding: Spacing.md,
    borderWidth: 1,
  },
  questionText: {
    marginBottom: Spacing.sm,
    color: COLORS.textPrimary,
  },
  answerButtons: {
    flexDirection: 'row',
  },
  guidanceContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: COLORS.errorLight,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  guidanceTitle: {
    color: COLORS.error,
    marginBottom: Spacing.sm,
  },
  guidanceText: {
    color: COLORS.textSecondary,
  },
  button: {
    marginTop: Spacing.lg,
    backgroundColor: COLORS.teal,
  },
  buttonText: {
    color: COLORS.cardWhite,
    textAlign: 'center',
  },
});
