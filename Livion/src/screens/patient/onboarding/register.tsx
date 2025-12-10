import { useNavigation } from '@react-navigation/native';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { AnimatedBlobBackground } from '../../../components/atoms/AnimatedBlobBackground';
import { GlassCard } from '../../../components/atoms/GlassCard';
import { Button } from '../../../components/atoms/Button';
import { InputField } from '../../../components/atoms/InputField';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { OnboardingHeader } from '../../../components/molecules/OnboardingHeader';
import { COLORS, Spacing } from '@/src/constants/Colors';
import { useLanguage } from '../../../components/providers/LanguageProvider';

export default function PatientRegisterScreen() {
  const navigation = useNavigation();
  const { t } = useLanguage();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <AnimatedBlobBackground />

      <SafeAreaView style={styles.safeArea}>
        <OnboardingHeader />

        <ScrollView contentContainerStyle={styles.container}>
          <GlassCard style={styles.card} shadowSize="lg">
            <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
              {t.register.title}
            </ThemedText>

            <ThemedText variant="body" align="center" style={styles.subtitle}>
              {t.register.subtitle}
            </ThemedText>

            <InputField
              label={t.register.emailPhone}
              placeholder=""
              keyboardType="email-address"
              style={styles.input}
            />

            <InputField
              label={t.register.setPassword}
              placeholder=""
              secureTextEntry
              style={styles.input}
            />

            <InputField
              label={t.register.confirmPassword}
              placeholder=""
              secureTextEntry
              style={styles.input}
            />

            <InputField
              label={t.register.bankId}
              placeholder=""
              style={styles.input}
            />

            <Button
              variant="primary"
              fullWidth
              style={styles.nextButton}
              textStyle={{ textAlign: 'center' }}
              onPress={() => navigation.navigate('Consent' as never)}
            >
              <ThemedText variant="label" weight="semibold" style={styles.buttonText}>
                {t.common.continue}
              </ThemedText>
            </Button>
          </GlassCard>

          <ThemedText variant="caption" align="center" style={styles.footer}>
            {t.register.footer}
          </ThemedText>
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
    alignItems: 'center',
  },
  card: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    marginBottom: Spacing.sm,
    color: COLORS.textPrimary,
  },
  subtitle: {
    marginBottom: Spacing.xl,
    color: COLORS.textSecondary,
  },
  input: {
    marginTop: Spacing.md,
    width: '100%',
  },
  nextButton: {
    marginTop: Spacing.xl,
    backgroundColor: COLORS.teal,
  },
  buttonText: {
    color: COLORS.cardWhite,
    textAlign: 'center',
  },
  footer: {
    marginBottom: 25,
    marginTop: 15,
    color: COLORS.textSecondary,
  },
});
