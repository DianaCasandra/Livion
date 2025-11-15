import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Colors, Spacing } from '../../../constants/Colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >

        <View style={styles.topSection}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ThemedText variant="body" color="teal" style={styles.backButtonText}>
              ⪻ Back to Onboarding
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.middleSection}>
          <ThemedText
            variant="heading"
            color="secondary"
            align="center"
            style={styles.softTitle}
          >
            Your health story. Yours to share.
          </ThemedText>

          <TouchableOpacity
            onPress={() => router.push('/patient/onboarding/userpromise')}
            style={styles.linkButton}
          >
            <ThemedText variant="body" color="teal" align="center" style={styles.linkText}>
              User Promise & Privacy Explainer
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSection}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => router.push('/patient/onboarding/register')}
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
    padding: Spacing.xl,
  },
  topSection: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 25,
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40, // optional
  },
  content: {
    alignItems: 'center',
  },

  softTitle: {
    marginBottom: Spacing.lg,
    opacity: 0.9,
    fontSize: 20,
    lineHeight: 28,
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
    paddingVertical: 15,
    paddingHorizontal: -30,
  },
  backButtonText: {
    fontSize: 16,
  },
});