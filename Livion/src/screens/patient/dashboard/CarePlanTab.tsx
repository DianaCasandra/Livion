/**
 * CarePlanTab - 2025 UX Redesign
 * Clean, task-focused interface with progress tracking
 */

import { Ionicons } from '@expo/vector-icons';
import { CheckCircle2, Circle, Clock, AlertCircle, Calendar } from 'lucide-react-native';
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
import { ThemedText } from '../../../../components/atoms/ThemedText';
import { useMockData } from '../../../../hooks/useMockData';

// Color palette (matching HomeTab)
const COLORS = {
  background: '#f7f7f7',
  cardWhite: '#ffffff',
  teal: '#03d0c5',
  tealLight: '#e6faf9',
  tealDark: '#029e96',
  amber: '#ff6e1e',
  amberLight: '#fff4ed',
  amberDark: '#e55a0d',
  textPrimary: '#1a1a2e',
  textSecondary: '#64748b',
  textTertiary: '#94a3b8',
  border: '#e2e8f0',
  success: '#10b981',
  successLight: '#ecfdf5',
  warning: '#f59e0b',
  warningLight: '#fffbeb',
  error: '#ef4444',
  errorLight: '#fef2f2',
};

// Animated card component
function Card({ children, style, onPress }: any) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, speed: 50 }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }, style]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

// Progress ring component
function ProgressRing({ progress, size = 80, strokeWidth = 8 }: any) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={[styles.progressRingBg, { width: size, height: size, borderRadius: size / 2, borderWidth: strokeWidth }]} />
      <View style={[styles.progressRingFill, {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: strokeWidth,
        borderColor: COLORS.teal,
        borderTopColor: 'transparent',
        borderRightColor: progress > 25 ? COLORS.teal : 'transparent',
        borderBottomColor: progress > 50 ? COLORS.teal : 'transparent',
        borderLeftColor: progress > 75 ? COLORS.teal : 'transparent',
        transform: [{ rotate: '-45deg' }],
      }]} />
      <View style={styles.progressRingCenter}>
        <ThemedText style={styles.progressRingText}>{progress}%</ThemedText>
      </View>
    </View>
  );
}

// Task item component
function TaskItem({ task, onToggle, index }: any) {
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(task.status === 'completed' ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 300, delay: index * 50, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, delay: index * 50, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    Animated.spring(checkScale, {
      toValue: task.status === 'completed' ? 1 : 0,
      useNativeDriver: true,
      speed: 20,
      bounciness: 12,
    }).start();
  }, [task.status]);

  const isCompleted = task.status === 'completed';
  const isOverdue = task.status === 'overdue';

  const getStatusColor = () => {
    if (isCompleted) return COLORS.teal;
    if (isOverdue) return COLORS.error;
    return COLORS.textTertiary;
  };

  const getStatusBg = () => {
    if (isCompleted) return COLORS.tealLight;
    if (isOverdue) return COLORS.errorLight;
    return COLORS.background;
  };

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }] }}>
      <Pressable onPress={onToggle} style={[styles.taskItem, isCompleted && styles.taskItemCompleted]}>
        <View style={[styles.taskCheckbox, { backgroundColor: getStatusBg(), borderColor: getStatusColor() }]}>
          {isCompleted ? (
            <Animated.View style={{ transform: [{ scale: checkScale }] }}>
              <CheckCircle2 size={22} color={COLORS.teal} />
            </Animated.View>
          ) : isOverdue ? (
            <AlertCircle size={18} color={COLORS.error} />
          ) : (
            <Circle size={22} color={COLORS.textTertiary} />
          )}
        </View>

        <View style={styles.taskContent}>
          <ThemedText style={[styles.taskTitle, isCompleted && styles.taskTitleCompleted]}>
            {task.title}
          </ThemedText>
          <ThemedText style={styles.taskDescription}>{task.description}</ThemedText>

          <View style={styles.taskMeta}>
            <Clock size={14} color={getStatusColor()} />
            <ThemedText style={[styles.taskDue, { color: getStatusColor() }]}>
              {isCompleted ? 'Completed' : isOverdue ? 'Overdue' :
                (task.dueDate instanceof Date ? task.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : task.dueDate)}
            </ThemedText>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
      </Pressable>
    </Animated.View>
  );
}

