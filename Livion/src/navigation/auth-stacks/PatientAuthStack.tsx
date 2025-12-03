import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../screens/patient/auth/Login';
import PatientOnboaringWelcome from '../../screens/patient/onboarding/welcome';

const Stack = createNativeStackNavigator();

type PatientAuthStackProps = {
  initial: "login" | "onboarding";
};

export default function PatientAuthStack({ initial }: PatientAuthStackProps) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        initial === "login"
          ? "PatientLogin"
          : "PatientOnboardingWelcome"
      }
    >
      <Stack.Screen
        name="PatientOnboardingWelcome"
        component={PatientOnboaringWelcome}
      />
      <Stack.Screen
        name="PatientLogin"
        component={Login}
      />
    </Stack.Navigator>
  );
}
