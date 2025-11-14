// app/(clinician)/_layout.tsx

import { Stack } from 'expo-router';

export default function ClinicianLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Rutele din (clinician) */}
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="patientdetails" />
      <Stack.Screen name="careplanauthoring" />
      <Stack.Screen name="messages" />
      <Stack.Screen name="documentation" />
      <Stack.Screen name="login" />
      
      {/* Asigură-te că toate fișierele .tsx corespunzătoare există */}
    </Stack>
  );
}