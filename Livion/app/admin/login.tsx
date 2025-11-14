import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { InputField } from '../../components/atoms/InputField';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function AdminLoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
            Admin Console
          </ThemedText>
          <InputField label="Admin Email" placeholder="you@livion.com" keyboardType="email-address" style={styles.input} />
          <InputField label="Password" placeholder="••••••••" secureTextEntry style={styles.input} />
          <InputField label="Security Key" placeholder="Enter security token" style={styles.input} />
          <Button variant="primary" fullWidth style={styles.button} onPress={() => router.replace('/admin/dashboard')}>
            Enter Console
          </Button>
          <ThemedText variant="caption" color="tertiary" align="center" style={styles.footer}>
            Admin access is monitored. Contact security if you suspect unauthorized use.
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
