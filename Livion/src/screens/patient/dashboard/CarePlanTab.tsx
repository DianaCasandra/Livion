/**
 * CarePlanTab - 2025 UX Redesign
 * Doctor circles filter, AI Insights button, minimal intuitive UI
 */

import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ChevronRight,
  Heart,
  Stethoscope,
  Brain,
  Bone,
  Eye,
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
import { useLanguage } from '../../../components/providers/LanguageProvider';

// Note: Doctors and tasks data are now created inside the component
// with translations support (see DOCTORS_TRANSLATED and TASKS_TRANSLATED)

// Doctor circle component
function DoctorCircle({ doctor, isSelected, onPress, index }: any) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  const Icon = doctor.icon;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateX: slideAnim }, { scale: scaleAnim }],
      }}
    >
      <Pressable onPress={handlePress} style={styles.doctorCircleWrap}>
        <View
          style={[
            styles.doctorCircle,
            { backgroundColor: isSelected ? doctor.color : COLORS.cardWhite },
            isSelected && styles.doctorCircleSelected,
            !isSelected && { borderColor: doctor.color, borderWidth: 2 },
          ]}
        >
          {doctor.id === 'all' ? (
            <ThemedText
              style={[
                styles.doctorInitials,
                { color: isSelected ? COLORS.cardWhite : doctor.color, fontSize: 13 },
              ]}
            >
              All
            </ThemedText>
          ) : Icon ? (
            <Icon size={22} color={isSelected ? COLORS.cardWhite : doctor.color} />
          ) : (
            <ThemedText
              style={[
                styles.doctorInitials,
                { color: isSelected ? COLORS.cardWhite : doctor.color },
              ]}
            >
              {doctor.initials}
            </ThemedText>
          )}
        </View>
        <ThemedText
          style={[styles.doctorName, isSelected && styles.doctorNameSelected]}
        >
          {doctor.name}
        </ThemedText>
      </Pressable>
    </Animated.View>
  );
}

// Task item component
function TaskItem({ task, doctor, onToggle, index }: any) {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(task.completed ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        delay: index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    Animated.spring(checkScale, {
      toValue: task.completed ? 1 : 0,
      useNativeDriver: true,
      speed: 20,
      bounciness: 12,
    }).start();
  }, [task.completed]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <Pressable
        onPress={onToggle}
        style={[styles.taskItem, task.completed && styles.taskItemCompleted]}
      >
        {/* Color accent */}
        <View style={[styles.taskAccent, { backgroundColor: doctor.color }]} />

        {/* Checkbox */}
        <View
          style={[
            styles.taskCheckbox,
            task.completed && { backgroundColor: doctor.color, borderColor: doctor.color },
            !task.completed && { borderColor: doctor.color },
          ]}
        >
          {task.completed ? (
            <Animated.View style={{ transform: [{ scale: checkScale }] }}>
              <CheckCircle2 size={20} color={COLORS.cardWhite} />
            </Animated.View>
          ) : (
            <Circle size={20} color={doctor.color} />
          )}
        </View>

        {/* Content */}
        <View style={styles.taskContent}>
          <ThemedText
            style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}
          >
            {task.title}
          </ThemedText>
          <View style={styles.taskMeta}>
            <Clock size={12} color={COLORS.textTertiary} />
            <ThemedText style={styles.taskTime}>{task.time}</ThemedText>
            <View style={[styles.taskDoctorBadge, { backgroundColor: doctor.color + '20' }]}>
              <ThemedText style={[styles.taskDoctorText, { color: doctor.color }]}>
                {doctor.name}
              </ThemedText>
            </View>
          </View>
        </View>

        <ChevronRight size={18} color={COLORS.textTertiary} />
      </Pressable>
    </Animated.View>
  );
}

