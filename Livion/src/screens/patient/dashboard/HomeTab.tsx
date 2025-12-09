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
import {
  Activity,
  Heart,
  Moon,
  Sparkles,
  CheckCircle2,
  Smile,
  Meh,
  Frown,
  AlertCircle,
  Menu,
} from 'lucide-react-native';
import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Components
import { ThemedText } from '../../../components/atoms/ThemedText';
import { Card } from '../../../components/atoms/Card';
import { VitalCard } from '../../../components/molecules/VitalCard';
import { TaskItem } from '../../../components/molecules/TaskItem';
import { SideMenu } from '../../../components/molecules/SideMenu';
import { SupportModal } from '../../../components/molecules/SupportModal';
import { WelcomeBlob } from '../../../components/molecules/WelcomeBlob';
import { COLORS } from '@/src/constants/Colors';

// Get current greeting
const getGreeting = () => {
  const currentHour = new Date().getHours();
  return currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
};

// Initial tasks data
const INITIAL_TASKS = [
  { id: '1', title: 'Morning blood pressure', time: 'Before 9:00 AM', done: true, doneTime: 'Completed at 8:30 AM' },
  { id: '2', title: '10 minute walk', time: 'Before 3:00 PM', done: true, doneTime: 'Completed at 1:15 PM' },
  { id: '3', title: 'Evening check-in', time: 'Before 10:00 PM', done: false, doneTime: null },
];

// Mood options data
const MOOD_OPTIONS = [
  { id: 'great', icon: Smile, label: 'Great', color: COLORS.teal },
  { id: 'okay', icon: Meh, label: 'Okay', color: COLORS.amber },
  { id: 'low', icon: Frown, label: 'Low', color: COLORS.warning },
  { id: 'rough', icon: AlertCircle, label: 'Rough', color: COLORS.error },
];

