/**
 * LabResultDetailScreen - Individual Lab Result Details
 * Shows detailed results with threshold visualization bars
 * Modern 2025 design with intuitive range indicators
 */

import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Calendar,
  Building2,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle2,
  Info,
  ChevronDown,
  ChevronUp,
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
import { OnboardingHeader } from '../../../components/molecules/OnboardingHeader';
import { AnimatedBlobBackground } from '../../../components/atoms/AnimatedBlobBackground';
import { COLORS, Spacing, BorderRadius } from '@/src/constants/Colors';
import { useLanguage } from '../../../components/providers/LanguageProvider';
import { LAB_RESULT_SETS } from './LabResultsScreen';

// Mock detailed results data for each result set
const LAB_RESULTS_DATA: Record<string, LabResult[]> = {
  '1': [ // Complete Blood Count
    { id: '1', name: 'White Blood Cells', shortName: 'WBC', value: 7.2, unit: 'K/uL', min: 4.5, max: 11.0, status: 'normal' },
    { id: '2', name: 'Red Blood Cells', shortName: 'RBC', value: 4.8, unit: 'M/uL', min: 4.5, max: 5.5, status: 'normal' },
    { id: '3', name: 'Hemoglobin', shortName: 'HGB', value: 14.2, unit: 'g/dL', min: 13.5, max: 17.5, status: 'normal' },
    { id: '4', name: 'Hematocrit', shortName: 'HCT', value: 42, unit: '%', min: 38.8, max: 50.0, status: 'normal' },
    { id: '5', name: 'Platelets', shortName: 'PLT', value: 245, unit: 'K/uL', min: 150, max: 400, status: 'normal' },
    { id: '6', name: 'MCV', shortName: 'MCV', value: 88, unit: 'fL', min: 80, max: 100, status: 'normal' },
    { id: '7', name: 'MCH', shortName: 'MCH', value: 29.5, unit: 'pg', min: 27, max: 33, status: 'normal' },
    { id: '8', name: 'MCHC', shortName: 'MCHC', value: 33.8, unit: 'g/dL', min: 32, max: 36, status: 'normal' },
  ],
  '2': [ // Metabolic Panel
    { id: '1', name: 'Glucose', shortName: 'GLU', value: 95, unit: 'mg/dL', min: 70, max: 100, status: 'normal' },
    { id: '2', name: 'BUN', shortName: 'BUN', value: 18, unit: 'mg/dL', min: 7, max: 20, status: 'normal' },
    { id: '3', name: 'Creatinine', shortName: 'CREAT', value: 1.1, unit: 'mg/dL', min: 0.7, max: 1.3, status: 'normal' },
    { id: '4', name: 'Sodium', shortName: 'Na', value: 141, unit: 'mEq/L', min: 136, max: 145, status: 'normal' },
    { id: '5', name: 'Potassium', shortName: 'K', value: 4.2, unit: 'mEq/L', min: 3.5, max: 5.0, status: 'normal' },
    { id: '6', name: 'Chloride', shortName: 'Cl', value: 102, unit: 'mEq/L', min: 98, max: 106, status: 'normal' },
    { id: '7', name: 'CO2', shortName: 'CO2', value: 24, unit: 'mEq/L', min: 23, max: 29, status: 'normal' },
    { id: '8', name: 'Calcium', shortName: 'Ca', value: 9.5, unit: 'mg/dL', min: 8.5, max: 10.5, status: 'normal' },
    { id: '9', name: 'Total Protein', shortName: 'TP', value: 7.2, unit: 'g/dL', min: 6.0, max: 8.3, status: 'normal' },
    { id: '10', name: 'Albumin', shortName: 'ALB', value: 4.2, unit: 'g/dL', min: 3.5, max: 5.0, status: 'normal' },
    { id: '11', name: 'Bilirubin', shortName: 'BILI', value: 0.8, unit: 'mg/dL', min: 0.1, max: 1.2, status: 'normal' },
    { id: '12', name: 'ALT', shortName: 'ALT', value: 52, unit: 'U/L', min: 7, max: 40, status: 'high', description: 'Slightly elevated - may indicate liver stress' },
    { id: '13', name: 'AST', shortName: 'AST', value: 48, unit: 'U/L', min: 8, max: 40, status: 'high', description: 'Slightly elevated - monitor with follow-up' },
    { id: '14', name: 'Alkaline Phosphatase', shortName: 'ALP', value: 72, unit: 'U/L', min: 44, max: 147, status: 'normal' },
  ],
  '3': [ // Lipid Panel
    { id: '1', name: 'Total Cholesterol', shortName: 'CHOL', value: 215, unit: 'mg/dL', min: 0, max: 200, status: 'high', description: 'Consider dietary changes' },
    { id: '2', name: 'HDL Cholesterol', shortName: 'HDL', value: 52, unit: 'mg/dL', min: 40, max: 999, status: 'normal', description: 'Good cholesterol - higher is better' },
    { id: '3', name: 'LDL Cholesterol', shortName: 'LDL', value: 128, unit: 'mg/dL', min: 0, max: 100, status: 'normal', description: 'Optimal: under 100' },
    { id: '4', name: 'Triglycerides', shortName: 'TRIG', value: 145, unit: 'mg/dL', min: 0, max: 150, status: 'normal' },
    { id: '5', name: 'VLDL', shortName: 'VLDL', value: 29, unit: 'mg/dL', min: 5, max: 40, status: 'normal' },
  ],
  '4': [ // Thyroid Panel
    { id: '1', name: 'TSH', shortName: 'TSH', value: 2.1, unit: 'mIU/L', min: 0.4, max: 4.0, status: 'normal' },
    { id: '2', name: 'Free T4', shortName: 'FT4', value: 1.2, unit: 'ng/dL', min: 0.8, max: 1.8, status: 'normal' },
    { id: '3', name: 'Free T3', shortName: 'FT3', value: 3.1, unit: 'pg/mL', min: 2.3, max: 4.2, status: 'normal' },
    { id: '4', name: 'T4 Total', shortName: 'T4', value: 8.2, unit: 'ug/dL', min: 4.5, max: 12.0, status: 'normal' },
  ],
  '5': [ // Vitamin & Mineral Panel
    { id: '1', name: 'Vitamin D, 25-OH', shortName: 'VIT D', value: 22, unit: 'ng/mL', min: 30, max: 100, status: 'low', description: 'Consider supplementation' },
    { id: '2', name: 'Vitamin B12', shortName: 'B12', value: 180, unit: 'pg/mL', min: 200, max: 900, status: 'low', description: 'Below optimal range' },
    { id: '3', name: 'Folate', shortName: 'FOL', value: 12, unit: 'ng/mL', min: 3, max: 20, status: 'normal' },
    { id: '4', name: 'Iron', shortName: 'FE', value: 55, unit: 'ug/dL', min: 60, max: 170, status: 'low', description: 'Slightly below normal' },
    { id: '5', name: 'Ferritin', shortName: 'FERR', value: 85, unit: 'ng/mL', min: 20, max: 200, status: 'normal' },
    { id: '6', name: 'TIBC', shortName: 'TIBC', value: 320, unit: 'ug/dL', min: 250, max: 370, status: 'normal' },
  ],
};

