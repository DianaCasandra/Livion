import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { InputField } from '../../components/atoms/InputField';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function SymptomsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText variant="display" weight="bold" style={styles.header}>
          Symptom Log
        </ThemedText>

        <View style={styles.card}>
          <ThemedText variant="subtitle" weight="semibold" style={styles.cardTitle}>
            Today's Check-In
          </ThemedText>
          <InputField label="How are you feeling today?" placeholder="Describe your symptoms..." multiline style={styles.input} />
          <InputField label="Pain level (1-10)" placeholder="e.g. 4" keyboardType="numeric" style={styles.input} />
          <InputField label="Notes" placeholder="Anything else your care team should know?" multiline style={styles.input} />
          <Button variant="primary" fullWidth style={styles.submitButton}>
            Submit Log
          </Button>
        </View>

        <View style={styles.history}>
          <ThemedText variant="heading" weight="semibold">
            Recent Entries
          </ThemedText>
          <View style={styles.historyCard}>
            <ThemedText variant="body" color="secondary">
              Oct 07 • Mild fatigue, slight headache. Pain level: 3/10.
            </ThemedText>
            <ThemedText variant="caption" color="tertiary" style={styles.disclaimer}>
              This is general information, not a diagnosis.
            </ThemedText>
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
  cardTitle: {
    marginBottom: Spacing.md,
  },
  input: {
    marginTop: Spacing.md,
  },
  submitButton: {
    marginTop: Spacing.lg,
  },
  history: {
    marginTop: Spacing.lg,
  },
  historyCard: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background.cardGlass,
    borderColor: Colors.border.subtle,
    borderWidth: 1,
  },
  disclaimer: {
    marginTop: Spacing.sm,
  },
});
