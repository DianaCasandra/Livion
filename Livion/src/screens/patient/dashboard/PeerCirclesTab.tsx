/**
 * PeerCirclesTab - Peer Support Community
 * A moderated space to share experiences with other patients
 */

import { COLORS } from '@/src/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Activity, Brain, Dumbbell, Heart, HeartPulse, MessageSquare, Salad, Shield, Users } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../../components/atoms/Card';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { useLanguage } from '../../../components/providers/LanguageProvider';

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

// Topic filter chip component
function TopicChip({ label, icon: Icon, active, onPress }: any) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={[
          styles.topicChip,
          active && styles.topicChipActive,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Icon size={14} color={active ? COLORS.cardWhite : COLORS.teal} />
        <ThemedText style={[styles.topicChipText, active && styles.topicChipTextActive]}>
          {label}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
}

export default function PeerCirclesTab() {
  const { t } = useLanguage();
  const [postAsPseudonymous, setPostAsPseudonymous] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Topic filters
  const topics = [
    { id: 'active', label: t.peerCircles.topics?.activeLife || 'Viață Activă', icon: Activity },
    { id: 'cholesterol', label: t.peerCircles.topics?.cholesterol || 'Colesterol', icon: HeartPulse },
    { id: 'nutrition', label: t.peerCircles.topics?.nutrition || 'Nutriție', icon: Salad },
    { id: 'mental', label: t.peerCircles.topics?.mentalHealth || 'Sănătate Mentală', icon: Brain },
    { id: 'fitness', label: t.peerCircles.topics?.fitness || 'Fitness', icon: Dumbbell },
  ];

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  // Mock peer posts - using translations
  const peerPosts = [
    { author: t.peerCircles.anonymous, text: t.peerCircles.posts.post1, meta: t.peerCircles.posts.post1Meta, likes: 18, comments: 3, topic: 'active' },
    { author: t.peerCircles.anonymous, text: t.peerCircles.posts.post2, meta: t.peerCircles.posts.post2Meta, likes: 12, comments: 4, topic: 'cholesterol' },
    { author: t.peerCircles.supportCircle, text: t.peerCircles.posts.post3, meta: t.peerCircles.posts.post3Meta, likes: 7, comments: 6, topic: 'mental' },
    { author: t.peerCircles.anonymous, text: t.peerCircles.posts.post4, meta: t.peerCircles.posts.post4Meta, likes: 24, comments: 8, topic: 'fitness' },
    { author: t.peerCircles.anonymous, text: t.peerCircles.posts.post5, meta: t.peerCircles.posts.post5Meta, likes: 15, comments: 5, topic: 'nutrition' },
  ];

  // Filter posts by selected topic
  const filteredPosts = selectedTopic
    ? peerPosts.filter(post => post.topic === selectedTopic)
    : peerPosts;

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
                <ThemedText style={styles.headerTitle}>{t.peerCircles.title}</ThemedText>
                <ThemedText style={styles.headerSubtitle}>{t.peerCircles.subtitle}</ThemedText>
              </View>
            </View>
          </View>

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Privacy Notice */}
            <Card style={styles.privacyCard} highlight="teal">
              <View style={styles.privacyHeader}>
                <Shield size={20} color={COLORS.teal} />
                <ThemedText style={styles.privacyTitle}>{t.peerCircles.peerSupportCircle}</ThemedText>
              </View>
              <ThemedText style={styles.privacyText}>
                {t.peerCircles.moderatedSpace}
              </ThemedText>
              <View style={styles.privacyToggle}>
                <View style={styles.privacyToggleInfo}>
                  <ThemedText style={styles.privacyToggleLabel}>{t.peerCircles.postAnonymously}</ThemedText>
                  <ThemedText style={styles.privacyToggleHint}>
                    {t.peerCircles.identityHidden}
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
                placeholder={t.peerCircles.sharePlaceholder}
                placeholderTextColor={COLORS.textTertiary}
                multiline
                numberOfLines={3}
              />
              <Pressable style={styles.postButton}>
                <ThemedText style={styles.postButtonText}>{t.peerCircles.post}</ThemedText>
              </Pressable>
            </Card>
            
            {/* Topic Filters */}
            <View style={styles.topicsSection}>
              <ThemedText style={styles.topicsTitle}>
                {t.peerCircles.topics?.title || 'Interese'}
              </ThemedText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.topicsScroll}
              >
                {topics.map((topic) => (
                  <TopicChip
                    key={topic.id}
                    label={topic.label}
                    icon={topic.icon}
                    active={selectedTopic === topic.id}
                    onPress={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                  />
                ))}
              </ScrollView>
            </View>


            {/* Posts Feed */}
            <ThemedText style={styles.feedTitle}>{t.peerCircles.recentPosts}</ThemedText>
            {filteredPosts.map((post, index) => (
              <PeerPost key={index} {...post} index={index} />
            ))}

            {/* Moderation Notice */}
            <View style={styles.moderationNotice}>
              <Ionicons name="shield-checkmark-outline" size={14} color={COLORS.textTertiary} />
              <ThemedText style={styles.moderationText}>
                {t.peerCircles.moderationNotice}
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

  // Topics Section
  topicsSection: {
    marginBottom: 20,
  },
  topicsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  topicsScroll: {
    gap: 10,
    paddingRight: 20,
  },
  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.tealLight,
    borderWidth: 1,
    borderColor: COLORS.teal,
  },
  topicChipActive: {
    backgroundColor: COLORS.teal,
  },
  topicChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.teal,
  },
  topicChipTextActive: {
    color: COLORS.cardWhite,
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
