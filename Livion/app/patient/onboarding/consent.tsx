import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
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

  // Toggles
  const [dataSources, setDataSources] = useState(false);
  const [wearables, setWearables] = useState(false);
  const [ehr, setEhr] = useState(false);

  const [privateShare, setPrivateShare] = useState(false);
  const [circleShare, setCircleShare] = useState(false);
  const [clinicianShare, setClinicianShare] = useState(false);

  const [research, setResearch] = useState(false);
  const [purposeBinding, setPurposeBinding] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={22} color="#0d9488" />
          <ThemedText variant="body" color="teal" style={{ marginLeft: 6 }}>
            Back
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.card}>
          <ThemedText variant="display" weight="bold" style={styles.title}>
            Consent & Preferences
          </ThemedText>

          <ThemedText variant="body" color="secondary" style={styles.body}>
            Adjust what you want Livion to use or access. You can modify these anytime.
          </ThemedText>

          {/* ─────────────────────────────── */}
          {/* Data Sources */}
          {/* ─────────────────────────────── */}
          <View style={styles.section}>
            <ToggleRow
              label="Data Sources"
              value={dataSources}
              onValueChange={() => setDataSources(prev => !prev)}
            />

            {dataSources && (
              <View style={styles.subToggleGroup}>
                <ToggleRow
                  label="Wearables"
                  value={wearables}
                  onValueChange={() => setWearables(prev => !prev)}
                  small
                />
                <ToggleRow
                  label="EHR"
                  value={ehr}
                  onValueChange={() => setEhr(prev => !prev)}
                  small
                />
              </View>
            )}
          </View>

          {/* ─────────────────────────────── */}
          {/* Sharing Scopes */}
          {/* ─────────────────────────────── */}
          <ThemedText
            variant="heading"
            weight="semibold"
            style={styles.subtitle}
          >
            Sharing Scopes
          </ThemedText>

          <View style={styles.section}>
            <ToggleRow
              label="Private"
              value={privateShare}
              onValueChange={() => setPrivateShare(prev => !prev)}
            />
            <ToggleRow
              label="Circle"
              value={circleShare}
              onValueChange={() => setCircleShare(prev => !prev)}
            />
            <ToggleRow
              label="Clinician"
              value={clinicianShare}
              onValueChange={() => setClinicianShare(prev => !prev)}
            />
          </View>

          {/* ─────────────────────────────── */}
          {/* Additional Toggles */}
          {/* ─────────────────────────────── */}
          <View style={styles.section}>
            <ToggleRow
              label="Research opt-in"
              value={research}
              onValueChange={() => setResearch(prev => !prev)}
            />

            <ToggleRow
              label="Purpose binding & data minimization"
              value={purposeBinding}
              onValueChange={() => setPurposeBinding(prev => !prev)}
            />
          </View>

          {/* NEXT Button */}
          <Button
            variant="primary"
            fullWidth
            style={styles.nextButton}
            onPress={() => router.push('/patient/onboarding/dataconnections')}
          >
            Next Step <ArrowRight size={18} color="white" />
          </Button>
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
  );
}

/* ──────────────────────────────── */
/*  Component: Toggle Row           */
/* ──────────────────────────────── */

function ToggleRow({
  label,
  value,
  onValueChange,
  small = false,
}: {
  label: string;
  value: boolean;
  onValueChange: () => void;
  small?: boolean;
}) {
  return (
    <View style={[styles.toggleRow, small && styles.smallToggleRow]}>
      <ThemedText
        variant="body"
        style={[styles.toggleLabel, small && styles.smallToggleLabel]}
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

/* ──────────────────────────────── */
/*  Styles                           */
/* ──────────────────────────────── */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  container: {
    flexGrow: 1,
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  card: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.background.cardGlass,
    borderColor: Colors.border.medium,
    borderWidth: 1,
  },

  title: {
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  body: {
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },

  section: {
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },

  subtitle: {
    marginBottom: Spacing.md,
  },

  /* Toggle rows */
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallToggleRow: {
    paddingLeft: Spacing.lg,
  },
  toggleLabel: {
    flexShrink: 1,
    marginRight: Spacing.md,
  },
  smallToggleLabel: {
    fontSize: 14,
  },

  /* Sub-toggles for data sources */
  subToggleGroup: {
    marginTop: -Spacing.sm,
    gap: Spacing.sm,
  },

  nextButton: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },

  disclaimer: {
    marginTop: Spacing.lg,
  },
});
