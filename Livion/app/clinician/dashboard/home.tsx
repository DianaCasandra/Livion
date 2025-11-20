import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../components/atoms/Button';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';
import { useMockData } from '../../../hooks/useMockData';

// ---------------------------------------------------------------------
// GlowyCard
// ---------------------------------------------------------------------
function GlowyCard({ children, compact = false, onPress, style, glowColor }: any) {
  const pressScale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    if (!onPress) return;
    Animated.spring(pressScale, {
      toValue: 0.985,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  const onPressOut = () => {
    if (!onPress) return;
    Animated.spring(pressScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      onPressIn={onPress ? onPressIn : undefined}
      onPressOut={onPress ? onPressOut : undefined}
      style={style}
    >
      <Animated.View
        style={[
          styles.cardBase,
          compact && styles.cardCompact,
          { transform: [{ scale: pressScale }] },
        ]}
      >
        {/* Glow */}
        <View
          style={[
            styles.cardGlow,
            glowColor && {
              backgroundColor: glowColor,
              opacity: 0.25,   // ajustează pentru intensitate
            },
          ]}
          pointerEvents="none"
        />
        <View style={styles.cardContent}>{children}</View>
      </Animated.View>
    </Pressable>
  );
}


// ---------------------------------------------------------------------
// Static snapshot
// ---------------------------------------------------------------------
const cohortSnapshot = {
  activePatients: 24,
  stableToday: 16,
  bpRecordedToday: 154,
  fullyAdherentToday: 68,
  missedGoalsYesterday: 12,
  highRiskAlertsOpen: 5,
};

// ---------------------------------------------------------------------

export default function ClinicianDashboard() {
  const { patientData } = useMockData();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={['#050816', '#031824', '#031b2e']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

          {/* Back */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>

          {/* HEADER */}
          <ThemedText
            variant="display"
            weight="bold"
            style={[styles.header, { fontSize: 30, lineHeight: 36 }]}
          >
            Clinician dashboard
          </ThemedText>
          <ThemedText
            variant="body"
            color="secondary"
            style={[styles.subtitle, { fontSize: 13, lineHeight: 18 }]}
          >
            Today’s panel overview across your connected patients
          </ThemedText>

          {/* STATS ROW */}
          <View style={styles.statRow}>
            {/* Active monitored */}
            <GlowyCard compact style={styles.statCard}>
              <ThemedText variant="caption" color="secondary" style={{ fontSize: 14, fontWeight: 'bold', marginVertical: 4, marginHorizontal: 2 }}>
                Active monitored
              </ThemedText>
              <ThemedText
                variant="heading"
                weight="bold"
                style={[styles.statValue, { fontSize: 20, marginHorizontal: 2 }]}
              >
                {cohortSnapshot.activePatients}
              </ThemedText>
              <ThemedText variant="caption" color="secondary" style={{ fontSize: 11, marginHorizontal: 2}}>
                patients on remote monitoring
              </ThemedText>

              <Button
                variant="secondary"
                size="sm"
                style={styles.smallButton}
                textStyle={{ fontSize: 11 }}
              >
                See the patients
              </Button>
            </GlowyCard>

            {/* Stable today */}
            <GlowyCard compact style={styles.statCard}>
              <ThemedText variant="caption" color="secondary" style={{  fontSize: 14, fontWeight: 'bold', marginVertical: 4, marginHorizontal: 2 }}>
                Stable today
              </ThemedText>
              <ThemedText
                variant="heading"
                weight="bold"
                style={[styles.statValue, { fontSize: 20 , marginHorizontal: 2}]}
              >
                {cohortSnapshot.stableToday}
              </ThemedText>
              <ThemedText variant="caption" color="secondary" style={{ fontSize: 11, marginHorizontal: 2, marginBottom: 4 }}>
                with vitals in range
              </ThemedText>

              <Button
                variant="secondary"
                size="sm"
                style={styles.smallButton}
                textStyle={{ fontSize: 11 ,}}
              >
                See the patients
              </Button>
            </GlowyCard>
          </View>

          {/* SNAPSHOT GRID */}
          <View style={styles.section}>
            <ThemedText
              variant="heading"
              weight="semibold"
              style={[styles.sectionTitle, { fontSize: 17 }]}
            >
              Today’s cohort snapshot
            </ThemedText>

            <View style={styles.snapshotGrid}>
              {/* BP */}
              <GlowyCard compact style={styles.snapshotCard}>
                <ThemedText variant="caption" color="secondary" style={{  fontSize: 14, fontWeight: 'bold', marginVertical: 4, marginHorizontal: 2  }}>
                  Blood pressure
                </ThemedText>
                <ThemedText
                  variant="heading"
                  weight="bold"
                  style={{
                    color: Colors.accent.gold,
                    marginHorizontal: 2 , 
                    marginBottom: 4,
                    fontSize: 20,
                    lineHeight: 24,
                  }}
                >
                  {cohortSnapshot.bpRecordedToday}
                </ThemedText>
                <ThemedText variant="caption" color="secondary" style={{ fontSize: 11 , marginHorizontal: 2 , marginBottom: 4 }}>
                  patients recorded BP today
                </ThemedText>

                <Button
                  variant="secondary"
                  size="sm"
                  style={styles.smallButton}
                  textStyle={{ fontSize: 11 , }}
                >
                  See the patients
                </Button>
              </GlowyCard>

              {/* Adherence */}
              <GlowyCard compact style={styles.snapshotCard}>
                <ThemedText variant="caption" color="secondary" style={{ fontSize: 14, fontWeight: 'bold', marginVertical: 4, marginHorizontal: 2 }}>
                  Daily adherence
                </ThemedText>
                <ThemedText
                  variant="heading"
                  weight="bold"
                  style={{
                    color: '#fff',
                    marginHorizontal: 2 , 
                    marginBottom: 4 ,
                    fontSize: 20,
                    lineHeight: 24,
                  }}
                >
                  {cohortSnapshot.fullyAdherentToday}
                </ThemedText>
                <ThemedText variant="caption" color="secondary" style={{ fontSize: 11 , marginHorizontal: 2 , marginBottom: 4 }}>
                  completed all tasks
                </ThemedText>

                <Button
                  variant="secondary"
                  size="sm"
                  style={styles.smallButton}
                  textStyle={{ fontSize: 11 }}
                >
                  See the patients
                </Button>
              </GlowyCard>

              {/* Missed yesterday — NEGATIVE */}
              <GlowyCard compact style={styles.snapshotCard}>
                <ThemedText variant="caption" color="secondary" style={{  fontSize: 14, fontWeight: 'bold', marginVertical: 4, marginHorizontal: 2 }}>
                  Missed yesterday
                </ThemedText>
                <ThemedText
                  variant="heading"
                  weight="bold"
                  style={{
                    color: Colors.status.attention,
                    marginVertical: 4,
                    marginHorizontal: 2,
                    fontSize: 20,
                    lineHeight: 24,
                  }}
                >
                  {cohortSnapshot.missedGoalsYesterday}
                </ThemedText>
                <ThemedText variant="caption" color="secondary" style={{ fontSize: 11 , marginVertical: 4, marginHorizontal: 2 }}>
                  patients omitted goal
                </ThemedText>

                <Button
                  variant="secondary"
                  size="sm"
                  style={styles.smallButton}
                  textStyle={{ fontSize: 11 }}
                >
                  See the patients
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  style={styles.smallButton}
                  textStyle={{ fontSize: 11 }}
                >
                  Reach by call
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  style={styles.smallButton}
                  textStyle={{ fontSize: 11 }}
                >
                  Reach by message
                </Button>
              </GlowyCard>

              {/* High-risk alerts — NEGATIVE */}
              <GlowyCard compact style={styles.snapshotCard} glowColor="#ef4444">
                <ThemedText variant="caption" color="secondary" style={{  fontSize: 14, fontWeight: 'bold', marginVertical: 4, marginHorizontal: 2 }}>
                  High-risk alerts
                </ThemedText>
                <ThemedText
                  variant="heading"
                  weight="bold"
                  style={{
                    color: Colors.status.action,
                    marginVertical: 4,
                    marginHorizontal: 2,
                    fontSize: 20,
                    lineHeight: 24,
                  }}
                >
                  {cohortSnapshot.highRiskAlertsOpen}
                </ThemedText>
                <ThemedText variant="caption" color="secondary" style={{ fontSize: 11 ,marginVertical: 4, marginHorizontal: 2  }}>
                  escalations awaiting review
                </ThemedText>

                <Button
                  variant="secondary"
                  size="sm"
                  style={styles.smallButton}
                  textStyle={{ fontSize: 11 }}
                >
                  See the patients
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  style={styles.smallButton}
                  textStyle={{ fontSize: 11 }}
                >
                  Reach by call
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  style={styles.smallButton}
                  textStyle={{ fontSize: 11 }}
                >
                  Reach by message
                </Button>
              </GlowyCard>
            </View>
          </View>

          {/* PRIORITY OVERVIEW */}
          <View style={styles.section}>
            <ThemedText
              variant="heading"
              weight="semibold"
              style={[styles.sectionTitle, { fontSize: 17 }]}
            >
              Priority overview
            </ThemedText>

            {patientData?.insights?.map((insight) => (
              <GlowyCard key={insight.id} style={styles.insightCard}>
                <ThemedText
                  variant="subtitle"
                  weight="semibold"
                  style={[styles.insightTitle, { fontSize: 15 }]}
                >
                  {insight.title}
                </ThemedText>
                <ThemedText
                  variant="body"
                  color="secondary"
                  style={[styles.insightBody, { fontSize: 13, lineHeight: 18 }]}
                >
                  {insight.reason}
                </ThemedText>

                {insight.action && (
                  <Button
                    variant="secondary"
                    size="sm"
                    style={{
                      ...styles.reviewButton,
                      paddingVertical: 4,
                    }}
                    textStyle={{ fontSize: 11, color: '#fff' }}
                    onPress={insight.action.onPress}
                  >
                    {insight.action.label}
                  </Button>
                )}
              </GlowyCard>
            ))}
          </View>

          {/* TODAY’S WORKLIST */}
          <View style={styles.section}>
            <ThemedText
              variant="heading"
              weight="semibold"
              style={[styles.sectionTitle, { fontSize: 17 }]}
            >
              Today’s worklist
            </ThemedText>

            {patientData?.careTasks?.map((task) => (
              <GlowyCard key={task.id} onPress={() => { }} style={styles.taskCard}>

                {/* Task Title Row */}
                <View style={styles.taskHeaderRow}>
                  <ThemedText
                    variant="subtitle"
                    weight="semibold"
                    style={styles.taskTitle}
                  >
                    {task.title}
                  </ThemedText>

                  <View
                    style={[
                      styles.statusPill,
                      task.status === 'due' && styles.statusDue,
                      task.status === 'overdue' && styles.statusOverdue,
                      task.status === 'completed' && styles.statusCompleted,
                    ]}
                  >
                    <ThemedText
                      variant="caption"
                      weight="semibold"
                      style={{ color: '#fff', fontSize: 11 }}
                    >
                      {task.status}
                    </ThemedText>
                  </View>
                </View>

                {/* Description */}
                <ThemedText
                  variant="body"
                  color="secondary"
                  style={styles.taskDescription}
                >
                  {task.description}
                </ThemedText>

                {/* Footer info */}
                <View style={styles.taskFooterRow}>
                  <ThemedText
                    variant="caption"
                    color="secondary"
                    style={styles.taskDueDate}
                  >
                    Due: {typeof task.dueDate === 'string'
  ? task.dueDate
  : task.dueDate.toLocaleDateString()}

                  </ThemedText>

                  <Button
                    variant="outline"
                    size="sm"
                    style={styles.taskActionButton}
                    textStyle={{ fontSize: 11 }}
                  >
                    Review
                  </Button>
                </View>

              </GlowyCard>
            ))}
          </View>

          <View style={{ height: Spacing['3xl'] }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ---------------------------------------------------------------------

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },
  safeArea: { flex: 1, backgroundColor: 'transparent' },

  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  backButtonText: {
  },

  header: {
    color: '#fff',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    marginBottom: Spacing.xl,
  },

  statRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: { flex: 1 },
  statValue: {
    color: '#fff',
    marginVertical: Spacing.xs,
  },

  smallButton: {
    marginTop: Spacing.sm,
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(13, 148, 136, 0.8)',
  },

  section: { marginBottom: Spacing.xs },
  sectionTitle: { color: '#fff', marginBottom: Spacing.sm },

  snapshotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  snapshotCard: {
    flexBasis: '47%',
  },

  insightCard: {
    marginBottom: Spacing.md,
  },
  insightTitle: { color: '#fff' },
  insightBody: { marginTop: Spacing.xs, marginBottom: Spacing.sm },
  reviewButton: { alignSelf: 'flex-start', marginTop: Spacing.xs, backgroundColor: 'rgba(79, 70, 229, 0.4)'
  },

  taskCard: {
    marginBottom: Spacing.xs,
  },

  
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    marginTop: Spacing.md,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(57, 73, 171, 0.22)',
  },

  cardBase: {
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 16,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  cardCompact: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },

  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  cardContent: { position: 'relative', zIndex: 2 },

  glowTopRight: {
    position: 'absolute',
    width: 360,
    height: 360,
    right: -120,
    top: -80,
    borderRadius: 999,
    backgroundColor: Colors.primary.indigo,
    opacity: 0.1,
  },

  glowBottomLeft: {
    position: 'absolute',
    width: 520,
    height: 520,
    left: -200,
    bottom: -160,
    borderRadius: 999,
    backgroundColor: Colors.primary.teal,
    opacity: 0.08,
  },

  taskHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },

  taskTitle: {
    color: '#fff',
    fontSize: 15,
  },

  statusPill: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 999,
  },

  statusDue: {
    backgroundColor: Colors.status.attention,
  },

  statusCompleted: {
    backgroundColor: Colors.primary.teal,
  },

  statusOverdue: {
    backgroundColor: Colors.status.action,
  },

  taskDescription: {
    marginBottom: Spacing.sm,
    fontSize: 13,
    lineHeight: 18,
  },

  taskFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },

  taskDueDate: {
    fontSize: 12,
  },

  taskActionButton: {
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
  },

  highRiskGlow: {
  ...StyleSheet.absoluteFillObject,
  borderRadius: BorderRadius.xl,
  borderTopWidth: 1,
  borderLeftWidth: 1,
  borderColor: 'rgba(255,0,0,0.4)', // glow roșu
},


});
