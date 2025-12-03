import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { Chip } from '@/components/atoms/Chip';
import { Button } from '@/components/atoms/Button';
import { ThemedText } from '@/components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function DataConnectionsScreen() {
  const router = useRouter();

  const [appleConnected, setAppleConnected] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(false);
  const [glucoseConnected, setGlucoseConnected] = useState(false);
  const [otherConnected, setOtherConnected] = useState(false);

  return (
    <View style={styles.root}>

      {/* Darker teal background */}
      <LinearGradient
        colors={['#08131c', '#0b1e29', '#0d2533']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* Soft background glows */}
      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >

          {/* Back */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>

          {/* Hero card */}
          <LinearGradient
            colors={['rgba(14,165,233,0.25)', 'rgba(6,182,212,0.20)']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.heroCard}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
              <ThemedText
                variant="display"
                weight="bold"
                style={styles.heroTitle}
              >
                Data Connections
              </ThemedText>

              <ThemedText
                variant="body"
                color="secondary"
                style={styles.heroSubtitle}
              >
                Sync wearables and sensors to power your care insights.
              </ThemedText>
            </View>

            <Image
              source={require('../../../assets/onboarding/devices.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </LinearGradient>

          {/* Section title */}
          <ThemedText
            variant="heading"
            weight="semibold"
            style={styles.sectionTitle}
          >
            Connect your devices
          </ThemedText>

          {/* Device cards list */}
          <View style={styles.cardList}>

            {/* Apple */}
            <View style={styles.deviceCard}>
              <ThemedText variant="subtitle" weight="semibold" style={styles.deviceName}>
                Apple Health
              </ThemedText>
              <ThemedText variant="caption" color="secondary" style={styles.deviceHint}>
                Steps • Heart Rate • Sleep • Activity
              </ThemedText>

              <Chip
                label={appleConnected ? 'Connected' : 'Connect'}
                variant={appleConnected ? 'status-ok' : 'teal'}
                onPress={() => setAppleConnected(prev => !prev)}
                style={styles.deviceButton}
              />
            </View>

            {/* Google */}
            <View style={styles.deviceCard}>
              <ThemedText variant="subtitle" weight="semibold" style={styles.deviceName}>
                Google Fit
              </ThemedText>
              <ThemedText variant="caption" color="secondary" style={styles.deviceHint}>
                Steps • HR • Mobility
              </ThemedText>

              <Chip
                label={googleConnected ? 'Connected' : 'Connect'}
                variant={googleConnected ? 'status-ok' : 'teal'}
                onPress={() => setGoogleConnected(prev => !prev)}
                style={styles.deviceButton}
              />
            </View>

            {/* Glucose */}
            <View style={styles.deviceCard}>
              <ThemedText variant="subtitle" weight="semibold" style={styles.deviceName}>
                Glucose Monitor
              </ThemedText>
              <ThemedText variant="caption" color="secondary" style={styles.deviceHint}>
                CGM trend • Fast sync
              </ThemedText>

              <Chip
                label={glucoseConnected ? 'Connected' : 'Connect'}
                variant={glucoseConnected ? 'status-ok' : 'teal'}
                onPress={() => setGlucoseConnected(prev => !prev)}
                style={styles.deviceButton}
              />
            </View>

            {/* Other */}
            <View style={styles.deviceCard}>
              <ThemedText variant="subtitle" weight="semibold" style={styles.deviceName}>
                Other Bluetooth devices
              </ThemedText>
              <ThemedText variant="caption" color="secondary" style={styles.deviceHint}>
                We’ll search nearby sensors automatically
              </ThemedText>

              <Chip
                label={otherConnected ? 'Connected' : 'Search'}
                variant={otherConnected ? 'status-ok' : 'teal'}
                onPress={() => setOtherConnected(prev => !prev)}
                style={styles.deviceButton}
              />
            </View>

          </View>

          <Button
            variant="primary"
            fullWidth
            style={styles.continueBtn}
            onPress={() => router.push('/patient/onboarding/risk')}
          >
            Continue
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
    backgroundColor: '#3949AB',
  },

  safeArea: {
    flex: 1,
  },

  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },

  backButton: { 
        alignSelf: 'flex-start', // Important: Nu FullWidth
        marginBottom: Spacing.lg, 
        marginTop: Spacing.md,
          padding: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(57, 73, 171, 0.22)',// Fundal semi-transparent
    },
  backButtonText: {
    fontSize: 16,
  },

  /* HERO CARD */
  heroCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroTitle: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 28,
  },

  heroSubtitle: {
    maxWidth: '85%',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
  },

  heroImage: {
    width: 120,
    height: 120,
    marginTop: 10,
    opacity: 0.95,
  },

  sectionTitle: {
    color: '#fff',
    marginBottom: Spacing.lg,
    textAlign: 'center',
    fontSize: 20,
  },

  cardList: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },

  /* DEVICE CARD */
  deviceCard: {
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },

  deviceName: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
    fontSize: 16,
  },

  deviceHint: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 12,
  },

  deviceButton: {
    alignSelf: 'center',
    marginTop: 4,
  },

  continueBtn: {
    marginTop: Spacing.md,
  },

  glowTopRight: {
    position: 'absolute',
    width: 400,
    height: 400,
    right: -150,
    top: -100,
    borderRadius: 999,
    backgroundColor: '#3949AB',
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
    opacity: 0.10,
  },
});
