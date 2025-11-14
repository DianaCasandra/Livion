import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { Chip } from '../../../components/atoms/Chip';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';

export default function RiskAssessmentScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <ThemedText variant="display" weight="bold" style={styles.title}>
            Risk Snapshot
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.body}>
            Based on your data, here are the current focus areas. Your care team will review these with you and adjust your plan as needed.
          </ThemedText>

          <View style={styles.riskList}>
            <View style={styles.riskItem}>
              <Chip label="Priority" variant="status-attention" />
              <ThemedText variant="subtitle" weight="semibold" style={styles.riskTitle}>
                Morning Glucose Spikes
              </ThemedText>
              <ThemedText variant="body" color="secondary">
                Average fasting glucose 145 mg/dL (target 80-130). Monitor breakfast choices and medication timing.
              </ThemedText>
            </View>
            <View style={styles.riskItem}>
              <Chip label="Stable" variant="status-ok" />
              <ThemedText variant="subtitle" weight="semibold" style={styles.riskTitle}>
                Blood Pressure Trends
              </ThemedText>
              <ThemedText variant="body" color="secondary">
                Weekly average 125/80 mmHg. Continue current routine and daily readings.
              </ThemedText>
            </View>
          </View>

          <Button variant="primary" fullWidth style={styles.button} onPress={() => router.replace('/patient/home')}>
            Finish Onboarding
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  card: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.background.cardGlass,
    borderColor: Colors.border.medium,
    borderWidth: 1,
  },
  title: {
    marginBottom: Spacing.md,
  },
  body: {
    marginBottom: Spacing.lg,
  },
  riskList: {
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  riskItem: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderColor: Colors.border.medium,
    borderWidth: 1,
  },
  riskTitle: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  button: {
    marginTop: Spacing.sm,
  },
});
