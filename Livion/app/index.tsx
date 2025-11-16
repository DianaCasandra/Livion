import { LinearGradient } from 'expo-linear-gradient'; // Adăugat pentru fundalul dinamic
import { Href, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  Platform, // Adăugat pentru Platform.OS în StatusBar
  SafeAreaView,
  ScrollView,
  StatusBar, // Adăugat pentru StatusBar
  StyleSheet,
  View,
} from 'react-native';
import { Button } from '../components/atoms/Button';
import { ThemedText } from '../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../constants/Colors';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window'); // Adăugat, deși nu e direct folosit pentru card

export default function LandingPage() {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const router = useRouter();

  const toggleRole = (role: string) => {
    setExpandedRole(prev => (prev === role ? null : role));
  };

  const roles = [
    { key: 'patient', label: 'Patient', twoOptions: true },
    { key: 'clinician', label: 'Clinician', twoOptions: true },
    { key: 'coordinator', label: 'Care Coordinator', twoOptions: false },
    { key: 'admin', label: 'Admin', twoOptions: false },
  ];

  return (
    <View style={styles.root}> {/* Schimbat SafeAreaView în View pentru a permite fundalul pe toată suprafața */}
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* background ombré + soft glow layers din HomeGlossyAnimated */}
      <LinearGradient
        colors={["#07203f", "#04363a", "#06233d"]}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* subtle radial glows (pure view overlays) din HomeGlossyAnimated */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />

      <SafeAreaView style={styles.safeAreaContent}> {/* Wrapper pentru conținut pentru a respecta zona sigură */}
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            {/* Titlu */}
            <ThemedText variant="display" weight="bold" style={styles.title}>
              Livion
            </ThemedText>

            <ThemedText variant="body" color="secondary" style={styles.subtitle}>
              Powered by Minai
            </ThemedText>

            <ThemedText variant="heading" style={styles.sectionLabel}>
              Choose your role
            </ThemedText>

            {/* Roluri */}
            <View style={styles.rolesContainer}>
              {roles.map(role => (
                <View key={role.key} style={styles.roleWrapper}>
                  {/* Butonul principal de Rol */}
                  <Button
                    variant="primary"
                    fullWidth
                    onPress={() => toggleRole(role.key)}
                  >
                    {role.label}
                  </Button>

                  {/* Sub-butoane */}
                  {expandedRole === role.key && (
                    <View style={styles.subButtonsContainer}>
                      {role.twoOptions ? (
                        <>
                          <Button
                            variant="secondary"
                            style={styles.subButton}
                            onPress={() =>
                              router.push(`/${role.key}/onboarding/welcome` as Href)
                            }
                          >
                            Onboarding
                          </Button>
                          <Button
                            variant="secondary"
                            style={styles.subButton}
                            onPress={() =>
                              router.push(`/${role.key}/login` as Href)
                            }
                          >
                            Login
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="secondary"
                          style={styles.subButton}
                          onPress={() =>
                            router.push(`/${role.key}/login` as Href)
                          }
                        >
                          Login
                        </Button>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { // Stilul 'root' preluat din HomeGlossyAnimated.tsx
    flex: 1,
    backgroundColor: '#041025', // Fundalul de bază, va fi acoperit de LinearGradient
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0, // Ajustează padding-ul pentru StatusBar, lăsând iOS să fie gestionat de SafeAreaView
  },
  safeAreaContent: { // Noul stil pentru a împinge conținutul în zona sigură
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  card: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.background.cardGlass, // Acesta ar trebui să fie semi-transparent pentru a vedea fundalul
    borderColor: Colors.border.medium,
    borderWidth: 3,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    marginBottom: Spacing.sm,
    color: Colors.primary.teal,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: Spacing.lg,
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)', // Ajustat pentru contrast cu fundalul întunecat
  },
  sectionLabel: {
    marginBottom: Spacing.lg,
    color: Colors.primary.indigo,
    fontSize: 18,
  },
  rolesContainer: {
    width: '100%',
    maxWidth: 340,
    gap: Spacing.lg,
  },
  roleWrapper: {
    gap: Spacing.sm,
  },
  subButtonsContainer: {
    marginTop: Spacing.sm,
    gap: Spacing.sm,
    alignItems: 'center',
    width: '100%',
  },
  subButton: {
    minWidth: '70%',
  },
  // Stiluri pentru glow-uri, preluate din HomeGlossyAnimated.tsx
  glowTopRight: {
    position: 'absolute',
    width: 400,
    height: 400,
    right: -120,
    top: -60,
    borderRadius: 999,
    backgroundColor: '#075985',
    opacity: 0.08,
    transform: [{ scale: 1.4 }],
  },
  glowBottomLeft: {
    position: 'absolute',
    width: 500,
    height: 500,
    left: -180,
    bottom: -120,
    borderRadius: 999,
    backgroundColor: '#0ea5a4',
    opacity: 0.06,
    transform: [{ scale: 1.2 }],
  },
});