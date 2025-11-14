import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { InputField } from '../../components/atoms/InputField';
import { ThemedText } from '../../components/atoms/ThemedText';
import { MessageBubble } from '../../components/molecules/MessageBubble';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function ClinicianMessagesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText variant="display" weight="bold" style={styles.header}>
          Care Team Messages
        </ThemedText>
        <ThemedText variant="caption" color="tertiary" style={styles.subheader}>
          Secure channel between clinicians and patients.
        </ThemedText>

        <View style={styles.thread}>
          <MessageBubble
            message="Jane reported increased fatigue this morning."
            sender="clinician"
            senderName="Nurse Lee"
            timestamp={new Date()}
          />
          <MessageBubble
            message="Thanks, scheduling a check-in call at 3 PM."
            sender="clinician"
            senderName="Dr. Harper"
            timestamp={new Date()}
          />
          <MessageBubble
            message="System alert: new CGM data available."
            sender="system"
            timestamp={new Date()}
          />
        </View>

        <View style={styles.composer}>
          <InputField placeholder="Compose message..." multiline style={styles.input} />
          <Button variant="primary" fullWidth>
            Send Message
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
    padding: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  header: {
    marginBottom: Spacing.xs,
  },
  subheader: {
    marginBottom: Spacing.xl,
  },
  thread: {
    backgroundColor: Colors.background.cardGlass,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderColor: Colors.border.medium,
    borderWidth: 1,
    marginBottom: Spacing['2xl'],
  },
  composer: {
    backgroundColor: Colors.background.cardGlass,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderColor: Colors.border.medium,
    borderWidth: 1,
  },
  input: {
    marginBottom: Spacing.md,
  },
});
