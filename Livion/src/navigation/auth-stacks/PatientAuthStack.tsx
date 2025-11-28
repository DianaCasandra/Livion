import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PatientLogin from '../screens/patient/login';
import PatientOnboardingWelcome from '../screens/patient/onboarding/welcome';

const Stack = createNativeStackNavigator();

export default function PatientAuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PatientOnboardingWelcome" component={PatientOnboardingWelcome}/>
      <Stack.Screen name="PatientLogin" component={PatientLogin}/>
    </Stack.Navigator>
  );
}
