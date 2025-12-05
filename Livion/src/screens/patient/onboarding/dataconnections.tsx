import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { Chip } from '../../../components/atoms/Chip';
import { Button } from '../../../components/atoms/Button';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { COLORS, Spacing } from '@/src/constants/Colors';

export default function DataConnectionsScreen() {
  const navigation = useNavigation();

  const [appleConnected, setAppleConnected] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(false);
  const [glucoseConnected, setGlucoseConnected] = useState(false);
  const [otherConnected, setOtherConnected] = useState(false);

  // Animated blobs
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopAnimation = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: 8000, delay, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 8000, useNativeDriver: true }),
        ])
      ).start();
    };
    loopAnimation(anim1, 0);
    loopAnimation(anim2, 1500);
  }, []);

  const blob1Style = {
    transform: [
      { translateX: anim1.interpolate({ inputRange: [0, 1], outputRange: [-40, 40] }) },
      { translateY: anim1.interpolate({ inputRange: [0, 1], outputRange: [-20, 20] }) },
    ],
  };

  const blob2Style = {
    transform: [
      { translateX: anim2.interpolate({ inputRange: [0, 1], outputRange: [30, -30] }) },
      { translateY: anim2.interpolate({ inputRange: [0, 1], outputRange: [40, -40] }) },
    ],
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Animated blobs */}
      <Animated.View style={[styles.blobTeal, blob1Style]} />
      <Animated.View style={[styles.blobAmber, blob2Style]} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >

          {/* Back */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>

          {/* Hero card */}
          <View style={styles.heroCard}>
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
                style={styles.heroSubtitle}
              >
                Sync wearables and sensors to power your care insights.
              </ThemedText>
            </View>

            <Image
              source={require('../../../../assets/onboarding/devices.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

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
              <ThemedText variant="caption" style={styles.deviceHint}>
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
              <ThemedText variant="caption" style={styles.deviceHint}>
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
              <ThemedText variant="caption" style={styles.deviceHint}>
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
              <ThemedText variant="caption" style={styles.deviceHint}>
                We'll search nearby sensors automatically
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
            onPress={() => navigation.navigate('Risk' as never)}
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
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },

  safeArea: {
    flex: 1,
  },

  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    marginTop: Spacing.md,
    padding: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12 },
      android: { elevation: 3 },
    }),
  },

  /* HERO CARD */
  heroCard: {
    padding: Spacing.lg,
    borderRadius: 28,
    marginBottom: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(3, 208, 197, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(3, 208, 197, 0.2)',
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

  /* DEVICE CARD */
  deviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius: 24,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 8 }, shadowRadius: 24 },
      android: { elevation: 4 },
    }),
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

  blobTeal: {
    position: 'absolute',
    width: 400,
    height: 400,
    right: -120,
    top: -80,
    borderRadius: 999,
    backgroundColor: COLORS.teal,
    opacity: 0.12,
  },

  blobAmber: {
    position: 'absolute',
    width: 450,
    height: 450,
    left: -180,
    bottom: -100,
    borderRadius: 999,
    backgroundColor: COLORS.amber,
    opacity: 0.10,
  },
});