export default function CarePlanTab() {
  const { patientData } = useMockData();
  const [careTasks, setCareTasks] = useState(patientData.careTasks);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const toggleTaskStatus = (taskId: string) => {
    setCareTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'completed' ? 'due' : 'completed' }
          : task
      )
    );
  };

  const completedTasks = careTasks.filter(t => t.status === 'completed');
  const activeTasks = careTasks.filter(t => t.status !== 'completed');
  const progress = Math.round((completedTasks.length / careTasks.length) * 100);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

            {/* Header */}
            <View style={styles.header}>
              <View>
                <ThemedText style={styles.headerTitle}>Care Plan</ThemedText>
                <ThemedText style={styles.headerSubtitle}>Your personalized health tasks</ThemedText>
              </View>
              <Pressable style={styles.calendarBtn}>
                <Calendar size={22} color={COLORS.textPrimary} />
              </Pressable>
            </View>

            {/* Progress Card */}
            <Card style={styles.progressCard}>
              <View style={styles.progressContent}>
                <View style={styles.progressInfo}>
                  <ThemedText style={styles.progressTitle}>Today's Progress</ThemedText>
                  <ThemedText style={styles.progressStats}>
                    {completedTasks.length} of {careTasks.length} tasks completed
                  </ThemedText>
                  <View style={styles.progressBar}>
                    <Animated.View style={[styles.progressFill, { width: `${progress}%` }]} />
                  </View>
                </View>
                <View style={styles.progressRingWrapper}>
                  <ProgressRing progress={progress} />
                </View>
              </View>

              {progress === 100 && (
                <View style={styles.completedBanner}>
                  <CheckCircle2 size={18} color={COLORS.teal} />
                  <ThemedText style={styles.completedText}>All done for today!</ThemedText>
                </View>
              )}
            </Card>

            {/* Active Tasks */}
            {activeTasks.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <ThemedText style={styles.sectionTitle}>To Do</ThemedText>
                  <View style={styles.taskBadge}>
                    <ThemedText style={styles.taskBadgeText}>{activeTasks.length}</ThemedText>
                  </View>
                </View>

                <View style={styles.tasksList}>
                  {activeTasks.map((task, index) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      index={index}
                      onToggle={() => toggleTaskStatus(task.id)}
                    />
                  ))}
                </View>
              </>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <ThemedText style={styles.sectionTitle}>Completed</ThemedText>
                  <View style={[styles.taskBadge, styles.taskBadgeCompleted]}>
                    <ThemedText style={[styles.taskBadgeText, styles.taskBadgeTextCompleted]}>
                      {completedTasks.length}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.tasksList}>
                  {completedTasks.map((task, index) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      index={index}
                      onToggle={() => toggleTaskStatus(task.id)}
                    />
                  ))}
                </View>
              </>
            )}

            {/* Empty State */}
            {activeTasks.length === 0 && completedTasks.length === 0 && (
              <Card style={styles.emptyCard}>
                <CheckCircle2 size={48} color={COLORS.teal} />
                <ThemedText style={styles.emptyTitle}>All caught up!</ThemedText>
                <ThemedText style={styles.emptyText}>No tasks scheduled for today</ThemedText>
              </Card>
            )}

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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  calendarBtn: {
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

  // Card - Glass style
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 8 }, shadowRadius: 24 },
      android: { elevation: 4 },
    }),
  },

  // Progress Card
  progressCard: {
    marginBottom: 24,
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  progressStats: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.teal,
    borderRadius: 4,
  },
  progressRingWrapper: {
    marginLeft: 20,
  },
  progressRingBg: {
    position: 'absolute',
    borderColor: COLORS.border,
  },
  progressRingFill: {
    position: 'absolute',
  },
  progressRingCenter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRingText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.tealLight,
    marginTop: 16,
    marginHorizontal: -20,
    marginBottom: -20,
    paddingVertical: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    gap: 8,
  },
  completedText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.teal,
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  taskBadge: {
    backgroundColor: COLORS.amber,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  taskBadgeCompleted: {
    backgroundColor: COLORS.tealLight,
  },
  taskBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.cardWhite,
  },
  taskBadgeTextCompleted: {
    color: COLORS.teal,
  },

  // Tasks List
  tasksList: {
    gap: 12,
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12 },
      android: { elevation: 2 },
    }),
  },
  taskItemCompleted: {
    opacity: 0.7,
  },
  taskCheckbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  taskDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  taskDue: {
    fontSize: 13,
    fontWeight: '500',
  },

  // Empty State
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
});
