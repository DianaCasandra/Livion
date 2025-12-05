/**
 * SymptomsTab - 2025 UX Redesign
 * Clean symptom logging with visual pain scale and history
 */

import { Ionicons } from '@expo/vector-icons';
import { FileText, Clock, TrendingDown, TrendingUp, Minus, Send } from 'lucide-react-native';
import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
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
import { COLORS } from '@/src/constants/Colors';

// Pain level colors
const getPainColor = (level: number) => {
  if (level <= 3) return COLORS.success;
  if (level <= 6) return COLORS.warning;
  return COLORS.error;
};

// Card component
function Card({ children, style }: any) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

// Pain scale slider component
function PainScale({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const animatedScale = useRef(new Animated.Value(1)).current;

  const handleSelect = (level: number) => {
    Animated.sequence([
      Animated.timing(animatedScale, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(animatedScale, { toValue: 1, duration: 100, useNativeDriver: true }),
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
                backgroundColor: level <= value ? getPainColor(value) : COLORS.border,
                transform: [{ scale: level === value ? 1.3 : 1 }],
              },
            ]}
          >
            {level === value && (
              <View style={styles.painDotInner} />
            )}
          </Pressable>
        ))}
      </View>
      <View style={styles.painValueContainer}>
        <ThemedText style={[styles.painValue, { color: getPainColor(value) }]}>{value}</ThemedText>
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
      Animated.timing(slideAnim, { toValue: 0, duration: 300, delay: index * 80, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, delay: index * 80, useNativeDriver: true }),
    ]).start();
  }, []);

  const getTrendIcon = () => {
    if (painLevel <= 3) return <TrendingDown size={14} color={COLORS.success} />;
    if (painLevel <= 6) return <Minus size={14} color={COLORS.warning} />;
    return <TrendingUp size={14} color={COLORS.error} />;
  };

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <Pressable style={styles.historyItem}>
        <View style={styles.historyDate}>
          <ThemedText style={styles.historyDateText}>{date}</ThemedText>
          <View style={[styles.historyPainBadge, { backgroundColor: getPainColor(painLevel) + '20' }]}>
            {getTrendIcon()}
            <ThemedText style={[styles.historyPainText, { color: getPainColor(painLevel) }]}>
              {painLevel}/10
            </ThemedText>
          </View>
        </View>
        <ThemedText style={styles.historySymptoms}>{symptoms}</ThemedText>
        {notes && <ThemedText style={styles.historyNotes}>{notes}</ThemedText>}
        <View style={styles.historyMeta}>
          <Clock size={12} color={COLORS.textTertiary} />
          <ThemedText style={styles.historyTime}>Logged at 9:30 AM</ThemedText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function SymptomsTab() {
  const [painLevel, setPainLevel] = useState(3);
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  // Mock history data
  const historyData = [
    { date: 'Today', symptoms: 'Mild fatigue, slight headache', painLevel: 3, notes: 'Better after rest' },
    { date: 'Yesterday', symptoms: 'Muscle tension in shoulders', painLevel: 4, notes: '' },
    { date: 'Oct 5', symptoms: 'General tiredness', painLevel: 2, notes: 'Good day overall' },
  ];

  const handleSubmit = () => {
    // Submit logic here
    setSymptoms('');
    setNotes('');
    setPainLevel(3);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

            {/* Header */}
            <View style={styles.header}>
              <View>
                <ThemedText style={styles.headerTitle}>Symptom Log</ThemedText>
                <ThemedText style={styles.headerSubtitle}>Track how you're feeling</ThemedText>
              </View>
              <Pressable style={styles.historyBtn}>
                <FileText size={22} color={COLORS.textPrimary} />
              </Pressable>
            </View>

            {/* Quick Check-in Card */}
            <Card style={styles.checkinCard}>
              <View style={styles.checkinHeader}>
                <View style={styles.checkinBadge}>
                  <ThemedText style={styles.checkinBadgeText}>TODAY'S CHECK-IN</ThemedText>
                </View>
              </View>

              {/* Symptoms Input */}
              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>How are you feeling?</ThemedText>
                <TextInput
                  style={styles.textInput}
                  placeholder="Describe any symptoms..."
                  placeholderTextColor={COLORS.textTertiary}
                  value={symptoms}
                  onChangeText={setSymptoms}
                  multiline
                  numberOfLines={3}
                />
              </View>

              {/* Pain Scale */}
              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>Pain level</ThemedText>
                <PainScale value={painLevel} onChange={setPainLevel} />
              </View>

              {/* Notes Input */}
              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>Additional notes</ThemedText>
                <TextInput
                  style={[styles.textInput, styles.textInputSmall]}
                  placeholder="Anything else your care team should know?"
                  placeholderTextColor={COLORS.textTertiary}
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={2}
                />
              </View>

              {/* Submit Button */}
              <Pressable style={styles.submitBtn} onPress={handleSubmit}>
                <ThemedText style={styles.submitBtnText}>Submit Log</ThemedText>
                <Send size={18} color={COLORS.cardWhite} />
              </Pressable>
            </Card>

            {/* Disclaimer */}
            <View style={styles.disclaimer}>
              <Ionicons name="information-circle-outline" size={16} color={COLORS.textTertiary} />
              <ThemedText style={styles.disclaimerText}>
                This is for tracking purposes only, not a medical diagnosis.
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
                  <ThemedText style={styles.summaryStatLabel}>Entries logged</ThemedText>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryStat}>
                  <ThemedText style={[styles.summaryStatValue, { color: COLORS.success }]}>3.2</ThemedText>
                  <ThemedText style={styles.summaryStatLabel}>Avg. pain level</ThemedText>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryStat}>
                  <TrendingDown size={24} color={COLORS.success} />
                  <ThemedText style={styles.summaryStatLabel}>Improving</ThemedText>
                </View>
              </View>
            </Card>

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
  },
  painValueLabel: {
    fontSize: 18,
    color: COLORS.textTertiary,
    marginLeft: 4,
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
      ios: { shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12 },
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
