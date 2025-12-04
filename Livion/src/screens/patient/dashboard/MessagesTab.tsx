/**
 * MessagesTab - 2025 UX Redesign
 * Clean messaging interface with clinician and peer sections
 */

import { Ionicons } from '@expo/vector-icons';
import { MessageCircle, Users, Send, Shield, Heart, MessageSquare } from 'lucide-react-native';
import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../../../../components/atoms/ThemedText';

// Color palette
const COLORS = {
  background: '#f7f7f7',
  cardWhite: '#ffffff',
  teal: '#03d0c5',
  tealLight: '#e6faf9',
  tealDark: '#029e96',
  amber: '#ff6e1e',
  amberLight: '#fff4ed',
  amberDark: '#e55a0d',
  textPrimary: '#1a1a2e',
  textSecondary: '#64748b',
  textTertiary: '#94a3b8',
  border: '#e2e8f0',
  success: '#10b981',
  successLight: '#ecfdf5',
  messageBubbleUser: '#03d0c5',
  messageBubbleClinician: '#f1f5f9',
};

// Card component
function Card({ children, style }: any) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

// Tab button component
function TabButton({ active, label, icon: Icon, onPress }: any) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Pressable onPress={handlePress} style={styles.tabButtonWrapper}>
      <Animated.View style={[
        styles.tabButton,
        active && styles.tabButtonActive,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <Icon size={18} color={active ? COLORS.teal : COLORS.textSecondary} />
        <ThemedText style={[styles.tabButtonText, active && styles.tabButtonTextActive]}>
          {label}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
}

// Message bubble component
function MessageBubble({ message, isUser, sender, time, index }: any) {
  const slideAnim = useRef(new Animated.Value(isUser ? 30 : -30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 300, delay: index * 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, delay: index * 100, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[
      styles.messageBubbleContainer,
      isUser ? styles.messageBubbleContainerUser : styles.messageBubbleContainerClinician,
      { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }
    ]}>
      {!isUser && (
        <View style={styles.senderInfo}>
          <View style={styles.senderAvatar}>
            <ThemedText style={styles.senderAvatarText}>{sender?.charAt(0) || 'C'}</ThemedText>
          </View>
          <ThemedText style={styles.senderName}>{sender}</ThemedText>
        </View>
      )}
      <View style={[
        styles.messageBubble,
        isUser ? styles.messageBubbleUser : styles.messageBubbleClinician
      ]}>
        <ThemedText style={[
          styles.messageText,
          isUser && styles.messageTextUser
        ]}>{message}</ThemedText>
      </View>
      <ThemedText style={[
        styles.messageTime,
        isUser && styles.messageTimeUser
      ]}>{time}</ThemedText>
    </Animated.View>
  );
}

// Peer post component
function PeerPost({ author, text, meta, likes, comments, index }: any) {
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 300, delay: index * 80, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, delay: index * 80, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <Card style={styles.peerPost}>
        <View style={styles.peerPostHeader}>
          <View style={styles.peerAvatar}>
            <ThemedText style={styles.peerAvatarText}>{author.charAt(0)}</ThemedText>
          </View>
          <View style={styles.peerInfo}>
            <ThemedText style={styles.peerAuthor}>{author}</ThemedText>
            <ThemedText style={styles.peerMeta}>{meta}</ThemedText>
          </View>
        </View>
        <ThemedText style={styles.peerText}>{text}</ThemedText>
        <View style={styles.peerActions}>
          <Pressable style={styles.peerAction}>
            <Heart size={16} color={COLORS.textSecondary} />
            <ThemedText style={styles.peerActionText}>{likes}</ThemedText>
          </Pressable>
          <Pressable style={styles.peerAction}>
            <MessageSquare size={16} color={COLORS.textSecondary} />
            <ThemedText style={styles.peerActionText}>{comments}</ThemedText>
          </Pressable>
        </View>
      </Card>
    </Animated.View>
  );
}

