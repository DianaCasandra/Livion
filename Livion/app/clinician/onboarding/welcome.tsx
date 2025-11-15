import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Colors, Spacing } from '../../../constants/Colors';

export default function ClinicianWelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ThemedText variant="body" color="teal" style={styles.backButtonText}>
            ← Back
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.content}>
          {/* Title */}
          <ThemedText
            variant="heading"
            color="secondary"
            align="center"
            style={styles.softTitle}
          >
            Welcome to Livion
          </ThemedText>

          {/* Subtitle */}
          <ThemedText
            variant="body"
            color="indigo"
            align="center"
            style={styles.subtitle}
          >
            Thank you for joining the clinician community of Livion.
          </ThemedText>

          {/* Link-style button */}
          <TouchableOpacity
            //onPress={() => router.push('/clinician/onboarding/register')}
            style={styles.linkButton}
          >
            <ThemedText
              variant="body"
              color="teal"
              align="center"
              style={styles.linkText}
            >
              Learn how Livion supports your workflow
            </ThemedText>
          </TouchableOpacity>

          {/* Spacer */}
          <View style={{ height: Spacing.xl }} />

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => router.push('/clinician/onboarding/register')}
            style={styles.button}
          >
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

  softTitle: {
    marginBottom: Spacing.sm,
    opacity: 0.95,
    fontSize: 24,
    lineHeight: 34,
  },

  subtitle: {
    marginBottom: Spacing.lg,
    opacity: 0.85,
    fontSize: 16,
    lineHeight: 24,
  },

  linkButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },

  linkText: {
    textDecorationLine: 'underline',
    fontSize: 15,
  },

  button: {
    marginTop: Spacing.xl,
  },

  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  backButtonText: {
    fontSize: 14,
  },
});
