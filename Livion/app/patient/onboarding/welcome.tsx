import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Colors, Spacing } from '../../../constants/Colors';

/**
 * Welcome Screen
 * First screen in onboarding flow
 */
export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.content}>
          <ThemedText variant="display" weight="bold" align="center">
            Welcome to Livion
          </ThemedText>

          <ThemedText variant="subtitle" color="secondary" align="center" style={styles.subtitle}>
            Your trusted health companion
          </ThemedText>

          <View style={styles.featureList}>
            <ThemedText variant="body" color="secondary" style={styles.feature}>
              • Personalized health insights
            </ThemedText>
            <ThemedText variant="body" color="secondary" style={styles.feature}>
              • Care plan management
            </ThemedText>
            <ThemedText variant="body" color="secondary" style={styles.feature}>
              • Secure data privacy
            </ThemedText>
          </View>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => router.push('/patient/home')}
            style={styles.button}
          >
            Get Started
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
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  content: {
    alignItems: 'center',
  },
  subtitle: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  featureList: {
    marginVertical: Spacing.xl,
    alignSelf: 'stretch',
  },
  feature: {
    marginVertical: Spacing.sm,
  },
  button: {
    marginTop: Spacing.xl,
  },
});
