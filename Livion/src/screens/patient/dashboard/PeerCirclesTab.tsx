/**
 * PeerCirclesTab - Peer Support Community
 * A moderated space to share experiences with other patients
 */

import { Ionicons } from '@expo/vector-icons';
import { Users, Shield, Heart, MessageSquare } from 'lucide-react-native';
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
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Card } from '../../../components/atoms/Card';
import { COLORS } from '@/src/constants/Colors';

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

export default function PeerCirclesTab() {
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

  // Mock peer posts
  const peerPosts = [
    { author: 'Anonymous', text: "Today I finally reached my step goal three days in a row. Small wins matter!", meta: 'Activity - 2h ago', likes: 18, comments: 3 },
    { author: 'Anonymous', text: "Found a helpful article about managing evening blood pressure. Happy to share if anyone is interested.", meta: 'Education - 5h ago', likes: 12, comments: 4 },
    { author: 'Support Circle', text: "How did your check-ups go this week? Share a quick update so others know they're not alone.", meta: 'Prompt - today', likes: 7, comments: 6 },
    { author: 'Anonymous', text: "First week back to regular walking after my procedure. Taking it slow but feeling optimistic.", meta: 'Recovery - 1d ago', likes: 24, comments: 8 },
    { author: 'Anonymous', text: "Anyone else find it helpful to track their meals? I started a simple food diary and it's been eye-opening.", meta: 'Nutrition - 2d ago', likes: 15, comments: 5 },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
        <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Users size={28} color={COLORS.teal} />
              <View style={styles.headerText}>
                <ThemedText style={styles.headerTitle}>Peer Circles</ThemedText>
                <ThemedText style={styles.headerSubtitle}>Connect with others on similar journeys</ThemedText>
              </View>
            </View>
          </View>

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Privacy Notice */}
            <Card style={styles.privacyCard} highlight="amber">
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 34,
  },
  headerSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },

  // Privacy Card
  privacyCard: {
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
