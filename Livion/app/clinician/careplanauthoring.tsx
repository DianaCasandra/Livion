import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { InputField } from '../../components/atoms/InputField';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function CarePlanAuthoringScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText variant="display" weight="bold" style={styles.header}>
          Author Care Plan
        </ThemedText>
        <ThemedText variant="body" color="secondary" style={styles.subheader}>
          Draft updates before sharing with the patient.
        </ThemedText>

        <View style={styles.card}>
          <InputField label="Care Plan Title" placeholder="e.g. Glucose Stabilization Plan" style={styles.input} />
          <InputField
            label="Goals"
            placeholder="Improve fasting glucose to 110 mg/dL within 6 weeks."
            multiline
            style={styles.input}
          />
          <InputField
            label="Daily Tasks"
            placeholder="1. Morning glucose check
2. 30 min light activity
3. Evening medication review"
            multiline
            style={styles.input}
          />
          <InputField
            label="Notes for Care Team"
            placeholder="Add any context or follow-up steps for next visit."
            multiline
            style={styles.input}
          />
          <Button variant="primary" fullWidth style={styles.button}>
            Save Draft
          </Button>
          <Button variant="outline" fullWidth style={styles.button}>
            Share with Patient
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
  },
  input: {
    marginTop: Spacing.md,
  },
  button: {
    marginTop: Spacing.md,
  },
});
