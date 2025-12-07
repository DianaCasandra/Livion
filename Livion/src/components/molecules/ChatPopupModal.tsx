/**
 * ChatPopupModal - Chat popup modal for quick messaging
 * Provides an overlay chat interface with the care team
 */

import { Ionicons } from '@expo/vector-icons';
import { Send, X, Phone, Shield } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { COLORS, BorderRadius, Spacing } from '../../constants/Colors';
import { ThemedText } from '../atoms/ThemedText';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  sender?: string;
  time: string;
};

type ChatPopupModalProps = {
  visible: boolean;
  onClose: () => void;
  onCall?: () => void;
  doctorName?: string;
  doctorRole?: string;
  initialMessages?: Message[];
};

// Message bubble component
function MessageBubble({
  message,
  isUser,
  sender,
  time,
  index,
}: {
  message: string;
  isUser: boolean;
  sender?: string;
  time: string;
  index: number;
}) {
  const slideAnim = useRef(new Animated.Value(isUser ? 30 : -30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.messageBubbleContainer,
        isUser
          ? styles.messageBubbleContainerUser
          : styles.messageBubbleContainerDoctor,
        { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
      ]}
    >
      {!isUser && (
        <View style={styles.senderInfo}>
          <View style={styles.senderAvatar}>
            <ThemedText style={styles.senderAvatarText}>
              {sender?.charAt(0) || 'D'}
            </ThemedText>
          </View>
          <ThemedText style={styles.senderName}>{sender}</ThemedText>
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.messageBubbleUser : styles.messageBubbleDoctor,
        ]}
      >
        <ThemedText
          style={[styles.messageText, isUser && styles.messageTextUser]}
        >
          {message}
        </ThemedText>
      </View>
      <ThemedText style={[styles.messageTime, isUser && styles.messageTimeUser]}>
        {time}
      </ThemedText>
    </Animated.View>
  );
}

export function ChatPopupModal({
  visible,
  onClose,
  onCall,
  doctorName = 'Dr. Harper',
  doctorRole = 'Family Physician',
  initialMessages = [],
}: ChatPopupModalProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.length > 0
      ? initialMessages
      : [
          {
            id: '1',
            text: `Hi there! I'm here to help. What would you like to discuss about your symptoms?`,
            isUser: false,
            sender: doctorName,
            time: 'Just now',
          },
        ]
  );

  const scrollViewRef = useRef<ScrollView>(null);

  // Animation values
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      isUser: true,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate doctor response (in a real app, this would be an API call)
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for sharing. I've noted your symptoms. Would you like me to schedule a follow-up call to discuss this further?",
        isUser: false,
        sender: doctorName,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, responseMessage]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.modalCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={styles.doctorAvatar}>
                  <ThemedText style={styles.doctorAvatarText}>
                    {doctorName.charAt(0)}
                  </ThemedText>
                  <View style={styles.onlineIndicator} />
                </View>
                <View style={styles.doctorInfo}>
                  <ThemedText style={styles.doctorName}>{doctorName}</ThemedText>
                  <ThemedText style={styles.doctorRole}>{doctorRole}</ThemedText>
                </View>
              </View>
              <View style={styles.headerRight}>
                {onCall && (
                  <Pressable style={styles.headerButton} onPress={onCall}>
                    <Phone size={20} color={COLORS.teal} />
                  </Pressable>
                )}
                <Pressable style={styles.headerButton} onPress={onClose}>
                  <X size={22} color={COLORS.textSecondary} />
                </Pressable>
              </View>
            </View>

            {/* Security Banner */}
            <View style={styles.securityBanner}>
              <Shield size={14} color={COLORS.teal} />
              <ThemedText style={styles.securityText}>
                Secure conversation with your care team
              </ThemedText>
            </View>

            {/* Messages */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesScroll}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
            >
              {messages.map((msg, index) => (
                <MessageBubble
                  key={msg.id}
                  message={msg.text}
                  isUser={msg.isUser}
                  sender={msg.sender}
                  time={msg.time}
                  index={index}
                />
              ))}
            </ScrollView>

            {/* Input Area */}
            <View style={styles.inputArea}>
              <TextInput
                style={styles.messageInput}
                placeholder="Type your message..."
                placeholderTextColor={COLORS.textTertiary}
                value={message}
                onChangeText={setMessage}
                multiline
                maxLength={500}
              />
              <Pressable
                style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
                onPress={handleSend}
                disabled={!message.trim()}
              >
                <Send
                  size={20}
                  color={message.trim() ? COLORS.cardWhite : COLORS.textTertiary}
                />
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalCard: {
    height: '85%',
    backgroundColor: COLORS.cardWhite,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: -4 },
        shadowRadius: 20,
      },
      android: { elevation: 10 },
    }),
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.cardWhite,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  doctorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.teal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  doctorAvatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.cardWhite,
  },

  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.cardWhite,
  },

  doctorInfo: {
    flex: 1,
  },

  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  doctorRole: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Security Banner
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.tealLight,
    padding: 10,
    gap: 8,
  },

  securityText: {
    fontSize: 12,
    color: COLORS.tealDark,
  },

  // Messages
  messagesScroll: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },

  messageBubbleContainer: {
    marginBottom: 16,
  },

  messageBubbleContainerUser: {
    alignItems: 'flex-end',
  },

  messageBubbleContainerDoctor: {
    alignItems: 'flex-start',
  },

  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },

  senderAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.amber,
    justifyContent: 'center',
    alignItems: 'center',
  },

  senderAvatarText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.cardWhite,
  },

  senderName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  messageBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 18,
  },

  messageBubbleUser: {
    backgroundColor: COLORS.teal,
    borderBottomRightRadius: 4,
  },

  messageBubbleDoctor: {
    backgroundColor: COLORS.cardWhite,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },

  messageText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    lineHeight: 21,
  },

  messageTextUser: {
    color: COLORS.cardWhite,
  },

  messageTime: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 4,
  },

  messageTimeUser: {
    textAlign: 'right',
  },

  // Input Area
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.cardWhite,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 10,
  },

  messageInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textPrimary,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.teal,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendButtonDisabled: {
    backgroundColor: COLORS.border,
  },
});
