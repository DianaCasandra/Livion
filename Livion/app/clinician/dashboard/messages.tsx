import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { InputField } from '../../../components/atoms/InputField';
import { Button } from '../../../components/atoms/Button';
import { MessageBubble } from '../../../components/molecules/MessageBubble';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';

export default function ClinicianMessages() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background */}
      <LinearGradient
        colors={['#050816', '#031824', '#031b2e']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* Soft glows */}
      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      <SafeAreaView style={styles.safearea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {/* Header */}
          <ThemedText variant="display" weight="bold" style={styles.header}>
            Messages
          </ThemedText>

          {/* Switch patient chat */}
          <Button
            fullWidth
            variant="outline"
            style={styles.switchButton}
          >
            Switch Patient Chat
          </Button>

          <ThemedText
            variant="body"
            color="secondary"
            style={styles.sectionIntro}
          >
            Conversation with patient: <ThemedText weight="bold">Daniel M.</ThemedText>
          </ThemedText>

          {/* ---------------------- THREAD ---------------------- */}
          <View style={styles.threadCard}>
            <View style={styles.threadInner}>

              <MessageBubble
                message="Good morning, Daniel. I reviewed your readings from this week — trends look mostly stable. How are you feeling today?"
                sender="clinician"
                senderName="Dr. Harper"
                timestamp={new Date()}
              />

              <MessageBubble
                message="Hey doctor, I’ve been feeling more tired than usual. Blood pressure this morning was 138/92."
                sender="user"
                timestamp={new Date()}
              />

              <MessageBubble
                message="Thanks for letting me know. Please continue monitoring twice daily. I also recommend increasing hydration today. If dizziness worsens, reach out immediately."
                sender="clinician"
                senderName="Care Team"
                timestamp={new Date()}
              />

              <MessageBubble
                message="Understood — I’ll keep you updated."
                sender="user"
                timestamp={new Date()}
              />

            </View>
          </View>

          {/* ---------------------- COMPOSER ---------------------- */}
          <View style={styles.composer}>
            <InputField
              placeholder="Type your message..."
              multiline
            />
            <Button
              fullWidth
              variant="primary"
            >
              Send to patient
            </Button>
          </View>

          <View style={{ height: 90 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },
  safearea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  header: {
    color: '#fff',
    marginBottom: Spacing.md,
    fontSize: 28,
    lineHeight: 34,
  },

  switchButton: {
    marginBottom: Spacing.md,
    paddingVertical: 8,
  },

  sectionIntro: {
    marginBottom: Spacing.lg,
    fontSize: 13,
    lineHeight: 18,
  },

  threadCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: Spacing.xl,
  },
  threadInner: {
    gap: Spacing.md,
  },

  composer: {
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },

  // Glows
  glowTopRight: {
    position: 'absolute',
    width: 360,
    height: 360,
    right: -120,
    top: -80,
    backgroundColor: Colors.primary.indigo,
    opacity: 0.1,
    borderRadius: 999,
  },
  glowBottomLeft: {
    position: 'absolute',
    width: 520,
    height: 520,
    left: -200,
    bottom: -160,
    backgroundColor: Colors.primary.teal,
    opacity: 0.08,
    borderRadius: 999,
  },
});
