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
  TrendingUp,
  CheckCircle2,
  Smile,
  Meh,
  Frown,
  AlertCircle,
  Menu,
  User,
  BookOpen,
  Stethoscope,
  Settings,
  X,
  ChevronRight,
  LogOut,
  HelpCircle,
  Phone,
  MessageCircle,
} from 'lucide-react-native';
import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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

// Compact Vital Card - centered design with icon accent
function VitalCard({ icon: Icon, iconColor, value, unit, subtitle, progress, style }: any) {
  return (
    <Card style={[styles.vitalCard, style]}>
      <View style={styles.vitalContent}>
        <View style={[styles.vitalIconCircle, { backgroundColor: iconColor + '18' }]}>
          <Icon size={22} color={iconColor} strokeWidth={2.5} />
        </View>
        <View style={styles.vitalInfo}>
          <View style={styles.vitalValueRow}>
            <ThemedText style={styles.vitalValue}>{value}</ThemedText>
            <ThemedText style={styles.vitalUnit}>{unit}</ThemedText>
          </View>
          <ThemedText style={[styles.vitalSubtitle, { color: iconColor }]}>{subtitle}</ThemedText>
        </View>
      </View>
      {progress !== undefined && (
        <View style={styles.vitalProgressBar}>
          <View style={[styles.vitalProgressFill, { width: `${progress}%`, backgroundColor: iconColor }]} />
        </View>
      )}
    </Card>
  );
}

