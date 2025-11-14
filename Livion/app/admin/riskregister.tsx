import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { Chip } from '../../components/atoms/Chip';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function RiskRegisterScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText variant="display" weight="bold" style={styles.header}>
          Risk Register
        </ThemedText>
        <ThemedText variant="subtitle" color="secondary" style={styles.subheader}>
          Track, assign, and resolve platform risks.
        </ThemedText>

        <View style={styles.card}>
          <View style={styles.row}>
            <ThemedText variant="subtitle" weight="semibold">
              Data Sync Delays
            </ThemedText>
            <Chip label="High" variant="status-action" />
          </View>
          <ThemedText variant="body" color="secondary" style={styles.body}>
            Region EU-West experiencing delayed wearable data imports. Impacting 42 patients.
          </ThemedText>
          <Button variant="outline" size="sm" style={styles.button}>
            Assign Follow-Up
          </Button>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <ThemedText variant="subtitle" weight="semibold">
              Policy Update Review
            </ThemedText>
            <Chip label="Medium" variant="status-attention" />
          </View>
          <ThemedText variant="body" color="secondary" style={styles.body}>
            Annual consent policy refresh pending legal approval. Draft completed and shared.
          </ThemedText>
          <Button variant="outline" size="sm" style={styles.button}>
            View Details
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
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderColor: Colors.border.medium,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  body: {
    marginBottom: Spacing.md,
  },
  button: {
    alignSelf: 'flex-start',
  },
});
