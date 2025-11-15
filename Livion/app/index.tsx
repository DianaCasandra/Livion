import { Link } from 'expo-router'; 
import { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '../components/atoms/ThemedText';
import { Colors, Spacing, BorderRadius } from '../constants/Colors';

export default function LandingPage() {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

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
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title */}
        <ThemedText variant="display" style={styles.title}>
          Livion
        </ThemedText>

        <ThemedText variant="body" color="secondary" style={styles.subtitle}>
          Powered by Minai
        </ThemedText>

        <ThemedText variant="heading" style={styles.sectionLabel}>
          Choose your role
        </ThemedText>

        {/* Roles */}
        <View style={styles.rolesContainer}>
          {roles.map(role => (
            <View key={role.key} style={styles.roleWrapper}>
              {/* Main Role Button */}
              <TouchableOpacity
                onPress={() => toggleRole(role.key)}
                style={styles.mainButton}
              >
                <ThemedText color="inverse" align="center" style={styles.mainButtonText}>
                  {role.label}
                </ThemedText>
              </TouchableOpacity>

              {/* Sub-buttons */}
              {expandedRole === role.key && (
                <View style={styles.subButtonsContainer} >
                  {role.twoOptions ? (
                    <>
                      <Link
                        href={`/${role.key}/onboarding/welcome` as any}
                        style={[styles.subButton, { backgroundColor: Colors.primary.indigo }]}
                      >
                        <ThemedText color="inverse" align="center" style={styles.subButtonText}>
                          Onboarding
                        </ThemedText>
                      </Link>
                      <Link
                        href={`/${role.key}/login` as any}
                        style={[styles.subButton, { backgroundColor: Colors.primary.indigo }]}
                      >
                        <ThemedText color="inverse" align="center" style={styles.subButtonText}>
                          Login
                        </ThemedText>
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={`/${role.key}/login` as any}
                      style={[styles.subButton, { backgroundColor: Colors.primary.indigo }]}
                    >
                      <ThemedText color="inverse" align="center" style={styles.subButtonText}>
                        Login
                      </ThemedText>
                    </Link>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
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
    alignItems: 'center',
    padding: Spacing.xl,
  },
  title: {
    marginBottom: Spacing.sm,
    color: Colors.primary.teal,
  },
  subtitle: {
    marginBottom: Spacing.lg,
    fontSize: 16,
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
  mainButton: {
    backgroundColor: Colors.primary.teal,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    elevation: 2,
  },
  mainButtonText: {
    fontSize: 16,
  },
  subButtonsContainer: {
    marginTop: Spacing.sm,
    gap: Spacing.sm,
    alignItems: 'center', // keeps sub-buttons aligned under main
  },
  subButton: {
    paddingVertical: 10, 
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    minWidth: '70%', 
    alignSelf: 'auto',
  },
  subButtonText: {
    fontSize: 16, // smaller font
  },
});
