/**
 * AIInsightsModal - AI Health Insights Modal
 * Shows AI-powered insights on prevention and chronic disease management
 */

import { Ionicons } from '@expo/vector-icons';
import {
  Sparkles,
  X,
  Heart,
  Shield,
  Activity,
  Brain,
  Leaf,
  TrendingUp,
  ChevronRight,
} from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, BorderRadius, Spacing } from '../../constants/Colors';
import { ThemedText } from '../atoms/ThemedText';

type AIInsightsModalProps = {
  visible: boolean;
  onClose: () => void;
};

// Insight card data
const INSIGHT_CATEGORIES = [
  {
    id: 'prevention',
    icon: Shield,
    title: 'Prevention',
    color: COLORS.teal,
    bgColor: COLORS.tealLight,
    insights: [
      { title: 'Stay Active', desc: '30 min daily walking reduces heart risk by 35%' },
      { title: 'Sleep Quality', desc: '7-8 hours improves immune function' },
    ],
  },
  {
    id: 'heart',
    icon: Heart,
    title: 'Heart Health',
    color: '#ef4444',
    bgColor: '#fef2f2',
    insights: [
      { title: 'Blood Pressure', desc: 'Your readings show improvement this week' },
      { title: 'Resting Heart Rate', desc: 'Trending down - great progress!' },
    ],
  },
  {
    id: 'activity',
    icon: Activity,
    title: 'Activity',
    color: COLORS.amber,
    bgColor: COLORS.amberLight,
    insights: [
      { title: 'Step Goal', desc: "You're averaging 7,500 steps daily" },
      { title: 'Active Minutes', desc: '45 min more than last week' },
    ],
  },
  {
    id: 'mental',
    icon: Brain,
    title: 'Mental Wellness',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    insights: [
      { title: 'Stress Levels', desc: 'Consider 5-min breathing exercises' },
      { title: 'Mood Tracking', desc: 'Consistent logging helps identify patterns' },
    ],
  },
  {
    id: 'nutrition',
    icon: Leaf,
    title: 'Nutrition',
    color: COLORS.success,
    bgColor: COLORS.successLight,
    insights: [
      { title: 'Hydration', desc: 'Aim for 8 glasses of water daily' },
      { title: 'Balanced Diet', desc: 'Add more leafy greens this week' },
    ],
  },
];

// Quick stat component
function QuickStat({ icon: Icon, value, label, color }: any) {
  return (
    <View style={styles.quickStat}>
      <View style={[styles.quickStatIcon, { backgroundColor: color + '20' }]}>
        <Icon size={18} color={color} />
      </View>
      <ThemedText style={styles.quickStatValue}>{value}</ThemedText>
      <ThemedText style={styles.quickStatLabel}>{label}</ThemedText>
    </View>
  );
}

// Insight category card
function InsightCard({ category, index, onPress }: any) {
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const Icon = category.icon;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={styles.insightCard}
      >
        <View style={styles.insightCardHeader}>
          <View style={[styles.insightCardIcon, { backgroundColor: category.bgColor }]}>
            <Icon size={22} color={category.color} />
          </View>
          <View style={styles.insightCardTitleWrap}>
            <ThemedText style={styles.insightCardTitle}>{category.title}</ThemedText>
            <ThemedText style={styles.insightCardCount}>
              {category.insights.length} insights
            </ThemedText>
          </View>
          <ChevronRight size={20} color={COLORS.textTertiary} />
        </View>

        <View style={styles.insightCardBody}>
          {category.insights.map((insight: any, i: number) => (
            <View key={i} style={styles.insightItem}>
              <View style={[styles.insightDot, { backgroundColor: category.color }]} />
              <View style={styles.insightItemContent}>
                <ThemedText style={styles.insightItemTitle}>{insight.title}</ThemedText>
                <ThemedText style={styles.insightItemDesc}>{insight.desc}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </Pressable>
    </Animated.View>
  );
}

export function AIInsightsModal({ visible, onClose }: AIInsightsModalProps) {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
                <Sparkles size={24} color={COLORS.amber} />
              </View>
              <View>
                <ThemedText style={styles.headerTitle}>AI Insights</ThemedText>
                <ThemedText style={styles.headerSubtitle}>
                  Personalized for you
                </ThemedText>
              </View>
            </View>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <X size={22} color={COLORS.textSecondary} />
            </Pressable>
          </View>

          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <QuickStat
              icon={TrendingUp}
              value="85%"
              label="Health Score"
              color={COLORS.teal}
            />
            <QuickStat
              icon={Heart}
              value="Good"
              label="Heart Health"
              color="#ef4444"
            />
            <QuickStat
              icon={Activity}
              value="Active"
              label="Lifestyle"
              color={COLORS.amber}
            />
          </View>

          {/* AI Summary Banner */}
          <View style={styles.aiBanner}>
            <Sparkles size={18} color={COLORS.amber} />
            <ThemedText style={styles.aiBannerText}>
              Based on your data, focus on heart health and staying active this week.
            </ThemedText>
          </View>

          {/* Insight Categories */}
          <ScrollView
            style={styles.insightsScroll}
            contentContainerStyle={styles.insightsContent}
            showsVerticalScrollIndicator={false}
          >
            {INSIGHT_CATEGORIES.map((category, index) => (
              <InsightCard
                key={category.id}
                category={category}
                index={index}
                onPress={() => setSelectedCategory(category.id)}
              />
            ))}

            <View style={{ height: 30 }} />
          </ScrollView>

          {/* Footer */}
          <View style={[styles.footer, { paddingBottom: 14 + insets.bottom }]}>
            <Ionicons
              name="information-circle-outline"
              size={14}
              color={COLORS.textTertiary}
            />
            <ThemedText style={styles.footerText}>
              Insights are AI-generated suggestions, not medical advice.
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalCard: {
    height: '92%',
    backgroundColor: COLORS.background,
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
    padding: 20,
    paddingBottom: 16,
    backgroundColor: COLORS.cardWhite,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  aiIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.amberLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Quick Stats
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.cardWhite,
  },

  quickStat: {
    alignItems: 'center',
  },

  quickStatIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  quickStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  quickStatLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // AI Banner
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.amberLight,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 14,
    gap: 12,
  },

  aiBannerText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.amberDark,
    lineHeight: 20,
  },

  // Insights Scroll
  insightsScroll: {
    flex: 1,
  },

  insightsContent: {
    padding: 20,
    paddingTop: 12,
  },

  // Insight Card
  insightCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
      },
      android: { elevation: 2 },
    }),
  },

  insightCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  insightCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  insightCardTitleWrap: {
    flex: 1,
  },

  insightCardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  insightCardCount: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginTop: 2,
  },

  insightCardBody: {
    gap: 10,
  },

  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  insightDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: 10,
  },

  insightItemContent: {
    flex: 1,
  },

  insightItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },

  insightItemDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
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