export default function HomeTab() {
  const navigation = useNavigation();
  const greeting = getGreeting();

  const [showDashboard, setShowDashboard] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never);
  };

  // Handle mood selection
  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    if (moodId === 'rough') {
      setShowSupportModal(true);
    }
  };

  // Toggle task and sort: undone first, done at bottom
  const toggleTask = (taskId: string) => {
    setTasks(prev => {
      const updated = prev.map(task => {
        if (task.id === taskId) {
          const now = new Date();
          const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          return {
            ...task,
            done: !task.done,
            doneTime: !task.done ? `Completed at ${timeStr}` : null,
          };
        }
        return task;
      });
      // Sort: undone tasks first, done tasks at bottom
      return updated.sort((a, b) => Number(a.done) - Number(b.done));
    });
  };

  // Count completed tasks
  const completedCount = tasks.filter(t => t.done).length;

  // Transition animations
  const welcomeOpacity = useRef(new Animated.Value(1)).current;
  const dashboardOpacity = useRef(new Animated.Value(0)).current;
  const dashboardSlide = useRef(new Animated.Value(50)).current;
  // Entrance animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleBlobPress = () => {
    // Animate welcome out
    Animated.parallel([
      Animated.timing(welcomeOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowDashboard(true);
      // Animate dashboard in
      Animated.parallel([
        Animated.timing(dashboardOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(dashboardSlide, {
          toValue: 0,
          tension: 50,
          friction: 9,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  // Welcome screen with blob
  if (!showDashboard) {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
          <Animated.View style={[styles.welcomeWrapper, { opacity: welcomeOpacity }]}>
            <WelcomeBlob
              onPress={handleBlobPress}
              healthStatus="You are in healthy shape"
              greeting={greeting}
              userName="Darian"
            />
          </Animated.View>
        </SafeAreaView>
      </View>
    );
  }

  // Full dashboard
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
        <Animated.View
          style={[
            styles.dashboardWrapper,
            {
              opacity: dashboardOpacity,
              transform: [{ translateY: dashboardSlide }],
            },
          ]}
        >
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
                <Pressable style={styles.menuBtn} onPress={() => setMenuVisible(true)}>
                  <Menu size={24} color={COLORS.textPrimary} />
                </Pressable>
              </View>

              {/* Vitals Section */}
              <ThemedText style={styles.sectionTitle}>Your day at a glance</ThemedText>

              <View style={styles.vitalsGrid}>
                <VitalCard
                  icon={Activity}
                  iconColor={COLORS.amber}
                  value="7,820"
                  unit="steps"
                  subtitle="78% of goal"
                  progress={78}
                />
                <View style={styles.vitalsRow}>
                  <VitalCard
                    icon={Heart}
                    iconColor={COLORS.teal}
                    value="68"
                    unit="bpm"
                    subtitle="resting"
                    style={styles.vitalHalf}
                  />
                  <VitalCard
                    icon={Moon}
                    iconColor="#8B5CF6"
                    value="7h 42m"
                    unit=""
                    subtitle="good sleep"
                    style={styles.vitalHalf}
                  />
                </View>
              </View>

              {/* Mood Check-in */}
              <Card style={styles.moodCard} highlight="teal">
                <View style={styles.moodHeader}>
                  <Sparkles size={20} color={COLORS.teal} />
                  <ThemedText style={styles.moodTitle}>How are you feeling?</ThemedText>
                </View>
                <View style={styles.moodOptions}>
                  {MOOD_OPTIONS.map((mood) => {
                    const isSelected = selectedMood === mood.id;
                    return (
                      <Pressable
                        key={mood.id}
                        style={[
                          styles.moodOption,
                          isSelected && styles.moodOptionSelected,
                          isSelected && { borderColor: mood.color, backgroundColor: mood.color + '20' },
                        ]}
                        onPress={() => handleMoodSelect(mood.id)}
                      >
                        <mood.icon size={28} color={isSelected ? mood.color : COLORS.textTertiary} />
                        <ThemedText style={[styles.moodLabel, isSelected && { color: mood.color }]}>
                          {mood.label}
                        </ThemedText>
                      </Pressable>
                    );
                  })}
                </View>
                <ThemedText style={styles.moodHint}>
                  {selectedMood ? 'Mood logged!' : 'Tap to log your mood'}
                </ThemedText>
              </Card>

              {/* Today's Tasks */}
              <View style={styles.tasksHeader}>
                <ThemedText style={styles.sectionTitle}>Today's plan</ThemedText>
                <ThemedText style={[styles.taskCount, completedCount === tasks.length && { color: COLORS.success }]}>
                  {completedCount === tasks.length ? 'All done!' : `${completedCount} of ${tasks.length} done`}
                </ThemedText>
              </View>

              <Card style={[styles.tasksCard, completedCount === tasks.length && styles.tasksCardDone]}>
                {completedCount === tasks.length ? (
                  <View style={styles.allDoneContainer}>
                    <CheckCircle2 size={36} color={COLORS.success} />
                    <ThemedText style={styles.allDoneTitle}>Great job!</ThemedText>
                    <ThemedText style={styles.allDoneSubtitle}>
                      You've completed all your tasks for today
                    </ThemedText>
                  </View>
                ) : (
                  tasks.map(task => (
                    <TaskItem
                      key={task.id}
                      title={task.title}
                      time={task.done ? task.doneTime : task.time}
                      done={task.done}
                      onToggle={() => toggleTask(task.id)}
                    />
                  ))
                )}
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

              <View style={{ height: 100 }} />
            </Animated.View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>

      {/* Side Menu */}
      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onNavigate={handleNavigate}
      />

      {/* Support Modal for Rough mood */}
      <SupportModal visible={showSupportModal} onClose={() => setShowSupportModal(false)} />
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
  welcomeWrapper: {
    flex: 1,
  },
  dashboardWrapper: {
    flex: 1,
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
    lineHeight: 36,
  },
  menuBtn: {
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

  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 14,
    marginTop: 8,
  },

  // Vitals Grid
  vitalsGrid: {
    gap: 10,
    marginBottom: 16,
  },
  vitalsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  vitalHalf: {
    flex: 1,
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
    backgroundColor: COLORS.teal + '20',
    borderWidth: 2,
    borderColor: COLORS.teal,
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
  tasksCardDone: {
    backgroundColor: COLORS.success + '10',
    borderColor: COLORS.success + '30',
  },
  allDoneContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  allDoneTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.success,
    marginTop: 12,
  },
  allDoneSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
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
});
