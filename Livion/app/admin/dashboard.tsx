import { SafeAreaView, ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function AdminDashboard() {
  return (
    <View style={styles.root}>
      {/* Elegant admin gradient */}
      <LinearGradient
        colors={['#081829', '#0A2433', '#103A48']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* Soft background glows */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />

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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  container: {
    padding: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  },

  /* Back button */
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
    marginTop: 10,
  },
  backText: {
    fontSize: 14,
    color: Colors.primary.teal,
  },

  /* Header */
  header: {
    color: '#fff',
    marginBottom: Spacing.xs,
    fontSize: 32,
  },
  subheader: {
    marginBottom: Spacing.xl,
    fontSize: 14,
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
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
  },

  /* Sections */
  section: {
    marginBottom: Spacing['2xl'],
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    marginTop: Spacing.md,
  },

  button: {
    marginTop: Spacing.lg,
  },

  /* Glows */
  glowTopRight: {
    position: 'absolute',
    width: 360,
    height: 360,
    right: -140,
    top: -90,
    borderRadius: 999,
    backgroundColor: '#1e3a5f',
    opacity: 0.1,
  },
  glowBottomLeft: {
    position: 'absolute',
    width: 520,
    height: 520,
    left: -200,
    bottom: -160,
    borderRadius: 999,
    backgroundColor: '#0d9488',
    opacity: 0.08,
  },
});
