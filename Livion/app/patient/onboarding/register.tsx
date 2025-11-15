import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { InputField } from '../../../components/atoms/InputField';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';

export default function PatientLoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <ThemedText variant="body" color="teal" style={styles.backButtonText}>
                  ← Back to Onboarding
                </ThemedText>
              </TouchableOpacity>
      

        <View style={styles.card}>
          <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
            Patient Register
          </ThemedText>
          <InputField label="Email / Phone* " placeholder="you@example.com / +40 **** *** ***" keyboardType="email-address" style={styles.input} />
          <InputField label="Password*" placeholder="••••••••" secureTextEntry style={styles.input} />
          <InputField label="Confirm password*" placeholder="••••••••" secureTextEntry style={styles.input} />
          <InputField label="Bank ID" placeholder="••••••••" secureTextEntry style={styles.input} />          
          <Button variant="primary" fullWidth style={styles.button} onPress={() => router.replace('/patient/onboarding/consent')}>
            Sign In
          </Button>
          <ThemedText variant="caption" color="tertiary" align="center" style={styles.footer}>
            By continuing, you consent to Livion's data use policy.
            Already have an account? 
            <TouchableOpacity
                        onPress={() => router.push('/patient/login')}
                        style={styles.linkButton}
                      >
                        <ThemedText
                          variant="body"
                          color="teal"
                          align="center"
                          style={styles.linkText}
                        >
                          Log in here.
                        </ThemedText>
                      </TouchableOpacity>
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
  backButton: {
    marginBottom: Spacing.md,
  },
  backButtonText: {
    marginBottom: Spacing.md,
  },
  linkButton: {
    marginTop: Spacing.sm,
  },
  linkText: {
    marginTop: Spacing.sm,
  },
});
