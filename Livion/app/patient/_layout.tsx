import { Stack } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function PatientLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background.primary,
        },
        animation: 'slide_from_right',
      }}
    />
  );
}
      <Stack.Screen name="home" />  