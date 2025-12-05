import { useNavigation } from '@react-navigation/native';
import { Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { AnimatedBlobBackground } from '../../../components/atoms/AnimatedBlobBackground';
import { Button } from '../../../components/atoms/Button';
import { InputField } from '../../../components/atoms/InputField';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { COLORS, Spacing } from '@/src/constants/Colors';


export default function PatientRegisterScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <AnimatedBlobBackground />

      <ScreenHeader />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Main Card */}
          <View style={styles.card}>
            <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
              Patient Register
            </ThemedText>

            <ThemedText variant="body" align="center" style={styles.subtitle}>
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
              onPress={() => navigation.navigate('Consent' as never)}
            >
              <ThemedText variant="label" weight="semibold" style={{ color: "#fff", textAlign: "center" }}>
                Continue
              </ThemedText>
            </Button>
          </View>

          {/* Disclaimer */}
          <ThemedText variant="caption" align="center" style={styles.footer}>
            By continuing, you agree to Livion's data use policy.
          </ThemedText>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flexGrow: 1,
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
    alignItems: 'center',
  },

  card: {
    padding: Spacing.xl,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 10 }, shadowRadius: 30 },
      android: { elevation: 6 },
    }),
  },

  title: {
    marginBottom: Spacing.sm,
    color: COLORS.textPrimary,
  },

  subtitle: {
    marginBottom: Spacing.xl,
    color: COLORS.textSecondary,
  },

  input: {
    marginTop: Spacing.md,
    width: "100%",
  },

  nextButton: {
    marginTop: Spacing.xl,
    backgroundColor: COLORS.teal,
  },

  footer: {
    marginBottom: 25,
    marginTop: 15,
    color: COLORS.textSecondary,
  },
});
