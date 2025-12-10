/**
 * SymptomsTab - Family Physician & Symptom Log Page
 * Two tabs: Family Physician contact and Symptoms Log
 * Features: Doctor profile, symptom log, chat popup, call option, urgent symptom modal
 */

import { Ionicons } from '@expo/vector-icons';
import {
  Clock,
  TrendingDown,
  TrendingUp,
  Minus,
  Send,
  Phone,
  MessageCircle,
  Calendar,
  Star,
  MapPin,
  Stethoscope,
  ClipboardList,
  X,
  Check,
} from 'lucide-react-native';
import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { ChatPopupModal } from '../../../components/molecules/ChatPopupModal';
import { UrgentContactModal } from '../../../components/molecules/UrgentContactModal';
import { COLORS } from '@/src/constants/Colors';
import { useLanguage } from '../../../components/providers/LanguageProvider';

// Doctor data
const DOCTOR_INFO = {
  name: 'Dr. Diana Popescu',
  role: 'Family Physician',
  specialty: 'Internal Medicine',
  phone: '+40 721 123 456',
  location: 'Centrul Medical Livion',
  rating: 4.9,
  experience: '15 ani',
  nextAppointment: '12 Dec 2025, 10:00',
};

// Pain level colors
const getPainColor = (level: number) => {
  if (level <= 3) return COLORS.success;
  if (level <= 6) return COLORS.warning;
  return COLORS.error;
};

