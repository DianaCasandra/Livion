import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/atoms/Button';
import { ThemedText } from '../../components/atoms/ThemedText';
import { BorderRadius, Colors, Spacing } from '../../constants/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

type AuthStackParamList = {
  Landing: undefined;
  RoleAuth: {
    role: string;
    initial: "login" | "onboarding";
  };
};
type LandingNav = NativeStackNavigationProp<AuthStackParamList, 'Landing'>;

export default function LandingPage() {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const navigation = useNavigation<LandingNav>();


  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopAnimation = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 9000,
            delay,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 9000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    loopAnimation(anim1, 0);
    loopAnimation(anim2, 2000);
  }, []);

  const blob1Style = {
    transform: [
      {
        translateX: anim1.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 50],
        }),
      },
      {
        translateY: anim1.interpolate({
          inputRange: [0, 1],
          outputRange: [-30, 30],
        }),
      },
    ],
  };

  const blob2Style = {
    transform: [
      {
        translateX: anim2.interpolate({
          inputRange: [0, 1],
          outputRange: [40, -40],
        }),
      },
      {
        translateY: anim2.interpolate({
          inputRange: [0, 1],
          outputRange: [60, -60],
        }),
      },
    ],
  };

  const roles = [
    { key: 'patient', label: 'Patient', twoOptions: true },
    { key: 'clinician', label: 'Clinician', twoOptions: true },
    { key: 'coordinator', label: 'Care Coordinator', twoOptions: false },
    { key: 'admin', label: 'Admin', twoOptions: false },
  ];

  const toggleRole = (role: string) => {
    setExpandedRole(prev => (prev === role ? null : role));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={["#07203f", "#04363a", "#06233d"]}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View style={[styles.blobBlue, blob1Style]} />
      <Animated.View style={[styles.blobTeal, blob2Style]} />

      <SafeAreaView style={styles.safeAreaContent}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>

            <ThemedText variant="display" weight="bold" style={styles.title}>
              Livion
            </ThemedText>

            <ThemedText variant="body" style={[styles.subtitle, { color: '#0d948866' }]}>
              Powered by Minai
            </ThemedText>

            <ThemedText variant="heading" style={[styles.sectionLabel, { color: '#3949AB' }]}>
              Choose your role
            </ThemedText>

            <View style={styles.rolesContainer}>
              {roles.map(role => (
                <View key={role.key} style={styles.roleWrapper}>
                  
                  {/* BUTTON INTER */}
                  <Button
                    variant="primary"
                    fullWidth
                    onPress={() => toggleRole(role.key)}
                  >
                    {role.label}
                  </Button>

                  {expandedRole === role.key && (
                    <View style={styles.subButtonsContainer}>
                      {role.twoOptions ? (
                        <>
                          <Button
                            variant="secondary"
                            style={styles.subButton}
                          //  onPress={() =>
                          //     navigation.navigate("RoleAuth", {
                          //       role: role.key,
                          //       initial: "onboarding"
                          //     })
                          //   }

                          >
                            Onboarding
                          </Button>

                          <Button
                            variant="secondary"
                            onPress={() =>
                                navigation.navigate('RoleAuth', {
                                  role: role.key,
                                  initial: 'login'
                                })
                            }
                          >
                            Login
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="secondary"
                          style={styles.subButton}
                          onPress={() =>
                              navigation.navigate('RoleAuth', {
                                role: role.key,
                                initial: 'login'
                              })
                            }
                        >
                          Login
                        </Button>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#041025',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
  },
  safeAreaContent: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  card: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.background.cardGlass,
    borderColor: Colors.border.medium,
    borderWidth: 3,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    marginBottom: Spacing.sm,
    color: Colors.primary.teal,
  },
  subtitle: {
    marginBottom: Spacing.lg,
    fontSize: 16,
  },
  sectionLabel: {
    marginBottom: Spacing.lg,
    color: '#5C6BC0',
    fontSize: 20,
    fontWeight: '700',
  },
  rolesContainer: {
    width: '100%',
    maxWidth: 340,
    gap: Spacing.lg,
  },
  roleWrapper: { gap: Spacing.sm },
  subButtonsContainer: {
    marginTop: Spacing.sm,
    gap: Spacing.sm,
    width: '100%',
    alignItems: 'center',
  },
  subButton: {
    minWidth: '70%',
    backgroundColor: '#3949AB',
  },
  blobBlue: {
    position: 'absolute',
    width: 450,
    height: 450,
    borderRadius: 999,
    backgroundColor: '#075985',
    opacity: 0.12,
    top: -150,
    right: -120,
  },
  blobTeal: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 999,
    backgroundColor: '#0ea5a4',
    opacity: 0.10,
    bottom: -130,
    left: -170,
  },
});
