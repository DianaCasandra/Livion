// Updated UI inspired by the screenshots (clean, light, clinic-style)
// Language kept in English. All components preserved.
// Drop-in replacement for PatientDashboardHome.

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Activity, Heart, Sparkles } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { InsightModal } from '../../../../components/atoms/InsightModal';
import { ThemedText } from '../../../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// --- Light Card ----------------------------------------------------------------
function LightCard({ children, onPress = undefined, style }: { children: React.ReactNode; onPress?: () => void; style?: any }) {
  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={[styles.card, style]}
    >
      <View style={styles.cardContent}>{children}</View>
    </Pressable>
  );
}


export default function PatientDashboardHome() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  async function askLocalAI(question : string) {
    try {
      const response = await fetch(
        'https://jolliest-joshingly-shaneka.ngrok-free.dev/ask',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question }),
        },
      );

      const data = await response.json();
      setModalMessage(data.answer || 'No response');
      setModalVisible(true);
    } catch (error) {
      setModalMessage('Could not reach the AI server.');
      setModalVisible(true);
    }
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Top Header like Regina Maria UI */}
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login' as never)}
            style={styles.topBackBtn}
          >
            <Ionicons name="chevron-back" size={26} color="#333" />
          </TouchableOpacity>

          <View style={styles.headerRightIcons}>
            <View style={styles.notifBadge}>
              <Ionicons name="notifications-outline" size={20} color="#b30000" />
            </View>
            <View style={styles.chatBadge}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color="#b30000" />
            </View>
          </View>
        </View>

        <ThemedText variant="display" weight="bold" style={styles.mainTitle}>
          Welcome back, Darian
        </ThemedText>
        <ThemedText variant="subtitle" color="secondary" style={styles.subtitle}>
          An overview of today’s vitals and care insights.
        </ThemedText>

        {/* Quick Stats (similar to first screenshot icons row) */}
        <View style={styles.quickRow}>
          <LightCard style={styles.quickCard}>
            <Activity size={20} color="#cc0000" />
            <ThemedText weight="bold" style={styles.quickValue}>7,820</ThemedText>
            <ThemedText color="secondary" style={styles.quickLabel}>Steps</ThemedText>
          </LightCard>

          <LightCard style={styles.quickCard}>
            <Heart size={20} color="#cc0000" />
            <ThemedText weight="bold" style={styles.quickValue}>68 bpm</ThemedText>
            <ThemedText color="secondary" style={styles.quickLabel}>Heart Rate</ThemedText>
          </LightCard>

          <LightCard style={styles.quickCard}>
            <Sparkles size={20} color="#cc0000" />
            <ThemedText weight="bold" style={styles.quickValue}>Steady</ThemedText>
            <ThemedText color="secondary" style={styles.quickLabel}>Mood</ThemedText>
          </LightCard>
        </View>

        {/* Insights Section */}
        <ThemedText variant="heading" weight="bold" style={styles.sectionTitle}>
          Insights
        </ThemedText>
        <ThemedText variant="body" color="secondary" style={styles.sectionCaption}>
          AI-generated, clinician-reviewed
        </ThemedText>

        <LightCard>
          <ThemedText variant="heading" weight="bold" style={styles.cardTitle}>
            Steady respiratory health
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.cardBody}>
            Your breathing rate has stayed within your agreed range.
          </ThemedText>

          <Pressable
            onPress={() =>
              askLocalAI(
                'Explain steady respiratory health insight.'
              )
            }
            style={styles.seeMoreBtn}
          >
            <ThemedText variant="caption" color="secondary">See insights</ThemedText>
          </Pressable>
        </LightCard>

        <LightCard>
          <ThemedText variant="heading" weight="bold" style={styles.cardTitle}>
            Evening blood pressure improving
          </ThemedText>
          <ThemedText variant="body" color="secondary" style={styles.cardBody}>
            Your last 3 evening measurements show a downward trend.
          </ThemedText>

          <Pressable
            onPress={() =>
              askLocalAI(
                'Explain evening blood pressure improvement.'
              )
            }
            style={styles.seeMoreBtn}
          >
            <ThemedText variant="caption" color="secondary">See insights</ThemedText>
          </Pressable>
        </LightCard>

        {/* Care Plan */}
        <ThemedText variant="heading" weight="bold" style={styles.sectionTitle}>
          Today’s plan
        </ThemedText>
        <ThemedText variant="body" color="secondary" style={styles.sectionCaption}>
          Small actions, big impact
        </ThemedText>

        <LightCard>
          <ThemedText style={styles.planItem}>• Take blood pressure before 22:00</ThemedText>
          <ThemedText style={styles.planItem}>• 10 minute walk after lunch</ThemedText>
          <ThemedText style={styles.planItem}>• Log mood & symptoms</ThemedText>
        </LightCard>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* AI Modal */}
      <InsightModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={modalMessage}
      />
    </View>
  );
}

// ------------------------------ STYLES ------------------------------
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },

  scrollContainer: {
    padding: 20,
  },

  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  topBackBtn: {
    padding: 6,
  },

  headerRightIcons: {
    flexDirection: 'row',
    gap: 16,
  },

  notifBadge: {
    padding: 6,
  },

  chatBadge: {
    padding: 6,
  },

  mainTitle: {
    marginTop: 10,
    fontSize: 26,
    color: '#111',
  },

  subtitle: {
    marginBottom: 20,
    fontSize: 14,
  },

  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  quickCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  quickValue: {
    fontSize: 18,
    marginTop: 6,
  },

  quickLabel: {
    fontSize: 11,
    marginTop: 2,
  },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 4,
    fontSize: 20,
    color: '#111',
  },

  sectionCaption: {
    marginBottom: 12,
    fontSize: 12,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  cardContent: {},

  cardTitle: {
    fontSize: 16,
    marginBottom: 6,
    color: '#111',
  },

  cardBody: {
    fontSize: 13,
    color: '#555',
  },

  seeMoreBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  planItem: {
    marginBottom: 6,
    fontSize: 14,
  },
}); 
