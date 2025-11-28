import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../screens/patient/auth/Login';

const Stack = createNativeStackNavigator();

export default function PatientAuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="PatientOnboardingWelcome" component={PatientOnboardingWelcome}/> */}
      <Stack.Screen name="PatientLogin" component={Login}/>
    </Stack.Navigator>
  );
}
