import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { InputField } from '../../components/atoms/InputField';
import { ThemedText } from '../../components/atoms/ThemedText';
import { MessageBubble } from '../../components/molecules/MessageBubble';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText variant="display" weight="bold" style={styles.header}>
          Messages
        </ThemedText>

        <View style={styles.thread}>
          <MessageBubble
            message="Hi Jane, your latest readings look stable. How are you feeling today?"
            sender="clinician"
            senderName="Dr. Harper"
            timestamp={new Date()}
          />
          <MessageBubble
            message="Feeling a bit tired but overall okay."
            sender="user"
            timestamp={new Date()}
          />
          <MessageBubble
            message="Thanks for updating us. Remember to log your symptoms later today."
            sender="clinician"
            senderName="Care Team"
            timestamp={new Date()}
          />
        </View>

        <View style={styles.composer}>
          <InputField placeholder="Type your message..." multiline style={styles.input} />
          <Button variant="primary" fullWidth>
            Send
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
