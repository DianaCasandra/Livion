/**
 * SymptomsTab - Family Physician & Symptom Log Page
 * Two tabs: Family Physician contact and Symptoms Log
 * Features: Doctor profile, symptom log, chat popup, call option, urgent symptom modal
 */

import { Ionicons } from '@expo/vector-icons';
import {
  FileText,
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
} from 'lucide-react-native';
import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Linking,
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

// Doctor data
const DOCTOR_INFO = {
  name: 'Dr. Sarah Harper',
  role: 'Family Physician',
  specialty: 'Internal Medicine',
  phone: '+1 (555) 123-4567',
  location: 'Livion Health Center',
  rating: 4.9,
  experience: '15 years',
  nextAppointment: 'Dec 12, 2025 at 10:00 AM',
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
}: {
  value: number;
  onChange: (v: number) => void;
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
        <ThemedText style={styles.painLabelText}>No pain</ThemedText>
        <ThemedText style={styles.painLabelText}>Severe</ThemedText>
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
function HistoryItem({ date, symptoms, painLevel, notes, index }: any) {
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
          <ThemedText style={styles.historyTime}>Logged at 9:30 AM</ThemedText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// Quick action button component
function QuickActionButton({
  icon: Icon,
  label,
  color,
  bgColor,
  onPress,
}: any) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
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

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.quickActionBtn,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={[styles.quickActionIcon, { backgroundColor: bgColor }]}>
          <Icon size={22} color={color} />
        </View>
        <ThemedText style={styles.quickActionLabel}>{label}</ThemedText>
      </Animated.View>
    </Pressable>
  );
}

