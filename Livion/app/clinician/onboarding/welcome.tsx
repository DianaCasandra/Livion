import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Spacing } from '../../../constants/Colors';

export default function WelcomeScreen() {
  const router = useRouter();
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopAnimation = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: 9000, delay, useNativeDriver: false }),
          Animated.timing(anim, { toValue: 0, duration: 9000, useNativeDriver: false }),
        ])
      ).start();
    };
    loopAnimation(anim1, 0);
    loopAnimation(anim2, 2000);
  }, []);

  const blob1Style = {
    transform: [
      { translateX: anim1.interpolate({ inputRange: [0, 1], outputRange: [-50, 50] }) },
      { translateY: anim1.interpolate({ inputRange: [0, 1], outputRange: [-30, 30] }) },
    ],
  };

  const blob2Style = {
    transform: [
      { translateX: anim2.interpolate({ inputRange: [0, 1], outputRange: [40, -40] }) },
      { translateY: anim2.interpolate({ inputRange: [0, 1], outputRange: [60, -60] }) },
    ],
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Gradient background */}
      <LinearGradient colors={["#07203f", "#04363a", "#06233d"]} style={StyleSheet.absoluteFill} />

      {/* Animated blobs */}
      <Animated.View style={[styles.blobBlue, blob1Style]} />
      <Animated.View style={[styles.blobTeal, blob2Style]} />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.topSection}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          </View>

          <View style={styles.middleSection}>
            <ThemedText
              variant="heading"
              color="secondary"
              align="center"
              style={styles.softTitle}
            >
              Thank you for joining the clinician community of Livion. Your story matters.
            </ThemedText>

            <TouchableOpacity>
              <ThemedText variant="body" color="teal" align="center" style={styles.linkText}>
                Privacy Explainer
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSection}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onPress={() => router.push('/clinician/onboarding/register')}
              style={styles.button}
            >
              Get Started
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  topSection: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 25,
    width: '100%',
  },
    backButton: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    marginTop: Spacing.md,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(57, 73, 171, 0.22)',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
    width: '100%',
  },
  softTitle: {
    marginBottom: Spacing.lg,
    opacity: 0.9,
    fontSize: 20,
    lineHeight: 28,
  },
  linkText: { textDecorationLine: 'underline', fontSize: 15 },
  button: { marginTop: Spacing.xl },
  backButtonText: { fontSize: 16 },
  blobBlue: {
    position: 'absolute',
    width: 450,
    height: 450,
    borderRadius: 999,
    backgroundColor: '#075985',
    opacity: 0.12,
    top: -150,
    right: -120,
  },
  blobTeal: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 999,
    backgroundColor: '#0ea5a4',
    opacity: 0.10,
    bottom: -130,
    left: -170,
  },
});
