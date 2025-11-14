import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { ThemedText } from '../../components/atoms/ThemedText';
import { CareTaskTile } from '../../components/molecules/CareTaskTile';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';
import { useMockData } from '../../hooks/useMockData';

export default function ClinicianDashboard() {
  const { patientData } = useMockData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText variant="display" weight="bold" style={styles.header}>
          Clinician Dashboard
        </ThemedText>
        <ThemedText variant="subtitle" color="secondary" style={styles.subtitle}>
          Today's alerts and patient insights
        </ThemedText>

        <View style={styles.statGrid}>
          <View style={styles.statCard}>
            <ThemedText variant="heading" weight="bold">
              14
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              Patients monitored
            </ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText variant="heading" weight="bold" color="gold">
              3
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              Urgent reviews
            </ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText variant="heading" weight="semibold">
            Priority Overview
          </ThemedText>
          {patientData.insights.map((insight) => (
            <View key={insight.id} style={styles.insightCard}>
              <ThemedText variant="subtitle" weight="semibold">
                {insight.title}
              </ThemedText>
              <ThemedText variant="body" color="secondary" style={styles.insightBody}>
                {insight.reason}
              </ThemedText>
              <Button variant="secondary" size="sm" style={styles.reviewButton}>
                Review patient
              </Button>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText variant="heading" weight="semibold">
            Care Tasks Requiring Follow-Up
          </ThemedText>
          {patientData.careTasks
            .filter((task) => task.status !== 'completed')
            .map((task) => (
              <CareTaskTile
                key={task.id}
                title={task.title}
                description={task.description}
                dueDate={task.dueDate}
                status={task.status}
                style={styles.taskCard}
              />
            ))}
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
  subtitle: {
    marginBottom: Spacing.xl,
  },
  statGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing['2xl'],
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background.cardGlass,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderColor: Colors.border.medium,
    borderWidth: 1,
  },
  section: {
    marginBottom: Spacing['2xl'],
  },
  insightCard: {
    backgroundColor: Colors.background.cardGlass,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderColor: Colors.border.medium,
    borderWidth: 1,
    marginTop: Spacing.md,
  },
  insightBody: {
    marginVertical: Spacing.sm,
  },
  reviewButton: {
    alignSelf: 'flex-start',
  },
  taskCard: {
    marginTop: Spacing.md,
  },
});