export default function SymptomsTab() {
  const [activeTab, setActiveTab] = useState<'physician' | 'symptoms'>('physician');
  const [painLevel, setPainLevel] = useState(3);
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');
  const [chatVisible, setChatVisible] = useState(false);
  const [urgentModalVisible, setUrgentModalVisible] = useState(false);
  const [urgentSeverity, setUrgentSeverity] = useState<'high' | 'critical'>('high');

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

  // Mock history data
  const historyData = [
    {
      date: 'Today',
      symptoms: 'Mild fatigue, slight headache',
      painLevel: 3,
      notes: 'Better after rest',
    },
    {
      date: 'Yesterday',
      symptoms: 'Muscle tension in shoulders',
      painLevel: 4,
      notes: '',
    },
    {
      date: 'Oct 5',
      symptoms: 'General tiredness',
      painLevel: 2,
      notes: 'Good day overall',
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
              <ThemedText style={styles.headerTitle}>My Care</ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                Connect with your physician
              </ThemedText>
            </View>
            <Pressable style={styles.historyBtn}>
              <FileText size={22} color={COLORS.textPrimary} />
            </Pressable>
          </View>

          {/* Tab Switcher */}
          <View style={styles.tabSwitcher}>
            <TabButton
              active={activeTab === 'physician'}
              label="Family Physician"
              icon={Stethoscope}
              onPress={() => setActiveTab('physician')}
            />
            <TabButton
              active={activeTab === 'symptoms'}
              label="Symptoms Log"
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
                      {DOCTOR_INFO.role}
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
                  <Pressable style={styles.doctorActionBtn} onPress={handleCall}>
                    <Phone size={18} color={COLORS.cardWhite} />
                    <ThemedText style={styles.doctorActionText}>Call</ThemedText>
                  </Pressable>
                  <Pressable
                    style={[styles.doctorActionBtn, styles.doctorActionBtnSecondary]}
                    onPress={() => setChatVisible(true)}
                  >
                    <MessageCircle size={18} color={COLORS.teal} />
                    <ThemedText style={styles.doctorActionTextSecondary}>
                      Message
                    </ThemedText>
                  </Pressable>
                </View>
              </Card>

              {/* Quick Action Buttons */}
              <View style={styles.quickActions}>
                <QuickActionButton
                  icon={Phone}
                  label="Call"
                  color={COLORS.teal}
                  bgColor={COLORS.tealLight}
                  onPress={handleCall}
                />
                <QuickActionButton
                  icon={MessageCircle}
                  label="Chat"
                  color={COLORS.amber}
                  bgColor={COLORS.amberLight}
                  onPress={() => setChatVisible(true)}
                />
                <QuickActionButton
                  icon={Calendar}
                  label="Schedule"
                  color={COLORS.success}
                  bgColor={COLORS.successLight}
                  onPress={() => {}}
                />
              </View>

              {/* Info Cards */}
              <Card style={styles.infoCard}>
                <View style={styles.infoCardHeader}>
                  <Ionicons name="time-outline" size={20} color={COLORS.teal} />
                  <ThemedText style={styles.infoCardTitle}>Office Hours</ThemedText>
                </View>
                <ThemedText style={styles.infoCardText}>
                  Monday - Friday: 8:00 AM - 5:00 PM{'\n'}
                  Saturday: 9:00 AM - 1:00 PM{'\n'}
                  Sunday: Closed
                </ThemedText>
              </Card>

              <Card style={styles.infoCard}>
                <View style={styles.infoCardHeader}>
                  <Ionicons name="alert-circle-outline" size={20} color={COLORS.amber} />
                  <ThemedText style={styles.infoCardTitle}>Emergency Contact</ThemedText>
                </View>
                <ThemedText style={styles.infoCardText}>
                  For after-hours emergencies, please call the main office number.
                  For life-threatening emergencies, call 911.
                </ThemedText>
              </Card>

              <Card style={styles.infoCard} highlight="amber">
                <View style={styles.infoCardHeader}>
                  <Ionicons name="document-text-outline" size={20} color={COLORS.amber} />
                  <ThemedText style={styles.infoCardTitle}>Quick Tip</ThemedText>
                </View>
                <ThemedText style={styles.infoCardText}>
                  Log your symptoms regularly to help {DOCTOR_INFO.name.split(' ')[0]} track your health progress
                  and provide better care during your appointments.
                </ThemedText>
                <Pressable
                  style={styles.infoCardAction}
                  onPress={() => setActiveTab('symptoms')}
                >
                  <ThemedText style={styles.infoCardActionText}>Log symptoms now</ThemedText>
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
                      LOG SYMPTOMS FOR DOCTOR
                    </ThemedText>
                  </View>
                </View>

                {/* Symptoms Input */}
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.inputLabel}>
                    Describe your symptoms
                  </ThemedText>
                  <TextInput
                    style={styles.textInput}
                    placeholder="What symptoms are you experiencing?"
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
                    Pain or discomfort level
                  </ThemedText>
                  <PainScale value={painLevel} onChange={setPainLevel} />
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
                          ? 'Critical level - Consider seeking immediate care'
                          : 'Elevated level - Your doctor will be notified'}
                      </ThemedText>
                    </View>
                  )}
                </View>

                {/* Notes Input */}
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.inputLabel}>
                    Additional notes for {DOCTOR_INFO.name.split(' ')[0]}
                  </ThemedText>
                  <TextInput
                    style={[styles.textInput, styles.textInputSmall]}
                    placeholder="Any other details your doctor should know?"
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
                    Send to Doctor
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
                  Your symptoms will be shared securely with {DOCTOR_INFO.name}.
                  For emergencies, call 911.
                </ThemedText>
              </View>

              {/* History Section */}
              <View style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>Recent Entries</ThemedText>
                <Pressable>
                  <ThemedText style={styles.seeAllText}>See all</ThemedText>
                </Pressable>
              </View>

              <View style={styles.historyList}>
                {historyData.map((item, index) => (
                  <HistoryItem key={index} {...item} index={index} />
                ))}
              </View>

              {/* Weekly Summary */}
              <Card style={styles.summaryCard}>
                <ThemedText style={styles.summaryTitle}>This Week</ThemedText>
                <View style={styles.summaryStats}>
                  <View style={styles.summaryStat}>
                    <ThemedText style={styles.summaryStatValue}>5</ThemedText>
                    <ThemedText style={styles.summaryStatLabel}>
                      Entries logged
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
                      Avg. pain level
                    </ThemedText>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryStat}>
                    <TrendingDown size={24} color={COLORS.success} />
                    <ThemedText style={styles.summaryStatLabel}>
                      Improving
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
    gap: 12,
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

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingHorizontal: 10,
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
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  quickActionLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
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
});
