import { Link } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../components/atoms/ThemedText';

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
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
      }}
    >
      {/* Title */}
      <ThemedText
        variant="display"
        style={{ marginBottom: 6, color: '#0f766e' }} // Teal 700
      >
        Livion
      </ThemedText>

      {/* Subtitle */}
      <ThemedText
        variant="body"
        color="secondary"
        style={{ marginBottom: 32, fontSize: 16 }}
      >
        Powered by Minai
      </ThemedText>

      {/* Section Label */}
      <ThemedText
        variant="heading"
        style={{
          color: '#4338ca', // Indigo 600
          marginBottom: 20,
          fontSize: 18,
        }}
      >
        Choose your role
      </ThemedText>

      {/* Role Buttons */}
      <View style={{ width: '100%', maxWidth: 340, gap: 18 }}>
        {roles.map((role) => (
          <View key={role.key}>
            {/* Main Role Button */}
            <TouchableOpacity
              onPress={() => toggleRole(role.key)}
              style={{
                backgroundColor: '#0d9488', // Teal 600
                paddingVertical: 16,
                borderRadius: 12,
                elevation: 2,
              }}
            >
              <ThemedText color="inverse" align="center" style={{ fontSize: 16 }}>
                {role.label}
              </ThemedText>
            </TouchableOpacity>

            {/* Expanded Options */}
            {expandedRole === role.key && (
              <View style={{ marginTop: 12, gap: 12 }}>
                {/* Two-button roles: Patient + Clinician */}
                {role.twoOptions && (
                  <>
                    <Link
                      href={`/${role.key}/onboarding/welcome` as any}
                      style={{
                        backgroundColor: '#4338ca', // Indigo 600
                        paddingVertical: 14,
                        borderRadius: 10,
                      }}
                    >
                      <ThemedText color="inverse" align="center">
                        Onboarding
                      </ThemedText>
                    </Link>

                    <Link
                      href={`/${role.key}/login` as any}
                      style={{
                        backgroundColor: '#64748b', // Slate 500
                        paddingVertical: 14,
                        borderRadius: 10,
                      }}
                    >
                      <ThemedText color="inverse" align="center">
                        Login
                      </ThemedText>
                    </Link>
                  </>
                )}

                {/* One-button roles: Coordinator + Admin */}
                {!role.twoOptions && (
                  <Link
                    href={`/${role.key}/login` as any}
                    style={{
                      backgroundColor: '#4338ca',
                      paddingVertical: 14,
                      borderRadius: 10,
                    }}
                  >
                    <ThemedText color="inverse" align="center">
                      Login
                    </ThemedText>
                  </Link>
                )}
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
