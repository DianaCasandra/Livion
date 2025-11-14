import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';
import { CareTaskTile } from '../../components/molecules/CareTaskTile';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';
import { useMockData } from '../../hooks/useMockData';

export default function CarePlanScreen() {
  const { patientData } = useMockData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText variant="display" weight="bold" style={styles.header}>
          Care Plan
        </ThemedText>

        <View style={styles.section}>
          <ThemedText variant="heading" weight="semibold">
            Active Tasks
          </ThemedText>
          {patientData.careTasks.map((task) => (
            <CareTaskTile
              key={task.id}
              title={task.title}
              description={task.description}
              dueDate={task.dueDate}
              status={task.status}
              style={styles.card}
            />
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText variant="heading" weight="semibold">
            Clinical Notes
          </ThemedText>
          <View style={styles.noteCard}>
            <ThemedText variant="body" color="secondary">
              Last reviewed by Dr. Harper on Oct 04, 2025. Continue daily monitoring and weekly check-ins. Adjustment to medication scheduled in next visit.
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
  section: {
    marginBottom: Spacing['2xl'],
  },
  card: {
    marginTop: Spacing.md,
  },
  noteCard: {
    marginTop: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.background.cardGlass,
    borderColor: Colors.border.medium,
    borderWidth: 1,
  },
});
