import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { InputField } from '../../components/atoms/InputField';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

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
            ⪻ Back
          </ThemedText>
        </TouchableOpacity>


        <View style={styles.card}>
          <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
            Patient Login
          </ThemedText>
          <InputField label="Email / Phone " placeholder="" keyboardType="email-address" style={styles.input} />
          <InputField label="Password" placeholder="" secureTextEntry style={styles.input} />
          <Button variant="primary" fullWidth style={styles.button} onPress={() => router.replace('/patient/dashboard/home')}>
            Sign In
          </Button>
          <ThemedText variant="caption" color="tertiary" align="center" style={styles.footer}>
            Thank you for choosing Livion.
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
    marginBottom: 20,
  },
  backButtonText: {
    marginBottom: Spacing.md,
    fontSize: 18,
  },
});
