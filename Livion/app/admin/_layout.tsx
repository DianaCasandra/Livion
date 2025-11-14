// app/(admin)/_layout.tsx

import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Rutele din (admin) */}
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="consentledger" />
      <Stack.Screen name="riskregister" />
      <Stack.Screen name="index" /> 
      
      {/* Asigură-te că toate fișierele .tsx corespunzătoare există */}
    </Stack>
  );
}