import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '@/components/atoms/Button';
import { InputField } from '@/components/atoms/InputField';
import { ThemedText } from '@/components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '@/constants/Colors';

export default function PatientRegisterScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      {/* Gradient background */}
      <LinearGradient
        colors={['#08131c', '#0b1e29', '#0d2533']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* Glow effects */}
      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>

          {/* Back Icon Button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>

          {/* Main Card */}
          <View style={styles.card}>
            <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
              Patient Register
            </ThemedText>

            <ThemedText variant="body" color="secondary" align="center" style={styles.subtitle}>
              Create your Livion account. Your data is encrypted and secure.
            </ThemedText>

            <InputField
              label="Email / Phone"
              placeholder=""
              keyboardType="email-address"
              style={styles.input}
            />

            <InputField
              label="Set a Password"
              placeholder=""
              secureTextEntry
              style={styles.input}
            />

            <InputField
              label="Confirm Password"
              placeholder=""
              secureTextEntry
              style={styles.input}
            />

            <InputField
              label="Bank ID (optional)"
              placeholder=""
              style={styles.input}
            />

            {/* Continue Button */}
            <Button
              variant="primary"
              fullWidth
              style={styles.nextButton}
              textStyle={{ textAlign: "center" }}
              onPress={() => router.replace('/patient/onboarding/consent')}
            >
                            <ThemedText variant="label" weight="semibold" style={{ color: "#0f172a", textAlign: "center" }}>
                Continue
              </ThemedText>
            </Button>
          </View>

          {/* Disclaimer */}
          <ThemedText variant="caption" color="tertiary" align="center" style={styles.footer}>
            By continuing, you agree to Livion’s data use policy.
          </ThemedText>

          {/* Already have account */}
          <View style={{ alignItems: "center", marginTop: Spacing.sm }}>
            <ThemedText variant="caption" color="tertiary" align="center">
              Already have an account?
            </ThemedText>

            <TouchableOpacity onPress={() => router.push('/patient/login')} style={{ marginTop: Spacing.xs , marginBottom: Spacing.lg *2}}>
              <ThemedText variant="caption" color="teal" weight="semibold" align="center">
                Log in here
              </ThemedText>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  safeArea: { flex: 1 },

  container: {
    flexGrow: 1,
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
    alignItems: 'center',
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    marginTop: Spacing.md,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(57, 73, 171, 0.22)',
  },

  card: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
  },

  title: {
    marginBottom: Spacing.sm,
    color: '#fff',
  },

  subtitle: {
    marginBottom: Spacing.xl,
  },

  input: {
    marginTop: Spacing.md,
    width: "100%",
  },

  nextButton: {
    marginTop: Spacing.xl,
  },

  footer: {
    marginBottom: 25,
    marginTop: 15,
  },

  glowTopRight: {
    position: 'absolute',
    width: 400,
    height: 400,
    right: -150,
    top: -100,
    borderRadius: 999,
    backgroundColor: Colors.primary.indigo,
    opacity: 0.12,
  },

  glowBottomLeft: {
    position: 'absolute',
    width: 480,
    height: 480,
    left: -200,
    bottom: -160,
    borderRadius: 999,
    backgroundColor: '#3949AB',
    opacity: 0.1,
  },
});
