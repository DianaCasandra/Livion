/**
 * AIInsightsModal - AI Health Insights Modal
 * Clean, minimal design for wellness tips
 */

import { Ionicons } from '@expo/vector-icons';
import {
  Sparkles,
  X,
  Heart,
  Activity,
  Moon,
  Droplets,
  ChevronRight,
} from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { COLORS, BorderRadius } from '../../constants/Colors';
import { ThemedText } from '../atoms/ThemedText';

type AIInsightsModalProps = {
  visible: boolean;
  onClose: () => void;
};

// Insight data - simplified categories
const INSIGHTS = [
  {
    id: 'heart',
    icon: Heart,
    title: 'Heart Health',
    tip: 'Your resting heart rate has improved 5% this week. Keep up the morning walks!',
  },
  {
    id: 'activity',
    icon: Activity,
    title: 'Stay Active',
    tip: 'Try adding a 10-minute stretch after sitting for an hour to improve circulation.',
  },
  {
    id: 'sleep',
    icon: Moon,
    title: 'Sleep Quality',
    tip: 'Consider a consistent bedtime routine. Aim for 7-8 hours for optimal recovery.',
  },
  {
    id: 'hydration',
    icon: Droplets,
    title: 'Hydration',
    tip: 'Drinking water before meals can help with digestion and energy levels.',
  },
];

// Insight card component
function InsightCard({ insight, index }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const Icon = insight.icon;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View style={styles.insightCard}>
        <View style={styles.insightIconWrap}>
          <Icon size={20} color={COLORS.teal} />
        </View>
        <View style={styles.insightContent}>
          <ThemedText style={styles.insightTitle}>{insight.title}</ThemedText>
          <ThemedText style={styles.insightTip}>{insight.tip}</ThemedText>
        </View>
      </View>
    </Animated.View>
  );
}

export function AIInsightsModal({ visible, onClose }: AIInsightsModalProps) {
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

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
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
              <View style={styles.aiIconWrap}>
                <Sparkles size={22} color={COLORS.amber} />
              </View>
              <View>
                <ThemedText style={styles.headerTitle}>AI Insights</ThemedText>
                <ThemedText style={styles.headerSubtitle}>
                  Personalized wellness tips
                </ThemedText>
              </View>
            </View>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <X size={22} color={COLORS.textSecondary} />
            </Pressable>
          </View>

          {/* Summary Banner */}
          <View style={styles.summaryBanner}>
            <ThemedText style={styles.summaryText}>
              Based on your recent activity, here are some suggestions to support your health journey.
            </ThemedText>
          </View>

          {/* Insights List */}
          <ScrollView
            style={styles.insightsScroll}
            contentContainerStyle={styles.insightsContent}
            showsVerticalScrollIndicator={false}
          >
            {INSIGHTS.map((insight, index) => (
              <InsightCard key={insight.id} insight={insight} index={index} />
            ))}

            {/* More Insights Button */}
            <Pressable style={styles.moreButton}>
              <ThemedText style={styles.moreButtonText}>View more insights</ThemedText>
              <ChevronRight size={18} color={COLORS.teal} />
            </Pressable>

            <View style={{ height: 20 }} />
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Ionicons
              name="information-circle-outline"
              size={14}
              color={COLORS.textTertiary}
            />
            <ThemedText style={styles.footerText}>
              AI suggestions are for wellness only, not medical advice.
            </ThemedText>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },

  modalCard: {
    height: '75%',
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: -4 },
        shadowRadius: 16,
      },
      android: { elevation: 8 },
    }),
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 16,
    backgroundColor: COLORS.cardWhite,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  aiIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.amberLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  headerSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Summary Banner
  summaryBanner: {
    backgroundColor: COLORS.cardWhite,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  summaryText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  // Insights Scroll
  insightsScroll: {
    flex: 1,
  },

  insightsContent: {
    padding: 20,
    paddingTop: 16,
  },

  // Insight Card
  insightCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardWhite,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  insightIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.tealLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  insightContent: {
    flex: 1,
  },

  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },

  insightTip: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  // More Button
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 6,
    marginTop: 8,
  },

  moreButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.teal,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 6,
    backgroundColor: COLORS.cardWhite,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  footerText: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
});