// Card component
function Card({ children, style, highlight }: any) {
  return (
    <View
      style={[
        styles.card,
        highlight === 'teal' && styles.cardTealHighlight,
        highlight === 'amber' && styles.cardAmberHighlight,
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Tab button component
function TabButton({ active, label, icon: Icon, onPress }: any) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Pressable onPress={handlePress} style={styles.tabButtonWrapper}>
      <Animated.View style={[
        styles.tabButton,
        active && styles.tabButtonActive,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <Icon size={18} color={active ? COLORS.teal : COLORS.textSecondary} />
        <ThemedText style={[styles.tabButtonText, active && styles.tabButtonTextActive]}>
          {label}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
}

// Pain scale slider component
function PainScale({
  value,
  onChange,
  noPainLabel,
  severeLabel,
}: {
  value: number;
  onChange: (v: number) => void;
  noPainLabel: string;
  severeLabel: string;
}) {
  const animatedScale = useRef(new Animated.Value(1)).current;

  const handleSelect = (level: number) => {
    Animated.sequence([
      Animated.timing(animatedScale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onChange(level);
  };

  return (
    <View style={styles.painScale}>
      <View style={styles.painLabels}>
        <ThemedText style={styles.painLabelText}>{noPainLabel}</ThemedText>
        <ThemedText style={styles.painLabelText}>{severeLabel}</ThemedText>
      </View>
      <View style={styles.painTrack}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
          <Pressable
            key={level}
            onPress={() => handleSelect(level)}
            style={[
              styles.painDot,
              {
                backgroundColor:
                  level <= value ? getPainColor(value) : COLORS.border,
                transform: [{ scale: level === value ? 1.3 : 1 }],
              },
            ]}
          >
            {level === value && <View style={styles.painDotInner} />}
          </Pressable>
        ))}
      </View>
      <View style={styles.painValueContainer}>
        <ThemedText style={[styles.painValue, { color: getPainColor(value) }]}>
          {value}
        </ThemedText>
        <ThemedText style={styles.painValueLabel}>/ 10</ThemedText>
      </View>
    </View>
  );
}

// History item component
function HistoryItem({ date, symptoms, painLevel, notes, index, loggedAtLabel }: any) {
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getTrendIcon = () => {
    if (painLevel <= 3)
      return <TrendingDown size={14} color={COLORS.success} />;
    if (painLevel <= 6) return <Minus size={14} color={COLORS.warning} />;
    return <TrendingUp size={14} color={COLORS.error} />;
  };

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      <Pressable style={styles.historyItem}>
        <View style={styles.historyDate}>
          <ThemedText style={styles.historyDateText}>{date}</ThemedText>
          <View
            style={[
              styles.historyPainBadge,
              { backgroundColor: getPainColor(painLevel) + '20' },
            ]}
          >
            {getTrendIcon()}
            <ThemedText
              style={[styles.historyPainText, { color: getPainColor(painLevel) }]}
            >
              {painLevel}/10
            </ThemedText>
          </View>
        </View>
        <ThemedText style={styles.historySymptoms}>{symptoms}</ThemedText>
        {notes && (
          <ThemedText style={styles.historyNotes}>{notes}</ThemedText>
        )}
        <View style={styles.historyMeta}>
          <Clock size={12} color={COLORS.textTertiary} />
          <ThemedText style={styles.historyTime}>{loggedAtLabel} 9:30 AM</ThemedText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// Appointment slots data
const APPOINTMENT_SLOTS = [
  { id: '1', date: '2025-12-11', day: 'wednesday', time: '09:00', available: true },
  { id: '2', date: '2025-12-11', day: 'wednesday', time: '10:30', available: true },
  { id: '3', date: '2025-12-11', day: 'wednesday', time: '14:00', available: false },
  { id: '4', date: '2025-12-12', day: 'thursday', time: '09:00', available: true },
  { id: '5', date: '2025-12-12', day: 'thursday', time: '11:00', available: true },
  { id: '6', date: '2025-12-12', day: 'thursday', time: '15:30', available: true },
  { id: '7', date: '2025-12-13', day: 'friday', time: '10:00', available: true },
  { id: '8', date: '2025-12-13', day: 'friday', time: '14:30', available: false },
];

// Schedule Modal Component
function ScheduleModal({
  visible,
  onClose,
  selectedSlot,
  setSelectedSlot,
  t,
}: {
  visible: boolean;
  onClose: () => void;
  selectedSlot: string | null;
  setSelectedSlot: (id: string | null) => void;
  t: any;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, speed: 15, bounciness: 5 }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(300);
    }
  }, [visible]);

  const handleConfirm = () => {
    if (selectedSlot) {
      // Handle booking confirmation
      onClose();
      setSelectedSlot(null);
    }
  };

  const getDayName = (day: string) => {
    const days: { [key: string]: string } = t.symptoms.scheduling?.days || {
      monday: 'Luni',
      tuesday: 'Marți',
      wednesday: 'Miercuri',
      thursday: 'Joi',
      friday: 'Vineri',
      saturday: 'Sâmbătă',
      sunday: 'Duminică',
    };
    return days[day] || day;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' });
  };

  // Group slots by date
  const groupedSlots = APPOINTMENT_SLOTS.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = { day: slot.day, slots: [] };
    }
    acc[slot.date].slots.push(slot);
    return acc;
  }, {} as { [key: string]: { day: string; slots: typeof APPOINTMENT_SLOTS } });

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <Pressable style={styles.modalOverlayTouch} onPress={onClose} />
        <Animated.View style={[styles.scheduleModal, { transform: [{ translateY: slideAnim }] }]}>
          {/* Header */}
          <View style={styles.scheduleHeader}>
            <View>
              <ThemedText style={styles.scheduleTitle}>
                {t.symptoms.scheduling?.title || 'Programează o Consultație'}
              </ThemedText>
              <ThemedText style={styles.scheduleSubtitle}>
                {t.symptoms.scheduling?.subtitle || 'Selectează un interval disponibil'}
              </ThemedText>
            </View>
            <Pressable style={styles.scheduleCloseBtn} onPress={onClose}>
              <X size={20} color={COLORS.textSecondary} />
            </Pressable>
          </View>

          {/* Slots */}
          <ScrollView style={styles.slotsContainer} showsVerticalScrollIndicator={false}>
            {Object.entries(groupedSlots).map(([date, { day, slots }]) => (
              <View key={date} style={styles.daySection}>
                <ThemedText style={styles.dayTitle}>
                  {getDayName(day)}, {formatDate(date)}
                </ThemedText>
                <View style={styles.slotsRow}>
                  {slots.map((slot) => (
                    <Pressable
                      key={slot.id}
                      style={[
                        styles.slotBtn,
                        !slot.available && styles.slotBtnUnavailable,
                        selectedSlot === slot.id && styles.slotBtnSelected,
                      ]}
                      onPress={() => slot.available && setSelectedSlot(slot.id)}
                      disabled={!slot.available}
                    >
                      <ThemedText
                        style={[
                          styles.slotTime,
                          !slot.available && styles.slotTimeUnavailable,
                          selectedSlot === slot.id && styles.slotTimeSelected,
                        ]}
                      >
                        {slot.time}
                      </ThemedText>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Confirm Button */}
          <Pressable
            style={[styles.confirmBtn, !selectedSlot && styles.confirmBtnDisabled]}
            onPress={handleConfirm}
            disabled={!selectedSlot}
          >
            <Check size={18} color={COLORS.cardWhite} />
            <ThemedText style={styles.confirmBtnText}>
              {t.symptoms.scheduling?.confirm || 'Confirmă Programarea'}
            </ThemedText>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

// Romanian month names
const ROMANIAN_MONTHS = [
  'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
  'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
];

const ROMANIAN_DAYS = ['Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm', 'Dum'];

// Calendar Modal Component
function CalendarModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, speed: 15, bounciness: 5 }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(300);
    }
  }, [visible]);

  // Get days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, we need Monday = 0)
  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert to Monday-based
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  // Create calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null); // Empty cells before first day
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <Pressable style={styles.modalOverlayTouch} onPress={onClose} />
        <Animated.View style={[styles.calendarModal, { transform: [{ translateY: slideAnim }] }]}>
          {/* Header */}
          <View style={styles.calendarHeader}>
            <ThemedText style={styles.calendarTitle}>
              {ROMANIAN_MONTHS[currentMonth]} {currentYear}
            </ThemedText>
            <Pressable style={styles.scheduleCloseBtn} onPress={onClose}>
              <X size={20} color={COLORS.textSecondary} />
            </Pressable>
          </View>

          {/* Day names */}
          <View style={styles.calendarDayNames}>
            {ROMANIAN_DAYS.map((day) => (
              <ThemedText key={day} style={styles.calendarDayName}>{day}</ThemedText>
            ))}
          </View>

          {/* Calendar grid */}
          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => (
              <View key={index} style={styles.calendarDayCell}>
                {day !== null && (
                  <View style={[
                    styles.calendarDay,
                    day === currentDay && styles.calendarDayToday,
                  ]}>
                    <ThemedText style={[
                      styles.calendarDayText,
                      day === currentDay && styles.calendarDayTextToday,
                    ]}>
                      {day}
                    </ThemedText>
                  </View>
                )}
              </View>
            ))}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

