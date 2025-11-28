import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';

import PatientAuthStack from './PatientAuthStack';
import ClinicianAuthStack from './ClinicianAuthStack';
import CoordinatorAuthStack from './CoordinatorAuthStack';
import AdminAuthStack from './AdminAuthStack';

const Stack = createNativeStackNavigator();

export default function RoleAuthStack() {
  const route = useRoute();
  const { role } = route.params as { role: string };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {role === 'patient' && (
        <Stack.Screen name="PatientAuth" component={PatientAuthStack} />
      )}
      {role === 'clinician' && (
        <Stack.Screen name="ClinicianAuth" component={ClinicianAuthStack} />
      )}
      {role === 'coordinator' && (
        <Stack.Screen name="CoordinatorAuth" component={CoordinatorAuthStack} />
      )}
      {role === 'admin' && (
        <Stack.Screen name="AdminAuth" component={AdminAuthStack} />
      )}
    </Stack.Navigator>
  );
}
