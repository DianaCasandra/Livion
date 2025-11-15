import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { Chip } from '../../../components/atoms/Chip';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';

export default function DataConnectionsScreen() {
  const router = useRouter();

  // State for each connector
  const [appleConnected, setAppleConnected] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(false);
  const [glucoseConnected, setGlucoseConnected] = useState(false);
  const [otherConnected, setOtherConnected] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ThemedText variant="body" color="teal" style={styles.backButtonText}>
            ⪻ Back
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.card}>
          <ThemedText variant="display" weight="bold" color="teal" align="center"style={styles.title}>
            Data Connections
          </ThemedText>
          <ThemedText variant="body" color="secondary" align="center" style={styles.body}>
            Connect wearable devices and health records to unlock richer insights.
          </ThemedText>

          <View style={styles.connections}>
            {/* Apple Health */}
            <View style={styles.connectionRow}>
              <ThemedText variant="subtitle" weight="semibold">
                Apple Health
              </ThemedText>
              <Chip
                label={appleConnected ? 'Connected' : 'Connect'}
                variant={appleConnected ? 'status-ok' : 'teal'}
                onPress={() => setAppleConnected(prev => !prev)}
                style={{ marginLeft: 40 }}
              />
            </View>

            {/* Google Fit */}
            <View style={styles.connectionRow}>
              <ThemedText variant="subtitle" weight="semibold">
                Google Fit
              </ThemedText>
              <Chip
                label={googleConnected ? 'Connected' : 'Connect'}
                variant={googleConnected ? 'status-ok' : 'teal'}
                onPress={() => setGoogleConnected(prev => !prev)}
                style={{ marginLeft: 60 }}
              />
            </View>

            {/* Glucose Monitor */}
            <View style={styles.connectionRow}>
              <ThemedText variant="subtitle" weight="semibold">
                Glucose Monitor
              </ThemedText>
              <Chip
                label={glucoseConnected ? 'Connected' : 'Connect'}
                variant={glucoseConnected ? 'status-ok' : 'teal'}
                onPress={() => setGlucoseConnected(prev => !prev)}
                style={{ marginLeft: 10 }}
              />
            </View>

            {/* Other Data Connectors */}
            <View style={[styles.connectionRow, { flexDirection: 'column', alignItems: 'flex-start' }]}>
              <ThemedText variant="subtitle" weight="semibold">
                Other data connectors?
              </ThemedText>
              <Chip
                label={otherConnected ? 'Connected' : 'Search by Bluetooth'}
                variant={otherConnected ? 'status-ok' : 'teal'}
                onPress={() => setOtherConnected(prev => !prev)}
                style={{ marginTop: Spacing.sm }} // optional spacing
              />
            </View>

          </View>

          <Button
            variant="primary"
            fullWidth
            style={styles.button}
            onPress={() => router.push('/patient/onboarding/risk')}
          >
            Continue
          </Button>
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
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 12,
  },
  body: {
    marginBottom: Spacing.lg,
  },
  connections: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  connectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginTop: Spacing.sm,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  backButtonText: {
    marginBottom: Spacing.md,
    fontSize: 18,
  },
});