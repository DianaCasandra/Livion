/*import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { Chip } from '../../components/atoms/Chip';
import { ThemedText } from '../../components/atoms/ThemedText';
import { useUser } from '../../components/providers/UserProvider';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function SettingsScreen() {
  const { user, switchRole } = useUser();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText variant="display" weight="bold" style={styles.header}>
          Settings
        </ThemedText>

        <View style={styles.card}>
          <ThemedText variant="subtitle" weight="semibold">
            Current Role
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.body}>
            Signed in as {user?.name ?? 'Guest'} ({user?.role ?? 'none'})
          </ThemedText>
          <View style={styles.roleSwitcher}>
            <Chip label="Patient" variant={user?.role === 'patient' ? 'status-ok' : 'teal'} style={styles.chip} />
            <Button variant="ghost" onPress={() => switchRole('patient')}>
              Switch
            </Button>
          </View>
          <View style={styles.roleSwitcher}>
            <Chip label="Clinician" variant={user?.role === 'clinician' ? 'status-ok' : 'indigo'} style={styles.chip} />
            <Button variant="ghost" onPress={() => switchRole('clinician')}>
              Switch
            </Button>
          </View>
          <View style={styles.roleSwitcher}>
            <Chip label="Admin" variant={user?.role === 'admin' ? 'status-ok' : 'gold'} style={styles.chip} />
            <Button variant="ghost" onPress={() => switchRole('admin')}>
              Switch
            </Button>
          </View>
        </View>

        <View style={styles.card}>
          <ThemedText variant="subtitle" weight="semibold">
            Notifications
          </ThemedText>
          <ThemedText variant="body" color="secondary">
            Daily reminders at 8 AM
          </ThemedText>
          <Button variant="outline" fullWidth style={styles.button}>
            Manage Alerts
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
  body: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  roleSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  chip: {
    flex: 1,
  },
  button: {
    marginTop: Spacing.md,
  },
});
*/