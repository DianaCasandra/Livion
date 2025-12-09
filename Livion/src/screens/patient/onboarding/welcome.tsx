import { Button } from '../../../components/atoms/Button';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Spacing } from '@/src/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation();
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
      <LinearGradient colors={["#f7f7f7", "#f7f7f7", "#f7f7f7"]} style={StyleSheet.absoluteFill} />

      {/* Animated blobs */}
      <Animated.View style={[styles.blobBlue, blob1Style]} />
      <Animated.View style={[styles.blobTeal, blob2Style]} />

      <SafeAreaView style={styles.safeAreaContent}>
        <ScrollView contentContainerStyle={styles.container}>

          {/* Top Section */}
          <View style={styles.topSection} />

          {/* Middle Section */}
          <View style={styles.middleSection}>
            <ThemedText
              variant="heading"
              align="center"
              style={[styles.softTitle, { color: "#03d0c5" }]} // teal secundar
            >
              Your health story. Yours to share.
            </ThemedText>

            <TouchableOpacity
              onPress={() => navigation.navigate('UserPromise' as never)}
              style={styles.linkButton}
            >
              <ThemedText
                variant="body"
                align="center"
                style={[styles.linkText, { color: "#ff6e1e" }]} // indigo principal
              >
                User Promise & Privacy Explainer
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onPress={() => navigation.navigate('Register' as never)}
              style={{ ...styles.button, backgroundColor: '#ff6d1e9a' }} // accent principal
            >
             <ThemedText variant="label" weight="semibold" style={{ color: "#fff", textAlign: "center" }}>
                Get Started
              </ThemedText>
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
    backgroundColor: '#f7f7f7',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },

  safeAreaContent: { flex: 1 },

  container: {
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
    opacity: 0.95,
    fontSize: 20,
    lineHeight: 28,
  },

  linkButton: { paddingVertical: 6, paddingHorizontal: 8 },

  linkText: {
    textDecorationLine: 'underline',
    fontSize: 15,
    fontWeight: '500',
  },

  button: { marginTop: Spacing.xl },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    marginTop: Spacing.md,
    padding: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 110, 30, 0.12)', // indigo principal transparent
  },

  blobBlue: {
    position: 'absolute',
    width: 450,
    height: 450,
    borderRadius: 999,
    backgroundColor: '#03a098ff',
    opacity: 0.12,
    top: -150,
    right: -120,
  },

  blobTeal: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 999,
    backgroundColor: '#03d0c5',
    opacity: 0.10,
    bottom: -130,
    left: -170,
  },
});
