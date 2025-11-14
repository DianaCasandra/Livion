// app/_layout.tsx
import { Stack } from 'expo-router';
import { MockDataProvider } from '../components/providers/MockDataProvider';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { UserProvider } from '../components/providers/UserProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MockDataProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {/* Root index */}
            <Stack.Screen name="index" />

            {/* Route Groups */}
            <Stack.Screen name="(patient)" />
            <Stack.Screen name="(clinician)" />
            <Stack.Screen name="(admin)" />
          </Stack>
        </MockDataProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
