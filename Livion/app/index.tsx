import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { Pressable, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Button } from "../components/atoms/Button";
import { ThemedText } from "../components/atoms/ThemedText";
import { BorderRadius, Colors, Spacing } from "../constants/Colors";

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* TITLE */}
          <ThemedText variant="display" weight="bold" style={styles.title}>
            Livion
          </ThemedText>

          <ThemedText variant="body" style={styles.subtitle}>
            Your health story. Yours to share.
          </ThemedText>

          {/* PATIENT CARD */}
          <View style={styles.roleCard}>
            <Ionicons name="person-circle-outline" size={40} color="white" />

            <View style={styles.cardHeader}>
              <ThemedText variant="heading" weight="semibold" style={styles.cardTitle}>
                I'm a Patient
              </ThemedText>
              <ThemedText variant="body" style={styles.cardDesc}>
                Track health, connect with care team
              </ThemedText>
            </View>

            <View style={styles.cardButtons}>
              <Button
                variant="primary"
                fullWidth
                onPress={() => router.push("/patient/onboarding/welcome" as Href)}
              >
                Get Started
              </Button>

              <Button
                variant="secondary"
                fullWidth
                onPress={() => router.push("/patient/login" as Href)}
              >
                Sign In
              </Button>
            </View>
          </View>

          {/* PROVIDER CARD */}
          <View style={styles.roleCard}>
            <Ionicons name="medkit-outline" size={40} color="white" />

            <View style={styles.cardHeader}>
              <ThemedText variant="heading" weight="semibold" style={styles.cardTitle}>
                I'm a Healthcare Provider
              </ThemedText>

              <ThemedText variant="body" style={styles.cardDesc}>
                Manage patients, care plans & insights
              </ThemedText>
            </View>

            <View style={styles.cardButtons}>
              <Button
                variant="primary"
                fullWidth
                onPress={() => router.push("/clinician/onboarding/welcome" as Href)}
              >
                Get Started
              </Button>

              <Button
                variant="secondary"
                fullWidth
                onPress={() => router.push("/clinician/login" as Href)}
              >
                Sign In
              </Button>
            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <ThemedText variant="body" style={styles.footerLabel}>
              OTHER ROLES
            </ThemedText>

            <View style={styles.footerLinks}>
              <Pressable onPress={() => router.push("/coordinator/login" as Href)}>
                <ThemedText variant="body" style={styles.footerLink}>
                  Care Coordinator
                </ThemedText>
              </Pressable>

              <ThemedText variant="body" style={styles.footerDot}>•</ThemedText>

              <Pressable onPress={() => router.push("/admin/login" as Href)}>
                <ThemedText variant="body" style={styles.footerLink}>
                  Administrator
                </ThemedText>
              </Pressable>
            </View>

            <ThemedText variant="caption" style={styles.poweredBy}>
              Powered by Minai™ AI
            </ThemedText>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },

  container: {
    flex: 1,
    padding: Spacing.lg,
    paddingBottom: 290,
    paddingTop: 290,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.lg,
  },

  title: {
    color: Colors.primary.teal,
    fontSize: 38,
  },

  subtitle: {
    fontSize: 14,
    color: "#d1e0e080",
    marginBottom: Spacing.sm,
  },

  roleCard: {
    width: "100%",
    maxWidth: 380,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.background.cardGlass,
    padding: Spacing.lg,
    borderWidth: 2,
    borderColor: "#ffffff22",
    gap: Spacing.sm,
  },

  cardHeader: { marginTop: Spacing.xs },

  cardTitle: {
    color: "white",
    fontSize: 20,
  },

  cardDesc: {
    color: "#b3c3d4aa",
    fontSize: 13,
  },

  cardButtons: {
    marginTop: Spacing.sm,
    gap: Spacing.xs,
  },

  footer: {
    alignItems: "center",
    marginTop: Spacing.md,
  },

  footerLabel: {
    color: "#b3c3d488",
  },

  footerLinks: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },

  footerLink: {
    color: Colors.primary.mint,
    textDecorationLine: "underline",
  },

  footerDot: {
    color: "#7a8da0",
  },

  poweredBy: {
    color: "#0d948866",
    marginTop: 6,
  },
});
