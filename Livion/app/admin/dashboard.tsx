import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function AdminDashboard() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText variant="display" weight="bold" style={styles.header}>
          Admin Dashboard
        </ThemedText>
        <ThemedText variant="subtitle" color="secondary" style={styles.subheader}>
          Platform oversight and compliance metrics
        </ThemedText>

        <View style={styles.statGrid}>
          <View style={styles.statCard}>
            <ThemedText variant="heading" weight="bold">
              1,254
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              Active patients
            </ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText variant="heading" weight="bold" color="gold">
              98%
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              Consent coverage
            </ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText variant="heading" weight="bold" color="coral">
              12
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              Open incidents
            </ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText variant="heading" weight="semibold">
            Trust & Transparency
          </ThemedText>
          <View style={styles.card}>
            <ThemedText variant="body" color="secondary">
              Accessibility score: 94/100
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              Safety events this month: 2 (resolved)
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              Research contributions: 5 ongoing studies
            </ThemedText>
            <Button variant="outline" fullWidth style={styles.button}>
              View Impact Report
            </Button>
          </View>
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
    padding: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  header: {
    marginBottom: Spacing.sm,
  },
  subheader: {
    marginBottom: Spacing.xl,
  },
  statGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing['2xl'],
    flexWrap: 'wrap',
  },
  statCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: Colors.background.cardGlass,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderColor: Colors.border.medium,
    borderWidth: 1,
  },
  section: {
    marginBottom: Spacing['2xl'],
  },
  card: {
    backgroundColor: Colors.background.cardGlass,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderColor: Colors.border.medium,
    borderWidth: 1,
    marginTop: Spacing.md,
  },
  button: {
    marginTop: Spacing.lg,
  },
});
