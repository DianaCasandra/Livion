import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { InputField } from '../../components/atoms/InputField';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function ClinicianLoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ThemedText variant="body" color="teal" style={styles.backButtonText}>
            ⪻ Back
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.card}>
          <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
            Clinician Access
          </ThemedText>
          <InputField label="Work Email" placeholder="you@clinic.com" keyboardType="email-address" style={styles.input} />
          <InputField label="Password" placeholder="" secureTextEntry style={styles.input} />
          <Button variant="primary" fullWidth style={styles.button} onPress={() => router.replace('/clinician/dashboard')}>
            Sign In Securely
          </Button>
          <ThemedText variant="caption" color="tertiary" align="center" style={styles.footer}>
            Protected under HIPAA and GDPR. Contact support for access issues.
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  card: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.background.cardGlass,
    borderColor: Colors.border.medium,
    borderWidth: 3,
    alignItems: 'center', // <-- center all children horizontally
  },

  input: {
    marginTop: Spacing.md,
    width: '109%',          // <-- make it responsive but not overflowing
    maxWidth: 400,         // optional: prevents overly wide inputs on large screens
    marginLeft: -10,
  },
  title: {
    marginBottom: Spacing.xl,
  },
  button: {
    marginTop: Spacing.lg,
  },
  footer: {
    marginTop: Spacing.lg,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    marginTop: -10,
    marginBottom: Spacing.md,
    fontSize: 17,
  },
});
