import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { Chip } from '../../../components/atoms/Chip';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';

export default function DataConnectionsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <ThemedText variant="display" weight="bold" style={styles.title}>
            Data Connections
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.body}>
            Connect wearable devices and health records to unlock richer insights.
          </ThemedText>

          <View style={styles.connections}>
            <View style={styles.connectionRow}>
              <ThemedText variant="subtitle" weight="semibold">
                Apple Health
              </ThemedText>
              <Chip label="Connected" variant="status-ok" />
            </View>
            <View style={styles.connectionRow}>
              <ThemedText variant="subtitle" weight="semibold">
                Google Fit
              </ThemedText>
              <Chip label="Connect" variant="teal" />
            </View>
            <View style={styles.connectionRow}>
              <ThemedText variant="subtitle" weight="semibold">
                Glucose Monitor
              </ThemedText>
              <Chip label="Sync Scheduled" variant="status-attention" />
            </View>
          </View>

          <Button variant="primary" fullWidth style={styles.button} onPress={() => router.push('/patient/onboarding/risk')}>
            Continue
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  card: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.background.cardGlass,
    borderColor: Colors.border.medium,
    borderWidth: 1,
  },
  title: {
    marginBottom: Spacing.md,
  },
  body: {
    marginBottom: Spacing.lg,
  },
  connections: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  connectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginTop: Spacing.sm,
  },
});
