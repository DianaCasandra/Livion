/**
 * CarePlanTab - 2025 UX Redesign
 * Clean, minimal UI with doctor filters and AI insights
 */

import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ChevronRight,
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
import { ThemedText } from '../../../components/atoms/ThemedText';
import { AIInsightsModal } from '../../../components/molecules/AIInsightsModal';
import { COLORS } from '@/src/constants/Colors';

// Simplified doctors data - consistent color scheme
const DOCTORS = [
  { id: 'all', name: 'All', initials: 'All' },
  { id: 'dr-harper', name: 'Dr. Harper', initials: 'H' },
  { id: 'dr-chen', name: 'Dr. Chen', initials: 'C' },
  { id: 'dr-patel', name: 'Dr. Patel', initials: 'P' },
  { id: 'dr-kim', name: 'Dr. Kim', initials: 'K' },
];

// Mock tasks with doctor assignments
const TASKS_DATA = [
  { id: '1', title: 'Blood pressure check', time: '8:00 AM', doctorId: 'dr-harper', completed: true },
  { id: '2', title: 'Take medication', time: '9:00 AM', doctorId: 'dr-chen', completed: true },
  { id: '3', title: '15 min walk', time: '10:00 AM', doctorId: 'dr-harper', completed: false },
  { id: '4', title: 'Breathing exercises', time: '2:00 PM', doctorId: 'dr-patel', completed: false },
  { id: '5', title: 'Stretching', time: '4:00 PM', doctorId: 'dr-kim', completed: false },
  { id: '6', title: 'Evening reading', time: '6:00 PM', doctorId: 'dr-chen', completed: false },
];

// Doctor circle component - simplified
function DoctorCircle({ doctor, isSelected, onPress, index }: any) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.9, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
      <Pressable onPress={handlePress} style={styles.doctorCircleWrap}>
        <View
          style={[
            styles.doctorCircle,
            isSelected ? styles.doctorCircleSelected : styles.doctorCircleDefault,
          ]}
        >
          <ThemedText
            style={[
              styles.doctorInitials,
              isSelected ? styles.doctorInitialsSelected : styles.doctorInitialsDefault,
            ]}
          >
            {doctor.initials}
          </ThemedText>
        </View>
        <ThemedText style={[styles.doctorName, isSelected && styles.doctorNameSelected]}>
          {doctor.id === 'all' ? 'All' : doctor.name.split(' ')[1]}
        </ThemedText>
      </Pressable>
    </Animated.View>
  );
}

