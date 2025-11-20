import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { ThemedText } from '../../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../../constants/Colors';

export default function ConsentScreen() {
  const router = useRouter();

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
      <LinearGradient
        colors={['#08131c', '#0b1e29', '#0d2533']}
        style={StyleSheet.absoluteFill}
        start={[0, 0]}
        end={[1, 1]}
      />

      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>

          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>

          {/* Main Card */}
          <View style={styles.card}>
            <ThemedText variant="display" weight="bold" style={styles.title} align="center">
              Consent & Preferences
            </ThemedText>

            <ThemedText variant="body" color="secondary" style={styles.body} align="center">
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
              color="teal"
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
              onPress={() => router.push('/patient/onboarding/dataconnections')}
            >
                            <ThemedText variant="label" weight="semibold" style={{ color: "#0f172a", textAlign: "center" }}>
                Continue
              </ThemedText> </Button>
          </View>

          {/* Disclaimer */}
          <ThemedText
            variant="caption"
            color="tertiary"
            align="center"
            style={styles.disclaimer}
          >
            You can adjust all consent settings later from your profile.
          </ThemedText>

        </ScrollView>
      </SafeAreaView>
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
          { color: '#ffffff', textAlign: centerText ? 'center' : 'left' }
        ]}
      >
        {label}
      </ThemedText>

      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? '#0d9488' : '#e2e8f0'}
        trackColor={{ true: '#99f6e4', false: '#cbd5e1' }}
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
    backgroundColor: Colors.background.primary,
  },
  safeArea: { flex: 1 },

  container: {
    flexGrow: 1,
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
    alignItems: 'center',
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    marginTop: Spacing.md,
     padding: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(57, 73, 171, 0.22)',
  },

  card: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
  },

  title: {
    marginBottom: Spacing.md,
    color: '#fff',
    textAlign: 'center',
  },
  body: {
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },

  section: {
    marginBottom: Spacing.xl,
    gap: Spacing.md,
    width: '100%',
  },

  subtitle: {
    marginBottom: Spacing.md,
    color: Colors.primary.teal,
    textAlign: 'center',
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
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
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    paddingRight: Spacing.sm,
  },

  nextButton: {
    marginTop: Spacing.lg,
  },

  disclaimer: {
    marginBottom: 25,
    marginTop: 15,
    textAlign: 'center',
  },

  glowTopRight: {
    position: 'absolute',
    width: 400,
    height: 400,
    right: -150,
    top: -100,
    borderRadius: 999,
    backgroundColor: Colors.primary.indigo,
    opacity: 0.12,
  },

  glowBottomLeft: {
    position: 'absolute',
    width: 480,
    height: 480,
    left: -200,
    bottom: -160,
    borderRadius: 999,
    backgroundColor: '#3949AB',
    opacity: 0.1,
  },
});
