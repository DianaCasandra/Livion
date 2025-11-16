import { SafeAreaView, ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';
import { router } from 'expo-router';

export default function AdminDashboard() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Back Button */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ThemedText variant="body" color="teal" style={styles.backText}>
            ⪻ Back
          </ThemedText>
        </Pressable>

        {/* Header */}
        <ThemedText variant="display" weight="bold" style={styles.header}>
          Admin Dashboard
        </ThemedText>
        <ThemedText variant="subtitle" color="secondary" style={styles.subheader}>
          Platform oversight and compliance metrics
        </ThemedText>

        {/* Stats */}
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

        {/* Trust & Transparency */}
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

        {/* ================= NEW CONTENT ================= */}

        {/* Consent Ledger */}
        <View style={styles.section}>
          <ThemedText variant="heading" weight="semibold">
            Consent Ledger
          </ThemedText>

          <View style={styles.card}>
            <ThemedText variant="body">
              • 12,450 total consents recorded
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              • Latest event: Patient revoked sharing with clinician (2h ago)
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              • 99.1% synchronization success across nodes
            </ThemedText>

            <Button variant="outline" fullWidth style={styles.button}>
              Open Ledger Explorer
            </Button>
          </View>
        </View>

        {/* Audit Events */}
        <View style={styles.section}>
          <ThemedText variant="heading" weight="semibold">
            Security Audit Log
          </ThemedText>

          <View style={styles.card}>
            <ThemedText variant="body">
              • 342 access events (24h)
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              • 3 flagged anomalies (IP mismatch)
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              • 100% logs preserved (immutable)
            </ThemedText>

            <Button variant="outline" fullWidth style={styles.button}>
              View Audit Feed
            </Button>
          </View>
        </View>

        {/* Model Governance */}
        <View style={styles.section}>
          <ThemedText variant="heading" weight="semibold">
            Model Governance
          </ThemedText>

          <View style={styles.card}>
            <ThemedText variant="body" color="secondary">
              • AI model version: 2.3.7 (stable)
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              • Drift level: Low (1.2%)
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              • Last safety audit: Passed (5 days ago)
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              • Active guardrails: Bias check, Outlier detection, Trace logging
            </ThemedText>

            <Button variant="outline" fullWidth style={styles.button}>
              Open Governance Dashboard
            </Button>
          </View>
        </View>

        <View style={{ height: 80 }} />
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

  /* Back button */
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
    marginTop: 30,
  },
  backText: {
    fontSize: 18,
  },

  /* Header */
  header: {
    marginBottom: Spacing.sm,
  },
  subheader: {
    marginBottom: Spacing.xl,
  },

  /* Stats */
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

  /* Sections */
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
