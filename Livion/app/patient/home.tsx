import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';
import { CareTaskTile } from '../../components/molecules/CareTaskTile';
import { ConsentChip } from '../../components/molecules/ConsentChip';
import { InsightCard } from '../../components/molecules/InsightCard';
import { SafetyBanner } from '../../components/molecules/SafetyBanner';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';
import { useFadeIn, useSlideIn } from '../../hooks/useAnimations';
import { useMockData } from '../../hooks/useMockData';

/**
 * Patient Home Screen
 * Main dashboard with insights, care tasks, and safety information
 * Stardust-inspired design with deep navy background
 */
export default function PatientHomeScreen() {
  const { patientData } = useMockData();
  const fadeAnim = useFadeIn();
  const slideInStyle = useSlideIn('up', 30);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <ThemedText variant="display" weight="bold">
            Daily Pulse
          </ThemedText>
          <ThemedText variant="subtitle" color="secondary">
            Welcome back, {patientData.name}
          </ThemedText>
        </Animated.View>

        {/* Safety Banner */}
        <Animated.View style={[{ opacity: fadeAnim, transform: slideInStyle.transform }]}>
          <SafetyBanner
            type="info"
            title="Health Reminder"
            message="Your care team has reviewed your recent data. Everything looks good, keep up the great work!"
            style={styles.section}
          />
        </Animated.View>

        {/* Insights Section */}
        <Animated.View style={[{ opacity: fadeAnim }]}>
          <View style={styles.sectionHeader}>
            <ThemedText variant="heading" weight="semibold">
              Insights
            </ThemedText>
            <ThemedText variant="caption" color="tertiary">
              AI-generated, clinician-reviewed
            </ThemedText>
          </View>

          {patientData.insights.map((insight, index) => (
            <InsightCard
              key={insight.id}
              title={insight.title}
              reason={insight.reason}
              source={insight.source}
              evidence={insight.evidence}
              action={insight.action}
              expandable={!!insight.evidence}
              style={[styles.card, { marginTop: index > 0 ? Spacing.md : 0 }]}
            />
          ))}
        </Animated.View>

        {/* Care Tasks Section */}
        <Animated.View style={[{ opacity: fadeAnim }]}>
          <View style={styles.sectionHeader}>
            <ThemedText variant="heading" weight="semibold">
              Today's Tasks
            </ThemedText>
            <ThemedText variant="caption" color="tertiary">
              {patientData.careTasks.filter(t => t.status !== 'completed').length} remaining
            </ThemedText>
          </View>

          {patientData.careTasks.map((task, index) => (
            <CareTaskTile
              key={task.id}
              title={task.title}
              description={task.description}
              dueDate={task.dueDate}
              status={task.status}
              onPress={() => console.log('Task pressed:', task.id)}
              onSnooze={() => console.log('Snooze task:', task.id)}
              style={[styles.card, { marginTop: index > 0 ? Spacing.md : 0 }]}
            />
          ))}
        </Animated.View>

        {/* Privacy & Consent Section */}
        <Animated.View style={[{ opacity: fadeAnim }]}>
          <View style={styles.sectionHeader}>
            <ThemedText variant="heading" weight="semibold">
              Privacy & Consent
            </ThemedText>
            <ThemedText variant="caption" color="tertiary">
              Manage your data sharing preferences
            </ThemedText>
          </View>

          <View style={styles.consentCard}>
            {patientData.consents.map((consent) => (
              <ConsentChip
                key={consent.id}
                scope={consent.scope}
                status={consent.status}
              />
            ))}
          </View>
        </Animated.View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <ThemedText variant="caption" color="tertiary" align="center">
            This is general information, not a diagnosis. Always consult with your healthcare provider
            for medical advice.
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.primary, // Deep navy
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  header: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  section: {
    marginBottom: Spacing.md,
  },
  card: {
    marginBottom: Spacing.sm,
  },
  consentCard: {
    backgroundColor: Colors.background.cardGlass,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    padding: Spacing.md,
  },
  disclaimer: {
    marginTop: Spacing.xl,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border.subtle,
  },
});
