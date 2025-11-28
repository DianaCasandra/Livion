import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../../screens/patient/dashboard/Home';

const Stack = createNativeStackNavigator();

export default function PatientAuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="PatientOnboardingWelcome" component={PatientOnboardingWelcome}/> */}
      <Stack.Screen name="PatientHome" component={Home}/>
    </Stack.Navigator>
  );
}
