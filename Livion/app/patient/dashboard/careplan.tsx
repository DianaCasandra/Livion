import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { CareTaskTile } from '../../../components/molecules/CareTaskTile';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';
import { useMockData } from '../../../hooks/useMockData';

const { width: SCREEN_W } = Dimensions.get('window');

// ------------------------------------------------------------------
// GlowyCard cu aura coral pulsantă
// ------------------------------------------------------------------
function GlowyCard({ children, compact = false, onPress, task }: any) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(0.15)).current;

  useEffect(() => {
    if (task?.status === 'overdue') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 0.3, duration: 1200, useNativeDriver: false }),
          Animated.timing(pulseAnim, { toValue: 0.15, duration: 1200, useNativeDriver: false }),
        ])
      ).start();
    }
  }, [task]);

  const onPressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.985, useNativeDriver: true, speed: 30 }).start();

  const onPressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 30 }).start();

  const isOverdue = task?.status === 'overdue';
  const coralColor = '#ef4444';

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Animated.View
        style={[
          styles.card,
          compact && styles.cardCompact,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* Glow aura */}
        {isOverdue && (
          <Animated.View
            style={[
              styles.cardGlow,
              {
                opacity: pulseAnim,
                borderRadius: BorderRadius.xl ,
              },
            ]}
          >
            <LinearGradient
              colors={[coralColor + '80', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ ...StyleSheet.absoluteFillObject, borderRadius: BorderRadius.xl }}
            />
          </Animated.View>
        )}

        {/* Card content */}
        <View style={styles.cardContent}>{children}</View>
      </Animated.View>
    </Pressable>
  );
}

// ------------------------------------------------------------------
// CarePlanScreen
// ------------------------------------------------------------------
export default function CarePlanScreen() {
  const { patientData } = useMockData();

  const [careTasks, setCareTasks] = React.useState(patientData.careTasks);

  const toggleTaskStatus = (taskId: string) => {
    setCareTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'completed' ? 'due' : 'completed' }
          : task
      )
    );
  };

  const activeTasks = careTasks.filter(task => task.status !== 'completed');
  const doneTasks = careTasks.filter(task => task.status === 'completed');

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
          <ThemedText
            variant="display"
            weight="bold"
            style={[styles.header, { fontSize: 30, lineHeight: 36 }]}
          >
            Care Plan
          </ThemedText>

          {/* Active Tasks */}
          <View style={styles.section}>
            <ThemedText
              variant="heading"
              weight="semibold"
              style={[styles.sectionTitle, { fontSize: 18 }]}
            >
              Active Tasks ({activeTasks.length})
            </ThemedText>

            {activeTasks.map(task => (
              <GlowyCard key={task.id} compact onPress={() => toggleTaskStatus(task.id)} task={task}>
                <CareTaskTile
                  title={task.title}
                  description={task.description}
                  dueDate={task.dueDate}
                  status={task.status}
                  style={{
                    backgroundColor: 'transparent',
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    borderWidth: 0,
                    marginVertical: 4,
                  }}
                />
              </GlowyCard>
            ))}

            {activeTasks.length === 0 && (
              <ThemedText color="secondary" style={{ fontStyle: 'italic' }}>
                All caught up!
              </ThemedText>
            )}
          </View>

          {/* Done Tasks */}
          {doneTasks.length > 0 && (
            <View style={styles.section}>
              <ThemedText
                variant="heading"
                weight="semibold"
                style={[styles.sectionTitle, { fontSize: 18 }]}
              >
                Done Tasks ({doneTasks.length})
              </ThemedText>

              {doneTasks.map(task => (
                <GlowyCard key={task.id} compact onPress={() => toggleTaskStatus(task.id)} task={task}>
                  <CareTaskTile
                    title={task.title}
                    description={task.description}
                    dueDate={task.dueDate}
                    status={task.status}
                    style={{
                      backgroundColor: 'transparent',
                      paddingHorizontal: 0,
                      paddingVertical: 0,
                      borderWidth: 0,
                      marginVertical: 4,
                      opacity: 0.6,
                    }}
                  />
                </GlowyCard>
              ))}
            </View>
          )}

          <View style={{ height: 140 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ------------------------------------------------------------------
// Styles
// ------------------------------------------------------------------
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background.primary },
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  container: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: Spacing['3xl'] },
  header: { color: '#fff', marginBottom: Spacing.lg },
  section: { marginBottom: Spacing['2xl'] },
  sectionTitle: { color: '#fff', marginBottom: Spacing.md },
  card: {
    backgroundColor: 'rgba(15,23,42,0.74)',
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.35)',
  },
  cardCompact: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md },
  cardContent: { position: 'relative', zIndex: 2 },
  glowTopRight: {
    position: 'absolute',
    width: 420,
    height: 420,
    right: -160,
    top: -80,
    borderRadius: 999,
    backgroundColor: Colors.primary.indigo,
    opacity: 0.12,
  },
  glowBottomLeft: {
    position: 'absolute',
    width: 520,
    height: 520,
    left: -220,
    bottom: -160,
    borderRadius: 999,
    backgroundColor: Colors.primary.teal,
    opacity: 0.08,
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl * 2,
    backgroundColor: 'transparent',
  },
});