export default function SymptomsTab() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'physician' | 'symptoms'>('physician');
  const [painLevel, setPainLevel] = useState(3);
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');
  const [chatVisible, setChatVisible] = useState(false);
  const [urgentModalVisible, setUrgentModalVisible] = useState(false);
  const [urgentSeverity, setUrgentSeverity] = useState<'high' | 'critical'>('high');
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Auto-trigger urgent modal when pain level is high
  useEffect(() => {
    if (painLevel >= 8) {
      setUrgentSeverity(painLevel >= 9 ? 'critical' : 'high');
      // Small delay for better UX
      const timer = setTimeout(() => {
        setUrgentModalVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [painLevel]);

  // Mock history data - translated
  const historyData = [
    {
      date: t.symptoms.history.today,
      symptoms: t.symptoms.history.entry1Symptoms,
      painLevel: 3,
      notes: t.symptoms.history.entry1Notes,
    },
    {
      date: t.symptoms.history.yesterday,
      symptoms: t.symptoms.history.entry2Symptoms,
      painLevel: 4,
      notes: '',
    },
    {
      date: t.symptoms.history.entry3Date,
      symptoms: t.symptoms.history.entry3Symptoms,
      painLevel: 2,
      notes: t.symptoms.history.entry3Notes,
    },
  ];

  const handleSubmit = () => {
    // Check for urgent symptoms before submitting
    if (painLevel >= 8) {
      setUrgentSeverity(painLevel >= 9 ? 'critical' : 'high');
      setUrgentModalVisible(true);
    }
    // Submit logic here
    setSymptoms('');
    setNotes('');
    setPainLevel(3);
  };

  const handleCall = () => {
    const phoneNumber = DOCTOR_INFO.phone.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleChat = () => {
    setUrgentModalVisible(false);
    setChatVisible(true);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
        <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <ThemedText style={styles.headerTitle}>{t.symptoms.title}</ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                {t.symptoms.subtitle}
              </ThemedText>
            </View>
            <Pressable style={styles.historyBtn} onPress={() => setCalendarModalVisible(true)}>
              <Calendar size={22} color={COLORS.textPrimary} />
            </Pressable>
          </View>

          {/* Tab Switcher */}
          <View style={styles.tabSwitcher}>
            <TabButton
              active={activeTab === 'physician'}
              label={t.symptoms.familyPhysician}
              icon={Stethoscope}
              onPress={() => setActiveTab('physician')}
            />
            <TabButton
              active={activeTab === 'symptoms'}
              label={t.symptoms.symptomsLog}
              icon={ClipboardList}
              onPress={() => setActiveTab('symptoms')}
            />
          </View>

          {/* Family Physician Tab */}
          {activeTab === 'physician' && (
            <ScrollView
              style={styles.tabContent}
              contentContainerStyle={styles.tabContentPadding}
              showsVerticalScrollIndicator={false}
            >
              {/* Doctor Profile Card */}
              <Card style={styles.doctorCard} highlight="teal">
                <View style={styles.doctorHeader}>
                  <View style={styles.doctorAvatar}>
                    <ThemedText style={styles.doctorAvatarText}>
                      {DOCTOR_INFO.name.split(' ')[1]?.charAt(0) || 'H'}
                    </ThemedText>
                  </View>
                  <View style={styles.doctorInfo}>
                    <ThemedText style={styles.doctorName}>
                      {DOCTOR_INFO.name}
                    </ThemedText>
                    <ThemedText style={styles.doctorRole}>
                      {t.symptoms.familyPhysician}
                    </ThemedText>
                    <View style={styles.doctorRating}>
                      <Star size={14} color={COLORS.amber} fill={COLORS.amber} />
                      <ThemedText style={styles.doctorRatingText}>
                        {DOCTOR_INFO.rating} • {DOCTOR_INFO.experience}
                      </ThemedText>
                    </View>
                  </View>
                </View>

                {/* Doctor Details */}
                <View style={styles.doctorDetails}>
                  <View style={styles.doctorDetailRow}>
                    <MapPin size={14} color={COLORS.textSecondary} />
                    <ThemedText style={styles.doctorDetailText}>
                      {DOCTOR_INFO.location}
                    </ThemedText>
                  </View>
                  <View style={styles.doctorDetailRow}>
                    <Calendar size={14} color={COLORS.teal} />
                    <ThemedText style={[styles.doctorDetailText, { color: COLORS.teal }]}>
                      Next: {DOCTOR_INFO.nextAppointment}
                    </ThemedText>
                  </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.doctorActions}>
                  <Pressable style={styles.doctorActionBtnSmall} onPress={handleCall}>
                    <Phone size={16} color={COLORS.cardWhite} />
                    <ThemedText style={styles.doctorActionTextSmall}>{t.symptoms.call}</ThemedText>
                  </Pressable>
                  <Pressable
                    style={[styles.doctorActionBtnSmall, styles.doctorActionBtnSecondary]}
                    onPress={() => setChatVisible(true)}
                  >
                    <MessageCircle size={16} color={COLORS.teal} />
                    <ThemedText style={styles.doctorActionTextSecondarySmall}>
                      {t.symptoms.message}
                    </ThemedText>
                  </Pressable>
                  <Pressable
                    style={[styles.doctorActionBtnSmall, styles.doctorActionBtnSchedule]}
                    onPress={() => setScheduleModalVisible(true)}
                  >
                    <Calendar size={16} color={COLORS.success} />
                    <ThemedText style={styles.doctorActionTextSchedule}>
                      {t.symptoms.schedule}
                    </ThemedText>
                  </Pressable>
                </View>
              </Card>

              {/* Info Cards */}
              <Card style={styles.infoCard}>
                <View style={styles.infoCardHeader}>
                  <Ionicons name="time-outline" size={20} color={COLORS.teal} />
                  <ThemedText style={styles.infoCardTitle}>{t.symptoms.officeHours}</ThemedText>
                </View>
                <ThemedText style={styles.infoCardText}>
                  {t.symptoms.officeHoursSchedule}
                </ThemedText>
              </Card>

              <Card style={styles.infoCard}>
                <View style={styles.infoCardHeader}>
                  <Ionicons name="alert-circle-outline" size={20} color={COLORS.amber} />
                  <ThemedText style={styles.infoCardTitle}>{t.symptoms.emergencyContact}</ThemedText>
                </View>
                <ThemedText style={styles.infoCardText}>
                  {t.symptoms.emergencyText}
                </ThemedText>
              </Card>

              <Card style={styles.infoCard} highlight="teal">
                <View style={styles.infoCardHeader}>
                  <Ionicons name="document-text-outline" size={20} color={COLORS.teal} />
                  <ThemedText style={styles.infoCardTitle}>{t.symptoms.quickTip}</ThemedText>
                </View>
                <ThemedText style={styles.infoCardText}>
                  {t.symptoms.quickTipText} {DOCTOR_INFO.name.split(' ')[0]} {t.symptoms.quickTipText2}
                </ThemedText>
                <Pressable
                  style={styles.infoCardAction}
                  onPress={() => setActiveTab('symptoms')}
                >
                  <ThemedText style={styles.infoCardActionText}>{t.symptoms.logSymptomsNow}</ThemedText>
                  <Ionicons name="chevron-forward" size={16} color={COLORS.teal} />
                </Pressable>
              </Card>

              <View style={{ height: 100 }} />
            </ScrollView>
          )}

          {/* Symptoms Log Tab */}
          {activeTab === 'symptoms' && (
            <ScrollView
              style={styles.tabContent}
              contentContainerStyle={styles.tabContentPadding}
              showsVerticalScrollIndicator={false}
            >
              {/* Symptom Log Card */}
              <Card style={styles.checkinCard}>
                <View style={styles.checkinHeader}>
                  <View style={styles.checkinBadge}>
                    <ThemedText style={styles.checkinBadgeText}>
                      {t.symptoms.logForDoctor}
                    </ThemedText>
                  </View>
                </View>

                {/* Symptoms Input */}
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.inputLabel}>
                    {t.symptoms.describeSymptoms}
                  </ThemedText>
                  <TextInput
                    style={styles.textInput}
                    placeholder={t.symptoms.symptomsPlaceholder}
                    placeholderTextColor={COLORS.textTertiary}
                    value={symptoms}
                    onChangeText={setSymptoms}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                {/* Pain Scale */}
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.inputLabel}>
                    {t.symptoms.painLevel}
                  </ThemedText>
                  <PainScale
                    value={painLevel}
                    onChange={setPainLevel}
                    noPainLabel={t.symptoms.noPain}
                    severeLabel={t.symptoms.severe}
                  />
                  {painLevel >= 7 && (
                    <View style={styles.painWarning}>
                      <Ionicons
                        name="warning"
                        size={16}
                        color={painLevel >= 9 ? COLORS.error : COLORS.warning}
                      />
                      <ThemedText
                        style={[
                          styles.painWarningText,
                          { color: painLevel >= 9 ? COLORS.error : COLORS.warning },
                        ]}
                      >
                        {painLevel >= 9
                          ? t.symptoms.criticalLevel
                          : t.symptoms.elevatedLevel}
                      </ThemedText>
                    </View>
                  )}
                </View>

                {/* Notes Input */}
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.inputLabel}>
                    {t.symptoms.additionalNotes} {DOCTOR_INFO.name.split(' ')[0]}
                  </ThemedText>
                  <TextInput
                    style={[styles.textInput, styles.textInputSmall]}
                    placeholder={t.symptoms.notesPlaceholder}
                    placeholderTextColor={COLORS.textTertiary}
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    numberOfLines={2}
                  />
                </View>

                {/* Submit Button */}
                <Pressable style={styles.submitBtn} onPress={handleSubmit}>
                  <ThemedText style={styles.submitBtnText}>
                    {t.symptoms.sendToDoctor}
                  </ThemedText>
                  <Send size={18} color={COLORS.cardWhite} />
                </Pressable>
              </Card>

              {/* Disclaimer */}
              <View style={styles.disclaimer}>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color={COLORS.textTertiary}
                />
                <ThemedText style={styles.disclaimerText}>
                  {t.symptoms.symptomsShared} {DOCTOR_INFO.name}.
                  {' '}{t.symptoms.forEmergencies}
                </ThemedText>
              </View>

              {/* History Section */}
              <View style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>{t.symptoms.recentEntries}</ThemedText>
                <Pressable>
                  <ThemedText style={styles.seeAllText}>{t.symptoms.seeAll}</ThemedText>
                </Pressable>
              </View>

              <View style={styles.historyList}>
                {historyData.map((item, index) => (
                  <HistoryItem key={index} {...item} index={index} loggedAtLabel={t.symptoms.loggedAt} />
                ))}
              </View>

              {/* Weekly Summary */}
              <Card style={styles.summaryCard}>
                <ThemedText style={styles.summaryTitle}>{t.symptoms.thisWeek}</ThemedText>
                <View style={styles.summaryStats}>
                  <View style={styles.summaryStat}>
                    <ThemedText style={styles.summaryStatValue}>5</ThemedText>
                    <ThemedText style={styles.summaryStatLabel}>
                      {t.symptoms.entriesLogged}
                    </ThemedText>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryStat}>
                    <ThemedText
                      style={[styles.summaryStatValue, { color: COLORS.success }]}
                    >
                      3.2
                    </ThemedText>
                    <ThemedText style={styles.summaryStatLabel}>
                      {t.symptoms.avgPainLevel}
                    </ThemedText>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryStat}>
                    <TrendingDown size={24} color={COLORS.success} />
                    <ThemedText style={styles.summaryStatLabel}>
                      {t.symptoms.improving}
                    </ThemedText>
                  </View>
                </View>
              </Card>

              <View style={{ height: 100 }} />
            </ScrollView>
          )}

        </Animated.View>
      </SafeAreaView>

      {/* Chat Popup Modal */}
      <ChatPopupModal
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
        onCall={handleCall}
        doctorName={DOCTOR_INFO.name}
        doctorRole={DOCTOR_INFO.role}
      />

      {/* Urgent Contact Modal */}
      <UrgentContactModal
        visible={urgentModalVisible}
        onClose={() => setUrgentModalVisible(false)}
        onChat={handleChat}
        doctorName={DOCTOR_INFO.name}
        doctorPhone={DOCTOR_INFO.phone}
        severity={urgentSeverity}
      />

      {/* Schedule Modal */}
      <ScheduleModal
        visible={scheduleModalVisible}
        onClose={() => setScheduleModalVisible(false)}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        t={t}
      />

      {/* Calendar Modal */}
      <CalendarModal
        visible={calendarModalVisible}
        onClose={() => setCalendarModalVisible(false)}
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
    lineHeight: 36,
  },
  headerSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  historyBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
      },
      android: { elevation: 3 },
    }),
  },

  // Tab Switcher
  tabSwitcher: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  tabButtonWrapper: {
    flex: 1,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10 },
      android: { elevation: 2 },
    }),
  },
  tabButtonActive: {
    backgroundColor: 'rgba(3, 208, 197, 0.15)',
    borderWidth: 1.5,
    borderColor: COLORS.teal,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabButtonTextActive: {
    color: COLORS.teal,
  },

  // Tab Content
  tabContent: {
    flex: 1,
  },
  tabContentPadding: {
    paddingHorizontal: 20,
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
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 24,
      },
      android: { elevation: 4 },
    }),
  },
  cardTealHighlight: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.teal,
    backgroundColor: 'rgba(3, 208, 197, 0.08)',
  },
  cardAmberHighlight: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.amber,
    backgroundColor: 'rgba(255, 110, 30, 0.06)',
  },

  // Doctor Card
  doctorCard: {
    marginBottom: 16,
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.teal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  doctorAvatarText: {
    fontSize: 26,
    fontWeight: '600',
    color: COLORS.cardWhite,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  doctorRole: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  doctorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  doctorRatingText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  doctorDetails: {
    gap: 8,
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  doctorDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  doctorDetailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  doctorActions: {
    flexDirection: 'row',
    gap: 8,
  },
  doctorActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.teal,
    borderRadius: 14,
    paddingVertical: 14,
    gap: 8,
  },
  doctorActionBtnSecondary: {
    backgroundColor: COLORS.tealLight,
    borderWidth: 1,
    borderColor: COLORS.teal,
  },
  doctorActionText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.cardWhite,
  },
  doctorActionTextSecondary: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.teal,
  },
  doctorActionBtnSmall: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.teal,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 4,
    minHeight: 44,
  },
  doctorActionTextSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.cardWhite,
  },
  doctorActionTextSecondarySmall: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.teal,
  },
  doctorActionBtnSchedule: {
    backgroundColor: COLORS.successLight,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  doctorActionTextSchedule: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.success,
  },

  // Info Card
  infoCard: {
    marginBottom: 12,
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  infoCardText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 21,
  },
  infoCardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 14,
  },
  infoCardActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.teal,
  },

  // Check-in Card
  checkinCard: {
    marginBottom: 12,
  },
  checkinHeader: {
    marginBottom: 20,
  },
  checkinBadge: {
    backgroundColor: COLORS.tealLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  checkinBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.teal,
    letterSpacing: 0.5,
  },

  // Input Group
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    color: COLORS.textPrimary,
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  textInputSmall: {
    minHeight: 60,
  },

  // Pain Scale
  painScale: {
    alignItems: 'center',
  },
  painLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  painLabelText: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  painTrack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  painDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  painDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.cardWhite,
  },
  painValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  painValue: {
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
  },
  painValueLabel: {
    fontSize: 18,
    color: COLORS.textTertiary,
    marginLeft: 4,
  },
  painWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.warningLight,
    borderRadius: 10,
  },
  painWarningText: {
    fontSize: 13,
    flex: 1,
  },

  // Submit Button
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.teal,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 10,
    marginTop: 8,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.cardWhite,
  },

  // Disclaimer
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  disclaimerText: {
    fontSize: 13,
    color: COLORS.textTertiary,
    flex: 1,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.teal,
  },

  // History List
  historyList: {
    gap: 12,
    marginBottom: 24,
  },
  historyItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
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
  historyDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  historyPainBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  historyPainText: {
    fontSize: 13,
    fontWeight: '600',
  },
  historySymptoms: {
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  historyNotes: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  historyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  historyTime: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },

  // Summary Card
  summaryCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.teal,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  summaryStatLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalOverlayTouch: {
    flex: 1,
  },
  scheduleModal: {
    backgroundColor: COLORS.cardWhite,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  scheduleSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  scheduleCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotsContainer: {
    marginBottom: 20,
  },
  daySection: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  slotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  slotBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.tealLight,
    borderWidth: 1,
    borderColor: COLORS.teal,
  },
  slotBtnUnavailable: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
  },
  slotBtnSelected: {
    backgroundColor: COLORS.teal,
    borderColor: COLORS.teal,
  },
  slotTime: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.teal,
  },
  slotTimeUnavailable: {
    color: COLORS.textTertiary,
  },
  slotTimeSelected: {
    color: COLORS.cardWhite,
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.teal,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 10,
  },
  confirmBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.cardWhite,
  },

  // Calendar Modal styles
  calendarModal: {
    backgroundColor: COLORS.cardWhite,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  calendarDayNames: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  calendarDayName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  calendarDay: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDayToday: {
    backgroundColor: COLORS.teal,
  },
  calendarDayText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  calendarDayTextToday: {
    color: COLORS.cardWhite,
    fontWeight: '700',
  },
});
