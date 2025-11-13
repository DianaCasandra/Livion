import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { MockDataProvider } from '../components/providers/MockDataProvider';
import { UserProvider } from '../components/providers/UserProvider';

export default function Layout() {
  return (
    <ThemeProvider>
      <MockDataProvider>
        <UserProvider>
          <Stack screenOptions={{headerShown:false}} />
        </UserProvider>
      </MockDataProvider>
    </ThemeProvider>
  );
}
