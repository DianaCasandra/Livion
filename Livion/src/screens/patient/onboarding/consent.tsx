import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { AnimatedBlobBackground } from '../../../components/atoms/AnimatedBlobBackground';
import { GlassCard } from '../../../components/atoms/GlassCard';
import { Button } from '../../../components/atoms/Button';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { OnboardingHeader } from '../../../components/molecules/OnboardingHeader';
import { ToggleRow } from '../../../components/molecules/ToggleRow';
import { BorderRadius, Spacing, COLORS, GlassStyles } from '@/src/constants/Colors';
import { useLanguage } from '../../../components/providers/LanguageProvider';

export default function ConsentScreen() {
  const navigation = useNavigation();
  const { t } = useLanguage();

  const [dataSources, setDataSources] = useState(false);
  const [wearables, setWearables] = useState(false);
  const [ehr, setEhr] = useState(false);

  const [privateShare, setPrivateShare] = useState(false);
  const [circleShare, setCircleShare] = useState(false);
  const [clinicianShare, setClinicianShare] = useState(false);

  const [research, setResearch] = useState(false);
  const [purposeBinding, setPurposeBinding] = useState(false);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <AnimatedBlobBackground />

      <SafeAreaView style={styles.safeArea}>
        <OnboardingHeader />

        <ScrollView contentContainerStyle={styles.container}>
          <GlassCard style={styles.card} shadowSize="lg">
            <ThemedText variant="display" weight="bold" style={styles.title} align="center">
              {t.consent.title}
            </ThemedText>

            <ThemedText variant="body" style={styles.body} align="center">
              {t.consent.subtitle}
            </ThemedText>

            {/* Data Sources */}
            <View style={styles.section}>
              <ToggleRow
                label={t.consent.dataSources}
                value={dataSources}
                onValueChange={setDataSources}
                centerText
              />

              {dataSources && (
                <View style={styles.subToggleGroup}>
                  <ToggleRow
                    label={t.consent.wearables}
                    value={wearables}
                    onValueChange={setWearables}
                    small
                    centerText
                  />
                  <ToggleRow
                    label={t.consent.ehr}
                    value={ehr}
                    onValueChange={setEhr}
                    small
                    centerText
                  />
                </View>
              )}
            </View>

            {/* Sharing Scopes */}
            <ThemedText variant="heading" weight="semibold" align="center" style={styles.subtitle}>
              {t.consent.sharingScopesTitle}
            </ThemedText>

            <View style={styles.section}>
              <ToggleRow label={t.consent.private} value={privateShare} onValueChange={setPrivateShare} centerText />
              <ToggleRow label={t.consent.circle} value={circleShare} onValueChange={setCircleShare} centerText />
              <ToggleRow label={t.consent.clinician} value={clinicianShare} onValueChange={setClinicianShare} centerText />
            </View>

            {/* Additional Toggles */}
            <View style={styles.section}>
              <ToggleRow label={t.consent.researchOptIn} value={research} onValueChange={setResearch} centerText />
              <ToggleRow label={t.consent.purposeBinding} value={purposeBinding} onValueChange={setPurposeBinding} centerText />
            </View>

            <Button
              variant="primary"
              fullWidth
              style={styles.nextButton}
              textStyle={{ textAlign: 'center' }}
              onPress={() => navigation.navigate('DataConnections' as never)}
            >
              <ThemedText variant="label" weight="semibold" style={styles.buttonText}>
                {t.common.continue}
              </ThemedText>
            </Button>
          </GlassCard>

          <ThemedText variant="caption" align="center" style={styles.disclaimer}>
            {t.consent.disclaimer}
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
    marginBottom: Spacing.md,
    color: COLORS.textPrimary,
  },
  body: {
    marginBottom: Spacing.xl,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: Spacing.xl,
    gap: Spacing.md,
    width: '100%',
  },
  subtitle: {
    marginBottom: Spacing.md,
    color: COLORS.teal,
  },
  subToggleGroup: {
    marginTop: Spacing.xs,
    gap: Spacing.xs,
    backgroundColor: GlassStyles.cardSubtle.backgroundColor,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  nextButton: {
    marginTop: Spacing.lg,
    backgroundColor: COLORS.teal,
  },
  buttonText: {
    color: COLORS.cardWhite,
    textAlign: 'center',
  },
  disclaimer: {
    marginBottom: 25,
    marginTop: 15,
    color: COLORS.textSecondary,
  },
});
