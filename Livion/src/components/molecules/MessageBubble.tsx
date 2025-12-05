import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';
import { ThemedText } from '../atoms/ThemedText';

export type MessageBubbleProps = {
  message: string;
  sender: 'user' | 'clinician' | 'system';
  timestamp?: Date;
  senderName?: string;
  style?: ViewStyle;
};

/**
 * MessageBubble Component
 * Chat-style message display
 * Different styles for user, clinician, and system messages
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  sender,
  timestamp,
  senderName,
  style,
}) => {
  const getBubbleStyle = () => {
    switch (sender) {
      case 'user':
        return {
          backgroundColor: Colors.primary.teal,
          alignSelf: 'flex-end' as const,
          borderBottomRightRadius: BorderRadius.sm,
        };
      case 'clinician':
        return {
          backgroundColor: Colors.primary.indigo,
          alignSelf: 'flex-start' as const,
          borderBottomLeftRadius: BorderRadius.sm,
        };
      case 'system':
        return {
          backgroundColor: Colors.background.cardGlass,
          alignSelf: 'center' as const,
          borderWidth: 1,
          borderColor: Colors.border.medium,
        };
      default:
        return {
          backgroundColor: Colors.background.cardGlass,
          alignSelf: 'flex-start' as const,
        };
    }
  };

  const bubbleStyles = getBubbleStyle();

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.container, style]}>
      {/* Sender Name (for clinician/system) */}
      {sender !== 'user' && senderName && (
        <ThemedText variant="caption" color="tertiary" style={styles.senderName}>
          {senderName}
        </ThemedText>
      )}

      {/* Message Bubble */}
      <View style={[styles.bubble, bubbleStyles]}>
        <ThemedText
          variant="body"
          color={sender === 'system' ? 'secondary' : 'inverse'}
          style={sender === 'system' && styles.systemMessage}
        >
          {message}
        </ThemedText>
      </View>

      {/* Timestamp */}
      {timestamp && (
        <ThemedText variant="caption" color="tertiary" style={styles.timestamp}>
          {formatTimestamp(timestamp)}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
    maxWidth: '80%',
  },
  senderName: {
    marginBottom: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  bubble: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  systemMessage: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  timestamp: {
    marginTop: Spacing.xs,
    marginLeft: Spacing.sm,
  },
});
