import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { InputField } from '../../../components/atoms/InputField';
import { Button } from '../../../components/atoms/Button';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';

export default function CarePlanAuthoring() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [goals, setGoals] = useState('');

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background */}
      <LinearGradient
        colors={['#050816', '#031824', '#031b2e']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* Soft glows */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />

      <SafeAreaView style={styles.safearea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <ThemedText
            variant="display"
            weight="bold"
            style={styles.header}
          >
            Care Plan Authoring
          </ThemedText>

          <ThemedText
            variant="body"
            color="secondary"
            style={styles.subtitle}
          >
            Draft, refine and preview patient care plans.
          </ThemedText>

          {/* ---------------------- INPUT CARD ---------------------- */}
          <View style={styles.card}>
            <View style={styles.innerCardContent}>
              <InputField
                label="Care Plan Title"
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. Hypertension Week 1 Plan"
                style={styles.input}
              />

              <InputField
                label="Details"
                value={details}
                onChangeText={setDetails}
                placeholder="Key actions, reminders, frequency..."
                multiline
                style={styles.input}
              />

              <InputField
                label="Goals"
                value={goals}
                onChangeText={setGoals}
                placeholder="Daily or weekly goals..."
                multiline
                style={styles.input}
              />
            </View>
          </View>

          {/* ---------------------- ACTION BUTTONS ---------------------- */}
          <View style={styles.buttonGroup}>
            <Button variant="primary" fullWidth>
              Save Draft
            </Button>

            <Button variant="secondary" fullWidth>
              Share with Patient
            </Button>

            {/* NEW BUTTON */}
            <Button
              variant="outline"
              fullWidth
              style={styles.previewButton}
            >
              Patient-friendly language auto-preview
            </Button>
          </View>

          <View style={{ height: 90 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },
  safearea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  header: {
    color: '#fff',
    marginBottom: Spacing.xs,
    fontSize: 28,
    lineHeight: 34,
  },
  subtitle: {
    marginBottom: Spacing.xl,
    fontSize: 13,
    color: Colors.text.secondary,
  },

  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.68)',
    paddingVertical: Spacing.lg + 2,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: Spacing.xl,
  },

  innerCardContent: {
    gap: Spacing.md,
  },

  input: {
    marginBottom: Spacing.sm,
  },

  buttonGroup: {
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },

  previewButton: {
    paddingVertical: 10,
  },

  // Glows
  glowTopRight: {
    position: 'absolute',
    width: 360,
    height: 360,
    right: -140,
    top: -120,
    borderRadius: 999,
    backgroundColor: Colors.primary.indigo,
    opacity: 0.10,
  },
  glowBottomLeft: {
    position: 'absolute',
    width: 480,
    height: 480,
    left: -200,
    bottom: -180,
    borderRadius: 999,
    backgroundColor: Colors.primary.teal,
    opacity: 0.08,
  },
});
