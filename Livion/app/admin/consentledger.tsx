import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';
import { ConsentChip } from '../../components/molecules/ConsentChip';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function ConsentLedgerScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText variant="display" weight="bold" style={styles.header}>
          Consent Ledger
        </ThemedText>
        <ThemedText variant="subtitle" color="secondary" style={styles.subheader}>
          Audit trail of consent changes across the platform.
        </ThemedText>

        <View style={styles.entry}>
          <View style={styles.row}>
            <ConsentChip scope="Health Records" status="active" />
            <ThemedText variant="caption" color="tertiary">
              Oct 07, 2025 · Jane Doe
            </ThemedText>
          </View>
          <ThemedText variant="body" color="secondary">
            Patient reinstated sharing of clinical notes after care plan review.
          </ThemedText>
        </View>

        <View style={styles.entry}>
          <View style={styles.row}>
            <ConsentChip scope="Research Program" status="revoked" />
            <ThemedText variant="caption" color="tertiary">
              Oct 06, 2025 · Mark Lee
            </ThemedText>
          </View>
          <ThemedText variant="body" color="secondary">
            Patient opted out due to relocation. System updated retention timers.
          </ThemedText>
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
  entry: {
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
});