export default function CarePlanTab() {
  const { t } = useLanguage();
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [aiModalVisible, setAiModalVisible] = useState(false);

  // Create translated doctors data
  const DOCTORS_TRANSLATED = [
    {
      id: 'all',
      name: t.carePlan.all,
      initials: t.carePlan.all,
      color: COLORS.teal,
      specialty: t.carePlan.allTasks,
      icon: null,
    },
    {
      id: 'dr-diana',
      name: 'Dr. Diana',
      initials: 'D',
      color: COLORS.blue,
      specialty: t.carePlan.doctors.familyMedicine,
      icon: Stethoscope,
    },
    {
      id: 'dr-laurentiu',
      name: 'Dr. Laurențiu',
      initials: 'L',
      color: COLORS.error,
      specialty: t.carePlan.doctors.cardiology,
      icon: Heart,
    },
    {
      id: 'dr-adriana',
      name: 'Dr. Adriana',
      initials: 'A',
      color: COLORS.purple,
      specialty: t.carePlan.doctors.neurology,
      icon: Brain,
    },
    {
      id: 'dr-cristian',
      name: 'Dr. Cristian',
      initials: 'C',
      color: COLORS.warning,
      specialty: t.carePlan.doctors.orthopedics,
      icon: Bone,
    },
    {
      id: 'dr-laura',
      name: 'Dr. Laura',
      initials: 'L',
      color: COLORS.success,
      specialty: t.carePlan.doctors.ophthalmology,
      icon: Eye,
    },
  ];

  // Create translated tasks data
  const TASKS_TRANSLATED = [
    { id: '1', title: t.carePlan.tasks.bloodPressureCheck, time: '8:00', doctorId: 'dr-diana', completed: true },
    { id: '2', title: t.carePlan.tasks.takeHeartMedication, time: '9:00', doctorId: 'dr-laurentiu', completed: true },
    { id: '3', title: t.carePlan.tasks.morningWalk, time: '10:00', doctorId: 'dr-diana', completed: false },
    { id: '4', title: t.carePlan.tasks.cognitiveExercises, time: '11:00', doctorId: 'dr-adriana', completed: false },
    { id: '5', title: t.carePlan.tasks.stretchingRoutine, time: '14:00', doctorId: 'dr-cristian', completed: false },
    { id: '6', title: t.carePlan.tasks.eyeDrops, time: '16:00', doctorId: 'dr-laura', completed: false },
    { id: '7', title: t.carePlan.tasks.eveningBPReading, time: '18:00', doctorId: 'dr-laurentiu', completed: false },
    { id: '8', title: t.carePlan.tasks.sleepMeditation, time: '21:00', doctorId: 'dr-adriana', completed: false },
  ];

  const [tasks, setTasks] = useState(TASKS_TRANSLATED);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const buttonPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();

    // Subtle pulse animation for AI button
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse, { toValue: 1.03, duration: 1500, useNativeDriver: true }),
        Animated.timing(buttonPulse, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
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

  // Get doctor by ID
  const getDoctorById = (id: string) => DOCTORS_TRANSLATED.find((d) => d.id === id) || DOCTORS_TRANSLATED[0];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
        <Animated.View
          style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={styles.headerTitle}>{t.carePlan.title}</ThemedText>
            <View style={styles.headerRight}>
              <View style={styles.progressPill}>
                <ThemedText style={styles.progressText}>
                  {completedCount}/{totalCount}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* AI Insights Button */}
          <Animated.View style={{ transform: [{ scale: buttonPulse }] }}>
            <Pressable
              style={styles.aiButton}
              onPress={() => setAiModalVisible(true)}
            >
              <View style={styles.aiButtonIcon}>
                <Sparkles size={24} color={COLORS.teal} />
              </View>
              <View style={styles.aiButtonContent}>
                <ThemedText style={styles.aiButtonTitle}>{t.carePlan.aiInsights}</ThemedText>
                <ThemedText style={styles.aiButtonSubtitle}>
                  {t.carePlan.aiSubtitle}
                </ThemedText>
              </View>
              <ChevronRight size={22} color={COLORS.teal} />
            </Pressable>
          </Animated.View>

          {/* Doctor Circles */}
          <View style={styles.doctorsSection}>
            <ThemedText style={styles.doctorsSectionTitle}>{t.carePlan.yourCareTeam}</ThemedText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.doctorsScroll}
            >
              {DOCTORS_TRANSLATED.map((doctor, index) => (
                <DoctorCircle
                  key={doctor.id}
                  doctor={doctor}
                  isSelected={selectedDoctor === doctor.id}
                  onPress={() => setSelectedDoctor(doctor.id)}
                  index={index}
                />
              ))}
            </ScrollView>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarWrap}>
            <View style={styles.progressBarBg}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${progress}%`,
                    backgroundColor: getDoctorById(selectedDoctor).color,
                  },
                ]}
              />
            </View>
            <ThemedText style={styles.progressLabel}>{progress}% {t.carePlan.complete}</ThemedText>
          </View>

          {/* Tasks List */}
          <ScrollView
            style={styles.tasksList}
            contentContainerStyle={styles.tasksContent}
            showsVerticalScrollIndicator={false}
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  doctor={getDoctorById(task.doctorId)}
                  onToggle={() => toggleTask(task.id)}
                  index={index}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <CheckCircle2 size={48} color={COLORS.teal} />
                <ThemedText style={styles.emptyTitle}>{t.carePlan.allDone}</ThemedText>
                <ThemedText style={styles.emptySubtitle}>
                  {t.carePlan.noTasksFromDoctor}
                </ThemedText>
              </View>
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 36,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
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

  // AI Button
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.teal,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.teal,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
      },
      android: { elevation: 4 },
    }),
  },
  aiButtonIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.tealLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  aiButtonContent: {
    flex: 1,
  },
  aiButtonTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  aiButtonSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // Doctors Section
  doctorsSection: {
    marginTop: 20,
    marginBottom: 8,
  },
  doctorsSectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  doctorsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  doctorCircleWrap: {
    alignItems: 'center',
    marginHorizontal: 6,
  },
  doctorCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  doctorCircleSelected: {
    borderWidth: 0,
  },
  doctorInitials: {
    fontSize: 18,
    fontWeight: '700',
  },
  doctorName: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  doctorNameSelected: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },

  // Progress Bar
  progressBarWrap: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginTop: 6,
    textAlign: 'right',
  },

  // Tasks List
  tasksList: {
    flex: 1,
    marginTop: 8,
  },
  tasksContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  // Task Item
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: 18,
    padding: 14,
    paddingLeft: 0,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
      },
      android: { elevation: 1 },
    }),
  },
  taskItemCompleted: {
    opacity: 0.7,
  },
  taskAccent: {
    width: 4,
    height: '120%',
    borderRadius: 2,
    marginRight: 14,
  },
  taskCheckbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
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
  taskDoctorBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 4,
  },
  taskDoctorText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
