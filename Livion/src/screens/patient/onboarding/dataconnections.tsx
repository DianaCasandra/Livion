import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { AnimatedBlobBackground } from '../../../components/atoms/AnimatedBlobBackground';
import { GlassCard } from '../../../components/atoms/GlassCard';
import { Chip } from '../../../components/atoms/Chip';
import { Button } from '../../../components/atoms/Button';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { OnboardingHeader } from '../../../components/molecules/OnboardingHeader';
import { COLORS, Spacing, GlassStyles } from '@/src/constants/Colors';

type DeviceConnection = {
  id: string;
  name: string;
  hint: string;
  connectLabel: string;
};

const DEVICES: DeviceConnection[] = [
  { id: 'apple', name: 'Apple Health', hint: 'Steps • Heart Rate • Sleep • Activity', connectLabel: 'Connect' },
  { id: 'google', name: 'Google Fit', hint: 'Steps • HR • Mobility', connectLabel: 'Connect' },
  { id: 'glucose', name: 'Glucose Monitor', hint: 'CGM trend • Fast sync', connectLabel: 'Connect' },
  { id: 'other', name: 'Other Bluetooth devices', hint: "We'll search nearby sensors automatically", connectLabel: 'Search' },
];

export default function DataConnectionsScreen() {
  const navigation = useNavigation();
  const [connections, setConnections] = useState<Record<string, boolean>>({});

  const toggleConnection = (id: string) => {
    setConnections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <AnimatedBlobBackground />

      <SafeAreaView style={styles.safeArea}>
        <OnboardingHeader style={{ paddingHorizontal: Spacing.lg }} />

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* Hero card */}
          <View style={styles.heroCard}>
            <View style={styles.heroContent}>
              <ThemedText variant="display" weight="bold" style={styles.heroTitle}>
                Data Connections
              </ThemedText>
              <ThemedText variant="body" style={styles.heroSubtitle}>
                Sync wearables and sensors to power your care insights.
              </ThemedText>
            </View>

            <Image
              source={require('../../../../assets/onboarding/devices.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

          <ThemedText variant="heading" weight="semibold" style={styles.sectionTitle}>
            Connect your devices
          </ThemedText>

          <View style={styles.cardList}>
            {DEVICES.map((device) => (
              <GlassCard key={device.id} style={styles.deviceCard} shadowSize="md" borderRadius={24} padding={Spacing.lg}>
                <ThemedText variant="subtitle" weight="semibold" style={styles.deviceName}>
                  {device.name}
                </ThemedText>
                <ThemedText variant="caption" style={styles.deviceHint}>
                  {device.hint}
                </ThemedText>
                <Chip
                  label={connections[device.id] ? 'Connected' : device.connectLabel}
                  variant={connections[device.id] ? 'status-ok' : 'teal'}
                  onPress={() => toggleConnection(device.id)}
                  style={styles.deviceButton}
                />
              </GlassCard>
            ))}
          </View>

          <Button
            variant="primary"
            fullWidth
            style={styles.continueBtn}
            textStyle={{ textAlign: 'center' }}
            onPress={() => navigation.navigate('Risk' as never)}
          >
            <ThemedText variant="label" weight="semibold" style={styles.buttonText}>
              Continue
            </ThemedText>
          </Button>

          <View style={{ height: 80 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  heroCard: {
    padding: Spacing.lg,
    borderRadius: 28,
    marginBottom: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...GlassStyles.tealHighlight,
    borderWidth: 1,
  },
  heroContent: {
    flex: 1,
    alignItems: 'center',
  },
  heroTitle: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 28,
  },
  heroSubtitle: {
    maxWidth: '85%',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  heroImage: {
    width: 120,
    height: 120,
    marginTop: 10,
    opacity: 0.95,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
    fontSize: 20,
  },
  cardList: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  deviceCard: {
    alignItems: 'center',
  },
  deviceName: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
    fontSize: 16,
  },
  deviceHint: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  deviceButton: {
    alignSelf: 'center',
    marginTop: 4,
  },
  continueBtn: {
    marginTop: Spacing.md,
    backgroundColor: COLORS.teal,
  },
  buttonText: {
    color: COLORS.cardWhite,
    textAlign: 'center',
  },
});
