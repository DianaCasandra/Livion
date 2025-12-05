import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRef, useEffect } from 'react';
import { Animated, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { InputField } from '../../../components/atoms/InputField';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { COLORS, Spacing } from '@/src/constants/Colors';


export default function PatientRegisterScreen() {
  const navigation = useNavigation();

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
        <ScrollView contentContainerStyle={styles.container}>

          {/* Back Icon Button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>

          {/* Main Card */}
          <View style={styles.card}>
            <ThemedText variant="display" weight="bold" align="center" style={styles.title}>
              Patient Register
            </ThemedText>

            <ThemedText variant="body" align="center" style={styles.subtitle}>
              Create your Livion account. Your data is encrypted and secure.
            </ThemedText>

            <InputField
              label="Email / Phone"
              placeholder=""
              keyboardType="email-address"
              style={styles.input}
            />

            <InputField
              label="Set a Password"
              placeholder=""
              secureTextEntry
              style={styles.input}
            />

            <InputField
              label="Confirm Password"
              placeholder=""
              secureTextEntry
              style={styles.input}
            />

            <InputField
              label="Bank ID (optional)"
              placeholder=""
              style={styles.input}
            />

            {/* Continue Button */}
            <Button
              variant="primary"
              fullWidth
              style={styles.nextButton}
              textStyle={{ textAlign: "center" }}
              onPress={() => navigation.navigate('Consent' as never)}
            >
              <ThemedText variant="label" weight="semibold" style={{ color: "#fff", textAlign: "center" }}>
                Continue
              </ThemedText>
            </Button>
          </View>

          {/* Disclaimer */}
          <ThemedText variant="caption" align="center" style={styles.footer}>
            By continuing, you agree to Livion's data use policy.
          </ThemedText>


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
  safeArea: { flex: 1 },

  container: {
    flexGrow: 1,
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
    alignItems: 'center',
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

  card: {
    padding: Spacing.xl,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 10 }, shadowRadius: 30 },
      android: { elevation: 6 },
    }),
  },

  title: {
    marginBottom: Spacing.sm,
    color: COLORS.textPrimary,
  },

  subtitle: {
    marginBottom: Spacing.xl,
    color: COLORS.textSecondary,
  },

  input: {
    marginTop: Spacing.md,
    width: "100%",
  },

  nextButton: {
    marginTop: Spacing.xl,
    backgroundColor: COLORS.teal,
  },

  footer: {
    marginBottom: 25,
    marginTop: 15,
    color: COLORS.textSecondary,
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
