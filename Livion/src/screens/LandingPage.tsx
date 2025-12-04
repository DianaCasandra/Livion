import { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '../../components/atoms/Button';
import { ThemedText } from '../../components/atoms/ThemedText';

type AuthStackParamList = {
  Landing: undefined;
  RoleAuth: {
    role: string;
    initial: 'login' | 'onboarding';
  };
};

type LandingNav = NativeStackNavigationProp<AuthStackParamList, 'Landing'>;

export default function LandingPage() {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const navigation = useNavigation<LandingNav>();

  const goToRoleAuth = useCallback(
    (role: string, initial: 'login' | 'onboarding') => {
      navigation.navigate('RoleAuth', { role, initial });
    },
    [navigation]
  );

  const roles = [
    { key: 'patient', label: 'Patient', twoOptions: true },
    { key: 'clinician', label: 'Clinician', twoOptions: true },
    { key: 'coordinator', label: 'Care Coordinator', twoOptions: false },
    { key: 'admin', label: 'Admin', twoOptions: false },
  ];

  const toggleRole = (role: string) => {
    setExpandedRole(prev => (prev === role ? null : role));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f7f7" />

      <SafeAreaView style={styles.safeAreaContent}>
        <ScrollView contentContainerStyle={styles.container}>
          
          <View style={styles.card}>
            <ThemedText variant="display" weight="bold" style={styles.title}>
              Livion
            </ThemedText>

            <ThemedText variant="body" style={styles.subtitle}>
              Powered by Minai
            </ThemedText>

            <ThemedText variant="heading" style={styles.sectionLabel}>
              Alege rolul tău
            </ThemedText>

            <View style={styles.rolesContainer}>
              {roles.map(role => (
                <View key={role.key} style={styles.roleWrapper}>
                  
                  {/* Main role button (orange) */}
                  <Button
                    variant="primary"
                    fullWidth
                    style={styles.roleButton}
                    onPress={() => toggleRole(role.key)}
                  >
                    {role.label}
                  </Button>

                  {/* Sub-buttons */}
                  {expandedRole === role.key && (
                    <View style={styles.subButtonsContainer}>
                      {role.twoOptions ? (
                        <>
                          <Button
                            variant="secondary"
                            style={styles.subButton}
                            onPress={() => goToRoleAuth(role.key, 'onboarding')}
                          >
                            Onboarding
                          </Button>

                          <Button
                            variant="secondary"
                            style={styles.subButton}
                            onPress={() => goToRoleAuth(role.key, 'login')}
                          >
                            Login
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="secondary"
                          style={styles.subButton}
                          onPress={() => goToRoleAuth(role.key, 'login')}
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

          <ThemedText variant="caption" color="tertiary" align="center" style={styles.footer}>
            Mulțumim că folosești Livion.
          </ThemedText>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },

  safeAreaContent: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    color: '#111',
    marginBottom: 4,
  },

  subtitle: {
    color: '#03d0c5',
    marginBottom: 24,
    fontSize: 14,
  },

  sectionLabel: {
    fontSize: 18,
    marginBottom: 24,
    color: '#111',
  },

  rolesContainer: {
    width: '100%',
    gap: 20,
  },

  roleWrapper: {
    gap: 10,
  },

  roleButton: {
    backgroundColor: '#03d0c5',
    borderRadius: 12,
    paddingVertical: 12,
  },

  subButtonsContainer: {
    gap: 10,
    width: '100%',
  },

  subButton: {
    backgroundColor: '#ff6e1e',
    borderRadius: 10,
    paddingVertical: 10,
  },

  footer: {
    marginTop: 20,
  },
});
