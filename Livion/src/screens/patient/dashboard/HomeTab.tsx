/**
 * HomeTab - 2025 UX Redesign
 *
 * Design principles:
 * - Glanceable: Data visible at a glance with clear visual hierarchy
 * - Organic: Soft shapes, natural reading flow
 * - Human: Conversational copy, no medical jargon upfront
 * - Breathing: Generous whitespace, not cramped
 * - Progressive: Most important info first
 */

import { Ionicons } from '@expo/vector-icons';
import { Activity, Heart, Moon, Sparkles, TrendingUp, CheckCircle2, Smile, Meh, Frown, AlertCircle } from 'lucide-react-native';
import React, { useRef, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { COLORS } from '@/src/constants/Colors';

// Animated card component with subtle press feedback
function Card({ children, style, onPress, highlight }: any) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    if (!onPress) return;
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, speed: 50 }).start();
  };

  const onPressOut = () => {
    if (!onPress) return;
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress} disabled={!onPress}>
      <Animated.View style={[
        styles.card,
        highlight === 'teal' && styles.cardTealHighlight,
        highlight === 'amber' && styles.cardAmberHighlight,
        { transform: [{ scale }] },
        style
      ]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

// Stat widget - large number with label
function StatWidget({ icon: Icon, iconColor, value, label, subtitle, trend }: any) {
  return (
    <View style={styles.statWidget}>
      <View style={[styles.statIconBg, { backgroundColor: iconColor + '15' }]}>
        <Icon size={20} color={iconColor} />
      </View>
      <ThemedText style={styles.statValue}>{value}</ThemedText>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
      {subtitle && (
        <View style={styles.statSubtitleRow}>
          {trend && <TrendingUp size={12} color={COLORS.success} />}
          <ThemedText style={styles.statSubtitle}>{subtitle}</ThemedText>
        </View>
      )}
    </View>
  );
}

// Task item with checkbox feel
function TaskItem({ title, time, done }: any) {
  return (
    <View style={[styles.taskItem, done && styles.taskItemDone]}>
      <View style={[styles.taskCheckbox, done && styles.taskCheckboxDone]}>
        {done && <CheckCircle2 size={18} color={COLORS.teal} />}
      </View>
      <View style={styles.taskContent}>
        <ThemedText style={[styles.taskTitle, done && styles.taskTitleDone]}>{title}</ThemedText>
        {time && <ThemedText style={styles.taskTime}>{time}</ThemedText>}
      </View>
    </View>
  );
}

export default function HomeTab() {
  // Entrance animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

            {/* Header */}
            <View style={styles.header}>
              <View>
                <ThemedText style={styles.greeting}>{greeting}</ThemedText>
                <ThemedText style={styles.userName}>Darian</ThemedText>
              </View>
              <Pressable style={styles.notificationBtn}>
                <Ionicons name="notifications-outline" size={24} color={COLORS.textPrimary} />
                <View style={styles.notificationDot} />
              </Pressable>
            </View>

            {/* Status Banner - Quick Glance */}
            <Card style={styles.statusBanner} highlight="teal">
              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <ThemedText style={styles.statusText}>All vitals are looking good today</ThemedText>
              </View>
              <ThemedText style={styles.statusSubtext}>Last synced 15 min ago</ThemedText>
            </Card>

            {/* Stats Grid - Bento Layout */}
            <ThemedText style={styles.sectionTitle}>Your day at a glance</ThemedText>

            <View style={styles.statsGrid}>
              {/* Large card - Steps */}
              <Card style={styles.statsLarge}>
                <StatWidget
                  icon={Activity}
                  iconColor={COLORS.amber}
                  value="7,820"
                  label="steps"
                  subtitle="78% of goal"
                  trend
                />
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '78%' }]} />
                </View>
              </Card>

              {/* Two small cards */}
              <View style={styles.statsSmallColumn}>
                <Card style={styles.statsSmall}>
                  <StatWidget
                    icon={Heart}
                    iconColor={COLORS.teal}
                    value="68"
                    label="bpm"
                    subtitle="resting"
                  />
                </Card>
                <Card style={styles.statsSmall}>
                  <StatWidget
                    icon={Moon}
                    iconColor={COLORS.amber}
                    value="7h 42m"
                    label="sleep"
                    subtitle="good quality"
                  />
                </Card>
              </View>
            </View>

            {/* Mood Check-in */}
            <Card style={styles.moodCard}>
              <View style={styles.moodHeader}>
                <Sparkles size={20} color={COLORS.amber} />
                <ThemedText style={styles.moodTitle}>How are you feeling?</ThemedText>
              </View>
              <View style={styles.moodOptions}>
                {[
                  { icon: Smile, label: 'Great', color: COLORS.success },
                  { icon: Meh, label: 'Okay', color: COLORS.teal },
                  { icon: Frown, label: 'Low', color: COLORS.amber },
                  { icon: AlertCircle, label: 'Rough', color: '#ef4444' },
                ].map((mood, i) => (
                  <Pressable key={i} style={[styles.moodOption, i === 0 && styles.moodOptionSelected]}>
                    <mood.icon size={28} color={i === 0 ? mood.color : COLORS.textTertiary} />
                    <ThemedText style={[styles.moodLabel, i === 0 && { color: mood.color }]}>{mood.label}</ThemedText>
                  </Pressable>
                ))}
              </View>
              <ThemedText style={styles.moodHint}>Tap to log your mood</ThemedText>
            </Card>

            {/* Insights Section */}
            <ThemedText style={styles.sectionTitle}>Insights for you</ThemedText>

            <Card style={styles.insightCard} highlight="amber">
              <View style={styles.insightBadge}>
                <ThemedText style={styles.insightBadgeText}>NEW</ThemedText>
              </View>
              <ThemedText style={styles.insightTitle}>Your evening readings improved</ThemedText>
              <ThemedText style={styles.insightBody}>
                Blood pressure has been trending down over the last 3 evenings. Keep up the good work!
              </ThemedText>
              <Pressable style={styles.insightAction}>
                <ThemedText style={styles.insightActionText}>See details</ThemedText>
                <Ionicons name="chevron-forward" size={16} color={COLORS.teal} />
              </Pressable>
            </Card>

            <Card style={styles.insightCard}>
              <ThemedText style={styles.insightTitle}>Breathing looks steady</ThemedText>
              <ThemedText style={styles.insightBody}>
                Your respiratory rate has stayed within your normal range all week.
              </ThemedText>
              <Pressable style={styles.insightAction}>
                <ThemedText style={styles.insightActionText}>Learn more</ThemedText>
                <Ionicons name="chevron-forward" size={16} color={COLORS.teal} />
              </Pressable>
            </Card>

            {/* Today's Tasks */}
            <View style={styles.tasksHeader}>
              <ThemedText style={styles.sectionTitle}>Today's plan</ThemedText>
              <ThemedText style={styles.taskCount}>2 of 3 done</ThemedText>
            </View>

            <Card style={styles.tasksCard}>
              <TaskItem title="Morning blood pressure" time="Completed at 8:30 AM" done />
              <TaskItem title="10 minute walk" time="Completed at 1:15 PM" done />
              <TaskItem title="Evening check-in" time="Before 10:00 PM" />
            </Card>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <Pressable style={styles.quickActionBtn}>
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.tealLight }]}>
                  <Ionicons name="add" size={24} color={COLORS.teal} />
                </View>
                <ThemedText style={styles.quickActionLabel}>Log reading</ThemedText>
              </Pressable>
              <Pressable style={styles.quickActionBtn}>
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.amberLight }]}>
                  <Ionicons name="chatbubble-outline" size={22} color={COLORS.amber} />
                </View>
                <ThemedText style={styles.quickActionLabel}>Message</ThemedText>
              </Pressable>
              <Pressable style={styles.quickActionBtn}>
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.successLight }]}>
                  <Ionicons name="calendar-outline" size={22} color={COLORS.success} />
                </View>
                <ThemedText style={styles.quickActionLabel}>Schedule</ThemedText>
              </Pressable>
            </View>

            <View style={{ height: 100 }} />
          </Animated.View>
        </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12 },
      android: { elevation: 3 },
    }),
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.amber,
  },

  // Cards - Glass style
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
  cardTealHighlight: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.teal,
    backgroundColor: 'rgba(3, 208, 197, 0.08)',
  },
  cardAmberHighlight: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.amber,
    backgroundColor: 'rgba(255, 110, 30, 0.06)',
  },

  // Status Banner
  statusBanner: {
    marginBottom: 24,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.success,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  statusSubtext: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginTop: 6,
    marginLeft: 20,
  },

  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 14,
    marginTop: 8,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statsLarge: {
    flex: 1.2,
    padding: 20,
  },
  statsSmallColumn: {
    flex: 1,
    gap: 12,
  },
  statsSmall: {
    flex: 1,
    padding: 14,
  },

  // Stat Widget
  statWidget: {
    alignItems: 'flex-start',
  },
  statIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 32,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  statSubtitle: {
    fontSize: 12,
    color: COLORS.success,
    fontWeight: '500',
  },

  // Progress Bar
  progressBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.amber,
    borderRadius: 3,
  },

  // Mood Card
  moodCard: {
    marginBottom: 24,
  },
  moodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  moodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  moodOption: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  moodOptionSelected: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 2,
    borderColor: COLORS.success,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  moodHint: {
    fontSize: 13,
    color: COLORS.textTertiary,
    textAlign: 'center',
  },

  // Insight Card
  insightCard: {
    marginBottom: 12,
  },
  insightBadge: {
    backgroundColor: COLORS.amberLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  insightBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.amber,
    letterSpacing: 0.5,
  },
  insightTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  insightBody: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 21,
    marginBottom: 12,
  },
  insightAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  insightActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.teal,
  },

  // Tasks
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  taskCount: {
    fontSize: 14,
    color: COLORS.teal,
    fontWeight: '600',
  },
  tasksCard: {
    padding: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  taskItemDone: {
    opacity: 0.7,
  },
  taskCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCheckboxDone: {
    borderColor: COLORS.teal,
    backgroundColor: COLORS.tealLight,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  taskTime: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginTop: 3,
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    paddingHorizontal: 20,
  },
  quickActionBtn: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8 },
      android: { elevation: 2 },
    }),
  },
  quickActionLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
