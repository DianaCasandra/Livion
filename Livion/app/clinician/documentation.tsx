import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function DocumentationScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText variant="display" weight="bold" style={styles.header}>
          Clinical Documentation
        </ThemedText>
        <ThemedText variant="body" color="secondary" style={styles.subheader}>
          Record visit notes and plan updates.
        </ThemedText>

        <View style={styles.card}>
          <ThemedText variant="subtitle" weight="semibold" style={styles.sectionTitle}>
            Visit Summary Draft
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.body}>
            Oct 07, 2025 · Telehealth visit
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.body}>
            Assessment: Glucose trends improving, continue current regimen.
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.body}>
            Plan: Reassess in two weeks, monitor dietary journaling.
          </ThemedText>
          <Button variant="primary" fullWidth style={styles.button}>
            Save to EHR
          </Button>
        </View>

        <View style={styles.card}>
          <ThemedText variant="subtitle" weight="semibold" style={styles.sectionTitle}>
            Shared Notes
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.body}>
            Next care conference scheduled for Oct 10. Prepare data visualizations and update care plan for review.
          </ThemedText>
          <Button variant="outline" fullWidth style={styles.button}>
            Download PDF
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
    padding: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  header: {
    marginBottom: Spacing.sm,
  },
  subheader: {
    marginBottom: Spacing.xl,
  },
  card: {
    backgroundColor: Colors.background.cardGlass,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderColor: Colors.border.medium,
    borderWidth: 1,
    marginBottom: Spacing['2xl'],
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
  },
  body: {
    marginBottom: Spacing.sm,
  },
  button: {
    marginTop: Spacing.lg,
  },
});
