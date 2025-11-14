import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { ConsentChip } from '../../../components/molecules/ConsentChip';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';

export default function ConsentScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <ThemedText variant="display" weight="bold" style={styles.title}>
            Consent Preferences
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.body}>
            Livion collects and uses your health data to deliver personalized care insights. Review the scopes below and select what you're comfortable sharing.
          </ThemedText>

          <View style={styles.consents}>
            <ConsentChip scope="Health Records" status="active" />
            <ConsentChip scope="Activity Data" status="pending" />
            <ConsentChip scope="Research Participation" status="revoked" />
          </View>

          <Button variant="primary" fullWidth style={styles.button} onPress={() => router.push('/patient/home')}>
            Save & Continue
          </Button>
        </View>
        <ThemedText variant="caption" color="tertiary" align="center" style={styles.disclaimer}>
          You can change your consent preferences at any time from your profile.
        </ThemedText>
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
  consents: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  button: {
    marginTop: Spacing.sm,
  },
  disclaimer: {
    marginTop: Spacing.xl,
  },
});
