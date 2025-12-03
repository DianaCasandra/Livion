import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '../../components/providers/UserProvider';

import PatientStack from './app-stacks/PatientStack';
// import ClinicianStack from './ClinicianStack';
// import AdminStack from './AdminStack';
// import CoordinatorStack from './CoordinatorStack';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { user } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user?.role === 'patient' && (
        <Stack.Screen name="Patient" component={PatientStack} />
      )}

      {/* {user.role === 'clinician' && (
        <Stack.Screen name="Clinician" component={ClinicianStack} />
      )}

      {user.role === 'coordinator' && (
        <Stack.Screen name="Coordinator" component={CoordinatorStack} />
      )}

      {user.role === 'admin' && (
        <Stack.Screen name="Admin" component={AdminStack} />
      )} */}
    </Stack.Navigator>
  );
}
