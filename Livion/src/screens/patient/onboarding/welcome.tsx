import { Button } from '../../../components/atoms/Button';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { AnimatedBlobBackground } from '../../../components/atoms/AnimatedBlobBackground';
import { COLORS, Spacing } from '@/src/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLanguage } from '../../../components/providers/LanguageProvider';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const { t } = useLanguage();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Animated blobs - same as other pages */}
      <AnimatedBlobBackground />

      <SafeAreaView style={styles.safeAreaContent}>
        <ScrollView contentContainerStyle={styles.container}>

          {/* Top Section */}
          <View style={styles.topSection} />

          {/* Middle Section */}
          <View style={styles.middleSection}>
            <ThemedText
              variant="heading"
              align="center"
              style={[styles.softTitle, { color: COLORS.teal }]}
            >
              {t.welcome.tagline}
            </ThemedText>

            <TouchableOpacity
              onPress={() => navigation.navigate('UserPromise' as never)}
              style={styles.linkButton}
            >
              <ThemedText
                variant="body"
                align="center"
                style={[styles.linkText, { color: COLORS.amber }]}
              >
                {t.welcome.privacyLink}
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
              style={[styles.button, { backgroundColor: COLORS.amber + '9a' }]}
            >
             <ThemedText variant="label" weight="semibold" style={{ color: COLORS.cardWhite, textAlign: "center" }}>
                {t.welcome.getStarted}
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
    backgroundColor: COLORS.background,
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
    backgroundColor: COLORS.amber + '1f',
  },
});
