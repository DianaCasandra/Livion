import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../components/atoms/Button';
import { InputField } from '../../../components/atoms/InputField';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { MessageBubble } from '../../../components/molecules/MessageBubble';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';

const { width: SCREEN_W } = Dimensions.get('window');

// ---------------------------------------------------------------------
// GLOWY CONTAINER (smaller, lighter, more airy)
// ---------------------------------------------------------------------
function GlowyContainer({ children, style }: any) {
  return (
    <View style={[styles.glowyContainer, style]}>
      <View style={styles.cardGlow} pointerEvents="none" />
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
}

// ---------------------------------------------------------------------
// PEER POSTS
// ---------------------------------------------------------------------
const peerCirclePosts = [
  {
    id: '1',
    author: 'Anna • pseudonymous',
    type: 'achievement',
    text: 'Today I finally reached my 10,000 step goal three days in a row 🎉',
    meta: 'Activity · 2h ago',
    likes: 18,
    comments: 3,
  },
  {
    id: '2',
    author: 'Claudiu • pseudonymous',
    type: 'resource',
    text: 'Just shared a new study about cholesterol and evening snacking. It helped me understand my numbers better.',
    meta: 'Education · 5h ago',
    likes: 12,
    comments: 4,
  },
  {
    id: '3',
    author: 'Support circle',
    type: 'checkin',
    text: 'How did your blood pressure readings go this week? Share a short check-in so others see they’re not alone.',
    meta: 'Prompt · today',
    likes: 7,
    comments: 6,
  },
];

// ---------------------------------------------------------------------

export default function MessagesScreen() {
  const [activeTab, setActiveTab] = useState<'clinician' | 'peers'>('clinician');
  const [postAsPseudonymous, setPostAsPseudonymous] = useState(true);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={['#050816', '#031824', '#031b2e']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          
          {/* PAGE TITLE — smaller now */}
          <ThemedText
            variant="display"
            weight="bold"
            style={[styles.header, { fontSize: 30, lineHeight: 36 }]}
          >
            Messages
          </ThemedText>

          {/* TAB SWITCH */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tabChip, activeTab === 'clinician' && styles.tabChipActive]}
              onPress={() => setActiveTab('clinician')}
            >
              <ThemedText
                variant="body"
                style={[
                  styles.tabLabel,
                  { fontSize: 13 },
                  activeTab === 'clinician' && styles.tabLabelActive,
                ]}
              >
                Clinician chat
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabChip, activeTab === 'peers' && styles.tabChipActive]}
              onPress={() => setActiveTab('peers')}
            >
              <ThemedText
                variant="body"
                style={[
                  styles.tabLabel,
                  { fontSize: 13 },
                  activeTab === 'peers' && styles.tabLabelActive,
                ]}
              >
                Peer circle
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* ---------------------------------------------------- */}
          {/* CLINICIAN CHAT TAB */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'clinician' && (
            <>
              <ThemedText
                variant="body"
                color="secondary"
                style={[styles.sectionIntro, { fontSize: 13, lineHeight: 18 }]}
              >
                Secure conversation with your clinician and care team. Messages are part
                of your medical record.
              </ThemedText>

              <GlowyContainer style={styles.thread}>
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
                  message="Thanks for the update. Please log symptoms again later today."
                  sender="clinician"
                  senderName="Care Team"
                  timestamp={new Date()}
                />
              </GlowyContainer>

              <GlowyContainer style={styles.composer}>
                <InputField
                  placeholder="Type your message..."
                  multiline
                  style={[styles.input, { minHeight: 60 }]}
                />
                <Button variant="primary" fullWidth style={{ paddingVertical: 4 }}>
                  Send
                </Button>
              </GlowyContainer>
            </>
          )}

          {/* ---------------------------------------------------- */}
          {/* PEER CIRCLE TAB */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'peers' && (
            <>
              <GlowyContainer style={styles.disclaimerBox}>
                <ThemedText
                  variant="subtitle"
                  weight="semibold"
                  style={[styles.disclaimerTitle, { fontSize: 16 }]}
                >
                  Peer circles (moderated)
                </ThemedText>

                <ThemedText
                  variant="body"
                  color="secondary"
                  style={[styles.disclaimerText, { fontSize: 13, lineHeight: 18 }]}
                >
                  A space to share experiences. Posts are moderated. This does not replace medical advice.
                </ThemedText>

                <View style={styles.toggleRow}>
                  <View style={{ flex: 1 }}>
                    <ThemedText variant="body" style={[styles.toggleLabel, { fontSize: 13 }]}>
                      Post as pseudonymous
                    </ThemedText>

                    <ThemedText
                      variant="caption"
                      color="secondary"
                      style={[styles.toggleCaption, { fontSize: 11 }]}
                    >
                      Your identity is hidden from peers (clinicians can still see it).
                    </ThemedText>
                  </View>

                  <Switch
                    value={postAsPseudonymous}
                    onValueChange={setPostAsPseudonymous}
                    thumbColor={postAsPseudonymous ? Colors.primary.teal : '#e5e7eb'}
                    trackColor={{
                      true: 'rgba(45,212,191,0.4)',
                      false: 'rgba(148,163,184,0.6)',
                    }}
                  />
                </View>
              </GlowyContainer>

              <GlowyContainer style={styles.composer}>
                <InputField
                  placeholder={
                    postAsPseudonymous
                      ? 'Share an update with your circle (pseudonymous)...'
                      : 'Share an update with your circle...'
                  }
                  multiline
                  style={[styles.input, { minHeight: 60 }]}
                />
                <Button variant="secondary" fullWidth style={{ paddingVertical: 4 }}>
                  Post
                </Button>
              </GlowyContainer>

              {/* FEED */}
              {peerCirclePosts.map((post) => (
                <GlowyContainer key={post.id} style={styles.postCard}>
                  <ThemedText variant="caption" color="secondary" style={{ fontSize: 11 }}>
                    {post.meta}
                  </ThemedText>

                  <ThemedText
                    variant="subtitle"
                    weight="semibold"
                    style={[styles.postAuthor, { fontSize: 15 }]}
                  >
                    {post.author}
                  </ThemedText>

                  <ThemedText
                    variant="body"
                    color="primary"
                    style={[styles.postText, { fontSize: 13, lineHeight: 18 }]}
                  >
                    {post.text}
                  </ThemedText>

                  <View style={styles.postActionsRow}>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={[styles.postActionChip, { paddingVertical: 4, paddingHorizontal: 10 }]}
                    >
                      <ThemedText variant="caption" style={[styles.postActionText, { fontSize: 11 }]}>
                        ❤️ {post.likes}
                      </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {}}
                      style={[styles.postActionChip, { paddingVertical: 4, paddingHorizontal: 10 }]}
                    >
                      <ThemedText variant="caption" style={[styles.postActionText, { fontSize: 11 }]}>
                        💬 {post.comments}
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </GlowyContainer>
              ))}

              <ThemedText
                variant="caption"
                color="secondary"
                style={[styles.moderationFootnote, { fontSize: 11 }]}
              >
                Posts may be removed for unsafe advice.
              </ThemedText>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ---------------------------------------------------------------------

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  safeArea: { flex: 1, backgroundColor: 'transparent' },

  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: 70,
  },

  header: {
    color: '#fff',
    marginBottom: Spacing.md,
  },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: Spacing.md,
  },
  tabChip: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    backgroundColor: Colors.background.cardGlass,
    alignItems: 'center',
  },
  tabChipActive: {
    backgroundColor: 'rgba(34,197,235,0.15)',
    borderColor: Colors.primary.teal,
  },
  tabLabel: { color: Colors.text.secondary },
  tabLabelActive: { color: Colors.text.primary, fontWeight: '600' },

  sectionIntro: { marginBottom: Spacing.sm },

  // Clinician chat
  thread: { marginBottom: Spacing.md },
  composer: { gap: Spacing.xs, marginBottom: Spacing.md },
  input: { marginBottom: Spacing.xs },

  // Peer circle
  disclaimerBox: { marginBottom: Spacing.md },
  disclaimerTitle: { color: Colors.text.primary, marginBottom: Spacing.xs },
  disclaimerText: { marginBottom: Spacing.sm },

  toggleRow: { flexDirection: 'row', gap: Spacing.md, alignItems: 'center' },
  toggleLabel: { color: Colors.text.primary },
  toggleCaption: { fontSize: 11 },

  postCard: { marginBottom: Spacing.md },
  postAuthor: { color: Colors.text.primary, marginBottom: 2 },
  postText: { marginBottom: 6 },

  postActionsRow: { flexDirection: 'row', gap: 6 },
  postActionChip: {
    borderRadius: 999,
    backgroundColor: Colors.background.cardGlass,
    borderWidth: 1,
    borderColor: Colors.border.medium,
  },
  postActionText: { color: Colors.text.secondary },

  moderationFootnote: { marginTop: Spacing.sm },

  // Glowy container
  glowyContainer: {
    backgroundColor: Colors.background.cardGlass,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    overflow: 'hidden',
    marginBottom: 0,

    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.18, shadowOffset: { width: 0, height: 10 }, shadowRadius: 20 },
      android: { elevation: 3 },
    }),
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  cardContent: { position: 'relative', zIndex: 2 },

  // Background glows
  glowTopRight: {
    position: 'absolute',
    width: SCREEN_W * 1.2,
    height: SCREEN_W * 1.2,
    right: -SCREEN_W * 0.4,
    top: -SCREEN_W * 0.5,
    borderRadius: 999,
    backgroundColor: Colors.primary.indigo,
    opacity: 0.08,
  },
  glowBottomLeft: {
    position: 'absolute',
    width: SCREEN_W * 1.4,
    height: SCREEN_W * 1.4,
    left: -SCREEN_W * 0.5,
    bottom: -SCREEN_W * 0.6,
    borderRadius: 999,
    backgroundColor: Colors.primary.teal,
    opacity: 0.06,
  },
});
