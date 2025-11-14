// app/(patient)/onboarding/_layout.tsx
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="consent" />
      <Stack.Screen name="dataconnections" />
      <Stack.Screen name="risk" />
    </Stack>
  );
}