// Task item with checkbox feel - clickable
function TaskItem({ title, time, done, onToggle }: any) {
  return (
    <Pressable onPress={onToggle}>
      <View style={[styles.taskItem, done && styles.taskItemDone]}>
        <View style={[styles.taskCheckbox, done && styles.taskCheckboxDone]}>
          {done && <CheckCircle2 size={18} color={COLORS.teal} />}
        </View>
        <View style={styles.taskContent}>
          <ThemedText style={[styles.taskTitle, done && styles.taskTitleDone]}>{title}</ThemedText>
          {time && <ThemedText style={styles.taskTime}>{time}</ThemedText>}
        </View>
      </View>
    </Pressable>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Menu items configuration
const MENU_ITEMS = [
  { id: 'profile', icon: User, label: 'My Profile', color: COLORS.teal },
  { id: 'glossary', icon: BookOpen, label: 'Lab Results & Glossary', color: COLORS.amber },
  { id: 'doctors', icon: Stethoscope, label: 'My Doctors', color: COLORS.success },
  { id: 'settings', icon: Settings, label: 'Settings', color: COLORS.textSecondary },
  { id: 'help', icon: HelpCircle, label: 'Help & Support', color: COLORS.textSecondary },
];

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

// Side Menu Component
function SideMenu({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset to starting position before animating in
      slideAnim.setValue(SCREEN_WIDTH);
      fadeAnim.setValue(0);

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
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleMenuPress = (id: string) => {
    console.log('Menu item pressed:', id);
    handleClose();
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={handleClose}>
      <View style={styles.menuContainer}>
        <Animated.View style={[styles.menuBackdrop, { opacity: fadeAnim }]}>
          <Pressable style={styles.menuBackdropPress} onPress={handleClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.menuPanel,
            {
              transform: [{ translateX: slideAnim }],
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <View style={styles.menuHeader}>
            <View style={styles.menuProfileSection}>
              <View style={styles.menuAvatar}>
                <ThemedText style={styles.menuAvatarText}>D</ThemedText>
              </View>
              <View style={styles.menuProfileInfo}>
                <ThemedText style={styles.menuProfileName}>Darian</ThemedText>
                <ThemedText style={styles.menuProfileEmail}>darian@email.com</ThemedText>
              </View>
            </View>
            <Pressable style={styles.menuCloseBtn} onPress={handleClose}>
              <X size={24} color={COLORS.textSecondary} />
            </Pressable>
          </View>

          <ScrollView style={styles.menuContent} showsVerticalScrollIndicator={false}>
            {MENU_ITEMS.map((item) => (
              <Pressable
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.id)}
              >
                <View style={[styles.menuItemIcon, { backgroundColor: item.color + '15' }]}>
                  <item.icon size={22} color={item.color} />
                </View>
                <ThemedText style={styles.menuItemLabel}>{item.label}</ThemedText>
                <ChevronRight size={20} color={COLORS.textTertiary} />
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.menuFooter}>
            <Pressable style={styles.menuLogout} onPress={() => handleMenuPress('logout')}>
              <LogOut size={20} color={COLORS.error} />
              <ThemedText style={styles.menuLogoutText}>Log Out</ThemedText>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

// Support Modal for "Rough" mood
function SupportModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.supportModalOverlay}>
        <View style={styles.supportModalContent}>
          <View style={styles.supportModalHeader}>
            <View style={styles.supportModalIconCircle}>
              <Heart size={28} color="#fff" />
            </View>
            <Pressable style={styles.supportModalClose} onPress={onClose}>
              <X size={20} color={COLORS.textSecondary} />
            </Pressable>
          </View>

          <ThemedText style={styles.supportModalTitle}>We're here for you</ThemedText>
          <ThemedText style={styles.supportModalSubtitle}>
            It's okay to have rough days. Would you like to reach out to your care team?
          </ThemedText>

          <View style={styles.supportModalActions}>
            <Pressable style={styles.supportActionBtn} onPress={onClose}>
              <View style={[styles.supportActionIcon, { backgroundColor: COLORS.teal + '20' }]}>
                <Phone size={22} color={COLORS.teal} />
              </View>
              <View style={styles.supportActionText}>
                <ThemedText style={styles.supportActionTitle}>Call Dr. Sarah</ThemedText>
                <ThemedText style={styles.supportActionSubtitle}>Family Physician</ThemedText>
              </View>
              <ChevronRight size={20} color={COLORS.textTertiary} />
            </Pressable>

            <Pressable style={styles.supportActionBtn} onPress={onClose}>
              <View style={[styles.supportActionIcon, { backgroundColor: COLORS.amber + '20' }]}>
                <MessageCircle size={22} color={COLORS.amber} />
              </View>
              <View style={styles.supportActionText}>
                <ThemedText style={styles.supportActionTitle}>Send a message</ThemedText>
                <ThemedText style={styles.supportActionSubtitle}>Get a response within 24h</ThemedText>
              </View>
              <ChevronRight size={20} color={COLORS.textTertiary} />
            </Pressable>
          </View>

          <Pressable style={styles.supportDismissBtn} onPress={onClose}>
            <ThemedText style={styles.supportDismissText}>I'm okay for now</ThemedText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

// Welcome Blob Component
function WelcomeBlob({ onPress, healthStatus }: { onPress: () => void; healthStatus: string }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scalePress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Breathing/pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 8,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scalePress, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scalePress, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  return (
    <View style={styles.welcomeContainer}>
      {/* Greeting */}
      <View style={styles.welcomeHeader}>
        <ThemedText style={styles.welcomeGreeting}>{greeting}</ThemedText>
        <ThemedText style={styles.welcomeName}>Darian</ThemedText>
      </View>

      {/* Blob */}
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.blobPressable}
      >
        {/* Outer glow */}
        <Animated.View
          style={[
            styles.blobGlow,
            {
              opacity: glowAnim,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />

        {/* Main blob */}
        <Animated.View
          style={[
            styles.blob,
            {
              transform: [
                { scale: Animated.multiply(pulseAnim, scalePress) },
                { translateY: floatAnim },
              ],
            },
          ]}
        >
          {/* Inner gradient effect */}
          <View style={styles.blobInner}>
            <Heart size={48} color="rgba(255, 255, 255, 0.9)" />
          </View>
        </Animated.View>
      </Pressable>

      {/* Health Status Message */}
      <View style={styles.healthMessageContainer}>
        <ThemedText style={styles.healthMessage}>{healthStatus}</ThemedText>
        <ThemedText style={styles.tapHint}>Tap to see your details</ThemedText>
      </View>
    </View>
  );
}

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
  const [showDashboard, setShowDashboard] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);

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
                      style={[styles.moodOption, isSelected && styles.moodOptionSelected, isSelected && { borderColor: mood.color, backgroundColor: mood.color + '20' }]}
                      onPress={() => handleMoodSelect(mood.id)}
                    >
                      <mood.icon size={28} color={isSelected ? mood.color : COLORS.textTertiary} />
                      <ThemedText style={[styles.moodLabel, isSelected && { color: mood.color }]}>{mood.label}</ThemedText>
                    </Pressable>
                  );
                })}
              </View>
              <ThemedText style={styles.moodHint}>{selectedMood ? 'Mood logged!' : 'Tap to log your mood'}</ThemedText>
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
                  <ThemedText style={styles.allDoneSubtitle}>You've completed all your tasks for today</ThemedText>
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

            {/* Quick Actions */}


              <View style={{ height: 100 }} />
            </Animated.View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>

      {/* Side Menu */}
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />

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

  // Vitals Grid
  vitalsGrid: {
    gap: 10,
    marginBottom: 16,
  },
  vitalsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  vitalCard: {
    padding: 16,
    marginBottom: 0,
  },
  vitalHalf: {
    flex: 1,
  },
  vitalContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vitalIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  vitalInfo: {
    flex: 1,
  },
  vitalValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  vitalValue: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  vitalUnit: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  vitalSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  vitalProgressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  vitalProgressFill: {
    height: '100%',
    borderRadius: 2,
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

  // Welcome Screen & Blob
  welcomeWrapper: {
    flex: 1,
  },
  dashboardWrapper: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  welcomeHeader: {
    alignItems: 'center',
    marginBottom: 60,
  },
  welcomeGreeting: {
    fontSize: 18,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  welcomeName: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 4,
    lineHeight: 44,
  },
  blobPressable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 220,
  },
  blobGlow: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: COLORS.teal,
  },
  blob: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.teal,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.teal,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 30,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  blobInner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthMessageContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  healthMessage: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  tapHint: {
    fontSize: 15,
    color: COLORS.textTertiary,
    marginTop: 12,
  },

  // Side Menu
  menuContainer: {
    flex: 1,
  },
  menuBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuBackdropPress: {
    flex: 1,
  },
  menuPanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: COLORS.cardWhite,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: -4, height: 0 },
        shadowRadius: 20,
      },
      android: { elevation: 10 },
    }),
  },
  menuSafeArea: {
    flex: 1,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuProfileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.teal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.cardWhite,
  },
  menuProfileInfo: {
    flex: 1,
  },
  menuProfileName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  menuProfileEmail: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  menuCloseBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    paddingTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuItemLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  menuFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 20,
  },
  menuLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLogoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.error,
  },

  // Support Modal
  supportModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  supportModalContent: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 30,
      },
      android: { elevation: 10 },
    }),
  },
  supportModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  supportModalIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportModalClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportModalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  supportModalSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  supportModalActions: {
    gap: 12,
    marginBottom: 20,
  },
  supportActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 14,
  },
  supportActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  supportActionText: {
    flex: 1,
  },
  supportActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  supportActionSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  supportDismissBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  supportDismissText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textTertiary,
  },
});