interface LabResult {
  id: string;
  name: string;
  shortName: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: 'normal' | 'low' | 'high';
  description?: string;
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'normal':
      return COLORS.success;
    case 'low':
      return COLORS.warning;
    case 'high':
      return COLORS.error;
    default:
      return COLORS.textSecondary;
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'normal':
      return CheckCircle2;
    case 'low':
      return TrendingDown;
    case 'high':
      return TrendingUp;
    default:
      return Minus;
  }
}

// Threshold bar component
function ThresholdBar({ value, min, max, status, normalRangeLabel }: { value: number; min: number; max: number; status: string; normalRangeLabel: string }) {
  const range = max - min;
  const extendedMin = min - range * 0.2;
  const extendedMax = max + range * 0.2;
  const extendedRange = extendedMax - extendedMin;

  // Calculate position percentage (0-100)
  let position = ((value - extendedMin) / extendedRange) * 100;
  position = Math.max(5, Math.min(95, position)); // Clamp between 5-95%

  // Calculate normal range position
  const normalStart = ((min - extendedMin) / extendedRange) * 100;
  const normalWidth = (range / extendedRange) * 100;

  const statusColor = getStatusColor(status);
  const animatedPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedPosition, {
      toValue: position,
      tension: 50,
      friction: 8,
      useNativeDriver: false,
    }).start();
  }, [position]);

  return (
    <View style={styles.thresholdContainer}>
      {/* Background track */}
      <View style={styles.thresholdTrack}>
        {/* Low zone */}
        <View style={[styles.thresholdZone, styles.thresholdZoneLow, { width: `${normalStart}%` }]} />
        {/* Normal zone */}
        <View style={[styles.thresholdZone, styles.thresholdZoneNormal, { left: `${normalStart}%`, width: `${normalWidth}%` }]} />
        {/* High zone */}
        <View style={[styles.thresholdZone, styles.thresholdZoneHigh, { left: `${normalStart + normalWidth}%`, right: 0 }]} />
      </View>

      {/* Value indicator */}
      <Animated.View
        style={[
          styles.valueIndicator,
          {
            left: animatedPosition.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            backgroundColor: statusColor,
          },
        ]}
      >
        <View style={[styles.indicatorDot, { backgroundColor: statusColor }]} />
      </Animated.View>

      {/* Min/Max labels */}
      <View style={styles.thresholdLabels}>
        <ThemedText style={styles.thresholdLabel}>{min}</ThemedText>
        <ThemedText style={styles.thresholdLabelNormal}>{normalRangeLabel}</ThemedText>
        <ThemedText style={styles.thresholdLabel}>{max}</ThemedText>
      </View>
    </View>
  );
}

