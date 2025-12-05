import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import { AnimatedBlobBackground } from '../../../components/atoms/AnimatedBlobBackground';
import { Button } from '../../../components/atoms/Button';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { BorderRadius, Spacing, COLORS } from '@/src/constants/Colors';

export default function ConsentScreen() {
  const navigation = useNavigation();

  const [dataSources, setDataSources] = useState(false);
  const [wearables, setWearables] = useState(false);
  const [ehr, setEhr] = useState(false);

  const [privateShare, setPrivateShare] = useState(false);
  const [circleShare, setCircleShare] = useState(false);
  const [clinicianShare, setClinicianShare] = useState(false);

  const [research, setResearch] = useState(false);
  const [purposeBinding, setPurposeBinding] = useState(false);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <AnimatedBlobBackground />

      <ScreenHeader />

      <ScrollView contentContainerStyle={styles.container}>

          {/* Main Card */}
          <View style={styles.card}>
            <ThemedText variant="display" weight="bold" style={styles.title} align="center">
              Consent & Preferences
            </ThemedText>

            <ThemedText variant="body" style={styles.body} align="center">
              Adjust what you want Livion to use or access. You can modify these anytime.
            </ThemedText>

            {/* Data Sources */}
            <View style={styles.section}>
              <ToggleRow
                label="Data Sources"
                value={dataSources}
                onValueChange={() => setDataSources(prev => !prev)}
                centerText
              />

              {dataSources && (
                <View style={styles.subToggleGroup}>
                  <ToggleRow
                    label="Wearables"
                    value={wearables}
                    onValueChange={() => setWearables(prev => !prev)}
                    small
                    centerText
                  />
                  <ToggleRow
                    label="EHR"
                    value={ehr}
                    onValueChange={() => setEhr(prev => !prev)}
                    small
                    centerText
                  />
                </View>
              )}
            </View>

            {/* Sharing Scopes */}
            <ThemedText
              variant="heading"
              weight="semibold"
              align="center"
              style={styles.subtitle}
            >
              Sharing Scopes
            </ThemedText>

            <View style={styles.section}>
              <ToggleRow label="Private" value={privateShare} onValueChange={() => setPrivateShare(prev => !prev)} centerText />
              <ToggleRow label="Circle" value={circleShare} onValueChange={() => setCircleShare(prev => !prev)} centerText />
              <ToggleRow label="Clinician" value={clinicianShare} onValueChange={() => setClinicianShare(prev => !prev)} centerText />
            </View>

            {/* Additional Toggles */}
            <View style={styles.section}>
              <ToggleRow label="Research opt-in" value={research} onValueChange={() => setResearch(prev => !prev)} centerText />
              <ToggleRow label="Purpose binding & data minimization" value={purposeBinding} onValueChange={() => setPurposeBinding(prev => !prev)} centerText />
            </View>

            {/* NEXT Button */}
            <Button
              variant="primary"
              fullWidth
              style={styles.nextButton}
              textStyle={{ textAlign: "center" }}
              onPress={() => navigation.navigate('DataConnections' as never)}
            >
              <ThemedText variant="label" weight="semibold" style={{ color: "#fff", textAlign: "center" }}>
                Continue
              </ThemedText>
            </Button>
          </View>

          {/* Disclaimer */}
          <ThemedText
            variant="caption"
            align="center"
            style={styles.disclaimer}
          >
            You can adjust all consent settings later from your profile.
          </ThemedText>

      </ScrollView>
    </View>
  );
}


/* ─────────────────────────────── */
/* ToggleRow Component */
/* ─────────────────────────────── */

function ToggleRow({
  label,
  value,
  onValueChange,
  small = false,
  centerText = false,
}: {
  label: string;
  value: boolean;
  onValueChange: () => void;
  small?: boolean;
  centerText?: boolean;
}) {
  return (
    <View style={[styles.toggleRow, small && styles.smallToggleRow]}>
      <ThemedText
        variant="body"
        style={[
          styles.toggleLabel,
          small && styles.smallToggleLabel,
          { color: COLORS.textPrimary, textAlign: centerText ? 'center' : 'left' }
        ]}
      >
        {label}
      </ThemedText>

      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? COLORS.teal : '#e2e8f0'}
        trackColor={{ true: COLORS.tealLight, false: '#cbd5e1' }}
      />
    </View>
  );
}


/* ─────────────────────────────── */
/* Styles */
/* ─────────────────────────────── */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flexGrow: 1,
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
    alignItems: 'center',
  },

  card: {
    padding: Spacing.xl,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 10 }, shadowRadius: 30 },
      android: { elevation: 6 },
    }),
  },

  title: {
    marginBottom: Spacing.md,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  body: {
    marginBottom: Spacing.xl,
    textAlign: 'center',
    color: COLORS.textSecondary,
  },

  section: {
    marginBottom: Spacing.xl,
    gap: Spacing.md,
    width: '100%',
  },

  subtitle: {
    marginBottom: Spacing.md,
    color: COLORS.teal,
    textAlign: 'center',
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },

  smallToggleRow: {
    paddingLeft: Spacing.lg,
  },

  toggleLabel: {
    flex: 1,
    marginRight: Spacing.md,
    textAlign: 'center',
  },

  smallToggleLabel: {
    fontSize: 14,
  },

  subToggleGroup: {
    marginTop: Spacing.xs,
    gap: Spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },

  nextButton: {
    marginTop: Spacing.lg,
    backgroundColor: COLORS.teal,
  },

  disclaimer: {
    marginBottom: 25,
    marginTop: 15,
    textAlign: 'center',
    color: COLORS.textSecondary,
  },
});
