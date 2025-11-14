import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { InputField } from '../../components/atoms/InputField';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function ClinicianLoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
            Clinician Access
          </ThemedText>
          <InputField label="Work Email" placeholder="you@clinic.com" keyboardType="email-address" style={styles.input} />
          <InputField label="Password" placeholder="••••••••" secureTextEntry style={styles.input} />
          <InputField label="2FA Code" placeholder="123456" keyboardType="numeric" style={styles.input} />
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
    borderWidth: 1,
  },
  title: {
    marginBottom: Spacing.xl,
  },
  input: {
    marginTop: Spacing.md,
  },
  button: {
    marginTop: Spacing.lg,
  },
  footer: {
    marginTop: Spacing.lg,
  },
});
