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
import { useLanguage } from '../providers/LanguageProvider';

type AIInsightsModalProps = {
  visible: boolean;
  onClose: () => void;
};

// Note: Insight categories are now created inside the component
// with translations support (see INSIGHT_CATEGORIES_TRANSLATED)

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
function InsightCard({ category, index, onPress, insightsLabel }: any) {
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
              {category.insights.length} {insightsLabel}
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
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Translated insight categories
  const INSIGHT_CATEGORIES_TRANSLATED = [
    {
      id: 'prevention',
      icon: Shield,
      title: t.aiInsights.categories.prevention,
      color: COLORS.teal,
      bgColor: COLORS.tealLight,
      insights: [
        { title: t.aiInsights.prevention.stayActive, desc: t.aiInsights.prevention.stayActiveDesc },
        { title: t.aiInsights.prevention.sleepQuality, desc: t.aiInsights.prevention.sleepQualityDesc },
      ],
    },
    {
      id: 'heart',
      icon: Heart,
      title: t.aiInsights.categories.heart,
      color: COLORS.error,
      bgColor: COLORS.errorLight,
      insights: [
        { title: t.aiInsights.heart.bloodPressure, desc: t.aiInsights.heart.bloodPressureDesc },
        { title: t.aiInsights.heart.restingHeartRate, desc: t.aiInsights.heart.restingHeartRateDesc },
      ],
    },
    {
      id: 'activity',
      icon: Activity,
      title: t.aiInsights.categories.activity,
      color: COLORS.amber,
      bgColor: COLORS.amberLight,
      insights: [
        { title: t.aiInsights.activity.stepGoal, desc: t.aiInsights.activity.stepGoalDesc },
        { title: t.aiInsights.activity.activeMinutes, desc: t.aiInsights.activity.activeMinutesDesc },
      ],
    },
    {
      id: 'mental',
      icon: Brain,
      title: t.aiInsights.categories.mental,
      color: COLORS.purple,
      bgColor: COLORS.purpleLight,
      insights: [
        { title: t.aiInsights.mental.stressLevels, desc: t.aiInsights.mental.stressLevelsDesc },
        { title: t.aiInsights.mental.moodTracking, desc: t.aiInsights.mental.moodTrackingDesc },
      ],
    },
    {
      id: 'nutrition',
      icon: Leaf,
      title: t.aiInsights.categories.nutrition,
      color: COLORS.success,
      bgColor: COLORS.successLight,
      insights: [
        { title: t.aiInsights.nutrition.hydration, desc: t.aiInsights.nutrition.hydrationDesc },
        { title: t.aiInsights.nutrition.balancedDiet, desc: t.aiInsights.nutrition.balancedDietDesc },
      ],
    },
  ];

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
                <ThemedText style={styles.headerTitle}>{t.aiInsights.title}</ThemedText>
                <ThemedText style={styles.headerSubtitle}>
                  {t.aiInsights.personalizedForYou}
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
              label={t.aiInsights.healthScore}
              color={COLORS.teal}
            />
            <QuickStat
              icon={Heart}
              value={t.aiInsights.good}
              label={t.aiInsights.heartHealth}
              color="#ef4444"
            />
            <QuickStat
              icon={Activity}
              value={t.aiInsights.active}
              label={t.aiInsights.lifestyle}
              color={COLORS.amber}
            />
          </View>

          {/* AI Summary Banner */}
          <View style={styles.aiBanner}>
            <Sparkles size={18} color={COLORS.amber} />
            <ThemedText style={styles.aiBannerText}>
              {t.aiInsights.aiBannerText}
            </ThemedText>
          </View>

          {/* Insight Categories */}
          <ScrollView
            style={styles.insightsScroll}
            contentContainerStyle={styles.insightsContent}
            showsVerticalScrollIndicator={false}
          >
            {INSIGHT_CATEGORIES_TRANSLATED.map((category, index) => (
              <InsightCard
                key={category.id}
                category={category}
                index={index}
                onPress={() => setSelectedCategory(category.id)}
                insightsLabel={t.aiInsights.insights}
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
              {t.aiInsights.disclaimer}
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