function LabResultItem({ item, index, t }: { item: LabResult; index: number; t: any }) {
  const [expanded, setExpanded] = useState(item.status !== 'normal');
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const statusColor = getStatusColor(item.status);
  const StatusIcon = getStatusIcon(item.status);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <Pressable
        onPress={() => setExpanded(!expanded)}
        style={[
          styles.resultItem,
          item.status !== 'normal' && styles.resultItemFlagged,
        ]}
      >
        {/* Main row */}
        <View style={styles.resultMainRow}>
          <View style={styles.resultLeft}>
            <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
            <View style={styles.resultNameWrap}>
              <ThemedText style={styles.resultName}>{item.name}</ThemedText>
              <ThemedText style={styles.resultShortName}>{item.shortName}</ThemedText>
            </View>
          </View>

          <View style={styles.resultRight}>
            <View style={styles.valueWrap}>
              <ThemedText style={[styles.resultValue, { color: statusColor }]}>
                {item.value}
              </ThemedText>
              <ThemedText style={styles.resultUnit}>{item.unit}</ThemedText>
            </View>
            <StatusIcon size={18} color={statusColor} />
            {expanded ? (
              <ChevronUp size={18} color={COLORS.textTertiary} />
            ) : (
              <ChevronDown size={18} color={COLORS.textTertiary} />
            )}
          </View>
        </View>

        {/* Expanded content */}
        {expanded && (
          <View style={styles.expandedContent}>
            <ThresholdBar
              value={item.value}
              min={item.min}
              max={item.max}
              status={item.status}
              normalRangeLabel={t.labs.normalRange}
            />

            {item.description && (
              <View style={styles.descriptionBox}>
                <Info size={14} color={statusColor} />
                <ThemedText style={styles.descriptionText}>{item.description}</ThemedText>
              </View>
            )}

            <View style={styles.referenceRow}>
              <ThemedText style={styles.referenceLabel}>{t.labs.referenceRange}:</ThemedText>
              <ThemedText style={styles.referenceValue}>
                {item.min} - {item.max} {item.unit}
              </ThemedText>
            </View>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

export default function LabResultDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { t, language } = useLanguage();
  const locale = language === 'ro' ? 'ro-RO' : 'en-US';
  const { resultSetId } = (route.params as { resultSetId: string }) || { resultSetId: '1' };

  const resultSet = LAB_RESULT_SETS.find(r => r.id === resultSetId);
  const results = LAB_RESULTS_DATA[resultSetId] || [];

  const normalCount = results.filter(r => r.status === 'normal').length;
  const flaggedCount = results.filter(r => r.status !== 'normal').length;

  if (!resultSet) {
    return null;
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <AnimatedBlobBackground />

      <SafeAreaView style={styles.safeArea}>
        <OnboardingHeader />

        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Card */}
          <View style={styles.headerCard}>
            <ThemedText style={styles.headerTitle}>{resultSet.title}</ThemedText>
            <ThemedText style={styles.headerSubtitle}>{resultSet.subtitle}</ThemedText>

            <View style={styles.headerMeta}>
              <View style={styles.metaItem}>
                <Calendar size={16} color={COLORS.textSecondary} />
                <ThemedText style={styles.metaText}>
                  {new Date(resultSet.date).toLocaleDateString(locale, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </ThemedText>
              </View>
              <View style={styles.metaItem}>
                <Building2 size={16} color={COLORS.textSecondary} />
                <ThemedText style={styles.metaText}>{resultSet.provider}</ThemedText>
              </View>
            </View>

            {/* Quick Stats */}
            <View style={styles.quickStats}>
              <View style={[styles.quickStatItem, { backgroundColor: COLORS.success + '15' }]}>
                <CheckCircle2 size={18} color={COLORS.success} />
                <ThemedText style={[styles.quickStatValue, { color: COLORS.success }]}>
                  {normalCount}
                </ThemedText>
                <ThemedText style={styles.quickStatLabel}>{t.labs.normal}</ThemedText>
              </View>
              {flaggedCount > 0 && (
                <View style={[styles.quickStatItem, { backgroundColor: COLORS.warning + '15' }]}>
                  <AlertCircle size={18} color={COLORS.warning} />
                  <ThemedText style={[styles.quickStatValue, { color: COLORS.warning }]}>
                    {flaggedCount}
                  </ThemedText>
                  <ThemedText style={styles.quickStatLabel}>{t.labs.flagged}</ThemedText>
                </View>
              )}
            </View>
          </View>

          {/* Results List */}
          <View style={styles.resultsSection}>
            <ThemedText style={styles.sectionTitle}>{t.labs.testResults}</ThemedText>
            <ThemedText style={styles.sectionHint}>{t.labs.tapToSeeDetails}</ThemedText>

            {results.map((item, index) => (
              <LabResultItem key={item.id} item={item} index={index} t={t} />
            ))}
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimer}>
            <Info size={14} color={COLORS.textTertiary} />
            <ThemedText style={styles.disclaimerText}>
              {t.labs.disclaimer}
            </ThemedText>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  // Header Card
  headerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 16,
      },
      android: { elevation: 4 },
    }),
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  headerMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  quickStats: {
    flexDirection: 'row',
    gap: 12,
  },
  quickStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  quickStatLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  // Results Section
  resultsSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginBottom: 16,
  },

  // Result Item
  resultItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  resultItemFlagged: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.warning,
  },
  resultMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  resultNameWrap: {
    flex: 1,
  },
  resultName: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  resultShortName: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  resultRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  valueWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  resultUnit: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },

  // Expanded Content
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  // Threshold Bar
  thresholdContainer: {
    marginBottom: 16,
  },
  thresholdTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    position: 'relative',
    overflow: 'hidden',
  },
  thresholdZone: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  thresholdZoneLow: {
    backgroundColor: COLORS.warning + '30',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  thresholdZoneNormal: {
    backgroundColor: COLORS.success + '40',
  },
  thresholdZoneHigh: {
    backgroundColor: COLORS.error + '30',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  valueIndicator: {
    position: 'absolute',
    top: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: -8,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.cardWhite,
  },
  thresholdLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  thresholdLabel: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },
  thresholdLabelNormal: {
    fontSize: 11,
    color: COLORS.success,
    fontWeight: '500',
  },

  // Description Box
  descriptionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.amberLight,
    padding: 12,
    borderRadius: 10,
    gap: 10,
    marginBottom: 12,
  },
  descriptionText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.amberDark,
    lineHeight: 18,
  },

  // Reference Row
  referenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  referenceLabel: {
    fontSize: 13,
    color: COLORS.textTertiary,
  },
  referenceValue: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },

  // Disclaimer
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 14,
    borderRadius: BorderRadius.md,
    gap: 10,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textTertiary,
    lineHeight: 18,
  },
});