// Task item component - simplified
function TaskItem({ task, doctorName, onToggle, index }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(task.completed ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.spring(checkScale, {
      toValue: task.completed ? 1 : 0,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  }, [task.completed]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Pressable
        onPress={onToggle}
        style={[styles.taskItem, task.completed && styles.taskItemCompleted]}
      >
        {/* Checkbox */}
        <View style={[styles.taskCheckbox, task.completed && styles.taskCheckboxCompleted]}>
          {task.completed ? (
            <Animated.View style={{ transform: [{ scale: checkScale }] }}>
              <CheckCircle2 size={22} color={COLORS.teal} />
            </Animated.View>
          ) : (
            <Circle size={22} color={COLORS.textTertiary} />
          )}
        </View>

        {/* Content */}
        <View style={styles.taskContent}>
          <ThemedText style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>
            {task.title}
          </ThemedText>
          <View style={styles.taskMeta}>
            <Clock size={12} color={COLORS.textTertiary} />
            <ThemedText style={styles.taskTime}>{task.time}</ThemedText>
            <ThemedText style={styles.taskDoctor}>{doctorName}</ThemedText>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// Card component
function Card({ children, style }: any) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export default function CarePlanTab() {
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [tasks, setTasks] = useState(TASKS_DATA);
  const [aiModalVisible, setAiModalVisible] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter tasks by selected doctor
  const filteredTasks =
    selectedDoctor === 'all'
      ? tasks
      : tasks.filter((task) => task.doctorId === selectedDoctor);

  const completedCount = filteredTasks.filter((t) => t.completed).length;
  const totalCount = filteredTasks.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Get doctor name by ID
  const getDoctorName = (id: string) => {
    const doctor = DOCTORS.find((d) => d.id === id);
    return doctor ? doctor.name.split(' ')[1] : '';
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <ThemedText style={styles.headerTitle}>Care Plan</ThemedText>
              <ThemedText style={styles.headerSubtitle}>Your daily health tasks</ThemedText>
            </View>
            <View style={styles.progressPill}>
              <ThemedText style={styles.progressText}>{completedCount}/{totalCount}</ThemedText>
            </View>
          </View>

          {/* AI Insights Button - Simplified */}
          <Pressable style={styles.aiButton} onPress={() => setAiModalVisible(true)}>
            <View style={styles.aiButtonIcon}>
              <Sparkles size={20} color={COLORS.amber} />
            </View>
            <View style={styles.aiButtonContent}>
              <ThemedText style={styles.aiButtonTitle}>AI Health Insights</ThemedText>
              <ThemedText style={styles.aiButtonSubtitle}>Tips for your wellness</ThemedText>
            </View>
            <ChevronRight size={20} color={COLORS.textTertiary} />
          </Pressable>

          {/* Doctor Circles */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.doctorsScroll}
            style={styles.doctorsContainer}
          >
            {DOCTORS.map((doctor, index) => (
              <DoctorCircle
                key={doctor.id}
                doctor={doctor}
                isSelected={selectedDoctor === doctor.id}
                onPress={() => setSelectedDoctor(doctor.id)}
                index={index}
              />
            ))}
          </ScrollView>

          {/* Progress Bar */}
          <View style={styles.progressBarWrap}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
          </View>

          {/* Tasks List */}
          <ScrollView
            style={styles.tasksList}
            contentContainerStyle={styles.tasksContent}
            showsVerticalScrollIndicator={false}
          >
            {filteredTasks.length > 0 ? (
              <>
                {/* Active Tasks */}
                {filteredTasks.filter(t => !t.completed).length > 0 && (
                  <>
                    <ThemedText style={styles.sectionTitle}>To Do</ThemedText>
                    {filteredTasks
                      .filter((t) => !t.completed)
                      .map((task, index) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          doctorName={getDoctorName(task.doctorId)}
                          onToggle={() => toggleTask(task.id)}
                          index={index}
                        />
                      ))}
                  </>
                )}

                {/* Completed Tasks */}
                {filteredTasks.filter(t => t.completed).length > 0 && (
                  <>
                    <ThemedText style={[styles.sectionTitle, styles.sectionTitleCompleted]}>
                      Completed
                    </ThemedText>
                    {filteredTasks
                      .filter((t) => t.completed)
                      .map((task, index) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          doctorName={getDoctorName(task.doctorId)}
                          onToggle={() => toggleTask(task.id)}
                          index={index}
                        />
                      ))}
                  </>
                )}
              </>
            ) : (
              <Card style={styles.emptyCard}>
                <CheckCircle2 size={40} color={COLORS.teal} />
                <ThemedText style={styles.emptyTitle}>All done!</ThemedText>
                <ThemedText style={styles.emptySubtitle}>No tasks for this filter</ThemedText>
              </Card>
            )}

            <View style={{ height: 100 }} />
          </ScrollView>
        </Animated.View>
      </SafeAreaView>

      {/* AI Insights Modal */}
      <AIInsightsModal
        visible={aiModalVisible}
        onClose={() => setAiModalVisible(false)}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    marginBottom: 20,
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
  progressPill: {
    backgroundColor: COLORS.tealLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  progressText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.teal,
  },

  // Card
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12 },
      android: { elevation: 3 },
    }),
  },

  // AI Button - Clean and simple
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12 },
      android: { elevation: 3 },
    }),
  },
  aiButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.amberLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiButtonContent: {
    flex: 1,
  },
  aiButtonTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  aiButtonSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // Doctors Section
  doctorsContainer: {
    marginTop: 20,
  },
  doctorsScroll: {
    paddingHorizontal: 16,
  },
  doctorCircleWrap: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  doctorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  doctorCircleDefault: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  doctorCircleSelected: {
    backgroundColor: COLORS.teal,
    borderWidth: 0,
    ...Platform.select({
      ios: { shadowColor: COLORS.teal, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 },
      android: { elevation: 3 },
    }),
  },
  doctorInitials: {
    fontSize: 15,
    fontWeight: '600',
  },
  doctorInitialsDefault: {
    color: COLORS.textSecondary,
  },
  doctorInitialsSelected: {
    color: COLORS.cardWhite,
  },
  doctorName: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  doctorNameSelected: {
    color: COLORS.textPrimary,
    fontWeight: '500',
  },

  // Progress Bar
  progressBarWrap: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.teal,
    borderRadius: 2,
  },

  // Section Title
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 12,
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionTitleCompleted: {
    marginTop: 24,
    color: COLORS.textTertiary,
  },

  // Tasks List
  tasksList: {
    flex: 1,
    marginTop: 16,
  },
  tasksContent: {
    paddingHorizontal: 20,
  },

  // Task Item - Simplified
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  taskItemCompleted: {
    opacity: 0.6,
  },
  taskCheckbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  taskCheckboxCompleted: {
    backgroundColor: COLORS.tealLight,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  taskTime: {
    fontSize: 13,
    color: COLORS.textTertiary,
  },
  taskDoctor: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginLeft: 8,
  },

  // Empty State
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
