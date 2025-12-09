/**
 * LabResultsScreen - Lab Results List
 * Shows a list of lab result sets with dates and status indicators
 * Modern 2025 design with glassmorphism
 */

import { useNavigation } from '@react-navigation/native';
import {
  Calendar,
  ChevronRight,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react-native';
import React, { useRef, useEffect } from 'react';
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

// Mock lab result sets data
export const LAB_RESULT_SETS = [
  {
    id: '1',
    date: '2025-01-15',
    title: 'Complete Blood Count',
    subtitle: 'CBC with Differential',
    provider: 'City Medical Lab',
    status: 'normal',
    flaggedCount: 0,
    totalTests: 8,
  },
  {
    id: '2',
    date: '2025-01-10',
    title: 'Metabolic Panel',
    subtitle: 'Comprehensive Metabolic Panel',
    provider: 'City Medical Lab',
    status: 'attention',
    flaggedCount: 2,
    totalTests: 14,
  },
  {
    id: '3',
    date: '2024-12-20',
    title: 'Lipid Panel',
    subtitle: 'Cholesterol & Triglycerides',
    provider: 'HealthFirst Labs',
    status: 'attention',
    flaggedCount: 1,
    totalTests: 5,
  },
  {
    id: '4',
    date: '2024-12-05',
    title: 'Thyroid Panel',
    subtitle: 'TSH, T3, T4',
    provider: 'City Medical Lab',
    status: 'normal',
    flaggedCount: 0,
    totalTests: 4,
  },
  {
    id: '5',
    date: '2024-11-18',
    title: 'Vitamin & Mineral Panel',
    subtitle: 'Vitamin D, B12, Iron',
    provider: 'HealthFirst Labs',
    status: 'flagged',
    flaggedCount: 3,
    totalTests: 6,
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'normal':
      return COLORS.success;
    case 'attention':
      return COLORS.warning;
    case 'flagged':
      return COLORS.error;
    default:
      return COLORS.textSecondary;
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'normal':
      return CheckCircle2;
    case 'attention':
      return AlertCircle;
    case 'flagged':
      return AlertCircle;
    default:
      return Minus;
  }
}

function LabResultCard({ item, index, onPress }: { item: typeof LAB_RESULT_SETS[0]; index: number; onPress: () => void }) {
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
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

  const statusColor = getStatusColor(item.status);
  const StatusIcon = getStatusIcon(item.status);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.resultCard}
      >
        {/* Left accent bar */}
        <View style={[styles.accentBar, { backgroundColor: statusColor }]} />

        <View style={styles.cardContent}>
          {/* Header row */}
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: statusColor + '15' }]}>
              <FileText size={20} color={statusColor} />
            </View>
            <View style={styles.cardTitleWrap}>
              <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.cardSubtitle}>{item.subtitle}</ThemedText>
            </View>
            <ChevronRight size={22} color={COLORS.textTertiary} />
          </View>

          {/* Info row */}
          <View style={styles.cardInfo}>
            <View style={styles.infoItem}>
              <Calendar size={14} color={COLORS.textTertiary} />
              <ThemedText style={styles.infoText}>{formatDate(item.date)}</ThemedText>
            </View>
            <View style={styles.infoDivider} />
            <ThemedText style={styles.providerText}>{item.provider}</ThemedText>
          </View>

          {/* Status row */}
          <View style={styles.statusRow}>
            <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
              <StatusIcon size={14} color={statusColor} />
              <ThemedText style={[styles.statusText, { color: statusColor }]}>
                {item.status === 'normal' ? 'All Normal' : `${item.flaggedCount} Flagged`}
              </ThemedText>
            </View>
            <ThemedText style={styles.testCount}>
              {item.totalTests} tests
            </ThemedText>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function LabResultsScreen() {
  const navigation = useNavigation();

  const handleResultPress = (resultSet: typeof LAB_RESULT_SETS[0]) => {
    navigation.navigate('LabResultDetail' as never, { resultSetId: resultSet.id } as never);
  };

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
          {/* Page Title */}
          <View style={styles.titleSection}>
            <ThemedText style={styles.pageTitle}>Lab Results</ThemedText>
            <ThemedText style={styles.pageSubtitle}>
              View your recent blood work and test results
            </ThemedText>
          </View>

          {/* Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <ThemedText style={styles.summaryValue}>{LAB_RESULT_SETS.length}</ThemedText>
              <ThemedText style={styles.summaryLabel}>Total Reports</ThemedText>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <ThemedText style={[styles.summaryValue, { color: COLORS.success }]}>
                {LAB_RESULT_SETS.filter(r => r.status === 'normal').length}
              </ThemedText>
              <ThemedText style={styles.summaryLabel}>All Normal</ThemedText>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <ThemedText style={[styles.summaryValue, { color: COLORS.warning }]}>
                {LAB_RESULT_SETS.filter(r => r.status !== 'normal').length}
              </ThemedText>
              <ThemedText style={styles.summaryLabel}>Need Review</ThemedText>
            </View>
          </View>

          {/* Results List */}
          <View style={styles.resultsSection}>
            <ThemedText style={styles.sectionTitle}>Recent Results</ThemedText>
            {LAB_RESULT_SETS.map((item, index) => (
              <LabResultCard
                key={item.id}
                item={item}
                index={index}
                onPress={() => handleResultPress(item)}
              />
            ))}
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

  // Title Section
  titleSection: {
    marginBottom: Spacing.lg,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
    lineHeight: 40,
  },
  pageSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  // Summary Card
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
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
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 36,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },

  // Results Section
  resultsSection: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: Spacing.sm,
  },

  // Result Card
  resultCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
      },
      android: { elevation: 3 },
    }),
  },
  accentBar: {
    width: 4,
  },
  cardContent: {
    flex: 1,
    padding: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitleWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  cardSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textTertiary,
  },
  infoDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    marginHorizontal: 10,
  },
  providerText: {
    fontSize: 13,
    color: COLORS.textTertiary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  testCount: {
    fontSize: 13,
    color: COLORS.textTertiary,
  },
});
