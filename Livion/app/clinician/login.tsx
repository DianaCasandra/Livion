import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { InputField } from '../../components/atoms/InputField';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function ClinicianLoginScreen() {
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

          {/* Back Icon */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>

          {/* Main Card */}
          <View style={styles.card}>
            <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
              Clinician Access
            </ThemedText>

            <InputField
              label="Work Email"
              placeholder="you@clinic.com"
              keyboardType="email-address"
              style={styles.input}
            />

            <InputField
              label="Password"
              placeholder=""
              secureTextEntry
              style={styles.input}
            />

            <Button
              variant="primary"
              fullWidth
              style={styles.nextButton}
              textStyle={{ textAlign: "center" }}
              onPress={() => router.replace('/clinician/dashboard/home')}
            >
                <ThemedText variant="label" weight="semibold" style={{ color: "#000000ff", textAlign: "center" }}>
                Sign In Securely
              </ThemedText>
            </Button>
            <ThemedText variant="caption" color="tertiary" align="center" style={styles.footer}>
              Protected under HIPAA and GDPR. Contact support for access issues.
            </ThemedText>
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
    padding: 6,
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
    marginBottom: Spacing.md,
    color: '#fff',
  },

  input: {
    marginTop: Spacing.md,
    width: "100%",
  },

  nextButton: {
    marginTop: Spacing.lg,
  },

  footer: {
    marginTop: Spacing.lg,
    textAlign: 'center',
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
