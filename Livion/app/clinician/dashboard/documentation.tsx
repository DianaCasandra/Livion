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

export default function ClinicianDocumentation() {
  const [noteTitle, setNoteTitle] = useState('');
  const [clinicalNote, setClinicalNote] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* background gradient */}
      <LinearGradient
        colors={['#050816', '#031824', '#031b2e']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      {/* glow overlays */}
      <View style={styles.glowTopRight} pointerEvents="none" />
      <View style={styles.glowBottomLeft} pointerEvents="none" />

      <SafeAreaView style={styles.safearea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {/* HEADER */}
          <ThemedText variant="display" weight="bold" style={styles.header}>
            Documentation
          </ThemedText>

          <ThemedText
            variant="body"
            color="secondary"
            style={styles.subtitle}
          >
            Record structured notes for clinical encounters and patient updates.
          </ThemedText>

          {/* CARD */}
          <View style={styles.card}>
            <View style={{ gap: Spacing.md }}>
              <InputField
                label="Note title"
                value={noteTitle}
                onChangeText={setNoteTitle}
                placeholder="e.g. Weekly check-in summary"
              />

              <InputField
                label="Clinical note"
                multiline
                value={clinicalNote}
                onChangeText={setClinicalNote}
                placeholder="Objective findings, symptoms, recent measurements..."
              />

              <InputField
                label="Assessment"
                multiline
                value={assessment}
                onChangeText={setAssessment}
                placeholder="Interpretation, clinical judgement..."
              />

              <InputField
                label="Plan"
                multiline
                value={plan}
                onChangeText={setPlan}
                placeholder="Next steps, follow-ups, medication adjustments..."
              />
            </View>
          </View>

          {/* ACTIONS */}
          <View style={styles.actions}>
            <Button variant="primary" fullWidth>
              Save Note
            </Button>

            <Button variant="secondary" fullWidth>
              Share With Care Team
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
    lineHeight: 18,
  },

  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.66)',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: Spacing.xl,
  },

  actions: {
    marginTop: Spacing.md,
    gap: Spacing.md,
  },

  glowTopRight: {
    position: 'absolute',
    width: 360,
    height: 360,
    right: -130,
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
