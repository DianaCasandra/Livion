import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80' }} style={styles.avatar} />
          <ThemedText variant="heading" weight="bold" align="center" style={styles.name}>
            Jane Doe
          </ThemedText>
          <ThemedText variant="body" color="secondary" align="center">
            Member since 2024 · Type 2 Diabetes
          </ThemedText>
          <Button variant="outline" size="sm" style={styles.editButton}>
            Edit Profile
          </Button>
        </View>

        <View style={styles.section}>
          <ThemedText variant="subtitle" weight="semibold">
            Care Team
          </ThemedText>
          <View style={styles.card}>
            <ThemedText variant="body" color="secondary">
              Dr. Harper · Endocrinologist
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              Nurse Lee · Care Coordinator
            </ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText variant="subtitle" weight="semibold">
            Preferences
          </ThemedText>
          <View style={styles.card}>
            <ThemedText variant="body" color="secondary">
              Notifications: Daily reminders at 8 AM
            </ThemedText>
            <ThemedText variant="body" color="secondary">
              Data sharing: Active consents (2)
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
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.md,
  },
  name: {
    marginBottom: Spacing.sm,
  },
  editButton: {
    marginTop: Spacing.md,
  },
  section: {
    marginBottom: Spacing['2xl'],
  },
  card: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background.cardGlass,
    borderColor: Colors.border.medium,
    borderWidth: 1,
  },
});
