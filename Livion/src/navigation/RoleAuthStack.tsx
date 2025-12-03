import { RouteProp, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PatientAuthStack from './auth-stacks/PatientAuthStack';

type RoleAuthParams = {
  RoleAuth: {
    role: string;
    initial: "login" | "onboarding";
  };
};

const Stack = createNativeStackNavigator();

export default function RoleAuthStack() {
  const route = useRoute<RouteProp<RoleAuthParams, 'RoleAuth'>>();
  const { role, initial } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {role === 'patient' && (
        <Stack.Screen
          name="PatientAuth"
          options={{ headerShown: false }}
        >
          {() => <PatientAuthStack initial={initial} />}
        </Stack.Screen>
      )}

      {/* Aici re-activezi când ai celelalte stackuri: */}
      {/* {role === 'clinician' && (
        <Stack.Screen name="ClinicianAuth">
          {() => <ClinicianAuthStack initial={initial} />}
        </Stack.Screen>
      )} */}

    </Stack.Navigator>
  );
}
