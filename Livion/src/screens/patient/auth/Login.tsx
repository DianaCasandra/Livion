import { useUser } from '@/components/providers';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../../../../components/atoms/Button';
import { InputField } from '../../../../components/atoms/InputField';
import { ThemedText } from '../../../../components/atoms/ThemedText';

export default function PatientLoginScreen() {
  const navigation = useNavigation();
  const { loginAsPatient } = useUser();

  return (
    <View style={styles.root}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={26} color="#333" />
          </TouchableOpacity>

          {/* White Card */}
          <View style={styles.card}>
            <ThemedText variant="display" weight="bold" style={styles.title}>
              Autentificare pacient
            </ThemedText>

            <ThemedText variant="body" color="secondary" style={styles.subtitle}>
              Conectează-te pentru a accesa datele tale medicale.
            </ThemedText>

            <InputField
              label="Email / Telefon"
              placeholder=""
              keyboardType="email-address"
              style={styles.input}
            />
            <InputField
              label="Parolă"
              placeholder=""
              secureTextEntry
              style={styles.input}
            />

            <Button
              variant="primary"
              fullWidth
              style={styles.loginButton}
              onPress={() => {
                loginAsPatient();
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" as never }],
                });
              }}
            >
              <ThemedText
                variant="label"
                weight="semibold"
                style={styles.loginText}
              >
                Conectare
              </ThemedText>
            </Button>
          </View>

          <ThemedText
            variant="caption"
            color="tertiary"
            align="center"
            style={styles.footer}
          >
            Mulțumim că folosești Livion.
          </ThemedText>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

/* ------- Styles (Regina Maria style) ------- */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },

  container: {
    flexGrow: 1,
    padding: 24,
  },

  backButton: {
    padding: 6,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 24,
  },

  title: {
    fontSize: 24,
    color: '#111',
    marginBottom: 8,
  },

  subtitle: {
    marginBottom: 24,
    fontSize: 14,
  },

  input: {
    marginTop: 16,
  },

  loginButton: {
    marginTop: 24,
    backgroundColor: '#03d0c5',
    borderRadius: 12,
    paddingVertical: 14,
  },

  loginText: {
    color: '#fff',
    textAlign: "center",
  },

  footer: {
    marginTop: 20,
  },
});
