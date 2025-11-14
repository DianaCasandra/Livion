import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';
import { CareTaskTile } from '../../components/molecules/CareTaskTile';
import { ConsentChip } from '../../components/molecules/ConsentChip';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';
import { useMockData } from '../../hooks/useMockData';

export default function PatientDetailsScreen() {
  const { patientData } = useMockData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText variant="display" weight="bold" style={styles.header}>
          {patientData.name}
        </ThemedText>
        <ThemedText variant="body" color="secondary" style={styles.subheader}>
          Age {patientData.age} · {patientData.conditions.join(', ')}
        </ThemedText>

        <View style={styles.section}>
          <ThemedText variant="heading" weight="semibold">
            Consents
          </ThemedText>
          <View style={styles.chipList}>
            {patientData.consents.map((consent) => (
              <ConsentChip key={consent.id} scope={consent.scope} status={consent.status} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText variant="heading" weight="semibold">
            Active Care Plan
          </ThemedText>
          {patientData.careTasks.map((task) => (
            <CareTaskTile
              key={task.id}
              title={task.title}
              description={task.description}
              dueDate={task.dueDate}
              status={task.status}
              style={styles.task}
            />
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText variant="heading" weight="semibold">
            Notes
          </ThemedText>
          <View style={styles.noteCard}>
            <ThemedText variant="body" color="secondary">
              Upcoming review scheduled for Oct 14, 2025. Monitor dietary intake and exercise routine. Consider medication adjustment if fasting glucose remains elevated.
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
    marginBottom: Spacing.sm,
  },
  subheader: {
    marginBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing['2xl'],
  },
  chipList: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  task: {
    marginTop: Spacing.md,
  },
  noteCard: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background.cardGlass,
    borderColor: Colors.border.medium,
    borderWidth: 1,
  },
});
