import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../../components/atoms/Button';
import { InputField } from '../../components/atoms/InputField';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function PatientLoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#08131c', '#0b1e29', '#0d2533']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>

          {/* Back Icon Button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>

          <View style={styles.card}>
            <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
              Patient Login
            </ThemedText>

            <ThemedText variant="body" color="secondary" align="center" style={styles.subtitle}>
              Welcome back to Livion. Your data remains safe and encrypted.
            </ThemedText>

            <InputField label="Email / Phone" placeholder="" keyboardType="email-address" style={styles.input} />
            <InputField label="Password" placeholder="" secureTextEntry style={styles.input} />

            <Button
              variant="primary"
              fullWidth
              style={styles.loginButton}
              textStyle={{ textAlign: "center" }}
              onPress={() => router.replace('/patient/dashboard/home')}
            >
                                          <ThemedText variant="label" weight="semibold" style={{ color: "#0f172a", textAlign: "center" }}>
                Sign In
              </ThemedText> </Button>
          </View>

          <ThemedText variant="caption" color="tertiary" align="center" style={styles.footer}>
            Thank you for choosing Livion.
          </ThemedText>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

/* Styles */
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

  loginButton: {
    marginTop: Spacing.xl,
  },

  footer: {
    marginTop: 20,
    marginBottom: 20,
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