export default function MessagesTab() {
  const [activeTab, setActiveTab] = useState<'clinician' | 'peers'>('clinician');
  const [message, setMessage] = useState('');
  const [postAsPseudonymous, setPostAsPseudonymous] = useState(true);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  // Mock messages
  const clinicianMessages = [
    { message: "Hi there! Your latest readings look stable. How are you feeling today?", isUser: false, sender: "Dr. Harper", time: "10:30 AM" },
    { message: "Feeling a bit tired but overall okay. Slept better last night.", isUser: true, time: "10:45 AM" },
    { message: "That's good to hear about the sleep. Please continue logging your symptoms. We'll review everything at your next check-in.", isUser: false, sender: "Care Team", time: "11:00 AM" },
  ];

  // Mock peer posts
  const peerPosts = [
    { author: 'Anonymous', text: "Today I finally reached my step goal three days in a row. Small wins matter!", meta: 'Activity - 2h ago', likes: 18, comments: 3 },
    { author: 'Anonymous', text: "Found a helpful article about managing evening blood pressure. Happy to share if anyone is interested.", meta: 'Education - 5h ago', likes: 12, comments: 4 },
    { author: 'Support Circle', text: "How did your check-ups go this week? Share a quick update so others know they're not alone.", meta: 'Prompt - today', likes: 7, comments: 6 },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <ThemedText style={styles.headerTitle}>Messages</ThemedText>
              <ThemedText style={styles.headerSubtitle}>Stay connected with your care team</ThemedText>
            </View>
          </View>

          {/* Tab Switcher */}
          <View style={styles.tabSwitcher}>
            <TabButton
              active={activeTab === 'clinician'}
              label="Care Team"
              icon={MessageCircle}
              onPress={() => setActiveTab('clinician')}
            />
            <TabButton
              active={activeTab === 'peers'}
              label="Peer Circle"
              icon={Users}
              onPress={() => setActiveTab('peers')}
            />
          </View>

          {/* Clinician Chat */}
          {activeTab === 'clinician' && (
            <View style={styles.chatContainer}>
              {/* Info Banner */}
              <View style={styles.infoBanner}>
                <Shield size={16} color={COLORS.teal} />
                <ThemedText style={styles.infoBannerText}>
                  Secure conversation with your care team. Messages are part of your medical record.
                </ThemedText>
              </View>

              {/* Messages */}
              <ScrollView style={styles.messagesScroll} contentContainerStyle={styles.messagesContent}>
                {clinicianMessages.map((msg, index) => (
                  <MessageBubble key={index} {...msg} index={index} />
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
                />
                <Pressable style={[styles.sendButton, !message && styles.sendButtonDisabled]}>
                  <Send size={20} color={message ? COLORS.cardWhite : COLORS.textTertiary} />
                </Pressable>
              </View>
            </View>
          )}

          {/* Peer Circle */}
          {activeTab === 'peers' && (
            <ScrollView style={styles.peersScroll} contentContainerStyle={styles.peersContent}>
              {/* Privacy Notice */}
              <Card style={styles.privacyCard}>
                <View style={styles.privacyHeader}>
                  <Shield size={20} color={COLORS.amber} />
                  <ThemedText style={styles.privacyTitle}>Peer Support Circle</ThemedText>
                </View>
                <ThemedText style={styles.privacyText}>
                  A moderated space to share experiences. This does not replace medical advice.
                </ThemedText>
                <View style={styles.privacyToggle}>
                  <View style={styles.privacyToggleInfo}>
                    <ThemedText style={styles.privacyToggleLabel}>Post anonymously</ThemedText>
                    <ThemedText style={styles.privacyToggleHint}>
                      Your identity is hidden from peers
                    </ThemedText>
                  </View>
                  <Switch
                    value={postAsPseudonymous}
                    onValueChange={setPostAsPseudonymous}
                    trackColor={{ false: COLORS.border, true: COLORS.tealLight }}
                    thumbColor={postAsPseudonymous ? COLORS.teal : COLORS.textTertiary}
                  />
                </View>
              </Card>

              {/* Compose Post */}
              <Card style={styles.composeCard}>
                <TextInput
                  style={styles.composeInput}
                  placeholder="Share an update with your circle..."
                  placeholderTextColor={COLORS.textTertiary}
                  multiline
                  numberOfLines={3}
                />
                <Pressable style={styles.postButton}>
                  <ThemedText style={styles.postButtonText}>Post</ThemedText>
                </Pressable>
              </Card>

              {/* Posts Feed */}
              <ThemedText style={styles.feedTitle}>Recent Posts</ThemedText>
              {peerPosts.map((post, index) => (
                <PeerPost key={index} {...post} index={index} />
              ))}

              {/* Moderation Notice */}
              <View style={styles.moderationNotice}>
                <Ionicons name="shield-checkmark-outline" size={14} color={COLORS.textTertiary} />
                <ThemedText style={styles.moderationText}>
                  Posts are reviewed for safety. Inappropriate content will be removed.
                </ThemedText>
              </View>

              <View style={{ height: 100 }} />
            </ScrollView>
          )}

        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  // Card - Glass style
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 8 }, shadowRadius: 24 },
      android: { elevation: 4 },
    }),
  },

  // Tab Switcher
  tabSwitcher: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  tabButtonWrapper: {
    flex: 1,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10 },
      android: { elevation: 2 },
    }),
  },
  tabButtonActive: {
    backgroundColor: 'rgba(3, 208, 197, 0.15)',
    borderWidth: 1.5,
    borderColor: COLORS.teal,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabButtonTextActive: {
    color: COLORS.teal,
  },

  // Chat Container
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.tealLight,
    padding: 12,
    borderRadius: 12,
    gap: 10,
    marginBottom: 16,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.tealDark,
  },

  // Messages
  messagesScroll: {
    flex: 1,
  },
  messagesContent: {
    paddingBottom: 20,
  },
  messageBubbleContainer: {
    marginBottom: 16,
  },
  messageBubbleContainerUser: {
    alignItems: 'flex-end',
  },
  messageBubbleContainerClinician: {
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
  messageBubbleClinician: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10 },
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

  // Input Area - Glass style
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 28,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 6 }, shadowRadius: 16 },
      android: { elevation: 4 },
    }),
  },
  messageInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.teal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.border,
  },

  // Peers Section
  peersScroll: {
    flex: 1,
  },
  peersContent: {
    paddingHorizontal: 20,
  },

  // Privacy Card
  privacyCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.amber,
    marginBottom: 16,
  },
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  privacyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  privacyToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 12,
  },
  privacyToggleInfo: {
    flex: 1,
  },
  privacyToggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  privacyToggleHint: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginTop: 2,
  },

  // Compose Card
  composeCard: {
    marginBottom: 20,
  },
  composeInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    color: COLORS.textPrimary,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  postButton: {
    backgroundColor: COLORS.teal,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  postButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.cardWhite,
  },

  // Feed
  feedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 14,
  },

  // Peer Post
  peerPost: {
    marginBottom: 12,
  },
  peerPostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  peerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.tealLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  peerAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.teal,
  },
  peerInfo: {
    flex: 1,
  },
  peerAuthor: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  peerMeta: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  peerText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    lineHeight: 22,
    marginBottom: 12,
  },
  peerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  peerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  peerActionText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  // Moderation Notice
  moderationNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  moderationText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textTertiary,
  },
});
